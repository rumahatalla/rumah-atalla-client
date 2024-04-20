/* eslint-disable no-unused-vars */
// import Button from "../components/Button";
import { useEffect, useState } from "react";
import Title2 from "../components/Title2";
import axios from "axios";
import { useParams } from "react-router-dom";
import LoadingPopover from "../components/LoadingPopover";

const Invoice = () => {
  const DBURL = import.meta.env.VITE_APP_DB_URL;

  // GET ID PARAM
  let { id } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [isLoadingFetch, setIsLoadingFetch] = useState(false);
  console.log(id);
  const fetchTransaction = async () => {
    setIsLoadingFetch(true);
    await axios
      .get(DBURL + "/transactions/" + id)
      .then((res) => {
        setTransaction(res.data);
        console.log("EFEWEWF", res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingFetch(false);
      });
  };
  useEffect(() => {
    fetchTransaction();
  }, [id]);
  console.log(transaction);

  return (
    <div className="overflow-hidden relative bg-section-dark h-screen w-screen flex items-center justify-center">
      <img
        src="/LandingFashion2.jpg"
        className="absolute w-full opacity-[0.15] h-full object-cover object-center"
        alt=""
      />
      <div className="flex z-[10] items-start bg-section h-[90%] rounded-2xl w-[90%] lg:w-[35%] px-5 sm:px-[15vw] lg:px-[3vw] py-12 shadow-xl flex-col overflow-y-scroll">
        {/* LOGO */}
        <div className="flex w-full h-20 -ml-4 justify-center drop-shadow items-center ">
          <img
            src="/LogoBlack.png"
            className="pointer-events-none w-[5.5rem] h-[5.5rem] aspect-square"
            alt="Logo"
          />
          <div className="uppercase  text-[1.7rem] leading-[2.3rem] mb-[0.5rem] text-primaryNormal block">
            <h1 className="-mb-[0.4rem]">Rumah</h1>
            <h1 className="font-bold">Atalla</h1>
            <div className="w-[120%] h-[0.2rem] -my-[0.1rem] rounded-md bg-primaryNormal" />
          </div>
        </div>
        {isLoadingFetch && <LoadingPopover />}
        {/* TITLE */}
        <Title2 title={"Invoice"} className={"mx-auto mt-5"} />
        {/* INVOICE */}
        {transaction && (
          <div className="w-full h-fit ">
            <div className="w-full flex flex-col items-center justify-center">
              <div>Jln. Brigjen Katamso No.19 Wonokarto, Wonogiri</div>
              <div>No. Telp: 0812-1234-5678</div>
            </div>
            <div className="w-full h-1 bg-black my-6"></div>
            <div>{new Date(transaction?.createdAt)?.toLocaleString()}</div>
            <div>ID Transaksi: {transaction._id}</div>
            <div className="flex justify-between w-full">
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
            <div className="w-full h-1 bg-black my-6"></div>
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
            <div className="w-full h-1 bg-black my-6"></div>

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
            <div className="w-full h-1 bg-black my-6"></div>
            <div className="w-full flex flex-col items-center justify-center">
              <div>Terimakasih Telah Berbelanja Di Rumah Atalla</div>
              <div>Kepuasan Anda Adalah Prioritas Kami</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Invoice;
