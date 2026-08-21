import React, { useEffect } from "react";
import { motion } from "framer-motion";
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

const clientEntries = [
  {
    name: "Peshawar Service Club",
    focus: "App & management system",
    description:
      "We built an app and management system that brings member services, internal coordination, and daily reporting into one place. It gives the team a clearer workflow and makes the experience smoother for everyone involved.",
    image: getBrandImage("Peshawar Service Club", "Peshawar Services Club"),
  },
  {
    name: "Memaar Pvt Ltd.",
    focus: "WhatsApp automation & leads",
    description:
      "We set up WhatsApp automation and a lead flow that responds quickly, captures interest, and keeps follow-ups organized. That way the team can spend more time closing opportunities and less time chasing messages.",
    image: getBrandImage("Memaar Pvt Ltd."),
  },
  {
    name: "IMSciences",
    focus: "Recruiter portal",
    description:
      "We created a recruiter portal that gives hiring teams a cleaner way to publish openings, review applications, and stay on top of candidates. The process now feels more structured from the first click to the final shortlist.",
    image: getBrandImage("IMSciences"),
  },
  {
    name: "Abbottabad Club",
    focus: "Access control & billing",
    description:
      "We delivered an access control system with member billing so entry and dues stay aligned in one reliable flow. It reduces manual checking and makes day-to-day club management easier to handle.",
    image: getBrandImage("Abbottabad Club"),
  },
  {
    name: "Haasil Pvt Ltd.",
    focus: "E-commerce website",
    description:
      "We built an e-commerce website that presents the brand clearly and keeps the buying journey simple. Products, checkout, and customer trust all come together in a polished experience that feels easy to use.",
    image: getBrandImage("Haasil Pvt Ltd."),
  },
  {
    name: "H-MAK Pvt Ltd.",
    focus: "WhatsApp automation & leads",
    description:
      "We implemented WhatsApp automation with a lead pipeline that keeps inquiries moving without delay. New prospects get a fast response, and the team can manage follow-ups with more confidence.",
    image: getBrandImage("H-MAK Pvt Ltd."),
    logoTone: "dark",
  },
  {
    name: "NIC Peshawar",
    focus: "Incubation support",
    description:
      "We supported NIC Peshawar with a digital experience that helps startups and visitors find the right information faster. The final flow feels approachable, dependable, and easy to navigate.",
    image: getBrandImage("NIC Peshawar"),
  },
  {
    name: "Concordia Colleges",
    focus: "College ERP",
    description:
      "We developed a college ERP that keeps academic and administrative work in one connected system. From records to routine operations, the team gets a clearer way to manage everything from a single place.",
    image: getBrandImage("Concordia College", "Concordia Colleges"),
  },
  {
    name: "Quality Coaching Academy",
    focus: "ERP & student portal",
    description:
      "We built an ERP and student portal that gives staff and students one place for schedules, records, and updates. It trims repetitive admin work and makes daily communication feel much simpler.",
    image: getBrandImage("Quality Coaching Academy"),
  },
  {
    name: "Edwardian Coaching Academy",
    focus: "ERP & student portal",
    description:
      "We delivered an ERP and student portal that keeps academic operations tidy without adding unnecessary complexity. Students can stay informed, while staff get a steadier system for everyday management.",
    image: getBrandImage("Edwardian Coaching Academy"),
  },
  {
    name: "Genius Coaching Academy",
    focus: "ERP & student portal",
    description:
      "We created an ERP and student portal that supports daily academic management as the academy grows. It keeps information accessible and gives the team a calmer way to handle routine tasks.",
    image: getBrandImage("Genius Coaching Academy"),
  },
  {
    name: "FCA",
    focus: "ERP & student portal",
    description:
      "We built an ERP and student portal tailored for academic workflows and smoother student access. It gives the institution a practical system they can rely on every day.",
    initials: "FCA",
  },
  {
    name: "GEO Wash",
    focus: "Mobile app",
    description:
      "We developed a mobile app that makes booking and service coordination feel quick and convenient. Customers get a smoother experience, and the team has fewer manual steps to manage.",
    image: getBrandImage("GEO Wash", "GEO-Wash"),
  },
  {
    name: "LEO Learning",
    focus: "Mobile app",
    description:
      "We built a mobile app that keeps learning content within easy reach and supports students on the go. It gives the brand a simple digital home for lessons, updates, and everyday use.",
    image: getBrandImage("LEO Learning"),
  },
  {
    name: "Naqaa-Ksa",
    focus: "Mobile app",
    description:
      "We created a mobile app that matches the brand's clean service experience with a smooth digital flow. The result is a product that feels easy to use and ready for everyday customers.",
    image: getBrandImage("Naqaa-Ksa"),
  },
  {
    name: "GLEAM UK Premium Car Wash",
    focus: "Mobile app",
    description:
      "We delivered a mobile app that supports premium bookings and service coordination with less hassle. It keeps the customer journey quick while making operations easier behind the scenes.",
    image: getBrandImage("GLEAM UK Premium Car Wash", "GLEAM Uk Premium Car Wash"),
  },
  {
    name: "Feather Start Car Wash",
    focus: "Mobile app",
    description:
      "We built a mobile app that helps customers book and stay updated without extra calls or messages. The app gives the business a neat, modern way to manage service requests.",
    image: getBrandImage("Feather Start Car Wash", "Feather Star Car Wash"),
  },
  {
    name: "Skill Connect",
    focus: "Mobile app",
    description:
      "We developed a mobile app that makes access to skills, services, or learning feel more direct and user-friendly. The experience is designed to be simple for first-time users and dependable for repeat use.",
    image: getBrandImage("Skill Connect"),
  },
  {
    name: "Sayaratak",
    focus: "Mobile app & marketplace",
    description:
      "We created a mobile app and car buying-and-selling marketplace designed for quick browsing and confident decisions. Buyers and sellers can connect through a cleaner, more organized flow.",
    image: getBrandImage("Sayaratak"),
  },
  {
    name: "Paragon Overseas Education Pvt Ltd.",
    focus: "WhatsApp automation & leads",
    description:
      "We set up WhatsApp automation and lead handling so student inquiries get a fast, consistent response. That makes the first conversation smoother and helps the team stay on top of every opportunity.",
    image: getBrandImage("Paragon Overseas Education Pvt Ltd."),
  },
  {
    name: "Lavita Developers",
    focus: "Website",
    description:
      "We built a website that gives the company a clear digital presence and makes its work easy to understand at a glance. It helps turn interest into trust from the very first visit.",
    image: getBrandImage("Lavita Developers"),
  },
  {
    name: "Zamong Khyber Pvt Ltd.",
    focus: "Internal management system",
    description:
      "We delivered an internal management system that brings everyday tasks, records, and coordination into one place. The team can move faster without having to juggle scattered tools.",
    image: getBrandImage("Zamong Khyber Pvt Ltd.", "Zamung Khyber Pvt Ltd."),
  },
  {
    name: "Edge Cutting Group",
    focus: "Internal management system",
    description:
      "We created an internal management system that reduces manual effort and gives the business a cleaner way to track internal work. It is designed to keep processes visible and manageable.",
    image: getBrandImage("Edge Cutting Group"),
  },
  {
    name: "Rehmat Tax Pvt Ltd.",
    focus: "Management system",
    description:
      "We built a management system that helps organize client work, documents, and ongoing tasks with more confidence. It gives the team a steadier way to handle busy days.",
    image: getBrandImage("Rehmat Tax Pvt Ltd."),
  },
  {
    name: "Shamroz Group of Companies Pvt Ltd.",
    focus: "WhatsApp automation & leads",
    description:
      "We implemented WhatsApp automation and lead support so incoming queries get handled quickly and consistently. The setup helps the team stay responsive while keeping follow-ups under control.",
    image: getBrandImage("Shamroz Group of Companies Pvt Ltd."),
  },
  {
    name: "Muftah Chemicals Pvt Ltd.",
    focus: "Complete management system",
    description:
      "We developed a complete management system that ties core business operations together in one dependable place. It gives the team a clearer view of work as it moves from one stage to the next.",
    image: getBrandImage("Muftah Chemicals Pvt Ltd.", "Muftah Chemicals PVT LTD"),
  },
  {
    name: "New Al-Kareem Hostel",
    focus: "Hostel management system",
    description:
      "We built a hostel management system that makes room handling, resident records, and daily operations much easier to manage. It is designed to save time and keep everything organized.",
    image: getBrandImage("New Al-Kareem Hostel", "New Al-Kareem Hostal"),
  },
];

const clients = clientEntries.map((client, index) => ({
  ...client,
  id: `${client.name}-${index}`,
}));

const ClientSection = ({ client, index, total }) => {
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
          <div className="mb-6 flex items-center gap-4">
            <span className="text-xs uppercase tracking-[0.35em] text-gray-400">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </span>
            <span className="h-px flex-1 bg-gray-200" />
          </div>

          <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-500">
            {client.focus}
          </span>

          <h3 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
            {client.name}
          </h3>

          <p className="mt-6 text-lg leading-8 text-gray-600 md:text-xl">
            {client.description}
          </p>

          <p className="mt-8 text-sm font-medium uppercase tracking-[0.25em] text-gray-400">
            Scroll down for the next client
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default function Clients() {
  useEffect(() => {
    const html = document.documentElement;
    html.style.scrollSnapType = "y mandatory";
    html.style.scrollBehavior = "smooth";
    return () => {
      html.style.scrollSnapType = "";
      html.style.scrollBehavior = "";
    };
  }, []);

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
              These are the clients we’ve built apps, websites, and management systems for. Scroll through their stories — visual on the left, story on the right.
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

      {clients.map((client, index) => (
        <ClientSection
          key={client.id}
          client={client}
          index={index}
          total={clients.length}
        />
      ))}
    </main>
  );
}
