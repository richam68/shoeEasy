import React from "react";
import Button from "../Button";

const BrandComponent = ({ image }) => {
  return (
    <div className="h-[32vh] w-[38vw] bg-gray-300 flex justify-center items-center relative">
      <div className="absolute top-3 left-4">
        <Button text="Shop now" route={"./products"} needArrow={true} arrowDirection={"right"} />
      </div>

      <img
        src={image}
        alt="shoe-brand"
        className="h-full w-full object-cover"
      />
    </div>
  );
};

export default BrandComponent;
