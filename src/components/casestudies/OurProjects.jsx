import React from "react";
import { motion } from "framer-motion";

import web_project1 from "../../assets/web_project1.png";
import web_project2 from "../../assets/web_project2.png";
import web_project3 from "../../assets/web_project3.png";
import web_project4 from "../../assets/web_project4.png";
import web_project5 from "../../assets/web_project5.png";
import web_project6 from "../../assets/web_project6.png";
import web_project7 from "../../assets/web-project7.png";
import web_project8 from "../../assets/web-project8.png";
import hasil from "../../assets/web-hassil.jpg";

import ai_project from "../../assets/ai_project.png";
import app_project from "../../assets/app_project.png";
import app_project2 from "../../assets/app_project2.png";
import app_project3 from "../../assets/app_project3.png";
import cyber_project1 from "../../assets/cyber_project1.png";
import App5 from "../../assets/App_project5.jpg";
import App6 from "../../assets/psc-app.jpeg";
const projects = [

   {
    title: "Peshawar Services Club",
   description:
      "Complete solution with product management, orders, insights, and a sleek admin panel—fast and scalable.",
   image: App6,
   },
  {
    title: "SavSplit",
    description:
      "Dual-mode app for personal and business use. Personal: split bills, track expenses. Business: manage inventory, record sales—like QuickBooks & Splitwise in one.",
    image: app_project,
  },

   {
   title: "Haasil - Multi vendor E-commerce Platform",
   description:
    "A comprehensive e-commerce platform supporting multiple vendors with features like product management, order tracking, and analytics.",
   image: hasil,
  },
  {
    title: "SEIZURE SENSE",
    description:
      "AN AI/ML-based system that analyzes brain signals (EEG DATA) to predict epileptic seizures in advance. It alerts the patient before an attack, allowing them to move to a safe environment and reduce the risk of injury.",
    image: ai_project,
  },
  {
    title: "NovaSuite – AI SaaS Platform for Creative & Diagnostic Tools",
    description:
      "A powerful AI SaaS platform offering image generation, blog suggestions, background removal, resume review, and disease diagnostics—streamlining work through smart automation.",
    image: web_project1,
  },


  {
    title: "Custom LMS for an Education Platform",
    description:
      "Supports live classes, quizzes, certification, and user dashboards for students, instructors, and admins. Built for scale.",
    image: web_project3,
  },
  {
    title: "Essence — Scalable E-commerce Platform",
    description:
      "A modern e-commerce app with smart search, secure checkout, and mobile-first design for smooth shopping across devices.",
    image: web_project4,
  },
  {
    title: "Shopify — Full-featured E-commerce & Admin Panel",
    description:
      "Complete solution with product management, orders, insights, and a sleek admin panel—fast and scalable.",
    image: web_project5,
  },
  {
    title: "Zmong Khyber Game Show",
    description:
      "Complete solution with product management, orders, insights, and a sleek admin panel—fast and scalable.",
    image: web_project7,
  },
  {
   title: "Federal Youth Parliament",
  description:
    "Complete solution with product management, orders, insights, and a sleek admin panel—fast and scalable.",
   image: App5,
   },
  {
    title: "VibeHive — Real-time Chat & Collaboration App",
    description:
      "Group chat, media sharing, presence indicators, and a clean UI. Built for seamless team and community communication.",
    image: web_project6,
  },
  {
    title: "Inventory Management System for a Multi location Retail Chain",
    description:
      "Tracks real-time stock, reduces overstocking, and streamlines supply operations. Includes barcode integration, role-based access, and reporting.",
    image: web_project2,
  },
  {
    title: "Halatick — Restaurant Ordering & Management App",
    description:
      "Order dine-in, takeaway, or delivery. Includes digital menus, live order tracking, and table reservations.",
    image: app_project2,
  },
  {
    title: "Khyber Pakhtunkhwa — Tourism Discovery App",
    description:
      "Guides, maps, offline support, and trip planning to explore KP’s historical, cultural, and natural treasures.",
    image: app_project3,
  },
    {
    title: "Smart Dual Finance",
     description:
       "Same as above, presented for another use case. Finance management across personal and business settings.",
     image: cyber_project1,
    },
];

const getGradientColor = (index) => {
  const blue = "#2a7de3";
  const yellow = "rgb(250, 204, 21)";
  const black = "rgb(30, 30, 30)";
  const gradients = [
    [blue, black],
    [black, yellow],
  ];
  return gradients[index % gradients.length];
};

const OurProjects = () => {
  return (
    <div className="w-full px-4 space-y-10 relative z-10">
      {projects.map((project, index) => {
        const isReversed = index % 2 === 1;
        const [startColor, endColor] = getGradientColor(index);

        return (
          <motion.div
            key={index}
            initial={{
              background: `linear-gradient(to right, ${startColor}, ${endColor})`,
            }}
            animate={{
              background: `linear-gradient(to right, ${startColor}, ${endColor})`,
            }}
            whileHover={{
              background: `linear-gradient(to right, ${endColor}, ${startColor})`,
              scale: 1.02,
            }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden shadow-2xl text-white"
          >
            <div
              className={`max-w-7xl mx-auto flex flex-col md:flex-row ${isReversed ? "md:flex-row-reverse" : ""
                } items-center px-6 py-16 gap-8`}
            >
              {/* Text */}
              <div className="md:w-1/2 space-y-4">
                <h3 className="text-3xl font-bold">{project.title}</h3>
                <p className="text-base text-white/90">{project.description}</p>
              </div>

              {/* Image */}
              <div className="md:w-1/2 h-64">
                <motion.div
                  whileHover={{ y: -10, rotate: 1, scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-full h-64 flex items-center justify-center"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="max-h-full max-w-full object-contain drop-shadow-xl pointer-events-none"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default OurProjects;
