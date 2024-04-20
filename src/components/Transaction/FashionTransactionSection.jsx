/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
export default function FashionTransactionSection(props) {
  function formatISODate(isoDateString) {
    const date = new Date(isoDateString);

    const formattedDate = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${Math.floor(
      date.getSeconds()
    )}`;

    return formattedDate;
  }
  return (
    <>
      <div
        onClick={() => props?.handlePopover({ item: props?.data })}
        className={`
        ${
          props.data.status === "canceled"
            ? "border-b-red-400 "
            : props.data.status === "pending"
            ? "border-b-yellow-400 "
            : "border-b-green-400 "
        }
        rounded-2xl -ml-1 cursor-pointer group bg-section hover:shadow-xl hover:inset-0 transition-all duration-300 w-full relative  text-primaryDark text-[0.7rem] overflow-hidden leading-5 sm:leading-normal sm:text-base py-5 shadow-lg border-b-4 border-x-2 inset-[0.2rem]`}
      >
        <div className="flex items-center z-[10] relative ">
          <div
            className={`absolute h-[200%]  w-20 rotate-6 right-20 blur-[30px] ${
              props?.data?.status === "successed"
                ? "bg-[#e8fffe]"
                : props?.data?.status === "canceled"
                ? "bg-[#fcf0ff]"
                : "bg-[#fff9ec]"
            } `}
          ></div>
          <h1 className="text-center w-[27%] lg:w-[25%] py-6 drop-shadow-md font-semibold">
            {props?.data?.kasir}
          </h1>
          <h1 className="flex items-center justify-center drop-shadow-md w-[10%] lg:w-[5%] py-6">
            {" "}
            {props?.data?.store === "web" ? (
              <i className="fa-solid fa-store"></i>
            ) : props?.data?.store === "tokopedia" ? (
              <>
                <div className="flex relative">
                  <img className="h-7" src="/Tokopedia.png" alt="" />
                </div>
              </>
            ) : (
              <>
                <div className="flex relative">
                  <img className="h-7" src="/Shopee.png" alt="" />
                </div>
              </>
            )}
          </h1>
          <h1 className="text-center  w-[63%] lg:w-[30%] py-6 break-all drop-shadow-md truncate">
            <span className="font-semibold drop-shadow-sm">
              {props?.data?.buyer}{" "}
            </span>
            <span className="">- {formatISODate(props?.data?.createdAt)}</span>
            <br />
            {props?.data?._id?.toString()}
          </h1>
          <h1 className="text-center py-6 w-[25%] lg:block hidden text-secondary font-semibold drop-shadow-md">
            Rp. {props?.data?.totalAmount?.toLocaleString()}
          </h1>
          <div className="max-sm:hidden text-center drop-shadow-md font-semibold flex items-center justify-center relative  w-[15%]  py-6">
            {props?.data?.status === "successed" ? (
              <>
                <h1 className=" drop-shadow-sm rounded-[50%] w-[5rem] text-center ">
                  Success
                </h1>
              </>
            ) : props?.data?.status === "pending" ? (
              <>
                <h1 className=" drop-shadow-sm rounded-[50%] w-[5rem] text-center ">
                  Pending
                </h1>
              </>
            ) : (
              <>
                <h1 className=" drop-shadow-sm rounded-[50%] w-[5rem] text-center ">
                  Canceled
                </h1>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
