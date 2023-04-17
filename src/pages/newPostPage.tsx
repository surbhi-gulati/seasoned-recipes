import React, { useEffect } from "react";
import { useParams } from "react-router";
import { getRecipeInfoByID } from "../services/recipe-api-service";
import { useSelector } from "react-redux";
import NewPostWindow from "../components/posts/new-post-window";
import RecipeType from "../modules/recipeType";

const NewPostPage = () => {   

  const [recipeResponse, setRecipeResponse] = React.useState<any>({});
  const [recipeInfo, setRecipeInfo] = React.useState<RecipeType>({
    recipeApiId: 0,
    title: "",
    image: "",
    description: "",
    tags: [],
  });
  const {recipe_id} = useParams();

  // This gets the recipe info from the API
  const getRecipeInfoHandler = async (recipe_id: number) => {
    const response = await getRecipeInfoByID(recipe_id);
    console.log(response);

    const recipeInfo: RecipeType = {
      recipeApiId: response.id,
      title: response.name,
      image: response.thumbnail_url,
      description: response.description,
      tags: response.tags,
    }

    setRecipeInfo(recipeInfo);
    setRecipeResponse(response);
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
        <span>{JSON.stringify(user)}</span>
        <NewPostWindow recipeResponse={recipeResponse} recipeInfo={recipeInfo}></NewPostWindow>
    </div>
  );
};

export default NewPostPage;
