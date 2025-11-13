import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Sun, Moon, Monitor } from 'lucide-react';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeSwitcherProps {
  theme: ThemeMode;
  onChange: (theme: ThemeMode) => void;
}

export function ThemeSwitcher({ theme, onChange }: ThemeSwitcherProps) {
  const [open, setOpen] = useState(false);

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="w-4 h-4" />;
      case 'dark':
        return <Moon className="w-4 h-4" />;
      case 'system':
        return <Monitor className="w-4 h-4" />;
    }
  };

  const options: { value: ThemeMode; label: string; icon: React.ReactNode }[] = [
    { value: 'light', label: 'Light', icon: <Sun className="w-4 h-4" /> },
    { value: 'dark', label: 'Dark', icon: <Moon className="w-4 h-4" /> },
    { value: 'system', label: 'System', icon: <Monitor className="w-4 h-4" /> },
  ];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className="flex items-center gap-2 px-3 py-2 hover:bg-[var(--muted)] transition-colors"
          style={{
            borderRadius: 'var(--radius)',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            color: 'var(--foreground)'
          }}
        >
          {getIcon()}
          <span
            style={{
              fontFamily: 'var(--font-family-geist)',
              fontSize: 'var(--text-xs)',
            }}
          >
            Theme
          </span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ color: 'var(--muted-foreground)' }}>
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-48 p-2"
        style={{
          backgroundColor: 'var(--popover)',
          borderColor: 'var(--border)',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border)'
        }}
        sideOffset={8}
      >
        <div className="flex flex-col gap-1">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className="flex items-center gap-3 px-3 py-2 w-full transition-colors"
              style={{
                background: theme === option.value ? 'var(--accent)' : 'transparent',
                color: theme === option.value ? 'var(--accent-foreground)' : 'var(--foreground)',
                borderRadius: 'var(--radius)',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-family-geist)',
                fontSize: 'var(--text-xs)',
                textAlign: 'left'
              }}
              onMouseEnter={(e) => {
                if (theme !== option.value) {
                  e.currentTarget.style.backgroundColor = 'var(--muted)';
                }
              }}
              onMouseLeave={(e) => {
                if (theme !== option.value) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {option.icon}
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
