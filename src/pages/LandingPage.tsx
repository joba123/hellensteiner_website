import { useRef, type MouseEvent, type PointerEvent } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Button } from "../components/Button";
import { Reveal, revealTransition, revealViewport } from "../components/Reveal";
import { StatCard } from "../components/StatCard";
import { FlipCard } from "../components/FlipCard";
import { TrikotFloatingCard } from "../components/TrikotFloatingCard";
import { Altersabfrage } from "./Altersabfrage";
import { BeerQuote } from "../components/BeerQuote";

const klassiker = [
  { image: "transparent/zwickl_hell_transparent.png", title: "Zwickl Hell", tone: "Dunkel, frisch, unfiltriert" },
  { image: "transparent/dunkelweiss_transparent.png", title: "Dunkelweiß", tone: "Malzig, weich, charaktervoll" },
  { image: "transparent/weizen_alkoholfrei_transparent.png", title: "Weizen Alkoholfrei", tone: "Spritzig und vollmundig" },
  { image: "transparent/hefeweiss_trasnparent.png", title: "Hefeweiß", tone: "Klassisch, hefebetont, rund" },
  { image: "transparent/radler_alkoholfrei_transparent.png", title: "Radler Alkoholfrei", tone: "Hell, leicht, erfrischend" },
  { image: "transparent/helles_radler_transparent.png", title: "Helles Radler", tone: "Süffig mit Zitrusnote" }
] as const;

const werte = [
  {
    image: "transparent/handwerk_icon_transparent.png",
    alt: "Handwerk",
    title: "Ehrlichkeit & Handwerk",
    text: "Wir setzen auf echtes Handwerk statt Industrieproduktion."
  },
  {
    image: "transparent/nachhaltigkeit_icon_transparent.png",
    alt: "Nachhaltigkeit",
    title: "Nachhaltigkeit",
    text: "Umweltbewusstsein gehört bei uns zum guten Ton - von der Braugerste bis zur Flasche."
  },
  {
    image: "transparent/anstoß_icon_transparent.png",
    alt: "Tradition",
    title: "Tradition & Qualität",
    text: "Wir brauen nach bewährten Rezepten, die seit Generationen bestehen."
  },
  {
    image: "transparent/regional_icon_transparent.png",
    alt: "Regionalität",
    title: "Regionalität",
    text: "Unsere Rohstoffe stammen von Bauern aus der Region - das schmeckt man."
  },
  {
    image: "transparent/innovation_transparent.png",
    alt: "Innovation",
    title: "Innovation & Zukunft",
    text: "Wir achten unsere Wurzeln und gehen zugleich mit modernen Ideen in die Zukunft."
  },
  {
    image: "transparent/gemeinschaft_tr4ansparent.png",
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

function LandingHero() {
  const heroRef = useRef<HTMLElement>(null);
  const wenigerBewegung = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-7%"]);

  return (
    <section className="startseiten-aufmacher" ref={heroRef} aria-labelledby="landing-title">
      <motion.img
        className="startseiten-aufmacher__hintergrund"
        src="/assets/images_converted/hero_img.jpg"
        alt="Hellensteiner Bräu Biergarten und Brauerei"
        style={wenigerBewegung ? undefined : { y: imageY }} //
      />
      <motion.div className="startseiten-aufmacher__inhalt" style={wenigerBewegung ? undefined : { y: contentY }}>
        <p className="startseite-ueberzeile">Hellensteiner Bräu seit 1846</p>
        <h1 id="landing-title">Aus Liebe zum echten Bier.</h1>
        <p>Regional gebraut, handwerklich gedacht und gemacht für Momente, die nach Charakter schmecken.</p>
      </motion.div>
      <div className="startseiten-aufmacher__lauftext" aria-hidden="true">
        <span>Handwerk</span>
        <span>Regionalität</span>
        <span>Tradition</span>
        <span>Genuss</span>
      </div>
    </section>
  );
}

function LandingStats() {
  return (
    <section className="startseiten-kennzahlen" aria-labelledby="landing-stats-title">
      <Reveal className="startseiten-abschnittsueberschrift">
        <p className="startseite-ueberzeile">Hellensteiner in Zahlen</p>
        <h2 id="landing-stats-title">Klein erzählt. Groß gemeint.</h2>
      </Reveal>
      <div className="startseiten-kennzahlen__grid">
        {stats.map((item, index) => (
          <StatCard
            key={`${item.end}-${item.label}`}
            end={item.end}
            decimals={item.decimals}
            suffix={item.suffix}
            label={item.label}
            text={item.text}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}

function LandingClassics() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragStateRef = useRef({
    ziehtGerade: false,
    bewegt: false,
    pointerId: -1,
    scrollLinks: 0,
    startX: 0
  });

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    // Auf Touchgeräten übernimmt der Browser das native horizontale Scrollen –
    // das Ziehen per Pointer ist nur für die Maus gedacht.
    if (event.pointerType !== "mouse") {
      return;
    }

    if (event.button !== 0) {
      return;
    }

    const scrollElement = scrollRef.current;

    if (!scrollElement) {
      return;
    }

    dragStateRef.current = {
      ziehtGerade: true,
      bewegt: false,
      pointerId: event.pointerId,
      scrollLinks: scrollElement.scrollLeft,
      startX: event.clientX
    };

    scrollElement.setPointerCapture(event.pointerId);
    scrollElement.classList.add("wird-gezogen");
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const scrollElement = scrollRef.current;
    const dragState = dragStateRef.current;

    if (!scrollElement || !dragState.ziehtGerade) {
      return;
    }

    const ziehWeg = event.clientX - dragState.startX;

    if (Math.abs(ziehWeg) > 4) {
      dragState.bewegt = true;
      event.preventDefault();
    }

    scrollElement.scrollLeft = dragState.scrollLinks - ziehWeg;
  }

  function stopDragging(event: PointerEvent<HTMLDivElement>) {
    const scrollElement = scrollRef.current;
    const dragState = dragStateRef.current;

    if (!scrollElement || !dragState.ziehtGerade) {
      return;
    }

    dragState.ziehtGerade = false;

    if (scrollElement.hasPointerCapture(event.pointerId)) {
      scrollElement.releasePointerCapture(event.pointerId);
    }

    scrollElement.classList.remove("wird-gezogen");
  }

  function handleClickCapture(event: MouseEvent<HTMLDivElement>) {
    if (!dragStateRef.current.bewegt) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    dragStateRef.current.bewegt = false;
  }

  return (
    <section className="startseiten-klassiker" id="klassiker" aria-labelledby="landing-classics-title">
      <Reveal className="startseiten-abschnittsueberschrift">
        <p className="startseite-ueberzeile">Biersortiment</p>
        <h2 id="landing-classics-title">Unsere Klassiker</h2>
      </Reveal>
      <div className="startseiten-klassiker__sichtbereich">
        <div
          className="startseiten-klassiker__scrollbereich"
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
              className="startseiten-klassiker-karte"
              href="/shop"
              key={produkt.title}
              initial={{ opacity: 0, y: 38 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={revealViewport}
              transition={{ ...revealTransition, delay: index * 0.05 }}
            >
              <img src={`/assets/images_converted/${produkt.image}`} alt={produkt.title} />
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
    <section className="startseiten-werte" aria-labelledby="landing-values-title">
      <Reveal className="startseiten-abschnittsueberschrift">
        <p className="startseite-ueberzeile">Was uns wichtig ist</p>
        <h2 id="landing-values-title">Echte Werte.</h2>
        <p>Unsere Werte sind keine Dekoration. Sie bestimmen, wie wir einkaufen, brauen, feiern und Zukunft denken.</p>
      </Reveal>
      <div className="startseiten-werte__liste">
        {werte.map((wert, index) => (
          <FlipCard
            key={wert.title}
            index={index}
            front={
              <>
                <img src={`/assets/images_converted/${wert.image}`} alt={wert.alt} width="46" height="46" />
                <h3>{wert.title}</h3>
              </>
            }
            back={<p>{wert.text}</p>}
          />
        ))}
      </div>
    </section>
  );
}

function LandingFinalCta() {
  return (
    <section className="startseiten-abschluss" aria-labelledby="landing-final-title">
      <Reveal>
        <p className="startseite-ueberzeile">Hellensteiner erleben</p>
        <h2 id="landing-final-title" className="nur-screenreader">Bier-Zitat der Stunde</h2>
        <BeerQuote />
        <div className="startseiten-abschluss__aktionen">
          <Button as="a" href="/shop">Zum Shop</Button>
          <Button as="a" href="/freunde-club">Freunde Club</Button>
          <Button as="a" href="/biergarten">Biergarten ansehen</Button>
        </div>
      </Reveal>
    </section>
  );
}

export function LandingPage() {
  return (
    <>
      <Altersabfrage />
      <main className="startseite">
        <LandingHero />
        <LandingStats />
        <ValuesStory />
        <LandingClassics />
        <LandingFinalCta />
      </main>
      <TrikotFloatingCard />
    </>
  );
}
