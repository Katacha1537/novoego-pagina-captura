import React from 'react';

/**
 * Novo Ego, Pill
 * The brand's signature eyebrow capsule: a hairline-bordered lozenge holding
 * an optional icon + tracked uppercase label. Used above headlines as a
 * section flag ("A NOVA CIÊNCIA DA MENTE", "ENTREGÁVEIS", "EQUIPE ESPECIALIZADA").
 */
export function Pill({ children, icon = null, tone = 'default', ...rest }) {
  const tones = {
    default: { color: 'var(--text-soft)', borderColor: 'var(--border)', background: 'rgba(244,239,231,0.02)' },
    gold:    { color: 'var(--accent-bright)', borderColor: 'var(--border-accent)', background: 'rgba(201,168,106,0.06)' },
  };
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.55em',
        padding: '8px 16px',
        borderRadius: 'var(--radius-pill)',
        border: '1px solid',
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-eyebrow)',
        fontWeight: 600,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        lineHeight: 1,
        ...tones[tone],
      }}
      {...rest}
    >
      {icon && <span style={{ display: 'inline-flex', color: 'var(--accent)' }}>{icon}</span>}
      {children}
    </span>
  );
}
