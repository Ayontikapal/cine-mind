import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'purple' | 'red' | 'outline' | 'neutral';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'purple',
  size = 'sm',
  className = '',
}) => {
  const base = 'inline-flex items-center font-medium rounded-full border';
  
  const variants = {
    purple: 'bg-purple-deep/20 text-purple-pastel border-purple-pastel/30',
    red: 'bg-red-deep/20 text-red-primary border-red-primary/30',
    outline: 'bg-transparent text-cinetext-muted border-surface-border',
    neutral: 'bg-secondary text-cinetext-main border-transparent',
  };

  const sizes = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-xs',
  };

  return (
    <span className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
};
