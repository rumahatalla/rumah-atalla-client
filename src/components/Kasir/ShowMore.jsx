/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { AnimatePresence, motion } from "framer-motion";
import Title from "../Title";
import { SwiperSlide, Swiper } from "swiper/react";
import Button from "../Button";
import { useEffect, useState } from "react";
import ReadMoreDescription from "../ReadMoreDescription";
import BlackScreenPopover from "../BlackScreenPopover";
import LogoPopover from "../LogoPopover";
import CustomToast from "../CustomToast";
import toast from "react-hot-toast";
import ShowMoreSection from "./ShowMoreSection";

export default function ShowMore(props) {
  // READMORE
  const [readMore, setReadMore] = useState(false);
  // HOVER PROMO
  const [hoverPromo, setHoverPromo] = useState("");
  const handleHoverPromo = (promo) => {
    setHoverPromo(promo);
  };

  let allIndex = -1;
  return (
    <>
      <ReadMoreDescription
        description={props?.data?.description}
        handleClose={() => setReadMore(false)}
        readMore={readMore}
      />
      <AnimatePresence>
        {props.showPopover && (
          <div className="fixed z-[1000] top-0 left-0 w-screen h-screen flex items-center justify-center">
            <BlackScreenPopover
              onClick={() => {
                props?.togglePopover();
              }}
              isLoading={false}
            />
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={` relative overflow-hidden bg-section w-[24rem] px-4 pt-0 sm:px-10 h-[85vh] sm:h-[48rem] transition-all duration-300 max-h-[95vh] sm:w-[40rem] mx-2 sm:mx-10  p-5 z-[1] rounded-2xl shadow-md`}
            >
              {/* LOGO */}
              <LogoPopover />

              <Title title="Detail" className={"my-2"} />

              {/* DATA */}
              <div className="flex flex-col  gap-4 h-[62%] sm:h-[70%] pb-4 w-full justify-between">
                <div className="h-full sm:h-[90%] ">
                  <div className="w-full h-full flex flex-col gap-3 text-sm overflow-y-scroll overflow-x-hidden">
                    <div className="h-[100%] max-sm:mt-[4.5rem] sm:h-[40%]  w-full flex max-sm:flex-col-reverse justify-between items-center text-primaryDark font-[600]">
                      <div className="w-full flex flex-col items-center sm:justify-between sm:h-full sm:py-3">
                        <div className="w-full flex py-1">
                          <span className="w-[35%] sm:w-[25%] flex">Name</span>
                          <span className="sm:w-[75%] flex truncate">
                            : {props?.data?.name}
                          </span>
                        </div>

                        <div className="w-full flex py-1">
                          <span className="w-[35%] sm:w-[25%] flex">
                            Category
                          </span>
                          <span className="sm:w-[75%] flex font-medium truncate">
                            : {props?.data?.category}
                          </span>
                        </div>
                        <div className="w-full flex py-1">
                          <span className="w-[35%] sm:w-[25%] flex">Brand</span>
                          <span className="sm:w-[75%] flex truncate">
                            : {props?.data?.brand}
                          </span>
                        </div>
                        <div className="w-full flex py-1 overflow-hidden">
                          <span className="w-[35%] sm:w-[25%] flex">
                            Description
                          </span>
                          <span className="flex">
                            <span className="max-w-[15rem] flex truncate text-ellipsis overflow-hidden font-medium">
                              : {props?.data?.description}
                            </span>
                          </span>
                          <button
                            className="ml-1 hover:opacity-[0.6]"
                            onClick={() => setReadMore(!readMore)}
                          >
                            ...
                          </button>
                        </div>
                        <div className={`w-full flex py-1 `}>
                          <span className="w-[35%] sm:w-[25%] flex">Promo</span>
                          <span className="sm:w-[75%] gap-1 flex">
                            :{" "}
                            <span className="flex ">
                              {props?.data?.productPromos?.length > 0
                                ? props?.data?.productPromos?.map(
                                    (promo, index) => (
                                      <>
                                        <div
                                          onMouseDown={() =>
                                            handleHoverPromo(promo._id)
                                          }
                                          onMouseEnter={() =>
                                            handleHoverPromo(promo._id)
                                          }
                                          onMouseLeave={() =>
                                            handleHoverPromo("")
                                          }
                                          key={index}
                                          className="relative w-full h-full group"
                                        >
                                          <img
                                            src={promo?.imageUrl?.url}
                                            className="h-6 sm:h-7 mr-1 group-hover:scale-[1.05] border-2 group-hover:border-primaryThin aspect-square object-cover object-center drop-shadow-xl rounded-md"
                                            alt=""
                                          />
                                          {hoverPromo === promo._id && (
                                            <motion.div
                                              initial={{ opacity: 0, y: -4 }}
                                              animate={{ opacity: 1, y: 1 }}
                                              transition={{ duration: 0.2 }}
                                              className=" text-center text-[0.7rem] sm:text-[0.8rem] p-3 z-[100] shadow-md bg-gradient-to-r from-primaryDark to-primaryThin text-white border-2 border-primaryNormal h-20 w-36 absolute -top-[5.3rem] -left-14 flex flex-col items-center justify-center rounded-2xl"
                                            >
                                              <h1 className="">{promo.name}</h1>
                                              <h1>
                                                {(promo.type ===
                                                  "diskon nominal" ||
                                                  promo.type ===
                                                    "cashback nominal") &&
                                                  "Rp. "}
                                                {promo.value}
                                                {(promo.type ===
                                                  "diskon persentase" ||
                                                  promo.type ===
                                                    "cashback persentase") &&
                                                  "%"}
                                              </h1>
                                            </motion.div>
                                          )}
                                        </div>
                                      </>
                                    )
                                  )
                                : "-"}
                            </span>
                          </span>
                        </div>
                      </div>
                      <div className="max-sm:w-full max-sm:pb-3 sm:h-[105%] aspect-square ">
                        <Swiper
                          slidesPerView={1}
                          spaceBetween={2}
                          navigation
                          className="w-full bg-white aspect-square flex  justify-center items-center  rounded-2xl shadow-lg"
                        >
                          {props?.data?.imageUrl?.length > 0 ? (
                            props?.data?.imageUrl?.map((image, index) => (
                              <SwiperSlide key={index} className="">
                                <div className="h-full w-full relative">
                                  <img
                                    src={image.url}
                                    alt={image.url}
                                    className="h-full aspect-square object-cover absolute"
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
                      </div>
                    </div>
                    <div className="w-full   sm:h-[60%] flex flex-col">
                      <div className="w-full max-sm:flex-col max-sm:justify-center max-sm:text-center bg-secondary px-5 py-3 rounded-2xl shadow-2xl flex text-white font-semibold">
                        <h1 className="w-full sm:w-[50%] flex justify-start">
                          Variant
                        </h1>
                        {/* <h1 className="w-[40%]">Description</h1> */}
                        <h1 className="w-full sm:w-[50%] flex justify-start">
                          Price
                        </h1>
                      </div>
                      <div className="w-[101.7%] h-auto mt-2 flex flex-col pr-3">
                        {props?.data?.variants?.map((item, indexVariant) => (
                          <div key={indexVariant}>
                            {item?.size?.map((size, indexSize) => {
                              return (
                                <ShowMoreSection
                                  indexSize={indexSize}
                                  indexVariant={indexVariant}
                                  size={size}
                                  key={indexSize}
                                  item={item}
                                  FashionCartItems={props?.FashionCartItems}
                                  data={props?.data}
                                  addToCart={props?.addToCart}
                                />
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {/* BUTTON */}
                <div className="flex  gap-3 w-full items-center justify-center ">
                  <div className={`flex gap-3`}>
                    <Button
                      variant={"secondary"}
                      onClick={() => props?.togglePopover()}
                    >
                      <i className="fa-solid fa-angle-left mr-2"></i>
                      Back
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
