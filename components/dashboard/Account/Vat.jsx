import React from "react";

import Accordion from "../../shared/Accordion";

const Address = ({ Vat }) => {
  return (
    <Accordion title="vat registered">
      <div className="flex flex-row flex-grow gap-2  items-center  ">
        <p>{Vat === true ? "Yes" : "No"}</p>
      </div>
    </Accordion>
  );
};

export default Address;
