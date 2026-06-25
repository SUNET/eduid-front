import { useEffect } from "react";
import { useLocation } from "react-router";

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    globalThis.scroll(0, 0);
  }, [pathname]);

  return null;
}
