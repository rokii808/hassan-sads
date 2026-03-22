/**
 * Hassan SADS Design Tokens
 * ——————————————————————————
 * DO NOT use hardcoded hex values in components. Import from here instead.
 * These tokens are the single source of truth for the Hassan SADS brand.
 *
 * Designed with WCAG AA contrast ratios on --surface background.
 */

export const colors = {
  /** Primary brand, headings, navigation background */
  navy: '#0A1628',
  /** Accent, CTA borders, memorial emphasis */
  gold: '#C9A84C',
  /** Success states, low risk, proceed actions */
  teal: '#0F6E56',
  /** High-risk alerts, referral CTAs — NON-NEGOTIABLE for high-risk */
  coral: '#C04828',
  /** Moderate risk, warnings — NON-NEGOTIABLE for moderate risk */
  amber: '#BA7517',
  /** Page background */
  surface: '#F8F9FB',
  /** Card backgrounds */
  card: '#FFFFFF',
  /** Body text */
  textPrimary: '#0A1628',
  /** Muted / supporting text */
  textSecondary: '#5F5E5A',
  /** Consent opt-out button — BLUE, non-negotiable per GDPR spec */
  consentOptOut: '#1A6FFF',
  /** Consent proceed button — GREEN, non-negotiable per GDPR spec */
  consentProceed: '#0F6E56',
  /** Border colour */
  border: '#E2E4E9',
  /** Input field background */
  inputBg: '#F4F5F7',
  /** Error state */
  error: '#C04828',
  /** White */
  white: '#FFFFFF',
  /** Transparent */
  transparent: 'transparent',
} as const;

export type ColorKey = keyof typeof colors;

export const typography = {
  fontDisplay: 'DM Serif Display',
  fontBody: 'Inter',
  fontMono: 'JetBrains Mono',
  sizeXs: 12,
  sizeSm: 14,
  sizeBase: 16,
  sizeLg: 20,
  sizeXl: 24,
  size2xl: 32,
  size3xl: 48,
  weightRegular: '400',
  weightMedium: '500',
  weightSemibold: '600',
  weightBold: '700',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
} as const;

export const borderRadius = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  full: 9999,
} as const;

export const shadows = {
  card: {
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  modal: {
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 24,
    elevation: 10,
  },
} as const;

/** Risk level colour mapping — used by RiskBadge and results screen */
export const riskColors: Record<'low' | 'moderate' | 'high', { bg: string; text: string; border: string }> = {
  low: { bg: '#E6F4F0', text: colors.teal, border: colors.teal },
  moderate: { bg: '#FEF3CD', text: colors.amber, border: colors.amber },
  high: { bg: '#FAEAE5', text: colors.coral, border: colors.coral },
};

/** CSS custom properties string for web (inject into :root) */
export const cssVariables = `
  --color-navy: ${colors.navy};
  --color-gold: ${colors.gold};
  --color-teal: ${colors.teal};
  --color-coral: ${colors.coral};
  --color-amber: ${colors.amber};
  --color-surface: ${colors.surface};
  --color-card: ${colors.card};
  --color-text-primary: ${colors.textPrimary};
  --color-text-secondary: ${colors.textSecondary};
  --color-consent-opt-out: ${colors.consentOptOut};
  --color-consent-proceed: ${colors.consentProceed};
  --color-border: ${colors.border};
  --color-error: ${colors.error};
  --font-display: '${typography.fontDisplay}', Georgia, serif;
  --font-body: '${typography.fontBody}', system-ui, sans-serif;
  --font-mono: '${typography.fontMono}', monospace;
`;
