import React, { useRef } from 'react';
import { Button } from './ui/button';
import { Download, Copy } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import svgPaths from '../imports/svg-e0jdea3k9o';
import imgAlphaDs from 'figma:asset/7e3373497f7a246471efb3156efbb70ccd73d4d3.png';
import { toast } from 'sonner';

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

  // Helper function to generate opacity variations
  const generateOpacityVariations = () => {
    return [1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.05];
  };

  // Helper function to apply opacity to hex color
  const hexToRGBA = (hex: string, opacity: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  const createColorPaletteCanvas = async () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Canvas dimensions - matching Figma autolayout
    const width = 856;
    const height = 1370;
    const padding = 48;
    canvas.width = width;
    canvas.height = height;

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#fff2e3');
    gradient.addColorStop(1, '#ffffff');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Load logo image
    const logo = new Image();
    logo.crossOrigin = 'anonymous';
    logo.src = imgAlphaDs;
    
    await new Promise((resolve) => {
      logo.onload = resolve;
    });

    let yPos = padding;

    // Draw logo and title (Frame16)
    ctx.drawImage(logo, padding, yPos, 40, 40);
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 32px Inter, sans-serif';
    ctx.fillText('Alpha UI DS', padding + 40 + 16, yPos + 30);

    yPos += 40 + 32; // logo height + gap

    // Draw separator line
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, yPos);
    ctx.lineTo(width - padding, yPos);
    ctx.stroke();

    yPos += 32; // gap after separator

    // Draw project name and URL (Frame17)
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 24px Inter, sans-serif';
    ctx.fillText('Colorma', padding, yPos + 18);
    
    ctx.font = '18px Inter, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('https://colorma.figma.site', width - padding, yPos + 18);
    ctx.textAlign = 'left';

    yPos += 18 + 48; // text height + gap to next section

    // Core Color Palette section (Frame6)
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 32px Inter, sans-serif';
    ctx.fillText('Core Color Palette', padding, yPos);

    yPos += 16; // gap after title

    // Draw core color swatches (Frame5)
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
      
      // Draw label above swatch
      ctx.fillStyle = '#000000';
      ctx.font = '18px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(color.name, x + swatchWidth / 2, yPos + 18);
      
      // Draw color swatch with border
      ctx.fillStyle = color.value;
      ctx.fillRect(x, yPos + 18 + 13, swatchWidth, swatchHeight);
      ctx.strokeStyle = '#E0E0E0';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, yPos + 18 + 13, swatchWidth, swatchHeight);
      
      // Draw hex value below swatch
      ctx.fillStyle = '#666666';
      ctx.font = '16px Inter, sans-serif';
      ctx.fillText(color.value.toUpperCase(), x + swatchWidth / 2, yPos + 18 + 13 + swatchHeight + 20);
    });

    yPos += 18 + 13 + swatchHeight + 20 + 48; // move to color scales section

    // Individual color scales
    const scaleColors = [
      { name: 'Primary', value: primaryColor },
      { name: 'Secondary', value: secondaryColor },
      { name: 'Accent', value: accentColor },
      { name: 'Text', value: textColor },
      { name: 'Background', value: backgroundColor },
    ];

    const scaleSwatchWidth = 69.09; // 760 / 11
    const scaleSwatchHeight = 94;

    scaleColors.forEach((scaleColor, scaleIndex) => {
      // Draw scale name
      ctx.fillStyle = '#000000';
      ctx.font = '600 20px Inter, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(scaleColor.name, padding, yPos + 16);
      
      yPos += 12 + 16; // gap + text height
      
      // Draw opacity variations
      const opacities = generateOpacityVariations();
      opacities.forEach((opacity, opacityIndex) => {
        const x = padding + opacityIndex * scaleSwatchWidth;
        ctx.fillStyle = hexToRGBA(scaleColor.value, opacity);
        ctx.fillRect(x, yPos, scaleSwatchWidth, scaleSwatchHeight);
      });
      
      yPos += scaleSwatchHeight + 32; // swatch height + gap to next scale
    });

    ctx.textAlign = 'left'; // reset

    return canvas;
  };

  const exportAsSVG = () => {
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

    // Logo and title
    svgContent += `
      <image x="${padding}" y="${yPos}" width="40" height="40" xlink:href="${imgAlphaDs}" />
      <text x="${padding + 40 + 16}" y="${yPos + 30}" font-family="Inter, sans-serif" font-size="32" font-weight="bold" fill="#000000">Alpha UI DS</text>`;

    yPos += 40 + 32;

    // Separator
    svgContent += `
      <line x1="${padding}" y1="${yPos}" x2="${width - padding}" y2="${yPos}" stroke="rgba(0,0,0,0.2)" stroke-width="1"/>`;

    yPos += 32;

    // Project info
    svgContent += `
      <text x="${padding}" y="${yPos + 18}" font-family="Inter, sans-serif" font-size="24" font-weight="bold" fill="#000000">Colorma</text>
      <text x="${width - padding}" y="${yPos + 18}" font-family="Inter, sans-serif" font-size="18" fill="#000000" text-anchor="end" text-decoration="underline">https://colorma.figma.site</text>`;

    yPos += 18 + 48;

    // Core Color Palette title
    svgContent += `
      <text x="${padding}" y="${yPos}" font-family="Inter, sans-serif" font-size="32" font-weight="bold" fill="#000000">Core Color Palette</text>`;

    yPos += 16;

    // Core color swatches
    colors.forEach((color, index) => {
      const x = padding + (swatchWidth + swatchGap) * index;
      
      svgContent += `
      <text x="${x + swatchWidth / 2}" y="${yPos + 18}" font-family="Inter, sans-serif" font-size="18" text-anchor="middle" fill="#000000">${color.name}</text>
      <path d="${svgPaths.p8a8980}" transform="translate(${x},${yPos + 18 + 13})" fill="${color.value}" stroke="#E0E0E0" stroke-width="1"/>
      <text x="${x + swatchWidth / 2}" y="${yPos + 18 + 13 + swatchHeight + 20}" font-family="Inter, sans-serif" font-size="16" text-anchor="middle" fill="#666666">${color.value.toUpperCase()}</text>`;
    });

    yPos += 18 + 13 + swatchHeight + 20 + 48;

    // Individual color scales
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

    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'color-palette.svg';
    link.click();
    URL.revokeObjectURL(url);
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

    // Logo and title
    svgContent += `
      <image x="${padding}" y="${yPos}" width="40" height="40" xlink:href="${imgAlphaDs}" />
      <text x="${padding + 40 + 16}" y="${yPos + 30}" font-family="Inter, sans-serif" font-size="32" font-weight="bold" fill="#000000">Alpha UI DS</text>`;

    yPos += 40 + 32;

    // Separator
    svgContent += `
      <line x1="${padding}" y1="${yPos}" x2="${width - padding}" y2="${yPos}" stroke="rgba(0,0,0,0.2)" stroke-width="1"/>`;

    yPos += 32;

    // Project info
    svgContent += `
      <text x="${padding}" y="${yPos + 18}" font-family="Inter, sans-serif" font-size="24" font-weight="bold" fill="#000000">Colorma</text>
      <text x="${width - padding}" y="${yPos + 18}" font-family="Inter, sans-serif" font-size="18" fill="#000000" text-anchor="end" text-decoration="underline">https://colorma.figma.site</text>`;

    yPos += 18 + 48;

    // Core Color Palette title
    svgContent += `
      <text x="${padding}" y="${yPos}" font-family="Inter, sans-serif" font-size="32" font-weight="bold" fill="#000000">Core Color Palette</text>`;

    yPos += 16;

    // Core color swatches
    colors.forEach((color, index) => {
      const x = padding + (swatchWidth + swatchGap) * index;
      
      svgContent += `
      <text x="${x + swatchWidth / 2}" y="${yPos + 18}" font-family="Inter, sans-serif" font-size="18" text-anchor="middle" fill="#000000">${color.name}</text>
      <path d="${svgPaths.p8a8980}" transform="translate(${x},${yPos + 18 + 13})" fill="${color.value}" stroke="#E0E0E0" stroke-width="1"/>
      <text x="${x + swatchWidth / 2}" y="${yPos + 18 + 13 + swatchHeight + 20}" font-family="Inter, sans-serif" font-size="16" text-anchor="middle" fill="#666666">${color.value.toUpperCase()}</text>`;
    });

    yPos += 18 + 13 + swatchHeight + 20 + 48;

    // Individual color scales
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

  const exportAsImage = async (format: 'png' | 'jpg' | 'jpeg') => {
    const canvas = await createColorPaletteCanvas();
    if (!canvas) return;

    const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';
    const extension = format;

    canvas.toBlob((blob) => {
      if (!blob) return;
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `color-palette.${extension}`;
      link.click();
      URL.revokeObjectURL(url);
    }, mimeType, 0.95);
  };

  const copyColorsToClipboard = () => {
    const colors = [
      { name: 'Text', value: textColor },
      { name: 'Background', value: backgroundColor },
      { name: 'Primary', value: primaryColor },
      { name: 'Secondary', value: secondaryColor },
      { name: 'Accent', value: accentColor },
    ];

    const colorData = colors.map(color => `${color.name}: ${color.value}`).join('\n');
    navigator.clipboard.writeText(colorData).then(() => {
      toast.success('Colors copied to clipboard!');
    }).catch(err => {
      toast.error('Failed to copy colors to clipboard.');
    });
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

  const copyAsSVG = async () => {
    try {
      const svgContent = generateSVGContent();
      await navigator.clipboard.writeText(svgContent);
      toast.success('SVG code copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy SVG.');
    }
  };

  const copyAsImage = async (format: 'png' | 'jpg' | 'jpeg') => {
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
          <DropdownMenuItem
            onClick={exportAsSVG}
            style={{
              color: 'var(--foreground)',
              cursor: 'pointer',
            }}
          >
            Export as SVG
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => exportAsImage('png')}
            style={{
              color: 'var(--foreground)',
              cursor: 'pointer',
            }}
          >
            Export as PNG
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => exportAsImage('jpg')}
            style={{
              color: 'var(--foreground)',
              cursor: 'pointer',
            }}
          >
            Export as JPG
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => exportAsImage('jpeg')}
            style={{
              color: 'var(--foreground)',
              cursor: 'pointer',
            }}
          >
            Export as JPEG
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={copyColorsToClipboard}
            style={{
              color: 'var(--foreground)',
              cursor: 'pointer',
            }}
          >
            Copy Colors to Clipboard
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={copyToFigma}
            style={{
              color: 'var(--foreground)',
              cursor: 'pointer',
            }}
          >
            Copy to Figma
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={copyAsSVG}
            style={{
              color: 'var(--foreground)',
              cursor: 'pointer',
            }}
          >
            Copy SVG Code
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => copyAsImage('png')}
            style={{
              color: 'var(--foreground)',
              cursor: 'pointer',
            }}
          >
            Copy PNG
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => copyAsImage('jpg')}
            style={{
              color: 'var(--foreground)',
              cursor: 'pointer',
            }}
          >
            Copy JPG
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => copyAsImage('jpeg')}
            style={{
              color: 'var(--foreground)',
              cursor: 'pointer',
            }}
          >
            Copy JPEG
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}