import React, { useState } from 'react';
import './ContactStationSection.css';

export default function ContactStationSection() {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (contactForm.name && contactForm.email && contactForm.message) {
      setSubmitted(true);
      setContactForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section className="contact-section">
      <div className="section-container">
        <h2 className="section-title glow-text">Contact Space Station</h2>
        <p className="section-subtitle">Transmission Beacon - Reach Us Across Dimensions</p>

        <div className="contact-wrapper">
          {/* Space Station Visualization */}
          <div className="space-station">
            <div className="station-core"></div>
            <div className="station-antenna antenna-1"></div>
            <div className="station-antenna antenna-2"></div>
            <div className="station-antenna antenna-3"></div>
          </div>

          {/* Contact Content */}
          <div className="contact-content">
            {/* Contact Info */}
            <div className="contact-info-grid">
              <div className="info-card glass-panel">
                <div className="info-icon">📍</div>
                <h4 className="info-title">Location</h4>
                <p>[College Name]</p>
                <p>[City, State - Pin Code]</p>
              </div>

              <div className="info-card glass-panel">
                <div className="info-icon">📧</div>
                <h4 className="info-title">Email</h4>
                <p><a href="mailto:symposium@college.edu">symposium@college.edu</a></p>
                <p><a href="mailto:contact@college.edu">contact@college.edu</a></p>
              </div>

              <div className="info-card glass-panel">
                <div className="info-icon">📱</div>
                <h4 className="info-title">Phone</h4>
                <p>+91 XXXXXX XXXX</p>
                <p>+91 XXXXXX XXXX</p>
              </div>

              <div className="info-card glass-panel">
                <div className="info-icon">🌐</div>
                <h4 className="info-title">Social Media</h4>
                <div className="social-links">
                  <a href="#" className="social-link">Twitter</a>
                  <a href="#" className="social-link">Instagram</a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-wrapper glass-panel">
              <h3 className="form-title">Send Message</h3>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Name *</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={contactForm.name}
                    onChange={handleChange}
                    placeholder="Your name"
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
                    value={contactForm.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject" className="form-label">Subject</label>
                  <input
                    id="subject"
                    type="text"
                    name="subject"
                    value={contactForm.subject}
                    onChange={handleChange}
                    placeholder="Message subject"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={contactForm.message}
                    onChange={handleChange}
                    placeholder="Your message..."
                    className="form-input form-textarea"
                    rows="5"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="glow-button send-btn">
                  📡 Send Transmission
                </button>
              </form>

              {submitted && (
                <div className="success-notification">
                  ✓ Message sent successfully! We'll get back to you soon.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4 className="footer-title">Multiverse Symposium 2026</h4>
            <p>Step Into Infinite Dimensions of Innovation</p>
          </div>
          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#about">About</a></li>
              <li><a href="#events">Events</a></li>
              <li><a href="#registration">Register</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-title">Follow Us</h4>
            <div className="footer-socials">
              <a href="#" className="social-icon">f</a>
              <a href="#" className="social-icon">t</a>
              <a href="#" className="social-icon">in</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Multiverse Symposium. All rights reserved. | Designed with ❤️ from the CS Dept</p>
        </div>
      </footer>
    </section>
  );
}
