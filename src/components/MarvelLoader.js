import React, { useEffect, useState } from 'react';
import './MarvelLoader.css';

export default function MarvelLoader({ onLoadComplete }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => onLoadComplete(), 1000);
          }, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onLoadComplete]);

  return (
    <div className={`marvel-loader ${isExiting ? 'exiting' : ''}`}>
      {/* Multiverse fracture lines */}
      <div className="multiverse-fractures">
        <div className="fracture fracture-1"></div>
        <div className="fracture fracture-2"></div>
        <div className="fracture fracture-3"></div>
        <div className="fracture fracture-4"></div>
        <div className="fracture fracture-5"></div>
      </div>

      {/* Arc Reactor Core */}
      <div className="arc-reactor-core">
        <div className="reactor-outer-ring">
          <div className="ring-segment"></div>
          <div className="ring-segment"></div>
          <div className="ring-segment"></div>
          <div className="ring-segment"></div>
          <div className="ring-segment"></div>
          <div className="ring-segment"></div>
          <div className="ring-segment"></div>
          <div className="ring-segment"></div>
        </div>
        
        <div className="reactor-middle-ring"></div>
        
        <div className="reactor-inner-core">
          <div className="core-glow"></div>
          <div className="core-center"></div>
        </div>

        {/* Energy waves */}
        <div className="energy-wave wave-1"></div>
        <div className="energy-wave wave-2"></div>
        <div className="energy-wave wave-3"></div>
        
        {/* Particle burst */}
        {[...Array(12)].map((_, i) => (
          <div key={i} className="energy-particle" style={{
            transform: `rotate(${i * 30}deg) translateX(0px)`,
            animationDelay: `${i * 0.1}s`
          }}></div>
        ))}
      </div>

      {/* Loading text and progress */}
      <div className="loading-info">
        <div className="loading-text">INITIALIZING MULTIVERSE</div>
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          <div className="progress-glow" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="progress-percent">{Math.floor(progress)}%</div>
      </div>

      {/* Dimensional grid */}
      <div className="dimensional-grid">
        {[...Array(20)].map((_, i) => (
          <div key={`h-${i}`} className="grid-line horizontal" style={{ top: `${i * 5}%` }}></div>
        ))}
        {[...Array(20)].map((_, i) => (
          <div key={`v-${i}`} className="grid-line vertical" style={{ left: `${i * 5}%` }}></div>
        ))}
      </div>

      {/* Corner tech details */}
      <div className="tech-corners">
        <div className="corner top-left">
          <span>SYS_ID: ASTHRA2K26</span>
        </div>
        <div className="corner top-right">
          <span>DIMENSION: PRIME</span>
        </div>
        <div className="corner bottom-left">
          <span>STATUS: CHARGING</span>
        </div>
        <div className="corner bottom-right">
          <span>POWER: {Math.floor(progress)}%</span>
        </div>
      </div>
    </div>
  );
}
