"use client"

import { memo } from "react"
import { Handle, Position, type NodeProps } from "reactflow"
import { motion } from "framer-motion"

function SkillNode({ data, isConnectable, selected }: NodeProps) {
  // Determine size based on skill level and size property
  const getSizeConfig = () => {
    switch (data.size) {
      case "large":
        return { size: 120, fontSize: "text-sm", padding: "p-4" }
      case "medium":
        return { size: 90, fontSize: "text-xs", padding: "p-3" }
      case "small":
        return { size: 70, fontSize: "text-xs", padding: "p-2" }
      default:
        return { size: 90, fontSize: "text-xs", padding: "p-3" }
    }
  }

  const { size, fontSize, padding } = getSizeConfig()

  // Determine glow color based on category
  const getCategoryGlow = (category: string) => {
    switch (category) {
      case "languages":
        return "#f59e0b"
      case "frontend":
        return "#60a5fa"
      case "backend":
        return "#10b981"
      case "ai":
        return "#86D17B"
      case "cloud":
        return "#a78bfa"
      case "data":
        return "#f97316"
      case "optimization":
        return "#65a85f"
      case "security":
        return "#ef4444"
      default:
        return "#86D17B"
    }
  }

  const glowColor = getCategoryGlow(data.category)

  // Skill level indicator with accessible labels
  const getSkillLevelBorder = (level: number) => {
    if (level >= 5) return "border-4 border-green-400"
    if (level >= 4) return "border-3 border-blue-400"
    if (level >= 3) return "border-2 border-yellow-400"
    return "border border-gray-400"
  }

  // Get proficiency label
  const getProficiencyLabel = (level: number) => {
    const labels = ["", "Familiar", "Learning", "Intermediate", "Proficient", "Expert"]
    return labels[level] || "Unknown"
  }

  return (
    <motion.div
      className={`
        relative rounded-full flex items-center justify-center overflow-hidden
        ${getSkillLevelBorder(data.level)}
        transition-all duration-300 cursor-pointer group
      `}
      style={{
        width: size,
        height: size,
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${data.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        boxShadow: selected
          ? `0 0 30px ${glowColor}, 0 0 60px ${glowColor}40, inset 0 0 20px rgba(0,0,0,0.3)`
          : `0 0 15px ${glowColor}40, inset 0 0 20px rgba(0,0,0,0.3)`,
      }}
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.95 }}
      animate={
        selected
          ? {
              scale: [1, 1.05, 1],
              transition: { duration: 0.5, repeat: Number.POSITIVE_INFINITY },
            }
          : {}
      }
    >
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="w-2 h-2 bg-white/50 border-none opacity-0 group-hover:opacity-100 transition-opacity"
      />

      {/* Skill level indicator dots */}
      <div className="absolute top-2 right-2 flex gap-1">
        {Array.from({ length: data.level }).map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-white shadow-lg"
            style={{
              backgroundColor: glowColor,
              boxShadow: `0 0 4px ${glowColor}`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className={`${padding} text-center relative z-10`}>
        <div className={`${fontSize} font-bold text-white drop-shadow-lg text-center leading-tight`}>{data.label}</div>

        {/* Proficiency level indicator */}
        <div className="text-xs text-white/80 mt-1 font-medium">{getProficiencyLabel(data.level)}</div>
      </div>

      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(to top, ${glowColor}20, transparent)`,
        }}
      />

      {/* Pulsing ring for high-level skills */}
      {data.level >= 4 && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 opacity-60"
          style={{ borderColor: glowColor }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 0.2, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      )}

      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="w-2 h-2 bg-white/50 border-none opacity-0 group-hover:opacity-100 transition-opacity"
      />
    </motion.div>
  )
}

export default memo(SkillNode)
