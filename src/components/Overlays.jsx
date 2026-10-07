import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
  return <motion.div aria-hidden="true" className="fixed left-0 right-0 top-0 z-[140] h-[3px] origin-left bg-brand" style={{ scaleX }} />;
}

/** Fine film grain over the whole page. */
export function Grain() {
  return (
    <svg aria-hidden="true" className="pointer-events-none fixed inset-0 z-[130] h-full w-full opacity-[0.07] mix-blend-overlay">
      <filter id="realm-grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#realm-grain)" />
    </svg>
  );
}
