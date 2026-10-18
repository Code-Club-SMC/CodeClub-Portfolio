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
  FaExclamationCircle,
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
  const [fieldErrors, setFieldErrors] = useState({});
  const [applyLoading, setApplyLoading] = useState(false);
  const [applyError, setApplyError] = useState("");
  const [applySuccess, setApplySuccess] = useState("");

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      if (!job) {
        setLoading(true);
      }
      setError("");

      // Fetch from /api/jobs first (safest, reliable)
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

      // Fallback to /api/jobs/:id only if id is a 24-character ObjectId
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
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleResumeChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
        setFieldErrors((prev) => ({
          ...prev,
          resume: "Only PDF format files are accepted.",
        }));
        setResumeFile(null);
        return;
      }
      setResumeFile(file);
      if (fieldErrors.resume) {
        setFieldErrors((prev) => ({ ...prev, resume: "" }));
      }
    } else {
      setResumeFile(null);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Full name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = "Email address is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    }

    // Resume is mandatory
    if (!resumeFile) {
      errors.resume = "Please upload your Resume / CV in PDF format";
    }

    if (!formData.coverLetter.trim()) {
      errors.coverLetter = "Cover letter is required";
    }

    // LinkedIn is optional, but if entered it must be a valid URL
    if (formData.linkedin.trim()) {
      const urlPattern = /^(https?:\/\/)?([a-z0-9]+\.)?linkedin\.com\/in\/[a-zA-Z0-9_\-./]+$/i;
      if (!urlPattern.test(formData.linkedin.trim())) {
        errors.linkedin = "Please enter a valid LinkedIn URL (e.g. https://linkedin.com/in/username)";
      }
    }

    return errors;
  };

  const handleApply = async (e) => {
    e.preventDefault();
    setApplyError("");
    setApplySuccess("");

    // Validate must-have fields
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setApplyError("Please fill in all required fields marked with * correctly.");
      return;
    }
    setFieldErrors({});

    setApplyLoading(true);

    const jobId = job?.id || job?._id || id;

    try {
      const payload = new FormData();
      payload.append("job_id", jobId);
      payload.append("name", formData.name.trim());
      payload.append("email", formData.email.trim());
      payload.append("phone", formData.phone.trim());
      
      // If LinkedIn is empty (optional), supply the fallback placeholder required by the backend regex
      const linkedinValue = formData.linkedin.trim() || "https://linkedin.com/in/not-provided";
      payload.append("linkedin", linkedinValue);

      payload.append("cover_letter", formData.coverLetter.trim());
      payload.append("resume", resumeFile);

      const res = await fetch(`${API_BASE}/api/applications`, {
        method: "POST",
        body: payload,
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to submit application. Please check your details and try again.");
      }

      setApplySuccess("Application submitted successfully! We have received your application.");
      setFormData({ name: "", email: "", phone: "", linkedin: "", coverLetter: "" });
      setResumeFile(null);
      const fileInput = document.getElementById("resume-input");
      if (fileInput) fileInput.value = "";
    } catch (err) {
      setApplyError(err.message || "An unexpected error occurred while submitting. Please try again.");
    } finally {
      setApplyLoading(false);
    }
  };

  if (loading && !job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-gray-900 pt-24">
        <div className="text-center">
          <p className="text-gray-500 text-lg">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error && !job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4 pt-24">
        <div className="max-w-md w-full bg-white border border-gray-200 rounded-xl p-8 text-center shadow-sm">
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={fetchJobDetails}
              className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
            >
              Retry
            </button>
            <Link
              to="/careers"
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              All Openings
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
    <>
      {/* Standard Hero Section matching Careers.jsx and other pages */}
      <section className="relative w-full h-[60vh] md:h-[65vh] overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={hero}
          alt="Careers at CodeClub"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 flex flex-col justify-center items-center h-full px-6 text-center text-white max-w-4xl mx-auto pt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-4"
          >
            <Link
              to="/careers"
              className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold uppercase tracking-[0.25em] text-gray-300 hover:text-white transition-colors"
            >
              <FaArrowLeft className="text-xs" /> Back to Careers
            </Link>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4"
          >
            {job?.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-300"
          >
            <span className="flex items-center gap-1.5">
              <FaBuilding className="text-xs text-gray-400" />
              {company}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <FaBriefcase className="text-xs text-gray-400" />
              {jobType}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <FaMapPin className="text-xs text-gray-400" />
              {locationText}
            </span>
            {salaryText && (
              <>
                <span>•</span>
                <span className="flex items-center gap-1.5 text-gray-200">
                  <FaMoneyBillWave className="text-xs text-green-400" />
                  {salaryText}
                </span>
              </>
            )}
            {deadlineDate && (
              <>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <FaCalendarAlt className="text-xs text-gray-400" />
                  Apply by: {new Date(deadlineDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* Main Content matching Careers / About Us / Service pages */}
      <div className="bg-white text-gray-900 min-h-screen pb-20">
        <section className="px-6 md:px-24 py-16 max-w-5xl mx-auto">
          {/* Job Details Card */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeUp}
            className="bg-white border border-gray-200 rounded-xl p-6 md:p-10 mb-12"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <span className="h-px w-10 bg-gray-300" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
                Job Details
              </span>
              <span className="h-px w-10 bg-gray-300" />
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">About the Role</h3>
              {job?.description ? (
                <p className="text-gray-600 leading-relaxed whitespace-pre-line text-base">
                  {job.description}
                </p>
              ) : (
                <p className="text-gray-500 italic">No description provided.</p>
              )}
            </div>

            {/* Requirements */}
            {job?.requirements && (
              <div className="mb-8 pt-6 border-t border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Requirements & Qualifications</h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line text-base">
                  {job.requirements}
                </p>
              </div>
            )}

            {/* Skills */}
            {skillsList.length > 0 && (
              <div className="pt-6 border-t border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Skills & Tools</h3>
                <div className="flex flex-wrap gap-2">
                  {skillsList.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Application Form Card */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeUp}
            className="bg-white border border-gray-200 rounded-xl p-6 md:p-10"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-10 bg-gray-300" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
                Application
              </span>
              <span className="h-px w-10 bg-gray-300" />
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Apply for this position</h3>
            <p className="text-gray-500 text-sm mb-6">
              Please complete the required details below to submit your application.
            </p>

            {applySuccess && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 flex items-center gap-2.5 text-green-700 text-sm font-medium bg-green-50 border border-green-200 p-4 rounded-lg"
              >
                <FaCheckCircle className="text-green-600 text-base flex-shrink-0" />
                <span>{applySuccess}</span>
              </motion.div>
            )}

            {applyError && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 flex items-center gap-2.5 text-red-600 text-sm font-medium bg-red-50 border border-red-200 p-4 rounded-lg"
              >
                <FaExclamationCircle className="text-red-500 text-base flex-shrink-0" />
                <span>{applyError}</span>
              </motion.div>
            )}

            <form onSubmit={handleApply} noValidate className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1.5">
                    <FaUser className="text-gray-400" />
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className={`w-full border rounded-lg px-3.5 py-2.5 text-sm focus:outline-none transition-all ${
                      fieldErrors.name
                        ? "border-red-400 ring-1 ring-red-200 bg-red-50/20"
                        : "border-gray-200 focus:border-gray-400 focus:ring-1 focus:ring-gray-200"
                    }`}
                  />
                  {fieldErrors.name && (
                    <p className="mt-1 text-xs text-red-500 font-medium">{fieldErrors.name}</p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1.5">
                    <FaEnvelope className="text-gray-400" />
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className={`w-full border rounded-lg px-3.5 py-2.5 text-sm focus:outline-none transition-all ${
                      fieldErrors.email
                        ? "border-red-400 ring-1 ring-red-200 bg-red-50/20"
                        : "border-gray-200 focus:border-gray-400 focus:ring-1 focus:ring-gray-200"
                    }`}
                  />
                  {fieldErrors.email && (
                    <p className="mt-1 text-xs text-red-500 font-medium">{fieldErrors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Phone Number */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1.5">
                    <FaPhone className="text-gray-400" />
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+92 300 1234567"
                    className={`w-full border rounded-lg px-3.5 py-2.5 text-sm focus:outline-none transition-all ${
                      fieldErrors.phone
                        ? "border-red-400 ring-1 ring-red-200 bg-red-50/20"
                        : "border-gray-200 focus:border-gray-400 focus:ring-1 focus:ring-gray-200"
                    }`}
                  />
                  {fieldErrors.phone && (
                    <p className="mt-1 text-xs text-red-500 font-medium">{fieldErrors.phone}</p>
                  )}
                </div>

                {/* LinkedIn Profile (Optional) */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1.5">
                    <FaLinkedin className="text-gray-400" />
                    LinkedIn Profile <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/username"
                    className={`w-full border rounded-lg px-3.5 py-2.5 text-sm focus:outline-none transition-all ${
                      fieldErrors.linkedin
                        ? "border-red-400 ring-1 ring-red-200 bg-red-50/20"
                        : "border-gray-200 focus:border-gray-400 focus:ring-1 focus:ring-gray-200"
                    }`}
                  />
                  {fieldErrors.linkedin && (
                    <p className="mt-1 text-xs text-red-500 font-medium">{fieldErrors.linkedin}</p>
                  )}
                </div>
              </div>

              {/* Resume / CV (Mandatory) */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1.5">
                  <FaFilePdf className="text-gray-400" />
                  Resume / CV <span className="text-red-500">*</span>
                  <span className="text-gray-400 font-normal">(PDF format required)</span>
                </label>
                <div
                  className={`border rounded-lg p-3.5 transition-all ${
                    fieldErrors.resume
                      ? "border-red-400 ring-1 ring-red-200 bg-red-50/20"
                      : "border-gray-200 bg-gray-50/50"
                  }`}
                >
                  <input
                    id="resume-input"
                    type="file"
                    accept="application/pdf"
                    onChange={handleResumeChange}
                    className="w-full text-sm text-gray-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer"
                  />
                  {resumeFile && (
                    <p className="mt-2 text-xs text-gray-700 flex items-center justify-between font-medium">
                      <span className="flex items-center gap-1.5">
                        <FaFilePdf className="text-red-500" />
                        {resumeFile.name} ({(resumeFile.size / 1024).toFixed(1)} KB)
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setResumeFile(null);
                          const fileInput = document.getElementById("resume-input");
                          if (fileInput) fileInput.value = "";
                        }}
                        className="text-red-500 hover:underline text-xs"
                      >
                        Remove
                      </button>
                    </p>
                  )}
                </div>
                {fieldErrors.resume && (
                  <p className="mt-1 text-xs text-red-500 font-medium">{fieldErrors.resume}</p>
                )}
              </div>

              {/* Cover Letter */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1.5">
                  Cover Letter <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleChange}
                  placeholder="Briefly describe why you are a good fit for this role..."
                  rows={4}
                  className={`w-full border rounded-lg px-3.5 py-2.5 text-sm focus:outline-none transition-all resize-none ${
                    fieldErrors.coverLetter
                      ? "border-red-400 ring-1 ring-red-200 bg-red-50/20"
                      : "border-gray-200 focus:border-gray-400 focus:ring-1 focus:ring-gray-200"
                  }`}
                />
                {fieldErrors.coverLetter && (
                  <p className="mt-1 text-xs text-red-500 font-medium">{fieldErrors.coverLetter}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={applyLoading}
                className="w-full bg-gray-900 hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm cursor-pointer"
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
        </section>
      </div>

      {/* Bottom Unlock Component */}
      <UnlockComponent />
    </>
  );
}
