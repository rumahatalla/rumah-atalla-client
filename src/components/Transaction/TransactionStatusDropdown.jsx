/* eslint-disable react/prop-types */
import BlackScreenPopover from "../BlackScreenPopover";
import Button from "../Button";

const TransactionStatusDropdown = ({
  transactionStatus,
  transactionStatusDropdown,
  patchTransaction,
  setTransactionStatusDropdown,
}) => {
  return (
    <>
      <div className="relative w-fit">
        <BlackScreenPopover
          isShow={transactionStatusDropdown}
          isBlack={false}
          isBlur={false}
          onClick={() => setTransactionStatusDropdown(false)}
        />
        <div
          className={`${
            transactionStatusDropdown
              ? "h-[11.5rem] opacity-100"
              : "h-0 opacity-0 invisible"
          } w-full transition-all flex flex-col items-center justify-center gap-5 sm:gap-1 truncate duration-200 ease-in bg-section-dark z-[1] absolute bottom-[3.5rem] p-3 rounded-2xl shadow-2xl right-0`}
        >
          <span
            className={`w-full flex items-center ${
              transactionStatus === "canceled"
                ? "text-red-400  bg-[rgba(248,113,113,0.2)]"
                : "text-gray-200 hover:text-red-400 hover:bg-[rgba(248,113,113,0.2)]"
            }   justify-center group p-3 transition-all duration-200 ease-in cursor-pointer rounded-2xl `}
            onClick={() => patchTransaction("canceled")}
          >
            <i
              className={`fa-solid fa-circle-exclamation mb-1 fa-lg sm:mr-2  `}
            ></i>
            <span className="max-sm:hidden">Canceled</span>
          </span>
          <span
            className={`w-full flex items-center ${
              transactionStatus === "pending"
                ? "text-yellow-400  bg-[rgba(255,255,0,0.2)]"
                : "text-gray-200 hover:text-yellow-400 hover:bg-[rgba(255,255,0,0.2)]"
            }   justify-center group p-3 transition-all duration-200 ease-in cursor-pointer rounded-2xl `}
            onClick={() => patchTransaction("pending")}
          >
            <i className={`fa-solid fa-clock mb-1 fa-lg sm:mr-2  `}></i>
            <span className="max-sm:hidden">Pending</span>
          </span>{" "}
          <span
            className={`w-full flex items-center ${
              transactionStatus === "successed"
                ? "text-green-400  bg-[rgba(74,222,128,0.2)]"
                : "text-gray-200 hover:text-green-400 hover:bg-[rgba(74,222,128,0.2)]"
            }   justify-center group p-3 transition-all duration-200 ease-in cursor-pointer rounded-2xl `}
            onClick={() => patchTransaction("successed")}
          >
            <i className={`fa-solid fa-circle-check fa-lg sm:mr-2 `}></i>
            <span className="max-sm:hidden">Success</span>
          </span>
        </div>
        <Button
          className={"max-sm:min-w-[2rem] max-sm:w-[2rem] max-sm:p-6"}
          onClick={() => setTransactionStatusDropdown((prev) => !prev)}
          variant={
            transactionStatus === "successed"
              ? "green"
              : transactionStatus === "pending"
              ? "yellow"
              : "red"
          }
        >
          {transactionStatus === "successed" ? (
            <i className="fa-solid fa-circle-check fa-lg sm:mr-2"></i>
          ) : transactionStatus === "pending" ? (
            <i className="fa-solid fa-clock fa-lg sm:mr-2"></i>
          ) : (
            <i className="fa-solid fa-circle-exclamation fa-lg sm:mr-2"></i>
          )}
          <span className="max-sm:hidden">
            {transactionStatus === "successed"
              ? "Success"
              : transactionStatus === "pending"
              ? "Pending"
              : "Canceled"}
          </span>
        </Button>
      </div>
    </>
  );
};

export default TransactionStatusDropdown;
