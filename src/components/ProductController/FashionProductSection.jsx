/* eslint-disable no-unused-vars */
import { Swiper, SwiperSlide } from "swiper/react";

/* eslint-disable react/prop-types */
export default function FashionProductSection(props) {
  console.log(props);
  const id = props?.data?._id?.toString();
  return (
    <>
      <div
        onClick={
          props?.data?.store === "web"
            ? () =>
                props?.handlePopover({
                  param: "edit",
                  item: props?.data,
                  type: "fashions",
                })
            : null
        }
        className={`${
          props?.data?.store === "web"
            ? "cursor-pointer group hover:shadow-xl hover:inset-0 transition-all duration-300"
            : ""
        } rounded-2xl my-3 w-full relative  bg-section text-primaryDark text-[0.7rem] leading-5 sm:leading-normal sm:text-[0.7rem] 2xl:text-sm shadow-md border-b-2 inset-[0.2rem]  p-3`}
      >
        <div className="flex items-center z-[10] relative">
          <h1
            onClick={{}}
            className="flex items-center justify-center  sm:w-[20%] aspect-square w-[35%]"
          >
            <Swiper
              slidesPerView={1}
              spaceBetween={2}
              loop
              navigation
              className="h-full bg-white aspect-square flex  justify-center items-center  rounded-2xl shadow-lg"
            >
              {typeof props?.data?.imageUrl != "string" && props?.data?.imageUrl?.length > 0 ? (
                props?.data?.imageUrl?.map((image) => (
                  <SwiperSlide key={image._id} className="">
                    <div className="h-full flex items-center justify-center w-full relative">
                      <div className="opacity-0">No Image</div>
                      <img
                        src={image?.url}
                        alt={image?.name}
                        className="h-full aspect-square object-cover absolute z-[10]"
                      />
                    </div>
                  </SwiperSlide>
                ))
              ) : (
                <SwiperSlide className="">
                  <div className="font-semibold text-primaryDark flex items-center justify-center w-full h-full bg-gray-300 pb-1">
                    No Image
                  </div>
                </SwiperSlide>
              )}
            </Swiper>
          </h1>
          <h1 className="text-center  w-[60%] sm:w-[45%] py-6 truncate ">
            <span className="font-semibold ">
              {props?.data?.name} - {props?.data?.brand}
            </span>
            <br />
            <span>{id}</span>
            <br />
            <span className="text-gray-400">
              {props?.data?.date ? props?.data?.date : props?.data?.createdAt}
            </span>
          </h1>
          <h1 className="max-sm:hidden w-[25%] py-6 flex flex-col">
            {props?.data?.variants?.map((variant) => (
              <div
                key={variant.name}
                className="w-full h-full flex flex-col items-center justify-center border-b border-gray-200 mb-2 py-2"
              >
                <h1 className="font-semibold">{variant?.name}</h1>
                <div className="text-center">
                  {variant?.size?.map((size) => (
                    <div key={size.size} className="flex gap-1">
                      <div>{size?.size}</div> -<div>{size?.stock} pcs</div> -
                      <div className="text-secondary font-semibold">
                        Rp. {size?.price?.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </h1>
          <h1 className="flex items-center justify-center  w-[10%] sm:w-[10%] py-6">
            {" "}
            {props?.data?.store === "web" ? (
              <i className="fa-solid fa-store text-primaryDark"></i>
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
        </div>
      </div>
    </>
  );
}
