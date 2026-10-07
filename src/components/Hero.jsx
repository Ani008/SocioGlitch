import { useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import Magnetic from "./Magnetic.jsx";
import { MaskText, ease } from "./Reveal.jsx";
import { Sparkle } from "./Icons.jsx";
import { CONTACT, HERO_IMAGE } from "../data.js";
import { scrollToTarget } from "../lib/scroll.js";

const orb =
  "bg-[radial-gradient(circle_at_30%_28%,#fff_0%,#ffc9a0_22%,#ff7a2a_55%,#b83a00_100%)] shadow-[0_20px_50px_-10px_rgba(120,30,0,0.55)]";

export default function Hero({ ready }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 55, damping: 18 });
  const smy = useSpring(my, { stiffness: 55, damping: 18 });

  const figX = useTransform(smx, [-0.5, 0.5], [-16, 16]);
  const figY = useTransform(smy, [-0.5, 0.5], [-8, 8]);
  const bgX = useTransform(smx, [-0.5, 0.5], [34, -34]);
  const bgY = useTransform(smy, [-0.5, 0.5], [20, -20]);
  const orbX = useTransform(smx, [-0.5, 0.5], [-50, 50]);
  const orbY = useTransform(smy, [-0.5, 0.5], [-30, 30]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const headY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const figScroll = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const figScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section id="home" ref={ref} onMouseMove={onMove} className="relative isolate min-h-[100svh] overflow-hidden bg-ink">
      <div className="grid min-h-[100svh] lg:grid-cols-[1.75fr_1fr]">
        {/* ───────── ORANGE STAGE ───────── */}
        <div className="relative min-h-[82svh] overflow-hidden bg-brand lg:min-h-0">
          {/* lighting */}
          <motion.div style={{ x: bgX, y: bgY }} className="absolute -inset-20 bg-[radial-gradient(circle_at_50%_45%,#ff9a52_0%,rgba(255,106,19,0)_62%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_100%,rgba(120,30,0,0.55)_0%,transparent_55%)]" />

          {/* concentric rings */}
          <motion.svg
            aria-hidden="true"
            viewBox="0 0 800 800"
            className="absolute left-1/2 top-[62%] aspect-square w-[130%] -translate-x-1/2 -translate-y-1/2 text-white/25"
            animate={{ rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          >
            {[150, 230, 310, 390].map((r, i) => (
              <circle key={r} cx="400" cy="400" r={r} fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray={i % 2 ? "2 10" : "none"} />
            ))}
            <circle cx="400" cy="10" r="6" fill="#fff" />
            <circle cx="710" cy="400" r="4" fill="#fff" />
          </motion.svg>

          {/* floating orbs */}
          <motion.div style={{ x: orbX, y: orbY }} className="absolute inset-0">
            <motion.span
              className={`absolute left-[7%] top-[46%] h-14 w-14 rounded-full md:h-20 md:w-20 ${orb}`}
              animate={{ y: [0, -22, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.span
              className={`absolute right-[10%] top-[40%] h-9 w-9 rounded-full md:h-12 md:w-12 ${orb}`}
              animate={{ y: [0, 18, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            />
            <motion.span
              className="absolute left-[44%] top-[34%] h-4 w-4 rounded-full bg-white/70 blur-[1px]"
              animate={{ scale: [1, 1.6, 1], opacity: [0.9, 0.3, 0.9] }}
              transition={{ duration: 3.5, repeat: Infinity }}
            />
          </motion.div>

          {/* model — sits IN FRONT of the headline (z-20 vs the h1's z-10) */}
          <motion.div style={{ y: figScroll, scale: figScale }} className="absolute inset-x-0 bottom-0 z-20 h-[74%] sm:h-[88%] lg:h-[98%]">
            <motion.div
              style={{ x: figX, y: figY }}
              initial={{ opacity: 0, y: 120 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.5, ease, delay: 0.3 }}
              className="flex h-full items-end justify-center"
            >
              <img
                src={HERO_IMAGE}
                alt="Viral influencer sipping an iced coffee"
                draggable="false"
                className="h-full w-auto max-w-none object-contain object-bottom drop-shadow-[0_30px_40px_rgba(90,20,0,0.45)]"
              />
            </motion.div>
          </motion.div>

          {/* spinning badge */}
          <motion.div
            className="absolute bottom-[16%] right-[5%] z-20 hidden h-28 w-28 items-center justify-center sm:flex"
            initial={{ scale: 0, rotate: -90 }}
            animate={ready ? { scale: 1, rotate: 0 } : {}}
            transition={{ duration: 1, ease, delay: 1.1 }}
          >
            <motion.svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full" animate={{ rotate: 360 }} transition={{ duration: 16, repeat: Infinity, ease: "linear" }}>
              <defs>
                <path id="badge-circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
              </defs>
              <text fontSize="10.5" fontWeight="700" fill="#fff" letterSpacing="2">
                <textPath href="#badge-circle" textLength="274" lengthAdjust="spacing">
                  REAL • VIRTUAL • LIMITLESS •{" "}
                </textPath>
              </text>
            </motion.svg>
            <Sparkle className="h-7 w-7 text-white" />
          </motion.div>

          {/* bottom info */}
          <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-between px-5 pb-6 text-[10px] font-medium uppercase leading-relaxed tracking-[0.18em] text-white/90 md:px-[3vw]">
            <ul className="space-y-0.5">
              {["Instagram", "TikTok", "YouTube"].map((s) => (
                <li key={s}>
                  <a href="#contact" className="transition-colors hover:text-ink">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ───────── DARK COPY PANEL ───────── */}
        <div className="relative flex flex-col justify-between bg-ink px-5 pb-8 pt-12 md:px-[3vw] lg:pb-6 lg:pt-[44svh]">
          <div className="pointer-events-none absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-brand/20 blur-[90px]" />

          <div className="relative">
            <motion.p
              className="mb-4 text-[11px] font-semibold uppercase leading-snug tracking-[0.22em] text-brand"
              initial={{ opacity: 0, x: 20 }}
              animate={ready ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, ease, delay: 0.9 }}
            >
              Viral
              <br />
              influencers
              <br />
              agency
            </motion.p>

            <h2 className="text-[clamp(1.6rem,2.3vw,2.4rem)] font-semibold leading-[1.12] tracking-tight">
              <MaskText play={ready} delay={1.0}>Where</MaskText>
              <br />
              <MaskText play={ready} delay={1.1}>Influence</MaskText>
              <br />
              <MaskText play={ready} delay={1.2}>Meets Culture.</MaskText>
            </h2>

            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 24 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease, delay: 1.45 }}
            >
              <Magnetic strength={0.2}>
                <a
                  href="#contact"
                  onClick={(e) => (e.preventDefault(), scrollToTarget("#contact"))}
                  className="group relative inline-flex items-center gap-4 overflow-hidden rounded-full bg-brand p-2 pr-8 text-lg font-semibold text-white transition-colors duration-500 hover:bg-white hover:text-ink"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-brand transition-transform duration-700 group-hover:rotate-[360deg]">
                    <Sparkle className="h-5 w-5" />
                  </span>
                  Let&apos;s collaborate!
                </a>
              </Magnetic>
            </motion.div>
          </div>

          <motion.div
            className="relative mt-12 text-[10px] font-medium text-white/70 lg:mt-0"
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 1.7 }}
          >
            <p className="mb-2 text-xs font-semibold text-white">Contact us</p>
            <div className="flex flex-wrap gap-2">
              {[CONTACT.phone, CONTACT.country, CONTACT.email].map((c) => (
                <span key={c} className="rounded-full bg-white/10 px-3 py-1.5 tracking-wide text-white/80 backdrop-blur">
                  {c}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ───────── HEADLINE (spans both panels) ───────── */}
      <motion.h1
        style={{ y: headY }}
        className="pointer-events-none absolute inset-x-0 top-[14svh] z-10 flex flex-wrap gap-x-[0.2em] px-[3vw] font-display text-[23vw] uppercase leading-[0.9] tracking-[0.005em] text-white sm:text-[16vw] lg:top-[12svh] lg:flex-nowrap lg:text-[12vw]"
      >
        <MaskText play={ready} delay={0.2}>Create</MaskText>
        <MaskText play={ready} delay={0.32}>Ignite</MaskText>
        <MaskText play={ready} delay={0.44}>Impact</MaskText>
      </motion.h1>
    </section>
  );
}
