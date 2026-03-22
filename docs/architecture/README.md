# System Architecture

This directory contains the system architecture and user flow diagrams for the Hassan SADS App.

## Files

- `hassan_sads_system_architecture.svg` — Full system architecture (client → gateway → services → data → external)
- `hassan_sads_user_flow.svg` — End-to-end user journey from download through screening, scoring, and GP referral

## Architecture Overview

### Client Layer
- iOS app (React Native / Expo SDK 51) → App Store
- Android app (React Native / Expo SDK 51) → Google Play Store
- Admin portal (Next.js 14) → Clinicians, researchers, parent/guardian flows

### Gateway Layer
- JWT / OAuth 2.0 via Supabase Auth
- Rate limiting (Upstash Redis — 10 submissions per IP per 24h)
- GDPR consent enforcement (checked before every submission)
- TLS 1.3 (Vercel default)

### Services Layer
| Service | Responsibility |
|---------|---------------|
| Questionnaire service | 25-question SADS form, branching logic (showIf), family history |
| Risk scoring engine | Q11/12/13/15/17/18/19/23 flag evaluation; GP referral trigger |
| Data & consent service | Opt-out, full withdrawal, GDPR rights, audit log |
| Analytics & reporting | Cohort dashboards, research exports (CSV/JSON), admin portal |

### Data Layer
| Store | Technology | Notes |
|-------|-----------|-------|
| Primary DB | PostgreSQL (Supabase) | Encrypted at rest, RLS on all 6 tables |
| Object storage | Supabase Storage | GP referral PDFs, questionnaire exports |
| Analytics store | PostgreSQL (separate schema) | research_cohort table — zero PII |
| Cache / rate limit | Redis (Upstash) | Session cache, submission rate limiting |

### External Integrations
| Integration | Purpose |
|-------------|---------|
| SendGrid | GP referral email alerts with PDF attachment |
| Expo Push | In-app notifications to participants |
| Irish Heart Foundation | Referral pathway links (irishheart.ie) |
| CRY Ireland | Family support resource links (crying.ie) |
| EAS (Expo) | Mobile app CI/CD and OTA updates |
| Vercel | Web portal CI/CD and preview deployments |

## Key Security Decisions

1. **Service role key is server-side only** — never sent to mobile or browser clients
2. **RLS enforced at database level** — application-layer auth is a second layer, not the only layer
3. **PII scrubbed from Sentry** — error payloads are sanitised before transmission
4. **research_cohort has no PII columns** — enforced by schema design and application-layer checks
5. **GDPR withdrawal cascades** — deleting a participant row cascades to all related tables
