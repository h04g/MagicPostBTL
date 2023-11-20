export const handleConvertValue = (value) => {
  let result = [];
  value.map((item) => {
    result.push(item.value);
  });
  return result;
};
