import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  email: '',
  name: '',
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.name = action.payload.name;
    },
  },
});

export default userSlice;
