
import React from "react";

import Accordion from "../../shared/Accordion";

const Media = ({image}) => {
  

  return (
    <Accordion title="image">
      <div className="flex flex-row flex-grow gap-4 items-center border border-[#959595] rounded-lg px-4 py-3">
      
       {image?.map((val,index)=>
  <div key={index}>
       <img src={val} alt="Storage Image"/>
       </div>
       
       )}
       
      </div>
     
    
    </Accordion>
  );
};

export default Media;