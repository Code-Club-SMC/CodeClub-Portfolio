import React from "react";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";


import { motion } from "framer-motion";

// Images
import brand1 from "../assets/brands/brand1.png";
import brand2 from "../assets/brands/brand2.png";
import brand3 from "../assets/brands/brand3.png";
import brand4 from "../assets/brands/brand4.jpeg";
import brand5 from "../assets/brands/brand5.jpeg";
import brand6 from "../assets/brands/brand6.png";
import brand7 from "../assets/brands/brand7.jpg";
import brand8 from "../assets/brands/brand8.png";
import brand9 from "../assets/brands/brand9.jpg";
import brand10 from "../assets/brands/brand10.jpg";
import brand11 from "../assets/brands/brand11.jpeg";
import Allfix from "../assets/brands/Allfix.jpeg";
import FeatherStartCarWash from "../assets/brands/FeatherStartCarWash.jpeg";
import LEOLearning from "../assets/brands/LEOLearning.jpeg";
import CelesteinnHotel from "../assets/brands/CelesteinnHotel.jpeg";
import GLEAMUkPremiumCarWash from "../assets/brands/GLEAMUkPremiumCarWash.png";
import GeoWash from "../assets/brands/GEOWash.jpeg";
import edwardian from "../assets/about/edwardian.jpg";
import genius from "../assets/misc/gca.jpg";
import sca from "../assets/brands/sca.jpg";
import skill from "../assets/brands/skill.jpg";
import lavita from "../assets/brands/lavita.jpg";
import pyramids from "../assets/misc/pyramids.jpg";
import psx from "../assets/misc/pakistan-stock.jpg";
import edge from "../assets/brands/edge.jpg";
import ConcordiaColleges from "../assets/brands/Concordia Colleges.jpeg";
import MuftahChemicals from "../assets/brands/Muftah Chemicals PVT LTD.jpeg";
import NICPeshawar from "../assets/brands/NIC Peshawar.jpeg";
import NewAlKareemHostal from "../assets/brands/New Al-Kareem Hostal.jpeg";
import QualityCoachingAcademy from "../assets/brands/Quality Coaching Academy.jpeg";
import Sayaratak from "../assets/brands/Sayaratak.jpeg";
import NaqaaKsa from "../assets/brands/UnKnown.jpeg";
import IMSciences from "../assets/brands/win.jpg";
import AbbottabadClub  from "../assets/brands/AbbattabadClub.png";

// Brand data
export const brands = [
  { name: "Peshawar Services Club", image: brand10 },
  { name: "Haasil Pvt Ltd.", image: brand11 },
  { name: "IMSciences", image: IMSciences },
  { name: "Abbottabad Club", image: AbbottabadClub },
  { name: "Memaar Pvt Ltd.", image: brand1 },
  { name: "Shamroz group of companies Pvt Ltd.", image: brand5 },
  { name: "Paragon overseas education Pvt Ltd.", image: brand8 },
  { name: "H-MAK Pvt Ltd.", image: brand6 },
  { name: "64 Heights Pvt Ltd.", image: brand7 },
  { name: "Zamung kor", image: brand2 },
  { name: "Rehmat Tax Pvt Ltd.", image: brand3 },
  { name: "Federal Youth Parliment", image: brand9 },
  { name: "Zamong Khyber Pvt Ltd.", image: brand4 },
  { name: "GEO-Wash.", image: GeoWash },
  { name: "Edwardian Coaching Academy.", image: edwardian },
  { name: "Genius Coaching Academy.", image: genius },
  { name: "Standard Coaching Academy.", image: sca },
  { name: "Skill connect.", image: skill },
  { name: "Lavita Developers.", image: lavita },
  { name: "Pyramids website.", image: pyramids },
  { name: "Pakistan Stock exchange", image: psx },
  { name: "Edge Cutting Group.", image: edge },
  { name: "ALLFIX Maintenance Services", image: Allfix },
  { name: "Feather Start Car Wash", image: FeatherStartCarWash },
  { name: "LEO Learning", image: LEOLearning },
  { name: "Celesteinn Hotel", image: CelesteinnHotel },
  { name: "GLEAM Uk Premium Car Wash", image: GLEAMUkPremiumCarWash },
  { name: "Concordia Colleges", image: ConcordiaColleges },
  { name: "Muftah Chemicals PVT LTD", image: MuftahChemicals },
  { name: "NIC Peshawar", image: NICPeshawar },
  { name: "New Al-Kareem Hostel", image: NewAlKareemHostal },
  { name: "Quality Coaching Academy", image: QualityCoachingAcademy },
  { name: "Sayaratak", image: Sayaratak },
  { name: "Naqaa-Ksa", image: NaqaaKsa },

];

// Fade animation
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Brands = () => {
  return (
    <section className="py-16 sm:py-20 bg-white">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-xl mx-auto px-4 sm:px-6 mb-10 sm:mb-14"
      >
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900">
          Trusted by Leading Businesses
        </h3>
        <p className="text-gray-700 mt-4 text-base sm:text-lg font-medium">
          Over{" "}
          <span className="font-bold text-indigo-600">100+ businesses</span>{" "}
          worldwide rely on us to craft modern digital solutions.
        </p>
      </motion.div>

      {/* Carousel */}
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 2000, // better than 0
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={4000}
        loop={true}
        spaceBetween={24}
        slidesPerView={6}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet !bg-gray-400 opacity-60',
          bulletActiveClass: 'swiper-pagination-bullet-active !bg-teal-600 opacity-100',
        }}
        breakpoints={{
          320: { slidesPerView: 2, spaceBetween: 12 },
          400: { slidesPerView: 2, spaceBetween: 14 },
          480: { slidesPerView: 2, spaceBetween: 16 },
          540: { slidesPerView: 3, spaceBetween: 18 },
          640: { slidesPerView: 3, spaceBetween: 20 },
          768: { slidesPerView: 4, spaceBetween: 24 },
          1024: { slidesPerView: 6, spaceBetween: 24 },
        }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 !pb-12"
      >
        {brands.map((brand, index) => {
          const isWhiteLogo = brand.name === "H-MAK Pvt Ltd.";

          return (
            <SwiperSlide key={index}>
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.04, duration: 0.6 }}
                className="flex flex-col justify-center items-center bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-3 sm:p-4 md:p-5 lg:p-6"
              >
                {/* Logo container with fixed size */}
                <div
                  className={`h-24 w-32 sm:h-28 sm:w-40 flex justify-center items-center rounded-lg ${
                    isWhiteLogo ? "bg-gray-900 p-2" : "bg-white p-2"
                  }`}
                >
                  <img
                    src={brand.image}
                    alt={`${brand.name} Logo`}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                {/* Brand name */}
                <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base font-bold text-gray-900 text-center">
                  {brand.name}
                </p>
              </motion.div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default Brands;
