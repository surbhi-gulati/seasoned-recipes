import React, {useEffect} from "react";
import GroupType from "../modules/groupType";
import {useParams} from "react-router";
import {useSelector} from "react-redux";
import {getGroupById} from "../services/group-services";
import UserList from "../components/profile/peopleSection/userList";
import {getGroupMembersByGroupId} from "../services/group-members-services";
import {getGroupsPosts} from "../services/post-services";
import { PostResponseType } from "../modules/postType";
import PostList from "../components/posts/post-list";

const GroupPage = () => {
  const [groupInfo, setGroupInfo] = React.useState<GroupType>();
  const [groupPosts, setGroupPosts] = React.useState<PostResponseType[]>();
  const [groupMembers, setGroupMembers] = React.useState<GroupType>();
  const {id} = useParams();
  // This gets the recipe info from the API
  const getGroupInfoHandler = async () => {
    const groupInfo = await getGroupById(id);
    setGroupInfo(groupInfo![0]); //returns as an array for some reason
  }
  const getGroupMemberHandler = async () => {
    const members = await getGroupMembersByGroupId(id);
    console.log("MEMBERS OF GROUP ARE:", members);
    setGroupMembers(members);
  }

  const getGroupPosts = async () => {
    const posts = await getGroupsPosts(id);
    console.log("POSTS OF GROUP ARE:", posts);
    setGroupPosts(posts);
  }

  // This gets the current user from the redux store
  const {currentUser} = useSelector((state: any) => state.auth);
  const [user, setUser] = React.useState<any>({});
  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  // If the recipe_id is not null, then get the recipe info on page load
  useEffect(() => {
    if (id) {
      getGroupInfoHandler();
      getGroupMemberHandler();
      getGroupPosts();
    }
  }, [getGroupInfoHandler, getGroupMemberHandler, getGroupPosts, id]);

  return (
      <div>
        <div className="jumbotron p-3 p-md-5 text-white rounded bg-dark">
          <div className="px-0">
            <h1 className="display-4 font-italic">{groupInfo?.name}</h1>
            <p className="lead my-3">{groupInfo?.description}</p>
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