import type {Metadata} from 'next';
import './globals.css';
import {ThemeProvider} from '@/components/providers/theme-provider';

export const metadata: Metadata = {
  title: "Miki's website",
  description: "Miki's digital home"
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="zh-TW">
      <body><ThemeProvider>{children}</ThemeProvider></body>
    </html>
  );
}
