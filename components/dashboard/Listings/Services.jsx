import React from "react";

import Accordion from "../../shared/Accordion";


const Services = ({delivery,parking}) => {
  

  return (
    <Accordion title="services">
      <div className="space-y-5">
        <h3 className=" font-bold">Delivery services</h3>
        <div className="flex gap-5 items-center">
        {`${delivery === false ? "False" : "True"}`}
        </div>
        <h3 className=" font-bold">Parking services</h3>
        <div className="flex gap-5 items-center">
        {`${parking === false ? "False" : "True"}`}
        </div>
      </div>
    </Accordion>
  );
};

export default Services;