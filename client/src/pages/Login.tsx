import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowRight, Check, ChevronDown, LoaderCircle, MessageCircle, ShieldCheck, X } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

type Country = {
  name: string;
  code: string;
  localDigits?: number;
};

const COUNTRIES: Country[] = [
  { name: "السعودية", code: "+966", localDigits: 9 },
  { name: "الإمارات", code: "+971", localDigits: 9 },
  { name: "الكويت", code: "+965", localDigits: 8 },
  { name: "قطر", code: "+974", localDigits: 8 },
  { name: "البحرين", code: "+973", localDigits: 8 },
  { name: "عُمان", code: "+968", localDigits: 8 },
  { name: "مصر", code: "+20" },
  { name: "الأردن", code: "+962" },
  { name: "العراق", code: "+964" },
  { name: "المغرب", code: "+212" },
  { name: "باكستان", code: "+92" },
  { name: "الهند", code: "+91" },
  { name: "إندونيسيا", code: "+62" },
  { name: "تركيا", code: "+90" },
  { name: "المملكة المتحدة", code: "+44" },
  { name: "الولايات المتحدة", code: "+1" },
];

const digitsOnly = (value: string) => value.replace(/\D/g, "");

type LoginProps = {
  returnTo?: string;
  onClose?: () => void;
  onAuthenticated?: () => void;
};

export default function Login({ returnTo = "/", onClose, onAuthenticated }: LoginProps) {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const [countryCode, setCountryCode] = useState(COUNTRIES[0].code);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [countdown, setCountdown] = useState(0);
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");

  const country = useMemo(
    () => COUNTRIES.find((item) => item.code === countryCode) ?? COUNTRIES[0],
    [countryCode],
  );
  const localPhone = digitsOnly(phone).replace(/^0+/, "").slice(0, Math.max(1, 15 - digitsOnly(countryCode).length));
  const e164Phone = `${countryCode}${localPhone}`;
  const phoneIsValid =
    localPhone.length >= 7 &&
    localPhone.length + digitsOnly(countryCode).length <= 15 &&
    (!country.localDigits || localPhone.length === country.localDigits);

  const handlePhoneChange = (value: string) => {
    let digits = digitsOnly(value);
    const dialDigits = digitsOnly(countryCode);
    if (digits.startsWith(dialDigits) && digits.length > dialDigits.length + 5) {
      digits = digits.slice(dialDigits.length);
    }
    setPhone(digits.replace(/^0+/, "").slice(0, Math.max(1, 15 - dialDigits.length)));
  };

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = window.setTimeout(() => setCountdown((remaining) => remaining - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [countdown]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  const sendCode = async (event?: { preventDefault: () => void }) => {
    event?.preventDefault();
    if (!phoneIsValid || sending || countdown > 0) return;
    setError("");
    setSending(true);
    try {
      await apiRequest("POST", "/api/auth/phone/send-code", { phone: e164Phone });
      setStep("code");
      setCode("");
      setCountdown(60);
    } catch (err) {
      setError((err as Error)?.message || "تعذر إرسال رمز التحقق. حاول مرة أخرى.");
    } finally {
      setSending(false);
    }
  };

  const verifyCode = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (digitsOnly(code).length !== 6 || verifying) return;
    setError("");
    setVerifying(true);
    try {
      const response = await apiRequest("POST", "/api/auth/phone/verify-code", {
        phone: e164Phone,
        code: digitsOnly(code),
        ...(name.trim() ? { name: name.trim() } : {}),
      });
      const result = await response.json() as { success?: boolean; role?: string; message?: string };
      if (!result.success) throw new Error(result.message || "رمز التحقق غير صحيح.");
      await queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
      const role = result.role || "";
      const safeReturnTo = returnTo.startsWith("/") && !returnTo.startsWith("//") ? returnTo : "/";
      const target = role === "admin" || role === "manager"
        ? "/admin"
        : role === "delivery"
          ? "/delivery"
          : ["employee", "accountant", "programmer", "sales"].includes(role)
            ? "/employee"
            : safeReturnTo;
      onAuthenticated?.();
      setLocation(target);
    } catch (err) {
      setError((err as Error)?.message || "تعذر التحقق من الرمز. تأكد منه وحاول مجدداً.");
    } finally {
      setVerifying(false);
    }
  };

  const returnToPhone = () => {
    setStep("phone");
    setCode("");
    setError("");
  };

  return (
    <main
      dir="rtl"
      className="mueen-login fixed inset-0 z-[120] flex items-center justify-center overflow-y-auto px-3 py-4 sm:px-6"
      style={{ fontFamily: "var(--font-body, 'Tajawal', 'Cairo', sans-serif)" }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose?.();
      }}
    >
      <style>{`
        .mueen-login {
          --mueen-green: #15583c;
          --mueen-deep: #10462f;
          --mueen-gold: #b38b3e;
          --mueen-paper: #f7f5ee;
          --mueen-ink: #243b2e;
          position: fixed;
          inset: 0;
          z-index: 120;
          isolation: isolate;
          background:
            rgba(12, 34, 24, .64);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
        }
        .mueen-login::before {
          background:
            radial-gradient(ellipse at 50% 8%, rgba(216, 202, 160, .28), transparent 38%),
            transparent;
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          opacity: .22;
          background-image: url("/images/mueen-islamic-geometric.svg");
          background-size: 170px 170px;
          mask-image: linear-gradient(to bottom, black, transparent 88%);
        }
        .mueen-login-card {
          animation: mueen-login-in .45s cubic-bezier(.2,.72,.25,1) both;
          box-shadow: 0 28px 80px rgba(44, 55, 40, .12), 0 3px 12px rgba(44, 55, 40, .05);
        }
        .mueen-login button:focus-visible,
        .mueen-login input:focus-visible,
        .mueen-login select:focus-visible,
        .mueen-login a:focus-visible { outline: 3px solid rgba(179,139,62,.55); outline-offset: 3px; }
        @keyframes mueen-login-in {
          from { opacity: 0; transform: translateY(12px) scale(.985); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .mueen-login-card { animation: none; }
        }
      `}</style>

      <section
        className="mueen-login-card relative my-auto w-full max-w-[456px] overflow-y-auto rounded-[28px] border border-[#e5dfd0] bg-[#fbfaf6] px-6 pb-7 pt-8 sm:px-10 sm:pb-9 sm:pt-10"
        aria-labelledby="login-title"
        aria-modal="true"
        role="dialog"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-l from-[#c9a65d] via-[#e4d3a4] to-[#15583c]" />
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق نافذة تسجيل الدخول"
            className="absolute left-4 top-4 z-10 rounded-full p-2 text-[#657267] transition hover:bg-[#f0eee5] hover:text-[#15583c]"
          >
            <X className="h-5 w-5" />
          </button>
        )}
        <header className="mb-7 text-center">
          <div className="mx-auto mb-4 flex h-[70px] w-[70px] items-center justify-center overflow-hidden rounded-[21px] border border-[#e6dfce] bg-white shadow-[0_5px_16px_rgba(54,67,47,.08)]">
            <img src="/images/icon-192.png" alt="شعار جمعية معين" className="h-full w-full object-contain" />
          </div>
          <p className="mb-1 text-[11px] font-bold tracking-[.04em] text-[#9a7a3c]">جمعية معين لخدمات الحج والعمرة</p>
          <h1 id="login-title" className="text-[23px] font-black leading-tight tracking-tight text-[#183f2c] sm:text-[25px]">
            {step === "phone" ? "أهلاً بك في معين" : "تحقق من رقمك"}
          </h1>
          <p className="mx-auto mt-2 max-w-[315px] text-[13px] leading-6 text-[#748074]">
            {step === "phone"
              ? "أدخل رقم جوالك لنرسل لك رمز الدخول عبر واتساب."
              : "أدخل رمز التحقق من رسالة واتساب. إذا لم يصلك خلال دقيقة، أعد الإرسال بعد انتهاء العداد."}
          </p>
        </header>

        {step === "phone" ? (
          <form onSubmit={sendCode} className="space-y-4">
            <label htmlFor="login-phone" className="block text-[13px] font-bold text-[#354b3b]">رقم الجوال</label>
            <div dir="ltr" className="flex h-[54px] overflow-hidden rounded-[14px] border border-[#dcded4] bg-white transition focus-within:border-[#65866d] focus-within:ring-4 focus-within:ring-[#15583c]/[.08]">
              <div className="relative shrink-0 border-r border-[#e5e6df] bg-[#f7f7f2]">
                <select
                  aria-label="رمز الدولة"
                  value={countryCode}
                  onChange={(event) => setCountryCode(event.target.value)}
                  className="h-full w-[102px] cursor-pointer appearance-none bg-transparent pl-3 pr-3 text-left text-[14px] font-bold text-[#354b3b] outline-none"
                >
                  {COUNTRIES.map((item) => (
                    <option key={item.code} value={item.code}>{item.name} ({item.code})</option>
                  ))}
                </select>
                <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#879184]" />
              </div>
              <input
                id="login-phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                dir="ltr"
                placeholder={country.code === "+966" ? "5X XXX XXXX" : "رقم الجوال"}
                value={phone}
                onChange={(event) => handlePhoneChange(event.target.value)}
                className="min-w-0 flex-1 bg-transparent px-4 text-left text-[16px] font-semibold tracking-[.04em] text-[#243b2e] outline-none placeholder:font-normal placeholder:tracking-normal placeholder:text-[#a9afa5]"
                aria-describedby="phone-hint"
                required
              />
            </div>
            <p id="phone-hint" className="text-[11px] leading-5 text-[#899187]">
              أدخل الرقم بدون الصفر الأول. سيُستخدم رمز الدولة لإرسال رسالة واتساب.
            </p>

            {error && <ErrorMessage message={error} />}

            <button
              type="submit"
              disabled={!phoneIsValid || sending}
              className="flex h-[52px] w-full items-center justify-center gap-2 rounded-[14px] bg-[#15583c] text-[14px] font-bold text-white shadow-[0_7px_16px_rgba(21,88,60,.17)] transition hover:bg-[#104a32] active:translate-y-px disabled:cursor-not-allowed disabled:bg-[#a9b7aa] disabled:shadow-none"
            >
              {sending ? <><LoaderCircle className="h-[17px] w-[17px] animate-spin" /> جارٍ إرسال الرمز</> : <>متابعة عبر واتساب <ArrowRight className="h-4 w-4" /></>}
            </button>
          </form>
        ) : (
          <form onSubmit={verifyCode} className="space-y-4">
            <div className="rounded-[14px] border border-[#e4e1d7] bg-[#f7f6f0] px-4 py-3 text-center">
              <div className="mb-1 flex items-center justify-center gap-2 text-[12px] text-[#788378]">
                <MessageCircle className="h-4 w-4 text-[#568365]" />
                طُلب إرسال رمز التحقق إلى
              </div>
              <div dir="ltr" className="font-semibold tracking-wide text-[#294935]">{e164Phone}</div>
              <button type="button" onClick={returnToPhone} className="mt-1 text-[11px] font-bold text-[#997832] hover:underline">
                تغيير الرقم
              </button>
            </div>

            <div>
              <label htmlFor="verification-code" className="mb-2 block text-[13px] font-bold text-[#354b3b]">رمز التحقق</label>
              <input
                id="verification-code"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                dir="ltr"
                value={code}
                onChange={(event) => setCode(digitsOnly(event.target.value).slice(0, 6))}
                placeholder="أدخل الرمز"
                className="h-[54px] w-full rounded-[14px] border border-[#dcded4] bg-white px-4 text-center text-[20px] font-bold tracking-[.35em] text-[#243b2e] outline-none transition placeholder:text-[14px] placeholder:font-normal placeholder:tracking-normal placeholder:text-[#a9afa5] focus:border-[#65866d] focus:ring-4 focus:ring-[#15583c]/[.08]"
                required
              />
            </div>

            <div>
              <label htmlFor="account-name" className="mb-2 block text-[13px] font-bold text-[#354b3b]">
                الاسم <span className="font-normal text-[#92998f]">(اختياري للحساب الجديد)</span>
              </label>
              <input
                id="account-name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="الاسم الكامل"
                className="h-[49px] w-full rounded-[14px] border border-[#dcded4] bg-white px-4 text-[14px] text-[#243b2e] outline-none transition placeholder:text-[#a9afa5] focus:border-[#65866d] focus:ring-4 focus:ring-[#15583c]/[.08]"
              />
            </div>

            {error && <ErrorMessage message={error} />}

            <button
              type="submit"
              disabled={digitsOnly(code).length !== 6 || verifying}
              className="flex h-[52px] w-full items-center justify-center gap-2 rounded-[14px] bg-[#15583c] text-[14px] font-bold text-white shadow-[0_7px_16px_rgba(21,88,60,.17)] transition hover:bg-[#104a32] active:translate-y-px disabled:cursor-not-allowed disabled:bg-[#a9b7aa] disabled:shadow-none"
            >
              {verifying ? <><LoaderCircle className="h-[17px] w-[17px] animate-spin" /> جارٍ التحقق</> : <>تأكيد الدخول <Check className="h-4 w-4" /></>}
            </button>

            <div className="min-h-6 text-center text-[12px]">
              {countdown > 0 ? (
                <span className="text-[#899187]">يمكنك طلب رمز جديد بعد <b className="tabular-nums text-[#5d6d5f]">{countdown}</b> ثانية</span>
              ) : (
                <button type="button" onClick={() => void sendCode()} disabled={sending} className="font-bold text-[#997832] transition hover:text-[#775b27] disabled:opacity-50">
                  {sending ? "جارٍ إعادة الإرسال..." : "إعادة إرسال الرمز"}
                </button>
              )}
            </div>
          </form>
        )}

        <footer className="mt-6 flex items-center justify-center gap-2 border-t border-[#ece9df] pt-5 text-[11px] text-[#8b9389]">
          <ShieldCheck className="h-4 w-4 text-[#9e8958]" />
          <span>دخول آمن لخدمات الحج والعمرة</span>
        </footer>
      </section>
    </main>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <div role="alert" className="rounded-xl border border-[#ead3cc] bg-[#fbf0ed] px-3.5 py-3 text-[12px] leading-5 text-[#8a4537]">
      {message}
    </div>
  );
}
