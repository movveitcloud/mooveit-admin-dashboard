import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { uploadConfiguration, getConfigurations } from "../../redux/features/configurations.slice";
import { createAdmin } from "../../redux/features/admin.slice";
import { XIcon } from "@heroicons/react/outline";
import { FormInput, FormPassword, AuthLayout } from "../../components";
import { errorPopUp } from "../../helpers/toastify";
import { useForm } from "react-hook-form";
import Link from "next/link";

const AddAdminModal = () => {
  const { configurations } = useSelector((state) => state.configuration);
  const dispatch = useDispatch();
  const closeModal = useRef(null);
  const [id, setId] = useState("");
  const [storagefloor, setStoragefloor] = useState("");
  const router = useRouter();
  const disableBtn = !storagefloor;

  const refreshConfigurations = () => {
    dispatch(getConfigurations());
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
      const payload = { password, email, firstName, lastName };
      console.log(payload);
      // dispatch(createAdmin({ payload }));
    }
  };

  useEffect(() => {
    configurations?.map(({ _id }) => setId(_id));
  }, [configurations]);
  const handleSave = (e) => {
    const payload = {
      storageFloor: storagefloor,
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

            {/* <label className=" font-semibold">Email Address</label>
            <input
              placeholder=""
              className="px-4 py-2 border  border-black w-full my-4 rounded-md"
              onChange={(e) => setStoragefloor(e.target.value)}
            />
            <label className=" font-semibold">Password</label>
            <input
              placeholder=""
              className="px-4 py-2 border border-black w-full my-4 rounded-md"
              onChange={(e) => setStoragefloor(e.target.value)}
            />
            <label className=" font-semibold">Confirm Password</label>
            <input
              placeholder=""
              className="px-4 py-2 border border-black w-full my-4 rounded-md"
              onChange={(e) => setStoragefloor(e.target.value)}
            /> */}

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

              {/* <button className={`${loading && "loading"} btn btn-block btn-primary mt-8`} type="submit">
                {loading ? "" : "Log in"}
              </button> */}

              <button
                type="submit"
                className="btn w-full disabled:bg-[#DDDDDD] disabled:text-white cursor-pointer bg-black text-white  mt-6"
                // disabled={disableBtn}
                // onClick={handleSave}
              >
                SAVE
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
