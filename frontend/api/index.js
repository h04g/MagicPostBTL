import axios from 'axios'
export const API_URL = "http://127.0.0.1:8080/api";
export const loginAPI = (data) => {
    console.log(data);
    console.log(API_URL + '/auth/login');
 return axios.post( `${API_URL}/auth/login`,data);
}

export const createUserAPI = (data) => {
    return axios.post(API_URL + '/auth/createUser',data);
}

export const deleteUserAPI = (data) => {
    return axios.post(API_URL + '/auth/deleteUser',data);
}

// get all users
export const getUsersAPI = () => {
    return axios.get(API_URL + '/auth/getUsers');
}

// branch

export const getAllBranch = (param) => {
    return axios.get(API_URL + `/branch?role=${param}`);
}

export const createShippingORder = (data) => {
    return axios.post(API_URL + '/shipingOrders/create',data);
}

export const updateShippingORder = (data) => {
    return axios.post(API_URL + '/shipingOrders/update',data);
}
