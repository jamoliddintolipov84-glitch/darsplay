'use client';

/**
 * Dars play — Fizika moduli
 * Formula kalkulyatori, simulyatsiyalar, virtual laboratoriya va sinf tajribalari.
 * Hammasi proyektor / interaktiv doska uchun: katta shrift, katta tugmalar.
 *
 * Slayd maydonlari (page.jsx dagi SlideExtras orqali chiziladi):
 *   calc: { items: [{ name, formula, vars: [{ k, l, u, v }], out: { s, l, u }, f }] }
 *   sim:  { kind: 'brown' | 'diffusion' | 'gas' | 'thermo' | 'maxwell' | 'stern' | 'scale' | 'molar', ...sozlamalar }
 *   lab:  { kind: 'diffusionTime' | 'oilDrop' | 'molarBalance' | 'equilibrium' | 'stern' | 'gas', title, goal, tools, questions, conclusion, ... }
 *   experiment: { t, need, steps, predict: { q, opts, a }, result, why, home }
 */

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Play, Pause, RotateCcw, Check, X, Calculator, FlaskConical, Thermometer, Eye, Lightbulb,
  ChevronRight, ChevronLeft, Table2, LineChart, Wrench, Target, Plus, Minus, Trash2, Sparkles,
  ShieldAlert, Home, Users, Flame, Snowflake, Hand, Microscope, Atom, Ruler,
} from 'lucide-react';

/* ============================================================
   1. SONLAR: o‘qish va chiroyli yozish
   ============================================================ */

const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
const UNSUP = { '⁻': '-', '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9' };

/** «3·10^-26», «3×10⁻²⁶», «3e-26», «6,02*10^23», «0,5» — hammasini songa aylantiradi. */
export function parseNum(s) {
  if (typeof s === 'number') return s;
  let t = String(s ?? '').trim().replace(/\s/g, '').replace(/,/g, '.');
  if (!t) return NaN;
  t = t.replace(/[⁻⁰¹²³⁴⁵⁶⁷⁸⁹]/g, (c) => UNSUP[c]);
  t = t.replace(/[·×xX*]10\^?(?=[-+]?\d)/, 'e');
  t = t.replace(/^10\^?(?=[-+]?\d)/, '1e');
  const v = Number(t);
  return Number.isFinite(v) ? v : NaN;
}

function trimNum(x, digits) {
  let s = Number(x).toPrecision(digits);
  if (s.includes('e')) s = String(Number(s));
  if (s.includes('.')) s = s.replace(/0+$/, '').replace(/\.$/, '');
  const [i, d] = s.split('.');
  const ii = i.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return d ? `${ii},${d}` : ii;
}

/** Fizikaga mos ko‘rinish: 0,0012 · 3,6 · 1 806 yoki 6,02·10²³ */
export function sci(x, digits = 3) {
  if (x === null || x === undefined || !Number.isFinite(x)) return '—';
  if (x === 0) return '0';
  const a = Math.abs(x);
  if (a >= 0.01 && a < 1e6) return trimNum(x, digits);
  let e = Math.floor(Math.log10(a));
  let m = x / 10 ** e;
  m = Number(m.toPrecision(digits));
  if (Math.abs(m) >= 10) { m /= 10; e += 1; }
  const es = String(e).split('').map((c) => SUP[c]).join('');
  return `${trimNum(m, digits)}·10${es}`;
}

const R_GAS = 8.31;
const K_B = 1.38e-23;
const N_A = 6.02e23;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const rnd = (a, b) => a + Math.random() * (b - a);
/** Normal taqsimotli tasodifiy son (Box–Muller) */
function gauss() {
  let u = 0; let v = 0;
  while (!u) u = Math.random();
  while (!v) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

/* ============================================================
   2. UMUMIY YORDAMCHILAR
   ============================================================ */

/** requestAnimationFrame sikli; dt soniyada (ko‘pi bilan 0,05 s) */
function useLoop(fn, active = true) {
  const ref = useRef(fn);
  ref.current = fn;
  useEffect(() => {
    if (!active) return undefined;
    let id; let last = performance.now();
    const tick = (t) => {
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;
      ref.current(dt, t);
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [active]);
}

function Canvas({ cref, w = 900, h = 420, className = '' }) {
  return (
    <canvas
      ref={cref}
      width={w}
      height={h}
      className={`block w-full rounded-2xl border-[2.5px] border-ink bg-white ${className}`}
      style={{ aspectRatio: `${w} / ${h}`, touchAction: 'none' }}
    />
  );
}

function Slider({ label, value, min, max, step = 1, onChange, unit = '', show, disabled, color = 'accent-blue-600' }) {
  return (
    <label className={`block rounded-2xl border-2 border-ink/15 bg-white px-4 py-3 ${disabled ? 'opacity-50' : ''}`}>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-lg font-extrabold text-ink">{label}</span>
        <span className="text-2xl font-black tabular-nums text-blue-700">{show ?? value} <span className="text-lg text-slate-500">{unit}</span></span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value} disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`mt-2 h-3 w-full cursor-pointer ${color}`}
      />
    </label>
  );
}

function Btn({ children, onClick, color = 'bg-blue-600 text-white hover:bg-blue-700', icon: I, disabled, className = '' }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`dp-btn inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-lg font-black disabled:opacity-40 ${color} ${className}`}
    >
      {I && <I size={22} />} {children}
    </button>
  );
}

function Readout({ label, value, unit, tone = 'bg-amber-50 text-amber-900 border-amber-300' }) {
  return (
    <div className={`rounded-2xl border-2 px-4 py-2 text-center ${tone}`}>
      <div className="text-sm font-extrabold uppercase tracking-wide opacity-70">{label}</div>
      <div className="text-2xl md:text-3xl font-black tabular-nums">{value}<span className="ml-1 text-lg font-bold opacity-70">{unit}</span></div>
    </div>
  );
}

function Panel({ icon: I, title, tone = 'bg-blue-600', children, right }) {
  return (
    <div className="mt-6 overflow-hidden rounded-3xl border-[2.5px] border-ink bg-paper shadow-[5px_5px_0_#14213D]">
      <div className={`flex flex-wrap items-center gap-3 border-b-[2.5px] border-ink px-5 py-3 text-white ${tone}`}>
        {I && <span className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-ink bg-paper text-ink"><I size={22} /></span>}
        <span className="flex-1 text-xl md:text-2xl font-black">{title}</span>
        {right}
      </div>
      <div className="p-4 md:p-6">{children}</div>
    </div>
  );
}

/* ============================================================
   3. FORMULA KALKULYATORI
   ============================================================ */

export function FizCalc({ calc }) {
  const items = calc.items || [];
  const [tab, setTab] = useState(0);
  const it = items[tab];
  const [vals, setVals] = useState(() => Object.fromEntries((it?.vars || []).map((v) => [v.k, String(v.v ?? '')])));
  const pick = (k) => {
    setTab(k);
    setVals(Object.fromEntries((items[k].vars || []).map((v) => [v.k, String(v.v ?? '')])));
  };
  if (!it) return null;
  const nums = Object.fromEntries(it.vars.map((v) => [v.k, parseNum(vals[v.k])]));
  const ready = it.vars.every((v) => Number.isFinite(nums[v.k]));
  let res = NaN;
  if (ready) { try { res = it.f(nums); } catch { res = NaN; } }

  return (
    <Panel icon={Calculator} title={calc.title || 'Formula kalkulyatori'} tone="bg-blue-700">
      {items.length > 1 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {items.map((x, k) => (
            <button key={k} onClick={() => pick(k)} className={`rounded-xl border-2 border-ink px-4 py-2 text-lg font-black ${k === tab ? 'bg-amber-400 text-ink' : 'bg-white text-ink hover:bg-amber-50'}`}>{x.name}</button>
          ))}
        </div>
      )}
      <div className="mb-4 rounded-2xl border-2 border-dashed border-ink/40 bg-white px-5 py-4 text-center font-serif text-3xl md:text-4xl font-bold text-ink">{it.formula}</div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {it.vars.map((v) => (
          <label key={v.k} className="block rounded-2xl border-2 border-ink/20 bg-white p-3">
            <span className="block text-base font-extrabold text-slate-600">{v.l}</span>
            <span className="mt-1 flex items-center gap-2">
              <input
                value={vals[v.k] ?? ''}
                onChange={(e) => setVals((o) => ({ ...o, [v.k]: e.target.value }))}
                inputMode="decimal"
                className={`w-full min-w-0 rounded-xl border-2 px-3 py-2 text-2xl font-black tabular-nums text-ink outline-none focus:border-blue-600 ${Number.isFinite(nums[v.k]) || vals[v.k] === '' ? 'border-ink/30' : 'border-rose-400 bg-rose-50'}`}
              />
              {v.u && <span className="shrink-0 text-xl font-bold text-slate-500">{v.u}</span>}
            </span>
          </label>
        ))}
      </div>
      <p className="mt-2 text-base font-semibold text-slate-500">Katta va kichik sonlarni shunday yozing: <b>6,02·10^23</b> yoki <b>3e-26</b></p>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-3xl border-[2.5px] border-ink bg-amber-300 px-6 py-4">
        <span className="text-2xl font-black text-ink">{it.out.l || 'Natija'}</span>
        <span className="text-4xl md:text-5xl font-black tabular-nums text-ink">{it.out.s} = {ready && Number.isFinite(res) ? sci(res, it.out.digits || 3) : '…'} <span className="text-2xl">{it.out.u}</span></span>
      </div>
      {it.note && <p className="mt-3 text-lg font-semibold text-slate-600">{it.note}</p>}
    </Panel>
  );
}

/* ============================================================
   4. GRAFIK VA JADVAL (laboratoriya uchun)
   ============================================================ */

function niceTicks(min, max, n = 5) {
  if (!(max > min)) { max = min + 1; }
  const span = max - min;
  const step0 = span / n;
  const mag = 10 ** Math.floor(Math.log10(step0));
  const norm = step0 / mag;
  const step = (norm < 1.5 ? 1 : norm < 3 ? 2 : norm < 7 ? 5 : 10) * mag;
  const lo = Math.floor(min / step) * step;
  const hi = Math.ceil(max / step) * step;
  const out = [];
  for (let v = lo; v <= hi + step / 2; v += step) out.push(Number(v.toPrecision(10)));
  return out;
}

const SERIES_COLORS = ['#1D4ED8', '#E2463F', '#0EA5A4', '#D97706'];

export function Graph({ rows, x, ys, theory, title, zeroX = true, zeroY = true, lines = true }) {
  const W = 640; const H = 360; const L = 74; const B = 56; const T = 20; const Rp = 20;
  const pts = rows.filter((r) => Number.isFinite(r[x.k]));
  const allY = [];
  ys.forEach((s) => pts.forEach((r) => Number.isFinite(r[s.k]) && allY.push(r[s.k])));
  const xsv = pts.map((r) => r[x.k]);
  let xmin = zeroX ? 0 : Math.min(...xsv, x.min ?? Infinity);
  let xmax = Math.max(...xsv, x.max ?? -Infinity);
  let ymin = zeroY ? 0 : Math.min(...allY);
  let ymax = Math.max(...allY);
  if (!pts.length) { xmin = x.min ?? 0; xmax = x.max ?? 10; ymin = 0; ymax = 10; }
  if (theory) {
    for (let k = 0; k <= 40; k++) {
      const xv = xmin + ((xmax - xmin) * k) / 40;
      const yv = theory(xv);
      if (Number.isFinite(yv) && yv < ymax * 3) ymax = Math.max(ymax, yv);
    }
  }
  if (ymax === ymin) ymax = ymin + 1;
  if (!zeroX) xmin -= (xmax - xmin) * 0.08;
  const xt = niceTicks(xmin, xmax); const yt = niceTicks(ymin, ymax);
  const X0 = xt[0]; const X1 = xt[xt.length - 1]; const Y0 = yt[0]; const Y1 = yt[yt.length - 1];
  const px = (v) => L + ((v - X0) / (X1 - X0)) * (W - L - Rp);
  const py = (v) => H - B - ((v - Y0) / (Y1 - Y0)) * (H - B - T);
  let theoryPath = '';
  if (theory) {
    const seg = [];
    for (let k = 0; k <= 80; k++) {
      const xv = X0 + ((X1 - X0) * k) / 80;
      const yv = theory(xv);
      if (Number.isFinite(yv) && yv >= Y0 && yv <= Y1) seg.push(`${seg.length ? 'L' : 'M'}${px(xv).toFixed(1)},${py(yv).toFixed(1)}`);
    }
    theoryPath = seg.join(' ');
  }
  const short = (v) => sci(v, 3);
  return (
    <div className="rounded-2xl border-2 border-ink/20 bg-white p-2">
      {title && <div className="px-2 pt-1 text-lg font-black text-ink">{title}</div>}
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
        {yt.map((v) => <line key={`y${v}`} x1={L} x2={W - Rp} y1={py(v)} y2={py(v)} stroke="#E2E8F0" />)}
        {xt.map((v) => <line key={`x${v}`} y1={T} y2={H - B} x1={px(v)} x2={px(v)} stroke="#E2E8F0" />)}
        <line x1={L} x2={W - Rp} y1={H - B} y2={H - B} stroke="#14213D" strokeWidth="2.5" />
        <line x1={L} x2={L} y1={T} y2={H - B} stroke="#14213D" strokeWidth="2.5" />
        {yt.map((v) => <text key={`ty${v}`} x={L - 8} y={py(v) + 5} textAnchor="end" fontSize="15" fontWeight="700" fill="#475569">{short(v)}</text>)}
        {xt.map((v) => <text key={`tx${v}`} x={px(v)} y={H - B + 22} textAnchor="middle" fontSize="15" fontWeight="700" fill="#475569">{short(v)}</text>)}
        <text x={(L + W) / 2} y={H - 8} textAnchor="middle" fontSize="17" fontWeight="900" fill="#14213D">{x.l}</text>
        <text x={16} y={(T + H - B) / 2} textAnchor="middle" fontSize="17" fontWeight="900" fill="#14213D" transform={`rotate(-90 16 ${(T + H - B) / 2})`}>{ys.map((s) => s.l).join(', ')}</text>
        {theoryPath && <path d={theoryPath} fill="none" stroke="#94A3B8" strokeWidth="3" strokeDasharray="8 6" />}
        {ys.map((s, si) => {
          const sp = pts.filter((r) => Number.isFinite(r[s.k])).sort((a, b) => a[x.k] - b[x.k]);
          const c = s.color || SERIES_COLORS[si % SERIES_COLORS.length];
          return (
            <g key={s.k}>
              {lines && sp.length > 1 && <polyline points={sp.map((r) => `${px(r[x.k])},${py(r[s.k])}`).join(' ')} fill="none" stroke={c} strokeWidth="3" />}
              {sp.map((r, k) => <circle key={k} cx={px(r[x.k])} cy={py(r[s.k])} r="7" fill={c} stroke="#14213D" strokeWidth="2" />)}
            </g>
          );
        })}
      </svg>
      {(ys.length > 1 || theory) && (
        <div className="flex flex-wrap gap-4 px-2 pb-1 text-base font-bold text-slate-600">
          {ys.map((s, si) => <span key={s.k} className="inline-flex items-center gap-2"><span className="h-3 w-6 rounded" style={{ background: s.color || SERIES_COLORS[si % SERIES_COLORS.length] }} />{s.l}</span>)}
          {theory && <span className="inline-flex items-center gap-2"><span className="h-0 w-6 border-t-[3px] border-dashed border-slate-400" />nazariya</span>}
        </div>
      )}
    </div>
  );
}

function DataTable({ rows, cols, onDelete }) {
  return (
    <div className="overflow-x-auto rounded-2xl border-2 border-ink">
      <table className="w-full border-collapse text-left text-lg md:text-xl">
        <thead>
          <tr className="bg-ink text-white">
            <th className="px-3 py-2 font-extrabold">№</th>
            {cols.map((c) => <th key={c.k} className="px-3 py-2 font-extrabold">{c.l}</th>)}
            {onDelete && <th className="px-2 py-2" />}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr><td colSpan={cols.length + 2} className="bg-white px-4 py-6 text-center font-bold text-slate-400">Hali o‘lchov yo‘q — tajribani bajarib «Jadvalga yozish» tugmasini bosing</td></tr>
          )}
          {rows.map((r, i) => (
            <tr key={i} className={i % 2 ? 'bg-amber-50/60' : 'bg-white'}>
              <td className="border-t border-ink/10 px-3 py-2 font-black text-ink">{i + 1}</td>
              {cols.map((c) => <td key={c.k} className="border-t border-ink/10 px-3 py-2 font-bold tabular-nums text-ink">{c.f ? c.f(r) : (typeof r[c.k] === 'number' ? sci(r[c.k], c.d || 3) : r[c.k])}</td>)}
              {onDelete && <td className="border-t border-ink/10 px-2 py-2"><button onClick={() => onDelete(i)} className="rounded-lg p-1 text-slate-400 hover:bg-rose-50 hover:text-rose-600" aria-label="O‘chirish"><Trash2 size={20} /></button></td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ============================================================
   5. SIMULYATSIYALAR
   ============================================================ */

/* ---------- 5.1 Broun harakati ---------- */
function BrownSim({ cfg = {} }) {
  const ref = useRef(null);
  const W = 900; const H = 440;
  const [temp, setTemp] = useState(300);
  const [big, setBig] = useState(cfg.size === 'big' ? 'big' : 'small');
  const [showMol, setShowMol] = useState(true);
  const [run, setRun] = useState(true);
  const S = useRef(null);
  const reset = useCallback(() => {
    const r = big === 'big' ? 46 : 16;
    const mol = [];
    for (let i = 0; i < 170; i++) {
      let x; let y;
      do { x = rnd(10, W - 10); y = rnd(10, H - 10); } while (Math.hypot(x - W / 2, y - H / 2) < r + 8);
      const a = rnd(0, Math.PI * 2);
      mol.push({ x, y, vx: Math.cos(a), vy: Math.sin(a) });
    }
    S.current = { mol, p: { x: W / 2, y: H / 2, vx: 0, vy: 0, r, m: (r / 3.2) ** 2 }, trail: [{ x: W / 2, y: H / 2 }], tt: 0 };
  }, [big]);
  useEffect(() => { reset(); }, [reset]);
  const speed = 170 * Math.sqrt(temp / 300);

  useLoop((dt) => {
    const st = S.current; const c = ref.current;
    if (!st || !c) return;
    const g = c.getContext('2d');
    const { p } = st;
    if (run) {
      const steps = 3; const h = dt / steps;
      for (let s = 0; s < steps; s++) {
        for (const m of st.mol) {
          const sp = Math.hypot(m.vx, m.vy) || 1;
          // termostat: tezlik modulini haroratga moslab turamiz
          const target = speed * (0.6 + 0.8 * ((m.x * 7 + m.y * 13) % 1));
          m.vx = (m.vx / sp) * (sp * 0.98 + target * 0.02);
          m.vy = (m.vy / sp) * (sp * 0.98 + target * 0.02);
          m.x += m.vx * h; m.y += m.vy * h;
          if (m.x < 3) { m.x = 3; m.vx = Math.abs(m.vx); }
          if (m.x > W - 3) { m.x = W - 3; m.vx = -Math.abs(m.vx); }
          if (m.y < 3) { m.y = 3; m.vy = Math.abs(m.vy); }
          if (m.y > H - 3) { m.y = H - 3; m.vy = -Math.abs(m.vy); }
          const dx = m.x - p.x; const dy = m.y - p.y; const d = Math.hypot(dx, dy);
          if (d < p.r + 3 && d > 0) {
            const nx = dx / d; const ny = dy / d;
            const rel = (m.vx - p.vx) * nx + (m.vy - p.vy) * ny;
            if (rel < 0) {
              const j = (2 * rel) / (1 + 1 / p.m);
              m.vx -= j * nx; m.vy -= j * ny;
              p.vx += (j / p.m) * nx; p.vy += (j / p.m) * ny;
            }
            m.x = p.x + nx * (p.r + 3.5); m.y = p.y + ny * (p.r + 3.5);
          }
        }
        p.x += p.vx * h; p.y += p.vy * h;
        p.vx *= 0.995; p.vy *= 0.995;
        if (p.x < p.r) { p.x = p.r; p.vx = Math.abs(p.vx); }
        if (p.x > W - p.r) { p.x = W - p.r; p.vx = -Math.abs(p.vx); }
        if (p.y < p.r) { p.y = p.r; p.vy = Math.abs(p.vy); }
        if (p.y > H - p.r) { p.y = H - p.r; p.vy = -Math.abs(p.vy); }
      }
      st.tt += dt;
      if (st.tt > 0.12) { st.tt = 0; st.trail.push({ x: p.x, y: p.y }); if (st.trail.length > 400) st.trail.shift(); }
    }
    g.fillStyle = '#EEF6FF'; g.fillRect(0, 0, W, H);
    if (showMol) {
      g.fillStyle = 'rgba(29,78,216,.75)';
      for (const m of st.mol) { g.beginPath(); g.arc(m.x, m.y, 3, 0, 7); g.fill(); }
    }
    g.strokeStyle = '#E2463F'; g.lineWidth = 2.5; g.beginPath();
    st.trail.forEach((q, k) => (k ? g.lineTo(q.x, q.y) : g.moveTo(q.x, q.y)));
    g.lineTo(p.x, p.y); g.stroke();
    g.fillStyle = '#E2463F'; st.trail.forEach((q) => { g.beginPath(); g.arc(q.x, q.y, 3, 0, 7); g.fill(); });
    const grd = g.createRadialGradient(p.x - p.r / 3, p.y - p.r / 3, 2, p.x, p.y, p.r);
    grd.addColorStop(0, '#FDE68A'); grd.addColorStop(1, '#D97706');
    g.fillStyle = grd; g.beginPath(); g.arc(p.x, p.y, p.r, 0, 7); g.fill();
    g.strokeStyle = '#14213D'; g.lineWidth = 2.5; g.stroke();
    g.fillStyle = '#14213D'; g.font = 'bold 18px Nunito, sans-serif';
    g.fillText(showMol ? 'ko‘k nuqtalar — suv molekulalari, sariq shar — gul changi' : 'Mikroskopda faqat gul changi ko‘rinadi', 14, 26);
  });

  return (
    <Panel icon={Microscope} title={cfg.title || 'Simulyatsiya: Broun harakati'} tone="bg-anor-500">
      <Canvas cref={ref} w={W} h={H} />
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <Slider label="Harorat" value={temp} min={100} max={600} step={10} onChange={setTemp} unit="K" show={`${temp} K (${temp - 273} °C)`} color="accent-rose-600" />
        <div className="flex flex-wrap items-center gap-2">
          <Btn onClick={() => setRun((v) => !v)} icon={run ? Pause : Play} color="bg-white text-ink hover:bg-amber-50">{run ? 'To‘xtatish' : 'Davom'}</Btn>
          <Btn onClick={() => setShowMol((v) => !v)} icon={Eye} color="bg-white text-ink hover:bg-amber-50">{showMol ? 'Molekulalarni yashirish' : 'Molekulalarni ko‘rsatish'}</Btn>
          <Btn onClick={() => setBig((v) => (v === 'big' ? 'small' : 'big'))} icon={Atom} color="bg-amber-400 text-ink hover:bg-amber-300">{big === 'big' ? 'Kichik zarra' : 'Katta zarra'}</Btn>
          <Btn onClick={reset} icon={RotateCcw} color="bg-white text-ink hover:bg-amber-50">Izni tozalash</Btn>
        </div>
      </div>
    </Panel>
  );
}

/* ---------- 5.2 Diffuziya (oq va qora sharchalar modeli) ---------- */
function DiffusionSim({ cfg = {} }) {
  const ref = useRef(null);
  const W = 900; const H = 400;
  const [temp, setTemp] = useState(300);
  const [wall, setWall] = useState(true);
  const [time, setTime] = useState(0);
  const [mix, setMix] = useState(0);
  const S = useRef(null);
  const shake = useRef(0);
  const reset = useCallback(() => {
    const ps = [];
    for (let i = 0; i < 240; i++) {
      const left = i < 120;
      ps.push({ x: left ? rnd(12, W / 2 - 12) : rnd(W / 2 + 12, W - 12), y: rnd(12, H - 12), a: rnd(0, 7), c: left ? 0 : 1 });
    }
    S.current = { ps, t: 0, ui: 0 };
    setWall(true); setTime(0); setMix(0);
  }, []);
  useEffect(() => { reset(); }, [reset]);
  const v0 = 60 * Math.sqrt(temp / 300);

  useLoop((dt) => {
    const st = S.current; const c = ref.current;
    if (!st || !c) return;
    const g = c.getContext('2d');
    const boost = shake.current > 0 ? 4 : 1;
    shake.current = Math.max(0, shake.current - dt);
    for (const p of st.ps) {
      p.a += gauss() * 0.9;
      p.x += Math.cos(p.a) * v0 * boost * dt;
      p.y += Math.sin(p.a) * v0 * boost * dt;
      const lo = wall && p.c === 1 ? W / 2 + 9 : 9;
      const hi = wall && p.c === 0 ? W / 2 - 9 : W - 9;
      if (p.x < lo) { p.x = lo; p.a = Math.PI - p.a; }
      if (p.x > hi) { p.x = hi; p.a = Math.PI - p.a; }
      if (p.y < 9) { p.y = 9; p.a = -p.a; }
      if (p.y > H - 9) { p.y = H - 9; p.a = -p.a; }
    }
    if (!wall) st.t += dt;
    st.ui += dt;
    if (st.ui > 0.25) {
      st.ui = 0;
      const whitesLeft = st.ps.filter((p) => p.c === 0 && p.x < W / 2).length / 120;
      setMix(Math.round((1 - Math.abs(whitesLeft - 0.5) / 0.5) * 100));
      setTime(st.t);
    }
    g.fillStyle = '#FBF8F1'; g.fillRect(0, 0, W, H);
    g.strokeStyle = 'rgba(20,33,61,.25)'; g.setLineDash([10, 8]); g.lineWidth = 2;
    g.beginPath(); g.moveTo(W / 2, 0); g.lineTo(W / 2, H); g.stroke(); g.setLineDash([]);
    if (wall) { g.fillStyle = '#14213D'; g.fillRect(W / 2 - 4, 0, 8, H); }
    for (const p of st.ps) {
      g.beginPath(); g.arc(p.x, p.y, 8, 0, 7);
      g.fillStyle = p.c === 0 ? '#FFFFFF' : '#14213D'; g.fill();
      g.strokeStyle = '#14213D'; g.lineWidth = 2; g.stroke();
    }
  });

  return (
    <Panel icon={Sparkles} title={cfg.title || 'Simulyatsiya: diffuziya — zarralar aralashishi'} tone="bg-firuza-600">
      <Canvas cref={ref} w={W} h={H} />
      <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_auto]">
        <Slider label="Harorat" value={temp} min={150} max={600} step={10} onChange={setTemp} unit="K" show={`${temp} K`} color="accent-rose-600" />
        <Readout label="Aralashish" value={`${mix}%`} />
        <Readout label="Vaqt" value={time.toFixed(1)} unit="s" tone="bg-sky-50 text-sky-900 border-sky-300" />
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <Btn onClick={() => setWall(false)} disabled={!wall} icon={Play}>To‘siqni olish</Btn>
        <Btn onClick={() => { shake.current = 1.2; }} icon={Hand} color="bg-amber-400 text-ink hover:bg-amber-300">Idishni silkitish</Btn>
        <Btn onClick={reset} icon={RotateCcw} color="bg-white text-ink hover:bg-amber-50">Qaytadan</Btn>
      </div>
    </Panel>
  );
}

/* ---------- 5.3 Gaz: porshenli idish (bosim, hajm, harorat) ---------- */
const GAS_N_TO_MOL = 0.002; // 1 ta chizilgan zarra = 0,002 mol (taqlid)

function gasPressure(N, T, V) { return (N * GAS_N_TO_MOL * R_GAS * T) / (V / 1000); } // Pa, V — litr

/**
 * Gaz idishi. lock: 'T' (izotermik), 'V' (izoxorik), 'p' (izobarik), 'N' (miqdor o‘zgarmas) yoki null.
 * onState — joriy holatni tashqariga beradi (laboratoriya uchun).
 */
function GasBox({ lock = null, N0 = 60, V0 = 3, T0 = 300, showN = true, graph = null, onState, title, tone = 'bg-blue-700', children, limits = {} }) {
  const ref = useRef(null);
  const W = 900; const H = 420;
  const isL = (k) => (Array.isArray(lock) ? lock.includes(k) : lock === k);
  const [N, setN] = useState(N0);
  const [V, setV] = useState(V0);
  const [T, setT] = useState(T0);
  const p0 = useRef(gasPressure(N0, T0, V0));
  const [hits, setHits] = useState(0);
  const [trace, setTrace] = useState([]);
  const S = useRef({ ps: [], hits: 0, ht: 0 });
  const Vmin = limits.Vmin ?? 1; const Vmax = limits.Vmax ?? 5;
  const Tmin = limits.Tmin ?? 100; const Tmax = limits.Tmax ?? 600;

  const Vreal = isL('p') ? clamp((N * GAS_N_TO_MOL * R_GAS * T) / p0.current * 1000, Vmin, Vmax) : V;
  const p = gasPressure(N, T, Vreal);
  const boxL = 30; const boxT = 40; const boxB = H - 30;
  const pistonX = boxL + 120 + ((Vreal - Vmin) / (Vmax - Vmin)) * 500;

  useEffect(() => {
    const st = S.current;
    while (st.ps.length < N) {
      const a = rnd(0, 7);
      st.ps.push({ x: rnd(boxL + 10, boxL + 120), y: rnd(boxT + 10, boxB - 10), vx: Math.cos(a), vy: Math.sin(a), f: 0.4 + Math.random() * 1.2 });
    }
    if (st.ps.length > N) st.ps.length = N;
  }, [N]);

  useEffect(() => { onState?.({ p, V: Vreal, T, N, nu: N * GAS_N_TO_MOL }); }, [p, Vreal, T, N]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!graph) return;
    setTrace((tr) => {
      const pt = { p: p / 1000, V: Vreal, T };
      const lastPt = tr[tr.length - 1];
      if (lastPt && Math.abs(lastPt.V - pt.V) < 0.05 && Math.abs(lastPt.T - pt.T) < 3 && Math.abs(lastPt.p - pt.p) < 1) return tr;
      return [...tr.slice(-120), pt];
    });
  }, [p, Vreal, T, graph]);

  useLoop((dt) => {
    const st = S.current; const c = ref.current;
    if (!c) return;
    const g = c.getContext('2d');
    const sp = 150 * Math.sqrt(T / 300);
    for (const m of st.ps) {
      const vv = Math.hypot(m.vx, m.vy) || 1;
      m.vx = (m.vx / vv) * sp * m.f; m.vy = (m.vy / vv) * sp * m.f;
      m.x += m.vx * dt; m.y += m.vy * dt;
      if (m.x < boxL + 6) { m.x = boxL + 6; m.vx = Math.abs(m.vx); st.hits++; }
      if (m.x > pistonX - 6) { m.x = pistonX - 6; m.vx = -Math.abs(m.vx); st.hits++; }
      if (m.y < boxT + 6) { m.y = boxT + 6; m.vy = Math.abs(m.vy); st.hits++; }
      if (m.y > boxB - 6) { m.y = boxB - 6; m.vy = -Math.abs(m.vy); st.hits++; }
    }
    st.ht += dt;
    if (st.ht > 1) { setHits(Math.round(st.hits / st.ht)); st.hits = 0; st.ht = 0; }

    g.fillStyle = '#FBF8F1'; g.fillRect(0, 0, W, H);
    // idish
    const hot = clamp((T - 100) / 500, 0, 1);
    g.fillStyle = `rgba(${Math.round(120 + 135 * hot)},${Math.round(180 - 80 * hot)},${Math.round(255 - 200 * hot)},0.18)`;
    g.fillRect(boxL, boxT, pistonX - boxL, boxB - boxT);
    g.strokeStyle = '#14213D'; g.lineWidth = 5;
    g.beginPath(); g.moveTo(boxL + 640, boxT); g.lineTo(boxL, boxT); g.lineTo(boxL, boxB); g.lineTo(boxL + 640, boxB); g.stroke();
    // porshen
    g.fillStyle = '#94A3B8'; g.fillRect(pistonX, boxT + 3, 16, boxB - boxT - 6);
    g.strokeStyle = '#14213D'; g.lineWidth = 2.5; g.strokeRect(pistonX, boxT + 3, 16, boxB - boxT - 6);
    g.fillStyle = '#64748B'; g.fillRect(pistonX + 16, (boxT + boxB) / 2 - 8, W - pistonX - 200, 16);
    // zarralar
    for (const m of st.ps) {
      const f = m.f;
      g.fillStyle = f > 1.2 ? '#E2463F' : f > 0.8 ? '#D97706' : '#1D4ED8';
      g.beginPath(); g.arc(m.x, m.y, 5, 0, 7); g.fill();
    }
    // manometr
    const cx = W - 95; const cy = 120; const r = 70;
    g.fillStyle = '#fff'; g.beginPath(); g.arc(cx, cy, r, 0, 7); g.fill();
    g.strokeStyle = '#14213D'; g.lineWidth = 4; g.stroke();
    const pmax = limits.pmax ?? ([200, 500, 1000, 2000].find((x) => x >= (p / 1000) * 1.05) || 2000);
    for (let k = 0; k <= 10; k++) {
      const a = Math.PI * 0.75 + (k / 10) * Math.PI * 1.5;
      g.lineWidth = k % 2 ? 2 : 3;
      g.beginPath(); g.moveTo(cx + Math.cos(a) * (r - 6), cy + Math.sin(a) * (r - 6)); g.lineTo(cx + Math.cos(a) * (r - (k % 2 ? 14 : 18)), cy + Math.sin(a) * (r - (k % 2 ? 14 : 18))); g.stroke();
      if (k % 2 === 0) { g.fillStyle = '#14213D'; g.font = 'bold 13px Nunito, sans-serif'; g.textAlign = 'center'; g.fillText(String((pmax * k) / 10), cx + Math.cos(a) * (r - 30), cy + Math.sin(a) * (r - 30) + 4); }
    }
    const a = Math.PI * 0.75 + clamp(p / 1000 / pmax, 0, 1.05) * Math.PI * 1.5;
    g.strokeStyle = '#E2463F'; g.lineWidth = 4; g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx + Math.cos(a) * (r - 12), cy + Math.sin(a) * (r - 12)); g.stroke();
    g.fillStyle = '#14213D'; g.beginPath(); g.arc(cx, cy, 6, 0, 7); g.fill();
    g.font = 'bold 15px Nunito, sans-serif'; g.fillText('kPa', cx, cy + 36);
    g.textAlign = 'left';
    // termometr
    const tx = W - 120; const ty0 = 220; const ty1 = 390;
    g.fillStyle = '#fff'; g.fillRect(tx, ty0, 20, ty1 - ty0); g.strokeStyle = '#14213D'; g.lineWidth = 2.5; g.strokeRect(tx, ty0, 20, ty1 - ty0);
    const lvl = ty1 - ((T - 0) / 700) * (ty1 - ty0);
    g.fillStyle = '#E2463F'; g.fillRect(tx + 4, lvl, 12, ty1 - lvl);
    g.beginPath(); g.arc(tx + 10, ty1 + 10, 14, 0, 7); g.fill(); g.stroke();
    g.fillStyle = '#14213D'; g.font = 'bold 17px Nunito, sans-serif'; g.fillText(`${Math.round(T)} K`, tx + 30, lvl + 6);
    g.font = 'bold 16px Nunito, sans-serif'; g.fillText('qizil — tez, ko‘k — sekin molekula', boxL + 6, 28);
  });

  return (
    <Panel icon={Atom} title={title || 'Simulyatsiya: idishdagi gaz'} tone={tone}>
      <Canvas cref={ref} w={W} h={H} />
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Readout label="Bosim p" value={sci(p / 1000, 3)} unit="kPa" tone="bg-rose-50 text-rose-900 border-rose-300" />
        <Readout label="Hajm V" value={sci(Vreal, 3)} unit="l" tone="bg-sky-50 text-sky-900 border-sky-300" />
        <Readout label="Harorat T" value={Math.round(T)} unit="K" tone="bg-amber-50 text-amber-900 border-amber-300" />
        <Readout label="Devorga urilish" value={hits} unit="ta/s" tone="bg-emerald-50 text-emerald-900 border-emerald-300" />
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-3">
        <Slider label={`Hajm${isL('V') ? ' (o‘zgarmas)' : isL('p') ? ' (o‘zi o‘zgaradi)' : ''}`} value={Vreal} min={Vmin} max={Vmax} step={0.1} onChange={setV} unit="l" show={sci(Vreal, 3)} disabled={isL('V') || isL('p')} color="accent-sky-600" />
        <Slider label={`Harorat${isL('T') ? ' (o‘zgarmas)' : ''}`} value={T} min={Tmin} max={Tmax} step={10} onChange={setT} unit="K" disabled={isL('T')} color="accent-rose-600" />
        {showN && <Slider label={`Molekulalar soni${isL('N') ? ' (o‘zgarmas)' : ''}`} value={N} min={10} max={150} step={10} onChange={setN} unit="ta" disabled={isL('N')} color="accent-emerald-600" />}
      </div>
      {graph && (
        <div className="mt-4">
          <Graph
            title={graph === 'pV' ? 'p(V) grafigi — siz o‘zgartirgan holatlar' : graph === 'pT' ? 'p(T) grafigi' : 'V(T) grafigi'}
            rows={trace}
            x={graph === 'pV' ? { k: 'V', l: 'V, l', max: Vmax } : { k: 'T', l: 'T, K', max: Tmax }}
            ys={[graph === 'VT' ? { k: 'V', l: 'V, l' } : { k: 'p', l: 'p, kPa' }]}
            lines={false}
          />
          <div className="mt-2 flex justify-end"><Btn onClick={() => setTrace([])} icon={RotateCcw} color="bg-white text-ink hover:bg-amber-50">Grafikni tozalash</Btn></div>
        </div>
      )}
      {children}
    </Panel>
  );
}

/* ---------- 5.4 Selsiy va Kelvin termometri ---------- */
const THERMO_MARKS = [
  { c: -273, l: 'Absolyut nol' },
  { c: -196, l: 'Suyuq azot qaynaydi' },
  { c: -89, l: 'Antarktida rekordi' },
  { c: 0, l: 'Muz eriydi' },
  { c: 37, l: 'Odam tanasi' },
  { c: 100, l: 'Suv qaynaydi' },
];

function ThermoSim({ cfg = {} }) {
  const ref = useRef(null);
  const W = 900; const H = 440;
  const [t, setT] = useState(cfg.t ?? 27);
  const S = useRef(null);
  if (!S.current) {
    S.current = Array.from({ length: 40 }, () => ({ x: rnd(560, 880), y: rnd(70, 420), a: rnd(0, 7), f: 0.5 + Math.random() }));
  }
  const TK = t + 273;
  useLoop((dt) => {
    const c = ref.current; if (!c) return;
    const g = c.getContext('2d');
    g.fillStyle = '#FBF8F1'; g.fillRect(0, 0, W, H);
    const top = 40; const bot = 400; const cmin = -273; const cmax = 130;
    const y = (cc) => bot - ((cc - cmin) / (cmax - cmin)) * (bot - top);
    const drawTube = (x, label) => {
      g.fillStyle = '#fff'; g.fillRect(x, top - 10, 34, bot - top + 20);
      g.strokeStyle = '#14213D'; g.lineWidth = 3; g.strokeRect(x, top - 10, 34, bot - top + 20);
      g.fillStyle = '#E2463F'; g.fillRect(x + 8, y(t), 18, bot + 10 - y(t));
      g.beginPath(); g.arc(x + 17, bot + 22, 18, 0, 7); g.fill(); g.stroke();
      g.fillStyle = '#14213D'; g.font = '900 22px Nunito, sans-serif'; g.textAlign = 'center'; g.fillText(label, x + 17, top - 18);
    };
    drawTube(150, '°C');
    drawTube(330, 'K');
    g.font = 'bold 15px Nunito, sans-serif';
    for (let cc = -260; cc <= 120; cc += 20) {
      const yy = y(cc);
      g.strokeStyle = '#94A3B8'; g.lineWidth = 1.5;
      g.beginPath(); g.moveTo(184, yy); g.lineTo(196, yy); g.moveTo(318, yy); g.lineTo(330, yy); g.stroke();
    }
    g.textAlign = 'left';
    THERMO_MARKS.forEach((m) => {
      const yy = y(m.c);
      g.strokeStyle = 'rgba(20,33,61,.35)'; g.setLineDash([5, 5]); g.beginPath(); g.moveTo(186, yy); g.lineTo(330, yy); g.stroke(); g.setLineDash([]);
      g.fillStyle = '#14213D'; g.font = 'bold 15px Nunito, sans-serif';
      g.textAlign = 'right'; g.fillText(`${m.c}`, 145, yy + 5);
      g.textAlign = 'left'; g.fillText(`${m.c + 273}`, 372, yy + 5);
      g.font = '600 14px Nunito, sans-serif'; g.fillStyle = '#475569'; g.fillText(m.l, 420, yy + 5);
    });
    // molekulalar qutisi
    g.strokeStyle = '#14213D'; g.lineWidth = 3; g.strokeRect(550, 60, 340, 370);
    g.fillStyle = '#14213D'; g.font = '900 17px Nunito, sans-serif'; g.textAlign = 'center';
    g.fillText(TK <= 0 ? 'Harakat to‘xtadi!' : 'Molekulalar harakati', 720, 50);
    const sp = TK <= 0 ? 0 : 200 * Math.sqrt(TK / 300);
    for (const m of S.current) {
      m.a += gauss() * 0.15;
      m.x += Math.cos(m.a) * sp * m.f * dt; m.y += Math.sin(m.a) * sp * m.f * dt;
      if (m.x < 560 || m.x > 880) { m.a = Math.PI - m.a; m.x = clamp(m.x, 560, 880); }
      if (m.y < 70 || m.y > 420) { m.a = -m.a; m.y = clamp(m.y, 70, 420); }
      g.fillStyle = TK <= 0 ? '#94A3B8' : '#1D4ED8'; g.beginPath(); g.arc(m.x, m.y, 7, 0, 7); g.fill();
    }
    g.textAlign = 'left';
  });
  return (
    <Panel icon={Thermometer} title={cfg.title || 'Simulyatsiya: Selsiy va Kelvin shkalalari'} tone="bg-anor-500">
      <Canvas cref={ref} w={W} h={H} />
      <div className="mt-4 grid items-center gap-3 md:grid-cols-[1fr_auto]">
        <Slider label="Haroratni o‘zgartiring" value={t} min={-273} max={127} step={1} onChange={setT} unit="°C" color="accent-rose-600" />
        <div className="rounded-3xl border-[2.5px] border-ink bg-amber-300 px-6 py-3 text-center text-3xl md:text-4xl font-black text-ink">
          {t} °C = {TK} K
        </div>
      </div>
      <p className="mt-3 text-xl font-bold text-slate-700">T = t + 273. Shkalada qadam bir xil: 1 °C ga isisa, 1 K ga ham isiydi.</p>
    </Panel>
  );
}

/* ---------- 5.5 Maksvell taqsimoti ---------- */
const GASES = [
  { id: 'H2', l: 'H₂ — vodorod', M: 0.002, c: '#E2463F' },
  { id: 'He', l: 'He — geliy', M: 0.004, c: '#D97706' },
  { id: 'N2', l: 'N₂ — azot', M: 0.028, c: '#0EA5A4' },
  { id: 'O2', l: 'O₂ — kislorod', M: 0.032, c: '#1D4ED8' },
  { id: 'CO2', l: 'CO₂ — karbonat angidrid', M: 0.044, c: '#7C3AED' },
];
function maxwell2D(v, M, T) {
  const a = M / (R_GAS * T); // 3D Maksvell taqsimoti
  return 4 * Math.PI * (a / (2 * Math.PI)) ** 1.5 * v * v * Math.exp((-a * v * v) / 2);
}

function MaxwellSim({ cfg = {} }) {
  const [gas, setGas] = useState(cfg.gas || 'O2');
  const [T, setT] = useState(cfg.T || 300);
  const [pinned, setPinned] = useState([]);
  const G = GASES.find((x) => x.id === gas);
  const vp = Math.sqrt((2 * R_GAS * T) / G.M);
  const vk = Math.sqrt((3 * R_GAS * T) / G.M);
  const curves = [...pinned, { gas, T }];
  const vmax = Math.max(...curves.map((c) => 3.2 * Math.sqrt((2 * R_GAS * c.T) / GASES.find((x) => x.id === c.gas).M)));
  const W = 640; const H = 330; const L = 60; const B = 50; const Tp = 16; const Rp = 16;
  const fmax = Math.max(...curves.map((c) => { const g = GASES.find((x) => x.id === c.gas); return maxwell2D(Math.sqrt((2 * R_GAS * c.T) / g.M), g.M, c.T); }));
  const px = (v) => L + (v / vmax) * (W - L - Rp);
  const py = (f) => H - B - (f / fmax) * (H - B - Tp) * 0.95;
  const xt = niceTicks(0, vmax);
  return (
    <Panel icon={Sparkles} title={cfg.title || 'Simulyatsiya: molekulalar tezliklar bo‘yicha taqsimoti (Maksvell)'} tone="bg-violet-600">
      <div className="mb-3 flex flex-wrap gap-2">
        {GASES.map((g) => (
          <button key={g.id} onClick={() => setGas(g.id)} className={`rounded-xl border-2 border-ink px-3 py-2 text-lg font-black ${gas === g.id ? 'bg-amber-400 text-ink' : 'bg-white text-ink hover:bg-amber-50'}`}>{g.l}</button>
        ))}
      </div>
      <div className="rounded-2xl border-2 border-ink/20 bg-white p-2">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
          <line x1={L} x2={W - Rp} y1={H - B} y2={H - B} stroke="#14213D" strokeWidth="2.5" />
          <line x1={L} x2={L} y1={Tp} y2={H - B} stroke="#14213D" strokeWidth="2.5" />
          {xt.filter((v) => v <= vmax).map((v) => <g key={v}><line x1={px(v)} x2={px(v)} y1={H - B} y2={H - B + 6} stroke="#14213D" /><text x={px(v)} y={H - B + 22} textAnchor="middle" fontSize="15" fontWeight="700" fill="#475569">{v}</text></g>)}
          <text x={(L + W) / 2} y={H - 6} textAnchor="middle" fontSize="16" fontWeight="900" fill="#14213D">tezlik v, m/s</text>
          <text x={18} y={(H - B) / 2} textAnchor="middle" fontSize="16" fontWeight="900" fill="#14213D" transform={`rotate(-90 18 ${(H - B) / 2})`}>molekulalar ulushi</text>
          {curves.map((c, k) => {
            const g = GASES.find((x) => x.id === c.gas);
            let d = '';
            for (let i = 0; i <= 120; i++) { const v = (vmax * i) / 120; d += `${i ? 'L' : 'M'}${px(v).toFixed(1)},${py(maxwell2D(v, g.M, c.T)).toFixed(1)} `; }
            const cur = k === curves.length - 1;
            return <path key={k} d={d} fill={cur ? `${g.c}22` : 'none'} stroke={g.c} strokeWidth={cur ? 4 : 2.5} strokeDasharray={cur ? '' : '7 5'} />;
          })}
          <line x1={px(vp)} x2={px(vp)} y1={Tp} y2={H - B} stroke="#14213D" strokeWidth="2" strokeDasharray="4 4" />
          <text x={px(vp) + 6} y={Tp + 18} fontSize="15" fontWeight="900" fill="#14213D">v ehtimoliy</text>
          <line x1={px(vk)} x2={px(vk)} y1={Tp + 30} y2={H - B} stroke="#E2463F" strokeWidth="2.5" />
          <text x={px(vk) + 6} y={Tp + 48} fontSize="15" fontWeight="900" fill="#E2463F">v o‘rt.kv</text>
        </svg>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_auto]">
        <Slider label="Harorat" value={T} min={100} max={1500} step={50} onChange={setT} unit="K" color="accent-rose-600" />
        <Readout label="Eng ko‘p uchraydigan" value={Math.round(vp)} unit="m/s" />
        <Readout label="O‘rtacha kvadratik" value={Math.round(vk)} unit="m/s" tone="bg-rose-50 text-rose-900 border-rose-300" />
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <Btn onClick={() => setPinned((p) => [...p.slice(-2), { gas, T }])} icon={Plus} color="bg-amber-400 text-ink hover:bg-amber-300">Egri chiziqni saqlab, solishtirish</Btn>
        {pinned.length > 0 && <Btn onClick={() => setPinned([])} icon={RotateCcw} color="bg-white text-ink hover:bg-amber-50">Tozalash</Btn>}
      </div>
    </Panel>
  );
}

/* ---------- 5.6 Shtern tajribasi ---------- */
const AG_M = 0.108;
function SternView({ T, omega, run, onMeasured, height = 420 }) {
  const ref = useRef(null);
  const W = 900; const H = height;
  const S = useRef({ dep: new Array(120).fill(0), fly: [], ang: 0, tt: 0, total: 0 });
  useEffect(() => { S.current = { dep: new Array(120).fill(0), fly: [], ang: 0, tt: 0, total: 0 }; }, [T, omega]);
  const sMax = 0.05; // 5 sm gacha siljish oralig‘i
  useLoop((dt) => {
    const c = ref.current; if (!c) return;
    const g = c.getContext('2d');
    const st = S.current;
    const cx = 260; const cy = H / 2; const Rp = 170; const rp = 28;
    if (run) {
      st.ang += Math.min(omega, 400) / 400 * 2.2 * dt;
      for (let k = 0; k < 14; k++) {
        // tirqishdan chiqqan dasta: tezliklar taqsimoti ~ v³·exp(−v²/a²)
        const a = Math.sqrt((2 * R_GAS * T) / AG_M);
        const v = a * Math.sqrt(-Math.log(1 - Math.random()) - Math.log(1 - Math.random()));
        if (v < 120) continue;
        const shift = (omega * 0.16 * (0.16 - 0.012)) / v;
        const idx = Math.floor((shift / sMax) * 120);
        if (idx >= 0 && idx < 120) st.dep[idx] += 1;
        st.total += 1;
        if (k < 2) st.fly.push({ t: 0, v, shift });
      }
      st.fly.forEach((f) => { f.t += dt; });
      st.fly = st.fly.filter((f) => f.t < 0.6).slice(-40);
    }
    g.fillStyle = '#FBF8F1'; g.fillRect(0, 0, W, H);
    // silindrlar (aylanuvchi)
    g.save(); g.translate(cx, cy); g.rotate(st.ang);
    g.strokeStyle = '#14213D'; g.lineWidth = 6;
    g.beginPath(); g.arc(0, 0, Rp, 0, 7); g.stroke();
    g.lineWidth = 4; g.beginPath(); g.arc(0, 0, rp, -Math.PI / 2 + 0.12, -Math.PI / 2 - 0.12 + Math.PI * 2); g.stroke();
    // qatlam (ichki devorda)
    const mx = Math.max(1, ...st.dep);
    for (let i = 0; i < 120; i++) {
      if (!st.dep[i]) continue;
      const sArc = ((i + 0.5) / 120) * sMax; // m
      const phi = sArc / 0.16; // rad
      const a = -Math.PI / 2 - phi * 3; // ko‘rinish uchun 3 marta kattalashtirilgan
      const th = (st.dep[i] / mx) * 14;
      g.strokeStyle = '#94A3B8'; g.lineWidth = th;
      g.beginPath(); g.arc(0, 0, Rp - 3 - th / 2, a - 0.012, a + 0.012); g.stroke();
    }
    g.fillStyle = '#E2463F'; g.fillRect(-4, -Rp - 14, 8, 10);
    g.restore();
    // uchayotgan atomlar (aylanuvchi sistemada egri)
    g.fillStyle = '#64748B';
    st.fly.forEach((f) => {
      const frac = clamp(f.t / 0.5, 0, 1);
      const rr = rp + (Rp - rp) * frac;
      const phi = (f.shift / 0.16) * 3 * frac;
      const a = st.ang - Math.PI / 2 - phi;
      g.beginPath(); g.arc(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr, 3.5, 0, 7); g.fill();
    });
    g.fillStyle = '#F59E0B'; g.beginPath(); g.arc(cx, cy, 8, 0, 7); g.fill(); g.strokeStyle = '#14213D'; g.lineWidth = 2; g.stroke();
    g.fillStyle = '#14213D'; g.font = 'bold 15px Nunito, sans-serif'; g.textAlign = 'center';
    g.fillText('platina sim', cx, cy + 28);
    // chizg‘ich (tashqi silindr yoyilgan holda)
    const rx = 500; const rw = 370; const ry = 90;
    g.textAlign = 'left'; g.font = '900 18px Nunito, sans-serif'; g.fillText('Tashqi silindr devori (yoyib ko‘rsatilgan)', rx, ry - 30);
    g.fillStyle = '#fff'; g.fillRect(rx, ry, rw, 90); g.strokeStyle = '#14213D'; g.lineWidth = 2.5; g.strokeRect(rx, ry, rw, 90);
    for (let i = 0; i < 120; i++) {
      if (!st.dep[i]) continue;
      const x = rx + (i / 120) * rw;
      g.fillStyle = `rgba(100,116,139,${clamp(st.dep[i] / mx, 0.08, 1)})`;
      g.fillRect(x, ry + 6, rw / 120 + 0.5, 78);
    }
    g.strokeStyle = '#E2463F'; g.lineWidth = 3; g.beginPath(); g.moveTo(rx, ry - 6); g.lineTo(rx, ry + 96); g.stroke();
    g.fillStyle = '#E2463F'; g.font = 'bold 15px Nunito, sans-serif'; g.fillText('b (aylanmaganda)', rx - 4, ry + 116);
    for (let mm = 0; mm <= 50; mm += 1) {
      const x = rx + (mm / 50) * rw;
      g.strokeStyle = '#14213D'; g.lineWidth = mm % 10 === 0 ? 2.5 : mm % 5 === 0 ? 1.8 : 1;
      g.beginPath(); g.moveTo(x, ry + 140); g.lineTo(x, ry + 140 - (mm % 10 === 0 ? 22 : mm % 5 === 0 ? 15 : 9)); g.stroke();
      if (mm % 10 === 0) { g.fillStyle = '#14213D'; g.font = 'bold 15px Nunito, sans-serif'; g.textAlign = 'center'; g.fillText(`${mm / 10} sm`, x, ry + 160); }
    }
    g.textAlign = 'left';
    // o‘rtacha siljish
    let sum = 0; let n = 0;
    st.dep.forEach((d, i) => { sum += d * ((i + 0.5) / 120) * sMax; n += d; });
    const sAvg = n ? sum / n : 0;
    if (n > 60 && omega > 0) {
      const x = rx + (sAvg / sMax) * rw;
      g.strokeStyle = '#0EA5A4'; g.lineWidth = 3; g.setLineDash([6, 4]); g.beginPath(); g.moveTo(x, ry - 6); g.lineTo(x, ry + 140); g.stroke(); g.setLineDash([]);
      g.fillStyle = '#0B8584'; g.font = '900 16px Nunito, sans-serif'; g.fillText('qatlam o‘rtasi', x + 6, ry + 204);
    }
    st.sAvg = sAvg; st.n = n;
    if (onMeasured) onMeasured.current = { s: sAvg, n };
  });
  return <Canvas cref={ref} w={W} h={H} />;
}

function SternSim({ cfg = {} }) {
  const [T, setT] = useState(cfg.T || 1500);
  const [omega, setOmega] = useState(cfg.omega ?? 280);
  const [run, setRun] = useState(true);
  const vkv = Math.sqrt((3 * R_GAS * T) / AG_M);
  return (
    <Panel icon={Sparkles} title={cfg.title || 'Simulyatsiya: Otto Shtern tajribasi'} tone="bg-blue-700">
      <SternView T={T} omega={omega} run={run} />
      <div className="mt-4 grid gap-3 md:grid-cols-[1fr_1fr_auto]">
        <Slider label="Silindrlar burchak tezligi ω" value={omega} min={0} max={400} step={10} onChange={setOmega} unit="rad/s" color="accent-sky-600" />
        <Slider label="Platina sim harorati" value={T} min={900} max={2000} step={50} onChange={setT} unit="K" color="accent-rose-600" />
        <Readout label="Nazariy v o‘rt.kv" value={Math.round(vkv)} unit="m/s" />
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <Btn onClick={() => setRun((v) => !v)} icon={run ? Pause : Play} color="bg-white text-ink hover:bg-amber-50">{run ? 'To‘xtatish' : 'Davom'}</Btn>
      </div>
      <p className="mt-3 text-lg font-semibold text-slate-600">Rasmda burilish 3 marta kattalashtirib ko‘rsatilgan. Silindrlar aylanmasa (ω = 0), kumush qatlami roppa-rosa tirqish qarshisiga — b nuqtaga o‘tiradi.</p>
    </Panel>
  );
}

/* ---------- 5.7 O‘lchamlar zinapoyasi ---------- */
const SCALE_STEPS = [
  { e: 0, n: 'Bola bo‘yi', i: '🧒', d: '1 m' },
  { e: -1, n: 'Kaftning eni', i: '✋', d: '10 sm' },
  { e: -2, n: 'Tirnoq', i: '💅', d: '1 sm' },
  { e: -3, n: 'Chumoli', i: '🐜', d: '1 mm' },
  { e: -4, n: 'Soch tolasining qalinligi', i: '💇', d: '0,1 mm' },
  { e: -5, n: 'Qon hujayrasi', i: '🩸', d: '10 mikrometr' },
  { e: -6, n: 'Bakteriya', i: '🦠', d: '1 mikrometr' },
  { e: -7, n: 'Virus', i: '🧬', d: '100 nanometr' },
  { e: -8, n: 'Oqsil molekulasi', i: '🔗', d: '10 nanometr' },
  { e: -9, n: 'Zaytun moyi molekulasi', i: '🫒', d: '≈ 1,7 nanometr' },
  { e: -10, n: 'Atom', i: '⚛️', d: '≈ 0,1 nanometr' },
];
function ScaleSim({ cfg = {} }) {
  const [k, setK] = useState(0);
  const s = SCALE_STEPS[k];
  return (
    <Panel icon={Microscope} title={cfg.title || 'Interaktiv: 10 marta, yana 10 marta kichraytiramiz'} tone="bg-firuza-600">
      <div className="grid items-center gap-6 md:grid-cols-[1fr_1.2fr]">
        <div key={k} className="dp-pop flex aspect-square max-h-[320px] w-full items-center justify-center rounded-[2rem] border-[2.5px] border-ink bg-white text-[9rem] leading-none">{s.i}</div>
        <div>
          <div className="text-xl font-extrabold text-slate-500">{k + 1}-qadam / {SCALE_STEPS.length}</div>
          <div className="mt-1 text-4xl md:text-5xl font-black text-ink">{s.n}</div>
          <div className="mt-3 inline-block rounded-2xl border-[2.5px] border-ink bg-amber-300 px-5 py-2 text-3xl font-black text-ink">{s.d} = 10{String(s.e).split('').map((c) => SUP[c]).join('')} m</div>
          <div className="mt-5 flex h-4 overflow-hidden rounded-full bg-slate-200"><div className="bg-firuza-500 transition-all" style={{ width: `${((k + 1) / SCALE_STEPS.length) * 100}%` }} /></div>
          <div className="mt-5 flex flex-wrap gap-2">
            <Btn onClick={() => setK((x) => Math.max(0, x - 1))} disabled={k === 0} icon={ChevronLeft} color="bg-white text-ink hover:bg-amber-50">×10 kattalashtir</Btn>
            <Btn onClick={() => setK((x) => Math.min(SCALE_STEPS.length - 1, x + 1))} disabled={k === SCALE_STEPS.length - 1} icon={ChevronRight}>10 marta kichraytir</Btn>
          </div>
        </div>
      </div>
      <input type="range" min={0} max={SCALE_STEPS.length - 1} value={k} onChange={(e) => setK(Number(e.target.value))} className="mt-5 h-3 w-full accent-teal-600" />
    </Panel>
  );
}

/* ---------- 5.8 Molekula yig‘ish (nisbiy molekulyar massa) ---------- */
const ATOMS = [
  { s: 'H', n: 'vodorod', A: 1, c: 'bg-white' },
  { s: 'C', n: 'uglerod', A: 12, c: 'bg-slate-700 text-white' },
  { s: 'N', n: 'azot', A: 14, c: 'bg-sky-500 text-white' },
  { s: 'O', n: 'kislorod', A: 16, c: 'bg-rose-500 text-white' },
  { s: 'Na', n: 'natriy', A: 23, c: 'bg-violet-500 text-white' },
  { s: 'S', n: 'oltingugurt', A: 32, c: 'bg-yellow-300' },
  { s: 'Cl', n: 'xlor', A: 35.5, c: 'bg-lime-400' },
  { s: 'Fe', n: 'temir', A: 56, c: 'bg-orange-700 text-white' },
];
const PRESETS = [
  { n: 'Suv', f: { H: 2, O: 1 } }, { n: 'Karbonat angidrid', f: { C: 1, O: 2 } }, { n: 'Ozon', f: { O: 3 } },
  { n: 'Metan', f: { C: 1, H: 4 } }, { n: 'Osh tuzi', f: { Na: 1, Cl: 1 } }, { n: 'Azot', f: { N: 2 } }, { n: 'Ammiak', f: { N: 1, H: 3 } },
];
const SUB = { 0: '₀', 1: '₁', 2: '₂', 3: '₃', 4: '₄', 5: '₅', 6: '₆', 7: '₇', 8: '₈', 9: '₉' };
function formulaText(f) {
  const order = ['C', 'H', 'Na', 'Fe', 'N', 'S', 'Cl', 'O'];
  return order.filter((s) => f[s]).map((s) => `${s}${f[s] > 1 ? String(f[s]).split('').map((c) => SUB[c]).join('') : ''}`).join('') || '—';
}
function MolarSim({ cfg = {} }) {
  const [f, setF] = useState(cfg.start || { H: 2, O: 1 });
  const Mr = ATOMS.reduce((s, a) => s + (f[a.s] || 0) * a.A, 0);
  const add = (s, d) => setF((o) => { const n = { ...o, [s]: Math.max(0, (o[s] || 0) + d) }; if (!n[s]) delete n[s]; return n; });
  return (
    <Panel icon={Atom} title={cfg.title || 'Interaktiv: molekulani yig‘ing — massasini hisoblaymiz'} tone="bg-emerald-600">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {ATOMS.map((a) => (
          <div key={a.s} className="flex items-center gap-2 rounded-2xl border-2 border-ink/20 bg-white p-2">
            <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-[2.5px] border-ink text-2xl font-black ${a.c}`}>{a.s}</span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-base font-extrabold text-ink">{a.n}</div>
              <div className="text-sm font-bold text-slate-500">A = {String(a.A).replace('.', ',')}</div>
            </div>
            <div className="flex flex-col gap-1">
              <button onClick={() => add(a.s, 1)} className="rounded-lg border-2 border-ink bg-amber-300 p-0.5" aria-label="qo‘shish"><Plus size={18} /></button>
              <button onClick={() => add(a.s, -1)} className="rounded-lg border-2 border-ink bg-white p-0.5" aria-label="ayirish"><Minus size={18} /></button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {PRESETS.map((p) => <button key={p.n} onClick={() => setF(p.f)} className="rounded-xl border-2 border-ink bg-white px-3 py-1.5 text-base font-black text-ink hover:bg-amber-50">{p.n}</button>)}
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <Readout label="Formula" value={formulaText(f)} tone="bg-white text-ink border-ink" />
        <Readout label="Nisbiy molekulyar massa Mr" value={sci(Mr, 4)} unit="u" />
        <Readout label="Molyar massa M" value={sci(Mr, 4)} unit="g/mol" tone="bg-emerald-50 text-emerald-900 border-emerald-300" />
      </div>
      <div className="mt-3 rounded-2xl border-2 border-ink/20 bg-white p-4 text-xl font-bold text-slate-700">
        Bitta molekula massasi: m₀ = M / N<sub>A</sub> = {Mr ? sci((Mr / 1000) / N_A, 3) : '—'} kg
      </div>
    </Panel>
  );
}

export function FizSim({ sim }) {
  switch (sim.kind) {
    case 'brown': return <BrownSim cfg={sim} />;
    case 'diffusion': return <DiffusionSim cfg={sim} />;
    case 'gas': return <GasBox lock={sim.lock} N0={sim.N || 60} V0={sim.V || 3} T0={sim.T || 300} graph={sim.graph} title={sim.title} showN={sim.showN !== false} limits={sim.limits} />;
    case 'thermo': return <ThermoSim cfg={sim} />;
    case 'maxwell': return <MaxwellSim cfg={sim} />;
    case 'stern': return <SternSim cfg={sim} />;
    case 'scale': return <ScaleSim cfg={sim} />;
    case 'molar': return <MolarSim cfg={sim} />;
    default: return null;
  }
}

/* ============================================================
   6. SINF TAJRIBASI (haqiqiy, oddiy narsalar bilan)
   ============================================================ */

export function FizExperiment({ ex }) {
  const [vote, setVote] = useState(null);
  const [shown, setShown] = useState(false);
  const [counts, setCounts] = useState(() => (ex.predict?.opts || []).map(() => 0));
  return (
    <div className="mt-6 overflow-hidden rounded-3xl border-[2.5px] border-ink bg-white shadow-[5px_5px_0_#14213D]">
      <div className={`flex flex-wrap items-center gap-3 border-b-[2.5px] border-ink px-5 py-3 ${ex.home ? 'bg-violet-600' : 'bg-emerald-600'} text-white`}>
        <span className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-ink bg-paper text-ink">{ex.home ? <Home size={22} /> : <FlaskConical size={22} />}</span>
        <span className="flex-1 text-xl md:text-2xl font-black">{ex.home ? 'Uyda tajriba' : 'Sinfda tajriba'}: {ex.t}</span>
      </div>
      <div className="grid gap-5 p-4 md:p-6 lg:grid-cols-[1fr_1.1fr]">
        <div>
          {ex.need?.length > 0 && (
            <>
              <div className="mb-2 text-base font-extrabold uppercase tracking-wide text-slate-500">Kerakli narsalar</div>
              <div className="flex flex-wrap gap-2">
                {ex.need.map((n) => <span key={n} className="rounded-xl border-2 border-ink bg-amber-100 px-3 py-1.5 text-lg font-bold text-ink">{n}</span>)}
              </div>
            </>
          )}
          {ex.steps?.length > 0 && (
            <ol className="mt-4 space-y-2">
              {ex.steps.map((s, k) => (
                <li key={k} className="flex gap-3 text-lg md:text-xl leading-relaxed text-slate-800">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-emerald-400 text-base font-black text-ink">{k + 1}</span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          )}
          {ex.safety && <p className="mt-4 flex gap-2 rounded-2xl border-2 border-rose-300 bg-rose-50 p-3 text-lg font-bold text-rose-800"><ShieldAlert size={24} className="shrink-0" /> {ex.safety}</p>}
        </div>
        <div>
          {ex.predict && (
            <div className="rounded-2xl border-2 border-ink/20 bg-paper p-4">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-ink px-3 py-1 text-base font-black text-white"><Users size={18} /> Avval taxmin qiling!</div>
              <p className="text-xl md:text-2xl font-black text-ink">{ex.predict.q}</p>
              <div className="mt-3 space-y-2">
                {ex.predict.opts.map((o, k) => {
                  const right = shown && k === ex.predict.a;
                  const wrong = shown && vote === k && k !== ex.predict.a;
                  return (
                    <div key={k} className="flex items-center gap-2">
                      <button
                        onClick={() => { if (!shown) setVote(k); }}
                        className={`flex-1 rounded-2xl border-2 px-4 py-3 text-left text-lg md:text-xl font-bold transition ${right ? 'border-emerald-600 bg-emerald-100 text-emerald-900' : wrong ? 'border-rose-500 bg-rose-100 text-rose-900' : vote === k ? 'border-ink bg-amber-300 text-ink' : 'border-ink/30 bg-white text-ink hover:bg-amber-50'}`}
                      >
                        {right && <Check size={20} className="mr-1 inline" />}{o}
                      </button>
                      <button onClick={() => setCounts((c) => c.map((x, j) => (j === k ? x + 1 : x)))} className="flex h-12 min-w-12 items-center justify-center gap-1 rounded-xl border-2 border-ink bg-white px-2 text-lg font-black text-ink" title="Qo‘l ko‘targanlar soni">
                        <Hand size={18} />{counts[k]}
                      </button>
                    </div>
                  );
                })}
              </div>
              {!shown && <Btn onClick={() => setShown(true)} icon={Eye} className="mt-3" color="bg-emerald-600 text-white hover:bg-emerald-700">Natijani ko‘rsatish</Btn>}
            </div>
          )}
          {(shown || !ex.predict) && (ex.result || ex.why) && (
            <div className="dp-pop mt-3 rounded-2xl border-[2.5px] border-ink bg-emerald-50 p-4">
              {ex.result && <p className="text-xl md:text-2xl font-black text-emerald-900">{ex.result}</p>}
              {ex.why && <p className="mt-2 flex gap-2 text-lg md:text-xl leading-relaxed text-slate-700"><Lightbulb size={24} className="mt-0.5 shrink-0 text-amber-500" />{ex.why}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   7. VIRTUAL LABORATORIYA
   ============================================================ */

const LAB_STAGES = [
  { t: 'Asboblar', i: Wrench },
  { t: 'Tajriba', i: FlaskConical },
  { t: 'Jadval va grafik', i: LineChart },
  { t: 'Xulosa', i: Target },
];

function ToolShelf({ tools, onReady }) {
  const [picked, setPicked] = useState([]);
  const [msg, setMsg] = useState(null);
  const need = tools.filter((t) => t.ok).length;
  const got = picked.filter((k) => tools[k].ok).length;
  const click = (k) => {
    if (picked.includes(k)) return;
    if (!tools[k].ok) { setMsg({ bad: true, t: `«${tools[k].n}» bu tajribada kerak emas${tools[k].why ? ` — ${tools[k].why}` : ''}` }); return; }
    setPicked((p) => [...p, k]); setMsg({ bad: false, t: `To‘g‘ri! «${tools[k].n}» — ${tools[k].why || 'kerakli asbob'}` });
  };
  const done = got === need;
  return (
    <div>
      <p className="text-xl md:text-2xl font-bold text-ink">Tajriba uchun kerakli asboblarni bosib stolga qo‘ying. Ortiqcha asbob tanlamang!</p>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {tools.map((t, k) => {
          const on = picked.includes(k);
          return (
            <button key={k} onClick={() => click(k)} className={`flex flex-col items-center gap-1 rounded-2xl border-[2.5px] p-3 transition ${on ? 'border-emerald-600 bg-emerald-50' : 'border-ink/25 bg-white hover:-translate-y-0.5 hover:border-ink'}`}>
              <span className="text-5xl">{t.e}</span>
              <span className="text-center text-lg font-extrabold leading-tight text-ink">{t.n}</span>
              {on && <span className="inline-flex items-center gap-1 text-sm font-black text-emerald-700"><Check size={16} /> stolda</span>}
            </button>
          );
        })}
      </div>
      {msg && <p className={`dp-pop mt-4 rounded-2xl border-2 p-3 text-lg font-bold ${msg.bad ? 'border-rose-300 bg-rose-50 text-rose-800' : 'border-emerald-300 bg-emerald-50 text-emerald-800'}`}>{msg.t}</p>}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <span className="text-xl font-black text-ink">Tanlandi: {got} / {need}</span>
        <div className="flex gap-2">
          {!done && <Btn onClick={() => setPicked(tools.map((t, k) => (t.ok ? k : -1)).filter((k) => k >= 0))} color="bg-white text-ink hover:bg-amber-50">Ko‘rsatib berish</Btn>}
          <Btn onClick={onReady} disabled={!done} icon={Play}>Tajribani boshlash</Btn>
        </div>
      </div>
    </div>
  );
}

/* ---------- 7.1 Diffuziya tezligi va harorat ---------- */
function DiffusionTimeLab({ lab, onRecord }) {
  const ref = useRef(null);
  const W = 900; const H = 400;
  const temps = lab.temps || [10, 40, 80];
  const [tc, setTc] = useState(temps[0]);
  const [phase, setPhase] = useState('idle'); // idle | run | done
  const [time, setTime] = useState(0);
  const [mix, setMix] = useState(0);
  const S = useRef(null);
  const init = useCallback(() => {
    S.current = { ps: [], t: 0, ui: 0, D: 0 };
    setPhase('idle'); setTime(0); setMix(0);
  }, []);
  useEffect(() => { init(); }, [tc, init]);
  const bx = 250; const bw = 400; const by = 40; const bh = 340;
  const drop = () => {
    const tTarget = 32 * Math.exp(-(tc - 10) / 60) * rnd(0.92, 1.08);
    const D = (0.42 * bw) ** 2 / (2 * tTarget);
    const ps = Array.from({ length: 700 }, () => ({ x: bx + bw / 2 + gauss() * 6, y: by + 30 + gauss() * 6 }));
    S.current = { ps, t: 0, ui: 0, D };
    setPhase('run');
  };
  const stop = useCallback(() => {
    setPhase('done');
    const st = S.current;
    onRecord({ tc, time: Number(st.t.toFixed(1)) });
  }, [onRecord, tc]);
  useLoop((dt) => {
    const c = ref.current; if (!c) return;
    const g = c.getContext('2d'); const st = S.current; if (!st) return;
    if (phase === 'run') {
      const sd = Math.sqrt(2 * st.D * dt);
      for (const p of st.ps) {
        p.x += gauss() * sd; p.y += gauss() * sd;
        if (p.x < bx + 4) p.x = 2 * (bx + 4) - p.x;
        if (p.x > bx + bw - 4) p.x = 2 * (bx + bw - 4) - p.x;
        if (p.y < by + 4) p.y = 2 * (by + 4) - p.y;
        if (p.y > by + bh - 4) p.y = 2 * (by + bh - 4) - p.y;
      }
      st.t += dt; st.ui += dt;
      if (st.ui > 0.2) {
        st.ui = 0;
        const n = st.ps.length;
        const mx = st.ps.reduce((s, p) => s + p.x, 0) / n; const my = st.ps.reduce((s, p) => s + p.y, 0) / n;
        const sx = Math.sqrt(st.ps.reduce((s, p) => s + (p.x - mx) ** 2, 0) / n) / (bw / Math.sqrt(12));
        const sy = Math.sqrt(st.ps.reduce((s, p) => s + (p.y - my) ** 2, 0) / n) / (bh / Math.sqrt(12));
        const m = clamp(Math.min(sx, sy), 0, 1);
        setMix(Math.round(clamp(m / 0.9, 0, 1) * 100)); setTime(st.t);
        if (m >= 0.9) stop();
      }
    }
    g.fillStyle = '#FBF8F1'; g.fillRect(0, 0, W, H);
    const warm = (tc - 10) / 80;
    g.fillStyle = `rgba(${Math.round(186 + 60 * warm)},${Math.round(224 - 40 * warm)},${Math.round(253 - 120 * warm)},0.55)`;
    g.fillRect(bx, by, bw, bh);
    g.fillStyle = 'rgba(37,56,170,0.16)';
    st.ps.forEach((p) => { g.beginPath(); g.arc(p.x, p.y, 9, 0, 7); g.fill(); });
    g.strokeStyle = '#14213D'; g.lineWidth = 5;
    g.beginPath(); g.moveTo(bx - 6, by - 20); g.lineTo(bx - 6, by + bh + 6); g.lineTo(bx + bw + 6, by + bh + 6); g.lineTo(bx + bw + 6, by - 20); g.stroke();
    // termometr
    g.fillStyle = '#fff'; g.fillRect(bx + bw - 40, by - 30, 16, 200); g.lineWidth = 2; g.strokeRect(bx + bw - 40, by - 30, 16, 200);
    g.fillStyle = '#E2463F'; const lv = by + 170 - (tc / 100) * 190; g.fillRect(bx + bw - 36, lv, 8, by + 170 - lv);
    g.fillStyle = '#14213D'; g.font = '900 26px Nunito, sans-serif'; g.fillText(`${tc} °C`, bx + bw + 20, by + 40);
    // sekundomer
    g.font = '900 54px Nunito, sans-serif'; g.fillText(`${(st.t || 0).toFixed(1)} s`, 20, 90);
    g.font = 'bold 18px Nunito, sans-serif'; g.fillText('sekundomer', 24, 116);
  });
  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="text-xl font-black text-ink">Suv harorati:</span>
        {temps.map((t) => (
          <button key={t} onClick={() => setTc(t)} disabled={phase === 'run'} className={`inline-flex items-center gap-1 rounded-xl border-2 border-ink px-4 py-2 text-xl font-black ${tc === t ? 'bg-amber-400 text-ink' : 'bg-white text-ink hover:bg-amber-50'}`}>
            {t < 25 ? <Snowflake size={18} /> : <Flame size={18} />} {t} °C
          </button>
        ))}
      </div>
      <Canvas cref={ref} w={W} h={H} />
      <div className="mt-3 grid gap-3 md:grid-cols-[1fr_auto_auto]">
        <div className="flex flex-wrap gap-2">
          <Btn onClick={drop} disabled={phase === 'run'} icon={Play}>{phase === 'idle' ? 'Siyoh tomizish' : 'Yangi stakan'}</Btn>
          <Btn onClick={stop} disabled={phase !== 'run'} icon={Check} color="bg-emerald-600 text-white hover:bg-emerald-700">Rang tekislandi — to‘xtat</Btn>
        </div>
        <Readout label="Bir xillik" value={`${mix}%`} />
        <Readout label="Vaqt" value={time.toFixed(1)} unit="s" tone="bg-sky-50 text-sky-900 border-sky-300" />
      </div>
      {phase === 'done' && <p className="dp-pop mt-3 rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-3 text-xl font-bold text-emerald-800">Natija jadvalga yozildi. Endi boshqa haroratni tanlab, tajribani takrorlang.</p>}
    </div>
  );
}

/* ---------- 7.2 Moy tomchisi: molekula o‘lchamini baholash ---------- */
function OilDropLab({ onRecord }) {
  const ref = useRef(null);
  const W = 900; const H = 460;
  const cols = 26; const rows = 14; const cell = 30; const gx = 60; const gy = 30;
  const [V, setV] = useState(1);
  const [phase, setPhase] = useState('idle'); // idle | spread | counted
  const [count, setCount] = useState(0);
  const S = useRef({ r: 0, target: 0, shape: [], k: 0 });
  const D_TRUE = 1.7e-9;
  const start = () => {
    const S_m2 = (V * 1e-9) / (D_TRUE * rnd(0.9, 1.1));
    const cellsArea = S_m2 / 0.01; // 1 katak = 10 sm × 10 sm = 0,01 m²
    const rpx = Math.sqrt((cellsArea * cell * cell) / Math.PI);
    const shape = Array.from({ length: 7 }, () => ({ a: rnd(0, 0.18), p: rnd(0, 7) }));
    S.current = { r: 0, target: rpx, shape, k: 0 };
    setPhase('spread'); setCount(0);
  };
  const radius = (a, R) => R * (1 + S.current.shape.reduce((s, h, i) => s + h.a * Math.sin((i + 2) * a + h.p), 0) * 0.5);
  const inside = (x, y) => {
    const cx = gx + (cols * cell) / 2; const cy = gy + (rows * cell) / 2;
    const dx = x - cx; const dy = y - cy;
    return Math.hypot(dx, dy) <= radius(Math.atan2(dy, dx), S.current.r);
  };
  const countCells = () => {
    let n = 0;
    for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) if (inside(gx + (i + 0.5) * cell, gy + (j + 0.5) * cell)) n++;
    setCount(n); setPhase('counted');
  };
  useLoop((dt) => {
    const c = ref.current; if (!c) return;
    const g = c.getContext('2d'); const st = S.current;
    if (phase === 'spread' && st.r < st.target) st.r = Math.min(st.target, st.r + (st.target - st.r) * 2.2 * dt + 0.5);
    g.fillStyle = '#FBF8F1'; g.fillRect(0, 0, W, H);
    g.fillStyle = '#BAE6FD'; g.fillRect(gx, gy, cols * cell, rows * cell);
    const cx = gx + (cols * cell) / 2; const cy = gy + (rows * cell) / 2;
    if (st.r > 0) {
      g.beginPath();
      for (let k = 0; k <= 90; k++) { const a = (k / 90) * Math.PI * 2; const rr = radius(a, st.r); g[k ? 'lineTo' : 'moveTo'](cx + Math.cos(a) * rr, cy + Math.sin(a) * rr); }
      g.closePath(); g.fillStyle = 'rgba(234,179,8,0.55)'; g.fill(); g.strokeStyle = '#A16207'; g.lineWidth = 2; g.stroke();
    }
    if (phase === 'counted') {
      g.fillStyle = 'rgba(226,70,63,0.35)';
      for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) if (inside(gx + (i + 0.5) * cell, gy + (j + 0.5) * cell)) g.fillRect(gx + i * cell + 2, gy + j * cell + 2, cell - 4, cell - 4);
    }
    g.strokeStyle = 'rgba(20,33,61,.35)'; g.lineWidth = 1;
    for (let i = 0; i <= cols; i++) { g.beginPath(); g.moveTo(gx + i * cell, gy); g.lineTo(gx + i * cell, gy + rows * cell); g.stroke(); }
    for (let j = 0; j <= rows; j++) { g.beginPath(); g.moveTo(gx, gy + j * cell); g.lineTo(gx + cols * cell, gy + j * cell); g.stroke(); }
    g.strokeStyle = '#14213D'; g.lineWidth = 4; g.strokeRect(gx, gy, cols * cell, rows * cell);
    g.fillStyle = '#14213D'; g.font = 'bold 17px Nunito, sans-serif';
    g.fillText('1 katak = 10 sm × 10 sm = 0,01 m²', gx, gy + rows * cell + 28);
  });
  const S_m2 = count * 0.01;
  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="text-xl font-black text-ink">Tomchi hajmi:</span>
        {[0.5, 1, 1.5, 2].map((v) => (
          <button key={v} onClick={() => { setV(v); setPhase('idle'); S.current.r = 0; }} disabled={phase === 'spread'} className={`rounded-xl border-2 border-ink px-4 py-2 text-xl font-black ${V === v ? 'bg-amber-400 text-ink' : 'bg-white text-ink hover:bg-amber-50'}`}>{String(v).replace('.', ',')} mm³</button>
        ))}
      </div>
      <Canvas cref={ref} w={W} h={H} />
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Btn onClick={start} icon={Play}>Tomchini tomizish</Btn>
        <Btn onClick={countCells} disabled={phase !== 'spread'} icon={Table2} color="bg-amber-400 text-ink hover:bg-amber-300">Kataklarni sanash</Btn>
        <Btn onClick={() => onRecord({ V, S: S_m2, d: (V * 1e-9) / S_m2 })} disabled={phase !== 'counted'} icon={Check} color="bg-emerald-600 text-white hover:bg-emerald-700">Jadvalga yozish</Btn>
      </div>
      {phase === 'counted' && (
        <div className="dp-pop mt-3 grid gap-3 md:grid-cols-3">
          <Readout label="Qoplangan kataklar" value={count} unit="ta" />
          <Readout label="Yuza S" value={sci(S_m2, 3)} unit="m²" tone="bg-sky-50 text-sky-900 border-sky-300" />
          <Readout label="Qalinlik d = V / S" value={sci((V * 1e-9) / S_m2, 2)} unit="m" tone="bg-emerald-50 text-emerald-900 border-emerald-300" />
        </div>
      )}
      <p className="mt-2 text-lg font-semibold text-slate-600">Eslatma: 1 mm³ = 10⁻⁹ m³. Katakning yarmidan ko‘pi moy bilan qoplangan bo‘lsa — sanaladi.</p>
    </div>
  );
}

/* ---------- 7.3 Tarozi: modda miqdori ---------- */
const SUBSTANCES = [
  { id: 'suv', n: 'Suv', f: 'H₂O', M: 18, spoon: 15, e: '💧' },
  { id: 'tuz', n: 'Osh tuzi', f: 'NaCl', M: 58.5, spoon: 20, e: '🧂' },
  { id: 'shakar', n: 'Shakar', f: 'C₁₂H₂₂O₁₁', M: 342, spoon: 18, e: '🍬' },
  { id: 'temir', n: 'Temir qipig‘i', f: 'Fe', M: 56, spoon: 40, e: '🔩' },
  { id: 'al', n: 'Alyuminiy', f: 'Al', M: 27, spoon: 12, e: '🥫' },
];
function MolarBalanceLab({ onRecord }) {
  const [sid, setSid] = useState('suv');
  const [spoons, setSpoons] = useState(0);
  const noise = useRef(0);
  const sub = SUBSTANCES.find((s) => s.id === sid);
  const m = spoons ? Math.round((spoons * sub.spoon + noise.current) * 10) / 10 : 0;
  const add = (d) => { setSpoons((x) => clamp(x + d, 0, 10)); noise.current = rnd(-0.6, 0.6); };
  return (
    <div>
      <div className="mb-3 flex flex-wrap gap-2">
        {SUBSTANCES.map((s) => (
          <button key={s.id} onClick={() => { setSid(s.id); setSpoons(0); }} className={`inline-flex items-center gap-2 rounded-xl border-2 border-ink px-4 py-2 text-lg font-black ${sid === s.id ? 'bg-amber-400 text-ink' : 'bg-white text-ink hover:bg-amber-50'}`}><span className="text-2xl">{s.e}</span>{s.n}</button>
        ))}
      </div>
      <div className="grid items-center gap-6 md:grid-cols-[1.2fr_1fr]">
        <div className="relative flex flex-col items-center rounded-3xl border-[2.5px] border-ink bg-white p-6">
          <div className="flex h-28 items-end gap-1">
            {Array.from({ length: spoons }).map((_, k) => <span key={k} className="dp-pop text-5xl">{sub.e}</span>)}
          </div>
          <div className="h-3 w-72 rounded-full border-2 border-ink bg-slate-300" />
          <div className="h-10 w-6 border-x-2 border-ink bg-slate-200" />
          <div className="w-80 rounded-2xl border-[2.5px] border-ink bg-slate-800 px-4 py-3 text-center">
            <span className="font-mono text-5xl font-black tabular-nums text-emerald-300">{m.toFixed(1)} g</span>
          </div>
          <div className="mt-1 text-base font-bold text-slate-500">elektron tarozi</div>
        </div>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Btn onClick={() => add(1)} icon={Plus} color="bg-amber-400 text-ink hover:bg-amber-300">1 qoshiq solish</Btn>
            <Btn onClick={() => add(-1)} icon={Minus} color="bg-white text-ink hover:bg-amber-50">Olish</Btn>
          </div>
          <Readout label={`${sub.n} (${sub.f}) — molyar massa`} value={String(sub.M).replace('.', ',')} unit="g/mol" tone="bg-white text-ink border-ink" />
          <Btn onClick={() => onRecord({ n: sub.n, m, M: sub.M, nu: m / sub.M, N: (m / sub.M) * N_A })} disabled={!m} icon={Check} color="bg-emerald-600 text-white hover:bg-emerald-700">Jadvalga yozish</Btn>
          <p className="text-lg font-semibold text-slate-600">Jadvalda ν = m / M va N = ν · N<sub>A</sub> o‘zi hisoblanadi.</p>
        </div>
      </div>
    </div>
  );
}

/* ---------- 7.4 Issiqlik muvozanati ---------- */
function EquilibriumLab({ onRecord, rows }) {
  const [m1, setM1] = useState(0.2); const [t1, setT1] = useState(80);
  const [m2, setM2] = useState(0.3); const [t2, setT2] = useState(15);
  const [run, setRun] = useState(false);
  const [tm, setTm] = useState(0);
  const S = useRef({ t: 0, acc: 0 });
  const theta = (m1 * t1 + m2 * t2) / (m1 + m2);
  const tau = 22;
  const hot = theta + (t1 - theta) * Math.exp(-tm / tau) - 0.02 * tm;
  const cold = theta + (t2 - theta) * Math.exp(-tm / tau) - 0.02 * tm * (1 - Math.exp(-tm / tau));
  const reset = () => { setRun(false); setTm(0); S.current = { t: 0, acc: 0 }; };
  useLoop((dt) => {
    if (!run) return;
    const st = S.current;
    st.t += dt * 4; st.acc += dt * 4; // 4 marta tezlashtirilgan
    setTm(st.t);
    if (st.acc >= 10) {
      st.acc -= 10;
      const T = Math.round(st.t / 10) * 10;
      const h = theta + (t1 - theta) * Math.exp(-T / tau) - 0.02 * T;
      const c = theta + (t2 - theta) * Math.exp(-T / tau) - 0.02 * T * (1 - Math.exp(-T / tau));
      onRecord({ time: T, hot: Math.round(h * 10) / 10, cold: Math.round(c * 10) / 10 });
      if (T >= 120) setRun(false);
    }
  }, run);
  const lock = run || tm > 0;
  const Beaker = ({ temp, label, small }) => {
    const warm = clamp((temp - 10) / 75, 0, 1);
    return (
      <div className="flex flex-col items-center">
        <div className="mb-1 rounded-xl border-2 border-ink bg-white px-3 py-1 font-mono text-3xl font-black tabular-nums text-ink">{temp.toFixed(1)} °C</div>
        <div className={`relative overflow-hidden rounded-b-3xl border-[3px] border-t-0 border-ink ${small ? 'h-32 w-24' : 'h-44 w-40'}`}>
          <div className="absolute inset-x-0 bottom-0 h-4/5 transition-colors" style={{ background: `rgb(${Math.round(150 + 105 * warm)},${Math.round(200 - 110 * warm)},${Math.round(250 - 190 * warm)})` }} />
        </div>
        <div className="mt-1 text-lg font-black text-ink">{label}</div>
      </div>
    );
  };
  return (
    <div>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-2 rounded-2xl border-2 border-rose-200 bg-rose-50 p-3">
          <div className="text-lg font-black text-rose-900">Issiq suv (ichki stakan)</div>
          <Slider label="Massasi" value={m1} min={0.1} max={0.5} step={0.05} onChange={setM1} unit="kg" show={sci(m1, 2)} disabled={lock} color="accent-rose-600" />
          <Slider label="Harorati" value={t1} min={50} max={90} step={5} onChange={setT1} unit="°C" disabled={lock} color="accent-rose-600" />
        </div>
        <div className="space-y-2 rounded-2xl border-2 border-sky-200 bg-sky-50 p-3">
          <div className="text-lg font-black text-sky-900">Sovuq suv (tashqi idish)</div>
          <Slider label="Massasi" value={m2} min={0.1} max={0.5} step={0.05} onChange={setM2} unit="kg" show={sci(m2, 2)} disabled={lock} color="accent-sky-600" />
          <Slider label="Harorati" value={t2} min={5} max={30} step={5} onChange={setT2} unit="°C" disabled={lock} color="accent-sky-600" />
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-end justify-center gap-10 rounded-3xl border-[2.5px] border-ink bg-white p-5">
        <Beaker temp={lock ? hot : t1} label="issiq" small />
        <Beaker temp={lock ? cold : t2} label="sovuq" />
        <div className="text-center">
          <div className="font-mono text-6xl font-black tabular-nums text-ink">{Math.floor(tm)} s</div>
          <div className="text-lg font-bold text-slate-500">vaqt (×4 tezlashtirilgan)</div>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <Btn onClick={() => { if (tm === 0) onRecord({ time: 0, hot: t1, cold: t2 }); setRun(true); }} disabled={run || tm >= 120} icon={Play}>{tm > 0 ? 'Davom' : 'Stakanni idishga qo‘yish'}</Btn>
        <Btn onClick={() => setRun(false)} disabled={!run} icon={Pause} color="bg-white text-ink hover:bg-amber-50">Pauza</Btn>
        <Btn onClick={reset} icon={RotateCcw} color="bg-white text-ink hover:bg-amber-50">Boshqa suvlar bilan</Btn>
      </div>
      <p className="mt-2 text-lg font-semibold text-slate-600">Har 10 soniyada ikkala termometr ko‘rsatkichi jadvalga avtomatik yoziladi ({rows.length} ta yozuv).</p>
    </div>
  );
}

/* ---------- 7.5 Shtern laboratoriyasi ---------- */
function SternLab({ onRecord }) {
  const [T, setT] = useState(1500);
  const [omega, setOmega] = useState(200);
  const meas = useRef({ s: 0, n: 0 });
  const [, force] = useState(0);
  useEffect(() => { const id = setInterval(() => force((x) => x + 1), 400); return () => clearInterval(id); }, []);
  const s = meas.current?.s || 0; const n = meas.current?.n || 0;
  const ready = n > 400 && omega > 0;
  return (
    <div>
      <SternView T={T} omega={omega} run onMeasured={meas} height={400} />
      <div className="mt-3 grid gap-3 md:grid-cols-[1fr_1fr_auto]">
        <Slider label="ω (burchak tezlik)" value={omega} min={50} max={400} step={10} onChange={setOmega} unit="rad/s" color="accent-sky-600" />
        <Slider label="Sim harorati" value={T} min={1000} max={2000} step={100} onChange={setT} unit="K" color="accent-rose-600" />
        <Readout label="Siljish s" value={ready ? sci(s * 100, 3) : '…'} unit="sm" />
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Btn onClick={() => onRecord({ T, omega, s, scm: s * 100, v: (omega * 0.16 * (0.16 - 0.012)) / s, vt: Math.sqrt((3 * R_GAS * T) / AG_M) })} disabled={!ready} icon={Check} color="bg-emerald-600 text-white hover:bg-emerald-700">Jadvalga yozish</Btn>
        <span className="text-lg font-semibold text-slate-600">r = 1,2 sm, R = 16 sm. Qatlam yetarli qalinlashguncha kuting.</span>
      </div>
    </div>
  );
}

/* ---------- 7.6 Gaz laboratoriyasi ---------- */
function GasLab({ lab, onRecord }) {
  const cur = useRef(null);
  const rec = () => {
    const s = cur.current; if (!s) return;
    const pm = (s.p / 1000) * rnd(0.985, 1.015);
    onRecord({ p: Math.round(pm * 10) / 10, V: Math.round(s.V * 100) / 100, T: Math.round(s.T), N: s.N, nu: s.nu, pV: Math.round(pm * s.V * 10) / 10, pVT: (pm * s.V) / s.T, invV: 1 / s.V });
  };
  return (
    <GasBox
      lock={lab.lock || null}
      N0={lab.N || 60} V0={lab.V || 3} T0={lab.T || 300}
      showN={lab.showN !== false}
      limits={lab.limits}
      onState={(s) => { cur.current = s; }}
      title={lab.boxTitle || 'Laboratoriya qurilmasi'}
      tone="bg-ink"
    >
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Btn onClick={rec} icon={Check} color="bg-emerald-600 text-white hover:bg-emerald-700">Asboblardan o‘qib, jadvalga yozish</Btn>
        {lab.hint && <span className="text-lg font-semibold text-slate-600">{lab.hint}</span>}
      </div>
    </GasBox>
  );
}

/* ---------- Laboratoriya qobig‘i ---------- */
export function FizLab({ lab }) {
  const [stage, setStage] = useState(0);
  const [rows, setRows] = useState([]);
  const record = useCallback((r) => setRows((rs) => [...rs, r]), []);
  const kinds = {
    diffusionTime: DiffusionTimeLab,
    oilDrop: OilDropLab,
    molarBalance: MolarBalanceLab,
    equilibrium: EquilibriumLab,
    stern: SternLab,
    gas: GasLab,
  };
  const Kind = kinds[lab.kind];
  const graph = lab.graph;
  return (
    <div className="mt-6 overflow-hidden rounded-3xl border-[3px] border-ink bg-paper shadow-[6px_6px_0_#14213D]">
      <div className="dp-girih relative border-b-[3px] border-ink bg-ink px-5 py-4 text-white">
        <div className="relative flex flex-wrap items-center gap-3">
          <span className="flex h-12 w-12 -rotate-3 items-center justify-center rounded-2xl border-2 border-white bg-amber-400 text-ink"><FlaskConical size={28} /></span>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-extrabold uppercase tracking-widest text-amber-300">Virtual laboratoriya</div>
            <div className="text-2xl md:text-3xl font-black">{lab.title}</div>
          </div>
        </div>
        {lab.goal && <p className="relative mt-2 text-lg md:text-xl font-semibold text-white/90"><b className="text-amber-300">Maqsad:</b> {lab.goal}</p>}
      </div>
      <div className="flex flex-wrap gap-2 border-b-2 border-ink/15 bg-white px-4 py-3">
        {LAB_STAGES.map((s, k) => (
          <button key={k} onClick={() => setStage(k)} className={`inline-flex items-center gap-2 rounded-xl border-2 px-4 py-2 text-lg font-black ${k === stage ? 'border-ink bg-amber-400 text-ink' : 'border-ink/20 bg-white text-slate-600 hover:border-ink'}`}>
            <span className={`flex h-7 w-7 items-center justify-center rounded-full text-sm ${k === stage ? 'bg-ink text-white' : 'bg-slate-100'}`}>{k + 1}</span>
            <s.i size={20} /> {s.t}{k === 2 && rows.length > 0 ? ` (${rows.length})` : ''}
          </button>
        ))}
      </div>
      <div className="p-4 md:p-6">
        {stage === 0 && <ToolShelf tools={lab.tools || []} onReady={() => setStage(1)} />}
        {stage === 1 && Kind && (
          <>
            {lab.steps?.length > 0 && (
              <ol className="mb-4 grid gap-2 md:grid-cols-2">
                {lab.steps.map((s, k) => (
                  <li key={k} className="flex gap-2 rounded-xl bg-white p-2 text-lg font-semibold text-ink ring-1 ring-ink/10"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white">{k + 1}</span>{s}</li>
                ))}
              </ol>
            )}
            <Kind lab={lab} onRecord={record} rows={rows} />
            <div className="mt-4 flex justify-end"><Btn onClick={() => setStage(2)} icon={Table2} color="bg-amber-400 text-ink hover:bg-amber-300">Jadval va grafikka o‘tish ({rows.length})</Btn></div>
          </>
        )}
        {stage === 2 && (
          <div className="grid gap-5 xl:grid-cols-2">
            <div>
              <DataTable rows={rows} cols={lab.cols} onDelete={(i) => setRows((rs) => rs.filter((_, k) => k !== i))} />
              <div className="mt-3 flex flex-wrap gap-2">
                <Btn onClick={() => setStage(1)} icon={FlaskConical} color="bg-white text-ink hover:bg-amber-50">Yana o‘lchash</Btn>
                {rows.length > 0 && <Btn onClick={() => setRows([])} icon={Trash2} color="bg-white text-rose-700 hover:bg-rose-50">Jadvalni tozalash</Btn>}
              </div>
              {lab.minRows && rows.length < lab.minRows && <p className="mt-3 text-lg font-bold text-amber-700">Ishonchli xulosa uchun kamida {lab.minRows} ta o‘lchov kerak.</p>}
            </div>
            {graph && (
              <Graph
                title={graph.title}
                rows={rows}
                x={graph.x}
                ys={graph.ys}
                theory={graph.theory ? (x) => graph.theory(x, rows) : null}
                zeroX={graph.zeroX !== false}
                zeroY={graph.zeroY !== false}
                lines={graph.lines !== false}
              />
            )}
          </div>
        )}
        {stage === 3 && (
          <div>
            {lab.questions?.length > 0 && (
              <div className="grid gap-3 md:grid-cols-2">
                {lab.questions.map((q, k) => <LabQuestion key={k} q={q} k={k} />)}
              </div>
            )}
            {lab.conclusion && (
              <div className="mt-4 rounded-3xl border-[2.5px] border-ink bg-amber-300 p-5">
                <div className="mb-1 inline-flex items-center gap-2 text-base font-black uppercase tracking-wide text-ink"><Lightbulb size={20} /> Xulosa</div>
                <p className="text-xl md:text-2xl font-black leading-relaxed text-ink">{lab.conclusion}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function LabQuestion({ q, k }) {
  const [open, setOpen] = useState(false);
  return (
    <button onClick={() => setOpen((v) => !v)} className={`rounded-2xl border-2 p-4 text-left transition ${open ? 'border-emerald-500 bg-emerald-50' : 'border-ink bg-white hover:-translate-y-0.5'}`}>
      <span className="block text-xl font-black text-ink">{k + 1}. {q.q}</span>
      {open ? <span className="mt-2 block text-lg md:text-xl font-bold text-emerald-900">{q.a}</span> : <span className="mt-2 inline-flex items-center gap-1 text-base font-bold text-blue-700"><Eye size={18} /> javobni ochish</span>}
    </button>
  );
}
