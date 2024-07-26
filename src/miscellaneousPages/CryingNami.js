import React from "react";
import { CryingNamiImage } from "../utility/Image_Links";

const CryingNami = () => {
  return (
    <img
      src={CryingNamiImage}
      alt="you're offline"
      className={"h-full w-full object-cover brightness-75"}
    />
  );
};

export default CryingNami;
