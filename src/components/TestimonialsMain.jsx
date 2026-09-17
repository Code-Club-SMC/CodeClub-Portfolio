import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const API_BASE = import.meta.env.VITE_API_BASE || "https://code-club-portfoliomanager-obqd.vercel.app";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const TestimonialsMain = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch(`${API_BASE}/api/testimonials`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && data.success) {
          setItems(data.testimonials || []);
        }
      })
      .catch((err) => console.error("Failed to load testimonials:", err))
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="py-16 sm:py-20 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto px-4 sm:px-6 mb-10 sm:mb-14"
      >
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900">
          What Our Clients Say
        </h3>
        <p className="text-gray-700 mt-4 text-base sm:text-lg font-medium">
          Real feedback from the people and businesses we’ve helped grow.
        </p>
      </motion.div>

      {loading ? (
        <div className="text-center text-gray-500 text-sm">Loading testimonials...</div>
      ) : items.length === 0 ? (
        <div className="text-center text-gray-500 text-sm">No testimonials yet.</div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={item._id || index}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <p className="text-gray-800 text-sm leading-relaxed mb-4">
                “{item.content}”
              </p>
              <div className="flex items-center gap-3">
                {item.avatar && (
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover border border-gray-100"
                  />
                )}
                <div>
                  <p className="text-sm font-bold text-gray-900">{item.name}</p>
                  {item.role && (
                    <p className="text-xs text-gray-500">{item.role}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default TestimonialsMain;
