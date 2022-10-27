import React from "react";
import { ChevronDownIcon, XIcon, CheckCircleIcon } from "@heroicons/react/outline";
import { ApprovalLayout } from "../../components";
import { useRouter } from "next/router";

const Deny = () => {
  const router = useRouter();
  const statefunc = () => router.push("/listings");

  return <ApprovalLayout state="Deny" func="listing" statefunc={statefunc} stating="denying" />;
};

export default Deny;
