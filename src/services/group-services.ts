import axios from "axios";

const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;
const GROUPS_URL = `${SERVER_API_URL}/groups`;

const api = axios.create({ withCredentials: true });

export const createGroup = async ({ group }) => {
  try {
    const response = await api.post(`${GROUPS_URL}`, group);
    const createdGroup = response.data;
    return createdGroup;
  } catch (error) {
    console.log("error: ", error);
    return null;
  }
};

export const getAllGroups = async () => {
  try {
    const response = await api.get(`${GROUPS_URL}`);
    const groups = response.data;
    return groups;
  } catch (error) {
    console.log("error: ", error);
    return null;
  }
};

export const getGroupById = async (groupId) => {
  try {
    const response = await api.get(`${GROUPS_URL}/${groupId}`);
    const group = response.data;
    return group;
  } catch (error) {
    console.log("error: ", error);
    return null;
  }
};

export const updateGroup = async ({ groupId, group }) => {
  try {
    const response = await api.put(`${GROUPS_URL}/${groupId}`, group);
    const updatedGroup = response.data;
    return updatedGroup;
  } catch (error) {
    console.log("error: ", error);
    return null;
  }
};

export const deleteGroup = async (groupId) => {
  try {
    const response = await api.delete(`${GROUPS_URL}/${groupId}`);
    const deletedGroup = response.data;
    return deletedGroup;
  } catch (error) {
    console.log("error: ", error);
    return null;
  }
};
