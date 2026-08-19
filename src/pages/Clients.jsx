import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaArrowRight, FaCheckCircle, FaQuoteLeft } from "react-icons/fa";
import { brands } from "../components/brands";
import { serviceMap } from "./ServiceData";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const viewport = { once: true, amount: 0.15 };

const getServiceForClient = (name) => {
  const clientName = name.toLowerCase();
  if (clientName.includes("stock")) return serviceMap.ai;
  if (clientName.includes("learning") || clientName.includes("academy")) {
    return serviceMap["mobile-apps"];
  }
  if (clientName.includes("car wash") || clientName.includes("hotel")) {
    return serviceMap["ui-ux"];
  }
  return serviceMap["web-development"];
};

const clients = brands.map((brand, index) => {
  const service = getServiceForClient(brand.name);
  const industry = service.industries?.[0];

  return {
    ...brand,
    id: `${brand.name}-${index}`,
    service,
    challenges: industry?.items || [],
    capabilities: service.features?.map((feature) => feature.title) || [],
  };
});

const ClientCard = ({ client, index }) => (
  <motion.article
    variants={fadeUp}
    whileHover={{ y: -10 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className="group relative"
  >
    <div className="relative h-full bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.06)] hover:shadow-[0_30px_80px_rgba(0,0,0,0.1)] transition-shadow duration-500">
      
      <span className="absolute top-6 right-8 text-6xl font-black text-gray-50 group-hover:text-gray-100 transition-colors duration-500 z-0">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className={`relative h-56 ${client.name === "H-MAK Pvt Ltd." ? "bg-gray-950" : "bg-gray-50"} overflow-hidden`}>
        <img
          src={client.image}
          alt={`${client.name} logo`}
          loading="lazy"
          className="h-full w-full object-contain p-10 transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </div>

      <div className="relative z-10 p-8 md:p-10 -mt-8">
        <div className="flex items-center gap-4 mb-6">
          <span className="h-px w-8 bg-gray-900 group-hover:w-16 group-hover:bg-blue-600 transition-all duration-500" />
          <h3 className="text-2xl font-bold text-gray-900">{client.name}</h3>
        </div>

        <p className="text-gray-600 leading-8 mb-8">
          {client.name} partnered with CodeClub to turn business needs into a clear,
          reliable digital experience.
        </p>

        <div className="mb-8">
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">
            Problems We Solve
          </h4>
          <ul className="space-y-3">
            {client.challenges.map((challenge) => (
              <li key={challenge} className="flex items-start gap-3 text-sm text-gray-600 leading-6 group-hover:text-gray-800 transition-colors">
                <FaCheckCircle className="mt-1 shrink-0 text-gray-300 group-hover:text-blue-500 transition-colors duration-300" />
                {challenge}
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-gray-100 pt-6">
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">
            Our Approach
          </h4>
          <p className="text-sm text-gray-600 leading-7 mb-5">
            {client.service.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {client.capabilities.map((capability) => (
              <span
                key={capability}
                className="px-4 py-2 bg-gray-50 rounded-full text-xs font-medium text-gray-600 group-hover:bg-gray-100 transition-colors duration-300"
              >
                {capability}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-900">View Case Study</span>
          <motion.span
            whileHover={{ x: 5 }}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-900 group-hover:bg-blue-600 transition-colors duration-300"
          >
            <FaArrowRight className="text-white text-sm" />
          </motion.span>
        </div>
      </div>
    </div>
  </motion.article>
);

export default function Clients() {
  return (
    <main className="relative bg-white text-gray-900 overflow-hidden">
      {/* Hero */}
      <section className="relative px-6 pt-40 pb-24 md:px-16 lg:px-24">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-50 to-transparent rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-gray-50 to-transparent rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
              <span className="h-px w-12 bg-gray-900" />
              <span className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-500">
                Client Solutions
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.02]"
            >
              Problems worth
              <br />
              solving,{" "}
              <span className="relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600">
                  solutions built
                </span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                  className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-gray-900 to-gray-400 origin-left rounded-full"
                />
              </span>
              <br />
              to last.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-10 max-w-2xl text-xl text-gray-500 leading-relaxed"
            >
              We help organizations across industries turn complex needs into
              useful, scalable digital products.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="mt-16 flex flex-wrap gap-16"
          >
            {[
              { value: clients.length, label: "Trusted Clients" },
              { value: Object.keys(serviceMap).length, label: "Service Disciplines" },
              { value: "360°", label: "Solution Thinking" },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeUp}>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.15 }}
                  className="text-5xl md:text-6xl font-bold text-gray-900 block"
                >
                  {stat.value}
                </motion.span>
                <span className="text-sm text-gray-500 mt-2 block">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quote banner */}
      <section className="relative px-6 py-20 md:px-16 lg:px-24 bg-gray-950">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto text-center py-12"
        >
          <FaQuoteLeft className="text-4xl text-gray-700 mx-auto mb-8" />
          <p className="text-3xl md:text-4xl font-bold text-white leading-tight">
            "Every client brings a unique challenge.
            <br />
            <span className="text-gray-400">We bring the solution that fits.</span>"
          </p>
        </motion.div>
      </section>

      {/* Client Cards */}
      <section className="relative px-6 py-24 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mb-16"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-12 bg-gray-900" />
              <span className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-500">
                Selected Client Work
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold">
              Real projects.
              <br />
              <span className="text-gray-400">Practical outcomes.</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="grid gap-8 lg:grid-cols-2"
          >
            {clients.map((client, index) => (
              <ClientCard key={client.id} client={client} index={index} />
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}