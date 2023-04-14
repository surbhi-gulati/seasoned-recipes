import React from "react";
import RecipeCard from "../recipes/recipe-card";
import {Recipe} from "@reduxjs/toolkit/dist/query/core/buildThunks";
import RecipeType from "../../modules/recipeType";

const NewPostWindow = (props : RecipeType) => {
  return (
      <div className="media border p-3">
        <div className="media-body">
          <textarea placeholder="Write about this recipe..."
                    className="form-control border-0">
          </textarea>
          <div className="media p-3">
            <RecipeCard key={props.id} {...props!} ></RecipeCard>
          </div>
        </div>
        <button type="button" className="btn btn-success">Post</button>
      </div>
  );
};
export default NewPostWindow;