import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function AdminNavbar({ User, adminPage }) {
  return (
    <>
      <div className={` ${!adminPage && "hidden"} w-full flex flex-col justify-center items-center`}>
        <div className="justify-between bg-section-dark w-full h-[4rem] rounded-2xl shadow-lg mt-5 flex items-center px-5 py-3 text-white">
          <span>
            {User?.role === "owner" ? (
              <>
                <span className="max-sm:hidden">Welcome back,</span>
                <span className="text-thirdyNormal ml-2 font-semibold">
                  {User?.username}
                </span>
                <span className="text-xl pb-1">👋</span>
              </>
            ) : (
              <>
                <span className="max-sm:hidden">Keep up the good work!,</span>
                <span className="text-thirdyNormal ml-2 font-semibold">
                  {User?.username}
                </span>
                <span className="text-xl pb-1">🔥</span>
              </>
            )}
          </span>
          <Link
            to="/"
            className="flex px-8 py-2 rounded-2xl hover:bg-primaryThin group transition-all duration-300"
          >
            Landing
            <i className="fa-solid fa-arrow-up ml-2 mt-[0.2rem] scale-[0.9] rotate-[45deg] opacity-[0.5] group-hover:opacity-100 transition-all duration-300"></i>
          </Link>
        </div>
      </div>
    </>
  );
}
