import React, { useContext } from "react";
import Accordion from "../../shared/Accordion";


const Access = ({storageAccessPeriod,storageAccessType,parkingInstruction,parkingPermit}) => {
  
  return (
    <Accordion title="access">
      <div className="space-y-6">
        <div>
          <h3 className="mb-3 font-bold">Storage Access Period</h3>
          <div className="items-center ">
           {storageAccessPeriod}
          </div>
        </div>

        <div>
          <h3 className="mb-3 font-bold">Storage Access Type</h3>
          <div className="items-center ">
           {storageAccessType}
          </div>
        </div>

        <div className="  items-center">
          <p className="font-bold mb-3">Parking Permit</p>
       {parkingPermit}
        </div>

        <div>
          <h3 className="mb-3 font-bold">Parking Instructions</h3>
          <div className="items-center">
              {parkingInstruction}
           
          </div>
        </div>
      </div>
    </Accordion>
  );
};

export default Access;
