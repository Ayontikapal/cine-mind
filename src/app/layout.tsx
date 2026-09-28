import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/navigation/navbar';
import { MobileNav } from '@/components/navigation/mobile-nav';
import { Footer } from '@/components/navigation/footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'CineMind — Personalized AI Movie Recommendation Engine',
  description: 'CineMind learns your movie taste from interactions, authorized signals, and viewing preferences to deliver tailored movie recommendations with match scores.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="bg-background text-cinetext-main min-h-screen flex flex-col antialiased selection:bg-purple-deep selection:text-white">
        <Navbar />
        <main className="flex-1 pt-24 pb-20 md:pb-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {children}
        </main>
        <MobileNav />
        <Footer />
      </body>
    </html>
  );
}
