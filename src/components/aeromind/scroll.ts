import { useEffect, useState } from "react";

// Global scroll progress 0..1
export const scrollState = { progress: 0, scrollY: 0, max: 1 };

if (typeof window !== "undefined") {
  const update = () => {
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    scrollState.scrollY = window.scrollY;
    scrollState.max = max;
    scrollState.progress = Math.min(1, Math.max(0, window.scrollY / max));
  };
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  // initial after mount
  setTimeout(update, 50);
}

export function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const loop = () => {
      setP(scrollState.progress);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  return p;
}

// Section progress helpers: sections sized as fractions of total
export const SECTIONS = [
  { id: "genesis", label: "01 · Genesis", h: 200 },
  { id: "warning", label: "02 · Warning Signals", h: 200 },
  { id: "fragmented", label: "03 · Fragmented Systems", h: 300 },
  { id: "connected", label: "04 · Connected Intelligence", h: 300 },
  { id: "distress", label: "05 · Distress Index", h: 200 },
  { id: "network", label: "06 · Use Case Network", h: 200 },
  { id: "traction", label: "07 · Operational Network", h: 200 },
  { id: "payoff", label: "08 · Inevitable", h: 200 },
] as const;

const total = SECTIONS.reduce((a, s) => a + s.h, 0);
export const SECTION_RANGES = (() => {
  let acc = 0;
  return SECTIONS.map((s) => {
    const start = acc / total;
    acc += s.h;
    const end = acc / total;
    return { id: s.id, start, end };
  });
})();

export function localProgress(p: number, start: number, end: number) {
  return Math.min(1, Math.max(0, (p - start) / (end - start)));
}