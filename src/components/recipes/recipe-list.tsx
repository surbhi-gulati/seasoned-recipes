import React from "react";
import RecipeCard from "./recipe-card";
import RecipeType from "../../modules/recipeType";

const recipesArray = require("../../data/recipes/potpie");

const RecipeList = () => {
  return(
      <ul className="list-group">
        {
          recipesArray.results.map((recipe : RecipeType) =>
              <RecipeCard {...recipe}></RecipeCard>)
        }
      </ul>
  );
};
export default RecipeList;