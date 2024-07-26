import React from "react";
import { MensBrands, WomensBrands } from "../../utility/Image_Links";
import TitleBanner from "./TitleBanner";
import BrandsCarousel from "./BrandsCarousel";

const Brands = () => {
  return (
    <div className="mt-[5rem] flex flex-col items-center justify-center">
      <div className="w-4/5 text-center">
        <TitleBanner title="MEN'S BRANDS" />
        <div className="mt-12 ">
          <BrandsCarousel brands={MensBrands} />
        </div>
      </div>
      <div className="w-4/5 mt-[4.5rem] text-center">
        <TitleBanner title="WOMEN'S BRANDS" />
        <div className="mt-12  ">
          <BrandsCarousel brands={WomensBrands} />
        </div>
      </div>
    </div>
  );
};

export default Brands;
