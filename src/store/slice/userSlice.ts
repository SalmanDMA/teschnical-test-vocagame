import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    user: {
      username: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      newPassword: "",
      oldPassword: "",
    },
  },
  reducers: {
    userProfile: (state, action) => {
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    },
  },
});

export const { userProfile } = usersSlice.actions;

export default usersSlice.reducer;
