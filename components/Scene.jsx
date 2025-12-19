"use client";
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function StarField() {
  const ref = useRef();
  // Generate 3000 random points for stars
  const [positions] = useState(() => {
    const pos = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000 * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 10;
    }
    return pos;
  });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta / 20;
      ref.current.rotation.y += delta / 25;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

export default function Scene() {
  return (
    <div className="fixed inset-0 -z-10 bg-[#030303]">
      <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 2]}>
        <StarField />
      </Canvas>
    </div>
  );
}