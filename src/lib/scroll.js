// Tiny bridge so any component can drive the Lenis smooth-scroller.
let lenis = null;

export const setLenis = (instance) => {
  lenis = instance;
};

export const scrollToTarget = (selector) => {
  if (lenis) lenis.scrollTo(selector, { duration: 1.5, easing: (t) => 1 - Math.pow(1 - t, 4) });
  else document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
};

export const lockScroll = () => lenis?.stop();
export const unlockScroll = () => lenis?.start();
