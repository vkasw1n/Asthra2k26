import React, { useState, useEffect } from "react";
import soundManager from "../utils/soundManager";
import "./Navigation.css";

export default function Navigation({
  sections,
  currentSection,
  setCurrentSection,
  musicEnabled,
  setMusicEnabled,
}) {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (musicEnabled) {
      soundManager.enable();
    } else {
      soundManager.disable();
    }
  }, [musicEnabled]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    soundManager.playEnergyBurst();
    setCurrentSection(sectionId);
    setNavOpen(false);
  };

  const handleMusicToggle = () => {
    const newState = soundManager.toggle();
    setMusicEnabled(newState);
  };

  return (
    <nav className={`navigation marvel-nav ${scrolled ? "scrolled" : ""}`}>
      {/* Multiverse Portal Effects */}
      <div className="nav-portal-effects">
        <div className="portal-ring portal-ring-1"></div>
        <div className="portal-ring portal-ring-2"></div>
        <div className="nav-sparks">
          <span className="nav-spark"></span>
          <span className="nav-spark"></span>
          <span className="nav-spark"></span>
        </div>
      </div>

      {/* Infinity Stone Indicators */}
      <div className="nav-stones">
        <span className="nav-stone stone-power"></span>
        <span className="nav-stone stone-space"></span>
        <span className="nav-stone stone-time"></span>
      </div>

      <div className="nav-container">
        {/* Marvel-Style Logo */}
        <div className="nav-logo marvel-logo">
          <div className="logo-portal">
            <div className="portal-inner-glow"></div>
            <div className="logo-symbol">∞</div>
          </div>
          <div className="logo-text-container">
            <span className="logo-text marvel-text">MULTIVERSE</span>
            <span className="logo-subtitle">SYMPOSIUM 2026</span>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={`menu-toggle marvel-toggle ${navOpen ? "active" : ""}`}
          onClick={() => setNavOpen(!navOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
          <div className="toggle-glow"></div>
        </button>

        {/* Navigation Links */}
        <ul className={`nav-links marvel-links ${navOpen ? "active" : ""}`}>
          {sections.map((section, index) => (
            <li key={section.id}>
              <button
                className={`nav-link marvel-link ${currentSection === section.id ? "active" : ""}`}
                onClick={() => handleNavClick(section.id)}
                onMouseEnter={() => soundManager.playButtonHover()}
                style={{ "--delay": `${index * 0.1}s` }}
              >
                <span className="link-text">{section.label}</span>
                <span className="link-glow"></span>
                <span className="link-spark"></span>
              </button>
            </li>
          ))}
        </ul>

        {/* Marvel Music Toggle */}
        <button
          className={`music-toggle marvel-music ${musicEnabled ? "active" : ""}`}
          onClick={handleMusicToggle}
          onMouseEnter={() => soundManager.playButtonHover()}
          title={musicEnabled ? "Sound On" : "Sound Off"}
        >
          <span className="music-icon">{musicEnabled ? "🔊" : "🔇"}</span>
          <div className="music-rings">
            <span className="music-ring"></span>
            <span className="music-ring"></span>
          </div>
        </button>
      </div>

      {/* Animated Energy Lines */}
      <div className="nav-energy-lines">
        <div className="energy-line line-1"></div>
        <div className="energy-line line-2"></div>
      </div>

      {/* Portal Edge Effect */}
      <div className="nav-portal-edge"></div>
    </nav>
  );
}
