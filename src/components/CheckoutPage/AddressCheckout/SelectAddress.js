import { ArrowLongUpIcon } from "@heroicons/react/20/solid";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Radio } from "@material-tailwind/react";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { backendConfig } from "../../../config";
import { updateSelectedAddressId } from "../../redux/userSlice";
import ButtonCheckout from "../ButtonCheckout";
import AddAddressBtn from "./AddAddressBtn";

const SelectAddress = ({ handleNext, setAddresses, addresses }) => {
  const { selectedAddressId, userInfo } = useSelector(
    (store) => store.userDetails
  );

  const dispatch = useDispatch();

  const deleteAddress = async (addressId) => {
    try {
      const apiUrl = backendConfig.endpoint + "/user/addresses/" + addressId;
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + userInfo.token,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.success === false) throw new Error(data.message);

      setAddresses(data);

      if (data.length > 0) {
        dispatch(updateSelectedAddressId(data[0]._id));
      } else {
        dispatch(updateSelectedAddressId(""));
      }
      toast.success("Deleted the Address Successfully!!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  console.log(selectedAddressId);
  return (
    <div className="w-full  h-full m-5 ">
      <div className="flex  w-full justify-around items-center ">
        <div>
          <div className="font-semibold text-2xl text-blue-gray-600">
            Saved Address
          </div>
        </div>
        <div>
          <AddAddressBtn setAddresses={setAddresses} />
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-y-8 w-1/2 items-center">
        {addresses.map((address) => (
          <div
            key={address._id}
            className="bg-white p-2 flex flex-col gap-x-2 items-start pb-5  capitalize min-h-32 rounded-md w-5/6 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
          >
            <Radio
              defaultChecked={address._id === selectedAddressId}
              onChange={() => {
                dispatch(updateSelectedAddressId(address._id));
              }}
              name="address"
              color="pink"
              label={
                <div className="ml-2">
                  <div className=" text-blue-gray-900 font-semibold">
                    {address.name}
                  </div>
                  <div>
                    <p>
                      {address.address}, {address.locality}
                    </p>
                    <p>
                      {address.city}, {address.state} - {address.pincode}
                    </p>
                  </div>
                  <div>
                    <span>Mobile: </span> <span>{address.mobile}</span>
                  </div>
                </div>
              }
              containerProps={{
                className: "-mt-10",
              }}
            />
            <div className="w-full mt-4 gap-x-4 flex justify-around items-center ">
              <div className="py-1 px-4 rounded-md bg-gray-300 text-blue-gray-700 font-semibold">
                <div className="flex gap-x-2 justify-center items-center">
                  <div className="h-4 w-4">
                    <ArrowLongUpIcon className="h-full w-full" />
                  </div>
                  <span>Deliver here</span>
                </div>
              </div>
              <button
                onClick={() => {
                  deleteAddress(address._id);
                }}
                className=" border p-2 border-blue-gray-700 rounded-md hover:bg-blue-gray-100"
              >
                <TrashIcon className="h-5 w-5 " />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="w-fit px-4">
        <ButtonCheckout text="Continue" callBackFunction={handleNext} />
      </div>
    </div>
  );
};

export default SelectAddress;
