import React from "react";
import { Approved, DashboardLayout, Pending } from "../../components";
import { useState } from "react";
import { Users, Partners } from "../../components";
import { ChevronDownIcon, SearchIcon, DownloadIcon } from "@heroicons/react/outline";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import libTypedarrays from "crypto-js/lib-typedarrays";

const Listings = () => {
  const [activeButton, setActiveButton] = useState("approved");
  const [value, setValue] = useState("");
  const [approvedCount, setapprovedCount] = useState(0);
  const [pendingCount, setpendingCount] = useState(0);
  const { listings } = useSelector((state) => state.listing);

  useEffect(() => {
    let apprcount = 0;
    listings?.map(({ status }) => (status === "approved" ? (apprcount += 1) : ""));
    setapprovedCount(apprcount);

    let pendcount = 0;
    listings?.map(({ status }) => (status === "pending" ? (pendcount += 1) : ""));
    setpendingCount(pendcount);
    // status==="approved" ? console.log("app"):console.log(status))
  }, [listings]);

  const Search = (e) => {};
  return (
    <DashboardLayout>
      <div className="flex space-x-5 mb-4">
        <button
          onClick={() => setActiveButton("approved")}
          className={`${
            activeButton === "approved" ? "bg-accent-focus text-accent-content" : "bg-[#EEEEEE] text-[#BBBBBB] "
          }  py-2 px-4 rounded-md flex items-center align-middle justify-center text-sm md:text-base active:scale-95 transition-transform duration-300 `}>
          Approved
          {approvedCount != 0 && (
            <div
              className={` ${
                activeButton === "approved" ? "bg-accent-content" : "bg-[#BBBBBB]"
              } ml-2 text-white md:text-[10px] text-[10px] rounded-sm p-2 h-4 flex align-middle items-center`}>
              {approvedCount}
            </div>
          )}
        </button>

        <button
          onClick={() => setActiveButton("pending")}
          className={`${
            activeButton === "pending" ? "bg-accent-focus text-accent-content" : "bg-[#EEEEEE] text-[#BBBBBB]"
          }  py-2 px-4 rounded-md  flex items-center align-middle justify-center text-sm md:text-base active:scale-95 transition-transform duration-300 `}>
          Pending
          {pendingCount != 0 && (
            <div
              className={` ${
                activeButton === "pending" ? "bg-accent-content" : "bg-[#BBBBBB]"
              } ml-2 text-white  text-[10px] rounded-sm  p-2  h-4 flex align-middle items-center`}>
              {pendingCount}
            </div>
          )}
        </button>
      </div>

      <div className="bg-white p-8  shadow ">
        <div className="hidden md:flex justify-between mb-10 text-sm ">
          <div className="flex justify-start xl:w-2/3 mr-4   ">
            <div className="flex items-center  justify-start w-fit border  lg:mr-8 md:mr-2    rounded-md">
              <div className="bg-accent-content border border-l-accent rounded-l-md border-r-none p-3 py-3 text-white whitespace-nowrap cursor-pointer  ">
                View All
              </div>
              <div className="flex items-center border border-r-accent justify-start p-3 py-3 cursor-pointer">
                <p>Moving</p>
                <ChevronDownIcon className="w-4 text-[#222222] ml-2" />
              </div>
              <div className="flex items-center justify-start  p-3 border  py-3 whitespace-nowrap cursor-pointer">
                <p>Packing</p>
                <ChevronDownIcon className="w-4 text-[#222222] font-normal ml-2" />
              </div>
              <div className="flex items-center justify-start  p-3 border  py-3 whitespace-nowrap cursor-pointer">
                <p>Last Active</p>
                <ChevronDownIcon className="w-4 text-[#222222] font-normal ml-2" />
              </div>
            </div>
            <div className="flex w-1/2   space-x-2  items-center border bg-white rounded-md p-3 py-3">
              <SearchIcon className="text-accent-content w-5 md:w-6 mr-1" />
              <input
                type="text"
                value={value}
                onChange={Search}
                placeholder="Search..."
                className="w-full h-full  outline-none text-base placeholder:text-[#959595] placeholder:text-[8px] md:placeholder:text-base"
              />
            </div>
          </div>

          <div className="border  p-2 py-3 bg-white whitespace-nowrap rounded-md text-sm  flex items-center cursor-pointer">
            <DownloadIcon className="w-4 mr-2 text-[#222222]  " />
            Download CSV
          </div>
        </div>

        {/* mobile */}

        <div className="md:hidden mb-4  text-sm">
          <div className="overflow-auto">
            <div className="flex items-center  justify-start w-fit border  lg:mr-8 md:mr-2 text-center    rounded-md">
              <div className="bg-accent-content border border-l-[#DCDCFF] rounded-l-md border-r-none p-2 text-white whitespace-nowrap cursor-pointer w-fit text-center font-normal">
                View All
              </div>
              <div className="flex items-center justify-center border   p-2 cursor-pointer w-fit text-center">
                <p>Moving</p>
                <ChevronDownIcon className="w-4 text-[#222222] ml-2" />
              </div>
              <div className="flex items-center justify-center border   p-2 cursor-pointer w-fit text-center">
                <p>Packing</p>
                <ChevronDownIcon className="w-4 text-[#222222] ml-2" />
              </div>
              <div className="flex items-center justify-center  p-2 border  whitespace-nowrap cursor-pointer  text-center ">
                <p>Last Active</p>
                <ChevronDownIcon className="w-4 text-[#222222] ml-2" />
              </div>
            </div>
          </div>

          <div className="flex mt-4 space-x-2 justify-between items-center  ">
            <div className="flex w-2/3  space-x-2  items-center border  bg-white rounded-md p-2">
              <SearchIcon className="text-accent-content w-5 md:w-6 mr-1" />
              <input
                type="text"
                value={value}
                onChange={Search}
                placeholder="Search..."
                className="w-full h-full  outline-none text-base placeholder:text-[#959595] placeholder:text-base"
              />
            </div>
            <div className="border   p-2 bg-white whitespace-nowrap rounded-md pointer  flex items-center">
              <DownloadIcon className="w-4 text-[#222222] mr-2 " />
              Download CSV
            </div>
          </div>
        </div>

        {/* end of mobile */}

        {activeButton === "approved" ? (
          <Approved approvedCount={approvedCount} />
        ) : (
          <Pending pendingCount={pendingCount} />
        )}
      </div>
    </DashboardLayout>
  );
};
export default Listings;
