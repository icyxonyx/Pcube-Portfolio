"use client"

import { motion } from "framer-motion"
import type React from "react"

interface StaggerContainerProps {
  children: React.ReactNode
  staggerDelay?: number
  className?: string
}

export default function StaggerContainer({ children, staggerDelay = 0.1, className = "" }: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
