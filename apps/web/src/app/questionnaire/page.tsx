'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AppShell from '@/components/AppShell';

const HISTORY_FLAGS = [
  { id: 'fainted', label: 'Fainted during exercise', icon: '🫀', cls: 'on-blue' },
  { id: 'irregular', label: 'Irregular heartbeat told', icon: '💓', cls: 'on-blue' },
  { id: 'chest_pain', label: 'Chest pain in exercise', icon: '⚡', cls: 'on-blue' },
  { id: 'family_death', label: 'Family sudden death <40', icon: '👤', cls: 'on-orange' },
];

const ACTIVITY_LEVELS = [
  { id: 'sedentary', label: 'Sedentary', icon: '🪑' },
  { id: 'light', label: 'Light activity', icon: '🚶' },
  { id: 'active', label: 'Active', icon: '🏃' },
  { id: 'very_active', label: 'Very active', icon: '🏋️' },
];

export default function QuestionnairePage() {
  const router = useRouter();
  const [selectedFlags, setSelectedFlags] = useState<string[]>(['fainted', 'family_death']);
  const [selectedActivity, setSelectedActivity] = useState('light');

  const toggle = (id: string) =>
    setSelectedFlags(p => p.includes(id) ? p.filter(f => f !== id) : [...p, id]);

  return (
    <AppShell activeNav="questionnaire">
      <div className="app-card">
        <a href="/" style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 600, textDecoration: 'none', display: 'inline-block', marginBottom: 20 }}>← Back</a>

        {/* Progress */}
        <div className="progress-bar">
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`progress-bar-seg${i < 4 ? ' done' : ''}`} />
          ))}
        </div>

        <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--black)', letterSpacing: '-0.02em', marginBottom: 6 }}>Cardiac History</h1>
        <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 20, lineHeight: 1.6 }}>
          Select all that apply to you or a family member.
        </p>

        <div className="sel-grid" style={{ marginBottom: 28 }}>
          {HISTORY_FLAGS.map(f => (
            <button
              key={f.id}
              onClick={() => toggle(f.id)}
              className={`sel-card${selectedFlags.includes(f.id) ? ` ${f.cls}` : ''}`}
            >
              <span className="sel-card-icon">{f.icon}</span>
              <span className="sel-card-label">{f.label}</span>
            </button>
          ))}
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--black)', letterSpacing: '-0.02em', marginBottom: 6 }}>Activity Level</h2>
        <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 16 }}>How active are you weekly?</p>

        <div className="sel-grid" style={{ marginBottom: 32 }}>
          {ACTIVITY_LEVELS.map(a => (
            <button
              key={a.id}
              onClick={() => setSelectedActivity(a.id)}
              className={`sel-card${selectedActivity === a.id ? ' on-blue' : ''}`}
            >
              <span className="sel-card-icon">{a.icon}</span>
              <span className="sel-card-label">{a.label}</span>
            </button>
          ))}
        </div>

        <button onClick={() => router.push('/results')} className="btn-primary">
          Continue
        </button>
      </div>
    </AppShell>
  );
}
