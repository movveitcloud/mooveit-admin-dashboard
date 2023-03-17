import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { getBooking, getSingleBooking } from "../../redux/features/bookings.slice";
import { useDispatch, useSelector } from "react-redux";
import { getService } from "../../helpers/utils";
import Link from "next/link";
import {
  DashboardLayout,
  RentersInformation,
  RentersBookingPeriod,
  RentersAdditionalServices,
  RentersPrice,
} from "../../components";
import { ChevronRightIcon } from "@heroicons/react/outline";
import { PulseLoader } from "react-spinners";

const View = () => {
  const router = useRouter();
  const [storageDate, setStorageDate] = useState("");
  const query = router.query.id;
  const id = query;
  const { bookings, singleBooking, singleBookingLoading } = useSelector((state) => state.bookings);
  const dispatch = useDispatch();
  //console.log(singleBooking);
  const Back = () => {
    router.push("/your-storage");
  };

  useEffect(() => {
    if (query) {
      dispatch(getSingleBooking({ id }));
    }
  }, [query]);

  return (
    <DashboardLayout>
      {singleBookingLoading ? (
        <div className="relative">
          <div className="flex h-[500px] items-center justify-center">
            <PulseLoader loading={singleBookingLoading} color="#EDCC5B" />
          </div>
        </div>
      ) : (
        <div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <div className="mx-auto w-[80%]">
              <div className=" text- mb-8 flex cursor-pointer items-center text-sm">
                <p className="  text-[#BBBBBB]" onClick={Back}>
                  BOOKINGS
                </p>
                <ChevronRightIcon className="h-4 w-4" />

                <p className=" uppercase">
                  {singleBooking?.paymentStatus == "successful" ? "active" : singleBooking?.approvalStatus}
                </p>
              </div>
              <>
                <RentersInformation
                  firstName={singleBooking?.user?.firstName}
                  lastName={singleBooking.user?.lastName}
                  profilePicture={singleBooking.user?.profilePicture}
                />
                <RentersBookingPeriod
                  startPeriod={
                    singleBooking?.type == "monthly"
                      ? format(new Date(singleBooking?.startDate?.split("T")[0]), "MMMM dd, yyyy")
                      : singleBooking?.startDate &&
                        singleBooking?.startDate?.split("T")[1].slice(0, 5) +
                          " " +
                          format(new Date(singleBooking?.startDate?.split("T")[0]), "MMMM dd, yyyy")
                  }
                  endPeriod={
                    singleBooking?.type == "monthly"
                      ? format(new Date(singleBooking?.endDate?.split("T")[0]), "MMMM dd, yyyy")
                      : singleBooking?.endDate &&
                        singleBooking?.endDate?.split("T")[1].slice(0, 5) +
                          " " +
                          format(new Date(singleBooking?.endDate?.split("T")[0]), "MMMM dd, yyyy")
                  }
                />
                <RentersAdditionalServices
                  delivery={getService({
                    options: "delivery",
                    key: singleBooking?.storageListing?.services,
                    list: singleBooking,
                    name: "delivery",
                  })}
                  packing={getService({
                    options: "delivery",
                    key: singleBooking?.storageListing?.services,
                    list: singleBooking,
                    name: "packing",
                  })}
                />
                <RentersPrice listingPrice={singleBooking?.price} />
              </>
            </div>
          </motion.div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default View;
