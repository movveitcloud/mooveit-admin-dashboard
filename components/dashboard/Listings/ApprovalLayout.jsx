import React from "react";
import { ChevronDownIcon, XIcon, XCircleIcon, CheckCircleIcon } from "@heroicons/react/outline";

const ApprovalLayout = ({ state, statefunc, stating }) => {
  return (
    <div className=" p-4 md:p-16 py-14 text-black flex flex-col justify-center items-center">
      <XIcon className=" w-8 mb-20 self-end cursor-pointer" onClick={statefunc} />
      <div className=" p-4 md:p-16 py-14 md:px-0 text-black flex flex-col justify-center  items-center align-middle w-full ">
        <div
          className={`${
            state === "Approve" ? "bg-[#BBF7D0] text-[#11A131] " : "bg-[#FECACA] text-[#D12C2C]"
          } rounded-full  mb-14  h-40 w-40 flex items-center align-middle justify-center`}>
          {state === "Approve" ? <CheckCircleIcon className=" w-20  " /> : <XCircleIcon className=" w-20  " />}
        </div>
        <p className="text-xl  md:text-2xl mb-6">{state} Listing</p>
        <p className="text-[#959595] text-base md:text-xl  mb-6">Kindly confirm that you are {stating} this listing</p>
        <button className="w-full rounded-md p-4 text-[14px] md:text-base text-white bg-[#4543A5]">APPROVE</button>
      </div>
    </div>
  );
};

export default ApprovalLayout;
