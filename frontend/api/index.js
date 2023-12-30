import axios from 'axios'

export const loginAPI = (data) => {
 return   axios.post(process.env.API_URL + '/auth/login',{data});
}

export const createUserAPI = (data) => {
    return axios.post(process.env.API_URL + '/auth/createUser',{data});
}

export const deleteUserAPI = (data) => {
    return axios.post(process.env.API_URL + '/auth/deleteUser',{data});
}

// get all users
export const getUsersAPI = () => {
    return axios.get(process.env.API_URL + '/auth/getUsers');
}

// branch

export const getAllBranch = (param) => {
    return axios.get(process.env.API_URL + `/branch?role=${param}`);
}

export const createShippingORder = (data) => {
    return axios.post(process.env.API_URL + '/shipingOrders/create',{data});
}

export const updateShippingORder = (data) => {
    return axios.post(process.env.API_URL + '/shipingOrders/update',{data});
}
