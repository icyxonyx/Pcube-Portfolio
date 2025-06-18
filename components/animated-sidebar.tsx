"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Linkedin, Github, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import RotatingCube from "./rotating-cube";
import Link from "next/link";

interface Section {
  id: string;
  title: string;
}

interface AnimatedSidebarProps {
  activeSection: number;
  sections: Section[];
}

export default function AnimatedSidebar({
  activeSection,
  sections,
}: AnimatedSidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [sidebarHeight, setSidebarHeight] = useState(0);

  const { scrollY } = useScroll();
  const sidebarY = useTransform(scrollY, [0, 200], [0, 0]);

  useEffect(() => {
    const updateSidebarHeight = () => {
      setSidebarHeight(window.innerHeight);
    };

    updateSidebarHeight();
    window.addEventListener("resize", updateSidebarHeight);
    return () => window.removeEventListener("resize", updateSidebarHeight);
  }, []);

  const scrollToSectionn = (sectionId: string) => {
    scrollToSection(sectionId);
    setTimeout(() => {
      scrollToSection(sectionId);
    }, 400);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        style={{ y: sidebarY }}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="hidden md:flex md:w-64 lg:w-72 fixed left-0 top-0 h-screen bg-white/98 dark:bg-gray-900/98 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-700/50 shadow-2xl z-40 flex-col transition-all duration-700"
      >
        {/* Sidebar Header */}
        <div className="flex-shrink-0 p-6 border-b border-gray-100/50 dark:border-gray-700/50 transition-all duration-700">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl font-bold bg-gradient-to-r from-[#86D17B] to-[#65a85f] bg-clip-text text-transparent flex items-center"
          >
            <Link href={"#"} passHref>
              <span>P</span>
              <span className="font-mono">CUBE</span>
              <RotatingCube size="small" className="ml-1" />
            </Link>
          </motion.h1>
        </div>

        {/* Scrollable Navigation */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <nav className="p-6">
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.3,
                  },
                },
              }}
              className="space-y-2"
            >
              {sections.map((section, index) => (
                <motion.li
                  key={section.id}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: {
                        duration: 0.5,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      },
                    },
                  }}
                  className="relative"
                >
                  <motion.button
                    onClick={() => scrollToSectionn(section.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-500 relative overflow-hidden group ${
                      activeSection === index
                        ? "bg-gradient-to-r from-[#86D17B] to-[#65a85f] text-white shadow-lg"
                        : "hover:bg-gray-50 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Background animation for non-active items */}
                    {activeSection !== index && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-[#86D17B]/10 to-[#65a85f]/10 opacity-0 group-hover:opacity-100 transition-all duration-500"
                        initial={false}
                      />
                    )}

                    <div className="relative flex items-center justify-between">
                      <span className="font-medium">{section.title}</span>
                      <motion.div
                        animate={{
                          x: activeSection === index ? 5 : 0,
                          opacity: activeSection === index ? 1 : 0.5,
                        }}
                        transition={{ duration: 0.3 }}
                        className="text-xs bg-black/10 dark:bg-white/10 px-2 py-1 rounded-full"
                      >
                        0{index + 1}
                      </motion.div>
                    </div>

                    {/* Active indicator */}
                    {activeSection === index && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                  </motion.button>
                </motion.li>
              ))}
            </motion.ul>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex-shrink-0 p-6 border-t border-gray-100/50 dark:border-gray-700/50 bg-gradient-to-t from-gray-50/50 dark:from-gray-800/50 to-transparent transition-all duration-700"
        >
          <div className="mb-4">
            <motion.a
              href="mailto:p2pp007@gmail.com"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#86D17B] dark:hover:text-[#86D17B] transition-all duration-300 font-medium"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              p2pp007@gmail.com
            </motion.a>
          </div>

          <motion.div
            className="flex space-x-3"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.9,
                },
              },
            }}
          >
            {[
              {
                Icon: Linkedin,
                color: "hover:text-blue-600 dark:hover:text-blue-400",
                url: "https://www.linkedin.com/in/icyxonyx",
              },
              {
                Icon: Github,
                color: "hover:text-gray-800 dark:hover:text-gray-300",
                url: "https://www.github.com/icyxonyx",
              },
            ].map(({ Icon, color, url }, index) => (
              <motion.a
                key={index}
                href={url}
                target="_blank"
                variants={{
                  hidden: { opacity: 0, scale: 0 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: {
                      duration: 0.3,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    },
                  },
                }}
                whileHover={{
                  scale: 1.2,
                  rotate: 5,
                  y: -2,
                }}
                whileTap={{ scale: 0.9 }}
                className={`w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center text-gray-600 dark:text-gray-400 ${color} transition-all duration-500 hover:shadow-lg border border-gray-200/50 dark:border-gray-700/50`}
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </motion.aside>

      {/* Mobile Menu Button */}
      <motion.button
        onClick={toggleMobileMenu}
        className="md:hidden fixed top-6 left-6 z-50 w-12 h-12 bg-white/98 dark:bg-gray-800/98 backdrop-blur-xl rounded-full shadow-lg flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <motion.div
          animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </motion.div>
      </motion.button>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={{ opacity: 0, x: "-100%" }}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          x: isMobileMenuOpen ? "0%" : "-100%",
        }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="md:hidden fixed inset-0 z-40 bg-white/98 dark:bg-gray-900/98 backdrop-blur-xl transition-all duration-700"
      >
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div className="flex-shrink-0 p-6 pt-20">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{
                opacity: isMobileMenuOpen ? 1 : 0,
                y: isMobileMenuOpen ? 0 : -20,
              }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="text-3xl font-bold bg-gradient-to-r from-[#86D17B] to-[#65a85f] bg-clip-text text-transparent flex items-center"
            >
              <span>P</span>
              <span className="font-mono">CUBE</span>
              <RotatingCube size="small" className="ml-1" />
            </motion.h1>
          </div>

          {/* Mobile Navigation */}
          <div className="flex-1 overflow-y-auto px-6">
            <motion.ul
              initial="hidden"
              animate={isMobileMenuOpen ? "visible" : "hidden"}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.2,
                  },
                },
              }}
              className="space-y-3"
            >
              {sections.map((section, index) => (
                <motion.li
                  key={section.id}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: {
                        duration: 0.3,
                      },
                    },
                  }}
                >
                  <motion.button
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-6 py-4 rounded-xl transition-all duration-300 ${
                      activeSection === index
                        ? "bg-gradient-to-r from-[#86D17B] to-[#65a85f] text-white shadow-lg"
                        : "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-medium">
                        {section.title}
                      </span>
                      <span className="text-sm opacity-70">0{index + 1}</span>
                    </div>
                  </motion.button>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Mobile Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isMobileMenuOpen ? 1 : 0,
              y: isMobileMenuOpen ? 0 : 20,
            }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="flex-shrink-0 p-6 border-t border-gray-100 dark:border-gray-700 transition-all duration-700"
          >
            <div className="mb-4">
              <a
                href="mailto:p2pp007@gmail.com"
                className="text-gray-600 dark:text-gray-400 hover:text-[#86D17B] dark:hover:text-[#86D17B] transition-all duration-300 font-medium"
              >
                p2pp007@gmail.com
              </a>
            </div>

            <div className="flex space-x-4">
              {[Linkedin, Github].map((Icon, index) => (
                <motion.a
                  key={index}
                  href={
                    index === 0
                      ? "https://www.linkedin.com/in/icyxonyx"
                      : "https://www.github.com/icyxonyx"
                  }
                  target="_blank"
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
