import React, { useRef, useEffect } from 'react';
import './AboutSection.css';

export default function AboutSection() {
  const planetRef = useRef();

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (planetRef.current) {
        const rect = planetRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        planetRef.current.style.transform = `rotateY(${x * 20}deg) rotateX(${-y * 20}deg)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="about-section">
      <div className="section-container">
        <h2 className="section-title glow-text">About Multiverse Symposium</h2>
        <p className="section-subtitle">Planet of Innovation & Discovery</p>

        <div className="about-content">
          {/* Interactive Planet */}
          <div className="planet-wrapper">
            <div className="planet" ref={planetRef}>
              <div className="planet-surface"></div>
              <div className="planet-rings"></div>
              <div className="planet-glow"></div>
            </div>
          </div>

          {/* About Information Cards */}
          <div className="about-grid">
            <div className="about-card glass-panel">
              <div className="card-number">01</div>
              <h3 className="card-title">Vision & Purpose</h3>
              <p>
                The Multiverse Symposium brings together brilliant minds to explore the 
                convergence of technology, innovation, and human creativity. We create an 
                immersive digital experience that transcends traditional conferences.
              </p>
            </div>

            <div className="about-card glass-panel">
              <div className="card-number">02</div>
              <h3 className="card-title">Theme: Infinite Dimensions</h3>
              <p>
                Inspired by quantum computing and multiverse theory, our 2026 theme celebrates 
                the infinite possibilities of digital innovation, exploring how parallel ideas 
                and technologies can converge to create extraordinary solutions.
              </p>
            </div>

            <div className="about-card glass-panel">
              <div className="card-number">03</div>
              <h3 className="card-title">Department Focus</h3>
              <p>
                Organized by the Computer Science & Engineering Department, with support from 
                all faculties. Bringing together students across disciplines: AI, Web, Mobile, 
                IoT, Cloud, Cybersecurity, and more.
              </p>
            </div>

            <div className="about-card glass-panel">
              <div className="card-number">04</div>
              <h3 className="card-title">College Pride</h3>
              <p>
                Championing innovation in higher education, we showcase student talent, foster 
                collaboration, and inspire the next generation of tech leaders and entrepreneurs 
                from our prestigious institution.
              </p>
            </div>
          </div>

          {/* Key Highlights */}
          <div className="highlights-section">
            <h3 className="highlights-title">Symposium Highlights</h3>
            <div className="highlights-grid">
              <div className="highlight-item">
                <span className="highlight-icon">🚀</span>
                <span>15+ Technical Events</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-icon">👥</span>
                <span>100+ Student Participants</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-icon">🎓</span>
                <span>Industry Expert Speakers</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-icon">💰</span>
                <span>₹5+ Lakhs Prize Pool</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-icon">🌍</span>
                <span>Pan-India Participation</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-icon">🎯</span>
                <span>Mentorship Programs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
