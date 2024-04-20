/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../Button";
import toast from "react-hot-toast";
import CustomToast from "../../components/CustomToast";
import { Swiper, SwiperSlide } from "swiper/react";
import ReadMoreDescription from "../ReadMoreDescription";
import BlackScreenPopover from "../BlackScreenPopover";
import LoadingPopover from "../LoadingPopover";
import LogoPopover from "../LogoPopover";
import Title from "../Title";
import TextField from "../TextField";
import ConfirmDelete from "../ConfirmDelete";

/* eslint-disable react/prop-types */
export default function FashionProductPopover(props) {
  // console.log(props)
  // PREV DATA
  const [formData, setFormData] = useState({
    name: "",
    _id: "",
    brand: "",
    imageUrl: [],
    description: "",
    category: "",
    variants: [
      {
        name: "",
        description: "",
        size: [
          {
            size: "",
            price: 0,
            stock: 0,
          },
        ],
      },
    ],
    store: "web",
  });

  useEffect(() => {
    if (props.data && props.showPopover === "edit") {
      setFormData({
        name: props.data.name,
        _id: props.data._id,
        category: props.data.category,
        imageUrl: props.data.imageUrl,
        description: props.data.description,
        variants: props.data.variants,
        brand: props.data.brand,
        store: "web",
      });
      setVariantsData(
        props?.data?.variants || [
          {
            name: "",
            description: "",
            size: [
              {
                size: "",
                price: 0,
                stock: 0,
              },
            ],
          },
        ]
      );
      setUploadedImages(props?.data?.imageUrl || []);
      setImages(props?.data?.imageUrl || []);
    }
  }, [props]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newValue =
      name === "price" || name === "stock" ? parseInt(value, 10) || 0 : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };
  const [uploadedImages, setUploadedImages] = useState([]);
  const [images, setImages] = useState([]);
  const onSelectFiles = (e) => {
    const files = Array.from(e.target.files);
    const formData = new FormData();
    const reader = new FileReader();

    reader.onloadend = () => {
      const url = reader.result;

      files.forEach((file) => {
        formData.append("images", file);
      });

      const filesArray = files.map((file) => ({
        name: file.name,
        size: Math.round(file.size / 1024),
        url: url,
        progress: 0,
      }));

      setImages((prevImages) => [...prevImages, ...filesArray]);
    };

    files.forEach((file) => {
      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    if (images.length == 0) return;
    const newImages = images.map((image) => {
      return {
        name: image.name,
        url: image.url,
      };
    });
    setUploadedImages(newImages);
  }, [images]);

  const removeImage = (index) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // VARIANTS
  const [variantsData, setVariantsData] = useState([
    {
      name: "",
      description: "",
      size: [
        {
          size: "",
          price: 0,
          stock: 0,
        },
      ],
    },
  ]);
  const handleVariantTotal = (e) => {
    const newVariantCount = parseInt(e.target.value); // Ambil nilai baru untuk jumlah varian
    setVariantsData((prevData) => {
      const newData = [...prevData];
      // Sesuaikan panjang array varian dengan nilai yang dipilih
      while (newData.length < newVariantCount) {
        newData.push({
          name: "",
          description: "",
          size: [
            {
              size: "",
              price: 0,
              stock: 0,
            },
          ],
        });
      }
      // Jika jumlah varian berkurang, potong array varian sesuai dengan nilai yang dipilih
      if (newData.length > newVariantCount) {
        newData.splice(newVariantCount);
      }
      return newData;
    });
  };

  const handleVariantsChange = (e) => {
    const { name, value } = e.target;
    const newValue =
      name === "price" || name === "stock" ? parseInt(value, 10) || 0 : value;

    const indexVariant = page - 4;

    if (indexVariant >= 0 && indexVariant < variantsData.length) {
      setVariantsData((prevData) => {
        const newData = [...prevData];
        const variantToUpdate = newData[indexVariant];

        if (variantToUpdate) {
          // Perbarui nilai yang sesuai, termasuk untuk nama dan deskripsi
          newData[indexVariant] = {
            ...variantToUpdate,
            [name]: newValue,
          };
        }

        return newData;
      });
    }
  };

  const handleSizeTotal = (e, variantIndex) => {
    const newSizeCount = parseInt(e.target.value);
    setVariantsData((prevData) => {
      const newData = [...prevData];
      console.log(newSizeCount, newData[variantIndex].size?.length);
      if (newSizeCount > newData[variantIndex].size?.length) {
        for (
          let i = newData[variantIndex].size?.length;
          i <= newSizeCount;
          i++
        ) {
          newData[variantIndex].size.push({
            size: "",
            price: 0,
            stock: 0,
          });
        }
        return newData;
      } else {
        newData[variantIndex].size.splice(newSizeCount);
        return newData;
      }
    });
  };

  const handleSizeChange = (e, variantIndex, sizeIndex, field) => {
    const { value } = e.target;
    setVariantsData((prevData) => {
      const newData = [...prevData];
      newData[variantIndex].size = newData[variantIndex].size.map(
        (item, index) => {
          if (index === sizeIndex) {
            return {
              ...item,
              [field]:
                field === "price" || field === "stock"
                  ? parseInt(value, 10) || 0
                  : value,
            };
          }
          return item;
        }
      );
      return newData;
    });
  };
  const [page, setPage] = useState(1);

  const failedToastField = () =>
    toast.custom((t) => (
      <CustomToast
        t={t}
        message="Please fill in all required fields"
        type="failed"
      />
    ));

  const handlePageChange = (newPage) => {
    if (page === 1) {
      if (!formData.name || !formData.category || !formData.brand) {
        failedToastField();
        return;
      }
    } else if (page === 3) {
      setFormData((prevData) => ({
        ...prevData,
        imageUrl: uploadedImages,
      }));
      if (uploadedImages?.length === 0) {
        failedToastField();
        return;
      }
    } else if (page > 3) {
      const i = page - 4;
      for (var j = 0; j < variantsData[i]?.size?.length; j++) {
        if (
          !variantsData[i]?.size[j]?.size ||
          !variantsData[i]?.size[j]?.price ||
          !variantsData[i]?.size[j]?.stock
        ) {
          failedToastField();
          return;
        }
      }
      if (!variantsData[i]?.name) {
        failedToastField();
        return;
      }
      setFormData((prevData) => ({
        ...prevData,
        variants: variantsData,
      }));
    }
    setPage(newPage);
  };

  const [readMore, setReadMore] = useState(false);
  const closePopover = () => {
    props.togglePopover("", null);
    setFormData({
      name: "",
      imageUrl: [],
      description: "",
      variants: [
        {
          size: "",
          price: 0,
          stock: 0,
        },
      ],
      store: "web",
    });
    setPage(1);
    setUploadedImages([]);
    setImages([]);
    setVariantsData([
      {
        name: "",
        description: "",
        size: [
          {
            size: "",
            price: 0,
            stock: 0,
          },
        ],
      },
    ]);
  };

  // POST
  const token = localStorage.getItem("token");
  const id = props.data?._id;
  // LOADING
  const [isLoading, setIsLoading] = useState(false);
  const DBURL = import.meta.env.VITE_APP_DB_URL;

  const postData = async () => {
    setIsLoading(true);

    await axios
      .post(DBURL + "/products/", formData, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        props.refetch();
        toast.custom((t) => (
          <CustomToast t={t} message="Add product successed" type="success" />
        ));
        props.togglePopover("", null);
      })
      .catch((error) => {
        console.error(error);
        toast.custom((t) => (
          <CustomToast t={t} message="Add product failed" type="failed" />
        ));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // console.log(formData);

  const patchData = async () => {
    setIsLoading(true);

    await axios
      .patch(DBURL + "/products/" + id?.toString(), formData, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        props.refetch();
        closePopover();
        toast.custom((t) => (
          <CustomToast t={t} message="Edit product successed" type="success" />
        ));
      })
      .catch((error) => {
        console.error(error);
        toast.custom((t) => (
          <CustomToast t={t} message="Edit product failed" type="failed" />
        ));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSubmit = async () => {
    if (props.showPopover === "add") {
      postData();
    } else if (props.showPopover === "edit") {
      patchData();
    }
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
      .delete(DBURL + "/products/" + id?.toString(), {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        props.refetch();
        closePopover();
        toast.custom((t) => (
          <CustomToast
            t={t}
            message="Delete product successed"
            type="success"
          />
        ));
      })
      .catch((error) => {
        console.error(error);
        toast.custom((t) => (
          <CustomToast t={t} message="Delete product failed" type="failed" />
        ));
      })
      .finally(() => {
        setIsLoadingDelete(false);
        setIsDeleteConfirmShow(false);
      });
  };

  return (
    <>
      <ConfirmDelete
        onConfirm={handleDelete}
        onCancel={handleDeleteConfirm}
        isShow={isDeleteConfirmShow}
        isLoading={isLoadingDelete}
        text={formData?.name + " - " + formData?.brand}
      />

      <AnimatePresence>
        {(props.showPopover === "add" || props.showPopover === "edit") &&
          props.popoverType === "fashions" && (
            <div className="fixed z-[1000] top-0 left-0 w-screen h-screen flex items-center justify-center">
              <BlackScreenPopover
                onClick={closePopover}
                isLoading={isLoading}
              />
              <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -100 }}
                transition={{ duration: 0.3 }}
                className={` ${
                  isLoading && "pointer-events-none"
                } relative overflow-hidden bg-section w-[24rem] px-4 sm:px-10 min-h-fit ${
                  page === 1
                    ? "h-[39rem] sm:h-[40rem]"
                    : page === 2
                    ? "h-[36rem] sm:h-[42rem]"
                    : page === 3
                    ? "h-[48rem] sm:h-[48rem]"
                    : page === 4 + variantsData.length
                    ? "h-[48rem] sm:h-[44rem]"
                    : page > 3 && "h-[39rem] sm:h-[42rem]"
                } transition-all duration-300 max-h-[95vh] sm:w-[40rem] mx-2 sm:mx-10 sm:pb-20 pb-0 p-5 z-[1] rounded-2xl shadow-md`}
              >
                {/* LOADING */}
                {isLoading && <LoadingPopover />}

                {/* LOGO */}
                <LogoPopover />

                <Title
                  title={
                    props.showPopover === "add"
                      ? "Add Fashions"
                      : "Edit Fashions"
                  }
                  className={" mb-2 mt-0"}
                />

                {/* FORM */}
                <div className="flex flex-col  gap-4 h-[62%] sm:h-[70%] pb-4 w-full justify-between">
                  <div className="h-full sm:h-[90%] ">
                    {page === 1 ? (
                      <div className="flex flex-col w-full h-fit gap-2">
                        {/* NAME */}
                        <TextField
                          value={formData?.name}
                          onChange={handleInputChange}
                          name="name"
                          placeholder="name"
                        />

                        {/* DOUBLE */}
                        <div className="flex gap-3 w-full">
                          {/* Type */}
                          <div className="w-[50%]">
                            <TextField
                              value={formData?.category}
                              onChange={handleInputChange}
                              name="category"
                              placeholder="Jaket, Celana, dll"
                            />
                          </div>

                          {/* Variant */}
                          <div className="w-[50%]">
                            <label
                              className="sm:text-base text-sm drop-shadow-sm font-semibold text-primaryNormal"
                              htmlFor="name"
                            >
                              Jumlah Variasi
                            </label>
                            <select
                              name="name"
                              onChange={handleVariantTotal}
                              value={variantsData?.length}
                              className="block w-full placeholder:text-gray-300 bg-white focus:outline-white p-3 text-sm text-primaryDark border rounded-lg"
                            >
                              {[...Array(10).keys()].map((num) => (
                                <option key={num + 1} value={num + 1}>
                                  {num + 1}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Brand */}
                        <div>
                          <TextField
                            value={formData?.brand}
                            onChange={handleInputChange}
                            name="brand"
                            placeholder="example"
                          />
                        </div>
                      </div>
                    ) : page === 2 ? (
                      <div className="h-full flex flex-col ">
                        {/* DESCRIPTION */}
                        <label
                          className="sm:text-base text-sm drop-shadow-sm font-semibold text-primaryNormal"
                          htmlFor="description"
                        >
                          Description
                        </label>
                        <textarea
                          name="description"
                          placeholder="example"
                          value={formData.description}
                          onChange={handleInputChange}
                          className="block w-full rounded-2xl max-h-[92%] h-full placeholder:text-gray-300 bg-white focus:outline-white p-3 text-sm text-primaryDark border "
                          style={{ resize: "none", whiteSpace: "pre-wrap" }}
                        />
                      </div>
                    ) : page === 3 ? (
                      <div className="h-[93%] w-full">
                        {/* RIGHT */}
                        <div className="gap-3 flex flex-col h-full w-full">
                          {/* IMAGE */}
                          <div className="h-full w-full">
                            <label
                              className="sm:text-base text-sm  drop-shadow-sm font-semibold text-primaryNormal ml-2"
                              htmlFor="name"
                            >
                              Image
                            </label>
                            <div className="w-full h-full flex flex-col gap-3 items-center justify-center">
                              <div
                                className={`w-full h-[40rem] max-h-full bg-white relative rounded-2xl shadow- border-2 border-blue-300 border-dashed hover:bg-gray-50 duration-100 transition-all`}
                              >
                                {uploadedImages?.length > 0 ? (
                                  <div className="text-sm text-primaryDark flex flex-col w-full h-full overflow-y-scroll">
                                    <div className="w-full gap-2 flex px-2 py-2 border-b-2 border-blue-200">
                                      <h1 className="w-[25%] flex items-center justify-center">
                                        Preview
                                      </h1>
                                      <h1 className="w-[50%] flex items-center">
                                        Data
                                      </h1>
                                      <h1 className="w-[25%] flex items-center justify-center">
                                        Action
                                      </h1>
                                    </div>
                                    {uploadedImages?.map((image, i) => {
                                      // console.log("IIFF", i, image.url);
                                      return (
                                        <div
                                          key={i}
                                          className="w-full gap-2 flex px-2 py-4 border-b-2 border-blue-200 transition-all duration-100"
                                        >
                                          <h1 className="w-[25%]  aspect-square flex items-center justify-center ">
                                            <img
                                              src={image?.url}
                                              alt="image"
                                              className="w-[95%] bg-gray-200 rounded-2xl shadow-lg h-full object-cover"
                                            />
                                          </h1>
                                          <h1 className=" w-[50%] flex items-center truncate">
                                            {image.name}
                                          </h1>
                                          <div className=" w-[20%] flex items-center justify-center">
                                            {image.progress ? (
                                              <div className="flex flex-col w-full items-center justify-center text-gray-400">
                                                uploading...
                                                <div className="w-full animate-pulse rounded-full h-2 border-2 border-blue-300 flex shadow-md relative">
                                                  <div
                                                    style={{
                                                      width: `${image.progress}%`,
                                                    }}
                                                    className="h-full bg-blue-300"
                                                  ></div>
                                                </div>
                                              </div>
                                            ) : (
                                              <button
                                                onClick={() => removeImage(i)}
                                                type="button"
                                                className="text-white h-10 aspect-square bg-red-400 rounded-full flex items-center justify-center border-2 border-red-400 hover:bg-transparent hover:text-red-400 transition-all duration-200 font-semibold hover:scale-[1.1]"
                                              >
                                                X
                                              </button>
                                            )}
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                ) : (
                                  <div className="pointer-events-none flex flex-col w-full h-full gap-5 mt-2 items-center justify-center ">
                                    <i className="fa-solid fa-cloud-arrow-up fa-2xl text-blue-400"></i>
                                    <h1 className="text-sm text-primaryDark">
                                      Upload Image 4x4 Here
                                    </h1>
                                  </div>
                                )}
                                <input
                                  type="file"
                                  accept="image/*"
                                  name="imageFile"
                                  multiple
                                  onInput={onSelectFiles}
                                  className={`cursor-pointer top-0 left-0 z-[100] ${
                                    !uploadedImages ? "w-full" : "w-[80%]"
                                  } h-full opacity-0 absolute`}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : page > 3 && page < 4 + variantsData?.length ? (
                      <div className="flex w-full h-full gap-3">
                        {/* LEFT */}
                        <div className="w-full h-[100%]">
                          <div className="w-full flex gap-3">
                            {/* NAME */}
                            <div className="w-[50%]">
                              <TextField
                                value={variantsData[page - 4]?.name}
                                onChange={(e) => handleVariantsChange(e)}
                                name="name"
                                onName={`Nama Variant ${page - 3}`}
                                placeholder="Biru"
                              />
                            </div>
                            {/* UKURAN */}
                            <div className="w-[50%]">
                              <label
                                className="sm:text-base text-sm drop-shadow-sm font-semibold text-primaryNormal"
                                htmlFor="sizeCount"
                              >
                                Jumlah Ukuran
                              </label>
                              <select
                                name="sizeCount"
                                onChange={(e) => handleSizeTotal(e, page - 4)}
                                value={variantsData[page - 4]?.size?.length}
                                className="block w-full placeholder:text-gray-300 bg-white focus:outline-white p-3 text-sm text-primaryDark border rounded-lg"
                              >
                                {[...Array(10).keys()].map((num) => (
                                  <option key={num + 1} value={num + 1}>
                                    {num + 1}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="flex flex-col gap-3 w-full h-[14rem] sm:h-[80%]  max-h-[90%] mt-3 overflow-y-scroll">
                            {variantsData[page - 4].size.map((item, index) => (
                              <div
                                key={index}
                                className="flex gap-3 pb-2 border-b border-gray-300"
                              >
                                <div>
                                  <TextField
                                    value={item?.size}
                                    onChange={(e) =>
                                      handleSizeChange(
                                        e,
                                        page - 4,
                                        index,
                                        "size"
                                      )
                                    }
                                    name={`size_${index}`}
                                    onName={`Ukuran ${index + 1}`}
                                    placeholder="XL"
                                  />
                                </div>
                                <div>
                                  <TextField
                                    value={item?.price}
                                    onChange={(e) =>
                                      handleSizeChange(
                                        e,
                                        page - 4,
                                        index,
                                        "price"
                                      )
                                    }
                                    name={`price_${index}`}
                                    onName={"Price"}
                                    placeholder="99000"
                                  />
                                </div>
                                <div>
                                  <TextField
                                    value={item?.stock}
                                    onChange={(e) =>
                                      handleSizeChange(
                                        e,
                                        page - 4,
                                        index,
                                        "stock"
                                      )
                                    }
                                    name={`stock_${index}`}
                                    onName={"Stock"}
                                    placeholder="99000"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full flex flex-col gap-3 text-sm max-sm:overflow-y-scroll max-sm:overflow-x-hidden">
                        <div className="h-[100%] max-sm:mt-[1rem] sm:h-[40%]  w-full flex max-sm:flex-col-reverse justify-between items-center text-primaryDark font-[600]">
                          <div className="w-full flex flex-col items-center sm:justify-between sm:h-full sm:py-3">
                            <div className="w-full flex py-1">
                              <span className="w-[35%] sm:w-[25%] flex">
                                Name
                              </span>
                              <span className="sm:w-[75%] flex truncate">
                                : {formData?.name}
                              </span>
                            </div>

                            <div className="w-full flex py-1">
                              <span className="w-[35%] sm:w-[25%] flex">
                                Category
                              </span>
                              <span className="sm:w-[75%] flex font-medium truncate">
                                : {formData?.category}
                              </span>
                            </div>
                            <div className="w-full flex py-1">
                              <span className="w-[35%] sm:w-[25%] flex">
                                Brand
                              </span>
                              <span className="sm:w-[75%] flex truncate">
                                : {formData?.brand}
                              </span>
                            </div>
                            <div className="w-full flex py-1 overflow-hidden">
                              <span className="w-[35%] sm:w-[25%] flex">
                                Description
                              </span>
                              <span className="flex">
                                <span className="max-w-[15rem] flex truncate text-ellipsis overflow-hidden font-medium">
                                  : {formData.description}
                                </span>
                              </span>
                              <button
                                className="ml-1 hover:opacity-[0.6]"
                                onClick={() => setReadMore(!readMore)}
                              >
                                ...
                              </button>
                            </div>
                          </div>
                          <div className="max-sm:w-full max-sm:pb-3 sm:h-[105%] aspect-square ">
                            <Swiper
                              slidesPerView={1}
                              spaceBetween={2}
                              navigation
                              className="w-full bg-white aspect-square flex  justify-center items-center  rounded-2xl shadow-lg"
                            >
                              {uploadedImages.length > 0 ? (
                                uploadedImages.map((image, index) => (
                                  <SwiperSlide key={index} className="">
                                    <div className="h-full w-full relative">
                                      <img
                                        src={image.url}
                                        alt={image.url}
                                        className="h-full aspect-square object-cover absolute"
                                      />
                                    </div>
                                  </SwiperSlide>
                                ))
                              ) : (
                                <SwiperSlide className="">
                                  <div className="font-semibold text-primaryDark flex items-center justify-center w-full h-full bg-gray-300 pb-1">
                                    No Image
                                  </div>
                                </SwiperSlide>
                              )}
                            </Swiper>
                          </div>
                        </div>
                        <div className="w-full   sm:h-[60%] flex flex-col">
                          <div className="w-full max-sm:flex-col max-sm:justify-center max-sm:text-center bg-secondary px-5 py-3 rounded-2xl shadow-2xl flex text-white font-semibold">
                            <h1 className="w-full sm:w-[30%] flex justify-center">
                              Variant
                            </h1>
                            {/* <h1 className="w-[40%]">Description</h1> */}
                            <h1 className="w-full sm:w-[70%] flex justify-center">
                              Size
                            </h1>
                          </div>
                          <div className="w-[101.7%] h-auto mt-2 overflow-y-scroll flex flex-col">
                            {formData?.variants?.map((item, index1) => (
                              <div
                                key={index1}
                                className="w-full bg-white mb-4 px-5 py-6 rounded-2xl shadow-lg flex text-primaryDark font-semibold text-[0.8rem] max-sm:flex-col"
                              >
                                <h1 className="w-full justify-center sm:w-[30%] h-full flex  items-center text-center truncate">
                                  {item?.name}
                                </h1>
                                <h1
                                  className={`w-full max-sm:justify-center sm:w-[70%] h-full flex items-center justify-center font-medium flex-col gap-2  py-3`}
                                >
                                  {item?.size?.map((size, index2) => {
                                    const link =
                                      "https://barcode.orcascan.com/?type=code128&data=" +
                                      formData._id?.toString() +
                                      "." +
                                      index1 +
                                      "." +
                                      index2;
                                    return (
                                      <div
                                        key={size?.size}
                                        className="flex items-center justify-center gap-1 font-semibold"
                                      >
                                        <div>{size?.size}</div> -
                                        <div>{size?.stock} pcs</div> -
                                        <div className="text-secondary font-semibold">
                                          Rp. {size?.price?.toLocaleString()}
                                        </div>
                                        {props.showPopover === "edit" && (
                                          <a
                                            href={link}
                                            target="_blank"
                                            rel="noreferrer"
                                            className={`px-3 py-2 text-white bg-section-dark rounded-md transition-all duration-200 ease-in ml-2 `}
                                          >
                                            <i className="fa-solid fa-barcode"></i>
                                          </a>
                                        )}
                                      </div>
                                    );
                                  })}
                                </h1>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* BUTTON */}
                  <div className="flex  gap-3 w-full items-center justify-center ">
                    <div className={`flex gap-3`}>
                      <Button
                        variant="secondary"
                        onClick={
                          page > 1 ? () => setPage((prev) => prev - 1) : {}
                        }
                        disabledParam={page === 1}
                        className={`${
                          page === 1 && "opacity-[0.5]"
                        } duration-100 transition-all max-sm:min-w-[3rem] `}
                      >
                        <i className="rotate-[180deg] fa-solid fa-arrow-right pt-[0.1rem] sm:mr-2  fa-lg"></i>
                        <span className="max-sm:hidden">Prev</span>
                      </Button>
                      {props.showPopover === "edit" && (
                        <Button
                          variant="red"
                          className={"max-sm:min-w-[3rem]"}
                          onClick={handleDeleteConfirm}
                        >
                          <i className="fa-solid fa-trash sm:mr-2 scale-[0.95] fa-lg"></i>{" "}
                          <span className="max-sm:hidden">Delete</span>
                        </Button>
                      )}
                      {page === 4 + variantsData?.length ? (
                        <Button
                          onClick={handleSubmit}
                          className={"max-sm:min-w-[3rem]"}
                          variant="secondary"
                        >
                          <span className="max-sm:hidden">
                            {props.showPopover === "add" ? "Add" : "Update"}
                          </span>
                          <i className="fa-solid fa-arrow-right  sm:ml-2 fa-lg"></i>
                        </Button>
                      ) : (
                        <Button
                          variant="secondary"
                          className={"max-sm:min-w-[3rem]"}
                          onClick={
                            page < 4 + variantsData?.length
                              ? () => handlePageChange(page + 1)
                              : null
                          }
                        >
                          <span className="max-sm:hidden">Next</span>
                          <i className="fa-solid fa-arrow-right pb-[0.1rem] sm:ml-2 fa-lg"></i>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
      </AnimatePresence>

      {/* READ MORE */}
      <ReadMoreDescription
        description={formData?.description}
        handleClose={() => setReadMore(false)}
        readMore={readMore}
      />
    </>
  );
}
