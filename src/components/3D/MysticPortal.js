import React, { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const COLOR_WHITE = new THREE.Color("#fff8ea");
const COLOR_YELLOW = new THREE.Color("#ffd27a");
const COLOR_ORANGE = new THREE.Color("#ff8c1a");
const COLOR_RED = new THREE.Color("#ff3b1a");
const COLOR_DARK = new THREE.Color("#140804");

const EDGE_BASE_RADIUS = 3.6;

const createRingSegments = (count, radius, jitter) => {
  const positions = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const nextAngle = angle + 0.02 + Math.random() * 0.12;
    const r = radius + (Math.random() - 0.5) * jitter;
    positions.push(
      Math.cos(angle) * r,
      Math.sin(angle) * r,
      (Math.random() - 0.5) * 0.08,
      Math.cos(nextAngle) * r,
      Math.sin(nextAngle) * r,
      (Math.random() - 0.5) * 0.08
    );
  }
  return new Float32Array(positions);
};

const createStreaks = (count) => {
  const positions = new Float32Array(count * 6);
  const dirs = new Float32Array(count * 2);
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    dirs[i * 2] = Math.cos(angle);
    dirs[i * 2 + 1] = Math.sin(angle);
  }
  return { positions, dirs };
};

const createParticles = (count, radius, spread, speedRange, layerCount) => {
  const positions = new Float32Array(count * 3);
  const velocities = new Float32Array(count * 3);
  const ages = new Float32Array(count);
  const lifetimes = new Float32Array(count);
  const layers = new Float32Array(count);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const layer = Math.floor(Math.random() * layerCount);
    const angle = Math.random() * Math.PI * 2;
    const r = radius + (Math.random() - 0.5) * spread + layer * 0.15;
    const speed = speedRange[0] + Math.random() * (speedRange[1] - speedRange[0]);
    const tangential = new THREE.Vector2(-Math.sin(angle), Math.cos(angle));
    const outward = new THREE.Vector2(Math.cos(angle), Math.sin(angle));

    positions[i * 3] = Math.cos(angle) * r;
    positions[i * 3 + 1] = Math.sin(angle) * r;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.15;

    velocities[i * 3] = (tangential.x * speed + outward.x * (0.4 + Math.random() * 0.2));
    velocities[i * 3 + 1] = (tangential.y * speed + outward.y * (0.4 + Math.random() * 0.2));
    velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.1;

    ages[i] = Math.random();
    lifetimes[i] = 0.8 + Math.random() * 1.6;
    layers[i] = layer;

    colors[i * 3] = COLOR_WHITE.r;
    colors[i * 3 + 1] = COLOR_WHITE.g;
    colors[i * 3 + 2] = COLOR_WHITE.b;
  }

  return { positions, velocities, ages, lifetimes, layers, colors };
};

function DrStrangePortal({ position = [0, 0, 0], scale = 1, fullScreen = true }) {
  const groupRef = useRef();
  const ringRefs = useRef([]);
  const sparkRef = useRef();
  const emberRef = useRef();
  const streakRef = useRef();
  const innerRef = useRef();
  const lightRef = useRef();
  const phaseTime = useRef(0);
  const surge = useRef(0);
  const nextSurge = useRef(1.2);
  const portalScale = useRef(0.18);
  const intensity = useRef(0);
  const { viewport, camera } = useThree();

  const ringGeometries = useMemo(() => [
    createRingSegments(2200, EDGE_BASE_RADIUS, 0.55),
    createRingSegments(1800, EDGE_BASE_RADIUS - 0.12, 0.4),
    createRingSegments(1400, EDGE_BASE_RADIUS - 0.24, 0.3),
  ], []);

  const sparks = useMemo(
    () => createParticles(14000, EDGE_BASE_RADIUS, 0.8, [0.9, 2.0], 3),
    []
  );

  const embers = useMemo(
    () => createParticles(9000, EDGE_BASE_RADIUS - 0.4, 1.3, [0.35, 1.0], 2),
    []
  );

  const streaks = useMemo(() => createStreaks(90), []);

  const innerUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uIntensity: { value: 0 },
      uParallax: { value: new THREE.Vector2(0, 0) },
    }),
    []
  );

  useFrame((state, delta) => {
    phaseTime.current += delta;
    const FORM = 3.6;
    const EXPAND = 2.8;

    let targetIntensity = 1;
    let targetScaleFactor = 1;

    if (phaseTime.current < FORM) {
      const t = phaseTime.current / FORM;
      const eased = t * t * t * t;
      targetIntensity = 0.3 + eased * 0.7;
      targetScaleFactor = 0.18 + eased * 0.62;
    } else if (phaseTime.current < FORM + EXPAND) {
      const t = (phaseTime.current - FORM) / EXPAND;
      const eased = 1 - Math.pow(1 - t, 3);
      targetIntensity = 1;
      targetScaleFactor = 0.85 + eased * 1.35;
    } else {
      targetIntensity = 1;
      targetScaleFactor = 2.2;
    }

    intensity.current = THREE.MathUtils.lerp(intensity.current, targetIntensity, 0.07);
    portalScale.current = THREE.MathUtils.lerp(portalScale.current, targetScaleFactor, 0.05);

    if (state.clock.elapsedTime > nextSurge.current) {
      surge.current = 1;
      nextSurge.current = state.clock.elapsedTime + 3.0 + Math.random() * 3.5;
    }
    surge.current = Math.max(0, surge.current - delta * 1.0);

    ringRefs.current.forEach((ref, i) => {
      if (ref) ref.rotation.z += delta * (0.35 + i * 0.18) * (0.5 + intensity.current * 0.7);
    });

    const updateParticles = (data, gravity, drag, turbulence, heatBias) => {
      const pos = data.positions;
      const vel = data.velocities;
      const ages = data.ages;
      const lifetimes = data.lifetimes;
      const colors = data.colors;
      const layers = data.layers;

      for (let i = 0; i < ages.length; i++) {
        ages[i] += delta;
        const idx = i * 3;

        vel[idx + 1] -= gravity * delta;
        vel[idx] *= 1 - drag * delta;
        vel[idx + 1] *= 1 - drag * delta;
        vel[idx + 2] *= 1 - drag * delta;

        vel[idx] += Math.sin(state.clock.elapsedTime * 4 + i) * turbulence * delta;
        vel[idx + 1] += Math.cos(state.clock.elapsedTime * 3 + i * 0.5) * turbulence * delta;

        pos[idx] += vel[idx] * delta;
        pos[idx + 1] += vel[idx + 1] * delta;
        pos[idx + 2] += vel[idx + 2] * delta;

        const life = ages[i] / lifetimes[i];
        if (life > 1) {
          const layer = layers[i];
          const angle = Math.random() * Math.PI * 2;
          const radius = EDGE_BASE_RADIUS + (Math.random() - 0.5) * 0.9 + layer * 0.18;
          const speed = 1.4 + Math.random() * 2.5 + surge.current * 1.8;
          const tangential = new THREE.Vector2(-Math.sin(angle), Math.cos(angle));
          const outward = new THREE.Vector2(Math.cos(angle), Math.sin(angle));
          pos[idx] = Math.cos(angle) * radius;
          pos[idx + 1] = Math.sin(angle) * radius;
          pos[idx + 2] = (Math.random() - 0.5) * 0.2;
          vel[idx] = tangential.x * speed + outward.x * (0.5 + Math.random() * 0.4);
          vel[idx + 1] = tangential.y * speed + outward.y * (0.5 + Math.random() * 0.4);
          vel[idx + 2] = (Math.random() - 0.5) * 0.2;
          ages[i] = 0;
          lifetimes[i] = 0.7 + Math.random() * 1.6;
        }

        let c = COLOR_WHITE;
        if (life < 0.2) {
          c = COLOR_WHITE.clone().lerp(COLOR_YELLOW, life / 0.2);
        } else if (life < 0.5) {
          c = COLOR_YELLOW.clone().lerp(COLOR_ORANGE, (life - 0.2) / 0.3);
        } else if (life < 0.8) {
          c = COLOR_ORANGE.clone().lerp(COLOR_RED, (life - 0.5) / 0.3);
        } else {
          c = COLOR_RED.clone().lerp(COLOR_DARK, (life - 0.8) / 0.2);
        }

        const heat = 0.7 + heatBias + surge.current * 0.4;
        colors[idx] = c.r * heat;
        colors[idx + 1] = c.g * heat;
        colors[idx + 2] = c.b * heat;
      }
    };

    updateParticles(sparks, 1.3, 0.1, 0.35, 0.2);
    updateParticles(embers, 2.0, 0.14, 0.25, 0.0);

    if (sparkRef.current) {
      sparkRef.current.geometry.attributes.position.needsUpdate = true;
      sparkRef.current.geometry.attributes.color.needsUpdate = true;
    }
    if (emberRef.current) {
      emberRef.current.geometry.attributes.position.needsUpdate = true;
      emberRef.current.geometry.attributes.color.needsUpdate = true;
    }

    if (streakRef.current) {
      const pos = streaks.positions;
      const dirs = streaks.dirs;
      const surgeLen = 1.0 + surge.current * 2.4;
      for (let i = 0; i < dirs.length / 2; i++) {
        const dx = dirs[i * 2];
        const dy = dirs[i * 2 + 1];
        const base = EDGE_BASE_RADIUS - 0.1;
        const length = surgeLen + Math.sin(state.clock.elapsedTime * 8 + i) * 0.2;
        pos[i * 6] = dx * base;
        pos[i * 6 + 1] = dy * base;
        pos[i * 6 + 2] = 0;
        pos[i * 6 + 3] = dx * (base + length);
        pos[i * 6 + 4] = dy * (base + length);
        pos[i * 6 + 5] = 0;
      }
      streakRef.current.geometry.attributes.position.needsUpdate = true;
    }

    if (innerRef.current) {
      innerUniforms.uTime.value = state.clock.elapsedTime;
      innerUniforms.uIntensity.value = intensity.current;
      innerUniforms.uParallax.value.set(camera.position.x * 0.02, camera.position.y * 0.02);
    }

    if (lightRef.current) {
      lightRef.current.intensity = 18 + intensity.current * 16 + surge.current * 12;
    }

    if (groupRef.current) {
      const baseRadius = 4.0;
      const targetRadius = Math.max(viewport.width, viewport.height) * 0.5;
      const fullScreenScale = targetRadius / baseRadius;
      const appliedScale = (fullScreen ? fullScreenScale : scale) * portalScale.current;
      groupRef.current.scale.setScalar(appliedScale);
    }
  });

  const innerMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: innerUniforms,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float uTime;
          uniform float uIntensity;
          uniform vec2 uParallax;
          varying vec2 vUv;

          float hash(vec2 p) {
            return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
          }

          void main() {
            vec2 uv = vUv * 2.0 - 1.0;
            uv += uParallax;
            float r = length(uv);
            float a = atan(uv.y, uv.x);
            float swirl = a + uTime * 0.5 + r * 2.4;
            float distort = sin(r * 10.0 - uTime * 3.0 + a * 4.0) * 0.04;
            vec2 warped = vec2(cos(swirl), sin(swirl)) * (r + distort);

            float noise = hash(warped * 3.0 + uTime * 0.2);
            float core = smoothstep(0.0, 0.65, 1.0 - r);
            float edge = smoothstep(0.7, 0.98, r);

            vec3 col = vec3(0.06, 0.02, 0.02);
            col += vec3(0.3, 0.15, 0.35) * noise;
            col += vec3(1.0, 0.6, 0.2) * core * 0.25;
            col *= (1.0 - edge * 0.85);

            float alpha = (1.0 - smoothstep(0.92, 1.0, r)) * 0.75 * uIntensity;
            gl_FragColor = vec4(col, alpha);
          }
        `,
      }),
    [innerUniforms]
  );

  return (
    <group ref={groupRef} position={position}>
      <pointLight ref={lightRef} color={COLOR_ORANGE} distance={30} />

      {ringGeometries.map((geo, i) => (
        <lineSegments key={`ring-${i}`} ref={(el) => (ringRefs.current[i] = el)}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" count={geo.length / 3} array={geo} itemSize={3} />
          </bufferGeometry>
          <lineBasicMaterial
            color={i === 0 ? "#ffd6a1" : "#ff8a2a"}
            transparent
            opacity={0.85}
            blending={THREE.AdditiveBlending}
          />
        </lineSegments>
      ))}

      <lineSegments ref={streakRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={streaks.positions.length / 3}
            array={streaks.positions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#fff1c9"
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      <points ref={sparkRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={sparks.positions.length / 3}
            array={sparks.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={sparks.colors.length / 3}
            array={sparks.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.07}
          vertexColors
          transparent
          opacity={0.95}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      <points ref={emberRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={embers.positions.length / 3}
            array={embers.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={embers.colors.length / 3}
            array={embers.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          vertexColors
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      <mesh ref={innerRef}>
        <circleGeometry args={[EDGE_BASE_RADIUS - 0.35, 96]} />
        <primitive object={innerMaterial} attach="material" />
      </mesh>

      <mesh position={[0, 0, -0.02]}>
        <circleGeometry args={[EDGE_BASE_RADIUS - 0.1, 96]} />
        <meshBasicMaterial
          color="#2a0f08"
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

export default DrStrangePortal;