import React, { useEffect, useRef, useState } from "react";
import vid from "../../assets/home/main-old-video.mp4";
import "./HeroSection.css";
import logo from "../../assets/logos/logo.png";
import gsap from "gsap";

const HeroPic = () => {
  const lineRefs = useRef([]);
  const logoImgRef = useRef(null);
  const logoTextRef = useRef(null);
  const [lineHeight, setLineHeight] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [ready, setReady] = useState(false);
  const tlRef = useRef(null);
  const logoTlRef = useRef(null);
  const logoTextCharsRef = useRef([]);

  const lines = [
    "FUELING DIGITAL DISRUPTION ACROSS TRANSFORMATIVE DOMAINS",
    "CUSTOM SOFTWARE SOLUTIONS FOR BUSINESS GROWTH",
    "AI-DRIVEN, CLOUD-POWERED, INDUSTRY-CHANGING",
  ];

  // Each WORD is now wrapped in its own inline-block span, so the line
  // can only break between words — never mid-word between two letters.
  const splitText = (text) => {
    const words = text.split(" ");
    return words.map((word, wi) => (
      <React.Fragment key={wi}>
        <span style={{ display: "inline-block" }}>
          {word.split("").map((char, ci) => (
            <span key={ci} className="char-reveal">
              {char}
            </span>
          ))}
        </span>
        {wi < words.length - 1 && <span className="space"> </span>}
      </React.Fragment>
    ));
  };

  const splitLogoText = (text) => {
    return text.split("").map((char, i) => {
      if (char === " ") return <span key={i} className="space-logo"></span>;
      return (
        <span key={i} className="char-reveal-logo" ref={(el) => (logoTextCharsRef.current[i] = el)}>
          {char}
        </span>
      );
    });
  };

  useEffect(() => {
    if (lineRefs.current[0]) {
      const style = getComputedStyle(lineRefs.current[0]);
      const lh = parseFloat(style.lineHeight);
      if (lh && lh > 0) {
        setLineHeight(lh);
        setContainerHeight(lh * 2);
      }
      setReady(true);
    }
  }, []);

  // Measures each line's TRUE rendered height
  useEffect(() => {
    if (!ready) return;
    const allLines = lineRefs.current;
    if (allLines.length < 3 || !allLines[0]) return;

    const measure = () => {
      let max = 0;
      allLines.forEach((el) => {
        if (!el) return;
        const prevDisplay = el.style.display;
        el.style.display = "block";
        max = Math.max(max, el.scrollHeight);
        el.style.display = prevDisplay;
      });
      if (max > 0) setContainerHeight(max);
    };

    measure();

    let resizeTimeout;
    const onResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(measure, 150);
    };
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", onResize);
    };
  }, [ready]);

  const animateLineIn = (lineEl) => {
    const chars = lineEl.querySelectorAll(".char-reveal");
    gsap.set(lineEl, { display: "block" });
    return gsap.fromTo(
      chars, 
      { scale: 0, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 0.35, stagger: 0.04, ease: "back.out(2)" }
    );
  };

  const animateLineOut = (lineEl) => {
    const chars = lineEl.querySelectorAll(".char-reveal");
    return gsap.to(chars, { 
      scale: 0, 
      opacity: 0, 
      duration: 0.3, 
      stagger: 0.02, 
      ease: "power3.in",
      onComplete: () => {
        gsap.set(lineEl, { display: "none" });
      }
    });
  };

  const buildTextTimeline = () => {
    const allLines = lineRefs.current;
    if (!allLines[0] || !allLines[1] || !allLines[2]) return;

    // Kill existing timeline if it exists
    if (tlRef.current) {
      tlRef.current.kill();
      tlRef.current = null;
    }

    // Reset all lines to initial state
    allLines.forEach((line, index) => {
      if (line) {
        gsap.set(line, { display: index === 0 ? "block" : "none", y: 0 });
        const chars = line.querySelectorAll(".char-reveal");
        if (chars.length > 0) {
          gsap.set(chars, { scale: 0, opacity: 0 });
        }
      }
    });

    // Create the timeline with proper looping
    const tl = gsap.timeline({ repeat: -1 });

    // Function to add a complete line cycle to the timeline
    const addLineCycle = (lineElement, holdDuration) => {
      // Animate line in
      const chars = lineElement.querySelectorAll(".char-reveal");
      tl.set(lineElement, { display: "block" });
      tl.fromTo(
        chars, 
        { scale: 0, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 0.35, stagger: 0.04, ease: "back.out(2)" }
      );
      
      // Hold the line
      tl.to({}, { duration: holdDuration });
      
      // Animate line out
      tl.to(chars, { 
        scale: 0, 
        opacity: 0, 
        duration: 0.3, 
        stagger: 0.02, 
        ease: "power3.in"
      });
      tl.set(lineElement, { display: "none" });
    };

    // Add cycles for all three lines
    addLineCycle(allLines[0], 2.5);
    addLineCycle(allLines[1], 2.5);
    addLineCycle(allLines[2], 2.5);

    // Small pause before repeating
    tl.to({}, { duration: 0.5 });

    tlRef.current = tl;
  };

  useEffect(() => {
    if (!ready || lineHeight === 0 || lineRefs.current.length < 3) return;
    
    // Small delay to ensure DOM is fully rendered
    const timeoutId = setTimeout(() => {
      buildTextTimeline();
    }, 100);
    
    return () => {
      clearTimeout(timeoutId);
      if (tlRef.current) {
        tlRef.current.kill();
        tlRef.current = null;
      }
    };
  }, [ready, lineHeight, containerHeight]);

  // Logo + "Code Club" micro-animation
  useEffect(() => {
    if (!ready || lineHeight === 0) return;

    const chars = logoTextCharsRef.current.filter(Boolean);
    if (!logoImgRef.current || chars.length === 0) return;

    gsap.set(logoImgRef.current, { scale: 1 });
    gsap.set(chars, { scale: 1, opacity: 1, y: 0 });

    const logoTl = gsap.timeline({ repeat: -1, repeatDelay: 2.6 });

    logoTl
      .to(logoImgRef.current, { scale: 1.12, duration: 0.45, ease: "power2.out" })
      .to(logoImgRef.current, { scale: 1, duration: 0.45, ease: "power2.inOut" })
      .to(chars, { y: -4, opacity: 0.55, duration: 0.25, stagger: 0.02, ease: "power2.out" }, "<")
      .to(chars, { y: 0, opacity: 1, duration: 0.35, stagger: 0.02, ease: "power2.inOut" }, "-=0.1");

    logoTlRef.current = logoTl;

    return () => {
      logoTl.kill();
      logoTlRef.current = null;
      gsap.set(logoImgRef.current, { scale: 1 });
      gsap.set(chars, { scale: 1, opacity: 1, y: 0 });
    };
  }, [ready, lineHeight]);

  return (
    <div className="relative w-full h-screen overflow-hidden lg:px-10">
      <video src={vid} autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover z-0" />
      
      <div className="absolute top-1/3 left-1/2 z-20 hidden lg:flex flex-col items-center -translate-x-1/2 -translate-y-1/2">
        <div className="flex items-center gap-3 px-6 py-3">
          <img ref={logoImgRef} src={logo} alt="Code Club Logo" className="w-10 rounded-full object-cover" />
          <span ref={logoTextRef} className="text-white font-extrabold text-4xl">{splitLogoText("Code Club")}</span>
        </div>
      </div>

      <div className="relative z-10 flex flex-col justify-center items-center h-full lg:px-20 md:px-20 sm:px-2 text-white">
        <div className="overflow-hidden text-center" style={{ 
          maxWidth: "90vw", 
          height: ready ? containerHeight : 0, 
          opacity: ready ? 1 : 0, 
          transition: "opacity 0.3s ease, height 0.2s ease" 
        }}>
          <h1 className="font-bold w-full inline-block">
            <div ref={(el) => (lineRefs.current[0] = el)} className="text-line">{splitText(lines[0])}</div>
            <div ref={(el) => (lineRefs.current[1] = el)} className="text-line">{splitText(lines[1])}</div>
            <div ref={(el) => (lineRefs.current[2] = el)} className="text-line">{splitText(lines[2])}</div>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default HeroPic;