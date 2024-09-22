import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { createConfiguration, updateConfigurations, getType } from "../../redux/features/configurations.slice";
import { XIcon } from "@heroicons/react/outline";
import { createBank, getBanks, updateBank } from "../../redux/features/banks.slice";

const AddBankModal = ({ details }) => {
  const { createBankLoading, updateBankLoading } = useSelector((state) => state.banks);
  const dispatch = useDispatch();
  const [identification, setIdentification] = useState("");
  const [info, setInfo] = useState([]);
  const router = useRouter();
  const closeModal = useRef(null);
  const initialState = { name: "" };
  const [data, setData] = useState(initialState);
  const disableBtn = !data.name;

  const refreshBanks = () => {
    dispatch(getBanks());
  };
  const fomat = [];
  // useEffect(() => {
  //   if (details) {
  //     fomat = details;
  //     setInfo(details);
  //     details?.map(({ label, value, _id }) => {
  //       setData({ label: label, value: value });
  //       setIdentification(_id);
  //     });
  //   }
  // }, [details]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSave = (e) => {
    const payload = { ...data };

    console.log(payload);

    info.length !== 0
      ? dispatch(
          updateBank({
            id: identification,
            payload: payload,
            refreshBanks: refreshBanks,
            closeModal: closeModal,
            setData: setData,
            data: data,
            initialState: initialState,
          })
        )
      : dispatch(
          createBank({
            payload: payload,
            refreshBanks: refreshBanks,
            closeModal: closeModal,
            setData,
            initialState,
          })
        );
  };

  return (
    <>
      <input type="checkbox" id="addBank" className=" modal-toggle " />
      <label htmlFor="addBank" className=" modal ">
        <label className=" modal-box py-10 relative w-[80%] md:w-[50%] max-w-[500px] rounded-xl z-20">
          <div className="w-[80%] mx-auto text-left">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-2xl">Add Bank</h2>
              <label
                htmlFor="addBank"
                className="btn btn-sm btn-circle bg-accent text-primary hover:text-white border-accent hover:bg-primary hover:border-none "
                onClick={() => {
                  setInfo([]);
                  setData(initialState);
                }}>
                <XIcon className="w-4" />
              </label>
            </div>
            <h3 className="font-semibold text-sm mb-2">Bank Name</h3>

            <input
              placeholder=""
              className="px-4 py-2 border border-black w-full mb-4 rounded-md"
              name="name"
              onChange={handleChange}
              value={data.name}
            />

            <button
              className={`${
                (createBankLoading && "loading") || (updateBankLoading && "loading")
              } btn  w-full disabled:bg-[#DDDDDD] disabled:text-white cursor-pointer bg-black text-white  mt-6 `}
              disabled={disableBtn}
              onClick={handleSave}>
              {info?.length !== 0 ? (updateBankLoading ? "" : "EDIT") : createBankLoading ? "" : "SAVE"}
            </button>
          </div>
        </label>
      </label>
      <label htmlFor="addBank" className="hidden" ref={closeModal} />
    </>
  );
};

export default AddBankModal;
