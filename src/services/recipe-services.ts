import axios from "axios";
const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;
const RECIPES_URL = `${SERVER_API_URL}/recipes`;
const api = axios.create({ withCredentials: true });

export const getRecipeByID = async (id: number) => {
  try {
    console.log(`${RECIPES_URL}/${id}`);
    const response = await api.get(`${RECIPES_URL}/${id}`);
    console.log("RECIPE RETRIEVED AS:", response);
    const recipes = response.data;
    return recipes;
  } catch (error) {
    console.log("error: ", error);
    return null;
  }
}