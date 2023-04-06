import React from "react";
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
    console.log("User username: " + user.username)
    return (
        <div className="container-fluid">
            <ProfileHeader user={user} />
            <PersonalInfo user={user} />
            <FollowingGroups user={user} />
            <FollowingPeople user={user} />
        </div>
    );
};

export default ProfilePage;
