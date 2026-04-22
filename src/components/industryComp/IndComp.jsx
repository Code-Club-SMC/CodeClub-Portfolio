import React from "react";

const IndComp = ({ title, items }) => {
  return (
    <div className="group border-l-5 border-gray-600 bg-gray-100 p-10 w-full max-w-sm shadow-sm hover:shadow-lg hover:bg-gray-800 transition-all duration-300">
      <h2 className="text-3xl font-semibold text-gray-700 group-hover:text-white transition-colors duration-300 mb-6">
        {title}
      </h2>
      <ul className="list-disc text-xl list-inside space-y-2">
        {items.map((item, index) => (
          <li
            key={index}
            className="ml-2 text-gray-800 group-hover:text-white transition-colors duration-300"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IndComp;
