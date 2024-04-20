import SkeletonBar from "../SkeletonBar";

export default function UserControllerSectionSkeleton() {
  return (
    <>
      <div className="my-2 w-full relative animate-pulse opacity-[0.5]  bg-section rounded-2xl shadow-xl border-b-2 min-h-[7.5rem] inset-[0.2rem]">
        <div className="flex items-center min-h-[7.5rem] z-[10] relative w-full">
          <h1 className="items-center flex justify-center w-[10%] py-6 ">
            <SkeletonBar width={"0.75rem"} />
          </h1>
          <h1 className="flex items-center justify-start w-[70%] sm:w-[50%] py-6 gap-4">
            <div className="w-28 aspect-square rounded-full bg-gray-400 -ml-1 mr-2 animate-pulse"></div>
            <div className="truncate w-full flex max-sm:items-center flex-col gap-2">
              <SkeletonBar width={"20%"} />
              <SkeletonBar width={"30%"} />
              <SkeletonBar width={"60%"} />
            </div>
          </h1>
          <h1 className="items-center justify-center py-6 w-[20%] sm:w-[40%] gap-2 flex flex-col ">
            {[...Array(3)].map(() => (
              <>
                <SkeletonBar width={"1.25rem"} mobile />
                <SkeletonBar width={"30%"} desktop />
              </>
            ))}
          </h1>
        </div>
      </div>
    </>
  );
}
