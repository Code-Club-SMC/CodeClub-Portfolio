// ExpertiseMain.jsx - No Extra Scrolling Space
import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import images
import AI from '../assets/AiExperties.png';
import web from "../assets/WebDevExpertise.png";
import app from "../assets/appExpertise.webp";
import uiux from "../assets/UIUXExpertise.png";
import cyber from "../assets/CyberSecurityExpertise.png";
import iot from "../assets/iotExp.png";

gsap.registerPlugin(ScrollTrigger);

// Define all expert areas arrays
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

// ============= EXPERTISE LEFT COMPONENT =============
const ExpertiseLeft = ({ img, animationType, imageContainerRef, glowRef }) => {
  const getBorderColor = () => {
    const colors = {
      ai: "#3b82f6",
      web: "#8b5cf6",
      app: "#06b6d4",
      cyber: "#ef4444",
      uiux: "#f59e0b",
      iot: "#10b981",
    };
    return colors[animationType] || "#3b82f6";
  };

  return (
    <div className="relative flex justify-center items-center w-full lg:w-1/2 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Animated rotating border */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-[200%] h-[200%] top-1/2 left-1/2"
          style={{
            transform: "translate(-50%, -50%)",
            animation: "spin 10s linear infinite",
          }}
        >
          <div
            className="w-full h-full"
            style={{
              background: `conic-gradient(from 0deg, transparent 0%, ${getBorderColor()} 20%, transparent 40%, transparent 100%)`,
              opacity: 0.3,
            }}
          />
        </div>
      </div>

      {/* Glow effect */}
      <div
        ref={glowRef}
        className="absolute inset-0 opacity-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${getBorderColor()}33 0%, transparent 70%)`,
          filter: "blur(20px)",
        }}
      />

      {/* Image container - fills entire div without padding */}
      <div 
        ref={imageContainerRef} 
        className="relative z-10 w-full h-full flex items-center justify-center"
      >
        <img
          src={img}
          alt="Expertise"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

// ============= EXPERTISE RIGHT COMPONENT =============
const ExpertiseRight = ({ name, desc, expArea, nameRef, descRef, tabRef, listRef }) => {
  const [activeTab, setActiveTab] = useState("Expert areas");
  const tabs = ["Expert areas"];

  return (
    <div className="w-full lg:w-1/2 bg-[#f4f8ff] lg:pl-10 xl:pl-20 md:pl-10 sm:pl-6 sm:py-12 md:py-16 lg:py-0 pr-6 md:pr-10 flex flex-col justify-center">
      <h2 
        ref={nameRef}
        className="text-2xl md:text-3xl font-medium tracking-wide text-[#121212] mb-3 md:mb-4"
      >
        {name}
      </h2>
      
      <p 
        ref={descRef}
        className="text-[#777f8f] font-extralight text-base md:text-lg mb-4 md:mb-6 max-w-lg leading-7 md:leading-8"
      >
        {desc}
      </p>

      <div 
        ref={tabRef}
        className="flex space-x-6 border-b border-gray-300 mb-3 md:mb-4"
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 font-semibold text-sm md:text-md tracking-wide transition-all duration-300 ${
              activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-[#777f8f]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Expert areas" && (
        <ul 
          ref={listRef}
          className="list-disc pl-5 space-y-2 md:space-y-3 marker:text-blue-700 marker:text-xl"
        >
          {expArea.map((item, idx) => (
            <li key={idx}>
              <a
                href="#"
                className="hover:text-blue-700 transition-all duration-300 text-gray-500 text-base md:text-lg"
                onClick={(e) => e.preventDefault()}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      )}

      {activeTab === "Top cases" && (
        <div className="text-gray-600">Coming soon...</div>
      )}
    </div>
  );
};

// ============= EXPERTISE COMPONENT =============
// NOTE: no more `isActive` prop — every section sets up its own ScrollTrigger
// as soon as it mounts, instead of waiting for a pin-trigger callback to
// flip it "active". That callback only fired once the section's top had
// already scrolled past the "top 80% -> top 10%" window the reveal
// animation needs, so sections 2+ never got a chance to animate.
const ExperiseComponent = ({ img, name, desc, expertAreas, animationType, isLargeScreen, sectionIndex }) => {
  const componentRef = useRef(null);
  const imageContainerRef = useRef(null);
  const nameRef = useRef(null);
  const descRef = useRef(null);
  const tabRef = useRef(null);
  const listRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    if (!isLargeScreen) {
      // Reset all elements to visible state for mobile
      if (imageContainerRef.current) {
        gsap.set(imageContainerRef.current, { x: 0, rotate: 0, scale: 1, opacity: 1 });
      }
      if (nameRef.current) {
        gsap.set(nameRef.current, { x: 0, opacity: 1 });
      }
      if (descRef.current) {
        gsap.set(descRef.current, { x: 0, opacity: 1, filter: "blur(0px)" });
      }
      if (tabRef.current) {
        gsap.set(tabRef.current, { x: 0, opacity: 1 });
      }
      const listItems = listRef.current ? listRef.current.querySelectorAll('li') : [];
      if (listItems.length > 0) {
        gsap.set(listItems, { x: 0, opacity: 1, rotate: 0 });
      }
      if (glowRef.current) {
        gsap.set(glowRef.current, { opacity: 1 });
      }
      return;
    }

    const ctx = gsap.context(() => {
      // Different animations based on type
      const animations = {
        ai: {
          imageX: -200,
          imageRotate: -8,
          imageScale: 0.5,
        },
        web: {
          imageX: -250,
          imageRotate: 8,
          imageScale: 0.4,
        },
        app: {
          imageX: -180,
          imageRotate: -5,
          imageScale: 0.6,
        },
        cyber: {
          imageX: -280,
          imageRotate: 12,
          imageScale: 0.35,
        },
        uiux: {
          imageX: -220,
          imageRotate: -10,
          imageScale: 0.45,
        },
        iot: {
          imageX: -190,
          imageRotate: 6,
          imageScale: 0.55,
        },
      };

      const anim = animations[animationType] || animations.ai;

      // Set initial states for animation
      if (imageContainerRef.current) {
        gsap.set(imageContainerRef.current, {
          x: anim.imageX,
          rotate: anim.imageRotate,
          scale: anim.imageScale,
          opacity: 0,
        });
      }

      if (nameRef.current) {
        gsap.set(nameRef.current, {
          x: 150,
          opacity: 0,
        });
      }

      if (descRef.current) {
        gsap.set(descRef.current, {
          x: 180,
          opacity: 0,
          filter: "blur(4px)",
        });
      }

      if (tabRef.current) {
        gsap.set(tabRef.current, {
          x: 200,
          opacity: 0,
        });
      }

      const listItems = listRef.current ? listRef.current.querySelectorAll('li') : [];
      if (listItems.length > 0) {
        gsap.set(listItems, {
          x: 220,
          opacity: 0,
          rotate: 3,
        });
      }

      // Create timeline for sequential animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: componentRef.current,
          start: "top 80%",
          end: "top 10%",
          scrub: 1.5,
          invalidateOnRefresh: true,
          id: `animation-${sectionIndex}`,
        }
      });

      // 1. Image slides in from left
      if (imageContainerRef.current) {
        tl.to(imageContainerRef.current, {
          x: 0,
          rotate: 0,
          scale: 1,
          opacity: 1,
          duration: 1.8,
          ease: "power4.out",
        }, 0);
      }

      // 2. Name slides in from right
      if (nameRef.current) {
        tl.to(nameRef.current, {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "back.out(1.8)",
        }, 0.4);
      }

      // 3. Description slides in
      if (descRef.current) {
        tl.to(descRef.current, {
          x: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
        }, 0.9);
      }

      // 4. Tab slides in
      if (tabRef.current) {
        tl.to(tabRef.current, {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        }, 1.4);
      }

      // 5. List items slide in one by one
      if (listItems.length > 0) {
        tl.to(listItems, {
          x: 0,
          opacity: 1,
          rotate: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
        }, 1.8);
      }

      // Glow effect
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          opacity: 0.8,
          scale: 1.4,
          duration: 3,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          scrollTrigger: {
            trigger: componentRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            id: `glow-${sectionIndex}`,
          },
        });
      }

    }, componentRef);

    return () => ctx.revert();
  }, [animationType, isLargeScreen, sectionIndex]);

  return (
    <div ref={componentRef} className="w-full h-full flex lg:flex-row md:flex-row sm:flex-col overflow-hidden">
      <ExpertiseLeft 
        img={img} 
        animationType={animationType}
        imageContainerRef={imageContainerRef}
        glowRef={glowRef}
      />
      <ExpertiseRight 
        name={name} 
        desc={desc} 
        expArea={expertAreas}
        nameRef={nameRef}
        descRef={descRef}
        tabRef={tabRef}
        listRef={listRef}
      />
    </div>
  );
};

// ============= MAIN EXPERTISE COMPONENT =============
const ExpertiseMain = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isLargeScreen && containerRef.current) {
      let refreshOnceSettled;

      const timer = setTimeout(() => {
        // Get all panel sections
        const panels = containerRef.current.querySelectorAll('.panel-section');

        // Only pin the expertise panels that need the stacked/sticky effect.
        // The last panel should never remain fixed after it reaches the end of
        // the screen, otherwise it blocks the next section (e.g. NumbersMain)
        // from coming in at the correct moment.
        panels.forEach((panel, index) => {
          if (index === panels.length - 1) return;

          ScrollTrigger.create({
            trigger: panel,
            start: "top top",
            end: "bottom top",
            pin: true,
            pinSpacing: false,
            anticipatePin: 0.1,
            id: `panel-${index}`,
          });
        });

        // Refresh ScrollTrigger so every trigger (pins + each section's
        // own reveal animation) recalculates against final layout
        ScrollTrigger.refresh();

        // The measurement above happens 300ms after mount, which is a
        // guess — if the expertise images or any webfonts are still
        // loading past that point, their eventual size shifts the page
        // height *after* GSAP already reserved space for the last
        // panel's pin+release. That mismatch is what makes the next
        // component (e.g. NumbersMain) start too early and visually
        // overlap the tail of this section. Refresh once more the
        // moment everything has actually finished loading, so the
        // reserved space matches the real, final layout.
        refreshOnceSettled = () => ScrollTrigger.refresh();
        window.addEventListener("load", refreshOnceSettled);
        if (document.fonts && document.fonts.ready) {
          document.fonts.ready.then(refreshOnceSettled);
        }
      }, 300);

      return () => {
        clearTimeout(timer);
        if (refreshOnceSettled) {
          window.removeEventListener("load", refreshOnceSettled);
        }
        // Clean up all ScrollTriggers
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.vars?.id?.startsWith('panel-') || 
              trigger.vars?.id?.startsWith('animation-') || 
              trigger.vars?.id?.startsWith('glow-')) {
            trigger.kill();
          }
        });
      };
    } else {
      // Clean up on mobile
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars?.id?.startsWith('panel-') || 
            trigger.vars?.id?.startsWith('animation-') || 
            trigger.vars?.id?.startsWith('glow-')) {
          trigger.kill();
        }
      });
    }
  }, [isLargeScreen]);

  // Define all sections data
  const sections = [
    {
      id: 'ai',
      img: AI,
      name: "Artificial Intelligence",
      desc: "Our AI services empower businesses to overcome challenges and create revolutionary user experiences through advanced digital solutions.",
      expertAreas: expertAreasAI,
      animationType: "ai"
    },
    {
      id: 'web',
      img: web,
      name: "Web Development",
      desc: "Our Web Development services empower businesses to overcome challenges and create revolutionary user experiences through advanced digital solutions.",
      expertAreas: expertAreasWeb,
      animationType: "web"
    },
    {
      id: 'app',
      img: app,
      name: "App Development",
      desc: "Our App Development services empower businesses to overcome challenges and create revolutionary user experiences through advanced digital solutions.",
      expertAreas: expertAreasApp,
      animationType: "app"
    },
    {
      id: 'cyber',
      img: cyber,
      name: "CyberSecurity",
      desc: "Our Cybersecurity solutions protect your digital assets with advanced threat detection, risk assessment, and proactive defense strategies. We help businesses stay secure, compliant, and resilient against evolving cyber threats.",
      expertAreas: expertAreasCybersecurity,
      animationType: "cyber"
    },
    {
      id: 'uiux',
      img: uiux,
      name: "UI/UX Design",
      desc: "Our UI/UX Design services focus on creating intuitive, engaging, and user-centered experiences. We craft seamless interfaces that not only look great but also enhance usability and drive customer satisfaction.",
      expertAreas: expertAreasUIDesign,
      animationType: "uiux"
    },
    {
      id: 'iot',
      img: iot,
      name: "IoT",
      desc: "Our IoT solutions connect devices, systems, and data to enable smarter operations and real-time decision-making. We help businesses harness the power of connected technology to increase efficiency, automation, and innovation.",
      expertAreas: expertAreasIoT,
      animationType: "iot"
    }
  ];

  return (
    <div ref={containerRef} className="w-full bg-[#f4f8ff]">
      {sections.map((section, index) => (
        <div 
          key={section.id} 
          className="panel-section relative w-full h-screen overflow-hidden bg-[#f4f8ff]"
          style={{ zIndex: 10 + index }}
        >
          <div className="w-full h-full bg-[#f4f8ff]">
            <ExperiseComponent
              img={section.img}
              name={section.name}
              desc={section.desc}
              expertAreas={section.expertAreas}
              animationType={section.animationType}
              isLargeScreen={isLargeScreen}
              sectionIndex={index}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpertiseMain;