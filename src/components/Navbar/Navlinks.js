import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { handleRouteChangeClick } from "../updateRouteInStore";

const Navlinks = ({
  route,
  text,
  bubbleRequired = false,
  cartItemsSize = null,
  image = "",
  svg = false,
}) => {
  const dispatch = useDispatch();

  return (
    <>
      <NavLink to={route} exact={"true"}>
        {({ isActive }) => (
          <div
            onClick={() => handleRouteChangeClick(route, dispatch)}
            className="h-7 w-7 relative flex flex-col justify-center mt-2 items-center cursor-pointer"
          >
            {bubbleRequired && cartItemsSize!==null && 
              (cartItemsSize !== 0 ? (
                <div className="h-5 w-5 bg-[#ed4f7a] rounded-full flex items-center justify-center font-extrabold text-white text-[12px] absolute -top-4 -right-2 animate-bounce">
                  {cartItemsSize}
                </div>
              ) : (
                ""
              ))}
            {svg ? (
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-[26px] h-[26px]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
              </div>
            ) : (
              <img
                src={image}
                alt={text + " page"}
                className="h-full w-full object-cover"
              />
            )}

            <div className="text-[12px] mt-[2px] font-semibold">{text}</div>
            {isActive && (
              <div className="border-b-[3px] border-[#ed4f7a] w-[130%]"></div>
            )}
          </div>
        )}
      </NavLink>
    </>
  );
};

export default Navlinks;
