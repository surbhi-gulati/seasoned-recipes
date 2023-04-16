import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { useNavigate } from "react-router";
import { profileThunk, logoutThunk, updateUserThunk } from "../services/auth-thunks";
import ProfileHeader from "../components/profile/profileHeader";
import PersonalInfo from "../components/profile/personalInfoSection/personalInfo";
import FollowingGroups from "../components/profile/groupSection/followingGroups";
import FollowingPeople from "../components/profile/peopleSection/followingPeople";
import UserType from "../modules/userType";



const ProfilePage = (user: UserType) => {

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
    // if (!user.username) {
    //     return <div>
    //         <h1> Invalid account requested </h1>
    //         <p>
    //             You are attempting to view an invalid profile.
    //             Want to create a profile? Please create an account!
    //         </p>
    //         <button> Create account </button>
    //     </div>;
    // }
    return (
        <div className="container-fluid">
            {
              currentUser == null ? <p>anon</p> :<p>auth'ed</p>
            }
            <span>{JSON.stringify(profile)}</span>
            <ProfileHeader user={user} />
            <PersonalInfo user={user} />
            <FollowingGroups user={user} />
            <FollowingPeople user={user} />
            <button onClick={() => handleLogout() }>
              Logout
            </button>
        </div>
    );
};

export default ProfilePage;
