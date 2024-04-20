/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Button from "../Button";

export default function Header({ User }) {
  console.log("USUS", User);
  return (
    <>
      <div className="flex flex-col lg:flex-row w-full h-[90vh] overflow-hidden justify-center shadow-2xl bg-section-rainbow  shadow-indigo-100 mt-20">
        {/* BG */}
        <div className="absolute w-full h-full top-0 left-0">
          <div className="w-full h-full relative bg-">
            <div
              style={{
                background: "rgba(232, 236, 255, 0.5)",
              }}
              className=" rounded-full absolute blur-[30px] h-[30%] w-[20%]"
            ></div>
            <div
              style={{
                background: "rgba(232, 236, 255, 0.8)",
              }}
              className=" rounded-3xl absolute blur-[50px] h-[35%] w-[15%] bottom-0 right-32"
            ></div>
            <div
              style={{
                background: " rgba(235, 230, 255, 0.8)",
              }}
              className=" rounded-full absolute blur-[50px] h-[50%] w-[30%] rotate-[20deg] bottom-32 left-32"
            ></div>
            <div
              style={{
                background: "rgba(213, 213, 255, 1)",
              }}
              className=" rounded-3xl absolute blur-[50px] h-[35%] w-[15%] -top-5 right-32"
            ></div>
            <div
              style={{
                background: " rgba(226, 248, 255, 1)",
              }}
              className=" rounded-3xl absolute blur-[50px] h-[53%] rotate-[50deg] w-[15%] top-20 right-52"
            ></div>
            <div
              style={{
                background: "  rgba(254, 248, 255, 1)",
              }}
              className=" rounded-3xl absolute blur-[50px] h-[35%] w-[32%] top-20 left-52"
            ></div>
          </div>
        </div>
        {/* LEFT */}
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          <div className="text-center mb-18 z-[2] ">
            <h1 className="text-[2.5rem] lg:text-7xl font-[700] tracking-tight mb-2 ">
              Pilihan Terbaik
            </h1>
            <h1 className="text-[2.5rem] lg:text-7xl font-[700] tracking-tight mb-5 ">
              Untuk Fashion Anda
            </h1>
            <h1 className="text-xl lg:text-2xl mt-10 tracking-tight ">
              Jangan lewatkan promo-promo menarik!
            </h1>
            <div className="flex gap-5 mt-6 items-center w-full justify-center">
              {!User ? (
                <>
                  <Link to={"/login"}>
                    <Button variant="">Log In as a Kasir</Button>
                  </Link>
                  <Link to={"/fashions"}>
                    <Button variant="red">Buy Products</Button>
                  </Link>
                </>
              ) : (
                <>
                  <Button
                    variant="red"
                    onClick={() => {
                      localStorage.removeItem("token");
                      localStorage.removeItem("user");
                      window.location.reload();
                    }}
                  >
                    <i className="fa-solid fa-arrow-right-from-bracket scale-[0.8] mr-2 fa-lg"></i>
                    Log Out
                  </Button>
                  <Link to={"/admin/dashboard"}>
                    <Button variant="">
                      <i className="fa-solid fa-table scale-[0.8] fa-lg mr-2 "></i>
                      Go to dashboard
                    </Button>
                  </Link>
                </>
              )}

              {/* <Button variant="secondary">Fashions</Button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
