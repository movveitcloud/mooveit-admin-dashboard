const Tabs = ({ activeTab, setActiveTab, tabItems }) => {
  return (
    <nav className="flex gap-5 w-full mt-2 mb-8 overflow-x-auto hide-scrollbar">
      {tabItems?.map(({ name, count }, i) => (
        <p
          key={i}
          className={`${
            activeTab === i ? " bg-accent text-primary" : " bg-[#DDDDDD] text-[#959595]"
          } btn border-0 hover:bg-accent hover:text-primary text-[.8rem] tracking-tight`}
          onClick={() => setActiveTab(i)}>
          {name}

          <span
            className={`${
              activeTab === i ? " text-white bg-primary" : " bg-[#c1bfbf] text-white"
            } rounded-full py-1 px-2 text-[.5rem] lg:text-[.7rem] ml-4 `}>
            {count}
          </span>
        </p>
      ))}
    </nav>
  );
};

export default Tabs;
