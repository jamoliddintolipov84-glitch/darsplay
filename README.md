# Dars play

O‘zbekiston maktablari (5–11-sinflar) uchun interaktiv darslar va o‘yinlar platformasi.

## Ishga tushirish (Windows)

**`ishga-tushirish.bat`** faylini ikki marta bosing. Birinchi safar paketlar o‘rnatiladi (1–3 daqiqa), keyin brauzer o‘zi ochiladi: http://localhost:3000

Kompyuterda Node.js bo‘lishi kerak — bo‘lmasa, fayl https://nodejs.org saytini ochadi (LTS versiyasini o‘rnating).

Qo‘lda ishga tushirish:

```bash
npm install
npm run dev
```

## Papka tarkibi

```
darsplay/
├── ishga-tushirish.bat     ← ikki marta bosing
├── README.md               ← shu fayl
├── .env.local              ← Supabase manzili va kaliti
├── package.json, next.config.mjs, postcss.config.mjs
├── app/
│   ├── page.jsx            ← butun ilova: darslar, o‘yinlar, admin panel
│   ├── layout.jsx
│   └── globals.css
└── supabase/               ← baza sxemasi (nusxa)
```

## Hozirgi kontent

- **8-sinf Ona tili** (2025-yil darsligi): 80 ta mavzu — butun darslik, I–X boblar (7–222-betlar). Har bir mavzuda kengaytirilgan tushuntirish slaydlari va o‘yinlar.
- **8-sinf Adabiyot** (2025-yil darsligi): butun darslik — 56 ta dars, I–IV choraklar (4–238-betlar). Mavzular choraklar bo‘yicha guruhlangan, BSB/CHSB darslari kiritilmagan.
- **9-sinf Ona tili** (2025-yil darsligi): 60 ta mavzu (7–168-betlar, I–VIII bo‘limlar). Har bir mavzuda yangi imlo o‘yinlari: «Qaysi harf?» (x/h, q/k, b/p ...) va «Imlo bellashuvi».
- Qolgan fan va sinflar uchun umumiy savollar bilan namunaviy mavzular.
- **15 ta o‘yin:** Test, Rostmi?, Millioner, Savol-javob, Moslashtirish, Harflar, Xotira, Yashirin so‘z, Joyda, Portlash, Poyga, hamda fikrlash o‘yinlari — Voqealar zanjiri, Ortiqchasini top, Bahs maydoni, Ijodiy topshiriq. Har darsda boshqacha o‘yinlar to‘plami taklif qilinadi.
- **O‘quvchi tanlash:** kamera, ro‘yxat (avtomatik guruhlash), baraban.

## Kirish

- **Bosh administrator:** login `admin`, parol sizga alohida berilgan. Birinchi kirishda **Sozlamalar** bo‘limidan o‘zgartiring.
- **O‘qituvchilar:** login va parolni admin panelida yaratasiz.

## Supabase

- Loyiha: `darsplay` (Frankfurt) — https://supabase.com/dashboard/project/xdnkcgueabswatthhlyj
- Ma’lumotlar bulutda saqlanadi: istalgan kompyuterdan bir xil sinflar va ro‘yxatlar ko‘rinadi.
- Xavfsizlik: o‘qituvchi faqat o‘z maktabining sinflarini ko‘radi; o‘qituvchi yaratish va o‘chirish faqat administratorga ruxsat etilgan; ommaviy ro‘yxatdan o‘tish yopiq.
- `supabase/` papkasida bazaning sxemasi (nusxa sifatida, qayta qo‘llash shart emas).

## Internetga joylash (beta)

Loyiha statik sayt sifatida yig‘iladi (`npm run build` → `out/` papkasi). Tayyor sayt `darsplay-sayt.zip` ichida.

**Eng oson yo‘l — Netlify Drop (2 daqiqa):**
1. https://app.netlify.com/drop saytini oching va Netlify'da ro‘yxatdan o‘ting (Google bilan ham bo‘ladi).
2. `darsplay-sayt.zip` ni oching va ichidagi **`darsplay-sayt`** papkasini sahifaga sudrab tashlang.
3. Bir necha soniyada sayt manzili chiqadi (masalan `https://...netlify.app`). Uni **Site configuration → Change site name** orqali `darsplay` kabi nomga o‘zgartirish mumkin.

**Vercel orqali (GitHub bilan):**
1. Shu `darsplay` papkasini GitHub'ga yuklang.
2. https://vercel.com → **Add New → Project** → repozitoriyni tanlang.
3. **Environment Variables** bo‘limiga `.env.local` dagi ikki qiymatni kiriting → **Deploy**.

Kontent yangilansa: `npm run build` qiling va yangi `out/` papkasini Netlify'ga qayta tashlang (**Deploys** bo‘limi).
