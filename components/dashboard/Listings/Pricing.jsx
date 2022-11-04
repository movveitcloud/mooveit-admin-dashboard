import React from "react";

import Accordion from "../../shared/Accordion";

const Pricing = ({ hourlyRate, monthlyRate }) => {
  return (
    <Accordion title="Pricing">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 gap-y-4">
        <div>
          <div className=" justify-between items-center gap-3">
            <h2 className="font-bold ">Hourly Rate</h2>
            {hourlyRate}
          </div>
        </div>

        <div>
          <div className="justify-between items-center gap-3">
            <h2 className="font-bold ">Monthly Rate</h2>
            {monthlyRate}
          </div>
        </div>
      </div>
    </Accordion>
  );
};

export default Pricing;
