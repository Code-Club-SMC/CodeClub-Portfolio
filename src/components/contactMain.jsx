import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaCheckCircle, FaShieldAlt, FaFileContract, FaPaperPlane, FaRocket } from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const viewportOnce = { once: true, amount: 0.2 };

const steps = [
  {
    icon: <FaCheckCircle className="text-blue-300" />,
    title: "Review",
    desc: "Our expert will follow up after reviewing your needs.",
  },
  {
    icon: <FaShieldAlt className="text-blue-300" />,
    title: "Privacy",
    desc: "If required, we'll sign an NDA to ensure privacy.",
  },
  {
    icon: <FaFileContract className="text-blue-300" />,
    title: "Proposal",
    desc: "Our Pre-Sales Manager will send you a proposal.",
  },
  {
    icon: <FaRocket className="text-blue-300" />,
    title: "Kickoff",
    desc: "Then, we get started on your project.",
  },
];

const fields = [
  { label: "Name*", name: "user_name", type: "text", key: "name", placeholder: "User Name" },
  { label: "Corporate email*", name: "user_email", type: "email", key: "email", placeholder: "example@company.com" },
  { label: "Phone number*", name: "user_phone", type: "text", key: "number", placeholder: "+1 (555) 000-0000" },
  { label: "Company*", name: "user_company", type: "text", key: "company", placeholder: "Company Inc." },
];

const ContactMain = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const values = { name, email, number, company };
  const setters = {
    name: setName,
    email: setEmail,
    number: setNumber,
    company: setCompany,
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE || "https://code-club-portfoliomanager-obqd.vercel.app"}/api/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: number,
          companyNo: company,
          message,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Request failed");
      }
      setName("");
      setEmail("");
      setMessage("");
      setNumber("");
      setCompany("");
      setSuccess("Message sent successfully! Our team will get back to you shortly.");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.log("FAILED...", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-gray-950">
      {/* Left panel — process */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={staggerContainer}
        className="relative lg:w-[40%] w-full px-10 py-20 lg:px-16 lg:py-28 overflow-hidden"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-950" />
        
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        {/* Accent line */}
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-500 via-blue-400 to-transparent" />

        <div className="relative z-10">
          <motion.div variants={fadeUp} className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Let's{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300">
                connect
              </span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Fill out the form, and we've got you covered.
            </p>
          </motion.div>

          <motion.h3 
            variants={fadeUp}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 mb-8"
          >
            What happens next
          </motion.h3>

          <div className="space-y-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="group flex items-start gap-4"
              >
                <div className="flex flex-col items-center">
                  <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-500/10 group-hover:border-blue-500/30 transition-all duration-300">
                    {step.icon}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent mt-2" />
                  )}
                </div>
                <div className="pt-1">
                  <h4 className="text-white font-semibold mb-1">{step.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Right panel — form */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={staggerContainer}
        className="relative lg:w-[60%] w-full px-10 py-20 lg:px-20 lg:py-28"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gray-950" />
        
        {/* Accent glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-2xl">
          <motion.div variants={fadeUp} className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
              Contact{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300">
                us
              </span>
            </h2>
            <p className="text-gray-400 text-lg">
              Our team would love to hear from you.
            </p>
          </motion.div>

          <motion.form
            variants={staggerContainer}
            className="space-y-10"
            name="contact-form"
            onSubmit={sendEmail}
          >
            {/* Main message field */}
            <motion.div variants={fadeUp}>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Your challenge/goal*
              </label>
              <textarea
                type="text"
                value={message}
                name="message"
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about your project..."
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.07] transition-all duration-300 resize-none"
                required
              />
            </motion.div>

            {/* Fields grid */}
            <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fields.map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={values[field.key]}
                    onChange={(e) => setters[field.key](e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.07] transition-all duration-300"
                    required
                  />
                </div>
              ))}
            </motion.div>

            {/* Submit button */}
            <motion.div variants={fadeUp} className="pt-2">
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 text-white font-medium py-4 px-10 rounded-xl shadow-lg shadow-blue-500/25"
              >
                {loading ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="text-sm" />
                    Send message
                    <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </motion.button>

              {success && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 flex items-center gap-2 text-green-400 text-sm font-medium"
                >
                  <FaCheckCircle />
                  {success}
                </motion.p>
              )}
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 text-red-400 text-sm font-medium"
                >
                  {error}
                </motion.p>
              )}
            </motion.div>

            {/* Privacy text */}
            <motion.p variants={fadeUp} className="text-xs text-gray-500 leading-relaxed border-t border-white/5 pt-6">
              Sending the information provided in this form you agree to the
              processing of your personal data according to CodeClub{" "}
              <a href="#" className="text-gray-400 underline hover:text-blue-400 transition-colors">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="#" className="text-gray-400 underline hover:text-blue-400 transition-colors">
                Cookies Policy
              </a>{" "}
              to handle the request and respond to it.
            </motion.p>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactMain;