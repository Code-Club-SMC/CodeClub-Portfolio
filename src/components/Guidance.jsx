import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Guidance = () => {
  const circleRef = useRef(null);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const subtitleRef = useRef(null);

  // Text content
  const headingText1 = "Focused on what matters,";
  const headingText2 = "driven by what's next";
  const paragraphText = "We contribute to the transformation of the world through impactful digital solutions, ranging from AI integration to custom software development services. These solutions not only address our clients' business challenges but also revolutionize the end-user experience.";

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!circleRef.current || !sectionRef.current) return;

      // Initial circle setup - full opacity and larger scale
      gsap.set(circleRef.current, { scale: 70, opacity: 1 });

      // Circle animation
      gsap.to(circleRef.current, {
        scale: 1,
        opacity: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: true,
          pinSpacing: true,
        },
        ease: "none",
      });

      // Animate heading words
      const headingWords = gsap.utils.toArray(".heading-word");
      gsap.fromTo(headingWords, 
        { 
          y: 100, 
          opacity: 0,
          rotateX: -40,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            end: "top 40%",
            scrub: 1,
          },
        }
      );

      // Animate paragraph words
      const paragraphWords = gsap.utils.toArray(".paragraph-word");
      gsap.fromTo(paragraphWords,
        {
          y: 50,
          opacity: 0,
          filter: "blur(8px)",
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.6,
          stagger: 0.03,
          ease: "power2.out",
          scrollTrigger: {
            trigger: paragraphRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: 0.5,
          },
        }
      );

      // Subtitle animation
      gsap.from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: subtitleRef.current,
          start: "top 90%",
          end: "top 60%",
          scrub: 1,
        },
      });

      // Color transition on scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top+=100",
        end: "bottom top",
        onUpdate: (self) => {
          if (self.direction === -1) {
            // Scrolling up - change to white
            gsap.to(subtitleRef.current, { color: "#ffffff", duration: 0.3 });
            gsap.to(headingRef.current, { color: "#ffffff", duration: 0.3 });
            gsap.to(paragraphRef.current, { color: "#ffffff", duration: 0.3 });
          } else {
            // Scrolling down - change to dark
            gsap.to(subtitleRef.current, { color: "#445067", duration: 0.3 });
            gsap.to(headingRef.current, { color: "#121212", duration: 0.3 });
            gsap.to(paragraphRef.current, { color: "#1b1b1b", duration: 0.3 });
          }
        },
      });

      // Add glow effect to the blue dot
      gsap.to(".blue-dot", {
        scale: 1.3,
        duration: 1.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      id="guidance-section"
      className="w-full h-[100vh] relative flex flex-col items-center justify-center text-center lg:py-24 md:py-24 sm:py-10 px-6 overflow-hidden bg-white"
    >
      {/* Blue radial blur background */}
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none z-0">
        <div
          ref={circleRef}
          className="w-[200px] h-[200px] bg-[#005ae6] relative top-20 rounded-full blur-[2px]"
        ></div>
      </div>

      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-blue-50 opacity-30 pointer-events-none z-0"></div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl px-5">
        <div className="overflow-hidden mb-8">
          <p
            ref={subtitleRef}
            className="uppercase text-base font-bold tracking-widest text-[#445067] transition-colors duration-300"
          >
            What guides CodeClub's vision?
          </p>
        </div>

        <div className="overflow-hidden perspective-1000">
          <h2
            ref={headingRef}
            className="lg:text-7xl md:text-7xl sm:text-4xl font-bold text-[#121212] leading-tight transition-colors duration-300 text-center"
          >
            {headingText1.split(" ").map((word, i) => (
              <span
                key={`h1-${i}`}
                className="heading-word inline-block mr-4 will-change-transform"
              >
                {word}
              </span>
            ))}
            <br className="sm:hidden lg:block md:block" />
            {headingText2.split(" ").map((word, i) => (
              <span
                key={`h2-${i}`}
                className="heading-word inline-block mr-4 will-change-transform"
              >
                {word}
              </span>
            ))}
            <span className="text-blue-600 blue-dot inline-block">.</span>
          </h2>
        </div>

        <div className="flex justify-center text-center mt-10">
          <p
            ref={paragraphRef}
            className="text-[#1b1b1b] lg:text-2xl md:text-2xl sm:text-xl leading-relaxed lg:w-[700px] md:w-[650px] sm:w-full transition-colors duration-300"
          >
            {paragraphText.split(" ").map((word, i) => (
              <span
                key={`p-${i}`}
                className="paragraph-word inline-block mr-2 will-change-transform"
              >
                {word}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Guidance;