import { useId } from "react";
import { motion } from "framer-motion";

/**
 * Original vector "digital human" portraits (no external images needed).
 * Swap for real photos by setting `image` in src/data.js — see <Media />.
 */
export const LOOKS = {
  rozy: { skin: "#f3cdb6", shade: "#d9a285", hair: "#17101a", style: "braids", outfit: "#d9683a", accent: "#6fb7c9", lip: "#c4455a", iris: "#4a2c20" },
  imma: { skin: "#f6d6c6", shade: "#dcab92", hair: "#f27fa8", style: "bob", outfit: "#5f636c", accent: "#d4d7dc", lip: "#d9566b", iris: "#5a3a4a" },
  shudu: { skin: "#3d2519", shade: "#24150e", hair: "#1a0f0a", style: "bald", outfit: "#cfd3da", accent: "#ffffff", lip: "#6a2a2c", iris: "#1b0f0a" },
  nova: { skin: "#bb7a52", shade: "#8f5636", hair: "#2a1810", style: "bun", outfit: "#ff6a13", accent: "#ffd8b8", lip: "#a23a3a", iris: "#3a2012", earring: "#ffd27a" },
  kairo: { skin: "#7d4d32", shade: "#573320", hair: "#0e0a09", style: "short", outfit: "#2d3f50", accent: "#7fd0e0", lip: "#7a3a34", iris: "#1d1210", shades: true },
  heroA: { skin: "#5d3b29", shade: "#3c2418", hair: "#1c0f0a", style: "long", outfit: "#5fb4c4", accent: "#ff9a52", lip: "#8a3a2c", iris: "#1d100a", shades: true, earring: "#ff6a13" },
  heroB: { skin: "#8d563a", shade: "#5f3624", hair: "#1a0d09", style: "bun", outfit: "#c25a30", accent: "#f0a070", lip: "#7a2c24", iris: "#2a160d", earring: "#f4d9a0" },
  irene: { skin: "#f3d0bb", shade: "#d7a98f", hair: "#16100f", style: "long", outfit: "#f4f4f4", accent: "#ffffff", lip: "#d4687a", iris: "#2a1810" },
  rozy2: { skin: "#f3cdb6", shade: "#d9a285", hair: "#17101a", style: "braids", outfit: "#f8f8f8", accent: "#bcd7ff", lip: "#c4455a", iris: "#4a2c20" },
  contact: { skin: "#4a2b1a", shade: "#2a160d", hair: "#120a06", style: "bald", outfit: "#ff7a1c", accent: "#ffb070", lip: "#5a2420", iris: "#1d100a", earring: "#ffd27a" },
};

function Eye({ cx, iris }) {
  return (
    <g>
      <path d={`M${cx - 11} 108 Q${cx} 98 ${cx + 11} 108 Q${cx} 115 ${cx - 11} 108Z`} fill="#fbfaf8" />
      <circle cx={cx} cy="107.5" r="4.3" fill={iris} />
      <circle cx={cx} cy="107.5" r="2" fill="#050505" />
      <circle cx={cx + 1.6} cy="106" r="1" fill="#fff" />
      <path d={`M${cx - 12.5} 108.5 Q${cx} 96.5 ${cx + 12.5} 108.5`} fill="none" stroke="#0a0606" strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

function HairBack({ c }) {
  switch (c.style) {
    case "bob":
      return <path d="M48 122 C42 58 70 36 100 36 C130 36 158 58 152 122 L152 166 Q140 176 126 164 L126 110 L74 110 L74 164 Q60 176 48 166Z" fill={c.hair} />;
    case "long":
      return <path d="M46 110 C40 56 70 36 100 36 C130 36 160 56 154 110 L162 250 L38 250Z" fill={c.hair} />;
    default:
      return null;
  }
}

function HairFront({ c }) {
  const cap = "M57 104 C52 58 78 42 100 42 C124 42 150 58 143 104 C136 80 122 66 100 66 C78 66 64 80 57 104Z";
  const sheen = <path d="M72 58 Q100 44 128 58" fill="none" stroke="#fff" strokeOpacity=".22" strokeWidth="3" strokeLinecap="round" />;
  switch (c.style) {
    case "bob":
      return (
        <g>
          <path d="M56 98 C58 60 82 48 100 48 C118 48 142 60 144 98 C130 80 114 72 100 74 C86 72 70 80 56 98Z" fill={c.hair} />
          <path d="M70 56 Q100 44 130 56" fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="3" strokeLinecap="round" />
        </g>
      );
    case "short":
      return (
        <g>
          <path d={cap} fill={c.hair} />
          {sheen}
        </g>
      );
    case "bun":
      return (
        <g>
          <circle cx="100" cy="34" r="17" fill={c.hair} />
          <circle cx="95" cy="29" r="5" fill="#fff" fillOpacity=".15" />
          <path d={cap} fill={c.hair} />
          {sheen}
        </g>
      );
    case "long":
      return (
        <g>
          <path d={cap} fill={c.hair} />
          <path d="M58 100 C48 140 44 190 52 240 L76 236 C70 190 70 140 70 112Z" fill={c.hair} />
          <path d="M142 100 C152 140 156 190 148 240 L124 236 C130 190 130 140 130 112Z" fill={c.hair} />
          {sheen}
        </g>
      );
    case "braids":
      return (
        <g>
          <path d={cap} fill={c.hair} />
          <path d="M100 44 L100 66" stroke="#fff" strokeOpacity=".18" strokeWidth="1.5" />
          {[-1, 1].map((s) => (
            <g key={s}>
              <path d={`M${100 + s * 43} 98 L${100 + s * 52} 118 L${100 + s * 40} 124Z`} fill={c.hair} />
              {Array.from({ length: 8 }).map((_, i) => (
                <g key={i}>
                  <ellipse cx={100 + s * (52 + i * 0.9)} cy={120 + i * 16.5} rx={7.6 - i * 0.35} ry="10.4" fill={c.hair} />
                  <path
                    d={`M${100 + s * (52 + i * 0.9) - 2} ${112 + i * 16.5} q3 8 0 16`}
                    stroke="#fff"
                    strokeOpacity=".16"
                    strokeWidth="1.4"
                    fill="none"
                  />
                </g>
              ))}
              <circle cx={100 + s * 58.5} cy="252" r="4" fill={c.accent} />
            </g>
          ))}
          {sheen}
        </g>
      );
    default:
      return <ellipse cx="100" cy="62" rx="24" ry="8" fill="#fff" fillOpacity=".14" />;
  }
}

function Earring({ color, side }) {
  const x = 100 + side * 44;
  return (
    <g>
      <circle cx={x} cy="124" r="2.6" fill={color} />
      <path d={`M${x} 126 L${x} 150`} stroke={color} strokeWidth="2.6" strokeLinecap="round" />
      <ellipse cx={x} cy="156" rx="4.6" ry="8" fill={color} />
      <ellipse cx={x - 1.2} cy="153" rx="1.2" ry="3" fill="#fff" fillOpacity=".55" />
    </g>
  );
}

export default function Portrait({ look = "rozy", className = "", float = true, delay = 0 }) {
  const c = LOOKS[look] || LOOKS.rozy;
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const skinG = `sk${uid}`;
  const hiG = `hi${uid}`;
  const lensG = `ln${uid}`;
  const cloth = `cl${uid}`;

  return (
    <svg
      viewBox="0 0 200 260"
      preserveAspectRatio="xMidYMax meet"
      className={className}
      role="img"
      aria-label={`${look} virtual influencer portrait`}
    >
      <defs>
        <linearGradient id={skinG} x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor={c.skin} />
          <stop offset="1" stopColor={c.shade} />
        </linearGradient>
        <radialGradient id={hiG} cx="0.4" cy="0.3" r="0.6">
          <stop offset="0" stopColor="#fff" stopOpacity="0.38" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={lensG} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7a2a10" />
          <stop offset="1" stopColor="#1a0805" />
        </linearGradient>
        <linearGradient id={cloth} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.22" />
          <stop offset="1" stopColor="#000" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      <motion.g
        animate={float ? { y: [0, -3, 0] } : undefined}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
      >
        <HairBack c={c} />

        {/* shoulders + outfit */}
        <path d="M-6 262 L-6 236 Q8 194 70 184 Q100 198 130 184 Q192 194 206 236 L206 262Z" fill={c.outfit} />
        <path d="M-6 262 L-6 236 Q8 194 70 184 Q100 198 130 184 Q192 194 206 236 L206 262Z" fill={`url(#${cloth})`} />

        {/* neck */}
        <path d="M82 148 L82 184 Q100 224 118 184 L118 148Z" fill={c.shade} />
        <path d="M82 184 Q100 224 118 184" fill="none" stroke={c.accent} strokeWidth="5" strokeLinecap="round" />
        <path d="M86 150 Q100 168 114 150 L114 162 Q100 178 86 162Z" fill="#000" fillOpacity=".18" />

        {/* ears */}
        <ellipse cx="58" cy="114" rx="6" ry="11" fill={c.shade} />
        <ellipse cx="142" cy="114" rx="6" ry="11" fill={c.shade} />

        {/* face */}
        <path d="M58 105 C58 70 78 55 100 55 C122 55 142 70 142 105 C142 140 124 170 100 170 C76 170 58 140 58 105Z" fill={`url(#${skinG})`} />
        <path d="M58 105 C58 70 78 55 100 55 C122 55 142 70 142 105 C142 140 124 170 100 170 C76 170 58 140 58 105Z" fill={`url(#${hiG})`} />
        <ellipse cx="76" cy="132" rx="9" ry="6" fill="#ff6a50" fillOpacity=".13" />
        <ellipse cx="124" cy="132" rx="9" ry="6" fill="#ff6a50" fillOpacity=".13" />

        {/* brows */}
        <path d="M70 96 Q82 90 94 95" fill="none" stroke={c.hair === "#f27fa8" ? "#c45a7d" : c.hair} strokeWidth="2.8" strokeLinecap="round" />
        <path d="M106 95 Q118 90 130 96" fill="none" stroke={c.hair === "#f27fa8" ? "#c45a7d" : c.hair} strokeWidth="2.8" strokeLinecap="round" />

        {/* eyes or shades */}
        {c.shades ? (
          <g>
            <rect x="63" y="98" width="33" height="22" rx="10" fill={`url(#${lensG})`} stroke="#140805" strokeWidth="2" />
            <rect x="104" y="98" width="33" height="22" rx="10" fill={`url(#${lensG})`} stroke="#140805" strokeWidth="2" />
            <path d="M96 104 Q100 101 104 104" fill="none" stroke="#140805" strokeWidth="2" />
            <path d="M63 104 L56 102 M137 104 L144 102" stroke="#140805" strokeWidth="2" />
            <path d="M69 103 L78 101" stroke="#fff" strokeOpacity=".5" strokeWidth="2" strokeLinecap="round" />
            <path d="M110 103 L119 101" stroke="#fff" strokeOpacity=".5" strokeWidth="2" strokeLinecap="round" />
          </g>
        ) : (
          <motion.g
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
            animate={float ? { scaleY: [1, 1, 0.08, 1, 1] } : undefined}
            transition={{ duration: 5, repeat: Infinity, times: [0, 0.92, 0.95, 0.98, 1], delay: delay + 1 }}
          >
            <Eye cx={82} iris={c.iris} />
            <Eye cx={118} iris={c.iris} />
          </motion.g>
        )}

        {/* nose + lips */}
        <path d="M100 112 Q95 129 99 132 Q103 133 105 129" fill="none" stroke={c.shade} strokeOpacity=".9" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M87 146 Q100 139 113 146 Q100 157 87 146Z" fill={c.lip} />
        <path d="M87 146 Q100 150 113 146" fill="none" stroke="#000" strokeOpacity=".25" strokeWidth="1" />
        <path d="M94 144 Q100 142 106 144" fill="none" stroke="#fff" strokeOpacity=".4" strokeWidth="1.6" strokeLinecap="round" />

        <HairFront c={c} />

        {c.earring && (
          <>
            <Earring color={c.earring} side={-1} />
            <Earring color={c.earring} side={1} />
          </>
        )}
      </motion.g>
    </svg>
  );
}
