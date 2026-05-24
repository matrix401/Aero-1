import { useEffect, useState } from "react";
import { scrollState, SECTIONS, SECTION_RANGES } from "./scroll";

export function HUD() {
  const [tick, setTick] = useState(0);
  const [now, setNow] = useState("");
  useEffect(() => {
    let raf = 0;
    const loop = () => {
      setTick((t) => t + 1);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const time = () => {
      const d = new Date();
      setNow(d.toISOString().split(".")[0].replace("T", " ") + "Z");
    };
    time();
    const id = setInterval(time, 1000);
    return () => { cancelAnimationFrame(raf); clearInterval(id); };
  }, []);

  const p = scrollState.progress;
  const idx = Math.max(0, SECTION_RANGES.findIndex((r) => p < r.end));
  const active = SECTIONS[idx === -1 ? SECTIONS.length - 1 : idx];

  return (
    <>
      {/* Top nav */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 md:px-10 py-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--am-text-dim)]">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[var(--am-green)] am-pulse" />
          <span className="text-[var(--am-text)] font-display text-base tracking-[0.04em] normal-case">AeroMind</span>
          <span className="hidden md:inline">// Aviation Intelligence Layer</span>
        </div>
        <nav className="hidden md:flex items-center gap-7">
          <a href="#fragmented" className="hover:text-[var(--am-text)] transition">System</a>
          <a href="#connected" className="hover:text-[var(--am-text)] transition">Intelligence</a>
          <a href="#network" className="hover:text-[var(--am-text)] transition">Network</a>
          <a href="#payoff" className="hover:text-[var(--am-text)] transition">Manifest</a>
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <span>{now}</span>
          <span className="text-[var(--am-green)]">● LINK 47.21°N</span>
        </div>
      </header>

      {/* Bottom HUD */}
      <div className="fixed bottom-0 left-0 right-0 z-40 px-6 md:px-10 py-4 flex items-end justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--am-text-dim)] pointer-events-none">
        <div className="flex flex-col gap-1">
          <div className="text-[var(--am-text)]">{active?.label}</div>
          <div className="flex items-center gap-2">
            <div className="h-px w-48 bg-[var(--am-line)] relative overflow-hidden">
              <div className="absolute inset-y-0 left-0 bg-[var(--am-green)]" style={{ width: `${p * 100}%` }} />
            </div>
            <span>{(p * 100).toFixed(2)}%</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div>FRAME · {(tick % 9999).toString().padStart(4, "0")}</div>
          <div>ORBITAL CORE · STATE {idx < 2 ? "STBY" : idx < 4 ? "ACQ" : idx < 5 ? "SYNC" : "ONLINE"}</div>
        </div>
      </div>

      {/* Side rail */}
      <div className="fixed left-6 md:left-10 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3 font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--am-text-dimmer)]">
        {SECTIONS.map((s, i) => (
          <a key={s.id} href={`#${s.id}`} className="flex items-center gap-2 hover:text-[var(--am-text)] transition">
            <span
              className={`h-px transition-all duration-500 ${i === idx ? "w-7 bg-[var(--am-green)]" : "w-3 bg-[var(--am-line-strong)]"}`}
            />
            <span className={i === idx ? "text-[var(--am-text)]" : ""}>{s.label.slice(0, 2)}</span>
          </a>
        ))}
      </div>
    </>
  );
}