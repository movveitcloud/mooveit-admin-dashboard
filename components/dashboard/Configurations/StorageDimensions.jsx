import { PencilAltIcon, PhotographIcon, TrashIcon, DotsVerticalIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Accordion from "../../shared/Accordion";
import { DeleteConfigModal, StorageDimensionModal } from "../../../components";
import { getSize } from "../../../redux/features/configurations.slice";

const StorageDimensions = () => {
  const { size } = useSelector((state) => state.configuration);
  const [editVal, setEditVal] = useState([]);
  const [Id, setId] = useState("");

  const edit = (_id) => {
    const val = size.filter((val) => _id === val._id);
    setEditVal(val);
  };

  return (
    <Accordion title="Storage Dimensions">
      <div className="md:flex justify-between items-center  mb-6 text-center">
        <p className="text-sm md:text-base hidden md:inline">Add Storage Dimension </p>
        <label
          htmlFor="storagedimension"
          className={`btn text-black btn-outline btn-primary border border-accent hover:btn-accent text-[12px] md:text-[14px]  md:w-[175px]`}>
          ADD DIMENSION
        </label>
      </div>

      {/* {configurations?.map(({ storageSize }, i) => ( */}
      <div>
        {size?.length === 0 ? (
          <div className=" text-center font-semibold text-sm md:text-base">No storage dimension at this time</div>
        ) : (
          size?.map(({ label, description, visualization, _id }, indx) => (
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
                  <p className="font-bold">{label}</p>
                  <p>{description}</p>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-6">
                <label
                  htmlFor="storagedimension"
                  className="flex items-center cursor-pointer "
                  onClick={() => edit(_id)}>
                  <PencilAltIcon className="text-primary w-4 mr-2 " />
                  <p>Edit</p>
                </label>
                <label
                  htmlFor={_id}
                  className=" text-red-500  cursor-pointer flex items-center"
                  onClick={() => {
                    setId(_id);
                  }}>
                  <TrashIcon className="w-4   mr-2" />
                  <p className="">Delete</p>
                </label>
              </div>
              <div tabIndex="0" className="dropdown dropdown-left  cursor-pointer p-4 md:hidden">
                <DotsVerticalIcon className="w-4   " />

                <div
                  tabIndex="0"
                  className=" cursor-pointer bg-white rounded-sm shadow w-auto p-4 px-4 dropdown-content menu   ">
                  <label
                    htmlFor="storagedimension"
                    className="flex items-center cursor-pointer mb-2 "
                    onClick={() => edit(_id)}>
                    <PencilAltIcon className="text-primary w-4 mr-2 " />
                    <p className="">Edit</p>
                  </label>
                  <label
                    htmlFor={_id}
                    className=" text-red-500  cursor-pointer flex items-center"
                    onClick={() => {
                      setId(_id);
                    }}>
                    <TrashIcon className="w-4   mr-2" />
                    <p className="">Delete</p>
                  </label>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <StorageDimensionModal details={editVal} />
      <DeleteConfigModal id={Id} config="storage-size" refresh={getSize} />
    </Accordion>
  );
};

export default StorageDimensions;
