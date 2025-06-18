"use client"

import { motion } from "framer-motion"

interface RotatingCubeProps {
  size?: "small" | "medium" | "large"
  className?: string
}

export default function RotatingCube({ size = "medium", className = "" }: RotatingCubeProps) {
  const sizeConfig = {
    small: { cubeSize: 16 },
    medium: { cubeSize: 24 },
    large: { cubeSize: 40 },
  }

  const { cubeSize } = sizeConfig[size]

  return (
    <div className={`inline-block ${className}`} style={{ width: cubeSize, height: cubeSize }}>
      <motion.div
        className="relative w-full h-full"
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
        animate={{
          rotateX: [0, 360],
          rotateY: [0, 360],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        {/* Front face */}
        <div
          className="absolute border-2 border-[#86D17B] bg-[#86D17B]/5"
          style={{
            width: cubeSize,
            height: cubeSize,
            transform: `translateZ(${cubeSize / 2}px)`,
          }}
        />

        {/* Back face */}
        <div
          className="absolute border-2 border-[#86D17B] bg-[#86D17B]/5"
          style={{
            width: cubeSize,
            height: cubeSize,
            transform: `translateZ(-${cubeSize / 2}px) rotateY(180deg)`,
          }}
        />

        {/* Right face */}
        <div
          className="absolute border-2 border-[#65a85f] bg-[#65a85f]/5"
          style={{
            width: cubeSize,
            height: cubeSize,
            transform: `rotateY(90deg) translateZ(${cubeSize / 2}px)`,
          }}
        />

        {/* Left face */}
        <div
          className="absolute border-2 border-[#65a85f] bg-[#65a85f]/5"
          style={{
            width: cubeSize,
            height: cubeSize,
            transform: `rotateY(-90deg) translateZ(${cubeSize / 2}px)`,
          }}
        />

        {/* Top face */}
        <div
          className="absolute border-2 border-[#a3e635] bg-[#a3e635]/5"
          style={{
            width: cubeSize,
            height: cubeSize,
            transform: `rotateX(90deg) translateZ(${cubeSize / 2}px)`,
          }}
        />

        {/* Bottom face */}
        <div
          className="absolute border-2 border-[#a3e635] bg-[#a3e635]/5"
          style={{
            width: cubeSize,
            height: cubeSize,
            transform: `rotateX(-90deg) translateZ(${cubeSize / 2}px)`,
          }}
        />
      </motion.div>
    </div>
  )
}
