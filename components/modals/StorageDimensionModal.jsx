import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { PhotographIcon, XIcon } from "@heroicons/react/outline";

const StorageDimensionModal = ({ id }) => {
  const dispatch = useDispatch();

  const [storagetype, setStoragetype] = useState("");
  const router = useRouter();
  const disableBtn = !storagetype;
  const handleSave = () => {
    const payload = {
      name: storagetype,
    };
  };

  return (
    <>
      <input type="checkbox" id="storagedimension" className=" modal-toggle " />
      <label htmlFor="storagedimension" className=" modal ">
        <label className=" modal-box py-10 relative w-[80%] md:w-[50%] max-w-[500px] rounded-xl z-20">
          <div className="w-[80%] mx-auto text-left">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-2xl">Add Dimension</h2>
              <label htmlFor="storagedimension">
                <XIcon className="w-6 cursor-pointer modal-button" />
              </label>
            </div>
            <h3 className=" font-bold text-sm mb-2">Storage Dimension</h3>

            <input
              placeholder="Others"
              className="px-4 py-2 border border-black w-full mb-4 rounded-md"
              onChange={(e) => setStoragetype(e.target.value)}
            />
            <h3 className=" font-bold text-sm mb-2">Description</h3>
            <textarea className="px-4 py-2 border border-black w-full mb-4 rounded-md" />
            <h3 className=" font-bold text-sm mb-2">Storage visualizer</h3>
            <p className="mb-2 text-xs">
              Only files in mp4 & GIF formats will be recognized. Max 20mb,jpeg and svg formats will be recognized. Max
              1mb
            </p>
            <div className="flex items-center">
              <div className="mr-3 flex items-center bg-[#F7F7F7] p-4 w-1/5 justify-center">
                {/* {image !== "" ? (
                  <img src={URL.createObjectURL(image)} className="w-full h-full" alt="Feature Image" />
                ) : ( */}
                <PhotographIcon className="w-8" />
                {/* )} */}
              </div>

              <label
                htmlFor="upload"
                className="btn btn-white text-black border-3 border-accent w-[175px] hover:btn-accent ">
                UPLOAD VISUALIZER
              </label>
              <input
                id="upload"
                type="file"
                placeholder="UPLOAD ICON"
                onChange={(e) => handleChange(e)}
                className="hidden"
              />
            </div>

            <button
              className="btn w-full disabled:bg-[#DDDDDD] disabled:text-white cursor-pointer bg-black text-white  mt-6"
              disabled={disableBtn}
              onClick={handleSave}>
              SAVE
            </button>
          </div>
        </label>
      </label>
      <label htmlFor="storagedimension" className="hidden" />
    </>
  );
};

export default StorageDimensionModal;
