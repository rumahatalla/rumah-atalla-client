/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../Button";
import toast from "react-hot-toast";
import CustomToast from "../../components/CustomToast";
import BlackScreenPopover from "../BlackScreenPopover";
import LoadingPopover from "../LoadingPopover";
import LogoPopover from "../LogoPopover";
import Title from "../Title";
import TextField from "../TextField";
import Title2 from "../Title2";
import SearchBar from "../SearchBar";
import ConfirmDelete from "../ConfirmDelete";

/* eslint-disable react/prop-types */
export default function PromoPopover(props) {
  const DBURL = import.meta.env.VITE_APP_DB_URL;
  // PAGE
  const [page, setPage] = useState(1);
  const [tipe, setTipe] = useState("fashions");
  useEffect(() => {
    if (props.type === "foods") {
      setTipe("foods");
    } else if (props.type === "fashions") {
      setTipe("fashions");
    }
  }, [props]);

  // FETCHHHH
  const [products, setProducts] = useState([]);
  const fetchFashionProducts = async () => {
    await axios
      .get(DBURL + "/products/")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchFoodProducts = async () => {
    await axios
      .get(DBURL + "/foods")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setProducts([]);
    if (props.type === "fashions") {
      fetchFashionProducts();
    } else if (props.type === "foods") {
      fetchFoodProducts();
    }
  }, [props]);

  // OUT POPOVER
  const handleOutPopover = () => {
    setFashionSelected([]);
    setPage(1);
    setEndDate("");
    setStartDate("");
    setFormData({
      name: "",
      imageUrl: {
        url: "",
      },
      type: "",
      value: null,
      date: {
        startDate: "",
        endDate: "",
      },
      products: [],
      description: "",
      for: "fashions",
    });
    props.togglePopover("", null);
  };

  const [fashionSelected, setFashionSelected] = useState([]);
  const addToCart = (item) => {
    if (fashionSelected.includes(item)) {
      const updatedFashionSelects = fashionSelected.filter((i) => i !== item);
      setFashionSelected(updatedFashionSelects);
      return;
    }
    setFashionSelected([...fashionSelected, item]);
  };

  //   FILTER
  const [searchValue, setSearchValue] = useState("");
  const filteredProducts = products
    ? products?.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    : [];

  const type = {
    "diskon persentase": true,
    "cashback persentase": true,
    "cashback nominal": true,
    "diskon nominal": true,
  };

  // HANDLE POST
  const [selectedType, setSelectedType] = useState("diskon persentase");
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: {
      url: "",
    },
    type: "diskon persentase",
    value: null,
    date: {
      startDate: "",
      endDate: "",
    },
    products: [],
    description: "",
    for: "fashions",
  });
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  useEffect(() => {
    if (props.data) {
      if (props.data.date) {
        setStartDate(
          new Date(props.data?.date?.startDate).toISOString().split("T")[0]
        );
        setEndDate(
          new Date(props.data?.date?.endDate).toISOString().split("T")[0]
        );
      }
      setFormData({
        name: props?.data?.name,
        imageUrl: props?.data?.imageUrl,
        type: props?.data?.type,
        value: props?.data?.value,
        date: {
          startDate,
          endDate,
        },
        products: props?.data?.products,
        description: props?.data?.description,
        for: props?.data?.for,
      });
      setSelectedType(props.data.type);
      setFashionSelected(props.data.products);
    }
  }, [props, startDate, endDate]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "startDate" || name === "endDate") {
      setFormData((prevData) => ({
        ...prevData,
        date: {
          ...prevData.date,
          [name]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          imageUrl: {
            url: reader.result,
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      type: selectedType,
      products: [...fashionSelected],
      for: tipe,
    }));
  }, [fashionSelected, selectedType, tipe]);

  // LOADING
  const [isLoading, setIsLoading] = useState(false);

  const handlePost = async () => {
    console.log("LIHATLAH INI", formData);
    setIsLoading(true);

    await axios
      .post(DBURL + "/promos", formData, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        props.refetch();
        toast.custom((t) => (
          <CustomToast t={t} message="Add promo successed" type="success" />
        ));
        handleOutPopover();
      })
      .catch((err) => {
        console.log(err);
        toast.custom((t) => (
          <CustomToast t={t} message="Add promo failed" type="failed" />
        ));
        setPage(1);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handlePatch = async () => {
    setIsLoading(true);

    await axios
      .patch(DBURL + "/promos/" + props.data?._id?.toString(), formData, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        props.refetch();
        toast.custom((t) => (
          <CustomToast t={t} message="Edit promo successed" type="success" />
        ));
        handleOutPopover();
      })
      .catch((err) => {
        console.log(err);
        toast.custom((t) => (
          <CustomToast t={t} message="Edit promo successed" type="failed" />
        ));
        setPage(1);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // DELETE
  const [isDeleteConfirmShow, setIsDeleteConfirmShow] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const handleDeleteConfirm = () => {
    setIsDeleteConfirmShow(!isDeleteConfirmShow);
  };
  const handleDelete = async () => {
    setIsLoadingDelete(true);

    await axios
      .delete(DBURL + "/promos/" + props.data?._id?.toString(), {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log("BERHASIL DELEEETT", res.data);
        props.refetch();
        toast.custom((t) => (
          <CustomToast t={t} message="Delete promo successed" type="success" />
        ));
        handleOutPopover();
      })
      .catch((err) => {
        console.log(err);
        toast.custom((t) => (
          <CustomToast t={t} message="Delete promo failed" type="failed" />
        ));
        setPage(1);
      })
      .finally(() => {
        setIsDeleteConfirmShow(false);
        setIsLoadingDelete(false);
      });
  };

  return (
    <>
      <ConfirmDelete
        onConfirm={handleDelete}
        onCancel={handleDeleteConfirm}
        isShow={isDeleteConfirmShow}
        isLoading={isLoadingDelete}
        text={formData?.name}
      />

      <AnimatePresence>
        {(props.showPopover === "add" || props.showPopover === "edit") && (
          <div className="fixed z-[1000] top-0 left-0 w-screen h-screen flex items-center justify-center">
            <BlackScreenPopover
              onClick={handleOutPopover}
              isLoading={isLoading}
            />
            {(page === 1 || page === 2) && (
              <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -1000 }}
                transition={{ duration: 0.1 }}
                className={`${
                  isLoading && "pointer-events-none"
                } relative  overflow-hidden bg-section  w-[24rem] px-5 sm:px-10 sm:w-[40rem] pt-0 mx-3 sm:mx-10 ${
                  page === 1
                    ? "h-[40rem] sm:h-[36rem]"
                    : "max-h-[95%] h-[45rem]"
                } transition-all duration-300 p-5 z-[1] rounded-2xl shadow-md`}
              >
                {/* LOADING */}
                {isLoading && <LoadingPopover />}

                {/* LOGO */}
                <LogoPopover />

                {page === 1 && (
                  <>
                    {/* TITTLE */}
                    <Title
                      title={
                        props.showPopover === "add" ? "Add Promo" : "Edit Promo"
                      }
                      className={" my-3"}
                    />

                    {/* FORM */}
                    <form action="" className="flex flex-col gap-3">
                      <div className="flex gap-3">
                        {/* LEFT */}
                        <div className="w-full gap-3 flex flex-col">
                          <TextField
                            value={formData?.name}
                            onChange={handleInputChange}
                            name="name"
                            placeholder="name"
                          />

                          <div className="w-full flex gap-3">
                            {/* TYPE */}
                            <div className="max-sm:hidden w-[50%] ml-auto flex flex-col justify-left  text-primaryNormal font-semibold ">
                              <label className="sm:text-base text-sm drop-shadow-sm font-semibold text-primaryNormal capitalize">
                                Tipe
                              </label>
                              <select
                                id="promoType"
                                name="type"
                                className="py-[0.87rem] bg-white drop-shadow-sm outline-gray-200 text-primaryDark outline-[0.1px] border-none px-2 font-medium rounded-md text-base"
                                value={formData.type}
                                onChange={(e) =>
                                  setSelectedType(e.target.value)
                                }
                              >
                                {Object.keys(type).map((type) => (
                                  <option
                                    className="text-primaryDark capitalize"
                                    key={type}
                                    selected={type === "diskon persentase"}
                                    value={type}
                                  >
                                    {type
                                      .split(" ")
                                      .map(
                                        (word) =>
                                          word.charAt(0).toUpperCase() +
                                          word.slice(1)
                                      )
                                      .join(" ")}
                                  </option>
                                ))}
                              </select>
                            </div>
                            {/* VALUE */}
                            <div className="flex flex-col w-full sm:w-[50%]">
                              <TextField
                                value={formData?.value}
                                onChange={handleInputChange}
                                name="value"
                                placeholder="30"
                              />
                            </div>
                          </div>
                          <div className="flex gap-3 w-full max-sm:hidden">
                            {/* START DATE */}
                            <div className="w-full">
                              <label
                                className="sm:text-base text-sm drop-shadow-sm font-semibold text-primaryNormal capitalize"
                                htmlFor="start-date"
                              >
                                Tanggal Mulai
                              </label>
                              <input
                                type="date"
                                name="startDate"
                                id="start-date"
                                value={formData.date.startDate}
                                onChange={handleInputChange}
                                className="block w-full placeholder:text-gray-300 bg-white focus:outline-white p-3 text-sm text-primaryDark border rounded-lg "
                              />
                            </div>
                            {/* END DATE */}
                            <div className="w-full">
                              <label
                                className="sm:text-base text-sm drop-shadow-sm font-semibold text-primaryNormal capitalize"
                                htmlFor="end-date"
                              >
                                Tanggal Berakhir
                              </label>
                              <input
                                type="date"
                                id="end-date"
                                name="endDate"
                                value={formData.date.endDate}
                                onChange={handleInputChange}
                                className="block w-full placeholder:text-gray-300 bg-white focus:outline-white p-3 text-sm text-primaryDark border rounded-lg "
                              />
                            </div>
                          </div>
                        </div>

                        {/* RIGHT */}
                        <div className="gap-3 flex flex-col">
                          {/* IMAGE */}
                          <div>
                            <label
                              className="sm:text-base text-sm drop-shadow-sm font-semibold text-primaryNormal capitalize"
                              htmlFor="name"
                            >
                              Image
                            </label>
                            <div className="w-[7.3rem] sm:w-[13.2rem] relative cursor-pointer aspect-square flex flex-col justify-center items-center border-2 border-dashed border-blue-400 bg-white rounded-2xl overflow-hidden">
                              <input
                                type="file"
                                accept="image/*"
                                name="imageFile"
                                onChange={handleImageUpload}
                                className="w-full opacity-0 absolute h-full cursor-pointer"
                                // className="block w-full bg-white focus:outline-white p-3 text-sm text-primaryDark border rounded-lg"
                              />
                              {formData.imageUrl.url ? (
                                <img
                                  src={formData.imageUrl?.url}
                                  alt="Image Preview"
                                  className="block h-full w-full object-cover "
                                />
                              ) : (
                                <div className="flex flex-col gap-5 mt-2 items-center justify-center ">
                                  <i className="fa-solid fa-cloud-arrow-up fa-2xl text-blue-400"></i>
                                  <h1 className="text-sm text-primaryDark">
                                    Upload Image 4x4 Here
                                  </h1>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3 sm:hidden">
                        {/* START DATE */}
                        <div className="w-full">
                          <label
                            className="sm:text-base text-sm drop-shadow-sm font-semibold text-primaryNormal capitalize"
                            htmlFor="start-date"
                          >
                            Tanggal Mulai
                          </label>
                          <input
                            type="date"
                            name="startDate"
                            id="start-date"
                            value={formData.date.startDate}
                            onChange={handleInputChange}
                            className="block w-full placeholder:text-gray-300 bg-white focus:outline-white p-3 text-sm text-primaryDark border rounded-lg "
                          />
                        </div>
                        {/* END DATE */}
                        <div className="w-full">
                          <label
                            className="sm:text-base text-sm drop-shadow-sm font-semibold text-primaryNormal capitalize"
                            htmlFor="end-date"
                          >
                            Tanggal Berakhir
                          </label>
                          <input
                            type="date"
                            id="end-date"
                            name="endDate"
                            value={formData.date.endDate}
                            onChange={handleInputChange}
                            className="block w-full placeholder:text-gray-300 bg-white focus:outline-white p-3 text-sm text-primaryDark border rounded-lg "
                          />
                        </div>
                      </div>
                      {/* TYPE */}
                      <div className="sm:hidden w-[48%] ml-auto flex flex-col justify-left  text-primaryNormal font-semibold ">
                        <label>Tipe</label>
                        <select
                          id="promoType"
                          name="type"
                          className="py-[0.87rem] bg-white drop-shadow-sm outline-gray-200 text-primaryDark outline-[0.1px] border-none px-2 font-medium rounded-md text-base"
                          value={formData.type}
                          onChange={(e) => setSelectedType(e.target.value)}
                        >
                          {Object.keys(type).map((type) => (
                            <option
                              className="text-primaryDark capitalize"
                              key={type}
                              selected={type === "diskon persentase"}
                              value={type}
                            >
                              {type
                                .split(" ")
                                .map(
                                  (word) =>
                                    word.charAt(0).toUpperCase() + word.slice(1)
                                )
                                .join(" ")}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex max-sm:justify-center gap-3 mt-3">
                        {props.showPopover === "edit" && (
                          <>
                            <Button
                              variant="red"
                              onClick={handleDeleteConfirm}
                              className={"sm:ml-auto max-sm:min-w-[3rem]"}
                            >
                              <i className="fa-solid fa-trash sm:mr-2 scale-[0.95] fa-lg"></i>{" "}
                              <span className="max-sm:hidden">Delete</span>
                            </Button>
                          </>
                        )}
                        <Button
                          variant="secondary"
                          onClick={() => setPage(2)}
                          className={`${
                            props.showPopover === "add" && "ml-auto"
                          } max-sm:min-w-[3rem] `}
                        >
                          <span className="max-sm:hidden">Next</span>
                          <i className="fa-solid fa-arrow-right sm:ml-2 fa-lg"></i>
                        </Button>
                      </div>
                    </form>
                  </>
                )}
                {page === 2 && (
                  <>
                    {/* FILTER */}
                    <div className="h-auto  w-full bg-white shadow-md mb-4 py-3 px-5 rounded-2xl p-2">
                      <Title2 title={"Search"} className={"mb-0 sm:text-lg"} />
                      <div className="flex gap-3">
                        {/* SEARCH */}
                        <SearchBar
                          value={searchValue}
                          placeholder="Search..."
                          onChange={(e) => setSearchValue(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="w-full h-[50%] overflow-y-scroll overflow-x-hidden text-sm sm:text-base rounded-2xl">
                      <div className="flex w-full bg-secondary h-[3rem] font-semibold shadow-md inset-[0.2rem]  relative text-white items-center rounded-2xl px-2">
                        <div className="w-[20%] flex justify-center">Image</div>
                        <div className="w-[60%]">Nama Barang</div>
                        <div className="w-[20%]">Harga</div>
                      </div>
                      <div>
                        {filteredProducts.map((product) => {
                          let lowestPrice = 0;
                          let highestPrice = 0;
                          // VARIANT
                          for (let i = 0; i <= product?.variants?.length; i++) {
                            // SIZE
                            for (
                              let j = 0;
                              j <= product?.variants[i]?.size?.length;
                              j++
                            ) {
                              if (
                                product?.variants[i]?.size[j]?.price <
                                lowestPrice
                              ) {
                                lowestPrice =
                                  product?.variants[i]?.size[j]?.price;
                              }
                              if (
                                product?.variants[i]?.size[j]?.price >
                                highestPrice
                              ) {
                                highestPrice =
                                  product?.variants[i]?.size[j]?.price;
                              }
                            }
                          }
                          return (
                            <div
                              onClick={() =>
                                addToCart(product?._id?.toString())
                              }
                              className={` ${
                                fashionSelected.includes(
                                  product._id?.toString()
                                )
                                  ? "border-[4px] border-secondary opacity-[0.8] shadow-md  inset-0"
                                  : "bg-white border-y-[1px] shadow-sm hover:shadow-md inset-[0.2rem]  hover:inset-0"
                              } cursor-pointer group flex w-full bg-white my-2 shadow-sm py-2 min-h-[3rem] text-primaryDark items-center rounded-2xl px-2 relative duration-200 transition-all text-[0.7rem] sm:text-sm `}
                              key={product._id?.toString()}
                            >
                              {/* IMAGE */}
                              <div className="w-[20%]">
                                <img
                                  src={
                                    product?.imageUrl?.url ||
                                    product?.imageUrl[0].url
                                  }
                                  // alt={product.imageAlt}
                                  className="w-[90%] aspect-square object-cover rounded-2xl"
                                />
                              </div>

                              {/* NAME */}
                              <div className="flex flex-col h-full justify-center w-[55%]">
                                <p className="-mb-1 font-semibold">
                                  {product.name}
                                </p>
                              </div>

                              {/* RIGHT SIDE */}
                              <div className="flex flex-col items-center justify-center w-[25%]">
                                <h1
                                  className={` font-base font-semibold text-secondary drop-shadow-sm leading-4`}
                                >
                                  {fashionSelected.includes(
                                    product._id?.toString()
                                  ) && (
                                    <span>
                                      Rp.{" "}
                                      {formData.type === "diskon persentase" ||
                                      formData.type === "cashback persentase"
                                        ? (
                                            (highestPrice * formData?.value) /
                                            100
                                          )?.toLocaleString()
                                        : (
                                            highestPrice - formData?.value
                                          )?.toLocaleString()}
                                    </span>
                                  )}
                                  <br />
                                  <span
                                    className={`
                                    ${
                                      fashionSelected.includes(
                                        product._id?.toString()
                                      )
                                        ? "line-through opacity-[0.7]"
                                        : ""
                                    }`}
                                  >
                                    Rp. {highestPrice.toLocaleString()}
                                  </span>
                                </h1>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* BOTTOM */}
                    <div className="flex max-sm:justify-center gap-3 mt-3">
                      <Button
                        variant="secondary"
                        onClick={() => setPage(1)}
                        className={`sm:ml-auto max-sm:min-w-[3rem]`}
                      >
                        <i className="fa-solid fa-arrow-left sm:mr-2 fa-lg"></i>
                        <span className="max-sm:hidden">Prev</span>
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={
                          props.showPopover === "add"
                            ? () => handlePost()
                            : () => handlePatch()
                        }
                        className={"max-sm:min-w-[3rem]"}
                      >
                        <i className="fa-solid fa-pen sm:mr-2 scale-[0.95] fa-lg"></i>{" "}
                        <span className="max-sm:hidden">
                          {props.showPopover === "add" ? "Add" : "Edit"}
                        </span>
                      </Button>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
