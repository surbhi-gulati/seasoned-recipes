import axios from "axios";
const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;
const GROUPS_URL = `${SERVER_API_URL}/groups`;

const api = axios.create({ withCredentials: true });

export const createGroup = async ({group}) => {
  try {
    const response = await api.post(`${GROUPS_URL}`, group);
    group = response.data;
    return group;
  } catch (error) {
    console.log("error: ", error);
    return null;
  }
}

export const getAllGroups = async () => {
  try {
    const response = await api.get(`${GROUPS_URL}`);
    const groups = response.data;
    return groups;
  } catch (error) {
    console.log("error: ", error);
    return null;
  }
}