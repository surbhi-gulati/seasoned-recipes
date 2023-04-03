import React from "react";
import RecipeCard from "./recipe-card";

const recipesArray = [] /* require('../../data/recipes/potpie'); */

const RecipeList = () => {
  return(
      <ul className="list-group">
        {
          recipesArray.map((recipe : any) =>
              <RecipeCard key={recipe.id} {...recipe}></RecipeCard>)
        }
      </ul>
  );
};
export default RecipeList;