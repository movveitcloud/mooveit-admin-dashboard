import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DotsVerticalIcon,
  XCircleIcon,
  CheckCircleIcon,
  EyeIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import { PulseLoader } from "react-spinners";
import { getListings } from "../../../redux/features/listings.slice";
import { useDispatch, useSelector } from "react-redux";

const PendingLayout = ({pendingCounts}) => {
  const [option, setOption] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListings());
  }, []);
  const { listings } = useSelector((state) => state.listing);
  const { listingLoading } = useSelector((state) => state.listing);
  const router = useRouter();
  const view = (_id) => router.push(`/listings/${_id}`);
  const approve = () => router.push("/listings/approve");
  const deny = () => router.push("/listings/deny");
  

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
          {pendingCounts!=0 ?
           <table className=" w-full p-4 mb-8 ">
            <thead className="bg-white text-black border  rounded-md p-6 ">
              <tr className="p-4 ">
                <th className="items-center ml-6 my-4 text-start w-[30%] p-4 text-[#222222]">Listing</th>

                <th className="w-[30%] whitespace-nowrap text-start p-4">Location</th>

                <th className="w-[20%] whitespace-nowrap text-start p-4">With Moving</th>
                <th className="w-[20%]  whitespace-nowrap text-start p-4">With Packing</th>
              
              </tr>
            </thead>
        
          {
          listings?.map(
                ({_id, status,storageTitle, address, parking, delivery }, index) =>
                   status==="pending" && (
         
            <tbody className="w-full text-sm   " key={index}>
             
                    <tr className="capitalize cursor-pointer border  text-[#666666]" onClick={(()=>view(_id))} key={index}>
                      <td className=" w-[30%]   text-sm  p-4 ">
                        <div className="flex justify-start items-center">
                          <p>{storageTitle}</p>
                        </div>
                      </td>

                      <td className="w-[30%] p-4  ">{address}</td>

                      <td className="w-[20%] p-4 text-sm text-blue">{`${delivery === false ? "False" : "True"}`}</td>

                      <td className="w-[20%] p-4 text-sm">{`${parking === false ? "False" : "True"}`}</td>

                    </tr>
                 
            </tbody>
           
         
          )
                
          ) }
           </table> :<div className="font-bold text-xl text-center">NO PENDING LISTINGS</div>
}
        </div>
      )}
    </div>
  );
};

export default PendingLayout;
