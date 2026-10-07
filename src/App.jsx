import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { Analytics } from '@vercel/analytics/next';
import Lenis from "lenis";
import Preloader from "./components/Preloader.jsx";
import Cursor from "./components/Cursor.jsx";
import { Grain, ScrollProgress } from "./components/Overlays.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Talents from "./components/Talents.jsx";
import Benefits from "./components/Benefits.jsx";
import Marquee from "./components/Marquee.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import Contact from "./components/Contact.jsx";
import { lockScroll, setLenis, unlockScroll } from "./lib/scroll.js";

export default function App() {
  const [loading, setLoading] = useState(true);
  const done = useCallback(() => setLoading(false), []);

  // Smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9 });
    setLenis(lenis);
    lenis.stop(); // locked until the preloader finishes
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  useEffect(() => {
    loading ? lockScroll() : unlockScroll();
  }, [loading]);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>{loading && <Preloader key="pre" onDone={done} />}</AnimatePresence>

      <Cursor />
      <Grain />
      <ScrollProgress />
      <Navbar ready={!loading} />

      <main>
        <Hero ready={!loading} />
        <Talents />
        <Benefits />
        <Marquee />
        <HowItWorks />
        <Contact />
        <Analytics />
      </main>
    </MotionConfig>
  );
}
