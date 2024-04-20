/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import CustomToast from "../CustomToast";
import { useEffect, useState } from "react";

export default function FoodsKasirSection({ props, addToCart, CartItems }) {
  const [quantity, setQuantity] = useState(0);
  useEffect(() => {
    const exist = CartItems.find((item) => item._id === props._id);
    if (exist) {
      setQuantity(exist.qty);
    } else {
      setQuantity(0);
    }
  }, [CartItems]);

  console.log(props, "ANUITUANU");

  const handleAddToCart = ({ type, value }) => {
    if (props?.stock == 0) {
      toast.custom((t) => (
        <CustomToast
          t={t}
          message="Failed to add to cart, stock needed"
          type="failed"
        />
      ));
      return;
    }
    const { discountPrice, cashBackTotal } = props;

    const onCartData = CartItems.find((item) => item._id === props._id);

    let productData = {
      _id: props?._id,
      name: props.name,
      type: props.type,
      stock: props.stock,
      productPromos: props.productPromos,
      qty: 1,
      discountNominal: discountPrice,
      cashbackNominal: cashBackTotal,
      price: props.price,
    };
    console.log(productData, type, value);
    if (type === "inc") {
      if (onCartData) {
        if (onCartData.qty + 1 <= props.stock) {
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
    } else if (type === "change" && value >= 0) {
      setQuantity(value);
      addToCart(productData, value);
    }
    console.log("LAH KOK", type === "change", value, onCartData);
  };

  const handleQuantity = (e) => {
    let newValue = e.target.value;
    if (newValue === "") {
      setQuantity(0);
    } else {
      newValue = parseInt(newValue);
      if (!isNaN(newValue) && newValue >= 0 && newValue <= props.stock) {
        setQuantity(newValue);
        handleAddToCart({ type: "change", value: newValue });
      }
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        key={props._id}
        className={` ${
          props?.stock === 0
            ? "cursor-not-allowed rounded-b-xl"
            : "md:rounded-bl-2xl rounded-t-2xl"
        } ${
          CartItems.find((item) => item._id === props._id)
            ? " border-primaryThin shadow-lg group hover:shadow-xl"
            : " shadow-lg group hover:shadow-xl border-transparent"
        } ${
          quantity < props.stock &&
          "cursor-pointer active:scale-[0.995] active:opacity-[0.2]"
        } h-fit border-4 select-none group relative bg-section rounded-t-2xl  transition-all  text-[0.6rem] sm:text-sm md:mb-10`}
      >
        <div
          onClick={() => handleAddToCart({ type: "inc" })}
          className="w-full h-full z-[2] absolute left-0 top-0"
        ></div>
        <div
          className={`w-full bg-section-dark text-white opacity-[0.8] text-sm sm:text-2xl font-semibold h-full absolute left-0 top-0 z-[10] flex items-center justify-center pb-10 rounded-t-xl rounded-b-xl scale-[1.02] ${
            props?.stock > 0 && "hidden"
          } `}
        >
          out of stock
        </div>
        <div className="relative w-full overflow-hidden rounded-xl bg-gray-200 group-hover:opacity-[0.85] transition-all aspect-square">
          <div className="absolute h-full w-full z-[1] flex items-end">
            {props?.productPromos?.length > 0 &&
              props?.productPromos?.map((item, index) => {
                return (
                  <img
                    key={index}
                    src={item?.imageUrl?.url}
                    className="h-6 sm:h-12 mr-1 aspect-square object-cover object-center drop-shadow-xl rounded-sm"
                    alt=""
                  />
                );
              })}
          </div>
          <img
            src={props.imageUrl.url}
            alt={props.name}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="my-2 mx-4 flex flex-col justify-between">
          <div>
            <h3 className=" text-gray-700">
              <div>
                <span aria-hidden="true" className="absolute inset-0" />
                {props.name}
              </div>
            </h3>
          </div>
          <div className="flex justify-between">
            <p className=" font-medium ">{props.stock}</p>
            <p className=" font-semibold text-secondary">
              Rp. {props.price?.toLocaleString()}
            </p>
          </div>
          <div
            className={`md:hidden flex max-md:flex-col-reverse mt-3 items-center justify-center px-[1rem] w-full  rounded-bl-3xl rounded-br-3xl  z-[1]  gap-[0.5rem] ${
              props?.stock === 0 && "hidden"
            } `}
          >
            <div className="flex gap-[0.1rem]">
              <button
                onClick={() => handleAddToCart({ type: "change", value: 0 })}
                className={`px-3 py-2 text-white bg-section-dark rounded-md ${
                  quantity === 0 && "opacity-[0.6]"
                } transition-all duration-200 ease-in max-md:w-full md:mr-2 `}
              >
                <i className="fa-solid fa-rotate-right scale-[0.9]"></i>
              </button>
              <button
                onClick={() => handleAddToCart({ type: "dec" })}
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
                onClick={() => handleAddToCart({ type: "inc" })}
                className={`px-3 py-2 text-white bg-section-dark rounded-md ${
                  quantity === props.stock && "opacity-[0.6]"
                } transition-all duration-200 ease-in `}
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* INC */}
        <div
          className={`max-md:hidden flex max-md:flex-col-reverse items-center justify-center px-[1rem] md:px-[1.5rem] pt-[0.4rem] pb-[1rem] rounded-bl-3xl rounded-br-3xl bg-white absolute z-[1]  shadow-xl gap-[0.1rem] ${
            CartItems.find((item) => item._id === props._id)
              ? "  border-primaryThin shadow-lg group   hover:shadow-xl "
              : "border-transparent  shadow-lg group hover:shadow-xl"
          } border-t-0 border-4 max-md:-left-1 md:-right-1 -bottom-[5.5rem]  md:-bottom-[3.87rem] transition-all from-blue-200 ${
            props?.stock === 0 && "hidden"
          } `}
        >
          <button
            onClick={() => handleAddToCart({ type: "change", value: 0 })}
            className={`px-3 py-2 text-white bg-section-dark rounded-md ${
              quantity === 0 && "opacity-[0.6]"
            } transition-all duration-200 ease-in max-md:w-full md:mr-2 `}
          >
            <i className="fa-solid fa-rotate-right scale-[0.9]"></i>
          </button>
          <div className="flex gap-[0.1rem]">
            <button
              onClick={() => handleAddToCart({ type: "dec" })}
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
              onClick={() => handleAddToCart({ type: "inc" })}
              className={`px-3 py-2 text-white bg-section-dark rounded-md ${
                quantity === props.stock && "opacity-[0.6]"
              } transition-all duration-200 ease-in `}
            >
              +
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
