/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function FashionKasirSection({
  props,
  toggleShowMore,
  FashionCartItems,
}) {
  let priceRange = "";
  let lowestPrice = Infinity;
  let highestPrice = -Infinity;
  props?.variants?.forEach((variant) => {
    for (let i = 0; i < variant?.size?.length; i++) {
      const productPrice = variant?.size[i]?.price;
      if (productPrice < lowestPrice) {
        lowestPrice = productPrice;
      }
      if (productPrice > highestPrice) {
        highestPrice = productPrice;
      }
    }
  });

  if (lowestPrice === highestPrice) {
    priceRange = highestPrice?.toLocaleString();
  } else {
    priceRange = `${lowestPrice?.toLocaleString()}`;
  }

  const [isIncluded, setIsIncluded] = useState(false);

  useEffect(() => {
    let isAdded = FashionCartItems?.some((product) => {
      if (product?._id === props?._id) {
        return true;
      }
    });
    setIsIncluded(isAdded);
  }, [FashionCartItems]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => {
          toggleShowMore({
            data: props,
          });
        }}
        key={props._id.toString()}
        className={`${
          isIncluded
            ? "border-4 border-primaryThin opacity-[0.6] scale-[0.95] shadow-lg group hover:shadow-xl"
            : " shadow-lg group hover:shadow-xl"
        } rounded-2xl m-1 group relative  bg-section inset-[0.1rem] hover:inset-0 overflow-hidden transition-all `}
      >
        <div className=" w-full relative overflow-hidden rounded-b-2xl bg-gray-200 group-hover:opacity-[0.85]  transition-all aspect-square">
          <div className="absolute h-full w-full z-[1] flex items-end">
            {props?.productPromos?.map((item, index) => (
              <img
                key={index}
                src={item?.imageUrl?.url}
                className="h-6 sm:h-12 mr-1 aspect-square object-cover object-center drop-shadow-xl rounded-sm"
                alt=""
              />
            ))}
          </div>
          <img
            src={props?.imageUrl[0]?.url}
            alt={props.name}
            className="h-full w-full object-cover absolute object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="my-2 mx-4 flex flex-col justify-between">
          <div>
            <h3 className="text-[0.6rem] sm:text-sm text-gray-700">
              <div className="flex truncate">
                <h1 className="font-semibold mr-1">{props.name}</h1>-{" "}
                {props.brand}
              </div>
            </h3>
          </div>
          <div className="flex justify-end">
            <p className="text-[0.6rem]  sm:text-sm font-semibold text-secondary">
              Rp. {priceRange}
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
}
