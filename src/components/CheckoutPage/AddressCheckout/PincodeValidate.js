import { Spinner } from "@material-tailwind/react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const PincodeValidate = () => {
  const [pincode, setPincode] = useState("");
  const [pincodeCheckLoader, setPincodeCheckLoader] = useState(false);
  const [resultantCity, setResultantCity] = useState(undefined);

  const handlePincodeCheck = (e) => {
    if (e.target.value.length <= 6) {
      setResultantCity(undefined);
      setPincode(e.target.value);
    }
  };

  const handlePincodeValidity = async (pincode) => {
    if (pincode.length < 6) {
      toast.error("Please provide valid pincode");
      return;
    }

    setPincodeCheckLoader(true);

    try {
      const response = await fetch(
        "https://api.postalpincode.in/pincode/" + pincode
      );
      const data = await response.json();

      if (Array.isArray(data[0].PostOffice)) {
        if (data[0].PostOffice.length > 1) {
          setResultantCity(data[0].PostOffice[0].Block);
        } else {
          setResultantCity(data[0].PostOffice[0].Name);
        }
      } else {
        setResultantCity(data[0].PostOffice);
      }

      setPincodeCheckLoader(false);
    } catch (error) {
      toast.error(error.message);
      setPincodeCheckLoader(false);
    }
  };

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex gap-x-4 items-center">
        <div className="w-64 ">
          <input
            type="number"
            className="bg-gray-50 border-gray-500 text-gray-900   block w-full py-1 px-2 focus:outline-none rounded-md focus:border-[#ed4f7a] focus:border-2 border border-solid "
            placeholder="Enter Indian Pincode"
            name="pincode"
            value={pincode}
            onChange={handlePincodeCheck}
            onKeyDown={(e) => {
              if (e.key === "Enter") handlePincodeValidity(pincode);
            }}
          />
        </div>
        <div className="w-fit">
          {pincodeCheckLoader ? (
            <Spinner color="pink" />
          ) : (
            <button
              className={
                "font-semibold uppercase tracking-wide " +
                (pincode.length === 6 ? "text-[#ff3f6c]" : "text-[#94969f]")
              }
              onClick={() => handlePincodeValidity(pincode)}
            >
              Check
            </button>
          )}
        </div>
      </div>
      {pincode.length === 6 ? (
        resultantCity === undefined ? null : resultantCity ? (
          <div className="my-1 text-sm ">
            <span className="tracking-wide">Delivery available at:</span>{" "}
            <span className="font-semibold">
              {resultantCity + " " + pincode}
            </span>
          </div>
        ) : (
          <div className="text-sm font-semibold text-red-500 tracking-wider">
            Not a valid pincode
          </div>
        )
      ) : null}
    </div>
  );
};

export default PincodeValidate;
