import React, {useEffect, useState} from "react";
import RecipeCard from "../recipes/recipe-card";
import RecipeType from "../../modules/recipeType";
import {useDispatch, useSelector} from "react-redux";
import {createPost} from "../../reducers/posts-reducer";
import Dropdown from "react-bootstrap/Dropdown";
import {FoodGroup} from "../../modules/postType";

const NewPostWindow = (props : RecipeType) => {
  let [postCaption, setPostCaption] = useState('');
  const dispatch = useDispatch();

  const {currentUser} = useSelector((state: any) => state.auth);

  const clickPostHandler = () => {
    console.log(props.id);
    const newPost = {
      caption: postCaption,
      recipe_id: props.id,
      recipe: props,
      date: new Date().toLocaleDateString('en-US'),
      groupName: FoodGroup.subleAsianEats
    }
    dispatch((createPost(newPost)));
  }
  return (
      <div className="row">
        <div className="col-auto">
          <img src={currentUser.avatar} alt={props.title} className="rounded-circle" height={48} width={48}/>
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
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Dropdown Button
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <button onClick = {clickPostHandler} type="button" className="btn btn-success float-end">Post</button>
        </div>
      </div>
  );
};
export default NewPostWindow;