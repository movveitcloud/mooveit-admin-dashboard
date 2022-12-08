import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import React from "react";
import { useSelector } from "react-redux";
import Accordion from "../../shared/Accordion";

const StorageType = () => {
  const { configurations } = useSelector((state) => state.configuration);
  return (
    <Accordion title="Storage Type">
      <div className="flex justify-between items-center mb-6">
        <p>Add a storage type </p>
        <label
          htmlFor="addfeaturetype"
          className={`btn text-black btn-outline btn-primary border border-accent hover:btn-accent w-[175px]`}>
          ADD TYPE
        </label>
      </div>

      {configurations?.map(({ storageType }, i) => (
        <div key={i}>
          {storageType?.length === 0 ? (
            <div className=" text-center font-semibold">No storage type at this time</div>
          ) : (
            storageType.map(({ label }, indx) => (
              <div
                key={indx}
                className="bg-[#F9F9F9] border-l-4 border-accent rounded-lg px-6 py-4 flex justify-between items-center text-sm mb-6">
                <div className="flex  items-center">
                  <p className=" uppercase">{label}</p>
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
        </div>
      ))}
    </Accordion>
  );
};

export default StorageType;
