import React from "react";

const ButtonCheckout = ({ text, callBackFunction }) => {
  return (
    <div
      onClick={() => callBackFunction()}
      className="my-2 cursor-pointer uppercase rounded-lg w-full "
    >
      <div className="rounded px-4 py-2  overflow-hidden group bg-[#ed4f7a] relative hover:bg-gradient-to-r hover:from-red-600 hover:to-red-500 text-white hover:ring-2 hover:ring-offset-2 hover:ring-red-500 transition-all ease-out duration-300">
        <span className="absolute right-0 w- h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-30 rotate-12 group-hover:-translate-x-40 ease"></span>

        <span className="relative tracking-wider font-normal flex justify-center items-center gap-x-2">
          {text}
        </span>
      </div>
    </div>
  );
};

export default ButtonCheckout;
