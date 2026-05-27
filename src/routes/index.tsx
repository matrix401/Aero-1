// src/routes/index.tsx
import { createFileRoute } from "@tanstack/react-router";
import { HUD } from "@/components/aeromind/HUD";
import { Sections } from "@/components/aeromind/Sections";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="relative w-full bg-[var(--am-bg)] text-[var(--am-text)] overflow-hidden">
      <HUD />
      <Sections />
      
      {/* Footer goes HERE - inside the div, after Sections */}
      <footer style={{ 
        position: 'relative', 
        zIndex: 2, 
        padding: '60px 6vw 40px', 
        borderTop: '1px solid rgba(34,211,238,0.15)', 
        textAlign: 'center' 
      }}>
        <a href="/about" style={{ color: '#22D3EE', textDecoration: 'none', margin: '0 1rem' }}>About</a>
        <a href="/contact" style={{ color: '#22D3EE', textDecoration: 'none', margin: '0 1rem' }}>Contact</a>
        <a href="/privacy" style={{ color: '#22D3EE', textDecoration: 'none', margin: '0 1rem' }}>Privacy</a>
        <p style={{ marginTop: '1rem', fontSize: '10px', color: '#5b7184' }}>AeroMind · zee@aero-1.com</p>
      </footer>
    </div>
  );
}