import React from "react";
import CartEmpty from "./CartEmpty";
import CartItems from "./CartItems";
import { useSelector } from "react-redux";

const BagCheckout = ({
  handleNext,
  totalCartValue,
  cartItems,
  setCartItems,
  setTotalCartValue,
}) => {
  const { cartItemsSize } = useSelector((store) => store.userDetails);

  return (
    <div className="mt-5 mx-5 ">
      {Boolean(cartItemsSize) ? (
        <CartItems
          handleNext={handleNext}
          totalCartValue={totalCartValue}
          cartItems={cartItems}
          setCartItems={setCartItems}
          setTotalCartValue={setTotalCartValue}
        />
      ) : (
        <CartEmpty />
      )}
    </div>
  );
};

export default BagCheckout;
