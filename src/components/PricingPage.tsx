import React from 'react';
import { Button } from './ui/button';
import { Check, Sparkles } from 'lucide-react';

interface PricingPageProps {
  textColor: string;
  backgroundColor: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

export function PricingPage({ textColor, backgroundColor, primaryColor, secondaryColor, accentColor }: PricingPageProps) {
  return (
    <div className="px-6 py-20">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ backgroundColor: secondaryColor, borderRadius: 'var(--radius)' }}>
          <Sparkles className="w-4 h-4" style={{ color: accentColor }} />
          <span style={{ color: primaryColor }}>100% Free Forever</span>
        </div>
        <h1 style={{ color: textColor }}>Simple, Transparent Pricing</h1>
        <p className="mt-4 max-w-2xl mx-auto" style={{ color: textColor, opacity: 0.8 }}>
          We believe great design tools should be accessible to everyone. That's why our color tester is completely free, with no hidden costs or limitations.
        </p>
      </div>

      {/* Pricing Card */}
      <div className="max-w-2xl mx-auto">
        <div
          className="p-8 border relative overflow-hidden"
          style={{
            borderColor: accentColor,
            borderWidth: '2px',
            borderRadius: 'var(--radius-card)',
            backgroundColor: 'transparent'
          }}
        >
          {/* Decorative corner */}
          <div
            className="absolute top-0 right-0 px-4 py-2"
            style={{
              backgroundColor: accentColor,
              borderBottomLeftRadius: 'var(--radius)'
            }}
          >
            <span style={{ color: backgroundColor, fontWeight: 'var(--font-weight-semibold)', fontSize: 'var(--text-xs)' }}>
              BEST VALUE
            </span>
          </div>

          <div className="mb-8 mt-4">
            <h2 style={{ color: textColor }}>Free Plan</h2>
            <div className="flex items-baseline gap-2 mt-4">
              <span style={{ fontSize: '64px', fontWeight: 'var(--font-weight-semibold)', color: primaryColor }}>$0</span>
              <span style={{ color: textColor, opacity: 0.7 }}>forever</span>
            </div>
            <p className="mt-2" style={{ color: textColor, opacity: 0.8 }}>
              Everything you need to create beautiful, accessible color palettes
            </p>
          </div>

          {/* Features List */}
          <div className="space-y-4 mb-8">
            {[
              'Unlimited color combinations',
              'Real-time preview with full website mockup',
              'OKLCH color space for perceptually uniform colors',
              'WCAG contrast ratio checking (AA & AAA)',
              'Random palette generator with accessibility',
              'Export color codes (HEX, RGB)',
              'No account required',
              'No credit card needed',
              'No time limits',
              'No watermarks',
              'Access to all features',
              'Regular updates and improvements'
            ].map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{
                    backgroundColor: accentColor,
                    borderRadius: '50%'
                  }}
                >
                  <Check className="w-3 h-3" style={{ color: backgroundColor }} />
                </div>
                <span style={{ color: textColor }}>{feature}</span>
              </div>
            ))}
          </div>

          <Button
            className="w-full border-0"
            style={{ backgroundColor: primaryColor, color: backgroundColor }}
          >
            Start Using Now - It's Free!
          </Button>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <h3 className="mb-4" style={{ color: textColor }}>Why Free?</h3>
          <p className="max-w-xl mx-auto" style={{ color: textColor, opacity: 0.8 }}>
            We created this tool to help designers and developers make better color decisions. 
            By keeping it free, we ensure that everyone has access to professional-grade color testing, 
            regardless of their budget or background. Great design should be accessible to all.
          </p>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6" style={{ backgroundColor: secondaryColor, borderRadius: 'var(--radius-card)' }}>
            <h3 style={{ color: primaryColor }}>No Registration</h3>
            <p className="mt-2" style={{ color: textColor, opacity: 0.8 }}>Start using immediately without creating an account</p>
          </div>
          <div className="text-center p-6" style={{ backgroundColor: secondaryColor, borderRadius: 'var(--radius-card)' }}>
            <h3 style={{ color: primaryColor }}>No Limits</h3>
            <p className="mt-2" style={{ color: textColor, opacity: 0.8 }}>Create unlimited color palettes without restrictions</p>
          </div>
          <div className="text-center p-6" style={{ backgroundColor: secondaryColor, borderRadius: 'var(--radius-card)' }}>
            <h3 style={{ color: primaryColor }}>Open Source</h3>
            <p className="mt-2" style={{ color: textColor, opacity: 0.8 }}>Built with transparency and community in mind</p>
          </div>
        </div>
      </div>
    </div>
  );
}
