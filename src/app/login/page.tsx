'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight, Lock, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LocalStore } from '@/lib/storage/local-store';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }
    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      LocalStore.setUser({
        id: 'user_' + Date.now(),
        email,
        display_name: email.split('@')[0],
      });
      setIsLoading(false);
      router.push('/');
    }, 600);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12">
      <div className="w-full max-w-md glass-panel rounded-3xl p-8 border border-purple-pastel/30 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-deep via-red-deep to-purple-pastel flex items-center justify-center mx-auto shadow-lg shadow-purple-deep/40">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-black text-cinetext-main">Welcome Back</h1>
          <p className="text-xs text-cinetext-muted">Log in to your personalized CineMind account.</p>
        </div>

        {error && (
          <div className="bg-red-deep/20 border border-red-primary/40 text-red-primary text-xs p-3 rounded-xl font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-bold text-cinetext-main">Password</label>
              <Link href="/forgot-password" className="text-[11px] text-purple-pastel hover:underline">
                Forgot password?
              </Link>
            </div>
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
            Log In <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        <p className="text-center text-xs text-cinetext-muted pt-2">
          Don't have an account?{' '}
          <Link href="/signup" className="text-purple-pastel font-bold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
