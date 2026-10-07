/**
 * All site content lives here.
 *
 * IMAGES: every item has an optional `image` field. Drop your own photos in
 * /public/images and set e.g. image: "/images/rozy.jpg". When `image` is
 * empty the built-in vector portrait (`look`) is drawn instead.
 */

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Talents", href: "#talents" },
  { label: "Benefits", href: "#benefits" },
  { label: "How it works", href: "#how" },
  { label: "Contact", href: "#contact" },
];

export const CONTACT = {
  phone: "+91 88021 87614",
  country: "INDIA",
  email: "enquiry@socioglitch.com",
};

// Transparent PNG cut-out for the hero (bottom-aligned). Replace the file in /public/images to change it.
export const HERO_IMAGE = "/images/hero.svg";

export const TALENTS = [
  {
    name: "Sania Mistry",
    handle: "@saniaamistryy",
    followers: "900k",
    engagement: "6.4%",
    look: "Sania",
    image: "/images/influencer1.jpeg",
    bg: "linear-gradient(160deg,#2a2a30 0%,#111114 100%)",
    dark: true,
  },
  {
    name: "Divya Gupta",
    handle: "@divyagupta7811",
    followers: "600K",
    engagement: "5.1%",
    look: "Divya",
    image: "/images/influencer2.png",
    bg: "linear-gradient(160deg,#f4f4f5 0%,#d9d9dc 100%)",
  },
  {
    name: "Saket",
    handle: "@saketgokhale",
    followers: "2.5M",
    engagement: "7.8%",
    look: "saket",
    image: "/images/saket.png",
    bg: "linear-gradient(160deg,#cfcfd3 0%,#9b9ba1 100%)",
  },
  {
    name: "Bhagyashree Limaye",
    handle: "@bhagyashreelimaye",
    followers: "800K",
    engagement: "8.2%",
    look: "bhagyashree",
    image: "/images/bhaga.png",
    bg: "linear-gradient(160deg,#ff8a3d 0%,#e24d00 100%)",
  },
  {
    name: "Manik Arora",
    handle: "@mainikarora",
    followers: "200K",
    engagement: "5.9%",
    look: "kairo",
    image: "/images/manik.png",
    bg: "linear-gradient(160deg,#1d3b4a 0%,#0a161d 100%)",
    dark: true,
  },
];

export const BENEFITS = [
  {
    title: "Creator-first strategy",
    text: "We pair brands with the right creators, communities and voices to turn campaigns into conversations people actually care about.",
  },
  {
    title: "Always on-brand",
    text: "Look, voice and values are fully scripted. Your campaign is never off-message, late to set, or caught in a headline you didn't write.",
  },
  {
    title: "Built for virality",
    text: "We create scroll-stopping campaigns designed to spark attention, shares and conversations across social platforms.",
  },
  {
    title: "Culture-driven creators",
    text: "From emerging voices to established influencers, we find creators who actually move culture and influence their communities.",
  },
  {
    title: "Measurable impact",
    text: "Reach is just the beginning. We track engagement, audience response and campaign performance to show what actually worked.",
  },
];

export const STATS = [
  { value: 12, suffix: "M+", label: "Combined audience" },
  { value: 98, suffix: "%", label: "Brand-safe delivery" },
  { value: 3.2, suffix: "x", label: "Avg. engagement lift", decimals: 1 },
  { value: 24, suffix: "/7", label: "Always creating" },
];

export const MARQUEE = ["Metaverse-ready", "Always on", "Born digital", "Zero limits", "Unreal beauty"];

export const STEPS = [
  {
    n: "01",
    title: "Brief & match",
    text: "Tell us your brand, audience and goals. We turn your brief into a creator strategy built for attention.",
  },
  {
    n: "02",
    title: "Match & Create",
    text: "We find the right creators for your brand and bring them into campaigns that feel authentic, creative and native to their audience.",
  },
  {
    n: "03",
    title: "Launch & scale",
    text: "We launch, track and optimise the campaign — doubling down on what works and turning great content into bigger results.",
  },
];

export const FOOTER_COLS = [
  { title: "Can we help you?", links: ["Contact Us", "Press Kit", "FAQs"] },
  { title: "About us", links: ["Our Team", "Careers", "Legal"] },
];
