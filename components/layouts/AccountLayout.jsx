import { useSelector } from "react-redux";
import { MailIcon, DotsVerticalIcon, EyeIcon, TrashIcon, BadgeCheckIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { getSingleUser } from "../../redux/features/users.slice";
import VerifyParnerModal from "../modals/VerifyPartnerModal";
import { ChevronDownIcon, SearchIcon } from "@heroicons/react/outline";
import { DashboardLayout, DownloadCSV, Tabs } from "../../components";

const AccountLayout = ({ userStatus, handleSearch, userData, headers, activeTab, filename }) => {
  const { filteredUsers } = useSelector((state) => state.user);
  const router = useRouter();
  const [Id, setId] = useState("");
  const [isAdminVerified, setIsAdminVerified] = useState("");
  const verify = useRef();
  const view = (_id, role) => role === "partner" && router.push(`/accounts/${_id}`);
  const dispatch = useDispatch();
  const { singleUser } = useSelector((state) => state.user);

  return (
    <div className="">
      <div className="hidden md:flex justify-between mb-10 text-sm ">
        <div className="flex justify-start w-2/3 mr-4   ">
          <div className="flex w-full   space-x-2  items-center border bg-white rounded-md p-3 py-3">
            <SearchIcon className="text-accent-content w-5 md:w-6 mr-1" />
            <input
              type="search"
              onChange={handleSearch}
              placeholder="Search by location..."
              className="w-full h-full  outline-none text-base placeholder:text-[#959595] placeholder:text-[8px] md:placeholder:text-base"
            />
          </div>
        </div>

        <DownloadCSV data={userData[activeTab]} headers={headers} filename={filename[activeTab]} />
      </div>
      {/* mobile */}
      <div className="md:hidden mb-4 text-sm">
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
          <DownloadCSV data={userData[activeTab]} headers={headers} filename={filename[activeTab]} />
        </div>
      </div>
      {/* end of mobile */}
      <div className="rounded-lg overflow-x-auto">
        {/* <label htmlFor={name === "partner" ? "verifypartner" : null} ref={verify} /> */}
        <label htmlFor={userStatus === "partner" ? "verifypartner" : null} ref={verify} />
        <table className=" w-full p-4 mb-8 ">
          <thead className="bg-white text-black-50 border rounded-md p-6 ">
            <tr className="p-4 ">
              <th className="items-center ml-6 my-4 text-start w-[30%] px-4">Name</th>
              <th className="w-[30%] whitespace-nowrap text-start p-4">Email Address</th>
              {/* <th className="w-[15%] whitespace-nowrap text-start p-4">Phone Number</th> */}
              <th className="w-[25%] whitespace-nowrap  p-4 text-start">Status</th>
              {/* <th className="w-[20%]"></th> */}
              {/* <th className="w-[10%] whitespace-nowrap text-start p-4">Last Active</th> */}
              <th className="w-[20%]"></th>
            </tr>
          </thead>
          <tbody className="w-full">
            {filteredUsers?.map(
              ({ User, firstName, lastName, email, role, isVerified, _id, isAdminVerified }, index) =>
                // role === name && (
                role === userStatus && (
                  <tr key={index} className="capitalize w-full border">
                    <td className=" w-[30]  p-4 ">
                      <div className="flex justify-start items-center">
                        <p className="text-sm">
                          {firstName} {lastName}
                        </p>
                      </div>
                    </td>

                    <td className="w-[30%] p-4 text-sm ">{email}</td>
                    {/* <td className="w-[15%] p-4 text-sm">08066198765</td> */}
                    <td className="w-[25%] p-4 text-sm  ">
                      <span
                        className={`${
                          // isAdminVerified || (name == "customer" && isVerified)
                          isAdminVerified || (userStatus == "customer" && isVerified)
                            ? "bg-[#BBF7D0] text-[#11A13A]"
                            : "bg-[#f9aaaa] text-[#F12C2C]"
                        } rounded-full  text-center items-center p-2 px-4 w-full cursor-pointer`}
                        onClick={
                          () => view(_id, role)
                          // verify.current.click();
                          // setId(_id);
                          // setIsAdminVerified(isAdminVerified);
                        }>
                        {/* {name == "partner" */}
                        {userStatus == "partner"
                          ? isAdminVerified
                            ? "Verified"
                            : "Unverified"
                          : isVerified
                          ? "Verified"
                          : "Unverified"}
                      </span>
                    </td>

                    <td className="pr-4  w-[20%]       ">
                      {/* {name === "customer" ? ( */}
                      {userStatus === "customer" ? (
                        <div tabIndex="0" className="dropdown dropdown-left top-1 cursor-pointer p-4">
                          <DotsVerticalIcon className="w-4   " />

                          <div
                            tabIndex="0"
                            className=" cursor-pointer bg-white rounded-sm shadow w-auto p-4 px-4 dropdown-content menu   ">
                            <div className="text-[12px] flex whitespace-nowrap ">
                              <EyeIcon className="w-4 mr-4 mb-4 " />
                              <p>View History</p>
                            </div>
                            <div className="text-[12px] flex">
                              <TrashIcon className="w-4 mr-4 " />
                              <p>Delete User</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div
                          tabIndex="0"
                          className="dropdown dropdown-left dropdown-down z-10 top-1 cursor-pointer  p-4 ">
                          <DotsVerticalIcon className="w-4   " />

                          <div
                            tabIndex="0"
                            className="  bg-white rounded-sm shadow w-auto p-4 px-4 dropdown-content -top-10 menu   ">
                            <div className="text-[12px] flex whitespace-nowrap ">
                              <MailIcon className="w-4 mr-4 mb-4 " />
                              <p>Message Partner</p>
                            </div>
                            <div className="text-[12px] flex whitespace-nowrap ">
                              <EyeIcon className="w-4 mr-4 mb-4 " />
                              <p>View Listings</p>
                            </div>
                            <div className="text-[12px] flex">
                              <TrashIcon className="w-4 mr-4 " />
                              <p>Delete Partner</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div>
      <VerifyParnerModal Id={Id} isAdminVerified={isAdminVerified} />
    </div>
  );
};

export default AccountLayout;
