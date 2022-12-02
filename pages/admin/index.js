import React, { useEffect } from "react";
import { AddAdminModal, DashboardLayout } from "../../components";
import { useState } from "react";
import { Users, Partners } from "../../components";
import { Admins, SuperAdmins } from "../../components";
import { useSelector } from "react-redux";
import { ChevronDownIcon, SearchIcon, DownloadIcon } from "@heroicons/react/outline";
const Admin = () => {
  const [activeButton, setActiveButton] = useState("admin");
  const [value, setValue] = useState("");
  const { admins } = useSelector((state) => state.admin);
  const [admincount, setadminCount] = useState(0);
  const [superadmincount, setSuperadmin] = useState(0);
  //   console.log(users);

  useEffect(() => {
    let admincount = 0;
    admins?.map(() => ((admincount += 1), setadminCount(admincount)));

    let superadmincount = 0;
    //  admins?.map(() => ((admincount += 1), setadminCount(admincount)));
  }, [admins]);

  const Search = (e) => {};

  return (
    <DashboardLayout>
      <div className="flex space-x-5 mb-4">
        <button
          onClick={() => setActiveButton("admin")}
          className={`${
            activeButton === "admin" ? "bg-accent-focus  text-accent-content" : "bg-[#EEEEEE] text-[#BBBBBB] "
          }  py-2 px-4 rounded-md  flex items-center align-middle justify-center text-sm md:text-base `}>
          Admins
          <div
            className={` ${
              activeButton === "admin" ? "bg-accent-content" : "bg-[#BBBBBB]"
            } ml-2 text-white md:text-[10px] text-[10px] rounded-sm p-2 h-4 flex align-middle items-center`}>
            {admincount}
          </div>
        </button>

        <button
          onClick={() => setActiveButton("super admin")}
          className={`${
            activeButton === "super admin" ? "bg-accent-focus text-accent-content" : "bg-[#EEEEEE] text-[#BBBBBB]"
          }  py-2 px-4 rounded-md  flex items-center align-middle justify-center text-sm md:text-base`}>
          Super Admins
          <div
            className={` ${
              activeButton === "super admin" ? "bg-accent-content" : "bg-[#BBBBBB]"
            } ml-2 text-white  text-[10px] rounded-sm  p-2  h-4 flex align-middle items-center`}>
            {superadmincount}
          </div>
        </button>
      </div>

      <div className="bg-white p-8 shadow ">
        <div className="hidden md:flex justify-between mb-10 text-sm ">
          <div className="flex justify-start xl:w-2/3 mr-4   ">
            <div className="flex items-center  justify-start w-fit border lg:mr-8 md:mr-2    rounded-md">
              <div className="bg-accent-content border  rounded-l-md border-r-none p-3 py-3 text-white whitespace-nowrap cursor-pointer  ">
                View All
              </div>
              <div className="flex items-center border  justify-start p-3 py-3 cursor-pointer">
                <p>Role</p>
                <ChevronDownIcon className="w-4 text-[#222222] ml-2" />
              </div>
              <div className="flex items-center justify-start  p-3 border  py-3 whitespace-nowrap cursor-pointer">
                <p>Last Active</p>
                <ChevronDownIcon className="w-4 text-[#222222] font-normal ml-2" />
              </div>
            </div>
            <div className="flex w-1/2   space-x-2  items-center border  bg-white rounded-md p-3 py-3">
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

          <div className="flex">
            {activeButton === "admin" ? (
              <label
                htmlFor="addadmin"
                className="border cursor-pointer  p-2 py-3 mr-4 bg-white whitespace-nowrap rounded-md text-sm ">
                + Add Admin
              </label>
            ) : (
              <label
                htmlFor="addsuperadmin"
                className="border cursor-pointer  p-2 py-3 mr-4 bg-white whitespace-nowrap rounded-md text-sm ">
                + Add Super Admin
              </label>
            )}

            <div className="border  p-2 py-3 bg-white whitespace-nowrap rounded-md text-sm  flex items-center">
              <DownloadIcon className="w-4 mr-2 text-[#222222] m-0 " />
              Download CSV
            </div>
          </div>
        </div>

        {/* mobile */}
        <div className="md:hidden mb-4 text-sm">
          <div className="flex items-center  justify-start w-full border  lg:mr-8 md:mr-2 text-center    rounded-md">
            <div className="bg-accent-content border border-l-accent rounded-l-md border-r-none p-2 text-white whitespace-nowrap cursor-pointer w-1/3 text-center font-normal">
              View All
            </div>
            <div className="flex items-center justify-center border   p-2 cursor-pointer w-1/3 text-center">
              <p>Status</p>
              <ChevronDownIcon className="w-4 text-[#222222] ml-2" />
            </div>
            <div className="flex items-center justify-center  p-2 border  whitespace-nowrap cursor-pointer w-1/3 text-center ">
              <p>Last Active</p>
              <ChevronDownIcon className="w-4 text-[#222222] ml-2" />
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
            {activeButton === "admin" ? (
              <label
                htmlFor="addadmin"
                className="border cursor-pointer  p-2 py-3 mr-4 bg-white whitespace-nowrap rounded-md text-sm ">
                + Add Admin
              </label>
            ) : (
              <label
                htmlFor="addsuperadmin"
                className="border cursor-pointer  p-2 py-3 mr-4 bg-white whitespace-nowrap rounded-md text-sm ">
                + Add Super Admin
              </label>
            )}
            <div className="border   p-2 bg-white whitespace-nowrap rounded-md   flex items-center">
              <DownloadIcon className="w-6 text-[#222222] m-0 " />
              Download CSV
            </div>
          </div>
        </div>
        {/* end of mobile */}

        <AddAdminModal />

        {activeButton === "admin" ? (
          <Admins admincount={admincount} />
        ) : superadmincount !== 0 ? (
          <SuperAdmins superadmincount={superadmincount} />
        ) : (
          <div className="bg-white rounded-lg w-full  flex justify-center mt-8">
            <div className=" py-24 items-center">
              <p className="text-center text-[#AAAAAA] text-xl font-bold">No super admin at this time.</p>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
export default Admin;
