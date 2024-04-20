export default function FoodHeadSection() {
  return (
    <>
      <div className="w-full rounded-2xl bg-secondary font-semibold flex items-center text-sm sm:text-lg shadow-md">
        <h1 className="text-center text-white w-[35%] sm:w-[20%] py-6">
          Image
        </h1>
        <h1 className="text-center text-white w-[65%] sm:w-[45%] py-6 ">
          Name & ID Product
        </h1>
        <h1 className="text-center text-white py-6 w-[10%] sm:block hidden">
          Stock
        </h1>
        <h1 className="text-center text-white py-6 sm:block hidden w-[25%]">
          Price
        </h1>
      </div>
    </>
  );
}
