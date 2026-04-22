import React from "react";

const StatsMain = ({ number, label, title, description }) => {
  return (
    <div className="bg-transparent rounded-xl p-6 max-w-sm shadow-md hover:shadow-2xl transition-shadow duration-300 ease-in-out">
      <div className="relative text-7xl font-bold text-gray-900 mb-2">
        {number}
        <span className="absolute top-0 left-0 text-7xl text-gray-300 opacity-30 select-none">
          {number}
        </span>
      </div>
      <p className="uppercase text-xs tracking-widest text-gray-600 mb-4">
        {label}
      </p>
      <h3 className="text-2xl font-semibold text-gray-700 mb-2">{title}</h3>
      <p className="text-lg text-gray-700">{description}</p>
    </div>
  );
};

export default StatsMain;
