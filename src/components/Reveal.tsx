import { motion } from "motion/react";
import type { ReactNode } from "react";

export const revealTransition = { duration: 0.7, ease: "easeOut" } as const;
export const revealViewport = { once: true, amount: 0.28 } as const;

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
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
