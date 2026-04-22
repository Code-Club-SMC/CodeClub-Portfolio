import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ExpertiseComponent from "./ExperiseComponent";
import AI from "../../assets/aiExp.jpeg";
import web from "../../assets/webExp.avif";
import app from "../../assets/appExpertise.webp";
import uiux from "../../assets/uiExp.jpeg";
import cyber from "../../assets/cyberExpertise.jpg";
import iot from "../../assets/iotExp.png";

gsap.registerPlugin(ScrollTrigger);

const expertAreasAI = [
  "Generative AI",
  "LLM",
  "Machine learning",
  "Natural Language Processing (NLP)",
  "Generative AI consulting",
  "Predictive analytics",
  "AI automation",
  "Computer vision",
];
const expertAreasWeb = [
  "Web Applications",
  "CRMs",
  "ERPs",
  "CMS",
  "Learning Management Systems",
  "Responsive web Designs",
];
const expertAreasApp = [
  "Fintech Apps",
  "Cross Platform Apps",
  "Native Apps",
  "Enterprise Mobile Solutions",
];

const expertAreasCybersecurity = [
  "Network Security",
  "Cloud Security",
  "Application Security",
  "Penetration Testing",
  "Security Audits & Compliance",
];
const expertAreasUIDesign = [
  "Wireframing & Prototyping",
  "Responsive Web Design",
  "Mobile App Design",
  "User Journey Mapping",
  "Design Systems & Style Guides",
];
const expertAreasIoT = [
  "Smart Home Solutions",
  "Industrial IoT (IIoT)",
  "Wearable Tech",
  "IoT Device Integration",
  "Real-time Data Monitoring",
];

const ExpertiseMain = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768); // Updated breakpoint to 768px

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 768); // Updated breakpoint to 768px
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isLargeScreen) {
      const panels = gsap.utils.toArray(".panel");

      panels.forEach((panel) => {
        ScrollTrigger.create({
          trigger: panel,
          start: "top top",
          pin: true,
          pinSpacing: false,
        });
      });

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }
  }, [isLargeScreen]);

  return (
    <div className="w-[100%] bg-[#f4f8ff]">
      <div
        className={`w-[100%] flex lg:flex-row md:flex-row sm:flex-col lg:h-screen md:h-screen sm:h-full overflow-hidden border-t border-white ${
          isLargeScreen ? "panel" : ""
        }`}
      >
        <ExpertiseComponent
          img={AI}
          name={"Artificial Intelligence"}
          desc={
            "Our AI services empower businesses to overcome challenges and create revolutionary user experiences through advanced digital solutions."
          }
          expertAreas={expertAreasAI}
        />
      </div>
      <div
        className={`w-full flex lg:flex-row md:flex-row sm:flex-col lg:h-screen md:h-screen sm:h-full overflow-hidden border-t border-white ${
          isLargeScreen ? "panel" : ""
        }`}
      >
        <ExpertiseComponent
          img={web}
          name={"Web Development"}
          desc={
            "Our Web Development services empower businesses to overcome challenges and create revolutionary user experiences through advanced digital solutions."
          }
          expertAreas={expertAreasWeb}
        />
      </div>
      <div
        className={`w-full flex lg:flex-row md:flex-row sm:flex-col lg:h-screen md:h-screen sm:h-full overflow-hidden border-t border-white ${
          isLargeScreen ? "panel" : ""
        }`}
      >
        <ExpertiseComponent
          img={app}
          name={"App Development"}
          desc={
            "Our App Development services empower businesses to overcome challenges and create revolutionary user experiences through advanced digital solutions."
          }
          expertAreas={expertAreasApp}
        />
      </div>
      <div
        className={`w-full flex lg:flex-row md:flex-row sm:flex-col lg:h-screen md:h-screen sm:h-full overflow-hidden border-t border-white ${
          isLargeScreen ? "panel" : ""
        }`}
      >
        <ExpertiseComponent
          img={cyber}
          name={"CyberSecurity"}
          desc={
            "Our Cybersecurity solutions protect your digital assets with advanced threat detection, risk assessment, and proactive defense strategies. We help businesses stay secure, compliant, and resilient against evolving cyber threats."
          }
          expertAreas={expertAreasCybersecurity}
        />
      </div>
      <div
        className={`w-full flex lg:flex-row md:flex-row sm:flex-col lg:h-screen md:h-screen sm:h-full overflow-hidden border-t border-white ${
          isLargeScreen ? "panel" : ""
        }`}
      >
        <ExpertiseComponent
          img={uiux}
          name={"UI/UX Design"}
          desc={
            "Our UI/UX Design services focus on creating intuitive, engaging, and user-centered experiences. We craft seamless interfaces that not only look great but also enhance usability and drive customer satisfaction."
          }
          expertAreas={expertAreasUIDesign}
        />
      </div>
      <div
        className={`w-full flex lg:flex-row md:flex-row sm:flex-col lg:h-screen md:h-screen sm:h-full overflow-hidden border-t border-white ${
          isLargeScreen ? "panel" : ""
        }`}
      >
        <ExpertiseComponent
          img={iot}
          name={"IoT"}
          desc={
            "Our IoT solutions connect devices, systems, and data to enable smarter operations and real-time decision-making. We help businesses harness the power of connected technology to increase efficiency, automation, and innovation."
          }
          expertAreas={expertAreasIoT}
        />
      </div>
    </div>
  );
};

export default ExpertiseMain;
