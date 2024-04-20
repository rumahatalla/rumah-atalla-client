/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import UserControllerSection from "../../components/UserController/UserControllerSection";
import UserControllerPopover from "../../components/UserController/UserControllerPopover";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Button from "../../components/Button";
import Title from "../../components/Title";
import UserControllerSectionSkeleton from "../../components/UserController/UserControllerSectionSkeleton";
import Title2 from "../../components/Title2";
import SearchBar from "../../components/SearchBar";
import toast from "react-hot-toast";
import CustomToast from "../../components/CustomToast";
import Empty from "../../components/Empty";
import Pagination from "../../components/Pagination";

export default function UserControl() {
  const DBURL = import.meta.env.VITE_APP_DB_URL;

  // OWNER
  const navigate = useNavigate();
  const userRole = JSON.parse(localStorage.getItem("user")).role;
  useEffect(() => {
    if (userRole !== "owner") {
      navigate("/admin/account");
    }
  }, [userRole]);

  // FETCH
  const [isLoading, setIsLoading] = useState(false);
  const [firstData, setFirstData] = useState([]);
  const [pagination, setPagination] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const ITEMS_PER_PAGE = 10; // Jumlah item per halaman

  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const page =
      parseInt(new URLSearchParams(window.location.search).get("page")) || 1;
    setPagination(page);
    fetchUser();
  }, []);

  useEffect(() => {
    if (!pagination) {
      return;
    }
    let data = firstData;
    data = data.filter((item) =>
      item.username.toLowerCase().includes(searchValue.toLowerCase())
    );

    let totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
    if (data.length % ITEMS_PER_PAGE == 0 && data.length - ITEMS_PER_PAGE > 0) {
      totalPages--;
    }
    setTotalPage(totalPages);

    navigate(`?page=${pagination}`);
    const startIndex = (pagination - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const slicedData = data.slice(startIndex, endIndex);
    setFilteredUsers(slicedData);
  }, [pagination, firstData, searchValue]);

  const fetchUser = async () => {
    setIsLoading(true);
    await axios
      .get(DBURL + "/users/", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setFirstData(res.data);
      })
      .catch((err) => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  //   FILTER

  // POPOVER
  const [showPopover, setShowPopover] = useState("");
  const [dataPopover, setDataPopover] = useState({});
  const togglePopover = ({ param, item }) => {
    setDataPopover(item);
    setShowPopover(param);
  };

  // CHART
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    function groupDataByDateRange(data) {
      const groupedData = data.reduce((result, item) => {
        if (!result[item.username]) {
          result[item.username] = {
            Pending: item?.transactions?.pending,
            Successed: item?.transactions?.successed,
            Canceled: item?.transactions?.canceled,
            Total:
              item?.transactions?.pending +
              item?.transactions?.successed +
              item?.transactions?.canceled,
          };
        }
        return result;
      }, {});
      return groupedData;
    }

    const groupedByWeek = groupDataByDateRange(firstData);
    const chartDataValues = Object.entries(groupedByWeek)?.map(
      ([dateRange, data]) => ({
        date: dateRange,
        ...data,
      })
    );

    setChartData(chartDataValues);
  }, [firstData]);

  // DOWNLOAD DATA
  const handleDownload = async () => {
    try {
      const response = await axios.get(DBURL + "/users/data/download/", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });

      // Creating a blob URL from the response data
      const downloadUrl = response.data.fileUrl;

      // Creating an <a> element to trigger the download
      const a = document.createElement("a");
      a.href = downloadUrl;

      a.download = "UsersData.xlsx";
      // Appending the <a> element to the document body, triggering the download, and removing the element
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      toast.custom((t) => (
        <CustomToast t={t} message="Download succeed" type="success" />
      ));
    } catch (error) {
      console.error("Error downloading data:", error);
    }
  };

  return (
    <>
      {/* POPOVER */}
      <UserControllerPopover
        data={dataPopover}
        togglePopover={togglePopover}
        showPopover={showPopover}
        refetch={() => fetchUser()}
      />

      <div className="w-full  pb-20 pt-10 ">
        {/* CHART */}
        <div className="w-full h-[19rem] sm:h-[30rem] bg-section border-b-2 border-x-2 rounded-2xl shadow-lg p-7 mb-10 relative overflow-hidden">
          {/* TOP */}
          <Title2 title="Chart" />

          {/* CHART */}
          <ResponsiveContainer
            width="100%"
            height={"90%"}
            className="drop-shadow-sm w-full flex items-center justify-center text-sm"
          >
            <BarChart
              width={500}
              height={300}
              data={chartData}
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
                    payload.find((item) => item.dataKey === "Pending")?.value ||
                    0;
                  const successed =
                    payload.find((item) => item.dataKey === "Successed")
                      ?.value || 0;
                  const canceled =
                    payload.find((item) => item.dataKey === "Canceled")
                      ?.value || 0;

                  return (
                    <div className="bg-section-dark font-semibold py-9 px-9 rounded-2xl drop-shadow-md text-white flex flex-col gap-2 text-sm">
                      <p className="flex items-center gap-2">
                        <i className="fa-solid fa-user mb-1 fa-lg scale-[0.9]"></i>
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

        {/* FILTER */}
        <div className="h-auto  w-full bg-section-rainbow rounded-2xl shadow-lg p-7">
          {/* TOP */}
          <Title2 title="Filter" />
          <div className="flex gap-3">
            {/* SEARCH */}
            <SearchBar
              value={searchValue}
              placeholder="Search..."
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Button
              variant="green"
              className={"max-sm:min-w-[3rem]"}
              onClick={handleDownload}
            >
              <i className="fa-solid fa-file-arrow-down mr-2"></i>
              <span className="max-sm:hidden">Download</span>
            </Button>
            <Button
              variant="secondary"
              className={"max-sm:min-w-[3rem]"}
              onClick={() => setShowPopover("add")}
            >
              <i className="fa-solid fa-plus mr-2"></i>
              <span className="max-sm:hidden">Add</span>
            </Button>
          </div>
        </div>

        {/* TITTLE */}
        <Title title={"User"} />

        {/* TRANSACTIONS */}
        <div className="rounded-2xl  w-full text-base sm:text-lg h-auto ">
          {/* HEAD */}
          <div className="w-full rounded-2xl max-sm:px-3 shadow-lg bg-secondary font-semibold flex items-center text-sm sm:text-lg">
            <h1 className="text-center text-white w-[10%] py-6 ">No</h1>
            <h1 className="text-left text-white w-[50%] py-6 ">Nama</h1>
            <h1 className=" text-white py-6 w-[40%] text-center">Transaksi</h1>
            {/* <h1 className="text-center text-white w-[15%] py-6">Status</h1> */}
          </div>

          {filteredUsers?.length > 0 ? (
            <div className="min-h-screen">
              {filteredUsers.map((item, i) => (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  key={item._id}
                  className="my-2"
                >
                  <UserControllerSection
                    number={i + 1}
                    handlePopover={togglePopover}
                    item={item}
                  />
                </motion.div>
              ))}
            </div>
          ) : filteredUsers?.length === 0 && isLoading ? (
            <>
              {[...Array(10)].map((i) => (
                <>
                  <UserControllerSectionSkeleton />
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
      </div>
    </>
  );
}
