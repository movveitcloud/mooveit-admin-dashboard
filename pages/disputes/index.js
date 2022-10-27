import React from "react";
import { DashboardLayout, Resolved } from "../../components";
import { useState } from "react";
import { Users, Partners } from "../../components";
import { ChevronDownIcon, SearchIcon, DownloadIcon } from "@heroicons/react/outline";
const Dispute = () => {
  const [activeButton, setActiveButton] = useState("resolved");
  const [value, setValue] = useState("");

  const Search = (e) => {};

  return (
    <DashboardLayout>
      <div className="flex space-x-5 mb-4">
        <button
          onClick={() => setActiveButton("resolved")}
          className={`${
            activeButton === "resolved" ? "bg-accent-focus text-accent-content" : "bg-[#EEEEEE] text-[#BBBBBB] "
          }  py-2 px-4 rounded-md  flex items-center align-middle justify-center text-sm md:text-base `}>
          Resolved
          <div
            className={` ${
              activeButton === "resolved" ? "bg-accent-content" : "bg-[#BBBBBB]"
            } ml-2 text-white md:text-[10px] text-[10px] rounded-sm p-2 h-4 flex align-middle items-center`}>
            32.8k
          </div>
        </button>

        <button
          onClick={() => setActiveButton("pending")}
          className={`${
            activeButton === "pending" ? "bg-accent-focus text-accent-content" : "bg-[#EEEEEE] text-[#BBBBBB]"
          }  py-2 px-4 rounded-md  flex items-center align-middle justify-center text-sm md:text-base`}>
          Pending
          <div
            className={` ${
              activeButton === "pending" ? "bg-accent-content" : "bg-[#BBBBBB]"
            } ml-2 text-white  text-[10px] rounded-sm  p-2  h-4 flex align-middle items-center`}>
            16.8k
          </div>
        </button>
      </div>

      <div className="bg-white p-8 shadow ">
        <div className="hidden md:flex justify-between mb-10 text-sm ">
          <div className="flex justify-start xl:w-2/3 mr-4   ">
            <div className="flex items-center  justify-start w-fit border border-accent lg:mr-8 md:mr-2    rounded-md">
              <div className="bg-accent-content border border-l-accent rounded-l-md border-r-none p-3 py-3 text-white whitespace-nowrap cursor-pointer  ">
                View All
              </div>
              <div className="flex items-center border border-r-accent justify-start p-3 py-3 cursor-pointer">
                <p>Date Created</p>
                <ChevronDownIcon className="w-4 text-[#222222] ml-2" />
              </div>
            </div>
            <div className="flex w-1/2   space-x-2  items-center border border-accent bg-white rounded-md p-3 py-3">
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

          <div className="border border-accent p-2 py-3 bg-white whitespace-nowrap rounded-md text-sm  flex items-center">
            <DownloadIcon className="w-4 mr-2 text-[#222222] m-0 " />
            Download CSV
          </div>
        </div>

        {/* mobile */}
        <div className="md:hidden mb-4 text-sm">
          <div className="flex items-center  justify-start w-full border border-accent lg:mr-8 md:mr-2 text-center    rounded-md">
            <div className="bg-accent-content border border-l-[#DCDCFF] rounded-l-md border-r-none p-2 text-white whitespace-nowrap cursor-pointer w-1/3 text-center font-normal">
              View All
            </div>
            <div className="flex items-center justify-center border border-r-accent  p-2 cursor-pointer w-1/3 text-center">
              <p>Status</p>
              <ChevronDownIcon className="w-4 text-[#222222] ml-2" />
            </div>
            <div className="flex items-center justify-center  p-2 border border-r-accent whitespace-nowrap cursor-pointer w-1/3 text-center ">
              <p>Last Active</p>
              <ChevronDownIcon className="w-4 text-[#222222] ml-2" />
            </div>
          </div>

          <div className="flex mt-4 space-x-2 justify-between items-center  ">
            <div className="flex w-2/3  space-x-2  items-center border border-accent bg-white rounded-md p-2">
              <SearchIcon className="text-accent-content w-5 md:w-6 mr-1" />
              <input
                type="text"
                value={value}
                onChange={Search}
                placeholder="Search..."
                className="w-full h-full  outline-none text-base placeholder:text-[#959595] placeholder:text-base"
              />
            </div>
            <div className="border border-accent  p-2 bg-white whitespace-nowrap rounded-md   flex items-center">
              <DownloadIcon className="w-6 text-[#222222] m-0 " />
              Download CSV
            </div>
          </div>
        </div>
        {/* end of mobile */}

        {activeButton === "resolved" ? <Resolved /> : <Resolved />}
      </div>
    </DashboardLayout>
  );
};
export default Dispute;
