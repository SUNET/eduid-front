import { useEffect } from "react";
import { useLocation } from "react-router";

function ScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const scroll = () => {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    };
    setTimeout(scroll, 50);
  }, [hash, pathname]);
  return null;
}

export default ScrollToHash;
