import React from 'react';
import './HologramCard.css';

export default function HologramCard({ children, className = '', delay = 0 }) {
  return (
    <div className={`hologram-card ${className}`} style={{ animationDelay: `${delay}s` }}>
      {/* Particle trails */}
      <div className="particle-trail"></div>
      <div className="particle-trail trail-2"></div>
      <div className="particle-trail trail-3"></div>
      
      {/* Hologram border effects */}
      <div className="hologram-border top"></div>
      <div className="hologram-border bottom"></div>
      <div className="hologram-border left"></div>
      <div className="hologram-border right"></div>
      
      {/* Corner accents */}
      <div className="corner-accent top-left"></div>
      <div className="corner-accent top-right"></div>
      <div className="corner-accent bottom-left"></div>
      <div className="corner-accent bottom-right"></div>
      
      {/* Scan line effect */}
      <div className="scan-line"></div>
      
      {/* Neon glow */}
      <div className="neon-glow"></div>
      
      {/* Content */}
      <div className="hologram-content">
        {children}
      </div>
    </div>
  );
}
