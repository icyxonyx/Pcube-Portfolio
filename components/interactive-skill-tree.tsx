"use client";

import type React from "react";

import { useState, useCallback, useEffect, useRef } from "react";
import ReactFlow, {
  type Node,
  type Edge,
  Controls,
  Background,
  BackgroundVariant,
  MiniMap,
  type NodeTypes,
  useNodesState,
  useEdgesState,
  Panel,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import SkillNode from "./skill-node";
import { motion, AnimatePresence } from "framer-motion";

// Custom node types
const nodeTypes: NodeTypes = {
  skillNode: SkillNode,
};

// Enhanced skills data with official technology logos and representative images
const initialNodes: Node[] = [
  // Core Programming Languages - Central cluster
  {
    id: "python",
    type: "skillNode",
    position: { x: 400, y: 200 },
    data: {
      label: "Python",
      level: 4, // Proficient - Advanced AI/ML projects, GPU optimization, advanced libraries
      projects: [
        "Media Sorter (Advanced AI/ML)",
        "Computer Vision Pipeline",
        "GPU Memory Optimization",
      ],
      description:
        "Advanced Python development with AI/ML implementations, including multimodal AI models (CLIP/BLIP), computer vision pipelines, and GPU optimization for resource-constrained environments.",
      backgroundImage: "/images/tree/python.png",
      category: "languages",
      size: "large",
    },
  },
  {
    id: "javascript",
    type: "skillNode",
    position: { x: 800, y: 180 },
    data: {
      label: "JavaScript",
      level: 3, // Intermediate - Modern portfolio with advanced features
      projects: [
        "Interactive Portfolio",
        "React Applications",
        "Modern Web Development",
      ],
      description:
        "Solid JavaScript/TypeScript skills with React ecosystem, advanced animations, and full-stack development patterns.",
      backgroundImage: "/images/tree/js.png",
      category: "languages",
      size: "large",
    },
  },
  {
    id: "php",
    type: "skillNode",
    position: { x: 1100, y: 300 },
    data: {
      label: "PHP",
      level: 2, // Developing - Training background, limited recent projects
      projects: ["Web Development Training", "Basic Backend Services"],
      description:
        "Developing skills in PHP for server-side web development, gained through formal training programs.",
      backgroundImage: "/images/tree/php.png",
      category: "languages",
      size: "small",
    },
  },

  // AI & Machine Learning - Upper constellation
  {
    id: "ml",
    type: "skillNode",
    position: { x: 200, y: 50 },
    data: {
      label: "Machine Learning",
      level: 4, // Proficient - Advanced implementation with cutting-edge models
      projects: [
        "Media Sorter AI Engine",
        "Multimodal AI Integration",
        "Model Optimization",
      ],
      description:
        "Advanced ML implementation with state-of-the-art models including CLIP, BLIP, and custom optimization for resource-constrained environments.",
      backgroundImage: "/images/tree/ml.png",
      category: "ai",
      size: "large",
    },
  },
  {
    id: "cv",
    type: "skillNode",
    position: { x: 50, y: 250 },
    data: {
      label: "Computer Vision",
      level: 4, // Proficient - Advanced multimodal AI implementation
      projects: [
        "CLIP/BLIP Integration",
        "OCR Pipeline",
        "Image/Video Analysis",
      ],
      description:
        "Advanced computer vision with multimodal AI models, OCR integration, and sophisticated image/video analysis pipelines.",
      backgroundImage: "/images/tree/cv.png",
      category: "ai",
      size: "large",
    },
  },
  {
    id: "pytorch",
    type: "skillNode",
    position: { x: 350, y: 400 },
    data: {
      label: "PyTorch",
      level: 3, // Intermediate - Advanced usage with optimization
      projects: [
        "Media Sorter Backend",
        "GPU Optimization",
        "Model Deployment",
      ],
      description:
        "Solid PyTorch skills for deep learning with GPU optimization and memory management for resource-constrained environments.",
      backgroundImage: "/images/tree/pytorch.png",
      category: "ai",
      size: "medium",
    },
  },
  {
    id: "transformers",
    type: "skillNode",
    position: { x: 150, y: 450 },
    data: {
      label: "Transformers",
      level: 3, // Intermediate - Advanced model integration
      projects: [
        "CLIP/BLIP Models",
        "Hugging Face Integration",
        "Multimodal AI",
      ],
      description:
        "Solid experience with Hugging Face transformers library, implementing state-of-the-art multimodal models for production use.",
      backgroundImage: "/images/tree/hf.png",
      category: "ai",
      size: "medium",
    },
  },

  // Frontend Development - Right constellation
  {
    id: "react",
    type: "skillNode",
    position: { x: 950, y: 50 },
    data: {
      label: "React",
      level: 3, // Intermediate - Advanced portfolio implementation
      projects: [
        "Interactive Portfolio",
        "Complex Animations",
        "Modern React Patterns",
      ],
      description:
        "Solid React skills with modern patterns, hooks, animations, and performance optimization techniques.",
      backgroundImage: "/images/tree/react.png",
      category: "frontend",
      size: "large",
    },
  },
  {
    id: "nextjs",
    type: "skillNode",
    position: { x: 1200, y: 120 },
    data: {
      label: "Next.js",
      level: 3, // Intermediate - Full-stack portfolio implementation
      projects: ["Portfolio Website", "SSR Implementation", "API Routes"],
      description:
        "Good Next.js framework knowledge with SSR, API routes, optimization, and modern deployment practices.",
      backgroundImage: "/images/tree/nextjs.png",
      category: "frontend",
      size: "medium",
    },
  },
  {
    id: "tailwind",
    type: "skillNode",
    position: { x: 750, y: 350 },
    data: {
      label: "Tailwind CSS",
      level: 3, // Intermediate - Advanced styling in portfolio
      projects: ["Portfolio Design", "Responsive Layouts", "Custom Components"],
      description:
        "Good Tailwind CSS skills for rapid UI development with custom designs, responsive layouts, and component systems.",
      backgroundImage: "/images/tree/tailwind.png",
      category: "frontend",
      size: "medium",
    },
  },

  // Data Science - Lower left constellation
  {
    id: "pandas",
    type: "skillNode",
    position: { x: 500, y: 550 },
    data: {
      label: "Pandas",
      level: 3, // Intermediate - Advanced data processing in AI projects
      projects: [
        "Media Sorter Data Pipeline",
        "File Processing",
        "Data Analysis",
      ],
      description:
        "Solid Pandas skills for complex data manipulation, analysis workflows, and integration with AI/ML pipelines.",
      backgroundImage: "/images/tree/pandas.png",
      category: "data",
      size: "medium",
    },
  },
  {
    id: "numpy",
    type: "skillNode",
    position: { x: 700, y: 600 },
    data: {
      label: "NumPy",
      level: 3, // Intermediate - Advanced numerical computing in AI
      projects: ["Image Processing", "ML Pipelines", "Numerical Optimization"],
      description:
        "Good NumPy skills for high-performance numerical computing, array operations, and scientific computing in AI applications.",
      backgroundImage: "/images/tree/numpy.png",
      category: "data",
      size: "medium",
    },
  },

  // Cloud & Infrastructure - Upper right constellation
  {
    id: "aws",
    type: "skillNode",
    position: { x: 1300, y: 250 },
    data: {
      label: "AWS",
      level: 3, // Intermediate - Certified but limited hands-on projects
      projects: [
        "Cloud Practitioner Certification",
        "Basic Infrastructure",
        "Learning Projects",
      ],
      description:
        "Intermediate AWS knowledge with Cloud Practitioner certification, understanding of core services and cloud architecture principles.",
      backgroundImage: "/images/tree/aws.png",
      category: "cloud",
      size: "medium",
    },
  },
  {
    id: "docker",
    type: "skillNode",
    position: { x: 1450, y: 400 },
    data: {
      label: "Docker",
      level: 2, // Developing - Basic containerization knowledge
      projects: ["Development Environment", "Basic Containerization"],
      description:
        "Developing Docker skills for containerization and development environment setup.",
      backgroundImage: "/images/tree/docker.png",
      category: "cloud",
      size: "small",
    },
  },

  // System Optimization - Lower constellation
  {
    id: "gpu-optimization",
    type: "skillNode",
    position: { x: 250, y: 650 },
    data: {
      label: "GPU Optimization",
      level: 4, // Proficient - Advanced CUDA optimization for constrained hardware
      projects: [
        "RTX 3050 4GB Optimization",
        "Memory Management",
        "CUDA Programming",
      ],
      description:
        "Advanced GPU optimization with CUDA programming, memory management for resource-constrained environments, and performance tuning.",
      backgroundImage: "/images/tree/gpu.png",
      category: "optimization",
      size: "medium",
    },
  },
  {
    id: "memory-management",
    type: "skillNode",
    position: { x: 450, y: 700 },
    data: {
      label: "Memory Management",
      level: 3, // Intermediate - Advanced optimization techniques
      projects: [
        "Large Dataset Processing",
        "Memory Optimization",
        "Performance Tuning",
      ],
      description:
        "Good memory management skills with optimization patterns, garbage collection tuning, and efficient resource utilization.",
      backgroundImage: "/images/tree/mo.png",
      category: "optimization",
      size: "medium",
    },
  },

  // Security & Networking - Far right constellation
  {
    id: "cybersecurity",
    type: "skillNode",
    position: { x: 1350, y: 500 },
    data: {
      label: "Cybersecurity",
      level: 3, // Intermediate - Formal training and certification
      projects: [
        "Ethical Hacking Training",
        "Security Practices",
        "Network Security",
      ],
      description:
        "Intermediate cybersecurity knowledge with formal training in ethical hacking, penetration testing methodologies, and security best practices.",
      backgroundImage: "/images/tree/cs.png",
      category: "security",
      size: "medium",
    },
  },
  {
    id: "networking",
    type: "skillNode",
    position: { x: 1200, y: 600 },
    data: {
      label: "Networking",
      level: 3, // Intermediate - MTA certification
      projects: [
        "MTA Certification",
        "Network Fundamentals",
        "Infrastructure Design",
      ],
      description:
        "Intermediate networking knowledge with MTA certification, understanding of TCP/IP protocols, network architecture, and infrastructure design principles.",
      backgroundImage: "/images/tree/cn.png",
      category: "security",
      size: "small",
    },
  },

  // Backend & Database - Center right constellation
  {
    id: "mongodb",
    type: "skillNode",
    position: { x: 1000, y: 450 },
    data: {
      label: "MongoDB",
      level: 3, // Intermediate - Academic and project experience
      projects: ["Database Design", "NoSQL Applications", "Academic Projects"],
      description:
        "Intermediate MongoDB knowledge with NoSQL database design, aggregation pipelines, and application integration experience.",
      backgroundImage: "/images/tree/mongodb.png",
      category: "backend",
      size: "medium",
    },
  },
  {
    id: "nodejs",
    type: "skillNode",
    position: { x: 900, y: 500 },
    data: {
      label: "Node.js",
      level: 3, // Intermediate - Portfolio backend and API development
      projects: [
        "Portfolio Backend",
        "API Development",
        "Server-side Applications",
      ],
      description:
        "Intermediate Node.js development with Express.js, API creation, and server-side JavaScript applications.",
      backgroundImage: "/images/tree/nodejs.png",
      category: "backend",
      size: "medium",
    },
  },
];

// Enhanced connections with different styles for different relationship types
const initialEdges: Edge[] = [
  // Core language foundations - Primary connections (thick, animated)
  {
    id: "python-ml",
    source: "python",
    target: "ml",
    animated: true,
    style: {
      stroke: "#86D17B",
      strokeWidth: 4,
      filter: "drop-shadow(0 0 6px #86D17B)",
    },
    type: "smoothstep",
  },
  {
    id: "python-cv",
    source: "python",
    target: "cv",
    animated: true,
    style: {
      stroke: "#86D17B",
      strokeWidth: 4,
      filter: "drop-shadow(0 0 6px #86D17B)",
    },
    type: "smoothstep",
  },
  {
    id: "javascript-react",
    source: "javascript",
    target: "react",
    animated: true,
    style: {
      stroke: "#60a5fa",
      strokeWidth: 4,
      filter: "drop-shadow(0 0 6px #60a5fa)",
    },
    type: "smoothstep",
  },

  // AI/ML skill progression - Secondary connections
  {
    id: "ml-cv",
    source: "ml",
    target: "cv",
    style: {
      stroke: "#a3e635",
      strokeWidth: 3,
      filter: "drop-shadow(0 0 4px #a3e635)",
    },
    type: "smoothstep",
  },
  {
    id: "ml-pytorch",
    source: "ml",
    target: "pytorch",
    style: { stroke: "#84cc16", strokeWidth: 2 },
    type: "smoothstep",
  },
  {
    id: "cv-pytorch",
    source: "cv",
    target: "pytorch",
    style: { stroke: "#84cc16", strokeWidth: 2 },
    type: "smoothstep",
  },
  {
    id: "pytorch-transformers",
    source: "pytorch",
    target: "transformers",
    style: { stroke: "#22c55e", strokeWidth: 2 },
    type: "smoothstep",
  },
  {
    id: "cv-transformers",
    source: "cv",
    target: "transformers",
    style: { stroke: "#22c55e", strokeWidth: 2 },
    type: "smoothstep",
  },

  // Data science connections
  {
    id: "python-pandas",
    source: "python",
    target: "pandas",
    style: { stroke: "#f59e0b", strokeWidth: 2 },
    type: "smoothstep",
  },
  {
    id: "python-numpy",
    source: "python",
    target: "numpy",
    style: { stroke: "#f59e0b", strokeWidth: 2 },
    type: "smoothstep",
  },
  {
    id: "pandas-numpy",
    source: "pandas",
    target: "numpy",
    style: { stroke: "#f97316", strokeWidth: 2 },
    type: "smoothstep",
  },

  // Frontend development path
  {
    id: "react-nextjs",
    source: "react",
    target: "nextjs",
    style: { stroke: "#3b82f6", strokeWidth: 3 },
    type: "smoothstep",
  },
  {
    id: "react-tailwind",
    source: "react",
    target: "tailwind",
    style: { stroke: "#06b6d4", strokeWidth: 2 },
    type: "smoothstep",
  },

  // Backend connections
  {
    id: "javascript-nodejs",
    source: "javascript",
    target: "nodejs",
    style: { stroke: "#10b981", strokeWidth: 2 },
    type: "smoothstep",
  },
  {
    id: "nodejs-mongodb",
    source: "nodejs",
    target: "mongodb",
    style: { stroke: "#059669", strokeWidth: 2 },
    type: "smoothstep",
  },

  // Cloud and infrastructure
  {
    id: "nodejs-aws",
    source: "nodejs",
    target: "aws",
    style: { stroke: "#a78bfa", strokeWidth: 2 },
    type: "smoothstep",
  },
  {
    id: "python-aws",
    source: "python",
    target: "aws",
    style: { stroke: "#a78bfa", strokeWidth: 2 },
    type: "smoothstep",
  },
  {
    id: "aws-docker",
    source: "aws",
    target: "docker",
    style: { stroke: "#8b5cf6", strokeWidth: 2 },
    type: "smoothstep",
  },

  // Optimization skills (your specialty)
  {
    id: "pytorch-gpu-optimization",
    source: "pytorch",
    target: "gpu-optimization",
    animated: true,
    style: {
      stroke: "#86D17B",
      strokeWidth: 3,
      filter: "drop-shadow(0 0 4px #86D17B)",
    },
    type: "smoothstep",
  },
  {
    id: "python-memory-management",
    source: "python",
    target: "memory-management",
    style: { stroke: "#65a85f", strokeWidth: 2 },
    type: "smoothstep",
  },
  {
    id: "cv-gpu-optimization",
    source: "cv",
    target: "gpu-optimization",
    animated: true,
    style: {
      stroke: "#86D17B",
      strokeWidth: 3,
      filter: "drop-shadow(0 0 4px #86D17B)",
    },
    type: "smoothstep",
  },

  // Security path
  {
    id: "networking-cybersecurity",
    source: "networking",
    target: "cybersecurity",
    style: { stroke: "#ef4444", strokeWidth: 2 },
    type: "smoothstep",
  },
  {
    id: "aws-cybersecurity",
    source: "aws",
    target: "cybersecurity",
    style: { stroke: "#dc2626", strokeWidth: 2 },
    type: "smoothstep",
  },
];

// Enhanced skill categories with space-themed colors
const skillCategories = [
  { id: "all", label: "All Skills", color: "#ffffff" },
  { id: "languages", label: "Languages", color: "#f59e0b" },
  { id: "ai", label: "AI & ML", color: "#86D17B" },
  { id: "frontend", label: "Frontend", color: "#60a5fa" },
  { id: "backend", label: "Backend", color: "#10b981" },
  { id: "data", label: "Data Science", color: "#f97316" },
  { id: "cloud", label: "Cloud & DevOps", color: "#a78bfa" },
  { id: "optimization", label: "Optimization", color: "#65a85f" },
  { id: "security", label: "Security", color: "#ef4444" },
];

// Simplified proficiency levels
const proficiencyLevels = [
  { level: 1, label: "Aware" },
  { level: 2, label: "Developing" },
  { level: 3, label: "Intermediate" },
  { level: 4, label: "Proficient" },
  { level: 5, label: "Expert" },
];

export default function InteractiveSkillTree() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [isInitialized, setIsInitialized] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [stars, setStars] = useState<
    { left: string; top: string; duration: number; delay: number }[]
  >([]);

  useEffect(() => {
    const generatedStars = Array.from({ length: 100 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 2,
    }));
    setStars(generatedStars);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);

  // Get viewport dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Filter nodes based on selected category
  useEffect(() => {
    if (activeCategory === "all") {
      setNodes(initialNodes.map((node) => ({ ...node, hidden: false })));
      setEdges(initialEdges.map((edge) => ({ ...edge, hidden: false })));
    } else {
      const filteredNodes = initialNodes.map((node) => ({
        ...node,
        hidden: node.data.category !== activeCategory,
      }));

      const visibleNodeIds = filteredNodes
        .filter((node) => !node.hidden)
        .map((node) => node.id);

      const filteredEdges = initialEdges.map((edge) => ({
        ...edge,
        hidden:
          !visibleNodeIds.includes(edge.source) ||
          !visibleNodeIds.includes(edge.target),
      }));

      setNodes(filteredNodes);
      setEdges(filteredEdges);
    }
  }, [activeCategory, setNodes, setEdges]);

  // Animation effect when component mounts
  useEffect(() => {
    if (!isInitialized) {
      const timer = setTimeout(() => {
        setIsInitialized(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isInitialized]);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 20% 80%, rgba(134, 209, 123, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(96, 165, 250, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(167, 139, 250, 0.1) 0%, transparent 50%),
          linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f0f23 75%, #1a1a2e 100%)
        `,
      }}
    >
      {/* Animated stars background */}
      <div className="absolute inset-0 overflow-hidden">
        {stars.map((star, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-60"
            style={{
              left: star.left,
              top: star.top,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: star.duration,
              repeat: Number.POSITIVE_INFINITY,
              delay: star.delay,
            }}
          />
        ))}
      </div>

      {/* Floating nebula effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-96 h-96 rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(134, 209, 123, 0.3) 0%, transparent 70%)",
            left: "10%",
            top: "20%",
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-80 h-80 rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(circle, rgba(96, 165, 250, 0.4) 0%, transparent 70%)",
            right: "15%",
            top: "10%",
          }}
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          minZoom={0.3}
          maxZoom={1.2}
          defaultViewport={{ x: 0, y: 0, zoom: 0.6 }}
          className="skill-tree-flow"
          style={{ background: "transparent" }}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={true}
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={40}
            size={2}
            color="rgba(255, 255, 255, 0.1)"
            style={{ opacity: 0.3 }}
          />

          <Controls
            className="react-flow-controls-custom"
            style={{
              background: "rgba(0, 0, 0, 0.3)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "12px",
            }}
          />

          <MiniMap
            nodeStrokeColor={(n) => {
              const category = skillCategories.find(
                (cat) => cat.id === n.data.category
              );
              return category?.color || "#86D17B";
            }}
            nodeColor={(n) => {
              const category = skillCategories.find(
                (cat) => cat.id === n.data.category
              );
              return `${category?.color}40` || "#86D17B40";
            }}
            maskColor="rgba(15, 15, 35, 0.8)"
            style={{
              background: "rgba(0, 0, 0, 0.3)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "12px",
            }}
          />

          {/* Streamlined Category Filter Panel - moved to top center */}
          <Panel position="top-center" className="skill-tree-panel">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black/30 backdrop-blur-xl px-6 py-3 rounded-full border border-white/20 shadow-2xl"
            >
              <div className="flex items-center gap-3">
                {skillCategories.slice(0, 6).map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${
                      activeCategory === category.id
                        ? "bg-white/20 text-white shadow-lg"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      boxShadow:
                        activeCategory === category.id
                          ? `0 0 15px ${category.color}40`
                          : "none",
                    }}
                  >
                    <span
                      className="inline-block w-1.5 h-1.5 rounded-full mr-2"
                      style={{ backgroundColor: category.color }}
                    />
                    {category.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </Panel>

          {/* Simplified Legend Panel - moved to bottom-center with horizontal layout */}
          <Panel position="bottom-center" className="skill-tree-panel">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black/30 backdrop-blur-xl p-3 rounded-xl border border-white/20 shadow-2xl mb-4"
            >
              <div className="flex flex-row gap-4 text-xs text-white/80 justify-center">
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 rounded-full border-4 border-green-400"></div>
                  <span>Expert</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 rounded-full border-4 border-[#86D17B]"></div>
                  <span>Proficient</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full border-2 border-yellow-400"></div>
                  <span>Intermediate</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full border-2 border-orange-400"></div>
                  <span>Developing</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full border border-gray-400"></div>
                  <span>Aware</span>
                </div>
              </div>
            </motion.div>
          </Panel>
        </ReactFlow>
      </ReactFlowProvider>

      {/* Simplified Skill Details Panel */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-96 z-50"
          >
            <div className="bg-black/40 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
              {/* Header with background image */}
              <div
                className="relative h-32 bg-cover bg-center"
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(${selectedNode.data.backgroundImage})`,
                }}
              >
                <div className="absolute inset-0 p-6 flex items-end">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {selectedNode.data.label}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-white/80 font-medium">
                        {proficiencyLevels.find(
                          (p) => p.level === selectedNode.data.level
                        )?.label || "Unknown"}
                      </span>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              i < selectedNode.data.level
                                ? "bg-green-400 shadow-lg shadow-green-400/50"
                                : "bg-white/20"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedNode(null)}
                  className="absolute top-4 right-4 w-8 h-8 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-black/60 transition-all"
                >
                  ✕
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <p className="text-white/90 text-sm leading-relaxed">
                  {selectedNode.data.description}
                </p>

                {selectedNode.data.projects &&
                  selectedNode.data.projects.length > 0 && (
                    <div>
                      <h4 className="text-white font-semibold mb-2 text-sm uppercase tracking-wider">
                        Projects
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedNode.data.projects.map(
                          (project: string, index: number) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white/90 rounded-full text-xs border border-white/20"
                            >
                              {project}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  )}

                <div className="pt-2 border-t border-white/10">
                  <div className="flex items-center justify-between text-xs text-white/60">
                    <span>Proficiency Level</span>
                    <span className="font-semibold text-white/80">
                      {proficiencyLevels.find(
                        (p) => p.level === selectedNode.data.level
                      )?.label || "Unknown"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Simplified Instructions - moved to top right corner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute top-6 right-6 bg-black/30 backdrop-blur-xl px-3 py-2 rounded-xl text-xs text-white/70 border border-white/20"
      >
        <p>Click nodes to explore • Use controls to navigate</p>
      </motion.div>
    </div>
  );
}
