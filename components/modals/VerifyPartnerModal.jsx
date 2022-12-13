import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { uploadConfiguration, getConfigurations } from "../../redux/features/configurations.slice";
import { XIcon } from "@heroicons/react/outline";

const VerifyParnerModal = () => {
  const { configurations, uploadConfigurationLoading } = useSelector((state) => state.configuration);
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [documenttype, setDocumenttype] = useState("");
  const [storagetypevalue, setStoragetypevalue] = useState("");
  const router = useRouter();
  const disableBtn = !documenttype || !storagetypevalue;
  const closeModal = useRef(null);
  const { updateConfigurationLoading } = useSelector((state) => state.admin);
  const refreshConfigurations = () => {
    dispatch(getConfigurations());
  };

  useEffect(() => {
    configurations?.map(({ _id }) => setId(_id));
  }, [configurations]);
  // console.log(configurations);
  const handleSave = (e) => {
    const payload = {
      storageType: {
        label: storagetype,
        value: storagetypevalue,
      },
    };

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
      <input type="checkbox" id="verifypartner" className=" modal-toggle " />
      <label htmlFor="verifypartner" className=" modal ">
        <label className=" modal-box py-10 relative w-[80%] md:w-[50%] max-w-[500px] rounded-xl z-20">
          <div className="w-[80%] mx-auto text-left">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-2xl">Account Verification</h2>
              <label
                htmlFor="verifypartner"
                className="btn btn-sm btn-circle bg-accent text-primary hover:text-white border-accent hover:bg-primary hover:border-none absolute right-6 top-6">
                <XIcon className="w-4" />
              </label>
            </div>
            <h3 className="font-semibold text-sm mb-2">Document Type</h3>

            <input
              placeholder=""
              className="px-4 py-2 border border-black w-full mb-4 rounded-md"
              onChange={(e) => setDocumenttype(e.target.value)}
            />
            <h3 className="font-semibold text-sm mb-2">Value</h3>
            <p className="mb-2 text-xs">Max 50 characters</p>

            <button
              className={`${
                uploadConfigurationLoading && "loading"
              } btn  w-full disabled:bg-[#DDDDDD] disabled:text-white cursor-pointer bg-black text-white  mt-6 `}
              disabled={disableBtn}
              onClick={handleSave}>
              {uploadConfigurationLoading ? "" : "VERIFY ACCOUNT"}
            </button>
          </div>
        </label>
      </label>
      <label htmlFor="addfeaturetype" className="hidden" ref={closeModal} />
    </>
  );
};

export default VerifyParnerModal;
