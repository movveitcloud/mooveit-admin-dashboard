import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Accordion from "../../shared/Accordion";
import { DeleteConfigModal, AdditionalServicesModal } from "../../../components";
import { getServices } from "../../../redux/features/configurations.slice";

const AdditionalServices = () => {
  const { services } = useSelector((state) => state.configuration);
  const [editVal, setEditVal] = useState([]);
  const [Id, setId] = useState("");
  const edit = (_id) => {
    const val = services.filter((val) => _id === val._id);
    setEditVal(val);
  };

  return (
    <Accordion title="Additional Services">
      <div className="md:flex justify-between items-center mb-6 text-center">
        <p className="text-sm md:text-base hidden md:inline">Add additional services </p>
        <label
          htmlFor="additionalservices"
          className={`btn text-black btn-outline btn-primary border border-accent hover:btn-accent text-[12px] md:text-[14px] w-[175px]`}>
          ADD SERVICES
        </label>
      </div>

      {services?.length === 0 ? (
        <div className=" text-center font-semibold text-sm md:text-base">No services at this time</div>
      ) : (
        services?.map(
          ({ label, _id }, indx) => (
            // Object.keys(val).map(({ label }) => (
            <div
              key={indx}
              className="bg-[#F9F9F9] border-l-4 border-accent rounded-lg px-6 py-4 flex justify-between items-center text-sm mb-6">
              <div className="flex  items-center">
                <p className=" capitalize">{label}</p>
              </div>
              <div className="flex items-center gap-6">
                <label
                  htmlFor="additionalservices"
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
                <DeleteConfigModal id={Id} config="services" refresh={getServices} />
              </div>
            </div>
          )
          // ))
        )
      )}
      <AdditionalServicesModal details={editVal} />
    </Accordion>
  );
};

export default AdditionalServices;
