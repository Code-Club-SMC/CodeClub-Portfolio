import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import adventr from "../../assets/Adventr.svg";
import Innovacare from "../../assets/Innovacare.svg";
import MedScope from "../../assets/MedScope.svg";
import Migiagnostics from "../../assets/Migiagnostics.svg";
import CaseComponents from "./CaseComponents";

const DifferenceBottom = () => {
  const containerRef = useRef(null);

  const imageUrls = [adventr, Innovacare, MedScope, Migiagnostics];

  useEffect(() => {
    const images = containerRef.current.querySelectorAll(".floating-img");

    images.forEach((img, i) => {
      gsap.to(img, {
        y: -20, // slide up by 20px
        duration: 2,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
        delay: i * 0.3, // stagger effect
      });
    });
  }, []);

  return (
    <div
      className="w-full flex justify-between items-center gap-10 flex-wrap py-10 mt-10"
      ref={containerRef}
    >
      {imageUrls.map((src, i) => (
        <CaseComponents key={i} img={src}></CaseComponents>
      ))}
    </div>
  );
};

export default DifferenceBottom;
