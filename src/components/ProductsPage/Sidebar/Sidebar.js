import React from "react";
import BrandFilter from "./BrandAccordian/BrandFilter";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";
import RatingFilter from "./RatingFilter";

const Sidebar = () => {
  return (
    <div>
      <CategoryFilter />
      <BrandFilter />
      <PriceFilter />
      <RatingFilter />
    </div>
  );
};

export default Sidebar;
