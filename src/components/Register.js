import { Spinner } from "@material-tailwind/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { backendConfig } from "../config";
import { RegisterHeroImage } from "../utility/Image_Links";
import { handleRouteChangeClick } from "./updateRouteInStore";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  const register = async (userData) => {
    setLoading(true);

    if (!validateUserData(userData)) {
      setLoading(false);
      return;
    }

    try {
      const registerUrl = backendConfig.endpoint + "/auth/register";
      const registerData = {
        username: userData.username,
        password: userData.password,
      };

      const response = await fetch(registerUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      toast.success("Registered Successfully");
      setLoading(false);
      handleRouteChangeClick("/login", dispatch);
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const handleUserData = (e) => {
    setUserData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const validateUserData = (userData) => {
    if (!userData) {
      toast.error("Please fill the details!");
      return false;
    }

    const { username, password, confirmPassword } = userData;
    if (!username || !password) {
      if (!username) toast.error("Username cannot be empty!");
      else if (!password) toast.error("Password cannot be empty!");
      return false;
    }

    if (password.length < 6) {
      toast.error("Password must contain 6 characters");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Oops! Passwords do not match");
      return false;
    }

    return true;
  };

  return (
    <div
      style={{ backgroundImage: `url(${RegisterHeroImage})` }}
      className="h-[120vh] w-[100vw] bg-no-repeat bg-cover bg-center flex justify-end "
    >
      <div className="h-[50%] mt-28 w-1/3 mr-10 flex flex-col gap-6 pl-7 pt-10 rounded-2xl p-4 bg-white shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
        <h1 className="mb-1 font-semibold leading-none tracking-wide text-4xl text-[#ed4f7a] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.15)]">
          Register
        </h1>
        <input
          type="text"
          className="bg-gray-50 font-medium border-gray-500 text-gray-900  block w-11/12 p-3 focus:outline-none rounded-md hover:shadow-[4.0px_4.0px_4.0px_rgba(0,0,0,0.38)]  focus:border-[#ed4f7a] focus:border-2 border border-solid "
          placeholder="Username"
          name="username"
          onChange={(e) => handleUserData(e)}
        />
        <input
          type="password"
          className="bg-gray-50 border-gray-500 text-gray-900  block w-11/12 p-3 focus:outline-none rounded-md hover:shadow-[4.0px_4.0px_4.0px_rgba(0,0,0,0.38)] focus:border-[#ed4f7a] focus:border-2 border border-solid "
          placeholder="Enter a password with minimum 6 characters"
          name="password"
          onChange={(e) => handleUserData(e)}
        />
        <input
          type="password"
          className="bg-gray-50 border-gray-500 text-gray-900  block w-11/12 p-3 focus:outline-none rounded-md hover:shadow-[4.0px_4.0px_4.0px_rgba(0,0,0,0.38)] focus:border-[#ed4f7a] focus:border-2 border border-solid "
          placeholder="Confirm Password"
          name="confirmPassword"
          onChange={(e) => handleUserData(e)}
        />
        <div
          onClick={() => {
            register(userData);
          }}
          className="my-2 cursor-pointer uppercase rounded-lg w-11/12 shadow-[4.0px_4.0px_4.0px_rgba(0,0,0,0.38)]"
        >
          <div className="rounded px-4 py-2 overflow-hidden group bg-[#ed4f7a] relative hover:bg-gradient-to-r hover:from-red-600 hover:to-red-500 text-white hover:ring-2 hover:ring-offset-2 hover:ring-red-500 transition-all ease-out duration-300">
            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-30 rotate-12 group-hover:-translate-x-40 ease"></span>

            {loading ? (
              <div className="w-full flex justify-center">
                <Spinner className="h-6 w-6" color="red" />
              </div>
            ) : (
              <span className="relative tracking-wider font-medium flex justify-center items-center gap-x-2">
                Register Now
              </span>
            )}
          </div>
        </div>
        <div className="text-lg font-medium leading-none tracking-wide text-gray-900  mt-2 ">
          Already have an Account?{" "}
          <span className="text-[#ed4f7a] font-extrabold cursor-pointer">
            <Link
              to="/login"
              onClick={() => handleRouteChangeClick("/login", dispatch)}
            >
              Login Here
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
