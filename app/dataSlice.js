import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  login: {},
  user: {},
  managerId: '',
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
  },
  extraReducers: (builder) => {},
});

export const { addLogin, addManagerId, addUser } = dataSlice.actions;

export default dataSlice.reducer;
