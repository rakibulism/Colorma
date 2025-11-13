import React from 'react';
import { Button } from './ui/button';
import { Palette, ExternalLink, Heart, Code, Sparkles, User } from 'lucide-react';

interface AboutPageProps {
  textColor: string;
  backgroundColor: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

export function AboutPage({ textColor, backgroundColor, primaryColor, secondaryColor, accentColor }: AboutPageProps) {
  return (
    <div className="min-h-[calc(100vh-80px)]">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-80px)]">
        {/* Left Side - About the Product */}
        <div
          className="px-8 py-16 flex flex-col justify-center border-r"
          style={{ borderColor: secondaryColor }}
        >
          <div className="max-w-xl mx-auto space-y-6">
            {/* Icon */}
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
              style={{
                backgroundColor: accentColor,
                borderRadius: '50%'
              }}
            >
              <Palette className="w-8 h-8" style={{ color: backgroundColor }} />
            </div>

            {/* Header */}
            <div>
              <div className="inline-block px-3 py-1 mb-4" style={{ backgroundColor: secondaryColor, borderRadius: 'var(--radius)' }}>
                <span style={{ color: primaryColor, fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)' }}>
                  About This Tool
                </span>
              </div>
              <h1 style={{ color: textColor }}>Real-Time Color Testing</h1>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <p style={{ color: textColor, opacity: 0.9 }}>
                Welcome to our free color testing tool, designed to help designers and developers make better color decisions with confidence.
              </p>
              <p style={{ color: textColor, opacity: 0.8 }}>
                We built this tool because we believe that seeing colors in context is essential. Instead of just picking colors in isolation, you can now visualize how your entire palette works together across a real website interface.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4 pt-4">
              <h3 style={{ color: textColor }}>What Makes Us Different</h3>
              <div className="space-y-3">
                {[
                  { icon: Sparkles, text: 'OKLCH color space for perceptually uniform palettes' },
                  { icon: Heart, text: 'WCAG contrast checking for accessibility' },
                  { icon: Code, text: 'Real-time preview with full website mockup' },
                  { icon: Palette, text: 'Smart randomizer that generates accessible colors' }
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="flex items-start gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{
                          backgroundColor: secondaryColor,
                          borderRadius: '50%'
                        }}
                      >
                        <Icon className="w-4 h-4" style={{ color: accentColor }} />
                      </div>
                      <span style={{ color: textColor, opacity: 0.9 }}>{item.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mission */}
            <div
              className="p-6 mt-8"
              style={{
                backgroundColor: secondaryColor,
                borderRadius: 'var(--radius-card)'
              }}
            >
              <h4 className="mb-3" style={{ color: primaryColor }}>Our Mission</h4>
              <p style={{ color: textColor, opacity: 0.8 }}>
                To make professional-grade color tools accessible to everyone, helping create more beautiful and accessible designs across the web.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              <div>
                <h2 style={{ color: primaryColor }}>100%</h2>
                <p style={{ color: textColor, opacity: 0.7 }}>Free Forever</p>
              </div>
              <div>
                <h2 style={{ color: primaryColor }}>OKLCH</h2>
                <p style={{ color: textColor, opacity: 0.7 }}>Color Space</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - About the Creator */}
        <div
          className="px-8 py-16 flex flex-col justify-center"
          style={{ backgroundColor: secondaryColor }}
        >
          <div className="max-w-xl mx-auto space-y-6">
            {/* Icon */}
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
              style={{
                backgroundColor: primaryColor,
                borderRadius: '50%'
              }}
            >
              <User className="w-8 h-8" style={{ color: backgroundColor }} />
            </div>

            {/* Header */}
            <div>
              <div className="inline-block px-3 py-1 mb-4" style={{ backgroundColor: backgroundColor, borderRadius: 'var(--radius)' }}>
                <span style={{ color: primaryColor, fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)' }}>
                  Meet the Creator
                </span>
              </div>
              <h1 style={{ color: textColor }}>Built with Passion</h1>
            </div>

            {/* Creator Description */}
            <div className="space-y-4">
              <p style={{ color: textColor, opacity: 0.9 }}>
                This tool was crafted by a passionate designer and developer who believes in the power of open-source and community-driven design tools.
              </p>
              <p style={{ color: textColor, opacity: 0.8 }}>
                With years of experience in design systems, product design, and development, the creator combines technical expertise with design sensibility to build tools that solve real problems.
              </p>
            </div>

            {/* Creator Highlights */}
            <div className="space-y-4 pt-4">
              <h3 style={{ color: textColor }}>What I Do</h3>
              <div className="space-y-3">
                {[
                  'Design Systems & Component Libraries',
                  'Product Design & UX',
                  'Frontend Development',
                  'Community Building & Mentorship'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{
                        backgroundColor: accentColor,
                        borderRadius: '50%'
                      }}
                    />
                    <span style={{ color: textColor, opacity: 0.9 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote */}
            <div
              className="p-6 border-l-4 mt-8"
              style={{
                backgroundColor: backgroundColor,
                borderLeftColor: accentColor,
                borderRadius: 'var(--radius)'
              }}
            >
              <p style={{ color: textColor, opacity: 0.9, fontStyle: 'italic' }}>
                "Good design should be accessible to everyone. That's why I build tools that empower designers and developers to create beautiful, accessible experiences."
              </p>
            </div>

            {/* CTA */}
            <div className="pt-6">
              <a
                href="https://rakibulism.framer.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button
                  className="w-full gap-2 border-0"
                  style={{ backgroundColor: primaryColor, color: backgroundColor }}
                >
                  Learn More About Me
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </a>
            </div>

            {/* Additional Links */}
            <div className="grid grid-cols-2 gap-3 pt-4">
              <a
                href="https://discord.gg/eQ8bwUq68G"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="w-full"
                  style={{ borderColor: primaryColor, color: primaryColor, backgroundColor: 'transparent' }}
                >
                  Join Community
                </Button>
              </a>
              <a
                href="https://discord.gg/fQPAExpcQG"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="w-full"
                  style={{ borderColor: primaryColor, color: primaryColor, backgroundColor: 'transparent' }}
                >
                  For Founders
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="px-8 py-16 border-t" style={{ borderColor: secondaryColor }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-4" style={{ color: textColor }}>Want to Collaborate?</h2>
          <p className="mb-8 max-w-2xl mx-auto" style={{ color: textColor, opacity: 0.8 }}>
            I'm always interested in working on exciting projects, sharing knowledge, and building tools that help the design community. Let's connect!
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://rakibulism.framer.ai/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                className="gap-2 border-0"
                style={{ backgroundColor: accentColor, color: backgroundColor }}
              >
                View Portfolio
                <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
            <Button
              variant="outline"
              style={{ borderColor: primaryColor, color: primaryColor, backgroundColor: 'transparent' }}
            >
              Get in Touch
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
