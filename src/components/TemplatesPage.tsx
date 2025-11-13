import React from 'react';
import { Button } from './ui/button';

interface TemplatesPageProps {
  textColor: string;
  backgroundColor: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

export function TemplatesPage({
  textColor,
  backgroundColor,
  primaryColor,
  secondaryColor,
  accentColor,
}: TemplatesPageProps) {
  const [hoveredPreviewIndex, setHoveredPreviewIndex] = React.useState<number | null>(null);
  
  const templates = [
    {
      name: 'Landing Page',
      category: 'Marketing',
      description: 'Perfect for product launches and marketing campaigns',
    },
    {
      name: 'Dashboard',
      category: 'App',
      description: 'Analytics and data visualization interface',
    },
    {
      name: 'Portfolio',
      category: 'Personal',
      description: 'Showcase your work and projects',
    },
    {
      name: 'E-commerce',
      category: 'Store',
      description: 'Online store with product listings',
    },
    {
      name: 'Blog',
      category: 'Content',
      description: 'Content-focused writing platform',
    },
    {
      name: 'SaaS App',
      category: 'App',
      description: 'Software as a service application',
    },
  ];

  return (
    <div className="px-6 py-12">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="mb-4" style={{ color: primaryColor }}>
          Templates
        </h1>
        <p style={{ color: textColor, opacity: 0.8 }}>
          Choose from our collection of professionally designed templates. Each template is fully customizable and ready to use.
        </p>
      </div>

      {/* Templates Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template, index) => (
            <div
              key={index}
              className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
              style={{
                borderColor: secondaryColor,
                backgroundColor: backgroundColor,
              }}
              onMouseEnter={() => setHoveredPreviewIndex(index)}
              onMouseLeave={() => setHoveredPreviewIndex(null)}
            >
              {/* Template Preview Placeholder */}
              <div
                className="w-full h-48 rounded-lg mb-4"
                style={{
                  backgroundColor: index % 3 === 0 ? primaryColor : index % 3 === 1 ? accentColor : secondaryColor,
                  opacity: 0.2,
                }}
              />

              {/* Category Badge */}
              <div className="mb-2">
                <span
                  className="px-3 py-1 rounded-full inline-block"
                  style={{
                    backgroundColor: (() => {
                      const categoryColors: { [key: string]: string } = {
                        'Marketing': '#FF6B6B',
                        'App': '#4ECDC4',
                        'Personal': '#95E1D3',
                        'Store': '#F38181',
                        'Content': '#AA96DA',
                        'SaaS': '#5B8DEE',
                        'Web': '#48C9B0',
                        'CRM': '#E85D75',
                      };
                      return categoryColors[template.category] || primaryColor;
                    })(),
                    color: backgroundColor,
                    fontSize: 'var(--font-size-sm)',
                  }}
                >
                  {template.category}
                </span>
              </div>

              {/* Template Info */}
              <h3 className="mb-2" style={{ color: textColor }}>
                {template.name}
              </h3>
              <p
                className="mb-4"
                style={{
                  color: textColor,
                  opacity: 0.7,
                  fontSize: 'var(--font-size-sm)',
                }}
              >
                {template.description}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-2" onMouseLeave={() => setHoveredPreviewIndex(null)}>
                <Button
                  size="sm"
                  className="flex-1 border-0"
                  style={{
                    backgroundColor: accentColor,
                    color: backgroundColor,
                  }}
                >
                  Use Template
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onMouseEnter={() => setHoveredPreviewIndex(index)}
                  className="border-0"
                  style={{
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: primaryColor,
                    backgroundColor: hoveredPreviewIndex === index ? primaryColor : 'transparent',
                    color: hoveredPreviewIndex === index ? backgroundColor : primaryColor,
                    transition: 'all 0.2s',
                  }}
                >
                  Preview
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div
        className="max-w-4xl mx-auto text-center mt-16 p-8 rounded-lg"
        style={{ backgroundColor: secondaryColor }}
      >
        <h2 className="mb-4" style={{ color: primaryColor }}>
          Need a Custom Template?
        </h2>
        <p className="mb-6" style={{ color: textColor, opacity: 0.8 }}>
          Get in touch with our team to create a custom template tailored to your specific needs.
        </p>
        <Button
          className="border-0"
          style={{
            backgroundColor: accentColor,
            color: backgroundColor,
          }}
        >
          Contact Us
        </Button>
      </div>
    </div>
  );
}