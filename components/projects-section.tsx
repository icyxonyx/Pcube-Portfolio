// File: components/ProjectsSection.tsx
"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Github, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import UnifiedParticleSystem from "@/components/unified-particle-system";
import FadeInSection from "@/components/fade-in-section";

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
}

interface ProjectsSectionProps {
  sectionIndex: number;
}

export default function ProjectsSection({
  sectionIndex,
}: ProjectsSectionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Scroll-based background transform
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const projects: Project[] = [
    {
      id: 1,
      title: "GIVcat-AI",
      category: "Media Sorting",
      image: "/images/project/givcat-ai.png",
      description:
        "A Python-based tool to automatically categorize and organize media files (GIFs, images, videos) into structured output directories using AI-driven content analysis.",
      technologies: [
        "Python",
        "PyTorch",
        "Transformers",
        "HuggingFace Hub",
        "TQDM",
        "NumPy",
        "Pillow",
        "MoviePy",
        "ImageIO",
        "OpenCV",
        "EasyOCR",
        "psutil",
        "regex",
        "ftfy",
        "Accelerate",
        "Windows Batch Script",
      ],
      liveUrl: "https://github.com/icyxonyx/GIVcat-AI",
      githubUrl: "https://github.com/icyxonyx/GIVcat-AI",
      featured: true,
    },
    {
      id: 2,
      title: "Pcube Portfolio",
      category: "Portfolio",
      image: "/images/project/portfolio.png",
      description:
        "A sophisticated, modern portfolio website built with Next.js 15, featuring advanced animations, particle systems, and a fully responsive design.",
      technologies: [
        "Next.js 15",
        "Tailwind CSS",
        "Framer Motion",
        "TypeScript",
        "tsParticles",
      ],
      liveUrl: "https://github.com/icyxonyx/Pcube-Portfolio",
      githubUrl: "https://github.com/icyxonyx/Pcube-Portfolio",
      featured: true,
    },
    {
      id: 3,
      title: "Plan-N-Prep",
      category: "Recipe Management",
      image: "/images/project/plan-n-prep.png",
      description:
        "Comprehensive recipe management application designed to help users organize recipes, plan meals, and manage cooking preparations efficiently.",
      technologies: [
        "JavaScript",
        "DOM Manipulation",
        "CSS Flexbox",
        "Event Handling",
        "Data Persistence",
      ],
      liveUrl: "https://github.com/icyxonyx/Plan-N-Prep",
      githubUrl: "https://github.com/icyxonyx/Plan-N-Prep",
      featured: true,
    },
    {
      id: 4,
      title: "MoneyMap",
      category: "Financial Management",
      image: "/images/project/money-map.png",
      description:
        "Personal finance tracking application with intuitive interface for budget management, expense tracking, and financial goal visualization.",
      technologies: [
        "JavaScript",
        "Local Storage",
        "Chart.js",
        "CSS Grid",
        "Progressive Web App",
      ],
      liveUrl: "https://github.com/icyxonyx/MoneyMap",
      githubUrl: "https://github.com/icyxonyx/MoneyMap",
      featured: true,
    },
    {
      id: 5,
      title: "PCUBE Movies",
      category: "Web Application",
      image: "/images/project/pcube-movies.png",
      description:
        "Interactive movie discovery platform built with JavaScript, featuring dynamic content loading, search functionality, and responsive design.",
      technologies: [
        "JavaScript",
        "HTML5",
        "CSS3",
        "API Integration",
        "Responsive Design",
      ],
      liveUrl: "https://github.com/icyxonyx/PCUBE-Movies",
      githubUrl: "https://github.com/icyxonyx/PCUBE-Movies",
      featured: false,
    },
    {
      id: 6,
      title: "Basic Media Sorter",
      category: "AI/ML & Computer Vision",
      image: "/images/project/basic-media-sorter.png",
      description:
        "Advanced Python-based media organization system using multimodal AI models (CLIP/BLIP) for intelligent file sorting and categorization with GPU optimization.",
      technologies: [
        "Python",
        "PyTorch",
        "CLIP/BLIP",
        "Computer Vision",
        "GPU Optimization",
      ],
      liveUrl: "https://github.com/icyxonyx/Basic-Media-Sorter",
      githubUrl: "https://github.com/icyxonyx/Basic-Media-Sorter",
      featured: false,
    },
    {
      id: 7,
      title: "Basic CRUD Application",
      category: "Full Stack Development",
      image: "/images/project/basic-crud-app.png",
      description:
        "Fundamental CRUD (Create, Read, Update, Delete) application demonstrating core database operations with clean user interface and efficient data management.",
      technologies: [
        "JavaScript",
        "Node.js",
        "Express.js",
        "Database Integration",
        "RESTful API",
      ],
      liveUrl: "https://github.com/icyxonyx/Basic-CRUD",
      githubUrl: "https://github.com/icyxonyx/Basic-CRUD",
      featured: false,
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 3, projects.length - 3));
  };
  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 3, 0));
  };
  const getVisibleProjects = (): Project[] => {
    return projects.slice(currentIndex, currentIndex + 3);
  };

  const handleLinkClick = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    if (url && url !== "#") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  // Framer Motion variants combining entrance and hover overlay
  const cardVariants = {
    initial: { opacity: 0, y: 50 }, // entrance: start hidden below
    animate: { opacity: 1, y: 0 }, // entrance: end at normal
    hover: {}, // no movement on parent itself; overlay handled separately
  };
  const overlayVariants = {
    initial: { opacity: 0 },
    hover: { opacity: 1 },
  };

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full flex flex-col overflow-hidden bg-gradient-to-br from-green-50/40 via-[#86D17B]/8 to-emerald-50/40 dark:from-gray-900 dark:via-green-900/15 dark:to-gray-800 transition-all duration-700"
    >
      {/* Particle background */}
      <UnifiedParticleSystem
        particleCount={35}
        colors={["#86D17B", "#65a85f", "#a3e635", "#84cc16", "#22c55e"]}
        types={["circle", "triangle", "line"]}
        enableMouseInteraction={true}
        enableParallax={true}
        enableTrails={true}
        enableConnections={true}
        connectionDistance={120}
      />

      {/* Large background number */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 pointer-events-none"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.05, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-[20rem] md:text-[25rem] lg:text-[30rem] font-bold text-[#86D17B]/10 dark:text-green-400/10 select-none transition-all duration-700"
        >
          {String(sectionIndex).padStart(2, "0")}
        </motion.div>
      </motion.div>

      {/* Section header */}
      <div className="container mx-auto px-4 md:px-6 lg:px-12 relative z-10 pt-8 md:pt-12 lg:pt-16">
        <div className="text-center mb-8 md:mb-12">
          <FadeInSection delay={0.2}>
            <div className="text-sm uppercase tracking-wider text-[#86D17B] dark:text-green-400 mb-2 transition-colors duration-700">
              {String(sectionIndex).padStart(2, "0")}
            </div>
          </FadeInSection>
          <FadeInSection delay={0.4}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-gray-900 via-[#86D17B] to-[#65a85f] dark:from-white dark:via-green-300 dark:to-[#86D17B] bg-clip-text text-transparent transition-all duration-700">
              My Projects
            </h2>
          </FadeInSection>
        </div>
      </div>

      {/* Slider */}
      <div className="flex-1 flex items-center justify-center relative overflow-hidden">
        <div className="w-full max-w-none relative">
          {/* Prev */}
          <motion.button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`absolute left-4 md:left-6 lg:left-8 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
              currentIndex === 0
                ? "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                : "bg-white/95 dark:bg-gray-800/95 text-gray-700 dark:text-gray-300 hover:bg-[#86D17B] hover:text-white hover:scale-110"
            } backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50`}
            whileHover={currentIndex > 0 ? { scale: 1.1 } : {}}
            whileTap={currentIndex > 0 ? { scale: 0.9 } : {}}
          >
            <ChevronLeft size={20} />
          </motion.button>

          {/* Next */}
          <motion.button
            onClick={nextSlide}
            disabled={currentIndex >= projects.length - 3}
            className={`absolute right-4 md:right-6 lg:right-8 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
              currentIndex >= projects.length - 3
                ? "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                : "bg-white/95 dark:bg-gray-800/95 text-gray-700 dark:text-gray-300 hover:bg-[#86D17B] hover:text-white hover:scale-110"
            } backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50`}
            whileHover={
              currentIndex < projects.length - 3 ? { scale: 1.1 } : {}
            }
            whileTap={currentIndex < projects.length - 3 ? { scale: 0.9 } : {}}
          >
            <ChevronRight size={20} />
          </motion.button>

          {/* Slides container */}
          <div className="px-16 md:px-20 lg:px-24 overflow-hidden">
            <div className="relative h-96 md:h-[28rem] lg:h-[32rem]">
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="flex space-x-4 md:space-x-6 lg:space-x-8 h-full"
                >
                  {getVisibleProjects().map((project, idx) => (
                    <motion.div
                      key={project.id}
                      className="flex-shrink-0 w-80 md:w-96 lg:w-[26rem] cursor-pointer"
                      variants={cardVariants}
                      initial="initial"
                      animate="animate"
                      whileHover="hover"
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                    >
                      <div className="relative overflow-hidden rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-500 h-full flex flex-col bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                        {/* Image */}
                        <div className="relative overflow-hidden">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Image
                              src={project.image}
                              alt={project.title}
                              width={600}
                              height={250}
                              className="w-full h-48 md:h-52 lg:h-56 object-cover"
                              priority={idx === 0}
                            />
                          </motion.div>

                          {/* Overlay layer reveals on hover */}
                          <motion.div
                            variants={overlayVariants}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent
                                       flex items-end justify-between p-4 md:p-6 pointer-events-none"
                          >
                            {/* Title & category */}
                            <div className="text-white">
                              <motion.h3
                                initial={{ y: 20, opacity: 0 }}
                                whileHover={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                                className="text-lg md:text-xl font-bold mb-2"
                              >
                                {project.title}
                              </motion.h3>
                              <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                whileHover={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.3, delay: 0.2 }}
                                className="text-sm opacity-90"
                              >
                                {project.category}
                              </motion.p>
                            </div>

                            {/* Icon buttons */}
                            <div className="flex space-x-2 pointer-events-auto">
                              <motion.button
                                onClick={(e) =>
                                  handleLinkClick(e, project.githubUrl)
                                }
                                initial={{ scale: 1 }}
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.3 }}
                                className="w-8 h-8 md:w-10 md:h-10 bg-white/20 backdrop-blur-sm rounded-full
                                           flex items-center justify-center text-white hover:bg-[#86D17B] transition-colors duration-200"
                              >
                                <Github size={14} className="md:w-4 md:h-4" />
                              </motion.button>
                            </div>
                          </motion.div>

                          {/* Featured badge */}
                          {project.featured && (
                            <div className="absolute top-3 left-3 md:top-4 md:left-4 pointer-events-none">
                              <span className="bg-gradient-to-r from-[#86D17B] to-[#65a85f] text-white px-2 py-1 md:px-3 md:py-1 rounded-full text-xs font-medium">
                                Featured
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Card content */}
                        <div className="p-4 md:p-6 flex-1 flex flex-col">
                          <h3 className="font-bold text-base md:text-lg text-gray-900 dark:text-white mb-2 transition-colors duration-700">
                            {project.title}
                          </h3>
                          <p className="text-xs md:text-sm text-[#86D17B] dark:text-green-400 font-medium mb-3 transition-colors duration-700">
                            {project.category}
                          </p>
                          <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm mb-4 leading-relaxed transition-colors duration-700 flex-1">
                            {project.description}
                          </p>

                          {/* Tech tags */}
                          <div className="flex flex-wrap gap-1 md:gap-2 mt-auto">
                            {project.technologies
                              .slice(0, 5)
                              .map((tech, techIndex) => (
                                <span
                                  key={techIndex}
                                  className="px-2 py-1 md:px-3 md:py-1 bg-green-50 dark:bg-green-900/20 text-[#86D17B] dark:text-green-400 rounded-full text-xs font-medium border border-green-200/50 dark:border-green-700/50 transition-colors duration-700"
                                >
                                  {tech}
                                </span>
                              ))}
                            {project.technologies.length > 5 && (
                              <span className="px-2 py-1 md:px-3 md:py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs font-medium">
                                +{project.technologies.length - 5}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center mt-6 md:mt-8 space-x-2">
            {Array.from({ length: Math.ceil(projects.length) }, (_, idx) => (
              <motion.button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                  currentIndex === idx
                    ? "bg-[#86D17B] scale-125"
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
