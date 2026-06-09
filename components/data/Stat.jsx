import React from 'react';

/**
 * Novo Ego, Stat
 * Big editorial number + quiet label. The brand states proof with restraint:
 * the figure carries the weight (serif, large), the label stays small + muted.
 */
export function Stat({ value, label, gilt = false }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <span
        style={{
          fontFamily: 'var(--font-statement)',
          fontWeight: 600,
          fontSize: 'clamp(2.25rem, 4vw, 3rem)',
          lineHeight: 1,
          letterSpacing: '-0.01em',
          ...(gilt
            ? {
                background: 'var(--gradient-gold-text)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }
            : { color: 'var(--text)' }),
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-sm)',
          color: 'var(--text-muted)',
          letterSpacing: '0.01em',
        }}
      >
        {label}
      </span>
    </div>
  );
}
