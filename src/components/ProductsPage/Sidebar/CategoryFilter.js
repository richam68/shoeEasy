import { Checkbox, Typography } from "@material-tailwind/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCategoryFilter, updateCurrentPaginationPage } from "../../redux/filterSlice";

const CategoryFilter = ({ setFilteredProducts, filteredProducts }) => {
  const dispatch = useDispatch();

  const {categoryFilter} = useSelector(
    (store) => store.productFilter 
  );

  const handleGenderClick = (e) => {
    dispatch(updateCategoryFilter(e.target.value));
     dispatch(updateCurrentPaginationPage(1));
  };

  return (
    <div className="min-h-32 pt-8 pb-5 px-6 border-b-2">
      <Typography
        color="blue-gray"
        className="font-extrabold uppercase text-sm"
      >
        Categories
      </Typography>
      <div className="flex flex-col mt-3">
        <Checkbox
          onChange={handleGenderClick}
          checked={categoryFilter.indexOf("men") !== -1}
          value={"men"}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          }
          color="pink"
          label={
            <div>
              <Typography color="blue-gray" className="font-bold">
                Men
              </Typography>
            </div>
          }
        />

        <Checkbox
          onChange={handleGenderClick}
          value={"women"}
          checked={categoryFilter.indexOf("women") !== -1}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          }
          color="pink"
          label={
            <div>
              <Typography color="blue-gray" className="font-bold">
                Women
              </Typography>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default CategoryFilter;
