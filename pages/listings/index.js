import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronDownIcon, SearchIcon } from "@heroicons/react/outline";
import { PulseLoader } from "react-spinners";
import { motion } from "framer-motion";
import { clearFilteredListings, filterListings, getListings } from "../../redux/features/listings.slice";
import { DashboardLayout, DownloadCSV, ListingsLayout, Tabs } from "../../components";

const Listings = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { listings, filteredListings, listingLoading } = useSelector((state) => state.listing);
  const dispatch = useDispatch();

  const listingType = ({ status }) => filteredListings?.filter((listing) => listing.status === status);
  const approvedListings = listingType({ status: "approved" });
  const pendingListings = listingType({ status: "pending" });
  const disapprovedListings = listingType({ status: "disapproved" });

  const tabItems = [
    { name: "Approved", count: approvedListings.length },
    { name: "Pending", count: pendingListings.length },
    { name: "Disapproved", count: disapprovedListings.length },
  ];

  const listingCounts = [approvedListings.length, pendingListings.length, disapprovedListings.length];
  const listingStatus = ["approved", "pending", "disapproved"];

  const handleSearch = (e) => {
    const { value } = e.target;
    let result = [];
    result = listings?.filter((a) => a.address.toLowerCase().includes(value.toLowerCase()));
    if (value) {
      dispatch(filterListings(result));
    } else {
      dispatch(clearFilteredListings(listings));
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
  const listingData = [approvedListings, pendingListings, disapprovedListings];
  const csvFilename = ["MovveIt_Approved_Listings", "MovveIt_Pending_Listings", "MovveIt_Disapproved_Listings"];

  useEffect(() => {
    dispatch(getListings());
  }, []);

  return (
    <DashboardLayout>
      {listingLoading ? (
        <div className="relative">
          <div className="h-[500px] flex justify-center items-center">
            <PulseLoader loading={listingLoading} color="#EDCC5B" />
          </div>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabItems={tabItems} />

          <div className="bg-white p-8  shadow ">
            <div className="hidden md:flex justify-between mb-10 text-sm ">
              <div className="flex justify-start w-2/3 mr-4   ">
                {/* <div className="flex items-center  justify-start w-fit border  lg:mr-8 md:mr-2    rounded-md">
                  <div className="bg-accent-content border border-l-accent rounded-l-md border-r-none p-3 py-3 text-white whitespace-nowrap cursor-pointer  ">
                    View All
                  </div>
                  <div className="flex items-center border  justify-start p-3 py-3 cursor-pointer">
                    <p>Moving</p>
                    <ChevronDownIcon className="w-4 text-[#222222] ml-2" />
                  </div>
                  <div className="flex items-center justify-start  p-3 border  py-3 whitespace-nowrap cursor-pointer">
                    <p>Packing</p>
                    <ChevronDownIcon className="w-4 text-[#222222] font-normal ml-2" />
                  </div>
                  <div className="flex items-center justify-start  p-3 border  py-3 whitespace-nowrap cursor-pointer">
                    <p>Last Active</p>
                    <ChevronDownIcon className="w-4 text-[#222222] font-normal ml-2" />
                  </div>
                </div> */}
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

              <DownloadCSV data={listingData[activeTab]} headers={csvHeaders} filename={csvFilename[activeTab]} />
            </div>

            {/* mobile */}
            <div className="md:hidden mb-4  text-sm">
              {/* <div className="overflow-auto">
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
              </div> */}

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
                <DownloadCSV data={listingData[activeTab]} headers={csvHeaders} filename={csvFilename[activeTab]} />
              </div>
            </div>
            {/* end of mobile */}

            {listingCounts[activeTab] === 0 ? (
              <div className="font-bold text-xl text-center ">
                <div className="flex justify-center">
                  <div className="bg-white rounded-lg w-full md:w-[60%] flex justify-center mt-8">
                    <div className="px-4 py-24 flex flex-col space-y-4 items-center">
                      <img src="emptyStorage.svg" alt="empty storage icon" className="w-16 md:w-20" />
                      <p className="text-center text-[#AAAAAA] text-xl font-bold">{`No ${listingStatus[activeTab]} listing at this time.`}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <ListingsLayout listingStatus={listingStatus[activeTab]} />
            )}
          </div>
        </motion.div>
      )}
    </DashboardLayout>
  );
};
export default Listings;
