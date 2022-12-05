import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronDownIcon, SearchIcon, DownloadIcon } from "@heroicons/react/outline";
import { AccountLayout, DashboardLayout, DownloadCSV, Tabs } from "../../components";
import { clearFilteredUser, filterUsers, getUsers } from "../../redux/features/users.slice";
import { PulseLoader } from "react-spinners";
import { motion } from "framer-motion";

const ManageAccounts = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { users, filteredUsers, userLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const usersCount = filteredUsers?.filter(({ role }) => role === "customer").length;
  const partnersCount = filteredUsers?.filter(({ role }) => role === "partner").length;

  const tabItems = [
    { name: "Customers", count: usersCount },
    { name: "Partners", count: partnersCount },
  ];

  const handleSearch = (e) => {
    const { value } = e.target;
    let result = [];
    result = users?.filter((a) => a.lastName.toLowerCase().includes(value.toLowerCase()));
    if (value) {
      dispatch(filterUsers(result));
    } else {
      dispatch(clearFilteredUser(users));
    }
  };

  const downloadCSV = () => {};

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <DashboardLayout>
      {userLoading ? (
        <div className="relative">
          <div className="h-[500px] flex justify-center items-center">
            <PulseLoader loading={userLoading} color="#EDCC5B" />
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
                    <p>Status</p>
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
                    placeholder="Search by last name..."
                    className="w-full h-full  outline-none text-base placeholder:text-[#959595] placeholder:text-[8px] md:placeholder:text-base"
                  />
                </div>
              </div>

              <DownloadCSV activeTab={activeTab} />
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
                <div className="flex w-2/3 space-x-2 items-center border bg-white rounded-md p-2">
                  <SearchIcon className="text-accent-content w-5 md:w-6 mr-1" />
                  <input
                    type="text"
                    // onChange={handleSearch}
                    placeholder="Search..."
                    className="w-full h-full outline-none text-base placeholder:text-[#959595] placeholder:text-base"
                  />
                </div>
                <div className="border p-2 bg-white whitespace-nowrap rounded-md flex items-center">
                  <DownloadIcon className="w-6 text-[#222222] m-0" />
                  Download CSV
                </div>
              </div>
            </div>
            {/* end of mobile */}

            <AccountLayout name={activeTab === 0 ? "customer" : "partner"} />
          </motion.div>
        </>
      )}
    </DashboardLayout>
  );
};
export default ManageAccounts;
