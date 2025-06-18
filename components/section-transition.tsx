"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type React from "react";

interface SectionTransitionProps {
  children: React.ReactNode;
  id: string;
  index: number;
  isActive: boolean;
}

export default function SectionTransition({
  children,
  id,
  index,
  isActive,
}: SectionTransitionProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [0.95, 1, 1, 0.95]
  );
  const y = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [50, 0, 0, -50]);

  return (
    <motion.section
      ref={ref}
      id={id}
      className="min-h-screen w-full relative"
      style={{
        opacity,
        scale,
        y,
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.2, margin: "-5% 0px -5% 0px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="w-full h-full">{children}</div>
    </motion.section>
  );
}
