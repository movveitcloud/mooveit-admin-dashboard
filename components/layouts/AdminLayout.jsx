import { DotsVerticalIcon, EyeIcon, TrashIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { useState } from "react";
import { getAdmins } from "../../redux/features/admin.slice";
import { PulseLoader } from "react-spinners";
// import UpdateAdminModal from "../../modals/UpdateAdminModal";
import { DeleteAdminModal, UpdateAdminModal } from "../../components";
import { ChevronDownIcon, SearchIcon } from "@heroicons/react/outline";
import { DashboardLayout, DownloadCSV, Tabs } from "../../components";

const AdminLayout = ({ name, userStatus, handleSearch, userData, headers, activeTab, filename }) => {
  const { filteredAdmin } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const [ids, setIds] = useState("");

  return (
    <div className="">
      <div className="hidden md:flex justify-between mb-10 text-sm ">
        <div className="flex justify-start w-2/3 mr-4   ">
          {/* <div className="flex items-center  justify-start w-fit border lg:mr-8 md:mr-2    rounded-md">
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
                  </div> */}
          <div className="flex w-full   space-x-2  items-center border  bg-white rounded-md p-3 py-3">
            <SearchIcon className="text-accent-content w-5 md:w-6 mr-1" />
            <input
              type="search"
              onChange={handleSearch}
              placeholder="Search by lastname..."
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

          <DownloadCSV data={userData[activeTab]} headers={headers} filename={filename[activeTab]} />
        </div>
      </div>
      {/* mobile */}
      <div className="md:hidden mb-4 text-sm">
        <div className="flex mt-4 space-x-2 justify-between items-center  ">
          <div className="flex w-2/3  space-x-2  items-center border  bg-white rounded-md p-2 py-3">
            <SearchIcon className="text-accent-content w-5 md:w-6 mr-1" />
            <input
              type="search"
              onChange={handleSearch}
              placeholder="Search by lastname..."
              className="w-full h-full  outline-none text-base placeholder:text-[#959595] placeholder:text-base"
            />
          </div>
          <label
            htmlFor={activeTab === 0 ? "addadmin" : "addsuperadmin"}
            className="border cursor-pointer  p-2 py-3 mr-4 bg-white whitespace-nowrap rounded-md text-sm ">
            {activeTab === 0 ? " + Add Admin" : " + Add Super Admin"}
          </label>
          <DownloadCSV data={userData[activeTab]} headers={headers} filename={filename[activeTab]} />
        </div>
      </div>
      {/* end of mobile */}

      <div className="overflow-auto rounded-lg">
        <table className=" w-full p-4 mb-8 ">
          <thead className="bg-white text-black-50 border  rounded-md p-6 ">
            <tr className="p-4 ">
              <th className="items-center ml-6 my-4 text-start w-[20%] px-4">Name</th>

              <th className="w-[20%] whitespace-nowrap text-start p-4">Email Address</th>

              <th className="w-[15%] whitespace-nowrap text-start p-4">Role</th>
              {/* {name === "superadmin" ? <th className="w-[10%]"></th> : null} */}
              {userStatus === "superadmin" ? <th className="w-[10%]"></th> : null}
            </tr>
          </thead>
          <tbody className="w-full   ">
            {/* {admins?.map(({ User, firstName, lastName, email, role, _id }, index) => { */}
            {filteredAdmin?.map(({ User, firstName, lastName, email, role, _id }, index) => {
              return (
                // role === name && (
                role === userStatus && (
                  <tr className="capitalize cursor-pointer border" key={index}>
                    <td className=" w-[20%]  p-4 ">
                      <div className="flex justify-start items-center">
                        <p className="text-sm">
                          {firstName} {lastName}
                        </p>
                      </div>
                    </td>

                    <td className="w-[20%] p-4 text-sm lowercase ">{email}</td>
                    <td className="w-[15%] p-4 text-sm">{role}</td>
                    {/* {name === "superadmin" ? ( */}
                    {userStatus === "superadmin" ? (
                      <td className="pr-4  w-[10%]      ">
                        <div tabIndex="0" className="dropdown dropdown-left dropdown-down z-10 top-1">
                          <DotsVerticalIcon className="w-4  " />

                          <div
                            tabIndex="0"
                            className="  bg-white rounded-sm shadow w-auto p-4 px-4 dropdown-content -top-10 menu   ">
                            <label
                              htmlFor="updateadmin"
                              className="text-[12px] flex whitespace-nowrap cursor-pointer hover:text-red-600 ">
                              <EyeIcon className="w-4 mr-4 mb-4 " />
                              <p>Update Password</p>
                            </label>

                            {filteredAdmin.length > 1 && (
                              <label
                                htmlFor="deleteadmin"
                                className="text-[12px] flex cursor-pointer hover:text-red-600"
                                onClick={() => setIds(_id)}>
                                <TrashIcon className="w-4 mr-4 " />
                                <p>Delete Admin</p>
                              </label>
                            )}
                          </div>
                        </div>
                      </td>
                    ) : null}
                  </tr>
                )
              );
            })}
          </tbody>
        </table>
      </div>

      <UpdateAdminModal id={ids} />
      <DeleteAdminModal id={ids} />
    </div>
  );
};

export default AdminLayout;
