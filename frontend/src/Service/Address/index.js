import { axiosClient } from '../Index';

export const createAddress = (data) => {
  return axiosClient().post(`${process.env.API_URL}/address/create`, data);
};

export const updateAddress = (id, editedAddress) => {
  return axiosClient().put(
    `${process.env.API_URL}/address/${id}`,
    editedAddress,
  );
};

export const deleteAddress = (id) => {
  return axiosClient().delete(`${process.env.API_URL}/address/${id}`);
};

export const getAddress = () => {
  return axiosClient().get(`${process.env.API_URL}/address/user`);
};
export const getAddressById = () => {
  return axiosClient().get(`${process.env.API_URL}/address/${id}`);
};

export const getAllAddressByUser = async () => {
  return axiosClient().get(`${process.env.API_URL}/address/user`);
};
