import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

/** Slides text up out of a mask. Pass `play` to control when it starts (e.g. after the preloader). */
export function MaskText({ children, delay = 0, className = "", play, duration = 1.1 }) {
  const ref = useRef(null);
  // Observe the (unclipped) wrapper — the inner span is hidden by overflow, so it can't be observed.
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const show = play === undefined ? inView : play;
  return (
    <span ref={ref} className={`inline-block overflow-hidden align-bottom pt-[0.08em] -mt-[0.08em] pb-[0.04em] -mb-[0.04em] ${className}`}>
      <motion.span className="inline-block will-change-transform" initial={{ y: "115%" }} animate={{ y: show ? "0%" : "115%" }} transition={{ duration, ease, delay }}>
        {children}
      </motion.span>
    </span>
  );
}

/** Fade + rise on scroll. */
export function FadeUp({ children, delay = 0, className = "", y = 40, as = "div" }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </Tag>
  );
}

export { ease };
