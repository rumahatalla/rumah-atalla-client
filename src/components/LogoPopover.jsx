export default function LogoPopover() {
  return (
    <>
      <div className="flex w-full -ml-2  mt-4 sm:mt-7 justify-center drop-shadow items-center ">
        <img
          src="/LogoBlack.png"
          className="pointer-events-none w-[8rem] h-[8rem] aspect-square"
          alt="Logo"
        />
        <div className="uppercase ml-1 text-[2.8rem] leading-[3rem] mb-[0.5rem] text-primaryNormal hidden sm:block">
          <h1 className="-mb-[0.4rem]">Rumah</h1>
          <h1 className="font-bold">Atalla</h1>
          <div className="w-[120%] h-[0.3rem] -my-[0.15rem] rounded-md bg-primaryNormal" />
        </div>
      </div>
    </>
  );
}
