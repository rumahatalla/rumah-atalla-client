/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import CustomToast from "../components/CustomToast";
import Button from "../components/Button";
import Title2 from "../components/Title2";

export default function ForgetPassword() {
  const DBURL = import.meta.env.VITE_APP_DB_URL;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSendEmail = async () => {
    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);
    await axios
      .post(DBURL + "/users/forget-password", {
        email: email,
      })
      .then((res1) => {
        toast.custom((t) => (
          <CustomToast t={t} message="Email sent!" type="success" />
        ));
        setIsSuccess(true);
      })
      .catch((error) => {
        setIsError(true);
        toast.custom((t) => (
          <CustomToast t={t} message="Error sending email" type="failed" />
        ));
      });
    setIsLoading(false);
  };

  return (
    <>
      <div className="overflow-hidden relative bg-section-dark h-screen w-screen flex items-center justify-center">
        <img
          src="/LandingFashion2.jpg"
          className="absolute w-full opacity-[0.15] h-full object-cover object-center"
          alt=""
        />
        <div className="flex z-[10] relative overflow-hidden items-start bg-section h-[90%] rounded-2xl w-[90%] lg:w-[35%] px-5 sm:px-[15vw] lg:px-[3vw] py-12 shadow-xl flex-col">
          {/* LOGO */}
          <div className="flex w-full h-20 -ml-4 justify-center drop-shadow items-center ">
            <img
              src="/LogoBlack.png"
              className="pointer-events-none w-[5.5rem] h-[5.5rem] aspect-square"
              alt="Logo"
            />
            <div className="uppercase  text-[1.7rem] leading-[2.3rem] mb-[0.5rem] text-primaryNormal block">
              <h1 className="-mb-[0.4rem]">Rumah</h1>
              <h1 className="font-bold">Atalla</h1>
              <div className="w-[120%] h-[0.2rem] -my-[0.1rem] rounded-md bg-primaryNormal" />
            </div>
          </div>

          {/* TITLE */}
          <Title2 title={"Forget Password"} className={"my-5"} />
          {/* FORM */}
          <form
            action=""
            className="w-full justify-between flex-col flex gap-3 mt-3 mx-2"
          >
            <div className="">
              <div>
                <label
                  className="text-sm sm:text-base drop-shadow-sm font-semibold text-primaryNormal"
                  htmlFor="email"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute h-full w-[3rem] items-center justify-center flex text-secondary opacity-[0.6] fa-lg">
                    <i className="fa-solid fa-envelope"></i>
                  </div>
                  <input
                    type="text"
                    value={email}
                    placeholder="ecample123@gmail.com"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-[2.7rem] shadow-sm placeholder:text-gray-300 bg-white focus:outline-white p-3 text-sm text-primaryDark border rounded-lg "
                  />
                </div>
                <div
                  className={`w-full text-start items-start justify-start font-semibold text-sm md:text-base mt-3`}
                >
                  {isError && !isSuccess && !isLoading ? (
                    <span className="text-red-400 ">
                      <i className="mr-2 fa-solid fa-circle-exclamation"></i>
                      Error send email
                    </span>
                  ) : isSuccess && !isLoading && !isError ? (
                    <span className="text-secondary">
                      <i className="mr-2 fa-solid fa-circle-exclamation"></i>
                      Email sent!, please check your email..
                    </span>
                  ) : (
                    <>
                      <br />
                    </>
                  )}
                </div>
              </div>
            </div>

            <div
              className={`flex gap-4 items-center w-full justify-center ml-auto  duration-300 transition-all `}
            >
              <Button
                variant={"transparent"}
                onClick={() => navigate("/login")}
              >
                <i
                  className={`fa-solid fa-arrow-up fa-lg rotate-[-45deg] mr-2`}
                ></i>
                Login
              </Button>
              <Button onClick={handleSendEmail}>
                Send Email
                <i className="ml-2 fa-solid fa-paper-plane"></i>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
