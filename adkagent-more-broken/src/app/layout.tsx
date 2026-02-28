import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

/**
 * Load Inter font properly using Next.js font optimization
 */
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'WikiAgent - AI-Powered Wikipedia Assistant',
  description: 'Factual answers powered by Wikipedia and GenAI',
};

/**
 * Root Layout Component
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-body antialiased`}>
        {children}
      </body>
    </html>
  );
}