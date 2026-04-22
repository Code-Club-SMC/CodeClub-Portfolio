import React, { useState } from "react";
import news1 from "../assets/news1.jpeg";
import news2 from "../assets/news2.jpg";
import news3 from "../assets/new3.jpeg";
import news4 from "../assets/news4.jpeg";
import news6 from "../assets/news6.jpeg";
import news5 from "../assets/news5.jpeg";


const newsData = [

  {
    title: "Code Club and Peshawar Services Club Partnership",
    summary:
      "Code Club and Peshawar Services Club have officially signed a partnership agreement aimed at strengthening collaboration between innovation and leadership. The agreement was formalized by Major Suhail Afzal, Secretary of Peshawar Services Club, along with Mr. Abdullah Qureshi, CEO of Code Club, and Mr. Muhammad Affan, CTO of Code Club. This partnership marks a significant step toward promoting technology-driven initiatives and fostering opportunities for young innovators in the region.",
    image: news5,
    date: "October 16, 2025",
  },

  {
    title: "Innovation Session at Lincoln Corners Pakistan",
    summary:
      "Mr. Abdullah Qureshi and Mr. Muhammad Affan, students of BCS 7th Semester and founding team members of Code Club, proudly represented their startup at the Pakistan One event organized by the Ministry of Planning, Development and Special Initiatives. Their participation highlighted the spirit of youth-led innovation and the potential of Code Club to contribute to Pakistan’s tech future.",
    image: news6,
    date: "October 1, 2025",
  },

  {
    title: "CodeClub Founders Represent at Pakistan One",
    summary:
      "Mr. Abdullah Qureshi and Mr. Muhammad Affan, students of BCS 7th Semester and founding team members of Code Club, proudly represented their startup at the Pakistan One event organized by the Ministry of Planning, Development and Special Initiatives. Their participation highlighted the spirit of youth-led innovation and the potential of Code Club to contribute to Pakistan’s tech future.",
    image: news2,
    date: "August 25, 2025",
  },
  {
    title: "CodeClub Inauguration Ceremony",
    summary:
      "Students of IM Sciences Peshawar have launched Code Club, a self-help software house to promote technology, modern trends, and income opportunities. Founded by Abdullah Hasnain Qureshi, it aims to bridge the gap between theory and practical skills. The inauguration was graced by Amjad Aziz Malik and Muhammad Habib Qureshi, who praised the students’ dedication. Around 30 students have joined in the first phase to work on real-world projects. Code Club will serve as a launchpad for talent, innovation, and professional growth.",
    image: news1,
    date: "July 21, 2025",
  },
  {
    title: "CodeClub Inauguration Ceremony",
    summary:
      "Students of IM Sciences Peshawar have launched Code Club, a self-help software house to promote technology, modern trends, and income opportunities. Founded by Abdullah Hasnain Qureshi, it aims to bridge the gap between theory and practical skills. The inauguration was graced by Amjad Aziz Malik and Muhammad Habib Qureshi, who praised the students’ dedication. Around 30 students have joined in the first phase to work on real-world projects. Code Club will serve as a launchpad for talent, innovation, and professional growth.",
    image: news3,
    date: "July 21, 2025",
  },
  {
    title: "CodeClub Inauguration Ceremony",
    summary:
      "Students of IM Sciences Peshawar have launched Code Club, a self-help software house to promote technology, modern trends, and income opportunities. Founded by Abdullah Hasnain Qureshi, it aims to bridge the gap between theory and practical skills. The inauguration was graced by Amjad Aziz Malik and Muhammad Habib Qureshi, who praised the students’ dedication. Around 30 students have joined in the first phase to work on real-world projects. Code Club will serve as a launchpad for talent, innovation, and professional growth.",
    image: news4,
    date: "July 21, 2025",
  },
];

const NewsPage = () => {
  const [expanded, setExpanded] = useState({});
  const [modalImage, setModalImage] = useState(null);

  const toggleExpand = (index) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index], // toggle only this card
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-20 mt-24 mb-10">
      <h1 className="text-5xl md:text-6xl font-bold text-gray-900 text-center">
        Latest <span className="text-blue-600">News & Insights</span>
      </h1>
      <div className="w-28 h-1 bg-gradient-to-r from-blue-500 via-yellow-400 to-black rounded-full mx-auto mt-4 mb-10"></div>

      <div className="grid md:grid-cols-3 gap-8">
        {newsData.map((news, index) => {
          const isExpanded = expanded[index];
          const displayedText = isExpanded
            ? news.summary
            : news.summary.length > 120
              ? news.summary.slice(0, 120) + "..."
              : news.summary;

          return (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md max-h-fit overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-48 object-cover cursor-pointer"
                onClick={() => setModalImage(news.image)}
              />
              <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {news.title}
                </h2>
                <p className="text-sm text-gray-500 mb-4">{news.date}</p>
                <p className="text-gray-700">{displayedText}</p>

                {/* Show button only if summary is long */}
                {news.summary.length > 120 && (
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
