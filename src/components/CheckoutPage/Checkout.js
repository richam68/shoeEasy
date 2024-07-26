import {
  BanknotesIcon,
  PencilSquareIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";
import { Step, Stepper, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { backendConfig } from "../../config";
import ProtectedRoute from "../../miscellaneousPages/ProtectedRoute";
import { PAYMENT_BRANDS } from "../../utility/brands";
import {
  fetchCart,
  generateCartItemsFrom,
  getTotalCartValue,
} from "../../utility/CartMethods";
import { clearUserDetails } from "../redux/userSlice";
import AddressCheckout from "./AddressCheckout/AddressCheckout";
import BagCheckout from "./BagCheckout/BagCheckout";
import PaymentCheckout from "./PaymentCheckout";

const Checkout = () => {
  const { userInfo } = useSelector((store) => store.userDetails);
  const isLoggedIn = useSelector((store) => store.userDetails.isLoggedIn);
  const [activeStep, setActiveStep] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [totalCartValue, setTotalCartValue] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsApi = backendConfig.endpoint + "/products";
        const response = await fetch(productsApi);
        const products = await response.json();

        fetchCart(userInfo.token)
          .then((data) => {
            const formattedCartItems = generateCartItemsFrom(data, products);
            setCartItems(formattedCartItems);
            setTotalCartValue(getTotalCartValue(formattedCartItems));
          })
          .catch((e) => {
            dispatch(clearUserDetails());
            toast.error("Please login again to proceed");
          });
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchProducts();
  }, [userInfo.token, dispatch]);

  if (!isLoggedIn) {
    return <ProtectedRoute />;
  }

  const handleNext = () => setActiveStep((cur) => cur + 1);


  return (
    <div className="w-full relative px-24 py-4 mt-5 flex flex-col items-center">
      <Stepper activeStep={activeStep} className="w-[50vw]">
        <Step className="cursor-pointer " onClick={() => setActiveStep(0)}>
          <ShoppingBagIcon className="h-5 w-5" />
          <div className="absolute -bottom-[2rem] w-max text-center">
            <Typography
              variant="h6"
              color={activeStep === 0 ? "blue-gray" : "gray"}
            >
              Bag
            </Typography>
          </div>
        </Step>

        <Step
          className="cursor-pointer "
          onClick={() => {
            if (activeStep !== 0) {
              setActiveStep(1);
            } else {
              toast.error("Place an order to continue!!");
            }
          }}
        >
          <PencilSquareIcon className="h-5 w-5" />
          <div className="absolute -bottom-[2rem] w-max text-center">
            <Typography
              variant="h6"
              color={activeStep === 1 ? "blue-gray" : "gray"}
            >
              Address
            </Typography>
          </div>
        </Step>

        <Step
          className="cursor-pointer "
          onClick={() => {
            if (activeStep === 0) {
              toast.error("Place an order to continue!!");
            } else if (activeStep === 1) {
              toast.error("Set Address to continue!!");
            }
          }}
        >
          <BanknotesIcon className="h-5 w-5" />
          <div className="absolute -bottom-[2rem] w-max text-center">
            <Typography
              variant="h6"
              color={activeStep === 2 ? "blue-gray" : "gray"}
            >
              Payment
            </Typography>
          </div>
        </Step>
      </Stepper>

      {activeStep === 0 && (
        <div className="mt-16 z-30 min-h-[65vh] bg-[#f1f3f6] w-[80vw] text-black border-2">
          <BagCheckout
            handleNext={handleNext}
            totalCartValue={totalCartValue}
            cartItems={cartItems}
            setCartItems={setCartItems}
            setTotalCartValue={setTotalCartValue}
          />
        </div>
      )}

      {activeStep === 1 && (
        <div className="mt-16 z-30 min-h-[65vh] bg-[#f1f3f6]  w-[80vw] text-black border-2">
          <AddressCheckout handleNext={handleNext} />
        </div>
      )}

      {activeStep === 2 && (
        <div className="mt-16 z-30 min-h-[65vh] bg-[#f1f3f6]  w-[80vw] text-black border-2">
          <PaymentCheckout />
        </div>
      )}

      <div className="flex gap-4 mt-5 w-[80vw] flex-wrap">
        {PAYMENT_BRANDS.map((brand, index) => {
          return (
            <div className="h-10 w-16 " key={brand + index}>
              <img
                src={brand}
                alt={"payment-gateway-" + index}
                className="h-full w-full object-cover"
              ></img>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Checkout;
