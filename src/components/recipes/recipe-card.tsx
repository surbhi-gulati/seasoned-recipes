import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateRecipeSaves } from "../../reducers/recipe-reducer";
import RecipeType from "../../modules/recipeType";
import { createNewBookmark, unbookmarkRecipe } from "../../reducers/bookmarks-reducer";

export const RecipeCard = (props: RecipeType) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { currentUser } = useSelector((state: any) => state.auth);
  const showMakePostButton =
    currentUser != null &&
    (location.pathname.includes("/search") ||
      location.pathname.includes("/recipe"));
  const [isBookmarked, setIsBookmarked] = useState(false);
  const updateRecipeSavesHandler = async (id: number) => {
    setIsBookmarked(!isBookmarked);
    if (currentUser) {
      if (isBookmarked) {
        await dispatch(removeBookmark({ recipeId: id, userId: currentUser.id }));
      } else {
        await dispatch(addBookmark({ recipeId: id, userId: currentUser.id }));
      }
    } else {
      dispatch(updateRecipeSaves(id));
    }
  };

  return (
    <div className="row card">
      <div className="row">
        <div className="col-4 ">
          <Link
            to={`/recipe/${props.id}`}
            style={{ color: "black", textDecoration: "none" }}
          >
            <img
              src={props.thumbnail_url}
              className="card-img"
              alt="..."
            />
          </Link>
        </div>
        <div className="col-7">
          <div className="card-body">
            <Link
              to={`/recipe/${props.id}`}
              style={{ color: "black", textDecoration: "none" }}
            >
              <h5 className="card-title">{props.name}</h5>
            </Link>
            <span className="card-text">{props.yields}</span>
            {props.total_time_minutes && (
              <div className="card-text">{`Cook time: ${props.total_time_minutes} minutes`}</div>
            )}
            <div className="card-text mb-1">
              <small className="text-muted">Tags: </small>
              {getTags(props.tags)}
            </div>
            {showMakePostButton ? (
              <div>
                <Link to={`/newPost/${props.id}`}>
                  <button type="button" className="btn btn-success">
                    Make a Post
                  </button>
                </Link>
              </div>
            ) : (
              <i />
            )}
          </div>
        </div>
        <div className="col-1">
          {isBookmarked ? (
            <p
              onClick={() => updateRecipeSavesHandler(props.id)}
              className="bi bi-bookmark-fill float-end"
            />
          ) : (
            <p
              onClick={() => updateRecipeSavesHandler(props.id)}
              className="bi bi-bookmark float-end"
            ></p>
          )}
        </div>
      </div>
    </div>
  );
};
export default RecipeCard;

const getTags = (tags: Array<any>) => {
  const limit = 3;
  if(tags) {
    const limitedTags = tags.slice(0, limit);
    return limitedTags.map(tag => 
      <span key={tag.id} className="badge mx-1 rounded-pill bg-info">{`${tag.display_name}`} </span>
    );
  }
}
