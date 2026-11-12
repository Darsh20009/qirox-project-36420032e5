import {
  BookOpen,
  Building2,
  Facebook,
  Globe2,
  Heart,
  Instagram,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Twitter,
  Youtube,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { QRCodeSVG } from "qrcode.react";
import { Link } from "wouter";
import { useEffect } from "react";
import { DonationQrCode } from "@/components/DonationQrCode";
import { OFFICIAL_DONATION_URL } from "@/lib/donation-portal";

type FooterProps = {
  english?: boolean;
};

type PublicContactSettings = {
  phone?: string;
  email?: string;
  address?: string;
  whatsapp?: string;
  twitter?: string;
  instagram?: string;
  facebook?: string;
  youtube?: string;
};

const year = new Date().getFullYear();

export function Footer({ english = false }: FooterProps) {
  useEffect(() => {
    if (window.location.hash === "#contact") {
      requestAnimationFrame(() => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "auto" });
      });
    }
  }, []);

  const { data: settings = {} } = useQuery<PublicContactSettings>({
    queryKey: ["/api/public/site-contact"],
    queryFn: async () => {
      const response = await fetch("/api/public/site-contact");
      if (!response.ok) return {};
      const data = await response.json();
      return {
        phone: data.phone,
        email: data.email,
        address: data.address,
        whatsapp: data.whatsapp,
        twitter: data.twitter,
        instagram: data.instagram,
        facebook: data.facebook,
        youtube: data.youtube,
      };
    },
    staleTime: 5 * 60 * 1000,
  });

  const aboutLinks = english
    ? [
        ["Home", "/"],
        ["About Mueen", "/about"],
        ["Vision and mission", "/vision"],
        ["News and reports", "/news"],
      ]
    : [
        ["الرئيسية", "/"],
        ["عن الجمعية", "/about"],
        ["الرؤية والرسالة", "/vision"],
        ["الأخبار والتقارير", "/news"],
      ];

  const serviceLinks = english
    ? [
        ["Hajj services", "/services/hajj"],
        ["Umrah services", "/services/umrah"],
        ["Guidance and awareness", "/services"],
        ["Volunteer with us", "/volunteer"],
      ]
    : [
        ["خدمات الحج", "/services/hajj"],
        ["خدمات العمرة", "/services/umrah"],
        ["التوعية والإرشاد", "/services"],
        ["تطوع معنا", "/volunteer"],
      ];

  const governanceLinks = english
    ? [
        ["Association bylaws", "/governance/charter"],
        ["Policies and regulations", "/governance/policies"],
        ["Financial statements", "/governance/financials"],
        ["Contact form", "/contact"],
      ]
    : [
        ["اللائحة الأساسية", "/governance/charter"],
        ["السياسات واللوائح", "/governance/policies"],
        ["القوائم المالية", "/governance/financials"],
        ["نموذج التواصل", "/contact"],
      ];

  const socialLinks: { url?: string; label: string; Icon: typeof Twitter }[] = [
    { url: settings.twitter, label: "X", Icon: Twitter },
    { url: settings.instagram, label: "Instagram", Icon: Instagram },
    { url: settings.facebook, label: "Facebook", Icon: Facebook },
    { url: settings.youtube, label: "YouTube", Icon: Youtube },
  ];

  const linkClass =
    "block py-1 text-sm text-white/75 transition-colors hover:text-[#e8c46a]";

  return (
    <footer
      id="contact"
      dir={english ? "ltr" : "rtl"}
      className="bg-[#073d2b] text-[#f8f5eb]"
    >
      <div className="mx-auto max-w-[1320px] px-5 pb-8 pt-10 sm:px-8 md:pt-12">
        <div className="mueen-footer-top grid gap-9 border-b border-white/20 pb-9 sm:grid-cols-2 lg:grid-cols-[1.45fr_1fr_1fr_1fr] lg:gap-8">
          <div className="max-w-md">
            <div className="flex items-center gap-4">
              <img
                src="/images/mueen-pilgrim-mark.png"
                alt={english ? "Mueen Association logo" : "شعار جمعية معين لخدمات الحج والعمرة"}
                className="h-[66px] w-[66px] shrink-0 object-contain"
                loading="lazy"
              />
              <div>
                <h2 className="text-xl font-extrabold tracking-tight">
                  {english ? "Mueen" : "معين"}
                </h2>
                <p className="mt-0.5 text-xs text-white/70">
                  {english ? "Hajj and Umrah Services" : "لخدمات الحج والعمرة"}
                </p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-7 text-white/75">
              {english
                ? "A Saudi nonprofit serving pilgrims and Umrah visitors through guidance, care, and practical support."
                : "جمعية أهلية سعودية تُعنى بخدمة ضيوف الرحمن بالتوعية والإرشاد والرعاية والمساندة العملية."}
            </p>
            <a
              href={OFFICIAL_DONATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#e8c46a] hover:text-white"
            >
              <Globe2 size={16} />
              {english ? "Official website" : "الموقع الرسمي"}
            </a>
          </div>

          <FooterLinkColumn
            title={english ? "About Mueen" : "عن الجمعية"}
            icon={<BookOpen size={17} />}
            links={aboutLinks}
            linkClass={linkClass}
          />

          <FooterLinkColumn
            title={english ? "Services" : "خدماتنا"}
            icon={<Heart size={17} />}
            links={serviceLinks}
            linkClass={linkClass}
          />

          <div>
            <h3 className="mb-4 flex items-center gap-2 font-bold">
              <Building2 size={17} className="text-[#e8c46a]" />
              {english ? "Contact us" : "تواصل معنا"}
            </h3>
            <p className="flex items-start gap-2 text-sm leading-6 text-white/75">
              <MapPin size={16} className="mt-1 shrink-0 text-[#e8c46a]" />
              <span>
                {settings.address ||
                  (english
                    ? "Headquarters: Makkah, Saudi Arabia"
                    : "المقر الرئيسي: مكة المكرمة، المملكة العربية السعودية")}
              </span>
            </p>
            {settings.phone && (
              <a
                href={`tel:${settings.phone.replace(/[^\d+]/g, "")}`}
                dir="ltr"
                className="mt-2 flex items-center gap-2 text-sm text-white/75 transition hover:text-white"
              >
                <Phone size={14} className="shrink-0 text-[#e8c46a]" />
                {settings.phone}
              </a>
            )}
            {settings.email && (
              <a
                href={`mailto:${settings.email}`}
                dir="ltr"
                className="mt-2 flex items-center gap-2 text-sm text-white/75 transition hover:text-white"
              >
                <Mail size={14} className="shrink-0 text-[#e8c46a]" />
                {settings.email}
              </a>
            )}
            {settings.whatsapp && (
              <a
                href={`https://wa.me/${settings.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                dir="ltr"
                className="mt-2 flex items-center gap-2 text-sm text-white/75 transition hover:text-white"
              >
                <Phone size={14} className="shrink-0 text-[#e8c46a]" />
                {settings.whatsapp}
              </a>
            )}
            <Link href="/contact" className={`${linkClass} mt-2`}>
              {english ? "Send a message" : "أرسل رسالة للجمعية"}
            </Link>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-white/65">
              {socialLinks.map(({ url, label, Icon }) =>
                url && isHttpUrl(url) ? (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label} — ${english ? "Mueen" : "معين"}`}
                    className="transition hover:text-[#e8c46a]"
                  >
                    <Icon size={17} />
                  </a>
                ) : null,
              )}
            </div>
            <a
              href={OFFICIAL_DONATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-xs text-white/65 transition hover:text-white"
            >
              <Globe2 size={14} />
              <span dir="ltr">www.mueenalhajjandmutamers.org.sa</span>
            </a>
          </div>
        </div>

        <div className="mueen-footer-meta grid gap-6 border-b border-white/15 py-7 md:grid-cols-[1.1fr_2fr] md:items-center">
          <div>
            <h3 className="mb-3 flex items-center gap-2 text-sm font-bold">
              <ShieldCheck size={17} className="text-[#e8c46a]" />
              {english ? "Official and legal information" : "البيانات الرسمية والنظامية"}
            </h3>
            <div className="grid gap-x-5 gap-y-1 text-xs leading-6 text-white/70 sm:grid-cols-2">
              <p>{english ? "Registered name: Mueen Association for Pilgrims" : "الاسم المسجل: جمعية معين الحاج والمعتمر"}</p>
              <p>{english ? "Association license: 1000758700" : "رقم ترخيص الجمعية: 1000758700"}</p>
              <p>{english ? "Unified national number: 7050370985" : "الرقم الوطني الموحد: 7050370985"}</p>
              <p>{english ? "Association license valid through June 2, 2029" : "ترخيص الجمعية ساري حتى 2 يونيو 2029"}</p>
              <p>{english ? "E-donation permit: 6235 · valid through January 20, 2027" : "تصريح التبرعات الإلكترونية: 6235 · ساري حتى 20 يناير 2027"}</p>
            </div>
          </div>

          <div className="mueen-footer-qrs grid gap-4 sm:grid-cols-3">
            <QrCard
              label={english ? "Official website" : "الموقع الرسمي"}
              description={english ? "Scan to visit Mueen’s official website." : "امسح الرمز لزيارة الموقع الرسمي."}
              href={OFFICIAL_DONATION_URL}
              ariaLabel={english ? "Open the official Mueen website" : "فتح الموقع الرسمي لجمعية معين"}
            >
              <QRCodeSVG value={OFFICIAL_DONATION_URL} size={84} level="H" includeMargin title={english ? "Official website QR code" : "رمز الموقع الرسمي"} />
            </QrCard>
            <QrCard
              label={english ? "Secure donation" : "التبرع الآمن"}
              description={english ? "Scan to open the official donation destination." : "امسح الرمز للوصول إلى وجهة التبرع الرسمية."}
              href={OFFICIAL_DONATION_URL}
              ariaLabel={english ? "Open the official Mueen donation destination" : "فتح وجهة التبرع الرسمية لجمعية معين"}
            >
              <DonationQrCode size={84} />
            </QrCard>
            <QrCard
              label={english ? "License verification" : "التحقق من الترخيص"}
              description={english ? "National Center for Non-Profit Sector record." : "سجل المركز الوطني لتنمية القطاع غير الربحي."}
              href="https://es.ncnp.gov.sa/clds/19230"
              ariaLabel={english ? "Verify Mueen’s association license" : "التحقق من ترخيص جمعية معين"}
            >
              <img
                src="/images/mueen-license-verification-qr.png"
                alt={english ? "License verification QR code" : "رمز التحقق من الترخيص"}
                width={84}
                height={84}
                className="h-[84px] w-[84px]"
                loading="lazy"
              />
            </QrCard>
          </div>
        </div>

        <div className="mueen-footer-bottom flex flex-col items-center justify-between gap-4 pt-5 text-center sm:flex-row sm:text-start">
          <p className="text-xs leading-6 text-white/65">
            © {year} {english ? "Mueen Association for Hajj and Umrah Services. All rights reserved." : "جمعية معين لخدمات الحج والعمرة. جميع الحقوق محفوظة."}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-white/65">
            <Link href="/privacy-policy" className="transition hover:text-white">
              {english ? "Privacy policy" : "سياسة الخصوصية"}
            </Link>
            <Link href="/governance/charter" className="transition hover:text-white">
              {english ? "Bylaws" : "اللائحة الأساسية"}
            </Link>
            <Link href="/governance/policies" className="transition hover:text-white">
              {english ? "Policies" : "السياسات"}
            </Link>
          </div>
        </div>

        <div className="mt-5 border-t border-white/10 pt-4">
          <a
            href="https://qiroxstudio.online"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-auto inline-flex items-center justify-center gap-2 rounded-full px-3 py-2 text-xs text-white/80 transition hover:bg-white/10 hover:text-white"
            aria-label="Made by Qirox Studio Group"
          >
            <img
              src="/images/qirox-studio-mark.png"
              alt=""
              className="h-7 w-7 object-contain"
              loading="lazy"
            />
            <span>
              Made by <span className="font-semibold">Qirox Studio Group</span>
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterLinkColumn({
  title,
  icon,
  links,
  linkClass,
}: {
  title: string;
  icon: React.ReactNode;
  links: string[][];
  linkClass: string;
}) {
  return (
    <div>
      <h3 className="mb-4 flex items-center gap-2 font-bold">
        <span className="text-[#e8c46a]">{icon}</span>
        {title}
      </h3>
      <ul className="space-y-1">
        {links.map(([label, href]) => (
          <li key={href}>
            <Link href={href} className={linkClass}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function QrCard({
  label,
  description,
  href,
  ariaLabel,
  children,
}: {
  label: string;
  description: string;
  href: string;
  ariaLabel: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/[0.06] p-3">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        className="shrink-0 rounded-md bg-white p-1.5"
      >
        {children}
      </a>
      <div className="min-w-0">
        <p className="text-xs font-bold text-white">{label}</p>
        <p className="mt-1 text-[10px] leading-4 text-white/65">{description}</p>
      </div>
    </div>
  );
}

function isHttpUrl(value: string) {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}
