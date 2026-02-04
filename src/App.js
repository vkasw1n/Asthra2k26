import React, { useState, useEffect, Suspense, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import * as THREE from 'three';
import SpaceBackground from './components/3D/SpaceBackground';
import SpiderMan from './components/3D/SpiderMan';
import MysticPortal from './components/3D/MysticPortal';
import VolumetricLightRays from './components/3D/VolumetricLightRays';
import Navigation from './components/Navigation';
import MarvelLoader from './components/MarvelLoader';
import LandingSection from './sections/LandingSection';
import AboutSection from './sections/AboutSection';
import DateAnnouncementSection from './sections/DateAnnouncementSection';
import EventsGalaxySection from './sections/EventsGalaxySection';
import RegistrationPortalSection from './sections/RegistrationPortalSection';
import SpeakersConstellationSection from './sections/SpeakersConstellationSection';
import VenueDimensionSection from './sections/VenueDimensionSection';
import GalleryUniverseSection from './sections/GalleryUniverseSection';
import ContactStationSection from './sections/ContactStationSection';
import './App.css';

function PortalZoomController({ isZooming }) {
  const { camera } = useThree();
  const targetZ = useRef(camera.position.z);

  useFrame((state, delta) => {
    if (isZooming) {
      targetZ.current = 6;
    } else {
      targetZ.current = 50;
    }
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ.current, 3.5, delta);
  });

  return null;
}

function App() {
  const appRef = useRef(null);
  const [currentSection, setCurrentSection] = useState('landing');
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [cameraZoom, setCameraZoom] = useState(false);

  useEffect(() => {
    // Add ambient space music effect (can be expanded with actual audio)
    if (musicEnabled) {
      console.log('Ambient music enabled');
      // Play ambient music here
    }
  }, [musicEnabled]);

  useEffect(() => {
    const handleParallax = (event) => {
      if (!appRef.current) {
        return;
      }
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      appRef.current.style.setProperty('--parallax-x', `${x * 30}px`);
      appRef.current.style.setProperty('--parallax-y', `${y * 20}px`);
    };

    window.addEventListener('mousemove', handleParallax);
    return () => window.removeEventListener('mousemove', handleParallax);
  }, []);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  const handlePortalZoom = () => {
    setCameraZoom(true);
    setTimeout(() => {
      setCurrentSection('about');
    }, 1600);
    setTimeout(() => {
      setCameraZoom(false);
    }, 2200);
  };

  const sections = [
    { id: 'landing', label: 'Universe', component: LandingSection },
    { id: 'about', label: 'About', component: AboutSection },
    { id: 'date', label: 'Date', component: DateAnnouncementSection },
    { id: 'events', label: 'Events', component: EventsGalaxySection },
    { id: 'registration', label: 'Register', component: RegistrationPortalSection },
    { id: 'speakers', label: 'Speakers', component: SpeakersConstellationSection },
    { id: 'venue', label: 'Venue', component: VenueDimensionSection },
    { id: 'gallery', label: 'Gallery', component: GalleryUniverseSection },
    { id: 'contact', label: 'Contact', component: ContactStationSection },
  ];

  const CurrentSection = sections.find(s => s.id === currentSection)?.component || LandingSection;

  return (
    <div className="app-container" ref={appRef}>
      {/* Marvel-style Loading Screen */}
      {isLoading && <MarvelLoader onLoadComplete={handleLoadComplete} />}

      {/* Cosmic backdrop layers */}
      <div className="cosmic-backdrop">
        <div className="nebula-layer layer-1"></div>
        <div className="nebula-layer layer-2"></div>
        <div className="galaxy-layer"></div>
        <div className="fog-layer"></div>
      </div>

      {/* 3D Background Canvas */}
      <div className="canvas-container">
        <Canvas 
          camera={{ position: [0, 0, 50], fov: 75 }} 
          className="space-canvas"
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: 'high-performance'
          }}
        >
          <PortalZoomController isZooming={cameraZoom} />
          <SpaceBackground />
          <VolumetricLightRays />
          <Suspense fallback={null}>
            {/* Spider-Man hanging at the top right */}
            {currentSection === 'landing' && (
              <SpiderMan position={[40, 20, 12]} scale={1.9} />
            )}
            
            {/* Doctor Strange Portal */}
            {currentSection === 'landing' && (
              <MysticPortal 
                position={[0, 0, -6]} 
                scale={1.15}
                fullScreen={false}
              />
            )}
          </Suspense>


          <Preload all />
        </Canvas>
      </div>

      {/* Multiverse energy overlays */}
      <div className="energy-streaks">
        {Array.from({ length: 6 }).map((_, index) => (
          <span key={`streak-${index}`} className="energy-streak"></span>
        ))}
      </div>
      <div className="nebula-lightning">
        {Array.from({ length: 3 }).map((_, index) => (
          <span key={`flash-${index}`} className="lightning-flash"></span>
        ))}
      </div>
      <div className="dimension-debris">
        {Array.from({ length: 7 }).map((_, index) => (
          <span key={`debris-${index}`} className="debris-rock"></span>
        ))}
      </div>

      {/* Navigation */}
      <Navigation 
        sections={sections} 
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
        musicEnabled={musicEnabled}
        setMusicEnabled={setMusicEnabled}
      />

      {/* Content Section */}
      <div className="content-container">
        <Suspense fallback={<div className="loading-spinner"></div>}>
          <CurrentSection setCurrentSection={setCurrentSection} onPortalZoom={handlePortalZoom} />
        </Suspense>
      </div>

      {/* Ambient particles overlay */}
      <div className="particles-overlay"></div>
    </div>
  );
}

export default App;
