import { ChevronLeftIcon, ChevronRightIcon, DotsVerticalIcon, EyeIcon, TrashIcon } from "@heroicons/react/outline";
import { validateConfig } from "next/dist/server/config-shared";

import React from "react";
import { useState } from "react";

const Layout = ({ content }) => {
  const [option, setOption] = useState("");
  const users = [
    {
      id: "01",
      User: "Khadijah Onanuga Adebola Ade ",
      Email: "ppppppppppp@gmail.com",
      Phone: "08066719237",
      Status: "Verified",
      Last: "Today",
    },
    {
      id: "02",
      User: "Khadijah Onanuga",
      Email: "ppp@gmail.com",
      Phone: "08066719237",
      Status: "Unverified",
      Last: "Today",
    },
    {
      id: "03",
      User: "Khadijah Onanuga",
      Email: "ppp@gmail.com",
      Phone: "08066719237",
      Status: "Verified",
      Last: "Today",
    },
  ];

  const handleOption = (id) => {
    users.map((val) => {
      if (val.id === id) {
        setOption(id);
      }
    });
  };

  return (
    <div className="">
      <div className="overflow-auto rounded-lg">
        <table className="table table-compact w-full p-4 mb-6 ">
          <thead className="bg-white text-white border border-[#DCDCFF] rounded-md p-6 ">
            <tr className="p-4 ">
              <th className="px-4 pr-0 py-4  ">
                <div className="border border-[#DCDCFF] w-4 h-4 rounded-sm mr-2"> </div>
              </th>

              <th className="items-center ml-6 my-4 text-start w-[30%] px-4"> Users</th>

              <th className="w-[15%] whitespace-nowrap text-start px-4">Email Address</th>

              <th className="w-[15%] whitespace-nowrap text-start px-4">Phone Number</th>
              <th className="w-[10%] whitespace-nowrap text-start px-4">Status</th>
              <th className="w-[10%] whitespace-nowrap text-start px-4">Last Active</th>
              <th className="w-[10%]"></th>
            </tr>
          </thead>
          <tbody className="w-full   ">
            {users &&
              users.map(({ User, Email, Phone, Status, Last, id }, index) => (
                <tr className="capitalize cursor-pointer border border-[#DCDCFF]   " key={index}>
                  <td className="px-4 pr-0 ">
                    <div className="border border-[#DCDCFF] w-4 h-4 rounded-sm mr-2"> </div>
                  </td>
                  <td className=" w-[30%]  p-4 ">
                    <div className="flex justify-start items-center">
                      {/* <div className="rounded-full w-8 h-8 mr-2  ">
                        <img className="w-full object-fit h-full rounded-full" src="/auth-image.png" alt="user-image" />
                      </div> */}
                      <p>{User}</p>
                    </div>
                  </td>

                  <td className="w-[15%] p-4 ">{Email}</td>
                  <td className="w-[15%] p-4">{Phone}</td>
                  <td className="w-[10%] p-4 ">
                    <span
                      className={`${
                        Status === "Verified" ? "bg-[#BBF7D0] text-[#11A13A] " : "bg-[#FECACA] text-[#D12C2C]"
                      }  rounded-full  text-center items-center p-2 px-4`}>
                      {Status}
                    </span>
                  </td>
                  <td className="w-[10%] p-4">{Last}</td>
                  <td className="pr-4  w-[10%]       ">
                    <div tabIndex="0" className="dropdown dropdown-left top-1  ">
                      <DotsVerticalIcon className="w-6  " />

                      <div tabIndex="0" className=" bg-white rounded-sm shadow w-auto p-4 dropdown-content menu   ">
                        <div className="text-[12px] flex whitespace-nowrap ">
                          <EyeIcon className="w-4 mr-2 " />
                          <p>View History</p>
                        </div>
                        <div className="text-[12px] flex">
                          <TrashIcon className="w-4 mr-2 " />
                          <p>Delete User</p>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="text-center text-[#959595]   flex justify-center items-center mb-6  ">
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
      </div>
    </div>
  );
};

export default Layout;
