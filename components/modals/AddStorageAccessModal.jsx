import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { createConfiguration, updateConfigurations, getAccess } from "../../redux/features/configurations.slice";
import { XIcon } from "@heroicons/react/outline";

const AddStorageAccess = ({ details }) => {
  const dispatch = useDispatch();
  const { createConfigurationLoading, updateConfigurationLoading } = useSelector((state) => state.configuration);
  const [identification, setIdentification] = useState("");
  const router = useRouter();
  const initialState = { label: "", value: "" };
  const [data, setData] = useState(initialState);
  const disableBtn = !data.value || !data.label;
  const [info, setInfo] = useState([]);
  const closeModal = useRef(null);
  const refreshConfigurations = () => {
    dispatch(getAccess({ config: "storage-access-type" }));
  };
  const fomat = [];
  useEffect(() => {
    if (details) {
      fomat = details;
      setInfo(details);
      details?.map(({ label, value, _id }) => {
        setData({ label: label, value: value });
        setIdentification(_id);
      });
    }
  }, [details]);
  const handleChange = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSave = (e) => {
    const payload = { ...data };

    info.length !== 0
      ? dispatch(
          updateConfigurations({
            config: "storage-access-type",
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
            config: "storage-access-type",
            payload: payload,
            refreshConfigurations: refreshConfigurations,
            closeModal: closeModal,
            setData,
            initialState,
          })
        );
  };

  return (
    <>
      <input type="checkbox" id="addfeatureaccess" className=" modal-toggle " />
      <label htmlFor="addfeatureaccess" className=" modal ">
        <label className=" modal-box py-10 relative w-[80%] md:w-[50%] max-w-[500px] rounded-xl z-20">
          <div className="w-[80%] mx-auto text-left">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-2xl">Add Access Method</h2>
              <label
                htmlFor="addfeatureaccess"
                className="btn btn-sm btn-circle bg-accent text-primary hover:text-white border-accent hover:bg-primary hover:border-none "
                onClick={() => {
                  setInfo([]);
                  setData(initialState);
                }}>
                <XIcon className="w-4" />
              </label>
            </div>
            <h3 className="font-semibold text-sm mb-2">Label</h3>

            <input
              placeholder=""
              className="px-4 py-2 border border-black w-full mb-4 rounded-md"
              name="label"
              onChange={handleChange}
              value={data.label}
            />

            <h3 className="font-semibold text-sm mb-2">Value</h3>
            <p className="mb-2 text-xs">Max 50 characters</p>

            <input
              placeholder=""
              className="px-4 py-2 border border-black w-full mb-4 rounded-md"
              maxLength={50}
              name="value"
              onChange={handleChange}
              value={data.value}
            />
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
      <label htmlFor="addfeatureaccess" className="hidden" ref={closeModal} />
    </>
  );
};

export default AddStorageAccess;
