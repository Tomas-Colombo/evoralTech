/**
 * Hand-off between the loader and the hero: the hero's entrance waits until
 * the loader starts leaving (or immediately, when there is no loader).
 */
const EVENT = "evoral:intro";

declare global {
  interface Window {
    __evoralIntro?: boolean;
  }
}

export function releaseIntro() {
  if (window.__evoralIntro) return;
  window.__evoralIntro = true;
  document.documentElement.setAttribute("data-ready", "");
  window.dispatchEvent(new Event(EVENT));
}

/** Runs `callback` once the intro is released; returns an unsubscribe. */
export function onIntro(callback: () => void) {
  if (window.__evoralIntro) {
    callback();
    return () => {};
  }
  window.addEventListener(EVENT, callback, { once: true });
  return () => window.removeEventListener(EVENT, callback);
}
