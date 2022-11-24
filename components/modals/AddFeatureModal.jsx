import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { disapproveListing } from "../../redux/features/listings.slice";
import { PhotographIcon, XIcon } from "@heroicons/react/outline";
import { errorPopUp } from "../../helpers/toastify";

const AddFeatureModal = ({ id }) => {
  const { disapproveListingLoading } = useSelector((state) => state.listing);

  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [featurename, setFeaturename] = useState("");

  const router = useRouter();
  const [image, setImage] = useState("");
  const disableBtn = !featurename || !image;

  const handleDisapprove = () => {
    const payload = {
      status: "disapproved",
      message: value,
    };
    if (value != "") {
      dispatch(disapproveListing({ id: id, payload: payload }));
      router.push("/listings");
    }
  };
  const handleSave = () => {
    const payload = {
      name: featurename,
      image: image,
    };
  };
  const handleChange = (e) => {
    const img = e.target.files[0];
    setImage(img);
    // if (img.size > 1000) {
    //   setImage("");
    //   errorPopUp({ msg: "Image greater than 1mb" });
    // }
    // if (img.size <= 1000 && (img.type == "image/png" || img.type == "image/jpeg" || imgtype == "image/svg")) {
    //   setImage(img);
    // } else {
    //   errorPopUp({ msg: "Image type not compatible" });
    //   setImage("");
    // }
  };

  return (
    <>
      <input type="checkbox" id="addfeature" className=" modal-toggle " />
      <label htmlFor="addfeature" className=" modal ">
        <label className=" modal-box py-10 relative w-[80%] md:w-[50%] max-w-[500px] rounded-xl z-20">
          <div className="w-[80%] mx-auto text-left">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-2xl">Add Feature</h2>
              <label htmlFor="addfeature">
                <XIcon className="w-6 cursor-pointer modal-button" />
              </label>
            </div>
            <h3 className="font-bold text-sm mb-2">Feature</h3>

            <input
              placeholder="Enter Feature..."
              className="px-4 py-2 border border-black w-full mb-4 rounded-md"
              onChange={(e) => setFeaturename(e.target.value)}
            />
            <h3 className="font-bold text-sm mb-2 ">Feature's Icon</h3>
            <p className="mb-2 text-xs">Only files in png,jpeg and svg formats will be recognized. Max 1mb</p>
            <div className="flex items-center">
              <div className="mr-3 flex items-center bg-[#F7F7F7] p-4 w-1/5 justify-center">
                {image !== "" ? (
                  <img src={URL.createObjectURL(image)} className="w-full h-full" alt="Feature Image" />
                ) : (
                  <PhotographIcon className="w-8" />
                )}
              </div>
              {/* <button className="btn btn-white text-black border-3 border-accent w-[175px] hover:btn-accent ">
                UPLOAD ICON
              </button> */}
              <label
                htmlFor="upload"
                className="btn btn-white text-black border-3 border-accent w-[175px] hover:btn-accent ">
                UPLOAD ICON
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
      <label htmlFor="addfeature" className="hidden" />
    </>
  );
};

export default AddFeatureModal;
