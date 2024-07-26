import React from "react";
import { ShopForImages } from "../../utility/Image_Links";
import TitleBanner from "./TitleBanner";

const ShopFor = () => {
  return (
    <div className="mt-[4rem] flex justify-center">
      <div className="w-4/5">
        <TitleBanner title="SHOP FOR" />

        <div className="mt-12 flex gap-x-5">
          {ShopForImages.map((image) => {
            return (
              <div
                key={image}
                className="h-[44vh] w-[25vw] overflow-hidden rounded-xl bg-gray-300"
              >
                <img
                  src={image}
                  alt="Shop for banner"
                  className="h-full w-full object-fill"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ShopFor;
