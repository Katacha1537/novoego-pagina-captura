import React from 'react';

export interface PillProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Tracked uppercase label text. */
  children: React.ReactNode;
  /** Optional leading icon (≈14px). Tinted gold automatically. */
  icon?: React.ReactNode;
  /** @default "default" */
  tone?: 'default' | 'gold';
}

/**
 * Eyebrow capsule placed ABOVE a headline to flag a section or claim.
 * Keep the label to 1–4 words. Centered above centered heros; left-aligned
 * above left-aligned blocks.
 */
export function Pill(props: PillProps): JSX.Element;
