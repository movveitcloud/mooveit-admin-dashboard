import React from "react";
import Layout from "./Layout";
import PendingLayout from "./PendingLayout";

const Pending = () => {
  return (
    <div>
      {/* <Layout content={pending} name="pending" /> */}
      <PendingLayout name="pending" />
    </div>
  );
};

export default Pending;
