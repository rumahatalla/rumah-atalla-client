/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import FashionKasirPopover from "../../components/Kasir/FashionKasirPopover";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../components/Button";
import toast from "react-hot-toast";
import CustomToast from "../../components/CustomToast";
import Title from "../../components/Title";
import ShowMore from "../../components/Kasir/ShowMore";
// import { getToken } from "firebase/messaging";
// import messaging from "../../lib/FirebaseConfigure";
// import { subscribeToTopic } from "../../lib/FirebaseConfigure";
import Title2 from "../../components/Title2";
import FashionKasirSection from "../../components/Kasir/FashionKasirSection";
import FashionKasirSectionSkeleton from "../../components/Kasir/FashionKasirSectionSkeleton";
import FashionHeadPopover from "../../components/Kasir/FashionHeadPopover";
import TextField from "../../components/TextField";
import LogoPopover from "../../components/LogoPopover";
import BlackScreenPopover from "../../components/BlackScreenPopover";
import LoadingPopover from "../../components/LoadingPopover";
import SearchBar from "../../components/SearchBar";
import BuyButton from "../../components/Kasir/BuyButton";
import PaymentMethod from "../../components/Kasir/PaymentMethod";
import { Input } from "postcss";
import PrintAndBuy from "../../components/Kasir/PrintAndBuy";
import { useReactToPrint } from "react-to-print";
import Empty from "../../components/Empty";

export default function FashionsKasir() {
  const DBURL = import.meta.env.VITE_APP_DB_URL;

  // FETCHHHH
  const [isLoadingFetch, setIsLoadingFetch] = useState(false);
  // FETCH FASHION
  const [fashionProducts, setFashionProducts] = useState([]);
  const [triger, setTriger] = useState(1);

  const fetchFashionProducts = async () => {
    setIsLoadingFetch(true);
    await axios
      .get(DBURL + "/products/")
      .then((res) => {
        setTriger((prevData) => prevData + 1);
        setFashionProducts(res.data);
        setIsLoadingFetch(false);
      })
      .catch((err) => {
        console.log(err);
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
        setPromos(res.data.filter((item) => item.for === "fashions"));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // FETCH TRANSACTIONS
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchPromos();
    fetchFashionProducts();
  }, []);

  // TOTAL
  const [totalPrice, setTotalPrice] = useState({
    normalPrice: 0,
    discountPrice: 0,
    cashbackPrice: 0,
  });

  // CART
  const [productsForm, setProductsForm] = useState([]);
  const [FashionCartItems, setFashionCartItems] = useState([]);
  const addToCart = (item, value = null) => {
    //  ITEM IS PRODUCT DATA, VALUE IS QTY VALUE

    // FIND THE PRODUCT IN CARTITEMS
    const cartIndex = FashionCartItems.findIndex(
      (product) => product?.idOnCart === item?.idOnCart
    );
    console.log("FAFAFf", value, cartIndex);

    // MAKE UPDATED CART ITEMS
    let updatedFashionCartItems = [...FashionCartItems];

    // CHECK IF THE PRODUCT IS EXIST ON THE CART OR NOT, IF YES THEN
    if (cartIndex >= 0) {
      // CHECK VALUE PARAM, IF THE VALUE IS 0 THEN REMOVE IT ON THE CART ITEMS
      if (value === 0) {
        updatedFashionCartItems[cartIndex].qty = 0;
        updatedFashionCartItems.splice(cartIndex, 1);
        setFashionCartItems(updatedFashionCartItems);
        return;
      }
      // IF NOT, THEN CHANGE THE QTY VALUE OF THE ITEM ON CART
      updatedFashionCartItems[cartIndex].qty = value;
      console.log("FAFAF", updatedFashionCartItems[cartIndex].qty);
      setFashionCartItems(FashionCartItems);
      return;
    }
    if (value) {
      item.qty = value;
    }
    setFashionCartItems([...FashionCartItems, item]);
  };

  // HANDLE BUY
  const [buyer, setBuyer] = useState("");

  // LOADING
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    buyer: "",
    kasir: "",
    kasirId: "",
    type: "fashions",
    store: "web",
    products: [],
    totalAmount: 0,
    qty: 0,
    status: "successed",
  });
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      products: productsForm,
      buyer: buyer,
      kasir: user?.username,
      kasirId: user?.userId,
      totalAmount: totalPrice.normalPrice,
      totalWithDiscount: totalPrice.discountPrice,
      totalCashback: totalPrice.cashbackPrice,
    }));
  }, [productsForm, buyer]);

  console.log("FOFORM", productsForm);

  const [printableTransactionData, setPrintableTransactionData] =
    useState(null);

  const handleBuy = async () => {
    console.log("FOFOFOFOF", formData);
    setIsLoading(true);
    await axios
      .post(DBURL + "/transactions", formData, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then(async (res) => {
        setTimeout(() => {
          setPrintAndBuyPopover(true);
        }, 1000);
        toast.custom((t) => (
          <CustomToast t={t} message="Transaction successed" type="success" />
        ));
        setFormData({
          buyer: "",
          kasir: "",
          kasirId: "",
          type: "fashions",
          store: "web",
          products: [],
          totalAmount: 0,
          status: "successed",
        });
        fetchFashionProducts();
        setFashionCartItems([]);
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

  //   POPOVER
  const [showPopover, setShowPopover] = useState(false);
  // const [trigerCart, setTrigerCart] = useState(false);
  const handleChange = (value, type, indexOnCart) => {
    console.log("test", value, type, indexOnCart);
    const updatedFashionCartItems = [...FashionCartItems];
    if (type === "qty") {
      updatedFashionCartItems[indexOnCart].qty = value.value1;
    } else if (type === "productType") {
      updatedFashionCartItems[indexOnCart].idOnCart = value.value3;

      updatedFashionCartItems[indexOnCart].variant =
        updatedFashionCartItems[indexOnCart].variants[value.value1];

      updatedFashionCartItems[indexOnCart].size =
        updatedFashionCartItems[indexOnCart].variants[value.value1].size[
          value.value2
        ];

      updatedFashionCartItems[indexOnCart].price =
        updatedFashionCartItems[indexOnCart]?.sizes[value.value2]?.price;
    }
    setFashionCartItems(updatedFashionCartItems);
  };

  console.log("testt", FashionCartItems);

  useEffect(() => {
    if (FashionCartItems.length <= 0 && showPopover) {
      togglePopover();
    }
  }, [FashionCartItems]);

  const converToProductForm = () => {
    let total = 0;
    let discount = 0;
    let cashback = 0;
    FashionCartItems.forEach((item) => {
      total += item?.size?.price * item.qty;
      discount += item?.size?.discountPrice * item.qty;
      cashback += item?.size?.cashBackTotal * item.qty;
    });
    setTotalPrice({
      normalPrice: total,
      discountPrice: discount,
      cashbackPrice: cashback,
    });
    const newFashionCartItems = FashionCartItems.map((item) => {
      const { name, qty, price, size, sizes, variant, variants, _id } = item;
      const newName = `${name} - ${variant.name} - ${size.size}`;
      const totalPrice = price * qty;
      const totalDiscount = size.discountPrice * qty;
      const totalCashback = size.cashBackTotal * qty;

      return {
        variants: variants,
        sizes: sizes,
        productId: _id,
        name: newName,
        indexSize: size.indexSize,
        indexVariant: variant.indexVariant,
        stock: size.stock,
        qty: qty,
        price: totalPrice,
        discount: totalDiscount,
        cashback: totalCashback,
      };
    });
    return newFashionCartItems;
  };

  useEffect(() => {
    const newFashionCartItems = converToProductForm();
    setProductsForm(newFashionCartItems);
  }, [FashionCartItems]);

  const togglePopover = () => {
    const newFashionCartItems = converToProductForm();
    setProductsForm(newFashionCartItems);
    setShowPopover(!showPopover);
    setPopoverPage(1);
  };

  // TOTAL
  useEffect(() => {
    const newFashionProducts = fashionProducts.map((product) => {
      let discountNominal = 0;
      let discountPersentase = 0;
      let cashbackNominal = 0;
      let cashbackPersentase = 0;
      let productPromos = [];
      promos.map((promo, i) => {
        let included = false;
        const currentDate = new Date();

        if (
          promo.products.includes(product._id.toString()) &&
          new Date(promo.date.startDate) < currentDate &&
          new Date(promo.date.endDate) > currentDate
        ) {
          included = true;
        }
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
      });
      const newVariants = product.variants.map((variant) => {
        const newSize = variant?.size?.map((variantSize) => {
          const discountPrice =
            variantSize.price -
            discountNominal -
            (variantSize.price * discountPersentase) / 100;
          const cashBackTotal =
            cashbackNominal + (variantSize.price * cashbackPersentase) / 100;
          return {
            ...variantSize,
            discountPrice: discountPrice,
            cashBackTotal: cashBackTotal,
          };
        });

        return {
          ...variant,
          size: newSize,
        };
      });
      return {
        ...product,
        productPromos: productPromos,
        discountNominal: discountNominal,
        discountPersentase: discountPersentase,
        cashbackNominal: cashbackNominal,
        cashbackPersentase: cashbackPersentase,
        variants: newVariants,
      };
    });
    // console.log("NEPROD", newFashionProduct);
    setFashionProducts(newFashionProducts);
  }, [promos, triger]);

  //   FILTER
  const [searchValue, setSearchValue] = useState("");
  const filteredFashions = fashionProducts.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  // showMore
  const [showMore, setShowMore] = useState(false);
  const [paymentVia, setPaymentVia] = useState("");
  const [showMoreData, setShowMoreData] = useState(null);
  const toggleShowMore = ({ data }) => {
    setShowMore(!showMore);
    if (showMore) {
      setShowMoreData(null);
    } else {
      setShowMoreData(data);
    }
  };

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

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      buktiTransfer: null,
      atasNamaRekening: "",
      nominal: 0,
    }));
  }, [paymentVia]);

  // BARCODE
  const [barcode, setBarcode] = useState("");
  const [lastInputTime, setLastInputTime] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    function handleKeyDown(event) {
      const currentTime = new Date().getTime();
      const timeSinceLastInput = currentTime - lastInputTime;
      const isShortInterval = lastInputTime && timeSinceLastInput < 50; // Adjust this interval as needed

      if (isShortInterval) {
        setIsScanning(true);
      } else {
        setIsScanning(false);
        setBarcode(""); // Reset barcode if input is not continuous
      }

      setLastInputTime(currentTime);

      // Limit barcode input to 10 characters
      const newBarcode = barcode + event.key;
      if (newBarcode.length >= 10) {
        setBarcode(newBarcode);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lastInputTime, barcode]);

  useEffect(() => {
    if (!barcode || barcode.length < 10) return;
    const parts = barcode.split(".");

    const id = parts[0];
    const indexVariant = parseInt(parts[1]);
    const indexSize = parseInt(parts[2]);

    const productScanned = fashionProducts.find((item) => item._id === id);
    if (productScanned) {
      const idOnCart = id + "?variant=" + indexVariant + ",size=" + indexSize;

      // Check if item is already in cart
      const isAdded = FashionCartItems?.some((product) => {
        if (product?.idOnCart === idOnCart) {
          return true;
        }
      });
      const newSize = {
        ...productScanned?.variants[indexVariant]?.size[indexSize],
        indexSize,
      };
      const newVariant = {
        ...productScanned?.variants[indexVariant],
        indexVariant,
      };

      if (newSize.stock == 0) {
        toast.custom((t) => (
          <CustomToast
            t={t}
            type="failed"
            message="Failed to add to cart, stock needed"
          />
        ));
        setBarcode("");
        return;
      }

      let productData = {
        _id: productScanned?._id?.toString(),
        idOnCart: idOnCart,
        name: productScanned?.name,
        variants: productScanned?.variants,
        variant: newVariant,
        size: newSize,
        sizes: productScanned?.variants[indexVariant]?.size,
        qty: 1,
        discountNominal: productScanned?.discountNominal,
        discountPersentase: productScanned?.discountPersentase,
        cashbackNominal: productScanned?.cashbackNominal,
        cashbackPersentase: productScanned?.cashbackPersentase,
        productPromos: productScanned?.productPromos,
        price: productScanned?.variants[indexVariant]?.size[indexSize]?.price,
      };

      if (!isAdded) {
        setFashionCartItems((prevItems) => [...prevItems, productData]);
        toast.custom((t) => (
          <CustomToast t={t} type="success" message={`${productData.name} - ${productData.variant.name} - ${productData.size.size} added to cart`} />
        ));
        setBarcode("");
      }
      return;
    }

    console.log("Barcode scanned:", barcode, id, indexVariant, indexSize);
    if (isScanning) {
      setBarcode("");
    }
  }, [isScanning, barcode]);

  return (
    <>
      {/* POPOVER */}
      <AnimatePresence>
        {showPopover && (
          <div className="fixed z-[1000] top-0 left-0 w-screen h-screen flex items-center justify-center">
            <BlackScreenPopover onClick={togglePopover} isLoading={isLoading} />
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

              {/* CONTENT */}
              <div className="h-[70%] ">
                {popoverPage === 1 ? (
                  <div className="flex flex-col h-full gap-2">
                    {/* ITEM */}
                    <div className="w-full h-[100%] overflow-y-scroll overflow-x-hidden">
                      {FashionCartItems.length > 0 && (
                        <>
                          {/* TITTLE */}
                          <Title title={"Fashions"} className={"my-5"} />
                          {/* TOP */}
                          <FashionHeadPopover />

                          {FashionCartItems.map((item, index) => (
                            <div key={item?._id}>
                              <FashionKasirPopover
                                item={item}
                                indexOnCart={index}
                                handleChange={handleChange}
                                productsForm={productsForm}
                                FashionCartItems={FashionCartItems}
                                handleFashionCartItems={addToCart}
                              />
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
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

              {/* BOTTOM */}
              <div className="flex items-center justify-end w-full  mt-5 gap-1">
                <div className="w-[12rem] ">
                  <h1 className="h-full items-center flex justify-center text-sm font-semibold">
                    Total:
                    <div className="flex flex-col leading-4 text-end ml-2">
                      {totalPrice.discountPrice != totalPrice.normalPrice && (
                        <span className="text-purple ">
                          Rp. {totalPrice.discountPrice.toLocaleString()}
                        </span>
                      )}
                      <span
                        className={`text-secondary ${
                          totalPrice.discountPrice != totalPrice.normalPrice &&
                          "line-through opacity-[0.6] "
                        } w-full`}
                      >
                        Rp. {totalPrice.normalPrice.toLocaleString()}
                      </span>
                      {totalPrice.cashbackPrice > 0 && (
                        <span className="text-orange">
                          + Rp. {totalPrice.cashbackPrice.toLocaleString()}
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

      {/* SHOW MORE */}
      <ShowMore
        showPopover={showMore}
        CartItems={FashionCartItems}
        togglePopover={() => toggleShowMore({ data: null })}
        FashionCartItems={FashionCartItems}
        addToCart={addToCart}
        data={showMoreData}
      />
      <input
        type="text"
        className="fixed top-0 right-0 z-[10]"
        value={barcode}
        onChange={(e) => setBarcode(e.target.value)}
        placeholder="Scan barcode here"
      />
      <div className=" w-full  pb-20 pt-10  min-h-screen text-primaryDark">
        {/* BUY BUTTON */}
        <BuyButton
          onClick={() => togglePopover()}
          isShow={FashionCartItems.length > 0}
        />

        {/* CONTENT */}
        <div className="">
          <div className="flex flex-col">
            {/* FILTER */}
            <div className="h-auto  w-full bg-section-rainbow rounded-2xl shadow-lg p-5">
              {/* TOP */}
              <Title2 title="Filter" />

              <div className="flex gap-3">
                {/* SEARCH BY NAME*/}
                <SearchBar
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search by name..."
                />
              </div>
            </div>

            {/* PRODUCT */}
            <div>
              {/* PRODUCT TITTLE */}
              <Title title={"Fashions"} />

              {/* PRODUCT */}
              <div>
                {filteredFashions.length > 0 ? (
                  <div className="min-h-screen grid grid-cols-2 gap-x-2 gap-y-10 lg:grid-cols-3 xl:gap-x-4">
                    {filteredFashions.map((product, index) => (
                      <FashionKasirSection
                        props={product}
                        key={index}
                        FashionCartItems={FashionCartItems}
                        toggleShowMore={toggleShowMore}
                      />
                    ))}
                  </div>
                ) : filteredFashions.length === 0 && isLoadingFetch ? (
                  <div className="min-h-screen grid grid-cols-2 gap-x-2 gap-y-10 lg:grid-cols-3 xl:gap-x-4">
                    {[...Array(10)].map((i) => (
                      <>
                        <FashionKasirSectionSkeleton />
                      </>
                    ))}
                  </div>
                ) : (
                  <>
                    <Empty />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
