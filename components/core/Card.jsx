import React from 'react';

/**
 * Novo Ego — Card
 * The base dark surface: warm ink fill, hairline border, top bevel + soft
 * cast shadow. `feature` adds a larger radius and a faint inner gold wash for
 * the headline panels ("Páginas de Venda Persuasivas" style blocks).
 */
export function Card({ children, variant = 'default', interactive = false, style = {}, ...rest }) {
  const variants = {
    default: { borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)' },
    feature: { borderRadius: 'var(--radius-xl)', padding: 'var(--space-7)' },
    quote:   { borderRadius: 'var(--radius-md)', padding: 'var(--space-5)', borderLeft: '2px solid var(--accent)' },
  };

  const onEnter = (e) => {
    if (!interactive) return;
    e.currentTarget.style.transform = 'translateY(-3px)';
    e.currentTarget.style.borderColor = 'var(--border-accent)';
    e.currentTarget.style.boxShadow = 'var(--bevel-top), var(--shadow-lg)';
  };
  const onLeave = (e) => {
    if (!interactive) return;
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.borderColor = 'var(--border)';
    e.currentTarget.style.boxShadow = 'var(--elev-card)';
  };

  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        background: variant === 'quote' ? 'rgba(244,239,231,0.02)' : 'var(--surface)',
        border: '1px solid var(--border)',
        boxShadow: 'var(--elev-card)',
        transition: 'transform var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
        ...variants[variant],
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
