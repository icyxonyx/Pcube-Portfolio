"use client";

import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, ChevronLeft, ChevronRight, Award } from "lucide-react";
import UnifiedParticleSystem from "@/components/unified-particle-system";
import FadeInSection from "@/components/fade-in-section";

interface CertificationsSectionProps {
  sectionIndex: number;
}

export default function CertificationsSection({
  sectionIndex,
}: CertificationsSectionProps) {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -150]);

  const certifications = [
    {
      id: 1,
      title: "AWS Certified Cloud Practitioner",
      category: "Amazon Web Services",
      image: "/images/cert/ccp.png",
      description:
        "Foundational understanding of AWS Cloud services, architecture, security, and compliance.",
      technologies: ["Cloud", "AWS", "Security", "Architecture"],
      credentialId: "AWS-CCP",
      date: "2024",
      certificateUrl:
        "https://www.credly.com/badges/0641e188-c453-40be-b339-73915c30bb20/public_url",
      featured: true,
    },
    {
      id: 2,
      title: "MTA Networking Fundamentals",
      category: "Microsoft",
      image: "/images/cert/mtanf.png",
      description:
        "Understanding of networking concepts, infrastructure, and configuration.",
      technologies: ["Networking", "Infrastructure", "TCP/IP", "Security"],
      credentialId: "MTA-NF",
      date: "2019",
      certificateUrl:
        "https://www.credly.com/badges/7c72ed75-bc63-4477-b182-32e8fcf87031/public_url",
      featured: false,
    },
    {
      id: 3,
      title: "MTA Cloud Fundamentals",
      category: "Microsoft",
      image: "/images/cert/mtacf.png",
      description:
        "Knowledge of cloud concepts, services, and deployment models.",
      technologies: ["Cloud", "Azure", "IaaS", "PaaS"],
      credentialId: "MTA-CF",
      date: "2019",
      certificateUrl:
        "https://www.credly.com/badges/b6771e73-5b56-4c56-b9c0-6d5e9c08936c/public_url",
      featured: false,
    },
    {
      id: 4,
      title: "Internshala Web Development Training",
      category: "Internshala",
      image: "/images/cert/intt.png",
      description:
        "Comprehensive training in web development technologies and practices.",
      technologies: ["HTML", "CSS", "JavaScript", "PHP"],
      credentialId: "INT-WD",
      date: "2020",
      certificateUrl: "https://trainings.internshala.com/s/v/89156/b5bac876",
      featured: false,
    },
    {
      id: 5,
      title: "Internshala Ethical Hacking Training",
      category: "Internshala",
      image: "/images/cert/intt.png",
      description:
        "Training in ethical hacking methodologies and security practices.",
      technologies: [
        "Security",
        "Penetration Testing",
        "Network Security",
        "VAPT",
      ],
      credentialId: "INT-EH",
      date: "2020",
      certificateUrl: "https://trainings.internshala.com/s/v/89158/c681cd0e",
      featured: false,
    },
  ];

  const maxIndex = Math.max(0, certifications.length - 1);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 3, maxIndex - 2));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 3, 0));
  };

  const getVisibleCertifications = () => {
    return certifications.slice(currentIndex, currentIndex + 3);
  };

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full flex flex-col overflow-hidden bg-gradient-to-br from-green-50/40 via-[#86D17B]/8 to-emerald-50/40 dark:from-gray-900 dark:via-green-900/15 dark:to-gray-800 transition-all duration-700"
    >
      <UnifiedParticleSystem
        particleCount={30}
        enableTrails={true}
        enableConnections={true}
        connectionDistance={100}
        density="medium"
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
          className="text-[40rem] font-bold text-[#86D17B] dark:text-green-400/20 select-none transition-all duration-700"
        >
          03
        </motion.div>
      </motion.div>

      <div className="container mx-auto px-4 md:px-6 lg:px-12 relative z-10 pt-8 md:pt-12 lg:pt-16">
        <div className="text-center mb-8 md:mb-12">
          <FadeInSection delay={0.2}>
            <div className="text-sm uppercase tracking-wider text-[#86D17B] dark:text-green-400 mb-2 transition-colors duration-700">
              03
            </div>
          </FadeInSection>
          <FadeInSection delay={0.4}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-gray-900 via-[#86D17B] to-[#65a85f] dark:from-white dark:via-green-300 dark:to-[#86D17B] bg-clip-text text-transparent transition-all duration-700">
              Certifications
            </h2>
          </FadeInSection>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center relative overflow-hidden">
        <div className="w-full max-w-none relative">
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

          <motion.button
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            className={`absolute right-4 md:right-6 lg:right-8 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
              currentIndex >= maxIndex - 2
                ? "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                : "bg-white/95 dark:bg-gray-800/95 text-gray-700 dark:text-gray-300 hover:bg-[#86D17B] hover:text-white hover:scale-110"
            } backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50`}
            whileHover={currentIndex < maxIndex ? { scale: 1.1 } : {}}
            whileTap={currentIndex < maxIndex ? { scale: 0.9 } : {}}
          >
            <ChevronRight size={20} />
          </motion.button>

          <div className="px-16 md:px-20 lg:px-24 overflow-hidden">
            <div className="relative h-96 md:h-[28rem] lg:h-[32rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="flex space-x-4 md:space-x-6 lg:space-x-8 h-full"
                >
                  {getVisibleCertifications().map((cert, index) => (
                    <motion.div
                      key={cert.id}
                      className="flex-shrink-0 w-80 md:w-96 lg:w-[26rem] group cursor-pointer"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -10, scale: 1.02 }}
                    >
                      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-500 h-full flex flex-col">
                        <div className="relative overflow-hidden flex-shrink-0">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Image
                              src={cert.image || "/placeholder.svg"}
                              alt={cert.title}
                              width={600}
                              height={250}
                              className="w-full h-48 md:h-52 lg:h-56 object-contain"
                            />
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-between p-4 md:p-6"
                          >
                            <div className="text-white">
                              <motion.h3
                                initial={{ y: 20, opacity: 0 }}
                                whileHover={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                                className="text-lg md:text-xl font-bold mb-2"
                              >
                                {cert.title}
                              </motion.h3>
                              <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                whileHover={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.3, delay: 0.2 }}
                                className="text-sm opacity-90"
                              >
                                {cert.category}
                              </motion.p>
                            </div>

                            <div className="flex space-x-2">
                              <motion.a
                                href={cert.certificateUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ scale: 0 }}
                                whileHover={{ scale: 1 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                                className="w-8 h-8 md:w-10 md:h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-[#86D17B] transition-colors duration-200"
                              >
                                <ExternalLink
                                  size={14}
                                  className="md:w-4 md:h-4"
                                />
                              </motion.a>
                            </div>
                          </motion.div>

                          {cert.featured && (
                            <div className="absolute top-3 left-3 md:top-4 md:left-4">
                              <span className="bg-gradient-to-r from-[#86D17B] to-[#65a85f] text-white px-2 py-1 md:px-3 md:py-1 rounded-full text-xs font-medium">
                                Featured
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="p-4 md:p-6 flex-1 flex flex-col">
                          <h3 className="font-bold text-base md:text-lg text-gray-900 dark:text-white mb-2 transition-colors duration-700">
                            {cert.title}
                          </h3>
                          <p className="text-xs md:text-sm text-[#86D17B] dark:text-green-400 font-medium mb-3 transition-colors duration-700">
                            {cert.category} • {cert.date}
                          </p>
                          <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm mb-4 leading-relaxed transition-colors duration-700 flex-1">
                            {cert.description}
                          </p>
                          <div className="flex flex-wrap gap-1 md:gap-2 mb-4">
                            {cert.technologies
                              .slice(0, 5)
                              .map((tech, techIndex) => (
                                <span
                                  key={techIndex}
                                  className="px-2 py-1 md:px-3 md:py-1 bg-green-50 dark:bg-green-900/20 text-[#86D17B] dark:text-green-400 rounded-full text-xs font-medium border border-green-200/50 dark:border-green-700/50 transition-colors duration-700"
                                >
                                  {tech}
                                </span>
                              ))}
                            {cert.technologies.length > 5 && (
                              <span className="px-2 py-1 md:px-3 md:py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs font-medium">
                                +{cert.technologies.length - 5}
                              </span>
                            )}
                          </div>

                          <motion.a
                            href={cert.certificateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#86D17B]/90 to-[#65a85f]/90 hover:from-[#86D17B] hover:to-[#65a85f] text-white py-2 rounded-lg font-medium text-sm transition-all duration-300 shadow-sm hover:shadow-md"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                          >
                            <Award size={16} />
                            <span>View Certificate</span>
                          </motion.a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex justify-center mt-6 md:mt-8 space-x-2">
            {Array.from({ length: maxIndex + 1 }, (_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index
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
