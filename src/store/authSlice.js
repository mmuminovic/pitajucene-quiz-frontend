import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';

const initialState = {
  token: null,
  isAdmin: false,
};

const token = localStorage.getItem('auth_token');

if (token) {
  const decoded = jwtDecode(token);
  Object.assign(initialState, { ...decoded, token });
  axios.defaults.headers.common.Authorization = token;
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    auth: (state, action) => {
      if (!action.payload) {
        state = {
          token: null,
        };
        localStorage.removeItem('auth_token');
      } else {
        const token = action.payload.token;
        const decoded = jwtDecode(token);
        Object.assign(state, { ...decoded, token });
        localStorage.setItem('auth_token', token);
        axios.defaults.headers.common.Authorization = token;
      }

      return state;
    },
  },
});
