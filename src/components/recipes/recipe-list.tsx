import React from "react";
import RecipeCard from "./recipe-card";
import RecipeDetailsType from "../../modules/recipeDetailsType";
import RecipeType from "../../modules/recipeType";

const RecipeList = (props) => {
  let recipesArray : Array<any> = props.recipesArray;
  return(
      <div className="mx-5">
        {
          recipesArray.map((recipe : RecipeType) => {
            return <RecipeCard key={recipe._id} {...recipe}></RecipeCard>
          })
        }
      </div>
  );
};
export default RecipeList;