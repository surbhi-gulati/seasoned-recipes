import React from "react";
import RecipeCard from "./recipe-card";

const recipesArray = require("../../data/recipes/potpie");

const RecipeList = () => {
  return(
      <ul className="list-group">
        {
          recipesArray.results.map((recipe : any) =>
              <RecipeCard {...recipe}></RecipeCard>)
        }
      </ul>
  );
};
export default RecipeList;