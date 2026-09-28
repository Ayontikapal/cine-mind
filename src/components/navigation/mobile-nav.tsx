'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Bookmark, Dna } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/discover', label: 'Discover', icon: Compass },
    { href: '/my-list', label: 'My List', icon: Bookmark },
    { href: '/taste-profile', label: 'Taste', icon: Dna },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-lg border-t border-surface-border px-6 py-2">
      <div className="flex justify-around items-center">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                isActive ? 'text-purple-pastel font-semibold' : 'text-cinetext-muted hover:text-cinetext-main'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-purple-pastel scale-110' : ''}`} />
              <span className="text-[10px]">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
