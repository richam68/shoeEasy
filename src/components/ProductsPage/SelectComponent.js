import { Option, Select } from "@material-tailwind/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSortBy } from "../redux/filterSlice";

const SelectComponent = () => {
  const { sortBy } = useSelector((store) => store.productFilter);
  const dispatch = useDispatch();

  return (
    <div className="w-60">
      <Select
        color="pink"
        size="lg"
        label="Sort By"
        className="text-[#394b53] font-semibold tracking-wide"
        onChange={(value) => dispatch(updateSortBy(value))}
        value={sortBy}
      >
        <Option value="recommended" className="font-semibold">
          Recommended
        </Option>
        <Option value="trending" className="font-semibold">
          Trending
        </Option>
        <Option value="hightolow" className="font-semibold">
          Price: High to Low
        </Option>
        <Option value="lowtohigh" className="font-semibold">
          Price: Low to High
        </Option>
        <Option value="customerrating" className="font-semibold">
          Customer Rating
        </Option>
      </Select>
    </div>
  );
};

export default SelectComponent;
