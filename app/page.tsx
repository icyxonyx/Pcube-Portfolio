"use client";

import { useState } from "react";
import { useRef, useEffect } from "react";
import { useScroll, useSpring } from "framer-motion";
import AnimatedSidebar from "@/components/animated-sidebar";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import SkillsSection from "@/components/skills-section";
import CertificationsSection from "@/components/certifications-section";
import ProjectsSection from "@/components/projects-section";
import ContactSection from "@/components/contact-section";
import ScrollProgress from "@/components/scroll-progress";
import SectionTransition from "@/components/section-transition";
import ThemeToggle from "@/components/theme-toggle";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const sections = [
    { id: "hero", component: HeroSection, title: "Home" },
    { id: "about", component: AboutSection, title: "About" },
    { id: "skills", component: SkillsSection, title: "Skills" },
    {
      id: "certifications",
      component: CertificationsSection,
      title: "Certifications",
    },
    { id: "projects", component: ProjectsSection, title: "Projects" },
    { id: "contact", component: ContactSection, title: "Contact" },
  ];

  // Section intersection observer with improved thresholds
  useEffect(() => {
    const observers = sections.map((section, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(index);
          }
        },
        {
          threshold: 0.3,
          rootMargin: "-104px 0px 0px 0px",
        }
      );

      const element = document.getElementById(section.id);
      if (element) observer.observe(element);

      return observer;
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 transition-all duration-700 overflow-x-hidden">
      <AnimatedSidebar activeSection={activeSection} sections={sections} />
      <ThemeToggle />

      {/* Main Content with proper spacing for sidebar */}
      <div className="md:ml-64 lg:ml-72 relative">
        <ScrollProgress progress={smoothProgress} />

        <div ref={containerRef} className="relative">
          {sections.map((section, index) => {
            const Component = section.component;
            return (
              <SectionTransition
                key={section.id}
                id={section.id}
                index={index}
                isActive={activeSection === index}
              >
                <Component sectionIndex={index} />
              </SectionTransition>
            );
          })}
        </div>
      </div>
    </main>
  );
}
