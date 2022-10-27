import React from "react";
import { ChevronDownIcon, XIcon, CheckCircleIcon } from "@heroicons/react/outline";
import { RefundLayout } from "../../components";
import { useRouter } from "next/router";

const Refund = () => {
  const router = useRouter();
  const statefunc = () => router.push("/payments");

  return <RefundLayout state="Refund" statefunc={statefunc} stating="refunding" />;
};

export default Refund;
