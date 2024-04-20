/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function LinkSide({ onClick, path, name, children }) {
  return (
    <>
      <Link
        to={path}
        onClick={onClick}
        className={`${
          location.pathname === path && "bg-primaryThin drop-shadow-md"
        } flex items-center justify-between  text-thirdyThin max-sm:w-[2.5rem] max-sm:h-[2.5rem]  drop-shadow-sm group lg:mx-2 px-4 my-1 rounded-2xl py-5 lg:py-[0.6rem] hover:bg-primaryThin transition-all duration-300 `}
      >
        <div className="flex items-center justify-center gap-2">
          <span
            className={` group-hover:opacity-100 transition-all duration-200 max-sm:-translate-x-1
          ${location.pathname === path ? "opacity-100" : "opacity-[0.3]"}
          `}
          >
            {children}
          </span>
          <h1 className="  lg:flex hidden">{name}</h1>
        </div>
        <div className="xl:flex hidden ">
          <i
            className={`fa-solid fa-arrow-up rotate-[45deg]   ${
              location.pathname === path ? "opacity-100" : "opacity-[0.3]"
            } group-hover:opacity-100 transition-all duration-200`}
          ></i>
        </div>
      </Link>
    </>
  );
}
