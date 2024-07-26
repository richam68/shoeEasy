import { HeartIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import {
  HeartIcon as HearIconSolid,
  ShoppingBagIcon as ShoppingBagIconSolid,
  StarIcon,
} from "@heroicons/react/24/solid";
import { Tooltip } from "@material-tailwind/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { isItemInCart } from "../../../utility/CartMethods";
import { addToBag } from "../../../utility/ProductPageMethods";
import { updateCartItemsSize } from "../../redux/userSlice";
import { shortenBrandNameString } from "../../../utility/generalMethods";

const ProductCards = ({ product, isLoggedIn, token, cartItems }) => {
  const dispatch = useDispatch();
  const [showAddToCart, setShowAddToCart] = useState(false);
  const [hoverAnimate, setHoverAnimate] = useState(false);
  const [hoverAddToCart, setHoverAddToCart] = useState(false);
  const isItemPresent = isItemInCart(cartItems, product["_id"]);


  const handleAddToBag = async (productId, token) => {
    if (!isLoggedIn) {
      toast.error("Please login to add Products");
      return;
    }
    if (isItemPresent) {
      toast.error("Product already in Bag");
      return;
    }

    const cartItemsSize = await addToBag(productId, token);
    toast.success("Product successfully added");
    dispatch(updateCartItemsSize(cartItemsSize));
  };

  return (
    <div
      onMouseOver={() => setShowAddToCart(true)}
      onMouseOut={() => setShowAddToCart(false)}
      className="w-[15rem] h-[24rem] col-span-3 mt-10 transition-all relative  hover:shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
    >
      {product.trending === "true" && (
        <div>
          <div className=" bg-[#ff3f6c] bg-opacity-80 inline-block absolute top-4 left-0 uppercase text-white text-[10px] font-bold z-10 px-3 py-[6px] leading-none tracking-wider">
            Trending
          </div>
          <div
            style={{
              content: "",
              position: "absolute",
              borderStyle: "solid",
              borderWidth: "11px",
              borderColor:
                "rgba(255, 63, 108, .7) transparent rgba(255, 63, 108, .7) rgba(255, 63, 108, .9)",
              left: "33%",
              width: "0",
              height: "0",
              top: "1rem",
              zIndex: "10",
            }}
          ></div>
        </div>
      )}
      <div
        onMouseOver={() => setHoverAnimate(true)}
        onMouseOut={() => setHoverAnimate(false)}
        className=" w-full h-[80%] relative "
      >
        <div className="h-full w-full overflow-hidden ">
          <Tooltip
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0, y: 25 },
            }}
            content={isItemPresent ? "Added Item" : "Add Item"}
            className="text-[#ed4f7a] border-2 border-[#ed4f7a] px-2 py-1 font-bold tracking-wider bg-white rounded-lg text-sm "
          >
            <div
              className="absolute top-1 right-1 z-30 cursor-pointer bg-white rounded-full p-1 m-1 "
              onClick={() => handleAddToBag(product["_id"], token)}
            >
              {isItemPresent ? (
                <HearIconSolid className="h-6 w-6  text-[#ff3f6c]" />
              ) : (
                <HeartIcon className="h-6 w-6  text-[#ff3f6c]" />
              )}
            </div>
          </Tooltip>
          <img
            src={product.image}
            alt="shoe product"
            className={
              "h-full w-full object-cover transition-all duration-[400ms] filter  ease-out-back" +
              (hoverAnimate && " scale-105")
            }
          />
        </div>
        <div className="absolute bg-[#ffffffcc] px-1 py-1 font-bold text-xs backdrop-blur-2xl bottom-0 flex gap-1 justify-center items-center ml-3 mb-2">
          <div className="flex gap-x-1 ">
            <p>{product.rating}</p>
            <StarIcon className="h-4 w-4 text-[#3f968f]" />
          </div>
          <p>|</p>
          <p>{(product.ratingCount / 1000).toFixed(1) + "k"}</p>
        </div>
        <div
          className={
            "absolute -bottom-7 overflow-hidden flex justify-center bg-white items-center  z-30   w-full transition-all duration-[400ms] ease-in-out-back  " +
            (showAddToCart ? "h-[20%]" : "h-0 ")
          }
        >
          <div
            onMouseOver={() => setHoverAddToCart(true)}
            onMouseOut={() => setHoverAddToCart(false)}
            className={
              "cursor-pointer border w-full mx-3 h-[58%] flex items-center justify-center gap-x-3 " +
              (isItemPresent
                ? "border-[#ff3f6c]"
                : hoverAddToCart
                ? "border-gray-600"
                : "border-gray-300")
            }
            onClick={() => handleAddToBag(product["_id"], token)}
          >
            {isItemPresent ? (
              <ShoppingBagIconSolid className="h-5 w-5 text-[#ff3f6c]" />
            ) : (
              <ShoppingBagIcon className="h-5 w-5" />
            )}
            <div
              className={
                "uppercase text-xs leading-[16px] font-semibold mt-1 " +
                (isItemPresent && "text-[#ff3f6c]")
              }
            >
              {isItemPresent ? "Added" : "Add"} to bag
            </div>
          </div>
        </div>
      </div>
      <div className="mx-3 my-2 flex flex-col">
        <p className="font-bold text-base text-[#282c3f]">{product.brand}</p>
        <p className="text-sm text-[#535766] font-light">
          {shortenBrandNameString(product.name, 22)}
        </p>
        <p className="text-sm font-bold text-[#282c3f]">Rs. {product.cost}</p>
      </div>
    </div>
  );
};

export default ProductCards;
