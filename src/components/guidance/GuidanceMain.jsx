import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const GuidanceTop = () => {
  const circleRef = useRef(null);
  const sectionRef = useRef(null);
  const textRefs = useRef([]);
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!circleRef.current || !sectionRef.current) return;

      gsap.set(circleRef.current, { scale: 70 });

      gsap.to(circleRef.current, {
        scale: 1,
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

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top+=100",
        end: "bottom top",
        onUpdate: (self) => {
          const direction = self.direction;

          textRefs.current.forEach((el) => {
            if (!el) return;

            if (direction === -1) {
              // Scrolling up — change to white
              gsap.to(el, { color: "#ffffff", duration: 0.2 });
            } else {
              // Scrolling down — change back to original color
              const originalColor = el.dataset.originalColor;
              gsap.to(el, { color: originalColor || "#121212", duration: 0.1 });
            }
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToTextRefs = (el) => {
    if (el && !textRefs.current.includes(el)) {
      el.dataset.originalColor = getComputedStyle(el).color;
      textRefs.current.push(el);
    }
  };

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
          className="w-[100px] h-[100px] bg-[#005ae6] relative top-29 rounded-full blur-[1px]"
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl p-5">
        <p
          className="uppercase text-sm font-bold tracking-wider text-[#445067] mb-10 transition-colors duration-300"
          ref={addToTextRefs}
        >
          What guides CodeClub's vision?
        </p>

        <h2
          className="lg:text-7xl md:text-7xl sm:text-4xl font-bold text-[#121212] leading-tight -mt-5 transition-colors duration-300"
          ref={addToTextRefs}
        >
          Focused on what matters,
          {/* <br className="sm:hidden lg:block md:block" /> */}
          <span>
            driven by what’s next
            <span className="text-blue-600 rounded-full">.</span>
          </span>
        </h2>

        <div className="flex justify-center text-center">
          <p
            className="mt-8 text-[#1b1b1b] text-lg leading-relaxed lg:w-150 md:w-150 sm:w-full transition-colors duration-300"
            ref={addToTextRefs}
          >
            We contribute to the transformation of the world through impactful
            digital solutions, ranging from AI integration to custom software
            development services. These solutions not only address our clients’
            business challenges but also revolutionize the end-user experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuidanceTop;
