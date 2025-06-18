"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import UnifiedParticleSystem from "@/components/unified-particle-system"
import FadeInSection from "@/components/fade-in-section"
import StaggerContainer from "@/components/stagger-container"
import StaggerItem from "@/components/stagger-item"

interface AboutSectionProps {
  sectionIndex: number
}

export default function AboutSection({ sectionIndex }: AboutSectionProps) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -200])

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-green-50/50 via-[#86D17B]/8 to-emerald-50/50 dark:from-gray-900 dark:via-green-900/15 dark:to-gray-800 transition-all duration-700"
    >
      <UnifiedParticleSystem
        particleCount={40}
        colors={["#86D17B", "#65a85f", "#a3e635", "#84cc16", "#22c55e"]}
        types={["circle", "square", "line"]}
        enableMouseInteraction={true}
        enableParallax={true}
        density="low"
        theme="colorful"
      />

      <motion.div
        style={{ y: backgroundY }}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 pointer-events-none"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.05, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-[40rem] font-bold text-[#86D17B]/10 dark:text-green-400/10 select-none transition-all duration-700"
        >
          02
        </motion.div>
      </motion.div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          <FadeInSection delay={0.2}>
            <div className="text-sm uppercase tracking-wider text-[#86D17B] dark:text-green-400 mb-2 transition-colors duration-700">
              02
            </div>
          </FadeInSection>
          <FadeInSection delay={0.4}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-12 bg-gradient-to-r from-gray-900 via-[#86D17B] to-[#65a85f] dark:from-white dark:via-green-300 dark:to-[#86D17B] bg-clip-text text-transparent transition-all duration-700">
              About Me
            </h2>
          </FadeInSection>

          <div className="grid md:grid-cols-1 gap-12 items-center">
            <div>
              <StaggerContainer staggerDelay={0.2}>
                <StaggerItem>
                  <p className="text-lg text-gray-700 dark:text-gray-200 mb-6 leading-relaxed font-medium transition-colors duration-700">
                    I'm a passionate Full Stack Developer and Cloud Computing Specialist with expertise spanning across
                    modern web technologies, artificial intelligence, and cloud infrastructure. I have a particular
                    focus on performance optimization and resource-efficient solutions that deliver real-world impact.
                  </p>
                </StaggerItem>
                <StaggerItem>
                  <p className="text-lg text-gray-700 dark:text-gray-200 mb-6 leading-relaxed font-medium transition-colors duration-700">
                    With proficiency in Python, JavaScript, and modern frameworks like React and Next.js, I specialize
                    in building scalable applications that leverage AI/ML capabilities. My recent work includes
                    developing advanced media sorting systems using multimodal AI models (CLIP/BLIP) and implementing
                    GPU optimization techniques for resource-constrained environments.
                  </p>
                </StaggerItem>
                <StaggerItem>
                  <p className="text-lg text-gray-700 dark:text-gray-200 mb-6 leading-relaxed font-medium transition-colors duration-700">
                    I hold multiple industry certifications including AWS Cloud Practitioner, Microsoft MTA in
                    Networking and Cloud Fundamentals, and specialized training in Web Development and Ethical Hacking.
                    My technical foundation is complemented by strong problem-solving skills and a commitment to writing
                    clean, efficient code.
                  </p>
                </StaggerItem>
                <StaggerItem>
                  <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed font-medium transition-colors duration-700">
                    I'm driven by the challenge of creating innovative solutions that bridge the gap between
                    cutting-edge technology and practical applications. I thrive in collaborative environments where I
                    can contribute to meaningful projects while continuously expanding my technical expertise.
                  </p>
                </StaggerItem>
              </StaggerContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
