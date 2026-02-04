import React, { useState, useRef, useEffect } from 'react';
import './SpeakersConstellationSection.css';

const SPEAKERS = [
  {
    id: 1,
    name: 'Dr. Sarah Chen',
    title: 'AI Research Lead',
    company: 'Tech Innovation Labs',
    bio: 'Pioneering research in neural networks and machine learning applications',
    expertise: 'AI/ML',
    image: '🧠'
  },
  {
    id: 2,
    name: 'Raj Patel',
    title: 'Full Stack Architect',
    company: 'CloudScale Inc',
    bio: 'Building scalable distributed systems and microservices',
    expertise: 'Cloud/DevOps',
    image: '☁️'
  },
  {
    id: 3,
    name: 'Maria Rodriguez',
    title: 'Product Design Director',
    company: 'Creative Digital',
    bio: 'Crafting beautiful and functional user experiences',
    expertise: 'Design/UX',
    image: '🎨'
  },
  {
    id: 4,
    name: 'Alex Kim',
    title: 'Blockchain Engineer',
    company: 'Web3 Ventures',
    bio: 'Smart contracts, DeFi, and blockchain innovation',
    expertise: 'Web3/Blockchain',
    image: '⛓️'
  },
  {
    id: 5,
    name: 'Emily Watson',
    title: 'Cybersecurity Expert',
    company: 'SecureNet Global',
    bio: 'Defending digital systems and securing the future',
    expertise: 'Security',
    image: '🔐'
  },
  {
    id: 6,
    name: 'David Kumar',
    title: 'Startup Founder & CEO',
    company: 'InnovateTech',
    bio: 'Building the next generation of tech startups',
    expertise: 'Entrepreneurship',
    image: '🚀'
  }
];

export default function SpeakersConstellationSection() {
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);
  const constellationRef = useRef();

  useEffect(() => {
    // Animate stars in constellation
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
      star.style.setProperty('--index', index);
    });
  }, []);

  return (
    <section className="speakers-section">
      <div className="section-container">
        <h2 className="section-title glow-text">Speakers Constellation</h2>
        <p className="section-subtitle">Meet the Brilliant Stars</p>

        {/* Constellation View */}
        <div className="constellation-wrapper" ref={constellationRef}>
          <div className="constellation">
            {SPEAKERS.map((speaker, index) => (
              <div
                key={speaker.id}
                className="star"
                style={{
                  '--angle': `${(360 / SPEAKERS.length) * index}deg`,
                  '--distance': '200px'
                }}
              >
                <button
                  className="speaker-star"
                  onClick={() => setSelectedSpeaker(speaker)}
                  title={speaker.name}
                >
                  <span className="star-icon">{speaker.image}</span>
                  <span className="star-name">{speaker.name.split(' ')[0]}</span>
                </button>
              </div>
            ))}
            <div className="constellation-core"></div>
          </div>
        </div>

        {/* Speaker Modal */}
        {selectedSpeaker && (
          <div className="speaker-modal-overlay" onClick={() => setSelectedSpeaker(null)}>
            <div className="speaker-modal glass-panel" onClick={(e) => e.stopPropagation()}>
              <button 
                className="close-btn" 
                onClick={() => setSelectedSpeaker(null)}
              >
                ✕
              </button>

              <div className="speaker-header">
                <div className="speaker-avatar">{selectedSpeaker.image}</div>
                <h2 className="speaker-name glow-text">{selectedSpeaker.name}</h2>
              </div>

              <div className="speaker-content">
                <div className="speaker-info-block">
                  <label className="info-label">🏢 Position</label>
                  <p className="speaker-title">{selectedSpeaker.title}</p>
                  <p className="speaker-company">{selectedSpeaker.company}</p>
                </div>

                <div className="speaker-info-block">
                  <label className="info-label">⭐ Expertise</label>
                  <span className="expertise-badge">{selectedSpeaker.expertise}</span>
                </div>

                <div className="speaker-info-block">
                  <label className="info-label">📝 Bio</label>
                  <p className="speaker-bio">{selectedSpeaker.bio}</p>
                </div>

                <button className="glow-button follow-btn">
                  Follow Speaker
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Speakers Grid Fallback */}
        <div className="speakers-grid">
          {SPEAKERS.map(speaker => (
            <div
              key={speaker.id}
              className="speaker-card glass-panel"
              onClick={() => setSelectedSpeaker(speaker)}
            >
              <div className="card-avatar">{speaker.image}</div>
              <h3 className="card-name">{speaker.name}</h3>
              <p className="card-title">{speaker.title}</p>
              <p className="card-company">{speaker.company}</p>
              <button className="view-profile-btn">View Profile</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
