import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { createAdmin, getAdmins, updatePassword } from "../../redux/features/admin.slice";
import { XIcon } from "@heroicons/react/outline";
import { FormPassword } from "../../components";
import { errorPopUp } from "../../helpers/toastify";
import { useForm } from "react-hook-form";

const UpdateAdminModal = ({ id }) => {
  const { updatePasswordLoading } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const closeModal = useRef(null);

  const refreshConfigurations = () => {
    dispatch(getAdmins());
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data, e) => {
    e.preventDefault();

    const { oldPassword, newPassword, confirmPassword } = data;
    // const {} = data;
    if (newPassword === oldPassword) return errorPopUp({ msg: "Change password" });
    if (newPassword !== confirmPassword) return errorPopUp({ msg: "Passwords do not match" });
    if (newPassword == confirmPassword) {
      const payload = { oldPassword, newPassword, confirmPassword };

      dispatch(updatePassword({ payload, refreshConfigurations, closeModal, reset }));
    }
  };

  return (
    <>
      <input type="checkbox" id="updateadmin" className=" modal-toggle " />
      <label htmlFor="updateadmin" className=" modal ">
        <label className=" modal-box py-10 relative w-[80%] md:w-[50%] max-w-[500px] rounded-xl z-20">
          <div className="w-[80%] mx-auto text-left">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-2xl">Update Password</h2>
              <label htmlFor="updateadmin">
                <XIcon className="w-6 cursor-pointer modal-button" />
              </label>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <FormPassword
                  register={register}
                  label="Current Password"
                  name="oldPassword"
                  errors={errors}
                  errorMessage="Please add a password"
                />
                <FormPassword
                  register={register}
                  label="New Password"
                  name="newPassword"
                  errors={errors}
                  errorMessage="Please add a password"
                />
                <FormPassword
                  register={register}
                  label="Confirm New Password"
                  name="confirmPassword"
                  errors={errors}
                  errorMessage="Please add a password"
                />
              </div>
              <button className={`${updatePasswordLoading && "loading"} btn btn-block btn-primary mt-8`} type="submit">
                {updatePasswordLoading ? "" : "SAVE"}
              </button>
            </form>
          </div>
        </label>
      </label>
      <label htmlFor="updateadmin" className="hidden" ref={closeModal} />
    </>
  );
};

export default UpdateAdminModal;
