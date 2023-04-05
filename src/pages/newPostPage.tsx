import React, { useEffect } from "react";
import NewPostSrc from "../components/new-post-src";
import { useParams } from "react-router";
import { getRecipeInfoByID } from "../services/recipe-api-service";
import RecipeCard from "../components/recipes/recipe-card";

const NewPostPage = () => {   

  const [recipeInfo, setRecipeInfo] = React.useState<any>({});

  const {recipe_id} = useParams();

  const getRecipeInfoHandler = async (recipe_id: number) => {
    const response = await getRecipeInfoByID(recipe_id);
    setRecipeInfo(response);
  }

  useEffect(() => {
    if(recipe_id) {
      console.log("recipe_id: " + recipe_id);
      getRecipeInfoHandler(parseInt(recipe_id));
    }
    
  }, []);

  return (
    <div>
        <p> PROFILE: Dummy content! </p>
        <RecipeCard {...recipeInfo}></RecipeCard>
        <NewPostSrc/>
    </div>
  );
};

export default NewPostPage;
