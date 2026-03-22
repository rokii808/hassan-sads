import type { Config } from 'tailwindcss';
import { colors, typography } from '@hassan-sads/ui';

const config: Config = {
  content: [],
  theme: {
    extend: {
      colors: {
        navy: colors.navy,
        gold: colors.gold,
        teal: colors.teal,
        coral: colors.coral,
        amber: colors.amber,
        surface: colors.surface,
        card: colors.card,
      },
      fontFamily: {
        display: [typography.fontDisplay, 'Georgia', 'serif'],
        body: [typography.fontBody, 'system-ui', 'sans-serif'],
        mono: [typography.fontMono, 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
