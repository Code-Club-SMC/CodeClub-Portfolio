import React from "react";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

// Framer Motion
import { motion } from "framer-motion";

// Images
import brand1 from "../../assets/brand1.png";
import brand2 from "../../assets/brand2.png";
import brand3 from "../../assets/brand3.png";
import brand4 from "../../assets/brand4.jpeg";
import brand5 from "../../assets/brand5.jpeg";
import brand6 from "../../assets/brand6.png";
import brand7 from "../../assets/brand7.jpg";
import brand8 from "../../assets/brand8.png";
import brand9 from "../../assets/brand9.jpg";
import brand10 from "../../assets/brand10.jpg";
import brand11 from "../../assets/brand11.jpeg";
import win from "../../assets/win.jpg";
import swash from "../../assets/s-wash.jpg";
import edwardian from "../../assets/edwardian.jpg";
import genius from "../../assets/gca.jpg";
import sca from "../../assets/sca.jpg";
import skill from "../../assets/skill.jpg";
import lavita from "../../assets/lavita.jpg";
import pyramids from "../../assets/pyramids.jpg";
import psx from "../../assets/pakistan-stock.jpg";
import edge from "../../assets/edge.jpg";

// Brand data
const brands = [
  { name: "Peshawar Services Club", image: brand10 },
  { name: "Haasil Pvt Ltd.", image: brand11 },
  { name: "Memaar Pvt Ltd.", image: brand1 },
  { name: "Shamroz group of companies Pvt Ltd.", image: brand5 },
  { name: "Paragon overseas education Pvt Ltd.", image: brand8 },
  { name: "H-MAK Pvt Ltd.", image: brand6 },
  { name: "64 Heights Pvt Ltd.", image: brand7 },
  { name: "Zamung kor", image: brand2 },
  { name: "Rehmat Tax Pvt Ltd.", image: brand3 },
  { name: "Federal Youth Parliment", image: brand9 },
  { name: "Zamong Khyber Pvt Ltd.", image: brand4 },
  { name: "Imsciences (cdc).", image: win },
  { name: "S-wash.", image: swash },
  { name: "Edwardian Coaching Academy.", image: edwardian },
  { name: "Genius Coaching Academy.", image: genius },
  { name: "Standard Coaching Academy.", image: sca },
  { name: "Skill connect.", image: skill },
  { name: "Lavita Developers.", image: lavita },
  { name: "Pyramids website.", image: pyramids },
  { name: "Pakistan Stock exchange", image: psx },
  { name: "Edge Cutting Group.", image: edge },
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
        modules={[Autoplay]}
        autoplay={{
          delay: 2000, // better than 0
          disableOnInteraction: false,
        }}
        speed={4000}
        loop={true}
        spaceBetween={30}
        breakpoints={{
          320: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
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
                className="flex flex-col justify-center items-center bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-5 sm:p-6"
              >
                {/* Logo container with fixed size */}
                <div
                  className={`h-28 w-40 flex justify-center items-center rounded-lg ${
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
                <p className="mt-4 sm:mt-5 text-sm sm:text-base font-bold text-gray-900 text-center">
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
