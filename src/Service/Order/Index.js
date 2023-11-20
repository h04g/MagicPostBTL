import { axiosClient } from '../Index';

export const orderCreate = (order) => {
  return axiosClient().post(`${process.env.API_URL}/order/create`, order);
};

export const getOrderById = (id) => {
  return axiosClient().get(`${process.env.API_URL}/order/${id}`);
};

export const getAllOrder = (page) => {
  return axiosClient().get(
    `${process.env.API_URL}/order${page ? `?page=${page}` : ''}`,
  );
};

export const getOrderByStatus = (status, page) => {
  return axiosClient().get(
    `${process.env.API_URL}/order/status/${status}${
      page ? `?page=${page}` : ''
    }`,
  );
};

export const cancelOrder = (id) => {
  return axiosClient().put(`${process.env.API_URL}/order/cancel/${id}`);
};

export const updateStatus = (id) => {
  return axiosClient().put(`${process.env.API_URL}/order/status/${id}`);
};

export const getOrderStore = (page) => {
  return axiosClient().get(
    `${process.env.API_URL}/orderStore${page ? `?page=${page}` : ''}`,
  );
};
