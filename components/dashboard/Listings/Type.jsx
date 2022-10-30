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
            {/* <select
              name="storageType"
              value={formDetails.storageType}
              className="w-full bg-transparent h-full outline-none cursor-pointer"
              onChange={handleChange}>
              <option value="" disabled>
                Select storage type
              </option>
              {storageKinds.map(({ name, value }, i) => (
                <option value={value} key={i}>
                  {name}
                </option>
              ))}
            </select> */}
          </div>
        </div>

        <div>
          <h3 className="mb-3">Storage Floor</h3>
          <div className="items-center border border-[#959595] rounded-lg px-4 py-3">
              {storageFloor}
            {/* <select
              name="storageFloor"
              value={formDetails.storageFloor}
              className="w-full bg-transparent h-full outline-none cursor-pointer"
              onChange={handleChange}>
              <option value="" disabled>
                Select storage floor
              </option>
              {storageFloors.map(({ name, value }, i) => (
                <option value={value} key={i}>
                  {name}
                </option>
              ))}
            </select> */}
          </div>
        </div>

        <div className="relative">
          <h3 className="mb-3">Features</h3>
          
         <div className="items-center border border-[#959595] rounded-lg px-4 py-3">
         {storageFeatures.map((val)=>
              <p>{val}</p>
              )}
              </div>
        
          {/* <div className="items-center border border-[#959595] rounded-lg px-4 py-3"> */}
          {/* <Select
            value={storageFeatures.filter((item) => formDetails.storageFeatures.includes(item.value))}
            onChange={(value) => handleUpdate(value)}
            options={storageFeatures}
            isMulti
            menuPosition="fixed"
            className="text-black"
            placeholder="Select storage features"
          /> */}
          {/* </div> */}
        </div>
      </div>
    </Accordion>
  );
};

export default Type;
