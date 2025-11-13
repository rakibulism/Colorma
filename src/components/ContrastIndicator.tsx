import React from 'react';
import { getContrastRatio } from '../utils/colorUtils';

interface ContrastIndicatorProps {
  foreground: string;
  background: string;
  label: string;
  compact?: boolean;
}

export function ContrastIndicator({ foreground, background, label, compact = false }: ContrastIndicatorProps) {
  const ratio = getContrastRatio(foreground, background);
  const meetsAA = ratio >= 4.5;
  const meetsAAA = ratio >= 7;

  const getStatus = () => {
    if (meetsAAA) return { text: 'AAA', color: '#10b981' }; // green
    if (meetsAA) return { text: 'AA', color: '#f59e0b' }; // amber
    return { text: 'Fail', color: '#ef4444' }; // red
  };

  const status = getStatus();

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <span style={{ fontSize: 'var(--text-xs)', color: '#aaa', minWidth: '60px' }}>{label}</span>
        <span style={{ fontSize: 'var(--text-xs)', color: '#888' }}>{ratio.toFixed(1)}</span>
        <span
          className="px-1.5 py-0.5 rounded"
          style={{
            backgroundColor: status.color,
            color: '#ffffff',
            fontSize: 'var(--text-xs)',
            fontWeight: 'var(--font-weight-semibold)',
            borderRadius: 'var(--radius-sm)'
          }}
        >
          {status.text}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between py-2 px-3 border rounded" style={{ borderColor: 'var(--color-border)', borderRadius: 'var(--radius)' }}>
      <span style={{ fontSize: 'var(--text-xs)' }}>{label}</span>
      <div className="flex items-center gap-2">
        <span style={{ fontSize: 'var(--text-xs)', opacity: 0.7 }}>{ratio.toFixed(2)}:1</span>
        <span
          className="px-2 py-1 rounded"
          style={{
            backgroundColor: status.color,
            color: '#ffffff',
            fontSize: 'var(--text-xs)',
            fontWeight: 'var(--font-weight-semibold)',
            borderRadius: 'var(--radius-sm)'
          }}
        >
          {status.text}
        </span>
      </div>
    </div>
  );
}