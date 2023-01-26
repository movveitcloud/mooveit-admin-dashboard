import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadConfiguration, getConfigurations } from "../../redux/features/configurations.slice";
import { useRouter } from "next/router";
import { createConfiguration, updateConfigurations, getSize } from "../../redux/features/configurations.slice";
import axios from "axios";
import { PhotographIcon, XIcon } from "@heroicons/react/outline";

const StorageDimensionModal = ({ details }) => {
  const { createConfigurationLoading, updateConfigurationLoading } = useSelector((state) => state.configuration);
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [dimensionname, setDimensionname] = useState("");
  const [identification, setIdentification] = useState("");
  const [dimensionvalue, setDimensionvalue] = useState("");
  const [description, setDescription] = useState("");
  const [imageupload, setImageupload] = useState("");
  const closeModal = useRef(null);
  // const disableBtn = !description || !imageupload || !dimensionname || !dimensionvalue;
  const initialState = { label: "", value: "", description: "", visualization: "" };
  const [data, setData] = useState(initialState);
  const disableBtn = !data.value || !data.label || !data.description || !data.visualization;
  const [info, setInfo] = useState([]);

  const API = axios.create({ baseURL: process.env.BASE_URL });

  const refreshConfigurations = () => {
    dispatch(getSize({ config: "storage-size" }));
  };

  const fomat = [];
  useEffect(() => {
    if (details) {
      fomat = details;
      setInfo(details);
      details?.map(({ label, value, _id, description, visualization }) => {
        setData({ label: label, value: value, description: description, visualization: visualization });
        setImageupload(visualization);
        setIdentification(_id);
      });
    }
  }, [details]);
  const handleValue = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  };

  // useEffect(() => {
  //   details?.map(({ label, value, visualization, description, _id }) => {
  //     setDimensionname(label);
  //     setDimensionvalue(value);
  //     setDescription(description);
  //     setImageupload(visualization);
  //     setIdentification(_id);
  //   });
  // }, [details]);

  const handleSave = () => {
    const payload = { ...data };

    info.length !== 0
      ? dispatch(
          updateConfigurations({
            config: "storage-size",
            id: identification,
            payload: payload,
            refreshConfigurations: refreshConfigurations,
            closeModal: closeModal,
            setData: setData,
            data: data,
            initialState: initialState,
            setInfo,
          })
        )
      : dispatch(
          createConfiguration({
            config: "storage-size",
            payload: payload,
            refreshConfigurations: refreshConfigurations,
            closeModal: closeModal,
            setData,
            initialState,
          })
        );

    // const payload = {
    //   label: dimensionname,
    //   value: dimensionvalue,
    //   description: description,
    //   visualization: imageupload,
    // };
    // details.length !== 0
    //   ? dispatch(
    //       updateConfigurations({
    //         config: "storage-size",
    //         id: identification,
    //         payload: payload,
    //         refreshConfigurations: refreshConfigurations,
    //         closeModal: closeModal,
    //       })
    //     )
    //   : dispatch(
    //       createConfiguration({
    //         config: "storage-size",
    //         payload: payload,
    //         refreshConfigurations: refreshConfigurations,
    //         closeModal: closeModal,
    //       })
    //     );
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
    try {
      const headers = {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("admin")).token}`,
        "Content-Type": "multipart/formdata",
      };
      const response = await API({
        method: "patch",
        url: `/admin/configurations/0/upload`,
        headers: headers,
        data: formData,
      });
      setImageupload(response.data.data);
      console.log(response.data.data);
      setLoading(false);
      setData({ ...data, visualization: response.data.data });
      return response.data.data;
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      <input type="checkbox" id="storagedimension" className=" modal-toggle " />
      <label htmlFor="storagedimension" className=" modal ">
        <label className=" modal-box py-10 relative w-[80%] md:w-[50%] max-w-[500px] rounded-xl z-20">
          <div className="w-[80%] mx-auto text-left">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-2xl">Add Dimension</h2>
              <label
                htmlFor="storagedimension"
                className="btn btn-sm btn-circle bg-accent text-primary hover:text-white border-accent hover:bg-primary hover:border-none "
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
              placeholder=""
              className="px-4 py-2 border border-black w-full mb-4 rounded-md"
              name="label"
              onChange={handleValue}
              value={data.label}
              // value={dimensionname}
              // onChange={(e) => setDimensionname(e.target.value)}
            />
            <h3 className=" font-semibold text-sm mb-2">Value</h3>
            <p className="mb-2 text-xs">Max 50 characters</p>

            <input
              placeholder=""
              className="px-4 py-2 border border-black w-full mb-4 rounded-md"
              maxLength={50}
              name="value"
              onChange={handleValue}
              value={data.value}
              // value={dimensionvalue}
              // onChange={(e) => setDimensionvalue(e.target.value)}
            />
            <h3 className=" font-semibold text-sm mb-2">Description</h3>
            <textarea
              className="px-4 py-2 border border-black w-full mb-4 rounded-md"
              name="description"
              onChange={handleValue}
              value={data.description}
              // value={description}
              // onChange={(e) => setDescription(e.target.value)}
            />
            <h3 className=" font-semibold text-sm mb-2">Storage visualizer</h3>
            <p className="mb-2 text-xs">
              Only files in mp4 & GIF formats will be recognized. Max 20mb,jpeg and svg formats will be recognized. Max
              1mb
            </p>
            <div className="flex items-center">
              <div className="mr-3 flex items-center bg-[#F7F7F7] p-4 w-1/5 justify-center">
                {imageupload !== "" ? (
                  <img src={imageupload} className="w-full h-full" alt="Feature Image" />
                ) : (
                  <PhotographIcon className="w-8" />
                )}
              </div>

              <label
                htmlFor="dimension"
                className={`${
                  loading && "loading"
                } btn  btn-white text-black border-3 border-accent hover:btn-accent w-[175px] `}>
                {loading ? "" : " UPLOAD VISUALIZER"}
              </label>

              <input
                id="dimension"
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
      <label htmlFor="storagedimension" className="hidden" ref={closeModal} />
    </>
  );
};

export default StorageDimensionModal;
