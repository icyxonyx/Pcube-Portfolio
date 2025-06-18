"use client"

import { motion } from "framer-motion"
import type React from "react"

interface StaggerItemProps {
  children: React.ReactNode
  className?: string
}

export default function StaggerItem({ children, className = "" }: StaggerItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
