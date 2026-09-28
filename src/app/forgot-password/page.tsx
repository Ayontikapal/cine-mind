'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Mail, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12">
      <div className="w-full max-w-md glass-panel rounded-3xl p-8 border border-purple-pastel/30 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-deep via-red-deep to-purple-pastel flex items-center justify-center mx-auto shadow-lg shadow-purple-deep/40">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-black text-cinetext-main">Reset Password</h1>
          <p className="text-xs text-cinetext-muted">We will send a password reset link to your email.</p>
        </div>

        {submitted ? (
          <div className="bg-purple-deep/20 border border-purple-pastel/40 p-4 rounded-2xl text-center space-y-2">
            <Check className="w-8 h-8 text-purple-pastel mx-auto" />
            <p className="text-xs font-bold text-cinetext-main">Reset Link Sent</p>
            <p className="text-[11px] text-cinetext-muted">Check your inbox ({email}) for instructions.</p>
            <Link href="/login" className="inline-block pt-2 text-xs font-bold text-purple-pastel hover:underline">
              Back to Login
            </Link>
          </div>
        ) : (
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

            <Button type="submit" variant="primary" size="lg" className="w-full">
              Send Reset Instructions
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
