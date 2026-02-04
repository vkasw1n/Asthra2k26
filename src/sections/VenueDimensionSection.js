import React from 'react';
import './VenueDimensionSection.css';

export default function VenueDimensionSection() {
  return (
    <section className="venue-section">
      <div className="section-container">
        <h2 className="section-title glow-text">Venue Dimension</h2>
        <p className="section-subtitle">Holographic Campus Map</p>

        <div className="venue-content">
          {/* Holographic Map */}
          <div className="holographic-map-wrapper">
            <div className="holographic-map glass-panel">
              <div className="map-grid"></div>
              <div className="campus-visualization">
                {/* Main Building */}
                <div className="building main-building">
                  <div className="building-label">Main Auditorium</div>
                </div>
                {/* Tech Block */}
                <div className="building tech-block">
                  <div className="building-label">CS Block</div>
                </div>
                {/* Meeting Zone */}
                <div className="building meeting-zone">
                  <div className="building-label">Meeting Zone</div>
                </div>
                {/* Workshop Hall */}
                <div className="building workshop-hall">
                  <div className="building-label">Workshop Hall</div>
                </div>
              </div>
              <div className="map-glow"></div>
            </div>
          </div>

          {/* Venue Details */}
          <div className="venue-details-grid">
            <div className="venue-card glass-panel">
              <div className="card-icon">🏛️</div>
              <h3 className="card-title">Main Auditorium</h3>
              <p className="card-desc">Opening ceremony, keynote speeches, and guest lectures</p>
              <p className="card-meta">Capacity: 500+ | Location: Main Building</p>
            </div>

            <div className="venue-card glass-panel">
              <div className="card-icon">💻</div>
              <h3 className="card-title">CS Block</h3>
              <p className="card-desc">Technical competitions, coding marathons, and hackathons</p>
              <p className="card-meta">Labs: 4 | Computers: 100+</p>
            </div>

            <div className="venue-card glass-panel">
              <div className="card-icon">🤝</div>
              <h3 className="card-title">Meeting Zone</h3>
              <p className="card-desc">Networking, mentor sessions, and industry discussions</p>
              <p className="card-meta">Meeting Rooms: 6 | Capacity: 50+</p>
            </div>

            <div className="venue-card glass-panel">
              <div className="card-icon">🎓</div>
              <h3 className="card-title">Workshop Hall</h3>
              <p className="card-desc">Hands-on workshops, training sessions, and demonstrations</p>
              <p className="card-meta">Seats: 200+ | Equipment: Complete</p>
            </div>
          </div>

          {/* Access & Directions */}
          <div className="access-section">
            <h3 className="access-title">How to Access</h3>
            <div className="access-grid">
              <div className="access-card">
                <span className="access-icon">🚗</span>
                <h4>By Vehicle</h4>
                <p>Ample parking available on campus</p>
              </div>
              <div className="access-card">
                <span className="access-icon">🚌</span>
                <h4>Public Transport</h4>
                <p>Bus stops near main gate</p>
              </div>
              <div className="access-card">
                <span className="access-icon">🚕</span>
                <h4>Taxi/Ride Share</h4>
                <p>Drop-off at main entrance</p>
              </div>
              <div className="access-card">
                <span className="access-icon">🌐</span>
                <h4>Live Virtual</h4>
                <p>Stream all events online</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
