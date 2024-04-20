/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import CustomToast from "../components/CustomToast";
import Button from "../components/Button";
import Title2 from "../components/Title2";

export default function SignIn() {
  const DBURL = import.meta.env.VITE_APP_DB_URL;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    await axios
      .post(DBURL + "/users/signin", {
        email: email,
        password: password,
      })
      .then((res1) => {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res1.data.token}`;
        axios
          .post(DBURL + "/users/check/" + res1.data.token)
          .then((res) => {
            localStorage.setItem("token", res1.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.decodedToken));
            setIsLoading(false);
            navigate("/admin/dashboard");
          })
          .catch((error) => {
            setIsError(true);
          });
      })
      .catch((error) => {
        setIsError(true);
        toast.custom((t) => (
          <CustomToast t={t} message="Sign In Error" type="failed" />
        ));
      });
    setIsLoading(false);
  };

  const User = JSON.parse(localStorage.getItem("user"));
  const fetchUserData = async () => {
    await axios
      .get(DBURL + "/users/" + User?.userId)
      .then((res) => {
        navigate("/admin/dashboard");
      })
      .catch((err) => {});
  };

  useEffect(() => {
    if (User) {
      fetchUserData();
    }
  }, []);

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
          <Title2 title={"Sign In - Only Admin"} className={"my-5"} />
          {/* FORM */}
          <form action="" className="mx-2 w-full flex  flex-col gap-3">
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
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full shadow-sm placeholder:text-gray-300 bg-white focus:outline-white p-3 pl-[2.7rem] text-sm text-primaryDark border rounded-lg "
                />
              </div>
            </div>
            <div>
              <label
                className="text-sm sm:text-base drop-shadow-sm font-semibold text-primaryNormal"
                htmlFor="password"
              >
                Password
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
            <div className="flex w-full justify-between items-center">
              <Link
                to="/forget-password"
                className="text-sm sm:text-base text-secondary font-semibold cursor-pointer hover:opacity-[0.8] transition-all duration-200"
              >
                Forget password?
              </Link>
              <span>
                <div
                  className={`transition-all duration-300 font-semibold text-sm sm:text-base text-red-400 ${
                    isError ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <i className="mr-2 fa-solid fa-circle-exclamation"></i>
                  Error Log In
                </div>
              </span>
            </div>
            <div className="flex flex-col w-fit justify-between ml-auto mt-3">
              <Button disabledParam={isLoading} onClick={handleLogin}>
                Log In
                <i
                  className={`fa-solid fa-arrow-up fa-lg rotate-[45deg] ml-2`}
                ></i>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
