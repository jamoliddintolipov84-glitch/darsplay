import '@fontsource-variable/nunito';
import '@fontsource/lora/latin-ext-600-italic.css';
import '@fontsource/lora/latin-600-italic.css';
import './globals.css';
const SITE_URL = 'https://darsplay.netlify.app';
const TITLE = 'Dars play — Ona tili va Adabiyot uchun interaktiv darslar va o‘yinlar';
const DESCRIPTION =
  'O‘qituvchilar uchun tayyor interaktiv darslar va o‘yinlar: 8–9-sinf Ona tili va Adabiyot, rasmiy taqvim-mavzu reja asosida. Proyektor va interaktiv doska uchun, jamoaviy o‘yinlar va baraban bilan.';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: '%s | Dars play' },
  description: DESCRIPTION,
  applicationName: 'Dars play',
  keywords: [
    'Dars play',
    'darsplay',
    'ona tili interaktiv o‘yinlar',
    'adabiyot interaktiv dars',
    '8-sinf ona tili',
    '9-sinf adabiyot',
    'o‘qituvchi uchun o‘yinlar',
    'interaktiv doska o‘yinlar',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Dars play',
    title: TITLE,
    description: DESCRIPTION,
    locale: 'uz_UZ',
  },
  robots: { index: true, follow: true },
  // Google Search Console tasdiqlash kodi shu yerga qo‘yiladi:
  // verification: { google: 'KOD' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Dars play',
  alternateName: 'darsplay',
  url: SITE_URL,
  inLanguage: 'uz',
  description: DESCRIPTION,
};

export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
