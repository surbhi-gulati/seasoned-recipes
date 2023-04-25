import React, {useEffect} from "react";
import GroupType from "../modules/groupType";
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {getGroupById, updateGroup} from "../services/group-services";
import UserList from "../components/profile/peopleSection/userList";
import {getGroupMembersByGroupId} from "../services/group-members-services";
import {getGroupsPosts} from "../services/post-services";
import PostType from "../modules/postType";
import PostList from "../components/posts/post-list";

const GroupPage = () => {
  const [groupInfo, setGroupInfo] = React.useState<GroupType>();
  const [groupPosts, setGroupPosts] = React.useState<PostType[]>();
  const [groupMembers, setGroupMembers] = React.useState<GroupType>();

  const dispatch = useDispatch<any>();
  const [isEditingGroupName, setIsEditingGroupName] = React.useState(false);
  const [isEditingGroupDescription, setIsEditingGroupDescription] = React.useState(false);
  const [isDoneEditing, setIsDoneEditing] = React.useState(false);
  const [editedName, setEditedName] = React.useState(groupInfo?.name);
  const [editedDescription, setEditedDescription] = React.useState(groupInfo?.description);

  // This gets the current user from the redux store
  const {currentUser} = useSelector((state: any) => state.auth);
  const [user, setUser] = React.useState<any>({});
  useEffect(() => {
    setUser(currentUser);
  }, []);

  const {id} = useParams();
  const getGroupInfoHandler = async () => {
    const thisGroupInfo = await getGroupById(id);
    setGroupInfo(thisGroupInfo![0]);
    setEditedName(thisGroupInfo![0].name);
    setEditedDescription(thisGroupInfo![0].description);
  }
  const getGroupMemberHandler = async () => {
    const members = await getGroupMembersByGroupId(id);
    setGroupMembers(members);
  }
  const getGroupPosts = async () => {
    const posts = await getGroupsPosts(id);
    setGroupPosts(posts);
  }

  // If the recipe_id is not null, then get the recipe info on page load
  useEffect(() => {
    if(id) {
      getGroupInfoHandler();
      getGroupMemberHandler();
      getGroupPosts();
    }
  }, [id, isDoneEditing]);

  return (
      <div>
        <div className="jumbotron p-3 p-md-5 text-white rounded bg-black">
          <div className="px-0">
            {isEditingGroupName ? (<div className="row">
                  <div className="col-8">
                    <input className="form-control"
                           type="text" defaultValue={editedName}
                           onChange={(event) => setEditedName(event.target.value)}
                    />
                  </div>
                  <button onClick = { async () => {
                    const newGroup = {
                      ...groupInfo,
                      name: editedName,
                    };
                    await updateGroup(newGroup);
                    setIsEditingGroupName(false);
                    setIsDoneEditing(true);
                  }} type="button" className="btn btn-success col-2">Save</button>
                </div>)
                :
                (<div className="row align-content-center">
                  {currentUser && currentUser.isAdmin && <i
                      className="bi bi-pen-fill col-1 float-end"
                      style={{verticalAlign: "middle"}}
                      onClick={() => {
                        setIsEditingGroupName(true);
                        setIsDoneEditing(false);
                      }}></i>}
                  <h1 className="display-4 font-italic col-11 float-start">{editedName}</h1>
                </div>)
            }
            {isEditingGroupDescription ? (<div className="row">
                  <div className="col-8">
                    <input className="form-control"
                           type="text" defaultValue={editedDescription}
                           onChange={(event) => setEditedDescription(event.target.value)}
                    />
                  </div>
                  <button onClick = { async () => {
                    const newGroup = {
                      ...groupInfo,
                      description: editedDescription,
                    };
                    await updateGroup(newGroup);
                    setIsEditingGroupDescription(false);
                    setIsDoneEditing(true);
                  }} type="button" className="btn btn-success col-2">Save</button>
                </div>)
                :
                (<div className="row">
                  {currentUser && currentUser.isAdmin && <i className="bi bi-pen-fill col-1"
                                                            onClick={() => {
                                                              setIsEditingGroupDescription(true);
                                                              setIsDoneEditing(false);
                                                            }}></i>}
                  <p className="lead my-3 col-11 float-start">{editedDescription}</p>

                </div>)
            }
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-md-4">
            <div className="card flex-md-row mb-4 box-shadow h-md-250">
              <div className="card-body d-flex flex-column align-items-start">
                <h3 className="mb-0">Members</h3>
                <div className="mb-1 text-muted">38 Foodies!</div>
                {groupMembers && <UserList users={groupMembers}></UserList> }
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card flex-md-row mb-4 box-shadow h-md-250">
              <div className="card-body d-flex flex-column align-items-start">
                {groupPosts && <PostList posts={groupPosts}></PostList>}
              </div>
            </div>
          </div>
        </div>
      </div>
  )
};


export default GroupPage;