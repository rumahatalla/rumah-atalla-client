/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
const paymentMethodData = [
  {
    paymentVia: "Cash",
    Image: "/Cash.png",
  },
  {
    paymentVia: "BCA",
    Image: "/BCA.png",
  },
  {
    paymentVia: "Mandiri",
    Image: "/Mandiri.png",
  },
  {
    paymentVia: "Other Payment Coming Soon",
    // Image: "/Mandiri.png",
  },
];

const PaymentMethod = ({ paymentVia, setPaymentVia }) => {
  return (
    <div className="mx-5">
      <AnimatePresence>
        {paymentMethodData.map((payment, i) => (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 * i }}
            onClick={
              payment.paymentVia != "Other Payment Coming Soon" &&
              (() => setPaymentVia(payment.paymentVia))
            }
            key={payment.paymentVia}
            className={` ${
              paymentVia === payment.paymentVia
                ? "bg-[rgba(80,155,236,0.2)]"
                : " bg-transparent"
            } flex items-center cursor-pointer font-semibold gap-4 py-5 border-b-2 rounded-sm border-slate-400 px-5 transition-all duration-200 ease-in`}
          >
            <span
              className={` ${
                paymentVia === payment.paymentVia
                  ? "bg-secondary border-secondary"
                  : " bg-transparent border-slate-400"
              } ${
                payment.paymentVia === "Other Payment Coming Soon" && "hidden"
              } border-[3px] h-5 aspect-square rounded-full transition-all duration-200 ease-`}
            ></span>
            <div className="flex items-center justify-between w-full">
              <span className="">{payment.paymentVia}</span>
              <img src={payment.Image} className="h-5 scale-[1.8]" alt="" />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default PaymentMethod;
