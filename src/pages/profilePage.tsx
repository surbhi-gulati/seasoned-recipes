import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { useNavigate, useParams } from "react-router";
import {logoutThunk, profileThunk} from "../services/auth-thunks";
import ProfileHeader from "../components/profile/profileHeader";
import PersonalInfo from "../components/profile/personalInfoSection/personalInfo";
import FollowingGroups from "../components/profile/groupSection/followingGroups";
import FollowingPeople from "../components/profile/peopleSection/followingPeople";
import UserType from "../modules/userType";
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { getProfileById } from "../services/auth-services";
import { getGroupsByUserId } from "../services/group-members-services";
import { getFollowersByUserId, getFollowingByUserId } from "../services/follows-services";
import { getPostsByUserId, getLikedPostsByUserId } from "../services/post-services";
import FollowersPeople from "../components/profile/peopleSection/followersPeople";
import LoginPrompt from "../components/loginPrompt";
import PostList from "../components/posts/post-list";

const ProfilePage = () => {

    const {currentUser} = useSelector((state: any) => state.auth);
    const [profile, setProfile] = useState<UserType>();
    const [isFollowing, setIsFollowing] = useState<boolean>(false);
    const [followedGroups, setFollowedGroups] = useState<Array<any>>([]);
    const [following, setFollowing] = useState<Array<any>>([]);
    const [followers, setFollowers] = useState<Array<any>>([]);
    const [userPosts, setUserPosts] = useState<Array<any>>([]);
    const [likedPosts, setLikedPosts] = useState<Array<any>>([]);
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('groups');
    const { id } = useParams();

    const toggleTab = (tab) => {
      if (activeTab !== tab) setActiveTab(tab);
    };

    // Get the profile of either this user or the visited user
    useEffect(() => {
      const getProfile = async () => {
        if (id) {
          const profileResponse = await getProfileById(id);
          setProfile(profileResponse.user);
          setIsFollowing(profileResponse.following);
        }
        else {
          const {payload} = await dispatch(profileThunk());
          setProfile(payload);
          setIsFollowing(false);
        }
      }
      getProfile();
    }, [id]);

    // Once profile is loaded, get the groups that the user follows
    useEffect(() => {
      const getFollowedGroups = async () => {
        if (profile) {
          const allGroupID = await getGroupsByUserId(profile._id);
          const followingResponse = await getFollowingByUserId(profile._id);
          const followersResponse = await getFollowersByUserId(profile._id);
          const userPostsResponse = await getPostsByUserId(profile._id);
          const likedPostsResponse = await getLikedPostsByUserId(profile._id);
          console.log("userPostsResponse", userPostsResponse);
          console.log("likedPostsResponse", likedPostsResponse);
          setFollowing(followingResponse);
          setFollowers(followersResponse);
          setFollowedGroups(allGroupID);
          setUserPosts(userPostsResponse);
          setLikedPosts(likedPostsResponse);
        }
      }
      getFollowedGroups();
    }, [profile]);

    // Handle logout
    const handleLogout = async () => {
      try {
        await dispatch(logoutThunk());
        navigate("/login");
      } catch (e) {
        alert (e);
      }
    }  

    return (
      <>
          {profile ? <div className="container-fluid">
          <ProfileHeader authenticated={currentUser} isFollowing = {isFollowing} user={profile} />
          {profile && currentUser && profile._id === currentUser._id && <PersonalInfo></PersonalInfo>}
          <Nav pills>
            <NavItem>
              <NavLink href="#groups" active={activeTab === 'groups'} onClick={() => toggleTab('groups')}>
                Following Groups
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#following" active={activeTab === 'following'} onClick={() => toggleTab('following')}>
                Following People
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#followers" active={activeTab === 'followers'} onClick={() => toggleTab('followers')}>
                Followers
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#posts" active={activeTab === 'posts'} onClick={() => toggleTab('posts')}>
                Posts
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#likedPosts" active={activeTab === 'likedPosts'} onClick={() => toggleTab('likedPosts')}>
                Liked Posts
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="groups">
              {followedGroups && <FollowingGroups profile={profile} groups={followedGroups} />}
            </TabPane>
            <TabPane tabId="following">
              {following && <FollowingPeople profile={profile} following={following} /> }
            </TabPane>
            <TabPane tabId="followers">
              {followers && <FollowersPeople profile={profile} followers={followers}/>}
            </TabPane>
            <TabPane tabId="posts">
              {profile && currentUser && profile._id === currentUser._id && userPosts
                ? <h2>Your Posts</h2>
                : <h2>{profile && `${profile.username}'s posts`}</h2>}
              <PostList posts={userPosts} />
            </TabPane>
            <TabPane tabId="likedPosts">
                {profile && currentUser && profile._id === currentUser._id && likedPosts
                ? <h2>Your liked Posts</h2>
                : <h2>{profile && `${profile.username}'s liked posts`}</h2>}
              <PostList posts={likedPosts} />
            </TabPane>
          </TabContent>
          {!id && 
          <button className={"btn btn-primary rounded my-2"} onClick={() => handleLogout() }>
            Logout
          </button>}
        </div>
        : <LoginPrompt promptText={"Please login to view your profile"}/>}
      </>
    );
};

export default ProfilePage;
