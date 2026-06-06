import React from 'react';

export interface ChecklistItemProps {
  children: React.ReactNode;
}
export interface ChecklistProps {
  /** Items as strings or nodes. */
  items?: React.ReactNode[];
  /** Column count for the grid. @default 1 */
  columns?: number;
}

/** A single gold-tick line item. */
export function ChecklistItem(props: ChecklistItemProps): JSX.Element;
/** Grid of gold-tick deliverables (1 or 2 columns). */
export function Checklist(props: ChecklistProps): JSX.Element;
