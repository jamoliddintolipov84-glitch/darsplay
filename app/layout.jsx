import './globals.css';
export const metadata = { title: 'Dars play (beta)', description: 'O‘zbekiston maktablari uchun interaktiv darslar va o‘yinlar' };
export default function RootLayout({ children }) {
  return (<html lang="uz"><body>{children}</body></html>);
}
