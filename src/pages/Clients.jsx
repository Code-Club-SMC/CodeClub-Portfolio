import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { brands } from "../components/brands";
import { serviceMap } from "./ServiceData";
import clientsData from "../data/clientsData.json";

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

const splashPalettes = [
  {
    glow: "from-sky-300/40 via-white/70 to-transparent",
    ring: "border-sky-200/70",
  },
  {
    glow: "from-emerald-300/40 via-white/70 to-transparent",
    ring: "border-emerald-200/70",
  },
  {
    glow: "from-amber-300/40 via-white/70 to-transparent",
    ring: "border-amber-200/70",
  },
  {
    glow: "from-rose-300/40 via-white/70 to-transparent",
    ring: "border-rose-200/70",
  },
  {
    glow: "from-violet-300/40 via-white/70 to-transparent",
    ring: "border-violet-200/70",
  },
  {
    glow: "from-cyan-300/40 via-white/70 to-transparent",
    ring: "border-cyan-200/70",
  },
];

const getPalette = (index) => splashPalettes[index % splashPalettes.length];

const normalizeKey = (value) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

const brandLookup = brands.reduce((lookup, brand) => {
  lookup[normalizeKey(brand.name)] = brand.image;
  return lookup;
}, {});

const getBrandImage = (...aliases) => {
  for (const alias of aliases) {
    const image = brandLookup[normalizeKey(alias)];
    if (image) return image;
  }
  return null;
};

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(`${import.meta.env.VITE_API_BASE || "http://localhost:5000"}/api/clients`);
      if (!res.ok) throw new Error("Failed to fetch clients");
      const data = await res.json();
      const clientsList = Array.isArray(data.clients) ? data.clients : [];
      const mapped = clientsList.map((client, index) => {
        const name = client.name || `Client ${index + 1}`;
        const focus = client.service || client.focus || "";
        const description = client.description || "";
        const logo = client.logo || getBrandImage(name);
        return {
          id: client._id || client.id || `${name}-${index}`,
          name,
          focus,
          description,
          image: logo,
          initials: name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase(),
          logoTone: client.logoTone || (logo ? "" : "dark"),
        };
      });
      setClients(mapped);
    } catch (err) {
      setError("Unable to load clients right now. Showing cached content.");
      console.error("Clients fetch error:", err);
      const fallback = clientsData.map((client, index) => {
        const name = client.name;
        return {
          id: `${name}-${index}`,
          name,
          focus: client.focus,
          description: client.description,
          image: client.brandName ? getBrandImage(client.brandName) : null,
          initials: name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase(),
          logoTone: client.logoTone || "",
        };
      });
      setClients(fallback);
    } finally {
      setLoading(false);
    }
  };

  const ClientSection = ({ client, index }) => {
    const palette = getPalette(index);
    const hasImage = Boolean(client.image);
    const isDarkFrame = client.logoTone === "dark";

    return (
      <section
        className={`h-screen snap-start [scroll-snap-stop:always] flex items-center justify-center px-6 py-12 md:px-16 md:py-16 lg:px-24 pt-20 relative overflow-hidden ${
          index % 2 === 0 ? "bg-white" : "bg-gray-50"
        }`}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        <div
          className={`absolute right-0 top-0 -z-10 h-[420px] w-[420px] rounded-full bg-gradient-to-br ${palette.glow} blur-3xl`}
        />
        <div
          className={`absolute left-0 bottom-0 -z-10 h-[360px] w-[360px] rounded-full bg-gradient-to-tr ${palette.glow} blur-3xl`}
        />

        <div className="mx-auto grid max-w-7xl items-center gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-8 w-full">
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative flex min-h-[380px] items-center justify-center"
          >
            <div
              className={`absolute inset-10 rounded-full bg-gradient-to-br ${palette.glow} blur-3xl`}
            />
            <div
              className={`relative w-full max-w-[460px] rounded-[2.5rem] border ${palette.ring} bg-white/85 p-6 shadow-[0_30px_100px_rgba(15,23,42,0.12)] backdrop-blur-xl`}
            >
              <div
                className={`overflow-hidden rounded-[1.75rem] ${
                  isDarkFrame ? "bg-gray-950" : "bg-gray-50"
                } p-8`}
              >
                {hasImage ? (
                  <img
                    key={client.id}
                    src={client.image}
                    alt={`${client.name} logo`}
                    loading="lazy"
                    className="h-[280px] w-full object-contain"
                  />
                ) : (
                  <div className="flex h-[280px] w-full items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-gray-950 via-slate-900 to-gray-800 text-center">
                    <div>
                      <span className="block text-5xl font-black tracking-tight text-white">
                        {client.initials}
                      </span>
                      <span className="mt-3 block text-xs font-semibold uppercase tracking-[0.35em] text-gray-400">
                        Custom build
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-500">
              {client.focus}
            </span>

            <h3 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
              {client.name}
            </h3>

            <p className="mt-6 text-lg leading-8 text-gray-600 md:text-xl">
              {client.description}
            </p>
          </motion.div>
        </div>
      </section>
    );
  };

  return (
    <main className="relative bg-white text-gray-900">
      <section className="snap-start [scroll-snap-stop:always] relative min-h-screen flex items-center justify-center px-6 pt-20 md:px-16 lg:px-24 overflow-hidden">
        <div className="absolute right-0 top-0 -z-10 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-blue-50 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-gray-50 to-transparent blur-3xl" />

        <div className="mx-auto max-w-7xl">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.h1
              variants={fadeUp}
              className="text-6xl font-bold tracking-tight leading-[1.02] md:text-7xl lg:text-8xl"
            >
              Short Intro Of,
              <br />
              <span className="relative">
                <span className="bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text text-transparent">
                  Our Success Story
                </span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                  className="absolute -bottom-2 left-0 h-1 w-full origin-left rounded-full bg-gradient-to-r from-gray-900 to-gray-400"
                />
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-10 max-w-2xl text-xl leading-relaxed text-gray-500"
            >
              These are the clients we've built apps, websites, and management systems for. Scroll through their stories — visual on the left, story on the right.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="mt-16 flex flex-wrap gap-16"
          >
            {[
              { value: "75+", label: "Trusted Clients" },
              { value: "10+", label: "Service Disciplines" },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeUp}>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.15 }}
                  className="block text-5xl font-bold text-gray-900 md:text-6xl"
                >
                  {stat.value}
                </motion.span>
                <span className="mt-2 block text-sm text-gray-500">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="snap-start [scroll-snap-stop:always] relative px-6 py-16 pt-20 md:px-16 md:py-20 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={fadeUp}
            className="max-w-3xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gray-400">
              Client spotlight
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
              One partnership stays in focus.
            </h2>
            <p className="mt-5 text-lg leading-8 text-gray-600">
              Each scroll step reveals a single client and the product we built for them. Apps, websites, and management tools that solve real problems.
            </p>
          </motion.div>
        </div>
      </section>

      {loading ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">Loading clients...</p>
        </div>
      ) : error ? (
        <div className="text-center py-4">
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      ) : (
        clients.map((client, index) => (
          <ClientSection
            key={client.id}
            client={client}
            index={index}
          />
        ))
      )}
    </main>
  );
};

export default Clients;
