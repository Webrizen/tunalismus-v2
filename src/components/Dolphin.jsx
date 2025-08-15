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
  // NEW (optional)
  positionOverride = null,   // [x,y,z] to directly set position
  rotationOverride = null,   // [rx,ry,rz] to directly set rotation
  ...props
}) {
  const group = useRef();
  const { scene, animations } = useGLTF(modelPath);
  const mixer = useRef();

  useEffect(() => {
    if (animations.length) {
      mixer.current = new THREE.AnimationMixer(scene);
      animations.forEach((clip) => mixer.current.clipAction(clip).play());
    }
  }, [animations, scene]);

  useFrame((_, delta) => {
    if (mixer.current) mixer.current.update(delta);
    if (!group.current) return;

    // ---- POSITION ----
    if (positionOverride) {
      const [x, y, z] = positionOverride;
      group.current.position.set(x, y, z);
    } else {
      group.current.position.lerpVectors(
        new THREE.Vector3(...startPosition),
        new THREE.Vector3(...endPosition),
        scrollProgress
      );
    }

    // ---- ROTATION ----
    if (rotationOverride) {
      const [rx, ry, rz] = rotationOverride;
      group.current.rotation.set(rx, ry, rz);
    } else {
      const rotStart = new THREE.Euler(...startRotation);
      const rotEnd = new THREE.Euler(...endRotation);
      group.current.rotation.set(
        THREE.MathUtils.lerp(rotStart.x, rotEnd.x, scrollProgress),
        THREE.MathUtils.lerp(rotStart.y, rotEnd.y, scrollProgress),
        THREE.MathUtils.lerp(rotStart.z, rotEnd.z, scrollProgress)
      );
    }

    // Keep your tilt on top of either path
    group.current.rotation.z += Math.sin(scrollProgress * Math.PI) * tiltAmount;
  });

  return <primitive ref={group} object={scene} {...props} />;
}
