import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronLeftIcon, ChevronRightIcon, DotsVerticalIcon, EyeIcon, TrashIcon } from "@heroicons/react/outline";
import { getListings } from "../../../redux/features/listings.slice";
import { PulseLoader } from "react-spinners";
import { useRouter } from "next/router";

const Layout = ({approvedCounts}) => {
 
  const router = useRouter();
  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch(getListings());
  }, []);
  const { listings } = useSelector((state) => state.listing);
  
  

  const { listingLoading } = useSelector((state) => state.listing);
  const view = (_id) => router.push(`/listings/${_id}`);

  return (
    <div className="">
      {listingLoading ? (
        <div className="relative">
          <div className="h-[400px] flex justify-center items-center">
            <PulseLoader loading={listingLoading} color="#EDCC5B" />
          </div>
        </div>
      ) : (
        <div className="overflow-auto rounded-lg">
          {approvedCounts!=0 ?
            <table className=" w-full p-4 mb-8 ">
            <thead className="bg-white  border  rounded-md p-6 ">
              <tr className="p-4 ">
                <th className="items-center ml-6 my-4 text-start w-[20%] px-4">Listing</th>

                <th className="w-[20%]  text-start p-4">Location</th>

                <th className="w-[15%] whitespace-nowrap text-start p-4">With Moving</th>
                <th className="w-[10%] whitespace-nowrap text-start p-4">With Packing</th>
               
              </tr>
            </thead>
          {listings?.map(
                ({ _id,status, address,storageTitle, parking, delivery }, index) =>
                  status === "approved" && (
              

            <tbody className="w-full   " key={index}>
              
                    <tr className="capitalize cursor-pointer border  text-[#666666]" onClick={(()=>view(_id))} key={index}>
                      <td className=" w-[20%]  p-4 ">
                        <div className="flex justify-start items-center">
                          {/* <div className="rounded-full w-8 h-8 mr-2  ">
                        <img className="w-full object-fit h-full rounded-full" src="/auth-image.png" alt="user-image" />
                      </div> */}
                          <p className=" text-sm">{storageTitle}</p>
                        </div>
                      </td>

                      <td className="w-[20%] p-4 text-sm">{address}</td>

                      <td className="w-[10%] p-4 text-sm ">{`${delivery === false ? "False" : "True"}`}</td>

                      <td className="w-[10%] p-4 text-sm">{`${parking === false ? "False" : "True"}`}</td>

                    
                     
                    </tr>
               
            </tbody>
        
      
             ) 
           
             )}
               </table> :<div className="font-bold text-xl text-center ">NO APPROVED LISTINGS</div>
}
        </div>
      )}
    </div>
  );
};

export default Layout;
