import '@fontsource-variable/nunito';
import '@fontsource/lora/latin-ext-600-italic.css';
import '@fontsource/lora/latin-600-italic.css';
import './globals.css';
export const metadata = { title: 'Dars play', description: 'O‘zbekiston maktablari uchun interaktiv darslar va o‘yinlar' };
export default function RootLayout({ children }) {
  return (<html lang="uz"><body>{children}</body></html>);
}
