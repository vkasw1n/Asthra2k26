import React, { useState, useEffect, Suspense, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import * as THREE from 'three';
import SpaceBackground from './components/3D/SpaceBackground';
import SpiderMan from './components/3D/SpiderMan';
import MysticPortal from './components/3D/MysticPortal';
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
    <div className="app-container">
      {/* Marvel-style Loading Screen */}
      {isLoading && <MarvelLoader onLoadComplete={handleLoadComplete} />}

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
          <Suspense fallback={null}>
            {/* Spider-Man hanging at the top right */}
            {currentSection === 'landing' && (
              <SpiderMan position={[40, 20, 12]} scale={1.9} />
            )}
            
            {/* Doctor Strange Portal */}
            {currentSection === 'landing' && cameraZoom && (
              <MysticPortal 
                position={[0, 0, -5]} 
                scale={1.5}
                isZooming={cameraZoom}
                onZoomThrough={handlePortalZoom}
              />
            )}
          </Suspense>


          <Preload all />
        </Canvas>
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
