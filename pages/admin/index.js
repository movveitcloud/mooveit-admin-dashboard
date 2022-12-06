import React, { useEffect } from "react";
import { useState } from "react";
import { AdminLayout, DashboardLayout, DownloadCSV, Tabs, AddAdminModal } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { clearFilteredAdmin, filterAdmin, getAdmins } from "../../redux/features/admin.slice";
import { clearFilteredUser, filterUsers, getUsers } from "../../redux/features/users.slice";
import { ChevronDownIcon, SearchIcon, DownloadIcon } from "@heroicons/react/outline";
import { PulseLoader } from "react-spinners";
import { motion } from "framer-motion";

const Admin = () => {
  const dispatch = useDispatch();
  const { admins, filteredAdmin, adminLoading } = useSelector((state) => state.admin);
  //   console.log(adminLoading);
  useEffect(() => {
    dispatch(getAdmins());
  }, []);

  const [activeTab, setActiveTab] = useState(0);

  const AdminCount = filteredAdmin?.filter(({ role }) => role === "admin").length;
  const superAdminCount = filteredAdmin?.filter(({ role }) => role === "superadmin").length;

  const tabItems = [
    { name: "Admins", count: AdminCount },
    { name: "Superadmins", count: superAdminCount },
  ];
  const { userLoading } = useSelector((state) => state.user);

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
      {adminLoading ? (
        <div className="relative">
          <div className="h-[500px] flex justify-center items-center">
            <PulseLoader loading={adminLoading} color="#EDCC5B" />
          </div>
        </div>
      ) : (
        <>
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabItems={tabItems} />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="bg-white p-8 shadow">
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
                    onChange={handleSearch}
                    placeholder="Search..."
                    className="w-full h-full  outline-none text-base placeholder:text-[#959595] placeholder:text-[8px] md:placeholder:text-base"
                  />
                </div>
              </div>

              <div className="flex">
                <label
                  htmlFor={activeTab === 0 ? "addadmin" : "addsuperadmin"}
                  className="border cursor-pointer  p-2 py-3 mr-4 bg-white whitespace-nowrap rounded-md text-sm ">
                  {activeTab === 0 ? " + Add Admin" : " + Add Super Admin"}
                </label>

                <DownloadCSV activeTab={activeTab} />
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
                    onChange={handleSearch}
                    placeholder="Search..."
                    className="w-full h-full  outline-none text-base placeholder:text-[#959595] placeholder:text-base"
                  />
                </div>
                <label
                  htmlFor={activeTab === 0 ? "addadmin" : "addsuperadmin"}
                  className="border cursor-pointer  p-2 py-3 mr-4 bg-white whitespace-nowrap rounded-md text-sm ">
                  {activeTab === 0 ? " + Add Admin" : " + Add Super Admin"}
                </label>
                <DownloadCSV activeTab={activeTab} />
              </div>
            </div>
            {/* end of mobile */}

            <AddAdminModal />

            <AdminLayout name={activeTab === 0 ? "admin" : "superadmin"} />
          </motion.div>
        </>
      )}
    </DashboardLayout>
  );
};
export default Admin;
