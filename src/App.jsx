import React, { useState, useEffect } from 'react';
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import Dolphin from './components/Dolphin';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const secondSection = document.getElementById("second-section");
      if (secondSection) {
        const rect = secondSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        let progress = 0;
        if (rect.top < windowHeight && rect.bottom > 0) {
          progress = 1 - rect.top / windowHeight;
          progress = Math.max(0, Math.min(progress, 1));
        }
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className='relative'>
      <div className='fixed w-full h-full pointer-events-none z-10'>
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }} shadows>
          <Environment preset="city" />
          <Dolphin
            modelPath="/cute_whale.glb"
            scrollProgress={scrollProgress}
            startPosition={[0, -0.6, 1]}
            endPosition={[2, 1, -1]}
            startRotation={[0, 0, 0]}
            endRotation={[0, Math.PI, 0]}
            tiltAmount={1.15}
            scale={0.8}
          />
        </Canvas>
      </div>

      {/* First Section */}
      <div className="w-full p-5 transition-all duration-500 ease-in-out"
        style={{
          padding: `${20 - scrollProgress * 20}px`,
        }}
      >
        <section className="relative h-[95vh] rounded-4xl bg-[var(--color-muted-green)] overflow-hidden">
          <img src="/bg.png" alt="Background" className="absolute w-full h-full object-cover rounded-4xl blur-md z-0 border-0" />
          <div className="container mx-auto px-4 md:py-32 py-28 relative z-50">
            <h1 className="text-3xl md:text-[9rem] font-bold text-center mb-6 text-[var(--color-warm-gray)] uppercase">
              Learn Languages the Human Way.
            </h1>
            <p className="text-lg md:text-[2rem] text-center text-[var(--color-warm-gray)]">
              Join our community and start your language learning journey today!
            </p>
          </div>
          <div className="w-[300px] h-12 px-6 bg-[var(--color-warm-gray)] rounded-t-full font-bold text-center text-[var(--color-muted-green)] flex items-end justify-center bottom-0 mx-auto absolute left-0 right-0">
            Connect via love of language
          </div>
        </section>
      </div>

      {/* Second Section */}
      <section id="second-section" className="min-h-screen w-full">
        <div className="container mx-auto px-4 md:py-32 relative">
          <h2 className="text-2xl md:text-[6rem] font-bold text-center mb-6 text-[var(--color-soft-blue)] invert">
            Join Our Community
          </h2>
          <p className="text-lg md:text-[2rem] text-center text-[var(--color-warm-gray)]">
            Connect with fellow language learners and share your journey!
          </p>
        </div>
      </section>
    </main>
  );
}
