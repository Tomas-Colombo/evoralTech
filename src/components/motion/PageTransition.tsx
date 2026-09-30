import { ViewTransition } from "react";

/**
 * Editorial wipe between routes: the old page lifts away, the new one is
 * unmasked from the bottom. Only navigations tagged `page` animate (see
 * <SmartLink>); browser back/forward and refreshes stay instant.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition
      enter={{ page: "page", default: "none" }}
      exit={{ page: "page", default: "none" }}
      default="none"
    >
      {children}
    </ViewTransition>
  );
}

export default PageTransition;
