import { cn } from "@/lib/utils";

/**
 * Page-wide column guides and paper grain, fixed behind the content. The
 * guides follow the same grid the layout uses: 4 columns on phones, 12 above.
 */
export function GridLines() {
  return (
    <>
      <div aria-hidden="true" className="paper-grain" />
      <div aria-hidden="true" className="grid-page pointer-events-none fixed inset-0 z-0">
        {Array.from({ length: 12 }, (_, index) => (
          <div
            key={index}
            className={cn(
              "border-l border-[var(--rule-faint)]",
              index === 3 && "max-md:border-r",
              index === 11 && "border-r",
              index >= 4 && "hidden md:block",
            )}
          />
        ))}
      </div>
    </>
  );
}

export default GridLines;
