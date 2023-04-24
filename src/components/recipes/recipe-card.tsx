import React, {useEffect, useState} from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import RecipeType from "../../modules/recipeType";
import {
  createBookmark, getBookmarksByBothIds,
  getBookmarksByRecipeId,
  unbookmark
} from "../../services/bookmarks-services";

export const RecipeCard = (props: RecipeType) => {
  const location = useLocation();
  const [numberOfBookmarks, setNumberOfBookmarks] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { currentUser } = useSelector((state: any) => state.auth);
  const showMakePostButton =
    currentUser != null &&
    (location.pathname.includes("/search") ||
      location.pathname.includes("/recipe"));

  const updateRecipeSavesHandler = async () => {
    const currSaves = numberOfBookmarks;
    try {
      if (isBookmarked) {
        await unbookmark(props, currentUser._id);
        setNumberOfBookmarks(currSaves - 1);
      } else {
        await createBookmark(props, currentUser._id);
        setNumberOfBookmarks(currSaves + 1);
      }
    } catch (e) {
      console.log(e);
      return null;
    }
    setIsBookmarked(!isBookmarked);
  };

  useEffect(() => {
    const bookmarkExists = async () => {
      const bookmarksForThisRecipe = await getBookmarksByRecipeId(props.id);
      if (bookmarksForThisRecipe) {
        setNumberOfBookmarks(bookmarksForThisRecipe.length);
      }
      const usersBookmarkForThisRecipe = await getBookmarksByBothIds(currentUser._id, props.id)
      setIsBookmarked(usersBookmarkForThisRecipe != null);
    }
    bookmarkExists();
  },[]);

  return (
      <div className="row card">
        <div className="row">
          <div className="col-4 ">
            <Link to={`/recipe/${props.id}`} style={{color: 'black', textDecoration: 'none' }}>
              <img src={props.thumbnail_url} className="card-img" alt="..."/>
            </Link>
          </div>
          <div className="col-7">
            <div className="card-body">
              <Link to={`/recipe/${props.id}`} style={{color: 'black', textDecoration: 'none' }}>
                <h5 className="card-title">{props.name}</h5>
              </Link>
              <span className="card-text">{props.yields}</span>
              {props.total_time_minutes && <div className="card-text">{`Cook time: ${props.total_time_minutes} minutes`}</div>}
              <div className="card-text mb-1"><small className="text-muted">Tags: </small>{getTags(props.tags)}</div>
              {showMakePostButton ? <div><Link to={`/newPost/${props.id}`}><button type="button" className="btn btn-success">Make a Post</button></Link></div> : <i/>}
            </div>
          </div>
          <div className="col-1">
            {isBookmarked ?
                <p onClick={() => updateRecipeSavesHandler()} className="bi bi-bookmark-fill float-end"/>
              : <p onClick={() => updateRecipeSavesHandler()} className="bi bi-bookmark float-end"></p>
            }
            <p>{numberOfBookmarks}</p>
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