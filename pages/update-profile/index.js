import React, { useEffect, useRef, useState } from "react";
import { PencilIcon } from "@heroicons/react/solid";
import { errorPopUp } from "../../helpers/toastify";
import Accordion from "../../components/shared/Accordion";
import { useDispatch, useSelector } from "react-redux";
import { authenticatedUser, updateProfileImage } from "../../redux/features/auth.slice";
import { FadeLoader } from "react-spinners";
import Image from "next/image";
import { DashboardLayout } from "../../components";
import { updateProfile } from "../../redux/features/auth.slice";

const UpdateProfile = () => {
  const [adminData, setAdminData] = useState(null);
  const initialState = {
    profilePicture: "",
    firstName: "",
    lastName: "",
    email: "",
  };
  const [formDetails, setFormDetails] = useState(initialState);
  const { firstName, lastName, email, profilePicture } = formDetails;
  const { profilePictureLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const adminDetail = authenticatedUser();
  const profilePic = useRef(null);
  // console.log(adminDetail);

  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    const maxAllowedSize = 0.2 * 1024 * 1024; //200KB calculation

    if (file) {
      if (file.size > maxAllowedSize) return errorPopUp({ msg: "image should not be more than 200KB" });
      const formData = new FormData();
      if (formData) {
        formData.append("profilePicture", file);
        dispatch(
          updateProfileImage({
            payload: formData,
            id: adminDetail?._id,
            setFormDetails,
            formDetails,
          })
        );
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };
  const details = authenticatedUser();

  const { updateProfileLoading, admin } = useSelector((state) => state.auth);
  const getDetails = () => {
    setFormDetails({
      ...formDetails,
      profilePicture: details.profilePicture || "",
      firstName: details.firstName,
      lastName: details.lastName,
      email: details.email,
    });
  };

  useEffect(() => {
    getDetails();
  }, [admin]);

  const handleUpdate = () => {
    const payload = {
      firstName,
      lastName,
      email,
      profilePicture,
    };

    dispatch(updateProfile({ payload, id: details?._id }));
  };

  return (
    <Accordion title="personal details" open>
      <DashboardLayout name="Personal Details">
        <div className="space-y-6">
          <div
            className="w-[100px] h-[100px] rounded-full bg-[#C4C4C4] relative cursor-pointer"
            onClick={() => profilePic.current.click()}>
            <img
              src={formDetails.profilePicture || "/dummyAvatar.svg"}
              alt="profile picture"
              className="rounded-full flex justify-center align-middle text-center object-cover h-full w-full  items-center"
              placeholder="blur"
              // blurDataURL="/dummyAvatar.svg"
              // layout="fill"
              // objectFit="cover"
              // objectPosition="center"
            />
            {profilePictureLoading ? (
              <span className="absolute top-0 bottom-0 right-0 left-0 grid place-items-center shadow rounded-full bg-primary bg-opacity-30">
                <FadeLoader loading={profilePictureLoading} color="#EDCC5B" height={10} width={4} />
              </span>
            ) : (
              ""
            )}
            <input
              type="file"
              className="hidden"
              accept="image/*"
              multiple={false}
              ref={profilePic}
              onChange={handleImageUpload}
            />

            <div className="flex items-center justify-center absolute bottom-3 -right-1 w-8 h-8 bg-accent rounded-full">
              <PencilIcon className="w-4 text-primary" />
            </div>
          </div>

          <div className="flex gap-3 sm:gap-6">
            <div className="w-full">
              <h3 className="mb-3">First Name</h3>
              <div className="items-center border border-[#959595] rounded-lg px-3 sm:px-4 py-3 w-full">
                <input
                  type="text"
                  name="firstName"
                  value={formDetails.firstName}
                  onChange={handleChange}
                  placeholder="Enter first name"
                  className="w-full bg-transparent h-full outline-none placeholder:text-[#959595]"
                />
              </div>
            </div>
            <div className="w-full">
              <h3 className="mb-3">Last Name</h3>
              <div className="items-center border border-[#959595] rounded-lg px-3 sm:px-4 py-3">
                <input
                  type="text"
                  name="lastName"
                  value={formDetails.lastName}
                  onChange={handleChange}
                  placeholder="Enter last name"
                  className="w-full bg-transparent h-full outline-none placeholder:text-[#959595]"
                />
              </div>
            </div>
          </div>

          <div className="w-full">
            <h3 className="mb-3">Email</h3>
            <div className="items-center border border-[#959595] rounded-lg px-3 sm:px-4 py-3 hover:cursor-not-allowed">
              <input
                type="email"
                name="email"
                value={formDetails.email}
                onChange={handleChange}
                disabled
                placeholder="Enter email address"
                className="w-full bg-transparent h-full outline-none placeholder:text-[#959595] cursor-not-allowed disabled:text-[#959595]"
              />
            </div>
          </div>

          <div className="flex justify-end my-8">
            <div className="flex gap-4">
              <button
                className="btn btn-outline btn-primary hover:btn-accent md:w-[175px] font-normal normal-case"
                onClick={getDetails}>
                Discard Changes
              </button>
              <button
                className={`${
                  updateProfileLoading ? "loading" : ""
                } btn btn-primary md:w-[175px] font-normal normal-case`}
                onClick={handleUpdate}>
                {updateProfileLoading ? "" : "Update Profile"}
              </button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </Accordion>
  );
};

export default UpdateProfile;
