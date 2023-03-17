import React from "react";
import { ArchiveIcon, ClockIcon, LocationMarkerIcon, MapIcon, TruckIcon } from "@heroicons/react/outline";
import Accordion from "../../shared/Accordion";

const Services = ({ delivery, packing, services }) => {
  console.log(services);

  console.log(delivery);
  console.log(packing);
  return (
    <Accordion title="services">
      {!delivery && !packing ? (
        "N/A"
      ) : (
        <div className=" flex gap-6 items-center">
          <div className="flex gap-5 items-center">
            {delivery && (
              <div className="flex flex-row items-center gap-2 text-[#107E7E]">
                <span className="rounded-full p-[6px] bg-accent">
                  <TruckIcon className="text-primary w-4" />
                </span>
                <span className="text-[#222222] text-base">Delivery</span>
              </div>
            )}
          </div>

          <div className="flex gap-5 items-center">
            {packing && (
              <div className="flex flex-row items-center gap-2 text-[#107E7E]">
                <span className="rounded-full p-[6px] bg-accent">
                  <ArchiveIcon className="text-primary w-4" />
                </span>
                <span className="text-[#222222] text-base">Packing</span>
              </div>
            )}
          </div>
        </div>
      )}
      {/* <div className=" flex gap-6 items-center">
        <div className="flex gap-5 items-center">
          {delivery && (
          {services}
          )} 
        </div>
      </div> */}
    </Accordion>
  );
};

export default Services;
