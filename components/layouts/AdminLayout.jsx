import { DotsVerticalIcon, EyeIcon, TrashIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { useState } from "react";
import { getAdmins } from "../../redux/features/admin.slice";
import { PulseLoader } from "react-spinners";
// import UpdateAdminModal from "../../modals/UpdateAdminModal";
import { DeleteAdminModal, UpdateAdminModal } from "../../components";

const AdminLayout = ({ name }) => {
  const { filteredAdmin } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const [ids, setIds] = useState("");

  return (
    <div className="">
      <div className="overflow-auto rounded-lg">
        <table className=" w-full p-4 mb-8 ">
          <thead className="bg-white text-black-50 border  rounded-md p-6 ">
            <tr className="p-4 ">
              <th className="items-center ml-6 my-4 text-start w-[20%] px-4">Name</th>

              <th className="w-[20%] whitespace-nowrap text-start p-4">Email Address</th>

              <th className="w-[15%] whitespace-nowrap text-start p-4">Role</th>
              {name === "superdmin" ? <th className="w-[10%]"></th> : null}
            </tr>
          </thead>
          <tbody className="w-full   ">
            {/* {admins?.map(({ User, firstName, lastName, email, role, _id }, index) => { */}
            {filteredAdmin?.map(({ User, firstName, lastName, email, role, _id }, index) => {
              return (
                role === name && (
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
                    {name === "superadmin" ? (
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
                            <label
                              htmlFor="deleteadmin"
                              className="text-[12px] flex cursor-pointer hover:text-red-600"
                              onClick={() => setIds(_id)}>
                              <TrashIcon className="w-4 mr-4 " />
                              <p>Delete Admin</p>
                            </label>
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
