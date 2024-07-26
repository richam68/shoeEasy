import toast from "react-hot-toast";
import { backendConfig, couponsArray, discountArray, freeDeliveryArray } from "../config";

export const fetchCart = async (token) => {
  if (!token) return;

  try {
    const response = await fetch(backendConfig.endpoint + "/cart", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const data = await response.json();

    return data;
  } catch (e) {
    if (e.response && e.response.status === 400) {
      toast.error(e.response.data.message);
    } else {
      toast.error(
        "Could not fetch cart details. Check that the backend is running, reachable and returns valid JSON."
      );
    }
    return null;
  }
};

export const updateCartOnServer = async (productId, qty, token) => {
  const cartData = {
    productId: productId,
    qty: qty,
  };

  try {
    const response = await fetch(backendConfig.endpoint + "/cart", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartData),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    toast.error(error.message);
  }
};

export const isItemInCart = (cartItems, productId) => {
  const searchedItem = cartItems.find((item) => item.productId === productId);

  if (searchedItem) return true;
  return false;
};


export const generateCartItemsFrom = (cartData, productsData) => {
  let cartItems = [];

  //could have used map and find method to impelement this. map() on cartData and find() on productsData pwq
  cartData.forEach((cartEle) => {
    productsData.forEach((productEle) => {
      if (cartEle.productId === productEle["_id"]) {
        cartItems.push({
          ...productEle,
          qty: cartEle.qty,
        });
      }
    });
  });
  return cartItems;
};

export const getTotalCartValue = (items) => {
  return items.reduce((acc, item) => {
    return acc + item.qty * Number(item.cost);
  }, 0);
};

export function getDiscountValue(totalCartValue) {

  let index = Math.floor(totalCartValue / 1000);
  if (index >= discountArray.length) {
    index = discountArray.length - 1;
  }
  return discountArray[index];
}

export function getCouponsValue(totalCartValue) {
  let index = Math.floor(totalCartValue / 1000);
  if (index >= couponsArray.length) {
    index = couponsArray.length - 1;
  }
  return couponsArray[index];
}


export function getFreeDeliveryValue(totalCartValue){
  let index = Math.floor(totalCartValue / 1000);
  if (index >= freeDeliveryArray.length) {
    index = freeDeliveryArray.length - 1;
  }
  return freeDeliveryArray[index];
}
