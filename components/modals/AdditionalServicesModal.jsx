import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { uploadConfiguration, getConfigurations } from "../../redux/features/configurations.slice";
import { XIcon } from "@heroicons/react/outline";

const AdditionalServicesModal = () => {
  const { configurations, uploadConfigurationLoading } = useSelector((state) => state.configuration);
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [additionalservice, setAdditionaservice] = useState("");
  const [additionalservicevalue, setAdditionaservicevalue] = useState("");
  const router = useRouter();
  const disableBtn = !additionalservice || !additionalservicevalue;
  const closeModal = useRef(null);

  const refreshConfigurations = () => {
    dispatch(getConfigurations());
  };

  useEffect(() => {
    configurations?.map(({ _id }) => setId(_id));
  }, [configurations]);
  const handleSave = (e) => {
    const payload = {
      services: { label: additionalservice, value: false },
    };
    console.log(payload);
    dispatch(
      uploadConfiguration({
        id: id,
        payload: payload,
        refreshConfigurations: refreshConfigurations,
        closeModal: closeModal,
      })
    );
  };

  return (
    <>
      <input type="checkbox" id="additionalservices" className=" modal-toggle " />
      <label htmlFor="additionalservices" className=" modal ">
        <label className=" modal-box py-10 relative w-[80%] md:w-[50%] max-w-[500px] rounded-xl z-20">
          <div className="w-[80%] mx-auto text-left">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-2xl">Add Additional Service</h2>
              <label
                htmlFor="additionalservices"
                className="btn btn-sm btn-circle bg-accent text-primary hover:text-white border-accent hover:bg-primary hover:border-none absolute right-6 top-6">
                <XIcon className="w-4" />
              </label>
            </div>
            <h3 className="font-semibold text-sm mb-2">Label</h3>

            <input
              placeholder=""
              className="px-4 py-2 border border-black w-full mb-4 rounded-md"
              onChange={(e) => setAdditionaservice(e.target.value)}
            />

            <h3 className="font-semibold text-sm mb-2">Value</h3>
            <p className="mb-2 text-xs">Max 50 characters</p>

            <input
              placeholder=""
              className="px-4 py-2 border border-black w-full mb-4 rounded-md"
              maxLength={50}
              onChange={(e) => setAdditionaservicevalue(e.target.value)}
            />
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
      <label htmlFor="additionalservices" className="hidden" ref={closeModal} />
    </>
  );
};

export default AdditionalServicesModal;
