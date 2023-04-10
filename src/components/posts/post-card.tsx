import React from "react";
import RecipeCard from "../recipes/recipe-card";
import PostType from "../../modules/postType";
import recipesArray from "../../data/recipes/potpie.json";
import sampleUsers from "../../data/users/usersData";

export const PostCard = (props: PostType) => {
  let recipe = recipesArray.results[1];
  let user = sampleUsers[1];
  return (
      <div className="media border p-3">
          <div className="media-body">
            <h5>Suresh Dasari<small><i> Posted on January 15, 2020</i></small></h5>
            <p>Nice tutorial on bootstrap. Every bootstrap topic covered in-detail with
              examples.</p>
            <div className="media p-3">
              <RecipeCard key={props.recipe_id} {...recipe}></RecipeCard>
            </div>
          </div>
      </div>
  );
};
export default PostCard;