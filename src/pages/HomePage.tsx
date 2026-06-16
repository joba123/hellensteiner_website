import { useEffect, useRef, useState, type MouseEvent, type PointerEvent, type ReactNode } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Button } from "../components/Button";
import { AgeGate } from "../components/AgeGate";
import { BeerQuote } from "../components/BeerQuote";

const revealTransition = { duration: 0.7, ease: "easeOut" } as const;
const revealViewport = { once: true, amount: 0.28 } as const;

const klassiker = [
  { image: "zwickl_hell_transparent.png", title: "Zwickl Hell", tone: "Dunkel, frisch, unfiltriert" },
  { image: "dunkelweiss_transparent.png", title: "Dunkelweiß", tone: "Malzig, weich, charaktervoll" },
  { image: "weizen_alkoholfrei_transparent.png", title: "Weizen Alkoholfrei", tone: "Spritzig und vollmundig" },
  { image: "hefeweiss_trasnparent.png", title: "Hefeweiß", tone: "Klassisch, hefebetont, rund" },
  { image: "radler_alkoholfrei_transparent.png", title: "Radler Alkoholfrei", tone: "Hell, leicht, erfrischend" },
  { image: "helles_radler_transparent.png", title: "Helles Radler", tone: "Süffig mit Zitrusnote" }
] as const;

const werte = [
  {
    image: "handwerk_icon_transparent.png",
    alt: "Handwerk",
    title: "Ehrlichkeit & Handwerk",
    text: "Wir setzen auf echtes Handwerk statt Industrieproduktion."
  },
  {
    image: "nachhaltigkeit_icon_transparent.png",
    alt: "Nachhaltigkeit",
    title: "Nachhaltigkeit",
    text: "Umweltbewusstsein gehört bei uns zum guten Ton - von der Braugerste bis zur Flasche."
  },
  {
    image: "anstoß_icon_transparent.png",
    alt: "Tradition",
    title: "Tradition & Qualität",
    text: "Wir brauen nach bewährten Rezepten, die seit Generationen bestehen."
  },
  {
    image: "regional_icon_transparent.png",
    alt: "Regionalität",
    title: "Regionalität",
    text: "Unsere Rohstoffe stammen von Bauern aus der Region - das schmeckt man."
  },
  {
    image: "innovation_transparent.png",
    alt: "Innovation",
    title: "Innovation & Zukunft",
    text: "Wir achten unsere Wurzeln und gehen zugleich mit modernen Ideen in die Zukunft."
  },
  {
    image: "gemeinschaft_tr4ansparent.png",
    alt: "Genuss",
    title: "Gemeinschaft & Genuss",
    text: "Bier verbindet - ob beim Fest, im Biergarten oder zu Hause mit Freunden."
  }
] as const;

const stats = [
  { end: 1846, decimals: 0, suffix: "", label: "seit", text: "Jahren steht Hellensteiner für handwerklich gebrautes Bier." },
  { end: 6, decimals: 0, suffix: "", label: "Klassiker", text: "Von Hefeweiß bis alkoholfreiem Radler." },
  { end: 450, decimals: 0, suffix: "+", label: "Mitarbeiter", text: "Menschen, die jeden Tag Handwerk, Service und Erlebnis möglich machen." },
  { end: 6, decimals: 0, suffix: "x", label: "Gold", text: "Auszeichnungen für echtes Brauhandwerk." }
] as const;

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={revealViewport}
      transition={{ ...revealTransition, delay }}
    >
      {children}
    </motion.div>
  );
}

function LandingHero() {
  const heroRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-7%"]);

  return (
    <section className="landing-hero" ref={heroRef} aria-labelledby="landing-title">
      <motion.img
        className="landing-hero__background"
        src="/assets/images/hero_img.png"
        alt="Hellensteiner Bräu Biergarten und Brauerei"
        style={reducedMotion ? undefined : { y: imageY }}
      />
      <motion.div className="landing-hero__content" style={reducedMotion ? undefined : { y: contentY }}>
        <p className="landing-eyebrow">Hellensteiner Bräu seit 1846</p>
        <h1 id="landing-title">Aus Liebe zum echten Bier.</h1>
        <p>Regional gebraut, handwerklich gedacht und gemacht für Momente, die nach Charakter schmecken.</p>
      </motion.div>
      <div className="landing-hero__ticker" aria-hidden="true">
        <span>Handwerk</span>
        <span>Regionalität</span>
        <span>Tradition</span>
        <span>Genuss</span>
      </div>
    </section>
  );
}

function CountUpNumber({
  end,
  decimals = 0,
  suffix = "",
  prefix = ""
}: {
  end: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}) {
  const numberRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(numberRef, { once: true, amount: 0.8 });
  const reducedMotion = useReducedMotion();
  const [value, setValue] = useState(reducedMotion ? end : 0);

  useEffect(() => {
    if (!isInView || reducedMotion) {
      if (reducedMotion) {
        setValue(end);
      }
      return;
    }

    let frameId = 0;
    const duration = 1100;
    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(end * eased);

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    }

    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, [end, isInView, reducedMotion]);

  const formattedValue = value.toLocaleString("de-DE", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals
  });

  return <span ref={numberRef}>{prefix}{formattedValue}{suffix}</span>;
}

function LandingStats() {
  return (
    <section className="landing-stats" aria-labelledby="landing-stats-title">
      <Reveal className="landing-section-heading">
        <p className="landing-eyebrow">Hellensteiner in Zahlen</p>
        <h2 id="landing-stats-title">Klein erzählt. Groß gemeint.</h2>
      </Reveal>
      <div className="landing-stats__grid">
        {stats.map((item, index) => (
          <motion.article
            className="landing-stat"
            key={`${item.end}-${item.label}`}
            initial={{ opacity: 0, y: 34, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={revealViewport}
            transition={{ ...revealTransition, delay: index * 0.07 }}
          >
            <strong>
              <CountUpNumber end={item.end} decimals={item.decimals} suffix={item.suffix} />
            </strong>
            <span>{item.label}</span>
            <p>{item.text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function LandingClassics() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragStateRef = useRef({
    isDragging: false,
    moved: false,
    pointerId: -1,
    scrollLeft: 0,
    startX: 0
  });

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    const scrollElement = scrollRef.current;

    if (!scrollElement) {
      return;
    }

    dragStateRef.current = {
      isDragging: true,
      moved: false,
      pointerId: event.pointerId,
      scrollLeft: scrollElement.scrollLeft,
      startX: event.clientX
    };

    scrollElement.setPointerCapture(event.pointerId);
    scrollElement.classList.add("is-dragging");
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const scrollElement = scrollRef.current;
    const dragState = dragStateRef.current;

    if (!scrollElement || !dragState.isDragging) {
      return;
    }

    const dragDistance = event.clientX - dragState.startX;

    if (Math.abs(dragDistance) > 4) {
      dragState.moved = true;
      event.preventDefault();
    }

    scrollElement.scrollLeft = dragState.scrollLeft - dragDistance;
  }

  function stopDragging(event: PointerEvent<HTMLDivElement>) {
    const scrollElement = scrollRef.current;
    const dragState = dragStateRef.current;

    if (!scrollElement || !dragState.isDragging) {
      return;
    }

    dragState.isDragging = false;

    if (scrollElement.hasPointerCapture(event.pointerId)) {
      scrollElement.releasePointerCapture(event.pointerId);
    }

    scrollElement.classList.remove("is-dragging");
  }

  function handleClickCapture(event: MouseEvent<HTMLDivElement>) {
    if (!dragStateRef.current.moved) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    dragStateRef.current.moved = false;
  }

  return (
    <section className="landing-classics" id="klassiker" aria-labelledby="landing-classics-title">
      <Reveal className="landing-section-heading">
        <p className="landing-eyebrow">Biersortiment</p>
        <h2 id="landing-classics-title">Unsere Klassiker</h2>
      </Reveal>
      <div className="landing-classics__viewport">
        <div
          className="landing-classics__scroll"
          aria-label="Klassiker Biere"
          ref={scrollRef}
          onClickCapture={handleClickCapture}
          onPointerCancel={stopDragging}
          onPointerDown={handlePointerDown}
          onPointerLeave={stopDragging}
          onPointerMove={handlePointerMove}
          onPointerUp={stopDragging}
        >
          {klassiker.map((produkt, index) => (
            <motion.a
              className="landing-classic-card"
              href="/shop"
              key={produkt.title}
              initial={{ opacity: 0, y: 38 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={revealViewport}
              transition={{ ...revealTransition, delay: index * 0.05 }}
            >
              <img src={`/assets/images/${produkt.image}`} alt={produkt.title} />
              <div>
                <span>0{index + 1}</span>
                <h3>{produkt.title}</h3>
                <p>{produkt.tone}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ValuesStory() {
  return (
    <section className="landing-values" aria-labelledby="landing-values-title">
      <Reveal className="landing-section-heading">
        <p className="landing-eyebrow">Was uns wichtig ist</p>
        <h2 id="landing-values-title">Echte Werte.</h2>
        <p>Unsere Werte sind keine Dekoration. Sie bestimmen, wie wir einkaufen, brauen, feiern und Zukunft denken.</p>
      </Reveal>
      <div className="landing-values__list">
        {werte.map((wert, index) => (
          <motion.article
            className="landing-value-card"
            key={wert.title}
            tabIndex={0}
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={revealViewport}
            transition={{ ...revealTransition, delay: index * 0.04 }}
          >
            <div className="landing-value-card__inner">
              <div className="landing-value-card__face landing-value-card__front">
                <img src={`/assets/images/${wert.image}`} alt={wert.alt} width="46" height="46" />
                <h3>{wert.title}</h3>
              </div>
              <div className="landing-value-card__face landing-value-card__back">
                <p>{wert.text}</p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function LandingFinalCta() {
  return (
    <section className="landing-final" aria-labelledby="landing-final-title">
      <Reveal>
        <p className="landing-eyebrow">Hellensteiner erleben</p>
        <h2 id="landing-final-title" className="sr-only">Bier-Zitat der Stunde</h2>
        <BeerQuote />
        <div className="landing-final__actions">
          <Button as="a" href="/shop">Zum Shop</Button>
          <Button as="a" href="/freunde-club">Freunde Club</Button>
          <Button as="a" href="/pages/biergarten.html">Biergarten ansehen</Button>
        </div>
      </Reveal>
    </section>
  );
}

export function HomePage() {
  return (
    <>
      <AgeGate />
      <main className="landing-page">
        <LandingHero />
        <LandingStats />
        <ValuesStory />
        <LandingClassics />
        <LandingFinalCta />
      </main>
    </>
  );
}
