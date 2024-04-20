import SkeletonBar from "../SkeletonBar";

export default function PromoSectionSkeleton() {
  return (
    <>
      <div className="my-2 opacity-[0.5] cursor-pointer w-full relative bg-section animate-pulse p-2 rounded-2xl shadow-lg inset-[0.2rem]">
        <div className="w-full bg-thirdyNormal shadow-md   z-[0] opacity-0 transition-all duration-100 -m-2 absolute h-full "></div>
        <div className="flex items-center z-[10] relative w-full">
          <h1 className="text-center w-[10%] ">
            <div
              className="bg-gray-400 rounded-2xl w-full aspect-square animate-pulse"
              alt=""
            />
          </h1>
          <h1 className="items-center justify-center flex flex-col w-[45%] gap-2">
            <SkeletonBar width={"13rem"} />
            <SkeletonBar width={"8rem"} />
            <SkeletonBar width={"9rem"} />
          </h1>
          <h1 className="items-center justify-center flex flex-col gap-2 w-[45%] font-semibold">
            <SkeletonBar width={"9rem"} />
            <SkeletonBar width={"5rem"} />
          </h1>
        </div>
      </div>
    </>
  );
}
