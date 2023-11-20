import { axiosClient } from '../Index';

export const createBookRating = (data) => {
  return axiosClient().post(`${process.env.API_URL}/bookrating/create`, data);
};

export const getProductRating = (id,page=1) => {
  return axiosClient().get(`${process.env.API_URL}/bookrating/book/${id}?page=${page}`);
};
