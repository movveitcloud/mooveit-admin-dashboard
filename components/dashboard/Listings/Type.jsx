import React from "react";

import Accordion from "../../shared/Accordion";

const Type = ({storageType,storageFloor,storageFeatures}) => {
  

  return (
    <Accordion title="type">
      <div className="space-y-4">
        <div className="flex justify-between">
        <div>
          <h3 className="mb-2 font-bold">Storage Type</h3>
          <div className="items-center  tracking-wide">
              {storageType}
            
          </div>
        </div>

        <div>
          <h3 className="mb-2 font-bold">Storage Floor</h3>
          <div className="items-center capitalize ">
              {storageFloor}
            
          </div>
        </div>
        </div>

        <div className="relative">
          <h3 className="mb-2 font-bold">Features</h3>
        
         <div className="items-center flex space-x-2">
          
         {storageFeatures!="N/A" ?
         storageFeatures?.map((val,index)=>
         <div key={index}>
              <p className="">{val.name}</p>
              </div>
              ) :"N/A"}
              </div>
        
        </div>
      </div>
    </Accordion>
  );
};

export default Type;
