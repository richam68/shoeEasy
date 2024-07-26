import React from "react";
import Button from "../components/Button";
import CryingNami from "./CryingNami";

const ErrorPage = () => {
  return (
    <div className="h-[100vh] w-[100vw] relative">
      <div className="absolute z-50 left-7 top-[35%] flex flex-col items-center justify-center">
        <div className="font-extrabold text-5xl text-gray-100 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)] flex flex-col items-center justify-center">
          <p>Seems like you</p> <p>are lost! </p>
        </div>
        <div className="mt-8 w-fit h-fit text-xl">
          <Button
            text={"get back to SHOP"}
            route={"./products"}
            needArrow={true}
            arrowDirection={"left"}
          />
        </div>
      </div>
      <CryingNami />
    </div>
  );
};

export default ErrorPage;
