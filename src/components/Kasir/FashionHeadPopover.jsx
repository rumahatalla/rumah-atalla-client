export default function FashionHeadPopover() {
  return (
    <>
      <div className="flex w-full bg-secondary h-[3rem] font-semibold shadow-lg inset-[0.2rem] relative text-white items-center rounded-2xl px-2">
        <div className="w-[40%]">Nama Barang </div>
        <div className="w-[20%]">Harga</div>
        <div className="w-[20%]">Jumlah</div>
        <div className="w-[20%]">QTY</div>
      </div>
    </>
  );
}
