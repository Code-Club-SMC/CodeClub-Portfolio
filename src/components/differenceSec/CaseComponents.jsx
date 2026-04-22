import React from "react";

const CaseComponents = ({ img }) => {
  return (
    <div>
      <div className="w-[65%] h-full d-flex justify-center items-centers floating-img">
        <img src={img} alt="" width="100%" />
      </div>
    </div>
  );
};

export default CaseComponents;
