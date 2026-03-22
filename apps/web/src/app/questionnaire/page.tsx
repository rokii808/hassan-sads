'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PhoneFrame from '@/components/PhoneFrame';

const HISTORY_FLAGS = [
  { id: 'fainted', label: 'Fainted during exercise', icon: '🫀', color: '#1A6FFF' },
  { id: 'irregular', label: 'Irregular heartbeat told', icon: '💓', color: '#4A4A5A' },
  { id: 'chest_pain', label: 'Chest pain in exercise', icon: '⚡', color: '#4A4A5A' },
  { id: 'family_death', label: 'Family sudden death <40', icon: '👤', color: '#FF6B35' },
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
  const [selectedActivity, setSelectedActivity] = useState<string>('light');

  const toggleFlag = (id: string) => {
    setSelectedFlags(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    router.push('/results');
  };

  return (
    <PhoneFrame>
      {/* Back */}
      <div style={{ padding: '12px 24px 0' }}>
        <button onClick={() => router.back()} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#0D0D0D' }}>‹</button>
      </div>

      {/* Progress bar */}
      <div style={{ display: 'flex', gap: 4, padding: '12px 28px 0' }}>
        {[1,2,3,4,5,6,7,8].map((i) => (
          <div key={i} style={{
            flex: 1, height: 5, borderRadius: 3,
            background: i <= 4 ? '#1A6FFF' : '#E8E8F0',
          }} />
        ))}
      </div>

      <div style={{ flex: 1, padding: '20px 28px 32px', overflowY: 'auto' }}>
        {/* Section 1 */}
        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0D0D0D', marginBottom: 6 }}>Cardiac History</h1>
        <p style={{ fontSize: 13, color: '#9898A8', marginBottom: 20, lineHeight: 1.5 }}>
          Select all that apply to you or a family member.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 28 }}>
          {HISTORY_FLAGS.map((flag) => {
            const selected = selectedFlags.includes(flag.id);
            return (
              <button
                key={flag.id}
                onClick={() => toggleFlag(flag.id)}
                style={{
                  padding: '16px 12px',
                  border: `2px solid ${selected ? flag.color : '#E8E8F0'}`,
                  borderRadius: 14,
                  background: selected ? (flag.id === 'family_death' ? '#FFF3EE' : '#EEF4FF') : '#fff',
                  cursor: 'pointer',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8,
                  transition: 'all 0.15s ease',
                  fontFamily: 'var(--font)',
                }}
              >
                <span style={{ fontSize: 26 }}>{flag.icon}</span>
                <span style={{
                  fontSize: 12, fontWeight: 600, lineHeight: 1.4,
                  color: selected ? flag.color : '#4A4A5A',
                }}>
                  {flag.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Section 2 */}
        <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0D0D0D', marginBottom: 6 }}>Activity Level</h2>
        <p style={{ fontSize: 13, color: '#9898A8', marginBottom: 16 }}>How active are you weekly?</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 32 }}>
          {ACTIVITY_LEVELS.map((level) => {
            const selected = selectedActivity === level.id;
            return (
              <button
                key={level.id}
                onClick={() => setSelectedActivity(level.id)}
                style={{
                  padding: '16px 12px',
                  border: `2px solid ${selected ? '#1A6FFF' : '#E8E8F0'}`,
                  borderRadius: 14,
                  background: selected ? '#EEF4FF' : '#fff',
                  cursor: 'pointer',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8,
                  fontFamily: 'var(--font)',
                }}
              >
                <span style={{ fontSize: 26 }}>{level.icon}</span>
                <span style={{
                  fontSize: 13, fontWeight: 600,
                  color: selected ? '#1A6FFF' : '#4A4A5A',
                }}>
                  {level.label}
                </span>
              </button>
            );
          })}
        </div>

        <button
          onClick={handleContinue}
          style={{
            width: '100%', padding: '16px', background: '#1A6FFF',
            color: '#fff', border: 'none', borderRadius: 50,
            fontSize: 15, fontWeight: 800, cursor: 'pointer',
            letterSpacing: 0.5, fontFamily: 'var(--font)',
          }}
        >
          CONTINUE
        </button>
      </div>
    </PhoneFrame>
  );
}
