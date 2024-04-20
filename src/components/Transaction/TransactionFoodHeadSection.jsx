export default function TransactionFoodHeadSection() {
  return (
    <>
      <div className="w-full shadow-md bg-secondary font-semibold flex items-center text-sm sm:text-lg rounded-2xl">
        <h1 className="text-center text-white w-[30%] lg:w-[15%] py-6 ">
          Kasir
        </h1>
        <h1 className="text-center text-white w-[75%] lg:w-[50%] py-6 ">
          Nama & Transaksi
        </h1>
        <h1 className="text-center text-white py-6 w-[25%] lg:block hidden">
          Total
        </h1>
        <h1 className="text-center text-white w-[15%] max-sm:hidden py-6">Status</h1>
      </div>
    </>
  );
}
