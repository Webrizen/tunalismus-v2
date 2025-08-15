import React, { useState, useEffect } from 'react';
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import Dolphin from './components/Dolphin';
import HorizontalScrollCarousel from './components/HorizontalScrollCarousel';

export default function App() {
const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      setScrollProgress(Math.max(0, Math.min(1, p)));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Easing for smoothness
  const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const lerp = (a, b, t) => a + (b - a) * t;

  // ⬇️ Keyframes: edit these to place the whale for each phase/section
  // x: left(-) / right(+), y: up(+)/down(-), z: depth (smaller negative = closer to camera behind? depends on your scene)
  const KF = [
    { pos: [ 0.0, -0.6,  1.0], rot: [0, 0.00 * Math.PI, 0] },  // start (section 1 center-ish)
    { pos: [ 2.0,  1.0, -1.0], rot: [0, 1.90 * Math.PI, 0] },  // move to right as we exit section 1
    { pos: [ 0.0,  0.6, -1.0], rot: [0, 1.00 * Math.PI, 0] },  // center while in section 2
    { pos: [-2.0,  1.0, -1.0], rot: [0, 1.50 * Math.PI, 0] },  // left later in section 2
    { pos: [ 0.0,  0.2,  0.5], rot: [0, 2.00 * Math.PI, 0] },  // center again in section 3
  ];

  // Compute piecewise position/rotation along keyframes
  const segs = KF.length - 1;
  const scaled = scrollProgress * segs;
  const i = Math.max(0, Math.min(segs - 1, Math.floor(scaled)));
  const tLocal = easeInOut(scaled - i);
  const from = KF[i];
  const to   = KF[i + 1];

  const positionOverride = [
    lerp(from.pos[0], to.pos[0], tLocal),
    lerp(from.pos[1], to.pos[1], tLocal),
    lerp(from.pos[2], to.pos[2], tLocal),
  ];
  const rotationOverride = [
    lerp(from.rot[0], to.rot[0], tLocal),
    lerp(from.rot[1], to.rot[1], tLocal),
    lerp(from.rot[2], to.rot[2], tLocal),
  ];

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
            positionOverride={positionOverride}
            rotationOverride={rotationOverride}
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
      <section className="py-20 overflow-hidden" id="second-section">
        <div className="container mx-auto px-5 sm:px-10 md:px-12 lg:px-5 relative z-50">
          {/* Decorative elements */}
          <div className="absolute left-0 w-1/3 h-[600px] bg-[var(--color-soft-blue)] opacity-5 -z-10 rounded-full blur-3xl" />
          <div className="absolute right-0 top-1/4 w-1/4 h-[400px] bg-[var(--color-muted-green)] opacity-5 -z-10 rounded-full blur-3xl" />

          <div className="flex flex-col lg:flex-row gap-12 xl:gap-20 items-center">
            {/* Text content with creative layout */}
            <div className="flex-1 space-y-8 relative">
              <div className="relative">
                <h2 className="text-4xl md:text-7xl lg:text-[5.5rem] font-bold text-[var(--color-muted-green)] leading-tight">
                  <span className="block mb-2">About Us</span>
                  <span className="block pl-8">A story untold.</span>
                </h2>
                <div className="absolute left-0 top-1/2 w-16 h-1 bg-[var(--color-dusty-rose)] transform -translate-y-1/2" />
              </div>

              <div className="space-y-8 max-w-2xl">
                <div className="relative pl-8 border-l-4 border-[var(--color-soft-blue)]">
                  <p className="text-xl md:text-2xl italic text-zinc-700 mb-6 leading-relaxed">
                    At Tunalismus, language learning is about more than memorizing grammar, it's about building <span className="font-semibold text-[var(--color-muted-green)]">real human connections</span>.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-2xl border border-zinc-100">
                    <h3 className="text-xl font-bold text-[var(--color-muted-green)] mb-3">Our Story</h3>
                    <p className="text-zinc-700">
                      Founded by Sema in Hyderabad, Tunalismus began with a simple belief: languages are bridges to other cultures and to parts of yourself.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-zinc-100">
                    <h3 className="text-xl font-bold text-[var(--color-muted-green)] mb-3">Our Approach</h3>
                    <p className="text-zinc-700">
                      We create safe spaces where you can explore languages naturally, focusing on being heard rather than just speaking.
                    </p>
                  </div>
                </div>

                <div className="bg-[var(--color-warm-gray)] bg-opacity-10 p-6 rounded-2xl">
                  <h3 className="text-xl font-bold text-[var(--color-muted-green)] mb-4">Our Philosophy</h3>
                  <ul className="space-y-4">
                    {[
                      {
                        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                        </svg>
                        , title: 'Listen', text: 'Every learner\'s journey is unique'
                      },
                      {
                        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                        </svg>
                        , title: 'Guide', text: 'Support with modern teaching infused with kindness'
                      },
                      {
                        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z" />
                        </svg>
                        , title: 'Adapt', text: 'Your pace and story shape every lesson'
                      }
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-4">
                        <span className="text-2xl">{item.icon}</span>
                        <div>
                          <span className="font-semibold text-[var(--color-muted-green)]">{item.title}.</span> {item.text}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Image with creative frame */}
            <div className="w-full lg:w-1/2 xl:w-[45%] relative">
              <div className="relative group">
                {/* Decorative frame */}
                <div className="absolute -inset-4 bg-gradient-to-br from-[var(--color-soft-blue)] to-[var(--color-muted-green)] rounded-3xl opacity-20 group-hover:opacity-30 transition-all duration-500" />
                <div className="absolute -inset-2 border-2 border-[var(--color-dusty-rose)] border-opacity-30 rounded-3xl group-hover:border-opacity-50 transition-all duration-500" />

                {/* Image with hover effect */}
                <img
                  src="https://flexiwind.vercel.app/prev/images/woman-with-gro.webp"
                  alt="Founder Sema teaching"
                  className="relative z-10 w-full h-auto rounded-2xl transform group-hover:-translate-y-2 transition-all duration-500 shadow-xl"
                />

                {/* Floating badge */}
                <div className="absolute -bottom-6 -right-6 bg-[var(--color-dusty-rose)] text-white px-6 py-3 rounded-full shadow-lg z-20">
                  <span className="font-bold">Sema, Founder</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="min-h-screen w-full bg-[var(--color-dusty-rose)] rounded-b-full">
        <div className="container mx-auto px-4 md:pt-32 pt-28 relative">
          <h2 className="text-2xl md:text-[6rem] font-bold text-center mb-6 text-[var(--color-muted-green)]">
            Course Offerings
          </h2>
          <p className="text-lg md:text-[2rem] text-center text-[var(--color-warm-gray)]">
            Explore our range of language courses designed to connect you with cultures and people.
          </p>
          <HorizontalScrollCarousel />
        </div>
      </section>
    </main>
  );
}
