import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { XIcon } from "@heroicons/react/outline";

const AdditionalServicesModal = ({ id }) => {
  const dispatch = useDispatch();

  const [additionalservice, setAdditionaservice] = useState("");
  const router = useRouter();
  const disableBtn = !additionalservice;
  const handleSave = () => {
    const payload = {
      service: additionalservice,
    };
  };

  return (
    <>
      <input type="checkbox" id="additionalservices" className=" modal-toggle " />
      <label htmlFor="additionalservices" className=" modal ">
        <label className=" modal-box py-10 relative w-[80%] md:w-[50%] max-w-[500px] rounded-xl z-20">
          <div className="w-[80%] mx-auto text-left">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-2xl">Add Additional Service</h2>
              <label htmlFor="additionalservices">
                <XIcon className="w-6 cursor-pointer modal-button" />
              </label>
            </div>
            <h3 className="font-bold text-sm mb-2">Additional Service</h3>

            <input
              placeholder="Others"
              className="px-4 py-2 border border-black w-full mb-4 rounded-md"
              onChange={(e) => setAdditionaservice(e.target.value)}
            />

            <button
              className="btn w-full disabled:bg-[#DDDDDD] disabled:text-white cursor-pointer bg-black text-white  mt-6"
              disabled={disableBtn}
              onClick={handleSave}>
              SAVE
            </button>
          </div>
        </label>
      </label>
      <label htmlFor="additionalservices" className="hidden" />
    </>
  );
};

export default AdditionalServicesModal;
