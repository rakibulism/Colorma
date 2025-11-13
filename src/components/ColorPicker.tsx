import React from 'react';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
  compact?: boolean;
}

export function ColorPicker({ label, value, onChange, compact = false }: ColorPickerProps) {
  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <label 
          style={{ 
            fontFamily: 'var(--font-family-geist)', 
            fontSize: 'var(--text-xs)', 
            fontWeight: 'var(--font-weight-medium)',
            color: '#aaa',
            minWidth: '70px'
          }}
        >
          {label}
        </label>
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-8 w-8 cursor-pointer"
          style={{ padding: '2px', borderRadius: 'var(--radius)', border: '1px solid #333' }}
        />
        <input
          type="text"
          value={value.toUpperCase()}
          onChange={(e) => onChange(e.target.value)}
          className="w-20 border px-2 py-1"
          style={{ 
            borderRadius: 'var(--radius)', 
            backgroundColor: '#2a2a2a', 
            borderColor: '#333',
            color: '#fff',
            fontSize: 'var(--text-xs)'
          }}
          placeholder="#000000"
          pattern="^#[0-9A-Fa-f]{6}$"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <label style={{ fontFamily: 'var(--font-family-geist)', fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)' }}>
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-10 cursor-pointer border border-border"
          style={{ padding: '2px', borderRadius: 'var(--radius)' }}
        />
        <input
          type="text"
          value={value.toUpperCase()}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 border border-border bg-input-background px-2 py-2"
          style={{ borderRadius: 'var(--radius)' }}
          placeholder="#000000"
          pattern="^#[0-9A-Fa-f]{6}$"
        />
      </div>
    </div>
  );
}