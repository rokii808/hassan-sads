# Hassan SADS App

> *Built in memory of Hassan — so no family faces this again.*

A mobile-first, GDPR-compliant cardiac screening and research platform for **Sudden Arrhythmic Death Syndrome (SADS)** in Ireland. This app screens young people aged 12+ for SADS risk factors before a cardiac event occurs, generates anonymised research data for academic publication, and automates GP referral for high-risk participants.

## What is SADS?

SADS (Sudden Arrhythmic Death Syndrome) is sudden cardiac death in individuals under 40 with no structural heart disease identified at post-mortem. In Ireland, it is the single most common cause of sudden cardiac death in young people — yet its true incidence is more than five times what official records show. Up to 50% of bereaved families carry an identifiable inherited cardiac condition when screened.

## Repository Structure

```
hassan-sads/
├── apps/
│   ├── mobile/          ← Expo React Native app (iOS + Android)
│   └── web/             ← Next.js 14 admin portal + API
├── packages/
│   ├── ui/              ← Shared component library + design tokens
│   ├── db/              ← Supabase client + typed schema
│   ├── questionnaire/   ← 25-question engine + risk scoring logic
│   └── config/          ← Shared ESLint, TS, Tailwind configs
├── supabase/
│   ├── migrations/      ← Versioned SQL migrations
│   └── seed/            ← Dev seed data
└── docs/
    └── architecture/    ← System diagrams
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Mobile | React Native (Expo SDK 51) |
| Admin Portal | Next.js 14 (App Router) |
| Database | Supabase (PostgreSQL + RLS) |
| Auth | Supabase Auth (JWT + Google OAuth) |
| Deployment | Vercel (web) + EAS (mobile) |
| Email | SendGrid |
| Push Notifications | Expo Push |
| Testing | Vitest + Playwright + Maestro |

## Design Tokens

| Token | Hex | Usage |
|-------|-----|-------|
| `--navy` | `#0A1628` | Primary brand, headings |
| `--gold` | `#C9A84C` | Accent, memorial emphasis |
| `--teal` | `#0F6E56` | Success, low risk, proceed |
| `--coral` | `#C04828` | High-risk alerts, referrals |
| `--amber` | `#BA7517` | Moderate risk, warnings |

## Getting Started

```bash
# Prerequisites: Node 20+, pnpm 9+, Supabase CLI, Expo CLI

# Install dependencies
pnpm install

# Set up environment variables
cp apps/web/.env.example apps/web/.env.local
cp apps/mobile/.env.example apps/mobile/.env.local

# Start Supabase locally
supabase start
pnpm db:push

# Run web admin portal
pnpm dev:web

# Run mobile app
pnpm dev:mobile
```

## GDPR Compliance

- Lawful basis: Explicit consent (Article 6(1)(a)) + research exception (Article 89)
- Right to erasure: `/api/withdraw` deletes PII within 24 hours
- Data portability: participants can export their responses as JSON
- `research_cohort` table never stores PII — Row-Level Security enforced at DB level
- Registered with the Irish Data Protection Commission

## Key Risk Flag Questions

High-risk GP referral is triggered if ANY of these are answered affirmatively:

- **Q11** — Fainted or lost consciousness during exercise
- **Q12** — Seizure with no known cause
- **Q13** — Unexplained chest pain during exercise
- **Q15** — Family history of sudden unexplained death before age 40
- **Q17** — Told of an irregular heartbeat
- **Q19** — Takes medication for a heart condition
- **Q25** — Abnormal ECG or heart tracing

## Resources

- [Irish Heart Foundation](https://irishheart.ie)
- [CRY Ireland — Cardiac Risk in the Young](https://www.crying.ie)
- [Cardiac Risk in the Young UK](https://www.cry.org.uk)

---

*Every line of code is a step toward making sure another family gets the warning they deserve.*
