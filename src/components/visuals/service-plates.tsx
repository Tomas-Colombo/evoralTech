"use client";

import { LOGO_PATHS } from "@/components/brand/logo-paths";
import { gsap } from "@/lib/gsap";

/**
 * Technical plates for the services list, drawn in the same hairline language
 * as the hero's exploded view. Each plate tells its service as a short story:
 * the markup is the finished drawing (what reduced motion and mobile see), and
 * `playPlate` replays how it got there, then keeps a quiet loop running that
 * shows the system at work. Motion hooks are `data-*` attributes scoped to
 * each plate's <svg>; a status line at the foot of every plate narrates.
 */

const INK = "var(--ink)";
const PAPER = "var(--paper)";
const ACCENT = "var(--accent)";
const ACCENT_DEEP = "var(--accent-deep)";
const ACCENT_LIGHT = "var(--accent-light)";
const label = { font: "400 9px var(--font-mono)", letterSpacing: "0.08em" } as const;
const typed = { font: "400 10px var(--font-mono)", letterSpacing: "0.04em" } as const;

type Box = [x: number, y: number, width: number, height: number];
const rect = ([x, y, width, height]: Box) => ({ x, y, width, height });

function DotGrid({ id }: { id: string }) {
  return (
    <>
      <defs>
        <pattern id={id} width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.9" fill={INK} fillOpacity="0.16" />
        </pattern>
      </defs>
      <rect x="20" y="20" width="360" height="360" fill={`url(#${id})`} />
    </>
  );
}

/** Hairline footer naming the step the plate is on. */
function Status({ text, aside }: { text: string; aside?: string }) {
  return (
    <>
      <line x1="40" y1="334" x2="360" y2="334" stroke={INK} strokeOpacity="0.2" strokeWidth="1" />
      <rect data-status-mark x="40" y="347" width="6" height="6" fill={ACCENT} />
      <text data-text data-status x="54" y="353" style={label} fill={INK}>
        {text}
      </text>
      {aside !== undefined && (
        <text data-text data-aside x="360" y="353" textAnchor="end" style={label} fill={INK} fillOpacity="0.6">
          {aside}
        </text>
      )}
    </>
  );
}

/* ------------------------------------------------------------------------ */
/* 01 · Product: an idea, scoped, built on its layers, shipped, iterated.   */
/* ------------------------------------------------------------------------ */

/** Main area, two cards, sidebar: the order iterations visit them in. */
const PRODUCT_BLOCKS: Box[] = [
  [120, 52, 232, 64],
  [120, 124, 112, 80],
  [240, 124, 112, 80],
  [48, 52, 64, 152],
];
const PRODUCT_LAYERS = ["INTERFAZ", "LÓGICA", "DATOS"];
const layerY = (i: number) => 236 + i * 28;

function ProductPlate() {
  return (
    <>
      <DotGrid id="plate-dots-product" />
      <rect data-frame x="40" y="44" width="320" height="168" fill={PAPER} stroke={INK} strokeWidth="1.25" pathLength={1} />

      {PRODUCT_BLOCKS.map((box, i) => (
        <rect key={`sketch-${i}`} data-sketch {...rect(box)} fill="none" stroke={INK} strokeOpacity="0.5" strokeDasharray="3 3" opacity="0" />
      ))}
      {PRODUCT_BLOCKS.map((box, i) => (
        <rect key={`block-${i}`} data-block {...rect(box)} fill="none" stroke={INK} strokeWidth="1" pathLength={1} />
      ))}

      <g data-content>
        <rect data-bar x="134" y="64" width="128" height="7" fill={INK} fillOpacity="0.85" />
        <rect data-bar x="134" y="80" width="176" height="3" fill={INK} fillOpacity="0.3" />
        <rect data-bar x="134" y="88" width="140" height="3" fill={INK} fillOpacity="0.3" />
        <rect data-bar x="134" y="100" width="44" height="8" fill={ACCENT} />
      </g>
      <g data-content>
        <rect data-bar x="132" y="136" width="44" height="3" fill={INK} fillOpacity="0.55" />
        <line x1="132" y1="192.5" x2="220" y2="192.5" stroke={INK} strokeOpacity="0.3" />
        {[18, 30, 24, 40, 34].map((h, i) => (
          <rect key={i} data-col x={136 + i * 16} y={192 - h} width="9" height={h} fill={ACCENT} />
        ))}
      </g>
      <g data-content>
        <rect data-bar x="252" y="136" width="44" height="3" fill={INK} fillOpacity="0.55" />
        {[72, 56, 80].map((w, i) => (
          <g key={i}>
            <rect data-bar x="252" y={153.5 + i * 14} width="5" height="5" fill={INK} fillOpacity="0.5" />
            <rect data-bar x="262" y={154.5 + i * 14} width={w} height="3" fill={INK} fillOpacity="0.3" />
          </g>
        ))}
      </g>
      <g data-content>
        <rect data-bar x="58" y="62" width="12" height="12" fill={INK} />
        {[40, 30, 44, 26].map((w, i) => (
          <rect key={i} data-bar x="58" y={90 + i * 14} width={w} height="3" fill={i === 0 ? ACCENT : INK} fillOpacity={i === 0 ? 1 : 0.3} />
        ))}
      </g>

      <rect data-focus {...rect(PRODUCT_BLOCKS[0])} fill="none" stroke={ACCENT_DEEP} strokeWidth="1.5" opacity="0" />

      <g data-idea opacity="0">
        <circle cx="200" cy="128" r="6" fill={PAPER} stroke={INK} strokeWidth="1.25" />
        <text x="212" y="131" style={label} fill={INK}>
          IDEA
        </text>
      </g>
      <circle data-idea-ring cx="200" cy="128" r="6" fill="none" stroke={ACCENT} strokeWidth="1" opacity="0" />

      {[80, 200, 320].map((x) =>
        [
          [212, 236],
          [256, 264],
          [284, 292],
        ].map(([a, b]) => <line key={`${x}-${a}`} data-link x1={x} y1={a} x2={x} y2={b} stroke={INK} strokeWidth="1" pathLength={1} />),
      )}
      {PRODUCT_LAYERS.map((name, i) => (
        <g key={name} data-layer>
          <rect x="40" y={layerY(i)} width="320" height="20" fill={PAPER} stroke={INK} strokeWidth="1" />
          <rect data-layer-glow x="40" y={layerY(i)} width="320" height="20" fill={ACCENT} opacity="0" />
          <text x="52" y={layerY(i) + 13.5} style={label} fill={INK}>
            {name}
          </text>
        </g>
      ))}
      <rect data-deploy x="196" y="208" width="8" height="8" fill={ACCENT_DEEP} opacity="0" />

      <g data-stamp>
        <g transform="translate(318 5.7) scale(0.055)">
          <path d={LOGO_PATHS.ribbon} fill={ACCENT} />
          <path d={LOGO_PATHS.ribbonBack} fill={ACCENT_DEEP} />
        </g>
      </g>

      <Status text="EN PRODUCCIÓN" aside="v1.0" />
    </>
  );
}

const version = (n: number) => `v${1 + Math.floor(n / 10)}.${n % 10}`;

function productMotion(svg: SVGSVGElement) {
  const q = gsap.utils.selector(svg);
  const aside = q("[data-aside]")[0];
  const sketches = q("[data-sketch]");
  const contents = q("[data-content]");
  const focus = q("[data-focus]")[0];
  const deploy = q("[data-deploy]")[0];
  const glows = q("[data-layer-glow]");
  const tl = gsap.timeline();
  write(aside, "");

  say(tl, svg, "IDEA", 0);
  tl.fromTo(q("[data-idea]"), { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.5, ease: "expo.out" }, 0)
    .fromTo(q("[data-idea-ring]"), { opacity: 0.8, scale: 1, transformOrigin: "50% 50%" }, { opacity: 0, scale: 4, duration: 1, ease: "power2.out" }, 0.2);

  say(tl, svg, "ALCANCE", 0.6);
  tl.fromTo(q("[data-frame]"), hiddenBox(), drawnBox({ duration: 0.8, ease: "power2.inOut" }), 0.6)
    .to(q("[data-idea]"), { opacity: 0, duration: 0.35, ease: "power2.in" }, 1)
    .fromTo(sketches, { opacity: 0, scale: 0, transformOrigin: "0% 0%" }, { opacity: 1, scale: 1, duration: 0.55, ease: "expo.out", stagger: 0.1 }, 1);

  say(tl, svg, "ARQUITECTURA", 1.6);
  tl.fromTo(q("[data-layer]"), { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: 0.7, ease: "expo.out", stagger: 0.12 }, 1.6).fromTo(
    q("[data-link]"),
    hidden(),
    { strokeDashoffset: 0, duration: 0.35, ease: "power2.out", stagger: 0.04 },
    1.75,
  );

  say(tl, svg, "CONSTRUCCIÓN", 2.4);
  tl.fromTo(q("[data-block]"), hidden(), { strokeDashoffset: 0, duration: 0.7, ease: "power2.inOut", stagger: 0.08 }, 2.4)
    .to(sketches, { opacity: 0, duration: 0.4 }, 2.8)
    .from(q("[data-content] line"), { opacity: 0, duration: 0.3 }, 2.6)
    .from(q("[data-bar]"), { scaleX: 0, transformOrigin: "0% 50%", duration: 0.6, ease: "expo.out", stagger: 0.025 }, 2.6)
    .from(q("[data-col]"), { scaleY: 0, transformOrigin: "50% 100%", duration: 0.6, ease: "expo.out", stagger: 0.05 }, 2.7);

  say(tl, svg, "EN PRODUCCIÓN", 3.4);
  tl.call(write, [aside, version(0)], 3.4).fromTo(
    q("[data-stamp]"),
    { opacity: 0, scale: 1.3, transformOrigin: "50% 50%" },
    { opacity: 1, scale: 1, duration: 0.55, ease: "expo.out" },
    3.4,
  );

  // Continuous evolution: one block changes, the release travels down the stack.
  let release = 0;
  const loop = gsap.timeline({ repeat: -1 });
  PRODUCT_BLOCKS.forEach(([x, y, w, h], k) => {
    const at = k * 2.8;
    say(loop, svg, "NUEVA ITERACIÓN", at);
    loop
      .fromTo(
        focus,
        { opacity: 0, attr: { x: x - 6, y: y - 6, width: w + 12, height: h + 12 } },
        { opacity: 1, attr: { x, y, width: w, height: h }, duration: 0.5, ease: "expo.out", immediateRender: false },
        at,
      )
      .fromTo(
        contents[k].querySelectorAll("[data-bar]"),
        { scaleX: 0, transformOrigin: "0% 50%" },
        { scaleX: 1, duration: 0.55, ease: "expo.out", stagger: 0.04, immediateRender: false },
        at + 0.35,
      )
      .fromTo(
        contents[k].querySelectorAll("[data-col]"),
        { scaleY: 0, transformOrigin: "50% 100%" },
        { scaleY: 1, duration: 0.55, ease: "expo.out", stagger: 0.05, immediateRender: false },
        at + 0.35,
      )
      .set(deploy, { attr: { y: 208 } }, at + 0.9)
      .to(deploy, { opacity: 1, duration: 0.15 }, at + 0.9)
      .to(deploy, { attr: { y: 298 }, duration: 0.8, ease: "none" }, at + 0.9)
      .to(deploy, { opacity: 0, duration: 0.2 }, at + 1.7);
    [0.2, 0.45, 0.7].forEach((offset, i) => {
      loop.fromTo(glows[i], { opacity: 0 }, { opacity: 0.22, duration: 0.15, yoyo: true, repeat: 1, immediateRender: false }, at + 0.9 + offset);
    });
    say(loop, svg, "EN PRODUCCIÓN", at + 1.75);
    loop.call(() => write(aside, version(++release)), undefined, at + 1.75).to(focus, { opacity: 0, duration: 0.4 }, at + 1.9);
  });
  tl.add(loop, 4.6);
  return tl;
}

/* ------------------------------------------------------------------------ */
/* 02 · Custom: a generic template reshaped around the client's process.    */
/* ------------------------------------------------------------------------ */

const ROOMS: { name: string; plan: Box; grid: Box }[] = [
  { name: "INVENTARIO", plan: [64, 40, 152, 104], grid: [64, 40, 91, 136] },
  { name: "PRECIOS", plan: [216, 40, 120, 56], grid: [155, 40, 90, 136] },
  { name: "RESERVAS", plan: [216, 96, 120, 48], grid: [245, 40, 91, 136] },
  { name: "ACCESOS", plan: [64, 144, 88, 168], grid: [64, 176, 91, 136] },
  { name: "VENTAS", plan: [152, 144, 184, 88], grid: [155, 176, 90, 136] },
  { name: "REPORTES", plan: [152, 232, 104, 80], grid: [245, 176, 91, 136] },
];
const OWN_ROOM: Box = [256, 232, 80, 80];
const PROCESS = "M140 92 V208 H296 V272";
/** Stops along PROCESS, the room each one lands in, and when the token reaches it. */
const STATIONS = [
  { at: [140, 92], room: 0, t: 0 },
  { at: [140, 208], room: 3, t: 0.345 },
  { at: [216, 208], room: 4, t: 0.571 },
  { at: [296, 272], room: -1, t: 1 },
] as const;
/** Where the process runs into the template's walls. */
const CLASHES: [number, number][] = [
  [140, 176],
  [155, 208],
  [245, 208],
];
const roomLabel = ([x, y]: Box) => ({ x: x + 10, y: y + 18 });

function CustomPlate() {
  return (
    <>
      <DotGrid id="plate-dots-custom" />
      {ROOMS.map(({ name, plan }) => (
        <g key={name}>
          <rect data-room-glow {...rect(plan)} fill={ACCENT} opacity="0" />
          <rect data-room {...rect(plan)} fill="none" stroke={INK} strokeWidth="1.25" pathLength={1} />
          <text data-room-label {...roomLabel(plan)} style={label} fill={INK} fillOpacity="0.7">
            {name}
          </text>
        </g>
      ))}
      <rect data-own {...rect(OWN_ROOM)} fill={ACCENT} />
      <text data-own-label x="264" y="302" style={label} fill={INK}>
        TU PROCESO
      </text>

      <path data-process d={PROCESS} fill="none" stroke={ACCENT_DEEP} strokeWidth="2" pathLength={1} />
      {STATIONS.map(({ at: [x, y] }) => (
        <rect key={`${x}-${y}`} data-station x={x - 4} y={y - 4} width="8" height="8" fill={PAPER} stroke={ACCENT_DEEP} strokeWidth="1.5" />
      ))}
      {CLASHES.map(([x, y]) => (
        <g key={`${x}-${y}`} data-clash opacity="0" stroke={ACCENT_DEEP} strokeWidth="1.75">
          <line x1={x - 5} y1={y - 5} x2={x + 5} y2={y + 5} />
          <line x1={x - 5} y1={y + 5} x2={x + 5} y2={y - 5} />
        </g>
      ))}

      <g stroke={INK} strokeOpacity="0.45" strokeWidth="1">
        <line data-cota x1="64" y1="26" x2="336" y2="26" pathLength={1} />
        <line data-cota x1="48" y1="40" x2="48" y2="312" pathLength={1} />
        {[64, 152, 216, 256, 336].map((x) => (
          <line key={`tx-${x}`} data-tick x1={x} y1="22" x2={x} y2="30" />
        ))}
        {[40, 144, 232, 312].map((y) => (
          <line key={`ty-${y}`} data-tick x1="44" y1={y} x2="52" y2={y} />
        ))}
      </g>

      <rect data-token x="-4.5" y="-4.5" width="9" height="9" fill={INK} opacity="0" />
      <Status text="A MEDIDA" />
    </>
  );
}

function customMotion(svg: SVGSVGElement) {
  const q = gsap.utils.selector(svg);
  const rooms = q("[data-room]");
  const labels = q("[data-room-label]");
  const glows = q("[data-room-glow]");
  const stations = q("[data-station]");
  const own = q("[data-own]")[0];
  const process = svg.querySelector<SVGPathElement>("[data-process]")!;
  const token = q("[data-token]")[0];
  const tl = gsap.timeline();

  // Start from the off-the-shelf grid: equal boxes, and no room for the client.
  ROOMS.forEach(({ grid }, i) => {
    gsap.set(rooms[i], { attr: rect(grid) });
    gsap.set(labels[i], { attr: roomLabel(grid) });
  });
  gsap.set(own, { opacity: 0, attr: { x: 296, y: 272, width: 0, height: 0 } });
  gsap.set(q("[data-own-label]"), { opacity: 0 });

  say(tl, svg, "PLANTILLA GENÉRICA", 0);
  tl.fromTo(rooms, hidden(), { strokeDashoffset: 0, duration: 0.7, ease: "power2.inOut", stagger: 0.06 }, 0).fromTo(
    labels,
    { opacity: 0 },
    { opacity: 1, duration: 0.4, stagger: 0.06 },
    0.3,
  );

  say(tl, svg, "TU PROCESO", 0.9);
  tl.fromTo(process, hidden(), { strokeDashoffset: 0, duration: 0.9, ease: "none" }, 0.9);
  STATIONS.forEach(({ t }, i) => {
    tl.fromTo(stations[i], { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.35, ease: "expo.out" }, 0.9 + t * 0.9);
  });

  say(tl, svg, "NO ENCAJA", 1.9);
  tl.fromTo(q("[data-clash]"), { opacity: 0, scale: 0.4, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.35, ease: "expo.out", stagger: 0.12 }, 1.9);

  say(tl, svg, "A MEDIDA", 2.7);
  tl.to(q("[data-clash]"), { opacity: 0, duration: 0.3 }, 2.7);
  ROOMS.forEach(({ plan }, i) => {
    tl.to(rooms[i], { attr: rect(plan), duration: 1, ease: "expo.inOut" }, 2.7 + i * 0.04).to(
      labels[i],
      { attr: roomLabel(plan), duration: 1, ease: "expo.inOut" },
      2.7 + i * 0.04,
    );
  });
  tl.to(own, { opacity: 1, attr: rect(OWN_ROOM), duration: 0.8, ease: "expo.out" }, 3.2)
    .to(q("[data-own-label]"), { opacity: 1, duration: 0.4 }, 3.6)
    .fromTo(q("[data-cota]"), hidden(), { strokeDashoffset: 0, duration: 0.6, ease: "power2.inOut" }, 3.7)
    .fromTo(q("[data-tick]"), { opacity: 0 }, { opacity: 1, duration: 0.3, stagger: 0.04 }, 3.8);

  // The process in use: a token walks it and each room it touches answers.
  const loop = gsap.timeline({ repeat: -1, repeatDelay: 0.8 });
  say(loop, svg, "EN USO", 0);
  loop
    .fromTo(token, { opacity: 0 }, { opacity: 1, duration: 0.2, immediateRender: false }, 0)
    .add(along(token, process, { duration: 2.4, ease: "none" }), 0)
    .to(token, { opacity: 0, duration: 0.3 }, 2.45);
  STATIONS.forEach(({ room, t }, i) => {
    const at = t * 2.4;
    loop.fromTo(stations[i], { scale: 1.7, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.45, ease: "expo.out", immediateRender: false }, at);
    if (room >= 0) {
      loop.fromTo(glows[room], { opacity: 0 }, { opacity: 0.16, duration: 0.25, yoyo: true, repeat: 1, repeatDelay: 0.3, immediateRender: false }, at);
    } else {
      loop.fromTo(own, { opacity: 0.55 }, { opacity: 1, duration: 0.6, ease: "expo.out", immediateRender: false }, at);
    }
  });
  say(loop, svg, "A MEDIDA", 2.6);
  tl.add(loop, 4.5);
  return tl;
}

/* ------------------------------------------------------------------------ */
/* 03 · AI: a question, answered from the client's own data, then acted on. */
/* ------------------------------------------------------------------------ */

const AI_SOURCES = ["STOCK", "AGENDA", "VENTAS"];
const aiRowY = (i: number) => 140 + i * 24;
const aiCellX = (j: number) => 96 + j * 28;
const aiLink = (i: number) => `M232 ${aiRowY(i)} C 248 ${aiRowY(i)}, 248 164, 264 164`;
const AI_QUERIES = [
  { ask: "¿HAY STOCK EN SEDE NORTE?", row: 0, cells: [1, 3], answer: "RESPUESTA ENVIADA AL CLIENTE" },
  { ask: "MOVER EL TURNO DEL JUEVES", row: 1, cells: [0, 2], answer: "TURNO REPROGRAMADO" },
  { ask: "VENTAS DE LA ÚLTIMA SEMANA", row: 2, cells: [1, 2, 4], answer: "REPORTE ENVIADO POR E-MAIL" },
];

function AiPlate() {
  const shown = AI_QUERIES[0];
  return (
    <>
      <DotGrid id="plate-dots-ai" />
      <text x="40" y="44" style={label} fill={INK} fillOpacity="0.6">
        CONSULTA
      </text>
      <rect data-box x="40" y="52" width="320" height="36" fill={PAPER} stroke={INK} strokeWidth="1.25" pathLength={1} />
      <text x="52" y="74" style={typed} fill={INK}>
        <tspan data-text data-ask>
          {shown.ask}
        </tspan>
        <tspan data-caret fill={ACCENT_DEEP} fillOpacity="0">
          _
        </tspan>
      </text>

      <text x="40" y="120" style={label} fill={INK} fillOpacity="0.6">
        TUS DATOS
      </text>
      {AI_SOURCES.map((name, i) => (
        <g key={name}>
          <text x="40" y={aiRowY(i) + 3} style={label} fill={INK}>
            {name}
          </text>
          {[0, 1, 2, 3, 4].map((j) => (
            <g key={j} data-cell>
              <rect x={aiCellX(j)} y={aiRowY(i) - 6} width="24" height="12" fill={PAPER} stroke={INK} strokeOpacity="0.35" strokeWidth="1" />
              <rect
                data-hit
                data-row={i}
                x={aiCellX(j)}
                y={aiRowY(i) - 6}
                width="24"
                height="12"
                fill={ACCENT}
                opacity={i === shown.row && shown.cells.includes(j) ? 1 : 0}
              />
            </g>
          ))}
          <path data-link-base d={aiLink(i)} fill="none" stroke={INK} strokeOpacity="0.3" strokeWidth="1" pathLength={1} />
          <path
            data-link-hit
            d={aiLink(i)}
            fill="none"
            stroke={ACCENT_DEEP}
            strokeWidth="1.5"
            pathLength={1}
            strokeDasharray="1"
            strokeDashoffset={i === shown.row ? 0 : 1}
          />
        </g>
      ))}
      <rect data-scan x="92" y="128" width="2" height="72" fill={ACCENT_DEEP} opacity="0" />

      <line x1="312" y1="88" x2="312" y2="128" stroke={INK} strokeOpacity="0.4" strokeWidth="1" />
      <line x1="312" y1="200" x2="312" y2="248" stroke={INK} strokeOpacity="0.4" strokeWidth="1" />
      <rect data-packet-in x="309" y="85" width="6" height="6" fill={ACCENT} opacity="0" />
      <rect data-packet-out x="309" y="197" width="6" height="6" fill={ACCENT} opacity="0" />

      <g data-assistant>
        <rect x="264" y="128" width="96" height="72" fill={INK} />
        <text x="274" y="146" style={label} fill={PAPER}>
          ASISTENTE
        </text>
        {[0, 1, 2].map((k) => (
          <rect key={k} data-think x={274 + k * 9} y="184" width="5" height="5" fill={ACCENT_LIGHT} opacity="0.35" />
        ))}
      </g>

      <text x="40" y="240" style={label} fill={INK} fillOpacity="0.6">
        ACCIÓN
      </text>
      <rect data-box x="40" y="248" width="320" height="40" fill={PAPER} stroke={INK} strokeWidth="1.25" pathLength={1} />
      <text data-text data-answer x="52" y="272" style={typed} fill={INK}>
        {shown.answer}
      </text>
      <g data-check>
        <rect x="336" y="262" width="12" height="12" fill={ACCENT} />
        <polyline points="339,268 341.5,270.5 345,265.5" fill="none" stroke={PAPER} strokeWidth="1.5" />
      </g>

      <Status text="RESUELTO" />
    </>
  );
}

function aiMotion(svg: SVGSVGElement) {
  const q = gsap.utils.selector(svg);
  const ask = q("[data-ask]")[0];
  const caret = q("[data-caret]")[0];
  const answer = q("[data-answer]")[0];
  const hits = q("[data-hit]");
  const linkHits = q("[data-link-hit]");
  const check = q("[data-check]")[0];
  const scan = q("[data-scan]")[0];
  const think = q("[data-think]");
  const packetIn = q("[data-packet-in]")[0];
  const packetOut = q("[data-packet-out]")[0];
  const tl = gsap.timeline();

  write(ask, "");
  write(answer, "");
  gsap.set(hits, { opacity: 0 });
  gsap.set(linkHits, { strokeDashoffset: 1 });
  gsap.set(check, { opacity: 0 });

  say(tl, svg, "EN ESPERA", 0);
  tl.fromTo(q("[data-box]"), hiddenBox(), drawnBox({ duration: 0.7, ease: "power2.inOut", stagger: 0.1 }), 0)
    .fromTo(q("[data-assistant]"), { opacity: 0, scale: 0.9, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.6, ease: "expo.out" }, 0.2)
    .fromTo(q("[data-cell]"), { opacity: 0 }, { opacity: 1, duration: 0.3, stagger: 0.015 }, 0.3)
    .fromTo(q("[data-link-base]"), hidden(), { strokeDashoffset: 0, duration: 0.4, ease: "power2.out", stagger: 0.06 }, 0.6);

  const loop = gsap.timeline({ repeat: -1 });
  AI_QUERIES.forEach((query) => {
    const c = gsap.timeline();
    const found = hits.filter((hit, index) => Number(hit.getAttribute("data-row")) === query.row && query.cells.includes(index % 5));
    const typing = query.ask.length * 0.034;

    say(c, svg, "CONSULTA", 0);
    c.set(caret, { attr: { "fill-opacity": 1 } }, 0)
      .add(typeText(ask, query.ask, 0.034), 0)
      .set(caret, { attr: { "fill-opacity": 0 } }, typing + 0.2)
      .fromTo(packetIn, { opacity: 0, attr: { y: 85 } }, { opacity: 1, attr: { y: 122 }, duration: 0.4, ease: "power2.in", immediateRender: false }, typing + 0.1)
      .to(packetIn, { opacity: 0, duration: 0.1 }, typing + 0.5);

    const scanAt = typing + 0.5;
    say(c, svg, "BUSCANDO EN TUS DATOS", scanAt);
    c.fromTo(think, { opacity: 0.35 }, { opacity: 1, duration: 0.2, stagger: { each: 0.1, repeat: 5, yoyo: true }, immediateRender: false }, scanAt)
      .fromTo(scan, { opacity: 0, attr: { x: 92 } }, { opacity: 1, duration: 0.15, immediateRender: false }, scanAt)
      .fromTo(scan, { attr: { x: 92 } }, { attr: { x: 236 }, duration: 0.9, ease: "none", immediateRender: false }, scanAt)
      .to(scan, { opacity: 0, duration: 0.2 }, scanAt + 0.9);
    found.forEach((hit) => {
      const centre = Number(hit.getAttribute("x")) + 12;
      c.fromTo(hit, { opacity: 0 }, { opacity: 1, duration: 0.2, immediateRender: false }, scanAt + ((centre - 92) / 144) * 0.9);
    });
    c.fromTo(linkHits[query.row], hidden(), { strokeDashoffset: 0, duration: 0.45, ease: "power2.inOut", immediateRender: false }, scanAt + 0.95);

    const replyAt = scanAt + 1.4;
    say(c, svg, "RESPONDIENDO", replyAt);
    c.fromTo(packetOut, { opacity: 0, attr: { y: 197 } }, { opacity: 1, attr: { y: 242 }, duration: 0.4, ease: "power2.in", immediateRender: false }, replyAt)
      .to(packetOut, { opacity: 0, duration: 0.1 }, replyAt + 0.4)
      .add(typeText(answer, query.answer, 0.024), replyAt + 0.45);

    const doneAt = replyAt + 0.5 + query.answer.length * 0.024;
    say(c, svg, "RESUELTO", doneAt);
    c.fromTo(check, { opacity: 0, scale: 1.5, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.45, ease: "expo.out", immediateRender: false }, doneAt);

    // Clear the desk for the next question.
    const clearAt = doneAt + 1.9;
    c.add(typeText(ask, query.ask, 0.01, true), clearAt)
      .to([answer, check], { opacity: 0, duration: 0.3 }, clearAt)
      .to(found, { opacity: 0, duration: 0.3 }, clearAt)
      .to(linkHits[query.row], { strokeDashoffset: -1, duration: 0.4, ease: "power2.in" }, clearAt)
      .call(write, [answer, ""], clearAt + 0.3)
      .set(answer, { opacity: 1 }, clearAt + 0.31);
    loop.add(c);
  });
  tl.add(loop, 1);
  return tl;
}

/* ------------------------------------------------------------------------ */
/* 04 · Integrations: hand-carried data replaced by a flow that never stops. */
/* ------------------------------------------------------------------------ */

const SOURCE_NAMES = ["TU WEB", "E-MAIL", "PLANILLA", "WHATSAPP"];
const SOURCE_Y = [114, 170, 226, 282];
const HUB_ROW_Y = [170, 186, 202, 218];
const HUB_ROW_W = [52, 40, 60, 34];
const OUTPUTS = ["STOCK", "FACTURA", "AVISO"];
const OUTPUT_Y = [150, 190, 230];
/** Which output each source ends up updating. */
const OUTPUT_OF = [0, 1, 0, 2];
const wireIn = (i: number) => `M116 ${SOURCE_Y[i]} C 138 ${SOURCE_Y[i]}, 138 ${HUB_ROW_Y[i]}, 160 ${HUB_ROW_Y[i]}`;
const wireOut = (o: number) => `M256 190 C 274 190, 274 ${OUTPUT_Y[o]}, 292 ${OUTPUT_Y[o]}`;
const manualHop = (i: number) => `M40 ${SOURCE_Y[i]} C 20 ${SOURCE_Y[i]}, 20 ${SOURCE_Y[i + 1]}, 40 ${SOURCE_Y[i + 1]}`;

function IntegrationsPlate() {
  return (
    <>
      <DotGrid id="plate-dots-integrations" />
      {[0, 1, 2].map((i) => (
        <path key={i} data-manual d={manualHop(i)} fill="none" stroke={INK} strokeOpacity="0.5" strokeWidth="1" strokeDasharray="2 3" opacity="0" />
      ))}
      {SOURCE_NAMES.map((name, i) => (
        <path key={name} data-wire d={wireIn(i)} fill="none" stroke={INK} strokeOpacity="0.45" strokeWidth="1" pathLength={1} />
      ))}
      {OUTPUTS.map((name, o) => (
        <path key={name} data-out-wire d={wireOut(o)} fill="none" stroke={INK} strokeOpacity="0.45" strokeWidth="1" pathLength={1} />
      ))}

      {SOURCE_NAMES.map((name, i) => (
        <g key={name}>
          <rect data-source x="40" y={SOURCE_Y[i] - 15} width="76" height="30" fill={PAPER} stroke={INK} strokeWidth="1.25" pathLength={1} />
          <rect data-source-glow x="40" y={SOURCE_Y[i] - 15} width="76" height="30" fill={ACCENT} opacity="0" />
          <text data-source-label x="50" y={SOURCE_Y[i] + 3} style={label} fill={INK}>
            {name}
          </text>
        </g>
      ))}

      <g data-hub>
        <rect x="160" y="130" width="96" height="120" fill={INK} />
        <text x="172" y="150" style={label} fill={PAPER}>
          SISTEMA
        </text>
        {HUB_ROW_Y.map((y, i) => (
          <g key={y}>
            <rect data-row-mark x="172" y={y - 2} width="4" height="4" fill={ACCENT_LIGHT} />
            <rect data-row-line x="182" y={y - 1} width={HUB_ROW_W[i]} height="2" fill={PAPER} fillOpacity="0.5" />
          </g>
        ))}
        <rect data-sync x="172" y="233.5" width="5" height="5" fill={ACCENT_LIGHT} />
        <text x="182" y="239" style={label} fill={PAPER} fillOpacity="0.75">
          AL DÍA
        </text>
      </g>

      {OUTPUTS.map((name, o) => (
        <g key={name}>
          <rect data-out x="292" y={OUTPUT_Y[o] - 14} width="68" height="28" fill={PAPER} stroke={INK} strokeWidth="1.25" pathLength={1} />
          <rect data-out-glow x="292" y={OUTPUT_Y[o] - 14} width="68" height="28" fill={ACCENT} opacity="0" />
          <text data-out-label x="302" y={OUTPUT_Y[o] + 3} style={label} fill={INK}>
            {name}
          </text>
        </g>
      ))}

      <rect data-hop x="-3.5" y="-3.5" width="7" height="7" fill={INK} opacity="0" />
      {SOURCE_NAMES.map((name) => (
        <rect key={name} data-packet x="-3" y="-3" width="6" height="6" fill={ACCENT} opacity="0" />
      ))}
      {SOURCE_NAMES.map((name) => (
        <rect key={name} data-packet-out x="-3" y="-3" width="6" height="6" fill={ACCENT} opacity="0" />
      ))}

      <Status text="AUTOMÁTICO" />
    </>
  );
}

function integrationsMotion(svg: SVGSVGElement) {
  const q = gsap.utils.selector(svg);
  const paths = (selector: string) => Array.from(svg.querySelectorAll<SVGPathElement>(selector));
  const manual = paths("[data-manual]");
  const hop = q("[data-hop]")[0];
  const sourceGlows = q("[data-source-glow]");
  const wires = paths("[data-wire]");
  const outWires = paths("[data-out-wire]");
  const packets = q("[data-packet]");
  const packetsOut = q("[data-packet-out]");
  const marks = q("[data-row-mark]");
  const lines = q("[data-row-line]");
  const outGlows = q("[data-out-glow]");
  const sync = q("[data-sync]")[0];
  const tl = gsap.timeline();

  say(tl, svg, "SISTEMAS SUELTOS", 0);
  tl.fromTo(q("[data-source]"), hiddenBox(), drawnBox({ duration: 0.6, ease: "power2.inOut", stagger: 0.08 }), 0)
    .fromTo(q("[data-source-label]"), { opacity: 0 }, { opacity: 1, duration: 0.4, stagger: 0.08 }, 0.2)
    .fromTo(q("[data-hub]"), { opacity: 0, scale: 0.94, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.6, ease: "expo.out" }, 2.3)
    .fromTo(wires, hidden(), { strokeDashoffset: 0, duration: 0.6, ease: "power2.inOut", stagger: 0.07 }, 2.35)
    .from(lines, { scaleX: 0, transformOrigin: "0% 50%", duration: 0.5, ease: "expo.out", stagger: 0.06 }, 2.6)
    .fromTo(outWires, hidden(), { strokeDashoffset: 0, duration: 0.45, ease: "power2.inOut", stagger: 0.06 }, 2.8)
    .fromTo(q("[data-out]"), hiddenBox(), drawnBox({ duration: 0.5, ease: "power2.inOut", stagger: 0.06 }), 2.95)
    .fromTo(q("[data-out-label]"), { opacity: 0 }, { opacity: 1, duration: 0.3, stagger: 0.06 }, 3.15);

  // Before: someone carries the data from one place to the next, in jolts.
  say(tl, svg, "CARGA MANUAL", 0.6);
  tl.to(manual, { opacity: 1, duration: 0.3, stagger: 0.1 }, 0.6).to(hop, { opacity: 1, duration: 0.15 }, 0.75);
  manual.forEach((path, i) => {
    const at = 0.75 + i * 0.5;
    tl.add(along(hop, path, { duration: 0.42, ease: "steps(4)" }), at).fromTo(
      sourceGlows[i + 1],
      { opacity: 0 },
      { opacity: 0.2, duration: 0.12, yoyo: true, repeat: 1, immediateRender: false },
      at + 0.42,
    );
  });
  tl.to([...manual, hop], { opacity: 0, duration: 0.3 }, 2.25);

  say(tl, svg, "CONECTANDO", 2.3);
  say(tl, svg, "AUTOMÁTICO", 3.5);

  // After: every source flows on its own, staggered so data is always moving.
  SOURCE_NAMES.forEach((_, i) => {
    const o = OUTPUT_OF[i];
    const flow = gsap.timeline({ repeat: -1, repeatDelay: 0.6 });
    flow
      .fromTo(packets[i], { opacity: 0 }, { opacity: 1, duration: 0.12, immediateRender: false }, 0)
      .add(along(packets[i], wires[i], { duration: 0.8, ease: "power1.inOut" }), 0)
      .to(packets[i], { opacity: 0, duration: 0.1 }, 0.78)
      .fromTo(lines[i], { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: 0.45, ease: "expo.out", immediateRender: false }, 0.85)
      .fromTo(marks[i], { opacity: 0.25 }, { opacity: 1, duration: 0.4, immediateRender: false }, 0.85)
      .fromTo(sync, { opacity: 0.25 }, { opacity: 1, duration: 0.35, immediateRender: false }, 0.85)
      .fromTo(packetsOut[i], { opacity: 0 }, { opacity: 1, duration: 0.1, immediateRender: false }, 0.95)
      .add(along(packetsOut[i], outWires[o], { duration: 0.55, ease: "power1.inOut" }), 0.95)
      .to(packetsOut[i], { opacity: 0, duration: 0.1 }, 1.45)
      .fromTo(outGlows[o], { opacity: 0 }, { opacity: 0.22, duration: 0.15, yoyo: true, repeat: 1, immediateRender: false }, 1.5);
    tl.add(flow, 3.5 + i * 0.6);
  });
  return tl;
}

/* ------------------------------------------------------------------------ */
/* Shared motion helpers                                                    */
/* ------------------------------------------------------------------------ */

/** Stroke fully undrawn; needs `pathLength={1}` on the element. */
const hidden = () => ({ strokeDasharray: 1, strokeDashoffset: 1 });
/** A filled box: outline undrawn and fill cleared, so it reads as drawn in. */
const hiddenBox = () => ({ ...hidden(), attr: { "fill-opacity": 0 } });
const drawnBox = (vars: gsap.TweenVars) => ({ strokeDashoffset: 0, attr: { "fill-opacity": 1 }, ...vars });

function write(el: Element | null | undefined, text: string) {
  if (el) el.textContent = text;
}

/** Updates the plate's status line and pulses its marker. */
function say(tl: gsap.core.Timeline, svg: SVGSVGElement, text: string, position: gsap.Position) {
  const mark = svg.querySelector("[data-status-mark]");
  tl.call(write, [svg.querySelector("[data-status]"), text], position);
  if (mark) tl.fromTo(mark, { opacity: 0.15 }, { opacity: 1, duration: 0.45, ease: "power2.out", immediateRender: false }, position);
}

/** Types (or erases) `text` into `el` one character at a time. */
function typeText(el: Element, text: string, perChar: number, erase = false) {
  const state = { n: erase ? text.length : 0 };
  return gsap.to(state, {
    n: erase ? 0 : text.length,
    duration: Math.max(text.length * perChar, 0.1),
    ease: "none",
    onUpdate: () => write(el, text.slice(0, Math.round(state.n))),
  });
}

/** Moves `el` (drawn around its own origin) along `path`. */
function along(el: Element, path: SVGGeometryElement, vars: gsap.TweenVars) {
  const length = path.getTotalLength();
  const state = { t: 0 };
  const place = () => {
    const point = path.getPointAtLength(state.t * length);
    el.setAttribute("transform", `translate(${point.x} ${point.y})`);
  };
  return gsap.to(state, { t: 1, ...vars, onStart: place, onUpdate: place });
}

/** Snapshot of every text node the motion rewrites, to put back on cleanup. */
function keepText(svg: SVGSVGElement) {
  const nodes = Array.from(svg.querySelectorAll("[data-text]"));
  const saved = nodes.map((node) => node.textContent ?? "");
  return () => nodes.forEach((node, i) => write(node, saved[i]));
}

const PLATES = [ProductPlate, CustomPlate, AiPlate, IntegrationsPlate];
const MOTIONS = [productMotion, customMotion, aiMotion, integrationsMotion];

/**
 * Plays plate `index`'s story inside the caller's GSAP context (which reverts
 * the tweens); `restore` puts back the text the timeline rewrote.
 */
export function playPlate(index: number, svg: SVGSVGElement) {
  const restore = keepText(svg);
  const timeline = (MOTIONS[index] ?? productMotion)(svg);
  return { timeline, restore };
}

export function ServicePlate({ index }: { index: number }) {
  const Plate = PLATES[index] ?? ProductPlate;
  return (
    <svg viewBox="0 0 400 400" className="pointer-events-none h-full w-full select-none" aria-hidden="true">
      <Plate />
    </svg>
  );
}

export default ServicePlate;
