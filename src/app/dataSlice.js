import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import axios from 'axios';

const initialState = {
  login: {},
  user: {},
  managerId: '',
  permissionsDATA: {},
};

export const dataSlice = createSlice({
  name: 'dataSlice',
  initialState,
  reducers: {
    addLogin: (state, action) => {
      state.login = action.payload;
    },
    addManagerId: (state, action) => {
      state.managerId = action.payload;
    },
    addUser: (state, action) => {
      state.user = action.payload;
    },
    addPermList: (state, action) => {
      state.permissionsDATA = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { addLogin, addManagerId, addUser, addPermList } =
  dataSlice.actions;

export default dataSlice.reducer;
