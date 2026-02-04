import React, { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard, useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function SpiderMan({
  position = [40, 20, 12],
  scale = 1.9,
  imageUrl = "/assets/spiderman.gif"
}) {
  const group = useRef();
  const time = useRef(0);
  const [texture, setTexture] = useState(null);
  
  // Load texture with error handling
  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      imageUrl,
      (loadedTexture) => {
        loadedTexture.colorSpace = THREE.SRGBColorSpace;
        setTexture(loadedTexture);
      },
      undefined,
      (error) => {
        console.warn('Failed to load SpiderMan texture:', error);
      }
    );
  }, [imageUrl]);
  const [size, setSize] = useState([6, 8, 1]);

  useEffect(() => {
    if (texture) {
      texture.needsUpdate = true;
      // Calculate size based on texture dimensions
      if (texture.image && texture.image.width && texture.image.height) {
        const ratio = texture.image.width / texture.image.height;
        const height = 8;
        setSize([height * ratio, height, 1]);
      }
    }
  }, [texture]);

  useFrame((_, delta) => {
    time.current += delta;

    if (group.current) {
      group.current.rotation.z = Math.sin(time.current * 0.5) * 0.08;
      group.current.rotation.x = Math.PI + Math.cos(time.current * 0.4) * 0.05;
      group.current.rotation.y = 0.25;
      group.current.position.y = position[1] + Math.sin(time.current * 0.9) * 0.12;
    }
  });

  return (
    <group ref={group} position={position} scale={scale}>
      {/* SPIDER-MAN IMAGE (GIF) */}
      {texture ? (
        <Billboard position={[0, 1.8, 0]} follow>
          <mesh rotation={[0, 0, Math.PI]}>
            <planeGeometry args={[size[0], size[1]]} />
            <meshBasicMaterial
              map={texture}
              transparent
              alphaTest={0.05}
              toneMapped={false}
              side={THREE.DoubleSide}
            />
          </mesh>
        </Billboard>
      ) : null}
    </group>
  );
}
