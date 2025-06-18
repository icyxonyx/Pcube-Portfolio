"use client";

import { motion, type MotionValue } from "framer-motion";

interface ScrollProgressProps {
  progress: MotionValue<number>;
}

export default function ScrollProgress({ progress }: ScrollProgressProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200 dark:bg-gray-700 transition-colors duration-500">
      <motion.div
        className="h-full bg-gradient-to-r from-[#86D17B] to-[#65a85f] shadow-lg"
        style={{ scaleX: progress, originX: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 40 }}
      />
    </div>
  );
}
