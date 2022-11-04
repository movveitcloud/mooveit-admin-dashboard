import React from "react";

import Accordion from "../../shared/Accordion";

const Media = ({ images }) => {
  return (
    <Accordion title="media">
      <div className=" grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center  ">
        {images?.map((val, index) => (
          <div key={index} className="w-full h-[200px]">
            <img src={val} alt="Storage Image" className="object-cover w-full h-full rounded-md" />
          </div>
        ))}
      </div>
    </Accordion>
  );
};

export default Media;
