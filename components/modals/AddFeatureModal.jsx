import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadConfiguration, getConfigurations } from "../../redux/features/configurations.slice";
import axios from "axios";
import { PhotographIcon, XIcon } from "@heroicons/react/outline";
import { errorPopUp } from "../../helpers/toastify";

const AddFeatureModal = () => {
  const { configurations, uploadConfigurationLoading } = useSelector((state) => state.configuration);
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [featurename, setFeaturename] = useState("");
  const [featurevalue, setFeaturevalue] = useState("");
  const [imageupload, setImageupload] = useState("");
  const closeModal = useRef(null);
  const disableBtn = !featurename || !imageupload || !featurevalue;
  const API = axios.create({ baseURL: process.env.BASE_URL });

  const refreshConfigurations = () => {
    dispatch(getConfigurations());
  };
  useEffect(() => {
    configurations?.map(({ _id }) => setId(_id));
  }, [configurations]);

  const handleSave = () => {
    const payload = {
      storageFeatures: { label: featurename, value: featurevalue, image: imageupload },
    };

    console.log(payload);

    dispatch(
      uploadConfiguration({
        id,
        payload,
        refreshConfigurations,
        closeModal,
      })
    );
  };
  // console.log(uploadConfiguration);
  const handleChange = async (e) => {
    setLoading(true);
    let img = e.target.files[0];

    const formData = new FormData();
    if (formData) {
      formData.append("id", id);
      formData.append("key", "media");
      formData.append("media", img);
    }

    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}:${value}`);
    // }
    try {
      const headers = {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("admin")).token}`,
        "Content-Type": "multipart/formdata",
      };
      const response = await API({
        method: "patch",
        url: `/admin/configurations/${id}/upload`,
        headers: headers,
        data: formData,
      });
      setImageupload(response.data.data);
      setLoading(false);
      return response.data.data;
    } catch (error) {
      setLoading(false);
    }
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
            <h3 className=" font-semibold text-sm mb-2">Feature</h3>

            <input
              placeholder="Enter Feature..."
              className="px-4 py-2 border border-black w-full mb-4 rounded-md"
              onChange={(e) => setFeaturename(e.target.value)}
            />
            <h3 className=" font-semibold text-sm mb-2">Feature(value)</h3>
            <p className="mb-2 text-xs">Max 50 characters</p>

            <input
              placeholder="Enter Feature..."
              className="px-4 py-2 border border-black w-full mb-4 rounded-md"
              maxLength={50}
              onChange={(e) => setFeaturevalue(e.target.value)}
            />
            <h3 className="font-semibold text-sm mb-2 ">Feature's Icon</h3>
            <p className="mb-2 text-xs">Only files in png,jpeg and svg formats will be recognized. Max 1mb</p>
            <div className="flex items-center">
              <div className="mr-3 flex items-center bg-[#F7F7F7] p-4 w-1/5 justify-center">
                {imageupload !== "" ? (
                  <img src={imageupload} className="w-full h-full" alt="Feature Image" />
                ) : (
                  <PhotographIcon className="w-8" />
                )}
              </div>

              <label
                htmlFor="upload"
                className={`${
                  loading && "loading"
                } btn  btn-white text-black border-3 border-accent hover:btn-accent w-[175px] `}>
                {loading ? "" : "UPLOAD ICON"}
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
              className={`${
                uploadConfigurationLoading && "loading"
              } btn  w-full disabled:bg-[#DDDDDD] disabled:text-white cursor-pointer bg-black text-white  mt-6 `}
              disabled={disableBtn}
              onClick={handleSave}>
              {uploadConfigurationLoading ? "" : "SAVE"}
            </button>
          </div>
        </label>
      </label>
      <label htmlFor="addfeature" className="hidden" ref={closeModal} />
    </>
  );
};

export default AddFeatureModal;
