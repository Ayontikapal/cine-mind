'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Sparkles, Search, Bookmark, History, Dna, User, LogOut, Settings, Film, Menu, X } from 'lucide-react';
import { LocalStore } from '@/lib/storage/local-store';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setUser(LocalStore.getUser());
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/discover?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/discover', label: 'Discover' },
    { href: '/my-list', label: 'My List' },
    { href: '/history', label: 'History' },
    { href: '/taste-profile', label: 'Taste Profile' },
  ];

  const handleLogout = () => {
    LocalStore.clearUser();
    router.push('/login');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/90 backdrop-blur-md border-b border-surface-border shadow-2xl py-3'
          : 'bg-gradient-to-b from-background/90 via-background/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-deep via-red-deep to-purple-pastel flex items-center justify-center shadow-lg shadow-purple-deep/30 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-purple-pastel via-cinetext-main to-red-primary bg-clip-text text-transparent">
              CineMind
            </span>
            <span className="hidden sm:block text-[10px] text-cinetext-muted font-medium tracking-wider uppercase -mt-1">
              Movies that get you
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-surface/60 border border-surface-border p-1.5 rounded-2xl backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-1.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-deep to-red-deep text-white shadow-md shadow-purple-deep/20'
                    : 'text-cinetext-muted hover:text-cinetext-main hover:bg-surface-hover'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {/* Search bar */}
          <form onSubmit={handleSearchSubmit} className="relative hidden sm:block w-48 md:w-60">
            <input
              type="text"
              placeholder="Search movies, directors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface/80 border border-surface-border text-cinetext-main text-xs rounded-xl pl-9 pr-4 py-2 focus:outline-none focus:border-purple-pastel/60 focus:ring-1 focus:ring-purple-pastel/40 transition-all placeholder:text-cinetext-dim"
            />
            <Search className="w-4 h-4 text-cinetext-muted absolute left-3 top-1/2 -translate-y-1/2" />
          </form>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 p-1.5 rounded-xl border border-surface-border hover:border-purple-pastel/40 bg-surface/80 transition-all"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-deep to-red-primary flex items-center justify-center font-bold text-xs text-white">
                {user?.display_name ? user.display_name.charAt(0).toUpperCase() : 'A'}
              </div>
              <span className="hidden lg:block text-xs font-medium text-cinetext-main max-w-[100px] truncate">
                {user?.display_name || 'Alex'}
              </span>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 glass-panel rounded-2xl shadow-2xl p-2 border border-purple-pastel/20 space-y-1 z-50">
                <div className="px-3 py-2 border-b border-surface-border">
                  <p className="text-xs font-bold text-cinetext-main">{user?.display_name || 'Alex Cinephile'}</p>
                  <p className="text-[11px] text-cinetext-muted truncate">{user?.email || 'alex@cinemind.ai'}</p>
                </div>

                <Link
                  href="/taste-profile"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-xs text-cinetext-main hover:bg-surface-hover rounded-xl transition-colors"
                >
                  <Dna className="w-4 h-4 text-purple-pastel" /> Taste DNA
                </Link>

                <Link
                  href="/settings"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-xs text-cinetext-main hover:bg-surface-hover rounded-xl transition-colors"
                >
                  <Settings className="w-4 h-4 text-cinetext-muted" /> Settings & Privacy
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-primary hover:bg-red-deep/20 rounded-xl transition-colors text-left"
                >
                  <LogOut className="w-4 h-4" /> Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
