// src/components/aeromind/Sections.tsx
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Scene } from "./scenes/Scenes";

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--am-text-dim)] flex items-center gap-2">
      <span className="inline-block h-px w-6 bg-[var(--am-line-strong)]" />
      {children}
    </div>
  );
}

function Hairline({ className = "" }: { className?: string }) {
  return <div className={`h-px w-full bg-[var(--am-line)] ${className}`} />;
}

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative border border-[var(--am-line)] bg-[rgba(7,10,16,0.25)] backdrop-blur-md ${className}`}>
      {children}
    </div>
  );
}

function Section({ id, heightVH, children }: { id: string; heightVH: number; children: React.ReactNode }) {
  return (
    <section id={id} style={{ height: `${heightVH}vh` }} className="relative w-full">
      {children}
    </section>
  );
}

function Sticky({ children, scene }: { children: React.ReactNode; scene?: React.ReactNode }) {
  return (
    <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
      {scene && <div className="absolute inset-0 z-0 pointer-events-none">{scene}</div>}
      <div className="relative z-10 h-full w-full flex items-center justify-center px-6 md:px-12 max-w-[1600px] mx-auto">
        {children}
      </div>
    </div>
  );
}

function FadeChars({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap mr-[0.25em]">
          {w.split("").map((c, ci) => (
            <motion.span
              key={ci}
              initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.9, delay: wi * 0.04 + ci * 0.012, ease: [0.2, 0.7, 0.2, 1] }}
              className="inline-block"
            >
              {c}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  );
}

function Genesis() {
  return (
    <Section id="genesis" heightVH={120}>
      <Sticky scene={<Scene.Genesis />}>
        <div className="relative w-full max-w-6xl mx-auto text-center">
          <Label>Transmission · AM-001 · Initialization</Label>
          <h1 className="font-display text-[clamp(2.5rem,7vw,6.5rem)] leading-[1.05] mt-8 text-[var(--am-text)]">
            <span>Aviation intelligence </span>
            <br />
            <FadeChars text="coming online." className="text-[var(--am-text-dim)]" />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="mt-10 max-w-xl mx-auto text-sm md:text-base text-[var(--am-text-dim)] font-light leading-relaxed"
          >
            A predictive infrastructure layer for global aviation — built to detect collapse before it becomes catastrophe.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            viewport={{ once: true }}
            className="mt-16 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--am-text-dimmer)]"
          >
            ↓ Scroll to engage Orbital Core
          </motion.div>
        </div>
      </Sticky>
    </Section>
  );
}

function Warning() {
  const signals = [
    { name: "Salary Delay", code: "WF·SAL", val: "+14d" },
    { name: "OTP Decay", code: "OP·OTP", val: "−6.8%" },
    { name: "Vendor Stress", code: "FN·VND", val: "↑ 3σ" },
    { name: "Workforce Fatigue", code: "WF·FTG", val: "0.71" },
    { name: "Safety Drift", code: "SF·DRF", val: "amber" },
    { name: "Lessor Risk", code: "FN·LSR", val: "+12%" },
  ];
  return (
    <Section id="warning" heightVH={120}>
      <Sticky scene={<Scene.Warning />}>
        <div className="w-full max-w-7xl mx-auto grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-4 space-y-6">
            <Label>Section 02 · Weak Signals</Label>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">
              Airline collapse begins as <span className="text-[var(--am-amber)]">invisible signals</span>.
            </h2>
            <p className="text-sm text-[var(--am-text-dim)] leading-relaxed max-w-sm">
              The Orbital Core enters acquisition mode. Six anomaly classes are surfaced and pinned to orbit — every weak signal is a leading indicator.
            </p>
          </div>
          <div className="hidden md:block md:col-span-4" />
          <div className="col-span-12 md:col-span-4 space-y-3">
            {signals.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.2, 0.7, 0.2, 1] }}
              >
                <Panel className="px-4 py-3 flex items-center justify-between">
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-[var(--am-text-dimmer)]">
                      {s.code}
                    </div>
                    <div className="text-sm text-[var(--am-text)] mt-0.5">{s.name}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[var(--am-amber)]">{s.val}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--am-amber)] am-pulse" />
                  </div>
                </Panel>
              </motion.div>
            ))}
          </div>
        </div>
      </Sticky>
    </Section>
  );
}

function Fragmented() {
  const layers = [
    { name: "Workforce", code: "L1·WF", desc: "HR, payroll, OPS rostering" },
    { name: "Operations", code: "L2·OP", desc: "Schedule, OTP, dispatch" },
    { name: "Safety", code: "L3·SF", desc: "Audit, reports, drift" },
    { name: "Finance", code: "L4·FN", desc: "Vendor, lessor, treasury" },
    { name: "Distress Layer", code: "L5·DX", desc: "Hidden composite signal" },
  ];
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-55%"]);
  return (
    <Section id="fragmented" heightVH={140}>
      <div ref={ref} className="h-full">
        <Sticky scene={<Scene.Fragmented />}>
          <div className="w-full max-w-7xl mx-auto">
            <div className="grid grid-cols-12 gap-6 items-end">
              <div className="col-span-12 md:col-span-5">
                <Label>Section 03 · Disaggregation</Label>
                <h2 className="font-display text-4xl md:text-5xl leading-tight mt-4">
                  Aviation runs as <span className="text-[var(--am-text-dim)]">five disconnected layers.</span>
                </h2>
                <p className="mt-6 text-sm text-[var(--am-text-dim)] max-w-md">
                  Each layer is observed in isolation. The composite distress signal never surfaces until failure is already operational.
                </p>
              </div>
              <div className="hidden md:block col-span-7 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--am-text-dimmer)] text-right">
                ORBITAL RINGS · SPATIAL DRIFT · −0.55 AU
              </div>
            </div>
            <div className="mt-16 overflow-hidden">
              <motion.div style={{ x }} className="flex gap-5">
                {layers.map((l, i) => (
                  <Panel key={i} className="min-w-[280px] md:min-w-[340px] p-5">
                    <div className="font-mono text-[10px] tracking-[0.25em] text-[var(--am-text-dimmer)]">{l.code}</div>
                    <div className="font-display text-2xl mt-2 text-[var(--am-text)]">{l.name}</div>
                    <div className="text-xs text-[var(--am-text-dim)] mt-1">{l.desc}</div>
                    <Hairline className="my-4" />
                    <div className="flex items-center justify-between font-mono text-[10px] text-[var(--am-text-dim)]">
                      <span>SYNC</span>
                      <span className="text-[var(--am-amber)]">DISJOINT</span>
                    </div>
                    <div className="h-px w-full bg-[var(--am-line)] mt-2 relative overflow-hidden">
                      <div className="absolute inset-y-0 left-0 bg-[var(--am-amber)]" style={{ width: `${20 + i * 12}%` }} />
                    </div>
                  </Panel>
                ))}
              </motion.div>
            </div>
          </div>
        </Sticky>
      </div>
    </Section>
  );
}

function Connected() {
  return (
    <Section id="connected" heightVH={140}>
      <Sticky scene={<Scene.Connected />}>
        <div className="w-full max-w-7xl mx-auto grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-4 space-y-4">
            <Label>Section 04 · Synchronization</Label>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">
              Chaos becomes <span className="text-[var(--am-green)]">structured intelligence.</span>
            </h2>
            <p className="text-sm text-[var(--am-text-dim)] max-w-sm">
              Streams from every layer route into the Orbital Core. Cross-domain anomalies that were invisible to operators become operationally addressable in real time.
            </p>
          </div>
          <div className="hidden md:block md:col-span-4" />
          <div className="col-span-12 md:col-span-4 space-y-3">
            {[
              { k: "STREAM·01", v: "Workforce → Core", lat: "12ms" },
              { k: "STREAM·02", v: "Operations → Core", lat: "8ms" },
              { k: "STREAM·03", v: "Safety → Core", lat: "16ms" },
              { k: "STREAM·04", v: "Finance → Core", lat: "11ms" },
              { k: "STREAM·05", v: "Distress Composite", lat: "real-time" },
            ].map((s, i) => (
              <Panel key={i} className="px-4 py-3">
                <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.25em] text-[var(--am-text-dimmer)]">
                  <span>{s.k}</span>
                  <span className="text-[var(--am-green)]">● SYNC</span>
                </div>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-sm text-[var(--am-text)]">{s.v}</span>
                  <span className="font-mono text-xs text-[var(--am-cyan)]">{s.lat}</span>
                </div>
                <div className="mt-3 h-[2px] bg-[var(--am-line)] relative overflow-hidden">
                  <div className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-[var(--am-cyan)] to-transparent am-scan" />
                </div>
              </Panel>
            ))}
          </div>
        </div>
      </Sticky>
    </Section>
  );
}

function Distress() {
  return (
    <Section id="distress" heightVH={120}>
      <Sticky scene={<Scene.Distress />}>
        <div className="w-full max-w-6xl mx-auto text-center space-y-8">
          <Label>Section 05 · Predictive Mode</Label>
          <h2 className="font-display text-[clamp(2.2rem,6vw,5rem)] leading-[0.95]">
            <span className="text-[var(--am-text-dim)]">Signals collapse into a single</span>
            <br />
            <span className="text-[var(--am-green)]">distress probability.</span>
          </h2>
          <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto mt-12">
            {[
              { k: "INDEX", v: "0.62", t: "AMBER" },
              { k: "HORIZON", v: "T+ 38d", t: "EARLY" },
              { k: "CONFIDENCE", v: "92.4%", t: "HIGH" },
            ].map((m, i) => (
              <Panel key={i} className="p-5">
                <div className="font-mono text-[10px] tracking-[0.25em] text-[var(--am-text-dimmer)]">{m.k}</div>
                <div className="font-display text-4xl mt-2 text-[var(--am-text)]">{m.v}</div>
                <div className="font-mono text-[10px] mt-2 text-[var(--am-green)]">{m.t}</div>
              </Panel>
            ))}
          </div>
        </div>
      </Sticky>
    </Section>
  );
}

function Network() {
  const nodes = ["Airlines", "Airports", "Lessors", "Regulators", "Ground Handlers", "Investors"];
  return (
    <Section id="network" heightVH={120}>
      <Sticky scene={<Scene.Network />}>
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-5">
              <Label>Section 06 · Distribution</Label>
              <h2 className="font-display text-4xl md:text-5xl leading-tight mt-4">
                One intelligence network. <span className="text-[var(--am-text-dim)]">Six classes of operator.</span>
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mt-14">
            {nodes.map((n, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
              >
                <Panel className="p-4 h-32 flex flex-col justify-between">
                  <div className="font-mono text-[10px] tracking-[0.25em] text-[var(--am-text-dimmer)]">
                    NODE·{(i + 1).toString().padStart(2, "0")}
                  </div>
                  <div>
                    <div className="text-sm text-[var(--am-text)]">{n}</div>
                    <div className="mt-2 h-px bg-[var(--am-line)] relative overflow-hidden">
                      <div className="absolute inset-y-0 left-0 bg-[var(--am-cyan)]" style={{ width: `${60 + (i * 7) % 35}%` }} />
                    </div>
                  </div>
                </Panel>
              </motion.div>
            ))}
          </div>
        </div>
      </Sticky>
    </Section>
  );
}

function Traction() {
  return (
    <Section id="traction" heightVH={120}>
      <Sticky scene={<Scene.Traction />}>
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-6 items-start">
            <div className="col-span-12 md:col-span-5 space-y-4">
              <Label>Section 07 · Operational</Label>
              <h2 className="font-display text-4xl md:text-5xl leading-tight">
                Infrastructure already <span className="text-[var(--am-green)]">in motion.</span>
              </h2>
              <p className="text-sm text-[var(--am-text-dim)] max-w-sm">
                Telemetry ingested across regions. Composite distress fingerprints validated against historical airline failures with sub-quarter lead time.
              </p>
            </div>
            <div className="col-span-12 md:col-span-7 grid grid-cols-2 gap-4">
              {[
                { k: "Carriers monitored", v: "143" },
                { k: "Signal classes", v: "27" },
                { k: "Avg early-warning", v: "11 weeks" },
                { k: "Precision (1Y)", v: "0.91" },
                { k: "Telemetry / day", v: "4.6 B" },
                { k: "Distress events caught", v: "9 / 11" },
              ].map((m, i) => (
                <Panel key={i} className="p-5">
                  <div className="font-mono text-[10px] tracking-[0.25em] text-[var(--am-text-dimmer)]">{m.k}</div>
                  <div className="font-display text-3xl mt-1 text-[var(--am-text)]">{m.v}</div>
                </Panel>
              ))}
            </div>
          </div>
        </div>
      </Sticky>
    </Section>
  );
}

function Payoff() {
  return (
    <Section id="payoff" heightVH={120}>
      <Sticky scene={<Scene.Payoff />}>
        <div className="w-full max-w-5xl mx-auto text-center">
          <Label>Section 08 · Manifest</Label>
          <h2 className="font-display text-[clamp(2.6rem,7.5vw,7rem)] leading-[0.95] mt-8">
            <FadeChars text="The aviation intelligence" />
            <br />
            <FadeChars text="layer of the world." className="text-[var(--am-text-dim)]" />
          </h2>
          <p className="mt-10 max-w-xl mx-auto text-[var(--am-text-dim)]">
            AeroMind operates as a single synchronized cinematic system — institutional, predictive, inevitable.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-14 flex items-center justify-center gap-3"
          >
            <a
              href="/contact"
              className="group relative inline-flex items-center gap-3 px-6 py-3.5 border border-[var(--am-line-strong)] hover:border-[var(--am-green)] transition text-[var(--am-text)] font-mono text-[11px] uppercase tracking-[0.3em] bg-[rgba(7,10,16,0.6)] backdrop-blur"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--am-green)] am-pulse" />
              Request institutional access
              <span className="opacity-50 group-hover:translate-x-1 transition">→</span>
            </a>
            <a
              href="/about"
              className="inline-flex items-center gap-2 px-5 py-3.5 text-[var(--am-text-dim)] hover:text-[var(--am-text)] transition font-mono text-[11px] uppercase tracking-[0.3em]"
            >
              Read the manifest
            </a>
          </motion.div>
          <div className="mt-24 grid grid-cols-3 gap-4 font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--am-text-dimmer)]">
            <div className="text-left">AeroMind · 2026</div>
            <div>Aviation Intelligence Platform</div>
            <div className="text-right">Enterprise · Tier 1</div>
          </div>
        </div>
      </Sticky>
    </Section>
  );
}

export function Sections() {
  return (
    <main className="relative z-20 w-full">
      <Genesis />
      <Warning />
      <Fragmented />
      <Connected />
      <Distress />
      <Network />
      <Traction />
      <Payoff />
    </main>
  );
}
