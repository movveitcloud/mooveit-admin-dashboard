import React from "react";
import Layout from "./Layout";


const Approved = ({approvedCount}) => {
  return (
    <div>
      <Layout name="approved" approvedCounts={approvedCount} />
    </div>
  );
};

export default Approved;
