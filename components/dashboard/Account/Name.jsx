import React from "react";

import Accordion from "../../shared/Accordion";

const Name = ({ firstName, lastName }) => {
  return (
    <Accordion title="name">
      <div className="flex flex-row flex-grow gap-2  items-center  ">
        <p>
          {firstName} {lastName}
        </p>
      </div>
    </Accordion>
  );
};

export default Name;
