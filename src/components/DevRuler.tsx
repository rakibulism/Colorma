import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import { toast } from 'sonner';

interface DevRulerProps {
  enabled: boolean;
  accentColor: string;
  textColor: string;
  backgroundColor: string;
}

export function DevRuler({ enabled, accentColor, textColor, backgroundColor }: DevRulerProps) {
  const [hoveredElement, setHoveredElement] = useState<{
    element: HTMLElement;
    rect: DOMRect;
  } | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) {
      setHoveredElement(null);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Get the element under the cursor, excluding our overlay
      const elements = document.elementsFromPoint(e.clientX, e.clientY);
      const targetElement = elements.find(
        (el) => 
          el !== overlayRef.current && 
          !overlayRef.current?.contains(el) &&
          el.tagName !== 'HTML' &&
          el.tagName !== 'BODY'
      ) as HTMLElement;

      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        setHoveredElement({ element: targetElement, rect });
      }
    };

    const handleClick = async (e: MouseEvent) => {
      if (!hoveredElement) return;
      
      e.preventDefault();
      e.stopPropagation();
      
      const { element, rect } = hoveredElement;
      
      try {
        // Show loading toast
        const loadingToast = toast.loading('Capturing element for Figma...');
        
        // Temporarily hide the overlay to capture clean element
        if (overlayRef.current) {
          overlayRef.current.style.display = 'none';
        }
        
        // Capture the element as canvas
        const canvas = await html2canvas(element, {
          backgroundColor: null,
          scale: 2, // Higher quality for Figma
          logging: false,
          useCORS: true,
          allowTaint: true,
          width: rect.width,
          height: rect.height,
        });
        
        // Restore overlay
        if (overlayRef.current) {
          overlayRef.current.style.display = 'block';
        }
        
        // Convert canvas to blob
        canvas.toBlob(async (blob) => {
          if (blob) {
            try {
              // Copy image to clipboard
              await navigator.clipboard.write([
                new ClipboardItem({
                  'image/png': blob,
                }),
              ]);
              
              toast.dismiss(loadingToast);
              toast.success('Element copied! Paste into Figma (Cmd/Ctrl+V)', {
                description: `${Math.round(rect.width)} × ${Math.round(rect.height)}px • ${element.tagName.toLowerCase()}`,
                duration: 4000,
              });
              
              // Visual feedback
              const flash = document.createElement('div');
              flash.style.cssText = `
                position: fixed;
                top: ${rect.top}px;
                left: ${rect.left}px;
                width: ${rect.width}px;
                height: ${rect.height}px;
                background: ${accentColor};
                opacity: 0.3;
                pointer-events: none;
                z-index: 10000;
                animation: flash 0.3s ease-out;
              `;
              document.body.appendChild(flash);
              setTimeout(() => flash.remove(), 300);
            } catch (clipboardError) {
              toast.dismiss(loadingToast);
              toast.error('Failed to copy to clipboard. Please try again.');
              console.error('Clipboard error:', clipboardError);
            }
          }
        }, 'image/png');
      } catch (error) {
        // Restore overlay on error
        if (overlayRef.current) {
          overlayRef.current.style.display = 'block';
        }
        toast.error('Failed to capture element. Please try again.');
        console.error('Capture error:', error);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick, true);

    // Add flash animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes flash {
        0% { opacity: 0.5; transform: scale(1); }
        100% { opacity: 0; transform: scale(1.05); }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick, true);
      style.remove();
    };
  }, [enabled, accentColor, hoveredElement]);

  if (!enabled || !hoveredElement) {
    return null;
  }

  const { element, rect } = hoveredElement;
  const computedStyle = window.getComputedStyle(element);
  
  const padding = {
    top: parseFloat(computedStyle.paddingTop),
    right: parseFloat(computedStyle.paddingRight),
    bottom: parseFloat(computedStyle.paddingBottom),
    left: parseFloat(computedStyle.paddingLeft),
  };

  const margin = {
    top: parseFloat(computedStyle.marginTop),
    right: parseFloat(computedStyle.marginRight),
    bottom: parseFloat(computedStyle.marginBottom),
    left: parseFloat(computedStyle.marginLeft),
  };

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    >
      {/* Margin overlay */}
      {margin.top > 0 && (
        <div
          style={{
            position: 'fixed',
            top: rect.top - margin.top,
            left: rect.left - margin.left,
            width: rect.width + margin.left + margin.right,
            height: margin.top,
            background: `repeating-linear-gradient(45deg, ${accentColor}20, ${accentColor}20 4px, ${accentColor}10 4px, ${accentColor}10 8px)`,
            border: `1px solid ${accentColor}40`,
          }}
        />
      )}
      
      {/* Element highlight */}
      <div
        style={{
          position: 'fixed',
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          border: `2px solid ${accentColor}`,
          background: `${accentColor}10`,
          pointerEvents: 'none',
        }}
      >
        {/* Padding indicators */}
        {padding.top > 0 && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: padding.top,
              background: `repeating-linear-gradient(90deg, ${accentColor}30, ${accentColor}30 4px, transparent 4px, transparent 8px)`,
            }}
          />
        )}
        {padding.bottom > 0 && (
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: padding.bottom,
              background: `repeating-linear-gradient(90deg, ${accentColor}30, ${accentColor}30 4px, transparent 4px, transparent 8px)`,
            }}
          />
        )}
        {padding.left > 0 && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              width: padding.left,
              background: `repeating-linear-gradient(0deg, ${accentColor}30, ${accentColor}30 4px, transparent 4px, transparent 8px)`,
            }}
          />
        )}
        {padding.right > 0 && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              width: padding.right,
              background: `repeating-linear-gradient(0deg, ${accentColor}30, ${accentColor}30 4px, transparent 4px, transparent 8px)`,
            }}
          />
        )}
      </div>

      {/* Dimension labels */}
      <div
        style={{
          position: 'fixed',
          top: rect.top - 24,
          left: rect.left,
          padding: 'var(--spacing-1) var(--spacing-2)',
          background: accentColor,
          color: backgroundColor,
          fontSize: '11px',
          fontFamily: 'var(--font-family-mono)',
          fontWeight: 'var(--font-weight-medium)',
          borderRadius: 'var(--radius-sm)',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
        }}
      >
        {Math.round(rect.width)} × {Math.round(rect.height)} • {element.tagName.toLowerCase()}
        {element.className && typeof element.className === 'string' && element.className.trim() && ` .${element.className.split(' ')[0]}`}
      </div>

      {/* Width ruler */}
      <div
        style={{
          position: 'fixed',
          top: rect.bottom + 4,
          left: rect.left,
          width: rect.width,
          height: 1,
          background: accentColor,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -3,
            left: 0,
            width: 1,
            height: 7,
            background: accentColor,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: -3,
            right: 0,
            width: 1,
            height: 7,
            background: accentColor,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 4,
            left: '50%',
            transform: 'translateX(-50%)',
            padding: 'var(--spacing-1) var(--spacing-2)',
            background: accentColor,
            color: backgroundColor,
            fontSize: '10px',
            fontFamily: 'var(--font-family-mono)',
            fontWeight: 'var(--font-weight-medium)',
            borderRadius: 'var(--radius-sm)',
            whiteSpace: 'nowrap',
          }}
        >
          {Math.round(rect.width)}px
        </div>
      </div>

      {/* Height ruler */}
      <div
        style={{
          position: 'fixed',
          top: rect.top,
          left: rect.right + 4,
          width: 1,
          height: rect.height,
          background: accentColor,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: -3,
            width: 7,
            height: 1,
            background: accentColor,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: -3,
            width: 7,
            height: 1,
            background: accentColor,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: 4,
            transform: 'translateY(-50%)',
            padding: 'var(--spacing-1) var(--spacing-2)',
            background: accentColor,
            color: backgroundColor,
            fontSize: '10px',
            fontFamily: 'var(--font-family-mono)',
            fontWeight: 'var(--font-weight-medium)',
            borderRadius: 'var(--radius-sm)',
            whiteSpace: 'nowrap',
          }}
        >
          {Math.round(rect.height)}px
        </div>
      </div>
    </div>
  );
}