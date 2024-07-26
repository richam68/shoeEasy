import React from "react";
import CryingNami from "./CryingNami";

const OfflinePage = ({ onlineStatus }) => {
  return (
    <div
      className={
        "h-[90vh] w-[100vw] relative " + (onlineStatus ? "hidden" : "block")
      }
    >
      <div className="absolute z-20 left-2 top-[37%] flex flex-col items-center justify-center">
        <div className="font-extrabold text-5xl text-gray-100 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)] flex flex-col items-center justify-center">
          <p>Oops!! Looks like </p> <p>you are offline </p>
        </div>
      </div>
      <CryingNami />
    </div>
  );
};

export default OfflinePage;
