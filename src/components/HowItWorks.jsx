import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Portrait from "./Portrait.jsx";
import { MaskText, FadeUp, ease } from "./Reveal.jsx";
import { STEPS } from "../data.js";

function Bloom({ className, delay = 0 }) {
  return (
    <motion.span
      className={`absolute rounded-full bg-[radial-gradient(circle_at_35%_30%,#e8f1ff_0%,#8fb2e8_45%,#4a74c4_100%)] shadow-[0_10px_30px_-8px_rgba(40,70,140,0.6)] ${className}`}
      animate={{ y: [0, -8, 0], rotate: [0, 6, 0] }}
      transition={{ duration: 6 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

export default function HowItWorks() {
  const stage = useRef(null);
  const steps = useRef(null);

  const { scrollYProgress: sp } = useScroll({ target: stage, offset: ["start end", "end start"] });
  const imgY = useTransform(sp, [0, 1], ["-8%", "8%"]);
  const imgScale = useTransform(sp, [0, 1], [1.04, 1]);

  const { scrollYProgress: lp } = useScroll({ target: steps, offset: ["start 75%", "end 65%"] });
  const line = useSpring(lp, { stiffness: 120, damping: 26 });

  return (
    <section id="how" className="grid bg-paper text-ink lg:grid-cols-2">
      {/* LEFT — copy */}
      <div className="flex flex-col justify-center px-5 py-24 md:px-[4vw] lg:py-32">
        <h2 className="font-display text-[24vw] uppercase leading-[0.88] text-brand sm:text-[15vw] lg:text-[7.4vw]">
          <MaskText>Viral</MaskText>
          <br />
          <MaskText delay={0.1}>Influen-</MaskText>
          <br />
          <MaskText delay={0.2}>cers?</MaskText>
        </h2>

        <FadeUp delay={0.1} className="mt-10 max-w-lg">
          <h3 className="text-2xl font-bold tracking-tight">How Do They Work?</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-ink/65">
            So just like &lsquo;human influencers&rsquo;, brands that choose to collaborate with these virtual faces will be opened up to huge audiences and a whole range of benefits.
          </p>
        </FadeUp>

        <div ref={steps} className="relative mt-12 max-w-lg pl-14">
          <div className="absolute bottom-3 left-[19px] top-3 w-px bg-ink/15" />
          <motion.div className="absolute left-[18px] top-3 bottom-3 w-[3px] origin-top rounded bg-brand" style={{ scaleY: line }} />
          {STEPS.map((s, i) => (
            <FadeUp key={s.n} delay={i * 0.1} className="relative pb-10 last:pb-0">
              <span className="absolute -left-14 top-0 grid h-10 w-10 place-items-center rounded-full bg-ink text-sm font-bold text-white">{s.n}</span>
              <h4 className="text-lg font-semibold">{s.title}</h4>
              <p className="mt-1 text-[15px] leading-relaxed text-ink/60">{s.text}</p>
            </FadeUp>
          ))}
        </div>
      </div>

      {/* RIGHT — visual */}
      <div ref={stage} className="relative min-h-[80svh] overflow-hidden bg-[#c9c3c2] lg:min-h-[100svh]">
        <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,#f3ece8_0%,#c8bdbb_55%,#8d8794_100%)]">
          <div className="absolute inset-x-0 bottom-0 flex h-[62%] items-end justify-center">
            <div className="relative -mr-10 h-[88%] aspect-[200/260] md:-mr-16">
              <Portrait look="irene" className="h-full w-full drop-shadow-[0_25px_35px_rgba(30,20,40,0.35)]" />
            </div>
            <div className="relative z-10 -ml-10 h-full aspect-[200/260] md:-ml-16">
              <Portrait look="rozy2" className="h-full w-full drop-shadow-[0_25px_35px_rgba(30,20,40,0.35)]" delay={1} />
            </div>
          </div>

          {/* bouquet */}
          <Bloom className="bottom-[4%] right-[8%] z-20 h-20 w-20 md:h-28 md:w-28" />
          <Bloom className="bottom-[10%] right-[22%] z-20 h-14 w-14 md:h-20 md:w-20" delay={0.8} />
          <Bloom className="bottom-[2%] right-[34%] z-20 h-12 w-12 md:h-16 md:w-16" delay={1.4} />
          <Bloom className="bottom-[14%] right-[2%] z-20 h-12 w-12 md:h-14 md:w-14" delay={0.4} />
        </motion.div>

        <motion.div
          className="absolute inset-x-5 top-6 z-30 flex items-start justify-between md:inset-x-8 md:top-8"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease }}
        >
          <p className="max-w-[10rem] text-[11px] font-medium leading-snug text-ink/70">Featuring with real influencers</p>
        </motion.div>
      </div>
    </section>
  );
}
