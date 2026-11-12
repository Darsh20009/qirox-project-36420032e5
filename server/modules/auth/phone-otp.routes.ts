import { createHmac, randomInt, randomUUID, timingSafeEqual } from "crypto";
import { Router } from "express";
import { ObjectId } from "mongodb";
import { db } from "../../db";
import { storage } from "../../storage";

const router = Router();
const challenges = db.collection("phone_login_challenges");
let indexesReady: Promise<void> | undefined;

function ensureIndexes() {
  if (!indexesReady) {
    indexesReady = Promise.all([
      challenges.createIndex({ phone: 1 }, { unique: true }),
      challenges.createIndex({ purgeAt: 1 }, { expireAfterSeconds: 0 }),
    ]).then(() => undefined).catch((error) => {
      indexesReady = undefined;
      throw error;
    });
  }
  return indexesReady;
}

function normalizePhone(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const phone = value.trim().replace(/[()\s-]/g, "");
  return /^\+[1-9]\d{7,14}$/.test(phone) ? phone : null;
}

function hashCode(phone: string, code: string) {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("Session secret is not configured");
  return createHmac("sha256", secret).update(`${phone}:${code}`).digest("hex");
}

async function findUserByPhone(phone: string) {
  const candidates = new Set([phone, phone.replace(/^\+/, "")]);
  if (phone.startsWith("+966")) {
    const localNumber = phone.slice(4);
    candidates.add(localNumber);
    candidates.add(`0${localNumber}`);
  }

  for (const candidate of Array.from(candidates)) {
    const user = await storage.getUserByMobile(candidate);
    if (user) return user;
  }

  const digits = new Set([phone.replace(/\D/g, "")]);
  if (phone.startsWith("+966")) {
    const localNumber = phone.slice(4);
    digits.add(localNumber);
    digits.add(`0${localNumber}`);
  }
  const phonePatterns = Array.from(digits).flatMap((number) => {
    const pattern = new RegExp(`^\\+?${number.split("").join("[\\s()-]*")}[\\s()-]*$`);
    return [{ mobile: pattern }, { phone: pattern }];
  });
  const matchedRecord = await db.collection("users").findOne({ $or: phonePatterns }, { projection: { _id: 1 } });
  if (matchedRecord?._id) return storage.getUser(String(matchedRecord._id));
  return undefined;
}

router.post("/send-code", async (req, res) => {
  const phone = normalizePhone(req.body?.phone);
  if (!phone) return res.status(400).json({ message: "تحقق من رمز الدولة ورقم الجوال" });

  const secret = process.env.QIROX_PROJECT_WHATSAPP_KEY_PRODUCTION;
  if (!secret) {
    return res.status(503).json({ message: "إرسال رمز التحقق غير متاح حالياً" });
  }

  try {
    await ensureIndexes();
    const now = Date.now();
    const prior = await challenges.findOne({ phone });
    const lastSentAt = prior?.lastSentAt ? new Date(prior.lastSentAt).getTime() : 0;
    if (lastSentAt && now - lastSentAt < 60_000) {
      return res.status(429).json({ message: "انتظر دقيقة قبل طلب رمز جديد" });
    }

    const windowStart = prior?.windowStartedAt ? new Date(prior.windowStartedAt).getTime() : 0;
    const sameWindow = windowStart > now - 60 * 60 * 1000;
    const sendCount = sameWindow ? Number(prior?.sendCount || 0) + 1 : 1;
    if (sendCount > 5) {
      return res.status(429).json({ message: "وصلت للحد المسموح من الرموز. حاول بعد ساعة" });
    }

    const code = String(randomInt(0, 1_000_000)).padStart(6, "0");
    const suppliedName = typeof req.body?.name === "string" ? req.body.name.trim().slice(0, 80) : "";
    const recipientName = suppliedName || "زائر";
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15_000);

    let deliveryResponse: globalThis.Response;
    try {
      deliveryResponse = await fetch(
        "https://qiroxstudio.online/api/v1/projects/6af066593c75b136420032e5/whatsapp",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${secret}`,
            "Content-Type": "application/json",
            "Idempotency-Key": randomUUID(),
          },
          body: JSON.stringify({
            recipient: { phone, name: recipientName },
            platformName: "جمعية معين لخدمات الحج والعمرة",
            clientName: "معين",
            code,
            message: `رمز التحقق الخاص بك هو ${code}. صالح لمدة 5 دقائق، ولا تشاركه مع أحد.`,
          }),
          signal: controller.signal,
        },
      );
    } finally {
      clearTimeout(timeout);
    }

    if (!deliveryResponse.ok) {
      console.error(`[Phone OTP] QIROX delivery failed with status ${deliveryResponse.status}`);
      return res.status(502).json({ message: "تعذر إرسال الرمز عبر واتساب. حاول مرة أخرى" });
    }

    const sentAt = new Date(now);
    await challenges.updateOne(
      { phone },
      {
        $set: {
          codeHash: hashCode(phone, code),
          expiresAt: new Date(now + 5 * 60 * 1000),
          attempts: 0,
          lastSentAt: sentAt,
          windowStartedAt: sameWindow ? prior?.windowStartedAt : sentAt,
          sendCount,
          purgeAt: new Date(now + 24 * 60 * 60 * 1000),
        },
      },
      { upsert: true },
    );

    return res.json({ success: true, message: "إذا كان الرقم صالحاً، سيصلك رمز التحقق على واتساب" });
  } catch {
    console.error("[Phone OTP] Could not send verification code");
    return res.status(502).json({ message: "تعذر إرسال الرمز حالياً. حاول مرة أخرى" });
  }
});

router.post("/verify-code", async (req, res) => {
  const phone = normalizePhone(req.body?.phone);
  const code = typeof req.body?.code === "string" ? req.body.code.trim() : "";
  const name = typeof req.body?.name === "string" ? req.body.name.trim().slice(0, 80) : "";
  if (!phone || !/^\d{6}$/.test(code)) {
    return res.status(400).json({ message: "أدخل رقم الجوال ورمز التحقق المكوّن من 6 أرقام" });
  }

  try {
    await ensureIndexes();
    const challenge = await challenges.findOne({ phone });
    if (!challenge?.codeHash || !challenge?.expiresAt || new Date(challenge.expiresAt).getTime() <= Date.now()) {
      if (challenge) {
        await challenges.updateOne({ phone }, { $unset: { codeHash: "", expiresAt: "", attempts: "" } });
      }
      return res.status(400).json({ message: "انتهت صلاحية الرمز أو لم يتم طلبه. اطلب رمزاً جديداً" });
    }

    if (Number(challenge.attempts || 0) >= 5) {
      await challenges.updateOne({ phone }, { $unset: { codeHash: "", expiresAt: "", attempts: "" } });
      return res.status(429).json({ message: "تجاوزت عدد المحاولات. اطلب رمزاً جديداً" });
    }

    const expected = Buffer.from(String(challenge.codeHash), "hex");
    const actual = Buffer.from(hashCode(phone, code), "hex");
    if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) {
      await challenges.updateOne(
        { phone, codeHash: challenge.codeHash },
        { $inc: { attempts: 1 } },
      );
      return res.status(400).json({ message: "رمز التحقق غير صحيح" });
    }

    const consumed = await challenges.updateOne(
      { phone, codeHash: challenge.codeHash, expiresAt: { $gt: new Date() }, attempts: { $lt: 5 } },
      { $unset: { codeHash: "", expiresAt: "", attempts: "" } },
    );
    if (consumed.modifiedCount !== 1) {
      return res.status(400).json({ message: "انتهت صلاحية الرمز أو استُخدم من قبل" });
    }

    let user = await findUserByPhone(phone);
    if (user?.status && user.status !== "active") {
      return res.status(403).json({ message: "الحساب غير نشط. تواصل مع إدارة الجمعية" });
    }

    if (!user) {
      user = await storage.createUser({
        name: name || "مستخدم",
        mobile: phone,
        role: "user",
        status: "active",
        isPublicDonor: false,
        points: 0,
        totalDonations: 0,
        donationCount: 0,
        level: "bronze",
        badges: [],
        verifiedFlag: true,
        webauthnCredentials: [],
      });
    } else {
      const update: Record<string, unknown> = {
        verifiedFlag: true,
        updatedAt: new Date(),
      };
      if (name && (!user.name || user.name === "مستخدم")) update.name = name;
      await db.collection("users").updateOne(
        { _id: new ObjectId(String(user.id)) },
        { $set: update },
      );
      user = (await storage.getUserByMobile(phone)) || user;
    }

    req.login(user, (error) => {
      if (error) {
        return res.status(500).json({ message: "تم التحقق، لكن تعذر بدء الجلسة. حاول تسجيل الدخول مجدداً" });
      }
      return res.json({ success: true, role: user?.role || "user" });
    });
  } catch {
    console.error("[Phone OTP] Verification failed");
    return res.status(500).json({ message: "تعذر التحقق من الرمز حالياً" });
  }
});

export default router;
