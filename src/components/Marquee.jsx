import { useRef } from "react";
import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
import { Sparkle } from "./Icons.jsx";
import { MARQUEE } from "../data.js";

const wrap = (min, max, v) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/** Infinite marquee that speeds up (and flips direction) with scroll velocity. */
function Row({ speed = -3, outline = false }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 5], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);
  const dir = useRef(1);

  useAnimationFrame((_, delta) => {
    let move = dir.current * speed * (delta / 1000);
    const f = factor.get();
    if (f < 0) dir.current = -1;
    else if (f > 0) dir.current = 1;
    move += dir.current * move * f;
    baseX.set(baseX.get() + move);
  });

  const copy = (k) => (
    <div key={k} className="flex shrink-0 items-center">
      {MARQUEE.map((m) => (
        <span key={m} className="flex items-center">
          <span
            className={`px-6 font-display text-[13vw] uppercase leading-none md:text-[6.5vw] ${
              outline ? "text-transparent [-webkit-text-stroke:1.5px_#ff6a13]" : "text-white"
            }`}
          >
            {m}
          </span>
          <Sparkle className={`h-[5vw] w-[5vw] shrink-0 md:h-[2.4vw] md:w-[2.4vw] ${outline ? "text-brand" : "text-brand"}`} />
        </span>
      ))}
    </div>
  );

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div style={{ x }} className="flex w-max">
        {[0, 1, 2, 3].map(copy)}
      </motion.div>
    </div>
  );
}

export default function Marquee() {
  return (
    <div aria-hidden="true" className="relative overflow-hidden bg-white py-16 md:py-24">
      <div className="-rotate-2 scale-[1.06] bg-ink py-5 shadow-2xl md:py-7">
        <Row speed={-3} />
        <div className="h-3 md:h-4" />
        <Row speed={3} outline />
      </div>
    </div>
  );
}
