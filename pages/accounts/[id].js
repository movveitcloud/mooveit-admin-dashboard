import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSingleUser } from "../../redux/features/users.slice";
import { useDispatch, useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import { motion } from "framer-motion";
import { ArrowNarrowLeftIcon } from "@heroicons/react/outline";

import { Name, Email, DashboardLayout, VerifyPartnerModal, Document, Vat } from "../../components";

const View = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const query = router.query.id;
  const { singleListing } = useSelector((state) => state.listing);
  const { singleUser, singleUserLoading } = useSelector((state) => state.user);

  useEffect(() => {
    if (query) {
      dispatch(getSingleUser({ id: query }));
    }
  }, [query]);

  return (
    <DashboardLayout>
      {singleUserLoading ? (
        <div className="relative">
          <div className="h-[400px] flex justify-center items-center">
            <PulseLoader loading={singleUserLoading} color="#EDCC5B" />
          </div>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <div className="flex gap-3 items-center mb-4">
            <button className="gap-2 btn btn-link hover:no-underline" onClick={() => router.push("/accounts")}>
              <ArrowNarrowLeftIcon className="w-4" />
              Back
            </button>
            <h2 className="font-bold text-xl">{singleListing?.storageTitle}</h2>
          </div>
          <div className="w-[80%] mx-auto">
            <>
              <Name firstName={singleUser?.firstName} lastName={singleUser?.lastName} />
              <Email Email={singleUser?.email} />
              <Vat Vat={singleUser?.isVatRegistered} />
              <Document />
            </>

            <div className="flex justify-end">
              <div className="flex gap-4">
                <label
                  htmlFor="verifypartner"
                  className={`btn btn-primary w-[175px] disabled:bg-[#ccc] disabled:text-primary hover:w-[180px]`}>
                  {singleUser?.isAdminVerified !== true ? "Verify" : "Disverify"}
                </label>
              </div>
            </div>
            <VerifyPartnerModal Id={singleUser?._id} isAdminVerified={singleUser?.isAdminVerified} query={query} />
          </div>
        </motion.div>
      )}
    </DashboardLayout>
  );
};

export default View;
