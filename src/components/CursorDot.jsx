import React, { useEffect, useRef, useState } from "react";

const CursorDot = () => {
  const dotRef = useRef(null);
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setTargetPos({ x: e.clientX, y: e.clientY });
    };

    const animate = () => {
      const speed = 0.8;

      const dx = targetPos.x - currentPos.current.x;
      const dy = targetPos.y - currentPos.current.y;

      // Calculate distance to target
      const distance = Math.sqrt(dx * dx + dy * dy);

      // If very close, snap to position
      if (distance < 1) {
        currentPos.current.x = targetPos.x;
        currentPos.current.y = targetPos.y;
      } else {
        currentPos.current.x += dx * speed;
        currentPos.current.y += dy * speed;
      }

      if (dotRef.current) {
        dotRef.current.style.left = `${currentPos.current.x}px`;
        dotRef.current.style.top = `${currentPos.current.y}px`;
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [targetPos]);

  return (
    <div
      ref={dotRef}
      className="sm:hidden lg:block md:block"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "8px",
        height: "8px",
        backgroundColor: "blue",
        borderRadius: "50%",
        pointerEvents: "none",
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
      }}
    />
  );
};

export default CursorDot;
