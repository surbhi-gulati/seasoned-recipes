import axios from "axios";
import RecipeType from "../modules/recipeType";
import {createRecipe, getRecipeByID} from "./recipe-services";

const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;
const BOOKMARKS_URL = `${SERVER_API_URL}/bookmarks`;

const api = axios.create({ withCredentials: true });

export const createBookmark = async (recipeInfo: RecipeType, user: string) => {
  try {

    const existingRecipe = await getRecipeByID(recipeInfo.id);
    if (!existingRecipe) {
      await createRecipe(recipeInfo);
    }
    const newRecipeObj = await getRecipeByID(recipeInfo.id);
    const recipe = newRecipeObj._id;
    const response = await api.post(`${BOOKMARKS_URL}`, {
      user, recipe
    });
    const newBookmark = response.data;
    return newBookmark;
  } catch (error) {
    console.log("error: ", error);
    return null;
  }
};

export const getBookmarksByRecipeId = async (recipeId) => {
  try {
    console.log("RETRIEVING BOOKMARK VIA", recipeId);
    const recipeObj = await getRecipeByID(recipeId);
    const recipeObjId = recipeObj._id;
    const response = await api.get(`${BOOKMARKS_URL}/${recipeObjId}`);
    const bookmarks = response.data;
    return bookmarks;
  } catch (error) {
    console.log("error: ", error);
    return null;
  }
};

export const getBookmarksByUserId = async (userId) => {
  try {
    const response = await api.get(`${BOOKMARKS_URL}/user/${userId}`);
    console.log("getBookmarksByUserId", response.data);
    const bookmarks = response.data;
    return bookmarks;
  } catch (error) {
    console.log("error: ", error);
    return null;
  }
};

export const unbookmark = async (user: string, recipe: string) => {
  try {
    const bookmark = {
      user,
      recipe
    }
    const response = await api.delete(`${BOOKMARKS_URL}`, { data: bookmark });
    const deletedBookmark = response.data;
    return deletedBookmark;
  } catch (error) {
    console.log("error: ", error);
    return null;
  }
};
