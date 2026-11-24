'use client';

/**
 * Dars play — Fizika: termodinamika qismlari (9-sinf, II bob)
 *   PVWorkSim  — p–V diagrammada gaz ishi (yuza)
 *   HeatingSim — turli moddalarni bir xil isitgich bilan isitish
 *   HeatingLab, CalorimeterLab, PeaLab — virtual laboratoriya turlari
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, Check, Flame, Plus, Ruler, Scale, FlaskConical, Thermometer, Droplets } from 'lucide-react';

const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
function trimNum(x, digits) {
  let s = Number(x).toPrecision(digits);
  if (s.includes('e')) s = String(Number(s));
  if (s.includes('.')) s = s.replace(/0+$/, '').replace(/\.$/, '');
  const [i, d] = s.split('.');
  const ii = i.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return d ? `${ii},${d}` : ii;
}
function sci(x, digits = 3) {
  if (x === null || x === undefined || !Number.isFinite(x)) return '—';
  if (x === 0) return '0';
  const a = Math.abs(x);
  if (a >= 0.01 && a < 1e6) return trimNum(x, digits);
  let e = Math.floor(Math.log10(a)); let m = x / 10 ** e;
  m = Number(m.toPrecision(digits));
  if (Math.abs(m) >= 10) { m /= 10; e += 1; }
  return `${trimNum(m, digits)}·10${String(e).split('').map((c) => SUP[c]).join('')}`;
}
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const rnd = (a, b) => a + Math.random() * (b - a);
const R_GAS = 8.31;

function useLoop(fn, active = true) {
  const ref = useRef(fn);
  ref.current = fn;
  useEffect(() => {
    if (!active) return undefined;
    let id; let last = performance.now();
    const tick = (t) => { const dt = Math.min(0.05, (t - last) / 1000); last = t; ref.current(dt, t); id = requestAnimationFrame(tick); };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [active]);
}

function Slider({ label, value, min, max, step = 1, onChange, unit = '', show, disabled, color = 'accent-blue-600' }) {
  return (
    <label className={`block rounded-2xl border-2 border-ink/15 bg-white px-4 py-3 ${disabled ? 'opacity-50' : ''}`}>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-lg font-extrabold text-ink">{label}</span>
        <span className="text-2xl font-black tabular-nums text-blue-700">{show ?? value} <span className="text-lg text-slate-500">{unit}</span></span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} disabled={disabled} onChange={(e) => onChange(Number(e.target.value))} className={`mt-2 h-3 w-full cursor-pointer ${color}`} />
    </label>
  );
}
function Btn({ children, onClick, color = 'bg-blue-600 text-white hover:bg-blue-700', icon: I, disabled, className = '' }) {
  return (
    <button onClick={onClick} disabled={disabled} className={`dp-btn inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-lg font-black disabled:opacity-40 ${color} ${className}`}>
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
function Panel({ icon: I, title, tone = 'bg-blue-600', children }) {
  return (
    <div className="mt-6 overflow-hidden rounded-3xl border-[2.5px] border-ink bg-paper shadow-[5px_5px_0_#14213D]">
      <div className={`flex flex-wrap items-center gap-3 border-b-[2.5px] border-ink px-5 py-3 text-white ${tone}`}>
        {I && <span className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-ink bg-paper text-ink"><I size={22} /></span>}
        <span className="flex-1 text-xl md:text-2xl font-black">{title}</span>
      </div>
      <div className="p-4 md:p-6">{children}</div>
    </div>
  );
}
const Chip = ({ on, onClick, children, disabled }) => (
  <button onClick={onClick} disabled={disabled} className={`rounded-xl border-2 border-ink px-4 py-2 text-lg font-black disabled:opacity-40 ${on ? 'bg-amber-400 text-ink' : 'bg-white text-ink hover:bg-amber-50'}`}>{children}</button>
);

/* ============================================================
   1. p–V diagrammada gaz ishi
   ============================================================ */
export function PVWorkSim({ cfg = {} }) {
  const [proc, setProc] = useState(cfg.proc || 'izobarik');
  const [p1, setP1] = useState(200);
  const [V1, setV1] = useState(2);
  const [V2, setV2] = useState(5);
  const W = 640; const H = 380; const L = 70; const B = 56; const T = 20; const Rp = 24;
  const Vmax = 8; const pmax = 400;
  const px = (v) => L + (v / Vmax) * (W - L - Rp);
  const py = (p) => H - B - (p / pmax) * (H - B - T);
  const C = p1 * V1; // izoterma: pV = const (kPa·l)
  const pAt = (v) => (proc === 'izotermik' ? C / v : p1);
  const Vend = proc === 'izoxorik' ? V1 : V2;
  const p2 = proc === 'izoxorik' ? Math.min(pmax, p1 * 1.8) : pAt(V2);
  let A = 0; // kPa·l = J
  if (proc === 'izobarik') A = p1 * (V2 - V1);
  if (proc === 'izotermik') A = C * Math.log(V2 / V1);
  let area = ''; let curve = '';
  if (proc !== 'izoxorik') {
    const n = 60; const pts = [];
    for (let k = 0; k <= n; k++) { const v = V1 + ((V2 - V1) * k) / n; pts.push([px(v), py(clamp(pAt(v), 0, pmax))]); }
    curve = pts.map((q, k) => `${k ? 'L' : 'M'}${q[0].toFixed(1)},${q[1].toFixed(1)}`).join(' ');
    area = `${curve} L${px(V2).toFixed(1)},${py(0)} L${px(V1).toFixed(1)},${py(0)} Z`;
  }
  const xt = [0, 1, 2, 3, 4, 5, 6, 7, 8]; const yt = [0, 100, 200, 300, 400];
  return (
    <Panel icon={Flame} title={cfg.title || 'Interaktiv: gaz ishi = p–V grafik ostidagi yuza'} tone="bg-orange-600">
      <div className="mb-3 flex flex-wrap gap-2">
        {['izobarik', 'izotermik', 'izoxorik'].map((x) => <Chip key={x} on={proc === x} onClick={() => setProc(x)}>{x[0].toUpperCase() + x.slice(1)}</Chip>)}
      </div>
      <div className="grid items-start gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-2xl border-2 border-ink/20 bg-white p-2">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
            {yt.map((v) => <g key={`y${v}`}><line x1={L} x2={W - Rp} y1={py(v)} y2={py(v)} stroke="#E2E8F0" /><text x={L - 8} y={py(v) + 5} textAnchor="end" fontSize="15" fontWeight="700" fill="#475569">{v}</text></g>)}
            {xt.map((v) => <g key={`x${v}`}><line y1={T} y2={H - B} x1={px(v)} x2={px(v)} stroke="#E2E8F0" /><text x={px(v)} y={H - B + 22} textAnchor="middle" fontSize="15" fontWeight="700" fill="#475569">{v}</text></g>)}
            <line x1={L} x2={W - Rp} y1={H - B} y2={H - B} stroke="#14213D" strokeWidth="2.5" />
            <line x1={L} x2={L} y1={T} y2={H - B} stroke="#14213D" strokeWidth="2.5" />
            <text x={(L + W) / 2} y={H - 8} textAnchor="middle" fontSize="17" fontWeight="900" fill="#14213D">V, l</text>
            <text x={18} y={(H - B) / 2} textAnchor="middle" fontSize="17" fontWeight="900" fill="#14213D" transform={`rotate(-90 18 ${(H - B) / 2})`}>p, kPa</text>
            {area && <path d={area} fill="rgba(234,88,12,0.25)" stroke="none" />}
            {area && <path d={curve} fill="none" stroke="#EA580C" strokeWidth="4" />}
            {proc === 'izoxorik' && <line x1={px(V1)} x2={px(V1)} y1={py(p1)} y2={py(p2)} stroke="#EA580C" strokeWidth="4" />}
            <circle cx={px(V1)} cy={py(p1)} r="8" fill="#1D4ED8" stroke="#14213D" strokeWidth="2" />
            <circle cx={px(Vend)} cy={py(clamp(p2, 0, pmax))} r="8" fill="#E2463F" stroke="#14213D" strokeWidth="2" />
            <text x={px(V1) - 6} y={py(p1) - 12} textAnchor="end" fontSize="16" fontWeight="900" fill="#1D4ED8">1</text>
            <text x={px(Vend) + 10} y={py(clamp(p2, 0, pmax)) - 10} fontSize="16" fontWeight="900" fill="#E2463F">2</text>
          </svg>
        </div>
        <div className="space-y-3">
          <Slider label="Boshlang‘ich bosim p₁" value={p1} min={50} max={350} step={10} onChange={setP1} unit="kPa" color="accent-rose-600" />
          <Slider label="Boshlang‘ich hajm V₁" value={V1} min={1} max={4} step={0.5} onChange={(v) => { setV1(v); if (V2 <= v) setV2(v + 0.5); }} unit="l" show={sci(V1, 2)} color="accent-sky-600" />
          <Slider label="Oxirgi hajm V₂" value={V2} min={V1 + 0.5} max={8} step={0.5} onChange={setV2} unit="l" show={sci(V2, 2)} disabled={proc === 'izoxorik'} color="accent-sky-600" />
          <Readout label="Gaz bajargan ish A" value={sci(A, 3)} unit="J" tone="bg-orange-50 text-orange-900 border-orange-300" />
        </div>
      </div>
      <p className="mt-3 text-lg font-semibold text-slate-700">
        {proc === 'izobarik' && 'Izobarik kengayish: A = p·ΔV — to‘g‘ri to‘rtburchak yuzasi. (1 kPa · 1 l = 1 J)'}
        {proc === 'izotermik' && 'Izotermik kengayish: bosim kamayib boradi, ish — giperbola ostidagi yuza. Izobarikdagidan kichikroq!'}
        {proc === 'izoxorik' && 'Izoxorik jarayon: hajm o‘zgarmaydi — porshen siljimaydi, gaz ish bajarmaydi: A = 0.'}
      </p>
    </Panel>
  );
}

/* ============================================================
   2. Turli moddalarni isitish (solishtirma issiqlik sig‘imi)
   ============================================================ */
export const HEAT_SUBS = [
  { id: 'suv', n: 'Suv', c: 4200, col: '#1D4ED8' },
  { id: 'kerosin', n: 'Kerosin', c: 2140, col: '#7C3AED' },
  { id: 'al', n: 'Alyuminiy', c: 890, col: '#64748B' },
  { id: 'polat', n: 'Po‘lat', c: 460, col: '#0EA5A4' },
  { id: 'mis', n: 'Mis', c: 390, col: '#EA580C' },
  { id: 'qorgoshin', n: 'Qo‘rg‘oshin', c: 130, col: '#E2463F' },
];
const SPEED = 20; // vaqt 20 marta tezlashtirilgan

function TempChart({ series, tmax }) {
  const W = 640; const H = 320; const L = 60; const B = 50; const T = 16; const Rp = 16;
  const ymin = 20; const ymax = 100;
  const tm = Math.max(60, tmax);
  const px = (t) => L + (t / tm) * (W - L - Rp);
  const py = (y) => H - B - ((y - ymin) / (ymax - ymin)) * (H - B - T);
  const step = tm > 600 ? 200 : tm > 240 ? 100 : 30;
  const xt = []; for (let v = 0; v <= tm; v += step) xt.push(v);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full rounded-2xl border-2 border-ink/20 bg-white">
      {[20, 40, 60, 80, 100].map((v) => <g key={v}><line x1={L} x2={W - Rp} y1={py(v)} y2={py(v)} stroke="#E2E8F0" /><text x={L - 8} y={py(v) + 5} textAnchor="end" fontSize="15" fontWeight="700" fill="#475569">{v}</text></g>)}
      {xt.map((v) => <text key={v} x={px(v)} y={H - B + 22} textAnchor="middle" fontSize="15" fontWeight="700" fill="#475569">{v}</text>)}
      <line x1={L} x2={W - Rp} y1={H - B} y2={H - B} stroke="#14213D" strokeWidth="2.5" />
      <line x1={L} x2={L} y1={T} y2={H - B} stroke="#14213D" strokeWidth="2.5" />
      <text x={(L + W) / 2} y={H - 8} textAnchor="middle" fontSize="16" fontWeight="900" fill="#14213D">vaqt, s</text>
      <text x={16} y={(H - B) / 2} textAnchor="middle" fontSize="16" fontWeight="900" fill="#14213D" transform={`rotate(-90 16 ${(H - B) / 2})`}>t, °C</text>
      {series.map((s) => <polyline key={s.id} points={s.pts.map(([t, y]) => `${px(t).toFixed(1)},${py(y).toFixed(1)}`).join(' ')} fill="none" stroke={s.col} strokeWidth="4" />)}
    </svg>
  );
}

export function HeatingSim({ cfg = {} }) {
  const [sel, setSel] = useState(cfg.subs || ['suv', 'al', 'mis']);
  const [m, setM] = useState(0.5);
  const P = 500;
  const [run, setRun] = useState(false);
  const [t, setT] = useState(0);
  const [hist, setHist] = useState({});
  const acc = useRef(0);
  const reset = () => { setRun(false); setT(0); setHist({}); acc.current = 0; };
  const tempOf = (c, time) => Math.min(100, 20 + (P * time) / (c * m));
  useLoop((dt) => {
    if (!run) return;
    const nt = t + dt * SPEED;
    setT(nt);
    acc.current += dt * SPEED;
    if (acc.current >= 4) {
      acc.current = 0;
      setHist((h) => { const n = { ...h }; sel.forEach((id) => { const s = HEAT_SUBS.find((x) => x.id === id); n[id] = [...(n[id] || [[0, 20]]), [nt, tempOf(s.c, nt)]]; }); return n; });
    }
    if (sel.every((id) => tempOf(HEAT_SUBS.find((x) => x.id === id).c, nt) >= 100)) setRun(false);
  }, run);
  const series = sel.map((id) => { const s = HEAT_SUBS.find((x) => x.id === id); return { ...s, pts: hist[id] || [[0, 20]] }; });
  return (
    <Panel icon={Flame} title={cfg.title || 'Simulyatsiya: bir xil isitgich — har xil moddalar'} tone="bg-anor-500">
      <div className="mb-3 flex flex-wrap gap-2">
        {HEAT_SUBS.map((s) => (
          <Chip key={s.id} disabled={run || t > 0} on={sel.includes(s.id)} onClick={() => setSel((a) => (a.includes(s.id) ? a.filter((x) => x !== s.id) : a.length >= 4 ? a : [...a, s.id]))}>
            <span className="mr-1 inline-block h-3 w-3 rounded-full" style={{ background: s.col }} />{s.n}
          </Chip>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-[1fr_1.3fr]">
        <div className="flex flex-wrap items-end justify-center gap-3 rounded-3xl border-[2.5px] border-ink bg-white p-4">
          {series.map((s) => {
            const temp = tempOf(s.c, t);
            const warm = (temp - 20) / 80;
            return (
              <div key={s.id} className="flex flex-col items-center">
                <div className="mb-1 rounded-lg border-2 border-ink bg-white px-2 font-mono text-2xl font-black tabular-nums text-ink">{temp.toFixed(1)}°</div>
                <div className="relative h-28 w-16 overflow-hidden rounded-b-2xl border-[3px] border-t-0 border-ink" style={{ background: `rgb(${Math.round(220 + 35 * warm)},${Math.round(230 - 150 * warm)},${Math.round(240 - 200 * warm)})` }}>
                  <div className="absolute inset-x-2 bottom-2 h-12 rounded-lg border-2 border-ink/50" style={{ background: s.col, opacity: 0.85 }} />
                </div>
                <div className={`-mt-0.5 h-3 w-20 rounded border-2 border-ink ${run ? 'bg-orange-500' : 'bg-slate-300'}`} />
                <div className="mt-1 text-base font-black text-ink">{s.n}</div>
              </div>
            );
          })}
        </div>
        <TempChart series={series} tmax={Math.max(t, 60)} />
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-[1fr_auto_auto]">
        <Slider label="Har bir jism massasi" value={m} min={0.1} max={1} step={0.1} onChange={setM} unit="kg" show={sci(m, 2)} disabled={run || t > 0} />
        <Readout label="Isitgich quvvati" value={P} unit="W" />
        <Readout label="Vaqt" value={Math.round(t)} unit="s" tone="bg-sky-50 text-sky-900 border-sky-300" />
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <Btn onClick={() => setRun((v) => !v)} icon={run ? Pause : Play}>{run ? 'Pauza' : t > 0 ? 'Davom' : 'Isitgichlarni yoqish'}</Btn>
        <Btn onClick={reset} icon={RotateCcw} color="bg-white text-ink hover:bg-amber-50">Qaytadan</Btn>
      </div>
      <p className="mt-2 text-lg font-semibold text-slate-600">Vaqt 20 marta tezlashtirilgan. Har bir jism o‘z isitgichidan bir xil issiqlik oladi: Q = P·t.</p>
    </Panel>
  );
}

/* ---------- 2a. Laboratoriya: elektr isitgich bilan c ni aniqlash ---------- */
export function HeatingLab({ lab, onRecord }) {
  const subs = HEAT_SUBS.filter((s) => !lab.subs || lab.subs.includes(s.id));
  const [sid, setSid] = useState(subs[0].id);
  const [m, setM] = useState(0.5);
  const [run, setRun] = useState(false);
  const [t, setT] = useState(0);
  const P = 500;
  const s = HEAT_SUBS.find((x) => x.id === sid);
  const temp = Math.min(100, 20 + (P * t * 0.93) / (s.c * m)); // 7% issiqlik atrofga
  useLoop((dt) => { if (run) setT((x) => x + dt * SPEED); }, run);
  useEffect(() => { if (temp >= 100) setRun(false); }, [temp]);
  const reset = () => { setRun(false); setT(0); };
  const shownT = Math.round(temp * 10) / 10;
  return (
    <div>
      <div className="mb-3 flex flex-wrap gap-2">
        {subs.map((x) => <Chip key={x.id} on={sid === x.id} disabled={run || t > 0} onClick={() => setSid(x.id)}>{x.n}</Chip>)}
      </div>
      <div className="grid items-center gap-4 md:grid-cols-[1fr_1.2fr]">
        <div className="flex flex-col items-center rounded-3xl border-[2.5px] border-ink bg-white p-5">
          <div className="mb-2 rounded-xl border-2 border-ink bg-white px-3 py-1 font-mono text-4xl font-black tabular-nums text-ink">{shownT.toFixed(1)} °C</div>
          <div className="relative h-36 w-32 overflow-hidden rounded-b-3xl border-[3px] border-t-0 border-ink bg-sky-50">
            <div className="absolute inset-x-3 bottom-3 h-16 rounded-xl border-2 border-ink/60" style={{ background: s.col }} />
          </div>
          <div className={`h-4 w-36 rounded border-2 border-ink ${run ? 'bg-orange-500' : 'bg-slate-300'}`} />
          <div className="mt-2 font-mono text-3xl font-black text-ink">{Math.round(t)} s</div>
        </div>
        <div className="space-y-3">
          <Slider label="Jism massasi" value={m} min={0.2} max={1} step={0.1} onChange={setM} unit="kg" show={sci(m, 2)} disabled={run || t > 0} />
          <Readout label="Isitgich quvvati" value={P} unit="W" />
          <div className="flex flex-wrap gap-2">
            <Btn onClick={() => setRun((v) => !v)} icon={run ? Pause : Play}>{run ? 'Isitgichni o‘chirish' : t > 0 ? 'Davom' : 'Isitgichni yoqish'}</Btn>
            <Btn onClick={() => { onRecord({ n: s.n, m, time: Math.round(t), dt: Math.round((shownT - 20) * 10) / 10, Q: P * Math.round(t), c: (P * Math.round(t)) / (m * (shownT - 20)), ct: s.c }); reset(); }} disabled={run || t < 5} icon={Check} color="bg-emerald-600 text-white hover:bg-emerald-700">Jadvalga yozish</Btn>
            <Btn onClick={reset} icon={RotateCcw} color="bg-white text-ink hover:bg-amber-50">Qaytadan</Btn>
          </div>
          <p className="text-lg font-semibold text-slate-600">Boshlang‘ich harorat 20 °C. Isitgichni xohlagan paytda o‘chiring.</p>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   3. Kalorimetr: qattiq jismning solishtirma issiqlik sig‘imi
   ============================================================ */
export function CalorimeterLab({ lab, onRecord }) {
  const material = lab.material || { n: 'mis', c: 390 };
  const bodies = lab.bodies || [0.1, 0.15, 0.2];
  const mk = 0.062; const ck = 890; const cw = 4200;
  const [step, setStep] = useState(0);
  const [Vw, setVw] = useState(150);
  const [bi, setBi] = useState(0);
  const [t1] = useState(() => Math.round(rnd(18, 22) * 10) / 10);
  const [show, setShow] = useState(null);
  const anim = useRef(null);
  const m3 = bodies[bi]; const mw = Vw / 1000; const t2 = 100;
  const thetaTrue = (mk * ck * t1 + mw * cw * t1 + m3 * material.c * t2) / (mk * ck + mw * cw + m3 * material.c) - 0.15;
  const theta = Math.round(thetaTrue * 10) / 10;
  const reset = () => { setStep(0); setShow(null); };
  const drop = () => {
    setStep(5);
    const start = performance.now();
    cancelAnimationFrame(anim.current);
    const go = (now) => {
      const k = clamp((now - start) / 2500, 0, 1);
      setShow(t1 + (theta - t1) * (1 - (1 - k) ** 3));
      if (k < 1) anim.current = requestAnimationFrame(go); else setStep(6);
    };
    anim.current = requestAnimationFrame(go);
  };
  useEffect(() => () => cancelAnimationFrame(anim.current), []);
  const c = ((mk * ck + mw * cw) * (theta - t1)) / (m3 * (t2 - theta));
  const STEPS = [
    { t: 'Kalorimetrni tortish', i: Scale, done: `m₁ = ${sci(mk, 3)} kg (alyuminiy, c = 890 J/(kg·K))` },
    { t: 'Suv quyish', i: Droplets, done: `V = ${Vw} ml → m₂ = ${sci(mw, 3)} kg` },
    { t: 'Suv haroratini o‘lchash', i: Thermometer, done: `t₁ = ${sci(t1, 3)} °C` },
    { t: 'Jismni tortish', i: Scale, done: `m₃ = ${sci(m3, 3)} kg` },
    { t: 'Jismni qaynoq suvga solish', i: Flame, done: `t₂ = ${t2} °C (2–3 daqiqa)` },
    { t: 'Kalorimetrga tushirish', i: FlaskConical, done: `θ = ${sci(theta, 3)} °C` },
  ];
  return (
    <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr]">
      <div>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="text-lg font-black text-ink">Suv hajmi:</span>
          {[100, 150, 200].map((v) => <Chip key={v} on={Vw === v} disabled={step > 1} onClick={() => setVw(v)}>{v} ml</Chip>)}
        </div>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="text-lg font-black text-ink">Jism:</span>
          {bodies.map((b, k) => <Chip key={k} on={bi === k} disabled={step > 3} onClick={() => setBi(k)}>{k + 1}-jism</Chip>)}
        </div>
        <ol className="space-y-2">
          {STEPS.map((s, k) => (
            <li key={k} className={`flex flex-wrap items-center gap-3 rounded-2xl border-2 p-3 ${k < step ? 'border-emerald-400 bg-emerald-50' : k === step ? 'border-ink bg-amber-100' : 'border-ink/15 bg-white opacity-60'}`}>
              <span className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink ${k < step ? 'bg-emerald-400' : 'bg-white'}`}>{k < step ? <Check size={20} /> : <s.i size={18} />}</span>
              <span className="flex-1 text-lg font-extrabold text-ink">{s.t}{k < step && <span className="ml-2 font-bold text-emerald-800">— {s.done}</span>}</span>
              {k === step && k < 5 && <Btn onClick={() => setStep(k + 1)} color="bg-blue-600 text-white hover:bg-blue-700">Bajarish</Btn>}
              {k === step && k === 5 && <Btn onClick={drop} icon={FlaskConical} color="bg-anor-500 text-white hover:bg-anor-600">Tushirish</Btn>}
            </li>
          ))}
        </ol>
      </div>
      <div className="flex flex-col items-center justify-between gap-4 rounded-3xl border-[2.5px] border-ink bg-white p-5">
        <div className="text-center">
          <div className="text-base font-extrabold uppercase text-slate-500">Kalorimetrdagi termometr</div>
          <div className="font-mono text-6xl font-black tabular-nums text-ink">{step >= 3 ? `${sci(show ?? t1, 3)} °C` : '— °C'}</div>
        </div>
        <div className="relative h-40 w-40 rounded-b-[2.5rem] border-[4px] border-t-0 border-ink bg-slate-200 p-2">
          <div className="absolute inset-2 top-6 rounded-b-[2rem] bg-sky-200" style={{ opacity: step >= 2 ? 1 : 0.1 }} />
          {step >= 5 && <div className="dp-pop absolute bottom-5 left-1/2 h-10 w-12 -translate-x-1/2 rounded-lg border-2 border-ink bg-orange-600" />}
          <div className="absolute -top-8 right-4 h-36 w-3 rounded-full border-2 border-ink bg-white"><div className="absolute bottom-0 w-full rounded-full bg-rose-500" style={{ height: `${step >= 3 ? 30 + (show ?? t1) : 0}%` }} /></div>
        </div>
        {step === 6 && (
          <div className="w-full space-y-2">
            <div className="rounded-2xl border-2 border-ink/20 bg-paper p-3 text-center text-lg font-bold text-ink">
              c = (m₁c₁ + m₂c₂)(θ − t₁) / (m₃(t₂ − θ)) = <span className="text-2xl font-black">{Math.round(c)} J/(kg·K)</span>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <Btn onClick={() => { onRecord({ m1: mk, m2: mw, m3, t1, t2, th: theta, c }); reset(); }} icon={Check} color="bg-emerald-600 text-white hover:bg-emerald-700">Jadvalga yozish</Btn>
              <Btn onClick={reset} icon={RotateCcw} color="bg-white text-ink hover:bg-amber-50">Qaytadan</Btn>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   4. No‘xat modeli: molekula o‘lchamini baholash (mexanik model)
   ============================================================ */
const SIZES = [{ a: 10, b: 10 }, { a: 10, b: 15 }, { a: 15, b: 20 }];
export function PeaLab({ onRecord }) {
  const ref = useRef(null);
  const W = 900; const H = 460; const sc = 18; // 1 sm = 18 px
  const [si, setSi] = useState(1);
  const [phase, setPhase] = useState(0); // 0 bo‘sh, 1 to‘ldirildi, 2 menzurka, 3 chizg‘ich
  const D = useRef(0.78);
  const peas = useRef([]);
  const [V, setV] = useState(0);
  const [L10, setL10] = useState(0);
  const { a, b } = SIZES[si];
  const fill = () => {
    D.current = rnd(0.74, 0.82);
    const d = D.current; const ps = [];
    const rowH = d * Math.sqrt(3) / 2;
    for (let r = 0; (r * rowH) + d / 2 <= b - d / 2 + 0.001; r++) {
      const off = r % 2 ? d / 2 : 0;
      for (let x = d / 2 + off; x <= a - d / 2 + 0.001; x += d) ps.push({ x: x + rnd(-0.03, 0.03), y: d / 2 + r * rowH + rnd(-0.03, 0.03), d: d * rnd(0.93, 1.05) });
    }
    peas.current = ps;
    const Vsolid = ps.reduce((s, p) => s + (Math.PI * p.d ** 3) / 6, 0);
    setV(Math.round((Vsolid / 0.55) * rnd(0.97, 1.03)));
    setL10(Math.round(10 * d * rnd(0.98, 1.02) * 10) / 10);
    setPhase(1);
  };
  useLoop(() => {
    const c = ref.current; if (!c) return;
    const g = c.getContext('2d');
    g.fillStyle = '#FBF8F1'; g.fillRect(0, 0, W, H);
    const ox = 40; const oy = 40;
    g.fillStyle = '#fff'; g.fillRect(ox - 20, oy - 20, a * sc + 40, b * sc + 40);
    g.strokeStyle = '#14213D'; g.lineWidth = 3; g.strokeRect(ox, oy, a * sc, b * sc);
    g.fillStyle = '#14213D'; g.font = 'bold 16px Nunito, sans-serif'; g.fillText(`${a} sm × ${b} sm`, ox, oy + b * sc + 30);
    if (phase === 1 || phase === 3) peas.current.forEach((p) => {
      g.beginPath(); g.arc(ox + p.x * sc, oy + p.y * sc, (p.d * sc) / 2, 0, 7);
      g.fillStyle = '#E9C46A'; g.fill(); g.strokeStyle = '#A16207'; g.lineWidth = 1.2; g.stroke();
    });
    // menzurka
    const mx = 560; const my = 30; const mh = 360; const mw = 80; const Vmax = 400;
    g.fillStyle = 'rgba(186,230,253,.35)'; g.fillRect(mx, my, mw, mh);
    g.strokeStyle = '#14213D'; g.lineWidth = 3; g.strokeRect(mx, my, mw, mh);
    for (let v = 0; v <= Vmax; v += 10) {
      const y = my + mh - (v / Vmax) * mh;
      g.lineWidth = v % 50 === 0 ? 2.5 : 1; g.beginPath(); g.moveTo(mx + mw, y); g.lineTo(mx + mw - (v % 50 === 0 ? 22 : 10), y); g.stroke();
      if (v % 50 === 0) { g.fillStyle = '#14213D'; g.font = 'bold 14px Nunito, sans-serif'; g.fillText(`${v}`, mx + mw + 6, y + 5); }
    }
    g.fillStyle = '#14213D'; g.font = 'bold 15px Nunito, sans-serif'; g.fillText('menzurka, sm³', mx - 6, my + mh + 26);
    if (phase >= 2 && phase !== 3) {
      const lvl = my + mh - (V / Vmax) * mh;
      g.fillStyle = '#E9C46A'; g.fillRect(mx + 3, lvl, mw - 6, my + mh - lvl - 2);
      g.strokeStyle = '#E2463F'; g.lineWidth = 3; g.beginPath(); g.moveTo(mx - 10, lvl); g.lineTo(mx + mw + 2, lvl); g.stroke();
    }
    // chizg‘ich va 10 dona no‘xat
    if (phase === 3) {
      const rx = 700; const ry = 60;
      for (let k = 0; k < 10; k++) { g.beginPath(); g.arc(rx + 30, ry + (k + 0.5) * (L10 / 10) * sc, (L10 / 10) * sc / 2, 0, 7); g.fillStyle = '#E9C46A'; g.fill(); g.strokeStyle = '#A16207'; g.stroke(); }
      g.fillStyle = '#fff'; g.fillRect(rx + 50, ry - 10, 40, 12 * sc + 20); g.strokeStyle = '#14213D'; g.lineWidth = 2; g.strokeRect(rx + 50, ry - 10, 40, 12 * sc + 20);
      for (let mm = 0; mm <= 120; mm++) {
        const y = ry + (mm / 10) * sc;
        g.lineWidth = mm % 10 === 0 ? 2 : 1; g.beginPath(); g.moveTo(rx + 50, y); g.lineTo(rx + 50 + (mm % 10 === 0 ? 16 : mm % 5 === 0 ? 11 : 6), y); g.stroke();
        if (mm % 10 === 0) { g.fillStyle = '#14213D'; g.font = 'bold 13px Nunito, sans-serif'; g.fillText(`${mm / 10}`, rx + 70, y + 5); }
      }
      g.fillStyle = '#14213D'; g.font = 'bold 15px Nunito, sans-serif'; g.fillText('chizg‘ich, sm', rx + 20, ry + 12 * sc + 36);
    }
  });
  const S = a * b;
  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="text-lg font-black text-ink">To‘rtburchak:</span>
        {SIZES.map((s, k) => <Chip key={k} on={si === k} onClick={() => { setSi(k); setPhase(0); }}>{s.a}×{s.b} sm</Chip>)}
      </div>
      <canvas ref={ref} width={W} height={H} className="block w-full rounded-2xl border-[2.5px] border-ink bg-white" style={{ aspectRatio: `${W} / ${H}` }} />
      <div className="mt-3 flex flex-wrap gap-2">
        <Btn onClick={fill} icon={Plus}>No‘xat terish</Btn>
        <Btn onClick={() => setPhase(2)} disabled={phase !== 1} icon={FlaskConical} color="bg-amber-400 text-ink hover:bg-amber-300">Menzurkaga solish</Btn>
        <Btn onClick={() => setPhase(3)} disabled={phase !== 2} icon={Ruler} color="bg-white text-ink hover:bg-amber-50">10 donasini qatorga terish</Btn>
        <Btn onClick={() => { onRecord({ S, V, d1: V / S, d2: L10 / 10 }); setPhase(0); }} disabled={phase !== 3} icon={Check} color="bg-emerald-600 text-white hover:bg-emerald-700">Jadvalga yozish</Btn>
      </div>
      {phase >= 2 && (
        <div className="dp-pop mt-3 grid gap-3 md:grid-cols-4">
          <Readout label="Yuza S = a·b" value={S} unit="sm²" />
          <Readout label="Hajm V" value={V} unit="sm³" tone="bg-sky-50 text-sky-900 border-sky-300" />
          <Readout label="d = V / S" value={sci(V / S, 2)} unit="sm" tone="bg-emerald-50 text-emerald-900 border-emerald-300" />
          {phase === 3 && <Readout label="10 dona uzunligi" value={sci(L10, 3)} unit="sm" tone="bg-white text-ink border-ink" />}
        </div>
      )}
    </div>
  );
}
