import React, { useEffect, useRef, useState } from "react";

const CursorDot = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setTargetPos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      // Check if hovering over interactive elements
      const target = e.target;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.closest('a, button, input, textarea, select, [role="button"]')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const animate = () => {
      // Fast dot follows cursor
      const dotSpeed = 0.8;
      const dotDx = targetPos.x - currentPos.current.x;
      const dotDy = targetPos.y - currentPos.current.y;
      const dotDistance = Math.sqrt(dotDx * dotDx + dotDy * dotDy);

      if (dotDistance < 1) {
        currentPos.current.x = targetPos.x;
        currentPos.current.y = targetPos.y;
      } else {
        currentPos.current.x += dotDx * dotSpeed;
        currentPos.current.y += dotDy * dotSpeed;
      }

      // Slower ring follows
      const ringSpeed = 0.15;
      const ringDx = targetPos.x - ringPos.current.x;
      const ringDy = targetPos.y - ringPos.current.y;
      const ringDistance = Math.sqrt(ringDx * ringDx + ringDy * ringDy);

      if (ringDistance < 1) {
        ringPos.current.x = targetPos.x;
        ringPos.current.y = targetPos.y;
      } else {
        ringPos.current.x += ringDx * ringSpeed;
        ringPos.current.y += ringDy * ringSpeed;
      }

      // Update dot position
      if (dotRef.current) {
        dotRef.current.style.left = `${currentPos.current.x}px`;
        dotRef.current.style.top = `${currentPos.current.y}px`;
        dotRef.current.style.opacity = isVisible ? '1' : '0';
      }

      // Update ring position
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top = `${ringPos.current.y}px`;
        ringRef.current.style.opacity = isVisible ? '1' : '0';
        
        // Scale ring when hovering
        if (isHovering) {
          ringRef.current.style.width = '40px';
          ringRef.current.style.height = '40px';
          ringRef.current.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
          ringRef.current.style.borderColor = 'rgba(59, 130, 246, 0.5)';
        } else {
          ringRef.current.style.width = '24px';
          ringRef.current.style.height = '24px';
          ringRef.current.style.backgroundColor = 'transparent';
          ringRef.current.style.borderColor = 'rgba(59, 130, 246, 0.8)';
        }
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleMouseOver);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [targetPos, isHovering, isVisible]);

  return (
    <>
      {/* Main dot */}
      <div
        ref={dotRef}
        className="sm:hidden lg:block md:block"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "8px",
          height: "8px",
          backgroundColor: "#3b82f6",
          borderRadius: "50%",
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
          transition: "opacity 0.3s ease",
          opacity: 0,
        }}
      />
      
      {/* Trailing ring */}
      <div
        ref={ringRef}
        className="sm:hidden lg:block md:block"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "24px",
          height: "24px",
          border: "2px solid rgba(59, 130, 246, 0.8)",
          borderRadius: "50%",
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          zIndex: 9998,
          transition: "width 0.3s ease, height 0.3s ease, background-color 0.3s ease, border-color 0.3s ease, opacity 0.3s ease",
          opacity: 0,
        }}
      />
    </>
  );
};

export default CursorDot;