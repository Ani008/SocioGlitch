import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { LogoMark, ArrowUpRight } from "./Icons.jsx";
import Magnetic from "./Magnetic.jsx";
import { NAV_LINKS, CONTACT } from "../data.js";
import { lockScroll, scrollToTarget, unlockScroll } from "../lib/scroll.js";

export default function Navbar({ ready }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 60);
    setHidden(y > 400 && y > prev && !open);
  });

  useEffect(() => {
    open ? lockScroll() : unlockScroll();
  }, [open]);

  const go = (href) => {
    setOpen(false);
    setTimeout(() => scrollToTarget(href), 450);
  };

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[100]"
        initial={{ y: -120, opacity: 0 }}
        animate={{ y: hidden ? -120 : 0, opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className={`mx-auto flex items-center justify-between transition-all duration-500 ${
            scrolled ? "mt-3 max-w-[min(94vw,1100px)] rounded-full border border-white/10 bg-ink/75 px-5 py-2.5 backdrop-blur-xl" : "max-w-full px-5 py-5 md:px-9"
          }`}
        >
          <a href="#home" onClick={(e) => (e.preventDefault(), go("#home"))} className="flex items-center gap-2 text-white">
            <LogoMark className="h-6 w-6 text-white" />
            <span className="text-xl font-bold tracking-tight">Socio Glitch.</span>
          </a>

          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="group relative flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
          >
            <span className="relative block h-3.5 w-6">
              <motion.span className="absolute left-0 h-[2px] w-full origin-center rounded bg-current" animate={open ? { top: "50%", rotate: 45 } : { top: 0, rotate: 0 }} />
              <motion.span className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 rounded bg-current" animate={{ opacity: open ? 0 : 1, scaleX: open ? 0 : 1 }} />
              <motion.span className="absolute left-0 h-[2px] w-full origin-center rounded bg-current" animate={open ? { top: "50%", rotate: -45 } : { top: "100%", rotate: 0 }} />
            </span>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] flex flex-col justify-between bg-brand px-6 pb-8 pt-28 text-ink md:px-12"
            initial={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 44px) 44px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav className="flex flex-col">
              {NAV_LINKS.map((l, i) => (
                <div key={l.href} className="overflow-hidden border-b border-ink/15">
                  <motion.a
                    href={l.href}
                    onClick={(e) => (e.preventDefault(), go(l.href))}
                    className="group flex items-baseline gap-4 py-2 md:py-3"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 + i * 0.07 }}
                  >
                    <span className="text-sm font-semibold tabular-nums">0{i + 1}</span>
                    <span className="font-display text-[15vw] uppercase leading-[0.95] transition-transform duration-500 group-hover:translate-x-4 md:text-[9vw]">{l.label}</span>
                    <ArrowUpRight className="ml-auto h-8 w-8 -translate-x-4 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 md:h-12 md:w-12" />
                  </motion.a>
                </div>
              ))}
            </nav>
            <div className="mt-8 flex flex-wrap items-end justify-between gap-6 text-sm font-medium">
              <div>
                <p className="mb-1 text-xs uppercase tracking-[0.2em] opacity-60">Say hello</p>
                <a href={`mailto:${CONTACT.email}`} className="text-xl font-semibold underline-offset-4 hover:underline">
                  {CONTACT.email}
                </a>
              </div>
              <Magnetic>
                <a href="#contact" onClick={(e) => (e.preventDefault(), go("#contact"))} className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-semibold text-white">
                  Let's collaborate <ArrowUpRight className="h-4 w-4" />
                </a>
              </Magnetic>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
