import { useSelector } from "react-redux";

const BanksLayout = ({}) => {
  const { banks } = useSelector((state) => state.banks);

  return (
    <>
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

        <DownloadCSV data={listingData[activeTab]} headers={headers} filename={filename[activeTab]} />
      </div> */}
      {/* mobile */}
      {/* <div className="md:hidden mb-4  text-sm">
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
          <DownloadCSV data={listingData[activeTab]} headers={headers} filename={filename[activeTab]} />
        </div>
      </div> */}
      {/* end of mobile */}
      <div className="overflow-auto rounded-lg">
        <table className="w-full p-4 mb-8">
          <thead className="bg-white  border  rounded-md p-6 ">
            <tr className="p-4 ">
              <th className="items-center ml-6 py-4 text-start w-[20%] px-4">Bank Name</th>
            </tr>
          </thead>

          <tbody className="w-full">
            {banks?.map(({ _id, name }, index) => (
              <tr key={_id} className="capitalize border  text-[#666666]">
                <td className=" w-[20%]  p-4 ">
                  <div className="flex justify-start items-center">
                    <p className=" text-sm">{name}</p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BanksLayout;
