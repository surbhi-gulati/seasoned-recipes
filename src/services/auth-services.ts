import axios from "axios";
import {faker} from "@faker-js/faker";
const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;
const USERS_URL = `${SERVER_API_URL}/users`;


const api = axios.create({ withCredentials: true });


export const login = async ({ username, password }) => {
  try {
    const response = await api.post(`${USERS_URL}/login`, {
      username,
      password,
    });
    const user = response.data;
    return user;
  } catch (error) { 
    console.log("error: ", error);
    return null;
  }
};

export const logout = async () => {
  const response = await api.post(`${USERS_URL}/logout`);
  const user = response.data;
  return user;  
}

export const register = async ({ username, password }) => {
  try {
    const avatar = faker.image.nature(280, 280, true);
    const response = await api.post(`${USERS_URL}/register`, {
      username,
      password,
      avatar
    });
    console.log(response);
    const user = response.data;
    return user;
  } catch (error) {
    console.log("error: ", error);
    return null;
  }
}

export const profile = async () => {
  const response = await api.get(`${USERS_URL}/profile`);
  const user = response.data;
  return user;
};

export const updateUser = async (user) => {
  const response = await api.put(`${USERS_URL}/profile`, user);
  const updatedUser = response.data;
  return updatedUser;
}

