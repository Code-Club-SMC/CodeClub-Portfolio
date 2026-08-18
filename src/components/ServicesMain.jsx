// ServicesMain.jsx - Without Spotlight Effect
import React, { useRef } from "react";
import { Link } from "react-router-dom";

// Import images
import AI from "../assets/ai_service.webp";
import mobile from "../assets/mobileDevService.webp";
import web from "../assets/webDevService.webp";
import it_consulting from "../assets/it_consulting.webp";
import software_development from "../assets/software_development.webp";
import ioT from "../assets/IoT.webp";

// Services data
const services = [
  {
    title: "Artificial Intelligence and ML",
    icon: AI,
    link: "/service/ai",
    desc: "Transform your business with cutting-edge AI and machine learning solutions."
  },
  {
    title: "App Development",
    icon: mobile,
    link: "/service/mobile-apps",
    desc: "Build powerful, user-friendly mobile applications for iOS and Android platforms."
  },
  {
    title: "Web Development",
    icon: web,
    link: "/service/web-development",
    desc: "Create stunning, responsive websites that drive engagement and conversions."
  },
  {
    title: "Cyber Security",
    icon: it_consulting,
    link: "/service/cybersecurity",
    desc: "Protect your digital assets with comprehensive cybersecurity solutions."
  },
  {
    title: "UI/UX Design",
    icon: software_development,
    link: "/service/ui-ux",
    desc: "Design intuitive, engaging user experiences that delight your customers."
  },
  {
    title: "IoT Solutions",
    icon: ioT,
    link: "/service/iot",
    desc: "Connect your devices and systems with innovative IoT solutions."
  },
];

// Service Card Component with Pressure Effect (No Spotlight)
const ServiceCard = ({ icon, title, desc, link }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    
    // Calculate mouse position relative to card (0 to 1)
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    // Calculate rotation based on mouse position
    const rotateY = (x - 0.5) * 20; // Max 10 degrees left/right
    const rotateX = (y - 0.5) * -20; // Max 10 degrees up/down
    
    // Apply transforms with pressure effect
    card.style.transform = `
      perspective(800px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.02)
      translateZ(10px)
    `;
    
    // Subtle shadow only - no spotlight
    const shadowX = (x - 0.5) * 15;
    const shadowY = (y - 0.5) * 15;
    card.style.boxShadow = `
      ${-shadowX}px ${-shadowY}px 30px rgba(0, 0, 0, 0.15),
      ${shadowX}px ${shadowY}px 30px rgba(0, 0, 0, 0.08)
    `;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    
    // Reset to original state
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1) translateZ(0px)';
    card.style.boxShadow = 'none';
  };

  return (
    <Link
      to={link}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="flex flex-col items-center text-center px-6 py-10 rounded-xl transition-all duration-75 
        bg-[#001c3d] group cursor-pointer relative overflow-hidden"
      style={{
        transformStyle: 'preserve-3d',
        transition: 'transform 0.1s ease-out, box-shadow 0.1s ease-out',
        willChange: 'transform',
      }}
    >
      {/* Subtle border glow - only on hover */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-400/20 to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-400/20 to-transparent" />
      </div>

      <div 
        className="w-20 h-20 flex items-center justify-center mb-6 relative z-10"
        style={{ transform: 'translateZ(20px)' }}
      >
        <img
          src={icon}
          alt={title}
          className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition duration-300"
        />
      </div>
      
      <h2 
        className="text-lg font-semibold text-gray-300 group-hover:text-white mb-2 relative z-10"
        style={{ transform: 'translateZ(15px)' }}
      >
        {title}
      </h2>
      
      <p 
        className="text-gray-400 group-hover:text-gray-200 text-sm leading-relaxed tracking-wide relative z-10"
        style={{ transform: 'translateZ(10px)' }}
      >
        {desc}
      </p>
    </Link>
  );
};

// Main Services Component
const ServicesMain = () => {
  return (
    <div className="w-full h-full">
      <section className="bg-[#f9f9f9] py-20 px-4">
        <h1 align="center" className="mb-20 text-5xl font-bold text-gray-700">
          Fuel Your Growth with Our Services
        </h1>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              link={service.link}
              icon={service.icon}
              title={service.title}
              desc={service.desc}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ServicesMain;