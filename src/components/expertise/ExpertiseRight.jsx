import React, { useState } from "react";

const tabs = ["Expert areas"];

const ExpertiseRight = ({ name, desc, expArea }) => {
  const [activeTab, setActiveTab] = useState("Expert areas");

  return (
    <div className="max-w-full bg-[#f4f8ff] lg:pl-40 md:pl-40 sm:pl-10 sm:py-20 pr-10 flex flex-col justify-center">
      <h2 className="text-3xl font-medium tracking-wide text-[#121212] mb-4">
        {name}
      </h2>
      <p className="text-[#777f8f] font-extralight text-lg mb-6 max-w-lg leading-8">
        {desc}
      </p>

      <div className="flex space-x-6 border-b border-gray-300 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 font-semibold text-md tracking-wide transition-all duration-300  ${
              activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600 "
                : "text-[#777f8f]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Expert areas" && (
        <ul className="list-disc pl-5 space-y-3 marker:text-blue-700 marker:text-xl">
          {expArea.map((item, idx) => (
            <li key={idx}>
              <a
                href="#"
                className="hover:text-blue-700 transition-all duration-300 text-gray-500 text-lg"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      )}

      {activeTab === "Top cases" && (
        <div className="text-gray-600">Coming soon...</div>
      )}
    </div>
  );
};

export default ExpertiseRight;
