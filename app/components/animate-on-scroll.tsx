"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "left" | "right" | "up" | "down";

interface AnimateOnScrollProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  bounce?: number;
  className?: string;
}

const offsets: Record<Direction, { x: number; y: number }> = {
  left: { x: -80, y: 0 },
  right: { x: 80, y: 0 },
  up: { x: 0, y: -60 },
  down: { x: 0, y: 60 },
};

export default function AnimateOnScroll({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  bounce = 0.35,
  className,
}: AnimateOnScrollProps) {
  const { x, y } = offsets[direction];

  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        type: "spring",
        bounce,
        duration,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
