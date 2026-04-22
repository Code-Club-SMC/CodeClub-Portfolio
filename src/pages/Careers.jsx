import React, { useState } from "react";
import { motion } from "framer-motion";
import hero from "../assets/hero.jpg";
import UnlockComponent from "../components/UnlockComponent";

const jobs = [
   { title: "Web Scraper", dept: "Engineering", location: "Onsite" },
  { title: "SEO Expert", dept: "Marketing", location: "Onsite" },
  { title: "machine learning intern", dept: "tech", location: "Onsite" },
  { title: "Social media handler", dept: "marketing", location: "Onsite" },


];

export default function CareerPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isHiring, setIsHiring] = useState(true);

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    const message = `*Job Application for:* ${selectedJob.title}%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Phone:* ${formData.phone}`;
    const phoneNumber = "923003404342";
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
    setShowModal(false);
    setFormData({ name: "", email: "", phone: "" });
  };

  return (
    <>
      {/* hero */}
      <section className="w-full h-[70vh] relative overflow-hidden shadow-xl">
        <img
          src={hero}
          alt="Join Team"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col justify-center items-center px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Join Our <span className="text-yellow-400">Team</span>
          </h1>
          <p className="text-lg md:text-xl max-w-3xl leading-relaxed text-white/90">
            Transform your vision into high-performance software built by people
            who care.
          </p>
        </div>
      </section>

      <div className="bg-white text-gray-900 min-h-screen pt-32 pb-20 px-4 md:px-24">
        {/* Open Positions */}
        <section className="mb-28">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Open <span className="text-blue-600">Positions</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We value initiative, ownership, and collaborative problem-solving.
            </p>
          </div>

          {isHiring ? (
            <div className="flex flex-wrap justify-center items-stretch text-center gap-6 sm:gap-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              {jobs.map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="flex flex-col justify-between w-full sm:w-[280px] md:w-[320px] lg:w-[340px] p-5 sm:p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                      {job.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      {job.dept} · {job.location}
                    </p>
                  </div>
                  <button
                    className="mt-6 w-full sm:w-auto mx-auto text-white bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-lg font-medium transition-colors"
                    onClick={() => handleApplyClick(job)}
                  >
                    Apply Now
                  </button>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="w-full text-center px-4 sm:px-0">
              <h2 className="text-lg sm:text-2xl text-gray-700">
                We are not currently hiring
              </h2>
            </div>
          )}

        </section>


        {/* Core Values */}
        <section className="mb-28">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="text-blue-600">Core Values</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              At CodeClub, we build with intent — and we grow together.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Innovation", desc: "Pushing the tech frontier daily" },
              { title: "Integrity", desc: "Transparent, honest, client-first" },
              { title: "Growth", desc: "Upskill and empower teams" },
              { title: "Data-Driven Decisions", desc: "Turning raw data into actionable insights" },
              { title: "Search Visibility", desc: "Helping brands get discovered online" },
              { title: "Collaboration", desc: "Working together for better outcomes" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="p-6 bg-gray-100 border border-gray-200 rounded-xl text-center"
              >
                <div className="text-4xl mb-2 text-blue-500">✓</div>
                <h4 className="text-lg font-semibold text-gray-800 mb-1">
                  {item.title}
                </h4>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white text-gray-800 p-8 rounded-xl w-[90%] max-w-md relative shadow-xl">
              <button
                className="absolute top-2 right-4 text-xl font-bold text-gray-600"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
              <h3 className="text-2xl font-semibold mb-4">
                Apply for {selectedJob?.title}
              </h3>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full mb-3 p-3 border rounded"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full mb-3 p-3 border rounded"
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full mb-4 p-3 border rounded"
              />
              <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-medium"
              >
                Send via WhatsApp
              </button>
            </div>
          </div>
        )}
      </div>
      <UnlockComponent />
    </>
  );
}
