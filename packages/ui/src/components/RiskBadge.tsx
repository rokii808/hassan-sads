import React from 'react';
import { riskColors } from '../tokens';
import type { RiskLevel } from '@hassan-sads/questionnaire';

interface RiskBadgeProps {
  risk: RiskLevel;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const LABEL: Record<RiskLevel, string> = {
  low: 'Low Risk',
  moderate: 'Moderate Risk',
  high: 'High Risk — See GP',
};

export function RiskBadge({ risk, size = 'md', className = '' }: RiskBadgeProps) {
  const { bg, text, border } = riskColors[risk];
  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { fontSize: 11, padding: '2px 8px', borderRadius: 4 },
    md: { fontSize: 13, padding: '4px 12px', borderRadius: 6 },
    lg: { fontSize: 16, padding: '8px 18px', borderRadius: 8 },
  };

  return (
    <span
      className={className}
      style={{
        display: 'inline-block',
        backgroundColor: bg,
        color: text,
        border: `1.5px solid ${border}`,
        fontWeight: 700,
        letterSpacing: '0.01em',
        ...sizeStyles[size],
      }}
      role="status"
      aria-label={`Risk level: ${LABEL[risk]}`}
    >
      {LABEL[risk]}
    </span>
  );
}
