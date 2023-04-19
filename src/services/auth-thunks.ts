import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authService from "./auth-services";
import UserType from "../modules/userType";

type credentials = {
  username: string;
  password: string;
};

export const loginThunk = createAsyncThunk(
  "user/login", async (credentials: credentials) => {
    const user = await authService.login(credentials);
    return user;
  }
);

export const logoutThunk = createAsyncThunk(
  "user/logout", async () => {
    const user = await authService.logout();
    return user;
  }
)

export const registerThunk = createAsyncThunk(
  "user/register", async (credentials: credentials) => {
    const user = await authService.register(credentials);
    return user;
  }
)

export const profileThunk = createAsyncThunk(
  "user/profile", async () => {
    const user = await authService.profile();
    console.log("profileThunk user: ", user);
    return user;
  }
)

export const updateUserThunk = createAsyncThunk(
  "user/update", async (user: UserType) => {
    const updatedUser = await authService.updateUser(user);
    return updatedUser;
  }
)