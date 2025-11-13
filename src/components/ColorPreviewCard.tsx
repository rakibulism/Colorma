import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface ColorPreviewCardProps {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

export function ColorPreviewCard({ primaryColor, secondaryColor, accentColor }: ColorPreviewCardProps) {
  return (
    <Card className="p-6 border border-border" style={{ borderRadius: 'var(--radius-card)' }}>
      <h3 className="mb-4">Preview Components</h3>
      
      <div className="space-y-6">
        {/* Buttons Preview */}
        <div>
          <p className="mb-3 text-muted-foreground">Buttons</p>
          <div className="flex flex-wrap gap-3">
            <Button
              style={{ backgroundColor: primaryColor, color: '#ffffff' }}
              className="border-0"
            >
              Primary Button
            </Button>
            <Button
              style={{ backgroundColor: secondaryColor, color: primaryColor }}
              className="border-0"
            >
              Secondary Button
            </Button>
            <Button
              style={{ backgroundColor: accentColor, color: '#ffffff' }}
              className="border-0"
            >
              Accent Button
            </Button>
          </div>
        </div>

        {/* Cards Preview */}
        <div>
          <p className="mb-3 text-muted-foreground">Cards</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div
              className="p-4 rounded-lg"
              style={{ backgroundColor: primaryColor, color: '#ffffff', borderRadius: 'var(--radius-card)' }}
            >
              <h4 className="mb-2" style={{ color: '#ffffff' }}>Primary Card</h4>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>This card uses primary color</p>
            </div>
            <div
              className="p-4 rounded-lg"
              style={{ backgroundColor: secondaryColor, color: primaryColor, borderRadius: 'var(--radius-card)' }}
            >
              <h4 className="mb-2" style={{ color: primaryColor }}>Secondary Card</h4>
              <p style={{ color: primaryColor, opacity: 0.8 }}>This card uses secondary color</p>
            </div>
            <div
              className="p-4 rounded-lg"
              style={{ backgroundColor: accentColor, color: '#ffffff', borderRadius: 'var(--radius-card)' }}
            >
              <h4 className="mb-2" style={{ color: '#ffffff' }}>Accent Card</h4>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>This card uses accent color</p>
            </div>
          </div>
        </div>

        {/* Text Preview */}
        <div>
          <p className="mb-3 text-muted-foreground">Text Colors</p>
          <div className="space-y-2">
            <p style={{ color: primaryColor }}>Primary color text - Lorem ipsum dolor sit amet</p>
            <p style={{ color: secondaryColor }}>Secondary color text - Lorem ipsum dolor sit amet</p>
            <p style={{ color: accentColor }}>Accent color text - Lorem ipsum dolor sit amet</p>
          </div>
        </div>

        {/* Badge Preview */}
        <div>
          <p className="mb-3 text-muted-foreground">Badges</p>
          <div className="flex flex-wrap gap-2">
            <span
              className="px-3 py-1 rounded-full"
              style={{ backgroundColor: primaryColor, color: '#ffffff', borderRadius: 'var(--radius)' }}
            >
              Primary
            </span>
            <span
              className="px-3 py-1 rounded-full"
              style={{ backgroundColor: secondaryColor, color: primaryColor, borderRadius: 'var(--radius)' }}
            >
              Secondary
            </span>
            <span
              className="px-3 py-1 rounded-full"
              style={{ backgroundColor: accentColor, color: '#ffffff', borderRadius: 'var(--radius)' }}
            >
              Accent
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
