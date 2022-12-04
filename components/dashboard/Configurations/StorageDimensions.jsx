import { PencilAltIcon, PhotographIcon, TrashIcon } from "@heroicons/react/outline";
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

      {configurations?.map(({ storageSize }, i) =>
        storageSize.map(({ name, description, visualization }, indx) => (
          <div
            key={indx}
            className="bg-[#F9F9F9] border-l-4 border-accent rounded-lg px-6 py-4 flex justify-between items-center text-sm mb-6">
            <div className="flex  items-center">
              <div className="rounded-md md:w-16 md:h-16 lg:w-14 lg:h-14 mr-3 hidden md:block">
                {visualization ? (
                  <img src={visualization} alt="Feature Image" className="w-full h-full rounded-md" />
                ) : (
                  <PhotographIcon className="w-full h-full rounded-md" />
                )}
              </div>
              <div className="flex flex-col items-start justify-center space-y-2">
                <p className="font-bold">{name}</p>
                <p>{description}</p>
              </div>
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
