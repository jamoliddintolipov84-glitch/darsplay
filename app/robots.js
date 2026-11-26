// Qidiruv tizimlari (Google, Yandex) uchun ruxsatlar
export const dynamic = 'force-static';

export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://darsplay.netlify.app/sitemap.xml',
    host: 'https://darsplay.netlify.app',
  };
}
