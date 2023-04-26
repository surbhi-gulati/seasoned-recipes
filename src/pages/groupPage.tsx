import React, {useEffect, useState} from "react";
import GroupType from "../modules/groupType";
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {getGroupById, updateGroup} from "../services/group-services";
import UserList from "../components/profile/peopleSection/userList";
import {
  createGroupMember,
  getGroupMembersByGroupId,
  getGroupsByUserId,
  leaveGroup
} from "../services/group-members-services";
import {getGroupsPosts} from "../services/post-services";
import PostType from "../modules/postType";
import PostList from "../components/posts/post-list";
import SmallerUserList from "../components/profile/peopleSection/smallerUserList";

const GroupPage = () => {
  const [groupInfo, setGroupInfo] = React.useState<GroupType>();
  const [groupPosts, setGroupPosts] = React.useState<PostType[]>();
  const [groupMembers, setGroupMembers] = React.useState([]);

  const [isEditingGroupName, setIsEditingGroupName] = React.useState(false);
  const [isEditingGroupDescription, setIsEditingGroupDescription] = React.useState(false);
  const [isDoneEditing, setIsDoneEditing] = React.useState(false);
  const [editedName, setEditedName] = React.useState(groupInfo?.name);
  const [editedDescription, setEditedDescription] = React.useState(groupInfo?.description);

  const [hasJoined, setHasJoined] = useState(false);
  // This gets the current user from the redux store
  const {currentUser} = useSelector((state: any) => state.auth);

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
  const clickJoinHandler = async () => {
    try {
      if (hasJoined) {
        id && await leaveGroup(id, currentUser._id);
      }  else {
        id && await createGroupMember(id, currentUser._id);
      }
      setHasJoined(!hasJoined);
    } catch (e) {
      alert(e);
    }
  };

  useEffect( () => {
    const currUsersGroups = async () => {
      const groups = await getGroupsByUserId(currentUser._id);
      groups.forEach((group) => {
        if (group.name === groupInfo?.name) {
          setHasJoined(true);
          return;
        }
      })
    }
    currUsersGroups()
  }, [groupInfo])

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
                { currentUser != null && <button onClick = {clickJoinHandler} type="button" className="btn btn-success">{!hasJoined ? <>Join</> : <>Leave</>}</button>}
                <h3 className="mb-0">Members</h3>
                <div className="mb-1 text-muted">{groupMembers.length} Foodies!</div>
                {groupMembers && groupMembers.length > 0 && <SmallerUserList users={groupMembers}></SmallerUserList> }
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card flex-md-row mb-4 box-shadow h-md-250">
              <div className="card-body align-items-start">
                {groupPosts && <PostList posts={groupPosts}></PostList>}
              </div>
            </div>
          </div>
        </div>
      </div>
  )
};


export default GroupPage;