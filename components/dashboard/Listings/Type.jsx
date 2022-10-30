import React from "react";

import Accordion from "../../shared/Accordion";

const Type = ({storageType,storageFloor,storageFeatures}) => {
  
  

  return (
    <Accordion title="type">
      <div className="space-y-6">
        <div>
          <h3 className="mb-3">Storage Type</h3>
          <div className="items-center border border-[#959595] rounded-lg px-4 py-3">
              {storageType}
            
          </div>
        </div>

        <div>
          <h3 className="mb-3">Storage Floor</h3>
          <div className="items-center border border-[#959595] rounded-lg px-4 py-3">
              {storageFloor}
            
          </div>
        </div>

        <div className="relative">
          <h3 className="mb-3">Features</h3>
          
         <div className="items-center border border-[#959595] rounded-lg px-4 py-3">
         {storageFeatures?.map((val)=>
              <p>{val}</p>
              )}
              </div>
        
        </div>
      </div>
    </Accordion>
  );
};

export default Type;
