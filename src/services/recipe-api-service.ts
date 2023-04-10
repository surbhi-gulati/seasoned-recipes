import axios from 'axios';
const API_URL = "https://api.spoonacular.com";
const API_KEY = "07e783078cc34026b5f88a12375c5e0c";

// ALL EXTERNAL API ENDPOINTS GO HERE

export const searchRecipes = async (query: string) => {
  const response = await axios.get(
    `${API_URL}/recipes/complexSearch?apiKey=${API_KEY}&query=${query}&number=3&addRecipeInformation=true`
  );
  return response.data;
}

export const getRecipeInfoByID = async (id: number) => {
  const response = await axios.get(
    `${API_URL}/recipes/${id}/information?apiKey=${API_KEY}&includeNutrition=false`
  );
  return response.data;
}