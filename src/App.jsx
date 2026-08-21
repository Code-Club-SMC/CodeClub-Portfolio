import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

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
import Clients from "./pages/Clients";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


function App() {
  return (
    <Router>
      <AppInner />
    </Router>
  );
}

function AppInner() {
  const location = useLocation();
  const isClientsPage = location.pathname === "/clients";

  return (
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
          <Route path="/clients" element={<Clients />} />
          <Route path="/methodology" element={<OurMethodology />} />
          <Route path="/development" element={<DevelopmentApproach />} />
          <Route path="/launch" element={<IdeaToLaunch />} />
          <Route path="/code-club-team" element={<OurTeam />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/about" element={<AboutUsSection />} />
          <Route path="/service/:slug" element={<Service />} />
          <Route path="/news" element={<NewsPage />} />
        </Routes>
      </main>
      <FooterMain className={isClientsPage ? "snap-start" : ""} />
      <CursorDot />
    </div>
  );
}

export default App;
