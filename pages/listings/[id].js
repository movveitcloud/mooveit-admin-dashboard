import React,  {  useEffect, useState } from 'react'
import { useRouter } from "next/router";
import { getSingleListing,approveListing } from '../../redux/features/listings.slice';
import { useDispatch, useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import { motion } from "framer-motion";
import { ArrowNarrowLeftIcon } from "@heroicons/react/outline";
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
       
      dispatch(getSingleListing({ id: query }));
    }
  }, [query]);
  useEffect(() => {
    if (singleListing) {
      
       setList(singleListing)
       singleListing.status==="pending" ? (setOption(true)) : ""
      
      } 
   
  }, [singleListing]);

  const approve = () => {
  dispatch(approveListing({ id: query }));
  router.push("/listings");}
 
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
          <>
          <Dimension storageSize={List.storageSize} />
          <Media image={List.image} />
          <Description storageTitle={List.storageTitle} description={List.description} />
          </>
          <>
          <Access storageAccessPeriod={List.storageAccessPeriod} storageAccessType={List.storageAccessType}parkingInstruction={List.parkingInstruction}parkingPermit={List.parkingPermit} />
          <BookingDetails bookingDuration={List.bookingDuration} bookingNotice={List.bookingNotice} />
          </>
          <Pricing hourlyRate={List.hourlyRate} monthlyRate={List.monthlyRate} /> 
         
        {option===true &&
          <div className="flex justify-end">
            <div className="flex gap-4">
              <button className={`btn btn-outline btn-primary hover:btn-accent w-[175px]`} onClick={approve}  >
                Approve
              </button>
              <button
                className="btn btn-primary w-[175px] disabled:bg-[#ccc] disabled:text-primary"
                
             
                >
               Deny
              </button>
            </div>
          </div>
          }
        </div>
      </motion.div>
     )
      }
      
   
    </DashboardLayout>
  )
}

export default View
