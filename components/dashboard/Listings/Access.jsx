import React, { useContext } from "react";
import Accordion from "../../shared/Accordion";


const Access = ({storageAccessPeriod,storageAccessType,parkingInstruction,parkingPermit}) => {
  
  return (
    <Accordion title="access">
      <div className="space-y-6">
        <div>
          <h3 className="mb-3">Storage Access Period</h3>
          <div className="items-center border border-[#959595] rounded-lg px-4 py-3">
           {storageAccessPeriod}
          </div>
        </div>

        <div>
          <h3 className="mb-3">Storage Access Type</h3>
          <div className="items-center border border-[#959595] rounded-lg px-4 py-3">
           {storageAccessType}
          </div>
        </div>

        <div className="flex gap-5 items-center">
          <p className="font-semibold">Parking Permit</p>
       {parkingPermit}
        </div>

        <div>
          <h3 className="mb-3">Parking Instructions</h3>
          <div className="items-center border border-[#959595] rounded-lg px-4 py-3">
              {parkingInstruction}
           
          </div>
        </div>
      </div>
    </Accordion>
  );
};

export default Access;
