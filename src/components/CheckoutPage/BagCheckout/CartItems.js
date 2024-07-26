import { ClockIcon } from "@heroicons/react/24/outline";
import { ShieldCheckIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { backendConfig } from "../../../config";
import { CartItemsSkeleton } from "../../../Skeleton/CartItemsSkeleton";
import {
  generateCartItemsFrom,
  getCouponsValue,
  getDiscountValue,
  getFreeDeliveryValue,
  getTotalCartValue,
  updateCartOnServer,
} from "../../../utility/CartMethods";
import { updateCartItemsSize } from "../../redux/userSlice";
import ButtonCheckout from "../ButtonCheckout";
import { shortenBrandNameString } from "../../../utility/generalMethods";

const CartItems = ({
  handleNext,
  totalCartValue,
  cartItems,
  setCartItems,
  setTotalCartValue,
}) => {
  const { userInfo, cartItemsSize } = useSelector((store) => store.userDetails);
  const dispatch = useDispatch();
  const discountValue = getDiscountValue(totalCartValue);
  const couponsValue = getCouponsValue(totalCartValue);
  const freeDeliveryValue = cartItems.reduce((total, cartItem) => {
    const itemCost = Number(cartItem.cost);
    const deliveryValue = getFreeDeliveryValue(itemCost);
    return total + deliveryValue;
  }, 0);

  const finalTotalCartValue =
    totalCartValue - (discountValue + couponsValue + freeDeliveryValue);

  const handleItemQuantity = async (productId, qty) => {
    const cartData = await updateCartOnServer(productId, qty, userInfo.token);
    const productsApi = backendConfig.endpoint + "/products";
    const response = await fetch(productsApi);
    const products = await response.json();
    const formattedCartItems = generateCartItemsFrom(cartData, products);
    setCartItems(formattedCartItems);
    setTotalCartValue(getTotalCartValue(formattedCartItems));
    if (formattedCartItems.length < cartItemsSize) {
      dispatch(updateCartItemsSize(formattedCartItems.length));
    }
  };

  const calculateDiscount = (originalPrice, discountedPrice) => {
    return Math.round(
      ((originalPrice - discountedPrice) / originalPrice) * 100
    );
  };

  const getFutureDate = (itemPrice) => {
    let daysToAdd = Math.floor(itemPrice / 400);
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + daysToAdd);
    return currentDate.toDateString();
  };

  return (
    <div className="grid grid-cols-10">
      <div className="col-span-6 h-fit flex flex-col gap-y-8 py-6 bg-white px-4 mb-5 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        {Boolean(cartItems.length) ? (
          cartItems.map((cartItem) => (
            <div
              className="flex gap-x-5 h-44 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
              key={cartItem._id + " cart"}
            >
              <div className="h-full w-[25%] bg-gray-200 ">
                <img
                  className="h-full w-full object-cover"
                  src={cartItem.image}
                  alt={cartItem.name}
                />
              </div>
              <div className=" w-[75%] py-2 flex justify-between">
                <div className="flex flex-col gap-y-[2px] w-[55%] ">
                  <p className="font-bold text-md text-[#282c3f]">
                    {cartItem.brand}
                  </p>
                  <p className="text-md font-sans tracking-wide text-[#282c3f]">
                    {shortenBrandNameString(cartItem.name, 25)}
                  </p>
                  <p className="text-[#94969f] capitalize text-sm ">
                    category: {cartItem.category}
                  </p>
                  <div className="flex gap-x-2 mt-2 items-end ">
                    <p className="text-sm text-[#878787] line-through">
                      ₹
                      {Number(cartItem.cost) * cartItem.qty +
                        (Number(cartItem.cost) < 1000 ? 499 : 999)}
                    </p>
                    <p className="font-bold tracking-wide">
                      ₹{Number(cartItem.cost) * cartItem.qty}
                    </p>
                    <p className="text-sm text-[#388e3c] font-semibold">
                      {calculateDiscount(
                        Number(cartItem.cost) +
                          (Number(cartItem.cost) < 1000 ? 499 : 999),
                        Number(cartItem.cost)
                      )}
                      % Off
                    </p>
                  </div>
                  <div className="flex gap-x-2 mt-2 mb-2 items-center">
                    <button
                      onClick={() =>
                        handleItemQuantity(cartItem._id, cartItem.qty + 1)
                      }
                      className=" w-7 h-7 rounded-full shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.3),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
                    >
                      +
                    </button>
                    <div className="h-7 text-sm font-semibold w-9 font-sans rounded-md   py-3 flex justify-center items-center shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.3),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
                      {cartItem.qty}
                    </div>
                    <button
                      className=" w-7 h-7 rounded-full shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.3),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
                      onClick={() =>
                        handleItemQuantity(cartItem._id, cartItem.qty - 1)
                      }
                    >
                      -
                    </button>
                  </div>
                </div>

                <div className="w-[45%] text-sm mx-3 py-1 flex flex-col items-end ">
                  <p>
                    Delivery by{" "}
                    <span className="font-semibold">
                      {getFutureDate(Number(cartItem.cost))}
                    </span>{" "}
                  </p>
                  <span className="mr-2 mt-1">
                    <span className="line-through text-[#878787]">
                      ₹{getFreeDeliveryValue(Number(cartItem.cost))}
                    </span>
                    <span className="text-[#388e3c] font-semibold ml-1">
                      Free
                    </span>
                  </span>
                  <p className="text-xs flex gap-x-1 mt-2 items-center justify-end">
                    <ClockIcon className="h-4 w-4" />
                    <span className="font-semibold">14 days</span>{" "}
                    <span className="text-[#878787]">return available</span>
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col gap-y-5">
            {[...Array(cartItemsSize <= 2 ? cartItemsSize : 3).keys()].map(
              (_, index) => (
                <CartItemsSkeleton key={"cartSkeleton " + index} />
              )
            )}
          </div>
        )}
      </div>
      <div className="col-span-4 mx-5">
        <div className="bg-white py-4 px-6 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
          <div className="text-lg font-semibold text-gray-700 uppercase font-serif tracking-wide">
            Price Details
          </div>
          <hr className="h-px border-0 bg-gray-300 my-2" />
          <div className="flex flex-col gap-y-4">
            <div className="flex justify-between">
              <div>
                Price ({cartItems.length}
                {cartItems.length === 1 ? " item" : " items"})
              </div>
              <div className="font-semibold">
                ₹{totalCartValue ? totalCartValue : 0}
              </div>
            </div>
            <div className="flex justify-between">
              <div>Platform Discount</div>
              <div className="text-[#388e3c]">
                - ₹{totalCartValue ? discountValue : 0}
              </div>
            </div>
            <div className="flex justify-between">
              <div>Coupons for you</div>
              <div className="text-[#388e3c]">
                - ₹{totalCartValue ? couponsValue : 0}
              </div>
            </div>
            <div className="flex justify-between">
              <div>Delivery Charges</div>
              <div className="text-[#388e3c] flex gap-x-2">
                <s className="text-[#717478]">
                  ₹{totalCartValue ? freeDeliveryValue : 0}
                </s>
                <span>Free</span>
              </div>
            </div>
          </div>
          <hr className="h-px border-0 bg-gray-300 my-4" />
          <div className="flex justify-between text-lg font-semibold">
            <div>Total Amount</div>
            <div>₹{totalCartValue ? finalTotalCartValue : 0}</div>
          </div>
          <hr className="h-px border-0 bg-gray-300 mt-4 mb-2 " />
          <div className="text-[#388e3c] font-semibold text-md">
            You will save ₹
            {totalCartValue
              ? freeDeliveryValue + couponsValue + discountValue
              : 0}{" "}
            on this order
          </div>
        </div>

        <div className="mt-7">
          <ButtonCheckout text="Place Order" callBackFunction={handleNext} />
        </div>

        <div className="flex items-center py-2 px-4 text-gray-600 gap-x-2 mt-2">
          <div className="h-11 w-11 ">
            <ShieldCheckIcon className="h-full w-full" />
          </div>
          <p className="font-bold text-sm">
            Safe and Secure Payments. Easy returns. 100% Authentic products.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
