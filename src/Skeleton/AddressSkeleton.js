import { Typography } from "@material-tailwind/react";
import React from "react";

const AddressSkeleton = () => {
  return (
    <div className="h-fit w-fit animate-pulse">
      <Typography
        as="div"
        variant="h1"
        className="mb-4 h-3 w-56 rounded-full bg-gray-300"
      >
        &nbsp;
      </Typography>
      <Typography
        as="div"
        variant="paragraph"
        className="mb-2 h-2 w-96 rounded-full bg-gray-300"
      >
        &nbsp;
      </Typography>
      <Typography
        as="div"
        variant="paragraph"
        className="mb-2 h-2 w-96 rounded-full bg-gray-300"
      >
        &nbsp;
      </Typography>
      <Typography
        as="div"
        variant="paragraph"
        className="mb-2 h-2 w-96 rounded-full bg-gray-300"
      >
        &nbsp;
      </Typography>
      <Typography
        as="div"
        variant="paragraph"
        className="mb-2 h-2 w-96 rounded-full bg-gray-300"
      >
        &nbsp;
      </Typography>
      <Typography
        as="div"
        variant="paragraph"
        className="mt-4 h-4 w-20 rounded-md bg-gray-300"
      >
        &nbsp;
      </Typography>
    </div>
  );
};

export default AddressSkeleton;
