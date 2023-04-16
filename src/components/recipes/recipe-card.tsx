import React from "react";
import {Link, useLocation} from "react-router-dom";
import RecipeDetailsType from "../../modules/recipeDetailsType";
import {useDispatch, useSelector} from "react-redux";
import {updateRecipeSaves} from "../../reducers/recipe-reducer";
const savesArray = require("../../data/recipes/saves");

export const RecipeCard = (props: any) => {
  const dispatch = useDispatch()
  const location = useLocation()
  const {currentUser} = useSelector((state: any) => state.auth);
  const showMakePostButton = currentUser != null && (location.pathname.includes("/search") || location.pathname.includes("/recipe"));
  const updateRecipeSavesHandler = (id) => {
    dispatch(updateRecipeSaves(id));
  }

  const numberOfSaves = findSavesByRecipe(props.id)
  return (
      <div className="row card">
        <Link to={`/recipe/${props.id}`} style={{color: 'black', textDecoration: 'none' }}>
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
              {showMakePostButton ? <div><Link to={`/newPost/${props.id}`}><button type="button" className="btn btn-success">Make a Post</button></Link></div> : <i/>}
            </div>
          </div>
          <div className="col-1">
            {numberOfSaves > 2 ?
                <p onClick = {() => updateRecipeSavesHandler(props.id)} className="bi bi-bookmark-fill float-end">{numberOfSaves}</p> :
                <p onClick = {() => updateRecipeSavesHandler(props.id)} className="bi bi-bookmark float-end">{numberOfSaves}</p>
            }
          </div>
        </div>
        </Link>
      </div>
  );
};
export default RecipeCard;


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