import { Typography } from "@material-tailwind/react";
import React from "react";
import { BrandAccordian } from "./BrandAccordian";

const BrandFilter = () => {
  return (
    <div className="min-h-32 pt-8 pb-5 px-6 border-b-2">
      <Typography
        color="blue-gray"
        className="font-extrabold uppercase text-sm"
      >
        Brands
      </Typography>

      <div className="mt-2 flex flex-col">
        <BrandAccordian />
      </div>
    </div>
  );
};

export default BrandFilter;
