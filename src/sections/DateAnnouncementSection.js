import React, { useEffect, useState } from 'react';
import './DateAnnouncementSection.css';

export default function DateAnnouncementSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Calculate time until date reveal
  const calculateTimeUntil = () => {
    const eventDate = new Date('2026-03-15').getTime();
    const now = new Date().getTime();
    const difference = eventDate - now;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days: days < 0 ? 0 : days, hours, minutes, seconds };
  };

  const [time, setTime] = useState(calculateTimeUntil());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(calculateTimeUntil());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section className="date-announcement-section">
      <div className="section-container">
        <h2 className="section-title glow-text">Date Announcement Zone</h2>
        <p className="section-subtitle">Satellite Beacon - Temporal Coordinates Incoming</p>

        <div className="date-content">
          {/* Main countdown box */}
          <div className="countdown-box glass-panel">
            <h3 className="countdown-label glow-text-accent">TEMPORAL COUNTDOWN</h3>
            
            <div className="countdown-display">
              <div className="time-unit">
                <div className="time-value">{String(time.days).padStart(2, '0')}</div>
                <div className="time-label">Days</div>
              </div>
              <div className="countdown-separator">:</div>
              <div className="time-unit">
                <div className="time-value">{String(time.hours).padStart(2, '0')}</div>
                <div className="time-label">Hours</div>
              </div>
              <div className="countdown-separator">:</div>
              <div className="time-unit">
                <div className="time-value">{String(time.minutes).padStart(2, '0')}</div>
                <div className="time-label">Minutes</div>
              </div>
              <div className="countdown-separator">:</div>
              <div className="time-unit">
                <div className="time-value">{String(time.seconds).padStart(2, '0')}</div>
                <div className="time-label">Seconds</div>
              </div>
            </div>

            <p className="reveal-message">
              📡 Date Revealing Soon 📡
            </p>
          </div>

          {/* Email signup */}
          <div className="email-signup glass-panel">
            <h3 className="signup-title">Get Notified When Date is Revealed</h3>
            <form onSubmit={handleSubmit} className="email-form">
              <input
                type="email"
                placeholder="Enter your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="email-input"
              />
              <button type="submit" className="glow-button">
                🛰️ Subscribe
              </button>
            </form>
            
            {submitted && (
              <div className="success-message">
                <div className="particle-burst"></div>
                ✓ Notification registered! You'll be the first to know.
              </div>
            )}
          </div>

          {/* Satellite info cards */}
          <div className="satellite-grid">
            <div className="satellite-card holographic">
              <div className="card-icon">🪐</div>
              <h4>Event Coordinates</h4>
              <p>Location details will be transmitted upon date announcement</p>
            </div>
            <div className="satellite-card holographic">
              <div className="card-icon">🌌</div>
              <h4>Dimensions Unlocking</h4>
              <p>Multiple event zones will be revealed sequentially</p>
            </div>
            <div className="satellite-card holographic">
              <div className="card-icon">⚡</div>
              <h4>Live Broadcast</h4>
              <p>Participate from anywhere in the multiverse</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
