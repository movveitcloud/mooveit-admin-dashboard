import React from "react";
import { ChevronDownIcon, XIcon, CheckCircleIcon } from "@heroicons/react/outline";
import { ApproveLayout, RefundLayout } from "../../components";
import { useRouter } from "next/router";

const Approve = () => {
  const router = useRouter();
  const statefunc = () => router.push("/payments");

  return <ApproveLayout statefunc={statefunc} />;
};

export default Approve;
