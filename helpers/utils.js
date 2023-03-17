export const getValue = ({ options, key, list }) => {
  const item = options.find((p) => p.value == key);
  console.log(key);
  return item ? item.label : "N/A";
};
export const getService = ({ options, key, name }) => {
  let service = "";
  const item = key?.map((p) => {
    if (p == name) {
      service = "true";
    }
  });

  return item ? service : "N/A";
};
export const formatMoney = (value, currency = "GBP", locale = "en-GB") => {
  value = Number(value);
  const formatter = new Intl.NumberFormat(locale, { style: "currency", currency });
  return formatter.format(value);
};

export const getValueArray = ({ options, key }) => {
  const item = {};
  let arrs = [];
  console.log(key);
  key?.map((val) => {
    console.log(val);
    item = options.find((p) => p.value == val);
    arrs = [...arrs, item];
  });

  return item ? item.label : "N/A";
};
