import React from 'react';
import { colors } from '../tokens';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'consent-proceed' | 'consent-opt-out' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: { backgroundColor: colors.navy, color: colors.white, border: 'none' },
  secondary: { backgroundColor: 'transparent', color: colors.navy, border: `1.5px solid ${colors.navy}` },
  danger: { backgroundColor: colors.coral, color: colors.white, border: 'none' },
  'consent-proceed': { backgroundColor: colors.consentProceed, color: colors.white, border: 'none' },
  'consent-opt-out': { backgroundColor: colors.consentOptOut, color: colors.white, border: 'none' },
  ghost: { backgroundColor: 'transparent', color: colors.textSecondary, border: `1px solid ${colors.border}` },
};

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
  sm: { fontSize: 13, padding: '8px 16px', borderRadius: 8, minHeight: 36 },
  md: { fontSize: 15, padding: '12px 24px', borderRadius: 10, minHeight: 44 },
  lg: { fontSize: 17, padding: '16px 32px', borderRadius: 12, minHeight: 52 },
};

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled,
  children,
  style,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      style={{
        fontFamily: 'var(--font-body, Inter, system-ui, sans-serif)',
        fontWeight: 700,
        letterSpacing: '0.02em',
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        width: fullWidth ? '100%' : undefined,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        transition: 'opacity 0.15s, transform 0.1s',
        ...variantStyles[variant],
        ...sizeStyles[size],
        ...style,
      }}
    >
      {loading ? 'Loading\u2026' : children}
    </button>
  );
}
