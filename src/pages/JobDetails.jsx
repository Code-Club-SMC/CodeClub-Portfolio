import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaArrowRight,
  FaBriefcase,
  FaMapPin,
  FaBuilding,
  FaCalendarAlt,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLinkedin,
  FaFilePdf,
  FaPaperPlane,
  FaCheckCircle,
  FaShareAlt,
  FaCheck,
  FaRegCopy,
  FaRegQuestionCircle,
} from "react-icons/fa";
import hero from "../assets/home/hero.jpg";
import UnlockComponent from "../components/UnlockComponent";

const API_BASE = import.meta.env.VITE_API_BASE || "https://code-club-portfoliomanager-obqd.vercel.app";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const viewportOnce = { once: true, amount: 0.2 };

export default function JobDetails() {
  const { id } = useParams();
  const location = useLocation();

  const [job, setJob] = useState(location.state?.job || null);
  const [loading, setLoading] = useState(!location.state?.job);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    coverLetter: "",
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [applyLoading, setApplyLoading] = useState(false);
  const [applyError, setApplyError] = useState("");
  const [applySuccess, setApplySuccess] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      if (!job) {
        setLoading(true);
      }
      setError("");

      const res = await fetch(`${API_BASE}/api/jobs/${id}`);
      if (res.ok) {
        const data = await res.json();
        setJob(data.job || data);
        return;
      }

      // Fallback: search within the full jobs list if direct ID lookup fails
      const listRes = await fetch(`${API_BASE}/api/jobs`);
      if (listRes.ok) {
        const listData = await listRes.json();
        const jobsList = Array.isArray(listData) ? listData : listData.jobs || [];
        const matchedJob = jobsList.find((j) => String(j._id || j.id) === String(id));
        if (matchedJob) {
          setJob(matchedJob);
          return;
        }
      }

      if (!job) {
        throw new Error("Job details could not be found");
      }
    } catch (err) {
      console.error("Job details fetch error:", err);
      if (!job) {
        setError("Unable to load job details. This position may have been filled or removed.");
      }
    } finally {
      setLoading(false);
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
      payload.append("job_id", job?._id || job?.id || id);
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
      if (!res.ok) throw new Error(data.message || "Application submission failed");

      setApplySuccess("Application submitted successfully! Our team will get back to you soon.");
      setFormData({ name: "", email: "", phone: "", linkedin: "", coverLetter: "" });
      setResumeFile(null);
    } catch (err) {
      setApplyError(err.message || "Something went wrong while submitting. Please try again.");
    } finally {
      setApplyLoading(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToApply = (e) => {
    e.preventDefault();
    const applyElement = document.getElementById("apply-section");
    if (applyElement) {
      applyElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (loading && !job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600 text-lg font-medium">Loading position details...</p>
        </div>
      </div>
    );
  }

  if (error && !job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 pt-20">
        <div className="max-w-md w-full bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
            !
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Position Not Found</h2>
          <p className="text-gray-600 mb-6 text-sm">{error}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={fetchJobDetails}
              className="px-5 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
            >
              Try Again
            </button>
            <Link
              to="/careers"
              className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              All Open Positions
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const department = job?.department || job?.dept || "CodeClub Team";
  const jobType = job?.job_type || job?.jobType || "Full-time";
  const locationText = job?.location || "Onsite";
  const postedDate = job?.created_at || job?.createdAt || job?.date;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <section className="relative w-full min-h-[50vh] md:min-h-[55vh] flex items-center overflow-hidden">
        <img
          src={hero}
          alt="Careers at CodeClub"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/85 to-black/75" />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 pt-28 pb-16 text-white">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 text-sm text-gray-400 mb-6"
          >
            <Link
              to="/careers"
              className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors group"
            >
              <FaArrowLeft className="text-xs group-hover:-translate-x-1 transition-transform" />
              Careers
            </Link>
            <span>/</span>
            <span className="text-gray-400 truncate max-w-xs">{job?.title}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap items-center gap-3 mb-4"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30">
              <FaBuilding className="text-[10px]" />
              {department}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 text-gray-300 border border-white/15">
              <FaBriefcase className="text-[10px]" />
              {jobType}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 text-gray-300 border border-white/15">
              <FaMapPin className="text-[10px]" />
              {locationText}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-white"
          >
            {job?.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <button
              onClick={scrollToApply}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-lg hover:shadow-blue-500/25 transition-all duration-300 text-sm md:text-base cursor-pointer"
            >
              Apply for this Role
              <FaArrowRight className="text-xs" />
            </button>
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium border border-white/15 transition-all duration-300 text-sm md:text-base cursor-pointer"
            >
              {copied ? (
                <>
                  <FaCheck className="text-green-400 text-xs" />
                  Link Copied!
                </>
              ) : (
                <>
                  <FaShareAlt className="text-xs" />
                  Share Position
                </>
              )}
            </button>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Details & Apply Form */}
          <div className="lg:col-span-8 space-y-10">
            {/* Job Description Card */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={fadeUp}
              className="bg-white rounded-2xl border border-gray-200 p-8 md:p-10 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <span className="w-2.5 h-7 bg-blue-600 rounded-full" />
                <h2 className="text-2xl font-bold text-gray-900">About the Role</h2>
              </div>

              {job?.description ? (
                <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed text-base whitespace-pre-line space-y-4">
                  {job.description}
                </div>
              ) : (
                <p className="text-gray-500 italic">No detailed description provided for this role.</p>
              )}
            </motion.div>

            {/* Why Join CodeClub */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={fadeUp}
              className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-8 md:p-10 shadow-sm"
            >
              <div className="mb-6">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                  Life at CodeClub
                </span>
                <h3 className="text-2xl font-bold mt-1">Why Work With Us?</h3>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                {[
                  {
                    title: "Challenging Projects",
                    desc: "Work on high-impact products and modern tech across AI, Web, Mobile, and Cloud.",
                  },
                  {
                    title: "Continuous Learning",
                    desc: "Access to courses, mentorship, and support to grow your technical and leadership skills.",
                  },
                  {
                    title: "Collaborative Culture",
                    desc: "A transparent, friendly, and empowering environment where every voice matters.",
                  },
                  {
                    title: "Autonomy & Impact",
                    desc: "Take ownership of features and see the direct influence of your code on real clients.",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <FaCheckCircle className="text-blue-400 mt-1 flex-shrink-0 text-base" />
                    <div>
                      <h4 className="font-semibold text-white text-sm">{item.title}</h4>
                      <p className="text-gray-300 text-xs mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Application Form Section */}
            <motion.div
              id="apply-section"
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={fadeUp}
              className="bg-white rounded-2xl border border-gray-200 p-8 md:p-10 shadow-sm scroll-mt-24"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2.5 h-7 bg-blue-600 rounded-full" />
                <h2 className="text-2xl font-bold text-gray-900">Apply for this Position</h2>
              </div>
              <p className="text-gray-500 text-sm mb-8">
                Please complete the form below. We will review your submission and respond promptly.
              </p>

              {applySuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 flex items-start gap-3"
                >
                  <FaCheckCircle className="text-green-500 text-lg mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-semibold text-sm">Application Received!</h5>
                    <p className="text-xs mt-0.5">{applySuccess}</p>
                  </div>
                </motion.div>
              )}

              {applyError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm"
                >
                  {applyError}
                </motion.div>
              )}

              <form onSubmit={handleApply} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 mb-1.5">
                      <FaUser className="text-gray-400 text-xs" />
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Jane Doe"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all bg-gray-50/50 focus:bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 mb-1.5">
                      <FaEnvelope className="text-gray-400 text-xs" />
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. jane@example.com"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all bg-gray-50/50 focus:bg-white"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 mb-1.5">
                      <FaPhone className="text-gray-400 text-xs" />
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 234 567 890"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all bg-gray-50/50 focus:bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 mb-1.5">
                      <FaLinkedin className="text-gray-400 text-xs" />
                      LinkedIn Profile <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <input
                      type="url"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/username"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all bg-gray-50/50 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 mb-1.5">
                    <FaFilePdf className="text-gray-400 text-xs" />
                    Resume / CV <span className="text-gray-400 font-normal">(PDF format, optional)</span>
                  </label>
                  <div className="border border-dashed border-gray-300 rounded-xl p-4 bg-gray-50/50 hover:bg-gray-50 transition-colors">
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handleResumeChange}
                      className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-gray-900 file:text-white hover:file:bg-gray-800 cursor-pointer"
                    />
                    {resumeFile && (
                      <p className="mt-2 text-xs text-blue-600 font-medium flex items-center gap-1.5">
                        <FaFilePdf /> Selected: {resumeFile.name} ({(resumeFile.size / 1024).toFixed(1)} KB)
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="flex items-center justify-between text-xs font-semibold text-gray-700 mb-1.5">
                    <span>Cover Letter / Message <span className="text-red-500">*</span></span>
                  </label>
                  <textarea
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleChange}
                    placeholder="Tell us about yourself, your background, and why you are interested in this position..."
                    rows={5}
                    className="w-full border border-gray-200 rounded-xl p-4 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all bg-gray-50/50 focus:bg-white resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={applyLoading}
                  className="w-full bg-gray-900 hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3.5 px-6 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 text-sm md:text-base shadow-sm"
                >
                  {applyLoading ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Submitting Application...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="text-sm" />
                      Submit Application
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>

          {/* Right Column: Job Overview Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={fadeUp}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm lg:sticky lg:top-28 space-y-6"
            >
              <h3 className="text-lg font-bold text-gray-900 pb-3 border-b border-gray-100">
                Job Overview
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <FaBuilding className="text-sm" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block font-medium">Department</span>
                    <span className="font-semibold text-gray-800">{department}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                    <FaBriefcase className="text-sm" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block font-medium">Job Type</span>
                    <span className="font-semibold text-gray-800">{jobType}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <FaMapPin className="text-sm" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block font-medium">Location</span>
                    <span className="font-semibold text-gray-800">{locationText}</span>
                  </div>
                </div>

                {postedDate && (
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                      <FaCalendarAlt className="text-sm" />
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 block font-medium">Date Posted</span>
                      <span className="font-semibold text-gray-800">
                        {new Date(postedDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-2">
                <button
                  onClick={scrollToApply}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm shadow-sm"
                >
                  Apply Now
                  <FaArrowRight className="text-xs" />
                </button>
              </div>

              {/* Share Job Box */}
              <div className="pt-4 border-t border-gray-100">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-3">
                  Share this Job
                </span>
                <button
                  onClick={handleCopyLink}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-medium transition-all"
                >
                  {copied ? (
                    <>
                      <FaCheck className="text-green-500 text-xs" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <FaRegCopy className="text-gray-400 text-xs" />
                      <span>Copy Job URL</span>
                    </>
                  )}
                </button>
              </div>

              {/* Need Help Box */}
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                <div className="flex items-center gap-2 text-gray-900 font-semibold text-xs mb-1">
                  <FaRegQuestionCircle className="text-blue-500" />
                  Have Questions?
                </div>
                <p className="text-xs text-gray-500 mb-2">
                  Reach out directly to our team regarding openings or working at CodeClub.
                </p>
                <Link
                  to="/contact"
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
                >
                  Contact Us <FaArrowRight className="text-[10px]" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <UnlockComponent />
    </div>
  );
}
