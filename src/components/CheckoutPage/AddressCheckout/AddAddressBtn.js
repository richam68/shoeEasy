import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Dialog,
  Input,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { backendConfig } from "../../../config";

const AddAddressBtn = ({ setAddresses }) => {
  const { token } = useSelector((store) => store.userDetails.userInfo);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const [validPincodeChecker, setValidPincodeChecker] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    pincode: "",
    address: "",
    locality: "",
    city: "",
    state: "",
  });

  const fetchPincodeDetails = async (name, value) => {
    try {
      const response = await fetch(
        "https://api.postalpincode.in/pincode/" + value
      );
      const data = await response.json();
      if (Array.isArray(data[0].PostOffice)) {
        if (data[0].PostOffice.length > 1) {
          setFormData((prevData) => ({
            ...prevData,
            city: data[0].PostOffice[0].Block,
            state: data[0].PostOffice[0].State,
          }));
        } else {
          setFormData((prevData) => ({
            ...prevData,
            city: data[0].PostOffice[0].Name,
            state: data[0].PostOffice[0].State,
          }));
        }
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
        setValidPincodeChecker(false);
      }
    } catch (error) {
      setValidPincodeChecker(true);
      toast.error(error.message);
      return null;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobile" && value.length > 10) {
      return;
    }

    if (name === "pincode") {
      if (value.length > 6) return;

      setValidPincodeChecker(true);

      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));

      setFormData((prevData) => ({
        ...prevData,
        city: "",
        state: "",
      }));

      if (value.length === 6) fetchPincodeDetails(name, value);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const addressSubmitHandler = async () => {
    // meaning pincode was not correct
    if (!validPincodeChecker) return;

    if (formData.mobile.length !== 10) {
      handleOpen();
      toast.error("10 digits mobile number is required!!");
      return;
    }

    if (
      formData.name &&
      formData.mobile &&
      formData.mobile.length === 10 &&
      formData.pincode &&
      formData.address &&
      formData.locality &&
      formData.city &&
      formData.state
    ) {
      try {
        const addAddressApiUrl = backendConfig.endpoint + "/user/addresses";
        const response = await fetch(addAddressApiUrl, {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (data.success === false) throw new Error(data.message);
        toast.success("Added New Address Successfully!!");
        setAddresses(data);
        handleOpen();
      } catch (error) {
        handleOpen();
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        className="flex justify-center items-center"
        color="pink"
      >
        <div className="h-5 w-5 mr-1">
          <svg
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path fill="#ffffff" d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" />
          </svg>
        </div>
        Add New Address
      </Button>
      <Dialog
        size="md"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              New Address
            </Typography>
            <div>
              <div>
                <Typography
                  className="mb-3 font-bold uppercase text-sm"
                  variant="h6"
                >
                  Contact Details
                </Typography>
                <div className="flex flex-col gap-y-3">
                  <Input
                    label="Name"
                    size="lg"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    type="number"
                    label="Mobile No"
                    size="lg"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="mt-5">
                <Typography
                  className="mb-3 font-bold uppercase text-sm"
                  variant="h6"
                >
                  Address
                </Typography>
                <div className="flex flex-col gap-y-3">
                  <div>
                    <Input
                      type="number"
                      label="6 digit Pincode"
                      size="lg"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      required
                    />
                    {!validPincodeChecker && (
                      <Typography
                        variant="small"
                        color="red"
                        className="mt-2 flex items-center gap-1 font-normal"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="-mt-px h-4 w-4"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Invalid pincode
                      </Typography>
                    )}
                  </div>
                  <Input
                    label="Address (House No, Building, Area)"
                    size="lg"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    label="Locality / Town"
                    size="lg"
                    name="locality"
                    value={formData.locality}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    disabled
                    label="City / District"
                    size="lg"
                    name="city"
                    className="font-semibold text-blue-gray-700"
                    value={formData.city}
                    onChange={handleChange}
                  />
                  <Input
                    disabled
                    label="State"
                    size="lg"
                    name="state"
                    className="font-semibold  text-blue-gray-700"
                    value={formData.state}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              variant="gradient"
              color="pink"
              onClick={() => {
                addressSubmitHandler();
              }}
              fullWidth
            >
              Add Address
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
};

export default AddAddressBtn;
