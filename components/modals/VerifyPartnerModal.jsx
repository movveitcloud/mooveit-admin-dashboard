import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, verifyUser } from "../../redux/features/users.slice";
import { getSingleUser } from "../../redux/features/users.slice";
import { XIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";

const VerifyParnerModal = ({ isAdminVerified, Id, query }) => {
  const dispatch = useDispatch();
  const closeModal = useRef(null);
  const { verifyUserLoading } = useSelector((state) => state.user);
  const refreshUsers = () => {
    if (query) {
      dispatch(getSingleUser({ id: query }));
    }
  };

  const handleVerify = () => {
    const payload = { isAdminVerified: true };
    dispatch(verifyUser({ id: Id, payload, refreshUsers, closeModal }));
  };
  const handleDisVerify = () => {
    const payload = { isAdminVerified: false };
    dispatch(verifyUser({ id: Id, payload, refreshUsers, closeModal }));
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
                className="btn btn-sm btn-circle bg-accent text-primary hover:text-white border-accent hover:bg-primary hover:border-none  ">
                <XIcon className="w-4 " />
              </label>
            </div>

            <div className="flex justify-start mb-8 w-full">
              <p className="text-start inline-block">
                Are you sure you want to {isAdminVerified === true ? "disverify" : "verify"} this partner?
              </p>
            </div>

            <div className="flex justify-center text-sm">
              <div className="flex gap-4">
                <label className="btn btn-primary w-[100px] modal-button" htmlFor="verifypartner">
                  Cancel
                </label>
                <p
                  className={`${
                    verifyUserLoading && "loading"
                  } btn border-accent hover:bg-accent hover:border-accent w-[100px] text-black`}
                  onClick={isAdminVerified === true ? handleDisVerify : handleVerify}>
                  {verifyUserLoading ? "" : isAdminVerified === true ? "DISVERIFY" : "VERIFY"}
                </p>
              </div>
            </div>

            {/* <button
              className={`${verifyUserLoading && "loading"} btn  w-full  cursor-pointer bg-black text-white  mt-6 `}
              onClick={isAdminVerified === true ? handleDisVerify : handleVerify}>
              {verifyUserLoading ? (
                ""
              ) : isAdminVerified === true ? (
                <div>DISVERIFY ACCOUNT</div>
              ) : (
                <div>VERIFY ACCOUNT</div>
              )}
            </button> */}
          </div>
        </label>
      </label>
      <label htmlFor="verifypartner" className="hidden" ref={closeModal} />
    </>
  );
};

export default VerifyParnerModal;
