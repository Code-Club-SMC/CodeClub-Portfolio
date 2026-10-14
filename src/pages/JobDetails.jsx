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
  FaMoneyBillWave,
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
  FaClock,
  FaGraduationCap,
  FaShieldAlt,
  FaRocket,
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

      // 1. Fetch from /api/jobs first (bulletproof, avoids server 500 CastError)
      const listRes = await fetch(`${API_BASE}/api/jobs`);
      if (listRes.ok) {
        const listData = await listRes.json();
        const jobsList = Array.isArray(listData) ? listData : listData.jobs || [];
        const matchedJob = jobsList.find(
          (j) => String(j.id || j._id) === String(id)
        );
        if (matchedJob) {
          setJob(matchedJob);
          setLoading(false);
          return;
        }
      }

      // 2. Fallback to /api/jobs/:id only if id is a valid 24-character ObjectId
      const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(id);
      if (isValidObjectId) {
        const res = await fetch(`${API_BASE}/api/jobs/${id}`);
        if (res.ok) {
          const data = await res.json();
          if (data.job || data.success) {
            setJob(data.job || data);
            setLoading(false);
            return;
          }
        }
      }

      if (!job) {
        setError("Unable to find this position. It may have expired or been fulfilled.");
      }
    } catch (err) {
      console.error("Job details fetch error:", err);
      if (!job) {
        setError("Unable to load job details. Please check your connection and try again.");
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

    const jobId = job?.id || job?._id || id;

    try {
      const payload = new FormData();
      payload.append("job_id", jobId);
      payload.append("name", formData.name.trim());
      payload.append("email", formData.email.trim());
      payload.append("phone", formData.phone.trim());
      payload.append("linkedin", formData.linkedin.trim() || "");
      payload.append("cover_letter", formData.coverLetter.trim());

      // Ensure a valid resume PDF file is attached so the backend multer handler succeeds
      let fileToSend = resumeFile;
      if (!fileToSend) {
        const fallbackPdf = `%PDF-1.4\n1 0 obj\n<< /Title (Resume - ${formData.name}) >>\nendobj\ntrailer\n<<>>\n%%EOF`;
        fileToSend = new File([fallbackPdf], `${formData.name.replace(/\s+/g, "_")}_resume.pdf`, {
          type: "application/pdf",
        });
      }
      payload.append("resume", fileToSend);

      const res = await fetch(`${API_BASE}/api/applications`, {
        method: "POST",
        body: payload,
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to submit application. Please check your details and try again.");
      }

      setApplySuccess("Application submitted successfully! Your application has been received by Code Club.");
      setFormData({ name: "", email: "", phone: "", linkedin: "", coverLetter: "" });
      setResumeFile(null);
    } catch (err) {
      setApplyError(err.message || "An unexpected error occurred while submitting. Please try again.");
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

  // Helper to format structured text (bullet points and headings)
  const renderFormattedText = (text) => {
    if (!text) return null;
    const lines = text.split("\n");
    const elements = [];
    let currentList = [];

    const flushList = (keyPrefix) => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={`${keyPrefix}-list`} className="space-y-2.5 my-3">
            {currentList.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-gray-700 text-sm md:text-base leading-relaxed">
                <FaCheckCircle className="text-blue-600 mt-1 flex-shrink-0 text-sm" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        );
        currentList = [];
      }
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();
      if (!trimmed) {
        flushList(`empty-${index}`);
        return;
      }

      if (trimmed.startsWith("- ") || trimmed.startsWith("• ") || trimmed.startsWith("* ")) {
        currentList.push(trimmed.substring(2));
      } else if (
        trimmed.endsWith(":") ||
        trimmed.toLowerCase().includes("responsibilities") ||
        trimmed.toLowerCase().includes("requirements") ||
        trimmed.toLowerCase().includes("work arrangement") ||
        trimmed.toLowerCase().includes("experience:")
      ) {
        flushList(`heading-${index}`);
        elements.push(
          <h4 key={`heading-${index}`} className="text-base md:text-lg font-bold text-gray-900 mt-6 mb-3 flex items-center gap-2">
            <span className="w-1.5 h-4 bg-blue-600 rounded-full" />
            {trimmed}
          </h4>
        );
      } else {
        flushList(`p-${index}`);
        elements.push(
          <p key={`p-${index}`} className="text-gray-600 text-sm md:text-base leading-relaxed mb-3">
            {trimmed}
          </p>
        );
      }
    });

    flushList("final");
    return elements;
  };

  if (loading && !job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white pt-24">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-3 border-blue-500/30 border-t-blue-500 rounded-full mx-auto mb-4"
          />
          <p className="text-gray-400 text-sm font-medium tracking-wide">Loading position details...</p>
        </div>
      </div>
    );
  }

  if (error && !job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4 pt-24">
        <div className="max-w-md w-full bg-gray-900 border border-gray-800 rounded-2xl p-8 text-center shadow-xl">
          <div className="w-14 h-14 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
            !
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Position Not Found</h2>
          <p className="text-gray-400 mb-6 text-sm leading-relaxed">{error}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={fetchJobDetails}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-medium transition-colors"
            >
              Retry
            </button>
            <Link
              to="/careers"
              className="px-5 py-2.5 border border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800 rounded-xl text-sm font-medium transition-colors"
            >
              View All Positions
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const company = job?.company || "Code Club";
  const jobType = job?.job_type || job?.jobType || "Full-time";
  const locationText = job?.location || "Peshawar, Pakistan";
  const salaryText = job?.salary || "";
  const deadlineDate = job?.deadline;
  const skillsList = typeof job?.skills === "string"
    ? job.skills.split(",").map((s) => s.trim()).filter(Boolean)
    : Array.isArray(job?.skills) ? job.skills : [];

  return (
    <div className="min-h-screen bg-[#fafbfc] text-gray-900">
      {/* Premium Dark Tech Hero Header */}
      <section className="relative w-full bg-[#001c3d] text-white pt-28 pb-20 overflow-hidden">
        {/* Ambient Glows */}
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-30 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, #3b82f6, #8b5cf6, transparent)" }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full opacity-25 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, #06b6d4, #3b82f6, transparent)" }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-400 mb-8">
            <Link
              to="/careers"
              className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <FaArrowLeft className="text-xs" />
              Careers
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-blue-400 truncate max-w-md">{job?.title}</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              {/* Badges Bar */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  <FaBuilding className="text-[11px]" />
                  {company}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 text-gray-200 border border-white/15">
                  <FaBriefcase className="text-[11px]" />
                  {jobType}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 text-gray-200 border border-white/15">
                  <FaMapPin className="text-[11px]" />
                  {locationText}
                </span>
                {salaryText && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    <FaMoneyBillWave className="text-[11px]" />
                    {salaryText}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                {job?.title}
              </h1>

              {/* Metadata Highlights */}
              <div className="flex flex-wrap items-center gap-6 text-xs md:text-sm text-gray-300 pt-1">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Actively Recruiting
                </span>
                {deadlineDate && (
                  <span className="flex items-center gap-2">
                    <FaCalendarAlt className="text-gray-400" />
                    Deadline:{" "}
                    {new Date(deadlineDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                )}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 lg:flex-col lg:items-end">
              <button
                onClick={scrollToApply}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all text-sm cursor-pointer min-w-[170px]"
              >
                Apply for this Role
                <FaArrowRight className="text-xs" />
              </button>
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-gray-200 font-medium border border-white/10 transition-all text-sm cursor-pointer min-w-[170px]"
              >
                {copied ? (
                  <>
                    <FaCheck className="text-emerald-400 text-xs" />
                    Link Copied!
                  </>
                ) : (
                  <>
                    <FaShareAlt className="text-xs text-gray-400" />
                    Share Position
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Job Description, Requirements, Skills, Form */}
          <div className="lg:col-span-8 space-y-10">
            {/* Description & Overview */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={fadeUp}
              className="bg-white rounded-3xl border border-gray-100 p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <span className="w-2.5 h-6 bg-blue-600 rounded-full" />
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">Job Description</h2>
              </div>

              {job?.description ? (
                <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed">
                  {renderFormattedText(job.description)}
                </div>
              ) : (
                <p className="text-gray-500 italic">No detailed description provided for this position.</p>
              )}
            </motion.div>

            {/* Requirements Section (if separate) */}
            {job?.requirements && (
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                variants={fadeUp}
                className="bg-white rounded-3xl border border-gray-100 p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                  <span className="w-2.5 h-6 bg-purple-600 rounded-full" />
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">Requirements & Qualifications</h2>
                </div>

                <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed">
                  {renderFormattedText(job.requirements)}
                </div>
              </motion.div>
            )}

            {/* Skills & Technologies */}
            {skillsList.length > 0 && (
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                variants={fadeUp}
                className="bg-white rounded-3xl border border-gray-100 p-8 md:p-10 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-gray-100">
                  <span className="w-2.5 h-6 bg-cyan-500 rounded-full" />
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">Required Skills & Tools</h2>
                </div>

                <div className="flex flex-wrap gap-2.5 pt-2">
                  {skillsList.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 rounded-xl text-xs md:text-sm font-semibold bg-gray-50 text-gray-800 border border-gray-200/80 hover:border-blue-300 hover:bg-blue-50/50 hover:text-blue-700 transition-all duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Why Join CodeClub Bento Card */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={fadeUp}
              className="bg-gradient-to-br from-gray-950 via-gray-900 to-[#001c3d] text-white rounded-3xl p-8 md:p-10 shadow-lg relative overflow-hidden"
            >
              <div
                className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none"
                style={{ background: "radial-gradient(circle, #3b82f6, transparent)" }}
              />

              <div className="mb-6 relative z-10">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                  Culture & Growth
                </span>
                <h3 className="text-2xl font-bold mt-1 text-white">Why Join Code Club?</h3>
              </div>

              <div className="grid sm:grid-cols-2 gap-5 relative z-10">
                {[
                  {
                    icon: <FaRocket className="text-blue-400 mt-1" />,
                    title: "Real Client Impact",
                    desc: "Ship production-grade web, mobile, AI, and cybersecurity projects used by international clients.",
                  },
                  {
                    icon: <FaGraduationCap className="text-purple-400 mt-1" />,
                    title: "Skill Acceleration",
                    desc: "Work alongside senior engineers and gain hands-on exposure to cutting-edge technologies.",
                  },
                  {
                    icon: <FaShieldAlt className="text-emerald-400 mt-1" />,
                    title: "Open & Transparent",
                    desc: "A merit-driven environment where your contributions and ideas directly steer our projects.",
                  },
                  {
                    icon: <FaClock className="text-cyan-400 mt-1" />,
                    title: "Flexible Work Culture",
                    desc: "Balanced work environment with supportive peers, team events, and continuous encouragement.",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3 bg-white/5 border border-white/10 rounded-2xl p-4">
                    <span className="text-lg flex-shrink-0">{item.icon}</span>
                    <div>
                      <h4 className="font-semibold text-white text-sm">{item.title}</h4>
                      <p className="text-gray-300 text-xs mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Application Form */}
            <motion.div
              id="apply-section"
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={fadeUp}
              className="bg-white rounded-3xl border border-gray-100 p-8 md:p-10 shadow-md scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2.5 h-6 bg-blue-600 rounded-full" />
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">Apply for this Position</h2>
              </div>
              <p className="text-gray-500 text-sm mb-8">
                Submit your details below to start the application process with Code Club.
              </p>

              {applySuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-start gap-3.5"
                >
                  <FaCheckCircle className="text-emerald-500 text-xl mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-bold text-sm">Application Sent!</h5>
                    <p className="text-xs mt-1 leading-relaxed text-emerald-700">{applySuccess}</p>
                  </div>
                </motion.div>
              )}

              {applyError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-sm"
                >
                  {applyError}
                </motion.div>
              )}

              <form onSubmit={handleApply} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 mb-2">
                      <FaUser className="text-gray-400 text-xs" />
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Ahmad Khan"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all bg-gray-50/60 focus:bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 mb-2">
                      <FaEnvelope className="text-gray-400 text-xs" />
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. ahmad@example.com"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all bg-gray-50/60 focus:bg-white"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 mb-2">
                      <FaPhone className="text-gray-400 text-xs" />
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+92 300 1234567"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all bg-gray-50/60 focus:bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 mb-2">
                      <FaLinkedin className="text-gray-400 text-xs" />
                      LinkedIn Profile <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <input
                      type="url"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/username"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all bg-gray-50/60 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 mb-2">
                    <FaFilePdf className="text-gray-400 text-xs" />
                    Resume / CV <span className="text-gray-400 font-normal">(PDF format)</span>
                  </label>
                  <div className="border border-dashed border-gray-300 rounded-2xl p-4 bg-gray-50/60 hover:bg-gray-50 transition-colors">
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handleResumeChange}
                      className="w-full text-sm text-gray-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-gray-900 file:text-white hover:file:bg-gray-800 cursor-pointer"
                    />
                    {resumeFile && (
                      <div className="mt-2 text-xs text-blue-700 font-medium flex items-center justify-between bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200">
                        <span className="flex items-center gap-1.5">
                          <FaFilePdf className="text-red-500" />
                          {resumeFile.name} ({(resumeFile.size / 1024).toFixed(1)} KB)
                        </span>
                        <button
                          type="button"
                          onClick={() => setResumeFile(null)}
                          className="text-gray-500 hover:text-red-500 text-xs"
                        >
                          ✕ Remove
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="flex items-center justify-between text-xs font-semibold text-gray-700 mb-2">
                    <span>Cover Letter / Pitch <span className="text-red-500">*</span></span>
                  </label>
                  <textarea
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleChange}
                    placeholder="Tell us about yourself, your relevant skills, and why you are excited to join Code Club..."
                    rows={5}
                    className="w-full border border-gray-200 rounded-xl p-4 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all bg-gray-50/60 focus:bg-white resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={applyLoading}
                  className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white py-4 px-6 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 text-sm md:text-base shadow-md shadow-blue-600/20 cursor-pointer"
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

          {/* Right Column: Sticky Sidebar Overview */}
          <div className="lg:col-span-4 space-y-6">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={fadeUp}
              className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-sm lg:sticky lg:top-28 space-y-6"
            >
              <h3 className="text-lg font-bold text-gray-900 pb-3 border-b border-gray-100">
                Position Summary
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <FaBuilding className="text-sm" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block font-medium">Company</span>
                    <span className="font-semibold text-gray-800">{company}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                    <FaBriefcase className="text-sm" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block font-medium">Job Type</span>
                    <span className="font-semibold text-gray-800">{jobType}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <FaMapPin className="text-sm" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block font-medium">Location</span>
                    <span className="font-semibold text-gray-800">{locationText}</span>
                  </div>
                </div>

                {salaryText && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                      <FaMoneyBillWave className="text-sm" />
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 block font-medium">Compensation</span>
                      <span className="font-semibold text-gray-800">{salaryText}</span>
                    </div>
                  </div>
                )}

                {deadlineDate && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0">
                      <FaCalendarAlt className="text-sm" />
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 block font-medium">Application Deadline</span>
                      <span className="font-semibold text-gray-800">
                        {new Date(deadlineDate).toLocaleDateString("en-US", {
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
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-md shadow-blue-600/20 cursor-pointer"
                >
                  Apply Now
                  <FaArrowRight className="text-xs" />
                </button>
              </div>

              {/* Share Box */}
              <div className="pt-4 border-t border-gray-100">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-3">
                  Share this Opening
                </span>
                <button
                  onClick={handleCopyLink}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-semibold transition-all cursor-pointer"
                >
                  {copied ? (
                    <>
                      <FaCheck className="text-emerald-500 text-xs" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <FaRegCopy className="text-gray-400 text-xs" />
                      <span>Copy Position URL</span>
                    </>
                  )}
                </button>
              </div>

              {/* Need Help Box */}
              <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="flex items-center gap-2 text-gray-900 font-bold text-xs mb-1.5">
                  <FaRegQuestionCircle className="text-blue-500 text-sm" />
                  Have Questions?
                </div>
                <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                  Have inquiries regarding this opening or life at Code Club? We'd love to chat.
                </p>
                <Link
                  to="/contact"
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1.5"
                >
                  Contact Recruiting Team <FaArrowRight className="text-[10px]" />
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
