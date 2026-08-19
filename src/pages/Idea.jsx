import React from "react";
import { motion } from "framer-motion";
import {
  FaLightbulb,
  FaDraftingCompass,
  FaSync,
  FaShieldAlt,
  FaRocket,
  FaChartLine,
  FaQuoteLeft,
} from "react-icons/fa";

const stages = [
  {
    icon: <FaLightbulb className="text-2xl" />,
    theme: "from-yellow-400 to-orange-400",
    title: "Ideation & Feasibility",
    desc: "Refine the idea: Who’s the user? What problems are we solving? How do we scope it?",
  },
  {
    icon: <FaDraftingCompass className="text-2xl" />,
    theme: "from-blue-500 to-cyan-400",
    title: "Requirements & Design",
    desc: "Write functional specs, sketch flows & wireframes, and align all stakeholders early.",
  },
  {
    icon: <FaSync className="text-2xl" />,
    theme: "from-purple-500 to-fuchsia-400",
    title: "Iterative Development",
    desc: "Deliver in short sprints or increments. Test, demo, and adapt continuously.",
  },
  {
    icon: <FaShieldAlt className="text-2xl" />,
    theme: "from-emerald-500 to-teal-400",
    title: "Testing & QA",
    desc: "Embed unit, integration and acceptance tests from day one. Automate through CI.",
  },
  {
    icon: <FaRocket className="text-2xl" />,
    theme: "from-pink-500 to-rose-400",
    title: "Deployment Strategy",
    desc: "Prepare release packages, staging & production pipelines. Practice small, frequent deployments.",
  },
  {
    icon: <FaChartLine className="text-2xl" />,
    theme: "from-red-500 to-orange-500",
    title: "Monitoring & Improvement",
    desc: "Track uptime, performance, feedback. Retrospectives guide process optimization.",
  },
];

const viewportOnce = { once: true, amount: 0.3 };

/* ---------------------------------------------------
   Roadmap stage — alternating card connected to a
   glowing center node on a vertical spine.
--------------------------------------------------- */
const RoadmapStage = ({ stage, index }) => {
  const isRight = index % 2 === 1;

  return (
    <div className="relative flex flex-col md:flex-row items-center gap-6 md:gap-0">
      <div className={`w-full md:w-1/2 ${isRight ? "md:order-1 md:pl-14" : "md:pr-14 md:text-right"}`}>
        <motion.div
          initial={{ opacity: 0, x: isRight ? 40 : -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{ y: -6 }}
          className="group relative inline-block w-full bg-gray-100 border border-gray-300 p-6 rounded-xl shadow-sm hover:shadow-xl hover:border-transparent transition-all duration-300 overflow-hidden text-left"
        >
          <div
            className={`absolute -top-8 ${
              isRight ? "-left-8" : "-right-8"
            } w-28 h-28 rounded-full bg-gradient-to-br ${stage.theme} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500`}
          />
          <span className="relative z-10 block text-xs font-semibold tracking-widest text-gray-400 uppercase mb-1">
            Stage {String(index + 1).padStart(2, "0")}
          </span>
          <h3
            className={`relative z-10 text-xl font-semibold mb-2 bg-gradient-to-r ${stage.theme} bg-clip-text text-transparent`}
          >
            {stage.title}
          </h3>
          <p className="relative z-10 text-gray-700">{stage.desc}</p>
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
            className={`absolute inset-0 rounded-full bg-gradient-to-br ${stage.theme} blur-md`}
            animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.3, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
          />
          <div
            className={`relative w-14 h-14 rounded-full bg-gradient-to-br ${stage.theme} text-white flex items-center justify-center shadow-lg ring-4 ring-white`}
          >
            {stage.icon}
          </div>
        </motion.div>
      </div>

      {/* mobile icon */}
      <div className="md:hidden">
        <div
          className={`w-14 h-14 rounded-full bg-gradient-to-br ${stage.theme} text-white flex items-center justify-center shadow-lg`}
        >
          {stage.icon}
        </div>
      </div>

      <div className="hidden md:block w-1/2" />
    </div>
  );
};

const IdeaToLaunch = () => (
  <div className="bg-white text-gray-900 py-24 px-6 md:px-20 lg:px-32">
    {/* Header */}
    <header className="text-center mb-24">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.6 }}
        className="text-4xl mt-24 sm:text-5xl md:text-6xl font-bold text-gray-900"
      >
        Idea to <span className="text-blue-600">Launch</span>
      </motion.h1>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-28 h-1 bg-gradient-to-r from-blue-500 via-yellow-400 to-black rounded-full mx-auto mt-4 origin-center"
      />
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
      >
        A proven roadmap from brainstorming to deployment—built on clarity,
        feedback loops, and modern workflows.
      </motion.p>
    </header>

    {/* Roadmap timeline */}
    <section className="relative max-w-5xl mx-auto">
      <div className="hidden md:block absolute left-1/2 top-2 bottom-2 w-0.5 bg-gradient-to-b from-yellow-300 via-purple-300 to-red-300 -translate-x-1/2" />

      <div className="space-y-14 md:space-y-20">
        {stages.map((stage, i) => (
          <RoadmapStage key={i} stage={stage} index={i} />
        ))}
      </div>
    </section>

    {/* Footer quote */}
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
        <p className="relative z-10 text-gray-600 italic max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
          Based on frameworks like Agile, RAD, DevOps, and DevSecOps—this
          model blends key stages, feedback loops, automation, and
          quality-first thinking for reliable delivery.
        </p>
      </div>
    </motion.section>
  </div>
);

export default IdeaToLaunch;