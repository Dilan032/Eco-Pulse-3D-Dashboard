import './app.css';
import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture, Stars, Html } from "@react-three/drei";

function EarthModel() {
  const earthRef = useRef();
  const cloudRef = useRef();
  const cloudMatRef = useRef();

  const [earthMap, cloudMap] = useTexture([
    "./earth.jpg",
    "./clouds.png"
  ]);

  earthMap.anisotropy = 16;

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    const cameraDistance = state.camera.position.distanceTo(state.scene.position);

    if (earthRef.current) {
      earthRef.current.rotation.y = time * 0.02;
    }
    if (cloudRef.current && cloudMatRef.current) {
      cloudRef.current.rotation.y = time * 0.05;

      if (cameraDistance < 3) {
        const newOpacity = Math.max(0, (cameraDistance - 2.6) / (2.2 - 2.6) * 0.4);
        cloudMatRef.current.opacity = newOpacity;
      } else {
        cloudMatRef.current.opacity = 0.4;
      }
    }
  });

  return (
    <group>
      <mesh ref={earthRef}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial
          map={earthMap}
          roughness={0.7}
          metalness={0.4}
        />
      </mesh>

      <mesh ref={cloudRef} scale={1.02}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial
          ref={cloudMatRef}
          map={cloudMap}
          transparent={true}
          opacity={0.3}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

export default function Scene() {
  return (
    <div style={{ width: "100%", height: "100vh", backgroundColor: "#000" }}>
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>

        <ambientLight intensity={3} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <directionalLight position={[-5, 3, 5]} intensity={2.5} />

        <Stars radius={300} depth={70} count={20000} factor={7} saturation={0} fade speed={1} />

        <Suspense fallback={<Html center style={{ color: "white" }}>Loading Earth...</Html>}>
          <EarthModel />
        </Suspense>

        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={2.6}
          maxDistance={10}
        />
      </Canvas>
    </div>
  );
}