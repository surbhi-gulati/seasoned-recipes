import axios from 'axios';
/* const API_URL = "https://api.spoonacular.com";
const API_KEY = "07e783078cc34026b5f88a12375c5e0c"; */
const API_URL = "https://tasty.p.rapidapi.com";
const API_KEY = "2147b8c1abmsh5030aec87376b76p1a1e29jsnf0c915eaf659";
const API_HOST = "tasty.p.rapidapi.com";

// ALL EXTERNAL API ENDPOINTS GO HERE

/* export const searchRecipes = async (query: string) => {
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
} */

export const searchRecipes = async (query: string) => {
  const options = {
    method: 'GET',
    url: `${API_URL}/recipes/list`,
    params: {from: '0', size: '10', q: query},
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': API_HOST
    }
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error("error: ", error);
    return null;
  }
}

export const getRecipeInfoByID = async (id: number) => {
  const options = {
    method: 'GET',
    url: `${API_URL}/recipes/get-more-info`,
    params: {id: `${id}`},
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': API_HOST
    }
  };
  const response = await axios.request(options);
  return response.data;
}