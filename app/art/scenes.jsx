'use client';
/* ============================================================
   DARS PLAY — original illyustratsiyalar kutubxonasi («Koshin» uslubi)
   Barcha rasmlar shu yerda qo‘lda chizilgan SVG: mualliflik huquqi muammosi yo‘q,
   internetsiz ishlaydi, proyektorda tiniq chiqadi.
   viewBox: 0 0 320 200. Har sahna ({ u }) => <g/>, u — gradient id lari uchun prefiks.
   ============================================================ */
import { useId } from 'react';

const C = {
  l1: '#182A58', l2: '#2B4C9B', l3: '#5F7FC2', l4: '#BACAE8',
  g1: '#C8962F', g2: '#DCAE4A', g3: '#F1DCA3',
  f1: '#1E6964', f2: '#2A9D8F', f3: '#7FCFC4',
  a1: '#A63E30', a2: '#C4503F', a3: '#DC7468',
  ganch: '#F4EEE2', paper: '#FBF7EF', ink: '#1B2440', sand: '#E8D5AE', sand2: '#D9BF8C',
  gr1: '#3B6E47', gr2: '#4E8A55', gr3: '#7DB06F', white: '#FFFFFF',
};

/* ---------- Umumiy bo‘laklar ---------- */
const SKIES = {
  day: ['#CFE3F0', '#FBF2DF'],
  warm: ['#F6D9A8', '#FBF2DF'],
  dusk: ['#2B4C9B', '#F1B97A'],
  night: ['#0F1838', '#2B4C9B'],
  sea: ['#BFDDEB', '#F4EEE2'],
  cold: ['#C9D8E8', '#F2F5F8'],
  plain: ['#F4EEE2', '#FBF7EF'],
  teal: ['#D2EFEA', '#FBF7EF'],
};
function Sky({ u, kind = 'day' }) {
  const [a, b] = SKIES[kind] || SKIES.day;
  return (
    <>
      <defs>
        <linearGradient id={`${u}sky`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={a} /><stop offset="1" stopColor={b} /></linearGradient>
      </defs>
      <rect width="320" height="200" fill={`url(#${u}sky)`} />
    </>
  );
}
const Sun = ({ x = 250, y = 50, r = 22, c = C.g2 }) => (
  <g>
    <circle cx={x} cy={y} r={r + 12} fill={c} opacity=".18" />
    <circle cx={x} cy={y} r={r} fill={c} />
  </g>
);
const Moon = ({ x = 250, y = 48, r = 18 }) => (
  <g>
    <circle cx={x} cy={y} r={r + 10} fill={C.g3} opacity=".15" />
    <circle cx={x} cy={y} r={r} fill={C.g3} />
    <circle cx={x + 8} cy={y - 5} r={r - 2} fill="#1A2A5C" />
  </g>
);
const Stars = ({ pts, c = C.g3 }) => (
  <g fill={c}>
    {pts.map(([x, y, r = 1.6], i) => <circle key={i} cx={x} cy={y} r={r} />)}
  </g>
);
const Star8 = ({ x, y, r = 8, c = C.g2 }) => (
  <g transform={`translate(${x} ${y})`} fill={c}>
    <rect x={-r * 0.7} y={-r * 0.7} width={r * 1.4} height={r * 1.4} transform="rotate(45)" />
    <rect x={-r * 0.7} y={-r * 0.7} width={r * 1.4} height={r * 1.4} />
  </g>
);
const Cloud = ({ x, y, s = 1, c = '#FFFFFF', o = 0.9 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} fill={c} opacity={o}>
    <ellipse cx="0" cy="0" rx="22" ry="9" />
    <ellipse cx="-12" cy="-5" rx="12" ry="9" />
    <ellipse cx="8" cy="-8" rx="14" ry="11" />
  </g>
);
const Bird = ({ x, y, s = 1, c = C.ink }) => (
  <path transform={`translate(${x} ${y}) scale(${s})`} d="M-8 0 Q -4 -5 0 0 Q 4 -5 8 0" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
);
const Poplar = ({ x, y, h = 50, c = C.gr2 }) => (
  <g>
    <rect x={x - 1.2} y={y - 6} width="2.4" height="8" fill="#7A5A3A" />
    <path d={`M${x} ${y - h} C ${x + 8} ${y - h * 0.6}, ${x + 7} ${y - 8}, ${x} ${y - 4} C ${x - 7} ${y - 8}, ${x - 8} ${y - h * 0.6}, ${x} ${y - h} Z`} fill={c} />
  </g>
);
const RoundTree = ({ x, y, r = 16, c = C.gr2, trunk = '#7A5A3A' }) => (
  <g>
    <rect x={x - 2} y={y - r * 0.4} width="4" height={r * 0.9} fill={trunk} />
    <circle cx={x} cy={y - r} r={r} fill={c} />
    <circle cx={x - r * 0.45} cy={y - r * 1.25} r={r * 0.45} fill="#FFFFFF" opacity=".12" />
  </g>
);
const Ground = ({ y = 160, c = C.gr3, c2 = C.gr2 }) => (
  <g>
    <path d={`M0 ${y} Q 80 ${y - 14} 160 ${y - 4} T 320 ${y - 8} V200 H0 Z`} fill={c} />
    <path d={`M0 ${y + 18} Q 100 ${y + 6} 200 ${y + 16} T 320 ${y + 12} V200 H0 Z`} fill={c2} />
  </g>
);
const Mountains = ({ c1 = C.l3, c2 = C.l2, snow = true, y = 150 }) => (
  <g>
    <path d={`M-10 ${y} L60 ${y - 70} L110 ${y - 30} L170 ${y - 95} L230 ${y - 40} L270 ${y - 70} L330 ${y} Z`} fill={c1} opacity=".55" />
    <path d={`M-10 ${y} L40 ${y - 45} L90 ${y - 15} L150 ${y - 70} L210 ${y - 20} L260 ${y - 50} L330 ${y} Z`} fill={c2} />
    {snow && <path d={`M150 ${y - 70} L162 ${y - 56} L155 ${y - 58} L148 ${y - 50} L142 ${y - 58} L136 ${y - 55} Z`} fill="#FFFFFF" opacity=".9" />}
    {snow && <path d={`M260 ${y - 50} L270 ${y - 40} L263 ${y - 41} L257 ${y - 36} L252 ${y - 41} Z`} fill="#FFFFFF" opacity=".85" />}
  </g>
);
const Dome = ({ x, y, w = 30, c = C.f2 }) => (
  <g>
    <path d={`M${x - w / 2} ${y} C ${x - w / 2} ${y - w * 0.9}, ${x + w / 2} ${y - w * 0.9}, ${x + w / 2} ${y} Z`} fill={c} />
    <path d={`M${x - w / 2} ${y} C ${x - w / 2} ${y - w * 0.9}, ${x + w / 2} ${y - w * 0.9}, ${x + w / 2} ${y} Z`} fill="none" stroke="#FFFFFF" strokeOpacity=".35" strokeWidth="1" strokeDasharray="2 3" />
    <rect x={x - 0.8} y={y - w * 0.8} width="1.6" height="8" fill={C.g2} />
  </g>
);
const Minaret = ({ x, y, h = 80, w = 10 }) => (
  <g>
    <rect x={x - w / 2} y={y - h} width={w} height={h} fill={C.sand} />
    {[0.25, 0.5, 0.75].map((t) => <rect key={t} x={x - w / 2} y={y - h * t} width={w} height="3" fill={C.f2} />)}
    <rect x={x - w / 2 - 2} y={y - h - 4} width={w + 4} height="5" fill={C.sand2} />
    <path d={`M${x - w / 2} ${y - h - 4} Q ${x} ${y - h - 16} ${x + w / 2} ${y - h - 4} Z`} fill={C.f2} />
  </g>
);
const Portal = ({ x, y, w = 60, h = 70 }) => (
  <g>
    <rect x={x - w / 2} y={y - h} width={w} height={h} fill={C.sand} />
    <rect x={x - w / 2} y={y - h} width={w} height={h} fill="none" stroke={C.l2} strokeWidth="3" />
    <path d={`M${x - w * 0.3} ${y} V${y - h * 0.55} Q ${x} ${y - h * 0.95} ${x + w * 0.3} ${y - h * 0.55} V${y} Z`} fill={C.l2} />
    <path d={`M${x - w * 0.22} ${y} V${y - h * 0.5} Q ${x} ${y - h * 0.82} ${x + w * 0.22} ${y - h * 0.5} V${y} Z`} fill={C.f2} opacity=".7" />
    <Star8 x={x} y={y - h * 0.48} r={5} c={C.g2} />
  </g>
);
const Person = ({ x, y, s = 1, c = C.l2, skin = '#D9A47A', head = null }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-10 0 C -10 -18, 10 -18, 10 0 Z" fill={c} />
    <circle cx="0" cy="-24" r="7" fill={skin} />
    {head === 'doppi' && <path d="M-7 -27 Q 0 -36 7 -27 Z" fill={C.ink} />}
    {head === 'ro‘mol' && <path d="M-8.5 -22 C -10 -36, 10 -36, 8.5 -22 L 9 -12 L -9 -12 Z" fill={C.a2} opacity=".95" />}
    {head === 'ro‘mol' && <circle cx="0" cy="-24" r="5.5" fill={skin} />}
  </g>
);
const Book = ({ x, y, w = 120, c = C.l2, page = C.paper }) => (
  <g transform={`translate(${x} ${y})`}>
    <path d={`M${-w / 2 - 4} 4 L ${-w / 2 - 4} -${w * 0.42} Q -10 -${w * 0.47} 0 -${w * 0.4} Q 10 -${w * 0.47} ${w / 2 + 4} -${w * 0.42} L ${w / 2 + 4} 4 Q 10 -2 0 6 Q -10 -2 ${-w / 2 - 4} 4 Z`} fill={c} />
    <path d={`M${-w / 2} 0 L ${-w / 2} -${w * 0.42} Q -12 -${w * 0.46} 0 -${w * 0.38} L 0 2 Q -12 -6 ${-w / 2} 0 Z`} fill={page} />
    <path d={`M${w / 2} 0 L ${w / 2} -${w * 0.42} Q 12 -${w * 0.46} 0 -${w * 0.38} L 0 2 Q 12 -6 ${w / 2} 0 Z`} fill="#FFFFFF" />
    {[0.12, 0.2, 0.28].map((t, i) => (
      <g key={i} stroke={C.l4} strokeWidth="1.6" strokeLinecap="round">
        <path d={`M${-w * 0.42} -${w * t} Q ${-w * 0.25} -${w * (t + 0.02)} ${-w * 0.08} -${w * (t - 0.01)}`} fill="none" />
        <path d={`M${w * 0.08} -${w * (t - 0.01)} Q ${w * 0.25} -${w * (t + 0.02)} ${w * 0.42} -${w * t}`} fill="none" />
      </g>
    ))}
  </g>
);
const Horse = ({ x, y, s = 1, c = '#8A5A3B', mane = C.ink }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-34 -30 C -40 -40, -22 -46, -8 -40 L 20 -40 C 28 -40, 30 -48, 30 -56 L 34 -64 L 38 -58 L 46 -54 L 44 -46 L 36 -44 C 34 -36, 34 -30, 30 -26 L 30 0 L 25 0 L 24 -22 L -18 -22 L -22 0 L -27 0 L -28 -24 C -32 -26, -34 -28, -34 -30 Z" fill={c} />
    <path d="M30 -56 C 22 -54, 20 -46, 18 -40 L 22 -40 C 24 -46, 28 -50, 34 -52 Z" fill={mane} />
    <path d="M-34 -30 C -44 -28, -46 -18, -44 -10 C -40 -18, -38 -24, -32 -26 Z" fill={mane} />
    <path d="M-14 -22 L -16 0 L -12 0 L -9 -22 Z M 14 -22 L 16 0 L 20 0 L 19 -22 Z" fill={c} opacity=".85" />
  </g>
);
const Camel = ({ x, y, s = 1, c = '#C9A06A' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} fill={c}>
    <path d="M-30 -20 C -32 -34, -18 -44, -10 -30 C -6 -46, 8 -46, 12 -30 L 22 -30 C 26 -30, 26 -42, 30 -48 L 36 -48 L 38 -44 L 34 -42 C 32 -34, 32 -24, 26 -20 L 24 0 L 20 0 L 18 -16 L -18 -16 L -20 0 L -24 0 L -24 -16 C -28 -16, -30 -18, -30 -20 Z" />
    <rect x="-8" y="-16" width="3.5" height="16" />
    <rect x="8" y="-16" width="3.5" height="16" />
  </g>
);
const Wave = ({ y, c = C.l3, o = 1, amp = 5 }) => (
  <path d={`M0 ${y} Q 20 ${y - amp} 40 ${y} T 80 ${y} T 120 ${y} T 160 ${y} T 200 ${y} T 240 ${y} T 280 ${y} T 320 ${y} V200 H0 Z`} fill={c} opacity={o} />
);
const Flower = ({ x, y, c = C.a2, r = 6, center = C.g2 }) => (
  <g transform={`translate(${x} ${y})`}>
    {[0, 72, 144, 216, 288].map((a) => <ellipse key={a} cx="0" cy={-r} rx={r * 0.55} ry={r} fill={c} transform={`rotate(${a})`} />)}
    <circle r={r * 0.45} fill={center} />
  </g>
);
const Lola = ({ x, y, h = 26, c = C.a2 }) => (
  <g>
    <path d={`M${x} ${y} Q ${x - 2} ${y - h * 0.5} ${x} ${y - h}`} stroke={C.gr1} strokeWidth="2" fill="none" />
    <path d={`M${x} ${y - h * 0.3} Q ${x + 9} ${y - h * 0.5} ${x + 10} ${y - h * 0.75} Q ${x + 3} ${y - h * 0.55} ${x} ${y - h * 0.35} Z`} fill={C.gr2} />
    <path d={`M${x - 6} ${y - h - 10} Q ${x - 7} ${y - h + 2} ${x} ${y - h + 1} Q ${x + 7} ${y - h + 2} ${x + 6} ${y - h - 10} L ${x + 3} ${y - h - 5} L ${x} ${y - h - 12} L ${x - 3} ${y - h - 5} Z`} fill={c} />
  </g>
);
const Frame = () => (
  <rect x="1" y="1" width="318" height="198" rx="14" fill="none" stroke="#FFFFFF" strokeOpacity=".5" strokeWidth="2" />
);

/* ============================================================
   SAHNALAR
   ============================================================ */
export const SCENES = {
  /* Ona yurt: tog‘lar, dala, teraklar, quyosh */
  vatan: ({ u }) => (
    <g>
      <Sky u={u} kind="warm" />
      <Sun x={240} y={58} r={24} />
      <Cloud x={70} y={40} s={1.1} />
      <Mountains />
      <Ground y={150} />
      <path d="M0 175 Q 160 150 320 178" stroke={C.l3} strokeWidth="6" fill="none" opacity=".7" />
      {[30, 44, 58, 262, 276, 290].map((x, i) => <Poplar key={x} x={x} y={156 - (i % 2) * 2} h={46 + (i % 3) * 6} c={i % 2 ? C.gr1 : C.gr2} />)}
      <Bird x={130} y={52} /><Bird x={146} y={44} s={0.8} />
    </g>
  ),

  /* Registon: uch peshtoq, gumbaz va minoralar */
  registon: ({ u }) => (
    <g>
      <Sky u={u} kind="warm" />
      <Sun x={262} y={44} r={16} />
      <Cloud x={60} y={36} s={0.9} />
      <rect x="0" y="168" width="320" height="32" fill={C.sand2} />
      <rect x="0" y="164" width="320" height="6" fill={C.sand} />
      <Minaret x={40} y={166} h={96} />
      <Minaret x={280} y={166} h={96} />
      <Portal x={78} y={166} w={56} h={74} />
      <Portal x={242} y={166} w={56} h={74} />
      <Dome x={160} y={92} w={46} />
      <Portal x={160} y={166} w={78} h={84} />
      <Minaret x={116} y={166} h={70} w={8} />
      <Minaret x={204} y={166} h={70} w={8} />
    </g>
  ),

  /* Tarixiy shahar / madrasa (kichik) */
  madrasa: ({ u }) => (
    <g>
      <Sky u={u} kind="day" />
      <Cloud x={240} y={40} />
      <Ground y={168} c={C.sand} c2={C.sand2} />
      <Dome x={120} y={98} w={52} c={C.l2} />
      <Portal x={160} y={170} w={110} h={76} />
      <Dome x={210} y={102} w={34} />
      <Minaret x={92} y={170} h={92} w={10} />
      <Minaret x={228} y={170} h={92} w={10} />
      <Poplar x={40} y={172} h={50} /><Poplar x={286} y={172} h={54} c={C.gr1} />
    </g>
  ),

  /* Ochiq kitob va nur */
  kitob: ({ u }) => (
    <g>
      <Sky u={u} kind="plain" />
      <circle cx="160" cy="92" r="70" fill={C.g3} opacity=".45" />
      {[...Array(12)].map((_, i) => <rect key={i} x="159" y="10" width="2" height="34" fill={C.g2} opacity=".5" transform={`rotate(${i * 30} 160 92)`} />)}
      <Book x={160} y={160} w={170} />
      <Star8 x={160} y={58} r={10} />
      <Star8 x={92} y={44} r={5} c={C.f2} /><Star8 x={232} y={50} r={6} c={C.a3} />
    </g>
  ),

  /* Qalam, siyohdon va varaq — yozish */
  qalam: ({ u }) => (
    <g>
      <Sky u={u} kind="teal" />
      <rect x="62" y="34" width="150" height="140" rx="6" fill="#FFFFFF" transform="rotate(-6 137 104)" />
      <g transform="rotate(-6 137 104)" stroke={C.l4} strokeWidth="2" strokeLinecap="round">
        {[60, 76, 92, 108, 124, 140].map((y, i) => <line key={y} x1="80" y1={y} x2={i === 5 ? 150 : 194} y2={y} />)}
      </g>
      <path d="M262 30 C 230 60, 196 104, 182 150 L 188 152 C 206 108, 240 66, 270 38 Z" fill={C.g2} />
      <path d="M182 150 L 178 166 L 188 152 Z" fill={C.ink} />
      <path d="M262 30 C 250 48, 236 62, 222 78" stroke="#FFFFFF" strokeOpacity=".6" strokeWidth="1.5" fill="none" />
      <rect x="226" y="146" width="44" height="30" rx="6" fill={C.l2} />
      <rect x="236" y="138" width="24" height="10" rx="3" fill={C.l1} />
      <ellipse cx="248" cy="139" rx="9" ry="2.5" fill={C.ink} />
    </g>
  ),

  /* Maktub — konvert va muhr */
  maktub: ({ u }) => (
    <g>
      <Sky u={u} kind="warm" />
      <rect x="70" y="50" width="180" height="116" rx="8" fill={C.paper} />
      <path d="M70 58 L 160 122 L 250 58" fill="none" stroke={C.sand2} strokeWidth="3" />
      <path d="M70 166 L 140 112 M 250 166 L 180 112" stroke={C.sand} strokeWidth="2.5" />
      <circle cx="160" cy="118" r="16" fill={C.a2} />
      <Star8 x={160} y={118} r={7} c={C.g3} />
      <path d="M268 40 C 250 54, 240 70, 236 90" stroke={C.g1} strokeWidth="3" fill="none" strokeLinecap="round" />
      <Bird x={46} y={48} c={C.l2} /><Bird x={276} y={150} s={0.8} c={C.l2} />
    </g>
  ),

  /* She’r: gul va bulbul, oy */
  sher: ({ u }) => (
    <g>
      <Sky u={u} kind="dusk" />
      <Moon x={252} y={48} />
      <Stars pts={[[40, 30], [80, 50], [120, 24], [190, 36], [292, 86, 1.2]]} />
      <path d="M40 200 C 60 150, 110 130, 150 150" stroke={C.gr1} strokeWidth="4" fill="none" />
      <path d="M150 150 C 180 140, 210 150, 230 130" stroke={C.gr1} strokeWidth="3" fill="none" />
      <path d="M96 140 Q 110 124 122 138 Q 108 146 96 140 Z" fill={C.gr2} />
      <path d="M182 146 Q 196 132 208 144 Q 194 152 182 146 Z" fill={C.gr2} />
      <g transform="translate(232 124)">
        {[0, 60, 120, 180, 240, 300].map((a) => <ellipse key={a} cx="0" cy="-9" rx="7" ry="10" fill={C.a2} transform={`rotate(${a})`} />)}
        <circle r="7" fill={C.a1} />
      </g>
      <g transform="translate(150 138)">
        <ellipse cx="0" cy="0" rx="13" ry="8" fill={C.sand2} />
        <circle cx="10" cy="-6" r="6" fill={C.sand2} />
        <path d="M15 -6 L 21 -5 L 15 -3 Z" fill={C.g1} />
        <circle cx="11" cy="-7" r="1.3" fill={C.ink} />
        <path d="M-12 -2 L -24 -8 L -20 2 Z" fill="#B58F5C" />
      </g>
    </g>
  ),

  /* Doston: chavandoz, kamon, cho‘l */
  doston: ({ u }) => (
    <g>
      <Sky u={u} kind="warm" />
      <Sun x={70} y={60} r={26} c={C.a3} />
      <path d="M0 150 Q 80 130 160 146 T 320 140 V200 H0 Z" fill={C.sand} />
      <path d="M0 170 Q 120 160 200 172 T 320 168 V200 H0 Z" fill={C.sand2} />
      <Horse x={170} y={170} s={1.35} />
      <g transform="translate(182 110)">
        <path d="M-10 0 C -12 -18, 10 -18, 10 0 L 8 14 L -8 14 Z" fill={C.l2} />
        <circle cx="0" cy="-24" r="7" fill="#C98E62" />
        <path d="M-8 -26 Q 0 -40 8 -26 Z" fill={C.a2} />
        <path d="M14 -34 Q 30 -14 14 6" stroke={C.ink} strokeWidth="2" fill="none" />
        <line x1="14" y1="-34" x2="14" y2="6" stroke={C.g1} strokeWidth="1" />
        <path d="M8 -8 L 14 -14" stroke={C.l1} strokeWidth="3" strokeLinecap="round" />
      </g>
      <path d="M150 104 C 130 96, 118 104, 108 118" stroke={C.a2} strokeWidth="4" fill="none" strokeLinecap="round" />
    </g>
  ),

  /* Dombira va baxshi kuyi */
  dombra: ({ u }) => (
    <g>
      <Sky u={u} kind="teal" />
      <g transform="rotate(-28 160 110)">
        <ellipse cx="160" cy="150" rx="34" ry="40" fill="#A9703F" />
        <ellipse cx="160" cy="150" rx="27" ry="33" fill="#C48A52" />
        <circle cx="160" cy="146" r="8" fill="#6B4422" />
        <rect x="155" y="20" width="10" height="100" rx="3" fill="#8A5A30" />
        <rect x="152" y="12" width="16" height="16" rx="4" fill="#6B4422" />
        <line x1="158" y1="24" x2="158" y2="178" stroke={C.g3} strokeWidth="1" />
        <line x1="162" y1="24" x2="162" y2="178" stroke={C.g3} strokeWidth="1" />
        <rect x="150" y="176" width="20" height="4" fill={C.ink} />
      </g>
      {[[70, 70], [240, 60], [256, 120], [60, 140]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`} fill={i % 2 ? C.l2 : C.f2}>
          <ellipse cx="0" cy="10" rx="6" ry="4.5" transform="rotate(-20 0 10)" />
          <rect x="4.5" y="-14" width="2" height="24" />
          <path d="M6.5 -14 Q 16 -8 12 2 Q 12 -6 6.5 -8 Z" />
        </g>
      ))}
    </g>
  ),

  /* Teatr: parda, niqoblar, sahna */
  teatr: ({ u }) => (
    <g>
      <Sky u={u} kind="night" />
      <rect x="20" y="150" width="280" height="50" fill="#6B4422" />
      <rect x="20" y="150" width="280" height="6" fill="#8A5A30" />
      <ellipse cx="160" cy="150" rx="90" ry="12" fill={C.g3} opacity=".25" />
      <path d="M0 0 H 120 C 110 50, 90 100, 70 150 H 0 Z" fill={C.a2} />
      <path d="M320 0 H 200 C 210 50, 230 100, 250 150 H 320 Z" fill={C.a2} />
      <path d="M0 0 H 320 V 22 Q 280 34 240 22 Q 200 34 160 22 Q 120 34 80 22 Q 40 34 0 22 Z" fill={C.a1} />
      <path d="M30 10 C 40 60, 46 110, 40 150 M 290 10 C 280 60, 274 110, 280 150" stroke={C.a1} strokeWidth="3" fill="none" />
      <g transform="translate(138 92) rotate(-12)">
        <path d="M-20 -22 Q 0 -30 20 -22 Q 22 10 0 22 Q -22 10 -20 -22 Z" fill={C.g3} />
        <path d="M-12 -8 Q -7 -12 -3 -8 M 3 -8 Q 7 -12 12 -8" stroke={C.ink} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M-9 6 Q 0 14 9 6" stroke={C.ink} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </g>
      <g transform="translate(184 100) rotate(12)">
        <path d="M-20 -22 Q 0 -30 20 -22 Q 22 10 0 22 Q -22 10 -20 -22 Z" fill={C.f3} />
        <path d="M-12 -6 Q -7 -10 -3 -6 M 3 -6 Q 7 -10 12 -6" stroke={C.ink} strokeWidth="2.5" fill="none" strokeLinecap="round" transform="rotate(180 0 -7)" />
        <path d="M-9 12 Q 0 4 9 12" stroke={C.ink} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </g>
    </g>
  ),

  /* Ulug‘bek rasadxonasi va yulduzli osmon */
  rasadxona: ({ u }) => (
    <g>
      <Sky u={u} kind="night" />
      <Stars pts={[[30, 30], [62, 54, 1.2], [96, 22], [140, 44, 1.2], [200, 20], [226, 52], [270, 30, 2], [300, 64, 1.2], [180, 70, 1]]} />
      <path d="M150 44 L 200 20 L 226 52 L 270 30" stroke={C.g3} strokeOpacity=".4" strokeWidth="1" fill="none" />
      <Moon x={58} y={70} r={12} />
      <rect x="0" y="176" width="320" height="24" fill="#2A3A6A" />
      <path d="M80 176 V 120 Q 160 70 240 120 V 176 Z" fill={C.sand} />
      <path d="M80 120 Q 160 70 240 120" fill="none" stroke={C.f2} strokeWidth="6" />
      {[100, 130, 160, 190, 220].map((x) => <path key={x} d={`M${x - 8} 176 V 146 Q ${x} 134 ${x + 8} 146 V 176 Z`} fill={C.l2} />)}
      <path d="M160 176 C 160 140, 196 118, 230 118" stroke={C.g2} strokeWidth="3" fill="none" />
      <path d="M160 176 C 160 150, 186 134, 214 132" stroke={C.g2} strokeWidth="2" fill="none" opacity=".6" />
    </g>
  ),

  /* Koinot: raketa, sayyora, yo‘ldosh */
  kosmos: ({ u }) => (
    <g>
      <Sky u={u} kind="night" />
      <Stars pts={[[20, 20], [50, 70, 1.2], [90, 30], [130, 90, 1], [200, 24], [240, 80, 1.2], [290, 40], [300, 150], [30, 160, 1.2], [110, 170]]} />
      <circle cx="250" cy="150" r="36" fill={C.a3} />
      <path d="M216 156 Q 250 140 286 146" stroke={C.a1} strokeWidth="5" opacity=".5" fill="none" />
      <ellipse cx="250" cy="150" rx="56" ry="11" fill="none" stroke={C.g3} strokeWidth="3" transform="rotate(-14 250 150)" />
      <g transform="translate(120 104) rotate(35)">
        <path d="M0 -50 C 16 -36, 16 0, 12 20 L -12 20 C -16 0, -16 -36, 0 -50 Z" fill={C.paper} />
        <circle cx="0" cy="-14" r="7" fill={C.l2} stroke={C.l4} strokeWidth="2" />
        <path d="M-12 6 L -24 26 L -12 22 Z M 12 6 L 24 26 L 12 22 Z" fill={C.a2} />
        <path d="M-8 20 Q 0 46 8 20 Z" fill={C.g2} />
        <path d="M-4 20 Q 0 34 4 20 Z" fill={C.g3} />
      </g>
      <g transform="translate(60 54) rotate(-20)">
        <rect x="-6" y="-6" width="12" height="12" fill={C.g2} />
        <rect x="-26" y="-4" width="17" height="8" fill={C.l3} /><rect x="9" y="-4" width="17" height="8" fill={C.l3} />
      </g>
    </g>
  ),

  /* Robot / sun’iy intellekt */
  robot: ({ u }) => (
    <g>
      <Sky u={u} kind="teal" />
      <g stroke={C.f2} strokeWidth="1.5" opacity=".5" fill="none">
        <path d="M20 40 H 70 V 80 H 100" /><path d="M300 50 H 250 V 100 H 230" /><path d="M20 160 H 60 V 130" /><path d="M300 170 H 260 V 140" />
      </g>
      {[[100, 80], [230, 100], [60, 130], [260, 140]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="3.5" fill={C.f2} />)}
      <rect x="118" y="150" width="84" height="44" rx="12" fill={C.l2} />
      <rect x="146" y="140" width="28" height="12" fill={C.l3} />
      <rect x="112" y="58" width="96" height="84" rx="22" fill={C.paper} stroke={C.l2} strokeWidth="4" />
      <rect x="126" y="76" width="68" height="40" rx="12" fill={C.l1} />
      <circle cx="146" cy="96" r="7" fill={C.f3} /><circle cx="174" cy="96" r="7" fill={C.f3} />
      <path d="M150 126 Q 160 132 170 126" stroke={C.l2} strokeWidth="3" fill="none" strokeLinecap="round" />
      <line x1="160" y1="58" x2="160" y2="40" stroke={C.l2} strokeWidth="4" />
      <circle cx="160" cy="36" r="6" fill={C.a2} />
      <rect x="104" y="86" width="8" height="24" rx="3" fill={C.g2} /><rect x="208" y="86" width="8" height="24" rx="3" fill={C.g2} />
      <rect x="150" y="162" width="20" height="20" rx="4" fill={C.g2} />
    </g>
  ),

  /* Dron va shahar */
  dron: ({ u }) => (
    <g>
      <Sky u={u} kind="day" />
      <Cloud x={60} y={44} /><Cloud x={262} y={30} s={0.8} />
      {[[10, 120, 40], [56, 100, 36], [98, 130, 30], [134, 90, 40], [180, 116, 34], [220, 96, 38], [264, 126, 30], [290, 104, 36]].map(([x, y, w], i) => (
        <g key={i}>
          <rect x={x} y={y} width={w} height={200 - y} fill={i % 2 ? C.l3 : C.l4} />
          {[...Array(Math.floor((200 - y) / 16))].map((_, k) => <rect key={k} x={x + 6} y={y + 8 + k * 16} width={w - 12} height="5" fill="#FFFFFF" opacity=".55" />)}
        </g>
      ))}
      <g transform="translate(170 62)">
        <rect x="-18" y="-6" width="36" height="14" rx="6" fill={C.ink} />
        <line x1="-34" y1="-10" x2="-12" y2="-2" stroke={C.ink} strokeWidth="3" /><line x1="34" y1="-10" x2="12" y2="-2" stroke={C.ink} strokeWidth="3" />
        <ellipse cx="-36" cy="-12" rx="14" ry="2.5" fill={C.l3} /><ellipse cx="36" cy="-12" rx="14" ry="2.5" fill={C.l3} />
        <circle cx="0" cy="12" r="4" fill={C.a2} />
        <rect x="-8" y="16" width="16" height="12" rx="2" fill={C.g2} />
      </g>
    </g>
  ),

  /* Tabiat: daryo, o‘rmon, qushlar */
  tabiat: ({ u }) => (
    <g>
      <Sky u={u} kind="day" />
      <Sun x={64} y={48} r={18} />
      <Cloud x={220} y={36} />
      <Mountains c1={C.f3} c2={C.f2} snow={false} y={140} />
      <path d="M0 140 H 320 V 200 H 0 Z" fill={C.gr3} />
      <path d="M140 140 C 120 160, 200 170, 150 200 H 210 C 250 170, 170 160, 180 140 Z" fill={C.l3} />
      <path d="M152 160 Q 165 158 176 162 M 160 180 Q 175 178 190 182" stroke="#FFFFFF" strokeWidth="2" opacity=".7" fill="none" />
      {[30, 60, 92, 230, 262, 296].map((x, i) => <RoundTree key={x} x={x} y={150 + (i % 2) * 14} r={14 + (i % 3) * 3} c={i % 2 ? C.gr1 : C.gr2} />)}
      <Flower x={110} y={186} r={4} /><Flower x={250} y={190} r={4} c={C.g2} center={C.a2} />
      <Bird x={196} y={70} /><Bird x={212} y={62} s={0.8} />
    </g>
  ),

  /* Shahar bog‘i / yashil o‘pka */
  bog: ({ u }) => (
    <g>
      <Sky u={u} kind="day" />
      {[[0, 90, 40], [44, 70, 34], [250, 80, 36], [290, 100, 30]].map(([x, y, w], i) => <rect key={i} x={x} y={y} width={w} height={120} fill={C.l4} />)}
      <path d="M0 140 Q 160 120 320 140 V200 H0 Z" fill={C.gr3} />
      {[100, 140, 180, 220].map((x, i) => <RoundTree key={x} x={x} y={150 - (i % 2) * 6} r={22 - (i % 2) * 4} c={i % 2 ? C.gr1 : C.gr2} />)}
      <path d="M60 200 Q 160 150 260 200" fill={C.sand} />
      <rect x="140" y="160" width="40" height="5" rx="2" fill="#8A5A30" /><rect x="144" y="165" width="3" height="8" fill="#6B4422" /><rect x="173" y="165" width="3" height="8" fill="#6B4422" />
      <Flower x={84} y={178} r={4} /><Flower x={236} y={180} r={4} c={C.g2} center={C.a2} /><Flower x={210} y={190} r={3.5} c="#FFFFFF" />
    </g>
  ),

  /* Bahor: gullagan olcha, chug‘urchuq */
  bahor: ({ u }) => (
    <g>
      <Sky u={u} kind="day" />
      <Ground y={168} />
      <path d="M150 200 C 150 160, 140 130, 120 110 M 148 150 C 170 130, 190 120, 220 112 M 140 132 C 120 120, 100 100, 80 96" stroke="#7A4E2E" strokeWidth="7" fill="none" strokeLinecap="round" />
      {[[120, 100, 30], [86, 88, 24], [176, 108, 28], [220, 104, 24], [150, 80, 30], [110, 70, 20], [196, 80, 22]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} fill={i % 2 ? '#F7C9CF' : '#FBE0E3'} />)}
      {[[100, 92], [140, 70], [180, 96], [210, 90], [124, 110], [160, 96], [90, 76]].map(([x, y], i) => <Flower key={i} x={x} y={y} r={4} c="#FFFFFF" center={C.a3} />)}
      {[[60, 150], [250, 160], [280, 140], [40, 120]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2.5" fill="#F7C9CF" />)}
      <Bird x={260} y={50} /><Bird x={276} y={42} s={0.8} />
    </g>
  ),

  /* Na’matak / gul — tabiat lirikasi */
  gul: ({ u }) => (
    <g>
      <Sky u={u} kind="warm" />
      <path d="M0 200 L 0 120 L 70 90 L 120 130 L 180 110 L 200 200 Z" fill={C.sand2} />
      <path d="M0 200 L 0 140 L 60 116 L 100 150 L 160 136 L 180 200 Z" fill="#C6A876" />
      <path d="M150 120 C 170 90, 200 80, 230 70" stroke={C.gr1} strokeWidth="3" fill="none" />
      {[[168, 100], [194, 82], [222, 72]].map(([x, y], i) => <Flower key={i} x={x} y={y} r={8 - i} c="#F2A7B5" center={C.g2} />)}
      <path d="M180 92 Q 188 84 196 92 Q 188 98 180 92 Z" fill={C.gr2} /><path d="M206 78 Q 214 70 222 78 Q 214 84 206 78 Z" fill={C.gr2} />
      <Sun x={268} y={46} r={16} />
      <Bird x={84} y={50} />
    </g>
  ),

  /* Chinor: ming yillik daraxt */
  chinor: ({ u }) => (
    <g>
      <Sky u={u} kind="warm" />
      <Ground y={170} />
      <path d="M144 200 C 146 160, 140 140, 132 118 L 150 120 L 160 96 L 170 120 L 190 116 C 180 140, 174 160, 178 200 Z" fill="#7A4E2E" />
      {[[100, 92, 36], [160, 64, 46], [220, 92, 36], [130, 112, 28], [196, 114, 28], [160, 104, 30]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} fill={i % 2 ? C.gr1 : C.gr2} />)}
      {[[112, 80], [176, 52], [214, 86], [150, 96]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="8" fill="#FFFFFF" opacity=".12" />)}
      <Person x={230} y={186} s={0.8} c={C.l2} head="doppi" />
      <path d="M244 186 L 248 160" stroke="#6B4422" strokeWidth="2.5" />
    </g>
  ),

  /* Qushlar parvozi */
  qushlar: ({ u }) => (
    <g>
      <Sky u={u} kind="day" />
      <Sun x={250} y={58} r={20} />
      <Cloud x={80} y={60} s={1.2} /><Cloud x={200} y={110} s={0.8} o={0.7} />
      <Ground y={176} />
      {[[60, 120, 1.6], [90, 104, 1.3], [120, 90, 1.5], [150, 80, 1.2], [178, 68, 1.4], [206, 60, 1.1], [130, 120, 1], [100, 140, 1.1]].map(([x, y, s], i) => <Bird key={i} x={x} y={y} s={s} c={i % 3 ? C.l1 : C.a1} />)}
    </g>
  ),

  /* Dengiz: kema va chorloq */
  dengiz: ({ u }) => (
    <g>
      <Sky u={u} kind="sea" />
      <Sun x={70} y={66} r={20} />
      <Wave y={130} c={C.l3} o={0.6} />
      <Wave y={144} c={C.l2} amp={6} />
      <Wave y={168} c={C.l1} amp={5} />
      <g transform="translate(200 132)">
        <path d="M-46 0 L 46 0 L 34 18 L -34 18 Z" fill={C.paper} />
        <rect x="-46" y="-2" width="92" height="4" fill={C.a2} />
        <rect x="-1.5" y="-70" width="3" height="68" fill="#6B4422" />
        <path d="M2 -66 L 40 -8 L 2 -8 Z" fill="#FFFFFF" />
        <path d="M-2 -60 L -34 -8 L -2 -8 Z" fill={C.paper} />
      </g>
      <path d="M100 60 Q 110 50 120 60 Q 130 50 140 60" stroke={C.ink} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <Bird x={260} y={40} s={1.2} />
    </g>
  ),

  /* Bug‘u: tog‘ o‘rmoni */
  bugu: ({ u }) => (
    <g>
      <Sky u={u} kind="cold" />
      <Mountains c1={C.l4} c2={C.l3} />
      <path d="M0 150 H 320 V 200 H 0 Z" fill="#E8EEF3" />
      {[24, 50, 276, 300].map((x, i) => (
        <path key={x} d={`M${x} ${100 + (i % 2) * 10} L ${x + 14} 150 L ${x - 14} 150 Z`} fill={C.f1} />
      ))}
      <g transform="translate(160 160)">
        <path d="M-34 -26 C -36 -40, -10 -44, 18 -40 C 26 -40, 30 -48, 32 -58 L 40 -60 L 42 -50 C 40 -42, 36 -34, 30 -28 L 30 0 L 25 0 L 24 -20 L -18 -20 L -22 0 L -27 0 L -28 -22 C -32 -22, -34 -24, -34 -26 Z" fill="#B07A4B" />
        <path d="M34 -60 L 30 -76 L 24 -82 M 30 -76 L 38 -84 M 40 -60 L 46 -76 L 42 -86 M 46 -76 L 54 -80 M 32 -70 L 22 -72 M 44 -70 L 52 -68" stroke="#7A4E2E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <circle cx="38" cy="-52" r="1.5" fill={C.ink} />
        <path d="M-18 -30 Q 0 -26 18 -32" stroke="#FFFFFF" strokeOpacity=".4" strokeWidth="3" fill="none" />
      </g>
    </g>
  ),

  /* Tulki: kuzgi o‘rmon */
  tulki: ({ u }) => (
    <g>
      <Sky u={u} kind="warm" />
      <Ground y={160} c={C.g3} c2={C.sand2} />
      {[[40, 150, 22, '#D9893B'], [80, 140, 18, C.g2], [262, 146, 24, C.a3], [298, 156, 18, '#D9893B']].map(([x, y, r, c], i) => <RoundTree key={i} x={x} y={y} r={r} c={c} />)}
      <g transform="translate(160 170)">
        <path d="M-40 -14 C -60 -40, -76 -10, -50 -4 C -46 -2, -42 -6, -40 -10 Z" fill="#D9732E" />
        <path d="M-60 -24 C -66 -22, -66 -12, -58 -8 Z" fill="#FFFFFF" />
        <path d="M-40 -10 C -40 -30, 10 -34, 22 -22 L 22 0 L 17 0 L 15 -12 L -24 -12 L -28 0 L -33 0 L -34 -12 C -38 -12, -40 -10, -40 -10 Z" fill="#E07B35" />
        <path d="M14 -24 L 40 -36 L 30 -18 Z" fill="#E07B35" />
        <path d="M22 -30 L 26 -46 L 32 -32 Z M 30 -33 L 38 -46 L 38 -30 Z" fill="#C9632A" />
        <path d="M30 -22 L 40 -36 L 42 -24 Z" fill="#FFFFFF" />
        <circle cx="31" cy="-30" r="1.6" fill={C.ink} /><circle cx="42" cy="-25" r="1.6" fill={C.ink} />
      </g>
      {[[120, 90], [200, 70], [236, 110]].map(([x, y], i) => <path key={i} d={`M${x} ${y} q 6 -4 10 0 q -4 6 -10 0 Z`} fill={i % 2 ? C.a3 : C.g2} transform={`rotate(${i * 40} ${x} ${y})`} />)}
    </g>
  ),

  /* Sahro: yulduzli tun, qum barxanlari, samolyot */
  sahro: ({ u }) => (
    <g>
      <Sky u={u} kind="night" />
      <Stars pts={[[30, 30], [60, 60, 1.2], [100, 26], [150, 50], [210, 30, 2], [250, 70, 1.2], [290, 36], [180, 90, 1.2], [80, 100, 1]]} />
      <Star8 x={210} y={30} r={5} c={C.g3} />
      <path d="M0 150 Q 80 120 160 150 T 320 140 V200 H0 Z" fill="#C49A5E" />
      <path d="M0 170 Q 100 150 200 172 T 320 166 V200 H0 Z" fill="#A9814A" />
      <g transform="translate(250 150)">
        <path d="M0 0 C 2 -20, 6 -40, 2 -60" stroke="#7A4E2E" strokeWidth="5" fill="none" />
        {[-70, -30, 10, 50, 100, 140].map((a) => <path key={a} d="M2 -60 C 14 -66, 26 -62, 34 -52 C 24 -56, 12 -56, 2 -58 Z" fill={C.gr1} transform={`rotate(${a} 2 -60)`} />)}
      </g>
      <g transform="translate(96 168)" fill="#2A2018" opacity=".55"><path d="M-30 0 L 0 -30 L 30 0 Z" /><path d="M0 -30 L 4 0 L -4 0 Z" fill={C.g3} opacity=".8" /></g>
      <ellipse cx="250" cy="156" rx="26" ry="5" fill={C.l3} opacity=".7" />
    </g>
  ),

  /* Kasblar: asboblar */
  kasb: ({ u }) => (
    <g>
      <Sky u={u} kind="teal" />
      <circle cx="160" cy="100" r="72" fill="#FFFFFF" opacity=".6" />
      <g transform="translate(110 70)">
        <path d="M-26 10 Q -26 -20 0 -22 Q 26 -20 26 10 Z" fill={C.g2} />
        <rect x="-32" y="8" width="64" height="7" rx="3" fill={C.g1} />
      </g>
      <g transform="translate(210 72)" stroke={C.l2} strokeWidth="4" fill="none" strokeLinecap="round">
        <path d="M-14 -24 V -6 Q -14 10 0 10 Q 14 10 14 -6 V -24" />
        <path d="M0 10 V 26 Q 0 40 16 40" />
        <circle cx="20" cy="40" r="6" fill={C.l2} />
      </g>
      <g transform="translate(160 150)">
        <rect x="-40" y="-26" width="80" height="48" rx="5" fill={C.l1} />
        <rect x="-34" y="-20" width="68" height="36" rx="2" fill={C.f3} />
        <rect x="-50" y="22" width="100" height="6" rx="3" fill={C.l3} />
        <path d="M-20 -6 L -10 4 L -20 14 M 0 14 H 16" stroke={C.l1} strokeWidth="3" fill="none" />
      </g>
      <g transform="translate(64 146) rotate(-30)">
        <rect x="-3" y="-30" width="6" height="40" rx="2" fill="#8A5A30" />
        <rect x="-14" y="-38" width="28" height="12" rx="3" fill={C.a2} />
      </g>
      <g transform="translate(262 146) rotate(30)">
        <rect x="-3" y="-30" width="6" height="40" rx="2" fill="#8A5A30" />
        <path d="M-14 -40 L 14 -40 L 8 -28 L -8 -28 Z" fill={C.l3} />
      </g>
    </g>
  ),

  /* Gilam: naqshli gilam va dastgoh */
  gilam: ({ u }) => (
    <g>
      <Sky u={u} kind="plain" />
      <rect x="40" y="18" width="12" height="170" rx="3" fill="#8A5A30" /><rect x="268" y="18" width="12" height="170" rx="3" fill="#8A5A30" />
      <rect x="34" y="14" width="252" height="10" rx="4" fill="#6B4422" />
      <rect x="62" y="30" width="196" height="142" fill={C.a1} />
      <rect x="70" y="38" width="180" height="126" fill="none" stroke={C.g2} strokeWidth="4" />
      <rect x="80" y="48" width="160" height="106" fill={C.a2} />
      <g transform="translate(160 101)">
        <rect x="-26" y="-26" width="52" height="52" fill={C.l1} transform="rotate(45)" />
        <rect x="-16" y="-16" width="32" height="32" fill={C.g2} transform="rotate(45)" />
        <Star8 x={0} y={0} r={8} c={C.a1} />
      </g>
      {[[100, 70], [220, 70], [100, 132], [220, 132]].map(([x, y]) => <Star8 key={x + '-' + y} x={x} y={y} r={7} c={C.g3} />)}
      {[...Array(12)].map((_, i) => <rect key={i} x={66 + i * 16} y="172" width="3" height="12" fill={C.g3} />)}
    </g>
  ),

  /* Shaxmat */
  shaxmat: ({ u }) => (
    <g>
      <Sky u={u} kind="plain" />
      <g transform="translate(160 156) scale(1 .42) rotate(45)">
        {[...Array(36)].map((_, i) => {
          const r = Math.floor(i / 6); const c = i % 6;
          return <rect key={i} x={-72 + c * 24} y={-72 + r * 24} width="24" height="24" fill={(r + c) % 2 ? C.l2 : C.paper} />;
        })}
      </g>
      <g transform="translate(130 140)" fill={C.ink}>
        <path d="M-12 0 H 12 L 9 -8 H -9 Z" /><path d="M-7 -8 C -8 -24, -2 -30, 2 -36 C 10 -34, 12 -26, 8 -20 L 6 -8 Z" /><circle cx="2" cy="-30" r="1.5" fill="#FFFFFF" />
      </g>
      <g transform="translate(190 142)" fill={C.paper} stroke={C.ink} strokeWidth="2">
        <path d="M-12 0 H 12 L 9 -8 H -9 Z" /><path d="M-6 -8 L -8 -34 H 8 L 6 -8 Z" /><path d="M-10 -34 H 10 V -42 H 6 V -38 H 2 V -42 H -2 V -38 H -6 V -42 H -10 Z" />
      </g>
      <g transform="translate(160 122)" fill={C.g2} stroke={C.g1} strokeWidth="2">
        <path d="M-14 0 H 14 L 10 -10 H -10 Z" /><path d="M-8 -10 L -12 -40 L -4 -32 L 0 -44 L 4 -32 L 12 -40 L 8 -10 Z" />
      </g>
      <Star8 x={64} y={50} r={6} c={C.g2} /><Star8 x={260} y={44} r={5} c={C.f2} />
    </g>
  ),

  /* Sport: medal va kurash gilami */
  sport: ({ u }) => (
    <g>
      <Sky u={u} kind="teal" />
      <path d="M40 170 L 280 170 L 300 196 L 20 196 Z" fill={C.l3} />
      <ellipse cx="160" cy="182" rx="80" ry="9" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity=".7" />
      <path d="M130 20 L 150 80 L 170 80 L 190 20 L 172 20 L 160 60 L 148 20 Z" fill={C.a2} />
      <circle cx="160" cy="110" r="36" fill={C.g2} />
      <circle cx="160" cy="110" r="28" fill="none" stroke={C.g3} strokeWidth="3" />
      <Star8 x={160} y={110} r={12} c={C.g3} />
      <Person x={80} y={170} s={1.3} c={C.l2} /><Person x={240} y={170} s={1.3} c="#FFFFFF" />
      <path d="M232 132 L 254 132" stroke={C.ink} strokeWidth="2" opacity=".2" />
    </g>
  ),

  /* Infografika / diagramma */
  infografika: ({ u }) => (
    <g>
      <Sky u={u} kind="plain" />
      <rect x="30" y="24" width="260" height="152" rx="12" fill="#FFFFFF" />
      {[[56, 70, C.l2], [86, 100, C.f2], [116, 56, C.g2], [146, 120, C.a2]].map(([x, h, c], i) => <rect key={i} x={x} y={156 - h} width="20" height={h} rx="4" fill={c} />)}
      <line x1="48" y1="156" x2="176" y2="156" stroke={C.l4} strokeWidth="2" />
      <circle cx="232" cy="80" r="34" fill={C.l4} />
      <path d="M232 80 L 232 46 A 34 34 0 0 1 264 92 Z" fill={C.g2} />
      <path d="M232 80 L 264 92 A 34 34 0 0 1 214 109 Z" fill={C.f2} />
      <path d="M196 150 L 216 134 L 236 142 L 270 118" stroke={C.a2} strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {[[196, 150], [216, 134], [236, 142], [270, 118]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="4" fill={C.a2} />)}
    </g>
  ),

  /* Telefon va ijtimoiy tarmoq izohlari */
  telefon: ({ u }) => (
    <g>
      <Sky u={u} kind="teal" />
      <rect x="116" y="18" width="88" height="166" rx="16" fill={C.ink} />
      <rect x="123" y="30" width="74" height="138" rx="8" fill={C.paper} />
      <rect x="148" y="22" width="24" height="4" rx="2" fill="#3A4466" />
      <rect x="130" y="40" width="50" height="16" rx="8" fill={C.l4} />
      <rect x="140" y="62" width="50" height="16" rx="8" fill={C.f3} />
      <rect x="130" y="84" width="40" height="16" rx="8" fill={C.l4} />
      <rect x="130" y="140" width="60" height="18" rx="9" fill="#FFFFFF" stroke={C.l4} />
      <g transform="translate(76 70)"><rect x="-30" y="-16" width="60" height="30" rx="12" fill="#FFFFFF" /><path d="M10 14 L 20 26 L 20 14 Z" fill="#FFFFFF" /><path d="M-8 -2 C -8 -10, 0 -10, 0 -4 C 0 -10, 8 -10, 8 -2 C 8 4, 0 8, 0 10 C 0 8, -8 4, -8 -2 Z" fill={C.a2} /></g>
      <g transform="translate(248 110)"><rect x="-32" y="-16" width="64" height="30" rx="12" fill="#FFFFFF" /><path d="M-10 14 L -20 26 L -20 14 Z" fill="#FFFFFF" /><circle cx="-14" cy="-1" r="3" fill={C.l3} /><circle cx="0" cy="-1" r="3" fill={C.l3} /><circle cx="14" cy="-1" r="3" fill={C.l3} /></g>
      <g transform="translate(252 46)"><circle r="14" fill={C.g2} /><path d="M-6 -1 L -2 4 L 7 -6" stroke="#FFFFFF" strokeWidth="3" fill="none" strokeLinecap="round" /></g>
    </g>
  ),

  /* Afisha / plakat */
  afisha: ({ u }) => (
    <g>
      <Sky u={u} kind="warm" />
      <rect x="0" y="176" width="320" height="24" fill={C.sand2} />
      <rect x="152" y="120" width="16" height="60" fill="#6B4422" />
      <rect x="66" y="16" width="188" height="120" rx="8" fill={C.l2} />
      <rect x="74" y="24" width="172" height="104" rx="4" fill={C.paper} />
      <Portal x={118} y={112} w={44} h={60} />
      <Dome x={118} y={52} w={24} />
      <rect x="152" y="40" width="80" height="10" rx="4" fill={C.a2} />
      <rect x="152" y="58" width="64" height="6" rx="3" fill={C.l4} />
      <rect x="152" y="70" width="72" height="6" rx="3" fill={C.l4} />
      <rect x="152" y="96" width="50" height="18" rx="9" fill={C.g2} />
      {[[42, 40], [278, 60], [52, 120], [286, 130]].map(([x, y], i) => <Star8 key={i} x={x} y={y} r={5} c={i % 2 ? C.f2 : C.g2} />)}
    </g>
  ),

  /* Ona va bola — mehr */
  oila: ({ u }) => (
    <g>
      <Sky u={u} kind="warm" />
      <Sun x={160} y={70} r={44} c={C.g3} />
      <Ground y={166} c={C.g3} c2={C.sand2} />
      <path d="M0 166 H 70 V 120 L 100 100 L 130 120 V 166 Z" fill={C.paper} opacity=".8" />
      <rect x="92" y="134" width="16" height="32" fill={C.l2} opacity=".7" />
      <Person x={176} y={170} s={1.9} c={C.a2} head="ro‘mol" />
      <Person x={208} y={170} s={1.1} c={C.l2} head="doppi" />
      <path d="M190 132 Q 200 136 206 146" stroke="#D9A47A" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M150 54 C 150 46, 160 46, 160 52 C 160 46, 170 46, 170 54 C 170 62, 160 66, 160 70 C 160 66, 150 62, 150 54 Z" fill={C.a2} />
      <RoundTree x={276} y={166} r={20} />
    </g>
  ),

  /* Mahalla, hashar, qo‘shnichilik */
  hashar: ({ u }) => (
    <g>
      <Sky u={u} kind="day" />
      <Cloud x={260} y={38} />
      <Ground y={170} c={C.sand} c2={C.sand2} />
      {[[30, 110], [120, 100], [210, 108]].map(([x, y], i) => (
        <g key={i}>
          <rect x={x} y={y} width="70" height={170 - y} fill={i === 1 ? C.paper : '#F2E3C6'} />
          <path d={`M${x - 6} ${y} L ${x + 35} ${y - 24} L ${x + 76} ${y} Z`} fill={i === 1 ? C.a2 : C.l3} />
          <rect x={x + 26} y={y + 30} width="18" height={140 - y} fill={C.l2} />
          <rect x={x + 8} y={y + 12} width="12" height="12" fill={C.f3} /><rect x={x + 50} y={y + 12} width="12" height="12" fill={C.f3} />
        </g>
      ))}
      <Person x={84} y={190} s={0.9} c={C.l2} head="doppi" /><Person x={112} y={192} s={0.9} c={C.a2} head="ro‘mol" />
      <Person x={196} y={190} s={0.9} c={C.f1} head="doppi" /><Person x={226} y={192} s={0.8} c={C.g1} />
      <path d="M124 176 L 134 150 M 214 176 L 222 152" stroke="#6B4422" strokeWidth="2.5" />
      <RoundTree x={300} y={172} r={14} />
    </g>
  ),

  /* Tong: quyosh chiqishi */
  tong: ({ u }) => (
    <g>
      <Sky u={u} kind="dusk" />
      <circle cx="160" cy="146" r="46" fill={C.g2} />
      <circle cx="160" cy="146" r="62" fill={C.g2} opacity=".2" />
      {[...Array(9)].map((_, i) => <rect key={i} x="159" y="56" width="2.5" height="24" fill={C.g3} opacity=".6" transform={`rotate(${-80 + i * 20} 160 146)`} />)}
      <path d="M0 140 Q 80 120 160 140 T 320 134 V200 H0 Z" fill={C.l1} />
      <path d="M0 160 Q 120 146 220 164 T 320 156 V200 H0 Z" fill="#101C3B" />
      <Bird x={90} y={70} c={C.ink} /><Bird x={106} y={62} s={0.8} c={C.ink} />
    </g>
  ),

  /* Tun: oy va yulduzlar */
  tun: ({ u }) => (
    <g>
      <Sky u={u} kind="night" />
      <Moon x={230} y={56} r={24} />
      <Stars pts={[[30, 30], [62, 60, 1.2], [96, 22], [140, 44], [180, 24, 1.2], [290, 30], [300, 100, 1.2], [60, 110, 1]]} />
      <Star8 x={96} y={22} r={4} c={C.g3} />
      <path d="M0 150 Q 60 130 120 148 T 240 142 T 320 150 V200 H0 Z" fill={C.l1} />
      <rect x="40" y="140" width="40" height="40" fill="#22336A" /><rect x="52" y="152" width="12" height="12" fill={C.g2} />
      <path d="M36 140 L 60 122 L 84 140 Z" fill="#1A2852" />
      <Poplar x={110} y={160} h={56} c="#1E3A5A" /><Poplar x={124} y={162} h={46} c="#1E3A5A" />
    </g>
  ),

  /* Kuz: sariq yaproqlar */
  kuz: ({ u }) => (
    <g>
      <Sky u={u} kind="warm" />
      <Ground y={164} c={C.g3} c2={C.sand2} />
      {[[60, 160, 26, '#D9893B'], [120, 156, 20, C.g2], [210, 160, 28, C.a3], [276, 158, 22, '#D9893B']].map(([x, y, r, c], i) => <RoundTree key={i} x={x} y={y} r={r} c={c} />)}
      {[[90, 80], [150, 60], [176, 100], [240, 70], [36, 110], [290, 110]].map(([x, y], i) => <path key={i} d={`M${x} ${y} q 7 -5 12 0 q -5 7 -12 0 Z`} fill={i % 2 ? C.a3 : C.g2} transform={`rotate(${i * 50} ${x} ${y})`} />)}
      <Cloud x={160} y={30} o={0.7} />
    </g>
  ),

  /* Jang: qalqon va qilichlar */
  jang: ({ u }) => (
    <g>
      <Sky u={u} kind="dusk" />
      <path d="M0 160 Q 160 140 320 160 V200 H0 Z" fill={C.l1} />
      <g transform="translate(160 104)">
        <path d="M-70 -60 L 70 60" stroke="#B9C2D0" strokeWidth="6" strokeLinecap="round" />
        <path d="M70 -60 L -70 60" stroke="#B9C2D0" strokeWidth="6" strokeLinecap="round" />
        <rect x="-86" y="62" width="30" height="7" rx="3" fill={C.g2} transform="rotate(-45 -71 65)" />
        <rect x="56" y="62" width="30" height="7" rx="3" fill={C.g2} transform="rotate(45 71 65)" />
        <circle r="46" fill={C.a1} />
        <circle r="38" fill={C.a2} />
        <circle r="38" fill="none" stroke={C.g2} strokeWidth="3" strokeDasharray="4 5" />
        <Star8 x={0} y={0} r={16} c={C.g2} />
        <circle r="6" fill={C.a1} />
      </g>
      {[[40, 140], [80, 132], [240, 132], [280, 140]].map(([x, y], i) => <path key={i} d={`M${x} ${y} V ${y - 40} L ${x + 18} ${y - 34} L ${x} ${y - 28}`} stroke={C.ink} strokeWidth="2" fill={i % 2 ? C.g2 : C.a2} />)}
    </g>
  ),

  /* Karvon: tuyalar */
  karvon: ({ u }) => (
    <g>
      <Sky u={u} kind="warm" />
      <Sun x={250} y={70} r={30} c={C.a3} />
      <path d="M0 150 Q 80 130 160 150 T 320 144 V200 H0 Z" fill={C.sand} />
      <path d="M0 172 Q 120 160 200 174 T 320 170 V200 H0 Z" fill={C.sand2} />
      <Camel x={90} y={160} s={1.1} /><Camel x={170} y={156} s={1} c="#B88E5A" /><Camel x={240} y={152} s={0.85} />
      <path d="M118 128 L 150 128 M 196 126 L 220 124" stroke={C.a2} strokeWidth="2" />
      <rect x="78" y="118" width="24" height="12" rx="3" fill={C.a2} /><rect x="160" y="116" width="22" height="11" rx="3" fill={C.l2} />
    </g>
  ),

  /* Samolyot va parvoz */
  samolyot: ({ u }) => (
    <g>
      <Sky u={u} kind="day" />
      <Cloud x={60} y={140} s={1.4} /><Cloud x={260} y={150} s={1.2} /><Cloud x={180} y={44} s={0.9} />
      <path d="M20 150 Q 120 120 210 82" stroke="#FFFFFF" strokeWidth="5" strokeDasharray="10 8" fill="none" strokeLinecap="round" />
      <g transform="translate(232 72) rotate(-22)">
        <path d="M-50 0 C -50 -8, 40 -10, 50 0 C 40 10, -50 8, -50 0 Z" fill={C.paper} />
        <path d="M-6 -2 L -24 -40 L -12 -40 L 18 -2 Z" fill={C.l2} />
        <path d="M-6 2 L -24 40 L -12 40 L 18 2 Z" fill={C.l3} />
        <path d="M-50 0 L -60 -18 L -46 -18 L -38 -2 Z" fill={C.a2} />
        {[-20, -10, 0, 10, 20].map((x) => <circle key={x} cx={x} cy="-1" r="2" fill={C.l1} />)}
        <path d="M44 -3 C 48 -2, 48 2, 44 3" fill={C.l1} />
      </g>
    </g>
  ),

  /* Alloma: usturlob, kitoblar, qo‘lyozma */
  alloma: ({ u }) => (
    <g>
      <Sky u={u} kind="plain" />
      <circle cx="120" cy="96" r="60" fill={C.g2} />
      <circle cx="120" cy="96" r="52" fill={C.paper} />
      <circle cx="120" cy="96" r="52" fill="none" stroke={C.g1} strokeWidth="2" strokeDasharray="2 4" />
      <circle cx="120" cy="96" r="34" fill="none" stroke={C.l2} strokeWidth="2" />
      <path d="M120 44 V 148 M 68 96 H 172" stroke={C.l3} strokeWidth="1.5" />
      <path d="M86 70 L 154 122" stroke={C.a2} strokeWidth="4" strokeLinecap="round" />
      <circle cx="120" cy="96" r="5" fill={C.g1} />
      <circle cx="120" cy="30" r="8" fill="none" stroke={C.g1} strokeWidth="4" />
      {[[200, 174, 90, C.l2], [206, 158, 80, C.a2], [198, 142, 86, C.f2], [210, 126, 70, C.g1]].map(([x, y, w, c], i) => (
        <g key={i}><rect x={x} y={y - 14} width={w} height="14" rx="2" fill={c} /><rect x={x + 6} y={y - 9} width={w - 12} height="3" fill="#FFFFFF" opacity=".5" /></g>
      ))}
      <path d="M230 106 C 234 80, 256 66, 272 60" stroke={C.ink} strokeWidth="2.5" fill="none" />
      <path d="M272 60 L 266 72 L 262 64 Z" fill={C.ink} />
    </g>
  ),

  /* Paxta dalasi */
  paxta: ({ u }) => (
    <g>
      <Sky u={u} kind="day" />
      <Sun x={262} y={46} r={18} />
      <path d="M0 110 H 320 V 200 H 0 Z" fill={C.gr3} />
      {[...Array(6)].map((_, r) => (
        <g key={r}>
          {[...Array(9)].map((__, c) => {
            const x = 16 + c * 36 + (r % 2) * 18; const y = 120 + r * 15;
            return (
              <g key={c}>
                <path d={`M${x} ${y + 8} L ${x} ${y}`} stroke={C.gr1} strokeWidth="2" />
                <circle cx={x} cy={y - 2} r={3 + r * 0.5} fill="#FFFFFF" />
                <circle cx={x - 3 - r * 0.3} cy={y} r={2.5 + r * 0.4} fill="#FFFFFF" />
                <circle cx={x + 3 + r * 0.3} cy={y} r={2.5 + r * 0.4} fill="#FFFFFF" />
              </g>
            );
          })}
        </g>
      ))}
      <Poplar x={30} y={112} h={44} /><Poplar x={44} y={112} h={38} c={C.gr1} /><Poplar x={300} y={112} h={46} />
    </g>
  ),

  /* Rassom: molbert va palitra */
  rassom: ({ u }) => (
    <g>
      <Sky u={u} kind="plain" />
      <path d="M140 190 L 160 30 L 180 190 M 112 190 L 160 30 L 208 190" stroke="#8A5A30" strokeWidth="5" fill="none" strokeLinecap="round" />
      <rect x="100" y="40" width="120" height="96" rx="4" fill="#FFFFFF" stroke="#8A5A30" strokeWidth="4" />
      <rect x="108" y="48" width="104" height="80" fill={SKIES.day[0]} />
      <path d="M108 128 L 140 92 L 160 110 L 186 82 L 212 128 Z" fill={C.f2} />
      <circle cx="190" cy="66" r="9" fill={C.g2} />
      <rect x="96" y="136" width="128" height="8" rx="3" fill="#6B4422" />
      <g transform="translate(262 140) rotate(-18)">
        <path d="M-34 0 C -34 -26, 20 -34, 34 -10 C 40 4, 26 10, 16 6 C 8 2, 4 12, 10 20 C 0 30, -34 22, -34 0 Z" fill={C.sand} />
        {[[-20, -8, C.a2], [-6, -18, C.g2], [12, -18, C.f2], [-18, 10, C.l2]].map(([x, y, c], i) => <circle key={i} cx={x} cy={y} r="6" fill={c} />)}
      </g>
      <path d="M56 170 L 92 120" stroke="#8A5A30" strokeWidth="4" strokeLinecap="round" /><path d="M92 120 L 98 110 L 96 122 Z" fill={C.a2} />
    </g>
  ),

  /* Vaqt: qum soati */
  vaqt: ({ u }) => (
    <g>
      <Sky u={u} kind="teal" />
      <circle cx="160" cy="100" r="78" fill="#FFFFFF" opacity=".5" />
      {[...Array(12)].map((_, i) => <rect key={i} x="158.5" y="26" width="3" height={i % 3 ? 7 : 12} fill={C.l2} transform={`rotate(${i * 30} 160 100)`} />)}
      <rect x="124" y="38" width="72" height="10" rx="4" fill="#8A5A30" /><rect x="124" y="152" width="72" height="10" rx="4" fill="#8A5A30" />
      <path d="M134 48 C 134 80, 156 90, 156 100 C 156 110, 134 120, 134 152 H 186 C 186 120, 164 110, 164 100 C 164 90, 186 80, 186 48 Z" fill={C.paper} opacity=".9" stroke={C.l3} strokeWidth="2" />
      <path d="M142 60 C 144 78, 158 88, 159 96 H 161 C 162 88, 176 78, 178 60 Z" fill={C.g2} />
      <path d="M140 150 C 142 132, 156 124, 160 120 C 164 124, 178 132, 180 150 Z" fill={C.g2} />
      <line x1="160" y1="98" x2="160" y2="122" stroke={C.g1} strokeWidth="1.5" strokeDasharray="2 2" />
    </g>
  ),

  /* Orzu: yulduzga zinapoya / cho‘qqidagi bayroq */
  orzu: ({ u }) => (
    <g>
      <Sky u={u} kind="dusk" />
      <Stars pts={[[40, 30], [90, 50, 1.2], [150, 20], [290, 60, 1.2], [300, 20]]} />
      <Star8 x={252} y={44} r={18} c={C.g2} />
      <circle cx="252" cy="44" r="30" fill={C.g2} opacity=".2" />
      {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={40 + i * 34} y={170 - i * 22} width="36" height={30 + i * 22} fill={i % 2 ? C.l3 : C.l2} />)}
      {[0, 1, 2, 3, 4, 5].map((i) => <rect key={'t' + i} x={40 + i * 34} y={170 - i * 22} width="36" height="4" fill={C.g3} opacity=".8" />)}
      <Person x={228} y={60} s={0.9} c={C.a2} />
    </g>
  ),

  /* Til: turli yozuvdagi nutq pufakchalari */
  til: ({ u }) => (
    <g>
      <Sky u={u} kind="plain" />
      <circle cx="160" cy="104" r="56" fill={C.l3} />
      <path d="M110 84 Q 160 70 210 84 M 106 110 Q 160 100 214 110 M 118 134 Q 160 128 202 134" stroke="#FFFFFF" strokeWidth="2" opacity=".6" fill="none" />
      <ellipse cx="160" cy="104" rx="24" ry="56" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity=".6" />
      {[[60, 48, 'Aa', C.a2], [258, 50, 'Bb', C.f2], [52, 150, 'Ж', C.g1], [268, 150, '文', C.l2], [160, 28, 'ع', C.f1]].map(([x, y, t, c], i) => (
        <g key={i}>
          <rect x={x - 26} y={y - 18} width="52" height="34" rx="12" fill="#FFFFFF" stroke={c} strokeWidth="2.5" />
          <text x={x} y={y + 6} textAnchor="middle" fontSize="18" fontWeight="800" fill={c} fontFamily="system-ui, sans-serif">{t}</text>
        </g>
      ))}
    </g>
  ),

  /* Immunitet: qalqon va hujayralar */
  immunitet: ({ u }) => (
    <g>
      <Sky u={u} kind="teal" />
      {[[50, 50, 14], [270, 60, 12], [60, 150, 10], [266, 150, 14]].map(([x, y, r], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          {[...Array(8)].map((_, k) => <line key={k} x1="0" y1={-r} x2="0" y2={-r - 7} stroke={C.a2} strokeWidth="2.5" transform={`rotate(${k * 45})`} strokeLinecap="round" />)}
          <circle r={r} fill={C.a3} />
          <circle cx={-r / 3} cy={-r / 3} r={r / 4} fill={C.a1} />
        </g>
      ))}
      <path d="M160 26 L 214 46 C 214 104, 196 146, 160 172 C 124 146, 106 104, 106 46 Z" fill={C.l2} />
      <path d="M160 40 L 202 56 C 202 102, 188 136, 160 158 C 132 136, 118 102, 118 56 Z" fill={C.f2} />
      <path d="M140 98 L 156 114 L 184 80" stroke="#FFFFFF" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  ),

  /* Lavh (rehal) va ochiq kitob — hadis, hikmat */
  lavh: ({ u }) => (
    <g>
      <Sky u={u} kind="warm" />
      <path d="M90 196 V 80 Q 160 10 230 80 V 196" fill="none" stroke={C.g1} strokeWidth="3" />
      <path d="M104 196 V 84 Q 160 26 216 84 V 196" fill={C.paper} opacity=".7" />
      <path d="M110 186 L 160 140 L 210 186" stroke="#8A5A30" strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M110 140 L 160 186 L 210 140" stroke="#6B4422" strokeWidth="7" fill="none" strokeLinecap="round" />
      <Book x={160} y={142} w={110} c={C.f1} />
      <Star8 x={160} y={62} r={10} c={C.g2} />
      <circle cx="160" cy="62" r="20" fill={C.g2} opacity=".2" />
    </g>
  ),

  /* Sud: tarozi */
  sud: ({ u }) => (
    <g>
      <Sky u={u} kind="plain" />
      <rect x="156" y="40" width="8" height="130" fill={C.g1} />
      <rect x="124" y="166" width="72" height="10" rx="4" fill={C.g1} />
      <rect x="110" y="176" width="100" height="10" rx="4" fill="#8A5A30" />
      <rect x="70" y="52" width="180" height="6" rx="3" fill={C.g1} />
      <circle cx="160" cy="40" r="9" fill={C.g2} />
      <path d="M86 58 L 70 110 M 86 58 L 102 110 M 234 58 L 218 110 M 234 58 L 250 110" stroke={C.g1} strokeWidth="1.5" />
      <path d="M60 110 H 112 Q 86 132 60 110 Z" fill={C.g2} />
      <path d="M208 110 H 260 Q 234 132 208 110 Z" fill={C.g2} />
      <rect x="252" y="140" width="40" height="12" rx="4" fill={C.l2} transform="rotate(-30 272 146)" />
      <rect x="268" y="150" width="6" height="34" rx="2" fill="#6B4422" transform="rotate(-30 272 146)" />
    </g>
  ),

  /* Bayroq — ko‘k, oq, yashil va yarim oy */
  bayroq: ({ u }) => (
    <g>
      <Sky u={u} kind="day" />
      <Cloud x={250} y={150} s={1.2} /><Cloud x={60} y={160} />
      <rect x="80" y="20" width="5" height="172" fill="#8A8F98" />
      <circle cx="82.5" cy="18" r="5" fill={C.g2} />
      <path d="M85 26 C 130 16, 170 36, 240 24 V 110 C 170 122, 130 102, 85 112 Z" fill="#FFFFFF" />
      <path d="M85 26 C 130 16, 170 36, 240 24 V 52 C 170 64, 130 44, 85 54 Z" fill="#1EB4E6" />
      <path d="M85 84 C 130 74, 170 94, 240 82 V 110 C 170 122, 130 102, 85 112 Z" fill="#1EB053" />
      <path d="M85 54 C 130 44, 170 64, 240 52 V 55 C 170 67, 130 47, 85 57 Z M 85 81 C 130 71, 170 91, 240 79 V 84 C 170 96, 130 76, 85 86 Z" fill={C.a2} />
      <circle cx="104" cy="39" r="8" fill="#FFFFFF" /><circle cx="107" cy="38" r="7" fill="#1EB4E6" />
      {[[138, 33], [145, 33], [152, 33], [131, 40], [138, 40], [145, 40], [152, 40], [124, 47], [131, 47], [138, 47], [145, 47], [152, 47]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.7" fill="#FFFFFF" />)}
    </g>
  ),

  /* Qishloq va daryo */
  qishloq: ({ u }) => (
    <g>
      <Sky u={u} kind="day" />
      <Sun x={60} y={50} r={18} />
      <Mountains c1={C.l4} c2={C.l3} y={130} />
      <path d="M0 130 H 320 V 200 H 0 Z" fill={C.gr3} />
      <path d="M0 168 C 80 150, 160 190, 320 160 V 186 C 160 210, 80 172, 0 192 Z" fill={C.l3} />
      {[[50, 128], [100, 124], [200, 126], [254, 122]].map(([x, y], i) => (
        <g key={i}><rect x={x} y={y} width="34" height="22" fill={i % 2 ? C.paper : '#F2E3C6'} /><path d={`M${x - 4} ${y} L ${x + 17} ${y - 12} L ${x + 38} ${y} Z`} fill={C.sand2} /><rect x={x + 13} y={y + 8} width="8" height="14" fill={C.l2} /></g>
      ))}
      <Poplar x={160} y={140} h={48} /><Poplar x={172} y={142} h={40} c={C.gr1} /><RoundTree x={300} y={150} r={14} />
      <path d="M200 176 L 236 176 L 230 184 L 206 184 Z" fill="#8A5A30" />
    </g>
  ),

  /* Qorli shimol: bo‘ri va tog‘lar */
  qor: ({ u }) => (
    <g>
      <Sky u={u} kind="cold" />
      <Mountains c1="#C9D3DF" c2="#A7B5C6" y={140} />
      <path d="M0 140 Q 160 124 320 140 V200 H0 Z" fill="#F2F5F8" />
      {[[20, 160], [44, 150], [276, 150], [300, 164]].map(([x, y], i) => <path key={i} d={`M${x} ${y - 46} L ${x + 14} ${y} L ${x - 14} ${y} Z`} fill={C.f1} opacity=".85" />)}
      <g transform="translate(176 170)">
        <path d="M-40 -18 C -48 -26, -54 -14, -46 -8 L -40 -10 L -40 -18 Z" fill="#7C8594" />
        <path d="M-40 -14 C -40 -30, 10 -32, 18 -22 L 20 0 L 15 0 L 13 -12 L -26 -12 L -30 0 L -35 0 L -36 -12 C -38 -12, -40 -14, -40 -14 Z" fill="#8E97A6" />
        <path d="M14 -22 L 38 -30 L 26 -14 Z" fill="#8E97A6" />
        <path d="M20 -28 L 22 -42 L 28 -30 Z" fill="#7C8594" />
        <circle cx="26" cy="-24" r="1.5" fill={C.ink} />
      </g>
      <Person x={92} y={176} s={0.9} c={C.a1} />
      {[...Array(14)].map((_, i) => <circle key={i} cx={(i * 47) % 320} cy={(i * 31) % 120 + 10} r="2" fill="#FFFFFF" />)}
    </g>
  ),

  /* Zamonaviy shahar */
  shahar: ({ u }) => (
    <g>
      <Sky u={u} kind="day" />
      <Cloud x={70} y={36} /><Sun x={262} y={40} r={16} />
      {[[10, 90, 44], [60, 60, 40], [106, 100, 36], [148, 40, 44], [198, 80, 40], [244, 110, 34], [282, 70, 38]].map(([x, y, w], i) => (
        <g key={i}>
          <rect x={x} y={y} width={w} height={176 - y} fill={i % 2 ? C.l3 : C.l2} />
          {[...Array(Math.floor((176 - y) / 14))].map((_, k) => [0, 1, 2].map((c) => <rect key={k + '-' + c} x={x + 5 + c * ((w - 10) / 3)} y={y + 6 + k * 14} width={(w - 10) / 3 - 4} height="6" fill="#FFFFFF" opacity={(k + c + i) % 3 ? 0.55 : 0.9} />))}
        </g>
      ))}
      <rect x="0" y="176" width="320" height="24" fill="#5B6478" />
      {[...Array(8)].map((_, i) => <rect key={i} x={10 + i * 40} y="187" width="20" height="3" fill="#FFFFFF" />)}
    </g>
  ),
};

export const SCENE_IDS = Object.keys(SCENES);

/** Bitta sahna. className bilan o‘lcham beriladi; slice — kichik eskizlar uchun kesib to‘ldirish. */
export function Scene({ id, className = '', title, slice = false, rounded = true }) {
  const raw = useId();
  const u = `dp${raw.replace(/[^a-zA-Z0-9]/g, '')}`;
  const S = SCENES[id];
  if (!S) return null;
  return (
    <svg viewBox="0 0 320 200" className={className} preserveAspectRatio={slice ? 'xMidYMid slice' : 'xMidYMid meet'} role="img" aria-label={title || id}>
      {rounded && (
        <defs>
          <clipPath id={`${u}clip`}><rect width="320" height="200" rx="14" /></clipPath>
        </defs>
      )}
      <g clipPath={rounded ? `url(#${u}clip)` : undefined}>
        <S u={u} />
        <Frame />
      </g>
    </svg>
  );
}
