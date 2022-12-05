import { DownloadIcon } from "@heroicons/react/outline";
import { useSelector } from "react-redux";
import { CSVLink } from "react-csv";

const DownloadCSV = ({ activeTab }) => {
  const { users } = useSelector((state) => state.user);
  const customers = users?.filter(({ role }) => role === "customer");
  const partners = users?.filter(({ role }) => role === "partner");

  const headers = [
    { label: "First Name", key: "firstName" },
    { label: "Last Name", key: "lastName" },
    { label: "Email", key: "email" },
    { label: "Verified", key: "isVerified" },
  ];

  return (
    <CSVLink
      data={activeTab === 0 ? customers : partners}
      headers={headers}
      filename={activeTab === 0 ? "MovveIt_Customers.csv" : "MovveIt_Partners.csv"}>
      <div className="btn btn-outline hover:bg-primary font-normal normal-case text-[#616161] hover:text-white lg:px-4 py-3 bg-white whitespace-nowrap rounded-md text-sm flex gap-2 items-center cursor-pointer">
        <DownloadIcon className="w-4 hidden lg:block" />
        Download CSV
      </div>
    </CSVLink>
  );
};

export default DownloadCSV;
