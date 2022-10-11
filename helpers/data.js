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
  } from "@heroicons/react/outline";
  import {
    CubeIcon as CubeIconSolid,
    CalendarIcon as CalendarIconSolid,
    UserCircleIcon as UserCircleIconSolid,
    CreditCardIcon as CreditCardIconSolid,
  } from "@heroicons/react/solid";


export const dashboardNavLinks = [
    {
      name: "listings",
      path: "/listings",
      title: "Listings",
      icon: <CubeIcon className="w-full" />,
      iconActive: <CubeIconSolid className="w-full" />,
     
    },
    
    {
      name: "clients",
      path: "/clients",
      title: "Clients",
      icon: <CalendarIcon className="w-full" />,
      iconActive: <CalendarIconSolid className="w-full" />,
     
    },
    
    {
      name: "payments",
      path: "/payments",
      title: "Payments",
      icon: <CreditCardIcon className="w-full" />,
      iconActive: <CreditCardIconSolid className="w-full" />,
     
    },
  ];