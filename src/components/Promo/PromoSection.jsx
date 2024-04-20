/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";

/* eslint-disable react/prop-types */
export default function PromoSection({ item, handlePopover, type }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  useEffect(() => {
    console.log(item);
    if (item.date) {
      setStartDate(new Date(item.date?.startDate).toISOString().split("T")[0]);
      setEndDate(new Date(item.date?.endDate).toISOString().split("T")[0]);
    }
  }, [item]);
  return (
    <>
      <div
        onClick={() => handlePopover({ param: "edit", item: item, type: type })}
        className="rounded-2xl my-3 cursor-pointer w-full relative group bg-section text-primaryDark  overflow-hidden group hover:shadow-xl hover:inset-0 p-3 transition-all duration-300 text-[0.7rem] leading-5 sm:leading-normal lg:text-base shadow-md border-b-2 inset-[0.2rem]"
      >
        <div className="flex items-center z-[10] relative w-full">
          <h1 className="text-center w-[35%] sm:w-[10%] ">
            <img
              src={item?.imageUrl?.url}
              className="w-full aspect-square rounded-2xl"
              alt=""
            />
          </h1>
          <h1 className="text-center w-[65%] sm:w-[45%] ">
            <span className="font-semibold">{item?.name}</span>
            <br />{" "}
            <span className="text-gray-400 max-sm:hidden">
              dari: {startDate}
              <br /> sampai: {endDate}
            </span>
            <span className="text-secondary drop-shadow-sm sm:hidden ">
              {(item.type === "cashback nominal" ||
                item.type === "diskon nominal") &&
                "Rp. "}{" "}
              {item.type === "cashback nominal" ||
              item.type === "diskon nominal"
                ? item?.value?.toLocaleString()
                : item?.value}{" "}
              {(item.type === "cashback persentase" ||
                item.type === "diskon persentase") &&
                "%"}
            </span>
          </h1>
          <h1 className="text-center w-[45%] max-sm:hidden font-semibold capitalize">
            {item?.type} <br />
            <span className="text-secondary drop-shadow-sm ">
              {(item.type === "cashback nominal" ||
                item.type === "diskon nominal") &&
                "Rp. "}{" "}
              {item.type === "cashback nominal" ||
              item.type === "diskon nominal"
                ? item?.value?.toLocaleString()
                : item?.value}{" "}
              {(item.type === "cashback persentase" ||
                item.type === "diskon persentase") &&
                "%"}
            </span>
            <br />
          </h1>
        </div>
      </div>
    </>
  );
}
