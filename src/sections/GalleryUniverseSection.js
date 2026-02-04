import React, { useRef, useEffect } from 'react';
import './GalleryUniverseSection.css';

const GALLERY_ITEMS = [
  { id: 1, title: 'Keynote Session', emoji: '🎤', color: '#00d4ff' },
  { id: 2, title: 'Coding Challenge', emoji: '💻', color: '#b026ff' },
  { id: 3, title: 'Award Ceremony', emoji: '🏆', color: '#00ff88' },
  { id: 4, title: 'Networking Event', emoji: '🤝', color: '#ffaa00' },
  { id: 5, title: 'Workshop Demo', emoji: '🎯', color: '#00d4ff' },
  { id: 6, title: 'Team Collaboration', emoji: '👥', color: '#b026ff' },
  { id: 7, title: 'Innovation Showcase', emoji: '💡', color: '#00ff88' },
  { id: 8, title: 'Closing Celebration', emoji: '🎉', color: '#ffaa00' }
];

export default function GalleryUniverseSection() {
  const galleryRef = useRef();

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (galleryRef.current) {
        const frames = galleryRef.current.querySelectorAll('.floating-frame');
        frames.forEach(frame => {
          const rect = frame.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
          const x = (e.clientX - centerX) * 0.1;
          const y = (e.clientY - centerY) * 0.1;
          
          frame.style.transform = `translateZ(0) rotateX(${y}deg) rotateY(${x}deg)`;
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="gallery-section">
      <div className="section-container">
        <h2 className="section-title glow-text">Gallery Universe</h2>
        <p className="section-subtitle">Floating Memories Through Dimensions</p>

        {/* Floating Frames Gallery */}
        <div className="gallery-universe" ref={galleryRef}>
          {GALLERY_ITEMS.map((item, index) => (
            <div
              key={item.id}
              className="floating-frame"
              style={{
                '--index': index,
                '--angle': `${(360 / GALLERY_ITEMS.length) * index}deg`,
                '--delay': `${index * 0.1}s`,
                '--color': item.color
              }}
            >
              <div className="frame-inner">
                <div className="frame-content">
                  <span className="frame-emoji">{item.emoji}</span>
                </div>
                <div className="frame-label">{item.title}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery Info */}
        <div className="gallery-info">
          <p>Hover over frames to explore memories from our multiverse journey</p>
        </div>
      </div>
    </section>
  );
}
