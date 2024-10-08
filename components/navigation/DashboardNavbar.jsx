import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { KeyIcon, LogoutIcon } from "@heroicons/react/outline";
import { authenticatedUser, logout } from "../../redux/features/auth.slice";
import { dashboardNavLinks } from "../../helpers/data";
import { DashboardNavAccordion } from "../../components";
// import UpdateAdminModal from "../modals/UpdateAdminModal";
// import AdditionalServiceModal from "../modals/AdditionalServiceModals";

const DashboardNavbar = ({ pathname }) => {
  const [adminData, setAdminData] = useState(null);
  const dispatch = useDispatch();
  const { admin } = useSelector((state) => state.auth);
  const { admins } = useSelector((state) => state.admin);

  const handleLogout = () => {
    dispatch(logout());
    location.assign("/");
  };

  useEffect(() => {
    if (authenticatedUser()) {
      setAdminData(authenticatedUser());
    }
  }, [admin]);

  return (
    <div className="flex flex-col justify-between h-full relative py-6 overflow-y-auto  ">
      <div>
        <div className="flex justify-between items-center gap-2 p-3 mx-5 lg:mx-8">
          <img src="/logo.png" alt="Mooveit" className="max-h-7" />
        </div>

        <div className="flex flex-col mt-8">
          {dashboardNavLinks?.map(({ path, title, icon, iconActive, permission, subMenus }, i) =>
            //  permission.includes(userData?.role) &&
            subMenus ? (
              <DashboardNavAccordion
                key={title}
                path={path}
                pathname={pathname}
                title={title}
                icon={icon}
                iconActive={iconActive}
                subMenus={subMenus}
                // userData={userData}
              />
            ) : (
              <a
                key={i}
                href={path}
                className={`flex gap-5 items-center px-7 lg:pl-10 lg:pr-5 py-2 mb-2 w-full hover:text-primary cursor-pointer ${
                  pathname?.includes(path) ? "text-primary font-semibold border-r-2 border-primary" : "text-[#959595]"
                }`}>
                <p className="w-6">{pathname?.includes(path) ? iconActive : icon}</p>
                <h2 className="text-sm">{title}</h2>
              </a>
            )
          )}
        </div>
      </div>

      <div
        className="flex justify-between item gap-2 border-t border-[#efefef] pt-7 mx-5 lg:mx-8 text-sm cursor-pointer dropdown dropdown-top"
        tabIndex="0">
        <div className="flex gap-4 items-center">
          <span className="w-8 h-8 rounded-full bg-[#C4C4C4]">
            {adminData && (
              <img
                src={adminData.profilePicture}
                alt={adminData.firstName}
                className="rounded-full object-cover h-full w-full"
                placeholder="blur"
                // blurDataURL="/dummyAvatar.svg"
                // layout="fill"
                // objectFit="cover"
                // objectPosition="center"
              />
            )}
          </span>
          <div>
            <h2 className="text-[#222222]">
              {adminData?.firstName} {adminData?.lastName}
            </h2>
            <h2 className="text-xs text-[#AAAAAA]">{`${adminData?.email.slice(0, 22)}${
              adminData?.email.length > 22 ? "..." : ""
            }`}</h2>
          </div>
        </div>
        <ChevronDownIcon className="w-4" />

        {/* dropdown content */}
        <ul tabIndex="0" className="dropdown-content menu mb-3 p-2 w-full border shadow bg-base-100 divide-y ">
          {/* <li className="hover:text-primary">
            <label htmlFor="updateadmin">
              <div className="flex justify-start gap-3 items-center w-full">
                <KeyIcon className="w-6 h-6" />
                <p>Update password</p>
              </div>
            </label>
          </li>
          <li className="hover:text-primary">
            <label htmlFor="additionalservices">
              <div className="flex justify-start gap-3 items-center w-full">
                <KeyIcon className="w-6 h-6" />
                <p>Update password</p>
              </div>
            </label>
          </li> */}
          <li className="hover:text-primary" onClick={handleLogout}>
            <span>
              <LogoutIcon className="w-6 h-6" /> Log out
            </span>
          </li>
        </ul>
        {/* <UpdateAdminModal /> */}
        {/* dropdown content */}
      </div>
      {/* <AdditionalServiceModal /> */}
    </div>
  );
};

export default DashboardNavbar;
