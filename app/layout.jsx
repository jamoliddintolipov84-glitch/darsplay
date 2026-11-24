import '@fontsource-variable/nunito';
import '@fontsource/caveat/latin-ext-700.css';
import '@fontsource/caveat/latin-700.css';
import './globals.css';
export const metadata = { title: 'Dars play (beta)', description: 'O‘zbekiston maktablari uchun interaktiv darslar va o‘yinlar' };
export default function RootLayout({ children }) {
  return (<html lang="uz"><body>{children}</body></html>);
}
