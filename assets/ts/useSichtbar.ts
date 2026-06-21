import { useEffect, useRef, useState } from "react";

// Liefert eine Ref und ob das Eelment schon einmal in den sichtbaren Bereich gescrollt wurde.
export function useSichtbar<T extends HTMLElement>(schwelle = 0.25) {
  const ref = useRef<T>(null);
  const [sichtbar, setSichtbar] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (eintraege) => {
        eintraege.forEach((e) => {
          if (e.isIntersecting) {
            setSichtbar(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: schwelle }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [schwelle]);

  return { ref, sichtbar };
}
