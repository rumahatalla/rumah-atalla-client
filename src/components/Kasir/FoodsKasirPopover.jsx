/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function FoodsKasirPopover({
  item: props,
  indexOnCart,
  setCartItems,
  cartItems,
  addToCart,
}) {
  // QUANTITY
  const [quantity, setQuantity] = useState(1);
  const [showDeleteItems, setShowDeleteItems] = useState(false);
  useEffect(() => {
    const exist = cartItems.find((item) => item._id === props._id);
    if (exist) {
      setQuantity(exist.qty);
    }
  }, [cartItems]);

  console.log("PROPROP", props);

  const handleDecrement = () => {
    const newValue = parseInt(quantity) - 1;
    if (
      typeof quantity !== "number" ||
      isNaN(quantity) ||
      quantity === "" ||
      isNaN(newValue)
    ) {
      setQuantity(1);
      handleChange(1);
    }
    if (quantity > 1) {
      setQuantity(quantity - 1);
      handleChange(quantity - 1);
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
      handleChange(1);
    }
    if (newValue <= props.stock) {
      setQuantity(newValue);
      handleChange(newValue);
    }
  };

  const handleQuantity = (e) => {
    let newValue = e.target.value;
    if (newValue === "") {
      setQuantity("");
    } else {
      newValue = parseInt(newValue);
      if (!isNaN(newValue) && newValue > 0 && newValue <= props?.stock) {
        setQuantity(newValue);
        handleChange(newValue);
      }
    }
  };

  const handleChange = (value) => {
    let newCartItems = [...cartItems];
    newCartItems[indexOnCart] = {
      ...props,
      qty: value,
    };
    setQuantity(value);
    setCartItems(newCartItems);
  };

  // HOVER PROMO
  const [hoverPromo, setHoverPromo] = useState("");

  // COMA
  function addDotsToNumber(number) {
    return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  const handleHoverPromo = (promo) => {
    setHoverPromo(promo);
  };

  const HargaComponent = () => {
    return (
      <>
        <div className="flex flex-col leading-3 sm:leading-4 ">
          {props?.discountNominal != props.price && (
            <span className="text-purple ">
              Rp. {addDotsToNumber(props?.discountNominal)}
            </span>
          )}
          <span
            className={`text-secondary  ${
              props.price != props?.discountNominal &&
              "line-through  opacity-[0.6]  w-full text-center"
            }`}
          >
            Rp. {addDotsToNumber(props.price)}
          </span>
          {props?.cashbackNominal > 0 && (
            <span className="text-orange  text-center">
              + Rp. {addDotsToNumber(props?.cashbackNominal)}
            </span>
          )}
        </div>
      </>
    );
  };

  console.log(
    "INI SOAL ITO",
    props?.discountNominal,
    props?.cashbackNominal,
    props?.price,
    quantity
  );

  const JumlahComponent = () => {
    return (
      <>
        <div className="flex flex-col leading-3 sm:leading-4 ">
          {props?.discountNominal != props.price && (
            <span className="text-purple ">
              Rp. {addDotsToNumber(props?.discountNominal * quantity)}
            </span>
          )}
          <span
            className={`text-secondary  ${
              props.price != props?.discountNominal &&
              "line-through  opacity-[0.6]  w-full text-center"
            }`}
          >
            Rp. {addDotsToNumber(props.price * quantity)}
          </span>
          {props?.cashbackNominal > 0 && (
            <span className="text-orange  text-center">
              + Rp. {addDotsToNumber(props?.cashbackNominal * quantity)}
            </span>
          )}
        </div>
      </>
    );
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        key={props._id}
        className="flex w-full  bg-section my-3 shadow-xl py-4 min-h-[7rem] text-primaryDark  text-[0.7rem] sm:text-sm items-center rounded-2xl px-2 relative inset-[0.2rem]"
      >
        <div className="w-[50%] gap-3 sm:w-[40%] flex flex-col justify-between">
          <div>
            {props?.productPromos?.length > 0 && (
              <div className="h-6 w-full z-[1] flex items-end">
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
                      className="h-7 sm:h-7 mr-1 group-hover:scale-[1.05] border-2 group-hover:border-primaryThin aspect-square object-cover object-center drop-shadow-xl rounded-md"
                      alt=""
                    />
                    <AnimatePresence>
                      {hoverPromo === promo._id && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className=" text-center text-[0.7rem] sm:text-[0.8rem] p-3 z-[100] shadow-md bg-gradient-to-r from-primaryDark to-primaryThin text-white border-2 border-primaryNormal h-20 w-36 absolute -top-[0.75rem] left-8 flex flex-col items-center justify-center rounded-2xl"
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
            {props.name}
          </div>
          <div className="sm:hidden w-fit pr-3">
            <HargaComponent />
          </div>
        </div>
        <div className="w-[20%] max-sm:hidden flex items-center font-semibold  text-end  drop-shadow-sm">
          <HargaComponent />
        </div>
        <div className="w-[20%] max-sm:hidden flex items-center font-semibold  text-end  drop-shadow-sm">
          <JumlahComponent />
        </div>

        <div className="w-[50%] sm:w-[20%] flex flex-col items-end sm:items-center justify-between">
          <h1
            className={`${props?.stock < 10 && "text-red-500"} font-semibold `}
          >
            Stock: {props?.stock}
          </h1>
          <div className="w-fit flex items-center mb-2 relative gap-[0.1rem] ">
            <button
              onClick={handleDecrement}
              className="px-3  py-2 text-white bg-section-dark rounded-md "
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
              className="px-3  py-2 text-white bg-section-dark rounded-md  "
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
                    onClick={() => addToCart(props, 0)}
                    className="text-white cursor-pointer flex flex-col hover:scale-[0.95] transition-all duration-300 items-center justify-center bg-section-dark h-10 w-20 absolute -left-[5.2rem] rounded-full"
                  >
                    Delete?
                  </motion.button>
                </>
              )}
            </AnimatePresence>
          </div>
          {/* <div>
            <button
              onClick={handleDecrement}
              className="px-2 py-1 border-2 border-gray-300"
            >
              -
            </button>
            <input
              type="text"
              className={`px-2 py-2 border-y-2 w-10 border-gray-300 text-center `}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <button
              onClick={handleIncrement}
              className="px-2 py-1 border-2 border-gray-300 "
            >
              +
            </button>
          </div> */}
          <div className="sm:hidden w-fit pr-3">
            <JumlahComponent />
          </div>
        </div>
      </motion.div>
    </>
  );
}
