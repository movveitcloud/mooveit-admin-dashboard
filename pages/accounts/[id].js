import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSingleUser } from "../../redux/features/admin.slice";
import { useDispatch, useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import { motion } from "framer-motion";
import { ArrowNarrowLeftIcon } from "@heroicons/react/outline";
import { getValue, getValueArray } from "../../helpers/utils";
import {
  howAccessListing,
  storageFeatures,
  whenAccessListing,
  spaceDuration,
  arrivalNoticeOpts,
  storageFloors,
  storageKinds,
  storageSize,
} from "../../helpers/data";
import {
  Access,
  Address,
  BookingDetails,
  // Calendar,
  DashboardLayout,
  Description,
  Dimension,
  Media,
  Pricing,
  Services,
  Type,
  VerifyPartnerModal,
} from "../../components";

const View = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const query = router.query.id;
  const { singleListing } = useSelector((state) => state.listing);
  const { singleUser, singleUserLoading } = useSelector((state) => state.admin);
  const [List, setList] = useState({});
  const [option, setOption] = useState(false);

  const id = query;

  useEffect(() => {
    if (query) {
      dispatch(getSingleUser({ id: query }));
    }
  }, [query]);
  console.log(singleUser);
  useEffect(() => {
    if (singleListing) {
      setList(singleListing);
      singleListing.status === "pending" ? setOption(true) : "";
    }
  }, [singleListing]);

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
              <Address Address={List?.address} />
              <Type
                storageType={getValue({ options: storageKinds, key: List?.storageType })}
                storageFloor={getValue({ options: storageFloors, key: List?.storageFloor })}
                storageFeatures={getValueArray({ options: storageFeatures, key: List?.storageFeatures })}
              />
              <Services delivery={singleListing?.delivery} packing={singleListing?.packing} />
            </>
            {/* <>
              <Dimension storageSize={getValue({ options: storageSize, key: List?.storageSize })} />
              <Media images={singleListing?.media} />
              <Description storageTitle={List?.storageTitle} description={List?.description} />
            </>
            <>
              <Access
                storageAccessPeriod={getValue({ options: whenAccessListing, key: List?.storageAccessPeriod })}
                storageAccessType={getValue({ options: howAccessListing, key: List?.storageAccessType })}
                parkingInstruction={List?.parkingInstruction ? List?.parkingInstruction : "N/A"}
                parkingPermit={List?.parkingPermit ? "Available" : "N/A"}
              />
              <BookingDetails
                bookingDuration={getValue({ options: spaceDuration, key: List?.bookingDuration })}
                bookingNotice={getValue({ options: arrivalNoticeOpts, key: List?.bookingNotice })}
              />
            </>
            <Pricing
              hourlyRate={List?.hourlyRate ? `$${List.hourlyRate}` : "N/A"}
              monthlyRate={List?.monthlyRate ? `$${List.monthlyRate}` : "N/A"}
            /> */}

            {singleUser?.isAdminVerified !== true ? (
              <div className="flex justify-end">
                <div className="flex gap-4">
                  {/* <button
                  className="btn btn-primary w-[175px] disabled:bg-[#ccc] disabled:text-primary"
                  onClick={approve}>
                  Approve
                </button> */}
                  <label
                    htmlFor="verifypartner"
                    className={`btn btn-primary w-[175px] disabled:bg-[#ccc] disabled:text-primary hover:w-[180px]`}>
                    Verify
                  </label>
                </div>
              </div>
            ) : (
              <div className="flex justify-end">
                <div className="flex gap-4">
                  <label
                    htmlFor="disverifypartner"
                    className={`btn btn-primary w-[175px] disabled:bg-[#ccc] disabled:text-primary hover:w-[180px]`}>
                    Disverify
                  </label>
                </div>
              </div>
            )}
            <VerifyPartnerModal id={id} />
          </div>
        </motion.div>
      )}
    </DashboardLayout>
  );
};

export default View;
