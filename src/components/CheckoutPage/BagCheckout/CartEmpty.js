import React from 'react'
import Button from '../../Button';

const CartEmpty = () => {
  return (
    <div className="flex pt-20 items-center flex-col  ">
      <div className="h-40 w-36 mb-6">
        <img src="./emptyBag.png" alt="bag-items" className="h-full w-full" />
      </div>

      <div className="text-xl font-semibold mb-2">Hey, it feels so light!</div>
      <div className="text-sm mb-10">
        There is nothing in your bag, lets add some shoes :)
      </div>
      <Button
        text={"Add items from Shop"}
        route={"/products"}
        needArrow={true}
        arrowDirection={"left"}
      />
    </div>
  );
}

export default CartEmpty