import { useEffect, useState } from "react";
import {
  ArrowDownLeft,
  ArrowLeft,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  Globe2,
  GraduationCap,
  Heart,
  HandHeart,
  HeartHandshake,
  Layers3,
  Landmark,
  MapPin,
  Menu,
  Star,
  Sprout,
  ShieldCheck,
  UsersRound,
  UserRound,
  Waves,
  X,
} from "lucide-react";
import { Link } from "wouter";
import { useSEO } from "@/hooks/use-seo";
import { Footer } from "@/components/Footer";
import { openLoginModal } from "@/lib/login-modal";

const copy = {
  ar: {
    place: "المملكة العربية السعودية",
    nav: ["الرئيسية", "الخدمات الإنسانية", "المشاريع", "التبرع", "عن الجمعية", "الحوكمة والشفافية"],
    donate: "ساهم في الخدمة",
    title: "معين\nفي خدمة ضيوف الرحمن",
    intro:
      "تتمثل رسالة الجمعية في إرشاد الحجاج والمعتمرين والزوار، وتيسير أداء المناسك بعناية وكرامة.",
    services: "انضم إلينا",
    about: "تعرّف على الجمعية",
    welcome: "أهلاً بضيوف الرحمن",
    welcomeBody:
      "من مكة المكرمة، نمدّ يد العون لكل من قصد البيت الحرام. نؤمن أن حسن الاستقبال، وكلمة الإرشاد، والخدمة القريبة تصنع فرقاً في رحلة ضيوف الرحمن.",
    servicesTitle: "خدمات أقرب إلى احتياج الرحلة",
    servicesBody:
      "أهداف تسعى الجمعية إلى تحقيقها عبر التوعية والإرشاد والضيافة والمساندة العملية.",
    cards: [
      {
        title: "إرشاد ومساندة",
        body: "معلومات واضحة ومساندة تعين الحاج والمعتمر على أداء رحلته بثقة وطمأنينة.",
        image: "/images/mueen-kaaba-hero.jpg",
        alt: "ضيف من ضيوف الرحمن في المسجد الحرام",
      },
      {
        title: "رعاية في المشاعر",
        body: "خدمات مساندة تراعي احتياجات ضيوف الرحمن في رحلتهم ومناسكهم.",
        image: "/images/mueen-arafat-camps.jpg",
        alt: "مخيمات ضيوف الرحمن في عرفات",
      },
      {
        title: "ضيافة وعناية",
        body: "مبادرات ضيافة عملية، ومنها توفير المياه، لتكون الخدمة قريبة حين تدعو الحاجة.",
        image: "/images/mueen-water-service.jpg",
        alt: "مياه مخصصة لخدمة ضيوف الرحمن",
      },
    ],
    aboutLabel: "معين في مكة",
    aboutTitle: "قريبون من الرحلة،\nحاضرون عند الحاجة",
    aboutBody:
      "معين جمعية أهلية تُعنى بخدمات الحج والعمرة. نعمل بروح المسؤولية والرحمة على تقديم التوعية والإرشاد والرعاية، ونضع كرامة ضيف الرحمن وراحته في مقدمة أولوياتنا.",
    values: [
      "خدمة إنسانية تحفظ الكرامة",
      "إرشاد واضح ومساندة عملية",
      "عمل مسؤول من قلب مكة",
    ],
    ctaTitle: "كن عوناً في رحلة ضيف الرحمن",
    ctaBody:
      "مساهمتك تدعم رسالة الجمعية في خدمة الحجاج والمعتمرين والزوار.",
    give: "تبرع عبر منصة الجمعية",
    faqTitle: "إجابات تقرّب لكم الصورة",
    faq: [
      [
        "هل تقدم الجمعية خدمات للحجاج والمعتمرين؟",
         "تتمثل رسالة الجمعية في مساندة الحجاج والمعتمرين والزوار بالتوعية والإرشاد والرعاية والضيافة.",
      ],
      [
        "كيف أتعرف على الخدمات أو أساهم؟",
        "يمكنك زيارة صفحات الخدمات والمشاريع أو التبرع عبر منصة الجمعية.",
      ],
    ],
    footer: "جمعية معين لخدمات الحج والعمرة · مكة المكرمة",
    legal: "الاسم المسجل: جمعية معين الحاج والمعتمر",
    language: "English",
    back: "العودة إلى الأعلى",
  },
  en: {
    place: "Kingdom of Saudi Arabia",
    nav: ["Home", "Humanitarian Services", "Projects", "Donate", "About", "Governance"],
    donate: "Support our work",
    title: "Mueen,\nhere for pilgrims",
    intro:
      "The association’s mission is to guide pilgrims and visitors and help make the rites easier to perform with dignity.",
    services: "Join us",
    about: "About the association",
    welcome: "A welcome for the guests of the Merciful",
    welcomeBody:
      "From Makkah, we offer a helping hand to those who come to the Sacred House. A thoughtful welcome, clear guidance, and care close at hand can make the journey easier.",
    servicesTitle: "Support shaped around the journey",
    servicesBody:
      "Our goals center on awareness, guidance, hospitality, and practical support for pilgrims and visitors.",
    cards: [
      {
        title: "Guidance & support",
        body: "Clear information and practical support to help pilgrims approach their journey with confidence.",
        image: "/images/mueen-kaaba-hero.jpg",
        alt: "Pilgrim at the Grand Mosque",
      },
      {
        title: "Care at the holy sites",
        body: "Support services attentive to the needs of pilgrims throughout their journey and rites.",
        image: "/images/mueen-arafat-camps.jpg",
        alt: "Pilgrim tents at Arafat",
      },
      {
        title: "Hospitality & care",
        body: "Thoughtful hospitality initiatives, including water provision, bringing care closer when it matters.",
        image: "/images/mueen-water-service.jpg",
        alt: "Water prepared for pilgrims",
      },
    ],
    aboutLabel: "Mueen in Makkah",
    aboutTitle: "Close to the journey,\nready when needed",
    aboutBody:
      "Mueen is a nonprofit association dedicated to Hajj and Umrah services. We work with responsibility and compassion to provide guidance, care, and practical support—placing the dignity and comfort of every pilgrim first.",
    values: [
      "Human service that upholds dignity",
      "Clear guidance and practical support",
      "Responsible work from the heart of Makkah",
    ],
    ctaTitle: "Be part of a pilgrim’s journey",
    ctaBody:
      "Your support strengthens the association’s work with pilgrims and visitors.",
    give: "Donate through the association",
    faqTitle: "Helpful answers",
    faq: [
      [
        "Does Mueen serve Hajj and Umrah pilgrims?",
        "The association’s mission is to support pilgrims and visitors through guidance, care, hospitality, and practical assistance.",
      ],
      [
        "How can I learn more or offer support?",
        "Explore the services and projects pages, or donate through the association’s platform.",
      ],
    ],
    footer: "Mueen Association for Hajj and Umrah Services · Makkah",
    legal: "Registered name: Mueen Al-Hajj wal-Mu'tamer Association",
    language: "العربية",
    back: "Back to top",
  },
};

export default function MueenHomeRedesign() {
  const [english, setEnglish] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openNavDropdown, setOpenNavDropdown] = useState<"about" | "governance" | "more" | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [impactStats, setImpactStats] = useState<Record<string, number> | null>(null);
  const [impactLoading, setImpactLoading] = useState(true);
  const t = english ? copy.en : copy.ar;
  const [heroName, heroPromise] = t.title.split("\n");
  const direction = english ? "ltr" : "rtl";

  useSEO({
    title: english
      ? "Mueen Association for Hajj and Umrah Services"
      : "جمعية معين لخدمات الحج والعمرة",
    siteName: english
      ? "Mueen Association for Hajj and Umrah Services"
      : "جمعية معين لخدمات الحج والعمرة",
    description: english
      ? "Guidance, care, hospitality, and practical support for pilgrims and visitors in Makkah."
      : "خدمات التوعية والإرشاد والرعاية والضيافة للحجاج والمعتمرين والزوار في مكة المكرمة.",
    image: "/images/mueen-kaaba-hero.jpg",
  });

  const navTargets = ["#home", "/services", "/campaigns", "/donate", "/about", "/governance/charter"];
  const aboutNavLinks = english
    ? [
        ["About", "/about"], ["Vision & Mission", "/vision"], ["Goals", "/goals"],
        ["Founders", "/founders"], ["Board", "/board"], ["Programs", "/programs"],
      ]
    : [
        ["نشأة الجمعية", "/about"], ["الرؤية والرسالة", "/vision"], ["الأهداف", "/goals"],
        ["المؤسسون", "/founders"], ["مجلس الإدارة", "/board"], ["البرامج", "/programs"],
      ];
  const governanceNavLinks = english
    ? [
        ["Financial Statements", "/governance/financials"], ["Policies & Regulations", "/governance/policies"],
        ["Committees", "/governance/committees"], ["Code of Ethics", "/governance/ethics"],
        ["Disclosure", "/governance/disclosure"], ["Satisfaction", "/governance/satisfaction"],
        ["Executive Leadership", "/governance/executive"],
      ]
    : [
        ["القوائم المالية", "/governance/financials"], ["السياسات واللوائح", "/governance/policies"],
        ["اللجان", "/governance/committees"], ["الميثاق الأخلاقي", "/governance/ethics"],
        ["الإفصاح", "/governance/disclosure"], ["قياس الرضا", "/governance/satisfaction"],
        ["المسؤول التنفيذي", "/governance/executive"],
      ];
  const moreNavLinks = english
    ? [
        ["Volunteer", "/volunteer"], ["News", "/news"], ["Blog", "/blog"],
        ["Impact", "/impact"], ["Contact", "/contact"], ["Bank Accounts", "/bank-accounts"],
      ]
    : [
        ["التطوع", "/volunteer"], ["الأخبار", "/news"], ["المدونة", "/blog"],
        ["الأثر", "/impact"], ["تواصل معنا", "/contact"], ["الحسابات البنكية", "/bank-accounts"],
      ];

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/public/impact-stats", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load impact statistics");
        return response.json();
      })
      .then((result) => {
        if (!result?.success || !result?.data) throw new Error("Invalid impact statistics response");
        const keys = ["yearsInService", "annualPrograms", "donors", "executedProjects", "beneficiaries"];
        setImpactStats(Object.fromEntries(keys.map((key) => {
          const value = Number(result.data[key]);
          return [key, Number.isFinite(value) && value >= 0 ? value : 0];
        })));
      })
      .catch((error) => {
        if (error?.name !== "AbortError") setImpactStats(null);
      })
      .finally(() => {
        if (!controller.signal.aborted) setImpactLoading(false);
      });
    return () => controller.abort();
  }, []);

  return (
    <main
      dir={direction}
      className="mueen-home min-h-screen overflow-hidden bg-[#f7f5ee] text-[#173c2c]"
      style={{ fontFamily: "var(--font-body, 'Tajawal', sans-serif)" }}
    >
      <style>{`
        .mueen-home { --forest:#104b34; --forest-deep:#0a3928; --gold:#e3b644; --paper:#f7f5ee; }
        .mueen-home * { box-sizing:border-box; }
        .mueen-home .mueen-inner { width:min(1180px,calc(100% - 48px)); margin-inline:auto; }
        .mueen-home .mueen-hero-image { animation:mueen-drift 18s ease-in-out infinite alternate; }
        .mueen-home .mueen-hero { min-height:clamp(318px,39vw,560px); background:#f7f3e9; }
        .mueen-home .mueen-hero-photo { object-position:center 48%; }
        .mueen-home .mueen-hero-wash { background:linear-gradient(90deg,rgba(248,245,237,0) 36%,rgba(248,245,237,.22) 49%,rgba(248,245,237,.88) 65%,#f8f5ed 76%); }
        .mueen-home .mueen-hero .mueen-inner { display:flex; min-height:inherit; align-items:center; }
        .mueen-home .mueen-hero-copy { width:min(43%,510px); margin-inline-start:0; margin-inline-end:auto; padding-block:20px 84px; }
        .mueen-home .mueen-hero-title > span:first-child { font-size:clamp(2.5rem,4.5vw,4rem); line-height:1; }
        .mueen-home .mueen-hero-title > span:last-child { font-size:clamp(1.5rem,2.8vw,2.35rem); line-height:1.25; }
        .mueen-home .mueen-theme-strip { width:min(1120px,84%); box-shadow:0 14px 34px rgba(56,45,25,.12),0 2px 8px rgba(56,45,25,.06); }
        .mueen-home .mueen-theme-item + .mueen-theme-item { border-inline-start:1px solid #dfd9cc; }
        @media(max-width:760px){
          .mueen-home .mueen-hero { min-height:0; background:#f8f5ed; }
          .mueen-home .mueen-hero-image-wrap { position:relative; height:260px; }
          .mueen-home .mueen-hero-photo { object-position:42% center; }
          .mueen-home .mueen-hero-wash { background:linear-gradient(0deg,#f8f5ed 0%,rgba(248,245,237,0) 37%); }
          .mueen-home .mueen-hero .mueen-inner { display:block; min-height:0; }
          .mueen-home .mueen-hero-copy { width:100%; margin:0; padding:24px 0 22px; }
          .mueen-home .mueen-hero-title > span:first-child { font-size:clamp(2.45rem,11vw,3.5rem); }
          .mueen-home .mueen-hero-title > span:last-child { font-size:clamp(1.6rem,7.2vw,2.3rem); }
          .mueen-home .mueen-theme-strip { position:relative!important; inset:auto!important; transform:none!important; margin:0 auto 16px; width:calc(100% - 28px)!important; grid-template-columns:repeat(2,minmax(0,1fr)); }
          .mueen-home .mueen-theme-item { min-height:58px; padding-inline:10px; font-size:11px; }
          .mueen-home .mueen-theme-item:last-child { grid-column:span 2; }
          .mueen-home .mueen-theme-item + .mueen-theme-item { border-inline-start:0; }
        }
        .mueen-home .mueen-card img { transition:transform .7s cubic-bezier(.2,.7,.2,1); }
        .mueen-home .mueen-card:hover img { transform:scale(1.045); }
        .mueen-home a:focus-visible,.mueen-home button:focus-visible { outline:3px solid #e3b644; outline-offset:3px; }
        @keyframes mueen-drift { from {transform:scale(1)} to {transform:scale(1.05)} }
        @media(max-width:760px){.mueen-home .mueen-inner{width:min(100% - 36px,600px)}}
        .mueen-home .mueen-header-top { background:#104b34; color:#f4f0df; border-bottom:1px solid rgba(226,182,77,.5); }
        .mueen-home .mueen-header-main { background:#fbfaf6; }
        .mueen-home .mueen-header-nav a,.mueen-home .mueen-header-nav button { position:relative; white-space:nowrap; }
        .mueen-home .mueen-header-nav a::after,.mueen-home .mueen-header-nav button::after { content:""; position:absolute; inset-inline:0; bottom:-8px; height:1px; background:#a77d24; transform:scaleX(0); transform-origin:center; transition:transform .2s ease; }
        .mueen-home .mueen-header-nav a:hover::after,.mueen-home .mueen-header-nav button:hover::after,.mueen-home .mueen-header-nav a:focus-visible::after,.mueen-home .mueen-header-nav button:focus-visible::after { transform:scaleX(1); }
        .mueen-home .mueen-featured { position:relative; isolation:isolate; background:#f5f1e7; }
        .mueen-home .mueen-featured::before { content:""; position:absolute; inset:0; z-index:-1; background:url("/images/mueen-islamic-geometric.svg") repeat; background-size:160px 160px; opacity:.18; pointer-events:none; }
        .mueen-home .mueen-project-grid { direction:ltr; }
        .mueen-home .mueen-project-card { box-shadow:0 4px 15px rgba(61,53,36,.08); }
        .mueen-home .mueen-project-image { transition:transform .55s cubic-bezier(.2,.7,.2,1); }
        .mueen-home .mueen-project-card:hover .mueen-project-image { transform:scale(1.045); }
        @media(max-width:760px){.mueen-home .mueen-project-grid{grid-template-columns:repeat(3,minmax(0,1fr));width:100%;max-width:none;margin-inline:auto;gap:8px}.mueen-home .mueen-project-card{min-width:0;padding:6px}.mueen-home .mueen-project-image-wrap{height:80px}}
        .mueen-home .mueen-impact-banner { background-color:#075037; background-image:linear-gradient(90deg,rgba(5,70,47,.14),rgba(5,70,47,.08)),url("/images/mueen-impact-banner.webp"); background-position:center; background-size:cover; }
        .mueen-home .mueen-impact-content { width:84%; }
        .mueen-home .mueen-impact-stat + .mueen-impact-stat { border-inline-start:1px solid rgba(238,231,202,.42); }
        .mueen-home .mueen-impact-value { font-variant-numeric:tabular-nums; }
        .mueen-home .mueen-impact-loading { color:rgba(255,255,255,.48); }
        @media(max-width:760px){
          .mueen-home .mueen-impact-banner { background-image:linear-gradient(90deg,rgba(5,70,47,.94),rgba(5,70,47,.72)),url("/images/mueen-impact-banner.webp"); background-position:right center; background-size:auto 100%; }
          .mueen-home .mueen-impact-content { width:100%; }
          .mueen-home .mueen-impact-stat + .mueen-impact-stat { border-inline-start:0; }
          .mueen-home .mueen-impact-stat:nth-child(even) { border-inline-start:1px solid rgba(238,231,202,.35); }
        }
        .mueen-home .mueen-register-art { background-image:linear-gradient(180deg,rgba(9,49,35,.08),rgba(9,49,35,.58)),url("/images/mueen-kaaba-hero.jpg"); background-size:cover; background-position:center; }
        @media(max-width:760px){.mueen-home .mueen-header-top .mueen-inner{width:calc(100% - 28px)}}
        @media(max-width:520px){
          .mueen-home .mueen-header-main .mueen-inner{gap:3px}
          .mueen-home .mueen-header-main .mueen-inner > a:first-child{gap:1px}
          .mueen-home .mueen-header-main .mueen-inner > a:first-child img{width:30px;height:30px}
          .mueen-home .mueen-header-main .mueen-inner > a:first-child strong{font-size:13px}
          .mueen-home .mueen-header-main .mueen-inner > a:first-child span span{font-size:7px}
          .mueen-home .mueen-header-main .mueen-inner > a:first-child small{font-size:6px}
          .mueen-home .mueen-mobile-inline-nav{display:flex;flex:1;min-width:0;justify-content:center;gap:clamp(2px,.7vw,4px);overflow-x:auto;scrollbar-width:none}
          .mueen-home .mueen-mobile-inline-nav::-webkit-scrollbar{display:none}
          .mueen-home .mueen-mobile-inline-nav a,.mueen-home .mueen-mobile-inline-nav button{flex:0 0 auto;gap:1px;font-size:clamp(7.5px,2.2vw,9px);line-height:1;white-space:nowrap}
          .mueen-home .mueen-header-actions{gap:0}
          .mueen-home .mueen-header-actions > a{gap:2px;padding:5px;font-size:7px;white-space:nowrap}
          .mueen-home .mueen-header-actions > button{display:inline-flex;padding:4px}
          .mueen-home .mueen-header-top .mueen-inner{gap:2px}
          .mueen-home .mueen-header-top button{display:inline-flex;font-size:7px}
          .mueen-home .mueen-header-top .mueen-inner > span{font-size:7px}
          .mueen-home .mueen-inner{width:calc(100% - 20px)}
          .mueen-home .mueen-hero{min-height:300px}
          .mueen-home .mueen-hero-image-wrap{position:absolute;height:auto}
          .mueen-home .mueen-hero-photo{object-position:42% center}
          .mueen-home .mueen-hero-wash{background:linear-gradient(90deg,rgba(248,245,237,.02) 20%,rgba(248,245,237,.45) 44%,rgba(248,245,237,.95) 73%,#f8f5ed 100%)}
          .mueen-home .mueen-hero .mueen-inner{display:flex;min-height:300px;align-items:center}
          .mueen-home .mueen-hero-copy{width:56%;margin-inline-start:0;margin-inline-end:auto;padding:14px 0 72px}
          .mueen-home .mueen-hero-title > span:first-child{font-size:clamp(1.55rem,7.5vw,2rem)}
          .mueen-home .mueen-hero-title > span:last-child{font-size:clamp(.95rem,4.1vw,1.12rem);line-height:1.2}
          .mueen-home .mueen-hero-copy > p{margin-top:7px;font-size:8.5px;line-height:1.45}
          .mueen-home .mueen-hero-copy > div{flex-wrap:nowrap;gap:5px;margin-top:8px}
          .mueen-home .mueen-hero-copy > div a{gap:3px;padding:6px 7px;font-size:8px;white-space:nowrap}
          .mueen-home .mueen-theme-strip{position:absolute!important;left:50%!important;bottom:7px!important;transform:translateX(-50%)!important;margin:0;width:calc(100% - 20px)!important;grid-template-columns:repeat(5,minmax(0,1fr))!important;border-radius:12px}
          .mueen-home .mueen-theme-item{min-height:48px;gap:3px;padding:3px 2px;font-size:7px;line-height:1.2}
          .mueen-home .mueen-theme-item:last-child{grid-column:auto}
          .mueen-home .mueen-theme-item svg{width:12px;height:12px}
          .mueen-home .mueen-theme-item + .mueen-theme-item{border-inline-start:1px solid #dfd9cc}
          .mueen-home .mueen-project-grid{grid-template-columns:repeat(3,minmax(0,1fr));max-width:none;margin-inline:0;gap:5px}
          .mueen-home .mueen-project-image-wrap{height:62px}
          .mueen-home .mueen-project-card{border-radius:9px}
          .mueen-home .mueen-project-card > div:last-child{padding:5px}
          .mueen-home .mueen-project-card h3{font-size:9px;line-height:1.35}
          .mueen-home .mueen-project-card p{min-height:38px;font-size:8px;line-height:1.3}
          .mueen-home .mueen-project-card a{min-height:24px;margin-top:5px;padding-inline:3px;font-size:8px}
          .mueen-home .mueen-project-card span{right:3px;top:3px;min-width:0;padding:3px 5px;font-size:6.5px}
          .mueen-home .mueen-impact-banner{background-image:linear-gradient(90deg,rgba(5,70,47,.86),rgba(5,70,47,.75)),url("/images/mueen-impact-banner.webp")}
          .mueen-home .mueen-impact-content{display:grid;width:100%;grid-template-columns:repeat(5,minmax(0,1fr));min-height:67px;gap:0;padding:5px 3px}
          .mueen-home .mueen-impact-stat{min-height:56px;flex-direction:column;gap:2px;padding:2px 1px}
          .mueen-home .mueen-impact-stat + .mueen-impact-stat,.mueen-home .mueen-impact-stat:nth-child(even){border-inline-start:1px solid rgba(238,231,202,.35)}
          .mueen-home .mueen-impact-stat svg{width:12px;height:12px}
          .mueen-home .mueen-impact-value{font-size:12px;line-height:1.05}
          .mueen-home .mueen-impact-stat > div > div:last-child{max-width:none;margin-top:2px;font-size:6px;line-height:1.2}
          .mueen-home #join{padding-block:18px}
          .mueen-home #join .mueen-inner{grid-template-columns:.74fr 1.26fr;gap:9px}
          .mueen-home #join .mueen-register-art{min-height:150px;padding:6px;border-radius:13px}
          .mueen-home #join .mueen-register-art > div:last-child{gap:4px;padding:5px;border-radius:8px}
          .mueen-home #join .mueen-register-art img{width:24px;height:24px}
          .mueen-home #join .mueen-register-art p:first-child{font-size:9px}
          .mueen-home #join .mueen-register-art p:last-child{font-size:6px}
          .mueen-home #join h2{font-size:14px;line-height:1.3}
          .mueen-home #join p{font-size:8px;line-height:1.4}
          .mueen-home #join .mt-5.grid{grid-template-columns:repeat(3,minmax(0,1fr));gap:3px;margin-top:7px}
          .mueen-home #join .mt-5.grid > div{min-height:72px;flex-direction:column;align-items:flex-start;justify-content:center;gap:3px;padding:4px;border-radius:8px}
          .mueen-home #join .mt-5.grid > div > span:first-child{width:18px;height:18px;font-size:8px}
          .mueen-home #join .mt-5.grid > div > span:last-child{font-size:8px;line-height:1.2}
          .mueen-home #join a{min-height:30px;margin-top:7px;padding-inline:8px;font-size:8px}
          .mueen-home .mueen-welcome{padding-block:26px}
          .mueen-home .mueen-welcome .mueen-inner > div:first-child{max-width:none}
          .mueen-home .mueen-welcome h2{font-size:22px}
          .mueen-home .mueen-welcome .mueen-inner > div:first-child > p:last-child{font-size:10px;line-height:1.7}
          .mueen-home .mueen-welcome .mueen-pillars{grid-template-columns:repeat(3,minmax(0,1fr));margin-top:14px;border-radius:12px}
          .mueen-home .mueen-welcome .mueen-pillars > div{gap:5px;padding:8px 5px}
          .mueen-home .mueen-welcome .mueen-pillars > div > span{width:24px;height:24px;border-radius:8px}
          .mueen-home .mueen-welcome .mueen-pillars svg{width:13px;height:13px}
          .mueen-home .mueen-welcome .mueen-pillars h3{font-size:8px}
          .mueen-home .mueen-welcome .mueen-pillars p{font-size:7.5px;line-height:1.3}
          .mueen-home #services{padding-block:30px}
          .mueen-home .mueen-services-heading{flex-direction:row;align-items:flex-end;gap:8px;margin-bottom:14px}
          .mueen-home .mueen-services-heading h2{font-size:18px;line-height:1.2}
          .mueen-home .mueen-services-heading p{max-width:46%;font-size:8px;line-height:1.4}
          .mueen-home .mueen-service-grid{grid-template-columns:repeat(3,minmax(0,1fr));gap:5px}
          .mueen-home .mueen-service-card{border-radius:10px}
          .mueen-home .mueen-service-card > div:first-child{height:78px}
          .mueen-home .mueen-service-card > div:last-child{padding:7px}
          .mueen-home .mueen-service-card h3{font-size:9px;line-height:1.35}
          .mueen-home .mueen-service-card p{font-size:8px;line-height:1.35}
          .mueen-home .mueen-service-card a{margin-top:6px;font-size:7px}
          .mueen-home #about{padding-block:30px}
          .mueen-home .mueen-about-grid{grid-template-columns:.92fr 1.08fr;gap:10px}
          .mueen-home .mueen-about-grid > div:first-child > img{height:158px}
          .mueen-home .mueen-about-copy h2{font-size:16px;line-height:1.3}
          .mueen-home .mueen-about-copy > p{margin-top:7px;font-size:8px;line-height:1.5}
          .mueen-home .mueen-about-copy ul{margin-top:8px}
          .mueen-home .mueen-about-copy ul li + li{margin-top:4px}
          .mueen-home .mueen-about-copy ul li{gap:4px;font-size:7px;line-height:1.3}
          .mueen-home .mueen-about-copy ul li > span{width:17px;height:17px}
          .mueen-home .mueen-about-copy ul li svg{width:10px;height:10px}
          .mueen-home .mueen-about-copy a{margin-top:8px;font-size:8px}
          .mueen-home .mueen-donation-cta{padding-block:23px}
          .mueen-home .mueen-donation-cta .mueen-inner{flex-direction:row;align-items:center;gap:8px}
          .mueen-home .mueen-donation-cta h2{font-size:17px;line-height:1.25}
          .mueen-home .mueen-donation-cta p{margin-top:5px;font-size:8px;line-height:1.4}
          .mueen-home .mueen-donation-cta a{gap:4px;padding:8px 9px;font-size:8px}
          .mueen-home .mueen-home-faq{padding-block:30px}
          .mueen-home .mueen-faq-grid{grid-template-columns:.75fr 1.25fr;gap:10px}
          .mueen-home .mueen-faq-intro h2{font-size:17px;line-height:1.3}
          .mueen-home .mueen-faq-intro p{font-size:8px;line-height:1.4}
          .mueen-home .mueen-home-faq button{gap:4px;padding-block:9px;font-size:8px}
          .mueen-home .mueen-home-faq button svg{width:12px;height:12px}
          .mueen-home .mueen-home-faq button + p{font-size:7px;line-height:1.4}
          .mueen-home .mueen-footer-top{grid-template-columns:repeat(2,minmax(0,1fr));gap:15px;padding-bottom:16px}
          .mueen-home .mueen-footer-top > div:first-child{grid-column:span 2;max-width:none}
          .mueen-home .mueen-footer-top h3{margin-bottom:6px;font-size:10px}
          .mueen-home .mueen-footer-top p,.mueen-home .mueen-footer-top a{font-size:8px;line-height:1.45}
          .mueen-home .mueen-footer-top > div:first-child > div img{width:36px;height:36px}
          .mueen-home .mueen-footer-top > div:first-child h2{font-size:12px}
          .mueen-home .mueen-footer-top > div:first-child > p{margin-top:5px}
          .mueen-home .mueen-footer-meta{grid-template-columns:1fr;gap:10px;padding-block:12px}
          .mueen-home .mueen-footer-meta h3{margin-bottom:5px;font-size:9px}
          .mueen-home .mueen-footer-meta > div:first-child > div{grid-template-columns:1fr;font-size:7px;line-height:1.35}
          .mueen-home .mueen-footer-qrs{grid-template-columns:repeat(3,minmax(0,1fr));gap:4px}
          .mueen-home .mueen-footer-qrs > div{gap:4px;padding:4px;border-radius:7px}
          .mueen-home .mueen-footer-qrs > div > a{padding:3px}
          .mueen-home .mueen-footer-qrs img,.mueen-home .mueen-footer-qrs svg{width:48px;height:48px}
          .mueen-home .mueen-footer-qrs > div > div{text-align:start}
          .mueen-home .mueen-footer-qrs p:first-child{font-size:8px}
          .mueen-home .mueen-footer-qrs p:last-child{font-size:7px;line-height:1.2}
          .mueen-home .mueen-footer-bottom{flex-direction:row;align-items:center;gap:6px;text-align:start}
          .mueen-home .mueen-footer-bottom p,.mueen-home .mueen-footer-bottom a{font-size:7px}
          .mueen-home .mueen-footer-bottom > div{gap:6px}
        }
        @media(prefers-reduced-motion:reduce){.mueen-home *, .mueen-home *::before,.mueen-home *::after{animation-duration:.01ms!important;animation-iteration-count:1!important;scroll-behavior:auto!important;transition-duration:.01ms!important}}
      `}</style>

      <div className="mueen-header-top">
        <div dir="ltr" className="mueen-inner flex h-[22px] items-center justify-between gap-3 text-[9px] sm:h-[23px] sm:text-[10px]">
          <div className="flex shrink-0 items-center gap-2.5">
            <span dir={direction} className="shrink-0">{english ? "Serving the guests of the Merciful" : "خدمة ضيوف الرحمن"}</span>
            <button onClick={() => setEnglish(!english)} className="hidden shrink-0 items-center gap-1 rounded px-1.5 py-1 text-[9px] text-white/80 transition hover:bg-white/10 hover:text-white sm:inline-flex" aria-label={english ? "Switch to Arabic" : "Switch to English"}>
              <Globe2 size={12} />{t.language}
            </button>
          </div>
          <span dir={direction} className="flex shrink-0 items-center gap-1.5"><MapPin size={11} />{t.place}</span>
        </div>
      </div>

      <header className="mueen-header-main relative z-30 border-b border-[#e9e4d6]">
        <div className="mueen-inner flex h-[52px] items-center justify-between gap-3">
          <Link href="/" className="flex shrink-0 items-center gap-1.5 sm:gap-2" aria-label={english ? "Mueen home" : "الصفحة الرئيسية لمعين"}>
            <img src="/images/mueen-pilgrim-mark.png" alt="" className="h-[38px] w-[38px] object-contain sm:h-[43px] sm:w-[43px]" />
            <span className="leading-[1.05]">
              <strong className="block text-[17px] font-black tracking-tight text-[#171b17] sm:text-[19px]">{english ? "Mueen" : "معين"}</strong>
              <span className="block text-[9px] font-bold leading-none tracking-[.06em] text-[#31543c]">MUEEN</span>
              <small className="mt-0.5 block text-[8px] font-semibold text-[#526455]">{english ? "Hajj & Umrah" : "الحج والعمرة"}</small>
            </span>
          </Link>
          <nav className="mueen-header-nav hidden items-center gap-3 md:flex" aria-label={english ? "Main navigation" : "التنقل الرئيسي"}>
            {t.nav.map((label, i) => {
              const href = navTargets[i];
              const navClass = "inline-flex items-center gap-1 text-[10px] font-bold text-[#222923] transition hover:text-[#a77d24] sm:text-[11px]";
              if (i === 4 || i === 5) {
                const menuKey = i === 4 ? "about" : "governance";
                const menuLinks = menuKey === "about" ? aboutNavLinks : governanceNavLinks;
                return (
                  <div key={label} className="relative">
                    <button
                      type="button"
                      className={navClass}
                      aria-expanded={openNavDropdown === menuKey}
                      onClick={() => setOpenNavDropdown(openNavDropdown === menuKey ? null : menuKey)}
                    >
                      {label}<ChevronDown size={12} />
                    </button>
                    {openNavDropdown === menuKey && (
                      <div dir={direction} className="absolute right-0 top-full z-50 mt-3 min-w-[190px] rounded-xl border border-[#e8e2d3] bg-[#fffdf8] p-2 shadow-xl">
                        {menuLinks.map(([itemLabel, itemHref]) => (
                          <Link key={itemHref} href={itemHref} onClick={() => setOpenNavDropdown(null)} className="block rounded-lg px-3 py-2 text-[11px] font-semibold text-[#31543c] transition hover:bg-[#f4f1e7] hover:text-[#9a742c]">
                            {itemLabel}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              const content = <>{label}</>;
              return href.startsWith("/") ? <Link key={label} href={href} className={navClass}>{content}</Link> : <a key={label} href={href} className={navClass}>{content}</a>;
            })}
          </nav>
          <nav className="mueen-mobile-inline-nav hidden items-center" aria-label={english ? "Main navigation" : "التنقل الرئيسي"}>
            {t.nav.map((label, i) => {
              const href = navTargets[i];
              const content = <>{label}</>;
              const className = "inline-flex items-center font-bold text-[#222923] transition hover:text-[#a77d24]";
              return href.startsWith("/") ? <Link key={label} href={href} className={className}>{content}</Link> : <a key={label} href={href} className={className}>{content}</a>;
            })}
          </nav>
          <button onClick={() => openLoginModal()} className="hidden shrink-0 items-center gap-1.5 rounded-md bg-[#bd8b27] px-3 py-1.5 text-[10px] font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,.28)] transition hover:bg-[#a9781b] md:inline-flex sm:text-[11px]">
            <UserRound size={14} />{english ? "Log in" : "تسجيل الدخول"}
          </button>
          <div className="mueen-header-actions flex shrink-0 items-center gap-1.5 md:hidden">
            <button onClick={() => openLoginModal()} className="inline-flex items-center gap-1.5 rounded-md bg-[#bd8b27] px-2 py-1.5 text-[9px] font-bold text-white transition hover:bg-[#a9781b] sm:px-2.5 sm:text-[10px]" aria-label={english ? "Log in" : "تسجيل الدخول"}>
              <UserRound size={13} />{english ? "Log in" : "تسجيل الدخول"}
            </button>
            <button className="rounded-md border border-[#d8ded5] bg-[#f7f5ee] p-1.5 text-[#17442f] transition hover:bg-[#eeede4]" aria-label={menuOpen ? (english ? "Close menu" : "إغلاق القائمة") : (english ? "Open menu" : "فتح القائمة")} aria-expanded={menuOpen} aria-controls="mueen-mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        {menuOpen && <nav id="mueen-mobile-navigation" className="border-t border-[#e5e4dc] bg-[#fbfaf6] px-5 py-2 lg:hidden" aria-label={english ? "Mobile navigation" : "التنقل"}>
          {t.nav.slice(0, 4).map((label, i) => {
            const href = navTargets[i];
            return href.startsWith("/") ? (
              <Link key={label} href={href} onClick={() => setMenuOpen(false)} className="block border-b border-[#ecebe4] py-3 text-sm font-semibold text-[#344b3c] last:border-0">{label}</Link>
            ) : (
              <a key={label} href={href} onClick={() => setMenuOpen(false)} className="block border-b border-[#ecebe4] py-3 text-sm font-semibold text-[#344b3c] last:border-0">{label}</a>
            );
          })}
          {[
            { key: "about" as const, label: t.nav[4], links: aboutNavLinks },
            { key: "governance" as const, label: t.nav[5], links: governanceNavLinks },
            { key: "more" as const, label: english ? "More pages" : "صفحات أخرى", links: moreNavLinks },
          ].map((group) => (
            <div key={group.key} className="border-b border-[#ecebe4]">
              <button
                type="button"
                onClick={() => setOpenNavDropdown(openNavDropdown === group.key ? null : group.key)}
                aria-expanded={openNavDropdown === group.key}
                className="flex w-full items-center justify-between py-3 text-sm font-bold text-[#344b3c]"
              >
                {group.label}
                <ChevronDown size={16} className={`transition-transform ${openNavDropdown === group.key ? "rotate-180" : ""}`} />
              </button>
              {openNavDropdown === group.key && (
                <div className="pb-2">
                  {group.links.map(([label, href]) => (
                    <Link key={href} href={href} onClick={() => { setMenuOpen(false); setOpenNavDropdown(null); }} className="block rounded-lg px-3 py-2 text-xs font-medium text-[#526456] hover:bg-[#f1efe6]">
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="flex items-center justify-between gap-3 py-3">
            <Link href="/donate" onClick={() => setMenuOpen(false)} className="inline-flex items-center gap-2 rounded-md bg-[#e2b64d] px-3.5 py-2 text-xs font-bold text-[#173c2c]"><HandHeart size={15} />{t.donate}</Link>
            <button onClick={() => setEnglish(!english)} className="inline-flex items-center gap-1.5 rounded px-2 py-2 text-xs text-[#536456] hover:bg-[#efeee7]" aria-label={english ? "Switch to Arabic" : "Switch to English"}><Globe2 size={14} />{t.language}</button>
          </div>
        </nav>}
      </header>

      <section id="home" className="mueen-hero relative isolate overflow-hidden">
        <div className="mueen-hero-image-wrap absolute inset-0">
          <img className="mueen-hero-image mueen-hero-photo absolute inset-0 h-full w-full object-cover" src="/images/mueen-kaaba-golden.webp" alt={english ? "Pilgrim looking toward the Kaaba at the Grand Mosque" : "ضيف من ضيوف الرحمن يتجه بنظره نحو الكعبة المشرفة"} />
          <div className="mueen-hero-wash absolute inset-0" />
        </div>
        <div className="mueen-inner relative">
          <div className="mueen-hero-copy text-[#173c2c]">
            <h1 className="mueen-hero-title tracking-[-.045em] text-[#155437]">
              <span className="block font-black">{heroName}</span>
              <span className="block font-bold">{heroPromise}</span>
            </h1>
            <p className="mt-3 max-w-[470px] text-[13px] leading-[1.7] text-[#4e5b4e] sm:text-[14px]">{t.intro}</p>
            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              <Link href="/about" className="inline-flex items-center gap-2 rounded-full bg-[#145337] px-5 py-2.5 text-[12px] font-bold text-white shadow-[0_5px_14px_rgba(21,83,55,.18)] transition hover:-translate-y-0.5 hover:bg-[#0f442c]">{t.about}<ChevronLeft size={14} /></Link>
              <Link href="/volunteer" className="inline-flex items-center gap-2 rounded-full bg-[#bd8b27] px-5 py-2.5 text-[12px] font-bold text-white shadow-[0_5px_14px_rgba(132,93,25,.18)] transition hover:-translate-y-0.5 hover:bg-[#a9781b]">{t.services}<ArrowDownLeft size={15} /></Link>
            </div>
          </div>
        </div>
        <div className="mueen-theme-strip absolute bottom-4 left-1/2 z-10 grid w-[min(1120px,calc(100% - 48px))] -translate-x-1/2 grid-cols-5 overflow-hidden rounded-[22px] border border-[#e4dfd4] bg-[#fbfaf6]/95 backdrop-blur-md">
          {[
            [Landmark, english ? "Hajj & Umrah" : "الحج والعمرة"],
            [HandHeart, english ? "Support for those in need" : "دعم المحتاجين"],
            [HeartHandshake, english ? "Care & services" : "الرعاية والخدمات"],
            [GraduationCap, english ? "Awareness & training" : "التوعية والتدريب"],
            [Sprout, english ? "Sustainable development" : "التنمية المستدامة"],
          ].map(([Icon, label], index) => {
            const ThemeIcon = Icon as typeof Waves;
            return <div key={String(label)} className={`mueen-theme-item flex min-h-[66px] items-center justify-center gap-2 px-2 text-center text-[10px] font-bold leading-5 text-[#344b39] sm:gap-2.5 sm:px-4 sm:text-[12px] ${index > 0 ? "border-[#dfd9cc]" : ""}`}>
              <ThemeIcon className="shrink-0 text-[#9d792b]" size={19} strokeWidth={1.8} />
              <span>{String(label)}</span>
            </div>;
          })}
        </div>
      </section>

      <section className="mueen-featured px-0 py-10 sm:py-12 md:py-14" aria-labelledby="mueen-featured-title">
        <div className="mueen-inner relative">
          <div className="relative mb-5 flex flex-col items-center gap-2 sm:mb-7">
            <div className="flex items-center justify-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-[#b28b38] sm:w-12" />
              <h2 id="mueen-featured-title" className="text-center text-[23px] font-black tracking-tight text-[#173c2c] sm:text-[27px]">
                {english ? "Our goals" : "مسارات نعمل لأجلها"}
              </h2>
              <span aria-hidden="true" className="h-px w-8 bg-[#b28b38] sm:w-12" />
            </div>
            <Link href="/campaigns" className="self-start inline-flex items-center gap-1.5 text-[11px] font-bold text-[#45594a] transition hover:text-[#a27a26] sm:absolute sm:right-0 sm:top-1/2 sm:-translate-y-1/2 sm:text-xs">
              {english ? "View all projects" : "عرض جميع المشاريع"}
              <ArrowLeft size={13} aria-hidden="true" />
            </Link>
          </div>
          <div className="mueen-project-grid grid grid-cols-3 gap-3 sm:gap-4">
            {[
              {
                key: "sites",
                image: "/images/mueen-arafat-camps.jpg",
                alt: english ? "Pilgrim camps at Arafat" : "مخيمات ضيوف الرحمن في عرفات",
                tag: english ? "Guidance" : "إرشاد",
                title: english ? "Guidance for pilgrims" : "إرشاد ضيوف الرحمن",
                description: english ? "Our mission includes helping pilgrims understand and perform their rites with confidence." : "تتضمن رسالة الجمعية توعية الحجاج وإرشادهم لأداء المناسك بثقة وطمأنينة.",
              },
              {
                key: "transport",
                image: "/images/mueen-project-transport.webp",
                alt: english ? "Pilgrim transport" : "وسائل نقل لخدمة ضيوف الرحمن",
                tag: english ? "Accessibility" : "إتاحة",
                title: english ? "Easier access to rites" : "تيسير أداء المناسك",
                description: english ? "We aim to improve access for older adults and people with disabilities." : "نسعى إلى تيسير الوصول لكبار السن والأشخاص ذوي الإعاقة.",
              },
              {
                key: "water",
                image: "/images/mueen-water-service.jpg",
                alt: english ? "Hospitality for pilgrims" : "ضيافة ضيوف الرحمن",
                tag: english ? "Hospitality" : "ضيافة",
                title: english ? "A welcoming presence" : "ضيافة ومساندة",
                description: english ? "Hospitality and practical support are part of our goals for pilgrims and visitors." : "الضيافة والمساندة العملية من أهداف الجمعية لخدمة الحجاج والزوار.",
              },
            ].map(project => (
              <article key={project.key} className="mueen-project-card min-w-0 overflow-hidden rounded-[15px] border border-[#e5dfd2] bg-[#fbfaf6]" dir={english ? "ltr" : "rtl"}>
                <div className="mueen-project-image-wrap relative h-[155px] overflow-hidden sm:h-[82px] lg:h-[116px]">
                  <img src={project.image} alt={project.alt} loading="lazy" className="mueen-project-image h-full w-full object-cover" />
                  <span className="absolute right-2.5 top-2 inline-flex min-w-[54px] justify-center rounded-full bg-[#12613e] px-2.5 py-1 text-[9px] font-bold leading-none text-white shadow-sm sm:text-[10px]">{project.tag}</span>
                </div>
                <div className="px-3 pb-3 pt-2 sm:px-4 sm:pb-3.5">
                  <h3 className="truncate text-[13px] font-black leading-5 text-[#20251f] sm:text-[15px]">{project.title}</h3>
                  <p className="mt-0.5 min-h-[32px] text-[10px] leading-[1.55] text-[#5f655e] sm:text-[11px]">{project.description}</p>
                  <Link href="/services" className="mt-2.5 flex min-h-[32px] items-center justify-center rounded-full bg-[#167443] px-3 text-[10px] font-bold text-white transition hover:bg-[#105d35] sm:text-[11px]">
                    {english ? "Explore our goals" : "تعرّف على أهدافنا"}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="impact" className="mueen-inner -mt-1 mb-10 sm:mb-12" aria-label={english ? "Mueen mission" : "رسالة جمعية معين"}>
        <div className="mueen-impact-banner overflow-hidden rounded-[18px] border border-[#c8aa5d] text-[#fff9e8] shadow-[0_8px_22px_rgba(24,57,39,.14)]" aria-busy={impactLoading}>
          <div dir="ltr" className="mueen-impact-content grid min-h-[112px] grid-cols-2 items-center gap-y-1 px-3 py-3 sm:min-h-[118px] sm:grid-cols-5 sm:gap-0 sm:px-[2.5%] sm:py-2">
            {[
              { key: "yearsInService", icon: Star, label: english ? "Years serving pilgrims" : "سنوات في خدمة ضيوف الرحمن" },
              { key: "annualPrograms", icon: CalendarDays, label: english ? "Annual programs" : "برنامج سنوي" },
              { key: "donors", icon: Heart, label: english ? "Donors" : "متبرع كريم" },
              { key: "executedProjects", icon: Layers3, label: english ? "Completed projects" : "مشروع منفذ" },
              { key: "beneficiaries", icon: UsersRound, label: english ? "Beneficiaries" : "مستفيد" },
            ].map(({ key, icon: Icon, label }, index) => {
              const value = impactStats?.[key];
              const displayedValue = impactLoading
                ? "—"
                : value === undefined
                  ? "—"
                  : `${value > 0 ? "+" : ""}${value.toLocaleString(english ? "en" : "ar-SA")}`;
              return (
                <div
                  key={key}
                  className={`mueen-impact-stat flex min-h-[42px] items-center justify-center gap-2 px-1.5 text-center sm:min-h-[74px] sm:flex-col sm:gap-1.5 sm:px-2 ${index > 0 ? "sm:border-l sm:border-[#eee7ca]/40" : ""}`}
                  dir={direction}
                >
                  <Icon className="h-[18px] w-[18px] shrink-0 text-[#e4c36e] sm:h-5 sm:w-5" aria-hidden="true" />
                  <div>
                    <div className={`mueen-impact-value text-[18px] font-black leading-none text-[#fff8df] sm:text-[21px] ${impactLoading ? "mueen-impact-loading" : ""}`} aria-live="polite">
                      {displayedValue}
                    </div>
                    <div className="mt-1 max-w-[118px] text-[9px] leading-[1.35] text-white/80 sm:text-[10px]">
                      {label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="join" className="relative overflow-hidden bg-[#eeede4] py-11 sm:py-14">
        <div dir="ltr" className="mueen-inner grid items-center gap-7 md:grid-cols-[.8fr_1.2fr] md:gap-10">
          <div className="mueen-register-art relative flex min-h-[225px] items-end overflow-hidden rounded-[22px] border border-[#d8d0bc] p-5 shadow-[0_12px_28px_rgba(32,53,39,.12)] sm:min-h-[250px] md:order-1">
            <div className="absolute inset-0 -z-0 bg-[#0b3c2a]/10" />
            <div className="relative z-10 flex items-center gap-3 rounded-2xl border border-white/60 bg-[#fbfaf6]/95 px-4 py-3 shadow-lg backdrop-blur">
              <img src="/images/mueen-pilgrim-mark.png" alt="" className="h-12 w-12 object-contain" />
              <div>
                <p className="text-sm font-black text-[#154b33]">{english ? "Mueen" : "معين"}</p>
                <p className="text-[10px] font-semibold text-[#59675b]">{english ? "Hajj and Umrah services" : "خدمات الحج والعمرة"}</p>
              </div>
            </div>
          </div>
          <div dir={direction} className="md:order-2">
            <p className="mb-2 text-[11px] font-bold tracking-[.12em] text-[#9b792d]">{english ? "JOIN MUEEN" : "انضم إلى معين"}</p>
            <h2 className="text-2xl font-black leading-tight text-[#174b34] sm:text-3xl">
              {english ? "Join the Mueen community" : "سجّل الآن في مجتمع معين"}
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#647066]">
              {english
                ? "Sign in with your mobile number to access the association’s services and follow its projects."
                : "للاستفادة من خدمات الجمعية وبرامجها ومتابعة مشاريعها."}
            </p>
            <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-3 md:gap-2">
              {[
                { number: "١", enNumber: "1", title: english ? "Enter your mobile number" : "أدخل رقم جوالك" },
                { number: "٢", enNumber: "2", title: english ? "Receive a WhatsApp code" : "استلم رمز التحقق على واتساب" },
                { number: "٣", enNumber: "3", title: english ? "Complete sign-in" : "أكمل التسجيل وانضم إلينا" },
              ].map((step) => (
                <div key={step.number} className="flex min-h-[58px] items-center gap-3 rounded-xl border border-[#e0ddd2] bg-[#fbfaf6] px-3 py-2.5 sm:flex-col sm:items-start sm:justify-center sm:gap-1.5 sm:px-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#167443] text-xs font-black text-white">
                    {english ? step.enNumber : step.number}
                  </span>
                  <span className="text-xs font-semibold leading-5 text-[#435447]">{step.title}</span>
                </div>
              ))}
            </div>
            <button type="button" onClick={() => openLoginModal()} className="mt-5 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#167443] px-6 text-sm font-bold text-white shadow-[0_6px_16px_rgba(22,116,67,.18)] transition hover:-translate-y-0.5 hover:bg-[#105d35]">
              {english ? "Start registration" : "ابدأ التسجيل الآن"}
              <ArrowLeft size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      <section className="mueen-welcome bg-[#f7f5ee] pb-20 pt-12 md:pb-28 md:pt-20">
        <div className="mueen-inner">
          <div className="mx-auto max-w-[790px] text-center">
            <p className="mb-4 text-[11px] font-bold tracking-[.18em] text-[#a27a26]">{english ? "A WELCOME FROM MAKKAH" : "ترحيبٌ من مكة المكرمة"}</p>
            <h2 className="text-3xl font-semibold leading-snug tracking-tight md:text-[42px]">{t.welcome}</h2>
            <div className="mx-auto my-6 h-px w-32 bg-gradient-to-r from-transparent via-[#e3b644] to-transparent" />
            <p className="mx-auto max-w-[700px] text-[15px] leading-[2.1] text-[#637268] md:text-[17px]">{t.welcomeBody}</p>
          </div>
          <div className="mueen-pillars mt-12 grid overflow-hidden rounded-[22px] border border-[#e2e2d7] bg-[#eeede4] sm:grid-cols-3">
            {[
              [HandHeart, english ? "Care" : "رعاية", english ? "A considerate presence through every step." : "حضور يراعي احتياج ضيف الرحمن."],
              [ShieldCheck, english ? "Guidance" : "توجيه", english ? "Useful guidance, shared with clarity." : "إرشاد نافع، بلغة واضحة وقريبة."],
              [Waves, english ? "Hospitality" : "ضيافة", english ? "Practical services with a warm welcome." : "خدمات عملية بروح الترحيب والكرم."],
            ].map(([Icon, title, desc], i) => {
              const IconComponent = Icon as typeof HandHeart;
              return <div key={String(title)} className={`flex items-center gap-4 px-6 py-6 md:px-8 ${i < 2 ? "border-b border-[#dcded3] sm:border-b-0 sm:border-l" : ""}`}>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#dfe8dc] text-[#26704b]"><IconComponent size={21} /></span>
                <div><h3 className="font-bold text-[#214a35]">{String(title)}</h3><p className="mt-1 text-xs leading-6 text-[#6b786d]">{String(desc)}</p></div>
              </div>;
            })}
          </div>
        </div>
      </section>

      <section id="services" className="bg-[#eeede4] py-20 md:py-28">
        <div className="mueen-inner">
          <div className="mueen-services-heading mb-10 flex flex-col justify-between gap-5 md:mb-14 md:flex-row md:items-end">
            <div><p className="mb-3 text-[11px] font-bold tracking-[.16em] text-[#a27a26]">{english ? "HOW WE HELP" : "كيف نعينكم؟"}</p><h2 className="max-w-[600px] text-3xl font-semibold leading-tight tracking-tight md:text-[42px]">{t.servicesTitle}</h2></div>
            <p className="max-w-[390px] text-sm leading-7 text-[#69776b]">{t.servicesBody}</p>
          </div>
          <div className="mueen-service-grid grid gap-5 md:grid-cols-3">
            {t.cards.map((card, i) => <article key={card.title} className={`mueen-service-card mueen-card group overflow-hidden rounded-[20px] border border-[#e2e1d7] bg-[#fbfaf6] ${i === 1 ? "md:translate-y-8" : ""}`}>
              <div className="relative h-[225px] overflow-hidden md:h-[245px]"><img src={card.image} alt={card.alt} loading="lazy" className="h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[#0a3327]/65 via-transparent to-transparent" /><span className="absolute bottom-4 right-5 text-xs font-semibold text-white/90">{card.title}</span></div>
              <div className="px-6 pb-6 pt-5"><h3 className="text-xl font-semibold text-[#1a442f]">{card.title}</h3><p className="mt-2 text-sm leading-7 text-[#69776b]">{card.body}</p><Link href="/services" className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-[#367255]">{english ? "Learn more" : "اكتشف المزيد"}<ArrowLeft size={14} /></Link></div>
            </article>)}
          </div>
        </div>
      </section>

      <section id="about" className="bg-[#f7f5ee] py-20 md:py-28">
        <div className="mueen-inner mueen-about-grid grid items-center gap-12 lg:grid-cols-[1fr_.9fr] lg:gap-20">
          <div className="relative overflow-hidden rounded-[24px]"><img src="/images/mueen-arafat-camps.jpg" alt={english ? "Pilgrim tents at Arafat" : "مخيمات ضيوف الرحمن في عرفات"} loading="lazy" className="h-[330px] w-full object-cover sm:h-[420px]" /><div className="absolute bottom-5 right-5 flex items-center gap-3 rounded-xl border border-white/30 bg-[#f7f5ee]/95 px-4 py-3 backdrop-blur"><img src="/images/mueen-pilgrim-mark.png" alt="" className="h-9 w-9 object-contain" /><span className="whitespace-pre-line text-xs font-semibold leading-5">{english ? "With pilgrims,\nfrom Makkah" : "مع ضيوف الرحمن،\nمن قلب مكة"}</span></div></div>
          <div className="mueen-about-copy"><p className="mb-3 text-[11px] font-bold tracking-[.16em] text-[#a27a26]">{english ? "MUEEN IN MAKKAH" : "معين في مكة"}</p><h2 className="whitespace-pre-line text-3xl font-semibold leading-[1.45] tracking-tight md:text-[42px]">{english ? "Close to the journey,\nready when needed" : "قريبون من الرحلة،\nحاضرون عند الحاجة"}</h2><p className="mt-5 text-[15px] leading-[2.1] text-[#637268]">{english ? "Mueen is a nonprofit association dedicated to Hajj and Umrah services. We work with responsibility and compassion to provide guidance, care, and practical support—placing the dignity and comfort of every pilgrim first." : "معين جمعية أهلية تُعنى بخدمات الحج والعمرة. نعمل بروح المسؤولية والرحمة على تقديم التوعية والإرشاد والرعاية، ونضع كرامة ضيف الرحمن وراحته في مقدمة أولوياتنا."}</p><ul className="mt-8 space-y-4">{(english ? copy.en.values : copy.ar.values).map(value => <li key={value} className="flex items-start gap-3 text-sm text-[#455d4b]"><span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e1eadf] text-[#28704a]"><ShieldCheck size={14} /></span>{value}</li>)}</ul><Link href="/about" className="mt-8 inline-flex items-center gap-2 border-b border-[#b08b37] pb-1.5 text-sm font-bold text-[#28583d]">{english ? "Discover the association" : "تعرّف على الجمعية"}<ArrowLeft size={15} /></Link></div>
        </div>
      </section>

      <section className="mueen-donation-cta bg-[#0e422f] py-16 text-[#fffdf6] md:py-20">
        <div className="mueen-inner flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-[650px]"><p className="mb-3 text-[11px] font-bold tracking-[.16em] text-[#e4c36e]">{english ? "A SHARED RESPONSIBILITY" : "مسؤولية نتشاركها"}</p><h2 className="text-3xl font-semibold leading-tight md:text-[40px]">{english ? "Be part of a pilgrim’s journey" : "كن عوناً في رحلة ضيف الرحمن"}</h2><p className="mt-4 max-w-[580px] text-sm leading-7 text-white/75">{english ? "Your support strengthens the association’s work with pilgrims and visitors." : "مساهمتك تدعم رسالة الجمعية في خدمة الحجاج والمعتمرين والزوار."}</p></div>
          <Link href="/donate" className="inline-flex shrink-0 items-center gap-3 rounded-full bg-[#e2b64d] px-6 py-4 text-sm font-bold text-[#153e2c] transition hover:-translate-y-0.5 hover:bg-[#f1cc70]">{english ? "Donate through Mueen" : "تبرع عبر منصة الجمعية"}<HandHeart size={18} /></Link>
        </div>
      </section>

      <section className="mueen-home-faq bg-[#f7f5ee] py-20 md:py-24">
        <div className="mueen-inner mueen-faq-grid grid gap-12 lg:grid-cols-[.7fr_1fr]">
          <div className="mueen-faq-intro"><p className="mb-3 text-[11px] font-bold tracking-[.16em] text-[#a27a26]">{english ? "HERE TO HELP" : "نحن هنا لمساعدتكم"}</p><h2 className="text-3xl font-semibold leading-tight md:text-[40px]">{english ? "Helpful answers" : "إجابات تقرّب لكم الصورة"}</h2><p className="mt-4 max-w-sm text-sm leading-7 text-[#69776b]">{english ? "Learn more about Mueen’s work and how to find us." : "تعرّفوا أكثر على عمل معين وطرق التواصل معنا."}</p></div>
          <div className="divide-y divide-[#dedfd5] border-y border-[#dedfd5]">
            {t.faq.map(([question, answer], i) => <div key={question}><button className="flex w-full items-center justify-between gap-5 py-5 text-start text-[15px] font-semibold" onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}><span>{question}</span><ChevronDown size={18} className={`shrink-0 text-[#a27a26] transition-transform ${openFaq === i ? "rotate-180" : ""}`} /></button>{openFaq === i && <p className="max-w-[650px] pb-5 text-sm leading-7 text-[#69776b]">{answer}</p>}</div>)}
          </div>
        </div>
      </section>

      <Footer english={english} />
    </main>
  );
}
