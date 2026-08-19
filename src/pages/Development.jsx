import React from "react";
import { motion } from "framer-motion";
import {
  FaCogs,
  FaDraftingCompass,
  FaRocket,
  FaShieldAlt,
  FaSync,
  FaChartLine,
  FaQuoteLeft,
} from "react-icons/fa";
import UnlockComponent from "../components/UnlockComponent";

const steps = [
  {
    icon: <FaDraftingCompass className="text-2xl" />,
    theme: "from-yellow-400 to-orange-400",
    title: "Vision & Planning",
    desc: "Define the goals, key features, timelines, and stakeholders. We prioritize clarity and feasibility before a single line of code is written.",
  },
  {
    icon: <FaCogs className="text-2xl" />,
    theme: "from-blue-500 to-cyan-400",
    title: "Requirements & Design",
    desc: "Capture clear, testable requirements and sketch system architecture. Align expectations through mockups and user flows.",
  },
  {
    icon: <FaSync className="text-2xl" />,
    theme: "from-purple-500 to-fuchsia-400",
    title: "Iterative Development",
    desc: "We deliver in short, reviewable cycles—using Agile, RAD, or hybrid methods. Frequent demos and tight feedback loops.",
  },
  {
    icon: <FaShieldAlt className="text-2xl" />,
    theme: "from-emerald-500 to-teal-400",
    title: "Quality Assurance",
    desc: "Automated testing (unit, integration, acceptance) is part of every sprint. Bugs caught early, not shipped.",
  },
  {
    icon: <FaRocket className="text-2xl" />,
    theme: "from-pink-500 to-rose-400",
    title: "Deployment & Feedback",
    desc: "Fast, secure, and incremental delivery. DevOps/DevSecOps ensures stability and traceability across environments.",
  },
  {
    icon: <FaChartLine className="text-2xl" />,
    theme: "from-red-500 to-orange-500",
    title: "Monitoring & Improvement",
    desc: "We track performance, errors, and user behavior—then improve. Retrospectives help us evolve every cycle.",
  },
];

const viewportOnce = { once: true, amount: 0.3 };

/* ---------------------------------------------------
   Roadmap step — alternating card connected to a
   glowing center node on a vertical spine.
--------------------------------------------------- */
const RoadmapStep = ({ step, index }) => {
  const isRight = index % 2 === 1;

  return (
    <div className="relative flex flex-col md:flex-row items-center gap-6 md:gap-0">
      {/* left slot */}
      <div className={`w-full md:w-1/2 ${isRight ? "md:order-1 md:pl-14" : "md:pr-14 md:text-right"}`}>
        <motion.div
          initial={{ opacity: 0, x: isRight ? 40 : -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{ y: -6 }}
          className={`group relative inline-block w-full bg-gray-50 border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:border-transparent transition-all duration-300 overflow-hidden ${
            isRight ? "text-left" : "text-left md:text-right"
          }`}
        >
          <div
            className={`absolute -top-8 ${
              isRight ? "-left-8" : "-right-8"
            } w-28 h-28 rounded-full bg-gradient-to-br ${step.theme} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500`}
          />
          <span
            className={`relative z-10 block text-xs font-semibold tracking-widest text-gray-400 uppercase mb-1`}
          >
            Phase {String(index + 1).padStart(2, "0")}
          </span>
          <h3
            className={`relative z-10 text-2xl font-semibold mb-2 bg-gradient-to-r ${step.theme} bg-clip-text text-transparent`}
          >
            {step.title}
          </h3>
          <p className="relative z-10 text-gray-700">{step.desc}</p>
        </motion.div>
      </div>

      {/* center node on the spine (desktop only) */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center z-10">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="relative"
        >
          <motion.span
            className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.theme} blur-md`}
            animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.3, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
          />
          <div
            className={`relative w-14 h-14 rounded-full bg-gradient-to-br ${step.theme} text-white flex items-center justify-center shadow-lg ring-4 ring-white`}
          >
            {step.icon}
          </div>
        </motion.div>
      </div>

      {/* mobile icon (spine hidden on mobile) */}
      <div className="md:hidden">
        <div
          className={`w-14 h-14 rounded-full bg-gradient-to-br ${step.theme} text-white flex items-center justify-center shadow-lg`}
        >
          {step.icon}
        </div>
      </div>

      {/* right slot spacer */}
      <div className="hidden md:block w-1/2" />
    </div>
  );
};

const DevelopmentApproach = () => (
  <div className="bg-white text-gray-900 min-h-screen pt-32 pb-20 px-6 md:px-24">
    <section className="text-center mb-24">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.6 }}
        className="text-5xl md:text-6xl font-bold text-gray-900"
      >
        Our <span className="text-blue-600">Development Approach</span>
      </motion.h1>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-28 h-1 bg-gradient-to-r from-blue-500 via-yellow-400 to-black rounded-full mx-auto mt-4 mb-6 origin-center"
      />
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-4 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
      >
        A clear and agile software development journey that turns complexity
        into clarity, and code into value.
      </motion.p>
    </section>

    {/* Roadmap timeline */}
    <section className="relative max-w-5xl mx-auto">
      {/* central spine */}
      <div className="hidden md:block absolute left-1/2 top-2 bottom-2 w-0.5 bg-gradient-to-b from-yellow-300 via-purple-300 to-red-300 -translate-x-1/2" />

      <div className="space-y-14 md:space-y-20">
        {steps.map((step, index) => (
          <RoadmapStep key={index} step={step} index={index} />
        ))}
      </div>
    </section>

    {/* Closing quote */}
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.6 }}
      className="relative mt-28 max-w-4xl mx-auto"
    >
      <div className="relative bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-3xl px-8 py-12 text-center shadow-sm overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-blue-200 opacity-20 blur-3xl" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-yellow-200 opacity-20 blur-3xl" />
        <FaQuoteLeft className="relative z-10 text-blue-500 text-3xl mx-auto mb-5 opacity-70" />
        <p className="relative z-10 text-gray-600 italic max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
          Our process draws from proven methodologies—Agile, DSDM, DevOps, and
          DevSecOps—alongside software principles like DRY, YAGNI, and early
          testing. We don't just ship features, we build software that works,
          lasts, and evolves.
        </p>
      </div>
    </motion.section>

    <UnlockComponent />
  </div>
);

export default DevelopmentApproach;