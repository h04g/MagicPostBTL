import axios from 'axios';

export const registerDefault = (name, email, password, role_id) => {
  return axios.post(`${process.env.API_URL}/register`, {
    name,
    email,
    password,
    role_id,
  });
};
