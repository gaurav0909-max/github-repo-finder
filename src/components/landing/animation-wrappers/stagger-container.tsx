"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import { staggerContainer, staggerItem, defaultViewport } from "@/lib/constants/animation-variants";

interface StaggerContainerProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

export default function StaggerContainer({
  children,
  staggerDelay = 0.1,
  className,
}: StaggerContainerProps) {
  const prefersReducedMotion = useReducedMotion();

  // If user prefers reduced motion, don't animate
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  // Custom stagger container with configurable delay
  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={defaultViewport}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Export reusable stagger item component
export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div variants={staggerItem} className={className}>
      {children}
    </motion.div>
  );
}
