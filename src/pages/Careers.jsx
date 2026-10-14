import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight, FaBriefcase, FaMapPin } from "react-icons/fa";
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
      setError("Unable to load jobs right now. Please try again later.");
      console.error("Jobs fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative w-full h-[80vh] overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={hero}
          alt="Join Team"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 flex flex-col justify-center items-center h-full px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-6"
          >
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-300">
              Careers at CodeClub
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Join Our <span className="text-white/60">Team</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl max-w-2xl leading-relaxed text-gray-300"
          >
            Transform your vision into high-performance software built by people who care.
          </motion.p>
        </div>
      </section>

      <div className="bg-white text-gray-900 min-h-screen pb-20">
        {/* Open Positions */}
        <section className="px-6 md:px-24 py-24">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-10 bg-gray-300" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
                Open Positions
              </span>
              <span className="h-px w-10 bg-gray-300" />
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold">
              We're Hiring
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-gray-500 max-w-2xl mx-auto mt-4">
              We value initiative, ownership, and collaborative problem-solving.
            </motion.p>
          </motion.div>

          {loading ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">Loading open positions...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-red-500 text-lg">{error}</p>
              <button
                onClick={fetchJobs}
                className="mt-4 px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Retry
              </button>
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl text-gray-500">We are not currently hiring</h2>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={staggerContainer}
              className="max-w-4xl mx-auto space-y-4"
            >
              {jobs.map((job, index) => {
                const jobId = job._id || job.id || index;
                return (
                  <motion.div
                    key={jobId}
                    variants={fadeUp}
                    whileHover={{ x: 8 }}
                    transition={{ duration: 0.2 }}
                    className="group flex items-center justify-between bg-white border border-gray-200 rounded-xl px-6 py-5 hover:border-gray-300 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center gap-6">
                      <div>
                        <Link
                          to={`/careers/${jobId}`}
                          state={{ job }}
                          className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors block"
                        >
                          {job.title}
                        </Link>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                          <span className="flex items-center gap-1.5">
                            <FaBriefcase className="text-xs" />
                            {job.department || job.dept || "General"}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <FaMapPin className="text-xs" />
                            {job.location || "Onsite"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Link
                      to={`/careers/${jobId}`}
                      state={{ job }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300"
                    >
                      View Job
                      <FaArrowRight className="text-xs" />
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </section>

        {/* Core Values */}
        <section className="px-6 md:px-24 py-24 bg-gray-50">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-10 bg-gray-300" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
                Why CodeClub
              </span>
              <span className="h-px w-10 bg-gray-300" />
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold">
              Our Core Values
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >
            {[
              { title: "Innovation", desc: "Pushing the tech frontier daily with creative solutions." },
              { title: "Integrity", desc: "Transparent, honest, and client-first in everything we do." },
              { title: "Growth", desc: "Upskill and empower teams to reach their full potential." },
              { title: "Data-Driven", desc: "Turning raw data into actionable insights." },
              { title: "Visibility", desc: "Helping brands get discovered online." },
              { title: "Collaboration", desc: "Working together for better outcomes." },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-white border border-gray-200 rounded-xl p-7 hover:border-gray-300 hover:shadow-md transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>

      <UnlockComponent />
    </>
  );
}
