import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { motion } from 'framer-motion';

function App() {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      {/* The Canvas is where all 3D magic happens */}
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
        {/* Stage provides lighting and a background for product showcases */}
        <Stage environment="city" intensity={0.5}>
          {/* We'll place our 3D object here */}
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="hotpink" />
          </mesh>
        </Stage>
        {/* OrbitControls lets users interact with the camera */}
        <OrbitControls enableZoom enablePan />
      </Canvas>

      {/* UI overlay with framer-motion */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          background: 'white',
          padding: '1rem',
          borderRadius: '8px',
          fontFamily: 'sans-serif',
        }}
      >
        <h3>3D Product Viewer</h3>
        <p>Rotate and zoom to explore</p>
      </motion.div>
    </div>
  );
}

export default App;