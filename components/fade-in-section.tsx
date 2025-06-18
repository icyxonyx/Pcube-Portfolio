"use client"

import { motion } from "framer-motion"
import type React from "react"

interface FadeInSectionProps {
  children: React.ReactNode
  delay?: number
  direction?: "up" | "down" | "left" | "right"
  className?: string
}

export default function FadeInSection({ children, delay = 0, direction = "up", className = "" }: FadeInSectionProps) {
  const directionOffset = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { y: 0, x: 50 },
    right: { y: 0, x: -50 },
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...directionOffset[direction],
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
      }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
