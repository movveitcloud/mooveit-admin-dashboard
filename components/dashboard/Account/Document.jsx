import React from "react";

import Accordion from "../../shared/Accordion";

const Document = () => {
  return (
    <Accordion title="document">
      <div className="flex flex-row flex-grow gap-2  items-center  ">
        <p>
          <img src="/drivers-license.png" alt="Verification Document" />
        </p>
      </div>
    </Accordion>
  );
};

export default Document;
