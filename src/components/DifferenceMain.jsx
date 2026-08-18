import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DifferenceMain = () => {
  const textRef = useRef(null);
  const gearRef = useRef(null);
  const gearInnerRef = useRef(null);
  const sectionRef = useRef(null);

  const text =
    "Where insight meets innovation, our solutions go beyond the surface to spark lasting transformation.";

  useEffect(() => {
    // Split text into words for animation
    const words = gsap.utils.toArray(".glow-word");

    // Initial states
    gsap.set(words, { 
      opacity: 0.1, 
      y: 20,
      filter: "blur(4px)"
    });

    // Text reveal animation on scroll
    gsap.to(words, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      stagger: 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 85%",
        end: "top 30%",
        scrub: 1,
      },
    });

    // Gear rotation animation
    gsap.to(gearRef.current, {
      rotation: 360,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    // Inner gear rotates in opposite direction
    gsap.to(gearInnerRef.current, {
      rotation: -360,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    // Floating animation for decorative elements
    gsap.utils.toArray(".float-element").forEach((el, i) => {
      gsap.to(el, {
        y: -15,
        rotation: i % 2 === 0 ? 10 : -10,
        duration: 2 + i * 0.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: i * 0.3,
      });
    });

    // Pulse glow effect
    gsap.to(".gear-glow", {
      scale: 1.1,
      opacity: 0.6,
      duration: 1.5,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

  }, []);

  return (
    <div
      ref={sectionRef}
      className="bg-[#000122] min-h-70vh w-full flex flex-col px-6 lg:px-25 py-20 overflow-hidden"
    >
      {/* Top Section */}
      <div>
        <h6 className="text-white font-bold text-[0.875rem] py-5 tracking-wider">
          WHAT MAKES CODECLUB THE RIGHT CHOICE FOR YOUR BUSINESS?
        </h6>
      </div>

      {/* Main Content Grid */}
      <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20 mt-10">
        {/* Left Side - Text */}
        <div className="lg:w-1/2 w-full">
          <h1
            className="text-white w-full lg:text-5xl md:text-4xl sm:text-3xl lg:leading-tight md:leading-tight sm:leading-normal"
            ref={textRef}
          >
            {text.split(" ").map((word, i) => (
              <span
                key={i}
                className="glow-word inline-block mr-2 transition duration-300 hover:text-blue-400"
              >
                {word}
              </span>
            ))}
          </h1>
          
          {/* Decorative underline */}
          <div className="mt-8 w-24 h-1 bg-gradient-to-r from-blue-500 to-transparent"></div>
        </div>

        {/* Right Side - Rotating Gear Animation */}
        <div className="lg:w-1/2 w-full flex items-center justify-center">
          <div className="relative w-80 h-80 lg:w-96 lg:h-96">
            {/* Outer Gear */}
            <div
              ref={gearRef}
              className="absolute inset-0 gear-glow"
              style={{
                background: "radial-gradient(circle, transparent 30%, rgba(59, 130, 246, 0.1) 30%, rgba(59, 130, 246, 0.2) 60%, transparent 60%)",
                filter: "blur(10px)",
              }}
            ></div>

            {/* Main Gear SVG */}
            <svg
              ref={gearRef}
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer gear teeth */}
              <g>
                {Array.from({ length: 12 }).map((_, i) => {
                  const angle = (i * 30 * Math.PI) / 180;
                  const x1 = 100 + Math.cos(angle) * 85;
                  const y1 = 100 + Math.sin(angle) * 85;
                  const x2 = 100 + Math.cos(angle) * 70;
                  const y2 = 100 + Math.sin(angle) * 70;
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="rgba(59, 130, 246, 0.6)"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  );
                })}
              </g>

              {/* Outer circle */}
              <circle
                cx="100"
                cy="100"
                r="65"
                stroke="rgba(59, 130, 246, 0.8)"
                strokeWidth="3"
                fill="none"
              />

              {/* Inner decorative circles */}
              <circle
                cx="100"
                cy="100"
                r="45"
                stroke="rgba(139, 92, 246, 0.6)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="10, 5"
              />

              {/* Inner gear teeth */}
              <g>
                {Array.from({ length: 8 }).map((_, i) => {
                  const angle = (i * 45 * Math.PI) / 180;
                  const x1 = 100 + Math.cos(angle) * 40;
                  const y1 = 100 + Math.sin(angle) * 40;
                  const x2 = 100 + Math.cos(angle) * 30;
                  const y2 = 100 + Math.sin(angle) * 30;
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="rgba(139, 92, 246, 0.8)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  );
                })}
              </g>

              {/* Center circle */}
              <circle
                cx="100"
                cy="100"
                r="15"
                fill="rgba(59, 130, 246, 0.3)"
                stroke="rgba(59, 130, 246, 0.8)"
                strokeWidth="2"
              />

              {/* Center dot */}
              <circle
                cx="100"
                cy="100"
                r="5"
                fill="rgba(255, 255, 255, 0.8)"
              />
            </svg>

            {/* Inner rotating element */}
            <div
              ref={gearInnerRef}
              className="absolute inset-0 flex items-center justify-center"
            >
              <svg
                className="w-1/2 h-1/2"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Inner decorative pattern */}
                {Array.from({ length: 6 }).map((_, i) => {
                  const angle = (i * 60 * Math.PI) / 180;
                  const x1 = 50 + Math.cos(angle) * 35;
                  const y1 = 50 + Math.sin(angle) * 35;
                  const x2 = 50 + Math.cos(angle) * 20;
                  const y2 = 50 + Math.sin(angle) * 20;
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="rgba(168, 85, 247, 0.5)"
                      strokeWidth="2"
                    />
                  );
                })}
                <circle
                  cx="50"
                  cy="50"
                  r="18"
                  stroke="rgba(168, 85, 247, 0.4)"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="5, 3"
                />
              </svg>
            </div>

            {/* Floating elements */}
            <div className="float-element absolute top-0 right-0 w-3 h-3 bg-blue-500 rounded-full"></div>
            <div className="float-element absolute bottom-10 left-5 w-2 h-2 bg-purple-500 rounded-full"></div>
            <div className="float-element absolute top-20 left-0 w-2 h-2 bg-blue-400 rounded-full"></div>
            <div className="float-element absolute bottom-0 right-10 w-3 h-3 bg-purple-400 rounded-full"></div>
          </div>
        </div>
      </div>

       </div>
  );
};

export default DifferenceMain;