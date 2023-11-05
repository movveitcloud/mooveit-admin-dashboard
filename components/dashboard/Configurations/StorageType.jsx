import { PencilAltIcon, TrashIcon, DotsVerticalIcon } from "@heroicons/react/outline";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Accordion from "../../shared/Accordion";
import { DeleteTypeModal, DeleteConfigModal, AddStorageTypeModal } from "../../../components";
import { getType } from "../../../redux/features/configurations.slice";

const StorageType = () => {
  const { type } = useSelector((state) => state.configuration);
  const [editVal, setEditVal] = useState([]);
  const [Id, setId] = useState("");
  const edit = (_id) => {
    const val = type.filter((val) => _id === val._id);
    setEditVal(val);
  };

  return (
    <Accordion title="Storage Type">
      <div className="md:flex justify-between items-center mb-6 text-center">
        <p className="text-sm md:text-base hidden md:inline ">Add a storage type </p>
        <label
          htmlFor="addfeaturetype"
          // className={`py-2 px-4 md:px-5 text-center md:py-3 text-black btn-outline btn-primary border border-accent hover:btn-accent text-sm  rounded-md  md:text-[16px]  w-[150px] md:w-[175px]`}>
          className={`btn text-black btn-outline btn-primary border border-accent hover:btn-accent text-[12px] md:text-[14px] md:w-[175px]`}>
          ADD STORAGE TYPE
        </label>
      </div>

      <div>
        {type?.length === 0 ? (
          <div className=" text-center font-semibold text-sm md:text-base">No storage type at this time</div>
        ) : (
          type?.map(({ label, _id }, indx) => (
            <div
              key={indx}
              className="bg-[#F9F9F9] border-l-4 border-accent rounded-lg px-6 py-4 flex justify-between items-center text-sm mb-6">
              <div className="flex  items-center">
                <p className=" uppercase text-[12px] md:text-[14px]">{label}</p>
              </div>
              <div className="hidden md:flex items-center gap-6">
                <label htmlFor="addfeaturetype" className="flex items-center cursor-pointer " onClick={() => edit(_id)}>
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
                {/* <DeleteConfigModal id={Id} config="storage-type" refresh={getType} /> */}
              </div>
              <div tabIndex="0" className="dropdown dropdown-left  cursor-pointer p-4 md:hidden">
                <DotsVerticalIcon className="w-4   " />

                <div
                  tabIndex="0"
                  className=" cursor-pointer bg-white rounded-sm shadow w-auto p-4 px-4 dropdown-content menu   ">
                  <label
                    htmlFor="addfeaturetype"
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

      <AddStorageTypeModal details={editVal} />
      <DeleteConfigModal id={Id} config="storage-type" refresh={getType} />
    </Accordion>
  );
};

export default StorageType;
