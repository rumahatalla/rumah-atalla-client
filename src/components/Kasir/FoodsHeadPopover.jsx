export default function FoodsHeadPopover() {
  return (
    <>
      <div className="flex w-full bg-secondary h-[3rem] font-semibold shadow-lg inset-[0.2rem] relative text-white items-center rounded-2xl px-4">
        <div className="w-[50%]">Nama Barang </div>
        <div className="w-[15%] max-sm:hidden">Harga</div>
        <div className="w-[15%] max-sm:hidden">Jumlah</div>
        <div className=" w-[50%] flex max-sm:justify-end sm:w-[20%]">QTY</div>
      </div>
    </>
  );
}
