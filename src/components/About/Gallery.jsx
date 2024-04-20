import { Link } from "react-router-dom";

export default function Gallery() {
  return (
    <>
      <div className="w-screen min-h-screen h-[200vh] sm:h-screen text-thirdyNormal mt-10 shadow-md">
        <div className="grid grid-cols-2 grid-rows-4 sm:grid-cols-4 sm:grid-rows-2 h-full w-full">
          {/* 1 */}
          <Link
            to={"/fashions"}
            className=" col-span-2 row-span-2  relative overflow-hidden h-screen w-screen sm:h-full sm:w-full group "
          >
            {/* <div className="h-28 sm:h-36 w-56 sm:w-72 absolute bottom-20 left-0 z-10 bg-secondary shadow-md rounded-2xl p-4 sm:p-6">
              <h1 className="text-2xl sm:text-3xl font-semibold drop-shadow-md tracking-tight">
                Diskon 10%
              </h1>
              <h1 className="text-sm text-justify mt-1 sm:mt-2">
                Untuk pengguna baru yang membeli di website ini
              </h1>
            </div> */}

            <img
              src="LandingFashion2.jpg"
              className="object-cover h-full sm:w-auto w-full absolute group-hover:scale-[1.1] group-hover:rotate-2 transition-all duration-1000"
              alt=""
            />
          </Link>
          {/* 2 */}
          <div className="bg-primaryNormal h-full flex items-center justify-center">
            <h1 className="lg:text-6xl text-4xl text-center font-semibold drop-shadow-md">
              Fashion <br /> Trendy
            </h1>
          </div>
          {/* 3 */}
          <Link
            to={"/fashions"}
            className="h-full group relative overflow-hidden"
          >
            <img
              src="LandingFashion3.jpg"
              className="object-cover h-full absolute group-hover:scale-[1.15] scale-[1.05] group-hover:rotate-2 transition-all duration-1000"
              alt=""
            />
          </Link>
          {/* 4 */}
          <Link
            to={"/fashions"}
            className="h-full group relative overflow-hidden"
          >
            <img
              src="LandingFashion4.jpg"
              className="object-cover h-full absolute group-hover:scale-[1.15] scale-[1.05] group-hover:rotate-2 transition-all duration-1000"
              alt=""
            />
          </Link>
          {/* 5 */}
          <div className="bg-primaryNormal h-full flex items-center justify-center">
            {" "}
            <h1 className="lg:text-6xl text-4xl text-center font-semibold drop-shadow-md">
              Promo <br /> Menarik
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}
