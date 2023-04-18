import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deletePost, updatePostLikes} from "../../reducers/posts-reducer";
import PostType from "../../modules/postType";

export const PostCard = (props: PostType) => {
  const dispatch = useDispatch();
  const deletePostHandler = (id) => {
    dispatch(deletePost(id));
  }
  const updatePostLikesHandler = (id) => {
    dispatch(updatePostLikes(id))
  }

  // This gets the current user from the redux store
  const {currentUser} = useSelector((state: any) => state.auth);
  const [user, setUser] = React.useState<any>({});
  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  return (
      <div className="media border p-3">
          <div className="media-body">
            <img className="float-start rounded-circle" height={48} width={48} src={`${user?.avatar}`} alt={user?.name} key={user?.name}/>
            <i className="bi bi-x-lg float-end" onClick={() => deletePostHandler(props._id)}></i>
            <h5 className="fw-bolder">&nbsp;{user?.name}</h5>
            <i>@{user?.username}</i>
            <p>{props.text}</p>
            <p className="badge rounded-pill bg-dark">{props.groupName}</p>
            <div className="media p-3">
              {/*<RecipeCard key={pro} {...recipeResponse}></RecipeCard>*/}
            </div>
            {props.liked ?
                <div onClick={() => updatePostLikesHandler(props._id)} className="bi-hand-thumbs-up-fill float-start">&nbsp;{props.likes}</div> :
                <div onClick={() => updatePostLikesHandler(props._id)} className="bi-hand-thumbs-up float-start">&nbsp;{props.likes}</div>}
            <i className="float-end">Posted on {props.date}</i>

          </div>
      </div>
  );
};
export default PostCard;