import React, { useState } from 'react';
import './EventsGalaxySection.css';

const EVENTS = [
  {
    id: 1,
    name: 'Code Conquest',
    category: 'Technical',
    icon: '💻',
    color: '#00d4ff',
    description: 'Competitive programming challenge with algorithmic problems',
    rules: 'Individual participation, 3-hour duration, No external resources',
    teamSize: '1 person',
    prizes: '₹25,000 | ₹15,000 | ₹10,000'
  },
  {
    id: 2,
    name: 'Web Nexus',
    category: 'Technical',
    icon: '🌐',
    color: '#00d4ff',
    description: 'Full-stack web development competition',
    rules: 'Teams of 2-3, 6-hour duration, Use any framework',
    teamSize: '2-3 people',
    prizes: '₹30,000 | ₹20,000 | ₹10,000'
  },
  {
    id: 3,
    name: 'AI Odyssey',
    category: 'Technical',
    icon: '🤖',
    color: '#00d4ff',
    description: 'Machine Learning and AI solution development',
    rules: 'Teams of 2-4, Problem statement based, ML frameworks allowed',
    teamSize: '2-4 people',
    prizes: '₹35,000 | ₹25,000 | ₹15,000'
  },
  {
    id: 4,
    name: 'Design Dimension',
    category: 'Non-Technical',
    icon: '🎨',
    color: '#b026ff',
    description: 'UI/UX Design competition for digital solutions',
    rules: 'Individual or teams of 2, 4-hour duration, Use design tools',
    teamSize: '1-2 people',
    prizes: '₹15,000 | ₹10,000 | ₹5,000'
  },
  {
    id: 5,
    name: 'Startup Pitch',
    category: 'Non-Technical',
    icon: '🚀',
    color: '#b026ff',
    description: 'Pitch your innovative startup idea to investors',
    rules: 'Teams of 3-5, 10-minute pitches, Innovation + viability',
    teamSize: '3-5 people',
    prizes: '₹50,000 | ₹30,000 | ₹20,000'
  },
  {
    id: 6,
    name: 'Workshop: Web3',
    category: 'Workshop',
    icon: '⛓️',
    color: '#00ff88',
    description: 'Introduction to Blockchain and Web3 technologies',
    rules: 'Open to all, 2-hour session, Basic programming knowledge required',
    teamSize: 'Individual',
    prizes: 'Certificate of Participation'
  },
  {
    id: 7,
    name: 'Workshop: Cloud Native',
    category: 'Workshop',
    icon: '☁️',
    color: '#00ff88',
    description: 'Building scalable applications on cloud platforms',
    rules: 'Open to all, 2-hour session, Hands-on with AWS/Azure',
    teamSize: 'Individual',
    prizes: 'Certificate of Participation'
  },
  {
    id: 8,
    name: 'Guest Lecture: Future of AI',
    category: 'Guest Lecture',
    icon: '🎤',
    color: '#ffaa00',
    description: 'Leading AI researcher discussing future trends',
    rules: 'Open forum, Q&A session, All welcome',
    teamSize: 'Individual',
    prizes: 'Certificate of Attendance'
  }
];

export default function EventsGalaxySection() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(EVENTS.map(e => e.category))];
  const filteredEvents = selectedCategory === 'All' 
    ? EVENTS 
    : EVENTS.filter(e => e.category === selectedCategory);

  return (
    <section className="events-galaxy-section">
      <div className="section-container">
        <h2 className="section-title glow-text">Events Galaxy</h2>
        <p className="section-subtitle">Explore the Cosmic Competition</p>

        {/* Category Filter */}
        <div className="category-filter">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => {
                setSelectedCategory(cat);
                setSelectedEvent(null);
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="events-grid">
          {filteredEvents.map(event => (
            <div
              key={event.id}
              className="event-planet glass-panel"
              style={{ '--planet-color': event.color }}
              onClick={() => setSelectedEvent(event)}
            >
              <div className="planet-icon">{event.icon}</div>
              <h3 className="event-name">{event.name}</h3>
              <p className="event-category">{event.category}</p>
              <button className="view-btn">View Details</button>
            </div>
          ))}
        </div>

        {/* Selected Event Modal */}
        {selectedEvent && (
          <div className="event-modal-overlay" onClick={() => setSelectedEvent(null)}>
            <div className="event-modal glass-panel" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={() => setSelectedEvent(null)}>✕</button>
              
              <div className="modal-header">
                <div className="modal-icon">{selectedEvent.icon}</div>
                <h2 className="modal-title glow-text">{selectedEvent.name}</h2>
                <span className="modal-category">{selectedEvent.category}</span>
              </div>

              <div className="modal-content">
                <div className="info-block">
                  <h4 className="info-label">📝 Description</h4>
                  <p>{selectedEvent.description}</p>
                </div>

                <div className="info-block">
                  <h4 className="info-label">⚔️ Rules & Guidelines</h4>
                  <p>{selectedEvent.rules}</p>
                </div>

                <div className="info-block">
                  <h4 className="info-label">👥 Team Size</h4>
                  <p className="highlight-text">{selectedEvent.teamSize}</p>
                </div>

                <div className="info-block">
                  <h4 className="info-label">🏆 Prize Pool</h4>
                  <p className="prize-text">{selectedEvent.prizes}</p>
                </div>

                <button className="glow-button register-event-btn">
                  🚀 Register for {selectedEvent.name}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
