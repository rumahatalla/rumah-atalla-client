export default function TransactionHeadPopoverSection() {
  return (
    <div className="flex w-full text-[0.7rem] sm:text-base bg-secondary h-[3rem] font-semibold shadow-lg inset-[0.2rem] relative text-white items-center rounded-2xl px-4 ">
      <div className="w-[45%]">Nama Barang </div>
      <div className="w-[22.5%]">Harga</div>
      <div className="w-[22.5%]">Jumlah</div>
      <div className="w-[10%]">QTY</div>
    </div>
  );
}
