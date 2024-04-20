/* eslint-disable react/prop-types */
export default function BuyButton({ onClick, isShow }) {
  return (
    <>
      {isShow && (
        <button
          onClick={onClick}
          className="bg-primaryThin drop-shadow-xl z-[10]  text-thirdyThin rounded-full h-16 w-16 fixed bottom-7 right-7"
        >
          <div className="relative">
            <div className="absolute h-16 w-16 bg-primaryVeryThin animate-ping -top-5 scale-[1] rounded-full z-[-10]"></div>
          </div>
          <i className="fa-solid fa-cart-shopping fa-2xl scale-[0.8]"></i>
        </button>
      )}
    </>
  );
}
