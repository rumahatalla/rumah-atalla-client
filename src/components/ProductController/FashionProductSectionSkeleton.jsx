import SkeletonBar from "../SkeletonBar";

export default function FashionProductSectionSkeleton() {
  return (
    <>
      <div
        className={`cursor-pointer group hover:shadow-xl hover:inset-0 transition-all duration-300 rounded-2xl  w-full relative  bg-section text-primaryDark text-[0.7rem] leading-5 sm:leading-normal md:text-base shadow-md border-b-2 inset-[0.2rem] mt-2 p-3`}
      >
        <div className="flex items-center z-[10] relative">
          <h1 className="flex items-center justify-center  sm:w-[20%] aspect-square w-[35%]">
            <div className="bg-gray-400 rounded-2xl animate-pulse w-full h-full aspect-square"></div>
          </h1>
          <h1 className="items-center flex flex-col gap-2 w-[65%] sm:w-[45%] py-6 break-all ">
            <SkeletonBar width="40%" />
            <SkeletonBar width="50%" />
            <SkeletonBar width="40%" />
          </h1>
          <h1 className="max-sm:hidden w-[25%] py-6 gap-2 flex flex-col items-center">
            <SkeletonBar width="15%" />
            <SkeletonBar width="50%" />
            <SkeletonBar width="50%" />
          </h1>
          <h1 className="flex items-center justify-center  w-[10%] sm:w-[10%] py-6">
            {" "}
            <SkeletonBar width="1rem" />
          </h1>
        </div>
      </div>
    </>
  );
}
