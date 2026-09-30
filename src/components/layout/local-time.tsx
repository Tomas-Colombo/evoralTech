"use client";

import * as React from "react";

import { siteConfig } from "@/data/site";

const format = new Intl.DateTimeFormat("es-AR", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: siteConfig.timeZone,
});

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 10_000);
  return () => window.clearInterval(id);
}

const getSnapshot = () => format.format(new Date());
const getServerSnapshot = () => "--:--";

/** Current time in Argentina, for clients deciding when to write. */
export function LocalTime({ className }: { className?: string }) {
  const time = React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return (
    <span className={className}>
      Argentina <time aria-label={`Hora en Argentina: ${time}`}>{time}</time> UTC−3
    </span>
  );
}

export default LocalTime;
