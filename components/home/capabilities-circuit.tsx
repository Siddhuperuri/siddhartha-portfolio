import { SectionRegister } from "@/components/primitives/section-register";
import { CircuitBoard } from "@/components/ui/circuit-board";

const W = 1000;
const H = 520;

const nodes = [
  { id: "me", label: "Siddhartha", size: "lg", status: "active", x: 500, y: 260 },
  { id: "ui", label: "UI/UX", size: "md", status: "active", x: 140, y: 90 },
  { id: "brand", label: "Branding", size: "md", status: "active", x: 140, y: 260 },
  { id: "type", label: "Typography", size: "md", status: "active", x: 140, y: 430 },
  { id: "web", label: "HTML · CSS · JS", size: "md", status: "active", x: 860, y: 90 },
  { id: "py", label: "Python", size: "md", status: "active", x: 860, y: 260 },
  { id: "gl", label: "Three.js", size: "md", status: "active", x: 860, y: 430 },
  { id: "figma", label: "Figma", size: "sm", status: "processing", x: 500, y: 60 },
  { id: "framer", label: "Framer", size: "sm", status: "processing", x: 500, y: 460 },
] as const;

const connections = [
  { from: "ui", to: "me" },
  { from: "brand", to: "me" },
  { from: "type", to: "me" },
  { from: "me", to: "web" },
  { from: "me", to: "py" },
  { from: "me", to: "gl" },
  { from: "figma", to: "me" },
  { from: "framer", to: "me" },
] as const;

/**
 * [ 06 / 09 ] CAPABILITIES — the design and build vocabularies as a circuit
 * routed through one node. Signals pulse in the accent red.
 */
export function CapabilitiesCircuit() {
  return (
    <section
      aria-labelledby="capabilities-heading"
      className="relative border-t border-[var(--rule-hairline)] pb-[var(--space-section)]"
      id="capabilities"
    >
      <SectionRegister index={6} label="CAPABILITIES" />

      <div className="mx-auto max-w-[var(--container-wide)] px-[var(--grid-margin)] pt-[calc(var(--space-section)*0.5)]">
        <h2
          className="max-w-[20ch] font-[family-name:var(--font-display)] text-[length:var(--text-4xl)] leading-[1.02] font-normal tracking-[var(--tracking-heading)] text-[var(--paper-100)] md:text-[length:var(--text-6xl)]"
          id="capabilities-heading"
        >
          Design on one side.
          <br />
          <span className="text-[var(--paper-400)]">Build on the other.</span>
        </h2>
        <p className="mt-[var(--space-6)] max-w-[48ch] font-[family-name:var(--font-sans)] text-[16px] leading-[1.55] text-[var(--paper-200)]">
          Both run through the same person, so a decision made in the layout is already
          checked against what the front-end can do.
        </p>

        <div className="mt-[var(--space-12)] overflow-x-auto border border-[var(--rule-default)] bg-[var(--ink-900)]">
          <CircuitBoard
            className="mx-auto"
            connections={connections.map((c) => ({ ...c }))}
            gridSize={24}
            height={H}
            nodeColor="rgba(245,245,245,0.85)"
            nodes={nodes.map((n) => ({ ...n }))}
            pulseColor="rgba(255,61,46,0.95)"
            traceColor="rgba(245,245,245,0.22)"
            variant="dark"
            width={W}
          />
        </div>
      </div>
    </section>
  );
}
