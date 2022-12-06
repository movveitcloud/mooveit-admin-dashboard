import { DownloadIcon } from "@heroicons/react/outline";
import { CSVLink } from "react-csv";

const DownloadCSV = ({ data, headers, filename }) => {
  return (
    <CSVLink data={data} headers={headers} filename={filename}>
      <div className="btn btn-outline hover:bg-primary font-normal normal-case text-[#616161] hover:text-white lg:px-4 py-3 bg-white whitespace-nowrap rounded-md text-sm flex gap-2 items-center cursor-pointer">
        <DownloadIcon className="w-4 hidden lg:block" />
        Download CSV
      </div>
    </CSVLink>
  );
};

export default DownloadCSV;
