import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** @default "default" */
  variant?: 'default' | 'feature' | 'quote';
  /** Lift + gold border on hover. @default false */
  interactive?: boolean;
}

/**
 * The base dark surface for grouped content. `feature` for large headline
 * panels, `quote` for pull-quotes (gold left rule). Never stack a card on a
 * card — keep one elevation level per region.
 */
export function Card(props: CardProps): JSX.Element;
