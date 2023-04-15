import { createSlice } from "@reduxjs/toolkit";
import {
  loginThunk, 
  logoutThunk, 
  profileThunk, 
  registerThunk} from "../services/auth-thunks";

type authState = {
  users: any[],
  loading: boolean,
  error: string | null,
  currentUser: any,
}

const initialState : authState = {
  users: [],
  loading: false,
  error: null ,
  currentUser: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginThunk.fulfilled, (state, {payload}) => {
      console.log("loginThunk.fulfilled payload: ", payload);
      state.currentUser = payload;
    }).addCase(logoutThunk.fulfilled, (state, {payload}) => {
      state.currentUser = null;
    }).addCase(profileThunk.fulfilled, (state, {payload}) => {
      state.currentUser = payload;
    }).addCase(registerThunk.fulfilled, (state, {payload}) => {
      if(payload) {
        state.currentUser = payload;
        state.error = null; 
      }
      else {
        state.error = "User already exists";
      }
    })

  },
});


export default authSlice.reducer;