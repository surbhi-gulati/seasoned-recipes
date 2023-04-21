import axios from "axios";
const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;
const POSTS_URL = `${SERVER_API_URL}/posts`;
const api = axios.create({ withCredentials: true });

export const createPostWithRecipe = async ({post, recipe}) => {

  console.log(post);
  console.log(recipe);
  console.log("URL IS:", `${POSTS_URL}`, {
    post,
    recipe
  });

  try {
    const response = await api.post(`${POSTS_URL}`, {
      post,
      recipe
    });
    post = response.data;
    return post;
  } catch (error) {
    console.log("error: ", error);
    return null;
  }
}

export const getAllPosts = async () => {
  console.log(POSTS_URL);
  try {
    const response = await api.get(`${POSTS_URL}`);
    console.log(response);
    const posts = response.data;
    console.log(posts);
    return posts;
  } catch (error) {
    console.log("error: ", error);
    return null;
  }
}