import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
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
      <div className="flex justify-between items-center mb-6">
        <p>Add a storage type </p>
        <label
          htmlFor="addfeaturetype"
          className={`btn text-black btn-outline btn-primary border border-accent hover:btn-accent w-[175px]`}>
          ADD TYPE
        </label>
      </div>

      <div>
        {type?.length === 0 ? (
          <div className=" text-center font-semibold">No storage type at this time</div>
        ) : (
          type?.map(({ label, _id }, indx) => (
            <div
              key={indx}
              className="bg-[#F9F9F9] border-l-4 border-accent rounded-lg px-6 py-4 flex justify-between items-center text-sm mb-6">
              <div className="flex  items-center">
                <p className=" uppercase">{label}</p>
              </div>
              <div className="flex items-center gap-6">
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
                <DeleteConfigModal id={Id} config="storage-type" refresh={getType} />
              </div>
            </div>
          ))
        )}
      </div>

      <AddStorageTypeModal details={editVal} />
    </Accordion>
  );
};

export default StorageType;
