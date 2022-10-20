import React from "react";
import Layout from "./Layout";
import PendingLayout from "./PendingLayout";

const Pending = () => {
  const pending = [
    {
      id: "01",
      Listing: "Shift Man Van LTD ",
      Location: "65-69 Lots Road, Chelsea, SW10 ...",
      WithMoving: "Yes",
      WithPacking: "No",
      Approved: "Approved",
      Deny: "Deny",
    },
    {
      id: "02",
      Listing: "Shift Man Van LTD ",
      Location: "65-69 Lots Road, Chelsea, SW10 ...",
      WithMoving: "Yes",
      WithPacking: "No",
      Approved: "Approved",
      Deny: "Deny",
    },
    {
      id: "03",
      Listing: "Shift Man Van LTD ",
      Location: "65-69 Lots Road, Chelsea, SW10 ...",
      WithMoving: "Yes",
      WithPacking: "No",
      Approved: "Approved",
      Deny: "Deny",
    },
  ];
  return (
    <div>
      {/* <Layout content={pending} name="pending" /> */}
      <PendingLayout content={pending} name="pending" />
    </div>
  );
};

export default Pending;
