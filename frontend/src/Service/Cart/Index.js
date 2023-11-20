import { axiosClient } from '../Index';

export const addCart = (cart) => {
  return axiosClient().post(`${process.env.API_URL}/cart/create`, cart);
};
export const getCarts = () => {
  return axiosClient().get(`${process.env.API_URL}/cart`);
};

export const updateCart = (cart, id) => {
  return axiosClient().put(`${process.env.API_URL}/cart/${id}`, cart);
};

export const deleteCart = (id) => {
  return axiosClient().delete(`${process.env.API_URL}/cart/${id}`);
};
