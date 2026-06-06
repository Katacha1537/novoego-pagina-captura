import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual hierarchy. @default "primary" */
  variant?: 'primary' | 'secondary' | 'ghost';
  /** @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Optional leading icon node (e.g. a 16px Lucide SVG). */
  iconLeft?: React.ReactNode;
  /** Optional trailing icon node. */
  iconRight?: React.ReactNode;
  /** Stretch to container width. @default false */
  full?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

/**
 * Primary CTA for Novo Ego. Use exactly ONE primary (gilt) button per view —
 * it marks the single decisive action. Pair with a secondary outline button
 * for alternatives. Ghost for low-stakes tertiary links.
 *
 * @startingPoint section="Core" subtitle="Gilt / outline / ghost CTAs" viewport="700x160"
 */
export function Button(props: ButtonProps): JSX.Element;
