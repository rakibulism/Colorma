import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ArrowRight, Palette, Dices, Eye, Zap, Shield, Download, CheckCircle2, Sparkles, RefreshCw, BarChart3, Code2 } from 'lucide-react';

interface HomePageProps {
  textColor: string;
  backgroundColor: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

export function HomePage({ textColor, backgroundColor, primaryColor, secondaryColor, accentColor }: HomePageProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="px-6 py-24 text-center">
        <div className="max-w-5xl mx-auto space-y-8">
          <Badge className="mb-4" style={{ backgroundColor: secondaryColor, color: primaryColor, borderRadius: 'var(--radius)' }}>
            <Sparkles className="w-3 h-3 mr-1" />
            100% Free Color Testing Tool
          </Badge>
          <h1 style={{ color: textColor }}>
            Test Your Color Palettes in Real-Time
          </h1>
          <p className="mx-auto max-w-2xl" style={{ color: textColor, opacity: 0.8 }}>
            See how your colors work together across an entire website interface. 
            Choose your palette, click randomize, and watch the magic happen. 
            Built with accessibility in mind using OKLCH color space.
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <Button
              className="gap-2 border-0"
              style={{ backgroundColor: primaryColor, color: backgroundColor }}
            >
              <Palette className="w-4 h-4" />
              Start Testing Colors
            </Button>
            <Button
              variant="outline"
              className="gap-2"
              style={{ borderColor: primaryColor, color: primaryColor, backgroundColor: 'transparent' }}
            >
              <Eye className="w-4 h-4" />
              See Examples
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-16" style={{ backgroundColor: secondaryColor }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 style={{ color: textColor }}>How It Works</h2>
            <p style={{ color: textColor, opacity: 0.8 }}>Three simple steps to perfect color palettes</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                icon: Palette,
                title: 'Pick Your Colors',
                desc: 'Select text, background, primary, secondary, and accent colors using our intuitive color pickers.'
              },
              {
                step: '02',
                icon: Dices,
                title: 'Or Randomize',
                desc: 'Click the dice button to generate accessible color combinations using OKLCH color space.'
              },
              {
                step: '03',
                icon: Eye,
                title: 'See It Live',
                desc: 'Watch your entire website preview update instantly with your new colors across all components.'
              }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="relative">
                  <Card style={{ backgroundColor, borderColor: secondaryColor }}>
                    <CardHeader className="p-[24px]">
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className="w-14 h-14 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: accentColor, borderRadius: '50%' }}
                        >
                          <Icon className="w-7 h-7" style={{ color: backgroundColor }} />
                        </div>
                        <span
                          style={{
                            color: primaryColor,
                            opacity: 0.2,
                            fontWeight: 'var(--font-weight-bold)',
                            fontSize: '48px',
                            lineHeight: 1
                          }}
                        >
                          {item.step}
                        </span>
                      </div>
                      <CardTitle style={{ color: textColor }}>{item.title}</CardTitle>
                      <CardDescription style={{ color: textColor, opacity: 0.8 }}>
                        {item.desc}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 style={{ color: textColor }}>Powerful Features</h2>
            <p style={{ color: textColor, opacity: 0.8 }}>Everything you need to make confident color decisions</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: RefreshCw,
                title: 'Real-Time Preview',
                desc: 'See your colors applied instantly across navigation, buttons, cards, charts, and more.'
              },
              {
                icon: Shield,
                title: 'WCAG Contrast Checking',
                desc: 'Automatic contrast ratio calculations ensure your colors meet AA and AAA standards.'
              },
              {
                icon: Zap,
                title: 'OKLCH Color Space',
                desc: 'Perceptually uniform colors that look harmonious and balanced every time.'
              },
              {
                icon: Dices,
                title: 'Smart Randomizer',
                desc: 'Generate accessible color palettes with one click, perfect for inspiration.'
              },
              {
                icon: BarChart3,
                title: 'Full UI Preview',
                desc: 'Test colors on charts, forms, dialogs, badges, and all common UI components.'
              },
              {
                icon: Code2,
                title: 'Alpha UI Powered',
                desc: 'Built on the Alpha UI Design System with proper design tokens and spacing.'
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="transition-all hover:shadow-lg"
                  style={{ backgroundColor, borderColor: secondaryColor }}
                >
                  <CardContent className="pt-6">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                      style={{ backgroundColor: secondaryColor, borderRadius: '50%' }}
                    >
                      <Icon className="w-6 h-6" style={{ color: accentColor }} />
                    </div>
                    <h4 className="mb-2" style={{ color: textColor }}>{feature.title}</h4>
                    <p style={{ color: textColor, opacity: 0.8 }}>{feature.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-6 py-16" style={{ backgroundColor: secondaryColor }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-6" style={{ color: textColor }}>Why Use a Color Testing Tool?</h2>
              <div className="space-y-4">
                {[
                  'Colors look different in context than in isolation',
                  'Accessibility requires proper contrast ratios',
                  'Design systems need consistent color application',
                  'Clients and stakeholders need to see the big picture',
                  'Save hours of back-and-forth design reviews',
                  'Make data-driven color decisions with confidence'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2
                      className="w-6 h-6 flex-shrink-0 mt-0.5"
                      style={{ color: accentColor }}
                    />
                    <p style={{ color: textColor, opacity: 0.9 }}>{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <Card style={{ backgroundColor, borderColor: secondaryColor }}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: primaryColor, borderRadius: '50%' }}
                    >
                      <Palette className="w-6 h-6" style={{ color: backgroundColor }} />
                    </div>
                    <div>
                      <h3 style={{ color: textColor }}>5 Color Roles</h3>
                      <p style={{ color: textColor, opacity: 0.7, fontSize: 'var(--text-xs)' }}>
                        Text, Background, Primary, Secondary, Accent
                      </p>
                    </div>
                  </div>
                  <p style={{ color: textColor, opacity: 0.8 }}>
                    Test all essential color roles that make up a complete design system.
                  </p>
                </CardContent>
              </Card>
              <Card style={{ backgroundColor, borderColor: secondaryColor }}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: accentColor, borderRadius: '50%' }}
                    >
                      <BarChart3 className="w-6 h-6" style={{ color: backgroundColor }} />
                    </div>
                    <div>
                      <h3 style={{ color: textColor }}>Live Contrast Ratios</h3>
                      <p style={{ color: textColor, opacity: 0.7, fontSize: 'var(--text-xs)' }}>
                        AA and AAA compliance badges
                      </p>
                    </div>
                  </div>
                  <p style={{ color: textColor, opacity: 0.8 }}>
                    See instant feedback on contrast ratios between your color combinations.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 style={{ color: textColor }}>Perfect For</h2>
            <p style={{ color: textColor, opacity: 0.8 }}>Who benefits from color testing?</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                role: 'UI/UX Designers',
                desc: 'Test color palettes before committing to a design direction. See how colors work across different UI components.',
                tasks: ['Brand color exploration', 'Design system creation', 'Client presentations']
              },
              {
                role: 'Frontend Developers',
                desc: 'Validate design handoffs and ensure proper color implementation with real contrast ratios.',
                tasks: ['Theme development', 'Accessibility testing', 'Design token setup']
              },
              {
                role: 'Product Managers',
                desc: 'Make informed decisions about brand colors and communicate design choices to stakeholders.',
                tasks: ['Brand refresh planning', 'A/B testing colors', 'Stakeholder alignment']
              },
              {
                role: 'Design System Teams',
                desc: 'Build and maintain consistent color systems with accessible contrast ratios built-in.',
                tasks: ['Token documentation', 'Palette validation', 'Component library QA']
              }
            ].map((useCase, index) => (
              <Card key={index} style={{ backgroundColor, borderColor: secondaryColor }}>
                <CardHeader>
                  <CardTitle style={{ color: textColor }}>{useCase.role}</CardTitle>
                  <CardDescription style={{ color: textColor, opacity: 0.8 }}>
                    {useCase.desc}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {useCase.tasks.map((task, taskIndex) => (
                      <div key={taskIndex} className="flex items-center gap-2">
                        <div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: primaryColor, borderRadius: '50%' }}
                        />
                        <span style={{ color: textColor, opacity: 0.8, fontSize: 'var(--text-xs)' }}>
                          {task}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div
          className="p-12 text-center"
          style={{
            backgroundColor: primaryColor,
            borderRadius: 'var(--radius-card)'
          }}
        >
          <h2 className="mb-4" style={{ color: backgroundColor }}>Ready to Test Your Colors?</h2>
          <p className="mb-8 max-w-2xl mx-auto" style={{ color: backgroundColor, opacity: 0.9 }}>
            Start creating accessible, beautiful color palettes in seconds. 
            Use the color pickers on the floating panel or click the randomize button for instant inspiration.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button
              className="gap-2 border-0"
              style={{ backgroundColor: accentColor, color: backgroundColor }}
            >
              <Dices className="w-4 h-4" />
              Try Randomizer Now
            </Button>
            <Button
              variant="outline"
              className="gap-2"
              style={{ borderColor: backgroundColor, color: backgroundColor, backgroundColor: 'transparent' }}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 py-16" style={{ backgroundColor: secondaryColor }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '100%', label: 'Free Forever' },
              { value: 'OKLCH', label: 'Color Space' },
              { value: 'WCAG', label: 'AAA Ready' },
              { value: '5', label: 'Color Roles' }
            ].map((stat, index) => (
              <div key={index}>
                <h2 style={{ color: primaryColor }}>{stat.value}</h2>
                <p style={{ color: textColor, opacity: 0.7 }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5" style={{ color: accentColor }} />
            <p style={{ color: textColor, fontWeight: 500 }}>
              Built with Alpha UI Design System
            </p>
          </div>
          <p style={{ color: textColor, opacity: 0.8 }}>
            This color testing tool is built using the Alpha UI Design System & UI Kit, 
            a pre-internal test of the Seen Design System. Every component you see uses 
            proper design tokens and follows accessibility guidelines.
          </p>
        </div>
      </section>
    </>
  );
}
