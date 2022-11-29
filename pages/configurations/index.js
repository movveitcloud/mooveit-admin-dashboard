import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSingleListing, disapproveListing, approveListing } from "../../redux/features/listings.slice";
import { getConfigurations } from "../../redux/features/configurations.slice";
import { useDispatch, useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import { motion } from "framer-motion";
import { ArrowNarrowLeftIcon } from "@heroicons/react/outline";
import { getValue, getValueArray } from "../../helpers/utils";
import {
  AddFeatureModal,
  AddStorageAccessModal,
  AddStorageFloorModal,
  AddStorageTypeModal,
  AdditionalServicesModal,
  StorageAccess,
  StorageFeatures,
  StorageType,
  StorageFloor,
  StorageDimensions,
  AdditionalServices,
  StorageDimensionModal,
  Testing,
} from "../../components";

import { DashboardLayout } from "../../components";

const Configurations = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const query = router.query.id;
  const { configurations, configurationLoading } = useSelector((state) => state.configuration);
  const { singleListing, singleListingLoading } = useSelector((state) => state.listing);

  const [List, setList] = useState({});
  const [option, setOption] = useState(false);

  const id = query;
  useEffect(() => {
    dispatch(getConfigurations());
  }, []);
  // console.log(configurationLoading);
  console.log(configurations);

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

  const approve = () => {
    const id = query;
    const payload = { status: "approved" };
    dispatch(approveListing({ id: id, payload: payload }));
    router.push("/listings");
  };

  console.log(singleListing, "lks");
  return (
    <DashboardLayout>
      {configurationLoading ? (
        <div className="relative">
          <div className="h-[400px] flex justify-center items-center">
            <PulseLoader loading={configurationLoading} color="#EDCC5B" />
          </div>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <div className="w-[80%] mx-auto">
            <>
              <StorageFeatures />
              <StorageType />
              <StorageAccess />
              <StorageFloor />
              <StorageDimensions />
              <AdditionalServices />
              {/* <Testing /> */}
            </>

            {/* <div className="flex justify-end">
              <div className="flex gap-4">
                <button className="btn btn-white text-black border-3 border-accent w-[175px] hover:btn-accent ">
                  Discard Changes
                </button>

                <label htmlFor="deny" className={`btn text-white   bg-primary  w-[175px]`}>
                  Save
                </label>
              </div>
              </div> */}
            <AddFeatureModal id={id} />
            <AddStorageTypeModal id={id} />
            <AddStorageAccessModal id={id} />
            <AddStorageFloorModal id={id} />
            <StorageDimensionModal id={id} />
            <AdditionalServicesModal id={id} />
          </div>
        </motion.div>
      )}
    </DashboardLayout>
  );
};

export default Configurations;
