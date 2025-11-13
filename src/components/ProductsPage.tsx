import React from 'react';
import { Button } from './ui/button';
import { Palette, MessageCircle, Users, ExternalLink, ArrowRight } from 'lucide-react';

interface ProductsPageProps {
  textColor: string;
  backgroundColor: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

export function ProductsPage({ textColor, backgroundColor, primaryColor, secondaryColor, accentColor }: ProductsPageProps) {
  const products = [
    {
      name: 'Alpha UI Design System',
      description: 'A comprehensive design system with pre-built components, tokens, and guidelines to accelerate your design workflow.',
      icon: Palette,
      features: [
        'Modern component library',
        'Design tokens & variables',
        'Figma & code integration',
        'Accessibility-first approach'
      ],
      link: '#',
      linkText: 'Learn More',
      category: 'Design System'
    },
    {
      name: 'Hello Designers',
      description: 'Join our vibrant Discord community of designers sharing knowledge, feedback, and inspiration.',
      icon: MessageCircle,
      features: [
        'Daily design challenges',
        'Portfolio reviews',
        'Resource sharing',
        'Networking opportunities'
      ],
      link: 'https://discord.gg/eQ8bwUq68G',
      linkText: 'Join Discord',
      category: 'Community'
    },
    {
      name: 'Startup Founders',
      description: 'A Discord community for founders to connect, collaborate, and grow their startups together.',
      icon: Users,
      features: [
        'Founder networking',
        'Pitch feedback',
        'Growth strategies',
        'Resource marketplace'
      ],
      link: 'https://discord.gg/fQPAExpcQG',
      linkText: 'Join Discord',
      category: 'Community'
    }
  ];

  return (
    <div className="px-6 py-20">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 style={{ color: textColor }}>Our Products & Communities</h1>
        <p className="mt-4 max-w-2xl mx-auto" style={{ color: textColor, opacity: 0.8 }}>
          Explore our ecosystem of tools and communities designed to help designers and founders succeed.
        </p>
      </div>

      {/* Products Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, index) => {
          const Icon = product.icon;
          return (
            <div
              key={index}
              className="border p-6 flex flex-col transition-all hover:shadow-lg"
              style={{
                borderColor: secondaryColor,
                borderRadius: 'var(--radius-card)'
              }}
            >
              {/* Category Badge */}
              <div className="mb-4">
                <span
                  className="inline-block px-3 py-1"
                  style={{
                    backgroundColor: secondaryColor,
                    color: primaryColor,
                    fontSize: 'var(--text-xs)',
                    fontWeight: 'var(--font-weight-medium)',
                    borderRadius: 'var(--radius)'
                  }}
                >
                  {product.category}
                </span>
              </div>

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                style={{
                  backgroundColor: accentColor,
                  borderRadius: '50%'
                }}
              >
                <Icon className="w-7 h-7" style={{ color: backgroundColor }} />
              </div>

              {/* Content */}
              <h3 className="mb-3" style={{ color: textColor }}>{product.name}</h3>
              <p className="mb-6 flex-grow" style={{ color: textColor, opacity: 0.8 }}>
                {product.description}
              </p>

              {/* Features */}
              <div className="space-y-2 mb-6">
                {product.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        backgroundColor: accentColor,
                        borderRadius: '50%'
                      }}
                    />
                    <span style={{ color: textColor, opacity: 0.7, fontSize: 'var(--text-xs)' }}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <a
                href={product.link}
                target={product.link.startsWith('http') ? '_blank' : '_self'}
                rel={product.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="w-full"
              >
                <Button
                  className="w-full gap-2 border-0"
                  style={{ backgroundColor: primaryColor, color: backgroundColor }}
                >
                  {product.linkText}
                  {product.link.startsWith('http') ? (
                    <ExternalLink className="w-4 h-4" />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                </Button>
              </a>
            </div>
          );
        })}
      </div>

      {/* CTA Section */}
      <div className="mt-20 max-w-4xl mx-auto">
        <div
          className="p-12 text-center"
          style={{
            backgroundColor: secondaryColor,
            borderRadius: 'var(--radius-card)'
          }}
        >
          <h2 className="mb-4" style={{ color: textColor }}>Join Our Growing Community</h2>
          <p className="mb-8 max-w-2xl mx-auto" style={{ color: textColor, opacity: 0.8 }}>
            Connect with thousands of designers and founders who are building amazing products. 
            Share your work, get feedback, and grow together.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="https://discord.gg/eQ8bwUq68G" target="_blank" rel="noopener noreferrer">
              <Button
                className="gap-2 border-0"
                style={{ backgroundColor: accentColor, color: backgroundColor }}
              >
                <MessageCircle className="w-4 h-4" />
                Hello Designers
              </Button>
            </a>
            <a href="https://discord.gg/fQPAExpcQG" target="_blank" rel="noopener noreferrer">
              <Button
                className="gap-2 border-0"
                style={{ backgroundColor: primaryColor, color: backgroundColor }}
              >
                <Users className="w-4 h-4" />
                Startup Founders
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mt-20 max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '5K+', label: 'Community Members' },
            { value: '100+', label: 'Resources Shared' },
            { value: '50+', label: 'Weekly Events' },
            { value: '24/7', label: 'Active Support' }
          ].map((stat, index) => (
            <div key={index}>
              <h2 style={{ color: primaryColor }}>{stat.value}</h2>
              <p style={{ color: textColor, opacity: 0.7 }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
