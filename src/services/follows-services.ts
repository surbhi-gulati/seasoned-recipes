import axios from "axios";

const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;
const FOLLOWS_URL = `${SERVER_API_URL}/follows`;

const api = axios.create({ withCredentials: true });

export const createFollow = async (follower: string, following: string) => {
  try {
    const follow = {
      follower,
      following
    }
    const response = await api.post(`${FOLLOWS_URL}`, follow);
    const newFollow = response.data;
    return newFollow;
  } catch (error) {
    console.log("Unable to follow: ", error);
    return null;
  }
}

export const unfollow = async (follower: string, following: string) => {
  try {
    const follow = {
      follower,
      following
    }
    const response = await api.delete(`${FOLLOWS_URL}`, { data: follow });
    const deletedFollow = response.data;
    return deletedFollow;
  } catch (error) {
    console.log("Unable to unfollow: ", error);
    return null;
  }
}

export const getFollowersByUserId = async (userId: string) => {
  try {
    const response = await api.get(`${FOLLOWS_URL}/${userId}/followers`);
    const follows = response.data;
    return follows;
  } catch (error) {
    console.log("Unable to get followers: ", error);
    return null;
  }
}

export const getFollowingByUserId = async (userId: string) => {
  try {
    const response = await api.get(`${FOLLOWS_URL}/${userId}/following`);
    const follows = response.data;
    return follows;
  } catch (error) {
    console.log("Unable to get following: ", error);
    return null;
  }
}