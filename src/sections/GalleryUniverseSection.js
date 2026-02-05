import React, { useRef, useEffect, useState } from "react";
import "./GalleryUniverseSection.css";

const GALLERY_ITEMS = [
  {
    id: 1,
    title: "Keynote Session",
    emoji: "🎤",
    stone: "power",
    stoneColor: "#9b4dff",
  },
  {
    id: 2,
    title: "Coding Challenge",
    emoji: "💻",
    stone: "space",
    stoneColor: "#00b4ff",
  },
  {
    id: 3,
    title: "Award Ceremony",
    emoji: "🏆",
    stone: "reality",
    stoneColor: "#ff3366",
  },
  {
    id: 4,
    title: "Networking Event",
    emoji: "🤝",
    stone: "soul",
    stoneColor: "#ff9933",
  },
  {
    id: 5,
    title: "Workshop Demo",
    emoji: "🎯",
    stone: "time",
    stoneColor: "#00ff88",
  },
  {
    id: 6,
    title: "Team Collaboration",
    emoji: "👥",
    stone: "mind",
    stoneColor: "#ffff00",
  },
  {
    id: 7,
    title: "Innovation Showcase",
    emoji: "💡",
    stone: "power",
    stoneColor: "#9b4dff",
  },
  {
    id: 8,
    title: "Closing Celebration",
    emoji: "🎉",
    stone: "soul",
    stoneColor: "#ff9933",
  },
];

export default function GalleryUniverseSection() {
  const galleryRef = useRef();
  const sectionRef = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
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

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (galleryRef.current) {
        const frames = galleryRef.current.querySelectorAll(".floating-frame");
        frames.forEach((frame) => {
          const rect = frame.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;

          const x = (e.clientX - centerX) * 0.08;
          const y = (e.clientY - centerY) * 0.08;

          frame.style.setProperty("--rotateX", `${y}deg`);
          frame.style.setProperty("--rotateY", `${x}deg`);
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      className={`gallery-section marvel-gallery ${isVisible ? "visible" : ""}`}
      ref={sectionRef}
    >
      {/* Multiverse Background Effects */}
      <div className="gallery-multiverse-bg">
        <div className="dimension-rift rift-1"></div>
        <div className="dimension-rift rift-2"></div>
        <div className="dimension-rift rift-3"></div>
        <div className="cosmic-particles"></div>
      </div>

      {/* Floating Infinity Stones */}
      <div className="gallery-stones">
        <span className="floating-stone stone-1"></span>
        <span className="floating-stone stone-2"></span>
        <span className="floating-stone stone-3"></span>
        <span className="floating-stone stone-4"></span>
      </div>

      <div className="section-container">
        {/* Marvel Header */}
        <div className="gallery-header">
          <div className="header-portal-effect"></div>
          <h2 className="section-title marvel-title">
            <span className="title-bracket">[</span>
            Gallery Multiverse
            <span className="title-bracket">]</span>
          </h2>
          <p className="section-subtitle marvel-sub">
            <span className="portal-icon">🌀</span>
            Memories From Infinite Timelines
            <span className="portal-icon">🌀</span>
          </p>
        </div>

        {/* Central Portal */}
        <div className="central-portal">
          <div className="portal-ring-outer"></div>
          <div className="portal-ring-middle"></div>
          <div className="portal-ring-inner"></div>
          <div className="portal-core-glow"></div>
        </div>

        {/* Floating Frames Gallery */}
        <div className="gallery-universe marvel-universe" ref={galleryRef}>
          {GALLERY_ITEMS.map((item, index) => (
            <div
              key={item.id}
              className={`floating-frame marvel-frame ${item.stone}`}
              style={{
                "--index": index,
                "--angle": `${(360 / GALLERY_ITEMS.length) * index}deg`,
                "--delay": `${index * 0.15}s`,
                "--stone-color": item.stoneColor,
              }}
            >
              <div className="frame-inner">
                <div className="frame-portal-border">
                  <div className="portal-spark spark-1"></div>
                  <div className="portal-spark spark-2"></div>
                  <div className="portal-spark spark-3"></div>
                  <div className="portal-spark spark-4"></div>
                </div>
                <div className="frame-content">
                  <div className="frame-glow"></div>
                  <span className="frame-emoji">{item.emoji}</span>
                  <div className="stone-indicator"></div>
                </div>
                <div className="frame-label">
                  <span className="label-text">{item.title}</span>
                  <span className="label-line"></span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery Info */}
        <div className="gallery-info marvel-info">
          <div className="info-portal-effect"></div>
          <div className="info-content">
            <span className="info-icon">✨</span>
            <p>
              Navigate through dimensions to explore memories from our
              multiverse journey
            </p>
            <span className="info-icon">✨</span>
          </div>
          <div className="info-stones">
            <span className="mini-stone power"></span>
            <span className="mini-stone space"></span>
            <span className="mini-stone reality"></span>
            <span className="mini-stone soul"></span>
            <span className="mini-stone time"></span>
            <span className="mini-stone mind"></span>
          </div>
        </div>
      </div>
    </section>
  );
}
