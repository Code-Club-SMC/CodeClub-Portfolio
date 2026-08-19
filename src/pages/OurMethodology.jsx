import React from "react";
import { motion } from "framer-motion";
import scrumCycle from "../assets/about/development.avif";
import agileIcons from "../assets/about/collabaration.webp";
import methodologyImage from "../assets/about/methodolgy.jpg";
import {
  FaClipboardList,
  FaComments,
  FaClipboardCheck,
  FaUserTie,
  FaUsersCog,
  FaCode,
  FaQuoteLeft,
  FaBullseye,
  FaBolt,
  FaChartLine,
} from "react-icons/fa";

/* ---------------------------------------------------
   Shared animation variants
--------------------------------------------------- */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.2 },
  },
};

const viewportOnce = { once: true, amount: 0.2 };

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

/* Reusable animated section heading with the sliding underline */
const SectionHeading = ({ eyebrow, title, highlight, description }) => (
  <div className="text-center mb-14">
    <motion.h2
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={fadeUp}
      className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 relative inline-block"
    >
      {title} <span className="text-blue-600">{highlight}</span>
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute -bottom-2 left-0 h-1 w-full bg-gradient-to-r from-blue-500 to-yellow-400 origin-left"
      />
    </motion.h2>
    {description && (
      <motion.p
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={fadeUp}
        transition={{ delay: 0.1 }}
        className="text-lg text-gray-600 max-w-2xl mx-auto mt-6"
      >
        {description}
      </motion.p>
    )}
  </div>
);

/* ---------------------------------------------------
   Sprint step — numbered timeline card
--------------------------------------------------- */
const sprintIcons = [FaClipboardList, FaComments, FaClipboardCheck];
const sprintThemes = [
  "from-blue-500 to-cyan-400",
  "from-yellow-400 to-orange-400",
  "from-purple-500 to-fuchsia-400",
];

const SprintStep = ({ title, desc, i, isLast }) => {
  const Icon = sprintIcons[i % sprintIcons.length];
  const theme = sprintThemes[i % sprintThemes.length];

  return (
    <motion.div
      custom={i}
      initial="hidden"
      whileInView="visible"
      variants={cardVariant}
      viewport={viewportOnce}
      className="relative pl-20"
    >
      {/* connecting line */}
      {!isLast && (
        <span className="absolute left-[27px] top-14 w-0.5 h-[calc(100%+1rem)] bg-gradient-to-b from-gray-300 to-transparent" />
      )}

      {/* number badge */}
      <div
        className={`absolute left-0 top-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${theme} flex items-center justify-center shadow-lg text-white font-bold text-lg`}
      >
        <Icon className="text-xl" />
      </div>

      <div className="group p-6 bg-gray-50 rounded-2xl border border-gray-200 hover:border-transparent hover:shadow-xl transition-all duration-300 relative overflow-hidden">
        <div
          className={`absolute -right-8 -top-8 w-24 h-24 rounded-full bg-gradient-to-br ${theme} opacity-0 group-hover:opacity-15 blur-xl transition-opacity duration-500`}
        />
        <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
          Step {String(i + 1).padStart(2, "0")}
        </span>
        <h3 className="text-xl font-semibold text-gray-900 mt-1 mb-2">
          {title}
        </h3>
        <p className="text-gray-600 text-sm">{desc}</p>
      </div>
    </motion.div>
  );
};

/* ---------------------------------------------------
   Role card — aura glow, icon badge
--------------------------------------------------- */
const roleIcons = [FaUserTie, FaUsersCog, FaCode];
const roleThemes = [
  { grad: "from-blue-500 via-cyan-400 to-blue-500", ring: "group-hover:ring-blue-400/50" },
  { grad: "from-yellow-400 via-orange-400 to-yellow-400", ring: "group-hover:ring-orange-400/50" },
  { grad: "from-purple-500 via-fuchsia-400 to-purple-500", ring: "group-hover:ring-purple-400/50" },
];

const RoleCard = ({ role, detail, i }) => {
  const Icon = roleIcons[i % roleIcons.length];
  const theme = roleThemes[i % roleThemes.length];

  return (
    <motion.div
      custom={i}
      initial="hidden"
      whileInView="visible"
      variants={cardVariant}
      viewport={viewportOnce}
      className="group relative"
    >
      <motion.div
        className={`absolute -inset-1 rounded-2xl bg-gradient-to-r ${theme.grad} opacity-20 blur-xl group-hover:opacity-50 transition-opacity duration-500`}
        animate={{ opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
      />
      <div
        className={`relative p-6 bg-white rounded-2xl border border-gray-200 ring-1 ring-transparent ${theme.ring} hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex items-start gap-4`}
      >
        <div
          className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${theme.grad} flex items-center justify-center shadow-md`}
        >
          <Icon className="text-white text-lg" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{role}</h3>
          <p className="text-gray-600 text-sm">{detail}</p>
        </div>
      </div>
    </motion.div>
  );
};

const OurMethodology = () => {
  return (
    <div className="bg-white text-gray-900 min-h-screen pt-32 pb-20 px-4 md:px-24 overflow-hidden">
      {/* Our Methodology Section */}
      <section className="mb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          {/* Text Section */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer}
          >
            <motion.h1
              variants={fadeUp}
              className="text-4xl  md:text-6xl font-bold text-gray-900 mb-3"
            >
              Our <span className="text-blue-600">Methodology</span>
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-28 h-1 bg-gradient-to-r from-blue-500 via-yellow-400 to-black rounded-full mb-6 origin-left"
            />
            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl"
            >
              Agile and Scrum shape how we build — iterative, adaptive, and
              focused on delivering actual value, not just features.
            </motion.p>
          </motion.div>

          {/* Image with soft floating aura */}
          <div className="relative flex justify-center md:justify-end">
            <motion.div
              className="absolute w-72 h-72 rounded-full bg-gradient-to-br from-blue-400 to-yellow-300 opacity-20 blur-3xl"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.img
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.7, ease: "easeOut" }}
              src={methodologyImage}
              alt="Methodology"
              className="relative w-full max-w-md md:max-w-lg rounded-2xl object-cover shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Visual Banner */}
      <motion.section
        initial={{ opacity: 0, scale: 1.03 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.8 }}
        className="relative mb-28"
      >
        <img
          src={scrumCycle}
          alt="Agile Visual"
          className="rounded-xl mx-auto w-full max-w-screen max-h-screen object-cover shadow-xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10 rounded-xl flex items-center justify-center">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white text-2xl md:text-4xl font-semibold px-6 text-center"
          >
            Building Together. Learning Fast. Delivering Value.
          </motion.h3>
        </div>
      </motion.section>

      {/* Sprint-Based Development */}
      <section className="mb-28">
        <SectionHeading
          title="Sprint-Based"
          highlight="Development"
          description="Short sprints help us build incrementally, stay on track, and continuously improve."
        />

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.img
            src={scrumCycle}
            alt="Scrum Cycle"
            className="rounded-xl w-full shadow-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6 }}
          />

          <div className="grid gap-10">
            {[
              {
                title: "Planning",
                desc: "Define the sprint goal, select backlog items, and align the team.",
              },
              {
                title: "Daily Standups",
                desc: "Quick sync-ups to track progress and clear obstacles.",
              },
              {
                title: "Sprint Review",
                desc: "Show what’s done, gather feedback, and improve.",
              },
            ].map((item, i, arr) => (
              <SprintStep
                key={i}
                i={i}
                title={item.title}
                desc={item.desc}
                isLast={i === arr.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Roles & Collaboration */}
      <section className="mb-28">
        <SectionHeading
          title="Roles &"
          highlight="Collaboration"
          description="Agile puts people first. Every role matters in a high-performing team."
        />

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="grid gap-6">
            {[
              {
                role: "Product Owner",
                detail:
                  "Drives the vision, prioritizes work, and ensures business value.",
              },
              {
                role: "Scrum Master",
                detail:
                  "Guides the process, clears blockers, and supports the team.",
              },
              {
                role: "Development Team",
                detail: "Builds, tests, and delivers high-quality solutions.",
              },
            ].map((item, i) => (
              <RoleCard key={i} i={i} role={item.role} detail={item.detail} />
            ))}
          </div>

          <motion.img
            src={agileIcons}
            alt="Agile Roles"
            className="rounded-xl w-full shadow-lg"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6 }}
          />
        </div>
      </section>

      {/* Why It Works */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={fadeUp}
        className="relative text-center rounded-3xl overflow-hidden bg-gray-950 py-20 px-6"
      >
        {/* rotating aura */}
        <motion.div
          className="absolute left-1/2 top-1/2 w-[700px] h-[700px] -translate-x-1/2 -translate-y-1/2 opacity-25"
          style={{
            background:
              "conic-gradient(from 0deg, #3b82f6, #facc15, #8b5cf6, #3b82f6)",
            filter: "blur(110px)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        />

        <div className="relative z-10">
          <FaQuoteLeft className="text-blue-400 text-4xl mx-auto mb-6 opacity-70" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Why <span className="text-blue-400">It Works</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-4xl mx-auto mb-10">
            Agile keeps us focused. Scrum keeps us sharp. Together, they drive
            delivery, accountability, and constant improvement.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {[
              { label: "Focus", icon: FaBullseye },
              { label: "Sharp", icon: FaBolt },
              { label: "Delivery", icon: FaChartLine },
            ].map(({ label, icon: Icon }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ delay: 0.15 * i, duration: 0.5 }}
                whileHover={{ scale: 1.06, y: -3 }}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 ring-1 ring-white/10 text-white backdrop-blur-sm"
              >
                <Icon className="text-blue-400" />
                <span className="font-medium">{label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default OurMethodology;