import React from "react";
import ServicesComponent from "./ServicesComponent";
import AI from "../../assets/ai_service.webp";
import mobile from "../../assets/mobileDevService.webp";
import web from "../../assets/webDevService.webp";
import it_consulting from "../../assets/it_consulting.webp";
import software_development from "../../assets/software_development.webp";
import ioT from "../../assets/ioT.webp";
import data_analytics from "../../assets/data_analytics.webp";

const services = [
  {
    title: "Artificial Intelligence and ML",
    icon: AI,
    link: "/service/ai",
  },
  {
    title: "App Development",
    icon: mobile,
    link: "/service/mobile-apps",
  },
  {
    title: "Web Development",
    icon: web,
    link: "/service/web-development",
  },
  {
    title: "Cyber Security",
    icon: it_consulting,
    link: "/service/cybersecurity",
  },
  {
    title: "UI/UX Design",
    icon: software_development,
    link: "/service/ui-ux",
  },
  {
    title: "IoT Solutions",
    icon: ioT,
    link: "/service/iot",
  },
];

const AllServices = () => {
  return (
    <section className="bg-[#f9f9f9] py-20 px-4 cursor-pointer">
      <h1 align="center" className="mb-20 text-5xl font-bold text-gray-700">
        Fuel Your Growth with Our Services
      </h1>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <ServicesComponent
            key={index}
            link={service.link}
            icon={service.icon}
            title={service.title}
            desc={service.desc}
          />
        ))}
      </div>
    </section>
  );
};

export default AllServices;
