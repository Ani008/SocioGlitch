import { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useInView } from "framer-motion";
import { MaskText, FadeUp, ease } from "./Reveal.jsx";
import { ArrowRight } from "./Icons.jsx";
import { BENEFITS, STATS } from "../data.js";

function Counter({ value, suffix = "", decimals = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, value, { duration: 2.2, ease: [0.16, 1, 0.3, 1], onUpdate: setV });
    return () => c.stop();
  }, [inView, value]);
  return (
    <span ref={ref}>
      {v.toFixed(decimals)}
      {suffix}
    </span>
  );
}

function Pill({ b, i, open, onToggle }) {
  return (
    <FadeUp delay={i * 0.07} y={30}>
      <motion.div layout transition={{ duration: 0.5, ease }} className="overflow-hidden rounded-[36px] bg-ink text-white" style={{ borderRadius: 36 }}>
        <button onClick={onToggle} aria-expanded={open} className="group flex w-full items-center gap-4 p-2 pr-2.5 text-left">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white text-lg font-bold text-ink">0{i + 1}.</span>
          <span className="text-xl font-semibold tracking-tight md:text-2xl">{b.title}</span>
          <span className="ml-auto grid h-14 w-14 shrink-0 place-items-center rounded-full bg-brand text-white transition-transform duration-500 group-hover:scale-110">
            <ArrowRight className={`h-6 w-6 transition-transform duration-500 ${open ? "rotate-90" : ""}`} />
          </span>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease }}>
              <p className="px-6 pb-6 pt-1 text-base leading-relaxed text-white/70 md:pl-[88px] md:pr-20">{b.text}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </FadeUp>
  );
}

export default function Benefits() {
  const [open, setOpen] = useState(0);

  return (
    <section id="benefits" className="relative overflow-hidden bg-white pb-28 text-ink">
      <div className="mx-auto max-w-[1500px] px-5 md:px-[3vw]">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="font-display text-[24vw] uppercase leading-[0.88] text-brand sm:text-[16vw] lg:text-[8.5vw]">
              <MaskText>Benefits</MaskText>
            </h2>
            <FadeUp delay={0.15}>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/70">
                Everything a human influencer offers plus the things only a digital one can. Tap a benefit to see how it works for your brand.
              </p>
            </FadeUp>
          </div>

          <div className="flex flex-col gap-3">
            {BENEFITS.map((b, i) => (
              <Pill key={b.title} b={b} i={i} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
            ))}
          </div>
        </div>

        {/* stats */}
        <FadeUp className="mt-24" y={50}>
          <div className="relative overflow-hidden rounded-[36px] bg-ink px-6 py-10 text-white md:px-12 md:py-14">
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand/30 blur-[80px]" />
            <div className="relative grid grid-cols-2 gap-y-10 md:grid-cols-4">
              {STATS.map((s, i) => (
                <div key={s.label} className={`md:px-6 ${i ? "md:border-l md:border-white/10" : ""}`}>
                  <p className="font-display text-[15vw] leading-none text-brand md:text-[5.5vw]">
                    <Counter value={s.value} suffix={s.suffix} decimals={s.decimals} />
                  </p>
                  <p className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-white/60">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
