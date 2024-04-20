/* eslint-disable react/prop-types */
export default function UserControllerSection({ item, handlePopover, number }) {
  return (
    <>
      <div
        onClick={() => handlePopover({ param: "edit", item: item })}
        className="rounded-2xl my-3 cursor-pointer group hover:shadow-xl pr-2 shadow-md hover:inset-0 transition-all duration-300 w-full relative  bg-section text-primaryDark leading-5 sm:leading-normal text-[0.8rem] sm:text-sm border-b-2 inset-[0.2rem]"
      >
        <div className="flex items-center z-[10] relative w-full ">
          <h1 className="text-center w-[10%] py-6 ">{number}</h1>
          <h1 className="flex items-center justify-start w-[70%] sm:w-[50%] py-6 gap-4">
            <img
              src={item?.imageUrl ? item?.imageUrl.url : "/Profile.png"}
              className="w-20 aspect-square object-cover rounded-full drop-shadow-md"
              alt=""
            />
            <div className="truncate w-full flex max-sm:items-center flex-col leading-3">
              <span className="text-primaryDark font-semibold">
                {item.username}
              </span>
              <br />
              <span className="text-gray-400">{item.number}</span>
              <br />
              <span className="text-gray-400 ">{item.createdAt}</span>
            </div>
          </h1>
          <h1 className="text-center  py-6  w-[20%] sm:w-[40%] justify-center flex">
            <span className="text-primaryDark font-semibold leading-6">
              <div className="text-yellow-400 drop-shadow-sm flex items-center gap-2">
                <i className="fa-solid fa-clock mb-1 fa-lg "></i>
                <span className="max-sm:hidden">Pending:</span>

                {item?.transactions?.pending}
              </div>
              <div className="text-green-400 drop-shadow-sm flex items-center gap-2">
                <i className="fa-solid fa-circle-check mb-1 fa-lg"></i>
                <span className="max-sm:hidden">Successed:</span>
                {item?.transactions?.successed}
              </div>
              <div className="text-red-400 drop-shadow-sm flex items-center gap-2">
                <i className="fa-solid fa-circle-exclamation mb-1 fa-lg"></i>
                <span className="max-sm:hidden">Canceled:</span>
                {item?.transactions?.canceled}
              </div>
            </span>
          </h1>
        </div>
      </div>
    </>
  );
}
