import { LOGO_PATHS } from "@/components/brand/logo-paths";

/**
 * Technical plates for the services list, one per service, drawn in the same
 * hairline language as the hero's exploded view. Paths marked `data-draw` are
 * stroked in when a plate becomes active; `data-accent` elements fade in last.
 */

const INK = "var(--ink)";
const label = { font: "400 9px var(--font-mono)", letterSpacing: "0.08em" } as const;

function DotGrid() {
  return (
    <>
      <defs>
        <pattern id="plate-dots" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.9" fill={INK} fillOpacity="0.16" />
        </pattern>
      </defs>
      <rect x="20" y="20" width="360" height="360" fill="url(#plate-dots)" />
    </>
  );
}

/** Idea → routed through decisions → the shipped check. */
function ProductPlate() {
  return (
    <>
      <DotGrid />
      <circle cx="60" cy="320" r="7" fill="none" stroke={INK} strokeWidth="1.25" />
      <text x="48" y="348" style={label} fill={INK}>
        IDEA
      </text>
      <path
        data-draw
        d="M67 320 H140 V240 H200 V180 H260 V130 H300"
        fill="none"
        stroke={INK}
        strokeWidth="1.25"
        pathLength={1}
      />
      {[
        [140, 240],
        [200, 180],
        [260, 130],
      ].map(([x, y]) => (
        <rect key={`${x}`} data-draw-node x={x - 4} y={y - 4} width="8" height="8" fill="var(--paper-2)" stroke={INK} strokeWidth="1.25" />
      ))}
      <text x="150" y="262" style={label} fill={INK} fillOpacity="0.6">
        ALCANCE
      </text>
      <text x="210" y="202" style={label} fill={INK} fillOpacity="0.6">
        ARQUITECTURA
      </text>
      <g data-accent transform="translate(282 62) scale(0.1)">
        <path d={LOGO_PATHS.ribbon} fill="var(--accent)" />
        <path d={LOGO_PATHS.ribbonBack} fill="var(--accent-deep)" />
      </g>
      <text data-accent x="300" y="190" style={label} fill={INK}>
        PRODUCCIÓN
      </text>
    </>
  );
}

/** A floor plan of modules; the accent one is the part only this client has. */
function CustomPlate() {
  const modules: [number, number, number, number, string][] = [
    [60, 60, 160, 110, "INVENTARIO"],
    [220, 60, 120, 60, "PRECIOS"],
    [220, 120, 120, 50, "RESERVAS"],
    [60, 170, 90, 170, "ACCESOS"],
    [150, 170, 190, 90, "VENTAS"],
    [150, 260, 110, 80, "REPORTES"],
  ];
  return (
    <>
      <DotGrid />
      {modules.map(([x, y, w, h, name]) => (
        <g key={name}>
          <rect data-draw x={x} y={y} width={w} height={h} fill="none" stroke={INK} strokeWidth="1.25" pathLength={1} />
          <text x={x + 10} y={y + 20} style={label} fill={INK} fillOpacity="0.7">
            {name}
          </text>
        </g>
      ))}
      <rect data-accent x="260" y="260" width="80" height="80" fill="var(--accent)" />
      <text data-accent x="268" y="280" style={label} fill={INK}>
        TU PROCESO
      </text>
    </>
  );
}

/** Nodes of a retrieval-and-action system; the accent path is one request. */
function AiPlate() {
  const nodes: [number, number][] = [
    [70, 110],
    [150, 70],
    [120, 200],
    [220, 150],
    [200, 280],
    [300, 210],
    [330, 320],
    [80, 310],
  ];
  const edges: [number, number][] = [
    [0, 1], [0, 2], [1, 3], [2, 3], [2, 4], [3, 5], [4, 5], [5, 6], [4, 7], [2, 7], [1, 5],
  ];
  const path = [0, 2, 3, 5, 6];
  const names: Record<number, string> = { 0: "CONSULTA", 3: "CONTEXTO", 5: "AGENTE", 6: "ACCIÓN" };
  return (
    <>
      <DotGrid />
      {edges.map(([a, b]) => (
        <line
          key={`${a}-${b}`}
          data-draw
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          stroke={INK}
          strokeOpacity="0.35"
          strokeWidth="1"
          pathLength={1}
        />
      ))}
      <polyline
        data-accent-draw
        points={path.map((i) => nodes[i].join(",")).join(" ")}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2.5"
        pathLength={1}
      />
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={path.includes(i) ? 6 : 4} fill={path.includes(i) ? "var(--ink)" : "var(--paper-2)"} stroke={INK} strokeWidth="1.25" />
          {names[i] && (
            <text x={x + 12} y={y - 10} style={label} fill={INK}>
              {names[i]}
            </text>
          )}
        </g>
      ))}
    </>
  );
}

/** Sources on the left, one system on the right, joined by live connectors. */
function IntegrationsPlate() {
  const sources = ["API", "WEBHOOK", "PLANILLA", "WHATSAPP"];
  return (
    <>
      <DotGrid />
      {sources.map((name, i) => {
        const y = 80 + i * 70;
        return (
          <g key={name}>
            <rect data-draw x="40" y={y - 18} width="100" height="36" fill="var(--paper-2)" stroke={INK} strokeWidth="1.25" pathLength={1} />
            <text x="52" y={y + 3} style={label} fill={INK}>
              {name}
            </text>
            <path
              data-draw
              d={`M140 ${y} C 210 ${y}, 210 200, 260 200`}
              fill="none"
              stroke={INK}
              strokeOpacity="0.5"
              strokeWidth="1"
              pathLength={1}
            />
            <path
              data-pulse
              d={`M140 ${y} C 210 ${y}, 210 200, 260 200`}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="3"
              strokeLinecap="round"
              pathLength={100}
              strokeDasharray="4 96"
              strokeDashoffset={i * 25}
            />
          </g>
        );
      })}
      <rect data-accent x="260" y="150" width="100" height="100" fill="var(--ink)" />
      <text data-accent x="272" y="172" style={label} fill="var(--paper)">
        SISTEMA
      </text>
      <rect data-accent x="272" y="224" width="12" height="12" fill="var(--accent)" />
    </>
  );
}

const PLATES = [ProductPlate, CustomPlate, AiPlate, IntegrationsPlate];

export function ServicePlate({ index }: { index: number }) {
  const Plate = PLATES[index] ?? ProductPlate;
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden="true">
      <Plate />
    </svg>
  );
}

export default ServicePlate;
