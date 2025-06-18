"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useEffect, useRef, useState, useMemo } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  direction: number;
  rotation: number;
  type: "circle" | "square" | "triangle" | "line";
  color: string;
  parallaxSpeed: number;
}

interface UnifiedParticleSystemProps {
  particleCount?: number;
  className?: string;
  colors?: string[];
  types?: ("circle" | "square" | "triangle" | "line")[];
  enableMouseInteraction?: boolean;
  enableParallax?: boolean;
  enableTrails?: boolean;
  enableConnections?: boolean;
  connectionDistance?: number;
  density?: "low" | "medium" | "high";
  theme?: "monochrome" | "colorful";
}

export default function UnifiedParticleSystem({
  particleCount = 30,
  className = "",
  colors = ["#86D17B", "#65a85f", "#a3e635", "#84cc16", "#22c55e"],
  types = ["circle", "square", "triangle", "line"],
  enableMouseInteraction = true,
  enableParallax = true,
  enableTrails = false,
  enableConnections = false,
  connectionDistance = 100,
  density = "medium",
  theme = "colorful",
}: UnifiedParticleSystemProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isInitialized, setIsInitialized] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 200 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 200 });

  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  // Memoize configuration values to prevent re-renders
  const config = useMemo(() => {
    const densityMap = {
      low: Math.max(15, Math.floor(particleCount * 0.5)),
      medium: particleCount,
      high: Math.floor(particleCount * 1.5),
    };

    const colorSchemes = {
      monochrome: ["#f3f4f6", "#e5e7eb", "#d1d5db", "#9ca3af"],
      colorful: colors,
    };

    return {
      finalParticleCount: densityMap[density],
      finalColors: colorSchemes[theme],
    };
  }, [particleCount, density, theme, colors]);

  // Memoize static particles that don't change
  const staticParticles = useMemo(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return [];

    return Array.from({ length: config.finalParticleCount }, (_, i) => ({
      id: i,
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      size: Math.random() * 4 + 1,
      opacity: Math.random() * 0.6 + 0.1,
      speed: Math.random() * 0.5 + 0.1,
      direction: Math.random() * Math.PI * 2,
      rotation: Math.random() * 360,
      type: types[Math.floor(Math.random() * types.length)] as
        | "circle"
        | "square"
        | "triangle"
        | "line",
      color:
        config.finalColors[
          Math.floor(Math.random() * config.finalColors.length)
        ],
      parallaxSpeed: Math.random() * 0.5 + 0.1,
    }));
  }, [
    dimensions.width,
    dimensions.height,
    config.finalParticleCount,
    config.finalColors,
    types,
  ]);

  // Handle dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    // Set initialized after first dimension update
    const timer = setTimeout(() => setIsInitialized(true), 100);

    return () => {
      window.removeEventListener("resize", updateDimensions);
      clearTimeout(timer);
    };
  }, []);

  // Mouse interaction
  useEffect(() => {
    if (!enableMouseInteraction) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [enableMouseInteraction, mouseX, mouseY]);

  const getConnections = () => {
    if (!enableConnections || staticParticles.length === 0) return [];

    const connections: { from: Particle; to: Particle; distance: number }[] =
      [];

    for (let i = 0; i < staticParticles.length; i++) {
      for (let j = i + 1; j < staticParticles.length; j++) {
        const dx = staticParticles[i].x - staticParticles[j].x;
        const dy = staticParticles[i].y - staticParticles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          connections.push({
            from: staticParticles[i],
            to: staticParticles[j],
            distance,
          });
        }
      }
    }

    return connections;
  };

  const renderParticle = (particle: Particle, index: number) => {
    const baseDelay = index * 0.1;

    switch (particle.type) {
      case "circle":
        return (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              opacity: particle.opacity,
            }}
            initial={{
              x: particle.x,
              y: particle.y,
              scale: 0,
            }}
            animate={{
              x: [
                particle.x,
                particle.x + Math.cos(particle.direction) * 50,
                particle.x + Math.cos(particle.direction + Math.PI) * 50,
                particle.x,
              ],
              y: [
                particle.y,
                particle.y + Math.sin(particle.direction) * 30,
                particle.y + Math.sin(particle.direction + Math.PI) * 30,
                particle.y,
              ],
              scale: [0, 1, 1.2, 1],
              opacity: [
                0,
                particle.opacity,
                particle.opacity * 1.5,
                particle.opacity,
              ],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: baseDelay,
            }}
          />
        );

      case "square":
        return (
          <motion.div
            key={particle.id}
            className="absolute"
            style={{
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              opacity: particle.opacity,
            }}
            initial={{
              x: particle.x,
              y: particle.y,
              rotate: 0,
              scale: 0,
            }}
            animate={{
              x: [
                particle.x,
                particle.x + Math.cos(particle.direction) * 40,
                particle.x,
              ],
              y: [
                particle.y,
                particle.y + Math.sin(particle.direction) * 40,
                particle.y,
              ],
              rotate: [0, 360],
              scale: [0, 1],
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: baseDelay,
            }}
          />
        );

      case "triangle":
        return (
          <motion.div
            key={particle.id}
            className="absolute"
            style={{
              width: 0,
              height: 0,
              borderLeft: `${particle.size / 2}px solid transparent`,
              borderRight: `${particle.size / 2}px solid transparent`,
              borderBottom: `${particle.size}px solid ${particle.color}`,
              opacity: particle.opacity,
            }}
            initial={{
              x: particle.x,
              y: particle.y,
              rotate: 0,
              scale: 0,
            }}
            animate={{
              x: [
                particle.x,
                particle.x + Math.cos(particle.direction) * 60,
                particle.x,
              ],
              y: [
                particle.y,
                particle.y + Math.sin(particle.direction) * 60,
                particle.y,
              ],
              rotate: [0, 360],
              scale: [0, 1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: baseDelay,
            }}
          />
        );

      case "line":
        return (
          <motion.div
            key={particle.id}
            className="absolute"
            style={{
              width: particle.size * 3,
              height: 1,
              backgroundColor: particle.color,
              opacity: particle.opacity,
            }}
            initial={{
              x: particle.x,
              y: particle.y,
              rotate: particle.rotation,
              scaleX: 0,
            }}
            animate={{
              x: [
                particle.x,
                particle.x + Math.cos(particle.direction) * 30,
                particle.x,
              ],
              y: [
                particle.y,
                particle.y + Math.sin(particle.direction) * 30,
                particle.y,
              ],
              rotate: particle.rotation + 360,
              scaleX: [0, 1, 1.5, 1],
            }}
            transition={{
              duration: 15 + Math.random() * 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: baseDelay,
            }}
          />
        );

      default:
        return null;
    }
  };

  if (!isInitialized || staticParticles.length === 0) {
    return (
      <div
        ref={containerRef}
        className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {/* Render connections */}
      {enableConnections && (
        <svg className="absolute inset-0 w-full h-full">
          {getConnections().map((connection, index) => (
            <motion.line
              key={`connection-${index}`}
              x1={connection.from.x}
              y1={connection.from.y}
              x2={connection.to.x}
              y2={connection.to.y}
              stroke={connection.from.color}
              strokeWidth={1}
              opacity={0.3 * (1 - connection.distance / connectionDistance)}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: 1,
                opacity: 0.3 * (1 - connection.distance / connectionDistance),
              }}
              transition={{ duration: 1, delay: index * 0.1 }}
            />
          ))}
        </svg>
      )}

      {/* Render particles */}
      {staticParticles.map((particle, index) =>
        renderParticle(particle, index)
      )}
    </div>
  );
}
