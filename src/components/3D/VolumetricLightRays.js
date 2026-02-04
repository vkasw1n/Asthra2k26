import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function VolumetricLightRays() {
  const raysRef = useRef();
  const timeRef = useRef(0);

  const rayGeometry = useMemo(() => {
    const rays = [];
    const rayCount = 8;

    for (let i = 0; i < rayCount; i++) {
      const angle = (i / rayCount) * Math.PI * 2;
      const length = 150;
      const width = 30;
      
      const positions = new Float32Array([
        0, 0, 0,
        Math.cos(angle) * width, Math.sin(angle) * width, 0,
        Math.cos(angle) * length, Math.sin(angle) * length, -100,
        Math.cos(angle + 0.1) * length, Math.sin(angle + 0.1) * length, -100,
        Math.cos(angle + 0.1) * width, Math.sin(angle + 0.1) * width, 0,
        0, 0, 0,
      ]);

      const colors = new Float32Array([
        1, 1, 1, 0.0,
        1, 1, 1, 0.05,
        0.8, 0.9, 1, 0.02,
        0.8, 0.9, 1, 0.02,
        1, 1, 1, 0.05,
        1, 1, 1, 0.0,
      ]);

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 4));
      geometry.setIndex([0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4, 5]);
      
      rays.push({ geometry, angle });
    }

    return rays;
  }, []);

  useFrame((state, delta) => {
    timeRef.current += delta;

    if (raysRef.current) {
      raysRef.current.rotation.z += delta * 0.05;
      raysRef.current.children.forEach((ray, index) => {
        ray.rotation.z = Math.sin(timeRef.current * 0.5 + index) * 0.1;
        ray.material.opacity = 0.3 + Math.sin(timeRef.current * 0.8 + index) * 0.2;
      });
    }
  });

  return (
    <group ref={raysRef} position={[0, 0, -150]}>
      {rayGeometry.map((ray, index) => (
        <mesh key={index} geometry={ray.geometry}>
          <meshBasicMaterial
            vertexColors
            transparent
            opacity={0.25}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}
