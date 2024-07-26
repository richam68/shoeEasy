import React from "react";
import CryingNami from "./CryingNami";

const ProtectedRoute = () => {
  return (
    <div className={"h-[90vh] w-[100vw] relative "}>
      <div className="absolute z-20 left-7 top-[35%] flex flex-col items-center justify-center">
        <div className="font-extrabold text-5xl text-gray-100 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)] flex flex-col gap-y-4 items-center justify-center">
          <p>Oops!! you are </p> <p>not Logged in </p>
        </div>
      </div>
      <CryingNami />
    </div>
  );
};

export default ProtectedRoute;
