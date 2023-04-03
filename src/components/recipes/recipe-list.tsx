import React from "react";
import RecipeCard from "./recipe-card";
import recipesArray from "../../data/recipes/potpie.json";

const RecipeList = () => {
  return(
      <ul className="list-group">
        {
          recipesArray.results.map((recipe : any) =>
              <RecipeCard key={recipe.id} {...recipe}></RecipeCard>)
        }
      </ul>
  );
};
export default RecipeList;