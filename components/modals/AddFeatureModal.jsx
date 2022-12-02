import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { uploadConfiguration, getConfigurations } from "../../redux/features/configurations.slice";
import axios from "axios";

import { uploadConfigurationImage } from "../../redux/features/configurations.slice";
import { PhotographIcon, XIcon } from "@heroicons/react/outline";
import { errorPopUp } from "../../helpers/toastify";

const AddFeatureModal = () => {
  const { configurations } = useSelector((state) => state.configuration);
  const { disapproveListingLoading } = useSelector((state) => state.listing);
  const { uploadImageLoading } = useSelector((state) => state.configuration);
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [featurename, setFeaturename] = useState("");
  const [imageupload, setImageupload] = useState("");
  const closeModal = useRef(null);
  const router = useRouter();
  const [image, setImage] = useState("");
  const disableBtn = !featurename || !image;
  const API = axios.create({ baseURL: process.env.BASE_URL });

  const refreshConfigurations = () => {
    dispatch(getConfigurations());
  };
  useEffect(() => {
    configurations?.map(({ _id }) => setId(_id));
  }, [configurations]);

  // console.log(uploadImageLoading);
  // console.log(id);

  // const handleDisapprove = () => {
  //   const payload = {
  //     status: "disapproved",
  //     message: value,
  //   };
  //   if (value != "") {
  //     dispatch(disapproveListing({ id: id, payload: payload }));
  //     router.push("/listings");
  //   }
  // };
  const handleSave = () => {
    const payload = {
      name: featurename,
      image: imageupload,
    };
    console.log(payload);
    dispatch(
      uploadConfiguration({
        id: id,
        payload: payload,
        refreshConfigurations: refreshConfigurations,
        closeModal: closeModal,
      })
    );
  };
  const formData = new FormData();
  formData.append("kkk", "kkk");
  console.log(formData);
  for (let [key, value] of formData.entries()) {
    console.log(`${key}:${value}`);
  }

  const handleChange = async (e) => {
    let img = e.target.files[0];
    setImage(img);

    const formData = new FormData();
    if (formData) {
      formData.append("id", "id");
      formData.append("key", "media");
      formData.append("media", img);
    }

    console.log(formData);
    console.log(img);
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:${value}`);
    }
    try {
      const headers = {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("admin")).token}`,
        "Content-Type": "multipart/formdata",
      };
      const response = await API({
        method: "patch",
        url: `/admin/configurations/${id}/upload`,
        headers: headers,
        data: formData,
      });
      console.log(response.data.data);
      setImageupload(response.data.data);
      return response.data.data;

      // setFormDetails({ ...formDetails, image: response.data.data });
    } catch (error) {
      console.log(error);
    }
    // });
  };
  // const handleChange = (e) => {
  //   const img = e.target.files[0];

  //   setImage(img);
  //   console.log(img);
  //   const payload = { media: img, key: "media" };

  //   dispatch(uploadConfigurationImage({ id, payload }));
  //   if (img.size > 1000) {
  //     setImage("");
  //     errorPopUp({ msg: "Image greater than 1mb" });
  //   }
  //   if (img.size <= 1000 && (img.type == "image/png" || img.type == "image/jpeg" || imgtype == "image/svg")) {
  //     setImage(img);
  //   } else {
  //     errorPopUp({ msg: "Image type not compatible" });
  //     setImage("");
  //   }
  // };

  return (
    <>
      <input type="checkbox" id="addfeature" className=" modal-toggle " />
      <label htmlFor="addfeature" className=" modal ">
        <label className=" modal-box py-10 relative w-[80%] md:w-[50%] max-w-[500px] rounded-xl z-20">
          <div className="w-[80%] mx-auto text-left">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-2xl">Add Feature</h2>
              <label htmlFor="addfeature">
                <XIcon className="w-6 cursor-pointer modal-button" />
              </label>
            </div>
            <h3 className="font-bold text-sm mb-2">Feature</h3>

            <input
              placeholder="Enter Feature..."
              className="px-4 py-2 border border-black w-full mb-4 rounded-md"
              onChange={(e) => setFeaturename(e.target.value)}
            />
            <h3 className="font-bold text-sm mb-2 ">Feature's Icon</h3>
            <p className="mb-2 text-xs">Only files in png,jpeg and svg formats will be recognized. Max 1mb</p>
            <div className="flex items-center">
              <div className="mr-3 flex items-center bg-[#F7F7F7] p-4 w-1/5 justify-center">
                {imageupload !== "" ? (
                  <img src={imageupload} className="w-full h-full" alt="Feature Image" />
                ) : (
                  <PhotographIcon className="w-8" />
                )}
              </div>

              <label
                htmlFor="upload"
                className="btn btn-white text-black border-3 border-accent w-[175px] hover:btn-accent ">
                UPLOAD ICON
              </label>
              <input
                id="upload"
                type="file"
                placeholder="UPLOAD ICON"
                onChange={(e) => handleChange(e)}
                className="hidden"
              />
            </div>
            <button
              className="btn w-full disabled:bg-[#DDDDDD] disabled:text-white cursor-pointer bg-black text-white  mt-6"
              disabled={disableBtn}
              onClick={handleSave}>
              SAVE
            </button>
          </div>
        </label>
      </label>
      <label htmlFor="addfeature" className="hidden" ref={closeModal} />
    </>
  );
};

export default AddFeatureModal;
