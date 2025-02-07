import React, { useEffect, useState } from "react";
import SignUpPage from "./components/SignUpPage";
import SignInPage from "./components/SignInPage";
import { useLocation, useNavigate } from "react-router-dom";
import { pathDefault } from "../../common/path";

const AuthPage = () => {
  const [handle, setHandle] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const styleIcon =
    "rounded-full border-2 p-[12px] hover:cursor-pointer shadow-xl";

  const queryParams = new URLSearchParams(location.search);
  const pageType = queryParams.get("type");

  const toggleForm = () => {
    setHandle(!handle);
    const newType = pageType === "signin" ? "signup" : "signin";
    navigate(`${pathDefault.AuthPage}?type=${newType}`);
  };

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      navigate(pathDefault.homePage);
    }
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full lg:w-3/5 flex h-[650px] shadow-2xl  rounded-xl overflow-hidden">
        {pageType === "signin" ? (
          <div
            className={`w-full lg:w-1/2 relative flex h-full translate-x-0 duration-700 bg-white z-[1] overflow-hidden ${
              handle ? "translate-x-full" : ""
            }`}
          >
            <SignInPage handle={handle} styleIcon={styleIcon} />
          </div>
        ) : (
          <div
            className={`w-full lg:w-1/2 relative flex h-full translate-x-0 duration-700 bg-white z-[1] overflow-hidden ${
              handle ? "translate-x-full" : ""
            }`}
          >
            <SignUpPage
              setHandle={setHandle}
              handle={handle}
              styleIcon={styleIcon}
            />
          </div>
        )}

        <div
          className={`hidden lg:flex h-full w-1/2 duration-700 translate-x-0 bg-primary z-[5] opacity-100 overflow-hidden ${
            handle ? "!-translate-x-full" : ""
          }`}
        >
          <div
            className={`h-full min-w-full flex flex-col justify-center items-center text-center duration-700 opacity-100 ${
              handle ? "opacity-0 -ml-[100%]" : ""
            }`}
          >
            <div className="bg-primary lg:flex hidden justify-center items-center flex-col p-20 space-y-5 text-white">
              <h2 className="font-bold text-3xl ">Welcome Back!</h2>
              <p>Email your personal details and start journey with us</p>
              <button
                type="text"
                onClick={toggleForm}
                className="bg-primary text-white px-14 py-4 rounded-full w-full border border-white font-bold"
              >
                Sign Up
              </button>
            </div>
          </div>
          <div
            className={`h-full min-w-full flex flex-col justify-center items-center text-center duration-700 opacity-100 ${
              handle ? "ml-0" : ""
            }`}
          >
            <div className="bg-primary lg:flex hidden justify-center items-center flex-col p-20 space-y-5 text-white">
              <h2 className="font-bold text-3xl ">Hello, Friend!</h2>
              <p>Email your personal details and start journey with us</p>
              <button
                type="text"
                onClick={toggleForm}
                className="bg-primary text-white px-14 py-4 rounded-full w-full border border-white font-bold"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
