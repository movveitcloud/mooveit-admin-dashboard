import { MapIcon } from "@heroicons/react/outline";
import React from "react";

import Accordion from "../../shared/Accordion";

const Address = ({Address}) => {
  

  return (
    <Accordion title="address">
      <div className="flex flex-row flex-grow gap-4 items-center border border-[#959595] rounded-lg px-4 py-3">
        <MapIcon className="text-[#959595] w-6" />
        <p>{Address}</p>
        
      </div>
      <img src="/dummymap.png" alt="map" className="w-full mt-8" />
    </Accordion>
  );
};

export default Address;