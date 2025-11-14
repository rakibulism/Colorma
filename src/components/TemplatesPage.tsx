import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search, ChevronRight, Command, Filter, X } from 'lucide-react';
import { Badge } from './ui/badge';
import exampleImage from 'figma:asset/d86249799e24733340f94f65a56d585f68e01625.png';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArtistDiscoveryTemplate } from './templates/ArtistDiscoveryTemplate';

interface TemplatesPageProps {
  textColor: string;
  backgroundColor: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

interface SidebarSection {
  title: string;
  items: string[];
}

export function TemplatesPage({
  textColor,
  backgroundColor,
  primaryColor,
  secondaryColor,
  accentColor,
}: TemplatesPageProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeItem, setActiveItem] = useState('Welcome');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    'Get Started': true,
    'Color Tools': true,
    'Templates': false,
    'Design System': false,
  });

  const sidebarSections: SidebarSection[] = [
    {
      title: 'Get Started',
      items: ['Welcome', 'Quick Start', 'Color Theory', 'Accessibility', 'OKLCH Colors'],
    },
    {
      title: 'Color Tools',
      items: ['Color Picker', 'Randomizer', 'Palettes', 'Contrast Checker', 'Theme Modes'],
    },
    {
      title: 'Templates',
      items: ['Landing Pages', 'Dashboards', 'E-commerce', 'Portfolio', 'SaaS Apps', 'Blogs'],
    },
    {
      title: 'Design System',
      items: ['Typography', 'Spacing', 'Components', 'CSS Variables', 'Alpha DS'],
    },
  ];

  // Handle CMD+K / CTRL+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(!searchOpen);
      }
      if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="flex h-screen overflow-hidden relative" style={{ backgroundColor }}>
      {/* Desktop Sidebar */}
      <aside
        className="hidden md:block w-60 border-r overflow-y-auto"
        style={{
          backgroundColor,
          borderColor: secondaryColor,
        }}
      >
        <div className="p-4 space-y-6">
          {sidebarSections.map((section) => (
            <div key={section.title}>
              <button
                onClick={() => toggleSection(section.title)}
                className="flex items-center justify-between w-full mb-2"
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  color: textColor,
                  opacity: 0.6,
                  fontSize: 'var(--font-size-xs)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                {section.title}
                <ChevronRight
                  className="w-3 h-3 transition-transform"
                  style={{
                    transform: expandedSections[section.title] ? 'rotate(90deg)' : 'rotate(0deg)',
                  }}
                />
              </button>
              {expandedSections[section.title] && (
                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <li key={item}>
                      <button
                        onClick={() => setActiveItem(item)}
                        className="w-full text-left px-3 py-1.5 rounded transition-colors"
                        style={{
                          background: activeItem === item ? secondaryColor : 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          color: activeItem === item ? primaryColor : textColor,
                          fontSize: 'var(--font-size-sm)',
                        }}
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </aside>

      {/* Mobile Navigation Button */}
      <button
        className="md:hidden fixed bottom-24 right-4 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center"
        onClick={() => setMobileNavOpen(true)}
        style={{
          backgroundColor: accentColor,
          color: backgroundColor,
        }}
      >
        <Filter className="w-5 h-5" />
      </button>

      {/* Mobile Navigation Drawer */}
      {mobileNavOpen && (
        <>
          {/* Backdrop */}
          <div
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setMobileNavOpen(false)}
          />
          
          {/* Drawer */}
          <div
            className="md:hidden fixed bottom-0 left-0 right-0 z-50 max-h-[80vh] overflow-y-auto rounded-t-xl shadow-2xl"
            style={{
              backgroundColor,
              borderTop: `1px solid ${secondaryColor}`,
            }}
          >
            {/* Drawer Header */}
            <div
              className="sticky top-0 flex items-center justify-between p-4 border-b"
              style={{
                backgroundColor,
                borderColor: secondaryColor,
              }}
            >
              <h3 style={{ color: textColor, margin: 0 }}>Navigation</h3>
              <button
                onClick={() => setMobileNavOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 'var(--spacing-2)',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <X className="w-5 h-5" style={{ color: textColor }} />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="p-4 space-y-6">
              {sidebarSections.map((section) => (
                <div key={section.title}>
                  <button
                    onClick={() => toggleSection(section.title)}
                    className="flex items-center justify-between w-full mb-2"
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      color: textColor,
                      opacity: 0.6,
                      fontSize: 'var(--font-size-xs)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {section.title}
                    <ChevronRight
                      className="w-3 h-3 transition-transform"
                      style={{
                        transform: expandedSections[section.title] ? 'rotate(90deg)' : 'rotate(0deg)',
                      }}
                    />
                  </button>
                  {expandedSections[section.title] && (
                    <ul className="space-y-1">
                      {section.items.map((item) => (
                        <li key={item}>
                          <button
                            onClick={() => {
                              setActiveItem(item);
                              setMobileNavOpen(false);
                            }}
                            className="w-full text-left px-3 py-2 rounded transition-colors"
                            style={{
                              background: activeItem === item ? secondaryColor : 'transparent',
                              border: 'none',
                              cursor: 'pointer',
                              color: activeItem === item ? primaryColor : textColor,
                              fontSize: 'var(--font-size-sm)',
                            }}
                          >
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {/* Search Bar */}
        <div
          className="border-b px-6 py-3 flex items-center gap-4"
          style={{ borderColor: secondaryColor }}
        >
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
              style={{ color: textColor, opacity: 0.5 }}
            />
            <Input
              placeholder="Search docs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchOpen(true)}
              className="pl-10 pr-20 border-0"
              style={{
                backgroundColor: secondaryColor,
                color: textColor,
                fontSize: 'var(--font-size-sm)',
              }}
            />
            <div
              className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-2 py-1 rounded"
              style={{
                backgroundColor,
                border: `1px solid ${secondaryColor}`,
              }}
            >
              <Command className="w-3 h-3" style={{ color: textColor, opacity: 0.5 }} />
              <span style={{ color: textColor, opacity: 0.5, fontSize: 'var(--font-size-xs)' }}>
                K
              </span>
            </div>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="border-0"
            style={{
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: secondaryColor,
              color: textColor,
              backgroundColor,
            }}
          >
            Ask AI
          </Button>
        </div>

        {/* Content */}
        <div className="px-8 py-8 max-w-4xl">
          {/* Show Artist Discovery Template when Landing Pages is active */}
          {activeItem === 'Landing Pages' ? (
            <div>
              <div className="mb-8">
                <Badge
                  className="mb-4"
                  style={{
                    backgroundColor: accentColor,
                    color: backgroundColor,
                    fontSize: 'var(--font-size-xs)',
                  }}
                >
                  Landing Page Templates
                </Badge>
                <h1 className="mb-4" style={{ color: textColor }}>
                  Artist Discovery Platform
                </h1>
                <p style={{ color: textColor, opacity: 0.7, fontSize: 'var(--font-size-base)' }}>
                  A modern landing page for a music artist discovery platform. Features a bold hero section, feature cards, and clean typography. All elements update with your selected colors in real-time.
                </p>
              </div>

              {/* Template Preview */}
              <div 
                className="mb-8 rounded-lg overflow-hidden border"
                style={{ borderColor: secondaryColor }}
              >
                <ArtistDiscoveryTemplate
                  primaryColor={primaryColor}
                  secondaryColor={secondaryColor}
                  accentColor={accentColor}
                  textColor={textColor}
                  backgroundColor={backgroundColor}
                />
              </div>

              {/* Back Button */}
              <Button
                onClick={() => setActiveItem('Welcome')}
                variant="outline"
                className="border-0"
                style={{
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: secondaryColor,
                  color: textColor,
                  backgroundColor,
                }}
              >
                ← Back to Templates
              </Button>
            </div>
          ) : (
            <>
          {/* Page Title */}
          <div className="mb-8">
            <Badge
              className="mb-4"
              style={{
                backgroundColor: accentColor,
                color: backgroundColor,
                fontSize: 'var(--font-size-xs)',
              }}
            >
              Templates
            </Badge>
            <h1 className="mb-4" style={{ color: textColor }}>
              Pre-built Templates
            </h1>
            <p style={{ color: textColor, opacity: 0.7, fontSize: 'var(--font-size-base)' }}>
              Test your color palettes on real-world website templates. Each template is a fully designed page that updates in real-time as you adjust your brand colors, helping you visualize how your colors work in production.
            </p>
          </div>

          {/* Hero Feature Highlight */}
          <div
            className="rounded-lg overflow-hidden mb-8 border p-8"
            style={{ 
              borderColor: secondaryColor,
              background: `linear-gradient(135deg, ${secondaryColor} 0%, ${backgroundColor} 100%)`
            }}
          >
            <h2 className="mb-4" style={{ color: textColor }}>
              Real Designs, Real Results
            </h2>
            <p className="mb-6" style={{ color: textColor, opacity: 0.8 }}>
              Don't just test colors on generic boxes. See how your palette performs on professionally designed templates across different industries and use cases.
            </p>
            <div className="flex gap-3">
              <Button
                className="border-0"
                style={{
                  backgroundColor: accentColor,
                  color: backgroundColor,
                }}
              >
                Browse Templates
              </Button>
              <Button
                variant="outline"
                className="border-0"
                style={{
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: primaryColor,
                  color: primaryColor,
                  backgroundColor: 'transparent',
                }}
              >
                View Example
              </Button>
            </div>
          </div>

          {/* Template Categories */}
          <div className="mb-12">
            <h2 className="mb-6" style={{ color: textColor }}>
              Template Categories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: 'Landing Pages',
                  description: 'Marketing-focused pages for SaaS, Fintech, and product launches',
                  icon: '🚀',
                  count: '8 templates',
                },
                {
                  title: 'Dashboards',
                  description: 'Analytics, admin panels, and data visualization interfaces',
                  icon: '📊',
                  count: '5 templates',
                },
                {
                  title: 'SaaS Apps',
                  description: 'Full application interfaces with navigation and complex layouts',
                  icon: '💻',
                  count: '6 templates',
                },
                {
                  title: 'Portfolios',
                  description: 'Personal websites, creative showcases, and case studies',
                  icon: '🎨',
                  count: '4 templates',
                },
              ].map((category, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                  style={{
                    borderColor: secondaryColor,
                    backgroundColor,
                  }}
                >
                  <div className="mb-3" style={{ fontSize: 'var(--font-size-2xl)' }}>
                    {category.icon}
                  </div>
                  <h3 className="mb-2" style={{ color: textColor, marginBottom: 0 }}>
                    {category.title}
                  </h3>
                  <p className="mb-3" style={{ color: textColor, opacity: 0.7, fontSize: 'var(--font-size-sm)' }}>
                    {category.description}
                  </p>
                  <p style={{ color: primaryColor, fontSize: 'var(--font-size-xs)' }}>
                    {category.count}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Templates */}
          <div className="mb-12">
            <h2 className="mb-6" style={{ color: textColor }}>
              Featured Templates
            </h2>
            <div className="space-y-4">
              {[
                {
                  title: 'Fintech Landing Page',
                  category: 'Landing Page',
                  description: 'Modern financial services landing page with hero section, feature cards, and trust indicators',
                  tag: 'Popular',
                },
                {
                  title: 'CRM Dashboard',
                  category: 'Dashboard',
                  description: 'Complete customer relationship management interface with data tables, charts, and navigation',
                  tag: 'New',
                },
                {
                  title: 'SaaS Product Page',
                  category: 'Landing Page',
                  description: 'Software product showcase with pricing tables, testimonials, and feature highlights',
                  tag: 'Trending',
                },
                {
                  title: 'Developer Portfolio',
                  category: 'Portfolio',
                  description: 'Clean portfolio layout for showcasing projects with dark mode support',
                  tag: 'Featured',
                },
                {
                  title: 'Tool Directory Site',
                  category: 'Web App',
                  description: 'Resource directory with search, filters, and card-based listings',
                  tag: 'New',
                },
                {
                  title: 'Analytics Dashboard',
                  category: 'Dashboard',
                  description: 'Data-rich analytics interface with graphs, metrics, and real-time updates',
                  tag: 'Popular',
                },
              ].map((template, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-6 hover:shadow-sm transition-all"
                  style={{
                    borderColor: secondaryColor,
                    backgroundColor,
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 style={{ color: textColor, marginBottom: 0 }}>{template.title}</h3>
                        <Badge
                          style={{
                            backgroundColor: accentColor,
                            color: backgroundColor,
                            fontSize: 'var(--font-size-xs)',
                          }}
                        >
                          {template.tag}
                        </Badge>
                      </div>
                      <p className="mb-2" style={{ color: textColor, opacity: 0.5, fontSize: 'var(--font-size-xs)' }}>
                        {template.category}
                      </p>
                      <p style={{ color: textColor, opacity: 0.7, fontSize: 'var(--font-size-sm)' }}>
                        {template.description}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      className="border-0 ml-4"
                      style={{
                        backgroundColor: primaryColor,
                        color: backgroundColor,
                      }}
                    >
                      Preview
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* How to Use Templates */}
          <div className="mb-12">
            <h2 className="mb-6" style={{ color: textColor }}>
              How to Use Templates
            </h2>
            <div className="space-y-6">
              {[
                {
                  step: '01',
                  title: 'Select a Template',
                  description: 'Choose from our collection of pre-built templates that match your project type or industry.',
                },
                {
                  step: '02',
                  title: 'Apply Your Colors',
                  description: 'Use the color picker toolbar to customize the template with your brand colors in real-time.',
                },
                {
                  step: '03',
                  title: 'Test & Refine',
                  description: 'Navigate through different sections and components to see how your colors work across the entire design.',
                },
                {
                  step: '04',
                  title: 'Export Colors',
                  description: 'Once satisfied, copy your color palette values and use them in your actual project.',
                },
              ].map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{
                      backgroundColor: secondaryColor,
                      color: primaryColor,
                    }}
                  >
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1" style={{ color: textColor, marginBottom: 0 }}>
                      {step.title}
                    </h3>
                    <p style={{ color: textColor, opacity: 0.7, fontSize: 'var(--font-size-sm)' }}>
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Template Benefits */}
          <div className="mb-12">
            <h2 className="mb-4" style={{ color: textColor }}>
              Why Use Templates?
            </h2>
            <div
              className="p-6 rounded-lg border"
              style={{
                backgroundColor: secondaryColor,
                borderColor: secondaryColor,
              }}
            >
              <ul className="space-y-3 list-none">
                <li className="flex items-start gap-3">
                  <span style={{ color: accentColor }}>→</span>
                  <span style={{ color: textColor, opacity: 0.8, fontSize: 'var(--font-size-sm)' }}>
                    <strong>Real-world context:</strong> See how your colors perform in actual designs, not just color swatches
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span style={{ color: accentColor }}>→</span>
                  <span style={{ color: textColor, opacity: 0.8, fontSize: 'var(--font-size-sm)' }}>
                    <strong>Industry-specific:</strong> Test on templates that match your project type (SaaS, Fintech, Portfolio, etc.)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span style={{ color: accentColor }}>→</span>
                  <span style={{ color: textColor, opacity: 0.8, fontSize: 'var(--font-size-sm)' }}>
                    <strong>Complex layouts:</strong> Validate your palette across navigation, cards, forms, and all UI components
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span style={{ color: accentColor }}>→</span>
                  <span style={{ color: textColor, opacity: 0.8, fontSize: 'var(--font-size-sm)' }}>
                    <strong>Save time:</strong> No need to build test pages from scratch—just pick and customize
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA Section */}
          <div
            className="p-8 rounded-lg border text-center"
            style={{
              borderColor: primaryColor,
              backgroundColor,
            }}
          >
            <h2 className="mb-3" style={{ color: textColor }}>
              Start Testing on Templates
            </h2>
            <p className="mb-6" style={{ color: textColor, opacity: 0.7 }}>
              Select a template and start experimenting with your color palette.
            </p>
            <div className="flex gap-3 justify-center">
              <Button
                className="border-0"
                style={{
                  backgroundColor: accentColor,
                  color: backgroundColor,
                }}
              >
                Browse All Templates
              </Button>
              <Button
                variant="outline"
                className="border-0"
                style={{
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: primaryColor,
                  color: primaryColor,
                  backgroundColor: 'transparent',
                }}
              >
                View Popular
              </Button>
            </div>
          </div>

          {/* Footer Navigation */}
          <div className="flex items-center justify-between pt-8 mt-8 border-t" style={{ borderColor: secondaryColor }}>
            <div>
              <p style={{ color: textColor, opacity: 0.6, fontSize: 'var(--font-size-xs)' }}>
                Previous
              </p>
              <p style={{ color: primaryColor, fontSize: 'var(--font-size-sm)', cursor: 'pointer' }}>
                Theme Modes
              </p>
            </div>
            <div className="text-right">
              <p style={{ color: textColor, opacity: 0.6, fontSize: 'var(--font-size-xs)' }}>
                Next
              </p>
              <p style={{ color: primaryColor, fontSize: 'var(--font-size-sm)', cursor: 'pointer' }}>
                Landing Pages
              </p>
            </div>
          </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}