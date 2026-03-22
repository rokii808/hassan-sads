import React from 'react';
import { colors, spacing, borderRadius, shadows } from '../tokens';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  padding?: 'sm' | 'md' | 'lg';
}

export function Card({ children, className, style, padding = 'md' }: CardProps) {
  const paddingMap = { sm: spacing.sm, md: spacing.md, lg: spacing.lg };
  return (
    <div
      className={className}
      style={{
        backgroundColor: colors.card,
        borderRadius: borderRadius.lg,
        border: `1px solid ${colors.border}`,
        padding: paddingMap[padding],
        ...shadows.card,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
