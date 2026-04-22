import React from "react";
import ExpertiseLeft from "./ExpertiseLeft";
import ExpertiseRight from "./ExpertiseRight";

const ExperiseComponent = ({ img, name, desc, expertAreas }) => {
  return (
    <>
      <div className="w-screen flex lg:flex-row md:flex-row sm:flex-col overflow-hidden">
        <ExpertiseLeft img={img} />
        <ExpertiseRight name={name} desc={desc} expArea={expertAreas} />
      </div>
    </>
  );
};

export default ExperiseComponent;
