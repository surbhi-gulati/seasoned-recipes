import React from "react";
import RecipeCard from "./recipe-card";

const RecipeList = (props) => {
  let recipesArray : Array<any> = props.recipesArray;
  return(
      <div className="mx-5">
        {
          recipesArray.map((recipe : any) =>
              <RecipeCard key={recipe.id} {...recipe}></RecipeCard>)
        }
      </div>
  );
};
export default RecipeList;