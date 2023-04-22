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
import { getProfileById, getLoggedInProfile } from "../services/auth-services";
import { getGroupsByUserId } from "../services/group-members-services";

const ProfilePage = (user: UserType) => {

    const {currentUser} = useSelector((state: any) => state.auth);
    const [profile, setProfile] = useState<UserType>();
    const [isFollowing, setIsFollowing] = useState<boolean>(false);
    const [followedGroups, setFollowedGroups] = useState<Array<any>>([]);
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('personalInfo');
    const { id } = useParams();
    console.log("id: ", id);

    const toggleTab = (tab) => {
      if (activeTab !== tab) setActiveTab(tab);
    };

    useEffect(() => {
      const getProfile = async () => {
        if (id) {
          const profileResponse = await getProfileById(id);
          console.log(profileResponse);
          setProfile(profileResponse.user);
        }
        else {
          const {payload} = await dispatch(profileThunk());
          console.log(payload);
          setProfile(payload);
        }
      }
      getProfile();
    }, [id]);

    // Once profile is loaded, get the groups that the user follows
    useEffect(() => {
      const getFollowedGroups = async () => {
        if (profile) {
          const allGroupID = await getGroupsByUserId(profile && profile._id);
          setFollowedGroups(allGroupID);
        }
      }
      getFollowedGroups();
    }, [profile]);

    const handleLogout = async () => {
      try {
        await dispatch(logoutThunk());
        navigate("/login");
      } catch (e) {
        alert (e);
      }
    }  

    return (
        <div className="container-fluid">
          <ProfileHeader authenticated={currentUser} isFollowing = {isFollowing} user={profile} />
          <Nav pills>
            <NavItem>
              <NavLink href="#personalInfo" active={activeTab === 'personalInfo'} onClick={() => toggleTab('personalInfo')}>
                Personal Info
              </NavLink>
            </NavItem>
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
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="personalInfo">
              {/* <PersonalInfo user={user} /> */}
            </TabPane>
            <TabPane tabId="groups">
              {profile && <FollowingGroups profile={profile} groups={followedGroups} />}
            </TabPane>
            <TabPane tabId="following">
              {/* <FollowingPeople user={user} /> */}
            </TabPane>
            <TabPane tabId="followers">
              <p>Followers!</p>
            </TabPane>
          </TabContent>
          {!id && 
          <button onClick={() => handleLogout() }>
            Logout
          </button>}
        </div>
    );
};

export default ProfilePage;
