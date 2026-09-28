'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight, Lock, Mail, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LocalStore } from '@/lib/storage/local-store';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      LocalStore.setUser({
        id: 'user_' + Date.now(),
        email,
        display_name: name || email.split('@')[0],
      });
      setIsLoading(false);
      router.push('/onboarding');
    }, 600);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12">
      <div className="w-full max-w-md glass-panel rounded-3xl p-8 border border-purple-pastel/30 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-deep via-red-deep to-purple-pastel flex items-center justify-center mx-auto shadow-lg shadow-purple-deep/40">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-black text-cinetext-main">Create CineMind Account</h1>
          <p className="text-xs text-cinetext-muted">Unlock personalized movie recommendations powered by AI.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-cinetext-main mb-1.5">Full Name</label>
            <div className="relative">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Cinephile"
                className="w-full bg-background border border-surface-border text-cinetext-main text-xs rounded-xl pl-9 pr-4 py-3 focus:outline-none focus:border-purple-pastel"
              />
              <User className="w-4 h-4 text-cinetext-dim absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-cinetext-main mb-1.5">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@cinemind.ai"
                className="w-full bg-background border border-surface-border text-cinetext-main text-xs rounded-xl pl-9 pr-4 py-3 focus:outline-none focus:border-purple-pastel"
              />
              <Mail className="w-4 h-4 text-cinetext-dim absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-cinetext-main mb-1.5">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-background border border-surface-border text-cinetext-main text-xs rounded-xl pl-9 pr-4 py-3 focus:outline-none focus:border-purple-pastel"
              />
              <Lock className="w-4 h-4 text-cinetext-dim absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <Button type="submit" variant="primary" size="lg" isLoading={isLoading} className="w-full">
            Start Personalized Onboarding <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        <p className="text-center text-xs text-cinetext-muted pt-2">
          Already have an account?{' '}
          <Link href="/login" className="text-purple-pastel font-bold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
