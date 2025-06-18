"use client"

import { useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import FadeInSection from "@/components/fade-in-section"
import InteractiveSkillTree from "@/components/interactive-skill-tree"

interface SkillsSectionProps {
  sectionIndex: number
}

export default function SkillsSection({ sectionIndex }: SkillsSectionProps) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -200])

  return (
    <div ref={containerRef} className="relative min-h-screen w-full overflow-hidden">
      {/* Minimal title overlay - moved to bottom left */}
      <div className="absolute bottom-6 left-6 z-10">
        <FadeInSection delay={0.2}>
          <div className="text-xs uppercase tracking-wider text-white/60 mb-1">03 • Skills</div>
        </FadeInSection>
        <FadeInSection delay={0.4}>
          <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">Interactive Skill Tree</h2>
        </FadeInSection>
      </div>

      {/* Full-screen skill tree */}
      <div className="absolute inset-0 w-full h-full">
        <InteractiveSkillTree />
      </div>
    </div>
  )
}
