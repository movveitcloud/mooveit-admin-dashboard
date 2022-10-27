import React from "react";

const HeadLayout = ({ children }) => {
  return (
    <div>
      {" "}
      <div className="hidden md:flex justify-between mb-10 text-sm ">
        <div className="flex justify-start xl:w-2/3 mr-4   ">
          {children}
          {/* <div className="flex items-center  justify-start w-fit border border-[#DCDCFF] lg:mr-8 md:mr-2    rounded-md">
        <div className="bg-[#4543A5] border border-l-[#DCDCFF] rounded-l-md border-r-none p-3 py-3 text-white whitespace-nowrap cursor-pointer  ">
          View All
        </div>
        <div className="flex items-center border border-r-[#DCDCFF] justify-start p-3 py-3 cursor-pointer">
          <p>Moving</p>
          <ChevronDownIcon className="w-4 text-[#222222] ml-2" />
        </div>
        <div className="flex items-center justify-start  p-3 border border-r-[#DCDCFF] py-3 whitespace-nowrap cursor-pointer">
          <p>Packing</p>
          <ChevronDownIcon className="w-4 text-[#222222] font-normal ml-2" />
        </div>
        <div className="flex items-center justify-start  p-3 border border-r-[#DCDCFF]  py-3 whitespace-nowrap cursor-pointer">
          <p>Last Active</p>
          <ChevronDownIcon className="w-4 text-[#222222] font-normal ml-2" />
        </div>
      </div> */}
          <div className="flex w-1/2   space-x-2  items-center border border-[#DCDCFF] bg-white rounded-md p-3 py-3">
            <SearchIcon className="text-primary w-5 md:w-6 mr-1" />
            <input
              type="text"
              value={value}
              onChange={Search}
              placeholder="Search..."
              className="w-full h-full  outline-none text-base placeholder:text-[#959595] placeholder:text-[8px] md:placeholder:text-base"
            />
          </div>
        </div>

        <div className="border border-[#DCDCFF] p-2 py-3 bg-white whitespace-nowrap rounded-md text-sm  flex items-center cursor-pointer">
          <DownloadIcon className="w-4 mr-2 text-[#222222]  " />
          Download CSV
        </div>
      </div>
    </div>
  );
};

export default HeadLayout;
