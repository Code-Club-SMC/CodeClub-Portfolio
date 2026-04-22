// import React from "react";

// const ServicesComponent = ({ icon, title, desc }) => {
//   return (
//     <div
//       className={`flex flex-col items-center text-center px-6 py-10 rounded-xl transition-all duration-300
//       bg-transparent hover:bg-blue-500 hover:shadow-lg group`}
//     >
//       <div className="w-25 h-25 flex items-center justify-center rounded-full bg-blue-600 mb-6">
//         <img src={icon} alt={title} className="w-full h-full p-5" />
//       </div>
//       <h2 className="text-2xl font-bold text-gray-800 group-hover:text-white mb-4">
//         {title}
//       </h2>
//       <p className="text-gray-700 group-hover:text-white text-md text-center leading-relaxed tracking-wide">
//         {desc}
//       </p>
//     </div>
//   );
// };

// export default ServicesComponent;

import React from "react";
import { Link } from "react-router-dom";

const ServicesComponent = ({ icon, title, desc, link }) => {
  return (
    <Link
      to={link}
      className={`flex flex-col items-center text-center px-6 py-10 rounded-xl transition-all duration-300 
        bg-[#001c3d]  hover:bg-blue-400 hover:shadow-md group`}
    >
      <div className="w-20 h-20 flex items-center justify-center mb-6">
        <img
          src={icon}
          alt={title}
          className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition duration-300"
        />
      </div>
      <h2 className="text-lg font-semibold text-gray-300 group-hover:text-white mb-2">
        {title}
      </h2>
      <p className="text-gray-400 group-hover:text-gray-200 text-sm leading-relaxed tracking-wide">
        {desc}
      </p>
    </Link>
  );
};

export default ServicesComponent;
