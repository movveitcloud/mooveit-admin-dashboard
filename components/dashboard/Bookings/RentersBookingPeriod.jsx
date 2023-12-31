import { CalendarIcon } from "@heroicons/react/outline";
import React from "react";

import Accordion from "../../shared/Accordion";

const RentersBookingPeriod = ({ startPeriod, endPeriod }) => {
  return (
    <Accordion title="Booking Period">
      <div className=" mb-6 flex   items-center  justify-between rounded-lg border-l-4 border-accent bg-[#F9F9F9] px-2  py-4 text-sm md:w-[100%] md:px-6">
        <div className="flex  w-full  items-center justify-start  ">
          <span className="flex h-10 w-10 items-center  justify-center rounded-full ">
            <div className="mr-2 flex h-8 w-8  items-center justify-center rounded-full bg-white ">
              {<CalendarIcon className="w-4" />}
            </div>
          </span>
          <p className=" mr-2 text-[12px] uppercase md:text-[14px]">
            {startPeriod} - {endPeriod}
          </p>
        </div>
      </div>
    </Accordion>
  );
};

export default RentersBookingPeriod;
