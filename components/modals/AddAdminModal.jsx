import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { uploadConfiguration, getConfigurations } from "../../redux/features/configurations.slice";
import { createAdmin, getAdmins } from "../../redux/features/admin.slice";
import { XIcon } from "@heroicons/react/outline";
import { FormInput, FormPassword, AuthLayout } from "../../components";
import { errorPopUp } from "../../helpers/toastify";
import { useForm } from "react-hook-form";
import { BeatLoader, CircleLoader, PulseLoader, RingLoader, RotateLoader } from "react-spinners";
import Link from "next/link";

const AddAdminModal = () => {
  const { createAdminLoading } = useSelector((state) => state.admin);
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

    const { password, confirmPassword, email, firstName, lastName } = data;
    // const {} = data;
    if (password !== confirmPassword) return errorPopUp({ msg: "Passwords do not match" });
    if (password == confirmPassword) {
      const payload = { email, firstName, lastName, password };

      dispatch(createAdmin({ payload, refreshConfigurations, closeModal, reset }));
    }
  };

  return (
    <>
      <input type="checkbox" id="addadmin" className=" modal-toggle " />
      <label htmlFor="addadmin" className=" modal ">
        <label className=" modal-box py-10 relative w-[80%] md:w-[50%] max-w-[500px] rounded-xl z-20">
          <div className="w-[80%] mx-auto text-left">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-2xl">Add Admin</h2>
              <label htmlFor="addadmin">
                <XIcon className="w-6 cursor-pointer modal-button" />
              </label>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <FormInput
                  label="Email Address"
                  name="email"
                  type="email"
                  register={register}
                  errors={errors}
                  errorMessage="Please add an email address"
                />
                <FormInput
                  label="First Name"
                  name="firstName"
                  type="text"
                  register={register}
                  errors={errors}
                  errorMessage="Please add your first name"
                />
                <FormInput
                  label="Last Name"
                  name="lastName"
                  type="text"
                  register={register}
                  errors={errors}
                  errorMessage="Please add your last name"
                />
                <FormPassword
                  register={register}
                  label="Password"
                  name="password"
                  errors={errors}
                  errorMessage="Please add a password"
                />
                <FormPassword
                  register={register}
                  label="Confirm Password"
                  name="confirmPassword"
                  errors={errors}
                  errorMessage="Please add a password"
                />
              </div>

              <button className={`${createAdminLoading && "loading"} btn btn-block btn-primary mt-8`} type="submit">
                {createAdminLoading ? "" : "SAVE"}
              </button>
            </form>
          </div>
        </label>
      </label>
      <label htmlFor="addadmin" className="hidden" ref={closeModal} />
    </>
  );
};

export default AddAdminModal;
