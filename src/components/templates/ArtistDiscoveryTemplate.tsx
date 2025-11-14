import React from 'react';
import { Headphones, Globe } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface ArtistDiscoveryTemplateProps {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  textColor: string;
  backgroundColor: string;
}

export function ArtistDiscoveryTemplate({
  primaryColor,
  secondaryColor,
  accentColor,
  textColor,
  backgroundColor,
}: ArtistDiscoveryTemplateProps) {
  return (
    <div style={{ backgroundColor, minHeight: '100vh' }}>
      {/* Header */}
      <header style={{ 
        padding: 'var(--spacing-6) var(--spacing-8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: `1px solid ${textColor}10`,
      }}>
        {/* Logo and Email */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: textColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              background: backgroundColor,
            }} />
          </div>
          <span style={{ 
            color: textColor,
            opacity: 0.7,
            fontFamily: 'var(--font-family-sans)',
          }}>
            book@ai-artist.io
          </span>
        </div>

        {/* Navigation */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
          <a href="#" style={{ 
            color: textColor,
            textDecoration: 'none',
            fontFamily: 'var(--font-family-sans)',
          }}>
            Our Pricing
          </a>
          <a href="#" style={{ 
            color: textColor,
            textDecoration: 'none',
            fontFamily: 'var(--font-family-sans)',
          }}>
            Treatment
          </a>
          <a href="#" style={{ 
            color: textColor,
            textDecoration: 'none',
            fontFamily: 'var(--font-family-sans)',
          }}>
            Signup
          </a>
          <button style={{
            background: textColor,
            color: backgroundColor,
            padding: 'var(--spacing-2) var(--spacing-4)',
            borderRadius: 'var(--radius-full)',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'var(--font-family-sans)',
          }}>
            Artist Login
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section style={{ 
        padding: 'var(--spacing-16) var(--spacing-8)',
        textAlign: 'center',
        position: 'relative',
      }}>
        {/* Side Labels */}
        <div style={{
          position: 'absolute',
          left: 'var(--spacing-8)',
          top: '50%',
          transform: 'translateY(-50%)',
          textAlign: 'left',
        }}>
          <div style={{ 
            color: textColor,
            fontFamily: 'var(--font-family-sans)',
            lineHeight: '1.3',
          }}>
            Mission<br />Statement
          </div>
        </div>

        <div style={{
          position: 'absolute',
          right: 'var(--spacing-8)',
          top: '50%',
          transform: 'translateY(-50%)',
          textAlign: 'right',
        }}>
          <div style={{ 
            color: textColor,
            fontFamily: 'var(--font-family-sans)',
            lineHeight: '1.3',
          }}>
            Search Artist<br />or event
          </div>
        </div>

        {/* Main Headline */}
        <h1 style={{
          fontSize: '120px',
          lineHeight: '1',
          marginBottom: 'var(--spacing-12)',
          color: textColor,
          fontFamily: 'var(--font-family-display)',
        }}>
          Discover<br />Artist
        </h1>

        {/* Description with Globe Icon */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--spacing-16)',
          maxWidth: '900px',
          margin: '0 auto',
        }}>
          <p style={{ 
            color: textColor,
            textAlign: 'right',
            flex: 1,
            fontFamily: 'var(--font-family-sans)',
          }}>
            Discover Events happening near<br />you or in whichever country
          </p>
          
          <div style={{
            width: '48px',
            height: '48px',
            border: `2px solid ${textColor}`,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Globe size={24} style={{ color: textColor }} />
          </div>

          <p style={{ 
            color: textColor,
            textAlign: 'left',
            flex: 1,
            fontFamily: 'var(--font-family-sans)',
          }}>
            Discover artist Nearby or around<br />the globe
          </p>
        </div>
      </section>

      {/* Feature Cards */}
      <section style={{
        padding: '0 var(--spacing-8) var(--spacing-16)',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 'var(--spacing-6)',
        maxWidth: '1400px',
        margin: '0 auto',
      }}>
        {/* Card 1: Listeners */}
        <div style={{
          background: `linear-gradient(135deg, #A0E7D4 0%, #7DDBC8 100%)`,
          borderRadius: 'var(--radius-2xl)',
          padding: 'var(--spacing-8)',
          position: 'relative',
          overflow: 'hidden',
          aspectRatio: '1',
        }}>
          <div style={{
            position: 'absolute',
            top: 'var(--spacing-4)',
            left: 'var(--spacing-4)',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Headphones size={16} style={{ color: '#000' }} />
          </div>
          
          <div style={{
            position: 'absolute',
            bottom: 'var(--spacing-6)',
            left: 'var(--spacing-6)',
            zIndex: 2,
          }}>
            <div style={{
              fontSize: '48px',
              fontFamily: 'var(--font-family-display)',
              color: '#000',
              lineHeight: '1',
              marginBottom: 'var(--spacing-2)',
            }}>
              4.9 M
            </div>
            <div style={{
              fontFamily: 'var(--font-family-sans)',
              color: '#000',
              fontSize: '14px',
            }}>
              Listeners — This week
            </div>
          </div>

          <ImageWithFallback
            src="https://images.unsplash.com/photo-1646350286089-bec606184c6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpY2lhbiUyMGhlYWRwaG9uZXMlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjMwNTIzMzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Musician with headphones"
            style={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              width: '60%',
              height: '80%',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
        </div>

        {/* Card 2: Playlist */}
        <div style={{
          background: `linear-gradient(135deg, #E0B3FF 0%, #C77DFF 100%)`,
          borderRadius: '50%',
          padding: 'var(--spacing-6)',
          aspectRatio: '1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--spacing-4)',
            width: '85%',
          }}>
            {/* Search bar */}
            <div style={{
              background: '#F5F5F5',
              borderRadius: 'var(--radius-full)',
              padding: 'var(--spacing-2) var(--spacing-3)',
              marginBottom: 'var(--spacing-3)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-2)',
            }}>
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                color: '#fff',
              }}>
                ×
              </div>
              <span style={{ 
                fontSize: '12px',
                fontFamily: 'var(--font-family-sans)',
                color: '#000',
              }}>
                Yes!
              </span>
            </div>

            {/* Song items */}
            {[
              { title: 'Yes, Avy!?', artist: 'Jackson Wang' },
              { title: 'Toxic Hold On', artist: 'Newton' }
            ].map((song, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-2)',
                padding: 'var(--spacing-2) 0',
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-sm)',
                  background: '#E0E0E0',
                }} />
                <div style={{ flex: 1 }}>
                  <div style={{ 
                    fontSize: '12px',
                    fontFamily: 'var(--font-family-sans)',
                    color: '#000',
                  }}>
                    {song.title}
                  </div>
                  <div style={{ 
                    fontSize: '10px',
                    fontFamily: 'var(--font-family-sans)',
                    color: '#666',
                  }}>
                    {song.artist}
                  </div>
                </div>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: '#000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <div style={{
                    width: 0,
                    height: 0,
                    borderLeft: '6px solid #fff',
                    borderTop: '4px solid transparent',
                    borderBottom: '4px solid transparent',
                    marginLeft: '2px',
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 3: Performance */}
        <div style={{
          background: '#1A1A1A',
          borderRadius: 'var(--radius-2xl)',
          overflow: 'hidden',
          aspectRatio: '1',
          position: 'relative',
        }}>
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1575426220089-9e2ef7b0c9f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwcGVyZm9ybWVyJTIwc3RhZ2V8ZW58MXx8fHwxNzYzMDA1MjgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Concert performer"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.7,
            }}
          />
          <div style={{
            position: 'absolute',
            top: 'var(--spacing-4)',
            right: 'var(--spacing-4)',
            fontSize: '48px',
            color: 'rgba(255, 255, 255, 0.2)',
          }}>
            +1
          </div>
        </div>

        {/* Card 4: Verified Artists */}
        <div style={{
          background: `linear-gradient(135deg, #00FF66 0%, #00E659 100%)`,
          borderRadius: '50%',
          aspectRatio: '1',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'var(--spacing-6)',
        }}>
          <div style={{
            fontSize: '72px',
            fontFamily: 'var(--font-family-display)',
            color: '#000',
            lineHeight: '1',
            marginBottom: 'var(--spacing-2)',
          }}>
            3K
          </div>
          <div style={{
            fontFamily: 'var(--font-family-sans)',
            color: '#000',
            fontSize: '14px',
            textAlign: 'center',
            lineHeight: '1.3',
          }}>
            Registered<br />verified Artist
          </div>
        </div>
      </section>
    </div>
  );
}
