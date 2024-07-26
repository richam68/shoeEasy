import { Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import ReactSlider from "react-slider";
import styled from "styled-components";
import { updateCurrentPaginationPage, updatePriceFilter } from "../../redux/filterSlice";
import { windowScrollUp } from "../../../utility/ProductPageMethods";

const StyledSlider = styled(ReactSlider)`
  width: 100%;
  height: 6px;
`;

const StyledThumb = styled.div`
  font-size: 1px;
  height: 15px;
  line-height: 15px;
  width: 15px;
  text-align: center;
  background-color: #fff;
  margin-top: -5px;
  color: #fff;
  border-width: 1.5px;
  border-color: #ed4f7a;
  border-radius: 50%;
  cursor: grab;
  outline: none;
`;

const Thumb = (props, state) => (
  <StyledThumb {...props}>{state.valueNow}</StyledThumb>
);

const StyledTrack = styled.div`
  top: 0;
  bottom: 0;
  background: ${(props) =>
    props.index === 2 ? "#ddd" : props.index === 1 ? "#ed4f7a" : "#ddd"};
  border-radius: 999px;
`;

const Track = (props, state) => <StyledTrack {...props} index={state.index} />;

const PriceFilter = () => {
  const dispatch = useDispatch();
  const finalPrice = useSelector((store) => store.productFilter.finalPrice);
  const [currentValue, setCurrentValue] = useState([...finalPrice]);
  const [inputValue, setInputValue] = useState([
    finalPrice[0] + "",
    finalPrice[1] + "",
  ]);

  const stringi = JSON.stringify(finalPrice);

  /*this use effect is necessary bcs useState is only initialised when component mounts, 
    but it does not re-initializes the state variable upon re-rendering hence I used useEffect 
    to make sure the values of currentValue and inputValue is always sync to finalPrice
    */
  useEffect(() => {
    setCurrentValue([...finalPrice]);
    setInputValue([finalPrice[0] + "", finalPrice[1] + ""]);
  }, [stringi, finalPrice]);

  const handleInputPrice = (e, idx) => {
    const newArr = [...inputValue];
    if (idx === 0) {
      newArr[0] = e.target.value;
    } else {
      newArr[1] = e.target.value;
    }
    setInputValue(newArr);
  };

  const priceValidateHandler = (e, idx) => {
    const minVal = Number(inputValue[0]);
    const maxVal = Number(inputValue[1]);

    if (idx === 0) {
      let flag = false;
      if (minVal < 500) {
        toast.error("Minimum value cannot be less than 500₹");
        flag = true;
      } else if (minVal > 7000) {
        toast.error("Invalid minimum value!!");
        flag = true;
      } else if (maxVal - minVal < 1500) {
        toast.error("Maintain minimum difference of 1500₹");
        flag = true;
      }
      if (flag) {
        setInputValue((prev) => {
          const res = [...prev];
          res[0] = currentValue[0] + "";
          return res;
        });
        return;
      }
      setCurrentValue((prev) => {
        const res = [...prev];
        res[0] = minVal;
        return res;
      });
    } else {
      let flag = false;
      if (maxVal > 7000) {
        toast.error("Maximum value cannot exceed 7000₹");
        flag = true;
      } else if (maxVal < 500) {
        toast.error("Invalid maximum value!!");
        flag = true;
      } else if (maxVal - minVal < 1500) {
        toast.error("Maintain minimum difference of 1500₹");
        flag = true;
      }
      if (flag) {
        setInputValue((prev) => {
          const res = [...prev];
          res[1] = currentValue[1] + "";
          return res;
        });
        return;
      }

      setCurrentValue((prev) => {
        const res = [...prev];
        res[1] = maxVal;
        return res;
      });
    }
    dispatch(updatePriceFilter([minVal, maxVal]));
     dispatch(updateCurrentPaginationPage(1));
    windowScrollUp();
  };

  const resetPriceValues = () => {
    dispatch(updatePriceFilter([500, 7000]));
    setCurrentValue([500, 7000]);
    setInputValue(["500", "7000"]);
     dispatch(updateCurrentPaginationPage(1));
  };

  return (
    <div className="min-h-32 pt-8 pb-6 px-4 border-b-2">
      <div className="flex justify-between  items-center">
        <Typography
          color="blue-gray"
          className="font-extrabold uppercase text-sm px-2"
        >
          Price
        </Typography>
        {finalPrice[0] !== 500 || finalPrice[1] !== 7000 ? (
          <div
            onClick={() => {
              resetPriceValues();
              windowScrollUp();
            }}
            className="text-sm hover:bg-pink-50 rounded-full text-[#ed4f7a] px-2 py-1 uppercase font-extrabold cursor-pointer "
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
        ) : (
          ""
        )}
      </div>

      <div className="mt-8 flex flex-col">
        <StyledSlider
          defaultValue={[500, 7000]}
          minDistance={1500}
          max={7000}
          min={500}
          value={[currentValue[0], currentValue[1]]}
          onAfterChange={(val) => {
            windowScrollUp();
             dispatch(updateCurrentPaginationPage(1));
            if (val[0] === 500 && val[1] === 7000) {
              dispatch(updatePriceFilter([500, 7000]));
              return;
            }
            dispatch(updatePriceFilter(currentValue));
          }}
          onChange={(val) => {
            setCurrentValue(val);
            setInputValue([val[0] + "", val[1] + ""]);
          }}
          renderTrack={Track}
          renderThumb={Thumb}
        />
      </div>

      <div className="mt-6 flex py-2 items-center text-[#263238] justify-between">
        <div>
          <span className="text-sm font-bold mr-2 ">Min ₹</span>
          <input
            type="number"
            value={inputValue[0]}
            className="border-2 text-sm font-semibold  w-16 rounded-lg px-3 py-1 focus:shadow-outline focus:outline-pink-300"
            onChange={(e) => handleInputPrice(e, 0)}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.target.blur();
            }}
            onBlur={(e) => priceValidateHandler(e, 0)}
          />
        </div>
        <div>-</div>
        <div>
          <span className="text-sm font-bold mr-2 ">Max ₹</span>
          <input
            type="number"
            value={inputValue[1]}
            className="border-2 text-sm font-semibold  w-16 rounded-lg px-3 py-1 focus:shadow-outline focus:outline-pink-300"
            onChange={(e) => handleInputPrice(e, 1)}
            onBlur={(e) => priceValidateHandler(e, 1)}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.target.blur();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;
