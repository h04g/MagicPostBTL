import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: 0,
  name: '',
  email: '',
  phone: '',
  avatar: '',
  isLogin: false,
  token: '',
  type: 'bearer',
  role_id: 0,
  permission: [],
  address: [],
};

export const counterSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    createUser: (state, action) => {
      const { user, authorisation, permissions } = action.payload;
      return {
        ...state,
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        token: authorisation.token,
        type: authorisation.type,
        isLogin: true,
        role_id: user.role_id,
        permission: permissions,
      };
    },
    initAddress: (state, action) => {
      return {
        ...state,
        address: action.payload,
      };
    },
    addNewAddress: (state, action) => {
      return {
        ...state,
        address: [...state.address, action.payload],
      };
    },
    editAddress: (state, action) => {
      return {
        ...state,
        address: state.address.map((item) => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        }),
      };
    },
    deleteOldAddress: (state, action) => {
      return {
        ...state,
        address: state.address.filter((item) => item.id !== action.payload),
      };
    },
    updateUser: (state, action) => {
      const { name, avatar, phone, role_id } = action.payload;
      return {
        ...state,
        name,
        avatar,
        phone,
        role_id,
      };
    },
    logoutUser: (state, action) => {
      state.id = 0;
      state.name = '';
      state.email = '';
      state.isLogin = false;
      state.phone = '';
      state.avatar = '';
      state.token = '';
      state.type = '';
      state.role_id = 1;
      state.status = false;
      state.address = [];
    },
  },
});

export const {
  createUser,
  deleteAddress,
  logoutUser,
  editAddress,
  updateUser,
  initAddress,
  addNewAddress,
  deleteOldAddress,
} = counterSlice.actions;

export default counterSlice.reducer;
