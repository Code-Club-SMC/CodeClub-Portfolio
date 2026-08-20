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
      </div>

       </div>
  );
};

export default DifferenceMain;