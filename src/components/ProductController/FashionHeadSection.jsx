export default function FashionHeadSection() {
  return (
    <>
      <div className="w-full rounded-2xl bg-secondary font-semibold flex items-center text-sm sm:text-lg shadow-lg px-3">
        <h1 className="text-center text-white w-[35%] sm:w-[20%] py-6">
          Image
        </h1>
        <h1 className="text-center text-white w-[60%] sm:w-[45%] py-6 ">
          Name & Product ID
        </h1>
        <h1 className="text-center text-white py-6 max-sm:hidden w-[25%] sm:block hidden">
          Variant
        </h1>
        <h1 className="text-center text-white w-[10%] sm:w-[10%] py-6">
          <i className="fa-solid fa-store"></i>
        </h1>
      </div>
    </>
  );
}
