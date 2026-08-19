import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaBuilding, FaCheckCircle } from "react-icons/fa";
import { serviceMap } from "./ServiceData";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const viewport = { once: true, amount: 0.15 };

const clientSectors = Object.entries(serviceMap).flatMap(([slug, service]) =>
  (service.industries || []).map((industry, index) => ({
    id: `${slug}-${index}`,
    slug,
    service,
    industry: industry.title.trim(),
    challenges: industry.items,
    solution: service.description,
    capabilities: service.features?.map((feature) => feature.title) || [],
  }))
);

const uniqueSectors = clientSectors.filter(
  (client, index, clients) =>
    clients.findIndex(
      (item) =>
        item.industry.toLowerCase() === client.industry.toLowerCase()
    ) === index
);

const ClientCard = ({ client, index }) => (
  <motion.article
    variants={fadeUp}
    whileHover={{ y: -8 }}
    className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_16px_45px_rgba(15,23,42,0.08)]"
  >
    <div
      className="relative h-44 overflow-hidden bg-slate-900 bg-cover bg-center"
      style={{ backgroundImage: `url(${client.service.bgImage})` }}
    >
      <div className="absolute inset-0 bg-slate-950/65 transition-colors duration-500 group-hover:bg-slate-950/45" />
      <div className="relative flex h-full items-end justify-between p-6 text-white">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">
            {client.service.title}
          </p>
          <h2 className="text-3xl font-bold">{client.industry}</h2>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 backdrop-blur transition-transform duration-300 group-hover:translate-x-1">
          <FaArrowRight />
        </div>
      </div>
    </div>

    <div className="p-7">
      <div className="mb-6">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
          Problems we solve
        </p>
        <ul className="space-y-3">
          {client.challenges.map((challenge) => (
            <li key={challenge} className="flex items-start gap-3 text-sm leading-6 text-slate-600">
              <FaCheckCircle className="mt-1 shrink-0 text-blue-500" />
              {challenge}
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-slate-100 pt-5">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-yellow-600">
          Our approach
        </p>
        <p className="text-sm leading-7 text-slate-500">{client.solution}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {client.capabilities.map((capability) => (
            <span key={capability} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              {capability}
            </span>
          ))}
        </div>
      </div>
    </div>
  </motion.article>
);

export default function Clients() {
  return (
    <main className="overflow-hidden bg-white text-slate-900">
      <section className="relative isolate px-6 pb-20 pt-36 md:px-16 lg:px-24 lg:pb-28">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 opacity-60"
          style={{
            backgroundImage:
              "linear-gradient(rgba(37,99,235,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.07) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
            maskImage: "linear-gradient(to bottom, black, transparent 85%)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent 85%)",
          }}
        />
        <div className="mx-auto max-w-7xl">
          <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-4xl">
            <motion.div variants={fadeUp} className="mb-6 flex items-center gap-3">
              <FaBuilding className="text-blue-600" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-blue-700">
                Client solutions
              </span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl font-bold leading-[1.02] tracking-tight md:text-7xl">
              Problems worth solving, <span className="text-blue-600">solutions built to last.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-8 max-w-3xl text-lg leading-8 text-slate-600">
              We help organizations across industries turn complex needs into useful, scalable digital products. Explore the challenges our services are designed to solve.
            </motion.p>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="show" className="mt-12 grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-slate-950 p-5 text-white">
              <p className="text-3xl font-bold">{uniqueSectors.length}</p>
              <p className="mt-1 text-sm text-slate-400">Client sectors</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-3xl font-bold text-blue-600">{Object.keys(serviceMap).length}</p>
              <p className="mt-1 text-sm text-slate-500">Specialist services</p>
            </div>
            <div className="col-span-2 rounded-2xl border border-yellow-200 bg-yellow-50 p-5 md:col-span-1">
              <p className="text-3xl font-bold text-yellow-700">360°</p>
              <p className="mt-1 text-sm text-yellow-800/70">Solution thinking</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-20 md:px-16 lg:px-24 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp} className="mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-yellow-600">Across industries</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">How we create client value.</h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={stagger} className="grid gap-8 lg:grid-cols-2">
            {uniqueSectors.map((client, index) => (
              <ClientCard key={client.id} client={client} index={index} />
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
