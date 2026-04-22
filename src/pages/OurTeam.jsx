import React from "react";
import { motion } from "framer-motion";
import { FaLinkedin } from "react-icons/fa";
import ContactMain from "../components/contact/contactMain.jsx";

const team = {
  ceo: {
    name: "Abdullah Qureshi",
    role: "Chief Executive Officer",
    linkedin:
      "https://www.linkedin.com/in/abdullah-qureshi-61813631a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app ",
    bio: "Leading CodeClub with a vision for innovation and growth.",
  },
  executives: [
    {
      name: "Muhammad Affan",
      role: "Chief Technology Officer",
      linkedin: "https://www.linkedin.com/in/muhammad-affan-77bb91200/",
      bio: "Architecting scalable systems and ensuring top-notch code quality.",
    },
    // {
    //   name: "",
    //   role: "Manager",
    //   linkedin: "https://www.linkedin.com/in/mian-shah-3190a030a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app ",
    //   bio: "Overseeing teams and streamlining daily operations.",
    // },
    {
      name: "Atif Muhammad",
      role: "Manager",
      linkedin:
        "https://www.linkedin.com/in/atif-muhammad-ba1396289/ ",
      bio: "Driving operational excellence and process optimization.",
    },
  ],
};

export default function TeamSection() {
  return (
    <>
      <section className="bg-white mt-24 py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          {/* Title */}
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900">
            Meet <span className="text-blue-600">Our Leadership</span>
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-600 max-w-2xl mx-auto mb-16"
          >
            The minds shaping CodeClub's vision, strategy, and success.
          </motion.p>

          {/* CEO */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center mb-20"
          >
            <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-200 shadow-lg rounded-2xl p-8 w-96 transition-all hover:scale-105 hover:shadow-blue-300">
              <h2 className="text-2xl font-bold text-gray-800">
                {team.ceo.name}
              </h2>
              <p className="text-blue-700 font-medium">{team.ceo.role}</p>
              <p className="text-gray-600 mt-4 text-sm">{team.ceo.bio}</p>
              <a
                href={team.ceo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-blue-600 hover:text-blue-800"
              >
                <FaLinkedin size={22} />
              </a>
            </div>
          </motion.div>

          {/* Executives */}
          {/* Executives */}
          <div className="flex flex-wrap justify-center gap-12 max-w-5xl mx-auto">
            {team.executives.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * idx }}
                className="bg-gradient-to-br from-yellow-50 to-white border border-yellow-200 shadow-md rounded-2xl p-8 w-80 transition-all hover:scale-105 hover:shadow-yellow-300 text-center"
              >
                <h3 className="text-xl font-semibold text-gray-800">
                  {member.name}
                </h3>
                <p className="text-yellow-700 font-medium">{member.role}</p>
                <p className="text-gray-600 mt-3 text-sm">{member.bio}</p>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-yellow-700 hover:text-yellow-900"
                >
                  <FaLinkedin size={20} />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ContactMain />
    </>
  );
}
