import React from "react";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaLinkedin,
  FaUsers,
  FaLightbulb,
  FaCode,
  FaChartLine,
} from "react-icons/fa";
import ContactMain from "../components/contactMain.jsx";

const team = {
  ceo: {
    name: "Abdullah Qureshi",
    role: "Chief Executive Officer",
    linkedin:
      "https://www.linkedin.com/in/abdullah-qureshi-61813631a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    bio: "Leading CodeClub with a vision for innovation and growth.",
  },
  executives: [
    {
      name: "Muhammad Affan",
      role: "Chief Technology Officer",
      linkedin: "https://www.linkedin.com/in/muhammad-affan-77bb91200/",
      bio: "Architecting scalable systems and ensuring top-notch code quality.",
    },
    {
      name: "Atif Muhammad",
      role: "Manager",
      linkedin: "https://www.linkedin.com/in/atif-muhammad-ba1396289/",
      bio: "Driving operational excellence and process optimization.",
    },
  ],
};

const values = [
  {
    icon: FaLightbulb,
    title: "Vision",
    desc: "We think beyond the brief to understand the bigger picture and long-term impact.",
  },
  {
    icon: FaCode,
    title: "Craft",
    desc: "We sweat the important details that make products exceptional and memorable.",
  },
  {
    icon: FaChartLine,
    title: "Momentum",
    desc: "We keep good ideas moving with focused execution and continuous delivery.",
  },
];

const stats = [
  { label: "Completed Projects", value: "99+" },
  { label: "Experts", value: "18+" },
  { label: "Client Satisfaction", value: "98.95%" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const viewportOnce = { once: true, amount: 0.2 };

const initials = (name) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

/* Leadership card — clean, one accent color, quiet hover lift */
const LeadershipCard = ({ member, featured = false }) => (
  <motion.div
    variants={fadeUp}
    whileHover={{ y: -4 }}
    className={`rounded-xl p-8 border transition-shadow duration-300 ${
      featured
        ? "bg-blue-600 border-blue-600 text-white hover:shadow-lg hover:shadow-blue-200"
        : "bg-white border-gray-200 hover:shadow-lg hover:shadow-gray-100"
    }`}
  >
    <div className="flex items-center gap-4 mb-6">
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold ${
          featured ? "bg-white/15 text-white" : "bg-blue-50 text-blue-700"
        }`}
      >
        {initials(member.name)}
      </div>
      <div>
        <h3 className={`font-semibold text-base ${featured ? "text-white" : "text-gray-900"}`}>
          {member.name}
        </h3>
        <p className={`text-sm ${featured ? "text-blue-100" : "text-blue-600"}`}>
          {member.role}
        </p>
      </div>
    </div>

    <p className={`text-sm leading-6 mb-6 ${featured ? "text-blue-50" : "text-gray-600"}`}>
      {member.bio}
    </p>

    <a
      href={member.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${
        featured ? "text-white hover:text-blue-100" : "text-gray-700 hover:text-blue-600"
      }`}
    >
      <FaLinkedin className="text-base" />
      LinkedIn
    </a>
  </motion.div>
);

/* Statement card — restrained, single accent */
const StatementCard = () => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={viewportOnce}
    transition={{ duration: 0.6 }}
    className="rounded-xl bg-gray-950 p-10 text-white"
  >
    <p className="text-3xl font-semibold leading-tight mb-10">
      Built to move
      <br />
      ideas forward.
    </p>

    <div className="pt-6 border-t border-white/10">
      <p className="font-medium text-sm">CodeClub Leadership</p>
      <p className="text-xs text-gray-400 mt-1">Founded with purpose</p>
    </div>

    <div className="grid grid-cols-3 gap-2 mt-6">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white/5 rounded-lg p-4">
          <p className="text-2xl font-semibold">{stat.value}</p>
          <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  </motion.div>
);

/* Value row — single accent, no rings or gradients */
const ValueItem = ({ icon: Icon, index, title, description }) => (
  <motion.div
    variants={fadeUp}
    className="flex items-start gap-5 py-6 border-b border-gray-100 last:border-0"
  >
    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
      <Icon className="text-blue-600 text-sm" />
    </div>
    <div>
      <div className="flex items-center gap-3 mb-1">
        <span className="text-xs font-semibold text-gray-400">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="text-sm text-gray-600 leading-6">{description}</p>
    </div>
  </motion.div>
);

export default function TeamSection() {
  return (
    <main className="bg-white text-gray-900">
      {/* Hero */}
      <section className="px-6 pt-36 pb-20 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div initial="hidden" animate="show" variants={staggerContainer}>
              <motion.h1
                variants={fadeUp}
                className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]"
              >
                The people behind
                <br />
                <span className="text-blue-600">the work.</span>
              </motion.h1>

              <motion.p variants={fadeUp} className="mt-8 max-w-xl text-lg text-gray-600 leading-8">
                Strategy, engineering, and care in one focused team. We turn
                ambitious ideas into products people can rely on.
              </motion.p>

              <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaUsers className="text-blue-600" />
                  One focused team
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaLightbulb className="text-blue-600" />
                  Built around ideas
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-10">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-7 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors duration-300"
                >
                  Work With Us
                  <FaArrowRight className="text-sm" />
                </a>
              </motion.div>
            </motion.div>

            <StatementCard />
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="px-6 py-20 md:px-16 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer}
            className="mb-12"
          >
            <motion.h2 variants={fadeUp} className="text-4xl font-bold">
              The team setting the pace.
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer}
            className="grid gap-6 lg:grid-cols-3"
          >
            <LeadershipCard member={team.ceo} featured />
            {team.executives.map((member) => (
              <LeadershipCard key={member.name} member={member} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 py-20 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={fadeUp}>
              <h2 className="text-4xl font-bold leading-tight">
                Principles that
                <br />
                guide everything
                <br />
                we do.
              </h2>
            </motion.div>

            <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={staggerContainer}>
              {values.map((value, i) => (
                <ValueItem
                  key={value.title}
                  icon={value.icon}
                  index={i}
                  title={value.title}
                  description={value.desc}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <div id="contact">
        <ContactMain />
      </div>
    </main>
  );
}