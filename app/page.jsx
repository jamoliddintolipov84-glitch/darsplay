'use client';

/**
 * Dars play — interaktiv dars va o‘yinlar platformasi (MVP, bitta fayl)
 * Joylashuv: app/page.jsx  (Next.js App Router + Tailwind CSS)
 * Kerakli paket: npm i lucide-react
 * Ma’lumotlar hozircha mock (Supabase keyingi bosqichda ulanadi).
 */

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  Play, LogOut, Send, ArrowLeft, ArrowRight, ChevronRight, ChevronLeft, BookOpen,
  Calculator, Globe, Languages, Landmark, Leaf, Atom, FlaskConical, Monitor, PenLine,
  MessageSquare, Shuffle, Brain, ListChecks, Target, MessageCircleQuestion, Sparkles,
  Camera, List, Disc3, PlusCircle, Users, User, Trophy, Timer, RotateCcw, Check, X,
  Maximize, Minimize, GraduationCap, School, Lightbulb, Eye, Lock, CheckCircle2, Plus,
  Minus, Loader2, UserCheck, KeyRound, ShieldCheck, Copy, EyeOff, Search, UserPlus, Pencil, Building2, LogIn, RefreshCw, Settings, ChevronDown, LayoutGrid, CameraOff, Trash2, Save, Ruler, Bomb, Gift, Repeat, Zap,
  ThumbsUp, ThumbsDown, Puzzle, Heart, Crown, Rocket, Flag, Dices, SpellCheck,
  Volume2, VolumeX, History, Medal, CalendarDays, Star, ListPlus, NotebookPen, CircleHelp,
  ListOrdered, Shapes, Scale, Palette,
} from 'lucide-react';

/* ============================================================
   1. MOCK MA’LUMOTLAR
   ============================================================ */

const SUBJECTS = [
  { id: 'ona-tili', name: 'Ona tili', icon: PenLine, color: 'bg-blue-600' },
  { id: 'adabiyot', name: 'Adabiyot', icon: BookOpen, color: 'bg-indigo-600' },
  { id: 'matematika', name: 'Matematika', icon: Calculator, color: 'bg-sky-600' },
  { id: 'geometriya', name: 'Geometriya', icon: Ruler, color: 'bg-cyan-600' },
  { id: 'ingliz-tili', name: 'Ingliz tili', icon: Languages, color: 'bg-violet-600' },
  { id: 'rus-tili', name: 'Rus tili', icon: MessageSquare, color: 'bg-purple-600' },
  { id: 'tarix', name: 'Tarix', icon: Landmark, color: 'bg-amber-600' },
  { id: 'geografiya', name: 'Geografiya', icon: Globe, color: 'bg-teal-600' },
  { id: 'biologiya', name: 'Biologiya', icon: Leaf, color: 'bg-emerald-600' },
  { id: 'fizika', name: 'Fizika', icon: Atom, color: 'bg-blue-800' },
  { id: 'kimyo', name: 'Kimyo', icon: FlaskConical, color: 'bg-rose-600' },
  { id: 'informatika', name: 'Informatika', icon: Monitor, color: 'bg-slate-700' },
];

const GRADES = [5, 6, 7, 8, 9, 10, 11];

const REGIONS = [
  'Toshkent shahri', 'Toshkent viloyati', 'Andijon viloyati', 'Buxoro viloyati',
  'Farg‘ona viloyati', 'Jizzax viloyati', 'Xorazm viloyati', 'Namangan viloyati',
  'Navoiy viloyati', 'Qashqadaryo viloyati', 'Qoraqalpog‘iston Respublikasi',
  'Samarqand viloyati', 'Sirdaryo viloyati', 'Surxondaryo viloyati',
];

const DEFAULT_ROSTER = [
  'Abdullayev Sardor', 'Aliyeva Madina', 'Bahodirov Jasur', 'Ergasheva Nilufar',
  'Fayzullayev Bobur', 'G‘aniyeva Shahzoda', 'Hamidov Asadbek', 'Ismoilova Dilnoza',
  'Jo‘rayev Otabek', 'Karimova Sevara', 'Latipov Doniyor', 'Mahmudova Zarina',
  'Nazarov Sherzod', 'Olimova Gulnoza', 'Po‘latov Azizbek', 'Qodirova Malika',
  'Rahimov Javohir', 'Saidova Muxlisa', 'Tursunov Islom', 'Umarova Feruza',
  'Valiyev Ulug‘bek', 'Xoliqova Kamola', 'Yusupov Diyorbek', 'Zokirova Mohinur',
];

/* --- To‘liq dars tushuntirishlari (slaydlar) --- */
const FULL_LESSONS = {
  dalillash: [
    {
      title: 'Darsga kirish',
      text: 'Bu darsda Sanjar Tursunovning «Sangardak qo‘shig‘i» matni o‘qiladi. Muallif ona qishlog‘i va uning odamlari haqida yozib, o‘z fikrlarini hayotiy voqealar bilan asoslaydi.',
      list: [
        'Matnni tushunib o‘qish va asosiy g‘oyani aniqlash',
        'Muallif fikrini qanday dalillaganini topish',
        'Fikrni dalillash usullarini o‘rganish',
        'Ko‘p ma’noli so‘zlarning matndagi ma’nosini aniqlash',
      ],
      note: 'Kirish savoli: «Buloq bo‘lmasa, irmoq, irmoq bo‘lmasa, daryo yo‘q» degan fikrning Vatan tushunchasi bilan qanday bog‘liqligi bor?',
    },
    {
      title: 'Matn mazmuni: bola va qush voqeasi',
      text: 'Matn qahramoni bolaligida o‘yindan boshqa narsani o‘ylamas edi. Maktabdan kela solib, qo‘lbola o‘q-yoy bilan tutzorga chopar, qush otib, o‘rtoqlariga maqtanardi.',
      list: [
        'Bir kuni chiroyli qushni nishonga olganida, sinfdoshining otasi kelib qolib, unga qattiq tanbeh beradi.',
        'Bola yig‘lab uyiga borib otasiga aytadi, ammo otasi ham uni bu ishi uchun koyiydi.',
        'Bola bu voqeaning sababini yigirma besh yildan keyin tushunadi.',
        'O‘sha tanbeh tufayli u qush tugul chumoliga ham ozor bermaydigan inson bo‘lib ulg‘ayadi.',
      ],
      rule: 'Muallif bu voqea orqali qishloqda «bu — sening bolang», «bu — mening bolam» degan tushuncha yo‘qligini, har bir bolani butun qishloq birgalikda tarbiyalashini ko‘rsatadi.',
    },
    {
      title: 'Matn mazmuni: qishloq odamlari',
      text: 'Muallif Sangardak odamlarining fe’l-atvorini bir necha misol bilan ochib beradi.',
      list: [
        'Mehnatkash: ular toshloq joyda ham ko‘z ochib yumguncha bog‘ barpo eta oladi.',
        'Hazilkash va farosatli: to‘yda oshpaz to‘y egasining hazilini sezsa ham, uni izza qilmaslik uchun sir saqlaydi.',
        'Tarbiyachi: birinchi muallim muallifga «qarzga» besh baho qo‘yib, ishonchni oqlashni o‘rgatadi.',
        'Qishloqqa bog‘langan: muallifning ukasi Toshkentni orzu qilsa-da, qo‘y-qo‘zi tashvishi bilan yashaydi.',
      ],
      note: 'Birinchi muallimning saboqi: «Hech qachon maqtovni qarzga olishga o‘rganma. Hammasi o‘z o‘rnida bo‘lsin.»',
    },
    {
      title: 'Matnning asosiy g‘oyasi',
      text: 'Muallif kichik qishlog‘iga bo‘lgan mehri orqali butun Vatanni sevishini aytadi. Inson ko‘pincha bu mehrini o‘zi ham sezmaydi.',
      rule: 'Buloq → irmoq → daryo → ummon. Har bir qishloq — Vatanning buloqlaridan biri. Ummon esa bitta — O‘zbekiston. Buloq qancha tiniq bo‘lsa, ummon ham shuncha tiniq bo‘ladi.',
      examples: ['Sangardak — yurtimning bir bo‘lagi', 'Kichik qishloq siymosida buyuk Vatan'],
    },
    {
      title: 'Fikrni dalillash',
      text: 'Biror mavzuda fikr bildirganda uni shunchaki aytib qo‘yish yetarli emas. Tinglovchi yoki o‘quvchi ishonishi uchun fikr asoslanishi kerak.',
      rule: 'Yozuvchi yoki so‘zlovchi biror mavzuda fikrini ifodalar ekan, uni dalillashi — tushuntirishi, izohlashi, isbotlashi muhim. Buning uchun iqtibos, kichik hikoya, rivoyat, she’riy misralar, maqol va shu kabilardan foydalaniladi.',
      examples: ['tushuntirish', 'izohlash', 'isbotlash'],
    },
    {
      title: 'Dalil turlari',
      text: 'Fikrni asoslashda quyidagi vositalardan foydalanish mumkin:',
      table: {
        head: ['Dalil turi', 'Nima', 'Misol'],
        rows: [
          ['Iqtibos', 'Mashhur shaxs yoki manba so‘zini aynan keltirish', '«Salom berishni keng yoyinglar — muhabbatingiz ziyoda bo‘ladi» (hadis)'],
          ['Kichik hikoya', 'Hayotda bo‘lgan voqeani qisqa so‘zlab berish', 'Bolaning qush otgani uchun tanbeh olgani'],
          ['Rivoyat', 'Xalq orasida aytiladigan ibratli voqea', 'Buyuk ajdodlar hayotidan rivoyatlar'],
          ['She’riy misra', 'Fikrga mos she’r parchasi', '«Matematika — fanlar ichra shoh...» (Qori Niyoziy)'],
          ['Maqol', 'Xalq hikmati', '«Tug‘ilgan yerdan ko‘ngil uzilmas, yurt qo‘riganning yurti buzilmas»'],
        ],
      },
    },
    {
      title: 'Muallif keltirgan dalillar',
      text: 'Darslikdagi 1.2-topshiriqda muallif fikrlarini asoslash uchun 4 ta dalil keltirgani aytiladi. Matndan quyidagi voqealarni topish mumkin:',
      table: {
        head: ['Muallif fikri', 'Dalil'],
        rows: [
          ['Qishloqda har bir bola — umumiy farzand', 'Bolalikdagi qush voqeasi va olingan tanbeh'],
          ['Qishloq odamlarining qo‘lida qudrat bor', 'Toshloq joyda ham bog‘ barpo etishlari'],
          ['Ular bir-biriga qadrdon, oqibatli', 'To‘ydagi oshpaz va guruch hazili'],
          ['Qishloq menga saboq bergan', 'Birinchi muallimning «qarzga» qo‘ygan bahosi'],
        ],
      },
    },
    {
      title: 'Ko‘p ma’noli so‘zlar (1.1-topshiriq)',
      text: 'Matnda qo‘llangan ayrim so‘zlar ikki ma’noga ega. Gapdan qaysi ma’no kelayotganini aniqlash kerak.',
      table: {
        head: ['So‘z', '1-ma’nosi', '2-ma’nosi', 'Matnda'],
        rows: [
          ['saraton', 'o‘n ikki burjning biri', 'shamsiya yil hisobida 4-oy (22-iyun–21-iyul)', '«saratondayam yomg‘ir yog‘adi» — oy'],
          ['go‘sha', 'joy, maskan', 'odamlar nazaridan uzoq yer, ovloq joy', '«kindik qoni to‘kilgan go‘shasi» — maskan'],
          ['siymo', 'shaxs, zot', 'qiyofa, ko‘rinish', '«qishlog‘im siymosida» — qiyofa'],
          ['saboq', 'dars, mashg‘ulot, bilim', 'ibrat, o‘rnak', '«menga saboq berdi» — ibrat'],
        ],
      },
    },
    {
      title: 'Matn yuzasidan savollar',
      text: 'Darslikdagi savollar asosida suhbat o‘tkazing:',
      list: [
        'Matnda qishloq odamlarining qaysi xususiyatlari tilga olingan?',
        'Nima uchun bola chumoliga ham ozor bermaydigan inson bo‘lib ulg‘aydi?',
        'Muallifning oshpaz bilan bog‘liq voqeani matnga kiritishdan maqsadi nima?',
        'Inson yashab turgan maskaniga bo‘lgan mehri bilan butun mamlakatni sevishga qodirligini, ammo buni o‘zi sezmasligini qanday izohlaysiz?',
      ],
    },
    {
      title: 'Amaliy topshiriq',
      text: 'Quyidagi fikrlardan birini iqtibos, kichik hikoya, rivoyat, she’riy misra yoki maqol bilan dalillang (1.3–1.4-topshiriqlar):',
      list: [
        'Ona yurt — bu ildizimiz, tariximiz, kelajagimiz.',
        'Ma’naviyat — millatni ulug‘laydigan eng muqaddas kuch.',
        'Yurtga sadoqat bilan xizmat qilgan inson xalq qalbida mangu yashaydi.',
        'Tinchlik bor joyda taraqqiyot, baxt va osoyishtalik hukm suradi.',
      ],
      note: 'Yozma ish: «Men qishlog‘im/shahrimni yaxshi ko‘raman. Chunki...» jumlasini davom ettiring.',
    },
  ],

  'soz-tarkibi': [
    {
      title: 'Darsga kirish',
      text: '«Sangardak qo‘shig‘i» matni asosida so‘zning tuzilishi va qo‘shimchalarning vazifasi takrorlanadi.',
      list: ['Iboralar va ularning ma’nosi', 'Kelishiklar va qo‘shimchalari', 'So‘z yasovchi qo‘shimchalar', 'So‘z tarkibi: asos va qo‘shimcha', 'Qo‘shimcha qo‘shilganda imlo', 'Qo‘shma so‘zlarning yozilishi'],
    },
    {
      title: 'Ibora (1.5-topshiriq)',
      text: 'Ibora — bir butun ma’no anglatadigan turg‘un so‘z birikmasi. Iborani bir so‘z bilan almashtirib ko‘ring: gapning mazmuni saqlansa ham, ta’sirchanligi, obrazliligi yo‘qoladi.',
      table: {
        head: ['Ibora', 'Ma’nosi'],
        rows: [
          ['ko‘zini shamg‘alat qilmoq', 'bildirmay, sezdirmay'],
          ['sho‘rini quritmoq', 'jabr qilmoq, nobud qilmoq'],
          ['ko‘zlari g‘azabdan yonmoq', 'qattiq g‘azablanmoq'],
          ['qishloqni boshiga ko‘tarmoq', 'baland ovozda yig‘lamoq, shovqin solmoq'],
        ],
      },
    },
    {
      title: 'Kelishiklar (1.6-topshiriq)',
      text: 'Kelishik qo‘shimchalari otni boshqa so‘zga bog‘laydi. O‘zbek tilida oltita kelishik bor:',
      table: {
        head: ['Kelishik', 'Qo‘shimcha', 'So‘rog‘i', 'Misol'],
        rows: [
          ['Bosh', '—', 'kim? nima?', 'qishloq go‘zal'],
          ['Qaratqich', '-ning', 'kimning? nimaning?', 'odamlarning mardligi'],
          ['Tushum', '-ni', 'kimni? nimani?', 'mamlakatni sevish'],
          ['Jo‘nalish', '-ga (-ka, -qa)', 'kimga? qayerga?', 'tutzorga oshiqmoq'],
          ['O‘rin-payt', '-da', 'qayerda? qachon?', 'to‘yda'],
          ['Chiqish', '-dan', 'kimdan? qayerdan?', 'maktabdan kelmoq'],
        ],
      },
      note: 'k bilan tugagan so‘zga -ka (yo‘lakka, bekka), q bilan tugagan so‘zga -qa (qishloqqa, tayoqqa) qo‘shiladi.',
    },
    {
      title: 'So‘z tarkibi: asos',
      text: 'So‘z tarkibi asos va qo‘shimcha(lar)dan iborat.',
      rule: 'Asosning xususiyatlari: a) so‘zning o‘zak ma’nosini ifodalaydi; b) mustaqil qo‘llana oladi; d) yasalish uchun asos vazifasini bajaradi.',
      examples: ['yaxshi + lik', 'gul + zor', 'qishloq + im', 'kitob + lar + ni'],
    },
    {
      title: 'So‘z tarkibi: qo‘shimcha',
      text: 'Qo‘shimcha asosga qo‘shilib keladi va o‘zicha ishlatilmaydi.',
      rule: 'Qo‘shimchalarning xususiyatlari: a) mustaqil qo‘llana olmaydi; b) asosga qo‘shilib, unga yangi yoki qo‘shimcha ma’no beradi; d) so‘zlarni bog‘lashga xizmat qiladi.',
      table: {
        head: ['Vazifasi', 'Misol (1.8-topshiriq)'],
        rows: [
          ['Yangi ma’no hosil qiladi (so‘z yasaydi)', 'gulzor, elparvar'],
          ['Qo‘shimcha ma’no yuklaydi', 'odamlar, uycha'],
          ['Egalik orqali bog‘laydi', 'mening yurtim, sevimli mashg‘ulotingiz'],
          ['Kelishik orqali bog‘laydi', 'mahallani aylanmoq, uyga qaytmoq'],
          ['Bajaruvchini ko‘rsatadi', 'biz boramiz, uydan chiqaman'],
        ],
      },
      note: 'Ko‘makchi ham so‘zlarni bog‘laydi: yurt haqida o‘ylamoq, uy tomon ketmoq.',
    },
    {
      title: 'So‘z yasovchi qo‘shimchalar (1.7-topshiriq)',
      text: 'Matndan shu qo‘shimchalar bilan yasalgan so‘zlarni toping va har biriga uchtadan misol yozing.',
      table: {
        head: ['Qo‘shimcha', 'Matndagi so‘z', 'Misollar'],
        rows: [
          ['-lik', 'yaxshilik', 'halollik, shirinlik, attorlik'],
          ['-zor', 'tutzor', 'gulzor, olmazor, paxtazor'],
          ['-li', 'mehrli', 'g‘ayratli, kuchli, aqlli'],
          ['-loq', 'toshloq', 'qumloq, o‘tloq, botqoq'],
          ['-chilik', 'xursandchilik', 'dehqonchilik, mehmondorchilik'],
          ['-iston', 'O‘zbekiston', 'Guliston, Turkiston'],
        ],
      },
    },
    {
      title: 'Imlo: qo‘shimcha qo‘shilganda (1.9-topshiriq)',
      text: 'Ayrim so‘zlarga qo‘shimcha qo‘shilganda tovush o‘zgaradi, tushib qoladi yoki orttiriladi.',
      table: {
        head: ['So‘z + qo‘shimcha', 'Yozilishi', 'Nima o‘zgardi'],
        rows: [
          ['yo‘lak + ga', 'yo‘lakka', 'g → k'],
          ['taroq + im', 'tarog‘im', 'q → g‘'],
          ['saboq + im', 'sabog‘im', 'q → g‘'],
          ['o‘rtoq + ing', 'o‘rtog‘ing', 'q → g‘'],
          ['tayoq + ga', 'tayoqqa', 'g → q'],
          ['o‘g‘il + i', 'o‘g‘li', 'i tushadi'],
          ['bag‘ir + im', 'bag‘rim', 'i tushadi'],
          ['mavzu + i', 'mavzusi', '-si qo‘shiladi'],
          ['obro‘ + ing', 'obro‘ying', 'y orttiriladi'],
          ['chiq + gan', 'chiqqan', 'g → q'],
          ['o‘sha + ga', 'o‘shanga', 'n orttiriladi'],
        ],
      },
    },
    {
      title: 'Xatolarni tuzatish (1.10-topshiriq)',
      text: 'Qo‘shimcha noto‘g‘ri qo‘llangan birikmalar va ularning to‘g‘ri shakli:',
      table: {
        head: ['Xato', 'To‘g‘ri'],
        rows: [
          ['mahallani guzari', 'mahallaning guzari'],
          ['uyni tomi', 'uyning tomi'],
          ['so‘ngi qaror', 'so‘nggi qaror'],
          ['ko‘chat ekgani kelmoq', 'ko‘chat ekkani kelmoq'],
          ['quyosh chiqgach', 'quyosh chiqqach'],
          ['issiqgina palov', 'issiqqina palov'],
          ['o‘n nafar bolalar', 'o‘n nafar bola'],
          ['ko‘pchilik qatnashdilar', 'ko‘pchilik qatnashdi'],
          ['kitobni o‘qilishi', 'kitobning o‘qilishi'],
        ],
      },
    },
    {
      title: 'Qo‘shma so‘zlarning yozilishi (1.11-topshiriq)',
      text: 'So‘zlarni qo‘shib, ajratib yoki chiziqcha bilan yozilishiga ko‘ra guruhlang.',
      table: {
        head: ['Qo‘shib yoziladi', 'Ajratib yoziladi', 'Chiziqcha bilan'],
        rows: [
          ['ko‘zoynak', 'sotib olmoq', 'ich-ichidan'],
          ['allaqachon', 'ayta oladi', 'kuppa-kunduzi'],
          ['jigarrang', 'g‘ayrat qilmoq', 'dam-badam'],
          ['umumdavlat', 'osma ko‘prik', 'yangidan-yangi'],
          ['o‘rinbosar', 'to‘q qizil', 'uy-uyiga'],
          ['Oltiariq, radiomarkaz', 'shirin so‘z', 'don-dun'],
        ],
      },
    },
  ],

  manodosh: [
    {
      title: 'Darsga kirish',
      text: 'Bu darsda Qo‘chqor Norqobilning «Bu uyda O‘zbekiston yashayapti» matni o‘qiladi. Matnda xorijdagi bir xonadonda o‘zbek xalqiga bo‘lgan hurmat haqida hikoya qilinadi.',
      note: 'Kirish savoli: Xorijlik mehmon Vataningiz haqida so‘rasa, avvalo nimalarni gapirib bergan bo‘lardingiz? Nega?',
      list: ['Matnni tushunib o‘qish', 'Notanish so‘zlar ma’nosini aniqlash', 'Ma’nodosh so‘zlar', 'Fikrni dalillovchi va axborot beruvchi jumlalar'],
    },
    {
      title: 'Matn mazmuni: Minskdagi uy',
      text: 'Minsk shahridagi bir hovlida deyarli har kuni O‘zbekiston va o‘zbek xalqi ulug‘lanadi. Bu — belarusning buyuk shoiri Yakub Kolas yashagan, hozir muzeyga aylantirilgan uy.',
      list: [
        'Uy bekasi — shoirning chevarasi Vasilisa mehmonlarni yaqinlaridek ochiq chehra bilan kutib oladi.',
        'Mehmonlarga dasturxon yozilib, o‘zbekona ko‘k choy damlanadi.',
        'Uchrashuvda Belarus televideniyesi, OAV vakillari, Rossiya, Qozog‘iston va boshqa o‘lkalarning adiblari qatnashadi.',
      ],
    },
    {
      title: 'Matn mazmuni: shoir va Toshkent',
      text: 'Yakub Kolas Ikkinchi jahon urushi davrida ikki yil Toshkentda yashagan. Toshkent unga boshpana bo‘lgan, o‘zbeklar unga mehr ko‘rsatgan.',
      list: [
        '«Chimyon», «Salor», «Quyoshning botishi» kabi she’rlarini shu yerda yozgan, kitoblari chop etilgan.',
        'U o‘zbek xalqining bag‘rikengligi, boshiga ish tushganga suyanch bo‘la olishi, yaxshiligini minnat qilmasligini his qilgan.',
        'Uy-muzeydagi eksponatlar, kitoblar, suratlar, milliy bosh kiyim, shopiyola — bari O‘zbekistonni eslatadi.',
      ],
    },
    {
      title: 'Matn mazmuni: yakun',
      text: 'Muallif avval Vasilisa mehmonlar kelgani uchun O‘zbekistonga ataylab urg‘u beryapti, deb o‘ylaydi. Ammo uning ko‘zlaridagi yoshni ko‘rib, bu o‘yidan uyaladi.',
      list: [
        'Vasilisaning so‘zlari: urush yillarida bobosining vujudi Toshkentda, qalbi Belarusda edi; qaytgach esa qalbi Toshkentga ko‘chdi.',
        '«Demak, bu yer sizning ham uyingiz» — deydi u.',
        'Muallif bu uyni Vatani va xalqiga qo‘yilgan mangu haykal deb his qiladi.',
      ],
      rule: 'Sarlavha mazmuni: uydagi har bir xona va buyum O‘zbekiston bilan bog‘liq — shuning uchun «bu uyda O‘zbekiston yashayapti».',
    },
    {
      title: 'So‘z ma’nosini aniqlash (1.12-topshiriq)',
      text: 'Notanish so‘zning ma’nosini avval matndan taxmin qiling, keyin lug‘atdan tekshiring.',
      table: {
        head: ['So‘z', 'Matndagi ma’nosi'],
        rows: [
          ['mavj', 'to‘lqin, jilva («ko‘zlari tubidagi yosh mavjlari»)'],
          ['chevara', 'nevaraning farzandi'],
          ['eksponat', 'muzeyda ko‘rgazmaga qo‘yilgan buyum'],
          ['shopiyola', 'kosaga o‘xshash katta piyola'],
        ],
      },
    },
    {
      title: 'Ma’nodosh so‘zlar',
      text: 'Shakli har xil, ma’nosi bir-biriga yaqin so‘zlar ma’nodosh (sinonim) so‘zlar deyiladi.',
      rule: 'Ma’nodosh so‘zlar bir tushunchani turli nozik farqlar bilan ifodalaydi. Ulardan foydalanish nutqda bir so‘zni takrorlashdan saqlaydi va fikrni boyitadi.',
      examples: ['qalb — ko‘ngil — dil', 'gumon — shubha', 'mangu — abadiy'],
    },
    {
      title: 'Ma’nodoshlarni topish (1.13-topshiriq)',
      text: 'Darslikdagi harflar jadvalidan matndagi so‘zlarning ma’nodoshlari topiladi:',
      table: {
        head: ['Matndagi so‘z', 'Jadvaldagi ma’nodoshi'],
        rows: [
          ['iltijo', 'o‘tinch'],
          ['birov', 'allakim'],
          ['qalb', 'ko‘ngil'],
          ['mangu', 'abadiy'],
          ['gumon', 'shubha'],
          ['sherik', 'hamkor'],
          ['monitor, tuyg‘u', 'jadvaldan mustaqil izlang (masalan: ekran, his)'],
        ],
      },
    },
    {
      title: 'Hikmatli so‘zlar qiyosi',
      text: 'Muallif o‘zbek va belorus xalqining bir xil mazmundagi o‘gitini qiyoslaydi.',
      table: {
        head: ['O‘zbeklarda', 'Beloruslarda'],
        rows: [['«Bir kun tuz totgan yeringga qirq kun salom ber»', '«Birovdan yaxshilik ko‘rsang, bir umr unutma»']],
      },
      rule: 'Ikkala hikmatning mazmuni bir: ko‘rgan yaxshilikni unutmaslik, oqibatli bo‘lish.',
    },
    {
      title: 'Axborot beruvchi va dalillovchi jumla (1.14)',
      text: 'Matndagi jumlalar turli vazifani bajaradi.',
      table: {
        head: ['Jumla turi', 'Belgisi', 'Matndan misol'],
        rows: [
          ['Axborot darajasi yuqori', 'Aniq fakt, ism, joy beradi', '«Vasilisa — Yakub Kolasning chevarasi. Bu dargohda shoir yashagan, hozir uy muzeyga aylantirilgan.»'],
          ['Fikrni dalillovchi', 'Oldingi fikrning sababini ko‘rsatadi (ko‘pincha «chunki» bilan)', '«Chunki ulug‘ shoir yashagan uyning qay bir xonasiga kirmaylik, O‘zbekiston bilan bog‘liq voqea tilga olinadi.»'],
        ],
      },
    },
    {
      title: 'Matn yuzasidan savollar va topshiriqlar',
      text: 'Darslikdagi savollar:',
      list: [
        'Vasilisaning O‘zbekiston haqida to‘lqinlanib, ko‘zlarida yosh bilan gapirishining sababi nima?',
        'Muallif nima uchun avval Vasilisaning so‘zlari samimiy ekaniga shubhalandi?',
        'Hikoya so‘ngida boshqa yurtlardan kelgan adiblarda o‘zbek xalqiga nisbatan qanday fikr paydo bo‘ldi?',
        '«Bir kun tuz totgan yeringga qirq kun salom ber» maqolini izohlang.',
        'Muallif matnga nima uchun shunday sarlavha tanlagan?',
      ],
      note: 'Topshiriq: matn asosida sinfdoshingiz uchun uchta savol tuzing (1.15) va Yakub Kolas O‘zbekistonga mehr qo‘yishining 4 ta sababini yozing (1.16).',
    },
  ],

  'birikish-vositalari': [
    {
      title: 'Darsga kirish',
      text: 'Gapdagi so‘zlar bir-biri bilan bog‘lanib, birikmalar hosil qiladi. Bu darsda so‘zlar qanday vositalar bilan bog‘lanishi va fikrni iqtibos bilan boyitish o‘rganiladi.',
      list: ['Fikrni iqtiboslar bilan boyitish', 'So‘zlarning birikish vositalari: ohang, kelishik, ko‘makchi', 'Kelishikni ko‘makchi bilan almashtirish', 'Qo‘shimchalar bilan bog‘liq xatolarni tahrirlash'],
    },
    {
      title: 'Fikrni iqtibos bilan boyitish (1.17)',
      text: 'Har bir fikrga mos iqtibos tanlang. Bitta iqtibos ortiqcha — unga o‘zingiz mos gap yozasiz.',
      table: {
        head: ['Fikr', 'Mos iqtibos'],
        rows: [
          ['Shahar aholisi doim toza havoga intiladi', '«Toza havo — tanga davo» (maqol)'],
          ['Salomlashish — go‘zal odatimiz', '«Salom berishni keng yoyinglar — muhabbatingiz ziyoda bo‘ladi» (hadis)'],
          ['Har bir fan zamirida matematika bor', '«Matematika — fanlar ichra shoh...» (Qori Niyoziy)'],
          ['Yoshlarga xorijiy tillarni o‘rganishni maslahat beraman', '«Til bilgan el biladi» (maqol)'],
          ['Ortiqcha iqtibos', '«Tug‘ilgan yerdan ko‘ngil uzilmas, yurt qo‘riganning yurti buzilmas» — Vatan haqida gap tuzing'],
        ],
      },
    },
    {
      title: 'So‘zlarning birikish vositalari',
      text: 'Ikki ustundagi so‘zlarni bog‘lab ko‘ring: Vatan uchun jon fido etmoq, O‘zbekiston poytaxti, yurtni madh etmoq. Ular turli vositalar bilan bog‘landi.',
      rule: 'So‘zlar quyidagi vositalar yordamida birikadi: a) ohang; b) kelishik qo‘shimchalari; d) ko‘makchilar.',
      examples: ['ohang', 'kelishik qo‘shimchasi', 'ko‘makchi'],
    },
    {
      title: '1. Ohang orqali bog‘lanish',
      text: 'So‘zlar hech qanday qo‘shimchasiz, faqat ohang va tartib bilan bog‘lanadi. Ko‘pincha belgi bildiruvchi so‘z otdan oldin keladi.',
      examples: ['kichkina qishloq', 'issiqroq joy', 'sokin uy', 'ko‘k choy', 'ulug‘ shoir'],
    },
    {
      title: '2. Kelishik qo‘shimchalari orqali',
      text: 'Kelishik qo‘shimchasi qo‘shilgan so‘z ikkinchi so‘zga bog‘lanadi.',
      table: {
        head: ['Kelishik', 'Misol'],
        rows: [
          ['Qaratqich (-ning)', 'odamlarning mardligi, shoirning chevarasi'],
          ['Tushum (-ni)', 'yurtni kuylamoq, shaharni kezmoq'],
          ['Jo‘nalish (-ga)', 'daryoga qo‘shilmoq, Toshkentga ko‘chmoq'],
          ['O‘rin-payt (-da)', 'qalamda yozmoq, Toshkentda yashamoq'],
          ['Chiqish (-dan)', 'uydan chiqmoq, o‘ydan uyalmoq'],
        ],
      },
    },
    {
      title: '3. Ko‘makchilar orqali',
      text: 'Ko‘makchilar mustaqil ma’noga ega bo‘lmasa-da, so‘zlarni bir-biriga bog‘laydi.',
      table: {
        head: ['Ko‘makchi', 'Misol'],
        rows: [
          ['haqida', 'O‘zbekiston haqida gapirmoq'],
          ['tomon', 'uyi tomon chopmoq'],
          ['uchun', 'singlim uchun olmoq'],
          ['bilan / ila', 'ochiq chehra bilan, minnatdorlik ila'],
          ['orqali', 'telegram orqali jo‘natmoq'],
          ['kabi', 'o‘z yaqinlari kabi'],
        ],
      },
    },
    {
      title: 'Kelishik ↔ ko‘makchi (1.20)',
      text: 'Ba’zan kelishik qo‘shimchasidan anglashilgan ma’no ko‘makchi bilan ham ifodalanadi.',
      table: {
        head: ['Kelishik bilan', 'Ko‘makchi bilan'],
        rows: [
          ['yurtni kuylamoq', 'yurt haqida kuylamoq'],
          ['singlimga oldim', 'singlim uchun oldim'],
          ['qalamda yozmoq', 'qalam bilan yozmoq'],
          ['telefondan so‘rab bilmoq', 'telefon orqali so‘rab bilmoq'],
          ['bolalikdagi xotiralardan so‘zlamoq', 'bolalikdagi xotiralar haqida so‘zlamoq'],
          ['bolalarga tayyorlamoq', 'bolalar uchun tayyorlamoq'],
          ['hovlidan o‘tkazmoq', 'hovli orqali o‘tkazmoq'],
        ],
      },
    },
    {
      title: 'Gaplarni tahrirlash (1.21)',
      text: 'Namuna: «Ko‘chalarning birining nomi o‘zgartirildi» → «Ko‘chalardan birining nomi o‘zgartirildi».',
      table: {
        head: ['Xato', 'To‘g‘ri'],
        rows: [
          ['O‘quvchilarning birining natijasi juda yuqori chiqdi.', 'O‘quvchilardan birining natijasi juda yuqori chiqdi.'],
          ['Xayolingga kelgan g‘oyalarning yozib olishni odat qil.', 'Xayolingga kelgan g‘oyalarni yozib olishni odat qil.'],
          ['Birinchi galda maqsadni to‘g‘ri qo‘yilishi kerak.', 'Birinchi galda maqsad to‘g‘ri qo‘yilishi kerak.'],
          ['Sotib olingan kitoblarni tez orada o‘qib chiqiladi.', 'Sotib olingan kitoblar tez orada o‘qib chiqiladi.'],
        ],
      },
    },
    {
      title: 'Amaliy topshiriq (1.19)',
      text: 'Har bir gapdan ikkitadan so‘zni o‘zi bog‘langan so‘z bilan ko‘chiring va qaysi vosita bilan bog‘langanini ayting.',
      list: [
        'Vasilisa bizni o‘z yaqinlari kabi ochiq va yoniq chehra bilan qarshi oldi.',
        'Mezbonimiz minnatdorlik ila O‘zbekiston haqida to‘lqinlanib gapirdi.',
        'Uning ko‘zlari tubidagi yosh mavjlarini ko‘rib, xayolimga kelgan o‘ydan uyalib ketdim.',
        'O‘z uyida yashay boshlagach, uning qalbi Toshkentga ko‘chgandi.',
      ],
      note: 'Masalan: «yaqinlari kabi» — ko‘makchi; «chehra bilan qarshi oldi» — ko‘makchi; «o‘ydan uyalib» — chiqish kelishigi.',
    },
  ],

  'sher-tahlili': [
    {
      title: 'Qo‘shimcha va ko‘makchilar (1.22)',
      text: 'Ibrohim G‘afurovning bolalik xotiralari haqidagi matnida bo‘sh o‘rinlar mos qo‘shimcha va ko‘makchilar bilan to‘ldiriladi. Muallif Chorsu guzari, tuyalar, karvonsaroylar, Teshikqopqoqdagi bog‘ va Qichqiriq soyini eslaydi.',
      table: {
        head: ['Bo‘sh o‘rinli', 'To‘ldirilgan'],
        rows: [
          ['Dadam yelkasi... o‘tqazib', 'Dadam yelkasiga o‘tqazib'],
          ['Chorsu guzari... olib chiqardi', 'Chorsu guzariga olib chiqardi'],
          ['Tuyalar... ko‘rardim', 'Tuyalarni ko‘rardim'],
          ['Karvonsaroylar... odamlar yurishardi', 'Karvonsaroylarda odamlar yurishardi'],
          ['Toshkent shimoli... yastangan', 'Toshkent shimolida yastangan'],
        ],
      },
    },
    {
      title: 'Joy nomlari',
      text: 'Qichqiriq soyi kechalari uvullab, odam ko‘ngliga vahima solar, ovozi uzoqlarga eshitilar edi. Shu ovozi sabab xalq uni «Qichqiriq» deb atagan.',
      rule: 'Ko‘cha, mahalla, qishloq, shahar va tuman nomlari ko‘pincha joyning xususiyati yoki tarixi bilan bog‘liq bo‘ladi.',
      note: 'Topshiriq (1.23): o‘zingizga tanish joy nomlari ro‘yxatini tuzing va yashash joyingizni tasvirlab matn yozing.',
    },
    {
      title: '«Vatan» she’ri',
      text: 'Darslikda Abdulla Oripovning «Vatan» she’ri audio orqali tinglanadi. She’r muxammas shaklida — har bir band besh misradan iborat.',
      note: 'Kirish savollari: Xotirjamlik nima? Erkinlik-chi? Ular insonga qanchalik zarur? Kishi qanday vaziyatlarda o‘zini xotirjam va erkin his qila oladi?',
      examples: ['bandi bulbul', 'Vatandan ayri ko‘ngil', 'toj-u taxtim'],
    },
    {
      title: 'She’rdagi so‘zlar (1.25)',
      text: 'She’rni tushunish uchun quyidagi so‘zlarning ma’nosini bilish kerak:',
      table: {
        head: ['So‘z', 'Ma’nosi'],
        rows: [
          ['mor', 'ilon'],
          ['muxammas', 'besh misrali bandlardan tuzilgan she’riy janr'],
          ['kas', 'odam, kishi'],
          ['faqir', 'moddiy jihatdan nochor, kambag‘al, muhtoj'],
          ['g‘amguzor', 'birovning g‘amini yengillatuvchi, g‘amxo‘r, mehribon'],
          ['baayni', 'aynan, xuddi o‘zi'],
          ['faromush', 'parishonxotir, o‘zini unutgan holda'],
          ['ayo', 'murojaat so‘zi: ey'],
          ['nadomat', 'afsus, pushaymonlik (darslikda izohi berilmagan so‘z)'],
        ],
      },
    },
    {
      title: 'Asosiy obraz: qafasdagi bulbul',
      text: 'She’rda vatandan ayrilgan inson qafasdagi bulbulga qiyoslanadi.',
      rule: 'Qafasdagi bulbul chamansiz o‘zini erkin va xotirjam his qilmaganidek, vatandan yiroq inson ham hech qachon yayrab yashay olmaydi, o‘zini baxtli his qilmaydi.',
      examples: ['bandi bulbul = vatandan ayri ko‘ngil', 'chaman = Vatan'],
    },
    {
      title: 'Badiiy vositalar (1.26)',
      text: 'She’r misralari va badiiy uslubga xos xususiyatlar. Bitta xususiyatga bir necha parcha mos kelishi mumkin.',
      table: {
        head: ['Xususiyat', 'Izoh', 'She’rdan misol'],
        rows: [
          ['O‘xshatish', 'Bir narsa ikkinchisiga qiyoslanadi (-dek, -day, baayni)', '«Onamdek mehribon, munis Vatan bor»; «Baayni bandi bulbulni chamansiz sayratib bo‘lmas»'],
          ['Ko‘chma ma’noli so‘z', 'So‘z o‘z ma’nosidan boshqa ma’noda', '«Haqiqat tongi otganda...»'],
          ['Hikmatli so‘z', 'Xalq hikmati, o‘git', '«Demishlar: mor-u qushni bir qafasda asratib bo‘lmas»'],
          ['Bo‘yoqdor so‘z', 'Kuchli his-tuyg‘u ifodalaydi', '«Faqir bo‘lsam-da, bor yurtim — toj-u taxtim»'],
          ['Tarixiy so‘z', 'Hozir kam qo‘llanadigan eski so‘z', 'baayni, mor, faromush'],
        ],
      },
    },
    {
      title: 'Nasriy bayon (1.27)',
      text: 'Nasriy bayon — she’r mazmunini oddiy nasr bilan so‘zlab berish. Bunda yetakchi g‘oya va uni to‘ldiruvchi yordamchi fikrlar ajratiladi.',
      table: {
        head: ['3-band tahlili', ''],
        rows: [
          ['Yetakchi g‘oya', 'Qafasdagi bulbul chamansiz erkin bo‘lmaganidek, vatandan yiroq inson ham yayrab yashay olmaydi.'],
          ['Yordamchi fikr', 'Shoir vatansizlarga achinish ko‘zi bilan qaraydi: ular boy bo‘lsa ham, ko‘ngli xotirjam emas.'],
          ['Yordamchi fikr', 'Shoir boy bo‘lmasa-da, uning Vatani bor — bu uning eng katta boyligi, toj-u taxti.'],
        ],
      },
    },
    {
      title: 'She’r yuzasidan savollar',
      text: 'Darslikdagi savollar:',
      list: [
        '«Bandi bulbul» va «Vatandan ayro ko‘ngil» o‘rtasida qanday bog‘liqlik bor?',
        '«Bobolar kechmishin hargiz faromush aylamang...» misrasi orqali shoir nima demoqchi?',
        'Inson qachon yoki qay holatda o‘zini «vatansiz» deb hisoblaydi?',
        '«Vatan deb jo‘sh urar ersa, ko‘targum boshima xasni» misrasi orqali shoir nima demoqchi?',
      ],
    },
    {
      title: 'Uy vazifasi va ijodiy ish',
      text: 'She’rning 5-bandini qayta tinglab, nasriy bayonini yozing va yetakchi g‘oya hamda yordamchi fikrlarni izohlang (1.28).',
      list: [
        '«Ona yurtim — O‘zbekiston!» mavzusida ijodiy ishga tayyorlaning (1.29).',
        'Internet va bosma nashrlardagi materiallar bilan tanishing.',
        'Fikringizni video, audio, fotosuratlar, rasm yoki chellenj shaklida ifodalang.',
        'Ishda o‘z jonli nutqingiz bo‘lishiga e’tibor bering va taqdimotga tayyorlaning.',
      ],
    },
  ],

  'kochma-mano': [
    {
      title: 'Nega so‘zlar yangi ma’no oladi?',
      text: 'Hayotda har kuni yangi tushunchalar paydo bo‘ladi.',
      rule: 'Har bir yangi tushuncha uchun alohida so‘z qo‘llanaversa, so‘zlar soni ortib ketib, ularni xotirada saqlash qiyinlashar edi. Shuning uchun tilda ilgari mavjud bo‘lgan so‘zlarga yangi ma’nolar yuklanadi.',
      note: 'Boshlang‘ich mashq (1.30): avlod, baham, tug‘ilmoq, barra, atrof, qadam, to‘fon, ulkan, tuyoq, ummon so‘zlarini ko‘chma ma’noda qo‘llab birikmalar tuzing (masalan: bilim ummoni, g‘oya tug‘ildi).',
    },
    {
      title: 'O‘z (bosh) ma’no',
      text: 'So‘zni alohida, gapdan tashqarida eshitganda birinchi bo‘lib xayolga keladigan ma’no.',
      rule: 'So‘zning nutqdan tashqarida, ya’ni erkin holda ifodalagan ma’nosi o‘z (bosh) ma’no hisoblanadi.',
      examples: ['tog‘ cho‘qqisi', 'iliq suv', 'yumshoq non', 'eshik ochmoq', 'lag‘monni cho‘zmoq'],
    },
    {
      title: 'Ko‘chma ma’no',
      text: 'Bosh ma’noga o‘xshashlik yoki bog‘liqlik asosida yangi ma’no paydo bo‘ladi.',
      rule: 'Bosh ma’nodan o‘sib chiqadigan, nutq jarayonida namoyon bo‘ladigan ma’no ko‘chma ma’no hisoblanadi.',
      examples: ['muvaffaqiyat cho‘qqisi', 'iliq suhbat', 'yumshoq fe’lli', 'ko‘ngil ochmoq', 'gapni cho‘zmoq'],
    },
    {
      title: 'O‘z va ko‘chma ma’no juftlari (1.33)',
      text: 'Bir so‘z ikki xil birikmada ikki xil ma’noda keladi:',
      table: {
        head: ['O‘z ma’noda', 'Ko‘chma ma’noda'],
        rows: [
          ['tomdan tushmoq', 'mansabdan tushmoq'],
          ['paypoq to‘qimoq', 'gap to‘qimoq'],
          ['lag‘monni cho‘zmoq', 'gapni cho‘zmoq'],
          ['iliq suv', 'iliq suhbat'],
          ['yumshoq non', 'yumshoq fe’lli'],
          ['tarix darsi', 'hayot darsi'],
          ['eshik ochmoq', 'ko‘ngil ochmoq'],
          ['qo‘shni odam', 'qo‘shni dala'],
          ['hikoyani o‘qimoq', 'Navoiyni o‘qimoq'],
        ],
      },
    },
    {
      title: 'Gaplarda ko‘chma ma’no (1.31)',
      text: 'Badiiy matnlarda ko‘chma ma’noli so‘zlar tasvirni jonli qiladi:',
      table: {
        head: ['Gap', 'Ko‘chma ma’noli so‘z'],
        rows: [
          ['Bu qishloqning dehqonlarining qo‘li barakali ekan. (G‘afur G‘ulom)', 'qo‘li barakali — mehnati samarali'],
          ['Bizning eshikka ham kirib o‘tinglar.', 'eshik — uy, xonadon'],
          ['Erkinlikning ildizlari ma’rifatdan suv ichadi. (Eshqobil Shukur)', 'ildiz, suv ichadi — asos, oziqlanadi'],
          ['Tuproq olsang, oltin bo‘lsin.', 'oltin — baraka, foyda'],
          ['Quyosh ufqqa yonboshladi. (Shukur Xolmirzayev)', 'yonboshladi — botishga yaqinlashdi'],
        ],
      },
    },
    {
      title: 'Bog‘liqlik asosida ko‘chish (1.32)',
      text: 'Ba’zan bir narsaning nomi unga bog‘liq boshqa narsaga ko‘chadi. Namuna: «Bo‘ri polvon davradan xursand» — davradagi odamlardan xursand.',
      table: {
        head: ['Gap', 'To‘liq mazmuni'],
        rows: [
          ['Bu yil o‘n beshga kiraman.', 'o‘n besh yoshga kiraman'],
          ['«Sohibqiron»ni o‘qiyapman.', '«Sohibqiron» asarini o‘qiyapman'],
          ['Majlis qaror qiladi.', 'majlis qatnashchilari qaror qiladi'],
          ['Dasturxonga quyuq-suyuq tortildi.', 'quyuq va suyuq taomlar tortildi'],
        ],
      },
    },
    {
      title: 'Nutqdagi ahamiyati',
      text: 'Ko‘p ma’noli so‘zlarni bilish matnni chuqur tushunishga va o‘z fikrini chiroyli ifodalashga yordam beradi.',
      rule: 'Ko‘p ma’noli so‘zlarning ma’nosini bilish va ulardan o‘rinli foydalanish nutqning ta’sirchan, ifodali bo‘lishiga yordam beradi.',
      note: 'Musobaqa (1.34): sinfdoshingiz bilan 1.33-topshiriqdagi so‘zlarni har ikki ma’noda qo‘llab gap tuzing. Kim ko‘p va to‘g‘ri gap tuzsa — g‘olib.',
    },
  ],

  infografika: [
    {
      title: 'Imlosi qiyin so‘zlar (1.36)',
      text: 'Tushirib qoldirilgan harflarni qo‘yib, so‘zlarni to‘g‘ri talaffuz qiling va yozing.',
      table: {
        head: ['Topshiriqda', 'To‘g‘ri yozilishi', 'Diqqat'],
        rows: [
          ['respu...lika', 'respublika', 'b'],
          ['ajdo...', 'ajdod', 'oxirida d'],
          ['far...von', 'farovon', 'o'],
          ['dem...kratiya', 'demokratiya', 'o'],
          ['k...nstitutsiya', 'konstitutsiya', 'o, ts'],
          ['...udud', 'hudud', 'h'],
          ['fuq...ro', 'fuqaro', 'a'],
          ['isloh...t', 'islohot', 'o'],
          ['q...mita', 'qo‘mita', 'o‘'],
        ],
      },
    },
    {
      title: 'Infografika nima?',
      text: 'Infografika — ma’lumotni raqamlar, diagrammalar, ramziy belgilar va qisqa matn yordamida ko‘rgazmali taqdim etish usuli. U katta hajmdagi ma’lumotni bir qarashda tushunishga yordam beradi.',
      list: ['Sarlavha — nima haqida ekani', 'Davr — qaysi vaqt oralig‘i', 'Ko‘rsatkichlar — asosiy raqamlar', 'Diagramma va belgilar — taqqoslash uchun', 'Manba — ma’lumot qayerdan olingani'],
    },
    {
      title: 'Demografik holat infografikasi (1.37)',
      text: 'Darslikda Stat.uz saytidan olingan O‘zbekiston Respublikasining demografik holati haqidagi ikki infografika berilgan.',
      table: {
        head: ['Ko‘rsatkich', '2023-yil (yanvar–dekabr)'],
        rows: [
          ['Shahar aholisi', '51,0%'],
          ['Qishloq aholisi', '49,0%'],
          ['Erkaklar', '50,3%'],
          ['Ayollar', '49,7%'],
        ],
      },
      note: 'Ikkinchi infografika 2024-yilning faqat yanvar–sentabr oylarini o‘z ichiga oladi va dastlabki ma’lumot hisoblanadi.',
    },
    {
      title: 'Hukmlarni tekshirish (1.38)',
      text: 'Har bir hukmni infografikadagi raqamlar bilan solishtiring va «to‘g‘ri» yoki «noto‘g‘ri» deb belgilang.',
      list: [
        'Hukmdagi ko‘rsatkichni infografikadan toping.',
        'Raqamlarni va yillarni diqqat bilan solishtiring.',
        'Ma’lumot qaysi davrni qamrab olganini tekshiring.',
        'Faqat infografikada bor ma’lumotga tayaning.',
      ],
      rule: 'Masalan, 2024-yilda vafot etganlar soni kamroq ko‘rsatilgan bo‘lsa, bu kamayish degani emas: 2024-yil statistikasi yillik ko‘rsatkichni qamrab olmagan (faqat 9 oy).',
    },
    {
      title: 'Axborot matni yozish (1.39)',
      text: 'To‘g‘ri deb topilgan ma’lumotlar asosida O‘zbekistonning 2023-yildagi demografik holati haqida axborot matni yozing.',
      list: ['Sarlavha qo‘ying', 'Asosiy raqamlarni keltiring', 'Ko‘rsatkichlarni taqqoslang', 'Qisqa xulosa chiqaring', 'Manbani ko‘rsating (Stat.uz)'],
      note: 'Axborot matnida shaxsiy fikr emas, aniq faktlar bo‘ladi.',
    },
    {
      title: 'Tanlov e’loni infografikasi (1.40)',
      text: 'Ikkinchi infografika — «Vatanim taraqqiyotida mening hissam» tanlovi e’loni.',
      table: {
        head: ['Ma’lumot', 'Infografikada'],
        rows: [
          ['O‘tkazilish vaqti', '2025-yil noyabr — dekabr'],
          ['Ishtirokchilar', '15 yoshdan 30 yoshgacha bo‘lganlar'],
          ['Yo‘nalishlar', 'Adabiyot va publitsistika; Milliy maqom va milliy estrada; Tasviriy va amaliy san’at'],
          ['Ariza topshirish', 'tanlov.uz'],
          ['Arizalar muddati', 'shu yilning 10-noyabrigacha'],
          ['Chaqiriq', '«Vatan taraqqiyotiga o‘z hissangizni qo‘shing!»'],
        ],
      },
    },
  ],

  'ijodiy-ish': [
    {
      title: 'Infografikani takomillashtirish (1.41)',
      text: 'Tanlov e’loni infografikasi asosida topshiriqlar bajariladi:',
      list: [
        'Infografika qanday boshlanishi kerak? (masalan, diqqatni tortadigan sarlavha yoki savol bilan)',
        'Qaysi ramziy belgilar qaysi ma’lumotga mos? (sana — kalendar, ishtirokchilar — odam belgisi, ariza — kompyuter)',
        'Infografikaning bir qismini boshqacha qanday ifodalash mumkin?',
      ],
    },
    {
      title: 'Ijodiy ish: «Ona yurtim — O‘zbekiston!»',
      text: 'Oldingi darslarda boshlangan ijodiy ish shu darsda taqdim etiladi (1.42–1.43).',
      list: [
        'Internet va bosma nashrlar (kitob, jurnal, ko‘rgazmali vositalar)dagi materiallar bilan tanishing.',
        'Fikrlaringizni video, audio, fotosuratlar jamlanmasi, rasm, chellenj yoki boshqa usulda ifodalang.',
        'Tayyorlagan materialingizda jonli og‘zaki nutqingiz bo‘lsin.',
        'Taqdimotga tayyorlaning.',
      ],
    },
    {
      title: 'Taqdimot qanday o‘tkaziladi?',
      text: 'Yaxshi taqdimot aniq tuzilishga ega bo‘ladi:',
      table: {
        head: ['Qism', 'Nima aytiladi'],
        rows: [
          ['Kirish', 'Mavzu va nima uchun uni tanlaganingiz'],
          ['Asosiy qism', 'Tayyorlagan materialingiz: video, rasm, matn'],
          ['Xulosa', 'Asosiy fikr va tinglovchilarga murojaat'],
        ],
      },
      note: 'Ravon, baland va tushunarli gapiring, tinglovchilarga qarab so‘zlang.',
    },
    {
      title: 'Sharh yozish (1.44)',
      text: 'Sinfdoshlaringizdan birining ijodiy ishiga qisqa sharh yozing va muallifga topshiring.',
      list: ['Ishda nima yoqdi?', 'Qaysi fikr ayniqsa ta’sir qildi?', 'Nimani yaxshilash mumkin?', 'Muallifga qanday maslahat berasiz?'],
      rule: 'Sharh hurmat bilan, aniq va asosli yoziladi: faqat «yaxshi» yoki «yomon» deyish yetarli emas.',
    },
    {
      title: 'Vatan haqidagi so‘zlar (1.45)',
      text: 'Vatan tushunchasini ifodalovchi so‘zlarni toping va alifbo tartibida yozing. Namuna: ajdod, bolalik, do‘stlik...',
      rule: 'O‘zbek lotin alifbosi tartibi: A B D E F G H I J K L M N O P Q R S T U V X Y Z O‘ G‘ Sh Ch ng.',
      note: 'Diqqat: O‘, G‘, Sh, Ch harflari alifbo oxirida keladi. Shuning uchun «g‘urur» so‘zi «tinchlik»dan keyin yoziladi.',
      examples: ['ajdod', 'bolalik', 'do‘stlik', 'el', 'farovonlik', 'mustaqillik', 'tinchlik', 'g‘urur'],
    },
    {
      title: 'Matn yaratish (1.46)',
      text: 'Yozgan so‘zlaringizni qatnashtirib «Vatan taraqqiyotida mening hissam» mavzusida 200–300 so‘zdan iborat matn yarating.',
      list: ['Kirish: Vatan siz uchun nima?', 'Asosiy qism: Vatan taraqqiyotiga qanday hissa qo‘shmoqchisiz?', 'Dalil: iqtibos, maqol yoki hayotiy misol', 'Xulosa: orzu va maqsadingiz'],
      note: 'Matnda foydalanilgan ko‘chma ma’noli so‘zlar ro‘yxatini ham tuzing.',
    },
  ],

  qadriyat: [
    {
      title: 'Darsga kirish',
      text: 'Bu darsda Umid Obidxo‘jayevning qadriyatlar haqidagi maqolasi o‘qiladi. Maqola oltita qismdan iborat bo‘lib, muallif o‘z fikrini jamoatchilik muhokamasiga qo‘yadi.',
      note: 'Savol: Milliy va umuminsoniy qadriyatlar haqida nimalarni bilasiz? Ularning shaxs va jamiyat rivojidagi ahamiyati qanday?',
    },
    {
      title: '1-qism: qadriyatga berilgan ta’riflar',
      text: 'Olim va mutaxassislar qadriyat tushunchasiga turlicha ta’rif bergan. Maqolada ulardan to‘rttasi keltiriladi:',
      list: [
        'Insoniyat uchun ahamiyatli, millat va ijtimoiy guruhlar manfaatiga xizmat qiladigan, ular qadrlaydigan tabiat va jamiyat ne’matlari, hodisalari majmui.',
        'Jamiyatda obro‘, e’tibor, hurmatga ega kishilar, munosabatlar, moddiy va ma’naviy boyliklar majmuasi.',
        'Inson va jamiyat ma’naviyatining tarkibiy qismi, voqea-hodisalar, sifatlar, tartiblarning qadrini ifodalovchi tushuncha.',
        'Voqelikdagi hodisalarning umuminsoniy, ijtimoiy-axloqiy, madaniy-ma’naviy ahamiyatini ko‘rsatuvchi tushuncha.',
      ],
    },
    {
      title: '2-qism: xulosa va qadriyat turlari',
      text: 'Ta’riflardan kelib chiqib, muallif qadriyatga sodda ta’rif beradi.',
      rule: 'Qadriyat — biz uchun qadrli bo‘lgan urf-odat va an’analarimiz, hayotiy prinsiplarimiz.',
      table: {
        head: ['Qadriyat turi', 'Kimga xos'],
        rows: [
          ['Milliy qadriyatlar', 'Muayyan millat, xalq uchun xos'],
          ['Umuminsoniy qadriyatlar', 'Butun bashariyat uchun xos'],
        ],
      },
    },
    {
      title: '3-qism: milliy qadriyatlar mohiyati',
      text: 'Milliy qadriyatlar mohiyatiga ko‘ra bir necha turga ajratiladi:',
      examples: ['tabiiy', 'moddiy', 'ma’naviy', 'ijtimoiy-siyosiy', 'iqtisodiy', 'axloqiy'],
      rule: 'Ko‘pchilik mutaxassislar insonning o‘zini, hayotini, huquq va erkini, sog‘lom hamda farovon turmushini qadriyatlarning eng oliysi deb hisoblaydi.',
    },
    {
      title: '4–5-qismlar: qadriyatlar nima uchun kerak?',
      text: 'Qadriyatlar o‘tmishni bugun bilan bog‘laydi va kelajakka dadil qadam qo‘yishning muhim omili bo‘ladi. Ular millatidan qat’i nazar, mamlakat xalqini jipslashtiradi.',
      rule: 'Jamiyatdagi tinchlik, barqarorlik, taraqqiyot va farovonlik bevosita qadriyatlar bilan bog‘liq.',
      list: [
        'Konstitutsiyada aks etgan tamoyillar: bunyodkorlik g‘oyalariga sodiqlik, yuksak mas’uliyat, insonparvarlik, milliy totuvlik.',
        'Xalqimizning urf-odat va an’analari, mafkuralar xilma-xilligi, ijtimoiy adolat.',
        'Fuqarolarning qonun oldida tengligi, vijdon erkinligi, adolatli mehnat.',
      ],
    },
    {
      title: '6-qism: muallif taklif qilgan ro‘yxat',
      text: 'Xalqimizning tarixi, ma’naviy merosi, turmush tarzi, hayotiy qarashlari va e’tiqodidan kelib chiqib, muallif quyidagi milliy qadriyatlarni taklif qiladi:',
      examples: ['ota-onaga ehtirom', 'tozalik', 'harakatda barakat', 'ona tiliga hurmat', 'diniy bag‘rikenglik', 'so‘z erkinligi', 'lafz', 'yelkadoshlik', 'mehmondo‘stlik', 'rozi-rizolik'],
      note: 'Lafz — qonun, burch va kelishuvga sadoqat. Muallif ro‘yxatni tugal demaydi va jamoatchilik takliflarini kutadi.',
    },
    {
      title: 'So‘zlar izohi (2.1)',
      text: 'Harflari aralashtirilgan so‘zlarni izohi asosida toping:',
      table: {
        head: ['So‘z', 'Izohi'],
        rows: [
          ['bashariyat', 'insoniyat, kishilik, insonlar'],
          ['insonparvar', 'odamlarga g‘amxo‘r, ularni sevuvchi kishiga xos sifat'],
          ['bag‘rikeng', 'masalaga keng ko‘lamda qarovchi, ochiq ko‘ngilli'],
          ['tozalik', 'ozoda, toza holat'],
          ['mehmondo‘st', 'mehmon kutishni yaxshi ko‘ruvchi kishiga xos sifat'],
          ['yelkadosh', 'ishda yonma-yon turuvchi, bir maqsad uchun birga harakat qiluvchi'],
        ],
      },
    },
    {
      title: 'Matn tuzilishi va asosiy fikr (2.2–2.4)',
      text: 'Maqola qismlariga mos sarlavhalar (namuna):',
      table: {
        head: ['Qism', 'Sarlavha'],
        rows: [
          ['1', 'Qadriyat tushunchasi va unga berilgan ta’riflar'],
          ['2', 'Qadriyat — biz uchun qadrli urf-odat va an’analar yig‘indisi'],
          ['3', 'Milliy qadriyatlarning turlari'],
          ['4', 'Qadriyatlarning inson hayotidagi o‘rni va ahamiyati'],
          ['5', 'Konstitutsiyada qadriyatlarning aks etishi'],
          ['6', 'Milliy qadriyatlar ro‘yxati'],
        ],
      },
      note: '4-qismning asosiy fikri: qadriyatlar o‘tmishni bugun bilan bog‘lab, kelajakka dadil qadam qo‘yishning muhim omili.',
    },
    {
      title: 'Boshqa davlatlar tajribasi (2.5)',
      text: 'Darslikda AQSH, Daniya va Buyuk Britaniyada shakllantirilgan qadriyatlar ro‘yxati berilgan. Ulardan ayrimlari:',
      examples: ['demokratiya', 'tenglik', 'qonun ustuvorligi', 'ishonch', 'bag‘rikenglik', 'shaxsiy erkinlik', 'innovatsiya', 'ona tiliga hurmat', 'vaqtdan unumli foydalanish'],
      list: [
        'Taklif etilgan qadriyatlar ro‘yxati sizga ma’qulmi?',
        'Ularga yana qanday qo‘shimchalar kiritish mumkin?',
        'Siz taklif etayotgan qadriyat millat sha’nini yuksaltirishda qanday ahamiyatga ega?',
      ],
    },
  ],

  izohlar: [
    {
      title: 'Darsga kirish',
      text: 'Qadriyatlar haqidagi maqola ijtimoiy tarmoqqa joylangan va unga foydalanuvchilar izoh yozgan (2.6). Bu darsda izohlar tahlil qilinadi va izoh yozish madaniyati o‘rganiladi.',
      list: ['Izoh maqola mazmuniga mosmi?', 'Izohda muallifning munosabati seziladimi?', 'Hisbelgilar qanday vazifa bajaradi?', 'Izoh yozish qoidalari'],
    },
    {
      title: 'Izohlar mazmuni',
      text: 'Maqolaga yozilgan izohlardan ayrimlari (qisqacha):',
      table: {
        head: ['Foydalanuvchi', 'Izoh mazmuni'],
        rows: [
          ['Temur_90', 'Maqola zo‘r bo‘libdi.'],
          ['Anvarova Aziza1203', 'Qadriyatlar ro‘yxatini qat’iy belgilab bo‘lmaydi, ular o‘zgaruvchan.'],
          ['DILSHODA85', 'Qadriyatlari qadrlangan yurtning xalqi qadr topadi; bu maktab va televideniyeda targ‘ib qilinsin.'],
          ['Akmal, Baxtiyor123_45', 'Faqat hisbelgilar.'],
          ['Oqila Zoirjon qizi', 'Ro‘yxat to‘liq emas — halollikni ham kiritish kerak.'],
          ['Karomat', 'O‘z kanalidagi «statuslar»ni reklama qiladi.'],
          ['Nigora@_87', 'Yoshlar o‘rtasida oqibat susaygan — silayi rahmni ham kiritish kerak.'],
          ['Oqila2004', 'Yoshlarni shu qadriyatlar ruhida tarbiyalash yo‘llari haqida ham yozing.'],
        ],
      },
    },
    {
      title: 'Izohning mavzuga mosligi (2.7)',
      text: 'Izoh maqola mavzusi — qadriyatlar va ularning ro‘yxati haqida bo‘lsa, mos hisoblanadi.',
      table: {
        head: ['Mos', 'Mos emas yoki fikr yo‘q'],
        rows: [
          ['Anvarova Aziza1203, DILSHODA85', 'Karomat — mavzuga aloqasiz reklama'],
          ['Oqila Zoirjon qizi, Nigora@_87', 'Akmal, Baxtiyor123_45 — faqat hisbelgi'],
          ['Oqila2004, Temur_90 (yuzaki)', ''],
        ],
      },
      rule: 'Munosabat yaqqol seziladigan izohda muallif o‘z fikrini aniq aytadi va asoslaydi (masalan, Nigora@_87: sababini ko‘rsatib, yangi qadriyat taklif qiladi).',
    },
    {
      title: 'Hisbelgilar (2.8)',
      text: 'Hisbelgilar (emoji) his-tuyg‘uni — quvonch, rozilik, hayrat, norozilikni ifodalaydi.',
      list: [
        'Matn bilan birga ishlatilsa, fikrni jonli qiladi.',
        'Faqat hisbelgidan iborat izohda muallif nimani nazarda tutgani aniq bo‘lmaydi.',
        'Bir hisbelgini turli odamlar turlicha tushunishi mumkin.',
      ],
      note: 'Muhokama: fikr bildiruvchilarning izohlarda hisbelgilardan foydalanishiga munosabatingiz qanday?',
    },
    {
      title: 'Izoh yozish qoidalari (2.10)',
      text: 'Ikki guruhga bo‘linib, ijtimoiy tarmoqda izoh yozish qoidalarini ishlab chiqing. Namuna qoidalar:',
      list: [
        'Mavzuga doir yozing.',
        'Muallif va boshqa foydalanuvchilarni hurmat qiling, haqorat qilmang.',
        'Fikringizni asoslang: nega shunday deb o‘ylaysiz?',
        'Imlo va tinish belgilariga e’tibor bering.',
        'Reklama va mavzuga aloqasiz havolalar qoldirmang.',
        'Qisqa va aniq yozing.',
        'Hisbelgidan me’yorida, matn bilan birga foydalaning.',
      ],
    },
    {
      title: 'Izohlardagi xatolar tahlili (2.11)',
      text: 'Ijtimoiy tarmoqlardagi izohlarni ishlab chiqqan qoidalaringiz asosida tahlil qiling.',
      table: {
        head: ['Xato turi', 'Belgisi'],
        rows: [
          ['Mavzudan chetga chiqish', 'Izoh maqolaga aloqasiz'],
          ['Reklama', 'Kanal, sahifa yoki mahsulot targ‘iboti'],
          ['Asossiz fikr', 'Faqat «zo‘r», «yomon» — sababsiz'],
          ['Odobsizlik', 'Haqorat, kinoya, qo‘pol so‘zlar'],
          ['Savodsizlik', 'Imlo va tinish belgisi xatolari'],
          ['Noaniqlik', 'Faqat hisbelgilar'],
        ],
      },
      note: 'O‘tgan dars uy vazifasi asosida maqolaga o‘zingiz qisqa izoh yozing va sinfdoshlaringiz bilan birga tahlil qiling (2.9).',
    },
  ],
};

/* --- 8-sinf Ona tili: darslikning (2025) dastlabki 10 ta darsi asosida --- */
const ONA_TILI_8 = [
  {
    id: 'dalillash',
    source: 'I bob «Ona yurt» • 1-dars • 7–9-betlar',
    title: 'Fikrni dalillash',
    short: '«Sangardak qo‘shig‘i» matni — fikrni asoslash usullari',
    lesson: FULL_LESSONS['dalillash'],
    pairs: [
      ['Dalillash', 'Fikrni tushuntirish, isbotlash'],
      ['saraton', 'To‘rtinchi oyning arabcha nomi'],
      ['go‘sha', 'Joy, maskan; ovloq joy'],
      ['siymo', 'Shaxs, zot; qiyofa'],
      ['saboq', 'Dars; ibrat, o‘rnak'],
      ['Maqol', 'Fikrni dalillash vositasi'],
    ],
    quiz: [
      { q: 'Fikrni dalillash deganda nima tushuniladi?', options: ['fikrni tushuntirish, izohlash, isbotlash', 'fikrni qisqartirish', 'matnga sarlavha qo‘yish', 'so‘zni lug‘atdan topish'], answer: 0 },
      { q: 'Qaysi biri fikrni dalillash vositasi bo‘ladi?', options: ['rivoyat', 'tinish belgisi', 'bo‘g‘in', 'urg‘u'], answer: 0 },
      { q: '«Sangardak qo‘shig‘i» matnining muallifi kim?', options: ['Sanjar Tursunov', 'Qo‘chqor Norqobil', 'Ibrohim G‘afurov', 'Umid Obidxo‘jayev'], answer: 0 },
      { q: 'Muallif «bu — sening bolang» degan tushuncha yo‘qligini qanday dalillagan?', options: ['bolaligidagi voqeani keltirib', 'statistik ma’lumot keltirib', 'she’r yozib', 'lug‘atga murojaat qilib'], answer: 0 },
      { q: '«Saboq» so‘zining ma’nolaridan biri qaysi?', options: ['ibrat, o‘rnak', 'ovloq joy', 'qiyofa, ko‘rinish', 'o‘n ikki burjning biri'], answer: 0 },
      { q: 'Muallifning matnni yaratishdan asosiy maqsadi nima?', options: ['Vatanga bo‘lgan muhabbatini ifodalash', 'qishloq tabiatini tasvirlash', 'oshpazni ta’riflash', 'Toshkentni maqtash'], answer: 0 },
    ],
    sort: {
      categories: ['go‘sha', 'siymo', 'saboq'],
      items: [
        { text: 'joy, maskan', cat: 0 }, { text: 'shaxs, zot', cat: 1 }, { text: 'dars, mashg‘ulot', cat: 2 },
        { text: 'odamlar nazaridan uzoq yer', cat: 0 }, { text: 'qiyofa, ko‘rinish', cat: 1 }, { text: 'ibrat, o‘rnak', cat: 2 },
        { text: 'ovloq joy', cat: 0 }, { text: 'bilim, fan', cat: 2 },
      ],
    },
    qa: [
      { q: 'Fikrni dalillash uchun nimalardan foydalaniladi?', a: 'Iqtibos, kichik hikoya, rivoyat, she’riy misralar, maqol va shu kabilardan.' },
      { q: 'Nega bola chumoliga ham ozor bermaydigan bo‘lib ulg‘aydi?', a: 'Qush otgani uchun olgan tanbehidan saboq olgani uchun.' },
      { q: '«Buloq bo‘lmasa, irmoq, irmoq bo‘lmasa, daryo yo‘q» fikri Vatan bilan qanday bog‘liq?', a: 'Har bir qishloq Vatanning bir bo‘lagi; ona qishloqqa mehr butun Vatanga muhabbatga aylanadi.' },
      { q: '«Go‘sha» so‘zining ikki ma’nosini ayting.', a: 'Joy, maskan va odamlar nazaridan uzoq yer, ovloq joy.' },
      { q: '«Men qishlog‘imni yaxshi ko‘raman, chunki...» gapini dalil bilan davom ettiring.', a: 'Erkin javob: o‘quvchi iqtibos, hayotiy voqea yoki maqol bilan asoslaydi.' },
    ],
  },
  {
    id: 'soz-tarkibi',
    source: 'I bob «Ona yurt» • 2-dars • 10–12-betlar',
    title: 'So‘z tarkibi: asos va qo‘shimcha',
    short: 'Ibora, kelishiklar, so‘z yasovchi qo‘shimchalar, imlo',
    lesson: FULL_LESSONS['soz-tarkibi'],
    pairs: [
      ['Qaratqich kelishigi', '-ning'],
      ['Tushum kelishigi', '-ni'],
      ['Jo‘nalish kelishigi', '-ga (-ka, -qa)'],
      ['O‘rin-payt kelishigi', '-da'],
      ['Chiqish kelishigi', '-dan'],
      ['Asos', 'So‘zning o‘zak ma’nosi'],
    ],
    quiz: [
      { q: '-ni qaysi kelishikning qo‘shimchasi?', options: ['tushum kelishigi', 'qaratqich kelishigi', 'jo‘nalish kelishigi', 'chiqish kelishigi'], answer: 0 },
      { q: '«Yo‘lak» so‘ziga -ga qo‘shilsa qanday yoziladi?', options: ['yo‘lakka', 'yo‘lakga', 'yo‘lakqa', 'yo‘lagga'], answer: 0 },
      { q: 'Asosga xos xususiyatni toping.', options: ['mustaqil qo‘llana oladi', 'mustaqil qo‘llana olmaydi', 'faqat so‘zlarni bog‘laydi', 'doim so‘z oxirida keladi'], answer: 0 },
      { q: '«Gulzor» so‘zidagi -zor qanday qo‘shimcha?', options: ['so‘z yasovchi', 'kelishik', 'egalik', 'ko‘plik'], answer: 0 },
      { q: '«O‘g‘il» so‘ziga -i qo‘shilganda qanday yoziladi?', options: ['o‘g‘li', 'o‘g‘ili', 'o‘g‘lii', 'o‘g‘ilii'], answer: 0 },
      { q: 'Qaysi birikma xatosiz yozilgan?', options: ['quyosh chiqqach', 'quyosh chiqgach', 'ko‘chat ekgani', 'uyni tomi'], answer: 0 },
    ],
    sort: {
      categories: ['Asos', 'Qo‘shimcha'],
      items: [
        { text: 'kitob', cat: 0 }, { text: '-lar', cat: 1 }, { text: 'yaxshi', cat: 0 }, { text: '-lik', cat: 1 },
        { text: 'gul', cat: 0 }, { text: '-zor', cat: 1 }, { text: '-ning', cat: 1 }, { text: 'yurt', cat: 0 },
      ],
    },
    qa: [
      { q: 'So‘z tarkibi nimalardan iborat?', a: 'Asos va qo‘shimcha(lar)dan.' },
      { q: 'Qo‘shimchaning uch xususiyatini ayting.', a: 'Mustaqil qo‘llanmaydi; asosga yangi yoki qo‘shimcha ma’no beradi; so‘zlarni bog‘laydi.' },
      { q: '«Bag‘ir» so‘ziga -im qo‘shib yozing.', a: '«Bag‘rim».' },
      { q: '-chilik qo‘shimchasi bilan so‘z yasang.', a: 'Masalan: dehqonchilik, mehmondorchilik.' },
      { q: '«Uyni tomi» birikmasidagi xatoni tuzating.', a: '«Uyning tomi» (qaratqich kelishigi -ning).' },
    ],
  },
  {
    id: 'manodosh',
    source: 'I bob «Ona yurt» • 3-dars • 13–15-betlar',
    title: 'Ma’nodosh so‘zlar va matn tahlili',
    short: '«Bu uyda O‘zbekiston yashayapti» matni',
    lesson: FULL_LESSONS['manodosh'],
    pairs: [
      ['mangu', 'abadiy'],
      ['qalb', 'ko‘ngil'],
      ['birov', 'allakim'],
      ['gumon', 'shubha'],
      ['iltijo', 'o‘tinch'],
      ['sherik', 'hamkor'],
    ],
    quiz: [
      { q: 'Yakub Kolas qaysi xalqning shoiri?', options: ['belarus', 'rus', 'qozoq', 'ukrain'], answer: 0 },
      { q: 'Shoir urush yillarida qaysi shaharda yashagan?', options: ['Toshkentda', 'Samarqandda', 'Moskvada', 'Olmaotada'], answer: 0 },
      { q: '«Mangu» so‘zining ma’nodoshi qaysi?', options: ['abadiy', 'vaqtincha', 'qisqa', 'yangi'], answer: 0 },
      { q: 'Vasilisa shoirning kimi bo‘ladi?', options: ['chevarasi', 'qizi', 'singlisi', 'kelini'], answer: 0 },
      { q: 'Matnning muallifi kim?', options: ['Qo‘chqor Norqobil', 'Sanjar Tursunov', 'Ibrohim G‘afurov', 'Eshqobil Shukur'], answer: 0 },
      { q: 'Ma’nodosh so‘zlar qanday so‘zlar?', options: ['shakli har xil, ma’nosi yaqin', 'ma’nosi qarama-qarshi', 'shakli bir xil, ma’nosi boshqa', 'eskirgan so‘zlar'], answer: 0 },
    ],
    sort: {
      categories: ['To‘g‘ri', 'Noto‘g‘ri'],
      items: [
        { text: 'Yakub Kolas umrining oxirigacha O‘zbekistonda yashagan', cat: 1 },
        { text: 'Muallif o‘zbek va belorus xalqining hikmatli so‘zini qiyoslagan', cat: 0 },
        { text: 'Shoirning uyi hozir muzeyga aylantirilgan', cat: 0 },
        { text: 'Shoir Toshkentda besh yil yashagan', cat: 1 },
        { text: 'Mehmonlarga ko‘k choy damlab berishdi', cat: 0 },
        { text: 'Safarda faqat o‘zbek adiblari bo‘lgan', cat: 1 },
        { text: '«Chimyon» she’ri Toshkentda yozilgan', cat: 0 },
        { text: 'Vasilisa O‘zbekiston haqida befarq gapirdi', cat: 1 },
      ],
    },
    qa: [
      { q: '«Bir kun tuz totgan yeringga qirq kun salom ber» maqolini izohlang.', a: 'Kimdan yaxshilik ko‘rsang, uni uzoq vaqt, bir umr unutma.' },
      { q: 'Nega Vasilisa O‘zbekiston haqida ko‘zlarida yosh bilan gapirdi?', a: 'Bobosi Toshkentda mehr ko‘rgan va umrining oxirigacha O‘zbekiston yodi bilan yashagan.' },
      { q: 'Muallif nega avval Vasilisaning samimiyligiga shubha qildi?', a: 'Mehmonlar kelgani uchun ataylab O‘zbekistonga urg‘u berayotgandir, deb o‘yladi.' },
      { q: '«Qalb» va «gumon» so‘zlarining ma’nodoshini ayting.', a: 'Qalb — ko‘ngil; gumon — shubha.' },
      { q: 'Matnga nega «Bu uyda O‘zbekiston yashayapti» sarlavhasi tanlangan?', a: 'Uydagi har bir xona, eksponat O‘zbekiston bilan bog‘liq; u yerda o‘zbek xalqi ulug‘lanadi.' },
    ],
  },
  {
    id: 'birikish-vositalari',
    source: 'I bob «Ona yurt» • 4-dars • 16–17-betlar',
    title: 'So‘zlarning birikish vositalari',
    short: 'Ohang, kelishik qo‘shimchalari va ko‘makchilar',
    lesson: FULL_LESSONS['birikish-vositalari'],
    pairs: [
      ['kichkina qishloq', 'ohang'],
      ['daryoga qo‘shilmoq', 'kelishik qo‘shimchasi'],
      ['uyi tomon chopmoq', 'ko‘makchi'],
      ['yurtni kuylamoq', 'yurt haqida kuylamoq'],
      ['singlimga oldim', 'singlim uchun oldim'],
      ['telegramdan jo‘natmoq', 'telegram orqali jo‘natmoq'],
    ],
    quiz: [
      { q: '«Issiqroq joy» birikmasida so‘zlar qanday bog‘langan?', options: ['ohang orqali', 'kelishik orqali', 'ko‘makchi orqali', 'bog‘lovchi orqali'], answer: 0 },
      { q: '«Uyi tomon chopmoq» birikmasidagi bog‘lovchi vosita qaysi?', options: ['ko‘makchi', 'ohang', 'kelishik qo‘shimchasi', 'egalik qo‘shimchasi'], answer: 0 },
      { q: '«Yurtni kuylamoq»ni ko‘makchi bilan ifodalang.', options: ['yurt haqida kuylamoq', 'yurt bilan kuylamoq', 'yurtdan kuylamoq', 'yurt tomon kuylamoq'], answer: 0 },
      { q: 'Qaysi gap to‘g‘ri tahrirlangan?', options: ['O‘quvchilardan birining natijasi yuqori chiqdi.', 'O‘quvchilarning birining natijasi yuqori chiqdi.', 'O‘quvchilarni birining natijasi yuqori chiqdi.', 'O‘quvchilarga birining natijasi yuqori chiqdi.'], answer: 0 },
      { q: '«Telefondan so‘rab bilmoq» birikmasini ko‘makchi bilan yozing.', options: ['telefon orqali so‘rab bilmoq', 'telefon uchun so‘rab bilmoq', 'telefon tomon so‘rab bilmoq', 'telefon haqida so‘rab bilmoq'], answer: 0 },
    ],
    sort: {
      categories: ['Ohang', 'Kelishik', 'Ko‘makchi'],
      items: [
        { text: 'kichkina qishloq', cat: 0 }, { text: 'odamlarning mardligi', cat: 1 }, { text: 'O‘zbekiston haqida gapirmoq', cat: 2 },
        { text: 'issiqroq joy', cat: 0 }, { text: 'daryoga qo‘shilmoq', cat: 1 }, { text: 'uyi tomon chopmoq', cat: 2 },
        { text: 'sokin uy', cat: 0 }, { text: 'shaharni kezmoq', cat: 1 }, { text: 'singlim uchun olmoq', cat: 2 },
      ],
    },
    qa: [
      { q: 'So‘zlar qanday vositalar yordamida birikadi?', a: 'Ohang, kelishik qo‘shimchalari va ko‘makchilar yordamida.' },
      { q: '«Qalamda yozmoq» birikmasini ko‘makchi bilan ayting.', a: '«Qalam bilan yozmoq».' },
      { q: '«Ukamga sotib olmoq» birikmasini ko‘makchi bilan ayting.', a: '«Ukam uchun sotib olmoq».' },
      { q: '«Xayolingga kelgan g‘oyalarning yozib olishni odat qil» gapini tuzating.', a: '«Xayolingga kelgan g‘oyalarni yozib olishni odat qil».' },
      { q: 'Ohang orqali bog‘langan birikmaga misol keltiring.', a: 'Masalan: kichkina qishloq, sokin uy.' },
    ],
  },
  {
    id: 'sher-tahlili',
    source: 'I bob «Ona yurt» • 5-dars • 18–19-betlar',
    title: 'She’r tahlili: badiiy vositalar',
    short: '«Vatan» she’ri, nasriy bayon, yetakchi g‘oya',
    lesson: FULL_LESSONS['sher-tahlili'],
    pairs: [
      ['mor', 'ilon'],
      ['muxammas', 'Besh misrali bandlardan iborat she’r'],
      ['kas', 'odam, kishi'],
      ['faqir', 'kambag‘al, muhtoj'],
      ['g‘amguzor', 'g‘amxo‘r, mehribon'],
      ['faromush', 'unutgan holda'],
    ],
    quiz: [
      { q: '«Onamdek mehribon, munis Vatan bor» misrasida qaysi badiiy vosita bor?', options: ['o‘xshatish', 'tarixiy so‘z', 'hikmatli so‘z', 'ibora'], answer: 0 },
      { q: '«Mor» so‘zining ma’nosi nima?', options: ['ilon', 'qush', 'bulbul', 'gul'], answer: 0 },
      { q: 'Muxammas bandi necha misradan iborat?', options: ['besh', 'to‘rt', 'ikki', 'olti'], answer: 0 },
      { q: 'Nasriy bayon nima?', options: ['she’r mazmunini nasr bilan bayon qilish', 'she’rni yod olish', 'she’rga sarlavha qo‘yish', 'misralarni sanash'], answer: 0 },
      { q: 'She’rning yetakchi g‘oyasi qaysi?', options: ['vatandan yiroq inson yayrab yashay olmaydi', 'boylik — eng katta baxt', 'bulbul qafasda yaxshi sayraydi', 'safar qilish kerak'], answer: 0 },
      { q: '«Dadam yelka... o‘tqazib» — bo‘sh o‘ringa mos qo‘shimcha?', options: ['-siga', '-sida', '-sidan', '-sini'], answer: 0 },
    ],
    sort: {
      categories: ['O‘xshatish', 'Hikmatli so‘z', 'Tarixiy so‘z'],
      items: [
        { text: 'Onamdek mehribon Vatan', cat: 0 },
        { text: 'Mor-u qushni bir qafasda asratib bo‘lmas', cat: 1 },
        { text: 'baayni', cat: 2 },
        { text: 'oq kemaday oppoq uy', cat: 0 },
        { text: 'Bir kun tuz totgan yeringga qirq kun salom ber', cat: 1 },
        { text: 'faromush', cat: 2 },
        { text: 'qor bosganday oppoq', cat: 0 },
        { text: 'Toza havo — tanga davo', cat: 1 },
        { text: 'kas', cat: 2 },
      ],
    },
    qa: [
      { q: '«Bandi bulbul» va «Vatandan ayri ko‘ngil» o‘rtasida qanday bog‘liqlik bor?', a: 'Qafasdagi bulbul chamansiz sayramaganidek, vatandan ayrilgan ko‘ngil ham yayramaydi.' },
      { q: 'Nasriy bayonda nimalar ajratiladi?', a: 'Yetakchi g‘oya va yordamchi fikrlar.' },
      { q: '«Faqir bo‘lsam-da, bor yurtim — toj-u taxtim» misrasini izohlang.', a: 'Boy bo‘lmasam ham, Vatanim bor — u mening eng katta boyligim.' },
      { q: '«G‘amguzor» so‘zining ma’nosi nima?', a: 'Birovning g‘amini yengillatuvchi, g‘amxo‘r, mehribon kishi.' },
      { q: 'She’rda qanday badiiy vositalar qo‘llangan?', a: 'O‘xshatish, ko‘chma ma’noli so‘zlar, hikmatli so‘z, bo‘yoqdor va tarixiy so‘zlar.' },
    ],
  },
  {
    id: 'kochma-mano',
    source: 'I bob «Ona yurt» • 6-dars • 20–21-betlar',
    title: 'So‘zning o‘z va ko‘chma ma’nosi',
    short: 'Ko‘p ma’noli so‘zlar va ularni o‘rinli qo‘llash',
    lesson: FULL_LESSONS['kochma-mano'],
    pairs: [
      ['tog‘ cho‘qqisi', 'muvaffaqiyat cho‘qqisi'],
      ['iliq suv', 'iliq suhbat'],
      ['yumshoq non', 'yumshoq fe’lli'],
      ['lag‘monni cho‘zmoq', 'gapni cho‘zmoq'],
      ['paypoq to‘qimoq', 'gap to‘qimoq'],
      ['eshik ochmoq', 'ko‘ngil ochmoq'],
    ],
    quiz: [
      { q: 'So‘zning erkin holda ifodalagan ma’nosi qanday ataladi?', options: ['o‘z (bosh) ma’no', 'ko‘chma ma’no', 'ma’nodosh', 'qarama-qarshi ma’no'], answer: 0 },
      { q: 'Qaysi birikmada so‘z ko‘chma ma’noda qo‘llangan?', options: ['muvaffaqiyat cho‘qqisi', 'tog‘ cho‘qqisi', 'iliq suv', 'yumshoq non'], answer: 0 },
      { q: '«Majlis qaror qiladi» gapida «majlis» nimani bildiradi?', options: ['majlisdagi odamlarni', 'xonani', 'hujjatni', 'vaqtni'], answer: 0 },
      { q: 'Nima uchun so‘zlarga yangi ma’nolar yuklanadi?', options: ['so‘zlar soni ortib ketmasligi uchun', 'so‘zlar eskirgani uchun', 'chet tilidan olingani uchun', 'imlo qoidasi talab qilgani uchun'], answer: 0 },
      { q: '«Erkinlikning ildizlari ma’rifatdan suv ichadi» gapida «ildiz» qanday ma’noda?', options: ['ko‘chma ma’noda', 'o‘z ma’nosida', 'tarixiy so‘z', 'atama'], answer: 0 },
    ],
    sort: {
      categories: ['O‘z ma’no', 'Ko‘chma ma’no'],
      items: [
        { text: 'eshik ochmoq', cat: 0 }, { text: 'mansabdan tushmoq', cat: 1 },
        { text: 'tomdan tushmoq', cat: 0 }, { text: 'gapni cho‘zmoq', cat: 1 },
        { text: 'paypoq to‘qimoq', cat: 0 }, { text: 'yumshoq fe’lli', cat: 1 },
        { text: 'hikoyani o‘qimoq', cat: 0 }, { text: 'shirin orzu', cat: 1 },
        { text: 'iliq suv', cat: 0 }, { text: 'hayot darsi', cat: 1 },
      ],
    },
    qa: [
      { q: 'O‘z ma’no bilan ko‘chma ma’noning farqi nima?', a: 'O‘z ma’no — so‘zning erkin holdagi ma’nosi; ko‘chma ma’no — undan o‘sib chiqib, nutqda namoyon bo‘ladigan ma’no.' },
      { q: '«Bu yil o‘n beshga kiraman» gapini to‘liq ayting.', a: '«Bu yil o‘n besh yoshga kiraman».' },
      { q: '«“Sohibqiron”ni o‘qiyapman» gapida qaysi so‘z tushib qolgan?', a: '«asar»: «“Sohibqiron” asarini o‘qiyapman».' },
      { q: '«Iliq» so‘zini ikki ma’noda qo‘llang.', a: 'Iliq suv (o‘z ma’no), iliq suhbat (ko‘chma ma’no).' },
      { q: '«Navoiyni o‘qimoq» birikmasida qanday ko‘chish bor?', a: 'Shoir nomi uning asarlari o‘rnida qo‘llangan.' },
    ],
  },
  {
    id: 'infografika',
    source: 'I bob «Ona yurt» • 7-dars • 22–23-betlar',
    title: 'Infografika bilan ishlash',
    short: 'Demografik infografika, hukmlarni tekshirish, imlo',
    lesson: FULL_LESSONS['infografika'],
    pairs: [
      ['Infografika', 'Ma’lumotning ko‘rgazmali tasviri'],
      ['Demografiya', 'Aholi soni va tarkibi haqida ma’lumot'],
      ['Dinamika', 'O‘sish yoki kamayish jarayoni'],
      ['Statistika', 'Raqamli ma’lumotlar to‘plami'],
      ['Hukm', 'To‘g‘riligi tekshiriladigan fikr'],
      ['Axborot matni', 'Faktlarga asoslangan xabar'],
    ],
    quiz: [
      { q: 'To‘g‘ri yozilgan so‘zni toping: «k…nstitutsiya»', options: ['konstitutsiya', 'kanstitutsiya', 'konstitusiya', 'kanstitusiya'], answer: 0 },
      { q: 'To‘g‘ri yozilgan so‘zni toping: «far…von»', options: ['farovon', 'farovan', 'faravon', 'faravan'], answer: 0 },
      { q: 'To‘g‘ri yozilgan so‘zni toping: «…udud»', options: ['hudud', 'xudud', 'hudut', 'xudut'], answer: 0 },
      { q: 'To‘g‘ri yozilgan so‘zni toping: «isloh…t»', options: ['islohot', 'isloxot', 'islohat', 'isloxat'], answer: 0 },
      { q: 'Infografikaga ko‘ra 2023-yilda shahar aholisi ulushi qancha?', options: ['51,0%', '49,0%', '50,3%', '60,0%'], answer: 0 },
      { q: 'Infografikadagi ma’lumotlar qaysi saytdan olingan?', options: ['Stat.uz', 'Tanlov.uz', 'Oyina.uz', 'Lex.uz'], answer: 0 },
    ],
    sort: {
      categories: ['To‘g‘ri yozilgan', 'Xato yozilgan'],
      items: [
        { text: 'respublika', cat: 0 }, { text: 'respuplika', cat: 1 },
        { text: 'demokratiya', cat: 0 }, { text: 'demakratiya', cat: 1 },
        { text: 'ajdod', cat: 0 }, { text: 'ajdot', cat: 1 },
        { text: 'fuqaro', cat: 0 }, { text: 'fuqoro', cat: 1 },
        { text: 'qo‘mita', cat: 0 }, { text: 'qomita', cat: 1 },
      ],
    },
    qa: [
      { q: 'Infografika qanday vositalardan tashkil topadi?', a: 'Raqamlar, diagrammalar, ramziy belgilar va qisqa matnlardan.' },
      { q: 'Hukmning to‘g‘riligini qanday tekshirasiz?', a: 'Hukmdagi ma’lumotni infografikadagi raqamlar bilan solishtirib.' },
      { q: 'Nega 2023 va 2024-yil ko‘rsatkichlarini to‘g‘ridan-to‘g‘ri solishtirib bo‘lmaydi?', a: '2024-yil ma’lumoti faqat yanvar–sentabrni qamraydi, yillik emas.' },
      { q: '«Hudud» va «islohot» so‘zlarini to‘g‘ri yozing.', a: 'h harfi bilan: hudud, islohot.' },
      { q: 'Axborot matni qanday bo‘lishi kerak?', a: 'Aniq faktlarga asoslangan, qisqa va tushunarli.' },
    ],
  },
  {
    id: 'ijodiy-ish',
    source: 'I bob «Ona yurt» • 8-dars • 24-bet',
    title: 'Ijodiy ish va taqdimot',
    short: '«Ona yurtim — O‘zbekiston!» ijodiy ishi, sharh yozish',
    lesson: FULL_LESSONS['ijodiy-ish'],
    pairs: [
      ['Sharh', 'Ish haqida qisqa baho va fikr'],
      ['Taqdimot', 'Ishni boshqalarga namoyish etish'],
      ['Ramziy belgi', 'Ma’lumotni bildiruvchi kichik rasm'],
      ['Ijodiy ish', 'Video, audio, rasm yoki matn'],
      ['Alifbo tartibi', 'So‘zlarni harflar ketma-ketligida yozish'],
      ['Jonli nutq', 'O‘quvchining o‘z og‘zaki nutqi'],
    ],
    quiz: [
      { q: 'Tanlovda kimlar ishtirok eta oladi?', options: ['15 yoshdan 30 yoshgacha bo‘lganlar', 'faqat maktab o‘quvchilari', '18 yoshdan kattalar', 'faqat talabalar'], answer: 0 },
      { q: 'Tanlovga ariza qayerda topshiriladi?', options: ['tanlov.uz saytida', 'stat.uz saytida', 'maktab kutubxonasida', 'pochta orqali'], answer: 0 },
      { q: 'Qaysi biri tanlov yo‘nalishi?', options: ['Tasviriy va amaliy san’at', 'Matematika olimpiadasi', 'Sport musobaqasi', 'Robototexnika'], answer: 0 },
      { q: 'Ijodiy ishda nimaga alohida e’tibor qaratish kerak?', options: ['o‘z jonli nutqingiz bo‘lishiga', 'faqat rasmlar bo‘lishiga', 'matn uzun bo‘lishiga', 'chet tilida bo‘lishiga'], answer: 0 },
      { q: 'Qaysi qator alifbo tartibida?', options: ['ajdod, bolalik, do‘stlik', 'bolalik, ajdod, do‘stlik', 'do‘stlik, bolalik, ajdod', 'ajdod, do‘stlik, bolalik'], answer: 0 },
    ],
    sort: {
      categories: ['Ijodiy ish shakli', 'Ma’lumot manbasi'],
      items: [
        { text: 'video', cat: 0 }, { text: 'internet', cat: 1 },
        { text: 'audio', cat: 0 }, { text: 'kitob', cat: 1 },
        { text: 'fotosuratlar jamlanmasi', cat: 0 }, { text: 'jurnal', cat: 1 },
        { text: 'chellenj', cat: 0 }, { text: 'ko‘rgazmali vositalar', cat: 1 },
      ],
    },
    qa: [
      { q: 'Ijodiy ishni qanday shakllarda tayyorlash mumkin?', a: 'Video, audio, fotosuratlar jamlanmasi, rasm, chellenj va boshqa usullarda.' },
      { q: 'Yaxshi sharh qanday bo‘ladi?', a: 'Qisqa, aniq, asosli va hurmat bilan yozilgan; ishning yutuq va kamchiligini ko‘rsatadi.' },
      { q: 'Vatan tushunchasiga oid 5 ta so‘z ayting.', a: 'Masalan: ajdod, bolalik, do‘stlik, ona tili, tinchlik.' },
      { q: 'Infografikadagi ma’lumotlarni ramziy belgilar bilan qanday ko‘rsatish mumkin?', a: 'Masalan: sana uchun kalendar, yosh uchun odam belgisi, sayt uchun kompyuter belgisi.' },
      { q: '«Vatan taraqqiyotida mening hissam» matni necha so‘zdan iborat bo‘lishi kerak?', a: '200–300 so‘zdan.' },
    ],
  },
  {
    id: 'qadriyat',
    source: 'II bob «Qadriyatlar» • 1-dars • 26–30-betlar',
    title: 'Qadriyat nima? Maqola tahlili',
    short: 'Milliy va umuminsoniy qadriyatlar, asosiy fikr',
    lesson: FULL_LESSONS['qadriyat'],
    pairs: [
      ['bashariyat', 'insoniyat, kishilik'],
      ['insonparvar', 'Odamlarga g‘amxo‘r, ularni sevuvchi'],
      ['bag‘rikeng', 'Ochiq ko‘ngilli, keng qarovchi'],
      ['tozalik', 'ozoda, toza holat'],
      ['mehmondo‘st', 'Mehmon kutishni yaxshi ko‘ruvchi'],
      ['yelkadosh', 'Ishda yonma-yon turuvchi'],
    ],
    quiz: [
      { q: 'Maqola muallifi kim?', options: ['Umid Obidxo‘jayev', 'Qo‘chqor Norqobil', 'Sanjar Tursunov', 'Ibrohim G‘afurov'], answer: 0 },
      { q: 'Qadriyatlar qaysi ikki turga bo‘linadi?', options: ['milliy va umuminsoniy', 'eski va yangi', 'shahar va qishloq', 'katta va kichik'], answer: 0 },
      { q: 'Qadriyatlarning eng oliysi deb nima hisoblanadi?', options: ['inson, uning hayoti, huquq va erki', 'boylik', 'mansab', 'shon-shuhrat'], answer: 0 },
      { q: '«Lafz» qadriyati nimani anglatadi?', options: ['qonun, burch va kelishuvga sadoqat', 'chiroyli gapirish', 'ko‘p gapirish', 'she’r yozish'], answer: 0 },
      { q: 'Nima uchun muallif ro‘yxatni muhokamaga qo‘ygan?', options: ['boshqalarning fikri orqali ro‘yxatni takomillashtirish uchun', 'mashhur bo‘lish uchun', 'qadriyatlarni bekor qilish uchun', 'maqolani uzaytirish uchun'], answer: 0 },
      { q: '«Bashariyat» so‘zining ma’nosi nima?', options: ['insoniyat, kishilik', 'tabiat', 'davlat', 'shahar'], answer: 0 },
    ],
    sort: {
      categories: ['Muallif ro‘yxatida bor', 'Ro‘yxatda yo‘q'],
      items: [
        { text: 'ota-onaga ehtirom', cat: 0 }, { text: 'halollik', cat: 1 },
        { text: 'mehmondo‘stlik', cat: 0 }, { text: 'silayi rahm', cat: 1 },
        { text: 'ona tiliga hurmat', cat: 0 }, { text: 'innovatsiya', cat: 1 },
        { text: 'yelkadoshlik', cat: 0 }, { text: 'individuallik', cat: 1 },
        { text: 'tozalik', cat: 0 },
      ],
    },
    qa: [
      { q: 'Muallifning xulosasiga ko‘ra qadriyat nima?', a: 'Biz uchun qadrli bo‘lgan urf-odat va an’analarimiz, hayotiy prinsiplarimiz.' },
      { q: 'Milliy qadriyatlar mohiyatiga ko‘ra qanday turlarga bo‘linadi?', a: 'Tabiiy, moddiy, ma’naviy, ijtimoiy-siyosiy, iqtisodiy, axloqiy.' },
      { q: 'Qadriyatlar nima uchun kerak?', a: 'O‘tmishni bugun bilan bog‘laydi, xalqni jipslashtiradi; tinchlik va taraqqiyot ular bilan bog‘liq.' },
      { q: 'Muallif taklif qilgan uchta qadriyatni ayting.', a: 'Masalan: ota-onaga ehtirom, tozalik, mehmondo‘stlik.' },
      { q: 'Umuminsoniy qadriyat nima?', a: 'Butun bashariyat uchun xos bo‘lgan qadriyat.' },
    ],
  },
  {
    id: 'izohlar',
    source: 'II bob «Qadriyatlar» • 2-dars • 31–32-betlar',
    title: 'Ijtimoiy tarmoqdagi izohlar tahlili',
    short: 'Izohning mavzuga mosligi, munosabat, hisbelgilar',
    lesson: FULL_LESSONS['izohlar'],
    pairs: [
      ['Izoh', 'Postga bildirilgan fikr'],
      ['Hisbelgi', 'His-tuyg‘uni bildiruvchi belgi'],
      ['Reklama izoh', 'Mavzuga aloqasiz xabar'],
      ['Munosabat', 'Fikrga rozilik yoki e’tiroz'],
      ['Asosli fikr', 'Dalil bilan tasdiqlangan fikr'],
      ['Odob', 'Hurmat bilan, haqoratsiz yozish'],
    ],
    quiz: [
      { q: 'Qaysi foydalanuvchining izohi maqola mavzusiga mos emas?', options: ['Karomat (kanal reklamasi)', 'Nigora@_87', 'Oqila Zoirjon qizi', 'DILSHODA85'], answer: 0 },
      { q: 'Oqila Zoirjon qizi ro‘yxatga qaysi qadriyatni qo‘shishni taklif qilgan?', options: ['halollik', 'tozalik', 'mehmondo‘stlik', 'lafz'], answer: 0 },
      { q: 'Nigora@_87 qaysi qadriyatni tavsiya qilgan?', options: ['silayi rahm', 'innovatsiya', 'tejamkorlik', 'sport'], answer: 0 },
      { q: 'Faqat hisbelgidan iborat izoh haqida qaysi fikr to‘g‘ri?', options: ['fikr aniq ifodalanmaydi', 'eng to‘liq izoh hisoblanadi', 'reklama hisoblanadi', 'qoidaga to‘liq mos'], answer: 0 },
      { q: 'Yaxshi izohga xos xususiyat qaysi?', options: ['mavzuga doir va hurmat bilan yozilgan', 'reklama qo‘shilgan', 'faqat hisbelgilardan iborat', 'bosh harflar bilan yozilgan'], answer: 0 },
    ],
    sort: {
      categories: ['Mavzuga mos izoh', 'Mos emas'],
      items: [
        { text: 'Qadriyatlari qadrlangan yurtning xalqi ham qadr topadi.', cat: 0 },
        { text: 'Kanalimda chiroyli statuslar bor, obuna bo‘ling.', cat: 1 },
        { text: 'Halollikni ham ro‘yxatga kiritish kerak.', cat: 0 },
        { text: 'Mening sahifamda arzon chegirmalar!', cat: 1 },
        { text: 'Qadriyatlar ro‘yxatini qat’iy belgilab bo‘lmaydi.', cat: 0 },
        { text: 'Bugun ob-havo qanday bo‘ladi?', cat: 1 },
        { text: 'Silayi rahmni ham ro‘yxatga kiritishni tavsiya qilaman.', cat: 0 },
        { text: 'Kim futbol ko‘rdi?', cat: 1 },
      ],
    },
    qa: [
      { q: 'Izoh maqola mazmuniga mosligini qanday aniqlaysiz?', a: 'Izohda maqola mavzusiga — qadriyatlar ro‘yxatiga — munosabat bildirilganini tekshirib.' },
      { q: 'Karomatning izohi nega mos emas?', a: 'U mavzuga aloqasiz, o‘z kanalini reklama qilgan.' },
      { q: 'Hisbelgilardan foydalanishga munosabatingiz qanday?', a: 'Erkin javob: hisbelgi fikrni to‘ldirishi mumkin, lekin o‘rnini bosmaydi.' },
      { q: 'Izoh yozishning uchta qoidasini ayting.', a: 'Masalan: mavzuga doir yozish, hurmat saqlash, fikrni asoslash.' },
      { q: 'Oqila2004 muallifdan nimani so‘ragan?', a: 'Yosh avlodni qadriyatlar ruhida tarbiyalash uchun nima qilish kerakligi haqida yozishni.' },
    ],
  },
];

/* --- 8-sinf Ona tili: 11–20-darslar (darslik 2025, 33–55-betlar) --- */
const ONA_TILI_8_PART2 = [
  /* ===================== 11 ===================== */
  {
    id: 'egalik',
    source: 'II bob «Qadriyatlar» • 3-dars • 33-bet',
    title: 'Qo‘shimchalar vazifasi va egalik qo‘shimchasi',
    short: 'So‘z tahlili, egalik qo‘shimchasining ma’nolari',
    lesson: [
      {
        title: 'Darsga kirish',
        text: 'Bu darsda «Qadriyat nima?» maqolasidagi gaplar asosida so‘zlarga qo‘shilgan qo‘shimchalar va ularning vazifasi tahlil qilinadi.',
        list: ['So‘zni qo‘shimchalarga ajratib tahlil qilish', 'So‘zlarni bog‘lovchi qo‘shimchalarni topish', 'Egalik qo‘shimchasining turli ma’nolari', '-ish + egalik + kerak/zarur/shart qurilmasi'],
      },
      {
        title: 'So‘zni tahlil qilish (2.12)',
        text: 'Gap: «O‘zbekiston Respublikasining Konstitutsiyasida ham bir qancha qadriyatlarimiz o‘z aksini topgan.» So‘zlarga qo‘shilgan qo‘shimchalarni ajrating.',
        table: {
          head: ['So‘z', 'Qo‘shimchalar', 'Vazifasi'],
          rows: [
            ['Respublikasining', '-si, -ning', 'egalik; qaratqich kelishigi'],
            ['Konstitutsiyasida', '-si, -da', 'egalik; o‘rin-payt kelishigi'],
            ['qadriyatlarimiz', '-lar, -imiz', 'ko‘plik; I shaxs ko‘plik egaligi'],
            ['aksini', '-i, -ni', 'egalik; tushum kelishigi'],
            ['topgan', '-gan', 'sifatdosh shakli'],
          ],
        },
      },
      {
        title: 'So‘zlarni bog‘lovchi qo‘shimchalar (2.13)',
        text: 'Gapdagi so‘zlar o‘zaro munosabatga kirishishi uchun ularga kelishik va egalik qo‘shimchalari qo‘shiladi.',
        examples: ['jamiyatda obro‘ga ega', 'millat uchun xos', 'qadriyatlarning o‘rni', 'sha’nini ulug‘lash'],
        rule: 'Kelishik qo‘shimchalari (-ning, -ni, -ga, -da, -dan) va egalik qo‘shimchalari (-im, -ing, -i, -imiz, -ingiz, -lari) so‘zlarni bir-biriga bog‘laydi.',
      },
      {
        title: 'Egalik qo‘shimchalari',
        text: 'Egalik qo‘shimchasi narsaning uch shaxsdan biriga qarashli ekanini bildiradi.',
        table: {
          head: ['Shaxs', 'Birlik', 'Ko‘plik'],
          rows: [
            ['I shaxs', 'kitob-im, yurt-im', 'kitob-imiz, yurt-imiz'],
            ['II shaxs', 'kitob-ing', 'kitob-ingiz'],
            ['III shaxs', 'kitob-i, ota-si', 'kitob-lari'],
          ],
        },
      },
      {
        title: 'Egalik qo‘shimchasining ma’nolari (2.14)',
        text: 'Egalik qo‘shimchasi faqat qarashlilikni emas, boshqa ma’nolarni ham bildiradi:',
        table: {
          head: ['Ma’nosi', 'Namuna'],
          rows: [
            ['Uch shaxsdan biriga qarashlilikni bildirish', 'uyning tomi'],
            ['Bajaruvchining shaxs va sonini bildirish', 'kitobxonning o‘qigani'],
            ['Xoslik, umumdan ajratilganlik', 'Toshkent shahri, eng qizig‘i'],
            ['Asos bilan yaxlitlanib, o‘z vazifasini yo‘qotish', 'kunduzi kelmoq, kechasi'],
          ],
        },
      },
      {
        title: 'Gaplarni tahlil qilish (2.14)',
        text: 'Darslikdagi gaplarda egalik qo‘shimchasi qaysi ma’noda kelgan?',
        table: {
          head: ['Gap', 'So‘z', 'Ma’nosi'],
          rows: [
            ['Bobomning etagidan ushlab...', 'etagi', 'qarashlilik'],
            ['Bo‘zchi bilganin to‘qir...', 'bilgani', 'bajaruvchining shaxs-soni'],
            ['Sport bilan shug‘ullanishingiz kerak.', 'shug‘ullanishingiz', 'bajaruvchining shaxs-soni'],
            ['Navoiy viloyati yoshlari bilan...', 'viloyati', 'xoslik'],
            ['Eng qizig‘i endi boshlanadi.', 'qizig‘i', 'umumdan ajratilganlik'],
            ['Kechasi ishlaydi, kunduzi uxlaydi.', 'kechasi, kunduzi', 'yaxlitlanib, vazifasini yo‘qotgan'],
          ],
        },
      },
      {
        title: '-ish + egalik + kerak (2.15)',
        text: 'Majburiyat, zarurat ma’nosini ifodalash uchun harakat nomi (-ish) ga egalik qo‘shimchasi qo‘shilib, kerak, zarur, darkor, shart so‘zlari bilan keladi.',
        table: {
          head: ['Topshiriqda', 'To‘g‘ri shakli'],
          rows: [
            ['Men mutolaa bilan shug‘ullanish... kerak.', 'shug‘ullanishim kerak'],
            ['Ko‘proq ilm olish... zarur.', 'ilm olishingiz zarur'],
            ['Vaqtdan unumli foydalanishni o‘rganish... darkor.', 'o‘rganishimiz darkor'],
            ['Hammasiga g‘amxo‘rlik qilish... shart.', 'g‘amxo‘rlik qilishimiz shart'],
          ],
        },
      },
    ],
    pairs: [
      ['uyning tomi', 'Qarashlilik'],
      ['kitobxonning o‘qigani', 'Bajaruvchining shaxs-soni'],
      ['Toshkent shahri', 'Xoslik'],
      ['eng qizig‘i', 'Umumdan ajratilganlik'],
      ['kunduzi kelmoq', 'Vazifasini yo‘qotgan'],
      ['-imiz', 'I shaxs ko‘plik egaligi'],
    ],
    quiz: [
      { q: '«Respublikasining» so‘zida qaysi qo‘shimchalar bor?', options: ['-si (egalik), -ning (qaratqich)', '-ning (tushum)', '-si (ko‘plik)', '-lar, -ning'], answer: 0 },
      { q: '«Toshkent shahri» birikmasida egalik qo‘shimchasi qanday ma’no bildiradi?', options: ['xoslik', 'qarashlilik', 'bajaruvchining shaxsi', 'ko‘plik'], answer: 0 },
      { q: '«Kechasi ishlaydi» gapida «kechasi» so‘zidagi egalik qo‘shimchasi...', options: ['asos bilan yaxlitlanib, vazifasini yo‘qotgan', 'qarashlilikni bildiradi', 'xoslikni bildiradi', 'ko‘plikni bildiradi'], answer: 0 },
      { q: '«Ko‘proq ilm olish... zarur» — bo‘sh o‘ringa mos qo‘shimcha?', options: ['-ingiz', '-ni', '-da', '-lar'], answer: 0 },
      { q: '«qadriyatlarimiz» so‘zidagi -imiz qanday qo‘shimcha?', options: ['I shaxs ko‘plik egaligi', 'kelishik', 'so‘z yasovchi', 'II shaxs egaligi'], answer: 0 },
      { q: '«Eng qizig‘i endi boshlanadi» — «qizig‘i» qanday ma’noda?', options: ['umumdan ajratilganlik', 'qarashlilik', 'bajaruvchining shaxsi', 'vazifasini yo‘qotgan'], answer: 0 },
    ],
    sort: {
      categories: ['Qarashlilik', 'Bajaruvchi shaxsi', 'Xoslik / ajratish'],
      items: [
        { text: 'bobomning etagi', cat: 0 }, { text: 'kitobxonning o‘qigani', cat: 1 }, { text: 'Toshkent shahri', cat: 2 },
        { text: 'uyning tomi', cat: 0 }, { text: 'shug‘ullanishingiz kerak', cat: 1 }, { text: 'eng qizig‘i', cat: 2 },
        { text: 'bu yerlarning yozi', cat: 0 }, { text: 'bo‘zchi bilgani', cat: 1 }, { text: 'Navoiy viloyati', cat: 2 },
      ],
    },
    qa: [
      { q: 'Egalik qo‘shimchasining qanday ma’nolarini bilasiz?', a: 'Qarashlilik, bajaruvchining shaxs-soni, xoslik va umumdan ajratilganlik; ba’zan asos bilan yaxlitlanib vazifasini yo‘qotadi.' },
      { q: '«Kunduzi» so‘zidagi -i qo‘shimchasi qanday holatda?', a: 'Asos bilan yaxlitlanib, egalik vazifasini yo‘qotgan.' },
      { q: '«Men har kuni mutolaa bilan shug‘ullanish... kerak» gapini to‘ldiring.', a: '«...shug‘ullanishim kerak».' },
      { q: '«Konstitutsiyasida» so‘zini qo‘shimchalarga ajrating.', a: 'Konstitutsiya + si (egalik) + da (o‘rin-payt kelishigi).' },
      { q: 'Egalik qo‘shimchasining ko‘plik shakllarini ayting.', a: '-imiz, -ingiz, -lari.' },
    ],
  },

  /* ===================== 12 ===================== */
  {
    id: 'ayvon',
    source: 'II bob «Qadriyatlar» • 4-dars • 34–38-betlar',
    title: '«Bu diyorning ayvonlari nurga talosh...»',
    short: 'Matn tahlili, badiiy vositalar, munozara',
    lesson: [
      {
        title: 'Bog‘lovchi va ohang orqali bog‘lanish (2.16–2.18)',
        text: 'So‘zlar ohang bilan ham, bog‘lovchilar bilan ham bog‘lanadi.',
        table: {
          head: ['Vosita', 'Misol'],
          rows: [
            ['Bog‘lovchilar (va, -u, hamda)', 'olim-u mutaxassislar, talab va tartiblar'],
            ['Ohang', 'turlicha ta’rif berishgan, chiroyli xulq'],
          ],
        },
        note: 'Topshiriq: chiroyli, moviy, katta so‘zlarini ukam, akam, do‘stim so‘zlari bilan bog‘lang (masalan: katta akam, chiroyli va kamtar do‘stim) va gap tuzing.',
      },
      {
        title: 'Matn: muallif va mavzu',
        text: 'Faxriddin Hayitning matni bolalik xotiralari, momosining uyi va ayvoni haqida. Sarlavha va matn ichidagi she’riy satrlar Sirojiddin Sayyidning she’ridan olingan.',
        examples: ['Bu diyorning ayvonlari nurga talosh...', 'Vatan desam, ko‘zimda yosh, yuzimda yosh...'],
        note: 'Kirish: sarlavhani o‘qing va matn nima haqida ekanini taxmin qiling.',
      },
      {
        title: 'Matn mazmuni: momoning ayvoni',
        text: 'Muallif bolaligida momosining uyida ko‘rgan manzaralarni eslaydi.',
        list: [
          'Kun bo‘yi quyosh nuriga to‘la uzun ayvonda momo nabiralari uchun chopon, ko‘rpa qaviydi.',
          'Momo: «Xamirturush xamirni ko‘pchitganday, quyosh nuri ham paxtani shishiradi» — deydi.',
          'Kichik yumushlar uchun ham «Baraka top, savob ish qilding, bolam» deb duo qiladi.',
          'Uzoqdan yuki og‘ir qo‘shnini ko‘rsa, nabiralarini yordamga yuboradi va «hech narsa olib kelmanglar» deb tayinlaydi.',
        ],
      },
      {
        title: 'Ayvondagi hayot saboqlari',
        text: 'Muallif ilk hayot saboqlarini shu ayvonda olganini aytadi. Bir qarashda oddiy nasihatdek tuyulgan gaplar zamirida ulkan ma’no bor.',
        examples: ['Suvga tupurma', 'Nonni uvol qilma', 'Daraxtning shoxini sindirma, joni og‘riydi', 'Qushlarga ozor berma', 'Mehmon yonida dasturxonga hadeb qo‘l cho‘zma'],
        rule: 'Ayvon — o‘zbekning ostonasi. Mehmon shu yerda kutib olinadi va kuzatiladi. Xalqimiz «Vatan ostonadan boshlanadi» deydi.',
      },
      {
        title: 'Matn mazmuni: momo va Vatan',
        text: 'Momo urush yillarining og‘ir kunlarini boshidan kechirgan. Muallif uning yig‘laganini faqat bobosi vafot etganda ko‘radi.',
        list: [
          'Momo nazdida hovli-joy, bog‘-rog‘ — bobo barpo qilgan Vatan.',
          'Qaldirg‘ochlar ayvonga in qursa, momo ranjimaydi: «Shu qushga ham Vatan kerak» deydi.',
          'Muallif bolaligini, ayvonni, rayhonli hovlilarni sog‘inadi — bular unga Vatanni anglatgan.',
        ],
        note: 'Xalq maqoli: «Qari bilganni pari bilmas». Keksalar — bir xazina.',
      },
      {
        title: 'Yangi so‘zlar (2.19)',
        text: 'Matndagi so‘zlarning izohi (bitta izoh ortiqcha edi):',
        table: {
          head: ['So‘z', 'Izohi'],
          rows: [
            ['ayvon', 'ikki-uch tomoni berk, oldi ochiq bino'],
            ['tanti', 'o‘zgalarga yordamini ayamaydigan, mard, ko‘ngli va qo‘li ochiq'],
            ['tiynat', 'insonga xos xarakter, fe’l-atvor'],
            ['kayvoni', 'yoshi ulug‘, ko‘pni ko‘rgan, ko‘p narsani biladigan'],
            ['qumg‘on', 'choy qaynatishga mo‘ljallangan dastali, qopqoqli idish'],
            ['oftoba', 'yuz-qo‘l yuvish uchun uzun jo‘mrakli idish'],
            ['hamsoya', 'yonma-yon hovlida yashovchi qo‘shni'],
            ['kor', 'biror maqsadda qilinadigan faoliyat, ish'],
            ['jigarpora', 'eng yaqin, bir tug‘ishgan qarindosh'],
          ],
        },
      },
      {
        title: 'Badiiy vositalar (2.20, 2.22)',
        text: 'Muallif oddiy gaplarni o‘xshatish va ko‘chma ma’noli so‘zlar bilan boyitgan.',
        table: {
          head: ['Oddiy gap', 'Matndagi badiiy shakli'],
          rows: [
            ['Momomning fe’li keng.', 'Fe’li ko‘ylagining etagidan keng momomning.'],
            ['Shoir juda hayajonli.', 'Qalbi olov shoir (qalb olovga o‘xshatilgan).'],
            ['Ayvon ustunlari mustahkam.', 'Arslon ustunlar — jasorat tiynati.'],
            ['Yalpiz ko‘p o‘sgan.', 'Yalpizlar bodroqdek sochilib yotadi.'],
          ],
        },
      },
      {
        title: 'Munozara (2.23–2.24)',
        text: 'Mavzulardan birini tanlab munozara o‘tkazing: nonni uvol qilmaslik, kattalarga hurmat, jonivorlar va o‘simliklarga ozor bermaslik, mehmondorchilik odobi.',
        table: {
          head: ['Baholash mezoni', 'Ball'],
          rows: [
            ['Mavzuni to‘g‘ri tushunish', '10'],
            ['Shaxsiy fikrni dalillar bilan asoslash', '10'],
            ['Adabiy talaffuz me’yorlariga amal qilish', '10'],
            ['Tana tilidan o‘rinli foydalanish', '10'],
            ['Mavzuga mos ohang', '10'],
            ['Munozara qoidalariga rioya qilish', '10'],
          ],
        },
        note: 'Fikrni aniq, qisqa va mavzudan chiqmay ayting; sinfdoshingiz fikrini bo‘lmang.',
      },
      {
        title: 'Savollar va uy vazifasi',
        text: 'Darslikdagi savollar:',
        list: [
          'Muallif kimning she’ridan foydalangan? She’riy satrlar nima maqsadda kiritilgan?',
          'Muallif ayvon ustunlarini nega jasorat tiynatiga o‘xshatgan?',
          'Sizda Vatan tuyg‘usi bilan bog‘liq qanday xotiralar bor?',
          'Ota-onangiz, bobo-buvilaringiz sizni qanday duo qilishadi?',
        ],
        note: 'Uy vazifasi (2.25): oilangizga xos «suvga tupurma», «nonni uvol qilma» kabi qoidalar ro‘yxatini tuzing va ularning tarbiyaga ta’siri haqida yozing.',
      },
    ],
    pairs: [
      ['ayvon', 'Oldi ochiq bino'],
      ['tanti', 'Mard, qo‘li ochiq'],
      ['tiynat', 'Fe’l-atvor'],
      ['kayvoni', 'Ko‘pni ko‘rgan keksa'],
      ['hamsoya', 'Qo‘shni'],
      ['jigarpora', 'Eng yaqin qarindosh'],
    ],
    quiz: [
      { q: 'Matn muallifi kim?', options: ['Faxriddin Hayit', 'Sirojiddin Sayyid', 'Anvar Boboyev', 'Qo‘chqor Norqobil'], answer: 0 },
      { q: 'Matndagi she’riy satrlar kimning she’ridan olingan?', options: ['Sirojiddin Sayyid', 'Abdulla Oripov', 'Erkin Vohidov', 'Alisher Navoiy'], answer: 0 },
      { q: '«Tanti» so‘zining ma’nosi nima?', options: ['mard, ko‘ngli va qo‘li ochiq', 'qo‘shni', 'choynak', 'keksa odam'], answer: 0 },
      { q: '«Qalbi olov shoir» birikmasida qalb nimaga o‘xshatilgan?', options: ['olovga', 'quyoshga', 'ayvonga', 'suvga'], answer: 0 },
      { q: 'Xalqimiz qaysi naqlni takrorlaydi?', options: ['Vatan ostonadan boshlanadi', 'Til bilgan el biladi', 'Toza havo — tanga davo', 'Ko‘p o‘qigan ko‘p biladi'], answer: 0 },
      { q: '«Hamsoya» kim?', options: ['qo‘shni', 'mehmon', 'o‘qituvchi', 'aka'], answer: 0 },
    ],
    sort: {
      categories: ['So‘z', 'O‘xshatish', 'Hayot saboqi'],
      items: [
        { text: 'kayvoni', cat: 0 }, { text: 'Fe’li ko‘ylagining etagidan keng', cat: 1 }, { text: 'Nonni uvol qilma', cat: 2 },
        { text: 'oftoba', cat: 0 }, { text: 'Yalpizlar bodroqdek sochilib yotadi', cat: 1 }, { text: 'Suvga tupurma', cat: 2 },
        { text: 'qumg‘on', cat: 0 }, { text: 'Qalbi olov shoir', cat: 1 }, { text: 'Qushlarga ozor berma', cat: 2 },
      ],
    },
    qa: [
      { q: 'Nega muallif ayvonni «darsxona» deb ataydi?', a: 'Ilk hayot saboqlarini — nasihat va odob qoidalarini shu ayvonda olgan.' },
      { q: 'Momoning «Shu qushga ham Vatan kerak» degan gapini izohlang.', a: 'Har bir jonzot o‘z uyiga, makoniga muhtoj; momo hatto qushlarga ham mehr bilan qaraydi.' },
      { q: '«Qari bilganni pari bilmas» maqolining ma’nosi nima?', a: 'Keksalar tajribasi bilan ko‘p narsani biladi, ular — bir xazina.' },
      { q: 'Matndan ikkita o‘xshatish toping.', a: 'Masalan: «xamirturush xamirni ko‘pchitganday», «yalpizlar bodroqdek sochilib yotadi».' },
      { q: 'Munozarada qanday qoidalarga amal qilish kerak?', a: 'Fikrni aniq, qisqa, mavzudan chiqmay aytish, boshqalarning fikrini bo‘lmaslik, hurmat saqlash.' },
    ],
  },

  /* ===================== 13 ===================== */
  {
    id: 'sinonimlar',
    source: 'II bob «Qadriyatlar» • 5-dars • 38–40-betlar',
    title: 'Ma’nodosh so‘zlar (sinonimlar)',
    short: 'So‘zlarda va qo‘shimchalarda ma’nodoshlik',
    lesson: [
      {
        title: 'Darsga kirish',
        text: '«Kunduz quyosh nuri bilan siylagan ayvonni tunda oy shu’lasi yoritadi» jumlasida «nur» va «shu’la» bir umumiy ma’noni anglatadi.',
        note: 'Topshiriq: «Bu diyorning ayvonlari nurga talosh» matnidan quyosh, yurt, xalq so‘zlarining ma’nodoshlarini toping (masalan: quyosh — oftob, yurt — diyor, xalq — el).',
      },
      {
        title: 'So‘zlarning ma’no va shakl munosabati',
        text: 'Tildagi so‘zlar bir-biri bilan ma’no yoki shakl jihatidan bog‘lanadi.',
        rule: 'So‘zlar ma’no munosabatiga ko‘ra ma’nodosh (sinonim), zid ma’noli (antonim), shakl munosabatiga ko‘ra shakldosh (omonim) va talaffuzdosh (paronim) so‘zlarga bo‘linadi.',
        table: {
          head: ['Turi', 'Misol'],
          rows: [
            ['Sinonim', 'yurt — vatan — diyor'],
            ['Antonim', 'katta — kichik'],
            ['Omonim', 'ot (hayvon) — ot (ism) — ot (otmoq)'],
            ['Paronim', 'asr — asir'],
          ],
        },
      },
      {
        title: 'Sinonimlar',
        text: 'Sinonimlar bir umumiy ma’noni ifodalovchi birliklardir.',
        examples: ['bajarmoq', 'bitirmoq', 'ado etmoq', 'o‘rinlatmoq', 'do‘ndirmoq', 'bajo qilmoq'],
        rule: 'Ma’nodosh so‘zlar bir umumiy ma’noni bildirsa-da, ma’no darajasi, ijobiy yoki salbiy bahoga egaligi, ma’lum uslubga xosligi bilan farq qiladi.',
      },
      {
        title: 'Sinonimlarning uslubiy farqi',
        text: 'Bir xil ma’noli so‘zlar turli nutq vaziyatiga mos keladi.',
        table: {
          head: ['So‘z', 'Qaysi uslubga xos'],
          rows: [
            ['ado etmoq, bajo qilmoq', 'ko‘proq badiiy uslub'],
            ['do‘ndirmoq', 'so‘zlashuv uslubi, ta’sirchanlik kuchli'],
            ['bajarmoq', 'umumiy, betaraf'],
          ],
        },
      },
      {
        title: 'Qo‘shimchalarda ma’nodoshlik',
        text: 'Faqat so‘zlar emas, qo‘shimchalar ham ma’nodosh bo‘ladi.',
        table: {
          head: ['Juftlik', 'Ma’nodosh qo‘shimchalar'],
          rows: [
            ['shirali — shirador', '-li / -dor'],
            ['itoatli — itoatkor', '-li / -kor'],
            ['behayo — hayosiz', 'be- / -siz'],
            ['o‘rinsiz — noo‘rin', '-siz / no-'],
            ['adabiyotchi — adabiyotshunos', '-chi / -shunos'],
          ],
        },
      },
      {
        title: 'Sinonimlarning ahamiyati',
        text: 'Bir so‘zni qayta-qayta takrorlash nutqni zerikarli qiladi.',
        rule: 'Sinonimlardan foydalanish nutqning rang-barangligini ta’minlashga, ta’sirchanligini oshirishga, tilning ifoda imkoniyatlarini namoyon etishga yordam beradi.',
      },
      {
        title: 'Ma’nodosh qatorlar (2.28)',
        text: 'Quyidagi qatorlar ishtirokida gap tuzing:',
        table: {
          head: ['Betaraf', 'Rasmiy / badiiy'],
          rows: [
            ['yemoq', 'iste’mol qilmoq, tanovul qilmoq'],
            ['kasal bo‘lmoq', 'tobi qochmoq, xastalanmoq'],
            ['kelmoq', 'tashrif buyurmoq, qadam ranjida qilmoq'],
          ],
        },
      },
      {
        title: 'Izohga mos so‘z (2.27)',
        text: 'Izohga mos keluvchi bitta so‘zni toping:',
        table: {
          head: ['Izoh', 'So‘z'],
          rows: [
            ['kuchli shamol', 'bo‘ron'],
            ['kuchli yomg‘ir', 'jala'],
            ['qisqa vaqt', 'lahza'],
            ['kitob o‘qimoq', 'mutolaa qilmoq'],
            ['kunchiqar tomon', 'sharq'],
            ['shuhrat qozongan', 'mashhur'],
          ],
        },
      },
      {
        title: 'Qo‘shimchani almashtirish (2.31)',
        text: 'So‘zdagi qo‘shimchani ma’nodoshi bilan almashtiring: -mand, -kash, -shunos, bo-, -kor, ser-, -dor, ham-.',
        table: {
          head: ['So‘z', 'Ma’nodosh shakl'],
          rows: [
            ['suvli', 'sersuv'],
            ['hunarli', 'hunarmand'],
            ['savlatli', 'savlatdor'],
            ['aravachi', 'aravakash'],
            ['tilchi', 'tilshunos'],
            ['xabardor', 'boxabar'],
            ['fikrdosh', 'hamfikr'],
            ['g‘allachi', 'g‘allakor'],
          ],
        },
        note: 'Uy vazifasi (2.32): hududingizdagi diqqatga sazovor joylar haqida taqdimotga tayyorlaning.',
      },
    ],
    pairs: [
      ['bajarmoq', 'ado etmoq'],
      ['kasal bo‘lmoq', 'xastalanmoq'],
      ['kelmoq', 'tashrif buyurmoq'],
      ['shirali', 'shirador'],
      ['behayo', 'hayosiz'],
      ['hunarli', 'hunarmand'],
    ],
    quiz: [
      { q: 'Sinonimlar qanday so‘zlar?', options: ['bir umumiy ma’noni ifodalovchi so‘zlar', 'zid ma’noli so‘zlar', 'shakli bir xil so‘zlar', 'talaffuzi yaqin so‘zlar'], answer: 0 },
      { q: '«Do‘ndirmoq» qaysi uslubga xos?', options: ['so‘zlashuv uslubiga', 'ilmiy uslubga', 'rasmiy uslubga', 'faqat she’riyatga'], answer: 0 },
      { q: '«Itoatli» so‘zining ma’nodosh qo‘shimchali shakli?', options: ['itoatkor', 'itoatsiz', 'beitoat', 'itoatchi'], answer: 0 },
      { q: '«Kuchli shamol» izohiga mos so‘z?', options: ['bo‘ron', 'jala', 'lahza', 'shabada'], answer: 0 },
      { q: 'Qaysi qatorda ma’nodosh so‘zlar berilgan?', options: ['yemoq, tanovul qilmoq, iste’mol qilmoq', 'katta, kichik, o‘rta', 'ot, ot, ot', 'asr, asir'], answer: 0 },
      { q: '«O‘rinsiz» so‘zining ma’nodoshi?', options: ['noo‘rin', 'o‘rinli', 'o‘rinbosar', 'bo‘sh o‘rin'], answer: 0 },
    ],
    sort: {
      categories: ['Sinonim', 'Antonim', 'Omonim'],
      items: [
        { text: 'yurt — diyor', cat: 0 }, { text: 'katta — kichik', cat: 1 }, { text: 'ot (hayvon) — ot (ism)', cat: 2 },
        { text: 'quyosh — oftob', cat: 0 }, { text: 'issiq — sovuq', cat: 1 }, { text: 'yoz (fasl) — yoz (yozmoq)', cat: 2 },
        { text: 'xalq — el', cat: 0 }, { text: 'yaxshi — yomon', cat: 1 }, { text: 'kun (quyosh) — kun (sutka)', cat: 2 },
      ],
    },
    qa: [
      { q: 'So‘zlar ma’no va shakl munosabatiga ko‘ra qanday turlarga bo‘linadi?', a: 'Sinonim, antonim (ma’no bo‘yicha), omonim va paronim (shakl bo‘yicha).' },
      { q: 'Ma’nodosh so‘zlar bir-biridan nimasi bilan farq qiladi?', a: 'Ma’no darajasi, ijobiy yoki salbiy bahosi va qaysi uslubga xosligi bilan.' },
      { q: '«Hunarli» va «aravachi» so‘zlarining ma’nodosh shaklini ayting.', a: 'Hunarmand, aravakash.' },
      { q: '«Kelmoq» so‘zining rasmiy-badiiy sinonimlarini ayting.', a: 'Tashrif buyurmoq, qadam ranjida qilmoq.' },
      { q: 'Sinonimlardan foydalanish nutqqa nima beradi?', a: 'Rang-baranglik, ta’sirchanlik va tilning ifoda imkoniyatlarini ko‘rsatadi.' },
    ],
  },

  /* ===================== 14 ===================== */
  {
    id: 'afisha',
    source: 'II bob «Qadriyatlar» • 6-dars • 41–42-betlar',
    title: 'Afisha: «Shahrim — faxrim»',
    short: 'Samarqand afishasi, ma’lumot tanlash, logotip',
    lesson: [
      {
        title: 'Afisha nima?',
        text: 'Afisha — biror joy, tadbir yoki xizmat haqida diqqatni tortadigan qisqa ma’lumot va tasvirlardan iborat e’lon. Uning maqsadi — o‘quvchini qiziqtirish va harakatga chorlash.',
        list: ['Diqqatni tortuvchi sarlavha', 'Rasm va ramz (logotip)', 'Eng muhim, qiziqarli ma’lumotlar', 'Chorlov jumlasi'],
      },
      {
        title: 'Samarqand afishasi (2.33)',
        text: 'Afisha sarlavhasi: «Shahrim — faxrim». Samarqand Buyuk ipak yo‘li chorrahasida joylashgan Sharqning qadimiy va abadiy durdonasi sifatida tanishtiriladi.',
        table: {
          head: ['Diqqatga sazovor joy', 'Afishadagi tavsif'],
          rows: [
            ['Registon maydoni', 'Ulug‘bek, Sherdor va Tillakori madrasalari, koshinkor bezaklar'],
            ['Bibixonim masjidi', 'Amir Temurning muhabbati va salobati ramzi, ulkan gumbazlar'],
            ['Shohi Zinda majmuasi', 'turfa koshinlar bilan bezatilgan maqbaralar'],
            ['Go‘ri Amir maqbarasi', 'Sohibqiron va uning avlodlari orom topgan joy'],
          ],
        },
        note: 'Yakuniy chorlov: «Bu yerga tashrif buyurib, ming yillik madaniyatning guvohiga aylaning!»',
      },
      {
        title: 'Afishaga qanday ma’lumot qo‘shiladi? (2.34)',
        text: 'Afishaga sayyohni qiziqtiradigan ma’lumotlar mos keladi. Quruq statistik va texnik ma’lumotlar afisha uchun tavsiya etilmaydi.',
        table: {
          head: ['Mos ma’lumot', 'Mos emas'],
          rows: [
            ['UNESCO umumjahon merosi ro‘yxatiga kiritilgan', 'Dengiz sathidan 695 m balandlikda'],
            ['Go‘ri Amir — XV asr me’morchiligi namunasi', 'Temir yo‘llar va trakt yo‘nalishlari'],
            ['Siyob bozori — qadimiy savdo markazi', 'Ariqlardan suv olishi'],
            ['Ulug‘bek rasadxonasi — noyob obida', 'Oylik harorat, maydon va aholi soni'],
          ],
        },
      },
      {
        title: 'Shahar ramzi (2.35)',
        text: 'Afishada Samarqand ramzi tasvirlangan. Ramz shaharning tarixi, me’morchiligi va o‘ziga xosligini bir qarashda eslatishi kerak.',
        note: 'Savol: afishadagi ramz qanday mazmunga ega? Unda nimalar aks etgan?',
      },
      {
        title: 'Logotip talablari (2.36)',
        text: 'Ramz (logotip) tayyorlashda quyidagi talablarga amal qilinadi. Ularni muhimlik darajasi bo‘yicha raqamlang:',
        list: [
          'Bir qarashda esda qolarli, o‘ta murakkab bo‘lmasligi',
          'Tanlangan joy yoki faoliyat bilan aloqadorligi',
          'Raqobatchilarnikidan keskin farq qilishi',
          'Zamonaviy dizaynga ega bo‘lishi',
          'Iste’molchilarning qadriyatlariga mos kelishi',
          'Brendning qadriyatlari, vazifasi va ustunligini ifodalashi',
        ],
      },
      {
        title: 'Diqqatni jalb etuvchi vositalar (2.37)',
        text: 'Afishada kishi diqqatini tortish uchun quyidagilardan foydalanilgan:',
        table: {
          head: ['Vosita', 'Misol'],
          rows: [
            ['Qisqa, ta’sirchan sarlavha', '«Shahrim — faxrim»'],
            ['Obrazli ifodalar', '«Sharqning qadimiy va abadiy durdonasi»'],
            ['Ikkinchi shaxsga murojaat', '«qalbingizni rom etadi», «sizni hayratga soladi»'],
            ['Chorlov jumlasi', '«...guvohiga aylaning!»'],
            ['Rasm va ramz', 'obidalar tasviri, shahar logotipi'],
          ],
        },
      },
    ],
    pairs: [
      ['Registon', 'Uchta madrasa majmuasi'],
      ['Bibixonim', 'Amir Temur muhabbati ramzi'],
      ['Shohi Zinda', 'Koshinli maqbaralar'],
      ['Go‘ri Amir', 'Sohibqiron maqbarasi'],
      ['Afisha', 'Diqqatni tortuvchi e’lon'],
      ['Logotip', 'Joy yoki brend ramzi'],
    ],
    quiz: [
      { q: 'Afishaning sarlavhasi qanday?', options: ['Shahrim — faxrim', 'Samarqand tarixi', 'Buyuk ipak yo‘li', 'Registon sirlari'], answer: 0 },
      { q: 'Registon maydonida qaysi madrasalar bor?', options: ['Ulug‘bek, Sherdor, Tillakori', 'Ko‘kaldosh, Mir Arab', 'Bibixonim, Shohi Zinda', 'Muhammad Aminxon'], answer: 0 },
      { q: 'Qaysi ma’lumot afishaga mos EMAS?', options: ['Shahar dengiz sathidan 695 m balandlikda', 'Samarqand — UNESCO merosi', 'Siyob bozori — qadimiy savdo markazi', 'Ulug‘bek rasadxonasi — noyob obida'], answer: 0 },
      { q: 'Go‘ri Amir qanday maskan?', options: ['Sohibqiron va avlodlari orom topgan maqbara', 'madrasa', 'bozor', 'rasadxona'], answer: 0 },
      { q: 'Logotipga qo‘yiladigan talablardan biri?', options: ['bir qarashda esda qolarli bo‘lishi', 'juda murakkab bo‘lishi', 'ko‘p matnli bo‘lishi', 'raqobatchinikiga o‘xshash bo‘lishi'], answer: 0 },
    ],
    sort: {
      categories: ['Afishaga mos', 'Afishaga mos emas'],
      items: [
        { text: 'UNESCO umumjahon merosi ro‘yxatida', cat: 0 }, { text: 'Dengiz sathidan 695 m balandlikda', cat: 1 },
        { text: 'Go‘ri Amir — XV asr obidasi', cat: 0 }, { text: 'Temir yo‘llari o‘tadi', cat: 1 },
        { text: 'Siyob bozori — qadimiy savdo markazi', cat: 0 }, { text: 'Ariqlardan suv oladi', cat: 1 },
        { text: 'Ulug‘bek rasadxonasi', cat: 0 }, { text: 'Iyulning o‘rtacha harorati 25,9 °C', cat: 1 },
      ],
    },
    qa: [
      { q: 'Afishada Samarqandning qaysi joylari aks etgan?', a: 'Registon maydoni, Bibixonim masjidi, Shohi Zinda majmuasi, Go‘ri Amir maqbarasi.' },
      { q: 'Nega harorat va aholi soni afishaga mos emas?', a: 'Bu quruq statistik ma’lumot, sayyohni qiziqtirmaydi va chorlamaydi.' },
      { q: 'Afishaning chorlov jumlasini ayting.', a: '«Bu yerga tashrif buyurib, ming yillik madaniyatning guvohiga aylaning!»' },
      { q: 'Yaxshi logotip qanday bo‘ladi?', a: 'Esda qolarli, sodda, joyga aloqador, boshqalardan farqli va zamonaviy.' },
      { q: 'Afishada diqqatni tortuvchi qanday vositalar bor?', a: 'Ta’sirchan sarlavha, obrazli ifodalar, murojaat, chorlov jumlasi, rasm va ramz.' },
    ],
  },

  /* ===================== 15 ===================== */
  {
    id: 'afisha-taqdimot',
    source: 'II bob «Qadriyatlar» • 7-dars • 43-bet',
    title: 'Afisha tayyorlash va taqdim etish',
    short: 'Afisha qoidalari, taqdimot va baholash mezonlari',
    lesson: [
      {
        title: 'Afisha tayyorlash qoidalari (2.38)',
        text: 'O‘zingiz yashayotgan hudud va undagi diqqatga sazovor joylar haqida afisha tayyorlang. Bunda quyidagi qoidalarga rioya qiling:',
        list: [
          'Hududdagi diqqatga sazovor joylar rasmini kiriting.',
          'Tanlangan hudud uchun maxsus ramz (logotip) o‘ylab toping.',
          'Tanlagan joyingiz haqidagi muhim ma’lumotlarni yozing.',
          'Chorlov mazmuniga ega jumlalardan foydalaning.',
        ],
      },
      {
        title: 'Afisha rejasi (namuna)',
        text: 'Afishani quyidagi tartibda tuzish qulay:',
        table: {
          head: ['Qism', 'Mazmuni'],
          rows: [
            ['Sarlavha', 'Qisqa va ta’sirchan: «Mening tumanim — mening g‘ururim»'],
            ['Kirish jumlasi', 'Hudud haqida bir gapda obrazli tavsif'],
            ['Asosiy qism', '3–4 ta diqqatga sazovor joy va ularning qisqa tavsifi'],
            ['Ramz', 'Hududni eslatuvchi sodda logotip'],
            ['Chorlov', '«Keling, ko‘ring, hayratlaning!»'],
          ],
        },
      },
      {
        title: 'Taqdimot qoidalari (2.40)',
        text: 'Uyda tayyorlagan afishangizni taqdim eting. Taqdimotda quyidagilarga amal qiling:',
        list: [
          'Taqdimotni yaratishdan maqsadingizni ayting.',
          'Har bir detalni izchillik bilan izohlang.',
          'Mavzuga mos ovoz va intonatsiyadan foydalaning.',
          'Adabiy talaffuz me’yorlariga amal qiling.',
          'Tana tili qoidalariga rioya qiling: ko‘z bilan aloqa, yuz ifodasi, imo-ishora, gavdani to‘g‘ri tutish.',
        ],
      },
      {
        title: 'Tana tili',
        text: 'Nutqda faqat so‘z emas, harakatlar ham ma’no tashiydi.',
        table: {
          head: ['Element', 'Nima qilish kerak'],
          rows: [
            ['Ko‘z bilan aloqa', 'Tinglovchilarga qarab gapirish'],
            ['Yuz ifodasi', 'Mavzuga mos: samimiy, ishonchli'],
            ['Imo-ishora', 'Fikrni ta’kidlash uchun me’yorida'],
            ['Gavda', 'Tik, erkin turish; orqa o‘girmaslik'],
          ],
        },
      },
      {
        title: 'Baholash mezonlari (2.41)',
        text: 'Sinfdoshingizning afishasi va nutqini quyidagi mezonlar asosida baholang:',
        table: {
          head: ['Mezon', 'Ball'],
          rows: [
            ['Mavzuni to‘g‘ri tushunish', '10'],
            ['Fikrni dalillar bilan asoslash', '10'],
            ['Adabiy talaffuz me’yorlari', '10'],
            ['Ma’lumotlarning muhimlik darajasi', '10'],
            ['Tana tilidan o‘rinli foydalanish', '10'],
            ['Mavzuga mos ohang', '10'],
            ['Logotipning mavjudligi va talabga mosligi', '10'],
            ['Diqqatni jalb etuvchi jumlalar', '10'],
          ],
        },
        note: 'Jami: 80 ball. Baholagach, sinfdoshingiz nutqiga qisqa munosabat bildiring.',
      },
    ],
    pairs: [
      ['Sarlavha', 'Afishaning qisqa nomi'],
      ['Logotip', 'Hudud ramzi'],
      ['Chorlov', 'Harakatga undovchi jumla'],
      ['Ko‘z bilan aloqa', 'Tinglovchiga qarab gapirish'],
      ['Intonatsiya', 'Ovoz ohangi'],
      ['Mezon', 'Baholash o‘lchovi'],
    ],
    quiz: [
      { q: 'Afishaga nimani albatta kiritish kerak?', options: ['diqqatga sazovor joylar rasmini', 'shahar aholisi ro‘yxatini', 'ob-havo jadvalini', 'temir yo‘l xaritasini'], answer: 0 },
      { q: 'Chorlov jumlasi qanday bo‘ladi?', options: ['harakatga undaydi', 'faqat raqam beradi', 'savol bilan tugaydi', 'tarixiy sanalardan iborat'], answer: 0 },
      { q: 'Tana tiliga nima kirmaydi?', options: ['imlo qoidasi', 'ko‘z bilan aloqa', 'yuz ifodasi', 'imo-ishora'], answer: 0 },
      { q: 'Baholash jadvalida nechta mezon bor?', options: ['8 ta', '4 ta', '6 ta', '10 ta'], answer: 0 },
      { q: 'Taqdimot boshida nima aytiladi?', options: ['taqdimotni yaratishdan maqsad', 'baholash natijasi', 'logotip narxi', 'boshqa o‘quvchilar xatosi'], answer: 0 },
    ],
    sort: {
      categories: ['Afisha qoidasi', 'Taqdimot qoidasi'],
      items: [
        { text: 'Diqqatga sazovor joy rasmini kiriting', cat: 0 }, { text: 'Maqsadingizni ayting', cat: 1 },
        { text: 'Maxsus ramz o‘ylab toping', cat: 0 }, { text: 'Adabiy talaffuzga amal qiling', cat: 1 },
        { text: 'Muhim ma’lumotlarni yozing', cat: 0 }, { text: 'Ko‘z bilan aloqa qiling', cat: 1 },
        { text: 'Chorlov jumlasidan foydalaning', cat: 0 }, { text: 'Mos intonatsiyadan foydalaning', cat: 1 },
      ],
    },
    qa: [
      { q: 'Afisha tayyorlashning to‘rt qoidasini ayting.', a: 'Joylar rasmi, maxsus logotip, muhim ma’lumotlar, chorlov jumlalari.' },
      { q: 'Tana tili nimalardan iborat?', a: 'Ko‘z bilan aloqa, yuz ifodasi, imo-ishora, gavdani to‘g‘ri tutish.' },
      { q: 'Hududingiz afishasi uchun sarlavha o‘ylab toping.', a: 'Erkin javob: masalan, «Mening tumanim — mening g‘ururim».' },
      { q: 'Nega taqdimotda adabiy talaffuz muhim?', a: 'Nutq tushunarli, madaniyatli bo‘ladi va tinglovchi fikrni to‘g‘ri qabul qiladi.' },
      { q: 'Afishani baholashda qaysi mezon logotipga tegishli?', a: '«Logotipning mavjudligi va uning talabga mosligi».' },
    ],
  },

  /* ===================== 16 ===================== */
  {
    id: 'kochirish-navoiy',
    source: 'II bob «Qadriyatlar» • 8-dars • 44–47-betlar',
    title: 'So‘zlarni ko‘chirish. Navoiy va insonparvarlik',
    short: 'Bo‘g‘in ko‘chirish qoidalari, «Hayrat ul-abror» haqida audiomatn',
    lesson: [
      {
        title: 'So‘zlarni ko‘chirish qoidalari (2.42)',
        text: 'Satrga sig‘magan so‘z keyingi satrga bo‘g‘inlab ko‘chiriladi.',
        list: [
          'So‘z bo‘g‘inga ajratib ko‘chiriladi: ki-tob, ma-dra-sa.',
          'Bitta harfni satr oxirida qoldirish ham, keyingi satrga ko‘chirish ham mumkin emas: a-badiy ✗, imora-t ✗.',
          'Tutuq belgisi (’) o‘zidan oldingi harf bilan qoladi: va’-da, mash’-al, e’-zoz.',
          'O‘, g‘, sh, ch, ng harf birikmalari bo‘linmaydi: o‘quv-chi.',
          'Qo‘shimchani ham bo‘g‘in bo‘yicha ko‘chirish mumkin: ozod-lik, uzum-lar.',
        ],
      },
      {
        title: 'Ko‘chirish namunalari (2.42)',
        text: 'Darslikdagi so‘zlarni ko‘chirish qoidalariga moslab yozamiz:',
        table: {
          head: ['So‘z', 'Ko‘chirish'],
          rows: [
            ['va’da, da’vo, ta’na', 'va’-da, da’-vo, ta’-na'],
            ['mas’ul, mash’al', 'mas’-ul, mash’-al'],
            ['ma’ruza, ma’rifat', 'ma’-ru-za, ma’-ri-fat'],
            ['diagramma', 'dia-gram-ma'],
            ['telegramma', 'te-le-gram-ma'],
            ['traktor', 'trak-tor'],
          ],
        },
      },
      {
        title: 'Qaysi biri to‘g‘ri? (2.43)',
        text: 'Bo‘g‘in ko‘chirish qoidalariga mos variantlar:',
        table: {
          head: ['Variantlar', 'To‘g‘risi'],
          rows: [
            ['a-badiy / aba-diy / abad-iy', 'aba-diy'],
            ['o-limdan / olim-dan / olimda-n', 'olim-dan'],
            ['mudofa-a / mu-dofaa / mudof-aa', 'mu-dofaa'],
            ['mat-baa / matba-a / ma-tbaa', 'mat-baa'],
            ['o‘-quvchi / o‘quv-chi / o‘q-uvchi', 'o‘quv-chi'],
            ['silin-drik / silindr-ik / silind-rik', 'silin-drik'],
            ['i-morat / imo-rat / imora-t', 'imo-rat'],
          ],
        },
      },
      {
        title: 'Audiomatn: insonparvarlik',
        text: '«Insonlarning dard-u tashvishlarini o‘ylab yashash — odamiylikning eng oliy mezoni» nomli audiomatn tinglanadi. Unda Alisher Navoiyning «Hayrat ul-abror» asaridagi komil inson va insonparvarlik g‘oyalari haqida so‘z boradi.',
        note: 'Avval sarlavhaga qarab, audiomatnda nima haqida so‘z borishini taxmin qiling (2.45).',
      },
      {
        title: 'Audiomatndagi so‘zlar (2.47)',
        text: 'So‘zlar va ularning izohi:',
        table: {
          head: ['So‘z', 'Izohi'],
          rows: [
            ['tamaddun', 'madaniyat'],
            ['muazzam', 'azim, ulkan, ulug‘vor'],
            ['xalqchil', 'xalq ruhi va madaniyatiga mos'],
            ['maxluqot', 'maxluqlar, jonivorlar'],
            ['shafoat', 'martabasi yuqori kishining qiynalganlarni qo‘llab-quvvatlashi'],
            ['gumrohlik', 'yo‘ldan ozish, adashganlik'],
            ['g‘aflat', 'hushyorlik butunlay yo‘qolgan holat'],
            ['aforizm', 'hikmatli so‘z'],
            ['munavvar', 'nurga to‘la, ravshan, yorqin'],
          ],
        },
      },
      {
        title: 'Navoiy baytlari (2.49)',
        text: 'Muallif fikrlarini Navoiy baytlari bilan dalillaydi:',
        table: {
          head: ['Bayt', 'Mazmuni'],
          rows: [
            ['«Kimki ulug‘roq — anga xizmat kerak, Ulki kichikroq — anga shafqat kerak.»', 'Kattaga xizmat va hurmat, kichikka mehr-shafqat'],
            ['«Boshni fido ayla ato qoshig‘a, Jismni qil sadqa ano boshig‘a.»', 'Ota-onaga jonini fido qilgudek xizmat qilish'],
            ['«Demonkim ko‘ngli pok-u ham ko‘zi pok, Tili pok-u so‘zi pok-u o‘zi pok.»', 'Komil inson — ko‘ngli, tili, so‘zi pok inson'],
          ],
        },
        note: 'Namuna gap: «Shoirning ushbu misralarida inson ota-onasiga mehribonlik bilan xizmat qilishi kerakligi alohida ta’kidlangan.»',
      },
      {
        title: 'Audiomatn yuzasidan savollar',
        text: 'Darslikdagi savollar:',
        list: [
          'Muallif insonparvarlik haqidagi fikrlarini kimning qaysi asari bilan dalillaydi?',
          'Insonning ota-onasiga, odamlarga munosabatida uning axloqiy go‘zalligi qanday namoyon bo‘ladi?',
          'Boylik yoki amal ilinjida ilm o‘rganishni gumrohlik deyishga qo‘shilasizmi?',
          '«Do‘stlik shafoati va sadoqati — juda ulug‘ tuyg‘u» iqtibosini izohlang.',
        ],
        note: 'Maqolada qaysi qadriyatlar haqida so‘z boradi: halollik, bag‘rikenglik, ota-onaga g‘amxo‘rlik, saxiylik, ilm olish...? (2.48)',
      },
      {
        title: 'Matn yaratish (2.52–2.53)',
        text: '«Do‘stlikning inson taqdiridagi o‘rni» mavzusida matn tuzing. Navoiyning do‘stlik haqidagi misralaridan foydalanishingiz mumkin.',
        examples: ['«Yor o‘lung bir-biringizgakim, erur yorlig‘ ish»', '«Umr degan yori vafodor emish»'],
        note: 'Lug‘at: yorlig‘ ish — mehr bog‘lash, ma’qullanadigan ish; xush — yaxshi odat.',
      },
      {
        title: 'Qo‘shimcha o‘qish: «Ertakning o‘tmishi»',
        text: 'Eshqobil Shukur «ertak» so‘zining kelib chiqishini tushuntiradi.',
        list: [
          'Qadimgi tilimizdagi «ert» so‘zi «o‘tmish, kechmish» ma’nosini bildirgan.',
          'Shundan «o‘tmish haqida og‘izdan og‘izga o‘tib kelayotgan hikoya» — ertak so‘zi paydo bo‘lgan.',
          '«Erta» so‘zi «avval» ma’nosida ham qo‘llanadi: erta bahor — bahorning boshi.',
          'Ertaklar ham ko‘pincha «avval o‘tgan zamonda...» deb boshlanadi.',
        ],
      },
    ],
    pairs: [
      ['va’da', 'va’-da'],
      ['abadiy', 'aba-diy'],
      ['imorat', 'imo-rat'],
      ['o‘quvchi', 'o‘quv-chi'],
      ['tamaddun', 'madaniyat'],
      ['aforizm', 'hikmatli so‘z'],
    ],
    quiz: [
      { q: '«Abadiy» so‘zining qaysi ko‘chirilishi to‘g‘ri?', options: ['aba-diy', 'a-badiy', 'abad-iy', 'abadi-y'], answer: 0 },
      { q: '«O‘quvchi» so‘zining qaysi ko‘chirilishi to‘g‘ri?', options: ['o‘quv-chi', 'o‘-quvchi', 'o‘q-uvchi', 'o‘quvc-hi'], answer: 0 },
      { q: '«Va’da» so‘zi qanday ko‘chiriladi?', options: ['va’-da', 'va-’da', 'v-a’da', 'va’d-a'], answer: 0 },
      { q: 'Audiomatnda Navoiyning qaysi asari haqida so‘z boradi?', options: ['«Hayrat ul-abror»', '«Farhod va Shirin»', '«Mahbub ul-qulub»', '«Lison ut-tayr»'], answer: 0 },
      { q: '«Gumrohlik» so‘zining ma’nosi?', options: ['yo‘ldan ozish, adashganlik', 'hushyorlik', 'madaniyat', 'yorqinlik'], answer: 0 },
      { q: '«Ertak» so‘zi qaysi qadimgi so‘zdan kelib chiqqan?', options: ['ert — o‘tmish, kechmish', 'er — erkak', 'yer — zamin', 'erk — ozodlik'], answer: 0 },
    ],
    sort: {
      categories: ['To‘g‘ri ko‘chirilgan', 'Xato ko‘chirilgan'],
      items: [
        { text: 'olim-dan', cat: 0 }, { text: 'o-limdan', cat: 1 },
        { text: 'uzuk-lar', cat: 0 }, { text: 'u-zuklar', cat: 1 },
        { text: 'mat-baa', cat: 0 }, { text: 'matba-a', cat: 1 },
        { text: 'silin-drik', cat: 0 }, { text: 'silindr-ik', cat: 1 },
        { text: 'imo-rat', cat: 0 }, { text: 'i-morat', cat: 1 },
      ],
    },
    qa: [
      { q: 'So‘zni ko‘chirishning asosiy qoidasi nima?', a: 'Bo‘g‘inlab ko‘chiriladi, bitta harf satrda qoldirilmaydi va ko‘chirilmaydi.' },
      { q: 'Tutuq belgisi ko‘chirishda qayerda qoladi?', a: 'O‘zidan oldingi harf bilan birga: ma’-ru-za.' },
      { q: '«Kimki ulug‘roq — anga xizmat kerak» baytining mazmuni nima?', a: 'Kattalarga xizmat va hurmat ko‘rsatish, kichiklarga shafqat qilish kerak.' },
      { q: '«Munavvar» so‘zining ma’nosini ayting.', a: 'Nur bilan yoritilgan, ravshan, yorqin.' },
      { q: '«Erta bahor» birikmasida «erta» qanday ma’noda?', a: '«Avval, boshi» ma’nosida — bahorning boshi.' },
    ],
  },

  /* ===================== 17 ===================== */
  {
    id: 'soz-tuzi',
    source: 'III bob «Til tilsimi» • 1-dars • 49–51-betlar',
    title: '«So‘zning tuzi nimada?» So‘zning tuzilishi',
    short: 'Nutqdagi xatolar; sodda, qo‘shma, juft, takroriy so‘zlar',
    lesson: [
      {
        title: 'Darsga kirish',
        text: 'Yangi bob — «Til tilsimi». Birinchi darsda so‘zni to‘g‘ri qo‘llash madaniyati haqida bahs yuritiladi.',
        list: [
          '«So‘z qo‘llashda no‘noqlik» deganda nimani tushunasiz?',
          'So‘zdan noto‘g‘ri foydalanganingiz uchun tanbeh eshitganmisiz?',
          'Jumlalarni to‘g‘ri tuza olmaslikning asosiy sababi nimada?',
        ],
      },
      {
        title: 'Matn: so‘z qudrati',
        text: 'Anvar Boboyevning «So‘zning tuzi nimada?» maqolasida so‘zning kuchi va ommaviy axborot vositalaridagi xatolar haqida yoziladi.',
        list: [
          'Abdulla Qahhorning «Adabiyot atomdan kuchli» degan gapi so‘z qudratiga ishora.',
          'Xalq naqli: «So‘z bilan ilon inidan, pichoq qinidan chiqadi».',
          'Bir og‘iz gap odamni g‘azablantirishi ham, tinchlantirishi ham mumkin.',
          'Nonni yerdan olib, o‘pib, ko‘zga surtamiz — tilni ham shunday e’zozlash kerak.',
        ],
      },
      {
        title: 'Matndagi xatolar (1): «har» so‘zi',
        text: 'Muallif eng ko‘p uchraydigan jiddiy xato — «har» so‘zini noo‘rin ishlatish ekanini aytadi.',
        table: {
          head: ['Xato', 'To‘g‘ri'],
          rows: [
            ['har bir prezidentning farmoni', 'prezidentning har bir farmoni'],
            ['to‘rtta prezidentning qarori', 'prezidentning to‘rtta qarori'],
            ['har ikkisi', 'ikkovi / har biri'],
            ['haftaning har payshanba kuni', 'har payshanba'],
          ],
        },
      },
      {
        title: 'Matndagi xatolar (2): qo‘shimchalar',
        text: 'Ortiqcha yoki noto‘g‘ri qo‘shimchalar nutqni g‘aliz qiladi.',
        table: {
          head: ['Xato', 'To‘g‘ri', 'Izoh'],
          rows: [
            ['ilm egallashga bo‘lgan intilish', 'ilm egallashga intilish', 'ortiqcha «bo‘lgan»'],
            ['borganliklari, borishlik', 'borgani, borish', 'ortiqcha -lik'],
            ['O‘nta talaba keldilar.', 'O‘nta talaba keldi.', 'sondan keyin -lar shart emas'],
            ['bejizga, hozirda', 'bejiz, hozir', 'ortiqcha qo‘shimcha'],
            ['haqiqatdan', 'haqiqatan', 'ma’nan, jismonan kabi'],
            ['barchalarimiz', 'hammamiz', '«barcha»ga -lar qo‘shilmaydi'],
            ['o‘qinilgan, aytinilgan', 'o‘qilgan, aytilgan', 'majhul nisbat xatosi'],
            ['ilojisi yo‘q', 'iloji yo‘q', 'ortiqcha -si'],
          ],
        },
        note: '«Iliq» va «issiq» farqi: issiqlik daraja bilan o‘lchanadi, «iliq» esa nisbiy tushuncha — daraja bilan belgilanmaydi.',
      },
      {
        title: 'Iboralar (3.1)',
        text: 'Matndagi iboralar va ularning izohi:',
        table: {
          head: ['Ibora', 'Ma’nosi'],
          rows: [
            ['rasm bo‘lmoq', 'odat hukmiga kirmoq, odatga aylanmoq'],
            ['quyushqondan chiqarmoq', 'chegaradan, me’yordan chiqarmoq'],
            ['ensasi qotmoq', 'yoqimsiz gapdan achchiqlanmoq, g‘ashi kelmoq'],
            ['yerga urmoq', 'ortiq darajada kamsitmoq'],
            ['farosati oqsamoq', 'tez va to‘g‘ri fahmlay olmaslik'],
          ],
        },
      },
      {
        title: 'Asosiy va yordamchi fikr (3.2)',
        text: 'Matndagi fikrlarni ajrating:',
        table: {
          head: ['Fikr', 'Turi'],
          rows: [
            ['Til qoidalariga, tabiatiga amal qilmaslik unga nisbatan hurmatsizlikdir.', 'Asosiy fikr'],
            ['Ommaviy axborot vositalarida tilni buzib ishlatish mumkin emas.', 'Asosiy fikr'],
            ['Odamlar nonni tabarruk bilib, e’zozlaydi.', 'Yordamchi fikr'],
            ['Inson adashib shirk keltirib qo‘yishi mumkin.', 'Yordamchi fikr'],
            ['Fizikada issiqlik va sovuqlik aniq farqlanadi.', 'Yordamchi fikr'],
          ],
        },
      },
      {
        title: 'So‘zlarning tuzilishiga ko‘ra turlari',
        text: 'Tuzilishiga ko‘ra so‘zlar to‘rt turga bo‘linadi:',
        table: {
          head: ['Turi', 'Tuzilishi', 'Misol'],
          rows: [
            ['Sodda so‘z', 'bitta asosdan iborat (qo‘shimcha olishi mumkin)', 'keltirmoq, tinchlantirmoq'],
            ['Qo‘shma so‘z', 'ikki asos birikib, bir ma’no bildiradi', 'shumxabar, hech kim, har xil'],
            ['Juft so‘z', 'ikki so‘z juftlashadi, chiziqcha bilan yoziladi', 'ob-havo, gazeta-jurnal, bo‘lar-bo‘lmas'],
            ['Takroriy so‘z', 'bir so‘z takrorlanadi', 'kunda-kunora, shirin-shirin'],
          ],
        },
      },
      {
        title: 'So‘z yasash mashqi (3.4)',
        text: 'Berilgan so‘zlardan qo‘shma, juft va takroriy so‘z yasang. Namuna: shirin.',
        table: {
          head: ['So‘z turi', 'Namuna'],
          rows: [
            ['Qo‘shma so‘z', 'shirinso‘z'],
            ['Juft so‘z', 'shirin-achchiq'],
            ['Takroriy so‘z', 'shirin-shirin'],
            ['Gap', 'Bu kuy sizni bolalikning shirin xotiralariga qaytaradi.'],
          ],
        },
        note: 'Davom ettiring: qo‘shni, qiyshiq, ravon, biyron, kelmoq, yozmoq, qaymoq.',
      },
    ],
    pairs: [
      ['rasm bo‘lmoq', 'Odatga aylanmoq'],
      ['quyushqondan chiqarmoq', 'Me’yordan chiqarmoq'],
      ['ensasi qotmoq', 'G‘ashi kelmoq'],
      ['yerga urmoq', 'Ortiq kamsitmoq'],
      ['farosati oqsamoq', 'Tez fahmlay olmaslik'],
      ['har ikkisi', 'ikkovi'],
    ],
    quiz: [
      { q: 'Maqola muallifi kim?', options: ['Anvar Boboyev', 'Abdulla Qahhor', 'Faxriddin Hayit', 'Eshqobil Shukur'], answer: 0 },
      { q: 'Qaysi jumla to‘g‘ri?', options: ['O‘nta talaba keldi.', 'O‘nta talaba keldilar.', 'O‘nta talabalar keldi.', 'O‘nta talabalar keldilar.'], answer: 0 },
      { q: '«Har bir prezidentning farmoni» birikmasining to‘g‘ri shakli?', options: ['prezidentning har bir farmoni', 'har prezident farmoni', 'har bir prezidentlar farmoni', 'prezidentlarning har farmoni'], answer: 0 },
      { q: '«Ob-havo» qanday so‘z?', options: ['juft so‘z', 'sodda so‘z', 'qo‘shma so‘z', 'takroriy so‘z'], answer: 0 },
      { q: '«Kunda-kunora» qanday so‘z?', options: ['takroriy so‘z', 'juft so‘z', 'qo‘shma so‘z', 'sodda so‘z'], answer: 0 },
      { q: '«Ensasi qotmoq» iborasining ma’nosi?', options: ['g‘ashi kelmoq', 'xursand bo‘lmoq', 'charchamoq', 'uxlamoq'], answer: 0 },
    ],
    sort: {
      categories: ['Qo‘shma so‘z', 'Juft so‘z', 'Takroriy so‘z'],
      items: [
        { text: 'shumxabar', cat: 0 }, { text: 'ob-havo', cat: 1 }, { text: 'kunda-kunora', cat: 2 },
        { text: 'hech kim', cat: 0 }, { text: 'gazeta-jurnal', cat: 1 }, { text: 'shirin-shirin', cat: 2 },
        { text: 'shirinso‘z', cat: 0 }, { text: 'bo‘lar-bo‘lmas', cat: 1 }, { text: 'ravon-ravon', cat: 2 },
      ],
    },
    qa: [
      { q: '«So‘z bilan ilon inidan, pichoq qinidan chiqadi» naqlining ma’nosi nima?', a: 'So‘z juda katta kuchga ega: yaxshi so‘z bilan hamma ishni hal qilish mumkin.' },
      { q: '«Barchalarimiz» so‘zini to‘g‘rilang.', a: '«Hammamiz» yoki «barchamiz».' },
      { q: '«O‘qinilgan» so‘zi nega xato?', a: '«O‘qimoq»ning majhul nisbati — «o‘qilmoq»; «o‘qinilmoq» degan fe’l yo‘q.' },
      { q: 'Juft va takroriy so‘zning farqi nima?', a: 'Juft so‘zda ikki xil so‘z juftlashadi (ob-havo), takroriyda bir so‘z takrorlanadi (shirin-shirin).' },
      { q: 'Muallifning asosiy maqsadi nima?', a: 'Tilni buzib ishlatmaslikka, ona tiliga hurmat bilan munosabatda bo‘lishga chaqirish.' },
    ],
  },

  /* ===================== 18 ===================== */
  {
    id: 'uslubiy-galizlik',
    source: 'III bob «Til tilsimi» • 2-dars • 52–53-betlar',
    title: 'Uslubiy g‘alizlik va gapni to‘g‘ri tuzish',
    short: 'So‘z tartibi, «Til posboni», tahrir',
    lesson: [
      {
        title: 'Sarlavha va muallif maqsadi (3.5)',
        text: '«So‘zning tuzi nimada?» sarlavhasi taom tuzsiz bemaza bo‘lgani kabi so‘z ham o‘z o‘rnida, to‘g‘ri qo‘llanmasa, ta’sirini yo‘qotishini anglatadi.',
        list: [
          'Muallif OAVdagi qo‘pol xatolarni nega keltirgan?',
          '«Savodsizlik adabga aylanib boryapti» deyish orqali nimani ta’kidlamoqchi?',
          'Matnga yana qanday sarlavha qo‘yish mumkin?',
        ],
      },
      {
        title: '«Til posboni» (3.6)',
        text: 'Ko‘cha yozuvlari, reklama bannerlari va ommaviy axborot vositalarida o‘zbek tili qoidalari qo‘pol buzilgan o‘rinlarni toping.',
        list: ['Xatolar ro‘yxatini tuzing.', 'Har bir xatoning to‘g‘ri shaklini yozing.', 'Tavsiyalaringizni bildiring.'],
      },
      {
        title: 'Uslubiy g‘alizlik',
        text: 'So‘zni gapda o‘z o‘rnida ishlatmaslik ma’noni buzadi.',
        rule: 'Gapda so‘zni o‘z o‘rnida qo‘llay olmaslik uslubiy g‘alizlikni keltirib chiqaradi.',
        table: {
          head: ['G‘aliz', 'Ravon'],
          rows: [['Rahbarning qarorlari qanday ichki muhitga ta’sir ko‘rsatmoqda?', 'Rahbarning qarorlari ichki muhitga qanday ta’sir ko‘rsatmoqda?']],
        },
        note: 'Savol so‘zi (qanday) o‘zi bog‘langan so‘z (ta’sir ko‘rsatmoq) yonida turishi kerak.',
      },
      {
        title: 'Xatolarni aniqlash (3.7)',
        text: 'Gaplarda so‘z noto‘g‘ri joylashgani uchun ma’no buzilgan:',
        table: {
          head: ['Xato', 'To‘g‘ri'],
          rows: [
            ['Parazitlar bilan qanday uy sharoitida kurashish mumkin?', 'Parazitlar bilan uy sharoitida qanday kurashish mumkin?'],
            ['Hujjatsiz binoni qurish noqonuniy hisoblanadi.', 'Binoni hujjatsiz qurish noqonuniy hisoblanadi.'],
          ],
        },
      },
      {
        title: 'To‘g‘ri va noto‘g‘ri gaplar (3.8)',
        text: 'Jadvaldagi jumlalarni tahlil qilamiz:',
        table: {
          head: ['Jumla', 'Baho', 'To‘g‘ri shakli'],
          rows: [
            ['Dars berishda qanday o‘qitish metodlaridan foydalanmoqdasiz?', 'noto‘g‘ri', 'o‘qitishning qanday metodlaridan'],
            ['Futbolda uchta darvozabonning xatosi qimmatga tushdi.', 'noto‘g‘ri', 'darvozabonning uchta xatosi'],
            ['Bu o‘zgarishlar jadal iqtisodiyotga ta’sir qilishi mumkin.', 'noto‘g‘ri', 'iqtisodiyotga jadal ta’sir qilishi'],
            ['Ularning xatti-harakatlari qanday voqealar rivojiga hissa qo‘shmoqda?', 'noto‘g‘ri', 'voqealar rivojiga qanday hissa'],
            ['Jamoaga har bir raisning gapi malol kelmas edi.', 'noto‘g‘ri', 'raisning har bir gapi'],
            ['Mahalla raisi kim nima deganini birma-bir so‘rab chiqdi.', 'to‘g‘ri', '—'],
          ],
        },
      },
      {
        title: 'Tahrir (3.9)',
        text: 'Jumlalardagi xatolarni to‘g‘rilaymiz:',
        table: {
          head: ['Xato', 'To‘g‘ri'],
          rows: [
            ['Diplomsiz maktabda dars berish taqiqlangan.', 'Maktabda diplomsiz dars berish taqiqlangan.'],
            ['Bu yerda ruxsatsiz mahsulotlarni sotish qonunbuzarlik.', 'Bu yerda mahsulotlarni ruxsatsiz sotish qonunbuzarlik.'],
            ['To‘rtta kengashning qarori bajarilmay qolgan edi.', 'Kengashning to‘rtta qarori bajarilmay qolgan edi.'],
            ['O‘n beshta mehmonlar keldi.', 'O‘n beshta mehmon keldi.'],
            ['...bajarishning ilojisi yo‘q.', '...bajarishning iloji yo‘q.'],
          ],
        },
      },
      {
        title: 'Yozma ishlar (3.10–3.11)',
        text: 'Ijodiy topshiriqlar:',
        list: [
          '«Muharrirlar — matnni tahrir qiluvchilar» deganda kimlarni tushunasiz? Ularning sifatlari haqida bir xatboshili matn tuzing.',
          'Ona tilini yaxshi bilishning boshqa fanlarni o‘zlashtirishga ta’siri haqida ommabop matn tuzing.',
        ],
      },
    ],
    pairs: [
      ['har bir raisning gapi', 'raisning har bir gapi'],
      ['uchta darvozabonning xatosi', 'darvozabonning uchta xatosi'],
      ['hujjatsiz binoni qurish', 'binoni hujjatsiz qurish'],
      ['o‘n beshta mehmonlar', 'o‘n beshta mehmon'],
      ['ilojisi yo‘q', 'iloji yo‘q'],
      ['qanday ichki muhitga', 'ichki muhitga qanday'],
    ],
    quiz: [
      { q: 'Uslubiy g‘alizlik nimadan kelib chiqadi?', options: ['so‘zni gapda o‘z o‘rnida qo‘llay olmaslikdan', 'imlo xatosidan', 'tinish belgisidan', 'chet so‘zdan'], answer: 0 },
      { q: 'Qaysi gap ravon tuzilgan?', options: ['Rahbarning qarorlari ichki muhitga qanday ta’sir ko‘rsatmoqda?', 'Rahbarning qarorlari qanday ichki muhitga ta’sir ko‘rsatmoqda?', 'Qanday rahbarning qarorlari ichki muhitga ta’sir ko‘rsatmoqda?', 'Rahbarning qanday qarorlari ichki muhitga ta’sir?'], answer: 0 },
      { q: 'Qaysi jumla to‘g‘ri?', options: ['Mahalla raisi kim nima deganini birma-bir so‘rab chiqdi.', 'Jamoaga har bir raisning gapi malol kelmas edi.', 'Futbolda uchta darvozabonning xatosi qimmatga tushdi.', 'Bu o‘zgarishlar jadal iqtisodiyotga ta’sir qiladi.'], answer: 0 },
      { q: '«O‘n beshta mehmonlar keldi» gapidagi xato?', options: ['sondan keyin -lar ortiqcha', 'fe’l noto‘g‘ri', 'tinish belgisi yo‘q', 'xato yo‘q'], answer: 0 },
      { q: '«Diplomsiz maktabda dars berish taqiqlangan» gapining to‘g‘ri shakli?', options: ['Maktabda diplomsiz dars berish taqiqlangan.', 'Diplomsiz maktabda dars bermoq taqiqlangan.', 'Maktab diplomsiz dars berish taqiqlangan.', 'Dars berish diplomsiz maktabda taqiqlangan.'], answer: 0 },
    ],
    sort: {
      categories: ['To‘g‘ri tuzilgan', 'G‘aliz'],
      items: [
        { text: 'Binoni hujjatsiz qurish noqonuniy.', cat: 0 }, { text: 'Hujjatsiz binoni qurish noqonuniy.', cat: 1 },
        { text: 'Raisning har bir gapi malol kelmasdi.', cat: 0 }, { text: 'Har bir raisning gapi malol kelmasdi.', cat: 1 },
        { text: 'Kengashning to‘rtta qarori bajarilmadi.', cat: 0 }, { text: 'To‘rtta kengashning qarori bajarilmadi.', cat: 1 },
        { text: 'O‘n beshta mehmon keldi.', cat: 0 }, { text: 'O‘n beshta mehmonlar keldi.', cat: 1 },
      ],
    },
    qa: [
      { q: 'Uslubiy g‘alizlik nima?', a: 'Gapda so‘zni o‘z o‘rnida qo‘llay olmaslik natijasida ma’noning buzilishi.' },
      { q: '«Hujjatsiz binoni qurish» birikmasidagi xato nimada?', a: '«Hujjatsiz» binoga emas, qurishga tegishli: «binoni hujjatsiz qurish».' },
      { q: '«Uchta darvozabonning xatosi» birikmasini tuzating.', a: '«Darvozabonning uchta xatosi».' },
      { q: '«Til posboni» topshirig‘ida nima qilinadi?', a: 'Ko‘cha yozuvlari, reklama va OAVdagi til xatolarini topib, to‘g‘risini va tavsiyalarni yozish.' },
      { q: 'Nega sarlavha «So‘zning tuzi nimada?» deb nomlangan?', a: 'Tuzsiz taom bemaza bo‘lganidek, noto‘g‘ri ishlatilgan so‘z ham ta’sirini yo‘qotadi.' },
    ],
  },

  /* ===================== 19 ===================== */
  {
    id: 'suniy-tillar',
    source: 'III bob «Til tilsimi» • 3-dars • 53–55-betlar',
    title: 'Dunyo tillari va sun’iy tillar',
    short: 'Tillar xilma-xilligi, sun’iy tillar, til turlari',
    lesson: [
      {
        title: 'Darsga kirish: nega tillar ko‘p? (3.12)',
        text: 'Temur va Oydinoy suhbatlashadi: «Dunyoda nega tillar soni ko‘p? Nima uchun insonlar bitta tilda gaplashishmaydi?»',
        list: [
          'Xalqlar turli hududlarda, alohida-alohida rivojlangan.',
          'Har bir xalqning tarixi, turmush tarzi va madaniyati o‘ziga xos.',
          'Til vaqt o‘tishi bilan o‘zgaradi: bir tildan bir necha til paydo bo‘ladi.',
        ],
        note: 'Siz qanday deb o‘ylaysiz? Temur va Oydinoyning savoliga javob bering.',
      },
      {
        title: 'Audiomatn: «Sun’iy tillar» (3.13)',
        text: 'Sun’iy til — tabiiy ravishda shakllanmagan, balki odamlar tomonidan ataylab yaratilgan til. Globallashuv kuchaygan sari barcha uchun umumiy yordamchi til yaratishga intilish ham kuchaygan.',
        note: 'Audiomatn darslikdagi QR kod orqali tinglanadi.',
      },
      {
        title: 'Mashhur sun’iy tillar',
        text: 'Audiomatnda tilga olingan sun’iy tillar:',
        table: {
          head: ['Til', 'Qisqacha'],
          rows: [
            ['Solresol', 'musiqa notalari (do, re, mi, fa, sol, lya, si) asosida yaratilgan'],
            ['Volapyuk', 'XIX asr oxirida nemis ruhoniysi I. M. Shleyer yaratgan'],
            ['Esperanto', '1887-yilda L. Zamenhof yaratgan; nomi «umid qiluvchi, umidvor» degani'],
          ],
        },
        rule: 'Bu tillarning umumiy maqsadi — ommaviy yordamchi til yaratish edi.',
      },
      {
        title: 'Nega ko‘p loyihalar muvaffaqiyatsiz bo‘lgan?',
        text: 'Universal glot, oksidental, noval, interlingva kabi ko‘plab sun’iy til loyihalari keng tarqalmagan.',
        list: [
          'Tabiiy tilning tarixi, madaniyati va jonli so‘zlashuvchilari bo‘ladi, sun’iy tilda bular yo‘q.',
          'Ayrim sun’iy tillar faqat bir guruh tillarga asoslangan.',
          'Ishlatilgan sari ularning sun’iyligi sezilib boravergan.',
        ],
      },
      {
        title: 'Til turlari (3.15)',
        text: 'Til jamiyatda turli vazifalarni bajaradi:',
        table: {
          head: ['Atama', 'Izohi'],
          rows: [
            ['Sun’iy til', 'umumiy, tabiiy tillarning o‘rinbosari sifatida qo‘llanadigan yordamchi til'],
            ['Dunyo tili', 'geografik jihatdan keng tarqalgan, turli jamoalar muloqotda foydalanadigan til'],
            ['Milliy til', 'muayyan xalqning umumiy o‘zaro aloqa vositasi'],
            ['Davlat tili', 'muayyan mamlakatda ish yuritish uchun rasmiy belgilangan til'],
          ],
        },
        note: 'Ortiqcha izoh: «insonlarning ona tili bo‘lmagan, o‘rganiladigan boshqa xalq tili» — bu chet tili.',
      },
      {
        title: 'Audiomatn bo‘yicha topshiriqlar (3.14, 3.16)',
        text: 'Savollarga javob bering:',
        list: [
          'Nima uchun sun’iy til yaratishga intilish kuchaygan?',
          'Solresol, esperanto va volapyuk uchun umumiy jihat nimada?',
          'Qaysi sun’iy til nomi «umidvor» ma’nosini beradi?',
          'Audiomatnning maqsadi nima va u kimlar uchun mo‘ljallangan? Javobingizni matndan dalillang.',
        ],
      },
    ],
    pairs: [
      ['Solresol', 'Musiqa notalari asosida'],
      ['Esperanto', '«Umidvor» degan nom'],
      ['Sun’iy til', 'Ataylab yaratilgan til'],
      ['Dunyo tili', 'Keng tarqalgan til'],
      ['Milliy til', 'Xalqning aloqa vositasi'],
      ['Davlat tili', 'Rasmiy ish yuritish tili'],
    ],
    quiz: [
      { q: 'Qaysi sun’iy til nomi «umidvor» ma’nosini beradi?', options: ['Esperanto', 'Solresol', 'Volapyuk', 'Interlingva'], answer: 0 },
      { q: 'Solresol nimaga asoslangan?', options: ['musiqa notalariga', 'raqamlarga', 'lotin tiliga', 'rasmlarga'], answer: 0 },
      { q: 'Sun’iy til yaratishga intilish nima sababdan kuchaygan?', options: ['globallashuv kuchaygani uchun', 'iqlim o‘zgargani uchun', 'aholi kamaygani uchun', 'kitoblar ko‘paygani uchun'], answer: 0 },
      { q: 'Muayyan mamlakatda ish yuritish uchun rasmiy belgilangan til?', options: ['davlat tili', 'sun’iy til', 'dunyo tili', 'chet tili'], answer: 0 },
      { q: 'Solresol, volapyuk va esperantoning umumiy maqsadi?', options: ['ommaviy yordamchi til yaratish', 'faqat she’r yozish', 'yashirin xabar almashish', 'bitta millat tilini almashtirish'], answer: 0 },
    ],
    sort: {
      categories: ['Sun’iy til', 'Tabiiy til'],
      items: [
        { text: 'esperanto', cat: 0 }, { text: 'o‘zbek tili', cat: 1 },
        { text: 'volapyuk', cat: 0 }, { text: 'ingliz tili', cat: 1 },
        { text: 'solresol', cat: 0 }, { text: 'arab tili', cat: 1 },
        { text: 'interlingva', cat: 0 }, { text: 'xitoy tili', cat: 1 },
      ],
    },
    qa: [
      { q: 'Nega dunyoda tillar soni ko‘p?', a: 'Xalqlar turli hududlarda alohida rivojlangan, tarixi va madaniyati turlicha; tillar vaqt o‘tishi bilan o‘zgaradi.' },
      { q: 'Sun’iy til nima?', a: 'Odamlar tomonidan ataylab yaratilgan, umumiy yordamchi til sifatida mo‘ljallangan til.' },
      { q: 'Milliy til va davlat tilining farqi nima?', a: 'Milliy til — xalqning aloqa vositasi; davlat tili — mamlakatda ish yuritish uchun rasmiy belgilangan til.' },
      { q: 'Esperantoni kim va qachon yaratgan?', a: 'Lazar Zamenhof, 1887-yilda.' },
      { q: 'Nega ko‘p sun’iy tillar keng tarqalmagan?', a: 'Ularning jonli so‘zlashuvchilari, tarixi va madaniyati yo‘q; ishlatilgan sari sun’iyligi sezilgan.' },
    ],
  },

  /* ===================== 20 ===================== */
  {
    id: 'umumlashtiruvchi',
    source: 'III bob «Til tilsimi» • 4-dars • 55-bet',
    title: 'Umumlashtiruvchi so‘z va tinish belgilari',
    short: 'Imlo, uyushiq bo‘laklar, ikki nuqta va tire',
    lesson: [
      {
        title: 'Imlo mashqi (3.17)',
        text: 'Quyidagi so‘zlarning to‘g‘ri yozilishini aniqlang:',
        table: {
          head: ['Xato', 'To‘g‘ri'],
          rows: [
            ['taqazo', 'taqozo'],
            ['unitilib', 'unutilib'],
            ['tatqiqot', 'tadqiqot'],
            ['kulguli', 'kulgili'],
            ['taxalus', 'taxallus'],
          ],
        },
        note: 'Uy vazifasi (3.18): dunyo tillari haqida 5 ta qiziqarli fakt topib yozing (sun’iy idrok yordamidan foydalanish mumkin).',
      },
      {
        title: 'Uyushiq bo‘laklarni topish (3.19)',
        text: 'Qaysi gapda uyushiq bo‘lak bor?',
        table: {
          head: ['Gap', 'Javob'],
          rows: [
            ['Solresol, volapyuk va esperanto tillari umumiy jihatlarga ega.', 'Bor: solresol, volapyuk, esperanto — uyushiq aniqlovchilar'],
            ['Foydalanilgani sari esperantoning o‘ta sun’iy ekani namoyon bo‘lib borgan.', 'Yo‘q'],
          ],
        },
      },
      {
        title: 'Umumlashtiruvchi so‘z',
        text: 'Uyushiq bo‘laklar ma’nosini bitta so‘z jamlab kelishi mumkin: hamma, barcha, bari, hech kim, hech narsa, hamma yer...',
        rule: 'Umumlashtiruvchi so‘z uyushiq bo‘laklar ma’nosini jamlab keladi. Bunday so‘zlar uyushiq bo‘laklardan oldin kelsa, ikki nuqta (:), keyin kelsa, tire (—) bilan ajratiladi.',
      },
      {
        title: 'Ikki nuqta yoki tire?',
        text: 'Bir gapning ikki xil tuzilishi:',
        table: {
          head: ['Tartib', 'Gap', 'Belgi'],
          rows: [
            ['Umumlashtiruvchi so‘z oldin', 'Barchamiz: o‘zbek, qirg‘iz, qozoq, turkman, tojik bir yurtning farzandlarimiz.', 'ikki nuqta (:)'],
            ['Umumlashtiruvchi so‘z keyin', 'O‘zbek, qirg‘iz, qozoq, turkman, tojik — barchamiz bir yurtning farzandlarimiz.', 'tire (—)'],
          ],
        },
      },
      {
        title: 'Tinish belgilarini qo‘yish (3.20)',
        text: 'Tushirib qoldirilgan tinish belgilari qo‘yilgan holat:',
        list: [
          'Issiq bilan sovuq, qor bilan yomg‘ir, suv bilan havo, o‘simliklar bilan hayvonlar — bularning bari tabiatning kuchlari hisoblanadi.',
          'Bog‘da turli mevalar: olcha, gilos, olma pishdi.',
          'Anorxon, Ergash, Sodiq — uchovi har tomonga jo‘nadi.',
          'Hech narsa: na musiqa, na ashula, na turli o‘yinlar uni ovuta olmas edi.',
        ],
      },
      {
        title: 'Gap tuzish (3.21)',
        text: 'Quyidagi umumlashtiruvchi so‘zlar ishtirokida gaplar tuzing va tinish belgilariga diqqat qiling:',
        examples: ['go‘zalliklar', 'mutaxassis-olimlar', 'hamma yer', 'bari', 'hech qachon', 'bog‘lar'],
        note: 'Namuna: «Hamma yer: ko‘chalar, bog‘lar, maydonlar bayramona bezatildi.»',
      },
    ],
    pairs: [
      ['taqazo', 'taqozo'],
      ['unitilib', 'unutilib'],
      ['tatqiqot', 'tadqiqot'],
      ['kulguli', 'kulgili'],
      ['taxalus', 'taxallus'],
      ['Umumlashtiruvchi so‘z oldin', 'ikki nuqta (:)'],
    ],
    quiz: [
      { q: 'Umumlashtiruvchi so‘z uyushiq bo‘laklardan oldin kelsa, qaysi belgi qo‘yiladi?', options: ['ikki nuqta', 'tire', 'vergul', 'nuqta'], answer: 0 },
      { q: 'Umumlashtiruvchi so‘z uyushiq bo‘laklardan keyin kelsa, qaysi belgi qo‘yiladi?', options: ['tire', 'ikki nuqta', 'nuqtali vergul', 'qavs'], answer: 0 },
      { q: 'To‘g‘ri yozilgan so‘zni toping: «taxa...us»', options: ['taxallus', 'taxalus', 'taxxalus', 'tahallus'], answer: 0 },
      { q: 'To‘g‘ri yozilgan so‘zni toping: «ta...qiqot»', options: ['tadqiqot', 'tatqiqot', 'tadqiqod', 'tadqikot'], answer: 0 },
      { q: '«Anorxon, Ergash, Sodiq ... uchovi har tomonga jo‘nadi» — bo‘sh o‘ringa qaysi belgi?', options: ['tire (—)', 'ikki nuqta (:)', 'nuqta (.)', 'so‘roq (?)'], answer: 0 },
      { q: 'Qaysi gapda uyushiq bo‘lak bor?', options: ['Solresol, volapyuk va esperanto tillari umumiy jihatlarga ega.', 'Esperantoning sun’iyligi namoyon bo‘lgan.', 'Til — aloqa vositasi.', 'U kitob o‘qidi.'], answer: 0 },
    ],
    sort: {
      categories: ['Ikki nuqta (:)', 'Tire (—)'],
      items: [
        { text: 'Bog‘da turli mevalar ... olcha, gilos, olma pishdi.', cat: 0 },
        { text: 'Anorxon, Ergash, Sodiq ... uchovi jo‘nadi.', cat: 1 },
        { text: 'Hech narsa ... na musiqa, na ashula uni ovutmadi.', cat: 0 },
        { text: 'Qor, yomg‘ir, shamol ... bari tabiat kuchi.', cat: 1 },
        { text: 'Barchamiz ... o‘zbek, qozoq, tojik bir yurt farzandimiz.', cat: 0 },
        { text: 'Olma, nok, uzum ... hammasi pishdi.', cat: 1 },
      ],
    },
    qa: [
      { q: 'Umumlashtiruvchi so‘z nima?', a: 'Uyushiq bo‘laklar ma’nosini jamlab keladigan so‘z: hamma, barcha, bari, hech kim, hech narsa.' },
      { q: 'Umumlashtiruvchi so‘z bilan tinish belgisi qoidasini ayting.', a: 'Uyushiq bo‘laklardan oldin kelsa — ikki nuqta, keyin kelsa — tire.' },
      { q: '«Bog‘da turli mevalar olcha gilos olma pishdi» gapiga tinish belgilarini qo‘ying.', a: '«Bog‘da turli mevalar: olcha, gilos, olma pishdi.»' },
      { q: '«Taqazo» va «kulguli» so‘zlarini to‘g‘rilang.', a: '«Taqozo», «kulgili».' },
      { q: '«Hamma yer» umumlashtiruvchi so‘zi bilan gap tuzing.', a: 'Masalan: «Hamma yer: ko‘chalar, bog‘lar, maydonlar bezatildi.»' },
    ],
  },
];

/* --- 8-sinf Ona tili: 21–30-darslar (darslik 2025, 56–81-betlar) --- */
const ONA_TILI_8_PART3 = [
  /* ===================== 21 ===================== */
  {
    id: 'tavsif-tasvir',
    source: 'III bob «Til tilsimi» • 5-dars • 56–57-betlar',
    title: 'Dunyo tillari diagrammasi. «Tavsif» va «tasvir»',
    short: 'Munozara, diagramma bilan ishlash, yanglish qo‘llanadigan so‘zlar',
    lesson: [
      {
        title: 'Munozara: bitta dunyo tili (3.22)',
        text: 'Ikki guruhga bo‘lining va fikrlaringizni dalillang. Tayyorlanish uchun 3 daqiqa beriladi.',
        table: {
          head: ['1-guruh', '2-guruh'],
          rows: [['Butun dunyo aholisi bitta tilda gaplashsa, taraqqiyot tezlashadi.', 'Butun dunyo aholisi bitta tilda gaplashishining aslo imkoni yo‘q. Bu dunyo tamaddunini sekinlashtiradi.']],
        },
      },
      {
        title: 'Tinish belgilarini tekshirish (3.23)',
        text: 'Umumlashtiruvchi so‘zli gaplarda tinish belgilari to‘g‘ri qo‘yilganmi? Har bir gapni qoida bilan solishtiring.',
        list: [
          'O‘zbeklar orasida qadim-qadimdan chinakam insoniy fazilatlar: do‘stlik, mehr-oqibat, odamgarchilik, axloqiy teranlik ulug‘lanib kelgan.',
          'Yig‘ilishda hech kim — na Ulug‘bek, na Muhammadali bu haqda gapirdi.',
          'Daraxtdagi barcha sayroqi qushlar: sa’va, bulbul, mayna va boshqalar unga jo‘r bo‘ldi.',
          'Na qor, na yomg‘ir, na to‘fon va na bo‘ron — hech narsa dovyuraklarni qo‘rqitmadi.',
        ],
        rule: 'Umumlashtiruvchi so‘z uyushiq bo‘laklardan oldin kelsa — ikki nuqta, keyin kelsa — tire qo‘yiladi.',
      },
      {
        title: 'Diagramma: eng ko‘p foydalaniladigan tillar (2025)',
        text: 'Darslikda Ethnologue ma’lumotlari asosidagi diagramma berilgan. Unda tillar so‘zlashuvchilar soni bo‘yicha tartiblangan:',
        list: ['Ingliz tili', 'Mandarin (xitoy) tili', 'Hind tili', 'Ispan tili', 'Arab tili', 'Fransuz tili', 'Bengal tili', 'Portugal tili', 'Rus tili', 'Indonez tili'],
        note: 'O‘zbek tili bu ro‘yxatda 58-o‘rinda ko‘rsatilgan.',
      },
      {
        title: 'Diagramma asosida xulosa (3.24)',
        text: 'Xulosalarning to‘g‘ri yoki noto‘g‘riligini diagrammadagi o‘rin va raqamlar bilan tekshiring:',
        list: [
          'Portugal tilida fransuz tilidagidan ko‘ra ko‘proq kishi gaplashadi.',
          'Hind tilidan 1 milliarddan ko‘proq kishi foydalanadi.',
          'Rus tilida arab tilidagidan ko‘ra kamroq kishi gaplashadi.',
          'Ispan tilida bengal tilidagidan ko‘ra ko‘proq kishi gaplashadi.',
          'O‘zbek tilida taxminan 60 milliondan ortiq kishi gaplashadi.',
        ],
        note: 'Savol: ona tilingizning o‘ziga xosligi haqida so‘ralsa, avvalo nimalar haqida gapirib bergan bo‘lardingiz? Qaysi tabiiy til hamma foydalanadigan dunyo tili bo‘lishi mumkin? (3.25)',
      },
      {
        title: 'Til sandig‘i: «tavsif» va «tasvir»',
        text: 'Alibek Rustamov bu ikki so‘z ko‘pincha aralashtirib yuborilishini, aslida ular orasida ma’no farqi borligini tushuntiradi.',
        table: {
          head: ['', 'Tavsif', 'Tasvir'],
          rows: [
            ['Nima', 'narsa sifatlarining og‘zaki yoki yozma bayoni', 'surat, shakl, rasm yoki sxema'],
            ['Natija', 'kishida tushuncha hosil bo‘ladi', 'tasavvur vujudga keladi'],
            ['Misol', 'mashina tuzilishi va ishini so‘z bilan bayon qilish', 'shu mashinaning rasmi yoki sxemasi'],
          ],
        },
        rule: '«Tasvir» so‘zi «tavsif» o‘rnida faqat badiiy bayonga nisbatan qo‘llanishi mumkin: «parovoz pishqirib kelmoqda» — bu badiiy tasvir.',
      },
    ],
    pairs: [
      ['Tavsif', 'Og‘zaki yoki yozma bayon'],
      ['Tasvir', 'Rasm, shakl, sxema'],
      ['Tavsif natijasi', 'Tushuncha'],
      ['Tasvir natijasi', 'Tasavvur'],
      ['Ikki nuqta', 'Umumlashtiruvchi so‘zdan keyin'],
      ['Tire', 'Uyushiq bo‘laklardan keyin'],
    ],
    quiz: [
      { q: 'Narsa sifatlarining og‘zaki yoki yozma bayoni nima deyiladi?', options: ['tavsif', 'tasvir', 'taqriz', 'tahrir'], answer: 0 },
      { q: 'Mashinaning rasmi yoki sxemasi nima bo‘ladi?', options: ['tasvir', 'tavsif', 'tarjima', 'tahlil'], answer: 0 },
      { q: 'Tavsifda kishida nima hosil bo‘ladi?', options: ['tushuncha', 'tasavvur', 'his-hayajon', 'shubha'], answer: 0 },
      { q: 'Diagrammada birinchi o‘rindagi til qaysi?', options: ['ingliz tili', 'xitoy tili', 'ispan tili', 'arab tili'], answer: 0 },
      { q: '«Tavsif» va «tasvir» haqidagi ma’lumot muallifi?', options: ['Alibek Rustamov', 'Eshqobil Shukur', 'Anvar Boboyev', 'Faxriddin Hayit'], answer: 0 },
    ],
    sort: {
      categories: ['Tavsif', 'Tasvir'],
      items: [
        { text: 'Miyaning tuzilishini so‘z bilan tushuntirish', cat: 0 }, { text: 'Miyaning rasmi', cat: 1 },
        { text: 'Mashina ishini bayon qilish', cat: 0 }, { text: 'Mashinaning sxemasi', cat: 1 },
        { text: 'Gulning xususiyatlarini yozish', cat: 0 }, { text: 'Gulning surati', cat: 1 },
        { text: 'Kitob haqida og‘zaki ma’lumot', cat: 0 }, { text: 'Parovoz pishqirib kelmoqda (badiiy)', cat: 1 },
      ],
    },
    qa: [
      { q: '«Tavsif» va «tasvir»ning farqi nima?', a: 'Tavsif — so‘z bilan bayon (tushuncha beradi), tasvir — rasm, shakl, sxema (tasavvur hosil qiladi).' },
      { q: 'Qachon «tasvir» so‘zini bayonga nisbatan ishlatish mumkin?', a: 'Faqat badiiy bayonga nisbatan, masalan, o‘xshatish ishlatilganda.' },
      { q: 'O‘zbek tili diagrammada nechanchi o‘rinda?', a: '58-o‘rinda.' },
      { q: '«Na qor, na yomg‘ir ... — hech narsa qo‘rqitmadi» gapida tire nega qo‘yilgan?', a: 'Umumlashtiruvchi so‘z (hech narsa) uyushiq bo‘laklardan keyin kelgan.' },
      { q: 'Munozarada fikrni qanday asoslash mumkin?', a: 'Dalil, misol, fakt, iqtibos keltirib.' },
    ],
  },

  /* ===================== 22 ===================== */
  {
    id: 'fakt-fikr',
    source: 'III bob «Til tilsimi» • 6-dars • 58–59-betlar',
    title: 'Fakt va fikr. Tilimizdan o‘tgan so‘zlar',
    short: 'Fakt va fikrni farqlash, kirpich, tovar, jir, ura so‘zlari tarixi',
    lesson: [
      {
        title: 'Darsga kirish',
        text: 'O‘zbek tili haqida suhbat:',
        list: [
          'O‘zbek tilidan dunyoning qaysi davlatlarida foydalaniladi? Nima uchun?',
          'Xorijliklar o‘zbek tilini o‘rganishining asosiy sababi nimada?',
          'O‘zbek tili turkiy xalqlar uchun markaziy muloqot tili bo‘lishi mumkinmi?',
        ],
      },
      {
        title: 'Fakt va fikr (3.26)',
        text: 'Matnni o‘qiganda faktni shaxsiy fikrdan ajrata bilish muhim.',
        table: {
          head: ['Tushuncha', 'Ta’rifi'],
          rows: [
            ['Fakt', 'isbotlangan, hamma tomonidan tan olingan hukm'],
            ['Fikr', 'shaxsiy qarash, subyektiv munosabat'],
          ],
        },
        note: 'Fikrni ko‘pincha baho bildiruvchi so‘zlar ko‘rsatadi: eng yoqimli, yanada yuksaltiradi, menimcha...',
      },
      {
        title: 'Fakt yoki fikr? (3.26)',
        text: 'Sun’iy tillar haqidagi jumlalarni tahlil qilamiz:',
        table: {
          head: ['Jumla', 'Javob'],
          rows: [
            ['Sun’iy tillar insoniyat tamaddunini yanada yuksaltiradi.', 'fikr'],
            ['Hozir sun’iy til loyihalari uch yuzdan oshgan.', 'fakt'],
            ['Solresol — eng yoqimli, insonlarni o‘ziga tortuvchi til.', 'fikr'],
            ['Esperanto tili loyihasini polshalik shifokor taklif etgan.', 'fakt'],
            ['Rivojlangan davlatlar o‘z tilini butun dunyoga tarqatmoqchi bo‘ladi.', 'fikr'],
          ],
        },
      },
      {
        title: 'Yanglish qo‘llanadigan juftliklar (3.27)',
        text: '«Tavsif» va «tasvir» kabi ma’nosi yaqin, lekin farqli so‘zlar juftini toping va misol bilan yozing.',
        examples: ['tavsif — tasvir', 'iliq — issiq', 'haqiqatan — haqiqatdan', 'asr — asir'],
      },
      {
        title: 'Matn: tilimizdan o‘tgan so‘zlar',
        text: 'Eshqobil Shukur rus tilida faol ishlatiladigan ayrim so‘zlarning asli turkiy ekanini qadimiy manbalar asosida ko‘rsatadi.',
        table: {
          head: ['So‘z', 'Manbadagi dalil'],
          rows: [
            ['kirpich (g‘isht)', 'Mahmud Koshg‘ariy «Devonu lug‘otit-turk»: kerpich — g‘isht; Navoiy asarlarida ham uchraydi'],
            ['tovar', 'Yusuf Xos Hojib «Qutadg‘u bilig»: tavar — mol, mahsulot'],
            ['jir', '«yog‘, moy» ma’nosida; Koshg‘ariy lug‘atida qayd etilgan'],
            ['ura', 'Koshg‘ariyda «uri» — tovush, baqiriq, faryod'],
          ],
        },
      },
      {
        title: 'Muallifning dalillash usuli',
        text: 'Muallif har bir fikrini aniq manbaga tayanib isbotlaydi.',
        list: [
          '«Kirbish» (kir + bish) haqidagi taxminni asossiz deydi: Koshg‘ariyda so‘z «kerpich» shaklida, «kir» esa «loy» emas, «iflos» ma’nosida kelgan.',
          '«Ura» so‘zi rus lug‘atida nemischa «hurra»dan deyilgan, ammo turkiy manbalarda X–XI asrlarda ham qo‘llangan.',
          '«Bunga hech jir bitmayapti» iborasi ham «jir» so‘zining asl ma’nosidan kelib chiqqan.',
        ],
        rule: 'Ilmiy-ommabop matnda fikr manba (lug‘at, asar, olim) keltirib dalillanadi.',
      },
    ],
    pairs: [
      ['Fakt', 'Isbotlangan hukm'],
      ['Fikr', 'Shaxsiy qarash'],
      ['kerpich', 'g‘isht (Koshg‘ariy)'],
      ['tavar', 'mol, mahsulot'],
      ['jir', 'yog‘, moy'],
      ['uri', 'tovush, baqiriq'],
    ],
    quiz: [
      { q: 'Fakt nima?', options: ['isbotlangan, hamma tan olgan hukm', 'shaxsiy qarash', 'savol', 'taxmin'], answer: 0 },
      { q: '«Sun’iy tillar tamaddunni yanada yuksaltiradi» — bu...', options: ['fikr', 'fakt', 'savol', 'ta’rif'], answer: 0 },
      { q: '«Kirpich» so‘zi qaysi manbada «kerpich» shaklida keladi?', options: ['«Devonu lug‘otit-turk»', '«Boburnoma»', '«Xamsa»', '«Tib qonunlari»'], answer: 0 },
      { q: '«Tovar» so‘zi qaysi asarda «tavar» shaklida uchraydi?', options: ['«Qutadg‘u bilig»', '«O‘tkan kunlar»', '«Hayrat ul-abror»', '«Zij»'], answer: 0 },
      { q: '«Jir» so‘zi qanday ma’noni bildiradi?', options: ['yog‘, moy', 'tovush', 'g‘isht', 'mol'], answer: 0 },
      { q: 'Matn muallifi kim?', options: ['Eshqobil Shukur', 'Alibek Rustamov', 'Anvar Boboyev', 'Mahmud Koshg‘ariy'], answer: 0 },
    ],
    sort: {
      categories: ['Fakt', 'Fikr'],
      items: [
        { text: 'Sun’iy til loyihalari uch yuzdan oshgan.', cat: 0 }, { text: 'Solresol — eng yoqimli til.', cat: 1 },
        { text: 'Esperantoni polshalik shifokor taklif etgan.', cat: 0 }, { text: 'Sun’iy tillar tamaddunni yuksaltiradi.', cat: 1 },
        { text: 'O‘zbek tili diagrammada 58-o‘rinda.', cat: 0 }, { text: 'O‘zbek tili eng go‘zal til.', cat: 1 },
        { text: '«Devonu lug‘otit-turk»ni Koshg‘ariy yozgan.', cat: 0 }, { text: 'Rivojlangan davlatlar tilini tarqatmoqchi.', cat: 1 },
      ],
    },
    qa: [
      { q: 'Fakt va fikrning farqi nima?', a: 'Fakt isbotlangan va hamma tan olgan, fikr — shaxsiy, subyektiv qarash.' },
      { q: '«Kirbish» haqidagi taxminni muallif nega asossiz deydi?', a: 'Koshg‘ariyda so‘z «kerpich» shaklida, «kir» esa «loy» emas, «iflos» ma’nosida kelgan.' },
      { q: '«Ura» so‘zining turkiy ekanini qanday dalillaydi?', a: 'Koshg‘ariy «Devon»ida «uri — tovush, baqiriq, faryod» deb izohlangan.' },
      { q: '«Bunga hech jir bitmayapti» iborasini izohlang.', a: 'Ozg‘in kishiga nisbatan aytiladi: «jir» — yog‘.' },
      { q: 'O‘zbek tilini xorijliklar nega o‘rganadi?', a: 'Erkin javob: madaniyat, tarix, savdo, turizm, ta’lim va do‘stlik aloqalari uchun.' },
    ],
  },

  /* ===================== 23 ===================== */
  {
    id: 'inkor-tasdiq',
    source: 'III bob «Til tilsimi» • 7-dars • 60–62-betlar',
    title: 'Shaklan inkor, mazmunan tasdiq gaplar',
    short: 'Jir, moy, yog‘; imlo; boshqa tillarga o‘tgan so‘zlar; inkor va tasdiq',
    lesson: [
      {
        title: 'Jir, moy, yog‘ (3.30)',
        text: 'Ma’nosi yaqin so‘zlarning har biri o‘z o‘rnida ishlatiladi:',
        table: {
          head: ['Gap', 'Mos so‘z'],
          rows: [
            ['Mol boqqanning barmog‘idan ... tomar.', 'yog‘'],
            ['Bobom qo‘y ...ida osh damladilar.', 'yog‘ida'],
            ['Ukajon, do‘stingizga hech ... bitmadi.', 'jir'],
            ['Qozonga 5 litr zig‘ir ...i quyildi.', 'moyi'],
            ['Zaytun ...i ko‘plab kasalliklarga shifo.', 'moyi'],
          ],
        },
      },
      {
        title: 'Imlo (3.31)',
        text: 'Quyidagi so‘zlarning to‘g‘ri yozilishi:',
        table: {
          head: ['Xato', 'To‘g‘ri'],
          rows: [
            ['universetit', 'universitet'],
            ['namoyonda', 'namoyanda'],
            ['qadiriyat', 'qadriyat'],
            ['uyg‘in', 'uyg‘un'],
            ['zahira', 'zaxira'],
          ],
        },
      },
      {
        title: 'O‘zbek tilidan o‘tgan so‘zlar (3.32–3.33)',
        text: 'Guruhlarga bo‘linib, o‘zbek tilidan boshqa tillarga o‘tgan so‘zlar ro‘yxatini tuzing.',
        examples: ['utyug (dazmol)', 'qalpoq', 'palov', 'yonbosh (milliy kurash)'],
        note: 'Boshqa tillarda aniq muqobili yo‘q o‘zbekcha so‘zlar: sovchi, choyxona... Ro‘yxatni davom ettiring.',
      },
      {
        title: 'Inkor va tasdiq (3.34)',
        text: 'Bir gapni turli shakllarda aytganda ma’no qanday o‘zgaradi?',
        table: {
          head: ['Gap', 'Mazmuni'],
          rows: [
            ['U «O‘tkan kunlar»ni o‘qidi.', 'tasdiq'],
            ['U «O‘tkan kunlar»ni bir o‘tirishda o‘qib qo‘ydi.', 'tasdiq (kuchaytirilgan)'],
            ['U «O‘tkan kunlar»ni o‘qimay qo‘ymadi.', 'shaklan inkor, mazmunan tasdiq'],
            ['U «O‘tkan kunlar»ni o‘qiy olmadi.', 'inkor (imkonsizlik)'],
            ['U «O‘tkan kunlar»ni o‘qimadi.', 'inkor'],
            ['U «O‘tkan kunlar»ni o‘qigani yo‘q.', 'inkor'],
          ],
        },
      },
      {
        title: 'Qoida: shakl va mazmun',
        text: 'Gapning shakli va mazmuni har doim mos kelavermaydi.',
        rule: 'Ba’zan gapning inkor shakli orqali tasdiq yoki tasdiq shakli orqali inkor ma’nosi ifodalanadi. Bu ifoda ta’sirchanligini oshiradi.',
        table: {
          head: ['Gap', 'Mazmuni'],
          rows: [
            ['U kelsa, do‘stini ko‘rmay ketmaydi.', 'U kelsa, do‘stini albatta ko‘rib ketadi.'],
            ['O‘zbeklarda kim ota-onasini hurmat qilmaydi?!', 'Hamma ota-onasini hurmat qiladi.'],
            ['Bu yerda kim yolg‘on gapirishga jazm qila olardi?!', 'Hech kim yolg‘on gapira olmaydi.'],
          ],
        },
      },
      {
        title: 'Tasdiqmi, inkormi? (3.35)',
        text: 'Gaplarning mazmunini aniqlaymiz:',
        table: {
          head: ['Gap', 'Mazmuni'],
          rows: [
            ['Yaqin orada O‘zbekistonga borolganim yo‘q.', 'inkor'],
            ['U O‘zbekistonga kelsa, Samarqandga bormay qo‘ymaydi.', 'tasdiq'],
            ['O‘zbeklarda kim ustozini hurmat qilmaydi?!', 'tasdiq'],
            ['Uning qaytib kelish niyati yo‘q emas.', 'tasdiq'],
            ['Kech bo‘ldi, uyga qaytmaymizmi?', 'tasdiq (taklif)'],
            ['Bu daraxtni kesishga kim jur’at qila olardi?!', 'inkor'],
          ],
        },
      },
      {
        title: 'O‘yin va mashqlar (3.36–3.39)',
        text: 'Darsni qiziqarli mashqlar bilan yakunlang:',
        list: [
          'Shaklan inkor, mazmunan tasdiq va shaklan tasdiq, mazmunan inkor gaplarga 3 tadan misol yozing.',
          '«Musht ketdi» o‘yini: gapni qulog‘iga pichirlab uzating, oxirgi o‘quvchi baland aytadi — mazmun qanday o‘zgardi?',
          '«BANDARGOH» va «BESHQO‘L» so‘zlari tarkibidan harflar o‘rnini almashtirmay mustaqil so‘zlar toping.',
          '«Yaxshi-yomon, oq-qora, ota-ona, baland-past» juftliklaridan qaysi birida zid ma’noli so‘zlar yo‘q? (ota-ona)',
        ],
      },
    ],
    pairs: [
      ['o‘qimay qo‘ymadi', 'albatta o‘qidi'],
      ['kim hurmat qilmaydi?!', 'hamma hurmat qiladi'],
      ['kim jur’at qila olardi?!', 'hech kim jur’at qilolmaydi'],
      ['niyati yo‘q emas', 'niyati bor'],
      ['namoyonda', 'namoyanda'],
      ['zahira', 'zaxira'],
    ],
    quiz: [
      { q: '«U kelsa, do‘stini ko‘rmay ketmaydi» gapining mazmuni?', options: ['albatta ko‘rib ketadi', 'ko‘rmaydi', 'kelmaydi', 'noma’lum'], answer: 0 },
      { q: '«Bu daraxtni kesishga kim jur’at qila olardi?!» — mazmuni...', options: ['inkor: hech kim', 'tasdiq: hamma', 'savol', 'buyruq'], answer: 0 },
      { q: 'To‘g‘ri yozilgan so‘z?', options: ['namoyanda', 'namoyonda', 'namoyenda', 'namoyandda'], answer: 0 },
      { q: '«Zig‘ir ...i» — bo‘sh o‘ringa mos so‘z?', options: ['moy', 'jir', 'yog‘', 'sut'], answer: 0 },
      { q: 'Qaysi juftlikda zid ma’noli so‘zlar YO‘Q?', options: ['ota-ona', 'oq-qora', 'yaxshi-yomon', 'baland-past'], answer: 0 },
      { q: '«Uning qaytib kelish niyati yo‘q emas» gapi...', options: ['mazmunan tasdiq', 'mazmunan inkor', 'so‘roq', 'buyruq'], answer: 0 },
    ],
    sort: {
      categories: ['Mazmunan tasdiq', 'Mazmunan inkor'],
      items: [
        { text: 'U kelsa, do‘stini ko‘rmay ketmaydi.', cat: 0 }, { text: 'Kim yolg‘on gapirishga jazm qila olardi?!', cat: 1 },
        { text: 'Kim ota-onasini hurmat qilmaydi?!', cat: 0 }, { text: 'Bu daraxtni kesishga kim jur’at qilardi?!', cat: 1 },
        { text: 'Niyati yo‘q emas.', cat: 0 }, { text: 'Borolganim yo‘q.', cat: 1 },
        { text: 'Samarqandga bormay qo‘ymaydi.', cat: 0 }, { text: 'U kitobni o‘qiy olmadi.', cat: 1 },
      ],
    },
    qa: [
      { q: 'Shaklan inkor, mazmunan tasdiq gapga misol keltiring.', a: 'Masalan: «U kelsa, do‘stini ko‘rmay ketmaydi.»' },
      { q: 'Shaklan tasdiq, mazmunan inkor gapga misol keltiring.', a: 'Masalan: «Kim unga gapirishga jur’at qila oladi?!»' },
      { q: 'Bunday gaplar nutqqa nima beradi?', a: 'Ifodaning ta’sirchanligini oshiradi.' },
      { q: '«Qadiriyat» va «uyg‘in» so‘zlarini to‘g‘rilang.', a: '«Qadriyat», «uyg‘un».' },
      { q: 'O‘zbek tilidan boshqa tillarga o‘tgan so‘zlarga misol keltiring.', a: 'Masalan: palov, qalpoq, utyug.' },
    ],
  },

  /* ===================== 24 ===================== */
  {
    id: 'mustahkamlash-1',
    source: 'III bob «Til tilsimi» • Chorak bo‘yicha mustahkamlash • 62–63-betlar',
    title: 'Chorak bo‘yicha mustahkamlash',
    short: 'Qo‘shimchalar, ko‘chma ma’no, asosiy fikr, umumlashtiruvchi so‘z',
    lesson: [
      {
        title: 'Takrorlash rejasi',
        text: 'Chorak davomida o‘rganilgan mavzular takrorlanadi:',
        list: ['Qo‘shimcha va so‘zlarni to‘g‘ri qo‘llash', 'So‘zning o‘z va ko‘chma ma’nosi', 'Asosiy va yordamchi fikr', 'Kelishik va egalik qo‘shimchalaridagi uslubiy xatolar', 'Umumlashtiruvchi so‘z va tinish belgilari', 'Shaklan inkor, mazmunan tasdiq gaplar'],
      },
      {
        title: '1-topshiriq: qo‘shimchalardagi xatolar',
        text: 'Xatolarni toping va to‘g‘rilang:',
        table: {
          head: ['Xato', 'To‘g‘ri'],
          rows: [
            ['daraxtni yaprog‘i', 'daraxtning yaprog‘i'],
            ['xonani eshigi', 'xonaning eshigi'],
            ['so‘ngi daqiqa', 'so‘nggi daqiqa'],
            ['hovlilarni tozalandi', 'hovlilar tozalandi'],
            ['do‘ppi tikgani kelmoq', 'do‘ppi tikkani kelmoq'],
            ['olovni yoqgach', 'olovni yoqqach'],
            ['yumshoqgina yostiq', 'yumshoqqina yostiq'],
            ['to‘rt nafar nomzodlar', 'to‘rt nafar nomzod'],
            ['butun sinf o‘qidilar', 'butun sinf o‘qidi'],
            ['xatni yozilishi', 'xatning yozilishi'],
          ],
        },
      },
      {
        title: '2-topshiriq: o‘z va ko‘chma ma’no',
        text: 'Ajratilgan so‘zlar qaysi ma’noda kelgan?',
        list: [
          'Kinoning bosh qahramoni o‘z rolini ishonchli ijro etgan, hammamiz lol qoldik.',
          'Abduqodirning ham tomog‘iga bir narsa tiqildi, shekilli, gapira olmadi. (O. Umarbekov)',
          'Balki ustoz Oybekdek to‘lib, yozajaksan yangi bir doston... (A. Oripov)',
          '— Havo ochilyapti-ku! — Ochilishga ochilgan-u, ammo-lekin ayoz... (O. Yoqubov)',
        ],
        note: 'O‘z ma’nosidagilarni ko‘chma, ko‘chma ma’nodagilarni o‘z ma’nosida qo‘llab 6 ta gap tuzing.',
      },
      {
        title: '3-topshiriq: asosiy va yordamchi fikr',
        text: '«Sabr-qanoat» haqidagi matnda asosiy va yordamchi fikrlar ajratiladi.',
        table: {
          head: ['Fikr', 'Turi'],
          rows: [
            ['Sabr-qanoat oilaviy hayotda muhim axloqiy qadriyat hisoblanadi.', 'asosiy fikr'],
            ['U qiyinchiliklarga sabr bilan bardosh berishni, mavjud holatga shukrona qilishni anglatadi.', 'yordamchi fikr'],
            ['Sabr va qanoat oilaning ichki muhitini sog‘lomlashtiradi, munosabatlarni mustahkamlaydi.', 'yordamchi fikr'],
          ],
        },
      },
      {
        title: '4-topshiriq: uslubiy xatolar',
        text: 'Kelishik va egalik qo‘shimchalaridagi xatolarni tuzatamiz:',
        table: {
          head: ['Xato', 'To‘g‘ri'],
          rows: [
            ['Asfalt yo‘lda mashinalar g‘iz-g‘iz o‘tib turar edi.', 'Asfalt yo‘ldan mashinalar g‘iz-g‘iz o‘tib turar edi.'],
            ['Ustozni yonida yur.', 'Ustozning yonida yur.'],
            ['Musobaqalar bahorga bo‘lib o‘tadi.', 'Musobaqalar bahorda bo‘lib o‘tadi.'],
            ['...olis-olislarda ovoz berib qo‘yardi.', '...olis-olislardan ovoz berib qo‘yardi.'],
            ['Dehqonlar erta bahorda to kuzgacha...', 'Dehqonlar erta bahordan to kuzgacha...'],
          ],
        },
      },
      {
        title: '5-topshiriq: umumlashtiruvchi so‘z',
        text: 'Tinish belgilari qo‘yilgan holat:',
        list: [
          'Umrzoq hamma narsani: konvertni ham, oq qog‘ozni ham, pushtirang qog‘ozni ham ko‘rdi.',
          'Yigit yuzini, bo‘ynini, ko‘kraklarini — barcha qoraygan joylarini yuvar edi.',
          'Oldin mutaxassis-olimlar: geologlar, gidrogeologlar, geodezistlar keldilar.',
          'Odamlar: erkaklar, ayollar va bolalar — shod-xurram, o‘yin-kulgi avjida.',
        ],
        note: '6-topshiriq: shaklan inkor, mazmunan tasdiq va shaklan tasdiq, mazmunan inkor gaplarga 4 tadan misol yozing.',
      },
    ],
    pairs: [
      ['daraxtni yaprog‘i', 'daraxtning yaprog‘i'],
      ['so‘ngi daqiqa', 'so‘nggi daqiqa'],
      ['olovni yoqgach', 'olovni yoqqach'],
      ['to‘rt nafar nomzodlar', 'to‘rt nafar nomzod'],
      ['ustozni yonida', 'ustozning yonida'],
      ['bahorga bo‘lib o‘tadi', 'bahorda bo‘lib o‘tadi'],
    ],
    quiz: [
      { q: 'Qaysi birikma to‘g‘ri?', options: ['xonaning eshigi', 'xonani eshigi', 'xonaga eshigi', 'xonada eshigi'], answer: 0 },
      { q: 'Qaysi birikma to‘g‘ri?', options: ['yumshoqqina yostiq', 'yumshoqgina yostiq', 'yumshoqkina yostiq', 'yumshog‘gina yostiq'], answer: 0 },
      { q: '«Butun sinf o‘qidilar» gapining to‘g‘ri shakli?', options: ['Butun sinf o‘qidi.', 'Butun sinflar o‘qidi.', 'Butun sinf o‘qishdilar.', 'Xato yo‘q'], answer: 0 },
      { q: '«Ustozni yonida yur» gapidagi xato?', options: ['qaratqich kelishigi kerak: ustozning', 'fe’l xato', 'tinish belgisi', 'xato yo‘q'], answer: 0 },
      { q: '«...mutaxassis-olimlar ... geologlar, geodezistlar keldilar» — bo‘sh o‘ringa?', options: ['ikki nuqta', 'tire', 'nuqta', 'vergul'], answer: 0 },
    ],
    sort: {
      categories: ['To‘g‘ri', 'Xato'],
      items: [
        { text: 'daraxtning yaprog‘i', cat: 0 }, { text: 'daraxtni yaprog‘i', cat: 1 },
        { text: 'do‘ppi tikkani kelmoq', cat: 0 }, { text: 'do‘ppi tikgani kelmoq', cat: 1 },
        { text: 'xatning yozilishi', cat: 0 }, { text: 'xatni yozilishi', cat: 1 },
        { text: 'hovlilar tozalandi', cat: 0 }, { text: 'hovlilarni tozalandi', cat: 1 },
        { text: 'el orzulari', cat: 0 }, { text: 'so‘ngi daqiqa', cat: 1 },
      ],
    },
    qa: [
      { q: '«Hovlilarni tozalandi» gapini to‘g‘rilang.', a: '«Hovlilar tozalandi».' },
      { q: '«Erta bahorda to kuzgacha» birikmasidagi xato nima?', a: '«to ... -gacha» bilan «-dan» keladi: «erta bahordan to kuzgacha».' },
      { q: 'Matndagi asosiy fikrni qanday topasiz?', a: 'Butun matn mazmunini umumlashtiradigan, boshqa fikrlar unga xizmat qiladigan jumlani topib.' },
      { q: '«Ochilishga ochilgan-u, ammo-lekin ayoz» gapida «ochilmoq» qanday ma’noda?', a: 'Ko‘chma ma’noda: havoning bulutsiz bo‘lishi.' },
      { q: 'Shaklan tasdiq, mazmunan inkor gapga misol keltiring.', a: 'Masalan: «Kim unga gapirishga jur’at qila oladi?» (hech kim).' },
    ],
  },

  /* ===================== 25 ===================== */
  {
    id: 'allomalar',
    source: 'IV bob «Fan va texnologiyalar» • 1-dars • 65–69-betlar',
    title: 'Buyuk yurt allomalari',
    short: 'Xorazmiy, Beruniy, Farg‘oniy, Ibn Sino; fakt va fikr',
    lesson: [
      {
        title: 'Darsga kirish',
        text: 'Yangi bob — «Fan va texnologiyalar». «Buyuk yurt allomalari» kitobidan olingan to‘rt qismli matn o‘qiladi.',
        note: 'Kirish savoli: Olimlar qanday faoliyat bilan shug‘ullanishadi? Qaysi olimlarning kashfiyotlari bilan tanishsiz?',
      },
      {
        title: 'I qism: Muhammad al-Xorazmiy',
        text: '«Algebra» so‘zi al-Xorazmiy risolasi nomidagi «al-jabr» so‘zidan olingan. Olim arifmetika, geografiya va astronomiyaga oid 20 dan ortiq asar muallifi.',
        list: [
          '«Qo‘shish va ayirish haqida kitob»ning lotincha tarjimasi Kembrij universiteti kutubxonasida saqlanadi.',
          'Risola «Diksit Algorizmi» — «al-Xorazmiy aytdi» iborasi bilan boshlanadi.',
          'Olim o‘nlik sanoq tizimining afzalligini isbotlagan — bu Rim raqamlaridan foydalangan Yevropa uchun yangilik edi.',
          '0–9 raqamlarining yozilishini, ayniqsa 0 raqamining ahamiyatini alohida tushuntirgan.',
        ],
      },
      {
        title: 'II qism: Abu Rayhon Beruniy',
        text: 'Beruniy yirik kashfiyotlari bilan jahon tamadduniga salmoqli hissa qo‘shgan olim.',
        list: [
          'Birinchi bo‘lib Yer shari globusini yasagan.',
          '«Hindiston» asarida Yerning aylanishi haqida yozgan — Galiley bu fikrga 600 yil keyin kelgan.',
          'Kolumbdan 450 yil oldin okean ortida qit’a (Amerika) bo‘lishini bashorat qilgan.',
          'Geografik kenglikni hisoblash usulini Tixo Bragedan olti asr oldin qo‘llagan.',
        ],
        rule: '«Bir daqiqa vaqtni behuda o‘tkazganim — halok bo‘lganim.» (Beruniy)',
      },
      {
        title: 'III qism: Ahmad al-Farg‘oniy',
        text: 'Farg‘oniy — astronom, matematik, muhandis, gidrotexnik. Yevropada Alfraganus nomi bilan mashhur.',
        list: [
          '«Samoviy harakatlar va umumiy ilmi nujum» kitobi XII–XIII asrlarda Yevropa tillariga tarjima qilingan va universitetlarda asosiy darslik bo‘lgan.',
          'Qohirada Nil daryosidagi Ravzo orolida suv sathini o‘lchovchi miqyos yasagan (861–865-yillar).',
          'Bu inshoot o‘n bir asrdan ortiq xizmat qilgan, Asvon to‘g‘oni qurilgach, muzeyga aylantirilgan.',
        ],
      },
      {
        title: 'IV qism: Abu Ali ibn Sino',
        text: 'Yevropada Avitsenna nomi bilan mashhur qomusiy olim o‘z davridagi deyarli barcha fanlar bilan shug‘ullangan.',
        list: [
          'Ilmiy adabiyotlarda 450 dan ortiq asari qayd etilgan, ularning yarmiga yaqini bizgacha yetib kelgan.',
          'Falsafa va tabobatda o‘chmas iz qoldirgan.',
          'Shoh asari — «Tib qonunlari» — tibbiy bilimlar qomusi.',
          '«Qonun»ning ikkinchi kitobida o‘simliklardan tayyorlanuvchi 760 ta dori haqida yozilgan.',
        ],
      },
      {
        title: 'Yangi so‘zlar (4.1)',
        text: 'Boshqotirmadagi so‘zlar va izohlari:',
        table: {
          head: ['So‘z', 'Izohi'],
          rows: [
            ['nodir', 'kam topiladigan, noyob'],
            ['muhandis', 'texnika sohasiga ixtisoslashgan mutaxassis, injener'],
            ['usturlob', 'yulduzlar joylashuvini aniqlaydigan astronomik asbob'],
            ['to‘g‘on', 'suvni to‘sish, oqimini boshqarish inshooti'],
            ['risola', 'ayrim masalalarga bag‘ishlangan ilmiy asar'],
            ['muqaddam', 'burun, ilgari, oldin'],
            ['tamaddun', 'madaniyat, sivilizatsiya'],
            ['qit’a', 'yer yuzidagi quruqlikning katta qismi'],
          ],
        },
      },
      {
        title: 'Fakt va fikr (4.2)',
        text: 'Beruniy haqidagi ma’lumotlarni ajratamiz:',
        table: {
          head: ['Ma’lumot', 'Turi'],
          rows: [
            ['Beruniy — jahon tamadduniga salmoqli hissa qo‘shgan olim.', 'fikr (baho)'],
            ['Olim birinchi bo‘lib Yer shari globusini yaratgan.', 'fakt'],
            ['Globusdan barcha geograflar, har bir ziyoli bugun ham foydalanmoqda.', 'fikr (umumlashtirish)'],
            ['Beruniy geografik kenglikni hisoblashning o‘ziga xos usulini yaratgan.', 'fakt'],
            ['Beruniy vaqtni qadrlaydigan shaxs bo‘lgan.', 'fikr'],
          ],
        },
        note: 'Xorazmiy risolasining asosiy yangiligi: o‘nlik sanoq tizimining afzalligi isbotlanadi va yirik sonlarni lo‘nda ifodalash mumkinligi aytiladi.',
      },
      {
        title: 'Vaqt haqida hikmatlar (4.4)',
        text: 'Beruniyning vaqt haqidagi fikriga qaysi hikmat mos? Tanlangan hikmat asosida 200–300 so‘zli matn tuzing.',
        list: [
          'Vaqti kelib fan xayoldan o‘zib ketadi. (Jyul Vern)',
          'Bekor o‘tgan umr barvaqt o‘lim topish demakdir. (Gyote)',
          'Aslida vaqt emas, biz o‘zimiz o‘tyapmiz. (Asqad Muxtor)',
          'Ilm egallashda eng zarur narsa vaqtdir. (Zenon)',
          'Vaqtini «esiz», «qaniydi»lar bilan o‘tkazgan kishining umri eng qisqa umr. (Najmiddin Kubro)',
        ],
        note: 'Beruniy fikriga eng yaqini — Gyote hikmati: ikkalasida bekor o‘tgan vaqt o‘limga tenglashtiriladi.',
      },
    ],
    pairs: [
      ['Xorazmiy', 'Algebra, o‘nlik sanoq'],
      ['Beruniy', 'Birinchi globus'],
      ['Farg‘oniy', 'Nil miqyosi, Alfraganus'],
      ['Ibn Sino', '«Tib qonunlari», Avitsenna'],
      ['usturlob', 'Astronomik asbob'],
      ['tamaddun', 'Sivilizatsiya'],
    ],
    quiz: [
      { q: '«Algebra» so‘zi qaysi olim asaridan olingan?', options: ['al-Xorazmiy', 'Beruniy', 'Ibn Sino', 'Farg‘oniy'], answer: 0 },
      { q: 'Birinchi bo‘lib Yer shari globusini kim yasagan?', options: ['Beruniy', 'Xorazmiy', 'Ulug‘bek', 'Farg‘oniy'], answer: 0 },
      { q: 'Yevropada Alfraganus nomi bilan mashhur olim?', options: ['Ahmad al-Farg‘oniy', 'Ibn Sino', 'Beruniy', 'Xorazmiy'], answer: 0 },
      { q: '«Tib qonunlari» asari muallifi?', options: ['Ibn Sino', 'Beruniy', 'Xorazmiy', 'Farg‘oniy'], answer: 0 },
      { q: 'Xorazmiy risolasining asosiy yangiligi?', options: ['o‘nlik sanoq tizimi afzalligini isbotlagani', 'Rim raqamlarini yaratgani', 'globus yasagani', 'dori tayyorlagani'], answer: 0 },
      { q: '«Usturlob» nima?', options: ['astronomik asbob', 'to‘g‘on', 'risola', 'dori'], answer: 0 },
    ],
    sort: {
      categories: ['Fakt', 'Fikr'],
      items: [
        { text: 'Beruniy birinchi globusni yasagan.', cat: 0 }, { text: 'Beruniy jahon tamadduniga salmoqli hissa qo‘shgan.', cat: 1 },
        { text: 'Ibn Sinoning 450 dan ortiq asari qayd etilgan.', cat: 0 }, { text: 'Globusdan har bir ziyoli foydalanadi.', cat: 1 },
        { text: 'Farg‘oniy miqyosi 861–865-yillarda qurilgan.', cat: 0 }, { text: 'Beruniy vaqtni qadrlaydigan shaxs bo‘lgan.', cat: 1 },
        { text: '«Qonun»da 760 ta dori haqida yozilgan.', cat: 0 }, { text: 'Ibn Sino eng buyuk tabib.', cat: 1 },
      ],
    },
    qa: [
      { q: 'Xorazmiyning «Qo‘shish va ayirish haqida kitob»i nima uchun muhim bo‘lgan?', a: 'O‘nlik sanoq tizimi va 0 raqamining afzalligini ko‘rsatgan, Yevropa Rim raqamlaridan qutulgan.' },
      { q: 'Beruniyning ikki muhim kashfiyotini ayting.', a: 'Birinchi globus, Yerning aylanishi haqidagi fikr, Amerika qit’asi bashorati.' },
      { q: '«Bir daqiqa vaqtni behuda o‘tkazganim — halok bo‘lganim» deganda nimani tushunasiz?', a: 'Vaqt eng qimmatli boylik, uni bekor o‘tkazish umrni yo‘qotish bilan teng.' },
      { q: 'Farg‘oniy kitobi nega ko‘p tillarga tarjima qilingan?', a: 'U Yevropa universitetlarida astronomiyadan asosiy darslik bo‘lgan.' },
      { q: 'Ibn Sinoning shoh asari qaysi?', a: '«Tib qonunlari».' },
    ],
  },

  /* ===================== 26 ===================== */
  {
    id: 'omonimlar',
    source: 'IV bob «Fan va texnologiyalar» • 2-dars • 69–70-betlar',
    title: 'Omonimlar va ko‘p ma’noli so‘zlar',
    short: 'Sinonim, antonim, omonim, paronim; omonimlarni farqlash',
    lesson: [
      {
        title: 'So‘zlar guruhi (4.5)',
        text: 'Quyidagi so‘zlar qaysi jihatiga ko‘ra guruhlangan?',
        table: {
          head: ['Antonim', 'Sinonim', 'Omonim', 'Paronim'],
          rows: [
            ['avlod — ajdod', 'katta — ulkan', 'band (band bo‘lmoq, gulning bandi)', 'azim — azm'],
            ['ilmiy — g‘ayri ilmiy', 'sovg‘a — hadya', 'davlat (davlat arbobi, davlati ko‘p odam)', 'burch — burj'],
            ['zarar — foyda', 'solishtirmoq — taqqoslamoq', 'kechik (kechikdan o‘tmoq, ishga kechikmoq)', ''],
          ],
        },
        note: 'Har bir guruhni o‘zingiz davom ettiring.',
      },
      {
        title: 'Omonimlar',
        text: 'Omonimlar shakldosh so‘zlardir.',
        rule: 'Omonimlar talaffuzi va yozilishi bir xil, ammo bir-biriga bog‘liq bo‘lmagan ma’no ifodalovchi birliklardir.',
        examples: ['qadoq (choy qadog‘i) — qadoq (teridagi qavariq)', 'zang (metall zangi) — zang (qo‘ng‘iroq ovozi)', 'chaqmoq (tabiat hodisasi) — chaqmoq qand'],
      },
      {
        title: 'Omonim va ko‘p ma’noli so‘z farqi',
        text: 'Omonimlarni ko‘p ma’noli so‘zlardan farqlash kerak.',
        table: {
          head: ['', 'Omonim', 'Ko‘p ma’noli so‘z'],
          rows: [
            ['Tabiati', 'bir xil shaklli turli so‘zlar', 'bir so‘zning turli ma’nolari'],
            ['Ma’nolar aloqasi', 'bog‘liq emas', 'o‘zaro bog‘liq'],
            ['Misol', 'burun (yuz qismi) — burun (avval)', 'burun (yuz qismi) — burun (choynak qismi)'],
          ],
        },
        rule: 'Omonimlar ham, ko‘p ma’noli so‘zlar ham qanday ma’noda kelayotgani matn orqali aniqlanadi.',
      },
      {
        title: 'Lug‘atda omonimlar',
        text: 'Izohli lug‘atlarda omonim so‘zlar rim raqamlari bilan tartiblanadi:',
        table: {
          head: ['So‘z', 'Ma’nosi'],
          rows: [
            ['Rasm I', 'Qo‘lda chizilgan, bosma yoki fotografik tasvir, surat.'],
            ['Rasm II', 'Jamiyatda odat hukmiga kirgan tartib-qoida; urf, udum, taomil.'],
          ],
        },
        note: '4.7-topshiriq: band, dam, erish, kech, luqma, soz, tom, xayr, chek, chog‘ so‘zlarining shakldoshlarini toping va izohli lug‘atdan tekshiring.',
      },
      {
        title: 'Maqollardagi omonimlar (4.8)',
        text: 'Maqollarni o‘qing, ajratilgan so‘zlarning omonimini toping:',
        list: [
          'Barakat mag‘izda, hunarli qo‘l og‘izda.',
          'Yuzga kirsang, yuz yil o‘qi. (yuz — son; yuz — chehra)',
          'Ilm qog‘oz qatida emas, miya qatida.',
          'Aql ko‘pga yetkazar, hunar — ko‘kka. (ko‘k — osmon; ko‘k — rang)',
          'Ilmi borni yosh dema, ilmi yo‘qni bosh dema. (yosh — yil; yosh — ko‘z yoshi)',
          'Oltin olma, bilim ol, bilim olsang, bilib ol. (olma — meva; olma — olmoq fe’li)',
        ],
      },
      {
        title: 'Tuyuq (4.9)',
        text: 'Tuyuq — to‘rt misrali she’r bo‘lib, qofiyasi omonim so‘zlar asosida quriladi. Shuning uchun omonimlar tuyuqning asosiy badiiy vositasi hisoblanadi.',
        note: 'Topshiriq: to‘rtta tuyuq toping va undagi omonim so‘zlarning har biriga izoh yozing.',
      },
    ],
    pairs: [
      ['avlod — ajdod', 'Antonim'],
      ['katta — ulkan', 'Sinonim'],
      ['band — band', 'Omonim'],
      ['burch — burj', 'Paronim'],
      ['Rasm I', 'surat, tasvir'],
      ['Rasm II', 'urf, udum, taomil'],
    ],
    quiz: [
      { q: 'Omonimlar qanday so‘zlar?', options: ['shakli bir xil, ma’nosi bog‘liq emas', 'ma’nosi yaqin', 'ma’nosi zid', 'talaffuzi yaqin, ma’nosi har xil'], answer: 0 },
      { q: '«Azim — azm» juftligi qanday so‘zlar?', options: ['paronim', 'sinonim', 'antonim', 'omonim'], answer: 0 },
      { q: '«Burun (yuz qismi) — burun (choynak qismi)» — bu...', options: ['ko‘p ma’noli so‘z', 'omonim', 'antonim', 'paronim'], answer: 0 },
      { q: 'Lug‘atlarda omonimlar qanday belgilanadi?', options: ['rim raqamlari bilan', 'yulduzcha bilan', 'qavs bilan', 'rang bilan'], answer: 0 },
      { q: '«Avlod — ajdod» juftligi...', options: ['antonim', 'sinonim', 'omonim', 'paronim'], answer: 0 },
      { q: 'Omonimlar asosida quriladigan she’r turi?', options: ['tuyuq', 'g‘azal', 'doston', 'masnaviy'], answer: 0 },
    ],
    sort: {
      categories: ['Sinonim', 'Antonim', 'Paronim'],
      items: [
        { text: 'sovg‘a — hadya', cat: 0 }, { text: 'zarar — foyda', cat: 1 }, { text: 'azim — azm', cat: 2 },
        { text: 'solishtirmoq — taqqoslamoq', cat: 0 }, { text: 'ilmiy — g‘ayri ilmiy', cat: 1 }, { text: 'burch — burj', cat: 2 },
        { text: 'katta — ulkan', cat: 0 }, { text: 'avlod — ajdod', cat: 1 }, { text: 'asr — asir', cat: 2 },
      ],
    },
    qa: [
      { q: 'Omonim va ko‘p ma’noli so‘zning farqi nima?', a: 'Omonimlar — shakli bir xil turli so‘zlar (ma’nolari bog‘liq emas), ko‘p ma’noli so‘z — bir so‘zning bog‘liq ma’nolari.' },
      { q: '«Yuz» so‘zining omonimlarini ayting.', a: 'Yuz — son (100) va yuz — chehra.' },
      { q: 'Omonim so‘zning ma’nosi qanday aniqlanadi?', a: 'Matn (gap) orqali.' },
      { q: 'Tuyuq nima?', a: 'Qofiyasi omonim so‘zlarga quriladigan to‘rt misrali she’r.' },
      { q: 'Paronimga misol keltiring.', a: 'Azim — azm, burch — burj.' },
    ],
  },

  /* ===================== 27 ===================== */
  {
    id: 'bioinformatika',
    source: 'IV bob «Fan va texnologiyalar» • 3-dars • 71–73-betlar',
    title: '«Bioinformatika qanday fan?»',
    short: 'Ilmiy-ommabop maqola tahlili, sabab va natija',
    lesson: [
      {
        title: 'Darsga kirish',
        text: 'Sarlavha asosida ayting-chi, matn nima haqida bo‘lishi mumkin? Baxtiyor Sheraliyevning ilmiy-ommabop maqolasi o‘qiladi.',
      },
      {
        title: 'Bioinformatika nima?',
        text: 'Bir necha o‘n yil avval biologiya va informatika alohida fanlar sifatida tushunilar edi. Ularning kesishgan nuqtasida bioinformatika paydo bo‘ldi.',
        rule: 'Bioinformatika — biologik ko‘rsatkichlarni ifodalashda foydalaniladigan usullar va dasturlarni ishlab chiquvchi fan.',
      },
      {
        title: 'Nega bu fan kerak bo‘ldi?',
        text: 'Tajribalar ko‘paygan sari biologik ma’lumotlar hajmi shunchalik ortadiki, ularni qo‘lda tahlil qilish qiyinlashadi.',
        list: [
          'Kompyuter ma’lumotlarni dastur asosida hisoblaydi, guruhlarga ajratadi, tahlil qiladi, qayta ishlaydi.',
          'Ish aniq va qisqa vaqtda bajariladi.',
          'Integratsiyalashgan fanlar alohida fanlarga qaraganda katta natijaga erishadi.',
          'Dasturlashni biladigan biologga mehnat bozorida talab katta.',
        ],
      },
      {
        title: 'Qayerda qo‘llanadi?',
        text: 'Bioinformatikaga talab ortib borayotgan sohalar:',
        examples: ['farmatsevtika', 'biotexnologiya', 'tibbiyot', 'biokimyo', 'biofizika', 'ekologiya', 'genetika', 'zoologiya', 'botanika'],
        note: 'Ayniqsa, turlarni aniqlashda bioinformatika usullari keng qo‘llanmoqda.',
      },
      {
        title: 'Qisqacha tarixi',
        text: 'Bioinformatika atamasi va ilk tadqiqotlar:',
        table: {
          head: ['Davr', 'Voqea'],
          rows: [
            ['1950-yillar', 'Frederik Senjer insulin oqsilining ketma-ketligini aniqlaydi — kompyuterning ahamiyati orta boshlaydi'],
            ['1970-yil', 'Polina Hogeveg va Ben Hesper «bioinformatika» atamasini qo‘llaydi'],
            ['Ilk tadqiqotchi', 'Margaret Oukli Deyhoff oqsil ketma-ketliklarini to‘plab, kitob qilib chop etadi'],
          ],
        },
        note: 'NCBI direktori Devid Lipman Deyhoffni «bioinformatikaning otasi va onasi» deb atagan.',
      },
      {
        title: 'Asosiy vazifasi va evolyutsion biologiya',
        text: 'Hujayradagi barcha ko‘rsatkichlarni (nukleotid va aminokislotalar ketma-ketligi, oqsil tuzilishi) umumlashtirish, tahlil qilish va talqin etish. Bu jarayon hisoblash biologiyasi deyiladi.',
        list: [
          'Organizmlar DNKsidagi o‘zgarishlarni o‘rganib, evolyutsiyani tadqiq etish',
          'Butun boshli genomlarni solishtirish',
          'Populyatsiyalarning kompyuter modelini ishlab chiqish',
          'Ko‘p turlar haqidagi ma’lumotlarni jamlagan maqolalar yaratish',
        ],
      },
      {
        title: 'Atamalar (4.10)',
        text: 'Matndagi so‘zlar izohi:',
        table: {
          head: ['Atama', 'Izohi'],
          rows: [
            ['integratsiya', 'fanlarning o‘zaro bog‘lanish jarayoni'],
            ['tadqiqotchi', 'tekshirish, o‘rganish ishlari bilan shug‘ullanuvchi shaxs'],
            ['genetika', 'irsiyat va irsiy o‘zgarishlarni o‘rganadigan soha'],
            ['insulin', 'uglevod almashinuvini tartibga soluvchi gormon'],
            ['nukleotid', 'nuklein kislotalar va biologik faol birikmalarning tarkibiy qismi'],
            ['aminokislota', 'amin va karboksil guruhi bor organik birikma'],
            ['domen', 'oqsilning alohida tuzilmaviy qismi (darslikda izohi berilmagan)'],
          ],
        },
      },
      {
        title: 'Matn bo‘yicha topshiriqlar (4.11)',
        text: 'Savollar:',
        list: [
          'Maqola nima maqsadda yozilgan?',
          'Bioinformatikaga zarurat paydo bo‘lishining sababi nima?',
          'Bioinformatika qaysi fanlar integratsiyasidan paydo bo‘lgan?',
          'Yana qaysi fanlar integratsiyasi taraqqiyotga xizmat qilmoqda?',
        ],
        note: 'Sabab — natija: ma’lumotlar hajmi ortib, qo‘lda tahlil qiyinlashdi → bioinformatika fani paydo bo‘ldi.',
      },
    ],
    pairs: [
      ['Bioinformatika', 'Biologik ma’lumotlar uchun dasturlar'],
      ['integratsiya', 'Fanlarning bog‘lanishi'],
      ['insulin', 'Uglevod almashinuvi gormoni'],
      ['genetika', 'Irsiyatni o‘rganuvchi soha'],
      ['1970-yil', '«Bioinformatika» atamasi'],
      ['Deyhoff', 'Ilk tadqiqotchi'],
    ],
    quiz: [
      { q: 'Bioinformatikaning to‘g‘ri ta’rifi?', options: ['biologik ko‘rsatkichlarni ifodalash usul va dasturlarini ishlab chiquvchi fan', 'faqat kompyuter fani', 'faqat o‘simliklarni o‘rganuvchi fan', 'tarix fani'], answer: 0 },
      { q: '«Bioinformatika» atamasi qachon qo‘llangan?', options: ['1970-yilda', '1950-yilda', '1900-yilda', '2000-yilda'], answer: 0 },
      { q: 'Bioinformatika qaysi fanlar kesishgan nuqtada paydo bo‘lgan?', options: ['biologiya va informatika', 'kimyo va tarix', 'fizika va adabiyot', 'geografiya va musiqa'], answer: 0 },
      { q: 'Kim «bioinformatikaning otasi va onasi» deb atalgan?', options: ['Margaret Oukli Deyhoff', 'Frederik Senjer', 'Devid Lipman', 'Ben Hesper'], answer: 0 },
      { q: '«Integratsiya» so‘zining ma’nosi?', options: ['fanlarning o‘zaro bog‘lanishi', 'ajralish', 'tahlil', 'tajriba'], answer: 0 },
    ],
    sort: {
      categories: ['Sabab', 'Natija'],
      items: [
        { text: 'Biologik ma’lumotlar hajmi ortdi', cat: 0 }, { text: 'Bioinformatika fani paydo bo‘ldi', cat: 1 },
        { text: 'Qo‘lda tahlil qilish qiyinlashdi', cat: 0 }, { text: 'Biolog IT ga ehtiyoj sezdi', cat: 1 },
        { text: 'Biolog dasturlashni biladi', cat: 0 }, { text: 'Mehnat bozorida unga talab katta', cat: 1 },
        { text: 'Kompyuter dastur asosida hisoblaydi', cat: 0 }, { text: 'Ish aniq va tez bajariladi', cat: 1 },
      ],
    },
    qa: [
      { q: 'Bioinformatikaga zarurat nega paydo bo‘ldi?', a: 'Biologik ma’lumotlar hajmi juda ortib, ularni qo‘lda tahlil qilish qiyinlashdi.' },
      { q: 'Bioinformatikaning asosiy vazifasi nima?', a: 'Hujayradagi barcha ko‘rsatkichlarni umumlashtirish, tahlil qilish va talqin etish.' },
      { q: 'Bioinformatika qo‘llanadigan uchta sohani ayting.', a: 'Masalan: tibbiyot, farmatsevtika, genetika.' },
      { q: 'Maqola qanday uslubda yozilgan?', a: 'Ilmiy-ommabop uslubda.' },
      { q: 'Integratsiyalashgan fanlarning afzalligi nima?', a: 'Ular alohida fanlarga qaraganda katta natijalarga erisha oladi.' },
    ],
  },

  /* ===================== 28 ===================== */
  {
    id: 'aniqlovchi',
    source: 'IV bob «Fan va texnologiyalar» • 4-dars • 74–76-betlar',
    title: 'Aniqlovchi va uning turlari',
    short: 'Sifatlovchi, qaratqich aniqlovchi, izohlovchi',
    lesson: [
      {
        title: 'Omonimlarni topish (4.12)',
        text: '«Bioinformatika» matnidagi gaplarda omonim so‘zlarni toping va ikkinchi ma’nosida gap tuzing.',
        examples: ['tur (biologik tur) — tur (bosqich, aylanma)', 'bozor (savdo joyi) — mehnat bozori'],
        note: '4.13: ta’lim, transport yoki sog‘liqni saqlash sohasidan birida zamonaviy texnologiyalardan foydalanish haqida ishonchli va qiziqarli ma’lumot to‘plang.',
      },
      {
        title: 'Aniqlovchi',
        text: '«Biologik ko‘rsatkichlarni kompyuter unga yuklangan dastur asosida hisoblaydi» gapida «yuklangan» so‘zi «dastur»ning belgisini bildiradi.',
        rule: 'Aniqlovchilar shaxs, narsa-buyum, joyning belgisi hamda qarashliligini bildirib, qanday? qanaqa? qaysi? nechta? nechanchi? kimning? nimaning? qayerning? so‘roqlaridan biriga javob bo‘ladi.',
      },
      {
        title: 'Aniqlovchi turlari',
        text: 'Aniqlovchi ikki turga bo‘linadi:',
        table: {
          head: ['Turi', 'Nimani bildiradi', 'Misollar'],
          rows: [
            ['Sifatlovchi aniqlovchi', 'belgi-xususiyat', 'ezgu niyat, uchinchi qavat, dong‘i ketgan astronom, mana bu bino, oqar daryo, g‘ir-g‘ir shabada'],
            ['Qaratqich aniqlovchi', 'qarashlilik', 'mening orzum, olimning ixtirosi, o‘nning yarmi, yurt ravnaqi, shahar ko‘chalari'],
          ],
        },
      },
      {
        title: 'Izohlovchi',
        text: 'Izohlovchi — aniqlovchining bir ko‘rinishi.',
        rule: 'Izohlovchi shaxs yoki narsani boshqacha nom bilan ifodalaydi: unvon, kasb, laqab, qarindoshlik, jins, o‘xshatish, taxallus kabilarni bildiradi.',
        examples: ['dasturchi-muhandis', 'akademik G‘ulomov', 'To‘lqin bobo', 'direktor Azizov', 'professor Umarov'],
        note: 'Aniqlovchi gapda asosan ot bilan ifodalangan bo‘laklarga bog‘lanadi: rivojlangan davlatlar, Beruniyning kashfiyoti.',
      },
      {
        title: 'Matndan aniqlovchilar (4.15)',
        text: '«Bioinformatika qanday fan?» matnidan aniqlovchilarni ajratamiz:',
        table: {
          head: ['Qarashlilikni bildiruvchi', 'Belgi-xususiyatni bildiruvchi'],
          rows: [
            ['kompyuterlarning ahamiyati', 'rivojlangan davlatlar'],
            ['biologiyaning sohasi', 'biologik ma’lumotlar'],
            ['hujayraning holati', 'integratsiyalashgan fanlar'],
            ['insulin oqsilining ketma-ketligi', 'yuqori daromad'],
          ],
        },
      },
      {
        title: 'Hukmlarni tekshirish (4.17)',
        text: 'Hukmlar to‘g‘rimi?',
        table: {
          head: ['Hukm', 'Javob'],
          rows: [
            ['«Ertaga bo‘ladigan olimpiadada» — aniqlovchi bitta so‘z bilan ifodalangan.', 'noto‘g‘ri: so‘z birikmasi bilan'],
            ['«Direktor Azizov» — izohlovchi qatnashgan.', 'to‘g‘ri'],
            ['«Ko‘rgazmadagi suratlar barchamizga yoqdi» — aniqlovchi yo‘q.', 'noto‘g‘ri: «ko‘rgazmadagi» — aniqlovchi'],
            ['«Ko‘z ko‘rib, quloq eshitmagan xabar» — aniqlovchi ibora bilan ifodalangan.', 'to‘g‘ri'],
            ['«Tikansiz gul, sadafsiz dur, mashaqqatsiz hunar» — ikkita aniqlovchi.', 'noto‘g‘ri: uchta'],
            ['«G‘ir-g‘ir shabada» — aniqlovchi sifat bilan ifodalangan.', 'noto‘g‘ri: taqlid so‘z bilan'],
          ],
        },
      },
      {
        title: 'Aniqlovchi bilan gap tuzish (4.16)',
        text: 'So‘zlardan aniqlovchi sifatida foydalanib gap tuzing va ular qaysi turkum bilan ifodalanganini ayting:',
        examples: ['Bektemirning (ot)', 'to‘rt-besh kishilik (son)', 'ana shu (olmosh)', 'ziyrak (sifat)', 'mayin esgan (sifatdosh)', 'gurs-gurs (taqlid)'],
      },
    ],
    pairs: [
      ['ezgu niyat', 'Sifatlovchi aniqlovchi'],
      ['olimning ixtirosi', 'Qaratqich aniqlovchi'],
      ['akademik G‘ulomov', 'Izohlovchi'],
      ['qanday? qaysi?', 'Aniqlovchi so‘roqlari'],
      ['kimning? nimaning?', 'Qaratqich so‘roqlari'],
      ['g‘ir-g‘ir shabada', 'Taqlid so‘zli aniqlovchi'],
    ],
    quiz: [
      { q: 'Aniqlovchi qaysi so‘roqqa javob beradi?', options: ['qanday? qaysi? kimning?', 'kimni? nimani?', 'qachon? qayerda?', 'nima qildi?'], answer: 0 },
      { q: '«Olimning ixtirosi» birikmasida qanday aniqlovchi bor?', options: ['qaratqich aniqlovchi', 'sifatlovchi aniqlovchi', 'izohlovchi', 'hol'], answer: 0 },
      { q: '«Akademik G‘ulomov» birikmasida «akademik» —', options: ['izohlovchi', 'qaratqich aniqlovchi', 'to‘ldiruvchi', 'kesim'], answer: 0 },
      { q: 'Aniqlovchi gapda asosan qaysi bo‘lakka bog‘lanadi?', options: ['ot bilan ifodalangan bo‘lakka', 'fe’lga', 'undalmaga', 'kirish so‘zga'], answer: 0 },
      { q: '«Tikansiz gul, sadafsiz dur, mashaqqatsiz hunar bo‘lmas» — nechta aniqlovchi?', options: ['uchta', 'ikkita', 'bitta', 'to‘rtta'], answer: 0 },
    ],
    sort: {
      categories: ['Sifatlovchi', 'Qaratqich', 'Izohlovchi'],
      items: [
        { text: 'ezgu niyat', cat: 0 }, { text: 'mening orzum', cat: 1 }, { text: 'akademik G‘ulomov', cat: 2 },
        { text: 'uchinchi qavat', cat: 0 }, { text: 'yurt ravnaqi', cat: 1 }, { text: 'To‘lqin bobo', cat: 2 },
        { text: 'oqar daryo', cat: 0 }, { text: 'shahar ko‘chalari', cat: 1 }, { text: 'professor Umarov', cat: 2 },
      ],
    },
    qa: [
      { q: 'Aniqlovchining qanday turlari bor?', a: 'Sifatlovchi va qaratqich aniqlovchi; izohlovchi — aniqlovchining bir ko‘rinishi.' },
      { q: 'Izohlovchi nimalarni bildiradi?', a: 'Unvon, kasb, laqab, qarindoshlik, jins, o‘xshatish, taxallus.' },
      { q: '«Ko‘rgazmadagi suratlar» birikmasida aniqlovchini toping.', a: '«Ko‘rgazmadagi».' },
      { q: 'Qaratqich aniqlovchiga misol keltiring.', a: 'Masalan: olimning ixtirosi, yurt ravnaqi.' },
      { q: '«G‘ir-g‘ir shabada»da aniqlovchi qaysi so‘z turkumi bilan ifodalangan?', a: 'Taqlid so‘z bilan.' },
    ],
  },

  /* ===================== 29 ===================== */
  {
    id: 'tovush-ozgarishi',
    source: 'IV bob «Fan va texnologiyalar» • 5-dars • 76–79-betlar',
    title: 'Tovush o‘zgarishlari. Kartogramma',
    short: 'Aniqlovchili birikmalar, asos va qo‘shimchadagi o‘zgarishlar, kartogramma',
    lesson: [
      {
        title: 'Hikoyat va aniqlovchilar (4.18)',
        text: 'Ibratli hikoyatda bo‘sh o‘rinlarni aniqlovchilar bilan to‘ldiring: oliyjanob, bir, mo‘tabar, fozil, ming, yaxshi, shafqatli...',
        list: [
          'Bir mo‘tabar odam fozil olimni majlisiga taklif qiladi.',
          'Olim unga «Ming yil umr ko‘ring» deydi.',
          'Mezbon hayron bo‘ladi: odam ming yil yashashiga aql bovar qiladimi?',
          'Olim tushuntiradi: o‘lgandan keyin qolgan yaxshi nom — yana bir umr.',
        ],
        rule: 'Xulosa: insonning yaxshi nomi va qilgan yaxshiligi uni xalq xotirasida abadiy yashatadi.',
      },
      {
        title: 'Aniqlovchili birikmalardagi xatolar (4.19)',
        text: 'Xato yozilgan birikmalar va to‘g‘ri shakli:',
        table: {
          head: ['Xato', 'To‘g‘ri'],
          rows: [
            ['olimlarni fikrlari', 'olimlarning fikrlari'],
            ['noyop eksponatlar', 'noyob eksponatlar'],
            ['seni savoling', 'sening savoling'],
            ['aqilli robotlar', 'aqlli robotlar'],
            ['muammoni oldini olmoq', 'muammoning oldini olmoq'],
            ['kompyuterni ekrani', 'kompyuterning ekrani'],
            ['qutib yog‘dulari', 'qutb yog‘dulari'],
            ['tarixning muzeyi', 'tarix muzeyi'],
            ['raqamlik platformalar', 'raqamli platformalar'],
          ],
        },
      },
      {
        title: 'Asos va qo‘shimchada tovush o‘zgarishi (4.21)',
        text: 'So‘zga qo‘shimcha qo‘shilganda tovush almashadi, tushadi yoki orttiriladi:',
        table: {
          head: ['So‘z + qo‘shimcha', 'Natija', 'O‘zgarish'],
          rows: [
            ['tara + q', 'taroq', 'tovush almashishi (a → o)'],
            ['sayra + q', 'sayroq', 'tovush almashishi'],
            ['bir + ta', 'bitta', 'r → t'],
            ['yig‘i + la', 'yig‘la', 'i tushishi'],
            ['sust + ay', 'susay', 't tushishi'],
            ['ikki + ala', 'ikkala', 'i tushishi'],
            ['buyur + q', 'buyruq', 'tushish va almashish'],
            ['shahar + im', 'shahrim', 'a tushishi'],
            ['tilak + ing', 'tilaging', 'k → g'],
            ['men + ning', 'mening', 'n tushishi'],
          ],
        },
      },
      {
        title: 'Imlo (4.22)',
        text: 'To‘g‘ri va xato yozilgan so‘zlar:',
        table: {
          head: ['Xato', 'To‘g‘ri'],
          rows: [
            ['soviq, quriq', 'sovuq, quruq'],
            ['yurakga, yo‘lakga', 'yurakka, yo‘lakka'],
            ['ravnag‘i', 'ravnaqi'],
            ['bargka', 'bargga'],
            ['o‘qivchi', 'o‘quvchi'],
            ['tayoqi', 'tayog‘i'],
            ['tuproqga', 'tuproqqa'],
            ['shovilla', 'shovulla'],
          ],
        },
        note: 'To‘g‘ri yozilganlar: tokka, yaproqqa, bog‘ga, uzoqqa, toqqa, tilagim, obro‘yim, orzuyim, gurulla, lovulla.',
      },
      {
        title: 'Kartogramma (4.23)',
        text: 'Kartogrammada 2023-yil holatiga ko‘ra internet tarmog‘iga ulangan abonentlar soni hududlar kesimida rang bilan ko‘rsatilgan.',
        table: {
          head: ['Hudud', 'Abonentlar soni'],
          rows: [
            ['Toshkent shahri', '6274'],
            ['Farg‘ona', '3752'],
            ['Samarqand', '2706'],
            ['Andijon', '2293'],
            ['Qashqadaryo', '2134'],
            ['Namangan', '2037'],
            ['Toshkent viloyati', '1954'],
            ['Surxondaryo', '1702'],
            ['Buxoro / Qoraqalpog‘iston / Xorazm', '1519 / 1505 / 1482'],
            ['Jizzax / Navoiy / Sirdaryo', '1007 / 946 / 749'],
          ],
        },
      },
      {
        title: 'Kartogramma, jadval, diagramma (4.24–4.25)',
        text: 'Bir xil ma’lumot uch xil shaklda berilishi mumkin. Har birining afzalligi bor:',
        table: {
          head: ['Shakl', 'Afzalligi', 'Kamchiligi'],
          rows: [
            ['Kartogramma', 'hududlarning joylashuvi ko‘rinadi', 'aniq raqam ko‘rinmaydi'],
            ['Jadval', 'aniq raqamlar beriladi', 'taqqoslash qiyinroq'],
            ['Diagramma', 'taqqoslash oson, ko‘rgazmali', 'joylashuv ko‘rinmaydi'],
          ],
        },
        note: 'Tekshiring: «Toshkent viloyatida abonentlar boshqa barcha hududlardagidan ko‘p» — noto‘g‘ri (eng ko‘p Toshkent shahrida). Ijodiy ish (4.26): «Foydali ilmlar» mavzusida matn yozing.',
      },
    ],
    pairs: [
      ['bir + ta', 'bitta'],
      ['shahar + im', 'shahrim'],
      ['men + ning', 'mening'],
      ['tilak + ing', 'tilaging'],
      ['yig‘i + la', 'yig‘la'],
      ['buyur + q', 'buyruq'],
    ],
    quiz: [
      { q: '«Shahar + im» qanday yoziladi?', options: ['shahrim', 'shaharim', 'shahrrim', 'shahrem'], answer: 0 },
      { q: '«Men + ning» qanday yoziladi?', options: ['mening', 'menning', 'menin', 'meniing'], answer: 0 },
      { q: 'Qaysi birikma to‘g‘ri?', options: ['kompyuterning ekrani', 'kompyuterni ekrani', 'kompyuterga ekrani', 'kompyuterda ekrani'], answer: 0 },
      { q: 'Kartogrammaga ko‘ra eng ko‘p abonent qayerda?', options: ['Toshkent shahrida', 'Toshkent viloyatida', 'Farg‘onada', 'Samarqandda'], answer: 0 },
      { q: 'To‘g‘ri yozilgan so‘z?', options: ['tuproqqa', 'tuproqga', 'tuproqka', 'tuprog‘ga'], answer: 0 },
      { q: 'Qaysi shakl hududlar joylashuvini ko‘rsatadi?', options: ['kartogramma', 'jadval', 'diagramma', 'ro‘yxat'], answer: 0 },
    ],
    sort: {
      categories: ['Tovush tushishi', 'Tovush almashishi'],
      items: [
        { text: 'shahar + im → shahrim', cat: 0 }, { text: 'bir + ta → bitta', cat: 1 },
        { text: 'yig‘i + la → yig‘la', cat: 0 }, { text: 'tilak + ing → tilaging', cat: 1 },
        { text: 'men + ning → mening', cat: 0 }, { text: 'tara + q → taroq', cat: 1 },
        { text: 'ikki + ala → ikkala', cat: 0 }, { text: 'saboq + im → sabog‘im', cat: 1 },
      ],
    },
    qa: [
      { q: 'Hikoyatdagi olimning «Ming yil umr ko‘ring» degan gapi ma’nosi nima?', a: 'Yaxshi nom va yaxshilik inson vafotidan keyin ham uni xalq xotirasida yashatadi.' },
      { q: '«Olimlarni fikrlari» birikmasini to‘g‘rilang.', a: '«Olimlarning fikrlari».' },
      { q: 'Qo‘shimcha qo‘shilganda qanday tovush o‘zgarishlari bo‘ladi?', a: 'Tovush almashishi, tushishi yoki orttirilishi.' },
      { q: 'Jadvalning afzalligi va kamchiligi nima?', a: 'Aniq raqam beradi, lekin taqqoslash va joylashuvni ko‘rish qiyinroq.' },
      { q: 'Kartogrammada eng kam abonent qaysi hududda?', a: 'Sirdaryo viloyatida (749).' },
    ],
  },

  /* ===================== 30 ===================== */
  {
    id: 'aniq-mavhum',
    source: 'IV bob «Fan va texnologiyalar» • 6-dars • 79–81-betlar',
    title: 'Samolyot tarixi. Aniq va mavhum otlar',
    short: 'Audiomatn tahlili, aniq va mavhum otlar',
    lesson: [
      {
        title: 'Darsga kirish',
        text: 'Sizga «samolyot», «tayyora», «uchoq» kabi so‘zlarning qay biridan foydalanish qulay? Javobingizni izohlang.',
        note: '«Samolyot qachon yaratilgan?» audiomatni darslikdagi QR kod orqali tinglanadi (4.27).',
      },
      {
        title: 'Atamalar boshqotirmasi (4.28)',
        text: 'Izohlarga mos so‘zlar:',
        table: {
          head: ['Izoh', 'So‘z'],
          rows: [
            ['muayyan ishni bajarishga xizmat qiluvchi asbob, moslama', 'apparat'],
            ['dvigatelsiz, uchburchak qanotli uchish qurilmasi', 'deltaplan'],
            ['kema yoki samolyotni harakatga keltiruvchi parrak', 'vint'],
            ['mashina, inshoot loyihasini tuzuvchi mutaxassis', 'konstruktor'],
            ['energiyani mexanik energiyaga aylantiruvchi uskuna', 'dvigatel'],
            ['havo va gazlar harakatini o‘rganuvchi fan', 'aerodinamika'],
          ],
        },
      },
      {
        title: 'Samolyot tarixi (4.29)',
        text: 'Audiomatnda tilga olingan ixtirochilar va sanalar:',
        table: {
          head: ['Sana / shaxs', 'Voqea'],
          rows: [
            ['Leonardo da Vinchi', 'qanotlar bilan uchish rejasini birinchilardan bo‘lib o‘ylab topgan'],
            ['1660-yil', 'Robert Guk uchish apparatini qurishga urinib ko‘radi'],
            ['Jorj Keyli', 'samolyot qurishga imkon beruvchi parrak ustida ishlagan'],
            ['1882-yil', 'Aleksandr Mojaskiy birinchi samolyotni yaratib, parvozga erishadi'],
            ['1903-yil', 'Aka-uka Raytlar «Flayer-1»ga yengil dvigatel o‘rnatib, uni uchirishadi'],
          ],
        },
        note: 'Ilk samolyotlarga ehtiyoj harbiy sohada paydo bo‘lgan. Bugun samolyotlar yo‘lovchi va yuk tashish, qishloq xo‘jaligi, qutqaruv ishlarida ishlatiladi.',
      },
      {
        title: 'Aniq va mavhum otlar',
        text: 'Dengiz, gazeta, minorani sezgi a’zolarimiz orqali bilamiz. Odamiylik, do‘stlikni-chi?',
        table: {
          head: ['Turi', 'Ta’rifi', 'Misol'],
          rows: [
            ['Aniq otlar', 'sezgi a’zolari orqali anglanadigan tushunchalar', 'olim, qurilma, maktab, kitob, changyutkich, bino'],
            ['Mavhum otlar', 'tafakkur va tasavvur orqali idrok qilinadigan tushunchalar', 'fikr, tuyg‘u, sevgi, tilak, dadillik, o‘kinch, odamgarchilik'],
          ],
        },
      },
      {
        title: 'Ko‘plik shaklida',
        text: 'Aniq va mavhum otlar ko‘plik qo‘shimchasini olganda turli ma’no beradi.',
        rule: 'Aniq otlar ko‘plik shaklida ko‘plik ma’nosini bildiradi. Mavhum otlar ko‘plik shaklida kuchaytirish, ta’kidlash ma’nolarini ifodalaydi.',
        examples: ['kitoblar — ko‘p kitob', 'U qalbida kechayotgan tuyg‘ularning nomini bilmas edi — kuchaytirish'],
      },
      {
        title: 'Otlarni ajratish (4.30)',
        text: 'Audiomatndan olingan so‘zlar:',
        table: {
          head: ['Aniq otlar', 'Mavhum otlar'],
          rows: [
            ['havo, apparat, qush', 'g‘oya, fikr, quvvat'],
            ['qanot, samolyot, bug‘', 'balandlik, vaqt, tezlik'],
            ['vint, dvigatel, rul', 'parvoz, samolyotsozlik'],
            ['parrak, model, sxema', 'buyurtma'],
          ],
        },
      },
    ],
    pairs: [
      ['Leonardo da Vinchi', 'Qanotli uchish rejasi'],
      ['1882-yil', 'Mojaskiy samolyoti'],
      ['1903-yil', 'Raytlar «Flayer-1»'],
      ['Aniq ot', 'Sezgi orqali anglanadi'],
      ['Mavhum ot', 'Tafakkur orqali anglanadi'],
      ['aerodinamika', 'Havo harakati fani'],
    ],
    quiz: [
      { q: 'Aka-uka Raytlar «Flayer-1»ni qachon uchirishgan?', options: ['1903-yilda', '1882-yilda', '1660-yilda', '1870-yilda'], answer: 0 },
      { q: 'Qaysi ot mavhum?', options: ['do‘stlik', 'kitob', 'bino', 'samolyot'], answer: 0 },
      { q: 'Qaysi ot aniq?', options: ['dvigatel', 'g‘oya', 'tezlik', 'fikr'], answer: 0 },
      { q: 'Mavhum otlar ko‘plikda qanday ma’no beradi?', options: ['kuchaytirish, ta’kidlash', 'faqat ko‘plik', 'kichraytirish', 'hurmat'], answer: 0 },
      { q: 'Havo va gazlar harakatini o‘rganuvchi fan?', options: ['aerodinamika', 'geografiya', 'kimyo', 'biologiya'], answer: 0 },
      { q: '1882-yilda birinchi samolyotni kim yaratgan?', options: ['Aleksandr Mojaskiy', 'Robert Guk', 'Leonardo da Vinchi', 'Jorj Keyli'], answer: 0 },
    ],
    sort: {
      categories: ['Aniq ot', 'Mavhum ot'],
      items: [
        { text: 'samolyot', cat: 0 }, { text: 'g‘oya', cat: 1 },
        { text: 'qanot', cat: 0 }, { text: 'balandlik', cat: 1 },
        { text: 'dvigatel', cat: 0 }, { text: 'tezlik', cat: 1 },
        { text: 'parrak', cat: 0 }, { text: 'parvoz', cat: 1 },
        { text: 'qush', cat: 0 }, { text: 'odamgarchilik', cat: 1 },
      ],
    },
    qa: [
      { q: 'Aniq va mavhum otning farqi nima?', a: 'Aniq ot sezgi a’zolari bilan anglanadi, mavhum ot — tafakkur va tasavvur bilan.' },
      { q: '«Tuyg‘ular» so‘zida -lar qanday ma’no beradi?', a: 'Kuchaytirish, ta’kidlash ma’nosini.' },
      { q: 'Aka-uka Raytlarning muvaffaqiyati nimada?', a: '1903-yilda yengil dvigatelli «Flayer-1» samolyotini uchirishgan.' },
      { q: 'Ilk samolyotlarga ehtiyoj qaysi sohada paydo bo‘lgan?', a: 'Harbiy sohada.' },
      { q: 'Uchta mavhum otga misol keltiring.', a: 'Masalan: fikr, sevgi, do‘stlik.' },
    ],
  },
];

/* --- 8-sinf Ona tili: 31–40-darslar (darslik 2025, 82–106-betlar) --- */
const ONA_TILI_8_PART4 = [
  /* ===================== 31 ===================== */
  {
    id: 'paronimlar',
    source: 'IV bob «Fan va texnologiyalar» • 7-dars • 82–84-betlar',
    title: 'Paronimlar',
    short: 'Mavhum otlar tahlili, paronimlar va ularni farqlash',
    lesson: [
      {
        title: 'Mavhum otlar tahlili (4.31)',
        text: 'Gaplar va hukmlarni moslashtiramiz:',
        table: {
          head: ['Gap', 'Hukm'],
          rows: [
            ['Milliy bayramlarimiz insoniyatni hamjihatlikka, birodarlikka va samimiyatga chorlaydi.', '3 ta mavhum ot bor'],
            ['Bu mehmonimiz — shaharlik.', 'mavhum ot emas, shaxs oti'],
            ['Sevinch esdan chiqadi-yu, qayg‘u unutilmaydi.', '2 ta mavhum ot'],
            ['O‘sha tuyg‘ular o‘rnini shafqat, hamdardlik, odamiylik egallab oldi.', '3 ta yasama, 1 ta tub mavhum ot'],
            ['U turfa xayollar og‘ushida qoldi.', 'mavhum ot ko‘plik shaklida'],
          ],
        },
        note: '4.32: zamonaviy texnologiyalarning foydasi va zarari haqidagi ikki xil qarashga dalillar toping.',
      },
      {
        title: 'Paronimlar',
        text: 'Ba’zi so‘zlar talaffuzda deyarli bir xil eshitiladi, ammo ma’nosi butunlay boshqa.',
        rule: 'Paronimlar talaffuzi bir xil yoki bir-biriga yaqin, ammo yozilishi va ma’nosi har xil bo‘lgan so‘zlardir.',
        examples: ['tussiz — tuzsiz', 'afzal — abzal', 'sher — she’r', 'adib — adip', 'surat — sur’at'],
      },
      {
        title: 'Paronimlarning ahamiyati',
        text: 'Paronimlar o‘xshash eshitilgani uchun badiiy adabiyotda qofiya sifatida ishlatiladi.',
        rule: 'Paronimlarni bilmaslik so‘z qo‘llash bilan bog‘liq xatolarni yuzaga keltiradi.',
        table: {
          head: ['Xato', 'To‘g‘ri'],
          rows: [['Hiyla tajribasiz ekansiz.', 'Xiyla tajribasiz ekansiz. (xiyla — ancha)']],
        },
      },
      {
        title: 'Paronim juftlar (4.33)',
        text: 'So‘zlarning paronim jufti va ma’nosi:',
        table: {
          head: ['So‘z', 'Paronimi', 'Farqi'],
          rows: [
            ['surat — rasm, tasvir', 'sur’at', 'tezlik, jadallik'],
            ['asr — yuz yil', 'asir', 'tutqun'],
            ['afzal — ustun, yaxshiroq', 'abzal', 'ot-ulov anjomi'],
            ['qayd — yozib qo‘yish', 'qayt', 'qaytmoq'],
            ['xolos — faqat, xolos', 'xalos', 'qutulish'],
            ['iz — oyoq izi', 'is', 'hid'],
            ['shoh — podshoh', 'shox', 'daraxt shoxi; hayvon shoxi'],
          ],
        },
      },
      {
        title: 'Mos so‘zni tanlash (4.34, 4.37)',
        text: 'Gap mazmuniga mos paronim:',
        table: {
          head: ['Gap', 'To‘g‘ri so‘z'],
          rows: [
            ['Halol non jahon ...idan afzalroq.', 'ganj (xazina)'],
            ['«Qalb ... etsa, aql unga bo‘ysunar.»', 'amr (buyruq)'],
            ['Tanlovda ... natijani qo‘lga kiritish uchun...', 'ijobiy'],
            ['Olim bo‘lishga ... qilgan.', 'azm (qat’iy niyat)'],
            ['Bozorda ... go‘shtning narxi...', 'lahm (yog‘siz)'],
            ['Aqling ... bo‘lsa, vaqtingni behuda o‘tkazma.', 'raso (to‘liq, yetuk)'],
            ['Nasiya sariyog‘dan ... o‘pka yaxshi.', 'naqd'],
            ['Vaqtni behuda ... lozim.', 'o‘tkazmaslik'],
          ],
        },
      },
      {
        title: 'Izohga mos paronim (4.36)',
        text: 'Paronim juftlar va izohlari:',
        table: {
          head: ['So‘z', 'Izohi'],
          rows: [
            ['kompas', 'dunyo tomonlarini aniqlaydigan asbob'],
            ['kompost', 'chiqindilardan tayyorlanadigan organik o‘g‘it'],
            ['mahal', 'vaqt, dam, payt'],
            ['mahol', 'amalga oshishi qiyin, mushkul'],
            ['burch', 'bajarilishi majburiy vazifa'],
            ['burj', '12 ta yulduz turkumidan biri'],
            ['ganch', 'suvoq uchun qurilish materiali'],
            ['ganj', 'xazina, boylik'],
          ],
        },
      },
      {
        title: 'Loyiha: paronimlar lug‘ati (4.38)',
        text: 'Izohli lug‘atdan 10 ta paronim juftlik topib, jadval shaklida kichik o‘quv lug‘ati tayyorlang.',
        table: {
          head: ['Juftlik', 'Tili', 'Turkumi', 'Izoh'],
          rows: [
            ['mox', 'ruscha', 'ot', 'zax yerda o‘sadigan mayda o‘simlik'],
            ['moh', 'arabcha', 'ot', 'oy (osmon jismi); 28–31 kunlik muddat'],
          ],
        },
        note: 'Taqdimot 2–3 daqiqadan oshmasin; nega aynan shu so‘zlarni tanlaganingizni izohlang.',
      },
    ],
    pairs: [
      ['surat', 'sur’at (tezlik)'],
      ['afzal', 'abzal'],
      ['ganj', 'ganch'],
      ['burch', 'burj'],
      ['mahal', 'mahol'],
      ['kompas', 'kompost'],
    ],
    quiz: [
      { q: 'Paronimlar qanday so‘zlar?', options: ['talaffuzi yaqin, yozilishi va ma’nosi har xil', 'ma’nosi bir xil', 'ma’nosi zid', 'shakli aynan bir xil'], answer: 0 },
      { q: '«Halol non jahon ...idan afzalroq» — mos so‘z?', options: ['ganj', 'ganch', 'gunj', 'kanj'], answer: 0 },
      { q: '«Sur’at» so‘zining ma’nosi?', options: ['tezlik, jadallik', 'rasm', 'kitob', 'tasvir'], answer: 0 },
      { q: '12 ta yulduz turkumidan biri?', options: ['burj', 'burch', 'burch-burj', 'buruj'], answer: 0 },
      { q: '«Xiyla tajribasiz ekansiz» gapida «xiyla» qanday ma’noda?', options: ['ancha', 'aldov', 'tez', 'oz'], answer: 0 },
      { q: '«Mahol» so‘zining ma’nosi?', options: ['qiyin, mushkul', 'vaqt, payt', 'joy', 'tez'], answer: 0 },
    ],
    sort: {
      categories: ['To‘g‘ri yozilgan', 'Xato yozilgan'],
      items: [
        { text: 'asl maqsad', cat: 0 }, { text: 'asil maqsad', cat: 1 },
        { text: 'borganim afzal', cat: 0 }, { text: 'borganim abzal', cat: 1 },
        { text: 'ipak qurti', cat: 0 }, { text: 'ipak quruti', cat: 1 },
        { text: 'yaroqli uskuna', cat: 0 }, { text: 'yarog‘li uskuna', cat: 1 },
        { text: 'yurak urishi', cat: 0 }, { text: 'yurak urushi', cat: 1 },
      ],
    },
    qa: [
      { q: 'Paronim nima?', a: 'Talaffuzi bir xil yoki yaqin, lekin yozilishi va ma’nosi har xil so‘zlar.' },
      { q: '«Asr» so‘zining paronimi va ma’nosini ayting.', a: '«Asir» — tutqun.' },
      { q: 'Nega paronimlarni bilish muhim?', a: 'Bilmaslik so‘z qo‘llashda xatoga olib keladi.' },
      { q: '«Ganch» va «ganj»ning farqi nima?', a: 'Ganch — qurilish materiali, ganj — xazina.' },
      { q: 'Paronimlar adabiyotda nima uchun ishlatiladi?', a: 'Talaffuzi o‘xshash bo‘lgani uchun qofiya sifatida.' },
    ],
  },

  /* ===================== 32 ===================== */
  {
    id: 'muqobil-sozlar',
    source: 'IV bob «Fan va texnologiyalar» • 8-dars • 85-bet',
    title: 'Paronimlar lug‘ati taqdimoti. Muqobil so‘zlar',
    short: 'Taqdimot va baholash, chet so‘zlarning o‘zbekcha muqobili',
    lesson: [
      {
        title: 'Lug‘at taqdimoti (4.39–4.40)',
        text: 'Tayyorlab kelgan «Paronimlar o‘quv lug‘ati»ni taqdim eting, so‘ng sinfdoshlaringiz taqdimotiga baho bering.',
        list: [
          'Ijodiy ishingiz haqida qisqacha nutq tayyorlang.',
          'Nima uchun aynan shu paronimlarni tanlaganingizni izohlang.',
          'Taqdimot 2–3 daqiqadan oshmasin.',
          'Sinfdoshlaringizga savol bering, yutuq va kamchiliklarni dalil bilan ayting.',
          'Xatolarni to‘g‘rilashga oid qisqa tavsiyalar yozib bering.',
        ],
      },
      {
        title: 'Til sandig‘i: muqobil so‘zlar',
        text: 'Isajon Sulton hayotimizga kirib kelgan chet so‘zlar uchun o‘zbekcha muqobillar taklif qiladi:',
        table: {
          head: ['Chet so‘z', 'Taklif etilgan muqobil'],
          rows: [
            ['poverbank', 'kuchluq; zamonaviyrog‘i — quvvatlagich'],
            ['barsetka (italyancha «borsetta»)', 'yonqopchiq, belqopchiq'],
            ['shtrix-kod', '«tamg‘a-chiziq» yoki «paysa»'],
            ['keshbek', 'qaytiq'],
          ],
        },
        note: 'Tilimiz narsa ifodalovchi so‘zlarga boy: to‘rva, xalta, qop, qopchiq, kissa, cho‘ntak, hamyon...',
      },
      {
        title: '«Paysa» so‘zi haqida',
        text: 'Muallifning izohiga ko‘ra, «paysa» bir vaqtlar mayda pulni bildirgan (Pokistonda hozir ham shunday). Eski turk uluslarida u nishon-yorliq sifatida kishining kimligi va rutbasini ifodalagan.',
        rule: 'Yangi tushunchaga muqobil so‘z tanlashda tilimizdagi eski so‘zlarga yangi ma’no yuklash mumkin.',
      },
      {
        title: 'Yakuniy ijodiy ish (4.42)',
        text: '«Fan va texnologiyalar» bo‘limida o‘rganganlaringiz asosida «Ilmli insonlarning jamiyat rivojidagi o‘rni» mavzusida 200–300 so‘zli matn tuzing.',
        list: ['Buyuk yurt allomalari misolini keltiring', 'Omonim, paronim, aniq va mavhum otlardan o‘rinli foydalaning', 'Fikrni dalil bilan asoslang'],
      },
    ],
    pairs: [
      ['poverbank', 'quvvatlagich'],
      ['barsetka', 'yonqopchiq'],
      ['shtrix-kod', 'tamg‘a-chiziq'],
      ['keshbek', 'qaytiq'],
      ['paysa', 'nishon-yorliq'],
      ['taqdimot', '2–3 daqiqa'],
    ],
    quiz: [
      { q: '«Poverbank» so‘zi uchun taklif etilgan muqobil?', options: ['quvvatlagich', 'yonqopchiq', 'qaytiq', 'tamg‘a'], answer: 0 },
      { q: '«Barsetka» so‘zining o‘zbekcha muqobili?', options: ['yonqopchiq', 'quvvatlagich', 'paysa', 'kissa-chiziq'], answer: 0 },
      { q: '«Barsetka» qaysi tildan kelgan?', options: ['italyan', 'ingliz', 'fransuz', 'nemis'], answer: 0 },
      { q: 'Muqobil so‘zlar tavsiyasi muallifi?', options: ['Isajon Sulton', 'Alibek Rustamov', 'Eshqobil Shukur', 'Anvar Boboyev'], answer: 0 },
      { q: 'Paronimlar lug‘ati taqdimoti qancha vaqt bo‘lishi kerak?', options: ['2–3 daqiqa', '10 daqiqa', '30 soniya', '1 soat'], answer: 0 },
    ],
    sort: {
      categories: ['Chet so‘z', 'O‘zbekcha muqobil'],
      items: [
        { text: 'poverbank', cat: 0 }, { text: 'quvvatlagich', cat: 1 },
        { text: 'barsetka', cat: 0 }, { text: 'yonqopchiq', cat: 1 },
        { text: 'shtrix-kod', cat: 0 }, { text: 'tamg‘a-chiziq', cat: 1 },
        { text: 'keshbek', cat: 0 }, { text: 'qaytiq', cat: 1 },
      ],
    },
    qa: [
      { q: 'Nega chet so‘zlarga muqobil topish kerak?', a: 'Ona tilini boyitish va uning sofligini saqlash uchun.' },
      { q: '«Shtrix-kod» uchun qanday muqobillar taklif qilingan?', a: '«Tamg‘a-chiziq» yoki «paysa».' },
      { q: 'Taqdimotdan keyin sinfdoshga qanday baho beriladi?', a: 'Yutuq va kamchiliklar dalil bilan aytiladi, qisqa tavsiya beriladi.' },
      { q: 'Tilimizda sumka ma’nosidagi qanday so‘zlar bor?', a: 'To‘rva, xalta, qop, qopchiq, kissa, hamyon.' },
      { q: '«Paysa» so‘zi qadimda nimani bildirgan?', a: 'Nishon-yorliq: kishining kimligi va rutbasini.' },
    ],
  },

  /* ===================== 33 ===================== */
  {
    id: 'kelajak-kasblari',
    source: 'V bob «Soha va kasblar» • 1-dars • 87–89-betlar',
    title: '«Kelajak kasblari»',
    short: 'Maqola tahlili, kasb haqidagi maqollar',
    lesson: [
      {
        title: 'Darsga kirish',
        text: 'Yangi bob — «Soha va kasblar».',
        list: ['Qaysi kasbni egallashni maqsad qilgansiz? Nima uchun?', 'Kasbingiz orqali soha rivojiga qanday hissa qo‘shmoqchisiz?'],
      },
      {
        title: 'Matn: qaysi kasblarga talab bo‘ladi?',
        text: 'Maqola (gazeta.uz) uchta savol bilan boshlanadi: kelajak uchun eng yaxshi kasb qaysi? qaysi sohada katta daromad topish mumkin? qanday mutaxassislarga talab yuqori?',
        rule: 'Kasb tanlashda avtomatlashtirish yoki sun’iy idrok bilan almashtirilishi mumkin bo‘lgan kasblardan qochish lozim — texnologiya rivojlangan sari ular ahamiyatini yo‘qotishi mumkin.',
      },
      {
        title: 'Yaqin 5 yilda talab yuqori kasblar',
        text: 'Muallif quyidagi kasblarni sanab o‘tadi:',
        table: {
          head: ['Kasb', 'Vazifasi'],
          rows: [
            ['Loyiha menejeri', 'loyiha maqsadi va rejasini belgilaydi, jamoani boshqaradi'],
            ['Dasturiy ta’minot ishlab chiqaruvchi', 'dastur yaratadi; malakali dasturchiga yuqori haq to‘lanadi'],
            ['Virtual olam dizayneri', 'VR gadjetlar uchun muhit yaratadi'],
            ['Marketing mutaxassisi', 'tovarni targ‘ib qiladi, brend imijini yaratadi va obro‘sini oshiradi'],
          ],
        },
      },
      {
        title: 'Muallifning asosiy fikri',
        text: 'Kasb tanlashda uning jamiyatdagi o‘rnidan ko‘ra o‘z qobiliyat va qiziqishlaringizni ko‘proq hisobga oling.',
        rule: 'Jamiyat uchun keraksiz kasbning o‘zi yo‘q. Istalgan soha obro‘yini oshirish unda ishlayotgan shaxslarga bog‘liq.',
      },
      {
        title: 'Yangi so‘zlar (5.1)',
        text: 'Matndagi atamalar:',
        table: {
          head: ['So‘z', 'Izohi'],
          rows: [
            ['menejer', 'maxsus tayyorgarlikka ega malakali ish boshqaruvchi'],
            ['investor', 'investitsiya faoliyatini amalga oshiruvchi shaxs yoki tashkilot'],
            ['moliya', 'pul mablag‘larini shakllantirish va sarflash tizimi'],
            ['virtual', 'dasturiy muhitda yaratilgan, noreal'],
            ['marketing', 'mahsulot ishlab chiqarish va sotish masalalari bilan shug‘ullanuvchi soha'],
          ],
        },
      },
      {
        title: 'Matn bo‘yicha topshiriqlar (5.2)',
        text: 'Matnga ko‘ra:',
        list: [
          'Ahamiyatini yo‘qotishi mumkin kasblar: faoliyatini avtomatlashtirish yoki sun’iy idrok bajarishi mumkin bo‘lganlar.',
          'Marketologning vazifalari: tovar va xizmatni targ‘ib qilish, brend imijini yaratish va saqlash, kompaniya obro‘yini oshirish.',
          'Kompaniyalar rivojlanish va katta natija uchun marketing mutaxassislari xizmatidan foydalanadi — matnga mos xulosa.',
          'Maqoladan kelajak kasblari haqida esse yozishda va kasb tanlash bo‘yicha tavsiya tayyorlashda foydalanish mumkin.',
        ],
      },
      {
        title: 'Hunar haqida maqollar (5.4)',
        text: 'Maqollarning davomi:',
        table: {
          head: ['Boshi', 'Davomi'],
          rows: [
            ['Hunar bo‘lsa qo‘lingda,', 'non topilar yo‘lingda.'],
            ['Hunar — oqar buloq,', 'ilm — yonar chiroq.'],
            ['Hunar oshatar,', 'mehnat yashnatar.'],
            ['Hunarsizning qirqimi uzun,', 'hunarlining — bichimi.'],
            ['Har hunarning o‘z siri bor,', 'har ishning o‘z yeri bor.'],
          ],
        },
        note: '5.3: o‘zingiz tanlagan kasbni matndagi tavsiyalar bilan taqqoslang.',
      },
    ],
    pairs: [
      ['menejer', 'Malakali ish boshqaruvchi'],
      ['investor', 'Sarmoya kirituvchi'],
      ['moliya', 'Pul mablag‘lari tizimi'],
      ['virtual', 'Dasturiy muhitdagi'],
      ['marketing', 'Ishlab chiqarish va sotish sohasi'],
      ['Hunar bo‘lsa qo‘lingda', 'non topilar yo‘lingda'],
    ],
    quiz: [
      { q: 'Muallif qanday kasblardan qochishni maslahat beradi?', options: ['avtomatlashtirilishi mumkin kasblardan', 'ijodiy kasblardan', 'tibbiyot kasblaridan', 'ta’lim kasblaridan'], answer: 0 },
      { q: 'Marketologning vazifasiga kirmaydi:', options: ['xizmatchilar faoliyatini nazorat qilish', 'tovarni targ‘ib qilish', 'brend imijini yaratish', 'kompaniya obro‘yini oshirish'], answer: 0 },
      { q: 'Kasb tanlashda nimani ko‘proq hisobga olish kerak?', options: ['o‘z qobiliyat va qiziqishlarini', 'faqat maoshni', 'do‘stlarning tanlovini', 'kasbning modasini'], answer: 0 },
      { q: '«Hunar — oqar buloq, ...»', options: ['ilm — yonar chiroq', 'non topilar yo‘lingda', 'mehnat yashnatar', 'har ishning o‘z yeri bor'], answer: 0 },
      { q: '«Virtual» so‘zining ma’nosi?', options: ['dasturiy muhitda yaratilgan', 'haqiqiy', 'qadimiy', 'qo‘lda yasalgan'], answer: 0 },
    ],
    sort: {
      categories: ['Matnga mos', 'Matnga mos emas'],
      items: [
        { text: 'Kompaniyalar marketing mutaxassislari xizmatidan foydalanadi', cat: 0 },
        { text: 'Kasb tanlashda jamiyatdagi o‘rnini ko‘proq hisobga olish kerak', cat: 1 },
        { text: 'Jamiyat uchun keraksiz kasb yo‘q', cat: 0 },
        { text: 'Kasb obro‘yini sun’iy idrok oshiradi', cat: 1 },
        { text: 'Malakali dasturchilarga yuqori haq to‘lanadi', cat: 0 },
        { text: 'Hisobchiga ehtiyoj yo‘qolmaydi deb yozilgan', cat: 1 },
      ],
    },
    qa: [
      { q: 'Nega maqola savollar bilan boshlanadi?', a: 'O‘quvchining qiziqishini uyg‘otish va mavzuni aniq belgilash uchun.' },
      { q: 'Yaqin yillarda talab yuqori bo‘ladigan ikki kasbni ayting.', a: 'Masalan: loyiha menejeri, dasturchi.' },
      { q: 'Qaysi kasblar o‘rnini hech qachon to‘liq sun’iy idrokka bermaydi?', a: 'Erkin javob: o‘qituvchi, shifokor, ijodkor kabi inson muloqoti va hissiyot talab qiladigan kasblar.' },
      { q: '«Menejer» so‘ziga o‘zbekcha muqobil taklif qiling.', a: 'Masalan: boshqaruvchi.' },
      { q: '«Hunarsizning qirqimi uzun, hunarlining — bichimi» maqolini izohlang.', a: 'Hunarsiz odam ko‘p harakat qilsa ham natija kam, hunarli odam ishni bilib, tez va to‘g‘ri bajaradi.' },
    ],
  },

  /* ===================== 34 ===================== */
  {
    id: 'tovush-ortishi',
    source: 'V bob «Soha va kasblar» • 2-dars • 90–92-betlar',
    title: 'Tovush ortishi. Variantdosh so‘zlar',
    short: 'Talaffuz va yozuvda tovush ortishi, antonimlar, variantdoshlar',
    lesson: [
      {
        title: 'Tovush ortishi',
        text: '«Istalgan sohaning obro‘yini» birikmasida «obro‘+i» qo‘shilganda «y» tovushi orttirilgan.',
        rule: 'Nutqda tovush ortishi hodisasi kuzatiladi. Talaffuzda ba’zan tovush ortsa-da, yozuvda har doim ham aks etavermaydi.',
        table: {
          head: ['Faqat talaffuzda', 'Yozuvda ham'],
          rows: [
            ['oyila (oila)', 'u + ga = unga'],
            ['tabiyat (tabiat)', 'shu + dan = shundan'],
            ['doyim (doim)', 'isi + q = issiq'],
            ['kelayapti (kelyapti)', 'ye + il + moq = yeyilmoq'],
          ],
        },
      },
      {
        title: 'Tovush o‘zgarishi qoidalari (5.8)',
        text: 'Qoida va misol:',
        table: {
          head: ['Qoida', 'Misol'],
          rows: [
            ['Kishilik olmoshiga chiqish kelishigi qo‘shilganda tovush ortadi', 'Undan bu xabarni eshitish og‘ir edi.'],
            ['Kishilik olmoshiga jo‘nalish kelishigi qo‘shilganda «n» ortadi', 'Unga havasim keladi.'],
            ['Egalik qo‘shimchasi qo‘shilganda tovush ortadi', 'uning avzoyi buzilgan edi'],
            ['So‘z yasovchi qo‘shimcha qo‘shilganda tovush ortadi', 'Issiq joyingni sovitma.'],
            ['Egalik qo‘shilganda tovush tushadi', 'o‘g‘il + im → o‘g‘lim'],
            ['Egalik qo‘shilganda tovush almashadi', 'Qulog‘idan kun ko‘rinadi.'],
          ],
        },
      },
      {
        title: 'Gaplarda tovush ortishi (5.7)',
        text: 'Namuna: tibbiy = tib + b + iy. Gaplardagi shunday so‘zlar:',
        examples: ['tibbiy', 'hissiy', 'mavqeyi', 'obro‘yi', 'yeyish', 'deyish', 'bunday'],
      },
      {
        title: 'Antonimlar maqollarda (5.9)',
        text: 'Nuqtalar o‘rniga antonim qo‘yamiz:',
        table: {
          head: ['Maqol', 'Antonim'],
          rows: [
            ['Ilm ko‘p, umr ...', 'oz (qisqa)'],
            ['Avval o‘rgan, ... o‘rgat.', 'keyin'],
            ['Bilimliga dunyo yorug‘, bilimsizga — ...', 'qorong‘i'],
            ['Ilm — yorug‘lik, jaholat — ...', 'zulmat'],
            ['Hunarning avvali achchiq, so‘ngi — ...', 'shirin'],
          ],
        },
      },
      {
        title: 'Variantdosh so‘zlar',
        text: 'Bir so‘z turli ko‘rinishda yozilishi mumkin: podsho — podshoh, kabutar — kaptar, imon — iymon.',
        rule: 'Variantdosh so‘zlar bir so‘zning turli imlo ko‘rinishlaridir. Ularning har biri imloviy jihatdan to‘g‘ri sanaladi: sog‘lik/sog‘liq, nevara/nabira.',
        note: 'Bir matnda variantdosh so‘zning bitta shaklini qo‘llash tavsiya etiladi.',
      },
      {
        title: 'Variantdosh yoki paronim? (5.11–5.12)',
        text: 'Juftliklarni guruhlaymiz:',
        table: {
          head: ['Variantdosh', 'Paronim'],
          rows: [
            ['arava — arba', 'raso — rosa'],
            ['adab — odob', 'xalos — xolos'],
            ['igna — nina', 'abzal — afzal'],
            ['shabboda — shabada', 'servis — serviz'],
            ['beg — bek', 'bolalik — bolali'],
            ['baravar — barobar, jinday — jindak', ''],
          ],
        },
      },
    ],
    pairs: [
      ['u + ga', 'unga'],
      ['isi + q', 'issiq'],
      ['podsho', 'podshoh'],
      ['kabutar', 'kaptar'],
      ['imon', 'iymon'],
      ['sog‘lik', 'sog‘liq'],
    ],
    quiz: [
      { q: '«U + ga» qo‘shilganda qanday tovush ortadi?', options: ['n', 'y', 'g', 'k'], answer: 0 },
      { q: 'Qaysi so‘zda tovush ortishi faqat talaffuzda?', options: ['oila → oyila', 'unga', 'shundan', 'issiq'], answer: 0 },
      { q: 'Variantdosh so‘zlar qanday so‘zlar?', options: ['bir so‘zning turli imlo ko‘rinishlari', 'ma’nosi zid so‘zlar', 'talaffuzi yaqin, ma’nosi boshqa so‘zlar', 'eskirgan so‘zlar'], answer: 0 },
      { q: '«Podsho» so‘zining variantdoshi?', options: ['podshoh', 'shoh', 'podsholik', 'xon'], answer: 0 },
      { q: '«Hunarning avvali achchiq, so‘ngi — ...»', options: ['shirin', 'achchiq', 'qisqa', 'uzun'], answer: 0 },
      { q: 'Qaysi juftlik paronim?', options: ['xalos — xolos', 'beg — bek', 'arava — arba', 'igna — nina'], answer: 0 },
    ],
    sort: {
      categories: ['Variantdosh', 'Paronim'],
      items: [
        { text: 'beg — bek', cat: 0 }, { text: 'raso — rosa', cat: 1 },
        { text: 'shabboda — shabada', cat: 0 }, { text: 'xalos — xolos', cat: 1 },
        { text: 'baravar — barobar', cat: 0 }, { text: 'abzal — afzal', cat: 1 },
        { text: 'jinday — jindak', cat: 0 }, { text: 'servis — serviz', cat: 1 },
      ],
    },
    qa: [
      { q: 'Tovush ortishi har doim yozuvda aks etadimi?', a: 'Yo‘q, ba’zan faqat talaffuzda bo‘ladi (oila → oyila).' },
      { q: '«Issiq» so‘zida qanday tovush ortgan?', a: '«isi + q» qo‘shilganda «s» ortgan.' },
      { q: 'Variantdosh so‘zdan matnda qanday foydalaniladi?', a: 'Bir matnda bitta shaklini ishlatish kerak.' },
      { q: '«Qulog‘idan» so‘zida qanday o‘zgarish bor?', a: 'Egalik qo‘shilganda «q» → «g‘» almashgan.' },
      { q: '«Imon» so‘zining variantdoshini ayting.', a: '«Iymon».' },
    ],
  },

  /* ===================== 35 ===================== */
  {
    id: 'kongil-shamchirogi',
    source: 'V bob «Soha va kasblar» • 3-dars • 92–96-betlar',
    title: '«Ko‘ngil shamchirog‘i»',
    short: 'Olima Suyima G‘aniyeva xotiralari, matn turi, hikmatlar',
    lesson: [
      {
        title: 'Darsga kirish',
        text: 'Ilm-fan rivojiga hissa qo‘shgan o‘zbek olimlaridan kimlarni bilasiz? Orangizda olim bo‘lishni maqsad qilganlar bormi?',
        note: 'Matn «Yoshlik» jurnalidan olingan. Unda adabiyotshunos olima, professor Suyima G‘aniyeva o‘z hayoti haqida hikoya qiladi.',
      },
      {
        title: 'Matn mazmuni: ilm yo‘li',
        text: 'Olimaning adabiyotga chinakam ixlosi talabalik yillarida paydo bo‘lgan.',
        list: [
          'O‘qituvchilar tavsiyasi bilan she’r yodlash va ifodali o‘qish mumtoz adabiyotga havas uyg‘otgan.',
          '1956-yili Leningrad davlat universitetida nomzodlik dissertatsiyasini yoqlagan.',
          '1961-yili Navoiyning «Majolis un-nafois» asarining ilmiy-tanqidiy matni nashr etilgan; olimlar katta qiziqish bildirgan.',
          'Ustozi dissertatsiya muhokamasini Navoiy tavallud kuniga belgilagan — «hazratga go‘zal sovg‘a bo‘ladi» degan.',
        ],
      },
      {
        title: 'Matn mazmuni: qiyinchiliklar va xulosa',
        text: 'Olima urushdan keyingi og‘ir yillarda o‘qiganini eslaydi: darsxona va stol-stul yetishmagan, qishda auditoriyalar sovuq, kuzda uch oylab paxtaga safarbar qilingan.',
        rule: 'Ilm, kitob — ko‘ngil shamchirog‘i. Farzandlar ta’lim-tarbiyasi faqat davlat ishi emas, oila uhdasi hamdir.',
        note: 'Bu qiyinchiliklarni olima bugungi yoshlar yaratilgan sharoitning qadriga yetsin, deb aytadi.',
      },
      {
        title: 'Yangi so‘zlar (5.13)',
        text: 'Matndagi so‘zlar izohi:',
        table: {
          head: ['So‘z', 'Izohi'],
          rows: [
            ['mubolag‘a', 'narsa yoki hodisa sifatini bo‘rttirib ko‘rsatish'],
            ['mumtoz', 'klassik, millat faxri hisoblangan'],
            ['auditoriya', 'mashg‘ulot, ma’ruza o‘tkaziladigan xona'],
            ['dissertatsiya', 'ilmiy daraja olish uchun yoziladigan tadqiqot ishi'],
            ['uhda', 'biror ishni bajara olish, eplash'],
            ['bioximik', 'biokimyo mutaxassisi'],
            ['voris', 'meros olish huquqiga ega shaxs, merosxo‘r'],
          ],
        },
      },
      {
        title: 'Matn bo‘yicha topshiriqlar (5.15)',
        text: 'Javoblar:',
        table: {
          head: ['Savol', 'Javob'],
          rows: [
            ['«Ko‘ngil shamchirog‘i» deganda nima nazarda tutilgan?', 'ilm, kitob o‘qish'],
            ['Talabalik qiyinchiliklarini aytishdan maqsad?', 'yoshlarni yaratilgan sharoitni qadrlashga da’vat etish'],
            ['Olimaning adabiyotga qiziqishi bolaligidan boshlangan.', 'noto‘g‘ri (talabalikda)'],
            ['Farzandlari uning yo‘lini tanlamaganidan norozi.', 'noto‘g‘ri («ilmda hamjihatmiz»)'],
            ['Yutuqlarida ustozlarining katta hissasi bor.', 'to‘g‘ri'],
          ],
        },
      },
      {
        title: 'Matn turlari (5.16)',
        text: 'Matn turini savollar orqali aniqlash mumkin:',
        table: {
          head: ['Matn turi', 'Belgisi'],
          rows: [
            ['Hikoya matni', 'voqealar ketma-ket, izchil bayon qilinadi; qahramon, uning his-tuyg‘ulari bor'],
            ['Tasviriy matn', 'joy, shaxs yoki narsaning tashqi ko‘rinishi, o‘ziga xosligi tasvirlanadi'],
            ['Muhokama matni', 'munozarali masala, fikrni isbotlovchi dalil va faktlar bor'],
          ],
        },
        note: '5.17: olima fikrlaridan kelib chiqib, kasbning yetuk mutaxassisi bo‘lish uchun 3 ta tavsiya yozing.',
      },
      {
        title: 'Hikmatlar (5.18)',
        text: 'Imom al-Buxoriy: «Dunyoda ilmdan o‘zga najot yo‘q va bo‘lmagay». Matndagi hikmatli fikrlarga mos maqol va aforizmlar toping.',
        examples: ['Kitoblar qalbni yoritadi', 'Ilm, kitob — ko‘ngil shamchirog‘i', 'O‘zi anglagan haqiqat qadrliroq', 'Farzandlarim — katta baxtim'],
      },
    ],
    pairs: [
      ['mumtoz', 'klassik'],
      ['mubolag‘a', 'bo‘rttirib ko‘rsatish'],
      ['dissertatsiya', 'ilmiy tadqiqot ishi'],
      ['voris', 'merosxo‘r'],
      ['uhda', 'eplash'],
      ['auditoriya', 'ma’ruza xonasi'],
    ],
    quiz: [
      { q: 'Matndagi olima kim?', options: ['Suyima G‘aniyeva', 'Zulfiya', 'Saida Zunnunova', 'Halima Xudoyberdiyeva'], answer: 0 },
      { q: '«Ko‘ngil shamchirog‘i» nima?', options: ['ilm va kitob', 'adabiyotga qiziqish', 'Navoiy asarlari', 'ilmli farzandlar'], answer: 0 },
      { q: 'Olima qaysi asarning ilmiy-tanqidiy matnini nashr etgan?', options: ['«Majolis un-nafois»', '«Xamsa»', '«Boburnoma»', '«Qutadg‘u bilig»'], answer: 0 },
      { q: '«Mumtoz» so‘zining ma’nosi?', options: ['klassik', 'zamonaviy', 'oddiy', 'chet el'], answer: 0 },
      { q: 'Voqealar ketma-ket bayon qilinadigan matn turi?', options: ['hikoya matni', 'tasviriy matn', 'muhokama matni', 'rasmiy matn'], answer: 0 },
      { q: 'Olima dissertatsiyasini qayerda yoqlagan?', options: ['Leningrad davlat universitetida', 'Toshkentda', 'Moskvada', 'Samarqandda'], answer: 0 },
    ],
    sort: {
      categories: ['To‘g‘ri', 'Noto‘g‘ri'],
      items: [
        { text: 'Yutuqlarida ustozlarining hissasi katta', cat: 0 }, { text: 'Adabiyotga qiziqish bolalikdan boshlangan', cat: 1 },
        { text: 'Dissertatsiya 1956-yili yoqlangan', cat: 0 }, { text: 'Farzandlari yo‘lini tanlamaganidan norozi', cat: 1 },
        { text: 'Talabalik yillari og‘ir o‘tgan', cat: 0 }, { text: 'Ilm sohasini ota-onasi tanlagan', cat: 1 },
        { text: 'Tarbiya — oilaning ham uhdasi', cat: 0 }, { text: 'Tarbiya faqat davlat ishi', cat: 1 },
      ],
    },
    qa: [
      { q: 'Olimada adabiyotga qiziqish qanday paydo bo‘lgan?', a: 'Talabalikda she’r yodlash va ifodali o‘qish mashg‘ulotlari orqali.' },
      { q: 'Ustoz nima uchun muhokamani Navoiy tavallud kuniga belgiladi?', a: 'Bu ilmiy ish hazratning tug‘ilgan kuniga go‘zal sovg‘a bo‘ladi, deb hisobladi.' },
      { q: '«Kitoblar qalbni yoritadi» fikrini izohlang.', a: 'Kitob insonni ma’naviy boyitadi, orzularini uyg‘otadi, aqlini charxlaydi.' },
      { q: 'Olima farzand tarbiyasida nimaga e’tibor berishni aytadi?', a: 'Bolalar ajdodlar merosini bilishi va kitob bilan do‘st bo‘lishiga.' },
      { q: 'Hikoya matnining belgilari qanday?', a: 'Voqealar izchil bayon qilinadi, qahramon va uning kechinmalari bor.' },
    ],
  },

  /* ===================== 36 ===================== */
  {
    id: 'fel-nisbatlari',
    source: 'V bob «Soha va kasblar» • 4-dars • 96–99-betlar',
    title: 'Fe’l nisbatlari',
    short: 'Aniq, o‘zlik, majhul, orttirma va birgalik nisbatlari',
    lesson: [
      {
        title: 'Fe’llarni taqqoslash (5.19)',
        text: 'Juftliklarning ma’nosi qanday farqlanadi?',
        table: {
          head: ['Juftlik', 'Farqi'],
          rows: [
            ['o‘qidi — o‘qitdi', 'o‘zi o‘qidi / boshqaga o‘qitdi'],
            ['yuvdi — yuvindi', 'boshqa narsani yuvdi / o‘zini yuvdi'],
            ['bajardi — bajarildi', 'bajaruvchi ma’lum / noma’lum'],
            ['tozaladim — tozalashdi', 'bir kishi / bir necha kishi'],
          ],
        },
      },
      {
        title: 'Fe’l nisbatlari',
        text: 'Fe’l harakat kim tomonidan va qanday bajarilganini nisbat qo‘shimchalari orqali bildiradi.',
        rule: 'Nisbat qo‘shimchalari ish-harakat va uning bajaruvchisi orasidagi munosabatni ifodalaydi.',
      },
      {
        title: 'Beshta nisbat',
        text: 'Har bir nisbat va misoli:',
        table: {
          head: ['Nisbat', 'Ma’nosi', 'Misol'],
          rows: [
            ['Aniq', 'bajaruvchi ma’lum', 'Anvar «Xamsa»ni o‘qidi.'],
            ['O‘zlik', 'harakat bajaruvchining o‘zi ustida', 'Anvar so‘zlar ma’nosini tushuna olmay qiynaldi.'],
            ['Majhul', 'bajaruvchi noma’lum', 'Tadbirda sahna ko‘rinishlari namoyish etildi.'],
            ['Orttirma', 'harakat boshqa bajaruvchi ta’sirida', 'Ustoz o‘quvchilarga g‘azal tahlil qildirdi.'],
            ['Birgalik', 'bir necha bajaruvchi', 'O‘quvchilar filmni tomosha qilishdi.'],
          ],
        },
      },
      {
        title: 'Nisbat qo‘shimchalari (5.21)',
        text: 'Har bir nisbatning qo‘shimchalari:',
        table: {
          head: ['Nisbat', 'Qo‘shimchalar'],
          rows: [
            ['Aniq', '—'],
            ['O‘zlik', '-(i)n, -(i)l'],
            ['Majhul', '-(i)n, -(i)l'],
            ['Orttirma', '-t, -dir (-tir), -giz (-kiz, -qiz, -g‘iz), -gaz (-kaz, -qaz), -ir, -ar, -iz, -sat'],
            ['Birgalik', '-(i)sh'],
          ],
        },
        rule: 'Nisbat qo‘shimchalari bir fe’lga birdan ortiq qo‘shilishi mumkin: tashkillash-tir-il-adi. Fe’lning nisbati oxirgi qo‘shimchaga ko‘ra belgilanadi (bu yerda — majhul).',
      },
      {
        title: 'Matndagi fe’llar nisbati (5.20)',
        text: '«Ko‘ngil shamchirog‘i» matnidan:',
        table: {
          head: ['Birikma', 'Nisbati'],
          rows: [
            ['qiziqishim ortaverdi', 'aniq'],
            ['adabiyot rom etib qo‘ydi', 'aniq'],
            ['avtoreferat chop etildi', 'majhul'],
            ['matn nashr etildi', 'majhul'],
            ['asarlarini o‘rgana boshladim', 'aniq'],
          ],
        },
      },
      {
        title: 'Xatolarni tuzatish (5.22)',
        text: 'Namuna: «ko‘chatlarni o‘tkazdi» → «ko‘chatlarni o‘tqazdi».',
        table: {
          head: ['Xato', 'To‘g‘ri'],
          rows: [
            ['Bu ibora juda ko‘p xato qo‘llaniladi.', 'Bu ibora juda ko‘p xato qo‘llanadi.'],
            ['Aytilingan ishni vaqtida bajaringlar.', 'Aytilgan ishni vaqtida bajaringlar.'],
            ['O‘tqazilishi kutilayotgan tadbir...', 'O‘tkazilishi kutilayotgan tadbir...'],
            ['...she’r o‘qitgizib ko‘rdi.', '...she’r o‘qittirib ko‘rdi.'],
            ['Kitoblarni tez orada o‘qib chiqiladi.', 'Kitoblar tez orada o‘qib chiqiladi.'],
          ],
        },
      },
      {
        title: 'Ustoz haqida matn (5.23)',
        text: 'Bo‘sh o‘rinlar fe’llarning mos shakli bilan to‘ldiriladi:',
        examples: ['arziydi', 'baxsh etadilar', 'tanitadilar', 'tutqazadilar', 'o‘rgatadilar', 'asraydi', 'taraqqiy ettiradi', 'yetkazadi'],
        note: 'Uy vazifasi (5.24): «Shifokor qabulida» mavzusida matn yozing va nisbat qo‘shimchalarining tagiga chizing.',
      },
    ],
    pairs: [
      ['o‘qidi', 'Aniq nisbat'],
      ['yuvindi', 'O‘zlik nisbat'],
      ['bajarildi', 'Majhul nisbat'],
      ['o‘qitdi', 'Orttirma nisbat'],
      ['tozalashdi', 'Birgalik nisbat'],
      ['-(i)sh', 'Birgalik qo‘shimchasi'],
    ],
    quiz: [
      { q: 'Majhul nisbatda bajaruvchi...', options: ['odatda noma’lum', 'aniq ma’lum', 'bir necha kishi', 'harakat o‘zi ustida'], answer: 0 },
      { q: '«Ustoz o‘quvchilarga g‘azal tahlil qildirdi» — fe’l nisbati?', options: ['orttirma', 'aniq', 'majhul', 'birgalik'], answer: 0 },
      { q: 'Birgalik nisbat qo‘shimchasi?', options: ['-(i)sh', '-(i)n', '-dir', '-t'], answer: 0 },
      { q: '«Tashkillashtiriladi» fe’li qaysi nisbatda?', options: ['majhul', 'orttirma', 'aniq', 'birgalik'], answer: 0 },
      { q: 'To‘g‘ri shakl?', options: ['Aytilgan ishni bajaring.', 'Aytilingan ishni bajaring.', 'Aytilinilgan ishni bajaring.', 'Aytgan ishni bajarilsin.'], answer: 0 },
      { q: '«Yuvindi» qaysi nisbatda?', options: ['o‘zlik', 'aniq', 'orttirma', 'birgalik'], answer: 0 },
    ],
    sort: {
      categories: ['Majhul', 'Orttirma', 'Birgalik'],
      items: [
        { text: 'chop etildi', cat: 0 }, { text: 'o‘qitdi', cat: 1 }, { text: 'tozalashdi', cat: 2 },
        { text: 'atalmoq', cat: 0 }, { text: 'kuchaytirmoq', cat: 1 }, { text: 'chizishmoq', cat: 2 },
        { text: 'nashr etildi', cat: 0 }, { text: 'sarflattirmoq', cat: 1 }, { text: 'to‘plashmoq', cat: 2 },
      ],
    },
    qa: [
      { q: 'Fe’l nisbatlarini sanang.', a: 'Aniq, o‘zlik, majhul, orttirma, birgalik.' },
      { q: 'Nisbat qo‘shimchalari nimani bildiradi?', a: 'Ish-harakat va uning bajaruvchisi orasidagi munosabatni.' },
      { q: 'Bir fe’lda bir necha nisbat qo‘shimchasi bo‘lsa, nisbat qanday aniqlanadi?', a: 'Oxirgi qo‘shimchaga ko‘ra.' },
      { q: '«Yodladi» fe’lini birgalik va orttirma nisbatga qo‘ying.', a: 'Yodlashdi, yodlattirdi.' },
      { q: '«Bu ibora juda ko‘p xato qo‘llaniladi» gapini to‘g‘rilang.', a: '«...xato qo‘llanadi».' },
    ],
  },

  /* ===================== 37 ===================== */
  {
    id: 'kasb-tanlash',
    source: 'V bob «Soha va kasblar» • 5-dars • 99–101-betlar',
    title: '«Kasb tanlashda nimalarga e’tibor qaratish kerak?»',
    short: 'Audiomatn tahlili, kasb tanlash tavsiyalari',
    lesson: [
      {
        title: 'Darsga kirish',
        text: 'Kasb tanlashingizga sabab bo‘lgan omillar haqida so‘zlab bering. Shundan so‘ng «Kasb tanlashda nimalarga e’tibor qaratish kerak?» audiomatni tinglanadi (5.25).',
        note: 'Audiomatn darslikdagi QR kod orqali tinglanadi.',
      },
      {
        title: 'Audiomatndagi so‘zlar (5.26)',
        text: 'Krossvordda yashiringan so‘zlar:',
        table: {
          head: ['Izoh', 'So‘z'],
          rows: [
            ['biror sohada maxsus bilim va tajribaga ega kishi', 'mutaxassis'],
            ['kelajakda foydalanish uchun g‘amlab qo‘yilgan narsa', 'zaxira'],
            ['ishni yaxshi o‘zlashtirish natijasidagi tajriba, mahorat', 'malaka'],
            ['onlayn xizmatlar ko‘rsatuvchi internet maydoni', 'platforma'],
            ['psixologiya bo‘yicha mutaxassis', 'psixolog'],
            ['eng muvofiq, eng qulay', 'optimal'],
            ['biror sohada olib boriladigan ish, mashg‘ulot', 'faoliyat'],
            ['kelgusi zamon, kelajak', 'istiqbol'],
          ],
        },
      },
      {
        title: 'Kasb tanlash bo‘yicha tavsiyalar',
        text: 'Audiomatnda kasb tanlashni inson hayotidagi eng muhim tanlovlardan biri deb ataladi. Muallif tavsiyalari:',
        list: [
          'Psixologik testlar orqali qaysi kasbga moyilligingizni aniqlang.',
          'Turli kasblar va istiqbolli sohalar haqida bilimingizni oshiring.',
          'Oliy o‘quv yurtlaridagi «ochiq eshiklar» kunlarida qatnashing.',
          'Istaklaringizni aniqlashtiring, tanlagan yo‘nalishda o‘zingizni sinab ko‘ring.',
          'Asosiy tanlovdan tashqari zaxira tanloviga ham ega bo‘ling.',
          'Qarorni mustaqil qabul qiling, imkoniyat va bilimingizni hisobga oling.',
        ],
      },
      {
        title: 'Zaxira tanlovi',
        text: 'Tanlangan yo‘nalishga o‘qishga kira olmasangiz, tushkunlikka tushmaslik uchun boshqa optimal variantlarni ham oldindan ko‘rib chiqing.',
        rule: '«Zaxira aerodromi» — asosiy tanlovdan tashqari qo‘shimcha ikkinchi kasb yoki yo‘nalish.',
      },
      {
        title: 'Ota-onaning o‘rni',
        text: 'Muallif fikricha, ota-ona maslahatlari muhim, lekin ular faqat yordamchi ta’sirga ega bo‘lishi kerak — yakuniy qaror farzandning o‘zida.',
        note: 'Muallif tavsiyalariga kirmaydi: «ota-ona kasbini albatta davom ettirish».',
      },
      {
        title: 'Guruh ishi va uy vazifasi (5.28–5.29)',
        text: 'Topshiriqlar:',
        list: [
          'Guruhda tanlangan kasbning 3 ta afzalligi va zarur bo‘ladigan 3 ta ko‘nikmani yozing.',
          'Orzu qilgan kasbingiz haqida oila a’zolaringiz bilan maslahatlashing.',
          'Savollar: Men tanlagan kasbga munosabatingiz qanday? U bugungi zamonga mosmi? Bu kasb orqali qanchalik foyda keltira olaman?',
        ],
      },
    ],
    pairs: [
      ['mutaxassis', 'Ixtisos egasi'],
      ['zaxira', 'G‘amlab qo‘yilgan narsa'],
      ['malaka', 'Tajriba, mahorat'],
      ['optimal', 'Eng muvofiq'],
      ['istiqbol', 'Kelajak'],
      ['platforma', 'Onlayn xizmat maydoni'],
    ],
    quiz: [
      { q: 'Kelgusi zamon, kelajak ma’nosidagi so‘z?', options: ['istiqbol', 'zaxira', 'malaka', 'faoliyat'], answer: 0 },
      { q: 'O‘qishga kira olmagan taqdirda qaysi tavsiyaga amal qilish kerak?', options: ['zaxira tanloviga ega bo‘lish', 'ochiq eshiklar kuni', 'psixologik test', 'kasbni tashlab ketish'], answer: 0 },
      { q: 'Muallif fikricha, ota-ona maslahati...', options: ['yordamchi, yakuniy qaror emas', 'eng to‘g‘ri tanlov', 'majburiy', 'kerak emas'], answer: 0 },
      { q: 'Qaysi tavsiya muallifga tegishli EMAS?', options: ['ota-ona kasbini albatta davom ettirish', 'ochiq eshiklar kunida qatnashish', 'psixologik test topshirish', 'zaxira tanlovi'], answer: 0 },
      { q: '«Optimal» so‘zining ma’nosi?', options: ['eng muvofiq, qulay', 'eng qimmat', 'eng eski', 'eng uzun'], answer: 0 },
    ],
    sort: {
      categories: ['Muallif tavsiyasi', 'Tavsiya emas'],
      items: [
        { text: 'Psixologik test topshirish', cat: 0 }, { text: 'Ota-ona kasbini albatta davom ettirish', cat: 1 },
        { text: '«Ochiq eshiklar» kunida qatnashish', cat: 0 }, { text: 'Do‘stlar tanlagan kasbni tanlash', cat: 1 },
        { text: 'Zaxira tanloviga ega bo‘lish', cat: 0 }, { text: 'Faqat maoshga qarab tanlash', cat: 1 },
        { text: 'Qarorni mustaqil qabul qilish', cat: 0 }, { text: 'Qarorni boshqalarga topshirish', cat: 1 },
      ],
    },
    qa: [
      { q: 'Nega kasb tanlash hayotdagi eng muhim tanlov?', a: 'U insonning butun hayoti, daromadi va baxtiga ta’sir qiladi.' },
      { q: 'Psixologik test natijasi muvaffaqiyatni kafolatlaydimi?', a: 'Erkin javob: yordam beradi, lekin qiziqish, harakat va sinov ham kerak.' },
      { q: '«Zaxira aerodromi» nima?', a: 'Asosiy tanlovdan tashqari ikkinchi, qo‘shimcha kasb tanlovi.' },
      { q: 'Kasb tanlashda ota-onaning roli qanday bo‘lishi kerak?', a: 'Maslahat beruvchi, yordamchi; yakuniy qaror farzandda.' },
      { q: 'Siz tanlagan kasb uchun qanday ko‘nikmalar kerak?', a: 'Erkin javob.' },
    ],
  },

  /* ===================== 38 ===================== */
  {
    id: 'sodda-qoshma-gap',
    source: 'V bob «Soha va kasblar» • 6-dars • 101–103-betlar',
    title: 'Sodda va qo‘shma gaplar ma’nodoshligi',
    short: 'Qo‘shma gapni sodda gapga aylantirish, jinsni bildiruvchi so‘zlar',
    lesson: [
      {
        title: 'Ikki gapni taqqoslash (5.30)',
        text: 'Bu ikki gap mazmunan bir xil, lekin tuzilishi har xil:',
        table: {
          head: ['Qo‘shma gap', 'Sodda gap'],
          rows: [['Shuni unutmangki, har ishni o‘z ustasi qilishi kerak.', 'Har ishni o‘z ustasi qilishi kerakligini unutmang.']],
        },
      },
      {
        title: 'Qoida',
        text: 'Fikrni ixcham ifodalash uchun qo‘shma gapni sodda gapga aylantirish mumkin.',
        rule: 'Ma’nodoshlik sodda va qo‘shma gaplar orasida ham kuzatiladi. Ba’zan fikrni ixchamroq ifodalash uchun qo‘shma gaplar mazmuni saqlangan holda sodda gaplarga aylantiriladi.',
        table: {
          head: ['Qo‘shma gap', 'Sodda gap'],
          rows: [['Shuni xohlaymanki, yurtimizdagi barcha yoshlar hayotda o‘z yo‘lini topib olsin.', 'Yurtimizdagi barcha yoshlar hayotda o‘z yo‘lini topib olishini xohlayman.']],
        },
      },
      {
        title: 'Qo‘shma gapdan sodda gapga (5.31)',
        text: 'Mazmunni saqlab, gaplarni soddalashtiramiz:',
        table: {
          head: ['Qo‘shma gap', 'Sodda gap'],
          rows: [
            ['Kim o‘z kasbiga sodiq bo‘lsa, uning ishida baraka bo‘ladi.', 'O‘z kasbiga sodiq kishining ishida baraka bo‘ladi.'],
            ['Shuni unutmang: mashaqqat bor joyda rivojlanish bo‘ladi.', 'Mashaqqat bor joyda rivojlanish bo‘lishini unutmang.'],
            ['Shunday kasblar borki, uydan chiqmasdan daromad qilish mumkin.', 'Uydan chiqmasdan daromad qilish mumkin bo‘lgan kasblar bor.'],
            ['Kim halol mehnat qilsa, u o‘z ishidan unum topadi.', 'Halol mehnat qilgan kishi o‘z ishidan unum topadi.'],
            ['Qayerda intizom bo‘lsa, shu yerda yuksalish bo‘ladi.', 'Intizom bor joyda yuksalish bo‘ladi.'],
          ],
        },
      },
      {
        title: 'Sodda gapdan qo‘shma gapga (5.32)',
        text: 'Namuna: «Mehnat insonni ulug‘laydi» → «Shunga aminmanki, mehnat insonni ulug‘laydi».',
        list: [
          'Dunyoda ilmdan o‘zga najot yo‘q. → Shuni bilingki, dunyoda ilmdan o‘zga najot yo‘q.',
          'Ustoz otadan ulug‘. → Shunga ishonamanki, ustoz otadan ulug‘.',
          'Ishlagan kishi xato qiladi. → Kim ishlasa, u xato qiladi.',
          'Bir xatoni ikki marta takrorlaydigan kishiga ishonib bo‘lmaydi. → Kim bir xatoni ikki marta takrorlasa, unga ishonib bo‘lmaydi.',
        ],
      },
      {
        title: 'Yosh bosqichlari (5.33)',
        text: 'So‘zlarni yosh davrlari ketma-ketligida joylashtiring va gap tuzing:',
        examples: ['chaqaloqlik', 'go‘daklik', 'bolalik', 'o‘smirlik', 'yoshlik', 'yigitlik', 'keksalik', 'qarilik'],
      },
      {
        title: 'Jinsni bildiruvchi so‘zlar (5.34)',
        text: 'Ayrim so‘zlar faqat ayollarga nisbatan qo‘llanadi. Arabcha o‘zlashmalarda -a qo‘shimchasi ayol jinsini bildiradi.',
        table: {
          head: ['Faqat ayollarga', 'Ikkalasiga ham'],
          rows: [
            ['shoira', 'o‘qituvchi, talaba'],
            ['olima', 'kitobxon, gazetxon'],
            ['muallima', 'tilshunos, tadqiqotchi'],
            ['raqqosa', 'oshpaz, yozuvchi'],
            ['xodima', 'pedagog, ustoz'],
          ],
        },
        note: 'Ro‘yxatni davom ettiring va faqat erkaklarga nisbatan qo‘llanadigan so‘zlarni toping.',
      },
    ],
    pairs: [
      ['Kim kasbiga sodiq bo‘lsa...', 'Kasbiga sodiq kishi...'],
      ['Qayerda intizom bo‘lsa...', 'Intizom bor joyda...'],
      ['Shuni unutmangki...', '...ni unutmang'],
      ['olim', 'olima'],
      ['shoir', 'shoira'],
      ['muallim', 'muallima'],
    ],
    quiz: [
      { q: 'Qo‘shma gapni sodda gapga aylantirishdan maqsad?', options: ['fikrni ixcham ifodalash', 'ma’noni o‘zgartirish', 'gapni uzaytirish', 'xato tuzatish'], answer: 0 },
      { q: '«Qayerda intizom bo‘lsa, shu yerda yuksalish bo‘ladi» gapining sodda shakli?', options: ['Intizom bor joyda yuksalish bo‘ladi.', 'Intizom bo‘lsa yuksalish.', 'Qayerda intizom?', 'Yuksalish bo‘lmaydi.'], answer: 0 },
      { q: 'Faqat ayollarga nisbatan qo‘llanadigan so‘z?', options: ['shoira', 'o‘qituvchi', 'talaba', 'ustoz'], answer: 0 },
      { q: '«Mehnat insonni ulug‘laydi» gapini qo‘shma gapga aylantiring.', options: ['Shunga aminmanki, mehnat insonni ulug‘laydi.', 'Mehnat ulug‘.', 'Mehnat qiling.', 'Inson mehnat qiladi.'], answer: 0 },
      { q: 'Yosh bosqichlarida birinchi keladigan so‘z?', options: ['chaqaloqlik', 'bolalik', 'yoshlik', 'o‘smirlik'], answer: 0 },
    ],
    sort: {
      categories: ['Qo‘shma gap', 'Sodda gap'],
      items: [
        { text: 'Kim halol mehnat qilsa, u unum topadi.', cat: 0 }, { text: 'Halol mehnat qilgan kishi unum topadi.', cat: 1 },
        { text: 'Shuni unutmangki, har ishni o‘z ustasi qiladi.', cat: 0 }, { text: 'Har ishni o‘z ustasi qilishini unutmang.', cat: 1 },
        { text: 'Qayerda intizom bo‘lsa, shu yerda yuksalish.', cat: 0 }, { text: 'Intizom bor joyda yuksalish bo‘ladi.', cat: 1 },
        { text: 'Shunday kasblar borki, uyda ishlash mumkin.', cat: 0 }, { text: 'Uyda ishlash mumkin bo‘lgan kasblar bor.', cat: 1 },
      ],
    },
    qa: [
      { q: 'Sodda va qo‘shma gap o‘rtasida ma’nodoshlik bo‘ladimi?', a: 'Ha, mazmun saqlangan holda qo‘shma gapni sodda gapga aylantirish mumkin.' },
      { q: '«Kim o‘z kasbiga sodiq bo‘lsa, uning ishida baraka bo‘ladi» gapini soddalashtiring.', a: '«O‘z kasbiga sodiq kishining ishida baraka bo‘ladi.»' },
      { q: '«Ustoz otadan ulug‘» gapini qo‘shma gapga aylantiring.', a: 'Masalan: «Shunga ishonamanki, ustoz otadan ulug‘.»' },
      { q: '-a qo‘shimchasi «olima» so‘zida nimani bildiradi?', a: 'Ayol jinsini.' },
      { q: 'Yosh bosqichlarini tartib bilan ayting.', a: 'Chaqaloqlik, go‘daklik, bolalik, o‘smirlik, yoshlik, yigitlik, keksalik, qarilik.' },
    ],
  },

  /* ===================== 39 ===================== */
  {
    id: 'hunar-hikmatlari',
    source: 'V bob «Soha va kasblar» • 7-dars • 103–104-betlar',
    title: 'Hunar haqida hikmatlar. Ijodiy matn',
    short: '«Zamonamiz qahramonlari kimlar?», antonimlar, nisbatlar',
    lesson: [
      {
        title: 'Donishmandlar hunar haqida (5.35)',
        text: 'Ulug‘larning kasb-hunar haqidagi fikrlariga munosabat bildiring:',
        table: {
          head: ['Muallif', 'Hikmat mazmuni'],
          rows: [
            ['Alisher Navoiy', '«Hunarni asrabon netgumdur oxir, olib tufroqqamu ketgumdur oxir?!» — hunarni boshqalarga o‘rgatish kerak'],
            ['Mahmud Koshg‘ariy', 'Hunari va odobi bo‘lmagan kishidan baxt va davlat ketadi'],
            ['Husayn Voiz Koshifiy', 'Yoshlikda zahmat chekib ilm, hunar egallasang, qariganda rohat topasan'],
            ['Nizomiy Ganjaviy', '«Hunar o‘rgan, chunki hunarda ko‘p sir, yopiq eshiklarni ochar birma-bir»'],
          ],
        },
      },
      {
        title: 'Ijodiy matn: «Zamonamiz qahramonlari kimlar?» (5.36)',
        text: 'Yo‘riqnoma:',
        list: [
          'Mavzuni o‘rganib chiqing.',
          'Mavzu haqida ma’lumot to‘plang.',
          'To‘plagan ma’lumotlaringizni saralab oling.',
          'Tayanch tushunchalarni yozib chiqing.',
          'Mavzuga mos maqol, matal yoki hikmatli so‘zlardan foydalaning.',
        ],
      },
      {
        title: 'Ijodiy matnni baholash (5.38)',
        text: 'Sinfdoshingiz matnini quyidagi mezonlar bo‘yicha tahlil qiling:',
        table: {
          head: ['Mezon', 'Ball'],
          rows: [
            ['Mazmuni talabga javob berishi', '10'],
            ['Uslubiy xatolar yo‘qligi', '10'],
            ['Matn qismlari to‘g‘ri ketma-ketlikda', '10'],
            ['Imloviy xatolar yo‘qligi', '10'],
            ['Ishoraviy (tinish belgisi) xatolar yo‘qligi', '10'],
          ],
        },
      },
      {
        title: 'Antonimlar (5.39)',
        text: 'Kasbiy sifatlarni bildiruvchi so‘zlar va ularning antonimlari:',
        table: {
          head: ['So‘z', 'Antonimi'],
          rows: [
            ['xushfe’l', 'badfe’l'],
            ['tirishqoq', 'erinchoq'],
            ['mehnatsevar', 'dangasa'],
            ['intizomli', 'intizomsiz'],
            ['ishchan', 'yalqov'],
            ['to‘g‘riso‘z', 'yolg‘onchi'],
            ['adolatli', 'adolatsiz'],
            ['halol', 'nopok'],
          ],
        },
      },
      {
        title: 'Fe’llarni nisbatga ko‘ra ajratish (5.40)',
        text: 'Fe’llar nisbat shakliga ko‘ra:',
        table: {
          head: ['Nisbat', 'Fe’llar'],
          rows: [
            ['Aniq', 'kuzatmoq, sarflamoq, ta’mirlamoq, to‘plamoq, yangilamoq'],
            ['Majhul', 'atalmoq'],
            ['Orttirma', 'ta’mirlattirmoq, kuchaytirmoq, sarflattirmoq, yangilattirmoq'],
            ['Birgalik', 'kuzatishmoq, chizishmoq, to‘plashmoq'],
          ],
        },
      },
    ],
    pairs: [
      ['Navoiy', 'Hunarni asrab netgumdur oxir'],
      ['Nizomiy Ganjaviy', 'Hunar yopiq eshiklarni ochar'],
      ['Koshg‘ariy', 'Hunarsiz, odobsizdan baxt ketadi'],
      ['Koshifiy', 'Yoshlikda zahmat — qarilikda rohat'],
      ['tirishqoq', 'erinchoq'],
      ['ishchan', 'yalqov'],
    ],
    quiz: [
      { q: '«Hunar o‘rgan, chunki hunarda ko‘p sir...» kimning so‘zi?', options: ['Nizomiy Ganjaviy', 'Alisher Navoiy', 'Mahmud Koshg‘ariy', 'Husayn Voiz Koshifiy'], answer: 0 },
      { q: '«Mehnatsevar» so‘zining antonimi?', options: ['dangasa', 'tirishqoq', 'ishchan', 'halol'], answer: 0 },
      { q: '«Kuchaytirmoq» qaysi nisbatda?', options: ['orttirma', 'aniq', 'majhul', 'birgalik'], answer: 0 },
      { q: 'Ijodiy matnni baholashda nechta mezon bor?', options: ['5 ta', '3 ta', '8 ta', '10 ta'], answer: 0 },
      { q: '«Hunari va odobi bo‘lmagan kishidan baxt ketadi» — kimning fikri?', options: ['Mahmud Koshg‘ariy', 'Nizomiy', 'Navoiy', 'Koshifiy'], answer: 0 },
    ],
    sort: {
      categories: ['Aniq nisbat', 'Orttirma nisbat', 'Birgalik nisbat'],
      items: [
        { text: 'kuzatmoq', cat: 0 }, { text: 'kuchaytirmoq', cat: 1 }, { text: 'kuzatishmoq', cat: 2 },
        { text: 'to‘plamoq', cat: 0 }, { text: 'sarflattirmoq', cat: 1 }, { text: 'to‘plashmoq', cat: 2 },
        { text: 'yangilamoq', cat: 0 }, { text: 'ta’mirlattirmoq', cat: 1 }, { text: 'chizishmoq', cat: 2 },
      ],
    },
    qa: [
      { q: 'Navoiyning «Hunarni asrabon netgumdur oxir» baytini izohlang.', a: 'Hunarni yashirib nima qilaman, uni qabrga olib ketamanmi? — hunarni boshqalarga o‘rgatish kerak.' },
      { q: 'Ijodiy matn yozish yo‘riqnomasining bosqichlarini ayting.', a: 'Mavzuni o‘rganish, ma’lumot to‘plash, saralash, tayanch tushunchalar, maqol va hikmatlardan foydalanish.' },
      { q: '«To‘g‘riso‘z» va «adolatli» so‘zlarining antonimlari?', a: 'Yolg‘onchi, adolatsiz.' },
      { q: 'Zamonamiz qahramonlari kimlar?', a: 'Erkin javob: shifokorlar, o‘qituvchilar, olimlar, sportchilar va boshqa fidoyi insonlar.' },
      { q: '«Atalmoq» qaysi nisbatda?', a: 'Majhul nisbatda.' },
    ],
  },

  /* ===================== 40 ===================== */
  {
    id: 'ariza',
    source: 'V bob «Soha va kasblar» • 8-dars • 105–106-betlar',
    title: 'Rasmiy hujjat: ariza',
    short: 'Arizaning tuzilishi, namunasi va yozish qoidalari',
    lesson: [
      {
        title: 'Ariza namunasi (5.41)',
        text: 'Darslikdagi namuna:',
        list: [
          'Kimga: Toshkent viloyati Bo‘stonliq tumanidagi 41-umumiy o‘rta ta’lim maktabi direktori A. T. Rahimovga',
          'Kimdan: 9-sinf o‘quvchisi O. B. Salimovdan',
          'Nomi: ARIZA',
          'Matn: «Yosh suxandon» tanlovida ishtirok etayotganim uchun meni 27-mart kunidagi darslardan ozod qilishingizni so‘rayman.',
          'Imzo: (imzo) O. Salimov; sana: 2025-yil 18-fevral',
        ],
      },
      {
        title: 'Ariza nima?',
        text: '«Ariza» so‘zi «arz» (iltimos, shikoyatni bildirish) so‘zi bilan bog‘liq.',
        rule: 'Ariza — muayyan muassasa yoki mansabdor shaxs nomiga biror iltimos, taklif yoki shikoyat mazmunida yoziladigan rasmiy hujjat.',
      },
      {
        title: 'Arizaning zaruriy qismlari',
        text: 'Arizada quyidagi qismlar bo‘lishi shart:',
        list: [
          'Ariza yo‘llangan muassasa yoki mansabdor shaxsning nomi',
          'Ariza yozuvchining turar joyi, vazifasi, ismi, otasining ismi, familiyasi',
          'Hujjatning nomi (ariza)',
          'Asosiy matn (taklif, iltimos, shikoyat)',
          'Ilova qilinadigan hujjatlar nomi (zarur bo‘lsa)',
          'Ariza yozuvchining imzosi, ism-sharifining bosh harflari, familiyasi',
          'Ariza yozilgan sana (yil, kun va oy)',
        ],
      },
      {
        title: 'Qismlardan ariza tuzish (5.42)',
        text: 'Berilgan qismlar to‘g‘ri tartibda:',
        list: [
          'Zarafshon shahridagi 24-maktab direktori A. G. Zokirovga',
          '8-«A» sinf o‘quvchisi O. K. Xudoyberdiyevadan',
          'Ariza',
          'Men 2025-yil 18-mayda «Yosh matematiklar» respublika tanlovida ishtirok etishim zarur. Shu munosabat bilan meni 18-may sanasidagi darslardan ozod etishingizni so‘rayman.',
          'Arizamga «Yosh matematiklar» tanlovidagi ishtirokim haqida ma’lumotnomani ilova qilaman.',
          'O. K. Xudoyberdiyeva; sana',
        ],
      },
      {
        title: 'To‘g‘ri yozilgan birliklar (5.43–5.44)',
        text: 'Arizada qanday yozish to‘g‘ri?',
        table: {
          head: ['Qism', 'To‘g‘ri'],
          rows: [
            ['Sana', '2025-yil 19-aprel yoki 19.04.2025'],
            ['Kimdan', 'K. M. Kamolovdan'],
            ['Kimga', 'M. Anvarovga, M. I. Anvarovga'],
            ['Ilova', 'ilova qilaman'],
            ['Iltimos', 'ozod etishingizni so‘rayman'],
            ['Imlo', 'pasport ma’lumotlarim; o‘quv markazi direktori'],
          ],
        },
      },
      {
        title: 'Savollar',
        text: 'Darslikdagi savollar:',
        list: [
          '«Ariza» va «arz» so‘zlarining bog‘liqligi bormi?',
          'O‘quvchi sifatida kimga va qanday mazmunda ariza yoza olasiz?',
          'Arizani sizning nomingizdan boshqa shaxs yozishi mumkinmi?',
          'Ilova hujjat deganda nimani tushunasiz?',
          'Arizalar yakka yoki guruh holida yozilishiga misol keltiring.',
        ],
      },
    ],
    pairs: [
      ['Ariza', 'Rasmiy iltimos hujjati'],
      ['arz', 'Iltimos, shikoyat bildirish'],
      ['Ilova', 'Qo‘shib beriladigan hujjat'],
      ['Kimdan', 'K. M. Kamolovdan'],
      ['Kimga', 'M. Anvarovga'],
      ['Sana', '2025-yil 19-aprel'],
    ],
    quiz: [
      { q: 'Ariza qanday hujjat?', options: ['rasmiy hujjat', 'badiiy matn', 'shaxsiy xat', 'reklama'], answer: 0 },
      { q: 'Arizada qaysi qism bo‘lishi shart?', options: ['sana va imzo', 'rasm', 'she’r', 'reklama'], answer: 0 },
      { q: 'To‘g‘ri yozilgan sana?', options: ['2025-yil 19-aprel', '2025.19.04.', '19-aprel-2025-yil', 'aprel 19 2025'], answer: 0 },
      { q: 'To‘g‘ri yozilgan iltimos jumlasi?', options: ['ozod etishingizni so‘rayman', 'ozod etishingiz tarafdoriman', 'bo‘shatishingizni iltimos qilaman', 'bo‘shating'], answer: 0 },
      { q: '«Ariza» so‘zi qaysi so‘z bilan bog‘liq?', options: ['arz', 'ariq', 'arra', 'aroq'], answer: 0 },
      { q: 'To‘g‘ri yozilgan birikma?', options: ['pasport ma’lumotlarim', 'passport ma’lumotlarim', 'pasportt ma’lumotlarim', 'paspord ma’lumotlarim'], answer: 0 },
    ],
    sort: {
      categories: ['To‘g‘ri', 'Xato'],
      items: [
        { text: 'K. M. Kamolovdan', cat: 0 }, { text: 'Kamolov. K.M.dan', cat: 1 },
        { text: 'ozod etishingizni so‘rayman', cat: 0 }, { text: 'ozod etishingiz tarafdoriman', cat: 1 },
        { text: 'ilova qilaman', cat: 0 }, { text: 'ilovada bor', cat: 1 },
        { text: 'o‘quv markazi direktori', cat: 0 }, { text: 'o‘quv markazi direkto‘ri', cat: 1 },
      ],
    },
    qa: [
      { q: 'Ariza nima?', a: 'Muassasa yoki mansabdor shaxs nomiga iltimos, taklif yoki shikoyat mazmunida yoziladigan rasmiy hujjat.' },
      { q: 'Arizaning zaruriy qismlarini ayting.', a: 'Kimga, kimdan, nomi, asosiy matn, ilova, imzo, sana.' },
      { q: '«Ariza» va «arz» so‘zlari qanday bog‘langan?', a: '«Arz» — iltimos yoki shikoyatni bildirish; «ariza» shu so‘zdan.' },
      { q: 'Ilova hujjat nima?', a: 'Arizaga qo‘shib beriladigan, uni tasdiqlovchi hujjat (masalan, ma’lumotnoma).' },
      { q: 'O‘quvchi kimga ariza yoza oladi?', a: 'Masalan, maktab direktoriga darsdan ozod qilish yoki to‘garakka qabul qilish haqida.' },
    ],
  },
];

/* --- 8-sinf Ona tili: 41–50-darslar (darslik 2025, 107–133-betlar) --- */
const ONA_TILI_8_PART5 = [
  /* ===================== 41 ===================== */
  {
    id: 'ariza-xatolari',
    source: 'V bob «Soha va kasblar» • 9-dars • 107–108-betlar',
    title: 'Ariza xatolari. Bobni takrorlash',
    short: 'Arizadagi xatolarni topish, manzil yozilishi, variantdosh va juft so‘zlar',
    lesson: [
      {
        title: 'Manzil to‘g‘ri yozilishi (5.44)',
        text: 'Arizada yashash manzili ham imlo qoidasiga mos yozilishi kerak:',
        table: {
          head: ['To‘g‘ri', 'Xato'],
          rows: [
            ['Amir Temur ko‘chasi, 70-“B” uy', 'Amir Temur ko‘chasi 70b-uy'],
            ['“Totuvlik” ko‘chasi, 54-uy', 'Totuvlik ko‘chasi, 54-uy'],
            ['Yangihayot 5/2 dahasi, 19-uy, 25-xonadon', 'Yangihayot 5-2 dahasi 19 uy 25 xonadon'],
          ],
        },
        rule: 'Ko‘cha nomidan keyin vergul qo‘yiladi; uy raqami chiziqcha bilan yoziladi (54-uy).',
      },
      {
        title: 'Arizadagi xatolar (5.45): 1-namuna',
        text: 'Ota-ona o‘g‘lini 1-sinfga qabul qilish haqida ariza yozgan. Undagi xatolar:',
        table: {
          head: ['Xato', 'To‘g‘risi'],
          rows: [
            ['«qabul qilishingizni talab qilaman»', '«qabul qilishingizni so‘rayman» — arizada talab emas, iltimos bildiriladi'],
            ['direktorning ismi-familiyasi yo‘q', 'direktori F. I. Sh.ga'],
            ['«Chimboy ko‘chasi 42 uyda»', '«Chimboy ko‘chasi, 42-uyda»'],
            ['sana ko‘rsatilmagan', 'oxirida sana yoziladi: 2025-yil 20-avgust'],
          ],
        },
      },
      {
        title: 'Arizadagi xatolar: 2-namuna',
        text: 'Shifokor ishga kirish haqida ariza yozgan. Undagi kamchiliklar:',
        list: [
          'Imzodan keyin ism-sharif (bosh harflar) va familiya yozilmagan.',
          'Sana noto‘g‘ri tartibda: «25-avgust 2025-yil» emas, «2025-yil 25-avgust».',
          '«Kerakli hujjatlar ilova qilinadi» — ilovada aynan qaysi hujjatlar borligi sanab ko‘rsatilishi kerak.',
        ],
        note: '5.46: sinfdoshlaringiz bilan Temuriylar tarixi davlat muzeyiga sayohat uchun direktor nomiga ariza yozing.',
      },
      {
        title: 'Hujjatlardagi fe’llar (5.49)',
        text: 'Har bir rasmiy hujjatning o‘ziga xos fe’llari bor:',
        table: {
          head: ['Hujjat', 'Fe’llar', 'Nisbati'],
          rows: [
            ['Ariza', 'so‘rayman, ilova qilaman', 'aniq'],
            ['Tavsiyanoma', 'berildi, tavsiya etiladi', 'majhul'],
            ['Tarjimayi hol', 'tug‘ildim, bitirdim, tugatdim, ishladim', 'aniq'],
          ],
        },
      },
      {
        title: 'Variantdosh, paronim, juft so‘z (5.50)',
        text: 'Berilgan so‘zlarni uch guruhga ajratamiz:',
        table: {
          head: ['Variantdosh', 'Paronim', 'Juft so‘z'],
          rows: [
            ['andoza — andaza', 'adib — adip', 'savol-javob'],
            ['arobachi — aravachi', 'afzal — abzal', 'sayr-u sayohat'],
            ['archimoq — archmoq', 'alam — a’lam', 'izzat-ikrom'],
            ['bironta — birorta', 'shoh — shox', 'salom-alik'],
            ['gado — gadoy, qavat — qabat', 'abadiy — adabiy', 'odob-axloq'],
          ],
        },
      },
      {
        title: 'Ijodiy matn: «Men sevgan kasb» (5.52)',
        text: 'Matn to‘rt xatboshidan iborat bo‘ladi:',
        list: [
          '1-xatboshi: barcha kasblarning jamiyat rivojidagi ahamiyati.',
          '2-xatboshi: tanlagan kasbingiz va uni tanlash sabablari.',
          '3-xatboshi: bu kasbni egallash uchun rejalaringiz.',
          '4-xatboshi: kasbingiz orqali jamiyatga qanday hissa qo‘shmoqchisiz.',
        ],
        note: '5.48: tovush tushishi, almashishi va ortishiga 5 tadan misol yozing; 5.51: «Ko‘ngil shamchirog‘i» matnidan aniq va mavhum otlar toping.',
      },
    ],
    pairs: [
      ['andoza', 'andaza'],
      ['gado', 'gadoy'],
      ['qavat', 'qabat'],
      ['bironta', 'birorta'],
      ['so‘rayman', 'Arizadagi iltimos fe’li'],
      ['tug‘ildim', 'Tarjimayi hol fe’li'],
    ],
    quiz: [
      { q: 'Arizada qaysi ifoda noto‘g‘ri?', options: ['qabul qilishingizni talab qilaman', 'qabul qilishingizni so‘rayman', 'ozod etishingizni so‘rayman', 'ilova qilaman'], answer: 0 },
      { q: 'Manzil to‘g‘ri yozilgan qatorni toping.', options: ['“Totuvlik” ko‘chasi, 54-uy', 'Totuvlik ko‘chasi 54 uy', 'Totuvlik ko‘cha 54uy', 'Totuvlik, ko‘chasi 54-uy'], answer: 0 },
      { q: 'Sana to‘g‘ri yozilgan qatorni toping.', options: ['2025-yil 25-avgust', '25-avgust 2025-yil', 'avgust 25, 2025', '2025.25.08'], answer: 0 },
      { q: 'Qaysi juftlik variantdosh?', options: ['qavat — qabat', 'shoh — shox', 'adib — adip', 'alam — a’lam'], answer: 0 },
      { q: '«Berildi» fe’li qaysi hujjatga xos?', options: ['tavsiyanoma', 'ariza', 'tarjimayi hol', 'tilxat'], answer: 0 },
      { q: 'Qaysi biri juft so‘z?', options: ['izzat-ikrom', 'gado — gadoy', 'afzal — abzal', 'shoh — shox'], answer: 0 },
    ],
    sort: {
      categories: ['Variantdosh', 'Paronim', 'Juft so‘z'],
      items: [
        { text: 'andoza — andaza', cat: 0 }, { text: 'adib — adip', cat: 1 }, { text: 'savol-javob', cat: 2 },
        { text: 'gado — gadoy', cat: 0 }, { text: 'abadiy — adabiy', cat: 1 }, { text: 'salom-alik', cat: 2 },
        { text: 'qavat — qabat', cat: 0 }, { text: 'shoh — shox', cat: 1 }, { text: 'odob-axloq', cat: 2 },
      ],
    },
    qa: [
      { q: 'Nega arizada «talab qilaman» deyish noto‘g‘ri?', a: 'Ariza iltimos hujjati, unda «so‘rayman» deb yoziladi.' },
      { q: 'Arizaning oxirida nimalar yoziladi?', a: 'Imzo, ism-sharifning bosh harflari, familiya va sana.' },
      { q: 'Manzilni to‘g‘ri yozing: Amir Temur ko‘chasi 70b uy.', a: 'Amir Temur ko‘chasi, 70-“B” uy.' },
      { q: 'Tarjimayi holda qanday fe’llar ishlatiladi?', a: 'Tug‘ildim, o‘qidim, bitirdim, ishladim — aniq nisbatdagi fe’llar.' },
      { q: 'Variantdosh va paronim farqi nima?', a: 'Variantdosh — bir so‘zning ikki imlo shakli; paronim — talaffuzi yaqin, ma’nosi boshqa so‘zlar.' },
    ],
  },

  /* ===================== 42 ===================== */
  {
    id: 'chorak-takror-3',
    source: 'Chorak bo‘yicha mustahkamlash • 109–110-betlar',
    title: 'Chorak bo‘yicha mustahkamlash',
    short: 'Sinonimlar, aniqlovchi, rang nomlari imlosi, mavhum otlar',
    lesson: [
      {
        title: 'Sinonimlar (1-topshiriq)',
        text: 'Namuna: shikoyat — nolish, hasrat, arz. Qavs ichida sinonimlar soni berilgan:',
        table: {
          head: ['So‘z', 'Sinonimlari'],
          rows: [
            ['nur (3)', 'shu’la, ziyo, yog‘du'],
            ['ovoz (6)', 'tovush, sado, un, sas, nido, ohang'],
            ['rahmsiz (4)', 'shafqatsiz, berahm, bag‘ritosh, toshyurak'],
            ['sevinmoq (4)', 'quvonmoq, shodlanmoq, suyunmoq, xursand bo‘lmoq'],
          ],
        },
      },
      {
        title: 'Aniqlovchi qaysi turkumdan bo‘ladi? (2-topshiriq)',
        text: 'Aniqlovchi turli so‘z turkumlari bilan ifodalanadi:',
        table: {
          head: ['So‘z', 'Misol', 'Turkumi'],
          rows: [
            ['beshinchi', 'beshinchi sinf', 'son'],
            ['qiziqarli', 'qiziqarli kitob', 'sifat'],
            ['o‘qigan', 'o‘qigan kitobim', 'sifatdosh (fe’l shakli)'],
            ['zumrad', 'zumrad dala', 'ot'],
            ['gurs-gurs', 'gurs-gurs qadam', 'taqlid so‘z'],
            ['bizning', 'bizning maktab', 'olmosh'],
          ],
        },
      },
      {
        title: 'Rang nomlari imlosi (3-topshiriq)',
        text: 'Rang bildiruvchi birikmalar ikki xil yoziladi:',
        rule: 'Asl rang nomi bilan «rang» so‘zi ajratib yoziladi: qizil rang, ko‘k rang. Biror narsa nomi orqali rang ifodalansa, qo‘shib yoziladi: kulrang, jigarrang.',
        table: {
          head: ['Ajratib yoziladi', 'Qo‘shib yoziladi'],
          rows: [
            ['qizil rang', 'kulrang'],
            ['ko‘k rang', 'jigarrang'],
            ['sariq rang', 'havorang'],
            ['yashil rang', 'pushtirang'],
            ['oq rang', 'novvotrang, sabzirang, bug‘doyrang'],
          ],
        },
      },
      {
        title: 'Mavhum ot yasash (4-topshiriq)',
        text: 'Namuna: quvon + ch = quvonch.',
        table: {
          head: ['So‘z', 'Mavhum ot'],
          rows: [
            ['dehqon', 'dehqonchilik'],
            ['odam', 'odamiylik'],
            ['bor', 'borliq'],
            ['qonuniy', 'qonuniylik'],
            ['sev', 'sevgi'],
            ['yaxshi', 'yaxshilik'],
            ['kamol', 'kamolot'],
            ['tayan', 'tayanch'],
          ],
        },
      },
      {
        title: 'Chorak yakuni: nimalarni o‘rgandik?',
        text: 'III–V boblar mavzulari:',
        list: [
          'Omonim, paronim, variantdosh so‘zlar',
          'Aniq va mavhum otlar',
          'Tovush ortishi, tushishi va almashishi',
          'Fe’l nisbatlari',
          'Sodda va qo‘shma gaplar ma’nodoshligi',
          'Rasmiy hujjat: ariza',
        ],
      },
    ],
    pairs: [
      ['nur', 'ziyo'],
      ['rahmsiz', 'shafqatsiz'],
      ['sevinmoq', 'quvonmoq'],
      ['ovoz', 'sado'],
      ['tayan', 'tayanch'],
      ['kamol', 'kamolot'],
    ],
    quiz: [
      { q: 'Qaysi biri qo‘shib yoziladi?', options: ['kulrang', 'qizil rang', 'sariq rang', 'oq rang'], answer: 0 },
      { q: '«Nur» so‘zining sinonimi?', options: ['yog‘du', 'tovush', 'sado', 'soya'], answer: 0 },
      { q: '«Bizning maktab» birikmasida aniqlovchi qaysi turkum?', options: ['olmosh', 'ot', 'sifat', 'son'], answer: 0 },
      { q: '«Sev» so‘zidan yasalgan mavhum ot?', options: ['sevgi', 'sevinch', 'sevimli', 'sevar'], answer: 0 },
      { q: '«Rahmsiz» so‘zining sinonimi?', options: ['bag‘ritosh', 'mehribon', 'rahmdil', 'ochiqko‘ngil'], answer: 0 },
      { q: 'To‘g‘ri yozilganini toping.', options: ['jigarrang', 'jigar rang', 'ko‘krang', 'qizilrang'], answer: 0 },
    ],
    sort: {
      categories: ['Ajratib yoziladi', 'Qo‘shib yoziladi'],
      items: [
        { text: 'qizil rang', cat: 0 }, { text: 'kulrang', cat: 1 },
        { text: 'ko‘k rang', cat: 0 }, { text: 'jigarrang', cat: 1 },
        { text: 'yashil rang', cat: 0 }, { text: 'havorang', cat: 1 },
        { text: 'sariq rang', cat: 0 }, { text: 'pushtirang', cat: 1 },
      ],
    },
    qa: [
      { q: '«Ovoz» so‘zining 3 ta sinonimini ayting.', a: 'Tovush, sado, un (sas, nido).' },
      { q: 'Nega «kulrang» qo‘shib yoziladi?', a: 'Rang narsa nomi (kul) orqali ifodalangan.' },
      { q: '«Dehqon» so‘zidan mavhum ot yasang.', a: 'Dehqonchilik.' },
      { q: '«O‘qigan kitobim» birikmasida aniqlovchi qanday ifodalangan?', a: 'Sifatdosh (fe’lning shakli) bilan.' },
      { q: '«Sevinmoq» fe’lining sinonimlari?', a: 'Quvonmoq, shodlanmoq, suyunmoq.' },
    ],
  },

  /* ===================== 43 ===================== */
  {
    id: 'inson-va-tabiat',
    source: 'VI bob «Inson va tabiat» • 1-dars • 111–113-betlar',
    title: 'Inson va tabiat. Ko‘chirma gap',
    short: 'Konstitutsiyada tabiat muhofazasi, diagramma, ko‘chirma gap qoliplari',
    lesson: [
      {
        title: 'Darsga kirish',
        text: 'Yangi bob — «Inson va tabiat». Savollar:',
        list: [
          'Dunyo atrof-muhit kuni qachon nishonlanadi? (5-iyun)',
          'Tabiatni muhofaza qilish bilan bog‘liq qanday qonun va qarorlarni bilasiz?',
          'Ekologik madaniyat deganda nimani tushunasiz?',
          '«Ekologik tarbiya oiladan boshlanadi» degan fikrni izohlang.',
        ],
      },
      {
        title: 'Konstitutsiyada tabiat (6.1)',
        text: 'O‘zbekiston Respublikasi Konstitutsiyasidan:',
        table: {
          head: ['Modda', 'Mazmuni'],
          rows: [
            ['66-modda', 'Mol-mulkdan foydalanish atrof-muhitga zarar yetkazmasligi, boshqalarning huquqlarini buzmasligi kerak.'],
            ['68-modda', 'Yer, yerosti boyliklari, suv, o‘simlik va hayvonot dunyosi — umummilliy boylik; ulardan oqilona foydalanish zarur va ular davlat muhofazasida.'],
          ],
        },
      },
      {
        title: 'Inson va tabiat uyg‘unligi (6.2)',
        text: 'Darslikdagi fikrlar:',
        list: [
          'Inson tabiat bilan bir butun, shuning uchun doim tabiatga oshiqadi va uning bag‘rida taskin topadi.',
          'Tabiat mo‘jizalari inson qalbini, ruhiyatini boyitadi, yangi g‘oyalar sari yetaklaydi.',
          'Tabiatni asrash har birimizning burchimiz, uni kelajak avlodga butun yetkazishimiz lozim.',
          'Tabiat qo‘ynida vaqt o‘tkazish kishining ichki muvozanatini tiklaydi.',
        ],
      },
      {
        title: 'Diagramma bilan ishlash (6.3–6.4)',
        text: 'Diagrammada 2018–2020-yillarda O‘zbekiston eksport tovarlarining asosiy guruhlari berilgan: qimmatbaho metall va toshlar, to‘qimachilik, mineral mahsulotlar, o‘simlik mahsulotlari, kimyo sanoati mahsulotlari, qimmatbaho bo‘lmagan metallar.',
        table: {
          head: ['Mahsulot «o‘zi haqida» gapiradi', 'Qaysi mahsulot?'],
          rows: [
            ['«Insonlarni sovuqdan asraymiz»', 'to‘qimachilik mahsulotlari'],
            ['«Yorqin, qimmatlimiz. Eng katta o‘sish bizga tegishli»', 'qimmatbaho metall va toshlar'],
            ['«Taqdirimiz tabiat hodisalari bilan bog‘liq»', 'o‘simlik mahsulotlari'],
          ],
        },
        note: '6.5: tabiat bilan bog‘liq 14 ta so‘z yozing va imlo lug‘atidan tekshiring.',
      },
      {
        title: 'Ko‘chirma gap',
        text: 'Boshqa shaxsning nutqi aynan, o‘zgartirilmasdan berilsa, u ko‘chirma gap bo‘ladi. Kimning gapi ekanini bildiruvchi qism — muallif gapi.',
        rule: 'Ko‘chirma gapli qo‘shma gap ikki qismdan iborat: muallif gapi va ko‘chirma gap. Ko‘chirma gap qo‘shtirnoq ichida yoziladi.',
      },
      {
        title: 'Ko‘chirma gap qoliplari (6.6)',
        text: 'Muallif gapi va ko‘chirma gapning o‘rniga qarab tinish belgilari:',
        table: {
          head: ['Qolip', 'Misol'],
          rows: [
            ['Muallif gapi + ko‘chirma gap', 'Ustoz dedi: «Tabiatni asrang».'],
            ['Ko‘chirma gap + muallif gapi', '«Tabiatni asrang», — dedi ustoz.'],
            ['Ko‘chirma + muallif + ko‘chirma', '«Tabiat — ona, — dedi ustoz, — uni asrang».'],
            ['Muallif + ko‘chirma + muallif', 'Ustoz: «Tabiatni asrang», — deb takrorladi.'],
          ],
        },
      },
    ],
    pairs: [
      ['68-modda', 'Tabiiy resurslar — umummilliy boylik'],
      ['66-modda', 'Mulkdan foydalanish tabiatga zarar yetkazmasin'],
      ['5-iyun', 'Dunyo atrof-muhit kuni'],
      ['ko‘chirma gap', 'O‘zgalar nutqining aynan berilishi'],
      ['muallif gapi', 'Kimning gapi ekanini bildiradi'],
      ['qo‘shtirnoq', 'Ko‘chirma gap belgisi'],
    ],
    quiz: [
      { q: 'Dunyo atrof-muhit kuni qachon?', options: ['5-iyun', '22-aprel', '1-sentyabr', '21-mart'], answer: 0 },
      { q: 'Konstitutsiyaning qaysi moddasida tabiiy resurslar umummilliy boylik deyilgan?', options: ['68-modda', '66-modda', '1-modda', '100-modda'], answer: 0 },
      { q: 'Ko‘chirma gap qanday belgi ichida yoziladi?', options: ['qo‘shtirnoq', 'qavs', 'vergul', 'nuqta'], answer: 0 },
      { q: '«Tabiatni asrang», — dedi ustoz. Bu qaysi qolip?', options: ['ko‘chirma gap + muallif gapi', 'muallif gapi + ko‘chirma gap', 'faqat muallif gapi', 'sodda gap'], answer: 0 },
      { q: '«Insonlarni sovuqdan asraymiz» — qaysi mahsulot?', options: ['to‘qimachilik', 'kimyo', 'mineral', 'metall'], answer: 0 },
    ],
    sort: {
      categories: ['Muallif gapi', 'Ko‘chirma gap'],
      items: [
        { text: 'dedi ustoz', cat: 0 }, { text: '«Tabiatni asrang»', cat: 1 },
        { text: 'deb so‘radi Anvar', cat: 0 }, { text: '«Bog‘ga boramizmi?»', cat: 1 },
        { text: 'Onam dedilar', cat: 0 }, { text: '«Daraxt ek»', cat: 1 },
        { text: 'deb javob berdi', cat: 0 }, { text: '«Albatta, ekaman»', cat: 1 },
      ],
    },
    qa: [
      { q: 'Ekologik madaniyat nima?', a: 'Tabiatga ongli, ehtiyotkor munosabatda bo‘lish, uni asrash odati.' },
      { q: '68-moddaga ko‘ra kimlar tabiiy boyliklar muhofazasi uchun javobgar?', a: 'Ular davlat muhofazasida; ulardan oqilona foydalanish hammaning burchi.' },
      { q: 'Ko‘chirma gap nima?', a: 'Boshqa shaxs nutqining aynan berilishi.' },
      { q: '«Ko‘chirma + muallif + ko‘chirma» qolipiga misol keltiring.', a: '«Tabiat — ona, — dedi ustoz, — uni asrang».' },
      { q: 'Tabiat qo‘ynida vaqt o‘tkazish insonga qanday ta’sir qiladi?', a: 'Ichki muvozanatni tiklaydi, tashvishlardan xalos qiladi, baxt hissini beradi.' },
    ],
  },

  /* ===================== 44 ===================== */
  {
    id: 'yashil-opka',
    source: 'VI bob «Inson va tabiat» • 2-dars • 113–117-betlar',
    title: '«Shaharlarning “yashil o‘pka”si»',
    short: 'Botanika bog‘lari haqidagi matn tahlili',
    lesson: [
      {
        title: 'Botanika bog‘i va istirohat bog‘i',
        text: 'Matn ikki xil bog‘ni farqlashdan boshlanadi:',
        table: {
          head: ['Istirohat bog‘i', 'Botanika bog‘i'],
          rows: [
            ['sayr, ko‘ngil yozish, o‘yin-kulgi uchun', 'o‘simliklarni saqlash, o‘rganish, aholiga tanishtirish uchun'],
            ['tadqiqot o‘tkazilmaydi', 'ilmiy tadqiqot olib boriladi'],
            ['Qizil kitobdagi o‘simliklar deyarli yo‘q', 'noyob, yo‘qolish xavfidagi turlar parvarishlanadi'],
          ],
        },
        rule: 'Botanika bog‘lari — ilmiy tadqiqot va jamiyat o‘rtasidagi ko‘prik, o‘simliklar esa aloqa vositasi. Ularni bolalar uchun «yashil maktab» desa ham bo‘ladi.',
      },
      {
        title: 'Singapur botanika bog‘i',
        text: 'Singapurning 56 foizi yashillik bilan qoplangan, har bir daraxtning ID raqami bor.',
        list: [
          '1859-yilda tashkil topgan; maydoni 32 gektardan 82 gektarga yetgan.',
          'YUNESCO ro‘yxatiga olingan dunyodagi uchinchi, Osiyodagi birinchi botanika bog‘i.',
          'Milliy orxideyalar bog‘ida 6 mingdan ortiq orxideya bor, ular orasida O‘zbekiston prezidentlari sharafiga nomlangan gullar ham bor.',
          'Bog‘da 10 mingdan ortiq o‘simlik turi; yiliga 4,5 mln kishi tashrif buyuradi.',
          'Bitta bargni qasddan uzish jarimasi 3500 AQSH dollarigacha yetishi mumkin.',
        ],
      },
      {
        title: 'Germaniya bog‘lari',
        text: 'Germaniyada 90 ga yaqin botanika bog‘i bor.',
        list: [
          'Gyottingendagi 300 yilga yaqin tarixga ega bog‘ atigi 4,5 gektar, lekin unda 17 ming xil o‘simlik bor.',
          'Bu ko‘rsatkich bo‘yicha u Berlin-Dalem bog‘idan keyin 2-o‘rinda — «Gyottingen durdonasi».',
          'Noyob o‘simliklar XIX asrga oid issiqxonalarda, kerakli haroratda saqlanadi.',
        ],
      },
      {
        title: 'Toshkent botanika bog‘i',
        text: 'MDH hududidagi eng katta va qadimiy bog‘lardan biri.',
        list: [
          '67 gektar maydon, poytaxtning shimoliy qismida.',
          'Dunyoning besh hududi o‘simliklari: Markaziy Osiyo, Sharqiy Osiyo, Uzoq Sharq, Yevropa, Shimoliy Amerika.',
          '6000 dan ortiq o‘simlik turi: 170 ta ignabargli daraxt, 800 ga yaqin tropik va subtropik, 2000 dan ortiq ko‘p yillik turlar.',
          'Oqqo‘rg‘on kanali suvi bog‘ga o‘zi oqib keladi.',
          '30 dan ortiq turdagi ekzotik qushlarni uchratish mumkin.',
        ],
      },
      {
        title: 'Yangi birikmalar (6.7)',
        text: 'Matndagi birikmalar izohi:',
        table: {
          head: ['Birikma', 'Izohi'],
          rows: [
            ['ignabargli daraxtlar', 'barglari tangacha yoki ignasimon, qarag‘ay toifa o‘simliklar'],
            ['rezavor butalar', 'sershira, meva beruvchi ko‘p yillik butalar'],
            ['suv havzalari', 'pastqam joyda suv to‘planishidan hosil bo‘lgan suv manbayi'],
            ['ilmiy tadqiqot', 'yangi bilimlarni ishlab chiqish jarayoni'],
            ['dorivor o‘simliklar', 'davolash uchun ishlatiladigan giyohlar'],
            ['gibrid o‘simliklar', 'chatishtirish natijasida hosil qilingan yangi tur'],
          ],
        },
      },
      {
        title: 'To‘g‘ri yoki noto‘g‘ri? (6.8)',
        text: 'Matn asosida:',
        table: {
          head: ['Hukm', 'Javob'],
          rows: [
            ['Istirohat bog‘larida Qizil kitobga kiritilgan o‘simliklar o‘stiriladi.', 'noto‘g‘ri'],
            ['Botanika bog‘lari biologik merosni asrash uchun tashkil etiladi.', 'to‘g‘ri'],
            ['Singapur bog‘ida O‘zbekiston prezidentlari sharafiga gullar bor.', 'to‘g‘ri'],
            ['Germaniyada 90 ga yaqin botanika bog‘i bor.', 'to‘g‘ri'],
            ['Toshkent botanika bog‘ida Simfonik ko‘l joylashgan.', 'noto‘g‘ri (u Singapurda)'],
          ],
        },
        note: '6.10: O‘zbekistondagi qo‘riqxonalar haqida ma’lumot to‘plab, jadval tuzing.',
      },
    ],
    pairs: [
      ['Singapur bog‘i', '1859-yil, 82 gektar'],
      ['Toshkent bog‘i', '67 gektar, 6000+ tur'],
      ['Gyottingen bog‘i', '4,5 gektar, 17 ming tur'],
      ['gibrid', 'Chatishtirilgan yangi tur'],
      ['rezavor', 'Sershira meva beruvchi buta'],
      ['dorivor', 'Davolovchi giyoh'],
    ],
    quiz: [
      { q: 'Botanika bog‘ining asosiy vazifasi?', options: ['o‘simliklarni saqlash, o‘rganish va tanishtirish', 'faqat dam olish', 'attraksionlar', 'savdo'], answer: 0 },
      { q: 'Simfonik ko‘l qaysi bog‘da?', options: ['Singapur botanika bog‘ida', 'Toshkent botanika bog‘ida', 'Gyottingen bog‘ida', 'Berlin-Dalem bog‘ida'], answer: 0 },
      { q: 'Toshkent botanika bog‘ining maydoni?', options: ['67 gektar', '82 gektar', '4,5 gektar', '32 gektar'], answer: 0 },
      { q: 'Singapurning necha foizi yashillik bilan qoplangan?', options: ['56 %', '26 %', '90 %', '10 %'], answer: 0 },
      { q: 'Germaniyada nechta botanika bog‘i bor?', options: ['90 ga yaqin', '17 ta', '300 ta', '5 ta'], answer: 0 },
      { q: '«Gibrid o‘simlik» nima?', options: ['chatishtirish natijasidagi yangi tur', 'yovvoyi o‘t', 'qurigan daraxt', 'dorivor giyoh'], answer: 0 },
    ],
    sort: {
      categories: ['To‘g‘ri', 'Noto‘g‘ri'],
      items: [
        { text: 'Germaniyada 90 ga yaqin botanika bog‘i bor', cat: 0 }, { text: 'Simfonik ko‘l Toshkentda', cat: 1 },
        { text: 'Botanika bog‘lari biologik merosni asraydi', cat: 0 }, { text: 'Istirohat bog‘larida tadqiqot o‘tkaziladi', cat: 1 },
        { text: 'Singapur bog‘i YUNESCO ro‘yxatida', cat: 0 }, { text: 'Toshkent bog‘i 4,5 gektar', cat: 1 },
        { text: 'Toshkent bog‘iga Oqqo‘rg‘on kanali suvi keladi', cat: 0 }, { text: 'Singapurda barg uzish jarimasiz', cat: 1 },
      ],
    },
    qa: [
      { q: 'Nega botanika bog‘larini «yashil o‘pka» deyishadi?', a: 'Ular havoni tozalaydi, shaharni yashillik bilan ta’minlaydi.' },
      { q: 'Nega daraxtlarga ID raqam beriladi?', a: 'Har birini hisobga olish, parvarish va nazorat qilish uchun.' },
      { q: 'Botanika bog‘i va istirohat bog‘ining asosiy farqi?', a: 'Botanika bog‘ida ilmiy tadqiqot olib boriladi, noyob o‘simliklar saqlanadi.' },
      { q: '«Botanika bog‘lari ilmiy tadqiqot va jamiyat o‘rtasidagi ko‘prik» fikrini izohlang.', a: 'Olimlar o‘rgangan narsani bog‘ orqali odamlar ko‘radi, tabiatni tanib oladi.' },
      { q: 'Toshkent botanika bog‘ida qaysi hududlar o‘simliklari bor?', a: 'Markaziy va Sharqiy Osiyo, Uzoq Sharq, Yevropa, Shimoliy Amerika.' },
    ],
  },

  /* ===================== 45 ===================== */
  {
    id: 'muhokama-esse',
    source: 'VI bob «Inson va tabiat» • 3-dars • 117–121-betlar',
    title: 'Muhokama esse',
    short: 'Esse tuzilishi, namuna, til xususiyatlari va ko‘p uchraydigan xatolar',
    lesson: [
      {
        title: 'Diagrammalar muhokamasi (6.12)',
        text: 'Diagrammalarda 14 ta shaharda suvdan foydalanish, havo sifati, chiqindilarni yig‘ish va qayta ishlash ko‘rsatkichlari berilgan.',
        list: [
          'Shaharlarni bir-biri bilan solishtiring.',
          'Havo sifati past bo‘lishiga qanday omillar sabab bo‘lishi mumkin?',
          'Chiqindilarni qayta ishlash nega muhim?',
        ],
      },
      {
        title: 'Muhokama esse nima?',
        text: 'Esse — ixcham ijodiy matn. Muhokama esseda bir masala bo‘yicha ikki xil qarash solishtiriladi.',
        rule: 'Muhokama esse — muayyan vaziyat yuzasidan shaxsiy fikr-mulohazalar, fakt va dalillarga tayanib publitsistik uslubda yozma bayon qilinadigan ixcham ijodiy matn.',
      },
      {
        title: 'Esse tuzilishi (6.13)',
        text: 'Qolip:',
        table: {
          head: ['Qism', 'Mazmuni'],
          rows: [
            ['Kirish (1 xatboshi)', 'berilgan vaziyat o‘z so‘zingiz bilan qayta yoziladi'],
            ['Asosiy qism (2–3 xatboshi)', '1-qarashga munosabat va dalil; 2-qarashga munosabat va dalil; muallifning yondashuvi'],
            ['Xulosa (1 xatboshi)', 'fikrlar xulosalanadi'],
          ],
        },
      },
      {
        title: 'Namuna esse (6.14)',
        text: 'Mavzu: shaharlar infratuzilmasi yangilanmoqda. Bu yashash sharoitini yaxshilaydimi yoki havoni ifloslantiradimi?',
        list: [
          'Kirish: texnologiya taraqqiyoti shaharsozlikni o‘zgartirmoqda, lekin ekologiyaga salbiy ta’siri ham bor.',
          '1-qarash: ko‘p qavatli binolar, «aqlli uy»lar, yerusti metro va veloyo‘laklar qulaylik yaratadi.',
          '2-qarash: 14 ta markazdan 6 tasida havo sifati 50% dan past; chang va gazlar kasallik, kislotali yomg‘irlar keltiradi.',
          'Yondashuv: Yaponiyada qurilish maydonlariga kuniga uch mahal suv sepiladi; Niderlandiyada chang yutuvchi moslama soatiga 30 000 m³ havoni tozalaydi; ekoparklar, tomusti bog‘lari.',
          'Xulosa: infratuzilmani yangilash kerak, lekin ekotizim izdan chiqmasligi lozim.',
        ],
      },
      {
        title: 'Esse tili va xatolar (6.15)',
        text: 'Nimalarga amal qilish va nimadan qochish kerak:',
        table: {
          head: ['Til xususiyatlari', 'Ko‘p uchraydigan xatolar'],
          rows: [
            ['publitsistik uslubda yoziladi', 'mavzudan chekinish'],
            ['murakkab sodda va qo‘shma gaplar', 'matn yaxlitligiga amal qilmaslik'],
            ['adabiy til me’yorlariga amal qilinadi', 'mantiqiy izchillikning buzilishi'],
            ['badiiy vositalar o‘rinsiz ishlatilmaydi', 'o‘z fikriga qarshi chiqish'],
            ['sinonimlardan unumli foydalaniladi', 'uslubiy chekinish'],
            ['maqol, kirish so‘zlar ishlatiladi', 'fikr va so‘z takrori'],
          ],
        },
      },
      {
        title: 'Esse yozish va tahrirlash (6.16–6.17)',
        text: 'Vaziyatlardan birini tanlang: hayvonlar ustida tajriba; ekoturizm foydasi va xavfi; yonilg‘i narxini oshirish ekologik muammoni hal qiladimi?',
        list: [
          'Mavzuni o‘rganing, ma’lumot to‘plang va saralang.',
          'Tayanch tushunchalar va mos maqollarni yozing.',
          'Qoralama yozing, so‘ng mazmuni, uslubi, imlosi va tinish belgilarini tekshiring.',
          'Oqqa ko‘chiring.',
        ],
        note: '6.18: o‘z hududingizdagi ekologik muammolarni darajalarga ajrating va yechim taklif qiling.',
      },
    ],
    pairs: [
      ['Kirish', 'Vaziyat qayta yoziladi'],
      ['Asosiy qism', 'Ikki qarash va dalillar'],
      ['Xulosa', 'Fikrlar yakunlanadi'],
      ['Publitsistik uslub', 'Esse uslubi'],
      ['Qoralama', 'Birinchi nusxa'],
      ['Dalil', 'Fikrni isbotlovchi fakt'],
    ],
    quiz: [
      { q: 'Muhokama esse qaysi uslubda yoziladi?', options: ['publitsistik', 'rasmiy', 'so‘zlashuv', 'ilmiy'], answer: 0 },
      { q: 'Esseda asosiy qism nechta xatboshi bo‘ladi?', options: ['2–3 ta', '1 ta', '6 ta', '10 ta'], answer: 0 },
      { q: 'Kirish qismida nima qilinadi?', options: ['vaziyat qayta yoziladi', 'xulosa chiqariladi', 'faqat maqol yoziladi', 'imzo qo‘yiladi'], answer: 0 },
      { q: 'Qaysi biri esse xatosi?', options: ['mavzudan chekinish', 'sinonimlardan foydalanish', 'dalil keltirish', 'kirish so‘z ishlatish'], answer: 0 },
      { q: 'Niderlandiyadagi chang yutuvchi moslama soatiga qancha havoni tozalaydi?', options: ['30 000 m³', '300 m³', '3 mln m³', '50 m³'], answer: 0 },
    ],
    sort: {
      categories: ['Esse talabi', 'Esse xatosi'],
      items: [
        { text: 'publitsistik uslub', cat: 0 }, { text: 'mavzudan chekinish', cat: 1 },
        { text: 'dalil keltirish', cat: 0 }, { text: 'o‘z fikriga qarshi chiqish', cat: 1 },
        { text: 'sinonimlardan foydalanish', cat: 0 }, { text: 'so‘z takrori', cat: 1 },
        { text: 'mantiqiy izchillik', cat: 0 }, { text: 'badiiy vositani o‘rinsiz ishlatish', cat: 1 },
      ],
    },
    qa: [
      { q: 'Muhokama esse nima?', a: 'Vaziyat yuzasidan fakt va dalillarga tayanib publitsistik uslubda yozilgan ixcham ijodiy matn.' },
      { q: 'Esse qanday qismlardan iborat?', a: 'Kirish, asosiy qism (ikki qarash va muallif yondashuvi), xulosa.' },
      { q: 'Esseda nega ikki qarash yoritiladi?', a: 'Masalani har tomonlama ko‘rib chiqish va o‘z fikrini asoslash uchun.' },
      { q: 'Shahar havosini tozalash uchun qanday tajribalar bor?', a: 'Qurilishga suv sepish (Yaponiya), chang yutuvchi moslama (Niderlandiya), ekoparklar, tomusti bog‘lari.' },
      { q: 'Esseni tahrirlashda nimalar tekshiriladi?', a: 'Mazmun, uslub, imlo, tinish belgilari va qismlarning to‘g‘riligi.' },
    ],
  },

  /* ===================== 46 ===================== */
  {
    id: 'sevinchning-qushlari',
    source: 'VI bob «Inson va tabiat» • 4-dars • 121–125-betlar',
    title: '«Sevinchning qushlari»',
    short: 'Qo‘chqor Norqobil hikoyasi tahlili, ijtimoiy tarmoqdagi muhokama',
    lesson: [
      {
        title: 'Darsga kirish',
        text: 'Hayvon va qushlarga mehribonlik ko‘rsatganmisiz? Nega qushlarni «qanotli do‘stlarimiz» deymiz?',
        note: 'Hikoya muallifi — Qo‘chqor Norqobil. Voqea otaning tilidan hikoya qilinadi.',
      },
      {
        title: 'Hikoya mazmuni (1-qism)',
        text: 'Qahraton qish. Sevinchning uyi sovib ketgani uchun u go‘dagini olib otasinikiga keladi.',
        list: [
          'Sevinch har kuni deraza tashqarisiga non ushoqlari solingan likopcha qo‘yadi: «Qushlar yeyishadi, bu sovuqda o‘lib qolishadi».',
          'Ota avval ishonmaydi: «Shunday izg‘irinda qush ucharmidi?»',
          'Ertasiga likopcha bo‘m-bo‘sh bo‘ladi. Sevinch ketishidan oldin uch-to‘rt hissa ko‘p yem qoldiradi.',
          'Ota ham do‘kondan qushlar uchun maxsus ozuqa olib, ularni boqa boshlaydi.',
        ],
      },
      {
        title: 'Hikoya mazmuni (2-qism)',
        text: 'Yakshanba kuni ota shoshib uydan chiqadi, mashinasiga o‘t oldiradi.',
        list: [
          'Ikki qush jon holatda deraza oynasiga o‘zini uraveradi, patlari to‘kiladi.',
          'Ota uyga yugurib kiradi: dazmol o‘chirilmagan ekan, ko‘ylak kuyib, taxta tutay boshlagan.',
          'Ota derazalarni ochadi, yong‘inning oldi olinadi.',
          'Qushlarning tumshug‘idan qon sizib turardi. Ota ko‘zida yosh bilan pichirlaydi: «Rahmat sizga, Sevinchning qushlari!»',
        ],
        rule: 'G‘oya: yaxshilik qilsang, yaxshilik qaytadi; tabiatga mehr ko‘rsatgan insonga tabiat ham mehr bilan javob beradi.',
      },
      {
        title: 'Obrazli jumlalar (6.19)',
        text: 'Muallif qish sovug‘ini va voqeani ta’sirli tasvirlash uchun obrazli ifodalardan foydalangan:',
        table: {
          head: ['Jumla', 'Ma’nosi'],
          rows: [
            ['Qahraton qoningni qatron etadi.', 'sovuq shunchalik qattiqki, qonni muzlatadi'],
            ['Qishning qahri qo‘zidi.', 'qish eng qattiq pallaga kirdi'],
            ['Eti yupqaning etigi ham yirtiq bo‘ladi.', 'qiyinchilik ojiz odamga ko‘proq tushadi'],
            ['...nabiramizning qiliqlari qirni qimirlatadi.', 'go‘dakning sho‘xligi hammani quvontiradi'],
            ['Ko‘chada qatnovlar ham muz tortdi.', 'sovuqdan ko‘chalar huvillab qoldi'],
            ['Ich-ichimdan qaltiroq turdi.', 'qattiq hayajonlandi, ta’sirlandi'],
          ],
        },
      },
      {
        title: 'Testlar (6.20)',
        text: 'Noto‘g‘ri hukmlarni to‘g‘rilaymiz:',
        table: {
          head: ['Hukm', 'Javob'],
          rows: [
            ['Sevinch bolasi shamollab qolgani uchun otasinikiga keldi.', 'noto‘g‘ri — uyi sovib ketgani uchun'],
            ['Ota Sevinchga rahmat aytdi.', 'noto‘g‘ri — qushlarga rahmat aytdi'],
            ['Ota qushlar uchun maxsus ozuqa olib keldi.', 'to‘g‘ri'],
            ['Sevinch dazmolni o‘chirishni unutgan edi.', 'noto‘g‘ri — otaning o‘zi unutgan'],
          ],
        },
      },
      {
        title: 'Telegram guruhidagi muhokama (6.22–6.23)',
        text: 'Sinfdoshlar hikoya haqida yozishadi: Nafisa qushlarni himoya qiladigan tashkilot kerakligini aytadi, boshqalar «Mehr va oqibat» jamiyati, «Hayot» boshpanasini eslaydi.',
        list: [
          'Ba’zi a’zolar mavzudan chetlashadi (mushugining arazlagani haqida yozadi).',
          'Nafisa loyiha ishlab chiqib, murojaat qilishni taklif qiladi.',
          'Akram ekoko‘priklar qurish va ko‘ngillilar tashkilotini tuzishni qo‘shadi.',
        ],
        note: '6.24: «Tabiatning joni bor», «Yashil makon» yoki «Kichik ekoko‘ngillilar» mavzusida loyiha rejasini tuzing.',
      },
    ],
    pairs: [
      ['Qo‘chqor Norqobil', 'Hikoya muallifi'],
      ['Sevinch', 'Qushlarga yem qo‘ygan qiz'],
      ['dazmol', 'Yong‘inga sabab bo‘lishi mumkin edi'],
      ['qahraton', 'Qattiq sovuq'],
      ['ekoko‘prik', 'Hayvonlar uchun o‘tish yo‘li'],
      ['likopcha', 'Non ushoqlari qo‘yilgan idish'],
    ],
    quiz: [
      { q: '«Sevinchning qushlari» hikoyasi muallifi?', options: ['Qo‘chqor Norqobil', 'Abdulla Qahhor', 'O‘tkir Hoshimov', 'Erkin Vohidov'], answer: 0 },
      { q: 'Sevinch nima uchun otasinikiga keldi?', options: ['uyi sovib ketgani uchun', 'bolasi kasal bo‘lgani uchun', 'mehmonga', 'ta’mir uchun'], answer: 0 },
      { q: 'Qushlar otani nimadan ogohlantirdi?', options: ['yong‘in xavfidan', 'o‘g‘ridan', 'suv toshqinidan', 'kasallikdan'], answer: 0 },
      { q: 'Dazmolni kim o‘chirmay ketgan edi?', options: ['ota', 'Sevinch', 'kuyovi', 'nabirasi'], answer: 0 },
      { q: '«Qahraton qoningni qatron etadi» nimani bildiradi?', options: ['qattiq sovuqni', 'issiqni', 'yomg‘irni', 'shamolni'], answer: 0 },
      { q: 'Hikoya kimning tilidan aytiladi?', options: ['otaning', 'Sevinchning', 'qushning', 'kuyovning'], answer: 0 },
    ],
    sort: {
      categories: ['To‘g‘ri', 'Noto‘g‘ri'],
      items: [
        { text: 'Ota qushlar uchun ozuqa sotib oldi', cat: 0 }, { text: 'Sevinch dazmolni unutgan', cat: 1 },
        { text: 'Sevinchning uyi sovib ketgan edi', cat: 0 }, { text: 'Ota Sevinchga rahmat aytdi', cat: 1 },
        { text: 'Qushlar derazaga o‘zini urdi', cat: 0 }, { text: 'Bola shamollagani uchun keldi', cat: 1 },
        { text: 'Likopcha har tong bo‘sh turardi', cat: 0 }, { text: 'Voqea yozda bo‘lgan', cat: 1 },
      ],
    },
    qa: [
      { q: 'Qushlar deraza oldiga yem qo‘yilganini qanday bilgan deb o‘ylaysiz?', a: 'Erkin javob: qushlar ozuqani uzoqdan ko‘radi, bir marta topgach, har kuni keladi.' },
      { q: 'Qizining qushlarni boqishi otaga qanday ta’sir qildi?', a: 'Ota ham mehribon bo‘ldi, o‘zi qushlarni boqa boshladi.' },
      { q: 'Hikoyaning asosiy g‘oyasi nima?', a: 'Yaxshilik qilsang, yaxshilik qaytadi; tabiatga mehr ko‘rsatish kerak.' },
      { q: '«Eti yupqaning etigi ham yirtiq bo‘ladi» maqolini izohlang.', a: 'Qiyinchilik ko‘pincha ojiz, imkoni kam odamga ko‘proq tushadi.' },
      { q: 'Ekoko‘ngillilar qanday ishlarni bajaradi?', a: 'Daraxt ekadi, chiqindi yig‘adi, hayvonlarga g‘amxo‘rlik qiladi.' },
    ],
  },

  /* ===================== 47 ===================== */
  {
    id: 'tasviriy-ifoda-ibora',
    source: 'VI bob «Inson va tabiat» • 5-dars • 126–128-betlar',
    title: 'Tasviriy ifoda va iboralar',
    short: 'Parafraza, ibora va so‘z birikmasi farqi, sinonim va antonim iboralar',
    lesson: [
      {
        title: 'Hayvonlarning tasviriy nomlari (6.26)',
        text: 'Qaysi ifoda qaysi jonivorga tegishli?',
        table: {
          head: ['Ifoda', 'Jonivor'],
          rows: [
            ['o‘rmon shohi', 'sher'],
            ['bahor elchisi', 'qaldirg‘och'],
            ['o‘rmon sanitari', 'bo‘ri'],
            ['sahro kemasi', 'tuya'],
            ['baxt qushi', 'humo'],
            ['xarobalar sultoni', 'boyqush'],
            ['samo lochini', 'burgut'],
            ['dengiz hokimi', 'kit'],
          ],
        },
      },
      {
        title: 'Tasviriy ifoda (parafraza)',
        text: 'Narsaning nomini aytmasdan, uni tasvirlab anglatish mumkin: o‘rgimchak to‘ri — internet, o‘rmon malikasi — archa.',
        rule: 'Tasviriy ifoda (parafraza) shaxs yoki narsa-buyumning nomini aniq atamay, uni tasvirlab anglatadigan til birliklaridir. Ular turg‘un birikma hisoblanmaydi. Tasviriy ifoda bilan u anglatadigan so‘z orasida ma’noviy o‘xshashlik bo‘ladi.',
      },
      {
        title: 'Ibora',
        text: 'Ibora bir necha so‘zdan tuzilsa ham, ma’nosi bitta so‘zga teng bo‘ladi.',
        rule: 'Iboralar ma’nosi bir so‘zga teng keladigan turg‘un birikmalardir: qovog‘idan qor yog‘moq — xafa bo‘lmoq, og‘zi qulog‘ida — xursand bo‘lmoq.',
        table: {
          head: ['So‘z birikmasi', 'Ibora'],
          rows: [
            ['Anvar ko‘zi ochilgan mushuk bolachalarini parvarishladi.', 'Suhbatdan so‘ng Muxtorning ko‘zi ochildi (anglab yetdi).'],
            ['Kulchalarni savatga solib, boshiga ko‘tardi.', 'Laylo onasini boshiga ko‘taradi (ardoqlaydi).'],
            ['Tarvuzi qo‘ltig‘idan tushib ketdi (yerga tushdi).', 'Alisherning tarvuzi qo‘ltig‘idan tushdi (hafsalasi pir bo‘ldi).'],
          ],
        },
        note: 'Ibora va so‘z birikmasi shaklan o‘xshash bo‘lishi mumkin, ularni gap mazmunidan farqlaymiz (6.30).',
      },
      {
        title: 'Sinonim iboralar (6.27)',
        text: 'Ma’nosi bir xil iboralar:',
        table: {
          head: ['Ibora', 'Sinonimi', 'Ma’nosi'],
          rows: [
            ['o‘ziga bino qo‘ygan', 'dimog‘i baland', 'kibrli'],
            ['do‘ppisini osmonga otmoq', 'og‘zi qulog‘ida bo‘lmoq', 'xursand bo‘lmoq'],
            ['pixini yorgan', 'burgani ko‘zini ko‘rgan', 'tajribali'],
            ['yuragi tovoniga tushmoq', 'kapalagi uchmoq', 'qo‘rqmoq'],
            ['qo‘y og‘zidan cho‘p olmagan', 'yumshoq supurgi', 'yuvosh'],
            ['yomon ko‘rmoq', 'jini suymaslik', 'yoqtirmaslik'],
            ['ta’bi xira', 'ko‘ngli g‘ash', 'xafa'],
          ],
        },
      },
      {
        title: 'Antonim iboralar (6.28)',
        text: 'Zid ma’noli iboralar:',
        table: {
          head: ['Ibora', 'Antonimi'],
          rows: [
            ['yerga urmoq', 'ko‘kka ko‘tarmoq'],
            ['kalavaning uchini topmoq', 'kalavaning uchini yo‘qotmoq'],
            ['yomon ko‘rmoq', 'yaxshi ko‘rmoq'],
            ['og‘zida qatiq ivitmoq', 'labi labiga tegmaslik'],
            ['qo‘li kalta', 'qo‘li uzun'],
            ['so‘xtasi sovuq', 'istarasi issiq'],
          ],
        },
      },
      {
        title: 'Esse va baholash (6.31–6.32)',
        text: 'Mavzu: «Kasallanganda xalq tabobati bilan davolangan yaxshimi yoki shifokor tavsiyasiga amal qilgan afzalmi?» Muhokama esse yozing.',
        list: [
          'Esse 10 ball bilan baholanadi: uslub, izchillik, qismlar, ikki qarash, dalil, mantiqiy bog‘lanish, shaxsiy yondashuv, takrorsizlik, imlo va tinish belgilari (har biri 1 ball).',
        ],
      },
    ],
    pairs: [
      ['sahro kemasi', 'tuya'],
      ['o‘rmon shohi', 'sher'],
      ['bahor elchisi', 'qaldirg‘och'],
      ['baxt qushi', 'humo'],
      ['o‘rgimchak to‘ri', 'internet'],
      ['o‘rmon malikasi', 'archa'],
    ],
    quiz: [
      { q: '«Sahro kemasi» qaysi jonivor?', options: ['tuya', 'ot', 'fil', 'sher'], answer: 0 },
      { q: '«Xarobalar sultoni» kim?', options: ['boyqush', 'burgut', 'musicha', 'qaldirg‘och'], answer: 0 },
      { q: 'Ibora nima?', options: ['ma’nosi bir so‘zga teng turg‘un birikma', 'erkin so‘z birikmasi', 'qo‘shma gap', 'parafraza'], answer: 0 },
      { q: '«Kapalagi uchmoq» iborasining ma’nosi?', options: ['qo‘rqmoq', 'xursand bo‘lmoq', 'uchmoq', 'charchamoq'], answer: 0 },
      { q: '«Qo‘li kalta» iborasining antonimi?', options: ['qo‘li uzun', 'qo‘li ochiq', 'qo‘li gul', 'qo‘li bo‘sh'], answer: 0 },
      { q: '«Laylo onasini boshiga ko‘taradi» gapida «boshiga ko‘tarmoq» —', options: ['ibora (ardoqlamoq)', 'so‘z birikmasi', 'parafraza', 'ko‘chirma gap'], answer: 0 },
    ],
    sort: {
      categories: ['Tasviriy ifoda', 'Ibora'],
      items: [
        { text: 'sahro kemasi', cat: 0 }, { text: 'kapalagi uchmoq', cat: 1 },
        { text: 'o‘rmon shohi', cat: 0 }, { text: 'og‘zi qulog‘ida', cat: 1 },
        { text: 'bahor elchisi', cat: 0 }, { text: 'dimog‘i baland', cat: 1 },
        { text: 'o‘rgimchak to‘ri', cat: 0 }, { text: 'qovog‘idan qor yog‘moq', cat: 1 },
      ],
    },
    qa: [
      { q: 'Tasviriy ifoda nima? Misol keltiring.', a: 'Narsa nomini aytmay tasvirlab anglatish: o‘rmon malikasi — archa.' },
      { q: 'Ibora va tasviriy ifodaning farqi?', a: 'Ibora turg‘un birikma, ma’nosi bir so‘zga teng; tasviriy ifoda turg‘un emas.' },
      { q: '«Do‘ppisini osmonga otmoq» iborasining sinonimi?', a: '«Og‘zi qulog‘ida bo‘lmoq» — xursand bo‘lmoq.' },
      { q: 'Nega bo‘rini «o‘rmon sanitari» deyishadi?', a: 'U kasal, zaif hayvonlarni ovlab, o‘rmonni tozalaydi.' },
      { q: '«Yerga urmoq» iborasining antonimi?', a: '«Ko‘kka ko‘tarmoq».' },
    ],
  },

  /* ===================== 48 ===================== */
  {
    id: 'fel-zamon-shaxs',
    source: 'VI bob «Inson va tabiat» • 6-dars • 129–130-betlar',
    title: 'Fe’lning zamon va shaxs-son shakllari',
    short: 'Muqimiy g‘azali, kesimning zamon va shaxs-sonini aniqlash',
    lesson: [
      {
        title: 'Muqimiy g‘azali (6.33)',
        text: 'Muhammad Aminxo‘ja Muqimiy bahor tabiatini kuylaydi:',
        examples: ['Navbahor ochildi gullar, sabza bo‘ldi bog‘lar,', 'Suhbat aylaylik, kelinglar, jo‘ralar, o‘rtoqlar.'],
        table: {
          head: ['Fe’l', 'Tarkibi'],
          rows: [
            ['ochildi', 'och + il (majhul nisbat) + di (o‘tgan zamon)'],
            ['bo‘ldi', 'bo‘l + di (o‘tgan zamon, III shaxs)'],
            ['aylaylik', 'ayla + y + lik (buyruq-istak, I shaxs ko‘plik)'],
            ['kelinglar', 'kel + ing + lar (buyruq, II shaxs ko‘plik)'],
            ['qilaylik', 'qil + ay + lik (buyruq-istak, I shaxs ko‘plik)'],
          ],
        },
      },
      {
        title: 'Fe’lning zamon shakllari',
        text: 'Ish-harakat qachon bo‘lganini fe’l zamon qo‘shimchalari bildiradi:',
        table: {
          head: ['Zamon', 'Qo‘shimchalar', 'Misol'],
          rows: [
            ['O‘tgan zamon', '-di, -gan, -(i)b(di)', 'keldi, kelgan, kelibdi'],
            ['Hozirgi zamon', '-yap, -moqda, -yotir', 'o‘qiyapti, o‘qimoqda'],
            ['Hozirgi-kelasi zamon', '-a, -y', 'o‘qiydi, boraman'],
            ['Kelasi zamon (gumon)', '-(a)r, -moqchi', 'kelar, bormoqchi'],
          ],
        },
      },
      {
        title: 'Shaxs-son qo‘shimchalari',
        text: 'Kesim kim bajarayotganini ham bildiradi:',
        table: {
          head: ['Shaxs', 'Birlik', 'Ko‘plik'],
          rows: [
            ['I shaxs', 'o‘qiyman (-man)', 'o‘qiymiz (-miz)'],
            ['II shaxs', 'o‘qiysan (-san)', 'o‘qiysiz (-siz), o‘qiysizlar'],
            ['III shaxs', 'o‘qiydi (-di)', 'o‘qiydilar, o‘qishadi'],
          ],
        },
        rule: 'Kesim tarkibida zamon va shaxs-son qo‘shimchalari bo‘lib, ular gapdagi harakatning vaqti va bajaruvchisini bildiradi.',
      },
      {
        title: 'Hikoyadagi kesimlar (6.34)',
        text: '«Sevinchning qushlari» hikoyasidan:',
        table: {
          head: ['Kesim', 'Zamon', 'Shaxs-son'],
          rows: [
            ['yaltirab turibdi', 'hozirgi zamon', 'III shaxs birlik'],
            ['o‘ylayapti', 'hozirgi zamon', 'III shaxs birlik'],
            ['qo‘yaveraylik', 'buyruq-istak mayli', 'I shaxs ko‘plik'],
            ['yuboradi', 'hozirgi-kelasi zamon', 'III shaxs birlik'],
            ['qarayman, sevinaman', 'hozirgi-kelasi zamon', 'I shaxs birlik'],
            ['kelib ketishibdi', 'o‘tgan zamon', 'III shaxs ko‘plik'],
            ['boshlagan edi', 'o‘tgan zamon', 'III shaxs birlik'],
          ],
        },
      },
      {
        title: 'Matn tahlili (6.36)',
        text: '«Tabiat zargarga o‘xshaydi...» matnidagi kesimlar:',
        list: [
          'o‘xshaydi, olamdir — hozirgi zamon, III shaxs: umumiy haqiqatni bildiradi.',
          'bo‘laylik, kuchaytiraylik — buyruq-istak, I shaxs ko‘plik: hammani birgalikda harakatga chorlaydi.',
          'qayg‘urgan bo‘lamiz — I shaxs ko‘plik: o‘quvchini ham fikrga sherik qiladi.',
        ],
        note: '6.35: eshitilmoq, so‘zlamoq, gullamoq, o‘ylamoq fe’llarini zamon va shaxs-son qo‘shimchalari bilan yozing. 6.37: global muammolar asosida esse uchun 3 ta vaziyat yozing.',
      },
    ],
    pairs: [
      ['keldi', 'O‘tgan zamon'],
      ['o‘qiyapti', 'Hozirgi zamon'],
      ['boraman', 'Hozirgi-kelasi zamon'],
      ['-man', 'I shaxs birlik'],
      ['-siz', 'II shaxs ko‘plik'],
      ['Muqimiy', 'Navbahor ochildi gullar'],
    ],
    quiz: [
      { q: '«Ketishibdi» fe’li qaysi zamonda?', options: ['o‘tgan zamon', 'hozirgi zamon', 'kelasi zamon', 'buyruq'], answer: 0 },
      { q: '«Qarayman» kesimining shaxs-soni?', options: ['I shaxs birlik', 'II shaxs birlik', 'III shaxs birlik', 'I shaxs ko‘plik'], answer: 0 },
      { q: '«Navbahor ochildi gullar» misrasi muallifi?', options: ['Muqimiy', 'Furqat', 'Navoiy', 'Ogahiy'], answer: 0 },
      { q: 'Hozirgi zamon qo‘shimchasi?', options: ['-yap', '-di', '-gan', '-ar'], answer: 0 },
      { q: '«Bo‘laylik» qanday shakl?', options: ['buyruq-istak, I shaxs ko‘plik', 'o‘tgan zamon', 'II shaxs birlik', 'hozirgi zamon'], answer: 0 },
      { q: '«O‘qiysan» qaysi shaxs?', options: ['II shaxs birlik', 'I shaxs birlik', 'III shaxs', 'I shaxs ko‘plik'], answer: 0 },
    ],
    sort: {
      categories: ['O‘tgan zamon', 'Hozirgi zamon', 'Hozirgi-kelasi'],
      items: [
        { text: 'keldi', cat: 0 }, { text: 'o‘qiyapti', cat: 1 }, { text: 'boraman', cat: 2 },
        { text: 'boshlagan edi', cat: 0 }, { text: 'o‘ylayapti', cat: 1 }, { text: 'yuboradi', cat: 2 },
        { text: 'kelibdi', cat: 0 }, { text: 'yozmoqda', cat: 1 }, { text: 'sevinaman', cat: 2 },
      ],
    },
    qa: [
      { q: 'Fe’lning qanday zamonlari bor?', a: 'O‘tgan, hozirgi, hozirgi-kelasi va kelasi zamon.' },
      { q: '«Yuboradi» kesimining zamon va shaxs-sonini ayting.', a: 'Hozirgi-kelasi zamon, III shaxs birlik.' },
      { q: '«Ochildi» fe’lini tarkibiy qismlarga ajrating.', a: 'Och + il + di.' },
      { q: 'Matnda I shaxs ko‘plik shakli nima uchun ishlatiladi?', a: 'O‘quvchini ham birgalikdagi harakatga chorlash uchun.' },
      { q: '«So‘zlamoq» fe’lini o‘tgan zamon, I shaxs birlikda ayting.', a: 'So‘zladim.' },
    ],
  },

  /* ===================== 49 ===================== */
  {
    id: 'ona-tulki',
    source: 'VI bob «Inson va tabiat» • 7-dars • 130–132-betlar',
    title: '«Ona tulki»',
    short: 'Audiomatn tahlili, ona mehri, iboralar ma’nosi',
    lesson: [
      {
        title: 'Darsga kirish',
        text: 'Uyingizda qanday hayvon boqasiz? Shundan so‘ng «Ona tulki» hikoyasi audiomatn sifatida tinglanadi (6.38).',
        note: 'Audiomatn darslikdagi QR kod orqali tinglanadi.',
      },
      {
        title: 'Yangi so‘zlar (6.39)',
        text: 'Hikoyadagi so‘zlar:',
        table: {
          head: ['So‘z', 'Izohi'],
          rows: [
            ['kungay', 'quyoshga qaragan'],
            ['katak', 'parranda yoki mayda jonivorlar uchun maxsus uycha'],
            ['xijolatpazlik', 'uyatdan o‘zini noqulay sezish, uyalish hissi'],
            ['o‘lja', 'ovda tutib yoki otib olinadigan narsa'],
            ['ovchi', 'ov bilan shug‘ullanuvchi kishi'],
          ],
        },
      },
      {
        title: 'Hikoya haqida savollar',
        text: 'Hikoyada Sardor tulki bolasini uyiga olib kelib, katakka qamab qo‘yadi. Keyin uyida yovvoyi quyon, tovuq va o‘rdak o‘ljalari topiladi.',
        list: [
          'Sardorning tog‘asi voqeaning mohiyatini qanday angladi?',
          'Nega Sardorlarning uyida yovvoyi quyon, tovuq va o‘rdak o‘ljasi topildi? (ona tulki bolasini boqish uchun o‘lja tashlab ketgan)',
          'Siz Sardorning o‘rnida qanday yo‘l tutardingiz?',
        ],
        rule: 'Hikoyaning bosh g‘oyasi — ona mehri: hayvon ham bolasini tashlab qo‘ymaydi, u uchun har qanday xavfga boradi.',
      },
      {
        title: 'Bosh va yordamchi fikr (6.41–6.42)',
        text: 'Hikoya tahlili:',
        list: [
          'Bosh g‘oya: ona mehri hamma narsadan kuchli.',
          'Yordamchi fikrlar: yovvoyi hayvonni tabiatdan ajratmaslik kerak; bola o‘z xatosini tushunadi; kattalar maslahatining qadri.',
          'Audiomatnni qismlarga ajratib, har bir qismga sarlavha (reja) qo‘ying.',
        ],
        note: '6.43: muallif ona mehrini yoritish uchun nega hayvonlar obrazidan foydalandi? Hayvonlar haqida qanday asarlar o‘qigansiz?',
      },
      {
        title: 'Iboralar ma’nosi (6.44)',
        text: 'Iboraning ma’nosini bir so‘z bilan ifodalaymiz:',
        table: {
          head: ['Ibora', 'Ma’nosi'],
          rows: [
            ['bir yoqadan bosh chiqarish', 'hamjihat bo‘lmoq'],
            ['yerga ursa, ko‘kka sapchish', 'jizzaki, injiq'],
            ['do‘ppisi yarimta', 'esipast, aqli noqis'],
            ['yog‘ tushsa, yalagudek', 'juda toza, ozoda'],
          ],
        },
      },
      {
        title: 'Gapga mos ibora (6.45)',
        text: 'Iboralar va ma’nolari:',
        table: {
          head: ['Ibora', 'Ma’nosi'],
          rows: [
            ['qulog‘idan kun ko‘rinmoq', 'juda ozg‘in bo‘lmoq'],
            ['boshi bilan sho‘ng‘ib ketmoq', 'biror ishga butunlay berilmoq'],
            ['sichqonning ini ming tanga bo‘lmoq', 'yashirinishga joy topolmay qolmoq'],
            ['tepa sochi tikka bo‘lmoq', 'qattiq g‘azablanmoq'],
            ['nafasi ichiga tushmoq', 'qo‘rqib jim qolmoq'],
            ['tirnoq orasidan kir qidirmoq', 'arzimas ayb axtarmoq'],
          ],
        },
        examples: ['Asila juda ozg‘in qiz edi, qulog‘idan kun ko‘rinardi.', 'Mustafo shaxmatga boshi bilan sho‘ng‘ib ketgan.'],
      },
    ],
    pairs: [
      ['kungay', 'Quyoshga qaragan'],
      ['katak', 'Parranda uychasi'],
      ['o‘lja', 'Ovda tutilgan narsa'],
      ['xijolat', 'Uyalish hissi'],
      ['ovchi', 'Ov qiluvchi kishi'],
      ['do‘ppisi yarimta', 'Esipast'],
    ],
    quiz: [
      { q: '«Ona tulki» hikoyasining bosh g‘oyasi?', options: ['ona mehri', 'ovchilik', 'do‘stlik', 'mehnat'], answer: 0 },
      { q: 'Uyda topilgan o‘ljalarni kim tashlab ketgan?', options: ['ona tulki', 'Sardor', 'tog‘asi', 'qo‘shni'], answer: 0 },
      { q: '«Kungay» so‘zining ma’nosi?', options: ['quyoshga qaragan', 'soya joy', 'katak', 'o‘lja'], answer: 0 },
      { q: '«Qulog‘idan kun ko‘rinmoq» iborasining ma’nosi?', options: ['juda ozg‘in', 'semiz', 'baxtli', 'kasal'], answer: 0 },
      { q: '«Bir yoqadan bosh chiqarish» —', options: ['hamjihat bo‘lmoq', 'urushmoq', 'qochmoq', 'uxlamoq'], answer: 0 },
      { q: '«Tepa sochi tikka bo‘lmoq» —', options: ['qattiq g‘azablanmoq', 'xursand bo‘lmoq', 'sochini tarash', 'qo‘rqmoq'], answer: 0 },
    ],
    sort: {
      categories: ['Ibora', 'Oddiy so‘z birikmasi'],
      items: [
        { text: 'do‘ppisi yarimta', cat: 0 }, { text: 'yangi do‘ppi', cat: 1 },
        { text: 'qulog‘idan kun ko‘rinmoq', cat: 0 }, { text: 'quyoshli kun', cat: 1 },
        { text: 'tepa sochi tikka bo‘lmoq', cat: 0 }, { text: 'qora soch', cat: 1 },
        { text: 'bir yoqadan bosh chiqarish', cat: 0 }, { text: 'ko‘ylak yoqasi', cat: 1 },
      ],
    },
    qa: [
      { q: 'Nega Sardorlarning uyida o‘ljalar topildi?', a: 'Ona tulki katakdagi bolasini boqish uchun o‘lja tashlab ketgan.' },
      { q: 'Muallif ona mehrini nega hayvon obrazi orqali ko‘rsatdi?', a: 'Hatto yovvoyi hayvon ham bolasini sevishini ko‘rsatib, ona mehrining kuchini ta’kidlash uchun.' },
      { q: 'Sardorning o‘rnida qanday yo‘l tutardingiz?', a: 'Erkin javob: tulki bolasini onasiga qaytarardim.' },
      { q: '«Yog‘ tushsa, yalagudek» iborasini izohlang.', a: 'Juda toza, ozoda.' },
      { q: '«Boshi bilan sho‘ng‘ib ketmoq» qachon ishlatiladi?', a: 'Biror ishga butunlay berilib ketganda.' },
    ],
  },

  /* ===================== 50 ===================== */
  {
    id: 'tasviriy-ifodalar',
    source: 'VI bob «Inson va tabiat» • 8-dars • 132–133-betlar',
    title: 'Tasviriy ifodalar. «Yaproq»ning ildizi',
    short: 'Tasviriy ifodalarni guruhlash, so‘z tarixi',
    lesson: [
      {
        title: 'Tasviriy ifodalarni guruhlash (6.46)',
        text: 'Tasviriy ifodalarni mavzular bo‘yicha ajratamiz:',
        table: {
          head: ['Guruh', 'Tasviriy ifoda — so‘z'],
          rows: [
            ['O‘simliklar', 'o‘rmon malikasi — archa; gullar malikasi — atirgul'],
            ['Qushlar', 'bahor elchisi — qaldirg‘och; baxt qushi — humo'],
            ['Hayvonlar', 'sahro kemasi — tuya; o‘rmon shohi — sher'],
            ['Foydali qazilmalar', 'qora oltin — neft; oq oltin — paxta (o‘simlik)'],
          ],
        },
      },
      {
        title: 'Tasviriy ifoda anglatgan so‘z (6.47)',
        text: 'Har bir ifoda qaysi so‘zni anglatadi?',
        table: {
          head: ['Tasviriy ifoda', 'So‘z'],
          rows: [
            ['aql gimnastikasi', 'shaxmat'],
            ['qora oltin', 'neft'],
            ['fasllar kelinchagi', 'bahor'],
            ['uyg‘onish fasli', 'bahor'],
            ['oynayi jahon', 'televizor'],
            ['zangori ekran', 'televizor'],
          ],
        },
        rule: 'Tasviriy ifoda nutqni obrazli, ta’sirli qiladi va bir so‘zni takrorlashdan qutqaradi.',
      },
      {
        title: 'Til sandig‘i: «Yaproq»ning ildizi',
        text: 'Eshqobil Shukur yaproq so‘zining kelib chiqishini tushuntiradi:',
        list: [
          'Yaproq so‘zining asosida «yop» (yap) so‘zi bor: yaproqlar daraxt shoxlarini yopib turadi.',
          'Yaproqsiz daraxt — yalang‘och daraxt.',
          'Mahmud Koshg‘ariyda bu so‘z «yapurg‘aq» shaklida, «yopib turuvchi» ma’nosida keladi.',
          'Alisher Navoiyda «yafroq» shaklida: «p» tovushi «f»ga aylangan.',
        ],
        examples: ['Degaykim, bir quruq shox uzra qolmish bir sorig‘ yafroq. (Navoiy, «Munshaot»)'],
      },
      {
        title: 'So‘zning tarixini bilish nega kerak?',
        text: 'So‘z tarixi — etimologiya. U so‘zning ma’nosini chuqurroq tushunishga yordam beradi.',
        list: [
          'So‘zning ildizini bilsak, uni to‘g‘ri yozamiz va to‘g‘ri qo‘llaymiz.',
          'Bir ildizdan yasalgan so‘zlar oilasini topamiz: yop — yopiq — yopinchiq — yaproq.',
          'Tilimizning boy tarixini his qilamiz.',
        ],
      },
      {
        title: 'Bobni takrorlash',
        text: '«Inson va tabiat» bobida o‘rganganlarimiz:',
        list: [
          'Ko‘chirma gap va uning qoliplari',
          'Muhokama esse yozish',
          'Tasviriy ifoda (parafraza) va iboralar',
          'Sinonim, antonim va omonim iboralar',
          'Fe’lning zamon va shaxs-son shakllari',
        ],
      },
    ],
    pairs: [
      ['aql gimnastikasi', 'shaxmat'],
      ['qora oltin', 'neft'],
      ['fasllar kelinchagi', 'bahor'],
      ['zangori ekran', 'televizor'],
      ['yapurg‘aq', 'Koshg‘ariyda «yaproq»'],
      ['yafroq', 'Navoiyda «yaproq»'],
    ],
    quiz: [
      { q: '«Qora oltin» nima?', options: ['neft', 'ko‘mir', 'oltin', 'paxta'], answer: 0 },
      { q: '«Aql gimnastikasi» deb nimaga aytiladi?', options: ['shaxmat', 'futbol', 'kitob', 'matematika'], answer: 0 },
      { q: '«Zangori ekran» nima?', options: ['televizor', 'osmon', 'dengiz', 'telefon'], answer: 0 },
      { q: '«Yaproq» so‘zining asosida qaysi so‘z bor?', options: ['yop', 'yap-yangi', 'yer', 'yay'], answer: 0 },
      { q: 'Navoiy asarlarida «yaproq» qanday shaklda?', options: ['yafroq', 'yapurg‘aq', 'yaprak', 'yaproq'], answer: 0 },
      { q: '«Fasllar kelinchagi» qaysi fasl?', options: ['bahor', 'yoz', 'kuz', 'qish'], answer: 0 },
    ],
    sort: {
      categories: ['Hayvon / qush', 'Narsa / hodisa'],
      items: [
        { text: 'sahro kemasi', cat: 0 }, { text: 'qora oltin', cat: 1 },
        { text: 'bahor elchisi', cat: 0 }, { text: 'zangori ekran', cat: 1 },
        { text: 'o‘rmon shohi', cat: 0 }, { text: 'aql gimnastikasi', cat: 1 },
        { text: 'baxt qushi', cat: 0 }, { text: 'fasllar kelinchagi', cat: 1 },
      ],
    },
    qa: [
      { q: '«Oynayi jahon» va «zangori ekran» qaysi so‘zni anglatadi?', a: 'Televizorni.' },
      { q: '«Yaproq» so‘zi qayerdan kelib chiqqan?', a: '«Yop» so‘zidan: yaproqlar shoxni yopib turadi.' },
      { q: 'Mahmud Koshg‘ariyda «yaproq» qanday shaklda?', a: '«Yapurg‘aq» — «yopib turuvchi».' },
      { q: 'Foydali qazilmalarga oid tasviriy ifoda ayting.', a: 'Qora oltin — neft.' },
      { q: 'Tasviriy ifodalar nutqqa qanday ta’sir qiladi?', a: 'Nutqni obrazli, ta’sirli qiladi, takrorning oldini oladi.' },
    ],
  },
];

/* --- 8-sinf Ona tili: 51–60-darslar (darslik 2025, 135–163-betlar) --- */
const ONA_TILI_8_PART6 = [
  /* ===================== 51 ===================== */
  {
    id: 'suratlar-gapirsa',
    source: 'VII bob «San’at» • 1-dars • 135–139-betlar',
    title: '«Suratlarning o‘zi gapirsa...»',
    short: 'Karikatura janri, rassom Husan Sodiqov, sarlavha tanlash',
    lesson: [
      {
        title: 'Darsga kirish',
        text: 'Yangi bob — «San’at». Rasmlarda san’atning qanday turlari aks etgan? Milliy va zamonaviy san’atning o‘ziga xosligi nimada?',
        note: 'Matn muallifi — Komil Jontoyev. Matn qisqartirib olingan.',
      },
      {
        title: 'Karikatura nima?',
        text: 'Karikatura atamasi italyancha «caricare» — «bo‘rttirish» so‘zidan olingan.',
        rule: 'Karikatura — tasviriy san’at janri, grafika turlaridan biri. Unda qahramonlar satirik yoki hazil shaklida chiziladi. Karikatura — tanqidning eng qisqa va keskin usuli.',
        list: [
          'Hayot bilan chambarchas bog‘liq, aniq ijtimoiy ma’no tashiydi.',
          'Illatlarni ko‘rsatadi va ularning ustidan kuladi.',
          'Ko‘pincha aniq shaxs emas, davrga tegishli mavzu yoki vaziyat tasvirlanadi.',
          'Ehtimol, ilk karikaturachi Leonardo da Vinchi bo‘lgan.',
        ],
      },
      {
        title: 'Karikatura janrining xususiyatlari',
        text: 'Rassom ta’sirli texnikalardan foydalanadi. Tasvirlar quyidagicha bo‘lishi mumkin:',
        examples: ['grotesk', 'bo‘rttirilgan', 'xayoliy', 'g‘alati', 'xunuk', 'kulgili'],
        note: 'Maqsad — voqelikni yumor asosida tasvirlash va jamiyatni illatlardan tozalash.',
      },
      {
        title: 'Husan Sodiqov ijodi',
        text: 'O‘zbekistonning yetakchi karikaturachilaridan biri, «Mushtum» jurnali bosh rassomi.',
        list: [
          'Serqirra ijodkor: akvarel va moybo‘yoqda etyudlar, manzaralar, portretlar ishlaydi.',
          'Janubiy Koreya, Yaponiya, Eron, Xitoy, Turkiya, Italiya, Fransiya va boshqa davlatlardagi xalqaro tanlovlar g‘olibi.',
          'O‘nlab ertaklarga illyustratsiyalar, yuzdan ziyod kitobga grafik bezaklar ishlagan.',
          'Portretlari: «Amir Temur», «Alisher Navoiy», «Ibn Sino».',
          'Mukammal asar haqida: «Suratlarning o‘zi gapirsa...»',
        ],
      },
      {
        title: 'Krossvorddagi so‘zlar (7.2)',
        text: 'Matndan olingan atamalar:',
        table: {
          head: ['Izoh', 'So‘z'],
          rows: [
            ['asar qismlarining tuzilishi, joylashishi, yaxlitligi', 'kompozitsiya'],
            ['kishining rassom chizgan yoki fotograf olgan surati', 'portret'],
            ['voqeani bo‘rttirib, kulgili tarzda buzib ko‘rsatish usuli', 'grotesk'],
            ['satiraga oid, hajviy, kinoyali', 'satirik'],
            ['kitob mazmunini tushunishga xizmat qiluvchi rasm', 'illyustratsiya'],
            ['kamchiliklarni kulgili, hazilomuz tasvirlash', 'yumor'],
            ['suvda eritib ishlatiladigan bo‘yoq', 'akvarel'],
          ],
        },
      },
      {
        title: 'Sarlavha tanlash (7.4–7.6)',
        text: 'Yaxshi sarlavhaning sifatlari:',
        list: [
          'Ixcham va jarangdor',
          'Matn mazmunidan kelib chiqqan',
          'O‘ziga xos',
          'Kishi diqqatini tortadi',
          'Maqsadga (xabar, muhokama, tashviqot, reklama, ko‘rsatma, murojaat) mos',
        ],
        note: 'Masalan, «Suv kimniki? Hammaniki!» — diqqatni tortadigan, savol-javob shaklidagi sarlavha.',
      },
    ],
    pairs: [
      ['karikatura', 'Bo‘rttirilgan hajviy rasm'],
      ['akvarel', 'Suvbo‘yoq'],
      ['portret', 'Kishi surati'],
      ['illyustratsiya', 'Kitobdagi rasm'],
      ['yumor', 'Hazilomuz tasvir'],
      ['Mushtum', 'Husan Sodiqov ishlagan jurnal'],
    ],
    quiz: [
      { q: '«Karikatura» so‘zi qaysi tildan olingan?', options: ['italyan', 'fransuz', 'ingliz', 'yunon'], answer: 0 },
      { q: '«Caricare» so‘zining ma’nosi?', options: ['bo‘rttirish', 'chizish', 'kulish', 'tasvirlash'], answer: 0 },
      { q: 'Husan Sodiqov qaysi jurnalning bosh rassomi?', options: ['«Mushtum»', '«Yoshlik»', '«Gulxan»', '«Tafakkur»'], answer: 0 },
      { q: 'Karikatura qaysi san’at turiga kiradi?', options: ['grafika', 'haykaltaroshlik', 'me’morchilik', 'musiqa'], answer: 0 },
      { q: 'Suvda eritib ishlatiladigan bo‘yoq?', options: ['akvarel', 'moybo‘yoq', 'guash', 'tush'], answer: 0 },
      { q: 'Ehtimol, ilk karikaturachi kim bo‘lgan?', options: ['Leonardo da Vinchi', 'Pikasso', 'Kamoliddin Behzod', 'Van Gog'], answer: 0 },
    ],
    sort: {
      categories: ['Karikaturaga xos', 'Karikaturaga xos emas'],
      items: [
        { text: 'bo‘rttirilgan tasvir', cat: 0 }, { text: 'fotografik aniqlik', cat: 1 },
        { text: 'hajviy ruh', cat: 0 }, { text: 'faqat tabiat manzarasi', cat: 1 },
        { text: 'illatlarni fosh qilish', cat: 0 }, { text: 'maqtov', cat: 1 },
        { text: 'grotesk', cat: 0 }, { text: 'jiddiy hujjat', cat: 1 },
      ],
    },
    qa: [
      { q: 'Karikatura qanday ijtimoiy ma’no tashiydi?', a: 'Jamiyatdagi illat va kamchiliklarni fosh qiladi, ular ustidan kuladi.' },
      { q: 'Nega karikaturada davrga oid mavzular tanqid qilinadi?', a: 'U voqelikka tez javob beradi, hayot bilan bog‘liq muammolarni ko‘rsatadi.' },
      { q: '«Suratlarning o‘zi gapirsa» jumlasini izohlang.', a: 'Mukammal asarga izoh kerak emas, u o‘z-o‘zidan tushunarli bo‘ladi.' },
      { q: 'Yaxshi sarlavhaning sifatlarini ayting.', a: 'Ixcham, jarangdor, mazmunga mos, o‘ziga xos, diqqatni tortadi.' },
      { q: 'Husan Sodiqovning qaysi portretlarini bilasiz?', a: '«Amir Temur», «Alisher Navoiy», «Ibn Sino».' },
    ],
  },

  /* ===================== 52 ===================== */
  {
    id: 'sifat-ravish-turlari',
    source: 'VII bob «San’at» • 2-dars • 140–142-betlar',
    title: 'Sifat va ravishning ma’no turlari',
    short: 'Sifat va ravishni farqlash, ma’noviy guruhlar, sinkveyn',
    lesson: [
      {
        title: 'Narsa belgisi yoki harakat belgisi? (7.7)',
        text: 'Birikmalardagi so‘zlarni farqlaymiz:',
        table: {
          head: ['Narsa belgisi (sifat)', 'Harakat belgisi (ravish)'],
          rows: [
            ['barhayot an’analar', 'saharlab turmoq'],
            ['tarixiy qadamjolar', 'xiyol egilmoq'],
            ['a’lo kayfiyat', 'sekin yurmoq, tez o‘qimoq'],
          ],
        },
      },
      {
        title: 'Sifatning ma’no turlari',
        text: 'Sifatlar qanday? qaysi? so‘roqlariga javob bo‘ladi va asosan otga bog‘lanadi.',
        table: {
          head: ['Turi', 'Misollar'],
          rows: [
            ['rang-tus', 'qizil, kulrang, moviy'],
            ['xususiyat', 'yangi, xursand, tiyrak'],
            ['hajm-o‘lchov', 'cho‘ziq, tor, semiz'],
            ['makon va zamon', 'qadimiy, kechki, qishlik'],
            ['maza-ta’m', 'shirin, nordon, lazzatli'],
            ['hid', 'xushbo‘y, muattar, qo‘lansa'],
          ],
        },
      },
      {
        title: 'Ravishning ma’no turlari',
        text: 'Ravishlar qachon? qayerda? qanday? qancha? nima sababdan? so‘roqlariga javob bo‘ladi va asosan fe’lga bog‘lanadi.',
        table: {
          head: ['Turi', 'Misollar'],
          rows: [
            ['maqsad-sabab', 'ataylab, jo‘rttaga, qasddan'],
            ['holat', 'jim, yayov, tasodifan'],
            ['payt', 'hamon, dastlab, kundan kunga'],
            ['o‘rin', 'yaqindan, olisda, bu yoqqa'],
            ['miqdor-daraja', 'picha, oz-moz, birtalay'],
          ],
        },
      },
      {
        title: 'Muhim eslatma',
        text: 'So‘z turkumi bog‘lanishiga qarab ham aniqlanadi.',
        rule: 'Sifatlar asosan otga bog‘lanadi, ba’zan harakat belgisini ham bildiradi: chiroyli yozmoq, sergak o‘tirmoq. Ravishlar asosan fe’lga bog‘lanadi, ba’zan narsa belgisini ham bildiradi: kam vaqt, ko‘p odam.',
      },
      {
        title: 'Ma’noviy guruhlar (7.10)',
        text: 'Ravishlar:',
        table: {
          head: ['Guruh', 'So‘zlar'],
          rows: [
            ['payt', 'endi, hozircha, erta-indin, qishin-yozin, hali-beri'],
            ['o‘rin', 'pastda, olisda, yuqorida, berida'],
            ['holat', 'azza-bazza, chor-nochor, majburan, yakkama-yakka, bafurja, yangicha, ochiq-oydin'],
            ['daraja-miqdor', 'sal-pal, ko‘p, jinday, biroz, o‘rtacha, oz'],
            ['maqsad-sabab', 'qasddan, ilojsizlikdan'],
          ],
        },
        note: 'Sifatlar: rang — qirmizi, sariq, pushti, oq, yashil; maza — bemaza, achchiq, sho‘r; makon-zamon — bulturgi, qishki, qadimgi; hid — xushbo‘y; xususiyat — kamtar, aqlli, sho‘x, g‘amgin.',
      },
      {
        title: 'Sinkveyn (7.12)',
        text: 'Besh qatorli she’rsimon topshiriq. Namuna:',
        list: [
          '1-qator: kalit so‘z (ot) — qadriyat',
          '2-qator: ikkita sifat — milliy, umuminsoniy',
          '3-qator: ikki so‘zli harakat — asrab-avaylash, e’zozlash',
          '4-qator: besh so‘zli gap — Milliy va umuminsoniy qadriyatlarimizni asrab-avaylashimiz lozim.',
          '5-qator: ma’nodosh — urf-odat',
        ],
      },
    ],
    pairs: [
      ['qirmizi', 'Rang-tus sifati'],
      ['xushbo‘y', 'Hid sifati'],
      ['qadimgi', 'Makon-zamon sifati'],
      ['qasddan', 'Maqsad-sabab ravishi'],
      ['olisda', 'O‘rin ravishi'],
      ['biroz', 'Daraja-miqdor ravishi'],
    ],
    quiz: [
      { q: '«Saharlab turmoq» birikmasida «saharlab» qaysi turkum?', options: ['ravish', 'sifat', 'ot', 'fe’l'], answer: 0 },
      { q: '«Muattar» qaysi sifat turi?', options: ['hid', 'rang-tus', 'maza-ta’m', 'xususiyat'], answer: 0 },
      { q: '«Jo‘rttaga» qaysi ravish turi?', options: ['maqsad-sabab', 'payt', 'o‘rin', 'holat'], answer: 0 },
      { q: 'Ravish asosan qaysi turkumga bog‘lanadi?', options: ['fe’lga', 'otga', 'olmoshga', 'songa'], answer: 0 },
      { q: '«Ko‘p odam» birikmasida «ko‘p» —', options: ['narsa belgisini bildirgan ravish', 'sifat', 'son', 'ot'], answer: 0 },
      { q: '«Bulturgi» qaysi sifat turi?', options: ['makon-zamon', 'hajm-o‘lchov', 'hid', 'rang-tus'], answer: 0 },
    ],
    sort: {
      categories: ['Sifat', 'Ravish'],
      items: [
        { text: 'qirmizi', cat: 0 }, { text: 'qasddan', cat: 1 },
        { text: 'xushbo‘y', cat: 0 }, { text: 'olisda', cat: 1 },
        { text: 'achchiq', cat: 0 }, { text: 'erta-indin', cat: 1 },
        { text: 'kamtar', cat: 0 }, { text: 'yakkama-yakka', cat: 1 },
        { text: 'qadimgi', cat: 0 }, { text: 'biroz', cat: 1 },
      ],
    },
    qa: [
      { q: 'Sifat va ravishning asosiy farqi?', a: 'Sifat narsa belgisini bildirib otga bog‘lanadi, ravish harakat belgisini bildirib fe’lga bog‘lanadi.' },
      { q: 'Ravishning ma’no turlarini sanang.', a: 'Maqsad-sabab, holat, payt, o‘rin, miqdor-daraja.' },
      { q: '«Chiroyli yozmoq» birikmasida «chiroyli» qaysi turkum?', a: 'Sifat, lekin harakat belgisini bildirmoqda.' },
      { q: 'Maza-ta’m sifatlariga misol keltiring.', a: 'Shirin, nordon, achchiq, sho‘r.' },
      { q: 'Sinkveynning 2-qatoriga nima yoziladi?', a: 'Kalit so‘zga mos ikkita sifat (fe’l bo‘lsa — ikkita ravish).' },
    ],
  },

  /* ===================== 53 ===================== */
  {
    id: 'sahna-kozgusi',
    source: 'VII bob «San’at» • 3-dars • 142–146-betlar',
    title: '«Hayot va sahna ko‘zgusi»',
    short: 'Teatr san’ati haqidagi maqola tahlili',
    lesson: [
      {
        title: 'Darsga kirish',
        text: 'Nega teatr badiiy san’at turi hisoblanadi? Teatrga borganmisiz?',
        note: 'Maqola muallifi — Gulchehra Durdiyeva. Unda teatr arboblarining fikrlari keltirilgan.',
      },
      {
        title: 'Teatr — tarbiya maskani',
        text: 'Teatr shunchaki tomoshaxona emas, balki tarbiya, madaniyat, ma’naviyat va ma’rifat maskanidir.',
        list: [
          'Rixsi Ibrohimova (O‘zbekiston xalq artisti): «Hech bir san’at turi teatr o‘rnini bosa olmaydi».',
          'Shekspir: «Butun olam — teatr, unda har bir odam — aktyordir».',
          'Mahmudxo‘ja Behbudiy: «Teatr ibratxonadir». U «Padarkush» dramasini sahnalashtirgan.',
          'Mirza Azizov: «Teatr san’ati hech qachon eskirmaydi».',
        ],
      },
      {
        title: 'Sahna bilan yuzma-yuz',
        text: 'Kino va konsertni televizor yoki internetda ko‘rish mumkin, lekin teatr jonli san’at.',
        rule: 'Teatrda tomoshabin aktyorning nigohi, nafasi, har bir so‘zi va harakatini jonli his qiladi. Aktyor va tomoshabin o‘rtasidagi «jonli» aloqani boshqa vosita bilan hosil qilib bo‘lmaydi.',
        note: 'Alijon Andakulov: spektakl manzur bo‘lishida dekoratsiyalar alohida ahamiyatga ega.',
      },
      {
        title: 'Yangi so‘zlar (7.13)',
        text: 'Matndagi so‘zlar izohi:',
        table: {
          head: ['So‘z', 'Izohi'],
          rows: [
            ['teranlashtirish', 'chuqurlashtirish'],
            ['iqtibos', 'boshqa manbadan aynan keltirilgan parcha'],
            ['muhandis', 'injener; bunda — qalbni quruvchi'],
            ['yo‘g‘rilmoq', 'singib ketmoq, qorishmoq'],
            ['dekoratsiya', 'sahna bezagi'],
            ['monolog', 'bir kishining uzun nutqi'],
          ],
        },
      },
      {
        title: 'Kichik sarlavhalar (7.14)',
        text: 'Maqola uch qismga bo‘lingan:',
        table: {
          head: ['Sarlavha', 'Asosiy fikr'],
          rows: [
            ['Teatr bor ekan, hayot maroqli va go‘zaldir', 'teatrning o‘rnini hech narsa bosa olmaydi'],
            ['Ijod ahli inson qalbining muhandislaridir', 'teatr ibratxona, eskirmaydi'],
            ['Sahna bilan yuzma-yuz', 'teatrning jonli aloqasi, dekoratsiya'],
          ],
        },
      },
      {
        title: 'Muhokama va topshiriqlar (7.16–7.17)',
        text: '«Teatr bu — ibratxona! Unga yoshlarni jalb etish uchun nimalar qilish kerak?» mavzusida muhokama.',
        list: [
          'Muhokamadan oldin 3 ta savol yozing.',
          'Teatr dekoratsiyasini tasvirlang: sahna bezaklari, detallar, aktyor liboslari va holati.',
          'Matndan sifat va ravishlarni bog‘langan so‘zi bilan ko‘chiring: ma’naviy olam...',
        ],
      },
    ],
    pairs: [
      ['Behbudiy', 'Teatr ibratxonadir'],
      ['Shekspir', 'Butun olam — teatr'],
      ['Padarkush', 'Behbudiy dramasi'],
      ['dekoratsiya', 'Sahna bezagi'],
      ['monolog', 'Bir kishi nutqi'],
      ['iqtibos', 'Aynan keltirilgan parcha'],
    ],
    quiz: [
      { q: '«Teatr ibratxonadir» kimning so‘zi?', options: ['Mahmudxo‘ja Behbudiy', 'Abdulla Qodiriy', 'Cho‘lpon', 'Fitrat'], answer: 0 },
      { q: '«Butun olam — teatr» degan kim?', options: ['Shekspir', 'Gyote', 'Tolstoy', 'Navoiy'], answer: 0 },
      { q: 'Behbudiyning dramasi?', options: ['«Padarkush»', '«O‘tkan kunlar»', '«Kecha va kunduz»', '«Mehrobdan chayon»'], answer: 0 },
      { q: '«Dekoratsiya» nima?', options: ['sahna bezagi', 'aktyor nutqi', 'tomoshabin', 'chipta'], answer: 0 },
      { q: 'Teatrning kinodan asosiy farqi?', options: ['jonli aloqa', 'arzonligi', 'uzunligi', 'rangliligi'], answer: 0 },
      { q: '«Monolog» nima?', options: ['bir kishining uzun nutqi', 'ikki kishi suhbati', 'qo‘shiq', 'raqs'], answer: 0 },
    ],
    sort: {
      categories: ['Faqat teatrga xos', 'Boshqa san’atda ham bor'],
      items: [
        { text: 'aktyor nafasini jonli his qilish', cat: 0 }, { text: 'internetda ko‘rish mumkin', cat: 1 },
        { text: 'tomoshabin bilan jonli muloqot', cat: 0 }, { text: 'nusxa ko‘chirib olish', cat: 1 },
        { text: 'sahna dekoratsiyasi', cat: 0 }, { text: 'televizorda namoyish', cat: 1 },
      ],
    },
    qa: [
      { q: 'Nega maqola «Hayot va sahna ko‘zgusi» deb atalgan?', a: 'Teatr hayotni, voqea va kechinmalarni ko‘zgudek aks ettiradi.' },
      { q: 'Teatrning televizordagi tomoshadan farqi nimada?', a: 'Aktyor bilan jonli aloqa, nigoh va nafasni his qilish.' },
      { q: 'Teatr eskiradimi? Fikringizni ayting.', a: 'Erkin javob: matnga ko‘ra eskirmaydi, chunki jonli aloqa o‘rnini hech narsa bosmaydi.' },
      { q: 'Spektakl manzur bo‘lishi uchun nima muhim?', a: 'Kuchli ijro, jonli va ishonarli dekoratsiyalar, qiziqarli asar.' },
      { q: '«Ijod ahli inson qalbining muhandislaridir» fikrini izohlang.', a: 'Ijodkorlar asarlari orqali inson qalbi va ma’naviyatini shakllantiradi.' },
    ],
  },

  /* ===================== 54 ===================== */
  {
    id: 'ozlashtirma-gap',
    source: 'VII bob «San’at» • 4-dars • 146–147-betlar',
    title: 'Ko‘chirma va o‘zlashtirma gap',
    short: 'Ko‘chirma gapni o‘zlashtirma gapga aylantirish',
    lesson: [
      {
        title: 'Ko‘chirma gapli qo‘shma gap (7.18)',
        text: 'Matndan misol:',
        examples: ['Rixsi Ibrohimova teatr haqida shunday deydi: «Hech bir san’at turi teatr o‘rnini bosa olmaydi».', '«Teatr san’ati hech qachon eskirmaydi», — deya ta’kidlaydi Mirza Azizov.'],
        note: 'Qo‘shtirnoq ichidagi qism — ko‘chirma gap, qolgani — muallif gapi.',
      },
      {
        title: 'O‘zlashtirma gap',
        text: 'O‘zganing gapi ikki yo‘l bilan beriladi.',
        rule: 'O‘zganing gapi ko‘chirma gapli qo‘shma gap yoki o‘zlashtirma gap orqali ifodalanadi. Ular ma’nodosh bo‘ladi. O‘zlashtirma gapda o‘zganing gapi o‘z so‘zimiz bilan, qo‘shtirnoqsiz beriladi.',
      },
      {
        title: 'Aylantirish usullari',
        text: 'Ko‘chirma gap shakliy o‘zgarishlar bilan o‘zlashtirma gapga aylanadi:',
        table: {
          head: ['Ko‘chirma gapli qo‘shma gap', 'O‘zlashtirma gap'],
          rows: [
            ['«Teatr tarbiya va ma’naviyat maskani», — dedi ustozimiz.', 'Ustozimiz teatr tarbiya va ma’naviyat maskani ekanini aytdi.'],
            ['«Teatrning boshqa san’at turlaridan qanday farqi bor?» — deb so‘radi jurnalist.', 'Jurnalist teatrning boshqa san’at turlaridan qanday farqi borligini so‘radi.'],
          ],
        },
        list: ['Qo‘shtirnoq va tire tushib qoladi.', 'Kesimga -ligi, -ganini, ekanini kabi qo‘shimchalar qo‘shiladi.', '«dedi» o‘rniga «aytdi», «so‘radi», «ta’kidladi» kabi fe’llar keladi.'],
      },
      {
        title: 'Mashq (7.19)',
        text: 'O‘zlashtirma gapga aylantiramiz:',
        table: {
          head: ['Ko‘chirma', 'O‘zlashtirma'],
          rows: [
            ['Shekspir: «Butun olam — teatr, unda har bir odam aktyordir», — degan edi.', 'Shekspir butun olam teatr, unda har bir odam aktyor ekanini aytgan edi.'],
            ['«Teatr ibratxonadir», — degan edi Behbudiy.', 'Behbudiy teatr ibratxona ekanini aytgan edi.'],
          ],
        },
      },
      {
        title: 'Ikki guruhga ajratish (7.20)',
        text: 'Tinish belgilariga qarab:',
        table: {
          head: ['Ko‘chirma gapli', 'O‘zlashtirma gap'],
          rows: [
            ['Donolar deydilarki: «Vaqt — eng qimmatbaho boylik».', 'Adiba qiziga vaqtliroq kelishini aytdi.'],
            ['«Orastalikka, — dedi momom, — doim e’tibor berish kerak».', 'Tog‘ay Murod or-nomus uchun kurash bolalikdan boshlanishini ta’kidlaydi.'],
            ['«Yoshlikda olingan bilim toshga o‘yilgan naqsh kabidir», — dedi bobom.', 'Ozod Sharafiddinov shoirni kamdan kam tug‘iladigan iste’dod egasi deb yodga oladi.'],
          ],
        },
      },
      {
        title: 'Iqtiboslar (7.21)',
        text: 'Mashhur fikrlarni o‘zlashtirma gapga aylantiring:',
        list: [
          'Ibn Sino: «San’at — mo‘jizadir». → Ibn Sino san’at mo‘jiza ekanini aytgan.',
          'Shavkat Mirziyoyev: «Adabiyot, san’at va madaniyat yashasa, millat bezavol yashaydi».',
          'Laroshfuko: «Asl notiqlik — kerakli narsani me’yorida ayta olish san’atidir».',
        ],
      },
    ],
    pairs: [
      ['ko‘chirma gap', 'O‘zga gapi aynan, qo‘shtirnoqda'],
      ['o‘zlashtirma gap', 'O‘zga gapi o‘z so‘zimiz bilan'],
      ['dedi', 'aytdi'],
      ['deb so‘radi', '...ligini so‘radi'],
      ['qo‘shtirnoq', 'O‘zlashtirmada tushib qoladi'],
      ['muallif gapi', 'Kim aytganini bildiradi'],
    ],
    quiz: [
      { q: 'O‘zlashtirma gapda qo‘shtirnoq...', options: ['ishlatilmaydi', 'ishlatiladi', 'ikki marta qo‘yiladi', 'qavs bilan almashadi'], answer: 0 },
      { q: '«Adiba qiziga vaqtliroq kelishini aytdi» —', options: ['o‘zlashtirma gap', 'ko‘chirma gapli qo‘shma gap', 'sodda gap emas', 'undov gap'], answer: 0 },
      { q: '«Qanday farqi bor?» — deb so‘radi. O‘zlashtirma shakli:', options: ['qanday farqi borligini so‘radi', 'qanday farq dedi', 'farq bor', 'farqi yo‘q dedi'], answer: 0 },
      { q: 'Ko‘chirma gap va o‘zlashtirma gap qanday munosabatda?', options: ['ma’nodosh', 'zid', 'bog‘liq emas', 'bir xil shaklda'], answer: 0 },
      { q: 'Qaysi biri ko‘chirma gapli qo‘shma gap?', options: ['«Vaqt — boylik», — dedi bobom.', 'Bobom vaqt boylik ekanini aytdi.', 'Vaqt boylik.', 'Bobom gapirdi.'], answer: 0 },
    ],
    sort: {
      categories: ['Ko‘chirma gapli', 'O‘zlashtirma gap'],
      items: [
        { text: '«Kitob o‘qi», — dedi onam.', cat: 0 }, { text: 'Onam kitob o‘qishimni aytdi.', cat: 1 },
        { text: 'Ustoz: «Vaqtni qadrlang», — dedi.', cat: 0 }, { text: 'Ustoz vaqtni qadrlash kerakligini aytdi.', cat: 1 },
        { text: '«Qachon kelasan?» — deb so‘radi do‘stim.', cat: 0 }, { text: 'Do‘stim qachon kelishimni so‘radi.', cat: 1 },
      ],
    },
    qa: [
      { q: 'O‘zlashtirma gap nima?', a: 'O‘zganing gapini o‘z so‘zimiz bilan, qo‘shtirnoqsiz berish.' },
      { q: '«Teatr ibratxonadir», — degan edi Behbudiy. O‘zlashtirma gapga aylantiring.', a: 'Behbudiy teatr ibratxona ekanini aytgan edi.' },
      { q: 'Aylantirishda kesimga qanday qo‘shimchalar qo‘shiladi?', a: '-ligi, -ganini, ekanini kabi.' },
      { q: 'So‘roq ko‘chirma gap qanday o‘zlashtiriladi?', a: '«...-ligini so‘radi» shaklida.' },
      { q: '«Donolar deydilarki: “Vaqt — boylik”» gapida qaysi qism ko‘chirma gap?', a: '«Vaqt — boylik».' },
    ],
  },

  /* ===================== 55 ===================== */
  {
    id: 'gilamdozlik',
    source: 'VII bob «San’at» • 5-dars • 148–150-betlar',
    title: '«Gilamdo‘zlik tarixidan»',
    short: 'Audiomatn: gilam va kigiz, hunarmandchilik so‘zlari, imlo',
    lesson: [
      {
        title: 'Darsga kirish',
        text: '«Gilamdo‘zlik tarixidan» audiomatni tinglanadi (7.23). Unda gilam va kigiz tayyorlash tarixi hikoya qilinadi.',
        note: 'Audiomatn darslikdagi QR kod orqali tinglanadi.',
      },
      {
        title: 'Hunarmandchilik so‘zlari (7.24)',
        text: 'So‘zlar va izohlari:',
        table: {
          head: ['So‘z', 'Izohi'],
          rows: [
            ['shuur', 'ong, tushuncha'],
            ['to‘qima', 'to‘qib yasalgan'],
            ['tikma', 'ip bilan tikilgan'],
            ['kigiz', 'yungdan bosib tayyorlanadigan qalin palos, namat'],
            ['bo‘yra', 'qamish cho‘pidan to‘qilgan to‘shama'],
            ['piyma', 'jundan bosilgan uzun qo‘njli qishki oyoq kiyim'],
            ['savag‘ich', 'paxta, junni savash uchun tayoqlar dastasi'],
          ],
        },
      },
      {
        title: 'Gilamdo‘zlik tarixi',
        text: 'Audiomatn topshiriqlaridan:',
        list: [
          'Gilamdo‘zlik Markaziy Osiyoda XI–XII asrlarda yuzaga kelgan, jadal rivoji XIV asrning 2-yarmiga to‘g‘ri keladi.',
          'Temuriylar davrida gilamdo‘zlik buyumlari keng tarqalgan.',
          'XVIII–XIX asrlarga kelib shohona gilamlar oddiy xalq orasida ham tarqalgan.',
          'Turkman gilamlari yovmut, tekin, beshir deb yuritiladi.',
          'Shirvoni, axti, darbandi kabi gilamlarda barg, gul, qush tasvirlari ishlanadi.',
          'Ota-bobolarimiz kigizni bo‘yra ustidan solishgan, o‘tovlarni o‘rashgan.',
        ],
      },
      {
        title: 'Kigiz tayyorlash bosqichlari (7.25)',
        text: 'Ketma-ketlik:',
        list: [
          '1. Jun titib tozalanadi, yuvib quritiladi.',
          '2. Rangi va sifatiga ko‘ra yuzlik va oraliqqa ajratiladi.',
          '3. Savag‘ichlar bilan savalab titiladi.',
          '4. Kigiz hajmiga moslab qamish qolip tayyorlanadi.',
          '5. Chiy sholchaga o‘ralib, arqon bilan bog‘lanadi, ustidan qaynoq suv sepib dumalatiladi.',
          '6. Kigiz qotgach, ikki yoniga taxta qo‘yib, ishqalab tekislanadi.',
        ],
        note: 'Naqsh uchun romb, yulduz, bulut va geometrik shakllar ishlatiladi. Qo‘lda kigiz tayyorlash unutilish arafasida.',
      },
      {
        title: 'Qo‘shimcha qo‘shilganda imlo (7.26)',
        text: 'Tovush o‘zgarishlari:',
        table: {
          head: ['So‘z + qo‘shimcha', 'Yozilishi', 'Hodisa'],
          rows: [
            ['tilak + ga', 'tilakka', 'g → k'],
            ['yurak + ga', 'yurakka', 'g → k'],
            ['qarmoq + im', 'qarmog‘im', 'q → g‘'],
            ['bezak + ing', 'bezaging', 'k → g'],
            ['ko‘ngil + i', 'ko‘ngli', 'i tushadi'],
            ['isi + q', 'issiq', 's ortadi'],
            ['obro‘ + im', 'obro‘yim', 'y ortadi'],
          ],
        },
        note: '7.27: milliy hunarmandchilik turlaridan biri haqida reja asosida matn tuzing.',
      },
    ],
    pairs: [
      ['kigiz', 'Namat'],
      ['bo‘yra', 'Qamish to‘shama'],
      ['piyma', 'Kigiz etik'],
      ['shuur', 'Ong'],
      ['tilak + ga', 'tilakka'],
      ['qarmoq + im', 'qarmog‘im'],
    ],
    quiz: [
      { q: '«Kigiz» nima?', options: ['yungdan bosilgan palos', 'qamish to‘shama', 'ipak gilam', 'oyoq kiyim'], answer: 0 },
      { q: '«Bo‘yra» nimadan to‘qiladi?', options: ['qamishdan', 'jundan', 'ipakdan', 'paxtadan'], answer: 0 },
      { q: 'Gilamdo‘zlik qaysi asrda jadal rivojlangan?', options: ['XIV asrning 2-yarmi', 'X asr', 'XX asr oxiri', 'VIII asr'], answer: 0 },
      { q: '«Tilak + ga» qanday yoziladi?', options: ['tilakka', 'tilakga', 'tilagga', 'tilaka'], answer: 0 },
      { q: '«Obro‘ + im» qanday yoziladi?', options: ['obro‘yim', 'obro‘im', 'obrom', 'obro‘vim'], answer: 0 },
      { q: '«Shuur» so‘zining ma’nosi?', options: ['ong, tushuncha', 'gilam', 'ip', 'naqsh'], answer: 0 },
    ],
    sort: {
      categories: ['To‘g‘ri yozilgan', 'Xato yozilgan'],
      items: [
        { text: 'tilakka', cat: 0 }, { text: 'tilakga', cat: 1 },
        { text: 'qarmog‘im', cat: 0 }, { text: 'qarmoqim', cat: 1 },
        { text: 'ko‘ngli', cat: 0 }, { text: 'ko‘ngili', cat: 1 },
        { text: 'bezaging', cat: 0 }, { text: 'bezaking', cat: 1 },
        { text: 'obro‘yim', cat: 0 }, { text: 'obro‘im', cat: 1 },
      ],
    },
    qa: [
      { q: 'Nega gilamdo‘zlik va kigizdo‘zlik aholining asosiy mashg‘uloti bo‘lgan?', a: 'Chorvachilik ko‘p bo‘lgani, jun xomashyosi mo‘l bo‘lgani va ehtiyoj tufayli.' },
      { q: 'Nega gilamdo‘zlik amaliy san’at deyiladi?', a: 'Buyumlar ham kundalik ehtiyojga xizmat qiladi, ham go‘zallik namunasi.' },
      { q: 'Kigiz tayyorlashning birinchi bosqichi?', a: 'Jun titib tozalanadi, yuvib quritiladi.' },
      { q: '«Ko‘ngil + i» qo‘shilganda qanday hodisa ro‘y beradi?', a: 'Tovush tushadi: ko‘ngli.' },
      { q: 'Kigiz naqshlarida qanday shakllar ishlatiladi?', a: 'Romb, yulduz, bulut, geometrik shakllar.' },
    ],
  },

  /* ===================== 56 ===================== */
  {
    id: 'eskirgan-yangi-sozlar',
    source: 'VII bob «San’at» • 6-dars • 150–152-betlar',
    title: 'Eskirgan va yangi so‘zlar',
    short: 'Tarixiy so‘zlar, arxaizmlar va neologizmlar',
    lesson: [
      {
        title: 'Darsga kirish',
        text: 'Kigiz, bo‘yra, piyma so‘zlari qanday ma’nolarni bildiradi? Hozir nutqimizda qanday yangi so‘zlarni ishlatamiz?',
      },
      {
        title: 'So‘zlarning eskirishi va yangilanishi',
        text: 'Til doimo o‘zgarib turadi: ba’zi so‘zlar iste’moldan chiqadi, yangilari paydo bo‘ladi.',
        table: {
          head: ['Guruh', 'Belgisi'],
          rows: [
            ['Tarixiy so‘zlar', 'anglatgan narsa yoki tushuncha hozir yo‘q'],
            ['Arxaik so‘zlar', 'tushuncha bor, lekin boshqa so‘z bilan ataladi'],
            ['Yangi so‘zlar', 'yangi tushuncha bilan birga paydo bo‘lgan'],
          ],
        },
      },
      {
        title: 'So‘zlarni guruhlash (7.28)',
        text: 'Izohlar asosida:',
        table: {
          head: ['Tarixiy', 'Arxaik', 'Yangi'],
          rows: [
            ['sulton — amir, xon unvoni', 'tilmoch — tarjimon', 'bloger'],
            ['abjad — eski maktab alifbosi', 'dudoq — lab', 'motivatsiya'],
            ['botmon — 1 gektarga yaqin o‘lchov', 'handasa — geometriya', 'dayjest'],
            ['', 'oraz — yuz, tashqi ko‘rinish', 'Instagram'],
          ],
        },
      },
      {
        title: 'Badiiy matnda eskirgan so‘zlar (7.29)',
        text: 'Odil Yoqubovning Mirzo Ulug‘bek haqidagi asaridan parchada davr ruhini berish uchun eskirgan so‘zlar ishlatilgan:',
        table: {
          head: ['So‘z', 'Ma’nosi'],
          rows: [
            ['rasadxona', 'osmon jismlarini kuzatish joyi'],
            ['usturlob', 'yulduzlarni o‘lchash asbobi'],
            ['oshyon', 'qavat'],
            ['alohazrat', 'hukmdorga murojaat'],
            ['dastor', 'salla'],
            ['kimxob', 'zarbof qimmatbaho mato'],
            ['chakmon', 'ustki uzun kiyim'],
          ],
        },
        rule: 'Badiiy asarda eskirgan so‘zlar tarixiy davrni, muhitni va qahramonlar nutqini haqqoniy aks ettirish uchun qo‘llanadi.',
      },
      {
        title: 'Yangi so‘zlar (7.30)',
        text: '«Bastakorning miyasi o‘limdan keyin kuy “yaratish”da davom etmoqda» maqolasidagi yangi so‘zlar (alifbo tartibida):',
        examples: ['avangard', 'fragment', 'impuls', 'installyatsiya', 'neyrobiolog', 'organoid', 'simfoniya'],
        note: 'Avstraliyadagi «Revivification» loyihasida bastakor Elvin Lyusiye hujayralaridan o‘stirilgan «mini miya» 20 ta jez plastinka orqali musiqa yaratadi.',
      },
      {
        title: 'Ijodiy ish (7.31–7.32)',
        text: 'Ikki guruhda matn tuzing:',
        list: [
          '1-guruh: chachvon, paranji, kashta, mursak, kaltacha, banoras, beqasam.',
          '2-guruh: Telegram, TikTok, Instagram, Pinterest, Snapchat.',
          'IT va hunarmandchilik so‘zlaridan izohli lug‘at tuzing.',
        ],
      },
    ],
    pairs: [
      ['tilmoch', 'tarjimon'],
      ['dudoq', 'lab'],
      ['handasa', 'geometriya'],
      ['oraz', 'yuz'],
      ['oshyon', 'qavat'],
      ['dastor', 'salla'],
    ],
    quiz: [
      { q: '«Handasa» so‘zining hozirgi muqobili?', options: ['geometriya', 'tarix', 'algebra', 'adabiyot'], answer: 0 },
      { q: 'Qaysi biri yangi so‘z?', options: ['bloger', 'sulton', 'tilmoch', 'dudoq'], answer: 0 },
      { q: '«Tilmoch» kim?', options: ['tarjimon', 'hukmdor', 'savdogar', 'askar'], answer: 0 },
      { q: '«Botmon» nima?', options: ['yer o‘lchov birligi', 'kiyim', 'qurol', 'taom'], answer: 0 },
      { q: 'Tarixiy so‘z qaysi?', options: ['abjad', 'lab', 'motivatsiya', 'dayjest'], answer: 0 },
      { q: 'Badiiy asarda eskirgan so‘zlar nima uchun ishlatiladi?', options: ['davr ruhini berish uchun', 'xato qilib', 'qisqartirish uchun', 'reklama uchun'], answer: 0 },
    ],
    sort: {
      categories: ['Tarixiy', 'Arxaik', 'Yangi'],
      items: [
        { text: 'sulton', cat: 0 }, { text: 'tilmoch', cat: 1 }, { text: 'bloger', cat: 2 },
        { text: 'abjad', cat: 0 }, { text: 'dudoq', cat: 1 }, { text: 'motivatsiya', cat: 2 },
        { text: 'botmon', cat: 0 }, { text: 'handasa', cat: 1 }, { text: 'dayjest', cat: 2 },
      ],
    },
    qa: [
      { q: 'Tarixiy so‘z va arxaizm farqi nima?', a: 'Tarixiy so‘z anglatgan narsa yo‘qolgan; arxaizmda narsa bor, lekin boshqa so‘z bilan ataladi.' },
      { q: '«Dudoq» so‘zi hozir qanday ataladi?', a: 'Lab.' },
      { q: 'Uchta yangi so‘z ayting.', a: 'Bloger, motivatsiya, dayjest (installyatsiya, kontent).' },
      { q: '«Usturlob» nima?', a: 'Osmon jismlarini kuzatish, o‘lchash asbobi.' },
      { q: 'Nega tilda yangi so‘zlar paydo bo‘ladi?', a: 'Yangi narsa, texnologiya va tushunchalar paydo bo‘lgani uchun.' },
    ],
  },

  /* ===================== 57 ===================== */
  {
    id: 'intervyu-ssenariy',
    source: 'VII bob «San’at» • 7-dars • 153–155-betlar',
    title: 'Intervyu ssenariysi',
    short: 'Ssenariy tuzilishi, savollar ketma-ketligi, intervyu olish',
    lesson: [
      {
        title: 'Ssenariy namunasi (7.33)',
        text: 'Mavzu: «Kulolchilik — sabr va go‘zallik uyg‘unligidan paydo bo‘lgan san’at».',
        table: {
          head: ['Qism', 'Ma’lumot'],
          rows: [
            ['Suhbatdosh', 'kulol Madumar Polvonov'],
            ['Manzil', 'ustaxona'],
            ['Davomiyligi', '10–15 daqiqa'],
            ['Auditoriya', 'maktab o‘quvchilari, yoshlar'],
          ],
        },
      },
      {
        title: 'Ssenariyning uch qismi',
        text: 'Ssenariy tuzilishi:',
        table: {
          head: ['Qism', 'Mazmuni'],
          rows: [
            ['I. Kirish (1–2 daqiqa)', 'jurnalist tomoshabinlar bilan salomlashadi, mavzu va suhbatdoshni tanishtiradi'],
            ['II. Asosiy qism (10 daqiqa)', 'savol-javob'],
            ['III. Yakun (1–2 daqiqa)', 'minnatdorlik, xulosa va tomoshabinlarga tilak'],
          ],
        },
      },
      {
        title: 'Savollar ketma-ketligi',
        text: 'Savollar mantiqiy tartibda tuziladi:',
        list: [
          '1. Tanishtirish: necha yildan beri shug‘ullanasiz?',
          '2. Boshlanish: bu hunarga qanday kirib kelgansiz?',
          '3. Hunarning o‘zi: bosqichlar, asboblar, kerakli xislatlar.',
          '4. Eng esda qolarli asaringiz.',
          '5. Kelajak rejalari.',
          '6. Yoshlar va hunar: maslahatlaringiz.',
        ],
        rule: 'Yaxshi intervyuda savollar tanishuv → faoliyat → tajriba → tavsiya tartibida beriladi; shaxsiy hayotga oid, mavzuga aloqasiz savollar berilmaydi.',
      },
      {
        title: 'Intervyuga tayyorgarlik (7.35)',
        text: 'Uyda mashq qiling:',
        list: [
          'Birinchi gapingiz tinglovchini o‘ziga tortsin.',
          'Matnni bir necha marta ovoz chiqarib o‘qing, urg‘u va nafasni belgilang.',
          'Suhbatdoshni diqqat bilan tinglang, javob cho‘zilib ketmasin.',
          'Aniqlashtiruvchi savollar tayyorlang.',
        ],
      },
      {
        title: 'Ssenariyni baholash (7.37)',
        text: 'Mezonlar (jami 15 ball):',
        table: {
          head: ['Talab', 'Ball'],
          rows: [
            ['barcha qismlar shakllantirilgan', '3'],
            ['savollar izchil berilgan', '3'],
            ['mavzuga aloqasiz shaxsiy savollar yo‘q', '3'],
            ['savollar soni vaqtga mos', '3'],
            ['imloviy, ishoraviy, uslubiy xato yo‘q', '3'],
          ],
        },
        note: '7.38: intervyudagi savol-javoblarni avval ko‘chirma, keyin o‘zlashtirma gap shaklida yozing.',
      },
    ],
    pairs: [
      ['Kirish', 'Salomlashish va tanishtirish'],
      ['Asosiy qism', 'Savol-javob'],
      ['Yakun', 'Minnatdorlik va xulosa'],
      ['auditoriya', 'Tomoshabinlar'],
      ['ssenariy', 'Intervyu rejasi'],
      ['Madumar Polvonov', 'Kulol usta'],
    ],
    quiz: [
      { q: 'Namunadagi intervyu qaysi hunar haqida?', options: ['kulolchilik', 'gilamdo‘zlik', 'zargarlik', 'duradgorlik'], answer: 0 },
      { q: 'Intervyu ssenariysi nechta qismdan iborat?', options: ['3 ta', '2 ta', '5 ta', '1 ta'], answer: 0 },
      { q: 'Intervyuda qanday savol berilmaydi?', options: ['mavzuga aloqasiz shaxsiy savol', 'tanishtiruvchi savol', 'kasb haqidagi savol', 'maslahat so‘rash'], answer: 0 },
      { q: 'Namunadagi intervyu davomiyligi?', options: ['10–15 daqiqa', '1 soat', '2 daqiqa', '30 soniya'], answer: 0 },
      { q: 'Ssenariy baholash mezoni jami necha ball?', options: ['15', '10', '20', '5'], answer: 0 },
    ],
    sort: {
      categories: ['Kirish', 'Asosiy qism', 'Yakun'],
      items: [
        { text: 'Assalomu alaykum, aziz tomoshabinlar!', cat: 0 }, { text: 'Bu hunarga qanday kirib kelgansiz?', cat: 1 }, { text: 'Samimiy suhbat uchun rahmat!', cat: 2 },
        { text: 'Bugun kulolchilik olamiga sayohat qilamiz', cat: 0 }, { text: 'Qaysi asboblar eng muhim?', cat: 1 }, { text: 'Hunarni qadrlang!', cat: 2 },
      ],
    },
    qa: [
      { q: 'Ssenariyning kirish qismi nima uchun kerak?', a: 'Tomoshabinni mavzu va suhbatdosh bilan tanishtirib, qiziqtirish uchun.' },
      { q: 'Savollar qanday tartibda tuziladi?', a: 'Tanishuv, boshlanish, faoliyat, esda qolarli voqea, rejalar, tavsiyalar.' },
      { q: 'Jurnalist ssenariydan tashqari nimaga e’tibor beradi?', a: 'Suhbatdoshni tinglash, aniqlashtiruvchi savollar, ovoz, manzara, vaqt.' },
      { q: 'Nega ssenariy tayyorlash muhim?', a: 'Intervyu sifatli, izchil va vaqtga mos o‘tishi uchun.' },
      { q: 'Sizdan intervyu olishsa, qanday savol berilishini istardingiz?', a: 'Erkin javob.' },
    ],
  },

  /* ===================== 58 ===================== */
  {
    id: 'sanat-inson-hayotida',
    source: 'VII bob «San’at» • 8-dars • 155–156-betlar',
    title: 'San’atning inson hayotidagi o‘rni. «G‘arib»',
    short: 'Ijodiy matn yozish, iqtiboslar, «g‘arib» so‘zi tarixi',
    lesson: [
      {
        title: 'Darsga kirish',
        text: 'San’atning inson hayotidagi o‘rni haqida fikr bildiring. San’atning qaysi turi sizga ko‘proq yoqadi?',
      },
      {
        title: 'Sarlavha tanlash (7.41)',
        text: 'Mavzuga eng mos sarlavhani tanlang va izohlang:',
        list: [
          'San’at turlari va ularning tarbiyaviy ahamiyati',
          'San’atning inson hayotidagi o‘rni',
          'San’at — inson qalbi tarjimoni',
          'San’atsiz hayotni tasavvur etib bo‘lmaydi',
        ],
      },
      {
        title: 'Iqtiboslar (7.42)',
        text: 'Fikrni dalillash uchun mashhur iqtiboslardan foydalanish mumkin:',
        table: {
          head: ['Muallif', 'Fikri'],
          rows: [
            ['Botir Zokirov', 'San’at — ichki dunyoni tashqi olamga aks ettirishning eng samarali yo‘li.'],
            ['Fyodor Dostoyevskiy', 'Go‘zallik dunyoni qutqaradi.'],
            ['Albert Eynshteyn', 'San’at — ilm-fan tushuntira olmaydigan narsalarni ifodalash vositasi.'],
            ['Lev Tolstoy', 'San’at — boshdan kechirilgan tuyg‘ularni boshqalar bilan bo‘lishish usuli.'],
          ],
        },
      },
      {
        title: 'Ijodiy matn yozish (7.43–7.45)',
        text: 'Fikrni rivojlantirish uchun jumlalarni davom ettiring:',
        list: [
          'San’at bor joyda ... (hayot go‘zal, qalblar ezgu).',
          'Qo‘li hunarli — ... (hech qachon kam bo‘lmas).',
          'San’at qalbni uyg‘otadi, aqlni ... (charxlaydi).',
        ],
        rule: 'Ijodiy matnni yozgach, uni imloviy, ishoraviy va uslubiy xatolar bo‘yicha tekshirib, zarur bo‘lsa qayta yozing.',
      },
      {
        title: 'Til sandig‘i: g‘arib va g‘aroyib',
        text: 'Eshqobil Shukur «g‘arib» so‘zining ma’nolari haqida yozadi:',
        list: [
          'Hozir «g‘arib» — kimsasiz, bechora, mazlum ma’nolarida ishlatiladi.',
          'Navoiy asarlarida «g‘arib» so‘zi «g‘aroyib, ajoyib» ma’nosida ham keladi.',
          'Etimologik lug‘atga ko‘ra, arabcha «g‘araba» — «notanish bo‘ldi» fe’lidan; ma’nosi «o‘zga ellik, notanish, musofir».',
          '«Navoiy asarlari lug‘ati»da «musofir, kimsasiz» ma’nosi ham bor.',
        ],
        examples: ['Senki borsen zamon elida g‘arib, Sanga bo‘lg‘on jahon ichinda ajib. («Sab’ayi sayyor»)'],
      },
    ],
    pairs: [
      ['Dostoyevskiy', 'Go‘zallik dunyoni qutqaradi'],
      ['Tolstoy', 'Tuyg‘ularni bo‘lishish usuli'],
      ['Eynshteyn', 'Ilm tushuntira olmaganni ifodalaydi'],
      ['Botir Zokirov', 'Ichki dunyoni aks ettirish'],
      ['g‘arib (Navoiyda)', 'g‘aroyib, ajoyib'],
      ['g‘arib (hozir)', 'kimsasiz, bechora'],
    ],
    quiz: [
      { q: '«Go‘zallik dunyoni qutqaradi» kimning so‘zi?', options: ['Dostoyevskiy', 'Tolstoy', 'Eynshteyn', 'Navoiy'], answer: 0 },
      { q: 'Navoiy asarlarida «g‘arib» qanday ma’noda ham keladi?', options: ['g‘aroyib, ajoyib', 'boy', 'kuchli', 'yosh'], answer: 0 },
      { q: '«G‘arib» so‘zi qaysi tildan?', options: ['arab', 'fors', 'turk', 'rus'], answer: 0 },
      { q: '«Sab’ayi sayyor» dostoni muallifi?', options: ['Alisher Navoiy', 'Bobur', 'Lutfiy', 'Ogahiy'], answer: 0 },
      { q: '«San’at — tuyg‘ularni bo‘lishish usuli» degan kim?', options: ['Lev Tolstoy', 'Gyote', 'Shekspir', 'Ibn Sino'], answer: 0 },
    ],
    sort: {
      categories: ['San’at turi', 'San’atkor'],
      items: [
        { text: 'teatr', cat: 0 }, { text: 'aktyor', cat: 1 },
        { text: 'musiqa', cat: 0 }, { text: 'bastakor', cat: 1 },
        { text: 'tasviriy san’at', cat: 0 }, { text: 'rassom', cat: 1 },
        { text: 'kulolchilik', cat: 0 }, { text: 'kulol', cat: 1 },
      ],
    },
    qa: [
      { q: 'San’at inson hayotida qanday o‘rin tutadi?', a: 'Erkin javob: ruhiyatni boyitadi, go‘zallikni his qildiradi, tarbiyalaydi.' },
      { q: '«San’at — inson qalbi tarjimoni» sarlavhasini izohlang.', a: 'San’at so‘z bilan aytib bo‘lmaydigan his-tuyg‘ularni ifodalaydi.' },
      { q: '«G‘arib» so‘zining hozirgi va Navoiy davridagi ma’nolari qanday?', a: 'Hozir — kimsasiz; Navoiyda — g‘aroyib, ajoyib, musofir.' },
      { q: 'Ijodiy matnda iqtibos nima uchun kerak?', a: 'Fikrni dalillash va ishonarli qilish uchun.' },
      { q: '«Qo‘li hunarli —» maqolini davom ettiring.', a: 'Masalan: «...hech qachon kam bo‘lmas».' },
    ],
  },

  /* ===================== 59 ===================== */
  {
    id: 'kopkari',
    source: 'VIII bob «Sport va sog‘lik» • 1-dars • 158–161-betlar',
    title: '«Ko‘pkari — milliy xalq o‘yini»',
    short: 'Ot o‘yinlari, ko‘pkari tarixi va etimologiyasi',
    lesson: [
      {
        title: 'Darsga kirish',
        text: 'Yangi bob — «Sport va sog‘lik». Qanday milliy xalq o‘yinlarini bilasiz?',
        note: 'Matn mualliflari: F. Jumaniyozova, M. Nuriddinova.',
      },
      {
        title: 'O‘zbeklarning ot o‘yinlari',
        text: 'Ko‘pkari-uloq kabi o‘yinlar butun turkiy xalqlarning milliy merosi.',
        examples: ['ko‘pkari-uloq', 'poyga', 'qizquvmoq', 'ag‘darish', 'ot ustida qilichbozlik', 'oltin qoboq', 'chavgon', 'sulton shahzoda'],
        note: 'Qizquvmoq, oltin qoboq, chavgon tarixiy etnosport turlariga aylangan; ko‘pkari esa hozir ham keng o‘ynaladi. Tojikiston va Afg‘onistondagi bo‘zkashi o‘yinining o‘zagi ham o‘zbek ko‘pkarisi.',
      },
      {
        title: 'Ot — yigitning qanoti',
        text: 'O‘zbekiston — ko‘pkariga chopadigan zotdor qorabayir otlar o‘lkasi.',
        list: [
          'Maqollar: «Ot — yigitning yo‘ldoshi», «Ot — yigitning qanoti».',
          'O‘yin nomlari: ko‘pkari, uloq, eski shaklda — ko‘kbo‘ri; Toshkent viloyati va Farg‘ona vodiysining ayrim joylarida — «tomosha».',
          'Asosan sunnat to‘ylarida o‘tkazilgan — «er yigitning ori».',
          '«Uloq» so‘zi o‘g‘laq (echki) bilan bog‘liq: echkini olib qochib, marraga yetkaziladi.',
        ],
      },
      {
        title: '«Ko‘pkari» so‘zining kelib chiqishi',
        text: 'Ikki manba:',
        table: {
          head: ['Manba', 'Talqini'],
          rows: [
            ['Milliy sport turlari ensiklopediyasi', 'turkiycha «ko‘p» + forscha «kor» — «ko‘pning ishi»'],
            ['Folklorshunos Mamatqul Jo‘rayev', 'o‘yin O‘g‘uzxon davridan; avval «ko‘kbo‘ri» deb atalgan, keyin «ko‘pkari» deb talaffuz etilgan'],
          ],
        },
        rule: 'Bu ikki ma’lumot bir-birini to‘ldiradi: biri so‘zning tarkibini, ikkinchisi tarixiy shaklini tushuntiradi.',
      },
      {
        title: 'O‘zbeklarga xos udumlar',
        text: 'O‘zbeklar bu o‘yinga o‘z yangiliklarini kiritgan:',
        list: [
          'Uloqdan oldin qizquvdi o‘yini o‘ynalgan.',
          'Shog‘uloq — suvda, daryoning sekin oqadigan joyida o‘tkaziladigan ot o‘yini.',
          'Ko‘pkarichilarning yuzi yorug‘ bo‘lsin deb oynaga qaratilgan.',
          'O‘yin duoyi fotiha bilan boshlangan.',
          'Uloqni bakovul turgan joyga eltgan chavandozga sovrin — «zot» berilgan.',
        ],
      },
      {
        title: 'Yangi so‘zlar (8.1)',
        text: 'Krossvorddagi so‘zlar:',
        table: {
          head: ['Izoh', 'So‘z'],
          rows: [
            ['katta va tantanali sayr, tomosha', 'sayil'],
            ['xalq og‘zaki ijodini o‘rganuvchi', 'folklorshunos'],
            ['tog‘dan oqib tushadigan kichik soy', 'jilg‘a'],
            ['daryoning kechib o‘tiladigan sayoz joyi', 'kechuv'],
            ['kurash, poyga, uloqni boshqaruvchi', 'bakovul'],
          ],
        },
      },
    ],
    pairs: [
      ['ko‘kbo‘ri', 'Ko‘pkarining eski nomi'],
      ['qorabayir', 'Zotdor ot'],
      ['bakovul', 'Musobaqa boshqaruvchisi'],
      ['zot', 'G‘olibga beriladigan sovrin'],
      ['shog‘uloq', 'Suvda o‘ynaladigan ot o‘yini'],
      ['bo‘zkashi', 'Tojik va afg‘on o‘yini'],
    ],
    quiz: [
      { q: 'Ko‘pkarining eski nomi?', options: ['ko‘kbo‘ri', 'chavgon', 'bo‘zkashi', 'oltin qoboq'], answer: 0 },
      { q: '«Ko‘pkari» so‘zi ensiklopediyada qanday talqin qilingan?', options: ['ko‘pning ishi', 'ot poygasi', 'echki o‘yini', 'yigit ori'], answer: 0 },
      { q: 'Ko‘pkariga chopadigan zotdor ot?', options: ['qorabayir', 'arabi', 'axalteke', 'pony'], answer: 0 },
      { q: 'Musobaqani boshqaruvchi shaxs?', options: ['bakovul', 'chavandoz', 'polvon', 'sarbon'], answer: 0 },
      { q: 'Ko‘pkari asosan qaysi to‘ylarda o‘tkazilgan?', options: ['sunnat to‘ylarida', 'faqat bayramlarda', 'maktabda', 'bozorda'], answer: 0 },
      { q: 'G‘olib chavandozga beriladigan sovrin?', options: ['zot', 'uloq', 'kechuv', 'sayil'], answer: 0 },
    ],
    sort: {
      categories: ['Matnga mos', 'Matnga mos emas'],
      items: [
        { text: 'Ko‘pkarichilarning yuzi oynaga qaratilgan', cat: 0 }, { text: 'Ko‘pkari faqat o‘zbeklarga xos', cat: 1 },
        { text: 'Shog‘uloq suvga yaqin joyda o‘ynalgan', cat: 0 }, { text: 'Olov yoqish qat’iy qoida', cat: 1 },
        { text: 'O‘yin duoyi fotiha bilan boshlangan', cat: 0 }, { text: 'Barcha ot o‘yinlari faqat sunnat to‘yida', cat: 1 },
      ],
    },
    qa: [
      { q: 'Nega ko‘pkari turkiy xalqlarning milliy merosi?', a: 'U barcha turkiy xalqlarda qadimdan o‘ynalib kelinadi.' },
      { q: 'Etnosport nima?', a: 'Xalqning qadimiy an’anaviy o‘yinlari asosidagi sport turlari.' },
      { q: '«Uloq» so‘zi nima bilan bog‘liq?', a: 'O‘g‘laq (echki) so‘zi bilan.' },
      { q: 'Ko‘pkari etimologiyasidagi ikki ma’lumot qanday munosabatda?', a: 'Bir-birini to‘ldiradi.' },
      { q: 'Ot haqida qanday maqollarni bilasiz?', a: '«Ot — yigitning yo‘ldoshi», «Ot — yigitning qanoti».' },
    ],
  },

  /* ===================== 60 ===================== */
  {
    id: 'olmoshlar',
    source: 'VIII bob «Sport va sog‘lik» • 2-dars • 161–163-betlar',
    title: 'Iqtibos tinish belgilari. Olmoshlar',
    short: 'Maqol iqtibos qilinganda qo‘shtirnoq; olmosh turlari',
    lesson: [
      {
        title: 'Maqol iqtibos qilinganda (8.3)',
        text: 'Maqol, matal va hikmatli so‘zlar matnda qanday yoziladi?',
        rule: 'Maqol iqtibos sifatida keltirilsa, ko‘chirma gap kabi qo‘shtirnoqqa olinadi. Iqtibos usuli qo‘llanmay, jumla matn qismi sifatida berilsa, qo‘shtirnoq ishlatilmaydi.',
        table: {
          head: ['Iqtibos (qo‘shtirnoq bilan)', 'Matn qismi (qo‘shtirnoqsiz)'],
          rows: [
            ['«Til bilgan el biladi», — deydi xalqimiz.', 'Tillarni o‘rgan, bu senga eshiklarni ochadi. Til bilgan — el biladi.'],
            ['Xalqimizda ajoyib maqol bor: «Til bilgan el biladi».', ''],
          ],
        },
        note: 'Matn ichida jumla kabi berilgan she’riy parcha ham qo‘shtirnoqqa olinadi.',
      },
      {
        title: 'Maqollar bilan gap tuzish (8.4)',
        text: 'Namuna: «Ot — yigitning yo‘ldoshi», — deydi dono xalqimiz.',
        examples: ['«Tani sog‘ga kunda to‘y», — deydi xalqimiz.', 'Bobom doim aytadi: «Salomatlik — tuman boylik».', '«Toza uyda dard qolmas», — deydi onam.'],
      },
      {
        title: 'Olmosh nima?',
        text: 'Matndagi «U O‘zbekistonning deyarli barcha hududlarida o‘ynalgan» gapida «u» — ko‘pkariga ishora.',
        rule: 'Olmoshlar so‘z, so‘z birikmasi, gap va matnlarga ishora qiladi, ularning o‘rnida almashinib keladi.',
      },
      {
        title: 'Olmosh turlari',
        text: 'Ma’nosiga ko‘ra yetti turi bor:',
        table: {
          head: ['Turi', 'Misollar'],
          rows: [
            ['Kishilik', 'men, sen, u, biz, siz, ular'],
            ['O‘zlik', 'o‘z'],
            ['Ko‘rsatish', 'u, bu, shu, o‘sha, ana, mana bu, ushbu'],
            ['So‘roq', 'kim? nima? qachon? qaysi? qancha? necha?'],
            ['Belgilash', 'hamma, barcha, bari, har bir, har kim, ba’zi'],
            ['Bo‘lishsizlik', 'hech kim, hech narsa, hech qachon, hech bir'],
            ['Gumon', 'kimdir, nimadir, allakim, allaqanday, birov'],
          ],
        },
      },
      {
        title: 'Gapga mos olmosh (8.9)',
        text: 'Namunalar:',
        list: [
          'Dorbozlik — san’atning eng qadimiy turlaridan biri. U taxminan 2500 yil ilgari Sharqda paydo bo‘lgan.',
          'Har kim o‘z vazifasini bajarishi kerak. Hech kim o‘z vazifasini bajarmay qolmasligi kerak.',
          'Baxtsizliging sirini boshqalardan emas, o‘zingdan izla.',
          'Ilm va odob — tagi yo‘q xazina. Kim unga ega bo‘lsa, qadri baland bo‘ladi.',
        ],
      },
      {
        title: 'Olmoshlarning ma’nodoshlari (8.11)',
        text: 'Ma’nodosh olmoshlar:',
        table: {
          head: ['Olmosh', 'Ma’nodoshi'],
          rows: [
            ['bu', 'shu, mana shu, ushbu, mazkur'],
            ['men', 'kamina, banda (kamtarlik ma’nosida)'],
            ['hech qaysi', 'hech bir'],
            ['qanday?', 'qanaqa? qay tarzda?'],
          ],
        },
      },
    ],
    pairs: [
      ['men', 'Kishilik olmoshi'],
      ['o‘z', 'O‘zlik olmoshi'],
      ['ushbu', 'Ko‘rsatish olmoshi'],
      ['har bir', 'Belgilash olmoshi'],
      ['hech kim', 'Bo‘lishsizlik olmoshi'],
      ['kimdir', 'Gumon olmoshi'],
    ],
    quiz: [
      { q: '«Allakim» qaysi olmosh turi?', options: ['gumon', 'so‘roq', 'belgilash', 'kishilik'], answer: 0 },
      { q: '«Hech qachon» qaysi olmosh?', options: ['bo‘lishsizlik', 'gumon', 'ko‘rsatish', 'o‘zlik'], answer: 0 },
      { q: 'Maqol iqtibos sifatida keltirilsa...', options: ['qo‘shtirnoqqa olinadi', 'qavsga olinadi', 'katta harf bilan yoziladi', 'hech narsa qo‘yilmaydi'], answer: 0 },
      { q: '«Ushbu» olmoshining turi?', options: ['ko‘rsatish', 'belgilash', 'kishilik', 'so‘roq'], answer: 0 },
      { q: '«Har qaysi» qaysi olmosh?', options: ['belgilash', 'bo‘lishsizlik', 'gumon', 'so‘roq'], answer: 0 },
      { q: '«Bu» olmoshining ma’nodoshi?', options: ['mazkur', 'hech bir', 'kimdir', 'barcha'], answer: 0 },
    ],
    sort: {
      categories: ['Belgilash', 'Bo‘lishsizlik', 'Gumon'],
      items: [
        { text: 'har bir', cat: 0 }, { text: 'hech kim', cat: 1 }, { text: 'kimdir', cat: 2 },
        { text: 'barcha', cat: 0 }, { text: 'hech narsa', cat: 1 }, { text: 'nimadir', cat: 2 },
        { text: 'har kim', cat: 0 }, { text: 'hech qachon', cat: 1 }, { text: 'allakim', cat: 2 },
      ],
    },
    qa: [
      { q: 'Olmosh nima?', a: 'So‘z, birikma, gap yoki matn o‘rnida keladigan, ularga ishora qiluvchi so‘z turkumi.' },
      { q: 'Olmoshning turlarini sanang.', a: 'Kishilik, o‘zlik, ko‘rsatish, so‘roq, belgilash, bo‘lishsizlik, gumon.' },
      { q: 'Maqol qachon qo‘shtirnoqsiz yoziladi?', a: 'Iqtibos usuli qo‘llanmay, matn qismi sifatida berilganda.' },
      { q: 'Gumon olmoshlariga misol keltiring.', a: 'Kimdir, nimadir, allakim, birov.' },
      { q: '«Salomatlik — tuman boylik» maqoli bilan ko‘chirma gap tuzing.', a: '«Salomatlik — tuman boylik», — deydi xalqimiz.' },
    ],
  },
];

/* --- 8-sinf Ona tili: 61–70-darslar (darslik 2025, 164–190-betlar) --- */
const ONA_TILI_8_PART7 = [
  /* ===================== 61 ===================== */
  {
    id: 'immunitet',
    source: 'VIII bob «Sport va sog‘lik» • 3-dars • 164–167-betlar',
    title: 'Immunitet: organizmning himoya qatlami',
    short: 'Mikrob, toksin, bakteriya va virus haqidagi ilmiy-ommabop matn',
    lesson: [
      {
        title: 'Organizm — alohida mamlakat',
        text: 'Muallif (Umida Sadatova) ilmiy ma’lumotni o‘xshatishlar orqali tushuntiradi:',
        table: {
          head: ['Tushuncha', 'O‘xshatish'],
          rows: [
            ['organizm', 'mamlakat'],
            ['virus va bakteriyalar', 'bosqinchilar, dushman'],
            ['immunitet', 'soqchilar, azamatlar, askarlar'],
          ],
        },
        note: 'Immun tizimi yaxshi nonushta qilmaganda, ovqatni vaqtida yemaganda, shirinlikka ruju qo‘yganda kuchsizlanadi.',
      },
      {
        title: 'Mikrob va toksin',
        text: 'Matndagi ta’riflar:',
        list: [
          'Mikrob — «kichik hayot». Qulay sharoitda yarim soatda 2 barobar, 1 soatda 4 barobar ko‘payadi.',
          'Mikroblar yuvilmagan meva, kir qo‘l, qaynatilmagan suv, buzilgan ovqat orqali kiradi.',
          'Toksin — mikroblar ishlab chiqargan zaharli modda. Muzlatilsa ham, quritilsa ham saqlanadi, faqat uzoq qaynatilsa halok bo‘ladi.',
          'Toksin va immunitet jangining eng yuqori nuqtasi — intoksikatsiya. Misol: zaharli qo‘ziqorin.',
        ],
      },
      {
        title: 'Bakteriya va virus',
        text: 'Ularning farqi:',
        table: {
          head: ['Bakteriya', 'Virus'],
          rows: [
            ['foydalilari ham bor (qatiq, pishloq, antibiotik)', 'tirik mavjudot emas'],
            ['nopatogen — foydali, patogen — kasallik chaqiruvchi', 'juda kichik, hujayra yadrosiga kirib oladi'],
            ['fitopatogen — o‘simliklarni kasallantiradi', 'bir necha soatda milliardlab ko‘payadi'],
            ['hujayraviy tuzilishga ega', 'gripp, gepatit, qizamiq, suvchechak'],
          ],
        },
      },
      {
        title: 'Immunitetni mustahkamlash',
        text: 'Matnning asosiy xulosasi:',
        rule: 'Immun tizimi — organizmning himoya qatlami. Agar bir yilda 5 martadan ko‘p kasal bo‘lsangiz, immunitet pasaygan. Toza havo, ozodalik, tartib-intizom, to‘g‘ri ovqatlanish va vitaminlar doim hamrohingiz bo‘lsin!',
        list: ['Yuqumli kasalliklarning oldini olish uchun emlash muhim.', 'Kasallikdan keyin organizmda unga qarshi immunitet hosil bo‘ladi.'],
      },
      {
        title: 'Boshqotirma va talaffuz (8.12, 8.15)',
        text: 'Matndagi atamalar va to‘g‘ri talaffuzi:',
        table: {
          head: ['Atama', 'Izohi'],
          rows: [
            ['gepatit', 'jigarning yallig‘lanishi'],
            ['toksin', 'zaharli modda («to‘ksin» emas)'],
            ['aminokislota', 'amin va karboksil guruhli organik birikma'],
            ['oqsil', 'tarkibida azot bo‘lgan murakkab modda'],
            ['immunitet', 'organizmning himoyalanish reaksiyasi'],
            ['antibiotik', 'bakteriyalarga qarshi dori'],
          ],
        },
      },
    ],
    pairs: [
      ['organizm', 'Mamlakat'],
      ['virus', 'Bosqinchi'],
      ['immunitet', 'Soqchi'],
      ['toksin', 'Zaharli modda'],
      ['gepatit', 'Jigar yallig‘lanishi'],
      ['mikrob', 'Kichik hayot'],
    ],
    quiz: [
      { q: '«Mikrob» so‘zining ma’nosi?', options: ['kichik hayot', 'zahar', 'dori', 'hujayra'], answer: 0 },
      { q: 'Toksin qachon halok bo‘ladi?', options: ['uzoq qaynatilganda', 'muzlatilganda', 'quritilganda', 'hech qachon'], answer: 0 },
      { q: 'Qaysi biri tirik mavjudot emas?', options: ['virus', 'bakteriya', 'mikrob', 'hujayra'], answer: 0 },
      { q: 'Matnda organizm nimaga o‘xshatilgan?', options: ['mamlakatga', 'qal’aga', 'bog‘ga', 'mashinaga'], answer: 0 },
      { q: 'Yiliga necha martadan ko‘p kasal bo‘lsa, immunitet pasaygan?', options: ['5', '1', '2', '10'], answer: 0 },
      { q: 'O‘simliklarni kasallantiruvchi bakteriyalar?', options: ['fitopatogen', 'nopatogen', 'foydali', 'bijg‘ituvchi'], answer: 0 },
    ],
    sort: {
      categories: ['Bakteriya', 'Virus'],
      items: [
        { text: 'foydalilari ham bor', cat: 0 }, { text: 'tirik mavjudot emas', cat: 1 },
        { text: 'qatiq tayyorlashda ishlatiladi', cat: 0 }, { text: 'hujayra yadrosiga kiradi', cat: 1 },
        { text: 'hujayraviy tuzilishga ega', cat: 0 }, { text: 'gripp chaqiradi', cat: 1 },
      ],
    },
    qa: [
      { q: 'Muallif nega o‘xshatishlardan foydalangan?', a: 'Ilmiy matnni qiziqarli, tushunarli va ommabop qilish uchun.' },
      { q: 'Mikroblar organizmga qanday kiradi?', a: 'Yuvilmagan meva, kir qo‘l, qaynatilmagan suv, buzilgan ovqat orqali.' },
      { q: 'Virus bakteriyadan nimasi bilan farq qiladi?', a: 'Juda kichik, tirik emas, hujayra devoridan o‘tib yadroga kiradi.' },
      { q: 'Immunitetni mustahkamlash uchun nima qilish kerak?', a: 'To‘g‘ri ovqatlanish, toza havo, ozodalik, tartib, vitaminlar, emlash.' },
      { q: 'Kasallikning ilk alomatlarini ayting.', a: 'Isitma, ko‘ngil aynishi, qayt qilish, etning uvishishi.' },
    ],
  },

  /* ===================== 62 ===================== */
  {
    id: 'neologizm-lugatlar',
    source: 'VIII bob «Sport va sog‘lik» • 4-dars • 168–169-betlar',
    title: 'Neologizmlar. Lug‘at turlari',
    short: 'Yangi so‘zlar, ensiklopedik va filologik lug‘atlar, omonimlar',
    lesson: [
      {
        title: 'Neologizm',
        text: 'Fan va texnika rivojlangani sari tilga yangi so‘zlar kirib keladi.',
        rule: 'Neologizm — fan va texnika taraqqiyoti natijasida kirib kelayotgan yangi narsa va tushunchalarni ifodalovchi so‘z yoki birikmalar: fitnes, onlayn, blog, selfi. Ular ma’lum vaqtdan so‘ng faol so‘zlar qatoriga o‘tadi.',
        note: 'Neologizmni o‘zbekcha muqobili bilan almashtirish tilni boyitadi: keshbek — qaytiq.',
      },
      {
        title: 'Matndagi yangi so‘zlar (8.16)',
        text: 'Immunitet haqidagi matndan:',
        table: {
          head: ['Talaffuzi va imlosi mos', 'Talaffuzi va imlosi mos emas'],
          rows: [
            ['virus', 'toksin (talaffuzda «o» o‘zgarishi mumkin)'],
            ['vitamin', 'aminokislota'],
            ['intoksikatsiya', 'antibiotik'],
            ['bakteriya', 'fitopatogen'],
          ],
        },
        note: '8.17: sport, ekologiya va tibbiyotga oid yangi so‘zlar lug‘atini tuzing.',
      },
      {
        title: 'Lug‘at turlari',
        text: 'Lug‘atlar ikki turga bo‘linadi.',
        table: {
          head: ['Tur', 'Mazmuni'],
          rows: [
            ['Ensiklopedik (qomusiy)', 'tarixiy voqealar, shaxslar, ilmiy tushunchalar'],
            ['Filologik (lingvistik)', 'tildagi so‘zlar, alifbo yoki mazmuniy guruh tartibida'],
          ],
        },
      },
      {
        title: 'Filologik lug‘atlar (8.19–8.20)',
        text: 'Turli lug‘atlarda «xotira» so‘zi:',
        table: {
          head: ['Lug‘at', 'Namuna'],
          rows: [
            ['Izohli', 'xotira — esda saqlash, eslab qolish qobiliyati'],
            ['Frazeologik', 'xotirasidan ko‘tarilmoq — yodidan chiqmoq'],
            ['Imlo', 'xotira, xotirjam, xoqon'],
            ['Sinonimlar', 'xotira, es, yod, xayol'],
            ['Ko‘p tilli', 'xotira — memory'],
            ['Antonimlar', 'qorong‘i — yorug‘'],
          ],
        },
      },
      {
        title: 'Omonimlar (8.21)',
        text: 'Shakli bir, ma’nosi har xil so‘zlar:',
        table: {
          head: ['So‘z', 'Ma’nolari'],
          rows: [
            ['yoz', 'fasl / yozmoq'],
            ['yosh', 'umr / ko‘z yoshi / yosh bola'],
            ['kecha', 'tun / o‘tgan kun'],
            ['oylik', 'maosh / bir oylik'],
            ['burun', 'a’zo / ilgari'],
            ['to‘y', 'marosim / to‘ymoq'],
          ],
        },
        note: '8.22: omonim so‘zlar musobaqasini o‘tkazing.',
      },
    ],
    pairs: [
      ['keshbek', 'qaytiq'],
      ['selfi', 'Neologizm'],
      ['ensiklopedik', 'Qomusiy lug‘at'],
      ['filologik', 'Lingvistik lug‘at'],
      ['xotira — memory', 'Ko‘p tilli lug‘at'],
      ['xotira, es, yod', 'Sinonimlar lug‘ati'],
    ],
    quiz: [
      { q: 'Neologizm nima?', options: ['yangi so‘z', 'eskirgan so‘z', 'sheva so‘zi', 'ibora'], answer: 0 },
      { q: 'Tarixiy shaxslar qaysi lug‘atda beriladi?', options: ['ensiklopedik', 'imlo', 'sinonimlar', 'antonimlar'], answer: 0 },
      { q: '«Xotira, es, yod, xayol» qaysi lug‘atga xos?', options: ['sinonimlar', 'izohli', 'imlo', 'ko‘p tilli'], answer: 0 },
      { q: 'Qaysi biri neologizm?', options: ['onlayn', 'sulton', 'dudoq', 'tilmoch'], answer: 0 },
      { q: '«Yoz» so‘zi omonimmi?', options: ['ha: fasl va yozmoq', 'yo‘q', 'sinonim', 'antonim'], answer: 0 },
      { q: '«Keshbek» so‘zining muqobili?', options: ['qaytiq', 'quvvatlagich', 'yonqopchiq', 'tamg‘a'], answer: 0 },
    ],
    sort: {
      categories: ['Ensiklopedik lug‘at', 'Filologik lug‘at'],
      items: [
        { text: 'Amir Temur hayoti', cat: 0 }, { text: 'so‘zning sinonimlari', cat: 1 },
        { text: 'tarixiy voqealar', cat: 0 }, { text: 'so‘zning imlosi', cat: 1 },
        { text: 'ilmiy tushunchalar', cat: 0 }, { text: 'so‘zning antonimi', cat: 1 },
      ],
    },
    qa: [
      { q: 'Neologizmlar qanday paydo bo‘ladi?', a: 'Fan va texnika rivoji bilan yangi narsa va tushunchalar paydo bo‘lganda.' },
      { q: 'Lug‘atlarning ikki asosiy turini ayting.', a: 'Ensiklopedik (qomusiy) va filologik (lingvistik).' },
      { q: 'Frazeologik lug‘atda nima beriladi?', a: 'Iboralar va ularning ma’nolari.' },
      { q: '«Kecha» omonimiga misol keltiring.', a: 'Kecha (tun) yulduzlar porladi. Kecha (o‘tgan kun) maktabga bordim.' },
      { q: 'Neologizmni o‘zbekcha muqobil bilan almashtirish nega muhim?', a: 'Tilni boyitadi va uning sofligini saqlaydi.' },
    ],
  },

  /* ===================== 63 ===================== */
  {
    id: 'umr-sport-turlari',
    source: 'VIII bob «Sport va sog‘lik» • 5-dars • 170–172-betlar',
    title: '«Umrni uzaytiradigan 4 ta sport turi». Hisob so‘zlar',
    short: 'Audiomatn tahlili, sonlar imlosi, hisob (o‘lchov) so‘zlar',
    lesson: [
      {
        title: 'Darsga kirish',
        text: 'Qanday sport turlarini bilasiz? Qaysi biri bilan shug‘ullanasiz? «Umrni uzaytiradigan 4 ta sport turi» audiomatni tinglanadi (8.24).',
        note: 'Audiomatn darslikdagi QR kod orqali tinglanadi.',
      },
      {
        title: 'Yangi so‘zlar (8.25)',
        text: 'Krossvorddagi so‘zlar:',
        table: {
          head: ['Izoh', 'So‘z'],
          rows: [
            ['tadqiq ishi, tekshirish', 'tadqiqot'],
            ['muhokama qilinayotgan predmet', 'mavzu'],
            ['ritmik gimnastika', 'aerobika'],
            ['raketka bilan o‘ynaladigan sport o‘yini', 'badminton'],
            ['bezlardan qonga qo‘shiladigan modda', 'gormon'],
            ['og‘riqni kamaytirib, kayfiyat beradigan peptidlar', 'endorfin'],
          ],
        },
      },
      {
        title: 'Audiomatn mazmuni',
        text: 'Daromadi va ijtimoiy holati turlicha odamlar ustida o‘tkazilgan tadqiqot asosida umrni uzaytiradigan sport turlari aniqlangan.',
        list: [
          'Aerobika: raqs, gimnastika, yengil yugurish; yurak, o‘pka, mushaklarni ishlatadi.',
          'Velosiped: pedalni aylantirish endorfin — «baxt gormoni» ishlab chiqaradi.',
          'Suzish: yoshlarga ham, qariyalarga ham to‘g‘ri keladi, jarohat xavfi past.',
          'Raketkali sport turlari: muvozanatni yaxshilaydi.',
        ],
        note: 'Savol: ro‘yxatga yana qaysi sport turini qo‘shgan bo‘lardingiz?',
      },
      {
        title: 'Sonlar imlosi (8.27)',
        text: 'To‘g‘ri yozilgan variantlar:',
        table: {
          head: ['To‘g‘ri', 'Xato'],
          rows: [
            ['4 ta sport turi', '4-ta sport turi'],
            ['1994-yil', '1994 yil, 1994yil'],
            ['30 yosh', '30-yosh, 30yosh'],
            ['80 mingdan ortiq', '80 000 mingdan ortiq'],
            ['41 foiz', '41-foiz, 41foiz'],
          ],
        },
      },
      {
        title: 'Hisob (o‘lchov) so‘zlar',
        text: 'Narsalarni sanashda son va ot o‘rtasida maxsus so‘zlar keladi.',
        rule: 'Hisob so‘zlar sanoq son bilan sanaladigan narsa nomi o‘rtasida qo‘llanadi. Ba’zilari faqat o‘lchov bildiradi: 3 tonna kartoshka, 200 gramm sut, 5 metr atlas. Ayrimlari alohida olinganda narsa nomi, matnda o‘lchov birligi: 2 chelak suv, bir quchoq gul, 1 savat non.',
        examples: ['bir piyola choy', 'besh-olti chelak suv', 'ikki tovoq manti', 'uch-to‘rt tomchi dori', 'bir qultum suv'],
      },
    ],
    pairs: [
      ['aerobika', 'Ritmik gimnastika'],
      ['endorfin', 'Baxt gormoni'],
      ['badminton', 'Raketkali o‘yin'],
      ['tonna', 'Faqat o‘lchov so‘zi'],
      ['chelak', 'Narsa nomi va o‘lchov'],
      ['1994-yil', 'To‘g‘ri yozilgan sana'],
    ],
    quiz: [
      { q: '«Baxt gormoni» deb nimaga aytiladi?', options: ['endorfin', 'vitamin', 'oqsil', 'toksin'], answer: 0 },
      { q: 'To‘g‘ri yozilganini toping.', options: ['4 ta sport turi', '4-ta sport turi', '4ta sport turi', 'to‘rt-ta sport turi'], answer: 0 },
      { q: 'Faqat o‘lchov bildiruvchi hisob so‘z?', options: ['gramm', 'chelak', 'savat', 'quchoq'], answer: 0 },
      { q: '«Bir ... choy» — mos hisob so‘z?', options: ['piyola', 'metr', 'tonna', 'gektar'], answer: 0 },
      { q: 'Ritmik gimnastika qanday ataladi?', options: ['aerobika', 'tennis', 'suzish', 'boks'], answer: 0 },
      { q: '«41 foiz» to‘g‘ri yozilganmi?', options: ['ha', 'yo‘q, 41-foiz', 'yo‘q, 41foiz', 'yo‘q, qirq bir-foiz'], answer: 0 },
    ],
    sort: {
      categories: ['Faqat o‘lchov', 'Narsa nomi ham'],
      items: [
        { text: 'tonna', cat: 0 }, { text: 'chelak', cat: 1 },
        { text: 'gramm', cat: 0 }, { text: 'savat', cat: 1 },
        { text: 'metr', cat: 0 }, { text: 'piyola', cat: 1 },
        { text: 'litr', cat: 0 }, { text: 'tovoq', cat: 1 },
      ],
    },
    qa: [
      { q: 'Nega tadqiqotga turli daromadli odamlar tanlangan?', a: 'Natija xolis va hamma uchun to‘g‘ri bo‘lishi uchun.' },
      { q: 'Umrni uzaytiradigan sport turlarini sanang.', a: 'Aerobika, velosiped, suzish, raketkali sport turlari.' },
      { q: 'Hisob so‘z nima?', a: 'Son va sanaladigan narsa o‘rtasida keladigan o‘lchov so‘zi.' },
      { q: '«1994 yil» to‘g‘ri yozilganmi?', a: 'Yo‘q, «1994-yil» deb yoziladi.' },
      { q: 'Taom retseptida qanday hisob so‘zlar ishlatiladi?', a: 'Gramm, dona, choy qoshiq, piyola, stakan.' },
    ],
  },

  /* ===================== 64 ===================== */
  {
    id: 'infografika-parij',
    source: 'VIII bob «Sport va sog‘lik» • 6-dars • 173–174-betlar',
    title: 'Infografika: «Parij-2024»',
    short: 'Infografikani o‘qish va tahlil qilish, maqola yozish',
    lesson: [
      {
        title: 'Infografika nima?',
        text: 'Infografika — ma’lumotni rasm, belgi, jadval va raqamlar orqali qisqa va ko‘rgazmali beruvchi matn turi.',
        rule: 'Infografika maqolaga qo‘shimcha material bo‘lib, murakkab ma’lumotni bir qarashda tushunarli qiladi.',
      },
      {
        title: 'Infografika mazmuni (8.30)',
        text: '«Medallar jamlanmasi — yuksalish»: «Parij-2024» olimpiadasida O‘zbekiston sportchilari natijalari.',
        list: [
          'Boks: Lazizbek Mullojonov, Asadxo‘ja Mo‘ydinxo‘jayev, Abdumalik Xalokov, Bahodir Jalolov va boshqalar.',
          'Erkin kurash: Razambek Jamalov, G‘ulomjon Abdullayev.',
          'Dzyudo: Diyora Keldiyorova, Muzaffarbek To‘raboyev, Alisher Yusupov.',
          'Taekvondo: Ulug‘bek Rashitov, Svetlana Osipova.',
          'Og‘ir atletika: Akbar Jo‘rayev.',
        ],
        note: 'Medallar jadvali ikki xil berilgan: umumiy hisobda va Osiyo mamlakatlari o‘rtasida. Ikkalasida ham Xitoy birinchi.',
      },
      {
        title: 'To‘g‘ri yoki noto‘g‘ri? (8.31)',
        text: 'Infografika asosida:',
        table: {
          head: ['Ma’lumot', 'Javob'],
          rows: [
            ['Xitoy umumiy hisobda ham, Osiyoda ham birinchi.', 'to‘g‘ri'],
            ['Erkin kurash bo‘yicha yagona medal G‘ulomjon Abdullayevniki.', 'noto‘g‘ri — Razambek Jamalov ham medal olgan'],
            ['O‘zbekistonliklar yetakchilik qilgan sport turi — boks.', 'to‘g‘ri'],
          ],
        },
      },
      {
        title: 'Maqolaga nimalar kiritiladi? (8.34)',
        text: 'Infografika bilan birga maqolada:',
        list: [
          'Olimpiada o‘tkazilgan joy, vaqt, ishtirokchilar va mamlakatlar soni.',
          'Olimpiada o‘yinlarining tarixi.',
          'Boshqa mamlakatlar natijalari tahlili.',
          'O‘zbekistonning o‘tgan va bu galgi natijalarini solishtirish.',
          'Ishtirokchilar taassurotlari.',
        ],
        note: '8.35–8.36: maqolaga sarlavha tanlang va infografika asosida maqola yozing.',
      },
    ],
    pairs: [
      ['Diyora Keldiyorova', 'Dzyudo'],
      ['Ulug‘bek Rashitov', 'Taekvondo'],
      ['Bahodir Jalolov', 'Boks'],
      ['Razambek Jamalov', 'Erkin kurash'],
      ['Akbar Jo‘rayev', 'Og‘ir atletika'],
      ['Svetlana Osipova', 'Taekvondo'],
    ],
    quiz: [
      { q: 'Infografika nima?', options: ['ma’lumotning ko‘rgazmali, rasmli shakli', 'she’r', 'audiomatn', 'ariza'], answer: 0 },
      { q: '«Parij-2024»da o‘zbekistonliklar yetakchilik qilgan sport turi?', options: ['boks', 'suzish', 'futbol', 'tennis'], answer: 0 },
      { q: 'Umumiy hisobda birinchi o‘rin?', options: ['Xitoy', 'Yaponiya', 'Avstraliya', 'O‘zbekiston'], answer: 0 },
      { q: 'Diyora Keldiyorova qaysi sport turida?', options: ['dzyudo', 'boks', 'kurash', 'gimnastika'], answer: 0 },
      { q: 'Akbar Jo‘rayev qaysi sport turida?', options: ['og‘ir atletika', 'boks', 'dzyudo', 'taekvondo'], answer: 0 },
    ],
    sort: {
      categories: ['Boks', 'Kurash / dzyudo', 'Taekvondo'],
      items: [
        { text: 'Bahodir Jalolov', cat: 0 }, { text: 'Razambek Jamalov', cat: 1 }, { text: 'Ulug‘bek Rashitov', cat: 2 },
        { text: 'Lazizbek Mullojonov', cat: 0 }, { text: 'Diyora Keldiyorova', cat: 1 }, { text: 'Svetlana Osipova', cat: 2 },
        { text: 'Abdumalik Xalokov', cat: 0 }, { text: 'Alisher Yusupov', cat: 1 },
      ],
    },
    qa: [
      { q: 'Nega medallar jadvali ikki xil berilgan?', a: 'Umumiy o‘rinni va Osiyo mamlakatlari orasidagi o‘rinni ko‘rsatish uchun.' },
      { q: 'Sovrinlar qanday tartiblangan?', a: 'Avval oltin, keyin kumush, so‘ng bronza medallar soniga qarab.' },
      { q: 'Infografikaning afzalligi nimada?', a: 'Ma’lumot qisqa, ko‘rgazmali va tez tushuniladi.' },
      { q: 'Maqolaga qanday sarlavha qo‘yish mumkin?', a: 'Masalan: «Parijdagi g‘alabalar», «Medallar — yuksalish belgisi».' },
      { q: '«Parij-2024» haqida maqolada yana nimalar bo‘lishi mumkin?', a: 'O‘tkazilish joyi, vaqti, ishtirokchilar soni, taassurotlar, solishtirma tahlil.' },
    ],
  },

  /* ===================== 65 ===================== */
  {
    id: 'reklama-matni',
    source: 'VIII bob «Sport va sog‘lik» • 7-dars • 174–177-betlar',
    title: 'Reklama matni',
    short: 'Reklama formatlari, yozish qoidalari va baholash',
    lesson: [
      {
        title: 'Uchta reklama namunasi (8.37)',
        text: 'Suzish maktabi reklamalari:',
        list: [
          '«Harakatda hayot bor! Sog‘lom hayot sari birinchi qadamingizni qo‘ying!» — ijtimoiy tarmoq uchun (rasm va belgilar).',
          '«To‘g‘ri tanlov — sog‘lom hayot!» — banner uchun (qisqa, 5–10 so‘z).',
          '«Bizning suzish maktabimizda: zamonaviy havzalar, professional murabbiylar... Narxlar: kattalar 30 ming, bolalar 20 ming so‘m» — broshyura yoki flayer uchun.',
        ],
      },
      {
        title: 'Formatlar (8.39–8.40)',
        text: 'Reklama formati talablari:',
        table: {
          head: ['Format', 'Talab'],
          rows: [
            ['Ijtimoiy tarmoq', 'rasm va belgilar; axborot berish mazmuni'],
            ['Banner', 'qisqa, diqqatni tortuvchi, 5–10 so‘z'],
            ['Broshyura, flayer', 'tafsilotlar ko‘p: xizmat, narx, manzil, imkoniyatlar'],
          ],
        },
      },
      {
        title: 'Reklama matnining vazifasi',
        text: 'Reklama xabardor qiladi, qiziqtiradi va harakatga undaydi.',
        rule: 'Reklama matnining asosiy vazifasi — tinglovchi yoki o‘quvchini mahsulot, xizmat yoki g‘oya haqida xabardor qilish, qiziqtirish va ma’lum bir harakatga undash.',
      },
      {
        title: 'Reklama yozish qoidalari',
        text: 'E’tibor beriladigan jihatlar:',
        list: [
          '1. Auditoriya: kimga murojaat qilinmoqda? Til va uslub shu auditoriyaga mos bo‘lsin.',
          '2. Foyda: «Tezkor internet!» emas, «Sevimli kinongizni qotib qolmasdan tomosha qiling!»',
          '3. Aniqlik: «arzon narx» emas, «Atigi 50 ming so‘mga xarid qiling!»',
          '4. Chaqiriq: buyruq fe’llar — xarid qiling, qo‘ng‘iroq qiling, ro‘yxatdan o‘ting.',
          '5. Sarlavha va ilk jumla qiziqarli, muammoga yechim taklif qiladigan bo‘lsin.',
        ],
        note: 'Oltin qoida: mahsulot keng tarqalishi uchun u haqiqatda yaxshi bo‘lishi kerak.',
      },
      {
        title: 'Baholash (8.44)',
        text: 'Mezonlar (jami 15 ball):',
        table: {
          head: ['Mezon', 'Ball'],
          rows: [
            ['format talablariga mosligi', '3'],
            ['diqqatni jalb qiluvchi jumlalar', '3'],
            ['rasm, belgi, rang, dizayn', '3'],
            ['auditoriyaga mosligi', '3'],
            ['imloviy, ishoraviy, uslubiy xato yo‘qligi', '3'],
          ],
        },
        note: '8.45: «Kasalni yashirsang, isitmasi oshkor qiladi», — deydi xalqimiz. Maqollar bilan ko‘chirma gap tuzing.',
      },
    ],
    pairs: [
      ['banner', 'Qisqa, 5–10 so‘z'],
      ['flayer', 'Tafsilotlar ko‘p'],
      ['ijtimoiy tarmoq', 'Rasm va belgilar'],
      ['chaqiriq', 'Ro‘yxatdan o‘ting!'],
      ['auditoriya', 'Reklama kimga mo‘ljallangan'],
      ['aniq fakt', 'Atigi 50 ming so‘m'],
    ],
    quiz: [
      { q: 'Reklamaning asosiy vazifasi?', options: ['xabardor qilish va harakatga undash', 'kuldirish', 'tarixni bayon qilish', 'she’r o‘qish'], answer: 0 },
      { q: 'Banner reklamasi qanday bo‘ladi?', options: ['qisqa, 5–10 so‘z', 'juda uzun', 'faqat narxlar', 'rasmsiz'], answer: 0 },
      { q: 'Qaysi jumla reklama uchun yaxshiroq?', options: ['Atigi 50 ming so‘mga xarid qiling!', 'Narxi arzon.', 'Mahsulot bor.', 'Yaxshi narsa.'], answer: 0 },
      { q: 'Reklamada qaysi fe’llar chaqiriq bildiradi?', options: ['buyruq fe’llari', 'o‘tgan zamon fe’llari', 'majhul fe’llar', 'sifatdoshlar'], answer: 0 },
      { q: 'Narx va manzil batafsil yoziladigan format?', options: ['broshyura yoki flayer', 'banner', 'radio', 'sms'], answer: 0 },
    ],
    sort: {
      categories: ['Yaxshi reklama jumlasi', 'Zaif jumla'],
      items: [
        { text: 'Hoziroq ro‘yxatdan o‘ting!', cat: 0 }, { text: 'Bizda suzish bor.', cat: 1 },
        { text: 'Atigi 20 ming so‘m!', cat: 0 }, { text: 'Narxlar arzon.', cat: 1 },
        { text: 'Sog‘lom tana — baxtli hayot kaliti!', cat: 0 }, { text: 'Kelsangiz bo‘ladi.', cat: 1 },
      ],
    },
    qa: [
      { q: 'Reklama yozishda nimalarga e’tibor beriladi?', a: 'Auditoriya, foyda, aniq faktlar, chaqiriq, qiziqarli sarlavha.' },
      { q: 'Uchala reklamaning umumiy xususiyati?', a: 'Sog‘lom hayot va suzishni targ‘ib qiladi, harakatga chorlaydi.' },
      { q: 'Nega «Tezkor internet!» o‘rniga foydani aytish kerak?', a: 'Odamlar mahsulotning o‘ziga emas, foydasiga qiziqadi.' },
      { q: 'Reklama ta’sirini nima kuchaytiradi?', a: 'Rasm, rang, musiqa, videorolik.' },
      { q: '«Kasalni yashirsang, isitmasi oshkor qiladi» maqolini izohlang.', a: 'Muammoni yashirib bo‘lmaydi, u baribir ko‘rinadi.' },
    ],
  },

  /* ===================== 66 ===================== */
  {
    id: 'chorak-takror-4',
    source: 'Chorak bo‘yicha mustahkamlash • 178-bet',
    title: 'Chorak bo‘yicha mustahkamlash',
    short: 'Omonim va sinonim iboralar, o‘zlashtirma gap, hisob so‘zlar',
    lesson: [
      {
        title: 'Omonim iboralar (1-topshiriq)',
        text: 'Bir xil shakldagi iboralar turli ma’noda keladi:',
        table: {
          head: ['Ibora', 'Ma’nolari'],
          rows: [
            ['damini kesmoq', 'jim qildirmoq / ovqat damini kesmoq'],
            ['ko‘ngli bo‘shamoq', 'rahmi kelmoq / ta’sirlanib yig‘lamoq'],
            ['ko‘zi ochiq', 'savodli / ziyrak, hushyor'],
            ['o‘tib ketmoq', 'vafot etmoq / oshib ketmoq'],
          ],
        },
      },
      {
        title: 'Sinonim iboralar (2-topshiriq)',
        text: 'Guruhlarga ajratamiz:',
        table: {
          head: ['Ma’nosi', 'Iboralar'],
          rows: [
            ['qo‘rqmoq', 'yuragi orqasiga tortmoq, kapalagi uchmoq, yuragi tovoniga tushib ketmoq'],
            ['tajribali', 'pixini yorgan, burganing ko‘zini ko‘rgan, ilonning yog‘ini yalagan'],
            ['qochmoq', 'tuyog‘ini shiqillatmoq, juftakni rostlamoq'],
            ['hayron qolmoq', 'og‘zi ochilib qolmoq, hang-mang bo‘lmoq'],
            ['quruq qo‘l bilan', 'ikki qo‘lini burniga tiqmoq'],
            ['xafa bo‘lmoq', 'dimog‘iga qurt tushmoq, dili xufton bo‘lmoq'],
          ],
        },
      },
      {
        title: 'O‘zlashtirma gapga aylantirish (3-topshiriq)',
        text: 'Til haqidagi hikmatlar:',
        list: [
          '«Milliy tilni yo‘qotmoq — millatning ruhini yo‘qotmoqdir», — deydi Avloniy. → Avloniy milliy tilni yo‘qotish millat ruhini yo‘qotish ekanini aytadi.',
          'Beruniy: «Til — so‘zlovchi istagini tinglovchiga yetkazuvchi tarjimondir». → Beruniy til so‘zlovchi istagini yetkazuvchi tarjimon ekanini aytgan.',
          'Rumiy tilingdan oldin qalbingni tarbiya qilish kerakligini aytadi.',
        ],
      },
      {
        title: 'Hisob so‘zlar (6-topshiriq)',
        text: 'Gaplarni to‘ldiramiz:',
        list: [
          'Bir lahza o‘zimni yo‘qotib qo‘ydim.',
          'Bu doridan kuniga uch-to‘rt tomchi tomizing.',
          'Tezda ko‘zlarini artib, bir qultum suv ichib oldi.',
          'O‘rningga besh-olti chelak suv tashib beraman.',
          'Mehmonlar ikki tovoq mantini ko‘rdim deyishmadi.',
        ],
        note: '5-topshiriq: «Olmoshlar zanjiri» o‘yini — navbatma-navbat olmosh ayting, to‘xtagan o‘yindan chiqadi.',
      },
    ],
    pairs: [
      ['kapalagi uchmoq', 'qo‘rqmoq'],
      ['pixini yorgan', 'tajribali'],
      ['juftakni rostlamoq', 'qochmoq'],
      ['hang-mang bo‘lmoq', 'hayron qolmoq'],
      ['dili xufton', 'xafa'],
      ['bir qultum', 'suv'],
    ],
    quiz: [
      { q: '«Ilonning yog‘ini yalagan» iborasining ma’nosi?', options: ['tajribali, ayyor', 'qo‘rqoq', 'kasal', 'och'], answer: 0 },
      { q: '«Tuyog‘ini shiqillatmoq» —', options: ['qochmoq', 'kulmoq', 'yugurmoq tez', 'yig‘lamoq'], answer: 0 },
      { q: '«Yuragi orqasiga tortmoq» qaysi ibora bilan sinonim?', options: ['kapalagi uchmoq', 'og‘zi ochilib qolmoq', 'pixini yorgan', 'dimog‘i baland'], answer: 0 },
      { q: '«Uch-to‘rt ... dori tomizing» — mos hisob so‘z?', options: ['tomchi', 'chelak', 'tovoq', 'metr'], answer: 0 },
      { q: '«Til — tarjimondir» degan kim?', options: ['Beruniy', 'Avloniy', 'Rumiy', 'Navoiy'], answer: 0 },
    ],
    sort: {
      categories: ['Qo‘rqmoq', 'Tajribali', 'Qochmoq'],
      items: [
        { text: 'kapalagi uchmoq', cat: 0 }, { text: 'pixini yorgan', cat: 1 }, { text: 'juftakni rostlamoq', cat: 2 },
        { text: 'yuragi tovoniga tushmoq', cat: 0 }, { text: 'burganing ko‘zini ko‘rgan', cat: 1 }, { text: 'tuyog‘ini shiqillatmoq', cat: 2 },
        { text: 'yuragi orqasiga tortmoq', cat: 0 }, { text: 'ilonning yog‘ini yalagan', cat: 1 },
      ],
    },
    qa: [
      { q: 'Omonim ibora nima?', a: 'Shakli bir xil, ma’nosi har xil iboralar.' },
      { q: '«Ko‘zi ochiq» iborasining ikki ma’nosini ayting.', a: 'Savodli; ziyrak, hushyor.' },
      { q: '«Hayron qolmoq» ma’nosidagi iboralarni ayting.', a: 'Og‘zi ochilib qolmoq, hang-mang bo‘lmoq.' },
      { q: 'Avloniy so‘zini o‘zlashtirma gapga aylantiring.', a: 'Avloniy milliy tilni yo‘qotish millat ruhini yo‘qotish ekanini aytadi.' },
      { q: 'Beshta olmosh ayting.', a: 'Men, biz, bu, kim, hech kim.' },
    ],
  },

  /* ===================== 67 ===================== */
  {
    id: 'yaxshilik-vaqtida',
    source: 'IX bob «Inson va jamiyat» • 1-dars • 180–182-betlar',
    title: '«Yaxshilikni o‘z vaqtida qil»',
    short: 'Kavsar Turdiyeva hikoyasi: oromgohdagi musobaqa',
    lesson: [
      {
        title: 'Darsga kirish',
        text: 'Yangi bob — «Inson va jamiyat». Yaxshilik deganda nimani tushunasiz?',
        note: 'Hikoya muallifi — Kavsar Turdiyeva.',
      },
      {
        title: 'Hikoya mazmuni (1-qism)',
        text: 'Oromgohning o‘zgacha tomoni: bolalar ota-onasi bergan pulga narsa ola olmas, pulni musobaqalarda g‘olib bo‘lib ishlab topishi kerak edi.',
        list: [
          'Akbar jamoasi: Ahror — eng tez yuguruvchi, Shamshod — balandlikka, Botir — uzunlikka sakrovchi, Akbar — velosipedchi.',
          'Jamoa yutsa, pul har bir a’zoga taqsimlanardi.',
          'Ahror yugurishda birinchi keldi, Shamshod va Botir ham yaxshi natija ko‘rsatdi.',
          'Eng oxirgi musobaqa — velosiped poygasi.',
        ],
      },
      {
        title: 'Hikoya mazmuni (2–3-qism)',
        text: 'Velosiped poygasida Akbar ancha oldinda edi.',
        list: [
          'Yo‘ldan tipratikan chiqdi, Akbar uni chetlab o‘tdi.',
          'Orqada Odilning velosipedi ag‘darildi. Akbar onasining gapini esladi: «Yaxshilikni kechiktirmay, vaqtida qilish kerak».',
          'Akbar Odilga yordam berdi, Baxtiyor o‘zib ketib birinchi keldi.',
          'Hay’at qoidani o‘zgartirib, 1-o‘rinni Akbarning jamoasiga berdi: «Akbar g‘alabasidan o‘rtog‘ining sog‘lig‘ini ustun qo‘ydi!»',
        ],
        rule: 'G‘oya: g‘alabadan ham insoniylik ustun; yaxshilikni kechiktirmay, o‘z vaqtida qilish kerak.',
      },
      {
        title: 'Yangi so‘zlar (9.1)',
        text: 'So‘zlar izohi:',
        table: {
          head: ['So‘z', 'Izohi'],
          rows: [
            ['o‘zgacha', 'boshqacha, alohida'],
            ['qizg‘in', 'jo‘shqin, faol'],
            ['raqib', 'bellashuvdagi qarshi tomon'],
            ['hay’at', 'qaror chiqaruvchi guruh, komissiya'],
            ['nashida', 'zavq, huzur'],
          ],
        },
      },
      {
        title: 'To‘g‘ri yoki noto‘g‘ri? (9.2)',
        text: 'Matn asosida:',
        table: {
          head: ['Jumla', 'Javob'],
          rows: [
            ['Bolalar faqat musobaqada topgan pulni ishlata olardi.', 'to‘g‘ri'],
            ['Jamoa a’zolari o‘rtasida pul turlicha taqsimlanardi.', 'noto‘g‘ri — har biriga taqsimlanardi'],
            ['Velosiped poygasi oxirgi musobaqa edi.', 'to‘g‘ri'],
            ['Shamshod uzunlikka sakrashda yaxshi natija ko‘rsatdi.', 'noto‘g‘ri — balandlikka'],
            ['Poyga 3 ta aylanishdan iborat edi.', 'to‘g‘ri'],
            ['Baxtiyorning jamoasi g‘olib bo‘ldi.', 'noto‘g‘ri'],
          ],
        },
        note: '9.6: qahramonlardan biriga (Akbar, Shamshod, Ahror, Odil, Botir, Baxtiyor) tavsif yozing.',
      },
    ],
    pairs: [
      ['Akbar', 'Velosipedchi, o‘rtog‘iga yordam berdi'],
      ['Ahror', 'Eng tez yuguruvchi'],
      ['Shamshod', 'Balandlikka sakrovchi'],
      ['Botir', 'Uzunlikka sakrovchi'],
      ['Odil', 'Velosipedi ag‘darildi'],
      ['hay’at', 'Qaror chiqaruvchi guruh'],
    ],
    quiz: [
      { q: 'Hikoya muallifi?', options: ['Kavsar Turdiyeva', 'Qo‘chqor Norqobil', 'Komil Jontoyev', 'Umida Sadatova'], answer: 0 },
      { q: 'Oromgohning o‘zgacha tomoni?', options: ['bolalar pulni o‘zlari ishlab topardi', 'havosi toza', 'faqat sport bor edi', 'ota-ona pulini ishlatardi'], answer: 0 },
      { q: 'Akbar nima uchun to‘xtadi?', options: ['Odilga yordam berish uchun', 'charchagani uchun', 'velosipedi buzildi', 'tipratikan uchun'], answer: 0 },
      { q: 'Poygada birinchi kim keldi?', options: ['Baxtiyor', 'Akbar', 'Odil', 'Ahror'], answer: 0 },
      { q: '1-o‘rin qaysi jamoaga berildi?', options: ['Akbarning jamoasiga', 'Baxtiyorning', 'Odilning', 'hech kimga'], answer: 0 },
      { q: '«Nashida» so‘zining ma’nosi?', options: ['zavq, huzur', 'g‘azab', 'qayg‘u', 'charchoq'], answer: 0 },
    ],
    sort: {
      categories: ['To‘g‘ri', 'Noto‘g‘ri'],
      items: [
        { text: 'Poyga 3 aylanishdan iborat edi', cat: 0 }, { text: 'Baxtiyorning jamoasi g‘olib', cat: 1 },
        { text: 'Velosiped poygasi oxirgisi edi', cat: 0 }, { text: 'Shamshod uzunlikka sakradi', cat: 1 },
        { text: 'Ahror yugurishda birinchi', cat: 0 }, { text: 'G‘oliblar tezda e’lon qilindi', cat: 1 },
      ],
    },
    qa: [
      { q: 'Nega hikoya «Yaxshilikni o‘z vaqtida qil» deb nomlangan?', a: 'Akbar onasining shu nasihatiga amal qilib, o‘rtog‘iga darhol yordam bergan.' },
      { q: 'Nega 1-o‘rin Baxtiyorning jamoasiga berilmadi?', a: 'Hay’at insoniylikni g‘alabadan ustun qo‘ydi, Baxtiyor yiqilgan raqibiga e’tibor bermagan edi.' },
      { q: 'Akbar to‘g‘ri qildimi? Siz qanday yo‘l tutardingiz?', a: 'Erkin javob.' },
      { q: 'Hikoyada qanday insoniy fazilatlar tasvirlangan?', a: 'Mehribonlik, do‘stlik, adolat, fidoyilik.' },
      { q: '«G‘alaba nashidasi yoqimliroq tuyulardi» jumlasini izohlang.', a: 'Bolalar uchun puldan ham g‘alaba zavqi muhimroq edi.' },
    ],
  },

  /* ===================== 68 ===================== */
  {
    id: 'bosh-harf-imlosi',
    source: 'IX bob «Inson va jamiyat» • 2-dars • 183–186-betlar',
    title: 'Bosh harflar imlosi. Piktogrammalar',
    short: 'Atoqli otlar imlosi, taqiq belgilari, o‘zlashtirma gapdagi o‘zgarishlar',
    lesson: [
      {
        title: 'Bosh harf bilan yoziladiganlar (9.7–9.8)',
        text: 'Savollarga javoblar (manzil, mahalla, ism, OTM, gazeta, nashriyot, daryo, bayram, unvon, tashkilot) — barchasi atoqli otlar.',
        rule: 'Kishi ismlari, joy nomlari, tashkilot, korxona, nashriyot, gazeta-jurnal, bayram, orden-medal va unvon nomlari bosh harf bilan yoziladi. Ko‘p so‘zli nomlarda odatda birinchi so‘z bosh harf bilan yoziladi; tarkibidagi atoqli ot o‘z holicha qoladi.',
      },
      {
        title: 'Imlo qoidasi asosida yozish (9.9)',
        text: 'To‘g‘ri yozilishi:',
        table: {
          head: ['Xato', 'To‘g‘ri'],
          rows: [
            ['toshkent davlat sharqshunoslik universiteti', 'Toshkent davlat sharqshunoslik universiteti'],
            ['muqimiy nomidagi musiqali drama teatri', 'Muqimiy nomidagi musiqali drama teatri'],
            ['oltin yulduz medali', '«Oltin yulduz» medali'],
            ['navro‘z bayrami', 'Navro‘z bayrami'],
            ['bektemir tumani', 'Bektemir tumani'],
            ['sharq darmoni firmasi', '«Sharq darmoni» firmasi'],
          ],
        },
      },
      {
        title: 'Imlo qoidalarini guruhlash (9.10)',
        text: 'Qaysi qoidaga misol?',
        table: {
          head: ['Qoida', 'Misollar'],
          rows: [
            ['Qo‘shib yozish', 'To‘rtko‘l, millatlararo, sakkizoyoq, sherdil, masxaraboz, o‘shancha'],
            ['Ajratib yozish', 'bu yerda, har vaqt, bir zum'],
            ['Bosh harflar', 'Mustaqillik bayrami, Xotira va qadrlash kuni, Markaziy Osiyo, «Saodat» jurnali'],
            ['Asos va qo‘shimcha', 'obro‘yim, qishlog‘im, huquqi'],
            ['Chiziqcha bilan', 'kecha-yu kunduz, erta-yu kech, to‘ppa-to‘g‘ri, biz-a'],
          ],
        },
      },
      {
        title: 'Taqiq piktogrammalari (9.12–9.13)',
        text: 'Piktogramma — so‘zsiz tushuniladigan belgi.',
        table: {
          head: ['Belgi', 'Qayerda?'],
          rows: [
            ['Cho‘milish mumkin emas!', 'xavfli suv havzalari, suv omborlari'],
            ['Ovqatlanmang yoki ichmang!', 'kutubxona, kompyuter xonasi, muzey'],
            ['Chiqindi tashlamang!', 'park, ko‘cha, jamoat joylari'],
            ['Elektron qurilmalardan foydalanmang!', 'shifoxona, laboratoriya, parvoz payti'],
            ['Gugurt chaqmang!', 'yonilg‘i ombori, kimyo laboratoriyasi, metro'],
            ['Chaqnoq bilan suratga olmang!', 'muzey, ko‘rgazma, konsert'],
          ],
        },
      },
      {
        title: 'O‘zlashtirma gapdagi o‘zgarishlar (9.14)',
        text: 'Bobom: «Bu yerda cho‘milish mumkin emasligini bildiruvchi belgi o‘rnatilgan, Azamat», — dedi. → Bobom Azamatga bu yerda cho‘milish mumkin emasligini bildiruvchi belgi o‘rnatilganini aytdi.',
        list: [
          'Muallif gapining egasi o‘zlashtirma gapning egasi bo‘ladi (bobom).',
          'Muallif gapining kesimi o‘zgaradi (dedi → aytdi).',
          'Ko‘chirma gapning kesimi -ganini shaklini oladi.',
          'Undalma to‘ldiruvchiga aylanadi (Azamat → Azamatga).',
        ],
      },
    ],
    pairs: [
      ['Navro‘z bayrami', 'Bosh harf bilan'],
      ['kecha-yu kunduz', 'Chiziqcha bilan'],
      ['sakkizoyoq', 'Qo‘shib yoziladi'],
      ['bir zum', 'Ajratib yoziladi'],
      ['qishlog‘im', 'Asos va qo‘shimcha'],
      ['piktogramma', 'So‘zsiz belgi'],
    ],
    quiz: [
      { q: 'To‘g‘ri yozilganini toping.', options: ['Navro‘z bayrami', 'navro‘z bayrami', 'Navro‘z Bayrami', 'NAVRO‘Z bayrami'], answer: 0 },
      { q: '«Kecha-yu kunduz» qaysi imlo qoidasiga misol?', options: ['chiziqcha bilan yozish', 'qo‘shib yozish', 'ajratib yozish', 'bosh harf'], answer: 0 },
      { q: '«Gugurt chaqmang!» belgisi qayerda bo‘ladi?', options: ['yonilg‘i omborida', 'kutubxonada', 'sport zalida', 'sinfda'], answer: 0 },
      { q: 'O‘zlashtirma gapda undalma nimaga aylanadi?', options: ['to‘ldiruvchiga', 'egaga', 'kesimga', 'yo‘qoladi'], answer: 0 },
      { q: 'Qo‘shib yoziladigan so‘z?', options: ['masxaraboz', 'bir zum', 'har vaqt', 'bu yerda'], answer: 0 },
    ],
    sort: {
      categories: ['Qo‘shib yoziladi', 'Ajratib yoziladi', 'Chiziqcha bilan'],
      items: [
        { text: 'sherdil', cat: 0 }, { text: 'bir zum', cat: 1 }, { text: 'erta-yu kech', cat: 2 },
        { text: 'millatlararo', cat: 0 }, { text: 'har vaqt', cat: 1 }, { text: 'to‘ppa-to‘g‘ri', cat: 2 },
        { text: 'To‘rtko‘l', cat: 0 }, { text: 'bu yerda', cat: 1 }, { text: 'kecha-yu kunduz', cat: 2 },
      ],
    },
    qa: [
      { q: 'Qanday nomlar bosh harf bilan yoziladi?', a: 'Ism, joy, tashkilot, gazeta, bayram, orden va unvon nomlari.' },
      { q: '«oltin yulduz medali»ni to‘g‘ri yozing.', a: '«Oltin yulduz» medali.' },
      { q: 'Piktogramma nima uchun ishlatiladi?', a: 'Xavfsizlik, tartib va qonun talablarini so‘zsiz tushuntirish uchun.' },
      { q: 'Muzeyda qanday taqiq belgilari bo‘ladi?', a: 'Ovqatlanmang, chaqnoq bilan suratga olmang.' },
      { q: 'O‘zlashtirma gapda muallif gapining kesimi qanday o‘zgaradi?', a: '«Dedi» o‘rniga «aytdi» keladi.' },
    ],
  },

  /* ===================== 69 ===================== */
  {
    id: 'komakchilar',
    source: 'IX bob «Inson va jamiyat» • 3-dars • 186–187-betlar',
    title: 'Yordamchi so‘zlar. Ko‘makchilar',
    short: 'Ko‘makchi, bog‘lovchi, yuklama; ko‘makchi va mustaqil so‘z farqi',
    lesson: [
      {
        title: 'Jamiyat tushunchalari (9.16)',
        text: 'Krossvorddagi so‘zlar:',
        table: {
          head: ['Izoh', 'So‘z'],
          rows: [
            ['bilim tarqatish va tarbiya quroli; badiiy, ilmiy asar', 'adabiyot'],
            ['qon-qarindoshlik asosidagi ijtimoiy guruh', 'oila'],
            ['kishilarning tarixan qaror topgan hamkorlik majmuyi', 'jamiyat'],
            ['o‘zini o‘zi boshqaradigan hududiy bo‘lak', 'mahalla'],
            ['yagona til, hudud, madaniyatga ega barqaror birlik', 'millat'],
          ],
        },
      },
      {
        title: 'Yordamchi so‘zlar (9.18)',
        text: 'Gapdagi yordamchilar: «...erishish, ya’ni umuminsoniy va milliy qadriyatlar asosidagi ta’lim-tarbiya orqali farzandlarimiz ongida sog‘lom hayot tarzini ham shakllantirish lozim».',
        table: {
          head: ['Ko‘makchi', 'Bog‘lovchi', 'Yuklama'],
          rows: [['orqali', 'ya’ni, va', 'ham']],
        },
        rule: 'Yordamchi so‘zlar mustaqil ma’noga ega emas: ko‘makchi so‘zlarni tobelantirib bog‘laydi, bog‘lovchi bo‘lak va gaplarni bog‘laydi, yuklama qo‘shimcha ma’no yuklaydi.',
      },
      {
        title: 'Ko‘makchi yoki mustaqil so‘z? (9.19)',
        text: 'Bir so‘z ikki vazifada kelishi mumkin:',
        table: {
          head: ['Ko‘makchi', 'Mustaqil so‘z'],
          rows: [
            ['Gap kitob ustida borardi.', 'Kitoblar stol ustida turibdi.'],
            ['Oylikka qarab yashashadi.', 'U menga qarab xo‘rsindi.'],
            ['Maktab tomon ketdi.', 'Kvadratning tomonlari teng.'],
            ['To‘ydan ilgari borishdi.', 'Ilgari qumg‘onda choy damlashgan.'],
            ['U xalq orasida edi.', 'Xat kitob orasida edi.'],
          ],
        },
      },
      {
        title: 'Ko‘makchilar kelishiklarga ko‘ra (9.20)',
        text: 'Qaysi kelishikdagi so‘zdan keyin keladi:',
        table: {
          head: ['Kelishik', 'Ko‘makchilar'],
          rows: [
            ['Bosh / qaratqich', 'bilan, uchun, kabi, singari, yanglig‘, orqali, sayin, bo‘ylab, bo‘yicha, uzra, ichra'],
            ['Qaratqich (-ning)', 'oldida, ustida, ostida'],
            ['Jo‘nalish (-ga)', 'yarasha, sari, qaramay, doir, binoan, muvofiq, qarata'],
            ['Chiqish (-dan)', 'keyin, so‘ng, tashqari, boshqa, o‘zga, ilgari, burun, oshib'],
          ],
        },
        note: '9.21: «Kechagi kunim» mavzusida tomon, qadar, orasida, kabi, uchun, qaramay, buyon, bilan, keyin ko‘makchilari bilan matn yozing.',
      },
    ],
    pairs: [
      ['orqali', 'Ko‘makchi'],
      ['ya’ni', 'Bog‘lovchi'],
      ['ham', 'Yuklama'],
      ['qaramay', 'Jo‘nalish kelishigi bilan'],
      ['keyin', 'Chiqish kelishigi bilan'],
      ['mahalla', 'Hududiy o‘zini o‘zi boshqarish'],
    ],
    quiz: [
      { q: 'Ko‘makchi qaysi turkumga kiradi?', options: ['yordamchi so‘z', 'mustaqil so‘z', 'undov', 'modal'], answer: 0 },
      { q: '«Maktab tomon ketdi» gapida «tomon» —', options: ['ko‘makchi', 'ot', 'sifat', 'ravish'], answer: 0 },
      { q: '«Qaramay» qaysi kelishikdagi so‘zdan keyin keladi?', options: ['jo‘nalish', 'chiqish', 'bosh', 'tushum'], answer: 0 },
      { q: '«Keyin» ko‘makchisi qaysi kelishik bilan?', options: ['chiqish', 'jo‘nalish', 'o‘rin-payt', 'tushum'], answer: 0 },
      { q: 'Qon-qarindoshlik asosidagi ijtimoiy guruh?', options: ['oila', 'millat', 'jamiyat', 'mahalla'], answer: 0 },
      { q: '«Ham» qaysi yordamchi so‘z?', options: ['yuklama', 'ko‘makchi', 'bog‘lovchi', 'undov'], answer: 0 },
    ],
    sort: {
      categories: ['Ko‘makchi', 'Bog‘lovchi', 'Yuklama'],
      items: [
        { text: 'orqali', cat: 0 }, { text: 'va', cat: 1 }, { text: 'faqat', cat: 2 },
        { text: 'uchun', cat: 0 }, { text: 'ammo', cat: 1 }, { text: 'hatto', cat: 2 },
        { text: 'bilan (birga)', cat: 0 }, { text: 'chunki', cat: 1 }, { text: '-mi', cat: 2 },
      ],
    },
    qa: [
      { q: 'Yordamchi so‘zlarning uch turini ayting.', a: 'Ko‘makchi, bog‘lovchi, yuklama.' },
      { q: 'Ko‘makchi qanday vazifa bajaradi?', a: 'Ikki mustaqil so‘zni tobelantirib bog‘laydi.' },
      { q: '«Ustida» so‘zi qachon ko‘makchi bo‘ladi?', a: '«Haqida» ma’nosida: gap kitob ustida borardi.' },
      { q: 'Jo‘nalish kelishigidan keyin keladigan 3 ta ko‘makchi.', a: 'Qaramay, binoan, doir.' },
      { q: 'Millat nima?', a: 'Yagona til, hudud, madaniyat va ruhiyatga ega tarixiy barqaror birlik.' },
    ],
  },

  /* ===================== 70 ===================== */
  {
    id: 'mutolaa-platforma',
    source: 'IX bob «Inson va jamiyat» • 4-dars • 187–190-betlar',
    title: '«Millionlarga yo‘ldosh platforma»',
    short: '«Mutolaa» loyihasi haqidagi maqola, matnni imloviy tekshirish',
    lesson: [
      {
        title: 'Darsga kirish',
        text: 'Elektron kitoblarni qaysi dastur va ilovalardan izlaysiz?',
        note: 'Maqola muallifi — Sa’dulla Quronov. Matn qisqartirib olingan.',
      },
      {
        title: '«Ildiz» to‘plami',
        text: '«Mutolaa» loyihasining muhim yo‘nalishi — bolalar adabiyoti.',
        list: [
          'Prezidentning «Ulug‘ ajdodlarimizning bolaligi aks etgan sodda tildagi kitoblar yo‘q» degan fikridan ilhomlanib yaratildi.',
          'Navoiy, Bobur, Ulug‘bek, Ibn Sino, Beruniy kabi ajdodlar qadriyatlarimiz ildizi — shuning uchun «Ildiz».',
          'To‘plamda 10 ta rasmli kitob; elektron va animatsion multfilm shaklida.',
          'Sun’iy idrok yordamida kitob suratlari asosida multfilmlar yaratilgan.',
        ],
      },
      {
        title: 'Loyiha yutuqlari',
        text: 'Maqoladagi faktlar:',
        list: [
          'Yangi janr — kitobkino: kitob asosida hujjatli film («Qo‘rqma», «Unsin», «Kichkina shahzoda», «Chol va dengiz»).',
          '740 ta asar sifatli ovozlashtirildi; 30 dan ortiq dublyaj aktyori ishtirok etdi.',
          'Ilovadagi do‘kon noshir va mualliflarga daromad imkonini beradi; o‘nga yaqin nashriyot bilan shartnoma tuzilgan.',
          'Ovozni klonlashtirib, o‘zbekcha matnni o‘qiydigan dastur ustida ishlanmoqda.',
          'Har oyda «She’riyat kechasi» o‘tkaziladi.',
        ],
        rule: 'Muallif xulosasi: «Yoshlar kitob o‘qimay qo‘ydi» degan qarash noto‘g‘ri — buni ilovadagi raqamlar isbotlaydi. «Mutolaa» — kitobxonlikni ommalashtiruvchi platforma.',
      },
      {
        title: 'Yangi so‘zlar (9.22)',
        text: 'Matndagi so‘zlar:',
        table: {
          head: ['So‘z', 'Izohi'],
          rows: [
            ['renessans', 'uyg‘onish davri'],
            ['platforma', 'onlayn xizmatlar maydoni'],
            ['sun’iy idrok', 'kompyuterning inson kabi fikrlash qobiliyati'],
            ['noshirlik', 'kitob nashr etish faoliyati'],
            ['audiokitob', 'ovozlashtirilgan kitob'],
            ['illyustrator', 'kitobga rasm chizuvchi rassom'],
          ],
        },
      },
      {
        title: 'Imloviy tekshirish (9.26)',
        text: 'Matndagi xatolarni tuzatamiz (tilmoch.ai, savodxon.uz kabi saytlardan ham foydalanish mumkin):',
        table: {
          head: ['Xato', 'To‘g‘ri'],
          rows: [
            ['Xar bohor', 'Har bahor'],
            ['sumalag', 'sumalak'],
            ['Marxamat', 'Marhamat'],
            ['Xamani chogirib', 'Hammani chorlab'],
            ['honadon, hovich', 'xonadon, hovuch'],
            ['tabasum, hushbo‘y xidi', 'tabassum, xushbo‘y hidi'],
            ['mehir, muxabbat', 'mehr, muhabbat'],
          ],
        },
      },
    ],
    pairs: [
      ['Ildiz', 'Ajdodlar bolaligi haqida to‘plam'],
      ['kitobkino', 'Kitob asosida hujjatli film'],
      ['renessans', 'Uyg‘onish davri'],
      ['noshirlik', 'Kitob nashr etish'],
      ['audiokitob', 'Ovozlashtirilgan kitob'],
      ['Sa’dulla Quronov', 'Maqola muallifi'],
    ],
    quiz: [
      { q: 'Ajdodlar bolaligi haqidagi to‘plam nomi?', options: ['«Ildiz»', '«Mutolaa»', '«Unsin»', '«Qo‘rqma»'], answer: 0 },
      { q: '«Kitobkino» nima?', options: ['kitob asosida hujjatli film', 'kinoteatr', 'audiokitob', 'multfilm'], answer: 0 },
      { q: 'Nechta asar ovozlashtirildi?', options: ['740', '74', '7400', '40'], answer: 0 },
      { q: '«Renessans» so‘zining ma’nosi?', options: ['uyg‘onish davri', 'kitob', 'platforma', 'loyiha'], answer: 0 },
      { q: 'To‘g‘ri yozilganini toping.', options: ['xushbo‘y', 'hushbo‘y', 'xushbuy', 'hushbuy'], answer: 0 },
      { q: 'Nashriyotlar bilan shartnoma nima uchun tuzildi?', options: ['kitoblarning elektron nusxasini joylash uchun', 'multfilm uchun', 'she’riyat kechasi uchun', 'kitobkino uchun'], answer: 0 },
    ],
    sort: {
      categories: ['To‘g‘ri yozilgan', 'Xato yozilgan'],
      items: [
        { text: 'har bahor', cat: 0 }, { text: 'xar bohor', cat: 1 },
        { text: 'sumalak', cat: 0 }, { text: 'sumalag', cat: 1 },
        { text: 'xonadon', cat: 0 }, { text: 'honadon', cat: 1 },
        { text: 'muhabbat', cat: 0 }, { text: 'muxabbat', cat: 1 },
        { text: 'tabassum', cat: 0 }, { text: 'tabasum', cat: 1 },
      ],
    },
    qa: [
      { q: 'Nega maqola «Millionlarga yo‘ldosh platforma» deb nomlangan?', a: 'Ilova millionlab kitobxonga kitob o‘qishda hamroh bo‘ladi.' },
      { q: 'Kitobkino janri qanday maqsadda yaratilgan?', a: 'Tomoshabinda kitobni o‘qishga qiziqish uyg‘otish uchun.' },
      { q: '«Mutolaa» ilovasi imkoniyatlarini ayting.', a: 'Elektron va audiokitoblar, kitob do‘koni, multfilmlar, kitobkinolar.' },
      { q: 'Muallif «yoshlar kitob o‘qimaydi» fikrini qanday rad etgan?', a: 'Ilovadagi raqamlar va natijalar bilan.' },
      { q: 'Ovozni klonlashtiruvchi dastur qanday imkon beradi?', a: 'Elektron kitoblarni avtomatik ovozlashtirish.' },
    ],
  },
];

/* --- 8-sinf Ona tili: 71–80-darslar (darslik 2025, 190–222-betlar) --- */
const ONA_TILI_8_PART8 = [
  /* ===================== 71 ===================== */
  {
    id: 'evfemizm-boglovchi',
    source: 'IX bob «Inson va jamiyat» • 5-dars • 190–191-betlar',
    title: 'Evfemizmlar. Bog‘lovchilar',
    short: 'Yumshoq ifodalar, teng va ergashtiruvchi bog‘lovchilar',
    lesson: [
      {
        title: 'Ma’nodosh birliklar (9.27)',
        text: 'So‘z va unga mos ibora:',
        table: {
          head: ['So‘z', 'Mos birlik'],
          rows: [
            ['o‘lmoq', 'vafot etmoq'],
            ['o‘ta ochko‘z', 'nafsi hakalak otgan'],
            ['betayin', 'vasiqasi yo‘q'],
            ['turqi sovuq', 'diydori nomuborak'],
            ['ziqna, xasis', 'mirquruq'],
            ['olifta', 'tamtam'],
          ],
        },
      },
      {
        title: 'Evfemizm',
        text: 'Ba’zi so‘zlarni to‘g‘ridan to‘g‘ri aytish noqulay yoki qo‘pol tuyuladi, shuning uchun ularning o‘rnida yumshoqroq ifoda ishlatiladi.',
        rule: 'Evfemizm — so‘zlovchiga aytish noqulay, noo‘rin yoki qo‘pol tuyulgan so‘zlarning sinonimi sifatida paydo bo‘lgan so‘z va iboralar: o‘lmoq — vafot etmoq, dunyodan ko‘z yummoq.',
      },
      {
        title: 'Badiiy matndagi evfemizmlar (9.28)',
        text: 'Yozuvchilar evfemizmlardan qanday foydalangan:',
        table: {
          head: ['Evfemizm', 'Nimani anglatadi'],
          rows: [
            ['yuraksiz (A. Qodiriy)', 'qo‘rqoq'],
            ['yopiqliq (Shukrullo)', 'qamoq, tutqunlik'],
            ['ahliyat (Cho‘lpon)', 'rafiqa, turmush o‘rtog‘i'],
            ['qulog‘i og‘ir', 'kar'],
            ['ko‘zi ojiz', 'ko‘r'],
          ],
        },
        note: 'Evfemizm nutqni madaniyatli, odobli qiladi va suhbatdoshning ko‘nglini og‘ritmaydi.',
      },
      {
        title: 'Bog‘lovchilar',
        text: 'Bog‘lovchilar so‘z va gaplarni bog‘laydigan yordamchi so‘zlardir.',
        table: {
          head: ['Teng bog‘lovchilar', 'Misollar'],
          rows: [
            ['biriktiruv', 'va, hamda, bilan, -u, -yu, -da, ham'],
            ['zidlov', 'ammo, lekin, biroq, balki'],
            ['ayiruv', 'yo...yo, yoki, goh...goh, dam...dam'],
            ['inkor', 'na...na'],
          ],
        },
      },
      {
        title: 'Ergashtiruvchi bog‘lovchilar',
        text: 'Bir gapni ikkinchisiga tobe qilib bog‘laydi:',
        table: {
          head: ['Turi', 'Misollar'],
          rows: [
            ['aniqlov', 'ya’ni, -ki'],
            ['sabab', 'chunki, negaki'],
            ['o‘xshatish-qiyoslash', 'go‘yo, go‘yoki'],
            ['shart', 'agar, mabodo, garchi, basharti'],
            ['maqsad', 'toki'],
          ],
        },
      },
      {
        title: 'Mos bog‘lovchi (9.30)',
        text: 'Namunalar:',
        list: [
          'Buxoroga qarindoshlarimizni ko‘rgani bordik va tarixiy obidalarni tomosha qildik.',
          'Oramizdagi farq shuki, men nima uchun qilayotganimni bilaman, lekin sizlar bilmaysizlar. (A. Qahhor)',
          'Bir hiyla o‘ylab chiqdim-da, erta turgach, eski maktab sari jo‘nadim. (A. Qodiriy)',
          'Oy goh eshik tirqishlaridan mo‘ralar, goh bulutlar orasida g‘oyib bo‘lardi. (Ch. Aytmatov)',
          'Uning odob va axloq haqidagi «Turkiy Guliston» asari.',
        ],
      },
    ],
    pairs: [
      ['vafot etmoq', 'o‘lmoq'],
      ['qulog‘i og‘ir', 'kar'],
      ['nafsi hakalak otgan', 'o‘ta ochko‘z'],
      ['chunki', 'Sabab bog‘lovchisi'],
      ['ammo', 'Zidlov bog‘lovchisi'],
      ['agar', 'Shart bog‘lovchisi'],
    ],
    quiz: [
      { q: 'Evfemizm nima?', options: ['qo‘pol so‘z o‘rnidagi yumshoq ifoda', 'eskirgan so‘z', 'yangi so‘z', 'sheva so‘zi'], answer: 0 },
      { q: '«O‘lmoq» so‘zining evfemizmi?', options: ['vafot etmoq', 'yiqilmoq', 'uxlamoq', 'ketmoq'], answer: 0 },
      { q: '«Chunki» qaysi bog‘lovchi?', options: ['sabab', 'zidlov', 'shart', 'biriktiruv'], answer: 0 },
      { q: '«Goh...goh» qaysi bog‘lovchi?', options: ['ayiruv', 'inkor', 'sabab', 'maqsad'], answer: 0 },
      { q: '«Toki» qaysi ma’noni bildiradi?', options: ['maqsad', 'shart', 'zidlov', 'inkor'], answer: 0 },
      { q: '«Ko‘zi ojiz» kimga nisbatan aytiladi?', options: ['ko‘rga', 'karga', 'qariga', 'yoshga'], answer: 0 },
    ],
    sort: {
      categories: ['Teng bog‘lovchi', 'Ergashtiruvchi bog‘lovchi'],
      items: [
        { text: 'va', cat: 0 }, { text: 'chunki', cat: 1 },
        { text: 'ammo', cat: 0 }, { text: 'agar', cat: 1 },
        { text: 'yoki', cat: 0 }, { text: 'toki', cat: 1 },
        { text: 'na...na', cat: 0 }, { text: 'go‘yo', cat: 1 },
      ],
    },
    qa: [
      { q: 'Evfemizmlar nima uchun kerak?', a: 'Nutqni madaniyatli qilish va suhbatdoshning ko‘nglini og‘ritmaslik uchun.' },
      { q: '«Ko‘r» so‘zi o‘rniga qanday evfemizm ishlatiladi?', a: '«Ko‘zi ojiz».' },
      { q: 'Teng bog‘lovchilarning turlarini ayting.', a: 'Biriktiruv, zidlov, ayiruv, inkor.' },
      { q: 'Shart bog‘lovchilariga misol keltiring.', a: 'Agar, mabodo, garchi, basharti.' },
      { q: '«Ahliyat» so‘zi nimani bildiradi?', a: 'Rafiqa, turmush o‘rtog‘i.' },
    ],
  },

  /* ===================== 72 ===================== */
  {
    id: 'yuklamalar',
    source: 'IX bob «Inson va jamiyat» • 6-dars • 191–193-betlar',
    title: 'Yuklamalar',
    short: 'Yuklama turlari va ular gapga yuklaydigan ma’no',
    lesson: [
      {
        title: 'Bir gap — turli ma’no (9.32)',
        text: '«Dalalarda ish boshlandi» gapi yuklamalar bilan:',
        table: {
          head: ['Gap', 'Qo‘shimcha ma’no'],
          rows: [
            ['Dalalarda ish boshlandimi?', 'so‘roq'],
            ['Dalalarda ish boshlandi-ku.', 'ta’kid'],
            ['Axir dalalarda ish boshlandi.', 'kuchaytirish'],
            ['Dalalarda ish boshlandi-da.', 'tasdiq, ta’kid'],
            ['Dalalarda ish boshlangandir.', 'gumon'],
          ],
        },
      },
      {
        title: 'Yuklama',
        text: 'Yuklamalar mustaqil ma’noga ega emas, lekin gapning ma’nosiga nozik ottenka beradi.',
        rule: 'Yuklamalar so‘z va gaplarga qo‘shimcha ma’no yuklaydi.',
      },
      {
        title: 'Yuklama turlari',
        text: 'Ma’nosiga ko‘ra:',
        table: {
          head: ['Turi', 'Misollar'],
          rows: [
            ['so‘roq-taajjub', '-mi, -chi, -a (-ya)'],
            ['kuchaytiruv-ta’kid', 'hatto, axir, nahotki, g‘irt, ham, -ku, -u (-yu), -da, -oq (-yoq)'],
            ['ayiruv-chegaralov', 'faqat, xolos, atigi, -gina (-kina, -qina)'],
            ['gumon', '-dir'],
            ['o‘xshatish-qiyoslash', 'go‘yo, xuddi, naq, misoli'],
            ['inkor', 'hech, sira, na...na'],
          ],
        },
      },
      {
        title: 'Yuklamali gaplar (9.33)',
        text: 'Badiiy matndan:',
        list: [
          'Sekin unga yaqin bordim: bu manzara ham bizning ko‘ngilga yaqin-da, qadrdon! (Sh. Xolmirzayev)',
          'Na martaba, na boyligi bor edi uning. (E. Vohidov)',
          'Keksa donishmandning soch-soqoligina emas, qosh-kipriklari ham qorday oppoq edi. (O. Yoqubov)',
        ],
        note: 'Diqqat: «keldi-yu», «keldi-da» kabi joylarda -yu, -da bog‘lovchi vazifasida ham kelishi mumkin.',
      },
      {
        title: 'Yuklama qo‘yish (9.34)',
        text: 'Namunalar:',
        table: {
          head: ['Gap', 'Ma’no'],
          rows: [
            ['Bugungi darsda faqat Gulchehra qatnashmadi.', 'ayiruv-chegaralov'],
            ['Sharifa xuddi ammasining o‘zi.', 'o‘xshatish'],
            ['Umid ham bu gapdan xabardor edi.', 'kuchaytiruv'],
            ['Mahalladagi keksalarni yo‘qlab kelgandir.', 'gumon'],
            ['Tanlovda g‘olib bo‘lganimga hech ishona olmasdim.', 'inkor'],
          ],
        },
        note: '9.36: Saida Zunnunova she’ridagi bo‘sh o‘rinlarga yordamchi so‘zlarni qo‘ying: hatto, va, -chi, deb, yo, ham, -ku, ammo, yana, bilan.',
      },
    ],
    pairs: [
      ['-mi', 'So‘roq yuklamasi'],
      ['faqat', 'Ayiruv-chegaralov'],
      ['-dir', 'Gumon yuklamasi'],
      ['xuddi', 'O‘xshatish yuklamasi'],
      ['hatto', 'Kuchaytiruv yuklamasi'],
      ['sira', 'Inkor yuklamasi'],
    ],
    quiz: [
      { q: '«Boshlangandir» gapidagi -dir qanday ma’no beradi?', options: ['gumon', 'so‘roq', 'inkor', 'ta’kid'], answer: 0 },
      { q: '«Faqat» qaysi yuklama?', options: ['ayiruv-chegaralov', 'so‘roq', 'gumon', 'inkor'], answer: 0 },
      { q: '«Nahotki» qaysi yuklama?', options: ['kuchaytiruv-ta’kid', 'gumon', 'ayiruv', 'o‘xshatish'], answer: 0 },
      { q: '«Go‘yo» yuklamasining turi?', options: ['o‘xshatish-qiyoslash', 'inkor', 'so‘roq', 'ayiruv'], answer: 0 },
      { q: 'Yuklama nima qiladi?', options: ['qo‘shimcha ma’no yuklaydi', 'gaplarni bog‘laydi', 'so‘zlarni tobelaydi', 'his bildiradi'], answer: 0 },
      { q: '«-gina» qaysi yuklama?', options: ['ayiruv-chegaralov', 'gumon', 'so‘roq', 'inkor'], answer: 0 },
    ],
    sort: {
      categories: ['So‘roq', 'Ayiruv', 'Kuchaytiruv'],
      items: [
        { text: '-mi', cat: 0 }, { text: 'faqat', cat: 1 }, { text: 'hatto', cat: 2 },
        { text: '-chi', cat: 0 }, { text: 'xolos', cat: 1 }, { text: 'axir', cat: 2 },
        { text: '-a (-ya)', cat: 0 }, { text: 'atigi', cat: 1 }, { text: '-ku', cat: 2 },
      ],
    },
    qa: [
      { q: 'Yuklama turlarini sanang.', a: 'So‘roq-taajjub, kuchaytiruv-ta’kid, ayiruv-chegaralov, gumon, o‘xshatish, inkor.' },
      { q: '«Dalalarda ish boshlandi-ku» gapida qanday ma’no bor?', a: 'Ta’kid, kuchaytirish.' },
      { q: 'Gumon yuklamasiga misol keltiring.', a: '-dir: kelgandir.' },
      { q: 'Inkor yuklamalarini ayting.', a: 'Hech, sira, na...na.' },
      { q: '«Sharifa ... ammasining o‘zi» — qanday yuklama mos?', a: '«Xuddi» — o‘xshatish yuklamasi.' },
    ],
  },

  /* ===================== 73 ===================== */
  {
    id: 'vijdon',
    source: 'IX bob «Inson va jamiyat» • 7-dars • 193–195-betlar',
    title: '«Vijdon kerakdir insonga». Bobni takrorlash',
    short: 'Audiomatn tahlili, yordamchi so‘zlar takrori, «so‘qmoq» so‘zi tarixi',
    lesson: [
      {
        title: 'Darsga kirish',
        text: 'Vijdon deganda nimani tushunasiz? «Vijdon kerakdir insonga» audiomatni tinglanadi.',
        note: 'Audiomatn darslikdagi QR kod orqali tinglanadi; matn qisqartirib olingan.',
      },
      {
        title: 'Audiomatn bo‘yicha savollar',
        text: 'Muhokama uchun:',
        list: [
          'Muallif nega maqolani «Vijdon kerakdir insonga» deb nomlagan?',
          'Vijdonsiz qilingan ish odamning qalbini «zaxmdan xavfliroq va sovuqroq dard»ga duchor qiladi — bu fikrni izohlang.',
          'Nega ko‘pchilik vijdonli bo‘lishga intilsa-da, vijdonsizlar ham ko‘p?',
          'Sizningcha, vijdonli odam qanday bo‘ladi?',
        ],
        rule: 'Vijdon — insonning o‘z xatti-harakatiga ichki axloqiy baho berishi, yaxshi-yomonni ajratish tuyg‘usi.',
      },
      {
        title: 'So‘zlar (9.37, 9.39)',
        text: 'Audiomatn va boshqotirmadagi so‘zlar:',
        table: {
          head: ['So‘z', 'Ma’nosi'],
          rows: [
            ['xislat', 'fazilat, atvor'],
            ['kodeks', 'qonun va qoidalar to‘plami'],
            ['chaqirim', 'masofa o‘lchovi (taxminan 1 km)'],
            ['qudrat', 'kuch, quvvat'],
            ['qiyofa', 'siymo, surat, timsol'],
            ['odamiylik', 'insonlik, insof, muruvvat'],
          ],
        },
      },
      {
        title: 'Atamalarni takrorlash (9.45)',
        text: 'Qoida va atama:',
        table: {
          head: ['Qoida', 'Atama'],
          rows: [
            ['so‘z va gapga qo‘shimcha ma’no yuklaydi', 'yuklama'],
            ['gap bo‘laklari yoki sodda gaplarni bog‘laydi', 'bog‘lovchi'],
            ['ikki mustaqil so‘zni tobelantirib bog‘laydi', 'ko‘makchi'],
            ['qo‘pol so‘z o‘rnida ishlatiladi', 'evfemizm'],
            ['tobe bo‘lak va gaplarni bog‘laydi', 'ergashtiruvchi bog‘lovchi'],
          ],
        },
      },
      {
        title: 'Mos bog‘lovchi (9.46)',
        text: 'Namunalar:',
        list: [
          'Xalq bunday yolvorishlarga quloq solmadi, chunki g‘isht qolipdan ko‘chgan edi.',
          'Ba’zi sport o‘yinlari insonni nafaqat jismonan, balki ma’nan ham chiniqtiradi.',
          'Kishining iste’dodi barcha sohada bir xil bo‘lavermaydi, ya’ni yoshlar qobiliyatiga mos ishni tanlashi kerak.',
        ],
      },
      {
        title: 'Til sandig‘i: «so‘qmoq»',
        text: 'Eshqobil Shukur «so‘qmoq» so‘zining kelib chiqishini tushuntiradi:',
        list: [
          'So‘qmoq — odamlar qatnovidan o‘z-o‘zidan paydo bo‘lgan yolg‘izoyoq yo‘l.',
          'Ildizi «urmoq» ma’nosidagi «so‘qmoq» fe’li: «So‘qolmagan so‘yil ko‘tarar», «gap so‘qib yurmoq».',
          '-moq qo‘shimchasi takror ma’nosini beradi: «qayta-qayta urmoq», ya’ni qayta-qayta bosilgan joy.',
          'Navoiyda so‘qmoq — kirdi-chiqdi yo‘l, so‘qulmoq — urilmoq, bosilmoq.',
        ],
      },
    ],
    pairs: [
      ['xislat', 'fazilat'],
      ['qudrat', 'kuch'],
      ['qiyofa', 'siymo'],
      ['odamiylik', 'insof'],
      ['kodeks', 'qoidalar to‘plami'],
      ['so‘qmoq', 'Yolg‘izoyoq yo‘l'],
    ],
    quiz: [
      { q: 'Vijdon nima?', options: ['ichki axloqiy baho tuyg‘usi', 'boylik', 'kasb', 'qonun'], answer: 0 },
      { q: '«So‘qmoq» so‘zining ildizi qanday ma’noda?', options: ['urmoq', 'yurmoq', 'qazimoq', 'ochmoq'], answer: 0 },
      { q: '«Xislat» so‘zining ma’nosi?', options: ['fazilat, atvor', 'kuch', 'yo‘l', 'masofa'], answer: 0 },
      { q: 'Tobelantirib bog‘laydigan yordamchi so‘z?', options: ['ko‘makchi', 'yuklama', 'undov', 'modal'], answer: 0 },
      { q: '«Nafaqat jismonan, ... ma’nan ham» — mos bog‘lovchi?', options: ['balki', 'chunki', 'va', 'agar'], answer: 0 },
    ],
    sort: {
      categories: ['Yuklama', 'Bog‘lovchi', 'Ko‘makchi'],
      items: [
        { text: 'hatto', cat: 0 }, { text: 'chunki', cat: 1 }, { text: 'uchun', cat: 2 },
        { text: '-chi', cat: 0 }, { text: 'ammo', cat: 1 }, { text: 'kabi', cat: 2 },
        { text: '-ku', cat: 0 }, { text: 'yo', cat: 1 }, { text: 'orqali', cat: 2 },
      ],
    },
    qa: [
      { q: 'Vijdonli odam qanday bo‘ladi?', a: 'Halol, adolatli, o‘z xatosini tan oladigan, boshqalarga zarar yetkazmaydigan.' },
      { q: 'Nega «vijdon kerakdir insonga»?', a: 'Vijdon insonni yomonlikdan saqlaydi, uni haqiqiy inson qiladi.' },
      { q: '«So‘qmoq» qanday paydo bo‘lgan?', a: 'Qayta-qayta bosilgan joyda, «qayta-qayta urmoq» ma’nosidan.' },
      { q: 'Yordamchi so‘z turkumlarini ayting.', a: 'Ko‘makchi, bog‘lovchi, yuklama.' },
      { q: 'Vijdon haqida intervyu uchun bitta savol tuzing.', a: 'Masalan: «Sizningcha, vijdonni nima tarbiyalaydi?»' },
    ],
  },

  /* ===================== 74 ===================== */
  {
    id: 'ozlikni-anglash',
    source: 'X bob «Orzu va imkon» • 1-dars • 197–201-betlar',
    title: '«O‘zlikni anglash zavqi»',
    short: 'Shavkat Razzoqov asaridan parcha: robot bilan suhbat',
    lesson: [
      {
        title: 'Darsga kirish',
        text: 'Yangi bob — «Orzu va imkon». Orzu va maqsad o‘rtasida qanday farq bor? O‘zingizning eng kuchli tomoningizni bilasizmi?',
        note: 'Asar muallifi — Shavkat Razzoqov.',
      },
      {
        title: 'Robot bilan suhbat',
        text: 'Qahramon robotdan o‘zining kimligini biladigan odamlarni so‘raydi.',
        list: [
          'Robot: Beruniy, Ibn Sino, Navoiy, Firdavsiy, Forobiy, Umar Xayyom, Motsart, Eynshteyn, Edison...',
          'Robot: «Har bir odam dahoga aylanishi mumkin. Shunchaki birovga buning uchun o‘ttiz yil kerak, boshqa birovga — uch yuz yil».',
          'Robot: «Hazilni faqat fikrlash doirasi keng odamlar tushunadi».',
        ],
      },
      {
        title: 'Iste’dod va tirishqoqlik',
        text: 'Qahramon bolaligida futbol, rubob, rasm chizishga qiziqqan, lekin har safar to‘siqqa duch kelib, voz kechgan.',
        rule: 'Daho bilan oddiy odam farqi iste’dodda emas, tirishqoqlikda. Tirishqoqlik esa o‘z ishini yaxshi ko‘rishdan, unga ixlosdan paydo bo‘ladi.',
      },
      {
        title: 'Sharoit hal qiluvchi emas',
        text: 'Robot misollar keltiradi:',
        table: {
          head: ['Shaxs', 'Sharoiti'],
          rows: [
            ['K. E. Siolkovskiy', 'qishloq o‘qituvchisi, yog‘ochdan kosmik kema maketlari yasagan'],
            ['Ibn Sino', 'tanani o‘rganish uchun sharoit yo‘q, qatl xavfi bor edi'],
            ['D. I. Mendeleyev', 'avval jomadon yasaydigan usta sifatida tanilgan'],
            ['Pahlavon Mahmud', 'bir umr Xivada po‘stindo‘zlik qilgan'],
            ['Umar Xayyom', 'aslida matematik va astronom'],
          ],
        },
        note: 'Xulosa: odam tarixda qoladigan biror ish qilmagunicha o‘zining kimligini bila olmaydi.',
      },
      {
        title: 'Iboralar (10.1)',
        text: 'Matndagi iboralar ma’nosi:',
        table: {
          head: ['Ibora', 'Ma’nosi'],
          rows: [
            ['tan olmoq', 'e’tirof etmoq'],
            ['rejasi chippakka chiqmoq', 'rejasi amalga oshmay qolmoq'],
            ['hafsalasi pir bo‘lmoq', 'ko‘ngli qolmoq'],
            ['osmon bilan yercha farq', 'juda katta farq'],
            ['ishqiboz bo‘lmoq', 'juda qiziqmoq'],
            ['turtki bermoq', 'undamoq'],
            ['kalavaning uchini topmoq', 'masalaning yechimini topmoq'],
          ],
        },
      },
      {
        title: 'Maqsad jadvali (10.5)',
        text: 'Namuna:',
        table: {
          head: ['Maqsad', 'Nega muhim', 'Imkoniyat', 'To‘siq', 'Yechim'],
          rows: [['Dasturchi bo‘lish', 'zamonaviy kasb, yaxshi daromad', 'kompyuter, internet platformalari', 'murakkab kodlar', 'avval oson darslardan boshlash']],
        },
      },
    ],
    pairs: [
      ['Siolkovskiy', 'Kosmik kema maketlari'],
      ['Pahlavon Mahmud', 'Po‘stindo‘z'],
      ['Mendeleyev', 'Jomadon ustasi'],
      ['Umar Xayyom', 'Matematik, astronom'],
      ['chippakka chiqmoq', 'Amalga oshmaslik'],
      ['turtki bermoq', 'Undamoq'],
    ],
    quiz: [
      { q: '«O‘zlikni anglash zavqi» muallifi?', options: ['Shavkat Razzoqov', 'Erkin A’zam', 'Xudoyberdi To‘xtaboyev', 'Anvar Obidjon'], answer: 0 },
      { q: 'Robot fikricha, daho bilan oddiy odam farqi nimada?', options: ['tirishqoqlikda', 'iste’dodda', 'boylikda', 'sharoitda'], answer: 0 },
      { q: 'Qishloq o‘qituvchisi bo‘lib kosmik kema maketlarini yasagan kim?', options: ['Siolkovskiy', 'Edison', 'Eynshteyn', 'Mendeleyev'], answer: 0 },
      { q: 'Pahlavon Mahmud qaysi hunar bilan shug‘ullangan?', options: ['po‘stindo‘zlik', 'temirchilik', 'kulolchilik', 'duradgorlik'], answer: 0 },
      { q: '«Kalavaning uchini topmoq» —', options: ['yechimni topmoq', 'ip yigirmoq', 'adashmoq', 'qochmoq'], answer: 0 },
      { q: 'Tirishqoqlik nimadan paydo bo‘ladi?', options: ['ishni yaxshi ko‘rishdan', 'majburlashdan', 'puldan', 'qo‘rquvdan'], answer: 0 },
    ],
    sort: {
      categories: ['Robot fikri', 'Qahramon fikri'],
      items: [
        { text: 'Har bir odam dahoga aylanishi mumkin', cat: 0 }, { text: 'Daholar maxsus iste’dod bilan tug‘ilgan', cat: 1 },
        { text: 'Men hazilni tushunmayman', cat: 0 }, { text: 'Pulsiz kosmos bilan shug‘ullanib bo‘lmaydi', cat: 1 },
        { text: 'Sharoit hal qiluvchi emas', cat: 0 }, { text: 'Sen men bilan hazillashyapsan', cat: 1 },
      ],
    },
    qa: [
      { q: 'Nega robot Beruniy, Navoiylarni o‘zining kimligini biladigan insonlar deydi?', a: 'Ular tarixda qoladigan ish qilib, o‘z o‘rnini topgan.' },
      { q: 'Daho insonlar sharoitini tilga olishdan maqsad nima?', a: 'Sharoit emas, ishga muhabbat va tirishqoqlik muhimligini ko‘rsatish.' },
      { q: 'Qahramon iste’dodlarini nega rivojlantira olmagan?', a: 'Har safar to‘siqqa uchrab, voz kechgan.' },
      { q: 'Orzu va maqsadning farqi nima?', a: 'Orzu — istak; maqsad — reja va harakat bilan erishiladigan aniq natija.' },
      { q: 'Matndan qanday xulosa chiqarish mumkin?', a: 'O‘zlikni anglash uchun sevgan ishingni tirishqoqlik bilan qilish kerak.' },
    ],
  },

  /* ===================== 75 ===================== */
  {
    id: 'undov-taqlid-modal',
    source: 'X bob «Orzu va imkon» • 2-dars • 202–204-betlar',
    title: 'Undov, taqlid va modal so‘zlar',
    short: 'Alohida so‘z turkumlari, tinish belgilari, modal so‘z ma’nolari',
    lesson: [
      {
        title: 'Undov so‘zlar',
        text: 'His-hayajon yoki buyruq-xitobni bildiradi.',
        rule: 'Undov so‘zlar his-hayajon (iye, voy, uf, bay-bay, o, urree) va buyruq-xitob (hey, hoy, xo‘sh, beh-beh, pish-pish)ni ifodalaydi. Ular vergul bilan ajratiladi: Ehhe, orzularingiz juda ko‘p-ku!',
      },
      {
        title: 'Taqlid so‘zlar',
        text: 'Tovush yoki holatga taqlid qiladi.',
        rule: 'Taqlid so‘zlar takror va juft holda kelganda chiziqcha bilan yoziladi: qiy-chuv, qars-qurs, taq-taq (tovush); yalt-yult, duv-duv, milt-milt (holat).',
      },
      {
        title: 'Modal so‘zlar',
        text: 'So‘zlovchining fikrga munosabatini bildiradi va vergul bilan ajratiladi: Biz g‘olib chiqamiz, albatta.',
        table: {
          head: ['Ma’nosi', 'Modal so‘zlar'],
          rows: [
            ['ishonch', 'albatta, shaksiz'],
            ['gumon', 'ehtimol, chamasi, shekilli'],
            ['tasdiq', 'darhaqiqat, haqiqatan'],
            ['xulosa', 'xullas, demak, umuman'],
            ['tartib', 'avvalo, avvalambor'],
            ['dalillash', 'masalan, jumladan'],
            ['achinish', 'attang, afsus'],
            ['quvonch', 'xayriyat'],
          ],
        },
      },
      {
        title: 'Tasniflash (10.7)',
        text: 'So‘zlarni guruhlaymiz:',
        table: {
          head: ['Undov', 'Taqlid', 'Modal'],
          rows: [
            ['voy, eh, chu, hay, ey', 'g‘a-g‘a, jimir-jimir, lip-lip, dag‘-dag‘', 'afsuski, demak, binobarin, ehtimol'],
            ['', 'yalt-yult, chars-churs, gurs-gurs, taq-tuq, g‘uv-g‘uv', 'to‘g‘ri, xayriyat, shekilli'],
          ],
        },
      },
      {
        title: 'Modal so‘z yoki boshqa turkum? (Chorak takrori)',
        text: 'Bir so‘z ikki vazifada kelishi mumkin:',
        table: {
          head: ['Modal so‘z', 'Boshqa vazifada'],
          rows: [
            ['Ehtimol, bu vazifani siz uddalaysiz.', 'Bo‘ron bo‘lishi ehtimol, qizim.'],
            ['Chamasi, sayohat qoldiriladi.', 'Salimaning chamasi to‘g‘ri chiqdi.'],
            ['Aftidan, uning aloqasi yo‘q.', 'Uning kimligini aftidan bilish qiyin emas.'],
          ],
        },
        note: 'Modal so‘z gapdan vergul bilan ajraladi va gap bo‘lagi bo‘lmaydi.',
      },
    ],
    pairs: [
      ['voy', 'Undov so‘z'],
      ['yalt-yult', 'Holatga taqlid'],
      ['taq-taq', 'Tovushga taqlid'],
      ['albatta', 'Ishonch modali'],
      ['shekilli', 'Gumon modali'],
      ['xayriyat', 'Quvonch modali'],
    ],
    quiz: [
      { q: '«Yalt-yult» qanday so‘z?', options: ['holatga taqlid', 'undov', 'modal', 'ravish'], answer: 0 },
      { q: '«Ehtimol» qaysi ma’noni bildiradi?', options: ['gumon', 'ishonch', 'quvonch', 'xulosa'], answer: 0 },
      { q: 'Taqlid so‘zlar takror kelganda qanday yoziladi?', options: ['chiziqcha bilan', 'qo‘shib', 'ajratib vergulsiz', 'qavsda'], answer: 0 },
      { q: '«Xullas» modal so‘zi nimani bildiradi?', options: ['fikrni xulosalash', 'gumon', 'achinish', 'ishonch'], answer: 0 },
      { q: 'Qaysi biri undov so‘z?', options: ['hey', 'demak', 'gurs-gurs', 'albatta'], answer: 0 },
      { q: 'Modal so‘z gapda qanday ajratiladi?', options: ['vergul bilan', 'tire bilan', 'qo‘shtirnoq bilan', 'ajratilmaydi'], answer: 0 },
    ],
    sort: {
      categories: ['Undov', 'Taqlid', 'Modal'],
      items: [
        { text: 'voy', cat: 0 }, { text: 'taq-tuq', cat: 1 }, { text: 'afsuski', cat: 2 },
        { text: 'ey', cat: 0 }, { text: 'lip-lip', cat: 1 }, { text: 'demak', cat: 2 },
        { text: 'uf', cat: 0 }, { text: 'gurs-gurs', cat: 1 }, { text: 'shekilli', cat: 2 },
      ],
    },
    qa: [
      { q: 'Undov so‘zlarning ikki turi qaysi?', a: 'His-hayajon va buyruq-xitob undovlari.' },
      { q: 'Tovushga va holatga taqlid farqi?', a: 'Tovushga: taq-taq; holatga: yalt-yult.' },
      { q: '«Albatta kishi kasb tanlashda qiziqishini inobatga olishi kerak» gapiga tinish belgi qo‘ying.', a: 'Albatta, kishi...' },
      { q: 'Achinish bildiruvchi modal so‘zlar?', a: 'Attang, afsus, afsuski.' },
      { q: 'Modal so‘z gap bo‘lagi bo‘ladimi?', a: 'Yo‘q, u gap bo‘lagi bo‘lmaydi.' },
    ],
  },

  /* ===================== 76 ===================== */
  {
    id: 'muvaffaqiyat-sirlari',
    source: 'X bob «Orzu va imkon» • 3-dars • 204–209-betlar',
    title: '«Muvaffaqiyatli shaxslarning 6 siri»',
    short: 'Maqola tahlili, mashhur insonlar odatlari, imlo qoidalari',
    lesson: [
      {
        title: 'Darsga kirish',
        text: 'Muvaffaqiyat nima? Muvaffaqiyatga erishish uchun nima qilish kerak?',
      },
      {
        title: '6 ta sir',
        text: 'Maqoladagi tavsiyalar va ularning foydasi:',
        table: {
          head: ['Tavsiya', 'Foydasi'],
          rows: [
            ['1. Kundalik tuting', 'e’tiborli va ziyrak bo‘lish, to‘g‘ri qaror qabul qilish'],
            ['2. Tanaffus qiling', 'samaradorlik va ijodiy fikrlashni oshirish'],
            ['3. Kuniga 15 daqiqa piyoda yuring', 'toliqib qolmaslik, jismoniy faollik'],
            ['4. Ko‘proq kitob o‘qing', 'xotira, empatiya, stressni kamaytirish'],
            ['5. Suhbatdosh toping', 'vaziyatga boshqa tomondan qarash'],
            ['6. Tajribadan qo‘rqmang', 'xatolardan xulosa chiqarish'],
          ],
        },
      },
      {
        title: 'Mashhur insonlar odatlari',
        text: 'Maqoladagi misollar:',
        list: [
          'Benjamin Franklin har tong: «Bugun qanday yaxshi ish qilishim kerak?» deb so‘ragan.',
          'Jon Adams umri davomida 50 ta kundalik to‘ldirgan; Eynshteyn 80 ming sahifadan ortiq qo‘lyozma qoldirgan.',
          'Charlz Dikkens kuniga 10 km dan ortiq piyoda yurgan; Bethoven sayrga qalam-qog‘oz bilan chiqqan.',
          'Mark Kyuban kuniga 3 soatdan ortiq kitob o‘qiydi; Ilon Mask yoshligida haftasiga 2 ta kitob o‘qigan.',
          'Tomas Edisonning 50 mingdan ortiq tajribasi muvaffaqiyatsiz bo‘lgan, lekin u 1100 patent egasi bo‘lgan.',
        ],
        rule: 'Muvaffaqiyat o‘tkazilgan tajribalar soniga bog‘liq: bitta yutuq barcha muvaffaqiyatsiz urinishlarni «yuvib ketadi».',
      },
      {
        title: 'Yangi so‘zlar (10.13)',
        text: 'Harflardan hosil bo‘ladigan so‘zlar:',
        table: {
          head: ['So‘z', 'Izohi'],
          rows: [
            ['patent', 'ixtiro mualliflikini tasdiqlovchi hujjat'],
            ['resurs', 'mavjud zaxira, boylik'],
            ['istiqbol', 'kelajak'],
            ['empatiya', 'boshqalar tuyg‘usini tushunish'],
            ['stress', 'o‘ta hayajon, asabiylik holati'],
            ['duet', 'ikki ijrochi yaratgan asar'],
          ],
        },
      },
      {
        title: 'Imlo qoidalari (10.17)',
        text: 'Qoida va namuna:',
        table: {
          head: ['Qoida', 'Namuna'],
          rows: [
            ['qo‘shma fe’l qismlari ajratib yoziladi', 'sotib olmoq, qaror qabul qilmoq'],
            ['ko‘makchi va to‘liqsiz fe’l ajratib yoziladi', 'ayta olmoq, o‘qib chiqmoq'],
            ['yildan yilga, kundan kunga ajratib yoziladi', 'ko‘pdan ko‘p'],
            ['har, hech, shu, hamma ajratib yoziladi', 'hech qaysi, har kuni'],
            ['-u, -yu, -da, -ku, -chi chiziqcha bilan', 'erta-yu kech'],
            ['juft so‘zlar chiziqcha bilan', 'oldi-sotdi, sa’y-harakat'],
          ],
        },
      },
    ],
    pairs: [
      ['kundalik', 'To‘g‘ri qaror qabul qilish'],
      ['tanaffus', 'Ijodiy fikrlash'],
      ['kitob', 'Empatiya va xotira'],
      ['patent', 'Ixtiro hujjati'],
      ['empatiya', 'Tuyg‘ularni tushunish'],
      ['duet', 'Ikki ijrochi asari'],
    ],
    quiz: [
      { q: 'Maqolada nechta sir keltirilgan?', options: ['6', '3', '10', '5'], answer: 0 },
      { q: 'Kuniga kamida necha daqiqa piyoda yurish tavsiya etiladi?', options: ['15', '5', '60', '120'], answer: 0 },
      { q: 'Edison nechta patentga ega bo‘lgan?', options: ['1100', '50', '9000', '100'], answer: 0 },
      { q: '«Empatiya» nima?', options: ['boshqalar tuyg‘usini tushunish', 'stress', 'kundalik', 'patent'], answer: 0 },
      { q: 'Kitob o‘qish nimaga yordam beradi?', options: ['xotira va empatiyani oshiradi', 'faqat uyquga', 'semirishga', 'hech narsaga'], answer: 0 },
      { q: 'To‘g‘ri yozilganini toping.', options: ['kundan kunga', 'kundan-kunga', 'kundankunga', 'kun-dan kunga'], answer: 0 },
    ],
    sort: {
      categories: ['Ajratib yoziladi', 'Chiziqcha bilan'],
      items: [
        { text: 'sotib olmoq', cat: 0 }, { text: 'erta-yu kech', cat: 1 },
        { text: 'kundan kunga', cat: 0 }, { text: 'oldi-sotdi', cat: 1 },
        { text: 'hech qaysi', cat: 0 }, { text: 'sa’y-harakat', cat: 1 },
        { text: 'ayta olmoq', cat: 0 }, { text: 'keldi-yu', cat: 1 },
      ],
    },
    qa: [
      { q: 'Kundalik tutishning foydasi nima?', a: 'E’tiborli va ziyrak bo‘lish, fikrlashni rivojlantirish, to‘g‘ri qaror qabul qilish.' },
      { q: 'Nega tajribadan qo‘rqmaslik kerak?', a: 'Xatolar keyinchalik foyda beradigan tajribaga aylanadi.' },
      { q: '«Mizg‘ib olish» nima?', a: 'Ozgina uxlash, ko‘z ilintirish.' },
      { q: 'Birgalikda katta natijaga erishgan juftliklarni ayting.', a: 'Mariya va Pyer Kyuri, Stiv Jobs va Stiv Voznyak.' },
      { q: 'Muvaffaqiyatning yana qanday sirlarini bilasiz?', a: 'Erkin javob: vaqtni rejalash, sabr, sog‘lom ovqatlanish.' },
    ],
  },

  /* ===================== 77 ===================== */
  {
    id: 'ozlashma-sozlar',
    source: 'X bob «Orzu va imkon» • 4-dars • 209–211-betlar',
    title: 'O‘zlashma so‘zlar va ularning muqobillari',
    short: 'Zamonaviy o‘zlashmalar, o‘zbekcha muqobillar, imlosi',
    lesson: [
      {
        title: 'O‘zlashma so‘zlar',
        text: 'Boshqa tillardan kirib kelgan so‘zlar. Ularning ba’zilariga o‘zbekcha muqobil topish mumkin.',
        rule: 'O‘zlashma so‘z o‘rnida tushunarli o‘zbekcha muqobil bo‘lsa, uni qo‘llash tilni boyitadi va sofligini saqlaydi. Ba’zi atamalarning muqobili yo‘q, ular xalqaro so‘z sifatida qo‘llanadi.',
      },
      {
        title: 'Ijtimoiy tarmoq so‘zlari (10.19)',
        text: 'O‘zlashma va taklif etilgan muqobil:',
        table: {
          head: ['O‘zlashma', 'Izohi', 'Muqobili'],
          rows: [
            ['heshteg', '# belgili kalit so‘z', 'qulavuz, yo‘lchi'],
            ['skrinshot', 'ekranni suratga olish', '—'],
            ['kurator', 'talabalar guruhi tarbiyachisi', 'murabbiy'],
            ['bot', 'amallarni bajaruvchi dastur', '—'],
            ['chellenj', 'chaqiruv, da’vat', 'chaqiruv'],
            ['negativ', 'salbiy fikr va munosabat', 'salbiy munosabat'],
            ['parol', 'maxfiy kirish so‘zi', 'ochgich'],
            ['feyk', 'soxta, tasdiqlanmagan ma’lumot', 'yolg‘on'],
            ['imij', 'tasavvurdagi obraz', 'ko‘rinish'],
          ],
        },
      },
      {
        title: 'Texnika so‘zlari (10.20)',
        text: 'Muqobil taklif qilish:',
        table: {
          head: ['O‘zlashma', 'Ma’nosi', 'Taklif'],
          rows: [
            ['airbag', 'havo yostiqchasi', 'havo yostiqchasi'],
            ['hayp', 'sun’iy shov-shuv', 'shov-shuv'],
            ['turniket', 'kirish nazorat qurilmasi', 'nazorat uskunasi'],
            ['lokatsiya', 'turar joy, pozitsiya', 'joylashuv, qo‘nim'],
            ['radar', 'jismlarni aniqlovchi tizim', 'xalqaro atama'],
          ],
        },
      },
      {
        title: 'O‘zlashmalar imlosi (10.22)',
        text: 'To‘g‘ri yozilishi:',
        examples: ['podkast', 'demokratiya', 'kongress', 'avtomobil', 'deklaratsiya', 'familiya', 'kontrakt', 'kompaniya', 'kosmonavt', 'parhez', 'monitor', 'pedagog', 'transport', 'samolyot', 'psixolog', 'laborant'],
      },
      {
        title: 'Muhokama (10.21)',
        text: '«O‘zlashma so‘zlarning milliy tilni rivojlantirishdagi o‘rni» mavzusida:',
        list: [
          'O‘zlashmalar tilni boyitadimi yoki zarar keltiradimi?',
          'Faqat sof o‘zbekcha so‘zlarni ishlatsak, tilimiz boyiydimi?',
          'Tilshunos bo‘lsangiz, qanday yechim taklif qilardingiz?',
        ],
      },
    ],
    pairs: [
      ['chellenj', 'chaqiruv'],
      ['feyk', 'yolg‘on'],
      ['imij', 'ko‘rinish'],
      ['kurator', 'murabbiy'],
      ['parol', 'ochgich'],
      ['hayp', 'shov-shuv'],
    ],
    quiz: [
      { q: '«Feyk» so‘zining muqobili?', options: ['yolg‘on', 'chaqiruv', 'ochgich', 'murabbiy'], answer: 0 },
      { q: '«Chellenj» nima?', options: ['chaqiruv, da’vat', 'parol', 'rasm', 'dastur'], answer: 0 },
      { q: 'To‘g‘ri yozilganini toping.', options: ['avtomobil', 'avtomabil', 'aftomobil', 'avtamobil'], answer: 0 },
      { q: '«Imij» so‘zining muqobili?', options: ['ko‘rinish', 'yolg‘on', 'shov-shuv', 'joylashuv'], answer: 0 },
      { q: 'Qaysi biri to‘g‘ri yozilgan?', options: ['laborant', 'lobarant', 'labarant', 'loborant'], answer: 0 },
      { q: '«Lokatsiya» so‘zining muqobili?', options: ['joylashuv', 'ochgich', 'murabbiy', 'chaqiruv'], answer: 0 },
    ],
    sort: {
      categories: ['To‘g‘ri yozilgan', 'Xato yozilgan'],
      items: [
        { text: 'kongress', cat: 0 }, { text: 'kangress', cat: 1 },
        { text: 'samolyot', cat: 0 }, { text: 'samalyot', cat: 1 },
        { text: 'pedagog', cat: 0 }, { text: 'pedogog', cat: 1 },
        { text: 'demokratiya', cat: 0 }, { text: 'demakratiya', cat: 1 },
        { text: 'parhez', cat: 0 }, { text: 'parxez', cat: 1 },
      ],
    },
    qa: [
      { q: 'O‘zlashma so‘z nima?', a: 'Boshqa tillardan kirib kelgan so‘z.' },
      { q: 'Nega ba’zi so‘zlarning muqobili berilmagan?', a: 'Ular xalqaro atamaga aylangan yoki aniq muqobili yo‘q.' },
      { q: '«Bot» so‘zi qayerdan kelib chiqqan?', a: 'Robot so‘zidan, chexcha «robota» — mehnat.' },
      { q: '«Kurator» o‘rniga qaysi so‘zni ishlatish mumkin?', a: 'Murabbiy.' },
      { q: 'O‘zlashmalar haqida o‘z fikringizni ayting.', a: 'Erkin javob.' },
    ],
  },

  /* ===================== 78 ===================== */
  {
    id: 'parvoz-qilgan-orzular',
    source: 'X bob «Orzu va imkon» • 5-dars • 212–215-betlar',
    title: '«Parvoz qilgan orzular». Loyiha taqdimoti',
    short: 'Audiomatn: «Ibrat farzandlari» loyihasi; loyiha taqdimoti mezonlari',
    lesson: [
      {
        title: 'Darsga kirish',
        text: '«Parvoz qilgan orzular» audiomatni — «Ibrat farzandlari» loyihasi rahbari Rustam Qoriyev bilan suhbat (10.24).',
        note: 'Audiomatn darslikdagi QR kod orqali tinglanadi.',
      },
      {
        title: 'Suhbatdan fikrlar (10.33)',
        text: 'Matndagi muhim jumlalar:',
        list: [
          '«Men yoshligimdan ingliz tilini o‘rganib, chet elda o‘qishni orzu qilardim, lekin xohishning o‘zi bilan ish bitmas ekan.»',
          '«Hozircha bepul o‘qib tursam maylimi, kelgusida barchasini sizga qaytaraman.»',
          '«Faqat bitta shart bilan roziman. Kelajakda o‘zing kabi bolalarga til o‘rgatasan.»',
          '«Is’hoqxon Ibrat o‘ndan ortiq xorijiy tillarni bilgan va ularni bepul o‘rgatgan. Biz ham ularning davomchilari bo‘lish istagida bu loyihani amalga oshirdik.»',
        ],
        rule: '«Ibrat farzandlari» loyihasining maqsadi — xorijiy tillarni bepul, sodda, tizimli va kreativ usulda o‘rgatish.',
      },
      {
        title: 'O‘zlashmalar muqobili (10.25)',
        text: 'Audiomatndagi so‘zlar:',
        table: {
          head: ['O‘zlashma', 'Muqobili'],
          rows: [
            ['kontrakt', 'shartnoma'],
            ['universitet', 'dorilfunun (cheklangan)'],
            ['biznes', 'tadbirkorlik'],
            ['doska', 'yozuv taxtasi, xattaxta'],
            ['kreativ', 'ijodiy'],
            ['grant', 'homiylik mablag‘i'],
          ],
        },
      },
      {
        title: 'Tavakkalchilik',
        text: 'Suhbatdosh maqsadingiz oliy va yuksak bo‘lsa, tavakkal qilishdan qo‘rqmaslikni tavsiya qiladi.',
        list: [
          'Til bilish tufayli bir odamning hayotini saqlab qolgani haqidagi voqeani aytib, xorijiy til naqadar muhimligini uqtiradi.',
          'Ma’lum loyihalar: «Mutolaa», «Xon akademiyasi», «Yoshlar akademiyasi».',
        ],
      },
      {
        title: 'Loyiha taqdimoti (10.30–10.32)',
        text: 'Grant uchun loyiha tayyorlash bosqichlari va baholash:',
        table: {
          head: ['Mezon', 'Ball'],
          rows: [
            ['loyiha maqsadiga mos nom', '3'],
            ['maxsus ramz (logotip)', '3'],
            ['maqsadning tushunarli va foydaliligi', '3'],
            ['adabiy talaffuz me’yorlari', '3'],
            ['tana tili: ko‘z aloqasi, imo-ishora, gavda', '3'],
            ['ovoz va intonatsiya', '3'],
            ['diqqatni jalb etuvchi jumlalar', '3'],
          ],
        },
      },
    ],
    pairs: [
      ['Ibrat farzandlari', 'Bepul til o‘rgatish loyihasi'],
      ['Is’hoqxon Ibrat', 'O‘ndan ortiq til bilgan'],
      ['kontrakt', 'shartnoma'],
      ['kreativ', 'ijodiy'],
      ['grant', 'homiylik mablag‘i'],
      ['biznes', 'tadbirkorlik'],
    ],
    quiz: [
      { q: '«Ibrat farzandlari» loyihasi rahbari?', options: ['Rustam Qoriyev', 'Sa’dulla Quronov', 'Shavkat Razzoqov', 'Komil Jontoyev'], answer: 0 },
      { q: 'Loyiha nomi kimning nomi bilan bog‘liq?', options: ['Is’hoqxon Ibrat', 'Abdulla Avloniy', 'Behbudiy', 'Fitrat'], answer: 0 },
      { q: 'Loyihaning asosiy maqsadi?', options: ['tillarni bepul, sodda, tizimli o‘rgatish', 'IELTS kafolati', 'pullik kurslar', 'faqat grammatika'], answer: 0 },
      { q: '«Kreativ» so‘zining muqobili?', options: ['ijodiy', 'shartnoma', 'tadbirkorlik', 'homiylik'], answer: 0 },
      { q: 'Loyiha taqdimoti mezonlarida nechta band bor?', options: ['7', '3', '5', '10'], answer: 0 },
    ],
    sort: {
      categories: ['O‘zlashma', 'O‘zbekcha muqobil'],
      items: [
        { text: 'kontrakt', cat: 0 }, { text: 'shartnoma', cat: 1 },
        { text: 'biznes', cat: 0 }, { text: 'tadbirkorlik', cat: 1 },
        { text: 'kreativ', cat: 0 }, { text: 'ijodiy', cat: 1 },
        { text: 'doska', cat: 0 }, { text: 'xattaxta', cat: 1 },
      ],
    },
    qa: [
      { q: '«Xohishning o‘zi bilan ish bitmas ekan» fikrini izohlang.', a: 'Orzuga erishish uchun mehnat, reja va harakat kerak.' },
      { q: 'Tavakkalchilik qanday xislat?', a: 'Natija noaniq bo‘lsa ham, maqsad yo‘lida jur’at bilan harakat qilish.' },
      { q: 'Ustoz bepul o‘qitish uchun qanday shart qo‘ydi?', a: 'Kelajakda o‘zi kabi bolalarga til o‘rgatish.' },
      { q: 'Loyiha taqdimotida tana tili nima uchun muhim?', a: 'Tinglovchi bilan aloqa o‘rnatib, ishonch uyg‘otadi.' },
      { q: 'Grant ajratilsa, qanday loyiha qilardingiz?', a: 'Erkin javob.' },
    ],
  },

  /* ===================== 79 ===================== */
  {
    id: 'rasmiy-xat',
    source: 'X bob «Orzu va imkon» • 6-dars • 215–218-betlar',
    title: 'Rasmiy xat: iltimos va so‘rov xati',
    short: 'Xat tuzilishi, to‘g‘ri ifodalar, uslubiy xatolarni tuzatish',
    lesson: [
      {
        title: 'Xat namunasi (10.35)',
        text: 'Musobaqa koordinatori maktab direktoriga yozgan iltimos xati:',
        list: [
          'Kimga: Toshkent shahri Yunusobod tumanidagi 8-maktab direktori O. T. Tursunovga',
          'Murojaat: Hurmatli Otabek Tohirovich!',
          'Matn: «Zukko kitobxon» musobaqasida ishtirok etishi uchun D. Turg‘unovani darslardan ozod etishingizni so‘raymiz.',
          'Yakun: Hamkorlik uchun minnatdorchilik bildiramiz. Hurmat bilan, musobaqa koordinatori (imzo) Sh. Imomqulov',
          'Sana: 2025-yil 18-may; telefon raqami',
        ],
      },
      {
        title: 'Iltimos/so‘rov xati',
        text: 'Rasmiy xat shaxsiy xatdan rasmiy uslubi, aniq tuzilishi bilan farq qiladi.',
        rule: 'Iltimos/so‘rov xati so‘rash, ma’lumot olish, iltimos mazmunida yoziladi. Zaruriy qismlari: 1) xat oluvchi tashkilot va mansabdor shaxs nomi; 2) matn; 3) ilova (zarur bo‘lsa). Muassasa ish qog‘ozida jo‘natilish sanasi va raqami ko‘rsatiladi.',
      },
      {
        title: 'To‘g‘ri yozilgan birliklar (10.37)',
        text: 'Rasmiy xatda:',
        table: {
          head: ['To‘g‘ri', 'Xato'],
          rows: [
            ['murojaat qilmoqchimiz', 'murojat qilmoqchimiz'],
            ['minnatdorchilik bildiramiz', 'minatdorlik bildiramiz'],
            ['hurmat bilan', 'xurmat bilan, hurmat blan'],
            ['2025-yil 22-may, 22.05.2025', '2025.22.05'],
            ['A. D. Azizovga', 'Azizov A.D.ga'],
            ['so‘rayman', 'talab qilaman'],
          ],
        },
      },
      {
        title: 'Uslubiy xatolarni tuzatish (10.39)',
        text: 'Sport boshqarmasiga yozilgan xatdagi xatolar:',
        table: {
          head: ['Xato', 'To‘g‘ri'],
          rows: [
            ['murojaat qilyapmiz', 'murojaat qilmoqdamiz'],
            ['yordam ko‘rsatishingizni istaymiz', 'yordam ko‘rsatishingizni so‘raymiz'],
            ['anjomlar yomon bo‘lib ketgani sababli', 'anjomlar eskirgani sababli'],
            ['zudlik bilan ... ajratishingizni talab qilamiz', '... ajratishingizni so‘raymiz'],
          ],
        },
        note: '10.40: maktab kutubxonasiga so‘rov xati yoki ma’muriyatga musobaqada ishtirok etish uchun iltimos xati yozing.',
      },
      {
        title: 'Xat qismlarini tartiblash (10.36)',
        text: 'Kutubxonaga kitob so‘rab yozilgan xat tartibi:',
        list: [
          '1. Toshkent shahri Axborot-kutubxona markazi direktori U. S. Hasanovga',
          '2. Maktab kutubxonasini yangi badiiy adabiyotlar bilan ta’minlash bo‘yicha yordam so‘rab murojaat qilmoqdamiz.',
          '3. Xususan, 5–11-sinf o‘quvchilari uchun zamonaviy bolalar adabiyoti, mumtoz va jahon adabiyoti namunalari kerak.',
          '4. Sizdan amaliy yordam ko‘rsatishingizni so‘raymiz. Hamkorligingiz uchun oldindan minnatdorchilik bildiramiz.',
          '5. Hurmat bilan maktab direktori O. K. Azizov; 2025-yil 18-mart',
        ],
      },
    ],
    pairs: [
      ['Hurmat bilan', 'Xat yakuni'],
      ['so‘raymiz', 'Iltimos ifodasi'],
      ['ilova', 'Qo‘shimcha hujjat'],
      ['Hurmatli ...!', 'Murojaat'],
      ['A. D. Azizovga', 'Kimga'],
      ['2025-yil 22-may', 'Sana'],
    ],
    quiz: [
      { q: 'Rasmiy xatda qaysi ifoda noto‘g‘ri?', options: ['talab qilamiz', 'so‘raymiz', 'minnatdorchilik bildiramiz', 'hurmat bilan'], answer: 0 },
      { q: 'To‘g‘ri yozilganini toping.', options: ['murojaat', 'murojat', 'murajaat', 'murojot'], answer: 0 },
      { q: 'Iltimos xatining zaruriy qismi?', options: ['xat oluvchi tashkilot nomi', 'she’r', 'rasm', 'reklama'], answer: 0 },
      { q: 'To‘g‘ri sana yozilishi?', options: ['2025-yil 22-may', '2025.22.05', 'may 22 2025', '22-may-2025-yil'], answer: 0 },
      { q: '«Murojaat qilyapmiz» o‘rniga rasmiy uslubda?', options: ['murojaat qilmoqdamiz', 'murojaat qildik-da', 'gapiryapmiz', 'yozdik'], answer: 0 },
    ],
    sort: {
      categories: ['Rasmiy uslub', 'Rasmiy emas'],
      items: [
        { text: 'so‘raymiz', cat: 0 }, { text: 'talab qilamiz', cat: 1 },
        { text: 'eskirgani sababli', cat: 0 }, { text: 'yomon bo‘lib ketgani uchun', cat: 1 },
        { text: 'murojaat qilmoqdamiz', cat: 0 }, { text: 'murojaat qilyapmiz', cat: 1 },
        { text: 'Hurmat bilan', cat: 0 }, { text: 'Xayr, ko‘rishguncha', cat: 1 },
      ],
    },
    qa: [
      { q: 'Iltimos xati qanday mazmunda yoziladi?', a: 'So‘rash, ma’lumot olish, iltimos mazmunida.' },
      { q: 'Rasmiy xat shaxsiy xatdan nimasi bilan farq qiladi?', a: 'Rasmiy uslubi, aniq tuzilishi, mansabdor shaxsga murojaati bilan.' },
      { q: 'Rasmiy xatning zaruriy qismlari?', a: 'Xat oluvchi nomi, matn, ilova (zarur bo‘lsa); yakun, imzo, sana.' },
      { q: 'Nega rasmiy xatda «talab qilamiz» deyilmaydi?', a: 'Bu qo‘pol; iltimos «so‘raymiz» bilan bildiriladi.' },
      { q: 'O‘quvchi qanday iltimos xati yoza oladi?', a: 'Masalan, musobaqada ishtirok etish uchun ruxsat so‘rab.' },
    ],
  },

  /* ===================== 80 ===================== */
  {
    id: 'imkoniyat-yarat',
    source: 'X bob «Orzu va imkon» • 7-dars va chorak takrori • 218–222-betlar',
    title: '«Imkoniyat berilishini kutma, uni o‘zing yarat!»',
    short: 'Maqola yozish, maqollar, «qozondi» so‘zi tarixi, yakuniy takror',
    lesson: [
      {
        title: 'Maqollar (10.41)',
        text: 'Bu maqollar «imkoniyatdan foydalanish» mavzusida birlashadi:',
        list: [
          'Tishing borida tishlab qol, kuching borida ishlab qol.',
          'Temirni qizig‘ida bos.',
          'Holi yetmagan bo‘yrasida qolar.',
          'Izlagan imkon topar.',
          'Qush qanoti bilan. Baliqning ham sakkiz qanoti bor.',
        ],
      },
      {
        title: 'Vaziyatlar (10.42)',
        text: 'Tengdoshlarga tavsiya bering:',
        list: [
          'Jurnalist bo‘lmoqchi, lekin to‘garak va ustoz yo‘q — internet, maktab gazetasi, blog orqali o‘zini sinab ko‘rishi mumkin.',
          'IT ga qiziqadi, lekin oyog‘i lat yegan — uyda onlayn darslar orqali o‘rganishi mumkin.',
          'Robot sensori ishlamayapti — muqobil yechim izlash, do‘stlardan yordam so‘rash.',
        ],
        rule: 'Har kim o‘z hayotining boshqaruvchisi: imkoniyatni kutmasdan, uni yaratishi va har qanday vaziyatda oqilona yo‘l tuta olishi kerak.',
      },
      {
        title: 'Maqola rejasi (10.44–10.45)',
        text: '200–300 so‘zli maqola:',
        table: {
          head: ['Qism', 'Mazmuni'],
          rows: [
            ['Kirish', 'imkoniyat nima va qanday paydo bo‘ladi?'],
            ['Asosiy qism', 'iroda va tirishqoqlik; muvaffaqiyatli shaxslar misoli; kutib o‘tirishning zarari'],
            ['Xulosa', 'har kim imkoniyatni o‘zi yaratishi kerak'],
          ],
        },
        note: 'Iqtiboslar: Milton Berl — «Agar imkoniyat taqillatmayotgan bo‘lsa, eshik quring»; Navoiy — «Har ne istarsen, o‘zingdin istagil».',
      },
      {
        title: 'Til sandig‘i: «qozondi»',
        text: 'Eshqobil Shukur «g‘alaba qozondi» birikmasidagi so‘z haqida:',
        list: [
          '«Devonu lug‘otit-turk»da qazg‘anch — «ishlab topish, kasb, daromad».',
          'G‘alaba ham, hurmat ham ishlab topiladi — shuning uchun «qozonmoq».',
          'Qadimda so‘z yolg‘iz kelgan: To‘nyuquq bitiktoshida «Eltarish xoqon qozonmasa...».',
          'Bu so‘zdan ism va joy nomlari: Amir Qazag‘an, Qazanjik.',
        ],
      },
      {
        title: 'Chorak takrori: imlo (1-topshiriq)',
        text: 'Noto‘g‘ri yozilganlarni tuzatamiz:',
        table: {
          head: ['Xato', 'To‘g‘ri'],
          rows: [
            ['doyir', 'doir'],
            ['mutoala', 'mutolaa'],
            ['shakil', 'shakl'],
            ['har doyim', 'har doim'],
            ['kundan-kun', 'kundan kunga'],
            ['hayir', 'xayr'],
            ['Oq qo‘rg‘on', 'Oqqo‘rg‘on'],
            ['asvalt', 'asfalt'],
          ],
        },
        note: 'To‘g‘ri yozilganlar: ta’m, mutoyiba, afv.',
      },
    ],
    pairs: [
      ['Temirni qizig‘ida', 'bos'],
      ['Izlagan', 'imkon topar'],
      ['qazg‘anch', 'Ishlab topish'],
      ['doir', 'To‘g‘ri yozilgan'],
      ['mutolaa', 'Kitob o‘qish'],
      ['asfalt', 'To‘g‘ri yozilgan'],
    ],
    quiz: [
      { q: '«Temirni qizig‘ida ...»', options: ['bos', 'qo‘y', 'sot', 'ol'], answer: 0 },
      { q: '«Qozonmoq» so‘zining qadimgi ma’nosi?', options: ['ishlab topmoq', 'ovqat pishirmoq', 'yutqazmoq', 'qochmoq'], answer: 0 },
      { q: 'To‘g‘ri yozilganini toping.', options: ['mutolaa', 'mutoala', 'mutola', 'mutoalaa'], answer: 0 },
      { q: '«Agar imkoniyat taqillatmasa, eshik quring» kimning so‘zi?', options: ['Milton Berl', 'Eynshteyn', 'Beruniy', 'Navoiy'], answer: 0 },
      { q: 'To‘g‘ri yozilgan joy nomi?', options: ['Oqqo‘rg‘on', 'Oq qo‘rg‘on', 'Oq-qo‘rg‘on', 'oqqo‘rg‘on'], answer: 0 },
      { q: 'Maqola necha so‘zdan iborat bo‘lishi kerak?', options: ['200–300', '20–30', '1000', '50'], answer: 0 },
    ],
    sort: {
      categories: ['To‘g‘ri yozilgan', 'Xato yozilgan'],
      items: [
        { text: 'doir', cat: 0 }, { text: 'doyir', cat: 1 },
        { text: 'shakl', cat: 0 }, { text: 'shakil', cat: 1 },
        { text: 'har doim', cat: 0 }, { text: 'har doyim', cat: 1 },
        { text: 'asfalt', cat: 0 }, { text: 'asvalt', cat: 1 },
        { text: 'ta’m', cat: 0 }, { text: 'hayir', cat: 1 },
      ],
    },
    qa: [
      { q: 'Imkoniyat nima?', a: 'Maqsadga erishish uchun yuzaga kelgan yoki yaratilgan qulay sharoit.' },
      { q: 'Nega imkoniyatni kutib o‘tirmaslik kerak?', a: 'Vaqt boy beriladi, orzular ro‘yobga chiqmay qoladi.' },
      { q: '«Holi yetmagan bo‘yrasida qolar» maqolini izohlang.', a: 'Imkoniyati, kuchi yetmagan odam o‘z holicha qoladi.' },
      { q: '«G‘alaba qozondi» birikmasidagi «qozon» qayerdan?', a: 'Qadimgi «qazg‘an» — ishlab topish, egallash.' },
      { q: 'Kitob yakunida nimalarni takrorladik?', a: 'Yordamchi so‘zlar, undov, taqlid, modal so‘zlar, o‘zlashmalar, rasmiy xat.' },
    ],
  },
];

/** Kontent xaritasi: fan → sinf → mavzular. Yangi fanlar shu yerga qo‘shiladi. */
/* --- 8-sinf Adabiyot: 1–11-darslar (darslik 2025, 4–52-betlar; BSB/CHSB kiritilmagan) --- */
const ADABIYOT_8 = [
  /* ===================== 1 ===================== */
  {
    id: 'adab-kirish',
    source: 'I chorak • 1-dars • 4–6-betlar',
    title: 'Kirish: davr, ijodkor va adabiyot',
    short: 'Badiiy matn, obraz va ijodkorning o‘z davriga munosabati',
    lesson: [
      {
        title: 'Badiiy matn nimasi bilan farq qiladi?',
        text: 'Ilmiy, ilmiy-ommabop yoki axborot matni voqelikni aniq faktlar bilan xabar qiladi. Badiiy matn esa hayotni obrazlar orqali qayta yaratadi, o‘quvchining his-tuyg‘ulariga ta’sir qiladi va uni o‘ylashga undaydi.',
        table: {
          head: ['Matn turi', 'Asosiy maqsadi', 'Tili'],
          rows: [
            ['Ilmiy', 'Bilim berish, isbotlash', 'Atamalar, aniq ta’riflar'],
            ['Axborot (xabar)', 'Yangilikni yetkazish', 'Qisqa, rasmiy'],
            ['Badiiy', 'Hayotni obrazlar orqali tasvirlash, ta’sir qilish', 'Obrazli: o‘xshatish, sifatlash, jonlantirish'],
          ],
        },
      },
      {
        title: 'Adabiyot — hayotning in’ikosi',
        rule: 'Badiiy adabiyot hayotning in’ikosi — tasviri, aksidir. Har bir ijodkor o‘zi yashagan davr voqealarini, uni quvontirgan yoki qayg‘uga solgan hodisalarni badiiy obrazlar vositasida qayta yaratadi.',
        ruleLabel: 'Asosiy fikr',
        text: 'Masalan, A. Chexovning «Xameleon» hikoyasidagi Ochumelov, uning yordamchisi va mo‘ltirab turgan it — hammasi obrazlardir. Muallif ular orqali o‘zi ko‘rgan yoki eshitgan hayotiy voqealarni ta’sirchan qilib qayta yaratgan.',
      },
      {
        title: 'Asarda nimalar aks etadi?',
        text: 'Ijodkor asarida uning orzu-intilishlari, ideallari, armonlari va asrlardan beri yashab kelayotgan milliy qadriyatlar akslanadi.',
        list: [
          '«Mehrobdan chayon» (A. Qodiriy) — o‘z davrining muhiti, adolatsizlik va sevgi.',
          '«O‘g‘ri» (A. Qahhor) — oddiy odamning ojizligi, amaldorlarning befarqligi.',
          '«Rahmat sizga, xonim» (L. Hyuz) — mehr va ishonch insonni o‘zgartirishi.',
        ],
        note: 'Har bir yozuvchi o‘z davri muammolari, millat dardi, erk va ozodlik haqida hikoya qiladi.',
      },
      {
        title: 'Detal va badiiy tasvir vositalari',
        text: 'Yozuvchi ko‘pchilik ilg‘amaydigan, arzimas ko‘rinadigan detallarga e’tibor beradi va ularni tasvir vositalari yordamida obraz darajasiga ko‘taradi. Masalan, Saida Zunnunova asfalt yorib chiqqan giyohni jonlantirib, qiyinchiliklarni yengish timsoliga aylantirgan.',
        table: {
          head: ['Vosita', 'Mohiyati', 'Muhammad Yusufning «Kuz» she’ridan'],
          rows: [
            ['Sifatlash', 'Narsaning belgisini obrazli ko‘rsatish', 'bargut yaproq, tillarang terakzorlar'],
            ['Jonlantirish', 'Jonsiz narsaga inson xususiyatini berish', 'terakzorlarning yig‘lashi, yaproqning yuragi'],
            ['O‘xshatish', 'Bir narsani boshqasiga qiyoslash', 'turnalarning arg‘imchoqdek uchishi'],
          ],
        },
        note: 'She’rda sokin kuz manzarasi orqali tabiat va inson umri o‘rtasidagi uyg‘unlik ko‘rsatilgan. She’r matnini darslikning 4–5-betidan o‘qing.',
      },
      {
        title: 'Ijodkor voqelikni qalb bilan ko‘radi',
        text: 'Bir voqea har bir insonda har xil tuyg‘u uyg‘otadi. Kimdir kuzda daraxtlarning zarg‘aldoq rangga burkanishidan zavqlanadi, boshqa birov uchun xazonrezgi umrning yana bir bahoridan ayrilish belgisi bo‘ladi.',
        rule: 'Ijodkor voqelikni ko‘z bilan emas, qalb bilan ko‘ruvchi insondir. Shuning uchun bir hodisaga turli ijodkorlar turlicha munosabat bildiradi.',
        ruleLabel: 'Xulosa',
      },
      {
        title: 'Bir davr — ikki xil nigoh',
        text: '1960–1970-yillarda fan jadal rivojlandi: Yuriy Gagarin birinchi bo‘lib koinotga uchdi, Nil Armstrong Oyga qadam qo‘ydi. Bu voqealarni ikki o‘zbek shoiri turlicha talqin qilgan.',
        table: {
          head: ['', 'Abdulla Oripov, «Asrimiz odami» (1964)', 'Erkin Vohidov, «Inson» (1973)'],
          rows: [
            ['Inson qanday ko‘rsatiladi', 'Hamma narsani istaydigan, olamga hokim bo‘lishni xohlaydigan zot', 'Koinot karvonining sarboni, olam sultoni'],
            ['Asosiy kayfiyat', 'O‘ylantiruvchi, savol beruvchi; baxt yonida g‘am ham bor', 'Faxr va ayni paytda ogohlantirish'],
            ['Ziddiyat', 'O‘tmishdagi odamlar bir burda non va ozodlikni orzu qilgan', 'Oyda yurgan inson Yerda nohaq qon to‘kmoqda'],
            ['Umumiy jihat', 'Insonning qudrati va mas’uliyati haqida o‘ylash', 'Insonning qudrati va mas’uliyati haqida o‘ylash'],
          ],
        },
        note: 'Topshiriq: ikki she’rning o‘xshash va farqli jihatlarini Venn diagrammasida ko‘rsating (darslik, 5–6-betlar).',
      },
      {
        title: 'O‘ylab ko‘ring',
        list: [
          'Badiiy asarda davrga xos ijtimoiy-ma’naviy muammolar qanday ifodalanadi?',
          'Adabiyot orqali o‘tmishni o‘rganish mumkinmi? Misollar bilan tushuntiring.',
          'Yozma ish: «Agar men yozuvchi bo‘lganimda...» mavzusida 5–7 gapdan iborat matn yozing.',
        ],
      },
    ],
    pairs: [
      ['Obraz', 'Asarda badiiy qayta yaratilgan shaxs yoki narsa'],
      ['Sifatlash', 'tillarang terakzorlar'],
      ['Jonlantirish', 'terakzorlar yig‘lashga tushdi'],
      ['O‘xshatish', 'turnalar arg‘imchoqdek uchdi'],
      ['Abdulla Oripov', '«Asrimiz odami»'],
      ['Erkin Vohidov', '«Inson»'],
      ['A. Qahhor', '«O‘g‘ri»'],
      ['A. Chexov', '«Xameleon»'],
    ],
    quiz: [
      { q: 'Badiiy adabiyot nimaning in’ikosi deb ta’riflanadi?', options: ['hayotning', 'faqat tarixning', 'ilmning', 'tabiatning'], answer: 0 },
      { q: 'Ijodkor voqelikni nima bilan ko‘radi deyiladi?', options: ['qalb bilan', 'faqat ko‘z bilan', 'kitob orqali', 'boshqalar orqali'], answer: 0 },
      { q: '«Terakzorlar yig‘lashga tushdi» — qaysi tasvir vositasi?', options: ['jonlantirish', 'sifatlash', 'o‘xshatish', 'mubolag‘a'], answer: 0 },
      { q: '«Tillarang terakzorlar» birikmasida qaysi vosita bor?', options: ['sifatlash', 'jonlantirish', 'takror', 'kinoya'], answer: 0 },
      { q: '«Asrimiz odami» she’rining muallifi kim?', options: ['Abdulla Oripov', 'Erkin Vohidov', 'G‘afur G‘ulom', 'Muhammad Yusuf'], answer: 0 },
      { q: '«Inson» she’ri qaysi yili yozilgan?', options: ['1973', '1964', '1945', '1991'], answer: 0 },
      { q: '«Xameleon» hikoyasidagi bosh obraz kim?', options: ['Ochumelov', 'Otabek', 'Ravshan', 'Tulki'], answer: 0 },
    ],
    sort: {
      categories: ['Badiiy matnga xos', 'Ilmiy matnga xos'],
      items: [
        { text: 'obrazlar', cat: 0 }, { text: 'aniq ta’riflar', cat: 1 },
        { text: 'jonlantirish', cat: 0 }, { text: 'atamalar', cat: 1 },
        { text: 'his-tuyg‘uga ta’sir', cat: 0 }, { text: 'isbot va dalil', cat: 1 },
        { text: 'o‘xshatish', cat: 0 }, { text: 'formulalar', cat: 1 },
      ],
    },
    qa: [
      { q: 'Nima uchun bir voqeaga turli ijodkorlar turlicha munosabat bildiradi?', a: 'Chunki ijodkor voqelikni o‘z his-tuyg‘ulari, dunyoqarashi va ideallari orqali, qalb bilan ko‘radi.' },
      { q: 'Detal nima va yozuvchi undan qanday foydalanadi?', a: 'Kichik, arzimas ko‘rinadigan belgi; yozuvchi uni tasvir vositalari bilan obrazga aylantiradi.' },
      { q: 'Abdulla Oripov va Erkin Vohidov she’rlaridagi umumiy jihat nima?', a: 'Ikkisi ham fan yutuqlari davrida insonning qudrati va mas’uliyati haqida o‘ylaydi.' },
      { q: 'Muhammad Yusufning «Kuz» she’rida tabiat nima bilan uyg‘unlashtirilgan?', a: 'Inson umri bilan.' },
      { q: 'Adabiyot orqali o‘tmishni o‘rganish mumkinmi?', a: 'Ha, asarlarda yozuvchi yashagan davr muhiti, muammolari va qadriyatlari aks etadi.' },
    ],
    odd: [
      { items: ['sifatlash', 'jonlantirish', 'o‘xshatish', 'kesim'], answer: 3, why: 'Kesim — gap bo‘lagi; qolganlari badiiy tasvir vositalari.' },
      { items: ['«Mehrobdan chayon»', '«O‘g‘ri»', '«Xameleon»', '«Inson»'], answer: 3, why: '«Inson» — she’r; qolganlari nasriy asarlar.' },
      { items: ['Abdulla Qodiriy', 'Abdulla Qahhor', 'Anton Chexov', 'Abdulla Oripov'], answer: 2, why: 'Chexov — rus yozuvchisi; qolganlari o‘zbek ijodkorlari.' },
      { items: ['ilmiy matn', 'axborot matni', 'badiiy matn', 'rasmiy hujjat'], answer: 2, why: 'Faqat badiiy matn obrazlar orqali ta’sir qiladi.' },
    ],
    debate: [
      { claim: 'Yozuvchi o‘z davridan tashqarida yashay olmaydi — har bir asar o‘z davrining ko‘zgusi.', pro: 'Asarda davr muhiti, muammolari va tili albatta aks etadi.', con: 'Ertak va fantastika davrdan uzilgan dunyoni ham tasvirlay oladi.' },
      { claim: 'Badiiy asar orqali tarixni darslikdan ham yaxshiroq o‘rganish mumkin.', pro: 'Asar odamlarning tuyg‘ularini ko‘rsatadi, tarix jonli bo‘ladi.', con: 'Yozuvchi to‘qima qo‘shadi, faktlar buzilishi mumkin.' },
    ],
    creative: [
      { task: 'Sinf xonasidagi bitta oddiy narsani (bo‘r, parta, deraza) tanlang va uni 2 ta jonlantirish bilan tasvirlab bering.', time: 90 },
      { task: 'Bugungi kunning qaysi voqeasi 50 yildan keyin she’rga mavzu bo‘ladi? Bir jumlada ayting va sababini tushuntiring.', time: 60 },
      { task: '«Agar men yozuvchi bo‘lganimda...» deb boshlanadigan 3 ta gap tuzing.', time: 90 },
    ],
  },

  /* ===================== 2 ===================== */
  {
    id: 'adab-hadislar',
    source: 'I chorak • 2-dars • 7–9-betlar',
    title: 'Hadislar',
    short: 'Muhaddislar, hadislar mazmuni va tarbiyaviy ahamiyati',
    lesson: [
      {
        title: 'Hadis nima?',
        rule: 'Hadis (arabcha — xabar, gap, yangilik) — payg‘ambarimiz Muhammad sollallohu alayhi vasallamning gaplari va amallari, u zot tasdiqlagan diniy-axloqiy ko‘rsatmalar. Hadis islom dinida Qur’oni karimdan keyin ikkinchi muqaddas manba hisoblanadi.',
        ruleLabel: 'Ta’rif',
        text: 'Kattalar, ustozlar va ota-onalar bolalarga hadis o‘rgatadi, chunki hadislar odob, mehr, halollik va ilmga chorlaydi.',
      },
      {
        title: 'Muhaddislar',
        text: 'Hadislarni yig‘ish, soxta va to‘qimalaridan ajratish, tizimlashtirish va avloddan avlodga yetkazish bilan shug‘ullangan olimlar muhaddislar deyiladi.',
        examples: ['Imom Buxoriy', 'Imom Termiziy', 'Imom Dorimiy', 'Abdulloh ibn Muborak', 'Ibn Hibbon', 'Haysam ibn Kulayb Shoshiy'],
        note: 'Imom al-Buxoriy maqbarasi Samarqandda, memorial muzeyi Buxoroda joylashgan.',
      },
      {
        title: '«Hadis ilmining sultoni»',
        text: 'Vatandoshimiz Imom Buxoriy «Hadis ilmining sultoni» degan sharafli nomga muyassar bo‘lgan.',
        table: {
          head: ['Asar', 'Ma’lumot'],
          rows: [
            ['«Al-jome’ as-sahih» («Sahihi Buxoriy»)', 'Hadis ilmidagi eng ulug‘ manbalardan biri'],
            ['O‘rni', 'Olti ishonchli hadis to‘plamidan biri'],
            ['Hajmi', '7000 dan ortiq hadis jamlangan'],
          ],
        },
      },
      {
        title: '1-hadis: salom va yarashish',
        text: 'Hadis mazmuni: musulmon kishining o‘z birodari bilan uch kundan ortiq arazlashib yurishi, uchrashganda teskari qarab ketishi yaxshi emas. Ulardan qaysi biri birinchi salom bersa, o‘sha yaxshi odamdir.',
        note: 'Maqsud Shayxzodaning to‘rtligida ham yaxshilarni tiriklik chog‘ida qadrlash, salomning salmog‘ini oqlash g‘oyasi bor (darslik, 8-bet). Nega aynan birinchi salom bergan kishi yaxshi odam deyilgan? Chunki u kibrini yengib, yarashishga birinchi qadam qo‘yadi.',
      },
      {
        title: '2-hadis: illatlardan saqlanish',
        text: 'Hadisda gumondan saqlanish buyuriladi, chunki eng yolg‘on so‘z — gumondir. Shuningdek, quyidagi illatlar qoralanadi:',
        list: ['badgumonlik', 'birovning aybini kovlashtirish va josuslik', 'hasad', 'bir-biriga orqa o‘girish, yomon ko‘rish'],
        rule: 'Hadis xulosasi: «Birodar bo‘linglar, Allohning bandalari!»',
        ruleLabel: 'Hadis xulosasi',
        note: 'Abdulla Oripovning «Hasadgo‘y» she’ri hadisning hasad haqidagi qismini ochib beradi: o‘g‘rini tarbiyalash, eng katta yovni yengish mumkin, ammo hasadgo‘yni daf qilib bo‘lmaydi.',
      },
      {
        title: '3-hadis: ilm — xazina',
        text: 'Hadis mazmuni: ilm — xazina, uning kaliti savoldir. So‘rashda to‘rt kishi savob oladi: so‘rovchi, javob beruvchi olim, eshituvchi va ularni do‘st tutuvchi.',
        poem: {
          lines: ['Bilmaganin so‘rab o‘rgangan olim,', 'Orlanib so‘ramagan o‘ziga zolim!'],
          author: 'Alisher Navoiy',
        },
      },
      {
        title: '4-hadis: yaxshilikka yaxshilik',
        text: 'Hadis mazmuni: kimga yaxshilik qilinsa, u ham yaxshilik qaytarsin. Qurbi yetmasa, yaxshilik qilgan kishini g‘oyibona maqtasin — maqtash tashakkur o‘rniga o‘tadi. Yaxshilikni yashirgan odam noshukurlik qilgan bo‘ladi. O‘zida yo‘q narsa bilan maqtangan esa ikki barobar yolg‘onchidir.',
        poem: {
          lines: ['Ki har kim ayon etsa yaxshi qiliq,', 'Yetar yaxshiliqdin anga yaxshiliq.'],
          author: 'Alisher Navoiy',
        },
        note: 'Hadislar Imom Buxoriyning «Sahihi Buxoriy» to‘plamidan olingan. Uyga vazifa: ota-onani hurmat qilish haqidagi hadislardan yod oling.',
      },
    ],
    pairs: [
      ['Hadis', 'Payg‘ambarimizning gaplari va amallari'],
      ['Muhaddis', 'Hadislarni yig‘ib tizimlashtirgan olim'],
      ['Imom Buxoriy', '«Hadis ilmining sultoni»'],
      ['«Al-jome’ as-sahih»', '7000 dan ortiq hadis'],
      ['Ilmning kaliti', 'savol'],
      ['Eng yolg‘on so‘z', 'gumon'],
      ['Yaxshi odam', 'birinchi salom bergan kishi'],
    ],
    quiz: [
      { q: '«Hadis» so‘zi arabchada nimani bildiradi?', options: ['xabar, gap', 'kitob', 'ibodat', 'qonun'], answer: 0 },
      { q: 'Islomda Qur’ondan keyingi ikkinchi muqaddas manba?', options: ['hadis', 'doston', 'tafsir', 'rivoyat'], answer: 0 },
      { q: '«Hadis ilmining sultoni» kim?', options: ['Imom Buxoriy', 'Imom Termiziy', 'Ibn Hibbon', 'Imom Dorimiy'], answer: 0 },
      { q: '«Al-jome’ as-sahih»da nechadan ortiq hadis bor?', options: ['7000', '700', '1000', '40'], answer: 0 },
      { q: 'Hadisga ko‘ra, ilmning kaliti nima?', options: ['savol', 'kitob', 'ustoz', 'sabr'], answer: 0 },
      { q: 'Hadisga ko‘ra, eng yolg‘on so‘z nima?', options: ['gumon', 'maqtanchoqlik', 'g‘iybat', 'qasam'], answer: 0 },
      { q: 'Arazlashganlardan qaysi biri yaxshi odam deyiladi?', options: ['avval salom bergani', 'yoshi kattasi', 'haq bo‘lgani', 'boyrog‘i'], answer: 0 },
      { q: '«Bilmaganin so‘rab o‘rgangan olim...» baytining muallifi?', options: ['Alisher Navoiy', 'Bobur', 'Lutfiy', 'Ogahiy'], answer: 0 },
    ],
    sort: {
      categories: ['Hadis chorlaydi', 'Hadis qoralaydi'],
      items: [
        { text: 'birinchi salom berish', cat: 0 }, { text: 'hasad', cat: 1 },
        { text: 'ilm so‘rash', cat: 0 }, { text: 'badgumonlik', cat: 1 },
        { text: 'yaxshilikni qaytarish', cat: 0 }, { text: 'josuslik', cat: 1 },
        { text: 'birodarlik', cat: 0 }, { text: 'yo‘q narsa bilan maqtanish', cat: 1 },
      ],
    },
    qa: [
      { q: 'Muhaddislar nima bilan shug‘ullangan?', a: 'Hadislarni yig‘ish, soxtalaridan ajratish, tizimlashtirish va avlodlarga yetkazish bilan.' },
      { q: 'Ilm so‘rashda qaysi to‘rt kishi savob oladi?', a: 'So‘rovchi, javob beruvchi olim, eshituvchi va ularni do‘st tutuvchi.' },
      { q: 'Yaxshilikka qurbi yetmagan odam nima qilishi kerak?', a: 'Yaxshilik qilgan kishini g‘oyibona maqtashi kerak.' },
      { q: 'Nega birinchi salom bergan kishi yaxshi odam deyiladi?', a: 'U kibrini yengib, yarashishga birinchi qadam qo‘yadi.' },
      { q: 'Imom Buxoriy maqbarasi qayerda?', a: 'Samarqandda.' },
    ],
    odd: [
      { items: ['Imom Buxoriy', 'Imom Termiziy', 'Imom Dorimiy', 'Alisher Navoiy'], answer: 3, why: 'Navoiy — shoir; qolganlari muhaddislar.' },
      { items: ['hasad', 'badgumonlik', 'josuslik', 'ilm so‘rash'], answer: 3, why: 'Ilm so‘rash — fazilat; qolganlari hadisda qoralangan illatlar.' },
      { items: ['salom', 'savol', 'gumon', 'tashakkur'], answer: 2, why: 'Gumon — eng yolg‘on so‘z; qolganlari hadisda maqtalgan.' },
    ],
    debate: [
      { claim: 'Arazlashganda birinchi bo‘lib salom berish — zaiflik emas, kuchlilik belgisi.', pro: 'O‘z kibrini yengish katta iroda talab qiladi.', con: 'Ba’zan aybdor tomon kechirim so‘rashi adolatli bo‘ladi.' },
      { claim: 'Bilmagan narsani so‘rashdan uyalish kerak emas.', pro: 'Ilmning kaliti savol; so‘ramagan o‘ziga zolim.', con: 'Avval o‘zi izlab ko‘rib, keyin so‘ragan ma’qul.' },
    ],
    creative: [
      { task: 'Hadisdagi «ilm — xazina, kaliti savol» fikrini rasm yoki sxema bilan doskada tasvirlang.', time: 120 },
      { task: 'Hasad yoki badgumonlik oqibatini ko‘rsatadigan 30 soniyalik kichik sahna tayyorlang.', time: 120 },
      { task: 'Birinchi salom berishga undaydigan qisqa shior (3–5 so‘z) o‘ylab toping.', time: 60 },
    ],
  },

  /* ===================== 3 ===================== */
  {
    id: 'adab-ravshan-1',
    source: 'I chorak • 3-dars • 10–17-betlar',
    title: '«Ravshan» dostoni: doston janri',
    short: 'Doston janri, baxshilar, Ravshanning safarga otlanishi',
    lesson: [
      {
        title: 'Doston nima?',
        rule: 'Doston (forscha — qissa, hikoya, tarix, el orasida mashhur bo‘lmoq) — xalq og‘zaki ijodining she’riy va nasriy qismlardan tarkib topgan yirik epik janri.',
        ruleLabel: 'Ta’rif',
        text: 'Doston quyidagi xususiyatlari bilan boshqa janrlardan ajralib turadi:',
        list: [
          'She’riy hamda nasriy yo‘lda yaratilgan qismlardan tarkib topadi.',
          'Og‘zaki ijod mahsuli bo‘lib, avloddan avlodga o‘tib keladi.',
          'Tarixiy, afsonaviy va mo‘jizaviy voqealar asosiga quriladi.',
          'Maxsus ijrochilar — baxshilar ijro etadi.',
        ],
      },
      {
        title: 'Baxshi va do‘mbira',
        text: 'Baxshilar dostonni yoddan, do‘mbira jo‘rligida kuylaydi. Do‘mbira — xalq dostonlarini kuylashda ishlatiladigan cholg‘u asbobi. «Alla», «Yor-yor», «Omonyor» kabi qo‘shiqlar kabi dostonlar ham xalq og‘zaki ijodi namunasidir.',
        table: {
          head: ['«Ravshan» dostoni', 'Ma’lumot'],
          rows: [
            ['Kuylagan baxshi', 'Ergash Jumanbulbul o‘g‘li (dostonni otasidan o‘rgangan)'],
            ['Yozib olgan', 'Folklorshunos Hodi Zarif, 1928-yil'],
            ['Nashr etilgan', '1941-yil'],
            ['Turkum', '«Go‘ro‘g‘li» turkumi dostonlaridan'],
          ],
        },
      },
      {
        title: 'Dostonning boshlanishi',
        text: 'Chambil elida Go‘ro‘g‘libek davr suradi. Uning farzandi bo‘lmaydi, shuning uchun Hasanxon va Avazxonni o‘g‘il qilib oladi, Yunus va Misqol parilar ularni tarbiyalaydi. Hasanxonning o‘g‘li Ravshanbek, Avazxonning qizi Gulanor dunyoga keladi.',
        table: {
          head: ['Qahramon', 'Kim?'],
          rows: [
            ['Go‘ro‘g‘libek', 'Chambil hukmdori, Ravshanning bobosi'],
            ['Hasanxon', 'Ravshanning otasi, mard polvon'],
            ['Xon Dalli', 'Ravshanning onasi'],
            ['Avazxon', 'Go‘ro‘g‘lining ikkinchi o‘g‘li, Gulanorning otasi'],
            ['Yunus pari', 'Ravshanga sehrli uzuk bergan momosi'],
          ],
        },
      },
      {
        title: 'Rad etilgan sovchilik',
        text: 'Go‘ro‘g‘libek 13 yoshli Ravshanga Gulanorni so‘rab Avazxonga sovchi bo‘lib boradi. Avazxon jahl bilan rad etadi: Ravshanni o‘ziga teng ko‘rmaydi. Eshik orqasida turgan Ravshan bu gaplarni eshitib, qattiq ranjiydi.',
        note: '«Bizni quzg‘un, o‘zini lochin tutdi» — Ravshan shunday deydi. Quzg‘un — o‘limtikxo‘r qush, lochin — ovchi, chaqqon qush. Bu iborada kamsitilganlik alami bor.',
      },
      {
        title: 'Sehrli uzuk',
        text: 'Yunus pari yig‘layotgan Ravshanga xosiyatli uzugini berib, yupatadi. Uzuk ko‘zida dunyodagi go‘zal qizlarning ismi va surati bor. Ravshan unda Shirvon podshosi Qoraxonning qizi Zulxumorni ko‘rib, g‘oyibona oshiq bo‘ladi va Jiyronqush otini egarlab, Shirvonga yo‘l oladi.',
        rule: 'Sehrli uzuk, parilar, uch oylik yo‘lni bosib o‘tish — dostonga xos afsonaviy-mo‘jizaviy unsurlar.',
        ruleLabel: 'E’tibor bering',
      },
      {
        title: 'Ota nasihati',
        text: 'Darvozada otasi Hasanxon uni to‘xtatadi. Ravshan uyalib bo‘lsa-da, dardini aytadi: «Yor deyman-ku, nomus-orga boraman». Hasanxon yolg‘iz o‘g‘lini uch oylik, suvsiz cho‘ldan o‘tadigan dushman eliga yuborishga qiynaladi, lekin mard emasmi, oq fotiha beradi.',
        list: [
          'Ota-onaning qadrini unutma.',
          'O‘zingdan pastlar bilan har yo‘lga ketma.',
          'Oldingdan kim chiqsa, salomsiz o‘tma.',
          'G‘aribni ko‘rsang, zinhor og‘ritma.',
          'Yaxshilik qil, yomonlikni ot.',
        ],
        note: 'Ota-o‘g‘il suhbatida xalqimizga xos an’analar — oq fotiha, ota duosi, kattalarga hurmat aks etgan.',
      },
      {
        title: 'O‘ylab ko‘ring',
        list: [
          'Go‘ro‘g‘li qanday inson? Fikringizni asoslang.',
          '«Shirin so‘zli, quralay ko‘zli, uzun bo‘yli» kabi birikmalarning qofiyalanib kelishi qanday maqsadga xizmat qiladi?',
          'Hasanxon o‘g‘lini yolg‘iz yuborib to‘g‘ri qildimi?',
          'Dostondagi maqol va iboralarni daftaringizga yozing.',
        ],
      },
    ],
    pairs: [
      ['Doston', 'Xalq og‘zaki ijodining yirik epik janri'],
      ['Baxshi', 'Dostonni kuylovchi xalq ijrochisi'],
      ['Do‘mbira', 'Doston kuylanadigan cholg‘u'],
      ['Hodi Zarif', '1928-yilda dostonni yozib olgan'],
      ['Ergash Jumanbulbul o‘g‘li', 'Dostonni kuylagan baxshi'],
      ['Jiyronqush', 'Ravshanning oti'],
      ['Zulxumor', 'Qoraxonning qizi'],
      ['Gulanor', 'Avazxonning qizi'],
    ],
    quiz: [
      { q: '«Doston» so‘zi qaysi tildan olingan?', options: ['fors', 'arab', 'turk', 'rus'], answer: 0 },
      { q: 'Dostonni kim ijro etadi?', options: ['baxshi', 'hofiz', 'masxaraboz', 'qissaxon'], answer: 0 },
      { q: '«Ravshan» dostonini kim yozib olgan?', options: ['Hodi Zarif', 'Fozil Yo‘ldosh', 'Abdulla Qodiriy', 'Hamid Olimjon'], answer: 0 },
      { q: 'Avazxon qizini Ravshanga bermaslik sababi?', options: ['o‘ziga teng ko‘rmadi', 'qizi kichik edi', 'Ravshan kambag‘al edi', 'qizi boshqaga unashtirilgan'], answer: 0 },
      { q: 'Ravshan Zulxumorni qayerda ko‘radi?', options: ['sehrli uzukda', 'tushida', 'bozorda', 'to‘yda'], answer: 0 },
      { q: 'Ravshanning otini toping.', options: ['Jiyronqush', 'G‘irko‘k', 'Boychibor', 'Majnunko‘k'], answer: 0 },
      { q: 'Zulxumorning otasi kim?', options: ['Qoraxon', 'Avazxon', 'Hasanxon', 'Go‘ro‘g‘li'], answer: 0 },
      { q: 'Shirvongacha necha oylik yo‘l?', options: ['uch oylik', 'bir oylik', 'bir yillik', 'bir haftalik'], answer: 0 },
    ],
    sort: {
      categories: ['Hayotiy unsur', 'Afsonaviy-mo‘jizaviy unsur'],
      items: [
        { text: 'sovchilik', cat: 0 }, { text: 'Yunus pari', cat: 1 },
        { text: 'ota nasihati', cat: 0 }, { text: 'sehrli uzuk', cat: 1 },
        { text: 'maktabda o‘qish', cat: 0 }, { text: 'Ko‘hiqof tog‘i', cat: 1 },
        { text: 'oq fotiha', cat: 0 }, { text: 'Iram bog‘i', cat: 1 },
      ],
    },
    qa: [
      { q: 'Dostonning to‘rtta xususiyatini ayting.', a: 'She’riy va nasriy qismlar; og‘zaki, avloddan avlodga o‘tadi; tarixiy-afsonaviy voqealar; baxshilar ijro etadi.' },
      { q: 'Ravshan nega Shirvonga ketishga qaror qiladi?', a: 'Avazxon kamsitgani uchun va sehrli uzukda Zulxumorni ko‘rib oshiq bo‘lgani uchun.' },
      { q: '«Yor deyman-ku, nomus-orga boraman» satridan Ravshan qanday tasavvur qilinadi?', a: 'G‘ururli, or-nomusli, qat’iyatli yigit sifatida.' },
      { q: 'Hasanxon o‘g‘liga qanday nasihatlar qiladi?', a: 'Ota-onani unutmaslik, salomsiz o‘tmaslik, g‘aribni og‘ritmaslik, yaxshilik qilish.' },
      { q: 'Go‘ro‘g‘libek nega Hasanxon va Avazxonni o‘g‘il qilib olgan?', a: 'Chunki o‘zining farzandi bo‘lmagan.' },
    ],
    sequences: [
      {
        title: 'Voqealarni tartib bilan joylang',
        items: [
          'Go‘ro‘g‘libek Hasanxon va Avazxonni o‘g‘il qilib oladi',
          'Go‘ro‘g‘li Gulanorni so‘rab sovchi bo‘ladi',
          'Avazxon qizini bermaydi',
          'Yunus pari Ravshanga sehrli uzuk beradi',
          'Ravshan uzukda Zulxumorni ko‘radi',
          'Hasanxon o‘g‘liga oq fotiha beradi',
        ],
      },
    ],
    odd: [
      { items: ['Hasanxon', 'Avazxon', 'Go‘ro‘g‘libek', 'Qoraxon'], answer: 3, why: 'Qoraxon — Shirvon podshosi, dushman tomon; qolganlari Chambil ahli.' },
      { items: ['Yunus pari', 'Misqol pari', 'Zulxumor', 'Ko‘hiqof'], answer: 2, why: 'Zulxumor — oddiy inson qiz; qolganlari afsonaviy olam unsurlari.' },
      { items: ['baxshi', 'do‘mbira', 'doston', 'mikrofon'], answer: 3, why: 'Mikrofon — zamonaviy texnika; qolganlari doston ijrosiga oid.' },
    ],
    debate: [
      { claim: 'Avazxon qizini bermay to‘g‘ri qildi — qizning taqdirini otasi hal qilishi kerak.', pro: 'Ota qizining kelajagi uchun mas’ul.', con: 'U o‘z otasining so‘zini sindirdi va Ravshanni nohaq kamsitdi.' },
      { claim: 'Hasanxon 13 yoshli o‘g‘lini yolg‘iz yubormasligi kerak edi.', pro: 'Yo‘l uch oylik, dushman eli — xavf juda katta.', con: 'Mard o‘g‘il o‘z yo‘lini o‘zi tanlashi, sinovdan o‘tishi kerak.' },
    ],
    creative: [
      { task: 'Ravshan Shirvonga ketishdan oldin onasi Xon Dalliga xat yozdi deb tasavvur qiling. 3 jumlada aytib bering.', time: 90 },
      { task: 'Dostondagi «Tuya hammomni orzu qilibdi» kabi bitta maqolni jest bilan ko‘rsating, sinf topsin.', time: 60 },
      { task: 'Sehrli uzuk bugun yaratilsa, unda nima bo‘lardi? Uning xosiyatini 2 gapda tasvirlang.', time: 60 },
    ],
  },

  /* ===================== 4 ===================== */
  {
    id: 'adab-ravshan-2',
    source: 'I chorak • 4-dars • 18–25-betlar',
    title: '«Ravshan» dostoni: muhokama',
    short: 'Shirvon bozori, Zulxumor, zindon va to‘rt kal',
    lesson: [
      {
        title: 'Shirvon bozorida',
        text: 'Ravshan cho‘l-u biyobonlardan o‘tib Shirvonga yetadi va bir kampirga o‘g‘il tutinib yashaydi. U Zulxumor har bozor kuni ko‘shk ustida qalpoq sotishini, yigitlar uni ko‘rish uchun bir lagan tilla «ko‘rmana» berishini bilib oladi.',
        list: [
          'Ravshan bozorma-bozor «Qalpoq bozori qaysidir?» deb so‘rab yuradi.',
          'Un, jun, mis, go‘sht, qovun, choy, toy bozorlari birma-bir sanaladi.',
          'Bozorlarning xilma-xilligi Shirvonning katta va obod shahar ekanini ko‘rsatadi.',
        ],
        note: 'Bir xil satr («Qalpoq bozori qaysidir?») takrorlanib turadi — bu xalq og‘zaki ijodiga xos naqarot.',
      },
      {
        title: 'Zulxumor portreti',
        text: 'Baxshi Zulxumorni xalq og‘zaki ijodiga xos mubolag‘ali o‘xshatishlar bilan tasvirlaydi: yuzi oyday, tishlari durday, ko‘zlari yulduzday, qoshlari yangi oyday. Uning 190 ta kokili bor, yarmi tilla, yarmi kumush suviga botirilgan.',
        rule: 'Portret — qahramonning tashqi qiyofasi tasviri. Dostonlarda portret ko‘pincha mubolag‘a va turkum o‘xshatishlar orqali chiziladi.',
        ruleLabel: 'Nazariya',
      },
      {
        title: 'Bog‘dagi uchrashuv',
        text: 'Ravshan Zulxumorni ko‘rib o‘zini yo‘qotadi, kechasi qizlar ortidan bog‘ga boradi va gul orasiga yashirinadi. Qizlar uni topib olishadi. Tillasi yo‘q Ravshan ko‘rmana o‘rniga sehrli uzukni yuboradi.',
        list: [
          'Zulxumor uzukda o‘z ismi va suratini ko‘radi.',
          'U uzuk yozuvini taqdir bitigi deb biladi.',
          'Yigitning chin oshiq ekanini sezib, uni qabul qiladi.',
        ],
      },
      {
        title: 'Hasad va zindon',
        text: 'Ravshanga ko‘ngil qo‘ygan, lekin e’tiborini qozona olmagan hasadgo‘y kaniz Oqqiz voqeani Zulxumorning onasiga aytadi. Qoraxon Ravshanni osishga buyuradi. Shirvon kattalari esa maslahat beradi: yigitni qirq kun zindonda saqlab, so‘ng dinimizga kirsa — kuyov qilish, ko‘nmasa — osish.',
        note: 'Bu yerda hadislar darsidagi hasad illati qanday falokat keltirishini ko‘ramiz.',
      },
      {
        title: 'Mayna olib kelgan xat',
        text: 'Zulxumor Ravshanning ota-onasiga xat yozadi. Mayna qushi xatni Chambilga — Xon Dallining qo‘liga olib boradi. Qirq kunlik muhlatning yigirma kuni o‘tgan. Hasanxon Go‘ro‘g‘lining G‘irko‘k otini minib, yolg‘iz o‘zi Shirvonga jo‘naydi.',
        rule: 'Qushning xat tashishi, otning odamdek tushunishi — dostondagi mo‘jizaviy motivlar. Hasanxonning yo‘li she’riy shaklda, shiddatli ritm bilan kuylanadi.',
        ruleLabel: 'E’tibor bering',
      },
      {
        title: 'To‘rt aka-uka kallar',
        text: 'Ravshan o‘g‘il tutingan kampirning olti o‘g‘li bo‘lgan, ular o‘lib ketgan. Katta o‘g‘lining sodiq polvoni Aynoq kal ukalari bilan Ravshanni qutqarishga va’da beradi.',
        table: {
          head: ['Kal', 'Xususiyati'],
          rows: [
            ['Aynoq kal', 'Eng zo‘r polvon, mingga barobar; ot ham uni ko‘tarolmaydi'],
            ['Jaynoq kal', 'Masxaraboz, har qiyofaga kira oladi'],
            ['Ersak kal', 'Mergan, qushni ko‘zidan uradi'],
            ['Tersak kal', 'Sinchi: tulporni suyagidan, o‘tkir qilichni qinidan taniydi'],
          ],
        },
        note: 'Tersak kal «devona» qiyofasidagi Hasanxonni sinchiklab qarab taniydi: «Shu o‘tirgan Hasan shunqor ekandi».',
      },
      {
        title: 'O‘ylab ko‘ring',
        list: [
          'Bozorlarning bunchalik ko‘p sanalishi nimani anglatadi?',
          'Zulxumor Ravshanni nima uchun qabul qildi?',
          'Oqqiz obrazi orqali baxshi qanday illatni qoralagan?',
          'Aka-uka kallar sizda qanday taassurot uyg‘otdi?',
        ],
      },
    ],
    pairs: [
      ['Ko‘rmana', 'Zulxumorni ko‘rish uchun beriladigan tilla'],
      ['Oqqiz', 'Hasadgo‘y kaniz'],
      ['Mayna', 'Xatni Chambilga yetkazgan qush'],
      ['G‘irko‘k', 'Go‘ro‘g‘lining oti'],
      ['Aynoq kal', 'Mingga barobar polvon'],
      ['Jaynoq kal', 'Masxaraboz, qiyofa o‘zgartiruvchi'],
      ['Ersak kal', 'Mergan'],
      ['Tersak kal', 'Sinchi'],
    ],
    quiz: [
      { q: 'Zulxumor bozorda nima sotardi?', options: ['qalpoq', 'gilam', 'ipak', 'non'], answer: 0 },
      { q: 'Ravshan ko‘rmana sifatida nima yuboradi?', options: ['sehrli uzuk', 'bir lagan tilla', 'qilich', 'otini'], answer: 0 },
      { q: 'Ravshanning sirini kim fosh qiladi?', options: ['Oqqiz', 'Kampir', 'Jaynoq kal', 'Zulxumor'], answer: 0 },
      { q: 'Ravshanga necha kun muhlat beriladi?', options: ['qirq kun', 'uch kun', 'yetti kun', 'bir yil'], answer: 0 },
      { q: 'Xatni Chambilga kim yetkazadi?', options: ['mayna', 'kabutar', 'Yunus pari', 'chopar'], answer: 0 },
      { q: 'Hasanxon Shirvonga qaysi otda boradi?', options: ['G‘irko‘k', 'Jiyronqush', 'Boychibor', 'Qorabayir'], answer: 0 },
      { q: 'Tulporni suyagidan taniydigan sinchi kal?', options: ['Tersak', 'Ersak', 'Jaynoq', 'Aynoq'], answer: 0 },
      { q: 'Zulxumorning nechta kokili bor edi?', options: ['190', '40', '99', '12'], answer: 0 },
    ],
    sort: {
      categories: ['Ravshanga yordam berdi', 'Ravshanga ziyon yetkazdi'],
      items: [
        { text: 'Zulxumor', cat: 0 }, { text: 'Oqqiz', cat: 1 },
        { text: 'mayna', cat: 0 }, { text: 'Qoraxon', cat: 1 },
        { text: 'Aynoq kal', cat: 0 }, { text: 'Oqqizning onasi', cat: 1 },
        { text: 'kampir ona', cat: 0 }, { text: 'jallodlar', cat: 1 },
      ],
    },
    qa: [
      { q: 'Zulxumor Ravshanni nega qabul qildi?', a: 'Uzukdagi yozuvni taqdir bitigi deb bildi va yigitning chin oshiq ekanini sezdi.' },
      { q: 'Shirvon kattalari Qoraxonga qanday maslahat berdi?', a: 'Ravshanni qirq kun zindonda saqlab, dinimizga kirsa kuyov qilish, ko‘nmasa osish.' },
      { q: 'Aynoq kal nega Ravshanni qutqarishga rozi bo‘ldi?', a: 'Kampirning katta o‘g‘lidan yaxshilik ko‘rgani, tuzini ko‘p yegani uchun.' },
      { q: '«Qalpoq bozori qaysidir?» satrining takrorlanishi nimani beradi?', a: 'Naqarot vazifasini bajaradi, ohangdorlik va ta’sirchanlikni oshiradi.' },
      { q: 'Hasanxon Shirvonga yetganda muhlatdan necha kun qolgan edi?', a: 'Xat kelganda yigirma kun o‘tgan, ya’ni taxminan yigirma kun qolgan edi.' },
    ],
    sequences: [
      {
        title: 'Voqealarni tartib bilan joylang',
        items: [
          'Ravshan bozorda Zulxumorni ko‘radi',
          'Ravshan bog‘da gul orasiga yashirinadi',
          'Zulxumor uzukda o‘z suratini ko‘radi',
          'Oqqiz sirni fosh qiladi',
          'Ravshan qirq kunga zindonga tashlanadi',
          'Mayna xatni Chambilga olib boradi',
          'Hasanxon G‘irko‘kda Shirvonga yo‘l oladi',
        ],
      },
    ],
    odd: [
      { items: ['Aynoq', 'Jaynoq', 'Ersak', 'Oqqiz'], answer: 3, why: 'Oqqiz — hasadgo‘y kaniz; qolganlari Ravshanga yordam bergan aka-uka kallar.' },
      { items: ['un bozori', 'mis bozori', 'qalpoq bozori', 'kitob bozori'], answer: 3, why: 'Dostonda kitob bozori sanalmaydi.' },
      { items: ['mayna', 'G‘irko‘k', 'sehrli uzuk', 'zindon'], answer: 3, why: 'Zindon — oddiy joy; qolganlari dostondagi mo‘jizaviy unsurlar.' },
    ],
    debate: [
      { claim: 'Ravshan bog‘ga yashirincha kirib noto‘g‘ri ish qildi.', pro: 'Begona bog‘ga, qizlar oldiga ruxsatsiz kirish odobga zid.', con: 'Doston qahramoni uchun bu chin muhabbat va jasorat belgisi.' },
      { claim: 'Oqqiz — dostondagi eng xavfli obraz, Qoraxondan ham xavfliroq.', pro: 'Hasad tufayli barcha falokat boshlandi.', con: 'Hukmni chiqargan va jazoga buyurgan Qoraxon.' },
    ],
    creative: [
      { task: 'Ravshan zindondan Zulxumorga yuborgan maktubning dastlabki 2 gapini o‘ylab toping.', time: 90 },
      { task: 'To‘rt kalning biri bo‘lib, o‘zingizni 15 soniyada tanishtiring — sinf qaysi kal ekanini topsin.', time: 60 },
      { task: 'Shirvon bozoridagi bitta sotuvchi bo‘lib, mahsulotingizni dostoncha qofiyali ikki satrda maqtang.', time: 90 },
    ],
  },

  /* ===================== 5 ===================== */
  {
    id: 'adab-ravshan-3',
    source: 'I chorak • 5-dars • 26–31-betlar',
    title: '«Ravshan» dostoni: topshiriqlar, ijodiy ish',
    short: 'Dor maydoni, jang, nikoh va dostonga yakuniy tahlil',
    lesson: [
      {
        title: 'Dor maydonida',
        text: 'Qirq kunlik muhlat tugaydi. Ravshanni bo‘yniga zanjir solib, ko‘zini bog‘lab dor ostiga olib kelishadi. Bir tomonda Zulxumor, bir tomonda kampir ona yig‘laydi. Hasanxon eski to‘n kiyib, «devona» qiyofasida G‘irko‘k ustida kutib turadi.',
        list: [
          'Vazirlar Ravshanga: «Qoraxonning diniga kirsang, Zulxumorni olib beramiz», deydi.',
          'Ravshan rad etadi: «Men o‘lmasam, o‘z elimdan kechmayman!»',
          'Uning yagona tilagi — ko‘zini ochib, yorug‘ dunyoni bir ko‘rish.',
        ],
      },
      {
        title: 'Ravshan nega yig‘lab yubordi?',
        text: 'Podshoga keskin javob berishdan qo‘rqmagan Ravshan otasini ko‘rib, yig‘lab yuboradi va qiynalgan kunlarini she’r bilan aytadi.',
        rule: 'Dushman oldida qahramon mard va qat’iy, ota oldida esa bola. Bu qarama-qarshilik obrazni hayotiy va ta’sirchan qiladi.',
        ruleLabel: 'Tahlil',
      },
      {
        title: 'Jang va g‘alaba',
        text: 'Hasanxon na’ra tortadi, kallar bilan birga dushman qo‘shiniga tashlanadi. Jang tasviri she’riy yo‘lda, tez ritm va takrorlar bilan beriladi. G‘irko‘k ham jangga qo‘shilib, dushmanni tishlaydi. Qoraxon qochadi, Hasanxon uni quvib yetib o‘ldiradi.',
        note: 'Savol: nega shiddatli voqealar she’riy yo‘lda ifodalangan? Javob: she’rdagi ohang va takrorlar jangning tezligi va hayajonini kuchaytiradi.',
      },
      {
        title: 'Dostonning yakuni',
        list: [
          'Hasanxon omon so‘raganlarga omonlik beradi, el-yurt tinchiydi.',
          'Shirvonda qirq kun to‘y qilinib, Zulxumor Ravshanga nikohlanadi.',
          'Hasanxon Shirvonni kallarga topshiradi: Aynoq — podsho, ukalari — vazir va mahram.',
          'Ravshan Zulxumor bilan Chambilga qaytadi, Go‘ro‘g‘libek yana qirq kun to‘y beradi.',
        ],
        note: 'Savol: nega Hasanxon Shirvonga o‘g‘lini emas, kallarni podsho qildi? Siz qanday yo‘l tutardingiz?',
      },
      {
        title: 'Xalq og‘zaki ijodiga xos belgilar',
        table: {
          head: ['Belgi', 'Dostondan misol', 'Mazmuni'],
          rows: [
            ['Raqamlar takrori', 'qirq kun to‘y, qirq yigit, qirq kun muhlat', 'Dabdaba, ko‘plik, muqaddas son'],
            ['Mubolag‘a', 'Aynoq kalni ot ham ko‘tarolmaydi', 'Qahramon kuchini bo‘rttirish'],
            ['Naqarot', '«...maydon ichinda», «Qalpoq bozori qaysidir?»', 'Ohangdorlik, ta’sirchanlik'],
            ['Turkum o‘xshatishlar', 'yuzi oyday, tishlari durday', 'Go‘zallikni ulug‘lash'],
            ['Maqol va iboralar', '«Yolg‘iz bola yovdan yomon»', 'Xalq donoligi'],
            ['Mo‘jizaviy unsur', 'sehrli uzuk, mayna, parilar', 'Afsonaviylik'],
          ],
        },
      },
      {
        title: 'Qahramonlarni qiyoslaymiz',
        table: {
          head: ['Qahramon', 'Fazilatlari'],
          rows: [
            ['Ravshan', 'Qahramonlik, jasurlik, mag‘rurlik, sadoqat, or-nomus'],
            ['Hasanxon', 'Mardlik, otalik mehri, donolik, adolat'],
            ['Aynoq kal va ukalari', 'Sadoqat, vafo, tuz haqqini unutmaslik, do‘stlik'],
            ['O‘xshash jihat', 'Hammasi mard, so‘zida turadi, yaxshilikka xizmat qiladi'],
          ],
        },
      },
      {
        title: 'Muhokama va ijodiy ish',
        list: [
          'Dostondagi qaysi obrazlarda odamiylik va do‘stlik xususiyatlarini kuzatdingiz?',
          'Agar aka-uka kallar bo‘lmaganda, voqealar qanday davom etardi?',
          'Dostondagi voqealar tarixda yuz bergan bo‘lishi mumkinmi?',
          'Ijodiy ish: dostondagi bir maqolni sun’iy intellekt yordamida rasmga aylantiring yoki o‘zingiz chizing.',
        ],
      },
    ],
    pairs: [
      ['Devona qiyofasi', 'Hasanxon dor maydonida'],
      ['Qirq kun to‘y', 'Raqamlar takrori'],
      ['Aynoq kal', 'Shirvon podshosi bo‘ldi'],
      ['Naqarot', '«...maydon ichinda»'],
      ['Mubolag‘a', 'Aynoqni ot ko‘tarolmaydi'],
      ['Qoraxon', 'Hasanxon quvib o‘ldiradi'],
      ['Ravshan', 'Zulxumorga uylanadi'],
    ],
    quiz: [
      { q: 'Hasanxon dor maydoniga qanday qiyofada keladi?', options: ['devona', 'savdogar', 'baxshi', 'askar'], answer: 0 },
      { q: 'Vazirlar Ravshanga qanday shart qo‘yadi?', options: ['Qoraxonning diniga kirish', 'tilla to‘lash', 'Shirvondan ketish', 'kallarni topshirish'], answer: 0 },
      { q: 'Ravshanning so‘nggi tilagi nima edi?', options: ['ko‘zini ochib dunyoni ko‘rish', 'otasini chaqirish', 'Zulxumor bilan gaplashish', 'ozod qilinish'], answer: 0 },
      { q: 'Ravshan kimni ko‘rib yig‘lab yuboradi?', options: ['otasini', 'Zulxumorni', 'kampirni', 'Qoraxonni'], answer: 0 },
      { q: 'Qoraxonni kim o‘ldiradi?', options: ['Hasanxon', 'Ravshan', 'Aynoq kal', 'Ersak kal'], answer: 0 },
      { q: 'Shirvon podshosi qilib kim tayinlanadi?', options: ['Aynoq kal', 'Ravshan', 'Hasanxon', 'Zulxumor'], answer: 0 },
      { q: '«Qirq kun to‘y» qaysi xalq og‘zaki ijodi belgisi?', options: ['raqamlar takrori', 'jonlantirish', 'kinoya', 'tazod'], answer: 0 },
    ],
    sort: {
      categories: ['Nasriy qismda berilgan', 'She’riy qismda berilgan'],
      items: [
        { text: 'kallarning maslahati', cat: 0 }, { text: 'jang tasviri', cat: 1 },
        { text: 'Hasanxonning yo‘lga chiqishi (tafsilot)', cat: 0 }, { text: 'Ravshanning otasiga arzi', cat: 1 },
        { text: 'nikoh va to‘y haqida xabar', cat: 0 }, { text: 'Hasanxonning kallarga murojaati', cat: 1 },
      ],
    },
    qa: [
      { q: 'Nega Hasanxon devona qiyofasida keldi?', a: 'Dushman tanib qolmasligi va kutilmaganda hujum qilish uchun.' },
      { q: 'Ravshan qirq kunlik bandilikdan qanday saboq chiqardi?', a: 'Ota-ona va el qadrini angladi, yolg‘izlik va o‘ylamay qilingan ishning og‘irligini his qildi.' },
      { q: 'Nega jang tasviri she’riy yo‘lda berilgan?', a: 'Ohang va takrorlar jangning shiddatini, hayajonini kuchaytiradi.' },
      { q: 'Dostondan uchta xalq og‘zaki ijodi belgisini ayting.', a: 'Raqamlar takrori, mubolag‘a, naqarot (yoki turkum o‘xshatishlar, maqollar).' },
      { q: 'Ravshan, Hasanxon va kallarning umumiy fazilati nima?', a: 'Mardlik va sadoqat: so‘zida turadi, yaxshilikka xizmat qiladi.' },
    ],
    sequences: [
      {
        title: 'Dostonning yakuniy voqealari',
        items: [
          'Ravshanni dor ostiga olib kelishadi',
          'Ravshan Qoraxonning diniga kirishni rad etadi',
          'Ravshan otasini ko‘rib yig‘laydi',
          'Hasanxon va kallar jang qiladi',
          'Hasanxon Qoraxonni quvib o‘ldiradi',
          'Shirvonda qirq kun to‘y bo‘ladi',
          'Ravshan Zulxumor bilan Chambilga qaytadi',
        ],
      },
      {
        title: 'Butun doston: asosiy voqealar',
        items: [
          'Avazxon sovchini qaytaradi',
          'Ravshan sehrli uzukda Zulxumorni ko‘radi',
          'Ravshan Shirvon bozoriga keladi',
          'Oqqiz sirni fosh qiladi',
          'Mayna xatni Chambilga yetkazadi',
          'Hasanxon o‘g‘lini dor ostidan qutqaradi',
        ],
      },
    ],
    odd: [
      { items: ['qirq kun to‘y', 'qirq kun muhlat', 'qirq yigit', 'yetti yoshda'], answer: 3, why: 'Qolganlarida «qirq» soni takrorlangan.' },
      { items: ['Ravshan', 'Hasanxon', 'Aynoq kal', 'Qoraxon'], answer: 3, why: 'Qoraxon — salbiy obraz; qolganlari ijobiy qahramonlar.' },
      { items: ['mubolag‘a', 'naqarot', 'raqamlar takrori', 'qofiyasiz erkin she’r'], answer: 3, why: 'Erkin she’r — zamonaviy she’riyatga xos; qolganlari xalq og‘zaki ijodi belgilari.' },
    ],
    debate: [
      { claim: 'Hasanxon Shirvonni Ravshanga emas, kallarga topshirib to‘g‘ri qildi.', pro: 'Kallar shu elni yaxshi biladi, ular sadoqatini isbotladi.', con: 'Ravshan Zulxumor orqali Shirvon taxtiga haqli edi.' },
      { claim: 'Dostonning asl qahramoni Ravshan emas, Hasanxon.', pro: 'Uni qutqargan, jangda g‘alaba qozongan Hasanxon.', con: 'Voqealar Ravshanning muhabbati va jasorati atrofida quriladi.' },
    ],
    creative: [
      { task: 'Dostonga yangi yakun o‘ylab toping: Hasanxon kech qolganda nima bo‘lardi? 3 gapda ayting.', time: 90 },
      { task: 'Baxshi bo‘lib, jang tasvirini «...maydon ichinda» naqaroti bilan bitta yangi satr qo‘shib aytib bering.', time: 90 },
      { task: 'Ravshanning Instagram sahifasi uchun 3 ta post sarlavhasini o‘ylab toping (bozor, zindon, to‘y).', time: 90 },
    ],
  },

  /* ===================== 6 ===================== */
  {
    id: 'adab-shahzoda-1',
    source: 'I chorak • 6-dars • 32–37-betlar',
    title: 'Ekzyuperi. «Kichkina shahzoda»',
    short: 'Yozuvchi hayoti, asarning yaratilishi va boshlanishi',
    lesson: [
      {
        title: 'Antuan de Sent-Ekzyuperi (1900–1944)',
        text: 'Fransuz yozuvchisi 1900-yili Lion shahrida kambag‘allashgan zodagon oilada tug‘ilgan. Otasidan erta yetim qolgan, onasi va buvilari uni erkalab «qirol-oftob» deb chaqirishgan.',
        list: [
          'Bolaligi o‘rta asr uslubidagi qasrda o‘tgan; tabiatni kuzatishni yaxshi ko‘rgan.',
          'She’r yozgan, skripka chalgan, rasm chizgan, texnikaga qiziqqan.',
          'Arxitektura o‘qishini tashlab, harbiy uchuvchi bo‘lgan.',
          'Samolyotda dunyoning ko‘p joylarini aylanib chiqqan.',
        ],
      },
      {
        title: 'Ijodi va taqdiri',
        table: {
          head: ['Yil', 'Voqea'],
          rows: [
            ['1926', 'Ilk asari — «Uchuvchi» hikoyasi e’lon qilingan'],
            ['—', '«Insonlar sayyorasi» romani Fransiya akademiyasi tomonidan eng yaxshi roman deb topilgan'],
            ['1940', 'Fransiyani natsistlar bosib olgan, yozuvchi muhojirlikka ketgan'],
            ['1943', '«Kichkina shahzoda» nashr etilgan'],
            ['1944', 'Harbiy topshiriqdan samolyoti qaytib kelmagan'],
          ],
        },
        note: 'Ekzyuperining aksariyat asarlari uchuvchilik tajribasidan ilhomlangan.',
      },
      {
        title: 'Asarning yaratilish tarixi',
        text: 'Asar Ikkinchi jahon urushi yillarida, muallif vatanidan uzoqda yashagan paytda yozilgan. U qisman hayotiy voqeaga asoslanadi: Ekzyuperining samolyoti Sahroyi Kabirda halokatga uchragan, bir necha kun suvsiz qolgan uchuvchini arablar qutqarib qolgan.',
        rule: 'Asar mavzusi: yaxshilik va yomonlik, do‘stlik, sevgi, sadoqat, mas’uliyat kabi boqiy tushunchalar. Ular kichkina bolakayning sarguzashtlari orqali ochiladi.',
        ruleLabel: 'Mavzu',
      },
      {
        title: 'Bag‘ishlov siri',
        text: 'Muallif kitobni do‘sti Leon Vertga bag‘ishlaydi va buning uchun bolalardan uzr so‘raydi. So‘ng bag‘ishlovga tuzatish kiritadi: «bir paytlar yosh bola bo‘lgan do‘stimga».',
        note: 'Ma’nosi: kattalarning hammasi avval bola bo‘lgan, ammo buni ozchiligi eslaydi. Asar kattalarni o‘zidagi bolalik pokligini eslashga chaqiradi.',
      },
      {
        title: '1- va 2-raqamli rasmlar',
        text: 'Hikoyachi olti yoshida filni yutgan bo‘g‘ma ilon rasmini chizadi. Kattalar uni shlyapa deb o‘ylashadi. Ilonning ichini chizib ko‘rsatsa ham, kattalar unga rasm o‘rniga geografiya, tarix, arifmetika o‘rganishni maslahat berishadi.',
        rule: 'Bu epizodda kattalar va bolalar olami qarama-qarshi qo‘yiladi: kattalar faqat tashqi ko‘rinishni ko‘radi, bola esa mohiyatni tasavvur qiladi.',
        ruleLabel: 'Tahlil',
      },
      {
        title: 'Sahrodagi uchrashuv',
        text: 'Olti yil oldin hikoyachining samolyoti Sahroyi Kabirga qo‘nadi. Bir haftalik suvi qolgan. Ertalab uni ingichka ovoz uyg‘otadi: «Menga qo‘zichoq chizib ber!»',
        list: [
          'Birinchi qo‘zichoq juda oriq, ikkinchisi — qo‘chqor (shoxi bor), uchinchisi — qari.',
          'Sabri tugagan uchuvchi bir quticha chizib: «Qo‘zichog‘ing shuning ichida», deydi.',
          'Bolakay quvonib ketadi: unga aynan shunaqasi kerak edi!',
        ],
        note: 'Savol: quticha nega bolani quvontirdi? Javob: u qo‘zichoqni o‘zi tasavvur qila oladi — ko‘ngil ko‘zi bilan ko‘radi.',
      },
      {
        title: 'O‘qish davomida',
        list: [
          'Asardagi har bir obraz insonning qaysi xususiyatini ko‘rsatadi? Jadval tuzib boring.',
          'Ijodiy ish: «Mening sayyoram» mavzusida 5–7 gapdan iborat matn yozing.',
          'Inson har qanday vaziyatda ham inson bo‘lib qolishi uchun eng muhim uch xislat qaysi?',
        ],
      },
    ],
    pairs: [
      ['Ekzyuperi', 'Fransuz yozuvchisi va uchuvchi'],
      ['Lion', 'Yozuvchi tug‘ilgan shahar'],
      ['«Uchuvchi»', 'Yozuvchining ilk hikoyasi'],
      ['«Insonlar sayyorasi»', 'Eng yaxshi roman deb topilgan asar'],
      ['Leon Vert', 'Kitob bag‘ishlangan do‘st'],
      ['Sahroyi Kabir', 'Samolyot qo‘ngan sahro'],
      ['Quticha', 'Ichida qo‘zichoq bor rasm'],
      ['Shlyapa', 'Kattalar 1-rasmni shunday deb o‘ylashdi'],
    ],
    quiz: [
      { q: 'Ekzyuperi qaysi mamlakat yozuvchisi?', options: ['Fransiya', 'Germaniya', 'Angliya', 'Italiya'], answer: 0 },
      { q: 'Yozuvchi qaysi kasbni egallagan?', options: ['uchuvchi', 'shifokor', 'o‘qituvchi', 'dengizchi'], answer: 0 },
      { q: 'Kitob kimga bag‘ishlangan?', options: ['Leon Vertga', 'onasiga', 'Kichkina shahzodaga', 'Fransiyaga'], answer: 0 },
      { q: 'Kattalar 1-raqamli rasmni nima deb o‘ylashdi?', options: ['shlyapa', 'tog‘', 'ilon', 'bulut'], answer: 0 },
      { q: 'Bolakay uchuvchidan nima chizib berishni so‘radi?', options: ['qo‘zichoq', 'gul', 'tulki', 'samolyot'], answer: 0 },
      { q: 'Oxirida uchuvchi nima chizdi?', options: ['quticha', 'qo‘chqor', 'fil', 'yulduz'], answer: 0 },
      { q: 'Uchuvchining samolyoti qayerga qo‘nadi?', options: ['Sahroyi Kabirga', 'Alp tog‘lariga', 'okeanga', 'o‘rmonga'], answer: 0 },
      { q: 'Yozuvchi qaysi yili halok bo‘lgan?', options: ['1944', '1900', '1926', '1960'], answer: 0 },
    ],
    sort: {
      categories: ['Kattalar olami', 'Bolalar olami'],
      items: [
        { text: 'shlyapani ko‘radi', cat: 0 }, { text: 'filni yutgan ilonni ko‘radi', cat: 1 },
        { text: 'arifmetika o‘rgan, deydi', cat: 0 }, { text: 'qutichada qo‘zichoqni ko‘radi', cat: 1 },
        { text: 'hamma narsani tushuntirish kerak', cat: 0 }, { text: 'ko‘ngil ko‘zi bilan ko‘radi', cat: 1 },
      ],
    },
    qa: [
      { q: 'Asar qanday hayotiy voqeaga asoslangan?', a: 'Ekzyuperining samolyoti Sahroyi Kabirda halokatga uchrab, suvsiz qolgani va arablar uni qutqargani.' },
      { q: 'Muallif bag‘ishlovga qanday tuzatish kiritadi?', a: '«Leon Vertga — bir paytlar yosh bola bo‘lgan do‘stimga».' },
      { q: 'Rasmlar epizodida qanday qarama-qarshilik bor?', a: 'Kattalar va bolalar olami: kattalar tashqi ko‘rinishni, bolalar mohiyatni ko‘radi.' },
      { q: 'Nima uchun bolakay quticha rasmidan quvondi?', a: 'Qo‘zichoqni o‘zi xohlagancha tasavvur qila oladi.' },
      { q: 'Asar qaysi boqiy mavzularni qalamga oladi?', a: 'Do‘stlik, sevgi, sadoqat, yaxshilik va yomonlik, mas’uliyat.' },
    ],
    sequences: [
      {
        title: 'Hikoyani tartib bilan joylang',
        items: [
          'Olti yoshli bola filni yutgan ilon rasmini chizadi',
          'Kattalar rasmni shlyapa deb o‘ylashadi',
          'Bola rassomlikdan voz kechadi',
          'Uchuvchining samolyoti sahroga qo‘nadi',
          'Bolakay qo‘zichoq chizib berishni so‘raydi',
          'Uchuvchi quticha chizib beradi',
        ],
      },
    ],
    odd: [
      { items: ['uchuvchi', 'yozuvchi', 'rassom', 'dengizchi'], answer: 3, why: 'Ekzyuperi uchuvchi, yozuvchi bo‘lgan va rasm chizgan, dengizchi bo‘lmagan.' },
      { items: ['oriq qo‘zichoq', 'qo‘chqor', 'qari qo‘zichoq', 'quticha'], answer: 3, why: 'Faqat quticha bolakayni quvontirdi.' },
      { items: ['«Uchuvchi»', '«Insonlar sayyorasi»', '«Kichkina shahzoda»', '«Xameleon»'], answer: 3, why: '«Xameleon» — Chexov asari.' },
    ],
    debate: [
      { claim: 'Kattalar bolaga rasm o‘rniga arifmetika o‘rgan deb to‘g‘ri maslahat berishgan.', pro: 'Aniq fanlar hayotda zarur, kasb beradi.', con: 'Ular bolaning iste’dodi va tasavvurini so‘ndirib qo‘ydi.' },
      { claim: 'Kattalar haqiqatan ham hech narsani o‘zicha tushuna olmaydi.', pro: 'Ular faqat tashqi ko‘rinish va raqamlarga qaraydi.', con: 'Hikoyachining o‘zi ham katta, lekin u tushunadi.' },
    ],
    creative: [
      { task: 'Doskaga oddiy shakl chizing (masalan, doira). Sinf bu nima bo‘lishi mumkinligi haqida 5 ta g‘ayrioddiy javob topsin.', time: 90 },
      { task: '«Mening sayyoram»: sayyorangizning 3 ta qoidasini aytib bering.', time: 90 },
      { task: 'O‘zingizning «1-raqamli rasmingiz»ni tasvirlang: kattalar nimani ko‘radi, siz nimani nazarda tutgansiz?', time: 60 },
    ],
  },

  /* ===================== 7 ===================== */
  {
    id: 'adab-shahzoda-2',
    source: 'I chorak • 7-dars • 38–44-betlar',
    title: '«Kichkina shahzoda»: muhokama',
    short: 'Tulki saboqlari, gul, sayyoralar va sahrodagi buloq',
    lesson: [
      {
        title: 'Sayyoralar bo‘ylab sayohat',
        text: 'Kichkina shahzoda o‘z jimitdek sayyorasini tark etib, oltita asteroidga boradi. Har birida bitta odam yashaydi. Hech biri bilan suhbat uning ko‘nglini taskin topmaydi va u yettinchi sayyora — Yerga keladi.',
        table: {
          head: ['Asteroiddagi kimsa', 'Majoziy ma’nosi'],
          rows: [
            ['Qirol', 'Hokimiyatparastlik, «hamma narsa mening qo‘limda» deb o‘zini aldash'],
            ['Shuhratparast', 'Maqtovga tashnalik, o‘zini hammadan ustun ko‘rish'],
            ['Piyonista', 'Zararli odatning domiga tushish, o‘zidan qochish'],
            ['Korchalon (ishbilarmon)', 'Boylikni hisoblash, mol-dunyoga mukkasidan ketish'],
            ['Chiroqbon', 'Vazifaga sadoqat, ammo ma’nosiz takror'],
            ['Jug‘rofiy olim', 'Hayotni ko‘rmasdan, faqat qog‘ozdan biluvchi bilarmon'],
          ],
        },
      },
      {
        title: 'Tulki bilan tanishuv',
        text: 'Yerda Kichkina shahzoda Tulkini uchratadi. Tulki «qo‘lga o‘rgatilmagan»ligini aytadi va bu so‘zning ma’nosini tushuntiradi.',
        rule: '«Qo‘lga o‘rgatmoq — rishta bog‘lamoq demakdir». Rishta bog‘langach, ikki jon bir-biri uchun dunyoda yagonaga aylanadi.',
        ruleLabel: 'Tulkining saboqi',
        note: 'Tulki aytadi: odamlar hamma narsani do‘kondan tayyor sotib oladi, ammo do‘st sotadigan do‘kon yo‘q — shuning uchun odamlar do‘st orttirmay qo‘ydi.',
      },
      {
        title: 'Do‘stlik qanday tug‘iladi?',
        list: [
          'Sabr: avval uzoqroqda o‘tirasan, har kuni sal yaqinroq kelasan.',
          'Jimlik: «so‘z bir-birimizni anglashimizga xalaqit beradi».',
          'Odat va kutish: har kuni bir paytda kelsang, kutish quvonchi paydo bo‘ladi.',
          'Ramz: oltin bug‘doyzor endi Tulkiga do‘stining sochini eslatadi.',
        ],
      },
      {
        title: 'Gul va besh ming atirgul',
        text: 'Shahzoda bog‘da besh ming atirgulni ko‘radi. Ular uning guliga o‘xshaydi, lekin: «Sizlar chiroylisizlar, ammo dilingiz bo‘m-bo‘sh», deydi.',
        note: 'Uning guli qadrli, chunki uni sug‘organ, shamoldan asragan, arz-u dodini eshitgan. Qadr narsaning o‘zida emas, unga sarflangan mehrda.',
      },
      {
        title: 'Asarning asosiy hikmatlari',
        rule: '«Faqat ko‘ngil ko‘zigina ochiq, eng asosiy narsani ko‘z bilan ko‘rolmaysan.»',
        ruleLabel: 'Tulkining siri',
        list: [
          'Guling senga qadrli, chunki unga ko‘nglingni bergansan.',
          'Sen qo‘lga o‘rgatgan narsang uchun umrbod javobgarsan.',
          'Sahro chiroyli, chunki qayerdadir buloq yashiringan.',
          'Suv ba’zan yurakka ham kerak bo‘ladi.',
        ],
      },
      {
        title: 'Sahrodagi buloq',
        text: 'Halokatdan bir hafta o‘tgach, suv tugaydi. Shahzoda va uchuvchi buloq izlab yo‘lga chiqishadi. Shahzoda charchab uxlab qolganda, uchuvchi uni qo‘lida ko‘tarib boradi va bu jajji jonning sham shu’lasidek nozikligini anglaydi. Tong chog‘i ular quduqqa yetadi.',
        note: 'Asarni Xayriddin Sultonov o‘zbek tiliga tarjima qilgan. 2015-yilda Fransiyada «Kichkina shahzoda» multfilmi suratga olingan.',
      },
      {
        title: 'Muhokama qilamiz',
        list: [
          'Muallif asarni nega urush yillarida, vatandan uzoqda yozgan?',
          'Uchuvchi kattalar olamigami yoki bolalar olamiga mansubmi? Shahzoda va uchuvchi bir inson bo‘lishi mumkinmi?',
          'Voqealar shahzoda tilidan hikoya qilinsa, asar qanday o‘zgarar edi?',
          'Sizga eng kuchli ta’sir qilgan iqtibosni tanlang va sababini ayting.',
        ],
      },
    ],
    pairs: [
      ['Qirol', 'Hokimiyatparastlik'],
      ['Shuhratparast', 'Maqtovga tashnalik'],
      ['Korchalon', 'Boylikka mukkasidan ketish'],
      ['Chiroqbon', 'Vazifaga sadoqat'],
      ['Qo‘lga o‘rgatmoq', 'Rishta bog‘lamoq'],
      ['Bug‘doyzor', 'Do‘stning sochini eslatadi'],
      ['Besh ming atirgul', 'Chiroyli, ammo dili bo‘m-bo‘sh'],
      ['Xayriddin Sultonov', 'Asar tarjimoni'],
    ],
    quiz: [
      { q: 'Tulkining fikricha, «qo‘lga o‘rgatmoq» nima?', options: ['rishta bog‘lamoq', 'buyruq bermoq', 'ovlamoq', 'sotib olmoq'], answer: 0 },
      { q: 'Eng asosiy narsani nima bilan ko‘rish mumkin?', options: ['ko‘ngil ko‘zi bilan', 'ko‘z bilan', 'teleskop bilan', 'aql bilan'], answer: 0 },
      { q: 'Kichkina shahzoda Yerga kelguncha nechta asteroidda bo‘ladi?', options: ['6', '3', '10', '1'], answer: 0 },
      { q: 'Bug‘doyzor Tulkiga nimani eslatadi?', options: ['do‘stining sochini', 'ovqatni', 'quyoshni', 'uyini'], answer: 0 },
      { q: 'Nega shahzodaning guli boshqa atirgullardan qadrli?', options: ['unga mehr bergan, asragan', 'eng chiroylisi', 'eng kattasi', 'sotib olgan'], answer: 0 },
      { q: 'Sahro nega chiroyli?', options: ['qayerdadir buloq yashiringan', 'qumi oltin', 'issiq', 'keng'], answer: 0 },
      { q: '«Hamma narsa mening amrim bilan» deb o‘ylaydigan obraz?', options: ['qirol', 'chiroqbon', 'jug‘rofiy olim', 'tulki'], answer: 0 },
    ],
    sort: {
      categories: ['Haqiqiy qadriyat', 'Soxta qadriyat'],
      items: [
        { text: 'do‘stlik', cat: 0 }, { text: 'shon-shuhrat', cat: 1 },
        { text: 'sadoqat', cat: 0 }, { text: 'yulduzlarni sanab boyish', cat: 1 },
        { text: 'mas’uliyat', cat: 0 }, { text: 'quruq buyruq berish', cat: 1 },
        { text: 'mehr bilan asrash', cat: 0 }, { text: 'faqat tashqi chiroy', cat: 1 },
      ],
    },
    qa: [
      { q: 'Tulki do‘st orttirish uchun nima qilish kerakligini aytadi?', a: 'Sabr qilish, har kuni bir paytda kelib, asta-sekin yaqinlashish.' },
      { q: 'Nima uchun odamlar do‘st orttirmay qo‘ygan?', a: 'Hamma narsani do‘kondan tayyor oladi, do‘st sotadigan do‘kon esa yo‘q.' },
      { q: '«Sen qo‘lga o‘rgatgan narsang uchun javobgarsan» fikrini izohlang.', a: 'Rishta bog‘laganing uchun uni asrash, unga g‘amxo‘rlik qilish burchingga aylanadi.' },
      { q: 'Qirol obrazi nimaning majozi?', a: 'Hokimiyatparastlik va hamma narsani boshqaraman deb o‘zini aldashning.' },
      { q: 'Uchuvchi shahzodani ko‘tarib borarkan nimani angladi?', a: 'Uning sham shu’lasidek nozik ekanini, uni ehtiyot qilish kerakligini.' },
    ],
    sequences: [
      {
        title: 'Voqealarni tartib bilan joylang',
        items: [
          'Shahzoda o‘z sayyorasini tark etadi',
          'Oltita asteroiddagi kimsalar bilan suhbatlashadi',
          'Yerga kelib Tulki bilan tanishadi',
          'Besh ming atirgulni ko‘radi',
          'Tulki o‘z sirini aytadi',
          'Uchuvchi bilan buloq izlab ketadi',
        ],
      },
      {
        title: 'Do‘stlik bosqichlari (Tulki bo‘yicha)',
        items: [
          'Uzoqroqda, maysa ustida jim o‘tirish',
          'Har kuni bir oz yaqinroq kelish',
          'Har kuni bir paytda kelish',
          'Kutish quvonchini his qilish',
          'Bir-biri uchun dunyoda yagonaga aylanish',
        ],
      },
    ],
    odd: [
      { items: ['qirol', 'shuhratparast', 'korchalon', 'Tulki'], answer: 3, why: 'Tulki Yerda yashaydi va hikmat o‘rgatadi; qolganlari asteroidlardagi kimsalar.' },
      { items: ['do‘stlik', 'sadoqat', 'mas’uliyat', 'shuhrat'], answer: 3, why: 'Shuhrat — asarda soxta qadriyat; qolganlari haqiqiy qadriyatlar.' },
      { items: ['gul', 'bug‘doyzor', 'buloq', 'samolyot'], answer: 3, why: 'Samolyot — oddiy texnika; qolganlari asarda ramziy ma’noga ega.' },
    ],
    debate: [
      { claim: 'Inson qo‘lga o‘rgatgan narsasi uchun umrbod javobgar.', pro: 'Mehr bergan narsang senga ishonadi, uni tashlash xiyonat.', con: 'Har kim o‘z hayotini o‘zi qurishi kerak, abadiy majburiyat og‘ir.' },
      { claim: 'Bugun ham odamlar hamma narsani tayyor sotib olib, do‘st orttirmay qo‘ygan.', pro: 'Ijtimoiy tarmoqdagi «do‘stlar» haqiqiy do‘st emas.', con: 'Internet orqali ham chin do‘stlik paydo bo‘lishi mumkin.' },
      { claim: 'Shahzoda va uchuvchi — aslida bitta inson.', pro: 'Shahzoda uchuvchining ichidagi bolalikdir.', con: 'Ular alohida obrazlar, har biri o‘z hikoyasiga ega.' },
    ],
    creative: [
      { task: 'Yettinchi asteroidni o‘ylab toping: unda kim yashaydi va u bugungi qaysi illatni ko‘rsatadi?', time: 90 },
      { task: 'Tulki va shahzoda dialogini sahnalashtiring: bir o‘quvchi Tulki, biri shahzoda (30 soniya).', time: 120 },
      { task: '«Eng asosiy narsani ko‘z bilan ko‘rolmaysan» fikriga hayotdan bitta misol keltiring.', time: 60 },
    ],
  },

  /* ===================== 8 ===================== */
  {
    id: 'adab-majoz',
    source: 'I chorak • 8-dars • 45-bet',
    title: 'Nazariy ma’lumot. Majoz va ramz',
    short: 'Majoz, ramz va «Kichkina shahzoda»dagi majoziy obrazlar',
    lesson: [
      {
        title: 'Ramz va majoz',
        rule: 'Majoz — ramzning bir ko‘rinishi bo‘lib, mavhum tushuncha o‘rnida aniq obrazni qo‘llash, ya’ni o‘quvchiga noaniq bo‘lgan tushunchani hammaga ma’lum narsalarga xos belgilar bilan ifodalash usuli.',
        ruleLabel: 'Nazariy ma’lumot',
        text: 'Masalan, «ochko‘zlik» degan mavhum tushunchani ko‘rsatish uchun yozuvchi bo‘ri obrazidan foydalanadi.',
      },
      {
        title: 'Folklordan kelgan majoziy obrazlar',
        text: 'Badiiy adabiyotdagi ko‘p majoziy obrazlar xalq og‘zaki ijodidan, ayniqsa, hayvonlar haqidagi ertaklardan olingan.',
        table: {
          head: ['Obraz', 'Majoziy ma’nosi'],
          rows: [
            ['Bo‘ri', 'ochko‘zlik'],
            ['Tulki', 'ayyorlik'],
            ['Chumoli', 'mehnatsevarlik, ertangi kunni o‘ylash'],
            ['Ninachi', 'o‘yinqaroqlik, beg‘amlik'],
            ['Sher', 'kuch, hukmronlik'],
            ['Quyon', 'qo‘rqoqlik'],
          ],
        },
      },
      {
        title: 'Majoz qaysi janrlarda ko‘p uchraydi?',
        examples: ['masal', 'rivoyat', 'hajv', 'ertak', 'majoziy qissa'],
        text: '«Ninachi va chumoli» masalida ninachi yozni o‘yin-kulgi bilan o‘tkazadi, qishga ovqat g‘amlayotgan chumolining ustidan kuladi. Qish kelgach, chumolidan yordam so‘rashga majbur bo‘ladi.',
        note: 'Bu masal orqali muallif mehnatsevarlik va ertangi kunni o‘ylashni ulug‘laydi, beg‘amlik va yengiltaklikni qoralaydi.',
      },
      {
        title: '«Kichkina shahzoda» — majoziy asar',
        text: 'Asardagi har bir obraz orqali muallif o‘quvchiga biror g‘oyani yetkazadi.',
        table: {
          head: ['Obraz', 'Nimani ifodalaydi'],
          rows: [
            ['Qirol', '«Hamma narsa mening qo‘limda» deb o‘zini aldash'],
            ['Tulki', 'Donolik, do‘stlik saboqlari (ertakdagi ayyorlikdan farqli!)'],
            ['Gul', 'Muhabbat, mehr berilgan yagona narsa'],
            ['Bo‘g‘ma ilon', 'Kattalarning tor, yuzaki dunyoqarashi'],
            ['Sahro va buloq', 'Hayotdagi yashirin go‘zallik va umid'],
          ],
        },
        note: 'Qirol bir o‘zi yashasa ham buyruq beradi, «quyosh mening amrim bilan botyapti» deydi — aslida hammasi uning buyrug‘isiz ham bo‘laveradi.',
      },
      {
        title: 'Majozni qanday tahlil qilamiz?',
        list: [
          'Obrazni tanlang.',
          'Uning asardagi xatti-harakatlari va gap-so‘zlarini yozing.',
          'Muallif bu obraz orqali qanday g‘oyani ifodalayotganini aniqlang.',
          'Shu g‘oyaga bugungi hayotdan misol keltiring.',
        ],
      },
    ],
    pairs: [
      ['Majoz', 'Mavhum tushunchani aniq obraz bilan ifodalash'],
      ['Bo‘ri', 'ochko‘zlik'],
      ['Tulki (ertakda)', 'ayyorlik'],
      ['Chumoli', 'mehnatsevarlik'],
      ['Ninachi', 'beg‘amlik'],
      ['Qirol (asarda)', 'o‘zini aldash'],
      ['Masal', 'Majoz keng qo‘llanadigan janr'],
    ],
    quiz: [
      { q: 'Majoz nimaning bir ko‘rinishi?', options: ['ramzning', 'qofiyaning', 'syujetning', 'portretning'], answer: 0 },
      { q: 'Ertaklarda bo‘ri nimaning timsoli?', options: ['ochko‘zlik', 'donolik', 'mehnat', 'sadoqat'], answer: 0 },
      { q: 'Tulki ertaklarda odatda nimani ifodalaydi?', options: ['ayyorlik', 'qo‘rqoqlik', 'kuch', 'saxiylik'], answer: 0 },
      { q: '«Ninachi va chumoli» qaysi janrda?', options: ['masal', 'doston', 'g‘azal', 'roman'], answer: 0 },
      { q: 'Majoziy obrazlarning ko‘pi qayerdan olingan?', options: ['hayvonlar haqidagi ertaklardan', 'ilmiy kitoblardan', 'gazetalardan', 'hujjatlardan'], answer: 0 },
      { q: '«Quyosh mening amrim bilan botyapti» deydigan obraz?', options: ['qirol', 'tulki', 'uchuvchi', 'chiroqbon'], answer: 0 },
    ],
    sort: {
      categories: ['Majoziy obraz', 'Oddiy (to‘g‘ri ma’nodagi) obraz'],
      items: [
        { text: 'masaldagi chumoli', cat: 0 }, { text: 'hikoyadagi qorovul', cat: 1 },
        { text: 'ertakdagi bo‘ri', cat: 0 }, { text: 'hujjatli filmdagi bo‘ri', cat: 1 },
        { text: 'asardagi qirol', cat: 0 }, { text: 'tarixdagi Amir Temur', cat: 1 },
      ],
    },
    qa: [
      { q: 'Majozga o‘z so‘zingiz bilan ta’rif bering.', a: 'Mavhum tushunchani hammaga tanish aniq narsa yoki jonzot obrazi orqali ifodalash.' },
      { q: '«Ninachi va chumoli» masali qanday fazilatni ulug‘laydi?', a: 'Mehnatsevarlik va ertangi kunni o‘ylashni.' },
      { q: '«Kichkina shahzoda»dagi Tulki ertaklardagi tulkidan nimasi bilan farq qiladi?', a: 'Ayyor emas, aksincha dono — do‘stlik saboqlarini o‘rgatadi.' },
      { q: 'Majoz qaysi janrlarda keng qo‘llanadi?', a: 'Masal, rivoyat, hajv, ertak.' },
      { q: 'Majoziy obrazni tahlil qilish bosqichlarini ayting.', a: 'Obrazni tanlash, xatti-harakatini yozish, g‘oyasini aniqlash, hayotdan misol topish.' },
    ],
    odd: [
      { items: ['bo‘ri — ochko‘zlik', 'tulki — ayyorlik', 'chumoli — mehnatsevarlik', 'sher — qo‘rqoqlik'], answer: 3, why: 'Sher kuch va hukmronlik timsoli, qo‘rqoqlik — quyon.' },
      { items: ['masal', 'rivoyat', 'hajv', 'ilmiy maqola'], answer: 3, why: 'Ilmiy maqolada majoz ishlatilmaydi.' },
      { items: ['qirol', 'shuhratparast', 'korchalon', 'uchuvchi'], answer: 3, why: 'Uchuvchi — hikoyachi; qolganlari illatlarni ifodalovchi majoziy obrazlar.' },
    ],
    debate: [
      { claim: 'Hayvonlar orqali gapirish odamlarga to‘g‘ridan to‘g‘ri aytishdan ta’sirliroq.', pro: 'O‘quvchi xafa bo‘lmay, o‘zini chetdan ko‘radi.', con: 'Ba’zilar ma’noni tushunmay, oddiy ertak deb o‘ylaydi.' },
    ],
    creative: [
      { task: 'Bitta majoziy obraz o‘ylab toping (hayvon, narsa yoki o‘simlik) va u qaysi xislatni ifodalashini ayting. Sinf taxmin qilsin.', time: 60 },
      { task: '«Dangasalik»ni majoz orqali 2–3 gaplik kichik masal qilib aytib bering.', time: 120 },
      { task: 'Sinfingiz uchun ramz tanlang: qaysi hayvon yoki narsa sinfingizni eng yaxshi ifodalaydi? Nega?', time: 60 },
    ],
  },

  /* ===================== 10 ===================== */
  {
    id: 'adab-soginish',
    source: 'I chorak • 10-dars • 46–49-betlar',
    title: 'G‘afur G‘ulom. «Sog‘inish» she’ri',
    short: 'Shoir hayoti va urushga ketgan o‘g‘lini kutayotgan ota tuyg‘ulari',
    lesson: [
      {
        title: 'G‘afur G‘ulom (1903–1966)',
        text: 'O‘zbek adabiyotining mashhur namoyandasi 1903-yili Toshkentning Qo‘rg‘ontegi mahallasida tug‘ilgan. Eski maktabda, so‘ng rus-tuzem maktabida o‘qigan, muallimlar kursini tamomlab, o‘qituvchilik qilgan.',
        list: [
          'Ota-onasidan erta ayrilib, og‘ir sinovlarni boshidan kechirgan.',
          'Otasi «Mirzo» va «G‘ulom» taxalluslari bilan she’r yozgan; uylariga Muqimiy, Furqat kabi shoirlar kelgan.',
          '1966-yili Toshkentda vafot etgan.',
        ],
      },
      {
        title: 'Ijodi',
        table: {
          head: ['Yo‘nalish', 'Asarlari'],
          rows: [
            ['She’riy to‘plamlar', '«Dinamo», «Tirik qo‘shiqlar» (1931–1932)'],
            ['Doston va balladalar', '«Ko‘kan», «To‘y», «Ikki vasiqa»'],
            ['Nasr', '«Netay», «Yodgor», «Tirilgan murda», «Shum bola» qissasi'],
            ['Tarjima', 'Shekspirning «Otello», «Qirol Lir» dramalari'],
          ],
        },
        note: '«Shum bola» qissasi shoirni jahon miqyosida mashhur qilgan. U ko‘plab davlat mukofotlariga sazovor bo‘lgan.',
      },
      {
        title: '«Sog‘inish» (1942) — mavzu va g‘oya',
        rule: 'She’rda Ikkinchi jahon urushiga ketgan o‘g‘lini sog‘ingan, uning g‘olib bo‘lib qaytishiga ishongan ota (lirik qahramon) tuyg‘ulari aks etgan.',
        ruleLabel: 'Mavzu',
        text: 'She’r matnini darslikning 47–49-betlaridan ifodali o‘qing. Unda sog‘inch, xavotir, umid va faxr tuyg‘ulari almashinib keladi.',
      },
      {
        title: 'Kayfiyat qanday o‘zgaradi?',
        table: {
          head: ['Qism', 'Kayfiyat', 'Qanday ifodalangan'],
          rows: [
            ['Boshlanish', 'Sog‘inch, intizorlik', 'Ota o‘zini karvon yo‘lida qolgan yetim bo‘taga o‘xshatadi, Quyoshdan xabar so‘raydi'],
            ['O‘g‘il kuzatilgan kun', 'Faxr', 'O‘g‘il ostonani o‘pib, Vatan uchun qasamyod qilib ketgan'],
            ['Kechki dasturxon', 'Xavotir', 'Osh suzilganda bir nasiba kam — biri yetishmaydi'],
            ['Bog‘da', 'Umid', 'Bahor kurtaklari, gul payvand qilish — hayot davom etadi'],
            ['Yakun', 'Ishonch, g‘alaba', 'O‘g‘il qaytganda savatni shaftoliga to‘ldirish orzusi'],
          ],
        },
      },
      {
        title: 'Badiiy tasvir vositalari',
        table: {
          head: ['Vosita', 'She’rdagi misol', 'Vazifasi'],
          rows: [
            ['O‘xshatish', '«yetim bo‘tadek»', 'Otaning yolg‘izligi, intizorligi'],
            ['Murojaat', 'Quyoshga murojaat', 'Butun olamdan xabar kutish'],
            ['Detal', '«uzilgan bir kiprik»', 'Eng kichik narsa ham yo‘qolmaydi — o‘g‘il ham omon qaytadi degan ishonch'],
            ['Tabiat timsoli', 'bahor kurtagi, ko‘chat', 'Yangi hayot va umid'],
            ['O‘xshatish', 'shaftoli — misoli kulgu', 'Quvonch va g‘alaba kutishi'],
          ],
        },
        note: 'Shoir tabiat va inson ruhiyatini bog‘laydi: bahorda uyg‘ongan hayot otaning umidiga kuch beradi.',
      },
      {
        title: 'Meros tushunchasi',
        text: 'She’rda «meros» so‘zi bir necha marta uchraydi: meros mard g‘urur, meros bog‘, otaga topshirilgan merosiy haq.',
        rule: 'Meros — faqat mol-mulk emas, balki mardlik, Vatan mehri, bog‘ va mehnat an’anasining avloddan avlodga o‘tishi.',
        ruleLabel: 'Tahlil',
      },
      {
        title: 'Muhokama qilamiz',
        list: [
          '«Sog‘inish» she’rida qanday kayfiyat hukmron? Qaysi so‘zlar uni yuzaga chiqargan?',
          'Otaning sog‘inch iztiroblari qaysi satrlarda yaqqolroq ko‘rinadi?',
          'Shoir nega bahor timsollarini sog‘inish bilan bog‘laydi?',
          'Juftlikda ishlang: she’r asosida eydos-konspekt (kalit so‘z, rasm, shakl) yarating.',
        ],
      },
    ],
    pairs: [
      ['G‘afur G‘ulom', '«Shum bola» qissasi muallifi'],
      ['Qo‘rg‘ontegi', 'Shoir tug‘ilgan mahalla'],
      ['«Dinamo»', 'Ilk she’riy to‘plam'],
      ['«Otello»', 'Shoir tarjima qilgan drama'],
      ['«Sog‘inish»', '1942-yil'],
      ['Yetim bo‘ta', 'Otaning intizorligi o‘xshatishi'],
      ['Shaftoli', 'Kulguga o‘xshatilgan meva'],
    ],
    quiz: [
      { q: 'G‘afur G‘ulom qaysi shaharda tug‘ilgan?', options: ['Toshkent', 'Samarqand', 'Buxoro', 'Qo‘qon'], answer: 0 },
      { q: 'Shoirni jahonga mashhur qilgan qissa?', options: ['«Shum bola»', '«O‘tgan kunlar»', '«Oq kema»', '«Sarob»'], answer: 0 },
      { q: '«Sog‘inish» she’rida kim sog‘inmoqda?', options: ['ota', 'ona', 'singil', 'yor'], answer: 0 },
      { q: 'Ota kimni sog‘inadi?', options: ['urushga ketgan o‘g‘lini', 'vafot etgan otasini', 'do‘stini', 'ustozini'], answer: 0 },
      { q: '«Sog‘inish» qaysi yili yozilgan?', options: ['1942', '1966', '1931', '1903'], answer: 0 },
      { q: 'G‘afur G‘ulom Shekspirning qaysi asarini tarjima qilgan?', options: ['«Otello»', '«Gamlet»', '«Romeo va Julyetta»', '«Makbet»'], answer: 0 },
      { q: 'She’r yakunida ota qanday orzu qiladi?', options: ['savatni shaftoliga to‘ldirish', 'safarga chiqish', 'kitob yozish', 'bog‘ni sotish'], answer: 0 },
    ],
    sort: {
      categories: ['Sog‘inch va xavotir', 'Umid va ishonch'],
      items: [
        { text: 'yetim bo‘tadek intizorlik', cat: 0 }, { text: 'bahor kurtagi', cat: 1 },
        { text: 'dasturxonda bir nasiba kam', cat: 0 }, { text: 'o‘g‘lim omon keladi', cat: 1 },
        { text: 'ko‘zlarda halqa-halqa yosh', cat: 0 }, { text: 'g‘alaba kunlari yaqin', cat: 1 },
      ],
    },
    qa: [
      { q: 'She’rning lirik qahramoni kim va u nimani his qiladi?', a: 'Urushga ketgan o‘g‘lini kutayotgan ota; sog‘inch, xavotir, umid va faxr.' },
      { q: '«Uzilgan bir kiprik» detali nimani anglatadi?', a: 'Olamda eng kichik narsa ham yo‘qolmaydi — ota o‘g‘lining omon qaytishiga ishonadi.' },
      { q: 'Nega shoir bahor timsollarini sog‘inish bilan bog‘laydi?', a: 'Bahor — yangi hayot va umid; tabiat otaning ruhiga tasalli beradi.' },
      { q: 'She’rdagi «meros» so‘zi qanday ma’noda?', a: 'Mardlik, Vatan mehri, bog‘ va mehnat an’anasining avlodga o‘tishi.' },
      { q: 'G‘afur G‘ulomning ilk to‘plamlarini ayting.', a: '«Dinamo» va «Tirik qo‘shiqlar».' },
    ],
    odd: [
      { items: ['«Shum bola»', '«Yodgor»', '«Netay»', '«Oq kema»'], answer: 3, why: '«Oq kema» — Chingiz Aytmatov asari.' },
      { items: ['sog‘inch', 'xavotir', 'umid', 'loqaydlik'], answer: 3, why: 'She’rda loqaydlik yo‘q; qolgan tuyg‘ular she’rda bor.' },
      { items: ['«Otello»', '«Qirol Lir»', '«Dinamo»', '«Gamlet»'], answer: 2, why: '«Dinamo» — G‘afur G‘ulomning o‘z to‘plami; qolganlari Shekspir asarlari.' },
    ],
    debate: [
      { claim: 'Urush haqidagi she’rlarni bugun o‘qish kerak emas — urush ortda qoldi.', pro: 'Bugungi yoshlarni zamonaviy mavzular ko‘proq qiziqtiradi.', con: 'Sog‘inch, Vatan, ota-ona mehri — boqiy tuyg‘ular; tarixni unutmaslik kerak.' },
      { claim: 'She’rda ota ojiz emas, balki kuchli inson qilib ko‘rsatilgan.', pro: 'U xavotirni yengib, bog‘da ishlaydi, g‘alabaga ishonadi.', con: 'U yig‘laydi, vasvasaga tushadi — bu uning ojizligi.' },
    ],
    creative: [
      { task: 'O‘g‘il frontdan otasiga javob xati yozdi. Uning birinchi 2 gapini ayting.', time: 90 },
      { task: 'She’rdagi bitta detalni (kurtak, savat, shaftoli, osh) tanlab, doskaga rasm qilib chizing va ma’nosini tushuntiring.', time: 120 },
      { task: '«Sog‘inch» so‘zini rang, tovush va hid orqali tasvirlang: u qanday rangda, qanday ovozda?', time: 60 },
    ],
  },

  /* ===================== 11 ===================== */
  {
    id: 'adab-vaqt',
    source: 'I chorak • 11-dars • 50–52-betlar',
    title: 'G‘afur G‘ulom. «Vaqt» she’ri',
    short: 'Lahzaning qadri, tarixiy onlar va «Umrimiz boqiy» g‘oyasi',
    lesson: [
      {
        title: 'Mutolaadan oldin',
        text: '«Vaqtimni behuda o‘tkazdim» deb o‘ylagan paytlaringiz bo‘lganmi? Nega? Vaqtning qadrini qachon his qilasiz?',
        note: 'She’r (1945) shoirga soat sovg‘a qilgan jiyani — mayor Hamidulla Husan o‘g‘liga bag‘ishlangan. Matnni darslikning 50–51-betlaridan o‘qing.',
      },
      {
        title: 'She’rning g‘oyasi',
        rule: 'Har bir lahza qimmatli: bir onda butun bahor mazmuni, butun tarix taqdiri hal bo‘lishi mumkin. Shuning uchun umrni mehnat va muhabbat bilan mazmunli o‘tkazish kerak.',
        ruleLabel: 'G‘oya',
      },
      {
        title: 'Lahza qanday obrazlar orqali ulug‘lanadi?',
        table: {
          head: ['Obraz', 'Ma’nosi'],
          rows: [
            ['G‘uncha ochilguncha o‘tgan fursat — kapalak umri', 'Qisqa vaqt ham butun bir umrga teng'],
            ['Bir nafaslik muddat — ming yulduz so‘nishi', 'Lahza ichida ulkan voqealar yuz beradi'],
            ['Yashash soatining oltin kapgiri', 'Har bir tebranish — bir olam zamon'],
            ['Oltin tarozu, olmos tosh ham oz', 'Bir onning bahosi o‘lchab bo‘lmas darajada qimmat'],
            ['Qatrada osmon aks etganidek', 'Kichik narsada buyuk ma’no bo‘ladi'],
          ],
        },
      },
      {
        title: 'Tarixiy onlar',
        text: 'She’rning ikkinchi qismida 1945-yil voqealari tilga olinadi:',
        list: [
          'Reyxstag ustiga g‘alaba bayrog‘ining tikilishi — adolat qaror topgan lahza.',
          'Mag‘lub nemis generalining taslimnomaga imzo chekishi — atigi uch soniya, lekin million yil la’nat.',
          'Shu onlar insoniyatning muqaddas haqi — tinch yashash huquqini qaror toptirgan.',
        ],
        note: 'Reyxstag — Berlindagi Germaniya parlamenti binosi. 1945-yil mayida uning ustiga g‘alaba bayrog‘i tikilgan; bino urush tugashi va tinchlik timsoliga aylangan.',
      },
      {
        title: 'Gerostrat va «bir g‘isht»',
        text: 'Gerostrat — mashhur bo‘lish uchun qadimgi Efesdagi Diana (Artemida) ibodatxonasiga o‘t qo‘ygan odam. Shoir unga qarshi fikr bildiradi:',
        rule: 'Nom qoldirish uchun buzish shart emas: ko‘pchilik baxti uchun ulug‘ binoga bitta g‘isht qo‘yish kifoya.',
        ruleLabel: 'Shoirning fikri',
      },
      {
        title: 'Kalit tushunchalar',
        table: {
          head: ['Ifoda', 'Izoh'],
          rows: [
            ['«Tiriklik ko‘rki»', 'Mehnat va muhabbat'],
            ['«So‘nmas cho‘g‘imiz»', 'Xalqning abadiy hayot kuchi, avlodlar davomiyligi'],
            ['«Fursat g‘animat»', 'Vaqtni qadrlash, behuda o‘tkazmaslik'],
            ['«Umrimiz boqiy»', 'Inson yaxshi ishlari bilan abadiy yashaydi'],
          ],
        },
      },
      {
        title: 'Muhokama va topshiriqlar',
        list: [
          'She’rda qaysi mash’um voqealar tilga olinadi?',
          'Qaysi sifatlash she’r mazmunini ochishda alohida ahamiyatga ega?',
          'Shoir nega «Umrimiz boqiy» deb xulosa qiladi?',
          'Loyiha: «Vaqtning she’r va tasvirda ifodalanishi» mavzusida guruh ishi tayyorlang.',
          'G‘afur G‘ulom she’rlaridan birini yod oling.',
        ],
      },
    ],
    pairs: [
      ['Gerostrat', 'Nom chiqarish uchun ibodatxonani yoqqan'],
      ['Reyxstag', 'Ustiga g‘alaba bayrog‘i tikilgan bino'],
      ['Kapalak umri', 'Qisqa fursat timsoli'],
      ['Tiriklik ko‘rki', 'mehnat va muhabbat'],
      ['Uch soniya', 'Taslimnomaga imzo'],
      ['Hamidulla Husan o‘g‘li', 'She’r bag‘ishlangan jiyan'],
      ['Bir g‘isht', 'Umumiy baxtga hissa'],
    ],
    quiz: [
      { q: '«Vaqt» she’ri qaysi yili yozilgan?', options: ['1945', '1942', '1966', '1931'], answer: 0 },
      { q: 'She’r kimga bag‘ishlangan?', options: ['soat sovg‘a qilgan jiyaniga', 'o‘g‘liga', 'otasiga', 'Zulfiyaga'], answer: 0 },
      { q: 'Shoir fikricha, tiriklik ko‘rki nima?', options: ['mehnat va muhabbat', 'boylik', 'shon-shuhrat', 'kuch'], answer: 0 },
      { q: 'Gerostrat nima qilgan?', options: ['ibodatxonaga o‘t qo‘ygan', 'shahar qurgan', 'kitob yozgan', 'urushda g‘olib chiqqan'], answer: 0 },
      { q: 'Nemis generali taslimnomaga necha soniyada imzo chekdi?', options: ['uch', 'o‘n', 'bir', 'oltmish'], answer: 0 },
      { q: 'She’r qanday xulosa bilan tugaydi?', options: ['Umrimiz boqiy', 'Hammasi o‘tkinchi', 'Vaqt dushman', 'Kelajak noma’lum'], answer: 0 },
      { q: 'Reyxstag qaysi shaharda joylashgan?', options: ['Berlin', 'Moskva', 'Parij', 'London'], answer: 0 },
    ],
    sort: {
      categories: ['Vaqtni qadrlash', 'Vaqtni behuda o‘tkazish'],
      items: [
        { text: 'bir g‘isht qo‘yish', cat: 0 }, { text: 'Gerostratdek nom izlash', cat: 1 },
        { text: 'mehnat qilish', cat: 0 }, { text: 'maqsadsiz o‘tirish', cat: 1 },
        { text: 'umr daftarini bezash', cat: 0 }, { text: 'fursatni boy berish', cat: 1 },
      ],
    },
    qa: [
      { q: '«Bir lahza mazmuni...» satrini izohlang.', a: 'Bir on ham mazmunga to‘la bo‘lishi, butun bir faslga teng qadrga ega ekani.' },
      { q: 'Shoir nega Gerostratni tilga oladi?', a: 'Nom qoldirish uchun buzish emas, ko‘pchilik baxtiga hissa qo‘shish kerakligini ko‘rsatish uchun.' },
      { q: '«Basharning muqaddas, oliy huquqi» nima?', a: 'Tinch, erkin yashash huquqi.' },
      { q: 'Shoir nega «Umrimiz boqiy» deb xulosa qiladi?', a: 'Inson ezgu ishlari va avlodlari orqali abadiy yashaydi.' },
      { q: 'She’rda qaysi tarixiy voqealar tilga olinadi?', a: 'Reyxstag ustiga bayroq tikilishi va nemis generalining taslim bo‘lishi.' },
    ],
    odd: [
      { items: ['lahza', 'on', 'sekund', 'asr'], answer: 3, why: 'Asr — juda uzoq vaqt; qolganlari qisqa fursat nomlari.' },
      { items: ['mehnat', 'muhabbat', 'fursatni qadrlash', 'Gerostratning ishi'], answer: 3, why: 'Gerostratning ishi shoir qoralagan yo‘l.' },
      { items: ['kapalak umri', 'g‘uncha ochilishi', 'bir nafas', 'tog‘ cho‘qqisi'], answer: 3, why: 'Tog‘ cho‘qqisi qisqa vaqt timsoli emas.' },
    ],
    debate: [
      { claim: 'Mashhur bo‘lish uchun g‘ayrioddiy ish qilish kerak.', pro: 'Oddiy ishni hech kim eslamaydi.', con: 'Shoir aytganidek, ulug‘ binoga bir g‘isht qo‘yish ham umrni mazmunli qiladi.' },
      { claim: 'Telefon va ijtimoiy tarmoqlar yoshlarning vaqtini o‘g‘irlaydi.', pro: 'Soatlab maqsadsiz lenta aylantiriladi.', con: 'To‘g‘ri foydalanilsa, ular bilim va ijod manbai.' },
    ],
    creative: [
      { task: '1 daqiqa jim turing va shu lahzada sinfda nimalar sodir bo‘lganini 5 ta detal bilan aytib bering.', time: 90 },
      { task: '«Mening eng qimmatli 10 soniyam» — hayotingizdagi bir lahzani 3 gapda hikoya qiling.', time: 90 },
      { task: 'Vaqtni bir narsaga o‘xshating: «Vaqt — ... kabi, chunki ...». Eng o‘xshatishni sinf tanlasin.', time: 60 },
    ],
  },
];

const CONTENT = {
  adabiyot: { 8: [...ADABIYOT_8] },
  'ona-tili': { 8: [...ONA_TILI_8, ...ONA_TILI_8_PART2, ...ONA_TILI_8_PART3, ...ONA_TILI_8_PART4, ...ONA_TILI_8_PART5, ...ONA_TILI_8_PART6, ...ONA_TILI_8_PART7, ...ONA_TILI_8_PART8] },
};

/* --- Har bir fan uchun umumiy takrorlash savollari (to‘g‘ri javob — 0-variant, o‘yinda aralashtiriladi) --- */
const Q = (q, options) => ({ q, options, answer: 0 });
const GENERAL_BANK = {
  'ona-tili': [
    Q('Gapning bosh bo‘laklari qaysilar?', ['ega va kesim', 'to‘ldiruvchi va hol', 'aniqlovchi va hol', 'undalma va kirish so‘z']),
    Q('O‘zbek tilida nechta unli tovush bor?', ['6 ta', '5 ta', '8 ta', '10 ta']),
    Q('«Kitoblar» so‘zidagi -lar qanday qo‘shimcha?', ['ko‘plik qo‘shimchasi', 'egalik qo‘shimchasi', 'kelishik qo‘shimchasi', 'so‘z yasovchi']),
    Q('Qaysi so‘z sifat?', ['chiroyli', 'yugurmoq', 'kitob', 'beshta']),
    Q('Qaysi so‘z fe’l?', ['o‘qimoq', 'daftar', 'yashil', 'bugun']),
    Q('Bosh kelishik qanday qo‘shimchaga ega?', ['qo‘shimchasiz', '-ning', '-ga', '-da']),
    Q('«Daraxt» so‘zi qaysi so‘z turkumiga kiradi?', ['ot', 'sifat', 'fe’l', 'ravish']),
    Q('Sinonimlar qanday so‘zlar?', ['shakli har xil, ma’nosi yaqin so‘zlar', 'ma’nosi qarama-qarshi so‘zlar', 'shakli bir xil, ma’nosi boshqa so‘zlar', 'eskirgan so‘zlar']),
    Q('«Katta» so‘zining antonimini toping.', ['kichik', 'ulkan', 'baland', 'keng']),
    Q('-dan qo‘shimchasi qaysi kelishikka tegishli?', ['chiqish kelishigi', 'jo‘nalish kelishigi', 'o‘rin-payt kelishigi', 'tushum kelishigi']),
  ],
  adabiyot: [
    Q('«O‘tkan kunlar» romanining muallifi kim?', ['Abdulla Qodiriy', 'Cho‘lpon', 'Oybek', 'G‘afur G‘ulom']),
    Q('«Xamsa» asarini kim yozgan?', ['Alisher Navoiy', 'Zahiriddin Bobur', 'Ogahiy', 'Furqat']),
    Q('«Boburnoma» muallifi kim?', ['Zahiriddin Muhammad Bobur', 'Alisher Navoiy', 'Mirzo Ulug‘bek', 'Abdulla Qodiriy']),
    Q('«Shum bola» qissasining muallifi kim?', ['G‘afur G‘ulom', 'Abdulla Qahhor', 'Oybek', 'Hamza']),
    Q('«Kecha va kunduz» romanini kim yozgan?', ['Cho‘lpon', 'Abdulla Qodiriy', 'Oybek', 'Erkin Vohidov']),
    Q('«Navoiy» romanining muallifi kim?', ['Oybek', 'Cho‘lpon', 'Abdulla Qodiriy', 'Asqad Muxtor']),
    Q('Ruboiy necha misradan iborat?', ['4 ta', '2 ta', '6 ta', '8 ta']),
    Q('G‘azalning birinchi bayti nima deb ataladi?', ['matla’', 'maqta’', 'radif', 'qofiya']),
    Q('«Sariq devni minib» asarining muallifi kim?', ['Xudoyberdi To‘xtaboyev', 'Abdulla Qahhor', 'Erkin Vohidov', 'Anvar Obidjon']),
    Q('«Alpomish» qanday asar?', ['xalq dostoni', 'roman', 'g‘azal', 'drama']),
  ],
  matematika: [
    Q('7 × 8 = ?', ['56', '54', '64', '48']),
    Q('144 ning kvadrat ildizi nechaga teng?', ['12', '14', '11', '16']),
    Q('3/4 + 1/4 = ?', ['1', '4/8', '1/2', '3/16']),
    Q('2x + 5 = 15 bo‘lsa, x = ?', ['5', '10', '7', '4']),
    Q('Eng kichik tub son qaysi?', ['2', '1', '3', '0']),
    Q('25% qaysi kasrga teng?', ['1/4', '1/5', '1/2', '2/5']),
    Q('(−3) × (−4) = ?', ['12', '−12', '7', '−7']),
    Q('2³ = ?', ['8', '6', '9', '16']),
    Q('0,5 + 0,25 = ?', ['0,75', '0,30', '0,525', '1,25']),
    Q('10 − 2 × 3 ifodaning qiymati?', ['4', '24', '6', '14']),
  ],
  geometriya: [
    Q('Uchburchak ichki burchaklarining yig‘indisi?', ['180°', '360°', '90°', '270°']),
    Q('To‘rtburchak ichki burchaklarining yig‘indisi?', ['360°', '180°', '540°', '90°']),
    Q('Kvadratning tomoni 5 sm. Uning yuzi?', ['25 sm²', '20 sm²', '10 sm²', '15 sm²']),
    Q('To‘g‘ri burchak necha gradus?', ['90°', '180°', '45°', '60°']),
    Q('Doira yuzining formulasi?', ['S = πr²', 'S = 2πr', 'S = a²', 'S = ab/2']),
    Q('Pifagor teoremasi qaysi?', ['c² = a² + b²', 'c = a + b', 'c² = a² − b²', 'a² = b + c']),
    Q('Aylana uzunligining formulasi?', ['C = 2πr', 'C = πr²', 'C = r²', 'C = 4r']),
    Q('Teng tomonli uchburchakning har bir burchagi?', ['60°', '90°', '45°', '30°']),
    Q('Tomonlari 4 sm va 6 sm bo‘lgan to‘g‘ri to‘rtburchak perimetri?', ['20 sm', '24 sm', '10 sm', '16 sm']),
    Q('Katetlari 3 va 4 bo‘lgan to‘g‘ri burchakli uchburchak gipotenuzasi?', ['5', '7', '6', '12']),
  ],
  'ingliz-tili': [
    Q('«Book» so‘zining tarjimasi?', ['kitob', 'daftar', 'qalam', 'stol']),
    Q('She ___ a student.', ['is', 'am', 'are', 'be']),
    Q('«Apple» so‘zining ko‘plik shakli?', ['apples', 'applees', 'appls', 'apple']),
    Q('«Go» fe’lining Past Simple shakli?', ['went', 'goed', 'gone', 'going']),
    Q('«Big» so‘zining antonimi?', ['small', 'tall', 'large', 'long']),
    Q('I ___ English every day.', ['study', 'studies', 'studying', 'to study']),
    Q('«Teacher» so‘zining tarjimasi?', ['o‘qituvchi', 'o‘quvchi', 'shifokor', 'haydovchi']),
    Q('Qaysi so‘z rangni bildiradi?', ['green', 'chair', 'run', 'happy']),
    Q('They ___ playing football now.', ['are', 'is', 'am', 'be']),
    Q('«Good» so‘zining qiyosiy darajasi?', ['better', 'gooder', 'best', 'more good']),
  ],
  'rus-tili': [
    Q('«Kitob» so‘zining ruschasi?', ['книга', 'тетрадь', 'ручка', 'стол']),
    Q('«Мама» so‘zi qaysi rodda?', ['женский род', 'мужской род', 'средний род', 'rodi yo‘q']),
    Q('«Окно» so‘zi qaysi rodda?', ['средний род', 'мужской род', 'женский род', 'faqat ko‘plik']),
    Q('«Спасибо» so‘zining tarjimasi?', ['rahmat', 'salom', 'kechirasiz', 'xayr']),
    Q('«Я ___ в школе.» Bo‘sh joyga mos so‘z?', ['учусь', 'учишься', 'учится', 'учатся']),
    Q('«Большой» so‘zining antonimi?', ['маленький', 'высокий', 'длинный', 'широкий']),
    Q('Rus alifbosida nechta harf bor?', ['33 ta', '32 ta', '30 ta', '26 ta']),
    Q('«Дом» so‘zining ko‘plik shakli?', ['дома', 'домы', 'доме', 'дому']),
    Q('«До свидания» tarjimasi?', ['xayr', 'salom', 'rahmat', 'iltimos']),
    Q('Qaysi so‘z fe’l (глагол)?', ['читать', 'красивый', 'стол', 'быстро']),
  ],
  tarix: [
    Q('Amir Temur qachon tug‘ilgan?', ['1336-yil', '1370-yil', '1405-yil', '1220-yil']),
    Q('O‘zbekiston mustaqilligi qachon e’lon qilingan?', ['1991-yil 31-avgust', '1992-yil 8-dekabr', '1990-yil 20-iyun', '1993-yil 1-sentabr']),
    Q('Mirzo Ulug‘bek rasadxonasi qaysi shaharda qurilgan?', ['Samarqand', 'Buxoro', 'Xiva', 'Toshkent']),
    Q('Amir Temur davlatining poytaxti qaysi shahar edi?', ['Samarqand', 'Hirot', 'Buxoro', 'Qo‘qon']),
    Q('Algebra fanining asoschisi hisoblangan olim?', ['Muhammad al-Xorazmiy', 'Abu Ali ibn Sino', 'Abu Rayhon Beruniy', 'Abu Nasr Farobiy']),
    Q('«Tib qonunlari» asarining muallifi kim?', ['Abu Ali ibn Sino', 'Abu Rayhon Beruniy', 'Mirzo Ulug‘bek', 'Muhammad al-Xorazmiy']),
    Q('Ikkinchi jahon urushi qachon tugagan?', ['1945-yil', '1941-yil', '1939-yil', '1918-yil']),
    Q('Buyuk ipak yo‘li qaysi hududlarni bog‘lagan?', ['Xitoy va O‘rta yer dengizi bo‘yi', 'Amerika va Yevropa', 'Afrika va Avstraliya', 'Yaponiya va Kanada']),
    Q('Zahiriddin Muhammad Bobur qaysi sulolaga asos solgan?', ['Boburiylar (Hindistonda)', 'Temuriylar', 'Shayboniylar', 'Mang‘itlar']),
    Q('Qadimgi Misr hukmdorlari qanday atalgan?', ['fir’avn', 'xon', 'imperator', 'sulton']),
  ],
  geografiya: [
    Q('O‘zbekistonning poytaxti qaysi shahar?', ['Toshkent', 'Samarqand', 'Buxoro', 'Namangan']),
    Q('Dunyodagi eng katta okean qaysi?', ['Tinch okeani', 'Atlantika okeani', 'Hind okeani', 'Shimoliy Muz okeani']),
    Q('O‘zbekistonda nechta viloyat bor?', ['12 ta', '14 ta', '10 ta', '13 ta']),
    Q('Eng katta materik qaysi?', ['Yevrosiyo', 'Afrika', 'Shimoliy Amerika', 'Antarktida']),
    Q('Amudaryo va Sirdaryo tarixan qaysi dengizga quyilgan?', ['Orol dengizi', 'Kaspiy dengizi', 'Qora dengiz', 'O‘rta yer dengizi']),
    Q('Yer yuzidagi eng baland cho‘qqi?', ['Everest (Jomolungma)', 'Elbrus', 'Kilimanjaro', 'Monblan']),
    Q('Qaysi davlat O‘zbekiston bilan chegaradosh emas?', ['Rossiya', 'Qozog‘iston', 'Afg‘oniston', 'Turkmaniston']),
    Q('Ekvator Yerni qaysi yarim sharlarga bo‘ladi?', ['Shimoliy va Janubiy', 'Sharqiy va G‘arbiy', 'Ichki va tashqi', 'Yuqori va quyi']),
    Q('An’anaviy hisobda dunyodagi eng uzun daryo?', ['Nil', 'Amazonka', 'Volga', 'Amudaryo']),
    Q('Kompas strelkasining ko‘k uchi qaysi tomonni ko‘rsatadi?', ['shimol', 'janub', 'sharq', 'g‘arb']),
  ],
  biologiya: [
    Q('Hujayradagi irsiy axborot qayerda saqlanadi?', ['yadroda', 'membranada', 'sitoplazmada', 'vakuolda']),
    Q('Fotosintezda o‘simlik qaysi gazni yutadi?', ['karbonat angidrid (CO₂)', 'kislorod', 'azot', 'vodorod']),
    Q('Odam yuragi necha kameradan iborat?', ['4 ta', '2 ta', '3 ta', '5 ta']),
    Q('Qonga qizil rang beradigan modda?', ['gemoglobin', 'plazma', 'trombotsit', 'leykotsit']),
    Q('Fotosintez qaysi organoidda boradi?', ['xloroplastda', 'mitoxondriyada', 'ribosomada', 'yadroda']),
    Q('Hasharotlarning nechta oyog‘i bor?', ['6 ta', '8 ta', '4 ta', '10 ta']),
    Q('Odam skeletidagi eng uzun suyak?', ['son suyagi', 'yelka suyagi', 'umurtqa', 'qovurg‘a']),
    Q('Kit qaysi sinfga kiradi?', ['sutemizuvchilar', 'baliqlar', 'sudralib yuruvchilar', 'qushlar']),
    Q('Hujayraning «energiya stansiyasi» qaysi organoid?', ['mitoxondriya', 'yadro', 'ribosoma', 'Golji apparati']),
    Q('Nafas olishda organizm qaysi gazdan foydalanadi?', ['kislorod', 'karbonat angidrid', 'azot', 'is gazi']),
  ],
  fizika: [
    Q('Kuchning SI dagi o‘lchov birligi?', ['nyuton', 'joul', 'vatt', 'paskal']),
    Q('Yorug‘likning vakuumdagi tezligi taxminan?', ['300 000 km/s', '300 km/s', '3 000 km/s', '30 000 km/s']),
    Q('Ishning o‘lchov birligi?', ['joul', 'nyuton', 'amper', 'volt']),
    Q('Erkin tushish tezlanishi taxminan?', ['9,8 m/s²', '1 m/s²', '98 m/s²', '0,98 m/s²']),
    Q('Tok kuchining o‘lchov birligi?', ['amper', 'volt', 'om', 'vatt']),
    Q('Normal bosimda suv necha gradusda qaynaydi?', ['100 °C', '90 °C', '0 °C', '120 °C']),
    Q('Zanjir qismi uchun Om qonuni?', ['I = U / R', 'U = I / R', 'R = U · I', 'I = R / U']),
    Q('Tezlik formulasi?', ['v = s / t', 'v = s · t', 'v = t / s', 'v = m · a']),
    Q('Quvvatning o‘lchov birligi?', ['vatt', 'joul', 'nyuton', 'paskal']),
    Q('Bosimning o‘lchov birligi?', ['paskal', 'nyuton', 'kilogramm', 'metr']),
  ],
  kimyo: [
    Q('Suvning kimyoviy formulasi?', ['H₂O', 'CO₂', 'O₂', 'NaCl']),
    Q('Osh tuzining formulasi?', ['NaCl', 'KCl', 'H₂O', 'CaCO₃']),
    Q('Kislorodning kimyoviy belgisi?', ['O', 'K', 'Ok', 'C']),
    Q('Davriy jadvaldagi 1-element?', ['vodorod', 'geliy', 'kislorod', 'uglerod']),
    Q('Temirning kimyoviy belgisi?', ['Fe', 'Te', 'Ti', 'F']),
    Q('pH = 7 bo‘lgan muhit qanday?', ['neytral', 'kislotali', 'ishqoriy', 'kuchli kislotali']),
    Q('Karbonat angidridning formulasi?', ['CO₂', 'CO', 'C₂O', 'O₂']),
    Q('Oltinning kimyoviy belgisi?', ['Au', 'Ag', 'Al', 'Ot']),
    Q('Inert (asil) gazni toping.', ['geliy', 'kislorod', 'azot', 'xlor']),
    Q('Atom yadrosi qanday zarrachalardan iborat?', ['proton va neytronlardan', 'elektron va protonlardan', 'faqat elektronlardan', 'fotonlardan']),
  ],
  informatika: [
    Q('1 bayt necha bitga teng?', ['8', '10', '4', '16']),
    Q('Kompyuterning «miyasi» qaysi qurilma?', ['protsessor', 'monitor', 'sichqoncha', 'klaviatura']),
    Q('Qaysi biri ma’lumot kiritish qurilmasi?', ['klaviatura', 'monitor', 'printer', 'karnay']),
    Q('1 KB necha baytga teng?', ['1024', '1 000 000', '100', '8']),
    Q('Ikkilik sanoq sistemasida qaysi raqamlar ishlatiladi?', ['0 va 1', '0 dan 9 gacha', '1 va 2', '0 dan 7 gacha']),
    Q('Veb-sahifalar qaysi tilda belgilanadi?', ['HTML', 'MP3', 'JPEG', 'ZIP']),
    Q('Matnni nusxalash uchun tugmalar birikmasi?', ['Ctrl + C', 'Ctrl + V', 'Ctrl + Z', 'Ctrl + P']),
    Q('Ikkilik sistemadagi 101 soni o‘nlikda nechaga teng?', ['5', '3', '101', '6']),
    Q('Operatsion tizimni toping.', ['Windows', 'Google', 'Telegram', 'Excel']),
    Q('Qaysi biri ma’lumot saqlash qurilmasi?', ['fleshka', 'monitor', 'sichqoncha', 'mikrofon']),
  ],
};

/** Har bir fan va sinf uchun "Umumiy takrorlash" mavzusi — Test, Savol - javob va Portlash o‘yinlari ishlaydi. */
function makeGeneralTopic(subject) {
  const quiz = GENERAL_BANK[subject.id] || [];
  return {
    id: 'umumiy',
    general: true,
    title: `${subject.name}: umumiy takrorlash`,
    short: 'Namuna savollar — Test, Savol - javob va Portlash o‘yinlari uchun',
    lesson: [
      {
        title: 'Takrorlash darsi',
        text: `Bu mavzu «${subject.name}» fanidan asosiy bilimlarni takrorlash uchun mo‘ljallangan. Darslik mavzulari bosqichma-bosqich qo‘shiladi. Hozir savollar asosida o‘yinlarni o‘ynashingiz mumkin.`,
        examples: ['Test', 'Savol - javob', 'Portlash'],
      },
    ],
    pairs: [],
    quiz,
    sort: null,
    qa: quiz.map((x) => ({ q: x.q, a: x.options[x.answer] })),
  };
}

/** O‘yin uchun mavzuda yetarli ma’lumot bormi? */
function gameAvailable(gameId, topic) {
  if (!topic) return false;
  if (gameId === 'match' || gameId === 'memory') return (topic.pairs || []).length >= 3;
  if (gameId === 'sort') return !!(topic.sort && topic.sort.items.length);
  if (gameId === 'quiz') return (topic.quiz || []).length > 0;
  if (gameId === 'qa') return (topic.qa || []).length > 0;
  if (gameId === 'boom') return (topic.quiz || []).length + (topic.qa || []).length >= 4;
  if (gameId === 'truefalse') return (topic.pairs || []).length + (topic.quiz || []).length >= 4;
  if (gameId === 'anagram' || gameId === 'hangman') return wordCards(topic).length >= 3;
  if (gameId === 'millioner') return (topic.quiz || []).length >= 3;
  if (gameId === 'race') return (topic.quiz || []).length + (topic.pairs || []).length >= 6;
  if (gameId === 'sequence') return (topic.sequences || []).some((x) => (x.items || []).length >= 3);
  if (gameId === 'odd') return (topic.odd || []).length >= 2;
  if (gameId === 'debate') return (topic.debate || []).length > 0;
  if (gameId === 'creative') return (topic.creative || []).length > 0;
  return false;
}

const GAMES = [
  { id: 'match', name: 'Moslashtirish', desc: 'Atama va ta’rifni juftlang', icon: Shuffle, color: 'bg-blue-600' },
  { id: 'memory', name: 'Xotira', desc: 'Yashirin kartalardan juftlik toping', icon: Brain, color: 'bg-indigo-600' },
  { id: 'quiz', name: 'Test', desc: '4 variantli savollar', icon: ListChecks, color: 'bg-sky-600' },
  { id: 'sort', name: 'Joyda', desc: 'Har bir so‘zni o‘z joyiga qo‘ying', icon: Target, color: 'bg-emerald-600' },
  { id: 'qa', name: 'Savol - javob', desc: 'Taymerli og‘zaki savollar', icon: MessageCircleQuestion, color: 'bg-amber-500' },
  { id: 'boom', name: 'Portlash', desc: 'Raqamli qutilar: savol, bomba yoki sovg‘a!', icon: Bomb, color: 'bg-rose-500', hot: true },
  { id: 'truefalse', name: 'Rostmi?', desc: '10 soniyada: rost yoki yolg‘on', icon: ThumbsUp, color: 'bg-violet-600', fresh: true },
  { id: 'anagram', name: 'Harflar', desc: 'Aralash harflardan so‘z yig‘ing', icon: Puzzle, color: 'bg-teal-600', fresh: true },
  { id: 'hangman', name: 'Yashirin so‘z', desc: 'Harflarni topib so‘zni oching', icon: SpellCheck, color: 'bg-fuchsia-600', fresh: true },
  { id: 'millioner', name: 'Millioner', desc: 'Narvon, 50:50 va sinf yordami', icon: Crown, color: 'bg-indigo-800', fresh: true },
  { id: 'race', name: 'Poyga', desc: 'Jamoalar marraga qarab yuguradi', icon: Rocket, color: 'bg-orange-500', fresh: true },
  { id: 'sequence', name: 'Voqealar zanjiri', desc: 'Voqealarni to‘g‘ri tartibda tiklang', icon: ListOrdered, color: 'bg-cyan-600', fresh: true },
  { id: 'odd', name: 'Ortiqchasini top', desc: 'To‘rttadan bittasi guruhga kirmaydi', icon: Shapes, color: 'bg-teal-700', fresh: true },
  { id: 'debate', name: 'Bahs maydoni', desc: 'Ikki tomon dalil keltiradi, o‘qituvchi baholaydi', icon: Scale, color: 'bg-amber-600', fresh: true },
  { id: 'creative', name: 'Ijodiy topshiriq', desc: 'Yopiq karta, taymer va yulduzli baho', icon: Palette, color: 'bg-fuchsia-700', fresh: true },
];

/** Har bir mavzuda boshqacha «bugungi o‘yinlar» to‘plami — darslar bir xil bo‘lib qolmasin. */
const FEATURED_COUNT = 5;
/** O‘yin turlari: har darsda 2 ta bilim, 2 ta so‘z va 1 ta jamoaviy o‘yin chiqadi. */
const GAME_GROUPS = [
  { ids: ['quiz', 'truefalse', 'millioner', 'qa'], take: 2 },
  { ids: ['match', 'anagram', 'memory', 'hangman', 'sort'], take: 2 },
  { ids: ['boom', 'race'], take: 1 },
  { ids: ['sequence', 'odd', 'debate', 'creative'], take: 2 },
];
const THINK_GAMES = ['sequence', 'odd', 'debate', 'creative'];
function featuredGames(topic, index) {
  if (!topic) return [];
  const avail = GAMES.filter((g) => !g.disabled && gameAvailable(g.id, topic)).map((g) => g.id);
  if (Array.isArray(topic.games) && topic.games.length) return topic.games.filter((id) => avail.includes(id));
  let seed = index;
  if (!(seed >= 0)) seed = [...String(topic.id)].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7) % 997;
  const out = [];
  const hasThink = avail.some((id) => THINK_GAMES.includes(id));
  GAME_GROUPS.forEach(({ ids, take: baseTake }) => {
    const pool = ids.filter((id) => avail.includes(id));
    // Fikrlash o‘yinlari bor mavzuda so‘z o‘yinlaridan bittasi kamroq chiqadi
    const take = hasThink && ids.includes('match') ? 1 : baseTake;
    const start = (take === 2 && pool.length === 4 ? seed : seed * take) % (pool.length || 1);
    for (let k = 0; k < Math.min(take, pool.length); k++) out.push(pool[(start + k) % pool.length]);
  });
  // Biror guruh bo‘sh qolsa, qolgan o‘yinlardan to‘ldiramiz
  for (const id of avail) { if (out.length >= FEATURED_COUNT) break; if (!out.includes(id)) out.push(id); }
  const r = seed % (out.length || 1);
  return [...out.slice(r), ...out.slice(0, r)];
}

const PICKERS = [
  { id: 'camera', name: 'Kamera', desc: 'Kamera orqali tasodifiy tanlash', icon: Camera },
  { id: 'list', name: 'Ro‘yxat', desc: 'Ro‘yxatdan tanlash va guruhlash', icon: List },
  { id: 'wheel', name: 'Doira', desc: 'Barabanni aylantirib tanlash', icon: Disc3 },
  { id: 'extra', name: 'Qo‘shimcha', desc: 'Keyingi g‘oya uchun joy', icon: PlusCircle, disabled: true },
];

const TEAM_STYLES = [
  { bg: 'bg-blue-600', light: 'bg-blue-50', text: 'text-blue-700', ring: 'ring-blue-500', border: 'border-blue-500' },
  { bg: 'bg-rose-500', light: 'bg-rose-50', text: 'text-rose-600', ring: 'ring-rose-400', border: 'border-rose-400' },
  { bg: 'bg-emerald-500', light: 'bg-emerald-50', text: 'text-emerald-700', ring: 'ring-emerald-400', border: 'border-emerald-400' },
  { bg: 'bg-amber-500', light: 'bg-amber-50', text: 'text-amber-700', ring: 'ring-amber-400', border: 'border-amber-400' },
];

const WHEEL_COLORS = ['#2563EB', '#1E3A8A', '#0EA5E9', '#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

/* ============================================================
   2. YORDAMCHI FUNKSIYALAR
   ============================================================ */

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function initials(name = '') {
  return name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase() || 'O‘';
}

function teamLabel(count, i) {
  return count === 1 ? 'Yakka o‘yin' : `${i + 1}-jamoa`;
}

/* ============================================================
   3. UMUMIY UI KOMPONENTLAR
   ============================================================ */

/* ============================================================
   OVOZ EFFEKTLARI (WebAudio — tashqi fayl kerak emas)
   ============================================================ */
const SOUND_KEY = 'darsplay_sound_v1';
let soundOn = true;
try { soundOn = localStorage.getItem(SOUND_KEY) !== 'off'; } catch { /* server yoki taqiqlangan */ }
let audioCtx = null;
const lastPlayed = {};
const soundListeners = new Set();

function getAudioCtx() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const C = window.AudioContext || window.webkitAudioContext;
    if (!C) return null;
    audioCtx = new C();
  }
  if (audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}

function tone(ctx, freq, start, dur, type = 'sine', vol = 0.18, slideTo = null) {
  const t0 = ctx.currentTime + start;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t0);
  if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(vol, t0 + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  o.connect(g).connect(ctx.destination);
  o.start(t0);
  o.stop(t0 + dur + 0.05);
}

const SOUNDS = {
  correct: (c) => { tone(c, 660, 0, 0.12, 'triangle'); tone(c, 990, 0.1, 0.25, 'triangle'); },
  wrong: (c) => { tone(c, 240, 0, 0.3, 'sawtooth', 0.1, 130); },
  tick: (c) => tone(c, 1250, 0, 0.05, 'square', 0.05),
  flip: (c) => tone(c, 420, 0, 0.09, 'sine', 0.1, 760),
  boom: (c) => { tone(c, 140, 0, 0.7, 'sawtooth', 0.22, 35); tone(c, 70, 0.05, 0.6, 'square', 0.12, 30); },
  gift: (c) => { [784, 988, 1175, 1568].forEach((f, i) => tone(c, f, i * 0.07, 0.16, 'triangle', 0.12)); },
  win: (c) => {
    [523, 659, 784, 1047].forEach((f, i) => tone(c, f, i * 0.13, 0.3, 'triangle', 0.16));
    tone(c, 1047, 0.55, 0.7, 'triangle', 0.14);
    tone(c, 1319, 0.55, 0.7, 'sine', 0.08);
  },
};

function playSound(name) {
  if (!soundOn || !SOUNDS[name]) return;
  const now = Date.now();
  if (lastPlayed[name] && now - lastPlayed[name] < 250) return;
  const fb = name === 'correct' || name === 'wrong';
  if (fb && lastPlayed.__fb && now - lastPlayed.__fb < 400) return;
  lastPlayed[name] = now;
  if (fb) lastPlayed.__fb = now;
  try { const c = getAudioCtx(); if (c) SOUNDS[name](c); } catch { /* ovozsiz davom etamiz */ }
}

function setSoundOn(v) {
  soundOn = v;
  try { localStorage.setItem(SOUND_KEY, v ? 'on' : 'off'); } catch { /* */ }
  soundListeners.forEach((f) => f(v));
  if (v) playSound('correct');
}

function useSoundOn() {
  const [v, setV] = useState(true);
  useEffect(() => {
    setV(soundOn);
    soundListeners.add(setV);
    return () => soundListeners.delete(setV);
  }, []);
  return v;
}

/** G‘alaba uchun rangli konfetti (faqat CSS). */
function Confetti({ count = 90 }) {
  const pieces = useMemo(
    () => Array.from({ length: count }, (_, i) => ({
      left: Math.random() * 100,
      delay: Math.random() * 0.9,
      dur: 2.4 + Math.random() * 2,
      color: WHEEL_COLORS[i % WHEEL_COLORS.length],
      w: 7 + Math.random() * 8,
      round: Math.random() < 0.3,
    })),
    [count]
  );
  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden" aria-hidden="true">
      {pieces.map((p, i) => (
        <span
          key={i}
          className="dp-confetti absolute -top-6 block"
          style={{
            left: `${p.left}%`, width: p.w, height: p.round ? p.w : p.w * 0.45 + 4, background: p.color,
            borderRadius: p.round ? '9999px' : '2px', animationDelay: `${p.delay}s`, animationDuration: `${p.dur}s`,
          }}
        />
      ))}
    </div>
  );
}

function Logo({ size = 44, showText = true, textClass = 'text-2xl' }) {
  return (
    <div className="flex items-center gap-3 select-none">
      <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
        <rect x="2" y="2" width="60" height="60" rx="18" fill="#2563EB" />
        <rect x="2" y="2" width="60" height="60" rx="18" fill="none" stroke="#1E3A8A" strokeWidth="3" />
        <path d="M25 15 L45 28 L25 41 Z" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="4" strokeLinejoin="round" />
        <path d="M18 47 Q32 58 46 47" fill="none" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" />
      </svg>
      {showText && (
        <span className={`${textClass} font-extrabold tracking-tight leading-none`}>
          <span className="text-blue-900">Dars</span> <span className="text-blue-600">play</span>
          <span className="ml-2 inline-block -translate-y-1 rounded-full bg-amber-400 px-2 py-0.5 align-middle text-[0.45em] font-extrabold uppercase tracking-wider text-amber-950">Beta</span>
        </span>
      )}
    </div>
  );
}

function BackButton({ onClick, label = 'Orqaga' }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-2xl border-2 border-blue-200 bg-white px-5 py-3 text-lg font-bold text-blue-900 shadow-sm transition hover:border-blue-500 hover:bg-blue-50 active:scale-95"
    >
      <ArrowLeft size={24} /> {label}
    </button>
  );
}

function PageTitle({ title, subtitle, onBack, right }) {
  return (
    <div className="mb-8 flex flex-wrap items-center gap-4">
      {onBack && <BackButton onClick={onBack} />}
      <div className="flex-1 min-w-0">
        <h1 className="text-3xl md:text-4xl font-extrabold text-blue-950">{title}</h1>
        {subtitle && <p className="mt-1 text-lg md:text-xl text-slate-500">{subtitle}</p>}
      </div>
      {right}
    </div>
  );
}

function PrimaryButton({ children, onClick, disabled, className = '', icon: Icon = null }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-3 rounded-2xl bg-blue-600 px-8 py-4 text-xl md:text-2xl font-extrabold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-700 active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none ${className}`}
    >
      {children}
      {Icon && <Icon size={28} />}
    </button>
  );
}

function Modal({ children, onClose, wide = false }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-950/50 p-4 backdrop-blur-sm">
      <div className={`dp-pop relative max-h-[94vh] w-full overflow-y-auto rounded-3xl bg-white p-6 md:p-8 shadow-2xl ${wide ? 'max-w-6xl' : 'max-w-2xl'}`}>
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Yopish"
            className="absolute right-4 top-4 rounded-full bg-slate-100 p-2 text-slate-600 transition hover:bg-slate-200"
          >
            <X size={28} />
          </button>
        )}
        {children}
      </div>
    </div>
  );
}

function Header({ teacher, crumbs, onHome, onLogout, isFs, toggleFs, onHelp }) {
  const sound = useSoundOn();
  return (
    <header className="sticky top-0 z-40 border-b border-blue-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 md:px-8">
        <button onClick={onHome} aria-label="Bosh sahifa">
          <Logo size={44} textClass="text-2xl" />
        </button>
        <nav className="hidden flex-1 items-center gap-2 overflow-hidden lg:flex">
          {crumbs.map((c, i) => (
            <span key={i} className="flex items-center gap-2 text-base font-semibold text-slate-500 whitespace-nowrap">
              <ChevronRight size={18} className="text-blue-300" />
              <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-800">{c}</span>
            </span>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          {onHelp && (
            <button
              onClick={onHelp}
              title="Qo‘llanma"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-blue-100 p-2.5 text-blue-800 transition hover:bg-blue-50"
            >
              <CircleHelp size={24} /> <span className="hidden text-base font-bold xl:inline">Qo‘llanma</span>
            </button>
          )}
          <button
            onClick={() => setSoundOn(!sound)}
            title={sound ? 'Ovozni o‘chirish' : 'Ovozni yoqish'}
            className={`rounded-xl border-2 p-2.5 transition hover:bg-blue-50 ${sound ? 'border-blue-100 text-blue-800' : 'border-rose-200 text-rose-600'}`}
          >
            {sound ? <Volume2 size={24} /> : <VolumeX size={24} />}
          </button>
          <button
            onClick={toggleFs}
            title={isFs ? 'To‘liq ekrandan chiqish' : 'To‘liq ekran'}
            className="rounded-xl border-2 border-blue-100 p-2.5 text-blue-800 transition hover:bg-blue-50"
          >
            {isFs ? <Minimize size={24} /> : <Maximize size={24} />}
          </button>
          {teacher && teacher.name && (
            <>
              <div className="hidden items-center gap-2 rounded-xl bg-blue-50 px-3 py-1.5 md:flex">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-900 text-sm font-bold text-white">
                  {initials(teacher.name)}
                </div>
                <div className="leading-tight">
                  <div className="text-sm font-bold text-blue-950">{teacher.name}</div>
                  <div className="text-xs text-slate-500">{teacher.school}</div>
                </div>
              </div>
              <button
                onClick={onLogout}
                title="Chiqish"
                className="rounded-xl border-2 border-blue-100 p-2.5 text-slate-600 transition hover:border-rose-300 hover:text-rose-600"
              >
                <LogOut size={24} />
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

/* ============================================================
   4. MA’LUMOTLAR OMBORI (mock), KIRISH VA ADMIN PANELI
   ------------------------------------------------------------
   Hozircha barcha ma’lumot brauzerning localStorage’ida saqlanadi
   (bitta kompyuter ichida umumiy). Supabase ulanganda faqat
   loadDb / saveDb funksiyalari almashtiriladi. Taxminiy jadvallar:
     teachers(id, login unique, password_hash, name, school, region, subject, created_at)
     classes(id, school, grade, letter, students text[], created_by → teachers.id, updated_at,
             unique(school, grade, letter))
   ============================================================ */

const DB_KEY = 'darsplay_db_v1';
const SESSION_KEY = 'darsplay_session_v1';
const CLASS_LETTERS = ['A', 'B', 'V', 'G', 'D', 'E', 'J', 'Z'];

const normSchool = (s = '') => s.trim().toLowerCase().replace(/\s+/g, ' ');
const classLabel = (c) => (c ? `${c.grade}-${c.letter}` : '');
const uid = (p) => `${p}_${Math.random().toString(36).slice(2, 9)}${Date.now().toString(36).slice(-4)}`;

function genPassword() {
  const chars = 'abcdefghjkmnpqrstuvwxyz23456789';
  return Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

const CYR = {
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'yo', ж: 'j', з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm',
  н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'x', ц: 's', ч: 'ch', ш: 'sh', щ: 'sh',
  ъ: '', ь: '', ы: 'i', э: 'e', ю: 'yu', я: 'ya', ў: 'o', қ: 'q', ғ: 'g', ҳ: 'h',
};

function suggestLogin(name = '') {
  const s = [...name.toLowerCase()].map((ch) => (CYR[ch] !== undefined ? CYR[ch] : ch)).join('');
  const parts = s.replace(/[^a-z\s-]/g, '').split(/[\s-]+/).filter(Boolean);
  if (!parts.length) return '';
  return (parts[0] + (parts[1] ? '.' + parts[1][0] : '')).slice(0, 20);
}

function seedDb() {
  const teacher = {
    id: 't_demo', login: 'demo', password: 'demo123', name: 'Karimova Dilfuza',
    school: '45-maktab', region: 'Toshkent shahri', subject: 'ona-tili', createdAt: 0,
  };
  return {
    version: 1,
    admin: { login: 'admin', password: 'admin123' },
    teachers: [teacher],
    classes: [
      { id: 'c_demo', school: '45-maktab', grade: 8, letter: 'A', students: [...DEFAULT_ROSTER], createdBy: 't_demo', createdByName: teacher.name, updatedAt: 0 },
    ],
  };
}

function loadDb() {
  try {
    const raw = localStorage.getItem(DB_KEY);
    if (raw) {
      const d = JSON.parse(raw);
      if (d && d.admin && Array.isArray(d.teachers) && Array.isArray(d.classes)) return d;
    }
  } catch { /* localStorage mavjud emas */ }
  return seedDb();
}

function saveDb(d) {
  try { localStorage.setItem(DB_KEY, JSON.stringify(d)); } catch { /* */ }
}

function parseStudents(text) {
  return Array.from(new Set(text.split('\n').map((s) => s.trim()).filter(Boolean)));
}

function copyText(text) {
  try { navigator.clipboard?.writeText(text); return true; } catch { return false; }
}

/* ---------- Supabase (ulangan bo‘lsa) ---------- */
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const LOGIN_DOMAIN = 'darsplay.uz';
const supabase = SUPABASE_URL && SUPABASE_ANON_KEY ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;
const REMOTE = !!supabase; // false bo‘lsa — demo rejim (localStorage)

const loginToEmail = (login) => `${login.trim().toLowerCase()}@${LOGIN_DOMAIN}`;
const errText = (e) => e?.message || String(e || 'Noma’lum xato');
const mapTeacherRow = (r) => ({
  id: r.id, login: r.login, name: r.name, school: r.school, region: r.region || '',
  subject: r.subject || '', role: r.role, createdAt: Date.parse(r.created_at) || 0,
});
const mapClassRow = (r) => ({
  id: r.id, school: r.school, grade: r.grade, letter: r.letter, students: r.students || [],
  createdBy: r.created_by, createdByName: r.created_by_name, updatedAt: Date.parse(r.updated_at) || 0,
});

const mapSetRow = (r) => ({
  id: r.id, ownerId: r.owner_id, ownerName: r.owner_name, school: r.school, subject: r.subject, grade: r.grade,
  title: r.title, shared: r.shared, data: r.data || {}, updatedAt: Date.parse(r.updated_at) || 0,
});

async function remoteProfile(userId) {
  const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
  if (error) throw error;
  return data;
}

async function remoteLoadData(profile) {
  const { data: classes, error: cErr } = await supabase.from('classes').select('*').order('grade').order('letter');
  if (cErr) throw cErr;
  let teachers = [mapTeacherRow(profile)];
  if (profile.role === 'admin') {
    const { data, error } = await supabase.from('profiles').select('*').eq('role', 'teacher').order('school').order('name');
    if (error) throw error;
    teachers = data.map(mapTeacherRow);
  }
  const { data: sets, error: sErr } = await supabase.from('custom_sets').select('*').order('updated_at', { ascending: false });
  if (sErr) throw sErr;
  return {
    version: 1,
    admin: { login: profile.role === 'admin' ? profile.login : 'admin', password: '' },
    teachers,
    classes: (classes || []).map(mapClassRow),
    customSets: (sets || []).map(mapSetRow),
  };
}

// Administrator amallari — bazadagi himoyalangan funksiyalar (RPC) orqali.
// Har bir funksiya ichida chaqiruvchi admin ekani tekshiriladi; maxfiy kalit kerak emas.
async function adminApi(action, p = {}) {
  const calls = {
    createTeacher: () => supabase.rpc('admin_create_teacher', {
      p_login: p.login, p_password: p.password, p_name: p.name, p_school: p.school,
      p_region: p.region || null, p_subject: p.subject || null,
    }),
    updateTeacher: () => supabase.rpc('admin_update_teacher', {
      p_id: p.id, p_login: p.login, p_name: p.name, p_school: p.school,
      p_region: p.region || null, p_subject: p.subject || null, p_password: p.password || null,
    }),
    resetPassword: () => supabase.rpc('admin_reset_password', { p_id: p.id, p_password: p.password }),
    deleteTeacher: () => supabase.rpc('admin_delete_teacher', { p_id: p.id }),
  };
  if (!calls[action]) throw new Error('Noma’lum amal');
  const { data, error } = await calls[action]();
  if (error) throw new Error(/fetch|network/i.test(error.message) ? 'Serverga ulanib bo‘lmadi' : error.message);
  return data;
}

const inputCls = 'w-full rounded-2xl border-2 border-slate-200 bg-white px-5 py-4 text-xl text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100';

function Field({ label, children, error }) {
  return (
    <div>
      <label className="mb-2 block text-lg font-bold text-blue-950">{label}</label>
      {children}
      {error && <p data-err="1" className="mt-1 text-base font-semibold text-rose-600">{error}</p>}
    </div>
  );
}

/* ---------- Kirish ekrani ---------- */
function LoginScreen({ onLogin }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [shakeKey, setShakeKey] = useState(0);

  const [busy, setBusy] = useState(false);
  const attempt = async (l, p) => {
    if (busy) return;
    if (!l.trim() || !p.trim()) { setError('Login va parolni kiriting'); setShakeKey((k) => k + 1); return; }
    setBusy(true);
    const err = await onLogin(l, p);
    setBusy(false);
    if (err) { setError(err); setShakeKey((k) => k + 1); } else setError('');
  };

  const submit = (e) => {
    e.preventDefault();
    attempt(login, password);
  };

  const noAuto = { autoCapitalize: 'none', autoCorrect: 'off', spellCheck: false };

  return (
    <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-10 md:grid-cols-2 md:px-8 md:py-16">
      <div>
        <Logo size={88} textClass="text-5xl md:text-6xl" />
        <h1 className="mt-8 text-4xl md:text-5xl font-extrabold leading-tight text-blue-950">Darsni o‘yinga aylantiring!</h1>
        <p className="mt-4 text-xl text-slate-600">
          5–11-sinflar uchun interaktiv darslar va o‘yinlar. Login va parolni Dars play administratori beradi.
        </p>
        <div className="mt-8 grid grid-cols-3 gap-3">
          {[
            { icon: LayoutGrid, t: '11 xil o‘yin' },
            { icon: Users, t: 'Tayyor sinf ro‘yxatlari' },
            { icon: UserCheck, t: '4 tanlash usuli' },
          ].map(({ icon: I, t }) => (
            <div key={t} className="rounded-2xl border-2 border-blue-100 bg-white p-4 text-center">
              <I className="mx-auto text-blue-600" size={32} />
              <div className="mt-2 font-bold text-blue-950">{t}</div>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={submit} noValidate className="rounded-3xl border-2 border-blue-100 bg-white p-8 shadow-xl shadow-blue-900/5 md:p-10">
        <h2 className="text-3xl font-extrabold text-blue-950">Tizimga kirish</h2>
        <p className="mt-2 text-lg text-slate-500">O‘qituvchi yoki administrator login va parolini kiriting</p>

        <div className="mt-6 space-y-5">
          <Field label="Login">
            <input
              className={inputCls}
              value={login}
              onChange={(e) => { setLogin(e.target.value); setError(''); }}
              autoComplete="username"
              placeholder="masalan: karimova.d"
              {...noAuto}
            />
          </Field>
          <Field label="Parol">
            <div className="relative">
              <input
                className={`${inputCls} pr-16`}
                type={show ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                autoComplete="current-password"
                placeholder="••••••••"
                {...noAuto}
              />
              <button type="button" onClick={() => setShow((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl p-2 text-slate-500 hover:bg-slate-100" aria-label="Parolni ko‘rsatish">
                {show ? <EyeOff size={24} /> : <Eye size={24} />}
              </button>
            </div>
          </Field>
          {error && <p key={shakeKey} className="dp-shake rounded-2xl bg-rose-50 px-4 py-3 text-lg font-semibold text-rose-700">{error}</p>}
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 px-8 py-4 text-xl md:text-2xl font-extrabold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-700 active:scale-95"
          >
            {busy ? <Loader2 size={28} className="animate-spin" /> : <>Kirish <LogIn size={28} /></>}
          </button>
        </div>

        {!REMOTE && <div className="mt-6 rounded-2xl bg-blue-50 p-4 text-blue-900">
          <div className="flex items-start gap-3">
            <KeyRound size={22} className="mt-0.5 shrink-0" />
            <p className="text-base">Sinov uchun tayyor hisoblar — bir bosishda kiring:</p>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <button type="button" onClick={() => attempt('demo', 'demo123')} className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-blue-200 bg-white px-4 py-3 text-base font-bold text-blue-900 hover:border-blue-500">
              <User size={20} /> Demo o‘qituvchi
            </button>
            <button type="button" onClick={() => attempt('admin', 'admin123')} className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-blue-200 bg-white px-4 py-3 text-base font-bold text-blue-900 hover:border-blue-500">
              <ShieldCheck size={20} /> Bosh administrator
            </button>
          </div>
          <p className="mt-2 text-sm text-blue-800">Qo‘lda: demo / demo123 yoki admin / admin123. Bu demo rejim — ma’lumotlar shu brauzerda saqlanadi.</p>
        </div>}
      </form>
    </div>
  );
}

/* ---------- Admin paneli ---------- */
function StatCard({ icon: I, label, value }) {
  return (
    <div className="flex items-center gap-4 rounded-3xl border-2 border-blue-100 bg-white p-5">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-700"><I size={28} /></div>
      <div>
        <div className="text-3xl font-extrabold text-blue-950">{value}</div>
        <div className="text-base font-semibold text-slate-500">{label}</div>
      </div>
    </div>
  );
}

function CredentialsCard({ name, login, password, onClose }) {
  const [copied, setCopied] = useState(false);
  const text = `Dars play\nO‘qituvchi: ${name}\nLogin: ${login}\nParol: ${password}`;
  return (
    <div className="dp-pop rounded-3xl border-2 border-emerald-300 bg-emerald-50 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-lg font-bold text-emerald-700"><CheckCircle2 size={24} /> Ma’lumotlar tayyor — o‘qituvchiga bering</div>
          <div className="mt-3 text-xl text-slate-700">{name}</div>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            <div className="rounded-2xl bg-white px-4 py-3"><span className="text-sm font-bold text-slate-400">LOGIN</span><div className="text-2xl font-extrabold text-blue-950">{login}</div></div>
            <div className="rounded-2xl bg-white px-4 py-3"><span className="text-sm font-bold text-slate-400">PAROL</span><div className="font-mono text-2xl font-extrabold text-blue-950">{password}</div></div>
          </div>
        </div>
        <button type="button" onClick={onClose} className="rounded-full p-2 text-emerald-700 hover:bg-emerald-100" aria-label="Yopish"><X size={24} /></button>
      </div>
      <button
        type="button"
        onClick={() => setCopied(copyText(text))}
        className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-lg font-bold text-white hover:bg-emerald-700"
      >
        <Copy size={20} /> {copied ? 'Nusxalandi' : 'Nusxa olish'}
      </button>
    </div>
  );
}

function TeachersTab({ db, api }) {
  const empty = { name: '', school: '', region: '', subject: 'ona-tili', login: '', password: genPassword() };
  const [form, setForm] = useState(empty);
  const [loginTouched, setLoginTouched] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});
  const [created, setCreated] = useState(null);
  const [query, setQuery] = useState('');
  const [schoolFilter, setSchoolFilter] = useState('');
  const [reveal, setReveal] = useState({});
  const [confirmDel, setConfirmDel] = useState(null);
  const [busy, setBusy] = useState(false);
  const [actionError, setActionError] = useState('');

  const schools = useMemo(() => {
    const m = new Map();
    [...db.teachers.map((t) => t.school), ...db.classes.map((c) => c.school)].forEach((s) => s && !m.has(normSchool(s)) && m.set(normSchool(s), s));
    return [...m.values()].sort();
  }, [db]);

  const set = (k, v) => {
    setForm((f) => {
      const next = { ...f, [k]: v };
      if (k === 'name' && !loginTouched && !editingId) next.login = suggestLogin(v);
      return next;
    });
  };

  const formRef = useRef(null);
  const resultRef = useRef(null);

  const submit = async (e) => {
    e.preventDefault();
    if (busy) return;
    let login = form.login.trim().toLowerCase();
    // Login bo‘sh yoki avtomatik bo‘lsa — o‘zimiz yaratamiz va bandligini tekshiramiz
    if (!editingId && (!login || !loginTouched)) {
      const base = suggestLogin(form.name) || 'oqituvchi';
      login = base.length >= 3 ? base : base + 'oq';
      const taken = (l) => db.teachers.some((t) => t.login.toLowerCase() === l) || l === db.admin.login.toLowerCase();
      let n = 2;
      const root = login;
      while (taken(login)) { login = `${root}${n}`; n += 1; }
    }
    const errs = {};
    if (form.name.trim().length < 3) errs.name = 'Ism-familiyani kiriting';
    if (!form.school.trim()) errs.school = 'Maktabni kiriting';
    if (!/^[a-z0-9._-]{3,30}$/.test(login)) errs.login = 'Kamida 3 ta belgi: lotin harflari, raqam, nuqta, chiziqcha';
    else if (db.teachers.some((t) => t.login.toLowerCase() === login && t.id !== editingId) || login === db.admin.login.toLowerCase()) errs.login = 'Bu login band';
    const pw = form.password.trim();
    if (editingId ? pw && pw.length < 6 : pw.length < 6) errs.password = 'Parol kamida 6 ta belgidan iborat bo‘lsin';
    setErrors(errs);
    if (Object.keys(errs).length) {
      setCreated(null);
      setTimeout(() => {
        const el = formRef.current?.querySelector('[data-err="1"]');
        el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 30);
      return;
    }

    const data = { ...form, login, password: pw, name: form.name.trim(), school: form.school.trim() };
    setBusy(true);
    const err = await api.saveTeacher(editingId, data);
    setBusy(false);
    if (err) { setErrors({ login: err === 'Bu login band' ? err : undefined, form: err }); return; }
    setCreated({ name: data.name, login: data.login, password: data.password || '(o‘zgarmadi)' });
    setEditingId(null);
    setLoginTouched(false);
    setForm({ ...empty, school: data.school, region: data.region, password: genPassword() });
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 30);
  };

  const startEdit = (t) => {
    setEditingId(t.id);
    setLoginTouched(true);
    setErrors({});
    setCreated(null);
    setForm({ name: t.name, school: t.school, region: t.region || '', subject: t.subject || 'ona-tili', login: t.login, password: t.password || '' });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetPassword = async (t) => {
    const password = genPassword();
    setActionError('');
    const err = await api.resetPassword(t, password);
    if (err) { setActionError(err); return; }
    setCreated({ name: t.name, login: t.login, password });
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 30);
  };

  const remove = async (t) => {
    setActionError('');
    const err = await api.deleteTeacher(t);
    if (err) setActionError(err);
    setConfirmDel(null);
  };

  const list = db.teachers
    .filter((t) => !schoolFilter || normSchool(t.school) === schoolFilter)
    .filter((t) => [t.name, t.school, t.login, t.region || ''].join(' ').toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => a.school.localeCompare(b.school) || a.name.localeCompare(b.name));

  return (
    <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
      <div className="h-fit space-y-4">
      <form ref={formRef} onSubmit={submit} noValidate className="space-y-4 rounded-3xl border-2 border-blue-100 bg-white p-6">
        <h3 className="flex items-center gap-2 text-2xl font-extrabold text-blue-950">
          {editingId ? <Pencil size={26} /> : <UserPlus size={26} />} {editingId ? 'O‘qituvchini tahrirlash' : 'Yangi o‘qituvchi'}
        </h3>
        <Field label="Ism va familiya *" error={errors.name}>
          <input className={inputCls} value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Karimova Dilfuza" />
        </Field>
        <Field label="Maktab *" error={errors.school}>
          <input className={inputCls} list="dp-schools" value={form.school} onChange={(e) => set('school', e.target.value)} placeholder="45-maktab" />
          <datalist id="dp-schools">{schools.map((s) => <option key={s} value={s} />)}</datalist>
        </Field>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <Field label="Hudud">
            <select className={inputCls} value={form.region} onChange={(e) => set('region', e.target.value)}>
              <option value="">Tanlang...</option>
              {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </Field>
          <Field label="Fan">
            <select className={inputCls} value={form.subject} onChange={(e) => set('subject', e.target.value)}>
              {SUBJECTS.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </Field>
        </div>
        <Field label="Login (avtomatik, o‘zgartirish mumkin)" error={errors.login}>
          <input className={inputCls} value={form.login} onChange={(e) => { setLoginTouched(true); set('login', e.target.value); }} placeholder="bo‘sh qolsa — avtomatik" autoCapitalize="none" autoCorrect="off" spellCheck={false} />
        </Field>
        <Field label={editingId && REMOTE ? 'Yangi parol (bo‘sh qolsa — o‘zgarmaydi)' : 'Parol *'} error={errors.password}>
          <div className="flex gap-2">
            <input className={`${inputCls} font-mono`} value={form.password} onChange={(e) => set('password', e.target.value)} />
            <button type="button" onClick={() => set('password', genPassword())} title="Yangi parol yaratish" className="shrink-0 rounded-2xl border-2 border-blue-200 px-4 text-blue-800 hover:bg-blue-50">
              <RefreshCw size={24} />
            </button>
          </div>
        </Field>
        {Object.values(errors).some(Boolean) && (
          <div className="rounded-2xl bg-rose-50 px-4 py-3 text-base font-semibold text-rose-700">
            {errors.form ? errors.form : `Formani to‘ldiring: ${Object.values(errors).filter(Boolean).join('; ')}`}
          </div>
        )}
        <div className="flex flex-wrap gap-3 pt-2">
          <button type="submit" disabled={busy} className="inline-flex flex-1 items-center justify-center gap-3 rounded-2xl bg-blue-600 px-8 py-4 text-xl font-extrabold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-700 active:scale-95 disabled:opacity-60">
            {busy ? <Loader2 size={26} className="animate-spin" /> : <>{editingId ? 'Saqlash' : 'Yaratish'} {editingId ? <Save size={26} /> : <UserPlus size={26} />}</>}
          </button>
          {editingId && (
            <button type="button" onClick={() => { setEditingId(null); setLoginTouched(false); setErrors({}); setForm(empty); }} className="rounded-2xl border-2 border-slate-200 px-5 text-lg font-bold text-slate-600 hover:bg-slate-50">
              Bekor qilish
            </button>
          )}
        </div>
      </form>
      <div ref={resultRef}>
        {created && <CredentialsCard {...created} onClose={() => setCreated(null)} />}
      </div>
      </div>

      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-[1fr_260px]">
          <div className="relative">
            <Search size={22} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input className={`${inputCls} pl-12`} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Ism, maktab, hudud yoki login" />
          </div>
          <select className={inputCls} value={schoolFilter} onChange={(e) => setSchoolFilter(e.target.value)}>
            <option value="">Barcha maktablar</option>
            {schools.map((sc) => <option key={sc} value={normSchool(sc)}>{sc}</option>)}
          </select>
        </div>
        <p className="text-base font-semibold text-slate-500">{list.length} ta o‘qituvchi</p>
        {actionError && <p className="rounded-2xl bg-rose-50 px-4 py-3 text-base font-semibold text-rose-700">{actionError}</p>}
        {list.length === 0 ? (
          <div className="rounded-3xl border-2 border-dashed border-blue-200 bg-white p-10 text-center text-xl text-slate-500">O‘qituvchilar topilmadi</div>
        ) : (
          list.map((t) => {
            const classCount = db.classes.filter((c) => c.createdBy === t.id).length;
            return (
              <div key={t.id} className="flex flex-wrap items-center gap-4 rounded-3xl border-2 border-blue-100 bg-white p-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-900 text-lg font-bold text-white">{initials(t.name)}</div>
                <div className="min-w-0 flex-1">
                  <div className="text-xl font-extrabold text-blue-950">{t.name}</div>
                  <div className="text-base text-slate-500">
                    {t.school}{t.region ? ` • ${t.region}` : ''} • {SUBJECTS.find((s) => s.id === t.subject)?.name || '—'} • {classCount} ta sinf kiritgan
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2 text-base">
                    <span className="rounded-xl bg-blue-50 px-3 py-1 font-bold text-blue-800">Login: {t.login}</span>
                    {t.password ? (
                      <button onClick={() => setReveal((r) => ({ ...r, [t.id]: !r[t.id] }))} className="inline-flex items-center gap-1 rounded-xl bg-slate-100 px-3 py-1 font-mono font-bold text-slate-700">
                        Parol: {reveal[t.id] ? t.password : '••••••'} {reveal[t.id] ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-xl bg-slate-100 px-3 py-1 font-semibold text-slate-500"><Lock size={16} /> Parol shifrlangan</span>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => startEdit(t)} className="inline-flex items-center gap-1 rounded-xl border-2 border-blue-100 px-3 py-2 font-bold text-blue-800 hover:bg-blue-50"><Pencil size={18} /> Tahrirlash</button>
                  <button onClick={() => resetPassword(t)} className="inline-flex items-center gap-1 rounded-xl border-2 border-blue-100 px-3 py-2 font-bold text-blue-800 hover:bg-blue-50"><KeyRound size={18} /> Yangi parol</button>
                  {confirmDel === t.id ? (
                    <button onClick={() => remove(t)} className="inline-flex items-center gap-1 rounded-xl bg-rose-600 px-3 py-2 font-bold text-white"><Trash2 size={18} /> Tasdiqlash</button>
                  ) : (
                    <button onClick={() => setConfirmDel(t.id)} className="inline-flex items-center gap-1 rounded-xl border-2 border-rose-200 px-3 py-2 font-bold text-rose-600 hover:bg-rose-50"><Trash2 size={18} /> O‘chirish</button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

function ClassesTab({ db, api }) {
  const [open, setOpen] = useState(null);
  const [schoolFilter, setSchoolFilter] = useState('');
  const [confirmDel, setConfirmDel] = useState(null);
  const groups = useMemo(() => {
    const m = new Map();
    db.classes.forEach((c) => {
      const k = normSchool(c.school);
      if (!m.has(k)) m.set(k, { name: c.school, classes: [] });
      m.get(k).classes.push(c);
    });
    return [...m.values()]
      .map((g) => ({ ...g, classes: g.classes.sort((a, b) => a.grade - b.grade || a.letter.localeCompare(b.letter)) }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [db.classes]);

  if (!groups.length) {
    return <div className="rounded-3xl border-2 border-dashed border-blue-200 bg-white p-10 text-center text-xl text-slate-500">Hali sinf kiritilmagan. Sinflarni o‘qituvchilar birinchi darsda yaratadi.</div>;
  }

  const shown = schoolFilter ? groups.filter((g) => normSchool(g.name) === schoolFilter) : groups;
  return (
    <div className="space-y-6">
      <select className={`${inputCls} max-w-sm`} value={schoolFilter} onChange={(e) => setSchoolFilter(e.target.value)}>
        <option value="">Barcha maktablar ({groups.length})</option>
        {groups.map((g) => <option key={g.name} value={normSchool(g.name)}>{g.name}</option>)}
      </select>
      {shown.map((g) => (
        <section key={g.name} className="rounded-3xl border-2 border-blue-100 bg-white p-6">
          <h3 className="flex items-center gap-2 text-2xl font-extrabold text-blue-950"><Building2 size={26} /> {g.name} <span className="text-lg font-semibold text-slate-400">({g.classes.length} ta sinf)</span></h3>
          <div className="mt-4 space-y-3">
            {g.classes.map((c) => (
              <div key={c.id} className="rounded-2xl border-2 border-blue-50 p-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-2xl bg-blue-600 px-4 py-2 text-2xl font-extrabold text-white">{classLabel(c)}</span>
                  <span className="flex-1 text-lg text-slate-600">{c.students.length} nafar o‘quvchi • kiritgan: {c.createdByName || '—'}</span>
                  <button onClick={() => setOpen(open === c.id ? null : c.id)} className="inline-flex items-center gap-1 rounded-xl border-2 border-blue-100 px-3 py-2 font-bold text-blue-800 hover:bg-blue-50">
                    <ChevronDown size={18} className={open === c.id ? 'rotate-180' : ''} /> Ro‘yxat
                  </button>
                  {confirmDel === c.id ? (
                    <button onClick={async () => { await api.deleteClass(c); setConfirmDel(null); }} className="inline-flex items-center gap-1 rounded-xl bg-rose-600 px-3 py-2 font-bold text-white"><Trash2 size={18} /> Tasdiqlash</button>
                  ) : (
                    <button onClick={() => setConfirmDel(c.id)} className="inline-flex items-center gap-1 rounded-xl border-2 border-rose-200 px-3 py-2 font-bold text-rose-600 hover:bg-rose-50"><Trash2 size={18} /> O‘chirish</button>
                  )}
                </div>
                {open === c.id && (
                  <ol className="mt-3 grid list-decimal gap-1 pl-8 text-lg text-slate-700 sm:grid-cols-2 lg:grid-cols-3">
                    {c.students.map((s) => <li key={s}>{s}</li>)}
                  </ol>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function SettingsTab({ db, api }) {
  const [form, setForm] = useState({ current: '', login: db.admin.login, password: '' });
  const [msg, setMsg] = useState(null);
  const submit = async (e) => {
    e.preventDefault();
    if (form.password.trim().length < 6) { setMsg({ ok: false, t: 'Yangi parol kamida 6 ta belgi' }); return; }
    if (!REMOTE && form.login.trim().length < 3) { setMsg({ ok: false, t: 'Login kamida 3 ta belgi' }); return; }
    const err = await api.changeAdmin(form);
    if (err) { setMsg({ ok: false, t: err }); return; }
    setForm({ current: '', login: form.login.trim(), password: '' });
    setMsg({ ok: true, t: 'Saqlandi. Keyingi safar yangi parol bilan kiring.' });
  };
  return (
    <form onSubmit={submit} className="max-w-xl space-y-4 rounded-3xl border-2 border-blue-100 bg-white p-6">
      <h3 className="flex items-center gap-2 text-2xl font-extrabold text-blue-950"><Settings size={26} /> Administrator paroli</h3>
      <p className="text-base text-slate-500">
        {REMOTE ? 'Supabase rejimi: login — «admin», parol Supabase Auth’da shifrlangan holda saqlanadi.' : 'Demo rejim: ma’lumotlar shu brauzerda saqlanadi.'}
      </p>
      <Field label="Joriy parol"><input type="password" className={inputCls} value={form.current} onChange={(e) => setForm({ ...form, current: e.target.value })} /></Field>
      {!REMOTE && <Field label="Yangi login"><input className={inputCls} value={form.login} onChange={(e) => setForm({ ...form, login: e.target.value })} /></Field>}
      <Field label="Yangi parol"><input type="password" className={inputCls} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></Field>
      {msg && <p className={`rounded-2xl px-4 py-3 text-lg font-semibold ${msg.ok ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>{msg.t}</p>}
      <PrimaryButton icon={Save}>Saqlash</PrimaryButton>
    </form>
  );
}

function AdminPanel({ db, api, loadGlobal }) {
  const [tab, setTab] = useState('teachers');
  const schoolCount = new Set([...db.teachers.map((t) => normSchool(t.school)), ...db.classes.map((c) => normSchool(c.school))]).size;
  const studentCount = db.classes.reduce((n, c) => n + c.students.length, 0);
  const tabs = [
    { id: 'teachers', label: 'O‘qituvchilar', icon: Users },
    { id: 'classes', label: 'Sinflar', icon: School },
    { id: 'rating', label: 'Reyting', icon: Trophy },
    { id: 'settings', label: 'Sozlamalar', icon: Settings },
  ];
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
      <PageTitle title="Bosh admin paneli" subtitle="Barcha maktablar: o‘qituvchilarga login-parol berish, sinflar va o‘quvchilarni boshqarish" />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={Users} label="O‘qituvchilar" value={db.teachers.length} />
        <StatCard icon={Building2} label="Maktablar" value={schoolCount} />
        <StatCard icon={School} label="Sinflar" value={db.classes.length} />
        <StatCard icon={GraduationCap} label="O‘quvchilar" value={studentCount} />
      </div>
      <div className="my-6 flex flex-wrap gap-2">
        {tabs.map(({ id, label, icon: I }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-lg font-bold transition ${tab === id ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'border-2 border-blue-100 bg-white text-blue-900 hover:bg-blue-50'}`}
          >
            <I size={22} /> {label}
          </button>
        ))}
      </div>
      <div className={`mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold ${REMOTE ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-800'}`}>
        <span className={`h-2.5 w-2.5 rounded-full ${REMOTE ? 'bg-emerald-500' : 'bg-amber-500'}`} />
        {REMOTE ? 'Supabase ulangan — ma’lumotlar bulutda' : 'Demo rejim — ma’lumotlar faqat shu brauzerda'}
      </div>
      {tab === 'teachers' && <TeachersTab db={db} api={api} />}
      {tab === 'classes' && <ClassesTab db={db} api={api} />}
      {tab === 'rating' && <AdminRatingTab loadGlobal={loadGlobal} />}
      {tab === 'settings' && <SettingsTab db={db} api={api} />}
    </div>
  );
}

/* ---------- Sinf (harf) tanlash / yaratish ---------- */
function ClassScreen({ teacher, grade, schoolClasses, onPick, onCreate, onBack }) {
  const list = schoolClasses.filter((c) => c.grade === grade).sort((a, b) => a.letter.localeCompare(b.letter));
  const [creating, setCreating] = useState(list.length === 0);
  const [letter, setLetter] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const usedLetters = list.map((c) => c.letter);
  const students = parseStudents(text);

  const [saving, setSaving] = useState(false);
  const save = async () => {
    if (saving) return;
    const L = letter.trim().toUpperCase();
    if (!L) { setError('Sinf harfini tanlang'); return; }
    if (usedLetters.includes(L)) { setError(`${grade}-${L} sinfi allaqachon bor — uni ro‘yxatdan tanlang`); return; }
    if (students.length < 2) { setError('Kamida 2 ta o‘quvchi kiriting (har qatorda bitta)'); return; }
    setSaving(true);
    const err = await onCreate(L, students);
    setSaving(false);
    if (err) setError(err);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
      <PageTitle title={`${grade}-sinflar`} subtitle={`Qaysi sinfga dars berasiz? • ${teacher?.school}`} onBack={onBack} />

      {list.length > 0 && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {list.map((c) => (
            <button
              key={c.id}
              onClick={() => onPick(c.id)}
              className="flex flex-col items-center gap-2 rounded-3xl border-2 border-blue-100 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl active:scale-95"
            >
              <span className="text-5xl md:text-6xl font-extrabold text-blue-900">{classLabel(c)}</span>
              <span className="text-lg font-bold text-slate-600">{c.students.length} nafar o‘quvchi</span>
              <span className="text-sm text-slate-400">kiritgan: {c.createdBy === teacher?.id ? 'siz' : c.createdByName}</span>
            </button>
          ))}
          {!creating && (
            <button
              onClick={() => setCreating(true)}
              className="flex flex-col items-center justify-center gap-2 rounded-3xl border-2 border-dashed border-blue-300 bg-blue-50/50 p-6 text-blue-700 transition hover:border-blue-500 hover:bg-blue-50"
            >
              <Plus size={48} />
              <span className="text-xl font-extrabold">Yangi sinf qo‘shish</span>
            </button>
          )}
        </div>
      )}

      {creating && (
        <div className="mt-6 rounded-3xl border-2 border-blue-100 bg-white p-6 md:p-8">
          <h2 className="text-2xl font-extrabold text-blue-950">Yangi sinf yaratish</h2>
          <p className="mt-1 text-lg text-slate-500">
            Sinf bir marta kiritiladi. {teacher?.school}dagi boshqa o‘qituvchilar ham shu sinf ro‘yxatini tayyor holda ko‘radi.
          </p>
          <div className="mt-5">
            <div className="mb-2 text-lg font-bold text-blue-950">Sinf harfi</div>
            <div className="flex flex-wrap items-center gap-2">
              {CLASS_LETTERS.map((L) => {
                const used = usedLetters.includes(L);
                return (
                  <button
                    key={L}
                    disabled={used}
                    onClick={() => { setLetter(L); setError(''); }}
                    className={`h-16 min-w-16 rounded-2xl border-2 px-4 text-2xl font-extrabold transition disabled:cursor-not-allowed disabled:opacity-30 ${letter === L ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-200 text-slate-700 hover:border-blue-400'}`}
                  >
                    {grade}-{L}
                  </button>
                );
              })}
              <input
                value={CLASS_LETTERS.includes(letter) ? '' : letter}
                onChange={(e) => { setLetter(e.target.value.toUpperCase().slice(0, 3)); setError(''); }}
                placeholder="boshqa"
                className="h-16 w-28 rounded-2xl border-2 border-slate-200 px-3 text-center text-xl font-bold uppercase outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div className="mt-5">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <span className="text-lg font-bold text-blue-950">O‘quvchilar ro‘yxati — har qatorda bitta ({students.length} nafar)</span>
              <button onClick={() => setText(DEFAULT_ROSTER.join('\n'))} className="text-base font-bold text-blue-700 hover:underline">Namuna ro‘yxatni qo‘yish</button>
            </div>
            <textarea
              value={text}
              onChange={(e) => { setText(e.target.value); setError(''); }}
              rows={10}
              placeholder={'Abdullayev Sardor\nAliyeva Madina\n...'}
              className="w-full rounded-2xl border-2 border-slate-200 p-4 text-lg outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>
          {error && <p className="mt-3 rounded-2xl bg-rose-50 px-4 py-3 text-lg font-semibold text-rose-700">{error}</p>}
          <div className="mt-5 flex flex-wrap gap-3">
            <PrimaryButton onClick={save} icon={Save}>Saqlash va davom etish</PrimaryButton>
            {list.length > 0 && (
              <button onClick={() => setCreating(false)} className="rounded-2xl border-2 border-slate-200 px-6 py-4 text-xl font-bold text-slate-600 hover:bg-slate-50">Bekor qilish</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   O‘QITUVCHI UCHUN QO‘LLANMA
   ============================================================ */
const GUIDE_KEY = 'darsplay_guide_seen_v1';

const GUIDE_STEPS = [
  {
    icon: Play, color: 'bg-blue-600', title: 'Darsni boshlash',
    text: 'Bosh sahifada «Darsni boshlash» → fan → sinf (raqam) → sinf harfi → mavzu.',
    tips: [
      'Sinf birinchi marta kiritilganda o‘quvchilar ro‘yxatini yozasiz yoki nusxalab qo‘yasiz (har qatorda bitta ism).',
      'Ro‘yxat maktabingizdagi boshqa o‘qituvchilarga ham tayyor holda chiqadi — qayta yozish shart emas.',
    ],
  },
  {
    icon: BookOpen, color: 'bg-indigo-600', title: 'Mavzu va dars',
    text: 'Mavzular boblar bo‘yicha yig‘ilgan. Bob nomini bossangiz ochiladi yoki yopiladi, yuqorida qidiruv bor.',
    tips: [
      '«Darsni boshlash» — darslik asosidagi tushuntirish slaydlari. «Keyingi» tugmasi yoki yon paneldan slayd tanlanadi.',
      'Proyektorda yuqoridagi to‘liq ekran tugmasini bosing — matn kattaroq va aniqroq ko‘rinadi.',
    ],
  },
  {
    icon: LayoutGrid, color: 'bg-violet-600', title: 'O‘yin tanlash',
    text: 'Har bir darsga 5 ta o‘yin taklif qilinadi va ular darsdan darsga almashib turadi. Qolganlari «Boshqa o‘yinlar»da.',
    tips: [
      '«Tasodifiy o‘yin» tugmasi o‘yinni o‘zi tanlab beradi.',
      'Jami 11 ta o‘yin: Test, Rostmi?, Millioner, Savol-javob, Moslashtirish, Harflar, Xotira, Yashirin so‘z, Joyda, Portlash, Poyga.',
    ],
  },
  {
    icon: Users, color: 'bg-emerald-600', title: 'Jamoalar',
    text: 'O‘yindan oldin yakka yoki 2–4 jamoa tanlanadi. «Ro‘yxat» bo‘limida sinf avtomatik ravishda teng jamoalarga bo‘linadi.',
    tips: [
      'Jamoalarga bo‘lsangiz, ballar har bir o‘quvchining reytingiga ham yoziladi.',
      'O‘yin paytida jamoa ballarini +5 / −5 tugmalari bilan qo‘lda tuzatish mumkin.',
    ],
  },
  {
    icon: UserCheck, color: 'bg-amber-500', title: 'O‘quvchi tanlash',
    text: 'Javob beruvchini tanlashning uch usuli: Kamera, Ro‘yxat va Doira (baraban).',
    tips: [
      'Kamera faqat Chrome yoki Edge’da, ruxsat berilganda ishlaydi. Ishlamasa, «Kamerasiz tanlash» tugmasi bor.',
      'Tanlangan o‘quvchi topgan ball uning «shaxsiy» baliga qo‘shiladi.',
    ],
  },
  {
    icon: Trophy, color: 'bg-orange-500', title: 'Natijalar va reyting',
    text: 'O‘yin oxirigacha o‘ynalsa, natija o‘zi saqlanadi. Reyting uch darajada: sinf, butun maktab va maktablararo.',
    tips: [
      'Bosh sahifada sinf nomini bossangiz — shu sinf reytingi va o‘yinlar tarixi ochiladi.',
      'Maktablararo reytingda o‘quvchilarning ismlari ko‘rsatilmaydi, faqat maktab va sinf natijalari.',
    ],
  },
  {
    icon: NotebookPen, color: 'bg-fuchsia-600', title: 'O‘z savollaringiz',
    text: 'Mavzular sahifasidagi «O‘z savollarim» tugmasi orqali test, juftlik, savol-javob va guruhlash savollarini qo‘shasiz.',
    tips: [
      'Pastdagi panelda qaysi o‘yinlar ochilishi ko‘rinib turadi.',
      'To‘plamni maktabingizdagi hamkasblarga ko‘rsatish yoki faqat o‘zingiz uchun saqlash mumkin.',
    ],
  },
];

const GUIDE_FAQ = [
  ['Parolimni unutdim', 'Platforma administratoriga murojaat qiling — u yangi parol berib yuboradi.'],
  ['Sinf ro‘yxatini o‘zgartirmoqchiman', 'O‘yin oldidagi «Jamoalar va o‘quvchilar» sahifasida ro‘yxatni tahrirlab, saqlang. O‘zgarish maktabingizdagi barcha o‘qituvchilarda ko‘rinadi.'],
  ['Kamera ishlamayapti', 'Saytni Chrome yoki Edge’da oching. Manzil satridagi qulf belgisini bosib, kameraga ruxsat bering va sahifani yangilang. Kamera Zoom yoki Telegram’da ochiq bo‘lsa, o‘sha dasturni yoping.'],
  ['Ovoz kerak emas', 'Yuqoridagi karnay belgisini bosing — ovoz o‘chadi. Qayta bossangiz yoqiladi.'],
  ['Reytingda o‘quvchilar bali 0', 'Ballar o‘quvchiga yozilishi uchun o‘yin oldidan jamoalarga bo‘ling yoki o‘yin paytida «O‘quvchi tanlash»dan foydalaning.'],
];

function GuideScreen({ onBack, onStart }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:px-8">
      <PageTitle title="Qo‘llanma" subtitle="Dars play’dan foydalanish — 7 qadamda" onBack={onBack} />

      <div className="mb-6 rounded-[2rem] bg-blue-900 p-6 text-white md:p-8">
        <h2 className="text-2xl md:text-3xl font-extrabold">Bir darsning tartibi</h2>
        <div className="mt-5 flex flex-wrap items-center gap-2 text-lg font-bold">
          {['Fan va sinf', 'Mavzu', 'Tushuntirish', 'O‘yin', 'Jamoalar', 'Natija'].map((t, i, arr) => (
            <span key={t} className="flex items-center gap-2">
              <span className="rounded-2xl bg-white/15 px-4 py-2">{i + 1}. {t}</span>
              {i < arr.length - 1 && <ChevronRight size={22} className="text-blue-300" />}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {GUIDE_STEPS.map((s, i) => {
          const I = s.icon;
          const isOpen = open === i;
          return (
            <section key={s.title} className="rounded-3xl border-2 border-blue-100 bg-white">
              <button onClick={() => setOpen(isOpen ? -1 : i)} className="flex w-full items-center gap-4 rounded-3xl p-5 text-left hover:bg-blue-50/50" aria-expanded={isOpen}>
                <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${s.color} text-white`}><I size={30} /></div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold uppercase tracking-wide text-slate-400">{i + 1}-qadam</div>
                  <div className="text-2xl font-extrabold text-blue-950">{s.title}</div>
                </div>
                <ChevronDown size={28} className={`shrink-0 text-blue-700 transition ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              {isOpen && (
                <div className="dp-pop px-5 pb-6 md:pl-[5.75rem]">
                  <p className="text-xl text-slate-700">{s.text}</p>
                  <ul className="mt-3 space-y-2">
                    {s.tips.map((t) => (
                      <li key={t} className="flex items-start gap-2 text-lg text-slate-600"><CheckCircle2 size={22} className="mt-0.5 shrink-0 text-emerald-500" /> {t}</li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          );
        })}
      </div>

      <h2 className="mb-3 mt-10 flex items-center gap-2 text-2xl font-extrabold text-blue-950"><CircleHelp size={28} /> Ko‘p beriladigan savollar</h2>
      <div className="space-y-2">
        {GUIDE_FAQ.map(([q, a]) => (
          <details key={q} className="rounded-2xl border-2 border-blue-100 bg-white p-4">
            <summary className="cursor-pointer text-xl font-bold text-blue-900">{q}</summary>
            <p className="mt-2 text-lg text-slate-600">{a}</p>
          </details>
        ))}
      </div>

      {onStart && (
        <div className="mt-10 text-center">
          <PrimaryButton onClick={onStart} icon={Play}>Darsni boshlash</PrimaryButton>
        </div>
      )}
    </div>
  );
}

function WelcomeModal({ name, onGuide, onClose }) {
  return (
    <Modal onClose={onClose}>
      <div className="text-center">
        <div className="mx-auto w-fit"><Logo size={64} showText={false} /></div>
        <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-blue-950">Xush kelibsiz{name ? `, ${name}` : ''}!</h2>
        <p className="mx-auto mt-3 max-w-lg text-xl text-slate-600">
          Dars play — darslik mavzularini tushuntirish va sinf bilan o‘yin o‘ynash uchun. Qisqa qo‘llanma bilan 2 daqiqada tanishib chiqing.
        </p>
        <div className="mt-6 grid gap-3 text-left sm:grid-cols-3">
          {[[BookOpen, 'Tushuntirish', 'darslik asosida slaydlar'], [LayoutGrid, '11 ta o‘yin', '2–4 jamoa bilan'], [Trophy, 'Reyting', 'sinf va maktab bo‘yicha']].map(([I, t, d]) => (
            <div key={t} className="rounded-2xl bg-blue-50 p-4">
              <I size={28} className="text-blue-700" />
              <div className="mt-2 text-lg font-extrabold text-blue-950">{t}</div>
              <div className="text-base text-slate-500">{d}</div>
            </div>
          ))}
        </div>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <PrimaryButton onClick={onGuide} icon={CircleHelp}>Qo‘llanmani ochish</PrimaryButton>
          <button onClick={onClose} className="rounded-2xl border-2 border-blue-200 px-6 py-4 text-xl font-bold text-blue-900 hover:bg-blue-50">Keyinroq</button>
        </div>
      </div>
    </Modal>
  );
}

function HomeScreen({ teacher, onStart, schoolClasses = [], onClassResults, onRating }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-8">
      <div className="overflow-hidden rounded-[2rem] bg-blue-900 p-8 text-white md:p-14">
        <p className="text-xl font-semibold text-blue-200">Assalomu alaykum,</p>
        <h1 className="mt-1 text-4xl md:text-6xl font-extrabold">{teacher?.name || 'Ustoz'}!</h1>
        <p className="mt-4 max-w-2xl text-xl text-blue-100">
          Bugungi darsni boshlaymizmi? Fan, sinf va mavzuni tanlang — avval qisqa tushuntirish, keyin o‘yinlar.
        </p>
        <button
          onClick={onStart}
          className="mt-8 inline-flex items-center gap-4 rounded-2xl bg-white px-10 py-5 text-2xl md:text-3xl font-extrabold text-blue-900 shadow-xl transition hover:bg-blue-50 active:scale-95"
        >
          <Play size={34} className="fill-blue-600 text-blue-600" /> Darsni boshlash
        </button>
      </div>
      <div className="mt-8 rounded-3xl border-2 border-blue-100 bg-white p-6">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="flex flex-1 items-center gap-2 text-2xl font-extrabold text-blue-950"><School size={26} /> {teacher?.school} sinflari</h3>
          <button onClick={() => onRating?.('school')} className="inline-flex items-center gap-2 rounded-2xl bg-amber-400 px-4 py-2.5 text-lg font-extrabold text-amber-950 shadow transition hover:bg-amber-300 active:scale-95">
            <Trophy size={22} /> Maktab reytingi
          </button>
          <button onClick={() => onRating?.('global')} className="inline-flex items-center gap-2 rounded-2xl border-2 border-amber-300 bg-white px-4 py-2.5 text-lg font-bold text-amber-900 transition hover:bg-amber-50 active:scale-95">
            <Building2 size={22} /> Maktablararo
          </button>
        </div>
        {schoolClasses.length > 0 && <p className="mt-1 text-base text-slate-500">Sinfni bosing — o‘yinlar tarixi va o‘quvchilar reytingi ochiladi.</p>}
        {schoolClasses.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {[...schoolClasses].sort((a, b) => a.grade - b.grade || a.letter.localeCompare(b.letter)).map((c) => (
              <button key={c.id} onClick={() => onClassResults?.(c)} title="Natijalar va reyting" className="inline-flex items-center gap-2 rounded-2xl bg-blue-50 px-4 py-2 text-lg font-bold text-blue-900 transition hover:bg-amber-100">
                {classLabel(c)} <span className="font-semibold text-slate-500">• {c.students.length}</span> <Trophy size={16} className="text-amber-500" />
              </button>
            ))}
          </div>
        ) : (
          <p className="mt-2 text-lg text-slate-500">Hali sinf kiritilmagan. Birinchi darsda sinf va o‘quvchilar ro‘yxatini kiritasiz — keyin u maktabdagi barcha o‘qituvchilarga tayyor chiqadi.</p>
        )}
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          { icon: BookOpen, t: 'Dars tushuntirish', d: 'Har bir mavzu darslik asosida slaydlar bilan' },
          { icon: LayoutGrid, t: 'Interaktiv o‘yinlar', d: '11 ta o‘yin, o‘z savollaringiz bilan ham' },
          { icon: UserCheck, t: 'O‘quvchi tanlash', d: 'Kamera, ro‘yxat, doira va avtomatik guruhlash' },
        ].map(({ icon: I, t, d }) => (
          <div key={t} className="rounded-3xl border-2 border-blue-100 bg-white p-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-700"><I size={30} /></div>
            <h3 className="mt-4 text-2xl font-extrabold text-blue-950">{t}</h3>
            <p className="mt-1 text-lg text-slate-500">{d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   5. TANLOV BOSQICHLARI: FAN → SINF → MAVZU → DARS
   ============================================================ */

function SubjectScreen({ onPick, onBack }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
      <PageTitle title="Fanni tanlang" subtitle="1-qadam: dars o‘tiladigan fan" onBack={onBack} />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {SUBJECTS.map((s) => {
          const I = s.icon;
          const ready = !!CONTENT[s.id];
          return (
            <button
              key={s.id}
              onClick={() => onPick(s.id)}
              className="group relative flex flex-col items-center gap-4 rounded-3xl border-2 border-blue-100 bg-white p-6 md:p-8 text-center shadow-sm transition hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl active:scale-95"
            >
              {ready && (
                <span className="absolute right-3 top-3 rounded-full bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-700">Tayyor</span>
              )}
              <div className={`flex h-20 w-20 items-center justify-center rounded-3xl ${s.color} text-white shadow-lg`}>
                <I size={42} />
              </div>
              <span className="text-xl md:text-2xl font-extrabold text-blue-950">{s.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function GradeScreen({ subject, onPick, onBack, schoolClasses = [] }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
      <PageTitle title="Sinfni tanlang" subtitle={`2-qadam: ${subject?.name}`} onBack={onBack} />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
        {GRADES.map((g) => {
          const ready = !!CONTENT[subject?.id]?.[g];
          return (
            <button
              key={g}
              onClick={() => onPick(g)}
              className={`flex flex-col items-center justify-center gap-2 rounded-3xl border-2 p-6 transition hover:-translate-y-1 hover:shadow-xl active:scale-95 ${ready ? 'border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'border-blue-100 bg-white text-blue-950 hover:border-blue-400'}`}
            >
              <span className="text-6xl font-extrabold">{g}</span>
              <span className={`text-lg font-bold ${ready ? 'text-blue-100' : 'text-slate-500'}`}>sinf</span>
              <span className={`mt-1 rounded-full px-3 py-1 text-sm font-bold ${ready ? 'bg-white text-blue-700' : 'bg-slate-100 text-slate-500'}`}>
                {ready ? 'Tayyor' : 'Takrorlash'}
              </span>
              <span className={`text-sm font-semibold ${ready ? 'text-blue-100' : 'text-slate-400'}`}>
                {schoolClasses.filter((c) => c.grade === g).length} ta sinf
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TopicCard({ t, i, onPick, onEditSet, onDeleteSet }) {
  const [confirmDel, setConfirmDel] = useState(false);
  return (
    <div className="flex flex-col rounded-3xl border-2 border-blue-100 bg-white p-6 transition hover:border-blue-400 hover:shadow-lg">
      <div className="flex items-start gap-4">
        <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl font-extrabold text-white ${t.custom ? 'bg-violet-600' : 'bg-blue-900'}`}>
          {t.custom ? <NotebookPen size={28} /> : i + 1}
        </div>
        <div className="min-w-0">
          <h3 className="text-2xl font-extrabold text-blue-950">{t.title}</h3>
          {t.source && <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-sm font-bold text-blue-700"><BookOpen size={14} /> {t.source}</span>}
          {t.general && <span className="mt-1 inline-block rounded-full bg-amber-100 px-3 py-1 text-sm font-bold text-amber-700">Barcha fanlar uchun takrorlash</span>}
          {t.custom && (
            <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-violet-100 px-3 py-1 text-sm font-bold text-violet-700">
              <NotebookPen size={14} /> {t.mine ? 'Mening to‘plamim' : `Hamkasb: ${t.ownerName}`}{t.mine && !t.shared ? ' • faqat menga' : ''}
            </span>
          )}
          <p className="mt-1 text-lg text-slate-500">{t.short}</p>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        {!t.custom && (
          <button
            onClick={() => onPick(t.id, 'lesson')}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-4 text-lg font-extrabold text-white transition hover:bg-blue-700 active:scale-95"
          >
            <Lightbulb size={24} /> Darsni boshlash
          </button>
        )}
        <button
          onClick={() => onPick(t.id, 'game')}
          className={`inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-4 text-lg font-bold transition active:scale-95 ${t.custom ? 'flex-1 bg-violet-600 text-white hover:bg-violet-700' : 'border-2 border-blue-200 text-blue-900 hover:bg-blue-50'}`}
        >
          <LayoutGrid size={24} /> O‘yinlar
        </button>
        {t.custom && t.mine && !confirmDel && (
          <>
            <button onClick={() => onEditSet(t)} className="inline-flex items-center gap-2 rounded-2xl border-2 border-violet-200 px-4 py-4 text-lg font-bold text-violet-800 hover:bg-violet-50" title="Tahrirlash">
              <Pencil size={22} />
            </button>
            <button onClick={() => setConfirmDel(true)} className="inline-flex items-center gap-2 rounded-2xl border-2 border-rose-200 px-4 py-4 text-lg font-bold text-rose-700 hover:bg-rose-50" title="O‘chirish">
              <Trash2 size={22} />
            </button>
          </>
        )}
      </div>
      {confirmDel && (
        <div className="dp-pop mt-3 flex flex-wrap items-center gap-3 rounded-2xl bg-rose-50 p-3">
          <span className="flex-1 text-lg font-bold text-rose-800">To‘plam o‘chirilsinmi?</span>
          <button onClick={() => onDeleteSet(t)} className="rounded-xl bg-rose-600 px-4 py-2 text-lg font-bold text-white hover:bg-rose-700">Ha, o‘chirish</button>
          <button onClick={() => setConfirmDel(false)} className="rounded-xl bg-white px-4 py-2 text-lg font-bold text-slate-700 hover:bg-slate-100">Yo‘q</button>
        </div>
      )}
    </div>
  );
}

function TopicScreen({ subject, grade, topics, onPick, onBack, lastTopicId, classInfo, onResults, onNewSet, onEditSet, onDeleteSet }) {
  const storeKey = `darsplay_open_bob_${subject?.id}_${grade}`;
  const [query, setQuery] = useState('');

  const groups = useMemo(() => {
    const list = [];
    topics.forEach((t, i) => {
      const name = t.custom ? 'Mening savollarim' : t.source ? t.source.split(' • ')[0] : 'Takrorlash';
      let g = list.find((x) => x.name === name);
      if (!g) { g = { name, items: [], custom: !!t.custom }; list.push(g); }
      g.items.push({ t, i: t.custom ? -1 : i - topics.filter((x) => x.custom).length });
    });
    return list;
  }, [topics]);

  const [open, setOpen] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storeKey) || 'null');
      if (Array.isArray(saved)) return saved;
    } catch { /* */ }
    return null;
  });
  const openList = useMemo(() => {
    if (open) return open;
    const withLast = groups.find((g) => g.items.some(({ t }) => t.id === lastTopicId));
    const first = groups.find((g) => !g.custom);
    return [...new Set([withLast?.name, groups.find((g) => g.custom)?.name, !withLast ? first?.name : null].filter(Boolean))];
  }, [open, groups, lastTopicId]);
  const setOpenList = (next) => {
    setOpen(next);
    try { localStorage.setItem(storeKey, JSON.stringify(next)); } catch { /* */ }
  };
  const toggle = (name) => setOpenList(openList.includes(name) ? openList.filter((n) => n !== name) : [...openList, name]);
  // Oxirgi ochilgan mavzu bobini avtomatik ochib qo‘yamiz
  useEffect(() => {
    const withLast = groups.find((g) => g.items.some(({ t }) => t.id === lastTopicId));
    if (open && withLast && !open.includes(withLast.name)) setOpenList([...open, withLast.name]);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const q = query.trim().toLowerCase();
  const shownGroups = q
    ? groups.map((g) => ({ ...g, items: g.items.filter(({ t }) => `${t.title} ${t.short || ''}`.toLowerCase().includes(q)) })).filter((g) => g.items.length)
    : groups;
  const regularCount = topics.filter((t) => !t.custom && !t.general).length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
      <PageTitle
        title="Mavzuni tanlang"
        subtitle={`3-qadam: ${subject?.name}, ${grade}-sinf${classInfo ? ` • ${classInfo} sinf` : ''}`}
        onBack={onBack}
        right={onResults && (
          <button onClick={onResults} className="inline-flex items-center gap-2 rounded-2xl bg-amber-400 px-5 py-3 text-lg font-extrabold text-amber-950 shadow transition hover:bg-amber-300 active:scale-95">
            <Trophy size={24} /> Natijalar va reyting
          </button>
        )}
      />

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[16rem] flex-1">
          <Search size={22} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Mavzuni qidirish..."
            className="w-full rounded-2xl border-2 border-blue-100 bg-white py-3 pl-12 pr-4 text-lg outline-none focus:border-blue-500"
          />
        </div>
        {!q && groups.length > 2 && (
          <>
            <button onClick={() => setOpenList(groups.map((g) => g.name))} className="rounded-2xl border-2 border-blue-100 bg-white px-4 py-3 text-base font-bold text-blue-900 hover:bg-blue-50">Hammasini ochish</button>
            <button onClick={() => setOpenList([])} className="rounded-2xl border-2 border-blue-100 bg-white px-4 py-3 text-base font-bold text-blue-900 hover:bg-blue-50">Hammasini yopish</button>
          </>
        )}
        <button onClick={onNewSet} className="inline-flex items-center gap-2 rounded-2xl bg-violet-600 px-5 py-3 text-lg font-extrabold text-white shadow transition hover:bg-violet-700 active:scale-95">
          <ListPlus size={24} /> O‘z savollarim
        </button>
      </div>

      {regularCount === 0 && !topics.some((t) => t.custom) && (
        <div className="mb-5 flex items-start gap-3 rounded-2xl bg-blue-50 p-4 text-lg text-blue-900">
          <Lightbulb size={24} className="mt-0.5 shrink-0" />
          Bu sinf uchun darslik mavzulari tez orada qo‘shiladi. Hozircha umumiy takrorlash savollari bilan o‘ynashingiz yoki o‘z savollaringizni qo‘shishingiz mumkin.
        </div>
      )}

      {shownGroups.length === 0 && (
        <div className="rounded-3xl border-2 border-dashed border-blue-200 bg-white p-10 text-center text-xl text-slate-500">«{query}» bo‘yicha mavzu topilmadi</div>
      )}

      <div className="space-y-4">
        {shownGroups.map((g) => {
          const isOpen = q ? true : openList.includes(g.name);
          const nums = g.items.filter(({ i }) => i >= 0).map(({ i }) => i + 1);
          return (
            <section key={g.name} className={`rounded-3xl border-2 ${g.custom ? 'border-violet-200 bg-violet-50/40' : 'border-blue-100 bg-white/70'}`}>
              <button
                onClick={() => !q && toggle(g.name)}
                className="flex w-full items-center gap-3 rounded-3xl px-5 py-4 text-left transition hover:bg-blue-50/60"
                aria-expanded={isOpen}
              >
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white ${g.custom ? 'bg-violet-600' : 'bg-blue-600'}`}>
                  {g.custom ? <NotebookPen size={26} /> : <BookOpen size={26} />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-xl md:text-2xl font-extrabold text-blue-950">{g.name}</div>
                  <div className="text-base font-semibold text-slate-500">
                    {g.items.length} ta mavzu{nums.length > 1 ? ` • ${nums[0]}–${nums[nums.length - 1]}` : ''}
                  </div>
                </div>
                {!q && <ChevronDown size={30} className={`shrink-0 text-blue-700 transition ${isOpen ? 'rotate-180' : ''}`} />}
              </button>
              {isOpen && (
                <div className="dp-pop grid gap-4 px-4 pb-5 md:grid-cols-2">
                  {g.items.map(({ t, i }) => (
                    <TopicCard key={t.id} t={t} i={i} onPick={onPick} onEditSet={onEditSet} onDeleteSet={onDeleteSet} />
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================
   O‘QITUVCHINING O‘Z SAVOLLARI
   ============================================================ */
const emptyQuiz = () => ({ q: '', options: ['', '', '', ''], answer: 0 });

function customSetToTopic(s, meId) {
  const d = s.data || {};
  const mine = s.ownerId === meId;
  const counts = [];
  if (d.quiz?.length) counts.push(`${d.quiz.length} test`);
  if (d.pairs?.length) counts.push(`${d.pairs.length} juftlik`);
  if (d.qa?.length) counts.push(`${d.qa.length} savol-javob`);
  if (d.sort?.items?.length) counts.push(`${d.sort.items.length} guruhlash`);
  return {
    id: `custom-${s.id}`, customId: s.id, custom: true, mine, shared: s.shared, ownerName: s.ownerName,
    title: s.title, short: counts.join(' • ') || 'Savollar to‘plami', source: null, lesson: [],
    pairs: d.pairs || [], quiz: d.quiz || [], qa: d.qa || [], sort: d.sort && d.sort.items?.length ? d.sort : null,
  };
}

function cleanSetData(st) {
  const quiz = st.quiz
    .map((x) => ({ q: x.q.trim(), options: x.options.map((o) => o.trim()), answer: x.answer }))
    .filter((x) => x.q && x.options[x.answer] && x.options.filter(Boolean).length >= 2)
    .map((x) => {
      const opts = x.options.map((o, i) => ({ o, i })).filter(({ o }) => o);
      return { q: x.q, options: opts.map(({ o }) => o), answer: opts.findIndex(({ i }) => i === x.answer) };
    });
  const pairs = st.pairs.map(([a, b]) => [a.trim(), b.trim()]).filter(([a, b]) => a && b);
  const qa = st.qa.map((x) => ({ q: x.q.trim(), a: x.a.trim() })).filter((x) => x.q && x.a);
  const cats = st.sort.categories.map((c) => c.trim());
  const items = st.sort.items.map((x) => ({ text: x.text.trim(), cat: x.cat })).filter((x) => x.text && cats[x.cat]);
  const sort = cats.filter(Boolean).length >= 2 && items.length >= 2 ? { categories: cats, items } : null;
  return { quiz, pairs, qa, sort };
}

function parseLines(text) {
  return text.split('\n').map((l) => l.trim()).filter(Boolean)
    .map((l) => l.split(/\s+[—–-]\s+|\s*[|;]\s*|\t/))
    .filter((p) => p.length >= 2 && p[0] && p[1])
    .map((p) => [p[0].trim(), p.slice(1).join(' — ').trim()]);
}

function EditorSection({ icon: I, title, hint, count, children, color = 'bg-blue-600' }) {
  return (
    <section className="rounded-3xl border-2 border-blue-100 bg-white p-5 md:p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${color} text-white`}><I size={26} /></div>
        <div className="flex-1">
          <h2 className="text-2xl font-extrabold text-blue-950">{title} <span className="text-lg font-semibold text-slate-400">({count})</span></h2>
          <p className="text-base text-slate-500">{hint}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

const edInputCls = 'w-full rounded-xl border-2 border-blue-100 bg-white px-3 py-2.5 text-lg outline-none focus:border-blue-500';

function CustomSetEditor({ initial, subject, grade, onSave, onCancel }) {
  const d = initial?.data || {};
  const [title, setTitle] = useState(initial?.title || '');
  const [shared, setShared] = useState(initial ? initial.shared : true);
  const [quiz, setQuiz] = useState(d.quiz?.length ? d.quiz.map((x) => ({ q: x.q, options: [...x.options, '', '', '', ''].slice(0, 4), answer: x.answer })) : [emptyQuiz()]);
  const [pairs, setPairs] = useState(d.pairs?.length ? d.pairs.map((p) => [...p]) : [['', ''], ['', ''], ['', '']]);
  const [qa, setQa] = useState(d.qa?.length ? d.qa.map((x) => ({ ...x })) : [{ q: '', a: '' }]);
  const [sort, setSort] = useState(d.sort?.categories ? { categories: [...d.sort.categories], items: d.sort.items.map((x) => ({ ...x })) } : { categories: ['', ''], items: [{ text: '', cat: 0 }, { text: '', cat: 1 }] });
  const [bulk, setBulk] = useState({ pairs: '', qa: '' });
  const [err, setErr] = useState('');
  const [saving, setSaving] = useState(false);

  const cleaned = cleanSetData({ quiz, pairs, qa, sort });
  const preview = { ...cleaned, sort: cleaned.sort };
  const available = GAMES.filter((g) => !g.disabled && gameAvailable(g.id, preview));

  const upd = (setter, i, fn) => setter((arr) => arr.map((x, k) => (k === i ? fn(x) : x)));
  const del = (setter, i) => setter((arr) => arr.filter((_, k) => k !== i));

  const save = async () => {
    if (!title.trim()) { setErr('To‘plam nomini yozing'); return; }
    if (!available.length) { setErr('Kamida bitta o‘yin ochilishi uchun savollar yetarli emas: masalan, 3 ta juftlik yoki 1 ta test savoli kiriting'); return; }
    setSaving(true);
    setErr('');
    const e = await onSave({ title: title.trim(), shared, data: cleaned });
    setSaving(false);
    if (e) setErr(e);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:px-8">
      <PageTitle title={initial ? 'To‘plamni tahrirlash' : 'O‘z savollaringiz'} subtitle={`${subject?.name}, ${grade}-sinf`} onBack={onCancel} />

      <div className="space-y-5">
        <section className="rounded-3xl border-2 border-violet-200 bg-violet-50/50 p-5 md:p-6">
          <label className="text-lg font-bold text-violet-900">To‘plam nomi</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="masalan: Fe’l mavzusi bo‘yicha takrorlash" className={`${edInputCls} mt-2 text-xl`} />
          <label className="mt-4 flex cursor-pointer items-center gap-3 text-lg text-violet-900">
            <input type="checkbox" checked={shared} onChange={(e) => setShared(e.target.checked)} className="h-6 w-6 accent-violet-600" />
            Maktabimdagi boshqa o‘qituvchilar ham ko‘rsin va o‘ynasin
          </label>
        </section>

        <EditorSection icon={ListChecks} title="Test savollari" hint="To‘g‘ri javob oldidagi doirachani belgilang. Kamida 2 ta variant." count={cleaned.quiz.length} color="bg-sky-600">
          <div className="space-y-4">
            {quiz.map((x, i) => (
              <div key={i} className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center gap-2">
                  <span className="w-8 text-xl font-extrabold text-slate-400">{i + 1}</span>
                  <input value={x.q} onChange={(e) => upd(setQuiz, i, (y) => ({ ...y, q: e.target.value }))} placeholder="Savol" className={edInputCls} />
                  <button onClick={() => del(setQuiz, i)} className="rounded-xl p-2 text-rose-600 hover:bg-rose-50" title="O‘chirish"><Trash2 size={22} /></button>
                </div>
                <div className="mt-3 grid gap-2 pl-10 md:grid-cols-2">
                  {x.options.map((o, k) => (
                    <label key={k} className={`flex items-center gap-2 rounded-xl border-2 px-2 ${x.answer === k ? 'border-emerald-400 bg-emerald-50' : 'border-transparent'}`}>
                      <input type="radio" name={`ans-${i}`} checked={x.answer === k} onChange={() => upd(setQuiz, i, (y) => ({ ...y, answer: k }))} className="h-5 w-5 accent-emerald-600" />
                      <input value={o} onChange={(e) => upd(setQuiz, i, (y) => ({ ...y, options: y.options.map((z, j) => (j === k ? e.target.value : z)) }))} placeholder={`${k + 1}-variant${k === x.answer ? ' (to‘g‘ri)' : ''}`} className="w-full bg-transparent py-2 text-lg outline-none" />
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => setQuiz((a) => [...a, emptyQuiz()])} className="mt-4 inline-flex items-center gap-2 rounded-2xl border-2 border-sky-200 px-4 py-2.5 text-lg font-bold text-sky-800 hover:bg-sky-50"><Plus size={22} /> Savol qo‘shish</button>
        </EditorSection>

        <EditorSection icon={Shuffle} title="Juftliklar" hint="Atama va uning izohi. Moslashtirish, Xotira, Harflar, Rostmi? o‘yinlari uchun (kamida 3 ta)." count={cleaned.pairs.length}>
          <div className="space-y-2">
            {pairs.map((p, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-8 text-lg font-extrabold text-slate-400">{i + 1}</span>
                <input value={p[0]} onChange={(e) => upd(setPairs, i, (y) => [e.target.value, y[1]])} placeholder="Atama (masalan: kitob)" className={edInputCls} />
                <input value={p[1]} onChange={(e) => upd(setPairs, i, (y) => [y[0], e.target.value])} placeholder="Izoh / jufti" className={edInputCls} />
                <button onClick={() => del(setPairs, i)} className="rounded-xl p-2 text-rose-600 hover:bg-rose-50" title="O‘chirish"><Trash2 size={22} /></button>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <button onClick={() => setPairs((a) => [...a, ['', '']])} className="inline-flex items-center gap-2 rounded-2xl border-2 border-blue-200 px-4 py-2.5 text-lg font-bold text-blue-800 hover:bg-blue-50"><Plus size={22} /> Juftlik qo‘shish</button>
          </div>
          <details className="mt-4 rounded-2xl bg-slate-50 p-4">
            <summary className="cursor-pointer text-lg font-bold text-blue-900">Tez kiritish: ro‘yxatni nusxalab qo‘ying</summary>
            <p className="mt-2 text-base text-slate-500">Har qatorda bitta juftlik: <b>atama — izoh</b> (tire, | yoki tab bilan ajrating).</p>
            <textarea value={bulk.pairs} onChange={(e) => setBulk((b) => ({ ...b, pairs: e.target.value }))} rows={5} className={`${edInputCls} mt-2 font-mono`} placeholder={'olma — meva\nsabzi — sabzavot'} />
            <button
              onClick={() => { const add = parseLines(bulk.pairs); if (add.length) { setPairs((a) => [...a.filter(([x, y]) => x.trim() || y.trim()), ...add]); setBulk((b) => ({ ...b, pairs: '' })); } }}
              className="mt-2 rounded-xl bg-blue-600 px-4 py-2 text-lg font-bold text-white hover:bg-blue-700"
            >
              Qo‘shish ({parseLines(bulk.pairs).length})
            </button>
          </details>
        </EditorSection>

        <EditorSection icon={MessageCircleQuestion} title="Savol-javob" hint="Og‘zaki savollar: javob ekranda keyin ochiladi. Portlash o‘yinida ham ishlatiladi." count={cleaned.qa.length} color="bg-amber-500">
          <div className="space-y-2">
            {qa.map((x, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-8 text-lg font-extrabold text-slate-400">{i + 1}</span>
                <input value={x.q} onChange={(e) => upd(setQa, i, (y) => ({ ...y, q: e.target.value }))} placeholder="Savol" className={edInputCls} />
                <input value={x.a} onChange={(e) => upd(setQa, i, (y) => ({ ...y, a: e.target.value }))} placeholder="Javob" className={edInputCls} />
                <button onClick={() => del(setQa, i)} className="rounded-xl p-2 text-rose-600 hover:bg-rose-50" title="O‘chirish"><Trash2 size={22} /></button>
              </div>
            ))}
          </div>
          <button onClick={() => setQa((a) => [...a, { q: '', a: '' }])} className="mt-4 inline-flex items-center gap-2 rounded-2xl border-2 border-amber-200 px-4 py-2.5 text-lg font-bold text-amber-800 hover:bg-amber-50"><Plus size={22} /> Savol qo‘shish</button>
          <details className="mt-4 rounded-2xl bg-slate-50 p-4">
            <summary className="cursor-pointer text-lg font-bold text-blue-900">Tez kiritish</summary>
            <p className="mt-2 text-base text-slate-500">Har qatorda: <b>savol — javob</b></p>
            <textarea value={bulk.qa} onChange={(e) => setBulk((b) => ({ ...b, qa: e.target.value }))} rows={4} className={`${edInputCls} mt-2 font-mono`} />
            <button
              onClick={() => { const add = parseLines(bulk.qa).map(([q, a]) => ({ q, a })); if (add.length) { setQa((arr) => [...arr.filter((x) => x.q.trim() || x.a.trim()), ...add]); setBulk((b) => ({ ...b, qa: '' })); } }}
              className="mt-2 rounded-xl bg-blue-600 px-4 py-2 text-lg font-bold text-white hover:bg-blue-700"
            >
              Qo‘shish ({parseLines(bulk.qa).length})
            </button>
          </details>
        </EditorSection>

        <EditorSection icon={Target} title="Guruhlash (Joyda o‘yini)" hint="2–3 ta guruh nomi va har bir so‘zning guruhi. Ixtiyoriy." count={cleaned.sort ? cleaned.sort.items.length : 0} color="bg-emerald-600">
          <div className="flex flex-wrap gap-2">
            {sort.categories.map((c, k) => (
              <input key={k} value={c} onChange={(e) => setSort((s) => ({ ...s, categories: s.categories.map((x, j) => (j === k ? e.target.value : x)) }))} placeholder={`${k + 1}-guruh nomi`} className={`${edInputCls} max-w-xs`} />
            ))}
            {sort.categories.length < 3 && (
              <button onClick={() => setSort((s) => ({ ...s, categories: [...s.categories, ''] }))} className="rounded-xl border-2 border-emerald-200 px-3 text-lg font-bold text-emerald-800 hover:bg-emerald-50">+ 3-guruh</button>
            )}
          </div>
          <div className="mt-4 space-y-2">
            {sort.items.map((x, i) => (
              <div key={i} className="flex items-center gap-2">
                <input value={x.text} onChange={(e) => setSort((s) => ({ ...s, items: s.items.map((y, j) => (j === i ? { ...y, text: e.target.value } : y)) }))} placeholder="So‘z yoki ibora" className={edInputCls} />
                <select value={x.cat} onChange={(e) => setSort((s) => ({ ...s, items: s.items.map((y, j) => (j === i ? { ...y, cat: Number(e.target.value) } : y)) }))} className="rounded-xl border-2 border-blue-100 bg-white px-3 py-2.5 text-lg">
                  {sort.categories.map((c, k) => <option key={k} value={k}>{c || `${k + 1}-guruh`}</option>)}
                </select>
                <button onClick={() => setSort((s) => ({ ...s, items: s.items.filter((_, j) => j !== i) }))} className="rounded-xl p-2 text-rose-600 hover:bg-rose-50" title="O‘chirish"><Trash2 size={22} /></button>
              </div>
            ))}
          </div>
          <button onClick={() => setSort((s) => ({ ...s, items: [...s.items, { text: '', cat: 0 }] }))} className="mt-4 inline-flex items-center gap-2 rounded-2xl border-2 border-emerald-200 px-4 py-2.5 text-lg font-bold text-emerald-800 hover:bg-emerald-50"><Plus size={22} /> So‘z qo‘shish</button>
        </EditorSection>

        <section className="sticky bottom-3 z-10 rounded-3xl border-2 border-blue-200 bg-white/95 p-4 shadow-xl backdrop-blur">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex-1">
              <div className="text-base font-bold text-slate-500">Ochiladigan o‘yinlar: {available.length} ta</div>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {available.length ? available.map((g) => <span key={g.id} className={`rounded-full ${g.color} px-2.5 py-0.5 text-sm font-bold text-white`}>{g.name}</span>) : <span className="text-base text-rose-600">Hali o‘yin ochilmadi</span>}
              </div>
            </div>
            <button onClick={onCancel} className="rounded-2xl border-2 border-blue-200 px-5 py-3 text-lg font-bold text-blue-900 hover:bg-blue-50">Bekor qilish</button>
            <PrimaryButton onClick={save} disabled={saving} icon={saving ? Loader2 : Save}>{saving ? 'Saqlanmoqda...' : 'Saqlash'}</PrimaryButton>
          </div>
          {err && <p className="mt-2 text-lg font-semibold text-rose-600">{err}</p>}
        </section>
      </div>
    </div>
  );
}

/* ============================================================
   NATIJALAR TARIXI VA REYTING
   ============================================================ */
const mapResultRow = (r) => ({
  id: r.id, classId: r.class_id, teacherId: r.teacher_id, teacherName: r.teacher_name, subject: r.subject, grade: r.grade,
  topicId: r.topic_id, topicTitle: r.topic_title, gameId: r.game_id, gameName: r.game_name,
  teams: r.teams || [], students: r.students || {}, playedAt: Date.parse(r.played_at) || 0,
});

function computeRating(results, roster) {
  const map = new Map();
  const get = (n) => { if (!map.has(n)) map.set(n, { name: n, team: 0, solo: 0, wins: 0, games: 0 }); return map.get(n); };
  roster.forEach((n) => get(n));
  results.forEach((r) => {
    const teams = r.teams || [];
    const max = Math.max(0, ...teams.map((t) => t.score || 0));
    const winners = teams.length > 1 && max > 0 && teams.filter((t) => t.score === max).length === 1 ? teams.filter((t) => t.score === max) : [];
    const seen = new Set();
    teams.forEach((t) => {
      (t.members || []).forEach((m) => {
        const s = get(m);
        s.team += t.score || 0;
        if (winners.includes(t)) s.wins += 1;
        seen.add(m);
      });
    });
    Object.entries(r.students || {}).forEach(([m, pts]) => { get(m).solo += pts; seen.add(m); });
    seen.forEach((m) => { get(m).games += 1; });
  });
  return [...map.values()].map((s) => ({ ...s, total: s.team + s.solo })).sort((a, b) => b.total - a.total || b.wins - a.wins || a.name.localeCompare(b.name));
}

const fmtDate = (ms) => {
  const d = new Date(ms);
  const p = (n) => String(n).padStart(2, '0');
  return `${p(d.getDate())}.${p(d.getMonth() + 1)}.${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}`;
};

const PERIODS = [['all', 'Hammasi', null], ['month', '30 kun', 30], ['week', '7 kun', 7]];
const periodDays = (p) => (PERIODS.find((x) => x[0] === p) || PERIODS[0])[2];
const teamPoints = (r) => (r.teams || []).reduce((a, t) => a + (Number(t.score) || 0), 0);
const MEDAL = ['bg-amber-400 text-amber-950', 'bg-slate-300 text-slate-800', 'bg-orange-300 text-orange-950'];

function RankBadge({ k, active = true }) {
  return (
    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-extrabold ${k < 3 && active ? MEDAL[k] : 'text-slate-400'}`}>{k + 1}</span>
  );
}

function EmptyBox({ text }) {
  return (
    <div className="rounded-3xl border-2 border-dashed border-blue-200 bg-white p-10 text-center">
      <Trophy size={56} className="mx-auto text-blue-200" />
      <p className="mt-3 text-xl text-slate-500">{text}</p>
    </div>
  );
}

function Loading() {
  return <div className="flex items-center justify-center gap-3 py-16 text-xl text-blue-900"><Loader2 className="animate-spin" size={32} /> Yuklanmoqda...</div>;
}

function useAsync(fn, deps) {
  const [state, setState] = useState({ data: null, err: '' });
  useEffect(() => {
    let alive = true;
    setState({ data: null, err: '' });
    fn().then((data) => alive && setState({ data, err: '' })).catch((e) => alive && setState({ data: null, err: errText(e) }));
    return () => { alive = false; };
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
  return state;
}

/* ---- 1) Sinf reytingi ---- */
function ClassRatingPanel({ cls, period, loadResults }) {
  const [tab, setTab] = useState('rating');
  const { data: results, err } = useAsync(() => loadResults(cls.id), [cls.id]);
  const since = periodDays(period) ? Date.now() - periodDays(period) * 864e5 : 0;
  const list = (results || []).filter((r) => r.playedAt >= since);
  const rating = computeRating(list, cls.students || []);
  const totalPts = list.reduce((s, r) => s + teamPoints(r), 0);

  if (err) return <div className="rounded-2xl bg-rose-50 p-4 text-lg font-semibold text-rose-700">Natijalarni yuklab bo‘lmadi: {err}</div>;
  if (!results) return <Loading />;
  return (
    <>
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard icon={Trophy} label="O‘ynalgan o‘yinlar" value={list.length} />
        <StatCard icon={Star} label="Jami to‘plangan ball" value={totalPts} />
        <StatCard icon={Users} label="Sinfdagi o‘quvchilar" value={(cls.students || []).length} />
      </div>
      <div className="mb-5 inline-flex rounded-2xl bg-blue-50 p-1">
        {[['rating', 'O‘quvchilar reytingi', Medal], ['history', 'O‘yinlar tarixi', History]].map(([id, label, I]) => (
          <button key={id} onClick={() => setTab(id)} className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-lg font-bold transition ${tab === id ? 'bg-white text-blue-900 shadow' : 'text-blue-700'}`}>
            <I size={22} /> {label}
          </button>
        ))}
      </div>

      {tab === 'rating' && (list.length === 0 ? (
        <EmptyBox text="Hali natija yo‘q. O‘yin oxirigacha o‘ynalganda natijalar shu yerda avtomatik saqlanadi." />
      ) : (
        <div className="overflow-hidden rounded-3xl border-2 border-blue-100 bg-white">
          {rating.every((x) => x.total === 0) && (
            <div className="flex items-start gap-3 border-b border-amber-100 bg-amber-50 px-4 py-3 text-lg text-amber-900">
              <Lightbulb size={22} className="mt-1 shrink-0" />
              O‘yinlar saqlangan, lekin ballar hali o‘quvchilarga bog‘lanmagan. O‘yin oldidan «Ro‘yxat» orqali jamoalarga avtomatik bo‘ling yoki o‘yin paytida «O‘quvchi tanlash» tugmasidan foydalaning.
            </div>
          )}
          <div className="grid grid-cols-[3rem_1fr_repeat(4,5rem)] items-center gap-2 bg-blue-50 px-4 py-3 text-sm font-extrabold uppercase tracking-wide text-blue-800 md:grid-cols-[4rem_1fr_repeat(4,7rem)] md:text-base">
            <span>#</span><span>O‘quvchi</span><span className="text-right">Ball</span><span className="text-right">Jamoa</span><span className="text-right">Shaxsiy</span><span className="text-right">G‘alaba</span>
          </div>
          {rating.map((s, k) => (
            <div key={s.name} className={`grid grid-cols-[3rem_1fr_repeat(4,5rem)] items-center gap-2 border-t border-blue-50 px-4 py-3 md:grid-cols-[4rem_1fr_repeat(4,7rem)] ${k < 3 && s.total > 0 ? 'bg-amber-50/40' : ''}`}>
              <RankBadge k={k} active={s.total > 0} />
              <span className="truncate text-xl font-bold text-blue-950">{s.name}</span>
              <span className="text-right text-2xl font-extrabold text-blue-900 tabular-nums">{s.total}</span>
              <span className="text-right text-lg text-slate-600 tabular-nums">{s.team}</span>
              <span className="text-right text-lg text-slate-600 tabular-nums">{s.solo}</span>
              <span className="text-right text-lg text-slate-600 tabular-nums">{s.wins}</span>
            </div>
          ))}
          <p className="border-t border-blue-50 px-4 py-3 text-base text-slate-500">
            <b>Jamoa</b> — o‘quvchi a’zo bo‘lgan jamoaning bali; <b>Shaxsiy</b> — «O‘quvchi tanlash» orqali chiqib, o‘zi topgan ball.
          </p>
        </div>
      ))}

      {tab === 'history' && (list.length === 0 ? (
        <EmptyBox text="Bu davrda o‘yin o‘ynalmagan" />
      ) : (
        <div className="space-y-3">
          {list.map((r) => {
            const sorted = [...(r.teams || [])].sort((a, b) => (b.score || 0) - (a.score || 0));
            const top = sorted[0];
            const tie = sorted.length > 1 && sorted[1].score === top?.score;
            return (
              <div key={r.id} className="rounded-3xl border-2 border-blue-100 bg-white p-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-base font-bold text-blue-800"><CalendarDays size={16} /> {fmtDate(r.playedAt)}</span>
                  <span className="text-xl font-extrabold text-blue-950">{r.gameName}</span>
                  <span className="text-lg text-slate-500">• {r.topicTitle}</span>
                  <span className="ml-auto text-base text-slate-400">{r.teacherName}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {sorted.map((t, k) => (
                    <span key={k} className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-lg font-bold ${k === 0 && !tie && sorted.length > 1 ? 'bg-amber-100 text-amber-900' : 'bg-slate-100 text-slate-700'}`}>
                      {k === 0 && !tie && sorted.length > 1 && <Crown size={18} />} {t.name}: <span className="tabular-nums">{t.score}</span>
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
}

/* ---- 2) Maktab reytingi ---- */
function SchoolRatingPanel({ school, schoolClasses, period, loadSchoolResults }) {
  const ids = schoolClasses.map((c) => c.id).sort().join(',');
  const { data: results, err } = useAsync(() => loadSchoolResults(schoolClasses.map((c) => c.id), periodDays(period)), [ids, period]);
  const byClass = useMemo(() => {
    const map = new Map(schoolClasses.map((c) => [c.id, { cls: c, games: 0, points: 0, list: [] }]));
    (results || []).forEach((r) => {
      const e = map.get(r.classId);
      if (!e) return;
      e.games += 1;
      e.points += teamPoints(r);
      e.list.push(r);
    });
    return [...map.values()].sort((a, b) => b.points - a.points || b.games - a.games);
  }, [results, schoolClasses]);
  const topStudents = useMemo(() => byClass
    .flatMap((e) => computeRating(e.list, []).map((s) => ({ ...s, label: classLabel(e.cls) })))
    .filter((s) => s.total > 0)
    .sort((a, b) => b.total - a.total || b.wins - a.wins)
    .slice(0, 20), [byClass]);
  const totalGames = byClass.reduce((a, e) => a + e.games, 0);
  const totalPts = byClass.reduce((a, e) => a + e.points, 0);

  if (err) return <div className="rounded-2xl bg-rose-50 p-4 text-lg font-semibold text-rose-700">Natijalarni yuklab bo‘lmadi: {err}</div>;
  if (!results) return <Loading />;
  return (
    <>
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard icon={School} label={`${school} sinflari`} value={schoolClasses.length} />
        <StatCard icon={Trophy} label="O‘ynalgan o‘yinlar" value={totalGames} />
        <StatCard icon={Star} label="Jami to‘plangan ball" value={totalPts} />
      </div>
      {totalGames === 0 ? <EmptyBox text="Maktabda bu davrda hali o‘yin o‘ynalmagan" /> : (
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl border-2 border-blue-100 bg-white">
            <h3 className="flex items-center gap-2 bg-blue-50 px-5 py-3 text-xl font-extrabold text-blue-900"><School size={22} /> Sinflar reytingi</h3>
            {byClass.map((e, k) => (
              <div key={e.cls.id} className={`flex items-center gap-3 border-t border-blue-50 px-5 py-3 ${k < 3 && e.points > 0 ? 'bg-amber-50/40' : ''}`}>
                <RankBadge k={k} active={e.points > 0} />
                <span className="flex-1 text-xl font-extrabold text-blue-950">{classLabel(e.cls)} <span className="text-base font-semibold text-slate-400">• {e.cls.students.length} o‘quvchi</span></span>
                <span className="text-base text-slate-500">{e.games} o‘yin</span>
                <span className="w-20 text-right text-2xl font-extrabold text-blue-900 tabular-nums">{e.points}</span>
              </div>
            ))}
          </div>
          <div className="overflow-hidden rounded-3xl border-2 border-blue-100 bg-white">
            <h3 className="flex items-center gap-2 bg-blue-50 px-5 py-3 text-xl font-extrabold text-blue-900"><Medal size={22} /> Maktabning eng faol o‘quvchilari</h3>
            {topStudents.length === 0 ? (
              <p className="px-5 py-6 text-lg text-slate-500">Ballar hali o‘quvchilarga bog‘lanmagan. Jamoalarga bo‘lib yoki «O‘quvchi tanlash» bilan o‘ynang.</p>
            ) : topStudents.map((s, k) => (
              <div key={`${s.label}-${s.name}`} className="flex items-center gap-3 border-t border-blue-50 px-5 py-3">
                <RankBadge k={k} />
                <span className="min-w-0 flex-1 truncate text-xl font-bold text-blue-950">{s.name}</span>
                <span className="rounded-full bg-blue-50 px-3 py-0.5 text-base font-bold text-blue-800">{s.label}</span>
                <span className="w-16 text-right text-2xl font-extrabold text-blue-900 tabular-nums">{s.total}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

/* ---- 3) Maktablararo reyting ---- */
function GlobalRatingPanel({ mySchool, period, loadGlobal }) {
  const [sortBy, setSortBy] = useState('points');
  const { data, err } = useAsync(() => loadGlobal(periodDays(period)), [period]);
  if (err) return <div className="rounded-2xl bg-rose-50 p-4 text-lg font-semibold text-rose-700">Reytingni yuklab bo‘lmadi: {err}</div>;
  if (!data) return <Loading />;
  const schools = [...data.schools].map((s) => ({ ...s, avg: s.games ? Math.round(s.points / s.games) : 0 }))
    .sort((a, b) => (sortBy === 'avg' ? b.avg - a.avg : b.points - a.points) || b.games - a.games);
  const mine = normSchool(mySchool || '');
  return (
    <>
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <p className="flex-1 text-lg text-slate-500">Barcha maktablar bo‘yicha jamlangan natijalar. O‘quvchilarning ismlari bu yerda ko‘rsatilmaydi.</p>
        <div className="inline-flex rounded-2xl bg-slate-100 p-1">
          {[['points', 'Jami ball'], ['avg', 'O‘rtacha ball']].map(([id, label]) => (
            <button key={id} onClick={() => setSortBy(id)} className={`rounded-xl px-4 py-2 text-base font-bold ${sortBy === id ? 'bg-white text-slate-900 shadow' : 'text-slate-500'}`}>{label}</button>
          ))}
        </div>
      </div>
      {schools.length === 0 ? <EmptyBox text="Bu davrda hali hech qaysi maktabda o‘yin o‘ynalmagan" /> : (
        <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
          <div className="overflow-hidden rounded-3xl border-2 border-blue-100 bg-white">
            <h3 className="flex items-center gap-2 bg-blue-50 px-5 py-3 text-xl font-extrabold text-blue-900"><Building2 size={22} /> Maktablar reytingi</h3>
            {schools.map((s, k) => {
              const isMine = normSchool(s.school) === mine;
              return (
                <div key={s.school} className={`flex items-center gap-3 border-t border-blue-50 px-5 py-3 ${isMine ? 'bg-blue-50 ring-2 ring-inset ring-blue-300' : k < 3 ? 'bg-amber-50/40' : ''}`}>
                  <RankBadge k={k} />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-xl font-extrabold text-blue-950">{s.school}{isMine && <span className="ml-2 rounded-full bg-blue-600 px-2 py-0.5 text-sm text-white">Sizning maktab</span>}</div>
                    <div className="text-base text-slate-500">{s.games} o‘yin • {s.classes} sinf • {s.teachers} o‘qituvchi • o‘rtacha {s.avg}</div>
                  </div>
                  <span className="text-2xl font-extrabold text-blue-900 tabular-nums">{sortBy === 'avg' ? s.avg : s.points}</span>
                </div>
              );
            })}
          </div>
          <div className="overflow-hidden rounded-3xl border-2 border-blue-100 bg-white">
            <h3 className="flex items-center gap-2 bg-blue-50 px-5 py-3 text-xl font-extrabold text-blue-900"><School size={22} /> Eng faol sinflar</h3>
            {data.classes.slice(0, 20).map((c, k) => (
              <div key={`${c.school}-${c.grade}-${c.letter}`} className="flex items-center gap-3 border-t border-blue-50 px-5 py-3">
                <RankBadge k={k} />
                <div className="min-w-0 flex-1">
                  <div className="text-xl font-extrabold text-blue-950">{c.grade}-{c.letter}</div>
                  <div className="truncate text-base text-slate-500">{c.school} • {c.games} o‘yin</div>
                </div>
                <span className="text-2xl font-extrabold text-blue-900 tabular-nums">{c.points}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function RatingScreen({ cls, school, schoolClasses, initialScope, loadResults, loadSchoolResults, loadGlobal, onBack }) {
  const scopes = [
    cls && ['class', `${classLabel(cls)} sinf`, Users],
    school && ['school', 'Butun maktab', School],
    ['global', 'Maktablararo', Building2],
  ].filter(Boolean);
  const [scope, setScope] = useState(initialScope && scopes.some((s) => s[0] === initialScope) ? initialScope : scopes[0][0]);
  const [period, setPeriod] = useState('all');
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
      <PageTitle title="Natijalar va reyting" subtitle={school || 'Barcha maktablar'} onBack={onBack} />
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="inline-flex flex-wrap gap-2">
          {scopes.map(([id, label, I]) => (
            <button key={id} onClick={() => setScope(id)} className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-lg font-bold transition ${scope === id ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'border-2 border-blue-100 bg-white text-blue-900 hover:bg-blue-50'}`}>
              <I size={22} /> {label}
            </button>
          ))}
        </div>
        <div className="ml-auto inline-flex rounded-2xl bg-slate-100 p-1">
          {PERIODS.map(([id, label]) => (
            <button key={id} onClick={() => setPeriod(id)} className={`rounded-xl px-4 py-2 text-base font-bold ${period === id ? 'bg-white text-slate-900 shadow' : 'text-slate-500'}`}>{label}</button>
          ))}
        </div>
      </div>
      {scope === 'class' && cls && <ClassRatingPanel cls={cls} period={period} loadResults={loadResults} />}
      {scope === 'school' && <SchoolRatingPanel school={school} schoolClasses={schoolClasses} period={period} loadSchoolResults={loadSchoolResults} />}
      {scope === 'global' && <GlobalRatingPanel mySchool={school} period={period} loadGlobal={loadGlobal} />}
    </div>
  );
}

function AdminRatingTab({ loadGlobal }) {
  const [period, setPeriod] = useState('all');
  return (
    <div>
      <div className="mb-5 inline-flex rounded-2xl bg-slate-100 p-1">
        {PERIODS.map(([id, label]) => (
          <button key={id} onClick={() => setPeriod(id)} className={`rounded-xl px-4 py-2 text-base font-bold ${period === id ? 'bg-white text-slate-900 shadow' : 'text-slate-500'}`}>{label}</button>
        ))}
      </div>
      <GlobalRatingPanel mySchool="" period={period} loadGlobal={loadGlobal} />
    </div>
  );
}

function SlideBody({ s }) {
  return (
    <>
      {s.text && <p className="mt-5 text-xl md:text-2xl leading-relaxed text-slate-700">{s.text}</p>}

      {s.rule && (
        <div className="mt-6 rounded-2xl border-l-8 border-blue-600 bg-blue-50 p-5 md:p-6">
          <div className="mb-1 flex items-center gap-2 text-base font-extrabold uppercase tracking-wide text-blue-700">
            <Lightbulb size={20} /> {s.ruleLabel || 'Qoida'}
          </div>
          <p className="text-xl md:text-2xl font-semibold leading-relaxed text-blue-950">{s.rule}</p>
        </div>
      )}

      {s.poem?.lines?.length > 0 && (
        <figure className="mt-6 rounded-2xl border-l-8 border-violet-500 bg-violet-50 p-5 md:p-6">
          <div className="space-y-1 text-xl md:text-2xl font-semibold italic leading-relaxed text-violet-950">
            {s.poem.lines.map((l, k) => <p key={k}>{l}</p>)}
          </div>
          {s.poem.author && <figcaption className="mt-3 text-lg font-bold text-violet-700">— {s.poem.author}</figcaption>}
        </figure>
      )}

      {s.list?.length > 0 && (
        <ul className="mt-6 space-y-3">
          {s.list.map((item, k) => (
            <li key={k} className="flex gap-3 text-xl md:text-2xl leading-relaxed text-slate-800">
              <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-base font-extrabold text-white">{k + 1}</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      {s.table && (
        <div className="mt-6 overflow-x-auto rounded-2xl border-2 border-blue-100">
          <table className="w-full border-collapse text-left text-lg md:text-xl">
            {s.table.head.some(Boolean) && (
              <thead>
                <tr className="bg-blue-900 text-white">
                  {s.table.head.map((h, k) => <th key={k} className="px-4 py-3 font-extrabold">{h}</th>)}
                </tr>
              </thead>
            )}
            <tbody>
              {s.table.rows.map((row, r) => (
                <tr key={r} className={r % 2 ? 'bg-blue-50/60' : 'bg-white'}>
                  {row.map((cell, c) => (
                    <td key={c} className={`border-t border-blue-100 px-4 py-3 align-top ${c === 0 ? 'font-bold text-blue-950' : 'text-slate-700'}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {s.examples?.length > 0 && (
        <div className="mt-6">
          <div className="mb-3 text-base font-bold uppercase tracking-wide text-slate-400">Misollar</div>
          <div className="flex flex-wrap gap-3">
            {s.examples.map((ex) => (
              <span key={ex} className="rounded-2xl border-2 border-blue-200 bg-white px-4 py-2 text-lg md:text-xl font-bold text-blue-900">{ex}</span>
            ))}
          </div>
        </div>
      )}

      {s.note && (
        <div className="mt-6 flex gap-3 rounded-2xl border-2 border-amber-200 bg-amber-50 p-5 text-lg md:text-xl leading-relaxed text-amber-900">
          <BookOpen size={26} className="mt-0.5 shrink-0" />
          <p>{s.note}</p>
        </div>
      )}
    </>
  );
}

function LessonScreen({ topic, onBack, onGames }) {
  const [i, setI] = useState(0);
  const slides = topic.lesson;
  const s = slides[i];
  const last = i === slides.length - 1;
  const topRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') setI((x) => Math.min(x + 1, slides.length - 1));
      if (e.key === 'ArrowLeft') setI((x) => Math.max(x - 1, 0));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [slides.length]);

  useEffect(() => {
    if (topRef.current && topRef.current.getBoundingClientRect().top < 0) {
      topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [i]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
      <PageTitle
        title={topic.title}
        subtitle={topic.source ? `Dars tushuntirish • ${topic.source}` : 'Dars tushuntirish'}
        onBack={onBack}
        right={
          <button onClick={onGames} className="rounded-2xl border-2 border-blue-200 px-5 py-3 text-lg font-bold text-blue-900 hover:bg-blue-50">
            O‘yinlarga o‘tish
          </button>
        }
      />
      <div ref={topRef} className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="hidden h-fit rounded-3xl border-2 border-blue-100 bg-white p-3 lg:block">
          <div className="px-3 py-2 text-sm font-extrabold uppercase tracking-wide text-slate-400">Dars rejasi</div>
          <ol className="space-y-1">
            {slides.map((sl, k) => (
              <li key={k}>
                <button
                  onClick={() => setI(k)}
                  className={`flex w-full items-start gap-2 rounded-xl px-3 py-2 text-left text-base font-semibold transition ${k === i ? 'bg-blue-600 text-white' : k < i ? 'text-blue-900 hover:bg-blue-50' : 'text-slate-500 hover:bg-blue-50'}`}
                >
                  <span className="w-6 shrink-0 font-extrabold">{k + 1}.</span>
                  <span>{sl.title}</span>
                </button>
              </li>
            ))}
          </ol>
        </aside>

        <div>
          <div className="mb-4 flex gap-1.5 lg:hidden">
            {slides.map((_, k) => (
              <button key={k} onClick={() => setI(k)} className={`h-3 flex-1 rounded-full transition ${k <= i ? 'bg-blue-600' : 'bg-blue-100'}`} aria-label={`${k + 1}-slayd`} />
            ))}
          </div>
          <div key={i} className="dp-pop min-h-[460px] rounded-[2rem] border-2 border-blue-100 bg-white p-6 md:p-10 shadow-xl shadow-blue-900/5">
            <div className="flex items-center gap-3 text-blue-600">
              <Lightbulb size={28} />
              <span className="text-lg font-bold">{i + 1} / {slides.length}</span>
            </div>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-blue-950">{s.title}</h2>
            <SlideBody s={s} />
          </div>
          <div className="mt-6 flex items-center justify-between gap-4">
            <button
              onClick={() => setI((x) => Math.max(x - 1, 0))}
              disabled={i === 0}
              className="inline-flex items-center gap-2 rounded-2xl border-2 border-blue-200 bg-white px-6 py-4 text-xl font-bold text-blue-900 transition hover:bg-blue-50 disabled:opacity-40"
            >
              <ChevronLeft size={28} /> Oldingi
            </button>
            {last ? (
              <PrimaryButton onClick={onGames} icon={Play}>O‘yinlarni tanlash</PrimaryButton>
            ) : (
              <PrimaryButton onClick={() => setI((x) => x + 1)} icon={ChevronRight}>Keyingi</PrimaryButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function GameCard({ g, n, onPick, topic, featured, small }) {
  const I = g.icon;
  const unavailable = !gameAvailable(g.id, topic);
  return (
    <button
      disabled={unavailable}
      onClick={() => onPick(g.id)}
      className={`relative flex flex-col items-start rounded-3xl border-2 bg-white text-left shadow-sm transition enabled:hover:-translate-y-1 enabled:hover:border-blue-500 enabled:hover:shadow-xl enabled:active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 ${
        small ? 'gap-3 border-blue-50 p-5' : 'gap-4 p-6 md:p-8 ' + (featured ? 'border-blue-200' : 'border-blue-100')
      }`}
    >
      {n && <span className="absolute right-4 top-4 text-3xl font-extrabold text-blue-100">{n}</span>}
      <div className={`flex items-center justify-center rounded-3xl ${g.color} text-white shadow-lg ${small ? 'h-14 w-14' : 'h-20 w-20'}`}>
        <I size={small ? 30 : 42} />
      </div>
      <div>
        <div className={`${small ? 'text-xl' : 'text-2xl md:text-3xl'} font-extrabold text-blue-950`}>{g.name}</div>
        <div className={`mt-1 ${small ? 'text-base' : 'text-lg'} text-slate-500`}>{g.desc}</div>
      </div>
      {unavailable && <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-slate-500">Bu mavzuda hali yo‘q</span>}
      {!unavailable && (g.fresh || g.hot) && !small && <span className="absolute left-4 top-4 rounded-full bg-rose-500 px-3 py-1 text-sm font-extrabold text-white">Yangi</span>}
    </button>
  );
}

function GameSelectScreen({ topic, topicIndex, onPick, onBack }) {
  const featuredIds = useMemo(() => featuredGames(topic, topicIndex), [topic, topicIndex]);
  const featured = featuredIds.map((id) => GAMES.find((g) => g.id === id)).filter(Boolean);
  const rest = GAMES.filter((g) => !g.disabled && !featuredIds.includes(g.id));
  const [showAll, setShowAll] = useState(false);
  const random = () => {
    const pool = featuredIds.length ? featuredIds : rest.filter((g) => gameAvailable(g.id, topic)).map((g) => g.id);
    if (pool.length) onPick(pool[Math.floor(Math.random() * pool.length)]);
  };
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
      <PageTitle title="O‘yinni tanlang" subtitle={topic?.title} onBack={onBack} />
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2 rounded-2xl bg-blue-50 px-4 py-2 text-lg font-bold text-blue-800">
          <Sparkles size={22} /> Bu darsning o‘yinlari
        </div>
        <button onClick={random} className="inline-flex items-center gap-2 rounded-2xl bg-amber-400 px-5 py-3 text-xl font-extrabold text-amber-950 shadow-lg transition hover:bg-amber-300 active:scale-95">
          <Dices size={26} /> Tasodifiy o‘yin
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {featured.map((g, i) => <GameCard key={g.id} g={g} n={i + 1} onPick={onPick} topic={topic} featured />)}
      </div>
      {rest.length > 0 && (
        <div className="mt-8">
          <button onClick={() => setShowAll((v) => !v)} className="inline-flex items-center gap-2 rounded-2xl border-2 border-blue-200 bg-white px-5 py-3 text-xl font-bold text-blue-900 hover:bg-blue-50">
            <LayoutGrid size={24} /> {showAll ? 'Boshqa o‘yinlarni yashirish' : `Boshqa o‘yinlar (${rest.length})`}
            <ChevronDown size={24} className={`transition ${showAll ? 'rotate-180' : ''}`} />
          </button>
          {showAll && (
            <div className="dp-pop mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
              {rest.map((g) => <GameCard key={g.id} g={g} onPick={onPick} topic={topic} small />)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   6. O‘QUVCHI TANLASH VOSITALARI
   ============================================================ */

function cameraErrorText(err) {
  const n = err?.name || '';
  if (typeof window !== 'undefined' && window.isSecureContext === false) return 'Kamera faqat xavfsiz (https://) manzilda ishlaydi. Saytni https:// bilan oching.';
  if (n === 'NotAllowedError' || n === 'PermissionDeniedError' || n === 'SecurityError')
    return 'Kameraga ruxsat berilmagan. Manzil satridagi qulf (yoki kamera) belgisini bosing, «Kamera → Ruxsat berish»ni tanlang va sahifani yangilang.';
  if (n === 'NotFoundError' || n === 'DevicesNotFoundError' || n === 'OverconstrainedError')
    return 'Kamera topilmadi. Kamera ulanganini tekshiring yoki ro‘yxatdan boshqa kamerani tanlang.';
  if (n === 'NotReadableError' || n === 'TrackStartError' || n === 'AbortError')
    return 'Kamera boshqa dastur tomonidan band (Zoom, Telegram, Teams va h.k.). O‘sha dasturni yopib, qayta urinib ko‘ring.';
  return `Kamerani yoqib bo‘lmadi (${n || 'noma’lum xato'}). Sahifani yangilab, qayta urinib ko‘ring.`;
}

function CameraPicker({ students, onPicked }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);
  const [status, setStatus] = useState('idle'); // idle | loading | on | error | nocam
  const [errorMsg, setErrorMsg] = useState('');
  const [scanning, setScanning] = useState(false);
  const [box, setBox] = useState({ x: 40, y: 30 });
  const [flash, setFlash] = useState('');
  const [result, setResult] = useState(null); // { name, img }
  const [devices, setDevices] = useState([]);
  const [deviceId, setDeviceId] = useState('');

  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) videoRef.current.srcObject = null;
  }, []);
  const stop = useCallback(() => {
    clearInterval(intervalRef.current);
    clearTimeout(timeoutRef.current);
    stopStream();
  }, [stopStream]);

  useEffect(() => stop, [stop]);

  // Oqim tayyor bo‘lganda videoga ulab, ijroni boshlaymiz
  useEffect(() => {
    const v = videoRef.current;
    if (status !== 'on' || !v || !streamRef.current) return;
    if (v.srcObject !== streamRef.current) v.srcObject = streamRef.current;
    const playIt = () => v.play().catch(() => {});
    if (v.readyState >= 1) playIt(); else v.onloadedmetadata = playIt;
  }, [status]);

  const start = async (wantedId = deviceId) => {
    setResult(null);
    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      setStatus('error');
      setErrorMsg(typeof window !== 'undefined' && window.isSecureContext === false
        ? 'Kamera faqat xavfsiz (https://) manzilda ishlaydi.'
        : 'Bu brauzer kamerani qo‘llab-quvvatlamaydi. Chrome yoki Edge’dan foydalaning.');
      return;
    }
    stopStream();
    setStatus('loading');
    const attempts = wantedId
      ? [{ video: { deviceId: { exact: wantedId } } }, { video: true }]
      : [{ video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } } }, { video: true }];
    let lastErr = null;
    for (const constraints of attempts) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ ...constraints, audio: false });
        streamRef.current = stream;
        setStatus('on');
        try {
          const list = (await navigator.mediaDevices.enumerateDevices()).filter((d) => d.kind === 'videoinput');
          setDevices(list);
          const cur = stream.getVideoTracks()[0]?.getSettings?.().deviceId;
          if (cur) setDeviceId(cur);
        } catch { /* ro‘yxat ixtiyoriy */ }
        return;
      } catch (err) {
        lastErr = err;
        if (err?.name === 'NotAllowedError' || err?.name === 'SecurityError') break;
      }
    }
    setStatus('error');
    setErrorMsg(cameraErrorText(lastErr));
  };

  const pick = () => {
    if (scanning || students.length === 0) return;
    setResult(null);
    setScanning(true);
    intervalRef.current = setInterval(() => {
      setBox({ x: 8 + Math.random() * 64, y: 8 + Math.random() * 56 });
      setFlash(students[Math.floor(Math.random() * students.length)]);
    }, 130);
    timeoutRef.current = setTimeout(() => {
      clearInterval(intervalRef.current);
      const name = students[Math.floor(Math.random() * students.length)];
      let img = null;
      const v = videoRef.current;
      const c = canvasRef.current;
      if (v && c && v.videoWidth) {
        c.width = v.videoWidth;
        c.height = v.videoHeight;
        const ctx = c.getContext('2d');
        ctx.save();
        ctx.translate(c.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(v, 0, 0, c.width, c.height);
        ctx.restore();
        img = c.toDataURL('image/jpeg', 0.85);
      }
      setFlash('');
      setScanning(false);
      setResult({ name, img });
      onPicked && onPicked(name);
    }, 2600);
  };

  return (
    <div>
      <div className="relative mx-auto aspect-video w-full max-w-4xl overflow-hidden rounded-3xl bg-blue-950">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`absolute inset-0 h-full w-full object-cover transition-opacity ${status === 'on' && !result?.img ? 'opacity-100' : 'opacity-0'}`}
          style={{ transform: 'scaleX(-1)' }}
        />
        {result?.img && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={result.img} alt="Tanlangan lahza" className="absolute inset-0 h-full w-full object-cover" />
        )}
        {status !== 'on' && status !== 'nocam' && !result?.img && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center text-white">
            {status === 'loading' ? <Loader2 size={64} className="animate-spin" /> : status === 'error' ? <CameraOff size={64} /> : <Camera size={64} />}
            <p className="max-w-lg text-xl">
              {status === 'error' ? errorMsg : status === 'loading' ? 'Kamera yoqilmoqda...' : 'Kamerani yoqing va sinfni ekranga oling'}
            </p>
          </div>
        )}
        {status === 'nocam' && !scanning && !result && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center text-white">
            <Users size={64} />
            <p className="max-w-lg text-xl">Kamerasiz rejim: tugmani bosing — o‘quvchi tasodifiy tanlanadi</p>
          </div>
        )}
        {scanning && (
          <>
            <div
              className="absolute h-1/3 w-1/4 rounded-2xl border-4 border-amber-400 shadow-[0_0_0_9999px_rgba(15,23,42,0.35)] transition-all duration-100"
              style={{ left: `${box.x}%`, top: `${box.y}%` }}
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-2xl bg-white/90 px-6 py-3 text-2xl font-extrabold text-blue-950">{flash}</div>
          </>
        )}
        {result && (
          <div className="dp-pop absolute inset-x-0 bottom-0 bg-gradient-to-t from-blue-950/95 to-transparent p-6 pt-16 text-center">
            <div className="text-xl font-semibold text-blue-200">Tanlangan o‘quvchi</div>
            <div className="text-4xl md:text-6xl font-extrabold text-white">{result.name}</div>
          </div>
        )}
      </div>
      <canvas ref={canvasRef} className="hidden" />
      <div className="mt-5 flex flex-wrap justify-center gap-3">
        {status !== 'on' && status !== 'nocam' ? (
          <>
            <PrimaryButton onClick={() => start()} disabled={status === 'loading'} icon={Camera}>{status === 'error' ? 'Qayta urinish' : 'Kamerani yoqish'}</PrimaryButton>
            {status === 'error' && (
              <button
                onClick={() => setStatus('nocam')}
                className="rounded-2xl border-2 border-blue-200 px-6 py-4 text-xl font-bold text-blue-900 hover:bg-blue-50"
              >
                Kamerasiz tanlash
              </button>
            )}
          </>
        ) : (
          <>
            {status === 'on' && devices.length > 1 && (
              <select
                value={deviceId}
                onChange={(e) => { setDeviceId(e.target.value); start(e.target.value); }}
                className="rounded-2xl border-2 border-blue-200 bg-white px-4 py-4 text-lg font-bold text-blue-900"
                title="Kamerani tanlash"
              >
                {devices.map((d, i) => <option key={d.deviceId || i} value={d.deviceId}>{d.label || `Kamera ${i + 1}`}</option>)}
              </select>
            )}
            <PrimaryButton onClick={pick} disabled={scanning || students.length === 0} icon={UserCheck}>
              {scanning ? 'Qidirilmoqda...' : result ? 'Yana tanlash' : 'O‘quvchini tanlash'}
            </PrimaryButton>
            <button
              onClick={() => { stop(); setStatus('idle'); setResult(null); }}
              className="rounded-2xl border-2 border-slate-200 px-6 py-4 text-xl font-bold text-slate-600 hover:bg-slate-50"
            >
              {status === 'nocam' ? 'Kamerani qayta yoqish' : 'Kamerani o‘chirish'}
            </button>
          </>
        )}
      </div>
      {students.length === 0 && <p className="mt-3 text-center text-lg font-semibold text-rose-600">Avval sinf ro‘yxatini kiriting.</p>}
    </div>
  );
}

function ListPicker({ students, teamCount, onGroups, onPicked }) {
  const [highlight, setHighlight] = useState(null);
  const [picked, setPicked] = useState(null);
  const [noRepeat, setNoRepeat] = useState(true);
  const [used, setUsed] = useState([]);
  const [running, setRunning] = useState(false);
  const [localGroups, setLocalGroups] = useState(null);
  const [saved, setSaved] = useState(false);
  const timers = useRef([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const pool = noRepeat ? students.filter((s) => !used.includes(s)) : students;

  const pickRandom = () => {
    if (running || pool.length === 0) return;
    setRunning(true);
    setPicked(null);
    const final = pool[Math.floor(Math.random() * pool.length)];
    const steps = 18;
    let delay = 0;
    for (let i = 0; i < steps; i++) {
      delay += 50 + i * 14;
      const isLast = i === steps - 1;
      const name = isLast ? final : pool[Math.floor(Math.random() * pool.length)];
      timers.current.push(
        setTimeout(() => {
          setHighlight(name);
          if (isLast) {
            setPicked(final);
            setRunning(false);
            setUsed((u) => (u.includes(final) ? u : [...u, final]));
            onPicked && onPicked(final);
          }
        }, delay)
      );
    }
  };

  const split = () => {
    const n = teamCount;
    const sh = shuffle(students);
    const g = Array.from({ length: n }, () => []);
    sh.forEach((s, i) => g[i % n].push(s));
    setLocalGroups(g);
    setSaved(false);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <PrimaryButton onClick={pickRandom} disabled={running || pool.length === 0} icon={Shuffle}>Tasodifiy tanlash</PrimaryButton>
        <button
          onClick={split}
          disabled={teamCount < 2 || students.length < teamCount}
          className="inline-flex items-center gap-2 rounded-2xl border-2 border-blue-600 px-6 py-4 text-xl font-extrabold text-blue-700 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-400"
        >
          <Users size={26} /> {teamCount}ta guruhga bo‘lish
        </button>
        <label className="ml-auto flex cursor-pointer items-center gap-2 text-lg font-semibold text-slate-600">
          <input type="checkbox" className="h-6 w-6 accent-blue-600" checked={noRepeat} onChange={(e) => setNoRepeat(e.target.checked)} />
          Tanlanganlar qayta chiqmasin
        </label>
        {used.length > 0 && (
          <button onClick={() => { setUsed([]); setPicked(null); setHighlight(null); }} className="inline-flex items-center gap-1 text-lg font-bold text-blue-700 hover:underline">
            <RotateCcw size={20} /> Tozalash
          </button>
        )}
      </div>
      {teamCount < 2 && <p className="mt-2 text-base text-slate-500">Guruhlarga bo‘lish uchun avval 2–4 jamoa rejimini tanlang.</p>}

      {picked && (
        <div className="dp-pop mt-5 rounded-3xl bg-blue-600 p-6 text-center text-white">
          <div className="text-lg font-semibold text-blue-100">Tanlangan o‘quvchi</div>
          <div className="text-4xl md:text-5xl font-extrabold">{picked}</div>
        </div>
      )}

      {localGroups ? (
        <div className="mt-6">
          <div className={`grid gap-4 ${localGroups.length === 2 ? 'md:grid-cols-2' : localGroups.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-4'}`}>
            {localGroups.map((g, i) => (
              <div key={i} className={`rounded-3xl border-2 ${TEAM_STYLES[i].border} ${TEAM_STYLES[i].light} p-4`}>
                <div className={`mb-3 inline-flex items-center gap-2 rounded-xl ${TEAM_STYLES[i].bg} px-4 py-2 text-xl font-extrabold text-white`}>
                  <Users size={22} /> {i + 1}-jamoa ({g.length})
                </div>
                <ul className="space-y-1">
                  {g.map((s) => <li key={s} className="text-lg font-semibold text-slate-800">{s}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <PrimaryButton onClick={() => { onGroups(localGroups); setSaved(true); }} icon={saved ? CheckCircle2 : Save}>
              {saved ? 'Saqlandi' : 'Guruhlarni saqlash'}
            </PrimaryButton>
            <button onClick={split} className="inline-flex items-center gap-2 rounded-2xl border-2 border-blue-200 px-6 py-4 text-xl font-bold text-blue-900 hover:bg-blue-50">
              <RotateCcw size={24} /> Qayta bo‘lish
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-6 flex flex-wrap gap-2">
          {students.map((s) => {
            const isHi = highlight === s;
            const isUsed = noRepeat && used.includes(s) && picked !== s;
            return (
              <span
                key={s}
                className={`rounded-2xl border-2 px-4 py-2 text-lg font-bold transition ${isHi ? 'scale-110 border-blue-600 bg-blue-600 text-white shadow-lg' : isUsed ? 'border-slate-100 bg-slate-50 text-slate-300 line-through' : 'border-blue-100 bg-white text-blue-950'}`}
              >
                {s}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}

function WheelPicker({ students, onPicked }) {
  const [removed, setRemoved] = useState([]);
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState(null);
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);

  const names = students.filter((s) => !removed.includes(s));
  const n = names.length;
  const seg = n > 0 ? 360 / n : 360;
  const size = 520;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 10;

  const pt = (deg, rad) => {
    const a = (deg * Math.PI) / 180;
    return [cx + rad * Math.sin(a), cy - rad * Math.cos(a)];
  };

  const spin = () => {
    if (spinning || n < 2) return;
    setWinner(null);
    setSpinning(true);
    const next = rotation + 360 * 6 + Math.random() * 360;
    setRotation(next);
    timer.current = setTimeout(() => {
      const pointerAngle = (360 - (next % 360)) % 360;
      const idx = Math.floor(pointerAngle / seg) % n;
      setWinner(names[idx]);
      setSpinning(false);
      onPicked && onPicked(names[idx]);
    }, 4600);
  };

  const fontSize = n > 24 ? 13 : n > 16 ? 15 : n > 10 ? 18 : 22;

  if (n < 2) {
    return (
      <div className="rounded-3xl border-2 border-dashed border-blue-200 p-10 text-center">
        <p className="text-xl text-slate-600">Doira uchun kamida 2 ta o‘quvchi kerak.</p>
        {removed.length > 0 && (
          <button onClick={() => setRemoved([])} className="mt-4 rounded-2xl bg-blue-600 px-6 py-3 text-lg font-bold text-white">Barchasini qaytarish</button>
        )}
      </div>
    );
  }

  return (
    <div className="grid items-center gap-6 lg:grid-cols-[1fr_320px]">
      <div className="relative mx-auto w-full max-w-[520px]">
        <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1">
          <svg width="44" height="50" viewBox="0 0 44 50" aria-hidden="true">
            <path d="M22 48 L4 8 Q22 -4 40 8 Z" fill="#1E3A8A" stroke="#fff" strokeWidth="3" />
          </svg>
        </div>
        <svg viewBox={`0 0 ${size} ${size}`} className="h-auto w-full drop-shadow-xl">
          <g
            style={{
              transform: `rotate(${rotation}deg)`,
              transformOrigin: `${cx}px ${cy}px`,
              transition: spinning ? 'transform 4.5s cubic-bezier(0.17, 0.67, 0.12, 1)' : 'none',
            }}
          >
            {names.map((name, i) => {
              const a0 = i * seg;
              const a1 = (i + 1) * seg;
              const [x0, y0] = pt(a0, r);
              const [x1, y1] = pt(a1, r);
              const large = seg > 180 ? 1 : 0;
              const mid = a0 + seg / 2;
              const label = name.length > 14 ? name.slice(0, 13) + '…' : name;
              const ty = cy - r + 18;
              const flip = mid > 180; // chap yarimda matn teskari bo‘lmasligi uchun
              return (
                <g key={name}>
                  <path
                    d={`M${cx},${cy} L${x0},${y0} A${r},${r} 0 ${large} 1 ${x1},${y1} Z`}
                    fill={WHEEL_COLORS[i % WHEEL_COLORS.length]}
                    stroke="#fff"
                    strokeWidth="2"
                  />
                  <g transform={`rotate(${mid} ${cx} ${cy})`}>
                    <text
                      x={cx}
                      y={ty}
                      transform={`rotate(${flip ? 90 : -90} ${cx} ${ty})`}
                      textAnchor={flip ? 'start' : 'end'}
                      dominantBaseline="middle"
                      fill="#fff"
                      fontSize={fontSize}
                      fontWeight="700"
                    >
                      {label}
                    </text>
                  </g>
                </g>
              );
            })}
          </g>
          <circle cx={cx} cy={cy} r="44" fill="#fff" stroke="#1E3A8A" strokeWidth="6" />
          <path d={`M${cx - 10},${cy - 16} L${cx + 16},${cy} L${cx - 10},${cy + 16} Z`} fill="#2563EB" />
        </svg>
      </div>
      <div className="space-y-4">
        <PrimaryButton onClick={spin} disabled={spinning} icon={Disc3} className="w-full">
          {spinning ? 'Aylanmoqda...' : 'Aylantirish'}
        </PrimaryButton>
        {winner && (
          <div className="dp-pop rounded-3xl bg-blue-600 p-6 text-center text-white">
            <div className="text-lg font-semibold text-blue-100">Tanlandi</div>
            <div className="text-3xl md:text-4xl font-extrabold">{winner}</div>
            <button
              onClick={() => { setRemoved((x) => [...x, winner]); setWinner(null); }}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white/20 px-4 py-2 text-lg font-bold hover:bg-white/30"
            >
              <Trash2 size={20} /> Doiradan olib tashlash
            </button>
          </div>
        )}
        <div className="rounded-2xl bg-blue-50 p-4 text-lg text-blue-900">
          Doirada: <b>{n}</b> ta o‘quvchi
          {removed.length > 0 && (
            <button onClick={() => setRemoved([])} className="ml-2 font-bold text-blue-700 underline">qaytarish ({removed.length})</button>
          )}
        </div>
      </div>
    </div>
  );
}

function PickerModal({ initialTab, students, teamCount, onGroups, onClose, onContinue, context }) {
  const [tab, setTab] = useState(initialTab || 'list');
  const [picked, setPicked] = useState(null);
  const continueLabel = context === 'play' ? 'O‘yinga qaytish' : 'O‘yinni boshlash';
  return (
    <Modal onClose={onClose} wide>
      <h2 className="pr-12 text-3xl font-extrabold text-blue-950">O‘quvchi tanlash</h2>
      <div className="mt-5 mb-6 flex flex-wrap gap-2">
        {PICKERS.map((p) => {
          const I = p.icon;
          const on = tab === p.id;
          return (
            <button
              key={p.id}
              disabled={p.disabled}
              onClick={() => setTab(p.id)}
              className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-lg font-bold transition disabled:cursor-not-allowed disabled:opacity-50 ${on ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'border-2 border-blue-100 text-blue-900 hover:bg-blue-50'}`}
            >
              <I size={22} /> {p.name}
              {p.disabled && <span className="text-xs font-semibold">(tez orada)</span>}
            </button>
          );
        })}
      </div>
      {tab === 'camera' && <CameraPicker students={students} onPicked={setPicked} />}
      {tab === 'list' && <ListPicker students={students} teamCount={teamCount} onGroups={onGroups} onPicked={setPicked} />}
      {tab === 'wheel' && <WheelPicker students={students} onPicked={setPicked} />}

      {/* Pastki panel: tanlangandan keyin to‘g‘ridan-to‘g‘ri o‘yinga o‘tish */}
      <div className="sticky bottom-0 -mx-6 -mb-6 mt-8 flex flex-wrap items-center gap-4 border-t-2 border-blue-100 bg-white/95 px-6 py-4 backdrop-blur md:-mx-8 md:-mb-8 md:px-8">
        <div className="min-w-0 flex-1 text-xl text-slate-600">
          {picked ? (
            <span>Javob beradi: <b className="text-2xl text-blue-900">{picked}</b></span>
          ) : (
            <span>O‘quvchini tanlang yoki to‘g‘ridan-to‘g‘ri davom eting</span>
          )}
        </div>
        <PrimaryButton onClick={() => onContinue(picked)} icon={Play}>{continueLabel}</PrimaryButton>
      </div>
    </Modal>
  );
}

function PickerSetupScreen({ game, topic, classInfo, students, onSaveStudents, teamCount, setTeamCount, groups, onOpenPicker, onStart, onBack }) {
  const [showRoster, setShowRoster] = useState(false);
  const [draft, setDraft] = useState(students.join('\n'));
  const [saved, setSaved] = useState(false);
  useEffect(() => { setDraft(students.join('\n')); }, [students]);
  const modes = [
    { n: 1, label: 'Yakka', icon: User },
    { n: 2, label: '2 jamoa', icon: Users },
    { n: 3, label: '3 jamoa', icon: Users },
    { n: 4, label: '4 jamoa', icon: Users },
  ];
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
      <PageTitle title="O‘quvchilar va jamoalar" subtitle={`${game?.name} • ${topic?.title}`} onBack={onBack} />

      <section className="rounded-3xl border-2 border-blue-100 bg-white p-6">
        <h2 className="text-2xl font-extrabold text-blue-950">O‘yin rejimi</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          {modes.map(({ n, label, icon: I }) => (
            <button
              key={n}
              onClick={() => setTeamCount(n)}
              className={`flex items-center justify-center gap-3 rounded-2xl border-2 px-4 py-5 text-2xl font-extrabold transition active:scale-95 ${teamCount === n ? 'border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'border-blue-100 text-blue-950 hover:border-blue-400'}`}
            >
              <I size={28} /> {label}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="mb-4 text-2xl font-extrabold text-blue-950">O‘quvchi tanlash usuli</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {PICKERS.map((p, i) => {
            const I = p.icon;
            return (
              <button
                key={p.id}
                disabled={p.disabled}
                onClick={() => onOpenPicker(p.id)}
                className="relative flex flex-col items-center gap-3 rounded-3xl border-2 border-blue-100 bg-white p-6 text-center transition enabled:hover:-translate-y-1 enabled:hover:border-blue-500 enabled:hover:shadow-xl enabled:active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="absolute left-4 top-3 text-2xl font-extrabold text-blue-100">{i + 1}</span>
                <div className={`flex h-20 w-20 items-center justify-center rounded-3xl ${p.disabled ? 'bg-slate-300' : 'bg-blue-900'} text-white`}>
                  <I size={40} />
                </div>
                <div className="text-2xl font-extrabold text-blue-950">{p.name}</div>
                <div className="text-base text-slate-500">{p.desc}</div>
                {p.disabled && <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-slate-500">Tez orada</span>}
              </button>
            );
          })}
        </div>
      </section>

      <section className="mt-6 rounded-3xl border-2 border-blue-100 bg-white p-6">
        <button onClick={() => setShowRoster((v) => !v)} className="flex w-full items-center justify-between gap-3 text-left">
          <span className="text-2xl font-extrabold text-blue-950">
            <span className="mr-2 rounded-xl bg-blue-600 px-3 py-1 text-white">{classInfo}</span> sinf ro‘yxati ({students.length} nafar)
          </span>
          <span className="rounded-xl bg-blue-50 px-4 py-2 text-lg font-bold text-blue-700">{showRoster ? 'Yopish' : 'Ko‘rish / tahrirlash'}</span>
        </button>
        {showRoster && (
          <div className="mt-4">
            <p className="mb-2 text-base text-slate-500">Har qatorda bitta o‘quvchi. O‘zgarishlar shu sinfga dars beradigan barcha o‘qituvchilarda ko‘rinadi.</p>
            <textarea
              value={draft}
              onChange={(e) => { setDraft(e.target.value); setSaved(false); }}
              rows={10}
              className="w-full rounded-2xl border-2 border-slate-200 p-4 text-lg outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
            <button
              onClick={() => { const list = parseStudents(draft); if (list.length >= 2) { onSaveStudents(list); setSaved(true); } }}
              disabled={parseStudents(draft).length < 2}
              className="mt-3 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-lg font-bold text-white hover:bg-blue-700 disabled:bg-slate-300"
            >
              {saved ? <CheckCircle2 size={22} /> : <Save size={22} />} {saved ? 'Saqlandi' : 'Ro‘yxatni saqlash'}
            </button>
          </div>
        )}
        {groups && groups.length === teamCount && teamCount > 1 && (
          <div className="mt-4 flex flex-wrap gap-3">
            {groups.map((g, i) => (
              <span key={i} className={`rounded-xl ${TEAM_STYLES[i].light} ${TEAM_STYLES[i].text} px-4 py-2 text-lg font-bold`}>
                {i + 1}-jamoa: {g.length} nafar
              </span>
            ))}
          </div>
        )}
      </section>

      <div className="mt-8 flex justify-end">
        <PrimaryButton onClick={onStart} icon={Play}>O‘yinni boshlash</PrimaryButton>
      </div>
    </div>
  );
}

/* ============================================================
   7. O‘YINLAR
   ============================================================ */

function FeedbackBadge({ ok, text }) {
  useEffect(() => { playSound(ok ? 'correct' : 'wrong'); }, [ok]);
  return (
    <div className={`dp-pop inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-xl font-extrabold ${ok ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
      {ok ? <CheckCircle2 size={26} /> : <X size={26} />} {text}
    </div>
  );
}

/* 1) Moslashtirish */
function MatchGame({ topic, award, nextTurn, onFinish }) {
  const left = useMemo(() => shuffle(topic.pairs.map((p, i) => ({ id: i, text: p[0] }))), [topic]);
  const right = useMemo(() => shuffle(topic.pairs.map((p, i) => ({ id: i, text: p[1] }))), [topic]);
  const [sel, setSel] = useState(null);
  const [matched, setMatched] = useState([]);
  const [wrong, setWrong] = useState(null);
  const [fb, setFb] = useState(null);
  const t = useRef(null);
  useEffect(() => () => clearTimeout(t.current), []);

  const chooseRight = (id) => {
    if (sel === null || matched.includes(id) || wrong) return;
    if (id === sel) {
      const nm = [...matched, id];
      setMatched(nm);
      setSel(null);
      award(10);
      setFb({ ok: true, text: 'To‘g‘ri! +10' });
      nextTurn();
      if (nm.length === topic.pairs.length) t.current = setTimeout(onFinish, 900);
    } else {
      setWrong({ l: sel, r: id });
      setFb({ ok: false, text: 'Noto‘g‘ri' });
      t.current = setTimeout(() => { setWrong(null); setSel(null); nextTurn(); }, 900);
    }
  };

  const cardBase = 'w-full rounded-2xl border-2 px-5 py-4 text-left text-xl md:text-2xl font-bold transition active:scale-[0.98]';
  return (
    <div>
      <div className="mb-4 flex min-h-[56px] items-center justify-center">
        {fb ? <FeedbackBadge {...fb} key={matched.length + (wrong ? 'w' : '')} /> : <p className="text-xl text-slate-500">Chapdan atamani, so‘ng o‘ngdan mos ta’rifni tanlang</p>}
      </div>
      <div className="grid grid-cols-2 gap-4 md:gap-8">
        <div className="space-y-3">
          {left.map((c) => {
            const done = matched.includes(c.id);
            const isSel = sel === c.id;
            const isWrong = wrong?.l === c.id;
            return (
              <button
                key={c.id}
                disabled={done}
                onClick={() => !wrong && setSel(c.id)}
                className={`${cardBase} ${done ? 'border-emerald-300 bg-emerald-50 text-emerald-700 opacity-70' : isWrong ? 'dp-shake border-rose-400 bg-rose-50 text-rose-700' : isSel ? 'border-blue-600 bg-blue-600 text-white shadow-lg' : 'border-blue-100 bg-white text-blue-950 hover:border-blue-400'}`}
              >
                {done && <Check className="mr-2 inline" size={24} />}{c.text}
              </button>
            );
          })}
        </div>
        <div className="space-y-3">
          {right.map((c) => {
            const done = matched.includes(c.id);
            const isWrong = wrong?.r === c.id;
            return (
              <button
                key={c.id}
                disabled={done}
                onClick={() => chooseRight(c.id)}
                className={`${cardBase} ${done ? 'border-emerald-300 bg-emerald-50 text-emerald-700 opacity-70' : isWrong ? 'dp-shake border-rose-400 bg-rose-50 text-rose-700' : sel !== null ? 'border-blue-200 bg-blue-50 text-blue-950 hover:border-blue-500' : 'border-slate-200 bg-white text-slate-700'}`}
              >
                {c.text}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* 2) Xotira */
function MemoryGame({ topic, award, nextTurn, onFinish }) {
  const cards = useMemo(
    () =>
      shuffle(
        topic.pairs.flatMap((p, i) => [
          { key: `${i}a`, pair: i, text: p[0], kind: 'term' },
          { key: `${i}b`, pair: i, text: p[1], kind: 'def' },
        ])
      ),
    [topic]
  );
  const [open, setOpen] = useState([]);
  const [matched, setMatched] = useState([]);
  const [lock, setLock] = useState(false);
  const t = useRef(null);
  useEffect(() => () => clearTimeout(t.current), []);

  const flip = (idx) => {
    if (lock || open.includes(idx) || matched.includes(cards[idx].pair)) return;
    const next = [...open, idx];
    setOpen(next);
    if (next.length === 2) {
      setLock(true);
      const [a, b] = next;
      const ok = cards[a].pair === cards[b].pair;
      t.current = setTimeout(() => {
        if (ok) {
          const nm = [...matched, cards[a].pair];
          setMatched(nm);
          award(10);
          if (nm.length === topic.pairs.length) onFinish();
        } else {
          nextTurn();
        }
        setOpen([]);
        setLock(false);
      }, ok ? 700 : 1300);
    }
  };

  return (
    <div>
      <p className="mb-4 text-center text-xl text-slate-500">Ikkita kartani oching: atama va uning ta’rifi. Topsangiz — navbat sizda qoladi!</p>
      <div className="grid grid-cols-3 gap-3 md:grid-cols-4 md:gap-4">
        {cards.map((c, idx) => {
          const isOpen = open.includes(idx) || matched.includes(c.pair);
          const isDone = matched.includes(c.pair);
          return (
            <button
              key={c.key}
              onClick={() => flip(idx)}
              className={`flex aspect-[4/3] md:aspect-[2/1] items-center justify-center rounded-2xl border-2 p-3 text-center text-lg md:text-2xl font-extrabold transition active:scale-95 ${isDone ? 'border-emerald-300 bg-emerald-50 text-emerald-700' : isOpen ? (c.kind === 'term' ? 'border-blue-600 bg-blue-600 text-white' : 'border-blue-300 bg-white text-blue-950') : 'border-blue-900 bg-blue-900 text-white hover:bg-blue-800'}`}
            >
              {isOpen ? c.text : <span className="text-5xl text-blue-300">?</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* 3) Test */
function QuizGame({ topic, award, nextTurn, onFinish }) {
  const questions = useMemo(
    () => shuffle(topic.quiz).map((q) => ({ ...q, opts: shuffle(q.options.map((o, i) => ({ text: o, correct: i === q.answer }))) })),
    [topic]
  );
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null);
  const q = questions[idx];
  const letters = ['A', 'B', 'C', 'D'];
  const colors = ['bg-blue-600', 'bg-rose-500', 'bg-emerald-500', 'bg-amber-500'];

  const choose = (i) => {
    if (picked !== null) return;
    setPicked(i);
    if (q.opts[i].correct) award(10);
  };
  const next = () => {
    nextTurn();
    if (idx + 1 >= questions.length) onFinish();
    else { setIdx(idx + 1); setPicked(null); }
  };

  return (
    <div>
      <div className="mb-3 text-center text-xl font-bold text-blue-600">Savol {idx + 1} / {questions.length}</div>
      <h2 key={idx} className="dp-pop mb-6 rounded-3xl bg-blue-50 p-6 text-center text-3xl md:text-4xl font-extrabold text-blue-950">{q.q}</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {q.opts.map((o, i) => {
          const reveal = picked !== null;
          const state = !reveal ? '' : o.correct ? 'ring-8 ring-emerald-300' : picked === i ? 'opacity-50 ring-8 ring-rose-300' : 'opacity-40';
          return (
            <button
              key={i}
              onClick={() => choose(i)}
              className={`flex items-center gap-4 rounded-3xl ${colors[i]} px-6 py-6 text-left text-2xl md:text-3xl font-extrabold text-white shadow-lg transition active:scale-[0.98] ${state}`}
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/25 text-2xl">{letters[i]}</span>
              <span className="flex-1">{o.text}</span>
              {reveal && o.correct && <CheckCircle2 size={36} />}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <FeedbackBadge ok={q.opts[picked].correct} text={q.opts[picked].correct ? 'To‘g‘ri! +10' : 'Noto‘g‘ri'} />
          <PrimaryButton onClick={next} icon={ArrowRight}>{idx + 1 >= questions.length ? 'Natijalar' : 'Keyingi savol'}</PrimaryButton>
        </div>
      )}
    </div>
  );
}

/* 4) Joyda */
function SortGame({ topic, award, nextTurn, onFinish }) {
  const items = useMemo(() => shuffle(topic.sort.items), [topic]);
  const cats = topic.sort.categories;
  const [idx, setIdx] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [placed, setPlaced] = useState(cats.map(() => []));
  const item = items[idx];
  const catColors = ['bg-blue-600', 'bg-emerald-500', 'bg-amber-500'];

  const choose = (c) => {
    if (answer !== null) return;
    setAnswer(c);
    if (c === item.cat) award(10);
    setPlaced((p) => p.map((arr, i) => (i === item.cat ? [...arr, { text: item.text, ok: c === item.cat }] : arr)));
  };
  const next = () => {
    nextTurn();
    if (idx + 1 >= items.length) onFinish();
    else { setIdx(idx + 1); setAnswer(null); }
  };

  return (
    <div>
      <div className="mb-3 text-center text-xl font-bold text-blue-600">{idx + 1} / {items.length}</div>
      <div key={idx} className="dp-pop mx-auto mb-6 max-w-3xl rounded-3xl border-4 border-dashed border-blue-300 bg-white p-8 text-center text-3xl md:text-5xl font-extrabold text-blue-950">
        {item.text}
      </div>
      <div className={`grid gap-4 ${cats.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
        {cats.map((c, i) => {
          const isRight = answer !== null && i === item.cat;
          const isWrong = answer === i && i !== item.cat;
          return (
            <div key={c} className="flex flex-col gap-3">
              <button
                onClick={() => choose(i)}
                className={`rounded-3xl ${catColors[i]} px-6 py-6 text-2xl md:text-3xl font-extrabold text-white shadow-lg transition active:scale-95 ${isRight ? 'ring-8 ring-emerald-300' : ''} ${isWrong ? 'dp-shake ring-8 ring-rose-300' : ''}`}
              >
                {c}
              </button>
              <div className="min-h-[90px] rounded-2xl border-2 border-blue-100 bg-white p-3">
                <div className="flex flex-wrap gap-2">
                  {placed[i].map((p, k) => (
                    <span key={k} className={`rounded-xl px-3 py-1 text-base font-bold ${p.ok ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>{p.text}</span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {answer !== null && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <FeedbackBadge ok={answer === item.cat} text={answer === item.cat ? 'To‘g‘ri joy! +10' : `To‘g‘ri javob: ${cats[item.cat]}`} />
          <PrimaryButton onClick={next} icon={ArrowRight}>{idx + 1 >= items.length ? 'Natijalar' : 'Keyingisi'}</PrimaryButton>
        </div>
      )}
    </div>
  );
}

/* 5) Savol - javob */
function QAGame({ topic, award, nextTurn, onFinish, teamName }) {
  const cards = useMemo(() => shuffle(topic.qa), [topic]);
  const LIMIT = 30;
  const [idx, setIdx] = useState(0);
  const [show, setShow] = useState(false);
  const [time, setTime] = useState(LIMIT);
  const [running, setRunning] = useState(true);
  const card = cards[idx];

  useEffect(() => {
    if (!running || show) return;
    if (time <= 0) { setShow(true); return; }
    const id = setTimeout(() => setTime((x) => x - 1), 1000);
    return () => clearTimeout(id);
  }, [time, running, show]);

  const judge = (ok) => {
    if (ok) award(10);
    nextTurn();
    if (idx + 1 >= cards.length) onFinish();
    else { setIdx(idx + 1); setShow(false); setTime(LIMIT); setRunning(true); }
  };

  const pct = (time / LIMIT) * 100;
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xl font-bold text-blue-600">Savol {idx + 1} / {cards.length}</span>
        <button onClick={() => setRunning((r) => !r)} className={`inline-flex items-center gap-2 rounded-2xl px-5 py-2 text-2xl font-extrabold ${time <= 10 ? 'bg-rose-100 text-rose-700' : 'bg-blue-100 text-blue-800'}`}>
          <Timer size={28} /> {time} s {!running && '(pauza)'}
        </button>
      </div>
      <div className="mb-6 h-3 overflow-hidden rounded-full bg-blue-100">
        <div className={`h-full transition-all duration-1000 ${time <= 10 ? 'bg-rose-500' : 'bg-blue-600'}`} style={{ width: `${pct}%` }} />
      </div>
      <div key={idx} className="dp-pop rounded-[2rem] bg-blue-900 p-8 md:p-12 text-center text-white shadow-xl">
        <div className="text-lg font-semibold text-blue-200">Javob beradi: {teamName}</div>
        <h2 className="mt-3 text-3xl md:text-5xl font-extrabold leading-tight">{card.q}</h2>
      </div>
      {show ? (
        <div className="dp-pop mt-6 rounded-3xl border-2 border-emerald-300 bg-emerald-50 p-6 text-center">
          <div className="text-lg font-bold text-emerald-700">To‘g‘ri javob</div>
          <div className="mt-1 text-2xl md:text-3xl font-extrabold text-emerald-900">{card.a}</div>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <button onClick={() => judge(true)} className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-8 py-4 text-2xl font-extrabold text-white shadow-lg active:scale-95">
              <Check size={30} /> To‘g‘ri (+10)
            </button>
            <button onClick={() => judge(false)} className="inline-flex items-center gap-2 rounded-2xl bg-rose-500 px-8 py-4 text-2xl font-extrabold text-white shadow-lg active:scale-95">
              <X size={30} /> Noto‘g‘ri
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-6 text-center">
          <PrimaryButton onClick={() => setShow(true)} icon={Eye}>Javobni ko‘rsatish</PrimaryButton>
        </div>
      )}
    </div>
  );
}

/* 6) Portlash — raqamli qutilar (Baamboozle uslubida) */
const BOOM_SPECIALS = {
  bomb: { title: 'BOMBA!', desc: 'Jamoa 20 ball yo‘qotadi', icon: Bomb, bg: 'bg-rose-500' },
  gift: { title: 'Sovg‘a!', desc: 'Jamoaga 20 ball sovg‘a qilinadi', icon: Gift, bg: 'bg-emerald-500' },
  swap: { title: 'Almashtirish!', desc: 'Ballar yetakchi jamoa bilan almashadi', icon: Repeat, bg: 'bg-violet-600' },
};

function buildBoomTiles(topic) {
  const questions = shuffle([
    ...(topic.quiz || []).map((x) => ({ q: x.q, options: x.options, answer: x.answer })),
    ...(topic.qa || []).map((x) => ({ q: x.q, a: x.a })),
  ]);
  // Bir xil savol takrorlanmasin (umumiy mavzuda quiz va qa bir xil savollardan iborat)
  const seen = new Set();
  const unique = questions.filter((x) => (seen.has(x.q) ? false : (seen.add(x.q), true))).slice(0, 15);
  const points = [10, 15, 20, 25];
  const items = unique.map((q) => ({ type: 'q', q, points: points[Math.floor(Math.random() * points.length)], double: false }));
  if (items.length) {
    const d = items[Math.floor(Math.random() * items.length)];
    d.double = true;
    d.points *= 2;
  }
  const specials = ['bomb', 'gift', 'swap'];
  if (items.length >= 12) specials.push('bomb');
  return shuffle([...items, ...specials.map((type) => ({ type }))]).map((t, i) => ({
    ...t,
    n: i + 1,
    opened: false,
    owner: null, // jamoa indeksi (to‘g‘ri javob) | -1 (noto‘g‘ri) | 'special'
    opts: t.type === 'q' && t.q.options ? shuffle(t.q.options.map((o, k) => ({ text: o, correct: k === t.q.answer }))) : null,
  }));
}

function BoomGame({ topic, award, nextTurn, onFinish, teams, turn, updateTeams }) {
  const [tiles, setTiles] = useState(() => buildBoomTiles(topic));
  const [active, setActive] = useState(null); // ochilgan quti indeksi
  const [picked, setPicked] = useState(null); // tanlangan variant indeksi
  const [revealed, setRevealed] = useState(false); // ochiq savolda javob ko‘rsatildi
  const [result, setResult] = useState(null); // 'ok' | 'bad' | 'special'
  const [specialText, setSpecialText] = useState('');
  const [time, setTime] = useState(20);
  const tile = active !== null ? tiles[active] : null;
  const teamName = teams[turn]?.name || '';

  // Savol taymeri
  useEffect(() => {
    if (!tile || tile.type !== 'q' || result) return;
    if (time <= 0) { setRevealed(true); return; }
    const id = setTimeout(() => setTime((x) => x - 1), 1000);
    return () => clearTimeout(id);
  }, [tile, time, result]);

  const applySpecial = (type) => {
    playSound(type === 'bomb' ? 'boom' : type === 'gift' ? 'gift' : 'flip');
    if (type === 'bomb') {
      updateTeams((ts) => ts.map((t, i) => (i === turn ? { ...t, score: Math.max(0, t.score - 20) } : t)));
      setSpecialText(`${teamName} 20 ball yo‘qotdi`);
    } else if (type === 'gift') {
      award(20);
      setSpecialText(`${teamName} +20 ball oldi`);
    } else if (type === 'swap') {
      if (teams.length < 2) {
        award(10);
        setSpecialText('Yakka o‘yinda almashtirish o‘rniga +10 ball');
      } else {
        let leader = -1;
        teams.forEach((t, i) => { if (i !== turn && (leader < 0 || t.score > teams[leader].score)) leader = i; });
        const mine = teams[turn].score;
        const theirs = teams[leader].score;
        updateTeams((ts) => ts.map((t, i) => (i === turn ? { ...t, score: theirs } : i === leader ? { ...t, score: mine } : t)));
        setSpecialText(`${teamName} va ${teams[leader].name} ballari almashdi (${mine} ↔ ${theirs})`);
      }
    }
  };

  const open = (idx) => {
    if (active !== null || tiles[idx].opened) return;
    setActive(idx);
    setPicked(null);
    setRevealed(false);
    setTime(20);
    if (tiles[idx].type === 'q') {
      setResult(null);
    } else {
      setResult('special');
      applySpecial(tiles[idx].type);
    }
  };

  const chooseOption = (i) => {
    if (picked !== null || !tile?.opts) return;
    setPicked(i);
    const ok = tile.opts[i].correct;
    if (ok) award(tile.points);
    setResult(ok ? 'ok' : 'bad');
  };

  const judgeOpen = (ok) => {
    if (ok) award(tile.points);
    setResult(ok ? 'ok' : 'bad');
  };

  const close = () => {
    const owner = result === 'special' ? 'special' : result === 'ok' ? turn : -1;
    const next = tiles.map((t, i) => (i === active ? { ...t, opened: true, owner } : t));
    setTiles(next);
    setActive(null);
    setResult(null);
    nextTurn();
    if (next.every((t) => t.opened)) onFinish();
  };

  const left = tiles.filter((t) => !t.opened).length;
  const cols = tiles.length > 12 ? 'grid-cols-4 md:grid-cols-6' : 'grid-cols-3 md:grid-cols-4';

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xl text-slate-500">
          <b className="text-blue-900">{teamName}</b>, qutini tanlang! Ichida savol, bomba yoki sovg‘a bo‘lishi mumkin.
        </p>
        <span className="rounded-2xl bg-blue-50 px-4 py-2 text-lg font-bold text-blue-800">Qoldi: {left} ta</span>
      </div>

      <div className={`grid ${cols} gap-3 md:gap-4`}>
        {tiles.map((t, i) => {
          if (!t.opened) {
            return (
              <button
                key={t.n}
                onClick={() => open(i)}
                className="flex aspect-square md:aspect-[4/3] items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 to-blue-800 text-5xl md:text-6xl font-extrabold text-white shadow-lg shadow-blue-900/20 transition hover:-translate-y-1 hover:from-blue-400 active:scale-95"
              >
                {t.n}
              </button>
            );
          }
          if (t.owner === 'special') {
            const sp = BOOM_SPECIALS[t.type];
            const SI = sp.icon;
            return (
              <div key={t.n} className={`flex aspect-square md:aspect-[4/3] flex-col items-center justify-center gap-1 rounded-3xl ${sp.bg} text-white opacity-60`}>
                <SI size={40} />
                <span className="text-sm font-bold">{sp.title}</span>
              </div>
            );
          }
          const st = typeof t.owner === 'number' && t.owner >= 0 ? TEAM_STYLES[t.owner] : null;
          return (
            <div
              key={t.n}
              className={`flex aspect-square md:aspect-[4/3] flex-col items-center justify-center rounded-3xl border-2 ${st ? `${st.border} ${st.light} ${st.text}` : 'border-slate-200 bg-slate-100 text-slate-400'}`}
            >
              {st ? <Check size={40} /> : <X size={40} />}
              <span className="mt-1 text-base font-extrabold">{st ? `+${t.points}` : '0'}</span>
            </div>
          );
        })}
      </div>

      {/* Ochilgan quti */}
      {tile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-950/60 p-4 backdrop-blur-sm">
          <div className="dp-pop max-h-[94vh] w-full max-w-5xl overflow-y-auto rounded-[2rem] bg-white p-6 md:p-10 shadow-2xl">
            {tile.type !== 'q' ? (
              (() => {
                const sp = BOOM_SPECIALS[tile.type];
                const SI = sp.icon;
                return (
                  <div className="text-center">
                    <div className={`dp-boom mx-auto flex h-40 w-40 items-center justify-center rounded-full ${sp.bg} text-white shadow-2xl`}>
                      <SI size={90} />
                    </div>
                    <h2 className="mt-6 text-5xl md:text-7xl font-extrabold text-blue-950">{sp.title}</h2>
                    <p className="mt-3 text-2xl text-slate-600">{sp.desc}</p>
                    <p className="mt-4 text-2xl font-extrabold text-blue-700">{specialText}</p>
                    <PrimaryButton onClick={close} icon={ArrowRight} className="mt-8">Davom etish</PrimaryButton>
                  </div>
                );
              })()
            ) : (
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="rounded-2xl bg-blue-900 px-4 py-2 text-xl font-extrabold text-white">{tile.n}-quti</span>
                    <span className="rounded-2xl bg-amber-100 px-4 py-2 text-xl font-extrabold text-amber-700">{tile.points} ball</span>
                    {tile.double && (
                      <span className="inline-flex items-center gap-1 rounded-2xl bg-rose-500 px-4 py-2 text-xl font-extrabold text-white">
                        <Zap size={22} /> Ikki baravar!
                      </span>
                    )}
                  </div>
                  {!result && (
                    <span className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-2xl font-extrabold ${time <= 5 ? 'bg-rose-100 text-rose-700' : 'bg-blue-100 text-blue-800'}`}>
                      <Timer size={26} /> {time} s
                    </span>
                  )}
                </div>
                <p className="mt-6 text-lg font-semibold text-slate-500">Javob beradi: {teamName}</p>
                <h2 className="mt-1 text-3xl md:text-5xl font-extrabold leading-tight text-blue-950">{tile.q.q}</h2>

                {tile.opts ? (
                  <div className="mt-8 grid gap-4 md:grid-cols-2">
                    {tile.opts.map((o, i) => {
                      const colors = ['bg-blue-600', 'bg-rose-500', 'bg-emerald-500', 'bg-amber-500'];
                      const done = picked !== null || (revealed && result === null);
                      const state = !done ? '' : o.correct ? 'ring-8 ring-emerald-300' : picked === i ? 'opacity-50 ring-8 ring-rose-300' : 'opacity-40';
                      return (
                        <button
                          key={i}
                          onClick={() => chooseOption(i)}
                          disabled={picked !== null}
                          className={`flex items-center gap-4 rounded-3xl ${colors[i]} px-6 py-5 text-left text-2xl md:text-3xl font-extrabold text-white shadow-lg transition active:scale-[0.98] ${state}`}
                        >
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/25">{'ABCD'[i]}</span>
                          <span className="flex-1">{o.text}</span>
                          {done && o.correct && <CheckCircle2 size={34} />}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="mt-8">
                    {revealed || result ? (
                      <div className="rounded-3xl border-2 border-emerald-300 bg-emerald-50 p-6 text-center">
                        <div className="text-lg font-bold text-emerald-700">To‘g‘ri javob</div>
                        <div className="mt-1 text-2xl md:text-3xl font-extrabold text-emerald-900">{tile.q.a}</div>
                        {!result && (
                          <div className="mt-6 flex flex-wrap justify-center gap-4">
                            <button onClick={() => judgeOpen(true)} className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-8 py-4 text-2xl font-extrabold text-white shadow-lg active:scale-95">
                              <Check size={30} /> To‘g‘ri (+{tile.points})
                            </button>
                            <button onClick={() => judgeOpen(false)} className="inline-flex items-center gap-2 rounded-2xl bg-rose-500 px-8 py-4 text-2xl font-extrabold text-white shadow-lg active:scale-95">
                              <X size={30} /> Noto‘g‘ri
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center">
                        <PrimaryButton onClick={() => setRevealed(true)} icon={Eye}>Javobni ko‘rsatish</PrimaryButton>
                      </div>
                    )}
                  </div>
                )}

                {/* Variantli savolda vaqt tugasa */}
                {tile.opts && revealed && result === null && (
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                    <FeedbackBadge ok={false} text="Vaqt tugadi" />
                    <PrimaryButton onClick={close} icon={ArrowRight}>Davom etish</PrimaryButton>
                  </div>
                )}

                {result && (
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                    <FeedbackBadge ok={result === 'ok'} text={result === 'ok' ? `To‘g‘ri! +${tile.points}` : 'Ball berilmadi'} />
                    <PrimaryButton onClick={close} icon={ArrowRight}>Davom etish</PrimaryButton>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   8. O‘YIN EKRANI, HISOB VA NATIJA
   ============================================================ */

/* ---------- Yangi o‘yinlar uchun yordamchilar ---------- */

const APOS_RE = /[‘’'ʻʼ`]/;

/** So‘zni o‘zbek harflariga ajratadi: o‘, g‘, sh, ch — bitta harf. */
function splitLetters(word) {
  const out = [];
  for (let i = 0; i < word.length; i++) {
    const c = word[i];
    const n = word[i + 1];
    const lc = c.toLowerCase();
    if ((lc === 'o' || lc === 'g') && n && APOS_RE.test(n)) { out.push(c + '‘'); i++; continue; }
    if ((lc === 's' || lc === 'c') && n && n.toLowerCase() === 'h') { out.push(c + n); i++; continue; }
    out.push(c);
  }
  return out;
}

const isLetterTok = (t) => /\p{L}/u.test(t);

/** Mavzudan so‘z topish o‘yinlari uchun «so‘z + izoh» kartalari. */
function wordCards(topic) {
  const seen = new Set();
  const out = [];
  const add = (word, hint) => {
    if (!word || !hint) return;
    const w = String(word).replace(/\(.*?\)/g, '').replace(/[.,!?«»"“”:;]/g, '').trim().replace(/^-+|-+$/g, '').trim().toLowerCase();
    if (!w || /\d/.test(w)) return;
    if (!/^[\p{L}‘’'ʻʼ`\- ]+$/u.test(w)) return;
    if (w.split(/\s+/).length > 2) return;
    const letters = splitLetters(w).filter(isLetterTok);
    if (letters.length < 3 || letters.length > 12) return;
    if (seen.has(w)) return;
    seen.add(w);
    out.push({ word: w, hint: String(hint) });
  };
  (topic.pairs || []).forEach(([a, b]) => { add(a, b); add(b, a); });
  (topic.quiz || []).forEach((q) => add(q.options[q.answer], q.q));
  (topic.qa || []).forEach((x) => add(x.a, x.q));
  return out;
}

/** «Rostmi?» o‘yini uchun to‘g‘ri/noto‘g‘ri tasdiqlar. */
function tfCards(topic) {
  const out = [];
  const pairs = topic.pairs || [];
  pairs.forEach((p, i) => {
    const others = pairs.filter((_, j) => j !== i);
    if (others.length && Math.random() < 0.5) {
      const o = others[Math.floor(Math.random() * others.length)];
      out.push({ a: p[0], b: o[1], ok: false, right: p[1] });
    } else {
      out.push({ a: p[0], b: p[1], ok: true, right: p[1] });
    }
  });
  (topic.quiz || []).forEach((q) => {
    const right = q.options[q.answer];
    if (Math.random() < 0.5) out.push({ q: q.q, b: right, ok: true, right });
    else {
      const wrong = q.options.filter((_, k) => k !== q.answer);
      out.push({ q: q.q, b: wrong[Math.floor(Math.random() * wrong.length)], ok: false, right });
    }
  });
  return shuffle(out).slice(0, 12);
}

function prepQuiz(topic) {
  return shuffle(topic.quiz || []).map((q) => ({
    ...q,
    opts: shuffle(q.options.map((o, i) => ({ text: o, correct: i === q.answer }))),
  }));
}

/** Kichik taymer hook: `running` bo‘lsa har soniyada kamayadi. */
function useCountdown(limit, running, resetKey, onEnd) {
  const [time, setTime] = useState(limit);
  const endRef = useRef(onEnd);
  endRef.current = onEnd;
  useEffect(() => { setTime(limit); }, [resetKey, limit]);
  useEffect(() => {
    if (!running) return;
    if (time <= 0) { endRef.current?.(); return; }
    const id = setTimeout(() => setTime((x) => x - 1), 1000);
    return () => clearTimeout(id);
  }, [time, running]);
  return time;
}

function TimerPill({ time, limit }) {
  const low = time <= Math.max(3, Math.round(limit / 3));
  useEffect(() => { if (time > 0 && time <= 3) playSound('tick'); }, [time]);
  return (
    <div className={`inline-flex items-center gap-2 rounded-2xl px-5 py-2 text-2xl font-extrabold ${low ? 'bg-rose-100 text-rose-700' : 'bg-blue-100 text-blue-800'}`}>
      <Timer size={28} /> {time} s
    </div>
  );
}

/* 7) Rostmi? — tez to‘g‘ri/noto‘g‘ri */
function TrueFalseGame({ topic, award, nextTurn, onFinish, teamName }) {
  const cards = useMemo(() => tfCards(topic), [topic]);
  const LIMIT = 10;
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null); // true | false | 'time'
  const [streak, setStreak] = useState(0);
  const card = cards[idx];
  const time = useCountdown(LIMIT, picked === null, idx, () => { setPicked('time'); setStreak(0); });

  const answer = (v) => {
    if (picked !== null) return;
    setPicked(v);
    if (v === card.ok) {
      const bonus = time >= 7 ? 5 : 0;
      award(10 + bonus);
      setStreak((s) => s + 1);
    } else setStreak(0);
  };
  const next = () => {
    nextTurn();
    if (idx + 1 >= cards.length) onFinish();
    else { setIdx(idx + 1); setPicked(null); }
  };
  const correct = picked !== null && picked !== 'time' && picked === card.ok;

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <span className="text-xl font-bold text-blue-600">{idx + 1} / {cards.length} • Javob beradi: {teamName}</span>
        <div className="flex items-center gap-3">
          {streak >= 2 && <span className="dp-pop rounded-2xl bg-amber-100 px-4 py-2 text-xl font-extrabold text-amber-700">🔥 {streak} ketma-ket</span>}
          <TimerPill time={time} limit={LIMIT} />
        </div>
      </div>
      <div key={idx} className="dp-pop rounded-[2rem] bg-gradient-to-br from-violet-600 to-blue-700 p-8 md:p-12 text-center text-white shadow-xl">
        <div className="text-xl font-bold text-violet-200">Bu rostmi?</div>
        {card.q ? (
          <>
            <h2 className="mt-3 text-2xl md:text-4xl font-extrabold leading-tight">{card.q}</h2>
            <div className="mt-6 inline-block rounded-3xl bg-white/15 px-8 py-4 text-3xl md:text-5xl font-extrabold">Javob: {card.b}</div>
          </>
        ) : (
          <div className="mt-4 flex flex-col items-center gap-3">
            <span className="rounded-3xl bg-white/15 px-8 py-4 text-3xl md:text-5xl font-extrabold">{card.a}</span>
            <span className="text-4xl font-extrabold text-violet-200">=</span>
            <span className="rounded-3xl bg-white/15 px-8 py-4 text-2xl md:text-4xl font-extrabold">{card.b}</span>
          </div>
        )}
      </div>
      {picked === null ? (
        <div className="mt-6 grid grid-cols-2 gap-4">
          <button onClick={() => answer(true)} className="flex items-center justify-center gap-3 rounded-3xl bg-emerald-500 py-8 text-3xl md:text-4xl font-extrabold text-white shadow-lg transition active:scale-95 hover:bg-emerald-600">
            <ThumbsUp size={44} /> ROST
          </button>
          <button onClick={() => answer(false)} className="flex items-center justify-center gap-3 rounded-3xl bg-rose-500 py-8 text-3xl md:text-4xl font-extrabold text-white shadow-lg transition active:scale-95 hover:bg-rose-600">
            <ThumbsDown size={44} /> YOLG‘ON
          </button>
        </div>
      ) : (
        <div className="dp-pop mt-6 flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-slate-50 p-5">
          <div>
            <FeedbackBadge ok={correct} text={picked === 'time' ? 'Vaqt tugadi!' : correct ? 'To‘g‘ri!' : 'Noto‘g‘ri'} />
            {!card.ok && <div className="mt-3 text-xl font-bold text-slate-700">To‘g‘risi: <span className="text-emerald-700">{card.right}</span></div>}
          </div>
          <PrimaryButton onClick={next} icon={ArrowRight}>{idx + 1 >= cards.length ? 'Natijalar' : 'Keyingi'}</PrimaryButton>
        </div>
      )}
    </div>
  );
}

/* 8) Harflar — aralash harflardan so‘z yig‘ish */
function AnagramGame({ topic, award, nextTurn, onFinish, teamName }) {
  const cards = useMemo(() => shuffle(wordCards(topic)).slice(0, 8), [topic]);
  const [idx, setIdx] = useState(0);
  const next = () => {
    nextTurn();
    if (idx + 1 >= cards.length) onFinish();
    else setIdx(idx + 1);
  };
  return <AnagramRound key={idx} card={cards[idx]} idx={idx} total={cards.length} award={award} onNext={next} teamName={teamName} />;
}

function AnagramRound({ card, idx, total, award, onNext, teamName }) {
  const tokens = useMemo(() => splitLetters(card.word), [card]);
  const letters = useMemo(() => tokens.map((t, i) => ({ t, i })).filter((x) => isLetterTok(x.t)), [tokens]);
  const tiles = useMemo(() => {
    let s = shuffle(letters);
    for (let k = 0; k < 5 && letters.length > 1 && s.every((x, j) => x.t === letters[j].t); k++) s = shuffle(letters);
    return s.map((x, j) => ({ id: j, t: x.t }));
  }, [letters]);
  const [chosen, setChosen] = useState([]); // tile id lar
  const [status, setStatus] = useState(null); // null | 'ok' | 'bad' | 'shown'
  const [hintUsed, setHintUsed] = useState(false);

  const target = letters.map((x) => x.t.toLowerCase()).join('|');
  const attempt = chosen.map((id) => tiles[id].t.toLowerCase()).join('|');

  useEffect(() => {
    if (status || chosen.length !== letters.length) return;
    if (attempt === target) { setStatus('ok'); award(hintUsed ? 5 : 10); }
    else { setStatus('bad'); const t = setTimeout(() => setStatus(null), 900); return () => clearTimeout(t); }
  }, [chosen, letters.length, attempt, target, status, award, hintUsed]);

  const pick = (id) => { if (!status && !chosen.includes(id)) setChosen((c) => [...c, id]); };
  const unpick = (pos) => { if (!status || status === 'bad') setChosen((c) => c.filter((_, k) => k !== pos)); };
  const hint = () => {
    // Birinchi noto‘g‘ri joyni to‘g‘ri harf bilan almashtiradi
    const correctPrefix = [];
    for (let k = 0; k < letters.length; k++) {
      const want = letters[k].t.toLowerCase();
      if (chosen[k] !== undefined && tiles[chosen[k]].t.toLowerCase() === want) correctPrefix.push(chosen[k]);
      else {
        const tile = tiles.find((x) => x.t.toLowerCase() === want && !correctPrefix.includes(x.id));
        if (tile) correctPrefix.push(tile.id);
        break;
      }
    }
    setChosen(correctPrefix);
    setHintUsed(true);
  };
  const next = onNext;
  const cards = { length: total };

  // Javob katakchalari (bo‘sh joy va chiziqcha ko‘rsatiladi)
  let li = 0;
  const slots = tokens.map((t, k) => {
    if (!isLetterTok(t)) return <span key={k} className="flex h-16 w-6 items-end justify-center text-4xl font-extrabold text-slate-400">{t === ' ' ? '' : t}</span>;
    const pos = li++;
    const id = chosen[pos];
    const shown = status === 'shown';
    return (
      <button
        key={k}
        onClick={() => id !== undefined && unpick(pos)}
        className={`flex h-16 min-w-[3.5rem] items-center justify-center rounded-2xl border-4 px-2 text-3xl md:text-4xl font-extrabold uppercase transition ${
          status === 'ok' ? 'border-emerald-400 bg-emerald-50 text-emerald-700' : status === 'bad' ? 'border-rose-400 bg-rose-50 text-rose-700' : id !== undefined || shown ? 'border-blue-500 bg-blue-50 text-blue-900' : 'border-dashed border-blue-200 bg-white text-transparent'
        }`}
      >
        {shown ? t : id !== undefined ? tiles[id].t : '·'}
      </button>
    );
  });

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <span className="text-xl font-bold text-blue-600">So‘z {idx + 1} / {cards.length} • Javob beradi: {teamName}</span>
        <span className="rounded-2xl bg-blue-50 px-4 py-2 text-lg font-bold text-blue-800">{letters.length} ta harf</span>
      </div>
      <div className="rounded-3xl bg-amber-50 p-6 text-center">
        <div className="text-lg font-bold text-amber-700">Izoh</div>
        <div className="mt-1 text-2xl md:text-3xl font-extrabold text-amber-950">{card.hint}</div>
      </div>
      <div className={`mt-8 flex flex-wrap justify-center gap-2 ${status === 'bad' ? 'dp-shake' : ''}`}>{slots}</div>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {tiles.map((x) => {
          const used = chosen.includes(x.id);
          return (
            <button
              key={x.id}
              disabled={used || !!status}
              onClick={() => pick(x.id)}
              className="h-20 min-w-[4.5rem] rounded-2xl bg-blue-600 px-3 text-4xl font-extrabold uppercase text-white shadow-lg transition enabled:hover:-translate-y-1 enabled:active:scale-90 disabled:opacity-20"
            >
              {x.t}
            </button>
          );
        })}
      </div>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        {status === 'ok' || status === 'shown' ? (
          <>
            <FeedbackBadge ok={status === 'ok'} text={status === 'ok' ? `To‘g‘ri! +${hintUsed ? 5 : 10}` : 'Javob ko‘rsatildi'} />
            <PrimaryButton onClick={next} icon={ArrowRight}>{idx + 1 >= cards.length ? 'Natijalar' : 'Keyingi so‘z'}</PrimaryButton>
          </>
        ) : (
          <>
            <button onClick={() => setChosen([])} className="inline-flex items-center gap-2 rounded-2xl border-2 border-blue-200 bg-white px-5 py-3 text-xl font-bold text-blue-900 hover:bg-blue-50">
              <RotateCcw size={24} /> Tozalash
            </button>
            <button onClick={hint} className="inline-flex items-center gap-2 rounded-2xl bg-amber-400 px-5 py-3 text-xl font-bold text-amber-950 hover:bg-amber-300">
              <Lightbulb size={24} /> Yordam (−5)
            </button>
            <button onClick={() => setStatus('shown')} className="inline-flex items-center gap-2 rounded-2xl bg-slate-200 px-5 py-3 text-xl font-bold text-slate-700 hover:bg-slate-300">
              <Eye size={24} /> Javob
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* 9) Yashirin so‘z — harflarni topib so‘zni ochish */
const UZ_KEYS = ['a', 'b', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'z', 'o‘', 'g‘', 'sh', 'ch'];

function HangmanGame({ topic, award, nextTurn, onFinish, teamName }) {
  const cards = useMemo(() => shuffle(wordCards(topic)).slice(0, 6), [topic]);
  const [idx, setIdx] = useState(0);
  const next = () => {
    nextTurn();
    if (idx + 1 >= cards.length) onFinish();
    else setIdx(idx + 1);
  };
  return <HangmanRound key={idx} card={cards[idx]} idx={idx} total={cards.length} award={award} onNext={next} teamName={teamName} />;
}

function HangmanRound({ card, idx, total, award, onNext, teamName }) {
  const LIVES = 6;
  const [guessed, setGuessed] = useState([]);
  const tokens = useMemo(() => splitLetters(card.word).map((t) => (isLetterTok(t) ? t.toLowerCase().replace(APOS_RE, '‘') : t)), [card]);
  const letterSet = useMemo(() => new Set(tokens.filter(isLetterTok)), [tokens]);
  const misses = guessed.filter((g) => !letterSet.has(g)).length;
  const won = [...letterSet].every((l) => guessed.includes(l));
  const lost = !won && misses >= LIVES;
  const done = won || lost;
  const extraKeys = [...letterSet].filter((l) => !UZ_KEYS.includes(l));
  const keys = [...UZ_KEYS, ...extraKeys];

  const awardedRef = useRef(false);
  useEffect(() => {
    if (won && !awardedRef.current) { awardedRef.current = true; award(10 + (LIVES - misses) * 2); }
  }, [won, misses, award]);

  const guess = (k) => { if (!done && !guessed.includes(k)) setGuessed((g) => [...g, k]); };
  const next = onNext;
  const cards = { length: total };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <span className="text-xl font-bold text-blue-600">So‘z {idx + 1} / {cards.length} • Javob beradi: {teamName}</span>
        <div className="flex gap-1">
          {Array.from({ length: LIVES }, (_, k) => (
            <Heart key={k} size={34} className={k < LIVES - misses ? 'fill-rose-500 text-rose-500' : 'text-slate-300'} />
          ))}
        </div>
      </div>
      <div className="rounded-3xl bg-amber-50 p-6 text-center">
        <div className="text-lg font-bold text-amber-700">Izoh</div>
        <div className="mt-1 text-2xl md:text-3xl font-extrabold text-amber-950">{card.hint}</div>
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {tokens.map((t, k) =>
          !isLetterTok(t) ? (
            <span key={k} className="flex h-20 w-6 items-end justify-center text-4xl font-extrabold text-slate-400">{t === ' ' ? '' : t}</span>
          ) : (
            <span
              key={k}
              className={`flex h-20 min-w-[3.75rem] items-center justify-center border-b-8 px-2 text-4xl md:text-5xl font-extrabold uppercase ${
                guessed.includes(t) ? 'border-blue-600 text-blue-950' : lost ? 'border-rose-400 text-rose-500' : 'border-slate-300 text-transparent'
              }`}
            >
              {guessed.includes(t) || lost ? t : '_'}
            </span>
          )
        )}
      </div>
      {done ? (
        <div className="dp-pop mt-8 flex flex-wrap items-center justify-center gap-4">
          <FeedbackBadge ok={won} text={won ? `Topdingiz! +${10 + (LIVES - misses) * 2}` : `So‘z: ${card.word}`} />
          <PrimaryButton onClick={next} icon={ArrowRight}>{idx + 1 >= cards.length ? 'Natijalar' : 'Keyingi so‘z'}</PrimaryButton>
        </div>
      ) : (
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {keys.map((k) => {
            const used = guessed.includes(k);
            const hit = used && letterSet.has(k);
            return (
              <button
                key={k}
                disabled={used}
                onClick={() => guess(k)}
                className={`h-16 min-w-[3.75rem] rounded-2xl px-2 text-2xl md:text-3xl font-extrabold uppercase shadow transition active:scale-90 ${
                  hit ? 'bg-emerald-500 text-white' : used ? 'bg-slate-200 text-slate-400' : 'bg-white text-blue-900 ring-2 ring-blue-200 hover:bg-blue-50'
                }`}
              >
                {k}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* 10) Millioner — narvon bo‘ylab ko‘tarilish */
function MillionerGame({ topic, award, nextTurn, onFinish, teamName }) {
  const questions = useMemo(() => prepQuiz(topic).slice(0, 10), [topic]);
  const LIMIT = 30;
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null);
  const [hidden, setHidden] = useState([]);
  const [poll, setPoll] = useState(null);
  const [used, setUsed] = useState({ fifty: false, poll: false });
  const q = questions[idx];
  const value = (k) => (k + 1) * 10;
  const time = useCountdown(LIMIT, picked === null, idx, () => setPicked(-1));
  const letters = ['A', 'B', 'C', 'D'];

  useEffect(() => { setHidden([]); setPoll(null); }, [idx]);

  const choose = (i) => {
    if (picked !== null || hidden.includes(i)) return;
    setPicked(i);
    if (q.opts[i].correct) award(value(idx));
  };
  const fifty = () => {
    const wrong = q.opts.map((o, i) => (!o.correct ? i : -1)).filter((i) => i >= 0);
    setHidden(shuffle(wrong).slice(0, Math.max(0, q.opts.length - 2)));
    setUsed((u) => ({ ...u, fifty: true }));
  };
  const askClass = () => {
    const correctI = q.opts.findIndex((o) => o.correct);
    const raw = q.opts.map((_, i) => (hidden.includes(i) ? 0 : i === correctI ? 45 + Math.random() * 30 : Math.random() * 25));
    const sum = raw.reduce((a, b) => a + b, 0) || 1;
    setPoll(raw.map((x) => Math.round((x / sum) * 100)));
    setUsed((u) => ({ ...u, poll: true }));
  };
  const next = () => {
    nextTurn();
    if (idx + 1 >= questions.length) onFinish();
    else { setIdx(idx + 1); setPicked(null); }
  };
  const ok = picked !== null && picked >= 0 && q.opts[picked].correct;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_220px]">
      <div>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xl font-bold text-blue-600">Javob beradi: {teamName}</span>
          <div className="flex flex-wrap items-center gap-2">
            <button disabled={used.fifty || picked !== null} onClick={fifty} className="rounded-2xl bg-amber-400 px-4 py-2 text-xl font-extrabold text-amber-950 disabled:opacity-30">50 : 50</button>
            <button disabled={used.poll || picked !== null} onClick={askClass} className="inline-flex items-center gap-2 rounded-2xl bg-sky-500 px-4 py-2 text-xl font-extrabold text-white disabled:opacity-30"><Users size={22} /> Sinf yordami</button>
            <TimerPill time={time} limit={LIMIT} />
          </div>
        </div>
        <div key={idx} className="dp-pop rounded-[2rem] bg-gradient-to-br from-indigo-900 to-blue-800 p-8 text-center text-white shadow-xl">
          <div className="text-lg font-bold text-amber-300">{value(idx)} ballik savol</div>
          <h2 className="mt-2 text-2xl md:text-4xl font-extrabold leading-tight">{q.q}</h2>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {q.opts.map((o, i) => {
            const reveal = picked !== null;
            const gone = hidden.includes(i);
            const cls = reveal ? (o.correct ? 'bg-emerald-500 text-white' : picked === i ? 'bg-rose-500 text-white' : 'bg-indigo-50 text-indigo-300') : 'bg-indigo-50 text-indigo-950 hover:bg-amber-100';
            return (
              <button
                key={i}
                disabled={gone || reveal}
                onClick={() => choose(i)}
                className={`relative flex items-center gap-3 overflow-hidden rounded-full border-4 border-indigo-200 px-6 py-5 text-left text-xl md:text-2xl font-extrabold transition ${cls} ${gone ? 'invisible' : ''}`}
              >
                {poll && <span className="absolute inset-y-0 left-0 bg-sky-300/40" style={{ width: `${poll[i]}%` }} />}
                <span className="relative text-amber-500">{letters[i]}:</span>
                <span className="relative flex-1">{o.text}</span>
                {poll && <span className="relative text-lg text-sky-700">{poll[i]}%</span>}
              </button>
            );
          })}
        </div>
        {picked !== null && (
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <FeedbackBadge ok={ok} text={picked === -1 ? 'Vaqt tugadi!' : ok ? `To‘g‘ri! +${value(idx)}` : 'Noto‘g‘ri'} />
            <PrimaryButton onClick={next} icon={ArrowRight}>{idx + 1 >= questions.length ? 'Natijalar' : 'Keyingi savol'}</PrimaryButton>
          </div>
        )}
      </div>
      <ol className="flex flex-col-reverse gap-1 self-start rounded-3xl bg-indigo-950 p-3">
        {questions.map((_, k) => (
          <li
            key={k}
            className={`flex items-center justify-between rounded-xl px-4 py-2 text-lg font-extrabold ${
              k === idx ? 'bg-amber-400 text-indigo-950' : k < idx ? 'text-emerald-300' : 'text-indigo-200'
            }`}
          >
            <span>{k + 1}</span>
            <span className="flex items-center gap-1">{k === questions.length - 1 && <Crown size={18} />}{value(k)}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* 11) Poyga — jamoalar marraga qarab yuguradi */
function RaceGame({ topic, award, nextTurn, onFinish, teams, turn }) {
  const TRACK = teams.length > 1 ? 6 : 8;
  const questions = useMemo(() => {
    const qs = prepQuiz(topic);
    const tf = tfCards(topic).map((c) => ({
      q: c.q ? `${c.q} — «${c.b}». Bu to‘g‘rimi?` : `«${c.a}» = «${c.b}». Bu to‘g‘rimi?`,
      opts: [{ text: 'Ha, to‘g‘ri', correct: c.ok }, { text: 'Yo‘q, noto‘g‘ri', correct: !c.ok }],
    }));
    return [...qs, ...tf];
  }, [topic]);
  const [pos, setPos] = useState(() => teams.map(() => 0));
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null);
  const [winner, setWinner] = useState(null);
  const q = questions[idx];
  const colors = ['bg-blue-600', 'bg-rose-500', 'bg-emerald-500', 'bg-amber-500'];

  const choose = (i) => {
    if (picked !== null || winner !== null) return;
    setPicked(i);
    if (q.opts[i].correct) {
      award(10);
      const n = pos.map((x, k) => (k === turn ? Math.min(TRACK, x + 1) : x));
      setPos(n);
      if (n[turn] >= TRACK) setWinner(turn);
    }
  };
  const next = () => {
    if (winner !== null || idx + 1 >= questions.length) { onFinish(); return; }
    nextTurn();
    setIdx(idx + 1);
    setPicked(null);
  };

  return (
    <div>
      <div className="space-y-3 rounded-3xl bg-slate-50 p-4">
        {teams.map((t, k) => (
          <div key={k} className={`flex items-center gap-3 rounded-2xl p-2 ${k === turn ? 'bg-white ring-4 ' + TEAM_STYLES[k].ring : ''}`}>
            <span className={`w-28 shrink-0 truncate text-lg font-extrabold ${TEAM_STYLES[k].text}`}>{t.name}</span>
            <div className="grid flex-1 gap-1" style={{ gridTemplateColumns: `repeat(${TRACK + 1}, minmax(0, 1fr))` }}>
              {Array.from({ length: TRACK + 1 }, (_, c) => (
                <div key={c} className={`flex h-14 items-center justify-center rounded-xl ${c === TRACK ? 'bg-slate-800 text-white' : c < pos[k] ? TEAM_STYLES[k].light : 'bg-white border-2 border-slate-200'}`}>
                  {c === pos[k] ? (
                    <span className={`dp-pop flex h-11 w-11 items-center justify-center rounded-full ${TEAM_STYLES[k].bg} text-white shadow-lg`}><Rocket size={24} /></span>
                  ) : c === TRACK ? <Flag size={24} /> : null}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {winner !== null ? (
        <div className="dp-pop mt-6 rounded-[2rem] bg-amber-100 p-8 text-center">
          <Trophy size={64} className="mx-auto text-amber-500" />
          <div className="mt-2 text-4xl font-extrabold text-amber-900">{teams[winner].name} marraga yetdi!</div>
          <div className="mt-6"><PrimaryButton onClick={next} icon={ArrowRight}>Natijalar</PrimaryButton></div>
        </div>
      ) : (
        <>
          <h2 key={idx} className="dp-pop mt-6 rounded-3xl bg-blue-50 p-6 text-center text-2xl md:text-4xl font-extrabold text-blue-950">
            <span className={`mr-2 ${TEAM_STYLES[turn].text}`}>{teams[turn]?.name}:</span>{q.q}
          </h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {q.opts.map((o, i) => {
              const reveal = picked !== null;
              const st = !reveal ? '' : o.correct ? 'ring-8 ring-emerald-300' : picked === i ? 'opacity-50 ring-8 ring-rose-300' : 'opacity-40';
              return (
                <button key={i} onClick={() => choose(i)} className={`rounded-3xl ${colors[i % 4]} px-6 py-5 text-left text-xl md:text-2xl font-extrabold text-white shadow-lg transition active:scale-[0.98] ${st}`}>
                  {o.text}
                </button>
              );
            })}
          </div>
          {picked !== null && (
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <FeedbackBadge ok={q.opts[picked].correct} text={q.opts[picked].correct ? 'Bir qadam oldinga! +10' : 'Joyida qoldi'} />
              <PrimaryButton onClick={next} icon={ArrowRight}>{idx + 1 >= questions.length ? 'Natijalar' : 'Keyingi jamoa'}</PrimaryButton>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function Scoreboard({ teams, turn, adjust }) {
  return (
    <div className={`grid gap-3 ${teams.length === 1 ? 'grid-cols-1' : teams.length === 2 ? 'grid-cols-2' : teams.length === 3 ? 'grid-cols-3' : 'grid-cols-2 md:grid-cols-4'}`}>
      {teams.map((t, i) => {
        const st = TEAM_STYLES[i];
        const active = i === turn && teams.length > 1;
        return (
          <div key={i} className={`relative flex items-center gap-3 rounded-2xl border-2 p-3 transition ${active ? `${st.border} ${st.light} ring-4 ${st.ring}` : 'border-blue-100 bg-white'}`}>
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${st.bg} text-white`}>
              {teams.length === 1 ? <User size={26} /> : <Users size={26} />}
            </div>
            <div className="min-w-0 flex-1">
              <div className={`truncate text-lg font-extrabold ${st.text}`}>{t.name}</div>
              {active && <div className="text-sm font-bold text-slate-500">Navbat shu jamoada</div>}
            </div>
            <div key={t.score} className="dp-pop text-4xl font-extrabold text-blue-950 tabular-nums">{t.score}</div>
            <div className="flex flex-col gap-1">
              <button onClick={() => adjust(i, 5)} className="rounded-lg bg-slate-100 p-1 text-slate-600 hover:bg-slate-200" title="+5"><Plus size={16} /></button>
              <button onClick={() => adjust(i, -5)} className="rounded-lg bg-slate-100 p-1 text-slate-600 hover:bg-slate-200" title="−5"><Minus size={16} /></button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ResultModal({ teams, onReplay, onOtherGame, onTopics, saveState }) {
  const sorted = [...teams].map((t, i) => ({ ...t, i })).sort((a, b) => b.score - a.score);
  const top = sorted[0];
  const tie = sorted.length > 1 && sorted[1].score === top.score;
  useEffect(() => { playSound('win'); }, []);
  return (
    <Modal>
      <Confetti />
      <div className="text-center">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-amber-100 text-amber-500">
          <Trophy size={56} />
        </div>
        <h2 className="mt-4 text-4xl font-extrabold text-blue-950">O‘yin tugadi!</h2>
        <p className="mt-2 text-2xl font-bold text-blue-600">
          {teams.length === 1 ? `Natija: ${top.score} ball` : tie ? 'Durang!' : `G‘olib: ${top.name}`}
        </p>
      </div>
      {teams.length > 1 && (
        <div className="mt-6 space-y-3">
          {sorted.map((t, k) => (
            <div key={t.i} className={`flex items-center gap-4 rounded-2xl ${TEAM_STYLES[t.i].light} p-4`}>
              <span className="w-8 text-2xl font-extrabold text-slate-400">{k + 1}</span>
              <span className={`flex-1 text-2xl font-extrabold ${TEAM_STYLES[t.i].text}`}>{t.name}</span>
              <span className="text-3xl font-extrabold text-blue-950">{t.score}</span>
            </div>
          ))}
        </div>
      )}
      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <button onClick={onReplay} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-4 text-lg font-extrabold text-white hover:bg-blue-700">
          <RotateCcw size={22} /> Qayta o‘ynash
        </button>
        <button onClick={onOtherGame} className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-blue-200 px-4 py-4 text-lg font-bold text-blue-900 hover:bg-blue-50">
          <LayoutGrid size={22} /> Boshqa o‘yin
        </button>
        <button onClick={onTopics} className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-blue-200 px-4 py-4 text-lg font-bold text-blue-900 hover:bg-blue-50">
          <BookOpen size={22} /> Mavzular
        </button>
      </div>
      {saveState && (
        <p className={`mt-4 text-center text-base font-semibold ${saveState === 'error' ? 'text-rose-600' : 'text-slate-500'}`}>
          {saveState === 'saving' ? 'Natija saqlanmoqda...' : saveState === 'saved' ? '✓ Natija sinf reytingiga saqlandi' : 'Natijani saqlab bo‘lmadi'}
        </p>
      )}
    </Modal>
  );
}

/* ============================================================
   Fikrlash o‘yinlari: Voqealar zanjiri, Ortiqchasini top, Bahs, Ijodiy topshiriq
   ============================================================ */

/* 12) Voqealar zanjiri — voqealarni to‘g‘ri tartibda joylash */
function SequenceGame({ topic, award, nextTurn, onFinish, teamName }) {
  const rounds = useMemo(() => (topic.sequences || []).filter((s) => (s.items || []).length >= 3), [topic]);
  const [round, setRound] = useState(0);
  const next = () => {
    nextTurn();
    if (round + 1 >= rounds.length) onFinish();
    else setRound(round + 1);
  };
  if (!rounds.length) return null;
  return <SequenceRound key={round} seq={rounds[round]} idx={round} total={rounds.length} award={award} onNext={next} teamName={teamName} last={round + 1 >= rounds.length} />;
}

function SequenceRound({ seq, idx, total, award, onNext, teamName, last }) {
  const cards = useMemo(() => {
    let s = shuffle(seq.items.map((text, order) => ({ text, order })));
    // Tasodifan to‘g‘ri tartib chiqib qolmasin
    if (s.every((c, i) => c.order === i) && s.length > 1) s = [...s.slice(1), s[0]];
    return s;
  }, [seq]);
  const [placed, setPlaced] = useState([]); // order raqamlari
  const [wrong, setWrong] = useState(null);
  const [mistakes, setMistakes] = useState(0);
  const done = placed.length === seq.items.length;
  const bonusGiven = useRef(false);

  useEffect(() => {
    if (done && !bonusGiven.current) {
      bonusGiven.current = true;
      if (mistakes === 0) award(10);
      playSound('win');
    }
  }, [done, mistakes, award]);

  const pick = (c) => {
    if (done || placed.includes(c.order)) return;
    if (c.order === placed.length) {
      setPlaced((p) => [...p, c.order]);
      award(5);
    } else {
      setWrong(c.order);
      setMistakes((m) => m + 1);
      playSound('wrong');
      setTimeout(() => setWrong(null), 600);
    }
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <span className="text-xl font-bold text-blue-600">{total > 1 ? `${idx + 1} / ${total} • ` : ''}Navbat: {teamName}</span>
        <span className="rounded-2xl bg-rose-50 px-4 py-2 text-lg font-bold text-rose-600">Xato: {mistakes}</span>
      </div>
      <h2 className="text-2xl md:text-3xl font-extrabold text-blue-950">{seq.title || 'Voqealarni tartib bilan joylang'}</h2>
      <p className="mt-1 text-lg text-slate-500">Qaysi voqea birinchi bo‘lgan? Kartalarni tartib bilan bosing.</p>

      <ol className="mt-5 space-y-2">
        {seq.items.map((text, i) => {
          const ok = i < placed.length;
          return (
            <li key={i} className={`flex items-center gap-3 rounded-2xl border-2 px-4 py-3 text-lg md:text-2xl font-bold transition ${ok ? 'dp-pop border-emerald-300 bg-emerald-50 text-emerald-900' : 'border-dashed border-slate-200 bg-slate-50 text-slate-300'}`}>
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-extrabold ${ok ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-400'}`}>{i + 1}</span>
              {ok ? text : '...'}
            </li>
          );
        })}
      </ol>

      {!done ? (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {cards.filter((c) => !placed.includes(c.order)).map((c) => (
            <button
              key={c.order}
              onClick={() => pick(c)}
              className={`rounded-2xl border-2 p-4 text-left text-lg md:text-2xl font-bold shadow-sm transition active:scale-95 ${wrong === c.order ? 'dp-shake border-rose-400 bg-rose-50 text-rose-700' : 'border-blue-200 bg-white text-blue-950 hover:border-blue-500 hover:bg-blue-50'}`}
            >
              {c.text}
            </button>
          ))}
        </div>
      ) : (
        <div className="dp-pop mt-6 flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-emerald-50 p-5">
          <div className="text-2xl font-extrabold text-emerald-700">
            Zanjir tiklandi! {mistakes === 0 ? '🌟 Xatosiz: +10 bonus' : `Xatolar: ${mistakes}`}
          </div>
          <PrimaryButton onClick={onNext} icon={ArrowRight}>{last ? 'Natijalar' : 'Keyingi zanjir'}</PrimaryButton>
        </div>
      )}
    </div>
  );
}

/* 13) Ortiqchasini top — mantiqiy guruhlash */
function OddGame({ topic, award, nextTurn, onFinish, teamName }) {
  const cards = useMemo(
    () => shuffle(topic.odd || []).map((c) => ({ ...c, opts: shuffle(c.items.map((text, i) => ({ text, odd: i === c.answer }))) })),
    [topic],
  );
  const LIMIT = 25;
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null); // indeks | 'time'
  const card = cards[idx];
  const time = useCountdown(LIMIT, picked === null, idx, () => setPicked('time'));
  if (!card) return null;

  const choose = (k) => {
    if (picked !== null) return;
    setPicked(k);
    if (card.opts[k].odd) award(10 + (time >= 15 ? 5 : 0));
  };
  const next = () => {
    nextTurn();
    if (idx + 1 >= cards.length) onFinish();
    else { setIdx(idx + 1); setPicked(null); }
  };
  const ok = picked !== null && picked !== 'time' && card.opts[picked].odd;

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <span className="text-xl font-bold text-blue-600">{idx + 1} / {cards.length} • Javob beradi: {teamName}</span>
        <TimerPill time={time} limit={LIMIT} />
      </div>
      <div className="rounded-[2rem] bg-gradient-to-br from-teal-600 to-cyan-700 p-6 text-center text-white shadow-xl">
        <div className="text-2xl md:text-3xl font-extrabold">Qaysi biri ortiqcha?</div>
        <p className="mt-1 text-lg text-teal-100">Uchtasini nima birlashtiradi? Bittasi bu guruhga kirmaydi.</p>
      </div>
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {card.opts.map((o, k) => {
          let cls = 'border-teal-200 bg-white text-blue-950 hover:border-teal-500 hover:bg-teal-50';
          if (picked !== null) {
            if (o.odd) cls = 'border-emerald-400 bg-emerald-50 text-emerald-800';
            else if (k === picked) cls = 'border-rose-400 bg-rose-50 text-rose-700';
            else cls = 'border-slate-200 bg-white text-slate-400';
          }
          return (
            <button key={k} onClick={() => choose(k)} disabled={picked !== null} className={`min-h-[96px] rounded-3xl border-4 p-5 text-2xl md:text-3xl font-extrabold transition active:scale-95 ${cls}`}>
              {o.text}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <div className="dp-pop mt-6 flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-slate-50 p-5">
          <div className="min-w-0 flex-1">
            <FeedbackBadge ok={ok} text={picked === 'time' ? 'Vaqt tugadi!' : ok ? 'To‘g‘ri!' : 'Noto‘g‘ri'} />
            <p className="mt-3 text-xl font-semibold text-slate-700"><Lightbulb size={22} className="mr-1 inline text-amber-500" />{card.why}</p>
          </div>
          <PrimaryButton onClick={next} icon={ArrowRight}>{idx + 1 >= cards.length ? 'Natijalar' : 'Keyingi'}</PrimaryButton>
        </div>
      )}
    </div>
  );
}

/* 14) Bahs maydoni — tanqidiy fikrlash, ikki tomon dalillari */
const DEBATE_TIME = 60;
function DebateGame({ topic, nextTurn, onFinish, teams, turn, updateTeams }) {
  const claims = useMemo(() => shuffle(topic.debate || []), [topic]);
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState('ready'); // ready | pro | con | judge
  const [hint, setHint] = useState(false);
  const [given, setGiven] = useState({ pro: null, con: null });
  const claim = claims[idx];
  const multi = teams.length > 1;
  const proIdx = turn;
  const conIdx = multi ? (turn + 1) % teams.length : turn;
  const proName = multi ? teams[proIdx]?.name : 'Qo‘shiluvchilar';
  const conName = multi ? teams[conIdx]?.name : 'Qarshi chiquvchilar';
  const running = phase === 'pro' || phase === 'con';
  const time = useCountdown(DEBATE_TIME, running, `${idx}-${phase}`, () => {
    playSound('flip');
    setHint(false);
    setPhase((p) => (p === 'pro' ? 'con' : 'judge'));
  });
  if (!claim) return null;

  const give = (side, pts) => {
    if (given[side] !== null) return;
    setGiven((g) => ({ ...g, [side]: pts }));
    if (pts > 0) {
      playSound('correct');
      const ti = side === 'pro' ? proIdx : conIdx;
      updateTeams((ts) => ts.map((t, i) => (i === ti ? { ...t, score: t.score + pts } : t)));
    }
  };
  const next = () => {
    nextTurn();
    if (idx + 1 >= claims.length) onFinish();
    else { setIdx(idx + 1); setPhase('ready'); setHint(false); setGiven({ pro: null, con: null }); }
  };
  const skip = () => { setHint(false); setPhase((p) => (p === 'pro' ? 'con' : 'judge')); };

  const Side = ({ side, name, active }) => (
    <div className={`rounded-3xl border-4 p-5 transition ${active ? (side === 'pro' ? 'border-emerald-400 bg-emerald-50 shadow-lg' : 'border-rose-400 bg-rose-50 shadow-lg') : 'border-slate-100 bg-white opacity-70'}`}>
      <div className={`flex items-center gap-2 text-xl font-extrabold ${side === 'pro' ? 'text-emerald-700' : 'text-rose-700'}`}>
        {side === 'pro' ? <ThumbsUp size={26} /> : <ThumbsDown size={26} />} {side === 'pro' ? 'Qo‘shilaman' : 'Qarshiman'}
      </div>
      <div className="mt-1 truncate text-2xl font-extrabold text-blue-950">{name}</div>
      {phase === 'judge' && (
        <div className="mt-4">
          <div className="mb-2 text-base font-bold text-slate-500">Dalillar kuchi:</div>
          <div className="flex flex-wrap gap-2">
            {[0, 5, 10, 15].map((p) => (
              <button
                key={p}
                onClick={() => give(side, p)}
                disabled={given[side] !== null}
                className={`rounded-2xl px-4 py-3 text-xl font-extrabold transition active:scale-95 ${given[side] === p ? 'bg-blue-600 text-white' : given[side] !== null ? 'bg-slate-100 text-slate-300' : 'bg-white text-blue-900 ring-2 ring-blue-200 hover:bg-blue-50'}`}
              >
                {p === 0 ? '0' : `+${p}`}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <span className="text-xl font-bold text-blue-600">Bahs {idx + 1} / {claims.length}</span>
        {running && <TimerPill time={time} limit={DEBATE_TIME} />}
      </div>
      <div className="rounded-[2rem] bg-gradient-to-br from-amber-500 to-orange-600 p-6 md:p-10 text-center text-white shadow-xl">
        <div className="flex items-center justify-center gap-2 text-lg font-bold uppercase tracking-wide text-amber-100"><Scale size={24} /> Bahs mavzusi</div>
        <h2 className="mt-3 text-2xl md:text-4xl font-extrabold leading-tight">«{claim.claim}»</h2>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <Side side="pro" name={proName} active={phase === 'pro' || phase === 'judge'} />
        <Side side="con" name={conName} active={phase === 'con' || phase === 'judge'} />
      </div>

      <div className="mt-5 rounded-3xl bg-slate-50 p-5">
        {phase === 'ready' && (
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-xl text-slate-700">Har bir tomonga <b>{DEBATE_TIME} soniya</b>. Avval qo‘shiluvchilar, keyin qarshi tomon dalil keltiradi. O‘qituvchi oxirida ball beradi.</p>
            <PrimaryButton onClick={() => setPhase('pro')} icon={Play}>Bahsni boshlash</PrimaryButton>
          </div>
        )}
        {running && (
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="text-2xl font-extrabold text-blue-950">
                So‘z navbati: <span className={phase === 'pro' ? 'text-emerald-600' : 'text-rose-600'}>{phase === 'pro' ? proName : conName}</span>
              </div>
              {hint ? (
                <p className="dp-pop mt-2 text-xl text-slate-700"><Lightbulb size={22} className="mr-1 inline text-amber-500" />{phase === 'pro' ? claim.pro : claim.con}</p>
              ) : (
                (phase === 'pro' ? claim.pro : claim.con) && (
                  <button onClick={() => setHint(true)} className="mt-2 inline-flex items-center gap-2 rounded-xl bg-amber-100 px-4 py-2 text-lg font-bold text-amber-800 hover:bg-amber-200">
                    <Lightbulb size={20} /> Yordamchi dalil
                  </button>
                )
              )}
            </div>
            <button onClick={skip} className="inline-flex items-center gap-2 rounded-2xl border-2 border-blue-200 px-5 py-3 text-lg font-bold text-blue-900 hover:bg-blue-50">
              Tugatdik <ArrowRight size={22} />
            </button>
          </div>
        )}
        {phase === 'judge' && (
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-xl text-slate-700">Har bir tomonning dalillarini baholang: aniq misol, mantiq va asardan dalil uchun ko‘proq ball.</p>
            <PrimaryButton onClick={next} disabled={given.pro === null || given.con === null} icon={ArrowRight}>
              {idx + 1 >= claims.length ? 'Natijalar' : 'Keyingi bahs'}
            </PrimaryButton>
          </div>
        )}
      </div>
    </div>
  );
}

/* 15) Ijodiy topshiriq — yopiq kartalar, taymer va yulduzli baho */
function CreativeGame({ topic, award, nextTurn, onFinish, teamName }) {
  const deck = useMemo(() => shuffle(topic.creative || []).slice(0, 6), [topic]);
  const [used, setUsed] = useState([]);
  const [open, setOpen] = useState(null);
  const [phase, setPhase] = useState('pick'); // pick | show | run | rate
  const task = open !== null ? deck[open] : null;
  const limit = task?.time || 90;
  const time = useCountdown(limit, phase === 'run', `${open}-${phase === 'run'}`, () => { playSound('flip'); setPhase('rate'); });

  const flip = (k) => {
    if (phase !== 'pick' || used.includes(k)) return;
    playSound('flip');
    setOpen(k);
    setPhase('show');
  };
  const rate = (stars) => {
    if (stars > 0) award(stars * 10);
    const nu = [...used, open];
    setUsed(nu);
    nextTurn();
    if (nu.length >= deck.length) { onFinish(); return; }
    setOpen(null);
    setPhase('pick');
  };

  if (phase === 'pick') {
    return (
      <div className="mx-auto max-w-5xl">
        <div className="mb-4 text-xl font-bold text-blue-600">Navbat: {teamName} • Kartani tanlang</div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {deck.map((_, k) => (
            <button
              key={k}
              onClick={() => flip(k)}
              disabled={used.includes(k)}
              className={`flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-3xl text-white shadow-lg transition active:scale-95 ${used.includes(k) ? 'bg-slate-200 text-slate-400 shadow-none' : 'bg-gradient-to-br from-fuchsia-500 to-violet-700 hover:scale-[1.02]'}`}
            >
              {used.includes(k) ? <Check size={44} /> : <Palette size={48} />}
              <span className="text-3xl font-extrabold">{k + 1}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <span className="text-xl font-bold text-blue-600">{used.length + 1} / {deck.length} • Bajaradi: {teamName}</span>
        {phase === 'run' && <TimerPill time={time} limit={limit} />}
      </div>
      <div key={open} className="dp-pop rounded-[2rem] bg-gradient-to-br from-fuchsia-600 to-violet-700 p-8 md:p-12 text-center text-white shadow-xl">
        <div className="flex items-center justify-center gap-2 text-lg font-bold uppercase tracking-wide text-fuchsia-100"><Sparkles size={22} /> Ijodiy topshiriq</div>
        <h2 className="mt-4 text-2xl md:text-4xl font-extrabold leading-snug">{task.task}</h2>
        <div className="mt-4 text-lg text-fuchsia-100">Vaqt: {limit} soniya</div>
      </div>
      <div className="mt-6 rounded-3xl bg-slate-50 p-5">
        {phase === 'show' && (
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-xl text-slate-700">Jamoa tayyor bo‘lsa, taymerni ishga tushiring.</p>
            <PrimaryButton onClick={() => setPhase('run')} icon={Timer}>Boshlash</PrimaryButton>
          </div>
        )}
        {phase === 'run' && (
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-xl font-bold text-slate-700">Jamoa ishlamoqda...</p>
            <button onClick={() => setPhase('rate')} className="inline-flex items-center gap-2 rounded-2xl border-2 border-blue-200 px-5 py-3 text-lg font-bold text-blue-900 hover:bg-blue-50">
              Tayyor <Check size={22} />
            </button>
          </div>
        )}
        {phase === 'rate' && (
          <div>
            <p className="mb-3 text-xl font-bold text-slate-700">Ijodkorlikni baholang:</p>
            <div className="flex flex-wrap gap-3">
              {[1, 2, 3].map((s) => (
                <button key={s} onClick={() => rate(s)} className="inline-flex items-center gap-1 rounded-2xl bg-amber-400 px-5 py-4 text-2xl font-extrabold text-amber-950 shadow transition hover:bg-amber-300 active:scale-95">
                  {Array.from({ length: s }).map((_, i) => <Star key={i} size={26} fill="currentColor" />)}
                  <span className="ml-2 text-lg">+{s * 10}</span>
                </button>
              ))}
              <button onClick={() => rate(0)} className="rounded-2xl border-2 border-slate-200 px-5 py-4 text-lg font-bold text-slate-500 hover:bg-white">Bajarilmadi</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PlayScreen({ game, topic, teams, turn, award, nextTurn, adjust, gameKey, onFinish, onBack, onOpenPicker, pickedStudent, updateTeams }) {
  const props = { topic, award, nextTurn, onFinish };
  const GameIcon = game.icon;
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-8">
      <div className="mb-5 flex flex-wrap items-center gap-4">
        <BackButton onClick={onBack} />
        <div className="flex flex-1 items-center gap-3 min-w-0">
          <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${game.color} text-white`}><GameIcon size={30} /></div>
          <div className="min-w-0">
            <h1 className="truncate text-2xl md:text-3xl font-extrabold text-blue-950">{game.name}</h1>
            <p className="truncate text-lg text-slate-500">{topic.title}</p>
          </div>
        </div>
        <button
          onClick={onOpenPicker}
          className="inline-flex items-center gap-2 rounded-2xl bg-blue-900 px-5 py-3 text-lg font-bold text-white shadow-lg transition hover:bg-blue-800 active:scale-95"
        >
          <UserCheck size={24} /> O‘quvchi tanlash
        </button>
      </div>
      <Scoreboard teams={teams} turn={turn} adjust={adjust} />
      {pickedStudent && (
        <div className="dp-pop mt-3 inline-flex items-center gap-3 rounded-2xl bg-amber-100 px-5 py-2 text-xl font-bold text-amber-800">
          <UserCheck size={24} /> Javob beradi: <span className="font-extrabold text-amber-900">{pickedStudent}</span>
        </div>
      )}
      {teams[turn]?.members?.length > 0 && teams.length > 1 && (
        <p className="mt-2 truncate text-base text-slate-500">
          <b className={TEAM_STYLES[turn].text}>{teams[turn].name}:</b> {teams[turn].members.join(', ')}
        </p>
      )}
      <div className="mt-6 rounded-[2rem] border-2 border-blue-100 bg-white p-5 md:p-8">
        {game.id === 'match' && <MatchGame key={gameKey} {...props} />}
        {game.id === 'memory' && <MemoryGame key={gameKey} {...props} />}
        {game.id === 'quiz' && <QuizGame key={gameKey} {...props} />}
        {game.id === 'sort' && <SortGame key={gameKey} {...props} />}
        {game.id === 'qa' && <QAGame key={gameKey} {...props} teamName={teams[turn]?.name} />}
        {game.id === 'boom' && <BoomGame key={gameKey} {...props} teams={teams} turn={turn} updateTeams={updateTeams} />}
        {game.id === 'truefalse' && <TrueFalseGame key={gameKey} {...props} teamName={teams[turn]?.name} />}
        {game.id === 'anagram' && <AnagramGame key={gameKey} {...props} teamName={teams[turn]?.name} />}
        {game.id === 'hangman' && <HangmanGame key={gameKey} {...props} teamName={teams[turn]?.name} />}
        {game.id === 'millioner' && <MillionerGame key={gameKey} {...props} teamName={teams[turn]?.name} />}
        {game.id === 'race' && <RaceGame key={gameKey} {...props} teams={teams} turn={turn} />}
        {game.id === 'sequence' && <SequenceGame key={gameKey} {...props} teamName={teams[turn]?.name} />}
        {game.id === 'odd' && <OddGame key={gameKey} {...props} teamName={teams[turn]?.name} />}
        {game.id === 'debate' && <DebateGame key={gameKey} {...props} teams={teams} turn={turn} updateTeams={updateTeams} />}
        {game.id === 'creative' && <CreativeGame key={gameKey} {...props} teamName={teams[turn]?.name} />}
      </div>
    </div>
  );
}

/* ============================================================
   9. ASOSIY ILOVA
   ============================================================ */

export default function DarsPlayApp() {
  const [history, setHistory] = useState(['login']);
  const step = history[history.length - 1];
  const go = useCallback((s) => setHistory((h) => [...h, s]), []);
  const back = useCallback(() => setHistory((h) => (h.length > 1 ? h.slice(0, -1) : h)), []);
  const resetTo = useCallback((list) => setHistory(list), []);

  const [db, setDb] = useState(seedDb);
  const [session, setSession] = useState(null); // { role: 'teacher', id } | { role: 'admin' }
  const [subjectId, setSubjectId] = useState(null);
  const [grade, setGrade] = useState(null);
  const [classId, setClassId] = useState(null);
  const [topicId, setTopicId] = useState(null);
  const [gameId, setGameId] = useState(null);

  const [teamCount, setTeamCountRaw] = useState(2);
  const [groups, setGroups] = useState(null);
  const [teams, setTeams] = useState([]);
  const [turn, setTurn] = useState(0);
  const turnRef = useRef(0);
  const teamsLenRef = useRef(1);
  const [gameKey, setGameKey] = useState(0);
  const [finished, setFinished] = useState(false);
  const [pickerTab, setPickerTab] = useState(null);
  const [pickedStudent, setPickedStudent] = useState(null);
  const pickedRef = useRef(null);
  const [studentScores, setStudentScores] = useState({});
  const [saveState, setSaveState] = useState(null);
  const savedKeyRef = useRef(-1);
  const [editingSet, setEditingSet] = useState(null);
  const [ratingScope, setRatingScope] = useState('class');
  const [showWelcome, setShowWelcome] = useState(false);
  const [isFs, setIsFs] = useState(false);

  const [booting, setBooting] = useState(REMOTE);
  const [dataError, setDataError] = useState('');
  const profileRef = useRef(null);

  // Ma’lumotlar ombori va sessiyani yuklash
  useEffect(() => {
    if (REMOTE) {
      (async () => {
        try {
          const { data: { session: s } } = await supabase.auth.getSession();
          if (s?.user) {
            const profile = await remoteProfile(s.user.id);
            profileRef.current = profile;
            setDb(await remoteLoadData(profile));
            if (profile.subject) setSubjectId(profile.subject);
            setSession(profile.role === 'admin' ? { role: 'admin', id: profile.id } : { role: 'teacher', id: profile.id });
            setHistory([profile.role === 'admin' ? 'admin' : 'home']);
          } else {
            setDb({ version: 1, admin: { login: 'admin', password: '' }, teachers: [], classes: [] });
          }
        } catch (e) {
          setDataError(errText(e));
        } finally {
          setBooting(false);
        }
      })();
      return;
    }
    const d = loadDb();
    setDb(d);
    saveDb(d);
    try {
      const sess = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
      if (sess?.role === 'admin') { setSession(sess); setHistory(['admin']); }
      else if (sess?.role === 'teacher' && d.teachers.some((t) => t.id === sess.id)) { setSession(sess); setHistory(['home']); }
    } catch { /* */ }
  }, []);

  const dbRef = useRef(db);
  dbRef.current = db;
  useEffect(() => { pickedRef.current = pickedStudent; }, [pickedStudent]);

  const updateDb = useCallback((fn) => {
    setDb((d) => { const n = fn(d); if (!REMOTE) saveDb(n); return n; });
  }, []);

  const reloadRemote = useCallback(async () => {
    if (!REMOTE || !profileRef.current) return;
    try { setDb(await remoteLoadData(profileRef.current)); setDataError(''); } catch (e) { setDataError(errText(e)); }
  }, []);

  const startSession = (sess, firstStep) => {
    setSession(sess);
    try { localStorage.setItem(SESSION_KEY, JSON.stringify(sess)); } catch { /* */ }
    resetTo([firstStep]);
  };

  const teacher = session?.role === 'teacher' ? db.teachers.find((t) => t.id === session.id) || null : null;
  const isAdmin = session?.role === 'admin';
  const schoolClasses = useMemo(
    () => (teacher ? db.classes.filter((c) => normSchool(c.school) === normSchool(teacher.school)) : []),
    [db.classes, teacher]
  );
  const selectedClass = schoolClasses.find((c) => c.id === classId) || null;

  // Birinchi kirishda qo‘llanmani taklif qilamiz (har bir o‘qituvchi uchun bir marta)
  useEffect(() => {
    if (!teacher || step !== 'home') return;
    try { if (!localStorage.getItem(`${GUIDE_KEY}_${teacher.id}`)) setShowWelcome(true); } catch { /* */ }
  }, [teacher?.id, step]); // eslint-disable-line react-hooks/exhaustive-deps
  const markGuideSeen = () => {
    setShowWelcome(false);
    try { if (teacher) localStorage.setItem(`${GUIDE_KEY}_${teacher.id}`, '1'); } catch { /* */ }
  };

  // Admin o‘qituvchini o‘chirib yuborsa — sessiyani yopamiz
  useEffect(() => {
    if (session?.role === 'teacher' && !db.teachers.some((t) => t.id === session.id)) {
      setSession(null);
      try { localStorage.removeItem(SESSION_KEY); } catch { /* */ }
      setHistory(['login']);
    }
  }, [db.teachers, session]);

  useEffect(() => {
    const onFs = () => setIsFs(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFs);
    return () => document.removeEventListener('fullscreenchange', onFs);
  }, []);

  useEffect(() => { turnRef.current = turn; }, [turn]);
  useEffect(() => { teamsLenRef.current = teams.length || 1; }, [teams.length]);

  const toggleFs = () => {
    try {
      if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
      else document.exitFullscreen?.();
    } catch { /* qo‘llab-quvvatlanmaydi */ }
  };

  const students = useMemo(() => selectedClass?.students || [], [selectedClass]);

  const subject = SUBJECTS.find((s) => s.id === subjectId);
  const customTopics = useMemo(() => {
    if (!subject || !grade) return [];
    return (db.customSets || [])
      .filter((x) => x.subject === subject.id && Number(x.grade) === Number(grade) && (x.ownerId === teacher?.id || x.shared))
      .map((x) => customSetToTopic(x, teacher?.id));
  }, [db.customSets, subject, grade, teacher]);
  const topics = useMemo(() => {
    if (!subject || !grade) return [];
    return [...customTopics, ...(CONTENT[subject.id]?.[grade] || []), makeGeneralTopic(subject)];
  }, [subject, grade, customTopics]);
  const topic = topics.find((t) => t.id === topicId);
  const game = GAMES.find((g) => g.id === gameId);

  const setTeamCount = (n) => {
    setTeamCountRaw(n);
    setGroups((g) => (g && g.length === n ? g : null));
  };

  const award = useCallback((points) => {
    const idx = turnRef.current;
    if (points > 0) playSound('correct');
    setTeams((ts) => ts.map((t, i) => (i === idx ? { ...t, score: t.score + points } : t)));
    const who = pickedRef.current;
    if (who && points) setStudentScores((m) => ({ ...m, [who]: (m[who] || 0) + points }));
  }, []);

  const nextTurn = useCallback(() => {
    setTurn((t) => {
      const n = (t + 1) % Math.max(1, teamsLenRef.current);
      turnRef.current = n;
      return n;
    });
  }, []);
  const adjust = (i, d) => setTeams((ts) => ts.map((t, k) => (k === i ? { ...t, score: Math.max(0, t.score + d) } : t)));

  const buildTeams = () =>
    Array.from({ length: teamCount }, (_, i) => ({
      name: teamLabel(teamCount, i),
      score: 0,
      members: (groups && groups.length === teamCount && groups[i]) || [],
    }));

  const startGame = (name = null) => {
    const ts = buildTeams();
    const found = name ? ts.findIndex((t) => t.members.includes(name)) : -1;
    const first = found >= 0 ? found : 0;
    teamsLenRef.current = ts.length;
    turnRef.current = first;
    setPickedStudent(name || null);
    pickedRef.current = name || null;
    setStudentScores({});
    setSaveState(null);
    setTeams(ts);
    setTurn(first);
    setFinished(false);
    setGameKey((k) => k + 1);
    go('play');
  };

  const replay = () => {
    setStudentScores({});
    setSaveState(null);
    setTeams((ts) => ts.map((t) => ({ ...t, score: 0 })));
    turnRef.current = 0;
    setTurn(0);
    setFinished(false);
    setGameKey((k) => k + 1);
  };

  const logout = () => {
    if (REMOTE) { supabase.auth.signOut(); profileRef.current = null; }
    try { localStorage.removeItem(SESSION_KEY); } catch { /* */ }
    setSession(null);
    setClassId(null);
    setGroups(null);
    resetTo(['login']);
  };

  const goHome = () => {
    if (teacher) resetTo(['home']);
    else if (isAdmin) resetTo(['admin']);
  };

  // Bitta kirish: avval o‘qituvchi, keyin administrator hisobi tekshiriladi.
  // Login katta-kichik harfga va chetdagi bo‘sh joylarga sezgir emas (telefon/doska klaviaturalari uchun).
  const doLogin = async (rawLogin, rawPassword) => {
    const login = rawLogin.trim().toLowerCase();
    const password = rawPassword.trim();
    if (REMOTE) {
      const { data, error } = await supabase.auth.signInWithPassword({ email: loginToEmail(login), password });
      if (error) {
        if (/fetch|network/i.test(error.message)) return 'Serverga ulanib bo‘lmadi. Internetni tekshiring.';
        return 'Login yoki parol noto‘g‘ri. Katta-kichik harflarni tekshiring.';
      }
      try {
        const profile = await remoteProfile(data.user.id);
        profileRef.current = profile;
        setDb(await remoteLoadData(profile));
        if (profile.subject) setSubjectId(profile.subject);
        startSession({ role: profile.role === 'admin' ? 'admin' : 'teacher', id: profile.id }, profile.role === 'admin' ? 'admin' : 'home');
        return null;
      } catch (e) {
        await supabase.auth.signOut();
        return 'Hisob topildi, lekin profil yo‘q. Administratorga murojaat qiling. (' + errText(e) + ')';
      }
    }
    const t = db.teachers.find((x) => x.login.trim().toLowerCase() === login);
    if (t && t.password.trim() === password) {
      if (t.subject) setSubjectId(t.subject);
      startSession({ role: 'teacher', id: t.id }, 'home');
      return null;
    }
    if (login === db.admin.login.trim().toLowerCase() && password === db.admin.password.trim()) {
      startSession({ role: 'admin' }, 'admin');
      return null;
    }
    if (t) return 'Parol noto‘g‘ri. Katta-kichik harflarni tekshiring.';
    return 'Bunday login topilmadi. Administratordan olgan loginni tekshiring.';
  };

  // O‘yin tugaganda natijani sinf tarixiga saqlash
  useEffect(() => {
    if (!finished || savedKeyRef.current === gameKey) return;
    savedKeyRef.current = gameKey;
    const total = teams.reduce((a, t) => a + (t.score || 0), 0);
    if (!selectedClass || !teacher || !topic || !game || total <= 0) { setSaveState(null); return; }
    const row = {
      class_id: selectedClass.id, teacher_id: teacher.id, teacher_name: teacher.name, subject: subjectId, grade,
      topic_id: topic.id, topic_title: topic.title, game_id: game.id, game_name: game.name,
      teams: teams.map(({ name, score, members }) => ({ name, score, members: members || [] })),
      students: studentScores,
    };
    setSaveState('saving');
    (async () => {
      if (REMOTE) {
        const { error } = await supabase.from('game_results').insert(row);
        setSaveState(error ? 'error' : 'saved');
      } else {
        const r = mapResultRow({ ...row, id: uid('r'), played_at: new Date().toISOString() });
        updateDb((d) => ({ ...d, results: [r, ...(d.results || [])].slice(0, 1000) }));
        setSaveState('saved');
      }
    })();
  }, [finished, gameKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadResults = useCallback(async (cid) => {
    if (REMOTE) {
      const { data, error } = await supabase.from('game_results').select('*').eq('class_id', cid).order('played_at', { ascending: false }).limit(500);
      if (error) throw error;
      return (data || []).map(mapResultRow);
    }
    return (dbRef.current.results || []).filter((r) => r.classId === cid).sort((a, b) => b.playedAt - a.playedAt);
  }, []);

  const loadSchoolResults = useCallback(async (ids, days) => {
    if (!ids.length) return [];
    const since = days ? Date.now() - days * 864e5 : 0;
    if (REMOTE) {
      let q = supabase.from('game_results').select('*').in('class_id', ids).order('played_at', { ascending: false }).limit(5000);
      if (since) q = q.gte('played_at', new Date(since).toISOString());
      const { data, error } = await q;
      if (error) throw error;
      return (data || []).map(mapResultRow);
    }
    return (dbRef.current.results || []).filter((r) => ids.includes(r.classId) && r.playedAt >= since);
  }, []);

  const loadGlobal = useCallback(async (days) => {
    if (REMOTE) {
      const [a, b] = await Promise.all([
        supabase.rpc('school_leaderboard', { p_days: days }),
        supabase.rpc('class_leaderboard', { p_days: days }),
      ]);
      if (a.error) throw a.error;
      if (b.error) throw b.error;
      const num = (x) => Number(x) || 0;
      return {
        schools: (a.data || []).map((r) => ({ school: r.school, games: num(r.games), points: num(r.points), classes: num(r.classes), teachers: num(r.teachers) })),
        classes: (b.data || []).map((r) => ({ school: r.school, grade: r.grade, letter: r.letter, games: num(r.games), points: num(r.points) })),
      };
    }
    const since = days ? Date.now() - days * 864e5 : 0;
    const d = dbRef.current;
    const cmap = new Map(d.classes.map((c) => [c.id, c]));
    const schools = new Map();
    const classes = new Map();
    (d.results || []).filter((r) => r.playedAt >= since && cmap.has(r.classId)).forEach((r) => {
      const c = cmap.get(r.classId);
      const pts = teamPoints(r);
      const k = normSchool(c.school);
      if (!schools.has(k)) schools.set(k, { school: c.school, games: 0, points: 0, cls: new Set(), tch: new Set() });
      const sc = schools.get(k);
      sc.games += 1; sc.points += pts; sc.cls.add(c.id); sc.tch.add(r.teacherId);
      if (!classes.has(c.id)) classes.set(c.id, { school: c.school, grade: c.grade, letter: c.letter, games: 0, points: 0 });
      const cc = classes.get(c.id);
      cc.games += 1; cc.points += pts;
    });
    return {
      schools: [...schools.values()].map(({ cls, tch, ...x }) => ({ ...x, classes: cls.size, teachers: tch.size })).sort((a, b) => b.points - a.points),
      classes: [...classes.values()].sort((a, b) => b.points - a.points),
    };
  }, []);

  const saveCustomSet = async ({ title, shared, data }) => {
    const editingId = editingSet?.id;
    let m;
    if (REMOTE) {
      const payload = { title, shared, data, subject: subjectId, grade };
      const q = editingId
        ? supabase.from('custom_sets').update(payload).eq('id', editingId)
        : supabase.from('custom_sets').insert({ ...payload, owner_id: teacher.id, owner_name: teacher.name, school: teacher.school });
      const { data: row, error } = await q.select().single();
      if (error) return 'Saqlab bo‘lmadi: ' + errText(error);
      m = mapSetRow(row);
    } else {
      m = {
        ...(editingSet || {}), id: editingId || uid('s'), ownerId: teacher.id, ownerName: teacher.name, school: teacher.school,
        subject: subjectId, grade, title, shared, data, updatedAt: Date.now(),
      };
    }
    updateDb((d) => ({
      ...d,
      customSets: editingId ? (d.customSets || []).map((x) => (x.id === editingId ? m : x)) : [m, ...(d.customSets || [])],
    }));
    setTopicId(`custom-${m.id}`);
    back();
    return null;
  };

  const deleteCustomSet = async (t) => {
    if (REMOTE) {
      const { error } = await supabase.from('custom_sets').delete().eq('id', t.customId);
      if (error) { setDataError('O‘chirib bo‘lmadi: ' + errText(error)); return; }
    }
    updateDb((d) => ({ ...d, customSets: (d.customSets || []).filter((x) => x.id !== t.customId) }));
  };

  const createClass = async (letter, list) => {
    let c;
    if (REMOTE) {
      const { data, error } = await supabase.from('classes').insert({
        school: teacher.school, grade, letter, students: list, created_by: teacher.id, created_by_name: teacher.name,
      }).select().single();
      if (error) {
        if (error.code === '23505') { await reloadRemote(); return `${grade}-${letter} sinfi allaqachon kiritilgan — ro‘yxatdan tanlang`; }
        return 'Saqlab bo‘lmadi: ' + errText(error);
      }
      c = mapClassRow(data);
    } else {
      c = {
        id: uid('c'), school: teacher.school, grade, letter, students: list,
        createdBy: teacher.id, createdByName: teacher.name, updatedAt: Date.now(),
      };
    }
    updateDb((d) => ({ ...d, classes: [...d.classes, c] }));
    setClassId(c.id);
    setGroups(null);
    go('topic');
    return null;
  };

  const saveStudents = async (list) => {
    if (!selectedClass) return;
    if (REMOTE) {
      const { error } = await supabase.from('classes').update({ students: list }).eq('id', selectedClass.id);
      if (error) { setDataError('Ro‘yxatni saqlab bo‘lmadi: ' + errText(error)); return; }
    }
    updateDb((d) => ({ ...d, classes: d.classes.map((c) => (c.id === selectedClass.id ? { ...c, students: list, updatedAt: Date.now() } : c)) }));
    setGroups(null);
  };

  // Administrator amallari: demo rejimda localStorage, Supabase rejimida server API orqali
  const adminActions = {
    saveTeacher: async (editingId, data) => {
      if (REMOTE) {
        try { await adminApi(editingId ? 'updateTeacher' : 'createTeacher', { id: editingId, ...data }); await reloadRemote(); return null; }
        catch (e) { return errText(e); }
      }
      if (editingId) {
        updateDb((d) => ({ ...d, teachers: d.teachers.map((t) => (t.id === editingId ? { ...t, ...data, password: data.password || t.password } : t)) }));
      } else {
        updateDb((d) => ({ ...d, teachers: [...d.teachers, { id: uid('t'), ...data, createdAt: Date.now() }] }));
      }
      return null;
    },
    resetPassword: async (t, password) => {
      if (REMOTE) {
        try { await adminApi('resetPassword', { id: t.id, password }); return null; } catch (e) { return errText(e); }
      }
      updateDb((d) => ({ ...d, teachers: d.teachers.map((x) => (x.id === t.id ? { ...x, password } : x)) }));
      return null;
    },
    deleteTeacher: async (t) => {
      if (REMOTE) {
        try { await adminApi('deleteTeacher', { id: t.id }); await reloadRemote(); return null; } catch (e) { return errText(e); }
      }
      updateDb((d) => ({ ...d, teachers: d.teachers.filter((x) => x.id !== t.id) }));
      return null;
    },
    deleteClass: async (c) => {
      if (REMOTE) {
        const { error } = await supabase.from('classes').delete().eq('id', c.id);
        if (error) return errText(error);
        await reloadRemote();
        return null;
      }
      updateDb((d) => ({ ...d, classes: d.classes.filter((x) => x.id !== c.id) }));
      return null;
    },
    changeAdmin: async ({ current, login, password }) => {
      if (REMOTE) {
        const { error: authErr } = await supabase.auth.signInWithPassword({ email: loginToEmail(db.admin.login), password: current.trim() });
        if (authErr) return 'Joriy parol noto‘g‘ri';
        const { error } = await supabase.auth.updateUser({ password: password.trim() });
        return error ? errText(error) : null;
      }
      if (current !== db.admin.password) return 'Joriy parol noto‘g‘ri';
      updateDb((d) => ({ ...d, admin: { login: login.trim(), password: password.trim() } }));
      return null;
    },
  };

  // Navigatsiya holatiga mos "yo‘l" (breadcrumb)
  const crumbs = [];
  if (['grade', 'class', 'topic', 'lesson', 'game', 'picker', 'play'].includes(step) && subject) crumbs.push(subject.name);
  if (['class'].includes(step) && grade) crumbs.push(`${grade}-sinf`);
  if (['topic', 'lesson', 'game', 'picker', 'play'].includes(step) && selectedClass) crumbs.push(`${classLabel(selectedClass)} sinf`);
  if (['lesson', 'game', 'picker', 'play'].includes(step) && topic) crumbs.push(topic.title);
  if (['picker', 'play'].includes(step) && game) crumbs.push(game.name);
  if (step === 'custom') crumbs.push('O‘z savollarim');
  if (step === 'results') crumbs.push('Reyting');
  if (step === 'guide') crumbs.push('Qo‘llanma');

  // Mavzu topilmasa (masalan, sahifa holati buzilsa) xavfsiz qaytish
  const teacherSteps = ['home', 'subject', 'grade', 'class', 'topic', 'lesson', 'game', 'picker', 'play', 'custom', 'results'];
  const needsTopic = ['lesson', 'game', 'picker', 'play'].includes(step);
  const needsClass = ['topic', 'lesson', 'game', 'picker', 'play', 'custom'].includes(step);
  let safeStep = step;
  if (booting) safeStep = 'boot';
  else if (teacherSteps.includes(step) && !teacher) safeStep = 'login';
  else if (step === 'admin' && !isAdmin) safeStep = 'login';
  else if (step === 'guide' && !teacher && !isAdmin) safeStep = 'login';
  else if (needsClass && !selectedClass) safeStep = grade ? 'class' : 'home';
  else if (needsTopic && !topic) safeStep = 'home';
  else if (step === 'play' && !game) safeStep = 'game';

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50/60 text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        @keyframes dpPop { from { opacity: 0; transform: scale(.96) translateY(6px); } to { opacity: 1; transform: none; } }
        @keyframes dpShake { 0%,100% { transform: translateX(0); } 20%,60% { transform: translateX(-8px); } 40%,80% { transform: translateX(8px); } }
        .dp-pop { animation: dpPop .28s ease-out; }
        .dp-shake { animation: dpShake .4s ease-in-out; }
        @keyframes dpBoom { 0% { transform: scale(.2) rotate(-20deg); opacity: 0; } 60% { transform: scale(1.25) rotate(8deg); opacity: 1; } 100% { transform: scale(1) rotate(0); } }
        .dp-boom { animation: dpBoom .6s cubic-bezier(.2,.9,.3,1.3); }
        @keyframes dpFall { 0% { transform: translateY(0) rotate(0); opacity: 1; } 100% { transform: translateY(110vh) rotate(760deg); opacity: .85; } }
        .dp-confetti { animation-name: dpFall; animation-timing-function: linear; animation-fill-mode: forwards; }
      `}</style>

      <Header
        teacher={teacher || (isAdmin ? { name: 'Bosh administrator', school: 'Barcha maktablar' } : null)}
        crumbs={crumbs}
        onHome={goHome}
        onLogout={logout}
        isFs={isFs}
        toggleFs={toggleFs}
        onHelp={teacher || isAdmin ? () => { markGuideSeen(); if (step !== 'guide') go('guide'); } : null}
      />

      <main className="pb-16">
        {dataError && (
          <div className="mx-auto mt-4 max-w-6xl px-4 md:px-8">
            <div className="flex items-start justify-between gap-3 rounded-2xl bg-rose-50 px-5 py-3 text-base font-semibold text-rose-700">
              <span>Ma’lumotlar bilan ishlashda xato: {dataError}</span>
              <button onClick={() => setDataError('')} aria-label="Yopish"><X size={20} /></button>
            </div>
          </div>
        )}
        {booting && (
          <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-blue-900">
            <Loader2 size={48} className="animate-spin" />
            <p className="text-xl font-semibold">Yuklanmoqda...</p>
          </div>
        )}
        {safeStep === 'login' && <LoginScreen onLogin={doLogin} />}

        {safeStep === 'admin' && <AdminPanel db={db} api={adminActions} loadGlobal={loadGlobal} />}

        {safeStep === 'home' && (
          <HomeScreen
            teacher={teacher}
            schoolClasses={schoolClasses}
            onStart={() => go('subject')}
            onClassResults={(c) => { setClassId(c.id); setGrade(c.grade); setRatingScope('class'); go('results'); }}
            onRating={(scope) => { setRatingScope(scope); go('results'); }}
          />
        )}

        {safeStep === 'guide' && (
          <GuideScreen onBack={back} onStart={teacher ? () => resetTo(['home', 'subject']) : null} />
        )}

        {showWelcome && safeStep === 'home' && (
          <WelcomeModal name={teacher?.name} onClose={markGuideSeen} onGuide={() => { markGuideSeen(); go('guide'); }} />
        )}

        {safeStep === 'results' && (
          <RatingScreen
            key={ratingScope + (selectedClass?.id || '')}
            cls={selectedClass}
            school={teacher?.school}
            schoolClasses={schoolClasses}
            initialScope={ratingScope}
            loadResults={loadResults}
            loadSchoolResults={loadSchoolResults}
            loadGlobal={loadGlobal}
            onBack={back}
          />
        )}

        {safeStep === 'custom' && (
          <CustomSetEditor
            key={editingSet?.id || 'new'}
            initial={editingSet}
            subject={subject}
            grade={grade}
            onSave={saveCustomSet}
            onCancel={back}
          />
        )}

        {safeStep === 'subject' && (
          <SubjectScreen onBack={back} onPick={(id) => { setSubjectId(id); go('grade'); }} />
        )}

        {safeStep === 'grade' && (
          <GradeScreen subject={subject} schoolClasses={schoolClasses} onBack={back} onPick={(g) => { setGrade(g); go('class'); }} />
        )}

        {safeStep === 'class' && (
          <ClassScreen
            key={grade}
            teacher={teacher}
            grade={grade}
            schoolClasses={schoolClasses}
            onBack={back}
            onPick={(id) => { if (id !== classId) setGroups(null); setClassId(id); go('topic'); }}
            onCreate={createClass}
          />
        )}

        {safeStep === 'topic' && (
          <TopicScreen
            key={`${subjectId}-${grade}`}
            subject={subject}
            grade={grade}
            topics={topics}
            lastTopicId={topicId}
            classInfo={classLabel(selectedClass)}
            onBack={back}
            onPick={(id, mode) => { setTopicId(id); go(mode === 'lesson' ? 'lesson' : 'game'); }}
            onResults={() => { setRatingScope('class'); go('results'); }}
            onNewSet={() => { setEditingSet(null); go('custom'); }}
            onEditSet={(t) => { setEditingSet((db.customSets || []).find((x) => x.id === t.customId) || null); go('custom'); }}
            onDeleteSet={deleteCustomSet}
          />
        )}

        {safeStep === 'lesson' && topic && (
          <LessonScreen topic={topic} onBack={back} onGames={() => go('game')} />
        )}

        {safeStep === 'game' && topic && (
          <GameSelectScreen topic={topic} topicIndex={topics.findIndex((t) => t.id === topicId)} onBack={back} onPick={(id) => { setGameId(id); go('picker'); }} />
        )}

        {safeStep === 'picker' && topic && (
          <PickerSetupScreen
            game={game}
            topic={topic}
            classInfo={classLabel(selectedClass)}
            students={students}
            onSaveStudents={saveStudents}
            teamCount={teamCount}
            setTeamCount={setTeamCount}
            groups={groups}
            onOpenPicker={(tab) => setPickerTab(tab)}
            onStart={() => startGame()}
            onBack={back}
          />
        )}

        {safeStep === 'play' && topic && game && (
          <PlayScreen
            game={game}
            topic={topic}
            teams={teams}
            turn={turn}
            award={award}
            nextTurn={nextTurn}
            adjust={adjust}
            gameKey={gameKey}
            onFinish={() => setFinished(true)}
            pickedStudent={pickedStudent}
            updateTeams={setTeams}
            onBack={back}
            onOpenPicker={() => setPickerTab('wheel')}
          />
        )}
      </main>

      {pickerTab && (
        <PickerModal
          initialTab={pickerTab}
          students={students}
          teamCount={teamCount}
          onGroups={(g) => {
            setGroups(g);
            if (step === 'play') {
              setTeams((ts) => ts.map((t, i) => ({ ...t, members: g[i] || t.members })));
            }
          }}
          onClose={() => setPickerTab(null)}
          context={step === 'play' ? 'play' : 'setup'}
          onContinue={(name) => {
            setPickerTab(null);
            if (step === 'play') {
              if (name) {
                setPickedStudent(name);
                const idx = teams.findIndex((t) => t.members.includes(name));
                if (idx >= 0) { turnRef.current = idx; setTurn(idx); }
              }
            } else {
              startGame(name);
            }
          }}
        />
      )}

      {finished && safeStep === 'play' && (
        <ResultModal
          teams={teams}
          saveState={saveState}
          onReplay={replay}
          onOtherGame={() => { setFinished(false); back(); back(); }}
          onTopics={() => { setFinished(false); resetTo(['home', 'subject', 'grade', 'class', 'topic']); }}
        />
      )}

      <footer className="border-t border-blue-100 bg-white py-5 text-center text-base text-slate-500">
        <span className="inline-flex items-center gap-2"><School size={18} /> Dars play — O‘zbekiston maktablari uchun interaktiv darslar</span>
        <span className="mx-3">•</span>
        <span className="inline-flex items-center gap-2"><GraduationCap size={18} /> 5–11-sinflar</span>
      </footer>
    </div>
  );
}
