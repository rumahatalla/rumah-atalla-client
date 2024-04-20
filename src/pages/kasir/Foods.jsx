/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import FoodsKasirPopover from "../../components/Kasir/FoodsKasirPopover";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import CustomToast from "../../components/CustomToast";
import Title from "../../components/Title";
import Button from "../../components/Button";
import Title2 from "../../components/Title2";
import BlackScreenPopover from "../../components/BlackScreenPopover";
import LoadingPopover from "../../components/LoadingPopover";
import LogoPopover from "../../components/LogoPopover";
import TextField from "../../components/TextField";
import FoodsHeadPopover from "../../components/Kasir/FoodsHeadPopover";
import BuyButton from "../../components/Kasir/BuyButton";
import SearchBar from "../../components/SearchBar";
import FashionKasirSectionSkeleton from "../../components/Kasir/FashionKasirSectionSkeleton";
import FoodsKasirSection from "../../components/Kasir/FoodsKasirSection";
import ChangePageButton from "../../components/ChangePageButton";
import { useReactToPrint } from "react-to-print";
import PaymentMethod from "../../components/Kasir/PaymentMethod";
import PrintAndBuy from "../../components/Kasir/PrintAndBuy";
import Empty from "../../components/Empty";

export default function FoodsKasir() {
  const DBURL = import.meta.env.VITE_APP_DB_URL;

  // FETCHHHH
  const [isLoadingFetch, setIsLoadingFetch] = useState(true);
  // FETCH FOODS
  const [foodsProducts, setFoodsProducts] = useState([]);
  const [triger, setTriger] = useState(1);
  const fetchFoodsProducts = async () => {
    await axios.get(DBURL + "/foods").then((res) => {
      setFoodsProducts(res.data);
      setTriger((prevData) => prevData + 1);
      setIsLoadingFetch(false);
    });
  };
  // FETCH PROMO
  const [promos, setPromos] = useState([]);
  const fetchPromos = async () => {
    await axios
      .get(DBURL + "/promos/", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (promos.length === 0) {
          setPromos(res.data.filter((item) => item.for === "foods"));
        }
      });
  };
  // FETCH TRANSACTIONS
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (promos.length === 0) {
      fetchPromos();
    }
    if (foodsProducts.length === 0) {
      fetchFoodsProducts();
    }
  }, []);

  // FOODS / DRINK
  const [totalPrice, setTotalPrice] = useState({
    normalPrice: 0,
    discountPrice: 0,
    cashbackPrice: 0,
  });
  const [page, setPage] = useState("foods");

  // CART
  const [productsForm, setProductsForm] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (productsForm.length <= 0 && showPopover) {
      togglePopover();
    }
  }, [productsForm]);

  const addToCart = (item, value = null) => {
    //  ITEM IS PRODUCT DATA, VALUE IS QTY VALUE
    console.log("ITEMMMM", item, value);

    // FIND THE PRODUCT IN CARTITEMS
    const itemOnCartIndex = cartItems.findIndex(
      (product) => product?._id === item?._id
    );

    // MAKE UPDATED CART ITEMS
    let updatedCartItems = [...cartItems];

    // CHECK IF THE PRODUCT IS EXIST ON THE CART OR NOT, IF YES THEN
    if (itemOnCartIndex >= 0) {
      // CHECK VALUE PARAM, IF THE VALUE IS 0 THEN REMOVE IT ON THE CART ITEMS
      if (value === 0) {
        updatedCartItems[itemOnCartIndex].qty = 0;
        updatedCartItems.splice(itemOnCartIndex, 1);
        setCartItems(updatedCartItems);
        return;
      }

      // IF NOT, THEN CHANGE THE QTY VALUE OF THE ITEM ON CART
      updatedCartItems[itemOnCartIndex].qty = value;
      setCartItems(updatedCartItems);
      return;
    }

    // IF THE PRODUCT DOESNT EXIST ON THE CART, THEN ADD IT INTO THE CART
    setCartItems([...cartItems, item]);
  };

  // HANDLE BUY
  const [buyer, setBuyer] = useState("");

  // LOADING
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    buyer: "",
    kasir: "",
    kasirId: "",
    type: "foods",
    store: "web",
    products: [],
    totalAmount: 0,
    qty: 0,
    status: "successed",
  });
  const token = localStorage.getItem("token");
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      products: productsForm,
      buyer: buyer,
      kasir: user?.username,
      kasirId: user?.userId,
      totalAmount: totalPrice.normalPrice,
      totalWithDiscount: totalPrice.discountPrice,
      totalCashback: totalPrice.totalCashback,
    }));
  }, [productsForm, buyer, totalPrice]);

  const [printableTransactionData, setPrintableTransactionData] =
    useState(null);

  const handleBuy = async () => {
    console.log("BUYBUY", formData, totalPrice);
    setIsLoading(true);
    await axios
      .post(DBURL + "/transactions", formData, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setTimeout(() => {
          setPrintAndBuyPopover(true);
        }, 1000);
        // updateUser();
        toast.custom((t) => (
          <CustomToast t={t} message="Transaction successed" type="success" />
        ));
        setFormData({
          buyer: "",
          kasir: "",
          kasirId: "",
          type: "foods",
          store: "web",
          products: [],
          totalAmount: 0,
          qty: 0,
          status: "successed",
        });
        fetchFoodsProducts();
        setCartItems([]);
        setBuyer("");
        setPaymentVia("");
        setPopoverPage(1);
        setTotalPrice({
          normalPrice: 0,
          discountPrice: 0,
          cashbackPrice: 0,
        });
        setPrintableTransactionData(res.data);
        togglePopover();
      })
      .catch((error) => {
        toast.custom((t) => (
          <CustomToast t={t} message="Transaction failed" type="failed" />
        ));
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (cartItems.length <= 0 && showPopover) {
      togglePopover();
    }
  }, [cartItems]);

  //   POPOVER
  const [showPopover, setShowPopover] = useState(false);
  const togglePopover = () => {
    setShowPopover(!showPopover);
  };

  useEffect(() => {
    const newFoodsProducts = foodsProducts.map((product) => {
      let discountNominal = 0;
      let discountPersentase = 0;
      let cashbackNominal = 0;
      let cashbackPersentase = 0;
      let discountPrice = 0;
      let cashBackTotal = 0;
      let productPromos = [];
      promos.map((promo, i) => {
        let included = false;
        const currentDate = new Date();

        if (
          promo.products.includes(product._id) &&
          new Date(promo.date.startDate) < currentDate &&
          new Date(promo.date.endDate) > currentDate
        ) {
          included = true;
        }
        console.log("INCLUD KAHH" + promo.name, included);
        if (included) {
          productPromos.push(promo);
          if (promo.type === "diskon persentase") {
            discountPersentase += promo.value;
          } else if (promo.type === "diskon nominal") {
            discountNominal += promo.value;
          } else if (promo.type === "cashback nominal") {
            cashbackNominal += promo.value;
          } else {
            cashbackPersentase += promo.value;
          }
        }
        discountPrice =
          product.price -
          discountNominal -
          (product.price * discountPersentase) / 100;
        cashBackTotal =
          cashbackNominal + (product.price * cashbackPersentase) / 100;
      });
      return {
        ...product,
        discountPrice,
        cashBackTotal,
        productPromos: productPromos,
        discountNominal: discountNominal,
        discountPersentase: discountPersentase,
        cashbackNominal: cashbackNominal,
        cashbackPersentase: cashbackPersentase,
      };
    });
    setFoodsProducts(newFoodsProducts);
  }, [promos, triger]);

  useEffect(() => {
    let newProductForm = [];
    cartItems.map((product) => {
      const newProduct = {
        productId: product._id,
        name: product.name,
        qty: product.qty,
        stock: product.stock,
        price: product.price * product.qty,
        cashback: product.cashbackNominal * product.qty,
        discount: product.discountNominal * product.qty,
        promo: product.productPromos,
      };
      newProductForm.push(newProduct);
    });
    setProductsForm(newProductForm);
  }, [cartItems]);

  useEffect(() => {
    const totalPrice = productsForm.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price;
    }, 0);
    const totalDiscount = productsForm.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.discount;
    }, 0);
    const totalCashback = productsForm.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.cashback;
    }, 0);
    setTotalPrice({
      normalPrice: totalPrice,
      discountPrice: totalDiscount,
      totalCashback: totalCashback,
    });
  }, [productsForm]);

  //   FILTER
  const [searchValue, setSearchValue] = useState("");
  const filteredFoods = foodsProducts.filter(
    (item) =>
      item.type === "foods" &&
      item.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const filteredDrinks = foodsProducts.filter(
    (item) =>
      item.type === "drinks" &&
      item.name.toLowerCase().includes(searchValue.toLowerCase())
  );
  const [paymentVia, setPaymentVia] = useState("");
  const [popoverPage, setPopoverPage] = useState(1);

  const hanldeBackPopover = () => {
    if (popoverPage === 1) {
      togglePopover();
    } else {
      setPopoverPage((prev) => prev - 1);
    }
  };

  const hanldeNextPopover = () => {
    if (popoverPage === 2 && paymentVia === "") {
      toast.custom((t) => (
        <CustomToast
          t={t}
          message="Please choose payment method"
          type="failed"
        />
      ));
      return;
    }
    if (
      popoverPage === 3 &&
      paymentVia !== "Cash" &&
      (formData?.buktiTransfer?.url === "" ||
        formData?.nominal === 0 ||
        formData?.atasNamaRekening === "")
    ) {
      toast.custom((t) => (
        <CustomToast t={t} message="Please fill the form" type="failed" />
      ));
      return;
    }

    if (popoverPage === 3) {
      handleBuy();
    } else {
      setPopoverPage((prev) => prev + 1);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      console.log("INI IMAGE", file, reader);
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          buktiTransfer: {
            url: reader.result,
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (paymentVia === "BCA") {
      setFormData((prevData) => ({
        ...prevData,
        rekening: "1490238286",
        paymentVia: "BCA",
      }));
    } else if (paymentVia === "Mandiri") {
      setFormData((prevData) => ({
        ...prevData,
        rekening: "1490238286",
        paymentVia: "Mandiri",
      }));
    } else if (paymentVia === "Cash") {
      setFormData((prevData) => ({
        ...prevData,
        paymentVia: "Cash",
      }));
    }
  }, [paymentVia]);

  const [printAndBuyPopover, setPrintAndBuyPopover] = useState(false);
  const printableRef = useRef(null);

  function generatePrintableTransaction(transaction) {
    console.log("LALAs", transaction);
    let printable = (
      <div className="flex flex-col gap-[0.2rem]">
        <div className="h-10 scale-[1.3] mb-1 flex items-center justify-center">
          <img
            src="/LogoBlack.png"
            className="pointer-events-none w-[2rem] aspect-square"
            alt="Logo"
          />
          <div className="uppercase ml-1 text-xs mb-[0.4rem] text-primaryNormal hidden sm:block">
            <h1 className="-mb-[0.3rem]">Rumah</h1>
            <h1 className="font-bold">Atalla</h1>
            <div className="w-[120%] h-[0.1rem] -my-[0.15rem] rounded-md bg-primaryNormal" />
          </div>
        </div>
        <div>Jln. Brigjen Katamso No.19 Wonokarto, Wonogiri</div>
        <div>No. Telp: 0812-1234-5678</div>
        <div>---------------------</div>
        <div>{new Date(transaction.createdAt)?.toLocaleString()}</div>
        <div>ID Transaksi: {transaction._id}</div>
        <div className="flex justify-between w-full mt-2">
          <span>Atas Nama:</span>
          <span>{transaction.buyer}</span>
        </div>
        <div className="flex justify-between w-full">
          <span>Kasir:</span>
          <span>{transaction.kasir}</span>
        </div>
        <div className="flex justify-between w-full">
          <span>Pembayaran:</span>
          <span>{transaction?.paymentVia || "Cash"}</span>
        </div>
        {transaction.paymentVia && transaction.paymentVia !== "Cash" && (
          <>
            <div className="flex justify-between w-full">
              <span>Atas Nama Rekening:</span>
              <span>{transaction.atasNamaRekening}</span>
            </div>
            <div className="flex justify-between w-full">
              <span>Rekening Penerima:</span>
              <span>{transaction.rekening}</span>
            </div>
          </>
        )}
        <div>---------------------</div>
        {transaction?.products?.map((product, index) => (
          <div key={index} className="flex flex-col w-full mb-3">
            <span className="flex justify-start text-start">
              {index + 1}. {product.name}
            </span>
            <div className="flex justify-between w-full pl-3">
              <span>
                {product.qty} x{" "}
                {(product.discount / product.qty)?.toLocaleString()} :{" "}
              </span>
              <span>{product.discount?.toLocaleString()}</span>
            </div>
          </div>
        ))}
        <div>---------------------</div>
        <div className="flex justify-between w-full">
          <span>Harga:</span>
          <span>Rp. {transaction.totalAmount?.toLocaleString()}</span>
        </div>
        <div className="flex justify-between w-full">
          <span>Diskon: </span>
          <span>
            Rp.
            {(
              transaction.totalWithDiscount - transaction.totalAmount
            )?.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between w-full">
          <span>Cashback:</span>
          <span>Rp. {transaction.totalCashback?.toLocaleString()}</span>
        </div>
        <div className="flex justify-between w-full">
          <span>Total:</span>
          <span>
            Rp. {transaction.totalWithDiscount?.toLocaleString()}{" "}
            {transaction.totalCashback > 0 &&
              `(Rp. ${
                transaction.totalWithDiscount - transaction.totalCashback
              })`}
          </span>
        </div>
        <div className="flex justify-between w-full">
          <span>Nominal dibayar:</span>
          <span>Rp. {transaction?.nominal?.toLocaleString()}</span>
        </div>
        {transaction?.paymentVia === "Cash" && (
          <div className="flex justify-between w-full">
            <span>Kembalian:</span>
            <span>
              Rp.{" "}
              {(
                transaction?.nominal - transaction?.totalWithDiscount
              )?.toLocaleString()}
            </span>
          </div>
        )}
        <div>---------------------</div>
        <div>Terimakasih Telah Berbelanja Di Rumah Atalla</div>
        <div>Kepuasan Anda Adalah Prioritas Kami</div>
      </div>
    );

    return printable;
  }

  const [printableContent, setPrintableContent] = useState(null);

  const handlePrint = useReactToPrint({
    content: () => printableRef.current,
  });

  const [isPrint, setIsPrint] = useState(false);
  const handleBuyAndPrint = () => {
    setPrintAndBuyPopover(false);
    setIsPrint(true);
  };

  useEffect(() => {
    if (printableTransactionData) {
      const content = generatePrintableTransaction(printableTransactionData);
      setPrintableContent(content);
    }
  }, [printableTransactionData]);

  useEffect(() => {
    if (printableContent !== null && isPrint) {
      console.log(printableContent, isPrint, "BOLOO");
      handlePrint();
      setIsPrint(false);
      setPrintableContent(null);
    }
  }, [isPrint]);
  return (
    <>
      {/* POPOVER */}
      <AnimatePresence>
        {showPopover && (
          <div className="fixed z-[1000] top-0 left-0 w-screen h-screen flex items-center justify-center">
            <BlackScreenPopover
              onClick={() => togglePopover()}
              isLoading={isLoading}
            />
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className={`bg-thirdyThin flex flex-col justify-between relative w-[40rem] h-[47rem] max-h-[95%] overflow-hidden pt-0  p-5 z-[1] rounded-2xl shadow-lg ${
                isLoading && "pointer-events-none"
              } `}
            >
              {/* LOADING */}
              {isLoading && <LoadingPopover />}

              {/* LOGO */}
              <div className="h-fit ">
                <LogoPopover />
              </div>

              {/* FORM */}
              <div className="h-[70%]">
                {popoverPage === 1 ? (
                  <>
                    {/* ITEM */}
                    <div className="w-full h-[100%] overflow-y-scroll overflow-x-hidden">
                      {cartItems.length > 0 && (
                        <>
                          {cartItems.findIndex(
                            (item) => item.type == "foods"
                          ) >= 0 && (
                            <>
                              {/* TITLE */}
                              <Title className={"my-3"} title="Foods" />
                              {/* TOP */}
                              <FoodsHeadPopover />

                              {cartItems.map((item, index) => {
                                if (item.type == "drinks") return;
                                return (
                                  <div key={item._id}>
                                    <FoodsKasirPopover
                                      indexOnCart={index}
                                      addToCart={addToCart}
                                      setCartItems={setCartItems}
                                      item={item}
                                      productsForm={productsForm}
                                      cartItems={cartItems}
                                    />
                                  </div>
                                );
                              })}
                            </>
                          )}
                          {cartItems.findIndex(
                            (item) => item.type == "drinks"
                          ) >= 0 && (
                            <>
                              {/* TITLE */}
                              <Title className={"my-3"} title="Drinks" />
                              {/* TOP */}
                              <FoodsHeadPopover />

                              {cartItems.map((item, index) => {
                                if (item.type == "foods") return;
                                return (
                                  <div key={item._id}>
                                    <FoodsKasirPopover
                                      indexOnCart={index}
                                      addToCart={addToCart}
                                      item={item}
                                      productsForm={productsForm}
                                      cartItems={cartItems}
                                    />
                                  </div>
                                );
                              })}
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </>
                ) : popoverPage === 2 ? (
                  <>
                    <div className="bg-[rgba(0,0,0,0.2] h-full w-full">
                      <Title2
                        title={"Select Payment Method"}
                        className={"my-5 mx-3"}
                      />
                      <PaymentMethod
                        paymentVia={paymentVia}
                        setPaymentVia={setPaymentVia}
                      />
                    </div>
                  </>
                ) : popoverPage === 3 && paymentVia === "Cash" ? (
                  <div className="flex flex-col gap-2 mx-3">
                    <TextField
                      name="buyer"
                      onName={"Atas nama"}
                      placeholder={"example"}
                      value={buyer}
                      onChange={(e) => setBuyer(e.target.value)}
                    />
                    <TextField
                      name={"Nominal"}
                      value={formData?.nominal}
                      onChange={(e) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          nominal: e.target.value,
                        }))
                      }
                      placeholder={totalPrice.discountPrice}
                      type={"number"}
                      className={"pl-[3.5rem]"}
                    >
                      <div className="absolute left-5  bottom-3 font-semibold">
                        Rp.{" "}
                      </div>
                    </TextField>
                    <div
                      className={`font-semibold text-sm flex gap-2 w-full items-center pt-5 ${
                        formData?.nominal < totalPrice?.discountPrice &&
                        "text-red-500"
                      } `}
                    >
                      <h1>Kembalian: </h1>
                      <h1>
                        Rp.
                        {formData?.nominal
                          ? (
                              formData?.nominal - totalPrice?.discountPrice
                            )?.toLocaleString()
                          : 0}
                      </h1>
                    </div>
                  </div>
                ) : (
                  popoverPage === 3 &&
                  paymentVia !== "Cash" && (
                    <>
                      <div className="flex flex-col gap-2 mx-3">
                        <div className="grid grid-cols-2 gap-2">
                          <TextField
                            name="buyer"
                            onName={"Atas nama"}
                            placeholder={"example"}
                            value={buyer}
                            onChange={(e) => setBuyer(e.target.value)}
                          />
                          <TextField
                            name={"Atas Nama Rekening"}
                            value={formData?.atasNamaRekening}
                            onChange={(e) =>
                              setFormData((prevData) => ({
                                ...prevData,
                                atasNamaRekening: e.target.value,
                              }))
                            }
                            placeholder={"example"}
                            type={"text"}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <TextField
                            name={"Jumlah Transfer"}
                            value={formData?.nominal}
                            onChange={(e) =>
                              setFormData((prevData) => ({
                                ...prevData,
                                nominal: e.target.value,
                              }))
                            }
                            placeholder={totalPrice.discountPrice}
                            type={"number"}
                            className={"pl-[3.5rem]"}
                          >
                            <div className="absolute left-5  bottom-3 font-semibold">
                              Rp.{" "}
                            </div>
                          </TextField>
                          <TextField
                            name={"Transfer Ke"}
                            type={"text"}
                            value={formData?.rekening}
                            onChange={(e) =>
                              setFormData((prevData) => ({
                                ...prevData,
                                rekening: e.target.value,
                              }))
                            }
                            disabled
                            className={"pl-[3.5rem]"}
                          >
                            <div className="absolute left-5  bottom-3">
                              <img
                                src={
                                  paymentVia === "Cash"
                                    ? "/Cash.png"
                                    : paymentVia === "BCA"
                                    ? "/BCA.png"
                                    : paymentVia === "Mandiri"
                                    ? "/Mandiri.png"
                                    : ""
                                }
                                className="h-5 scale-[1.8]"
                                alt=""
                              />
                            </div>
                          </TextField>
                        </div>

                        {/* BUKTI TRANSFER */}
                        <div>
                          <label
                            className="sm:text-base text-sm drop-shadow-sm font-semibold text-primaryNormal capitalize"
                            htmlFor={"Bukti Transfer"}
                          >
                            {" "}
                            Bukti Transfer
                          </label>
                          <div className=" w-full bg-white relative cursor-pointer aspect-video flex flex-col justify-center items-center border-2 border-dashed border-blue-400 rounded-2xl overflow-hidden">
                            <input
                              type="file"
                              accept="image/*"
                              name="imageFile"
                              onChange={handleImageUpload}
                              className="w-full opacity-0 absolute h-full cursor-pointer"
                            />
                            {formData?.buktiTransfer?.url ? (
                              <img
                                src={formData?.buktiTransfer?.url}
                                alt="Image Preview"
                                className="block h-full w-full object-cover "
                              />
                            ) : (
                              <div className="flex flex-col gap-5 mt-2 items-center justify-center ">
                                <i className="fa-solid fa-cloud-arrow-up fa-2xl text-blue-400"></i>
                                <h1 className="text-sm text-primaryDark text-center">
                                  Upload Image 4x4 Here
                                </h1>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  )
                )}
              </div>

              <div className="flex items-center justify-end w-full  mt-5 gap-1">
                <div className="w-[12rem] ">
                  <h1 className="h-full items-center flex justify-center text-sm  font-semibold">
                    Total:
                    <div className="flex flex-col text-end ml-2 leading-4">
                      {totalPrice.discountPrice != totalPrice.normalPrice && (
                        <span className="text-purple  ">
                          Rp. {totalPrice.discountPrice?.toLocaleString()}
                        </span>
                      )}
                      <span
                        className={` text-secondary ${
                          totalPrice.normalPrice != totalPrice.discountPrice &&
                          "line-through opacity-[0.6] "
                        } w-full  `}
                      >
                        Rp. {totalPrice.normalPrice?.toLocaleString()}
                      </span>
                      {totalPrice.cashbackPrice > 0 && (
                        <span className="text-orange  ">
                          + Rp. {totalPrice.cashbackPrice?.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </h1>
                </div>
                <Button
                  variant={popoverPage === 1 ? "red" : "transparent"}
                  onClick={hanldeBackPopover}
                  className={"flex items-center justify-center ml-auto"}
                >
                  <i
                    className={`fa-solid fa-arrow-up fa-lg rotate-[-45deg] mr-2`}
                  ></i>
                  {popoverPage === 1 ? "Cancel" : "Prev"}
                </Button>
                <Button
                  variant={"secondary"}
                  onClick={hanldeNextPopover}
                  className={"flex items-center ml-2 justify-center"}
                >
                  {popoverPage == 3 ? (
                    <>
                      Buy
                      <i className="fa-solid fa-cart-shopping ml-2"></i>
                    </>
                  ) : (
                    <>
                      Next
                      <i
                        className={`fa-solid fa-arrow-up fa-lg rotate-[45deg] ml-2`}
                      ></i>
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <PrintAndBuy
        handlePrint={handleBuyAndPrint}
        showPopover={printAndBuyPopover}
        togglePopover={() => setPrintAndBuyPopover(!printAndBuyPopover)}
      />
      <div className="-top-[100rem] left-[100rem] fixed">
        <div
          ref={printableRef}
          className="w-[200px] shadow-lg px-3 py-8 h-auto text-center text-xs bg-white z-[-10000]"
        >
          {printableContent}
        </div>
      </div>

      {/* TOAST */}
      <div className=" w-full  pb-20 pt-10  min-h-screen text-primaryDark">
        {/* BUY BUTTON */}
        <BuyButton
          onClick={() => togglePopover()}
          isShow={cartItems.length > 0}
        />

        {/* CONTENT */}
        <div className="flex flex-col">
          {/* FILTER */}
          <div className="h-auto  w-full bg-section-rainbow rounded-2xl shadow-xl p-5">
            {/* TOP */}
            <Title2 title="Filter" />
            <div className="flex sm:flex-row flex-col gap-3">
              {/* SEARCH BY NAME*/}
              <SearchBar
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search by name..."
              />
            </div>
            {/* BOTTOM */}
            <div className="w-full flex max-sm:flex-col items-center gap-2 mt-5">
              <ChangePageButton
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl6SzfGl7TUhR-NEd2sL_rwbaBq-7dRG2Cxg&usqp=CAU"
                setPage={() => setPage("foods")}
                page={page}
                text={"foods"}
              />
              <ChangePageButton
                image="https://wallpapers.com/images/hd/cocktail-drinks-glasses-on-black-background-7p9nyavhgxq3anzo.jpg"
                setPage={() => setPage("drinks")}
                page={page}
                text={"drinks"}
              />
            </div>
          </div>

          {/* PRODUCT */}
          <div>
            {/* PRODUCT TITTLE */}
            <Title title={page === "foods" ? "Foods" : "Drinks"} />
            {/* PRODUCT */}
            <div>
              {filteredDrinks.length > 0 && page === "drinks" ? (
                <div className="min-h-screen grid grid-cols-2 gap-x-2 gap-y-10 lg:grid-cols-3 xl:gap-x-4">
                  {filteredDrinks.map((product) => (
                    <FoodsKasirSection
                      key={product._id.toString()}
                      props={product}
                      addToCart={addToCart}
                      CartItems={cartItems}
                      promos={promos}
                      type={"drinks"}
                    />
                  ))}
                </div>
              ) : filteredFoods.length > 0 && page === "foods" ? (
                <div className="min-h-screen grid grid-cols-2 gap-x-2 gap-y-10 lg:grid-cols-3 xl:gap-x-4">
                  {filteredFoods.map((product) => (
                    <FoodsKasirSection
                      key={product._id.toString()}
                      props={product}
                      addToCart={addToCart}
                      CartItems={cartItems}
                      promos={promos}
                      type={"foods"}
                    />
                  ))}
                </div>
              ) : ((filteredDrinks.length > 0 && page === "drinks") ||
                  (filteredFoods.length > 0 && page === "foods")) &&
                isLoadingFetch ? (
                <div className="min-h-screen grid grid-cols-2 gap-x-2 gap-y-10 lg:grid-cols-3 xl:gap-x-4">
                  {[...Array(10)].map((i) => (
                    <>
                      <FashionKasirSectionSkeleton />
                    </>
                  ))}
                </div>
              ) : (
                <Empty />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
