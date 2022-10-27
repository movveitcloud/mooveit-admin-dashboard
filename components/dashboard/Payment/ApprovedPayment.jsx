import React from "react";
import { CheckCircleIcon, XCircleIcon, DotsVerticalIcon, EyeIcon, TrashIcon } from "@heroicons/react/outline";
import Layout from "./Layout";

const ApprovedPayment = () => {
  return (
    <div>
      <Layout>
        <div className="flex">
          <div className="flex ml-4 text-[#D12C2C]">
            <XCircleIcon className="w-4 mr-4  " />
            REFUND
          </div>
          <div className="flex  ">
            <EyeIcon className="w-4 ml-4  " />
          </div>
          <DotsVerticalIcon className="w-4 ml-4 " />
        </div>
      </Layout>
    </div>
  );
};

export default ApprovedPayment;
