import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deletePost, updatePostLikes} from "../../reducers/posts-reducer";
import PostType, { PostResponseType } from "../../modules/postType";
import RecipeCard from "../recipes/recipe-card";
import {getRecipeByID} from "../../services/recipe-services";
import {getRecipeInfoByID} from "../../services/recipe-api-service";
import RecipeType from "../../modules/recipeType";
import PersonCard from "../profile/peopleSection/personCard";

export const PostCard = (props: PostResponseType) => {
  const dispatch = useDispatch();
  const deletePostHandler = (id) => {
    dispatch(deletePost(id));
  }
  const updatePostLikesHandler = (id) => {
    dispatch(updatePostLikes(id))
  }

  console.log(props);

  // @ts-ignore
  const user = props.userId;

  // This gets the recipe info from the API
  // @ts-ignore
  const recipe_id = props.recipeId.id;
  const [recipeInfo, setRecipeInfo] = React.useState<RecipeType>({
    id: 0,
    name: "",
    thumbnail_url: "",
    tags: [],
    yields: "",
    total_time_minutes: ""
  });
  const getRecipeInfoHandler = async (recipe_id: number) => {
    const response = await getRecipeByID(recipe_id);
    const recipeInfo: RecipeType = {
      id: response.id,
      name: response.name,
      thumbnail_url: response.thumbnail_url,
      tags: response.tags,
      total_time_minutes: response.total_time_minutes,
      yields: response.yields
    }
    setRecipeInfo(recipeInfo);
  }

  // If the recipe_id is not null, then get the recipe info on page load
  useEffect(() => {
    if(recipe_id) {
      getRecipeInfoHandler(recipe_id);
    }
  }, [recipe_id]);
  return (
      <div className="media border p-3">
        <div className="media-body">
          <PersonCard {...props.userId}/>
          <i>@{user?.username}</i>
          <i className="bi bi-x-lg float-end" onClick={() => deletePostHandler(props._id)}></i>
          <p>{props.text}</p>
          <p className="badge rounded-pill bg-dark">{props.groupName}</p>
          <div className="media p-3">
            <RecipeCard key={props.recipeId._id} {...recipeInfo!}></RecipeCard>
          </div>
          {props.liked ?
              <div onClick={() => updatePostLikesHandler(props._id)}
                  className="bi-hand-thumbs-up-fill float-start">&nbsp;{props.likes}</div> :
              <div onClick={() => updatePostLikesHandler(props._id)}
                  className="bi-hand-thumbs-up float-start">&nbsp;{props.likes}</div>}
          <i className="float-end">Posted on {props.date}</i>

        </div>
      </div>
  );
};
export default PostCard;