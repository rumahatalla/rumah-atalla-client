/* eslint-disable no-unused-vars */

import SkeletonBar from "../SkeletonBar";

/* eslint-disable react/prop-types */
export default function TransactionSectionSkeleton() {
  return (
    <>
      <div
        className={`
          rounded-2xl -ml-1 cursor-pointer group bg-section hover:shadow-xl hover:inset-0 transition-all duration-300 w-full relative  text-primaryDark text-[0.7rem] overflow-hidden leading-5 sm:leading-normal sm:text-base shadow-lg border-b-4 border-x-2 inset-[0.2rem] h-[6rem] animate-pulse`}
      >
        <div className="flex items-center z-[10] relative pt-2">
          <div
            className={`absolute h-[200%]  w-20 rotate-6 right-20 blur-[30px] bg-[#e8fffe]`}
          ></div>
          <h1 className="flex items-center justify-center w-[27%] lg:w-[25%] py-6 drop-shadow-md">
            <SkeletonBar width="30%" />
          </h1>
          <h1 className="flex items-center justify-center drop-shadow-md w-[10%] lg:w-[5%] py-6">
            <SkeletonBar width="1rem" />
          </h1>
          <h1 className="flex flex-col justify-center items-center   w-[63%] lg:w-[30%] py-6 gap-2 break-all drop-shadow-md ">
            <SkeletonBar width="70%" />
            <SkeletonBar width="60%" />
          </h1>
          <h1 className="lg:flex justify-center py-6 w-[25%] hidden  drop-shadow-md">
            <SkeletonBar width="40%" />
          </h1>
          <div className="max-sm:hidden  drop-shadow-md flex items-center justify-center relative  w-[15%]  py-6">
            <SkeletonBar width="50%" />
          </div>
        </div>
      </div>
    </>
  );
}
