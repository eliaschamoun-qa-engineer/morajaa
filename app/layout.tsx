import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import './globals.css'; // Make sure your Tailwind CSS is imported here

const cairo = Cairo({ subsets: ['arabic'], weight: ['400', '700'] });

export const metadata: Metadata = {
  title: 'مراجعة - تقييماتك الموثوقة للشركات',
  description: 'منصة مراجعة لتقييم المطورين العقاريين وتجار السيارات في لبنان.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={cairo.className}>{children}</body>
    </html>
  );
}