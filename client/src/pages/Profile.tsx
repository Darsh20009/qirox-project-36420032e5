import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  User, Shield, Heart, Coins, History, CheckCircle2, Clock, XCircle,
  FileText, Award, Edit2, Save, X, Fingerprint, Loader2, MonitorSmartphone,
  Trash2, PlusCircle, RefreshCw, Pause, Play, Ban, Star, TrendingUp, Gift,
  CalendarPlus, CalendarCheck,
} from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Donation } from "@shared/schema";
import { Input } from "@/components/ui/input";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { openLoginModal } from "@/lib/login-modal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

// ──────────────────────────────────────────────────────────
// Points tier helper
// ──────────────────────────────────────────────────────────
function getTier(points: number) {
  if (points >= 50000) return { label: "بلاتيني", color: "bg-[#e8eee9] text-[#345a45]", icon: "" };
  if (points >= 20000) return { label: "ذهبي", color: "bg-[#f2ead5] text-[#8b6c2e]", icon: "" };
  if (points >= 5000) return { label: "فضي", color: "bg-[#edf0ed] text-[#56645a]", icon: "" };
  return { label: "برونزي", color: "bg-[#f3eadc] text-[#8d6337]", icon: "" };
}

// ──────────────────────────────────────────────────────────
// Donation type label
// ──────────────────────────────────────────────────────────
function donationTypeLabel(type: string) {
  const map: Record<string, string> = {
    general: "تبرع عام",
    hajj: "خدمة الحجاج",
    umrah: "خدمة المعتمرين",
  };
  return map[type] || type || "عام";
}

// ──────────────────────────────────────────────────────────
// Calendar helpers for recurring donations
// ──────────────────────────────────────────────────────────
function toICSDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function generateICS(r: any): string {
  const startDate = r.nextChargeDate ? new Date(r.nextChargeDate) : new Date();
  startDate.setHours(10, 0, 0, 0);
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);
  const freq = r.frequency === "daily" ? "DAILY" : "MONTHLY";
  const count = r.duration || (r.frequency === "daily" ? 30 : 12);
  const title = r.frequency === "daily"
    ? `تبرع يومي - جمعية معين`
    : `تبرع شهري - جمعية معين`;
  const desc = `تبرع دوري بمبلغ ${Number(r.amount || 0).toLocaleString("ar-SA")} ريال سعودي - ${donationTypeLabel(r.type)}\\nمن موقع جمعية معين لخدمات الحج والعمرة`;
  const uid = `mueen-recurring-${r._id || Date.now()}@mueen`;

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Mueen Association//AR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTART:${toICSDate(startDate)}`,
    `DTEND:${toICSDate(endDate)}`,
    `RRULE:FREQ=${freq};COUNT=${count}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${desc}`,
    `URL:${window.location.origin}/donate`,
    "BEGIN:VALARM",
    "TRIGGER:-P1D",
    "ACTION:DISPLAY",
    `DESCRIPTION:تذكير: ${title} غداً - ${Number(r.amount || 0).toLocaleString("ar-SA")} ر.س`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

function downloadICS(r: any) {
  const content = generateICS(r);
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `mueen-recurring-${r.frequency || "monthly"}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}

function getGoogleCalendarLink(r: any): string {
  const startDate = r.nextChargeDate ? new Date(r.nextChargeDate) : new Date();
  startDate.setHours(10, 0, 0, 0);
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const freq = r.frequency === "daily" ? "DAILY" : "MONTHLY";
  const count = r.duration || (r.frequency === "daily" ? 30 : 12);
  const title = encodeURIComponent(r.frequency === "daily" ? "تبرع يومي - جمعية معين" : "تبرع شهري - جمعية معين");
  const details = encodeURIComponent(`تبرع دوري بمبلغ ${Number(r.amount || 0).toLocaleString("ar-SA")} ريال - ${donationTypeLabel(r.type)}`);
  const recur = encodeURIComponent(`RRULE:FREQ=${freq};COUNT=${count}`);
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${fmt(startDate)}/${fmt(endDate)}&recur=${recur}&details=${details}&sf=true&output=xml`;
}

// ──────────────────────────────────────────────────────────
// Component
// ──────────────────────────────────────────────────────────
export default function Profile() {
  const { user, isLoading, togglePrivacy } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isBiometricPending, setIsBiometricPending] = useState(false);
  const [deletingCredentialId, setDeletingCredentialId] = useState<string | null>(null);
  const [editData, setEditData] = useState({ name: "", email: "" });

  // ── Biometric helpers ──────────────────────────────────
  const handleRegisterBiometric = async () => {
    if (!window.PublicKeyCredential) {
      toast({ title: "غير مدعوم", description: "متصفحك لا يدعم الدخول بالبصمة", variant: "destructive" });
      return;
    }
    setIsBiometricPending(true);
    try {
      const res = await apiRequest("GET", "/api/auth/webauthn/challenge");
      const { challenge } = await res.json();
      const challengeBuffer = Uint8Array.from(atob(challenge), c => c.charCodeAt(0));
      const userIdBuffer = Uint8Array.from(user?.id || "", c => c.charCodeAt(0));
      const credential = await navigator.credentials.create({
        publicKey: {
          challenge: challengeBuffer,
          rp: { name: "جمعية معين لخدمات الحج والعمرة", id: window.location.hostname },
          user: { id: userIdBuffer, name: user?.mobile || "user", displayName: user?.name || "User" },
          pubKeyCredParams: [{ alg: -7, type: "public-key" }, { alg: -257, type: "public-key" }],
          timeout: 60000,
          attestation: "none",
        }
      }) as any;
      if (!credential) throw new Error("فشل إنشاء البصمة");
      const response = credential.response;
      let publicKey = "";
      if (response.getPublicKey) {
        const pkBuffer = new Uint8Array(response.getPublicKey());
        let binary = "";
        for (let i = 0; i < pkBuffer.length; i++) binary += String.fromCharCode(pkBuffer[i]);
        publicKey = btoa(binary);
      }
      await apiRequest("POST", "/api/auth/webauthn/register", { credential: { id: credential.id, publicKey } });
      await queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
      toast({ title: "تم التسجيل", description: "تم تفعيل الدخول بالبصمة بنجاح" });
    } catch (error: any) {
      toast({ title: "خطأ", description: error.message || "فشل تسجيل البصمة", variant: "destructive" });
    } finally {
      setIsBiometricPending(false);
    }
  };

  const handleDeleteCredential = async (credentialId: string) => {
    setDeletingCredentialId(credentialId);
    try {
      const res = await apiRequest("DELETE", `/api/auth/webauthn/credentials/${credentialId}`);
      if (!res.ok) throw new Error("فشل حذف الجهاز");
      await queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
      toast({ title: "تم الحذف", description: "تم إزالة الجهاز بنجاح" });
    } catch (err: any) {
      toast({ title: "خطأ", description: err.message || "فشل حذف الجهاز", variant: "destructive" });
    } finally {
      setDeletingCredentialId(null);
    }
  };

  // ── Queries ───────────────────────────────────────────
  const {
    data: donationsRaw,
    isLoading: donationsLoading,
    isError: donationsError,
    refetch: refetchDonations,
  } = useQuery<Donation[]>({
    queryKey: ["/api/donations"],
    enabled: !!user,
    queryFn: async () => {
      const res = await fetch("/api/donations", { credentials: "include" });
      if (!res.ok) throw new Error("تعذر تحميل سجل التبرعات");
      const json = await res.json();
      if (Array.isArray(json)) return json;
      if (Array.isArray(json?.donations)) return json.donations;
      throw new Error("استجابة سجل التبرعات غير صالحة");
    },
  });
  const donations = Array.isArray(donationsRaw) ? donationsRaw : [];

  const {
    data: recurringRaw = [],
    refetch: refetchRecurring,
    isLoading: recurringLoading,
    isError: recurringError,
  } = useQuery<any[]>({
    queryKey: ["/api/recurring"],
    enabled: !!user,
    queryFn: async () => {
      const res = await fetch("/api/recurring", { credentials: "include" });
      if (!res.ok) throw new Error("تعذر تحميل التبرعات الدورية");
      const json = await res.json();
      if (Array.isArray(json?.data)) return json.data;
      if (Array.isArray(json)) return json;
      throw new Error("استجابة التبرعات الدورية غير صالحة");
    },
  });
  const recurring: any[] = Array.isArray(recurringRaw) ? recurringRaw : [];

  // ── Mutations ─────────────────────────────────────────
  const updateProfileMutation = useMutation({
    mutationFn: async (data: { name: string; email: string }) => {
      const res = await apiRequest("PATCH", "/api/user/profile", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
      setIsEditing(false);
      toast({ title: "تم التحديث", description: "تم حفظ التعديلات بنجاح" });
    },
    onError: (error: any) => {
      toast({ title: "خطأ", description: error.message || "فشل في تحديث الملف الشخصي", variant: "destructive" });
    },
  });

  const updateRecurringMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const res = await apiRequest("PATCH", `/api/recurring/${id}`, { status });
      return res.json();
    },
    onSuccess: () => {
      refetchRecurring();
      toast({ title: "تم التحديث" });
    },
  });

  const deleteRecurringMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest("DELETE", `/api/recurring/${id}`);
      return res.json();
    },
    onSuccess: () => {
      refetchRecurring();
      toast({ title: "تم الإلغاء", description: "تم إلغاء الاشتراك الدوري" });
    },
  });

  // ── Effects ───────────────────────────────────────────
  useEffect(() => {
    if (!isLoading && !user) openLoginModal("/profile");
    if (user) setEditData({ name: user.name || "", email: user.email || "" });
  }, [user, isLoading]);

  if (isLoading) return (
    <div className="mueen-profile-page min-h-screen flex flex-col" dir="rtl">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl space-y-4">
        <Skeleton className="h-32 w-full rounded-2xl" />
        <Skeleton className="h-12 w-64 rounded-xl" />
        <Skeleton className="h-64 w-full rounded-2xl" />
        <Skeleton className="h-64 w-full rounded-2xl" />
      </main>
      <Footer />
    </div>
  );
  if (!user) return (
    <div className="mueen-profile-page min-h-screen flex flex-col" dir="rtl">
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <Card className="w-full max-w-lg border-0 shadow-sm">
          <CardContent className="p-8 text-center">
            <User className="mx-auto mb-4 h-12 w-12 text-primary/70" />
            <h1 className="mb-2 text-xl font-black">ملفك الشخصي</h1>
            <p className="mb-5 text-sm leading-6 text-muted-foreground">سجّل الدخول برقم جوالك لعرض بياناتك وسجل التبرعات والإيصالات.</p>
            <Button onClick={() => openLoginModal("/profile")}>تسجيل الدخول</Button>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );

  const tier = getTier(user.points || 0);
  const confirmedDonations = donations.filter((d: any) => d.status === "confirmed");
  const activeRecurring = recurring.filter(r => r.status === "active");

  // ── Render ────────────────────────────────────────────
  return (
    <div className="mueen-profile-page min-h-screen flex flex-col">
      <style>{`
        .mueen-profile-page {
          --mueen-forest: #174d38;
          --mueen-deep: #103a2b;
          --mueen-paper: #f5f3eb;
          --mueen-line: #dfdfd2;
          --mueen-gold: #a9853e;
          background:
            radial-gradient(ellipse at 8% 12%, rgba(218, 204, 164, .17), transparent 28rem),
            var(--mueen-paper);
          color: #263c30;
          font-family: var(--font-body, 'Tajawal', sans-serif);
        }
        .mueen-profile-page main { max-width: 1160px; }
        .mueen-profile-page main > section {
          position: relative;
          overflow: hidden;
          border-color: #ddd9c8;
          background: linear-gradient(105deg, #ece9dc 0%, #f4f1e7 58%, #e6ecdf 100%);
          box-shadow: 0 8px 24px rgba(37, 54, 39, .045);
        }
        .mueen-profile-page main > section::after {
          content: "";
          position: absolute;
          left: 18%;
          top: -90px;
          width: 230px;
          height: 230px;
          border: 1px solid rgba(169, 133, 62, .17);
          border-radius: 50%;
          box-shadow: 0 0 0 18px rgba(169, 133, 62, .035), 0 0 0 38px rgba(169, 133, 62, .025);
          pointer-events: none;
        }
        .mueen-profile-page main > section > * { position: relative; z-index: 1; }
        .mueen-profile-page main > div:first-of-type {
          border-color: #dddccc;
          border-radius: 22px;
          box-shadow: 0 18px 45px rgba(20, 60, 38, .09);
          animation: profile-arrive .45s ease-out both;
        }
        .mueen-profile-page main > div:first-of-type > div:first-child {
          height: 116px !important;
          background:
            linear-gradient(110deg, rgba(8, 43, 30, .94), rgba(36, 104, 70, .86)),
            url("/images/mueen-islamic-geometric.svg") center / 168px;
        }
        .mueen-profile-page main > div:first-of-type > div:last-child { position: relative; }
        .mueen-profile-page main > div:first-of-type > div:last-child::before {
          content: "";
          position: absolute;
          right: 0;
          left: 0;
          top: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #c2a45e, transparent);
        }
        .mueen-profile-page [data-slot="card"] {
          border-color: var(--mueen-line);
          border-radius: 17px;
          background: #fffef9;
          box-shadow: 0 8px 25px rgba(20, 60, 38, .045);
        }
        .mueen-profile-page [role="tablist"] {
          border-color: var(--mueen-line);
          border-radius: 14px;
          background: rgba(255, 254, 249, .88);
          scrollbar-width: none;
        }
        .mueen-profile-page [role="tablist"]::-webkit-scrollbar { display: none; }
        .mueen-profile-page [role="tab"] {
          white-space: nowrap;
          transition: color .18s ease, background-color .18s ease, box-shadow .18s ease;
        }
        .mueen-profile-page [role="tab"][data-state="active"] {
          background: var(--mueen-forest) !important;
          color: #fff !important;
          box-shadow: 0 3px 9px rgba(16, 58, 43, .17);
        }
        .mueen-profile-page [data-testid^="donation-row"],
        .mueen-profile-page [data-testid^="recurring-row"] {
          border-color: #e6e4d9;
          background: linear-gradient(110deg, #fffefb, #fbfaf4);
          transition: border-color .2s ease, transform .2s ease, box-shadow .2s ease;
        }
        .mueen-profile-page [data-testid^="donation-row"]:hover,
        .mueen-profile-page [data-testid^="recurring-row"]:hover {
          border-color: #c8c4ae;
          box-shadow: 0 7px 18px rgba(37, 54, 39, .055);
          transform: translateY(-1px);
        }
        .mueen-profile-page a:focus-visible,
        .mueen-profile-page button:focus-visible,
        .mueen-profile-page input:focus-visible {
          outline: 3px solid #c8a95f;
          outline-offset: 3px;
        }
        @keyframes profile-arrive {
          from { opacity: 0; transform: translateY(7px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 640px) {
          .mueen-profile-page main { padding-top: 1.25rem; }
          .mueen-profile-page main > section { padding-inline: 1rem; }
          .mueen-profile-page main > div:first-of-type { border-radius: 16px; }
          .mueen-profile-page main > div:first-of-type > div:first-child { height: 88px !important; }
          .mueen-profile-page [role="tablist"] { display: flex; width: 100%; overflow-x: auto; }
          .mueen-profile-page [role="tab"] { flex: 1 0 auto; }
          .mueen-profile-page [data-testid^="donation-row"] { min-width: 0; gap: .5rem; padding: .75rem; }
          .mueen-profile-page [data-testid^="donation-row"] > div:last-child { flex-shrink: 0; }
          .mueen-profile-page [data-testid^="recurring-row"] { padding: .75rem; }
        }
        @media (prefers-reduced-motion: reduce) {
          .mueen-profile-page *, .mueen-profile-page *::before, .mueen-profile-page *::after {
            scroll-behavior: auto !important;
            animation-duration: .01ms !important;
            transition-duration: .01ms !important;
          }
        }
      `}</style>
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl" dir="rtl">
        <section className="mb-6 flex items-center justify-between gap-4 rounded-2xl border border-[#dfe8dc] bg-[#e8efe4] px-6 py-5 sm:px-8">
          <div>
            <p className="mb-1 text-xs font-bold tracking-wide text-[#8b6d28]">جمعية معين لخدمات الحج والعمرة</p>
            <h2 className="text-xl font-bold text-[#123d2b] sm:text-2xl">مساحتك في معين</h2>
            <p className="mt-1 text-sm text-[#5e7064]">تابع بياناتك وسجل عطائك من مكان واحد.</p>
          </div>
          <img src="/images/mueen-pilgrim-mark.png" alt="" className="h-14 w-14 shrink-0 object-contain sm:h-16 sm:w-16" />
        </section>

        {/* ── Profile Header Card ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="h-24 relative" style={{ background: "linear-gradient(135deg, hsl(152 42% 28%) 0%, hsl(152 42% 42%) 100%)" }}>
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M20 20.5V18H0v5h5v5H0v5h20v-2.5h-5V20.5h5zM8 10H0v10h8V10z'/%3E%3C/g%3E%3C/svg%3E\")" }} />
          </div>
          <div className="px-6 pb-6 -mt-12">
            <div className="flex items-end justify-between gap-3 flex-wrap">
              <div className="flex items-end gap-4">
                <div className="w-20 h-20 rounded-2xl border-4 border-white shadow-lg flex items-center justify-center text-white text-3xl font-black shrink-0" style={{ background: "hsl(152 42% 30%)" }}>
                  {user.name.charAt(0)}
                </div>
                <div className="mb-1">
                  {isEditing ? (
                    <div className="space-y-2">
                      <Input value={editData.name} onChange={e => setEditData(p => ({ ...p, name: e.target.value }))} placeholder="الاسم" className="h-8 text-sm w-48" data-testid="input-edit-name" />
                      <Input value={editData.email} onChange={e => setEditData(p => ({ ...p, email: e.target.value }))} placeholder="البريد" type="email" className="h-8 text-sm w-48" data-testid="input-edit-email" />
                    </div>
                  ) : (
                    <>
                      <h1 className="text-xl font-black">{user.name}</h1>
                      <p className="text-muted-foreground text-sm font-mono" dir="ltr">{user.mobile}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className="text-xs" variant="secondary">
                          <Shield className="w-3 h-3 ml-1" />
                          {user.role === "admin" ? "مدير" : user.role === "employee" ? "موظف" : "داعم"}
                        </Badge>
                        <Badge className={cn("text-xs", tier.color)}>
                          {tier.icon} {tier.label}
                        </Badge>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="flex gap-2 mb-1">
                {isEditing ? (
                  <>
                    <Button size="sm" className="gap-1" onClick={() => updateProfileMutation.mutate(editData)} disabled={updateProfileMutation.isPending} data-testid="button-save-profile">
                      <Save className="w-3.5 h-3.5" /> حفظ
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1" onClick={() => setIsEditing(false)}>
                      <X className="w-3.5 h-3.5" /> إلغاء
                    </Button>
                  </>
                ) : (
                  <Button size="sm" variant="outline" className="gap-1" onClick={() => setIsEditing(true)} data-testid="button-edit-profile">
                    <Edit2 className="w-3.5 h-3.5" /> تعديل
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Summary Stats ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { icon: Heart, label: "إجمالي التبرعات", value: `${Number(user.totalDonations || 0).toLocaleString("ar-SA")} ر.س`, color: "text-[#8b6b2e]", bg: "bg-[#f4eedf]" },
            { icon: Coins, label: "نقاط العطاء", value: (user.points || 0).toLocaleString("ar-SA"), color: "text-[#486b53]", bg: "bg-[#eaf0e8]" },
            { icon: History, label: "عدد التبرعات", value: donations.length, color: "text-[#637668]", bg: "bg-[#edf0e9]" },
            { icon: RefreshCw, label: "اشتراكات دورية", value: activeRecurring.length, color: "text-[#356b52]", bg: "bg-[#e7efe8]" },
          ].map((s, i) => (
            <Card key={i} className="group border-0 shadow-sm transition-shadow hover:shadow-md">
              <CardContent className="p-4">
                <div className={`w-9 h-9 ${s.bg} rounded-xl flex items-center justify-center mb-2 transition-transform group-hover:-translate-y-0.5`}>
                  <s.icon className={`w-4.5 h-4.5 ${s.color}`} />
                </div>
                <p className={`text-xl font-black tracking-tight ${s.color}`}>{s.value}</p>
                <p className="text-xs text-[#778176] mt-0.5">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ── Tabs ── */}
        <Tabs defaultValue="donations" dir="rtl">
          <TabsList className="w-full h-auto grid grid-cols-4 mb-6 bg-white border border-gray-100 shadow-sm rounded-xl p-1">
            <TabsTrigger value="donations" className="gap-1.5 text-xs data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg py-2" data-testid="tab-donations">
              <History className="w-3.5 h-3.5" /> تبرعاتي
            </TabsTrigger>
            <TabsTrigger value="recurring" className="gap-1.5 text-xs data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg py-2" data-testid="tab-recurring">
              <RefreshCw className="w-3.5 h-3.5" /> الدورية
            </TabsTrigger>
            <TabsTrigger value="points" className="gap-1.5 text-xs data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg py-2" data-testid="tab-points">
              <Coins className="w-3.5 h-3.5" /> نقاطي
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-1.5 text-xs data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg py-2" data-testid="tab-settings">
              <Shield className="w-3.5 h-3.5" /> الأمان
            </TabsTrigger>
          </TabsList>

          {/* ── Tab: Donations ── */}
          <TabsContent value="donations">
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-bold flex items-center gap-2">
                    <History className="w-5 h-5 text-primary" />
                    سجل التبرعات
                  </CardTitle>
                  <Badge variant="secondary">{donationsError ? "—" : donations.length} تبرع</Badge>
                </div>
              </CardHeader>
              <CardContent>
                {donationsLoading ? (
                  <div className="space-y-3 py-1" aria-label="جارٍ تحميل سجل التبرعات">
                    {[0, 1, 2].map((item) => (
                      <div key={item} className="flex items-center gap-3 rounded-xl border border-[#e6e4d9] p-4">
                        <Skeleton className="h-11 w-11 shrink-0 rounded-xl" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-3 w-48 max-w-full" />
                        </div>
                        <Skeleton className="h-7 w-20 shrink-0 rounded-full" />
                      </div>
                    ))}
                  </div>
                ) : donationsError ? (
                  <div className="py-10 text-center" role="alert">
                    <p className="mb-4 text-sm text-muted-foreground">تعذر تحميل سجل التبرعات. تحقق من اتصالك ثم أعد المحاولة.</p>
                    <Button variant="outline" onClick={() => refetchDonations()}>إعادة المحاولة</Button>
                  </div>
                ) : donations.length === 0 ? (
                  <div className="text-center py-12">
                    <Heart className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                    <p className="text-muted-foreground font-medium mb-4">لا يوجد تبرعات سابقة بعد</p>
                    <Link href="/donate">
                      <Button className="gap-2"><Heart className="w-4 h-4" />ابدأ بالتبرع</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {donations.map((donation: any, i: number) => (
                      <div key={donation.id || i} className="flex items-center justify-between p-4 rounded-xl border hover:bg-muted/20 transition-colors" data-testid={`donation-row-${i}`}>
                        <div className="flex items-center gap-3">
                          <div className={cn("p-2.5 rounded-xl", {
                            "bg-green-100 text-green-700": donation.status === "confirmed",
                            "bg-red-100 text-red-700": donation.status === "rejected",
                            "bg-amber-100 text-amber-700": !donation.status || donation.status === "pending",
                          })}>
                            {donation.status === "confirmed" ? <CheckCircle2 className="w-5 h-5" /> :
                             donation.status === "rejected" ? <XCircle className="w-5 h-5" /> :
                             <Clock className="w-5 h-5" />}
                          </div>
                          <div>
                            <p className="font-bold text-sm">{Number(donation.amount || 0).toLocaleString("ar-SA")} ريال</p>
                            <p className="text-xs text-muted-foreground">
                              {donationTypeLabel(donation.type)} — {donation.createdAt ? new Date(donation.createdAt).toLocaleDateString("ar-SA") : "—"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={cn("text-xs font-bold", {
                            "bg-green-100 text-green-700": donation.status === "confirmed",
                            "bg-red-100 text-red-700": donation.status === "rejected",
                            "bg-amber-100 text-amber-700": !donation.status || donation.status === "pending",
                          })}>
                            {donation.status === "confirmed" ? "مؤكد" :
                             donation.status === "rejected" ? "مرفوض" : "قيد المراجعة"}
                          </Badge>
                          {donation.status === "confirmed" && (
                            <div className="flex gap-1">
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8"
                                title="عرض الإيصالات"
                                aria-label="عرض إيصالات التبرع"
                                onClick={() => setLocation(`/certificates?tab=invoices&donationId=${encodeURIComponent(String(donation.id || donation._id || ""))}`)}
                              >
                                <FileText className="h-4 w-4 text-muted-foreground" />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8"
                                title="عرض شهادات التبرع"
                                aria-label="عرض شهادات التبرع"
                                onClick={() => setLocation(`/certificates?tab=certificates&donationId=${encodeURIComponent(String(donation.id || donation._id || ""))}`)}
                              >
                                <Award className="h-4 w-4 text-amber-500" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── Tab: Recurring ── */}
          <TabsContent value="recurring">
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-bold flex items-center gap-2">
                    <RefreshCw className="w-5 h-5 text-primary" />
                    التبرعات الدورية
                  </CardTitle>
                  <Badge variant="secondary">{recurringError ? "—" : activeRecurring.length} اشتراك نشط</Badge>
                </div>
                <CardDescription>خطط العطاء المتكررة وجدول الدفعات القادمة</CardDescription>
              </CardHeader>
              <CardContent>
                {recurringLoading ? (
                  <div className="space-y-3 py-1" aria-label="جارٍ تحميل التبرعات الدورية">
                    {[0, 1].map((item) => (
                      <div key={item} className="space-y-3 rounded-xl border border-[#e6e4d9] p-4">
                        <div className="flex items-center gap-3">
                          <Skeleton className="h-11 w-11 shrink-0 rounded-xl" />
                          <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-36" />
                            <Skeleton className="h-3 w-48 max-w-full" />
                          </div>
                        </div>
                        <Skeleton className="h-8 w-44 max-w-full rounded-lg" />
                      </div>
                    ))}
                  </div>
                ) : recurringError ? (
                  <div className="py-10 text-center" role="alert">
                    <p className="mb-4 text-sm text-muted-foreground">تعذر تحميل التبرعات الدورية. تحقق من اتصالك ثم أعد المحاولة.</p>
                    <Button variant="outline" onClick={() => refetchRecurring()}>إعادة المحاولة</Button>
                  </div>
                ) : recurring.length === 0 ? (
                  <div className="text-center py-12">
                    <RefreshCw className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                    <p className="text-muted-foreground font-medium mb-2">لا يوجد اشتراكات دورية بعد</p>
                    <p className="text-xs text-muted-foreground mb-4">يمكنك تفعيل التبرع الشهري أو الأسبوعي من صفحة التبرع</p>
                    <Link href="/donate">
                      <Button variant="outline" className="gap-2"><RefreshCw className="w-4 h-4" />اشترك الآن</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {recurring.map((r: any, i: number) => (
                      <div key={r._id || i} className="p-4 rounded-xl border" data-testid={`recurring-row-${i}`}>
                        <div className="flex items-center justify-between flex-wrap gap-3">
                          <div className="flex items-center gap-3">
                            <div className={cn("p-2.5 rounded-xl", {
                              "bg-green-100 text-green-700": r.status === "active",
                              "bg-amber-100 text-amber-700": r.status === "paused",
                              "bg-red-100 text-red-700": r.status === "cancelled",
                            })}>
                              <RefreshCw className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="font-bold text-sm">{Number(r.amount || 0).toLocaleString("ar-SA")} ريال / {r.frequency === "daily" ? "يوم" : r.frequency === "monthly" ? "شهر" : "أسبوع"}</p>
                              <p className="text-xs text-muted-foreground">
                                {donationTypeLabel(r.type)}
                                {r.nextChargeDate && ` — الدفعة القادمة: ${new Date(r.nextChargeDate).toLocaleDateString("ar-SA")}`}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge className={cn("text-xs", {
                              "bg-green-100 text-green-700": r.status === "active",
                              "bg-amber-100 text-amber-700": r.status === "paused",
                              "bg-red-100 text-red-700": r.status === "cancelled",
                            })}>
                              {r.status === "active" ? "نشط" : r.status === "paused" ? "موقوف" : "ملغي"}
                            </Badge>
                            {r.status !== "cancelled" && (
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button size="sm" variant="outline" className="gap-1 h-8 text-xs text-primary border-primary/30 hover:bg-primary/5"
                                    data-testid={`button-calendar-recurring-${i}`}>
                                    <CalendarPlus className="w-3 h-3" /> أضف للتقويم
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                  <DropdownMenuLabel className="text-xs text-muted-foreground">اختر تقويمك</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    className="gap-2 cursor-pointer"
                                    onClick={() => window.open(getGoogleCalendarLink(r), "_blank")}
                                    data-testid={`button-gcal-recurring-${i}`}
                                  >
                                    <CalendarCheck className="w-4 h-4 text-blue-600" />
                                    <span>Google Calendar</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="gap-2 cursor-pointer"
                                    onClick={() => downloadICS(r)}
                                    data-testid={`button-ics-recurring-${i}`}
                                  >
                                    <CalendarPlus className="w-4 h-4 text-gray-600" />
                                    <div className="flex flex-col">
                                      <span>تقويم آيفون / أندرويد</span>
                                      <span className="text-[10px] text-muted-foreground">تنزيل ملف .ics</span>
                                    </div>
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <div className="px-2 py-1.5">
                                    <p className="text-[10px] text-muted-foreground leading-relaxed">
                                      سيُضاف حدث متكرر مع تذكير قبل يوم من كل دفعة
                                    </p>
                                  </div>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            )}
                            {r.status === "active" && (
                              <Button size="sm" variant="outline" className="gap-1 h-8 text-xs"
                                onClick={() => updateRecurringMutation.mutate({ id: r._id, status: "paused" })}
                                disabled={updateRecurringMutation.isPending}
                                data-testid={`button-pause-recurring-${i}`}
                              >
                                <Pause className="w-3 h-3" /> إيقاف مؤقت
                              </Button>
                            )}
                            {r.status === "paused" && (
                              <Button size="sm" variant="outline" className="gap-1 h-8 text-xs text-green-700 border-green-300"
                                onClick={() => updateRecurringMutation.mutate({ id: r._id, status: "active" })}
                                disabled={updateRecurringMutation.isPending}
                                data-testid={`button-resume-recurring-${i}`}
                              >
                                <Play className="w-3 h-3" /> استئناف
                              </Button>
                            )}
                            {r.status !== "cancelled" && (
                              <Button size="sm" variant="ghost" className="gap-1 h-8 text-xs text-red-600 hover:bg-red-50"
                                onClick={() => deleteRecurringMutation.mutate(r._id)}
                                disabled={deleteRecurringMutation.isPending}
                                data-testid={`button-cancel-recurring-${i}`}
                              >
                                <Ban className="w-3 h-3" /> إلغاء
                              </Button>
                            )}
                          </div>
                        </div>
                        {r.chargeCount > 0 && (
                          <div className="mt-3 pt-3 border-t flex items-center gap-4 text-xs text-muted-foreground">
                            <span>عدد الدفعات: <b className="text-foreground">{r.chargeCount}</b></span>
                            <span>الإجمالي المدفوع: <b className="text-primary">{Number(r.totalCharged || 0).toLocaleString("ar-SA")} ر.س</b></span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── Tab: Points ── */}
          <TabsContent value="points">
            <div className="space-y-4">
              {/* Points hero */}
              <Card className="border-0 shadow-sm overflow-hidden">
                <div className="p-6 text-center" style={{ background: "linear-gradient(135deg, hsl(38 85% 40%) 0%, hsl(38 85% 55%) 100%)" }}>
                  <div className="text-5xl font-black text-white mb-1">{(user.points || 0).toLocaleString("ar-SA")}</div>
                  <p className="text-white/80 text-sm">نقطة عطاء</p>
                  <Badge className={cn("mt-3 font-bold text-sm", tier.color)}>
                    {tier.icon} المستوى {tier.label}
                  </Badge>
                </div>
                <CardContent className="p-5">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">النقاط من التبرعات</p>
                      <p className="font-black text-lg text-yellow-600">{(confirmedDonations.reduce((s: number, d: any) => s + (d.amount || 0), 0) * 10).toLocaleString("ar-SA")}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">المستوى التالي</p>
                      <p className="font-black text-lg text-primary">
                        {(user.points || 0) < 5000 ? "5,000" :
                         (user.points || 0) < 20000 ? "20,000" :
                         (user.points || 0) < 50000 ? "50,000" : "MAX"} نقطة
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">معدل الاكتساب</p>
                      <p className="font-black text-lg text-green-600">10 نقطة / ريال</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* How to earn */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-bold flex items-center gap-2">
                    <Gift className="w-5 h-5 text-yellow-500" />
                    كيف تكسب نقاطاً؟
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { icon: Heart, label: "كل تبرع مؤكد", points: "10 نقطة / ريال", color: "text-red-500 bg-red-50" },
                    { icon: RefreshCw, label: "التبرع الشهري المنتظم", points: "+20% مكافأة", color: "text-green-600 bg-green-50" },
                    { icon: Star, label: "التبرع في المناسبات (رمضان)", points: "+50% مكافأة", color: "text-yellow-600 bg-yellow-50" },
                    { icon: TrendingUp, label: "أول تبرع لك", points: "500 نقطة مكافأة", color: "text-blue-600 bg-blue-50" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
                      <div className="flex items-center gap-3">
                        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", item.color)}>
                          <item.icon className="w-4 h-4" />
                        </div>
                        <p className="text-sm font-medium">{item.label}</p>
                      </div>
                      <Badge variant="secondary" className="font-bold text-xs">{item.points}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Tiers */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-bold flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-500" />
                    مستويات الداعمين
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {[
                    { label: "برونزي", range: "0 – 4,999", icon: "1", color: "bg-amber-100 text-amber-700", min: 0 },
                    { label: "فضي", range: "5,000 – 19,999", icon: "2", color: "bg-gray-100 text-gray-700", min: 5000 },
                    { label: "ذهبي", range: "20,000 – 49,999", icon: "3", color: "bg-yellow-100 text-yellow-700", min: 20000 },
                    { label: "بلاتيني", range: "+50,000", icon: "4", color: "bg-purple-100 text-purple-700", min: 50000 },
                  ].map((t, i) => (
                    <div key={i} className={cn("flex items-center justify-between p-3 rounded-xl border-2", (user.points || 0) >= t.min ? "border-primary/20" : "border-transparent bg-muted/20")}>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{t.icon}</span>
                        <div>
                          <p className="font-bold text-sm">{t.label}</p>
                          <p className="text-xs text-muted-foreground">{t.range} نقطة</p>
                        </div>
                      </div>
                      {(user.points || 0) >= t.min && <Badge className="bg-primary text-white text-xs">مستواك الحالي</Badge>}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ── Tab: Security ── */}
          <TabsContent value="settings">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  الأمان والخصوصية
                </CardTitle>
                  <CardDescription>تحكم في ظهور معلوماتك العامة</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Public profile toggle */}
                <div className="flex items-center justify-between py-4 border-t">
                  <div className="space-y-1">
                    <Label htmlFor="public-profile" className="text-base font-medium">الظهور في قائمة الشرف</Label>
                    <p className="text-sm text-muted-foreground">عند التفعيل يظهر اسمك في صفحة قائمة الشرف العامة</p>
                  </div>
                  <Switch id="public-profile" checked={user.isPublicDonor || false} onCheckedChange={checked => togglePrivacy(checked)} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick action */}
        <div className="mt-6 flex justify-end">
          <Link href="/donate">
            <Button className="gap-2 shadow-sm">
              <Heart className="w-4 h-4" />
              تبرع جديد
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
