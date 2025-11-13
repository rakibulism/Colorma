import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

interface MinimalColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
}

export function MinimalColorPicker({ label, value, onChange }: MinimalColorPickerProps) {
  const [open, setOpen] = useState(false);

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
          <div
            className="w-5 h-5 border"
            style={{
              backgroundColor: value,
              borderRadius: 'var(--radius-sm)',
              borderColor: 'var(--border)'
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-family-geist)',
              fontSize: 'var(--text-xs)',
              color: 'var(--foreground)'
            }}
          >
            {label}
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
          <label
            style={{
              fontFamily: 'var(--font-family-geist)',
              fontSize: 'var(--text-xs)',
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--muted-foreground)'
            }}
          >
            {label}
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="cursor-pointer"
              style={{
                width: '48px',
                height: '48px',
                padding: '0',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--border)'
              }}
            />
            <input
              type="text"
              value={value.toUpperCase()}
              onChange={(e) => onChange(e.target.value)}
              className="flex-1 border px-3 py-2"
              style={{
                borderRadius: 'var(--radius)',
                backgroundColor: 'var(--input-background)',
                borderColor: 'var(--border)',
                color: 'var(--foreground)',
                fontSize: 'var(--text-xs)',
                fontFamily: 'var(--font-family-geist)'
              }}
              placeholder="#000000"
              pattern="^#[0-9A-Fa-f]{6}$"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}