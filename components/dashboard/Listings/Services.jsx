import React from "react";
import { ArchiveIcon, ClockIcon, LocationMarkerIcon, MapIcon, TruckIcon } from "@heroicons/react/outline";
import Accordion from "../../shared/Accordion";


const Services = ({delivery,parking}) => {
  

  return (
    <Accordion title="services">
      {(delivery=== false) && (parking=== false) ? "N/A" :
      <div className="space-y-5">
        {/* <h3 className=" font-bold">Delivery services</h3> */}
        <div className="flex gap-5 items-center">
          {delivery=== false? "":   (<div className="flex flex-row items-center gap-2 text-[#107E7E]">
                <span className="rounded-full p-[6px] bg-accent">
                 <TruckIcon className="text-primary w-4" />
               </span>
                <span className="text-[#222222] text-base">Delivery</span>
              </div>)}
              </div>
              
              <div className="flex gap-5 items-center">
              {parking=== false? "":   (<div className="flex flex-row items-center gap-2 text-[#107E7E]">
                <span className="rounded-full p-[6px] bg-accent">
                 <TruckIcon className="text-primary w-4" />
               </span>
                <span className="text-[#222222] text-base">Parking</span>
              </div>)}
              </div>
        
        
       
      </div>
}
    </Accordion>
  );
};

export default Services;