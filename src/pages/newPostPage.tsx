import React, { useEffect } from "react";
import { useParams } from "react-router";
import { getRecipeInfoByID } from "../services/recipe-api-service";
import RecipeCard from "../components/recipes/recipe-card";
import { useSelector } from "react-redux";
import NewPostWindow from "../components/posts/new-post-window";

const NewPostPage = () => {   

  const [recipeInfo, setRecipeInfo] = React.useState<any>({});

  const {recipe_id} = useParams();

  const getRecipeInfoHandler = async (recipe_id: number) => {
    const response = await getRecipeInfoByID(recipe_id);
    console.log(response);
    setRecipeInfo(response);
  }

  const {currentUser} = useSelector((state: any) => state.auth);
  const [user, setUser] = React.useState<any>({});
  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);


  useEffect(() => {
    if(recipe_id) {
      console.log("recipe_id: " + recipe_id);
      getRecipeInfoHandler(parseInt(recipe_id));
    }
    
  }, [recipe_id]);

  return (
    <div>
        <span>{JSON.stringify(user)}</span>
        <NewPostWindow {...recipeInfo}></NewPostWindow>
    </div>
  );
};

export default NewPostPage;
