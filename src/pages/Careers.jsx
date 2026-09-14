import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight, FaTimes, FaPaperPlane, FaBriefcase, FaMapPin, FaBuilding, FaUser, FaEnvelope, FaPhone, FaLinkedin, FaFilePdf } from "react-icons/fa";
import hero from "../assets/home/hero.jpg";
import UnlockComponent from "../components/UnlockComponent";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

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
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobDetails, setJobDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", linkedin: "", coverLetter: "" });
  const [resumeFile, setResumeFile] = useState(null);
  const [applyLoading, setApplyLoading] = useState(false);
  const [applyError, setApplyError] = useState("");
  const [applySuccess, setApplySuccess] = useState("");

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

  const handleJobClick = async (job) => {
    setSelectedJob(job);
    setShowModal(true);
    setJobDetails(null);
    setDetailsLoading(true);
    setApplyError("");
    setApplySuccess("");

    try {
      const res = await fetch(`${API_BASE}/api/jobs/${job._id || job.id}`);
      if (!res.ok) throw new Error("Failed to fetch job details");
      const data = await res.json();
      setJobDetails(data.job || data);
    } catch (err) {
      console.error("Job details fetch error:", err);
      setJobDetails(job);
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleResumeChange = (e) => {
    const file = e.target.files?.[0];
    setResumeFile(file || null);
  };

  const handleApply = async (e) => {
    e.preventDefault();
    setApplyLoading(true);
    setApplyError("");
    setApplySuccess("");

    try {
      const payload = new FormData();
      payload.append("job_id", selectedJob._id || selectedJob.id);
      payload.append("name", formData.name);
      payload.append("email", formData.email);
      payload.append("phone", formData.phone);
      payload.append("linkedin", formData.linkedin);
      payload.append("cover_letter", formData.coverLetter);
      if (resumeFile) {
        payload.append("resume", resumeFile);
      }

      const res = await fetch(`${API_BASE}/api/applications`, {
        method: "POST",
        body: payload,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Application failed");

      setApplySuccess("Application submitted successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", phone: "", linkedin: "", coverLetter: "" });
      setResumeFile(null);
    } catch (err) {
      setApplyError(err.message || "Something went wrong. Please try again.");
    } finally {
      setApplyLoading(false);
    }
  };

  const displayJob = jobDetails || selectedJob;

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
              {jobs.map((job, index) => (
                <motion.div
                  key={job._id || job.id || index}
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
                          {job.department || job.dept || "General"}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <FaMapPin className="text-xs" />
                          {job.location || "Onsite"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleJobClick(job)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300"
                  >
                    View Details
                    <FaArrowRight className="text-xs" />
                  </button>
                </motion.div>
              ))}
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

      {/* Job Details Modal */}
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
               className="bg-white rounded-2xl w-full max-w-2xl p-6 md:p-8 relative"
             >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                <FaTimes className="text-gray-500" />
              </button>

              {detailsLoading ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Loading job details...</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    <FaBuilding className="text-gray-400" />
                    <span className="text-sm text-gray-500 font-medium">
                      {displayJob?.department || displayJob?.dept || "CodeClub"}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {displayJob?.title}
                  </h3>

                   <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-500">
                     <span className="flex items-center gap-1.5">
                       <FaBriefcase className="text-xs" />
                       {displayJob?.job_type || displayJob?.jobType || "General"}
                     </span>
                     <span className="flex items-center gap-1.5">
                       <FaMapPin className="text-xs" />
                       {displayJob?.location || "Onsite"}
                     </span>
                   </div>

                  {displayJob?.description && (
                    <p className="text-gray-600 leading-relaxed mb-6 whitespace-pre-line">
                      {displayJob.description}
                    </p>
                  )}

                   <div className="border-t border-gray-100 pt-6">
                     <h4 className="text-lg font-semibold text-gray-900 mb-5">Apply for this position</h4>

                     {applySuccess && (
                       <motion.p
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         className="mb-4 flex items-center gap-2 text-green-600 text-sm font-medium bg-green-50 p-3 rounded-lg"
                       >
                         <FaPaperPlane />
                         {applySuccess}
                       </motion.p>
                     )}
                     {applyError && (
                       <motion.p
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         className="mb-4 text-red-500 text-sm font-medium bg-red-50 p-3 rounded-lg"
                       >
                         {applyError}
                       </motion.p>
                     )}

                     <form onSubmit={handleApply} className="space-y-4">
                       <div className="grid md:grid-cols-2 gap-4">
                         <div>
                           <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1.5">
                             <FaUser className="text-gray-400" />
                             Full Name
                           </label>
                           <input
                             type="text"
                             name="name"
                             value={formData.name}
                             onChange={handleChange}
                             placeholder="Your Name"
                             className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-200 transition-all"
                             required
                           />
                         </div>
                         <div>
                           <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1.5">
                             <FaEnvelope className="text-gray-400" />
                             Email Address
                           </label>
                           <input
                             type="email"
                             name="email"
                             value={formData.email}
                             onChange={handleChange}
                             placeholder="your@email.com"
                             className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-200 transition-all"
                             required
                           />
                         </div>
                       </div>

                       <div className="grid md:grid-cols-2 gap-4">
                         <div>
                           <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1.5">
                             <FaPhone className="text-gray-400" />
                             Phone Number
                           </label>
                           <input
                             type="tel"
                             name="phone"
                             value={formData.phone}
                             onChange={handleChange}
                             placeholder="+1 234 567 890"
                             className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-200 transition-all"
                             required
                           />
                         </div>
                         <div>
                           <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1.5">
                             <FaLinkedin className="text-gray-400" />
                             LinkedIn <span className="text-gray-400 font-normal">(optional)</span>
                           </label>
                           <input
                             type="url"
                             name="linkedin"
                             value={formData.linkedin}
                             onChange={handleChange}
                             placeholder="https://linkedin.com/in/username"
                             className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-200 transition-all"
                           />
                         </div>
                       </div>

                       <div>
                         <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1.5">
                           <FaFilePdf className="text-gray-400" />
                           Resume / CV <span className="text-gray-400 font-normal">(PDF, optional)</span>
                         </label>
                         <div className="relative">
                           <input
                             type="file"
                             accept="application/pdf"
                             onChange={handleResumeChange}
                             className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-200 transition-all file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-gray-100 file:text-gray-600 hover:file:bg-gray-200"
                           />
                         </div>
                         {resumeFile && (
                           <p className="mt-1 text-xs text-gray-500 flex items-center gap-1">
                             <FaFilePdf className="text-red-400" />
                             {resumeFile.name}
                           </p>
                         )}
                       </div>

                       <div>
                         <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1.5">
                           Cover Letter
                         </label>
                         <textarea
                           name="coverLetter"
                           value={formData.coverLetter}
                           onChange={handleChange}
                           placeholder="Briefly describe why you are a good fit for this role..."
                           rows={4}
                           className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-200 transition-all resize-none"
                           required
                         />
                       </div>

                       <button
                         type="submit"
                         disabled={applyLoading}
                         className="w-full bg-gray-900 hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm"
                       >
                         {applyLoading ? (
                           <>
                             <motion.span
                               animate={{ rotate: 360 }}
                               transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                               className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                             />
                             Submitting...
                           </>
                         ) : (
                           <>
                             <FaPaperPlane className="text-sm" />
                             Submit Application
                           </>
                         )}
                       </button>
                     </form>
                   </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <UnlockComponent />
    </>
  );
}
