import { Checkbox, Typography } from "@material-tailwind/react";
import React from "react";

const CheckBoxLabel = ({ label, isTrue, handleBrandCheckClick }) => {
  return (
    <Checkbox
      id={label}
      value={label}
      onChange={() => handleBrandCheckClick(label)}
      color="pink"
      checked={isTrue}
      label={
        <div>
          <Typography color="blue-gray" className="font-bold text-sm">
            {label}
          </Typography>
        </div>
      }
      ripple={true}
    />
  );
};

export default CheckBoxLabel;
