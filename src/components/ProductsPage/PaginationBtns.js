import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { Button, IconButton } from "@material-tailwind/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPaginationPage } from "../redux/filterSlice";
import { windowScrollUp } from "../../utility/ProductPageMethods";

function PaginationBtns({ totalButtons }) {
  const { currentPaginationPage } = useSelector((store) => store.productFilter);
  const dispatch = useDispatch();


  useEffect(() => {
    windowScrollUp();
  }, [currentPaginationPage]);

  const getItemProps = (index) => ({
    variant: currentPaginationPage === index ? "gradient" : "text",
    color: "gray",
    onClick: () => {
      dispatch(updateCurrentPaginationPage(index));
      windowScrollUp();
    },
  });

  const next = () => {
    if (currentPaginationPage === totalButtons) return;

    dispatch(updateCurrentPaginationPage(currentPaginationPage + 1));
  };

  const prev = () => {
    if (currentPaginationPage === 1) return;
    dispatch(updateCurrentPaginationPage(currentPaginationPage - 1));
  };

  return (
    <div className="flex items-center gap-16  w-full justify-center">
      <Button
        variant="text"
        className="flex items-center gap-2 border border-gray-400"
        onClick={prev}
        disabled={currentPaginationPage === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-8">
        {[...Array(totalButtons).keys()].map((_, index) => (
          <IconButton
            {...getItemProps(index + 1)}
            key={"pagination btn " + index + 1}
          >
            {index + 1}
          </IconButton>
        ))}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2 border border-gray-400 "
        onClick={next}
        disabled={currentPaginationPage === totalButtons}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default PaginationBtns;
