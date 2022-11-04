import React from "react";
import PendingLayout from "./PendingLayout";

const Pending = ({pendingCount}) => {
  return (
    <div>
     
      <PendingLayout name="pending" pendingCounts={pendingCount} />
    </div>
  );
};

export default Pending;
