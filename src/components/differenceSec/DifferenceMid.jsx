import React from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const text =
  "Where insight meets innovation, our solutions go beyond the surface to spark lasting transformation.";

const DifferenceMid = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const words = gsap.utils.toArray(".glow-word");

    // Set initial opacity for all words
    gsap.set(words, { opacity: 0.2 });

    // Animate opacity on scroll
    gsap.to(words, {
      opacity: 1,
      stagger: 0.1,
      scrollTrigger: {
        trigger: textRef.current,
        toggleActions: "restart pause reverse pause",
        start: "top 90%",
        end: "bottom 50%",
        scrub: true,
      },
    });
  }, []);

  return (
    <div>
      <h1
        className="text-white w-full lg:text-5xl md:text-5xl sm:text-3xl lg:leading-20 md:leading-20 sm:leading-10"
        ref={textRef}
      >
        {text.split(" ").map((word, i) => (
          <span
            key={i}
            className="glow-word inline-block mr-2 transition duration-300"
          >
            {word}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default DifferenceMid;
