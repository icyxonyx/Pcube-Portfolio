"use client";

import type React from "react";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  Mail,
  DownloadCloud,
  Phone,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import UnifiedParticleSystem from "@/components/unified-particle-system";
import FadeInSection from "@/components/fade-in-section";
import StaggerContainer from "@/components/stagger-container";
import StaggerItem from "@/components/stagger-item";
import RotatingCube from "@/components/rotating-cube";

interface ContactSectionProps {
  sectionIndex: number;
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormState {
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
}

export default function ContactSection({ sectionIndex }: ContactSectionProps) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formState, setFormState] = useState<FormState>({
    isSubmitting: false,
    isSuccess: false,
    error: null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear any previous errors when user starts typing
    if (formState.error) {
      setFormState((prev) => ({ ...prev, error: null }));
    }
  };

  const validateForm = (): string | null => {
    if (!formData.name.trim()) return "Name is required";
    if (!formData.email.trim()) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      return "Please enter a valid email";
    if (!formData.subject.trim()) return "Subject is required";
    if (!formData.message.trim()) return "Message is required";
    if (formData.message.trim().length < 10)
      return "Message must be at least 10 characters long";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setFormState((prev) => ({ ...prev, error: validationError }));
      return;
    }

    setFormState((prev) => ({ ...prev, isSubmitting: true, error: null }));

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      setFormState((prev) => ({
        ...prev,
        isSubmitting: false,
        isSuccess: true,
      }));
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset success state after 5 seconds
      setTimeout(() => {
        setFormState((prev) => ({ ...prev, isSuccess: false }));
      }, 5000);
    } catch (error) {
      setFormState((prev) => ({
        ...prev,
        isSubmitting: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to send message. Please try again later.",
      }));
    }
  };

  const contactInfo = [
    {
      icon: DownloadCloud,
      title: "Resume",
      content: "Click to View/Download my resume",
      href: "/docs/Pankaj_Pandey_Resume.pdf",
    },
    {
      icon: Mail,
      title: "Email",
      content: "p2pp007@gmail.com",
      href: "mailto:p2pp007@gmail.com",
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+91 7304314946",
      href: "tel:+917304314946",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-50/50 via-[#86D17B]/8 to-emerald-50/50 dark:from-gray-900 dark:via-green-900/15 dark:to-gray-800 transition-all duration-700"
    >
      <UnifiedParticleSystem
        particleCount={30}
        colors={["#86D17B", "#65a85f", "#a3e635", "#84cc16", "#22c55e"]}
        types={["circle", "square", "triangle"]}
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
          className="text-[20rem] md:text-[25rem] lg:text-[30rem] font-bold text-[#86D17B]/10 dark:text-green-400/10 select-none transition-all duration-700"
        >
          05
        </motion.div>
      </motion.div>

      <div className="container mx-auto px-4 md:px-6 lg:px-12 relative z-10 h-full flex flex-col justify-center max-w-6xl">
        <div className="text-center mb-8 lg:mb-12">
          <FadeInSection delay={0.2}>
            <div className="text-sm uppercase tracking-wider text-[#86D17B] dark:text-green-400 mb-2 transition-colors duration-700">
              05
            </div>
          </FadeInSection>
          <FadeInSection delay={0.4}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 lg:mb-6 bg-gradient-to-r from-gray-900 via-[#86D17B] to-[#65a85f] dark:from-white dark:via-green-300 dark:to-[#86D17B] bg-clip-text text-transparent transition-all duration-700">
              Get In Touch
            </h2>
          </FadeInSection>
          <FadeInSection delay={0.6}>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 max-w-2xl mx-auto font-medium transition-colors duration-700">
              Feel free to reach out if you want to collaborate with me, or
              simply have a chat.
            </p>
          </FadeInSection>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 flex-1 items-start max-h-[calc(100vh-16rem)]">
          <div className="space-y-6 lg:space-y-8">
            <FadeInSection delay={0.8}>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-700">
                Contact Information
              </h3>
            </FadeInSection>

            <StaggerContainer
              className="space-y-4 lg:space-y-6"
              staggerDelay={0.1}
            >
              {contactInfo.map((info, index) => (
                <StaggerItem key={index}>
                  <motion.a
                    href={info.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start p-4 lg:p-6 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-xl shadow-lg hover:shadow-xl border border-gray-200/30 dark:border-gray-700/30 transition-all duration-500 group"
                    whileHover={{ x: 5, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mr-3 lg:mr-4 mt-1">
                      <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-[#86D17B] to-[#65a85f] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <info.icon
                          size={18}
                          className="text-white lg:w-5 lg:h-5"
                        />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-base lg:text-lg text-gray-900 dark:text-white mb-1 transition-colors duration-700">
                        {info.title}
                      </h4>
                      <p className="text-sm lg:text-base text-gray-600 dark:text-gray-300 transition-colors duration-700">
                        {info.content}
                      </p>
                    </div>
                  </motion.a>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* PCUBE Logo Display */}
            <FadeInSection delay={1.2}>
              <div className="mt-8 p-6 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/30 dark:border-gray-700/30">
                <div className="flex items-center justify-center">
                  <div className="flex items-center">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#86D17B] to-[#65a85f] bg-clip-text text-transparent flex items-center">
                      <span className="text-gray-900 dark:text-white">P</span>
                      <span className="font-mono text-gray-900 dark:text-white">
                        CUBE
                      </span>
                      <RotatingCube size="small" className="ml-1" />
                    </h3>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>

          <FadeInSection delay={1.0}>
            <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl p-6 lg:p-8 shadow-xl border border-gray-200/30 dark:border-gray-700/30 transition-all duration-700 h-full max-h-[calc(100vh-20rem)] overflow-y-auto">
              <h3 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6 text-gray-900 dark:text-white transition-colors duration-700">
                Send Message
              </h3>

              {/* Success Message */}
              {formState.isSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <p className="text-green-700 dark:text-green-300 font-medium">
                    Message sent successfully! I'll get back to you soon.
                  </p>
                </motion.div>
              )}

              {/* Error Message */}
              {formState.error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg flex items-center gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                  <p className="text-red-700 dark:text-red-300 font-medium">
                    {formState.error}
                  </p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
                <StaggerContainer
                  className="space-y-4 lg:space-y-6"
                  staggerDelay={0.1}
                >
                  <StaggerItem>
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-2 text-gray-900 dark:text-white transition-colors duration-700"
                      >
                        Name *
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={formState.isSubmitting}
                        className="w-full px-3 lg:px-4 py-2 lg:py-3 border border-gray-300/50 dark:border-gray-600/50 bg-white/80 dark:bg-gray-700/80 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#86D17B] focus:border-transparent transition-all duration-300 backdrop-blur-sm text-sm lg:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Your name"
                        required
                      />
                    </div>
                  </StaggerItem>

                  <StaggerItem>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-2 text-gray-900 dark:text-white transition-colors duration-700"
                      >
                        Email *
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={formState.isSubmitting}
                        className="w-full px-3 lg:px-4 py-2 lg:py-3 border border-gray-300/50 dark:border-gray-600/50 bg-white/80 dark:bg-gray-700/80 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#86D17B] focus:border-transparent transition-all duration-300 backdrop-blur-sm text-sm lg:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Your email"
                        required
                      />
                    </div>
                  </StaggerItem>

                  <StaggerItem>
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium mb-2 text-gray-900 dark:text-white transition-colors duration-700"
                      >
                        Subject *
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        disabled={formState.isSubmitting}
                        className="w-full px-3 lg:px-4 py-2 lg:py-3 border border-gray-300/50 dark:border-gray-600/50 bg-white/80 dark:bg-gray-700/80 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#86D17B] focus:border-transparent transition-all duration-300 backdrop-blur-sm text-sm lg:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Subject"
                        required
                      />
                    </div>
                  </StaggerItem>

                  <StaggerItem>
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium mb-2 text-gray-900 dark:text-white transition-colors duration-700"
                      >
                        Message *
                      </label>
                      <motion.textarea
                        whileFocus={{ scale: 1.02 }}
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        disabled={formState.isSubmitting}
                        rows={4}
                        className="w-full px-3 lg:px-4 py-2 lg:py-3 border border-gray-300/50 dark:border-gray-600/50 bg-white/80 dark:bg-gray-700/80 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#86D17B] focus:border-transparent transition-all duration-300 backdrop-blur-sm resize-none text-sm lg:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Your message (minimum 10 characters)"
                        required
                        minLength={10}
                      />
                    </div>
                  </StaggerItem>

                  <StaggerItem>
                    <motion.button
                      type="submit"
                      disabled={formState.isSubmitting}
                      whileHover={
                        !formState.isSubmitting
                          ? {
                              scale: 1.05,
                              boxShadow: "0 10px 25px rgba(134, 209, 123, 0.3)",
                            }
                          : {}
                      }
                      whileTap={!formState.isSubmitting ? { scale: 0.95 } : {}}
                      className="w-full bg-gradient-to-r from-[#86D17B] to-[#65a85f] hover:from-[#75c26a] hover:to-[#5a9754] text-white px-4 lg:px-6 py-2 lg:py-3 rounded-lg font-medium transition-all duration-300 shadow-lg text-sm lg:text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {formState.isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "linear",
                            }}
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </StaggerItem>
                </StaggerContainer>
              </form>
            </div>
          </FadeInSection>
        </div>
      </div>
    </div>
  );
}
