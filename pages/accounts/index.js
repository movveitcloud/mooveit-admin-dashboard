import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronDownIcon, SearchIcon } from "@heroicons/react/outline";
import { motion } from "framer-motion";
import { PulseLoader } from "react-spinners";
import { clearFilteredUser, filterUsers, getUsers } from "../../redux/features/users.slice";
import { AccountLayout, DashboardLayout, DownloadCSV, Tabs } from "../../components";

const ManageAccounts = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { users, filteredUsers, userLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const count = ({ role }) => filteredUsers?.filter((user) => user.role === role).length;
  const customers = users?.filter(({ role }) => role === "customer");
  const partners = users?.filter(({ role }) => role === "partner");

  const tabItems = [
    { name: "Customers", count: count({ role: "customer" }) },
    { name: "Partners", count: count({ role: "partner" }) },
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

  //Export to CSV
  const csvHeaders = [
    { label: "First Name", key: "firstName" },
    { label: "Last Name", key: "lastName" },
    { label: "Email", key: "email" },
    { label: "Verified", key: "isVerified" },
  ];
  const appUsers = [customers, partners];
  const csvFilename = ["MovveIt_Customers", "MovveIt_Partners"];

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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabItems={tabItems} />
          <div className="bg-white p-8 shadow">
            <div className="hidden md:flex justify-between mb-10 text-sm ">
              <div className="flex justify-start w-2/3 mr-4   ">
                {/* <div className="flex items-center  justify-start w-fit border lg:mr-8 md:mr-2    rounded-md">
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
                </div> */}
                <div className="flex w-full   space-x-2  items-center border  bg-white rounded-md p-3 py-3">
                  <SearchIcon className="text-accent-content w-5 md:w-6 mr-1" />
                  <input
                    type="search"
                    onChange={handleSearch}
                    placeholder="Search by last name..."
                    className="w-full h-full  outline-none text-base placeholder:text-[#959595] placeholder:text-[8px] md:placeholder:text-base"
                  />
                </div>
              </div>

              <DownloadCSV data={appUsers[activeTab]} headers={csvHeaders} filename={csvFilename[activeTab]} />
            </div>

            {/* mobile */}
            <div className="md:hidden mb-4 text-sm">
              {/* <div className="flex items-center  justify-start w-full border  lg:mr-8 md:mr-2 text-center    rounded-md">
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
              </div> */}
              <div className="flex mt-4 space-x-2 justify-between items-center  ">
                <div className="flex w-2/3 space-x-2 items-center border bg-white rounded-md p-2">
                  <SearchIcon className="text-accent-content w-5 md:w-6 mr-1" />
                  <input
                    type="search"
                    // onChange={handleSearch}
                    placeholder="Search..."
                    className="w-full h-full outline-none text-base placeholder:text-[#959595] placeholder:text-base"
                  />
                </div>
                <DownloadCSV data={appUsers[activeTab]} headers={csvHeaders} filename={csvFilename[activeTab]} />
              </div>
            </div>
            {/* end of mobile */}

            <AccountLayout name={activeTab === 0 ? "customer" : "partner"} />
          </div>
        </motion.div>
      )}
    </DashboardLayout>
  );
};
export default ManageAccounts;
