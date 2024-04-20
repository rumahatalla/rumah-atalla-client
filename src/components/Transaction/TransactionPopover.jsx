/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import TransactionPopoverSection from "./TransactionPopoverSection";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import CustomToast from "../../components/CustomToast";
import BlackScreenPopover from "../BlackScreenPopover";
import LoadingPopover from "../LoadingPopover";
import LogoPopover from "../LogoPopover";
import PopoverDetail from "./PopoverDetail";
import Button from "../Button";
import Title from "../Title";
import TransactionHeadPopoverSection from "./TransactionHeadPopoverSection";
import TransactionStatusDropdown from "./TransactionStatusDropdown";
import { useReactToPrint } from "react-to-print";

/* eslint-disable react/prop-types */
export default function TransactionPopover(props) {
  const DBURL = import.meta.env.VITE_APP_DB_URL;
  const printableRef = useRef(null);
  // console.log("DBDBDBDBDB", DBURL);
  // LOADING
  const [isLoading, setIsLoading] = useState(false);
  // HANDLE PATCH
  const token = localStorage.getItem("token");

  const user = JSON.parse(localStorage.getItem("user"));
  const patchTransaction = async (status) => {
    setIsLoading(true);
    const newData = {
      status: status,
      kasirId: user?.userId,
      kasir: user?.username,
    };
    axios
      .patch(DBURL + "/transactions/" + props.data?._id?.toString(), newData, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        props.refetch();
        toast.custom((t) => (
          <CustomToast
            t={t}
            message="Edit transaction successed"
            type="success"
          />
        ));
        closePopover();
      })
      .catch((error) => {
        console.error(error);
        toast.custom((t) => (
          <CustomToast t={t} message="Edit transaction failed" type="failed" />
        ));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  function formatISODate(isoDateString) {
    const date = new Date(isoDateString);

    const formattedDate = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${Math.floor(
      date.getSeconds()
    )}`;

    return formattedDate;
  }

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

  const [printableContent, setPrintableContent] = useState("");

  const handlePrint = useReactToPrint({
    content: () => printableRef.current,
  });

  // Generate printable content when component mounts
  useEffect(() => {
    if (!props.data) return;
    const printable = generatePrintableTransaction(props.data);
    setPrintableContent(printable);
  }, [props.data]);

  const [transactionStatus, setTransactionStatus] = useState("");
  const [transactionStatusDropdown, setTransactionStatusDropdown] =
    useState(false);

  useEffect(() => {
    setTransactionStatus(props.data?.status);
  }, [props.data?.status]);

  const closePopover = () => {
    setTransactionStatusDropdown(false);
    setTransactionStatus("");
    props.togglePopover("", null);
  };
  return (
    <>
      <AnimatePresence>
        {props.showPopover && (
          <div className="fixed z-[1000] top-0 left-0 w-screen h-screen flex items-center justify-center">
            <BlackScreenPopover onClick={closePopover} isLoading={isLoading} />
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className={`${
                isLoading && "pointer-events-none"
              } relative overflow-hidden bg-section  w-[90%] px-5 sm:px-10 sm:w-[45rem] mx-2 sm:mx-10 h-[40rem] pt-0 sm:h-[46rem] max-h-[95%] sm:max-h-[95%] p-5 z-[1] rounded-2xl shadow-md`}
            >
              {/* LOADING */}
              {isLoading && <LoadingPopover />}

              {/* LOGO */}
              <LogoPopover />

              {/* HEADER */}
              <Title className={"my-3"} title={"Transaction Detail"} />

              {/* CONTENT */}
              <div className="flex gap-10 w-full text-[0.7rem] sm:text-sm mb-1">
                <div className="flex flex-col w-[50%]">
                  <PopoverDetail
                    bold
                    left={"Kasir: "}
                    right={props?.data?.kasir}
                  />
                  <PopoverDetail
                    bold
                    left={"Buyer: "}
                    right={props?.data?.buyer}
                  />
                  <PopoverDetail
                    left={"Payment Via: "}
                    right={props?.data?.paymentVia || "Cash"}
                  />
                  {props?.data?.paymentVia &&
                    props?.data?.paymentVia !== "Cash" && (
                      <>
                        <PopoverDetail
                          left={"Atas Nama Rekening: "}
                          right={props?.data?.atasNamaRekening}
                        />
                        <PopoverDetail
                          left={"Rekening Penerima: "}
                          right={props?.data?.rekening}
                        />
                      </>
                    )}
                  {props?.data?.paymentVia &&
                    props?.data?.paymentVia === "Cash" && (
                      <>
                        <PopoverDetail
                          left={"Nominal: "}
                          right={
                            "Rp. " + props?.data?.nominal?.toLocaleString()
                          }
                        />
                        <PopoverDetail
                          left={"Kembalian: "}
                          right={
                            "Rp. " +
                            (
                              props?.data?.nominal -
                              props?.data?.totalWithDiscount
                            ).toLocaleString()
                          }
                        />
                      </>
                    )}
                </div>
                <div className="flex flex-col w-[50%] ">
                  <PopoverDetail
                    left={"ID: "}
                    right={props?.data?._id?.toString()}
                  />
                  <PopoverDetail
                    left={"Date: "}
                    right={formatISODate(props?.data?.createdAt)}
                  />
                  <PopoverDetail left={"Store: "} right={props?.data?.store} />
                  <PopoverDetail
                    left={"Total: "}
                    right={
                      "Rp." + props?.data?.totalWithDiscount?.toLocaleString()
                    }
                    bold
                  />
                  <div className="flex flex-col text-[0.7rem] ml-2  sm:text-sm">
                    <PopoverDetail
                      left={"Price: "}
                      className={"font-semibold text-secondary"}
                      right={"Rp." + props?.data?.totalAmount?.toLocaleString()}
                    />

                    {props?.data?.totalWithDiscount !=
                      props.data.totalAmount && (
                      <PopoverDetail
                        left={"Discount: "}
                        className={"text-purple font-semibold"}
                        right={
                          "Rp." +
                          (
                            props?.data?.totalAmount -
                            props?.data?.totalWithDiscount
                          )?.toLocaleString()
                        }
                      />
                    )}
                    {props?.data?.totalCashback > 0 && (
                      <PopoverDetail
                        left={"Cashback: "}
                        className={"text-orange font-semibold"}
                        right={
                          "+Rp." + props?.data?.totalCashback?.toLocaleString()
                        }
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* PRODUCTS */}
              <div className="w-full h-[15rem] sm:h-[44%] overflow-y-scroll overflow-x-hidden">
                {props?.products?.length > 0 && (
                  <>
                    <TransactionHeadPopoverSection />

                    {props?.data?.products?.map((item) => (
                      <>
                        <TransactionPopoverSection
                          promos={props.promos}
                          item={item}
                        />
                      </>
                    ))}
                  </>
                )}
              </div>

              {/* BUTTON */}
              <div className="w-full mt-3 flex gap-3 items-center justify-center">
                <TransactionStatusDropdown
                  patchTransaction={patchTransaction}
                  setTransactionStatusDropdown={setTransactionStatusDropdown}
                  transactionStatus={transactionStatus}
                  transactionStatusDropdown={transactionStatusDropdown}
                />
                {/* PRINT */}
                {props?.data?.paymentVia &&
                  props?.data?.paymentVia !== "Cash" && (
                    <>
                      <Button
                        onClick={() =>
                          window.open(props?.data?.buktiTransfer?.url)
                        }
                      >
                        <i className="fa-solid fa-receipt mr-2"></i>
                        <span className="flex items-center justify-center gap-1">
                          Bukti
                          <p className="max-sm:hidden">Transfer</p>
                        </span>
                      </Button>
                    </>
                  )}
                <Button variant={"transparent"} onClick={handlePrint}>
                  <i className="fa-solid fa-print fa-lg mr-2"></i>
                  <span className="">Print</span>
                </Button>
              </div>
            </motion.div>
            <div className="-top-[100rem] left-[100rem] fixed">
              <div
                ref={printableRef}
                className="w-[200px] shadow-lg px-3 py-8 h-auto text-center text-xs bg-white z-[-10000]"
              >
                {printableContent}
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
