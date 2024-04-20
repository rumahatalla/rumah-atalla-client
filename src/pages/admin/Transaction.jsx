/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import FashionTransactionSection from "../../components/Transaction/FashionTransactionSection";
import axios from "axios";
import TransactionPopover from "../../components/Transaction/TransactionPopover";
import FoodTransactionSection from "../../components/Transaction/FoodTransactionSection";
import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import Button from "../../components/Button";
import Title from "../../components/Title";
import Title2 from "../../components/Title2";
import SearchBar from "../../components/SearchBar";
import ChangePageButton from "../../components/ChangePageButton";
import TransactionFashionHeadSection from "../../components/Transaction/TransactionFashionHeadSection";
import TransactionFoodHeadSection from "../../components/Transaction/TransactionFoodHeadSection";
import TransactionSectionSkeleton from "../../components/Transaction/TransactionSectionSkeleton";
import toast from "react-hot-toast";
import CustomToast from "../../components/CustomToast";
import BlackScreenPopover from "../../components/BlackScreenPopover";
import Empty from "../../components/Empty";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination";

export default function Transactions() {
  const DBURL = import.meta.env.VITE_APP_DB_URL;
  const navigate = useNavigate();

  // OWNER
  const user = JSON.parse(localStorage.getItem("user"));

  // PAGE
  const [page, setPage] = useState("fashions");

  // FETCH KASIR
  const [kasir, setKasir] = useState([]);
  const fetchKasir = async () => {
    await axios
      .get(DBURL + "/users/", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        let kasirName = [];
        res.data.map((kasir) => {
          kasirName.push(kasir.username);
        });
        setKasir(kasirName);
      })
      .catch((err) => {});
  };
  useEffect(() => {
    fetchKasir();
  }, []);

  // FETCH PRODUCTS
  const [filteredFashionTransaction, setFilteredFashionTransaction] = useState(
    []
  );

  const [isLoading, setIsLoading] = useState(false);
  const User = JSON.parse(localStorage.getItem("user"));

  // FETCH TRANSACTIONS
  const [transactionsData, setTransactionsData] = useState([]);
  const [transactionsWeb, setTransactionsWeb] = useState([]);
  const [firstData, setFirstData] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [totalPage, setTotalPage] = useState(1);
  const ITEMS_PER_PAGE = 10; // Jumlah item per halaman
  const [isGetParam, setIsGetParam] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    let pageParam =
      parseInt(new URLSearchParams(window.location.search).get("page")) || 1;
    let typeParam =
      new URLSearchParams(window.location.search).get("type") || "fashions";
    setPage(typeParam);
    setPagination(pageParam);
    fetchTransactions();
    fetchPromos();
  }, []);

  //   FILTER
  const [selectedKasir, setSelectedKasir] = useState("");
  const [openSelectKasirPopover, setOpenSelectKasirPopover] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [storeFilters, setStoreFilters] = useState({
    tokopedia: true,
    shopee: true,
    web: true,
  });
  const [statusFilters, setStatusFilters] = useState({
    pending: true,
    successed: true,
    canceled: true,
  });
  const [searchValue, setSearchValue] = useState("");
  const [idValue, setidValue] = useState("");
  const handleStoreFilterChange = (store) => {
    setStoreFilters((prevFilters) => ({
      ...prevFilters,
      [store]: !prevFilters[store],
    }));
  };
  const handleStatusFilterChange = (status) => {
    setStatusFilters((prevFilters) => ({
      ...prevFilters,
      [status]: !prevFilters[status],
    }));
  };
  const [sortedTransactions, setSortedTransactions] = useState([]);
  const [totalCanceledTransactions, setTotalCanceledTransactions] = useState(0);
  const [totalSuccededTransactions, setTotalSuccededTransactions] = useState(0);
  const [totalPendingTransactions, setTotalPendingTransactions] = useState(0);
  const [dailyTransactions, setDailyTransactions] = useState([]);

  useEffect(() => {
    if (!pagination) {
      return;
    }
    let data = firstData;
    // FILTER
    if (page === "fashions") {
      data = data.filter(
        (item) =>
          item.type === "fashions" && (storeFilters[item.store] || false)
      );
    } else if (page === "foods") {
      data = data.filter((item) => item.type === "foods");
    }
    if (user.role !== "owner") {
      data = data.filter((item) => item.kasir === user.username);
    }
    if (startDate && endDate) {
      data = data.filter((transaction) => {
        const transactionDate = new Date(transaction.createdAt);
        return (
          transactionDate >= new Date(startDate) &&
          transactionDate <= new Date(endDate + "T23:59:59")
        );
      });
    }

    data = data.filter(
      (item) =>
        item.buyer?.toLowerCase().includes(searchValue?.toLowerCase()) &&
        (statusFilters[item.status] || false) &&
        (selectedKasir === "" || selectedKasir === item.kasir) &&
        (item._id.toString().toLowerCase().includes(idValue.toLowerCase()) ||
          false)
    );

    let totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
    if (
      firstData.length % ITEMS_PER_PAGE === 0 &&
      firstData.length - ITEMS_PER_PAGE > 0
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

    const slicedData = data.reverse().slice(startIndex, endIndex).reverse();
    // TOTAL STATUS TRANSACTION
    setTotalCanceledTransactions(
      slicedData.filter(
        (item) =>
          item.status === "canceled" &&
          item.type != "foods" &&
          (storeFilters[item.store] || false)
      ).length
    );
    setTotalSuccededTransactions(
      slicedData.filter(
        (item) =>
          item.status === "successed" &&
          item.type != "foods" &&
          (storeFilters[item.store] || false)
      ).length
    );
    setTotalPendingTransactions(
      slicedData.filter(
        (item) =>
          item.status === "pending" &&
          item.type != "foods" &&
          (storeFilters[item.store] || false)
      ).length
    );
    setTransactionsWeb(slicedData);
    setSortedTransactions(slicedData);
    setFilteredFashionTransaction(slicedData);
  }, [
    pagination,
    firstData,
    isGetParam,
    page,
    storeFilters,
    statusFilters,
    selectedKasir,
    searchValue,
    idValue,
    startDate,
    endDate,
  ]);

  useEffect(() => {
    if (isGetParam) {
      setPagination(1);
    }
  }, [page]);

  const fetchTransactions = async () => {
    if (transactionsWeb.length === 0) {
      setIsLoading(true);
    }

    await axios
      .get(DBURL + "/transactions/", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setFirstData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {});
  };

  // FETCH PROMO
  const [promos, setPromos] = useState([]);
  const fetchPromos = async () => {
    await axios
      .get(DBURL + "/promos/", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setPromos(res.data.filter((item) => item.for === "fashions"));
      })
      .catch((err) => {});
  };
  useEffect(() => {
    setSortedTransactions(
      transactionsData.map(
        (_, index) => transactionsData[transactionsData.length - index - 1]
      )
    );

    const dateNow = new Date().setHours(0, 0, 0, 0); // set hours, minutes, seconds, and milliseconds to zero for comparison
    let todayTransaction = {
      canceled: 0,
      succeed: 0, // corrected typo
      pending: 0,
    };

    transactionsData.map((item) => {
      if (new Date(item.createdAt).setHours(0, 0, 0, 0) === dateNow) {
        if (item.status === "pending") {
          todayTransaction.pending++;
        } else if (item.status === "successed") {
          todayTransaction.succeed++;
        } else if (item.status === "canceled") {
          todayTransaction.canceled++;
        }
      }
    });

    setDailyTransactions(todayTransaction);
  }, [transactionsData]);

  // POPOVER
  const [showPopover, setShowPopover] = useState(false);
  const [dataPopover, setDataPopover] = useState({});
  const togglePopover = ({ item }) => {
    setDataPopover(item);
    setShowPopover(!showPopover);
  };

  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    if (page === "foods") {
      setStoreFilters((prevFilters) => ({
        ...prevFilters,
        web: true,
      }));
    }
    function groupDataByDateRange(data) {
      const groupedData = data.reduce((result, item) => {
        if (item?.type === page) {
          const createdAt = new Date(item.createdAt);
          const startDate = new Date(
            createdAt.getFullYear(),
            createdAt.getMonth(),
            createdAt.getDate() - ((createdAt.getDate() - 1) % 7) // Menyesuaikan tanggal awal ke tanggal 1 pada rentang mingguan
          );
          const endDate = new Date(
            startDate.getFullYear(),
            startDate.getMonth(),
            startDate.getDate() + 6 // Menggeser tanggal akhir menjadi 7 hari setelah tanggal awal
          );

          // Mendapatkan string tanggal mulai dan selesai
          const startDateString = startDate.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          });
          const endDateString = endDate.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          });

          // Membuat rentang waktu dalam format yang diinginkan
          const dateRange = `${startDateString} - ${endDateString}`;

          // Mengecek apakah rentang waktu tersebut sudah ada dalam hasil pengelompokan
          if (!result[dateRange]) {
            result[dateRange] = {
              transaction: [],
              Pending: 0,
              Successed: 0,
              Canceled: 0,
              Total: 0,
            };
          }

          // Menghitung jumlah transaksi berdasarkan status
          if (item.status === "pending") {
            result[dateRange].Pending += 1;
          } else if (item.status === "successed") {
            result[dateRange].Successed += 1;
          } else if (item.status === "canceled") {
            result[dateRange].Canceled += 1;
          }
          result[dateRange].Total += 1;
          result[dateRange].transaction.push(item);
        }
        return result;
      }, {});
      return groupedData;
    }

    let data = [];
    if (page === "foods") {
      data = firstData.filter((item) => item.type === "foods");
    } else {
      data = firstData.filter((item) => item.type === "fashions");
    }

    const groupedByWeek = groupDataByDateRange(data);
    const chartDataValues = Object.entries(groupedByWeek)?.map(
      ([dateRange, data]) => ({
        date: dateRange,
        ...data,
      })
    );
    setChartData(chartDataValues);
  }, [transactionsData, transactionsWeb, page]);

  // DOWNLOAD DATA
  const handleDownload = async () => {
    try {
      // Constructing the download URL based on the page
      const BEURL =
        page === "foods"
          ? `${DBURL}/transactions/foods/download`
          : `${DBURL}/transactions/fashions/download`;

      // Making a GET request to download the file
      const response = await axios.get(BEURL);

      // Creating a blob URL from the response data
      const downloadUrl = response.data.fileUrl;

      // Creating an <a> element to trigger the download
      const a = document.createElement("a");
      a.href = downloadUrl;

      // Setting the file name for download
      const fileName =
        page === "foods"
          ? "FoodsTransactions.xlsx"
          : "FashionsTransactions.xlsx";
      a.download = fileName;
      // Appending the <a> element to the document body, triggering the download, and removing the element
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      toast.custom((t) => (
        <CustomToast t={t} message="Download succeed" type="success" />
      ));
    } catch (error) {
      toast.custom((t) => (
        <CustomToast t={t} message="Download failed" type="failed" />
      ));
      console.error("Error downloading data:", error);
    }
  };

  // ISADMIN

  const dariDate = useRef(null);
  const sampaiDate = useRef(null);

  return (
    <>
      {/* POPOVER */}
      <TransactionPopover
        promos={promos}
        data={dataPopover}
        togglePopover={togglePopover}
        showPopover={showPopover}
        refetch={() => fetchTransactions()}
        products={filteredFashionTransaction}
      />

      {/* CONTENT */}
      <div className="w-full min-h-screen  pb-20 pt-10 ">
        <div className="flex max-2xl:flex-col 2xl:gap-5 ">
          {/* CHART */}
          <div className="w-full h-[19rem] sm:h-[30rem] bg-section border-b-2 border-x-2 rounded-2xl shadow-lg p-7 mb-10 relative overflow-hidden">
            {/* TOP */}
            <Title2 title="Chart" className={"mb-3"} />

            {/* CHART */}
            <ResponsiveContainer
              width="100%"
              height={"90%"}
              className="drop-shadow-sm  w-full flex items-center justify-center text-sm"
            >
              <BarChart
                width={500}
                height={300}
                data={chartData}
                isAnimationActive
                margin={{
                  top: 0,
                  right: 0,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip
                  content={({ payload, label }) => {
                    const total = payload.reduce(
                      (accumulator, { value }) => accumulator + value,
                      0
                    );

                    // Menghitung jumlah pending, successed, dan canceled
                    const pending =
                      payload.find((item) => item.dataKey === "Pending")
                        ?.value || 0;
                    const successed =
                      payload.find((item) => item.dataKey === "Successed")
                        ?.value || 0;
                    const canceled =
                      payload.find((item) => item.dataKey === "Canceled")
                        ?.value || 0;

                    return (
                      <div className="bg-section-dark font-semibold py-9 px-6 rounded-2xl drop-shadow-md text-white flex flex-col gap-2 text-sm">
                        <p className="flex items-center gap-2">
                          <i className="fa-regular fa-calendar-days mb-1 fa-lg"></i>
                          {label}
                        </p>
                        <p className="text-yellow-400 flex items-center gap-2">
                          <i className="fa-solid fa-clock mb-1 fa-lg "></i>
                          Pending: {pending}
                        </p>
                        <p className="text-green-400 flex items-center gap-2">
                          <i className="fa-solid fa-circle-check mb-1 fa-lg"></i>
                          Successed: {successed}
                        </p>
                        <p className="text-red-400 flex items-center gap-2">
                          <i className="fa-solid fa-circle-exclamation mb-1 fa-lg"></i>
                          Canceled: {canceled}
                        </p>
                        <p className="mt-2">Total: {total}</p>
                      </div>
                    );
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  iconSize={10}
                  iconType="square"
                  height={36}
                />
                <Bar dataKey="Pending" fill="rgb(250 204 21)" />
                <Bar dataKey="Successed" fill="rgb(74 222 128)" />
                <Bar dataKey="Canceled" fill="rgb(248 113 113)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* DAILLY TRANSACTIONS */}
          <div className="flex flex-col w-full 2xl:w-[20%] text-sm h-[9.5rem] sm:h-[14rem]  mb-10 2xl:h-auto text-primaryDark rounded-2xl shadow-lg p-4 items-center justify-center">
            <Title2 title="Daily" className={"mb-0"} />
            <div className="flex 2xl:flex-col w-full h-full gap-3 sm:gap-6 2xl:gap-3">
              <div className="flex items-center justify-center text-center drop-shadow-lg text-white font-semibold bg-green-400 w-full 2xl:h-[33.3%] relative rounded-2xl shadow-lg p-3 overflow-hidden">
                Succeed: {dailyTransactions?.succeed}
              </div>
              <div className="flex items-center justify-center text-center drop-shadow-lg text-white font-semibold bg-red-400 w-full 2xl:h-[33.3%] relative rounded-2xl shadow-lg p-3 overflow-hidden">
                Canceled: {dailyTransactions?.canceled}
              </div>
              <div className="flex items-center justify-center text-center drop-shadow-lg text-white font-semibold bg-yellow-400 w-full 2xl:h-[33.3%] relative rounded-2xl shadow-lg p-3 overflow-hidden">
                Pending: {dailyTransactions?.pending}
              </div>
            </div>
          </div>
        </div>

        {/* FILTER */}
        <div className="h-auto bg-section-rainbow w-full  rounded-2xl text-sm shadow-lg p-7 ">
          <div className="flex flex-col gap-4">
            {/* TOP */}
            <div className="w-full">
              {/* TOP */}
              <Title2 title="Filter" className={"mb-0"} />
              {/* SEARCH */}
              <div className="w-full flex gap-2">
                <div className="flex flex-col sm:flex-row w-full gap-2">
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
                {User?.role === "owner" && (
                  <Button
                    variant="green"
                    className={"max-sm:min-w-[3rem]"}
                    onClick={handleDownload}
                  >
                    <i className="fa-solid fa-file-arrow-down mr-2"></i>
                    <span className="max-sm:hidden">Download</span>
                  </Button>
                )}
              </div>

              {/* CHECKBOX */}
              <div className="flex  max-2xl:flex-wrap max-md:items-center flex-row w-full text-sm mt-4">
                <div className="w-full ">
                  <div className="mb-2 text-base font-semibold">
                    Transaction Status
                  </div>
                  <div className="flex flex-wrap gap-2 w-fit">
                    {Object.keys(statusFilters).map((status) => {
                      let color = "";
                      if (status === "canceled") {
                        color = "red";
                      } else if (status === "successed") {
                        color = "green";
                      } else {
                        color = "yellow";
                      }
                      return (
                        <Button
                          key={status}
                          onClick={() => handleStatusFilterChange(status)}
                          variant={
                            statusFilters[status]
                              ? color
                              : "transparent-" + color
                          }
                          className={
                            "capitalize max-sm:rounded-xl sm:rounded-xl"
                          }
                        >
                          {status === "successed" ? (
                            <i className="fa-solid fa-circle-check fa-lg sm:mr-2"></i>
                          ) : status === "pending" ? (
                            <i className="fa-solid fa-clock fa-lg sm:mr-2"></i>
                          ) : (
                            <i className="fa-solid fa-circle-exclamation fa-lg sm:mr-2"></i>
                          )}
                          {status}
                          <span className="ml-2">
                            (
                            {status === "canceled"
                              ? totalCanceledTransactions
                              : status === "successed"
                              ? totalSuccededTransactions
                              : totalPendingTransactions}
                            )
                          </span>
                        </Button>
                      );
                    })}
                  </div>
                </div>
                {page === "fashions" && User?.role === "owner" && (
                  <div className="flex flex-col  items-start text-sm sm:w-auto w-full justify-between mb-3 ">
                    <div className="mb-2 text-base font-semibold">
                      Store Filter
                    </div>
                    <div className="flex flex-wrap gap-2 w-fit">
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
                  </div>
                )}
              </div>

              {/* DATE */}
              <div className="mt-4 flex flex-col">
                <div className="flex w-full flex-wrap justify-between gap-3">
                  {User?.role === "owner" && (
                    <div>
                      <div className="mb-2 text-base font-semibold">Kasir </div>
                      <div className="relative w-fit flex items-center justify-center">
                        <BlackScreenPopover
                          isShow={openSelectKasirPopover}
                          isBlack={false}
                          isBlur={false}
                          onClick={() => setOpenSelectKasirPopover(false)}
                        />
                        <div className="absolute bottom-[3.5rem]">
                          <div
                            className={`${
                              openSelectKasirPopover
                                ? "h-[17rem] md:h-[15rem] opacity-100"
                                : "h-0 opacity-0 invisible"
                            } w-[12rem] transition-all flex flex-col items-center justify-center gap-5 sm:gap-2 truncate duration-200 ease-in bg-section-dark z-[1]  p-3 rounded-2xl shadow-2xl right-0`}
                          >
                            <span
                              className={`w-full flex items-center ${
                                selectedKasir === ""
                                  ? "bg-primaryThin text-white"
                                  : "text-[rgba(255,255,255,0.5)] hover:bg-primaryThin hover:text-white"
                              }  justify-center group p-3 transition-all duration-200 ease-in cursor-pointer rounded-2xl `}
                              onClick={() => {
                                setSelectedKasir("");
                                setOpenSelectKasirPopover(false);
                              }}
                            >
                              <i
                                className={`fa-solid ${
                                  selectedKasir === ""
                                    ? "fa-user-check"
                                    : "fa-user"
                                }  fa-lg mr-2 `}
                              ></i>
                              <span className="">All Kasir</span>
                            </span>
                            {kasir.map((kasirName) => (
                              <span
                                className={`w-full flex items-center ${
                                  selectedKasir === kasirName
                                    ? "bg-primaryThin text-white"
                                    : "text-[rgba(255,255,255,0.5)] hover:bg-primaryThin hover:text-white"
                                }  justify-center group p-3 transition-all duration-200 ease-in cursor-pointer rounded-2xl `}
                                key={kasirName}
                                onClick={() => {
                                  setSelectedKasir(kasirName);
                                  setOpenSelectKasirPopover(false);
                                }}
                              >
                                <i
                                  className={`fa-solid ${
                                    selectedKasir === kasirName
                                      ? "fa-user-check"
                                      : "fa-user"
                                  }  fa-lg mr-2 `}
                                ></i>
                                <span className="">{kasirName}</span>
                              </span>
                            ))}
                          </div>
                        </div>
                        <Button
                          className={
                            " max-sm:min-w-[11rem] sm:min-w-[11rem] capitalize max-sm:rounded-xl sm:rounded-xl"
                          }
                          onClick={() => setOpenSelectKasirPopover(true)}
                        >
                          <i
                            className={`fa-solid fa-user-check fa-lg sm:mr-2 `}
                          ></i>
                          {selectedKasir || "All Kasir"}
                        </Button>
                      </div>
                    </div>
                  )}
                  <div className="w-fit">
                    <div className="mb-2 text-base font-semibold">Date</div>

                    <div className="flex flex-wrap items-center justify-end gap-3">
                      <Button
                        onClick={() => dariDate.current.focus()}
                        className="flex w-fit whitespace-nowrap justify-center items-center gap-2 max-sm:rounded-xl h-12 sm:rounded-xl"
                      >
                        <label htmlFor="startDate">Dari:</label>
                        <input
                          ref={dariDate}
                          className="bg-transparent text-white w-fit outline-none"
                          type="date"
                          id="startDate"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                        />
                      </Button>
                      <Button
                        onClick={() => sampaiDate.current.focus()}
                        className="flex w-fit whitespace-nowrap justify-center items-center gap-2 max-sm:rounded-xl h-12 sm:rounded-xl"
                      >
                        <label htmlFor="endDate">Sampai:</label>
                        <input
                          type="date"
                          className="bg-transparent text-white w-fit outline-none"
                          id="endDate"
                          ref={sampaiDate}
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                        />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* BOTTOM */}
            <div className="w-full flex flex-row items-center gap-2">
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
        </div>

        {/* TITTLE */}
        <Title title={page === "fashion" ? "Fashions" : "Foods"} />

        {/* TRANSACTIONS */}
        <div className="rounded-2xl w-full text-base sm:text-lg h-auto mb-10 ">
          {page === "fashions" ? (
            <>
              {/* HEAD */}
              <TransactionFashionHeadSection />

              <div>
                <AnimatePresence>
                  {filteredFashionTransaction.length > 0 && !isLoading ? (
                    <div className="min-h-screen">
                      {filteredFashionTransaction.map((item) => (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          key={item.id}
                          className="my-3"
                        >
                          <FashionTransactionSection
                            data={item}
                            handlePopover={togglePopover}
                          />
                        </motion.div>
                      ))}
                    </div>
                  ) : filteredFashionTransaction.length === 0 && isLoading ? (
                    <>
                      {[...Array(10)].map((i) => (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          key={i}
                          className="my-3"
                        >
                          <TransactionSectionSkeleton />
                        </motion.div>
                      ))}
                    </>
                  ) : (
                    <Empty />
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <>
              {/* HEAD */}
              <TransactionFoodHeadSection />

              <div>
                {filteredFashionTransaction.length > 0 && !isLoading ? (
                  filteredFashionTransaction.map((item) => (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      key={item.id}
                      className="my-3"
                    >
                      <FoodTransactionSection
                        data={item}
                        handlePopover={togglePopover}
                      />
                    </motion.div>
                  ))
                ) : isLoading ? (
                  <>
                    {[...Array(10)].map((i) => (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        key={i}
                        className="my-3"
                      >
                        <TransactionSectionSkeleton />
                      </motion.div>
                    ))}
                  </>
                ) : (
                  ""
                )}
              </div>
            </>
          )}
          <Pagination
            totalPage={totalPage}
            pagination={pagination}
            setPagination={setPagination}
          />
        </div>
      </div>
    </>
  );
}
