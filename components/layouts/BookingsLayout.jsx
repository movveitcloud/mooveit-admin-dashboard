import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { ChevronDownIcon, SearchIcon } from "@heroicons/react/outline";
import { DashboardLayout, DownloadCSV, Tabs } from "../../components";

const BookingsLayout = ({ bookingStatus, handleSearch, bookingData, headers, activeTab, filename }) => {
  const { bookings, filteredBookings } = useSelector((state) => state.bookings);
  const router = useRouter();
  console.log(bookings);

  const view = (_id) => router.push(`/bookings/${_id}`);

  return (
    <>
      <div className="hidden md:flex justify-between mb-10 text-sm ">
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

        <DownloadCSV data={bookingData[activeTab]} headers={headers} filename={filename[activeTab]} />
      </div>
      {/* mobile */}
      <div className="md:hidden mb-4  text-sm">
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
          <DownloadCSV data={bookingData[activeTab]} headers={headers} filename={filename[activeTab]} />
        </div>
      </div>
      {/* end of mobile */}
      <div className="overflow-auto rounded-lg">
        <table className="w-full p-4 mb-8">
          <thead className="bg-white  border  rounded-md p-6 ">
            <tr className="p-4 ">
              <th className="items-center ml-6 my-4 text-start w-[20%] px-4">Title</th>
              <th className="w-[20%]  text-start p-4">Location</th>
              <th className="w-[15%] whitespace-nowrap text-start p-4">Partner</th>
              <th className="w-[10%] whitespace-nowrap text-start p-4">User</th>
              <th className="w-[10%] whitespace-nowrap text-start p-4">Rate</th>
            </tr>
          </thead>

          <tbody className="w-full">
            {filteredBookings?.map(
              (
                {
                  _id,
                  paymentStatus,
                  type,
                  approvalStatus,
                  partner,
                  price,
                  storageListing,
                  user,
                  monthlyRate,
                  hourlyRate,
                },
                index
              ) =>
                paymentStatus === "successful" && bookingStatus === "active" ? (
                  <tr
                    key={index}
                    className="capitalize cursor-pointer border  text-[#666666]"
                    onClick={() => view(_id)}>
                    <td className=" w-[20%]  p-4 ">
                      <div className="flex justify-start items-center">
                        <p className=" text-sm">{storageListing?.storageTitle}</p>
                      </div>
                    </td>
                    <td className="w-[20%] p-4 text-sm">{storageListing?.address}</td>
                    <td className="w-[10%] p-4 text-sm ">
                      {partner !== null ? `${partner?.firstName} ${partner?.lastName}` : "-"}
                    </td>
                    <td className="w-[10%] p-4 text-sm ">
                      {user !== null ? `${user?.firstName} ${user?.lastName}` : "-"}
                    </td>
                    <td className=" w-[20%]  p-4 ">
                      <div className="flex justify-start items-center">
                        <p className=" text-sm">{type}</p>
                      </div>
                    </td>
                  </tr>
                ) : (paymentStatus === null || paymentStatus === "error") && bookingStatus === approvalStatus ? (
                  <tr
                    key={index}
                    className="capitalize cursor-pointer border  text-[#666666]"
                    onClick={() => view(_id)}>
                    <td className=" w-[20%]  p-4 ">
                      <div className="flex justify-start items-center">
                        <p className=" text-sm">{storageListing?.storageTitle}</p>
                      </div>
                    </td>
                    <td className="w-[20%] p-4 text-sm">{storageListing?.address}</td>
                    <td className="w-[10%] p-4 text-sm ">
                      {partner !== null ? `${partner?.firstName} ${partner?.lastName}` : "-"}
                    </td>
                    <td className="w-[10%] p-4 text-sm ">
                      {user !== null ? `${user?.firstName} ${user?.lastName}` : "-"}
                    </td>
                    <td className=" w-[20%]  p-4 ">
                      <div className="flex justify-start items-center">
                        <p className=" text-sm">{type}</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  ""
                )
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BookingsLayout;
