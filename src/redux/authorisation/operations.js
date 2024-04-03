import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://wallet.b.goit.study';

// Utility to add JWT
const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Utility to remove JWT
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post('/api/auth/sign-up', credentials);
      setAuthHeader(res.data.token);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || 'Registration failed. Please try again.'
      );
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post('/api/auth/sign-in', credentials);
      setAuthHeader(res.data.token);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || 'Login failed. Please try again.'
      );
    }
  }
);

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.delete('/api/auth/sign-out');
    clearAuthHeader();
    return null; // Return a value even if it's null
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response.data.message || 'Logout failed.'
    );
  }
});

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (!persistedToken) {
      return thunkAPI.rejectWithValue('Token is missing.');
    }

    try {
      setAuthHeader(persistedToken);
      const res = await axios.get('/api/users/current');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || 'Unable to fetch user data.'
      );
    }
  }
);
