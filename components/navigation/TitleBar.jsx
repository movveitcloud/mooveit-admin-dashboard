import { motion, AnimatePresence } from "framer-motion";
import { BellIcon, MenuAlt3Icon } from "@heroicons/react/outline";
import DashboardNavbar from "./DashboardNavbar";

const TitleBar = ({ pageTitle, pathname, menuOpen, setMenuOpen }) => {
  return (
    <div className="py-5 px-4 lg:px-8 lg:py-5 w-full border-b">
      <div className="flex justify-between items-center gap-4">
        <h1 className="font-semibold text-xl">{`Manage ${pageTitle}`}</h1>
        <div className="flex items-center gap-6">
          <div className="justify-center items-center border border-[#FEF08A] rounded p-3 cursor-pointer hidden sm:flex">
            <BellIcon className="w-6 text-[#222222]" />
          </div>
        </div>

        <MenuAlt3Icon className="lg:hidden w-8 text-black cursor-pointer" onClick={() => setMenuOpen(true)} />
      </div>

      {/* mobile menu start */}
      {menuOpen && (
        <div
          className="fixed left-0 right-0 bottom-0 h-screen w-full lg:hidden bg-[#0000003d] z-[99999]"
          onClick={() => setMenuOpen(false)}>
          <AnimatePresence>
            <motion.div
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              exit={{ x: -100 }}
              className="fixed top-0 left-0 bg-white h-screen"
              onClick={(e) => e.stopPropagation()}>
              <DashboardNavbar pathname={pathname} />
            </motion.div>
          </AnimatePresence>
        </div>
      )}
      {/* mobile menu end */}
    </div>
  );
};

export default TitleBar;
