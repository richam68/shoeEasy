import React from "react";

const TitleBanner = ({ title }) => {
  return (
    <h1 className="text-3xl font-semibold border-b-2 border-gray-400 text-center leading-[0.1em] w-full">
      <span className="px-8 py-2 bg-white hover:text-[#ed4f7a] rounded-lg">
        {title}
      </span>
    </h1>
  );
};

export default TitleBanner;
