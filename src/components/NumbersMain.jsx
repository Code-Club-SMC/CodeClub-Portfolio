import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const numbersData = [
  {
    title: "Completed Projects",
    value: "99+",
  },
  {
    title: "Experts",
    value: "18+",
  },
  {
    title: "Client Satisfaction",
    value: "98.95%",
    highlight: true,
  },
];

// Splits "98.95%" -> { prefix: "", number: 98.95, decimals: 2, suffix: "%" }
// so the counter can animate the raw number and re-attach whatever
// symbols/decimals the original string had.
const parseValue = (value) => {
  const match = String(value).match(/^([^\d.-]*)([\d,.]+)(.*)$/);
  if (!match) {
    return { prefix: "", number: 0, decimals: 0, suffix: String(value) };
  }
  const [, prefix, rawNumber, suffix] = match;
  const cleanNumber = rawNumber.replace(/,/g, "");
  const decimals = cleanNumber.includes(".") ? cleanNumber.split(".")[1].length : 0;
  return { prefix, number: parseFloat(cleanNumber), decimals, suffix };
};

// ============= SINGLE STAT CARD =============
const NumberStat = ({ item, index }) => {
  const cardRef = useRef(null);
  const numberRef = useRef(null);
  const { prefix, number, decimals, suffix } = parseValue(item.value);

  useEffect(() => {
    if (!cardRef.current || !numberRef.current) {
      return;
    }

    const counter = { val: 0 };

    const trigger = ScrollTrigger.create({
      trigger: cardRef.current,
      start: "top 85%",
      onEnter: () => {
        numberRef.current.textContent = `${prefix}${counter.val.toFixed(decimals)}${suffix}`;

        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: index * 0.15,
            ease: "power3.out",
          }
        );

        gsap.fromTo(
          counter,
          { val: 0 },
          {
            val: number,
            duration: 2,
            delay: index * 0.15 + 0.15,
            ease: "power2.out",
            onUpdate: () => {
              if (numberRef.current) {
                numberRef.current.textContent = `${prefix}${counter.val.toFixed(decimals)}${suffix}`;
              }
            },
          }
        );
      },
      onLeaveBack: () => {
        if (numberRef.current) {
          numberRef.current.textContent = `${prefix}${0}${suffix}`;
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, [number, decimals, prefix, suffix, index]);

  return (
    <div
      ref={cardRef}
      className={`group relative flex flex-col items-center justify-center gap-3 py-16 px-6 border-b border-white/15 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 transition-colors duration-500 hover:bg-[#0057d8] ${
        item.highlight ? "bg-white/[0.04]" : ""
      }`}
      style={{
        padding: "clamp(1rem, 2vw + 0.5rem, 4rem) clamp(0.75rem, 1.5vw + 0.25rem, 1.5rem)",
        gap: "clamp(0.5rem, 0.5vw + 0.25rem, 1rem)",
      }}
    >
      {/* badge for the flagged stat */}
      {item.highlight && (
        <span className="mb-1 inline-flex items-center gap-1.5 rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 font-semibold uppercase tracking-widest text-blue-300 group-hover:border-white/40 group-hover:bg-white/10 group-hover:text-white transition-colors duration-500"
          style={{ fontSize: "clamp(0.55rem, 0.15vw + 0.45rem, 0.65rem)" }}
        >
          ● Most loved
        </span>
      )}

      <h3
        ref={numberRef}
        className="font-extrabold tracking-tighter bg-gradient-to-b from-white to-blue-200 bg-clip-text text-transparent group-hover:from-white group-hover:to-white transition-all duration-500"
        style={{ fontSize: "clamp(2rem, 1vw + 1.5rem, 3.75rem)" }}
      >
        0
      </h3>

      <p className="font-medium uppercase tracking-[0.25em] text-white/55 group-hover:text-white/90 transition-colors duration-500"
        style={{ fontSize: "clamp(0.65rem, 0.2vw + 0.55rem, 0.75rem)" }}
      >
        {item.title}
      </p>

      {/* underline accent that grows on hover */}
      <span className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-white transition-all duration-500 group-hover:w-16" />
    </div>
  );
};

// ============= MAIN SECTION =============
const NumbersMain = () => {
  const headingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, headingRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative bg-[#00173d] text-white py-24 px-6 sm:px-10 overflow-hidden" style={{ padding: "clamp(3rem, 5vw + 1rem, 6rem) clamp(1rem, 2vw + 0.5rem, 2.5rem)" }}>
      {/* soft background glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        <div ref={headingRef} className="mb-14 flex flex-col items-start gap-3">
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-10 bg-blue-500" />
            <span className="font-semibold uppercase tracking-[0.3em] text-blue-400" style={{ fontSize: "clamp(0.6rem, 0.2vw + 0.5rem, 0.75rem)" }}>
              Our track record
            </span>
          </div>
          <h2 className="font-bold tracking-tight" style={{ fontSize: "clamp(1.5rem, 0.8vw + 1rem, 2.25rem)" }}>
            Numbers that speak for themselves
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 border border-white/15 rounded-sm overflow-hidden">
          {numbersData.map((item, idx) => (
            <NumberStat key={idx} item={item} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NumbersMain;