import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StatsMain from "../components/statsCard/statsMain";
import FeatureCard from "../components/expertiseCard/FeatureCard";
import TechComp from "../components/techComp/TechComp";
import IndComp from "../components/industryComp/IndComp";
import { serviceMap } from "./ServiceData";
import UnlockComponent from "../components/UnlockComponent";
import { motion } from "framer-motion";
import { FaLinkedin } from "react-icons/fa";

const Service = () => {
  const { slug } = useParams();
  const currentService = serviceMap[slug];

  if (!currentService) {
    return (
      <div className="text-center text-red-500 mt-21">Service not found.</div>
    );
  }

  const [tabOptions, setTabOptions] = useState([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    if (currentService && currentService.techStack) {
      const keys = Object.keys(currentService.techStack);
      if (keys.length > 0) {
        setSelected(keys[0]); // always select the first key of the current service
      } else {
        setSelected(""); // reset if no techStack
      }
    }
  }, [slug]);






  return (
    <div className="mt-15 py-10">
      {/* Hero Section */}
      <section
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.5)), url(${currentService.bgImage})`,
        }}
        className="w-full flex flex-col justify-center items-center text-center px-5 py-28 text-white bg-cover bg-center bg-no-repeat"
      >
        <h1 className="font-berkshire text-[40px] leading-tight md:text-6xl md:leading-[70px] max-w-4xl">
          {currentService.title}
        </h1>
        <p className="mt-4 text-base md:text-lg max-w-2xl">
          {currentService.description}
        </p>
      </section>

      {/* Features Section */}
      <div className="p-20">
        <h1 className="text-5xl font-bold text-gray-800 leading-tight uppercase">
          {currentService.title} Expertise
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
          {currentService.features.map((feature, idx) => (
            <FeatureCard
              key={idx}
              title={feature.title}
              items={feature.items}
            />
          ))}
        </div>
      </div>


      {/* Tech Stack Section */}
      <div className="flex flex-col gap-10 w-full h-full bg-indigo-900 text-white lg:p-20 md:p-20 sm:p-10 sm:pt-20">
        <h1 className="uppercase font-bold lg:text-5xl md:text-5xl sm:text-4xl sm:text-center lg:text-start">
          Our Tech Stack
        </h1>

        {/* Tabs */}
        <div className="flex flex-wrap lg:justify-start md:justify-start sm:justify-center sm:items-center text-sm gap-2">
          {Object.keys(currentService.techStack).map((key) => {
            const label = key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase());

            return (
              <div className="flex items-center" key={key}>
                <input
                  type="radio"
                  name="options"
                  id={key}
                  className="hidden peer"
                  checked={selected === key}
                  onChange={() => setSelected(key)}
                />
                <label
                  htmlFor={key}
                  className="cursor-pointer rounded-full py-2 px-6 text-lg transition-colors duration-200 peer-checked:bg-indigo-600 peer-checked:text-white bg-indigo-800 text-gray-300"
                >
                  {label}
                </label>
              </div>
            );
          })}
        </div>

        {/* Tech Cards */}
        <div className="flex flex-wrap gap-6 mt-10 sm:justify-center lg:justify-start md:justify-start">
          {currentService.techStack[selected]?.map(({ icon, name }, index) => (
            <TechComp key={index} icon={icon} name={name} />
          ))}
        </div>
      </div>


      {/* Industries Section */}
      {currentService.industries && currentService.industries.length > 0 && (
        <div className="w-full h-full lg:p-20 md:p-20 sm:p-10">
          <h1 className="lg:text-5xl md:text-5xl sm:text-4xl font-bold text-gray-800 leading-tight uppercase">
            Our Expertise Extends Across <br />
            <span className="text-blue-600">Industries</span>
          </h1>
          <p className="lg:w-2/3 md:w-2/3 sm:w-full mt-5 text-gray-800 text-xl tracking-wider">
            We have extensive experience across a wide range of industries. No
            matter your niche, partnering with us ensures high-quality,
            innovative solutions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
            {currentService.industries.map((section, index) => (
              <IndComp
                key={index}
                title={section.title}
                items={section.items}
              />
            ))}
          </div>
        </div>
      )}

      {/* Team Members Section */}
      <div className="bg-gray-100 py-16 px-6 lg:px-20">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Meet the Team
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {currentService.team.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * idx }}
              className="bg-gradient-to-br from-yellow-50 to-white border border-yellow-200 shadow-md rounded-2xl p-8 transition-all hover:scale-105 hover:shadow-yellow-300 text-center"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {member.name}
              </h2>
              <p className="text-yellow-700 font-medium">{member.role}</p>
              {member.bio && (
                <p className="text-gray-600 mt-3 text-sm">{member.bio}</p>
              )}
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-yellow-700 hover:text-yellow-900"
                >
                  <FaLinkedin size={20} />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-blue-100 p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10 w-full h-full px-10 py-10">
          <StatsMain
            number="12+"
            label="DELIVERED PROJECTS"
            title="Successfully Delivered Projects"
            description="We've helped numerous startups and established businesses to launch their products or revise existing solutions."
          />
          <StatsMain
            number="100%"
            label="CLIENT SATISFACTION"
            title="Happy Clients"
            description="Our commitment to excellence is proven by the satisfaction of our diverse client base."
          />
          <StatsMain
            number="10+"
            label="EXPERTS"
            title="Industry Experts"
            description="Our team consists of skilled professionals with years of experience in the industry."
          />
        </div>
      </div>

      <UnlockComponent />
    </div>
  );
};

export default Service;
