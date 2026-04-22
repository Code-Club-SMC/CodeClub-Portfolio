import React from "react";
import { motion } from "framer-motion";
import teamImage from "../assets/aboutus2.jpg";
import UnlockComponent from "../components/UnlockComponent";

const stats = [
  { label: "Projects Delivered", value: "120+" },
  { label: "Clients Worldwide", value: "35+" },
  { label: "Team Members", value: "30+" },
];

export default function AboutUsSection() {
  return (
    <>
      <div className="bg-white text-gray-900 font-body pt-32 pb-20 px-6 md:px-24">
        {/* About Us */}
        <section className="mb-24">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2 space-y-6">
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900">
                About <span className="text-blue-600">Us</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 via-yellow-400 to-black rounded-full mb-4"></div>
              <p className="text-lg text-gray-600 leading-relaxed">
                At CodeClub, we build elegant, scalable solutions that power
                modern businesses. From startups to enterprises, our products
                are used and loved across industries.
              </p>
              <p className="text-gray-500">
                With a strong foundation in engineering and a user-first design
                philosophy, we’ve helped launch 100+ digital products that
                actually make an impact.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition duration-300">
                Learn More
              </button>
            </div>

            <div className="md:w-1/2 relative rounded-xl overflow-hidden group">
              <img
                src={teamImage}
                alt="Our Team"
                className="w-full h-auto object-cover rounded-xl max-h-[400px]"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-blue-600/10 group-hover:from-blue-700/30 transition duration-300 rounded-xl" />
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="text-center mb-24">
          <h3 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-6">
            Our Mission
          </h3>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            To create digital solutions that are fast, reliable, and genuinely
            useful — built with care, for real users. We aim to empower
            businesses by crafting technology that solves real problems and
            delivers meaningful impact.
          </p>
        </section>

        {/* Milestones */}
        <section className="max-w-6xl mb-10 mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-6">
            Our Milestones
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 via-yellow-400 to-black rounded-full mx-auto mb-12"></div>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-12">
            A quick snapshot of what we've achieved so far.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-gray-100 border border-gray-300 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-4xl font-bold text-blue-500">
                  {stat.value}
                </div>
                <div className="text-md mt-3 text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Meet Our Team */}
        {/* <section className="max-w-6xl mx-auto text-center mt-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Meet Our <span className="text-blue-600">Team</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 via-yellow-400 to-black rounded-full mx-auto mb-12"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {[
              {
                name: "Abdullah Qureshi",
                role: "Founder & CEO",
              },
              { name: "Affan", role: "CTO" },
              { name: "Mian Zubair Ali Shah", role: "Manager" },
            ].map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
                className="bg-white border border-gray-200 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-xl font-semibold text-gray-800">
                  {member.name}
                </div>
                <div className="text-sm text-blue-600 mt-1">{member.role}</div>
              </motion.div>
            ))}
          </div>
        </section> */}
      </div>
      <UnlockComponent />
    </>
  );
}
