/* eslint-disable react/prop-types */
export default function Title({ title, className }) {
  return (
    <>
      <div className={`flex items-center gap-5 w-full my-10 ${className}`}>
        <div className="w-full h-1 bg-gradient-to-tr opacity-[0.5] from-[#7c6fff] via-[#6f79ff] to-[#2ab7ff]  rounded-[0.05rem] mt-1 sm:mt-3 shadow-md"></div>
        <h1 className=" text-[1.6rem] sm:text-[2rem] relative text-center font-semibold text-transparent bg-gradient-to-r from-[#7c6fff] via-[#6f79ff] to-[#2ab7ff] bg-clip-text drop-shadow-md whitespace-nowrap">
          {title}
          <div className="bg-gradient-to-bl -z-[1] blur-[25px] opacity-[0.3] from-[#7c6fff] via-[#6f79ff] to-[#2ab7ff] w-[100%] h-[50%] absolute left-0 top-4"></div>
        </h1>
        <div className="w-full h-1 bg-gradient-to-tl opacity-[0.5] from-[#7c6fff] via-[#6f79ff] to-[#2ab7ff]  rounded-[0.05rem] mt-1 sm:mt-3 shadow-md"></div>
      </div>
    </>
  );
}
