import { DotsVerticalIcon, EyeIcon, TrashIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { useState } from "react";
import { getAdmins } from "../../../redux/features/admin.slice";
import { PulseLoader } from "react-spinners";

const Layout = ({ name, admincount, superadmincount }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdmins());
  }, []);
  const { admins } = useSelector((state) => state.admin);
  const { adminLoading } = useSelector((state) => state.admin);

  return (
    <div className="">
      {adminLoading ? (
        <div className="relative">
          <div className="h-[400px] flex justify-center items-center">
            <PulseLoader loading={adminLoading} color="#EDCC5B" />
          </div>
        </div>
      ) : (
        <div className="overflow-auto rounded-lg">
          {admincount != 0 || superadmincount != 0 ? (
            <table className=" w-full p-4 mb-8 ">
              <thead className="bg-white text-black-50 border  rounded-md p-6 ">
                <tr className="p-4 ">
                  <th className="items-center ml-6 my-4 text-start w-[20%] px-4">
                    {`${name === "admin" ? "Admins" : "Super Admins"}`}
                  </th>

                  <th className="w-[20%] whitespace-nowrap text-start p-4">Email Address</th>

                  <th className="w-[15%] whitespace-nowrap text-start p-4">Role</th>

                  <th className="w-[10%]"></th>
                </tr>
              </thead>
              <tbody className="w-full   ">
                {admins?.map(
                  ({ User, firstName, lastName, email, role, id }, index) =>
                    role === name && (
                      <tr className="capitalize cursor-pointer border" key={index}>
                        <td className=" w-[20%]  p-4 ">
                          <div className="flex justify-start items-center">
                            <p className="text-sm">
                              {firstName} {lastName}
                            </p>
                          </div>
                        </td>

                        <td className="w-[20%] p-4 text-sm ">{email}</td>
                        <td className="w-[15%] p-4 text-sm">{role}</td>

                        <td className="pr-4  w-[10%]      ">
                          <div tabIndex="0" className="dropdown dropdown-left top-1">
                            <DotsVerticalIcon className="w-4  " />

                            <div
                              tabIndex="0"
                              className="  bg-white rounded-sm shadow w-auto p-4 px-4 dropdown-content menu   ">
                              <div className="text-[12px] flex whitespace-nowrap ">
                                <EyeIcon className="w-4 mr-4 mb-4 " />
                                <p>Update Password</p>
                              </div>
                              <div className="text-[12px] flex">
                                <TrashIcon className="w-4 mr-4 " />
                                <p>Delete Admin</p>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          ) : (
            "no show"
          )}
        </div>
      )}
    </div>
  );
};

export default Layout;
