import axios from "axios";

const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;
const UPVOTES_URL = `${SERVER_API_URL}/upvotes`;

const api = axios.create({ withCredentials: true });

export const createUpvote = async (user: string, post: string) => {
    const upvote = {user, post};
    try {
        const response = await api.post(`${UPVOTES_URL}`, upvote);
        const createdUpvote = response.data;
    return createdUpvote;
    } catch (error) {
        console.log("error: ", error);
        return null;
    }
};

export const getUpvotesByBothIds = async (userId: string, postId: string) => {
    try {
        const response = await api.get(`${UPVOTES_URL}/objects/${postId}/${userId}`);
        const upvotes = response.data;
    return upvotes;
    } catch (error) {
        console.log("error: ", error);
        return null;
    }
}

export const getUpvotesByPostId = async (postId) => {
    try {
        const response = await api.get(`${UPVOTES_URL}/post/${postId}`);
        const upvotes = response.data;
    return upvotes;
    } catch (error) {
        console.log("error: ", error);
        return null;
    }
};

export const getUpvotesByUserId = async (userId) => {
    try {
        const response = await api.get(`${UPVOTES_URL}/user/${userId}`);
        const upvotes = response.data;
    return upvotes;
    } catch (error) {
        console.log("error: ", error);
        return null;
    }
};

export const removeUpvote = async (user: string, post: string) => {
    const upvote = {user, post};
    try {
        const response = await api.delete(`${UPVOTES_URL}`, { data: upvote });
        const deletedUpvote = response.data;
    return deletedUpvote;
    } catch (error) {
        console.log("error: ", error);
        return null;
    }
};