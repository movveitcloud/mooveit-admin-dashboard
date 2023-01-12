import { PencilAltIcon, PhotographIcon, TrashIcon, TruckIcon, DotsVerticalIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

import Accordion from "../../shared/Accordion";
import { getConfigurations, getFeatures } from "../../../redux/features/configurations.slice";
import { getUsers } from "../../../redux/features/users.slice";
import { DeleteConfigModal, AddFeatureModal, DeleteFeatureModal } from "../../../components";

const StorageFeatures = () => {
  const { features } = useSelector((state) => state.configuration);
  const [editVal, setEditVal] = useState([]);
  const [Id, setId] = useState("");

  const edit = (_id) => {
    const val = features.filter((val) => _id === val._id);
    setEditVal(val);
    // console.log(editVal);
  };

  // console.log(features);
  return (
    <Accordion title="Storage Features">
      <div className="md:flex justify-between items-center mb-6 text-center">
        <p className="text-sm md:text-base hidden md:inline">Add a storage feature </p>
        <label
          htmlFor="addfeature"
          className={`btn text-black btn-outline btn-primary border border-accent hover:btn-accent text-[12px] md:text-[14px]  md:w-[175px]`}>
          ADD FEATURE
        </label>
      </div>
      {/* {featuresLoading} */}
      {features?.length === 0 ? (
        <div className=" text-center font-semibold text-sm md:text-base">No storage features at this time</div>
      ) : (
        features?.map(({ label, image, _id }, indx) => (
          <div key={indx} className="overflow-x-auto w-full  ">
            <div className=" bg-[#F9F9F9] flex   md:w-[100%]  border-l-4 border-accent rounded-lg px-2 md:px-6 py-4  justify-between items-center text-sm mb-6">
              <div className="flex  w-full  items-center justify-start  ">
                <span className="rounded-full w-10 h-10 flex  justify-center items-center ">
                  <div className="w-8 h-8 mr-2 bg-white  rounded-full flex items-center justify-center ">
                    {image ? (
                      <img src={image} alt="Feature Image" className="w-4 h-4 " />
                    ) : (
                      <PhotographIcon className="w-4" />
                      // <img src="/auth-image.png" alt="Feature Image" className="w-4 h-4 " />
                    )}
                  </div>
                </span>
                <p className=" uppercase text-[12px] md:text-[14px] mr-2">{label}</p>
              </div>
              <div className="hidden md:flex  justify-between items-center gap-6 ">
                <label htmlFor="addfeature" className="flex items-center cursor-pointer " onClick={() => edit(_id)}>
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
                {/* <DeleteConfigModal id={Id} config="storage-features" refresh={getFeatures} /> */}
              </div>
              <div tabIndex="0" className="dropdown dropdown-left  cursor-pointer p-4 md:hidden">
                <DotsVerticalIcon className="w-4   " />

                <div
                  tabIndex="0"
                  className=" cursor-pointer bg-white rounded-sm shadow w-auto p-4 px-4 dropdown-content menu   ">
                  <label
                    htmlFor="addfeature"
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
          </div>
        ))
      )}
      <AddFeatureModal details={editVal} />
      <DeleteConfigModal id={Id} config="storage-features" refresh={getFeatures} />
    </Accordion>
  );
};

export default StorageFeatures;
