// Renders abstract cover art for each project into public/assets/projects/.
// Run: node scripts/generate-covers.mjs
// The palette matches styles/design-tokens.css (ink, paper, one red accent).
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const W = 1600;
const H = 1000;
const INK = "#0a0a0a";
const INK2 = "#141414";
const RULE = "rgba(255,255,255,0.14)";
const PAPER = "#f5f5f5";
const MUTE = "#6f6f6f";
const RED = "#ff3d2e";

const out = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "public",
  "assets",
  "projects",
);
mkdirSync(out, { recursive: true });

// Deterministic pseudo-random so covers are stable between runs.
function rng(seed) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

const frame = (
  inner,
  extra = "",
) => `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>
  <radialGradient id="glow" cx="50%" cy="50%" r="60%"><stop offset="0" stop-color="${RED}" stop-opacity="0.35"/><stop offset="1" stop-color="${RED}" stop-opacity="0"/></radialGradient>
  <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse"><path d="M80 0H0V80" fill="none" stroke="${RULE}" stroke-width="1"/></pattern>
</defs>
<rect width="${W}" height="${H}" fill="${INK}"/>
<rect width="${W}" height="${H}" fill="url(#grid)" opacity="0.55"/>
${extra}${inner}
<rect x="40" y="40" width="${W - 80}" height="${H - 80}" fill="none" stroke="${RULE}"/>
</svg>`;

const covers = {
  "gravity-playground": () => {
    const r = rng(7);
    let s = `<circle cx="800" cy="500" r="420" fill="url(#glow)"/>`;
    for (const k of [120, 210, 310, 420, 540]) {
      s += `<ellipse cx="800" cy="500" rx="${k * 1.35}" ry="${k * 0.62}" fill="none" stroke="${RULE}" transform="rotate(-18 800 500)"/>`;
    }
    for (let i = 0; i < 70; i++) {
      const a = r() * Math.PI * 2;
      const k = 120 + r() * 420;
      const x = 800 + Math.cos(a) * k * 1.35;
      const y = 500 + Math.sin(a) * k * 0.62;
      s += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${(1 + r() * 3).toFixed(1)}" fill="${PAPER}" opacity="${(0.3 + r() * 0.6).toFixed(2)}" transform="rotate(-18 800 500)"/>`;
    }
    s += `<circle cx="800" cy="500" r="46" fill="${RED}"/><circle cx="800" cy="500" r="74" fill="none" stroke="${RED}" opacity="0.6"/>`;
    s += `<path d="M300 760 C 560 540, 820 560, 1280 300" fill="none" stroke="${RED}" stroke-width="2" stroke-dasharray="6 10"/>`;
    return frame(s);
  },
  petponks: () => {
    let s = `<circle cx="1180" cy="330" r="360" fill="url(#glow)"/>`;
    s += `<rect x="260" y="240" width="520" height="520" rx="260" fill="${PAPER}"/>`;
    s += `<circle cx="1040" cy="470" r="230" fill="none" stroke="${PAPER}" stroke-width="3"/>`;
    s += `<circle cx="1040" cy="470" r="150" fill="${RED}"/>`;
    for (const [x, y, r] of [
      [520, 420, 70],
      [420, 560, 52],
      [620, 560, 52],
      [520, 640, 78],
    ]) {
      s += `<circle cx="${x}" cy="${y}" r="${r}" fill="${INK}"/>`;
    }
    s += `<rect x="860" y="760" width="460" height="14" rx="7" fill="${MUTE}"/><rect x="860" y="800" width="300" height="14" rx="7" fill="${RULE}"/>`;
    return frame(s);
  },
  "vigil-88": () => {
    let s = "";
    const cells = [
      [120, 120],
      [560, 120],
      [1000, 120],
      [120, 520],
      [560, 520],
      [1000, 520],
    ];
    cells.forEach(([x, y], i) => {
      s += `<rect x="${x}" y="${y}" width="420" height="340" fill="${INK2}" stroke="${RULE}"/>`;
      s += `<path d="M${x} ${y + 250} L${x + 140} ${y + 190} L${x + 260} ${y + 240} L${x + 420} ${y + 150}" fill="none" stroke="${MUTE}" stroke-width="2"/>`;
      s += `<circle cx="${x + 26}" cy="${y + 26}" r="6" fill="${i === 4 ? RED : MUTE}"/>`;
    });
    s += `<rect x="640" y="640" width="150" height="150" fill="none" stroke="${RED}" stroke-width="3"/>`;
    s += `<rect x="640" y="612" width="96" height="24" fill="${RED}"/>`;
    s += `<path d="M120 880 H1420" stroke="${RULE}"/><path d="M120 880 h360" stroke="${RED}" stroke-width="3"/>`;
    return frame(s);
  },
  "creative-design-collection": () => {
    let s = `<circle cx="420" cy="520" r="340" fill="url(#glow)"/>`;
    s += `<text x="150" y="700" font-family="Georgia, serif" font-size="640" fill="${PAPER}" letter-spacing="-30">Aa</text>`;
    s += `<rect x="1040" y="200" width="300" height="380" fill="${RED}"/>`;
    s += `<circle cx="1190" cy="390" r="92" fill="${INK}"/>`;
    s += `<rect x="1040" y="620" width="300" height="12" fill="${PAPER}"/><rect x="1040" y="660" width="210" height="12" fill="${MUTE}"/><rect x="1040" y="700" width="260" height="12" fill="${RULE}"/>`;
    return frame(s);
  },
  helios: () => {
    let s = `<circle cx="800" cy="470" r="460" fill="url(#glow)"/>`;
    for (let i = 0; i < 36; i++) {
      const a = (i / 36) * Math.PI * 2;
      s += `<line x1="${800 + Math.cos(a) * 190}" y1="${470 + Math.sin(a) * 190}" x2="${800 + Math.cos(a) * (i % 2 ? 300 : 360)}" y2="${470 + Math.sin(a) * (i % 2 ? 300 : 360)}" stroke="${PAPER}" stroke-width="2" opacity="0.5"/>`;
    }
    s += `<circle cx="800" cy="470" r="150" fill="${RED}"/>`;
    s += `<path d="M160 880 C 360 820, 460 560, 640 640 S 960 900, 1120 700 S 1380 560, 1440 600" fill="none" stroke="${PAPER}" stroke-width="3"/>`;
    s += `<path d="M160 880 C 360 820, 460 560, 640 640 S 960 900, 1120 700 S 1380 560, 1440 600 L1440 940 L160 940 Z" fill="${RED}" opacity="0.12"/>`;
    return frame(s);
  },
  siddhartha: () => {
    let s = `<circle cx="800" cy="500" r="420" fill="url(#glow)"/>`;
    const layers = [0.18, 0.3, 0.45, 0.65, 1];
    layers.forEach((o, i) => {
      const dx = (i - 2) * 26;
      const dy = (i - 2) * -14;
      s += `<text x="${800 + dx}" y="${700 + dy}" text-anchor="middle" font-family="Arial, sans-serif" font-weight="700" font-size="620" fill="none" stroke="${i === 4 ? RED : PAPER}" stroke-width="${i === 4 ? 3 : 1.5}" opacity="${o}">S</text>`;
    });
    s += `<circle cx="1180" cy="330" r="10" fill="${RED}"/><line x1="1180" y1="330" x2="1180" y2="150" stroke="${RED}" opacity="0.5"/>`;
    return frame(s);
  },
  orbit: () => {
    let s = `<circle cx="800" cy="500" r="120" fill="${RED}"/>`;
    s += `<circle cx="800" cy="500" r="120" fill="none" stroke="${RED}" opacity="0.5" transform="scale(1)"/>`;
    for (const k of [220, 340, 460])
      s += `<circle cx="800" cy="500" r="${k}" fill="none" stroke="${RULE}"/>`;
    const docs = [
      [800 + 220, 500],
      [800 - 340, 500],
      [800, 500 - 460],
      [800 + 240, 500 + 392],
      [800 - 240, 500 - 244],
    ];
    docs.forEach(([x, y]) => {
      s += `<rect x="${x - 46}" y="${y - 60}" width="92" height="120" fill="${INK2}" stroke="${PAPER}"/>`;
      s += `<rect x="${x - 28}" y="${y - 36}" width="56" height="6" fill="${MUTE}"/><rect x="${x - 28}" y="${y - 16}" width="40" height="6" fill="${MUTE}"/><rect x="${x - 28}" y="${y + 4}" width="48" height="6" fill="${RULE}"/>`;
      s += `<path d="M800 500 L${x} ${y}" stroke="${RULE}"/>`;
    });
    return frame(s);
  },
};

for (const [slug, draw] of Object.entries(covers)) {
  await sharp(Buffer.from(draw()))
    .png({ compressionLevel: 9 })
    .toFile(join(out, `${slug}.png`));
  console.log("wrote", slug);
}
