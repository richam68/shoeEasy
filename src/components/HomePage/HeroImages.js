import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  HeroImage,
  LowerCarouselImages,
  UpperCarouselImages,
} from "../../utility/Image_Links";
import { handleRouteChangeClick } from "../updateRouteInStore";
import ImageCarousel from "./ImageCarousel";

const HeroImages = () => {
  const dispatch = useDispatch();
  return (
    <div className="w-full h-[60vh] flex">
      <div className="w-1/2 h-full bg-slate-200 relative">
        <div className="absolute mt-2 h-full flex flex-col justify-center items-center  w-full text-white z-10">
          <div className="text-lg font-lg leading-none tracking-wide  md:text-xl lg:text-xl text-white">
            SALE OFFER 20% OFF THIS WEEK
          </div>
          <h1 className="mb-2 text-2xl font-semibold leading-none tracking-wide  md:text-4xl lg:text-5xl text-white ">
            Footwear Trend 2024
          </h1>
          <Link to="/products">
            <div
              className="mt-1 relative inline-block text-lg group cursor-pointer w-fit"
              onClick={() => handleRouteChangeClick("/products", dispatch)}
            >
              <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-[#ed4f7a]"></span>
                <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                <span className="relative flex justify-center items-center text-white uppercase font-bold tracking-wider">
                  Shop Now
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </span>
              </span>
              <span
                className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                data-rounded="rounded-lg"
              ></span>
            </div>
          </Link>
        </div>
        <img
          src={HeroImage}
          alt={"Brand"}
          className="h-full w-full object-cover brightness-75"
        />
      </div>
      <div className="w-1/2 h-full ">
        <div>
          <ImageCarousel images={UpperCarouselImages} />
        </div>
        <div className="-mt-[7px]">
          <ImageCarousel images={LowerCarouselImages} />
        </div>
      </div>
    </div>
  );
};

export default HeroImages;
