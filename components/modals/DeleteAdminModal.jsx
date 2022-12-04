import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { disapproveListing } from "../../redux/features/listings.slice";
import { deleteAdmin, getAdmins } from "../../redux/features/admin.slice";

const DeleteAdminModal = ({ id }) => {
  const { deleteAdminLoading } = useSelector((state) => state.admin);
  const closeModal = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const refreshConfigurations = () => {
    dispatch(getAdmins());
  };
  const handleDelete = () => {
    console.log(id);

    // closeModal.current.click();
    // refreshConfigurations();
    dispatch(deleteAdmin({ id, closeModal, refreshConfigurations }));
  };

  return (
    <>
      <input type="checkbox" id="deleteadmin" className=" modal-toggle " />
      <label htmlFor="deleteadmin" className=" modal ">
        <label className=" modal-box py-10 relative w-[80%] md:w-[50%] max-w-[500px] rounded-xl z-20">
          <div className="w-[80%] mx-auto text-left">
            <div className="flex justify-center mb-4 w-full">
              <label className="text-center inline-block">Are you sure you want to delete this admin?</label>
            </div>

            <div className="flex justify-center text-sm">
              <div className="flex gap-4">
                <label className="btn btn-primary w-[100px] modal-button" htmlFor="deleteadmin">
                  Cancel
                </label>
                <p
                  className={`${
                    deleteAdminLoading && "loading"
                  } btn border-[#ef4444da] hover:bg-[#ef4444da] hover:border-[#ef4444da] w-[100px] text-black`}
                  onClick={handleDelete}>
                  {deleteAdminLoading ? "" : "Delete"}
                </p>
              </div>
            </div>
          </div>
        </label>
      </label>
      <label htmlFor="deleteadmin" className="hidden" ref={closeModal} />
    </>
  );
};

export default DeleteAdminModal;
