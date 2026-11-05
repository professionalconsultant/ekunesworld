/* =============================================================
   EkunesWorld — CONTENT
   -------------------------------------------------------------
   This is the file you edit most. It holds:
     1. site    → name, email, social links, images, form settings
     2. sections → the five journal sections and their sub-sections
     3. posts   → every story, article and interview

   Every text field can be written in four languages:
     mn = Монгол, en = English, ko = 한국어, zh = 中文
   If a language is missing, the English text is shown instead.
   ============================================================= */

window.EKUNES = {

  /* ---------- 1. SITE SETTINGS ---------- */
  site: {
    name: "EkunesWorld",
    journal: "Ekunes Journal",
    author: "Enerel Ekune",

    // ← Replace with your real email address. Forms open an email to this address.
    email: "ekune.nrl@gmail.com",

    // Your website address once it is live, e.g. "https://ekunesworld.com/". Used by the share buttons.
    url: "",

    // Where the forms send messages. FormSubmit delivers them straight to the email above,
    // so visitors do not need an email app. The FIRST message sent after publishing makes FormSubmit
    // email you an activation link: click it once and every later message arrives normally.
    // To use another service (e.g. Formspree), paste its address here. Leave empty ("") to fall back
    // to opening the visitor's email app.
    formEndpoint: "https://formsubmit.co/ajax/ekune.nrl@gmail.com",
    newsletterEndpoint: "https://formsubmit.co/ajax/ekune.nrl@gmail.com",

    // "" = choose automatically from the visitor's browser language. Or set "mn", "en", "ko" or "zh".
    defaultLang: "",

    // Photos. These come from YouTube video covers on the @enerel.ekunes channel.
    // For the best quality, replace them with your own files, e.g. "assets/images/hero.jpg".
    // ...Position moves the crop: "50% 0%" = top, "50% 50%" = centre.
    images: {
      hero: "https://i.ytimg.com/vi/GVfRMgf_F0A/oardefault.jpg",        heroPosition: "50% 28%",
      about: "https://i.ytimg.com/vi/x7gzwKBWv6w/oardefault.jpg",       aboutPosition: "50% 30%",
      styling: "https://i.ytimg.com/vi/wPrhq7mUUYc/oardefault.jpg",     stylingPosition: "50% 6%"
    },

    // Her own words (from the pinned Facebook post). Mongolian and English are hers;
    // Korean and Chinese are translations — please review them.
    statement: {
      mn: ["Сэтгүүлч мэргэжилтэй ч, үгийн урлаг зохиолын ертөнц надад илүү дуудлага өгдөг.",
           "Мэдээллийн бодит үнэнийг бичихийн зэрэгцээ, хүний сэтгэлийн өнгийг үгээр зурахыг хүсдэг.",
           "Би сэтгүүлчийн нүдээр ертөнцийг харж, зохиолчийн зүрхээр түүнийг мэдэрдэг.",
           "Амьдралынхаа замд хоёр ертөнцийг үнэн ба уран сэтгэмжийг нэгтгэн алхах мөрөөдөлтэй, чөлөөт сэтгэгч, бичээч хүн."],
      en: ["I am trained as a journalist, yet the world of literary expression calls to me more deeply.",
           "While I write the truth of information, I also long to paint the colors of human emotion with words.",
           "I see the world through the eyes of a journalist, and feel it with the heart of a writer.",
           "On the path of my life, I dream of walking where two worlds meet — truth and imagination — as a free thinker and a writer."],
      ko: ["저는 저널리스트로 훈련받았지만, 문학적 표현의 세계가 저를 더 깊이 부릅니다.",
           "정보의 진실을 쓰는 동시에, 인간 감정의 색을 말로 그려내고 싶습니다.",
           "저는 저널리스트의 눈으로 세상을 보고, 작가의 마음으로 그것을 느낍니다.",
           "삶의 길 위에서 진실과 상상, 두 세계가 만나는 곳을 걷기를 꿈꾸는 자유로운 사상가이자 작가입니다."],
      zh: ["我受过记者的专业训练，但文学表达的世界对我有着更深的召唤。",
           "在书写信息真相的同时，我也渴望用文字描绘人类情感的色彩。",
           "我用记者的眼睛看世界，用作家的心去感受它。",
           "在人生的路上，我梦想走在真实与想象两个世界交汇之处——做一个自由的思考者与写作者。"]
    },

    // YouTube videos shown on the home page (the id is the part after /shorts/ or ?v=).
    youtube: {
      channel: "https://www.youtube.com/@enerel.ekunes",
      videos: [
        { id: "BRV06gavepQ", title: { en: "Why do Mongolians love horses?", mn: "Монголчууд яагаад морьд хайртай вэ?", ko: "몽골인들은 왜 말을 좋아할까요?", zh: "蒙古人为什么爱马？" } },
        { id: "4YFYQnjODSE", title: { en: "Bökh: Mongolia’s traditional wrestling", mn: "Бөх: Монголын үндэсний бөх", ko: "몽골의 전통 스포츠, 부흐", zh: "搏克：蒙古传统摔跤" } },
        { id: "PclITWpsYMo", title: { en: "This is how writers describe love", mn: "Зохиолчид хайрыг ингэж илэрхийлдэг", ko: "작가들은 사랑을 이렇게 표현한다", zh: "作家这样描写爱" } }
      ]
    },

    // Instagram posts shown on the home page (official Instagram embeds).
    // To change them: on Instagram open a post → ••• → Copy link, and paste it here.
    instagramPosts: [
      "https://www.instagram.com/reel/DfD02itMxKL/",
      "https://www.instagram.com/reel/DfTi3gwMbaM/",
      "https://www.instagram.com/reel/DfMGLFhxcnQ/"
    ],

    social: [
      { icon: "instagram", label: "Instagram", handle: "@enerel.s_ekune", url: "https://www.instagram.com/enerel.s_ekune/" },
      { icon: "linkedin",  label: "LinkedIn",  handle: "Enerel Ekune",    url: "https://www.linkedin.com/in/enerel-ekune-a75553194" },
      { icon: "facebook",  label: "Facebook",  handle: "Enerel Surenhorol", url: "https://www.facebook.com/enerelekune" },
      { icon: "youtube",   label: "YouTube",   handle: "@enerel.ekunes",  url: "https://youtube.com/@enerel.ekunes" }
    ]
  },

  /* ---------- 2. SECTIONS ----------
     tone  = colour of the placeholder swatch (oat, felt, camel, tengri, sky)
     image = optional photo path, e.g. "assets/images/stories.jpg"            */
  sections: [
    {
      id: "stories", num: "1", tone: "oat", image: "https://i.ytimg.com/vi/ZP4OhevzGfQ/oardefault.jpg", imagePosition: "50% 22%",
      title:   { en: "Stories & Literature", mn: "Өгүүллэг ба уран зохиол", ko: "스토리 & 문학", zh: "故事与文学" },
      tagline: { en: "Original stories and creative writing", mn: "Анхдагч өгүүллэг ба бүтээлч зохиол", ko: "오리지널 스토리와 창작 글", zh: "原创故事与创意写作" },
      intro:   { en: "Short fiction, poetry and literary collections — including Mongolian literature in English translation.",
                 mn: "Богино өгүүллэг, яруу найраг, уран зохиолын түүврүүд — монгол уран зохиолын англи орчуулгыг оролцуулан.",
                 ko: "단편소설, 시, 문학 선집 — 몽골 문학의 영어 번역을 포함합니다.",
                 zh: "短篇小说、诗歌与文学选集——包括蒙古文学的英文译本。" },
      cta:     { en: "Read the stories", mn: "Өгүүллэгүүдийг унших", ko: "이야기 읽기", zh: "阅读故事" },
      subs: [
        { id: "short-stories", name: { en: "Short Stories", mn: "Богино өгүүллэг", ko: "단편소설", zh: "短篇小说" } },
        { id: "poetry",        name: { en: "Poetry", mn: "Яруу найраг", ko: "시", zh: "诗歌" } },
        { id: "collections",   name: { en: "Literary Collections", mn: "Уран зохиолын түүвэр", ko: "문학 선집", zh: "文学选集" } }
      ]
    },
    {
      id: "articles", num: "2", tone: "felt", image: "https://i.ytimg.com/vi/8s0NjwZ3HFo/oardefault.jpg", imagePosition: "50% 0%",
      title:   { en: "Articles & Journalism", mn: "Нийтлэл ба сэтгүүл зүй", ko: "아티클 & 저널리즘", zh: "文章与新闻写作" },
      tagline: { en: "Perspectives that matter", mn: "Чухал үзэл бодлууд", ko: "중요한 관점들", zh: "值得关注的视角" },
      intro:   { en: "Essays and reporting on culture, business, psychology and the creative industries.",
                 mn: "Соёл, бизнес, сэтгэл зүй, бүтээлч салбарын тухай эсээ, сурвалжлага.",
                 ko: "문화, 비즈니스, 심리학, 크리에이티브 산업에 관한 에세이와 리포트.",
                 zh: "关于文化、商业、心理学与创意产业的随笔与报道。" },
      cta:     { en: "Explore articles", mn: "Нийтлэлүүдтэй танилцах", ko: "아티클 보기", zh: "浏览文章" },
      subs: [
        { id: "culture",    name: { en: "Culture", mn: "Соёл", ko: "문화", zh: "文化" } },
        { id: "business",   name: { en: "Business", mn: "Бизнес", ko: "비즈니스", zh: "商业" } },
        { id: "psychology", name: { en: "Psychology", mn: "Сэтгэл зүй", ko: "심리학", zh: "心理学" } },
        { id: "creative",   name: { en: "Creative Industries", mn: "Бүтээлч салбар", ko: "크리에이티브 산업", zh: "创意产业" } }
      ]
    },
    {
      id: "style", num: "3", tone: "camel", image: "https://i.ytimg.com/vi/o-y86qGcIho/oardefault.jpg", imagePosition: "50% 30%",
      title:   { en: "Style & Fashion", mn: "Стиль ба загвар", ko: "스타일 & 패션", zh: "风格与时尚" },
      tagline: { en: "Personal style. Visual identity.", mn: "Хувийн стиль. Дүр төрх.", ko: "퍼스널 스타일. 비주얼 아이덴티티.", zh: "个人风格，视觉身份。" },
      intro:   { en: "Notes from a working stylist: fashion, personal styling and colour psychology — and the designers and brands shaping a new aesthetic.",
                 mn: "Ажиллаж буй стилистын тэмдэглэл: загвар, хувийн стиль, өнгөний сэтгэл зүй — мөн шинэ гоо зүйг бүтээж буй дизайнер, брэндүүд.",
                 ko: "현직 스타일리스트의 노트: 패션, 퍼스널 스타일링, 컬러 심리학 — 그리고 새로운 미학을 만드는 디자이너와 브랜드.",
                 zh: "一位造型师的笔记：时尚、个人造型与色彩心理学——以及塑造全新美学的设计师与品牌。" },
      cta:     { en: "Explore style", mn: "Стилийн нийтлэлүүд", ko: "스타일 보기", zh: "探索风格" },
      subs: [
        { id: "fashion", name: { en: "Fashion", mn: "Загвар", ko: "패션", zh: "时尚" } },
        { id: "styling", name: { en: "Personal Styling", mn: "Хувийн стиль", ko: "퍼스널 스타일링", zh: "个人造型" } },
        { id: "colour",  name: { en: "Colour Psychology", mn: "Өнгөний сэтгэл зүй", ko: "컬러 심리학", zh: "色彩心理学" } },
        { id: "brands",  name: { en: "Brand Features", mn: "Брэндийн онцлох", ko: "브랜드 피처", zh: "品牌专题" } }
      ]
    },
    {
      id: "interviews", num: "4", tone: "tengri", image: "https://i.ytimg.com/vi/Ymj2UqD70xY/oardefault.jpg", imagePosition: "50% 22%",
      title:   { en: "Interviews", mn: "Ярилцлага", ko: "인터뷰", zh: "访谈" },
      tagline: { en: "The people behind the creativity", mn: "Бүтээлч байдлын ард буй хүмүүс", ko: "창의성 뒤의 사람들", zh: "创造力背后的人" },
      intro:   { en: "Conversations with artists, international professionals and entrepreneurs — about their work and their inner worlds.",
                 mn: "Уран бүтээлчид, олон улсын мэргэжилтнүүд, бизнес эрхлэгчидтэй тэдний ажил болон дотоод ертөнцийн тухай ярилцлага.",
                 ko: "아티스트, 국제적인 전문가, 기업가들과 나눈 일과 내면 세계에 관한 대화.",
                 zh: "与艺术家、国际专业人士和创业者的对话——关于他们的工作与内心世界。" },
      cta:     { en: "Meet the people", mn: "Хүмүүстэй танилцах", ko: "인물 만나기", zh: "认识他们" },
      subs: [
        { id: "artists",       name: { en: "Artists", mn: "Уран бүтээлчид", ko: "아티스트", zh: "艺术家" } },
        { id: "professionals", name: { en: "Professionals", mn: "Мэргэжилтнүүд", ko: "전문가", zh: "专业人士" } },
        { id: "entrepreneurs", name: { en: "Entrepreneurs", mn: "Бизнес эрхлэгчид", ko: "기업가", zh: "创业者" } }
      ]
    },
    {
      id: "collaborate", num: "5", tone: "sky", image: "https://i.ytimg.com/vi/XXYljlc7V-I/oardefault.jpg", imagePosition: "50% 12%",
      title:   { en: "Collaboration", mn: "Хамтын ажил", ko: "협업", zh: "合作" },
      tagline: { en: "Let’s create something meaningful", mn: "Утга учиртай зүйлийг хамтдаа бүтээе", ko: "의미 있는 것을 함께 만들어요", zh: "一起创造有意义的事物" },
      intro:   { en: "Brand partnerships, editorial features and creative campaigns.",
                 mn: "Брэндийн түншлэл, редакцийн нийтлэл, бүтээлч кампанит ажил.",
                 ko: "브랜드 파트너십, 에디토리얼 피처, 크리에이티브 캠페인.",
                 zh: "品牌合作、编辑专题与创意营销。" },
      cta:     { en: "Work with us", mn: "Хамтран ажиллах", ko: "함께 일하기", zh: "与我们合作" },
      subs: [
        { id: "partnerships", anchor: "services", name: { en: "Brand Partnerships", mn: "Брэндийн түншлэл", ko: "브랜드 파트너십", zh: "品牌合作" } },
        { id: "editorial",    anchor: "services", name: { en: "Editorial Features", mn: "Редакцийн онцлох нийтлэл", ko: "에디토리얼 피처", zh: "编辑专题" } },
        { id: "proposal",     anchor: "proposal", name: { en: "Submit a Proposal", mn: "Санал илгээх", ko: "제안서 보내기", zh: "提交合作提案" } }
      ]
    }
  ],

  /* ---------- 3. POSTS ----------
     The first two pieces are real (from LinkedIn/Facebook and YouTube); the rest are samples.
     link    = optional button to the full piece elsewhere: { url, label: {en, mn, ko, zh} }
     video   = optional YouTube video id, played at the top of the piece
     slug    = unique web address, e.g. #read/your-slug
     section / sub = must match an id above
     date    = YYYY-MM-DD    read = minutes to read
     format  = "poem" keeps line breaks and sets the text in italics
     image   = optional photo path
     body    = list of paragraphs per language. Use \n for a line break.   */
  posts: [
    /* ---- Real pieces from her channels ---- */
    {
      slug: "kim-geon-woo-interview", section: "interviews", sub: "professionals", date: "2026-11-05", read: 3, image: "",
      link: { url: "https://www.linkedin.com/pulse/%EA%B9%80%EA%B1%B4%EC%9A%B0-kt-ax-%EC%A0%84%EB%9E%B5-%EC%BB%A8%EC%84%A4%ED%84%B4%ED%8A%B8-%EC%9D%B8%ED%84%B0%EB%B7%B0-enerel-ekune-25oaf",
              label: { en: "Read the full interview on LinkedIn", mn: "Ярилцлагыг бүрэн эхээр нь LinkedIn дээр унших", ko: "LinkedIn에서 인터뷰 전문 읽기", zh: "在 LinkedIn 阅读采访全文" } },
      title:   { en: "In Conversation with Kim Geon-woo, KT AX Strategy Consultant", mn: "KT AX-ийн стратегийн зөвлөх Ким Гон Ү-тэй хийсэн ярилцлага", ko: "김건우 KT AX 전략 컨설턴트 인터뷰", zh: "专访 KT AX 战略顾问 Kim Geon-woo" },
      excerpt: { en: "How to create real change for people and business in the age of AI — an interview connecting readers in Korea and Mongolia.",
                 mn: "Хиймэл оюун ухааны эрин үед хүн болон бизнест бодит өөрчлөлтийг хэрхэн бий болгох вэ — Солонгос, Монголын уншигчдыг холбосон ярилцлага.",
                 ko: "AI 시대, 기술을 넘어 사람과 비즈니스의 실질적인 변화를 만드는 방법.",
                 zh: "在 AI 时代，如何超越技术，为人与企业带来真正的改变——一场连接韩国与蒙古读者的对话。" },
      body: {
        en: ["Kim Geon-woo leads AI strategy projects at KT and teaches as an adjunct professor of artificial intelligence at the Catholic University of Korea. Over fifteen years he has guided digital and AI transformation at Samsung SDS, LG Chem, CJ CheilJedang, Innocean and KT.",
             "We spoke about the future of AI, how businesses can make the shift, how people and AI can work together — and the opportunities opening up for Mongolia. The full interview, in Korean, is published on LinkedIn."],
        mn: ["Ким Гон Ү нь KT компанид AI стратегийн төслүүдийг удирдаж, Солонгосын Католик их сургуулийн хиймэл оюун ухааны тэнхимд багшилдаг. Тэрээр сүүлийн 15 жилийн турш Samsung SDS, LG Chem, CJ CheilJedang, Innocean, KT зэрэг компаниудад дижитал болон AI шилжилтийг удирдан хэрэгжүүлжээ.",
             "Бид хиймэл оюун ухааны ирээдүй, бизнесийн AI шилжилт, хүн ба хиймэл оюун ухааны хамтын ажиллагаа болон Монгол Улсад нээгдэж буй боломжуудын талаар ярилцлаа. Ярилцлагыг бүрэн эхээр нь солонгос хэлээр LinkedIn дээр уншаарай."],
        ko: ["김건우 컨설턴트는 KT에서 AI 전략 프로젝트를 이끌고 있으며, 가톨릭대학교 인공지능학과 겸임교수로도 활동하고 있습니다. 지난 15년간 삼성SDS, LG화학, CJ제일제당, 이노션, KT 등에서 디지털 혁신과 AI 전환을 이끌어 왔습니다.",
             "AI의 미래, 기업의 AI 전환, 사람과 AI의 협업, 그리고 몽골에 열리고 있는 기회에 대해 이야기를 나눴습니다. 인터뷰 전문은 LinkedIn에서 읽을 수 있습니다."],
        zh: ["Kim Geon-woo 在 KT 负责 AI 战略项目，并担任韩国天主教大学人工智能系兼任教授。过去十五年间，他曾在三星 SDS、LG 化学、CJ 第一制糖、Innocean 和 KT 等企业推动数字化与 AI 转型。",
             "我们谈到了 AI 的未来、企业的 AI 转型、人与 AI 的协作，以及蒙古正在出现的机遇。采访全文（韩文）发布于 LinkedIn。"]
      }
    },
    {
      slug: "naadam-and-forum", section: "articles", sub: "culture", date: "2026-06-10", read: 6,
      video: "z5CgJC4j5T8", image: "https://i.ytimg.com/vi/z5CgJC4j5T8/sddefault.jpg",
      title:   { en: "Two Days at Naadam and the Forum", mn: "Наадам ба форумын хоёр өдөр", ko: "나담과 포럼에서의 이틀", zh: "那达慕与论坛的两天" },
      excerpt: { en: "Video coverage from the Mongolian Naadam and Forum, filmed over two days.",
                 mn: "Монголын Наадам ба Форумаас хоёр өдрийн турш хийсэн видео сурвалжлага.",
                 ko: "몽골 나담과 포럼 현장을 이틀 동안 담은 영상 취재.",
                 zh: "历时两天的蒙古那达慕与论坛视频报道。" },
      body: {
        en: ["Two days of video coverage from the Mongolian Naadam and Forum, filmed and reported for the Ekunes channel. Press play above to watch the full report."],
        mn: ["Монголын Наадам ба Форумаас хоёр өдрийн турш бэлтгэсэн видео сурвалжлага. Дээрх бичлэгийг тоглуулж бүрэн эхээр нь үзээрэй."],
        ko: ["몽골 나담과 포럼 현장을 이틀 동안 취재한 영상 리포트입니다. 위의 영상을 재생해 전체 리포트를 시청하세요."],
        zh: ["这是一份历时两天、来自蒙古那达慕与论坛现场的视频报道。点击上方视频即可观看完整内容。"]
      }
    },

    /* ---- Sample pieces: replace with your own ---- */
    {
      slug: "last-light-over-the-steppe", section: "stories", sub: "short-stories", date: "2026-10-18", read: 8, image: "",
      title:   { en: "The Last Light Over the Steppe", mn: "Талын сүүлчийн гэрэл", ko: "초원 위의 마지막 빛", zh: "草原上的最后一缕光" },
      excerpt: { en: "A woman returns to the countryside of her childhood and discovers that memory, like the horizon, keeps moving.",
                 mn: "Бага насаа өнгөрөөсөн хөдөөдөө эргэн ирсэн эмэгтэй дурсамж ч тэнгэрийн хаяа шиг үргэлж холдсоор байдгийг ойлгоно.",
                 ko: "어린 시절을 보낸 시골로 돌아온 한 여인은 기억이 지평선처럼 끊임없이 움직인다는 것을 깨닫는다.",
                 zh: "一个女人回到童年的乡村，发现记忆就像地平线一样，总在不断移动。" },
      body: {
        en: ["The bus left her at the edge of the soum just as the sun began to lower itself onto the hills. Nothing had changed, she thought — and then she noticed that everything had.",
             "Her grandmother’s ger was gone. In its place stood a small wooden house with a blue door, and a girl she did not know was waiting on the step, as if she had been expected for years."],
        mn: ["Нар толгодын цаана живж эхлэх үед автобус түүнийг сумын захад буулгав. Юу ч өөрчлөгдөөгүй юм байна гэж тэр бодов — тэгээд бүх зүйл өөрчлөгдсөнийг анзаарав.",
             "Эмээгийнх нь гэр байсангүй. Түүний оронд хөх хаалгатай жижигхэн модон байшин зогсож, хэдэн жил хүлээсэн юм шиг үл таних нэгэн охин босгон дээр сууж байлаа."],
        ko: ["해가 언덕 위로 내려앉기 시작할 무렵, 버스는 그녀를 마을 어귀에 내려주었다. 아무것도 변하지 않았다고 그녀는 생각했다 — 그리고 곧 모든 것이 변했다는 것을 알아차렸다.",
             "할머니의 게르는 사라지고 없었다. 그 자리에는 파란 문이 달린 작은 나무집이 서 있었고, 처음 보는 소녀가 마치 오래전부터 그녀를 기다려온 듯 문턱에 앉아 있었다."],
        zh: ["太阳开始沉向山丘时，巴士把她放在了苏木的边缘。她想，什么都没有变——随后她才发现，一切都变了。",
             "祖母的蒙古包不见了。原地立着一座带蓝色门的小木屋，一个她不认识的女孩坐在门槛上，仿佛已经等了她很多年。"]
      }
    },
    {
      slug: "letters-to-the-wind", section: "stories", sub: "poetry", date: "2026-09-27", read: 4, format: "poem", image: "",
      title:   { en: "Letters to the Wind", mn: "Салхинд бичсэн захидлууд", ko: "바람에게 보내는 편지", zh: "写给风的信" },
      excerpt: { en: "A cycle of poems written between cities — on distance, language and the quiet places we carry with us.",
                 mn: "Хотуудын хооронд бичигдсэн шүлгийн цикл — зай хол, хэл, бидний дотор тээж явдаг нам гүм орон зайн тухай.",
                 ko: "도시와 도시 사이에서 쓴 연작시 — 거리와 언어, 그리고 우리가 품고 다니는 고요한 장소에 대하여.",
                 zh: "一组写于城市之间的诗——关于距离、语言，以及我们随身携带的安静之所。" },
      body: {
        en: ["I write to you in a language\nyou have never spoken,\nand still you answer —\nthe way the grass bends\nbefore the wind arrives.",
             "Between two cities\nI keep a small room of silence.\nIt is where I go\nwhen every word is too loud\nto mean anything at all."],
        mn: ["Чиний хэзээ ч ярьж байгаагүй\nхэлээр би чамд бичнэ,\nгэвч чи хариулсаар —\nсалхи ирэхээс өмнө\nөвс бөхийдөг шиг.",
             "Хоёр хотын хооронд\nби нэгэн жижиг нам гүм өрөөтэй.\nҮг бүр хэтэрхий чанга,\nутгаа алдах үед\nби тийшээ очдог."],
        ko: ["나는 당신이 한 번도\n말해본 적 없는 언어로 편지를 쓴다,\n그런데도 당신은 대답한다 —\n바람이 닿기 전에\n풀이 먼저 눕는 방식으로.",
             "두 도시 사이에\n나는 작은 침묵의 방을 둔다.\n모든 말이 너무 시끄러워\n아무 의미도 갖지 못할 때\n나는 그곳으로 간다."],
        zh: ["我用一种你从未说过的\n语言给你写信，\n而你依然回答——\n就像风还未到来时\n草已先弯下了腰。",
             "在两座城市之间\n我留着一间小小的寂静之屋。\n当每一个词都太喧闹\n以至于失去意义\n我便去那里。"]
      }
    },
    {
      slug: "between-two-alphabets", section: "stories", sub: "collections", date: "2026-08-30", read: 6, image: "",
      title:   { en: "Between Two Alphabets", mn: "Хоёр цагаан толгойн хооронд", ko: "두 개의 알파벳 사이", zh: "两种字母之间" },
      excerpt: { en: "A collection of Mongolian stories in English translation — old voices and new ones, side by side.",
                 mn: "Англи хэлнээ орчуулагдсан монгол өгүүллэгүүдийн түүвэр — хуучин ба шинэ дуу хоолой зэрэгцэн.",
                 ko: "영어로 번역된 몽골 이야기 선집 — 옛 목소리와 새 목소리가 나란히.",
                 zh: "一部蒙古故事英译选集——古老与崭新的声音并肩而立。" },
      body: {
        en: ["Every translation is a journey between two homes. Some words travel easily; others refuse to leave and must be carried with care, explained, or simply loved in their original form.",
             "This collection gathers short prose by Mongolian writers, presented in English for new readers — with notes on the words that could not, and perhaps should not, be translated."],
        mn: ["Орчуулга бүр хоёр гэрийн хоорондох аялал. Зарим үг амархан аялдаг; зарим нь орхин явахаас татгалзаж, нямбай авч явах, тайлбарлах, эсвэл зүгээр л эх хэлбэрээр нь хайрлах ёстой байдаг.",
             "Энэ түүвэрт монгол зохиолчдын богино зохиолуудыг шинэ уншигчдад зориулан англи хэлээр толилуулж, орчуулах боломжгүй — магадгүй орчуулах ёсгүй — үгсийн тухай тайлбарыг хавсаргав."],
        ko: ["모든 번역은 두 개의 집 사이를 오가는 여행입니다. 어떤 단어는 쉽게 떠나지만, 어떤 단어는 떠나기를 거부해 조심스럽게 데려가거나, 설명하거나, 그저 원래 모습 그대로 사랑해야 합니다.",
             "이 선집은 몽골 작가들의 짧은 산문을 새로운 독자를 위해 영어로 소개하며, 번역할 수 없었던 — 어쩌면 번역하지 말아야 했던 — 단어들에 대한 주석을 함께 담았습니다."],
        zh: ["每一次翻译，都是往返于两个家园之间的旅程。有些词语轻易便能远行；另一些则不愿离开，需要被小心携带、加以解释，或只是以原本的样子被珍爱。",
             "这部选集收录蒙古作家的短篇散文，以英文呈现给新的读者，并附上关于那些无法翻译——或许也不应翻译——的词语的注释。"]
      }
    },
    {
      slug: "the-new-nomads", section: "articles", sub: "culture", date: "2026-10-10", read: 7, image: "",
      title:   { en: "The New Nomads: Culture Without Borders", mn: "Шинэ нүүдэлчид: Хил хязгааргүй соёл", ko: "새로운 유목민: 경계 없는 문화", zh: "新游牧者：无国界的文化" },
      excerpt: { en: "How a generation raised between countries is redefining home, identity and belonging.",
                 mn: "Улс орнуудын хооронд өссөн үе гэр, өвөрмөц байдал, харьяалагдах мэдрэмжийг хэрхэн шинээр тодорхойлж байна вэ.",
                 ko: "여러 나라 사이에서 자란 세대가 집과 정체성, 소속감을 어떻게 다시 정의하고 있는가.",
                 zh: "在不同国家之间成长的一代人，如何重新定义家园、身份与归属。" },
      body: {
        en: ["For centuries, Mongolian life moved with the seasons. Today a new kind of movement shapes a generation: studying in Seoul, working in Beijing, writing in English, dreaming in Mongolian.",
             "Home, for them, is no longer a single place. It is a set of habits, a language spoken at the dinner table, a song that still makes them stop — wherever they happen to be."],
        mn: ["Олон зууны турш монголчуудын амьдрал улирлыг дагаж нүүдэллэсээр ирсэн. Өнөөдөр шинэ төрлийн нүүдэл нэгэн үеийг бүрдүүлж байна: Сөүлд суралцаж, Бээжинд ажиллаж, англиар бичиж, монголоор зүүдэлдэг.",
             "Тэдний хувьд гэр гэдэг нэг газар биш болжээ. Энэ нь зуршил, оройн ширээний ард ярьдаг хэл, хаана ч байсан тэднийг зогсоодог нэгэн дуу юм."],
        ko: ["수 세기 동안 몽골의 삶은 계절을 따라 움직였습니다. 오늘날에는 새로운 이동이 한 세대를 만들고 있습니다. 서울에서 공부하고, 베이징에서 일하고, 영어로 글을 쓰고, 몽골어로 꿈을 꾸는 세대입니다.",
             "그들에게 집은 더 이상 한 장소가 아닙니다. 습관이자, 저녁 식탁에서 쓰는 언어이며, 어디에 있든 걸음을 멈추게 하는 노래입니다."],
        zh: ["几个世纪以来，蒙古人的生活随季节迁徙。如今，一种新的迁徙正在塑造一代人：在首尔求学，在北京工作，用英文写作，用蒙古语做梦。",
             "对他们而言，家不再是一个地方。它是一些习惯，是餐桌上说的语言，是一首无论身在何处都会让他们停下脚步的歌。"]
      }
    },
    {
      slug: "quiet-leadership", section: "articles", sub: "business", date: "2026-09-14", read: 5, image: "",
      title:   { en: "Quiet Leadership", mn: "Нам гүм манлайлал", ko: "조용한 리더십", zh: "安静的领导力" },
      excerpt: { en: "The people who change organisations most are not always the loudest voices in the room.",
                 mn: "Байгууллагыг хамгийн их өөрчилдөг хүмүүс өрөөн дэх хамгийн чанга дуу хоолой байх албагүй.",
                 ko: "조직을 가장 크게 바꾸는 사람이 언제나 가장 큰 목소리를 내는 사람은 아닙니다.",
                 zh: "最能改变一个组织的人，未必是会议室里声音最大的那一位。" },
      body: {
        en: ["We have long confused leadership with volume — the speech, the stage, the confident answer. Yet many of the most trusted leaders work differently: they listen longer, decide carefully and let others take the light.",
             "Quiet leadership is not the absence of ambition. It is ambition with patience — a belief that culture is built in small moments, and that respect is earned in rooms where no one is watching."],
        mn: ["Бид манлайллыг чанга дуу — илтгэл, тайз, итгэлтэй хариулттай удаан хольж ирсэн. Гэвч хамгийн их итгэл хүлээсэн удирдагчдын олонх нь өөрөөр ажилладаг: удаан сонсож, болгоомжтой шийдэж, бусдад гэрлийг үлдээдэг.",
             "Нам гүм манлайлал бол амбицгүй байдал биш. Энэ бол тэвчээртэй амбиц — соёл жижиг мөчүүдээр бүтдэг, хүндлэл хэн ч харахгүй байгаа газарт олддог гэсэн итгэл юм."],
        ko: ["우리는 오랫동안 리더십을 목소리의 크기와 혼동해 왔습니다 — 연설, 무대, 자신감 있는 대답. 그러나 가장 신뢰받는 리더들 중 많은 이들은 다르게 일합니다. 더 오래 듣고, 신중하게 결정하며, 빛을 다른 이들에게 양보합니다.",
             "조용한 리더십은 야망이 없는 것이 아닙니다. 그것은 인내를 품은 야망입니다 — 문화는 작은 순간들로 만들어지고, 존중은 아무도 보지 않는 곳에서 얻어진다는 믿음입니다."],
        zh: ["长久以来，我们把领导力与音量混为一谈——演讲、舞台、自信的回答。然而许多最受信任的领导者却另有方式：他们倾听更久，决策更谨慎，把光留给别人。",
             "安静的领导力并非没有雄心。它是带着耐心的雄心——相信文化建立在细小的时刻里，尊重是在无人注视之处赢得的。"]
      }
    },
    {
      slug: "a-second-look-at-first-impressions", section: "articles", sub: "psychology", date: "2026-08-22", read: 6, image: "",
      title:   { en: "A Second Look at First Impressions", mn: "Анхны сэтгэгдэлд дахин нэг харц", ko: "첫인상, 다시 보기", zh: "再看一眼第一印象" },
      excerpt: { en: "What we notice when we meet someone new — and why first impressions deserve a second look.",
                 mn: "Шинэ хүнтэй танилцахдаа бид юуг анзаардаг вэ — анхны сэтгэгдэл яагаад дахин нэг харц шаарддаг вэ.",
                 ko: "새로운 사람을 만날 때 우리는 무엇을 보는가 — 그리고 왜 첫인상은 다시 볼 가치가 있는가.",
                 zh: "初次见面时我们注意到了什么——以及为什么第一印象值得再看一眼。" },
      body: {
        en: ["Within moments of meeting someone, the mind has already written a short story: who they are, what they want, whether they can be trusted. It is fast, efficient — and often wrong.",
             "Psychologists describe these quick judgements as shortcuts, useful in a world full of strangers. The art is to notice them, hold them lightly, and leave room for the person to surprise us."],
        mn: ["Хэн нэгэнтэй танилцсанаас хэдхэн хормын дотор оюун ухаан маань нэгэн богино түүхийг бичээд амжсан байдаг: тэр хэн бэ, юу хүсэж байна, түүнд итгэж болох уу. Энэ нь хурдан, үр ашигтай — бас ихэнхдээ буруу.",
             "Сэтгэл судлаачид ийм хурдан дүгнэлтийг танихгүй хүмүүсээр дүүрэн ертөнцөд хэрэгтэй товчлол гэж тайлбарладаг. Гол ур чадвар нь тэднийг анзаарч, хөнгөхөн барьж, тухайн хүнд биднийг гайхшруулах зай үлдээх явдал юм."],
        ko: ["누군가를 만난 지 몇 순간 만에 우리의 마음은 이미 짧은 이야기를 써 버립니다. 그가 누구인지, 무엇을 원하는지, 믿을 수 있는 사람인지. 빠르고 효율적이지만 — 자주 틀립니다.",
             "심리학자들은 이런 빠른 판단을 낯선 사람으로 가득한 세상에서 유용한 지름길이라고 설명합니다. 중요한 것은 그것을 알아차리고, 가볍게 쥐고, 상대가 우리를 놀라게 할 여지를 남겨두는 것입니다."],
        zh: ["与人相识的片刻之间，大脑已经写好了一个短篇故事：他是谁，想要什么，是否值得信任。它迅速、高效——却常常是错的。",
             "心理学家把这些快速判断描述为捷径，在充满陌生人的世界里十分有用。真正的艺术在于察觉它们，轻轻地握住，并为对方留下让我们惊喜的余地。"]
      }
    },
    {
      slug: "mongolian-designers-to-know", section: "style", sub: "fashion", date: "2026-10-02", read: 6, image: "",
      title:   { en: "Mongolian Designers to Know", mn: "Таны мэдэх ёстой монгол дизайнерууд", ko: "주목해야 할 몽골 디자이너", zh: "值得关注的蒙古设计师" },
      excerpt: { en: "Cashmere, craft and a contemporary eye — the new wave of Mongolian design.",
                 mn: "Ноолуур, гар урлал, орчин үеийн харц — монгол дизайны шинэ давалгаа.",
                 ko: "캐시미어, 장인정신, 그리고 동시대적 시선 — 몽골 디자인의 새로운 물결.",
                 zh: "羊绒、手工艺与当代视野——蒙古设计的新浪潮。" },
      body: {
        en: ["Mongolian fashion has always begun with material: cashmere, wool, felt and leather shaped by a climate that forgives nothing. A new generation of designers is honouring that heritage while speaking a global language.",
             "Their collections are quiet, precise and made to last. In this series, we visit their studios to ask what luxury means when it is rooted in a landscape rather than a logo."],
        mn: ["Монгол загвар үргэлж материалаас эхэлдэг: юуг ч уучилдаггүй уур амьсгалд хэлбэржсэн ноолуур, ноос, эсгий, арьс. Шинэ үеийн дизайнерууд энэ өвийг хүндэтгэхийн зэрэгцээ дэлхийн хэлээр ярьж байна.",
             "Тэдний цуглуулгууд нам гүм, нарийн, удаан эдлэхээр бүтээгдсэн. Энэ цувралаар бид тэдний урланд зочилж, лого бус газар нутагт үндэслэсэн тансаг байдал юу гэсэн үг болохыг асууна."],
        ko: ["몽골 패션은 언제나 소재에서 시작되었습니다. 어떤 것도 용서하지 않는 기후 속에서 다듬어진 캐시미어, 울, 펠트, 가죽. 새로운 세대의 디자이너들은 그 유산을 존중하면서 세계의 언어로 말하고 있습니다.",
             "그들의 컬렉션은 조용하고, 정교하며, 오래 입도록 만들어집니다. 이 시리즈에서 우리는 그들의 스튜디오를 찾아, 로고가 아닌 풍경에 뿌리내린 럭셔리가 무엇을 의미하는지 묻습니다."],
        zh: ["蒙古时尚始终从材料开始：在毫不宽容的气候中塑造而成的羊绒、羊毛、毛毡与皮革。新一代设计师在致敬这份传承的同时，也在讲述一种全球通用的语言。",
             "他们的系列安静、精准，经久耐穿。在这个系列中，我们走进他们的工作室，探问：当奢华扎根于一片土地而非一个标志时，它意味着什么。"]
      }
    },
    {
      slug: "the-art-of-the-office-wardrobe", section: "style", sub: "styling", date: "2026-09-06", read: 5, image: "",
      title:   { en: "The Art of the Office Wardrobe", mn: "Албан хувцасны урлаг", ko: "오피스 워드로브의 기술", zh: "职场衣橱的艺术" },
      excerpt: { en: "Building a professional wardrobe that feels like you — fewer pieces, better choices.",
                 mn: "Өөрт тань тохирсон албан хувцасны шүүгээ бүрдүүлэх нь — цөөн хувцас, зөв сонголт.",
                 ko: "나다운 오피스 워드로브 만들기 — 더 적은 옷, 더 나은 선택.",
                 zh: "打造一个真正属于你的职场衣橱——更少的单品，更好的选择。" },
      body: {
        en: ["A good office wardrobe is not a uniform. It is a small, considered collection of pieces that work together: a jacket that fits the shoulders, trousers that move, a shirt you reach for without thinking.",
             "Begin with neutrals you love, add one colour that belongs to you, and invest in tailoring. The goal is not to impress the room — it is to forget your clothes and focus on your work."],
        mn: ["Сайн албан хувцасны шүүгээ бол дүрэмт хувцас биш. Энэ нь хоорондоо зохицох, нямбай сонгосон цөөн хувцасны цуглуулга юм: мөрөнд тань таарсан пиджак, хөдөлгөөнд саадгүй өмд, бодолгүйгээр гараа сунгадаг цамц.",
             "Дуртай саармаг өнгөнөөсөө эхэлж, өөрт тань хамаарах нэг өнгө нэмж, оёдлын чанарт хөрөнгө оруул. Зорилго нь бусдыг гайхшруулах биш — хувцсаа мартаж, ажилдаа анхаарах явдал юм."],
        ko: ["좋은 오피스 워드로브는 유니폼이 아닙니다. 서로 잘 어울리는, 신중하게 고른 작은 컬렉션입니다. 어깨에 꼭 맞는 재킷, 편하게 움직이는 팬츠, 생각 없이도 손이 가는 셔츠.",
             "좋아하는 뉴트럴 컬러에서 시작해, 나만의 색 하나를 더하고, 테일러링에 투자하세요. 목표는 사람들을 감탄시키는 것이 아니라 — 옷을 잊고 일에 집중하는 것입니다."],
        zh: ["好的职场衣橱并不是一套制服。它是一小组经过深思熟虑、彼此协调的单品：一件肩线合身的外套，一条行动自如的长裤，一件你无需思考就会伸手去拿的衬衫。",
             "从你喜爱的中性色开始，加入一种属于你的颜色，并在剪裁上投资。目标不是惊艳全场——而是忘记衣服，专注于工作。"]
      }
    },
    {
      slug: "what-your-colours-say", section: "style", sub: "colour", date: "2026-07-19", read: 5, image: "",
      title:   { en: "What Your Colours Say Before You Speak", mn: "Таныг ярихаас өмнө өнгө юу хэлдэг вэ", ko: "말하기 전에 색이 먼저 말하는 것", zh: "在你开口之前，色彩已先说话" },
      excerpt: { en: "An introduction to colour psychology — how tone, shade and contrast shape the way we are seen.",
                 mn: "Өнгөний сэтгэл зүйн танилцуулга — өнгө, туяа, контраст биднийг хэрхэн харагдуулдаг вэ.",
                 ko: "컬러 심리학 입문 — 톤, 명도, 대비가 우리가 보이는 방식을 어떻게 바꾸는가.",
                 zh: "色彩心理学入门——色调、明暗与对比如何影响别人眼中的你。" },
      body: {
        en: ["Colour reaches people before words do. Deep navy suggests calm authority; warm camel feels approachable; a single note of red draws the eye and holds it.",
             "Colour psychology is not a set of rules, but a vocabulary. Once you understand it, you can choose what to say — and say it quietly, through the colours you wear every day."],
        mn: ["Өнгө үгнээс өмнө хүмүүст хүрдэг. Гүн хөх өнгө тайван эрх мэдлийг илэрхийлж, дулаан тэмээн шар өнгө ойр дотно мэдрэмж төрүүлж, ганцхан улаан өнгө харцыг татаж барьдаг.",
             "Өнгөний сэтгэл зүй бол дүрмийн жагсаалт биш, харин үгсийн сан юм. Түүнийг ойлгосноор та юу хэлэхээ сонгож — өдөр бүр өмсөх өнгөөрөө чимээгүйхэн илэрхийлж чадна."],
        ko: ["색은 말보다 먼저 사람에게 닿습니다. 깊은 네이비는 차분한 권위를, 따뜻한 카멜은 다가가기 쉬운 인상을 줍니다. 단 하나의 붉은 포인트는 시선을 끌어 붙잡습니다.",
             "컬러 심리학은 규칙의 목록이 아니라 하나의 어휘입니다. 그것을 이해하면 무엇을 말할지 선택할 수 있고 — 매일 입는 색으로 조용히 말할 수 있습니다."],
        zh: ["色彩比语言更早抵达人心。深海军蓝传递沉静的权威；温暖的驼色令人亲近；一抹红色则能吸引并留住目光。",
             "色彩心理学不是一套规则，而是一种词汇。一旦理解了它，你便可以选择要表达什么——并通过每天穿着的颜色，安静地表达出来。"]
      }
    },
    {
      slug: "on-silence-and-sound", section: "interviews", sub: "artists", date: "2026-10-25", read: 9, image: "",
      title:   { en: "On Silence and Sound", mn: "Нам гүм ба дууны тухай", ko: "침묵과 소리에 대하여", zh: "关于寂静与声音" },
      excerpt: { en: "A conversation with a musician about the spaces between notes — and the courage to leave them empty.",
                 mn: "Ноотуудын хоорондох зай — мөн түүнийг хоосон орхих зоригийн тухай хөгжимчинтэй хийсэн ярилцлага.",
                 ko: "음과 음 사이의 공간, 그리고 그 공간을 비워둘 용기에 대해 한 음악가와 나눈 대화.",
                 zh: "与一位音乐人的对话：关于音符之间的空白，以及让它保持空白的勇气。" },
      body: {
        en: ["“People think music is about the notes,” she says, turning a cup of tea slowly in her hands. “But the feeling lives in the pauses. That is where the listener breathes with you.”",
             "We spoke about her first instrument, the years of practice no one sees, and why the most important thing an artist can protect is not talent, but attention."],
        mn: ["«Хүмүүс хөгжмийг ноотуудын тухай гэж боддог» гэж тэр гартаа цайны аягаа аажуухан эргүүлэнгээ хэлэв. «Гэвч мэдрэмж завсарлагад оршдог. Сонсогч тантай хамт амьсгалдаг газар нь тэр.»",
             "Бид түүний анхны хөгжмийн зэмсэг, хэн ч хардаггүй олон жилийн бэлтгэл, уран бүтээлчийн хамгийн чухал хамгаалах ёстой зүйл нь авьяас биш, анхаарал гэдгийн тухай ярилцлаа."],
        ko: ["“사람들은 음악이 음표에 관한 것이라고 생각해요.” 그녀가 찻잔을 천천히 돌리며 말한다. “하지만 감정은 쉼표에 살아요. 듣는 사람이 당신과 함께 숨 쉬는 곳이죠.”",
             "우리는 그녀의 첫 악기, 아무도 보지 못하는 수년간의 연습, 그리고 예술가가 지켜야 할 가장 중요한 것은 재능이 아니라 집중이라는 이야기를 나눴다."],
        zh: ["“人们以为音乐关乎音符，”她一边说，一边慢慢转动手中的茶杯，“但情感存在于停顿之中。那是听众与你一同呼吸的地方。”",
             "我们聊到她的第一件乐器，那些无人看见的练习岁月，以及为什么艺术家最需要守护的不是天赋，而是专注。"]
      }
    },
    {
      slug: "working-across-borders", section: "interviews", sub: "professionals", date: "2026-09-20", read: 7, image: "",
      title:   { en: "Working Across Borders", mn: "Хил дамнан ажиллах нь", ko: "국경을 넘어 일한다는 것", zh: "跨越国界的工作" },
      excerpt: { en: "International professionals on language, adaptation and finding their place in the world.",
                 mn: "Олон улсын мэргэжилтнүүд хэл, дасан зохицох, дэлхийд өөрийн байр сууриа олох тухай.",
                 ko: "언어, 적응, 그리고 세상 속 나의 자리를 찾는 일에 대한 국제 전문가들의 이야기.",
                 zh: "国际专业人士谈语言、适应，以及如何在世界中找到自己的位置。" },
      body: {
        en: ["Moving abroad for work is often described as a career decision. The professionals we spoke to describe it differently: as learning to be a beginner again — in language, in culture and sometimes in confidence.",
             "Their advice is surprisingly gentle. Learn the small words first. Ask for help early. And keep one ritual from home, because identity is easier to carry when it fits in a teacup."],
        mn: ["Гадаадад ажиллахаар явахыг ихэвчлэн карьерын шийдвэр гэж тайлбарладаг. Бидний ярилцсан мэргэжилтнүүд үүнийг өөрөөр тодорхойлдог: хэл, соёл, заримдаа өөртөө итгэх итгэлээрээ дахин эхлэгч болж сурах.",
             "Тэдний зөвлөгөө гайхмаар зөөлөн. Эхлээд жижиг үгсийг сур. Тусламжийг эрт хүс. Мөн гэрийнхээ нэгэн зан заншлыг хадгал, учир нь нэг аяга цайнд багтах үед өвөрмөц байдлаа авч явахад хялбар байдаг."],
        ko: ["해외로 일하러 떠나는 것은 흔히 커리어의 결정으로 묘사됩니다. 우리가 만난 전문가들은 다르게 말합니다. 언어에서, 문화에서, 때로는 자신감에서 다시 초보자가 되는 법을 배우는 일이라고.",
             "그들의 조언은 놀라울 만큼 부드럽습니다. 작은 단어부터 배우세요. 일찍 도움을 청하세요. 그리고 고향의 의식 하나를 지키세요. 찻잔 하나에 담길 수 있을 때, 정체성은 더 가볍게 지닐 수 있으니까요."],
        zh: ["出国工作常被描述为一个职业决定。我们采访的专业人士却有不同的说法：那是重新学习做一个初学者——在语言上，在文化上，有时也在自信上。",
             "他们的建议出奇地温和。先学会那些小小的词语。早一点寻求帮助。保留一个来自家乡的习惯——因为当身份能装进一只茶杯时，它便更容易随身携带。"]
      }
    },
    {
      slug: "building-something-lasting", section: "interviews", sub: "entrepreneurs", date: "2026-08-08", read: 8, image: "",
      title:   { en: "Building Something Lasting", mn: "Удаан оршин тогтнох зүйлийг бүтээх нь", ko: "오래 남는 것을 만든다는 것", zh: "打造长久之物" },
      excerpt: { en: "Conversations with founders on patience, risk and the long road to meaningful work.",
                 mn: "Тэвчээр, эрсдэл, утга учиртай ажлын урт замын тухай үүсгэн байгуулагчидтай хийсэн ярилцлагууд.",
                 ko: "인내와 위험, 그리고 의미 있는 일을 향한 긴 여정에 대해 창업가들과 나눈 대화.",
                 zh: "与创业者对话：关于耐心、风险，以及通往有意义工作的漫长道路。" },
      body: {
        en: ["Every founder has a story about the beginning — the small room, the borrowed laptop, the first customer. Fewer talk about the middle, where most of the real work happens.",
             "In these conversations, entrepreneurs share what kept them going when growth was slow, which risks were worth taking, and how they learned to build companies that reflect who they are."],
        mn: ["Үүсгэн байгуулагч бүр эхлэлийн тухай түүхтэй — жижигхэн өрөө, зээлсэн зөөврийн компьютер, анхны үйлчлүүлэгч. Харин жинхэнэ ажлын ихэнх нь өрнөдөг дунд үеийн тухай цөөхөн нь ярьдаг.",
             "Эдгээр ярилцлагаар бизнес эрхлэгчид өсөлт удаан байхад юу тэднийг урагшлуулсан, ямар эрсдэл үнэ цэнэтэй байсан, өөрсдийгөө тусгасан компанийг хэрхэн бүтээж сурсан тухайгаа хуваалцана."],
        ko: ["모든 창업가에게는 시작에 관한 이야기가 있습니다. 작은 방, 빌린 노트북, 첫 번째 고객. 하지만 진짜 일이 대부분 일어나는 ‘중간’에 대해 이야기하는 사람은 많지 않습니다.",
             "이 대화에서 창업가들은 성장이 더딜 때 무엇이 그들을 버티게 했는지, 어떤 위험이 감수할 가치가 있었는지, 그리고 자신을 닮은 회사를 만드는 법을 어떻게 배웠는지 들려줍니다."],
        zh: ["每一位创业者都有一个关于起点的故事——小小的房间，借来的电脑，第一位客户。却很少有人谈论中间阶段，而真正的工作大多发生在那里。",
             "在这些对话中，创业者们分享了在增长缓慢时是什么支撑着他们，哪些风险值得承担，以及他们如何学会打造能体现自我的公司。"]
      }
    }
  ]
};
