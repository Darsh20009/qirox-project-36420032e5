import './_group.css';
const imgHeroVolunteer = "/__mockup/images/home-hero-volunteer.png";
const imgHero2 = "/__mockup/images/home-hero2.png";
const vidBanner1 = "/__mockup/images/home-banner-1.mp4";
const vidBanner2 = "/__mockup/images/home-banner-2.mp4";

import { Navbar } from "./_Navbar";
import { Footer } from "./_Footer";
import { DonationCard } from "./_DonationCard";
import { QuickDonateStrip } from "./_QuickDonateStrip";
import { DevicesSection } from "./_DevicesSection";
import { SiteBookSection } from "./_SiteBookSection";
import { Link } from "./_runtime";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  ChevronRight, ChevronLeft, Award, Heart, ShieldCheck, Users,
  ArrowLeft, Target, Eye, Handshake, Globe2, Home as HomeIcon, Baby,
  Building2, Phone, Briefcase, Share2, HandHeart, Zap, CheckCircle2,
  MapPin, ArrowRight, Star, Quote,
} from "lucide-react";
import { useLeaderboard } from "./_runtime";
import { previewFetch, useQuery } from "./_runtime";
import { WhatsAppButton } from "./_WhatsAppButton";
import { useSEO } from "./_runtime";
import { useAuth } from "./_runtime";
import { SiApple } from "./_icons";

type Slide = {
  mediaType: "image" | "video";
  mediaUrl: string;
  posterUrl?: string;
  title: string;
  subtitle: string;
  primaryLink: string;
  primaryLabel: string;
  secondaryLink: string;
  secondaryLabel: string;
};

const FALLBACK_SLIDES: Slide[] = [
  {
    mediaType: "video",
    mediaUrl: vidBanner2,
    posterUrl: imgHero2,
    title: "خدمة ضيوف الرحمن",
    subtitle: "التوجيه والرعاية للحجاج والمعتمرين والزوار",
    primaryLink: "/donate",
    primaryLabel: "تبرع الآن",
    secondaryLink: "/bank-transfer",
    secondaryLabel: "تحويل بنكي",
  },
  {
    mediaType: "video",
    mediaUrl: vidBanner1,
    posterUrl: imgHeroVolunteer,
    title: "معاً نصنع الأثر",
    subtitle: "جمعية معين للحج والعمرة — شريككم في العطاء",
    primaryLink: "/donate",
    primaryLabel: "تبرع الآن",
    secondaryLink: "/about",
    secondaryLabel: "تعرف علينا",
  },
];

const SLIDE_DURATION = 7000;
const BANNER_PLACEHOLDER = "/__mockup/images/banner-placeholder.png";

function HeroSlider({
  slides,
  current,
  onPrev,
  onNext,
  onGoTo,
  videoRefs,
}: {
  slides: Slide[];
  current: number;
  onPrev: () => void;
  onNext: () => void;
  onGoTo: (i: number) => void;
  videoRefs: React.MutableRefObject<(HTMLVideoElement | null)[]>;
}) {
  const total = slides.length;
  const [placeholderVisible, setPlaceholderVisible] = useState(true);

  return (
    <div
      className="relative w-full overflow-hidden group select-none"
      style={{ height: "calc(100svh - 109px)", minHeight: "340px", maxHeight: "680px" }}
    >
      {/* ── Placeholder image shown immediately before videos load ── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          opacity: placeholderVisible ? 1 : 0,
          transition: "opacity 0.8s ease-in-out",
          backgroundColor: "#0f2819",
        }}
      >
        <img
          src={BANNER_PLACEHOLDER}
          alt="جمعية معين للحج والعمرة"
          className="absolute inset-0 w-full h-full object-contain bg-white"
          draggable={false}
        />
      </div>

      {slides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{
            opacity: i === current ? 1 : 0,
            zIndex: i === current ? 1 : 0,
            transition: "opacity 0.9s cubic-bezier(0.4,0,0.2,1)",
            pointerEvents: i === current ? "auto" : "none",
          }}
          aria-hidden={i !== current}
        >
          {s.mediaType === "video" && (
            <video
              ref={(el) => { videoRefs.current[i] = el; }}
              src={s.mediaUrl}
              muted
              loop
              playsInline
              autoPlay={i === 0}
              preload={i === current ? "metadata" : "none"}
              className="absolute inset-0 w-full h-full object-cover"
              onCanPlay={i === 0 ? () => setPlaceholderVisible(false) : undefined}
              onPlaying={i === 0 ? () => setPlaceholderVisible(false) : undefined}
            />
          )}
          {s.mediaType === "image" && (
            <img
              src={s.mediaUrl}
              alt=""
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
              onLoad={i === 0 ? () => setPlaceholderVisible(false) : undefined}
            />
          )}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.35) 100%)" }}
          />
        </div>
      ))}

      <button
        onClick={onPrev}
        className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center text-white transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95"
        style={{ backgroundColor: "rgba(255,255,255,0.18)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.25)" }}
        aria-label="السابق"
        data-testid="button-prev-banner"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
      <button
        onClick={onNext}
        className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center text-white transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95"
        style={{ backgroundColor: "rgba(255,255,255,0.18)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.25)" }}
        aria-label="التالي"
        data-testid="button-next-banner"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => onGoTo(i)}
            className="rounded-full transition-all duration-500"
            style={{
              width: i === current ? "2rem" : "0.5rem",
              height: "0.5rem",
              backgroundColor: i === current ? "white" : "rgba(255,255,255,0.4)",
            }}
            data-testid={`button-dot-${i}`}
          />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 w-full z-20 h-[3px]" style={{ backgroundColor: "rgba(255,255,255,0.12)" }}>
        <div
          className="h-full transition-all duration-500 ease-linear"
          style={{
            backgroundColor: "hsl(28 44% 59%)",
            width: `${((current + 1) / total) * 100}%`,
          }}
        />
      </div>

    </div>
  );
}

function SlideInfoPanel({ slides, current }: { slides: Slide[]; current: number }) {
  const slide = slides[current];

  return (
    <div
      className="relative overflow-hidden"
      dir="rtl"
      style={{ backgroundColor: "hsl(210 22% 10%)" }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="container mx-auto px-4 py-7 md:py-8"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
                  <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "hsl(28 44% 59%)" }} />
                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "hsl(28 44% 70%)" }}>
                  جمعية معين للحج والعمرة
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black font-heading text-white leading-tight mb-2">
                {slide.title}
              </h1>
              <p className="text-sm md:text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
                {slide.subtitle}
              </p>
            </div>

                  <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link href={slide.primaryLink}>
                <button
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-black text-sm font-heading text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl active:scale-95"
                  style={{ backgroundColor: "hsl(28 44% 59%)" }}
                  data-testid="button-slide-primary"
                >
                  <Zap className="w-4 h-4" />
                  {slide.primaryLabel}
                </button>
              </Link>
              {slide.secondaryLink && slide.secondaryLabel && (
                <Link href={slide.secondaryLink}>
                  <button
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm font-heading text-white border transition-all duration-200 hover:bg-white/10"
                    style={{ borderColor: "rgba(255,255,255,0.3)" }}
                    data-testid="button-slide-secondary"
                  >
                    {slide.secondaryLabel}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              )}
            </div>

                  <div className="hidden lg:flex flex-col items-center gap-1 shrink-0" style={{ color: "rgba(255,255,255,0.3)" }}>
              <span className="text-3xl font-black font-heading leading-none text-white">{String(current + 1).padStart(2, "0")}</span>
              <div className="w-px h-8" style={{ backgroundColor: "rgba(255,255,255,0.2)" }} />
              <span className="text-xs">{String(slides.length).padStart(2, "0")}</span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function HeroSection() {
  const { data: apiSlides } = useQuery<Slide[]>({
    queryKey: ["/api/slider"],
    queryFn: async () => {
      const r = await previewFetch("/api/slider");
      return r.ok ? r.json() : [];
    },
    staleTime: 60000,
  });

  const videoSlides = apiSlides?.filter((s: Slide) => s.mediaType === "video") ?? [];
  const slides: Slide[] = videoSlides.length > 0 ? videoSlides : FALLBACK_SLIDES;

  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = slides.length;

  const goTo = useCallback(
    (idx: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent(idx);
        setIsTransitioning(false);
      }, 50);
    },
    [isTransitioning]
  );

  const next = useCallback(() => goTo((current + 1) % total), [current, total, goTo]);
  const prev = useCallback(() => goTo((current - 1 + total) % total), [current, total, goTo]);

  useEffect(() => {
    if (current >= total) setCurrent(0);
  }, [total, current]);

  useEffect(() => {
    timerRef.current = setInterval(next, SLIDE_DURATION);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [next]);

  // Video play/pause logic — play immediately, retry via canplay if not ready yet
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === current) {
        if (v.currentTime > 0.5) v.currentTime = 0;
        const tryPlay = () => v.play().catch(() => {});
        const p = v.play();
        if (p !== undefined) {
          p.catch(() => { v.addEventListener("canplay", tryPlay, { once: true }); });
        }
      } else {
        v.pause();
        v.currentTime = 0;
      }
    });
  }, [current]);

  return (
    <>
      <HeroSlider slides={slides} current={current} onPrev={prev} onNext={next} onGoTo={goTo} videoRefs={videoRefs} />
      <SlideInfoPanel slides={slides} current={current} />
    </>
  );
}

function ServicesSection() {
  const services = [
    {
      title: "خدمة الحجاج", icon: Globe2, slug: "hajj",
      desc: "خدمات مخصصة لمساندة الحجاج في رحلتهم", hadith: "الحج المبرور ليس له جزاء إلا الجنة",
      gradient: "from-emerald-600 to-teal-500",
      image: "/__mockup/images/service-hajj.png",
      stat: "خدمات الحج", accent: "hsl(143 84% 19%)",
    },
    {
      title: "خدمة المعتمرين", icon: Globe2, slug: "umrah",
      desc: "خدمات مخصصة لمساندة المعتمرين في رحلتهم", hadith: "العمرة إلى العمرة كفارة لما بينهما",
      gradient: "from-emerald-600 to-teal-500",
      image: "/__mockup/images/service-umrah.png",
      stat: "خدمات العمرة", accent: "hsl(143 84% 19%)",
    },
  ];

  return (
    <section className="py-16" style={{ backgroundColor: "hsl(35 28% 97%)" }} dir="rtl">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="section-label mb-1">خدمات الحج والعمرة</p>
            <h2 className="text-3xl font-black font-heading" style={{ color: "hsl(210 22% 14%)" }}>
              خدمات الحجاج والمعتمرين
            </h2>
          </div>
          <Link href="/services">
            <button className="hidden sm:flex items-center gap-1.5 text-sm font-semibold hover:underline" style={{ color: "hsl(152 42% 28%)" }}>
              عرض الكل <ArrowLeft className="w-4 h-4" />
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 max-w-4xl mx-auto gap-4 md:gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.09 }}
            >
              <Link href={`/services/${s.slug}`}>
                <div
                  className="group bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl h-full flex flex-col"
                  style={{ border: "1px solid hsl(35 15% 88%)", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
                  data-testid={`card-service-${s.slug}`}
                >
                  {/* Image header */}
                  <div className={`relative h-36 overflow-hidden bg-gradient-to-br ${s.gradient}`}>
                    <img
                      src={s.image}
                      alt={s.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${s.gradient} opacity-75`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    {/* Icon badge */}
                    <div
                      className="absolute top-3 right-3 w-9 h-9 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30 shadow"
                    >
                      <s.icon className="w-5 h-5 text-white" />
                    </div>
                    {/* Stat badge */}
                    <div className="absolute top-3 left-3 bg-black/30 backdrop-blur-sm rounded-full px-2 py-0.5 border border-white/20">
                      <span className="text-white text-[10px] font-bold">{s.stat}</span>
                    </div>
                    {/* Title on image */}
                    <div className="absolute bottom-0 inset-x-0 p-3">
                      <p className="font-heading font-black text-sm text-white drop-shadow-sm leading-tight">{s.title}</p>
                    </div>
                  </div>

                  <div className="p-3 flex-1 flex flex-col">
                    <div className="flex items-start gap-1.5 bg-amber-50 rounded-lg p-2 mb-2.5 border border-amber-100">
                      <Quote className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" />
                      <p className="text-[10px] text-amber-700 font-medium leading-relaxed italic line-clamp-2">{s.hadith}</p>
                    </div>
                    <p className="text-[11px] leading-relaxed flex-1" style={{ color: "hsl(215 15% 45%)" }}>{s.desc}</p>
                    <div className="flex items-center justify-end mt-2.5 pt-2 border-t border-gray-50">
                      <span className="text-[11px] font-black flex items-center gap-0.5" style={{ color: s.accent }}>
                        تبرع الآن ←
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const stats = [
    {
      label: "رقم ترخيص الجمعية",
      value: "1000758700",
      icon: Building2,
    },
    {
      label: "تصريح التبرعات الإلكترونية",
      value: "6235",
      icon: ShieldCheck,
    },
    {
      label: "المقر الرئيسي",
      value: "مكة المكرمة",
      icon: MapPin,
    },
    {
      label: "مجال الخدمة",
      value: "الحج والعمرة",
      icon: Globe2,
    },
  ];

  return (
    <section className="relative py-16 overflow-hidden" dir="rtl">
      <img
        src={imgHero2}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "brightness(0.3)" }}
      />
      <div className="absolute inset-0" style={{ backgroundColor: "hsl(152 42% 28% / 0.85)" }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2">بيانات الجمعية</p>
          <h2 className="text-3xl font-black font-heading text-white">معلومات موثقة</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
              data-testid={`stat-${i}`}
            >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)" }}>
                <s.icon className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-4xl md:text-5xl font-black font-heading text-white mb-1">{s.value}</h4>
              <p className="text-white/70 text-sm font-medium">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  const features = [
    { icon: ShieldCheck, text: "خدمة الحجاج والمعتمرين والزوار" },
    { icon: MapPin, text: "المقر الرئيسي: مكة المكرمة" },
    { icon: Eye, text: "رؤيتنا: خدمات توعوية وإرشادية مبتكرة لضيوف الرحمن" },
    { icon: Target, text: "رسالتنا: المساندة وتيسير أداء المناسك" },
  ];

  const highlights = [
    { icon: Globe2, label: "التوجيه والإرشاد", color: "bg-emerald-500" },
    { icon: Users, label: "رعاية ضيوف الرحمن", color: "bg-sky-500" },
    { icon: ShieldCheck, label: "الوصول الشامل", color: "bg-emerald-600" },
    { icon: HandHeart, label: "التطوع لخدمتهم", color: "bg-teal-600" },
  ];

  return (
    <section className="py-16 bg-white" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="section-label mb-2">من نحن</p>
            <h2 className="text-3xl md:text-4xl font-black font-heading mb-6 leading-tight" style={{ color: "hsl(210 22% 14%)" }}>
              نسعى لبناء مجتمع<br />
              <span style={{ color: "hsl(152 42% 28%)" }}>متكافل ومتراحم</span>
            </h2>
            <p className="leading-relaxed mb-8" style={{ color: "hsl(215 15% 42%)", fontSize: "1.05rem" }}>
              جمعية معين للحج والعمرة جمعية أهلية مقرها مكة المكرمة، وتعمل على تطوير خدمات التوعية والإرشاد والمساندة لضيوف الرحمن.
            </p>

            <div className="space-y-3 mb-8">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "hsl(152 42% 92%)" }}>
                    <f.icon className="w-4 h-4" style={{ color: "hsl(152 42% 28%)" }} />
                  </div>
                  <p className="text-sm" style={{ color: "hsl(215 15% 38%)" }}>{f.text}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/about">
                <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm text-white font-heading transition-all hover:opacity-90 hover:shadow-md" style={{ backgroundColor: "hsl(152 42% 28%)" }} data-testid="button-about">
                  اعرف المزيد عنا
                </button>
              </Link>
              <Link href="/contact">
                <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm font-heading border-2 transition-all hover:shadow-md" style={{ borderColor: "hsl(152 42% 28%)", color: "hsl(152 42% 28%)" }}>
                  <Phone className="w-4 h-4" />
                  تواصل معنا
                </button>
              </Link>
            </div>
          </motion.div>

              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-3">
                <div className="rounded-2xl p-6 text-center shadow-md" style={{ backgroundColor: "hsl(152 42% 28%)" }}>
                  <Eye className="w-9 h-9 mx-auto mb-3 text-white opacity-90" />
                  <h3 className="font-heading font-bold text-base text-white">رؤيتنا</h3>
                  <p className="text-white/70 text-xs mt-1">خدمات توعوية وإرشادية مبتكرة</p>
                </div>
                <div className="relative rounded-2xl overflow-hidden shadow-md">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-green-500" />
                  <div className="absolute inset-0 opacity-10"><div className="absolute top-2 right-4 w-20 h-20 bg-white rounded-full blur-2xl" /></div>
                  <div className="relative z-10 p-5">
                    <Globe2 className="w-8 h-8 text-white mb-2" />
                    <p className="font-heading font-bold text-white text-sm">التوجيه والإرشاد</p>
                    <p className="text-white/70 text-xs mt-1">لضيوف الرحمن</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3 mt-6">
                <div className="relative rounded-2xl overflow-hidden shadow-md">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-400" />
                  <div className="absolute inset-0 opacity-10"><div className="absolute top-2 left-4 w-20 h-20 bg-white rounded-full blur-2xl" /></div>
                  <div className="relative z-10 p-5">
                    <Users className="w-8 h-8 text-white mb-2" />
                    <p className="font-heading font-bold text-white text-sm">الوصول الشامل</p>
                    <p className="text-white/70 text-xs mt-1">لذوي الإعاقة وكبار السن</p>
                  </div>
                </div>
                <div className="rounded-2xl p-6 text-center shadow-md" style={{ backgroundColor: "hsl(28 44% 59%)" }}>
                  <Target className="w-9 h-9 mx-auto mb-3 text-white opacity-90" />
                  <h3 className="font-heading font-bold text-base text-white">رسالتنا</h3>
                  <p className="text-white/70 text-xs mt-1">مساندة الحجاج والمعتمرين والزوار</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function LeaderboardSection() {
  const { data: leaderboard } = useLeaderboard();

  return (
    <section className="py-16" style={{ backgroundColor: "hsl(35 28% 97%)" }} dir="rtl">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="section-label mb-1">المتبرعون</p>
                <h3 className="text-2xl font-black font-heading" style={{ color: "hsl(210 22% 14%)" }}>قائمة الشرف</h3>
              </div>
              <Link href="/leaderboard" className="text-sm font-semibold flex items-center gap-1 hover:underline" style={{ color: "hsl(152 42% 28%)" }} data-testid="link-leaderboard">
                عرض الكل <ArrowLeft className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-2.5">
              {leaderboard && leaderboard.length > 0 ? (
                leaderboard.slice(0, 5).map((donor, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3.5 rounded-xl transition-colors"
                    style={{ backgroundColor: "white", border: "1px solid hsl(35 15% 88%)" }}
                    data-testid={`donor-${idx}`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm"
                        style={{
                          backgroundColor: idx === 0 ? "#f59e0b" : idx === 1 ? "#94a3b8" : idx === 2 ? "#c4966b" : "hsl(35 15% 88%)",
                          color: idx < 3 ? "white" : "hsl(215 15% 48%)",
                        }}
                      >
                        {idx + 1}
                      </div>
                      <span className="font-bold text-sm" style={{ color: "hsl(210 22% 14%)" }}>{donor.name}</span>
                    </div>
                    <span className="font-bold text-sm" style={{ color: "hsl(152 42% 28%)" }}>{Number(donor.totalDonations).toLocaleString()} ر.س</span>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 rounded-2xl" style={{ backgroundColor: "white", border: "1px solid hsl(35 15% 88%)" }}>
                  <Award className="w-12 h-12 mx-auto mb-3 opacity-25" style={{ color: "hsl(152 42% 28%)" }} />
                  <p style={{ color: "hsl(215 15% 55%)" }}>كن أول المتبرعين!</p>
                  <Link href="/donate">
                    <button className="mt-4 px-5 py-2 rounded-xl text-sm font-bold text-white" style={{ backgroundColor: "hsl(152 42% 28%)" }}>
                      تبرع الآن
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>

              <div>
            <div className="mb-6">
              <p className="section-label mb-1">تبرع الآن</p>
              <h3 className="text-2xl font-black font-heading" style={{ color: "hsl(210 22% 14%)" }}>اختر مبلغ تبرعك</h3>
            </div>
            <DonationCard />
          </div>
        </div>
      </div>
    </section>
  );
}

function NewsSection() {
  const { data: news } = useQuery({
    queryKey: ["/api/news"],
    queryFn: async () => {
      const r = await previewFetch("/api/news");
      return r.ok ? r.json() : [];
    },
    staleTime: 120_000,
  });

  if (!news || news.length === 0) return null;

  const gradients = ["from-emerald-500 to-teal-400", "from-blue-500 to-cyan-400", "from-amber-500 to-orange-400"];

  return (
    <section className="py-16 bg-white" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="section-label mb-1">الأخبار</p>
            <h2 className="text-3xl font-black font-heading" style={{ color: "hsl(210 22% 14%)" }}>آخر المستجدات</h2>
          </div>
          <Link href="/news">
            <button className="hidden sm:flex items-center gap-1.5 text-sm font-semibold hover:underline" style={{ color: "hsl(152 42% 28%)" }}>
              عرض الكل <ArrowLeft className="w-4 h-4" />
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.slice(0, 3).map((item: any, i: number) => (
            <motion.div key={item.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="group bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ border: "1px solid hsl(35 15% 88%)" }}>
                {item.imageUrl ? (
                  <div className="h-48 overflow-hidden">
                    <img src={item.imageUrl} alt={item.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                ) : (
                  <div className={`h-48 bg-gradient-to-br ${gradients[i % gradients.length]} flex items-center justify-center`}>
                    <span className="text-4xl font-black font-heading text-white/30">معين</span>
                  </div>
                )}
                <div className="p-5">
                  <span className="badge-premium text-[11px] mb-3 inline-flex">خبر</span>
                  <h3 className="font-heading font-bold text-lg mb-2 line-clamp-2" style={{ color: "hsl(210 22% 14%)" }}>{item.title}</h3>
                  <div className="text-sm line-clamp-2 mb-4" style={{ color: "hsl(215 15% 50%)" }} dangerouslySetInnerHTML={{ __html: item.content }} />
                  <Link href={`/news/${item.slug}`}>
                    <button className="text-sm font-bold flex items-center gap-1" style={{ color: "hsl(152 42% 28%)" }}>
                      اقرأ المزيد <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function JobsSection() {
  const { data: jobs } = useQuery<any[]>({
    queryKey: ["/api/jobs"],
    queryFn: async () => { const r = await previewFetch("/api/jobs"); return r.ok ? r.json() : []; },
    staleTime: 300_000,
  });

  const activeJobs = jobs?.filter((j) => j.isActive).slice(0, 3) || [];
  if (activeJobs.length === 0) return null;

  return (
    <section className="py-16" style={{ backgroundColor: "hsl(35 28% 97%)" }} dir="rtl">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="section-label mb-1">انضم إلى الفريق</p>
            <h2 className="text-3xl font-black font-heading" style={{ color: "hsl(210 22% 14%)" }}>فرص التوظيف</h2>
          </div>
          <Link href="/jobs">
            <button className="hidden sm:flex items-center gap-1.5 text-sm font-semibold hover:underline" style={{ color: "hsl(152 42% 28%)" }}>
              كافة الوظائف <ArrowLeft className="w-4 h-4" />
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {activeJobs.map((job, i) => (
            <div key={job.id} className="bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md" style={{ border: "1px solid hsl(35 15% 88%)" }}>
              <div className="h-24 bg-gradient-to-br from-primary/80 to-teal-500 flex items-center justify-center">
                <Briefcase className="w-10 h-10 text-white/80" />
              </div>
              <div className="p-5">
                <h3 className="font-heading font-bold text-lg mb-1" style={{ color: "hsl(210 22% 14%)" }}>{job.title}</h3>
                <p className="text-sm mb-4" style={{ color: "hsl(215 15% 52%)" }}>{job.department}</p>
                <Link href={`/jobs?apply=${job.id}`}>
                  <button className="w-full py-2.5 rounded-xl font-bold text-sm text-white font-heading transition-all hover:opacity-90" style={{ backgroundColor: "hsl(152 42% 28%)" }}>
                    قدم الآن
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RegisterPromptSection() {
  const { user } = useAuth();
  if (user) return null;

  return (
    <section className="py-8 px-4" dir="rtl">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl overflow-hidden border"
          style={{
            background: "linear-gradient(135deg, hsl(152 55% 12%) 0%, hsl(152 48% 20%) 60%, hsl(28 44% 22%) 100%)",
            borderColor: "rgba(255,255,255,0.08)",
          }}
        >
          {/* Background orb */}
          <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full opacity-20 pointer-events-none"
            style={{ background: "radial-gradient(circle, hsl(152 60% 45%) 0%, transparent 70%)" }} />
          <div className="absolute -bottom-8 -right-8 w-36 h-36 rounded-full opacity-10 pointer-events-none"
            style={{ background: "radial-gradient(circle, hsl(28 60% 55%) 0%, transparent 70%)" }} />

          <div className="relative z-10 p-6">
            {/* Header */}
            <div className="flex items-start gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: "hsl(152 55% 22%)" }}>
                <Heart className="w-5 h-5" style={{ color: "hsl(152 60% 60%)" }} />
              </div>
              <div>
                <h3 className="font-black text-white text-lg font-heading leading-tight">انضم إلى مجتمع معين</h3>
                 <p className="text-white/55 text-sm mt-0.5">تابع تبرعاتك واحصل على شهادة تبرع</p>
              </div>
            </div>

            {/* Sign in options */}
            <div className="space-y-2.5">
              {/* Google */}
              <a href="#" data-testid="button-home-google-signin"
                className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl transition-all hover:opacity-95 active:scale-98"
                style={{ background: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" className="shrink-0">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="flex-1 text-center text-sm font-bold" style={{ color: "#3c4043" }}>التسجيل بـ Google</span>
              </a>

              {/* Apple */}
              <a href="#" data-testid="button-home-apple-signin"
                className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl transition-all hover:opacity-90 active:scale-98"
                style={{
                  background: "#000",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                  fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                }}>
                <SiApple className="w-5 h-5 text-white shrink-0" />
                <span className="flex-1 text-center text-sm font-semibold text-white">التسجيل بـ Apple</span>
              </a>

              {/* Phone */}
              <Link href="/login">
                <div
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl cursor-pointer transition-all hover:bg-white/10"
                  style={{ border: "1.5px solid rgba(255,255,255,0.2)" }}
                  data-testid="button-home-phone-signin"
                >
                  <Phone className="w-5 h-5 shrink-0" style={{ color: "rgba(255,255,255,0.7)" }} />
                  <span className="flex-1 text-center text-sm font-bold text-white/85">التسجيل برقم الهاتف</span>
                </div>
              </Link>
            </div>

            {/* Footer note */}
            <p className="text-center text-white/35 text-xs mt-4">
              يمكن إصدار شهادة التبرع بعد تأكيد العملية
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function VolunteerStrip() {
  return (
    <section className="py-10 bg-white" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-l from-primary to-teal-600">
          <img
            src={imgHeroVolunteer}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-25"
          />
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 md:p-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.3)" }}>
                <HandHeart className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="font-heading font-black text-xl text-white">تطوع معنا</h3>
                <p className="text-white/70 text-sm">انضم لفريق المتطوعين وساهم في مشاريعنا الإنسانية</p>
              </div>
            </div>
            <Link href="/volunteer">
              <button
                className="shrink-0 px-7 py-3 rounded-xl font-black text-sm text-white font-heading transition-all hover:opacity-90 hover:shadow-xl"
                style={{ backgroundColor: "hsl(28 44% 59%)" }}
                data-testid="button-volunteer-strip"
              >
                سجل الآن
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="relative py-20 overflow-hidden" dir="rtl">
      <img
        src={imgHeroVolunteer}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "brightness(0.25)" }}
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsl(152 42% 20% / 0.9) 0%, hsl(28 44% 30% / 0.85) 100%)" }} />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-6 border" style={{ backgroundColor: "rgba(255,255,255,0.12)", borderColor: "rgba(255,255,255,0.25)", color: "white" }}>
            <Heart className="w-4 h-4" />
            لكل تبرع أثر لا يُمحى
          </div>
          <h2 className="text-3xl md:text-4xl font-black font-heading text-white mb-4 leading-relaxed">
            ﴿ وَمَا تُقَدِّمُوا لِأَنفُسِكُم مِّنْ خَيْرٍ تَجِدُوهُ عِندَ اللَّهِ ﴾
          </h2>
          <p className="text-white/80 text-lg mb-8">كل ريال تتبرع به يصنع فرقاً حقيقياً في حياة المحتاجين</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/donate">
              <button
                className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-black text-base font-heading text-white shadow-2xl hover:shadow-xl hover:-translate-y-0.5 transition-all"
                style={{ backgroundColor: "hsl(28 44% 59%)" }}
                data-testid="button-cta-donate"
              >
                <Zap className="w-5 h-5" />
                تبرع الآن
              </button>
            </Link>
            <Link href="/bank-transfer">
              <button
                className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-black text-base font-heading text-white border-2 border-white/40 hover:bg-white/10 transition-all"
                data-testid="button-cta-transfer"
              >
                <Building2 className="w-5 h-5" />
                تحويل بنكي
              </button>
            </Link>
          </div>
          <p className="text-white/40 text-xs mt-6">جمعية معين للحج والعمرة</p>
        </motion.div>
      </div>
    </section>
  );
}

export function Current() {
  useSEO({
    title: "جمعية معين للحج والعمرة",
    description: "منصة جمعية معين للحج والعمرة لخدمة الحجاج والمعتمرين.",
    image: "/__mockup/images/og-banner1.png",
  });

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "hsl(35 28% 97%)" }}>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <QuickDonateStrip />
        <RegisterPromptSection />
        <ServicesSection />
        <StatsSection />
        <AboutSection />
        <LeaderboardSection />
        <NewsSection />
        <JobsSection />
        <VolunteerStrip />
        <DevicesSection />
        <SiteBookSection />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
