import {
    CalendarIcon,
    ClockIcon,
    CreditCardIcon,
    CubeIcon,
    LightBulbIcon,
    LockClosedIcon,
    UserCircleIcon,
    UserGroupIcon,
    VideoCameraIcon,
    ViewGridIcon,
    DocumentTextIcon,
    //WalletIcon,
    CheckCircleIcon,
    ChevronDownIcon,
    BadgeCheckIcon,
    
  } from "@heroicons/react/outline";
  import {
    CubeIcon as CubeIconSolid,
    CalendarIcon as CalendarIconSolid,
    UserCircleIcon as UserCircleIconSolid,
    CreditCardIcon as CreditCardIconSolid,
    DocumentTextIcon as DocumentTextIconSolid,
    BadgeCheckIcon as BadgeCheckIconSolid,
  } from "@heroicons/react/solid";


export const dashboardNavLinks = [
    {
      name: "Manage Accounts",
      path: "/manage-accounts",
      title: "Manage Accounts",
      icon: <UserCircleIcon className="w-full" />,
      iconActive: <UserCircleIconSolid className="w-full" />,
     
    },
    
    {
      name: "Manage Listings",
      path: "/manage-listings",
      title: "Manage Listings",
      icon: <CubeIcon className="w-full" />,
      iconActive: <CubeIconSolid className="w-full" />,
     
    },
    
    {
      name: "Manage Bookings",
      path: "/manage-bookings",
      title: "Manage Bookings",
      icon: <CalendarIcon className="w-full" />,
    iconActive: <CalendarIconSolid className="w-full" />,
     
    },
    {
      name: "Manage Disputes",
      path: "/manage-disputes",
      title: "Manage Disputes",
      icon: <DocumentTextIcon className="w-full" />,
      iconActive: <DocumentTextIconSolid className="w-full" />,
     
    },
    {
      name: "Manage Payments",
      path: "/manage-payments",
      title: "Manage Payments",
       icon: <CreditCardIcon className="w-full" />,
      iconActive: <CreditCardIconSolid className="w-full" />,
     
    },
    {
      name: "Manage Verification",
      path: "/manage-verification",
      title: "Manage Verification",
      icon: <BadgeCheckIcon className="w-full" />,
      iconActive: <BadgeCheckIconSolid className="w-full" />,
     
    },
  ];