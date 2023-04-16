import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { useNavigate } from "react-router";
import { profileThunk, logoutThunk } from "../services/auth-thunks";
import ProfileHeader from "../components/profile/profileHeader";
import PersonalInfo from "../components/profile/personalInfoSection/personalInfo";
import FollowingGroups from "../components/profile/groupSection/followingGroups";
import FollowingPeople from "../components/profile/peopleSection/followingPeople";
import UserType from "../modules/userType";



const ProfilePage = (user: UserType = {
    "id": 3,
    "username": "mostlyHereForRamen",
    "name": "Belle Lim",
    "avatar": "/userImages/belle.jpg",
    "phone": "234-456-7880",
    "email": "lim.i@northeastern.edu"
  }) => {  

    const {currentUser} = useSelector((state: any) => state.auth);
    const [profile, setProfile] = useState<UserType>(currentUser);
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();

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
        "id": 3,
        "username": "mostlyHereForRamen",
        "name": "Belle Lim",
        "avatar": "/userImages/belle.jpg",
        "phone": "234-456-7880",
        "email": "lim.i@northeastern.edu"
    }  

    return (
        <div className="container-fluid">
            <ProfileHeader user={user} />
            <ul className="nav nav-pills">
              <li className="active"><a data-toggle="pill" href="#personalInfo">Home</a></li>
              <li><a data-toggle="pill" href="#followingGroups">Groups</a></li>
              <li><a data-toggle="pill" href="#followingPeople">Following</a></li>
              <li><a data-toggle="pill" href="#followers">Followers</a></li>
            </ul>
            <div className="tab-content">
              <div id="personalInfo" className="tab-pane fade in active">
                <PersonalInfo user={user} />
              </div>
              <div id="followingGroups" className="tab-pane fade">
                <FollowingGroups user={user} />
              </div>
              <div id="followingPeople" className="tab-pane fade">
                <FollowingPeople user={user} />
              </div>
              <div id="followers" className="tab-pane fade">
                <p> Followers! </p>
              </div>
            </div>
            <button onClick={() => handleLogout() }>
              Logout
            </button>
        </div>
    );
};

export default ProfilePage;
