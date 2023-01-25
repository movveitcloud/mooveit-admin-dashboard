import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createConfiguration, getFeatures, updateConfigurations } from "../../redux/features/configurations.slice";
import axios from "axios";
import { PhotographIcon, XIcon } from "@heroicons/react/outline";
import { errorPopUp } from "../../helpers/toastify";

const AddFeatureModal = ({ details }) => {
  const { createConfigurationLoading, updateConfigurationLoading, features } = useSelector(
    (state) => state.configuration
  );
  const dispatch = useDispatch();
  const [identification, setIdentification] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageupload, setImageupload] = useState("");
  const closeModal = useRef(null);
  const initialState = { label: "", value: "", image: "" };
  const [data, setData] = useState(initialState);
  const disableBtn = !data.value || !data.label || !data.image;
  const [info, setInfo] = useState([]);
  const API = axios.create({ baseURL: process.env.BASE_URL });

  const refreshConfigurations = () => {
    dispatch(getFeatures({ config: "storage-features" }));
  };
  const fomat = [];
  useEffect(() => {
    if (details) {
      fomat = details;
      setInfo(details);
      details?.map(({ label, value, _id, image }) => {
        setData({ label: label, value: value, image: image });
        setImageupload(image);
        setIdentification(_id);
      });
    }
  }, [details]);
  const handleValue = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSave = () => {
    const payload = { ...data };

    info.length !== 0
      ? dispatch(
          updateConfigurations({
            config: "storage-features",
            id: identification,
            payload: payload,
            refreshConfigurations: refreshConfigurations,
            closeModal: closeModal,
            setData: setData,
            data: data,
            initialState: initialState,
            setInfo,
            setImageupload: setImageupload,
          })
        )
      : dispatch(
          createConfiguration({
            config: "storage-features",
            payload: payload,
            refreshConfigurations: refreshConfigurations,
            closeModal: closeModal,
            setData,
            initialState,
            setImageupload: setImageupload,
          })
        );
  };

  const handleChange = async (e) => {
    setLoading(true);
    let img = e.target.files[0];

    const formData = new FormData();
    if (formData) {
      formData.append("id", 0);
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
        // url: `/admin/configurations/${id}/upload`,
        url: "/admin/configurations/0/upload",
        headers: headers,
        data: formData,
      });
      console.log(response.data.data);
      setImageupload(response.data.data);
      setLoading(false);
      setData({ ...data, image: response.data.data });

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
              <label
                htmlFor="addfeature"
                className="btn btn-sm btn-circle bg-accent text-primary hover:text-white border-accent hover:bg-primary hover:border-none"
                onClick={() => {
                  setInfo([]);
                  setData(initialState);
                  setImageupload("");
                }}>
                <XIcon className="w-4" />
              </label>
            </div>
            <h3 className=" font-semibold text-sm mb-2">Label</h3>

            <input
              placeholder="Enter Feature..."
              className="px-4 py-2 border border-black w-full mb-4 rounded-md"
              name="label"
              onChange={handleValue}
              value={data.label}
            />
            <h3 className=" font-semibold text-sm mb-2">Value</h3>
            <p className="mb-2 text-xs">Max 50 characters</p>

            <input
              placeholder="Enter Feature..."
              className="px-4 py-2 border border-black w-full mb-4 rounded-md"
              maxLength={50}
              name="value"
              onChange={handleValue}
              value={data.value}
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
                } btn  btn-white text-black border-3 border-accent hover:btn-accent md:w-[175px] `}>
                {loading ? "" : imageupload !== "" ? "CHANGE ICON" : "UPLOAD ICON"}
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
                (createConfigurationLoading && "loading") || (updateConfigurationLoading && "loading")
              } btn  w-full disabled:bg-[#DDDDDD] disabled:text-white cursor-pointer bg-black text-white  mt-6 `}
              disabled={disableBtn}
              onClick={handleSave}>
              {info?.length !== 0
                ? updateConfigurationLoading
                  ? ""
                  : "EDIT"
                : createConfigurationLoading
                ? ""
                : "SAVE"}
            </button>
          </div>
        </label>
      </label>
      <label htmlFor="addfeature" className="hidden" ref={closeModal} />
    </>
  );
};

export default AddFeatureModal;
