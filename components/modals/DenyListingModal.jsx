import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { disapproveListing } from "../../redux/features/listings.slice";

const DenyListingModal = ({ id }) => {
  const { disapproveListingLoading } = useSelector((state) => state.listing);

  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const router = useRouter();

  const handleDisapprove = () => {
    const payload = {
      status: "disapproved",
      message: value,
    };
    if (value != "") {
      dispatch(disapproveListing({ id: id, payload: payload }));
      router.push("/listings");
    }
  };

  return (
    <>
      <input type="checkbox" id="deny" className=" modal-toggle " />
      <label htmlFor="deny" className=" modal ">
        <label className=" modal-box py-10 relative w-[80%] md:w-[50%] max-w-[500px] rounded-xl z-20">
          <div className="w-[80%] mx-auto text-left">
            <div className="flex justify-center mb-4 w-full">
              <label className="text-center inline-block">Why do you want to delete this listing?</label>
            </div>
            <div className="flex justify-center mb-5 w-full">
              <input
                type="text"
                className=" bg-slate-100 rounded-md w-full h-10 outline-none p-5"
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
            </div>

            <div className="flex justify-center text-sm">
              <div className="flex gap-4">
                <label className="btn btn-primary w-[100px] modal-button" htmlFor="deny">
                  Cancel
                </label>
                <p
                  className={`${
                    disapproveListingLoading && "loading"
                  } btn border-[#ef4444da] hover:bg-[#ef4444da] hover:border-[#ef4444da] w-[100px] text-black`}
                  onClick={handleDisapprove}>
                  {disapproveListingLoading ? "" : "Deny"}
                </p>
              </div>
            </div>
          </div>
        </label>
      </label>
      <label htmlFor="deny" className="hidden" />
    </>
  );
};

export default DenyListingModal;
