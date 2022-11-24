import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { XIcon } from "@heroicons/react/outline";

const AddStorageAccess = ({ id }) => {
  const dispatch = useDispatch();

  const [storageaccess, setStorageaccess] = useState("");
  const router = useRouter();
  const disableBtn = !storageaccess;
  const handleSave = () => {
    const payload = {
      name: storageaccess,
    };
  };

  return (
    <>
      <input type="checkbox" id="addfeatureaccess" className=" modal-toggle " />
      <label htmlFor="addfeatureaccess" className=" modal ">
        <label className=" modal-box py-10 relative w-[80%] md:w-[50%] max-w-[500px] rounded-xl z-20">
          <div className="w-[80%] mx-auto text-left">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-2xl">Add Access Method</h2>
              <label htmlFor="addfeatureaccess">
                <XIcon className="w-6 cursor-pointer modal-button" />
              </label>
            </div>
            <h3 className="font-bold text-sm mb-2">Access Method</h3>

            <input
              placeholder="Fingerprint scanner"
              className="px-4 py-2 border border-black w-full mb-4 rounded-md"
              onChange={(e) => setStorageaccess(e.target.value)}
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
      <label htmlFor="addfeatureaccess" className="hidden" />
    </>
  );
};

export default AddStorageAccess;
