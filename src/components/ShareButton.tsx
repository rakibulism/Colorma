import React, { useState } from 'react';
import { Button } from './ui/button';
import { Share2, Check, Copy } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { toast } from 'sonner@2.0.3';

interface ShareButtonProps {
  textColor: string;
  backgroundColor: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  theme?: string;
}

export function ShareButton({
  textColor,
  backgroundColor,
  primaryColor,
  secondaryColor,
  accentColor,
  theme = 'light',
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  const generateShareLink = () => {
    const params = new URLSearchParams({
      text: textColor,
      bg: backgroundColor,
      primary: primaryColor,
      secondary: secondaryColor,
      accent: accentColor,
      theme: theme,
    });
    
    return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
  };

  const handleCopyLink = () => {
    const link = generateShareLink();
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      toast.error('Failed to copy link.');
    });
  };

  const handleShare = async () => {
    const link = generateShareLink();
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Color Palette - Colorma',
          text: 'Check out this color palette!',
          url: link,
        });
      } catch (err) {
        // User cancelled or share failed
        if (err instanceof Error && err.name !== 'AbortError') {
          handleCopyLink();
        }
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="border-0"
          style={{
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: 'var(--border)',
            backgroundColor: 'var(--card)',
            color: 'var(--foreground)',
            padding: 'var(--spacing-2)',
          }}
        >
          <Share2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent
        style={{
          backgroundColor: 'var(--card)',
          borderColor: 'var(--border)',
          color: 'var(--foreground)',
        }}
      >
        <DialogHeader>
          <DialogTitle style={{ color: 'var(--foreground)' }}>Share Color Palette</DialogTitle>
          <DialogDescription style={{ color: 'var(--muted-foreground)' }}>
            Anyone with this link can view and export this color palette
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-4 mt-4">
          {/* Color Preview */}
          <div className="flex gap-2">
            <div 
              className="w-12 h-12 rounded-md border"
              style={{ 
                backgroundColor: textColor,
                borderColor: 'var(--border)',
              }}
              title={`Text: ${textColor}`}
            />
            <div 
              className="w-12 h-12 rounded-md border"
              style={{ 
                backgroundColor: backgroundColor,
                borderColor: 'var(--border)',
              }}
              title={`Background: ${backgroundColor}`}
            />
            <div 
              className="w-12 h-12 rounded-md border"
              style={{ 
                backgroundColor: primaryColor,
                borderColor: 'var(--border)',
              }}
              title={`Primary: ${primaryColor}`}
            />
            <div 
              className="w-12 h-12 rounded-md border"
              style={{ 
                backgroundColor: secondaryColor,
                borderColor: 'var(--border)',
              }}
              title={`Secondary: ${secondaryColor}`}
            />
            <div 
              className="w-12 h-12 rounded-md border"
              style={{ 
                backgroundColor: accentColor,
                borderColor: 'var(--border)',
              }}
              title={`Accent: ${accentColor}`}
            />
          </div>

          {/* Share Link */}
          <div className="flex gap-2">
            <Input
              value={generateShareLink()}
              readOnly
              style={{
                backgroundColor: 'var(--background)',
                borderColor: 'var(--border)',
                color: 'var(--foreground)',
              }}
              onClick={(e) => e.currentTarget.select()}
            />
            <Button
              size="sm"
              onClick={handleCopyLink}
              style={{
                backgroundColor: 'var(--primary)',
                color: 'var(--primary-foreground)',
              }}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </>
              )}
            </Button>
          </div>

          {/* Share Button (for mobile/native share) */}
          <Button
            onClick={handleShare}
            className="w-full"
            style={{
              backgroundColor: primaryColor,
              color: backgroundColor,
            }}
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share Link
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}