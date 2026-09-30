"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface SmartLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

/**
 * One link for every destination on the site:
 * - external URLs open in a new tab, `mailto:`/`tel:` stay plain anchors
 * - in-page anchors (`#x`, or `/#x` while on the home page) stay plain
 *   anchors, which <SmoothScroll> eases
 * - other routes go through next/link, tagged for the page wipe
 */
export function SmartLink({ href, children, ...props }: SmartLinkProps) {
  const pathname = usePathname();

  if (/^https?:/.test(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }

  if (/^(mailto|tel):/.test(href) || href.startsWith("#") || (href.startsWith("/#") && pathname === "/")) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  const samePage = href.split("#")[0] === pathname;
  return (
    <Link href={href} transitionTypes={samePage ? undefined : ["page"]} {...props}>
      {children}
    </Link>
  );
}

export default SmartLink;
