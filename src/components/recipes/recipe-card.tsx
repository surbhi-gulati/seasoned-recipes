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
      if (props) {
        const bookmarksForThisRecipe = await getBookmarksByRecipeId(props.id);
        if (bookmarksForThisRecipe) {
          setNumberOfBookmarks(bookmarksForThisRecipe.length);
        }
        const usersBookmarkForThisRecipe = await getBookmarksByBothIds(currentUser._id, props.id)
        setIsBookmarked(usersBookmarkForThisRecipe != null);
      }
    }
    if (currentUser) {
      bookmarkExists();
    }
  },[props]);

  return (
      <div className="card">
        <div className="row no-gutters pe-3">
          <div className="col-4">
            <Link to={`/recipe/${props.id}`} style={{color: 'black', textDecoration: 'none' }}>
              <div className="ratio ratio-1x1">
                <img 
                  src={props.thumbnail_url} 
                  className="mw-100 roundeds" 
                  alt="..."
                  style={{objectFit: "cover" }}/>
              </div>
            </Link>
          </div>
          <div className="card-body ps-0 col-5">
            <Link to={`/recipe/${props.id}`} style={{color: 'black', textDecoration: 'none' }}>
              <h5 className="card-title">{props.name}</h5>
            </Link>
            <span className="card-text">{props.yields}</span>
            {props.total_time_minutes && <div className="card-text">{`Cook time: ${props.total_time_minutes} minutes`}</div>}
            <div className="card-text mb-1"><small className="text-muted">Tags: </small>{getTags(props.tags)}</div>
            {showMakePostButton ? <div><Link to={`/newPost/${props.id}`}><button type="button" className="btn btn-success">Make a Post</button></Link></div> : <i/>}
          </div>
          <div className="col-1 d-inline-flex  pt-2">
            <p className="">{numberOfBookmarks}&nbsp;</p>
            {isBookmarked ?
                <p onClick={() => updateRecipeSavesHandler()} className="bi bi-bookmark-fill"/>
              : <p onClick={() => updateRecipeSavesHandler()} className="bi bi-bookmark"/>
            }
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