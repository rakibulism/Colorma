import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { getContrastRatio } from '../utils/colorUtils';

interface MinimalContrastInfoProps {
  textColor: string;
  backgroundColor: string;
  primaryColor: string;
}

export function MinimalContrastInfo({ textColor, backgroundColor, primaryColor }: MinimalContrastInfoProps) {
  const [open, setOpen] = useState(false);

  const textBgRatio = getContrastRatio(textColor, backgroundColor);
  const primaryBgRatio = getContrastRatio(primaryColor, backgroundColor);

  const getStatus = (ratio: number) => {
    if (ratio >= 7) return { text: 'AAA', color: '#10b981' };
    if (ratio >= 4.5) return { text: 'AA', color: '#f59e0b' };
    return { text: 'Fail', color: '#ef4444' };
  };

  const textBgStatus = getStatus(textBgRatio);
  const primaryBgStatus = getStatus(primaryBgRatio);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className="flex items-center gap-2 px-3 py-2 hover:bg-[var(--muted)] transition-colors"
          style={{
            borderRadius: 'var(--radius)',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer'
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-family-geist)',
              fontSize: 'var(--text-xs)',
              color: 'var(--foreground)'
            }}
          >
            Contrast
          </span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ color: 'var(--muted-foreground)' }}>
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-64 p-4"
        style={{
          backgroundColor: 'var(--popover)',
          borderColor: 'var(--border)',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border)'
        }}
        sideOffset={8}
      >
        <div className="flex flex-col gap-3">
          <h4
            style={{
              fontFamily: 'var(--font-family-geist)',
              fontSize: 'var(--text-xs)',
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--foreground)',
              marginBottom: '8px'
            }}
          >
            Contrast Ratios
          </h4>
          
          {/* Text/Background */}
          <div className="flex items-center justify-between py-2 px-3 border" style={{ borderColor: 'var(--border)', borderRadius: 'var(--radius)' }}>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>Text / BG</span>
            <div className="flex items-center gap-2">
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>{textBgRatio.toFixed(1)}</span>
              <span
                className="px-2 py-0.5 rounded"
                style={{
                  backgroundColor: textBgStatus.color,
                  color: '#ffffff',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 'var(--font-weight-semibold)',
                  borderRadius: 'var(--radius-sm)'
                }}
              >
                {textBgStatus.text}
              </span>
            </div>
          </div>

          {/* Primary/Background */}
          <div className="flex items-center justify-between py-2 px-3 border" style={{ borderColor: 'var(--border)', borderRadius: 'var(--radius)' }}>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>Primary / BG</span>
            <div className="flex items-center gap-2">
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>{primaryBgRatio.toFixed(1)}</span>
              <span
                className="px-2 py-0.5 rounded"
                style={{
                  backgroundColor: primaryBgStatus.color,
                  color: '#ffffff',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 'var(--font-weight-semibold)',
                  borderRadius: 'var(--radius-sm)'
                }}
              >
                {primaryBgStatus.text}
              </span>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}