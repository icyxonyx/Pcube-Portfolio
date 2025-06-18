"use client";

import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="fixed top-6 right-6 z-50 w-12 h-12 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-500 hover:scale-110"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.5 }}
    >
      <motion.div
        initial={false}
        animate={{
          rotate: isDark ? 180 : 0,
          scale: isDark ? 0.8 : 1,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative"
      >
        {isDark ? (
          <motion.div
            initial={{ opacity: 0, rotate: -180 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Moon size={20} className="text-blue-400" />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, rotate: 180 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Sun size={20} className="text-[#86D17B]" />
          </motion.div>
        )}
      </motion.div>

      {/* Animated background */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          background: isDark
            ? "linear-gradient(45deg, #1e293b, #334155)"
            : "linear-gradient(45deg, #86D17B, #a3e635)",
          scale: isDark ? 1.1 : 1,
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{ opacity: 0.15 }}
      />
    </motion.button>
  );
}
