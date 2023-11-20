import axios from 'axios';
export const loginDefault = (email, password) => {
  return axios.post(`${process.env.API_URL}/login`, { email, password });
};

export const loginWithProvider = (code, providerName) => {
  return axios.get(
    `${process.env.API_URL}/auth/${providerName}/callback?code=${code}`,
  );
};

export const forgotPassword = (email) => {
  return axios.post(`${process.env.API_URL}/getLinkResetPassword`, { email });
};
