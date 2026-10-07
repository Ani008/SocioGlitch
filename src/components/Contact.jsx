import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Magnetic from "./Magnetic.jsx";
import { MaskText, FadeUp, ease } from "./Reveal.jsx";
import { ArrowUpRight, Sparkle } from "./Icons.jsx";
import { CONTACT, FOOTER_COLS } from "../data.js";
import { scrollToTarget } from "../lib/scroll.js";

/**
 * Transparent-background PNG for the contact card.
 * Canva size: 1200 × 1500 px (4:5). Put the file in /public/images/ with this name.
 */
const CONTACT_IMAGE = "/images/cont.svg";

const field =
  "peer w-full border-0 border-b border-white/20 bg-transparent py-3 text-xl text-white outline-none transition-colors placeholder:text-white/30 focus:border-brand";

function Form() {
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    // TODO: send the form data to your backend / email service here.
    setSent(true);
  };

  return (
    <div className="relative min-h-[480px]">
      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <motion.div
            key="ok"
            className="flex h-full min-h-[480px] flex-col items-start justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <motion.span
              className="grid h-20 w-20 place-items-center rounded-full bg-brand text-white"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.2 }}
            >
              <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                <motion.path d="M5 12.5l4.5 4.5L19 7.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.5 }} />
              </svg>
            </motion.span>
            <h3 className="mt-8 font-display text-6xl uppercase leading-none md:text-7xl">Message received</h3>
            <p className="mt-4 max-w-sm text-white/60">Thanks — a member of the Realm. team will reach out within one business day.</p>
            <button onClick={() => setSent(false)} className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-brand underline-offset-8 hover:underline">
              Send another
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={submit} className="space-y-7" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }}>
            <div className="grid gap-7 md:grid-cols-2">
              <label className="block">
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">Your name</span>
                <input required name="name" autoComplete="name" placeholder="Jane Doe" className={field} />
              </label>
              <label className="block">
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">Email</span>
                <input required type="email" name="email" autoComplete="email" placeholder="jane@brand.com" className={field} />
              </label>
            </div>
            <label className="block">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">Brand / company</span>
              <input name="company" autoComplete="organization" placeholder="Your brand" className={field} />
            </label>

            

            <label className="block">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">Tell us about your project</span>
              <textarea required name="message" rows={3} placeholder="What would you like a virtual face to do for you?" className={`${field} resize-none`} />
            </label>

            <Magnetic strength={0.2}>
              <button type="submit" className="group inline-flex items-center gap-4 rounded-full bg-brand p-2 pr-8 text-lg font-semibold text-white transition-colors duration-500 hover:bg-white hover:text-ink">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-ink text-brand transition-transform duration-700 group-hover:rotate-[360deg]">
                  <Sparkle className="h-5 w-5" />
                </span>
                Let&apos;s collaborate!
              </button>
            </Magnetic>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function BigWordmark() {
  const letters = "Socio Glitch.".split("");
  return (
    <div aria-label="Socio Glitch." className="flex select-none font-bold leading-[0.8] tracking-[-0.06em] text-white">
      {letters.map((l, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          data-hover
          className={`inline-block text-[27vw] md:text-[8vw] ${l === "." ? "text-brand" : ""}`}
          initial={{ y: "60%", opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease, delay: i * 0.06 }}
          whileHover={{ y: -18, color: "#ff6a13", transition: { duration: 0.25 } }}
        >
          {l}
        </motion.span>
      ))}
    </div>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-ink">
      <div className="pointer-events-none absolute left-[-10%] top-[10%] h-[40rem] w-[40rem] rounded-full bg-brand/15 blur-[140px]" />

      <div className="relative mx-auto grid max-w-[1500px] gap-16 px-5 py-24 md:px-[4vw] md:py-32 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        {/* image cluster */}
        <div className="flex items-end gap-3 md:gap-6">
          <h2 className="font-display text-[26vw] uppercase leading-[0.82] text-brand [writing-mode:vertical-rl] rotate-180 sm:text-[17vw] lg:text-[9.5vw]">
            <MaskText>Contact</MaskText>
          </h2>

          <div className="relative">
            <FadeUp y={60}>
              <div className="relative aspect-[4/5] w-[min(58vw,400px)] overflow-hidden rounded-[28px] bg-[linear-gradient(160deg,#ff8a3d_0%,#e24d00_100%)] md:rounded-[36px]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,230,200,0.5)_0%,transparent_60%)]" />
                <motion.img
                  src={CONTACT_IMAGE}
                  alt="Realm. virtual influencer"
                  draggable="false"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                  className="absolute inset-0 h-full w-full object-contain object-bottom drop-shadow-[0_24px_30px_rgba(90,20,0,0.4)]"
                  initial={{ y: 40, scale: 1.04 }}
                  whileInView={{ y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease }}
                />
              </div>
            </FadeUp>
            <div className="absolute -right-6 top-[38%] z-10 md:-right-10">
              <Magnetic strength={0.3}>
                <a
                  href={`mailto:${CONTACT.email}`}
                  aria-label={`Email ${CONTACT.email}`}
                  className="group grid h-20 w-20 place-items-center rounded-full bg-brand text-white shadow-[0_20px_40px_-10px_rgba(255,106,19,0.6)] transition-colors hover:bg-white hover:text-brand md:h-24 md:w-24"
                >
                  <ArrowUpRight className="h-8 w-8 transition-transform duration-500 group-hover:rotate-45 md:h-10 md:w-10" />
                </a>
              </Magnetic>
            </div>
          </div>

          <h2 className="font-display text-[26vw] uppercase leading-[0.82] text-brand [writing-mode:vertical-rl] rotate-180 sm:text-[17vw] lg:text-[9.5vw] self-end">
            <MaskText delay={0.15}>Us</MaskText>
          </h2>
        </div>

        {/* form */}
        <Form />
      </div>

      {/* footer */}
      <footer className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-12 px-5 pb-8 pt-16 md:px-[4vw] lg:flex-row lg:items-end lg:justify-between">
          <BigWordmark />

          <div className="flex flex-wrap gap-x-16 gap-y-10 pb-3">
            {FOOTER_COLS.map((col) => (
              <div key={col.title}>
                <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">{col.title}</p>
                <ul className="space-y-2.5 text-sm font-medium">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#contact" onClick={(e) => (e.preventDefault(), scrollToTarget("#contact"))} className="relative inline-block text-white/90 after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-brand after:transition-transform after:duration-300 hover:text-white hover:after:origin-left hover:after:scale-x-100">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="flex flex-col items-start gap-5">
              <p className="max-w-[10rem] text-sm font-medium leading-snug text-white/80">Viral Influencers Agency</p>
              <a
                href="#contact"
                onClick={(e) => (e.preventDefault(), scrollToTarget("#contact"))}
                className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-white hover:text-ink"
              >
                <ArrowUpRight className="h-3.5 w-3.5" />
                Let&apos;s collaborate
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-4 border-t border-white/10 px-5 py-6 text-xs text-white/40 md:px-[4vw]">
          <p>© {new Date().getFullYear()} Socio Glitch. All rights reserved.</p>
          <button onClick={() => scrollToTarget("#home")} className="font-semibold uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-brand">
            Back to top ↑
          </button>
        </div>
      </footer>
    </section>
  );
}