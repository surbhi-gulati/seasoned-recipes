import axios from "axios";
const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;
const POSTS_URL = `${SERVER_API_URL}/posts`;
const GROUP_POSTS_URL = `${SERVER_API_URL}/group-posts`;
const FOLLOWED_POSTS_URL = `${SERVER_API_URL}/followed-posts`;
const api = axios.create({ withCredentials: true });

export const createPostWithRecipe = async ({post, recipe}) => {

  console.log(post);
  console.log(recipe);

  try {
    const response = await api.post(`${POSTS_URL}`, {
      post,
      recipe
    });
    post = response.data;
    return post;
  } catch (error) {
    console.log("Unable to create post: ", error);
    return null;
  }
}

export const getAllPosts = async () => {
  console.log(POSTS_URL);
  try {
    const response = await api.get(`${POSTS_URL}`);
    console.log(response);
    const posts = response.data;
    return posts;
  } catch (error) {
    console.log("Unable to get all posts: ", error);
    return null;
  }
}

export const getFollowedPosts = async () => {
  try {
    const response = await api.get(`${FOLLOWED_POSTS_URL}`);
    const posts = response.data;
    return posts;
  } catch (error) {
    console.log("Unable to get followed posts: ", error);
    return null;
  }

}

export const getGroupsPosts = async (groupId) => {
  try {
    const response = await api.get(`${GROUP_POSTS_URL}/${groupId}`);
    const posts = response.data;
    return posts;
  } catch (error) {
    console.log("Unable to get group posts: ", error);
    return null;
  }
}

export const deletePost = async (postId) => {
  try {
    const response = await api.delete(`${POSTS_URL}/${postId}`);
    const post = response.data;
    return post;
  } catch (error) {
    console.log("Can Not Delete: ", error);
    return null;
  }
}