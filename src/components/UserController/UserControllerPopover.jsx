/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../Button";
import toast from "react-hot-toast";
import CustomToast from "../../components/CustomToast";
import TextField from "../TextField";
import Title from "../Title";
import LogoPopover from "../LogoPopover";
import LoadingPopover from "../LoadingPopover";
import BlackScreenPopover from "../BlackScreenPopover";
import ConfirmDelete from "../ConfirmDelete";

/* eslint-disable react/prop-types */
export default function UserControllerPopover(props) {
  const DBURL = import.meta.env.VITE_APP_DB_URL;

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    number: "",
    imageUrl: {},
    password: "",
    role: "admin",
  });

  useEffect(() => {
    if (props?.data && props?.showPopover === "edit") {
      setUserData({
        username: props.data.username,
        email: props.data.email,
        number: props.data.number,
        imageUrl: props.data.imageUrl,
        role: props.data.role,
        password: "",
      });
    }
  }, [props]);

  const handleOutPopover = () => {
    setUserData({
      username: "",
      email: "",
      number: "",
      password: "",
      imageUrl: {},
    });
    props.togglePopover("", null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const token = localStorage.getItem("token");
  const id = props.data?._id;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      console.log("INI IMAGE", file, reader);
      reader.onloadend = () => {
        setUserData((prevData) => ({
          ...prevData,
          imageUrl: {
            url: reader.result,
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  console.log(userData);

  // LOADING
  const [isLoading, setIsLoading] = useState(false);

  const postUser = async () => {
    setIsLoading(true);

    axios
      .post(DBURL + "/users/signup", userData, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        handleOutPopover();
        toast.custom((t) => (
          <CustomToast t={t} message="Add user successed" type="success" />
        ));
        props.refetch();
      })
      .catch((error) => {
        console.error(error);
        toast.custom((t) => (
          <CustomToast t={t} message="Add user failed" type="failed" />
        ));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const patchUser = async () => {
    setIsLoading(true);
    if (!userData.password) {
      delete userData.password;
    }
    console.log("DATA", userData);
    axios
      .patch(DBURL + "/users/" + id.toString(), userData, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        handleOutPopover();
        toast.custom((t) => (
          <CustomToast t={t} message="Edit user successed" type="success" />
        ));
        props.refetch();
      })
      .catch((error) => {
        console.error(error);
        toast.custom((t) => (
          <CustomToast t={t} message="Edit user failed" type="failed" />
        ));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSubmit = async () => {
    if (props.showPopover === "add") {
      await postUser();
    } else if (props.showPopover === "edit") {
      await patchUser();
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
      .delete(DBURL + "/users/" + id.toString(), {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        handleOutPopover();
        toast.custom((t) => (
          <CustomToast t={t} message="Delete user successed" type="success" />
        ));
        props.refetch();
      })
      .catch((error) => {
        console.error(error);
        toast.custom((t) => (
          <CustomToast t={t} message="Delete user failed" type="failed" />
        ));
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
        text={userData?.username}
      />
      <AnimatePresence>
        {(props.showPopover === "add" || props.showPopover === "edit") && (
          <div className="fixed z-[1000] top-0 left-0 w-screen h-screen flex items-center justify-center">
            <BlackScreenPopover
              onClick={handleOutPopover}
              isLoading={isLoading}
            />
            {/* CONTENT */}
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.3 }}
              className={` ${
                isLoading && "pointer-events-none"
              } relative overflow-hidden bg-thirdyThin  w-[40rem] mx-2 pb-10 h-fit sm:pb-10 z-[1] rounded-2xl shadow-md sm:px-10 px-5`}
            >
              {/* LOADING */}
              {isLoading && <LoadingPopover />}

              {/* LOGO */}
              <LogoPopover />

              <Title
                title={props.showPopover === "add" ? "Add User" : "Edit User"}
                className={" my-3"}
              />

              {/* FORM */}
              <form action="" className="flex flex-col gap-2  ">
                <div className="flex w-full gap-2">
                  {/* LEFT */}
                  <div className="flex flex-col gap-2 w-full">
                    {/* NAME */}
                    <TextField
                      value={userData?.username}
                      onChange={handleInputChange}
                      name="username"
                      placeholder="name"
                      disabled={props.showPopover === "edit" && true}
                    />
                    {/* NUMBER */}
                    <TextField
                      value={userData?.number}
                      onChange={handleInputChange}
                      name="number"
                      placeholder="083134395844"
                    />
                  </div>
                  {/* RIGHT */}
                  <div>
                    <label
                      className="text-base  drop-shadow-sm font-semibold text-primaryNormal ml-2"
                      htmlFor="name"
                    >
                      Image
                    </label>
                    <div className="w-[7.3rem] sm:w-[8rem] relative cursor-pointer aspect-square flex flex-col justify-center items-center border-2 border-dashed border-blue-400 bg-white rounded-2xl overflow-hidden">
                      <input
                        type="file"
                        accept="image/*"
                        name="imageFile"
                        onChange={handleImageUpload}
                        className="w-full opacity-0 absolute h-full cursor-pointer"
                      />
                      {userData?.imageUrl.url ? (
                        <img
                          src={userData?.imageUrl?.url}
                          alt="Image Preview"
                          className="block h-full w-full object-cover "
                        />
                      ) : (
                        <div className="flex flex-col gap-5 mt-2 items-center justify-center ">
                          <i className="fa-solid fa-cloud-arrow-up fa-2xl text-blue-400"></i>
                          <h1 className="text-sm text-primaryDark text-center">
                            Upload Image 4x4 Here
                          </h1>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* EMAIL */}
                <div className="grid grid-cols-2 gap-2">
                  <TextField
                    value={userData?.email}
                    onChange={handleInputChange}
                    name="email"
                    placeholder="example123@gmail.com"
                  />
                  <div className="h-full">
                    <label
                      htmlFor="role"
                      className="text-base font-semibold text-primaryNormal"
                    >
                      Role
                    </label>
                    <select
                      id="kasir"
                      name="kasir"
                      className="block w-full p-3 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={userData.role}
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          role: e.target.value,
                        }))
                      }
                    >
                      <option
                        disabled={props?.data?.role !== "owner"}
                        value="owner"
                      >
                        Owner
                      </option>
                      <option
                        disabled={props?.data?.role === "owner"}
                        value="admin"
                      >
                        Admin
                      </option>
                      <option
                        disabled={props?.data?.role === "owner"}
                        value="product manager"
                      >
                        Product Manager
                      </option>
                    </select>
                  </div>
                </div>
                {/* PASSWORD */}
                <TextField
                  value={userData?.password}
                  onChange={handleInputChange}
                  name="password"
                  placeholder="84h2roj*#"
                  type="password"
                />

                {/* BUTTON */}
                <div className="flex max-sm:justify-center gap-2 mt-3">
                  {props.showPopover === "edit" && (
                    <Button
                      variant="red"
                      disabledParam={userData?.role === "owner"}
                      onClick={handleDeleteConfirm}
                      className={`sm:ml-auto min-w-[3rem]`}
                    >
                      <i className="fa-solid fa-trash sm:mr-2 scale-[0.95] fa-lg"></i>{" "}
                      <span className="max-sm:hidden">Delete</span>
                    </Button>
                  )}
                  <Button
                    variant="secondary"
                    onClick={() => handleSubmit()}
                    className={`${
                      props.showPopover === "add" && "sm:ml-auto"
                    } min-w-[3rem]`}
                  >
                    <i className="fa-solid fa-pen sm:mr-2 scale-[0.95] fa-lg"></i>{" "}
                    <span className="max-sm:hidden">
                      {props.showPopover === "add" ? "Add User" : "Edit User"}
                    </span>
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
