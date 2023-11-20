import axios from 'axios';
import { store } from '../Store';
import {isTokenExpired} from "../Utils/IsTokenExpried";
import {logoutUser} from "../Store/user";
export const axiosClient = () => {
    if (isTokenExpired(store.getState().userReducer.token)) {
        store.dispatch(logoutUser());
    }
  const instance = axios.create({
    baseURL: process.env.API_URL,
  });
  instance.interceptors.request.use(
    (config) => {
      const token = store.getState().userReducer.token;
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    (err) => Promise.reject(err),
  );
  return instance;
};
