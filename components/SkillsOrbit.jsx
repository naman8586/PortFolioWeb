"use client";
import { useRef, useEffect, useState, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Float, Center } from "@react-three/drei";

function WordCloud({ isMobile }) {
  const skills = useMemo(
    () => [
      "React.js",
      "Node.js",
      "Python",
      "Next.js",
      "TailwindCSS",
      "MongoDB",
      "TypeScript",
      "Flask",
      "SQL",
      "Selenium",
      "Java",
      "Prisma",
    ],
    []
  );

  const radius = isMobile ? 3.5 : 5;

  return skills.map((word, i) => {
    const phi = Math.acos(-1 + (2 * i) / skills.length);
    const theta = Math.sqrt(skills.length * Math.PI) * phi;

    const x = radius * Math.cos(theta) * Math.sin(phi);
    const y = radius * Math.sin(theta) * Math.sin(phi);
    const z = radius * Math.cos(phi);

    return (
      <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Text
          position={[x, y, z]}
          fontSize={isMobile ? 0.3 : 0.4}
          color="white"
          anchorX="center"
          anchorY="middle"
          fillOpacity={0.8}
        >
          {word}
        </Text>
      </Float>
    );
  });
}

function RotatingGroup({ children }) {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.12;
    ref.current.rotation.x = Math.sin(t * 0.1) * 0.1;
  });

  return <group ref={ref}>{children}</group>;
}

export default function SkillsSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
      id="skills"
      className="relative h-175 w-full overflow-hidden bg-transparent py-20 flex flex-col items-center justify-center"
    >
      {/* Heading */}
      <div className="relative z-10 mb-auto text-center pointer-events-none">
        <h2 className="text-6xl md:text-8xl font-bold uppercase tracking-tighter text-white opacity-90">
          Stack <span className="font-light italic text-zinc-700">&</span> Tech
        </h2>
        <div className="mx-auto mt-6 h-px w-24 bg-linear-to-r from-transparent via-zinc-500 to-transparent" />
        <p className="mt-6 text-[10px] font-medium uppercase tracking-[0.6em] text-zinc-500">
          Orbital Knowledge Base
        </p>
      </div>

      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing">
        <Canvas
          camera={{ position: [0, 0, isMobile ? 12 : 14], fov: 35 }}
          dpr={[1, 2]}
          gl={{ alpha: true, antialias: true }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.8} />
            <pointLight position={[10, 10, 10]} intensity={2.5} />
            <RotatingGroup>
              <Center>
                <WordCloud isMobile={isMobile} />
              </Center>
            </RotatingGroup>
          </Suspense>
        </Canvas>
      </div>

      {/* Grounding Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
    </section>
  );
}
