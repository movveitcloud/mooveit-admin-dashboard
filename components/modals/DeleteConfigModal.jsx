import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { disapproveListing } from "../../redux/features/listings.slice";
import { deleteAdmin, getAdmins } from "../../redux/features/admin.slice";
import { deleteConfiguration, getFeatures, getType, getFloor } from "../../redux/features/configurations.slice";

const DeleteConfigModal = ({ id, config, refresh }) => {
  const { deleteConfigurationsLoading } = useSelector((state) => state.configuration);
  const [Id, setId] = useState("");
  const closeModal = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();
  // console.log(id);
  // console.log(config);

  useEffect(() => {
    setId(id);
  }, []);

  const refreshConfigurations = () => {
    dispatch(refresh({ config: config }));
  };
  const handleDelete = () => {
    // closeModal.current.click();
    // refreshConfigurations();

    if (id) {
      dispatch(deleteConfiguration({ id, config: config, closeModal, refreshConfigurations }));
    }
  };

  return (
    <>
      <input type="checkbox" id={id} className=" modal-toggle " />
      <label htmlFor={id} className=" modal ">
        <label className=" modal-box py-10 relative w-[80%] md:w-[50%] max-w-[500px] rounded-xl z-20">
          <div className="w-[80%] mx-auto text-left">
            <div className="flex justify-center mb-4 w-full">
              <label className="text-center inline-block">Are you sure you want to delete this configuration?</label>
            </div>

            <div className="flex justify-center text-sm">
              <div className="flex gap-4">
                <label className="btn btn-primary w-[100px] modal-button" htmlFor={id}>
                  Cancel
                </label>
                <p
                  className={`${
                    deleteConfigurationsLoading && "loading"
                  } btn border-[#ef4444da] hover:bg-[#ef4444da] hover:border-[#ef4444da] w-[100px] text-black`}
                  onClick={handleDelete}>
                  {deleteConfigurationsLoading ? "" : "DELETE"}
                </p>
              </div>
            </div>
          </div>
        </label>
      </label>
      <label htmlFor={id} className="hidden" ref={closeModal} />
    </>
  );
};

export default DeleteConfigModal;
