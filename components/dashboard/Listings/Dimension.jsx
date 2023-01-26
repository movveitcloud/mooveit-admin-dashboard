import React from "react";

// import { storageSize } from "../../helpers/data";
import Accordion from "../../shared/Accordion";

const Dimensions = ({ storageSize }) => {
  //   const handleCount = (type) => {
  //     if (type === "increase") {
  //       setFormDetails({ ...formDetails, storageNumber: storageNumber + 1 });
  //     }
  //     if (type === "reduce" && storageNumber > 1) {
  //       setFormDetails({ ...formDetails, storageNumber: storageNumber - 1 });
  //     }
  //   };
  console.log(storageSize);

  return (
    <Accordion title="Dimensions">
      <div className="space-y-6">
        <div className="mb-5">
          <div className="items-center">{storageSize}</div>
        </div>

        <div className="flex justify-between">
          {/* <h3 className="my-3">How many storage spaces of this size & type do you have?</h3> */}
        </div>
      </div>
    </Accordion>
  );
};

export default Dimensions;
