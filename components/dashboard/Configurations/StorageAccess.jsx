import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import { useSelector } from "react-redux";
import Accordion from "../../shared/Accordion";
import React, { useEffect, useState } from "react";
import { DeleteConfigModal, AddStorageAccessModal } from "../../../components";
import { getAccess } from "../../../redux/features/configurations.slice";

const StorageAccess = () => {
  const { access } = useSelector((state) => state.configuration);
  const [editVal, setEditVal] = useState([]);
  const [Id, setId] = useState("");
  const edit = (_id) => {
    const val = access.filter((val) => _id === val._id);
    setEditVal(val);
  };
  return (
    <Accordion title="Storage Access">
      <div className="md:flex justify-between items-center mb-6 text-center">
        <p className="text-sm md:text-base hidden md:inline">Add an access method </p>
        <label
          htmlFor="addfeatureaccess"
          className={`btn text-black btn-outline btn-primary border border-accent hover:btn-accent w-fit text-[12px] md:text-[14px] `}>
          ADD ACCESS METHOD
        </label>
      </div>

      {access?.length === 0 ? (
        <div className=" text-center font-semibold text-sm md:text-base">No storage access type at this time</div>
      ) : (
        access?.map(({ label, _id }, indx) => (
          <div
            key={indx}
            className="bg-[#F9F9F9] border-l-4 border-accent rounded-lg px-6 py-4 flex justify-between items-center text-sm mb-6">
            <div className="flex  items-center">
              <p className=" uppercase">{label}</p>
            </div>
            <div className="flex items-center gap-6">
              <label htmlFor="addfeatureaccess" className="flex items-center cursor-pointer " onClick={() => edit(_id)}>
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
              <DeleteConfigModal id={Id} config="storage-access-type" refresh={getAccess} />
            </div>
          </div>
        ))
      )}
      <AddStorageAccessModal details={editVal} />
    </Accordion>
  );
};

export default StorageAccess;
