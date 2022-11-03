
import React from "react";

import Accordion from "../../shared/Accordion";

const Media = ({images}) => {
  

  return (
    <Accordion title="image">
      <div className=" grid gap-4 grid-cols-3 items-center  ">
   
       {images?.map((val,index)=>
    (
      
      <div key={index} className=" ">
        <div className=" w-full  h-[200px]">
  
       <img src={val} alt="Storage Image" className="w-full h-full"/>
     
       </div>
       </div>))
       
       }
       
      </div>
    
    
    </Accordion>
  );
};

export default Media;