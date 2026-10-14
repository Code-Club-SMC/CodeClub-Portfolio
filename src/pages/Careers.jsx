import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaBriefcase,
  FaMapPin,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaBuilding,
  FaRocket,
  FaUsers,
  FaLightbulb,
  FaCheckCircle,
} from "react-icons/fa";
import hero from "../assets/home/hero.jpg";
import UnlockComponent from "../components/UnlockComponent";

const API_BASE = import.meta.env.VITE_API_BASE || "https://code-club-portfoliomanager-obqd.vercel.app";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const viewportOnce = { once: true, amount: 0.2 };

export default function CareerPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(`${API_BASE}/api/jobs`);
      if (!res.ok) throw new Error("Failed to fetch jobs");
      const data = await res.json();
      const jobsList = Array.isArray(data) ? data : data.jobs || [];
      setJobs(jobsList);
    } catch (err) {
      setError("Unable to load jobs right now. Please check back shortly.");
      console.error("Jobs fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#fafbfc] min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[75vh] md:h-[80vh] overflow-hidden">
        <motion.img
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          src={hero}
          alt="Careers at Code Club"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/80 via-black/75 to-[#001c3d]/90" />

        <div className="relative z-10 flex flex-col justify-center items-center h-full px-6 text-center text-white max-w-5xl mx-auto pt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold uppercase tracking-widest mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            We Are Hiring
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            Build The Future <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">With Us</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-base md:text-xl text-gray-300 max-w-2xl leading-relaxed"
          >
            Join a dynamic team of builders, creators, and engineers shaping tomorrow's software, AI, and digital experiences.
          </motion.p>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="px-6 md:px-16 lg:px-24 py-24 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-12 bg-blue-600" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-blue-600">
              Current Openings
            </span>
            <span className="h-px w-12 bg-blue-600" />
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Explore Opportunities
          </motion.h2>
          <motion.p variants={fadeUp} className="text-base md:text-lg text-gray-500 max-w-xl mx-auto mt-4">
            Find the role that fits your passion and take your career to the next level at Code Club.
          </motion.p>
        </motion.div>

        {loading ? (
          <div className="text-center py-24">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-3 border-blue-600/30 border-t-blue-600 rounded-full mx-auto mb-4"
            />
            <p className="text-gray-500 text-sm font-medium">Loading open roles...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16 bg-white border border-gray-200 rounded-3xl max-w-md mx-auto p-8 shadow-sm">
            <p className="text-red-500 text-sm mb-4">{error}</p>
            <button
              onClick={fetchJobs}
              className="px-6 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-sm font-medium transition-colors"
            >
              Retry
            </button>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-20 bg-white border border-gray-100 rounded-3xl p-12 max-w-md mx-auto shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-2">No Active Openings</h3>
            <p className="text-gray-500 text-sm">
              We aren't actively recruiting for new roles right now, but we are always excited to hear from talented individuals.
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Contact Us <FaArrowRight className="text-xs" />
            </Link>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer}
            className="grid gap-6 max-w-5xl mx-auto"
          >
            {jobs.map((job, index) => {
              const jobId = job.id || job._id || index;
              const skillsList = typeof job.skills === "string"
                ? job.skills.split(",").map((s) => s.trim()).filter(Boolean).slice(0, 5)
                : Array.isArray(job.skills) ? job.skills.slice(0, 5) : [];

              return (
                <motion.div
                  key={jobId}
                  variants={fadeUp}
                  className="group bg-white border border-gray-200/90 hover:border-blue-400/80 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  {/* Left accent bar on hover */}
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="space-y-3.5 flex-1">
                    {/* Badges bar */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/60">
                        <FaBuilding className="text-[10px]" />
                        {job.company || "Code Club"}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-gray-100 text-gray-700">
                        <FaBriefcase className="text-[10px]" />
                        {job.job_type || "Full-time"}
                      </span>
                      {job.salary && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                          <FaMoneyBillWave className="text-[10px]" />
                          {job.salary}
                        </span>
                      )}
                    </div>

                    {/* Job Title */}
                    <Link
                      to={`/careers/${jobId}`}
                      state={{ job }}
                      className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors block leading-tight"
                    >
                      {job.title}
                    </Link>

                    {/* Metadata (Location & Deadline) */}
                    <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <FaMapPin className="text-gray-400 text-xs" />
                        {job.location || "Peshawar, Pakistan"}
                      </span>
                      {job.deadline && (
                        <span className="flex items-center gap-1.5">
                          <FaCalendarAlt className="text-gray-400 text-xs" />
                          Apply by: {new Date(job.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                      )}
                    </div>

                    {/* Skills pills */}
                    {skillsList.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {skillsList.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-50 text-gray-600 border border-gray-100"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* View Details Action Button */}
                  <div className="flex-shrink-0 pt-2 md:pt-0">
                    <Link
                      to={`/careers/${jobId}`}
                      state={{ job }}
                      className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gray-900 group-hover:bg-blue-600 text-white font-medium text-sm transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:shadow-blue-600/25 w-full md:w-auto"
                    >
                      View Position
                      <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </section>

      {/* Why Code Club / Values */}
      <section className="px-6 md:px-16 lg:px-24 py-24 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-10 bg-gray-300" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-gray-500">
                Our Values
              </span>
              <span className="h-px w-10 bg-gray-300" />
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
              Life at Code Club
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base md:text-lg text-gray-500 max-w-xl mx-auto mt-4">
              We empower our team to solve complex problems and build meaningful software with high ownership.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              {
                icon: <FaRocket className="text-blue-600" />,
                title: "Bold Innovation",
                desc: "We build modern software with the latest stacks, encouraging experimentation and curiosity.",
              },
              {
                icon: <FaCheckCircle className="text-emerald-600" />,
                title: "Quality & Craft",
                desc: "We take deep pride in clean architecture, delightful user interfaces, and robust systems.",
              },
              {
                icon: <FaUsers className="text-purple-600" />,
                title: "Collaborative Team",
                desc: "An open environment where every voice is heard, valued, and encouraged to contribute.",
              },
              {
                icon: <FaLightbulb className="text-amber-500" />,
                title: "Continuous Growth",
                desc: "Mentorship, hands-on learning, and regular skill-up sessions to accelerate your career.",
              },
              {
                icon: <FaBriefcase className="text-cyan-600" />,
                title: "High Ownership",
                desc: "Own your features from design through implementation and directly impact real clients.",
              },
              {
                icon: <FaBuilding className="text-rose-600" />,
                title: "Work-Life Harmony",
                desc: "A respectful, supportive setting that values your time, energy, and personal well-being.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-[#fafbfc] border border-gray-200/80 rounded-2xl p-7 hover:border-gray-300 hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-xl mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA */}
      <UnlockComponent />
    </div>
  );
}
