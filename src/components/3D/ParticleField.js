import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ParticleField({ count = 1000, size = 0.1, color = '#00d4ff' }) {
  const points = useRef();

  const particlePositions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      arr[i] = (Math.random() - 0.5) * 100;
      arr[i + 1] = (Math.random() - 0.5) * 100;
      arr[i + 2] = (Math.random() - 0.5) * 100;
    }
    return arr;
  }, [count]);

  useFrame(() => {
    if (points.current) {
      points.current.rotation.x += 0.0001;
      points.current.rotation.y += 0.0002;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlePositions.length / 3}
          array={particlePositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.6}
      />
    </points>
  );
}
