import React, {useState} from "react";
import RecipeCard from "../recipes/recipe-card";
import RecipeType from "../../modules/recipeType";
import {useDispatch, useSelector} from "react-redux";
import {createPost} from "../../reducers/posts-reducer";
import Select from 'react-select';
import groups from "../../data/users/groupsData";

interface GroupOption {
  value: number,
  label: string
}

const NewPostWindow = (props : RecipeType) => {
  let [postCaption, setPostCaption] = useState('');
  let [postGroup, setPostGroup] = useState('');
  const dispatch = useDispatch();

  let data: GroupOption[] = [];
  for(let i = 0; i < groups.length; i++){
    const { _id, name} = groups[i];
    let singleGroup = {value: 0, label: ""};
    singleGroup["value"] = _id;
    singleGroup["label"] = name;
    data.push(singleGroup);
  };

  const {currentUser} = useSelector((state: any) => state.auth);
  const clickPostHandler = () => {
    console.log(props.id);
    const newPost = {
      caption: postCaption,
      recipe_id: props.id,
      recipe: props,
      date: new Date().toLocaleDateString('en-US'),
      groupName: postGroup
    }
    dispatch((createPost(newPost)));
  }
  return (
      <div className="row">
        <div className="col-auto">
          <img src={currentUser?.avatar} alt={props.title} className="rounded-circle" height={48} width={48}/>
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
          <Select options={data}
                  onChange={(selected) => setPostGroup(selected!.label!)}/>
          <button onClick = {clickPostHandler} type="button" className="btn btn-success float-end">Post</button>
        </div>
      </div>
  );
};
export default NewPostWindow;