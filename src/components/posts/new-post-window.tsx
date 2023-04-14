import React, {useState} from "react";
import RecipeCard from "../recipes/recipe-card";
import RecipeType from "../../modules/recipeType";
import {useDispatch} from "react-redux";
import {createPost} from "../../reducers/posts-reducer";
import {addRecipe} from "../../reducers/recipe-reducer";

const NewPostWindow = (props : RecipeType) => {
  let [postCaption, setPostCaption] = useState('');
  const dispatch = useDispatch();

  const clickPostHandler = () => {
    console.log(props.id);
    const newPost = {
      caption: postCaption,
      recipe_id: props.id,
      recipe: props,
      date: Date()
    }
    const newStoredRecipe = {
      id: props.id,
      image: props.image,
      title: props.title,
      readyInMinutes: props.readyInMinutes
    }
    // console.log(newStoredRecipe);
    // dispatch((addRecipe(newStoredRecipe)));
    dispatch((createPost(newPost)));
  }
  return (
      <div className="row">
        <div className="col-auto">
          <img src={props.image} className="rounded-circle" height={48} width={48}/>
        </div>
        <div className="col-10 media border p-3">
          <div className="media-body">
            <textarea value = {postCaption} placeholder="Write about this recipe..."
                      className="form-control border-0"
                      onChange={(event) => setPostCaption(event.target.value)}>
            </textarea>
            <div className="media p-3">
              <RecipeCard key={props.id} {...props!} ></RecipeCard>
            </div>
          </div>
          <p className="float-start">Post to:</p>
          <button onClick = {clickPostHandler} type="button" className="btn btn-success float-end">Post</button>
        </div>
      </div>
  );
};
export default NewPostWindow;