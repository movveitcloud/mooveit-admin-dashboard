import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSingleListing, disapproveListing, approveListing } from "../../redux/features/listings.slice";
import { useDispatch, useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import { motion } from "framer-motion";
import { ArrowNarrowLeftIcon } from "@heroicons/react/outline";
import { getValue, getService, getValueArray } from "../../helpers/utils";
import {
  getFeatures,
  getFloor,
  getType,
  getAccess,
  getAccessPeriod,
  getBookingPeriod,
  getNoticePeriod,
  getServices,
  getSize,
} from "../../redux/features/configurations.slice";
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
  DenyListingModal,
} from "../../components";

const View = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const query = router.query.id;
  const { singleListing, singleListingLoading } = useSelector((state) => state.listing);
  const [List, setList] = useState({});
  const [option, setOption] = useState(false);

  const id = query;

  useEffect(() => {
    if (query) {
      dispatch(getSingleListing({ id: query }));
    }
  }, [query]);
  useEffect(() => {
    if (singleListing) {
      setList(singleListing);
      singleListing.status === "pending" ? setOption(true) : "";
    }
  }, [singleListing]);
  console.log(singleListing);
  useEffect(() => {
    dispatch(getType({ config: "storage-type" }));
    dispatch(getFloor({ config: "storage-floor" }));
    dispatch(getFeatures({ config: "storage-features" }));
    dispatch(getAccess({ config: "storage-access-type" }));
    dispatch(getAccessPeriod({ config: "storage-access-period" }));
    dispatch(getBookingPeriod({ config: "booking-period" }));
    dispatch(getNoticePeriod({ config: "notice-period" }));
    dispatch(getServices({ config: "notice-period" }));
    dispatch(getSize({ config: "storage-size" }));
  }, []);

  const approve = () => {
    const id = query;
    const payload = { status: "approved" };
    dispatch(approveListing({ id: id, payload: payload }));
    router.push("/listings");
  };
  const { type } = useSelector((state) => state.configuration);
  const { floor } = useSelector((state) => state.configuration);
  const { features } = useSelector((state) => state.configuration);
  const { access } = useSelector((state) => state.configuration);
  const { accessperiod } = useSelector((state) => state.configuration);
  const { bookingperiod } = useSelector((state) => state.configuration);
  const { noticeperiod } = useSelector((state) => state.configuration);
  const { size } = useSelector((state) => state.configuration);
  const { services } = useSelector((state) => state.configuration);
  console.log(List);

  return (
    <DashboardLayout>
      {singleListingLoading ? (
        <div className="relative">
          <div className="h-[400px] flex justify-center items-center">
            <PulseLoader loading={singleListingLoading} color="#EDCC5B" />
          </div>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <div className="flex gap-3 items-center mb-4">
            <button className="gap-2 btn btn-link hover:no-underline" onClick={() => router.push("/listings")}>
              <ArrowNarrowLeftIcon className="w-4" />
              Back
            </button>
            <h2 className="font-bold text-xl">{singleListing?.storageTitle}</h2>
          </div>
          <div className="w-[80%] mx-auto">
            <>
              <Address Address={List?.address} />
              <Type
                storageType={getValue({ options: type, key: List?.storageType })}
                storageFloor={getValue({ options: floor, key: List?.storageFloor })}
                storageFeatures={getValue({ options: features, key: List?.storageFeatures })}
              />
              <Services
                delivery={getService({ options: "delivery", key: List?.services, list: List, name: "delivery" })}
                packing={getService({ options: "delivery", key: List?.services, list: List, name: "packing" })}
              />
              {/* <Services services={getValueArray({ options: size, key: List?.services, list: List })} /> */}
            </>
            <>
              <Dimension
                storageSize={getValue({ options: size, key: List?.storageSize?.name, list: List.storageSize })}
              />
              <Media images={singleListing?.media} />
              <Description storageTitle={List?.storageTitle} description={List?.description} />
            </>
            <>
              <Access
                storageAccessPeriod={getValue({ options: accessperiod, key: List?.storageAccessPeriod })}
                storageAccessType={getValue({ options: access, key: List?.storageAccessType })}
                parkingInstruction={List?.packingInstruction ? List?.packingInstruction : "N/A"}
                // parkingPermit={List?.parkingPermit ? "Available" : "N/A"}
                parkingPermit={List?.packingPermit == false ? "No" : List?.parkingPermit == true ? "Yes" : "N/A"}
              />
              <BookingDetails
                bookingDuration={getValue({ options: bookingperiod, key: List?.bookingDuration })}
                bookingNotice={getValue({ options: noticeperiod, key: List?.bookingNotice })}
              />
            </>
            <Pricing
              hourlyRate={List?.hourlyRate ? `$${List.hourlyRate}` : "N/A"}
              monthlyRate={List?.monthlyRate ? `$${List.monthlyRate}` : "N/A"}
            />

            {singleListing.status !== "approved" && (
              <div className="flex justify-end">
                <div className="flex gap-4">
                  <button
                    className={`${
                      singleListingLoading && "loading"
                    } btn btn-primary w-[175px] disabled:bg-[#ccc] disabled:text-primary `}
                    // className="btn btn-primary w-[175px] disabled:bg-[#ccc] disabled:text-primary"
                    onClick={approve}>
                    {singleListingLoading ? "" : "Approve"}
                  </button>

                  <label htmlFor="deny" className={`btn text-black btn-outline btn-primary hover:btn-accent w-[175px]`}>
                    Deny
                  </label>
                </div>
              </div>
            )}
            <DenyListingModal id={id} />
          </div>
        </motion.div>
      )}
    </DashboardLayout>
  );
};

export default View;
