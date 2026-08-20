import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { serviceMap } from "./ServiceData";
import { motion, useInView, animate } from "framer-motion";
import {
  FaLinkedin,
  FaShoppingCart,
  FaFileAlt,
  FaUsers,
  FaLaptopCode,
  FaChartLine,
  FaShieldAlt,
  FaCloud,
  FaCogs,
  FaCheckCircle,
  FaDollarSign,
  FaHeartbeat,
  FaShoppingBag,
  FaBriefcase,
  FaArrowRight,
} from "react-icons/fa";

/* ---------------------------------------------------
   Shared animation variants — reused across the page so
   every section feels consistent.
--------------------------------------------------- */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const viewportOnce = { once: true, amount: 0.2 };

/* ---------------------------------------------------
   Tech ribbon icon
--------------------------------------------------- */
const TechComp = ({ icon, name }) => {
  return (
    <div
      title={name}
      className="flex-shrink-0 flex flex-col items-center justify-center bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mx-2 md:mx-3 lg:mx-4"
    >
      <div className="flex items-center justify-center w-[65%] h-[65%]">
        <img src={icon} alt={name} className="w-full h-full object-contain" />
      </div>
    </div>
  );
};

/* ---------------------------------------------------
   Feature Card — bento-style with icon badge, accent
   glow border and animated checklist.
--------------------------------------------------- */
const featureIcons = [
  FaShoppingCart,
  FaFileAlt,
  FaUsers,
  FaLaptopCode,
  FaChartLine,
  FaShieldAlt,
  FaCloud,
  FaCogs,
];

const featureThemes = [
  { grad: "from-blue-500 to-cyan-400", glow: "group-hover:shadow-blue-300/60" },
  { grad: "from-purple-500 to-fuchsia-400", glow: "group-hover:shadow-purple-300/60" },
  { grad: "from-emerald-500 to-teal-400", glow: "group-hover:shadow-emerald-300/60" },
];

const FeatureCard = ({ title, items, idx = 0 }) => {
  const Icon = featureIcons[idx % featureIcons.length];
  const theme = featureThemes[idx % featureThemes.length];

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -10 }}
      className={`group relative w-full rounded-3xl bg-white border border-gray-100 shadow-md hover:shadow-2xl ${theme.glow} transition-all duration-500 overflow-hidden p-6 md:p-8`}
    >
      {/* decorative blurred blob */}
      <div
        className={`absolute -top-10 -right-10 w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br ${theme.grad} opacity-10 group-hover:opacity-20 blur-2xl transition-opacity duration-500`}
      />

      <div
        className={`relative z-10 w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-br ${theme.grad} flex items-center justify-center shadow-lg mb-4 md:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}
      >
        <Icon className="text-white text-xl md:text-2xl" />
      </div>

      <h2 className="relative z-10 text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-4 md:mb-5">
        {title}
      </h2>

      <ul className="relative z-10 space-y-2 md:space-y-3">
        {items.map((item, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ delay: index * 0.08, duration: 0.4 }}
            className="flex items-start gap-2 md:gap-3 text-gray-600 text-sm md:text-base lg:text-lg"
          >
            <FaCheckCircle className={`mt-1 flex-shrink-0 text-transparent bg-clip-text bg-gradient-to-br ${theme.grad}`} />
            <span>{item}</span>
          </motion.li>
        ))}
      </ul>

      {/* bottom accent line that grows on hover */}
      <div
        className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full bg-gradient-to-r ${theme.grad} transition-all duration-500`}
      />
    </motion.div>
  );
};

/* ---------------------------------------------------
   Industry card — glowing "aura" card
--------------------------------------------------- */
const auraThemes = [
  {
    grad: "from-blue-500 via-cyan-400 to-blue-500",
    text: "text-blue-300",
    ring: "group-hover:ring-blue-400/50",
  },
  {
    grad: "from-purple-500 via-fuchsia-400 to-purple-500",
    text: "text-purple-300",
    ring: "group-hover:ring-purple-400/50",
  },
  {
    grad: "from-emerald-500 via-teal-400 to-emerald-500",
    text: "text-emerald-300",
    ring: "group-hover:ring-emerald-400/50",
  },
];

const pickIndustryIcon = (title = "") => {
  const t = title.toLowerCase();
  if (t.includes("fin")) return FaDollarSign;
  if (t.includes("health")) return FaHeartbeat;
  if (t.includes("commerce") || t.includes("retail")) return FaShoppingBag;
  return FaBriefcase;
};

const IndComp = ({ title, items, idx = 0 }) => {
  const theme = auraThemes[idx % auraThemes.length];
  const Icon = pickIndustryIcon(title);

  return (
    <motion.div variants={fadeUp} className="group relative">
      {/* pulsing aura glow behind the card */}
      <motion.div
        className={`absolute -inset-1 rounded-3xl bg-gradient-to-r ${theme.grad} opacity-30 blur-xl group-hover:opacity-60 transition-opacity duration-500`}
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div
        className={`relative w-full rounded-3xl bg-gray-900 ring-1 ring-white/10 ${theme.ring} p-6 md:p-8 transition-all duration-500 group-hover:-translate-y-2`}
      >
        <div
          className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br ${theme.grad} flex items-center justify-center mb-4 md:mb-6 shadow-lg`}
        >
          <Icon className="text-white text-lg md:text-xl" />
        </div>

        <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-white mb-4 md:mb-5">{title}</h2>

        <ul className="space-y-2 md:space-y-3">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-center gap-2 md:gap-3 text-gray-300 text-sm md:text-base lg:text-lg"
            >
              <FaArrowRight className={`${theme.text} flex-shrink-0 text-xs md:text-sm`} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

/* ---------------------------------------------------
   Count-up number — resets to 0 and replays the count
   every single time it scrolls into view.
--------------------------------------------------- */
const CountUp = ({ value }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.6 });
  const [display, setDisplay] = useState("0");

  const match = String(value).match(/(\d+)(.*)/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, target, {
        duration: 1.6,
        ease: "easeOut",
        onUpdate: (v) => setDisplay(Math.floor(v).toString()),
      });
      return () => controls.stop();
    } else {
      setDisplay("0");
    }
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
};

const StatsMain = ({ number, label, title, description }) => {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -8, scale: 1.03 }}
      className="bg-transparent rounded-xl p-4 md:p-6 w-full shadow-md hover:shadow-2xl transition-all duration-300 ease-in-out"
    >
      <div className="relative text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-2">
        <CountUp value={number} />
      </div>
      <p className="uppercase text-[10px] md:text-xs tracking-widest text-gray-600 mb-3 md:mb-4">
        {label}
      </p>
      <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-700 mb-2">{title}</h3>
      <p className="text-sm md:text-base lg:text-lg text-gray-700">{description}</p>
    </motion.div>
  );
};

/* ---------------------------------------------------
   Team card — flips on hover to reveal bio + linkedin
--------------------------------------------------- */
const teamThemes = [
  "from-yellow-400 to-orange-400",
  "from-blue-400 to-indigo-500",
  "from-pink-400 to-rose-500",
  "from-emerald-400 to-teal-500",
];

const getInitials = (name = "") =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const TeamCard = ({ member, idx }) => {
  const theme = teamThemes[idx % teamThemes.length];

  return (
    <motion.div variants={fadeUp} className="group [perspective:1200px] h-64 md:h-72 lg:h-80">
      <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* Front */}
        <div className="absolute inset-0 [backface-visibility:hidden] bg-white rounded-2xl shadow-md hover:shadow-xl flex flex-col items-center justify-center p-4 md:p-8 text-center">
          <div
            className={`w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br ${theme} flex items-center justify-center text-white text-2xl md:text-3xl font-bold shadow-lg mb-3 md:mb-5`}
          >
            {getInitials(member.name)}
          </div>
          <h2 className="text-base md:text-lg lg:text-xl font-semibold text-gray-800">
            {member.name}
          </h2>
          <p className={`text-sm md:text-base font-medium bg-gradient-to-r ${theme} bg-clip-text text-transparent`}>
            {member.role}
          </p>
        </div>

        {/* Back */}
        <div
          className={`absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl shadow-xl bg-gradient-to-br ${theme} flex flex-col items-center justify-center p-4 md:p-8 text-center text-white`}
        >
          <h2 className="text-base md:text-lg lg:text-xl font-semibold mb-2">{member.name}</h2>
          {member.bio && (
            <p className="text-xs md:text-sm text-white/90 leading-relaxed">
              {member.bio}
            </p>
          )}
          {member.linkedin && (
            <motion.a
              whileHover={{ scale: 1.2, rotate: 8 }}
              whileTap={{ scale: 0.9 }}
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center mt-4 md:mt-6 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              <FaLinkedin size={16} className="md:w-5 md:h-5" />
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

/* ---------------------------------------------------
   Final CTA — animated aura background
--------------------------------------------------- */
const ServiceUnlockComponent = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={fadeUp}
      className="relative text-center py-16 md:py-20 lg:py-24 px-4 md:px-6 lg:px-20 xl:px-40 bg-gray-950 overflow-hidden"
    >
      {/* rotating conic aura */}
      <motion.div
        className="absolute left-1/2 top-1/2 w-[600px] h-[600px] md:w-[700px] md:h-[700px] lg:w-[900px] lg:h-[900px] -translate-x-1/2 -translate-y-1/2 opacity-30"
        style={{
          background:
            "conic-gradient(from 0deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)",
          filter: "blur(120px)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      {/* floating particles */}
      {[...Array(10)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-white/40"
          style={{
            left: `${(i * 37) % 100}%`,
            top: `${(i * 53) % 100}%`,
          }}
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{
            duration: 4 + (i % 3),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}

      <motion.h2
        variants={fadeUp}
        className="relative z-10 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 md:mb-10 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent"
      >
        Unlock the potential of your business with our expert services.
      </motion.h2>

      <motion.div variants={scaleIn} className="relative z-10 inline-block">
        <Link to="/contact" className="group relative inline-block">
          {/* pulsing glow ring */}
          <motion.span
            className="absolute inset-0 rounded-full bg-blue-500 blur-lg"
            animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.08, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="relative flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-base md:text-lg lg:text-xl font-semibold py-2.5 md:py-3 px-6 md:px-10 rounded-full shadow-lg group-hover:scale-105 transition-transform duration-300">
            Contact Us
            <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
          </span>
        </Link>
      </motion.div>
    </motion.div>
  );
};

const Service = () => {
  const { slug } = useParams();
  const currentService = serviceMap[slug];

  if (!currentService) {
    return (
      <div className="text-center text-red-500 mt-20 md:mt-24">Service not found.</div>
    );
  }

  const [selected, setSelected] = useState("");

  useEffect(() => {
    if (currentService && currentService.techStack) {
      const keys = Object.keys(currentService.techStack);
      if (keys.length > 0) {
        setSelected(keys[0]); // always select the first key of the current service
      } else {
        setSelected(""); // reset if no techStack
      }
    }
  }, [slug]);

  const ribbonIcons = currentService.techStack?.[selected] || [];

  return (
    <div className="mt-14 md:mt-16 lg:mt-20 py-6 md:py-10">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full overflow-hidden -mt-px"
        style={{ 
          aspectRatio: "4/1",
          maxHeight: "400px",
          backgroundColor: "#0f1535",
        }}
      >
        <div
          style={{
            backgroundImage: `url(${currentService.bgImage})`,
          }}
          className="w-full h-full bg-cover bg-center bg-no-repeat"
        />
      </motion.section>

      {/* Features Section */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-20 py-10 md:py-16 lg:py-20">
        <motion.h1
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={fadeUp}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight uppercase relative inline-block"
        >
          {currentService.title} Expertise
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute -bottom-2 left-0 h-1 w-full bg-blue-500 origin-left"
          />
        </motion.h1>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 lg:gap-10 mt-10 md:mt-14"
        >
          {currentService.features.map((feature, idx) => (
            <FeatureCard
              key={idx}
              idx={idx}
              title={feature.title}
              items={feature.items}
            />
          ))}
        </motion.div>
      </div>

      {/* Tech Stack Section */}
      <div className="flex flex-col gap-6 md:gap-8 w-full h-full bg-indigo-900 text-white px-4 sm:px-6 md:px-10 lg:px-20 py-10 md:py-16 lg:py-20">
        <motion.h1
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={fadeUp}
          className="text-center uppercase font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
        >
          Our Tech Stack
        </motion.h1>

        {/* Tabs */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="flex flex-wrap justify-center items-center text-xs sm:text-sm gap-2 md:gap-3"
        >
          {Object.keys(currentService.techStack).map((key) => {
            const label = key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase());

            return (
              <motion.div variants={fadeUp} className="flex items-center" key={key}>
                <input
                  type="radio"
                  name="options"
                  id={key}
                  className="hidden peer"
                  checked={selected === key}
                  onChange={() => setSelected(key)}
                />
                <motion.label
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                  htmlFor={key}
                  className="cursor-pointer rounded-full py-1.5 md:py-2 px-4 md:px-6 text-sm md:text-base lg:text-lg transition-colors duration-200 peer-checked:bg-indigo-600 peer-checked:text-white bg-indigo-800 text-gray-300"
                >
                  {label}
                </motion.label>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Tech Ribbon — centered, infinite, responsive width, fades at both ends */}
        <div className="mx-auto mt-4 w-full sm:w-[80vw] md:w-[70vw] lg:w-[60vw] min-w-[280px] max-w-[900px] overflow-hidden rounded-[20px] md:rounded-[28px] border border-white/10 bg-white/5 shadow-[0_20px_60px_rgba(15,23,42,0.45)] backdrop-blur-sm [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          {ribbonIcons.length > 0 && (
            <div
              className="flex items-center py-3 md:py-5"
              style={{
                animation: "tech-scroll linear infinite",
                animationDuration: `${Math.max(ribbonIcons.length * 3, 14)}s`,
                width: "max-content",
                willChange: "transform",
              }}
            >
              {[...ribbonIcons, ...ribbonIcons].map(({ icon, name }, index) => (
                <div key={`${selected}-${index}`} className="flex-shrink-0">
                  <TechComp icon={icon} name={name} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Industries Section */}
      {currentService.industries && currentService.industries.length > 0 && (
        <div className="w-full h-full px-4 sm:px-6 md:px-10 lg:px-20 py-10 md:py-16 lg:py-20 bg-gray-950">
          <motion.h1
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeUp}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight uppercase"
          >
            Our Expertise Extends Across <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Industries
            </span>
          </motion.h1>
          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeUp}
            transition={{ delay: 0.15 }}
            className="w-full lg:w-2/3 mt-4 md:mt-5 text-gray-400 text-base md:text-lg lg:text-xl tracking-wider"
          >
            We have extensive experience across a wide range of industries. No
            matter your niche, partnering with us ensures high-quality,
            innovative solutions.
          </motion.p>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10 lg:gap-14 mt-10 md:mt-16"
          >
            {currentService.industries.map((section, index) => (
              <IndComp
                key={index}
                idx={index}
                title={section.title}
                items={section.items}
              />
            ))}
          </motion.div>
        </div>
      )}

      {/* Team Members Section */}
      <div className="bg-gray-100 py-10 md:py-16 px-4 sm:px-6 md:px-10 lg:px-20">
        <motion.h1
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={fadeUp}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-8 md:mb-10 text-center"
        >
          Meet the Team
        </motion.h1>
  
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10 lg:gap-12 max-w-6xl mx-auto"
        >
          {currentService.team.map((member, idx) => (
            <TeamCard key={idx} member={member} idx={idx} />
          ))}
        </motion.div>
      </div>

      {/* Stats Section */}
      <div className="bg-blue-100 p-4 sm:p-6 md:p-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 mt-6 md:mt-10 w-full h-full px-2 sm:px-4 md:px-10 py-6 md:py-10"
        >
          <StatsMain
            number="99+"
            label="COMPLETED PROJECTS"
            title="Successfully Delivered Projects"
            description="We've helped numerous startups and established businesses to launch their products or revise existing solutions."
          />
          <StatsMain
            number="18+"
            label="EXPERTS"
            title="Industry Experts"
            description="Our commitment to excellence is proven by the satisfaction of our diverse client base."
          />
          <StatsMain
            number="98.95%"
            label="CLIENT SATISFACTION"
            title="Happy Clients"
            description="Our team consists of skilled professionals with years of experience in the industry."
          />
        </motion.div>
      </div>

      <ServiceUnlockComponent />
    </div>
  );
};

export default Service;