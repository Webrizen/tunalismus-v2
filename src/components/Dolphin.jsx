// src/components/Dolphin.jsx
import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

export default function Dolphin({
  modelPath = "/cute_whale.glb",
  scrollProgress = 0,
  startPosition = [0, 0, 0],
  endPosition = [0, 0, 0],
  startRotation = [0, 0, 0],
  endRotation = [0, 0, 0],
  tiltAmount = 0.2,
  ...props
}) {
  const group = useRef();
  const { scene, animations } = useGLTF(modelPath);
  const mixer = useRef();

  

  useEffect(() => {
    if (animations.length) {
      mixer.current = new THREE.AnimationMixer(scene);
      animations.forEach((clip) => {
        mixer.current.clipAction(clip).play();
      });
    }
  }, [animations, scene]);

  useFrame((_, delta) => {
    if (mixer.current) mixer.current.update(delta);

    if (group.current) {
      // Interpolate position
      group.current.position.lerpVectors(
        new THREE.Vector3(...startPosition),
        new THREE.Vector3(...endPosition),
        scrollProgress
      );

      // Interpolate rotation
      const rotStart = new THREE.Euler(...startRotation);
      const rotEnd = new THREE.Euler(...endRotation);
      group.current.rotation.set(
        THREE.MathUtils.lerp(rotStart.x, rotEnd.x, scrollProgress),
        THREE.MathUtils.lerp(rotStart.y, rotEnd.y, scrollProgress),
        THREE.MathUtils.lerp(rotStart.z, rotEnd.z, scrollProgress)
      );

      // Add tilt
      group.current.rotation.z += Math.sin(scrollProgress * Math.PI) * tiltAmount;
    }
  });

  return <primitive ref={group} object={scene} {...props} />;
}
