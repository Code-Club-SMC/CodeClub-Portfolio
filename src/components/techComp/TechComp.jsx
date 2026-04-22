import React from "react";

const TechComp = ({ icon, name }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-md w-20 h-20 md:w-25 md:h-25 lg:w-30 lg:h-30">
      <div className="flex items-center justify-center">
        <img
          src={icon}
          alt={name}
          className="w-[100%] h-[100%] md:w-[100%] md:h-[100%] lg:w-[100%] lg:h-[100%] object-cover"
        />
      </div>
    </div>
  );
};

export default TechComp;
