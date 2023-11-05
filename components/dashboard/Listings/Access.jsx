import React, { useContext } from "react";
import Accordion from "../../shared/Accordion";

const Access = ({ storageAccessPeriod, storageAccessType, parkingInstruction, parkingPermit }) => {
  console.log(parkingPermit);
  return (
    <Accordion title="access">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 gap-y-4">
        <div>
          <h3 className="font-bold">Storage Access Period</h3>
          <div className="items-center ">{storageAccessPeriod}</div>
        </div>

        <div>
          <h3 className="font-bold">Storage Access Type</h3>
          <div className="items-center ">{storageAccessType}</div>
        </div>

        <div className="items-center">
          <p className="font-bold">Parking Permit</p>
          {parkingPermit}
        </div>

        <div>
          <h3 className="font-bold">Parking Instructions</h3>
          <div className="items-center">{parkingInstruction}</div>
        </div>
      </div>
    </Accordion>
  );
};

export default Access;
