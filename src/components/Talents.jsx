import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Media from "./Media.jsx";
import { MaskText, FadeUp } from "./Reveal.jsx";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "./Icons.jsx";
import { TALENTS } from "../data.js";

function TalentCard({ t, i }) {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 15 });
  const sry = useSpring(ry, { stiffness: 150, damping: 15 });
  const glareX = useTransform(sry, [-10, 10], ["0%", "100%"]);
  const glareY = useTransform(srx, [10, -10], ["0%", "100%"]);

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 16);
    rx.set(-py * 16);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <FadeUp delay={i * 0.08} className={`shrink-0 snap-start ${i % 2 ? "lg:mt-20" : ""}`}>
      <motion.article
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        data-hover
        style={{ rotateX: srx, rotateY: sry, transformPerspective: 900, background: t.bg }}
        className="group relative h-[400px] w-[72vw] max-w-[320px] overflow-hidden rounded-[28px] sm:w-[290px]"
      >
        {/* portrait */}
        <div className="absolute inset-x-0 bottom-0 top-10 transition-transform duration-700 ease-out group-hover:scale-[1.06]">
          <Media item={t} className="h-full w-full" delay={i * 0.5} />
        </div>

        {/* glare */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 mix-blend-soft-light transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: "radial-gradient(circle at var(--gx) var(--gy), rgba(255,255,255,.7), transparent 55%)", "--gx": glareX, "--gy": glareY }}
        />

        {/* name pill + arrow */}
        <div className="absolute left-4 right-4 top-4 flex items-start justify-between">
          <span className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-ink shadow-sm">{t.name}</span>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-brand text-white transition-transform duration-500 group-hover:rotate-45">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>

        {/* stats slide-up */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-ink/95 via-ink/80 to-transparent px-5 pb-5 pt-14 text-white transition-transform duration-500 ease-out group-hover:translate-y-0">
          <p className="text-xs font-medium text-white/60">{t.handle}</p>
          <div className="mt-2 flex gap-6">
            <div>
              <p className="font-display text-3xl leading-none text-brand">{t.followers}</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/60">Followers</p>
            </div>
            <div>
              <p className="font-display text-3xl leading-none text-brand">{t.engagement}</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/60">Engagement</p>
            </div>
          </div>
        </div>
      </motion.article>
    </FadeUp>
  );
}

export default function Talents() {
  const scroller = useRef(null);
  const [idx, setIdx] = useState(0);

  const step = () => (scroller.current?.firstElementChild?.getBoundingClientRect().width ?? 300) + 24;
  const slide = (dir) => scroller.current?.scrollBy({ left: dir * step(), behavior: "smooth" });
  const onScroll = () => setIdx(Math.min(TALENTS.length - 1, Math.round(scroller.current.scrollLeft / step())));

  return (
    <section id="talents" className="relative bg-white py-24 text-ink md:py-32">
      <div className="mx-auto max-w-[1500px] px-5 md:px-[3vw]">
        <div className="mb-12 grid items-end gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="font-display text-[24vw] uppercase leading-[0.88] text-brand sm:text-[16vw] lg:text-[8.5vw]">
              <MaskText>Our</MaskText>
              <br />
              <MaskText delay={0.1}>Talents</MaskText>
              <span className="ml-4 inline-flex items-center gap-2 align-middle">
                <button onClick={() => slide(-1)} aria-label="Previous talent" className="grid h-12 w-12 place-items-center rounded-full border border-ink/20 transition-colors hover:border-brand hover:bg-brand hover:text-white">
                  <ArrowLeft />
                </button>
                <button onClick={() => slide(1)} aria-label="Next talent" className="grid h-12 w-12 place-items-center rounded-full border border-ink/20 transition-colors hover:border-brand hover:bg-brand hover:text-white">
                  <ArrowRight />
                </button>
              </span>
            </h2>
          </div>
          <FadeUp delay={0.2} className="max-w-md lg:justify-self-end">
            <p className="text-lg leading-relaxed text-ink/70">
              Meet the digital-native faces already shaping culture. Each talent has a fully built persona, a loyal audience and a feed that never sleeps.
            </p>
            <p className="mt-5 font-display text-2xl tabular-nums text-ink">
              {String(idx + 1).padStart(2, "0")}
              <span className="text-ink/30"> / {String(TALENTS.length).padStart(2, "0")}</span>
            </p>
          </FadeUp>
        </div>
      </div>

      <div
        ref={scroller}
        onScroll={onScroll}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-28 pt-4 [scrollbar-width:none] md:px-[3vw] [&::-webkit-scrollbar]:hidden"
      >
        {TALENTS.map((t, i) => (
          <TalentCard key={t.name} t={t} i={i} />
        ))}
        <div className="w-1 shrink-0" />
      </div>
    </section>
  );x
}
