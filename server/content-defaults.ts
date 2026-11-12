export type PublicContent = {
  slug: string;
  title: string;
  titleEn: string;
  content: string;
  contentEn: string;
  imageUrl?: string;
  metaDescription: string;
  metaDescriptionEn: string;
};

const pageImages: Record<string, string> = {
  about: "/images/mueen-kaaba-hero.jpg",
  vision: "/images/mueen-kaaba-golden.webp",
  goals: "/images/mueen-kaaba-golden.webp",
  programs: "/images/mueen-arafat-camps.jpg",
  bylaws: "/images/mueen-impact-banner.webp",
  financials: "/images/mueen-impact-banner.webp",
  policies: "/images/mueen-impact-banner.webp",
  committees: "/images/mueen-impact-banner.webp",
  ethics: "/images/mueen-kaaba-hero.jpg",
  disclosure: "/images/mueen-impact-banner.webp",
  satisfaction: "/images/mueen-water-service.jpg",
};

const item = (
  slug: string,
  title: string,
  titleEn: string,
  content: string,
  contentEn: string,
  metaDescription: string,
  metaDescriptionEn: string,
): PublicContent => ({
  slug,
  title,
  titleEn,
  content,
  contentEn,
  imageUrl: pageImages[slug],
  metaDescription,
  metaDescriptionEn,
});

export const MUEEN_PUBLIC_CONTENT: Record<string, PublicContent> = {
  about: item(
    "about",
    "نشأة جمعية معين",
    "About Mueen Association",
    `<h2>معين لخدمة ضيوف الرحمن</h2>
     <p>جمعية معين لخدمات الحج والعمرة جمعية أهلية مقرها مكة المكرمة، تعمل على مساندة الحجاج والمعتمرين والزوار بالتوعية والإرشاد والضيافة والرعاية، مع مراعاة كرامة الإنسان واحتياجاته.</p>
     <p>تُظهر وثائق الجمعية ترخيصها رقم <strong>1000758700</strong>، واسمها النظامي «معين الحاج والمعتمر». وتعمل الجمعية وفق لائحتها الأساسية والأنظمة المنظمة للقطاع غير الربحي في المملكة.</p>
     <h2>كيف نعمل؟</h2>
     <p>نطوّر مبادرات إنسانية بالتعاون مع الجهات ذات العلاقة والمتطوعين، ونوجّه الجهود إلى ما يسهّل رحلة ضيوف الرحمن، وفق الاعتمادات والاحتياج الفعلي.</p>`,
    `<h2>Serving the Guests of Allah</h2>
     <p>Mueen Association for Hajj and Umrah Services is a nonprofit based in Makkah. It supports pilgrims, Umrah visitors, and other visitors through guidance, hospitality, care, and practical assistance while respecting each person's dignity and needs.</p>
     <p>The association's documents list license number <strong>1000758700</strong> and the registered name “Mueen Al-Hajj wal-Mu'tamir.” It operates under its bylaws and the regulations governing the nonprofit sector in Saudi Arabia.</p>
     <h2>How We Work</h2>
     <p>We develop humanitarian initiatives with relevant organizations and volunteers, focusing on practical support for pilgrims according to approvals and actual needs.</p>`,
    "تعرف على جمعية معين لخدمات الحج والعمرة، رسالتها وخدماتها الإنسانية في مكة المكرمة.",
    "Learn about Mueen Association for Hajj and Umrah Services in Makkah.",
  ),
  vision: item(
    "vision",
    "الرؤية والرسالة والقيم",
    "Vision, Mission and Values",
    `<h2>رؤيتنا</h2>
     <p>الريادة في تقديم خدمات توعوية وإرشادية مبتكرة لضيوف الرحمن، تراعي احتياج الجميع وتمكّنهم من أداء مناسكهم بيسر وطمأنينة.</p>
     <h2>رسالتنا</h2>
     <p>مساندة الحجاج والمعتمرين والزوار، ومن يحتاج إلى دعم خاص، بالتوعية والإرشاد والضيافة والمساعدة العملية، بما يعينهم على أداء مناسكهم ويحفظ كرامتهم.</p>
     <h2>قيمنا</h2>
     <ul><li>الأمانة والصدق</li><li>الإخلاص والإحسان</li><li>المبادرة</li><li>المسؤولية</li><li>احترام كرامة المستفيد</li></ul>`,
    `<h2>Our Vision</h2>
     <p>To lead in innovative awareness and guidance services for pilgrims, meeting diverse needs and helping people perform their rites with ease and reassurance.</p>
     <h2>Our Mission</h2>
     <p>To support pilgrims and visitors through awareness, guidance, hospitality, and practical assistance that helps them perform their rites with dignity.</p>
     <h2>Our Values</h2>
     <ul><li>Trust and honesty</li><li>Sincerity and excellence</li><li>Initiative</li><li>Responsibility</li><li>Respect for every beneficiary</li></ul>`,
    "رؤية جمعية معين ورسالتها وقيمها في خدمة الحجاج والمعتمرين والزوار.",
    "Mueen Association's vision, mission, and values for serving pilgrims and visitors.",
  ),
  goals: item(
    "goals",
    "أهداف الجمعية",
    "Association Goals",
    `<h2>أهدافنا</h2>
     <ul>
       <li>التعاون مع الجهات العامة والخاصة لتحقيق أهداف الجمعية.</li>
       <li>استقبال ضيوف الرحمن وتقديم التوعية والإرشاد الذي يعينهم على أداء المناسك.</li>
       <li>تطوير مبادرات تيسّر رحلة الحج والعمرة وتحسّن تجربة المستفيد.</li>
       <li>تشجيع العمل التطوعي المنظم لخدمة الحجاج والمعتمرين.</li>
       <li>تقديم المساندة عند الحاجة، بما يشمل كبار السن والأشخاص ذوي الإعاقة ومن تقطعت بهم السبل.</li>
       <li>تعزيز جودة الخدمات وتطوير وسائل الإرشاد والتواصل.</li>
     </ul>`,
    `<h2>Our Goals</h2>
     <ul>
       <li>Work with public and private organizations to advance the association's objectives.</li>
       <li>Welcome pilgrims and provide guidance that helps them perform their rites.</li>
       <li>Develop initiatives that make Hajj and Umrah journeys easier and improve beneficiary experience.</li>
       <li>Encourage organized volunteering in service of pilgrims and visitors.</li>
       <li>Offer support when needed, including for older adults, people with disabilities, and stranded travelers.</li>
       <li>Improve service quality and guidance and communication methods.</li>
     </ul>`,
    "أهداف جمعية معين لخدمات الحج والعمرة كما وردت في وثائقها وخطتها التشغيلية.",
    "Goals of Mueen Association based on its bylaws and operating plan.",
  ),
  founders: item(
    "founders",
    "المؤسسون",
    "Founding Members",
    `<h2>المؤسسون</h2>
     <p>تأسست الجمعية وفق لائحتها الأساسية المعتمدة. وتُحفظ بيانات المؤسسين الشخصية، لذلك لا تُنشر الأسماء أو أرقام الهوية في هذه الصفحة دون اعتماد وموافقة صريحة.</p>
     <p>يمكن تحديث هذه الصفحة لاحقاً بقائمة رسمية معتمدة إذا رغبت الجمعية في نشرها.</p>`,
    `<h2>Founding Members</h2>
     <p>The association was established under its approved bylaws. Personal details of founding members are not published here without explicit approval.</p>
     <p>This page can be updated with an approved public list if the association chooses to publish one.</p>`,
    "معلومات جمعية معين عن التأسيس مع حماية البيانات الشخصية للمؤسسين.",
    "Mueen Association founding information, with founders' personal data protected.",
  ),
  board: item(
    "board",
    "مجلس الإدارة",
    "Board of Directors",
    `<h2>مجلس الإدارة</h2>
     <p>يتولى مجلس الإدارة إدارة شؤون الجمعية وفق الصلاحيات والمسؤوليات المحددة في اللائحة الأساسية والأنظمة ذات العلاقة، ويشرف على توجهها وأعمالها المؤسسية.</p>
     <p>لا تتضمن الملفات المتاحة قائمة عامة معتمدة بأسماء الأعضاء؛ لذلك لا ننشر أسماء أو بيانات شخصية غير مؤكدة. تُضاف التشكيلة الرسمية عند اعتمادها للنشر.</p>`,
    `<h2>Board of Directors</h2>
     <p>The board oversees the association in accordance with its bylaws and applicable regulations, and guides its organizational work.</p>
     <p>The available documents do not provide an approved public member list, so unverified names and personal details are not published. An approved list can be added when authorized for publication.</p>`,
    "دور مجلس إدارة جمعية معين، مع نشر الأسماء الرسمية بعد اعتمادها فقط.",
    "The role of Mueen Association's board; member names are published only when approved.",
  ),
  assembly: item(
    "assembly",
    "الجمعية العمومية",
    "General Assembly",
    `<h2>الجمعية العمومية</h2>
     <p>الجمعية العمومية هي أعلى سلطة في الجمعية، وتتكون وفق اللائحة الأساسية من الأعضاء العاملين المستوفين لالتزامات العضوية.</p>
     <p>تنعقد اجتماعاتها وتصدر قراراتها وفق الإجراءات والاختصاصات الموضحة في اللائحة الأساسية والأنظمة ذات العلاقة.</p>`,
    `<h2>General Assembly</h2>
     <p>The General Assembly is the association's highest authority. Under the bylaws, it consists of active members who meet their membership obligations.</p>
     <p>Meetings and decisions follow the procedures and responsibilities in the bylaws and applicable regulations.</p>`,
    "تعرف على دور الجمعية العمومية في جمعية معين وفق اللائحة الأساسية.",
    "Learn about the General Assembly's role under Mueen Association's bylaws.",
  ),
  programs: item(
    "programs",
    "البرامج والمبادرات",
    "Programs and Initiatives",
    `<h2>محاور البرامج</h2>
     <p>تتضمن الخطة التشغيلية محاور مقترحة لخدمة ضيوف الرحمن، مثل التوعية والإرشاد، والضيافة وتوفير المياه والطعام، والتطوع، ومساندة كبار السن والأشخاص ذوي الإعاقة، ودعم من يحتاج إلى العون أثناء الرحلة.</p>
     <p>هذه محاور واردة في الخطة التشغيلية، وليست إعلاناً بأن جميع المبادرات نشطة حالياً. تُعلن تفاصيل كل مبادرة عند اعتمادها وتحديد موعدها وآلية المشاركة فيها.</p>`,
    `<h2>Program Areas</h2>
     <p>The operating plan includes proposed areas such as awareness and guidance, hospitality and water or food support, volunteering, assistance for older adults and people with disabilities, and help for people who need support during their journey.</p>
     <p>These are planning areas, not a statement that every initiative is currently active. Details are announced when each initiative is approved and scheduled.</p>`,
    "محاور البرامج الإنسانية المقترحة في الخطة التشغيلية لجمعية معين.",
    "Humanitarian program areas proposed in Mueen Association's operating plan.",
  ),
  bylaws: item(
    "bylaws",
    "اللائحة الأساسية",
    "Association Bylaws",
    `<h2>اللائحة الأساسية</h2>
     <p>تعمل جمعية معين وفق لائحتها الأساسية المعتمدة ونظام الجمعيات والمؤسسات الأهلية ولائحته التنفيذية وقواعد الحوكمة ذات العلاقة.</p>
     <p>توضح اللائحة اختصاصات الجمعية العمومية ومجلس الإدارة واللجان والجهاز التنفيذي، كما تنظم العضوية والاجتماعات والقرارات. للاستفسار عن نسخة النشر المعتمدة، يرجى التواصل مع الجمعية.</p>`,
    `<h2>Association Bylaws</h2>
     <p>Mueen Association operates under its approved bylaws, the Saudi nonprofit associations law, its executive regulations, and relevant governance rules.</p>
     <p>The bylaws define the responsibilities of the General Assembly, board, committees, and executive team, and govern membership, meetings, and decisions. Contact the association for an approved public copy.</p>`,
    "اللائحة الأساسية لجمعية معين الحاج والمعتمر وأطر الحوكمة المنظمة لعملها.",
    "Mueen Al-Hajj wal-Mu'tamir's bylaws and governance framework.",
  ),
  financials: item(
    "financials",
    "القوائم المالية",
    "Financial Statements",
    `<h2>القوائم المالية والإفصاح المالي</h2>
     <p>تحرص الجمعية على عرض المعلومات المالية المعتمدة بوضوح بعد استكمال مراجعتها وإجازة نشرها.</p>
     <p>لا تتضمن الملفات المتاحة قوائم مالية منشورة أو أرقاماً معتمدة؛ لذلك لا نعرض تقديرات أو بيانات مالية غير موثقة. ستُضاف المستندات المعتمدة هنا عند توفرها.</p>`,
    `<h2>Financial Statements</h2>
     <p>The association aims to publish approved financial information clearly after review and authorization for publication.</p>
     <p>The available files do not include public financial statements or approved figures, so no estimates or unverified figures are shown. Approved documents can be added here when available.</p>`,
    "القوائم المالية المعتمدة لجمعية معين؛ لا تُعرض أرقام غير موثقة.",
    "Approved Mueen Association financial statements; unverified figures are not displayed.",
  ),
  policies: item(
    "policies",
    "السياسات واللوائح",
    "Policies and Regulations",
    `<h2>السياسات واللوائح</h2>
     <p>تلتزم الجمعية باللائحة الأساسية والأنظمة واللوائح المنظمة للجمعيات الأهلية في المملكة، وبالإجراءات المعتمدة داخل الجمعية.</p>
     <p>لم تتضمن الملفات المتاحة نسخاً مستقلة معتمدة لجميع السياسات؛ ستُنشر كل وثيقة هنا بعد التحقق من اعتمادها وصلاحيتها للنشر.</p>`,
    `<h2>Policies and Regulations</h2>
     <p>The association follows its bylaws, Saudi regulations governing nonprofit associations, and its approved internal procedures.</p>
     <p>The available files do not include approved copies of every policy. Documents will be posted here after their approval and publication status are verified.</p>`,
    "السياسات واللوائح المنظمة لجمعية معين، مع نشر الوثائق بعد اعتمادها.",
    "Policies and regulations for Mueen Association, published after approval.",
  ),
  committees: item(
    "committees",
    "اللجان",
    "Committees",
    `<h2>اللجان</h2>
     <p>تجيز اللائحة الأساسية تشكيل لجان دائمة أو مؤقتة بقرار من الجمعية العمومية أو مجلس الإدارة، ويحدد قرار التشكيل اختصاص كل لجنة ومهامها.</p>
     <p>لا تتضمن الملفات المتاحة قرارات تشكيل أو قائمة حالية بأسماء اللجان؛ لذلك نعرض الإطار التنظيمي دون اختلاق لجان أو مهام غير موثقة.</p>`,
    `<h2>Committees</h2>
     <p>The bylaws allow the General Assembly or board to establish permanent or temporary committees, with each committee's scope and duties defined in its formation decision.</p>
     <p>The available files do not include current formation decisions or a committee list, so no unverified committees or duties are listed.</p>`,
    "إطار تشكيل اللجان في جمعية معين كما توضحه اللائحة الأساسية.",
    "Committee framework for Mueen Association as described in its bylaws.",
  ),
  ethics: item(
    "ethics",
    "الميثاق الأخلاقي",
    "Code of Ethics",
    `<h2>قيم العمل الأخلاقي</h2>
     <p>ترتكز خدمة ضيوف الرحمن على الأمانة والصدق والإخلاص والإحسان والمبادرة وتحمل المسؤولية.</p>
     <ul><li>احترام كرامة المستفيد وخصوصيته.</li><li>التعامل بصدق ووضوح.</li><li>المحافظة على موارد الجمعية واستخدامها للغرض المعتمد.</li><li>تقديم الخدمة بعدل واحترام ودون تمييز.</li><li>الإبلاغ عن التعارضات والملاحظات عبر القنوات الرسمية.</li></ul>
     <p>هذه مبادئ تعريفية مستمدة من قيم الخطة التشغيلية، ولا تحل محل وثيقة الميثاق المعتمدة إذا صدرت.</p>`,
    `<h2>Ethical Principles</h2>
     <p>Service to pilgrims is guided by trust, honesty, sincerity, excellence, initiative, and responsibility.</p>
     <ul><li>Respect beneficiaries' dignity and privacy.</li><li>Communicate truthfully and clearly.</li><li>Use association resources for their approved purpose.</li><li>Serve people fairly and respectfully.</li><li>Raise concerns through official channels.</li></ul>
     <p>These introductory principles reflect the operating plan's values and do not replace a formally approved code if one is issued.</p>`,
    "مبادئ الأمانة والشفافية واحترام المستفيد في خدمة ضيوف الرحمن.",
    "Principles of trust, transparency, and respect in serving pilgrims.",
  ),
  disclosure: item(
    "disclosure",
    "الإفصاح",
    "Disclosure",
    `<h2>الإفصاح والشفافية</h2>
     <p>تسعى الجمعية إلى إتاحة المعلومات المؤسسية المعتمدة، وتحديثها عند ورود تغيير رسمي، مع حماية البيانات الشخصية والمالية التي لا يجوز نشرها.</p>
     <ul><li>الاسم الظاهر للجمهور: جمعية معين لخدمات الحج والعمرة.</li><li>الاسم النظامي في وثائق الجمعية: معين الحاج والمعتمر.</li><li>رقم الترخيص: 1000758700.</li><li>المقر: مكة المكرمة.</li></ul>
     <p>تُضاف بيانات التواصل والوثائق المالية والقرارات العامة بعد التحقق من اعتمادها وصلاحيتها للنشر.</p>`,
    `<h2>Disclosure and Transparency</h2>
     <p>The association aims to make approved organizational information available and keep it current, while protecting personal and financial information that must not be disclosed.</p>
     <ul><li>Public name: Mueen Association for Hajj and Umrah Services.</li><li>Registered name in association documents: Mueen Al-Hajj wal-Mu'tamir.</li><li>License number: 1000758700.</li><li>Location: Makkah.</li></ul>
     <p>Contact details, financial documents, and public decisions can be added after their approval and publication status are verified.</p>`,
    "بيانات جمعية معين المرخصة ومعلومات الإفصاح المؤسسي المعتمدة.",
    "Registered Mueen Association details and approved organizational disclosures.",
  ),
  satisfaction: item(
    "satisfaction",
    "قياس الرضا",
    "Satisfaction and Feedback",
    `<h2>رأيك يساعدنا على التحسين</h2>
     <p>تعمل الجمعية على متابعة تجربة المستفيدين والاستماع إلى ملاحظاتهم، بما يساعد على تطوير التوعية والإرشاد والضيافة والمساندة.</p>
     <p>لا تتضمن الملفات المتاحة نتائج قياس رضا منشورة؛ لذلك لا نعرض نسباً أو نتائج غير موثقة. يمكن مشاركة الملاحظات عبر صفحة التواصل، وستُنشر النتائج المعتمدة عند توفرها.</p>
     <p><a href="/contact">تواصل مع الجمعية</a></p>`,
    `<h2>Your Feedback Helps Us Improve</h2>
     <p>The association seeks to understand beneficiary experience and use feedback to improve awareness, guidance, hospitality, and support.</p>
     <p>The available files do not include published satisfaction results, so no unverified percentages are shown. Share feedback through the contact page; approved results can be published when available.</p>
     <p><a href="/contact">Contact the association</a></p>`,
    "تعرف على منهج جمعية معين في الاستماع للمستفيدين وتحسين خدماتها.",
    "How Mueen Association listens to beneficiaries and improves its services.",
  ),
  executive: item(
    "executive",
    "المسؤول التنفيذي",
    "Executive Leadership",
    `<h2>الجهاز التنفيذي</h2>
     <p>بحسب اللائحة الأساسية، المسؤول التنفيذي هو المسؤول الأول عن الجهاز التنفيذي للجمعية. ويتولى الجهاز تنفيذ الخطط والبرامج المعتمدة ورفع التقارير إلى الجهات الإدارية المختصة.</p>
     <p>لم تتضمن الملفات المتاحة قراراً عاماً معتمداً يذكر اسم المسؤول التنفيذي؛ لذلك لا نعرض اسماً غير موثق. تُحدّث الصفحة عند اعتماد بيانات النشر.</p>`,
    `<h2>Executive Team</h2>
     <p>Under the bylaws, the executive leader is the person responsible for the association's executive apparatus. The team carries out approved plans and programs and reports to the relevant governing bodies.</p>
     <p>The available files do not include an approved public appointment notice, so no unverified name is shown. The page can be updated when publication details are authorized.</p>`,
    "دور المسؤول التنفيذي في جمعية معين وفق اللائحة الأساسية.",
    "The executive leader's role under Mueen Association's bylaws.",
  ),
};
