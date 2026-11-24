/**
 * 9-sinf Fizika — I bob. Modda tuzilishining molekulyar-kinetik nazariyasi asoslari (1–10-§)
 * Manba: Fizika. 9-sinf darsligi (G‘afur G‘ulom nashriyoti, 2019), 4–35-betlar.
 * Matnlar o‘quvchiga sodda qilib, o‘z so‘zimiz bilan berilgan.
 *
 * Fizikaga xos slayd maydonlari: calc, sim, lab, experiment (app/fizika/lab.jsx).
 * Fizikaga xos o‘yin: units — «Birlik o‘tkazish» (Test formatida, to‘g‘ri javob — 0-variant).
 */

const Q = (q, options) => ({ q, options, answer: 0 });
const NA = 6.02e23;
const R = 8.31;
const K = 1.38e-23;

const SRC = 'I bob. Molekulyar-kinetik nazariya';

/* ---------- 1-§ ---------- */
const F1 = {
  id: 'fz9-01',
  source: `${SRC} • 1-§ • 4–7-betlar`,
  title: 'Modda tuzilishining molekulyar-kinetik nazariyasi',
  short: 'Uchta asosiy qoida, Broun harakati, diffuziya',
  theme: { emoji: '⚛️', grad: 'from-blue-900 via-indigo-700 to-sky-500', border: 'border-sky-200', tag: 'Fizika • 9-sinf • 1-§' },
  lesson: [
    {
      title: 'Bugun nimani bilib olamiz?',
      emoji: '🔍',
      text: 'Stol, suv, havo — hammasi ko‘zga ko‘rinmaydigan juda mayda zarralardan iborat. Bu zarralar hech qachon tinch turmaydi. Bugun buni isbotlaydigan tajribalar bilan tanishamiz.',
      vs: {
        q: 'Siz qanday o‘ylaysiz?',
        a: { t: 'Tosh ichidagi zarralar ham harakatlanadi', pts: ['hamma narsa harakatda', 'faqat ko‘rinmaydi'] },
        b: { t: 'Qattiq jism ichida harakat yo‘q', pts: ['tosh qimirlamaydi-ku', 'zarralar qotib qolgan'] },
      },
    },
    {
      title: 'Atom so‘zi qayerdan kelgan?',
      emoji: '🏛️',
      text: 'Miloddan oldingi V–IV asrlarda yashagan yunon faylasufi Demokrit «barcha moddalar juda kichik zarralardan tuzilgan» degan fikrni aytgan. U eng kichik, bo‘linmaydigan zarrani atom deb atagan.',
      rule: 'Moddaning tuzilishi va xossalarini molekulalarning harakati hamda ular orasidagi o‘zaro ta’sir kuchlari bilan tushuntiradigan nazariya — molekulyar-kinetik nazariya (MKN).',
      ruleLabel: 'Ta’rif',
      cards: [
        { e: '🔬', t: 'D. Dalton, J. Maksvell', d: 'ingliz olimlari' },
        { e: '🧪', t: 'M. Lomonosov, D. Mendeleyev', d: 'rus olimlari' },
        { e: '📐', t: 'A. Avogadro, L. Bolsman, O. Shtern', d: 'italyan, avstriya va nemis olimlari' },
      ],
    },
    {
      title: 'MKN ning uchta asosiy qoidasi',
      emoji: '3️⃣',
      steps: [
        { e: '1', t: 'Moddalar zarralardan tuzilgan', d: 'Har qanday modda atom va molekulalardan iborat.' },
        { e: '2', t: 'Zarralar to‘xtovsiz va tartibsiz harakatlanadi', d: 'Ular hech qachon to‘xtamaydi, yo‘nalishini doim o‘zgartiradi.' },
        { e: '3', t: 'Zarralar bir-birini tortadi va itaradi', d: 'Yaqinlashsa — itariladi, uzoqlashsa — tortiladi.' },
      ],
      note: 'Bu uchala qoida tajribalarda isbotlangan. Keyingi slaydlarda shu isbotlarni ko‘ramiz.',
    },
    {
      title: 'Isbot 1: atir hidi va choydagi sut',
      emoji: '🌸',
      cards: [
        { e: '🌸', t: 'Atir hidi', d: 'Xonaning bir chetida atir sepilsa, hidi boshqa chetiga ham yetib boradi. Atir molekulalari havo molekulalari orasida tartibsiz harakatlanib tarqaladi.' },
        { e: '🥛', t: 'Suv va sut', d: 'Stakandagi suvga bir qoshiq sut quysak, ular darhol emas, asta-sekin aralashadi. Demak, zarralar harakatlanadi va bir-biriga urilib boradi.' },
        { e: '🥇', t: 'Oltin va qo‘rg‘oshin', d: 'Ustma-ust qo‘yilib, ustiga og‘ir yuk bosilgan oltin va qo‘rg‘oshin plastinkalar 5 yildan keyin bir-biriga yopishib qolgan. Atomlar bir-birining ichiga taxminan 1 mm kirib borgan!' },
      ],
      rule: 'Bir moddaning zarralari ikkinchi modda zarralari orasiga o‘z-o‘zidan kirib borishi — diffuziya.',
      ruleLabel: 'Esda tuting',
    },
    {
      title: 'Simulyatsiya: aralashish qanday bo‘ladi?',
      emoji: '⚪',
      text: 'Oq va qora sharchalar — ikki xil modda molekulalari. To‘siqni olib tashlang va kuzating. Keyin haroratni oshirib, tajribani qaytaring.',
      sim: { kind: 'diffusion' },
      reveal: [
        { q: 'Harorat oshsa, aralashish tezlashadimi?', a: 'Ha. Issiqda molekulalar tezroq harakatlanadi, shuning uchun moddalar tezroq aralashadi.' },
        { q: 'Nega qattiq jismlarda diffuziya juda sekin?', a: 'Qattiq jism zarralari bir-biriga kuchli tortiladi va joyidan siljishi qiyin.' },
      ],
    },
    {
      title: 'Isbot 2: Broun harakati',
      emoji: '🔬',
      text: '1827-yilda ingliz botanigi Robert Broun suv ustiga gul changini sepib, mikroskopda qaradi. Chang zarralari to‘xtovsiz va tartibsiz «raqsga tushardi». Broun avval ularni tirik jonzot deb o‘ylagan.',
      rule: 'Suyuqlik yoki gazda muallaq turgan zarraning to‘xtovsiz, tartibsiz harakati — Broun harakati. Unga sabab — atrofdagi molekulalarning zarraga turli tomondan notekis urilishi.',
      ruleLabel: 'Ta’rif',
      facts: [
        { n: '1827', l: 'Broun kuzatgan yil' },
        { n: '1905', l: 'Eynshteyn nazariyasi' },
        { n: '1926', l: 'Perrenga Nobel mukofoti' },
      ],
    },
    {
      title: 'Simulyatsiya: Broun zarrasi',
      emoji: '🟡',
      text: 'Sariq shar — gul changi. Uni ko‘k nuqtalar — suv molekulalari turtib yuribdi. Qizil chiziq — zarraning yo‘li (siniq chiziq). Avval molekulalarni yashirib ko‘ring: mikroskopda xuddi shunday ko‘rinadi.',
      sim: { kind: 'brown' },
      list: [
        'Haroratni oshiring — zarra tezroq harakatlanadi.',
        '«Katta zarra» tugmasini bosing — katta zarra deyarli qimirlamaydi.',
        'Xulosa: Broun harakati zarraning o‘lchamiga va haroratga bog‘liq.',
      ],
    },
    {
      title: 'Uyda tajriba: havodagi chang',
      emoji: '🔦',
      experiment: {
        home: true,
        t: 'Nur yo‘lidagi chang zarralari',
        need: ['fonar (yoki telefon chirog‘i)', 'qorong‘i xona', 'mato (sochiq)'],
        steps: ['Xonani qorong‘i qiling.', 'Fonar nurini xona bo‘ylab yo‘naltiring.', 'Nur yo‘lida matoni silkiting.', 'Nur ichidagi chang zarralarini kuzating.'],
        predict: { q: 'Chang zarralari qanday harakatlanadi?', opts: ['To‘xtovsiz va tartibsiz', 'Faqat pastga tushadi', 'Umuman qimirlamaydi'], a: 0 },
        result: 'Chang zarralari to‘xtovsiz va tartibsiz harakatlanadi.',
        why: 'Ularni havo molekulalari har tomondan urib turadi. Bu ham Broun harakatiga o‘xshash hodisa.',
      },
    },
    {
      title: 'Sinfda tajriba: sovuq va issiq suvda choy',
      emoji: '🍵',
      experiment: {
        t: 'Qaysi stakanda tez bo‘yaladi?',
        need: ['2 ta shaffof stakan', 'sovuq suv', 'issiq suv', 'choy xaltachasi yoki siyoh'],
        steps: ['Stakanlarning biriga sovuq, ikkinchisiga issiq suv quying.', 'Ikkalasiga bir vaqtda choy xaltachasi (yoki bir tomchi siyoh) tushiring.', 'Rangning tarqalishini 2–3 daqiqa kuzating.'],
        predict: { q: 'Qaysi stakanda suv tezroq bo‘yaladi?', opts: ['Issiq suvda', 'Sovuq suvda', 'Bir xil'], a: 0 },
        result: 'Issiq suv ancha tez bo‘yaladi.',
        why: 'Harorat qancha yuqori bo‘lsa, molekulalar shuncha tez harakatlanadi va diffuziya tezlashadi.',
        safety: 'Issiq suv bilan ehtiyot bo‘ling — uni faqat o‘qituvchi quysin.',
      },
    },
    {
      title: 'Virtual laboratoriya: diffuziya tezligi',
      emoji: '🧪',
      lab: {
        kind: 'diffusionTime',
        title: 'Diffuziya tezligining haroratga bog‘liqligi',
        goal: 'Turli haroratdagi suvda siyoh qancha vaqtda bir tekis tarqalishini o‘lchash.',
        tools: [
          { e: '🥛', n: 'Shisha stakan', ok: true, why: 'suv solinadi' },
          { e: '🌡️', n: 'Termometr', ok: true, why: 'suv haroratini o‘lchaydi' },
          { e: '⏱️', n: 'Sekundomer', ok: true, why: 'vaqtni o‘lchaydi' },
          { e: '💧', n: 'Siyoh va tomizg‘ich', ok: true, why: 'bo‘yovchi modda' },
          { e: '⚖️', n: 'Tarozi', ok: false, why: 'massa kerak emas' },
          { e: '🧲', n: 'Magnit', ok: false, why: 'magnit maydon kerak emas' },
          { e: '🔋', n: 'Batareya', ok: false, why: 'elektr toki kerak emas' },
          { e: '📏', n: 'Chizg‘ich', ok: false, why: 'uzunlik o‘lchanmaydi' },
        ],
        steps: ['Suv haroratini tanlang.', '«Siyoh tomizish» tugmasini bosing.', 'Rang bir tekis bo‘lganda to‘xtating.', 'Kamida 3 xil haroratda takrorlang.'],
        temps: [10, 25, 40, 60, 80],
        cols: [{ k: 'tc', l: 'Suv harorati, °C', f: (r) => `${r.tc}` }, { k: 'time', l: 'Aralashish vaqti, s', f: (r) => String(r.time).replace('.', ',') }],
        graph: { title: 'Aralashish vaqti va harorat', x: { k: 'tc', l: 'harorat, °C', max: 80 }, ys: [{ k: 'time', l: 'vaqt, s' }] },
        minRows: 3,
        questions: [
          { q: 'Qaysi haroratda siyoh eng tez tarqaldi?', a: 'Eng issiq suvda.' },
          { q: 'Grafik qanday ko‘rinishda bo‘ldi?', a: 'Harorat ortishi bilan vaqt kamayib boradi.' },
          { q: 'Bunga sabab nima?', a: 'Issiq suvda molekulalar tezroq harakatlanadi.' },
          { q: 'Nega har safar natija biroz farq qiladi?', a: 'Har qanday o‘lchashda kichik xatolik bo‘ladi, shuning uchun tajriba bir necha marta takrorlanadi.' },
        ],
        conclusion: 'Harorat qancha yuqori bo‘lsa, diffuziya shuncha tez bo‘ladi. Bu molekulalarning tezligi haroratga bog‘liqligini ko‘rsatadi.',
      },
    },
    {
      title: 'Mustahkamlash',
      emoji: '🧠',
      reveal: [
        { q: 'Plastilin bo‘laklarini yopishtirsa bo‘ladi, singan qalamni esa yo‘q. Nega?', a: 'Plastilin bo‘laklarini molekulalar bir-birini tortadigan masofaga yaqinlashtirish mumkin. Qalam bo‘laklarini esa bunday yaqinlashtirib bo‘lmaydi.' },
        { q: 'Qattiq jism zarralari ham harakatlansa, nega u sochilib ketmaydi?', a: 'Zarralar orasidagi tortishish kuchi kuchli. Ular faqat o‘z joyi atrofida tebranadi.' },
      ],
      mission: { t: 'Uyga vazifa', d: 'Darslikdagi 1-mavzu savollariga javob yozing va uyda «chang zarralari» tajribasini bajaring. Xulosangizni daftarga yozing.', sec: 0 },
    },
  ],
  pairs: [
    ['Demokrit', 'atom tushunchasini kiritgan'],
    ['Broun', 'gul changi harakatini kuzatgan'],
    ['Eynshteyn', 'Broun harakati nazariyasi (1905)'],
    ['Perren', 'molekulalar borligini tajribada isbotladi'],
    ['diffuziya', 'moddalarning o‘z-o‘zidan aralashishi'],
    ['xaotik', 'tartibsiz'],
    ['MKN', 'molekulyar-kinetik nazariya'],
  ],
  quiz: [
    Q('MKN nechta asosiy qoidaga asoslanadi?', ['3 ta', '2 ta', '4 ta', '5 ta']),
    Q('Broun harakatini kim kuzatgan?', ['Robert Broun', 'Albert Eynshteyn', 'Jan Perren', 'Demokrit']),
    Q('Broun harakatiga sabab nima?', ['molekulalarning zarraga notekis urilishi', 'zarraning tirikligi', 'shamol', 'Yerning tortishi']),
    Q('Qaysi hodisa diffuziyaga misol?', ['atir hidining tarqalishi', 'toshning tushishi', 'suvning muzlashi', 'chiroqning yonishi']),
    Q('Harorat oshsa, diffuziya qanday o‘zgaradi?', ['tezlashadi', 'sekinlashadi', 'o‘zgarmaydi', 'to‘xtaydi']),
    Q('«Xaotik» so‘zining ma’nosi?', ['tartibsiz', 'tez', 'sekin', 'aylanma']),
    Q('Oltin va qo‘rg‘oshin atomlari 5 yilda qancha chuqurlikka kirgan?', ['taxminan 1 mm', '1 m', '1 sm', 'umuman kirmagan']),
    Q('Qaysi zarra Broun harakatini yaqqolroq namoyon qiladi?', ['kichikroq zarra', 'kattaroq zarra', 'har qanday tosh', 'og‘ir metall shar']),
  ],
  sort: {
    categories: ['Zarralar harakatini isbotlaydi', 'Bog‘liq emas'],
    items: [
      { text: 'atir hidining tarqalishi', cat: 0 }, { text: 'choyda shakar erishi', cat: 0 },
      { text: 'Broun harakati', cat: 0 }, { text: 'suvda siyoh tarqalishi', cat: 0 },
      { text: 'toshning pastga tushishi', cat: 1 }, { text: 'soyaning hosil bo‘lishi', cat: 1 },
      { text: 'magnitning temirni tortishi', cat: 1 }, { text: 'nurning ko‘zgudan qaytishi', cat: 1 },
    ],
  },
  qa: [
    { q: 'MKN ning uchta qoidasini ayting.', a: 'Modda zarralardan tuzilgan; zarralar to‘xtovsiz, tartibsiz harakatlanadi; zarralar o‘zaro tortishadi va itarishadi.' },
    { q: 'Diffuziya nima?', a: 'Bir modda zarralarining ikkinchi modda zarralari orasiga o‘z-o‘zidan kirib borishi.' },
    { q: 'Broun harakati nimani isbotlaydi?', a: 'Moddalar molekulalardan tuzilganini va ular tartibsiz harakatlanishini.' },
    { q: 'Nega atir hidi bir zumda emas, biroz vaqtdan keyin keladi?', a: 'Atir molekulalari yo‘lda havo molekulalariga ko‘p marta urilib, yo‘nalishini o‘zgartiradi.' },
    { q: 'Broun harakati zarraning o‘lchamiga bog‘liqmi?', a: 'Ha, zarra qancha kichik bo‘lsa, shuncha yaqqol harakatlanadi.' },
  ],
  odd: [
    { items: ['atir hidi', 'choyda qand erishi', 'siyoh tarqalishi', 'mayatnik tebranishi'], answer: 3, why: 'Mayatnik tebranishi diffuziya emas.' },
    { items: ['Demokrit', 'Broun', 'Perren', 'Pushkin'], answer: 3, why: 'Pushkin — shoir, qolganlari modda tuzilishini o‘rgangan olimlar.' },
    { items: ['tartibsiz', 'to‘xtovsiz', 'xaotik', 'to‘g‘ri chiziqli'], answer: 3, why: 'Molekulalar to‘g‘ri chiziq bo‘ylab tekis harakatlanmaydi.' },
  ],
  sequences: [
    { title: 'Broun kashfiyoti tarixi', items: ['Demokrit atom haqida fikr aytdi', 'Broun gul changi harakatini kuzatdi (1827)', 'Eynshteyn nazariyani yaratdi (1905)', 'Perren Nobel mukofotini oldi (1926)'] },
  ],
  debate: [
    { claim: 'Diffuziya hayotimizda foydali hodisa', pro: 'Ovqat tuzlanadi, choy damlanadi, o‘pkada kislorod qonga o‘tadi.', con: 'Yomon hidlar, zaharli gazlar ham diffuziya orqali tarqaladi.' },
  ],
  creative: [
    { task: 'Molekula bo‘lib qoldingiz deb tasavvur qiling. Bir daqiqa davomida stakandagi «sayohatingiz» haqida gapirib bering.', time: 60 },
  ],
  units: [
    Q('1 mm = ? m', ['10⁻³ m', '10⁻² m', '10⁻⁶ m', '10³ m']),
    Q('1 mikrometr = ? m', ['10⁻⁶ m', '10⁻³ m', '10⁻⁹ m', '10⁻¹² m']),
    Q('1 nanometr = ? m', ['10⁻⁹ m', '10⁻⁶ m', '10⁻³ m', '10⁻¹² m']),
    Q('27 °C = ? K', ['300 K', '246 K', '27 K', '273 K']),
    Q('5 yil necha oyga teng?', ['60 oy', '50 oy', '12 oy', '365 oy']),
  ],
};

/* ---------- 2-§ ---------- */
const F2 = {
  id: 'fz9-02',
  source: `${SRC} • 2-§ • 7–12-betlar`,
  title: 'Molekulaning massasi va o‘lchami',
  short: 'Molekula, moy tomchisi usuli, massa atom birligi, nisbiy molekulyar massa',
  theme: { emoji: '🫒', grad: 'from-amber-700 via-orange-500 to-yellow-400', border: 'border-amber-200', tag: 'Fizika • 9-sinf • 2-§' },
  lesson: [
    {
      title: 'Molekula nima?',
      emoji: '💧',
      rule: 'Moddaning kimyoviy xossasini saqlab qoladigan eng kichik zarrasi — molekula.',
      ruleLabel: 'Ta’rif',
      cards: [
        { e: '🎈', t: 'Vodorod — H₂', d: '2 ta vodorod atomi' },
        { e: '🌬️', t: 'Kislorod — O₂', d: '2 ta kislorod atomi' },
        { e: '💧', t: 'Suv — H₂O', d: '2 ta vodorod va 1 ta kislorod atomi' },
      ],
      note: 'Metallar va inert gazlar tabiatda alohida atomlar holida uchraydi. Boshqa moddalarning molekulasi kamida 2 ta atomdan iborat.',
    },
    {
      title: 'Molekula qanchalik kichik?',
      emoji: '🍎',
      text: 'Molekulani hatto eng kuchli optik mikroskopda ham ko‘rib bo‘lmaydi. Uning kichikligini tasavvur qilish uchun taqqoslab ko‘ramiz.',
      cards: [
        { e: '🍎', t: 'Olma va Yer', d: 'Molekulani olmadek kattalashtirsak, olma xuddi shuncha marta kattalashtirilganda Yer sayyorasidek bo‘ladi.' },
        { e: '🧒', t: '100 000 km bo‘yli bola', d: 'Hamma narsa 10⁸ marta kattalashsa, bo‘yi 1 m bo‘lgan bola 100 000 km ga yetadi.' },
      ],
      facts: [
        { n: '10⁻¹⁰ m', l: 'atom radiusi taxminan' },
        { n: '2,3·10⁻¹⁰ m', l: 'vodorod molekulasi diametri' },
        { n: '3·10⁻¹⁰ m', l: 'suv molekulasi diametri' },
      ],
    },
    {
      title: 'Interaktiv: kichrayib boramiz',
      emoji: '🔎',
      text: 'Har bosganda o‘lcham 10 marta kichrayadi. Bola bo‘yidan atomgacha nechta qadam bor?',
      sim: { kind: 'scale' },
    },
    {
      title: 'Molekula o‘lchamini qanday aniqlash mumkin?',
      emoji: '🫒',
      text: 'Zaytun moyi tomchisi suv ustida yupqa parda bo‘lib yoyiladi. Eng yupqa holatda pardaning qalinligi bitta molekula diametriga teng deb olinadi.',
      steps: [
        { e: '💧', t: 'Tomchi hajmi', d: 'V = 1 mm³ = 10⁻⁹ m³' },
        { e: '🟡', t: 'Yoyilgan yuza', d: 'S ≈ 0,6 m²' },
        { e: '📏', t: 'Qalinlik', d: 'd = V / S = 10⁻⁹ m³ : 0,6 m² ≈ 1,7·10⁻⁹ m' },
      ],
      rule: 'd = V / S — moy qatlamining qalinligi (molekula diametri)',
      ruleLabel: 'Formula',
    },
    {
      title: 'Virtual laboratoriya: moy tomchisi',
      emoji: '🧪',
      lab: {
        kind: 'oilDrop',
        title: 'Molekula o‘lchamini moy tomchisi yordamida baholash',
        goal: 'Moy pardasining yuzini o‘lchab, zaytun moyi molekulasining diametrini hisoblash.',
        tools: [
          { e: '🫒', n: 'Zaytun moyi', ok: true, why: 'tekshiriladigan modda' },
          { e: '💉', n: 'Tomizg‘ich (pipetka)', ok: true, why: 'tomchi hajmini aniq beradi' },
          { e: '🛁', n: 'Suvli keng tog‘ora', ok: true, why: 'moy suv ustida yoyiladi' },
          { e: '🔲', n: 'Katakli to‘r', ok: true, why: 'yuzani sanash uchun' },
          { e: '🌡️', n: 'Termometr', ok: false, why: 'harorat o‘lchanmaydi' },
          { e: '🔋', n: 'Batareya', ok: false, why: 'tok kerak emas' },
          { e: '⏱️', n: 'Sekundomer', ok: false, why: 'vaqt o‘lchanmaydi' },
          { e: '🧲', n: 'Magnit', ok: false, why: 'bu tajribaga aloqasi yo‘q' },
        ],
        steps: ['Tomchi hajmini tanlang.', 'Tomchini suvga tomizing.', 'Moy yoyilib bo‘lgach, kataklarni sanang.', 'Natijani yozing. Boshqa hajmlarda takrorlang.'],
        cols: [
          { k: 'V', l: 'V, mm³', f: (r) => String(r.V).replace('.', ',') },
          { k: 'S', l: 'S, m²', d: 3 },
          { k: 'd', l: 'd = V/S, m', d: 2 },
        ],
        graph: {
          title: 'Pardaning yuzi tomchi hajmiga bog‘liq',
          x: { k: 'V', l: 'tomchi hajmi V, mm³', max: 2 },
          ys: [{ k: 'S', l: 'yuza S, m²' }],
          lines: false,
          theory: (x, rows) => { if (!rows.length) return NaN; const k = rows.reduce((s, r) => s + r.S / r.V, 0) / rows.length; return k * x; },
        },
        minRows: 3,
        questions: [
          { q: 'Tomchi hajmi 2 marta ortsa, parda yuzi qanday o‘zgaradi?', a: 'Taxminan 2 marta ortadi.' },
          { q: 'd ning qiymatlari bir-biriga yaqinmi?', a: 'Ha, hammasi taxminan 1,7·10⁻⁹ m atrofida.' },
          { q: 'Nega pardaning qalinligini molekula diametri deb hisoblaymiz?', a: 'Moy eng ko‘p yoyilganda bitta molekula qalinligidagi qatlam hosil bo‘ladi.' },
        ],
        conclusion: 'Zaytun moyi molekulasining diametri taxminan 1,7·10⁻⁹ m. Bu juda kichik o‘lcham — uni optik mikroskopda ko‘rib bo‘lmaydi.',
      },
    },
    {
      title: 'Atomlarni «ko‘radigan» mikroskop',
      emoji: '🖥️',
      text: '1980-yillarda IBM kompaniyasi xodimlari tunnel mikroskopini yaratdi. U tasvirni 100 million marta kattalashtiradi. Mualliflari G. Binnig va G. Rorer 1986-yilda Nobel mukofotini olgan.',
      facts: [
        { n: '10⁸', l: 'marta kattalashtiradi' },
        { n: '1,4·10⁻¹⁰ m', l: 'uglerod atomi diametri' },
        { n: '1986', l: 'Nobel mukofoti' },
      ],
    },
    {
      title: 'Molekulaning massasi',
      emoji: '⚖️',
      text: 'Suv molekulasining diametri d ≈ 3·10⁻¹⁰ m. Bitta molekula hajmi V₀ ≈ d³. 1 m³ suvda taxminan 3,7·10²⁸ ta molekula bor. 1 m³ suv massasi 1000 kg. Demak, bitta molekula massasi ≈ 1000 kg : 3,7·10²⁸ ≈ 2,7·10⁻²⁶ kg.',
      table: {
        head: ['Modda', 'Bitta zarra massasi'],
        rows: [
          ['Suv molekulasi', '≈ 3·10⁻²⁶ kg'],
          ['Kislorod molekulasi', '5,32·10⁻²⁶ kg'],
          ['Uglerod atomi', '1,992·10⁻²⁶ kg'],
          ['Simob atomi', '3,337·10⁻²⁵ kg'],
        ],
      },
      note: 'Bunday kichik massalarni tarozida o‘lchab bo‘lmaydi. Shuning uchun maxsus birlik kiritilgan.',
    },
    {
      title: 'Massa atom birligi (u)',
      emoji: '🧮',
      rule: '1 u = uglerod ¹²C atomi massasining 1/12 qismi ≈ 1,66·10⁻²⁷ kg',
      ruleLabel: 'Massa atom birligi',
      text: 'Nisbiy atom massa — atom massasi uglerod atomi massasining 1/12 qismidan necha marta katta ekanini ko‘rsatadi. U Mendeleyev jadvalida berilgan.',
      examples: ['H — 1', 'C — 12', 'N — 14', 'O — 16', 'Na — 23', 'Cl — 35,5'],
    },
    {
      title: 'Nisbiy molekulyar massa',
      emoji: '🧩',
      text: 'Molekulaning nisbiy massasini topish uchun uning tarkibidagi atomlarning nisbiy massalarini qo‘shamiz.',
      rule: 'Suv: Mr(H₂O) = 2·1 + 16 = 18 u',
      ruleLabel: 'Misol',
      sim: { kind: 'molar' },
    },
    {
      title: 'Masala yechish namunasi',
      emoji: '✍️',
      text: 'Bitta suv molekulasining massasi 3·10⁻²⁶ kg. 12 sm³ suvda nechta molekula bor?',
      steps: [
        { e: '1', t: 'Berilgan', d: 'm₀ = 3·10⁻²⁶ kg; V = 12 sm³ = 12·10⁻⁶ m³; ρ = 1000 kg/m³' },
        { e: '2', t: 'Suv massasi', d: 'm = ρ·V = 1000 · 12·10⁻⁶ = 0,012 kg' },
        { e: '3', t: 'Molekulalar soni', d: 'N = m / m₀ = 0,012 : 3·10⁻²⁶ = 4·10²³ ta' },
      ],
      calc: {
        items: [
          { name: 'N = m / m₀', formula: 'N = m / m₀', vars: [{ k: 'm', l: 'Modda massasi m', u: 'kg', v: '0,012' }, { k: 'm0', l: 'Bitta molekula massasi m₀', u: 'kg', v: '3·10^-26' }], out: { s: 'N', l: 'Molekulalar soni', u: 'ta' }, f: (x) => x.m / x.m0 },
          { name: 'd = V / S', formula: 'd = V / S', vars: [{ k: 'V', l: 'Moy hajmi V', u: 'm³', v: '10^-9' }, { k: 'S', l: 'Parda yuzi S', u: 'm²', v: '0,6' }], out: { s: 'd', l: 'Molekula diametri', u: 'm' }, f: (x) => x.V / x.S },
          { name: 'm = ρV', formula: 'm = ρ · V', vars: [{ k: 'r', l: 'Zichlik ρ', u: 'kg/m³', v: '1000' }, { k: 'V', l: 'Hajm V', u: 'm³', v: '12·10^-6' }], out: { s: 'm', l: 'Massa', u: 'kg' }, f: (x) => x.r * x.V },
        ],
      },
    },
    {
      title: 'O‘zingiz yeching',
      emoji: '🏆',
      reveal: [
        { q: '2,4 kg ko‘mirda nechta uglerod atomi bor? (m₀ = 2·10⁻²⁶ kg)', a: 'N = 2,4 : 2·10⁻²⁶ = 1,2·10²⁶ ta' },
        { q: '0,2 mm³ moy 0,8 m² parda hosil qildi. Molekula o‘lchami?', a: 'd = 0,2·10⁻⁹ : 0,8 = 2,5·10⁻¹⁰ m' },
        { q: '5 sm³ suvda nechta molekula bor? (m₀ = 3·10⁻²⁶ kg)', a: 'm = 5 g = 0,005 kg; N = 0,005 : 3·10⁻²⁶ ≈ 1,7·10²³ ta' },
        { q: 'Karbonat angidrid (CO₂) ning nisbiy molekulyar massasi?', a: 'Mr = 12 + 2·16 = 44 u' },
      ],
      mission: { t: 'Uyga vazifa', d: 'Darslikdagi 6-mashq jadvalini to‘ldiring: azot (N₂), ozon (O₃), osh tuzi (NaCl), metan (CH₄), karbonat angidrid (CO₂).', sec: 0 },
    },
  ],
  pairs: [
    ['H₂O', '18 u'],
    ['CO₂', '44 u'],
    ['O₂', '32 u'],
    ['CH₄', '16 u'],
    ['N₂', '28 u'],
    ['1 u', '1,66·10⁻²⁷ kg'],
    ['d = V/S', 'moy pardasi qalinligi'],
  ],
  quiz: [
    Q('Moddaning kimyoviy xossasini saqlovchi eng kichik zarra?', ['molekula', 'elektron', 'tomchi', 'kristall']),
    Q('Suv molekulasi qanday atomlardan iborat?', ['2 ta H va 1 ta O', '1 ta H va 2 ta O', '2 ta O', '2 ta H']),
    Q('Massa atom birligi qaysi atom asosida olingan?', ['uglerod ¹²C', 'vodorod', 'kislorod', 'temir']),
    Q('1 u taxminan necha kilogramm?', ['1,66·10⁻²⁷ kg', '1,66·10²⁷ kg', '6,02·10²³ kg', '1 g']),
    Q('Suvning nisbiy molekulyar massasi?', ['18', '16', '10', '20']),
    Q('Moy pardasi qalinligi qanday topiladi?', ['d = V / S', 'd = S / V', 'd = V · S', 'd = S − V']),
    Q('Tunnel mikroskopi necha marta kattalashtiradi?', ['100 million', '1000', '100', '1 million']),
    Q('Suv molekulasining diametri taxminan?', ['3·10⁻¹⁰ m', '3 mm', '3·10⁻³ m', '3 m']),
    Q('Qaysi moddalar atom holida uchraydi?', ['metallar va inert gazlar', 'suv va tuz', 'kislorod va azot', 'barcha gazlar']),
  ],
  sort: {
    categories: ['Molekula (bir necha atom)', 'Alohida atom'],
    items: [
      { text: 'H₂O', cat: 0 }, { text: 'CO₂', cat: 0 }, { text: 'O₂', cat: 0 }, { text: 'CH₄', cat: 0 },
      { text: 'He (geliy)', cat: 1 }, { text: 'Fe (temir)', cat: 1 }, { text: 'Ne (neon)', cat: 1 }, { text: 'Cu (mis)', cat: 1 },
    ],
  },
  qa: [
    { q: 'Molekula deb nimaga aytiladi?', a: 'Moddaning kimyoviy xossasini saqlaydigan eng kichik zarraga.' },
    { q: 'Molekula o‘lchamini qanday aniqlash mumkin?', a: 'Masalan, moy tomchisining suv ustida yoyilishi orqali: d = V/S.' },
    { q: 'Massa atom birligi nima?', a: 'Uglerod atomi massasining 1/12 qismi, ≈ 1,66·10⁻²⁷ kg.' },
    { q: 'Metanning (CH₄) nisbiy molekulyar massasini hisoblang.', a: '12 + 4·1 = 16 u.' },
    { q: 'Osh tuzining (NaCl) nisbiy molekulyar massasi?', a: '23 + 35,5 = 58,5 u.' },
  ],
  odd: [
    { items: ['H₂O', 'CO₂', 'O₃', 'Fe'], answer: 3, why: 'Temir — alohida atomlardan iborat metall.' },
    { items: ['molekula', 'atom', 'u (massa atom birligi)', 'termometr'], answer: 3, why: 'Termometr — asbob, qolganlari zarralarga oid tushunchalar.' },
  ],
  sequences: [
    { title: 'Moy tomchisi tajribasi bosqichlari', items: ['Tomchi hajmini aniqlash', 'Tomchini suvga tomizish', 'Parda yuzini o‘lchash', 'd = V/S formula bilan hisoblash'] },
  ],
  creative: [
    { task: 'Molekulaning kichikligini ko‘rsatuvchi o‘zingizning taqqoslashingizni o‘ylab toping (masalan, «agar molekula ... bo‘lsa, unda ...»).', time: 90 },
  ],
  units: [
    Q('1 mm³ = ? m³', ['10⁻⁹ m³', '10⁻³ m³', '10⁻⁶ m³', '10⁻¹² m³']),
    Q('1 sm³ = ? m³', ['10⁻⁶ m³', '10⁻³ m³', '10⁻² m³', '10⁻⁹ m³']),
    Q('12 sm³ = ? m³', ['12·10⁻⁶ m³', '12·10⁻³ m³', '0,12 m³', '1,2 m³']),
    Q('1 g = ? kg', ['10⁻³ kg', '10⁻² kg', '10³ kg', '10⁻⁶ kg']),
    Q('1 mm² = ? m²', ['10⁻⁶ m²', '10⁻³ m²', '10⁻² m²', '10⁻⁹ m²']),
    Q('1 g/sm³ = ? kg/m³', ['1000 kg/m³', '1 kg/m³', '100 kg/m³', '0,001 kg/m³']),
  ],
};

/* ---------- 3-§ ---------- */
const F3 = {
  id: 'fz9-03',
  source: `${SRC} • 3-§ • 12–15-betlar`,
  title: 'Modda miqdori',
  short: 'Mol, Avogadro doimiysi, molyar massa, konsentratsiya',
  theme: { emoji: '🧮', grad: 'from-emerald-800 via-teal-600 to-cyan-400', border: 'border-emerald-200', tag: 'Fizika • 9-sinf • 3-§' },
  lesson: [
    {
      title: 'Zarralarni qanday sanaymiz?',
      emoji: '🥚',
      text: 'Tuxumni «dona» bilan emas, «o‘nlik» bilan, qog‘ozni «pachka» bilan sanaymiz. Molekulalar esa shunchalik ko‘pki, ular uchun ham maxsus «to‘plam» kerak. Bu to‘plam — mol.',
      rule: '1 mol — shunday modda miqdoriki, undagi zarralar soni 12 g ugleroddagi atomlar soniga teng.',
      ruleLabel: 'Ta’rif',
      note: 'Modda miqdori ν (nyu) harfi bilan belgilanadi va molda o‘lchanadi.',
    },
    {
      title: 'Avogadro doimiysi',
      emoji: '🔢',
      text: 'Har qanday moddaning 1 molida zarralar soni bir xil. Bu son italyan olimi Amedeo Avogadro sharafiga nomlangan.',
      facts: [
        { n: '6,02·10²³', l: 'N_A — 1 moldagi zarralar soni' },
        { n: '602 000…', l: '23 ta raqamdan iborat son' },
      ],
      reveal: [
        { q: 'Agar 6,02·10²³ ta qum donasini (har biri 1 mm³) O‘zbekiston hududiga sepsak nima bo‘ladi?', a: 'Butun mamlakat 1 km dan qalinroq qum qatlami bilan qoplanadi. Shunchalik katta son!' },
      ],
    },
    {
      title: 'Asosiy formulalar',
      emoji: '📐',
      table: {
        head: ['Kattalik', 'Formula', 'Birligi'],
        rows: [
          ['Molekulalar soni', 'N = ν · N_A', 'ta'],
          ['Modda miqdori', 'ν = N / N_A = m / M', 'mol'],
          ['Molyar massa', 'M = m₀ · N_A', 'kg/mol'],
          ['Bitta molekula massasi', 'm₀ = M / N_A', 'kg'],
          ['Molekulalar soni (massadan)', 'N = (m / M) · N_A', 'ta'],
          ['Konsentratsiya', 'n = N / V', 'm⁻³'],
        ],
      },
    },
    {
      title: 'Molyar massa',
      emoji: '⚖️',
      rule: 'Molyar massa M — 1 mol moddaning massasi. Son jihatidan nisbiy molekulyar massaga teng, faqat grammda olinadi.',
      ruleLabel: 'Esda tuting',
      examples: ['H₂O: 18 g/mol', 'CO₂: 44 g/mol', 'O₂: 32 g/mol', 'N₂: 28 g/mol', 'Hg: 200 g/mol'],
      note: 'Masalaga qo‘yishda g/mol ni kg/mol ga o‘tkazing: 44 g/mol = 44·10⁻³ kg/mol.',
    },
    {
      title: 'Interaktiv: molekula yig‘ib, M ni toping',
      emoji: '🧩',
      sim: { kind: 'molar', start: { C: 1, O: 2 } },
    },
    {
      title: 'Virtual laboratoriya: tarozida mol',
      emoji: '🧪',
      lab: {
        kind: 'molarBalance',
        title: 'Turli moddalarning modda miqdorini aniqlash',
        goal: 'Moddani tarozida tortib, undagi mol sonini va molekulalar sonini hisoblash.',
        tools: [
          { e: '⚖️', n: 'Elektron tarozi', ok: true, why: 'massani o‘lchaydi' },
          { e: '🥄', n: 'Qoshiq', ok: true, why: 'modda solinadi' },
          { e: '📋', n: 'Mendeleyev jadvali', ok: true, why: 'molyar massani topamiz' },
          { e: '🧂', n: 'Moddalar to‘plami', ok: true, why: 'tekshiriladigan moddalar' },
          { e: '🌡️', n: 'Termometr', ok: false, why: 'harorat kerak emas' },
          { e: '⏱️', n: 'Sekundomer', ok: false, why: 'vaqt kerak emas' },
          { e: '🔦', n: 'Fonar', ok: false, why: 'yorug‘lik kerak emas' },
        ],
        steps: ['Moddani tanlang.', 'Qoshiqda taroziga soling.', 'Massani jadvalga yozing.', 'Kamida 3 xil modda bilan takrorlang.'],
        cols: [
          { k: 'n', l: 'Modda' },
          { k: 'm', l: 'm, g', f: (r) => String(r.m).replace('.', ',') },
          { k: 'M', l: 'M, g/mol', f: (r) => String(r.M).replace('.', ',') },
          { k: 'nu', l: 'ν = m/M, mol', d: 3 },
          { k: 'N', l: 'N = ν·N_A', d: 3 },
        ],
        graph: { title: 'Molekulalar soni modda miqdoriga bog‘liq', x: { k: 'nu', l: 'ν, mol' }, ys: [{ k: 'N', l: 'N, ta' }], lines: false, theory: (x) => x * NA },
        minRows: 3,
        questions: [
          { q: '1 qoshiq tuz va 1 qoshiq suvda mol soni bir xilmi?', a: 'Yo‘q. Molyar massalari har xil bo‘lgani uchun mol soni ham har xil.' },
          { q: 'Nega barcha nuqtalar bitta to‘g‘ri chiziqda yotadi?', a: 'Chunki har qanday moddada N = ν · N_A — Avogadro soni hamma moddalar uchun bir xil.' },
          { q: '18 g suvda necha mol bor?', a: '1 mol, ya’ni 6,02·10²³ ta molekula.' },
        ],
        conclusion: 'Bir xil massadagi turli moddalarda mol soni har xil. Lekin 1 molida zarralar soni hammasida bir xil — 6,02·10²³ ta.',
      },
    },
    {
      title: 'Masala yechish namunalari',
      emoji: '✍️',
      steps: [
        { e: '1', t: '54 sm³ suvda nechta molekula bor?', d: 'm = ρV = 54 g; ν = m/M = 54 : 18 = 3 mol; N = 3 · 6,02·10²³ = 1,806·10²⁴ ta' },
        { e: '2', t: '136 mol simob qancha hajm egallaydi?', d: 'm = νM = 136 · 0,2 = 27,2 kg; V = m/ρ = 27,2 : 13 600 = 2·10⁻³ m³ = 2 l' },
      ],
      calc: {
        items: [
          { name: 'ν = m / M', formula: 'ν = m / M', vars: [{ k: 'm', l: 'Massa m', u: 'g', v: '54' }, { k: 'M', l: 'Molyar massa M', u: 'g/mol', v: '18' }], out: { s: 'ν', l: 'Modda miqdori', u: 'mol' }, f: (x) => x.m / x.M },
          { name: 'N = ν · N_A', formula: 'N = ν · N_A', vars: [{ k: 'nu', l: 'Modda miqdori ν', u: 'mol', v: '3' }], out: { s: 'N', l: 'Molekulalar soni', u: 'ta' }, f: (x) => x.nu * NA },
          { name: 'm₀ = M / N_A', formula: 'm₀ = M / N_A', vars: [{ k: 'M', l: 'Molyar massa M', u: 'kg/mol', v: '0,018' }], out: { s: 'm₀', l: 'Bitta molekula massasi', u: 'kg' }, f: (x) => x.M / NA },
          { name: 'n = N / V', formula: 'n = N / V', vars: [{ k: 'N', l: 'Molekulalar soni N', u: 'ta', v: '3·10^24' }, { k: 'V', l: 'Hajm V', u: 'm³', v: '5·10^-3' }], out: { s: 'n', l: 'Konsentratsiya', u: 'm⁻³' }, f: (x) => x.N / x.V },
        ],
      },
    },
    {
      title: 'O‘zingiz yeching',
      emoji: '🏆',
      reveal: [
        { q: '270 g suvda necha mol modda bor?', a: 'ν = 270 : 18 = 15 mol' },
        { q: '8 mol CO₂ ning massasi qancha?', a: 'm = νM = 8 · 44 = 352 g' },
        { q: '7 g azotda (N₂) nechta molekula bor?', a: 'ν = 7 : 28 = 0,25 mol; N = 0,25 · 6,02·10²³ ≈ 1,5·10²³ ta' },
        { q: 'M = 36 g/mol bo‘lsa, bitta molekula massasi?', a: 'm₀ = 0,036 : 6,02·10²³ ≈ 6·10⁻²⁶ kg' },
      ],
      mission: { t: 'Jamoaviy topshiriq', d: 'Har jamoa bitta moddani tanlaydi (tuz, shakar, suv). 100 g moddada nechta molekula borligini hisoblang. Kim tez va to‘g‘ri hisoblaydi?', sec: 300 },
    },
  ],
  pairs: [
    ['ν', 'modda miqdori, mol'],
    ['N_A', '6,02·10²³ mol⁻¹'],
    ['M', 'molyar massa, kg/mol'],
    ['n', 'konsentratsiya, m⁻³'],
    ['m₀', 'bitta molekula massasi'],
    ['N = ν·N_A', 'molekulalar soni'],
    ['Avogadro', 'italyan olimi'],
  ],
  quiz: [
    Q('Modda miqdorining birligi?', ['mol', 'kg', 'm³', 'ta']),
    Q('Avogadro doimiysining qiymati?', ['6,02·10²³ mol⁻¹', '1,38·10⁻²³ J/K', '8,31 J/(mol·K)', '1,66·10⁻²⁷ kg']),
    Q('Suvning molyar massasi?', ['18 g/mol', '16 g/mol', '10 g/mol', '32 g/mol']),
    Q('Modda miqdori formulasi?', ['ν = m / M', 'ν = M / m', 'ν = m · M', 'ν = N · N_A']),
    Q('Konsentratsiya nimani bildiradi?', ['hajm birligidagi molekulalar sonini', 'moddaning massasini', 'molekula tezligini', 'bosimni']),
    Q('Bitta molekula massasi qanday topiladi?', ['m₀ = M / N_A', 'm₀ = M · N_A', 'm₀ = N_A / M', 'm₀ = ν / M']),
    Q('1 mol uglerodning massasi?', ['12 g', '1 g', '6 g', '24 g']),
    Q('3 mol suvda nechta molekula bor?', ['1,806·10²⁴', '6,02·10²³', '3', '18']),
  ],
  sort: {
    categories: ['Formula', 'Birlik'],
    items: [
      { text: 'ν = m / M', cat: 0 }, { text: 'N = ν · N_A', cat: 0 }, { text: 'n = N / V', cat: 0 }, { text: 'm₀ = M / N_A', cat: 0 },
      { text: 'mol', cat: 1 }, { text: 'kg/mol', cat: 1 }, { text: 'm⁻³', cat: 1 }, { text: 'mol⁻¹', cat: 1 },
    ],
  },
  qa: [
    { q: 'Mol nima?', a: '12 g uglerodda qancha atom bo‘lsa, shuncha zarrasi bor modda miqdori.' },
    { q: 'Avogadro doimiysi nimani ko‘rsatadi?', a: '1 mol moddadagi zarralar sonini: 6,02·10²³.' },
    { q: 'Molyar massa bilan nisbiy molekulyar massa qanday bog‘langan?', a: 'Son jihatdan teng, faqat molyar massa g/mol da olinadi.' },
    { q: '44 g CO₂ da necha mol bor?', a: '1 mol.' },
    { q: 'Ozonning (O₃) molyar massasi?', a: '48 g/mol.' },
  ],
  odd: [
    { items: ['mol', 'kg/mol', 'm⁻³', 'metr/sekund'], answer: 3, why: 'Tezlik birligi bu mavzudagi kattaliklarga tegishli emas.' },
    { items: ['H₂O — 18', 'CO₂ — 44', 'O₂ — 32', 'N₂ — 7'], answer: 3, why: 'Azotning molyar massasi 28 g/mol.' },
  ],
  sequences: [
    { title: 'Massadan molekulalar sonini topish', items: ['Moddaning massasini aniqlash', 'Molyar massani jadvaldan topish', 'ν = m / M ni hisoblash', 'N = ν · N_A ni hisoblash'] },
  ],
  units: [
    Q('44 g/mol = ? kg/mol', ['0,044 kg/mol', '44 000 kg/mol', '4,4 kg/mol', '0,44 kg/mol']),
    Q('5 l = ? m³', ['5·10⁻³ m³', '5 m³', '5·10⁻⁶ m³', '0,5 m³']),
    Q('270 g = ? kg', ['0,27 kg', '2,7 kg', '27 kg', '0,027 kg']),
    Q('13,6 g/sm³ = ? kg/m³', ['13 600 kg/m³', '136 kg/m³', '1,36 kg/m³', '1360 kg/m³']),
    Q('2·10⁻³ m³ = ? l', ['2 l', '20 l', '0,2 l', '200 l']),
    Q('200 g/mol = ? kg/mol', ['0,2 kg/mol', '2 kg/mol', '20 kg/mol', '0,02 kg/mol']),
  ],
};

/* ---------- 4-§ ---------- */
const F4 = {
  id: 'fz9-04',
  source: `${SRC} • 4-§ • 16–17-betlar`,
  title: 'Masalalar yechish (molekula va modda miqdori)',
  short: 'Grafit qalam, azot konsentratsiyasi, kumush qoplama — bosqichma-bosqich',
  theme: { emoji: '✍️', grad: 'from-slate-800 via-blue-800 to-indigo-500', border: 'border-indigo-200', tag: 'Fizika • 9-sinf • 4-§' },
  lesson: [
    {
      title: 'Masala yechish algoritmi',
      emoji: '🧭',
      steps: [
        { e: '📝', t: 'Berilganni yozing', d: 'Barcha kattaliklarni harflar bilan belgilang.' },
        { e: '📏', t: 'SI ga o‘tkazing', d: 'sm → m, g → kg, l → m³, g/mol → kg/mol.' },
        { e: '📐', t: 'Formulani tanlang', d: 'Qaysi kattalik noma’lum? Uni qaysi formula bog‘laydi?' },
        { e: '🧮', t: 'Hisoblang', d: 'Darajalar bilan ehtiyot bo‘ling: 10² · 10³ = 10⁵.' },
        { e: '✅', t: 'Tekshiring', d: 'Birlik to‘g‘rimi? Javob mantiqan to‘g‘rimi?' },
      ],
    },
    {
      title: 'Darajalar bilan ishlash',
      emoji: '🔟',
      table: {
        head: ['Amal', 'Qoida', 'Misol'],
        rows: [
          ['Ko‘paytirish', 'darajalar qo‘shiladi', '10³ · 10⁵ = 10⁸'],
          ['Bo‘lish', 'darajalar ayiriladi', '10⁸ : 10³ = 10⁵'],
          ['Manfiy daraja', 'kasr', '10⁻³ = 1/1000'],
          ['Daraja darajasi', 'ko‘paytiriladi', '(10⁻³)³ = 10⁻⁹'],
        ],
      },
      reveal: [
        { q: '6·10²³ : 2·10⁻² = ?', a: '3·10²⁵' },
        { q: '4·10⁻⁶ · 15·10⁻² = ?', a: '60·10⁻⁸ = 6·10⁻⁷' },
      ],
    },
    {
      title: '1-masala: grafit qalam',
      emoji: '✏️',
      text: 'Uzunligi 15 sm, ko‘ndalang kesim yuzi 4 mm² grafit qalamchada nechta uglerod atomi bor? ρ = 1,6 g/sm³, m₀ = 2·10⁻²⁶ kg.',
      steps: [
        { e: '1', t: 'SI', d: 'l = 0,15 m; S = 4·10⁻⁶ m²; ρ = 1600 kg/m³' },
        { e: '2', t: 'Hajm', d: 'V = S·l = 4·10⁻⁶ · 0,15 = 6·10⁻⁷ m³' },
        { e: '3', t: 'Massa', d: 'm = ρV = 1600 · 6·10⁻⁷ = 9,6·10⁻⁴ kg' },
        { e: '4', t: 'Javob', d: 'N = m / m₀ = 9,6·10⁻⁴ : 2·10⁻²⁶ = 4,8·10²² ta' },
      ],
    },
    {
      title: '2-masala: idishdagi azot',
      emoji: '🧴',
      text: 'Hajmi 5 l idishda 140 g azot bor. Molekulalar konsentratsiyasini toping.',
      steps: [
        { e: '1', t: 'SI', d: 'V = 5·10⁻³ m³; m = 0,14 kg; M = 28·10⁻³ kg/mol' },
        { e: '2', t: 'Mol soni', d: 'ν = m/M = 0,14 : 0,028 = 5 mol' },
        { e: '3', t: 'Molekulalar', d: 'N = ν · N_A = 5 · 6·10²³ = 3·10²⁴ ta' },
        { e: '4', t: 'Javob', d: 'n = N/V = 3·10²⁴ : 5·10⁻³ = 6·10²⁶ m⁻³' },
      ],
    },
    {
      title: '3-masala: kumush qoplama',
      emoji: '🥈',
      text: 'Yuzi 20 sm² buyumga 1,5 μm qalinlikda kumush qoplandi. Qoplamda nechta atom bor? ρ = 10 500 kg/m³, M = 108 g/mol.',
      steps: [
        { e: '1', t: 'SI', d: 'S = 2·10⁻³ m²; h = 1,5·10⁻⁶ m; M = 0,108 kg/mol' },
        { e: '2', t: 'Massa', d: 'm = ρ·S·h = 10 500 · 2·10⁻³ · 1,5·10⁻⁶ = 3,15·10⁻⁵ kg' },
        { e: '3', t: 'Javob', d: 'N = (m/M)·N_A = (3,15·10⁻⁵ : 0,108) · 6·10²³ ≈ 1,75·10²⁰ ta' },
      ],
    },
    {
      title: 'Kalkulyator bilan tekshiring',
      emoji: '🧮',
      text: 'Javobingizni o‘zingiz hisoblang, keyin kalkulyatorda tekshiring.',
      calc: {
        items: [
          { name: 'Atomlar soni (ρ, V, M)', formula: 'N = (ρ · V / M) · N_A', vars: [{ k: 'r', l: 'Zichlik ρ', u: 'kg/m³', v: '2700' }, { k: 'V', l: 'Hajm V', u: 'm³', v: '3·10^-5' }, { k: 'M', l: 'Molyar massa M', u: 'kg/mol', v: '0,027' }], out: { s: 'N', l: 'Atomlar soni', u: 'ta' }, f: (x) => ((x.r * x.V) / x.M) * NA },
          { name: 'Konsentratsiya (m, M, V)', formula: 'n = m · N_A / (M · V)', vars: [{ k: 'm', l: 'Massa m', u: 'kg', v: '0,14' }, { k: 'M', l: 'Molyar massa M', u: 'kg/mol', v: '0,028' }, { k: 'V', l: 'Hajm V', u: 'm³', v: '5·10^-3' }], out: { s: 'n', l: 'Konsentratsiya', u: 'm⁻³' }, f: (x) => (x.m * NA) / (x.M * x.V) },
          { name: 'Hajm (ν, M, ρ)', formula: 'V = ν · M / ρ', vars: [{ k: 'nu', l: 'Modda miqdori ν', u: 'mol', v: '34' }, { k: 'M', l: 'Molyar massa M', u: 'kg/mol', v: '0,2' }, { k: 'r', l: 'Zichlik ρ', u: 'kg/m³', v: '13600' }], out: { s: 'V', l: 'Hajm', u: 'm³' }, f: (x) => (x.nu * x.M) / x.r },
        ],
      },
    },
    {
      title: 'O‘zingiz yeching',
      emoji: '🏆',
      reveal: [
        { q: '81 g alyuminiyda nechta atom bor? (M = 27 g/mol)', a: 'ν = 81 : 27 = 3 mol; N = 3 · 6,02·10²³ ≈ 1,8·10²⁴ ta' },
        { q: '72 g suvda necha mol va nechta molekula bor?', a: 'ν = 4 mol; N ≈ 2,4·10²⁴ ta' },
        { q: '34 mol simob qancha hajm egallaydi? (ρ = 13,6 g/sm³, M = 200 g/mol)', a: 'm = 6,8 kg; V = 6,8 : 13 600 = 5·10⁻⁴ m³ = 0,5 l' },
        { q: '6 sm³ olmosda nechta atom bor? (ρ = 3500 kg/m³, M = 12 g/mol)', a: 'm = 0,021 kg; ν = 1,75 mol; N ≈ 1,05·10²⁴ ta' },
      ],
    },
    {
      title: 'O‘ylab ko‘ring',
      emoji: '🤔',
      reveal: [
        { q: 'Nega gulxan tutuni yuqoriga ko‘tarilgan sari, shamol bo‘lmasa ham ko‘rinmay qoladi?', a: 'Tutun zarralari diffuziya tufayli havoda tarqalib ketadi va ularning zichligi juda kamayadi.' },
        { q: 'Singan chinni bo‘laklari yelimsiz yopishmaydi. Axir molekulalar tortishadi-ku?', a: 'Bo‘laklarni molekulalar tortishadigan masofagacha (10⁻¹⁰ m) yaqinlashtirib bo‘lmaydi — sirt notekis.' },
      ],
      mission: { t: 'Jamoaviy poyga', d: 'Darslikdagi 4-mashqdan 1, 2, 4, 5-masalalarni jamoalarga bo‘lib bering. Birinchi bo‘lib to‘g‘ri javob bergan jamoa ball oladi.', sec: 600 },
    },
  ],
  pairs: [
    ['15 sm', '0,15 m'],
    ['4 mm²', '4·10⁻⁶ m²'],
    ['5 l', '5·10⁻³ m³'],
    ['140 g', '0,14 kg'],
    ['1,5 μm', '1,5·10⁻⁶ m'],
    ['20 sm²', '2·10⁻³ m²'],
    ['108 g/mol', '0,108 kg/mol'],
  ],
  quiz: [
    Q('10³ · 10⁵ = ?', ['10⁸', '10¹⁵', '10²', '20⁸']),
    Q('10⁸ : 10³ = ?', ['10⁵', '10¹¹', '10²⁴', '1⁵']),
    Q('Qalamchaning hajmi qanday topiladi?', ['V = S · l', 'V = S / l', 'V = l / S', 'V = S + l']),
    Q('Massani zichlik va hajmdan topish?', ['m = ρ · V', 'm = ρ / V', 'm = V / ρ', 'm = ρ + V']),
    Q('140 g azotda (M = 28 g/mol) necha mol bor?', ['5 mol', '28 mol', '0,2 mol', '140 mol']),
    Q('Javob birligini tekshirish nega kerak?', ['xatoni topish uchun', 'chiroyli bo‘lishi uchun', 'kerak emas', 'vaqt o‘tkazish uchun']),
    Q('(10⁻³)³ = ?', ['10⁻⁹', '10⁻⁶', '10⁰', '10⁻³']),
  ],
  sequences: [
    { title: 'Masala yechish tartibi', items: ['Berilganni yozish', 'SI birliklariga o‘tkazish', 'Formulani tanlash', 'Hisoblash', 'Javobni tekshirish'] },
  ],
  qa: [
    { q: '1 sm² necha m²?', a: '10⁻⁴ m².' },
    { q: '1 μm necha metr?', a: '10⁻⁶ m.' },
    { q: 'Atomlar sonini massadan topish formulasi?', a: 'N = (m / M) · N_A.' },
    { q: 'Zichlik birligi SI da?', a: 'kg/m³.' },
  ],
  odd: [
    { items: ['sm → m', 'g → kg', 'l → m³', 'kg → g'], answer: 3, why: 'SI ga o‘tishda kg ni g ga o‘tkazmaymiz — kg o‘zi SI birligi.' },
  ],
  units: [
    Q('15 sm = ? m', ['0,15 m', '1,5 m', '0,015 m', '150 m']),
    Q('4 mm² = ? m²', ['4·10⁻⁶ m²', '4·10⁻³ m²', '4·10⁻² m²', '0,4 m²']),
    Q('20 sm² = ? m²', ['2·10⁻³ m²', '2·10⁻² m²', '0,2 m²', '2·10⁻⁴ m²']),
    Q('1,5 μm = ? m', ['1,5·10⁻⁶ m', '1,5·10⁻³ m', '1,5·10⁻⁹ m', '15 m']),
    Q('1,6 g/sm³ = ? kg/m³', ['1600 kg/m³', '16 kg/m³', '160 kg/m³', '0,0016 kg/m³']),
    Q('6 sm³ = ? m³', ['6·10⁻⁶ m³', '6·10⁻³ m³', '0,06 m³', '6·10⁻² m³']),
    Q('2 mm = ? m', ['2·10⁻³ m', '0,2 m', '2·10⁻² m', '2·10⁻⁶ m']),
  ],
};

/* ---------- 5-§ ---------- */
const F5 = {
  id: 'fz9-05',
  source: `${SRC} • 5-§ • 18–20-betlar`,
  title: 'Ideal gaz',
  short: 'Ideal va real gaz, gaz bosimining sababi, MKN asosiy tenglamasi',
  theme: { emoji: '🎈', grad: 'from-sky-800 via-blue-600 to-cyan-400', border: 'border-sky-200', tag: 'Fizika • 9-sinf • 5-§' },
  lesson: [
    {
      title: 'Ideal gaz — «soddalashtirilgan» gaz',
      emoji: '🎈',
      text: 'Siyrak gazda molekulalar orasidagi masofa ularning o‘lchamidan juda katta. Shuning uchun molekulalarni nuqta deb, ular orasidagi tortishishni esa juda kichik deb hisoblash mumkin.',
      rule: 'Ideal gaz — molekulalari moddiy nuqta deb qaraladigan va ular orasidagi o‘zaro ta’sir kuchlari hisobga olinmaydigan gaz.',
      ruleLabel: 'Ta’rif',
      cards: [
        { e: '🎯', t: 'Ideal gaz', d: 'Model. Tabiatda aynan bunday gaz yo‘q.' },
        { e: '🌫️', t: 'Real gaz', d: 'Haqiqiy gaz. Molekulalari orasida kichik bo‘lsa ham ta’sir kuchlari bor.' },
      ],
    },
    {
      title: 'Gaz bosimi qayerdan paydo bo‘ladi?',
      emoji: '🥁',
      text: 'Idishdagi har bir molekula devorga urilib, unga juda kichik kuch bilan ta’sir qiladi. Lekin molekulalar juda ko‘p va ular devorga deyarli uzluksiz urilib turadi. Shu zarbalar yig‘indisi — gaz bosimi.',
      vs: {
        q: 'Shar ichidagi havo nega sharni shishirib turadi?',
        a: { t: 'Molekulalar devorga urilib turadi', pts: ['millionlab zarbalar', 'har tomondan bir xil'] },
        b: { t: 'Havo shunchaki joy egallaydi', pts: ['harakat shart emas'] },
      },
    },
    {
      title: 'Simulyatsiya: molekulalar devorga uriladi',
      emoji: '🧪',
      text: 'Molekulalar sonini, haroratni va hajmni o‘zgartiring. Manometr va «devorga urilish» hisoblagichini kuzating.',
      sim: { kind: 'gas' },
      reveal: [
        { q: 'Molekulalar soni 2 marta ortsa, bosim nima bo‘ladi?', a: '2 marta ortadi — devorga urilishlar ko‘payadi.' },
        { q: 'Hajm kamaysa-chi?', a: 'Bosim ortadi — molekulalar devorga tez-tez uriladi.' },
      ],
    },
    {
      title: 'O‘rtacha kvadratik tezlik',
      emoji: '🏃',
      text: 'Molekulalar to‘qnashganda tezliklarining yo‘nalishi va qiymati o‘zgarib turadi. Shuning uchun ularning harakati o‘rtacha kvadratik tezlik bilan tavsiflanadi.',
      rule: 'v̄² = (v₁² + v₂² + … + v_N²) / N',
      ruleLabel: 'O‘rtacha kvadratik tezlik',
    },
    {
      title: 'MKN ning asosiy tenglamasi',
      emoji: '⭐',
      table: {
        head: ['Ko‘rinishi', 'Ma’nosi'],
        rows: [
          ['p = ⅓ · n · m₀ · v̄²', 'bosim — konsentratsiya, molekula massasi va tezlikka bog‘liq'],
          ['p = ⅔ · n · Ē', 'bosim — hajm birligidagi o‘rtacha kinetik energiyaga proporsional'],
          ['p = ⅓ · ρ · v̄²', 'bosim — gaz zichligi va tezlikka bog‘liq'],
        ],
      },
      note: 'Bu yerda n — konsentratsiya, m₀ — bitta molekula massasi, Ē = m₀v̄²/2 — o‘rtacha kinetik energiya, ρ = n·m₀ — gaz zichligi.',
    },
    {
      title: 'Virtual laboratoriya: bosim molekulalar soniga bog‘liqmi?',
      emoji: '🧪',
      lab: {
        kind: 'gas',
        lock: ['V', 'T'],
        N: 20, V: 3, T: 300,
        title: 'Gaz bosimining molekulalar soniga bog‘liqligi',
        goal: 'Hajm va harorat o‘zgarmaganda, gaz bosimi molekulalar soniga qanday bog‘liqligini aniqlash.',
        hint: 'Molekulalar sonini 20, 40, 60… qilib o‘zgartiring.',
        tools: [
          { e: '🫙', n: 'Germetik idish', ok: true, why: 'gaz qamaladi' },
          { e: '🧭', n: 'Manometr', ok: true, why: 'bosimni o‘lchaydi' },
          { e: '🌡️', n: 'Termometr', ok: true, why: 'harorat o‘zgarmasligini nazorat qiladi' },
          { e: '🎈', n: 'Gaz nasosi', ok: true, why: 'gaz miqdorini o‘zgartiradi' },
          { e: '🧲', n: 'Magnit', ok: false, why: 'kerak emas' },
          { e: '💡', n: 'Lampochka', ok: false, why: 'kerak emas' },
          { e: '📐', n: 'Transportir', ok: false, why: 'burchak o‘lchanmaydi' },
        ],
        cols: [{ k: 'N', l: 'Molekulalar soni (model)', f: (r) => `${r.N}` }, { k: 'p', l: 'Bosim p, kPa', f: (r) => String(r.p).replace('.', ',') }],
        graph: { title: 'p va molekulalar soni', x: { k: 'N', l: 'molekulalar soni', max: 150 }, ys: [{ k: 'p', l: 'p, kPa' }], lines: false, theory: (x, rows) => { if (!rows.length) return NaN; const k = rows.reduce((s, r) => s + r.p / r.N, 0) / rows.length; return k * x; } },
        minRows: 4,
        questions: [
          { q: 'Grafik qanday chiziq bo‘ldi?', a: 'Koordinata boshidan chiquvchi to‘g‘ri chiziq.' },
          { q: 'Molekulalar soni 3 marta ortsa, bosim-chi?', a: 'Bosim ham 3 marta ortadi.' },
          { q: 'Bu MKN asosiy tenglamasining qaysi qismini tasdiqlaydi?', a: 'p = ⅓·n·m₀·v̄² — bosim konsentratsiyaga to‘g‘ri proporsional.' },
        ],
        conclusion: 'Hajm va harorat o‘zgarmasa, gaz bosimi molekulalar soniga (konsentratsiyaga) to‘g‘ri proporsional.',
      },
    },
    {
      title: 'Masala yechish namunalari',
      emoji: '✍️',
      steps: [
        { e: '1', t: 'ρ = 1,5 kg/m³, p = 180 kPa. v̄ = ?', d: 'v̄ = √(3p/ρ) = √(3 · 180 000 : 1,5) = √360 000 = 600 m/s' },
        { e: '2', t: 'p = 120 kPa, n = 5·10²⁵ m⁻³. Ē = ?', d: 'Ē = 3p / (2n) = 3 · 120 000 : (2 · 5·10²⁵) = 3,6·10⁻²¹ J' },
      ],
      calc: {
        items: [
          { name: 'v̄ = √(3p/ρ)', formula: 'v̄ = √(3p / ρ)', vars: [{ k: 'p', l: 'Bosim p', u: 'Pa', v: '180000' }, { k: 'r', l: 'Zichlik ρ', u: 'kg/m³', v: '1,5' }], out: { s: 'v̄', l: 'O‘rtacha kvadratik tezlik', u: 'm/s' }, f: (x) => Math.sqrt((3 * x.p) / x.r) },
          { name: 'p = ⅓ρv̄²', formula: 'p = ⅓ · ρ · v̄²', vars: [{ k: 'r', l: 'Zichlik ρ', u: 'kg/m³', v: '0,9' }, { k: 'v', l: 'Tezlik v̄', u: 'm/s', v: '600' }], out: { s: 'p', l: 'Bosim', u: 'Pa' }, f: (x) => (x.r * x.v * x.v) / 3 },
          { name: 'p = ⅓nm₀v̄²', formula: 'p = ⅓ · n · m₀ · v̄²', vars: [{ k: 'n', l: 'Konsentratsiya n', u: 'm⁻³', v: '4,5·10^25' }, { k: 'm0', l: 'Molekula massasi m₀', u: 'kg', v: '3,3·10^-27' }, { k: 'v', l: 'Tezlik v̄', u: 'm/s', v: '400' }], out: { s: 'p', l: 'Bosim', u: 'Pa' }, f: (x) => (x.n * x.m0 * x.v * x.v) / 3 },
          { name: 'Ē = 3p/(2n)', formula: 'Ē = 3p / (2n)', vars: [{ k: 'p', l: 'Bosim p', u: 'Pa', v: '120000' }, { k: 'n', l: 'Konsentratsiya n', u: 'm⁻³', v: '5·10^25' }], out: { s: 'Ē', l: 'O‘rtacha kinetik energiya', u: 'J' }, f: (x) => (3 * x.p) / (2 * x.n) },
        ],
      },
    },
    {
      title: 'O‘zingiz yeching',
      emoji: '🏆',
      reveal: [
        { q: 'v̄ = 600 m/s, ρ = 0,9 kg/m³. Bosim?', a: 'p = ⅓ · 0,9 · 600² = 108 000 Pa = 108 kPa' },
        { q: 'ρ = 1,5 kg/m³, p = 7,2 kPa. v̄ = ?', a: 'v̄ = √(3 · 7200 : 1,5) = √14 400 = 120 m/s' },
        { q: '0,3 kg gaz 400 kPa bosimda 1 m³ hajmni egallaydi. v̄ = ?', a: 'ρ = 0,3 kg/m³; v̄ = √(3 · 400 000 : 0,3) = 2000 m/s' },
      ],
      mission: { t: 'Uyga vazifa', d: 'Darslikdagi 4-mashqning 1, 4, 5-masalalarini yeching.', sec: 0 },
    },
  ],
  pairs: [
    ['ideal gaz', 'molekulalari nuqta, ta’sirlashmaydi'],
    ['real gaz', 'molekulalari ta’sirlashadi'],
    ['p = ⅓ρv̄²', 'bosim, zichlik va tezlik'],
    ['p = ⅔nĒ', 'bosim va kinetik energiya'],
    ['n', 'konsentratsiya'],
    ['v̄', 'o‘rtacha kvadratik tezlik'],
    ['manometr', 'bosimni o‘lchaydi'],
  ],
  quiz: [
    Q('Ideal gazda nima hisobga olinmaydi?', ['molekulalar orasidagi ta’sir kuchlari', 'molekulalar harakati', 'molekulalar massasi', 'devorga urilish']),
    Q('Gaz bosimining sababi?', ['molekulalarning devorga urilishi', 'gazning og‘irligi', 'idish rangi', 'havo namligi']),
    Q('MKN asosiy tenglamasi?', ['p = ⅓·n·m₀·v̄²', 'p = m·g', 'p = F·S', 'p = ρ·g·h']),
    Q('Konsentratsiya 2 marta ortsa, bosim?', ['2 marta ortadi', '2 marta kamayadi', '4 marta ortadi', 'o‘zgarmaydi']),
    Q('Tezlik 2 marta ortsa (p = ⅓ρv̄²), bosim?', ['4 marta ortadi', '2 marta ortadi', 'o‘zgarmaydi', '8 marta ortadi']),
    Q('Qanday gaz idealga yaqin?', ['siyrak gaz', 'juda zich gaz', 'suyuqlik', 'qattiq jism']),
    Q('ρ = 1,5 kg/m³, p = 180 kPa bo‘lsa, v̄ = ?', ['600 m/s', '360 m/s', '300 m/s', '1200 m/s']),
  ],
  sort: {
    categories: ['Ideal gaz modeli', 'Real gaz'],
    items: [
      { text: 'molekula — nuqta', cat: 0 }, { text: 'tortishish yo‘q', cat: 0 }, { text: 'faqat urilishda ta’sirlashadi', cat: 0 },
      { text: 'molekulalar o‘lchamga ega', cat: 1 }, { text: 'kichik tortishish bor', cat: 1 }, { text: 'tabiatda uchraydi', cat: 1 },
    ],
  },
  qa: [
    { q: 'Ideal gaz qanday gaz?', a: 'Molekulalari nuqta deb qaraladigan va o‘zaro ta’siri hisobga olinmaydigan gaz.' },
    { q: 'Real gazning ideal gazdan farqi?', a: 'Real gaz molekulalari orasida ta’sir kuchlari bor.' },
    { q: 'Gaz bosimi qaysi kattaliklarga bog‘liq?', a: 'Konsentratsiya, molekula massasi va o‘rtacha kvadratik tezlikka.' },
    { q: 'Nega shar teshilsa, puchayib qoladi?', a: 'Molekulalar chiqib ketadi, ichkarida konsentratsiya va bosim kamayadi.' },
  ],
  odd: [
    { items: ['bosim', 'konsentratsiya', 'tezlik', 'rang'], answer: 3, why: 'Rang gaz bosimi formulasida qatnashmaydi.' },
    { items: ['p = ⅓nm₀v̄²', 'p = ⅔nĒ', 'p = ⅓ρv̄²', 'F = ma'], answer: 3, why: 'F = ma — Nyuton qonuni, MKN tenglamasi emas.' },
  ],
  debate: [
    { claim: 'Ideal gaz modeli foydali, garchi tabiatda bunday gaz bo‘lmasa ham', pro: 'Hisoblash oson va siyrak gazlar uchun natija juda aniq chiqadi.', con: 'Juda zich gazlar va past haroratda model xato beradi.' },
  ],
  units: [
    Q('180 kPa = ? Pa', ['180 000 Pa', '18 000 Pa', '1800 Pa', '180 Pa']),
    Q('7,2 kPa = ? Pa', ['7200 Pa', '720 Pa', '72 Pa', '72 000 Pa']),
    Q('0,4 MPa = ? kPa', ['400 kPa', '40 kPa', '4000 kPa', '4 kPa']),
    Q('1 Pa = ?', ['1 N/m²', '1 N·m', '1 kg/m³', '1 J/s']),
    Q('1 J = ?', ['1 N·m', '1 N/m²', '1 kg·m', '1 W/s']),
    Q('72 km/soat = ? m/s', ['20 m/s', '72 m/s', '7,2 m/s', '36 m/s']),
  ],
};

/* ---------- 6-§ ---------- */
const F6 = {
  id: 'fz9-06',
  source: `${SRC} • 6-§ • 21–24-betlar`,
  title: 'Temperatura',
  short: 'Issiqlik muvozanati, Selsiy va Kelvin shkalalari, absolyut nol, Bolsman doimiysi',
  theme: { emoji: '🌡️', grad: 'from-rose-800 via-red-500 to-amber-400', border: 'border-rose-200', tag: 'Fizika • 9-sinf • 6-§' },
  lesson: [
    {
      title: 'Temperatura nima?',
      emoji: '🌡️',
      text: '«Temperatura» lotincha «holat» degan ma’noni bildiradi. Issiq choyning temperaturasi yuqori, muzli suvniki past.',
      rule: 'Temperatura — moddaning issiqlik darajasini son bilan ifodalaydigan fizik kattalik.',
      ruleLabel: 'Ta’rif',
      reveal: [
        { q: 'Barmog‘imiz bilan haroratni aniq o‘lchasak bo‘ladimi?', a: 'Yo‘q. Sezgi aldaydi: sovuq qo‘l iliq suvni issiq deb sezadi. Shuning uchun termometr kerak.' },
      ],
    },
    {
      title: 'Issiqlik muvozanati',
      emoji: '⚖️',
      text: 'Stolga qo‘yilgan issiq choy biroz vaqtdan keyin xona haroratiga keladi. Termometr ham tana bilan bir xil haroratga kelgandan keyingina to‘g‘ri ko‘rsatadi.',
      rule: 'Jismlar orasida issiqlik almashinishi natijasida ularning haroratlari tenglashishi — issiqlik muvozanati.',
      ruleLabel: 'Ta’rif',
      list: ['Issiqlik doim issiq jismdan sovuq jismga o‘tadi.', 'Haroratlar tenglashganda issiqlik almashinuvi to‘xtaydi.', 'Muvozanatdagi sistemaning hamma qismida harorat bir xil.'],
    },
    {
      title: 'Virtual laboratoriya: issiqlik muvozanati',
      emoji: '🧪',
      lab: {
        kind: 'equilibrium',
        title: 'Issiq va sovuq suvning haroratlari tenglashishi',
        goal: 'Issiq suvli stakan sovuq suvga qo‘yilganda ikkala suvning harorati vaqt o‘tishi bilan qanday o‘zgarishini kuzatish.',
        tools: [
          { e: '🌡️', n: '2 ta termometr', ok: true, why: 'ikkala suv haroratini o‘lchaydi' },
          { e: '🥛', n: 'Kichik stakan', ok: true, why: 'issiq suv uchun' },
          { e: '🪣', n: 'Katta idish', ok: true, why: 'sovuq suv uchun' },
          { e: '⏱️', n: 'Sekundomer', ok: true, why: 'vaqtni o‘lchaydi' },
          { e: '⚖️', n: 'Tarozi', ok: true, why: 'suv massasini o‘lchaydi' },
          { e: '🧲', n: 'Magnit', ok: false, why: 'kerak emas' },
          { e: '🔋', n: 'Batareya', ok: false, why: 'kerak emas' },
          { e: '🔦', n: 'Fonar', ok: false, why: 'kerak emas' },
        ],
        steps: ['Issiq va sovuq suvning massasi va haroratini tanlang.', 'Stakanni idishga qo‘ying.', 'Har 10 soniyada termometrlar ko‘rsatkichi yoziladi.', 'Grafikda ikki chiziqni kuzating.'],
        cols: [{ k: 'time', l: 'Vaqt, s', f: (r) => `${r.time}` }, { k: 'hot', l: 'Issiq suv, °C', f: (r) => String(r.hot).replace('.', ',') }, { k: 'cold', l: 'Sovuq suv, °C', f: (r) => String(r.cold).replace('.', ',') }],
        graph: { title: 'Haroratlar tenglashmoqda', x: { k: 'time', l: 'vaqt, s', max: 120 }, ys: [{ k: 'hot', l: 'issiq suv', color: '#E2463F' }, { k: 'cold', l: 'sovuq suv', color: '#1D4ED8' }], zeroY: false },
        minRows: 6,
        questions: [
          { q: 'Ikki chiziq qayerga intiladi?', a: 'Bitta umumiy haroratga — issiqlik muvozanatiga.' },
          { q: 'Issiqlik qaysi suvdan qaysi suvga o‘tdi?', a: 'Issiq suvdan sovuq suvga.' },
          { q: 'Muvozanat harorati qanday topiladi (yo‘qotishsiz)?', a: 'θ = (m₁t₁ + m₂t₂) / (m₁ + m₂).' },
          { q: 'Nega oxirida harorat biroz pasayib boradi?', a: 'Idish atrofdagi havoga ham ozgina issiqlik beradi.' },
        ],
        conclusion: 'Issiq va sovuq jism tegib tursa, issiqlik issiq jismdan sovuq jismga o‘tadi va haroratlar tenglashadi. Bu holat issiqlik muvozanati deyiladi.',
      },
    },
    {
      title: 'Selsiy shkalasi',
      emoji: '🧊',
      text: '1742-yilda shved olimi Anders Selsiy shkala taklif qildi: muz erishi — 0 gradus, suv qaynashi — 100 gradus. Oraliq 100 ta teng bo‘lakka bo‘lingan. «Gradus» lotincha «qadam» degani.',
      table: {
        head: ['Termometr', 'Shkala oralig‘i'],
        rows: [
          ['Suv termometri', '0 °C … 100 °C'],
          ['Tibbiyot termometri', '35 °C … 42 °C'],
          ['Havo termometri', '−20 °C … 50 °C'],
        ],
      },
    },
    {
      title: 'Kelvin shkalasi va absolyut nol',
      emoji: '❄️',
      text: '1848-yilda ingliz olimi Uilyam Tomson (lord Kelvin) absolyut temperatura shkalasini taklif qildi. Uning noli — mumkin bo‘lgan eng past temperatura.',
      rule: 'T = t + 273',
      ruleLabel: 'Selsiydan Kelvinga o‘tish',
      facts: [
        { n: '0 K', l: '= −273 °C, absolyut nol' },
        { n: '273 K', l: '= 0 °C, muz eriydi' },
        { n: '373 K', l: '= 100 °C, suv qaynaydi' },
      ],
      note: 'Absolyut nolda molekulalarning issiqlik harakati to‘xtaydi. Undan past temperatura bo‘lmaydi. ΔT = Δt: 1 K ga isish 1 °C ga isish bilan bir xil.',
    },
    {
      title: 'Simulyatsiya: ikki shkala yonma-yon',
      emoji: '📏',
      text: 'Slayderni suring va ikki termometrni solishtiring. Absolyut nolga yetganda molekulalarga nima bo‘ladi?',
      sim: { kind: 'thermo' },
    },
    {
      title: 'Temperatura — energiya o‘lchovi',
      emoji: '🔥',
      text: 'Modda qizisa, molekulalar tezroq harakatlanadi. Bu tartibsiz harakat issiqlik harakati deyiladi.',
      rule: 'Ē = (3/2) · k · T,   k = 1,38·10⁻²³ J/K — Bolsman doimiysi',
      ruleLabel: 'Temperatura va kinetik energiya',
      cards: [
        { e: '🧮', t: 'p = n · k · T', d: 'Ideal gaz bosimi konsentratsiya va absolyut temperaturaga to‘g‘ri proporsional.' },
        { e: '⚛️', t: 'Bolsman doimiysi', d: 'Energiya birligi bilan temperatura birligini bog‘laydi. Avstriya fizigi L. Bolsman sharafiga nomlangan.' },
      ],
    },
    {
      title: 'Masala yechish va kalkulyator',
      emoji: '✍️',
      text: 'Hajmi 4 l idishdagi gaz bosimi 120 kPa. Molekulalarning ilgarilanma harakati to‘la kinetik energiyasi qancha?',
      steps: [
        { e: '1', t: 'Formula', d: 'p = ⅔·n·Ē = ⅔·(N/V)·Ē, demak E_to‘la = N·Ē = (3/2)·p·V' },
        { e: '2', t: 'Hisob', d: 'E = 1,5 · 120 000 · 4·10⁻³ = 720 J' },
      ],
      calc: {
        items: [
          { name: 'T = t + 273', formula: 'T = t + 273', vars: [{ k: 't', l: 'Selsiy bo‘yicha t', u: '°C', v: '27' }], out: { s: 'T', l: 'Absolyut temperatura', u: 'K', digits: 4 }, f: (x) => x.t + 273 },
          { name: 'Ē = 3/2·kT', formula: 'Ē = (3/2) · k · T', vars: [{ k: 'T', l: 'Temperatura T', u: 'K', v: '300' }], out: { s: 'Ē', l: 'O‘rtacha kinetik energiya', u: 'J' }, f: (x) => 1.5 * K * x.T },
          { name: 'p = nkT', formula: 'p = n · k · T', vars: [{ k: 'n', l: 'Konsentratsiya n', u: 'm⁻³', v: '3·10^25' }, { k: 'T', l: 'Temperatura T', u: 'K', v: '333' }], out: { s: 'p', l: 'Bosim', u: 'Pa' }, f: (x) => x.n * K * x.T },
          { name: 'n = p/(kT)', formula: 'n = p / (k · T)', vars: [{ k: 'p', l: 'Bosim p', u: 'Pa', v: '276000' }, { k: 'T', l: 'Temperatura T', u: 'K', v: '400' }], out: { s: 'n', l: 'Konsentratsiya', u: 'm⁻³' }, f: (x) => x.p / (K * x.T) },
          { name: 'E = 3/2·pV', formula: 'E = (3/2) · p · V', vars: [{ k: 'p', l: 'Bosim p', u: 'Pa', v: '120000' }, { k: 'V', l: 'Hajm V', u: 'm³', v: '4·10^-3' }], out: { s: 'E', l: 'To‘la kinetik energiya', u: 'J' }, f: (x) => 1.5 * x.p * x.V },
        ],
      },
    },
    {
      title: 'O‘zingiz yeching',
      emoji: '🏆',
      reveal: [
        { q: '−73 °C va 127 °C ni Kelvinda yozing.', a: '200 K va 400 K' },
        { q: '300 K va 773 K ni Selsiyda yozing.', a: '27 °C va 500 °C' },
        { q: 'n = 3·10²⁵ m⁻³, t = 60 °C. Bosim?', a: 'p = nkT = 3·10²⁵ · 1,38·10⁻²³ · 333 ≈ 1,38·10⁵ Pa ≈ 138 kPa' },
        { q: 'T = 400 K, p = 276 kPa. Konsentratsiya?', a: 'n = p/(kT) = 276 000 : (1,38·10⁻²³ · 400) = 5·10²⁵ m⁻³' },
      ],
      mission: { t: 'Uyga vazifa', d: 'Darslikdagi 5-mashqning 1, 2, 4-masalalarini yeching. Uyda termometr bilan choy qanday sovishini har 2 daqiqada o‘lchab, jadval tuzing.', sec: 0 },
    },
  ],
  pairs: [
    ['0 K', '−273 °C'],
    ['273 K', '0 °C'],
    ['373 K', '100 °C'],
    ['300 K', '27 °C'],
    ['k', '1,38·10⁻²³ J/K'],
    ['Selsiy', 'shved olimi, 1742'],
    ['Kelvin', 'absolyut shkala, 1848'],
  ],
  quiz: [
    Q('Selsiydan Kelvinga o‘tish formulasi?', ['T = t + 273', 'T = t − 273', 'T = 273 − t', 'T = t · 273']),
    Q('Absolyut nol Selsiy bo‘yicha?', ['−273 °C', '0 °C', '−100 °C', '−373 °C']),
    Q('Absolyut nolda nima bo‘ladi?', ['molekulalarning issiqlik harakati to‘xtaydi', 'suv qaynaydi', 'bosim cheksiz bo‘ladi', 'molekulalar tezlashadi']),
    Q('Bolsman doimiysi?', ['1,38·10⁻²³ J/K', '6,02·10²³ mol⁻¹', '8,31 J/(mol·K)', '9,8 m/s²']),
    Q('Ē = ? (temperatura orqali)', ['(3/2)kT', 'kT/2', '3kT', '2kT/3']),
    Q('Issiqlik qaysi jismdan qaysi jismga o‘tadi?', ['issiqdan sovuqqa', 'sovuqdan issiqqa', 'kattadan kichikka', 'og‘irdan yengilga']),
    Q('100 °C necha kelvin?', ['373 K', '100 K', '273 K', '173 K']),
    Q('Ideal gaz bosimi formulasi?', ['p = nkT', 'p = kT/n', 'p = n/kT', 'p = mgh']),
  ],
  sort: {
    categories: ['Selsiy (°C)', 'Kelvin (K)'],
    items: [
      { text: '−273 °C', cat: 0 }, { text: '0 °C', cat: 0 }, { text: '36,6 °C', cat: 0 }, { text: 't harfi bilan', cat: 0 },
      { text: '0 K', cat: 1 }, { text: '273 K', cat: 1 }, { text: 'T harfi bilan', cat: 1 }, { text: 'manfiy qiymat yo‘q', cat: 1 },
    ],
  },
  qa: [
    { q: 'Issiqlik muvozanati nima?', a: 'Issiqlik almashinishi natijasida jismlar haroratining tenglashishi.' },
    { q: 'Kelvin shkalasida manfiy harorat bormi?', a: 'Yo‘q, eng past qiymat — 0 K.' },
    { q: 'Temperatura molekulalar bilan qanday bog‘langan?', a: 'Temperatura — molekulalar o‘rtacha kinetik energiyasining o‘lchovi: Ē = (3/2)kT.' },
    { q: 'Termometr nega darhol to‘g‘ri ko‘rsatmaydi?', a: 'Termometr va jism orasida issiqlik muvozanati qaror topishi uchun vaqt kerak.' },
    { q: 'Gaz 27 °C dan 627 °C gacha qizdirilsa, bosim necha marta ortadi?', a: 'T 300 K dan 900 K ga — 3 marta ortadi.' },
  ],
  odd: [
    { items: ['0 K', '273 K', '373 K', '−10 K'], answer: 3, why: 'Kelvin shkalasida manfiy qiymat bo‘lmaydi.' },
    { items: ['Selsiy', 'Kelvin', 'Bolsman', 'Pifagor'], answer: 3, why: 'Pifagor — matematik, qolganlari issiqlik hodisalarini o‘rgangan.' },
  ],
  sequences: [
    { title: 'Haroratning ortib borishi', items: ['absolyut nol (0 K)', 'suyuq azot qaynashi (77 K)', 'muz erishi (273 K)', 'odam tanasi (310 K)', 'suv qaynashi (373 K)'] },
  ],
  creative: [
    { task: '«Agar dunyoda absolyut nol bo‘lib qolsa…» mavzusida 1 daqiqalik qisqa hikoya o‘ylab, gapirib bering.', time: 60 },
  ],
  units: [
    Q('0 °C = ? K', ['273 K', '0 K', '100 K', '−273 K']),
    Q('27 °C = ? K', ['300 K', '246 K', '273 K', '327 K']),
    Q('127 °C = ? K', ['400 K', '146 K', '273 K', '500 K']),
    Q('−73 °C = ? K', ['200 K', '346 K', '73 K', '−200 K']),
    Q('300 K = ? °C', ['27 °C', '573 °C', '300 °C', '−27 °C']),
    Q('773 K = ? °C', ['500 °C', '1046 °C', '773 °C', '400 °C']),
    Q('4 l = ? m³', ['4·10⁻³ m³', '4 m³', '0,4 m³', '4·10⁻⁶ m³']),
  ],
};

/* ---------- 7-§ ---------- */
const F7 = {
  id: 'fz9-07',
  source: `${SRC} • 7-§ • 25–27-betlar`,
  title: 'Gaz molekulalarining harakat tezligi',
  short: 'v̄ = √(3RT/M), universal gaz doimiysi, Maksvell taqsimoti, Shtern tajribasi',
  theme: { emoji: '🚀', grad: 'from-violet-900 via-purple-600 to-fuchsia-400', border: 'border-violet-200', tag: 'Fizika • 9-sinf • 7-§' },
  lesson: [
    {
      title: 'Molekulalar qanchalik tez uchadi?',
      emoji: '🚀',
      vs: {
        q: 'Xona havosidagi kislorod molekulasi qanday tezlikda harakatlanadi?',
        a: { t: 'Velosipeddek — 5 m/s atrofida', pts: ['hid sekin tarqaladi-ku'] },
        b: { t: 'Samolyotdan ham tez — 500 m/s atrofida', pts: ['molekulalar juda yengil'] },
      },
      reveal: [{ q: 'To‘g‘ri javob?', a: 'Taxminan 480 m/s! Hid sekin tarqalishiga sabab — molekulalar yo‘lda son-sanoqsiz to‘qnashadi.' }],
    },
    {
      title: 'Tezlik formulasini chiqaramiz',
      emoji: '📐',
      steps: [
        { e: '1', t: 'Ikki ifodani tenglaymiz', d: 'm₀v̄²/2 = (3/2)kT' },
        { e: '2', t: 'Tezlik kvadrati', d: 'v̄² = 3kT / m₀' },
        { e: '3', t: 'm₀ = M / N_A ni qo‘yamiz', d: 'v̄² = 3kN_A·T / M' },
        { e: '4', t: 'R = k·N_A', d: 'v̄ = √(3RT / M)' },
      ],
      rule: 'R = k · N_A = 8,31 J/(mol·K) — universal (molyar) gaz doimiysi',
      ruleLabel: 'Yangi doimiy',
    },
    {
      title: 'Turli gazlar — turli tezlik',
      emoji: '🎈',
      table: {
        head: ['Gaz (300 K da)', 'M, g/mol', 'v̄, m/s'],
        rows: [
          ['Vodorod H₂', '2', '≈ 1930'],
          ['Geliy He', '4', '≈ 1370'],
          ['Azot N₂', '28', '≈ 520'],
          ['Kislorod O₂', '32', '≈ 480'],
          ['Karbonat angidrid CO₂', '44', '≈ 410'],
        ],
      },
      note: 'Molekula qancha yengil bo‘lsa, shuncha tez harakatlanadi. Harorat 4 marta ortsa, tezlik 2 marta ortadi.',
    },
    {
      title: 'Maksvell taqsimoti',
      emoji: '📊',
      text: '1859-yilda ingliz fizigi J. Maksvell gaz molekulalarining hammasi bir xil tezlikda harakatlanmasligini nazariy yo‘l bilan aniqladi: ozroq molekula juda sekin, ozroq molekula juda tez, ko‘pchiligi esa o‘rtacha tezlikda harakatlanadi.',
      sim: { kind: 'maxwell' },
      list: ['Gazni almashtiring: vodorod egri chizig‘i o‘ngga cho‘ziladi.', 'Haroratni oshiring: egri chiziq pasayib, kengayadi.', 'Qizil chiziq (o‘rtacha kvadratik tezlik) doim eng ko‘p uchraydigan tezlikdan biroz o‘ngda.'],
    },
    {
      title: 'Otto Shtern tajribasi (1920)',
      emoji: '🌀',
      text: 'Umumiy o‘qqa ega ikkita silindr. Markazdagi platina simga kumush yuritilgan. Simdan tok o‘tganda kumush bug‘lanadi va ichki silindrdagi tirqishdan chiqib, tashqi silindrga o‘tiradi. Silindrlar havosi so‘rib olinadi (vakuum).',
      steps: [
        { e: '⏸️', t: 'Silindrlar aylanmasa', d: 'Kumush roppa-rosa tirqish qarshisiga — b nuqtaga o‘tiradi.' },
        { e: '🔄', t: 'Silindrlar aylansa', d: 'Atom uchib borguncha silindr buriladi — kumush orqaroqqa, kengroq bc yo‘lak bo‘lib o‘tiradi.' },
        { e: '📏', t: 'Siljishni o‘lchab', d: 'v = ω·R·(R − r) / s formula bilan atomlar tezligi topiladi.' },
      ],
    },
    {
      title: 'Simulyatsiya: Shtern qurilmasi',
      emoji: '🌀',
      sim: { kind: 'stern' },
      reveal: [
        { q: 'Nega kumush qatlami ingichka chiziq emas, keng yo‘lak bo‘ladi?', a: 'Atomlarning tezliklari har xil: tezlari b ga yaqinroq, sekinlari uzoqroqqa tushadi.' },
        { q: 'Qatlam shakli nimaga o‘xshaydi?', a: 'Maksvell taqsimoti grafigiga. Shtern tajribasi Maksvell nazariyasini tasdiqladi.' },
      ],
    },
    {
      title: 'Virtual laboratoriya: Shtern tajribasi',
      emoji: '🧪',
      lab: {
        kind: 'stern',
        title: 'Kumush atomlarining tezligini o‘lchash',
        goal: 'Turli burchak tezliklarda kumush qatlamining siljishini o‘lchab, atomlar tezligini hisoblash va nazariya bilan solishtirish.',
        tools: [
          { e: '🌀', n: 'Ikki silindrli qurilma', ok: true, why: 'tajribaning asosi' },
          { e: '🧵', n: 'Kumush yuritilgan platina sim', ok: true, why: 'kumush atomlari manbai' },
          { e: '🔌', n: 'Tok manbai', ok: true, why: 'simni qizdiradi' },
          { e: '💨', n: 'Vakuum nasos', ok: true, why: 'havoni so‘rib oladi, atomlar to‘qnashmaydi' },
          { e: '📏', n: 'O‘lchov chizg‘ichi', ok: true, why: 'siljishni o‘lchaydi' },
          { e: '🧊', n: 'Muz', ok: false, why: 'kerak emas' },
          { e: '🧲', n: 'Magnit', ok: false, why: 'kerak emas' },
          { e: '⚖️', n: 'Tarozi', ok: false, why: 'kerak emas' },
        ],
        steps: ['ω va sim haroratini tanlang.', 'Kumush qatlami yig‘ilishini kuting.', 'Siljish s ni o‘qib, jadvalga yozing.', '3–4 xil ω da takrorlang.'],
        cols: [
          { k: 'omega', l: 'ω, rad/s', f: (r) => `${r.omega}` },
          { k: 'T', l: 'T, K', f: (r) => `${r.T}` },
          { k: 's', l: 's, sm', f: (r) => (r.s * 100).toFixed(2).replace('.', ',') },
          { k: 'v', l: 'v tajriba, m/s', f: (r) => `${Math.round(r.v)}` },
          { k: 'vt', l: 'v nazariya, m/s', f: (r) => `${Math.round(r.vt)}` },
        ],
        graph: { title: 'Siljish burchak tezlikka bog‘liq', x: { k: 'omega', l: 'ω, rad/s', max: 400 }, ys: [{ k: 'scm', l: 's, sm' }], lines: false },
        minRows: 3,
        questions: [
          { q: 'ω 2 marta ortsa, siljish s qanday o‘zgaradi?', a: 'Taxminan 2 marta ortadi.' },
          { q: 'Tajriba va nazariya natijalari yaqinmi?', a: 'Ha, bir xil tartibdagi qiymatlar (yuzlab m/s) chiqadi.' },
          { q: 'Nega silindrlar ichida vakuum bo‘lishi shart?', a: 'Aks holda kumush atomlari havo molekulalariga urilib, yo‘lidan chetga chiqadi.' },
        ],
        conclusion: 'Shtern tajribasi gaz molekulalarining tezligini bevosita o‘lchash mumkinligini va MKN hamda Maksvell nazariyasi to‘g‘riligini isbotladi.',
      },
    },
    {
      title: 'Masala va kalkulyator',
      emoji: '✍️',
      text: 'Massasi 2·10⁻²⁶ kg bo‘lgan uglerod atomining kinetik energiyasi 2,5·10⁻²¹ J. Uning tezligi qanday?',
      steps: [{ e: '✓', t: 'Yechim', d: 'v = √(2E / m₀) = √(2 · 2,5·10⁻²¹ : 2·10⁻²⁶) = √250 000 = 500 m/s' }],
      calc: {
        items: [
          { name: 'v̄ = √(3RT/M)', formula: 'v̄ = √(3 · R · T / M)', vars: [{ k: 'T', l: 'Temperatura T', u: 'K', v: '300' }, { k: 'M', l: 'Molyar massa M', u: 'kg/mol', v: '0,032' }], out: { s: 'v̄', l: 'O‘rtacha kvadratik tezlik', u: 'm/s' }, f: (x) => Math.sqrt((3 * R * x.T) / x.M) },
          { name: 'v = √(2E/m₀)', formula: 'v = √(2E / m₀)', vars: [{ k: 'E', l: 'Kinetik energiya E', u: 'J', v: '2,5·10^-21' }, { k: 'm0', l: 'Massa m₀', u: 'kg', v: '2·10^-26' }], out: { s: 'v', l: 'Tezlik', u: 'm/s' }, f: (x) => Math.sqrt((2 * x.E) / x.m0) },
          { name: 'T = Mv̄²/(3R)', formula: 'T = M · v̄² / (3R)', vars: [{ k: 'M', l: 'Molyar massa M', u: 'kg/mol', v: '0,032' }, { k: 'v', l: 'Tezlik v̄', u: 'm/s', v: '500' }], out: { s: 'T', l: 'Temperatura', u: 'K' }, f: (x) => (x.M * x.v * x.v) / (3 * R) },
        ],
      },
    },
    {
      title: 'Savollarga javob bering',
      emoji: '🧠',
      reveal: [
        { q: 'Havoda kislorod yoki vodorod molekulasi tezroq?', a: 'Vodorod — u 16 marta yengil, tezligi 4 marta katta.' },
        { q: 'T ikki marta ortsa, o‘rtacha kinetik energiya?', a: '2 marta ortadi (Ē = 3kT/2).' },
        { q: 'T to‘rt marta ortsa, o‘rtacha kvadratik tezlik?', a: '2 marta ortadi (v̄ ~ √T).' },
      ],
      mission: { t: 'Uyga vazifa', d: 'Kalkulyatordan foydalanmay, azot molekulasining 0 °C va 100 °C dagi tezligini hisoblang. Keyin kalkulyatorda tekshiring.', sec: 0 },
    },
  ],
  pairs: [
    ['R', '8,31 J/(mol·K)'],
    ['v̄ = √(3RT/M)', 'o‘rtacha kvadratik tezlik'],
    ['Maksvell', 'tezliklar taqsimoti (1859)'],
    ['Shtern', 'tezlikni tajribada o‘lchagan (1920)'],
    ['R = k·N_A', 'universal gaz doimiysi'],
    ['vakuum', 'havosiz bo‘shliq'],
    ['H₂', 'eng tez molekula'],
  ],
  quiz: [
    Q('Universal gaz doimiysi?', ['8,31 J/(mol·K)', '1,38·10⁻²³ J/K', '6,02·10²³ mol⁻¹', '9,8 m/s²']),
    Q('O‘rtacha kvadratik tezlik formulasi?', ['v̄ = √(3RT/M)', 'v̄ = 3RT/M', 'v̄ = √(M/3RT)', 'v̄ = RT/3M']),
    Q('Qaysi gaz molekulasi 300 K da eng tez?', ['vodorod', 'kislorod', 'azot', 'karbonat angidrid']),
    Q('T to‘rt marta ortsa, v̄?', ['2 marta ortadi', '4 marta ortadi', '16 marta ortadi', 'o‘zgarmaydi']),
    Q('Gaz molekulalari tezligini tajribada kim o‘lchagan?', ['Otto Shtern', 'Maksvell', 'Broun', 'Avogadro']),
    Q('Shtern tajribasida silindrlar nega aylantiriladi?', ['atomlar tezligini o‘lchash uchun', 'kumushni sovutish uchun', 'havoni chiqarish uchun', 'yorug‘lik hosil qilish uchun']),
    Q('R qanday kattaliklar ko‘paytmasi?', ['k va N_A', 'k va T', 'N_A va M', 'p va V']),
    Q('Kislorodning 300 K dagi v̄ si taxminan?', ['480 m/s', '48 m/s', '4800 m/s', '5 m/s']),
  ],
  sort: {
    categories: ['Tezroq harakatlanadi', 'Sekinroq harakatlanadi'],
    items: [
      { text: 'vodorod (300 K)', cat: 0 }, { text: 'geliy (300 K)', cat: 0 }, { text: 'kislorod (1000 K)', cat: 0 },
      { text: 'karbonat angidrid (300 K)', cat: 1 }, { text: 'kislorod (100 K)', cat: 1 }, { text: 'azot (200 K)', cat: 1 },
    ],
  },
  qa: [
    { q: 'Universal gaz doimiysi qanday topiladi?', a: 'R = k · N_A = 8,31 J/(mol·K).' },
    { q: 'Maksvell taqsimoti nimani ko‘rsatadi?', a: 'Gaz molekulalari turli tezliklarda harakatlanishini: ko‘pchiligi o‘rtacha tezlikka yaqin.' },
    { q: 'Shtern tajribasi nimani tasdiqladi?', a: 'MKN va Maksvellning tezliklar taqsimoti haqidagi ta’limotini.' },
    { q: 'Nega yengil molekulalar tezroq?', a: 'Bir xil haroratda o‘rtacha kinetik energiya bir xil, massasi kichik bo‘lsa — tezligi katta.' },
  ],
  odd: [
    { items: ['Maksvell', 'Shtern', 'Bolsman', 'Nyuton'], answer: 3, why: 'Nyuton gazlar kinetik nazariyasi bilan shug‘ullanmagan.' },
    { items: ['vakuum', 'kumush', 'platina sim', 'termos'], answer: 3, why: 'Termos Shtern qurilmasining qismi emas.' },
  ],
  sequences: [
    { title: 'Shtern tajribasi', items: ['Silindrlardan havo so‘rib olinadi', 'Platina sim qizdiriladi', 'Kumush atomlari tirqishdan uchib chiqadi', 'Silindrlar aylantiriladi', 'Siljish o‘lchanib, tezlik hisoblanadi'] },
  ],
  creative: [
    { task: 'Vodorod va karbonat angidrid molekulalari o‘rtasida «tezlik musobaqasi» haqida 1 daqiqalik reportaj tayyorlang.', time: 60 },
  ],
  units: [
    Q('1 km/s = ? m/s', ['1000 m/s', '100 m/s', '10 m/s', '3,6 m/s']),
    Q('500 m/s = ? km/soat', ['1800 km/soat', '500 km/soat', '138 km/soat', '5000 km/soat']),
    Q('32 g/mol = ? kg/mol', ['0,032 kg/mol', '32 000 kg/mol', '3,2 kg/mol', '0,32 kg/mol']),
    Q('1,12 sm = ? m', ['1,12·10⁻² m', '1,12·10⁻³ m', '0,112 m', '112 m']),
    Q('−23 °C = ? K', ['250 K', '296 K', '23 K', '−250 K']),
  ],
};

/* ---------- 8-§ ---------- */
const F8 = {
  id: 'fz9-08',
  source: `${SRC} • 8-§ • 28–29-betlar`,
  title: 'Masalalar yechish (tezlik va temperatura)',
  short: 'Shtern tajribasi masalasi, vodorod va geliy, temperatura o‘zgarishi',
  theme: { emoji: '🧮', grad: 'from-indigo-900 via-blue-700 to-violet-400', border: 'border-indigo-200', tag: 'Fizika • 9-sinf • 8-§' },
  lesson: [
    {
      title: 'Kerakli formulalar',
      emoji: '📋',
      table: {
        head: ['Nima topiladi', 'Formula'],
        rows: [
          ['O‘rtacha kvadratik tezlik', 'v̄ = √(3RT / M)'],
          ['O‘rtacha kinetik energiya', 'Ē = (3/2)kT'],
          ['Bosim', 'p = ⅔nĒ = nkT'],
          ['Shtern: siljish', 's = ω·R·Δt'],
          ['Shtern: tezlik', 'v = ω·R·(R − r) / s'],
          ['Tezliklar nisbati', 'v₂ / v₁ = √(T₂ / T₁)'],
        ],
      },
    },
    {
      title: '1-masala: Shtern tajribasi',
      emoji: '🌀',
      text: 'Sim 1500 K gacha qiziydi. ω = 280 rad/s da kumush qatlami 1,12 sm ga siljidi. r = 1,2 sm, R = 16 sm. Tezlikni toping va nazariya bilan solishtiring.',
      steps: [
        { e: '1', t: 'Tajribadan', d: 'v = ω·R·(R − r)/s = 280 · 0,16 · 0,148 : 0,0112 ≈ 592 m/s' },
        { e: '2', t: 'Nazariyadan', d: 'v̄ = √(3RT/M) = √(3 · 8,31 · 1500 : 0,108) ≈ 588 m/s' },
        { e: '✓', t: 'Xulosa', d: 'Ikki natija deyarli bir xil — nazariya tajribada tasdiqlandi.' },
      ],
      calc: {
        items: [
          { name: 'Shtern: v', formula: 'v = ω · R · (R − r) / s', vars: [{ k: 'w', l: 'ω', u: 'rad/s', v: '280' }, { k: 'R', l: 'Tashqi radius R', u: 'm', v: '0,16' }, { k: 'r', l: 'Ichki radius r', u: 'm', v: '0,012' }, { k: 's', l: 'Siljish s', u: 'm', v: '0,0112' }], out: { s: 'v', l: 'Atomlar tezligi', u: 'm/s' }, f: (x) => (x.w * x.R * (x.R - x.r)) / x.s },
          { name: 'v̄ = √(3RT/M)', formula: 'v̄ = √(3RT / M)', vars: [{ k: 'T', l: 'Temperatura T', u: 'K', v: '1500' }, { k: 'M', l: 'Molyar massa M', u: 'kg/mol', v: '0,108' }], out: { s: 'v̄', l: 'Nazariy tezlik', u: 'm/s' }, f: (x) => Math.sqrt((3 * R * x.T) / x.M) },
        ],
      },
    },
    {
      title: '2-masala: vodorod va geliy',
      emoji: '🎈',
      text: 'Qanday temperaturada vodorod molekulalarining tezligi 580 K dagi geliy molekulalarining tezligiga teng bo‘ladi?',
      steps: [
        { e: '1', t: 'Tenglik', d: '√(3RT₁/M₁) = √(3RT₂/M₂)  ⇒  T₁/M₁ = T₂/M₂' },
        { e: '2', t: 'Javob', d: 'T₁ = T₂ · M₁/M₂ = 580 · 2/4 = 290 K' },
      ],
    },
    {
      title: '3-masala: tezlik 2 marta ortdi',
      emoji: '📈',
      text: 'Gaz harorati 150 K ga oshirilganda molekulalar tezligi 250 m/s dan 500 m/s ga ortdi. Dastlabki harorat qancha?',
      steps: [
        { e: '1', t: 'Nisbat', d: 'v₂/v₁ = 2  ⇒  T₂/T₁ = 4  ⇒  T₂ = 4T₁' },
        { e: '2', t: 'Tenglama', d: 'T₁ + 150 = 4T₁  ⇒  3T₁ = 150' },
        { e: '3', t: 'Javob', d: 'T₁ = 50 K' },
      ],
    },
    {
      title: 'Simulyatsiyada tekshiramiz',
      emoji: '📊',
      text: 'Vodorodni 290 K va geliyni 580 K da solishtiring: «Egri chiziqni saqlab, solishtirish» tugmasidan foydalaning. Qizil chiziqlar bir joyga tushadimi?',
      sim: { kind: 'maxwell', gas: 'He', T: 600 },
    },
    {
      title: 'Jamoaviy masala poygasi',
      emoji: '🏁',
      reveal: [
        { q: 'Vodorodning −23 °C dagi o‘rtacha kvadratik tezligi?', a: 'T = 250 K; v̄ = √(3 · 8,31 · 250 : 0,002) ≈ 1765 m/s' },
        { q: 'Qanday haroratda kislorod tezligi 500 m/s bo‘ladi?', a: 'T = Mv̄²/(3R) = 0,032 · 250 000 : 24,93 ≈ 321 K' },
        { q: 'Ē = 9,52·10⁻²¹ J bo‘lgan gazning harorati?', a: 'T = 2Ē/(3k) = 2 · 9,52·10⁻²¹ : (3 · 1,38·10⁻²³) ≈ 460 K' },
        { q: '2 mol gaz 10 kPa bosimda, 300 K da qancha hajm egallaydi?', a: 'V = νRT/p = 2 · 8,31 · 300 : 10 000 ≈ 0,5 m³' },
      ],
      mission: { t: 'Poyga qoidasi', d: 'Har jamoa bitta masalani yechadi. 3 daqiqada to‘g‘ri yechgan jamoa 10 ball oladi. Yechimni doskada tushuntirsa, yana 5 ball.', sec: 180 },
    },
    {
      title: 'Kalkulyator: harorat va energiya',
      emoji: '🧮',
      calc: {
        items: [
          { name: 'T = 2Ē/(3k)', formula: 'T = 2Ē / (3k)', vars: [{ k: 'E', l: 'O‘rtacha kinetik energiya Ē', u: 'J', v: '9,52·10^-21' }], out: { s: 'T', l: 'Temperatura', u: 'K' }, f: (x) => (2 * x.E) / (3 * K) },
          { name: 'T₁ = T₂·M₁/M₂', formula: 'T₁ = T₂ · M₁ / M₂', vars: [{ k: 'T2', l: 'Ikkinchi gaz harorati T₂', u: 'K', v: '580' }, { k: 'M1', l: 'Birinchi gaz M₁', u: 'g/mol', v: '2' }, { k: 'M2', l: 'Ikkinchi gaz M₂', u: 'g/mol', v: '4' }], out: { s: 'T₁', l: 'Izlangan harorat', u: 'K' }, f: (x) => (x.T2 * x.M1) / x.M2 },
          { name: 'Ē = 3p/(2n)', formula: 'Ē = 3p / (2n)', vars: [{ k: 'p', l: 'Bosim p', u: 'Pa', v: '1,6·10^5' }, { k: 'n', l: 'Konsentratsiya n', u: 'm⁻³', v: '4·10^25' }], out: { s: 'Ē', l: 'O‘rtacha kinetik energiya', u: 'J' }, f: (x) => (3 * x.p) / (2 * x.n) },
        ],
      },
    },
  ],
  pairs: [
    ['v₂/v₁ = 2', 'T₂/T₁ = 4'],
    ['T₁/M₁ = T₂/M₂', 'tezliklar teng bo‘lsa'],
    ['290 K', 'vodorod (2-masala javobi)'],
    ['50 K', '3-masala javobi'],
    ['592 m/s', 'Shtern tajribasidagi tezlik'],
    ['0,108 kg/mol', 'kumushning molyar massasi'],
  ],
  quiz: [
    Q('Tezlik 2 marta ortishi uchun T necha marta ortishi kerak?', ['4 marta', '2 marta', '8 marta', '√2 marta']),
    Q('Shtern tajribasida tezlik formulasi?', ['v = ωR(R − r)/s', 'v = s/t', 'v = ωR', 'v = √(3RT/M)']),
    Q('Vodorod (M = 2) va geliy (M = 4) tezliklari teng bo‘lsa, T_H : T_He = ?', ['1 : 2', '2 : 1', '1 : 4', '1 : 1']),
    Q('Ē = 3kT/2 dan T = ?', ['2Ē/(3k)', '3Ē/(2k)', 'Ē/k', '2k/(3Ē)']),
    Q('−23 °C necha kelvin?', ['250 K', '296 K', '−250 K', '23 K']),
    Q('Shtern tajribasidagi tezlik nazariy qiymatga yaqinmi?', ['ha, juda yaqin', 'yo‘q, 10 marta farq qiladi', 'tajribada tezlik nolga teng', 'nazariya yo‘q']),
  ],
  sequences: [
    { title: '3-masalani yechish', items: ['Tezliklar nisbatini topish: 2', 'Haroratlar nisbati: 4', 'Tenglama tuzish: T₁ + 150 = 4T₁', 'Javob: T₁ = 50 K'] },
  ],
  qa: [
    { q: 'Kumushning molyar massasi?', a: '108 g/mol.' },
    { q: 'Harorat 9 marta ortsa, tezlik?', a: '3 marta ortadi.' },
    { q: 'Geliy 350 K dagi vodorodday tez bo‘lishi uchun qanday harorat kerak?', a: 'T = 350 · 4/2 = 700 K.' },
    { q: 'Tezlik 300 dan 600 m/s ga ortdi, harorat 150 K ga oshdi. T₁ = ?', a: 'T₂ = 4T₁, 3T₁ = 150 — T₁ = 50 K.' },
  ],
  odd: [
    { items: ['v̄ = √(3RT/M)', 'Ē = 3kT/2', 'p = nkT', 'P = UI'], answer: 3, why: 'P = UI — elektr quvvati formulasi.' },
  ],
  units: [
    Q('1,2 sm = ? m', ['0,012 m', '0,12 m', '1,2 m', '0,0012 m']),
    Q('16 sm = ? m', ['0,16 m', '1,6 m', '0,016 m', '16 m']),
    Q('108 g/mol = ? kg/mol', ['0,108 kg/mol', '1,08 kg/mol', '108 000 kg/mol', '10,8 kg/mol']),
    Q('150 °C ga isish necha kelvinga isish?', ['150 K', '423 K', '123 K', '273 K']),
    Q('2,4 MPa = ? Pa', ['2,4·10⁶ Pa', '2,4·10³ Pa', '2,4·10⁹ Pa', '240 Pa']),
  ],
};

/* ---------- 9-§ ---------- */
const F9 = {
  id: 'fz9-09',
  source: `${SRC} • 9-§ • 30–32-betlar`,
  title: 'Ideal gaz holatining tenglamalari',
  short: 'Mendeleyev–Klapeyron va Klapeyron tenglamalari: p, V, T bog‘lanishi',
  theme: { emoji: '🎛️', grad: 'from-teal-900 via-emerald-600 to-lime-400', border: 'border-emerald-200', tag: 'Fizika • 9-sinf • 9-§' },
  lesson: [
    {
      title: 'Gaz holatini nimalar belgilaydi?',
      emoji: '🎛️',
      text: 'Ma’lum massali gazning holati uchta makroskopik parametr bilan aniqlanadi. Gaz bir holatdan boshqasiga o‘tganda bu parametrlarning uchalasi ham o‘zgarishi mumkin.',
      cards: [
        { e: '🧭', t: 'Bosim p', d: 'paskal (Pa) — manometr bilan o‘lchanadi' },
        { e: '🫙', t: 'Hajm V', d: 'kubometr (m³) — idish hajmi' },
        { e: '🌡️', t: 'Temperatura T', d: 'kelvin (K) — termometr bilan' },
      ],
    },
    {
      title: 'Mendeleyev–Klapeyron tenglamasi',
      emoji: '⭐',
      steps: [
        { e: '1', t: 'Boshlanish', d: 'p = n·k·T,  n = N/V' },
        { e: '2', t: 'N = (m/M)·N_A', d: 'pV = (m/M)·N_A·k·T' },
        { e: '3', t: 'k·N_A = R', d: 'pV = (m/M)·R·T' },
      ],
      rule: 'pV = (m / M) · R · T   yoki   pV = ν · R · T',
      ruleLabel: 'Ideal gaz holat tenglamasi',
      note: 'Tenglamani rus olimi D. Mendeleyev va fransuz olimi B. Klapeyron keltirib chiqargan.',
    },
    {
      title: 'Klapeyron tenglamasi',
      emoji: '🔁',
      text: 'Gaz massasi o‘zgarmasa (m = const), uning ikki holati uchun tenglamani yozib, birini ikkinchisiga bo‘lamiz.',
      rule: 'p₁V₁ / T₁ = p₂V₂ / T₂   yoki   pV / T = const',
      ruleLabel: 'Klapeyron tenglamasi',
      reveal: [
        { q: '1 mol ideal gaz normal sharoitda (0 °C, 101 kPa) qancha hajm egallaydi?', a: 'V = RT/p = 8,31 · 273 : 101 325 ≈ 0,0224 m³ = 22,4 l' },
      ],
    },
    {
      title: 'Simulyatsiya: p, V va T ni o‘zgartiring',
      emoji: '🧪',
      text: 'Porshenni suring va haroratni o‘zgartiring. Bosim har doim pV = νRT tenglamasiga mos o‘zgaradi.',
      sim: { kind: 'gas', showN: false, graph: 'pV' },
    },
    {
      title: 'Virtual laboratoriya: pV/T o‘zgarmasmi?',
      emoji: '🧪',
      lab: {
        kind: 'gas',
        lock: ['N'],
        N: 60, V: 3, T: 300,
        title: 'Klapeyron tenglamasini tekshirish',
        goal: 'Gazning turli holatlarida p, V, T ni o‘lchab, pV/T ning o‘zgarmasligini tekshirish.',
        hint: 'Hajm va haroratni har safar boshqacha qiling.',
        tools: [
          { e: '🫙', n: 'Porshenli silindr', ok: true, why: 'hajmni o‘zgartiradi' },
          { e: '🧭', n: 'Manometr', ok: true, why: 'bosimni o‘lchaydi' },
          { e: '🌡️', n: 'Termometr', ok: true, why: 'haroratni o‘lchaydi' },
          { e: '🔥', n: 'Isitgich', ok: true, why: 'haroratni o‘zgartiradi' },
          { e: '⚖️', n: 'Tarozi', ok: false, why: 'gaz massasi o‘zgarmaydi' },
          { e: '🔋', n: 'Batareya', ok: false, why: 'kerak emas' },
          { e: '🧲', n: 'Magnit', ok: false, why: 'kerak emas' },
        ],
        cols: [
          { k: 'p', l: 'p, kPa', f: (r) => String(r.p).replace('.', ',') },
          { k: 'V', l: 'V, l', f: (r) => String(r.V).replace('.', ',') },
          { k: 'T', l: 'T, K', f: (r) => `${r.T}` },
          { k: 'pVT', l: 'pV/T, kPa·l/K', d: 3 },
        ],
        graph: { title: 'pV ko‘paytma temperaturaga to‘g‘ri proporsional', x: { k: 'T', l: 'T, K', max: 600 }, ys: [{ k: 'pV', l: 'pV, kPa·l' }], lines: false, theory: (x, rows) => { if (!rows.length) return NaN; const c = rows.reduce((s, r) => s + r.pVT, 0) / rows.length; return c * x; } },
        minRows: 4,
        questions: [
          { q: 'pV/T ustunidagi sonlar qanday?', a: 'Deyarli bir xil — kichik farq o‘lchash xatoligidan.' },
          { q: 'Hajmni 2 marta kamaytirib, T ni o‘zgartirmasak, bosim?', a: '2 marta ortadi.' },
          { q: 'Grafik nuqtalari qanday joylashdi?', a: 'Koordinata boshidan o‘tuvchi to‘g‘ri chiziq atrofida: pV ~ T.' },
        ],
        conclusion: 'O‘zgarmas massali gaz uchun pV/T = const — Klapeyron tenglamasi tajribada tasdiqlandi.',
      },
    },
    {
      title: 'Bitta noma’lumni topish',
      emoji: '🔎',
      table: {
        head: ['Noma’lum', 'Formula'],
        rows: [
          ['Bosim', 'p = mRT / (MV)'],
          ['Hajm', 'V = mRT / (Mp)'],
          ['Temperatura', 'T = pVM / (mR)'],
          ['Massa', 'm = pVM / (RT)'],
          ['Molyar massa', 'M = mRT / (pV)'],
          ['Zichlik', 'ρ = m / V = pM / (RT)'],
        ],
      },
    },
    {
      title: 'Masala va kalkulyator',
      emoji: '✍️',
      text: 'Hajmi 20 l idishda kislorod bor. t = 127 °C, p = 160 kPa. Gaz massasi qancha?',
      steps: [
        { e: '1', t: 'SI', d: 'V = 0,02 m³; T = 400 K; p = 1,6·10⁵ Pa; M = 0,032 kg/mol' },
        { e: '2', t: 'Javob', d: 'm = pVM/(RT) = 1,6·10⁵ · 0,02 · 0,032 : (8,31 · 400) ≈ 0,0308 kg = 30,8 g' },
      ],
      calc: {
        items: [
          { name: 'm = pVM/(RT)', formula: 'm = p · V · M / (R · T)', vars: [{ k: 'p', l: 'Bosim p', u: 'Pa', v: '1,6·10^5' }, { k: 'V', l: 'Hajm V', u: 'm³', v: '0,02' }, { k: 'M', l: 'Molyar massa M', u: 'kg/mol', v: '0,032' }, { k: 'T', l: 'Temperatura T', u: 'K', v: '400' }], out: { s: 'm', l: 'Gaz massasi', u: 'kg' }, f: (x) => (x.p * x.V * x.M) / (R * x.T) },
          { name: 'V = νRT/p', formula: 'V = ν · R · T / p', vars: [{ k: 'nu', l: 'Modda miqdori ν', u: 'mol', v: '500' }, { k: 'T', l: 'Temperatura T', u: 'K', v: '325' }, { k: 'p', l: 'Bosim p', u: 'Pa', v: '4,5·10^5' }], out: { s: 'V', l: 'Hajm', u: 'm³' }, f: (x) => (x.nu * R * x.T) / x.p },
          { name: 'ν = pV/(RT)', formula: 'ν = p · V / (R · T)', vars: [{ k: 'p', l: 'Bosim p', u: 'Pa', v: '250000' }, { k: 'V', l: 'Hajm V', u: 'm³', v: '0,05' }, { k: 'T', l: 'Temperatura T', u: 'K', v: '500' }], out: { s: 'ν', l: 'Modda miqdori', u: 'mol' }, f: (x) => (x.p * x.V) / (R * x.T) },
          { name: 'T = pVM/(mR)', formula: 'T = p · V · M / (m · R)', vars: [{ k: 'p', l: 'Bosim p', u: 'Pa', v: '3,5·10^6' }, { k: 'V', l: 'Hajm V', u: 'm³', v: '0,0166' }, { k: 'M', l: 'Molyar massa M', u: 'kg/mol', v: '0,028' }, { k: 'm', l: 'Massa m', u: 'kg', v: '0,28' }], out: { s: 'T', l: 'Temperatura', u: 'K' }, f: (x) => (x.p * x.V * x.M) / (x.m * R) },
          { name: 'ρ = pM/(RT)', formula: 'ρ = p · M / (R · T)', vars: [{ k: 'p', l: 'Bosim p', u: 'Pa', v: '415000' }, { k: 'M', l: 'Molyar massa M', u: 'kg/mol', v: '0,032' }, { k: 'T', l: 'Temperatura T', u: 'K', v: '640' }], out: { s: 'ρ', l: 'Zichlik', u: 'kg/m³' }, f: (x) => (x.p * x.M) / (R * x.T) },
        ],
      },
    },
    {
      title: 'O‘zingiz yeching',
      emoji: '🏆',
      reveal: [
        { q: '0,05 m³, 500 K, 250 kPa. Necha mol gaz?', a: 'ν = pV/(RT) = 250 000 · 0,05 : (8,31 · 500) ≈ 3 mol' },
        { q: '8 g gaz 27 °C, 150 kPa da 4,15 l hajm egallaydi. Qanday gaz?', a: 'M = mRT/(pV) = 0,008 · 8,31 · 300 : (150 000 · 0,00415) ≈ 0,032 kg/mol — kislorod' },
        { q: '16,6 l idishda 280 g azot 3,5 MPa bosimda. T = ?', a: 'T = pVM/(mR) = 3,5·10⁶ · 0,0166 · 0,028 : (0,28 · 8,31) ≈ 700 K' },
        { q: '4×5×3 m xonada 17 °C, 100 kPa da necha mol havo bor?', a: 'V = 60 m³; ν = 10⁵ · 60 : (8,31 · 290) ≈ 2490 mol' },
      ],
      mission: { t: 'Xavfsizlik masalasi', d: '24 l ballonda 1,2 kg CO₂ bor. Ballon 3 MPa gacha chidaydi. Qanday haroratda portlash xavfi tug‘iladi? (Javob: T = pVM/(mR) ≈ 318 K ≈ 45 °C. Shuning uchun gaz ballonlarini quyoshda qoldirmang!)', sec: 300 },
    },
  ],
  pairs: [
    ['pV = νRT', 'Mendeleyev–Klapeyron tenglamasi'],
    ['pV/T = const', 'Klapeyron tenglamasi'],
    ['22,4 l', '1 mol gaz, normal sharoit'],
    ['m = pVM/(RT)', 'gaz massasi'],
    ['ρ = pM/(RT)', 'gaz zichligi'],
    ['p, V, T', 'gaz holati parametrlari'],
  ],
  quiz: [
    Q('Mendeleyev–Klapeyron tenglamasi?', ['pV = (m/M)RT', 'pV = const', 'p/T = const', 'V/T = const']),
    Q('Gaz holati qaysi parametrlar bilan aniqlanadi?', ['p, V, T', 'm, v, a', 'F, S, h', 'U, I, R']),
    Q('Klapeyron tenglamasi qachon o‘rinli?', ['gaz massasi o‘zgarmasa', 'harorat o‘zgarmasa', 'faqat vakuumda', 'gaz suyuqlanganda']),
    Q('1 mol gaz normal sharoitda qancha hajm egallaydi?', ['22,4 l', '1 l', '6,02 l', '8,31 l']),
    Q('pV = νRT dan T = ?', ['pV/(νR)', 'νR/(pV)', 'pVνR', 'p/(VνR)']),
    Q('Ballondagi gaz qizisa, bosim?', ['ortadi', 'kamayadi', 'o‘zgarmaydi', 'nolga teng bo‘ladi']),
    Q('Gaz zichligi formulasi?', ['ρ = pM/(RT)', 'ρ = RT/(pM)', 'ρ = pV', 'ρ = MRT']),
  ],
  sort: {
    categories: ['Makroparametr (o‘lchanadi)', 'Doimiy son'],
    items: [
      { text: 'bosim p', cat: 0 }, { text: 'hajm V', cat: 0 }, { text: 'temperatura T', cat: 0 }, { text: 'massa m', cat: 0 },
      { text: 'R = 8,31', cat: 1 }, { text: 'k = 1,38·10⁻²³', cat: 1 }, { text: 'N_A = 6,02·10²³', cat: 1 },
    ],
  },
  qa: [
    { q: 'Holat tenglamasi nimani bog‘laydi?', a: 'Gazning massasi, molyar massasi, bosimi, hajmi va temperaturasini.' },
    { q: 'Holat tenglamasini bilishning ahamiyati?', a: 'Ikkita parametr ma’lum bo‘lsa, uchinchisini topish mumkin.' },
    { q: 'Klapeyron tenglamasini yozing.', a: 'p₁V₁/T₁ = p₂V₂/T₂.' },
    { q: 'Nega gaz ballonlarini issiq joyda saqlash xavfli?', a: 'Harorat ortsa, yopiq ballondagi bosim ortadi va ballon yorilishi mumkin.' },
  ],
  odd: [
    { items: ['p', 'V', 'T', 'R'], answer: 3, why: 'R — doimiy son, qolganlari holat parametrlari.' },
    { items: ['Mendeleyev', 'Klapeyron', 'Bolsman', 'Navoiy'], answer: 3, why: 'Navoiy — shoir.' },
  ],
  sequences: [
    { title: 'Holat tenglamasini keltirib chiqarish', items: ['p = nkT', 'n = N/V ni qo‘yish', 'N = (m/M)·N_A ni qo‘yish', 'k·N_A = R', 'pV = (m/M)RT'] },
  ],
  debate: [
    { claim: 'Gaz ballonini yozda mashina yukxonasida olib yurish xavfsiz', pro: 'Ballon mustahkam qilib yasalgan.', con: 'Quyoshda qizigan yukxonada harorat va bosim keskin ortadi — portlash xavfi bor.' },
  ],
  units: [
    Q('20 l = ? m³', ['0,02 m³', '2 m³', '0,2 m³', '0,002 m³']),
    Q('127 °C = ? K', ['400 K', '146 K', '354 K', '127 K']),
    Q('160 kPa = ? Pa', ['1,6·10⁵ Pa', '1,6·10³ Pa', '1,6·10⁶ Pa', '160 Pa']),
    Q('0,45 MPa = ? Pa', ['4,5·10⁵ Pa', '4,5·10⁴ Pa', '4,5·10⁶ Pa', '450 Pa']),
    Q('4,15 l = ? m³', ['4,15·10⁻³ m³', '4,15 m³', '0,415 m³', '4,15·10⁻⁶ m³']),
    Q('280 g = ? kg', ['0,28 kg', '2,8 kg', '28 kg', '0,028 kg']),
  ],
};

/* ---------- 10-§ ---------- */
const F10 = {
  id: 'fz9-10',
  source: `${SRC} • 10-§ • 33–35-betlar`,
  title: 'Izotermik jarayon. Boyl–Mariott qonuni',
  short: 'Izojarayonlar, T = const, pV = const, izoterma (giperbola)',
  theme: { emoji: '💉', grad: 'from-cyan-900 via-sky-600 to-blue-300', border: 'border-cyan-200', tag: 'Fizika • 9-sinf • 10-§' },
  lesson: [
    {
      title: 'Izojarayonlar',
      emoji: '🔒',
      text: 'Gazning uchta parametridan bittasi o‘zgarmay, qolgan ikkitasi o‘zgarsa, bunday jarayon izojarayon deyiladi. Yunoncha «izos» — teng degani.',
      cards: [
        { e: '🌡️', t: 'Izotermik', d: 'T = const (bugungi mavzu)' },
        { e: '🧭', t: 'Izobarik', d: 'p = const (keyingi dars)' },
        { e: '🫙', t: 'Izoxorik', d: 'V = const' },
      ],
    },
    {
      title: 'Izotermik jarayon',
      emoji: '🌡️',
      rule: 'Gaz massasi (m = const) va temperaturasi (T = const) o‘zgarmagan holda holatining o‘zgarishi — izotermik jarayon.',
      ruleLabel: 'Ta’rif',
      text: 'Yunoncha «termos» — issiq. Gaz harorati o‘zgarmasligi uchun idish termostat ichiga qo‘yiladi. Aks holda gaz siqilganda qiziydi, kengayganda soviydi.',
    },
    {
      title: 'Boyl–Mariott qonuni',
      emoji: '⭐',
      text: 'Bu qonunni ingliz fizigi R. Boyl (1662) va fransuz fizigi E. Mariott (1676) bir-biridan bexabar holda kashf qilgan.',
      rule: 'p₁V₁ = p₂V₂   yoki   pV = const   (T = const)',
      ruleLabel: 'Boyl–Mariott qonuni',
      note: 'O‘zgarmas haroratda gaz bosimi hajmiga teskari proporsional: hajm 2 marta kamaysa, bosim 2 marta ortadi.',
    },
    {
      title: 'Sinfda tajriba: shprits',
      emoji: '💉',
      experiment: {
        t: 'Shpritsdagi havoni siqamiz',
        need: ['shprits (ignasiz, 20 ml)', 'barmoq'],
        steps: ['Shpritsga 20 ml havo torting.', 'Uchini barmog‘ingiz bilan mahkam berkiting.', 'Porshenni 10 ml gacha sekin bosing.', 'Barmog‘ingizga qanday bosim sezilayotganini ayting. Porshenni qo‘yib yuboring.'],
        predict: { q: 'Porshenni qo‘yib yuborsak nima bo‘ladi?', opts: ['Porshen orqaga qaytadi', 'Joyida qoladi', 'Yana ichkariga kiradi'], a: 0 },
        result: 'Porshen orqaga — taxminan 20 ml belgisiga qaytadi.',
        why: 'Hajm 2 marta kamayganda havo bosimi 2 marta ortdi. Bu ortiqcha bosim porshenni itarib chiqaradi.',
        safety: 'Faqat ignasiz shprits ishlating!',
      },
    },
    {
      title: 'Izoterma — giperbola',
      emoji: '📉',
      text: 'Bosimni vertikal o‘qqa, hajmni gorizontal o‘qqa qo‘yib, nuqtalarni tutashtirsak, egri chiziq — giperbola hosil bo‘ladi. Uni izoterma deymiz.',
      sim: { kind: 'gas', lock: ['T'], showN: false, graph: 'pV', title: 'Simulyatsiya: izotermik siqish (T o‘zgarmas)' },
      list: ['Porshenni sekin suring — p(V) grafigida nuqtalar paydo bo‘ladi.', 'Nuqtalar giperbola bo‘ylab joylashadi.', 'Harorat qancha yuqori bo‘lsa, izoterma shuncha yuqorida yotadi.'],
    },
    {
      title: 'Virtual laboratoriya: Boyl–Mariott qonuni',
      emoji: '🧪',
      lab: {
        kind: 'gas',
        lock: ['T', 'N'],
        N: 60, V: 5, T: 300,
        limits: { Vmin: 1, Vmax: 5 },
        title: 'Boyl–Mariott qonunini tajribada tekshirish',
        goal: 'O‘zgarmas haroratda gaz hajmini o‘zgartirib, bosimni o‘lchash va pV ko‘paytmani tekshirish.',
        hint: 'Hajmni 5; 4; 3; 2,5; 2; 1,5 l qilib o‘lchang.',
        tools: [
          { e: '💉', n: 'Porshenli silindr (shprits)', ok: true, why: 'hajmni o‘zgartiramiz' },
          { e: '🧭', n: 'Manometr', ok: true, why: 'bosimni o‘lchaydi' },
          { e: '🌡️', n: 'Termometr', ok: true, why: 'harorat o‘zgarmasligini nazorat qilamiz' },
          { e: '🛁', n: 'Termostat (suvli vanna)', ok: true, why: 'haroratni bir xil saqlaydi' },
          { e: '🔥', n: 'Gaz gorelka', ok: false, why: 'gazni qizdirish kerak emas — T o‘zgarmas' },
          { e: '⚖️', n: 'Tarozi', ok: false, why: 'massa o‘zgarmaydi' },
          { e: '🔦', n: 'Fonar', ok: false, why: 'kerak emas' },
        ],
        steps: ['Hajmni tanlang (porshenni suring).', 'Manometrdan bosimni o‘qing — «Jadvalga yozish».', 'Kamida 5 xil hajmda takrorlang.', 'Jadvalda pV ustunini solishtiring.'],
        cols: [
          { k: 'V', l: 'V, l', f: (r) => String(r.V).replace('.', ',') },
          { k: 'p', l: 'p, kPa', f: (r) => String(r.p).replace('.', ',') },
          { k: 'pV', l: 'pV, kPa·l', f: (r) => String(r.pV).replace('.', ',') },
        ],
        graph: { title: 'Izoterma: p(V)', x: { k: 'V', l: 'V, l', max: 5 }, ys: [{ k: 'p', l: 'p, kPa' }], lines: false, theory: (x, rows) => { if (!rows.length || x <= 0) return NaN; const c = rows.reduce((s, r) => s + r.pV, 0) / rows.length; return c / x; } },
        minRows: 5,
        questions: [
          { q: 'pV ustunidagi qiymatlar qanday?', a: 'Deyarli bir xil — o‘zgarmas son.' },
          { q: 'Hajm 2 marta kamaysa, bosim?', a: '2 marta ortadi.' },
          { q: 'Grafik qanday chiziq?', a: 'Giperbola — izoterma.' },
          { q: 'Nega termostat kerak?', a: 'Siqilganda gaz qiziydi. Harorat o‘zgarsa, Boyl–Mariott qonuni bajarilmaydi.' },
        ],
        conclusion: 'O‘zgarmas temperaturada berilgan gaz bosimining hajmga ko‘paytmasi o‘zgarmaydi: pV = const. Boyl–Mariott qonuni tasdiqlandi.',
      },
    },
    {
      title: 'Zichlik va bosim',
      emoji: '🧱',
      rule: 'ρ₁ / ρ₂ = V₂ / V₁ = p₁ / p₂',
      ruleLabel: 'Izotermik jarayonda zichlik',
      text: 'Gaz siqilsa, molekulalar zichroq joylashadi: zichlik hajmga teskari, bosimga to‘g‘ri proporsional o‘zgaradi.',
    },
    {
      title: 'Masala va kalkulyator',
      emoji: '✍️',
      text: 'Normal atmosfera bosimida (100 kPa) gaz 6 l hajmni egallaydi. Bosim 20 kPa ga ortsa, hajm qancha bo‘ladi? T = const.',
      steps: [
        { e: '1', t: 'Berilgan', d: 'p₁ = 100 kPa; V₁ = 6 l; p₂ = 120 kPa' },
        { e: '2', t: 'Javob', d: 'V₂ = p₁V₁ / p₂ = 100 · 6 : 120 = 5 l' },
      ],
      calc: {
        items: [
          { name: 'V₂ = p₁V₁/p₂', formula: 'V₂ = p₁ · V₁ / p₂', vars: [{ k: 'p1', l: 'p₁', u: 'kPa', v: '100' }, { k: 'V1', l: 'V₁', u: 'l', v: '6' }, { k: 'p2', l: 'p₂', u: 'kPa', v: '120' }], out: { s: 'V₂', l: 'Yangi hajm', u: 'l' }, f: (x) => (x.p1 * x.V1) / x.p2 },
          { name: 'p₂ = p₁V₁/V₂', formula: 'p₂ = p₁ · V₁ / V₂', vars: [{ k: 'p1', l: 'p₁', u: 'MPa', v: '0,8' }, { k: 'V1', l: 'V₁', u: 'sm³', v: '24' }, { k: 'V2', l: 'V₂', u: 'sm³', v: '16' }], out: { s: 'p₂', l: 'Yangi bosim', u: 'MPa' }, f: (x) => (x.p1 * x.V1) / x.V2 },
        ],
        title: 'Formula kalkulyatori (birliklar bir xil bo‘lsa, SI ga o‘tkazish shart emas)',
      },
    },
    {
      title: 'O‘zingiz yeching',
      emoji: '🏆',
      reveal: [
        { q: 'V₁ = 0,2 l, p₁ = 300 kPa. Gaz kengayib, p₂ = 120 kPa bo‘ldi. V₂ = ?', a: 'V₂ = 300 · 0,2 : 120 = 0,5 l' },
        { q: 'V₁ = 24 sm³, p₁ = 0,8 MPa. Gaz 16 sm³ gacha siqildi. p₂ = ?', a: 'p₂ = 0,8 · 24 : 16 = 1,2 MPa' },
        { q: '50 l gazning bosimi 4 marta ortsa, hajmi?', a: '50 : 4 = 12,5 l' },
        { q: 'Gaz 1,2 l dan 0,8 l gacha siqilib, bosimi 40 kPa ga ortdi. p₁ = ?', a: 'p₁ · 1,2 = (p₁ + 40) · 0,8  ⇒  0,4p₁ = 32  ⇒  p₁ = 80 kPa' },
      ],
      mission: { t: 'Uyga vazifa', d: 'Darslikdagi 8-mashqni yeching. Uyda shprits tajribasini takrorlang va natijani daftarga yozing.', sec: 0 },
    },
  ],
  pairs: [
    ['izotermik', 'T = const'],
    ['izobarik', 'p = const'],
    ['izoxorik', 'V = const'],
    ['pV = const', 'Boyl–Mariott qonuni'],
    ['izoterma', 'giperbola'],
    ['termostat', 'haroratni bir xil saqlaydi'],
    ['Boyl', 'ingliz fizigi, 1662'],
  ],
  quiz: [
    Q('Izotermik jarayonda nima o‘zgarmaydi?', ['temperatura', 'bosim', 'hajm', 'zichlik']),
    Q('Boyl–Mariott qonuni?', ['pV = const', 'V/T = const', 'p/T = const', 'pT = const']),
    Q('Hajm 3 marta kamaysa (T = const), bosim?', ['3 marta ortadi', '3 marta kamayadi', '9 marta ortadi', 'o‘zgarmaydi']),
    Q('Izoterma grafigi qanday chiziq?', ['giperbola', 'to‘g‘ri chiziq', 'aylana', 'parabola']),
    Q('p₁ = 100 kPa, V₁ = 6 l, p₂ = 120 kPa. V₂ = ?', ['5 l', '7,2 l', '6 l', '20 l']),
    Q('Izotermik jarayonda zichlik bosimga qanday bog‘liq?', ['to‘g‘ri proporsional', 'teskari proporsional', 'bog‘liq emas', 'kvadratiga proporsional']),
    Q('Qonunni kimlar kashf qilgan?', ['Boyl va Mariott', 'Gey-Lyussak va Sharl', 'Mendeleyev va Klapeyron', 'Nyuton va Guk']),
    Q('Izojarayon necha xil bo‘ladi?', ['3 xil', '2 xil', '4 xil', '5 xil']),
  ],
  sort: {
    categories: ['Izotermik jarayon', 'Izotermik emas'],
    items: [
      { text: 'shpritsni sekin siqish (T o‘zgarmas)', cat: 0 }, { text: 'pV = const', cat: 0 }, { text: 'izoterma — giperbola', cat: 0 },
      { text: 'yopiq ballonni qizdirish', cat: 1 }, { text: 'sharni sovuqqa olib chiqish', cat: 1 }, { text: 'V/T = const', cat: 1 },
    ],
  },
  qa: [
    { q: 'Izojarayon nima?', a: 'Gazning bitta parametri o‘zgarmas bo‘lgan jarayon.' },
    { q: 'Boyl–Mariott qonunini ta’riflang.', a: 'O‘zgarmas temperaturada berilgan gaz bosimi hajmga teskari proporsional.' },
    { q: 'Izoterma nima?', a: 'O‘zgarmas temperaturada p(V) grafigi — giperbola.' },
    { q: 'Nega izotermik jarayonda termostat kerak?', a: 'Gaz siqilganda qiziydi, kengayganda soviydi; harorat bir xil bo‘lishi kerak.' },
    { q: 'Harorati yuqoriroq izoterma grafikda qayerda yotadi?', a: 'Yuqoriroqda (koordinata boshidan uzoqroqda).' },
  ],
  odd: [
    { items: ['izotermik', 'izobarik', 'izoxorik', 'diffuziya'], answer: 3, why: 'Diffuziya izojarayon emas.' },
    { items: ['p₁V₁ = p₂V₂', 'pV = const', 'p ~ 1/V', 'V ~ T'], answer: 3, why: 'V ~ T — izobarik jarayon qonuni.' },
  ],
  sequences: [
    { title: 'Boyl–Mariott tajribasi', items: ['Silindrni termostatga qo‘yish', 'Hajmni o‘zgartirish', 'Bosimni manometrdan o‘qish', 'pV ni hisoblash', 'Grafik chizish'] },
  ],
  debate: [
    { claim: 'Suv ostidan yuqoriga ko‘tarilayotgan havo pufagi kattalashadi', pro: 'Yuqoriga chiqqan sari suv bosimi kamayadi, demak pufak hajmi ortadi (pV = const).', con: 'Suv chuqurda sovuqroq bo‘lishi mumkin — harorat ham ta’sir qiladi.' },
  ],
  creative: [
    { task: 'Boyl–Mariott qonuni ishlaydigan 3 ta hayotiy misol toping (velosiped nasosi, shprits, g‘avvos...). Har birini 20 soniyada tushuntiring.', time: 90 },
  ],
  units: [
    Q('0,2 l = ? m³', ['2·10⁻⁴ m³', '2·10⁻³ m³', '0,2 m³', '2·10⁻² m³']),
    Q('24 sm³ = ? m³', ['2,4·10⁻⁵ m³', '2,4·10⁻³ m³', '0,24 m³', '2,4·10⁻² m³']),
    Q('0,8 MPa = ? kPa', ['800 kPa', '80 kPa', '8000 kPa', '8 kPa']),
    Q('1 atm ≈ ? kPa', ['100 kPa', '10 kPa', '1000 kPa', '1 kPa']),
    Q('300 kPa = ? MPa', ['0,3 MPa', '3 MPa', '30 MPa', '0,03 MPa']),
    Q('1 l = ? sm³', ['1000 sm³', '100 sm³', '10 sm³', '1 sm³']),
  ],
};

export const FIZIKA_9 = [F1, F2, F3, F4, F5, F6, F7, F8, F9, F10];
