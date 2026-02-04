import React, { useEffect, useRef, useState } from 'react';
import HologramCard from '../components/HologramCard';
import './LandingSection.css';

export default function LandingSection({ setCurrentSection, onPortalZoom }) {
  const glowPortalRef = useRef();
  const floatingLogoRef = useRef();
  const [isZooming, setIsZooming] = useState(false);

  useEffect(() => {
    // Animate glowing portal
    const portalEl = glowPortalRef.current;
    if (portalEl) {
      let rotation = 0;
      const animate = () => {
        rotation += 0.5;
        portalEl.style.transform = `rotate(${rotation}deg)`;
        requestAnimationFrame(animate);
      };
      animate();
    }

    // Animate floating logo
    const logoEl = floatingLogoRef.current;
    if (logoEl) {
      let floatPos = 0;
      const floatAnimate = () => {
        floatPos += 0.03;
        logoEl.style.transform = `translateY(${Math.sin(floatPos) * 20}px)`;
        requestAnimationFrame(floatAnimate);
      };
      floatAnimate();
    }
  }, []);

  const handleEnterUniverse = () => {
    setIsZooming(true);
    if (onPortalZoom) {
      onPortalZoom();
    }
    setTimeout(() => {
      setCurrentSection('about');
    }, 2000);
  };

  return (
    <section className={`landing-section ${isZooming ? 'zooming' : ''}`}>
      <div className="landing-content">
        
        {/* Main Hero Content */}
        <div className="hero-content">
          <HologramCard className="hero-card" delay={0.3}>
            <div className="hero-title-container">
              <h1 className="hero-title">
                <span className="title-word">ENTER</span>
                <span className="title-word accent">THE</span>
                <span className="title-word">MULTIVERSE</span>
              </h1>
              <div className="energy-line"></div>
            </div>
            
            <p className="hero-subtitle">
              ASTHRA 2K26 • TECH SYMPOSIUM
            </p>

            <div className="hero-description">
              <p>
                Journey through dimensions of innovation, where technology meets cosmic possibilities.
                Join us for an epic convergence of minds across the multiverse.
              </p>
            </div>

            <button className="enter-button" onClick={handleEnterUniverse}>
              <span className="button-text">ENTER THE UNIVERSE</span>
              <div className="button-energy"></div>
              <div className="button-particles">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="button-particle" style={{
                    transform: `rotate(${i * 45}deg) translateX(0px)`
                  }}></div>
                ))}
              </div>
            </button>

            {/* Tech Stats */}
            <div className="tech-stats">
              <div className="stat-item">
                <div className="stat-value">∞</div>
                <div className="stat-label">Dimensions</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-value">2K26</div>
                <div className="stat-label">Year</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-value">EPIC</div>
                <div className="stat-label">Experience</div>
              </div>
            </div>
          </HologramCard>
        </div>

        {/* Floating Feature Cards */}
        <div className="floating-features">
          <HologramCard className="feature-card" delay={0.6}>
            <div className="feature-icon">⚡</div>
            <h3 className="feature-title">High-Tech</h3>
            <p className="feature-desc">Cutting-edge technology showcase</p>
          </HologramCard>

          <HologramCard className="feature-card" delay={0.9}>
            <div className="feature-icon">🌌</div>
            <h3 className="feature-title">Immersive</h3>
            <p className="feature-desc">Next-gen experiences</p>
          </HologramCard>

          <HologramCard className="feature-card" delay={1.2}>
            <div className="feature-icon">🚀</div>
            <h3 className="feature-title">Innovative</h3>
            <p className="feature-desc">Future-forward thinking</p>
          </HologramCard>
        </div>

        {/* Dimensional Rifts Overlay */}
        <div className="dimensional-rifts">
          <div className="rift rift-1"></div>
          <div className="rift rift-2"></div>
          <div className="rift rift-3"></div>
        </div>

        {/* Corner Tech Elements */}
        <div className="corner-tech">
          <div className="tech-element top-left">
            <div className="tech-line h"></div>
            <div className="tech-line v"></div>
            <div className="tech-dot"></div>
          </div>
          <div className="tech-element top-right">
            <div className="tech-line h"></div>
            <div className="tech-line v"></div>
            <div className="tech-dot"></div>
          </div>
          <div className="tech-element bottom-left">
            <div className="tech-line h"></div>
            <div className="tech-line v"></div>
            <div className="tech-dot"></div>
          </div>
          <div className="tech-element bottom-right">
            <div className="tech-line h"></div>
            <div className="tech-line v"></div>
            <div className="tech-dot"></div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <div className="scroll-text">EXPLORE</div>
          <div className="scroll-arrow">↓</div>
        </div>
      </div>
    </section>
  );
}
