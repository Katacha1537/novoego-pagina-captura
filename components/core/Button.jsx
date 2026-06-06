import React from 'react';

/**
 * Novo Ego — Button
 * Three variants mapped to the brand's CTA hierarchy:
 *   primary   → gilt metallic sweep (the one decisive action)
 *   secondary → gold hairline outline on dark (alternative action)
 *   ghost     → quiet text + underline-on-hover (tertiary)
 * Labels are uppercase + tracked on primary/secondary; sentence on ghost.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  iconLeft = null,
  iconRight = null,
  full = false,
  disabled = false,
  ...rest
}) {
  const pad = size === 'lg' ? '18px 36px' : size === 'sm' ? '10px 20px' : '14px 28px';
  const fontSize = size === 'lg' ? '0.9375rem' : size === 'sm' ? '0.75rem' : '0.8125rem';

  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.6em',
    padding: pad,
    width: full ? '100%' : 'auto',
    fontFamily: 'var(--font-sans)',
    fontSize,
    fontWeight: 700,
    letterSpacing: variant === 'ghost' ? '0.01em' : '0.16em',
    textTransform: variant === 'ghost' ? 'none' : 'uppercase',
    borderRadius: 'var(--radius-pill)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    border: '1px solid transparent',
    transition: 'transform var(--dur-fast) var(--ease-out), background var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out)',
    whiteSpace: 'nowrap',
  };

  const variants = {
    primary: {
      background: 'var(--gradient-gold)',
      color: '#2A1F0C',
      boxShadow: 'var(--glow-gold)',
    },
    secondary: {
      background: 'transparent',
      color: 'var(--accent-bright)',
      borderColor: 'var(--border-accent)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-soft)',
      letterSpacing: '0.01em',
    },
  };

  const onEnter = (e) => {
    if (disabled) return;
    e.currentTarget.style.transform = 'translateY(-1px)';
    if (variant === 'secondary') {
      e.currentTarget.style.background = 'rgba(201,168,106,0.08)';
      e.currentTarget.style.borderColor = 'var(--accent)';
    }
    if (variant === 'ghost') e.currentTarget.style.color = 'var(--accent-bright)';
  };
  const onLeave = (e) => {
    if (disabled) return;
    e.currentTarget.style.transform = 'translateY(0)';
    if (variant === 'secondary') {
      e.currentTarget.style.background = 'transparent';
      e.currentTarget.style.borderColor = 'var(--border-accent)';
    }
    if (variant === 'ghost') e.currentTarget.style.color = 'var(--text-soft)';
  };
  const onDown = (e) => { if (!disabled) e.currentTarget.style.transform = 'translateY(0) scale(0.98)'; };
  const onUp = (e) => { if (!disabled) e.currentTarget.style.transform = 'translateY(-1px)'; };

  return (
    <button
      style={{ ...base, ...variants[variant] }}
      disabled={disabled}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onMouseDown={onDown}
      onMouseUp={onUp}
      {...rest}
    >
      {iconLeft}
      <span>{children}</span>
      {iconRight}
    </button>
  );
}
