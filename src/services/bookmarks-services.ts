import axios from "axios";

const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;
const BOOKMARKS_URL = `${SERVER_API_URL}/bookmarks`;

const api = axios.create({ withCredentials: true });

export const createBookmark = async (bookmark) => {
  try {
    const response = await api.post(`${BOOKMARKS_URL}`, bookmark);
    const newBookmark = response.data;
    return newBookmark;
  } catch (error) {
    console.log("error: ", error);
    return null;
  }
};

export const getBookmarksByRecipeId = async (recipeId) => {
  try {
    const response = await api.get(`${BOOKMARKS_URL}/${recipeId}`);
    const bookmarks = response.data;
    return bookmarks;
  } catch (error) {
    console.log("error: ", error);
    return null;
  }
};

export const getBookmarksByUserId = async (userId) => {
  try {
    const response = await api.get(`${BOOKMARKS_URL}/${userId}`);
    const bookmarks = response.data;
    return bookmarks;
  } catch (error) {
    console.log("error: ", error);
    return null;
  }
};

export const unbookmark = async (bookmark) => {
  try {
    const response = await api.delete(`${BOOKMARKS_URL}`, { data: bookmark });
    const deletedBookmark = response.data;
    return deletedBookmark;
  } catch (error) {
    console.log("error: ", error);
    return null;
  }
};
