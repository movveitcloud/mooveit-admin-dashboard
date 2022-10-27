import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DotsVerticalIcon,
  XCircleIcon,
  CheckCircleIcon,
  EyeIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import { PulseLoader } from "react-spinners";
import { getListings } from "../../../redux/features/listings.slice";
import { useDispatch, useSelector } from "react-redux";

const Layout = () => {
  const [option, setOption] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListings());
  }, []);
  const { listings } = useSelector((state) => state.listing);
  const { listingLoading } = useSelector((state) => state.listing);
  const router = useRouter();
  const approve = () => router.push("/listings/approve");
  const deny = () => router.push("/listings/deny");

  return (
    <div className="">
      {listingLoading ? (
        <div className="relative">
          <div className="h-[400px] flex justify-center items-center">
            <PulseLoader loading={listingLoading} color="#EDCC5B" />
          </div>
        </div>
      ) : (
        <div className="overflow-auto rounded-lg">
          {/* <table className="table table-compact w-full p-4 mb-8 "> */}
          <table className=" w-full p-4 mb-8 ">
            <thead className="bg-white text-black border border-accent rounded-md p-6 ">
              <tr className="p-4 ">
                <th className="items-center ml-6 my-4 text-start w-[30%] p-4 text-[#222222]">Users</th>

                <th className="w-[15%] whitespace-nowrap text-start px-4">Email Address</th>

                <th className="w-[15%] whitespace-nowrap text-start px-4">Phone Number</th>
                <th className="w-[10%]  whitespace-nowrap text-start px-4">Identification</th>
                <th className="w-[10%] whitespace-nowrap text-start px-4"></th>
              </tr>
            </thead>
            <tbody className="w-full   ">
              {listings?.map(
                ({ status, address, parking, delivery }, index) =>
                  status === "pending" && (
                    <tr className="capitalize cursor-pointer border border-accent text-[#666666]  " key={index}>
                      <td className=" w-[20%]  text-sm  p-4 ">
                        <div className="flex justify-start items-center">
                          <p>Shift Man Van LTD</p>
                        </div>
                      </td>

                      <td className="w-[15%] p-4 whitespace-nowrap ">{address}</td>

                      <td className="w-[10%] p-4 text-sm text-blue">{`${delivery === false ? "False" : "True"}`}</td>

                      <td className="w-[10%] p-4 text-sm">{`${parking === false ? "False" : "True"}`}</td>

                      {/* <td className="w-[10%] p-4">Approved</td> */}
                      <td className="w-[10%] p-4">
                        <div className="flex">
                          <div className="flex text-[#11A131]  ">
                            <CheckCircleIcon className="w-4  mr-4 " />
                            Approve
                          </div>
                          <div className="flex ml-4 text-[#D12C2C]">
                            <XCircleIcon className="w-4 mr-4  " />
                            Deny
                          </div>
                          <div className="flex text-accent-content ">
                            <DotsVerticalIcon className="w-4 ml-4 " />
                          </div>
                        </div>
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Layout;
