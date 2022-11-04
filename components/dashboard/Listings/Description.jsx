import React from "react";

import Accordion from "../../shared/Accordion";

const Description = ( {storageTitle,description}) => {
 
  return (
    <Accordion title="Description">
      <div className="space-y-6">
        <div>
          <h3 className="mb-3 font-bold">Storage Title</h3>
          <div className="items-center ">
           {storageTitle}
          </div>
        </div>
        <div>
          <h3 className="mb-3 font-bold">Brief Description</h3>
          <div className="items-center ">
          {description}
          </div>
        </div>
      </div>
    </Accordion>
  );
};

export default Description;
