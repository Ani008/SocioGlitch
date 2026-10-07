import { useEffect, useState } from "react";
import { animate, motion } from "framer-motion";
import { LogoMark } from "./Icons.jsx";

export default function Preloader({ onDone }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 2.2,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setN(Math.round(v)),
      onComplete: () => setTimeout(onDone, 350),
    });
    return () => controls.stop();
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col justify-between bg-brand p-6 text-ink md:p-10"
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LogoMark className="h-7 w-7" />
          <span className="text-2xl font-bold tracking-tight">Socio Glitch</span>
        </div>
        <span className="text-xs font-semibold uppercase tracking-[0.25em]">Loading the virtual world</span>
      </div>

      <div className="relative">
        <motion.div
          className="font-display text-[34vw] leading-[0.8] md:text-[22vw]"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {String(n).padStart(2, "0")}
          <span className="text-white">%</span>
        </motion.div>
        <div className="mt-6 h-[3px] w-full overflow-hidden bg-ink/20">
          <div className="h-full origin-left bg-ink" style={{ transform: `scaleX(${n / 100})` }} />
        </div>
      </div>
    </motion.div>
  );
}
