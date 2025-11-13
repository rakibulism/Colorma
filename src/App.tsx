import React, { useState, useEffect } from 'react';
import { Button } from './components/ui/button';
import { Github } from 'lucide-react';
import { MinimalColorPicker } from './components/MinimalColorPicker';
import { MinimalContrastInfo } from './components/MinimalContrastInfo';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { ColorExporter } from './components/ColorExporter';
import { HomePage } from './components/HomePage';
import { AlphaDSPage } from './components/AlphaDSPage';
import { ProductsPage } from './components/ProductsPage';
import { PricingPage } from './components/PricingPage';
import { AboutPage } from './components/AboutPage';
import { TemplatesPage } from './components/TemplatesPage';
import { generateAccessiblePalette, adaptColorsToTheme } from './utils/colorUtils';
import { useTheme } from './hooks/useTheme';

type PageType = 'home' | 'alphads' | 'products' | 'pricing' | 'about' | 'templates';

export default function App() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [textColor, setTextColor] = useState('#050315');
  const [backgroundColor, setBackgroundColor] = useState('#FBFBFE');
  const [primaryColor, setPrimaryColor] = useState('#2F27CE');
  const [secondaryColor, setSecondaryColor] = useState('#DEDCFF');
  const [accentColor, setAccentColor] = useState('#433BFF');
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  // Update colors when theme changes - adapt existing colors instead of randomizing
  useEffect(() => {
    const currentColors = {
      text: textColor,
      background: backgroundColor,
      primary: primaryColor,
      secondary: secondaryColor,
      accent: accentColor,
    };

    const adaptedColors = adaptColorsToTheme(currentColors, resolvedTheme);
    setTextColor(adaptedColors.text);
    setBackgroundColor(adaptedColors.background);
    setPrimaryColor(adaptedColors.primary);
    setSecondaryColor(adaptedColors.secondary);
    setAccentColor(adaptedColors.accent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedTheme]);

  const handleRandomize = () => {
    // Generate palette based on current theme
    const palette = generateAccessiblePalette(resolvedTheme);
    setTextColor(palette.text);
    setBackgroundColor(palette.background);
    setPrimaryColor(palette.primary);
    setSecondaryColor(palette.secondary);
    setAccentColor(palette.accent);
  };

  return (
    <div className="min-h-screen relative pb-24" style={{ backgroundColor, color: textColor }}>
      {/* Preview Website */}
      <div className="max-w-7xl mx-auto">
        {/* Navigation */}
        <nav className="px-6 py-4 flex items-center justify-between border-b" style={{ borderColor: secondaryColor }}>
          <div className="flex items-center gap-8">
            <button onClick={() => setCurrentPage('home')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
              <h3 style={{ color: primaryColor }}>Brand</h3>
            </button>
            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={() => setCurrentPage('alphads')}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  color: currentPage === 'alphads' ? primaryColor : textColor,
                  fontWeight: currentPage === 'alphads' ? 'var(--font-weight-medium)' : 'var(--font-weight-normal)'
                }}
              >
                Alpha DS
              </button>
              <button
                onClick={() => setCurrentPage('products')}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  color: currentPage === 'products' ? primaryColor : textColor,
                  fontWeight: currentPage === 'products' ? 'var(--font-weight-medium)' : 'var(--font-weight-normal)'
                }}
              >
                Products
              </button>
              <a href="#" style={{ color: textColor }}>Features</a>
              <button
                onClick={() => setCurrentPage('pricing')}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  color: currentPage === 'pricing' ? primaryColor : textColor,
                  fontWeight: currentPage === 'pricing' ? 'var(--font-weight-medium)' : 'var(--font-weight-normal)'
                }}
              >
                Pricing
              </button>
              <button
                onClick={() => setCurrentPage('about')}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  color: currentPage === 'about' ? primaryColor : textColor,
                  fontWeight: currentPage === 'about' ? 'var(--font-weight-medium)' : 'var(--font-weight-normal)'
                }}
              >
                About
              </button>
              <button
                onClick={() => setCurrentPage('templates')}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  color: currentPage === 'templates' ? primaryColor : textColor,
                  fontWeight: currentPage === 'templates' ? 'var(--font-weight-medium)' : 'var(--font-weight-normal)'
                }}
              >
                Templates
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/rakibulism/Colorma" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                color: textColor,
                opacity: 0.8,
                transition: 'opacity 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
            >
              <Github className="w-5 h-5" />
            </a>
            <Button
              size="sm"
              className="border-0"
              style={{ backgroundColor: accentColor, color: backgroundColor }}
            >
              Sign In
            </Button>
          </div>
        </nav>

        {/* Page Content */}
        {currentPage === 'home' && (
          <HomePage
            textColor={textColor}
            backgroundColor={backgroundColor}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            accentColor={accentColor}
          />
        )}
        
        {currentPage === 'alphads' && (
          <AlphaDSPage
            textColor={textColor}
            backgroundColor={backgroundColor}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            accentColor={accentColor}
          />
        )}
        
        {currentPage === 'products' && (
          <ProductsPage
            textColor={textColor}
            backgroundColor={backgroundColor}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            accentColor={accentColor}
          />
        )}
        
        {currentPage === 'pricing' && (
          <PricingPage
            textColor={textColor}
            backgroundColor={backgroundColor}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            accentColor={accentColor}
          />
        )}
        
        {currentPage === 'about' && (
          <AboutPage
            textColor={textColor}
            backgroundColor={backgroundColor}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            accentColor={accentColor}
          />
        )}
        
        {currentPage === 'templates' && (
          <TemplatesPage
            textColor={textColor}
            backgroundColor={backgroundColor}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            accentColor={accentColor}
          />
        )}
      </div>

      {/* Bottom Color Toolbar */}
      <div 
        className="fixed bottom-0 left-0 right-0 z-50 border-t shadow-lg"
        style={{
          backgroundColor: 'var(--card)',
          borderColor: 'var(--border)',
        }}
      >
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-1">
            {/* Theme Switcher */}
            <ThemeSwitcher theme={theme} onChange={setTheme} />
            <div className="w-px h-6" style={{ backgroundColor: 'var(--border)' }} />
            
            {/* Color Pickers */}
            <MinimalColorPicker label="Text" value={textColor} onChange={setTextColor} />
            <div className="w-px h-6" style={{ backgroundColor: 'var(--border)' }} />
            <MinimalColorPicker label="Background" value={backgroundColor} onChange={setBackgroundColor} />
            <div className="w-px h-6" style={{ backgroundColor: 'var(--border)' }} />
            <MinimalColorPicker label="Primary" value={primaryColor} onChange={setPrimaryColor} />
            <div className="w-px h-6" style={{ backgroundColor: 'var(--border)' }} />
            <MinimalColorPicker label="Secondary" value={secondaryColor} onChange={setSecondaryColor} />
            <div className="w-px h-6" style={{ backgroundColor: 'var(--border)' }} />
            <MinimalColorPicker label="Accent" value={accentColor} onChange={setAccentColor} />
            <div className="w-px h-6" style={{ backgroundColor: 'var(--border)' }} />
            
            {/* Contrast Info */}
            <MinimalContrastInfo 
              textColor={textColor} 
              backgroundColor={backgroundColor} 
              primaryColor={primaryColor} 
            />
          </div>

          {/* Randomize Button */}
          <div className="flex items-center gap-2">
            <Button
              onClick={handleRandomize}
              size="sm"
              className="gap-2 border-0 whitespace-nowrap"
              style={{ backgroundColor: accentColor, color: backgroundColor }}
            >
              Randomize
            </Button>
            
            {/* Divider */}
            <div className="w-px h-6" style={{ backgroundColor: 'var(--border)' }} />
            
            {/* Export Button */}
            <ColorExporter
              textColor={textColor}
              backgroundColor={backgroundColor}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
              accentColor={accentColor}
            />
          </div>
        </div>
      </div>
    </div>
  );
}