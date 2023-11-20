import { axiosClient } from '../Index';

export const updateProfile = (data) => {
  return axiosClient().post(`${process.env.API_URL}/auth/updateprofile`, data);
};
