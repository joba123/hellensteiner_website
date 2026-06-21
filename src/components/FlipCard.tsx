import type { ReactNode } from "react";
import { motion } from "motion/react";
import { revealTransition, revealViewport } from "./Reveal";

export interface FlipCardProps {
  front: ReactNode;
  back: ReactNode;
  index?: number;
}

export function FlipCard({ front, back, index = 0 }: FlipCardProps) {
  return (
    <motion.article
      className="startseiten-wertekarte"
      tabIndex={0}
      initial={{ opacity: 0, x: 36 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={revealViewport}
      transition={{ ...revealTransition, delay: index * 0.04 }}
    >
      <div className="startseiten-wertekarte__innen">
        <div className="startseiten-wertekarte__seite startseiten-wertekarte__vorderseite">{front}</div>
        <div className="startseiten-wertekarte__seite startseiten-wertekarte__rueckseite">{back}</div>
      </div>
    </motion.article>
  );
}
