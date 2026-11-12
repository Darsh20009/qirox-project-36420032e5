import { Router } from "express";
import { authController } from "./auth.controller";
import { requireAuth } from "../../core";

const router = Router();

// Phone verification is the only public sign-in and registration path.
// The legacy password register/login endpoints are intentionally not mounted.
router.all("/register", (_req, res) =>
  res.status(410).json({ message: "أصبح التسجيل عبر رقم الجوال ورمز التحقق على واتساب" })
);
router.all("/login", (_req, res) =>
  res.status(410).json({ message: "أصبح تسجيل الدخول عبر رمز التحقق على واتساب" })
);
router.post("/logout", authController.logout);
router.post("/refresh", authController.refresh);

// Protected routes
router.get("/me", requireAuth, authController.me);

export default router;
