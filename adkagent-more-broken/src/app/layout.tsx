import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils'; // Ensure you have this utility

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans', // CHANGED: Standard naming for Shadcn/Tailwind
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'WikiAgent',
  description: 'AI-Powered Wikipedia Search Engine',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className={cn(
          "min-h-screen bg-slate-50 font-sans antialiased text-slate-900", // Light professional background
          inter.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}