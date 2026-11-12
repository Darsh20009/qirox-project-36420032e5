import { useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DonationCard } from "@/components/DonationCard";
import { QuickDonateStrip } from "@/components/QuickDonateStrip";
import { ShieldCheck, Heart, Globe2, MapPin, Building2 } from "lucide-react";
import { Link } from "wouter";
import { useLocation, useSearch } from "wouter";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { useSEO } from "@/hooks/use-seo";
import { DonationQrCode } from "@/components/DonationQrCode";
import { OFFICIAL_DONATION_URL } from "@/lib/donation-portal";
import applePayLogo from "@assets/image_1774519414670.png";
import madaVisaMcLogo from "@assets/image_1774519438042.png";
import alRajhiLogo from "@assets/image_1774519457437.png";
import donateBannerVideo from "@assets/20260412-2121-15.3281088_1776028904022.mp4";

const BENEFITS = [
  { icon: ShieldCheck, title: "جمعية مرخّصة", desc: "رقم الترخيص 1000758700" },
  { icon: Globe2, title: "خدمة ضيوف الرحمن", desc: "الحجاج والمعتمرون والزوار" },
  { icon: MapPin, title: "المقر الرئيسي", desc: "مكة المكرمة" },
  { icon: Building2, title: "تصريح التبرعات الإلكترونية", desc: "رقم التصريح 6235" },
];

export default function Donate() {
  const [, setLocation] = useLocation();
  const search = useSearch();
  const cardRef = useRef<HTMLDivElement>(null);

  useSEO({
    title: "تبرع الآن",
    description: "ساهم في برامج جمعية معين لخدمات الحج والعمرة لخدمة الحجاج والمعتمرين والزوار.",
    image: "/images/og-banner2.png",
  });

  const handleAmountSelect = (amount: number, serviceSlug: string) => {
    const url = serviceSlug
      ? `/donate?amount=${amount}&campaignId=${serviceSlug}`
      : amount > 0 ? `/donate?amount=${amount}` : `/donate?campaignId=${serviceSlug}`;
    setLocation(url);
    setTimeout(() => {
      cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "hsl(35 28% 97%)" }}>
      <Navbar />

      <main className="flex-1" dir="rtl">

        {/* ── Hero band ── */}
        <div
          className="py-10 md:py-16 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, hsl(152 42% 26%) 0%, hsl(152 42% 36%) 100%)" }}
        >
          <video
            src={donateBannerVideo}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.52)" }} />
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-5 border"
              style={{ backgroundColor: "rgba(255,255,255,0.12)", borderColor: "rgba(255,255,255,0.25)", color: "white" }}
            >
              <Heart className="w-4 h-4" />
              لكل تبرع أثر لا يُمحى
            </div>
            <h1 className="text-3xl md:text-5xl font-black font-heading text-white mb-3 leading-tight">
              اصنع فرقاً اليوم
            </h1>
            <p className="text-white/75 text-base md:text-lg max-w-lg mx-auto">
              مساهمتك تدعم برامج التوعية والإرشاد والمساندة لضيوف الرحمن
            </p>

            {/* Payment badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              <div className="flex items-center px-3 py-1.5 rounded-lg" style={{ backgroundColor: "white" }}>
                <img src={madaVisaMcLogo} alt="مدى / Visa / Mastercard" className="h-6 object-contain" />
              </div>
              <div className="flex items-center px-3 py-1.5 rounded-lg" style={{ backgroundColor: "white" }}>
                <img src={applePayLogo} alt="Apple Pay" className="h-6 object-contain" />
              </div>
              <div className="flex items-center px-3 py-1.5 rounded-lg" style={{ backgroundColor: "white" }}>
                <img src={alRajhiLogo} alt="مصرف الراجحي" className="h-6 object-contain" />
              </div>
            </div>
          </div>
        </div>

        {/* ── Quick Donate Strip ── */}
        <QuickDonateStrip onAmountSelect={handleAmountSelect} />

        {/* ── Content ── */}
        <div ref={cardRef} className="container mx-auto px-4 py-10 md:py-14">
          <section className="max-w-5xl mx-auto mb-8 rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 text-center sm:text-right">
              <a
                href={OFFICIAL_DONATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="فتح منصة التبرع الرسمية"
                className="shrink-0 rounded-xl border border-gray-100 bg-white p-2"
              >
                <DonationQrCode size={128} />
              </a>
              <div className="space-y-2">
                <h2 className="text-lg font-black text-gray-900">التبرع عبر المنصة الرسمية</h2>
                <p className="text-sm text-gray-600">
                  امسح الرمز أو افتح الموقع الرسمي. تأكد من ظهور HTTPS واسم النطاق قبل إتمام الدفع.
                </p>
                <a
                  href={OFFICIAL_DONATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block font-bold text-emerald-800 underline underline-offset-4"
                  dir="ltr"
                >
                  www.mueenalhajjandmutamers.org.sa
                </a>
              </div>
            </div>
          </section>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">

            {/* Left: info (desktop only) */}
            <div className="hidden lg:flex lg:col-span-2 flex-col gap-6">
              <div>
                <p className="section-label mb-2">لماذا معين؟</p>
                <h2 className="text-2xl font-black font-heading mb-4 leading-tight" style={{ color: "hsl(210 22% 14%)" }}>
                  ثقتكم أمانة<br />نحملها بمسؤولية
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: "hsl(215 15% 42%)" }}>
                  جمعية أهلية مقرها مكة المكرمة، تعمل على تطوير خدمات التوعية والإرشاد والمساندة لضيوف الرحمن.
                </p>
              </div>

              <div className="space-y-3">
                {BENEFITS.map((b, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-xl bg-white"
                    style={{ border: "1px solid hsl(35 15% 88%)" }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: "hsl(152 42% 93%)" }}
                    >
                      <b.icon className="w-5 h-5" style={{ color: "hsl(152 42% 28%)" }} />
                    </div>
                    <div>
                      <p className="font-bold text-sm" style={{ color: "hsl(210 22% 14%)" }}>{b.title}</p>
                      <p className="text-xs" style={{ color: "hsl(215 15% 52%)" }}>{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* License info */}
              <div
                className="p-4 rounded-xl text-xs leading-relaxed"
                style={{ backgroundColor: "hsl(152 42% 95%)", border: "1px solid hsl(152 42% 84%)", color: "hsl(152 42% 28%)" }}
              >
                <p className="font-bold mb-1">جمعية معين لخدمات الحج والعمرة</p>
                <p>الاسم المسجل: جمعية معين الحاج والمعتمر</p>
                <p>رقم الترخيص: 1000758700 · الرقم الموحد: 7050370985</p>
                <p>تصريح التبرعات الإلكترونية: 6235</p>
                <p>المقر الرئيسي: مكة المكرمة</p>
                <p className="mt-2">
                  <Link href="/bank-transfer" className="underline font-bold">التحويل البنكي المباشر ←</Link>
                </p>
              </div>
            </div>

            {/* Right: Donation Card — key=search forces remount when URL params change */}
            <div className="lg:col-span-3">
              <DonationCard key={search} />

              {/* Mobile-only benefits */}
              <div className="lg:hidden mt-6 grid grid-cols-2 gap-3">
                {BENEFITS.map((b, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-white"
                    style={{ border: "1px solid hsl(35 15% 88%)" }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: "hsl(152 42% 93%)" }}
                    >
                      <b.icon className="w-4 h-4" style={{ color: "hsl(152 42% 28%)" }} />
                    </div>
                    <div>
                      <p className="font-bold text-xs" style={{ color: "hsl(210 22% 14%)" }}>{b.title}</p>
                      <p className="text-[10px]" style={{ color: "hsl(215 15% 52%)" }}>{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
