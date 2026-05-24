
## Goal
Kill the single persistent Orbital Core + tracking overlay. Each of the 8 sections gets its OWN distinct 3D object, its OWN distinct entry/idle animation, and its OWN dedicated Canvas pinned inside that section. No more shared evolving sphere.

## What gets removed
- `src/components/aeromind/OrbitalCanvas.tsx` — global fixed 3D scene
- `src/components/aeromind/orbital/OrbitalCore.tsx` — the evolving sphere/rings/streams
- `src/components/aeromind/orbital/state.ts` — phase-weight blending (no longer needed)
- `src/components/aeromind/orbital/cursor.ts` — global cursor parallax (re-add only if a scene needs it)
- `src/components/aeromind/TrackingOverlay.tsx` — SVG dashed reticle tied to the old core
- The lazy `OrbitalCanvas` import + `<TrackingOverlay />` in `src/routes/index.tsx`

This also fixes the current SSR hydration warning (the overlay rendered different DOM on server vs. client).

## New architecture
Each section becomes self-contained: HTML copy on one side, a small `<Canvas>` on the other, animated independently. No shared scroll-progress state, no cross-section phase blending. Mobile falls back to a static SVG/CSS placeholder per scene.

```text
src/components/aeromind/
  scenes/
    SceneShell.tsx       // reusable wrapper: Canvas + lights + entry animation hook
    GenesisBeacon.tsx        // §1 — slow-rotating obsidian monolith with green core slit
    SignalSwarm.tsx          // §2 — 6 amber warning satellites orbiting a dim node, pulse-in
    FragmentShards.tsx       // §3 — 5 separated metallic layer-plates drifting apart
    LatticeWeave.tsx         // §4 — wireframe lattice cube assembling from scattered lines
    DistressMeter.tsx        // §5 — radial gauge ring + rising bar volumetric, fills on enter
    HexNetwork.tsx           // §6 — 6 hex prisms connected by glowing edges, light travels
    IndiaGlobePatch.tsx      // §7 — low-poly tilted plate w/ 4 city pulse nodes (HYD/VGA/RJA/VTZ)
    SignalLock.tsx           // §8 — concentric rings collapse into a single solid green disc
```

Each scene file exports a component with: its own geometry, its own material, its own `useFrame` idle motion, and a one-shot intro animation triggered when the section enters the viewport (IntersectionObserver). Scenes only mount/render while their section is on-screen for perf.

### Section ↔ object mapping
| # | Section | 3D Object | Entry animation | Idle motion |
|---|---------|-----------|-----------------|-------------|
| 1 | Genesis | Obsidian monolith w/ vertical emissive seam | fade + scale-from-0.6, seam ignites | slow Y-axis rotation, seam breathing |
| 2 | Warning | 6 amber satellites around a dim hub | satellites swoop in from off-axis one-by-one | orbit + staggered pulse |
| 3 | Fragmented | 5 stacked metallic plates | plates explode apart along Y | gentle drift + tilt |
| 4 | Connected | Wireframe lattice cube | scattered line segments fly inward and snap into a cube | slow auto-rotate, edge shimmer |
| 5 | Distress | Radial gauge + vertical bar | needle sweeps 0→62%, bar grows | needle micro-jitter |
| 6 | Network | 6 hex prisms + connecting edges | hexes rise from below, edges illuminate sequentially | light packet travels around the ring |
| 7 | Traction | Tilted India plate w/ 4 city nodes | plate tilts up into view, nodes pop in | nodes pulse, soft sweep beam |
| 8 | Payoff | Concentric green rings | rings collapse from large→small into one solid disc | gentle bloom breathing |

### Section layout change
In `Sections.tsx`, each `Sticky` grid gets a 3D column. Pattern:
```text
[ copy / metrics ]  [ <Canvas><SceneX /></Canvas> ]
```
Section 1 and 8 (centered hero/payoff) put the canvas behind the text instead of beside it.

## Technical notes
- Reuse already-installed `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`, `framer-motion`, `three`.
- Each `<Canvas>` uses `dpr={[1, 1.5]}`, `frameloop="demand"` when off-screen via drei's `<PerformanceMonitor>` or a simple `useInView` toggle.
- Materials stay on the existing palette tokens: graphite `#0d1117`, green `#38f8b3`, cyan `#6df1ff`, amber `#ffb547`.
- Bloom only on §1, §4, §8 (cheaper overall vs. one global composer).
- `prefers-reduced-motion`: scenes skip intro tween and freeze idle motion; static pose still looks complete.

## Out of scope
- No new npm deps.
- No backend changes.
- HUD, scroll progress tracker, grid/noise atmosphere overlays — kept as-is.
- Existing section copy stays; only the visual companion changes.
