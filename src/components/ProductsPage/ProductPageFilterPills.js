import { Chip } from "@material-tailwind/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateBrandFilter,
  updateCategoryFilter,
  updateCurrentRating,
  updatePriceFilter,
} from "../redux/filterSlice";

const ProductPageFilterPills = () => {
  const dispatch = useDispatch();
  const productFilter = useSelector((store) => store.productFilter);

  const { categoryFilter, brandFilter, finalPrice, currentRating } =
    productFilter;

  return (
    <>
      {categoryFilter.map((filterPill) => (
        <Chip
          key={filterPill + " pill"}
          variant="outlined"
          className="rounded-full"
          color="pink"
          open={true}
          animate={{
            mount: { y: 0 },
            unmount: { y: 20 },
          }}
          value={filterPill}
          onClose={() => {
            dispatch(updateCategoryFilter(filterPill));
          }}
        />
      ))}
      {brandFilter.map((filterPill) => (
        <Chip
          key={filterPill + " pill"}
          variant="outlined"
          className="rounded-full"
          color="pink"
          open={true}
          animate={{
            mount: { y: 0 },
            unmount: { y: 20 },
          }}
          value={filterPill}
          onClose={() => {
            dispatch(updateBrandFilter(filterPill));
          }}
        />
      ))}

      {!(finalPrice[0] === 500 && finalPrice[1] === 7000) && (
        <Chip
          key={"final Price pill"}
          variant="outlined"
          className="rounded-full"
          color="pink"
          open={true}
          animate={{
            mount: { y: 0 },
            unmount: { y: 20 },
          }}
          value={"Rs " + finalPrice[0] + "-" + finalPrice[1]}
          onClose={() => {
            dispatch(updatePriceFilter([500, 7000]));
          }}
        />
      )}

      {currentRating && (
        <Chip
          key={"current Rating pill"}
          variant="outlined"
          className="rounded-full"
          color="pink"
          open={true}
          animate={{
            mount: { y: 0 },
            unmount: { y: 20 },
          }}
          value={currentRating + " star & up"}
          onClose={() => {
            dispatch(updateCurrentRating(null));
          }}
        />
      )}
    </>
  );
};

export default ProductPageFilterPills;
