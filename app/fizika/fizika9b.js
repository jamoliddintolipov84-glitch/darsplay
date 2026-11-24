/**
 * 9-sinf Fizika — 11–20-§
 * I bob davomi (izojarayonlar, amaliy mashg‘ulot, takrorlash) va
 * II bob. Ichki energiya va termodinamika elementlari (15–20-§).
 * Manba: Fizika. 9-sinf darsligi (2019), 35–65-betlar. Matnlar sodda qilib, o‘z so‘zimiz bilan berilgan.
 */

const Q = (q, options) => ({ q, options, answer: 0 });
const R = 8.31;
const K = 1.38e-23;

const SRC1 = 'I bob. Molekulyar-kinetik nazariya';
const SRC2 = 'II bob. Ichki energiya va termodinamika';
const avg = (rows, f) => (rows.length ? rows.reduce((s, r) => s + f(r), 0) / rows.length : NaN);
const dec = (x) => String(x).replace('.', ',');

/* ---------- 11-§ ---------- */
const F11 = {
  id: 'fz9-11',
  source: `${SRC1} • 11-§ • 35–36-betlar`,
  title: 'Izobarik jarayon. Gey-Lyussak qonuni',
  short: 'p = const, V/T = const, izobara — to‘g‘ri chiziq',
  theme: { emoji: '🎈', grad: 'from-orange-800 via-amber-600 to-yellow-300', border: 'border-amber-200', tag: 'Fizika • 9-sinf • 11-§' },
  lesson: [
    {
      title: 'Shar nega issiqda shishadi?',
      emoji: '🎈',
      vs: {
        q: 'Yozda quyoshda qolgan shar nima bo‘ladi?',
        a: { t: 'Kattalashadi, hatto yorilishi mumkin', pts: ['ichidagi havo qiziydi'] },
        b: { t: 'Hech narsa bo‘lmaydi', pts: ['havo miqdori o‘zgarmagan-ku'] },
      },
      text: 'Bugun gaz bosimi o‘zgarmaganda hajmi haroratga qanday bog‘liqligini o‘rganamiz.',
    },
    {
      title: 'Izobarik jarayon',
      emoji: '🧭',
      rule: 'Gaz massasi (m = const) va bosimi (p = const) o‘zgarmagan holda holatining o‘zgarishi — izobarik jarayon.',
      ruleLabel: 'Ta’rif',
      text: 'Yunoncha «baros» — bosim. Erkin siljiydigan porshen ostidagi gaz qizdirilsa, bosim o‘zgarmaydi, hajm esa ortadi.',
    },
    {
      title: 'Gey-Lyussak qonuni',
      emoji: '⭐',
      text: 'Holat tenglamasini bosim bir xil bo‘lgan ikki holat uchun yozib, birini ikkinchisiga bo‘lsak, quyidagi qonun chiqadi. Uni 1802-yilda fransuz fizigi Gey-Lyussak tajribada topgan.',
      rule: 'V₁ / T₁ = V₂ / T₂   yoki   V / T = const   (p = const)',
      ruleLabel: 'Gey-Lyussak qonuni',
      note: 'O‘zgarmas bosimda gaz hajmi absolyut temperaturaga to‘g‘ri proporsional: T 2 marta ortsa, V ham 2 marta ortadi.',
    },
    {
      title: 'Simulyatsiya: porshen o‘zi ko‘tariladi',
      emoji: '🧪',
      text: 'Bu yerda bosim o‘zgarmas. Haroratni o‘zgartiring — hajm o‘zi o‘zgaradi. V(T) grafigidagi nuqtalarga qarang.',
      sim: { kind: 'gas', lock: ['p'], showN: false, V: 2, T: 300, graph: 'VT', limits: { Tmin: 160, Tmax: 600 }, title: 'Simulyatsiya: izobarik jarayon (p o‘zgarmas)' },
      reveal: [{ q: 'V(T) grafigi qanday chiziq?', a: 'Koordinata boshidan chiquvchi to‘g‘ri chiziq — izobara.' }],
    },
    {
      title: 'Sinfda tajriba: butilkadagi shar',
      emoji: '🍾',
      experiment: {
        t: 'Shar o‘zi shishadi',
        need: ['bo‘sh shisha butilka', 'havo shari', 'issiq suvli idish', 'sovuq suvli idish'],
        steps: ['Sharni butilka bo‘g‘ziga kiydiring.', 'Butilkani issiq suvli idishga qo‘ying va 1–2 daqiqa kuting.', 'Keyin butilkani sovuq suvga o‘tkazing.'],
        predict: { q: 'Issiq suvda shar bilan nima bo‘ladi?', opts: ['Shishadi', 'Butilka ichiga tortiladi', 'O‘zgarmaydi'], a: 0 },
        result: 'Issiq suvda shar shishadi, sovuq suvda yana puchayadi.',
        why: 'Havo qizisa, uning hajmi ortadi (V ~ T). Ortiqcha havo sharni shishiradi.',
        safety: 'Issiq suvni o‘qituvchi quysin. Qaynoq suv ishlatmang.',
      },
    },
    {
      title: 'Virtual laboratoriya: Gey-Lyussak qonuni',
      emoji: '🧪',
      lab: {
        kind: 'gas',
        lock: ['p', 'N'],
        N: 60, V: 2, T: 300,
        limits: { Tmin: 200, Tmax: 600 },
        boxTitle: 'Erkin porshenli silindr (p o‘zgarmas)',
        hint: 'Haroratni 200, 300, 400, 500, 600 K qilib o‘lchang.',
        title: 'O‘zgarmas bosimda hajmning haroratga bog‘liqligi',
        goal: 'Gazni o‘zgarmas bosimda qizdirib, hajmini o‘lchash va V/T ni tekshirish.',
        tools: [
          { e: '🫙', n: 'Erkin porshenli silindr', ok: true, why: 'bosim o‘zgarmas qoladi' },
          { e: '🌡️', n: 'Termometr', ok: true, why: 'haroratni o‘lchaydi' },
          { e: '🔥', n: 'Isitgich', ok: true, why: 'gazni qizdiradi' },
          { e: '📏', n: 'Hajm shkalasi', ok: true, why: 'hajmni o‘lchaydi' },
          { e: '🧊', n: 'Muzli suv', ok: true, why: 'gazni sovitish uchun' },
          { e: '⚖️', n: 'Tarozi', ok: false, why: 'massa o‘zgarmaydi' },
          { e: '🔋', n: 'Batareya', ok: false, why: 'kerak emas' },
        ],
        cols: [
          { k: 'T', l: 'T, K', f: (r) => `${r.T}` },
          { k: 'V', l: 'V, l', f: (r) => dec(r.V) },
          { k: 'VT', l: 'V/T, l/K', d: 3 },
        ],
        graph: { title: 'Izobara: V(T)', x: { k: 'T', l: 'T, K', max: 600 }, ys: [{ k: 'V', l: 'V, l' }], lines: false, theory: (x, rows) => avg(rows, (r) => r.VT) * x },
        minRows: 4,
        questions: [
          { q: 'V/T ustunidagi sonlar qanday?', a: 'Deyarli bir xil — o‘zgarmas.' },
          { q: 'T 300 K dan 600 K ga ortsa, hajm?', a: '2 marta ortadi.' },
          { q: 'Grafikdagi chiziqni davom ettirsak, qayerdan o‘tadi?', a: 'Koordinata boshidan (T = 0 K da V = 0) — absolyut nol.' },
        ],
        conclusion: 'O‘zgarmas bosimda berilgan gaz hajmi absolyut temperaturaga to‘g‘ri proporsional: V/T = const. Gey-Lyussak qonuni tasdiqlandi.',
      },
    },
    {
      title: 'Masala va kalkulyator',
      emoji: '✍️',
      text: 'Gaz 67 °C da 25 l hajmga ega. Bosim o‘zgarmasa, hajm 10 l bo‘lishi uchun gazni qanchaga sovitish kerak?',
      steps: [
        { e: '1', t: 'SI', d: 'T₁ = 67 + 273 = 340 K; V₁ = 25 l; V₂ = 10 l' },
        { e: '2', t: 'Oxirgi harorat', d: 'T₂ = T₁ · V₂ / V₁ = 340 · 10 : 25 = 136 K' },
        { e: '3', t: 'Javob', d: 'ΔT = 340 − 136 = 204 K ga sovitish kerak' },
      ],
      calc: {
        items: [
          { name: 'V₂ = V₁T₂/T₁', formula: 'V₂ = V₁ · T₂ / T₁', vars: [{ k: 'V1', l: 'V₁', u: 'l', v: '10' }, { k: 'T1', l: 'T₁', u: 'K', v: '300' }, { k: 'T2', l: 'T₂', u: 'K', v: '600' }], out: { s: 'V₂', l: 'Yangi hajm', u: 'l' }, f: (x) => (x.V1 * x.T2) / x.T1 },
          { name: 'T₂ = T₁V₂/V₁', formula: 'T₂ = T₁ · V₂ / V₁', vars: [{ k: 'T1', l: 'T₁', u: 'K', v: '340' }, { k: 'V1', l: 'V₁', u: 'l', v: '25' }, { k: 'V2', l: 'V₂', u: 'l', v: '10' }], out: { s: 'T₂', l: 'Yangi harorat', u: 'K' }, f: (x) => (x.T1 * x.V2) / x.V1 },
        ],
      },
    },
    {
      title: 'O‘zingiz yeching',
      emoji: '🏆',
      reveal: [
        { q: '27 °C da gaz hajmi 10 l. 327 °C gacha izobarik isitilsa?', a: 'T: 300 K → 600 K, V₂ = 20 l (2 marta ortadi)' },
        { q: '51 °C da 0,9 l. Hajm 0,3 l bo‘lishi uchun qanchaga sovitish kerak?', a: 'T₁ = 324 K; T₂ = 108 K; ΔT = 216 K' },
        { q: '27 °C da 3 l gaz 100 °C gacha isitildi. Hajm?', a: 'V₂ = 3 · 373 : 300 ≈ 3,73 l' },
        { q: '47 °C da 3 l. Hajmni 1,2 l ga oshirish uchun qanchaga isitish kerak?', a: 'T₂ = 320 · 4,2 : 3 = 448 K; ΔT = 128 K' },
      ],
      mission: { t: 'Uyga vazifa', d: 'Darslikdagi 9-mashqni yeching. Uyda «butilkadagi shar» tajribasini qilib ko‘ring.', sec: 0 },
    },
  ],
  pairs: [
    ['izobarik', 'p = const'],
    ['Gey-Lyussak', 'fransuz fizigi, 1802'],
    ['V/T = const', 'Gey-Lyussak qonuni'],
    ['izobara', 'V(T) — to‘g‘ri chiziq'],
    ['baros', 'bosim (yunoncha)'],
    ['erkin porshen', 'bosimni o‘zgarmas saqlaydi'],
  ],
  quiz: [
    Q('Izobarik jarayonda nima o‘zgarmaydi?', ['bosim', 'hajm', 'temperatura', 'zichlik']),
    Q('Gey-Lyussak qonuni?', ['V/T = const', 'pV = const', 'p/T = const', 'pT = const']),
    Q('T 3 marta ortsa (p = const), hajm?', ['3 marta ortadi', '3 marta kamayadi', '9 marta ortadi', 'o‘zgarmaydi']),
    Q('Izobara V(T) grafigida qanday chiziq?', ['koordinata boshidan chiquvchi to‘g‘ri chiziq', 'giperbola', 'aylana', 'gorizontal chiziq']),
    Q('Qonunni kim tajribada topgan?', ['Gey-Lyussak', 'Boyl', 'Sharl', 'Mendeleyev']),
    Q('27 °C dagi 10 l gaz 327 °C gacha izobarik qizdirilsa, hajm?', ['20 l', '120 l', '5 l', '10 l']),
    Q('Sovuqda shar nega kichrayadi?', ['ichidagi havo hajmi kamayadi', 'havo chiqib ketadi', 'rezina qisqaradi xolos', 'bosim ortadi']),
  ],
  sort: {
    categories: ['Izobarik', 'Izobarik emas'],
    items: [
      { text: 'erkin porshen ostida qizdirish', cat: 0 }, { text: 'shar issiqda shishadi', cat: 0 }, { text: 'V/T = const', cat: 0 },
      { text: 'yopiq ballonni qizdirish', cat: 1 }, { text: 'shpritsni sekin siqish', cat: 1 }, { text: 'pV = const', cat: 1 },
    ],
  },
  qa: [
    { q: 'Izobarik jarayon nima?', a: 'Gaz massasi va bosimi o‘zgarmagan holda holatining o‘zgarishi.' },
    { q: 'Gey-Lyussak qonunini ta’riflang.', a: 'O‘zgarmas bosimda gaz hajmi absolyut temperaturaga to‘g‘ri proporsional.' },
    { q: 'Izobara nima?', a: 'O‘zgarmas bosimda V(T) grafigi — koordinata boshidan chiquvchi to‘g‘ri chiziq.' },
    { q: 'Bosim kattaroq bo‘lsa, izobara qanday joylashadi?', a: 'Pastroqda — qiyaligi kichikroq bo‘ladi.' },
  ],
  odd: [
    { items: ['V/T = const', 'V₁/T₁ = V₂/T₂', 'V ~ T', 'pV = const'], answer: 3, why: 'pV = const — izotermik jarayon qonuni.' },
  ],
  sequences: [
    { title: 'Masalani yechish', items: ['Haroratni kelvinga o‘tkazish', 'V₁/T₁ = V₂/T₂ ni yozish', 'Noma’lumni topish', 'Javobni tekshirish'] },
  ],
  units: [
    Q('67 °C = ? K', ['340 K', '206 K', '67 K', '373 K']),
    Q('51 °C = ? K', ['324 K', '222 K', '51 K', '273 K']),
    Q('0,9 l = ? m³', ['9·10⁻⁴ m³', '9·10⁻³ m³', '0,9 m³', '9·10⁻² m³']),
    Q('25 l = ? m³', ['0,025 m³', '2,5 m³', '0,25 m³', '25 m³']),
    Q('327 °C = ? K', ['600 K', '54 K', '327 K', '500 K']),
  ],
};

/* ---------- 12-§ ---------- */
const F12 = {
  id: 'fz9-12',
  source: `${SRC1} • 12-§ • 37–38-betlar`,
  title: 'Izoxorik jarayon. Sharl qonuni',
  short: 'V = const, p/T = const, izoxora — to‘g‘ri chiziq',
  theme: { emoji: '💡', grad: 'from-red-900 via-rose-600 to-orange-300', border: 'border-rose-200', tag: 'Fizika • 9-sinf • 12-§' },
  lesson: [
    {
      title: 'Yopiq idish qizisa nima bo‘ladi?',
      emoji: '🫙',
      text: 'Yopiq ballon, germetik banka yoki yonib turgan lampochka ichidagi gaz qiziganda kengaya olmaydi — hajmi o‘zgarmaydi. Unda nima o‘zgaradi?',
      reveal: [{ q: 'Javob', a: 'Bosim! Molekulalar tezroq harakatlanib, devorga kuchliroq va tez-tez uriladi.' }],
    },
    {
      title: 'Izoxorik jarayon',
      emoji: '🔒',
      rule: 'Gaz massasi (m = const) va hajmi (V = const) o‘zgarmagan holda holatining o‘zgarishi — izoxorik jarayon.',
      ruleLabel: 'Ta’rif',
      text: 'Yunoncha «xoros» — hajm (egallangan joy).',
    },
    {
      title: 'Sharl qonuni',
      emoji: '⭐',
      text: 'Bu qonunni 1787-yilda fransuz fizigi Jak Sharl tajribada topgan.',
      rule: 'p₁ / T₁ = p₂ / T₂   yoki   p / T = const   (V = const)',
      ruleLabel: 'Sharl qonuni',
      note: 'O‘zgarmas hajmda gaz bosimi absolyut temperaturaga to‘g‘ri proporsional. Izoxora p(T) grafigida koordinata boshidan chiquvchi to‘g‘ri chiziq.',
    },
    {
      title: 'Simulyatsiya: yopiq idishni qizdiramiz',
      emoji: '🧪',
      sim: { kind: 'gas', lock: ['V'], showN: false, V: 3, T: 300, graph: 'pT', title: 'Simulyatsiya: izoxorik jarayon (V o‘zgarmas)' },
      list: ['Haroratni oshiring — manometr ko‘rsatkichi ortadi.', '«Devorga urilish» soni ham ko‘payadi.', 'p(T) grafigidagi nuqtalar bitta to‘g‘ri chiziqda yotadi.'],
    },
    {
      title: 'Sinfda tajriba: muzlatgichdagi butilka',
      emoji: '🧴',
      experiment: {
        t: 'Butilka o‘zi siqiladi',
        need: ['bo‘sh plastik butilka (qopqog‘i bilan)', 'issiq suv', 'muzlatgich yoki muzli suv'],
        steps: ['Butilkani issiq suv bilan chayib, suvini to‘king.', 'Qopqog‘ini mahkam burab yoping.', 'Butilkani muzli suvga yoki muzlatgichga qo‘ying.', '5–10 daqiqadan keyin qarang.'],
        predict: { q: 'Butilkaga nima bo‘ladi?', opts: ['Siqilib, pachoqlanadi', 'Shishib ketadi', 'O‘zgarmaydi'], a: 0 },
        result: 'Butilka pachoqlanadi.',
        why: 'Ichidagi havo soviganda bosimi kamayadi (p ~ T). Tashqi atmosfera bosimi kattaroq bo‘lib, butilkani siqadi.',
        safety: 'Faqat plastik butilka ishlating. Shisha idishni qizdirmang va yopiq holda olovga yaqinlashtirmang!',
      },
    },
    {
      title: 'Virtual laboratoriya: Sharl qonuni',
      emoji: '🧪',
      lab: {
        kind: 'gas',
        lock: ['V', 'N'],
        N: 60, V: 3, T: 200,
        limits: { Tmin: 150, Tmax: 600 },
        boxTitle: 'Germetik idish (V o‘zgarmas)',
        hint: 'Haroratni 200, 300, 400, 500, 600 K qilib o‘lchang.',
        title: 'O‘zgarmas hajmda bosimning haroratga bog‘liqligi',
        goal: 'Yopiq idishdagi gazni qizdirib, bosimini o‘lchash va p/T ni tekshirish.',
        tools: [
          { e: '🫙', n: 'Germetik idish', ok: true, why: 'hajm o‘zgarmaydi' },
          { e: '🧭', n: 'Manometr', ok: true, why: 'bosimni o‘lchaydi' },
          { e: '🌡️', n: 'Termometr', ok: true, why: 'haroratni o‘lchaydi' },
          { e: '🔥', n: 'Isitgich', ok: true, why: 'gazni qizdiradi' },
          { e: '💉', n: 'Porshen', ok: false, why: 'hajm o‘zgarmasligi kerak' },
          { e: '🧲', n: 'Magnit', ok: false, why: 'kerak emas' },
          { e: '📐', n: 'Transportir', ok: false, why: 'kerak emas' },
        ],
        cols: [
          { k: 'T', l: 'T, K', f: (r) => `${r.T}` },
          { k: 'p', l: 'p, kPa', f: (r) => dec(r.p) },
          { k: 'pT', l: 'p/T, kPa/K', d: 3 },
        ],
        graph: { title: 'Izoxora: p(T)', x: { k: 'T', l: 'T, K', max: 600 }, ys: [{ k: 'p', l: 'p, kPa' }], lines: false, theory: (x, rows) => avg(rows, (r) => r.pT) * x },
        minRows: 4,
        questions: [
          { q: 'p/T ustunidagi qiymatlar qanday?', a: 'Deyarli bir xil — o‘zgarmas son.' },
          { q: 'T 2 marta ortsa, bosim?', a: '2 marta ortadi.' },
          { q: 'Nega gaz ballonlarini qizdirish xavfli?', a: 'Hajm o‘zgarmaydi, bosim esa harorat bilan ortadi — ballon yorilishi mumkin.' },
        ],
        conclusion: 'O‘zgarmas hajmda berilgan gaz bosimi absolyut temperaturaga to‘g‘ri proporsional: p/T = const. Sharl qonuni tasdiqlandi.',
      },
    },
    {
      title: 'Masala va kalkulyator',
      emoji: '✍️',
      text: 'Gaz 280 K dan 540 K gacha izoxorik qizdirilganda bosimi 39 kPa ga ortdi. Dastlabki bosim qancha?',
      steps: [
        { e: '1', t: 'Sharl qonuni', d: 'p₁/T₁ = (p₁ + Δp)/T₂  ⇒  p₁ = Δp · T₁ / (T₂ − T₁)' },
        { e: '2', t: 'Javob', d: 'p₁ = 39 · 280 : 260 = 42 kPa' },
      ],
      calc: {
        items: [
          { name: 'p₂ = p₁T₂/T₁', formula: 'p₂ = p₁ · T₂ / T₁', vars: [{ k: 'p1', l: 'p₁', u: 'kPa', v: '100' }, { k: 'T1', l: 'T₁', u: 'K', v: '290' }, { k: 'T2', l: 'T₂', u: 'K', v: '633' }], out: { s: 'p₂', l: 'Yangi bosim', u: 'kPa' }, f: (x) => (x.p1 * x.T2) / x.T1 },
          { name: 'p₁ = Δp·T₁/ΔT', formula: 'p₁ = Δp · T₁ / (T₂ − T₁)', vars: [{ k: 'dp', l: 'Δp', u: 'kPa', v: '39' }, { k: 'T1', l: 'T₁', u: 'K', v: '280' }, { k: 'T2', l: 'T₂', u: 'K', v: '540' }], out: { s: 'p₁', l: 'Dastlabki bosim', u: 'kPa' }, f: (x) => (x.dp * x.T1) / (x.T2 - x.T1) },
        ],
      },
    },
    {
      title: 'O‘zingiz yeching',
      emoji: '🏆',
      reveal: [
        { q: '17 °C da ballondagi bosim 1,45·10⁵ Pa. Qanday haroratda 2·10⁵ Pa bo‘ladi?', a: 'T₂ = 290 · 2 : 1,45 = 400 K (127 °C)' },
        { q: 'Lampochka yonganda gaz 17 °C dan 360 °C gacha qiziydi. Bosim necha marta ortadi?', a: '633 : 290 ≈ 2,2 marta' },
        { q: '300 K dan 420 K gacha qizdirilganda bosim 50 kPa ga ortdi. p₁ = ?', a: 'p₁ = 50 · 300 : 120 = 125 kPa' },
      ],
      mission: { t: 'Uyga vazifa', d: 'Darslikdagi 10-mashqni yeching. Uchta izojarayonni (izotermik, izobarik, izoxorik) taqqoslovchi jadval tuzing.', sec: 0 },
    },
    {
      title: 'Uchta izojarayon — bitta jadvalda',
      emoji: '📋',
      table: {
        head: ['Jarayon', 'O‘zgarmas', 'Qonun', 'Grafik'],
        rows: [
          ['Izotermik', 'T', 'pV = const (Boyl–Mariott)', 'p(V) — giperbola'],
          ['Izobarik', 'p', 'V/T = const (Gey-Lyussak)', 'V(T) — to‘g‘ri chiziq'],
          ['Izoxorik', 'V', 'p/T = const (Sharl)', 'p(T) — to‘g‘ri chiziq'],
        ],
      },
    },
  ],
  pairs: [
    ['izoxorik', 'V = const'],
    ['Sharl', 'fransuz fizigi, 1787'],
    ['p/T = const', 'Sharl qonuni'],
    ['izoxora', 'p(T) — to‘g‘ri chiziq'],
    ['xoros', 'hajm (yunoncha)'],
    ['lampochka', 'ichida izoxorik qizish'],
  ],
  quiz: [
    Q('Izoxorik jarayonda nima o‘zgarmaydi?', ['hajm', 'bosim', 'temperatura', 'konsentratsiya o‘zgaradi']),
    Q('Sharl qonuni?', ['p/T = const', 'V/T = const', 'pV = const', 'pT = const']),
    Q('Yopiq ballon 300 K dan 600 K gacha qizisa, bosim?', ['2 marta ortadi', '2 marta kamayadi', '4 marta ortadi', 'o‘zgarmaydi']),
    Q('Izoxorik jarayonda konsentratsiya qanday o‘zgaradi?', ['o‘zgarmaydi', 'ortadi', 'kamayadi', 'nolga teng bo‘ladi']),
    Q('Izoxora p(T) grafigida qanday chiziq?', ['koordinata boshidan chiquvchi to‘g‘ri chiziq', 'giperbola', 'parabola', 'vertikal chiziq']),
    Q('Qonunni kim kashf qilgan?', ['Jak Sharl', 'Gey-Lyussak', 'Boyl', 'Mariott']),
    Q('Muzlatgichdagi yopiq plastik butilka nega siqiladi?', ['ichidagi bosim kamayadi', 'plastik muzlaydi', 'havo chiqib ketadi', 'tashqi bosim kamayadi']),
  ],
  sort: {
    categories: ['Izoxorik (V = const)', 'Boshqa jarayon'],
    items: [
      { text: 'yonayotgan lampochka ichidagi gaz', cat: 0 }, { text: 'yopiq ballonni qizdirish', cat: 0 }, { text: 'p/T = const', cat: 0 },
      { text: 'shar issiqda shishadi', cat: 1 }, { text: 'shprits siqiladi', cat: 1 }, { text: 'V/T = const', cat: 1 },
    ],
  },
  qa: [
    { q: 'Izoxorik jarayon nima?', a: 'Gaz massasi va hajmi o‘zgarmagan holda holatining o‘zgarishi.' },
    { q: 'Sharl qonunini ta’riflang.', a: 'O‘zgarmas hajmda gaz bosimi absolyut temperaturaga to‘g‘ri proporsional.' },
    { q: 'Hajm kattaroq bo‘lsa, izoxora qanday joylashadi?', a: 'Pastroqda — qiyaligi kichikroq.' },
    { q: 'Izoxorik jarayonga hayotdan misol?', a: 'Yopiq ballon yoki banka qizishi, lampochka ichidagi gaz.' },
  ],
  odd: [
    { items: ['Boyl–Mariott', 'Gey-Lyussak', 'Sharl', 'Arximed'], answer: 3, why: 'Arximed qonuni gaz izojarayonlariga tegishli emas.' },
    { items: ['p/T = const', 'p₁/T₁ = p₂/T₂', 'p ~ T', 'V ~ T'], answer: 3, why: 'V ~ T — izobarik jarayon.' },
  ],
  units: [
    Q('17 °C = ? K', ['290 K', '256 K', '17 K', '273 K']),
    Q('360 °C = ? K', ['633 K', '87 K', '360 K', '573 K']),
    Q('1,45·10⁵ Pa = ? kPa', ['145 kPa', '14,5 kPa', '1450 kPa', '1,45 kPa']),
    Q('39 kPa = ? Pa', ['39 000 Pa', '3900 Pa', '390 Pa', '390 000 Pa']),
    Q('540 K = ? °C', ['267 °C', '813 °C', '540 °C', '273 °C']),
  ],
};

/* ---------- 13-§ ---------- */
const F13 = {
  id: 'fz9-13',
  source: `${SRC1} • 13-§ • 38–40-betlar`,
  title: 'Amaliy mashg‘ulot. Molekulalarning o‘lchamini baholash',
  short: 'No‘xat modeli: d = V/S; sinf havosining zichligi va molekulalar soni',
  theme: { emoji: '🫛', grad: 'from-lime-800 via-green-600 to-emerald-300', border: 'border-lime-200', tag: 'Fizika • 9-sinf • 13-§ • Amaliy mashg‘ulot' },
  lesson: [
    {
      title: 'Mashg‘ulot maqsadi',
      emoji: '🎯',
      text: 'Moy tomchisi usulida biz moy qatlamining qalinligini bitta molekula diametriga teng deb oldik. Bu fikrni (gipotezani) katta «molekulalar» — no‘xat donalari bilan tekshirib ko‘ramiz.',
      cards: [
        { e: '🫛', t: 'No‘xat', d: 'molekula modeli' },
        { e: '📄', t: 'Qog‘ozdagi to‘rtburchak', d: 'suv sirtidagi moy pardasi modeli' },
        { e: '🧪', t: 'Menzurka', d: 'tomchi hajmini o‘lchash modeli' },
      ],
    },
    {
      title: 'Ishni bajarish tartibi',
      emoji: '📋',
      steps: [
        { e: '1', t: 'To‘rtburchak chizing', d: 'Bo‘yi va enini chizg‘ich bilan o‘lchang: S = a · b.' },
        { e: '2', t: 'No‘xat bilan to‘ldiring', d: 'Bir qavat qilib, zich teramiz. Chegaradan chiqmasin.' },
        { e: '3', t: 'Menzurkaga soling', d: 'No‘xatlar hajmini (V) o‘lchang.' },
        { e: '4', t: 'Hisoblang', d: 'd = V / S — bitta no‘xatning taxminiy o‘lchami.' },
        { e: '5', t: 'Tekshiring', d: '10 ta no‘xatni qatorga terib, uzunligini 10 ga bo‘ling.' },
      ],
    },
    {
      title: 'Virtual laboratoriya: no‘xat modeli',
      emoji: '🧪',
      lab: {
        kind: 'peas',
        title: 'Mexanik model asosida molekula o‘lchamini baholash',
        goal: 'Bir qavat terilgan no‘xatlar hajmi va yuzasidan no‘xat o‘lchamini topib, chizg‘ich bilan o‘lchangan qiymat bilan solishtirish.',
        tools: [
          { e: '📏', n: 'Chizg‘ich', ok: true, why: 'tomonlar va qatorni o‘lchaydi' },
          { e: '📄', n: 'Oq qog‘oz', ok: true, why: 'to‘rtburchak chiziladi' },
          { e: '🫛', n: 'No‘xat donalari', ok: true, why: 'molekula modeli' },
          { e: '🧪', n: 'Menzurka', ok: true, why: 'hajmni o‘lchaydi' },
          { e: '🌡️', n: 'Termometr', ok: false, why: 'harorat kerak emas' },
          { e: '⏱️', n: 'Sekundomer', ok: false, why: 'vaqt kerak emas' },
          { e: '🔋', n: 'Batareya', ok: false, why: 'kerak emas' },
        ],
        steps: ['To‘rtburchak o‘lchamini tanlang.', 'No‘xatlarni tering.', 'Menzurkaga solib hajmini o‘qing.', '10 donasini qatorga terib o‘lchang.'],
        cols: [
          { k: 'S', l: 'S, sm²', f: (r) => `${r.S}` },
          { k: 'V', l: 'V, sm³', f: (r) => `${r.V}` },
          { k: 'd1', l: 'd = V/S, sm', d: 2 },
          { k: 'd2', l: 'd (10 dona), sm', d: 2 },
        ],
        graph: { title: 'Hajm yuzaga proporsional', x: { k: 'S', l: 'S, sm²', max: 300 }, ys: [{ k: 'V', l: 'V, sm³' }], lines: false, theory: (x, rows) => avg(rows, (r) => r.V / r.S) * x },
        minRows: 3,
        questions: [
          { q: 'Ikki usulda topilgan o‘lchamlar yaqinmi?', a: 'Ha, bir xil tartibda (≈ 0,7–0,8 sm). Kichik farq no‘xatlar orasidagi bo‘shliqlardan.' },
          { q: 'Gipoteza tasdiqlandimi?', a: 'Ha: bir qavatli qatlam qalinligi bitta zarra o‘lchamiga yaqin.' },
          { q: 'Bu model moy tomchisi tajribasiga qanday bog‘liq?', a: 'Moy ham suv ustida bir qavat molekula bo‘lib yoyiladi: d = V/S.' },
        ],
        conclusion: 'Bir qavat zarralar qatlamining qalinligi zarra o‘lchamiga taxminan teng. Shuning uchun moy pardasi qalinligi molekula diametrini baholashga imkon beradi.',
      },
    },
    {
      title: 'Qo‘shimcha: sinf havosi',
      emoji: '🏫',
      text: 'Aneroid barometr va 1 metrli chizg‘ich bilan sinfimizdagi havoni «tekshiramiz»: zichligi, molekulalar konsentratsiyasi va soni, havoning massasi.',
      steps: [
        { e: '🌡️', t: 'Harorat va bosim', d: 'Barometrdagi termometr va shkaladan T (K) va p (Pa) ni yozing.' },
        { e: '📏', t: 'Xona o‘lchamlari', d: 'V = a · b · c' },
        { e: '🧮', t: 'Hisoblash', d: 'ρ = pM/(RT), n = p/(kT), N = n·V, m = ρ·V. Havo uchun M = 29 g/mol.' },
      ],
      calc: {
        title: 'Sinf havosi kalkulyatori',
        items: [
          { name: 'Zichlik ρ', formula: 'ρ = p · M / (R · T)', vars: [{ k: 'p', l: 'Bosim p', u: 'Pa', v: '100000' }, { k: 'M', l: 'Havo molyar massasi M', u: 'kg/mol', v: '0,029' }, { k: 'T', l: 'Harorat T', u: 'K', v: '293' }], out: { s: 'ρ', l: 'Havo zichligi', u: 'kg/m³' }, f: (x) => (x.p * x.M) / (R * x.T) },
          { name: 'Konsentratsiya n', formula: 'n = p / (k · T)', vars: [{ k: 'p', l: 'Bosim p', u: 'Pa', v: '100000' }, { k: 'T', l: 'Harorat T', u: 'K', v: '293' }], out: { s: 'n', l: 'Konsentratsiya', u: 'm⁻³' }, f: (x) => x.p / (K * x.T) },
          { name: 'Molekulalar soni N', formula: 'N = p · a · b · c / (k · T)', vars: [{ k: 'p', l: 'Bosim p', u: 'Pa', v: '100000' }, { k: 'T', l: 'Harorat T', u: 'K', v: '293' }, { k: 'a', l: 'Bo‘yi a', u: 'm', v: '8' }, { k: 'b', l: 'Eni b', u: 'm', v: '6' }, { k: 'c', l: 'Balandligi c', u: 'm', v: '3' }], out: { s: 'N', l: 'Sinfdagi molekulalar', u: 'ta' }, f: (x) => (x.p * x.a * x.b * x.c) / (K * x.T) },
          { name: 'Havo massasi m', formula: 'm = p·M·a·b·c / (R·T)', vars: [{ k: 'p', l: 'Bosim p', u: 'Pa', v: '100000' }, { k: 'T', l: 'Harorat T', u: 'K', v: '293' }, { k: 'a', l: 'Bo‘yi a', u: 'm', v: '8' }, { k: 'b', l: 'Eni b', u: 'm', v: '6' }, { k: 'c', l: 'Balandligi c', u: 'm', v: '3' }], out: { s: 'm', l: 'Sinfdagi havo massasi', u: 'kg' }, f: (x) => (x.p * 0.029 * x.a * x.b * x.c) / (R * x.T) },
        ],
      },
      reveal: [{ q: 'Taxmin qiling: 8×6×3 m sinfdagi havo necha kilogramm?', a: 'Taxminan 170 kg! Bu 3–4 o‘quvchining og‘irligiga teng.' }],
    },
    {
      title: 'Jamoaviy topshiriq: o‘z sinfimiz',
      emoji: '📏',
      mission: { t: 'Jamoalar bellashuvi', d: '1-jamoa sinf o‘lchamlarini o‘lchaydi, 2-jamoa barometr va termometrdan qiymatlarni yozadi, 3-jamoa kalkulyatorda hisoblaydi. Darslikdagi jadvalni to‘ldiring: hajm, zichlik, konsentratsiya, molekulalar soni, havo massasi.', sec: 600 },
      note: 'Simob ustunida berilgan bosimni paskalga o‘tkazish: 1 mm sim. ust. ≈ 133 Pa (760 mm sim. ust. ≈ 101 300 Pa).',
    },
  ],
  pairs: [
    ['no‘xat', 'molekula modeli'],
    ['d = V/S', 'bir qavat qatlam qalinligi'],
    ['aneroid barometr', 'havo bosimini o‘lchaydi'],
    ['menzurka', 'hajmni o‘lchaydi'],
    ['29 g/mol', 'havoning molyar massasi'],
    ['ρ = pM/(RT)', 'gaz zichligi'],
  ],
  quiz: [
    Q('No‘xat modelida bitta no‘xat o‘lchami qanday topiladi?', ['d = V / S', 'd = S / V', 'd = V · S', 'd = S − V']),
    Q('Bu modelda no‘xat nimani ifodalaydi?', ['molekulani', 'suvni', 'moy pardasini', 'menzurkani']),
    Q('Havoning molyar massasi?', ['29 g/mol', '18 g/mol', '32 g/mol', '2 g/mol']),
    Q('Sinf havosining zichligi qanday topiladi?', ['ρ = pM/(RT)', 'ρ = RT/(pM)', 'ρ = pV', 'ρ = m·V']),
    Q('Xona hajmi qanday topiladi?', ['V = a·b·c', 'V = a + b + c', 'V = a·b', 'V = 2(a + b)']),
    Q('Havo bosimi qaysi asbob bilan o‘lchanadi?', ['barometr', 'termometr', 'menzurka', 'dinamometr']),
    Q('Ikkinchi usulda nechta no‘xat qatorga teriladi?', ['10 ta', '2 ta', '100 ta', '1 ta']),
  ],
  qa: [
    { q: 'Mashg‘ulotning maqsadi nima?', a: 'Bir qavat qatlam qalinligi zarra diametriga teng degan gipotezani model asosida tekshirish.' },
    { q: 'Nega 10 ta no‘xatni qatorga teramiz?', a: 'Bitta no‘xatni o‘lchash qiyin va xato katta; 10 tasining uzunligini 10 ga bo‘lish aniqroq.' },
    { q: 'Sinfdagi havo molekulalari sonini qanday topamiz?', a: 'N = n · V, bunda n = p/(kT).' },
  ],
  sequences: [
    { title: 'No‘xat tajribasi', items: ['To‘rtburchak chizish', 'No‘xat bilan to‘ldirish', 'Menzurkada hajmni o‘lchash', 'd = V/S ni hisoblash', '10 dona bilan tekshirish'] },
  ],
  odd: [
    { items: ['chizg‘ich', 'menzurka', 'no‘xat', 'dinamometr'], answer: 3, why: 'Dinamometr bu mashg‘ulotda kerak emas.' },
  ],
  units: [
    Q('1 sm³ = ? ml', ['1 ml', '10 ml', '1000 ml', '0,1 ml']),
    Q('150 sm² = ? m²', ['0,015 m²', '1,5 m²', '0,15 m²', '15 m²']),
    Q('760 mm sim. ust. ≈ ? Pa', ['101 300 Pa', '760 Pa', '1013 Pa', '10 130 Pa']),
    Q('20 °C = ? K', ['293 K', '253 K', '20 K', '273 K']),
    Q('8 m × 6 m × 3 m = ? m³', ['144 m³', '17 m³', '48 m³', '96 m³']),
  ],
};

/* ---------- 14-§ ---------- */
const F14 = {
  id: 'fz9-14',
  source: `${SRC1} • 14-§ • 40–49-betlar`,
  title: 'Masalalar yechish. I bobni takrorlash',
  short: 'Izojarayon masalalari, ko‘l tubidagi pufak, I bob qonunlari va test',
  theme: { emoji: '🏁', grad: 'from-blue-950 via-indigo-700 to-sky-400', border: 'border-indigo-200', tag: 'Fizika • 9-sinf • 14-§ • Takrorlash' },
  lesson: [
    {
      title: 'I bob — bitta sxemada',
      emoji: '🗺️',
      table: {
        head: ['Nima', 'Formula'],
        rows: [
          ['MKN asosiy tenglamasi', 'p = ⅓nm₀v̄² = ⅔nĒ = nkT'],
          ['O‘rtacha kinetik energiya', 'Ē = (3/2)kT'],
          ['O‘rtacha kvadratik tezlik', 'v̄ = √(3RT/M)'],
          ['Mendeleyev–Klapeyron', 'pV = (m/M)RT'],
          ['Klapeyron', 'pV/T = const'],
          ['Boyl–Mariott (T = const)', 'pV = const'],
          ['Gey-Lyussak (p = const)', 'V/T = const'],
          ['Sharl (V = const)', 'p/T = const'],
        ],
      },
    },
    {
      title: '1-masala: bosim qanchaga ortdi?',
      emoji: '💉',
      text: 'Gaz 6 l dan 4 l gacha izotermik siqildi. Bosim 0,6 atm (60 kPa) ga ortdi. Dastlabki bosim qancha edi?',
      steps: [
        { e: '1', t: 'Boyl–Mariott', d: 'p₁V₁ = (p₁ + Δp)V₂' },
        { e: '2', t: 'Ochamiz', d: '6p₁ = 4p₁ + 4·60  ⇒  2p₁ = 240' },
        { e: '3', t: 'Javob', d: 'p₁ = 120 kPa' },
      ],
    },
    {
      title: '2–3-masalalar',
      emoji: '✍️',
      steps: [
        { e: '2', t: '2,6 kg gaz, 27 °C, 1,3 m³. Izobarik kengayib, zichligi 1,2 kg/m³ bo‘ldi. T₂ = ?', d: 'V₂ = m/ρ = 2,6 : 1,2 ≈ 2,17 m³; T₂ = T₁V₂/V₁ = 300 · 2,17 : 1,3 = 500 K' },
        { e: '3', t: 'Izoxorik 12 K ga qizdirilganda bosim 1/75 qismga ortdi. T₁ = ?', d: 'Δp/p₁ = ΔT/T₁  ⇒  T₁ = 75 · 12 = 900 K' },
      ],
    },
    {
      title: '4-masala: ko‘l tubidagi pufak',
      emoji: '🫧',
      text: 'Chuqurligi 30 m ko‘l tubidan havo pufakchasi ko‘tarildi. Harorat bir xil. Pufak hajmi necha marta ortadi?',
      steps: [
        { e: '1', t: 'Tubdagi bosim', d: 'p₁ = p₀ + ρgh = 100 000 + 1000 · 10 · 30 = 400 000 Pa' },
        { e: '2', t: 'Sirtdagi bosim', d: 'p₂ = p₀ = 100 000 Pa' },
        { e: '3', t: 'Javob', d: 'V₂/V₁ = p₁/p₂ = 4 marta kattalashadi' },
      ],
      calc: {
        items: [
          { name: 'Pufak: V₂/V₁', formula: 'V₂/V₁ = (p₀ + ρgh) / p₀', vars: [{ k: 'h', l: 'Chuqurlik h', u: 'm', v: '30' }, { k: 'p0', l: 'Atmosfera bosimi p₀', u: 'Pa', v: '100000' }], out: { s: 'V₂/V₁', l: 'Necha marta ortadi', u: 'marta' }, f: (x) => (x.p0 + 1000 * 10 * x.h) / x.p0 },
          { name: 'Chuqurlik h', formula: 'h = (n − 1) · p₀ / (ρg)', vars: [{ k: 'n', l: 'Hajm necha marta ortdi n', u: 'marta', v: '3,5' }, { k: 'p0', l: 'p₀', u: 'Pa', v: '100000' }], out: { s: 'h', l: 'Havza chuqurligi', u: 'm' }, f: (x) => ((x.n - 1) * x.p0) / (1000 * 10) },
        ],
      },
    },
    {
      title: 'O‘zingiz yeching',
      emoji: '🏆',
      reveal: [
        { q: '27 °C da yopiq idishda 900 kPa. 227 °C da bosim?', a: 'p₂ = 900 · 500 : 300 = 1500 kPa' },
        { q: 'Gaz 27 °C dan 117 °C gacha izobarik isitildi. Hajm necha foizga ortadi?', a: '390 : 300 = 1,3 — 30 % ga' },
        { q: 'Pufak tubdan sirtga chiqquncha 3,5 marta kattalashdi. Chuqurlik?', a: 'h = 2,5 · 100 000 : 10 000 = 25 m' },
        { q: 'Berk idish 120 K ga qizdirilganda bosim 2 marta ortdi. T₁ = ?', a: 'T₁ + 120 = 2T₁  ⇒  T₁ = 120 K' },
        { q: 'Izobarik 10 K ga isitilganda hajm 1/20 qismga ortdi. T₁ = ?', a: 'T₁ = 20 · 10 = 200 K' },
        { q: '27 °C dagi gaz izobarik kengayib, hajmi 24 % ga ortdi. T₂ = ?', a: 'T₂ = 1,24 · 300 = 372 K (99 °C)' },
      ],
    },
    {
      title: 'Test: I bobni tekshiramiz',
      emoji: '📝',
      text: 'Darslikdagi test topshiriqlaridan tanlangan savollar «Test», «Millioner» va «Poyga» o‘yinlariga qo‘shildi. Darsdan keyin «O‘yinlarga o‘tish» tugmasini bosing.',
      reveal: [
        { q: 'Hajm 2 marta ortib, tezlik 2 marta kamaysa, bosim?', a: 'p ~ n·v̄² — (1/2)·(1/4) = 1/8: 8 marta kamayadi' },
        { q: 'Bosim 12 marta ortdi, hajm 3 marta kamaydi. T?', a: 'pV/T = const — 12 : 3 = 4 marta ortadi' },
      ],
      mission: { t: 'Jamoaviy test', d: 'Sinfni 2–4 jamoaga bo‘ling va «Millioner» yoki «Poyga» o‘yinini o‘ynang.', sec: 0 },
    },
  ],
  pairs: [
    ['pV = const', 'T = const'],
    ['V/T = const', 'p = const'],
    ['p/T = const', 'V = const'],
    ['pV/T = const', 'm = const'],
    ['p₀ + ρgh', 'suv tubidagi bosim'],
    ['Ē = 3kT/2', 'o‘rtacha kinetik energiya'],
  ],
  quiz: [
    Q('Avogadro soni nimaga teng?', ['hammasi to‘g‘ri: 12 g ugleroddagi, 1 moldagi, 18 g suvdagi zarralar soni', 'faqat 12 g ugleroddagi atomlar soni', 'faqat 18 g suvdagi molekulalar soni', 'faqat 1 g vodoroddagi atomlar soni']),
    Q('25 mol kislorodning massasi?', ['800 g', '144 g', '270 g', '600 g']),
    Q('27 g suvda necha mol bor?', ['1,5 mol', '2 mol', '1,8 mol', '0,9 mol']),
    Q('5 mol suv qancha hajm egallaydi?', ['90 sm³', '18 sm³', '64 sm³', '2 sm³']),
    Q('Hajm 2 marta ortib, v̄ 2 marta kamaysa, bosim?', ['8 marta kamayadi', '4 marta ortadi', '4 marta kamayadi', '8 marta ortadi']),
    Q('Berk idishda v̄ 30 % ga ortsa, bosim?', ['69 % ga ortadi', '30 % ga ortadi', '25 % ga ortadi', '10 % ga ortadi']),
    Q('Ballondagi geliy 27 °C dan 227 °C gacha qizisa, zichlik?', ['o‘zgarmaydi', '2 marta ortadi', '4 marta ortadi', '3 marta ortadi']),
    Q('400 K va 138 kPa da konsentratsiya?', ['2,5·10²⁵ m⁻³', '5·10²⁵ m⁻³', '1,38·10²³ m⁻³', '2,76·10²⁸ m⁻³']),
    Q('50 mol gaz 75 kPa va 27 °C da qancha hajm egallaydi?', ['1,662 m³', '8,31 m³', '31 m³', '6,2 m³']),
    Q('Izotermik jarayonda bosim 2 marta ortdi. v̄?', ['o‘zgarmaydi', '2 marta ortadi', '2 marta kamayadi', '4 marta kamayadi']),
    Q('Izotermik jarayonda bosim 4 marta ortdi. Konsentratsiya?', ['4 marta ortadi', '2 marta ortadi', '4 marta kamayadi', '2 marta kamayadi']),
    Q('Yopiq idishda −96 °C dagi gaz 81 °C gacha qizdirildi. Bosim?', ['2 marta ortadi', '3 marta ortadi', '1,18 marta ortadi', '2,21 marta ortadi']),
    Q('Ballon 400 K ga qizdirilganda bosim 3 marta ortdi. Oxirgi harorat?', ['600 K', '450 K', '900 K', '750 K']),
    Q('2 mol gaz 400 K da 400 kPa bosimda. Hajmi?', ['16,62 l', '8,31 l', '831 l', '41,5 l']),
    Q('Bir xil massali H₂, N₂, O₂ — qaysining partsial bosimi eng katta?', ['vodorod', 'azot', 'kislorod', 'teng']),
    Q('p = 16,6 kPa, ρ = 0,02 kg/m³, M = 2 g/mol. T = ?', ['200 K', '2 K', '275 K', '473 K']),
  ],
  sort: {
    categories: ['Qonun', 'Olim'],
    items: [
      { text: 'pV = const', cat: 0 }, { text: 'V/T = const', cat: 0 }, { text: 'p/T = const', cat: 0 },
      { text: 'Boyl', cat: 1 }, { text: 'Gey-Lyussak', cat: 1 }, { text: 'Sharl', cat: 1 },
    ],
  },
  qa: [
    { q: 'Ko‘l tubidagi bosim qanday topiladi?', a: 'p = p₀ + ρgh.' },
    { q: 'Gaz 1 → 2 holatga o‘tganda qaysi tenglama hammasi uchun o‘rinli?', a: 'Klapeyron tenglamasi: p₁V₁/T₁ = p₂V₂/T₂.' },
    { q: 'Isitilgan yopiq idishda gaz zichligi o‘zgaradimi?', a: 'Yo‘q, massa ham, hajm ham o‘zgarmaydi.' },
    { q: 'Molekulalar tezligi 2 marta ortishi uchun T necha marta ortishi kerak?', a: '4 marta.' },
  ],
  sequences: [
    { title: 'Pufak masalasi', items: ['Jarayonni aniqlash: T = const', 'Tubdagi bosim: p₀ + ρgh', 'Sirtdagi bosim: p₀', 'V₂/V₁ = p₁/p₂'] },
  ],
  odd: [
    { items: ['izotermik', 'izobarik', 'izoxorik', 'diffuziya'], answer: 3, why: 'Diffuziya izojarayon emas.' },
  ],
  units: [
    Q('6 l = ? m³', ['6·10⁻³ m³', '6 m³', '0,6 m³', '6·10⁻⁶ m³']),
    Q('0,6 atm ≈ ? kPa', ['60 kPa', '6 kPa', '600 kPa', '0,6 kPa']),
    Q('−96 °C = ? K', ['177 K', '369 K', '96 K', '−177 K']),
    Q('81 °C = ? K', ['354 K', '192 K', '81 K', '273 K']),
    Q('16,62 l = ? m³', ['0,01662 m³', '16,62 m³', '1,662 m³', '0,1662 m³']),
  ],
};

/* ---------- 15-§ ---------- */
const F15 = {
  id: 'fz9-15',
  source: `${SRC2} • 15-§ • 50–52-betlar`,
  title: 'Ichki energiya',
  short: 'Termodinamika, ichki energiya, ideal gaz: U = (3/2)(m/M)RT = (3/2)pV',
  theme: { emoji: '🔋', grad: 'from-amber-900 via-orange-600 to-rose-400', border: 'border-orange-200', tag: 'Fizika • 9-sinf • 15-§' },
  lesson: [
    {
      title: 'Yangi bob: termodinamika',
      emoji: '🔥',
      text: 'Har qanday jarayonda energiya bir turdan boshqa turga o‘tadi. Shu almashinuvlarni o‘rganadigan bo‘lim — termodinamika. Unda jismlar energiya almashinuvi nuqtayi nazaridan o‘rganiladi.',
      cards: [
        { e: '🏃', t: 'Kinetik energiya', d: 'molekulalarning harakati hisobiga' },
        { e: '🧲', t: 'Potensial energiya', d: 'molekulalarning o‘zaro ta’siri hisobiga' },
      ],
    },
    {
      title: 'Ichki energiya nima?',
      emoji: '🔋',
      rule: 'Jismni tashkil qilgan barcha zarralarning kinetik va potensial energiyalari yig‘indisi — ichki energiya: U = E_k + E_p.',
      ruleLabel: 'Ta’rif',
      vs: {
        q: 'Kimning ichki energiyasi katta?',
        a: { t: 'Bir stakan qaynoq choy', pts: ['harorati baland'] },
        b: { t: 'Bir chelak iliq suv', pts: ['molekulalar ancha ko‘p'] },
      },
      reveal: [{ q: 'To‘g‘ri javob?', a: 'Chelakdagi suv! Ichki energiya haroratga ham, molekulalar soniga (massaga) ham bog‘liq.' }],
    },
    {
      title: 'Ideal gazning ichki energiyasi',
      emoji: '🎈',
      text: 'Ideal gaz molekulalari o‘zaro ta’sirlashmaydi, demak potensial energiya nolga teng. Ichki energiya — faqat molekulalar kinetik energiyalarining yig‘indisi.',
      steps: [
        { e: '1', t: 'Bitta molekula', d: 'Ē = (3/2)kT' },
        { e: '2', t: 'N ta molekula', d: 'U = N · Ē = (3/2)NkT' },
        { e: '3', t: 'N·k = (m/M)·R', d: 'U = (3/2)·(m/M)·R·T' },
        { e: '4', t: 'pV = (m/M)RT', d: 'U = (3/2)·p·V' },
      ],
      rule: 'U = (3/2)·(m/M)·R·T = (3/2)·ν·R·T = (3/2)·p·V   (bir atomli ideal gaz)',
      ruleLabel: 'Formula',
      note: 'Ideal gazning ichki energiyasi massa va absolyut temperatura ko‘paytmasiga to‘g‘ri, molyar massaga teskari proporsional.',
    },
    {
      title: 'Ichki energiyaning o‘zgarishi',
      emoji: '📈',
      rule: 'ΔU = U₂ − U₁ = (3/2)·ν·R·ΔT',
      ruleLabel: 'Formula',
      list: ['Gaz qizisa (ΔT > 0) — ichki energiya ortadi.', 'Gaz sovisa (ΔT < 0) — ichki energiya kamayadi.', 'Harorat o‘zgarmasa (izotermik jarayon) — ideal gazning ichki energiyasi o‘zgarmaydi.'],
      sim: { kind: 'gas', showN: true, title: 'Simulyatsiya: harorat ortsa — molekulalar tezlashadi, U ortadi' },
    },
    {
      title: 'Agregat holat o‘zgarganda',
      emoji: '🧊',
      table: {
        head: ['Jarayon', 'Ichki energiya'],
        rows: [
          ['Muz eriydi (qattiq → suyuq)', 'ortadi'],
          ['Suv muzlaydi (suyuq → qattiq)', 'kamayadi'],
          ['Suv bug‘lanadi (suyuq → gaz)', 'ortadi'],
          ['Bug‘ kondensatsiyalanadi (gaz → suyuq)', 'kamayadi'],
        ],
      },
    },
    {
      title: 'Ichki energiyani qanday o‘zgartirish mumkin?',
      emoji: '✋',
      experiment: {
        t: 'Ish bajarib qizdiramiz',
        need: ['kaftlaringiz', 'yumshoq sim yoki qog‘oz qisqich (skrepka)'],
        steps: ['Kaftlaringizni 10 soniya tez-tez ishqalang.', 'Skrepkani bir joyidan 10–15 marta u yoq-bu yoqqa bukling.', 'Bukilgan joyini lab yoki yonog‘ingizga yaqin tuting (tegizmang).'],
        predict: { q: 'Bukilgan joyda nima sezasiz?', opts: ['Iliq bo‘lib qoladi', 'Soviydi', 'Hech narsa'], a: 0 },
        result: 'Kaftlar ham, skrepkaning bukilgan joyi ham isiydi.',
        why: 'Biz mexanik ish bajardik — u ichki energiyaga aylandi. Ichki energiyani ish bajarib yoki issiqlik uzatib o‘zgartirish mumkin.',
      },
    },
    {
      title: 'Masala va kalkulyator',
      emoji: '✍️',
      text: '12 mol argon 12 °C dan −88 °C gacha sovitildi. Ichki energiya qanday o‘zgaradi?',
      steps: [
        { e: '1', t: 'SI', d: 'T₁ = 285 K; T₂ = 185 K; ΔT = −100 K' },
        { e: '2', t: 'Javob', d: 'ΔU = 1,5 · 12 · 8,31 · (−100) ≈ −15 000 J = −15 kJ (kamayadi)' },
      ],
      calc: {
        items: [
          { name: 'ΔU = 3/2·νRΔT', formula: 'ΔU = (3/2) · ν · R · ΔT', vars: [{ k: 'nu', l: 'Modda miqdori ν', u: 'mol', v: '12' }, { k: 'dT', l: 'ΔT', u: 'K', v: '-100' }], out: { s: 'ΔU', l: 'Ichki energiya o‘zgarishi', u: 'J' }, f: (x) => 1.5 * x.nu * R * x.dT },
          { name: 'U = 3/2·(m/M)RT', formula: 'U = (3/2) · (m/M) · R · T', vars: [{ k: 'm', l: 'Massa m', u: 'kg', v: '0,8' }, { k: 'M', l: 'Molyar massa M', u: 'kg/mol', v: '0,04' }, { k: 'T', l: 'Harorat T', u: 'K', v: '320' }], out: { s: 'U', l: 'Ichki energiya', u: 'J' }, f: (x) => 1.5 * (x.m / x.M) * R * x.T },
          { name: 'U = 3/2·pV', formula: 'U = (3/2) · p · V', vars: [{ k: 'p', l: 'Bosim p', u: 'Pa', v: '75000' }, { k: 'V', l: 'Hajm V', u: 'm³', v: '0,4' }], out: { s: 'U', l: 'Ichki energiya', u: 'J' }, f: (x) => 1.5 * x.p * x.V },
          { name: 'm = 2UM/(3RT)', formula: 'm = 2U · M / (3R · T)', vars: [{ k: 'U', l: 'Ichki energiya U', u: 'J', v: '80000' }, { k: 'M', l: 'Molyar massa M', u: 'kg/mol', v: '0,04' }, { k: 'T', l: 'Harorat T', u: 'K', v: '320' }], out: { s: 'm', l: 'Gaz massasi', u: 'kg' }, f: (x) => (2 * x.U * x.M) / (3 * R * x.T) },
        ],
      },
    },
    {
      title: 'O‘zingiz yeching',
      emoji: '🏆',
      reveal: [
        { q: '47 °C da argonning ichki energiyasi 80 kJ. Massasi? (M = 40 g/mol)', a: 'm = 2UM/(3RT) = 2 · 80 000 · 0,04 : (3 · 8,31 · 320) ≈ 0,8 kg' },
        { q: 'Bir atomli gaz: V = 0,4 m³, U = 45 kJ. Bosim?', a: 'p = 2U/(3V) = 90 000 : 1,2 = 75 kPa' },
        { q: '3 mol neon 40 °C dan −80 °C gacha sovitildi. ΔU?', a: 'ΔU = 1,5 · 3 · 8,31 · (−120) ≈ −4,5 kJ' },
        { q: '80 g geliy 20 °C dan 70 °C gacha qizdirildi. ΔU?', a: 'ν = 20 mol; ΔU = 1,5 · 20 · 8,31 · 50 ≈ 12,5 kJ' },
        { q: 'Lampochkada gaz 17 °C dan 307 °C gacha qiziydi. U necha marta ortadi?', a: '580 : 290 = 2 marta' },
      ],
      mission: { t: 'Uyga vazifa', d: 'Darslikdagi 12-mashqning 1, 3, 4, 7-masalalarini yeching.', sec: 0 },
    },
  ],
  pairs: [
    ['ichki energiya', 'U = E_k + E_p'],
    ['ideal gaz', 'E_p = 0'],
    ['U = (3/2)pV', 'bir atomli gaz'],
    ['ΔU = (3/2)νRΔT', 'ichki energiya o‘zgarishi'],
    ['termodinamika', 'energiya almashinuvini o‘rganadi'],
    ['muz erishi', 'ichki energiya ortadi'],
  ],
  quiz: [
    Q('Ichki energiya nima?', ['zarralar kinetik va potensial energiyalari yig‘indisi', 'jismning harakat energiyasi', 'jismning balandlikdagi energiyasi', 'faqat issiqlik']),
    Q('Ideal gazning ichki energiyasi nimaga bog‘liq?', ['massa, molyar massa va temperaturaga', 'faqat hajmga', 'faqat rangiga', 'idish shakliga']),
    Q('Bir atomli ideal gaz uchun U = ?', ['(3/2)pV', '(2/3)pV', 'pV', '3pV']),
    Q('Ideal gazda potensial energiya?', ['nolga teng', 'juda katta', 'kinetik energiyaga teng', 'manfiy']),
    Q('Izotermik jarayonda ideal gaz ichki energiyasi?', ['o‘zgarmaydi', 'ortadi', 'kamayadi', 'nolga teng bo‘ladi']),
    Q('Suv muzlaganda ichki energiyasi?', ['kamayadi', 'ortadi', 'o‘zgarmaydi', 'ikki marta ortadi']),
    Q('Harorat 2 marta ortsa, ideal gaz U si?', ['2 marta ortadi', '4 marta ortadi', 'o‘zgarmaydi', '√2 marta ortadi']),
    Q('12 mol gaz 100 K ga sovitilsa, ΔU ≈ ?', ['−15 kJ', '+15 kJ', '−1,5 kJ', '−150 kJ']),
  ],
  sort: {
    categories: ['Ichki energiya ortadi', 'Ichki energiya kamayadi'],
    items: [
      { text: 'muz erishi', cat: 0 }, { text: 'suvni qizdirish', cat: 0 }, { text: 'kaftlarni ishqalash', cat: 0 }, { text: 'suv bug‘lanishi', cat: 0 },
      { text: 'suv muzlashi', cat: 1 }, { text: 'choy sovishi', cat: 1 }, { text: 'bug‘ kondensatsiyasi', cat: 1 },
    ],
  },
  qa: [
    { q: 'Termodinamika nimani o‘rganadi?', a: 'Jismlarni energiya almashinuvi nuqtayi nazaridan o‘rganadi.' },
    { q: 'Ideal gaz ichki energiyasi formulasi?', a: 'U = (3/2)(m/M)RT.' },
    { q: 'Ichki energiyani qanday usullar bilan o‘zgartirish mumkin?', a: 'Ish bajarish va issiqlik uzatish orqali.' },
    { q: 'Gaz izobarik kengayganda ichki energiya qanday o‘zgaradi?', a: 'Ortadi, chunki harorat ortadi.' },
  ],
  odd: [
    { items: ['ishqalash', 'bukish', 'urish', 'sovuq joyga qo‘yish'], answer: 3, why: 'Qolganlari ish bajarib qizdirish; sovuq joyda issiqlik uzatiladi.' },
  ],
  sequences: [
    { title: 'U formulasini keltirib chiqarish', items: ['Ē = (3/2)kT', 'U = N·Ē', 'N·k = (m/M)·R', 'U = (3/2)(m/M)RT'] },
  ],
  creative: [
    { task: 'Kundalik hayotdan ichki energiya o‘zgaradigan 5 ta misol toping va har birida u ortadimi yoki kamayadimi, ayting.', time: 90 },
  ],
  units: [
    Q('15 kJ = ? J', ['15 000 J', '1500 J', '150 J', '0,015 J']),
    Q('80 g = ? kg', ['0,08 kg', '0,8 kg', '8 kg', '800 kg']),
    Q('−88 °C = ? K', ['185 K', '361 K', '88 K', '−185 K']),
    Q('45 kJ = ? J', ['45 000 J', '4500 J', '450 J', '4,5 J']),
    Q('300 sm³ = ? m³', ['3·10⁻⁴ m³', '3·10⁻² m³', '0,3 m³', '3·10⁻⁶ m³']),
  ],
};

/* ---------- 16-§ ---------- */
const F16 = {
  id: 'fz9-16',
  source: `${SRC2} • 16-§ • 53–55-betlar`,
  title: 'Termodinamik ish',
  short: 'A = p·ΔV = (m/M)RΔT, R ning ma’nosi, ish — p–V grafik ostidagi yuza',
  theme: { emoji: '⚙️', grad: 'from-stone-800 via-orange-700 to-amber-400', border: 'border-orange-200', tag: 'Fizika • 9-sinf • 16-§' },
  lesson: [
    {
      title: 'Gaz ham ish bajaradi',
      emoji: '🚂',
      text: 'Bug‘ mashinasi, avtomobil dvigateli, choynak qopqog‘ining sakrashi — bularning barchasida qizigan gaz kengayib, ish bajaradi.',
      reveal: [{ q: 'Choynak qaynaganda qopqoq nega sakraydi?', a: 'Bug‘ kengayib, qopqoqni ko‘taradi — gaz tashqi kuchga qarshi ish bajaradi.' }],
    },
    {
      title: 'Ish formulasi',
      emoji: '📐',
      text: 'Erkin porshenli silindrdagi gazni qizdirsak, u izobarik kengayib, porshenni Δh masofaga ko‘taradi.',
      steps: [
        { e: '1', t: 'Mexanik ish', d: 'A = F · Δh' },
        { e: '2', t: 'F = p · S', d: 'A = p · S · Δh' },
        { e: '3', t: 'S · Δh = ΔV', d: 'A = p · ΔV' },
      ],
      rule: 'A = p · ΔV = p · (V₂ − V₁)',
      ruleLabel: 'Gazning izobarik kengayishdagi ishi',
      note: 'Gaz kengaysa — u musbat ish bajaradi. Gaz siqilsa — tashqi kuchlar gaz ustidan ish bajaradi.',
    },
    {
      title: 'Ish va temperatura',
      emoji: '🌡️',
      rule: 'A = (m/M) · R · ΔT    →    1 mol uchun: A = R · ΔT',
      ruleLabel: 'Holat tenglamasidan',
      cards: [{ e: '⭐', t: 'R ning fizik ma’nosi', d: 'Universal gaz doimiysi son jihatdan 1 mol gazni 1 K ga izobarik qizdirganda gaz bajargan ishga teng: R = 8,31 J/(mol·K).' }],
    },
    {
      title: 'Interaktiv: ish — yuza',
      emoji: '📊',
      text: 'p–V grafigida gaz bajargan ish son jihatdan grafik ostidagi yuzaga teng. Jarayonni almashtirib, yuzani solishtiring.',
      sim: { kind: 'pvwork' },
      reveal: [{ q: 'Qaysi jarayonda gaz ish bajarmaydi?', a: 'Izoxorik — hajm o‘zgarmasa, yuza nolga teng: A = 0.' }],
    },
    {
      title: 'Virtual laboratoriya: R ni aniqlaymiz',
      emoji: '🧪',
      lab: {
        kind: 'gas',
        lock: ['p', 'N'],
        N: 60, V: 2, T: 250,
        limits: { Tmin: 250, Tmax: 600 },
        boxTitle: 'Erkin porshenli silindr (p o‘zgarmas)',
        hint: 'Avval 250 K da yozing, keyin 300, 400, 500, 600 K da.',
        title: 'Universal gaz doimiysini tajribada aniqlash',
        goal: 'Gazni izobarik qizdirib, bajarilgan ishni (A = p·ΔV) hisoblash va R = A/(ν·ΔT) ni topish.',
        tools: [
          { e: '🫙', n: 'Erkin porshenli silindr', ok: true, why: 'p o‘zgarmas, porshen ko‘tariladi' },
          { e: '🧭', n: 'Manometr', ok: true, why: 'bosimni o‘lchaydi' },
          { e: '🌡️', n: 'Termometr', ok: true, why: 'haroratni o‘lchaydi' },
          { e: '📏', n: 'Hajm shkalasi', ok: true, why: 'ΔV ni o‘lchaydi' },
          { e: '🔥', n: 'Isitgich', ok: true, why: 'gazni qizdiradi' },
          { e: '🧲', n: 'Magnit', ok: false, why: 'kerak emas' },
          { e: '🔦', n: 'Fonar', ok: false, why: 'kerak emas' },
        ],
        derive: (rows) => {
          if (!rows.length) return rows;
          const b = rows[0];
          return rows.map((r) => {
            const dT = r.T - b.T; const A = r.p * (r.V - b.V); // kPa · l = J
            return { ...r, dT, A, Rx: dT > 0 ? A / (r.nu * dT) : NaN };
          });
        },
        cols: [
          { k: 'T', l: 'T, K', f: (r) => `${r.T}` },
          { k: 'V', l: 'V, l', f: (r) => dec(r.V) },
          { k: 'dT', l: 'ΔT, K', f: (r) => `${r.dT}` },
          { k: 'A', l: 'A = pΔV, J', f: (r) => (r.dT ? `${Math.round(r.A)}` : '0') },
          { k: 'Rx', l: 'R = A/(νΔT)', f: (r) => (Number.isFinite(r.Rx) ? dec(r.Rx.toFixed(2)) : '—') },
        ],
        graph: { title: 'Ish harorat o‘zgarishiga proporsional', x: { k: 'dT', l: 'ΔT, K', max: 350 }, ys: [{ k: 'A', l: 'A, J' }], lines: false, theory: (x, rows) => (rows.length ? rows[0].nu * R * x : NaN) },
        minRows: 4,
        questions: [
          { q: 'R ustunidagi qiymatlar qanday chiqdi?', a: 'Taxminan 8,3 J/(mol·K) — darslikdagi qiymatga yaqin.' },
          { q: 'ΔT 2 marta ortsa, ish qanday o‘zgaradi?', a: '2 marta ortadi: A = νRΔT.' },
          { q: 'Bu tajribada gaz nega musbat ish bajaradi?', a: 'Gaz kengayadi: kuch va porshen ko‘chishi bir yo‘nalishda.' },
        ],
        conclusion: 'Izobarik kengayishda gaz ishi A = p·ΔV = νRΔT. Universal gaz doimiysi R ≈ 8,31 J/(mol·K) — 1 mol gazni 1 K ga izobarik qizdirgandagi ish.',
      },
    },
    {
      title: 'Masala va kalkulyator',
      emoji: '✍️',
      text: 'Porshen ostidagi kislorod 64 K ga izobarik qizdirilganda 16,6 kJ ish bajardi. Kislorod massasi?',
      steps: [{ e: '✓', t: 'Yechim', d: 'm = A·M/(R·ΔT) = 16 600 · 0,032 : (8,31 · 64) ≈ 1 kg' }],
      calc: {
        items: [
          { name: 'A = pΔV', formula: 'A = p · ΔV', vars: [{ k: 'p', l: 'Bosim p', u: 'Pa', v: '100000' }, { k: 'dV', l: 'ΔV', u: 'm³', v: '2·10^-4' }], out: { s: 'A', l: 'Gaz ishi', u: 'J' }, f: (x) => x.p * x.dV },
          { name: 'A = (m/M)RΔT', formula: 'A = (m/M) · R · ΔT', vars: [{ k: 'm', l: 'Massa m', u: 'kg', v: '1' }, { k: 'M', l: 'Molyar massa M', u: 'kg/mol', v: '0,032' }, { k: 'dT', l: 'ΔT', u: 'K', v: '64' }], out: { s: 'A', l: 'Gaz ishi', u: 'J' }, f: (x) => (x.m / x.M) * R * x.dT },
          { name: 'ΔV = A/p', formula: 'ΔV = A / p', vars: [{ k: 'A', l: 'Ish A', u: 'J', v: '48000' }, { k: 'p', l: 'Bosim p', u: 'Pa', v: '160000' }], out: { s: 'ΔV', l: 'Hajm o‘zgarishi', u: 'm³' }, f: (x) => x.A / x.p },
          { name: 'ΔT = AM/(mR)', formula: 'ΔT = A · M / (m · R)', vars: [{ k: 'A', l: 'Ish A', u: 'J', v: '8000' }, { k: 'M', l: 'Molyar massa M', u: 'kg/mol', v: '0,029' }, { k: 'm', l: 'Massa m', u: 'kg', v: '0,4' }], out: { s: 'ΔT', l: 'Harorat o‘zgarishi', u: 'K' }, f: (x) => (x.A * x.M) / (x.m * R) },
        ],
      },
    },
    {
      title: 'O‘zingiz yeching',
      emoji: '🏆',
      reveal: [
        { q: '160 kPa bosimdagi gaz izobarik kengayib, 48 kJ ish bajardi. ΔV?', a: 'ΔV = 48 000 : 160 000 = 0,3 m³' },
        { q: '400 g havo izobarik qizdirildi, 8 kJ ish bajardi. Necha gradusga qizigan?', a: 'ΔT = 8000 · 0,029 : (0,4 · 8,31) ≈ 70 K' },
        { q: '100 kPa da hajm 100 sm³ dan 300 sm³ ga ortdi. Ish?', a: 'A = 100 000 · 2·10⁻⁴ = 20 J' },
        { q: 'Mexanik ish va termodinamik ishning farqi?', a: 'Termodinamik ishda jism (gaz) hajmini o‘zgartiradi, uning ichki holati ham o‘zgaradi.' },
      ],
      mission: { t: 'Uyga vazifa', d: 'Darslikdagi 13-mashqni yeching.', sec: 0 },
    },
  ],
  pairs: [
    ['A = pΔV', 'izobarik ish'],
    ['A = (m/M)RΔT', 'ish va harorat'],
    ['R', '1 mol gazni 1 K ga qizdirgandagi ish'],
    ['izoxorik', 'A = 0'],
    ['p–V yuza', 'son jihatdan ish'],
    ['gaz siqiladi', 'tashqi kuch ish bajaradi'],
  ],
  quiz: [
    Q('Gazning izobarik ishi?', ['A = p·ΔV', 'A = p/ΔV', 'A = V/p', 'A = p·V·T']),
    Q('Izoxorik jarayonda gaz ishi?', ['0', 'p·V', 'νRT', 'cheksiz']),
    Q('R ning fizik ma’nosi?', ['1 mol gazni 1 K ga izobarik qizdirgandagi ish', '1 kg suvni qizdirish uchun issiqlik', 'gaz bosimi', 'molekula massasi']),
    Q('Gaz siqilganda kim ish bajaradi?', ['tashqi kuchlar', 'hech kim', 'faqat gaz', 'idish devori']),
    Q('p–V grafigida ish nimaga teng?', ['grafik ostidagi yuzaga', 'chiziq uzunligiga', 'qiyalik burchagiga', 'nuqtalar soniga']),
    Q('100 kPa da hajm 2·10⁻⁴ m³ ga ortsa, ish?', ['20 J', '200 J', '2 J', '0,5 J']),
    Q('1 mol gazni 10 K ga izobarik qizdirilsa, ish?', ['83,1 J', '8,31 J', '831 J', '10 J']),
  ],
  sort: {
    categories: ['Gaz ish bajaradi (A > 0)', 'Gaz ustida ish bajariladi (A < 0)'],
    items: [
      { text: 'porshen ko‘tariladi', cat: 0 }, { text: 'choynak qopqog‘i sakraydi', cat: 0 }, { text: 'shar shishadi', cat: 0 },
      { text: 'nasos bilan havo siqiladi', cat: 1 }, { text: 'shpritsni bosish', cat: 1 }, { text: 'shar puchayadi', cat: 1 },
    ],
  },
  qa: [
    { q: 'Termodinamik ish nima?', a: 'Gaz hajmi o‘zgarganda tashqi kuchlarga qarshi bajariladigan ish.' },
    { q: 'Izobarik ish formulasini keltirib chiqaring.', a: 'A = FΔh = pSΔh = pΔV.' },
    { q: 'Ishni harorat orqali ifodalang.', a: 'A = (m/M)RΔT.' },
    { q: 'Izotermik kengayishda ish qanday topiladi?', a: 'Grafikda izoterma ostidagi yuza sifatida.' },
  ],
  odd: [
    { items: ['A = pΔV', 'A = νRΔT', 'A = F·s', 'p = F/S'], answer: 3, why: 'p = F/S — bosim formulasi.' },
  ],
  sequences: [
    { title: 'A = pΔV ni chiqarish', items: ['A = F·Δh', 'F = p·S', 'A = p·S·Δh', 'S·Δh = ΔV', 'A = p·ΔV'] },
  ],
  units: [
    Q('16,6 kJ = ? J', ['16 600 J', '1660 J', '166 J', '166 000 J']),
    Q('100 sm³ = ? m³', ['10⁻⁴ m³', '10⁻² m³', '10⁻⁶ m³', '0,1 m³']),
    Q('1 kPa · 1 l = ? J', ['1 J', '1000 J', '0,001 J', '100 J']),
    Q('160 kPa = ? Pa', ['160 000 Pa', '16 000 Pa', '1600 Pa', '1,6 Pa']),
    Q('400 g = ? kg', ['0,4 kg', '4 kg', '40 kg', '0,04 kg']),
  ],
};

/* ---------- 17-§ ---------- */
const C_TABLE = {
  head: ['Modda', 'c, J/(kg·K)', 'Modda', 'c, J/(kg·K)'],
  rows: [
    ['Qo‘rg‘oshin', '130', 'Shisha', '830'],
    ['Kumush', '230', 'Alyuminiy', '890'],
    ['Qalay', '230', 'Muz', '2100'],
    ['Mis', '390', 'Kerosin', '2140'],
    ['Po‘lat', '460', 'Suv', '4200'],
  ],
};
const F17 = {
  id: 'fz9-17',
  source: `${SRC2} • 17-§ • 55–59-betlar`,
  title: 'Issiqlik miqdori',
  short: 'Q = cm(t₂ − t₁), solishtirma issiqlik sig‘imi, kaloriya, issiqlik balansi, kalorimetr',
  theme: { emoji: '♨️', grad: 'from-red-800 via-orange-500 to-yellow-300', border: 'border-orange-200', tag: 'Fizika • 9-sinf • 17-§' },
  lesson: [
    {
      title: 'Issiqlik uzatish',
      emoji: '🍳',
      rule: 'Ish bajarmasdan bir jismdan ikkinchisiga energiya uzatish — issiqlik almashinuvi (issiqlik uzatish).',
      ruleLabel: 'Ta’rif',
      text: 'Issiqlik almashinuvida jism olgan yoki bergan ichki energiya miqdori — issiqlik miqdori (Q). Birligi — joul (J).',
      facts: [
        { n: '1 kal', l: '1 g suvni 1 °C ga isitish uchun' },
        { n: '4,19 J', l: '= 1 kaloriya' },
        { n: '1 kkal', l: '= 1000 kal' },
      ],
    },
    {
      title: 'Issiqlik miqdori formulasi',
      emoji: '📐',
      rule: 'Q = c · m · (t₂ − t₁)',
      ruleLabel: 'Formula',
      list: ['m — jism massasi, kg', 'c — solishtirma issiqlik sig‘imi, J/(kg·K)', 't₂ > t₁ bo‘lsa Q > 0 — jism issiqlik oldi', 't₂ < t₁ bo‘lsa Q < 0 — jism issiqlik berdi'],
    },
    {
      title: 'Solishtirma issiqlik sig‘imi',
      emoji: '🧊',
      rule: '1 kg moddaning haroratini 1 °C (1 K) ga o‘zgartirish uchun kerak bo‘lgan issiqlik miqdori — solishtirma issiqlik sig‘imi: c = Q / (m·Δt).',
      ruleLabel: 'Ta’rif',
      table: C_TABLE,
      note: 'Suvning c si juda katta — shuning uchun dengiz bo‘yida iqlim yumshoq, suv isitgich (grelka)larda ishlatiladi.',
    },
    {
      title: 'Simulyatsiya: kim tez isiydi?',
      emoji: '🔥',
      text: 'Bir xil massali moddalarni bir xil isitgichlar bilan isitamiz. Qaysi biri birinchi bo‘lib 100 °C ga yetadi?',
      sim: { kind: 'heating' },
      reveal: [
        { q: 'Nega mis suvdan 10 marta tez isidi?', a: 'Misning c si suvnikidan 10 marta kichik (390 va 4200): uni isitish uchun kam issiqlik kerak.' },
      ],
    },
    {
      title: 'Virtual laboratoriya: c ni aniqlaymiz',
      emoji: '🧪',
      lab: {
        kind: 'heating',
        subs: ['suv', 'al', 'mis', 'polat'],
        title: 'Elektr isitgich yordamida solishtirma issiqlik sig‘imini aniqlash',
        goal: 'Isitgich bergan issiqlik (Q = P·t) va harorat o‘zgarishidan moddaning c sini topish.',
        tools: [
          { e: '🔌', n: 'Elektr isitgich (500 W)', ok: true, why: 'Q = P·t issiqlik beradi' },
          { e: '🌡️', n: 'Termometr', ok: true, why: 'haroratni o‘lchaydi' },
          { e: '⏱️', n: 'Sekundomer', ok: true, why: 'isitish vaqtini o‘lchaydi' },
          { e: '⚖️', n: 'Tarozi', ok: true, why: 'massani o‘lchaydi' },
          { e: '🧲', n: 'Magnit', ok: false, why: 'kerak emas' },
          { e: '📐', n: 'Transportir', ok: false, why: 'kerak emas' },
          { e: '🔦', n: 'Fonar', ok: false, why: 'kerak emas' },
        ],
        steps: ['Moddani va massasini tanlang.', 'Isitgichni yoqing.', 'Biroz vaqtdan keyin o‘chiring.', 'Jadvalga yozing — c o‘zi hisoblanadi.'],
        cols: [
          { k: 'n', l: 'Modda' },
          { k: 'm', l: 'm, kg', f: (r) => dec(r.m) },
          { k: 'time', l: 't, s', f: (r) => `${r.time}` },
          { k: 'dt', l: 'Δt, °C', f: (r) => dec(r.dt) },
          { k: 'Q', l: 'Q = P·t, J', f: (r) => `${r.Q}` },
          { k: 'c', l: 'c, J/(kg·K)', f: (r) => `${Math.round(r.c)}` },
          { k: 'ct', l: 'jadvalda', f: (r) => `${r.ct}` },
        ],
        minRows: 3,
        questions: [
          { q: 'Tajribadagi c jadvaldagidan biroz katta chiqdi. Nega?', a: 'Isitgich issiqligining bir qismi idish va havoga ketdi — modda o‘ylagandan kamroq issiqlik oldi.' },
          { q: 'Qaysi moddani isitish uchun eng ko‘p issiqlik kerak?', a: 'Suvni — uning c si eng katta.' },
          { q: 'Massa 2 marta ortsa, bir xil Δt uchun issiqlik?', a: '2 marta ko‘p kerak bo‘ladi: Q = cmΔt.' },
        ],
        conclusion: 'Har bir moddaning o‘z solishtirma issiqlik sig‘imi bor. Uni c = Q/(m·Δt) formula bilan tajribada aniqlash mumkin.',
      },
    },
    {
      title: 'Issiqlik balansi tenglamasi',
      emoji: '⚖️',
      text: 'Atrofdan yaxshi ajratilgan jismlar tizimi — yopiq sistema. Unda issiq jismlar issiqlik beradi, sovuqlari oladi, haroratlar tenglashguncha.',
      rule: 'Q₁ + Q₂ + … (bergan) = Q′₁ + Q′₂ + … (olgan)',
      ruleLabel: 'Issiqlik balansi',
      note: 'Issiqlik yo‘qdan bor bo‘lmaydi va bordan yo‘q bo‘lmaydi — faqat bir jismdan boshqasiga o‘tadi. Bu energiyaning saqlanish qonuni.',
    },
    {
      title: 'Kalorimetr',
      emoji: '🧪',
      text: '«Kalorimetr» — «issiqlikni o‘lchash» degani (lotincha calor — issiqlik, yunoncha metreo — o‘lchash).',
      cards: [
        { e: '🥫', t: 'Ichki idish', d: 'yupqa devorli metall idish' },
        { e: '🧱', t: 'Tagliklar va tashqi idish', d: 'issiqlikni kam o‘tkazadi' },
        { e: '🌡️', t: 'Termometr', d: 'aralashma haroratini o‘lchaydi' },
        { e: '🥄', t: 'Aralashtirgich', d: 'harorat tez tenglashadi' },
      ],
      rule: 'c = (c₁m₁ + c₂m₂)(θ − t₁) / (m (t₂ − θ))',
      ruleLabel: 'Jismning c sini kalorimetrda topish',
    },
    {
      title: 'Masala va kalkulyator',
      emoji: '✍️',
      text: 'Suv 210 m balandlikdan tushmoqda. Og‘irlik kuchi ishi to‘liq suvni isitishga ketsa, suv harorati qanchaga ortadi?',
      steps: [
        { e: '1', t: 'Tenglik', d: 'm·g·h = c·m·Δt' },
        { e: '2', t: 'Javob', d: 'Δt = g·h/c = 9,81 · 210 : 4200 ≈ 0,49 K' },
      ],
      calc: {
        items: [
          { name: 'Q = cmΔt', formula: 'Q = c · m · (t₂ − t₁)', vars: [{ k: 'c', l: 'c', u: 'J/(kg·K)', v: '450' }, { k: 'm', l: 'Massa m', u: 'kg', v: '0,5' }, { k: 't1', l: 't₁', u: '°C', v: '10' }, { k: 't2', l: 't₂', u: '°C', v: '310' }], out: { s: 'Q', l: 'Issiqlik miqdori', u: 'J' }, f: (x) => x.c * x.m * (x.t2 - x.t1) },
          { name: 'c = Q/(mΔt)', formula: 'c = Q / (m · Δt)', vars: [{ k: 'Q', l: 'Issiqlik Q', u: 'J', v: '1281600' }, { k: 'm', l: 'Massa m', u: 'kg', v: '3' }, { k: 'dt', l: 'Δt', u: '°C', v: '480' }], out: { s: 'c', l: 'Solishtirma issiqlik sig‘imi', u: 'J/(kg·K)' }, f: (x) => x.Q / (x.m * x.dt) },
          { name: 'Δt = gh/c', formula: 'Δt = g · h / c', vars: [{ k: 'h', l: 'Balandlik h', u: 'm', v: '210' }, { k: 'c', l: 'c', u: 'J/(kg·K)', v: '4200' }], out: { s: 'Δt', l: 'Harorat ortishi', u: 'K' }, f: (x) => (9.81 * x.h) / x.c },
          { name: 'kal → J', formula: 'Q (J) = Q (kal) · 4,19', vars: [{ k: 'k', l: 'Kaloriya', u: 'kal', v: '1000' }], out: { s: 'Q', l: 'Joulda', u: 'J' }, f: (x) => x.k * 4.19 },
        ],
      },
    },
    {
      title: 'O‘zingiz yeching',
      emoji: '🏆',
      reveal: [
        { q: '0,5 kg jism (c = 450) 10 °C dan 310 °C gacha qizdirildi. Q?', a: 'Q = 450 · 0,5 · 300 = 67 500 J' },
        { q: '3 kg jism 20 °C dan 500 °C gacha qizib, 1281,6 kJ oldi. Qanday modda?', a: 'c = 1 281 600 : (3 · 480) = 890 — alyuminiy' },
        { q: '20 °C dagi 1,5 l suv qaynaguncha qancha issiqlik oladi?', a: 'Q = 4200 · 1,5 · 80 = 504 000 J = 504 kJ' },
        { q: 'Bir xil balandlikdan alyuminiy, qo‘rg‘oshin va temir sharlar tashlandi. Qaysi biri ko‘proq qiziydi?', a: 'Qo‘rg‘oshin — c si eng kichik.' },
      ],
      mission: { t: 'Uyga vazifa', d: 'Darslikdagi 14-mashqni yeching. Uyda choynakdagi suv qaynashi uchun ketgan vaqtni o‘lchang.', sec: 0 },
    },
  ],
  pairs: [
    ['Q = cmΔt', 'issiqlik miqdori'],
    ['c (suv)', '4200 J/(kg·K)'],
    ['c (mis)', '390 J/(kg·K)'],
    ['1 kal', '4,19 J'],
    ['kalorimetr', 'issiqlikni o‘lchash asbobi'],
    ['issiqlik balansi', 'bergan = olgan'],
    ['c (alyuminiy)', '890 J/(kg·K)'],
  ],
  quiz: [
    Q('Issiqlik miqdori formulasi?', ['Q = cm(t₂ − t₁)', 'Q = mgh', 'Q = pΔV', 'Q = mv²/2']),
    Q('Suvning solishtirma issiqlik sig‘imi?', ['4200 J/(kg·K)', '390 J/(kg·K)', '890 J/(kg·K)', '130 J/(kg·K)']),
    Q('1 kaloriya necha joul?', ['4,19 J', '0,24 J', '1000 J', '1 J']),
    Q('Qaysi modda bir xil issiqlikdan eng ko‘p isiydi?', ['qo‘rg‘oshin', 'suv', 'alyuminiy', 'kerosin']),
    Q('Issiqlik balansi tenglamasi qaysi qonunga asoslangan?', ['energiyaning saqlanish qonuni', 'Boyl–Mariott qonuni', 'Om qonuni', 'Nyuton qonuni']),
    Q('Solishtirma issiqlik sig‘imining birligi?', ['J/(kg·K)', 'J/kg', 'W', 'kg/m³']),
    Q('Q < 0 bo‘lsa, jism…', ['issiqlik berdi', 'issiqlik oldi', 'ish bajardi', 'erib ketdi']),
    Q('0,5 kg suvni 10 °C ga isitish uchun?', ['21 000 J', '2100 J', '4200 J', '42 000 J']),
  ],
  sort: {
    categories: ['Tez isiydi (c kichik)', 'Sekin isiydi (c katta)'],
    items: [
      { text: 'qo‘rg‘oshin', cat: 0 }, { text: 'mis', cat: 0 }, { text: 'kumush', cat: 0 }, { text: 'po‘lat', cat: 0 },
      { text: 'suv', cat: 1 }, { text: 'kerosin', cat: 1 }, { text: 'muz', cat: 1 },
    ],
  },
  qa: [
    { q: 'Issiqlik miqdori nima?', a: 'Issiqlik almashinuvida jism olgan yoki bergan ichki energiya miqdori.' },
    { q: 'Solishtirma issiqlik sig‘imini ta’riflang.', a: '1 kg moddani 1 °C ga isitish uchun kerak bo‘lgan issiqlik miqdori.' },
    { q: 'Issiqlik balansi tenglamasining mohiyati?', a: 'Issiq jismlar bergan issiqlik sovuq jismlar olgan issiqlikka teng.' },
    { q: 'Nega dengiz bo‘yida iqlim yumshoq?', a: 'Suvning c si katta: u sekin isiydi va sekin soviydi.' },
  ],
  odd: [
    { items: ['joul', 'kaloriya', 'kilokaloriya', 'paskal'], answer: 3, why: 'Paskal — bosim birligi.' },
  ],
  sequences: [
    { title: 'Kalorimetrda c ni topish', items: ['Kalorimetr va suv massasini o‘lchash', 'Suv haroratini o‘lchash', 'Jismni qaynoq suvda isitish', 'Jismni kalorimetrga tushirish', 'Umumiy haroratni o‘lchash', 'Issiqlik balansidan c ni hisoblash'] },
  ],
  debate: [
    { claim: 'Qishda isitish uchun suvli radiatorlar havoli isitgichdan yaxshiroq', pro: 'Suv ko‘p issiqlik to‘playdi va sekin soviydi.', con: 'Suvni isitish uchun ko‘p vaqt va energiya kerak.' },
  ],
  units: [
    Q('1 kkal = ? kal', ['1000 kal', '100 kal', '4,19 kal', '10 kal']),
    Q('1 kal ≈ ? J', ['4,19 J', '0,24 J', '1 J', '1000 J']),
    Q('504 kJ = ? J', ['504 000 J', '50 400 J', '5040 J', '504 J']),
    Q('1,5 l suv = ? kg', ['1,5 kg', '15 kg', '0,15 kg', '150 kg']),
    Q('200 g = ? kg', ['0,2 kg', '2 kg', '20 kg', '0,02 kg']),
    Q('Δt = 10 °C bo‘lsa, ΔT = ?', ['10 K', '283 K', '263 K', '0 K']),
  ],
};

/* ---------- 18-§ ---------- */
const F18 = {
  id: 'fz9-18',
  source: `${SRC2} • 18-§ • 60–62-betlar`,
  title: 'Masalalar yechish (ichki energiya, ish, issiqlik)',
  short: 'Ichki energiya yo‘ldan bog‘liq emas, izobarik ish, suv aralashtirish, o‘q qizishi',
  theme: { emoji: '🧮', grad: 'from-rose-900 via-red-700 to-amber-500', border: 'border-rose-200', tag: 'Fizika • 9-sinf • 18-§' },
  lesson: [
    {
      title: 'Kerakli formulalar',
      emoji: '📋',
      table: {
        head: ['Nima', 'Formula'],
        rows: [
          ['Ichki energiya', 'U = (3/2)νRT = (3/2)pV'],
          ['Ichki energiya o‘zgarishi', 'ΔU = (3/2)νRΔT'],
          ['Izobarik ish', 'A = pΔV = νRΔT'],
          ['Issiqlik miqdori', 'Q = cmΔt'],
          ['Issiqlik balansi', 'Q bergan = Q olgan'],
          ['Ikki suv aralashmasi', 'θ = (m₁t₁ + m₂t₂) / (m₁ + m₂)'],
        ],
      },
    },
    {
      title: '1-masala: qaysi yo‘l bilan?',
      emoji: '🛣️',
      text: 'Gaz 1-holatdan 3-holatga ikki yo‘l bilan o‘tdi: 1→2→3 (avval izoxorik, keyin izobarik) va 1→4→3 (avval izobarik, keyin izoxorik). Ichki energiya o‘zgarishi qanday?',
      rule: 'ΔU = (3/2)(p₃V₃ − p₁V₁) — faqat boshlang‘ich va oxirgi holatga bog‘liq, yo‘lga bog‘liq emas.',
      ruleLabel: 'Javob: ikkala yo‘lda bir xil',
    },
    {
      title: '2-masala: izobarik ish',
      emoji: '⚙️',
      text: 'Gaz 7 °C dan 77 °C gacha izobarik isitildi. p = 125 kPa, V₁ = 2 l. Gaz qancha ish bajardi?',
      steps: [
        { e: '1', t: 'Yangi hajm', d: 'V₂ = V₁ · T₂ / T₁ = 2 · 350 : 280 = 2,5 l' },
        { e: '2', t: 'Ish', d: 'A = p(V₂ − V₁) = 125 000 · 0,5·10⁻³ = 62,5 J' },
      ],
    },
    {
      title: '3-masala: vanna uchun suv',
      emoji: '🛁',
      text: '15 °C li sovuq va 100 °C li qaynoq suvdan 40 °C li 85 l suv tayyorlandi. Har biridan qanchadan olingan?',
      steps: [
        { e: '1', t: 'Balans', d: 'V₁(t − t₁) = V₂(t₂ − t), V₁ + V₂ = 85 l' },
        { e: '2', t: 'Sovuq suv', d: 'V₁ = V(t₂ − t)/(t₂ − t₁) = 85 · 60 : 85 = 60 l' },
        { e: '3', t: 'Qaynoq suv', d: 'V₂ = 85 − 60 = 25 l' },
      ],
      calc: {
        items: [
          { name: 'Aralashma θ', formula: 'θ = (m₁t₁ + m₂t₂) / (m₁ + m₂)', vars: [{ k: 'm1', l: 'm₁', u: 'kg', v: '125' }, { k: 't1', l: 't₁', u: '°C', v: '15' }, { k: 'm2', l: 'm₂', u: 'kg', v: '25' }, { k: 't2', l: 't₂', u: '°C', v: '45' }], out: { s: 'θ', l: 'Aralashma harorati', u: '°C' }, f: (x) => (x.m1 * x.t1 + x.m2 * x.t2) / (x.m1 + x.m2) },
          { name: 'Sovuq suv hajmi', formula: 'V₁ = V · (t₂ − θ) / (t₂ − t₁)', vars: [{ k: 'V', l: 'Umumiy hajm V', u: 'l', v: '85' }, { k: 't1', l: 'Sovuq suv t₁', u: '°C', v: '15' }, { k: 't2', l: 'Issiq suv t₂', u: '°C', v: '100' }, { k: 'th', l: 'Kerakli θ', u: '°C', v: '40' }], out: { s: 'V₁', l: 'Sovuq suv', u: 'l' }, f: (x) => (x.V * (x.t2 - x.th)) / (x.t2 - x.t1) },
        ],
      },
    },
    {
      title: '4-masala: o‘q qumga tiqildi',
      emoji: '🎯',
      text: '800 m/s tezlikdagi po‘lat o‘q qumga tiqildi. Ajralgan issiqlikning 60 % i qumga ketsa, o‘q qanchaga qiziydi? c = 460 J/(kg·K).',
      steps: [
        { e: '1', t: 'O‘qqa qoladi', d: '(1 − 0,6) = 0,4 qismi: c·m·Δt = 0,4 · m·v²/2' },
        { e: '2', t: 'Javob', d: 'Δt = 0,4 · v² / (2c) = 0,4 · 640 000 : 920 ≈ 278 K' },
      ],
      calc: {
        items: [
          { name: 'O‘q qizishi', formula: 'Δt = η · v² / (2c)', vars: [{ k: 'v', l: 'Tezlik v', u: 'm/s', v: '800' }, { k: 'eta', l: 'O‘qqa qolgan ulush η', u: '', v: '0,4' }, { k: 'c', l: 'c', u: 'J/(kg·K)', v: '460' }], out: { s: 'Δt', l: 'O‘q harorati ortishi', u: 'K' }, f: (x) => (x.eta * x.v * x.v) / (2 * x.c) },
          { name: 'A = pV₁(T₂/T₁ − 1)', formula: 'A = p · V₁ · (T₂/T₁ − 1)', vars: [{ k: 'p', l: 'Bosim p', u: 'Pa', v: '125000' }, { k: 'V1', l: 'V₁', u: 'm³', v: '2·10^-3' }, { k: 'T1', l: 'T₁', u: 'K', v: '280' }, { k: 'T2', l: 'T₂', u: 'K', v: '350' }], out: { s: 'A', l: 'Gaz ishi', u: 'J' }, f: (x) => x.p * x.V1 * (x.T2 / x.T1 - 1) },
        ],
      },
    },
    {
      title: 'Jamoaviy masala poygasi',
      emoji: '🏁',
      reveal: [
        { q: '27 °C da geliyning ichki energiyasi 50 kJ. Massasi?', a: 'm = 2UM/(3RT) = 2 · 50 000 · 0,004 : (3 · 8,31 · 300) ≈ 0,054 kg = 54 g' },
        { q: 'Bir atomli gaz bosimi 30 % kamayib, hajmi 6 marta ortdi. U?', a: 'U ~ pV: 0,7 · 6 = 4,2 marta ortadi' },
        { q: '27 °C, 10 l, 100 kPa dagi gaz 60 K ga izobarik qizdirildi. Ish?', a: 'A = pV·ΔT/T = 100 000 · 0,01 · 60 : 300 = 200 J' },
        { q: '25 mol gaz 20 K ga qizdirildi, hajm 20 % ortdi. T₁ va A?', a: 'ΔT/T₁ = 0,2 — T₁ = 100 K; A = 25 · 8,31 · 20 ≈ 4155 J' },
        { q: '90 °C li 8 kg suvga 20 °C li qancha suv qo‘shsak, 30 °C bo‘ladi?', a: '8 · 60 = m · 10 — m = 48 kg' },
        { q: '15 °C li 125 l va 45 °C li 25 l suv aralashtirildi. θ?', a: 'θ = (125 · 15 + 25 · 45) : 150 = 20 °C' },
        { q: 'Vannaga 10 °C va 90 °C suvdan 50 °C li 80 l suv tayyorlandi. Har biridan?', a: '40 l dan' },
        { q: 'O‘q (800 m/s) issiqligining 54 % i qumga ketdi. O‘q qanchaga qiziydi?', a: 'Δt = 0,46 · 640 000 : 920 = 320 K' },
      ],
      mission: { t: 'Poyga qoidasi', d: 'Har jamoaga 2 ta masala. 5 daqiqada to‘g‘ri yechgan jamoa har masala uchun 10 ball oladi.', sec: 300 },
    },
  ],
  pairs: [
    ['ΔU', 'yo‘lga bog‘liq emas'],
    ['A = pΔV', 'izobarik ish'],
    ['θ = (m₁t₁ + m₂t₂)/(m₁ + m₂)', 'bir xil suvlar aralashmasi'],
    ['62,5 J', '2-masala javobi'],
    ['60 l va 25 l', '3-masala javobi'],
    ['278 K', '4-masala javobi'],
  ],
  quiz: [
    Q('Gaz 1→3 holatga turli yo‘llar bilan o‘tsa, ΔU?', ['bir xil', 'har xil', 'nolga teng', 'yo‘l uzunligiga bog‘liq']),
    Q('Bir xil massali 20 °C va 60 °C suvlar aralashtirilsa, θ?', ['40 °C', '80 °C', '30 °C', '20 °C']),
    Q('Ichki energiya U ~ ?', ['pV', 'p/V', 'V/p', 'p + V']),
    Q('Izobarik ish A = ?', ['pΔV', 'VΔp', 'p/ΔV', '0']),
    Q('O‘q qumga tiqilganda kinetik energiya nimaga aylanadi?', ['ichki energiyaga', 'potensial energiyaga', 'yorug‘likka', 'hech nimaga']),
    Q('Bir xil massa va ΔT da qaysi gaz ko‘proq izobarik ish bajaradi: H₂ yoki He?', ['vodorod (2 marta ko‘p)', 'geliy', 'teng', 'hech biri']),
  ],
  sequences: [
    { title: 'Suv aralashtirish masalasi', items: ['Kim issiqlik beradi, kim oladi — aniqlash', 'Q berilgan = Q olingan', 'Massalarni hajm orqali ifodalash', 'Tenglamani yechish'] },
  ],
  qa: [
    { q: 'Ichki energiya o‘zgarishi nimalarga bog‘liq?', a: 'Faqat boshlang‘ich va oxirgi holatga.' },
    { q: '125 kPa da hajm 0,5 l ortsa, ish?', a: '62,5 J.' },
    { q: 'Bir xil massali H₂ va He bir xil ΔT da izobarik qizdirilsa, ishlar nisbati?', a: 'A_H₂ : A_He = 2 : 1, chunki ν = m/M.' },
  ],
  odd: [
    { items: ['Q = cmΔt', 'A = pΔV', 'ΔU = (3/2)νRΔT', 'I = U/R'], answer: 3, why: 'Om qonuni bu bobga tegishli emas.' },
  ],
  units: [
    Q('7 °C = ? K', ['280 K', '266 K', '7 K', '273 K']),
    Q('77 °C = ? K', ['350 K', '196 K', '77 K', '273 K']),
    Q('85 l suv = ? kg', ['85 kg', '8,5 kg', '850 kg', '0,85 kg']),
    Q('0,5 l = ? m³', ['5·10⁻⁴ m³', '5·10⁻³ m³', '0,5 m³', '5·10⁻² m³']),
    Q('60 % = ?', ['0,6', '6', '0,06', '60']),
  ],
};

/* ---------- 19-§ ---------- */
const F19 = {
  id: 'fz9-19',
  source: `${SRC2} • 19-§ • 63-bet`,
  title: 'Amaliy mashg‘ulot. Jismlarda issiqlik muvozanatini o‘rganish',
  short: 'Issiq va sovuq suv: har daqiqada termometr ko‘rsatkichi, grafik, muvozanat harorati',
  theme: { emoji: '⚖️', grad: 'from-sky-900 via-indigo-600 to-rose-400', border: 'border-indigo-200', tag: 'Fizika • 9-sinf • 19-§ • Amaliy mashg‘ulot' },
  lesson: [
    {
      title: 'Mashg‘ulot maqsadi',
      emoji: '🎯',
      text: 'Issiqlik muvozanati qanday yuzaga kelishini kuzatamiz: issiq va sovuq suvning harorati vaqt o‘tishi bilan qanday o‘zgaradi?',
      cards: [
        { e: '🥣', t: 'Idish', d: 'issiq suv uchun' },
        { e: '🛍️', t: 'Polietilen paket', d: 'sovuq suv uchun' },
        { e: '🌡️', t: 'Ikkita termometr', d: 'har biriga bittadan' },
        { e: '⏱️', t: 'Elektron soat', d: 'har daqiqada o‘lchash' },
      ],
    },
    {
      title: 'Bajarish tartibi',
      emoji: '📋',
      steps: [
        { e: '1', t: 'Jadval chizing', d: 'Vaqt (daqiqa), issiq suv harorati, sovuq suv harorati.' },
        { e: '2', t: 'Issiq suv', d: 'Idishga issiq suv quyib, termometr tushiring.' },
        { e: '3', t: 'Sovuq suv', d: 'Paketga sovuq suv solib, ikkinchi termometrni tushiring.' },
        { e: '4', t: 'Birlashtiring', d: 'Paketni issiq suvli idish ichiga tushiring (shtativga ip bilan osib).' },
        { e: '5', t: 'Har daqiqada yozing', d: 'Muvozanat qaror topgandan keyin ham bir necha daqiqa kuzating.' },
        { e: '6', t: 'Grafik chizing', d: 'Ikkala chiziqni bitta koordinata tekisligida.' },
      ],
      note: 'Issiq suvni o‘qituvchi quysin. Termometrlarni ehtiyotkorlik bilan ushlang.',
    },
    {
      title: 'Virtual laboratoriya: issiqlik muvozanati',
      emoji: '🧪',
      lab: {
        kind: 'equilibrium',
        title: 'Issiq va sovuq suv — muvozanatgacha',
        goal: 'Issiq suvning sovishi va sovuq suvning isishini vaqt bo‘yicha kuzatish, muvozanat harorati va vaqtini aniqlash.',
        tools: [
          { e: '🥣', n: 'Idish', ok: true, why: 'issiq suv uchun' },
          { e: '🛍️', n: 'Polietilen paket', ok: true, why: 'sovuq suv uchun' },
          { e: '🌡️', n: 'Ikkita termometr', ok: true, why: 'ikkala suvni o‘lchaydi' },
          { e: '⏱️', n: 'Elektron soat', ok: true, why: 'vaqtni o‘lchaydi' },
          { e: '🧵', n: 'Shtativ va ip', ok: true, why: 'paketni osib turadi' },
          { e: '🧲', n: 'Magnit', ok: false, why: 'kerak emas' },
          { e: '🔋', n: 'Batareya', ok: false, why: 'kerak emas' },
        ],
        steps: ['Suvlarning massasi va haroratini tanlang.', 'Paketni idishga tushiring.', 'Jadvalni kuzating.', 'Grafikda muvozanat nuqtasini toping.'],
        cols: [{ k: 'time', l: 'Vaqt, s', f: (r) => `${r.time}` }, { k: 'hot', l: 'Issiq suv, °C', f: (r) => dec(r.hot) }, { k: 'cold', l: 'Sovuq suv, °C', f: (r) => dec(r.cold) }],
        graph: { title: 'Issiq suv soviydi, sovuq suv isiydi', x: { k: 'time', l: 'vaqt, s', max: 120 }, ys: [{ k: 'hot', l: 'issiq suv', color: '#E2463F' }, { k: 'cold', l: 'sovuq suv', color: '#1D4ED8' }], zeroY: false },
        minRows: 6,
        questions: [
          { q: 'Issiqlik almashinuvida ichki energiyalar qanday o‘zgaradi?', a: 'Issiq suvniki kamayadi, sovuq suvniki ortadi.' },
          { q: 'Muvozanatdan keyin ichki energiya o‘zgaradimi?', a: 'Suvlar orasida issiqlik almashinuvi to‘xtaydi; faqat atrofga ozgina issiqlik ketishi mumkin.' },
          { q: 'Muvozanat harorati issiq suvga yaqinmi yoki sovuqqa?', a: 'Massasi kattaroq suvning haroratiga yaqinroq.' },
        ],
        conclusion: 'Issiqlik issiq suvdan sovuq suvga o‘tadi va haroratlar tenglashadi — termodinamik muvozanat qaror topadi. Grafikdagi ikki chiziq bitta haroratga intiladi.',
      },
    },
    {
      title: 'Uyda tajriba: piyoladagi choy',
      emoji: '🍵',
      experiment: {
        home: true,
        t: 'Choy qanday soviydi?',
        need: ['piyolada issiq choy', 'termometr (bo‘lsa)', 'soat'],
        steps: ['Choyning boshlang‘ich haroratini o‘lchang.', 'Har 2 daqiqada haroratni yozing (20 daqiqa davomida).', 'Grafik chizing.'],
        predict: { q: 'Choy qaysi paytda tezroq soviydi?', opts: ['Boshida, issiq paytida', 'Oxirida', 'Bir tekis soviydi'], a: 0 },
        result: 'Boshida tez, keyin sekin-asta soviydi va xona haroratiga yaqinlashadi.',
        why: 'Choy va havo haroratlari farqi qancha katta bo‘lsa, issiqlik shuncha tez uzatiladi.',
      },
    },
    {
      title: 'Xulosa',
      emoji: '✅',
      reveal: [
        { q: 'Issiqlik muvozanati nima?', a: 'Issiqlik almashinuvi natijasida jismlar haroratining tenglashishi.' },
        { q: 'Muvozanat harorati formulasi (bir xil moddalar uchun)?', a: 'θ = (m₁t₁ + m₂t₂) / (m₁ + m₂)' },
      ],
      mission: { t: 'Hisobot', d: 'Daftaringizga jadval, grafik va xulosani yozing. Darslikdagi 2 ta savolga javob bering.', sec: 0 },
    },
  ],
  pairs: [
    ['muvozanat', 'haroratlar tenglashadi'],
    ['issiq suv', 'issiqlik beradi'],
    ['sovuq suv', 'issiqlik oladi'],
    ['polietilen paket', 'sovuq suv idishi'],
    ['termometr', 'haroratni o‘lchaydi'],
    ['grafik', 'ikki chiziq bitta nuqtaga intiladi'],
  ],
  quiz: [
    Q('Issiqlik qaysi suvdan qaysi suvga o‘tadi?', ['issiqdan sovuqqa', 'sovuqdan issiqqa', 'ikkalasidan havoga', 'o‘tmaydi']),
    Q('Muvozanatda ikkala suv harorati?', ['bir xil', 'har xil', 'issiq suvniki baland', 'sovuq suvniki baland']),
    Q('Issiq suvning ichki energiyasi?', ['kamayadi', 'ortadi', 'o‘zgarmaydi', 'nolga teng bo‘ladi']),
    Q('1 kg 80 °C va 1 kg 20 °C suv aralashtirilsa?', ['50 °C', '100 °C', '60 °C', '40 °C']),
    Q('Necha daqiqada bir marta o‘lchash kerak?', ['har daqiqada', 'faqat boshida', 'faqat oxirida', 'har soatda']),
  ],
  sequences: [
    { title: 'Mashg‘ulot tartibi', items: ['Jadval chizish', 'Issiq suvni idishga quyish', 'Sovuq suvni paketga solish', 'Paketni idishga tushirish', 'Har daqiqada o‘lchash', 'Grafik va xulosa'] },
  ],
  qa: [
    { q: 'Termodinamik muvozanat harorati nima?', a: 'Issiqlik almashinuvi to‘xtagandagi umumiy harorat.' },
    { q: 'Nega sovuq suvni paketga solamiz?', a: 'Paket yupqa — issiqlik yaxshi o‘tadi, suvlar esa aralashmaydi.' },
  ],
  odd: [
    { items: ['termometr', 'soat', 'paket', 'magnit'], answer: 3, why: 'Magnit bu mashg‘ulotda kerak emas.' },
  ],
  units: [
    Q('2 daqiqa = ? s', ['120 s', '60 s', '200 s', '20 s']),
    Q('300 ml suv ≈ ? kg', ['0,3 kg', '3 kg', '30 kg', '0,03 kg']),
    Q('80 °C = ? K', ['353 K', '193 K', '80 K', '273 K']),
    Q('1 soat = ? s', ['3600 s', '60 s', '600 s', '100 s']),
  ],
};

/* ---------- 20-§ ---------- */
const F20 = {
  id: 'fz9-20',
  source: `${SRC2} • 20-§ • 64–65-betlar`,
  title: 'Laboratoriya ishi. Qattiq jismlarning solishtirma issiqlik sig‘imini aniqlash',
  short: 'Kalorimetr, issiqlik balansi, uch xil massali jism, o‘rtacha c',
  theme: { emoji: '🧪', grad: 'from-emerald-900 via-teal-700 to-amber-300', border: 'border-teal-200', tag: 'Fizika • 9-sinf • 20-§ • Laboratoriya ishi' },
  lesson: [
    {
      title: 'Ishning maqsadi',
      emoji: '🎯',
      text: 'Kalorimetr yordamida qattiq jismning solishtirma issiqlik sig‘imini aniqlashni o‘rganamiz. Topilgan qiymatni jadval bilan solishtirib, jism qanday moddadan yasalganini aniqlaymiz.',
      cards: [
        { e: '🥫', t: 'Kalorimetr', d: 'alyuminiy, c = 890 J/(kg·K)' },
        { e: '⚖️', t: 'Tarozi', d: 'massalarni o‘lchaydi' },
        { e: '🌡️', t: 'Termometr', d: 'haroratlarni o‘lchaydi' },
        { e: '🔩', t: '3 ta jism', d: 'bir xil moddadan, massasi har xil' },
      ],
    },
    {
      title: 'Formulani keltirib chiqaramiz',
      emoji: '📐',
      steps: [
        { e: '1', t: 'Jism berdi', d: 'Q = c·m₃·(t₂ − θ)' },
        { e: '2', t: 'Kalorimetr va suv oldi', d: 'Q₁ + Q₂ = (c₁m₁ + c₂m₂)(θ − t₁)' },
        { e: '3', t: 'Issiqlik balansi', d: 'c·m₃·(t₂ − θ) = (c₁m₁ + c₂m₂)(θ − t₁)' },
      ],
      rule: 'c = (c₁m₁ + c₂m₂)(θ − t₁) / (m₃(t₂ − θ))',
      ruleLabel: 'Ishchi formula',
      note: 'm₁, c₁ — kalorimetr; m₂, c₂ — suv (c₂ = 4200); t₁ — suvning boshlang‘ich harorati; m₃ — jism; t₂ — qaynoq suv harorati (100 °C); θ — umumiy harorat.',
    },
    {
      title: 'Virtual laboratoriya: kalorimetr',
      emoji: '🧪',
      lab: {
        kind: 'calorimeter',
        material: { n: 'mis', c: 390 },
        bodies: [0.1, 0.15, 0.2],
        title: 'Qattiq jismning solishtirma issiqlik sig‘imini aniqlash',
        goal: 'Uchta bir xil moddadan yasalgan, massasi har xil jism uchun c ni topish va o‘rtacha qiymatni hisoblash.',
        tools: [
          { e: '🥫', n: 'Kalorimetr va aralashtirgich', ok: true, why: 'issiqlik almashinadigan yopiq sistema' },
          { e: '⚖️', n: 'Tarozi', ok: true, why: 'kalorimetr va jism massasini o‘lchaydi' },
          { e: '🌡️', n: 'Termometr', ok: true, why: 'haroratlarni o‘lchaydi' },
          { e: '🧪', n: 'Menzurka', ok: true, why: 'suv hajmini o‘lchaydi' },
          { e: '♨️', n: 'Qaynoq suv', ok: true, why: 'jismni 100 °C gacha isitadi' },
          { e: '🔩', n: '3 ta jism', ok: true, why: 'tekshiriladigan modda' },
          { e: '🧲', n: 'Magnit', ok: false, why: 'kerak emas' },
          { e: '🔋', n: 'Batareya', ok: false, why: 'kerak emas' },
        ],
        steps: ['Har bir qadamni ketma-ket «Bajarish» bilan bajaring.', 'Jismni kalorimetrga tushiring.', 'Natijani jadvalga yozing.', 'Uchala jism uchun takrorlang.'],
        derive: (rows) => {
          const cav = rows.length ? rows.reduce((s, r) => s + r.c, 0) / rows.length : NaN;
          return rows.map((r) => ({ ...r, cav }));
        },
        cols: [
          { k: 'm1', l: 'm₁, kg', f: (r) => dec(r.m1) },
          { k: 'm2', l: 'm₂, kg', f: (r) => dec(r.m2) },
          { k: 'm3', l: 'm₃, kg', f: (r) => dec(r.m3) },
          { k: 't1', l: 't₁, °C', f: (r) => dec(r.t1) },
          { k: 'th', l: 'θ, °C', f: (r) => dec(r.th) },
          { k: 'c', l: 'c, J/(kg·K)', f: (r) => `${Math.round(r.c)}` },
          { k: 'cav', l: 'c o‘rtacha', f: (r) => `${Math.round(r.cav)}` },
        ],
        minRows: 3,
        questions: [
          { q: 'O‘rtacha c jadvaldagi qaysi moddaga yaqin?', a: 'Taxminan 380–390 J/(kg·K) — mis.' },
          { q: 'Nega uchala jismda c bir xil chiqdi?', a: 'Solishtirma issiqlik sig‘imi massaga bog‘liq emas — u moddaning xossasi.' },
          { q: 'Xatolik qayerdan kelishi mumkin?', a: 'Jismni ko‘chirishda sovishi, kalorimetrdan atrofga issiqlik ketishi, termometrni o‘qishdagi xato.' },
          { q: 'Nega jismni tez ko‘chirish kerak?', a: 'Havoda sovib qolsa, uning harorati 100 °C dan past bo‘lib qoladi.' },
        ],
        conclusion: 'Kalorimetr va issiqlik balansi tenglamasi yordamida jismning solishtirma issiqlik sig‘imini aniqladik. Natija jismning moddasini aniqlashga imkon beradi.',
      },
    },
    {
      title: 'Jadval bilan solishtiring',
      emoji: '📋',
      table: C_TABLE,
      reveal: [{ q: 'Tajribada c ≈ 900 chiqsa, jism qanday moddadan?', a: 'Alyuminiydan (890 J/(kg·K)).' }],
    },
    {
      title: 'Kalkulyator: o‘z natijangizni tekshiring',
      emoji: '🧮',
      calc: {
        items: [
          { name: 'Kalorimetr formulasi', formula: 'c = (c₁m₁ + c₂m₂)(θ − t₁) / (m₃(t₂ − θ))', vars: [{ k: 'm1', l: 'Kalorimetr m₁', u: 'kg', v: '0,062' }, { k: 'c1', l: 'Kalorimetr c₁', u: 'J/(kg·K)', v: '890' }, { k: 'm2', l: 'Suv m₂', u: 'kg', v: '0,15' }, { k: 't1', l: 'Suv t₁', u: '°C', v: '20' }, { k: 'm3', l: 'Jism m₃', u: 'kg', v: '0,1' }, { k: 't2', l: 'Jism t₂', u: '°C', v: '100' }, { k: 'th', l: 'Umumiy θ', u: '°C', v: '24,2' }], out: { s: 'c', l: 'Jismning c si', u: 'J/(kg·K)' }, f: (x) => ((x.c1 * x.m1 + 4200 * x.m2) * (x.th - x.t1)) / (x.m3 * (x.t2 - x.th)) },
        ],
      },
      mission: { t: 'Hisobot', d: 'Daftaringizga jadvalni ko‘chiring, o‘rtacha c ni hisoblang va xulosa yozing. Darslikdagi 3 ta savolga javob bering.', sec: 0 },
    },
  ],
  pairs: [
    ['m₁, c₁', 'kalorimetr'],
    ['m₂, c₂', 'suv'],
    ['m₃', 'tekshiriladigan jism'],
    ['t₂', 'qaynoq suv harorati, 100 °C'],
    ['θ', 'umumiy harorat'],
    ['c (mis)', '390 J/(kg·K)'],
  ],
  quiz: [
    Q('Kalorimetr qaysi moddadan yasalgan (bu ishda)?', ['alyuminiy', 'mis', 'shisha', 'po‘lat']),
    Q('Jism qayerda qizdiriladi?', ['qaynab turgan suvda', 'olovda', 'muzlatgichda', 'quyoshda']),
    Q('Ishchi formula qaysi tenglamaga asoslangan?', ['issiqlik balansi', 'Boyl–Mariott', 'Mendeleyev–Klapeyron', 'Om qonuni']),
    Q('Uch xil massali jismda c qanday chiqishi kerak?', ['bir xil', 'massaga proporsional', 'massaga teskari', 'har xil']),
    Q('Tajribada c ≈ 460 chiqsa, jism?', ['po‘lat', 'mis', 'qo‘rg‘oshin', 'alyuminiy']),
    Q('Suvning c si?', ['4200 J/(kg·K)', '890 J/(kg·K)', '390 J/(kg·K)', '2100 J/(kg·K)']),
  ],
  sequences: [
    { title: 'Laboratoriya ishi tartibi', items: ['Kalorimetrni tortish', 'Suv quyib, massasini hisoblash', 'Suv haroratini o‘lchash', 'Jismni tortish', 'Jismni qaynoq suvda isitish', 'Jismni kalorimetrga tushirish', 'Umumiy haroratni o‘lchab, c ni hisoblash'] },
  ],
  qa: [
    { q: 'Solishtirma issiqlik sig‘imini tushuntiring.', a: '1 kg moddani 1 K ga isitish uchun kerak bo‘lgan issiqlik miqdori.' },
    { q: 'Ishchi formulani yozing.', a: 'c = (c₁m₁ + c₂m₂)(θ − t₁) / (m₃(t₂ − θ)).' },
    { q: 'Nega uchta jism bilan o‘lchaymiz?', a: 'O‘rtacha qiymat aniqroq bo‘ladi, tasodifiy xatolar kamayadi.' },
  ],
  odd: [
    { items: ['kalorimetr', 'termometr', 'tarozi', 'ampermetr'], answer: 3, why: 'Ampermetr bu ishda kerak emas.' },
  ],
  units: [
    Q('62 g = ? kg', ['0,062 kg', '0,62 kg', '6,2 kg', '0,0062 kg']),
    Q('150 ml suv = ? kg', ['0,15 kg', '1,5 kg', '15 kg', '0,015 kg']),
    Q('100 °C = ? K', ['373 K', '100 K', '273 K', '173 K']),
    Q('890 J/(kg·°C) = ? J/(kg·K)', ['890 J/(kg·K)', '1163 J/(kg·K)', '617 J/(kg·K)', '8,9 J/(kg·K)']),
  ],
};

export const FIZIKA_9_P2 = [F11, F12, F13, F14, F15, F16, F17, F18, F19, F20];
