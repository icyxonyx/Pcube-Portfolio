"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { ImageIcon } from "lucide-react";
import UnifiedParticleSystem from "@/components/unified-particle-system";
import FadeInSection from "@/components/fade-in-section";

interface HeroSectionProps {
  sectionIndex: number;
}

export default function HeroSection({ sectionIndex }: HeroSectionProps) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-white via-green-50/30 to-[#86D17B]/10 dark:from-gray-900 dark:via-gray-800 dark:to-green-900/20 transition-all duration-700"
    >
      <UnifiedParticleSystem
        particleCount={50}
        colors={["#86D17B", "#65a85f", "#a3e635", "#84cc16", "#f8fafc"]}
        types={["circle", "square", "triangle"]}
        enableMouseInteraction={true}
        enableParallax={true}
        density="medium"
        theme="colorful"
      />

      <motion.div
        style={{ y: backgroundY }}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 pointer-events-none"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.05, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-[40rem] font-bold text-[#86D17B] dark:text-green-400/20 select-none transition-all duration-700"
        >
          01
        </motion.div>
      </motion.div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 grid md:grid-cols-2 gap-8 items-center">
        {/* Image Section - Left Column */}
        <motion.div
          style={{ y: imageY }}
          className="flex justify-center md:justify-end order-2 md:order-1"
        >
          <div className="relative">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-[#86D17B]/20 via-[#86D17B]/30 to-[#86D17B]/40 dark:from-[#86d17b]/30 dark:via-[#86d17b]/40 dark:to-[#86d17b]/50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700"
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="relative z-10"
            >
              <div className="avatar">
                <Image
                  src="/images/hero.png" // adjust path or use a remote URL
                  alt="Profile"
                  fill // makes Image fill the parent div
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Text Section - Right Column */}
        <motion.div
          style={{ y: textY }}
          className="order-1 md:order-2 mt-20 md:mt-0"
        >
          <FadeInSection delay={0.4} direction="up">
            <div className="text-sm uppercase tracking-wider text-[#86D17B] dark:text-green-400 mb-2 transition-colors duration-700">
              01
            </div>
          </FadeInSection>
          <FadeInSection delay={0.6} direction="up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-[#86D17B] to-[#65a85f] dark:from-white dark:via-green-300 dark:to-[#86D17B] bg-clip-text text-transparent transition-all duration-700">
              Pankaj Pandey
            </h1>
          </FadeInSection>
          <FadeInSection delay={0.8} direction="up">
            <p className="text-xl text-gray-700 dark:text-gray-200 mb-6 max-w-md font-medium transition-colors duration-700">
              Full Stack Developer & AI/ML Specialist
            </p>
          </FadeInSection>
          <FadeInSection delay={1.0} direction="up">
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md leading-relaxed transition-colors duration-700">
              Passionate developer specializing in MERN stack, AI/ML
              implementations, and cloud computing solutions. Expert in
              performance optimization and building scalable applications with
              cutting-edge technologies.
            </p>
          </FadeInSection>
          <FadeInSection delay={1.2} direction="up">
            <p className="text-base text-gray-500 dark:text-gray-400 max-w-md leading-relaxed transition-colors duration-700 mt-4">
              Based in India • Available for innovative projects and
              collaborations
            </p>
          </FadeInSection>
        </motion.div>
      </div>
    </div>
  );
}
