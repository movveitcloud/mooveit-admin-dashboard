import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import React from "react";
import { useSelector } from "react-redux";
import Accordion from "../../shared/Accordion";

const StorageDimensions = () => {
  const { configurations } = useSelector((state) => state.configuration);
  return (
    <Accordion title="Storage Dimensions">
      <div className="flex justify-between items-center mb-6">
        <p>Add Storage Dimension </p>
        <label
          htmlFor="storagedimension"
          className={`btn text-black btn-outline btn-primary border border-accent hover:btn-accent w-[175px]`}>
          ADD DIMENSION
        </label>
      </div>

      {configurations?.forEach(({ storageSize }, i) =>
        storageSize.map((val, indx) => (
          <div
            key={indx}
            className="bg-[#F9F9F9] border-l-4 border-accent rounded-lg px-6 py-4 flex justify-between items-center text-sm">
            <div className="flex  items-center">
              <p>CCTV</p>
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

export default StorageDimensions;
