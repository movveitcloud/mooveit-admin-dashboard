import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { DashboardLayout, Tabs } from "../../components";
import AddBankModal from "../../components/modals/AddBankModal";
import { useDispatch, useSelector } from "react-redux";
import { getBanks } from "../../redux/features/banks.slice";
import BanksLayout from "../../components/layouts/BankLayout";

const Banks = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { banks } = useSelector((state) => state.banks);
  const bankFetched = useRef(false);

  const tabItems = [
    { name: "Banks", count: banks.length },
    // { name: "Currencies", count: 0 },
  ];
  const dispatch = useDispatch();

  useEffect(() => {
    if (!bankFetched.current) {
      dispatch(getBanks());
      bankFetched.current = true;
    }
  }, [dispatch]);

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabItems={tabItems} />
        <div className="bg-white p-8 shadow">
          <div className="flex justify-end">
            <label
              htmlFor={activeTab === 0 ? "addBank" : "addcurrency"}
              className="border cursor-pointer  p-2 py-3 mr-4 bg-white whitespace-nowrap rounded-md text-sm ">
              {activeTab === 0 ? " + Add New Bank" : " + Add Currency"}
            </label>
          </div>
          <AddBankModal />

          <div className="my-6">
            <BanksLayout />
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Banks;
