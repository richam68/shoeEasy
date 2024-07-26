import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { backendConfig } from "../../../config";
import AddressSkeleton from "../../../Skeleton/AddressSkeleton";
import { updateSelectedAddressId } from "../../redux/userSlice";
import NoAddress from "./NoAddress";
import PincodeValidate from "./PincodeValidate";
import SelectAddress from "./SelectAddress";

const AddressCheckout = ({ handleNext }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.userDetails.userInfo);
  const [addresses, setAddresses] = useState(undefined);

  useEffect(() => {
    const fetchUserAddress = async () => {
      try {
        const response = await fetch(
          backendConfig.endpoint + "/user/addresses",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        const data = await response.json();
        if (data.success === false) throw new Error(data.message);

        setAddresses(data);

        if (data.length > 0) {
          dispatch(updateSelectedAddressId(data[0]._id));
        } else {
          dispatch(updateSelectedAddressId(""));
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchUserAddress();
  }, [token, dispatch]);

  console.log(addresses);

  return (
    <div className="mt-5 mx-5 ">
      <div className="w-full flex justify-center my-4 min-h-10">
        <PincodeValidate className />
      </div>
      <div className="h-[2px] w-full bg-blue-gray-200 my-4"></div>
      {addresses === undefined ? (
        <div className="my-10 ml-10">
          {[...Array(2).keys()].map((_, index) => (
            <div
              key={"Address " + index}
              className="py-4 my-4 pl-4 pr-8 bg-white w-fit rounded-lg shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
            >
              <AddressSkeleton />
            </div>
          ))}
        </div>
      ) : Boolean(addresses.length) ? (
        <SelectAddress
          handleNext={handleNext}
          addresses={addresses}
          setAddresses={setAddresses}
        />
      ) : (
        <div className="mt-10">
          <NoAddress setAddresses={setAddresses} />
        </div>
      )}
    </div>
  );
};

export default AddressCheckout;
