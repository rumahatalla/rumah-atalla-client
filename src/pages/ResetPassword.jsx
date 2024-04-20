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
  console.log("DBURL", DBURL);
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSame, setIsSame] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    console.log(password.length);
    if (password.length > 0 && confirmPassword.length > 0) {
      if (password == confirmPassword) {
        setIsSame(true);
      } else {
        setIsSame(false);
      }
    }
  }, [confirmPassword, password]);

  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  useEffect(() => {
    const token = urlParams.get("token");
    const email = urlParams.get("email");
    setToken(token);
    setEmail(email);
  }, []);

  console.log(email, token, "BAKABA");

  const handleSendEmail = async () => {
    if ((!password && !confirmPassword) || password !== confirmPassword) {
      toast.custom((t) => (
        <CustomToast t={t} message="Cannot send" type="failed" />
      ));
      return;
    }
    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);
    await axios
      .post(DBURL + "/users/reset-password", {
        newPassword: confirmPassword,
        email: email,
        token: token,
      })
      .then((res1) => {
        console.log("Password updated", res1.data);
        toast.custom((t) => (
          <CustomToast t={t} message="Password updated" type="success" />
        ));
        setTimeout(() => {
          navigate("/login");
        }, 1000);
        setIsSuccess(true);
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
        toast.custom((t) => (
          <CustomToast t={t} message="Password update failed" type="failed" />
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
        <div className="flex z-[10] items-start bg-section h-[90%] rounded-2xl w-[90%] lg:w-[35%] px-5 sm:px-[15vw] lg:px-[3vw] py-12 shadow-xl flex-col">
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
          <Title2 title={"Reset Password"} className={"my-5"} />
          {/* FORM */}
          <form action="" className="w-full flex mx-2 flex-col gap-3">
            <div>
              <div>
                <label
                  className="text-sm sm:text-base drop-shadow-sm font-semibold text-primaryNormal"
                  htmlFor="password"
                >
                  New Password
                </label>
                <div className="w-full relative">
                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    className="h-full w-[3rem] opacity-[0.7] cursor-pointer rounded-r-md flex items-center justify-center absolute z-[1] right-0 bg-[rgba(0,0,0,0.15)]"
                  >
                    {showPassword ? (
                      <i className="fa-solid fa-eye "></i>
                    ) : (
                      <i className="fa-solid fa-eye-slash "></i>
                    )}
                  </div>
                  <div className="absolute h-full w-[3rem] text-secondary opacity-[0.6] cursor-pointer rounded-l-md flex items-center justify-center z-[1] left-0">
                    <i className="fa-solid fa-key fa-lg"></i>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    placeholder="Your new password here"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full px-[3rem] shadow-sm placeholder:text-gray-300 bg-white focus:outline-white p-3 text-sm text-primaryDark border rounded-lg "
                  />
                </div>
              </div>
              <div className="mt-3">
                <label
                  className="text-sm sm:text-base drop-shadow-sm font-semibold text-primaryNormal"
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </label>
                <div className="w-full relative">
                  <div
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="h-full w-[3rem]  opacity-[0.7] cursor-pointer rounded-r-md flex items-center justify-center absolute z-[1] right-0 bg-[rgba(0,0,0,0.15)]"
                  >
                    {showConfirmPassword ? (
                      <i className="fa-solid fa-eye "></i>
                    ) : (
                      <i className="fa-solid fa-eye-slash "></i>
                    )}
                  </div>
                  <div className="absolute h-full w-[3rem] text-secondary opacity-[0.6] cursor-pointer rounded-l-md flex items-center justify-center z-[1] left-0">
                    <i className="fa-lg fa-solid fa-check-double"></i>
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    placeholder="Confirm new password"
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full shadow-sm px-[3rem] placeholder:text-gray-300 bg-white focus:outline-white p-3 text-sm text-primaryDark border rounded-lg "
                  />
                </div>
              </div>
              <div className="w-full text-start items-start justify-start">
                <h1
                  className={`transition-all duration-300 mt-3 text-sm sm:text-base ${
                    isError || !isSame
                      ? "text-red-400"
                      : isSuccess && "text-secondary"
                  } ${
                    isSame && !isError && !isSuccess && "opacity-0"
                  } font-semibold  `}
                >
                  {!isSame ? (
                    <>
                      <i className="mr-2 fa-solid fa-circle-exclamation"></i>
                      Password does not match
                    </>
                  ) : isError && !isSuccess && !isLoading && isSame ? (
                    <>
                      <i className="mr-2 fa-solid fa-circle-exclamation"></i>
                      Error resetting password
                    </>
                  ) : isSuccess && !isLoading && !isError && isSame ? (
                    <>
                      <i className="fa-solid fa-circle-check mr-2"></i>
                      Success
                    </>
                  ) : (
                    <br />
                  )}
                </h1>
              </div>
            </div>

            <div
              className={`flex flex-col w-fit justify-between ml-auto  duration-300 transition-all `}
            >
              <Button onClick={handleSendEmail}>
                <i className="fa-solid fa-rotate-right mr-2"></i>
                Reset
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
