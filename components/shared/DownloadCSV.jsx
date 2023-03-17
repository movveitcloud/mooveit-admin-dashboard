import { DownloadIcon } from "@heroicons/react/outline";
import { CSVLink } from "react-csv";

const DownloadCSV = ({ data, headers, filename }) => {
  return (
    <CSVLink data={data} headers={headers} filename={filename}>
      <div className="border btn-outline hover:bg-primary font-normal normal-case text-[#616161] hover:text-white lg:px-4 px-2 py-3 bg-white whitespace-nowrap rounded-md text-sm flex gap-2 items-center cursor-pointer">
        <DownloadIcon className="w-4 hidden xl:block" />
        Download CSV
      </div>
    </CSVLink>
  );
};

export default DownloadCSV;
