import React, { useEffect } from "react";
import { useState } from "react";
import { AdminLayout, DashboardLayout, DownloadCSV, Tabs, AddAdminModal } from "../../components";
import { Admins, SuperAdmins } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { clearFilteredAdmin, filterAdmin, getAdmins } from "../../redux/features/admin.slice";
import { ChevronDownIcon, SearchIcon, DownloadIcon } from "@heroicons/react/outline";
import { PulseLoader } from "react-spinners";
import { motion } from "framer-motion";

const Admin = () => {
  const [activeButton, setActiveButton] = useState("admin");
  const [value, setValue] = useState("");
  const { admins, filteredAdmin, adminLoading } = useSelector((state) => state.admin);
  const [admincount, setadminCount] = useState(0);
  const [superadmincount, setSuperadmin] = useState(0);
  //   console.log(users);
  useEffect(() => {
    dispatch(getAdmins());
  }, []);
  // useEffect(() => {
  //   let admincount = 0;
  //   admins?.map(() => ((admincount += 1), setadminCount(admincount)));

  //   let superadmincount = 0;

  //    admins?.map(() => ((admincount += 1), setadminCount(admincount)));
  // }, [admins]);

  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useDispatch();
  const AdminCount = filteredAdmin?.filter(({ role }) => role === "admin").length;
  const superAdminCount = filteredAdmin?.filter(({ role }) => role === "superadmin").length;

  const tabItems = [
    { name: "Admins", count: AdminCount },
    { name: "Superadmins", count: superAdminCount },
  ];

  const handleSearch = (e) => {
    const { value } = e.target;
    let result = [];
    result = admins?.filter((a) => a.lastName.toLowerCase().includes(value.toLowerCase()));
    if (value) {
      dispatch(filterAdmin(result));
    } else {
      dispatch(clearFilteredAdmin(admins));
    }
  };

  return (
    <DashboardLayout>
      mmmm
      {adminLoading ? (
        <div className="relative">
          <div className="h-[400px] flex justify-center items-center">
            <PulseLoader loading={adminLoading} color="#EDCC5B" />
          </div>
        </div>
      ) : (
        // <div className="flex space-x-5 mb-4">
        //   <button
        //     onClick={() => setActiveButton("admin")}
        //     className={`${
        //       activeButton === "admin" ? "bg-accent-focus  text-accent-content" : "bg-[#EEEEEE] text-[#BBBBBB] "
        //     }  py-2 px-4 rounded-md  flex items-center align-middle justify-center text-sm md:text-base `}>
        //     Admins
        //     <div
        //       className={` ${
        //         activeButton === "admin" ? "bg-accent-content" : "bg-[#BBBBBB]"
        //       } ml-2 text-white md:text-[10px] text-[10px] rounded-sm p-2 h-4 flex align-middle items-center`}>
        //       {admincount}
        //     </div>
        //   </button>

        //   <button
        //     onClick={() => setActiveButton("super admin")}
        //     className={`${
        //       activeButton === "super admin" ? "bg-accent-focus text-accent-content" : "bg-[#EEEEEE] text-[#BBBBBB]"
        //     }  py-2 px-4 rounded-md  flex items-center align-middle justify-center text-sm md:text-base`}>
        //     Super Admins
        //     <div
        //       className={` ${
        //         activeButton === "super admin" ? "bg-accent-content" : "bg-[#BBBBBB]"
        //       } ml-2 text-white  text-[10px] rounded-sm  p-2  h-4 flex align-middle items-center`}>
        //       {superadmincount}
        //     </div>
        //   </button>
        // </div>
        <>
          {/* <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabItems={tabItems} /> */}
          <div className="bg-white p-8 shadow ">
            <div className="hidden md:flex justify-between mb-10 text-sm ">
              {/* <div className="flex justify-start xl:w-2/3 mr-4   ">
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
                    onChange={handleSearch}
                    placeholder="Search..."
                    className="w-full h-full  outline-none text-base placeholder:text-[#959595] placeholder:text-[8px] md:placeholder:text-base"
                  />
                </div>
              </div> */}

              <div className="flex">
                {/* {activeButton === "admin" ? ( */}

                {/* <label
                  htmlFor={`$ { activeTab === 0 ? "addadmin" :  "addsuperadmin"}`}
                  className="border cursor-pointer  p-2 py-3 mr-4 bg-white whitespace-nowrap rounded-md text-sm ">
                  {activeTab === 0 ? " + Add Admin" : " + Add Super Admin"}
                </label> */}

                {/* ) : (
                  <label
                    htmlFor="addsuperadmin"
                    className="border cursor-pointer  p-2 py-3 mr-4 bg-white whitespace-nowrap rounded-md text-sm ">
                    + Add Super Admin
                  </label>
                )} */}

                {/* <DownloadCSV activeTab={activeTab} /> */}
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
                    onChange={handleSearch}
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
                <DownloadCSV activeTab={activeTab} />
              </div>
            </div>
            {/* end of mobile */}

            <AddAdminModal />

            {/* {activeButton === "admin" ? (
              <Admins admincount={admincount} />
            ) : superadmincount !== 0 ? (
              <SuperAdmins superadmincount={superadmincount} />
            ) : (
              <div className="bg-white rounded-lg w-full  flex justify-center mt-8">
                <div className=" py-24 items-center">
                  <p className="text-center text-[#AAAAAA] text-xl font-bold">No super admin at this time.</p>
                </div>
              </div>
            )} */}
            <AdminLayout name={activeTab === 0 ? "admin" : "superadmin"} />
          </div>
        </>
      )}
    </DashboardLayout>
  );
};
export default Admin;
