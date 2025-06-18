"use client";

import { motion, useMotionValue, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

type CursorShape = "triangle" | "square" | "hexagon";

interface GeometricCursorProps {
  className?: string;
}

export default function GeometricCursor({
  className = "",
}: GeometricCursorProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentShape, setCurrentShape] = useState<CursorShape>("triangle");

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const tagName = target.tagName.toLowerCase();

      if (
        tagName === "button" ||
        target.role === "button" ||
        tagName === "input" ||
        tagName === "textarea"
      ) {
        setCurrentShape("square");
      } else if (
        tagName === "a" ||
        target.closest("a") ||
        target.onclick !== null
      ) {
        setCurrentShape("triangle");
      } else {
        setCurrentShape("hexagon");
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mousemove", handleElementHover);
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mousemove", handleElementHover);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  const renderShape = () => {
    const size = 20;
    const color = "#86D17B";

    switch (currentShape) {
      case "triangle":
        return (
          <motion.div
            className="absolute pointer-events-none"
            style={{
              width: 0,
              height: 0,
              borderLeft: `${size / 2}px solid transparent`,
              borderRight: `${size / 2}px solid transparent`,
              borderBottom: `${size}px solid ${color}`,
              left: -size / 2,
              top: -size / 2,
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        );

      case "square":
        return (
          <motion.div
            className="absolute pointer-events-none border-2"
            style={{
              width: size,
              height: size,
              borderColor: color,
              left: -size / 2,
              top: -size / 2,
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        );

      case "hexagon":
        return (
          <motion.svg
            className="absolute pointer-events-none"
            width={size}
            height={size}
            style={{
              left: -size / 2,
              top: -size / 2,
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            <polygon
              points={`${size / 2},2 ${size - 2},${size / 4} ${size - 2},${
                (3 * size) / 4
              } ${size / 2},${size - 2} 2,${(3 * size) / 4} 2,${size / 4}`}
              fill="none"
              stroke={color}
              strokeWidth="2"
            />
          </motion.svg>
        );

      default:
        return null;
    }
  };

  if (typeof window === "undefined") return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed top-0 left-0 z-[9999] pointer-events-none ${className}`}
          style={{ x: mouseX, y: mouseY }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.2 }}
        >
          {renderShape()}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
