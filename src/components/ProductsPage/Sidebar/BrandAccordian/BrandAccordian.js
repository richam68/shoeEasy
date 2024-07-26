import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { MEN_BRANDS, WOMEN_BRANDS } from "../../../../utility/brands";
import {
  updateBrandAccordianState,
  updateBrandFilter,
  updateCurrentPaginationPage,
} from "../../../redux/filterSlice";
import CheckBoxLabel from "./CheckBoxLabel";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-4 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

export function BrandAccordian() {
  const dispatch = useDispatch();
  const { brandFilter, brandAccordianState } = useSelector(
    (store) => store.productFilter
  );

   const handleBrandClick = (brand) => {
     dispatch(updateBrandFilter(brand));
      dispatch(updateCurrentPaginationPage(1));
   };

  return (
    <>
      <Accordion
        open={brandAccordianState[0]}
        icon={<Icon id={1} open={brandAccordianState[0] && 1} />}
      >
        <AccordionHeader
          className="text-sm font-bold"
          onClick={() =>
            dispatch(updateBrandAccordianState([0, !brandAccordianState[0]]))
          }
        >
          Men
        </AccordionHeader>
        <AccordionBody>
          <div className="mt-1 flex flex-col">
            {MEN_BRANDS.map((brand) => (
              <CheckBoxLabel
                key={brand}
                label={brand}
                isTrue={brandFilter.indexOf(brand) !== -1}
                handleBrandCheckClick={handleBrandClick}
              />
            ))}
          </div>
        </AccordionBody>
      </Accordion>
      <Accordion
        className="mt-3"
        open={brandAccordianState[1]}
        icon={<Icon id={2} open={brandAccordianState[1] && 2} />}
      >
        <AccordionHeader
          className="text-sm font-bold"
          onClick={() =>
            dispatch(updateBrandAccordianState([1, !brandAccordianState[1]]))
          }
        >
          Women
        </AccordionHeader>
        <AccordionBody>
          <div className="className=mt-1 flex flex-col">
            {WOMEN_BRANDS.map((brand) => (
              <CheckBoxLabel
                key={brand}
                label={brand}
                isTrue={brandFilter.indexOf(brand) !== -1}
                handleBrandCheckClick={handleBrandClick}
              />
            ))}
          </div>
        </AccordionBody>
      </Accordion>
    </>
  );
}
