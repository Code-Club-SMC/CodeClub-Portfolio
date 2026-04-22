import React from "react";

const ExpertiseLeft = ({ img }) => {
  return (
    <div className="flex justify-center sm:w-full lg:w-1/2 ">
      <img
        src={img}
        alt="AI Phone UI"
        className="max-w-full h-auto object-cover xl:w-full"
      />
    </div>
  );
};

export default ExpertiseLeft;
