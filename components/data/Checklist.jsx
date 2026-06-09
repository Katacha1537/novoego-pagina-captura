import React from 'react';

/**
 * Novo Ego, Checklist + ChecklistItem
 * Gold tick + sand text. Mirrors the "O que você vai receber" deliverable
 * lists. Ticks are circular, gold-outlined, with a sage check inside.
 */
export function ChecklistItem({ children }) {
  return (
    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', listStyle: 'none' }}>
      <span
        aria-hidden="true"
        style={{
          flex: 'none',
          width: '20px',
          height: '20px',
          marginTop: '2px',
          borderRadius: '50%',
          border: '1px solid var(--border-accent)',
          background: 'rgba(201,168,106,0.08)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--accent-bright)',
          fontSize: '11px',
          lineHeight: 1,
        }}
      >
        ✓
      </span>
      <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', lineHeight: 1.5, color: 'var(--text-soft)' }}>
        {children}
      </span>
    </li>
  );
}

export function Checklist({ items = [], columns = 1 }) {
  return (
    <ul
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap: '14px 32px',
        margin: 0,
        padding: 0,
      }}
    >
      {items.map((it, i) => (
        <ChecklistItem key={i}>{it}</ChecklistItem>
      ))}
    </ul>
  );
}
