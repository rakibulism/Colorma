import React, { useRef } from 'react';
import { Button } from './ui/button';
import { Download, Copy, Code, Palette } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from './ui/dropdown-menu';
import svgPaths from '../imports/svg-e0jdea3k9o';
import imgAlphaDs from 'figma:asset/7e3373497f7a246471efb3156efbb70ccd73d4d3.png';
import { toast } from 'sonner@2.0.3';

interface ColorExporterProps {
  textColor: string;
  backgroundColor: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

export function ColorExporter({
  textColor,
  backgroundColor,
  primaryColor,
  secondaryColor,
  accentColor,
}: ColorExporterProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateOpacityVariations = () => {
    return [1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.05];
  };

  const hexToRGBA = (hex: string, opacity: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  // Code generation functions
  const generateCSS = () => {
    return `:root {
  --color-text: ${textColor};
  --color-background: ${backgroundColor};
  --color-primary: ${primaryColor};
  --color-secondary: ${secondaryColor};
  --color-accent: ${accentColor};
}`;
  };

  const generateSCSS = () => {
    return `$color-text: ${textColor};
$color-background: ${backgroundColor};
$color-primary: ${primaryColor};
$color-secondary: ${secondaryColor};
$color-accent: ${accentColor};`;
  };

  const generateTailwind = () => {
    return `module.exports = {
  theme: {
    extend: {
      colors: {
        text: '${textColor}',
        background: '${backgroundColor}',
        primary: '${primaryColor}',
        secondary: '${secondaryColor}',
        accent: '${accentColor}',
      },
    },
  },
};`;
  };

  const generateJSON = () => {
    return JSON.stringify({
      colors: {
        text: textColor,
        background: backgroundColor,
        primary: primaryColor,
        secondary: secondaryColor,
        accent: accentColor,
      }
    }, null, 2);
  };

  const generateJSX = () => {
    return `const colors = {
  text: '${textColor}',
  background: '${backgroundColor}',
  primary: '${primaryColor}',
  secondary: '${secondaryColor}',
  accent: '${accentColor}',
};

export default colors;`;
  };

  const generateTypeScript = () => {
    return `interface ColorPalette {
  text: string;
  background: string;
  primary: string;
  secondary: string;
  accent: string;
}

export const colors: ColorPalette = {
  text: '${textColor}',
  background: '${backgroundColor}',
  primary: '${primaryColor}',
  secondary: '${secondaryColor}',
  accent: '${accentColor}',
};`;
  };

  const generateFigmaTokens = () => {
    return JSON.stringify({
      global: {
        colors: {
          text: {
            value: textColor,
            type: "color"
          },
          background: {
            value: backgroundColor,
            type: "color"
          },
          primary: {
            value: primaryColor,
            type: "color"
          },
          secondary: {
            value: secondaryColor,
            type: "color"
          },
          accent: {
            value: accentColor,
            type: "color"
          }
        }
      }
    }, null, 2);
  };

  const generateFigmaVariables = () => {
    return JSON.stringify({
      collections: [
        {
          name: "Colors",
          modes: [
            {
              name: "Mode 1",
              variables: [
                {
                  name: "text",
                  type: "COLOR",
                  value: textColor
                },
                {
                  name: "background",
                  type: "COLOR",
                  value: backgroundColor
                },
                {
                  name: "primary",
                  type: "COLOR",
                  value: primaryColor
                },
                {
                  name: "secondary",
                  type: "COLOR",
                  value: secondaryColor
                },
                {
                  name: "accent",
                  type: "COLOR",
                  value: accentColor
                }
              ]
            }
          ]
        }
      ]
    }, null, 2);
  };

  // Copy functions for dev formats
  const copyAsCSS = () => {
    navigator.clipboard.writeText(generateCSS()).then(() => {
      toast.success('CSS copied to clipboard!');
    }).catch(() => {
      toast.error('Failed to copy CSS.');
    });
  };

  const copyAsSCSS = () => {
    navigator.clipboard.writeText(generateSCSS()).then(() => {
      toast.success('SCSS copied to clipboard!');
    }).catch(() => {
      toast.error('Failed to copy SCSS.');
    });
  };

  const copyAsTailwind = () => {
    navigator.clipboard.writeText(generateTailwind()).then(() => {
      toast.success('Tailwind config copied to clipboard!');
    }).catch(() => {
      toast.error('Failed to copy Tailwind config.');
    });
  };

  const copyAsJSON = () => {
    navigator.clipboard.writeText(generateJSON()).then(() => {
      toast.success('JSON copied to clipboard!');
    }).catch(() => {
      toast.error('Failed to copy JSON.');
    });
  };

  const copyAsJSX = () => {
    navigator.clipboard.writeText(generateJSX()).then(() => {
      toast.success('JSX copied to clipboard!');
    }).catch(() => {
      toast.error('Failed to copy JSX.');
    });
  };

  const copyAsTypeScript = () => {
    navigator.clipboard.writeText(generateTypeScript()).then(() => {
      toast.success('TypeScript copied to clipboard!');
    }).catch(() => {
      toast.error('Failed to copy TypeScript.');
    });
  };

  const copyAsFigmaTokens = () => {
    navigator.clipboard.writeText(generateFigmaTokens()).then(() => {
      toast.success('Figma Tokens copied to clipboard!');
    }).catch(() => {
      toast.error('Failed to copy Figma Tokens.');
    });
  };

  const copyAsFigmaVariables = () => {
    navigator.clipboard.writeText(generateFigmaVariables()).then(() => {
      toast.success('Figma Variables copied to clipboard!');
    }).catch(() => {
      toast.error('Failed to copy Figma Variables.');
    });
  };

  // Export functions for dev formats
  const exportAsCSS = () => {
    const blob = new Blob([generateCSS()], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'colors.css';
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportAsSCSS = () => {
    const blob = new Blob([generateSCSS()], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'colors.scss';
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportAsTailwind = () => {
    const blob = new Blob([generateTailwind()], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'tailwind.config.js';
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportAsJSON = () => {
    const blob = new Blob([generateJSON()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'colors.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportAsJSX = () => {
    const blob = new Blob([generateJSX()], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'colors.js';
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportAsTypeScript = () => {
    const blob = new Blob([generateTypeScript()], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'colors.ts';
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportAsFigmaTokens = () => {
    const blob = new Blob([generateFigmaTokens()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'figma-tokens.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportAsFigmaVariables = () => {
    const blob = new Blob([generateFigmaVariables()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'figma-variables.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const createColorPaletteCanvas = async () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const width = 856;
    const height = 1370;
    const padding = 48;
    canvas.width = width;
    canvas.height = height;

    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#fff2e3');
    gradient.addColorStop(1, '#ffffff');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    const logo = new Image();
    logo.crossOrigin = 'anonymous';
    logo.src = imgAlphaDs;
    
    await new Promise((resolve) => {
      logo.onload = resolve;
    });

    let yPos = padding;

    ctx.drawImage(logo, padding, yPos, 40, 40);
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 32px Inter, sans-serif';
    ctx.fillText('Alpha UI DS', padding + 40 + 16, yPos + 30);

    yPos += 40 + 32;

    ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, yPos);
    ctx.lineTo(width - padding, yPos);
    ctx.stroke();

    yPos += 32;

    ctx.fillStyle = '#000000';
    ctx.font = 'bold 24px Inter, sans-serif';
    ctx.fillText('Colorma', padding, yPos + 18);
    
    ctx.font = '18px Inter, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('https://colorma.figma.site', width - padding, yPos + 18);
    ctx.textAlign = 'left';

    yPos += 18 + 48;

    ctx.fillStyle = '#000000';
    ctx.font = 'bold 32px Inter, sans-serif';
    ctx.fillText('Core Color Palette', padding, yPos);

    yPos += 16;

    const colors = [
      { name: 'Text', value: textColor },
      { name: 'Background', value: backgroundColor },
      { name: 'Primary', value: primaryColor },
      { name: 'Secondary', value: secondaryColor },
      { name: 'Accent', value: accentColor },
    ];

    const swatchWidth = 140;
    const swatchHeight = 200;
    const swatchGap = 15;

    colors.forEach((color, index) => {
      const x = padding + (swatchWidth + swatchGap) * index;
      
      ctx.fillStyle = '#000000';
      ctx.font = '18px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(color.name, x + swatchWidth / 2, yPos + 18);
      
      ctx.fillStyle = color.value;
      ctx.fillRect(x, yPos + 18 + 13, swatchWidth, swatchHeight);
      ctx.strokeStyle = '#E0E0E0';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, yPos + 18 + 13, swatchWidth, swatchHeight);
      
      ctx.fillStyle = '#666666';
      ctx.font = '16px Inter, sans-serif';
      ctx.fillText(color.value.toUpperCase(), x + swatchWidth / 2, yPos + 18 + 13 + swatchHeight + 20);
    });

    yPos += 18 + 13 + swatchHeight + 20 + 48;

    const scaleColors = [
      { name: 'Primary', value: primaryColor },
      { name: 'Secondary', value: secondaryColor },
      { name: 'Accent', value: accentColor },
      { name: 'Text', value: textColor },
      { name: 'Background', value: backgroundColor },
    ];

    const scaleSwatchWidth = 69.09;
    const scaleSwatchHeight = 94;

    scaleColors.forEach((scaleColor) => {
      ctx.fillStyle = '#000000';
      ctx.font = '600 20px Inter, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(scaleColor.name, padding, yPos + 16);
      
      yPos += 12 + 16;
      
      const opacities = generateOpacityVariations();
      opacities.forEach((opacity, opacityIndex) => {
        const x = padding + opacityIndex * scaleSwatchWidth;
        ctx.fillStyle = hexToRGBA(scaleColor.value, opacity);
        ctx.fillRect(x, yPos, scaleSwatchWidth, scaleSwatchHeight);
      });
      
      yPos += scaleSwatchHeight + 32;
    });

    ctx.textAlign = 'left';

    return canvas;
  };

  const generateSVGContent = () => {
    const padding = 48;
    const width = 856;
    const height = 1370;

    const colors = [
      { name: 'Text', value: textColor },
      { name: 'Background', value: backgroundColor },
      { name: 'Primary', value: primaryColor },
      { name: 'Secondary', value: secondaryColor },
      { name: 'Accent', value: accentColor },
    ];

    const swatchWidth = 140;
    const swatchHeight = 200;
    const swatchGap = 15;

    let svgContent = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#fff2e3;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#ffffff;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#bgGradient)"/>`;

    let yPos = padding;

    svgContent += `
      <image x="${padding}" y="${yPos}" width="40" height="40" xlink:href="${imgAlphaDs}" />
      <text x="${padding + 40 + 16}" y="${yPos + 30}" font-family="Inter, sans-serif" font-size="32" font-weight="bold" fill="#000000">Alpha UI DS</text>`;

    yPos += 40 + 32;

    svgContent += `
      <line x1="${padding}" y1="${yPos}" x2="${width - padding}" y2="${yPos}" stroke="rgba(0,0,0,0.2)" stroke-width="1"/>`;

    yPos += 32;

    svgContent += `
      <text x="${padding}" y="${yPos + 18}" font-family="Inter, sans-serif" font-size="24" font-weight="bold" fill="#000000">Colorma</text>
      <text x="${width - padding}" y="${yPos + 18}" font-family="Inter, sans-serif" font-size="18" fill="#000000" text-anchor="end" text-decoration="underline">https://colorma.figma.site</text>`;

    yPos += 18 + 48;

    svgContent += `
      <text x="${padding}" y="${yPos}" font-family="Inter, sans-serif" font-size="32" font-weight="bold" fill="#000000">Core Color Palette</text>`;

    yPos += 16;

    colors.forEach((color, index) => {
      const x = padding + (swatchWidth + swatchGap) * index;
      
      svgContent += `
      <text x="${x + swatchWidth / 2}" y="${yPos + 18}" font-family="Inter, sans-serif" font-size="18" text-anchor="middle" fill="#000000">${color.name}</text>
      <path d="${svgPaths.p8a8980}" transform="translate(${x},${yPos + 18 + 13})" fill="${color.value}" stroke="#E0E0E0" stroke-width="1"/>
      <text x="${x + swatchWidth / 2}" y="${yPos + 18 + 13 + swatchHeight + 20}" font-family="Inter, sans-serif" font-size="16" text-anchor="middle" fill="#666666">${color.value.toUpperCase()}</text>`;
    });

    yPos += 18 + 13 + swatchHeight + 20 + 48;

    const scaleColors = [
      { name: 'Primary', value: primaryColor },
      { name: 'Secondary', value: secondaryColor },
      { name: 'Accent', value: accentColor },
      { name: 'Text', value: textColor },
      { name: 'Background', value: backgroundColor },
    ];

    const scaleSwatchWidth = 69.09;
    const scaleSwatchHeight = 94;

    scaleColors.forEach((scaleColor) => {
      svgContent += `
      <text x="${padding}" y="${yPos + 16}" font-family="Inter, sans-serif" font-size="20" font-weight="600" fill="#000000">${scaleColor.name}</text>`;
      
      yPos += 12 + 16;
      
      const opacities = generateOpacityVariations();
      opacities.forEach((opacity, opacityIndex) => {
        const x = padding + opacityIndex * scaleSwatchWidth;
        svgContent += `
      <path d="${svgPaths.p1380dd80}" transform="translate(${x},${yPos})" fill="${scaleColor.value}" opacity="${opacity}"/>`;
      });
      
      yPos += scaleSwatchHeight + 32;
    });

    svgContent += '</svg>';
    return svgContent;
  };

  const exportDesignAsSVG = () => {
    const svgContent = generateSVGContent();
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'color-palette.svg';
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportDesignAsImage = async (format: 'png' | 'jpg' | 'jpeg') => {
    const canvas = await createColorPaletteCanvas();
    if (!canvas) return;

    const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';

    canvas.toBlob((blob) => {
      if (!blob) return;
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `color-palette.${format}`;
      link.click();
      URL.revokeObjectURL(url);
    }, mimeType, 0.95);
  };

  const copyToFigma = async () => {
    try {
      const svgContent = generateSVGContent();
      const blob = new Blob([svgContent], { type: 'image/svg+xml' });
      await navigator.clipboard.write([
        new ClipboardItem({
          'image/svg+xml': blob,
        }),
      ]);
      toast.success('Copied to clipboard! Paste in Figma with Cmd+V');
    } catch (err) {
      toast.error('Failed to copy to Figma.');
    }
  };

  const copyDesignAsSVG = async () => {
    try {
      const svgContent = generateSVGContent();
      await navigator.clipboard.writeText(svgContent);
      toast.success('SVG code copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy SVG.');
    }
  };

  const copyDesignAsImage = async (format: 'png' | 'jpg' | 'jpeg') => {
    try {
      const canvas = await createColorPaletteCanvas();
      if (!canvas) {
        toast.error('Failed to create image.');
        return;
      }

      const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';
      
      canvas.toBlob(async (blob) => {
        if (!blob) {
          toast.error('Failed to create image.');
          return;
        }
        
        try {
          await navigator.clipboard.write([
            new ClipboardItem({
              [mimeType]: blob,
            }),
          ]);
          toast.success(`${format.toUpperCase()} copied to clipboard!`);
        } catch (err) {
          toast.error('Failed to copy image.');
        }
      }, mimeType, 0.95);
    } catch (err) {
      toast.error('Failed to copy image.');
    }
  };

  return (
    <>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="sm"
            variant="outline"
            className="gap-2 border-0 whitespace-nowrap"
            style={{
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: 'var(--border)',
              backgroundColor: 'var(--card)',
              color: 'var(--foreground)',
            }}
          >
            <Download className="w-4 h-4" />
            Export
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          style={{
            backgroundColor: 'var(--card)',
            borderColor: 'var(--border)',
          }}
        >
          {/* Copy As (Design) */}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger
              style={{
                color: 'var(--foreground)',
                cursor: 'pointer',
              }}
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy as
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent
              style={{
                backgroundColor: 'var(--card)',
                borderColor: 'var(--border)',
              }}
            >
              <DropdownMenuItem
                onClick={copyToFigma}
                style={{
                  color: 'var(--foreground)',
                  cursor: 'pointer',
                }}
              >
                <Palette className="w-4 h-4 mr-2" />
                Figma
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={copyDesignAsSVG}
                style={{
                  color: 'var(--foreground)',
                  cursor: 'pointer',
                }}
              >
                SVG
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => copyDesignAsImage('png')}
                style={{
                  color: 'var(--foreground)',
                  cursor: 'pointer',
                }}
              >
                PNG
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => copyDesignAsImage('jpg')}
                style={{
                  color: 'var(--foreground)',
                  cursor: 'pointer',
                }}
              >
                JPG
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => copyDesignAsImage('jpeg')}
                style={{
                  color: 'var(--foreground)',
                  cursor: 'pointer',
                }}
              >
                JPEG
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          {/* Export As (Design) */}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger
              style={{
                color: 'var(--foreground)',
                cursor: 'pointer',
              }}
            >
              <Download className="w-4 h-4 mr-2" />
              Export as
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent
              style={{
                backgroundColor: 'var(--card)',
                borderColor: 'var(--border)',
              }}
            >
              <DropdownMenuItem
                onClick={exportDesignAsSVG}
                style={{
                  color: 'var(--foreground)',
                  cursor: 'pointer',
                }}
              >
                SVG
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => exportDesignAsImage('png')}
                style={{
                  color: 'var(--foreground)',
                  cursor: 'pointer',
                }}
              >
                PNG
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => exportDesignAsImage('jpg')}
                style={{
                  color: 'var(--foreground)',
                  cursor: 'pointer',
                }}
              >
                JPG
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => exportDesignAsImage('jpeg')}
                style={{
                  color: 'var(--foreground)',
                  cursor: 'pointer',
                }}
              >
                JPEG
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          <DropdownMenuSeparator />

          {/* Copy for Dev */}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger
              style={{
                color: 'var(--foreground)',
                cursor: 'pointer',
              }}
            >
              <Code className="w-4 h-4 mr-2" />
              Copy for dev
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent
              style={{
                backgroundColor: 'var(--card)',
                borderColor: 'var(--border)',
              }}
            >
              <DropdownMenuItem
                onClick={copyAsCSS}
                style={{
                  color: 'var(--foreground)',
                  cursor: 'pointer',
                }}
              >
                CSS
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={copyAsSCSS}
                style={{
                  color: 'var(--foreground)',
                  cursor: 'pointer',
                }}
              >
                SCSS
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={copyAsTailwind}
                style={{
                  color: 'var(--foreground)',
                  cursor: 'pointer',
                }}
              >
                Tailwind
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={copyAsJSX}
                style={{
                  color: 'var(--foreground)',
                  cursor: 'pointer',
                }}
              >
                JSX
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={copyAsTypeScript}
                style={{
                  color: 'var(--foreground)',
                  cursor: 'pointer',
                }}
              >
                TypeScript
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={copyAsJSON}
                style={{
                  color: 'var(--foreground)',
                  cursor: 'pointer',
                }}
              >
                JSON
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={copyAsFigmaTokens}
                style={{
                  color: 'var(--foreground)',
                  cursor: 'pointer',
                }}
              >
                Figma Tokens
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={copyAsFigmaVariables}
                style={{
                  color: 'var(--foreground)',
                  cursor: 'pointer',
                }}
              >
                Figma Variables
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          {/* Export for Dev */}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger
              style={{
                color: 'var(--foreground)',
                cursor: 'pointer',
              }}
            >
              <Code className="w-4 h-4 mr-2" />
              Export for dev
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent
              style={{
                backgroundColor: 'var(--card)',
                borderColor: 'var(--border)',
              }}
            >
              <DropdownMenuItem
                onClick={exportAsCSS}
                style={{
                  color: 'var(--foreground)',
                  cursor: 'pointer',
                }}
              >
                CSS
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={exportAsSCSS}
                style={{
                  color: 'var(--foreground)',
                  cursor: 'pointer',
                }}
              >
                SCSS
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={exportAsTailwind}
                style={{
                  color: 'var(--foreground)',
                  cursor: 'pointer',
                }}
              >
                Tailwind
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={exportAsJSX}
                style={{
                  color: 'var(--foreground)',
                  cursor: 'pointer',
                }}
              >
                JSX
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={exportAsTypeScript}
                style={{
                  color: 'var(--foreground)',
                  cursor: 'pointer',
                }}
              >
                TypeScript
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={exportAsJSON}
                style={{
                  color: 'var(--foreground)',
                  cursor: 'pointer',
                }}
              >
                JSON
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={exportAsFigmaTokens}
                style={{
                  color: 'var(--foreground)',
                  cursor: 'pointer',
                }}
              >
                Figma Tokens
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={exportAsFigmaVariables}
                style={{
                  color: 'var(--foreground)',
                  cursor: 'pointer',
                }}
              >
                Figma Variables
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}