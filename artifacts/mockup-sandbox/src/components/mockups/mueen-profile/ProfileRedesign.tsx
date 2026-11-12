import { useState } from "react";
import {
  ArrowLeft, ArrowUpRight, Check, ChevronLeft, CircleHelp, FileText, Heart,
  History, LockKeyhole, LogOut, Menu, MessageCircle, Phone, ShieldCheck, UserRound, X,
} from "lucide-react";

type Section = "overview" | "gifts" | "security";

export function ProfileRedesign() {
  const [section, setSection] = useState<Section>("overview");
  const [modal, setModal] = useState<"phone" | "help" | "signout" | null>(null);
  const [notice, setNotice] = useState("");
  const [phone, setPhone] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const showNotice = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3200);
  };
  const nav = (next: Section) => {
    setSection(next);
    setMobileMenu(false);
  };

  return (
    <div className="mueen-profile" dir="rtl">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&family=Tajawal:wght@400;500;600;700;800&display=swap');
        .mueen-profile{--forest:#075b37;--forest2:#0e7045;--ink:#17372b;--muted:#708078;--gold:#c89b32;--paper:#f5f5ef;--line:#e5e9e1;--white:#fffefa;min-height:100vh;background:var(--paper);color:var(--ink);font-family:'Tajawal',sans-serif;position:relative;overflow:hidden}
        .mueen-profile *{box-sizing:border-box}
        .mp-topline{height:34px;background:#064c30;color:#eaf4e9;font-size:12px;display:flex;align-items:center;justify-content:space-between;padding:0 max(calc((100vw - 1160px)/2),22px)}
        .mp-topline span{display:flex;gap:8px;align-items:center}
        .mp-header{background:rgba(255,254,250,.96);border-bottom:1px solid #e9ece5;position:relative;z-index:3}
        .mp-header-inner{max-width:1160px;height:79px;margin:auto;padding:0 24px;display:flex;align-items:center;justify-content:space-between}
        .mp-brand{display:flex;align-items:center;gap:11px;text-decoration:none;color:var(--ink)}
        .mp-brand img{width:49px;height:49px;object-fit:contain}
        .mp-brand strong{font-family:'Cairo',sans-serif;font-size:19px;line-height:1.2;font-weight:800;color:var(--forest)}
        .mp-brand small{display:block;color:#7b857e;font-size:10px;margin-top:2px}
        .mp-nav{display:flex;align-items:center;gap:32px}
        .mp-nav button,.mp-nav a{border:0;background:none;text-decoration:none;color:#4c5a51;font:600 14px 'Tajawal',sans-serif;cursor:pointer;padding:9px 0}
        .mp-nav button:hover,.mp-nav a:hover{color:var(--forest)}
        .mp-login{border:1px solid #d7e1d8!important;border-radius:9px!important;padding:10px 15px!important;color:var(--forest)!important;display:flex;gap:8px;align-items:center}
        .mp-mobile-toggle{display:none;border:0;background:none;color:var(--forest);padding:8px}
        .mp-wrap{max-width:1160px;margin:0 auto;padding:32px 24px 80px}
        .mp-crumb{display:flex;align-items:center;gap:9px;color:#89938c;font-size:13px;margin-bottom:24px}
        .mp-crumb b{color:var(--forest);font-weight:700}
        .mp-welcome{position:relative;overflow:hidden;background:#e8efe4;border:1px solid #dfe8dc;border-radius:18px;padding:27px 32px;display:flex;align-items:center;justify-content:space-between;gap:20px;margin-bottom:26px}
        .mp-welcome:before{content:"";position:absolute;width:310px;height:310px;border:1px solid rgba(7,91,55,.08);border-radius:50%;left:-102px;top:-204px;box-shadow:0 0 0 25px rgba(7,91,55,.025),0 0 0 52px rgba(7,91,55,.02)}
        .mp-welcome-copy{position:relative}
        .mp-eyebrow{display:flex;align-items:center;gap:8px;color:#537160;font-size:13px;font-weight:700;margin:0 0 8px}
        .mp-eyebrow i{width:7px;height:7px;border-radius:50%;background:var(--gold)}
        .mp-welcome h1{font:800 27px/1.35 'Cairo',sans-serif;margin:0;color:#123d2b}
        .mp-welcome p{margin:7px 0 0;color:#5e7064;font-size:15px}
        .mp-welcome-art{height:88px;width:88px;flex:none;display:grid;place-items:center;background:#dce8d9;border-radius:50%;position:relative}
        .mp-welcome-art:after{content:"";position:absolute;inset:9px;border:1px solid rgba(7,91,55,.2);border-radius:50%}
        .mp-welcome-art img{width:58px;height:58px;object-fit:contain}
        .mp-layout{display:grid;grid-template-columns:262px minmax(0,1fr);gap:22px;align-items:start}
        .mp-side{background:var(--white);border:1px solid var(--line);border-radius:14px;padding:15px;position:sticky;top:18px}
        .mp-side-label{font-size:11px;font-weight:700;color:#99a39b;letter-spacing:.04em;padding:8px 12px 11px}
        .mp-side button{width:100%;border:0;background:transparent;color:#536158;font:600 14px 'Tajawal',sans-serif;padding:12px;border-radius:9px;display:flex;align-items:center;gap:11px;text-align:right;cursor:pointer;transition:background .18s,color .18s}
        .mp-side button svg{width:18px;height:18px;color:#819087;stroke-width:1.8}
        .mp-side button:hover{background:#f2f6f0;color:var(--forest)}
        .mp-side button.active{background:#eaf2e8;color:var(--forest);font-weight:800}
        .mp-side button.active svg{color:var(--forest)}
        .mp-side-sep{height:1px;background:#edf0eb;margin:12px 4px}
        .mp-help{background:#f4f6ee;border-radius:10px;padding:15px;margin-top:17px}
        .mp-help strong{font-size:13px;display:flex;align-items:center;gap:7px}
        .mp-help p{font-size:12px;color:var(--muted);line-height:1.7;margin:7px 0 11px}
        .mp-help button{padding:7px 0;color:var(--forest);font-weight:800;font-size:12px;justify-content:space-between}
        .mp-main{min-width:0}
        .mp-card{background:var(--white);border:1px solid var(--line);border-radius:14px;margin-bottom:16px}
        .mp-card-head{padding:21px 23px 17px;border-bottom:1px solid #edf0eb;display:flex;align-items:center;justify-content:space-between;gap:15px}
        .mp-head-title{display:flex;align-items:center;gap:12px}
        .mp-icon-box{width:39px;height:39px;display:grid;place-items:center;border-radius:11px;background:#edf4e9;color:var(--forest)}
        .mp-icon-box svg{width:19px}
        .mp-card-head h2{font:700 17px 'Cairo',sans-serif;margin:0;color:#1b3a2d}
        .mp-card-head p{font-size:12px;color:#849088;margin:3px 0 0}
        .mp-card-body{padding:22px 23px}
        .mp-profile-row{display:flex;align-items:center;gap:16px}
        .mp-avatar{width:64px;height:64px;border-radius:17px;background:#eaf1e6;border:1px solid #dce8d8;display:grid;place-items:center;color:var(--forest);flex:none}
        .mp-avatar svg{width:28px;height:28px;stroke-width:1.5}
        .mp-profile-info{flex:1;min-width:0}
        .mp-profile-info strong{font:700 16px 'Cairo',sans-serif;display:block;margin-bottom:5px}
        .mp-phone{direction:ltr;text-align:right;color:#69786e;font-size:14px;letter-spacing:.04em}
        .mp-verified{display:inline-flex;align-items:center;gap:5px;color:#47775b;background:#eff6ed;border-radius:30px;padding:5px 9px;font-size:11px;font-weight:700;margin-top:8px}
        .mp-outline{border:1px solid #d7e2d8;border-radius:8px;background:transparent;padding:9px 13px;color:var(--forest);font:700 13px 'Tajawal',sans-serif;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:7px;transition:background .16s,border .16s}
        .mp-outline:hover{background:#f0f5ee;border-color:#b7cdbb}
        .mp-outline svg{width:15px;height:15px}
        .mp-notice{padding:12px 14px;border:1px solid #e7ebdf;border-radius:9px;background:#f8f9f4;color:#68766b;display:flex;align-items:flex-start;gap:10px;font-size:13px;line-height:1.7;margin-top:20px}
        .mp-notice svg{width:17px;height:17px;flex:none;color:#63816b;margin-top:1px}
        .mp-shortcuts{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:16px}
        .mp-shortcut{padding:17px 18px;background:var(--white);border:1px solid var(--line);border-radius:13px;display:flex;align-items:center;gap:13px;text-align:right;cursor:pointer;color:inherit;font-family:inherit;transition:transform .18s,border-color .18s,box-shadow .18s}
        .mp-shortcut:hover{transform:translateY(-2px);border-color:#c7d8c8;box-shadow:0 8px 22px rgba(28,64,42,.06)}
        .mp-shortcut-icon{width:42px;height:42px;border-radius:12px;background:#f4f2e6;color:#a17c24;display:grid;place-items:center;flex:none}
        .mp-shortcut-icon.green{background:#edf4e9;color:var(--forest)}
        .mp-shortcut-icon svg{width:19px;height:19px}
        .mp-shortcut-copy{flex:1}
        .mp-shortcut-copy strong{font-size:14px;display:block}
        .mp-shortcut-copy small{display:block;color:#829087;font-size:12px;margin-top:4px}
        .mp-shortcut>svg{width:16px;height:16px;color:#98a39a}
        .mp-empty{padding:37px 20px 39px;text-align:center}
        .mp-empty-mark{width:64px;height:64px;background:#f2f5ed;border:1px solid #e8eee4;border-radius:50%;margin:0 auto 14px;display:grid;place-items:center;color:#719078}
        .mp-empty-mark svg{width:25px;height:25px;stroke-width:1.6}
        .mp-empty h3{font:700 16px 'Cairo',sans-serif;margin:0;color:#244331}
        .mp-empty p{font-size:13px;color:#7a877f;line-height:1.8;max-width:370px;margin:7px auto 17px}
        .mp-primary{background:var(--forest);border:1px solid var(--forest);border-radius:9px;color:white;padding:11px 17px;font:700 13px 'Tajawal',sans-serif;cursor:pointer;display:inline-flex;align-items:center;gap:8px;transition:background .18s,transform .18s}
        .mp-primary:hover{background:#06482e;transform:translateY(-1px)}
        .mp-primary svg{width:16px;height:16px}
        .mp-list{padding:5px 22px 17px}
        .mp-list-row{width:100%;border:0;border-bottom:1px solid #eef1ec;padding:16px 1px;background:transparent;display:flex;align-items:center;text-align:right;gap:12px;color:inherit;font:inherit;cursor:pointer}
        .mp-list-row:last-child{border-bottom:0}
        .mp-list-row:hover .mp-row-arrow{color:var(--forest);transform:translateX(-2px)}
        .mp-row-icon{width:36px;height:36px;border-radius:10px;background:#f3f5ef;display:grid;place-items:center;color:#6d8072;flex:none}
        .mp-row-icon svg{width:17px;height:17px}
        .mp-row-text{flex:1}
        .mp-row-text strong{font-size:14px;display:block}
        .mp-row-text small{font-size:12px;color:#849088;display:block;margin-top:4px}
        .mp-row-arrow{width:16px;color:#9ba59d;transition:transform .18s}
        .mp-footer{border-top:1px solid #e6eae2;background:#f0f2eb;padding:20px 24px;color:#6b786e}
        .mp-footer-inner{max-width:1160px;margin:auto;display:flex;justify-content:space-between;gap:16px;align-items:center;font-size:12px}
        .mp-footer-brand{display:flex;align-items:center;gap:8px;color:var(--forest);font-weight:800}
        .mp-footer-brand img{width:28px;height:28px;object-fit:contain}
        .mp-footer-links{display:flex;gap:20px}
        .mp-footer-links button{border:0;background:none;color:#6b786e;font:inherit;cursor:pointer}
        .mp-footer-links button:hover{color:var(--forest)}
        .mp-toast{position:fixed;z-index:9;bottom:22px;left:50%;transform:translateX(-50%);background:#124c32;color:white;border-radius:10px;padding:12px 18px;box-shadow:0 8px 25px #17372b30;display:flex;gap:9px;align-items:center;font-size:13px;animation:mp-rise .2s ease-out}
        .mp-toast svg{width:17px}
        @keyframes mp-rise{from{opacity:0;transform:translate(-50%,8px)}to{opacity:1;transform:translate(-50%,0)}}
        .mp-modal-backdrop{position:fixed;z-index:12;inset:0;background:rgba(18,40,28,.38);display:grid;place-items:center;padding:20px}
        .mp-modal{width:min(100%,430px);background:var(--white);border-radius:17px;padding:24px;box-shadow:0 22px 70px rgba(23,55,43,.18);position:relative}
        .mp-modal-close{position:absolute;top:17px;left:17px;width:34px;height:34px;border:0;background:#f2f4ef;border-radius:50%;display:grid;place-items:center;color:#617269;cursor:pointer}
        .mp-modal-close svg{width:17px}
        .mp-modal-symbol{width:45px;height:45px;border-radius:13px;background:#eaf3e8;color:var(--forest);display:grid;place-items:center}
        .mp-modal-symbol svg{width:21px}
        .mp-modal h3{font:700 19px 'Cairo',sans-serif;margin:16px 0 6px}
        .mp-modal p{font-size:13px;line-height:1.8;color:#728078;margin:0 0 18px}
        .mp-field-label{font-size:12px;font-weight:700;display:block;margin-bottom:7px}
        .mp-field{width:100%;height:45px;border:1px solid #dce4da;border-radius:8px;background:#fffefa;padding:0 12px;font:14px 'Tajawal',sans-serif;color:var(--ink);outline:none;direction:ltr;text-align:left}
        .mp-field:focus{border-color:#43825d;box-shadow:0 0 0 3px #43825d24}
        .mp-modal-actions{display:flex;gap:9px;margin-top:18px}
        .mp-modal-actions>*{flex:1}
        .mp-modal .mp-notice{margin-top:14px}
        :where(.mueen-profile button,.mueen-profile a,.mueen-profile input):focus-visible{outline:3px solid #b58c2d!important;outline-offset:3px}
        @media(max-width:760px){
          .mp-topline{height:30px;padding:0 16px;font-size:10px}
          .mp-header-inner{height:66px;padding:0 17px}
          .mp-brand img{width:42px;height:42px}.mp-brand strong{font-size:16px}
          .mp-mobile-toggle{display:grid;place-items:center}
          .mp-nav{display:none;position:absolute;top:65px;right:0;left:0;background:var(--white);padding:12px 18px 18px;box-shadow:0 12px 20px #203c2818;align-items:stretch;gap:3px;flex-direction:column}
          .mp-nav.open{display:flex}
          .mp-nav button,.mp-nav a{text-align:right;padding:11px 10px}
          .mp-nav .mp-login{justify-content:center;margin-top:5px}
          .mp-wrap{padding:22px 16px 48px}
          .mp-crumb{margin-bottom:17px}
          .mp-welcome{padding:21px 19px;border-radius:14px;margin-bottom:17px}
          .mp-welcome h1{font-size:22px}.mp-welcome p{font-size:13px;max-width:255px}
          .mp-welcome-art{width:64px;height:64px}.mp-welcome-art img{width:43px;height:43px}
          .mp-layout{grid-template-columns:1fr;gap:14px}
          .mp-side{position:static;padding:8px;display:flex;overflow-x:auto;gap:4px;border-radius:11px}
          .mp-side-label,.mp-side-sep,.mp-help{display:none}
          .mp-side button{white-space:nowrap;justify-content:center;width:auto;min-width:max-content;padding:10px 12px;font-size:12px;gap:7px}
          .mp-side button svg{width:16px}
          .mp-card-head{padding:17px 16px 14px}.mp-card-body{padding:18px 16px}
          .mp-shortcuts{gap:9px}.mp-shortcut{padding:13px 11px;gap:9px}.mp-shortcut-icon{width:36px;height:36px}
          .mp-shortcut-copy strong{font-size:12px}.mp-shortcut-copy small{font-size:10px}
          .mp-profile-row{gap:11px}.mp-avatar{width:53px;height:53px;border-radius:14px}
          .mp-profile-info strong{font-size:14px}
          .mp-profile-row>.mp-outline{font-size:11px;padding:8px}
          .mp-footer-inner{align-items:flex-start;flex-direction:column}
          .mp-footer-links{gap:15px}
        }
        @media(max-width:390px){.mp-shortcut{gap:7px;padding:12px 8px}.mp-shortcut-icon{width:32px;height:32px}.mp-shortcut-copy small{display:none}.mp-welcome-art{width:54px;height:54px}.mp-welcome-art img{width:38px;height:38px}}
        @media(prefers-reduced-motion:reduce){.mueen-profile *{scroll-behavior:auto!important;animation-duration:.01ms!important;transition-duration:.01ms!important}}
      `}</style>

      <div className="mp-topline">
        <span><ShieldCheck size={13} /> مساحة خاصة وآمنة لإدارة حسابك</span>
        <span>مكة المكرمة <span aria-hidden="true">·</span> المملكة العربية السعودية</span>
      </div>
      <header className="mp-header">
        <div className="mp-header-inner">
          <a className="mp-brand" href="#top" aria-label="جمعية معين لخدمات الحج والعمرة">
            <img src="/__mockup/images/mueen-pilgrim-mark.png" alt="" />
            <span><strong>جمعية معين</strong><small>لخدمات الحج والعمرة</small></span>
          </a>
          <button className="mp-mobile-toggle" aria-label={mobileMenu ? "إغلاق القائمة" : "فتح القائمة"} aria-expanded={mobileMenu} onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <X /> : <Menu />}
          </button>
          <nav className={`mp-nav${mobileMenu ? " open" : ""}`} aria-label="التنقل الرئيسي">
            <button onClick={() => nav("overview")}>الرئيسية</button>
            <button onClick={() => nav("gifts")}>تبرعاتي</button>
            <button onClick={() => setModal("help")}>عن الجمعية</button>
            <button onClick={() => setModal("help")}>تواصل معنا</button>
            <button className="mp-login" onClick={() => setModal("phone")}><Phone size={15} /> الدخول برقم الجوال</button>
          </nav>
        </div>
      </header>

      <main className="mp-wrap" id="top">
        <div className="mp-crumb"><span>الرئيسية</span><ChevronLeft size={14} /><b>حسابي</b></div>
        <section className="mp-welcome">
          <div className="mp-welcome-copy">
            <div className="mp-eyebrow"><i /> حسابك في جمعية معين</div>
            <h1>{section === "security" ? "أمان حسابك" : section === "gifts" ? "مساحة عطائك" : "مرحباً بك في مساحتك"}</h1>
            <p>{section === "security" ? "خيارات واضحة تحافظ على خصوصية حسابك." : "هنا تجد بياناتك وسجل عطائك، بكل وضوح وطمأنينة."}</p>
          </div>
          <div className="mp-welcome-art"><img src="/__mockup/images/mueen-pilgrim-mark.png" alt="" /></div>
        </section>

        <div className="mp-layout">
          <aside className="mp-side" aria-label="قائمة الحساب">
            <div className="mp-side-label">إدارة الحساب</div>
            <button className={section === "overview" ? "active" : ""} onClick={() => nav("overview")}><UserRound /> نظرة عامة</button>
            <button className={section === "gifts" ? "active" : ""} onClick={() => nav("gifts")}><Heart /> سجل التبرعات</button>
            <button className={section === "security" ? "active" : ""} onClick={() => nav("security")}><LockKeyhole /> تسجيل الدخول والأمان</button>
            <div className="mp-side-sep" />
            <button onClick={() => setModal("help")}><CircleHelp /> المساعدة والدعم</button>
            <div className="mp-help">
              <strong><MessageCircle size={15} /> نرحب باستفسارك</strong>
              <p>فريق معين هنا لمساعدتك في أي وقت.</p>
              <button onClick={() => setModal("help")}>تواصل مع فريقنا <ArrowLeft size={14} /></button>
            </div>
          </aside>

          <div className="mp-main">
            {section === "overview" && <>
              <section className="mp-card">
                <div className="mp-card-head">
                  <div className="mp-head-title"><span className="mp-icon-box"><UserRound /></span><div><h2>بيانات الحساب</h2><p>معلومات التواصل الخاصة بك</p></div></div>
                  <button className="mp-outline" onClick={() => setModal("phone")}><Phone /> تحديث الرقم</button>
                </div>
                <div className="mp-card-body">
                  <div className="mp-profile-row">
                    <div className="mp-avatar"><UserRound /></div>
                    <div className="mp-profile-info"><strong>حساب الداعم</strong><div className="mp-phone" dir="ltr">+966 5• ••• 2480</div><span className="mp-verified"><ShieldCheck size={13} /> رقم موثّق عبر واتساب</span></div>
                  </div>
                  <div className="mp-notice"><ShieldCheck /><span>رقم الجوال الظاهر توضيحي ومخفي جزئياً. تُستخدم بياناتك لإدارة حسابك والتواصل بشأن عطائك فقط.</span></div>
                </div>
              </section>

              <div className="mp-shortcuts">
                <button className="mp-shortcut" onClick={() => nav("gifts")}><span className="mp-shortcut-icon"><History /></span><span className="mp-shortcut-copy"><strong>سجل التبرعات</strong><small>راجع مساهماتك السابقة</small></span><ChevronLeft /></button>
                <button className="mp-shortcut" onClick={() => nav("security")}><span className="mp-shortcut-icon green"><LockKeyhole /></span><span className="mp-shortcut-copy"><strong>الدخول والأمان</strong><small>إدارة الدخول برقم الجوال</small></span><ChevronLeft /></button>
              </div>

              <section className="mp-card">
                <div className="mp-card-head"><div className="mp-head-title"><span className="mp-icon-box"><Heart /></span><div><h2>عطاؤك في معين</h2><p>سجل خاص يتيح لك مراجعة مساهماتك</p></div></div><button className="mp-outline" onClick={() => nav("gifts")}>عرض السجل <ArrowLeft /></button></div>
                <div className="mp-empty">
                  <div className="mp-empty-mark"><Heart /></div>
                  <h3>لا توجد تبرعات مسجلة بعد</h3>
                  <p>عندما تقدّم عطاؤك، ستجد تفاصيله هنا في مكان واحد. لا تظهر أي مبالغ أو إيصالات قبل تسجيلها.</p>
                  <button className="mp-primary" onClick={() => showNotice("معاينة فقط — خيارات التبرع غير متصلة في هذا النموذج.")}>تعرّف على فرص العطاء <ArrowUpRight /></button>
                </div>
              </section>
            </>}

            {section === "gifts" && <section className="mp-card">
              <div className="mp-card-head"><div className="mp-head-title"><span className="mp-icon-box"><History /></span><div><h2>سجل التبرعات</h2><p>مساهماتك وإيصالاتك في مكان واحد</p></div></div><button className="mp-outline" onClick={() => nav("overview")}><ArrowLeft /> العودة للحساب</button></div>
              <div className="mp-empty"><div className="mp-empty-mark"><FileText /></div><h3>سيظهر سجل عطائك هنا</h3><p>لا توجد مساهمات مسجلة في هذه المعاينة. عند وجود تبرعات، ستجد تفاصيلها وحالة كل مساهمة هنا.</p><button className="mp-primary" onClick={() => showNotice("هذه معاينة تصميمية؛ لا توجد بيانات تبرع متصلة.")}>استكشف فرص العطاء <ArrowUpRight /></button></div>
            </section>}

            {section === "security" && <>
              <section className="mp-card">
                <div className="mp-card-head"><div className="mp-head-title"><span className="mp-icon-box"><LockKeyhole /></span><div><h2>الدخول إلى حسابك</h2><p>طريقة واحدة بسيطة وآمنة للدخول</p></div></div></div>
                <div className="mp-card-body">
                  <div className="mp-profile-row">
                    <div className="mp-avatar"><MessageCircle /></div>
                    <div className="mp-profile-info"><strong>رمز تحقق عبر واتساب</strong><div className="mp-phone">الدخول برقم الجوال فقط</div><span className="mp-verified"><ShieldCheck size={13} /> لا حاجة لكلمة مرور</span></div>
                    <button className="mp-outline" onClick={() => setModal("phone")}>إدارة الرقم <ChevronLeft /></button>
                  </div>
                  <div className="mp-notice"><LockKeyhole /><span>لن نطلب منك كلمة مرور أو بيانات دفع عبر رسالة. رمز التحقق يُرسل إلى رقم الجوال الذي تدخله عند تسجيل الدخول.</span></div>
                </div>
              </section>
              <section className="mp-card">
                <div className="mp-card-head"><div className="mp-head-title"><span className="mp-icon-box"><ShieldCheck /></span><div><h2>خصوصية الحساب</h2><p>تحكم واضح بمعلوماتك</p></div></div></div>
                <div className="mp-list">
                  <button className="mp-list-row" onClick={() => showNotice("المعلومات الشخصية لا تُعرض للعامة في هذه المعاينة.")}><span className="mp-row-icon"><UserRound /></span><span className="mp-row-text"><strong>بياناتك خاصة</strong><small>لا تظهر معلومات الحساب للزوار</small></span><ChevronLeft className="mp-row-arrow" /></button>
                  <button className="mp-list-row" onClick={() => showNotice("للمساعدة بشأن الخصوصية، تواصل مع فريق جمعية معين.")}><span className="mp-row-icon"><CircleHelp /></span><span className="mp-row-text"><strong>طلب مساعدة بخصوص الحساب</strong><small>تواصل مع فريق جمعية معين</small></span><ChevronLeft className="mp-row-arrow" /></button>
                </div>
              </section>
            </>}
          </div>
        </div>
      </main>

      <footer className="mp-footer"><div className="mp-footer-inner">
        <div className="mp-footer-brand"><img src="/__mockup/images/mueen-pilgrim-mark.png" alt="" /> جمعية معين لخدمات الحج والعمرة</div>
        <div className="mp-footer-links"><button onClick={() => setModal("help")}>سياسة الخصوصية</button><button onClick={() => setModal("help")}>الشروط والأحكام</button><button onClick={() => setModal("help")}>المساعدة</button></div>
        <span>خدمة ضيوف الرحمن من مكة المكرمة</span>
      </div></footer>

      {notice && <div className="mp-toast" role="status"><Check />{notice}</div>}
      {modal && <div className="mp-modal-backdrop" role="presentation" onMouseDown={e => { if (e.target === e.currentTarget) { setModal(null); setCodeSent(false); } }}>
        <div className="mp-modal" role="dialog" aria-modal="true" aria-labelledby="mp-dialog-title">
          <button className="mp-modal-close" aria-label="إغلاق" onClick={() => { setModal(null); setCodeSent(false); }}><X /></button>
          {modal === "phone" && <>
            <span className="mp-modal-symbol"><MessageCircle /></span>
            <h3 id="mp-dialog-title">{codeSent ? "تحقق من واتساب" : "الدخول برقم الجوال"}</h3>
            <p>{codeSent ? "أُرسلت رسالة تحقق توضيحية. هذه المعاينة لا ترسل رمزاً فعلياً." : "أدخل رقم جوالك لاستلام رمز تحقق عبر واتساب. لا نستخدم كلمات مرور أو طرق دخول أخرى."}</p>
            {!codeSent ? <><label className="mp-field-label" htmlFor="mp-phone">رقم الجوال</label><input id="mp-phone" className="mp-field" type="tel" inputMode="tel" autoComplete="tel" placeholder="+966 5X XXX XXXX" value={phone} onChange={e => setPhone(e.target.value)} /></> : <><label className="mp-field-label" htmlFor="mp-code">رمز التحقق (تجريبي)</label><input id="mp-code" className="mp-field" type="text" inputMode="numeric" placeholder="أدخل الرمز" /></>}
            <div className="mp-modal-actions"><button className="mp-primary" onClick={() => { if (!codeSent && phone.trim().length > 5) setCodeSent(true); else if (codeSent) { setModal(null); setCodeSent(false); showNotice("تم إغلاق المعاينة — لم يتم تسجيل الدخول."); } else showNotice("أدخل رقم جوال صحيحاً للمتابعة."); }}>{codeSent ? "متابعة" : "إرسال رمز واتساب"} <ArrowLeft /></button><button className="mp-outline" onClick={() => { setModal(null); setCodeSent(false); }}>إلغاء</button></div>
            <div className="mp-notice"><ShieldCheck /><span>لا تدخل بيانات حقيقية في هذه المعاينة التصميمية.</span></div>
          </>}
          {modal === "help" && <><span className="mp-modal-symbol"><MessageCircle /></span><h3 id="mp-dialog-title">نحن هنا لمساعدتك</h3><p>يسعد فريق جمعية معين لخدمات الحج والعمرة بمساعدتك في الاستفسارات المتعلقة بحسابك أو عطائك.</p><div className="mp-notice"><CircleHelp /><span>قنوات الدعم الفعلية غير متصلة في هذه المعاينة.</span></div><div className="mp-modal-actions"><button className="mp-primary" onClick={() => { setModal(null); showNotice("شكراً لثقتك بجمعية معين."); }}>حسناً <Check /></button></div></>}
          {modal === "signout" && <><span className="mp-modal-symbol"><LogOut /></span><h3 id="mp-dialog-title">تسجيل الخروج</h3><p>هذه معاينة تصميمية ولا يوجد حساب متصل لتسجيل الخروج منه.</p><div className="mp-modal-actions"><button className="mp-primary" onClick={() => setModal(null)}>حسناً <Check /></button></div></>}
        </div>
      </div>}
    </div>
  );
}
