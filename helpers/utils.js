export const getValue = ({ options, key, list }) => {
  const item = options.find((p) => p.value == key);

  return item ? item.label : "N/A";
};

export const getValueArray = ({ options, key }) => {
  const item = {};
  let arrs = [];
  console.log(key);
  key?.map((val) => {
    item = options.find((p) => p.value == val);
    arrs = [...arrs, item];
    console.log(arrs);
  });
  console.log(item);

  return item ? item.label : "N/A";
};
