import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const Earth = () => {
  return (
    <Sphere args={[1, 32, 32]} position={[0, 0, 0]}>
      <meshStandardMaterial 
        color="#00B4D8" 
        emissive="#0077B6"
        emissiveIntensity={0.2}
      />
    </Sphere>
  );
};

const AsteroidOrbitPath = ({ asteroid, index }) => {
  const orbitRef = useRef();
  const asteroidRef = useRef();

  // Calculate orbit parameters from close approach distance
  const closeApproach = asteroid.close_approach_data || {};
  const missDistance = closeApproach.miss_distance || {};
  const distanceAU = parseFloat(missDistance.astronomical || (0.5 + Math.random() * 2));
  
  // Convert AU to scene units (1 AU = 5 units in our scene)
  const orbitRadius = distanceAU * 5;
  const orbitSpeed = 0.5 / orbitRadius; // Closer orbits move faster

  // Create orbit path
  useEffect(() => {
    if (orbitRef.current) {
      const curve = new THREE.EllipseCurve(
        0, 0,
        orbitRadius, orbitRadius * 0.9, // Slight ellipse
        0, 2 * Math.PI,
        false,
        0
      );
      const points = curve.getPoints(100);
      const geometry = new THREE.BufferGeometry().setFromPoints(
        points.map(p => new THREE.Vector3(p.x, 0, p.y))
      );
      orbitRef.current.geometry = geometry;
    }
  }, [orbitRadius]);

  // Animate asteroid
  useFrame(({ clock }) => {
    if (asteroidRef.current) {
      const t = clock.getElapsedTime() * orbitSpeed + index * 0.5;
      asteroidRef.current.position.x = Math.cos(t) * orbitRadius;
      asteroidRef.current.position.z = Math.sin(t) * orbitRadius * 0.9;
    }
  });

  const isHazardous = asteroid.is_potentially_hazardous;
  const asteroidColor = isHazardous ? '#EF4444' : '#90E0EF';
  const asteroidSize = Math.log(parseFloat(asteroid.estimated_diameter?.estimated_diameter_min || 100) + 1) * 0.05;

  return (
    <group>
      {/* Orbit path */}
      <line ref={orbitRef}>
        <lineBasicMaterial 
          color={isHazardous ? '#F97316' : '#00B4D8'} 
          opacity={0.3} 
          transparent 
        />
      </line>
      
      {/* Asteroid */}
      <Sphere 
        ref={asteroidRef} 
        args={[asteroidSize, 16, 16]}
      >
        <meshStandardMaterial 
          color={asteroidColor}
          emissive={asteroidColor}
          emissiveIntensity={0.5}
        />
      </Sphere>
    </group>
  );
};

const Scene = ({ asteroids }) => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 0]} intensity={1} color="#ffffff" />
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      
      {/* Earth */}
      <Earth />
      
      {/* Asteroid orbits */}
      {asteroids.slice(0, 10).map((asteroid, index) => (
        <AsteroidOrbitPath key={asteroid.id || index} asteroid={asteroid} index={index} />
      ))}
      
      <OrbitControls 
        enableZoom={true} 
        enablePan={true} 
        enableRotate={true}
        minDistance={3}
        maxDistance={50}
      />
    </>
  );
};

const AsteroidOrbit = ({ asteroids }) => {
  return (
    <div style={{ width: '100%', height: '500px', borderRadius: '16px', overflow: 'hidden' }}>
      <Canvas
        camera={{ position: [0, 15, 20], fov: 60 }}
        style={{ background: 'linear-gradient(135deg, #0A2463 0%, #1A1A2E 100%)' }}
      >
        <Scene asteroids={asteroids} />
      </Canvas>
      <div style={{ 
        marginTop: '1rem', 
        padding: '1rem', 
        background: 'rgba(255, 255, 255, 0.1)', 
        borderRadius: '12px',
        color: 'white',
        textAlign: 'center'
      }}>
        <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.8 }}>
          🖱️ Use mouse to rotate | Scroll to zoom | Right-click to pan
        </p>
        <p style={{ margin: '0.5rem 0 0', fontSize: '0.85rem', opacity: 0.7 }}>
          <span style={{ color: '#EF4444' }}>● Potentially Hazardous</span> | 
          <span style={{ color: '#90E0EF', marginLeft: '1rem' }}>● Safe</span>
        </p>
      </div>
    </div>
  );
};

export default AsteroidOrbit;
