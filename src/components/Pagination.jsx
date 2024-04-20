/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const Pagination = ({ totalPage=2, pagination=1, setPagination }) => {
  const nextPage = () => {
    if (pagination > 1) {
      setPagination((prev) => prev - 1);
    }
  };

  const prevPage = () => {
    if (pagination < totalPage) {
      setPagination((prev) => prev + 1);
    }
  };
  return (
    <div className="flex items-center justify-center w-full mt-10 gap-3">
      <Link
        onClick={nextPage}
        className={` ${
          pagination > 1
            ? "hover:bg-secondary hover:text-white "
            : "cursor-default opacity-[0.7]"
        } text-secondary transition-all duration-200 ease-in shadow-xl aspect-square w-10 flex items-center justify-center rounded-full `}
      >
        <i className="fa-solid fa-chevron-left"></i>
      </Link>
      <div className="flex items-center justify-center  gap-3 bg-section font-semibold text-sm py-2 px-3 rounded-full shadow-xl w-fit">
        {totalPage >= 1 &&
          Array.from({ length: totalPage }).map((_, index) => {
            // Menampilkan halaman pertama
            if (index === 0) {
              return (
                <Link
                  onClick={() => setPagination(1)}
                  key={index}
                  className={`${
                    pagination === 1 && "bg-secondary text-white"
                  } aspect-square w-8 hover:bg-secondary text-secondary transition-all duration-200 ease-in hover:text-white flex items-center justify-center rounded-full `}
                >
                  1
                </Link>
              );
            }
            // Menampilkan halaman terakhir
            if (index === totalPage - 1) {
              return (
                <Link
                  onClick={() => setPagination(totalPage)}
                  key={index}
                  className={`${
                    pagination === totalPage && "bg-secondary text-white"
                  } aspect-square w-8 hover:bg-secondary text-secondary transition-all duration-200 ease-in hover:text-white flex items-center justify-center rounded-full `}
                >
                  {totalPage}
                </Link>
              );
            }
            // Menampilkan halaman terkait dengan halaman saat ini, halaman sebelumnya, dan halaman berikutnya
            if (
              index === pagination - 2 ||
              index === pagination - 1 ||
              index === pagination
            ) {
              return (
                <Link
                  onClick={() => setPagination(index + 1)}
                  key={index}
                  className={`${
                    pagination === index + 1 && "bg-secondary text-white"
                  } aspect-square w-8 hover:bg-secondary text-secondary transition-all duration-200 ease-in hover:text-white flex items-center justify-center rounded-full `}
                >
                  {index + 1}
                </Link>
              );
            }
            // Menampilkan tanda elipsis sebelum halaman pertama
            if (index === 1 && pagination >= 4) {
              return <div key={index}>...</div>;
            }

            // Menampilkan tanda elipsis setelah halaman terakhir
            if (index === totalPage - 2 && pagination < totalPage - 3) {
              return <div key={index}>...</div>;
            }
            // Menyembunyikan nomor halaman lainnya
            return null;
          })}
      </div>
      <Link
        onClick={prevPage}
        className={` ${
          pagination < totalPage
            ? "hover:bg-secondary hover:text-white "
            : "cursor-default opacity-[0.7]"
        }  text-secondary transition-all duration-200 ease-in shadow-xl aspect-square w-10 flex items-center justify-center rounded-full `}
      >
        <i className="fa-solid fa-chevron-right"></i>
      </Link>
    </div>
  );
};

export default Pagination;
