import React from "react";

import Accordion from "../../shared/Accordion";

const Description = ( {storageTitle,description}) => {
 
  return (
    <Accordion title="Description">
      <div className="space-y-6">
        <div>
          <h3 className="mb-3">Storage Title</h3>
          <div className="items-center border border-[#959595] rounded-lg px-4 py-3">
           {storageTitle}
          </div>
        </div>
        <div>
          <h3 className="mb-3">Brief Description</h3>
          <div className="items-center border border-[#959595] rounded-lg px-4 py-3">
          {description}
          </div>
        </div>
      </div>
    </Accordion>
  );
};

export default Description;
