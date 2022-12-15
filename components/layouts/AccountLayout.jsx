import { useSelector } from "react-redux";
import { MailIcon, DotsVerticalIcon, EyeIcon, TrashIcon, BadgeCheckIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { getSingleUser } from "../../redux/features/users.slice";
import VerifyParnerModal from "../modals/VerifyPartnerModal";

const AccountLayout = ({ name }) => {
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
      <div className="rounded-lg overflow-x-auto">
        <label htmlFor={name === "partner" ? "verifypartner" : null} ref={verify} />
        <table className=" w-full p-4 mb-8 ">
          <thead className="bg-white text-black-50 border rounded-md p-6 ">
            <tr className="p-4 ">
              <th className="items-center ml-6 my-4 text-start w-[25%] px-4">Name</th>
              <th className="w-[20%] whitespace-nowrap text-start p-4">Email Address</th>
              <th className="w-[15%] whitespace-nowrap text-start p-4">Phone Number</th>
              <th className="w-[10%] whitespace-nowrap text-start p-4">Status</th>
              {/* <th className="w-[10%] whitespace-nowrap text-start p-4">Last Active</th> */}
              <th className="w-[10%]"></th>
            </tr>
          </thead>
          <tbody className="w-full">
            {filteredUsers?.map(
              ({ User, firstName, lastName, email, role, isVerified, _id, isAdminVerified }, index) =>
                role === name && (
                  <tr
                    key={index}
                    className={`capitalize w-full  ${name === "partner" ? "cursor-pointer" : null} border`}>
                    <td className=" w-[25%]  p-4 ">
                      <div className="flex justify-start items-center">
                        <p className="text-sm">
                          {firstName} {lastName}
                        </p>
                      </div>
                    </td>

                    <td className="w-[20%] p-4 text-sm ">{email}</td>
                    <td className="w-[15%] p-4 text-sm">08066198765</td>
                    <td className="w-[10%] p-4 text-sm ">
                      {isVerified === true ? (
                        <span className="bg-[#BBF7D0] text-[#11A13A] rounded-full  text-center items-center p-2 px-4">
                          Verified
                        </span>
                      ) : (
                        <span className="bg-[#f9aaaa] text-[#F12C2C] rounded-full  text-center items-center p-2 px-4">
                          Unverified
                        </span>
                      )}
                    </td>
                    <td>
                      {name === "partner" ? (
                        isAdminVerified === true ? (
                          <div
                            className=" "
                            onClick={() => {
                              verify.current.click();
                              setId(_id);
                              setIsAdminVerified(isAdminVerified);
                              // dispatch(getSingleUser({ id: _id }));
                              // console.log(singleUser);
                            }}>
                            <BadgeCheckIcon className="w-6 text-[#11A13A]" />
                          </div>
                        ) : (
                          <div
                            onClick={() => {
                              verify.current.click();
                              setId(_id);
                              setIsAdminVerified(isAdminVerified);
                            }}>
                            <BadgeCheckIcon className="w-6 text-[#F12C2C]" />
                          </div>
                        )
                      ) : null}
                    </td>

                    <td className="pr-4  w-[10%]      ">
                      {name === "customer" ? (
                        <div tabIndex="0" className="dropdown dropdown-left top-1 cursor-pointer">
                          <DotsVerticalIcon className="w-4  " />

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
                        <div tabIndex="0" className="dropdown dropdown-left dropdown-down z-10 top-1">
                          <DotsVerticalIcon className="w-4  " />

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
      {/* <div className="text-center text-[#959595]   flex justify-center items-center mb-6  ">
        <div className="flex justify-between w-full  lg:w-1/3 md:w-2/3 p-2 px-4 ">
          <div className="flex">
            <ChevronLeftIcon className="w-4 mr-2" />
            <p className="mr-2 bg-[#4543A5] rounded-full h-6 w-6 text-white ">1</p>
            <p className="mr-2">2</p>
            <p className="mr-2">3</p>
          </div>

          <div className="flex">
            <p className="mr-2">301</p>
            <p className="mr-2">302</p>
            <p className="mr-2">303</p>
            <ChevronRightIcon className="w-4" />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default AccountLayout;
