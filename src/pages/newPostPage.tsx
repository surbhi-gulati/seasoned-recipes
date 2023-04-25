import React, { useEffect } from "react";
import { useParams } from "react-router";
import { getRecipeInfoByID } from "../services/recipe-api-service";
import { useSelector } from "react-redux";
import NewPostWindow from "../components/posts/new-post-window";
import RecipeType from "../modules/recipeType";

const NewPostPage = () => {
  const [recipeInfo, setRecipeInfo] = React.useState<RecipeType>({
    id: 0,
    name: "",
    thumbnail_url: "",
    tags: [],
    yields: "",
    total_time_minutes: ""
  });
  const {recipe_id} = useParams();
  // This gets the recipe info from the API
  const getRecipeInfoHandler = async (recipe_id: number) => {
    const response = await getRecipeInfoByID(recipe_id);
    const recipeInfo: RecipeType = {
      id: response.id,
      name: response.name,
      thumbnail_url: response.thumbnail_url,
      tags: response.tags,
      total_time_minutes: response.total_time_minutes,
      yields: response.yields
    }
    setRecipeInfo(recipeInfo);
  }

  // This gets the current user from the redux store
  const {currentUser} = useSelector((state: any) => state.auth);
  const [user, setUser] = React.useState<any>({});
  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  // If the recipe_id is not null, then get the recipe info on page load
  useEffect(() => {
    if(recipe_id) {
      getRecipeInfoHandler(parseInt(recipe_id));
    }
  }, [recipe_id]);

  // Pass the recipe info to the new post window
  return (
    <div>
        <NewPostWindow {...recipeInfo}></NewPostWindow>
    </div>
  );
};

export default NewPostPage;
