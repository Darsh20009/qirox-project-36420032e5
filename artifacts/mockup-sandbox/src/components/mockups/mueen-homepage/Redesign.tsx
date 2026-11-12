import { useState } from "react";
import {
  ArrowDownLeft, ArrowLeft, ArrowUpLeft, ChevronDown, ChevronLeft, Globe2,
  HandHeart, HeartHandshake, MapPin, Menu, MessageCircle, ShieldCheck, Sparkles,
  Waves, X,
} from "lucide-react";

const officialUrl = "https://www.mueenalhajjandmutamers.org.sa/";

const copy = {
  ar: {
    location: "مكة المكرمة · المملكة العربية السعودية",
    nav: ["الرئيسية", "عن معين", "خدماتنا", "تواصل معنا"],
    donate: "ساهم في الخدمة",
    eyebrow: "رفقٌ يرافق الرحلة",
    hero: "في رحاب مكة،\nنكون عوناً لضيوف الرحمن",
    lead: "جمعية معين لخدمات الحج والعمرة؛ نعمل على تيسير رحلة الحاج والمعتمر والزائر بالتوجيه والرعاية والمساندة.",
    discover: "اكتشف خدماتنا",
    story: "من نحن",
    welcome: "أهلاً بضيوف الرحمن",
    welcomeBody: "من مكة المكرمة، نمدّ يد العون لكل من قصد البيت الحرام. نؤمن أن حسن الاستقبال، وكلمة الإرشاد، والخدمة القريبة تصنع فرقاً في رحلة ضيوف الرحمن.",
    servicesLabel: "كيف نعينكم؟",
    servicesTitle: "خدمات أقرب إلى احتياج الرحلة",
    serviceIntro: "مسارات عملية ترافق ضيوف الرحمن بالعناية والتوجيه، في الأماكن والأوقات التي يحتاجون فيها إلى معين.",
    cards: [
      ["إرشاد ومساندة", "معلومات واضحة ومساندة تعين الحاج والمعتمر على أداء رحلته بثقة وطمأنينة.", "mueen-kaaba-hero.jpg", "إرشاد"],
      ["رعاية في المشاعر", "خدمات مساندة تراعي احتياجات ضيوف الرحمن في رحلتهم ومناسكهم.", "mueen-arafat-camps.jpg", "رعاية"],
      ["ضيافة وعناية", "مبادرات ضيافة عملية، ومنها توفير المياه، لتكون الخدمة قريبة حين تدعو الحاجة.", "mueen-water-service.jpg", "ضيافة"],
    ],
    aboutLabel: "معين في مكة",
    aboutTitle: "قريبون من الرحلة،\nحاضرون عند الحاجة",
    aboutBody: "معين جمعية أهلية تُعنى بخدمات الحج والعمرة. نعمل بروح المسؤولية والرحمة على تقديم التوعية والإرشاد والرعاية، ونضع كرامة ضيف الرحمن وراحته في مقدمة أولوياتنا.",
    principles: ["خدمة إنسانية تحفظ الكرامة", "إرشاد واضح ومساندة عملية", "عمل مسؤول من قلب مكة"],
    principleLabel: "قيمنا في كل خدمة",
    ctaTitle: "كن عوناً في رحلة ضيف الرحمن",
    ctaBody: "مساهمتك تدعم رسالة الجمعية في خدمة الحجاج والمعتمرين والزوار.",
    support: "ادعم خدمات معين",
    more: "تعرّف على الجمعية",
    contact: "تواصل مع معين",
    question: "هل تقدم الجمعية خدمات للحجاج والمعتمرين؟",
    answer: "نعم، تعمل الجمعية على مساندة الحجاج والمعتمرين والزوار عبر خدمات التوعية والإرشاد والرعاية والضيافة.",
    question2: "كيف أتعرف على الخدمات أو أساهم؟",
    answer2: "يمكنك زيارة الموقع الرسمي للجمعية للتعرّف على خدماتها ووسائل المساهمة المتاحة.",
    rights: "جمعية معين لخدمات الحج والعمرة · مكة المكرمة",
  },
  en: {
    location: "Makkah · Kingdom of Saudi Arabia",
    nav: ["Home", "About Mueen", "Our services", "Contact"],
    donate: "Support the service",
    eyebrow: "Care along the journey",
    hero: "Here in Makkah,\nwe’re here for pilgrims",
    lead: "Mueen Association for Hajj and Umrah supports pilgrims and visitors with guidance, care, and practical services.",
    discover: "Explore our services",
    story: "Our story",
    welcome: "A welcome for the guests of the Merciful",
    welcomeBody: "From Makkah, we offer a helping hand to those who come to the Sacred House. A thoughtful welcome, clear guidance, and care close at hand can make the journey easier.",
    servicesLabel: "How we help",
    servicesTitle: "Support shaped around the journey",
    serviceIntro: "Practical services offering care and guidance to pilgrims where and when they need support.",
    cards: [
      ["Guidance & support", "Clear information and practical support to help pilgrims approach their journey with confidence.", "mueen-kaaba-hero.jpg", "Guidance"],
      ["Care at the holy sites", "Support services attentive to the needs of pilgrims throughout their journey and rites.", "mueen-arafat-camps.jpg", "Care"],
      ["Hospitality & care", "Thoughtful hospitality initiatives, including water provision, bringing care closer when it matters.", "mueen-water-service.jpg", "Hospitality"],
    ],
    aboutLabel: "Mueen in Makkah",
    aboutTitle: "Close to the journey,\nready when needed",
    aboutBody: "Mueen is a nonprofit association dedicated to Hajj and Umrah services. We work with responsibility and compassion to provide guidance, care, and practical support—placing the dignity and comfort of every pilgrim first.",
    principles: ["Human service that upholds dignity", "Clear guidance and practical support", "Responsible work from the heart of Makkah"],
    principleLabel: "Our values in every service",
    ctaTitle: "Be part of a pilgrim’s journey",
    ctaBody: "Your support strengthens the association’s work with pilgrims and visitors.",
    support: "Support Mueen’s services",
    more: "Discover the association",
    contact: "Contact Mueen",
    question: "Does the association serve Hajj and Umrah pilgrims?",
    answer: "Yes. The association supports pilgrims and visitors through guidance, care, hospitality, and practical services.",
    question2: "How can I learn more or offer support?",
    answer2: "Visit the association’s official website to learn about its services and available ways to contribute.",
    rights: "Mueen Association for Hajj and Umrah · Makkah",
  },
};

export function Redesign() {
  const [english, setEnglish] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const t = english ? copy.en : copy.ar;
  const dir = english ? "ltr" : "rtl";

  return (
    <main dir={dir} className="mueen-page min-h-screen bg-[#f7f5ee] text-[#173c2c]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap');
        .mueen-page { --forest:#104b34; --forest-deep:#0a3928; --leaf:#34785a; --sun:#e3b644; --paper:#f7f5ee; --ink:#173c2c; --muted:#66766b; font-family:'IBM Plex Sans Arabic','DM Sans',sans-serif; overflow:hidden; }
        .mueen-page * { box-sizing:border-box; }
        .mueen-page .latin { font-family:'DM Sans',sans-serif; }
        .mueen-page .mueen-inner { width:min(1180px, calc(100% - 48px)); margin-inline:auto; }
        .mueen-page .mueen-nav { transition:background .3s ease, box-shadow .3s ease; }
        .mueen-page .hero-photo { animation: mueen-drift 18s ease-in-out infinite alternate; }
        @keyframes mueen-drift { from {transform:scale(1)} to {transform:scale(1.055)} }
        @keyframes mueen-rise { from {opacity:0; transform:translateY(18px)} to {opacity:1; transform:translateY(0)} }
        .mueen-page .reveal { animation:mueen-rise .8s both; }
        .mueen-page .delay-1 {animation-delay:.12s}.mueen-page .delay-2{animation-delay:.24s}
        .mueen-page .service-card img { transition:transform .7s cubic-bezier(.2,.7,.2,1); }
        .mueen-page .service-card:hover img { transform:scale(1.045); }
        .mueen-page .gold-rule { background:linear-gradient(90deg, transparent, #e3b644, transparent); }
        .mueen-page a:focus-visible,.mueen-page button:focus-visible { outline:3px solid #e3b644; outline-offset:3px; }
        @media(max-width:760px){ .mueen-page .mueen-inner{width:min(100% - 36px, 600px)} }
        @media(prefers-reduced-motion:reduce){.mueen-page *, .mueen-page *::before,.mueen-page *::after{animation-duration:.01ms!important;animation-iteration-count:1!important;scroll-behavior:auto!important;transition-duration:.01ms!important}}
      `}</style>

      <div className="bg-[#103f2d] text-[#f7f5ee] text-[11px] sm:text-xs">
        <div className="mueen-inner flex h-9 items-center justify-between gap-4">
          <span className="flex items-center gap-2 opacity-90"><MapPin size={13} />{t.location}</span>
          <button onClick={() => setEnglish(!english)} className="latin inline-flex items-center gap-2 rounded-full px-2.5 py-1 transition hover:bg-white/10" aria-label={english ? "Switch to Arabic" : "Switch to English"}>
            <Globe2 size={14} /> {english ? "العربية" : "English"}
          </button>
        </div>
      </div>

      <header className="mueen-nav relative z-30 bg-[#fbfaf6]/95 backdrop-blur-md">
        <div className="mueen-inner flex min-h-[82px] items-center justify-between gap-5">
          <a href="#home" className="flex shrink-0 items-center gap-3" aria-label={english ? "Mueen home" : "الصفحة الرئيسية لمعين"}>
            <img src="/__mockup/images/mueen-pilgrim-mark.png" alt="" className="h-[54px] w-[54px] object-contain" />
            <span className="leading-tight">
              <strong className="block text-[18px] font-bold tracking-tight">{english ? "Mueen" : "معين"}</strong>
              <small className="block text-[10px] text-[#718075]">{english ? "Hajj & Umrah Association" : "لخدمات الحج والعمرة"}</small>
            </span>
          </a>
          <nav className="hidden items-center gap-8 lg:flex" aria-label={english ? "Main navigation" : "التنقل الرئيسي"}>
            {t.nav.map((label, i) => <a key={label} className={`text-[13px] transition hover:text-[#ae7f1c] ${i === 0 ? "font-bold text-[#104b34]" : "text-[#657269]"}`} href={["#home", "#about", "#services", "#contact"][i]}>{label}</a>)}
          </nav>
          <a href={officialUrl} target="_blank" rel="noreferrer" className="hidden items-center gap-2 rounded-full bg-[#e2b64d] px-5 py-3 text-[13px] font-bold text-[#173c2c] transition hover:-translate-y-0.5 hover:bg-[#edc86b] sm:inline-flex">
            <HandHeart size={17} />{t.donate}<ArrowDownLeft size={15} />
          </a>
          <button className="rounded-xl border border-[#d8ded5] p-2.5 lg:hidden" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={20}/> : <Menu size={20}/>}</button>
        </div>
        {menuOpen && <nav className="border-t border-[#e5e4dc] bg-[#fbfaf6] px-6 py-3 lg:hidden">
          {t.nav.map((label, i) => <a key={label} onClick={() => setMenuOpen(false)} className="block border-b border-[#ecebe4] py-3 text-sm last:border-0" href={["#home", "#about", "#services", "#contact"][i]}>{label}</a>)}
          <a className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#e2b64d] px-4 py-2 text-sm font-bold" href={officialUrl} target="_blank" rel="noreferrer"><HandHeart size={16}/>{t.donate}</a>
        </nav>}
      </header>

      <section id="home" className="relative isolate min-h-[610px] overflow-hidden bg-[#102e24] md:min-h-[660px]">
        <img className="hero-photo absolute inset-0 h-full w-full object-cover object-center" src="/__mockup/images/mueen-kaaba-hero.jpg" alt={english ? "Pilgrim looking toward the Kaaba at the Grand Mosque" : "ضيف من ضيوف الرحمن يتأمل الكعبة المشرفة"} />
        <div className="absolute inset-0 bg-gradient-to-l from-[#082e22]/95 via-[#0b3929]/75 to-[#0b3929]/5 md:from-[#082e22]/90 md:via-[#0b3929]/55 md:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#092d21]/50 via-transparent to-transparent" />
        <div className="mueen-inner relative flex min-h-[610px] items-center py-16 md:min-h-[660px]">
          <div className="max-w-[620px] text-[#fffdf6]">
            <div className="reveal mb-6 flex items-center gap-3 text-[12px] font-semibold tracking-wide text-[#f0d58e]">
              <span className="h-px w-10 bg-[#e3b644]"/>{t.eyebrow}<Sparkles size={14}/>
            </div>
            <h1 className="reveal delay-1 whitespace-pre-line text-[clamp(2.7rem,7vw,5.4rem)] font-semibold leading-[1.17] tracking-[-.04em]">{t.hero}</h1>
            <p className="reveal delay-2 mt-6 max-w-[480px] text-base leading-[2] text-white/80 sm:text-lg">{t.lead}</p>
            <div className="reveal delay-2 mt-9 flex flex-wrap items-center gap-3">
              <a href="#services" className="inline-flex items-center gap-3 rounded-full bg-[#e2b64d] px-6 py-3.5 text-sm font-bold text-[#173c2c] transition hover:-translate-y-0.5 hover:bg-[#f0ca68]">{t.discover}<ArrowDownLeft size={17}/></a>
              <a href="#about" className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15">{t.story}<ChevronLeft size={16}/></a>
            </div>
            <div className="mt-12 flex items-center gap-3 text-xs text-white/65">
              <span className="h-px w-8 bg-[#e3b644]"/>{english ? "A Makkah-based nonprofit" : "جمعية أهلية من مكة المكرمة"}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#f7f5ee] to-transparent"/>
        <a href="#welcome" aria-label={english ? "Scroll to learn more" : "انتقل إلى المزيد"} className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 rounded-full border border-white/45 p-2 text-white transition hover:bg-white/15 sm:block"><ArrowUpLeft size={17}/></a>
      </section>

      <section id="welcome" className="relative z-10 -mt-1 bg-[#f7f5ee] pb-24 pt-12 md:pb-32 md:pt-20">
        <div className="mueen-inner">
          <div className="mx-auto max-w-[790px] text-center">
            <p className="mb-4 text-[11px] font-bold tracking-[.18em] text-[#a27a26]">{english ? "A WELCOME FROM MAKKAH" : "ترحيبٌ من مكة المكرمة"}</p>
            <h2 className="text-3xl font-semibold leading-snug tracking-tight text-[#173c2c] md:text-[42px]">{t.welcome}</h2>
            <div className="gold-rule mx-auto my-6 h-px w-32"/>
            <p className="mx-auto max-w-[700px] text-[15px] leading-[2.1] text-[#637268] md:text-[17px]">{t.welcomeBody}</p>
          </div>
          <div className="mt-12 grid grid-cols-1 overflow-hidden rounded-[22px] border border-[#e2e2d7] bg-[#eeede4] sm:grid-cols-3">
            {[
              [HandHeart, english ? "Care" : "رعاية", english ? "A considerate presence through every step." : "حضور يراعي احتياج ضيف الرحمن."],
              [Globe2, english ? "Guidance" : "توجيه", english ? "Useful guidance, shared with clarity." : "إرشاد نافع، بلغة واضحة وقريبة."],
              [Waves, english ? "Hospitality" : "ضيافة", english ? "Practical services with a warm welcome." : "خدمات عملية بروح الترحيب والكرم."],
            ].map(([Icon, title, desc], i) => {
              const IconComponent = Icon as typeof HandHeart;
              return <div key={String(title)} className={`flex items-center gap-4 px-6 py-6 md:px-8 ${i < 2 ? "border-b border-[#dcded3] sm:border-b-0 sm:border-l" : ""}`}>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#dfe8dc] text-[#26704b]"><IconComponent size={21}/></span>
                <div><h3 className="font-bold text-[#214a35]">{String(title)}</h3><p className="mt-1 text-xs leading-6 text-[#6b786d]">{String(desc)}</p></div>
              </div>;
            })}
          </div>
        </div>
      </section>

      <section id="services" className="bg-[#eeede4] py-20 md:py-28">
        <div className="mueen-inner">
          <div className="mb-10 flex flex-col justify-between gap-5 md:mb-14 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-[11px] font-bold tracking-[.16em] text-[#a27a26]">{t.servicesLabel}</p>
              <h2 className="max-w-[600px] text-3xl font-semibold leading-tight tracking-tight md:text-[42px]">{t.servicesTitle}</h2>
            </div>
            <p className="max-w-[390px] text-sm leading-7 text-[#69776b]">{t.serviceIntro}</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {t.cards.map((card, i) => <article key={card[0]} className={`service-card group overflow-hidden rounded-[20px] border border-[#e2e1d7] bg-[#fbfaf6] ${i === 1 ? "md:translate-y-8" : ""}`}>
              <a href="#contact" className="block">
                <div className="relative h-[225px] overflow-hidden md:h-[245px]">
                  <img src={`/__mockup/images/${card[2]}`} alt={card[3]} loading="lazy" className="h-full w-full object-cover"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a3327]/75 via-transparent to-transparent"/>
                  <span className="absolute bottom-4 right-5 text-xs font-semibold text-white/85">{card[3]}</span>
                  <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-[#143c2e]/45 p-2 text-white backdrop-blur-sm"><ArrowDownLeft size={17}/></span>
                </div>
                <div className="px-6 pb-6 pt-5">
                  <h3 className="text-xl font-semibold text-[#1a442f]">{card[0]}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#69776b]">{card[1]}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-[#367255]">{english ? "Learn more" : "اكتشف المزيد"}<ArrowLeft size={14}/></span>
                </div>
              </a>
            </article>)}
          </div>
        </div>
      </section>

      <section id="about" className="relative overflow-hidden bg-[#f7f5ee] py-20 md:py-28">
        <div className="mueen-inner grid items-center gap-12 lg:grid-cols-[1fr_.9fr] lg:gap-20">
          <div className="relative">
            <div className="absolute -left-5 -top-5 h-32 w-32 rounded-full border border-[#dfc36c]/50"/>
            <div className="relative overflow-hidden rounded-[24px]">
              <img src="/__mockup/images/mueen-arafat-camps.jpg" alt={english ? "Pilgrim tents at Arafat at sunset" : "مخيمات ضيوف الرحمن في عرفات عند الغروب"} loading="lazy" className="h-[330px] w-full object-cover sm:h-[420px]"/>
              <div className="absolute inset-0 bg-gradient-to-t from-[#143c2b]/30 to-transparent"/>
              <div className="absolute bottom-5 right-5 flex items-center gap-3 rounded-xl border border-white/30 bg-[#f7f5ee]/90 px-4 py-3 backdrop-blur">
                <img src="/__mockup/images/mueen-pilgrim-mark.png" alt="" className="h-9 w-9 object-contain"/>
                <span className="text-xs font-semibold leading-5">{english ? "With pilgrims,\nfrom Makkah" : "مع ضيوف الرحمن،\nمن قلب مكة"}</span>
              </div>
            </div>
          </div>
          <div>
            <p className="mb-3 text-[11px] font-bold tracking-[.16em] text-[#a27a26]">{t.aboutLabel}</p>
            <h2 className="whitespace-pre-line text-3xl font-semibold leading-[1.45] tracking-tight md:text-[42px]">{t.aboutTitle}</h2>
            <p className="mt-5 text-[15px] leading-[2.1] text-[#637268]">{t.aboutBody}</p>
            <p className="mb-5 mt-8 text-xs font-bold text-[#27583d]">{t.principleLabel}</p>
            <ul className="space-y-4">
              {t.principles.map((principle) => <li key={principle} className="flex items-start gap-3 text-sm text-[#455d4b]"><span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e1eadf] text-[#28704a]"><ShieldCheck size={14}/></span>{principle}</li>)}
            </ul>
            <a href="#contact" className="mt-8 inline-flex items-center gap-2 border-b border-[#b08b37] pb-1.5 text-sm font-bold text-[#28583d]">{t.more}<ArrowLeft size={15}/></a>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-[#0e422f] py-16 text-[#fffdf6] md:py-20">
        <div className="absolute -left-24 -top-36 h-[440px] w-[440px] rounded-full border border-white/10"/>
        <div className="absolute -left-12 -top-24 h-[320px] w-[320px] rounded-full border border-white/10"/>
        <div className="mueen-inner relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-[650px]">
            <p className="mb-3 text-[11px] font-bold tracking-[.16em] text-[#e4c36e]">{english ? "A SHARED RESPONSIBILITY" : "مسؤولية نتشاركها"}</p>
            <h2 className="text-3xl font-semibold leading-tight md:text-[40px]">{t.ctaTitle}</h2>
            <p className="mt-4 max-w-[580px] text-sm leading-7 text-white/70">{t.ctaBody}</p>
          </div>
          <a href={officialUrl} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-3 rounded-full bg-[#e2b64d] px-6 py-4 text-sm font-bold text-[#153e2c] transition hover:-translate-y-0.5 hover:bg-[#f1cc70]">{t.support}<HandHeart size={18}/></a>
        </div>
      </section>

      <section className="bg-[#f7f5ee] py-20 md:py-24">
        <div className="mueen-inner grid gap-12 lg:grid-cols-[.7fr_1fr]">
          <div>
            <p className="mb-3 text-[11px] font-bold tracking-[.16em] text-[#a27a26]">{english ? "HERE TO HELP" : "نحن هنا لمساعدتكم"}</p>
            <h2 className="text-3xl font-semibold leading-tight md:text-[40px]">{english ? "A few helpful answers" : "إجابات تقرّب لكم الصورة"}</h2>
            <p className="mt-4 max-w-sm text-sm leading-7 text-[#69776b]">{english ? "Learn a little more about Mueen’s work and how to get in touch." : "تعرّفوا أكثر على عمل معين، وطرق الوصول إلينا."}</p>
          </div>
          <div className="divide-y divide-[#dedfd5] border-y border-[#dedfd5]">
            {[ [t.question, t.answer], [t.question2, t.answer2] ].map(([question, answer], i) => <div key={question}>
              <button className="flex w-full items-center justify-between gap-5 py-5 text-right text-[15px] font-semibold" onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}>
                <span>{question}</span><ChevronDown size={18} className={`shrink-0 text-[#a27a26] transition-transform ${openFaq === i ? "rotate-180" : ""}`}/>
              </button>
              {openFaq === i && <p className="max-w-[650px] pb-5 text-sm leading-7 text-[#69776b]">{answer}</p>}
            </div>)}
          </div>
        </div>
      </section>

      <footer id="contact" className="bg-[#0a3627] text-[#f8f5eb]">
        <div className="mueen-inner grid gap-10 py-12 md:grid-cols-[1fr_auto] md:items-center">
          <div className="flex items-start gap-4">
            <img src="/__mockup/images/mueen-pilgrim-mark.png" alt="" className="h-[58px] w-[58px] object-contain"/>
            <div>
              <h2 className="text-lg font-semibold">{english ? "Mueen Association" : "جمعية معين"}</h2>
              <p className="mt-1 text-xs text-white/60">{t.rights}</p>
              <p className="mt-3 max-w-[500px] text-xs leading-6 text-white/65">{english ? "Guidance, hospitality, and practical support for Hajj and Umrah pilgrims and visitors." : "توجيه وضيافة ومساندة عملية للحجاج والمعتمرين والزوار."}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={officialUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-xs font-semibold transition hover:bg-white/10"><MessageCircle size={15}/>{t.contact}</a>
            <a href={officialUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#e2b64d] px-5 py-3 text-xs font-bold text-[#173c2c] transition hover:bg-[#f0ca68]">{t.donate}<ArrowDownLeft size={15}/></a>
          </div>
        </div>
        <div className="border-t border-white/10 py-4">
          <div className="mueen-inner flex flex-wrap items-center justify-between gap-3 text-[10px] text-white/45">
            <span>{t.rights}</span><a href="#home" className="inline-flex items-center gap-1 hover:text-white/80">{english ? "Back to top" : "العودة إلى الأعلى"}<ArrowUpLeft size={13}/></a>
          </div>
        </div>
      </footer>
    </main>
  );
}
