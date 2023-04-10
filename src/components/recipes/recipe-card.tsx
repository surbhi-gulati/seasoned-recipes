import React from "react";
import { Link } from "react-router-dom";
import RecipeType from "../../modules/recipeType";
const savesArray = require("../../data/recipes/saves.json");

export const RecipeCard = (props: RecipeType) => {
  return (
      <div className="card mb-3">
        <div className="row">
          <div className="col-4 ">
            <img src={props.thumbnail_url} className="card-img" alt="..."/>
          </div>
          <div className="col-7">
            <div className="card-body">
              <h5 className="card-title">{props.name}</h5>
              <span className="card-text">{`${props.yields}`}</span>
              {props.total_time_minutes && <div className="card-text">{`Cook time: ${props.total_time_minutes} minutes`}</div>}
              <div className="card-text mb-1"><small className="text-muted">Tags: </small>{getTags(props.tags)}</div>
              <Link to={`/newPost/${props.id}`}>
                <button type="button" className="btn btn-success">Make a Post</button>
              </Link>
            </div>
          </div>
          <div className="col-1">
            <button className='btn bi bi-bookmark pull-right'/>
            <p className="card-text">{findSavesByRecipe(props.id)}</p>
          </div>
        </div>
      </div>
  );
};
export default RecipeCard;


function fixFormatting(str: string) {
  str = str.replace(/[A-Z]/g, (c) => {
    return " " + c.toLowerCase();
  });
  return str;
}

function findSavesByRecipe(recipe_id: number) {
  let count = 0;
  for (let i = 0; i < savesArray.saves.length; i++) {
    if (savesArray.saves[i].recipe_id === recipe_id) {
      count++;
    }
  }
  return count;
}

const getTags = (tags: Array<any>) => {
  const limit = 3;
  if(tags) {
    const limitedTags = tags.slice(0, limit);
    return limitedTags.map(tag => 
      <span key={tag.id} className="badge mx-1 rounded-pill bg-info">{`${tag.display_name}`} </span>
    );
  }
}

// function random3Tags(recipe: any) {
//   const tagsOfInterest = ["vegetarian", "vegan", "glutenFree", "dairyFree", "veryHealthy", "cheap", "veryPopular", "sustainable"];
//   const categoriesOfInterest = ["cuisines", "dishTypes", "diets", "occasions"];
//   let allTags : string[] = [];
//   for (const key in recipe) {
//     if (tagsOfInterest.includes(key)) {
//       allTags.push(fixFormatting(key));
//     }
//     if (categoriesOfInterest.includes(key)) {
//       allTags = allTags.concat(recipe[key]);
//     }
//   }
//   allTags.sort(() => Math.random() - Math.random());
//   const threeTags = allTags.slice(0, 3);
//   return (
//       <div>
//         {
//           threeTags.map(tag =>
//               <span key={tag} className="badge rounded-pill bg-info">{tag}</span>
//           )
//         }
//       </div>);
// }