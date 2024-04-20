/* eslint-disable react/prop-types */
export default function FoodsProductSection(props) {
  const id = props?.data?._id?.toString();
  return (
    <>
      <div
        onClick={() =>
          props?.handlePopover({
            param: "edit",
            item: props?.data,
            type: "foods",
          })
        }
        className={`rounded-2xl my-3 cursor-pointer group hover:shadow-xl hover:inset-0 transition-all duration-300  w-full relative  bg-section text-primaryDark text-[0.7rem] leading-5 sm:leading-normal md:text-base shadow-md border-b-2 inset-[0.2rem]`}
      >
        <div className="flex items-center z-[10] relative">
          <h1 className="flex items-center justify-center  w-[35%] sm:w-[20%] p-3">
            <img
              src={props?.data?.imageUrl?.url}
              className="h-full aspect-square rounded-2xl object-cover"
              alt=""
            />
          </h1>
          <h1 className="text-center  w-[65%] sm:w-[45%] py-6 break-all">
            <span className="font-semibold">{props?.data?.name}</span>
            <br />
            {id}
            <br />
            <span className="text-gray-400">
              {props?.data?.date ? props?.data?.date : props?.data?.createdAt}
            </span>
            <br />
            <span className="sm:hidden">
              Rp. {props?.data?.price?.toLocaleString()}
            </span>
          </h1>
          <h1 className="text-center font-semibold py-6 w-[10%] sm:block hidden">
            {props?.data?.stock}
          </h1>
          <h1 className="text-center py-6 w-[25%] sm:block hidden drop-shadow-sm font-semibold text-secondary">
            Rp. {props?.data?.price?.toLocaleString()}
          </h1>
        </div>
      </div>
    </>
  );
}
