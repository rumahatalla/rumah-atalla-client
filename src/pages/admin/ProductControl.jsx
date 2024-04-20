/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import FashionProductSection from "../../components/ProductController/FashionProductSection";
import FashionProductPopover from "../../components/ProductController/FashionProductPopover";
import axios from "axios";
import FoodsProductSection from "../../components/ProductController/FoodsProductSection";
import FoodsProductPopover from "../../components/ProductController/FoodsProductPopover";
import { AnimatePresence, motion } from "framer-motion";
import Title from "../../components/Title";
import toast from "react-hot-toast";
import CustomToast from "../../components/CustomToast";
import Button from "../../components/Button";
import Title2 from "../../components/Title2";
import FashionProductSectionSkeleton from "../../components/ProductController/FashionProductSectionSkeleton";
import SearchBar from "../../components/SearchBar";
import ChangePageButton from "../../components/ChangePageButton";
import FashionHeadSection from "../../components/ProductController/FashionHeadSection";
import FoodHeadSection from "../../components/ProductController/FoodsHeadSection";
import Empty from "../../components/Empty";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination";

export default function ProductControl() {
  const DBURL = import.meta.env.VITE_APP_DB_URL;
  const navigate = useNavigate();

  // PAGE
  const [page, setPage] = useState("fashions");
  const [firstFashionData, setFirstFashionData] = useState([]);
  const [firstFoodsData, setFirstFoodsData] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [totalPage, setTotalPage] = useState(1);
  const ITEMS_PER_PAGE = 10; // Jumlah item per halaman
  const [isGetParam, setIsGetParam] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  const [idValue, setidValue] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  // FILTER FASHIONS
  const [storeFilters, setStoreFilters] = useState({
    tokopedia: true,
    shopee: true,
    web: true,
  });
  const handleStoreFilterChange = (store) => {
    setStoreFilters((prevFilters) => ({
      ...prevFilters,
      [store]: !prevFilters[store],
    }));
  };

  // FILTER FOODS
  const [foodsType, setFoodsType] = useState({
    foods: true,
    drinks: true,
  });
  const handleFoodsTypeFilterChange = (type) => {
    setFoodsType((prevFilters) => ({
      ...prevFilters,
      [type]: !prevFilters[type],
    }));
  };

  useEffect(() => {
    let pageParam =
      parseInt(new URLSearchParams(window.location.search).get("page")) || 1;
    let typeParam =
      new URLSearchParams(window.location.search).get("type") || "fashions";
    setPage(typeParam);
    setPagination(pageParam);
    fetchFoodsProducts();
    fetchWebProducts();
  }, []);

  useEffect(() => {
    if (!pagination) {
      return;
    }
    let data = [];
    if (page === "fashions") {
      data = firstFashionData.filter(
        (item) => storeFilters[item.store] || false
      );
    } else if (page === "foods") {
      data = firstFoodsData.filter((item) => foodsType[item.type] || false);
    }

    data = data.filter(
      (item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase()) &&
        (item._id.toString().toLowerCase().includes(idValue.toLowerCase()) ||
          false)
    );

    let totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
    if (
      firstFashionData.length % ITEMS_PER_PAGE === 0 &&
      firstFashionData.length - ITEMS_PER_PAGE > 0
    ) {
      totalPages--;
    }
    setTotalPage(totalPages);
    if (pagination && page) {
      navigate(`?page=${pagination}&type=${page}`);
      setIsGetParam(true);
    }
    const startIndex = (pagination - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    const slicedData = data.slice(startIndex, endIndex);
    setFilteredProducts(slicedData);
  }, [
    pagination,
    firstFashionData,
    page,
    isGetParam,
    searchValue,
    idValue,
    storeFilters,
    foodsType,
  ]);

  useEffect(() => {
    if (isGetParam) {
      setPagination(1);
    }
  }, [page]);

  // FETCH PRODUCTS
  const [isLoading, setIsLoading] = useState(true);
  const fetchWebProducts = async () => {
    await axios
      .get(DBURL + "/products/")
      .then((res) => {
        setFirstFashionData(res.data);
      })
      .catch((err) => {});
  };

  // FETCH FOODS
  const fetchFoodsProducts = async () => {
    await axios
      .get(DBURL + "/foods")
      .then((res) => {
        setFirstFoodsData(res.data);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    fetchWebProducts();
    fetchFoodsProducts();
  }, []);

  useEffect(() => {
    if (firstFashionData.length > 0 && firstFoodsData.length > 0) {
      setIsLoading(false);
    }
  }, [firstFashionData, firstFoodsData]);

  // POPOVER
  const [showPopover, setShowPopover] = useState("");
  const [popoverType, setPopoverType] = useState("");
  const [dataPopover, setDataPopover] = useState({});
  const togglePopover = ({ param, item, type }) => {
    setPopoverType(type);
    setDataPopover(item);
    setShowPopover(param);
  };

  // DOWNLOAD DATA
  const handleDownload = async () => {
    try {
      const BEURL =
        page === "foods"
          ? DBURL + "/foods/data/download"
          : DBURL + "/products/data/download";
      // Making a GET request to download the file
      const response = await axios.get(BEURL, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });

      // Creating a blob URL from the response data
      const downloadUrl = response.data.fileUrl;

      // Creating an <a> element to trigger the download
      const a = document.createElement("a");
      a.href = downloadUrl;

      // Setting the file name for download

      const fileName =
        page === "foods" ? "FoodsProducts.xlsx" : "FashionProducts.xlsx";
      a.download = fileName;

      // Appending the <a> element to the document body, triggering the download, and removing the element
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      toast.custom((t) => (
        <CustomToast t={t} message="Download succeed" type="success" />
      ));
    } catch (error) {
      console.error("Error downloading data:", error);
      toast.custom((t) => (
        <CustomToast t={t} message="Download failed" type="failed" />
      ));
    }
  };

  return (
    <>
      <AnimatePresence>
        {/* POPOVER */}
        {page === "fashions" ? (
          <FashionProductPopover
            data={dataPopover}
            togglePopover={togglePopover}
            showPopover={showPopover}
            popoverType={popoverType}
            refetch={() => fetchWebProducts()}
          />
        ) : (
          <FoodsProductPopover
            data={dataPopover}
            togglePopover={togglePopover}
            showPopover={showPopover}
            popoverType={popoverType}
            refetch={() => fetchFoodsProducts()}
          />
        )}

        <div className="w-full  pb-20 pt-10 ">
          {/* FILTER */}
          <div className="h-auto  w-full bg-section-rainbow flex flex-col rounded-2xl shadow-lg p-7 ">
            {/* TOP */}
            <Title2 title={"Filter"} />

            <div className="flex flex-col w-full gap-3 mb-3">
              <div className="flex flex-col sm:flex-row w-full gap-2 max-sm:gap-4">
                {/* STORE */}
                {page === "fashions" && (
                  <div className="flex flex-wrap flex-row gap-2 w-full">
                    {Object.keys(storeFilters).map((store) => {
                      return (
                        <Button
                          key={store}
                          onClick={() => handleStoreFilterChange(store)}
                          variant={
                            storeFilters[store] ? "secondary" : "transparent"
                          }
                          className={
                            "capitalize max-sm:rounded-xl h-12 sm:rounded-xl"
                          }
                        >
                          {store === "shopee" ? (
                            <img
                              src="/Shopee.png"
                              className={`w-6 mr-2 ${
                                !storeFilters[store]
                                  ? "bg-secondary"
                                  : "bg-white"
                              } rounded-full p-1 scale-[1.2]`}
                              alt=""
                            />
                          ) : store === "tokopedia" ? (
                            <img
                              src="/Tokopedia.png"
                              className={`w-6 mr-2  rounded-full p-1 scale-[1.2] ${
                                !storeFilters[store]
                                  ? "bg-secondary"
                                  : "bg-white"
                              }  `}
                              alt=""
                            />
                          ) : (
                            <div
                              className={`aspect-square mr-2 ${
                                !storeFilters[store]
                                  ? "bg-secondary text-white"
                                  : "bg-white text-secondary"
                              } rounded-full p-1 flex items-center justify-center `}
                            >
                              <i
                                className={` scale-[0.8]  fa-solid fa-store fa-lg`}
                              ></i>
                            </div>
                          )}
                          {store}
                        </Button>
                      );
                    })}
                  </div>
                )}

                {/* FOODS / DRINKS */}
                {page === "foods" && (
                  <div className="flex flex-row gap-2 w-full">
                    {Object.keys(foodsType).map((type) => (
                      <Button
                        key={type}
                        onClick={() => handleFoodsTypeFilterChange(type)}
                        variant={foodsType[type] ? "secondary" : "transparent"}
                        className={
                          "capitalize max-sm:rounded-xl h-12 sm:rounded-xl"
                        }
                      >
                        {type === "drinks" ? (
                          <div
                            className={`aspect-square mr-2 ${
                              !foodsType[type]
                                ? "bg-secondary text-white"
                                : "bg-white text-secondary"
                            } rounded-full p-1 flex items-center justify-center `}
                          >
                            <i
                              className={`   fa-solid fa-mug-saucer scale-[0.8] fa-lg`}
                            ></i>
                          </div>
                        ) : (
                          <div
                            className={`aspect-square mr-2 ${
                              !foodsType[type]
                                ? "bg-secondary text-white"
                                : "bg-white text-secondary"
                            } rounded-full p-1 flex items-center justify-center `}
                          >
                            <i
                              className={`   fa-solid fa-bowl-food scale-[0.8] fa-lg`}
                            ></i>
                          </div>
                        )}
                        {type}
                      </Button>
                    ))}
                  </div>
                )}
                {/* RIGHT */}
                <div className="flex max-sm:flex-col gap-1 ">
                  <Button
                    variant="green"
                    className={"h-fit max-sm:min-w-[3rem]"}
                    onClick={handleDownload}
                  >
                    <i className="fa-solid fa-file-arrow-down mr-2"></i>
                    <span className="max-sm:hidden">Download</span>
                  </Button>
                  <Button
                    variant="secondary"
                    className={"h-fit max-sm:min-w-[3rem]"}
                    onClick={() =>
                      togglePopover({
                        param: "add",
                        item: null,
                        type: page === "fashions" ? "fashions" : "foods",
                      })
                    }
                  >
                    <i className="fa-solid fa-plus mr-2"></i>
                    <span className="max-sm:hidden">Add</span>
                  </Button>
                </div>
              </div>

              <div className="w-full flex gap-2">
                {/* SEARCH */}
                {/* SEARCH BY NAME*/}
                <SearchBar
                  onChange={(e) => setSearchValue(e.target.value)}
                  value={searchValue}
                  placeholder="Search by name..."
                />

                {/* SEARCH BY ID*/}
                <SearchBar
                  onChange={(e) => setidValue(e.target.value)}
                  value={idValue}
                  placeholder="Search by ID..."
                />
              </div>
            </div>

            {/* BOTTOM */}
            <div className="w-full flex max-sm:flex-col items-center gap-2">
              <ChangePageButton
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl6SzfGl7TUhR-NEd2sL_rwbaBq-7dRG2Cxg&usqp=CAU"
                setPage={() => setPage("foods")}
                height={"10rem"}
                page={page}
                text={"foods"}
              />
              <ChangePageButton
                image="https://img.freepik.com/premium-photo/group-young-beautiful-muslim-women-fashionable-dress-with-hijab-using-mobile-phone-while-taking-selfie-picture-front-black-chalkboard-representing-modern-islam-fashion-technology-ramad_530697-51545.jpg"
                setPage={() => setPage("fashions")}
                height={"10rem"}
                page={page}
                text={"fashions"}
              />
            </div>
          </div>

          {/* TITTLE */}
          <Title title={"Fashions"} />

          {filteredProducts?.length > 0 ? (
            <>
              <div className="w-full min-h-screen text-base sm:text-lg  h-auto mb-10">
                {/* FASHIONS PROFDUCTS */}
                {page === "fashions" && (
                  <>
                    {/* HEAD */}
                    <FashionHeadSection />
                    {filteredProducts.map((item, i) => (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        key={item.id}
                        className="my-2"
                      >
                        <FashionProductSection
                          number={i + 1}
                          data={item}
                          handlePopover={togglePopover}
                        />
                      </motion.div>
                    ))}
                  </>
                )}

                {/* FOODS PRODUCTS */}
                {page === "foods" && (
                  <>
                    {/* HEAD */}
                    <FoodHeadSection />
                    {filteredProducts.map((item, i) => (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        key={item.id}
                        className="my-2"
                      >
                        <FoodsProductSection
                          number={i + 1}
                          data={item}
                          handlePopover={togglePopover}
                        />
                      </motion.div>
                    ))}
                  </>
                )}
              </div>
            </>
          ) : isLoading ? (
            <>
              {[...Array(10)].map((i) => (
                <>
                  <FashionProductSectionSkeleton />
                </>
              ))}
            </>
          ) : (
            <Empty />
          )}

          <Pagination
            totalPage={totalPage}
            pagination={pagination}
            setPagination={setPagination}
          />
        </div>
      </AnimatePresence>
    </>
  );
}
