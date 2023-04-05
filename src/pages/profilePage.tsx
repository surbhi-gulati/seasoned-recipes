import React from "react";
import ProfileHeader from "../components/profile/profileHeader";
import PersonalInfo from "../components/profile/personalInfo";
import FollowingGroups from "../components/profile/followingGroups";
import FollowingPeople from "../components/profile/followingPeople";

const ProfilePage = () => {    
    return (
        <div className="container-fluid">
            <ProfileHeader />
            <PersonalInfo />
            <FollowingGroups />
            <FollowingPeople />
        </div>
    );
};

export default ProfilePage;
