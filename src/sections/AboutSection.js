import React, { useRef, useEffect, useState } from "react";
import "./AboutSection.css";

export default function AboutSection() {
  const portalRef = useRef();
  const sectionRef = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Portal mouse tracking for 3D effect
    const handleMouseMove = (e) => {
      if (portalRef.current) {
        const rect = portalRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        portalRef.current.style.transform = `rotateY(${x * 25}deg) rotateX(${-y * 25}deg)`;
      }
    };

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      className={`about-section marvel-multiverse ${isVisible ? "visible" : ""}`}
      ref={sectionRef}
    >
      {/* Floating Infinity Stones */}
      <div className="infinity-stones">
        <div className="stone stone-power"></div>
        <div className="stone stone-space"></div>
        <div className="stone stone-reality"></div>
        <div className="stone stone-soul"></div>
        <div className="stone stone-time"></div>
        <div className="stone stone-mind"></div>
      </div>

      {/* Multiverse Portal Background */}
      <div className="multiverse-bg">
        <div className="dimension-crack crack-1"></div>
        <div className="dimension-crack crack-2"></div>
        <div className="dimension-crack crack-3"></div>
        <div className="cosmic-dust"></div>
      </div>

      <div className="section-container">
        <div className="marvel-header">
          <div className="portal-sparks"></div>
          <h2 className="section-title marvel-glow">
            About Multiverse Symposium
          </h2>
          <p className="section-subtitle marvel-subtitle">
            <span className="infinity-symbol">∞</span> Where Infinite Realities
            Converge <span className="infinity-symbol">∞</span>
          </p>
        </div>

        <div className="about-content">
          {/* Doctor Strange Portal */}
          <div className="portal-wrapper">
            <div className="portal-container" ref={portalRef}>
              <div className="portal-outer-ring"></div>
              <div className="portal-middle-ring"></div>
              <div className="portal-inner-ring"></div>
              <div className="portal-core">
                <div className="portal-dimension">
                  <span className="portal-text">ASTHRA</span>
                  <span className="portal-year">2026</span>
                </div>
              </div>
              <div className="portal-sparks-container">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className={`spark spark-${i + 1}`}></div>
                ))}
              </div>
              <div className="sling-ring-effect"></div>
            </div>
          </div>

          {/* Marvel-themed Information Cards */}
          <div className="about-grid">
            <div className="about-card marvel-card card-power">
              <div className="card-glow"></div>
              <div className="card-stone-indicator"></div>
              <div className="card-number">01</div>
              <h3 className="card-title">
                <span className="title-icon">⚡</span> Vision & Purpose
              </h3>
              <p>
                Like the Avengers assembling to face cosmic threats, the
                Multiverse Symposium brings together brilliant minds from across
                dimensions. We create an immersive experience that transcends
                reality itself.
              </p>
              <div className="card-marvel-effect"></div>
            </div>

            <div className="about-card marvel-card card-space">
              <div className="card-glow"></div>
              <div className="card-stone-indicator"></div>
              <div className="card-number">02</div>
              <h3 className="card-title">
                <span className="title-icon">🌌</span> Theme: Infinite
                Dimensions
              </h3>
              <p>
                Inspired by the Marvel Multiverse, our 2026 theme celebrates
                infinite possibilities. Like Doctor Strange navigating through
                dimensions, explore how parallel ideas converge to create
                extraordinary solutions.
              </p>
              <div className="card-marvel-effect"></div>
            </div>

            <div className="about-card marvel-card card-reality">
              <div className="card-glow"></div>
              <div className="card-stone-indicator"></div>
              <div className="card-number">03</div>
              <h3 className="card-title">
                <span className="title-icon">🔮</span> Department Focus
              </h3>
              <p>
                Organized by the Computer Science & Engineering Department,
                channeling the combined power of all faculties. AI, Web, Mobile,
                IoT, Cloud, Cybersecurity — united like the Infinity Stones.
              </p>
              <div className="card-marvel-effect"></div>
            </div>

            <div className="about-card marvel-card card-soul">
              <div className="card-glow"></div>
              <div className="card-stone-indicator"></div>
              <div className="card-number">04</div>
              <h3 className="card-title">
                <span className="title-icon">✨</span> College Pride
              </h3>
              <p>
                Like Wakanda forever championing innovation, we showcase student
                talent, foster collaboration, and inspire the next generation of
                tech heroes from our prestigious institution.
              </p>
              <div className="card-marvel-effect"></div>
            </div>
          </div>

          {/* Avengers-style Highlights */}
          <div className="highlights-section marvel-highlights">
            <div className="shield-decoration left"></div>
            <div className="shield-decoration right"></div>
            <h3 className="highlights-title">
              <span className="avengers-a">A</span>ssemble Your Skills
            </h3>
            <div className="highlights-grid">
              <div className="highlight-item marvel-highlight">
                <div className="highlight-glow"></div>
                <span className="highlight-icon">🚀</span>
                <span>15+ Technical Events</span>
                <div className="power-bar"></div>
              </div>
              <div className="highlight-item marvel-highlight">
                <div className="highlight-glow"></div>
                <span className="highlight-icon">👥</span>
                <span>100+ Student Participants</span>
                <div className="power-bar"></div>
              </div>
              <div className="highlight-item marvel-highlight">
                <div className="highlight-glow"></div>
                <span className="highlight-icon">🎓</span>
                <span>Industry Expert Speakers</span>
                <div className="power-bar"></div>
              </div>
              <div className="highlight-item marvel-highlight">
                <div className="highlight-glow"></div>
                <span className="highlight-icon">💰</span>
                <span>₹5+ Lakhs Prize Pool</span>
                <div className="power-bar"></div>
              </div>
              <div className="highlight-item marvel-highlight">
                <div className="highlight-glow"></div>
                <span className="highlight-icon">🌍</span>
                <span>Pan-India Participation</span>
                <div className="power-bar"></div>
              </div>
              <div className="highlight-item marvel-highlight">
                <div className="highlight-glow"></div>
                <span className="highlight-icon">🎯</span>
                <span>Mentorship Programs</span>
                <div className="power-bar"></div>
              </div>
            </div>
          </div>

          {/* Multiverse Quote */}
          <div className="multiverse-quote">
            <div className="quote-portal-effect"></div>
            <blockquote>
              "In the multiverse, there are infinite possibilities. Today, we
              write our own destiny."
            </blockquote>
            <cite>— The Ancient One</cite>
          </div>
        </div>
      </div>
    </section>
  );
}
