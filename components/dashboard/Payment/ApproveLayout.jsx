import React from "react";
import { ChevronDownIcon, XIcon, XCircleIcon, CheckCircleIcon } from "@heroicons/react/outline";

const ApproveLayout = ({ state, statefunc, stating, func }) => {
  return (
    <div className=" p-4 md:p-16 py-14 text-black flex flex-col justify-center items-center">
      <XIcon className=" w-8 mb-10 self-end cursor-pointer" onClick={statefunc} />
      <div className=" p-4 md:p-6  md:px-0 text-black flex flex-col justify-center  items-center align-middle w-full ">
        <div className="bg-[#BBF7D0] text-[#11A131]  rounded-full  mb-14  h-40 w-40 flex items-center align-middle justify-center">
          <CheckCircleIcon className=" w-20  " />
        </div>
        <p className="text-xl  md:text-2xl mb-6">Approve Payment</p>

        <p className="text-[#959595] text-base md:text-xl  mb-10">Kindly confirm that you are approving this payment</p>
        <div className="w-[35%] mb-10">
          <div className="flex justify-between mb-5    w-full">
            <p>Amount</p>
            <p>$200</p>
          </div>
          <div className="flex justify-between border border-black border-x-0 border-t-0 border-dashed  pb-3 mb-5  w-full">
            <p>Commission(-10%)</p>
            <p>$20</p>
          </div>
          <div className="flex justify-between  w-full">
            <p>Total</p>
            <p>$180</p>
          </div>
        </div>
        <button className="w-full rounded-md p-4 text-[14px] md:text-base text-white bg-accent-content">APPROVE</button>
      </div>
    </div>
  );
};

export default ApproveLayout;
