import React, { useRef, useState, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";
import { HiOutlineCode } from "react-icons/hi";
import UnlockComponent from "../components/UnlockComponent";
import portfolioProjects from "../data/portfolioProjects.json";

// Vite dynamic image import
const imageModules = import.meta.glob("../assets/*.{jpeg,jpg,png,webp}", {
  eager: true,
});

const getImage = (filename) => {
  const match = Object.entries(imageModules).find(([path]) =>
    path.endsWith(`/${filename}`)
  );
  return match ? match[1].default : "";
};

// Sort projects by ascending order key
const allProjects = [...portfolioProjects].sort((a, b) => a.order - b.order);

// Derive unique categories from data, keeping a stable order
const CATEGORIES = [
  "All",
  ...Array.from(new Set(allProjects.map((p) => p.category))),
];

/* ─── Animated project card ─── */
const ProjectCard = ({ project, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.5, delay: 0.05 }}
      className="group relative"
    >
      {/* Card container */}
      <div
        className={`relative flex flex-col ${
          isEven ? "lg:flex-row" : "lg:flex-row-reverse"
        } items-stretch lg:min-h-[350px] overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-[#0a1628] via-[#0d1f3c] to-[#0a1628] shadow-[0_8px_40px_rgba(0,0,0,0.35)] transition-all duration-500 hover:shadow-[0_12px_60px_rgba(42,125,227,0.15)] hover:border-blue-500/20`}
      >
        {/* ── Image half ── */}
        <div className={`relative lg:w-[55%] w-full overflow-hidden ${project.category === 'Mobile' ? 'bg-[#050b14]' : ''}`}>
          {/* Gradient edge blend */}
          <div
            className={`absolute inset-0 z-10 pointer-events-none ${
              isEven
                ? "bg-gradient-to-r from-transparent via-transparent to-[#0d1f3c]"
                : "bg-gradient-to-l from-transparent via-transparent to-[#0d1f3c]"
            } hidden lg:block`}
          />

          <motion.img
            src={getImage(project.image)}
            alt={project.title}
            loading="lazy"
            className={`w-full h-64 sm:h-72 lg:absolute lg:inset-0 lg:h-full transition-transform duration-700 group-hover:scale-105 ${
              project.category === "Mobile"
                ? "object-contain p-6 lg:p-10"
                : "object-cover object-center"
            }`}
          />

          {/* Shimmering overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/0 via-white/0 to-yellow-400/0 group-hover:from-blue-600/10 group-hover:via-white/5 group-hover:to-yellow-400/10 transition-all duration-700 z-20 pointer-events-none" />
        </div>

        {/* ── Content half ── */}
        <div className="lg:w-[45%] w-full flex flex-col justify-center px-6 sm:px-10 py-8 lg:py-10 relative z-20">
          {/* Category badge + project number */}
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-blue-400/60">
              Project {String(project.order).padStart(2, "0")}
            </span>
            <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded bg-blue-500/10 text-blue-300/70 border border-blue-500/15">
              {project.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-2xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight group-hover:text-blue-300 transition-colors duration-400">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-[15px] sm:text-base text-gray-400 leading-relaxed mb-6 line-clamp-4">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-medium tracking-wider uppercase px-3 py-1.5 rounded-full border border-blue-500/20 text-blue-300/80 bg-blue-500/[0.06]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 self-start px-7 py-3 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40 hover:brightness-110 transition-all duration-300"
            >
              <FiExternalLink className="text-base" />
              View Live Project
            </a>
          ) : (
            <span className="inline-flex items-center gap-2.5 self-start px-7 py-3 rounded-full text-sm font-semibold border border-white/10 text-gray-400 bg-white/[0.03]">
              <HiOutlineCode className="text-base" />
              Private Deployment
            </span>
          )}
        </div>

        {/* Subtle accent line on the image edge */}
        <div
          className={`absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500/30 to-transparent hidden lg:block z-30 ${
            isEven ? "right-[45%]" : "left-[45%]"
          }`}
        />
      </div>
    </motion.div>
  );
};

/* ─── Portfolio page ─── */
const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return allProjects;
    return allProjects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);


  return (
    <div className="min-h-screen bg-[#060e1a]">
      {/* ── Hero banner ── */}
      <section className="relative pt-36 pb-14 sm:pt-40 sm:pb-16 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-blue-600/[0.07] rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-yellow-400/[0.04] rounded-full blur-[100px]" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block text-[11px] font-semibold tracking-[0.3em] uppercase text-blue-400 bg-blue-500/10 border border-blue-500/15 px-5 py-2 rounded-full mb-6"
          >
            Our Work
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight"
          >
            Project{" "}
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-yellow-400 bg-clip-text text-transparent">
              Portfolio
            </span>
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-24 h-1 bg-gradient-to-r from-blue-500 via-yellow-400 to-blue-500 rounded-full mx-auto mb-6 origin-center"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            From concept to deployment — real solutions we've crafted for
            real-world challenges across industries.
          </motion.p>
        </div>
      </section>

      {/* ── Category filter bar ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3"
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer border ${
                  isActive
                    ? "bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/30"
                    : "bg-white/[0.03] text-gray-400 border-white/10 hover:text-white hover:border-white/20 hover:bg-white/[0.06]"
                }`}
              >
                <span className="flex items-center gap-2">
                  {cat}
                </span>

                {/* Active indicator dot */}
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryIndicator"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-blue-400 rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </motion.div>        
      </section>

      {/* ── Projects grid ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-24 space-y-10">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </AnimatePresence>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-500 text-lg">
              No projects found in this category.
            </p>
          </motion.div>
        )}
      </section>

      {/* ── CTA ── */}
      <UnlockComponent />
    </div>
  );
};

export default Portfolio;
