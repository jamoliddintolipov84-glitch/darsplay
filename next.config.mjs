/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Statik sayt sifatida eksport (Netlify, Vercel, istalgan hosting uchun)
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
};
export default nextConfig;
