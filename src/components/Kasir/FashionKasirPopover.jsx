/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function FashionKasirPopover({
  item: props,
  indexOnCart,
  handleChange,
  FashionCartItems,
  handleFashionCartItems,
}) {
  console.log("DILEMPAR", props, FashionCartItems);
  // QUANTITY
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    const exist = FashionCartItems.find(
      (item) => item.idOnCart === props.idOnCart
    );
    if (exist) {
      setQuantity(exist.qty);
    }
  }, [FashionCartItems]);
  const [showDeleteItems, setShowDeleteItems] = useState(false);
  const handleDecrement = () => {
    const newValue = parseInt(quantity) - 1;
    if (
      typeof quantity !== "number" ||
      isNaN(quantity) ||
      quantity === "" ||
      isNaN(newValue)
    ) {
      setQuantity(1);
      handleChange({ value1: 1 }, "qty", indexOnCart);
    }
    if (quantity > 1) {
      setQuantity(newValue);
      handleChange({ value1: newValue }, "qty", indexOnCart);
    } else {
      setShowDeleteItems(true);
    }
  };

  const handleIncrement = () => {
    const newValue = parseInt(quantity) + 1;
    if (
      typeof quantity !== "number" ||
      isNaN(quantity) ||
      quantity === "" ||
      isNaN(newValue)
    ) {
      setQuantity(1);
      handleChange({ value1: 1 }, "qty", indexOnCart);
    }
    if (newValue <= props?.size?.stock) {
      setQuantity(newValue);
      handleChange({ value1: newValue }, "qty", indexOnCart);
    }
  };

  // HOVER PROMO
  const [hoverPromo, setHoverPromo] = useState("");
  const handleHoverPromo = (promo) => {
    setHoverPromo(promo);
  };

  const handleQuantity = (e) => {
    const newValue = e.target.value;
    if (newValue === "") {
      setQuantity("");
    } else if (
      !isNaN(newValue) &&
      newValue > 0 &&
      newValue <= props?.size?.stock
    ) {
      setQuantity(newValue);
      handleChange({ value1: newValue }, "qty", indexOnCart);
    }
  };

  const HargaComponent = () => {
    return (
      <div className="flex flex-col leading-4">
        {props?.size?.discountPrice != props?.size?.price && (
          <span className="text-purple ">
            Rp. {props?.size?.discountPrice?.toLocaleString()}
          </span>
        )}
        <span
          className={`text-secondary  ${
            props?.size?.price != props?.size?.discountPrice &&
            "line-through  opacity-[0.6]  w-full text-center"
          }`}
        >
          Rp. {props?.size?.price?.toLocaleString()}
        </span>
        {props?.size?.cashBackTotal > 0 && (
          <span className="text-orange  text-center">
            + Rp. {props?.size?.cashBackTotal?.toLocaleString()}
          </span>
        )}
      </div>
    );
  };

  const JumlahComponent = () => {
    return (
      <div className="flex flex-col leading-4">
        {props?.size?.discountPrice != props?.size?.price && (
          <span className="text-purple ">
            Rp. {(props?.size?.discountPrice * quantity)?.toLocaleString()}
          </span>
        )}
        <span
          className={`text-secondary  ${
            props?.size?.price != props?.size?.discountPrice &&
            "line-through  opacity-[0.6]  w-full text-center"
          }`}
        >
          Rp. {(props?.size?.price * quantity)?.toLocaleString()}
        </span>
        {props?.size?.cashBackTotal > 0 && (
          <span className="text-orange  text-center">
            + Rp. {(props?.size?.cashBackTotal * quantity)?.toLocaleString()}
          </span>
        )}
      </div>
    );
  };

  const [productVariant, setProductVariant] = useState("");
  const handleProductVariant = (e) => {
    const value = e.target.value;
    const variantAndSize = value.split(".");
    const variant = variantAndSize[0].split("=")[1];
    const size = variantAndSize[1].split("=")[1];

    const thisIdOnCart = props?._id + "?variant=" + variant + ",size=" + size;
    handleChange(
      { value1: variant, value2: size, value3: thisIdOnCart },
      "productType",
      indexOnCart
    );
    setProductVariant(value);
  };

  useEffect(() => {
    setProductVariant(
      "variant=" +
        props?.variant?.indexVariant +
        ".size=" +
        props?.size?.indexSize
    );
  }, [props]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        key={props._id}
        className="flex w-full text-sm  bg-section my-1 shadow-md py-7 sm:py-2 min-h-[5.5rem] text-primaryDark items-center rounded-2xl px-5 sm:px-2 relative inset-[0.2rem]"
      >
        <div className="w-[50%] sm:w-[40%] flex flex-col ">
          <div className="sm:hidden">
            {props?.productPromos?.length > 0 && (
              <div className="h-6 w-fit z-[1] flex items-end max-sm:mb-2">
                {props?.productPromos?.map((promo) => (
                  <div
                    onMouseDown={() => handleHoverPromo(promo._id)}
                    onMouseEnter={() => handleHoverPromo(promo._id)}
                    onMouseLeave={() => handleHoverPromo("")}
                    key={promo._id}
                    className="relative group"
                  >
                    <img
                      src={promo.imageUrl.url}
                      className="h-8 sm:h-7 mr-1 group-hover:scale-[1.05] border-2 group-hover:border-primaryThin aspect-square object-cover object-center drop-shadow-xl rounded-md"
                      alt=""
                    />
                    <AnimatePresence>
                      {hoverPromo === promo._id && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className=" text-center text-[0.7rem] sm:text-[0.8rem] p-3 z-[100] shadow-md bg-gradient-to-r from-primaryDark to-primaryThin text-white border-2 border-primaryNormal h-20 w-36 absolute -top-[5.3rem] left-0 flex flex-col items-center justify-center rounded-2xl"
                        >
                          <h1 className="drop-shadow-sm">{promo.name}</h1>
                          <h1 className="drop-shadow-sm">
                            {(promo.type === "diskon nominal" ||
                              promo.type === "cashback nominal") &&
                              "Rp. "}
                            {promo.value}
                            {(promo.type === "diskon persentase" ||
                              promo.type === "cashback persentase") &&
                              "%"}
                          </h1>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            )}{" "}
          </div>
          <div>
            <select
              name="variants"
              id="variants"
              onChange={handleProductVariant}
              value={productVariant}
            >
              {props?.variants?.map((variant, variantIndex) => {
                return variant?.size?.map((size, sizeIndex) => {
                  const thisIdOnCart =
                    props?._id +
                    "?variant=" +
                    variantIndex +
                    ",size=" +
                    sizeIndex;

                  const isOnCart = FashionCartItems.some(
                    (product) => product?.idOnCart === thisIdOnCart
                  );
                  return (
                    <option
                      key={{ variantIndex, sizeIndex }}
                      value={"variant=" + variantIndex + ".size=" + sizeIndex}
                      disabled={isOnCart ? true : false}
                      className="text-sm font-medium"
                    >
                      {variant.name} - {size.size}
                    </option>
                  );
                });
              })}
            </select>
          </div>
          {props.name} <br />
          <div className="max-sm:hidden">
            {props?.productPromos?.length > 0 && (
              <div className="h-6 w-fit z-[1] flex items-end">
                {props?.productPromos?.map((promo) => (
                  <div
                    onMouseDown={() => handleHoverPromo(promo._id)}
                    onMouseEnter={() => handleHoverPromo(promo._id)}
                    onMouseLeave={() => handleHoverPromo("")}
                    key={promo._id}
                    className="relative group"
                  >
                    <img
                      src={promo.imageUrl.url}
                      className="h-6 sm:h-7 mr-1 group-hover:scale-[1.05] border-2 group-hover:border-primaryThin aspect-square object-cover object-center drop-shadow-xl rounded-md"
                      alt=""
                    />
                    <AnimatePresence>
                      {hoverPromo === promo._id && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className=" text-center text-[0.7rem] sm:text-[0.8rem] p-3 z-[100] shadow-md bg-gradient-to-r from-primaryDark to-primaryThin text-white border-2 border-primaryNormal h-20 w-36 absolute -top-[5.3rem] left-0 flex flex-col items-center justify-center rounded-2xl"
                        >
                          <h1 className="drop-shadow-sm">{promo.name}</h1>
                          <h1 className="drop-shadow-sm">
                            {(promo.type === "diskon nominal" ||
                              promo.type === "cashback nominal") &&
                              "Rp. "}
                            {promo.value}
                            {(promo.type === "diskon persentase" ||
                              promo.type === "cashback persentase") &&
                              "%"}
                          </h1>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            )}{" "}
          </div>
          <div className="sm:hidden w-fit flex flex-col leading-4 font-semibold">
            <HargaComponent />
          </div>
        </div>
        <div className="w-[20%] max-sm:hidden flex items-center font-semibold text-end drop-shadow-sm">
          <HargaComponent />
        </div>
        <div className="w-[20%] max-sm:hidden flex items-center font-semibold text-end drop-shadow-sm">
          <JumlahComponent />
        </div>
        <div className="w-[50%] sm:w-[20%]  pr-2  flex flex-col justify-end items-end">
          {/*  */}
          <h1
            className={`${
              props?.size?.stock < 10 && "text-red-500"
            } font-semibold `}
          >
            Stock: {props?.size?.stock}
          </h1>
          <div className="w-fit flex items-center mb-2 relative gap-[0.1rem] ">
            <button
              onClick={handleDecrement}
              className={`px-3 py-2 text-white bg-section-dark rounded-md  transition-all duration-200 ease-in `}
            >
              -
            </button>
            <input
              type="text"
              className={`px-2 py-2 text-center text-white bg-section-dark rounded-md w-10 `}
              value={quantity}
              onChange={handleQuantity}
            />
            <button
              onClick={handleIncrement}
              className={`px-3 py-2 text-white bg-section-dark rounded-md ${
                quantity === props?.size.stock && "opacity-[0.6]"
              } transition-all duration-200 ease-in `}
            >
              +
            </button>
            <AnimatePresence>
              {showDeleteItems && (
                <>
                  <div
                    onClick={() => setShowDeleteItems(false)}
                    className="w-full h-full fixed  left-0 top-0"
                  ></div>
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={() =>
                      handleFashionCartItems({ idOnCart: props?.idOnCart })
                    }
                    className="text-white cursor-pointer flex flex-col hover:scale-[0.95] transition-all duration-300 items-center justify-center bg-section-dark h-10 w-20 absolute -left-[5.2rem] rounded-full"
                  >
                    Delete?
                  </motion.button>
                </>
              )}
            </AnimatePresence>
          </div>
          <div className="sm:hidden w-fit flex flex-col leading-4 font-semibold">
            <JumlahComponent />
          </div>
        </div>
      </motion.div>
    </>
  );
}
