"use client";

import { motion, Variants } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  from?: "up" | "down" | "left" | "right";
  delay?: number; // seconds (framer uses seconds, not ms)
  duration?: number;
  amount?: number; // 0–1 viewport threshold
}

const directionOffset = { up: 40, down: -40, left: 40, right: -40 };

export default function Reveal({
  children,
  className = "",
  from = "up",
  delay = 0,
  duration = 0.6,
  amount = 0.15,
}: RevealProps) {
  const isHorizontal = from === "left" || from === "right";

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: isHorizontal ? directionOffset[from] : 0,
      y: !isHorizontal ? directionOffset[from] : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
}
