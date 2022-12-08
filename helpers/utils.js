export const getValue = ({ options, key }) => {
  const item = options.find((p) => p.value == key);
  return item ? item.name : "N/A";
};

export const getValueArray = ({ options, key }) => {
  const item = {};
  let arrs = [];

  key?.map((val) => {
    item = options.find((p) => p.value == val);
    arrs = [...arrs, item];
  });

  return item ? arrs : "N/A";
};
