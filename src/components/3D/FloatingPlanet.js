import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function FloatingPlanet({ position, scale, color, emissiveColor, speed, children }) {
  const meshRef = useRef();
  let rotationSpeed = 0;

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += speed * 0.01;
      if (rotationSpeed > 0) {
        meshRef.current.rotation.x += speed * 0.005;
      }
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        color={color}
        emissive={emissiveColor}
        emissiveIntensity={0.5}
        metalness={0.6}
        roughness={0.2}
      />
      {children}
    </mesh>
  );
}
