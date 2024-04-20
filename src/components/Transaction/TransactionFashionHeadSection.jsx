export default function TransactionFashionHeadSection() {
  return (
    <>
      <div className="w-full shadow-lg bg-secondary font-semibold flex items-center text-sm sm:text-lg rounded-2xl px-3">
        <h1 className="text-center text-white w-[27%] lg:w-[25%] py-6 ">
          Kasir
        </h1>
        <h1 className="text-center text-white w-[10%] lg:w-[5%] py-6">
          {" "}
          <i className="fa-solid fa-store"></i>
        </h1>
        <h1 className="text-center text-white w-[63%] lg:w-[30%] py-6 ">
          Nama & Transaksi
        </h1>
        <h1 className="text-center text-white py-6 w-[25%] lg:block hidden">
          Total
        </h1>
        <h1 className="text-center max-sm:hidden text-white w-[15%]  py-6">
          Status
        </h1>
      </div>
    </>
  );
}
