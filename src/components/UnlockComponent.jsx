import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const viewportOnce = { once: true, amount: 0.3 };

const UnlockComponent = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={fadeUp}
      className="relative text-center py-24 px-6 lg:px-40 bg-gray-950 overflow-hidden"
    >
      {/* rotating conic aura */}
      <motion.div
        className="absolute left-1/2 top-1/2 w-[900px] h-[900px] -translate-x-1/2 -translate-y-1/2 opacity-30"
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
          className="absolute w-1.5 h-1.5 rounded-full bg-white/40"
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
        className="relative z-10 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-10 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent"
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
          <span className="relative flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xl font-semibold py-3 px-10 rounded-full shadow-lg group-hover:scale-105 transition-transform duration-300">
            Contact Us
            <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
          </span>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default UnlockComponent;