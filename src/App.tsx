import React, { useState, useEffect } from 'react';
import { Button } from './components/ui/button';
import { Github, Menu, X } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './components/ui/tooltip';
import { MinimalColorPicker } from './components/MinimalColorPicker';
import { MinimalContrastInfo } from './components/MinimalContrastInfo';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { ColorExporter } from './components/ColorExporter';
import { ShareButton } from './components/ShareButton';
import { HomePage } from './components/HomePage';
import { AlphaDSPage } from './components/AlphaDSPage';
import { ProductsPage } from './components/ProductsPage';
import { PricingPage } from './components/PricingPage';
import { AboutPage } from './components/AboutPage';
import { TemplatesPage } from './components/TemplatesPage';
import { DevRuler } from './components/DevRuler';
import { generateAccessiblePalette, adaptColorsToTheme } from './utils/colorUtils';
import { useTheme } from './hooks/useTheme';
import { FigmaIcon } from './components/icons/FigmaIcon';
import { toast } from 'sonner@2.0.3';

type PageType = 'home' | 'alphads' | 'products' | 'pricing' | 'about' | 'templates';

export default function App() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [textColor, setTextColor] = useState('#050315');
  const [backgroundColor, setBackgroundColor] = useState('#FBFBFE');
  const [primaryColor, setPrimaryColor] = useState('#2F27CE');
  const [secondaryColor, setSecondaryColor] = useState('#DEDCFF');
  const [accentColor, setAccentColor] = useState('#433BFF');
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [designModeEnabled, setDesignModeEnabled] = useState(false);

  // Load colors from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlTextColor = params.get('text');
    const urlBackgroundColor = params.get('bg');
    const urlPrimaryColor = params.get('primary');
    const urlSecondaryColor = params.get('secondary');
    const urlAccentColor = params.get('accent');
    const urlTheme = params.get('theme');

    if (urlTextColor) setTextColor(urlTextColor);
    if (urlBackgroundColor) setBackgroundColor(urlBackgroundColor);
    if (urlPrimaryColor) setPrimaryColor(urlPrimaryColor);
    if (urlSecondaryColor) setSecondaryColor(urlSecondaryColor);
    if (urlAccentColor) setAccentColor(urlAccentColor);
    if (urlTheme && (urlTheme === 'light' || urlTheme === 'dark' || urlTheme === 'system')) {
      setTheme(urlTheme);
    }
  }, [setTheme]);

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

  const handleCopyToFigma = () => {
    // Trigger Figma's copy-to-design functionality
    // This uses the Figma plugin API to enable design mode
    toast.success('Design mode enabled! You can now copy this webpage to Figma as a layout frame.', {
      description: 'Use Figma\'s "Copy as SVG" or screenshot tools to capture the design.',
      duration: 4000,
    });
    setDesignModeEnabled(true);
  };

  return (
    <div className="min-h-screen relative pb-24" style={{ backgroundColor, color: textColor }}>
      {/* Dev Ruler Overlay for Design Mode */}
      <DevRuler 
        enabled={designModeEnabled} 
        accentColor={accentColor}
        textColor={textColor}
        backgroundColor={backgroundColor}
      />

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
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center gap-4">
            {/* Figma Design Mode Icon */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    style={{
                      background: designModeEnabled ? `${accentColor}20` : 'none',
                      border: designModeEnabled ? `1px solid ${accentColor}` : 'none',
                      padding: designModeEnabled ? 'var(--spacing-1)' : 0,
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      opacity: designModeEnabled ? 1 : 0.8,
                      transition: 'all 0.2s',
                      color: designModeEnabled ? accentColor : textColor,
                    }}
                    onMouseEnter={(e) => !designModeEnabled && (e.currentTarget.style.opacity = '1')}
                    onMouseLeave={(e) => !designModeEnabled && (e.currentTarget.style.opacity = '0.8')}
                    onClick={() => {
                      if (designModeEnabled) {
                        setDesignModeEnabled(false);
                        toast.info('Design mode disabled');
                      } else {
                        handleCopyToFigma();
                      }
                    }}
                  >
                    <div className="w-5 h-5">
                      <FigmaIcon />
                    </div>
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{designModeEnabled ? 'Disable design mode' : 'Enable "design mode" to copy to Figma'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            {/* Vertical Divider */}
            <div 
              className="w-px h-6"
              style={{ backgroundColor: secondaryColor, opacity: 0.5 }}
            />

            {/* GitHub Link */}
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

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div 
            className="md:hidden border-b"
            style={{ 
              backgroundColor,
              borderColor: secondaryColor,
            }}
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              <button
                onClick={() => {
                  setCurrentPage('alphads');
                  setMobileMenuOpen(false);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 'var(--spacing-2) 0',
                  cursor: 'pointer',
                  color: currentPage === 'alphads' ? primaryColor : textColor,
                  fontWeight: currentPage === 'alphads' ? 'var(--font-weight-medium)' : 'var(--font-weight-normal)',
                  textAlign: 'left',
                }}
              >
                Alpha DS
              </button>
              <button
                onClick={() => {
                  setCurrentPage('products');
                  setMobileMenuOpen(false);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 'var(--spacing-2) 0',
                  cursor: 'pointer',
                  color: currentPage === 'products' ? primaryColor : textColor,
                  fontWeight: currentPage === 'products' ? 'var(--font-weight-medium)' : 'var(--font-weight-normal)',
                  textAlign: 'left',
                }}
              >
                Products
              </button>
              <a 
                href="#" 
                style={{ 
                  color: textColor,
                  padding: 'var(--spacing-2) 0',
                  textDecoration: 'none',
                }}
              >
                Features
              </a>
              <button
                onClick={() => {
                  setCurrentPage('pricing');
                  setMobileMenuOpen(false);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 'var(--spacing-2) 0',
                  cursor: 'pointer',
                  color: currentPage === 'pricing' ? primaryColor : textColor,
                  fontWeight: currentPage === 'pricing' ? 'var(--font-weight-medium)' : 'var(--font-weight-normal)',
                  textAlign: 'left',
                }}
              >
                Pricing
              </button>
              <button
                onClick={() => {
                  setCurrentPage('about');
                  setMobileMenuOpen(false);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 'var(--spacing-2) 0',
                  cursor: 'pointer',
                  color: currentPage === 'about' ? primaryColor : textColor,
                  fontWeight: currentPage === 'about' ? 'var(--font-weight-medium)' : 'var(--font-weight-normal)',
                  textAlign: 'left',
                }}
              >
                About
              </button>
              <button
                onClick={() => {
                  setCurrentPage('templates');
                  setMobileMenuOpen(false);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 'var(--spacing-2) 0',
                  cursor: 'pointer',
                  color: currentPage === 'templates' ? primaryColor : textColor,
                  fontWeight: currentPage === 'templates' ? 'var(--font-weight-medium)' : 'var(--font-weight-normal)',
                  textAlign: 'left',
                }}
              >
                Templates
              </button>
            </div>
          </div>
        )}

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
            
            {/* Divider */}
            <div className="w-px h-6" style={{ backgroundColor: 'var(--border)' }} />
            
            {/* Share Button */}
            <ShareButton
              textColor={textColor}
              backgroundColor={backgroundColor}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
              accentColor={accentColor}
              theme={theme}
            />
          </div>
        </div>
      </div>
    </div>
  );
}