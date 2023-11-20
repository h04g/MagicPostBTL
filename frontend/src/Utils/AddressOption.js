export const addressOption = (addresses) => {
  return addresses.map((address) => ({
    value: address.address,
    label: address.address,
  }));
};
