import React, { useState, useEffect } from 'react';
import './RegistrationPortalSection.css';

export default function RegistrationPortalSection() {
  const [formData, setFormData] = useState({
    name: '',
    college: '',
    email: '',
    phone: '',
    events: []
  });
  const [submitted, setSubmitted] = useState(false);
  const [particles, setParticles] = useState([]);

  const events = [
    'Code Conquest',
    'Web Nexus',
    'AI Odyssey',
    'Design Dimension',
    'Startup Pitch',
    'Workshop: Web3',
    'Workshop: Cloud Native',
    'Guest Lecture: Future of AI'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        events: checked
          ? [...prev.events, value]
          : prev.events.filter(e => e !== value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.college && formData.email && formData.events.length > 0) {
      setSubmitted(true);
      createParticleEffect();
      setTimeout(() => {
        setFormData({ name: '', college: '', email: '', phone: '', events: [] });
        setSubmitted(false);
      }, 3000);
    }
  };

  const createParticleEffect = () => {
    const newParticles = [];
    for (let i = 0; i < 20; i++) {
      newParticles.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5
      });
    }
    setParticles(newParticles);
  };

  return (
    <section className="registration-section">
      <div className="section-container">
        <h2 className="section-title glow-text">Registration Portal</h2>
        <p className="section-subtitle">Teleportation Gate - Begin Your Journey</p>

        <div className="portal-wrapper">
          {/* Teleportation Gate Visual */}
          <div className="teleport-gate">
            <div className="gate-frame">
              <div className="gate-edge gate-edge-top"></div>
              <div className="gate-edge gate-edge-right"></div>
              <div className="gate-edge gate-edge-bottom"></div>
              <div className="gate-edge gate-edge-left"></div>
            </div>
            <div className="gate-glow"></div>
            <div className="gate-particles"></div>
          </div>

          {/* Registration Form */}
          <form className="registration-form glass-panel" onSubmit={handleSubmit}>
            <h3 className="form-title">Teleporter Entry Form</h3>

            <div className="form-group">
              <label htmlFor="name" className="form-label">Full Name *</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="college" className="form-label">College Name *</label>
              <input
                id="college"
                type="text"
                name="college"
                value={formData.college}
                onChange={handleChange}
                placeholder="Your college/institution"
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email *</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone" className="form-label">Phone</label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 XXXXXXXXXX"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Select Events *</label>
              <div className="events-checklist">
                {events.map(event => (
                  <label key={event} className="checkbox-label">
                    <input
                      type="checkbox"
                      name="events"
                      value={event}
                      checked={formData.events.includes(event)}
                      onChange={handleChange}
                      className="checkbox-input"
                    />
                    <span className="checkbox-custom"></span>
                    <span className="checkbox-text">{event}</span>
                  </label>
                ))}
              </div>
            </div>

            <button 
              type="submit" 
              className="glow-button teleport-btn"
              disabled={submitted}
            >
              {submitted ? '✓ Entry Teleported!' : '🚀 Teleport My Entry'}
            </button>

            {submitted && (
              <div className="success-container">
                <div className="success-message">
                  ✨ Welcome to the Multiverse, {formData.name}! ✨
                </div>
                <div className="success-particles">
                  {particles.map(particle => (
                    <div
                      key={particle.id}
                      className="particle"
                      style={{
                        left: `${particle.left}%`,
                        animationDelay: `${particle.delay}s`
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Info Cards */}
        <div className="registration-info">
          <div className="info-card glass-panel">
            <div className="info-icon">⚡</div>
            <h4>Instant Confirmation</h4>
            <p>Receive confirmation email immediately after registration</p>
          </div>
          <div className="info-card glass-panel">
            <div className="info-icon">📧</div>
            <h4>Event Updates</h4>
            <p>Get real-time notifications about selected events</p>
          </div>
          <div className="info-card glass-panel">
            <div className="info-icon">🎖️</div>
            <h4>Certificate</h4>
            <p>Digital certificate of participation after completion</p>
          </div>
        </div>
      </div>
    </section>
  );
}
