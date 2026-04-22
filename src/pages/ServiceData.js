import {
  TbBrandReactNative,
  TbBrandNextjs,
  TbBrandFirebase,
  TbBrandKotlin,
  TbBrandCss3,
  TbBrandHtml5,
} from "react-icons/tb";
import {
  SiPostgresql,
  SiDocker,
  SiJavascript,
  SiFlutter,
  SiTypescript,
  SiSwift,
  SiMysql,
  SiMongodb,
  SiKubernetes,
  SiTensorflow,
  SiPytorch,
  SiScikitlearn,
  SiR,
  SiFastapi,
  SiFlask,
  SiApachecassandra,
  SiApache,
  SiNginx,
  SiPython,
  SiCplusplus,
  SiRust,
  SiElastic,
  SiFigma,
  SiSketch,
  SiAdobe,
  SiInvision,
  SiJira,
  SiMiro,
  SiArduino,
  SiRaspberrypi,
  SiGooglecloud,
  SiInfluxdb,
  SiDiagramsdotnet,
} from "react-icons/si";

import { SiDotnet, SiElixir, SiNestjs } from "react-icons/si";
import { FaNodeJs, FaAngular, FaPython, FaJava, FaLinux } from "react-icons/fa";
import { TbBrandReact } from "react-icons/tb";
import mobImg from "../assets/mobileService.webp";
import webImg from "../assets/webService.jpg";
import cyberImg from "../assets/cyberService.jpg";
import aiImg from "../assets/aiService.jpg";
import uiImg from "../assets/uiuxService.jpg";
import iotImg from "../assets/iotService.jpg";
import { RiFirebaseFill } from "react-icons/ri";
import { FaNode } from "react-icons/fa6";
import icon1 from "../assets/icon1.png";
import icon2 from "../assets/icon2.png";
import icon3 from "../assets/icon3.webp";
import icon4 from "../assets/icon4.png";
import icon5 from "../assets/icon5.png";
import icon6 from "../assets/icon6.png";
import icon7 from "../assets/icon7.webp";
import icon8 from "../assets/icon8.png";
import icon9 from "../assets/icon9.png";
import icon10 from "../assets/icon10.png";
import icon11 from "../assets/icon11.png";
import icon12 from "../assets/icon12.png";
import icon13 from "../assets/icon13.webp";
import icon14 from "../assets/icon14.png";
import icon15 from "../assets/icon15.png";
import tensor from "../assets/tensor.jpg";
import then from "../assets/thenn.jpg";
import pytorch from "../assets/pytorch-logo.jpg"
import reactnative from "../assets/reactnative-logo.jpg";
import hip from "../assets/hipaa.jpg";
import fisma from "../assets/badges-fisma.jpg";
import nist from "../assets/nist.jpg";
import go from "../assets/golang.jpg";
import c from "../assets/c.jpg";
import nmp from "../assets/nmap.jpg";
import sem from "../assets/siem.jpg";
import figma from "../assets/figma.jpg";
import adobe from "../assets/adobe.jpg";
import x from "../assets/x.jpg";
import firm from "../assets/firmware.jpg";
import mqt from "../assets/mqtt.jpg";

export const serviceMap = {
  "mobile-apps": {
    title: "Mobile Apps Development",
    description:
      "Transform your vision into high-performance mobile applications that are intuitive, scalable, and built for both iOS and Android platforms.",
    bgImage: mobImg,
    features: [
      {
        title: "Cross-Platform App Development",
        items: ["Messaging apps", "Social media apps", "Productivity tools"],
      },
      {
        title: "Native App Development",
        items: ["Mobile banking apps", "Fitness tracking apps", "Gaming apps"],
      },
      {
        title: "Hybrid App Development",
        items: ["E-commerce apps", "Educational apps", "Event management apps"],
      },
    ],
    techStack: {
      frameworks: [
        { name: "React Native", icon: reactnative},
        { name: "Flutter", icon: icon4 }, // kept icon placeholders
        { name: "Ionic / Capacitor", icon: icon1 },
      ],
      languages: [
        { name: "JavaScript / TypeScript", icon: icon5 },
        { name: "React Native", icon: reactnative},
        { name: "Swift (iOS)", icon: icon4 },
        { name: "Kotlin (Android)", icon: icon1 },
      ],
      mobDev: [
        { name: "React Native", icon: icon10 },
        { name: "Swift (native iOS)", icon: icon4 },
        { name: "Kotlin (native Android)", icon: icon1 },
      ],
      database: [
        { icon: icon12, name: "Firebase (Realtime / Firestore)" },
        { icon: icon15, name: "PostgreSQL (server)" },
        { icon: icon13, name: "MongoDB (sync / offline)" },
      ],
      devops: [
        { icon: icon9, name: "Docker (CI/CD containers)" },
        { icon: icon12, name: "Firebase (hosting / auth / analytics)" },
        { icon: icon14, name: "CI/CD (GitHub Actions / Fastlane)" },
      ],
    },
    industries: [
      {
        title: "FinTech",
        items: [
          "Billing & Payment Solutions",
          "Financial Analytics",
          "Personal Finance Management Apps",
        ],
      },
      {
        title: "HealthTech",
        items: [
          "EHR, EMR, Patient Portal",
          "Telemedicine Platforms",
          "Patient Monitoring",
        ],
      },
      {
        title: "  E-commerce",
        items: [
          "B2B, B2C, C2C Platforms",
          "Shopping Cart Solutions",
          "Customer Relationship Management",
        ],
      },
    ],

    team: [
      { name: "Amad ur Rehman", role: "Team Lead" },
      { name: "Abdullah", role: "Senior App Developer" },
      { name: "Affan", role: "Junior App Developer" },
      { name: "Sharif", role: "Junior App Developer" },

    ],
  },

  "web-development": {
    title: "Web Development",
    description:
      "Craft performant, user-focused web applications with robust backends and pixel-perfect frontends that elevate your brand’s digital presence.",
    bgImage: webImg,
    features: [
      {
        title: "E-commerce Development",
        items: [
          "Online retail stores",
          "Subscription services",
          "Multi-vendor marketplaces",
        ],
      },
      {
        title: "Content Management Systems (CMS)",
        items: [
          "Blogging platforms",
          "Corporate websites",
          "Online publications",
        ],
      },
      {
        title: "Customer Portals",
        items: [
          "Customer service portals",
          "Account management systems",
          "Self-service dashboards",
        ],
      },
    ],
    techStack: {
      frameworks: [
        { name: "React / Next.js", icon: icon10 },
        { name: "Angular", icon: icon7 },
        { name: "NestJS (backend)", icon: icon11 },
      ],
      languages: [
        { name: "JavaScript / TypeScript", icon: icon5 },
        { name: "Node.js (server-side)", icon: icon3 },
        { name: "Python / PHP (where required)", icon: icon2 },
      ],
      webDev: [
        { name: "React / Next.js (SSR & SSG)", icon: icon10 },
        { name: "REST & GraphQL APIs", icon: icon11 },
        { name: "Serverless (optional)", icon: icon12 },
      ],
      database: [
        { icon: icon15, name: "PostgreSQL" },
        { icon: icon14, name: "MySQL / MariaDB" },
        { icon: icon13, name: "MongoDB" },
        { icon: icon12, name: "Firebase (auth & realtime features)" },
      ],
      devops: [
        { icon: icon9, name: "Docker (containers)" },
        { icon: icon12, name: "Firebase / Vercel (hosting)" },
        { icon: icon15, name: "CI/CD (GitHub Actions, pipelines)" },
      ],
    },
    industries: [
      {
        title: "FinTech",
        items: [
          "Billing & Payment Solutions",
          "Financial Analytics",
          "Personal Finance Management",
        ],
      },
      {
        title: "HealthTech",
        items: [
          "EHR, EMR, Patient Portal",
          "Telemedicine Platforms",
          "Patient Monitoring",
        ],
      },
      {
        title: "  E-commerce",
        items: [
          "B2B, B2C, C2C Platforms",
          "Shopping Cart Solutions",
          "Customer Relationship Management",
        ],
      },
    ],

    team: [
      {
        name: "Atif Muhammad",
        role: "Team lead",
        LinkedIn: "https://www.linkedin.com/in/atif-muhammad-ba1396289/",
      },
      
      {
        name: " Muhammad Zaigham",
        role: "Frontend Developer",
        LinkedIn: "www.linkedin.com/in/muhammad-zaigham-960008260",
      },
      {
        name: "Muzammil Shiraz",
        role: "Full-stack Developer",
        LinkedIn: "https://www.linkedin.com/in/muzammil-shiraz/",
      },
      {
        name: "Abdur Rehman",
        role: "Full-stack Developer",
        LinkedIn: "https://www.linkedin.com/in/musa-bukhari/",
      },
    ],
  },

  ai: {
    title: "AI & ML Solutions",
    description:
      "Leverage cutting-edge artificial intelligence to build predictive, intelligent, and adaptive software systems that evolve with your data.",
    bgImage: aiImg,
    features: [
      {
        title: "Intelligent Automation",
        items: [
          "AI chatbots & assistants",
          "Image & speech recognition",
          "Predictive analytics",
        ],
      },
      {
        title: "Data-Driven Insights",
        items: [
          "Natural Language Processing (NLP)",
          "Deep learning models",
          "Computer vision",
        ],
      },
      {
        title: "Scalable & Adaptive Systems",
        items: [
          "Machine learning pipelines",
          "Model deployment & management",
          "AI-powered recommendation engines",
        ],
      },
    ],
    techStack: {
      frameworks: [
        { name: "TensorFlow / Keras", icon: tensor },
        { name: "PyTorch", icon: then},
        { name: "scikit-learn (classical ML)", icon: pytorch },
      ],
      languages: [
        { name: "Python (primary)", icon: icon3 },
       
      ],
      ai: [
        { name: "TensorFlow", icon: icon3 },
        { name: "PyTorch", icon: tensor },
        { name: "scikit-learn", icon: pytorch },
      ],
      database: [
        { icon: icon15, name: "PostgreSQL (feature store)" },
        { icon: icon14, name: "MySQL" },
        { icon: icon13, name: "MongoDB (unstructured data)" },
        { icon: icon12, name: "Firebase (lightweight RT needs)" },
      ],
      devops: [
        { icon: icon9, name: "Docker (model containers)" },
        { icon: icon12, name: "MLflow / Firebase (tracking & hosting)" },
        { icon: icon15, name: "CI/CD for models (pipelines)" },
      ],
    },
    industries: [
      {
        title: "Healthcare",
        items: [
          "Medical image diagnostics",
          "Patient data predictions",
          "Chatbot triage systems",
        ],
      },
      {
        title: "Finance",
        items: [
          "Risk assessment engines",
          "Smart fraud detection",
          "Automated credit scoring",
        ],
      },
      {
        title: "Retail",
        items: [
          "Personalized product recommendations",
          "Supply chain optimization",
          "Demand forecasting",
        ],
      },
    ],

    team: [
      { name: "Ihtisham Ul Haq", role: "Team Lead" },
    ],
  },

  cybersecurity: {
    title: "Cybersecurity Services",
    description:
      "Protect your digital assets with proactive security solutions, penetration testing, and 24/7 monitoring tailored to your risk profile.",
    bgImage: cyberImg,
    features: [
      {
        title: "Enterprise-Grade Security",
        items: [
          "Threat modeling & mitigation",
          "Zero-trust architecture",
          "Incident response & forensics",
        ],
      },
      {
        title: "Vulnerability Management",
        items: [
          "Penetration testing",
          "Security audits & assessments",
          "Compliance & governance",
        ],
      },
      {
        title: "24/7 Security Operations",
        items: [
          "Real-time threat monitoring",
          "Intrusion detection systems",
          "Security Information and Event Management (SIEM)",
        ],
      },
    ],
    techStack: {
      frameworks: [
        { name: "Security automation & orchestration", icon: hip },
        { name: "Threat intel platforms", icon: fisma },
        { name: "SIEM integrations", icon: nist },
      ],
      languages: [
        { name: "Python (scripting & automation)", icon: icon3 },
        { name: "Go / Rust (high-performance tooling)", icon: go },
        { name: "C / C++ (low-level analysis)", icon: c },
      ],
      cybersecurity: [
        { name: "Penetration testing tools (Nmap, Burp)", icon: nmp },
        { name: "SIEM / EDR integrations", icon: sem },
      ],
      database: [
        { icon: icon15, name: "PostgreSQL (alerts & logs)" },
        { icon: icon13, name: "MongoDB (events / telemetry)" },
        { icon: icon12, name: "Firebase (notifications / quick prototypes)" },
      ],
      devops: [
        { icon: icon9, name: "Docker (isolated tooling)" },
        { icon: icon12, name: "Cloud logging & monitoring (Firebase / GCP)" },
      ],
    },
    industries: [
      {
        title: "Banking & Finance",
        items: [
          "Transaction security layers",
          "Real-time anomaly detection",
          "Regulatory compliance enforcement",
        ],
      },
      {
        title: "Healthcare",
        items: [
          "Encrypted medical records",
          "Breach simulations",
          "HIPAA readiness assessments",
        ],
      },
      {
        title: "E-commerce",
        items: [
          "Payment gateway security",
          "DDoS protection",
          "Customer data protection",
        ],
      },
    ],
    team: [],
  },

  "ui-ux": {
    title: "UI/UX Design",
    description:
      "Create human-centered, intuitive, and beautiful digital experiences that drive engagement and retention through strategic design.",
    bgImage: uiImg,
    features: [
      {
        title: "Design-Led Innovation",
        items: [
          "User journey mapping",
          "Design systems & components",
          "Interactive prototypes & testing",
        ],
      },
      {
        title: "User Research & Strategy",
        items: [
          "User persona creation",
          "Competitive analysis",
          "Usability testing & interviews",
        ],
      },
      {
        title: "Visual & Interaction Design",
        items: [
          "High-fidelity mockups",
          "Micro-interactions & animations",
          "Accessibility & inclusive design",
        ],
      },
    ],
    techStack: {
      Tools: [
        { name: "Design systems (Figma / Adobe XD)", icon: figma },
        { name: "Prototyping & testing", icon: adobe },
      ],
      
    },
    industries: [
      {
        title: "Startups",
        items: [
          "MVP design sprints",
          "Brand-first UI",
          "Fast iteration cycles",
        ],
      },
      {
        title: "Enterprise",
        items: [
          "Accessible UI at scale",
          "Multi-platform consistency",
          "Custom UI component libraries",
        ],
      },
      {
        title: "E-commerce & Retail",
        items: [
          "Optimized checkout flows",
          "Product catalog design",
          "Conversion rate optimization",
        ],
      },
    ],
      team: [],

  },
  iot: {
    title: "IoT Development",
    description:
      "Connect devices, data, and users through scalable IoT solutions — from smart homes to industrial automation and predictive maintenance.",
    bgImage: iotImg,
    features: [
      {
        title: "Connected Ecosystems",
        items: [
          "Sensor integration",
          "Real-time device dashboards",
          "Edge computing optimization",
        ],
      },
      {
        title: "Data Management & Analytics",
        items: [
          "Cloud integration & data lakes",
          "Real-time stream processing",
          "Machine learning for IoT data",
        ],
      },
      {
        title: "Security & Scalability",
        items: [
          "Device authentication & encryption",
          "Over-the-air (OTA) updates",
          "Scalable cloud infrastructure",
        ],
      },
    ],
    techStack: {
      frameworks: [
        { name: "Edge frameworks (EdgeX, custom Node services)", icon: x },
        { name: "MQTT / CoAP stacks", icon: firm },
        { name: "Embedded firmware toolchains", icon: mqt },
      ],
      languages: [
        { icon: icon3, name: "golang (data & server side)", icon: go },
        { icon: icon2, name: "C / C++ (firmware)", icon: c },
        { icon: icon5, name: "JavaScript / Node.js (edge services)" },
      ],
      database: [
        { icon: icon15, name: "PostgreSQL (long-term storage)" },
        { icon: icon14, name: "MySQL (device metadata)" },
        { icon: icon13, name: "MongoDB (telemetry)" },
        { icon: icon12, name: "Firebase (prototypes / realtime dashboards)" },
      ],
      devops: [
        { icon: icon9, name: "Docker (edge & cloud containers)" },
        { icon: icon12, name: "Cloud IoT Platform (Firebase / GCP)" },
        { icon: icon15, name: "Time-series / monitoring (InfluxDB, Prometheus)" },
      ],
    },
    industries: [
      {
        title: "Smart Cities",
        items: [
          "Traffic & utility management",
          "Surveillance integrations",
          "Waste & water monitoring",
        ],
      },
      {
        title: "Manufacturing",
        items: [
          "Predictive maintenance",
          "Remote equipment control",
          "Production analytics",
        ],
      },
      {
        title: "Healthcare & Wellness",
        items: [
          "Remote patient monitoring",
          "Smart medical device management",
          "Personalized health tracking",
        ],
      },
    ],
      team: [],

  },
};
