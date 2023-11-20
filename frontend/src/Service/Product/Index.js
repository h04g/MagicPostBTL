import { axiosClient } from '../Index';

export const addProduct = (product) => {
  return axiosClient().post(`${process.env.API_URL}/book/create`, product);
};

export const getProductByStoreId = (id, page = 1) => {
  return axiosClient().get(
    `${process.env.API_URL}/book/store/${id}?page=${page}`,
  );
};

export const deleteProductById = (id) => {
  return axiosClient().delete(`${process.env.API_URL}/book/${id}`);
};

export const updateProductById = (id, updatedProductData) => {
  return axiosClient().put(
    `${process.env.API_URL}/book/${id}`,
    updatedProductData,
  );
};

export const getProductById = (id) => {
  return axiosClient().get(`${process.env.API_URL}/book/${id}`);
};

export const getCategories = () => {
  return axiosClient().get(`${process.env.API_URL}/category/getall`);
};

export const getCategoryById = (id, currentPage = 1) => {
  return axiosClient().get(
    `${process.env.API_URL}/book/category/${id}?page=${currentPage}`,
  );
};

export const getAllProducts = (page = 1) => {
  return axiosClient().get(
    `${process.env.API_URL}/book/getRandom?page=${page}`,
  );
};

export const searchProductInStore = (id, search) => {
  return axiosClient().get(
    `${process.env.API_URL}/book/search/store/${id}/${search}`,
  );
};

export const searchProduct = (search, page) => {
  return axiosClient().get(
    `${process.env.API_URL}/book/search/${search}?page=${page}`,
  );
};

export const getBestSeller = () => {
  return axiosClient().get(`${process.env.API_URL}/book/bestseller`);
};
