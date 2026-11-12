import { MapPin, Heart, Building2, Globe2, Home, HandHeart, BookOpen, Users, Target, Newspaper, Scale, FileText, ClipboardList, Star, UserCog, Eye, Vote } from "lucide-react";
import { Link } from "./_runtime";
import { DonationQrCode } from "./_DonationQrCode";
import { OFFICIAL_DONATION_URL } from "./_runtime";

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-4">
              <img
                src="/__mockup/images/logo.jpeg"
                alt="جمعية معين للحج والعمرة"
                className="w-16 h-16 rounded-2xl shadow-lg border-2 border-white/20 object-cover"
              />
              <div>
                <h3 className="text-2xl font-bold font-heading">معين</h3>
                <p className="text-white/70 text-sm">للحج والعمرة</p>
              </div>
            </div>
            <p className="text-white/70 leading-relaxed">
              جمعية أهلية سعودية تُعنى بخدمة الحجاج والمعتمرين عبر برامج الإرشاد والتوعية والمساندة.
            </p>

            <div className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm w-fit">
              <a
                href="https://es.ncnp.gov.sa/clds/19230"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="التحقق من شهادة ترخيص جمعية معين"
                className="shrink-0 rounded-xl bg-white p-2"
              >
                <img
                  src="/__mockup/images/mueen-license-verification-qr.png"
                  alt="رمز التحقق من شهادة الترخيص"
                  width={92}
                  height={92}
                  className="h-[92px] w-[92px]"
                />
              </a>
              <div className="space-y-1 text-sm text-white/75">
                <p className="font-bold text-white">البيانات النظامية</p>
                <p>الاسم المسجل: جمعية معين الحاج والمعتمر</p>
                <p>رقم ترخيص الجمعية: 1000758700</p>
                <p>الرقم الوطني الموحد: 7050370985</p>
                <p>ترخيص الجمعية حتى 2 يونيو 2029</p>
                <p>تصريح التبرعات الإلكترونية: 6235 · حتى 20 يناير 2027</p>
                <p>المقر الرئيسي: مكة المكرمة</p>
                <a
                  href="https://es.ncnp.gov.sa/clds/19230"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block pt-1 font-semibold text-emerald-300 hover:text-white"
                >
                  تحقق من شهادة الترخيص
                </a>
                <p className="text-xs text-white/50">رمز تحقق الترخيص، وليس رمزاً للتبرع.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/5 border border-emerald-300/20 rounded-2xl p-4 w-fit">
              <a
                href={OFFICIAL_DONATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="فتح منصة التبرع الرسمية لجمعية معين"
                className="shrink-0 rounded-xl bg-white p-2"
              >
                <DonationQrCode size={104} />
              </a>
              <div className="space-y-2 text-sm text-white/75">
                <p className="font-bold text-white">منصة التبرع الرسمية</p>
                <p>امسح الرمز لزيارة الموقع عبر اتصال HTTPS.</p>
                <a
                  href={OFFICIAL_DONATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block font-semibold text-emerald-300 hover:text-white"
                  dir="ltr"
                >
                  mueenalhajjandmutamers.org.sa
                </a>
              </div>
            </div>
          </div>

          {/* About the Association */}
          <div>
            <h4 className="font-bold font-heading text-lg mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              عن الجمعية
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm">
                  <Home className="w-3.5 h-3.5 shrink-0" /> الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm">
                  <BookOpen className="w-3.5 h-3.5 shrink-0" /> نشأة الجمعية
                </Link>
              </li>
              <li>
                <Link href="/vision" className="text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm">
                  <Target className="w-3.5 h-3.5 shrink-0" /> الرؤية والرسالة
                </Link>
              </li>
              <li>
                <Link href="/goals" className="text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm">
                  <Star className="w-3.5 h-3.5 shrink-0" /> الأهداف
                </Link>
              </li>
              <li>
                <Link href="/founders" className="text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm">
                  <Users className="w-3.5 h-3.5 shrink-0" /> المؤسسون
                </Link>
              </li>
              <li>
                <Link href="/board" className="text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm">
                  <Users className="w-3.5 h-3.5 shrink-0" /> مجلس الإدارة
                </Link>
              </li>
              <li>
                <Link href="/general-assembly" className="text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm">
                  <Vote className="w-3.5 h-3.5 shrink-0" /> الجمعية العمومية
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm">
                  <Heart className="w-3.5 h-3.5 shrink-0" /> برامج الجمعية
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm">
                  <Newspaper className="w-3.5 h-3.5 shrink-0" /> نشرات الجمعية
                </Link>
              </li>
            </ul>
          </div>

          {/* Governance */}
          <div>
            <h4 className="font-bold font-heading text-lg mb-6 flex items-center gap-2">
              <Scale className="w-5 h-5 text-primary" />
              الحوكمة
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/governance/charter" className="text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm">
                  <FileText className="w-3.5 h-3.5 shrink-0" /> اللائحة الأساسية
                </Link>
              </li>
              <li>
                <Link href="/governance/financials" className="text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm">
                  <Building2 className="w-3.5 h-3.5 shrink-0" /> القوائم المالية
                </Link>
              </li>
              <li>
                <Link href="/governance/policies" className="text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm">
                  <ClipboardList className="w-3.5 h-3.5 shrink-0" /> السياسات واللوائح
                </Link>
              </li>
              <li>
                <Link href="/governance/committees" className="text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm">
                  <Users className="w-3.5 h-3.5 shrink-0" /> اللجان
                </Link>
              </li>
              <li>
                <Link href="/governance/satisfaction" className="text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm">
                  <Star className="w-3.5 h-3.5 shrink-0" /> قياس الرضا
                </Link>
              </li>
              <li>
                <Link href="/governance/ethics" className="text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm">
                  <Scale className="w-3.5 h-3.5 shrink-0" /> الميثاق الأخلاقي
                </Link>
              </li>
              <li>
                <Link href="/governance/executive" className="text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm">
                  <UserCog className="w-3.5 h-3.5 shrink-0" /> المسؤول التنفيذي
                </Link>
              </li>
              <li>
                <Link href="/governance/disclosure" className="text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm">
                  <Eye className="w-3.5 h-3.5 shrink-0" /> الإفصاح
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold font-heading text-lg mb-6 flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary" />
              خدماتنا
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/services/hajj" className="text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm">
                  <Globe2 className="w-3.5 h-3.5 shrink-0" /> خدمة الحجاج
                </Link>
              </li>
              <li>
                <Link href="/services/umrah" className="text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm">
                  <Globe2 className="w-3.5 h-3.5 shrink-0" /> خدمة المعتمرين
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm">
                  <BookOpen className="w-3.5 h-3.5 shrink-0" /> الإرشاد والتوعية
                </Link>
              </li>
              <li>
                <Link href="/donate" className="text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm">
                  <Heart className="w-3.5 h-3.5 shrink-0" /> تبرع الآن
                </Link>
              </li>
              <li>
                <Link href="/volunteer" className="text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm">
                  <HandHeart className="w-3.5 h-3.5 shrink-0" /> تطوع معنا
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm">
                  <ClipboardList className="w-3.5 h-3.5 shrink-0" /> الوظائف
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold font-heading text-lg mb-6">تواصل معنا</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/70">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm">المقر الرئيسي<br />مكة المكرمة، المملكة العربية السعودية</span>
              </li>
            </ul>

            <div className="mt-6 p-4 bg-white/5 rounded-xl">
              <Link href="/contact" className="text-primary hover:text-primary/80 font-medium flex items-center gap-2 text-sm">
                <Building2 className="w-4 h-4" />
                نموذج التواصل
              </Link>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <p className="text-white/60 text-sm text-center md:text-right">
              © {new Date().getFullYear()} جمعية معين للحج والعمرة. جميع الحقوق محفوظة.
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-white/60 justify-center md:justify-start">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">سياسة الخصوصية</Link>
              <span className="hidden sm:inline">|</span>
              <Link href="/governance/charter" className="hover:text-white transition-colors">اللائحة الأساسية</Link>
              <span className="hidden sm:inline">|</span>
              <Link href="/governance/policies" className="hover:text-white transition-colors">السياسات</Link>
              <span className="hidden sm:inline">|</span>
              <Link href="/governance/ethics" className="hover:text-white transition-colors">الميثاق الأخلاقي</Link>
            </div>
          </div>

          <div className="flex items-center gap-6 opacity-70 hover:opacity-100 transition-opacity">
            <svg className="h-14 w-auto" viewBox="0 0 180 56" role="img" aria-label="رؤية 2030"><text x="90" y="25" textAnchor="middle" fill="white" fontSize="15" fontWeight="700">رؤية المملكة</text><text x="90" y="48" textAnchor="middle" fill="white" fontSize="25" fontWeight="800">2030</text></svg>
          </div>
        </div>

        <div className="pt-4 text-center">
          <p className="text-white/40 text-xs">
            made by{" "}
            <a
              href="https://qiroxstudio.online"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors font-medium"
            >
              Qirox Studio
            </a>
            {" "}group
          </p>
        </div>
      </div>
    </footer>
  );
}
