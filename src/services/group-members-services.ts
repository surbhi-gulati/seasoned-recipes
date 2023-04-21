import axios from 'axios';

const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;
const GROUP_MEMS_URL = `${SERVER_API_URL}/group-members`;

const api = axios.create({ withCredentials: true });

export const createGroupMember = async (group: string, user: string) => {
  try {
    const groupMember = {
      group,
      user
    }
    const response = await api.post(`${GROUP_MEMS_URL}`, groupMember);
    return response.data;
  } catch (error) {
    console.error("Unable to join group: ", error);
    return null;
  }
};

export const getGroupMembersByGroupId = async (groupId) => {
  try {
    const response = await api.get(`${GROUP_MEMS_URL}/${groupId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getGroupsByUserId = async (userId) => {
  try {
    const response = await api.get(`${GROUP_MEMS_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const leaveGroup = async (groupMember) => {
  try {
    const response = await api.delete(`${GROUP_MEMS_URL}`, { data: groupMember });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
