import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { revealTransition, revealViewport } from "./Reveal";

export function CountUpNumber({
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
  const sichtbar = useInView(numberRef, { once: true, amount: 0.8 });
  const wenigerBewegung = useReducedMotion();
  const [value, setValue] = useState(wenigerBewegung ? end : 0);

  useEffect(() => {
    if (!sichtbar || wenigerBewegung) {
      if (wenigerBewegung) {
        setValue(end);
      }
      return;
    }

    let frame = 0;
    const dauer = 1100;
    const beginn = performance.now();

    function takt(now: number) {
      const fortschritt = Math.min((now - beginn) / dauer, 1);
      const a = 1 - Math.pow(1 - fortschritt, 3);
      setValue(end * a);

      if (fortschritt < 1) {
        frame = requestAnimationFrame(takt);
      }
    }

    frame = requestAnimationFrame(takt);

    return () => cancelAnimationFrame(frame);
  }, [end, sichtbar, wenigerBewegung]);

  const anzeigeWert = value.toLocaleString("de-DE", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals
  });

  return <span ref={numberRef}>{prefix}{anzeigeWert}{suffix}</span>;
}

export interface StatCardProps {
  end: number;
  label: string;
  text?: string;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  index?: number;
}

export function StatCard({ end, label, text, decimals = 0, suffix = "", prefix = "", index = 0 }: StatCardProps) {
  return (
    <motion.article
      className="startseiten-kennzahl"
      initial={{ opacity: 0, y: 34, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={revealViewport}
      transition={{ ...revealTransition, delay: index * 0.07 }}
    >
      <strong>
        <CountUpNumber end={end} decimals={decimals} suffix={suffix} prefix={prefix} />
      </strong>
      <span>{label}</span>
      {text && <p>{text}</p>}
    </motion.article>
  );
}
