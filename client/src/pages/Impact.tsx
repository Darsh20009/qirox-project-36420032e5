import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Heart, FileText } from "lucide-react";
import { useSEO } from "@/hooks/use-seo";

export default function Impact() {
  useSEO({
    title: "أثر التبرعات",
    description: "تقارير أثر برامج جمعية معين لخدمات الحج والعمرة.",
  });

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "hsl(35 28% 97%)" }}>
      <Navbar />
      <main className="flex-1" dir="rtl">
        {/* Hero */}
        <div className="py-14 md:py-20 relative overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(152 42% 22%) 0%, hsl(152 42% 36%) 100%)" }}>
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E\")" }} />
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-4 border" style={{ backgroundColor: "rgba(255,255,255,0.12)", borderColor: "rgba(255,255,255,0.25)", color: "white" }}>
              <FileText className="w-4 h-4" />
              تقارير البرامج
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
              كل ريال يصنع فرقاً
            </h1>
            <p className="text-white/80 text-lg max-w-xl mx-auto">
              ستُنشر تقارير موثقة عن برامج الحج والعمرة بعد اعتمادها.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto mb-12 rounded-2xl border border-emerald-100 bg-white p-8 text-center shadow-sm">
            <FileText className="mx-auto mb-4 h-10 w-10 text-emerald-700" />
            <h2 className="mb-2 text-xl font-black">التقارير قيد الإعداد</h2>
            <p className="text-muted-foreground leading-7">
              لا نعرض أرقاماً أو قصصاً غير موثقة. ستُنشر هنا نتائج البرامج بعد استكمال التقارير واعتمادها.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center p-10 rounded-2xl" style={{ background: "linear-gradient(135deg, hsl(152 42% 93%) 0%, hsl(152 42% 97%) 100%)", border: "1px solid hsl(152 42% 84%)" }}>
            <h3 className="text-2xl font-black mb-3" style={{ color: "hsl(152 42% 22%)" }}>كن جزءاً من الأثر</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">ساهم في برامج جمعية معين لخدمة الحجاج والمعتمرين والزوار</p>
            <a href="/donate" className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white text-lg transition-all hover:opacity-90" style={{ backgroundColor: "hsl(152 42% 30%)" }}>
              <Heart className="w-5 h-5" />
              تبرع الآن
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
