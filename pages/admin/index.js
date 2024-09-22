import React, { useEffect } from "react";
import { useState } from "react";
import { AdminLayout, DashboardLayout, DownloadCSV, Tabs, AddAdminModal } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { clearFilteredAdmin, filterAdmin, getAdmins } from "../../redux/features/admin.slice";
import { ChevronDownIcon, SearchIcon, DownloadIcon } from "@heroicons/react/outline";
import { PulseLoader } from "react-spinners";
import { motion } from "framer-motion";

const Admin = () => {
  const dispatch = useDispatch();
  const { admins, filteredAdmin, adminLoading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAdmins());
  }, []);

  const [activeTab, setActiveTab] = useState(0);

  const count = ({ role }) => filteredAdmin?.filter((admin) => admin.role === role).length;
  const admin = admins?.filter(({ role }) => role === "admin");
  const superadmin = admins?.filter(({ role }) => role === "superadmin");

  const tabItems = [
    { name: "Admins", count: count({ role: "admin" }) },
    { name: "Superadmins", count: count({ role: "superadmin" }) },
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
  //Export to CSV
  const csvHeaders = [
    { label: "First Name", key: "firstName" },
    { label: "Last Name", key: "lastName" },
    { label: "Email", key: "email" },
    { label: "Role", key: "role" },
  ];
  const appUsers = [admin, superadmin];
  const csvFilename = ["MovveIt_Admins", "MovveIt_SuperAdmins"];

  const adminCounts = [admin?.length, superadmin?.length];
  const adminStatus = ["admin", "superadmin"];

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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabItems={tabItems} />
            <div className="bg-white p-8 shadow">
              <AddAdminModal />
              {adminCounts[activeTab] === 0 ? (
                <div className="font-bold text-xl text-center ">
                  <div className="flex justify-center">
                    <div className="bg-white rounded-lg w-full md:w-[60%] flex justify-center mt-8">
                      <div className="px-4 py-24 flex flex-col space-y-4 items-center">
                        <img src="emptyStorage.svg" alt="empty storage icon" className="w-16 md:w-20" />
                        <p className="text-center text-[#AAAAAA] text-xl font-bold">{`No ${adminStatus[activeTab]} at this time.`}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <AdminLayout
                  userStatus={adminStatus[activeTab]}
                  handleSearch={handleSearch}
                  userData={appUsers}
                  headers={csvHeaders}
                  filename={csvFilename}
                  activeTab={activeTab}
                />
                // <AdminLayout name={activeTab === 0 ? "admin" : "superadmin"} />
              )}
            </div>
          </motion.div>
        </>
      )}
    </DashboardLayout>
  );
};
export default Admin;
