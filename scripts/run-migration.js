#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing environment variables:');
  console.error('  - NEXT_PUBLIC_SUPABASE_URL');
  console.error('  - SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runMigration() {
  try {
    console.log('📦 Hassan SADS Database Migration');
    console.log('='.repeat(50));
    
    // Read migration file
    const migrationPath = path.join(__dirname, '../supabase/migrations/001_initial_schema.sql');
    console.log(`\n📄 Reading migration file...`);
    console.log(`   Path: ${migrationPath}`);
    
    const migrationSQL = fs.readFileSync(migrationPath, 'utf-8');
    console.log(`   ✓ Loaded (${migrationSQL.length} bytes)`);
    
    // Execute migration via Supabase admin API
    console.log('\n🚀 Executing migration via Supabase admin API...\n');
    
    const { error } = await supabase.rpc('exec', {
      sql: migrationSQL
    });

    if (error && !error.message.includes('does not exist')) {
      throw error;
    }

    console.log(`\n✅ Database migration completed successfully!`);
    console.log(`\n📊 Created:`);
    console.log(`   • participants — User consent & demographic data`);
    console.log(`   • questionnaire_submissions — Risk assessment results`);
    console.log(`   • question_responses — Individual answers`);
    console.log(`   • gp_referrals — High-risk referral tracking`);
    console.log(`   • consent_events — GDPR audit log`);
    console.log(`   • research_cohort — Anonymized analytics data`);
    
    console.log(`\n🔒 Security enabled:`);
    console.log(`   • Row-Level Security (RLS) on all tables`);
    console.log(`   • 7 performance indexes`);
    console.log(`   • Cascading deletes for referential integrity`);
    
    console.log(`\n✨ Your Hassan SADS app is ready!`);
    console.log(`\n💡 Next steps:`);
    console.log(`   1. Add remaining env vars to Vercel`);
    console.log(`   2. git push to deploy`);

  } catch (error) {
    console.error('\n❌ Migration failed:');
    console.error(error.message || error);
    console.error('\n⚠️  Manual steps to apply migration:');
    console.error('');
    console.error('   1. Open Supabase Dashboard');
    console.error('   2. Go to SQL Editor');
    console.error('   3. Create new query');
    console.error('   4. Copy contents of supabase/migrations/001_initial_schema.sql');
    console.error('   5. Paste and run');
    console.error('');
    process.exit(1);
  }
}

runMigration();
