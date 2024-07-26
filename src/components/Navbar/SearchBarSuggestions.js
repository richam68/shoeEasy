import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateSearchQueryText } from "../redux/userSlice";
import { updateCurrentPaginationPage } from "../redux/filterSlice";

const SearchBarSuggestions = ({
  setCurrentSearchedText,
  searchedSuggestionsArray,
  navigateToProductsPage,
}) => {
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchedSuggestionsArray[selectedSuggestionIndex]) {
      setCurrentSearchedText({
        callSuggestionApi: false,
        text: searchedSuggestionsArray[selectedSuggestionIndex],
      });
    }
  }, [
    selectedSuggestionIndex,
    setCurrentSearchedText,
    searchedSuggestionsArray,
  ]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedSuggestionIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : searchedSuggestionsArray.length - 1
        );
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedSuggestionIndex((prevIndex) =>
          prevIndex < searchedSuggestionsArray.length - 1 ? prevIndex + 1 : 0
        );
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    selectedSuggestionIndex,
    searchedSuggestionsArray,
    navigateToProductsPage,
  ]);

  return (
    <div className="w-[34%] min-h-[24rem] bg-white absolute top-16 left-[21rem] rounded-2xl overflow-hidden shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
      <ul className="mt-2">
        {searchedSuggestionsArray.map((list, index) => (
          <li
            key={list + "" + index}
            className={`py-1 mt-1 border-b text-sm px-4 flex gap-x-5 items-center cursor-pointer ${
              index === selectedSuggestionIndex
                ? "bg-[#ed4f7a] text-white font-bold"
                : "hover:bg-[#ed4f7a] hover:text-white hover:font-bold"
            }`}
            onMouseDown={() => {
              navigateToProductsPage();
              setCurrentSearchedText({
                callSuggestionApi: false,
                text: list,
              });
              dispatch(updateSearchQueryText(list));
               dispatch(updateCurrentPaginationPage(1));
            }}
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
            <span className="text-base">{list}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBarSuggestions;
