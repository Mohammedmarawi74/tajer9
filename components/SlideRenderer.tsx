import React from 'react';
import { SlideData } from '../types';
import { COLORS } from '../constants';

interface SlideRendererProps {
  slide: SlideData;
  scale?: number;
  id?: string;
}

const SlideRenderer: React.FC<SlideRendererProps> = ({ slide, scale = 1, id }) => {
  const slideClass = `slide-${slide.id}`;

  const c = slide.colors || {
    primary: COLORS.primary,
    secondary: COLORS.secondary,
    bg: '#ffffff',
    text: COLORS.text
  };

  const Pattern = () => (
    <div className="slide-pattern">
      <div className="pattern-shape-top" style={{ color: c.primary }}>
        <svg viewBox="0 0 100 100" className="w-full h-full"><path d="M50 0L61 39L100 50L61 61L50 100L39 61L0 50L39 39L50 0Z" fill="currentColor"/></svg>
      </div>
      <div className="pattern-shape-bottom" style={{ color: c.secondary }}>
        <svg viewBox="0 0 100 100" className="w-full h-full"><path d="M50 0L61 39L100 50L61 61L50 100L39 61L0 50L39 39L50 0Z" fill="currentColor"/></svg>
      </div>
    </div>
  );

  const LogoOverlay = () => slide.logo ? (
    <div className="slide-logo">
      <img
        src={slide.logo}
        alt="Logo"
        className="slide-logo-image"
      />
    </div>
  ) : null;

  const renderIntro = () => (
    <div className={`intro-slide ${slideClass}`} style={{ backgroundColor: c.bg }}>
      <Pattern />
      <LogoOverlay />
      <div 
        className="intro-header"
        style={{ 
          background: `linear-gradient(135deg, ${c.primary}, ${c.accent || c.secondary}), url(${slide.heroImage || 'https://images.unsplash.com/photo-1589407633215-460d36746401?q=80&w=800'}) center/cover`,
          '--header-primary': c.primary,
          '--header-secondary': c.accent || c.secondary
        } as React.CSSProperties}
      >
        <div className="intro-subtitle-wrapper">
          <span className="intro-subtitle-icon">🇸🇦</span>
          <h3 className="intro-subtitle">{slide.subtitle}</h3>
        </div>
        <h1 className="intro-title">{slide.title}</h1>
      </div>

      <div className="intro-content">
        <p className="intro-description" style={{ color: c.primary }}>
          {slide.description}
        </p>
        <div className="intro-divider" style={{ 
          background: `linear-gradient(90deg, ${c.primary}, ${c.secondary})`,
          '--accent-primary': c.primary,
          '--accent-secondary': c.secondary
        } as React.CSSProperties}></div>
      </div>

      <div className="intro-footer" style={{ 
        backgroundColor: `${c.bg}dd`,
        borderColor: `${c.primary}1a`,
        '--text-primary': c.text
      } as React.CSSProperties}>
        <span className="intro-footer-text" style={{ color: c.primary }}>{slide.footer}</span>
        <div className="intro-footer-indicators">
          <div className="footer-indicator-dot" style={{ 
            background: `linear-gradient(135deg, ${c.primary}, ${c.secondary})`,
            '--accent-primary': c.primary,
            '--accent-secondary': c.secondary
          } as React.CSSProperties}></div>
          <div className="footer-indicator-line" style={{ backgroundColor: `${c.primary}33` }}></div>
        </div>
      </div>

      <div className="slide-footer-bar">
        <div className="slide-footer-text-container">
          <span className="slide-footer-right" style={{ color: c.primary }}>منصة التاجر الرقمية</span>
          <span className="slide-footer-left" style={{ color: c.primary }}>Al-Tajer Digital</span>
        </div>
        <div className="slide-footer-bar-line" style={{ 
          background: `linear-gradient(to right, ${c.primary}, ${c.secondary})`,
          '--footer-primary': c.primary,
          '--footer-secondary': c.secondary
        } as React.CSSProperties}></div>
      </div>
    </div>
  );

  const renderStats = () => (
    <div className={`stats-slide ${slideClass}`} style={{ backgroundColor: c.bg }}>
      <Pattern />
      <LogoOverlay />
      <div className="stats-header" style={{ 
        backgroundColor: c.primary,
        '--header-primary': c.primary,
        '--header-secondary': c.accent || c.secondary
      } as React.CSSProperties}>
        <h2 className="stats-title">{slide.title}</h2>
      </div>
      <div className="stats-content">
        {slide.stats?.map((stat, i) => (
          <div key={stat.id} className="stat-item">
            <div className="stat-value" style={{ 
              '--accent-primary': c.primary,
              '--accent-secondary': c.secondary
            } as React.CSSProperties}>
              {stat.value}
            </div>
            <div className="stat-divider" style={{ 
              backgroundColor: `${c.primary}1a`,
              background: `linear-gradient(180deg, ${i % 2 === 0 ? c.primary : c.secondary}, ${c.secondary})`
            }}></div>
            <div className="stat-label" style={{ color: c.text }}>{stat.label}</div>
          </div>
        ))}
      </div>
      <div className="stats-footer" style={{ 
        borderColor: `${c.primary}1a`,
        '--text-primary': c.text
      } as React.CSSProperties}>
        <span className="stats-footer-text" style={{ color: c.primary }}>{slide.footer}</span>
      </div>

      <div className="slide-footer-bar">
        <div className="slide-footer-text-container">
          <span className="slide-footer-right" style={{ color: c.primary }}>منصة التاجر الرقمية</span>
          <span className="slide-footer-left" style={{ color: c.primary }}>Al-Tajer Digital</span>
        </div>
        <div className="slide-footer-bar-line" style={{ 
          background: `linear-gradient(to right, ${c.primary}, ${c.secondary})`,
          '--footer-primary': c.primary,
          '--footer-secondary': c.secondary
        } as React.CSSProperties}></div>
      </div>
    </div>
  );

  const renderPoints = () => (
    <div className={`points-slide ${slideClass}`} style={{ backgroundColor: c.bg }}>
      <Pattern />
      <LogoOverlay />
      <div className="points-header" style={{ 
        borderColor: `${c.secondary}33`,
        '--text-primary': c.text
      } as React.CSSProperties}>
        <h2 className="points-title" style={{ color: c.primary }}>{slide.title}</h2>
      </div>
      <div className="points-content">
        {slide.points?.map((point, i) => (
          <div key={point.id} className="point-item" style={{ 
            '--accent-primary': c.primary,
            '--accent-secondary': c.secondary
          } as React.CSSProperties}>
            <span className="point-number" style={{ 
              background: `linear-gradient(135deg, ${c.primary}, ${c.secondary})`
            }}>
              {i + 1}
            </span>
            <p className="point-text" style={{ color: c.text }}>{point.text}</p>
          </div>
        ))}
      </div>
      <div className="points-footer" style={{ 
        borderColor: `${c.primary}1a`,
        '--text-primary': c.text
      } as React.CSSProperties}>
        <span className="points-footer-text" style={{ color: c.primary }}>{slide.footer}</span>
      </div>

      <div className="slide-footer-bar">
        <div className="slide-footer-text-container">
          <span className="slide-footer-right" style={{ color: c.primary }}>منصة التاجر الرقمية</span>
          <span className="slide-footer-left" style={{ color: c.primary }}>Al-Tajer Digital</span>
        </div>
        <div className="slide-footer-bar-line" style={{ 
          background: `linear-gradient(to right, ${c.primary}, ${c.secondary})`,
          '--footer-primary': c.primary,
          '--footer-secondary': c.secondary
        } as React.CSSProperties}></div>
      </div>
    </div>
  );

  const renderClosing = () => (
    <div className={`closing-slide ${slideClass}`} style={{ 
      backgroundColor: c.primary,
      background: `linear-gradient(135deg, ${c.primary}, ${c.accent || c.secondary})`
    }}>
      <Pattern />
      <LogoOverlay />
      <div className="closing-content">
        <div className="closing-icon-wrapper">
          <span className="closing-icon">🇸🇦</span>
        </div>
        <h2 className="closing-title">{slide.title}</h2>
        <p className="closing-description">{slide.description}</p>
        <div className="closing-cta" style={{ 
          backgroundColor: c.bg, 
          color: c.primary,
          '--accent-primary': c.primary
        } as React.CSSProperties}>
          تواصل معنا الآن
        </div>
      </div>
      <div className="closing-footer" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
        <div className="closing-social">
          <span>X</span><span>Instagram</span><span>LinkedIn</span>
        </div>
        <span className="closing-footer-text">{slide.footer}</span>
      </div>

      <div className="slide-footer-bar">
        <div className="slide-footer-text-container">
          <span className="slide-footer-right" style={{ color: '#ffffff' }}>منصة التاجر الرقمية</span>
          <span className="slide-footer-left" style={{ color: '#ffffff' }}>Al-Tajer Digital</span>
        </div>
        <div className="slide-footer-bar-line" style={{ 
          background: `linear-gradient(to right, #ffffff, ${c.secondary})`,
          '--footer-primary': '#ffffff',
          '--footer-secondary': c.secondary
        } as React.CSSProperties}></div>
      </div>
    </div>
  );

  return (
    <div
      id={id}
      className="slide-container"
      style={{ transform: `scale(${scale})`, transformOrigin: 'top center', backgroundColor: c.bg }}
    >
      {slide.customCss && (
        <style dangerouslySetInnerHTML={{
          __html: slide.customCss.replace(/\.poster/g, `.${slideClass} .poster`)
        }} />
      )}
      {slide.type === 'intro' && renderIntro()}
      {slide.type === 'stats' && renderStats()}
      {slide.type === 'points' && renderPoints()}
      {slide.type === 'closing' && renderClosing()}
    </div>
  );
};

export default SlideRenderer;
