import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import PostType, { PostResponseType } from "../../modules/postType";
import RecipeCard from "../recipes/recipe-card";
import {getRecipeByAPIID} from "../../services/recipe-services";
import { getUpvotesByPostId, getUpvotesByBothIds, removeUpvote, createUpvote } from "../../services/upvotes-services";
import RecipeType from "../../modules/recipeType";
import UserCard from "../profile/peopleSection/userCard";
import { deletePostThunk } from "../../services/post-thunks";
import {getGroupById} from "../../services/group-services";

type upvoteType = {
  user: string;
  post: string;
}

export const PostCard = ({post}) => {
  const dispatch = useDispatch<any>();
  const {currentUser} = useSelector((state: any) => state.auth);
  const [numberOfLikes, setNumberOfLikes] = useState(0);
  const [postedInGroupName, setPostedInGroupName] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  
  const user = post.userId;
  const recipe_id = post.recipeId.id;
  const [recipeInfo, setRecipeInfo] = React.useState<RecipeType>({
    id: 0,
    name: "",
    thumbnail_url: "",
    tags: [],
    yields: "",
    total_time_minutes: ""
  });

  const getRecipeInfoHandler = async (recipe_id: number) => {
    const response = await getRecipeByAPIID(recipe_id);
    const recipeInfo: RecipeType = {
      id: recipe_id,
      name: response.name,
      thumbnail_url: response.thumbnail_url,
      tags: response.tags,
      total_time_minutes: response.total_time_minutes,
      yields: response.yields
    }
    setRecipeInfo(recipeInfo);
  }

  const getGroupNameHandler = async (post) => {
    setPostedInGroupName(post.groupId.name);
  }

  const likeExists = async () => {
    if(post) {
      const likesForThisRecipe = await getUpvotesByPostId(post._id);
      if(likesForThisRecipe) {
        setNumberOfLikes(likesForThisRecipe.length);
      }
      const like = await getUpvotesByBothIds(currentUser._id, post._id);
      setIsLiked(like.length > 0);
    }
  }

  // If the recipe_id is not null, then get the recipe info on page load
  useEffect(() => {
    if(recipe_id) {
      getRecipeInfoHandler(recipe_id);
    }

  }, [recipe_id]);

  // If the user is logged in, then check if they have liked this post
  useEffect(() => {
    if(currentUser) {
      likeExists();
    }
    if (post) {
      getGroupNameHandler(post);
    }
  }, [post, currentUser]);

  // This updates the number of likes and whether the user has liked the post
  const updateLikesHandler = async () => {
    try {
      if (isLiked) {
        await removeUpvote(currentUser._id, post._id);
        setNumberOfLikes((prev) => prev - 1);
      }
      else {
        await createUpvote(currentUser._id, post._id);
        setNumberOfLikes((prev) => prev + 1);
      }
      setIsLiked((prev) => !prev);
    }
    catch (err) {
      console.log("error updating likes", err);
    }
  }

  const deletePostHandler = () => {
    console.log("got into delete post handler");
    dispatch(deletePostThunk(post._id));  
  }

  return (
      <div className="media border p-3">
        <div className="media-body">
          <UserCard {...post.userId}/>
          <i>@{user?.username}</i>
          {currentUser && currentUser.isAdmin && <i className="bi bi-x-lg float-end" onClick={() => deletePostHandler()}></i>}
          <p>{post.text}</p>
          <p className="badge rounded-pill bg-dark">{postedInGroupName}</p>
          <div className="media p-3">
            <RecipeCard key={post.recipeId._id} {...recipeInfo!}></RecipeCard>
          </div>
          {isLiked ?
              <div onClick={() => updateLikesHandler()}
                  className="bi-hand-thumbs-up-fill float-start">&nbsp;{numberOfLikes}</div> :
              <div onClick={() => updateLikesHandler()}
                  className="bi-hand-thumbs-up float-start">&nbsp;{numberOfLikes}</div>}
          <i className="float-end">Posted on {new Date(post.date).toLocaleString()}</i>
        </div>
      </div>
  );
};
export default PostCard;