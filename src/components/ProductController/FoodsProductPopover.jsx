/* eslint-disable no-unused-vars */
import axios from "axios";
import { useDebugValue, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../Button";
import toast from "react-hot-toast";
import CustomToast from "../../components/CustomToast";
import LogoPopover from "../LogoPopover";
import LoadingPopover from "../LoadingPopover";
import BlackScreenPopover from "../BlackScreenPopover";
import Title from "../Title";
import TextField from "../TextField";
import Title2 from "../Title2";
import ConfirmDelete from "../ConfirmDelete";

/* eslint-disable react/prop-types */
export default function FoodsProductPopover(props) {
  const DBURL = import.meta.env.VITE_APP_DB_URL;

  // PREV DATA
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: {},
    type: "drinks",
    description: "",
    stock: "",
    price: "",
  });

  useEffect(() => {
    if (props.data) {
      setFormData({
        name: props.data.name,
        imageUrl: props.data.imageUrl,
        type: props.data.type,
        description: props.data.description,
        stock: props.data.stock,
        price: props.data.price,
      });
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
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      console.log("INI IMAGE", file, reader);
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

  // POST
  const token = localStorage.getItem("token");
  const id = props.data?._id;
  // LOADING
  const [isLoading, setIsLoading] = useState(false);
  const postData = async () => {
    setIsLoading(true);
    await axios
      .post(DBURL + "/foods/", formData, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        console.log(response.data);
        props.refetch();
        toast.custom((t) => (
          <CustomToast t={t} message="Add product successed" type="success" />
        ));
        setFormData({
          name: "",
          imageUrl: {},
          description: "",
          stock: "",
          status: "",
          store: "web",
          price: 0,
        });
        props.togglePopover("", null);
      })
      .catch((error) => {
        toast.custom((t) => (
          <CustomToast t={t} message="Add product failed" type="failed" />
        ));
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const patchData = async () => {
    setIsLoading(true);
    await axios
      .patch(DBURL + "/foods/" + id.toString(), formData, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        console.log("INI PATCH", response.data);
        props.refetch();
        toast.custom((t) => (
          <CustomToast t={t} message="Edit product successed" type="success" />
        ));
        setFormData({
          name: "",
          imageUrl: {},
          description: "",
          stock: "",
          status: "",
          store: "web",
          price: 0,
        });
        props.togglePopover("", null);
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

  // Fungsi untuk mengirim data setelah form di-submit
  const handleSubmit = async () => {
    console.log("LIHATLAH INI", formData);
    if (props.showPopover === "add") {
      postData();
    } else if (props.showPopover === "edit") {
      patchData();
    }
  };

  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isDeleteConfirmShow, setIsDeleteConfirmShow] = useState(false);
  const handleDeleteConfirm = () => {
    setIsDeleteConfirmShow(!isDeleteConfirmShow);
  };

  const handleDelete = async () => {
    setIsLoadingDelete(true);
    await axios
      .delete(DBURL + "/foods/" + id.toString(), {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        console.log(response.data);
        props.refetch();
        toast.custom((t) => (
          <CustomToast
            t={t}
            message="Delete product successed"
            type="success"
          />
        ));
        props.togglePopover("", null);
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
        text={formData?.name}
      />

      <AnimatePresence>
        {(props.showPopover === "add" || props.showPopover === "edit") &&
          props.popoverType === "foods" && (
            <div className="fixed z-[1000] top-0 left-0 w-screen h-screen flex items-center justify-center">
              <BlackScreenPopover
                onClick={() => {
                  props.togglePopover("", null);
                  setFormData({
                    name: "",
                    imageUrl: {},
                    type: "",
                    description: "",
                    stock: "",
                    price: "",
                  });
                }}
                isLoading={isLoading}
              />

              <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -100 }}
                transition={{ duration: 0.3 }}
                className={` ${
                  isLoading && "pointer-events-none"
                } relative overflow-hidden bg-section  w-[24rem] px-7 sm:px-10  pt-0 sm:w-[40rem] mx-10 h-[39rem] sm:h-[42rem] p-5 z-[1] rounded-2xl shadow-md`}
              >
                {/* LOADING */}
                {isLoading && <LoadingPopover />}

                {/* LOGO */}
                <LogoPopover />

                <Title
                  title={
                    props.showPopover === "add" ? "Add Foods" : "Edit Foods"
                  }
                  className={" my-3"}
                />
                {/* FORM */}
                <form action="" className="flex flex-col gap-3">
                  <div className="flex w-full gap-3">
                    {/* LEFT */}
                    <div className="w-full">
                      <label
                        className="text-base  drop-shadow-sm font-semibold text-primaryNormal"
                        htmlFor="name"
                      >
                        Nama
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="example"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="block w-full placeholder:text-gray-300 bg-white focus:outline-white p-3 text-sm text-primaryDark border rounded-lg "
                      />
                      {/* DESC */}
                      <div>
                        <label
                          className="text-base  drop-shadow-sm font-semibold text-primaryNormal"
                          htmlFor="description"
                        >
                          Description
                        </label>
                        <textarea
                          name="description"
                          placeholder="example"
                          value={formData.description}
                          onChange={handleInputChange}
                          className="block w-full h-[8.6rem] sm:h-[10rem] placeholder:text-gray-300 bg-white focus:outline-white p-3 text-sm text-primaryDark border rounded-lg "
                          style={{ resize: "none" }}
                        />
                      </div>
                    </div>
                    {/* RIGHT */}
                    <div className="gap-3 flex flex-col">
                      {/* IMAGE */}
                      <div>
                        <label
                          className="text-base  drop-shadow-sm font-semibold text-primaryNormal ml-2"
                          htmlFor="name"
                        >
                          Image
                        </label>
                        <div className="w-[8rem] sm:w-[14.5rem] relative cursor-pointer aspect-square flex flex-col justify-center items-center border-2 border-dashed border-blue-400 bg-white rounded-2xl overflow-hidden">
                          <input
                            type="file"
                            accept="image/*"
                            name="imageFile"
                            onChange={handleImageUpload}
                            className="w-full opacity-0 absolute h-full cursor-pointer"
                            // className="block w-full bg-white focus:outline-white p-3 text-sm text-primaryDark border rounded-lg"
                          />
                          {formData?.imageUrl?.url ? (
                            <img
                              src={formData?.imageUrl?.url}
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
                      {/* TYPE */}
                      <div className="w-full sm:hidden">
                        <label
                          className="text-base drop-shadow-sm font-semibold text-primaryNormal"
                          htmlFor="type"
                        >
                          Type
                        </label>
                        <select
                          name="type"
                          value={formData.type}
                          onChange={handleInputChange}
                          className="block w-full bg-white focus:outline-white p-3 text-sm text-primaryDark rounded-lg"
                        >
                          <option value="drinks">Drinks</option>
                          <option value="foods">Foods</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 w-full">
                    {/* PRICE */}
                    <div className="w-[75%] sm:w-[50%]">
                      <label
                        className="text-base  drop-shadow-sm font-semibold text-primaryNormal"
                        htmlFor="password"
                      >
                        Price
                      </label>
                      <input
                        type="text"
                        name="price"
                        placeholder="90000"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="block w-full placeholder:text-gray-300 bg-white focus:outline-white p-3 text-sm text-primaryDark border rounded-lg "
                      />
                    </div>

                    {/* STOCK */}
                    <div className="w-[50%] sm:w-[20%]">
                      <label
                        className="text-base  drop-shadow-sm font-semibold text-primaryNormal"
                        htmlFor="email"
                      >
                        Stock
                      </label>
                      <input
                        type="text"
                        name="stock"
                        placeholder="100"
                        value={formData.stock}
                        onChange={handleInputChange}
                        className="block w-full placeholder:text-gray-300 bg-white focus:outline-white p-3 text-sm text-primaryDark border rounded-lg "
                      />
                    </div>

                    {/* TYPE */}
                    <div className="w-[25%] sm:w-[30%] max-sm:hidden">
                      <label
                        className="text-base drop-shadow-sm font-semibold text-primaryNormal"
                        htmlFor="type"
                      >
                        Type
                      </label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        className="block w-full bg-white focus:outline-white p-3 text-sm text-primaryDark rounded-lg"
                      >
                        <option value="drinks">Drinks</option>
                        <option value="foods">Foods</option>
                      </select>
                    </div>
                  </div>

                  {/* BUTTON */}
                  <div className="flex gap-3 mt-2 max-sm:justify-center">
                    {props.showPopover === "edit" && (
                      <Button
                        variant="red"
                        onClick={handleDeleteConfirm}
                        className={`ml-auto`}
                      >
                        <i className="fa-solid fa-trash mr-2 scale-[0.95] fa-lg"></i>{" "}
                        Delete
                      </Button>
                    )}
                    <Button
                      variant="secondary"
                      onClick={() => handleSubmit()}
                      className={`${props.showPopover === "add" && "ml-auto"}`}
                    >
                      <i className="fa-solid fa-pen mr-2 scale-[0.95] fa-lg"></i>{" "}
                      {props.showPopover === "add"
                        ? "Add Product"
                        : "Edit Product"}
                    </Button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
      </AnimatePresence>
    </>
  );
}
