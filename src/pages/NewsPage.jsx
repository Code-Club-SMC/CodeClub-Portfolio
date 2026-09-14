import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import newsData from "../data/newsData.json";

const imageModules = import.meta.glob("../assets/news/*.{jpeg,jpg,png,webp}", {
  eager: true,
});

const getImage = (filename) => {
  const match = Object.entries(imageModules).find(([path]) =>
    path.endsWith(`/${filename}`)
  );
  return match ? match[1].default : "";
};

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState({});
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(`${API_BASE}/api/news`);
      if (!res.ok) throw new Error("Failed to fetch news");
      const data = await res.json();
      const newsList = Array.isArray(data.news) ? data.news : [];
      setNews(newsList);
    } catch (err) {
      setError("Unable to load news right now. Showing cached content.");
      console.error("News fetch error:", err);
      setNews(newsData);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (index) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const resolveImage = (item) => {
    if (!item) return "";
    if (typeof item.image === "string" && item.image.startsWith("http")) return item.image;
    if (typeof item.image === "string") return getImage(item.image);
    return "";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-20 mt-24 mb-10">
      <h1 className="text-5xl md:text-6xl font-bold text-gray-900 text-center">
        Latest <span className="text-blue-600">News & Insights</span>
      </h1>
      <div className="w-28 h-1 bg-gradient-to-r from-blue-500 via-yellow-400 to-black rounded-full mx-auto mt-4 mb-10"></div>

      {loading ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">Loading latest news...</p>
        </div>
      ) : error ? (
        <div className="text-center py-4 mb-8">
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      ) : null}

      <div className="grid md:grid-cols-3 gap-8">
        {news.map((newsItem, index) => {
          const isExpanded = expanded[index];
          const summary = newsItem.description || newsItem.summary || "";
          const displayedText = isExpanded
            ? summary
            : summary.length > 120
              ? summary.slice(0, 120) + "..."
              : summary;

          return (
            <div
              key={newsItem._id || newsItem.id || index}
              className="bg-white rounded-2xl shadow-md max-h-fit overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={resolveImage(newsItem)}
                alt={newsItem.title}
                className="w-full h-48 object-cover cursor-pointer"
                onClick={() => setModalImage(resolveImage(newsItem))}
              />
              <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {newsItem.title}
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  {newsItem.date || newsItem.created_at ? new Date(newsItem.date || newsItem.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : ""}
                </p>
                <p className="text-gray-700">{displayedText}</p>

                {summary.length > 120 && (
                  <button
                    className="mt-3 text-blue-600 font-semibold hover:underline"
                    onClick={() => toggleExpand(index)}
                  >
                    {isExpanded ? "Read Less" : "Read More →"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Image Modal */}
      {modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setModalImage(null)}
        >
          <img
            src={modalImage}
            alt="Full"
            className="max-w-3xl max-h-[90vh] rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
};

export default NewsPage;
