import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { useNavigate } from "react-router";
import { profileThunk, logoutThunk } from "../services/auth-thunks";
import ProfileHeader from "../components/profile/profileHeader";
import PersonalInfo from "../components/profile/personalInfoSection/personalInfo";
import FollowingGroups from "../components/profile/groupSection/followingGroups";
import FollowingPeople from "../components/profile/peopleSection/followingPeople";
import UserType from "../modules/userType";
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';

const ProfilePage = (user: UserType) => {

    const {currentUser} = useSelector((state: any) => state.auth);
    const [profile, setProfile] = useState<UserType>(currentUser);
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('personalInfo');

    const toggleTab = (tab) => {
      if (activeTab !== tab) setActiveTab(tab);
    };

    useEffect(() => {
      const getProfile = async () => {
        const {payload} = await dispatch(profileThunk());
        setProfile(payload);
      }
      getProfile();
    }, []);

    const handleLogout =async () => {
      try {
        await dispatch(logoutThunk());
        navigate("/login");
      } catch (e) {
        alert (e);
      }
    }

    user = {
        "_id": "3",
        "username": "mostlyHereForRamen",
        "name": "Belle Lim",
        "avatar": "/userImages/belle.jpg",
        "phone": "234-456-7880",
        "email": "lim.i@northeastern.edu"
    }  

    return (
        <div className="container-fluid">
          <ProfileHeader user={user} />
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
              <PersonalInfo user={user} />
            </TabPane>
            <TabPane tabId="groups">
              <FollowingGroups user={user} />
            </TabPane>
            <TabPane tabId="following">
              <FollowingPeople user={user} />
            </TabPane>
            <TabPane tabId="followers">
              <p>Followers!</p>
            </TabPane>
          </TabContent>
          <button onClick={() => handleLogout() }>
            Logout
          </button>
        </div>
    );
};

export default ProfilePage;
