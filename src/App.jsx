import './app.css';
import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, OrbitControls, useTexture, Stars, Html } from "@react-three/drei";

function EarthModel() {
  // 1. useRef: මේකෙන් අපි 3D object එක අල්ලගන්නවා (හඳුනාගන්නවා)
  const earthRef = useRef();

  // Texture එක load කරගැනීම
  // මෙතනදී අපි අන්තර්ජාලයෙන් රූපය අපේ code එකට ගේනවා
  const [earthMap] = useTexture([
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg"
  ]);

  // 2. useFrame: මේක තමයි අපේ animation loop එක. තත්පරයට 60 වතාවක් මේක ඇතුලේ තියෙන දේ සිද්ද වෙනවා.
  useFrame(() => {
    if (earthRef.current) {
      // Y අක්ෂය වටා පොඩ්ඩ පොඩ්ඩ කැරකෙන්න (Rotation)
      earthRef.current.rotation.y += 0.002;
    }
  });

  return (
    // 3. mesh: මේක තමයි 3D object එකක "ඇඟ". මේකට හැඩයක් (geometry) සහ පෙනුමක් (material) තියෙන්න ඕනේ.
    <mesh ref={earthRef}>
      {/* sphereGeometry: ගෝලාකාර හැඩය. [අරය, කොටස් ගණන, කොටස් ගණන] */}
      {/* <sphereGeometry args={[1.5, 32, 32]} /> */}
      <sphereGeometry args={[1.5, 64, 64]} /> {/* 64 දැම්මේ බෝලය වඩාත් සිනිඳු (Smooth) වෙන්න */}

      {/* meshStandardMaterial: මෙයා තමයි object එකේ පාට සහ ආලෝකය පාලනය කරන්නේ */}
      {/* <meshStandardMaterial color="#2277ff" wireframe />  */}
      <meshStandardMaterial map={earthMap} metalness={0.1} roughness={0.5}/>
    </mesh>
  );
}

export default function Scene() {
  return (
    <div style={{ width: "100%", height: "100vh", backgroundColor: "#050505" }}>
      {/* 4. Canvas: මේක තමයි අපේ 3D ලෝකය පටන් ගන්න තැන. මේක නැතුව 3D පේන්නේ නැහැ. */}
      <Canvas camera={{ position: [0, 0, 4] }}> {/* Camera එක පොඩ්ඩක් පස්සට කළා */}
        {/* 5. ambientLight: හැමතැනටම සමානව වැටෙන එළියක් */}
        <ambientLight intensity={1.5} />

        {/* 6. pointLight: එක තැනක ඉඳන් වැටෙන විදුලි බුබුලක් වගේ එළියක් */}
        <pointLight position={[5, 5, 5]} intensity={2} />

        {/* Directional Light - ඉර පායලා වගේ එක පැත්තකින් තද එළියක් දෙන්න */}
        <directionalLight position={[-2, 5, 2]} intensity={1} />

        {/* අහසේ තරු පෙන්වන්න (Drei වල තියෙන සුපිරි පහසුකමක්) */}
        <Stars radius={200} depth={70} count={6000} factor={5} saturation={0} fade speed={2} />

        {/* 2. මෙන්න මෙතනට Suspense එකතු කරන්න */}
        <Suspense fallback={<Html center style={{ color: "white" }}>Loading Earth...</Html>}>
          <EarthModel />
        </Suspense>

        {/* 7. OrbitControls: මේක දැම්මම ඔයාට mouse එකෙන් පෘථිවිය කරකවලා බලන්න පුළුවන් */}
        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  );
}