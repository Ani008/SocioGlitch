# Realm. — Virtual Influencers Agency

Vite + React + Tailwind CSS v4 + Framer Motion + Lenis (smooth scroll).

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```

## Where things are

| What                         | File                           |
| ---------------------------- | ------------------------------ |
| All copy, talents, stats     | `src/data.js`                  |
| Colors / fonts (Tailwind)    | `src/index.css` (`@theme`)     |
| Hero, Talents, Benefits ...  | `src/components/*.jsx`         |

Styling is 100% Tailwind utility classes. `src/index.css` only imports Tailwind and
declares the design tokens (brand orange, ink, fonts) — there is no hand-written CSS.

## Using real photos

The site ships with original vector portraits so it works with no assets.
To use photos, put them in `public/images/` and set the `image` field in `src/data.js`:

```js
{ name: "Rozy", image: "/images/rozy.jpg", ... }
```

The hero uses a transparent PNG cut-out (`HERO_IMAGE` in `src/data.js` → `public/images/hero-model.png`), bottom-aligned; the headline sits behind it.
The "Irene x Rozy" and Contact images are in `HowItWorks.jsx` / `Contact.jsx` (swap `<Portrait />` for an `<img />`).

## Contact form

The form shows a success state but does not send anywhere yet — wire `submit()` in
`src/components/Contact.jsx` to your backend, Formspree, EmailJS, etc.
