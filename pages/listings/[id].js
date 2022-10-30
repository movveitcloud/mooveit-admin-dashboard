import React,  {  useEffect, useState } from 'react'
import { useRouter } from "next/router";
import { getSingleListing } from '../../redux/features/listings.slice';
import { useDispatch, useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import { motion } from "framer-motion";
import { ArrowNarrowLeftIcon } from "@heroicons/react/outline";
import {
    // Access,
    Address,
    // BookingDetails,
    // Calendar,
    DashboardLayout,
    // Description,
    // Dimension,
    // Media,
    // Pricing,
     Services,
    // StreetView,
    Type,
   
  } from "../../components";


const View = () => {
    const router = useRouter();
  const dispatch = useDispatch();
  const query = router.query.id;
  const { singleListing, singleListingLoading } = useSelector((state) => state.listing);
  const[List,setList]=useState({})
  const[option,setOption]=useState(false)

  useEffect(() => {
    if (query) {
        console.log(query)
      dispatch(getSingleListing({ id: query }));
    }
  }, [query]);
  useEffect(() => {
    if (singleListing) {
        console.log(singleListing)
       setList(singleListing)
       singleListing.status==="pending" ? (setOption(true)) : ""
       console.log(option)
      } 
   
  }, [singleListing]);
 
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
          <h2 className="font-bold text-xl">{singleListing?.address}</h2>
        </div>
        <div className="w-[80%] mx-auto">
          <>
            <Address Address={List.address} />
            <Type storageType={List.storageType} storageFloor={List.storageFloor}storageFeatures={List.storageFeatures} />
            <Services delivery={List.delivery} parking={List.parking} />
          </>
          {/* <>
            <Dimension />
           
            <Media />
            <Description />
          </>
          <>
            <Calendar />
            <Access />
            <BookingDetails />
          </>
          <Pricing /> */}

          {/* <div className="flex justify-end">
            <div className="flex gap-4">
              <button className={`btn btn-outline btn-primary hover:btn-accent w-[175px]`} onClick={discardChanges}>
                Discard Changes
              </button>
              <button
                className={`${
                  loading && "loading"
                } btn btn-primary w-[175px] disabled:bg-[#ccc] disabled:text-primary`}
                onClick={saveChanges}>
                {loading ? "" : "Save"}
              </button>
            </div>
          </div> */}
        </div>
      </motion.div>
     )
      }
      
   
    </DashboardLayout>
  )
}

export default View
