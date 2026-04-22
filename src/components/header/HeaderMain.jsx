// import React, { useEffect, useRef, useState } from "react";
// import HeaderLeft from "./headerLeft";
// import HeaderMid from "./HeaderMid";
// import HeaderRight from "./HeaderRight";
// import { HiMenu, HiX } from "react-icons/hi";

// const HeaderMain = () => {
//   const [isHovered, setIsHovered] = useState(false);
//   const [showHeader, setShowHeader] = useState(true);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const prevScrollY = useRef(0);
//   const timeoutRef = useRef(null);

//   useEffect(() => {
//     document.body.style.overflow = mobileOpen ? "hidden" : "auto";
//   }, [mobileOpen]);

//   const handleMouseEnter = () => {
//     clearTimeout(timeoutRef.current);
//     setIsHovered(true);
//   };

//   const handleMouseLeave = () => {
//     timeoutRef.current = setTimeout(() => {
//       setIsHovered(false);
//     }, 300);
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;
//       if (currentScrollY > prevScrollY.current && currentScrollY > 100) {
//         setShowHeader(false);
//       } else {
//         setShowHeader(true);
//       }

//       setIsScrolled(currentScrollY > 50);
//       prevScrollY.current = currentScrollY;
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <header
//       className={`w-full tw:font-display fixed top-0 z-40 px-7 py-5 transition-all duration-300 ${
//         isHovered || isScrolled
//           ? "bg-white text-black"
//           : "bg-transparent text-white"
//       } ${showHeader ? "translate-y-0 " : "-translate-y-full"} `}
//     >
//       <div className="max-w-[1300px] mx-auto px-6 h-[70px] flex items-center justify-between">
//         <HeaderLeft
//           handleMouseEnter={handleMouseEnter}
//           handleMouseLeave={handleMouseLeave}
//         />
//         <HeaderMid
//           handleMouseEnter={handleMouseEnter}
//           handleMouseLeave={handleMouseLeave}
//         />
//         <HeaderRight
//           handleMouseEnter={handleMouseEnter}
//           handleMouseLeave={setIsHovered}
//           isHovered={isHovered}
//           showHeader={showHeader}
//         />

//         <div className="md:hidden">
//           <button
//             onClick={() => setMobileOpen(!mobileOpen)}
//             className="text-4xl focus:outline-none"
//             onMouseEnter={handleMouseEnter}
//             onMouseLeave={handleMouseLeave}
//           >
//             {mobileOpen ? <HiX /> : <HiMenu />}
//           </button>
//         </div>
//       </div>

//       {mobileOpen && (
//         <div className="md:hidden bg-white text-black">
//           <HeaderMid isMobile={true} closeMobile={() => setMobileOpen(false)} />
//           <div className="p-4 border-t">
//             <HeaderRight
//               isHovered={true}
//               showHeader={true}
//               handleMouseEnter={() => {}}
//               handleMouseLeave={() => {}}
//             />
//           </div>
//         </div>
//       )}
//     </header>
//   );
// };

// export default HeaderMain;
