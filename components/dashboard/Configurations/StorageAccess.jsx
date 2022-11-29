import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import React from "react";
import { useSelector } from "react-redux";
import Accordion from "../../shared/Accordion";

const StorageAccess = () => {
  const { configurations } = useSelector((state) => state.configuration);
  return (
    <Accordion title="Storage Access">
      <div className="flex justify-between items-center mb-6">
        <p>Add an Access Method </p>
        <label
          htmlFor="addfeatureaccess"
          className={`btn text-black btn-outline btn-primary border border-accent hover:btn-accent w-fit`}>
          ADD ACCESS METHOD
        </label>
      </div>

      {configurations?.map(({ storageAccessType }) =>
        storageAccessType.map((val, indx) => (
          <div
            key={indx}
            className="bg-[#F9F9F9] border-l-4 border-accent rounded-lg px-6 py-4 flex justify-between items-center text-sm mb-6">
            <div className="flex  items-center">
              <p className=" uppercase">{val}</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center cursor-pointer ">
                <PencilAltIcon className="text-primary w-4 mr-2 " />
                <p>Edit</p>
              </div>
              <span className=" text-red-500  cursor-pointer flex items-center">
                <TrashIcon className="w-4   mr-2" />
                <p className="">Delete</p>
              </span>
            </div>
          </div>
        ))
      )}
    </Accordion>
  );
};

export default StorageAccess;
