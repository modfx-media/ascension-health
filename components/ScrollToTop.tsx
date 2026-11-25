"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      try {
        window.history.scrollRestoration = "manual";
      } catch {
        // Older WebKit rejects the assignment.
      }
    }
    try {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    } catch {
      // Safari does not accept ScrollBehavior "instant".
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
