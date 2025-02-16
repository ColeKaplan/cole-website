'use client'
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { Water } from 'three/examples/jsm/objects/Water.js';




const WaterComponent = () => {
  const waterRef = useRef();
  const waterNormals = useTexture('/games/BoyMoon/waternormals.jpg', (texture) => {
    (texture as THREE.Texture).wrapS = (texture as THREE.Texture).wrapT = THREE.RepeatWrapping;
  });

  useEffect(() => {
    if (waterRef.current) {
      if ((waterRef.current as any) && (waterRef.current as any).material && (waterRef.current as any).material.uniforms && (waterRef.current as any).material.uniforms['time']) {
        (waterRef.current as any).material.uniforms['time'].value = 0;
      }
    }
  }, []);

  useFrame(() => {
    if (waterRef.current) {
      if ((waterRef.current as any) && (waterRef.current as any).material && (waterRef.current as any).material.uniforms && (waterRef.current as any).material.uniforms['time']) {
        (waterRef.current as any).material.uniforms['time'].value += 1.0 / 60.0;
      }
    }
  });

  return (
    <primitive
      ref={waterRef}
      object={
        new Water(new THREE.PlaneGeometry(10000, 10000), {
          textureWidth: 512,
          textureHeight: 512,
          waterNormals: waterNormals,
          waterColor: 0x004f5a,
          distortionScale: 3.7,
          fog: false,
        })
      }
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -5, 0]}
    />
  );
};

export const Scene = () => {
  const [model, setModel] = useState<THREE.Group | null>(null);

  useEffect(() => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const renderer = new THREE.WebGLRenderer({ canvas });
      renderer.setClearColor(0x000000); // Set background to black
    }
  }, []);

  useEffect(() => {
    const mtlLoader = new MTLLoader();
    mtlLoader.load('/games/BoyMoon/boy_moon.mtl', (materials) => {
      materials.preload();
      const objLoader = new OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.load('/games/BoyMoon/boy_moon.obj', (obj) => {
        obj.scale.set(0.02, 0.02, 0.02);
        obj.rotation.x = Math.PI / 2;
        obj.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material.emissive.set(0x000000);
            child.material.color.set(0x888888);
            child.material.specular.set(0x000000);
            child.material.shininess = 1000;
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        setModel(() => obj);
      });
    });
  }, []);


  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight color={0x777777} intensity={1} position={[9, 3, 9]} distance={20} decay={4} />
      <pointLight color={0xaaaaaa} intensity={1} position={[0, 2, 1.2]} distance={20} decay={4} />
      <OrbitControls minDistance={10} maxDistance={30} minPolarAngle={Math.PI / 4} maxPolarAngle={(2.5 * Math.PI) / 4} enablePan={false} minAzimuthAngle={-Math.PI * .3} maxAzimuthAngle={Math.PI * .3} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {/* Water */}
      <WaterComponent />
      
      {/* Model */}
      {model && <primitive object={model} />}
    </>
  );
};

const BoyMoonComponent = () => {
  
  // const scene = new THREE.Scene();
  // scene.background = new THREE.Color(0x111111); // Set background color to black

  return (
    <Canvas camera={{ position: [-3, 2, 8], fov: 75 }} shadows>
      <Scene />
    </Canvas>
  );
};

export default BoyMoonComponent;
