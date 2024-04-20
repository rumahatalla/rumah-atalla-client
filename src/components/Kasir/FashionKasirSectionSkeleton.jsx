import SkeletonBar from "../SkeletonBar";

export default function FashionKasirSectionSkeleton() {
  return (
    <>
      <div
        className={`relative bg-section transition-all shadow-lg animate-pulse rounded-2xl`}
      >
        <div className="w-full relative overflow-hidden rounded-2xl bg-gray-300 transition-all aspect-square animate-pulse"></div>
        <div className="my-2 mx-4 flex flex-col justify-between h-10">
          <SkeletonBar width={"50%"} height={"0.5rem"} />
          <div className="w-full flex justify-between">
            <SkeletonBar width={"10%"} height={"0.5rem"} />
            <SkeletonBar width={"25%"} height={"0.5rem"} />
          </div>
        </div>
      </div>
    </>
  );
}
