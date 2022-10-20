import React from "react";
import Layout from "./Layout";

const Users = () => {
  const users = [
    {
      id: "01",
      User: "Khadijah Onanuga Adebola Ade ",
      Email: "ppppppppppp@gmail.com",
      Phone: "08066719237",
      Status: "Verified",
      Last: "Today",
    },
    {
      id: "02",
      User: "Khadijah Onanuga",
      Email: "ppp@gmail.com",
      Phone: "08066719237",
      Status: "Unverified",
      Last: "Today",
    },
    {
      id: "03",
      User: "Khadijah Onanuga",
      Email: "ppp@gmail.com",
      Phone: "08066719237",
      Status: "Verified",
      Last: "Today",
    },
  ];
  return (
    <div>
      <Layout content={users} name="users" />
    </div>
  );
};

export default Users;
