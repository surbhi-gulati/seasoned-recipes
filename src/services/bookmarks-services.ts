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
    if (recipe) {
      const response = await api.post(`${BOOKMARKS_URL}`, {
        user, recipe
      });
      const newBookmark = response.data;
      return newBookmark;
    }
    return null;
  } catch (error) {
    console.log("error: ", error);
    return null;
  }
};

export const getBookmarksByRecipeId = async (recipeId) => {
  try {
    const recipeObj = await getRecipeByID(recipeId);
    const recipeObjId = recipeObj._id;
    if (recipeObjId) {
      const response = await api.get(`${BOOKMARKS_URL}/${recipeObjId}`);
      const bookmarks = response.data;
      return bookmarks;
    }
    return null;
  } catch (error) {
    console.log("error: ", error);
    return null;
  }
};

export const getBookmarksByUserId = async (userId, objectsOrRecipes) => {
  try {
    const response = objectsOrRecipes ?
        await api.get(`${BOOKMARKS_URL}/objects/user/${userId}/`) :
        await api.get(`${BOOKMARKS_URL}/user/${userId}/`);
    const bookmarks = response.data;
    return bookmarks;
  } catch (error) {
    console.log("error: ", error);
    return null;
  }
};

export const getBookmarksByBothIds = async (userId, recipeId) => {
  try {
    const recipeObj = await getRecipeByID(recipeId);
    const recipeObjId = recipeObj._id;
    if (recipeObjId) {
      const response = await api.get(`${BOOKMARKS_URL}/${recipeObjId}/${userId}/`);
      const bookmarks = response.data;
      return bookmarks;
    }
    return null;
  } catch (error) {
    console.log("error: ", error);
    return null;
  }
};

export const unbookmark = async (recipeInfo: RecipeType, user: string) => {
  try {
    const recipeObj = await getRecipeByID(recipeInfo.id);
    const recipe = recipeObj._id;
    if (recipe) {
      const response = await api.delete(`${BOOKMARKS_URL}`, { data: { user: user, recipe: recipe } });
      return response.data;
    }
    return null;
  } catch (error) {
    console.log("error: ", error);
    return null;
  }
};
