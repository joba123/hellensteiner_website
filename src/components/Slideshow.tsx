import { useEffect, useRef, useState } from "react";
import { useSichtbar } from "../../assets/ts/useSichtbar";

const BILDER = [
  { src: "/assets/images_converted/slide1.jpg", alt: "Historisches Bild 1" },
  { src: "/assets/images_converted/slide2.jpg", alt: "Historisches Bild 2" },
  { src: "/assets/images_converted/slide3.jpg", alt: "Historisches Bild 3" }
];

export function Slideshow() {
  const { ref, sichtbar } = useSichtbar<HTMLDivElement>();
  const [aktiv, setAktiv] = useState(0);
  const pausiert = useRef(false);

  useEffect(() => {
    const t = setInterval(() => {
      if (!pausiert.current) setAktiv((i) => (i + 1) % BILDER.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const zeige = (i: number) => setAktiv(((i % BILDER.length) + BILDER.length) % BILDER.length);

  return (
    <section className="dyn-section">
      <h2>Bilder unserer Geschichte</h2>
      <div
        ref={ref}
        className={`slideshow reveal${sichtbar ? " sichtbar" : ""}`}
        onMouseEnter={() => { pausiert.current = true; }}
        onMouseLeave={() => { pausiert.current = false; }}
      >
        <div className="slide-track">
          {BILDER.map((b, i) => (
            <img key={b.src} src={b.src} alt={b.alt} className={`slide${i === aktiv ? " aktiv" : ""}`} />
          ))}
        </div>
        <button className="slide-pfeil prev" aria-label="Vorheriges Bild" onClick={() => zeige(aktiv - 1)}>‹</button>
        <button className="slide-pfeil next" aria-label="Nächstes Bild" onClick={() => zeige(aktiv + 1)}>›</button>
        <div className="slide-dots">
          {BILDER.map((b, i) => (
            <button
              key={b.src}
              className={`slide-dot${i === aktiv ? " aktiv" : ""}`}
              aria-label={`Bild ${i + 1}`}
              onClick={() => zeige(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
