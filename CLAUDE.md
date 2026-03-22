# Hassan SADS App — Claude Code Instructions

Built in memory of Hassan — so no family faces this again.

## Project
Monorepo. pnpm workspaces. TypeScript everywhere. Do not use npm or yarn.

## Commands
- Install: pnpm install
- Dev (web): pnpm --filter web dev
- Dev (mobile): pnpm --filter mobile start
- Test: pnpm test
- DB types: supabase gen types typescript --local > packages/db/src/types.generated.ts
- Migrations: supabase db push

## Architecture rules
- Shared logic lives in packages/. Never duplicate between apps/mobile and apps/web.
- Scoring logic lives in packages/questionnaire/src/scoring.ts ONLY.
- Never put scoring logic in API routes or components.
- Supabase service-role key: server-side ONLY. Never import in mobile or client components.
- All API routes validate with Zod before touching the database.

## Compliance rules (non-negotiable)
- Never log PII. Participant email, name, DOB must NEVER appear in logs or Sentry.
- research_cohort table: never write PII columns. Enforce at insert time.
- Consent must be checked before any submission is processed.
- Data withdrawal: participant_id deletion must cascade to ALL related tables.
- Ages 12–17: parent/guardian co-signature required before questionnaire can proceed.

## Design
- Use design tokens from packages/ui/src/tokens.ts. No hardcoded hex values in components.
- Consent gate: BLUE opt-out button, GREEN proceed button. These colours are NON-NEGOTIABLE.
- Results screen language: max reading age 14. No medical jargon.
- Colour tokens: --navy #0A1628, --gold #C9A84C, --teal #0F6E56, --coral #C04828, --amber #BA7517

## Testing
- Every scoring function must have unit tests in packages/questionnaire/__tests__/.
- Every API route must have an integration test in apps/web/__tests__/api/.
- Mobile E2E: Maestro flows for consent, questionnaire, results.
- Run pnpm test before every commit.
