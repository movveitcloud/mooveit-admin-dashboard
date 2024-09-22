import {
  CalendarIcon,
  // CogSixToothIcon,
  CreditCardIcon,
  CubeIcon,
  LightBulbIcon,
  LockClosedIcon,
  UserCircleIcon,
  UserGroupIcon,
  VideoCameraIcon,
  ViewGridIcon,
  DocumentTextIcon,
  CogIcon,
  UserIcon,
  KeyIcon,
  LibraryIcon,
} from "@heroicons/react/outline";
import {
  CubeIcon as CubeIconSolid,
  CalendarIcon as CalendarIconSolid,
  UserCircleIcon as UserCircleIconSolid,
  CreditCardIcon as CreditCardIconSolid,
  DocumentTextIcon as DocumentTextIconSolid,
  BadgeCheckIcon as BadgeCheckIconSolid,
  CogIcon as CodeIconSolid,
  UserIcon as UserIconSolid,
  KeyIcon as KeyIconSolid,
  LibraryIcon as LibraryIconSolid,
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

  // {
  //   name: "Payments",
  //   path: "/payments",
  //   title: "Payments",
  //   icon: <CreditCardIcon className="w-full" />,
  //   iconActive: <CreditCardIconSolid className="w-full" />,
  // },
  {
    name: "Admin",
    path: "/admin",
    title: "Admin",
    icon: <UserIcon className="w-full" />,
    iconActive: <UserIconSolid className="w-full" />,
  },
  {
    name: "Banks",
    path: "/banks",
    title: "Banks",
    icon: <LibraryIcon className="w-full" />,
    iconActive: <LibraryIconSolid className="w-full" />,
  },
  {
    name: "Configurations",
    path: "/configurations",
    title: "Configurations",
    icon: <CogIcon className="w-full" />,
    // icon: <WrenchScrewdriverIcon className="w-full" />,
    iconActive: <CodeIconSolid className="w-full" />,
  },
  {
    name: "Settings",
    path: null,
    title: "Settings",
    icon: <KeyIcon />,
    iconActive: <KeyIconSolid className="w-full" />,
    subMenus: [
      {
        path: "/update-password",
        title: "Update-password",
      },
      {
        path: "/update-profile",
        title: "Update-profile",
      },
    ],
  },
];
export const storageKinds = [
  { name: "Garage & Lock Up", value: "garage&lockup" },
  { name: "Self-storage Unit", value: "selfStorageUnit" },
  { name: "Warehouse", value: "warehouse" },
  { name: "Outhouse & Shed", value: "outhouse&shed" },
  { name: "Spare Room", value: "spareRoom" },
  { name: "Basement", value: "basement" },
  { name: "Loft", value: "loft" },
  { name: "Busines Storage", value: "businessStorage" },
  { name: "Motor Bike Storage", value: "motorBikeStorage" },
];

export const storageFloors = [
  { name: "Ground Level", value: "groundLevel" },
  { name: "1st Floor", value: "1stFloor" },
  { name: "2nd Floor", value: "2ndFloor" },
  { name: "3rd Floor or Higher", value: "3rdFloorOrHigher" },
  { name: "Below Ground", value: "belowGround" },
  { name: "Multiple Floors", value: "multipleFloors" },
];
export const storageFeatures = [
  { name: "CCTV", value: "cctv" },
  { name: "Alarm", value: "alarm" },
  { name: "Padlock", value: "padlock" },
  { name: "Onsite Staff", value: "onsiteStaff" },
];
export const whenAccessListing = [
  { name: "Any Time", value: "anyTime" },
  { name: "Prior Notice Only", value: "priorNotice" },
  { name: "Specific Time", value: "specificTime" },
  { name: "Drop Off Only", value: "dropOff" },
];
export const howAccessListing = [
  { name: "Key", value: "key" },
  { name: "Pin Code", value: "pinCode" },
  { name: "Fingerprint Scanner", value: "fingerprint" },
  { name: "Access is granted at any time", value: "anytime" },
];
export const spaceDuration = [
  { name: "No Minimum", value: "noMinimum" },
  { name: "1 month", value: "1month" },
  { name: "2 months", value: "2months" },
  { name: "3 months", value: "3months" },
  { name: "6 months", value: "6months" },
  { name: "12 months", value: "12months" },
  { name: "more than 12 months", value: "moreThan12months" },
];
export const arrivalNoticeOpts = [
  { name: "No Notice", value: "noNotice" },
  { name: "1 day", value: "1day" },
  { name: "2 days", value: "2days" },
  { name: "3 days", value: "3days" },
  { name: "7 days", value: "7days" },
];
export const storageSize = [
  { name: "9 sq ft - 3ft High locker", value: "9-3" },
  { name: "25 sq ft - Small Garden Shed Size", value: "25" },
  { name: "35 sq ft - Standard Garden Shed Size", value: "35" },
  { name: "50 sq ft - Transit Van Size", value: "50" },
  { name: "75 sq ft - Luton Van Size", value: "75" },
  {
    name: "125 sq ft - Large Single Garage or 7 Tonne Lorry",
    value: "125 sq ft - Large Single Garage or 7 Tonne Lorry",
  },
  {
    name: "150 sq ft - One and Half garages or 2 Luton Van Loads",
    value: "150 sq ft - One and Half garages or 2 Luton Van Loads",
  },
];
