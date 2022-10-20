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
    name: "Accounts",
    path: "/accounts",
    title: "Accounts",
    icon: <UserCircleIcon className="w-full" />,
    iconActive: <UserCircleIconSolid className="w-full" />,
  },

  {
    name: "Listings",
    path: "/listings",
    title: "Listings",
    icon: <CubeIcon className="w-full" />,
    iconActive: <CubeIconSolid className="w-full" />,
  },

  {
    name: "Bookings",
    path: "/bookings",
    title: "Bookings",
    icon: <CalendarIcon className="w-full" />,
    iconActive: <CalendarIconSolid className="w-full" />,
  },
  {
    name: "Disputes",
    path: "/disputes",
    title: "Disputes",
    icon: <DocumentTextIcon className="w-full" />,
    iconActive: <DocumentTextIconSolid className="w-full" />,
  },
  {
    name: "Payments",
    path: "/payments",
    title: "Payments",
    icon: <CreditCardIcon className="w-full" />,
    iconActive: <CreditCardIconSolid className="w-full" />,
  },
  {
    name: "Verification",
    path: "/verification",
    title: "Verification",
    icon: <BadgeCheckIcon className="w-full" />,
    iconActive: <BadgeCheckIconSolid className="w-full" />,
  },
];
