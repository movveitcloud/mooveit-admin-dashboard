import React from "react";

import Accordion from "../../shared/Accordion";

const Address = ({ Address }) => {
  return (
    <Accordion title="address">
      <div className="flex flex-row flex-grow gap-2  items-center  ">
        <p>{Address}</p>
      </div>
    </Accordion>
  );
};

export default Address;
