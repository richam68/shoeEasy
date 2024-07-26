import React from "react";
import { ExploreMoreImages } from "../../utility/Image_Links";
import TitleBanner from "./TitleBanner";

const ExploreMore = () => {
  return (
    <div className="mt-[6rem] mb-[4rem] flex justify-center">
      <div className="w-4/5">
        <TitleBanner title="EXPLORE MORE" />
        <div className="className= mt-14 flex gap-x-5">
          {ExploreMoreImages.map((explore) => {
            return (
              <div
                className="bg-gray-300 h-[40vh] w-[26vw] overflow-hidden cursor-pointer rounded-lg"
                key={explore}
              >
                <img
                  src={explore}
                  alt="explore-more"
                  className="h-full w-full object-cover hover:scale-125 transition-all duration-500 ease-out"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExploreMore;
