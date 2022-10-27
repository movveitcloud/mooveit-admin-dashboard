import React from "react";
import { CheckCircleIcon, XCircleIcon, DotsVerticalIcon, EyeIcon, TrashIcon } from "@heroicons/react/outline";
import Layout from "./Layout";
import { useRouter } from "next/router";

const PendingPayment = () => {
  const router = useRouter();
  const deny = () => router.push("/payments/refund");
  const approve = () => router.push("/payments/approve");

  return (
    <div>
      <Layout>
        <div className="flex">
          <div className="flex text-[#11A131]  " onClick={approve}>
            <CheckCircleIcon className="w-4  mr-4 " />
            APPROVE
          </div>
          <div className="flex ml-4 text-[#D12C2C]" onClick={deny}>
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

export default PendingPayment;
