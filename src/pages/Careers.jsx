import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight, FaTimes, FaPaperPlane, FaBriefcase, FaMapPin } from "react-icons/fa";
import hero from "../assets/home/hero.jpg";
import UnlockComponent from "../components/UnlockComponent";

const jobs = [
  { title: "Web Scraper", dept: "Engineering", location: "Onsite" },
  { title: "SEO Expert", dept: "Marketing", location: "Onsite" },
  { title: "Machine Learning Intern", dept: "Tech", location: "Onsite" },
  { title: "Social Media Handler", dept: "Marketing", location: "Onsite" },
];

const coreValues = [
  { title: "Innovation", desc: "Pushing the tech frontier daily with creative solutions." },
  { title: "Integrity", desc: "Transparent, honest, and client-first in everything we do." },
  { title: "Growth", desc: "Upskill and empower teams to reach their full potential." },
  { title: "Data-Driven", desc: "Turning raw data into actionable insights." },
  { title: "Visibility", desc: "Helping brands get discovered online." },
  { title: "Collaboration", desc: "Working together for better outcomes." },
];

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
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [isHiring] = useState(true);

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    const message = `*Job Application for:* ${selectedJob.title}%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Phone:* ${formData.phone}`;
    window.open(`https://wa.me/923003404342?text=${message}`, "_blank");
    setShowModal(false);
    setFormData({ name: "", email: "", phone: "" });
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

          {isHiring ? (
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={staggerContainer}
              className="max-w-4xl mx-auto space-y-4"
            >
              {jobs.map((job, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.2 }}
                  className="group flex items-center justify-between bg-white border border-gray-200 rounded-xl px-6 py-5 hover:border-gray-300 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {job.title}
                      </h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                        <span className="flex items-center gap-1.5">
                          <FaBriefcase className="text-xs" />
                          {job.dept}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <FaMapPin className="text-xs" />
                          {job.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleApplyClick(job)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300"
                  >
                    Apply
                    <FaArrowRight className="text-xs" />
                  </button>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl text-gray-500">We are not currently hiring</h2>
            </div>
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
            {coreValues.map((item, i) => (
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

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl w-full max-w-md p-8 relative"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                <FaTimes className="text-gray-500" />
              </button>

              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {selectedJob?.title}
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Fill out the form and we'll get back to you.
              </p>

              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-gray-400 transition-colors"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-gray-400 transition-colors"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-gray-400 transition-colors"
                  required
                />
                <button
                  onClick={handleSubmit}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Send via WhatsApp
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <UnlockComponent />
    </>
  );
}