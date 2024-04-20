/* eslint-disable react/prop-types */
export default function ChangePageButton({
  height,
  page,
  setPage,
  image,
  text,
}) {
  return (
    <>
      <button
        style={{ height: height || "10rem" }}
        onClick={() => setPage()}
        className={`relative w-[100%] rounded-2xl overflow-hidden group flex items-center justify-center drop-shadow-sm`}
      >
        <img
          src={image}
          className={`absolute w-full z-[0] h-full object-cover  transition-all duration-700  ${
            page === text
              ? "scale-[1.2] rotate-3 group-hover:scale-[1] group-hover:rotate-0"
              : "group-hover:scale-[1.2] group-hover:rotate-3"
          }`}
          alt="LandingFashion"
        />
        <div
          className={`absolute   ${
            page === text
              ? "opacity-[0.5] bg-[rgba(255,255,255,0.2)]"
              : "group-hover:opacity-[0.1] opacity-[0.7] bg-section-dark"
          } w-full h-full z-[1]  transition-all duration-300`}
        ></div>
        <h1
          className={`text-lg md:text-3xl z-[2] relative text-white capitalize font-medium ${
            page === text
              ? "scale-[1.05] group-hover:scale-[1]"
              : "group-hover:scale-[1.05]"
          } transition-all duration-300`}
        >
          {text}
        </h1>
      </button>
    </>
  );
}
