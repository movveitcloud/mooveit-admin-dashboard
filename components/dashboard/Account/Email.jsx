import React from "react";

import Accordion from "../../shared/Accordion";

const Email = ({ Email }) => {
  return (
    <Accordion title="email">
      <div className="flex flex-row flex-grow gap-2  items-center  ">
        <p>{Email}</p>
      </div>
    </Accordion>
  );
};

export default Email;
