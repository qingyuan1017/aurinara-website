import { motion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** stagger delay in seconds */
  delay?: number;
  /** how far it travels up as it fades in */
  y?: number;
  className?: string;
};

/**
 * Scroll-triggered fade + rise. Animates once when it first enters the
 * viewport. Respects the user's reduced-motion preference automatically
 * because framer-motion reads it, and the final state is always visible.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 20,
  className,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
