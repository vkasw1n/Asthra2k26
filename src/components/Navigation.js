import React, { useState } from 'react';
import './Navigation.css';

export default function Navigation({ sections, currentSection, setCurrentSection, musicEnabled, setMusicEnabled }) {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <nav className="navigation">
      <div className="nav-container">
        {/* Logo/Brand */}
        <div className="nav-logo">
          <div className="logo-symbol">◇</div>
          <span className="logo-text glow-text">MULTIVERSE</span>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="menu-toggle" onClick={() => setNavOpen(!navOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation Links */}
        <ul className={`nav-links ${navOpen ? 'active' : ''}`}>
          {sections.map(section => (
            <li key={section.id}>
              <button
                className={`nav-link ${currentSection === section.id ? 'active' : ''}`}
                onClick={() => {
                  setCurrentSection(section.id);
                  setNavOpen(false);
                }}
              >
                {section.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Music Toggle */}
        <button 
          className={`music-toggle ${musicEnabled ? 'active' : ''}`}
          onClick={() => setMusicEnabled(!musicEnabled)}
          title={musicEnabled ? 'Music On' : 'Music Off'}
        >
          {musicEnabled ? '♫' : '♪'}
        </button>
      </div>

      {/* Animated background line */}
      <div className="nav-line"></div>
    </nav>
  );
}
