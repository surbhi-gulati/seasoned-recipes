import axios from "axios";
const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;
const POSTS_URL = `${SERVER_API_URL}/posts`;

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
    console.log("error: ", error);
    return null;
  }
}

export const getAllPosts = async () => {
  try {
    const response = await api.get(`${POSTS_URL}`);
    const posts = response.data;
    console.log(posts);
    return posts;
  } catch (error) {
    console.log("error: ", error);
    return null;
  }
}