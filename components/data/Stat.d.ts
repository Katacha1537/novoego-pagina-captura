import React from 'react';

export interface StatProps {
  /** The figure, pre-formatted (e.g. "5.000+", "7+"). */
  value: React.ReactNode;
  /** Short muted descriptor below the figure. */
  label: React.ReactNode;
  /** Render the figure in gilt gradient. @default false */
  gilt?: boolean;
}

/**
 * A single proof figure. Group 3–4 in a row separated by hairline dividers.
 * Use gilt sparingly, at most one gilt stat in a row, as the hero number.
 */
export function Stat(props: StatProps): JSX.Element;
