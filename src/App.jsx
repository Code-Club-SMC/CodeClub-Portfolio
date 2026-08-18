import { useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CursorDot from "./components/CursorDot";
import Index from "./pages/Index";
import OurTeam from "./pages/OurTeam";
import OurVision from "./pages/OurVision";
import CareerPage from "./pages/Careers";
import FooterMain from "./components/footer/FooterMain";
import Navbar from "./components/Navbar";
import CaseStudies from "./pages/CaseStudies";
import Contact from "./pages/Contact";

import Service from "./pages/Service";

import AboutUsSection from "./pages/AboutUsSection";
import OurMethodology from "./pages/OurMethodology";
import DevelopmentApproach from "./pages/Development";
import IdeaToLaunch from "./pages/Idea";
import ScrollToTop from "./components/scrollToTop";
import NewsPage from "./pages/NewsPage";
import Portfolio from "./pages/Portfolio";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


function App() {
  const lastScroll = useRef(0);

  useEffect(() => {
    const footer = document.querySelector("footer");

    const handleScroll = () => {
      if (!footer) return;

      const rect = footer.getBoundingClientRect();
      const footerTop = rect.top + window.scrollY;
      const scrollTop = window.scrollY;
      const scrollDir = scrollTop > lastScroll.current ? "down" : "up";

      // If user is scrolling down and footer is about to go out of view
      if (
        scrollDir === "down" &&
        window.innerHeight + scrollTop >= footerTop + footer.offsetHeight
      ) {
        window.scrollTo({ top: lastScroll.current, behavior: "auto" });
        return;
      }

      // Save last valid scroll position
      lastScroll.current = scrollTop;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Router>
      <div className="flex flex-col ">
        <ScrollToTop></ScrollToTop>
        <Navbar />
        <main className="flex-1 font-body">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/our-team" element={<OurTeam />} />
            <Route path="/vision" element={<OurVision />} />
            <Route path="/careers" element={<CareerPage />} />
            <Route path="/caseStudies" element={<Portfolio />} />
            <Route path="/methodology" element={<OurMethodology />} />
            <Route path="/development" element={<DevelopmentApproach />} />
            <Route path="/launch" element={<IdeaToLaunch />} />
            <Route path="/code-club-team" element={<OurTeam />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/about" element={<AboutUsSection />} />
            <Route path="/service/:slug" element={<Service />} />
            <Route path="/news" element={<NewsPage />} />
            {/* <Route path="/portfolio" element={<Portfolio />} /> */}
          </Routes>
        </main>
        <FooterMain />
        {/* <Helper /> */}
        <CursorDot />
      </div>
    </Router>
  );
}

export default App;
