import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";
import { HiOutlineCode } from "react-icons/hi";
import caseStudiesData from "../../data/caseStudiesData.json";

const API_BASE = import.meta.env.VITE_API_BASE || "https://code-club-portfoliomanager-obqd.vercel.app";

const imageModules = import.meta.glob("../../assets/portfolio/*.{jpeg,jpg,png,webp}", {
  eager: true,
});

const getLocalImage = (filename) => {
  const match = Object.entries(imageModules).find(([path]) =>
    path.endsWith(`/${filename}`)
  );
  return match ? match[1].default : "";
};

const resolveImage = (item) => {
  if (!item || !item.image) return "";
  if (typeof item.image === "string" && item.image.startsWith("http")) return item.image;
  if (typeof item.image === "string" && item.image.startsWith("/")) {
    return `${API_BASE}${item.image}`;
  }
  return getLocalImage(item.image);
};

const getGradientColor = (index) => {
  const blue = "#2a7de3";
  const yellow = "rgb(250, 204, 21)";
  const black = "rgb(30, 30, 30)";
  const gradients = [
    [blue, black],
    [black, yellow],
  ];
  return gradients[index % gradients.length];
};

const mapProject = (project, index) => ({
  title: project.title || project.name || `Project ${index + 1}`,
  description: project.description || "",
  tags: Array.isArray(project.tags)
    ? project.tags
    : Array.isArray(project.technologiesUsed)
      ? project.technologiesUsed
      : [],
  url: project.link || project.liveLink || project.demoUrl || project.url || "",
  image: resolveImage(project),
});

const OurProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(`${API_BASE}/api/projects`);
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        const list = Array.isArray(data.projects) ? data.projects : [];
        setProjects(list.map(mapProject));
      } catch (err) {
        console.error("Projects fetch error:", err);
        setError("Unable to load projects right now. Showing cached content.");
        setProjects(caseStudiesData.map(mapProject));
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg">Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-4 mb-8">
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full px-4 space-y-10 relative z-10">
      {projects.map((project, index) => {
        const isReversed = index % 2 === 1;
        const [startColor, endColor] = getGradientColor(index);

        return (
          <motion.div
            key={project.title + index}
            initial={{
              background: `linear-gradient(to right, ${startColor}, ${endColor})`,
            }}
            animate={{
              background: `linear-gradient(to right, ${startColor}, ${endColor})`,
            }}
            whileHover={{
              background: `linear-gradient(to right, ${endColor}, ${startColor})`,
              scale: 1.02,
            }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden shadow-2xl text-white"
          >
            <div
              className={`max-w-7xl mx-auto flex flex-col md:flex-row ${isReversed ? "md:flex-row-reverse" : ""
                } items-center px-6 py-16 gap-8`}
            >
              {/* Text */}
              <div className="md:w-1/2 space-y-4">
                <h3 className="text-3xl font-bold">{project.title}</h3>
                <p className="text-base text-white/90">{project.description}</p>

                {/* Tags */}
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-medium tracking-wider uppercase px-3 py-1.5 rounded-full border border-white/20 text-white/80 bg-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* CTA */}
                {project.url ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 self-start px-7 py-3 rounded-full text-sm font-semibold bg-white text-gray-900 shadow-lg hover:brightness-110 transition-all duration-300"
                  >
                    <FiExternalLink className="text-base" />
                    View Live Project
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2.5 self-start px-7 py-3 rounded-full text-sm font-semibold border border-white/20 text-white/70 bg-white/5">
                    <HiOutlineCode className="text-base" />
                    Private Deployment
                  </span>
                )}
              </div>

              {/* Image */}
              <div className="md:w-1/2 h-64">
                <motion.div
                  whileHover={{ y: -10, rotate: 1, scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-full h-64 flex items-center justify-center"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="max-h-full max-w-full object-contain drop-shadow-xl pointer-events-none"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default OurProjects;
