import React, { useContext } from "react";
import Accordion from "../../shared/Accordion";


const Access = ({storageAccessPeriod,storageAccessType,parkingInstruction,parkingPermit}) => {
  
  return (
    <Accordion title="access">
      <div className="space-y-6">
        <div>
          <h3 className="mb-3">Storage Access Period</h3>
          <div className="items-center ">
           {storageAccessPeriod}
          </div>
        </div>

        <div>
          <h3 className="mb-3">Storage Access Type</h3>
          <div className="items-center ">
           {storageAccessType}
          </div>
        </div>

        <div className="  items-center">
          <p className="">Parking Permit</p>
       {parkingPermit}
        </div>

        <div>
          <h3 className="mb-3">Parking Instructions</h3>
          <div className="items-center">
              {parkingInstruction}
           
          </div>
        </div>
      </div>
    </Accordion>
  );
};

export default Access;
