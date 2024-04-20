/* eslint-disable react/prop-types */
export default function SkeletonBar({ width, mobile, desktop, height }) {
  return (
    <>
      <div
        style={{ width: width, height: height || "0.6rem" }}
        className={`bg-gray-400 rounded-2xl animate-pulse ${
          mobile && "sm:hidden"
        } ${desktop && "max-sm:hidden"} `}
      ></div>
    </>
  );
}
