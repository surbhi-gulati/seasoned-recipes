import React, { useEffect } from "react";
import { useParams } from "react-router";
import { getRecipeInfoByID } from "../services/recipe-api-service";
import RecipeCard from "../components/recipes/recipe-card";

const RecipePage = () => {

  const [recipeInfo, setRecipeInfo] = React.useState<any>({});

  const {recipe_id} = useParams();

  const getRecipeInfoHandler = async (recipe_id: number) => {
    const response = await getRecipeInfoByID(recipe_id);
    setRecipeInfo(response);
  }

  useEffect(() => {
    if(recipe_id) {
      getRecipeInfoHandler(parseInt(recipe_id));
    }

  }, []);

  return (
      <div>
        <RecipeCard key={recipeInfo.id} {...recipeInfo}></RecipeCard>
      </div>
  );
};

export default RecipePage;
