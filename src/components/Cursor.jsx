import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** Soft follower ring that grows over interactive elements. Desktop / fine pointers only. */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 420, damping: 32, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 420, damping: 32, mass: 0.35 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e) => setHover(!!e.target.closest?.("a,button,input,textarea,[data-hover]"));
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[150] -ml-5 -mt-5 h-10 w-10 rounded-full border border-white mix-blend-difference"
      style={{ x: sx, y: sy }}
      animate={{ scale: hover ? 1.9 : 1, backgroundColor: hover ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0)" }}
      transition={{ duration: 0.25 }}
    />
  );
}
