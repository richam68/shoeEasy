import { Rating, Typography } from "@material-tailwind/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { windowScrollUp } from "../../../utility/ProductPageMethods";
import {
  updateCurrentPaginationPage,
  updateCurrentRating,
} from "../../redux/filterSlice";

const RatingFilter = () => {
  const dispatch = useDispatch();
  const currentRating = useSelector(
    (store) => store.productFilter.currentRating
  );
  const ratings = [4, 3, 2, 1];

  return (
    <div className="min-h-32 pt-8 pb-5 px-6 border-b-2">
      <div className="flex justify-between items-center">
        <Typography
          color="blue-gray"
          className="font-extrabold uppercase text-sm "
        >
          Customer Ratings
        </Typography>
        {currentRating && (
          <div
            onClick={() => {
              windowScrollUp();
              dispatch(updateCurrentRating(null));
              dispatch(updateCurrentPaginationPage(1));
            }}
            className="text-sm hover:bg-pink-50  rounded-full text-[#ed4f7a] px-2 py-1 uppercase font-extrabold cursor-pointer "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.8"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </div>
        )}
      </div>

      <div className="mt-3 gap-[2px] flex flex-col">
        {ratings.map((rating) => (
          <div
            className={
              "flex my-1 items-center gap-1 cursor-pointer hover:text-[#eeba41] " +
              (currentRating === rating ? "text-[#eeba41]" : "text-[#263228]")
            }
            key={rating + "up"}
            onClick={() => {
              windowScrollUp();
              dispatch(updateCurrentRating(rating));
              dispatch(updateCurrentPaginationPage(1));
            }}
          >
            <Rating
              value={rating}
              readonly
              unratedColor="amber"
              ratedColor="amber"
            />
            <div className="font-bold text-sm">& Up</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingFilter;
