import axios from "axios";
import {faker} from "@faker-js/faker";
import { AvatarGenerator } from 'random-avatar-generator';

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

export const register = async (fullCredentials) => {
  try {


    const generator = new AvatarGenerator();

    // Simply get a random avatar
    const response = await api.post(`${USERS_URL}/register`, {
      username: fullCredentials.username,
      password: fullCredentials.password,
      firstName: fullCredentials.firstName,
      lastName: fullCredentials.lastName,
      email: fullCredentials.email,
      createdAt: fullCredentials.createdAt,
      role: fullCredentials.role,
      avatar: generator.generateRandomAvatar(fullCredentials.username)
    });
    console.log(response);
    const user = response.data;
    return user;
  } catch (error) {
    console.log("error: ", error);
    return null;
  }
}

export const getLoggedInProfile = async () => {
  const response = await api.get(`${USERS_URL}/profile`);
  const user = response.data;
  return user;
};

export const updateUser = async (user) => {
  console.log("updating via ", `${USERS_URL}`, user.email);
  const response = await api.put(`${USERS_URL}`, user);
  const updatedUser = response.data;
  return updatedUser;
}

export const getProfileById = async (id: string) => {
  const response = await api.get(`${USERS_URL}/${id}`);
  const user = response.data;
  return user;
}
