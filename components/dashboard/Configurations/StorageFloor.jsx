import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import { useSelector } from "react-redux";
import Accordion from "../../shared/Accordion";
import React, { useEffect, useState } from "react";
import { getFloor } from "../../../redux/features/configurations.slice";
import { DeleteConfigModal, AddStorageFloorModal, DeleteTypeModal } from "../../../components";

const StorageFloor = () => {
  const { floor } = useSelector((state) => state.configuration);
  const [editVal, setEditVal] = useState([]);
  const [Id, setId] = useState("");

  const edit = (_id) => {
    const val = floor.filter((val) => _id === val._id);
    setEditVal(val);
    // console.log(editVal);
  };

  return (
    <Accordion title="Storage Floor">
      <div className="md:flex justify-between items-center mb-6 text-center">
        <p className="text-sm md:text-base hidden md:inline">Add storage floor </p>
        <label
          htmlFor="addstoragefloor"
          className={`btn text-black btn-outline btn-primary border border-accent hover:btn-accent text-[12px] md:text-[14px] w-[175px]`}>
          ADD FLOOR
        </label>
      </div>

      {/* {configurations?.map(({ storageFloor }, i) => ( */}
      <div>
        {floor?.length === 0 ? (
          <div className=" text-center font-semibold text-sm md:text-base">No storage floor at this time</div>
        ) : (
          floor?.map(({ label, _id }, indx) => (
            <div
              key={indx}
              className="bg-[#F9F9F9] border-l-4 border-accent rounded-lg px-6 py-4 flex justify-between items-center text-sm mb-6">
              <div className="flex  items-center">
                <p className=" capitalize  ">{label}</p>
              </div>
              <div className="flex items-center gap-6">
                <label
                  htmlFor="addstoragefloor"
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
                <DeleteConfigModal id={Id} config="storage-floor" refresh={getFloor} />
              </div>
            </div>
          ))
        )}
      </div>

      <AddStorageFloorModal details={editVal} />
    </Accordion>
  );
};

export default StorageFloor;
