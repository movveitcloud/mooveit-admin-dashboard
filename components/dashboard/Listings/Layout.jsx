import { ChevronLeftIcon, ChevronRightIcon, DotsVerticalIcon, EyeIcon, TrashIcon } from "@heroicons/react/outline";

import React from "react";
import { useState } from "react";

const Layout = ({ content, name }) => {
  const [option, setOption] = useState("");

  return (
    <div className="">
      <div className="overflow-auto rounded-lg">
        <table className="table table-compact w-full p-4 mb-8 ">
          <thead className="bg-white text-white border border-[#DCDCFF] rounded-md p-6 ">
            <tr className="p-4 ">
              <th className="px-4 pr-0 py-4  ">
                <div className="border border-[#DCDCFF] w-4 h-4 rounded-sm mr-2"> </div>
              </th>

              <th className="items-center ml-6 my-4 text-start w-[30%] px-4">Listing</th>

              <th className="w-[15%] whitespace-nowrap text-start px-4">Location</th>

              <th className="w-[15%] whitespace-nowrap text-start px-4">With Moving</th>
              <th className="w-[10%] whitespace-nowrap text-start px-4">With Packing</th>
              <th className="w-[10%] whitespace-nowrap text-start px-4">Last Active</th>
              <th className="w-[10%]"></th>
              {/* <th className="w-[10%]"></th> */}
            </tr>
          </thead>
          <tbody className="w-full   ">
            {content &&
              content.map(({ Listing, Location, WithMoving, WithPacking, Last, id }, index) => (
                <tr className="capitalize cursor-pointer border border-[#DCDCFF]   " key={index}>
                  <td className="px-4 pr-0 ">
                    <div className="border border-[#DCDCFF] w-4 h-4 rounded-sm mr-2"> </div>
                  </td>
                  <td className=" w-[30%]  p-4 ">
                    <div className="flex justify-start items-center">
                      {/* <div className="rounded-full w-8 h-8 mr-2  ">
                        <img className="w-full object-fit h-full rounded-full" src="/auth-image.png" alt="user-image" />
                      </div> */}
                      <p>{Listing}</p>
                    </div>
                  </td>

                  <td className="w-[15%] p-4 text-sm">{Location}</td>

                  <td className="w-[15%] p-4 text-sm">{WithMoving}</td>

                  <td className="w-[10%] p-4 text-sm">{WithPacking}</td>

                  <td className="w-[10%] p-4 text-sm">{Last}</td>
                  <td className="w-[15%] p-4  mr-0 ">
                    <div className="flex">
                      <EyeIcon className="w-4 mr-4  " />
                      <DotsVerticalIcon className="w-4  " />
                    </div>
                  </td>

                  {/* <td className="pr-4  w-[10%]      ">
                    <DotsVerticalIcon className="w-4  " />
                  </td> */}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

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

export default Layout;
