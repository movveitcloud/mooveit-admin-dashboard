import React from "react";
import { ChevronDownIcon, XIcon, CheckCircleIcon } from "@heroicons/react/outline";
import { ApprovalLayout } from "../../components";
import { useRouter } from "next/router";

const Approve = () => {
  const router = useRouter();
  const statefunc = () => router.push("/listings");

  return <ApprovalLayout state="Approve" func="listing" statefunc={statefunc} stating="approving" />;
};

export default Approve;
