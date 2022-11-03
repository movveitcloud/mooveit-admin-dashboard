import React from "react";

import Accordion from "../../shared/Accordion";

const Type = ({storageType,storageFloor,storageFeatures}) => {
  
  console.log(storageFeatures)

  return (
    <Accordion title="type">
      <div className="space-y-4">
        <div>
          <h3 className="mb-2">Storage Type</h3>
          <div className="items-center  tracking-wide">
              {storageType}
            
          </div>
        </div>

        <div>
          <h3 className="mb-2">Storage Floor</h3>
          <div className="items-center capitalize ">
              {storageFloor}
            
          </div>
        </div>

        <div className="relative">
          <h3 className="mb-2">Features</h3>
        
         <div className="items-center ">
          
         {storageFeatures!="N/A" &&
         storageFeatures?.map((val,index)=>
         <div key={index}>
              <p className="">{val.name}</p>
              </div>
              )}
              </div>
        
        </div>
      </div>
    </Accordion>
  );
};

export default Type;
