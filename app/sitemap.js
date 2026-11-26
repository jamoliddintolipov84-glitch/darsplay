// Sayt xaritasi — Google saytdagi sahifalarni shu ro‘yxatdan topadi
export const dynamic = 'force-static';

export default function sitemap() {
  return [
    {
      url: 'https://darsplay.netlify.app/',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
