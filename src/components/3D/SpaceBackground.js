import React, { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function SpaceBackground() {
  const starsRef = useRef();
  const starsRef2 = useRef();
  const nebulaRef = useRef();
  const { mouse } = useThree();
  const timeRef = useRef(0);

  const starLayer1 = useMemo(() => {
    const count = 160000;
    const scale = 1;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const twinkles = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const idx3 = i * 3;
      positions[idx3] = (Math.random() - 0.5) * 6000 * scale;
      positions[idx3 + 1] = (Math.random() - 0.5) * 6000 * scale;
      positions[idx3 + 2] = (Math.random() - 0.5) * 6000 * scale;

      const colorType = Math.random();
      if (colorType < 0.7) {
        colors[idx3] = 1;
        colors[idx3 + 1] = 1;
        colors[idx3 + 2] = 1;
      } else if (colorType < 0.85) {
        colors[idx3] = 0.6;
        colors[idx3 + 1] = 0.8;
        colors[idx3 + 2] = 1;
      } else {
        colors[idx3] = 1;
        colors[idx3 + 1] = 0.85;
        colors[idx3 + 2] = 0.6;
      }

      sizes[i] = 0.04 + Math.random() * 0.35;
      twinkles[i] = Math.random() * Math.PI * 2;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.userData.twinkles = twinkles;
    geometry.userData.originalSizes = Array.from(sizes);

    return geometry;
  }, []);

  const starLayer2 = useMemo(() => {
    const count = 120000;
    const scale = 0.55;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const twinkles = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const idx3 = i * 3;
      positions[idx3] = (Math.random() - 0.5) * 6000 * scale;
      positions[idx3 + 1] = (Math.random() - 0.5) * 6000 * scale;
      positions[idx3 + 2] = (Math.random() - 0.5) * 6000 * scale;

      const colorType = Math.random();
      if (colorType < 0.7) {
        colors[idx3] = 1;
        colors[idx3 + 1] = 1;
        colors[idx3 + 2] = 1;
      } else if (colorType < 0.85) {
        colors[idx3] = 0.6;
        colors[idx3 + 1] = 0.8;
        colors[idx3 + 2] = 1;
      } else {
        colors[idx3] = 1;
        colors[idx3 + 1] = 0.85;
        colors[idx3 + 2] = 0.6;
      }

      sizes[i] = 0.06 + Math.random() * 0.45;
      twinkles[i] = Math.random() * Math.PI * 2;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.userData.twinkles = twinkles;
    geometry.userData.originalSizes = Array.from(sizes);

    return geometry;
  }, []);

  useFrame((state, delta) => {
    timeRef.current += delta;

    if (nebulaRef.current) {
      nebulaRef.current.rotation.z += delta * 0.005;
      nebulaRef.current.rotation.x += delta * 0.002;
    }

    // Update star layer 1 - VERY minimal updates for performance
    if (starsRef.current && starsRef.current.geometry) {
      // Very subtle rotation and drift
      starsRef.current.rotation.x += delta * 0.000005;
      starsRef.current.rotation.y += delta * 0.00001;
      starsRef.current.position.z = Math.sin(timeRef.current * 0.05) * 2;
      
      // Mouse response only every other frame for performance
      if (Math.floor(timeRef.current * 60) % 2 === 0) {
        starsRef.current.rotation.x += mouse.y * 0.08;
        starsRef.current.rotation.y += mouse.x * 0.08;
      }

      // Update only visible stars for performance
      const sizeAttribute = starsRef.current.geometry.getAttribute('size');
      const sizes = sizeAttribute?.array;
      let twinkles = starsRef.current.geometry.userData?.twinkles;
      let originalSizes = starsRef.current.geometry.userData?.originalSizes;

      if (!sizes || sizes.length === 0) {
        return;
      }

      if (!twinkles || twinkles.length !== sizes.length) {
        twinkles = new Float32Array(sizes.length);
        for (let i = 0; i < twinkles.length; i++) {
          twinkles[i] = Math.random() * Math.PI * 2;
        }
        starsRef.current.geometry.userData.twinkles = twinkles;
      }

      if (!originalSizes || originalSizes.length !== sizes.length) {
        originalSizes = Array.from(sizes);
        starsRef.current.geometry.userData.originalSizes = originalSizes;
      }

      // Only update every 100 stars for massive performance gain
      for (let i = 0; i < sizes.length; i += 100) {
        const twinkle = Math.sin(timeRef.current * 0.8 + twinkles[i]) * 0.5 + 0.5;
        sizes[i] = (originalSizes?.[i] || 0.2) * (0.6 + twinkle * 0.4);
      }
      sizeAttribute.needsUpdate = true;
    }

    // Update star layer 2 - even more minimal
    if (starsRef2.current && starsRef2.current.geometry) {
      starsRef2.current.rotation.x += delta * 0.000008;
      starsRef2.current.rotation.y += delta * 0.000015;
      starsRef2.current.position.z = Math.sin(timeRef.current * 0.07) * 3;
      
      if (Math.floor(timeRef.current * 60) % 3 === 0) {
        starsRef2.current.rotation.x += mouse.y * 0.12;
        starsRef2.current.rotation.y += mouse.x * 0.12;
      }

      const sizeAttribute = starsRef2.current.geometry.getAttribute('size');
      const sizes = sizeAttribute?.array;
      let twinkles = starsRef2.current.geometry.userData?.twinkles;
      let originalSizes = starsRef2.current.geometry.userData?.originalSizes;

      if (!sizes || sizes.length === 0) {
        return;
      }

      if (!twinkles || twinkles.length !== sizes.length) {
        twinkles = new Float32Array(sizes.length);
        for (let i = 0; i < twinkles.length; i++) {
          twinkles[i] = Math.random() * Math.PI * 2;
        }
        starsRef2.current.geometry.userData.twinkles = twinkles;
      }

      if (!originalSizes || originalSizes.length !== sizes.length) {
        originalSizes = Array.from(sizes);
        starsRef2.current.geometry.userData.originalSizes = originalSizes;
      }

      for (let i = 0; i < sizes.length; i += 150) {
        const twinkle = Math.sin(timeRef.current * 0.6 + twinkles[i]) * 0.5 + 0.5;
        sizes[i] = (originalSizes?.[i] || 0.3) * (0.5 + twinkle * 0.5);
      }
      sizeAttribute.needsUpdate = true;
    }
  });

  // Create realistic star texture with glow
  const createStarTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    
    // Create strong radial gradient for realistic star glow
    const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.3, 'rgba(255,255,255,0.9)');
    gradient.addColorStop(0.6, 'rgba(255,255,255,0.5)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(64, 64, 64, 0, Math.PI * 2);
    ctx.fill();
    
    return new THREE.CanvasTexture(canvas);
  };

  const starTexture = useMemo(() => createStarTexture(), []);

  const nebulaTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
    gradient.addColorStop(0, 'rgba(50,120,255,0.25)');
    gradient.addColorStop(0.4, 'rgba(120,60,255,0.18)');
    gradient.addColorStop(0.7, 'rgba(255,120,80,0.08)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);
    return new THREE.CanvasTexture(canvas);
  }, []);

  return (
    <group>
      <ambientLight intensity={0.4} color="#ffffff" />

      {/* Nebula fog layers */}
      <group ref={nebulaRef} position={[0, 0, -200]}>
        <mesh rotation={[0, 0, Math.PI / 8]}>
          <planeGeometry args={[1200, 1200]} />
          <meshBasicMaterial map={nebulaTexture} transparent opacity={0.6} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
        <mesh rotation={[0, 0, -Math.PI / 6]} position={[200, -100, -50]}>
          <planeGeometry args={[1000, 1000]} />
          <meshBasicMaterial map={nebulaTexture} transparent opacity={0.4} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      </group>
      
      {/* Far layer stars */}
      <points ref={starsRef} geometry={starLayer1}>
        <pointsMaterial
          size={0.6}
          sizeAttenuation={true}
          transparent={true}
          vertexColors={true}
          depthWrite={false}
          toneMapped={false}
          blending={THREE.AdditiveBlending}
          map={starTexture}
        />
      </points>

      {/* Close layer stars with different size */}
      <points ref={starsRef2} geometry={starLayer2}>
        <pointsMaterial
          size={1.0}
          sizeAttenuation={true}
          transparent={true}
          vertexColors={true}
          depthWrite={false}
          toneMapped={false}
          blending={THREE.AdditiveBlending}
          map={starTexture}
        />
      </points>

      {/* Background sphere */}
      <mesh>
        <sphereGeometry args={[400, 60, 40]} />
        <meshBasicMaterial color="#000000" side={THREE.BackSide} />
      </mesh>
    </group>
  );
}
