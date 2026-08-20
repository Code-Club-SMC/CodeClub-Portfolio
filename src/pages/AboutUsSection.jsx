import React, { useRef } from "react";
import {
  motion,
  useInView,
  animate,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useEffect, useState } from "react";
import teamImage from "../assets/about/aboutus2.jpg";
import UnlockComponent from "../components/UnlockComponent";
import { FaRocket, FaGlobe, FaUsers, FaArrowRight, FaBullseye } from "react-icons/fa";

/* ---------------------------------------------------
   Shared animation variants
--------------------------------------------------- */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const viewportOnce = { once: true, amount: 0.2 };

const stats = [
  {
    label: "Projects Delivered",
    value: "99+",
    icon: FaRocket,
    theme: "from-blue-500 to-cyan-400",
    ring: "text-blue-500",
  },
  {
    label: "Experts",
    value: "18+",
    icon: FaGlobe,
    theme: "from-yellow-400 to-orange-400",
    ring: "text-yellow-500",
  },
  {
    label: "Client Satisfaction",
    value: "98.95%",
    icon: FaUsers,
    theme: "from-purple-500 to-fuchsia-400",
    ring: "text-purple-500",
  },
];

const tickerWords = [
  "Scalable",
  "Reliable",
  "User-First",
  "Modern Engineering",
  "Built With Care",
  "Startups To Enterprise",
];

/* ---------------------------------------------------
   MagneticButton — pulls toward the cursor on hover,
   with a shine sweep across the surface.
--------------------------------------------------- */
const MagneticButton = ({ children, className, ...props }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.3 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
};

/* ---------------------------------------------------
   TiltCard — subtle 3D tilt that follows the cursor.
--------------------------------------------------- */
const TiltCard = ({ children, className }) => {
  const ref = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springRY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 14);
    rotateX.set(py * -14);
  };
  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX: springRX, rotateY: springRY, transformPerspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ---------------------------------------------------
   Count-up number — resets to 0 and replays the count
   every time it scrolls into view.
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

/* ---------------------------------------------------
   Stat card — tilts toward the cursor, with a drawn-on
   progress ring behind the icon badge.
--------------------------------------------------- */
const StatCard = ({ icon: Icon, theme, ring, value, label }) => (
  <TiltCard className="group relative">
    <motion.div variants={fadeUp} whileHover={{ y: -6 }} className="relative">
      <div
        className={`absolute -inset-1 rounded-2xl bg-gradient-to-r ${theme} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}
      />
      <div className="relative bg-gray-50 border border-gray-200 p-8 rounded-2xl shadow-sm group-hover:shadow-xl group-hover:border-transparent transition-all duration-300 text-center">
        <div className="relative w-14 h-14 mx-auto mb-5">
          <svg className="absolute -inset-3 w-20 h-20 -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="44" fill="none" strokeWidth="4" className="stroke-gray-200" />
            <motion.circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              strokeWidth="4"
              strokeLinecap="round"
              stroke="currentColor"
              className={ring}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 1.3, ease: "easeOut", delay: 0.15 }}
            />
          </svg>
          <div
            className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${theme} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}
          >
            <Icon className="text-white text-xl" />
          </div>
        </div>
        <div className="text-4xl font-bold text-gray-900">
          <CountUp value={value} />
        </div>
        <div className="text-sm mt-3 text-gray-600 uppercase tracking-widest">{label}</div>
      </div>
    </motion.div>
  </TiltCard>
);

/* ---------------------------------------------------
   ValueTicker — infinite marquee of the studio's
   values, bordered like a divider between sections.
--------------------------------------------------- */
const ValueTicker = () => (
  <div className="relative py-6 my-24 border-y border-gray-200 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
    <motion.div
      className="flex w-max gap-10 whitespace-nowrap"
      animate={{ x: ["0%", "-50%"] }}
      transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
    >
      {[...tickerWords, ...tickerWords].map((word, i) => (
        <span
          key={i}
          className="flex items-center gap-10 text-2xl md:text-3xl font-bold uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-400"
        >
          {word}
          <span className="text-blue-400 text-lg">✦</span>
        </span>
      ))}
    </motion.div>
  </div>
);

export default function AboutUsSection() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });
  const blobY = useTransform(heroProgress, [0, 1], [-50, 50]);

  const missionRef = useRef(null);
  const { scrollYProgress: missionProgress } = useScroll({
    target: missionRef,
    offset: ["start 0.8", "end 0.2"],
  });

  return (
    <>
      <div className="relative bg-white text-gray-900 font-body min-h-screen pt-32 pb-20 px-6 md:px-24 overflow-hidden">
        {/* ambient dot-grid backdrop */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-40"
          style={{
            backgroundImage: "radial-gradient(circle, #e5e7eb 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            maskImage:
              "linear-gradient(to bottom, transparent, black 10%, black 85%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, black 10%, black 85%, transparent)",
          }}
        />

        {/* About Us */}
        <section ref={heroRef} className="mb-10 relative">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-14">
            <div className="space-y-6">
              <div>
                <h2 className="text-5xl md:text-6xl font-bold text-gray-900 flex flex-wrap gap-x-4">
                  <motion.span
                    initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={viewportOnce}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  >
                    About
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={viewportOnce}
                    transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
                    className="text-blue-600"
                  >
                    Us
                  </motion.span>
                </h2>
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.6, delay: 0.35 }}
                  className="w-24 h-1 bg-gradient-to-r from-blue-500 via-yellow-400 to-black rounded-full origin-left mt-4"
                />
              </div>

              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                variants={staggerContainer}
                className="space-y-6"
              >
                <motion.p variants={fadeUp} className="text-lg text-gray-600 leading-relaxed">
                  At CodeClub, we build elegant, scalable solutions that power
                  modern businesses. From startups to enterprises, our products
                  are used and loved across industries.
                </motion.p>
                <motion.p variants={fadeUp} className="text-gray-500">
                  With a strong foundation in engineering and a user-first
                  design philosophy, we've helped launch 100+ digital products
                  that actually make an impact.
                </motion.p>
                <motion.div variants={fadeUp}>
                  <MagneticButton className="group relative inline-flex items-center gap-2 overflow-hidden bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-3 rounded-full font-medium shadow-md hover:shadow-xl hover:shadow-blue-300/50 transition-shadow duration-300">
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                    <span className="relative z-10">Learn More</span>
                    <FaArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                  </MagneticButton>
                </motion.div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative flex justify-center md:justify-end"
            >
              <motion.div
                style={{ y: blobY }}
                className="absolute w-72 h-72 rounded-full bg-gradient-to-br from-blue-400 to-yellow-300 opacity-20 blur-3xl"
              />

              <div className="relative w-full max-w-lg">
                <span className="hidden md:block absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-blue-500 rounded-tl-md z-10" />
                <span className="hidden md:block absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-yellow-400 rounded-tr-md z-10" />
                <span className="hidden md:block absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-yellow-400 rounded-bl-md z-10" />
                <span className="hidden md:block absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-blue-500 rounded-br-md z-10" />

                <div className="relative rounded-2xl overflow-hidden shadow-xl group">
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={viewportOnce}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <img
                      src={teamImage}
                      alt="Our Team"
                      className="block w-full h-auto object-cover max-h-[420px] group-hover:scale-105 transition-transform duration-500"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-blue-600/10 group-hover:from-blue-700/30 transition duration-300" />
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={viewportOnce}
                  transition={{ delay: 1.0, duration: 0.5 }}
                  className="hidden md:block absolute -left-10 top-8 z-20"
                >
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                    className="flex items-center gap-3 bg-white rounded-2xl shadow-xl border border-gray-100 px-5 py-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shrink-0">
                      <FaRocket className="text-white text-sm" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-900 leading-none">120+</div>
                      <div className="text-[11px] text-gray-500 uppercase tracking-wide">
                        Projects Delivered
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={viewportOnce}
                  transition={{ delay: 1.25, duration: 0.5 }}
                  className="hidden md:block absolute -right-8 bottom-10 z-20"
                >
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="flex items-center gap-3 bg-white rounded-2xl shadow-xl border border-gray-100 px-5 py-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center shrink-0">
                      <FaGlobe className="text-white text-sm" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-900 leading-none">75+</div>
                      <div className="text-[11px] text-gray-500 uppercase tracking-wide">
                        Clients Worldwide
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Value ticker */}
        <ValueTicker />

        {/* Mission */}
        <section ref={missionRef} className="relative max-w-4xl mx-auto mb-28 text-center overflow-hidden py-4">
          <div className="relative w-14 h-14 mx-auto mb-6">
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: "conic-gradient(from 0deg, #3b82f6, #facc15, #8b5cf6, #3b82f6)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-[3px] rounded-full bg-white flex items-center justify-center">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center">
                <FaBullseye className="text-white text-sm" />
              </div>
            </div>
          </div>

          <div className="relative">
            <span
              aria-hidden="true"
              className="pointer-events-none select-none absolute inset-0 flex items-center justify-center text-[3rem] sm:text-[4.5rem] md:text-[7rem] font-black text-gray-100 whitespace-nowrap -z-10 tracking-tight"
            >
              MISSION
            </span>
            <h3 className="relative text-4xl md:text-5xl font-bold text-gray-900 py-4">
              Our{" "}
              <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                Mission
              </span>
            </h3>
          </div>

          <div className="h-[3px] w-40 mx-auto bg-gray-200 rounded-full overflow-hidden my-8">
            <motion.div
              style={{ scaleX: missionProgress }}
              className="h-full w-full bg-gradient-to-r from-blue-500 via-yellow-400 to-purple-500 origin-left"
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6 }}
            className="relative text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            To create digital solutions that are fast, reliable, and
            genuinely useful — built with care, for real users. We aim to
            empower businesses by crafting technology that solves real
            problems and delivers meaningful impact.
          </motion.p>
        </section>

        {/* Milestones */}
        <section className="relative max-w-6xl mx-auto text-center mb-10 overflow-hidden py-4">
          <motion.div
            className="absolute -top-10 right-0 w-64 h-64 rounded-full bg-purple-200 opacity-20 blur-3xl"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 -left-10 w-64 h-64 rounded-full bg-blue-200 opacity-20 blur-3xl"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />

          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeUp}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 relative inline-block"
          >
            Our <span className="text-blue-600">Milestones</span>
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute -bottom-2 left-0 h-1 w-full bg-gradient-to-r from-blue-500 to-yellow-400 origin-left"
            />
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeUp}
            transition={{ delay: 0.1 }}
            className="relative text-gray-500 text-lg max-w-2xl mx-auto mt-6 mb-14"
          >
            A quick snapshot of what we've achieved so far.
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer}
            className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10"
          >
            {stats.map((stat, i) => (
              <StatCard
                key={i}
                icon={stat.icon}
                theme={stat.theme}
                ring={stat.ring}
                value={stat.value}
                label={stat.label}
              />
            ))}
          </motion.div>
        </section>

      </div>
      <UnlockComponent />
    </>
  );
}