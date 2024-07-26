import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { handleRouteChangeClick } from "./updateRouteInStore";

const Button = ({ text, route, needArrow, arrowDirection }) => {
  const dispatch = useDispatch();

  return (
    <Link to={route}>
      <div
        onClick={() => handleRouteChangeClick(route, dispatch)}
        className="rounded px-4 py-2 overflow-hidden group bg-[#ed4f7a] relative hover:bg-gradient-to-r hover:from-red-600 hover:to-red-500 text-white hover:ring-2 hover:ring-offset-2 hover:ring-red-500 transition-all ease-out duration-300"
      >
        <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-30 rotate-12 group-hover:-translate-x-40 ease"></span>
        <span className="relative tracking-wider font-medium flex justify-center items-center gap-x-2">
          {needArrow && arrowDirection === "left" && (
            <svg
              className="w-3.5 h-3.5 rotate-180"
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
          )}
          {text}
          {needArrow && arrowDirection === "right" && (
            <svg
              className="w-3.5 h-3.5 "
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
          )}
        </span>
      </div>
    </Link>
  );
};

export default Button;
