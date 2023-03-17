// import React from "react";
// import { ApprovedBooking, DashboardLayout, Resolved } from "../../components";
// import { useState } from "react";
// import { Users, Partners } from "../../components";
// import { ChevronDownIcon, SearchIcon, DownloadIcon } from "@heroicons/react/outline";
// const Bookings = () => {
//   const [activeButton, setActiveButton] = useState("approved");
//   const [value, setValue] = useState("");

//   const Search = (e) => {};

//   return (
//     <DashboardLayout>
//       <div className="flex space-x-5 mb-4">
//         <button
//           onClick={() => setActiveButton("approved")}
//           className={`${
//             activeButton === "approved" ? "bg-accent-focus text-[#12181F]" : "bg-[#EEEEEE] text-[#BBBBBB] "
//           }  py-2 px-4 rounded-md  flex items-center align-middle justify-center text-sm md:text-base `}>
//           Approved
//           <div
//             className={` ${
//               activeButton === "approved" ? "bg-[#12181F]" : "bg-[#BBBBBB]"
//             } ml-2 text-white md:text-[10px] text-[10px] rounded-sm p-2 h-4 flex align-middle items-center`}>
//             32.8k
//           </div>
//         </button>

//         <button
//           onClick={() => setActiveButton("pending")}
//           className={`${
//             activeButton === "pending" ? " bg-accent-focus text-[#12181F]" : "bg-[#EEEEEE] text-[#BBBBBB]"
//           }  py-2 px-4 rounded-md  flex items-center align-middle justify-center text-sm md:text-base`}>
//           Pending
//           <div
//             className={` ${
//               activeButton === "pending" ? "bg-accent-content" : "bg-[#BBBBBB]"
//             } ml-2 text-white  text-[10px] rounded-sm  p-2  h-4 flex align-middle items-center`}>
//             16.8k
//           </div>
//         </button>
//       </div>

//       <div className="bg-white p-8 shadow ">
//         <div className="hidden md:flex justify-between mb-10 text-sm ">
//           <div className="flex justify-start xl:w-2/3 mr-4   ">
//             <div className="flex items-center  justify-start w-fit border  lg:mr-8 md:mr-2    rounded-md">
//               <div className="bg-accent-content border  rounded-l-md border-r-none p-3 py-3 text-white whitespace-nowrap cursor-pointer  ">
//                 View All
//               </div>
//               <div className="flex items-center border  justify-start p-3 py-3 cursor-pointer">
//                 <p>Moving</p>
//                 <ChevronDownIcon className="w-4 text-[#222222] ml-2" />
//               </div>
//               <div className="flex items-center border  justify-start p-3 py-3 cursor-pointer">
//                 <p>Packing</p>
//                 <ChevronDownIcon className="w-4 text-[#222222] ml-2" />
//               </div>
//             </div>
//             <div className="flex w-1/2   space-x-2  items-center border  bg-white rounded-md p-3 py-3">
//               <SearchIcon className="text-accent-content w-5 md:w-6 mr-1" />
//               <input
//                 type="text"
//                 value={value}
//                 onChange={Search}
//                 placeholder="Search..."
//                 className="w-full h-full  outline-none text-base placeholder:text-[#959595] placeholder:text-[8px] md:placeholder:text-base"
//               />
//             </div>
//           </div>

//           <div className="border  p-2 py-3 bg-white whitespace-nowrap rounded-md text-sm  flex items-center">
//             <DownloadIcon className="w-4 mr-2 text-[#222222] m-0 " />
//             Download CSV
//           </div>
//         </div>

//         {/* mobile */}
//         <div className="md:hidden mb-4 text-sm">
//           <div className="flex items-center  justify-start w-full border  lg:mr-8 md:mr-2 text-center    rounded-md">
//             <div className="bg-accent-content border border-l-info rounded-l-md border-r-none p-2 text-white whitespace-nowrap cursor-pointer w-1/3 text-center font-normal">
//               View All
//             </div>
//             <div className="flex items-center justify-center border   p-2 cursor-pointer w-1/3 text-center">
//               <p>Status</p>
//               <ChevronDownIcon className="w-4 text-[#222222] ml-2" />
//             </div>
//             <div className="flex items-center justify-center  p-2 border  whitespace-nowrap cursor-pointer w-1/3 text-center ">
//               <p>Last Active</p>
//               <ChevronDownIcon className="w-4 text-[#222222] ml-2" />
//             </div>
//           </div>

//           <div className="flex mt-4 space-x-2 justify-between items-center  ">
//             <div className="flex w-2/3  space-x-2  items-center border  bg-white rounded-md p-2">
//               <SearchIcon className="text-accent-content w-5 md:w-6 mr-1" />
//               <input
//                 type="text"
//                 value={value}
//                 onChange={Search}
//                 placeholder="Search..."
//                 className="w-full h-full  outline-none text-base placeholder:text-[#959595] placeholder:text-base"
//               />
//             </div>
//             <div className="border   p-2 bg-white whitespace-nowrap rounded-md   flex items-center">
//               <DownloadIcon className="w-6 text-[#222222] m-0 " />
//               Download CSV
//             </div>
//           </div>
//         </div>
//         {/* end of mobile */}

//         {activeButton === "approved" ? <ApprovedBooking /> : <ApprovedBooking />}
//       </div>
//     </DashboardLayout>
//   );
// };
// export default Bookings;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronDownIcon, SearchIcon } from "@heroicons/react/outline";
import { PulseLoader } from "react-spinners";
import { motion } from "framer-motion";
import { clearFilteredBookings, filterBookings, getListings } from "../../redux/features/bookings.slice";
import { DashboardLayout, DownloadCSV, BookingsLayout, Tabs } from "../../components";
import { getBooking, getSingleBooking, approveBooking } from "../../redux/features/bookings.slice";

const Bookings = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { listings, filteredListings, listingLoading } = useSelector((state) => state.listing);
  const dispatch = useDispatch();

  const { bookings, bookingLoading, singleBooking, singleBookingLoading, approveBookingLoading } = useSelector(
    (state) => state.bookings
  );

  // const bookingType = ({ status }) => filteredListings?.filter((booking) => booking.status === status);
  const bookingType = ({ status }) => bookings?.filter((booking) => booking.approvalStatus === status);
  const activeBookings = bookings?.filter(
    (booking) => booking?.approvalStatus == "approved" && booking?.paymentStatus == "successful"
  );

  const approvedBookings = bookings?.filter(
    (booking) => booking?.approvalStatus == "approved" && booking?.paymentStatus == null
  );

  const pendingBookings = bookingType({ status: "pending" });
  const disapprovedBookings = bookingType({ status: "disapproved" });

  const tabItems = [
    { name: "Active", count: activeBookings.length },
    { name: "Approved", count: approvedBookings.length },
    { name: "Pending", count: pendingBookings.length },
    { name: "Disapproved", count: disapprovedBookings.length },
  ];

  const bookingCounts = [
    activeBookings.length,
    approvedBookings.length,
    pendingBookings.length,
    disapprovedBookings.length,
  ];
  const bookingStatus = ["active", "approved", "pending", "disapproved"];

  // const handleSearch = (e) => {
  //   const { value } = e.target;
  //   let result = [];
  //   result = listings?.filter((a) => a.address.toLowerCase().includes(value.toLowerCase()));
  //   if (value) {
  //     dispatch(filterListings(result));
  //   } else {
  //     dispatch(clearFilteredListings(listings));
  //   }
  // };
  const handleSearch = (e) => {
    const { value } = e.target;
    let result = [];
    result = bookings?.filter((a) => a.storageListing.address.toLowerCase().includes(value.toLowerCase()));
    if (value) {
      dispatch(filterBookings(result));
    } else {
      dispatch(clearFilteredBookings(bookings));
    }
  };

  //Export to CSV
  const csvHeaders = [
    { label: "First Name", key: "user.firstName" },
    { label: "Last Name", key: "user.lastName" },
    { label: "Title", key: "storageTitle" },
    { label: "Location", key: "address" },
    { label: "Price/month (£)", key: "monthlyRate" },
    { label: "Price/hour (£)", key: "hourlyRate" },
    { label: "Status", key: "status" },
  ];
  const bookingData = [activeBookings, approvedBookings, pendingBookings, disapprovedBookings];
  const csvFilename = [
    "MovveIt_Active_Bookings",
    "MovveIt_Approved_Bookings",
    "MovveIt_Pending_Bookings",
    "MovveIt_Disapproved_Bookings",
  ];

  useEffect(() => {
    dispatch(getBooking());
  }, []);

  return (
    <DashboardLayout>
      {bookingLoading ? (
        <div className="relative">
          <div className="h-[500px] flex justify-center items-center">
            <PulseLoader loading={bookingLoading} color="#EDCC5B" />
          </div>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabItems={tabItems} />

          <div className="bg-white p-8  shadow ">
            {/* <div className="hidden md:flex justify-between mb-10 text-sm ">
              <div className="flex justify-start w-2/3 mr-4   ">
                
                <div className="flex w-full   space-x-2  items-center border bg-white rounded-md p-3 py-3">
                  <SearchIcon className="text-accent-content w-5 md:w-6 mr-1" />
                  <input
                    type="search"
                    onChange={handleSearch}
                    placeholder="Search by location..."
                    className="w-full h-full  outline-none text-base placeholder:text-[#959595] placeholder:text-[8px] md:placeholder:text-base"
                  />
                </div>
              </div>

              <DownloadCSV data={bookingData[activeTab]} headers={csvHeaders} filename={csvFilename[activeTab]} />
            </div> */}

            {/* mobile */}
            {/* <div className="md:hidden mb-4  text-sm">
              <div className="overflow-auto">
                <div className="flex items-center  justify-start w-fit border  lg:mr-8 md:mr-2 text-center    rounded-md">
                  <div className="bg-accent-content border  rounded-l-md border-r-none p-2 text-white whitespace-nowrap cursor-pointer w-fit text-center font-normal">
                    View All
                  </div>
                  <div className="flex items-center justify-center border   p-2 cursor-pointer w-fit text-center">
                    <p>Moving</p>
                    <ChevronDownIcon className="w-4 text-[#222222] ml-2" />
                  </div>
                  <div className="flex items-center justify-center border   p-2 cursor-pointer w-fit text-center">
                    <p>Packing</p>
                    <ChevronDownIcon className="w-4 text-[#222222] ml-2" />
                  </div>
                  <div className="flex items-center justify-center  p-2 border  whitespace-nowrap cursor-pointer  text-center ">
                    <p>Last Active</p>
                    <ChevronDownIcon className="w-4 text-[#222222] ml-2" />
                  </div>
                </div>
              </div>

              <div className="flex mt-4 space-x-2 justify-between items-center  ">
                <div className="flex w-2/3  space-x-2  items-center border  bg-white rounded-md p-2">
                  <SearchIcon className="text-accent-content w-5 md:w-6 mr-1" />
                  <input
                    type="search"
                    onChange={handleSearch}
                    placeholder="Search by location..."
                    className="w-full h-full  outline-none text-base placeholder:text-[#959595] placeholder:text-base"
                  />
                </div>
                <DownloadCSV data={bookingData[activeTab]} headers={csvHeaders} filename={csvFilename[activeTab]} />
              </div>
            </div> */}
            {/* end of mobile */}

            {bookingCounts[activeTab] === 0 ? (
              <div className="font-bold text-xl text-center ">
                <div className="flex justify-center">
                  <div className="bg-white rounded-lg w-full md:w-[60%] flex justify-center mt-8">
                    <div className="px-4 py-24 flex flex-col space-y-4 items-center">
                      <img src="emptyStorage.svg" alt="empty storage icon" className="w-16 md:w-20" />
                      <p className="text-center text-[#AAAAAA] text-xl font-bold">{`No ${bookingStatus[activeTab]} booking at this time.`}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <BookingsLayout
                bookingStatus={bookingStatus[activeTab]}
                handleSearch={handleSearch}
                bookingData={bookingData}
                headers={csvHeaders}
                filename={csvFilename}
                activeTab={activeTab}
              />
              // <BookingsLayout bookingStatus={bookingStatus[activeTab]} />
            )}
          </div>
        </motion.div>
      )}
    </DashboardLayout>
  );
};
export default Bookings;
