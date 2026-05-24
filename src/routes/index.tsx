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
    </div>
  );
}