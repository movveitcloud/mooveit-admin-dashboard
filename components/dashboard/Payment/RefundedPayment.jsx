import React from "react";
import { CheckCircleIcon, XCircleIcon, DotsVerticalIcon, EyeIcon, TrashIcon } from "@heroicons/react/outline";
import Layout from "./Layout";

const RefundedPayment = () => {
  return (
    <div>
      <Layout>
        <div className="flex justify-end ">
          <div className="flex text-[#4543A5] ">
            <EyeIcon className="w-4 ml-4  " />
          </div>
          <DotsVerticalIcon className="w-4 ml-4 " />
        </div>
      </Layout>
    </div>
  );
};

export default RefundedPayment;
