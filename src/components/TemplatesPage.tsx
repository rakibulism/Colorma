import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search, ChevronRight, Command, Filter, X, ArrowUp, ArrowLeft } from 'lucide-react';
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
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
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

  // Reset selected template when active item changes
  useEffect(() => {
    setSelectedTemplate(null);
  }, [activeItem]);

  // Handle scroll to show/hide scroll-to-top button
  useEffect(() => {
    const mainContent = document.querySelector('main');
    
    const handleScroll = () => {
      if (mainContent && mainContent.scrollTop > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    if (mainContent) {
      mainContent.addEventListener('scroll', handleScroll);
      return () => mainContent.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const scrollToTop = () => {
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
                        className="w-full text-left transition-colors"
                        style={{
                          background: activeItem === item ? secondaryColor : 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          color: activeItem === item ? primaryColor : textColor,
                          padding: '6px 12px',
                          borderRadius: 'var(--radius-button)',
                          fontFamily: 'var(--font-family-geist)',
                          fontSize: 'var(--text-xs)',
                          fontWeight: 'var(--font-weight-medium)',
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
          {/* Show Artist Discovery Template when selected */}
          {selectedTemplate === 'Artist Discovery Platform' ? (
            <div>
              <div className="mb-8">
                <Badge
                  className="mb-4"
                  style={{
                    backgroundColor: accentColor,
                    color: backgroundColor,
                    fontFamily: 'var(--font-family-geist)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 'var(--font-weight-medium)',
                  }}
                >
                  Landing Page Template
                </Badge>
                <h1 className="mb-4" style={{ color: textColor }}>
                  Artist Discovery Platform
                </h1>
                <p style={{ 
                  color: textColor, 
                  opacity: 0.7, 
                  fontFamily: 'var(--font-family-geist)',
                  fontSize: 'var(--text-base)',
                }}>
                  A modern landing page for a music artist discovery platform. Features a bold hero section, feature cards, and clean typography. All elements update with your selected colors in real-time.
                </p>
              </div>

              {/* Template Preview */}
              <div 
                className="mb-8 rounded-lg overflow-hidden border"
                style={{ 
                  borderColor: secondaryColor,
                  borderRadius: 'var(--radius-card)',
                }}
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
                onClick={() => setSelectedTemplate(null)}
                variant="outline"
                className="border-0"
                style={{
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: secondaryColor,
                  color: textColor,
                  backgroundColor,
                  borderRadius: 'var(--radius-button)',
                  fontFamily: 'var(--font-family-geist)',
                  fontSize: 'var(--text-base)',
                  fontWeight: 'var(--font-weight-medium)',
                }}
              >
                ← Back to Templates
              </Button>
            </div>
          ) : activeItem === 'Landing Pages' ? (
            <div>
              <div className="mb-8">
                <Badge
                  className="mb-4"
                  style={{
                    backgroundColor: accentColor,
                    color: backgroundColor,
                    fontFamily: 'var(--font-family-geist)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 'var(--font-weight-medium)',
                  }}
                >
                  Landing Page Templates
                </Badge>
                <h1 className="mb-4" style={{ color: textColor }}>
                  Landing Page Collection
                </h1>
                <p style={{ 
                  color: textColor, 
                  opacity: 0.7, 
                  fontFamily: 'var(--font-family-geist)',
                  fontSize: 'var(--text-base)',
                }}>
                  Browse our collection of landing page templates. Each template is fully responsive and updates with your selected colors in real-time.
                </p>
              </div>

              {/* Template Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {[
                  {
                    title: 'Artist Discovery Platform',
                    category: 'Music & Entertainment',
                    description: 'Modern music platform with bold hero section, featured artists, and discovery features',
                    tags: ['Hero', 'Cards', 'Modern'],
                    status: 'Available',
                  },
                  {
                    title: 'SaaS Product Launch',
                    category: 'Software & Tech',
                    description: 'Clean product landing page with feature highlights, pricing, and customer testimonials',
                    tags: ['Minimal', 'B2B', 'Pricing'],
                    status: 'Coming Soon',
                  },
                  {
                    title: 'Fintech App Landing',
                    category: 'Finance & Banking',
                    description: 'Professional financial services page with trust indicators and security features',
                    tags: ['Professional', 'Security', 'Trust'],
                    status: 'Coming Soon',
                  },
                  {
                    title: 'E-commerce Store',
                    category: 'Retail & Shopping',
                    description: 'Product showcase landing with shopping features, categories, and promotional sections',
                    tags: ['Shopping', 'Products', 'Commerce'],
                    status: 'Coming Soon',
                  },
                  {
                    title: 'Mobile App Launch',
                    category: 'Mobile & Apps',
                    description: 'App marketing page with download buttons, feature previews, and app store badges',
                    tags: ['Mobile', 'Downloads', 'Features'],
                    status: 'Coming Soon',
                  },
                  {
                    title: 'Agency Portfolio',
                    category: 'Creative & Agency',
                    description: 'Creative agency showcase with project grid, team section, and contact form',
                    tags: ['Portfolio', 'Projects', 'Creative'],
                    status: 'Coming Soon',
                  },
                  {
                    title: 'Event Landing Page',
                    category: 'Events & Conferences',
                    description: 'Event promotion page with schedule, speakers, venue details, and registration',
                    tags: ['Events', 'Schedule', 'Registration'],
                    status: 'Coming Soon',
                  },
                  {
                    title: 'Startup Launch',
                    category: 'Startup & Business',
                    description: 'Bold startup landing with problem-solution approach, team intro, and investor section',
                    tags: ['Startup', 'Bold', 'Innovation'],
                    status: 'Coming Soon',
                  },
                ].map((template, index) => (
                  <div
                    key={index}
                    className="border overflow-hidden transition-all hover:shadow-md"
                    style={{
                      borderRadius: 'var(--radius-card)',
                      borderColor: secondaryColor,
                      backgroundColor,
                    }}
                  >
                    {/* Template Preview Thumbnail */}
                    <div
                      className="aspect-video w-full flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${secondaryColor} 0%, ${backgroundColor} 100%)`,
                        borderBottom: `1px solid ${secondaryColor}`,
                      }}
                    >
                      <div style={{ 
                        color: textColor, 
                        opacity: 0.3,
                        fontFamily: 'var(--font-family-geist)',
                        fontSize: 'var(--text-lg)',
                        fontWeight: 'var(--font-weight-medium)',
                      }}>
                        Preview
                      </div>
                    </div>

                    {/* Card Content */}
                    <div style={{ padding: '20px' }}>
                      {/* Category Badge */}
                      <div className="mb-2">
                        <span style={{
                          fontFamily: 'var(--font-family-geist)',
                          fontSize: 'var(--text-xs)',
                          fontWeight: 'var(--font-weight-medium)',
                          color: textColor,
                          opacity: 0.6,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                        }}>
                          {template.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 style={{ 
                        color: textColor,
                        marginBottom: '8px',
                        fontFamily: 'var(--font-family-geist)',
                        fontSize: 'var(--text-lg)',
                        fontWeight: 'var(--font-weight-semibold)',
                      }}>
                        {template.title}
                      </h3>

                      {/* Description */}
                      <p style={{ 
                        color: textColor, 
                        opacity: 0.7,
                        marginBottom: '16px',
                        fontFamily: 'var(--font-family-geist)',
                        fontSize: 'var(--text-xs)',
                        lineHeight: '1.5',
                      }}>
                        {template.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {template.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            style={{
                              padding: '4px 10px',
                              borderRadius: 'var(--radius)',
                              backgroundColor: secondaryColor,
                              color: textColor,
                              fontFamily: 'var(--font-family-geist)',
                              fontSize: 'var(--text-xs)',
                              opacity: 0.8,
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between">
                        <span style={{
                          fontFamily: 'var(--font-family-geist)',
                          fontSize: 'var(--text-xs)',
                          fontWeight: 'var(--font-weight-medium)',
                          color: template.status === 'Available' ? accentColor : textColor,
                          opacity: template.status === 'Available' ? 1 : 0.5,
                        }}>
                          {template.status}
                        </span>
                        <Button
                          size="sm"
                          disabled={template.status !== 'Available'}
                          onClick={() => template.status === 'Available' && setSelectedTemplate(template.title)}
                          style={{
                            backgroundColor: template.status === 'Available' ? primaryColor : secondaryColor,
                            color: template.status === 'Available' ? backgroundColor : textColor,
                            border: 'none',
                            opacity: template.status === 'Available' ? 1 : 0.5,
                            cursor: template.status === 'Available' ? 'pointer' : 'not-allowed',
                            borderRadius: 'var(--radius-button)',
                            fontFamily: 'var(--font-family-geist)',
                            fontSize: 'var(--text-xs)',
                            fontWeight: 'var(--font-weight-medium)',
                            padding: '6px 16px',
                          }}
                        >
                          {template.status === 'Available' ? 'Preview' : 'Coming Soon'}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Info Section */}
              <div
                className="border p-6 mb-6"
                style={{
                  borderRadius: 'var(--radius-card)',
                  borderColor: secondaryColor,
                  backgroundColor: secondaryColor,
                }}
              >
                <h3 style={{ 
                  color: textColor,
                  marginBottom: '12px',
                  fontFamily: 'var(--font-family-geist)',
                  fontSize: 'var(--text-lg)',
                  fontWeight: 'var(--font-weight-semibold)',
                }}>
                  More Templates Coming Soon
                </h3>
                <p style={{ 
                  color: textColor, 
                  opacity: 0.7,
                  fontFamily: 'var(--font-family-geist)',
                  fontSize: 'var(--text-base)',
                  lineHeight: '1.5',
                }}>
                  We're actively building more landing page templates across different industries. Each template will be fully responsive and customizable with your color palette. Check back soon for updates!
                </p>
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
                  borderRadius: 'var(--radius-button)',
                  fontFamily: 'var(--font-family-geist)',
                  fontSize: 'var(--text-base)',
                  fontWeight: 'var(--font-weight-medium)',
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
                <button
                  key={index}
                  onClick={() => setActiveItem(category.title)}
                  className="border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer text-left w-full"
                  style={{
                    borderColor: secondaryColor,
                    backgroundColor,
                    borderRadius: 'var(--radius-card)',
                  }}
                >
                  <div className="mb-3" style={{ fontSize: 'var(--font-size-2xl)' }}>
                    {category.icon}
                  </div>
                  <h3 className="mb-2" style={{ 
                    color: textColor, 
                    marginBottom: 0,
                    fontFamily: 'var(--font-family-geist)',
                    fontSize: 'var(--text-lg)',
                    fontWeight: 'var(--font-weight-semibold)',
                  }}>
                    {category.title}
                  </h3>
                  <p className="mb-3" style={{ 
                    color: textColor, 
                    opacity: 0.7, 
                    fontFamily: 'var(--font-family-geist)',
                    fontSize: 'var(--text-xs)',
                  }}>
                    {category.description}
                  </p>
                  <p style={{ 
                    color: primaryColor, 
                    fontFamily: 'var(--font-family-geist)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 'var(--font-weight-medium)',
                  }}>
                    {category.count}
                  </p>
                </button>
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

      {/* Sticky Back Button - Only show when viewing Landing Pages or a template */}
      {(activeItem === 'Landing Pages' || selectedTemplate) && (
        <button
          className="fixed bottom-16 left-4 md:left-64 z-50 flex items-center gap-2 px-4 py-3 rounded-full shadow-lg transition-all hover:scale-105"
          onClick={() => {
            if (selectedTemplate) {
              setSelectedTemplate(null);
            } else {
              setActiveItem('Welcome');
            }
          }}
          style={{
            backgroundColor: `rgba(${parseInt(secondaryColor.slice(1, 3), 16)}, ${parseInt(secondaryColor.slice(3, 5), 16)}, ${parseInt(secondaryColor.slice(5, 7), 16)}, 0.8)`,
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: `1px solid rgba(${parseInt(textColor.slice(1, 3), 16)}, ${parseInt(textColor.slice(3, 5), 16)}, ${parseInt(textColor.slice(5, 7), 16)}, 0.1)`,
            color: textColor,
            fontFamily: 'var(--font-family-geist)',
            fontSize: 'var(--text-xs)',
            fontWeight: 'var(--font-weight-medium)',
          }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      )}

      {/* Scroll to Top Button with Glassmorphism */}
      {showScrollTop && (
        <button
          className="fixed bottom-16 right-4 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105"
          onClick={scrollToTop}
          style={{
            backgroundColor: `rgba(${parseInt(accentColor.slice(1, 3), 16)}, ${parseInt(accentColor.slice(3, 5), 16)}, ${parseInt(accentColor.slice(5, 7), 16)}, 0.8)`,
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: `1px solid rgba(255, 255, 255, 0.2)`,
            color: backgroundColor,
          }}
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}