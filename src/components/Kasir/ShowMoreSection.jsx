/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CustomToast from "../CustomToast";

const ShowMoreSection = ({
  size,
  indexSize,
  FashionCartItems,
  item,
  data,
  indexVariant,
  addToCart,
}) => {
  // ATR
  const idOnCart =
    data?._id?.toString() + "?variant=" + indexVariant + ",size=" + indexSize;

  const [quantity, setQuantity] = useState(0);
  useEffect(() => {
    if (quantity > 0) return;
    const exist = FashionCartItems.find((item) => item.idOnCart === idOnCart);
    console.log(
      "testKOK",
      FashionCartItems[0]?.idOnCart,
      idOnCart,
      idOnCart == FashionCartItems[0]?.idOnCart
    );
    if (exist) {
      setQuantity(exist.qty);
    } else {
      setQuantity(0);
    }
  }, [FashionCartItems]);

  const isAdded = FashionCartItems?.some((product) => {
    if (product?.idOnCart === idOnCart) {
      return true;
    }
  });
  const { discountPrice, cashBackTotal } = size ?? {
    discountPrice: 0,
    cashBackTotal: 0,
  };
  const newSize = {
    ...size,
    indexSize,
  };
  const newVariant = {
    ...item,
    indexVariant,
  };

  let productData = {
    _id: data?._id?.toString(),
    idOnCart: idOnCart,
    name: data?.name,
    variants: data?.variants,
    variant: newVariant,
    size: newSize,
    sizes: item?.size,
    qty: 1,
    discountNominal: data?.discountNominal,
    discountPersentase: data?.discountPersentase,
    cashbackNominal: data?.cashbackNominal,
    cashbackPersentase: data?.cashbackPersentase,
    productPromos: data?.productPromos,
    price: size?.price,
  };
  const handleAddToCart = ({ type, value }) => {
    if (size?.stock == 0) {
      toast.custom((t) => (
        <CustomToast
          t={t}
          message="Failed to add to cart, stock needed"
          type="failed"
        />
      ));
      return;
    }

    const onCartData = FashionCartItems.find(
      (item) => item.idOnCart === idOnCart
    );

    if (type === "inc") {
      if (onCartData) {
        if (onCartData.qty + 1 <= size.stock) {
          productData.qty = onCartData.qty + 1;
          setQuantity(onCartData.qty + 1);
          addToCart(productData, onCartData.qty + 1);
        }
      } else {
        setQuantity(1);
        addToCart(productData, 1);
      }
    } else if (type === "dec") {
      if (onCartData && onCartData.qty > 0) {
        productData.qty = onCartData.qty - 1;
        setQuantity(onCartData.qty - 1);
        addToCart(productData, onCartData.qty - 1);
      }
    } else if (type === "change" && value >= 0 && value <= size.stock) {
      console.log("LAH KOK", type === "change", value, onCartData);
      setQuantity(value);
      addToCart(productData, value);
    }
  };

  const handleQuantity = (e) => {
    let newValue = e.target.value;

    if (newValue === "") {
      handleAddToCart({ type: "change", value: 0 });
    } else {
      newValue = parseInt(newValue);
      if (!isNaN(newValue)) {
        handleAddToCart({ type: "change", value: newValue });
      } else {
        handleAddToCart({ type: "change", value: 0 });
      }
    }
  };

  return (
    <>
      <button
        key={size.name}
        className={` ${
          isAdded ? " border-primaryThin" : "border-transparent"
        } ${
          size?.stock === 0 ? "cursor-not-allowed" : "active:scale-[0.995]"
        }  border-4 transition-all  duration-200 hover:shadow-xl min-h-[6rem] hover:inset-0 inset-[0.1rem] relative w-full bg-white mb-4 px-5 sm:py-6 py-3 rounded-2xl shadow-lg  flex text-primaryDark font-semibold items-center justify-center text-[0.8rem] select-none `}
      >
        {/* FUNTION */}
        <div
          onClick={() =>
            handleAddToCart({
              type: "inc",
              productData: productData,
            })
          }
          className="w-[75%]  absolute top-0 left-0 h-full"
        ></div>
        {/* STOCK NEEDED */}
        <div
          className={`w-full rounded-xl scale-x-[1.01] scale-y-[1.06] bg-section-dark text-white opacity-[0.9] text-sm sm:text-lg font-semibold h-full absolute left-0 top-0 z-[10] flex items-center justify-center ${
            size?.stock > 0 && "hidden"
          }`}
        >
          out of stock
        </div>

        {/* CONTENT */}
        <div className="flex w-[78%]">
          <h1 className=" w-full justify-center sm:w-[30%] my-auto flex flex-col h-full items-center text-center truncate">
            {item?.name}
            <div>{size?.size}</div>
            <div className={`${size?.stock < 10 && "text-red-500"}`}>
              {size?.stock} pcs
            </div>
          </h1>
          <h1
            className={`w-full max-sm:justify-center sm:w-[70%] h-full flex items-center my-auto justify-center font-medium flex-col gap-2 `}
          >
            <div className="flex flex-col leading-5 font-semibold items-center ">
              <div className="font-semibold flex flex-col items-center leading-4 justify-center">
                {discountPrice !== size?.price && (
                  <h1 className="text-purple">
                    Rp. {discountPrice?.toLocaleString()}
                  </h1>
                )}
                <h1
                  className={`${
                    discountPrice !== size?.price && "line-through opacity-70"
                  } text-secondary `}
                >
                  Rp. {size?.price?.toLocaleString()}
                </h1>
                {cashBackTotal !== 0 && (
                  <h1 className="text-orange">
                    +Rp. {cashBackTotal?.toLocaleString()}
                  </h1>
                )}
              </div>
            </div>
          </h1>
        </div>
        <div className="w-fit md:w-[22%]  flex flex-col-reverse gap-[0.1rem]">
          <button
            onClick={() =>
              handleAddToCart({
                type: "change",
                value: 0,
              })
            }
            className={`px-3 py-2 text-white bg-section-dark rounded-md transition-all duration-200 ease-in w-[100%] `}
          >
            <i className="fa-solid fa-rotate-right scale-[0.9]"></i>
          </button>
          <div className="flex gap-[0.1rem]">
            <button
              onClick={() =>
                handleAddToCart({
                  type: "dec",
                  productData: productData,
                })
              }
              className={`px-3 py-2 text-white bg-section-dark rounded-md ${
                quantity === 0 && "opacity-[0.6]"
              } transition-all duration-200 ease-in `}
            >
              -
            </button>
            <input
              type="text"
              className={`px-2 py-2 text-center text-white bg-section-dark rounded-md w-10  `}
              value={quantity}
              onChange={handleQuantity}
            />
            <button
              onClick={() =>
                handleAddToCart({
                  type: "inc",
                  productData: productData,
                })
              }
              className={`px-3 py-2 text-white bg-section-dark rounded-md ${
                quantity === size.stock && "opacity-[0.6]"
              } transition-all duration-200 ease-in `}
            >
              +
            </button>
          </div>
        </div>
      </button>
    </>
  );
};

export default ShowMoreSection;
