import React from "react";
import Layout from "./Layout";

const Approved = () => {
  const approved = [
    {
      id: "01",
      Listing: "Shift Man Van LTD ",
      Location: "65-69 Lots Road, Chelsea, SW10 ...",
      WithMoving: "Yes",
      WithPacking: "No",
      Last: "Today",
    },
    {
      id: "02",
      Listing: "Shift Man Van LTD ",
      Location: "65-69 Lots Road, Chelsea, SW10 ...",
      WithMoving: "Yes",
      WithPacking: "No",
      Last: "Today",
    },
    {
      id: "03",
      Listing: "Shift Man Van LTD ",
      Location: "65-69 Lots Road, Chelsea, SW10 ...",
      WithMoving: "Yes",
      WithPacking: "No",
      Last: "Today",
    },
  ];
  return (
    <div>
      <Layout content={approved} name="approved" />
    </div>
  );
};

export default Approved;
