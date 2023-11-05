import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const PaymentLayout = ({ listingStatus }) => {
  const { listings, filteredListings } = useSelector((state) => state.listing);
  const router = useRouter();

  const view = (_id) => router.push(`/listings/${_id}`);

  return (
    <div className="overflow-auto rounded-lg">
      <table className="w-full p-4 mb-8">
        <thead className="bg-white  border  rounded-md p-6 ">
          <tr className="p-4 ">
            <th className="items-center ml-6 my-4 text-start w-[20%] px-4">Listing</th>
            <th className="w-[20%]  text-start p-4">User</th>
            <th className="w-[15%] whitespace-nowrap text-start p-4">Amount</th>
            <th className="w-[10%] whitespace-nowrap text-start p-4">Date</th>
          </tr>
        </thead>

        <tbody className="w-full">
          {filteredListings?.map(
            ({ _id, status, address, storageTitle, parking, delivery, user, monthlyRate, hourlyRate }, index) =>
              listingStatus == status && (
                <tr key={index} className="capitalize cursor-pointer border  text-[#666666]" onClick={() => view(_id)}>
                  <td className=" w-[20%]  p-4 ">
                    <div className="flex justify-start items-center">
                      <p className=" text-sm">{storageTitle}</p>
                    </div>
                  </td>
                  <td className="w-[20%] p-4 text-sm">{address}</td>
                  <td className="w-[10%] p-4 text-sm ">
                    {user !== null ? `${user?.firstName} ${user?.lastName}` : "-"}
                  </td>
                  <td className="w-[10%] p-4 text-sm">
                    <div className="flex flex-row space-x-2 items-center mt-2 font-normal text-sm">
                      {monthlyRate ? (
                        <p className="flex">
                          {`$${monthlyRate}`} <span className="lowercase">/month</span>
                        </p>
                      ) : (
                        ""
                      )}
                      {hourlyRate ? (
                        <p className="flex">
                          {`$${hourlyRate}`} <span className="lowercase">/hour</span>
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentLayout;
