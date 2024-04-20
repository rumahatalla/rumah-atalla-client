const Empty = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center my-20">
      <img src="/empty.svg" alt="" className="w-[25rem]" />
      <p className="text-2xl font-semibold text-center mt-10">Sorry, data not found</p>
    </div>
  );
};

export default Empty;
