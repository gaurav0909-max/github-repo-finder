"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import { fadeInUp, fadeInLeft, fadeInRight, defaultViewport } from "@/lib/constants/animation-variants";

interface FadeInWrapperProps {
  children: ReactNode;
  direction?: "up" | "left" | "right";
  delay?: number;
  className?: string;
}

export default function FadeInWrapper({
  children,
  direction = "up",
  delay = 0,
  className,
}: FadeInWrapperProps) {
  const prefersReducedMotion = useReducedMotion();

  // Select animation variant based on direction
  const variants = {
    up: fadeInUp,
    left: fadeInLeft,
    right: fadeInRight,
  }[direction];

  // If user prefers reduced motion, don't animate
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={defaultViewport}
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
